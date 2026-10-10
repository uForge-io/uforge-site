---
icon: lucide/satellite-dish
title: "Integración y lectura de sensores"
description: "Añada un sensor a SiFli-SDK, conéctelo mediante RT-Thread, registre el dispositivo y valídelo desde la consola FinSH."
tags: [Desarrollo, SiFli-SDK, Notas de aplicación, Sensores]
---

# Integración y lectura de sensores { #integrate-and-read-sensors }

Este artículo adapta la [guía de integración de sensores](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html) de SiFli a un flujo práctico de desarrollo de controladores. La misma guía está publicada para SF32LB52x, SF32LB55x, SF32LB56x y SF32LB58x; compruebe la rama del SDK de destino antes de reutilizar rutas o símbolos. El flujo abarca desde la hoja de datos del sensor y el cableado de la placa hasta una entrada Kconfig, los callbacks de lectura/escritura del bus, el manejo de interrupciones, el registro del sensor en RT-Thread y la validación desde la línea de comandos.

Los ejemplos usan un sensor de seis ejes LSM6DSL (acelerómetro y giroscopio) y un sensor de temperatura y presión barométrica BMP280. Reproducen los nombres de API e identificadores de ejemplo de la guía del SDK; compruebe la rama correspondiente antes de incorporarlos a un producto.

!!! note "Alcance de las familias"
    Este artículo reúne el flujo de desarrollo de controladores para SF32LB52x, SF32LB55x, SF32LB56x y SF32LB58x. El código de LSM6DSL/BMP280 es solo un ejemplo de implementación; la instancia del bus, los números GPIO, la ruta de interrupción, las rutas Kconfig y los periféricos disponibles dependen de la familia y de la placa de destino.

## Confirmar el hardware y la interfaz del sensor { #1-confirm-the-hardware-and-sensor-interface }

Empiece por la hoja de datos del sensor e identifique tanto su función como su interfaz de host. La guía del SDK enumera como ejemplos sensores de seis ejes (acelerómetro y giroscopio), temperatura, presión barométrica, geomagnetismo, luz, GPS y motores. Las interfaces de host cubiertas aquí son I2C, SPI y UART.

Antes de escribir el controlador:

- Confirme en el diseño de hardware que el bus elegido está habilitado y conectado a los pines del encapsulado.
- Compruebe que el sensor y el dispositivo SF32 admitan rangos compatibles de tensión y frecuencia.
- Identifique el nombre del bus, la dirección del dispositivo, la señal de selección de chip (si corresponde), el control de alimentación, la señal de reinicio y los pines de interrupción.
- Acuerde con el responsable de la aplicación las operaciones de datos y control que debe ofrecer el controlador.

## Preparar el controlador y la configuración de compilación { #2-prepare-the-driver-and-build-configuration }

Los controladores de periféricos de SiFli-SDK se encuentran en `rtos/rthread/bsp/sifli/peripherals`. Después de elegir el bus y la implementación, cree un directorio para el nuevo dispositivo. Añada sus entradas `menuconfig` a `rtos/rthread/bsp/sifli/peripherals/Kconfig`, incluidos:

- el interruptor para habilitar el sensor;
- la selección y el nombre de una interfaz compatible, como I2C, SPI o UART;
- la configuración de GPIO para alimentación, reset, chip select e interrupción; y
- funciones opcionales del sensor, como detección de actividad, podómetro o soporte FIFO.

Implemente el controlador en el nuevo directorio. Lea el nombre del bus y los números GPIO e interrupción de los símbolos Kconfig, en lugar de fijar valores de la placa en el código. Por último, asocie el controlador con sus símbolos Kconfig en el archivo `SConscript` del directorio.

Desde el directorio del proyecto, ejecute `menuconfig`, seleccione **Select board peripherals**, habilite el nuevo módulo y entre en sus opciones secundarias para establecer los valores específicos de la placa.

## Configurar la interfaz en Kconfig { #3-configure-the-interface-in-kconfig }

El siguiente ejemplo de Kconfig procede de la guía SF32LB52x. Habilita un LSM6DSL dentro de un grupo de sensores de seis ejes: `SENSOR_USING_6D` es el interruptor del grupo y la opción secundaria selecciona la implementación LSM6DSL.

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

El interruptor del grupo puede incluir varios modelos compatibles, como LSM6DSL y SC7A20. En cada configuración de bus, habilite solo el modelo previsto para evitar conflictos en la interfaz externa. En este ejemplo:

- `ACC_USING_LSM6DSL` habilita el controlador LSM6DSL.
- `LSM6DSL_USING_I2C` selecciona I2C (`1`) o SPI (`0`). Omita este símbolo si el sensor solo admite una interfaz.
- `LSM6DSL_BUS_NAME` indica el nombre del dispositivo de bus que buscará el controlador de sensor de RT-Thread.
- `LSM6DSL_INT_GPIO_BIT` y `LSM6DSL_INT2_GPIO_BIT` especifican los pines de interrupción cuando la placa los asigna.
- `LSM_USING_AWT`, `LSM_USING_PEDO` y `LSM6DSL_USE_FIFO` representan funciones específicas del dispositivo; defina estos símbolos solo si las admite el controlador elegido.

Este ejemplo sigue la guía SF32LB52x. Otras guías de familia o ramas del SDK pueden ofrecer opciones o rutas de menú distintas; antes de aplicarlo, compruebe los símbolos definidos en la rama de destino.

### Buscar el bus e implementar el acceso a registros { #find-the-bus-and-implement-register-access }

Use `rt_i2c_bus_device_find` o `rt_device_find` para obtener el dispositivo de bus. Después, llame a la API de lectura/escritura correspondiente al bus elegido. La hoja de datos del sensor sigue siendo la referencia principal para la dirección del dispositivo, el mapa de registros, la secuencia de comandos y el ancho de registro.

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

El ejemplo devuelve `-1` si no encuentra el bus, `-2` si falla una transacción y `-3` si el contexto, el manejador del bus o el puntero de datos no son válidos. Adapte la política de errores al controlador que lo integre.

### Configurar una interrupción del sensor { #configure-a-sensor-interrupt }

Configure el pin de interrupción como entrada con `rt_pin_mode`, registre el manejador y la condición de activación con `rt_pin_attach_irq`, y habilite o deshabilite la interrupción con `rt_pin_irq_enable`. El SDK enumera la activación por flanco ascendente (`PIN_IRQ_MODE_RISING`), flanco descendente (`PIN_IRQ_MODE_FALLING`), ambos flancos (`PIN_IRQ_MODE_RISING_FALLING`) y nivel alto o bajo (`PIN_IRQ_MODE_HIGH_LEVEL` / `PIN_IRQ_MODE_LOW_LEVEL`). El contenido del manejador depende del sensor.

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

## Registrar el dispositivo sensor de RT-Thread { #4-register-the-rt-thread-sensor-device }

Añada un archivo `sensor_xxx.c` al directorio del nuevo dispositivo. Su función es exponer el dispositivo mediante el framework de sensores de RT-Thread, para que el código de la aplicación use el sensor sin llamar directamente a funciones de registros específicas del bus.

El registro consta de dos partes:

1. Asignar y registrar una o varias instancias `rt_sensor_device` con `rt_hw_sensor_register`.
2. Proporcionar los callbacks `sensor_ops` para leer datos, controlar el modo y gestionar las transiciones de suspensión/reactivación.

El ejemplo BMP280 de la guía del SDK registra por separado los canales de temperatura y presión barométrica, define sus unidades y rangos, copia la configuración común y comparte la tabla de callbacks:

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

Asigne `type`, `vendor`, `model`, `unit`, `intf_type`, el rango válido y el período mínimo según la hoja de datos del dispositivo. Mantenga completa la ruta de limpieza si falla una asignación o cualquiera de los dos registros.

**Precaución sobre la limpieza del ejemplo fuente:** Si el dispositivo de temperatura se registra correctamente y después falla la asignación de memoria o el registro del dispositivo de presión, la rutina de limpieza del ejemplo libera el dispositivo de temperatura sin darlo de baja antes. En el código de producto, lleve un control de qué dispositivos se registraron correctamente, dé de baja cada uno mediante la API de eliminación admitida por la versión de RT-Thread de destino y solo entonces libere su memoria. No copie sin cambios esta ruta de error.

## Validar el controlador desde FinSH { #5-validate-the-driver-from-finsh }

Después de integrar el controlador en la imagen, añada una función de línea de comandos y regístrela con `FINSH_FUNCTION_EXPORT_ALIAS`. Un comando de validación útil debería comprobar:

- la inicialización del sensor y la detección de la dirección del dispositivo;
- la lectura y escritura de registros mediante I2C o SPI; y
- un resultado funcional propio del sensor, como presión, temperatura o aceleración.

El siguiente comando de prueba para BMP280 ilustra la apertura y el cierre, la lectura de registros, la obtención de temperatura/presión/altitud y la configuración de la velocidad del bus I2C:

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

Antes de aceptar una lectura, compruebe la dirección del dispositivo, lea un registro de identidad o calibración conocido y compare la medición con el rango esperado. Este comando es solo una ayuda básica de puesta en marcha, no código CLI listo para producción: valide los argumentos de cada subcomando, compruebe los valores de retorno de las llamadas al dispositivo y a la API, y añada comprobaciones de límites antes de integrarlo en un producto.

## Páginas relacionadas { #related-pages }

- [Configuración de la placa](../board-configuration.md): ajustes de bus, pines y periféricos gestionados por la placa.
- [Componentes y `sf-pkg`](../components.md): dependencias de paquetes que usa un controlador.
- [Notas de aplicación del SDK](../sdk-application-notes.md): índice completo de notas de aplicación.

## Fuente oficial { #official-source }

- [Guía para añadir sensores — Guía de programación de SiFli SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)
- [Guía de sensores SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/sensor.html)
- [Guía de sensores SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/sensor.html)
- [Guía de sensores SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/sensor.html)
