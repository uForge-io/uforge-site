---
icon: lucide/book-check
hide:
    - navigation
description: "Руководство по аппаратной разработке модуля Bluetooth MCU SF32LB58-MOD: питание, интерфейсы и интеграция в PCB."
tags:
    - Аппаратное обеспечение
    - Модуль
---

# Руководство по аппаратной разработке SF32LB58-MOD { #sf32lb58-mod-hardware-design-guide }

## 1. Обзор { #1-overview }

**SF32LB58-MOD** — универсальный Bluetooth MCU-модуль с низким энергопотреблением на базе чипа SiFli SF32LB586VDD36. В чипе установлен трёхъядерный процессор Arm Cortex-M33 STAR-MC1 с частотой до 240 MHz. Модуль оснащён кварцевым резонатором 48 MHz; резонатор 32,768 kHz устанавливается опционально. В зависимости от кода заказа модуль также комплектуется HPI-PSRAM, Flash QSPI-NOR/NAND или памятью eMMC. Это модуль для поверхностного монтажа на 138 выводов, размером 24 × 24 × 3,1 mm.

Руководство описывает аппаратную интеграцию на уровне модуля: назначение выводов, интерфейсы периферии, электрические характеристики, требования к питанию, эталонные схемы, контрольный список проверки схемы, механические размеры и посадочное место PCB, а также требования к обращению с изделием. В качестве источника использован даташит SiFli **DS5802-SF32LB58-MOD V0.1**.

Подробное описание архитектуры чипа (ядер, графики, подсистемы памяти и периферии) см. в документах [SF32LB58x](../../sf32-products/chips/SF32LB58x.md) и [Руководство по аппаратной разработке SF32LB58x](../chip-guides/SF32LB58x_hardware_design_guide.md).

!!! note "Источник данных и оформление рисунков"
    Технические данные модуля приведены по даташиту **DS5802-SF32LB58-MOD V0.1**. Некоторые схемы выводов, электрические схемы и механические чертежи в даташите представлены растровыми изображениями; здесь на них даны ссылки, а не перерисованные варианты. Нумерация рисунков и таблиц соответствует этому руководству; в подписях к невоспроизведённым схемам указаны номера рисунков из официального даташита.

## 2. Краткая сводка по проектированию { #2-quick-design-summary }

### 2.1 Варианты модуля { #21-module-variants }

<div align="center"><em>Таблица 2.1-1. Варианты модуля</em></div>

<div align="center" markdown>

| Код модуля | Flash | PSRAM | Стандартная флеш-память | Температура | Размеры (mm) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16+16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 24 × 24 × 3,1 |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16+16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 24 × 24 × 3,1 |
| SF32LB58-MOD-E4R32N1 | 4 GB eMMC | 16+16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 24 × 24 × 3,1 |

</div>

### 2.2 Основные характеристики { #22-key-specifications }

<div align="center"><em>Таблица 2.2-1. Основные характеристики</em></div>

<div align="center" markdown>

| Параметр | Спецификация |
| :--- | :--- |
| Прикладные ядра (HCPU/ACPU) | 2× Arm Cortex-M33 STAR-MC1, до 240 MHz |
| Энергоэффективное ядро (LCPU) | Arm Cortex-M33 STAR-MC1, до 96 MHz |
| SRAM | 2176 KB (HCPU) + 512 KB (ACPU) + 1056 KB retention SRAM (LCPU) |
| Беспроводная связь | Двухрежимный Bluetooth 5.3 с обратной совместимостью с 4.2/4.1/4.0; поддерживаются BLE и Bluetooth Classic |
| Графика | ePicasso 2.0 + Vivante GCNanoUltraV, разрешение до 1024×1024, eZip 2.0, аппаратный JPEG-кодек |
| Аудио | 2× 24-разрядный аудио-ЦАП (DAC) и 2× 24-разрядный аудио-АЦП Sigma-Delta (ADC) |
| Память | 5× MPI (в корпусе и внешние), 2× SD/SDIO/eMMC |
| Корпус | 138 выводов, 24 × 24 × 3,1 mm |
| Питание | VDD_3V3 (2,97–3,6 V), VDD_1V8 (1,7–1,95 V), VDDIOA/VDDIOA2/VDDIOB (1,7–3,6 V) |
| Антенна | Внешняя антенна подключается через RF-вывод типа stamp-hole или совместимый с IPEX разъём, в зависимости от модели |
| Рабочая температура | от -40 до 85 °C |

</div>

## 3. Функциональная блок-схема { #3-functional-block-diagram }

В модуле установлены чип SF32LB586VDD36, кварцевый резонатор 48 MHz, дополнительный резонатор 32,768 kHz (опционально) и, в зависимости от SKU, HPI-PSRAM, Flash QSPI-NOR/NAND или eMMC в корпусе; также предусмотрены RF-цепь согласования и подключение антенны.

!!! info "Рисунок 3-1. Функциональная блок-схема"
    См. рисунок 2-1 в официальном даташите; в этом руководстве он не воспроизведён.

## 4. Назначение выводов { #4-pin-definition }

### 4.1 Схема расположения выводов { #41-pinout-diagram }

По периметру модуля расположено 138 выводов.

!!! info "Рисунок 4-1. Схема расположения выводов, вид сверху"
    См. рисунок 3-1 в официальном даташите; в этом руководстве он не воспроизведён.

### 4.2 Таблица назначений выводов { #42-pin-definition-table }

В таблице ниже приведены все 138 выводов модуля.

<div align="center"><em>Таблица 4.2-1. Назначение выводов</em></div>

<div align="center" markdown>

| Имя | № | Тип | MUX по умолчанию | I/O по умолчанию | Функция |
| :--- | :-: | :-: | :--- | :-: | :--- |
| VDDIOB | 1 | P | 1,8/3,3 V | P | Питание интерфейса ввода-вывода PB |
| PB36 | 2 | I/O/T | USART4_RXD | I | GPIO_B36, USART4_RXD, GPTIM3_CH1, #GPADC_CH4 |
| PB37 | 3 | I/O/T | USART4_TXD | O | GPIO_B37, USART4_TXD, GPTIM3_CH2, #GPADC_CH5 |
| PB54 | 4 | I/O/T | GPIO_B54 | I | GPIO_B54, #WKUP_PIN0 |
| PA75 | 5 | I/O/T | GPIO_A75 | I/O | GPIO_A75, SD2_DIO1, SPI2_DI |
| PA76 | 6 | I/O/T | GPIO_A76 | I/O | GPIO_A76, SD2_DIO0, SPI2_DO |
| PA77 | 7 | I/O/T | GPIO_A77 | I/O | GPIO_A77, SD2_CLK, SPI2_CLK |
| PA70 | 8 | I/O/T | GPIO_A70 | I/O | GPIO_A70, SD2_CMD, SPI2_CS |
| PA81 | 9 | I/O/T | GPIO_A81 | I/O | GPIO_A81, SD2_DIO3 |
| PA79 | 10 | I/O/T | GPIO_A79 | I/O | GPIO_A79, SD2_DIO2 |
| BOOT_MODE | 11 | I | BOOT_MODE | I | 1: режим загрузки; 0: пользовательский режим |
| RSTN | 12 | I | RSTN | I | 1: пользовательский режим; 0: режим сброса |
| VDD_1V8 | 13 | P | 1,8 V | P | Входное питание основного MCU и памяти в корпусе |
| GND | 14 | P | Земля | P | Земля |
| VDDIOA | 15 | P | 1,8/3,3 V | P | Питание интерфейса ввода-вывода PA, кроме PA00–PA11 |
| VDD_3V3 | 16 | P | 3,3 V | P | Аналоговое питание MCU |
| PA13 | 17 | I/O/T | GPIO_A13 | O | GPIO_A13, GPTIM1_CH2, ATIM1_BKIN, LCDC1_DPI_DE |
| PA15 | 18 | I/O/T | GPIO_A15 | O | GPIO_A15, GPTIM1_CH3, ATIM1_BKIN2, LCDC1_DPI_VSYNC |
| PA14 | 19 | I/O/T | GPIO_A14 | O | GPIO_A14, I2S1_LRCK, LCDC1_DPI_HSYNC |
| PA12 | 20 | I/O/T | GPIO_A12 | O | GPIO_A12, GPTIM1_CH1, ATIM1_CH4, LCDC1_DPI_CLK |
| PA67 | 21 | I/O/T | GPIO_A67 | O | GPIO_A67, #WKUP_PIN9, GPTIM2_CH3, ATIM1_CH1N, LCDC1_DPI_B7, LCDC1_JDI_B2 |
| PA65 | 22 | I/O/T | GPIO_A65 | O | GPIO_A65, #WKUP_PIN7, GPTIM2_CH2, ATIM1_CH1, LCDC1_DPI_B6, LCDC1_JDI_B1 |
| PA63 | 23 | I/O/T | GPIO_A63 | O | GPIO_A63, I2C2_SDA, USART1_CTS, #GPCOMP_N, LCDC1_DPI_B5 |
| PA62 | 24 | I/O/T | GPIO_A62 | O | GPIO_A62, I2C2_SCL, USART1_RTS, #GPCOMP_P, LCDC1_DPI_B4 |
| PA61 | 25 | I/O/T | GPIO_A61 | I | GPIO_A61, SPI1_CS, USART2_TXD, LCDC1_DPI_B3 |
| PA58 | 26 | I/O/T | GPIO_A58 | I | GPIO_A58, LPTIM1_ETR, GPTIM2_CH1, ATIM2_ETR, LCDC1_8080_DIO7, LCDC1_DPI_B2 |
| PA57 | 27 | I/O/T | GPIO_A57 | I | GPIO_A57, SPI1_DI, USART2_RXD, LCDC1_DPI_B1 |
| PA56 | 28 | I/O/T | GPIO_A56 | I | GPIO_A56, SPI1_CLK, USART2_CTS, LCDC1_DPI_B0 |
| PA55 | 29 | I/O/T | GPIO_A55 | O | GPIO_A55, GPTIM1_CH4, ATIM2_BKIN2, LCDC1_DPI_G7 |
| PA54 | 30 | I/O/T | GPIO_A54 | O | GPIO_A54, SPI1_DO, SPI1_DIO, USART2_RTS, LCDC1_DPI_G6 |
| PA53 | 31 | I/O/T | GPIO_A53 | I/O | GPIO_A53, LCDC1_DPI_G5 |
| PA50 | 32 | I/O/T | GPIO_A50 | O | GPIO_A50, MPI3_DIO0, LCDC1_8080_RD, LCDC1_SPI_DIO0, LCDC1_DPI_G4, LCDC1_JDI_G2 |
| PA48 | 33 | I/O/T | GPIO_A48 | O | GPIO_A48, MPI3_DIO1, LCDC1_8080_DC, LCDC1_SPI_DIO1, LCDC1_DPI_G3, LCDC1_JDI_G1 |
| PA47 | 34 | I/O/T | GPIO_A47 | O | GPIO_A47, MPI3_DIO2, LCDC1_8080_DIO0, LCDC1_SPI_DIO2, LCDC1_DPI_G2, LCDC1_JDI_R2 |
| PA46 | 35 | I/O/T | GPIO_A46 | O | GPIO_A46, MPI3_CLK, LCDC1_8080_WR, LCDC1_SPI_CLK, LCDC1_DPI_G1, LCDC1_JDI_R1 |
| PA45 | 36 | I/O/T | GPIO_A45 | O | GPIO_A45, MPI3_DIO3, LCDC1_8080_DIO1, LCDC1_SPI_DIO3, LCDC1_DPI_G0, LCDC1_JDI_ENB |
| PA44 | 37 | I/O/T | GPIO_A44 | O | GPIO_A44, MPI3_CS, LCDC1_8080_CS, LCDC1_SPI_CS, LCDC1_DPI_R7, LCDC1_JDI_HST |
| PA43 | 38 | I/O/T | GPIO_A43 | I/O | GPIO_A43, LCDC1_8080_TE, LCDC1_SPI_TE, LCDC1_DPI_R6, LCDC1_JDI_HCK |
| PA27 | 39 | I/O/T | GPIO_A27 | I/O | GPIO_A27, SCI_DIO, GPTIM2_CH3, ATIM2_CH2N, LCDC1_8080_DIO3, LCDC1_DPI_R5, LCDC1_JDI_XRST |
| PA26 | 40 | I/O/T | GPIO_A26 | O | GPIO_A26, SCI_CLK, GPTIM2_CH2, ATIM2_CH2, LCDC1_8080_DIO2, LCDC1_DPI_R4 |
| PA25 | 41 | I/O/T | GPIO_A25 | O | GPIO_A25, PDM2_CLK, SD1_CLKIN, GPTIM2_CH1, ATIM2_CH1N, LCDC1_DPI_R3, LCDC1_JDI_XRST |
| PA24 | 42 | I/O/T | GPIO_A24 | O | GPIO_A24, LCDC1_8080_RSTB, LCDC1_SPI_RSTB, LCDC1_DPI_R2 |
| PA23 | 43 | I/O/T | GPIO_A23 | O | GPIO_A23, PDM1_CLK, I2S1_BCK, USART2_CTS, I2C2_SDA, LCDC1_DPI_R1 |
| PA22 | 44 | I/O/T | GPIO_A22 | O | GPIO_A22, PDM2_DATA, GPTIM1_ETR, ATIM2_CH1, LCDC1_DPI_R0, LCDC1_JDI_VST |
| VDDIOA2 | 45 | P | 1,8/3,3 V | P | Питание ввода-вывода PA00–PA11 |
| GND | 46 | P | Земля | P | Земля |
| DSI_D0N | 47 | O | DSI_D0N | O | Линия данных 0 MIPI DSI, отрицательный вывод |
| DSI_D0P | 48 | O | DSI_D0P | P | Линия данных 0 MIPI DSI, положительный вывод |
| DSI_CLKN | 49 | O | DSI_CLKN | P | Тактовая линия MIPI DSI, отрицательный вывод |
| DSI_CLKP | 50 | O | DSI_CLKP | P | Тактовая линия MIPI DSI, положительный вывод |
| DSI_D1N | 51 | O | DSI_D1N | P | Линия данных 1 MIPI DSI, отрицательный вывод |
| DSI_D1P | 52 | O | DSI_D1P | P | Линия данных 1 MIPI DSI, положительный вывод |
| PA32 | 53 | I/O/T | USART1_RXD | I | GPIO_A32, USART1_RXD, I2C3_SDA |
| PA31 | 54 | I/O/T | USART1_TXD | O | GPIO_A31, USART1_TXD, I2C3_SCL |
| USB2_DN | 55 | I/O | USB2_DN | I/O | Дифференциальный сигнал USB, отрицательный вывод |
| USB2_DP | 56 | I/O | USB2_DP | I/O | Дифференциальный сигнал USB, положительный вывод |
| PA17 | 57 | I/O/T | GPIO_A17 | I/O | GPIO_A17, I2C1_SCL, USART2_RXD |
| PA16 | 58 | I/O/T | GPIO_A16 | I/O | GPIO_A16, I2C1_SDA, USART2_TXD |
| PA00 | 59 | I/O/T | GPIO_A00 | I/O | GPIO_A00, SD1_DIO7, CAN1_TXD, I2C1_SCL, ATIM1_CH1, USART3_RXD |
| PA03 | 60 | I/O/T | GPIO_A03 | I/O | GPIO_A03, SD1_DIO5, CAN1_RXD, I2C1_SDA, ATIM1_CH2, USART3_TXD |
| PB17 | 61 | I/O/T | GPIO_B17 | I/O | GPIO_B17, USART5_RXD, SPI3_CLK |
| PB18 | 62 | I/O/T | GPIO_B18 | I/O | GPIO_B18, USART5_TXD, SPI3_DI |
| PB11 | 63 | I/O/T | SWDIO | I/O | SWDIO, GPIO_B11, USART4_TXD, GPTIM5_CH4 |
| PB07 | 64 | I/O/T | SWCLK | O | SWCLK, GPIO_B07, USART4_RXD, GPTIM4_CH4 |
| GND | 65 | P | Земля | P | Земля |
| AU_DAC1N_OUT | 66 | AO | AU_DAC1N_OUT | AO | Отрицательный дифференциальный выход аудио DAC1 |
| AU_DAC1P_OUT | 67 | AO | AU_DAC1P_OUT | AO | Положительный дифференциальный выход аудио DAC1 |
| MIC_BIAS | 68 | P | MIC_BIAS | P | Напряжение смещения микрофона |
| AU_ADC1N_IN | 69 | AI | AU_ADC1N_IN | AI | Отрицательный дифференциальный вход аудио ADC1 |
| AU_ADC1P_IN | 70 | AI | AU_ADC1P_IN | AI | Положительный дифференциальный вход аудио ADC1 |
| GND | 71 | P | Земля | P | Земля |
| BT_ANT | 72 | I/O | BT_ANT | I/O | Вход/выход радиочастотного сигнала Bluetooth |
| PB51 | 73 | I/O/T | GPIO_B51 | I/O | GPIO_B51, PMIC_SDA, USART4_CTS, USART5_CTS, LPCOMP1_OUT |
| PB52 | 74 | I/O/T | GPIO_B52 | I/O | GPIO_B52, PMIC_SCLK, USART4_RTS, USART5_RTS, LPCOMP2_OUT |
| PB56 | 75 | I/O/T | GPIO_B56 | I/O | GPIO_B56, USART4_CTS, SPI3_CLK, #WKUP_PIN2 |
| PB57 | 76 | I/O/T | GPIO_B57 | I/O | GPIO_B57, USART4_RTS, SPI3_DO, SPI3_DIO, #WKUP_PIN3 |
| PB58 | 77 | I/O/T | GPIO_B58 | I/O | GPIO_B58, USART6_RXD, SPI3_DI, #WKUP_PIN4 |
| PB59 | 78 | I/O/T | GPIO_B59 | I/O | GPIO_B59, USART6_TXD, SPI3_CS, #WKUP_PIN5 |
| PA93 | 79 | I/O/T | GPIO_A93 | I/O | GPIO_A93, I2C3_SDA, USART3_TXD, USART3_RTS |
| PA92 | 80 | I/O/T | GPIO_A92 | I/O | GPIO_A92, I2C3_SCL, USART3_RXD, USART3_CTS |
| PA91 | 81 | I/O/T | GPIO_A91 | I/O | GPIO_A91, I2S2_BCK, GPTIM1_ETR, ATIM2_CH2N, LCDC1_SPI_DIO0, LCDC1_8080_RD, LCDC1_JDI_EXTCOMIN |
| PA90 | 82 | I/O/T | GPIO_A90 | I/O | GPIO_A90, I2S2_MCLK, GPTIM1_CH4, ATIM2_CH2, LCDC1_SPI_CLK, LCDC1_8080_WR, LCDC1_JDI_DISP |
| PA88 | 83 | I/O/T | GPIO_A88 | I/O | GPIO_A88, LCDC1_SPI_CS, LCDC1_8080_CS |
| PA86 | 84 | I/O/T | GPIO_A86 | I/O | GPIO_A86, I2S2_SDI, GPTIM1_CH3, ATIM2_CH1N, LCDC1_SPI_DIO3, LCDC1_8080_DIO1, LCDC1_JDI_SO |
| PA84 | 85 | I/O/T | GPIO_A84 | I/O | GPIO_A84, I2S2_LRCK, GPTIM1_CH2, ATIM2_CH1, LCDC1_SPI_DIO2, LCDC1_8080_DIO0, LCDC1_JDI_SCLK |
| PA82 | 86 | I/O/T | GPIO_A82 | I/O | GPIO_A82, I2S2_SDO, GPTIM1_CH1, ATIM1_CH3N, LCDC1_SPI_DIO1, LCDC1_8080_DC, LCDC1_JDI_SCS |
| PA60 | 87 | I/O/T | GPIO_A60 | I/O | GPIO_A60, I2C4_SCL, USART1_RXD, USART3_CTS |
| PA59 | 88 | I/O/T | GPIO_A59 | I/O | GPIO_A59, I2C4_SDA, USART1_TXD, USART3_RTS |
| PA52 | 89 | I/O/T | SWDIO | I/O | SWDIO, GPIO_A52, GPTIM1_CH3, ATIM2_BKIN, LCDC1_8080_DIO6 |
| PA51 | 90 | I/O/T | SWCLK | O | SWCLK, GPIO_A51, GPTIM1_CH2, ATIM2_CH4, LCDC1_8080_DIO5 |
| PA42 | 91 | I/O/T | GPIO_A42 | I/O | GPIO_A42, GPTIM2_CH4, ATIM2_CH3, LCDC1_8080_DIO4 |
| PA20 | 92 | I/O/T | GPIO_A20 | I/O | GPIO_A20, USART3_RXD, SPI1_DI, USART2_CTS |
| PA21 | 93 | I/O/T | GPIO_A21 | I/O | GPIO_A21, USART3_TXD, SPI1_DO, USART2_RTS |
| PA29 | 94 | I/O/T | GPIO_A29 | I/O | GPIO_A29, USART2_RXD, SPI1_CS, I2C2_SDA |
| PA28 | 95 | I/O/T | GPIO_A28 | I/O | GPIO_A28, USART2_TXD, SPI1_CLK, I2C2_SCL |
| PA18 | 96 | I/O/T | GPIO_A18 | I/O | GPIO_A18, PDM1_DATA, I2S1_SDI, USART2_RTS, I2C2_SCL, LCDC1_DPI_SD |
| PA02 | 97 | I/O/T | GPIO_A02 | I/O | GPIO_A02, SD1_CLKIN, CAN2_RXD, ATIM1_CH1N, USART3_RXD |
| PA11 | 98 | I/O/T | GPIO_A11 | I/O | GPIO_A11, SCI_RST, CAN2_TXD, I2C1_SDA, ATIM1_CH3N, USART3_TXD |
| PA08 | 99 | I/O/T | GPIO_A08 | I/O | GPIO_A08, SD1_DIO6, SCI_DIO, USART2_RXD, ATIM1_CH3 |
| PA07 | 100 | I/O/T | GPIO_A07 | I/O | GPIO_A07, SD1_DIO4, SCI_CLK, USART2_TXD, ATIM1_CH2N |
| PA10 | 101 | I/O/T | GPIO_A10 | I/O | GPIO_A10, SD1_CMD, MPI4_CS |
| PA09 | 102 | I/O/T | GPIO_A09 | I/O | GPIO_A09, SD1_CLK, MPI4_CLK |
| PA06 | 103 | I/O/T | GPIO_A06 | I/O | GPIO_A06, SD1_DIO3, MPI4_DIO3 |
| PA04 | 104 | I/O/T | GPIO_A04 | I/O | GPIO_A04, SD1_DIO1, MPI4_DIO1 |
| PA05 | 105 | I/O/T | GPIO_A05 | I/O | GPIO_A05, SD1_DIO0, MPI4_DIO0 |
| PA01 | 106 | I/O/T | GPIO_A01 | I/O | GPIO_A01, SD1_DIO2, MPI4_DIO2 |
| PB10 | 107 | I/O/T | GPIO_B10 | I/O | GPIO_B10, LCDC2_JDI_HST, LCDC2_SPI_CLK, USART6_RXD, GPTIM5_CH3 |
| PB09 | 108 | I/O/T | GPIO_B09 | I/O | GPIO_B09, LCDC2_JDI_R1, LCDC2_SPI_DIO0, USART6_TXD, GPTIM5_CH2, WLAN_ACTIVE |
| PB08 | 109 | I/O/T | GPIO_B08 | I/O | GPIO_B08, LCDC2_JDI_G1, LCDC2_SPI_CS, GPTIM5_CH1, BT_ACTIVE |
| PB06 | 110 | I/O/T | GPIO_B06 | I/O | GPIO_B06, LCDC2_JDI_R2, LCDC2_SPI_DIO3, LCDC2_JDI_SO, GPTIM4_CH3, USART6_CTS |
| PB04 | 111 | I/O/T | GPIO_B04 | I/O | GPIO_B04, LCDC2_JDI_G2, LCDC2_SPI_DIO2, LCDC2_JDI_DISP, GPTIM4_CH1, USART4_CTS |
| PB03 | 112 | I/O/T | GPIO_B03 | I/O | GPIO_B03, LCDC2_JDI_B2, LCDC2_SPI_DIO1, LCDC2_JDI_SCS, GPTIM3_CH4, USART4_RTS |
| PB02 | 113 | I/O/T | GPIO_B02 | I/O | GPIO_B02, LCDC2_JDI_B1, LCDC2_SPI_TE, LCDC2_JDI_SCLK, GPTIM3_CH3 |
| PB01 | 114 | I/O/T | GPIO_B01 | I/O | GPIO_B01, I2C7_SCL, USART6_TXD, GPTIM3_CH2, LPTIM3_OUT |
| PB00 | 115 | I/O/T | GPIO_B00 | I/O | GPIO_B00, I2C7_SDA, USART6_RXD, GPTIM3_CH1, LPTIM3_IN |
| PB23 | 116 | I/O/T | GPIO_B23 | I/O | GPIO_B23, USART5_CTS, SPI3_DO, SPI3_DIO, GPTIM4_CH2 |
| PB26 | 117 | I/O/T | GPIO_B26 | I/O | GPIO_B26, USART5_RTS, SPI3_CS, GPTIM5_CH1 |
| PB28 | 118 | I/O/T | GPIO_B28 | I/O | GPIO_B28, I2C6_SCL, USART6_RXD |
| PB29 | 119 | I/O/T | GPIO_B29 | I/O | GPIO_B29, I2C6_SDA, USART6_TXD |
| PB24 | 120 | I/O/T | GPIO_B24 | I/O | GPIO_B24, I2S3_SDO, GPTIM4_CH3 |
| PB27 | 121 | I/O/T | GPIO_B27 | I/O | GPIO_B27, SPI4_CLK, I2S3_SDI, GPTIM5_CH2 |
| PB31 | 122 | I/O/T | GPIO_B31 | I/O | GPIO_B31, SPI4_DI, I2S3_LRCK, AUD_CLK_EXT, GPTIM5_CH4 |
| PB30 | 123 | I/O/T | GPIO_B30 | I/O | GPIO_B30, SPI4_DO, I2S3_BCK, SPI4_DIO, GPTIM5_CH3 |
| PB34 | 124 | I/O/T | GPIO_B34 | I/O | GPIO_B34, SPI4_CS, I2S3_MCLK |
| PB39 | 125 | I/O/T | GPIO_B39 | I/O | GPIO_B39, USART6_RTS, GPTIM3_CH4 |
| PB38 | 126 | I/O/T | GPIO_B38 | I/O | GPIO_B38, USART6_CTS, GPTIM3_CH3 |
| PB47 | 127 | I/O/T | GPIO_B47 | I/O | GPIO_B47, I2C5_SDA, USART6_RXD, GPTIM5_CH2 |
| PB48 | 128 | I/O/T | GPIO_B48 | I/O | GPIO_B48, I2C5_SCL, USART6_TXD, GPTIM5_CH3 |
| AU_DAC2N_OUT | 129 | AO | AU_DAC2N_OUT | AO | Отрицательный дифференциальный выход аудио DAC2 |
| AU_DAC2P_OUT | 130 | AO | AU_DAC2P_OUT | AO | Положительный дифференциальный выход аудио DAC2 |
| AU_ADC2N_IN | 131 | AI | AU_ADC2N_IN | AI | Отрицательный дифференциальный вход аудио ADC2 |
| AU_ADC2P_IN | 132 | AI | AU_ADC2P_IN | AI | Положительный дифференциальный вход аудио ADC2 |
| GND | 133–138 | P | Земля | P | Земля (6 выводов) |

</div>

*Обозначения: P = питание; I = вход; O = выход; T = можно настроить как высокоомный; AO = аудиовыход; AI = аудиовход.*

!!! note
    Выводы 2 (USART_RXD) и 3 (USART_TXD) используются по умолчанию для вывода журнала, отладки и загрузки программы.

### 4.3 Физическое расположение выводов { #43-physical-pin-description }

На физической схеме расположения выводов из даташита они сгруппированы по функциям — SDIO, SPI, I2C, UART, GPTIM, интерфейсы LCD (DPI/8080/SPI/JDI/DSI), GPADC, MPI, аналоговый аудиотракт, режим загрузки, питание, антенна BT, CAN/USB и SWD/UART отладки. Группы наложены на контур кристалла SF32LB586VDD36. Используйте эту схему вместе с таблицей назначений при размещении групп сигналов на хост-плате.

!!! info "Рисунок 4-2. Физическое расположение выводов"
    См. рисунок 3-2 в официальном даташите; в этом руководстве он не воспроизведён.

## 5. Периферийные интерфейсы { #5-peripherals }

### 5.1 Интерфейсы связи { #51-communication-interfaces }

Любой вывод с обозначением `PAxx_I2C_UART` или `PBxx_I2C_UART` в таблице выше можно настроить для работы как I2C или UART. Всего чип поддерживает до 7 интерфейсов I2C и 6 интерфейсов UART.

**UART** — Полнодуплексная связь, скорость передачи до 6 Mbps, настраиваемый формат данных, аппаратное управление потоком (CTS/RTS), многопакетная передача и приём с DMA. UART1–3 относятся к HPSYS, UART4–6 — к LPSYS.

**I2C** — Поддерживает режимы ведущего и ведомого устройства, FIFO на 8 байт, DMA, стандартный режим (100 kbps), быстрый (400 kbps), fast-mode plus (1 Mbps) и high-speed (3,4 Mbps), адресацию 7 или 10 бит в режиме ведущего, растяжение тактового сигнала (clock stretching) и настраиваемый цифровой фильтр подавления коротких импульсов. I2C1–4 относятся к HPSYS, I2C5–7 — к LPSYS.

**SPI** — Поддерживаются форматы SSP/SPI (полнодуплексный режим, ведущее или ведомое устройство) и Microwire (полудуплексный режим, только ведущее устройство), ширина данных 4–32 бита, настройка полярности и фазы тактового сигнала, настройка полярности chip-select, FIFO на 16 слов по 32 бита и DMA. SPI1/2 относятся к HPSYS (до 48 MHz), SPI3/4 — к LPSYS (до 24 MHz).

**USB 2.0 HS** — Один высокоскоростной порт Host/Device, совместимый с USB 2.0; настраиваемые конечные точки, поддержка приостановки/возобновления, запроса сеанса и протокола согласования Host, а также режимов high-speed и full-speed.

**MPI (Memory Peripheral Interface)** — Поддерживаются SPI NOR Flash (1/2/4 линии, режим DTR) и SPI NAND Flash (1/2/4 линии), доступ через регистры и memory-mapped с автоматическим аппаратным переключением. Интерфейс MPI4 модуля позволяет подключить внешнюю SPI NOR/NAND Flash.

**SD/SDIO/eMMC** — Соответствие SD 3.0 и eMMC 4.5.1; работа в режиме Host-контроллера с цепочечным DMA и FIFO 1 KB. Поддерживаются карты SDSC/SDHC/SDXC/SDHS, UHS-1 (SDR12/25/50/104/DDR50), режимы SDR с 1/4/8 линиями и DDR с 4/8 линиями.

**I2S** — Только режим ведущего устройства, полнодуплексная передача, форматы left-justified/right-justified/standard, моно и стерео с разрядностью 8 или 16 бит, ширина PCM до 24 бит.

**Интерфейс LCD** — Последовательный режим DBI SPI (3/4 линии, двух- или четырёхлинейная передача данных) и параллельный режим 8080 (шина 8/16/24 бита). В зависимости от режима поддерживаются форматы RGB332/RGB444/RGB565/RGB666/RGB888. На выводах 47–52 также доступны выделенные линии MIPI DSI (тактовая и две линии данных).

### 5.2 Аналоговая обработка сигналов { #52-analog-signal-processing }

**12-разрядный GPADC** — АЦП SAR с максимальной частотой выборки 4 MS/s, диапазон входного сигнала 0–3,3 V в однополярном режиме и ±2,1 V в дифференциальном; 8 однополярных каналов (или 4 дифференциальные пары), одиночный и непрерывный режимы измерения, 4 настраиваемых временных интервала на измерение, запуск программно или аппаратно, поддержка DMA.

**Датчик температуры** — Разрешение 0,2 °C, диапазон от -40 °C до 125 °C, точность ±3 °C, чтение опросом или по прерыванию.

**Аудио ЦАП** — 2 встроенных 24-разрядных канала, частота дискретизации 8–48 kHz, дифференциальный выход.

**Аудио PLL** — Генерация тактового сигнала Fractional-N с разрешением 48 MHz/2^18; поддерживаются частота дискретизации 44,1 kHz, а также частоты, получаемые из 48 MHz и 32,768 kHz.

**Аудио АЦП** — 2 встроенных 24-разрядных канала, частота дискретизации 8–48 kHz, независимая регулировка усиления каждого канала.

## 6. Электрические характеристики { #6-electrical-characteristics }

### 6.1 Абсолютные предельные значения { #61-absolute-maximum-ratings }

<div align="center"><em>Таблица 6.1-1. Абсолютные предельные значения</em></div>

<div align="center" markdown>

| Обозначение | Параметр | Мин. | Макс. | Единица |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | Вход питания 3,3 V | -0,3 | 3,6 | V |
| VDD_1V8 | Вход питания 1,8 V | -0,3 | 1,95 | V |
| VDDIO | Вход питания ввода-вывода | -0,3 | 3,6 | V |
| Tstore | Температура хранения | -40 | 125 | °C |

</div>

### 6.2 Рекомендуемые условия эксплуатации { #62-recommended-operating-conditions }

<div align="center"><em>Таблица 6.2-1. Рекомендуемые условия эксплуатации</em></div>

<div align="center" markdown>

| Обозначение | Параметр | Мин. | Тип. | Макс. | Единица |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | Вход питания 3,3 V | 2,97 | 3,3 | 3,6 | V |
| VDD_1V8 | Вход питания 1,8 V | 1,7 | 1,8 | 1,95 | V |
| VDDIO | Вход питания ввода-вывода | 1,7 | - | 3,6 | V |
| TA | Рабочая температура | -40 | - | 85 | °C |

</div>

### 6.3 Электрические характеристики постоянного тока { #63-dc-electrical-characteristics }

<div align="center"><em>Таблица 6.3-1. Электрические характеристики постоянного тока (3,3 V, 25 °C)</em></div>

<div align="center" markdown>

| Обозначение | Параметр | Мин. | Тип. | Макс. | Единица |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Ёмкость вывода | 2,5 | 3 | 3,5 | pF |
| VIH | Высокий уровень входного напряжения | 0,7×VDD | - | VDD | V |
| VIL | Низкий уровень входного напряжения | VSS | - | 0,3×VDD | V |
| VOH | Высокий уровень выходного напряжения (высокоомная нагрузка) | 0,8×VDD | - | VDD | V |
| VOL | Низкий уровень выходного напряжения (высокоомная нагрузка) | VSS | - | 0,2×VDD | V |
| IOH | Нагрузочная способность по выходному току, высокий уровень | 24 | 30 | 38 | mA |
| IOL | Нагрузочная способность по выходному току, низкий уровень | 24 | 30 | 38 | mA |
| RPU / RPD | Внутренняя подтяжка вверх / вниз | 7 | 10 | 20 | kΩ |

</div>

<div align="center"><em>Таблица 6.3-2. Электрические характеристики постоянного тока (1,8 V, 25 °C)</em></div>

<div align="center" markdown>

| Обозначение | Параметр | Мин. | Тип. | Макс. | Единица |
| :--- | :--- | :-: | :-: | :-: | :-: |
| IOH | Нагрузочная способность по выходному току, высокий уровень | 8 | 10 | 13 | mA |
| IOL | Нагрузочная способность по выходному току, низкий уровень | 8 | 10 | 13 | mA |
| RPU / RPD | Внутренняя подтяжка вверх / вниз | 10 | 17 | 30 | kΩ |

</div>

Полные таблицы (включая входной ток утечки, пороги сброса и ёмкость выводов при обоих напряжениях питания) приведены в §5,3 официального даташита.

### 6.4 Энергопотребление { #64-power-consumption }

<div align="center"><em>Таблица 6.4-1. Ток BLE (мощность передачи 0 dBm)</em></div>

<div align="center" markdown>

| Обозначение | Условие | @1,8 V | @3,8 V | Единица |
| :--- | :--- | :-: | :-: | :-: |
| I∆TX | Мощность TX = 0 dBm | 4,19 | 2,21 | mA |
| I∆RX | — | 4,03 | 2,12 | mA |

</div>

<div align="center"><em>Таблица 6.4-2. Средний ток BLE/Bluetooth Classic (питание 3,8 V)</em></div>

<div align="center" markdown>

| Режим | Интервал | @0 dBm | @10 dBm | Единица |
| :--- | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50 ms | 146,4 | 178,6 | µA |
| BT Sniff (attempt=1) | 1 s | 7,3 | 8,9 | µA |
| BLE ADV | 50 ms | 166,9 | 251,8 | µA |
| BLE ADV | 1 s | 8,3 | 12,6 | µA |
| BLE Connection | 50 ms | 128,8 | 148,4 | µA |
| BLE Connection | 1 s | 6,4 | 7,4 | µA |
| Standby | — | 4,2 | — | µA |

</div>

<div align="center"><em>Таблица 6.4-3. Потребление процессора (HPSYS/LPSYS, питание 3,8 V)</em></div>

<div align="center" markdown>

| Обозначение | Условие | Ток (mA) | Прирост (µA/MHz) |
| :--- | :--- | :-: | :-: |
| ICoreMark | HPSYS @240 MHz | 10,34 | 31,3 |
| ICoreMark | LPSYS @48 MHz | 0,89 | 27,6 |
| IWhileLoop | HPSYS @240 MHz | 7,98 | 21,3 |
| IWhileLoop | LPSYS @48 MHz | 0,67 | 18,7 |

</div>

### 6.5 Радиочастотные характеристики двухрежимного Bluetooth { #65-dual-mode-bluetooth-rf-performance }

Поддерживается Bluetooth 5.3 с обратной совместимостью с 4.2/4.1/4.0, включая BLE и Bluetooth Classic. Центральная частота рабочих каналов: 2402–2480 MHz.

**Передатчик BLE (1 Mbps)**: максимальная мощность 19 dBm, диапазон регулировки мощности от -20 до 19 dBm.

**Приёмник BLE**: типовая чувствительность составляет -100 dBm (1 Mbps), -97 dBm (2 Mbps), -104,5 dBm (LR S2/500 kbps) и -107,5 dBm (LR S8/125 kbps); измерения выполнены с пакетами длиной 37 байт при PER 30,8 % в условиях dirty-off.

**Bluetooth Classic (Basic Data Rate)**: максимальная мощность передачи 19 dBm; чувствительность приёмника -96,3 dBm (dirty off) / -94 dBm (dirty on) при BER 0,1 %.

**Bluetooth Classic (Enhanced Data Rate)**: максимальная мощность передачи 13 dBm; чувствительность приёмника -95,5 dBm для π/4-DQPSK и -88,5 dBm для 8DPSK.

Полные таблицы минимальных/типовых/максимальных характеристик передачи и приёма BLE (1 Mbps/2 Mbps/LR) и Bluetooth Classic (BR/EDR) приведены в §5.5 официального даташита.

## 7. Питание модуля { #7-module-power-supply }

У модуля пять входов питания: **VDD_3V3**, **VDD_1V8**, **VDDIOA**, **VDDIOA2** и **VDDIOB**.

- **VDD_3V3** питает шины AVDD33_ANA, AVDD33_AUD и AVDD_USB чипа, а также вход VDD встроенной eMMC модуля (если установлена). Рекомендуется использовать LDO.
- **VDD_1V8** питает шины PVDD1, PVDD2, AVDD_BRF и AVDD18_DSI чипа, а также встроенную в корпус память.
- **VDDIOA** питает шину VDDIOA чипа, вход VIO встроенной eMMC (если установлена) и внешнюю флеш-память.
- **VDDIOA2** питает шину VDDIOA2 чипа, к которой относятся PA00–PA11.
- **VDDIOB** питает шину VDDIOB чипа.

!!! info "Рисунок 7-1. Блок-схема питания модуля"
    См. рисунок 7-1 в официальном даташите; в этом руководстве он не воспроизведён.

## 8. Эталонная схема и назначение выводов { #8-reference-schematic-and-pin-assignment }

В даташите приведена полная эталонная схема отладочной платы на базе SF32LB58-MOD, включающая цепи питания, сброса, JTAG/SWD, UART, SDIO, LCD, MIPI DSI и аудиотракт.

!!! info "Рисунок 8-1. Эталонная схема отладочной платы"
    См. рисунки 7-2–7-8 в официальном даташите; схема не воспроизведена в этом руководстве.

В даташите также приведена рекомендуемая таблица назначения выводов этой платы, в том числе разводка разъёмов в стиле Raspberry Pi для вариантов дисплейного интерфейса LCD_DPI_24, LCD_DSI, LCD_QSPI и LCD_8080.

!!! info "Рисунок 8-2. Рекомендуемое назначение выводов эталонной платы"
    См. рисунок 7-9 в официальном даташите; таблица не воспроизведена в этом руководстве.

Используйте эти материалы как основу для производственной схемы и подберите выводы с учётом набора периферии вашего изделия.

## 9. Контрольный список для разработки схемы { #9-schematic-design-checklist }

<div align="center"><em>Таблица 9-1. Контрольный список для разработки схемы</em></div>

<div align="center" markdown>

| № | Проверка |
| :-: | :--- |
| 1 | Входное напряжение VDD_3V3 должно находиться в диапазоне 2,97–3,6 V; установите конденсатор 4,7 µF рядом с выводом модуля. |
| 2 | Входное напряжение VDD_1V8 должно находиться в диапазоне 1,7–1,95 V; установите конденсатор 4,7 µF рядом с выводом модуля. |
| 3 | Входное напряжение VDDIOA, VDDIOA2 и VDDIOB должно находиться в диапазоне 1,7–3,6 V; установите конденсаторы рядом с выводами модуля. |

</div>

!!! note
    В этом руководстве приведены только три пункта выше. Перед утверждением производственной схемы сверьтесь с полным контрольным списком в §7.3 [официального даташита (PDF)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf).

## 10. Размеры модуля и посадочное место PCB { #10-module-dimensions-and-pcb-footprint }

### 10.1 Размеры модуля { #101-module-dimensions }

Размеры модуля: 24 × 24 × 3,1 mm.

!!! info "Рисунок 10-1. Размеры модуля"
    См. рисунок 8-1 в официальном даташите; чертёж не воспроизведён в этом руководстве.

### 10.2 Рекомендуемое посадочное место PCB { #102-recommended-pcb-footprint }

!!! info "Рисунок 10-2. Рекомендуемое посадочное место PCB"
    См. рисунок 8-2 в официальном даташите; чертёж не воспроизведён в этом руководстве.

### 10.3 Разъём внешней антенны { #103-external-antenna-connector }

В вариантах SKU с поддержкой внешней антенны используется RF-вывод типа stamp-hole или совместимый с IPEX разъём — в зависимости от кода заказа.

!!! info "Рисунок 10-3. Размеры разъёма внешней антенны"
    См. рисунок 8-3 в официальном даташите; чертёж не воспроизведён в этом руководстве.

### 10.4 Размещение модуля на PCB { #104-module-placement-in-pcb-design }

Зарезервируйте зону антенны модуля так, чтобы компоненты, медь, дорожки, металл корпуса и другие проводящие структуры не попадали в RF-зону keepout. При определении зазоров и проверке антенны руководствуйтесь официальным даташитом модуля и корпусом готового изделия.

- По возможности выведите область антенны за край платы, расположив точку питания близко к краю.
- Если антенну нельзя вывести за край платы, предусмотрите достаточно широкую зону keepout без заливки меди, дорожек и компонентов; по возможности удалите материал платы под антенной.
- Для готового изделия оцените влияние корпуса на антенну и выполните проверку RF, включая итоговое испытание дальности связи.

## 11. Обращение с изделием { #11-product-handling }

### 11.1 Условия хранения { #111-storage-conditions }

- Храните изделия в герметичном влагозащитном пакете (MBB) при температуре ниже 40 °C и влажности 90 %RH, без конденсации.
- После вскрытия вакуумного пакета используйте модуль в пределах времени нахождения вне упаковки, установленного для его уровня чувствительности к влаге (MSL); иначе перед повторным оплавлением модуль необходимо просушить.

### 11.2 Электростатический разряд (ESD) { #112-electrostatic-discharge-esd }

При сборке и испытаниях соблюдайте стандартные меры SiFli по защите модулей от ESD.

### 11.3 Профиль оплавления { #113-reflow-profile }

Рекомендуется проводить оплавление модуля только один раз.

!!! info "Рисунок 11-1. Рекомендуемый температурный профиль оплавления"
    См. рисунок 9-1 в официальном даташите; график не воспроизведён в этом руководстве.

### 11.4 Ультразвуковая вибрация { #114-ultrasonic-vibration }

Не подвергайте модули SiFli вибрации от оборудования для ультразвуковой сварки или очистки. Ультразвуковая вибрация может вызвать резонанс внутренних кварцевых генераторов модуля, привести к их отказу или нарушению работы, вывести модуль из строя либо ухудшить его характеристики.

!!! note
    Перед утверждением требований к производственному процессу подтвердите окончательный уровень чувствительности к влаге, допустимое время вне упаковки, пределы ESD и требования к оплавлению SF32LB58-MOD по §9 [официального даташита (PDF)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf).

## 12. Связанные документы { #12-related-documents }

- [Даташит DS5802-SF32LB58-MOD (V0.1)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)
- [Описание чипа SF32LB58x](../../sf32-products/chips/SF32LB58x.md)
- [Руководство по аппаратной разработке SF32LB58x](../chip-guides/SF32LB58x_hardware_design_guide.md)
- [SF32LB58-DevKit-LCD](../../sf32-products/devkits/SF32LB58-DevKit-LCD.md)

## 13. История версий { #13-revision-history }

<div align="center"><em>Таблица 13-1. История версий</em></div>

<div align="center" markdown>

| Дата | Версия | Примечания |
| :--- | :-: | :--- |
| 2025 | 0.1 | Первоначальная опубликованная версия |

</div>

Это руководство основано на первоначальной опубликованной версии **DS5802-SF32LB58-MOD V0.1**. Для получения актуальной официальной версии используйте PDF даташита.
