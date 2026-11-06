---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Core-3p3: компактная плата SF32LB52x, питание MCU 1,8 или 3,3 V перемычкой и прямой доступ к GPIO, дисплею, аудио, USB и линиям питания."
tags:
    - Аппаратное обеспечение
    - Отладочная плата
---

# SF32LB52-DevKit-Core-3p3 { #sf32lb52-devkit-core-3p3 }

## Обзор { #overview }

SF32LB52-DevKit-Core-3p3 — компактная плата для оценки микросхем семейства SF32LB52x. Перемычка позволяет выбрать напряжение питания MCU: 1,8 V или 3,3 V. Основные сигналы MCU выведены на краевые разъёмы; в металлизированные полуотверстия можно установить штыревые контакты без пайки. Плата подойдёт инженерам, которым нужен прямой доступ к GPIO, последовательным шинам, сигналам дисплея, аудио, ADC, PWM и линиям питания.

Размеры платы — 30,88 × 68 mm. Она подходит для компактных лабораторных прототипов и предоставляет необходимые интерфейсы для первоначальной проверки аппаратной части и прошивки SF32LB52x.

![Вид платы SF32LB52-DevKit-Core-3p3 спереди](assets/sf32lb52x/Core-3p3_Front_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — вид спереди</em></div>

![Вид платы SF32LB52-DevKit-Core-3p3 сзади](assets/sf32lb52x/Core-3p3_Back_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — вид сзади</em></div>

## Варианты платы { #board-variants }

<div align="center"><em>Варианты SF32LB52-DevKit-Core-3p3</em></div>

<div align="center" markdown>

| Вариант | MCU | Память в корпусе | Память на плате |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Core-3p3-N1 | SF32LB52BU36 | SPI NOR Flash, 1 MB | Нет |
| SF32LB52-DevKit-Core-3p3-N4 | SF32LB52BU56 | SPI NOR Flash, 4 MB | Нет |
| SF32LB52-DevKit-Core-3p3-R4N16 | SF32LB52EUB6 | OPI-PSRAM, 4 MB | SPI NOR Flash, 16 MB |
| SF32LB52-DevKit-Core-3p3-R8N16 | SF32LB52GUC6 | OPI-PSRAM, 8 MB | SPI NOR Flash, 16 MB |
| SF32LB52-DevKit-Core-3p3-R16N16 | SF32LB52JUD6 | OPI-PSRAM, 16 MB | SPI NOR Flash, 16 MB |

</div>

Варианты только с NOR подходят для компактных Bluetooth-устройств, задач управления и простых человеко-машинных интерфейсов (HMI). Если приложению нужны крупные графические ресурсы, буферы кадров, файловые системы или хранилище для приложений, выбирайте вариант с PSRAM и внешней NOR.

**Расхождения в документации — проверьте маркировку перед выбором.** В [подробном руководстве Core-3p3](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.html) конфигурация SF32LB52JUD6 обозначена как текущая `R16N16 V1.0.0`, а в [руководстве по моделям плат](https://wiki.sifli.com/en/board/devkit_guide.html) та же конфигурация JUD6 с 16 MB PSRAM и 16 MB NOR называется `N16R16`. В сведениях о версии подробного руководства для EUB6 указано 8 MB встроенной PSRAM, тогда как в списке характеристик и таблице вариантов — 4 MB. В [обзоре SF32LB52](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52/SF32LB52-Overview-B3.md) SiFli также указывает 4 MB для EUB6, поэтому в этой статье используется это значение. Чтобы определить точный вариант платы, сверьте её маркировку и соответствующие схему и BOM.

## Основные особенности { #board-highlights }

- Варианты MCU SF32LB52x с памятью только NOR или с конфигурацией PSRAM + NOR
- Основной кварцевый резонатор 48 MHz и RTC-резонатор 32,768 kHz
- Питание через USB Type-C и интерфейс USB-UART на CH340N для загрузки прошивки и отладки
- Антенна на плате (PCBA) и разъём для антенны I-PEX
- Питание MCU выбирается перемычкой: 1,8 V или 3,3 V
- Сигналы USB 2.0 FS выведены на краевой разъём
- На плату выведены 37 GPIO; MCU предоставляет 3 UART, 4 интерфейса I2C, 2 GPTIM, 2 интерфейса SPI и 6 каналов GPADC
- Все GPIO можно настроить как UART, I2C или GPTIM; мультиплексирование также включает SPI, PWM, I2S, PDM и входы пробуждения
- 16-контактный разъём FPC для дисплея с шагом 0,5 mm; интерфейсы дисплея поддерживают SPI, DSPI и Quad-SPI, включая QSPI в режиме DDR
- Сигналы I2C для сенсорной панели
- Выводы аналогового микрофона и дифференциального аудиовыхода
- Вход цифрового микрофона PDM
- Один пользовательский светодиод
- Кнопка питания и функциональная кнопка
- Контрольные точки для измерения тока отдельной линии питания; SiFli также описывает измерение потребления MCU, минимальной системы и всей платы

## Когда использовать эту плату { #when-to-use-this-board }

Выбирайте SF32LB52-DevKit-Core-3p3, если нужен наиболее прямой доступ к сигналам SF32LB52x.

- Отладка собственных дочерних плат или плат с датчиками
- Оценка вариантов памяти SF32LB52x
- Прототипирование функций LCD, аудио, USB и GPIO
- Измерение тока в отдельных линиях питания
- Проверка прошивки до проектирования компактной платы для изделия

Для более компактной платы в формате модуля с металлизированными полуотверстиями используйте [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Для готовой платы с дисплеем, аудиоусилителем, слотом для TF-карты и зарядным устройством выберите [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md).

## Питание { #power }

Предусмотрены три входа питания:

- Питание через USB Type-C — рекомендуется для обычной разработки и отладки
- Подача 5 V через контакты 5 V и GND краевого разъёма при отключённом USB
- Подача 3,3 V через контакты 3,3 V и GND краевого разъёма при отключённом USB; можно использовать внешний лабораторный источник питания

Отдельная перемычка выбирает питание MCU между 1,8 V и 3,3 V. Эта настройка не связана с внешними контактами питания 1,8 V и 3,3 V на краевом разъёме. Перед переключением перемычки или подключением внешней схемы сверьте распиновку и схему именно вашей ревизии платы.

Для измерения тока отдельной линии питания включите амперметр последовательно в проверяемую линию через предусмотренные точки измерения платы.

При подключённом USB Type-C выбранные контакты разъёма также могут выдавать 3,3 V, 1,8 V и 5 V. Перед подключением внешних схем проверьте требуемое направление питания.

На плате установлен выключатель питания. Сигнал RTS# микросхемы CH340N может управлять разрешением работы платы, позволяя хост-инструменту сбрасывать MCU при загрузке прошивки или отладке.

При питании через USB Type-C установленный на плате LDO преобразует 5 V VBUS в 3,3 V.

## Загрузка прошивки и отладка { #download-and-debug }

Для загрузки прошивки и программной отладки используйте UART-порт USB Type-C.

- **Режим загрузки**: включите BOOT в программе-загрузчике, затем включите питание платы или выполните сброс.
- **Режим отладки/журналирования**: отключите BOOT, затем включите питание платы или выполните сброс.
- **Сброс**: используйте кнопку сброса/питания на плате или путь сброса по RTS, управляемый инструментом.

## Органы управления { #user-controls }

<div align="center"><em>Сигналы органов управления</em></div>

<div align="center" markdown>

| Функция | GPIO | Поведение |
| :--- | :--- | :--- |
| LED | PA32 | Активный высокий уровень |
| KEY1 | PA34 | Активный высокий уровень; сброс при удержании в течение 10 с |
| KEY2 | PA33 | Активный высокий уровень |

</div>

## Интерфейс дисплея { #display-interface }

Плата поддерживает интерфейсы LCD по SPI, DSPI и Quad-SPI, включая QSPI в режиме DDR, через вертикальный разъём FPC на 16 контактов с шагом 0,5 mm, откидным фиксатором и нижними контактами. На разъём выведены сигналы сброса LCD, PWM подсветки, TE, выбора микросхемы, тактовый сигнал, четыре линии данных и сигналы I2C сенсорной панели.

![Переходной шлейф FPC](assets/sf32lb52x/FPC-22P.png){ loading="lazy" }
<div align="center"><em>Переходной шлейф FPC</em></div>

### Распиновка 16-контактного FPC LCD { #16-pin-lcd-fpc-signal-map }

<div align="center"><em>Распиновка 16-контактного FPC LCD</em></div>

<div align="center" markdown>

| Контакт | Сигнал | Функция |
| :--- | :--- | :--- |
| 1 | GND | Земля |
| 2 | PA00 | Сброс LCD |
| 3 | PA01 | PWM подсветки |
| 4 | PA02 | LCD TE / I2S1_MCLK |
| 5 | PA03 | LCD CS / I2S1_SDO |
| 6 | PA04 | LCD CLK / I2S1_SDI |
| 7 | PA05 | LCD D0 / I2S1_BCK |
| 8 | PA06 | LCD D1 / I2S1_LRCK |
| 9 | PA07 | LCD D2 / PDM1_CLK |
| 10 | PA08 | LCD D3 / PDM1_DAT |
| 11 | 3.3V | Выход питания дисплея |
| 12 | GND | Земля |
| 13 | PA09 | Прерывание сенсорной панели |
| 14 | PA11 | SDA интерфейса I2C сенсорной панели |
| 15 | PA20 | SCL интерфейса I2C сенсорной панели |
| 16 | PA10 | Сброс сенсорной панели |

</div>

В китайском руководстве SiFli указано, что AMOLED-модуль диагональю 1,85 дюйма подключается напрямую кабелем FPC на 16 контактов. Однако в английском руководстве указан кабель FPC-22p, а файл иллюстрации называется `FPC-22P`. Сам разъём платы рассчитан на 16 контактов. Источники не объясняют это расхождение; перед подключением сверьте число контактов и распиновку кабеля с дисплейным модулем.

## Сводка сигналов разъёмов { #header-signal-summary }

На плату выведены два краевых разъёма по 24 контакта. На одной стороне расположены главным образом GPIO общего назначения, SPI2, USB, GPADC и питание; на другой — LCD, сенсорная панель, отладочный UART, аудио и питание.

![Распиновка SF32LB52-DevKit-Core-3p3](assets/sf32lb52x/SF32LB52-DevKit-Core-3p3-T-pinout.svg){ loading="lazy" }
<div align="center"><em>Распиновка SF32LB52-DevKit-Core-3p3</em></div>

### Разъём общих линий ввода-вывода { #general-io-header }

<div align="center"><em>Назначение контактов разъёма общих линий ввода-вывода</em></div>

<div align="center" markdown>

| Группа контактов | Сигналы | Основные функции |
| :--- | :--- | :--- |
| 2-9 | PA44..PA37 | UART, I2C, GPTIM, SPI2, входы пробуждения |
| 10-11 | PA36 / PA35 | USB DM / USB DP, UART, I2C, GPTIM |
| 12-15 | PA31..PA28 | GPADC3..0, SPI1, I2S1, UART, I2C |
| 17 | 3.3V | Вход или выход 3,3 V в зависимости от питания USB |
| 18-21 | PA27..PA24 | Входы пробуждения, SPI1, I2S1 |
| 22 | PA34 | UART, I2C, GPTIM, GPADC6, WKUP10 |
| 23-24 | PA33 / PA32 | UART, I2C, GPTIM, GPADC5 / GPADC4 |

</div>

<div align="center"><em>Таблица: функции контактов J1 и подтяжки после сброса</em></div>

<div align="center" markdown>

| Контакт | Имя контакта | Функция по умолчанию после сброса и функции мультиплексирования | Подтяжка |
| :--- | :--- | :--- | :--- |
| 1 | GND | Земля |  |
| 2 | PA_44 | **PA44**, UART, I2C, GPTIM, WKUP20 | PD |
| 3 | PA_43 | **PA43**, UART, I2C, GPTIM, WKUP19 | PD |
| 4 | PA_42 | **PA42**, UART, I2C, GPTIM, WKUP18 | PU |
| 5 | PA_41 | **PA41**, UART, I2C, GPTIM, WKUP17 | PU |
| 6 | PA_40 | **PA40**, UART, I2C, GPTIM, SPI2_CS, WKUP16 | PU |
| 7 | PA_39 | **PA39**, UART, I2C, GPTIM, SPI2_CLK, WKUP15 | PU |
| 8 | PA_38 | **PA38**, UART, I2C, GPTIM, SPI2_DI, WKUP14 | PD |
| 9 | PA_37 | **PA37**, UART, I2C, GPTIM, SPI2_DIO, WKUP13 | PD |
| 10 | PA_36 | **PA36**, UART, I2C, GPTIM, USB_DM, WKUP12 | PD |
| 11 | PA_35 | **PA35**, UART, I2C, GPTIM, USB_DP, WKUP11 | PD |
| 12 | PA_31 | **PA31**, UART, I2C, GPTIM, GPADC3 | PD |
| 13 | PA_30 | **PA30**, UART, I2C, GPTIM, I2S1_LRCK, GPADC2 | PD |
| 14 | PA_29 | **PA29**, UART, I2C, GPTIM, SPI1_CS, I2S1_BCK, GPADC1 | PD |
| 15 | PA_28 | **PA28**, UART, I2C, GPTIM, SPI1_CLK, I2S1_SDI, GPADC0 | PD |
| 16 | GND | Земля |  |
| 17 | 3.3V | Вход 3,3 V при отключённом USB Type-C; выход при подключённом |  |
| 18 | PA_27 | **PA27**, UART, I2C, GPTIM, WKUP3 | PU |
| 19 | PA_26 | **PA26**, UART, I2C, GPTIM, WKUP2 | PU |
| 20 | PA_25 | **PA25**, UART, I2C, GPTIM, SPI1_DI, I2S1_SDO, WKUP1 | PD |
| 21 | PA_24 | **PA24**, UART, I2C, GPTIM, SPI1_DIO, I2S1_MCLK, WKUP0 | PD |
| 22 | PA_34 | **PA34**, UART, I2C, GPTIM, GPADC6, WKUP10 | PD |
| 23 | PA_33 | **PA33**, UART, I2C, GPTIM, GPADC5 | PD |
| 24 | PA_32 | **PA32**, UART, I2C, GPTIM, GPADC4 | PD |

</div>

В описании платы указано шесть каналов GPADC, тогда как в этой таблице функций выводов для PA28–PA34 перечислены GPADC0–GPADC6. В SDK SiFli ADC CH7 сопоставлен с VBAT. Эти сведения не подтверждают возможность одновременного использования на плате семи внешних входов, поэтому число каналов на уровне платы остаётся неуточнённым. Перед подключением внешних аналоговых сигналов проверьте точную ревизию платы, мультиплексирование выводов и конфигурацию каналов. См. [руководство SiFli по ADC](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html).

### Разъём LCD, аудио и отладки { #lcd-audio-and-debug-header }

<div align="center"><em>Назначение контактов разъёма LCD, аудио и отладки</em></div>

<div align="center" markdown>

| Группа контактов | Сигналы | Основные функции |
| :--- | :--- | :--- |
| 2-11 | PA00..PA09 | LCD, сенсорная панель, PDM, I2S, UART, I2C |
| 12-15 | MIC_ADC, MIC_BIAS, DACP, DACN | Аналоговый микрофон и аудиовыход |
| 17 | 1.8V | Вход или выход 1,8 V в зависимости от питания USB |
| 18-20 | PA10, PA11, PA20 | PA10: CTP_RST; PA11: CTP_SDA; PA20: CTP_SCL; все три поддерживают UART, I2C и GPTIM |
| 21 | PA21 | UART, I2C, GPTIM |
| 22-23 | PA18 / PA19 | UART0 RX/TX, SWDIO/SWCLK, загрузка/отладка |
| 24 | 5V | Вход или выход 5 V в зависимости от питания USB |

</div>

<div align="center"><em>Таблица: функции контактов J2 и подтяжки после сброса</em></div>

<div align="center" markdown>

| Контакт | Имя контакта | Функция по умолчанию после сброса и функции мультиплексирования | Подтяжка |
| :--- | :--- | :--- | :--- |
| 1 | GND | Земля |  |
| 2 | PA_00 | **PA00**, UART, I2C, GPTIM, LCD_RST | PD |
| 3 | PA_01 | **PA01**, UART, I2C, GPTIM, BL_PWM | PD |
| 4 | PA_02 | **PA02**, UART, I2C, GPTIM, LCD_TE, I2S1_MCLK | PD |
| 5 | PA_03 | **PA03**, UART, I2C, GPTIM, LCD_CS, I2S1_SDO | PU |
| 6 | PA_04 | **PA04**, UART, I2C, GPTIM, LCD_CLK, I2S1_SDI | PD |
| 7 | PA_05 | **PA05**, UART, I2C, GPTIM, LCD_D0, I2S1_BCK | PD |
| 8 | PA_06 | **PA06**, UART, I2C, GPTIM, LCD_D1, I2S1_LRCK | PD |
| 9 | PA_07 | **PA07**, UART, I2C, GPTIM, LCD_D2, PDM1_CLK | PD |
| 10 | PA_08 | **PA08**, UART, I2C, GPTIM, LCD_D3, PDM1_DAT | PD |
| 11 | PA_09 | **PA09**, UART, I2C, GPTIM, CTP_INT | PD |
| 12 | MIC_ADC | Аналоговый вход микрофона |  |
| 13 | MIC_BIAS | Смещение микрофона |  |
| 14 | DACP | Аналоговый аудиовыход |  |
| 15 | DACN | Аналоговый аудиовыход |  |
| 16 | GND | Земля |  |
| 17 | 1.8V | Питание 1,8 V; вход при отключённом USB Type-C, выход при подключённом |  |
| 18 | PA_10 | **PA10**, UART, I2C, GPTIM, CTP_RST | PD |
| 19 | PA_11 | **PA11**, UART, I2C, GPTIM, CTP_SDA | PU |
| 20 | PA_20 | **PA20**, UART, I2C, GPTIM, CTP_SCL | PD |
| 21 | PA_21 | **PA21**, UART, I2C, GPTIM | PD |
| 22 | PA_18 | **UART0_RXD**, порт загрузки/отладки, PA18, SWDIO, I2C, GPTIM | PU |
| 23 | PA_19 | **UART0_TXD**, порт загрузки/отладки, PA19, SWCLK, I2C, GPTIM | Нет |
| 24 | 5V | Питание 5 V; вход при отключённом USB Type-C, выход при подключённом |  |

</div>

## Контакты внешней флеш-памяти и SDIO { #external-flash-and-sdio-pins }

Некоторые варианты оснащены внешней QSPI-NOR Flash объёмом 16 MB. Группа контактов, общая для памяти и SDIO:

В исходном руководстве платы также перечислены варианты корпуса для внешней Flash; фактическая установка зависит от варианта платы и BOM: SPI NOR Flash в корпусе WSON8-8x6mm или WSON8-6x5mm, SPI NAND Flash в WSON8-8x6mm и SD NAND Flash в WSON8-8x6mm.

<div align="center"><em>Группа контактов внешней флеш-памяти и SDIO</em></div>

<div align="center" markdown>

| GPIO MCU | Общая функция Flash/SDIO |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

Перед использованием этих контактов для SDIO или других функций расширения проверьте, не заняты ли они установленной на плате флеш-памятью.

## Подключение аудио { #audio-expansion }

На плату выведены аналоговое смещение и вход микрофона, а также дифференциальный выход DAC. Микрофон и усилитель Class-AB/D для динамика подключаются отдельно; выбирайте их с учётом требуемого аудиотракта.

Плата также поддерживает вход цифрового микрофона PDM: PA07 мультиплексируется с `PDM1_CLK`, а PA08 — с `PDM1_DAT`.

## Целевые конфигурации сборки SDK { #sdk-build-targets }

Для сборки с помощью SiFli-SDK используйте команду `scons --board=<board_name>` с одним из следующих точных имён целевой конфигурации платы:

- `sf32lb52-core_n4`
- `sf32lb52-core_n16r16`

Это идентификаторы конфигураций сборки SDK, а не обязательно маркировка платы или модуля. В индексе [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) и файле [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) SDK могут быть перечислены разные наборы целей. Сверьте целевую конфигурацию с используемой версией SDK.

## Связанные документы { #related-documents }

[SF32LB52x Chip Introduction]: ../chips/SF32LB52x.md
[SF32LB52x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Original SiFli Wiki Article]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.md
[Design Package]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB52-DevKit-Core-3p3-V100_2025-06-10.epro?
[Buy Samples]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[Описание микросхемы SF32LB52x][SF32LB52x Chip Introduction]__
- :fontawesome-solid-file-lines: __[Руководство по проектированию аппаратуры SF32LB52x][SF32LB52x Hardware Design Guide]__
- :fontawesome-brands-github: __[Исходная статья в Wiki SiFli][Original SiFli Wiki Article]__
- :fontawesome-solid-download: __[Комплект проектной документации][Design Package]__
- :fontawesome-solid-cart-shopping: __[Заказать образцы][Buy Samples]__

</div>
