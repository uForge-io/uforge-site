---
icon: lucide/layers
description: "Обзор поддержки Zephyr в downstream-ветке OpenSiFli для SF32LB52 DevKit LCD: идентификация платы, границы конфигурации, охват драйверов и риски интеграции."
tags:
    - Разработка
    - Zephyr
---

# Zephyr { #zephyr }

OpenSiFli активно развивает поддержку Zephyr в репозиториях [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream) и [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream). В downstream-дереве есть плата `sf32lb52_devkit_lcd`, интеграция SiFli HAL, файлы devicetree для SF32LB52, драйверы, тесты и overlays для примеров.

Выбирайте Zephyr, если вам нужны его API, devicetree, Kconfig, переносимая архитектура RTOS или путь интеграции с ArduinoCore-zephyr. SiFli-SDK выбирайте, если сейчас нужен наиболее полный набор возможностей производителя.

Инструкции по настройке workspace, первой сборке `hello_world`, прошивке и проверке консоли приведены в разделе [Начало работы с Zephyr Downstream](../../../getting-started/zephyr/getting-started-zephyr-upstream.md). На этой странице рассматривается downstream-платформа после того, как базовая конфигурация успешно запущена.

Основные источники:

- [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)
- [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)
- [Документация проекта Zephyr](https://docs.zephyrproject.org/)
- [SF32LB52-DevKit-LCD в документации плат Zephyr](https://docs.zephyrproject.org/latest/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)

## Проверенная downstream-плата { #verified-downstream-board }

<div align="center"><em>Таблица: Проверенная downstream-плата</em></div>

<div align="center" markdown>

| Параметр | Значение |
|:---------|:---------|
| Плата | `sf32lb52_devkit_lcd` |
| Полное название | SF32LB52-DevKit-LCD |
| SoC | `sf32lb525uc6` |
| Runner для прошивки | `sftool` |
| Аргумент runner | `--chip=SF32LB52` |
| Консоль | `usart1` |
| Скорость консоли | `1000000` бод |
| Выбранный узел дисплея | `co5300` |

</div>

В документации downstream-платы описан модуль SF32LB52x-MOD-N16R8 с 8 MB OPI-PSRAM, 128 Mbit QSPI-NOR, кварцевыми резонаторами на 48 MHz и 32,768 kHz, а также интерфейсами дисплея, аудио, USB и слотом microSD.

## Границы конфигурации { #configuration-boundaries }

Цель сборки для платы, devicetree, конфигурация Kconfig, overlays и ревизия downstream-HAL вместе образуют границу совместимости. Зафиксируйте ревизию downstream в каждом проекте, а overlays и фрагменты конфигурации приложения храните под контролем версий вместе с исходным кодом приложения.

Не переносите в Zephyr имя платы, назначение выводов или параметры runner из проектов Arduino или SiFli-SDK. Эти три пути используют разные модели конфигурации, даже если работают на одной физической плате.

## Аппаратные особенности платы { #board-hardware-notes }

В документации downstream-платы перечислены:

- Модуль SF32LB52x-MOD-N16R8 на базе SF32LB525UC6.
- 8 MB OPI-PSRAM.
- 128 Mbit QSPI-NOR.
- Кварцевые резонаторы на 48 MHz и 32,768 kHz.
- Интерфейсы дисплея SPI/DSPI/QSPI и MCU/8080.
- Поддержка сенсорного ввода по I2C.
- Аналоговый вход микрофона и аналоговый аудиовыход со встроенным усилителем Class-D.
- Разъёмы USB Type-C для USB-to-serial и USB 2.0 FS.
- Карта microSD через SPI.

## Драйверы, присутствующие в downstream-дереве { #driver-areas-present-in-the-downstream-tree }

В downstream-дереве есть драйверы SF32LB, bindings или конфигурации примеров для конкретной платы в таких областях, как:

- GPIO, pinctrl, UART, I2C, SPI, ADC, PWM, RTC и watchdog.
- Flash, контроллер памяти, OPI PSRAM и QSPI NOR.
- Display/LCDC/MIPI DBI и конфигурация примера LVGL.
- Bluetooth HCI mailbox и конфигурация BAP broadcast sink.
- Аудиокодек, DMA, CRC, криптография, энтропия, OTP/eFuse, регуляторы напряжения, сброс и датчик температуры.

Наличие кода в дереве не означает, что каждый продуктовый сценарий готов к серийному производству. Проверьте точную комбинацию примера и драйвера на целевой плате.

## Последовательность интеграции { #integration-sequence }

После проверки базовой конфигурации при первом запуске проверяйте подсистемы по одной: ввод-вывод платы, работу UART, дисплей, хранение данных, Bluetooth, аудио и управление питанием. Для каждого этапа храните вместе пример, overlay, фрагменты Kconfig, ревизию downstream и последовательный журнал. Само наличие драйвера в дереве не подтверждает готовность полного приложения к серийному производству.

## Контрольный список рисков downstream { #downstream-risk-checklist }

- Вы используете downstream-ветку OpenSiFli, а не основную ветку Zephyr?
- Ревизия HAL зафиксирована?
- Использует ли `west flash` ожидаемый runner `sftool`?
- Настроена ли консоль на `1000000` бод?
- Подключены ли overlays, необходимые для примера?
- Подтверждена ли поддержка драйвера тестами или он просто присутствует в дереве?
