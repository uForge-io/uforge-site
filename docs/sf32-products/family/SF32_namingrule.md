---
icon: lucide/tags
description: "How to decode an SF32LB5xyZxYx6 part number: product tier, PSRAM variant, package type, integrated Flash/PSRAM capacity, and temperature grade, with worked examples."
tags:
  - Hardware
  - Chip
---

# SF32 Naming Convention

## Chip Naming

### Part Number: ***SF32LB5xyZxYx6***

!!! note "Syntax Note"
    * Lowercase ***x*** denotes a numeric digit.
    * Uppercase ***Y*** or ***Z*** denotes an alphabetic character.

### Prefix: *SF32LB5xy*

- **SF32** — SiFli 32-bit MCU Series
- **LB** — Product Line Identifier
    - **LB**: Low-power Bluetooth MCU series
- **5** — Processor Family
    - **5**: Devices based on a 32-bit Arm Cortex-M33 Star-MC1 processor, or a RISC-V processor with comparable performance
- **x** — Product Tier
    - **8 / 7**: Flagship (***dual*** application processors, ***single*** low-power processor)
    - **6 / 5**: Mid-range (***single*** application processor, ***single*** low-power processor)
    - **2**: Cost-optimized (***single*** application processor, ***dedicated*** low-power Bluetooth controller)
- **y** — Device Variant
    - Indicates integrated PSRAM capacity (specific numbering matrix varies by product sub-family)

### Suffix: *ZxYx6*
- **Z** — Package Type
    - **U**: QFN68
    - **V**: BGA
    - **Y**: QFN80
- **xYx** — Integrated Memory Configuration (QSPI-NOR Flash & PSRAM)
  *(Note: Exact encoding mapping depends on the specific package and device family)*
<!--    - **x** (numeric): Integrated QSPI-NOR Flash capacity
        - **1**: 2 Mb
        - **2**: 4 Mb
        - **3**: 8 Mb
        - **4**: 16 Mb
        - **5**: 32 Mb
        - **6**: 64 Mb
        - **7**: 128 Mb
        - **8**: 256 Mb
    - **Y** (alphabetic): Integrated PSRAM capacity
        - **A**: 16 Mb QPI-PSRAM
        - **B**: 32 Mb OPI-PSRAM
        - **C**: 64 Mb OPI-PSRAM
        - **D**: 128 Mb OPI/HPI-PSRAM
        - **E**: 256 Mb HPI-PSRAM
        - **F**: 512 Mb HPI-PSRAM
-->
<div align="center"><em>Part Number Suffix Field Definitions</em></div>

<div align="center" markdown>

| Field | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| **x** | Numeric | **1** to **7**| Integrated QSPI-NOR Flash capacity:<br>• **1**: 2 Mb<br>• **2**: 4 Mb<br>• **3**: 8 Mb<br>• **4**: 16 Mb<br>• **5**: 32 Mb<br>• **6**: 64 Mb<br>• **7**: 128 Mb |
| **Y** | Alphabetic | **A** to **F** | Integrated PSRAM capacity & interface:<br>• **A**: 16 Mb QPI-PSRAM<br>• **B**: 32 Mb OPI-PSRAM<br>• **C**: 64 Mb OPI-PSRAM<br>• **D**: 128 Mb OPI/HPI-PSRAM<br>• **E**: 256 Mb HPI-PSRAM<br>• **F**: 512 Mb HPI-PSRAM |

</div>

- **6** — Operating Temperature Grade
    - **5**: −20°C to +70°C (Commercial)
    - **6**: −40°C to +85°C (Industrial)
    - **7**: −40°C to +105°C (Extended Industrial Grade)

### Part Number Examples

#### Example 1: SF32LB527UD6
**SF32LB52 Series** Cost-Optimized MCU configuration features:

* **Core Architecture:** Single application processor and a dedicated low-power Bluetooth controller processor (Arm Cortex-M33 Star-MC1 based).
* **Package Type:** QFN68 package (**U**).
* **Memory Configuration:** Integrated 128 Mb OPI-PSRAM (**D**).
* **Operating Temperature:** −40°C to +85°C (**6**, Industrial Grade).

#### Example 2: SF32LB587VEE56
**SF32LB58 Series** Flagship MCU configuration features:

* **Core Architecture:** Dual application processors and one low-power processor (Arm Cortex-M33 Star-MC1 based).
* **Package Type:** BGA256 package (**V**).
* **Memory Configuration:** Integrated dual (2x) 256 Mb HPI-PSRAM (**E**) and one 32 Mb QSPI-NOR Flash (**5**).
* **Operating Temperature:** −40°C to +85°C (**6**, Industrial Grade).

## Module Naming

### Part Number: ***SF32LB5x-MOD-y-AaaaBbbbCccc***

!!! note "Syntax Note"
    * In the generic suffix, `A`, `B`, and `C` identify the three storage-field positions; they are not literal characters in every module name.
    * The first character within each populated field identifies the storage type. The remaining digits identify its capacity or configuration.
    * The `-y` subtype field is currently used only by the SF32LB52 module family. Published SF32LB56-MOD and SF32LB58-MOD names are not using it.

### Prefix: *SF32LB5x-MOD-y*

- **SF32LB5x** — Module MCU family
    - **SF32**, **LB**, and **5** follow the same series, product-line, and processor-family meanings as the chip naming convention above.
    - **x** identifies the product tier: **8 / 7** flagship, **6 / 5** mid-range, and **2** cost-optimized.
- **MOD** — SiFli module product.
- **y** — Module subtype, when the family defines one
    - **1**: Direct Li-ion battery operation for SF32LB520/3/5/7 devices. The chip supply range is 3.2–4.7 V; the standard configuration uses SF32LB525UC6 with 8 MB OPI-PSRAM.
    - **A**: Regular 3.3 V operation for the SF32LB52B family. It does not support direct Li-ion battery supply; the chip supply range is 2.97–3.63 V. The standard configuration uses SF32LB52BU36 with integrated 1 MB QSPI-NOR Flash.
    - **B**: Regular 3.3 V operation for the SF32LB52E/G/J family. It does not support direct Li-ion battery supply; the chip supply range is 2.97–3.63 V. The standard configuration uses SF32LB52EUB6 with integrated 4 MB OPI-PSRAM.

The `-A` module does not mount an external NOR Flash device. It can connect an external NOR Flash or SDIO peripherals, including Wi-Fi, SD-NAND, and eMMC in 4-bit mode.

### Suffix: *AaaaBbbbCccc*

<div align="center"><em>Module Part Number Suffix Field Definitions</em></div>

<div align="center" markdown>

| Field | Storage-type code | Capacity, configuration, and suffix |
| :--- | :--- | :--- |
| `Aaaa`<br>Variable Flash | `N`: QSPI-NOR Flash<br>`A`: SPI-NAND Flash<br>`D`: SD-NAND Flash<br>`E`: eMMC | `N16`: 16 MB QSPI-NOR Flash<br>`A128`: 128 MB SPI-NAND Flash<br>`D128`: 128 MB SD-NAND Flash<br>`E4`: 4 GB eMMC |
| `Bbbb`<br>PSRAM | `R`: PSRAM | `R4`: 4 MB OPI-PSRAM<br>`R8`: 8 MB OPI-PSRAM<br>`R12`: 4 MB + 8 MB OPI-PSRAM<br>`R16`: 16 MB OPI/HPI-PSRAM<br>`R32`: 16 MB + 16 MB HPI-PSRAM<br>`R64`: 32 MB + 32 MB HPI-PSRAM |
| `Cccc`<br>Standard Flash | `N`: QSPI-NOR Flash | `N1`: 1 MB QSPI-NOR Flash<br>`N4`: 4 MB QSPI-NOR Flash |

</div>

The three suffix fields are concatenated without separators. `Aaaa` is the variable Flash option, `Bbbb` is the PSRAM option, and `Cccc` is the standard Flash option. The source guide defines the listed type-and-capacity combinations; do not assume that every type code can be combined with every capacity code. A field appears only when the documented module configuration uses it.

### Part Number Examples

#### Example 1: SF32LB52-MOD-1-N16R8

**SF32LB52 lithium-battery module configuration:**

* **Module Subtype:** `-1` supports direct Li-ion battery operation with a 3.2–4.7 V chip supply.
* **Variable Flash:** `N16` indicates 16 MB QSPI-NOR Flash.
* **PSRAM:** `R8` indicates 8 MB OPI-PSRAM.

#### Example 2: SF32LB58-MOD-A128R32N1

**SF32LB58 flagship module configuration:**

* **Module Subtype:** No `-y` subtype is used for published SF32LB58-MOD names.
* **Variable Flash:** `A128` indicates 128 MB SPI-NAND Flash.
* **PSRAM:** `R32` indicates 16 MB + 16 MB HPI-PSRAM.
* **Standard Flash:** `N1` indicates 1 MB QSPI-NOR Flash.

The naming pattern describes a configuration, not a guarantee that every code combination is a released SKU. The SiFli guide identifies SF32LB566VCB36 and SF32LB586VDD36 as standard MCU configurations for the SF32LB56-MOD and SF32LB58-MOD families respectively; additional module configurations may be customized. Confirm availability, fitted MCU, pinout, and electrical specifications in the applicable module documentation.

[SiFli Chip Model Guide](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) · [SiFli Module Model Guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)
