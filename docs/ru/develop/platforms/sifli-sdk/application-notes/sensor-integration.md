---
icon: lucide/satellite-dish
title: "Подключение датчиков и чтение данных"
description: "Добавьте драйвер датчика в SiFli-SDK, зарегистрируйте устройство через RT-Thread и проверьте его работу из консоли FinSH."
tags: [Разработка, SiFli-SDK, Практические руководства, Датчики]
---

# Подключение датчиков и чтение данных { #integrate-and-read-sensors }

В этой статье руководство SiFli по [интеграции датчиков](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html) преобразовано в практический порядок разработки драйвера. Аналогичные руководства опубликованы для SF32LB52x, SF32LB55x, SF32LB56x и SF32LB58x; прежде чем переносить пути или имена символов, проверьте целевую ветку SDK. Здесь описан весь путь: от изучения документации на датчик и проверки разводки платы до добавления настроек Kconfig, реализации функций чтения и записи по шине, обработки прерываний, регистрации датчика в RT-Thread и проверки через командную строку.

В примерах используются шестиосевой датчик LSM6DSL (акселерометр и гироскоп), а также датчик температуры и атмосферного давления BMP280. Имена API и идентификаторы приведены как в примерах руководства SDK; перед переносом в продукт проверьте их в целевой ветке SDK.

!!! note "Применимость к семействам"
    В статье собран общий порядок разработки драйверов для SF32LB52x, SF32LB55x, SF32LB56x и SF32LB58x. Код LSM6DSL/BMP280 приведён только как пример; конкретный экземпляр шины, номера GPIO, маршрутизация прерываний, пути Kconfig и доступные периферийные блоки зависят от семейства и платы.

## Проверьте аппаратную часть и интерфейс датчика { #1-confirm-the-hardware-and-sensor-interface }

Сначала изучите документацию на датчик и определите его назначение и интерфейс подключения к хосту. В руководстве SDK в качестве примеров перечислены шестиосевые датчики (акселерометр и гироскоп), датчики температуры, атмосферного давления, магнитного поля и освещённости, GPS-датчики и датчики двигателя. В руководстве рассматриваются интерфейсы I2C, SPI и UART.

Перед разработкой драйвера:

- Убедитесь по схеме и разводке платы, что выбранная шина включена и выведена на контакты корпуса микросхемы.
- Проверьте совместимость диапазонов напряжения и частоты датчика и устройства SF32.
- Определите имя шины, адрес устройства, сигнал выбора микросхемы (если используется), управление питанием, сброс и линии прерываний.
- Согласуйте с разработчиком приложения, какие операции получения данных и управления должен предоставлять драйвер.

## Подготовьте драйвер и настройки сборки { #2-prepare-the-driver-and-build-configuration }

Драйверы периферийных устройств SiFli-SDK находятся в `rtos/rthread/bsp/sifli/peripherals`. Выбрав шину и способ реализации, создайте в этом каталоге директорию нового устройства. Добавьте для него параметры `menuconfig` в `rtos/rthread/bsp/sifli/peripherals/Kconfig`, в том числе:

- параметр включения датчика;
- выбор поддерживаемой шины и её имя, например I2C, SPI или UART;
- настройки GPIO для управления питанием, сбросом, выбором микросхемы и прерыванием;
- дополнительные функции датчика, например обнаружение активности, шагомер или FIFO.

Реализуйте драйвер в созданной директории. Получайте имя шины, номера GPIO и номера прерываний из символов Kconfig, а не задавайте значения конкретной платы непосредственно в коде. Затем свяжите драйвер с соответствующими символами Kconfig в файле `SConscript` этой директории.

В каталоге проекта запустите `menuconfig`, выберите **Select board peripherals**, включите новый модуль и задайте параметры платы в его вложенных пунктах меню.

## Настройте интерфейс в Kconfig { #3-configure-the-interface-in-kconfig }

Следующий пример Kconfig взят из руководства для SF32LB52x. Он включает LSM6DSL в группе шестиосевых датчиков: `SENSOR_USING_6D` — общий параметр группы, а вложенный параметр выбирает реализацию LSM6DSL.

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

В группе может быть предусмотрено несколько моделей, например LSM6DSL и SC7A20. Чтобы избежать конфликтов внешних интерфейсов, одновременно включайте только ту модель, которая соответствует выбранной конфигурации шины. В этом примере:

- `ACC_USING_LSM6DSL` включает драйвер LSM6DSL.
- `LSM6DSL_USING_I2C` выбирает I2C (`1`) или SPI (`0`). Если датчик поддерживает только один интерфейс, этот символ не требуется.
- `LSM6DSL_BUS_NAME` задаёт имя устройства шины, по которому драйвер датчика RT-Thread найдёт нужный интерфейс.
- `LSM6DSL_INT_GPIO_BIT` и `LSM6DSL_INT2_GPIO_BIT` задают линии прерываний, если они предусмотрены разводкой платы.
- `LSM_USING_AWT`, `LSM_USING_PEDO` и `LSM6DSL_USE_FIFO` включают функции конкретного устройства; задавайте их только при поддержке этих функций выбранным драйвером.

Этот пример соответствует руководству для SF32LB52x. В документации для других семейств и в разных ветках SDK набор параметров и пути меню могут отличаться; перед применением проверьте символы, определённые в целевой ветке.

### Найдите шину и реализуйте доступ к регистрам { #find-the-bus-and-implement-register-access }

Получите устройство шины с помощью `rt_i2c_bus_device_find` или `rt_device_find`, затем вызовите соответствующие функции чтения и записи для выбранного интерфейса. Адрес устройства, карта регистров, последовательность команд и ширина регистров должны соответствовать документации на датчик.

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

В примере возвращается `-1`, если шина не найдена, `-2` при ошибке обмена по шине и `-3`, если недействителен контекст, дескриптор шины или указатель на данные. Согласуйте обработку ошибок с остальной частью драйвера.

### Настройте прерывание датчика { #configure-a-sensor-interrupt }

Настройте линию прерывания как вход с помощью `rt_pin_mode`, назначьте обработчик и условие срабатывания через `rt_pin_attach_irq`, а включайте или отключайте прерывание вызовом `rt_pin_irq_enable`. SDK перечисляет срабатывания по фронту (`PIN_IRQ_MODE_RISING`), спаду (`PIN_IRQ_MODE_FALLING`), обоим фронтам (`PIN_IRQ_MODE_RISING_FALLING`), а также по высокому или низкому уровню (`PIN_IRQ_MODE_HIGH_LEVEL` / `PIN_IRQ_MODE_LOW_LEVEL`). Реализация обработчика зависит от датчика.

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

## Зарегистрируйте датчик в RT-Thread { #4-register-the-rt-thread-sensor-device }

Добавьте файл `sensor_xxx.c` в каталог нового устройства. Он должен зарегистрировать датчик во фреймворке датчиков RT-Thread, чтобы приложение могло работать с ним через интерфейс устройства, а не напрямую вызывать функции доступа к регистрам шины.

Регистрация включает два этапа:

1. Выделите память и зарегистрируйте один или несколько объектов `rt_sensor_device` с помощью `rt_hw_sensor_register`.
2. Реализуйте функции обратного вызова `sensor_ops` для чтения данных, управления режимом и переходов в сон и пробуждения.

В примере BMP280 из руководства SDK каналы температуры и атмосферного давления регистрируются отдельно. Для каждого задаются единицы измерения и диапазон; общая конфигурация копируется, а таблица функций обратного вызова используется совместно:

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

Задайте значения `type`, `vendor`, `model`, `unit`, `intf_type`, допустимый диапазон измерений и минимальный период опроса в соответствии с документацией на датчик. При ошибке выделения памяти или любой регистрации освободите все уже выделенные ресурсы.

**Предупреждение о пути очистки в исходном примере:** если регистрация температурного устройства прошла успешно, а затем не удалось выделить память для барометрического устройства или зарегистрировать его, путь очистки примера освобождает температурное устройство, не отменив предварительно его регистрацию. В коде продукта отслеживайте, какие устройства зарегистрированы успешно; каждое зарегистрированное устройство сначала снимайте с регистрации с помощью API удаления, поддерживаемого целевой версией RT-Thread, и только после этого освобождайте его память. Не копируйте этот путь обработки ошибки без изменений.

## Проверьте драйвер из FinSH { #5-validate-the-driver-from-finsh }

После включения драйвера в образ добавьте команду и зарегистрируйте её с помощью `FINSH_FUNCTION_EXPORT_ALIAS`. Команда проверки должна как минимум охватывать:

- инициализацию датчика и обнаружение его адреса;
- чтение и запись регистров по I2C или SPI;
- получение результата, характерного для датчика: например, давления, температуры или ускорения.

Следующая тестовая команда для BMP280 показывает открытие и закрытие устройства, чтение регистра, получение температуры, давления и высоты, а также настройку скорости шины I2C:

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

Прежде чем считать показания достоверными, проверьте адрес устройства, прочитайте известный регистр идентификатора или калибровки и сравните измерение с ожидаемым диапазоном. Эта команда предназначена только для базовой проверки при запуске и не является готовым для производства CLI-кодом. Перед включением в продукт проверяйте число и допустимые значения аргументов каждой подкоманды, анализируйте коды возврата вызовов устройства и API, а также добавьте проверки границ.

## Связанные страницы { #related-pages }

- [Настройка платы](../board-configuration.md) — параметры шин, выводов и периферии, определяемые платой.
- [Компоненты и `sf-pkg`](../components.md) — зависимости от пакетов, используемых драйвером.
- [Практические руководства по SiFli-SDK](../sdk-application-notes.md) — полный перечень руководств по применению SDK.

## Официальные источники { #official-source }

- [Руководство по добавлению датчиков — руководство по программированию SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)
- [Руководство по датчикам SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/sensor.html)
- [Руководство по датчикам SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/sensor.html)
- [Руководство по датчикам SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/sensor.html)
