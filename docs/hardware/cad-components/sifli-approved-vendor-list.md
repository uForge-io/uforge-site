---
icon: lucide/component
description: "SiFli's Approved Vendor List for SF32 designs: qualified crystals, buck inductors, NOR/NAND and SD-NAND Flash, and LCD drivers, with selection requirements and a BOM review checklist."
tags:
    - Hardware
    - Vendor
    - AVL
---

# SF32 Approved Vendor List { #sf32-approved-vendor-list }

## What This List Is For { #what-this-list-is-for }

The **Approved Vendor List (AVL)** records SiFli's component qualifications for SF32 designs. V0.3 lists passive crystals, buck inductors, NOR/NAND Flash, SD-NAND, and an LCD driver; its touch-controller sheet contains no entries. Use it to select candidates and second sources, then validate the exact part on your PCB with your firmware, enclosure, production process, and supply chain. Inclusion in the AVL does not replace product-level validation.

This page is built directly from SiFli's official AVL spreadsheet, **`SIFLI-MCU-AVL-认证表`, version V0.3 (2026-01-21)**. As additional parts are qualified, the AVL may change; this page reflects the dated V0.3 release, not a live database. This review confirms only the contents of V0.3 and does not establish whether any listed part remains approved in a later AVL revision. Check the current source file before finalizing a BOM:

<div class="grid cards" markdown>

- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List (AVL): download V0.3 .xlsx](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx)__
- :fontawesome-solid-globe: __[SiFli Wiki — hardware design guides and downloads](https://wiki.sifli.com/en/hardware/index.html)__

</div>

!!! note "How to use this list"
    The source provides general requirements for crystals and buck inductors; the other tables primarily record individual part data. Use the stated requirements to screen additional candidates, but do not assume every listed part satisfies every general limit: source discrepancies are flagged below. Columns that are empty for every source row, such as Flash download-tool support, are omitted rather than presented as verified support. In detailed tables, a dash (—) generally means V0.3 provides no value for that field. In NOR Flash DTR-clock cells, it instead represents the source's explicit "not supported" entry; see the NOR Flash note below.

Work through a BOM decision in three passes rather than picking a part number and moving on:

1. **Shortlist against the requirement.** Match capacity, voltage rail, package, and the class-level requirement (load capacitance for crystals, DCR/Isat for inductors, SDR/DTR clock for Flash) to your schematic and power budget.
2. **Check the constraints that do not show up in a datasheet headline number.** Confirm temperature range versus the product's operating and storage environment, exact Manufacturer/JEDEC ID expected by firmware, and whether OTA, filesystem, or download-tool support has been exercised on that exact part rather than only on a same-family part.
3. **Validate on real hardware before committing to volume.** Measure standby/active current on your own board, re-check crystal RF calibration on the final PCB and enclosure, and identify at least one second source for every single-vendor line item.

## Coverage at a Glance { #coverage-at-a-glance }

<div align="center"><em>Table: Coverage at a Glance</em></div>

<div align="center" markdown>

| Category | Qualified Parts | Primary Selection Criteria |
|:---|---:|:---|
| 48 MHz crystals | 10 | Load capacitance, frequency tolerance, ESR, startup time, CBANK calibration, Bluetooth frequency offset |
| 32.768 kHz crystals | 5 | Load capacitance, frequency tolerance, ESR, package, operating temperature |
| Buck inductors | 8 | 4.7 µH value, DCR, saturation current (Isat), rated current (Irms), SRF, 2016 package compatibility |
| NOR Flash | 44 | Capacity, voltage rail, SDR/DTR clock, Reported ID, standby/deep-power-down current |
| SPI-NAND Flash | 18 | Capacity, ECC mode, page/block geometry, golden block, standby/read/program currents |
| SD-NAND Flash | 5 | SD 2.0 compatibility, 50 MHz operation, standby current, operating temperature range |
| LCD drivers | 1 | One listed part; confirm panel timing, driver support, and interface mode before release |
| Touch-panel controllers | 0 | No entries in V0.3; confirm qualification and driver support separately |

</div>

Use this summary to see which component classes V0.3 covers. Display and touch choices need particular attention because this snapshot contains only one LCD driver and no touch controllers. Confirm the selected part with SiFli and validate it in the product; later AVL inclusion does not remove that requirement.

## Revision History { #revision-history }

<div align="center"><em>Table: Revision History</em></div>

<div align="center" markdown>

| Version | Date | Author | Change |
|:--------|:-----|:-------|:-------|
| V0.1 | 2023-12-29 | yzli | Initial release. |
| V0.2 | 2025-07-16 | yzli | Added Huilun and JWT (晶威特) 48 MHz crystals. |
| V0.3 | 2026-01-21 | yzli | Added UCUN NOR Flash: UC25WQ80IB, UC25IQ32A, UC25IQ64A, UC25IQ128A. |

</div>

---

## Crystals { #crystal-oscillators }

The AVL covers 48 MHz system crystals and 32.768 kHz RTC crystals. Follow the exact SF32 device's design guide for clock-source requirements, then select against load capacitance, frequency tolerance, ESR, startup behavior, and power budget. The qualification tables below do not establish one mandatory clock configuration for every SF32 product.

### 48 MHz System Crystal { #48-mhz-system-crystal }

!!! info "Requirement"
    Load capacitance CL ≤ 12 pF (7 pF recommended) · Frequency deviation ΔF/F0 ≤ ±10 ppm · ESR ≤ 30 Ω (22 Ω recommended)

<div align="center"><em>48 MHz System Crystal Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | CL | ΔF/F0 | ESR | Operating Temp | Package | Startup Time | Current Adder | Optimal CBANK_SEL | TX Ch39 Freq Offset (−35°C / 25°C / 105°C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:--------------|:-------------|:-------------------|:---------------------------------------------|
| E1SB48E001G00E | Hosonic (鸿星) | 8.8 pF | −10 to +9 ppm | ≤22 Ω | −30°C to +85°C | 2016 metric | <700 µs | 0 µA | 0x1C9 | −32 to −1 kHz / ±20 kHz / +33 to +73 kHz |
| SX20Y048000B31T-8.8 | TKD (泰晶) | 8.8 pF | ±10 ppm | ≤40 Ω | −20°C to +75°C | 2016 metric | <800 µs | <30 µA | 0x1DC | −52 to −15 kHz / ±22 kHz / +50 to +100 kHz |
| SX20Y048000B31T001 | TKD (泰晶) | 8.8 pF | ±10 ppm | ≤40 Ω | −40°C to +85°C | 2016 metric | <800 µs | <30 µA | 0x1F7 | −53 to +13 kHz / ±30 kHz / +44 to +90 kHz |
| CN4048M00085C822000 | JWT (晶威特) | 8 pF | ±8 ppm | ≤22 Ω | −30°C to +85°C | 2016 metric | <700 µs | 0 µA | 0x195 | −40 to +1 kHz / −25 to +14 kHz / +12 to +45 kHz |
| HS48000013 | 汇隆电子 | 8.8 pF | ±10 ppm | ≤22 Ω | −30°C to +85°C | 2016 metric | <700 µs | <12 µA | 0x1F3 | −27 to +8 kHz / −25 to +10 kHz / −1.2 to +32 kHz |
| SX20Y048000B81T003 | TKD (泰晶) | 8 pF | ±10 ppm | ≤40 Ω | −30°C to +85°C | 2016 metric | <700 µs | <10 µA | 0x1F4 | −41 to +7 kHz / −30 to +20 kHz / +5 to +57 kHz |
| L214S480D11-S | Lucki (蓝晶) | 8 pF | ±10 ppm | ≤30 Ω | −30°C to +85°C | 2016 metric | <750 µs | <50 µA | 0x196 | −38 to 0 kHz / −28 to 0 kHz / −4 to +45 kHz |
| 8Y48090002 | TXC (晶技) | 8.8 pF | −6 to +8 ppm | ≤22 Ω | −30°C to +85°C | 2016 metric | <700 µs | <30 µA | 0x1D0 | −34 to −9.6 kHz / — / +27.9 to +46.1 kHz |
| 9S48000051 | 惠伦晶体 | 8.8 pF | −6 to +8 ppm | ≤20 Ω | −30°C to +85°C | 2016 metric | <700 µs | <15 µA | — | — |
| CN4048M000885C822000 | JWT (晶威特) | 8.8 pF | ±8 ppm | ≤22 Ω | −30°C to +85°C | 2016 metric | <700 µs | <10 µA | 0x1D0 | −34 to −9.6 kHz / −25 to +10 kHz / +27.9 to +46.1 kHz |

</div>

!!! tip "What the RF calibration columns mean"
    **CBANK_SEL** is the trim setting reported in SiFli's qualification data. **TX Ch39 Freq Offset** retains the source's test label and three temperature-point results. The workbook does not identify the Bluetooth mode or test frequency; do not assume this means BLE advertising channel 39 or a particular mid-band channel. Confirm the test setup and calibration procedure before comparing results or applying trim settings to your board. Three TKD rows list ESR ≤40 Ω despite the general ≤30 Ω requirement; this source discrepancy also needs confirmation.

The crystal table's additional-current figures have no documented baseline or complete test setup. They are not standalone crystal supply currents; confirm the measurement definition before comparing candidates or using the values in a system power budget.

### 32.768 kHz RTC Crystal { #32768-khz-rtc-crystal }

!!! info "Requirement"
    Load capacitance CL ≤ 12.5 pF (7 pF recommended) · Frequency deviation ΔF/F0 ≤ ±20 ppm · ESR ≤ 80 kΩ (38 kΩ recommended)

<div align="center"><em>32.768 kHz RTC Crystal Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | CL | ΔF/F0 | ESR | Operating Temp | Package | Source Percentages; Meaning Unconfirmed (−35°C / 25°C / 105°C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:-------------------------------------|
| ETST00327000LE | Hosonic (鸿星) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C to +85°C | 3215 metric | 32% to 55% / 43% to 54% / 38% to 45% |
| SF32K32768D71T01 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C to +85°C | 3215 metric | 33% to 54% / 42% to 56% / 35% to 44% |
| X1A0001210008xx | Epson (爱普生) | 7 pF | ±20 ppm | ≤90 kΩ | −40°C to +85°C | 1610 metric | 35% to 61% / 42% to 58% / 36% to 48% |
| DH2032K76807T2719002 | JWT (晶威特) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C to +85°C | 3215 metric | 43% to 60% / 45% to 59% / 37% to 48% |
| SF32WK32768D71T024 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C to +85°C | 3215 metric | 34% to 55% / 41% to 54% / 36% to 46% |

</div>

The workbook reports 32.76 kHz for every part at three discrete test temperatures: −35°C, 25°C, and 105°C. This displayed precision does not establish ppm-level accuracy or continuous-temperature performance. The percentage values above appear in columns whose source header is `TX_CH39_Freq_offset(KHz)`, although their format suggests duty-cycle measurements. Confirm their meaning with SiFli before using them as duty-cycle limits. The 105°C test point also does not extend the listed −40°C to +85°C operating range. The Epson part's listed ESR limit of 90 kΩ exceeds the general 80 kΩ requirement; retain this source discrepancy and confirm acceptance for your design.

---

## Buck Inductors { #buck-inductors }

!!! info "Requirement"
    Inductance L = 4.7 µH ±20% · DC resistance (DCR) ≤ 0.4 Ω · Saturation current (Isat) ≥ 450 mA

<div align="center"><em>Buck Inductor Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Type | Tolerance | SRF | DCR | Isat | Irms | Package |
|:--------------|:-------|:-----|:----------|:----|:----|:-----|:-----|:--------|
| WPN201610U4R7MT | Sunlord | Wirewound | ±20% | 21 MHz | ≤288 mΩ | 1.3 A | 1.45 A | 0806 (2016 metric) |
| WPN201610H4R7MT | Sunlord | Wirewound | ±20% | 25 MHz | ≤425 mΩ | 1.2 A | 1.0 A | 0806 (2016 metric) |
| HTTX20161T-4R7MDR | Cyntec | Wirewound | ±20% | — | ≤250 mΩ | 1.7 A | 1.5 A | 0806 (2016 metric) |
| VLS201612CX-4R7M-1 | TDK | Wirewound | ±20% | 51 MHz | ≤252 mΩ | 0.88 A | 1.32 A | 0806 (2016 metric) |
| CIGW201610GL4R7MLE | Samsung | Wirewound | ±20% | — | ≤240 mΩ | 1.4 A | 1.4 A | 0806 (2016 metric) |
| DFE201612E-4R7M=P2 | Murata | Wirewound | ±20% | — | ≤252 mΩ | 1.8 A | 1.2 A | 0806 (2016 metric) |
| SWAI201610H4R7M | 三体微 | Wirewound | ±20% | — | ≤390 mΩ | 1.3 A | 1.05 A | 0806 (2016 metric) |
| FSHJ201610-4R7M | 方磁 | Wirewound | ±20% | — | ≤425 mΩ | 1.1 A | 0.9 A | 0806 (2016 metric) |

</div>

Inclusion in this table does not make the eight inductors electrically interchangeable. WPN201610H4R7MT and FSHJ201610-4R7M each have a listed maximum DCR of 425 mΩ, exceeding the general 0.4 Ω requirement. The workbook does not explain this discrepancy; confirm acceptance with SiFli rather than treating either part as meeting that limit. For every candidate, check DCR loss, Isat, Irms, SRF, footprint, height, and temperature rise against the converter's actual inductor current and operating conditions, not the whole product's average current.

---

## NOR Flash { #nor-flash }

V0.3 lists 44 NOR Flash parts from 4 Mb to 256 Mb, grouped by capacity. The clock values describe the listed memory devices, not guaranteed operating speeds on every SF32 device or board. Check read-command support, controller limits, timing, and driver identification for your exact design. The source labels its hexadecimal identification values “Manufacture ID”; these include device-identification fields, so compare the full expected response rather than only a manufacturer byte. Use current values under documented operating conditions when calculating active and standby power.

### 4 Mb – 16 Mb { #4-mb-16-mb }

None of the six parts in this capacity tier support DTR mode, so only a single SDR clock column is shown.

<div align="center"><em>4 Mb to 16 Mb NOR Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Capacity | Voltage | Temp Range | Max SDR Clock | Reported ID | Standby | Deep Power-Down | Active Read Current |
|:--------------|:-------|:---------|:--------|:-----------|:---------------|:-------|:--------|:------------------|:----------------------|
| P25Q40SU | PUYA | 4 Mb | 1.65–3.6 V | −40°C to +85°C | 85 MHz @1.8 V / 104 MHz @3.3 V | 0x856013 | 10 µA | 0.1 µA @1.8 V / 0.6 µA @3.3 V | 3.5 mA @85 MHz (1.8 V) / 5 mA @85 MHz (3.3 V) / EDH: not supported |
| P25Q80LE | PUYA | 8 Mb | 1.65–2.0 V | −40°C to +85°C | 104 MHz | 0x856014 | 9 µA | 0.1 µA | 1.5 mA @85 MHz / EDH: not supported |
| GD25LE80E | GD (GigaDevice) | 8 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz | 0xC86014 | 10 µA | 0.2 µA | 3 mA @80 MHz / EDH: not supported |
| UC25WQ80IB | UCUN | 8 Mb | 1.65–3.6 V | −40°C to +85°C | 104 MHz | 0xB36014 | 1.5 µA | 0.5 µA | 6 mA @85 MHz / EDH: not supplied |
| P25Q16LE | PUYA | 16 Mb | 1.65–2.0 V | −40°C to +85°C | 104 MHz | 0x856015 | 18 µA | 0.1 µA | 3 mA @85 MHz / EDH: not supported |
| GD25LE16E | GD (GigaDevice) | 16 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz | 0xC86015 | 10 µA | 0.2 µA | 3 mA @80 MHz / EDH: not supported |

</div>

### 32 Mb – 64 Mb { #32-mb-64-mb }

<div align="center"><em>32 Mb to 64 Mb NOR Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Capacity | Voltage | Temp Range | Max Clock (SDR / DTR) | Reported ID | Standby | Deep Power-Down | Active Read Current |
|:--------------|:-------|:---------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q32L | PUYA | 32 Mb | 1.65–2.0 V | −40°C to +85°C | 120 MHz / — | 0x856016 | 9 µA | 0.2 µA | 2 mA @85 MHz / EDH: not supported |
| SK25LE032 | SK | 32 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz / 80 MHz | 0x257016 | 10 µA | 0.1 µA | 2 mA @80 MHz (SDR) / 2.6 mA @80 MHz (DTR) |
| GD25LE32E | GD (GigaDevice) | 32 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz / — | 0xC86016 | 10 µA | 0.2 µA | 3 mA @80 MHz / EDH: not supported |
| UC25IQ32A | UCUN | 32 Mb | 2.7–3.6 V | −40°C to +85°C | 133 MHz / 66 MHz | 0xB34014 | 15 µA | 1 µA | 8 mA @80 MHz / EDH: not supplied |
| P25Q64LE | PUYA | 64 Mb | 1.65–2.0 V | −40°C to +85°C | 104 MHz / — | 0x856017 | 18 µA | 0.3 µA | 2 mA @85 MHz / EDH: not supported |
| P25Q64H | PUYA | 64 Mb | 2.3–3.6 V | −40°C to +85°C | 120 MHz / — | 0x856017 | 18 µA | 0.6 µA | 4 mA @85 MHz / EDH: not supported |
| P25Q64SH | PUYA | 64 Mb | 2.3–3.6 V | −40°C to +85°C | 120 MHz / 70 MHz | 0x856017 | 10 µA | 0.3 µA | 6.8 mA @85 MHz (SDR) / 9.45 mA @70 MHz (DTR) |
| GD25LE64E | GD (GigaDevice) | 64 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz / — | 0xC86017 | 10 µA | 0.2 µA | 3 mA @80 MHz / EDH: not supported |
| ZB25LQ64A | ZBIT | 64 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz / 66 MHz | 0x5E7017 | 10 µA | 1 µA | 4 mA @104 MHz / EDH: not supplied |
| BY25Q64ES | BOYA | 64 Mb | 2.7–3.6 V | −40°C to +85°C | 120 MHz / — | 0x684017 | 9 µA | 0.4 µA | 6 mA @80 MHz / EDH: not supported |
| UC25IQ64A | UCUN | 64 Mb | 2.7–3.6 V | −40°C to +85°C | 133 MHz / 66 MHz | 0xB34017 | 10 µA | 1 µA | 15 mA @80 MHz / EDH: not supplied |

</div>

### 128 Mb { #128-mb }

<div align="center"><em>128 Mb NOR Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Voltage | Temp Range | Max Clock (SDR / DTR) | Reported ID | Standby | Deep Power-Down | Active Read Current |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q128L | PUYA | 1.65–2.0 V | −40°C to +85°C | 70 MHz / 43 MHz | 0x856018 | 15 µA | 0.5 µA | 4.5 mA @85 MHz / EDH: not supplied |
| PY25Q128HA | PUYA | 2.7–3.6 V | −40°C to +85°C | 104 MHz / 66 MHz | 0x852018 | 15 µA | 1 µA | 7 mA @85 MHz (SDR) / 9 mA @66 MHz (DTR) |
| SK25LP128 | SK | 1.65–2.0 V | −40°C to +85°C | 166 MHz / 104 MHz | 0x257018 | 8 µA | 0.1 µA | 2 mA @80 MHz (SDR) / 2.6 mA @80 MHz (DTR) |
| GD25LQ128E | GD (GigaDevice) | 1.65–2.0 V | −40°C to +85°C | 120 MHz / — | 0xC86018 | 35 µA | 1 µA | 13 mA @80 MHz / EDH: not supported |
| GD25Q128E | GD (GigaDevice) | 2.7–3.6 V | −40°C to +85°C | 133 MHz / — | 0xC84018 | 14 µA | 1 µA | 8 mA @80 MHz / EDH: not supported |
| GD25F128F | GD (GigaDevice) | 2.7–3.6 V | −40°C to +85°C | 166 MHz / 104 MHz | 0xC84318 | 16 µA | 1 µA | 12 mA @80 MHz / EDH: not supplied |
| W25Q128JW | Winbond | 1.7–1.95 V | −40°C to +85°C | 133 MHz / — | 0xEF6018 | 10 µA | 1 µA | — / EDH: not supported |
| W25Q128JV | Winbond | 2.7–3.6 V | −40°C to +85°C | 133 MHz / — | 0xEF4018 | 10 µA | 1 µA | 12 mA @104 MHz / EDH: not supported |
| XT25F128F | XTX | 2.7–3.6 V | −40°C to +85°C | 133 MHz / 104 MHz | 0x0B4018 | 15 µA | 1 µA | 8 mA @80 MHz / EDH: not supplied |
| XT25Q128DW | XTX | 1.7–2.0 V | −40°C to +85°C | 108 MHz / 76 MHz | 0x0B6018 | 12 µA | 0.4 µA | 9 mA @80 MHz / EDH: not supplied |
| FM25W128 | FM | 1.65–3.6 V | −40°C to +85°C | 50 MHz @1.8 V / 100 MHz @3.3 V (SDR only, DTR not supported) | 0xA12818 | 5 µA | 1 µA @3.3 V | — / EDH: not supported |
| XM25QU128C | XMC | 1.65–1.95 V | −40°C to +85°C | 133 MHz / — | 0x204118 | 18 µA | 6 µA | 6 mA @66 MHz / EDH: not supported |
| ZB25VQ128D | ZBIT | 2.3–3.6 V | −40°C to +85°C | 104 MHz / — | 0x5E4018 | 10 µA | 1 µA | 4 mA @104 MHz / EDH: not supported |
| ZB25LQ128B | ZBIT | 1.65–2.0 V | −40°C to +85°C | 104 MHz / — | 0x5E5018 | 9 µA | 3 µA | 9 mA @104 MHz / EDH: not supported |
| BY25Q128ES | BOYA | 2.7–3.6 V | −40°C to +85°C | 108 MHz / — | 0x684018 | 14 µA | 0.2 µA | 6 mA @80 MHz / EDH: not supported |
| UC25IQ128A | UCUN | 2.7–3.6 V | −40°C to +85°C | 133 MHz / 66 MHz | 0xB34018 | 15 µA | 1 µA | 12 mA @80 MHz / EDH: not supplied |

</div>

### 256 Mb { #256-mb }

<div align="center"><em>256 Mb NOR Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Voltage | Temp Range | Max Clock (SDR / DTR) | Reported ID | Standby | Deep Power-Down | Active Read Current |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| W25Q256JW | Winbond | 1.7–1.95 V | −40°C to +85°C | 133 MHz / — | 0xEF6019 | 10 µA | 1 µA | 8 mA @80 MHz / EDH: not supported |
| W25Q256JV | Winbond | 2.7–3.6 V | −40°C to +85°C | 133 MHz / — | 0xEF7019 | 10 µA | 1 µA | 12 mA @104 MHz / EDH: not supported |
| PY25Q256HB | PUYA | 2.7–3.6 V | −40°C to +85°C | 133 MHz / 100 MHz | 0x852019 | 20 µA | 1 µA | 7 mA @80 MHz (SDR) / 11.5 mA @80 MHz (DTR) |
| GD25LQ256D | GD (GigaDevice) | 1.65–2.0 V | −40°C to +85°C | 120 MHz / — | 0xC86019 | 70 µA | 2 µA | 10 mA @80 MHz / EDH: not supported |
| GD25Q256E | GD (GigaDevice) | 2.7–3.6 V | −40°C to +85°C | 133 MHz / — | 0xC84019 | 16 µA | 1 µA | 12 mA @80 MHz / EDH: not supported |
| XM25QU256C | XMC | 1.65–1.95 V | −40°C to +85°C | 133 MHz / — | 0x204119 | 15 µA | 7 µA | 11 mA @66 MHz / EDH: not supported |
| XM25QH256C | XMC | 2.3–3.6 V | −40°C to +85°C | 133 MHz / — | 0x204019 | 15 µA | 7 µA | 7 mA @66 MHz / EDH: not supported |
| XT25F256BW | XTX | 2.7–3.6 V | −40°C to +85°C | 104 MHz / 50 MHz | 0x0B4019 | 15 µA | 0.5 µA | 8 mA @80 MHz / EDH: not supplied |
| DS25M4BA | Dosilicon | 1.65–1.95 V | −40°C to +85°C | 108 MHz / 80 MHz | 0xE54219 | 15 µA | 5 µA | 13 mA @108 MHz / EDH: not supplied |
| BY25Q256FS | BOYA | 2.7–3.6 V | −40°C to +85°C | 100 MHz / 54 MHz | 0x684919 | 28 µA | 2 µA | 13 mA @80 MHz / EDH: not supplied |
| MX25U25643G | MXIC (Macronix) | 1.65–2.0 V | −40°C to +85°C | 133 MHz / 54 MHz | 0xC22539 | 15 µA | 0.8 µA | 7 mA @84 MHz / EDH: not supplied |

</div>

!!! warning "Current and mode limits need their original conditions"
    These are values reported in the AVL, not independent measurements by this site. Unless explicitly marked, do not assume a value is typical or maximum, or that unstated voltage, temperature, and clock conditions match another row. Verify the component datasheet and measure your board. Read-current values originate from the source's `EBH` and `EDH` columns. A current-cell "—" means the value was not provided; a DTR-clock "—" represents the source's unsupported-mode entry. The source calls its second clock column `TDR`; this page uses `DTR`, but the exact read mode and command still require device-specific verification.

    The EDH labels preserve the source's distinction between missing data and unsupported operation; they are not inferred from the clock column. P25Q128L has a source inconsistency: its maximum SDR clock is listed as 70 MHz, but its read current is specified at 85 MHz. Both values are retained; confirm the valid conditions before using them.

---

## SPI-NAND Flash { #spi-nand-flash }

V0.3 lists 18 SPI-NAND parts at 512 Mb and 1 Gb. They can provide file or data storage with a compatible driver and software stack; examples include FatFS, FlashDB, and LittleFS, but compatibility requires validation for the selected part. NAND page access, ECC, and bad-block management differ from direct NOR XIP access. The workbook records **Golden Block** as `block0` for every listed part, but does not specify the guarantee conditions or which firmware routines rely on it. Confirm these assumptions against the device and SDK documentation.

For GD5F1GM7RE and GD5F1GM7UE, the source lists `2048+64` bytes per page but `128K+8K` bytes per block. The spare-area figures are not consistent with a straightforward page-to-block calculation. Both values are preserved below; confirm page, block, and spare-area geometry against the exact device datasheet before configuring the driver.

### 512 Mb { #512-mb }

<div align="center"><em>512 Mb SPI-NAND Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Voltage | Temp Range | Reported ID | Page / Block Size | Max Rate | ECC | Golden Block | Standby | Page Read | Program/Erase |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| F35SQA512M | FORESEE | 2.7–3.6 V | −40°C to +85°C | 0xCD7070 | 2048+64 B / 128K+4K | 133 MHz | HW 1-bit | `block0` | 10 µA | 10 mA | 15 mA |
| F35UQA512M | FORESEE | 1.7–1.95 V | −40°C to +85°C | 0xCD6060 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35M12B | Dosilicon | 1.7–1.95 V | −40°C to +85°C | 0xE5A5E5 | 2048+128 B / 128K+8K | 83 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35Q12B | Dosilicon | 2.7–3.6 V | −40°C to +85°C | 0xE5F5E5 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |

</div>

### 1 Gb { #1-gb }

<div align="center"><em>Table: 1 Gb SPI-NAND Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Voltage | Temp Range | Reported ID | Page / Block Size | Max Rate | ECC | Golden Block | Standby | Page Read | Program/Erase |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| W25N01GW | Winbond | 1.7–1.95 V | −40°C to +85°C | 0xEFBA21 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 25 mA | 25 mA |
| W25N01GV | Winbond | 2.7–3.6 V | −40°C to +85°C | 0xEFAA21 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 25 mA | 25 mA |
| GD5F1GM7RE | GD (GigaDevice) | 1.7–2.0 V | −40°C to +85°C | 0xC881C8 | 2048+64 B / 128K+8K | 104 MHz SDR / 80 MHz DTR | HW 8-bit | `block0` | 10 µA | 10 mA | 10 mA |
| GD5F1GM7UE | GD (GigaDevice) | 2.7–3.6 V | −40°C to +85°C | 0xC891C8 | 2048+64 B / 128K+8K | 133 MHz SDR / 104 MHz DTR | HW 8-bit | `block0` | 10 µA | 15 mA | 15 mA |
| F35SQA001G | FORESEE | 2.7–3.6 V | −40°C to +85°C | 0xCD7171 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 10 mA | 15 mA |
| HYF1GQ4IDACAE | HeYangTek | 1.7–1.98 V | −40°C to +85°C | 0xC981C9 | 2048+64 B / 128K+4K | 80 MHz | HW 4-bit | `block0` | 10 µA | 5 mA | — |
| HYF1GQ4UDACAE | HeYangTek | 2.7–3.6 V | −40°C to +85°C | 0xC921C9 | 2048+64 B / 128K+4K | 108 MHz | HW 4-bit | `block0` | 10 µA | 15 mA | — |
| XT26Q01D | XTX | 1.7–1.95 V | −40°C to +85°C | 0x0B5100 | 2048+128 B / 128K+8K | 108 MHz | HW 8-bit | `block0` | 15 µA | 26 mA | 28 mA / 18 mA |
| XT26G01C | XTX | 2.7–3.6 V | −40°C to +85°C | 0x0B3100 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | `block0` | 180 µA | 25 mA | 30 mA / 25 mA |
| DS35M1GB | Dosilicon | 1.7–1.95 V | −40°C to +85°C | 0xE5A1E5 | 2048+128 B / 128K+8K | 83 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35Q1GB | Dosilicon | 2.7–3.6 V | −40°C to +85°C | 0xE5F1E5 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |
| ZB35Q01A | ZBIT | 2.7–3.6 V | −40°C to +85°C | 0x5E415E | 2048+64 B / 128K+4K | 80 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 10 mA |
| FM25SL01 | FM | 1.75–1.95 V | −40°C to +85°C | 0xA1A5A1 | 2048+128 B / 128K+8K | 80 MHz | HW 1-bit | `block0` | 10 µA | 16 mA | 16 mA |
| TC58CYG0S3HRAIJ | KIOXIA | 1.7–1.95 V | −40°C to +85°C | 0x98D240 | 2048+64 B / 128K+4K | 133 MHz | HW 8-bit | `block0` | 30 µA | 17 mA | 26 mA |

</div>

Before implementing Flash detection, check the JEDEC/manufacturer ID sequence in each part's datasheet. The number of ID bytes returned after opcode `0x9F` varies by vendor: some return a 2-byte device ID as `DID1`+`DID2`, others a single ID byte. These differences can cause "unrecognized Flash" errors when bringing up a part from a new second source.

---

### Source ID Read Sequences { #read-jedec-id-sequences }

The workbook records the following three ID-read formats. `MID` denotes manufacturer ID; `DID`, `DID1`, and `DID2` denote device-ID fields. These are source strings, not executable transactions. Confirm opcode, dummy/address phase, returned byte count, and chip-select timing against the exact device datasheet before implementation. The hexadecimal IDs in the part tables are not all single manufacturer-ID bytes.

<div align="center"><em>SPI-NAND ID Read Sequences Reported in V0.3</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Parts | Source Sequence |
|:---|:---|
| F35SQA512M, F35UQA512M, W25N01GW, W25N01GV, F35SQA001G, TC58CYG0S3HRAIJ | `9F+dummy(8bit)+MID+DID1+DID2` |
| DS35M12B, DS35Q12B, GD5F1GM7RE, GD5F1GM7UE, DS35M1GB, DS35Q1GB, FM25SL01 | `9F+dummy(8bit)+MID+DID` |
| HYF1GQ4IDACAE, HYF1GQ4UDACAE, XT26Q01D, XT26G01C, ZB35Q01A | `9F+00+MID+DID` |

</div>

---

## SD-NAND Flash { #sd-nand-flash }

V0.3 lists five qualified 1 Gb SD-NAND parts with an SD 2.0 interface. They are candidates for fixed storage accessed through an SD interface without a physical card slot. Confirm controller and driver compatibility for the exact part and product before selection.

<div align="center"><em>SD-NAND Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Temp Range | Voltage | Interface | Max Clock | Standby | Operating Current |
|:--------------|:-------|:-----------|:--------|:----------|:----------|:--------|:---------------------|
| CSNP1GCR01-BOW | CS | −30°C to +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 150 µA (typ) | 15 mA @50 MHz (typ) |
| XTSD01GLGEAG | XTX | −30°C to +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 200 µA (max) | 30 mA @50 MHz (max) |
| XSSD01GGAI | XSS | 0°C to +70°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 300 µA (max) | 45 mA @50 MHz (max) |
| MKDV1GCL-AB | MK | −25°C to +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 50 µA (max) | 28 mA @50 MHz (max) |
| XS26D01GACW | Icthink | −25°C to +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 250 µA (max) | 100 mA @50 MHz (max) |

</div>

XSSD01GGAI is listed for 0°C to +70°C. The other four parts extend down to −25°C or −30°C and up to +85°C; use each row's actual limits rather than assuming a shared temperature grade. Check the required margin for your product environment.

---

## LCD Driver { #lcd-driver }

!!! warning "V0.3 display-driver coverage"
    V0.3 lists one LCD driver. The [V0.3 workbook](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx) is a fixed snapshot, not a link to future revisions. Absence from it does not establish lack of support; confirm an unlisted part with SiFli before production selection. The listed MIPI and QSPI interfaces belong to the display driver, not necessarily to every SF32 device. Check the selected chip's interfaces and driver support; see [Graphics Overview](../../learn/graphics/overview.md) and [ePicasso GPU Architecture](../../learn/graphics/epicasso-gpu.md). The source gives the SDR rate as `?MHz`, so it is unspecified, and marks DDR as unsupported.

<div align="center"><em>LCD Driver Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Resolution | Type | IO Voltage | Interface | GRAM | Color Depth | Max Rate (SDR / DDR) |
|:--------------|:-------|:-----------|:-----|:-----------|:----------|:-----|:--------------|:--------------------------|
| RM69090 | Raydium | 368×448 | AMOLED | 1.65–3.3 V | MIPI, QSPI | Yes | 16.7M colors | Unspecified / not supported |

</div>

---

## Touch Panel Controller { #touch-panel-controller }

V0.3 contains no touch-controller entries. This does not establish qualification status in later revisions or mean that a device is unsupported. For a proposed part, ask SiFli FAE or sales to confirm qualification status and driver support, supplying the exact order code and product requirements. See the [contact information](../../about/index.md).

---

## Design Review Checklist { #design-review-checklist }

Before freezing a schematic or BOM, review each selected AVL part against the actual product design:

- [ ] The exact part number, package, temperature grade, and ordering suffix match the approved row or have an explicit engineering approval path.
- [ ] Voltage range matches the SF32 IO rail, Flash rail, display rail, or power-converter rail used on the board.
- [ ] Package, land pattern, height, and assembly constraints match the PCB library and manufacturing process.
- [ ] Firmware can identify the part correctly, using JEDEC/manufacturer ID or an equivalent runtime probe where applicable.
- [ ] Boot, download, OTA, filesystem, display, or touch-driver behavior has been verified on the exact component.
- [ ] Low-power current has been measured on real hardware, not copied directly from the AVL or component datasheet.
- [ ] Crystal frequency offset, CBANK_SEL behavior, and RF calibration are validated on the final PCB, antenna, and enclosure.
- [ ] Flash erase/program/read timing is tested under the product's expected voltage and temperature range.
- [ ] At least one second-source candidate is identified for high-risk BOM items such as crystals, inductors, Flash, and display panels.

This checklist is intentionally stricter than "the part appears in the AVL." The AVL narrows the search space; product release still depends on board-level evidence.

## Sourcing Checklist { #sourcing-checklist }

- [ ] Cross-check the part number and revision suffix against the current downloadable AVL — spreadsheet snapshots (including this page) go stale as new lots are qualified.
- [ ] For Flash parts, confirm the Manufacturer/JEDEC ID your bring-up code expects matches the exact part ordered, not just the family — some families share a marketing name but return different ID bytes.
- [ ] For NAND, SD-NAND, and any part backing a filesystem, verify boot/download-tool support, OTA update flow, and filesystem behavior (FatFS/FlashDB/LittleFS) on real hardware — a part that reads back correctly during bring-up is not automatically validated for OTA.
- [ ] For crystals, validate CBANK_SEL and the reported TX Ch39 frequency offset on your board. The workbook does not specify the reference layout or full measurement setup; confirm the test mode and conditions before comparing results.
- [ ] Measure standby, deep-power-down, and active-read current on your board. The AVL does not establish the provenance or complete operating conditions of every value, so verify the datasheet and measurement conditions.
- [ ] Confirm package and footprint match your PCB library and assembly capability, not just the electrical spec.
- [ ] For any part not yet on this list, qualify it against the requirement row for its component class before committing it to a BOM, and consider sharing the qualification data back with SiFli.
- [ ] Identify a second-source candidate for each single-vendor item. V0.3 lists one LCD driver and no touch controllers; confirm current availability and support rather than treating this snapshot as the latest status.
- [ ] Re-check this list before every major BOM freeze — it is a snapshot, not a live database.

## Related Pages { #related-pages }

- [SF32LB52x Hardware Design Guide](../chip-guides/SF32LB52x_hardware_design_guide.md) — schematic and layout guidance that references several parts on this list directly.
- SF32LB57x Hardware Design Guide
- [SF32 Family Overview](../../sf32-products/family/SF32_family.md)
