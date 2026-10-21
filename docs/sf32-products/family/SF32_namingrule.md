---
icon: lucide/tags
description: "How to decode an SF32LB5xyZxYx6 part number: product tier, PSRAM variant, package type, integrated Flash/PSRAM capacity, and temperature grade, with worked examples."
tags:
  - Hardware
  - Chip
---

# SF32 Naming Convention { #sf32-naming-convention }

## Chip Naming { #chip-naming }

### Part Number: ***SF32LB5xyZxYx6*** { #part-number-sf32lb5xyzxyx6 }

!!! note "Syntax Note"
    * Lowercase ***x*** denotes a numeric digit.
    * Uppercase ***Y*** or ***Z*** denotes an alphabetic character.

### Prefix: *SF32LB5xy* { #prefix-sf32lb5xy }

- **SF32** — SiFli 32-bit MCU Series
- **LB** — Product Line Identifier
    - **LB**: Low-power Bluetooth MCU series
- **5** — Processor Family
    - **5**: Devices based on a 32-bit Arm Cortex-M33 STAR-MC1 processor, or a RISC-V processor with comparable performance
- **x** — Product Tier
    - **8 / 7**: Two application processors and one low-power processor; product positioning varies by family.
    - **6 / 5**: Mid-range (***single*** application processor, ***single*** low-power processor)
    - **2**: Cost-optimized (***single*** application processor, ***dedicated*** low-power Bluetooth controller)
- **y** — Device Variant
    - Its value generally reflects the in-package PSRAM capacity; the exact mapping varies by product sub-family.

### Suffix: *ZxYx6* { #suffix-zxyx6 }
- **Z** — Package Type
    - **U**: QFN68
    - **V**: BGA
    - **Y**: QFN80
- **xYx** — Integrated Memory Configuration (QSPI-NOR Flash & PSRAM)
  *(Note: Exact encoding mapping depends on the specific package and device family)*

Treat `ZxYx6` as a family-level pattern, not a fixed-width parsing template. The number and order of memory codes vary by device family and package: a numeric Flash code may be absent, and a PSRAM letter may repeat when multiple devices are integrated. Decode each exact order code against its family-specific variant table.
<div align="center"><em>Part Number Suffix Field Definitions</em></div>

<div align="center" markdown>

| Field | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| **x** | Numeric | **1** to **6** | Generic QSPI-NOR Flash capacity mapping:<br>• **1**: 2 Mb<br>• **2**: 4 Mb<br>• **3**: 8 Mb<br>• **4**: 16 Mb<br>• **5**: 32 Mb<br>• **6**: 64 Mb<br>SF32LB57x also uses codes **7** and **8**; see its family-specific map below. |
| **Y** | Alphabetic | **A** to **E** | Integrated PSRAM capacity & interface:<br>• **A**: 16 Mb QPI-PSRAM<br>• **B**: 32 Mb OPI-PSRAM<br>• **C**: 64 Mb OPI-PSRAM<br>• **D**: 128 Mb OPI/HPI-PSRAM<br>• **E**: 256 Mb HPI-PSRAM |

</div>

- **6** — Operating Temperature Grade
    - **5**: −20°C to +70°C (Commercial)
    - **6**: −40°C to +85°C (Industrial)

### SF32LB57x-Specific Memory Codes { #sf32lb57x-memory-codes }

The SF32LB57x part-numbering figure in the [hardware design guide](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md#33-packages) shows three memory-position codes after the package code, in MPI1, MPI2, and MPI3 order; the temperature-grade code follows them. The family-specific codes for each MPI position are:

<div align="center"><em>Table: SF32LB57x Memory Codes by MPI Position</em></div>

<div align="center" markdown>

| Code | SF32LB57x meaning at the corresponding MPI position |
|:-----|:----------------------------------------------------|
| `N` | No co-packaged memory |
| `B` | 32 Mb PSRAM |
| `C` | 64 Mb PSRAM |
| `D` | 128 Mb PSRAM |
| `E` | 256 Mb PSRAM |
| `2` | 4 Mb NOR Flash |
| `3` | 8 Mb NOR Flash |
| `4` | 16 Mb NOR Flash |
| `5` | 32 Mb NOR Flash |
| `6` | 64 Mb NOR Flash |
| `7` | 128 Mb NOR Flash |
| `8` | 256 Mb NOR Flash |

</div>

This map is specific to SF32LB57x. Confirm each complete code against the exact variant table; the map does not imply that every combination is an orderable SKU.

### Part Number Examples { #part-number-examples }

#### Example 1: SF32LB527UD6 { #example-1-sf32lb527ud6 }
**SF32LB52 Series** cost-optimized MCU configuration:

* **Processor Configuration:** Single application processor and a dedicated low-power Bluetooth controller processor (Arm Cortex-M33 STAR-MC1 based).
* **Package Type:** QFN68 package (**U**).
* **Memory Configuration:** Integrated 128 Mb OPI-PSRAM (**D**).
* **Operating Temperature:** −40°C to +85°C (**6**, Industrial Grade).

#### Example 2: SF32LB587VEE56 { #example-2-sf32lb587vee56 }
**SF32LB58 Series** flagship MCU configuration:

* **Processor Configuration:** Dual application processors and one low-power processor (Arm Cortex-M33 STAR-MC1 based).
* **Package Type:** BGA256 package (**V**).
* **Memory Configuration:** Integrated dual (2x) 256 Mb HPI-PSRAM (**E**) and one 32 Mb QSPI-NOR Flash (**5**).
* **Operating Temperature:** −40°C to +85°C (**6**, Industrial Grade).

#### Example 3: SF32LB57GVD776 { #example-3-sf32lb57gvd776 }

The SF32LB57x variant table lists this as a BGA112 part. Its three memory-position codes are `D/7/7`: MPI1 has 128 Mb PSRAM, MPI2 has 128 Mb NOR Flash, and MPI3 has 128 Mb NOR Flash. The final `6` is the industrial temperature grade. The second `7` in `776` therefore identifies the MPI3 NOR Flash; see the [SF32 family overview](SF32_family.md) for the BGA112 GPIO implication.

#### Example 4: SF32LB57ZVN7N6 { #example-4-sf32lb57zvn7n6 }

The SF32LB57x variant table lists this as a BGA112 part. Its memory-position codes are `N/7/N`: no co-packaged memory on MPI1, 128 Mb NOR Flash on MPI2, and no co-packaged memory on MPI3. The final `6` is the industrial temperature grade. The family overview explains why its `58 + 6` entry does not mean 64 unrestricted GPIOs.

### 55x Legacy Suffix Exceptions { #legacy-55x-suffix-exceptions }

The SF32LB55x family was defined before the current naming pattern, so some order codes retain legacy suffix layouts. These three order codes do not decode fully from the `SF32LB5xyZxYx6` pattern above: `SF32LB551U4O5`, `SF32LB555V4O6`, and `SF32LB555V436`. Confirm their package and memory configuration in the exact 55x variant table and datasheet rather than inferring fields from the generic pattern. `SF32LB557VD3A6` follows the current naming convention and is not a legacy exception.

## Module Naming { #module-naming }

### Part Number: ***SF32LB5x-MOD-y-AaaaBbbbCccc*** { #part-number-sf32lb5x-mod-y-aaaabbbbcccc }

!!! note "Syntax Note"
    * In the generic suffix, `A`, `B`, and `C` identify the three storage-field positions; they are not literal characters in every module name.
    * The first character within each populated field identifies the storage type. The remaining digits identify its capacity or configuration.
    * The `-y` subtype field is currently used only by the SF32LB52 module family. Published SF32LB56-MOD and SF32LB58-MOD names are not using it.

### Prefix: *SF32LB5x-MOD-y* { #prefix-sf32lb5x-mod-y }

- **SF32LB5x** — Module MCU family
    - **SF32**, **LB**, and **5** follow the same series, product-line, and processor-family meanings as the chip naming convention above.
    - **x** identifies the product tier: **8 / 7** has two application processors and one low-power processor, with positioning varying by family; **6 / 5** is mid-range; **2** is cost-optimized.
- **MOD** — SiFli module product.
- **y** — Module subtype, when the family defines one
    - **1**: Direct Li-ion battery operation for SF32LB520/3/5/7 devices. The chip supply range is 3.2–4.7 V; the standard configuration uses SF32LB525UC6 with 8 MB OPI-PSRAM.
    - **A**: Regular 3.3 V operation for the SF32LB52B family. It does not support direct Li-ion battery supply; the chip supply range is 2.97–3.63 V. The standard configuration uses SF32LB52BU36 with integrated 1 MB QSPI-NOR Flash.
    - **B**: Regular 3.3 V operation for the 52E/52G/52J family. It does not support direct Li-ion battery supply; the chip supply range is 2.97–3.63 V. The standard configuration uses SF32LB52EUB6 with integrated 4 MB OPI-PSRAM.

The `-A` module has no external NOR Flash fitted. It can connect to an external NOR Flash or SDIO peripherals, including Wi-Fi, SD-NAND, and eMMC in 4-bit mode.

### Suffix: *AaaaBbbbCccc* { #suffix-aaaabbbbcccc }

<div align="center"><em>Module Part Number Suffix Field Definitions</em></div>

<div align="center" markdown>

| Field | Storage-type code | Capacity, configuration, and suffix |
| :--- | :--- | :--- |
| `Aaaa`<br>Variable Flash | `N`: QSPI-NOR Flash<br>`A`: NAND Flash (interface depends on module family)<br>`D`: SD-NAND Flash<br>`E`: eMMC | `N16`: 16 MB QSPI-NOR Flash<br>`A128`: 128 MB SPI-NAND on SF32LB52-MOD-1; 128 MB QSPI-NAND on SF32LB56-MOD and SF32LB58-MOD<br>`D128`: 128 MB SD-NAND on SF32LB56-MOD<br>`E4`: 4 GB eMMC on SF32LB58-MOD |
| `Bbbb`<br>PSRAM | `R`: PSRAM | `R4`: 4 MB OPI-PSRAM<br>`R8`: 8 MB OPI-PSRAM<br>`R12`: 4 MB + 8 MB OPI-PSRAM<br>`R16`: 16 MB OPI/HPI-PSRAM<br>`R32`: 16 MB + 16 MB HPI-PSRAM<br>`R64`: 32 MB + 32 MB HPI-PSRAM |
| `Cccc`<br>Standard Flash | `N`: QSPI-NOR Flash | `N1`: 1 MB QSPI-NOR Flash<br>`N4`: 4 MB QSPI-NOR Flash |

</div>

The three suffix fields are concatenated without separators. `Aaaa` is the variable Flash option, `Bbbb` is the PSRAM option, and `Cccc` is the standard Flash option. The source guide defines the listed type-and-capacity combinations; do not assume that every type code can be combined with every capacity code. A field appears only when the documented module configuration uses it.

### Part Number Examples { #part-number-examples_1 }

#### Example 1: SF32LB52-MOD-1-N16R8 { #example-1-sf32lb52-mod-1-n16r8 }

**SF32LB52 lithium-battery module configuration:**

* **Module Subtype:** `-1` supports direct Li-ion battery operation with a 3.2–4.7 V chip supply.
* **Variable Flash:** `N16` indicates 16 MB QSPI-NOR Flash.
* **PSRAM:** `R8` indicates 8 MB OPI-PSRAM.

#### Example 2: SF32LB58-MOD-A128R32N1 { #example-2-sf32lb58-mod-a128r32n1 }

**SF32LB58 flagship module configuration:**

* **Module Subtype:** No `-y` subtype is used for published SF32LB58-MOD names.
* **Variable Flash:** `A128` indicates 128 MB QSPI-NAND Flash for this SF32LB58-MOD configuration.
* **PSRAM:** `R32` indicates 16 MB + 16 MB HPI-PSRAM.
* **Standard Flash:** `N1` indicates 1 MB QSPI-NOR Flash.

The naming pattern describes a configuration, not a guarantee that every code combination is a released SKU. The SiFli guide identifies SF32LB566VCB36 and SF32LB586VDD36 as standard MCU configurations for the SF32LB56-MOD and SF32LB58-MOD families respectively; additional module configurations may be customized. Confirm availability, fitted MCU, pinout, and electrical specifications in the applicable module documentation.

[SiFli Chip Model Guide](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) · [SiFli Module Model Guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)
