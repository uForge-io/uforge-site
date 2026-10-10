---
icon: lucide/satellite-dish
title: "集成并读取传感器"
description: "在 SiFli-SDK 中添加传感器驱动，通过 RT-Thread 注册设备，并通过 FinSH 命令行完成验证。"
tags: [开发, SiFli-SDK, 应用笔记, 传感器]
---

# 集成并读取传感器 { #integrate-and-read-sensors }

本文参考思澈科技（SiFli）的[传感器集成指南](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)，整理出一套可执行的驱动开发流程。同一指南面向 SF32LB52x、SF32LB55x、SF32LB56x 和 SF32LB58x 发布，复制路径或配置符号前应核对目标 SDK 分支。流程涵盖从查阅传感器规格书、确认板级连接，到配置 Kconfig、实现总线读写回调和中断处理、注册 RT-Thread 传感器设备，再到通过命令行验证的完整过程。

示例使用 LSM6DSL 六轴传感器（加速度计和陀螺仪）以及 BMP280 温度和气压传感器。代码中的 API 名称和示例标识符均沿用 SDK 指南；复制到产品工程前，请先核对目标 SDK 分支中的实际名称。

!!! note "系列适用范围"
    本文汇总了 SF32LB52x、SF32LB55x、SF32LB56x 和 SF32LB58x 的传感器驱动开发流程。LSM6DSL/BMP280 代码仅作驱动实现示例；具体的总线实例、GPIO 编号、中断路由、Kconfig 路径和可用外设仍取决于目标系列和开发板。

## 确认硬件和传感器接口 { #1-confirm-the-hardware-and-sensor-interface }

先阅读传感器规格书，确认传感器的功能和主机接口。SDK 指南列举的传感器类型包括六轴（加速度计和陀螺仪）、温度、气压、地磁、光照、GPS 和电机等；本指南涉及的主机接口包括 I2C、SPI 和 UART。

编写驱动前，请完成以下确认：

- 结合硬件设计确认所选总线已经使能，并已布线到对应的封装引脚。
- 检查传感器与 SF32 器件的电压范围和频率范围是否匹配。
- 确定总线名、设备地址、片选（如适用）、供电控制、复位和中断管脚。
- 与应用开发者确认驱动需要提供的数据操作和控制操作。

## 准备驱动和构建配置 { #2-prepare-the-driver-and-build-configuration }

SiFli-SDK 的外设驱动位于 `rtos/rthread/bsp/sifli/peripherals`。确定总线和实现方案后，在该目录下为新设备添加目录，并在 `rtos/rthread/bsp/sifli/peripherals/Kconfig` 中增加 `menuconfig` 配置项，包括：

- 传感器使能开关；
- 支持的总线类型及名称，例如 I2C、SPI 或 UART；
- 供电、复位、片选和中断 GPIO 设置；
- 设备支持的可选功能，例如活动检测、计步器或 FIFO。

在新目录中完成驱动实现。总线名、GPIO 编号和中断编号应从 Kconfig 符号获取，不要在驱动中硬编码板级数值。最后，在该目录的 `SConscript` 文件中将驱动与对应的 Kconfig 开关关联起来。

在工程目录下运行 `menuconfig`，选择 **Select board peripherals**，使能新增模块，再进入下一级选项设置板级参数。

## 在 Kconfig 中配置接口 { #3-configure-the-interface-in-kconfig }

以下 Kconfig 示例来自 SF32LB52x 指南，用于在六轴传感器分组下使能 LSM6DSL：`SENSOR_USING_6D` 是分组开关，子开关用于选择 LSM6DSL 实现。

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

一个分组开关可以包含多个受支持的型号，例如 LSM6DSL 和 SC7A20。为避免外部接口冲突，同一总线配置下应一次只使能实际使用的型号。在本例中：

- `ACC_USING_LSM6DSL` 使能 LSM6DSL 驱动。
- `LSM6DSL_USING_I2C` 选择 I2C（`1`）或 SPI（`0`）。如果传感器只支持一种接口，可以省略该符号。
- `LSM6DSL_BUS_NAME` 定义总线设备名，RT-Thread 传感器驱动会据此查找对应总线。
- `LSM6DSL_INT_GPIO_BIT` 和 `LSM6DSL_INT2_GPIO_BIT` 定义硬件分配的中断管脚。
- `LSM_USING_AWT`、`LSM_USING_PEDO` 和 `LSM6DSL_USE_FIFO` 表示设备相关功能，只有在所选驱动支持时才应定义。

本示例遵循 SF32LB52x 指南。其他系列的指南或 SDK 分支可能采用不同的选项和菜单路径；套用示例前，请先核对目标分支中的实际配置符号。

### 查找总线并实现寄存器读写 { #find-the-bus-and-implement-register-access }

使用 `rt_i2c_bus_device_find` 或 `rt_device_find` 获取总线设备，再根据所选接口调用对应的总线读写 API。设备地址、寄存器映射、命令时序和寄存器宽度仍应以传感器规格书为准。

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

示例在找不到总线时返回 `-1`，总线事务失败时返回 `-2`，上下文、总线句柄或数据指针无效时返回 `-3`。接入现有驱动时，请按工程的错误处理策略调整。

### 配置传感器中断 { #configure-a-sensor-interrupt }

使用 `rt_pin_mode` 将中断管脚设为输入，使用 `rt_pin_attach_irq` 绑定处理函数和触发条件，再通过 `rt_pin_irq_enable` 使能或关闭中断。SDK 列出的触发方式包括上升沿（`PIN_IRQ_MODE_RISING`）、下降沿（`PIN_IRQ_MODE_FALLING`）、双边沿（`PIN_IRQ_MODE_RISING_FALLING`）以及高、低电平（`PIN_IRQ_MODE_HIGH_LEVEL` / `PIN_IRQ_MODE_LOW_LEVEL`）。具体处理函数取决于传感器。

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

## 注册 RT-Thread 传感器设备 { #4-register-the-rt-thread-sensor-device }

在新设备目录中添加 `sensor_xxx.c`，通过 RT-Thread 传感器框架注册该设备。这样，上层应用就可以使用统一的传感器设备接口，而不必直接调用特定总线的寄存器函数。

注册分为两部分：

1. 分配一个或多个 `rt_sensor_device` 实例，并调用 `rt_hw_sensor_register` 注册。
2. 提供 `sensor_ops` 回调，实现数据读取、模式控制以及休眠 / 唤醒。

SDK 指南中的 BMP280 示例分别注册温度和气压通道，设置单位和范围，复制公共配置，并让两个设备共享回调表：

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

请将 `type`、`vendor`、`model`、`unit`、`intf_type`、有效范围和最小周期设置为传感器规格书中的值。如果内存分配或任一设备注册失败，清理路径都应释放已分配的资源。

**源示例的清理注意事项：**如果温度传感器设备已注册成功，而后续气压传感器的内存分配或注册失败，示例的清理标签会释放温度传感器设备，却未先将其注销。产品代码应记录哪些设备已成功注册，并先使用目标 RT-Thread 版本支持的接口注销已注册设备，再释放其存储空间。不要原样照搬这条错误清理路径。

## 通过 FinSH 验证驱动 { #5-validate-the-driver-from-finsh }

将驱动编译进固件后，添加命令行函数，并用 `FINSH_FUNCTION_EXPORT_ALIAS` 注册。一个实用的验证命令应覆盖：

- 传感器初始化和设备地址检查；
- 通过 I2C 或 SPI 读写寄存器；
- 与传感器类型对应的功能结果，例如气压、温度或加速度。

下面的 BMP280 测试命令演示打开和关闭设备、读取寄存器及温度、气压和海拔数据，并配置 I2C 总线速率：

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

在将读数视为有效数据前，应确认设备地址，读取已知的身份或校准寄存器，并将实测值与预期范围比较。该命令仅用于基本启动调试，不能直接视为可用于生产的命令行工具；集成到产品前，应分别校验各子命令的参数数量和取值范围，检查设备及 API 调用的返回值，并补充边界检查。

## 相关页面 { #related-pages }

- [开发板配置](../board-configuration.md) — 开发板负责的总线、管脚和外设设置。
- [组件和 `sf-pkg`](../components.md) — 驱动使用的软件包依赖。
- [SiFli-SDK 应用笔记](../sdk-application-notes.md) — 完整的应用笔记索引。

## 官方来源 { #official-source }

- [Sensor添加指南 — SiFli-SDK 编程指南](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)
- [SF32LB55x 传感器指南](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/sensor.html)
- [SF32LB56x 传感器指南](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/sensor.html)
- [SF32LB58x 传感器指南](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/sensor.html)
