---
icon: lucide/satellite-dish
title: "Integrate and Read Sensors"
description: "Add a sensor to SiFli-SDK, connect it through RT-Thread, register the device, and validate it from the FinSH shell."
tags: [Develop, SiFli-SDK, Application Notes, Sensors]
---

# Integrate and Read Sensors { #integrate-and-read-sensors }

This article adapts SiFli's [Sensor integration guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html) into a practical driver workflow. The same guide is published for SF32LB52x, SF32LB55x, SF32LB56x, and SF32LB58x; verify the target SDK branch before copying paths or symbols. It covers the path from a sensor data sheet and board wiring to a Kconfig entry, bus read/write callbacks, interrupt handling, RT-Thread sensor registration, and command-line validation.

The examples use an LSM6DSL six-axis sensor (accelerometer and gyroscope) and a BMP280 temperature/barometric sensor. They reproduce the SDK guide's API names and sample identifiers; check the target SDK branch before copying them into a product.

!!! note "Family scope"
    The driver workflow is consolidated across SF32LB52x, SF32LB55x, SF32LB56x, and SF32LB58x. The LSM6DSL/BMP280 code is sensor-driver example code, while the bus instance, GPIO numbers, interrupt routing, Kconfig paths, and available peripherals remain target-family and board dependent.

## Confirm the hardware and sensor interface { #1-confirm-the-hardware-and-sensor-interface }

Start with the sensor's data sheet and identify both its function and its host interface. The SDK guide lists six-axis (accelerometer and gyroscope), temperature, barometric-pressure, geomagnetic, light, GPS, and motor sensors as examples. The supported host interfaces in this guide are I2C, SPI, and UART.

Before writing a driver:

- Confirm with the hardware design that the selected bus is enabled and routed to the package pins.
- Check that the sensor and SF32 device share compatible voltage and frequency ranges.
- Identify the bus name, device address, chip-select (if applicable), power control, reset, and interrupt pins.
- Agree with the application owner on the data and control operations the driver must expose.

## Prepare the driver and build configuration { #2-prepare-the-driver-and-build-configuration }

SiFli-SDK peripheral drivers live under `rtos/rthread/bsp/sifli/peripherals`. After choosing the bus and implementation, add a directory for the new device. Add its `menuconfig` entries to `rtos/rthread/bsp/sifli/peripherals/Kconfig`, including:

- the sensor enable switch;
- the supported bus selection and name (for example, I2C, SPI, or UART);
- power, reset, chip-select, and interrupt GPIO settings; and
- optional sensor functions such as activity detection, a pedometer, or FIFO support.

Implement the driver in the new directory. Read the bus name, GPIO numbers, and interrupt numbers from the Kconfig symbols instead of hard-coding board values. Finally, associate the driver with its Kconfig symbols in that directory's `SConscript` file.

From the project directory, run `menuconfig`, choose **Select board peripherals**, enable the new module, and enter its child options to set the board-specific values.

## Configure the interface in Kconfig { #3-configure-the-interface-in-kconfig }

The following Kconfig example is from the SF32LB52x guide. It enables an LSM6DSL under a six-axis sensor group: `SENSOR_USING_6D` is the group switch, and its child switch selects the LSM6DSL implementation.

```kconfig
menuconfig SENSOR_USING_6D
    bool "Enable 6D Sensor for Accelerator and Gyro"
    default n
    if SENSOR_USING_6D
        menuconfig ACC_USING_LSM6DSL
            bool "Enable Accelerator and Gyro LSM6DSL"
            select RT_USING_SENSOR
            default n
            if ACC_USING_LSM6DSL
                config LSM6DSL_USING_I2C
                int "LSM6DSL BUS type: 1 = I2C, 0 = SPI"
                default 0
                config LSM6DSL_BUS_NAME
                string "Sensor LSM6DSL BUS name"
                default "spi1"
                
                config LSM6DSL_INT_GPIO_BIT
                int "LSM6DSL Interrupt 1 PIN"
                default 97
                config LSM6DSL_INT2_GPIO_BIT
                int "LSM6DSL Interrupt 2 PIN"
                default 94

                config LSM_USING_AWT
                bool "Enable AWT fucntion"
                default y
                config LSM_USING_PEDO
                bool "Enable Pedometer fucntion"
                default y
                config LSM6DSL_USE_FIFO
                bool "LSM6DSL use fifo"
                default y
            endif
    endif
```

The group switch can contain several supported models, such as LSM6DSL and SC7A20. Enable only the model intended for a given bus arrangement at one time to avoid external-interface conflicts. In this example:

- `ACC_USING_LSM6DSL` enables the LSM6DSL driver.
- `LSM6DSL_USING_I2C` selects I2C (`1`) or SPI (`0`). Omit this symbol when the sensor supports only one interface.
- `LSM6DSL_BUS_NAME` names the bus device that the RT-Thread sensor driver will find.
- `LSM6DSL_INT_GPIO_BIT` and `LSM6DSL_INT2_GPIO_BIT` describe the interrupt pins when the board assigns them.
- `LSM_USING_AWT`, `LSM_USING_PEDO`, and `LSM6DSL_USE_FIFO` represent device-specific functions; define them only when the selected driver supports them.

This example follows the SF32LB52x guide. Other family guides or SDK branches may expose different options or menu paths; verify each symbol in the target branch before applying the example.

### Find the bus and implement register access { #find-the-bus-and-implement-register-access }

Use `rt_i2c_bus_device_find` or `rt_device_find` to obtain the bus device. Then call the corresponding bus read/write API for the selected interface. The sensor data sheet remains the authority for the device address, register map, command sequence, and register width.

```c
int LSM6DSL_I2C_Init()
{
    /* get i2c bus device */
    lsm6dsl_content.bus_handle = rt_i2c_bus_device_find(LSM6DSL_BUS_NAME);
    if (lsm6dsl_content.bus_handle)
    {
        LOG_D("Find i2c bus device %s\n", LSM6DSL_BUS_NAME);
    }
    else
    {
        LOG_E("Can not found i2c bus %s, init fail\n", LSM6DSL_BUS_NAME);
        return -1;
    }

    return 0;
}

int32_t LSM_I2C_Write(void *ctx, uint8_t reg, uint8_t *data, uint16_t len)
{
    rt_size_t res;

    struct LSM6DSL_CONT_T *handle = (struct LSM6DSL_CONT_T *)ctx;

    if (handle && handle->bus_handle && data)
    {
        uint16_t addr16 = (uint16_t)reg;
        res = rt_i2c_mem_write(handle->bus_handle, handle->dev_addr, addr16, 8, data, len);
        if (res > 0)
            return 0;
        else
            return -2;
    }

    return -3;
}

int32_t LSM_I2C_Read(void *ctx, uint8_t reg, uint8_t *data, uint16_t len)
{
    rt_size_t res;
    struct LSM6DSL_CONT_T *handle = (struct LSM6DSL_CONT_T *)ctx;

    if (handle && handle->bus_handle && data)
    {
        uint16_t addr16 = (uint16_t)reg;
        res = rt_i2c_mem_read(handle->bus_handle, handle->dev_addr, addr16, 8, data, len);
        if (res > 0)
            return 0;
        else
            return -2;
    }

    return -3;
}
```

The sample returns `-1` when the bus cannot be found, `-2` when a bus transaction fails, and `-3` when the context, bus handle, or data pointer is invalid. Adapt the error policy to the surrounding driver.

### Configure a sensor interrupt { #configure-a-sensor-interrupt }

Set the interrupt pin as an input with `rt_pin_mode`, attach the handler and trigger condition with `rt_pin_attach_irq`, and enable or disable it with `rt_pin_irq_enable`. The SDK lists rising-edge (`PIN_IRQ_MODE_RISING`), falling-edge (`PIN_IRQ_MODE_FALLING`), both-edge (`PIN_IRQ_MODE_RISING_FALLING`), and high- or low-level (`PIN_IRQ_MODE_HIGH_LEVEL` / `PIN_IRQ_MODE_LOW_LEVEL`) triggers. The handler itself depends on the sensor.

```c
int lsm6dsl_gpio_int_enable(void)
{
    struct rt_device_pin_mode m;

    // get pin device
    rt_device_t device = rt_device_find("pin");
    if (!device)
    {
        LOG_E("GPIO pin device not found at LSM6DSL\n");
        return -1;
    }

    rt_device_open(device, RT_DEVICE_OFLAG_RDWR);

    // int pin cfg
    m.pin = LSM6DSL_INT_GPIO_BIT;
    m.mode = PIN_MODE_INPUT;
    rt_device_control(device, 0, &m);

    // enable LSM int
    rt_pin_mode(LSM6DSL_INT_GPIO_BIT, PIN_MODE_INPUT);
    rt_pin_attach_irq(m.pin, PIN_IRQ_MODE_RISING, lsm6dsl_int1_handle, (void *)(rt_uint32_t)m.pin);
    rt_pin_irq_enable(m.pin, 1);

    return 0;
}
```

## Register the RT-Thread sensor device { #4-register-the-rt-thread-sensor-device }

Add a `sensor_xxx.c` file in the new device directory. Its job is to expose the device through RT-Thread's sensor framework so application code can use the sensor device rather than the bus-specific register functions directly.

The registration has two parts:

1. Allocate and register one or more `rt_sensor_device` instances with `rt_hw_sensor_register`.
2. Provide the `sensor_ops` callbacks for data reads, mode control, and sleep/wake transitions.

The SDK guide's BMP280 example registers temperature and barometric-pressure channels separately, sets their units and ranges, copies the common configuration, and shares the callback table:

```c
int rt_hw_bmp280_init(const char *name, struct rt_sensor_config *cfg)
{
    rt_int8_t result;
    rt_sensor_t sensor_temp = RT_NULL, sensor_baro = RT_NULL;

    result = _bmp280_init();
    if (result != RT_EOK)
    {
        LOG_E("bmp280 init err code: %d", result);
        goto __exit;
    }

    /* temperature sensor register */
    {
        sensor_temp = rt_calloc(1, sizeof(struct rt_sensor_device));
        if (sensor_temp == RT_NULL)
            goto __exit;

        sensor_temp->info.type       = RT_SENSOR_CLASS_TEMP;
        sensor_temp->info.vendor     = RT_SENSOR_VENDOR_BOSCH;
        sensor_temp->info.model      = "bmp280_temp";
        sensor_temp->info.unit       = RT_SENSOR_UNIT_DCELSIUS;
        sensor_temp->info.intf_type  = RT_SENSOR_INTF_I2C;
        sensor_temp->info.range_max  = 85;
        sensor_temp->info.range_min  = -40;
        sensor_temp->info.period_min = 5;

        rt_memcpy(&sensor_temp->config, cfg, sizeof(struct rt_sensor_config));
        sensor_temp->ops = &sensor_ops;

        result = rt_hw_sensor_register(sensor_temp, name, RT_DEVICE_FLAG_RDWR, RT_NULL);
        if (result != RT_EOK)
        {
            LOG_E("device register err code: %d", result);
            goto __exit;
        }
    }

    /* barometer sensor register */
    {
        sensor_baro = rt_calloc(1, sizeof(struct rt_sensor_device));
        if (sensor_baro == RT_NULL)
            goto __exit;

        sensor_baro->info.type       = RT_SENSOR_CLASS_BARO;
        sensor_baro->info.vendor     = RT_SENSOR_VENDOR_BOSCH;
        sensor_baro->info.model      = "bmp280_bora";
        sensor_baro->info.unit       = RT_SENSOR_UNIT_PA;
        sensor_baro->info.intf_type  = RT_SENSOR_INTF_I2C;
        sensor_baro->info.range_max  = 110000;
        sensor_baro->info.range_min  = 30000;
        sensor_baro->info.period_min = 5;

        rt_memcpy(&sensor_baro->config, cfg, sizeof(struct rt_sensor_config));
        sensor_baro->ops = &sensor_ops;

        result = rt_hw_sensor_register(sensor_baro, name, RT_DEVICE_FLAG_RDWR, RT_NULL);
        if (result != RT_EOK)
        {
            LOG_E("device register err code: %d", result);
            goto __exit;
        }
    }

    LOG_I("sensor init success");
    return RT_EOK;

__exit:
    if (sensor_temp)
        rt_free(sensor_temp);
    if (sensor_baro)
        rt_free(sensor_baro);
    if (bmp_dev)
        rt_free(bmp_dev);
    return -RT_ERROR;
}
```

Set `type`, `vendor`, `model`, `unit`, `intf_type`, valid range, and minimum period to the values in the device data sheet. Keep the cleanup path complete if allocation or either registration fails.

**Source-example cleanup caveat:** If the temperature device registers successfully and the later barometer allocation or registration fails, the example's cleanup label frees the temperature device without first unregistering it. In product code, track which devices registered successfully, unregister each registered device through the removal API supported by the target RT-Thread version, and only then free its storage. Do not copy this failure path unchanged.

## Validate the driver from FinSH { #5-validate-the-driver-from-finsh }

After the driver is built into the image, add a command-line function and register it with `FINSH_FUNCTION_EXPORT_ALIAS`. A useful validation command should cover:

- sensor initialization and device-address detection;
- register reads and writes through I2C or SPI; and
- a sensor-specific functional result, such as pressure, temperature, or acceleration.

The following BMP280 test command illustrates open, close, register read, temperature/pressure/altitude readout, and I2C bus-speed configuration:

```c
#define DRV_BMP280_TEST

#ifdef DRV_BMP280_TEST
#include <string.h>

int cmd_bmpt(int argc, char *argv[])
{
    int32_t temp, pres, alti;
    if (argc < 2)
    {
        LOG_I("Invalid parameter!\n");
        return 1;
    }
    if (strcmp(argv[1], "-open") == 0)
    {
        uint8_t res = BMP280_Init();
        if (BMP280_RET_OK == res)
        {
            BMP280_open();
            LOG_I("Open bmp280 success\n");
        }
        else
            LOG_I("open bmp280 fail\n");
    }
    if (strcmp(argv[1], "-close") == 0)
    {
        BMP280_close();
        LOG_I("BMP280 closed\n");
    }
    if (strcmp(argv[1], "-r") == 0)
    {
        uint8_t rega = atoi(argv[2]) & 0xff;
        uint8_t value;
        BMP280_ReadReg(rega, 1, &value);
        LOG_I("Reg 0x%x value 0x%x\n", rega, value);
    }
    if (strcmp(argv[1], "-tpa") == 0)
    {
        temp = 0;
        pres = 0;
        alti = 0;
        BMP280_CalTemperatureAndPressureAndAltitude(&temp, &pres, &alti);
        LOG_I("Get temperature = %.1f\n", (float)temp / 10);
        LOG_I("Get pressure= %.2f\n", (float)pres / 100);
        LOG_I("Get altitude= %.2f\n", (float)alti / 100);
    }
    if (strcmp(argv[1], "-bps") == 0)
    {
        struct rt_i2c_configuration cfg;
        int bps = atoi(argv[2]);
        cfg.addr = 0;
        cfg.max_hz = bps;
        cfg.mode = 0;
        cfg.timeout = 5000;
        rt_i2c_configure(i2cbus, &cfg);
        LOG_I("Config BMP I2C speed to %d\n", bps);
    }

    return 0;
}
FINSH_FUNCTION_EXPORT_ALIAS(cmd_bmpt, __cmd_bmpt, Test driver bmp280);

#endif //DRV_BMP280_TEST
```

Before accepting a reading, verify the device address, read a known identity or calibration register, and compare the measurement with the expected range. Treat this command as a basic bring-up aid, not production-ready CLI code: validate the arguments for each subcommand, check return values from device and API calls, and add bounds checks before integrating it into a product.

## Related pages { #related-pages }

- [Board Configuration](../board-configuration.md) — board-owned bus, pin, and peripheral settings.
- [Components and `sf-pkg`](../components.md) — package dependencies used by a driver.
- [SiFli-SDK application notes](../sdk-application-notes.md) — the complete application-note index.

## Official source { #official-source }

- [Sensor添加指南 — SiFli SDK 编程指南](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)
- [SF32LB55x sensor guide](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/sensor.html)
- [SF32LB56x sensor guide](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/sensor.html)
- [SF32LB58x sensor guide](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/sensor.html)
