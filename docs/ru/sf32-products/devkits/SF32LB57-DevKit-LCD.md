---
icon: lucide/circuit-board
description: "SF32LB57-DevKit-LCD: модульная отладочная плата для RGB-дисплеев, DVP-камер, двух PDM-микрофонов, динамика, SDIO Wi-Fi и USB."
tags:
    - Аппаратное обеспечение
    - Отладочная плата
    - SF32LB57
---

# SF32LB57-DevKit-LCD { #sf32lb57-devkit-lcd }

## Обзор { #overview }

SF32LB57-DevKit-LCD — мультимедийная отладочная плата на базе **SF32LB57-MOD-WD**. Название, по-видимому, указывает, что SiFli рассматривает модуль как продукт. **WD** может означать **Wi-Fi Dual-band** — двухдиапазонный Wi-Fi, но официального подтверждения этой трактовки нет. Плата объединяет MCU SF32LB57x, SDIO Wi-Fi, загрузочную флеш-память и разъёмы периферии. Она подходит для разработки умных HMI, терминалов с камерой, домофонов и сетевых дисплеев: на ней можно проверить графику, захват изображения, звук и связь до проектирования собственной несущей платы.

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png" alt="SF32LB57-DevKit-LCD — Вид спереди" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Вид спереди</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png" alt="SF32LB57-DevKit-LCD — Вид сзади" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Вид сзади</figcaption></figure>
</div>

## Ресурсы платы { #board-resources }

Источник указывает два производительных ядра STAR-MC1 на 240 MHz, суммарно 1968 CoreMark, и 592 KB SRAM с сохранением данных (512 KB HPSYS + 80 KB LPSYS). Полная многоядерная архитектура описана в [SF32LB57x](../chips/SF32LB57x.md). Модуль содержит загрузочную QSPI-NOR Flash, OPI-PSRAM в зависимости от варианта, кварц MCU 48 MHz и кварц Wi-Fi 40 MHz. Перед выбором конфигурации памяти проверьте маркировку модуля.

Источник указывает вариант SF32LB57x с питанием 3,3 V и краевые металлизированные полукруглые контакты для монтажа модуля на несущей плате. OPI-PSRAM является опцией и зависит от полного кода модуля; она установлена не во всех конфигурациях.

<div align="center"><em>Ресурсы платы</em></div>

<div align="center" markdown>

| Компонент / Разъём | Исполнение |
|:---|:---|
| 1 · SF32LB57-MOD-WD | SF32LB57x; QSPI-NOR; OPI-PSRAM (опция); SDIO Wi-Fi |
| 2 · USB Type-C | CH343P · USB-to-UART |
| 3 · USB Type-C | USB 2.0 FS · PA35 / PA36 |
| 4 · FPC1 | 40P · 0,5 mm · DPI / RGB888 |
| 5 · FPC4 | 24P · 0,5 mm · DCMI / DVP |
| 6 · J6 | MicroSD / TF · 1-bit SDIO |
| 7 · J3 | 40P · 2 × 20 · 2,54 mm · S-2100S40P-S110 |
| 8 · J7 | MX1.25-2P · 8 Ω |
| 9 · S4 | KEY_RSTN |
| 10 · S1–S3 | PA_34 · GPADC_CH6 |
| 11 · LED1–LED3 | AW9523B · P1_1 / P1_2 / P1_3 |
| 12 · U1 | WS2812B · V1.0: PA_11 · V1.1: PA_08 |
| 13 · ANT | IPEX-1 |
| 14 · U11 | AW9523BTOR · 16 IO · I2C |
| 15 · U8 | NS4150B · Class-D |
| 16 · MIC1 / MIC2 | 2 × PDM · MSM261DGT007 / LMD4020T261-AC23 |

</div>

SiFli обозначает Wi-Fi-компонент как AIC8800D40LS-N и местами называет его Wi-Fi/Bluetooth-комбо. Не путайте его с Bluetooth самого MCU SF32. Проверьте установленный радиочип, коммутацию RF и драйверы SDK, не предполагая наличие второго доступного Bluetooth-тракта. На плате есть антенный разъём IPEX-1 и управление питанием, пробуждением и переключением антенны Wi-Fi.

![Структурная схема](assets/sf32lb57x/57DEVKIT_LCD_Block_Diagram-en.svg){ width="100%" loading="lazy" }
<div align="center"><em>Структурная схема</em></div>

Исходная блок-схема показывает функции, а не эталонные соединения. На ней показаны линии TF D0–D3 и WS2812B в составе расширителя IO, тогда как текст указывает 1-битный SDIO TF и прямое управление WS2812B через PA_11/PA_08 MCU в зависимости от ревизии. Проверьте соединения по соответствующей схеме и конфигурации выводов SDK.

<div style="display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; width: 100%; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg" alt="SF32LB57-DevKit-LCD — Компоненты лицевой стороны" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Компоненты лицевой стороны</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg" alt="SF32LB57-DevKit-LCD — Компоненты обратной стороны" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Компоненты обратной стороны</figcaption></figure>
</div>

## Первичная настройка и запуск { #getting-started }

Для проверки дисплея нужны плата, совместимая DPI-RGB-панель с 40 контактами / шагом 0,5 mm, USB-кабель передачи данных и компьютер Windows, Linux или macOS. Дополнительно можно использовать антенну IPEX-1, DVP-камеру, MicroSD/TF-карту, динамик 8 Ω и J-Link либо DAP-Link. Для одновременного вывода журнала через UART и проверки штатного USB нужны два кабеля передачи данных.

1. При отключённом питании проверьте контакт 1 FPC, ориентацию контактов и напряжение панели, затем подключите FPC1. До радиотестов установите антенну.
2. Подключите Type-C USB-to-UART, а не штатный USB, и выберите его COM-порт в SifliTrace или Impeller.
3. Для режима загрузки прошивки установите перемычку BOOT MODE J1 до включения питания или сброса. Для обычного запуска и вывода логов через последовательный порт снимите J1 и выполните сброс.
4. Сначала проверьте hello-world через последовательный порт, затем одноцветный экран и сенсорный ввод, если он предусмотрен. Камеру, звук, память и радио добавляйте по отдельности, после чего проверяйте совместную работу.

Плата с заводской прошивкой может при включении показать интерфейс по умолчанию; это зависит от прошивки и панели. Чёрный экран сам по себе не доказывает, что при прошивке возникла ошибка. Настройка инструментов и среды, а также порядок прошивки описаны в [начале работы с SiFli-SDK](../../getting-started/sifli/getting-started-sifli-sdk.md).

## Настройка SDK { #sdk-build-targets }

В руководстве SiFli указано, что нужно установить SiFli SDK и выбрать пакет поддержки платы `SF32LB57-DevKit-LCD`. В текущем upstream-файле `build_config_gcc.yaml`, на который дана ссылка, нет цели сборки SF32LB57. Перед компиляцией проверьте пакет поддержки и точный идентификатор сборки в используемой версии SDK; не подставляйте цель другой платы. Успешный UART hello-world подтверждает только базовый запуск последовательного интерфейса, но не работу драйверов дисплея, камеры или Wi-Fi.

## Питание и отладка { #power-and-debug }

Любой Type-C-разъём может подать на плату 5 V. U4 (ETA3425D2G) формирует `VDD_3V3`, U7 (ETA3425D2G) — `WF_3V3`, отдельно включаемую через `IOEX_WF_PWREN`. USB-to-UART-мост — CH343P; второй разъём выводит USB 2.0 FS через `PA35`/`PA36`. Для SWD используйте `PA_43` (SWCLK), `PA_44` (SWDIO), опорное напряжение целевой платы 3,3 V и общий GND. Не подключайте выход отладчика 5 V к выводу 3,3 V.

Схема SWD указывает для контактов J3 17, 18, 19 и 20 сигналы 3,3 V, SWCLK, SWDIO и GND соответственно. Это номера контактов платы, а не переходника отладчика; соединяйте стороны по именам сигналов.

![Подключение SWD](assets/sf32lb57x/57DEVKIT-LCD-JLINK-Notes.svg){ width="100%" loading="lazy" }
<div align="center"><em>Подключение SWD</em></div>

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png" alt="SF32LB57-DevKit-LCD — Переходник J-Link" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Переходник J-Link</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png" alt="SF32LB57-DevKit-LCD — Переходник SWD" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Переходник SWD</figcaption></figure>
</div>

## Дисплей и камера { #display-and-camera }

FPC1 — 40-контактный разъём `FPC-05FB-40PH20` с шагом 0,5 mm и RGB-распиновкой ALIENTEK. По умолчанию используется RGB888; RGB565/RGB666 могут освободить линии данных, если это поддерживают панель и прошивка. FreeIO позволяет через переходник проверить также QSPI, MCU8080, EPD и JDI. Нужны подходящие переходник, питание и прошивка; это не штатные DSI-подключения.

По источнику полный 24-битный RGB888 требует модуля на базе QFN80 или BGA112; ePicasso 3.0 описан как графический ускоритель 2D/2.5D. Контакт 1 FPC1 несёт 5 V для подсветки или повышающего преобразователя драйвера дисплея; это не GPIO 3,3 V. Контакты 3 и 5 J3 используют общую шину настройки камеры/сенсорного контроллера I2C на PA_23/PA_22.

!!! warning
    В источнике указан максимальный размер обрабатываемого изображения ePicasso 3.0 — 2048 × 2048 — и заявлено полноэкранное обновление с частотой 60 fps, но затем указывает, что разрешение и частота обновления зависят от панели. Это не гарантия вывода изображения 2048 × 2048 при 60 fps: проверьте тайминги LCDC, интерфейс, кадровые буферы, пропускную способность памяти и реальную нагрузку. Контакты FPC1 37–40 не определены однозначно: для четырёх контактов предложено пять управляющих сигналов. До подключения сверьтесь с `57x LCD-DevKit ioconfig-08192026.xlsx` и соответствующей схемой.

![Подключение RGB-панели](assets/sf32lb57x/57DEVKIT-LCD-RGB-Panel-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>Подключение RGB-панели</em></div>

FPC4 — разъём DCMI DVP на 24 контакта с шагом 0,5 mm. Перечислены GC032A, OV2640, OV5640 и OV3660; штатная база — OV2640/OV5640. Другим модулям может потребоваться изменение питания по примечаниям схемы. Камерные линии питания включают `DVDD_1V5`, `DVDD_2V8`, `AVDD_2V8`: ориентируйтесь на требования сенсора, а не только на разъём. Перемычки выбирают линии DVP, разделяемые с Wi-Fi SDIO или SDIO TF-карты. Штатная конфигурация не поддерживает одновременное использование конфликтующих функций.

Три линии питания камеры используют независимые LDO. На изображении лицевой стороны с обозначениями разъём помечен как 22P, но текст и таблица FPC4 указывают 24 контакта. Используйте таблицу на 24 контакта как подтверждённый источником ориентир; до подключения проверьте реальный разъём и схему. Назначение сброса на контакте 6 FPC4 (IOEX_DVP_PDN/RESET) также неоднозначно; проверьте соединения, не предполагая независимое управление сбросом и отключением камеры.

![Подключение камеры](assets/sf32lb57x/57DEVKIT-LCD-CAM-MOD-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>Подключение камеры</em></div>

## Общие выводы и ревизии { #shared-pins-and-revisions }

- `PA35`/`PA36` выведены на FPC1 и штатный USB FS: не используйте одновременно конфликтующие подключения панели и USB-устройство.
- SWD на `PA_43`/`PA_44` разделяет выводы с дисплеем/камерой. Сохраните путь восстановления через отладку.
- WS2812B использует `PA_11` в V1.0 и `PA_08` в V1.1. Источник также назначает `PA_11` сигналу `BL_PWM`; разрешите конфликт до управления светодиодом или подсветкой.
- J3 совпадает с позициями питания/GND 40-контактного Raspberry Pi, но не гарантирует его программную среду или совместимость со всеми HAT. До подключения расширений проверьте напряжение, pinmux и общие сигналы.

## Звук, кнопки и расширение IO { #audio-controls-and-io-expansion }

Источник описывает воспроизведение через 24-битный DAC и моноусилитель Class-D U8 (NS4150B) к J7 (`MX1.25-2P`); штатный динамик — 8 Ω. Два PDM-микрофона — MSM261DGT007 либо совместимые по выводам LMD4020T261-AC23. `PA_56` — тактовая линия PDM, `PA_55` — данные; `IOEX_PDM_PWREN` управляет их питанием, `IOEX_AU_PA_EN` включает усилитель. До применения в продукте проверьте реальный аудиоформат, усиление и ограничения динамика.

S1–S3 используют общий `PA_34` / `GPADC_CH6`; номинальные напряжения кнопок в источнике — 2,97 V, 2,58 V и 2,19 V. S4 — активный низким уровнем `KEY_RSTN`. U11 (AW9523BTOR) предоставляет 16 IO по I2C через `PA_22` (SCL) и `PA_23` (SDA). Таблица сохраняет начальные состояния источника; проверьте сброс и инициализацию прошивки на своей плате. P0_2/P0_3 в исходной таблице не указаны.

<div align="center"><em>Начальные состояния расширителя IO</em></div>

<div align="center" markdown>

| Порт | Сигнал / Обозначение | Начальное состояние | Направление | Функция |
|:---|:---|:---|:---|:---|
| P1_0 | IOEX_2.4G_RFSW | 3,3 V | Выход | Переключение антенны 2,4 GHz |
| P1_1 | IOEX_LED_R | 3,3 V | Выход | Красный LED |
| P1_2 | IOEX_LED_G | 3,3 V | Выход | Зелёный LED |
| P1_3 | IOEX_LED_B | 3,3 V | Выход | Синий LED |
| P1_4 | IOEX_WF_PWRKEY | 0 V | Выход | Кнопка питания модуля Wi-Fi |
| P1_5 | IOEX_WF_PWREN | 0 V | Выход | Разрешение преобразователя Wi-Fi 3,3 V |
| P1_6 | IOEX_CTP_RST | 0 V | Выход | Сброс сенсорного контроллера |
| P1_7 | IOEX_LCD_RESET | 0 V | Выход | Сброс LCD |
| P0_0 | IOEX_USB_DET | Hi-Z | Вход | Обнаружение подключения USB |
| P0_1 | IOEX_TF_DET | Hi-Z | Вход | Обнаружение установки TF-карты |
| P0_4 | IOEX_PDM_PWREN | 0 V | Выход | Включение питания PDM-микрофонов |
| P0_5 | IOEX_AU_PA_EN | 0 V | Выход | Включение аудиоусилителя |
| P0_6 | IOEX_DVP_PDN | 0 V | Выход | Отключение камеры |
| P0_7 | IOEX_HST_WAK_WF | 0 V | Выход | Пробуждение Wi-Fi хостом |

</div>

## Справочник разъёмов { #connector-reference }

!!! warning
    Таблицы передают назначения из источника и не заменяют схему. Сводка модуля неполна (`58~?`) и указывает `PA_00`/`PA_01` как USB_DP/USB_DM, что противоречит явно указанному штатному USB на `PA35`/`PA36`. В некоторых строках источника объединены диапазоны площадок модуля, диапазоны GPIO и альтернативные функции без назначения функции каждой отдельной площадке. Здесь сохранена эта группировка, индивидуальные назначения не выводятся. Различайте номер площадки модуля и GPIO MCU. Не используйте неуточнённые строки для проектирования PCB.

<div align="center"><em>Площадки модуля: неуточнённые строки источника сохранены</em></div>

<div align="center" markdown>

| Контакт | Сигнал / Обозначение | Функция |
|:---|:---|:---|
| 1 | GND | GND |
| 2 | VDD_3V3 · 3,3 V | Вход питания 3,3 V |
| 3 | VDD_1V8 · 1,8 V LDO | Выход 1,8 V внутреннего LDO |
| 4 | RSTN | Сброс; подключён к кнопке сброса |
| 5~22 | PA_41 ~ PA_24 | Мультиплексирование GPIO / LCDC / SPI / SD / отладки |
| 23~36 | PA_23 ~ PA_10 | Мультиплексирование GPIO / I2C / SD / USB / аудио / отладки |
| 37 | DAC1P | Дифференциальный выход DAC P |
| 38 | DAC1N | Дифференциальный выход DAC N |
| 39 | MICBIAS_PA56 / PDM_CLK | Смещение микрофона / тактовая линия PDM |
| 40 | ADC1P_PA55 / PDM_DAT | Вход P аудио-ADC / данные PDM |
| 41 | GND | GND |
| 42 | PA_00 / USB_DP | GPIO / USB_DP (противоречие в источнике; см. предупреждение) |
| 43 | PA_01 / USB_DM | GPIO / USB_DM (противоречие в источнике; см. предупреждение) |
| 44~53 | PA_07 ~ PA_09, PA_06 | GPIO / SD / сенсорный ввод / обнаружение USB |
| 54 | GND | GND |
| 55 | PA_42 | GPIO |
| 56 | PA_43 / SWCLK | SWCLK / GPIO |
| 57 | PA_44 / SWDIO | SWDIO / GPIO |
| 58~? | PA_45 ~ PA_57 · QFN80 / BGA112 | Старшие линии DPI-RGB / PDM / пробуждение Wi-Fi; доступность зависит от корпуса модуля |

</div>

<div align="center"><em>J3: 40-контактный разъём расширения</em></div>

<div align="center" markdown>

| Контакт | Сигнал / Обозначение | Подключение / Функция |
|:---|:---|:---|
| 1 | 3V3 | 3,3 V |
| 2 | 5V | 5 V |
| 3 | IO2 / I2C_SDA | PA_23 · I2C_SDA · DVP / CTP |
| 4 | 5V | 5 V |
| 5 | IO3 / I2C_SCL | PA_22 · I2C_SCL · DVP / CTP |
| 6 | GND | GND |
| 7 | IO4 | PA_27 · DPI_R3 |
| 8 | IO14 | PA_26 · DPI_R2 / DVP_PCLK |
| 9 | GND | GND |
| 10 | IO15 | PA_28 · DPI_R4 / GPADC_CH0 |
| 11 | IO17 | PA_29 · DPI_R5 / GPADC_CH1 |
| 12 | IO18 | PA_30 · DPI_R6 / GPADC_CH2 |
| 13 | IO27 | PA_31 · DPI_R7 |
| 14 | GND | GND |
| 15 | IO22 | PA_32 · DPI_G0 / DVP_D4 |
| 16 | IO23 | PA_33 · DPI_G1 / DVP_D0 / WKUP |
| 17 | 3V3 | 3,3 V |
| 18 | IO24 / SWCLK | PA_43 · DPI_B0 / SWCLK / DVP_D3 |
| 19 | IO10 / SWDIO | PA_44 · DPI_B1 / SWDIO / DVP_D1 |
| 20 | GND | GND |
| 21 | IO9 | PA_38 · DPI_G3 / SPI2_DI |
| 22 | IO25 | PA_37 · DPI_G2 / SPI2_DIO |
| 23 | IO11 | PA_40 · DPI_G5 / SPI2_CS |
| 24 | IO8 | PA_39 · DPI_G4 / SPI2_CLK |
| 25 | GND | GND |
| 26 | IO7 | PA_41 · DPI_G6 |
| 27 | IO0 | PA_45 · DPI_B2 / DVP_D2 |
| 28 | IO1 | PA_42 · DPI_G7 |
| 29 | IO5 | PA_46 · DPI_B6 |
| 30 | GND | GND |
| 31 | IO6 | PA_48 · DPI_CLK / SD2_CMD |
| 32 | IO12 | PA_47 · DPI_B7 / SD2_CLK |
| 33 | IO13 | PA_49 · DPI_HSYNC / SD2_DIO0 |
| 34 | GND | GND |
| 35 | IO19 | PA_50 · DPI_DE / SD2_DIO1 |
| 36 | IO16 | PA_51 · DPI_VSYNC |
| 37 | IO26 | PA_52 · DPI_B3 |
| 38 | IO20 | PA_53 · DPI_B4 |
| 39 | GND | GND |
| 40 | IO21 | PA_54 · DPI_B5 |

</div>

<div align="center"><em>FPC1: разъём RGB-дисплея</em></div>

<div align="center" markdown>

| Контакт | Сигнал / Обозначение |
|:---|:---|
| 1 | 5V |
| 2 | GND |
| 3 | PA_24 · DPI_R0 |
| 4 | PA_25 · DPI_R1 |
| 5 | PA_26 · DPI_R2 |
| 6 | PA_27 · DPI_R3 |
| 7 | PA_28 · DPI_R4 |
| 8 | PA_29 · DPI_R5 |
| 9 | PA_30 · DPI_R6 |
| 10 | PA_31 · DPI_R7 |
| 11 | GND |
| 12 | GND |
| 13 | PA_32 · DPI_G0 |
| 14 | PA_33 · DPI_G1 |
| 15 | PA_34 · PWRKEY / GPADC_CH6 |
| 16 | PA_35 · USB_DP |
| 17 | PA_36 · USB_DM |
| 18 | PA_37 · DPI_G2 |
| 19 | PA_38 · DPI_G3 |
| 20 | GND |
| 21 | PA_39 · DPI_G4 |
| 22 | PA_40 · DPI_G5 |
| 23 | PA_41 · DPI_G6 |
| 24 | PA_42 · DPI_G7 |
| 25 | PA_43 · DPI_B0 |
| 26 | PA_44 · DPI_B1 |
| 27 | PA_45 · DPI_B2 |
| 28 | PA_52 · DPI_B3 |
| 29 | PA_53 · DPI_B4 |
| 30 | PA_54 · DPI_B5 |
| 31 | PA_46 · DPI_B6 |
| 32 | PA_47 · DPI_B7 |
| 33 | PA_48 · DPI_CLK |
| 34 | PA_49 · DPI_HSYNC |
| 35 | PA_50 · DPI_DE |
| 36 | PA_51 · DPI_VSYNC |
| 37~40 | Управляющие сигналы: уточните назначение: PA_11 / BL_PWM, IOEX_CTP_RST, I2C_SDA / PA_23, I2C_SCL / PA_22, IOEX_LCD_RST |

</div>

<div align="center"><em>FPC4: разъём DVP-камеры</em></div>

<div align="center" markdown>

| Контакт | Сигнал / Обозначение |
|:---|:---|
| 1 | NC |
| 2 | GND |
| 3 | I2C_SDA |
| 4 | VDD_2V8 · 2,8 V |
| 5 | I2C_SCL |
| 6 | RESET · IOEX_DVP_PDN/RESET |
| 7 | VSYNC |
| 8 | PWDN · IOEX_DVP_PDN |
| 9 | HSYNC |
| 10 | NC |
| 11 | D0 |
| 12 | D1 |
| 13 | D2 |
| 14 | D3 |
| 15 | D4 |
| 16 | D5 |
| 17 | D6 |
| 18 | D7 |
| 19 | MCLK |
| 20 | PCLK |
| 21 | GND |
| 22 | AVDD_2V8 · 2,8 V |
| 23 | NC |
| 24 | GND |

</div>

## Источники и дальнейшая разработка { #related-documents }

Для собственной платы используйте [руководство по SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) и [проектирование для производства](../../hardware/design-for-production.md). Разработка подсистем описана в разделах [Графика](../../learn/graphics/overview.md), [Аудио](../../learn/audio/overview.md), [Bluetooth](../../learn/bluetooth/overview.md).

- [Документация SiFli по SF32LB57x](https://wiki.sifli.com/silicon/product-index.html#sf32lb57x)
- [Загрузка руководств пользователя SiFli](https://downloads.sifli.com/user%20manual/)
- [Исходное руководство по аппаратной разработке SF32LB57x](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)

В источнике платы руководство пользователя SF32LB57x отмечено как ожидающее публикации; актуальную доступность проверьте в каталоге загрузок.

- [Оригинальное китайское руководство платы](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)
- [Исходный Markdown](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb57x/SF32LB57-DevKit-LCD.md)
- [Конфигурация сборки SDK](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)
- [Инструменты дисплея](https://wiki.sifli.com/tools/%E5%B1%8F%E5%B9%95%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95.html)
- [Запись через Impeller](https://wiki.sifli.com/tools/%E7%83%A7%E5%BD%95%E5%B7%A5%E5%85%B7.html)
- [Магазин SiFli](https://sifli.taobao.com/)

Источник SiFli направляет за образцами и малыми партиями в магазин, по объёмным заказам — на sales@sifli.com. Также упомянуты заявки на образцы для открытых проектов и QQ-группа 674699679; условия и актуальное наличие уточняйте у SiFli. По проектам можно [связаться с μForge.io](../../about/contact.md).
