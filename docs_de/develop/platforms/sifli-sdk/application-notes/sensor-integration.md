---
icon: lucide/satellite-dish
title: "Sensoren integrieren und auslesen"
description: "Einen Sensortreiber zu SiFli-SDK hinzufügen, das Gerät über RT-Thread anbinden und registrieren sowie es über die FinSH-Shell validieren."
tags: [Entwicklung, SiFli-SDK, Anwendungshinweise, Sensoren]
---

# Sensoren integrieren und auslesen { #integrate-and-read-sensors }

Dieser Artikel überführt den [Sensorintegrationsleitfaden von SiFli](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html) in einen praktischen Ablauf zur Treiberentwicklung. Derselbe Leitfaden wird für SF32LB52x, SF32LB55x, SF32LB56x und SF32LB58x veröffentlicht; überprüfen Sie den Ziel-SDK-Branch, bevor Sie Pfade oder Symbole übernehmen. Er behandelt den Weg vom Datenblatt eines Sensors und der Platinenverdrahtung über einen Kconfig-Eintrag, Bus-Lese-/Schreib-Callbacks, Interrupt-Behandlung und RT-Thread-Sensorregistrierung bis zur Validierung über die Befehlszeile.

Die Beispiele verwenden den sechsachsigen Sensor LSM6DSL (Beschleunigungsmesser und Gyroskop) sowie den Temperatur- und Luftdrucksensor BMP280. Sie übernehmen die API-Namen und Beispielkennungen des SDK-Leitfadens; überprüfen Sie den Ziel-SDK-Branch, bevor Sie sie in ein Produkt übernehmen.

!!! note "Geltungsbereich nach Chipfamilie"
    Der hier beschriebene Ablauf zur Treiberentwicklung gilt für SF32LB52x, SF32LB55x, SF32LB56x und SF32LB58x. Der LSM6DSL-/BMP280-Code ist als Implementierungsbeispiel zu verstehen; Businstanz, GPIO-Nummern, Interrupt-Routing, Kconfig-Pfade und verfügbare Peripheriegeräte richten sich nach der Zielfamilie und dem Board.

## Hardware und Sensorschnittstelle bestätigen { #1-confirm-the-hardware-and-sensor-interface }

Beginnen Sie mit dem Datenblatt des Sensors und ermitteln Sie sowohl seine Funktion als auch seine Host-Schnittstelle. Der SDK-Leitfaden führt als Beispiele 6-Achsen-Sensoren (Beschleunigungsmesser und Gyroskope), Temperatur-, Luftdruck-, Erdmagnetfeld- und Lichtsensoren sowie GPS- und Motorsensoren auf. Die in diesem Leitfaden unterstützten Host-Schnittstellen sind I2C, SPI und UART.

Vor dem Schreiben eines Treibers:

- Prüfen Sie anhand des Hardwaredesigns, dass der ausgewählte Bus aktiviert und zu den Gehäusepins geführt ist.
- Prüfen Sie, dass die Spannungs- und Frequenzbereiche von Sensor und SF32-Gerät kompatibel sind.
- Ermitteln Sie Busname, Geräteadresse, Chip-Select (falls zutreffend), Stromversorgungssteuerung, Reset und Interrupt-Pins.
- Stimmen Sie mit dem Anwendungsverantwortlichen die Daten- und Steueroperationen ab, die der Treiber bereitstellen muss.

## Treiber und Build-Konfiguration vorbereiten { #2-prepare-the-driver-and-build-configuration }

SiFli-SDK-Peripherietreiber befinden sich unter `rtos/rthread/bsp/sifli/peripherals`. Fügen Sie nach der Wahl von Bus und Implementierung ein Verzeichnis für das neue Gerät hinzu. Fügen Sie dessen `menuconfig`-Einträge zu `rtos/rthread/bsp/sifli/peripherals/Kconfig` hinzu, einschließlich:

- des Schalters zur Aktivierung des Sensors;
- der Auswahl und Bezeichnung eines unterstützten Busses, zum Beispiel I2C, SPI oder UART;
- der Versorgungs-, Reset-, Chip-Select- und Interrupt-GPIO-Einstellungen; und
- optionaler Sensorfunktionen wie Aktivitätserkennung, Schrittzähler oder FIFO-Unterstützung.

Implementieren Sie den Treiber im neuen Verzeichnis. Lesen Sie Busname, GPIO-Nummern und Interrupt-Nummern aus den Kconfig-Symbolen, anstatt Board-Werte fest zu codieren. Verknüpfen Sie den Treiber abschließend über die `SConscript`-Datei dieses Verzeichnisses mit seinen Kconfig-Symbolen.

Führen Sie aus dem Projektverzeichnis `menuconfig` aus, wählen Sie **Select board peripherals**, aktivieren Sie das neue Modul und rufen Sie dessen Unteroptionen auf, um die boardspezifischen Werte einzustellen.

## Die Schnittstelle in Kconfig konfigurieren { #3-configure-the-interface-in-kconfig }

Das folgende Kconfig-Beispiel stammt aus dem SF32LB52x-Leitfaden. Es aktiviert einen LSM6DSL innerhalb einer Sechsachsen-Sensorgruppe: `SENSOR_USING_6D` ist der Gruppenschalter, und der untergeordnete Schalter wählt die LSM6DSL-Implementierung aus.

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

Der Gruppenschalter kann mehrere unterstützte Modelle enthalten, wie LSM6DSL und SC7A20. Aktivieren Sie zu einem Zeitpunkt nur das für eine bestimmte Busanordnung vorgesehene Modell, um Konflikte an der externen Schnittstelle zu vermeiden. In diesem Beispiel:

- `ACC_USING_LSM6DSL` aktiviert den LSM6DSL-Treiber.
- `LSM6DSL_USING_I2C` wählt I2C (`1`) oder SPI (`0`) aus. Lassen Sie dieses Symbol weg, wenn der Sensor nur eine Schnittstelle unterstützt.
- `LSM6DSL_BUS_NAME` benennt das Busgerät, das der RT-Thread-Sensortreiber finden wird.
- `LSM6DSL_INT_GPIO_BIT` und `LSM6DSL_INT2_GPIO_BIT` beschreiben die Interrupt-Pins, wenn das Board sie zuweist.
- `LSM_USING_AWT`, `LSM_USING_PEDO` und `LSM6DSL_USE_FIFO` stehen für gerätespezifische Funktionen; definieren Sie sie nur, wenn der ausgewählte Treiber sie unterstützt.

Dieses Beispiel folgt dem SF32LB52x-Leitfaden. Andere Familienleitfäden oder SDK-Branches können abweichende Optionen oder Menüpfade enthalten. Prüfen Sie vor der Übernahme die tatsächlich im Ziel-Branch definierten Symbole.

### Den Bus finden und den Registerzugriff implementieren { #find-the-bus-and-implement-register-access }

Verwenden Sie `rt_i2c_bus_device_find` oder `rt_device_find`, um das Busgerät zu ermitteln. Rufen Sie dann die passende Bus-Lese-/Schreib-API für die ausgewählte Schnittstelle auf. Das Datenblatt des Sensors ist maßgeblich für Geräteadresse, Registerbelegung, Befehlssequenz und Registerbreite.

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

Das Beispiel gibt `-1` zurück, wenn der Bus nicht gefunden werden kann, `-2`, wenn eine Bus-Transaktion fehlschlägt, und `-3`, wenn Kontext, Bus-Handle oder Datenzeiger ungültig sind. Passen Sie die Fehlerbehandlung an den umgebenden Treiber an.

### Einen Sensor-Interrupt konfigurieren { #configure-a-sensor-interrupt }

Stellen Sie den Interrupt-Pin mit `rt_pin_mode` als Eingang ein, registrieren Sie Handler und Auslösebedingung mit `rt_pin_attach_irq` und aktivieren oder deaktivieren Sie den Interrupt mit `rt_pin_irq_enable`. Das SDK listet steigende Flanke (`PIN_IRQ_MODE_RISING`), fallende Flanke (`PIN_IRQ_MODE_FALLING`), beide Flanken (`PIN_IRQ_MODE_RISING_FALLING`) sowie High- oder Low-Pegel (`PIN_IRQ_MODE_HIGH_LEVEL` / `PIN_IRQ_MODE_LOW_LEVEL`) als Auslöser auf. Der Handler selbst hängt vom Sensor ab.

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

## Das RT-Thread-Sensorgerät registrieren { #4-register-the-rt-thread-sensor-device }

Fügen Sie eine Datei `sensor_xxx.c` im neuen Geräteverzeichnis hinzu. Ihre Aufgabe ist es, das Gerät über das Sensor-Framework von RT-Thread verfügbar zu machen, damit der Anwendungscode das Sensorgerät statt der busspezifischen Registerfunktionen direkt nutzen kann.

Die Registrierung besteht aus zwei Teilen:

1. Zuweisen und Registrieren einer oder mehrerer `rt_sensor_device`-Instanzen mit `rt_hw_sensor_register`.
2. Bereitstellen der `sensor_ops`-Callbacks für Daten-Lesevorgänge, Modussteuerung sowie den Wechsel in den Schlafmodus und zurück in den Betriebszustand.

Das BMP280-Beispiel des SDK-Leitfadens registriert Temperatur- und Luftdruckkanäle getrennt, legt deren Einheiten und Bereiche fest, kopiert die gemeinsame Konfiguration und verwendet für beide Kanäle dieselbe Callback-Tabelle:

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

Setzen Sie `type`, `vendor`, `model`, `unit`, `intf_type`, den gültigen Bereich und die Mindestperiode auf die Werte im Datenblatt des Geräts. Halten Sie den Bereinigungspfad vollständig, falls eine Speicherzuweisung oder eine der beiden Registrierungen fehlschlägt.

**Hinweis zum Bereinigungspfad des Quellbeispiels:** Wird das Temperaturgerät erfolgreich registriert und schlägt anschließend die Speicherzuweisung oder Registrierung des Barometergeräts fehl, gibt die Bereinigungsroutine des Beispiels den Speicher des Temperaturgeräts frei, ohne es zuvor abzumelden. Verfolgen Sie im Produktcode, welche Geräte erfolgreich registriert wurden, melden Sie jedes davon über die von der Zielversion von RT-Thread unterstützte Abmelde-API ab und geben Sie den Speicher erst danach frei. Übernehmen Sie diesen Fehlerpfad nicht unverändert.

## Den Treiber über FinSH validieren { #5-validate-the-driver-from-finsh }

Nachdem der Treiber in das Image eingebunden wurde, fügen Sie eine Befehlszeilenfunktion hinzu und registrieren Sie sie mit `FINSH_FUNCTION_EXPORT_ALIAS`. Ein sinnvoller Validierungsbefehl sollte abdecken:

- Sensorinitialisierung und Erkennung der Geräteadresse;
- Register-Lese- und -Schreibvorgänge über I2C oder SPI; und
- ein sensorspezifisches Funktionsergebnis wie Druck, Temperatur oder Beschleunigung.

Der folgende BMP280-Testbefehl veranschaulicht Öffnen, Schließen, Register-Lesen, Temperatur-/Druck-/Höhenauslesung sowie die I2C-Busgeschwindigkeitskonfiguration:

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

Bevor Sie einen Messwert als gültig akzeptieren, überprüfen Sie die Geräteadresse, lesen Sie ein bekanntes Identitäts- oder Kalibrierregister und vergleichen Sie den Messwert mit dem erwarteten Bereich. Das Kommando dient nur als einfache Bring-up-Hilfe und ist kein produktionsreifer CLI-Code. Validieren Sie vor der Integration die Argumente jedes Unterkommandos, kontrollieren Sie die Rückgabewerte von Geräte- und API-Aufrufen und ergänzen Sie Grenzprüfungen.

## Verwandte Seiten { #related-pages }

- [Board-Konfiguration](../board-configuration.md) — boardspezifische Bus-, Pin- und Peripherieeinstellungen.
- [Komponenten und `sf-pkg`](../components.md) — von einem Treiber genutzte Paketabhängigkeiten.
- [SDK-Anwendungshinweise](../sdk-application-notes.md) — der vollständige Index der Anwendungshinweise.

## Offizielle Quelle { #official-source }

- [Leitfaden zum Hinzufügen von Sensoren — SiFli-SDK-Programmierhandbuch](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)
- [SF32LB55x-Sensorleitfaden](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/sensor.html)
- [SF32LB56x-Sensorleitfaden](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/sensor.html)
- [SF32LB58x-Sensorleitfaden](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/sensor.html)
