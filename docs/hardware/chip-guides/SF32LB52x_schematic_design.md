---
icon: lucide/circuit-board
hide:
    - navigation
description: "Schematic design guidelines for the SF32LB52x MCU: minimum system design, power system, and clock generation."
tags:
    - Hardware
    - Chip
---

# SF32LB52x Hardware Design Guide — Schematic Design Guidelines

!!! note "Part of the SF32LB52x Hardware Design Guide"
    Schematic Design Guidelines now spans three pages: this page (Sections 5.1-5.3: Minimum System, Power, and Clock), [RF & User Interfaces](SF32LB52x_schematic_rf_interfaces.md) (Sections 5.4-5.5), and [Storage & Manufacturing](SF32LB52x_schematic_storage_mfg.md) (Sections 5.6-5.7). Start from the [SF32LB52x Hardware Design Guide overview](SF32LB52x_hardware_design_guide.md) for device selection and the full design flow, or see the [Schematic Checklist](SF32LB52x_schematic_checklist.md) for the item-by-item review.

## 5. Schematic Design Guidelines

This chapter follows the schematic workflow across three pages. Complete the minimum-system review first, then review the power system and clock generation on this page; RF and user interfaces on the next page; and storage, manufacturing access, and PCB-dependent decisions on the final page. For each major block, confirm the design goal and variant scope before checking circuit requirements, pin assignment, common mistakes, and release checklist items.

<div align="center"><em>Table 5-1: Schematic Chapter Navigation</em></div>

<div align="center" markdown>

| Block | Main Decision | Release Evidence |
|:---|:---|:---|
| Minimum System Design | Exact variant, package, boot storage, bootstrap pins, debug/download access, and minimum bring-up path | Minimum-system review, bootstrap table, debug test points, boot and recovery plan |
| Power System | Variant power tree, charger path, BUCK, LDOs, boot-storage rail, operating modes, and wake sources | Power tree review, AVL parts, charger/OVP settings, low-power and wake-source plan |
| Clock Generation | 48 MHz and 32.768 kHz crystal selection, loading, and calibration assumptions | Crystal CL/ESR check, placement and routing screenshots, calibration plan |
| RF | RF matching, antenna path, and tuning access | RF impedance plan, matching-network placement screenshot, antenna tuning plan |
| User Interfaces | Display, audio, buttons, and vibration motor | Interface schematic review, timing/control pins, power sequencing, analog review |
| Storage and Connectivity | Boot medium, bootstrap pins, storage power switch, sensors, UART/I2C, and GPTIM | Bootstrap table, PA11/PA21 source discrepancy review, bus assignment, storage rail review |
| Manufacturing | DBG_UART/SWD, test points, production flashing, calibration access, and release checklists | Test-point drawing, production fixture plan, completed release evidence |

</div>

### 5.1. Minimum System Design

Minimum system design is the first schematic release gate for an SF32LB52x board. It covers the decisions that must be correct before product peripherals are added: exact device variant, package, power tree, boot medium, bootstrap resistors, storage power control, debug/download access, clock sources, and wake behavior. A board can often tolerate late changes to display or sensor wiring; it usually cannot tolerate a wrong storage strap, missing debug access, unstable rail, or incompatible power-state assumption.

Use the following sequence for the first schematic pass:

1. Select the exact device and package from Section 3.2 and Section 3.3.
2. Choose the correct power path: `SF32LB520/3/5/7` for rechargeable battery-powered products, or `52B/D/E/G/J` for externally regulated products.
3. Lock the power-system decisions in Section 5.2, including `VBUS`/`VBAT`/`VCC` or `PVDD`/`VDDIOA`/`VDD_SIP`, BUCK, internal LDO decoupling, RF/audio rails, and all low-power load switches.
4. Select the boot medium and populate `PA13`/`PA17` bootstrap pull options to match the boot table in Section 5.6.1.
5. Confirm the boot-storage power-switch pin against the source discrepancy before layout. The application notes and schematic guide specify `PA21`; the official checklist instead specifies `PA11` for external Flash on battery-powered variants.
6. Reserve `PA18`/`PA19`, ground, and a valid power reference for DBG_UART/SWD access before the enclosure and production fixture are frozen.
7. Select the 48 MHz and 32.768 kHz crystals from Section 5.3.1 and keep their placement constraints visible during schematic review.
8. Assign wake pins, power-key behavior, charger events, and storage/sensor shutdown states before firmware low-power policy is finalized.

At the end of this gate, the schematic should be able to power up, boot from the selected medium, expose a recovery path, run clock calibration, and enter the intended low-power state without relying on optional product peripherals.

### 5.2. Power System

Power-system design defines the rails, load switches, charger path, OVP, internal LDO usage, wake behavior, and low-power states that make the minimum system reliable. Complete this section before PCB placement, because later display, storage, RF, audio, and sensor decisions depend on these rail assumptions.

#### 5.2.1. Power Supply

**Quick Summary**

- Battery-powered devices use the `SF32LB520/3/5/7` path with `VBUS`, `VBAT`, `VCC`, charging, and OVP decisions.
- Regular-powered devices use the `52B/D/E/G/J` path with externally regulated `PVDD` and `VDDIOA`. Configure `VDD_SIP` for the exact chip model; it may use an external supply or the internal LDO. There is no internal charging path.
- BUCK inductor, internal LDO decoupling, RF/audio rails, and standby load switches must be fixed before PCB placement.

**Design Goal**

Create a stable, low-leakage power tree that supports the selected variant, avoids overloading internal LDO outputs, keeps RF and audio rails quiet, and allows unused loads and boot storage to be switched off in low-power modes.

##### 5.2.1.1. Processor Power Supply Requirements

=== "SF32LB520/3/5/7 (Battery-Powered)"

    <div align="center"><em>Table 5.2-1: Power Supply Requirements (Battery-Powered Variant)</em></div>

    <div align="center" markdown>

    | Pin | Min (V) | Typ (V) | Max (V) | Max Current (mA) | Description |
    |:---|:---|:---|:---|:---|:---|
    | VBUS | 4.5 | 5.0 | 5.5 | 500 | VBUS power input; see the source discrepancy note below |
    | VBAT | 3.2 | - | 4.7 | 500 | VBAT power output |
    | VCC | 3.2 | - | 4.7 | 500 | System power input (1) |
    | VSYS | - | 3.3 | - | 500 | VSYS power output (2) |
    | BUCK_LX | - | 1.25 | - | 50 | BUCK output pin, connects to inductor |
    | BUCK_FB | - | 1.25 | - | 50 | BUCK feedback / internal supply input, connects to the other end of the inductor plus an external capacitor |
    | VDD_VOUT1 | - | 1.1 | - | 50 | Internal LDO, external capacitor, does not power peripherals |
    | VDD_VOUT2 | - | 0.9 | - | 20 | Internal LDO, external capacitor, does not power peripherals |
    | VDD_RET | - | 0.9 | - | 1 | Internal LDO, external capacitor, does not power peripherals |
    | VDD_RTC | - | 1.1 | - | 1 | Internal LDO, external capacitor, does not power peripherals |
    | VDD18_VOUT | - | 1.8 | - | 30 | SIP supply (3), internal, does not power peripherals; can be externally supplied when the LDO is disabled |
    | VDD33_VOUT1 | - | 3.3 | - | 150 | 3.3 V LDO output 1 (4), no output by default; requires software configuration |
    | VDD33_VOUT2 | - | 3.3 | - | 150 | 3.3 V LDO output 2, no output by default; requires software configuration |
    | AVDD33_AUD | 2.97 | 3.3 | 3.63 | 50 | 3.3 V audio power input |
    | AVDD_BRF | 2.97 | 3.3 | 3.63 | 100 | RF power input |
    | MIC_BIAS | 1.4 | - | 2.8 | - | Microphone power output |

    </div>

    (1) VCC input, powered by a lithium battery: the default software low-battery threshold is 3.48 V. When powered from a constant-voltage supply, the supported range is 3.6–4.7 V, with 3.8 V recommended.
    (2) VSYS supplies power to AVDD_BRF.
    (3) VDD18_VOUT: SF32LB520U36 requires an external 3.3 V supply; SF32LB523/5/7Ux6 use the internal LDO and need no external supply. Configure the internal VDD18 LDO according to the chip model in software, and do not enable it when externally supplied.
    (4) VDD33_VOUT1: on SF32LB520U36 it only powers VDD18_VOUT, external Flash, and AVDD33_AUD; on SF32LB523/5/7Ux6 it only powers external Flash and AVDD33_AUD.

=== "52B/D/E/G/J (Regular-Powered)"

    <div align="center"><em>Table 5.2-2: Power Supply Requirements (Regular-Powered Variant)</em></div>

    <div align="center" markdown>

    | Pin | Min (V) | Typ (V) | Max (V) | Max Current (mA) | Description |
    |:---|:---|:---|:---|:---|:---|
    | PVDD | 2.97 | 3.3 | 3.63 | 150 | PVDD system power input, 10 uF capacitor |
    | BUCK_LX | - | 1.25 | - | 50 | BUCK output pin, connects to a 4.7 uH inductor |
    | BUCK_FB | - | 1.25 | - | 50 | BUCK feedback / internal supply input, connects to the other end of the inductor plus a 4.7 uF capacitor |
    | VDD_VOUT1 | - | 1.1 | - | 50 | Internal LDO, 4.7 uF capacitor, does not power peripherals |
    | VDD_VOUT2 | - | 0.9 | - | 20 | Internal LDO, 4.7 uF capacitor, does not power peripherals |
    | VDD_RET | - | 0.9 | - | 1 | Internal LDO, 0.47 uF capacitor, does not power peripherals |
    | VDD_RTC | - | 1.1 | - | 1 | Internal LDO, 1 uF capacitor, does not power peripherals |
    | VDDIOA | 1.71 | 1.8/3.3 | 3.63 | - | GPIO power input, 1 uF capacitor |
    | AVDD33 | 2.97 | 3.3 | 3.63 | 100 | 3.3 V analog power input, 4.7 uF capacitor |
    | AVDD33_AUD | 2.97 | 3.3 | 3.63 | 50 | 3.3 V audio power input, 2.2 uF capacitor |
    | VDD_SIP | 1.71 | 1.8/3.3 | 3.63 | 30 | Internal LDO or external supply (1), 1 uF capacitor |
    | AVDD_BRF | 2.97 | 3.3 | 3.63 | 100 | Analog power input, 4.7 uF capacitor |
    | MIC_BIAS | 1.4 | - | 2.8 | - | Microphone power output, 1 uF capacitor |

    </div>

    (1) VDD_SIP: SF32LB52BU36 requires an external 1.8 V or 3.3 V supply; SF32LB52BU56 requires an external 3.3 V supply; SF32LB52DUB6 requires an external 1.8 V supply; SF32LB52E/G/JUx6 are powered directly by the internal LDO and need no external supply.

    !!! important "Hibernate mode note"
        When the system enters Hibernate mode, VDD_SIP must be switched off, otherwise there is a leakage risk on the I/O of the co-packaged storage. Use the dedicated PA21 pin to control the VDD_SIP power switch.

##### 5.2.1.2. BUCK Inductor Selection

Both design groups use the same inductor specification.

!!! important "Key Power Inductor Parameters"
    L (inductance) = 4.7 uH ± 20%, DCR (DC resistance) ≤ 0.4 Ω, Isat (saturation current) ≥ 450 mA.

##### 5.2.1.3. Battery and Charging Control

=== "SF32LB520/3/5/7 (Battery-Powered)"

    There are two charging-circuit scenarios: an external charging management chip, or the on-chip integrated charging management module.

    **External Charging Management Chip**

    External charging ICs come in two common types: with or without power-path management (PPM). Without PPM, the battery directly supplies the VBAT and VCC pins. With PPM, the charger's VSYS supplies VCC, and the charger's VBAT connects to both the battery and the chip's VBAT pin. Both approaches measure battery voltage through the VBAT pin, which has an integrated GPADC channel with sampling accuracy within ±30 mV.

    ![Figure 5.2-1: External Charging Circuit without PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-1: External Charging Circuit without PPM</em></div>

    ![Figure 5.2-2: External Charging Circuit with PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-2: External Charging Circuit with PPM</em></div>

    With PPM, connect the charger's VSYS output to the chip's VCC pin and keep the charger's default VSYS output at or below 4.7 V, the maximum VCC input voltage.

    **On-Chip Integrated Charging Management Module**

    When using the integrated charging module, if the battery is low and the device is off, plugging in a charger requires the battery to charge up to the power-on threshold before the system can boot and display the charging screen.

    ![Figure 5.2-3: Integrated Charging Management Circuit](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-3: Integrated Charging Management Circuit</em></div>

    **OVP Chip Selection (When Using the Integrated Charging Module)**

    The VBUS input range is 4.5 V–5.5 V, so choose one of these OVP chip types:

    - Adjustable-OVLO OVP chip, e.g. AW32905FCR — set OVLO between 5.2 V and 5.5 V (VOVLO_TH tolerance ≤3%, resistor tolerance ≤1%)
    - Regulated-output OVP chip, e.g. SGM4064YDE8G or LP5305AQVF — regulator output must be between 4.5 V and 5.4 V

    !!! important "VBUS values differ across source documents"
        The OpenSiFli battery-variant application guide is internally inconsistent: its OVP-selection paragraph gives a chip VBUS range of 4.5–5.5 V, while its supply table and integrated-charger notes give 4.6–5.5 V and require at least 4.6 V at the VBUS pin at maximum charging current. Electrical Specification-A3 lists a general range of 4.5–5.5 V, and the reference charging schematic is labeled 4.3–5.5 V. For an integrated-charger design, maintain at least 4.6 V at the pin under maximum load until SiFli clarifies the applicable operating minimum; do not treat the schematic's 4.3 V label as an approved lower limit.

        The same application guide sets `VIN_OVLO` on an adjustable-OVLO OVP device to 5.2–5.5 V, with `VOVLO_TH` tolerance ≤3% and R1/R2 tolerance ≤1%. For an OVP device with a regulator output, it specifies an LDO output of 4.5–5.4 V. These are topology-specific OVP settings, not interchangeable chip VBUS operating ranges; account for component tolerances and confirm the approved design with SiFli.

    ![Figure 5.2-4: OVLO Set-Point Formula](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-4: OVLO Set-Point Formula</em></div>

    ![Figure 5.2-5: Adjustable-OVLO OVP Application Circuit](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-5: Adjustable-OVLO OVP Application Circuit</em></div>

    ![Figure 5.2-6: Regulated-Output OVP Application Circuit](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-6: Regulated-Output OVP Application Circuit</em></div>

    !!! important "Integrated Charging Module Notes"
        - VBUS input range: 4.6 V–5.5 V
        - VCC input range: 3.2 V–4.7 V
        - Default trickle current: 56 mA, trickle-to-constant-current transition voltage: 3.0 V
        - Default constant charge current: 65 mA, adjustable 5–560 mA
        - Default full-charge voltage: 4.2 V, adjustable up to 4.45 V
        - Recharge voltage: full-charge voltage - 0.15 V
        - The charger's VBUS must supply at least 350 mA; VBUS pin voltage must not drop below 4.6 V at maximum charge current
        - For wireless charging, ensure the wireless charger's supply capability exceeds the constant charge current

    !!! important "Integrated LDO Notes"
        - Total capacitance on the VDD33_VOUT1 and VDD33_VOUT2 output paths must not exceed 9.6 uF
        - AVDD33_AUD must be powered from VDD33_VOUT1, not from VSYS
        - The LCD must not be powered from the internal LDO — use an external LDO

=== "52B/D/E/G/J (Regular-Powered)"

    !!! info "Not Applicable"
        The regular-powered variant is powered directly from a regulated external supply and **has no charging management circuitry**. This section does not apply. If your product needs battery power and charging, use the SF32LB520/3/5/7 series instead.

##### 5.2.1.4. Reducing Standby Power

=== "SF32LB520/3/5/7 (Battery-Powered)"

    Recommended power structure: **VDD33_VOUT2** supplies the vibration motor, **VDD33_VOUT1** supplies external Flash and sensors, and the LCD uses an external LDO.

    ![Figure 5.2-7: SF32LB52x System Power Structure Diagram](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-7: SF32LB52x System Power Structure Diagram</em></div>

    Control the default hardware state of power-switch GPIO pins carefully, and add megohm-range pull-up/pull-down resistors so load switches default to off. For LDO and load-switch selection, choose devices with low quiescent current (Iq) and low shutdown current (Istb), and pay particular attention to Iq on always-on power devices.

=== "52B/D/E/G/J (Regular-Powered)"

    Use load switches for dynamic power management of each functional block; for always-on modules or paths, select devices with low quiescent current.

    Control the default hardware state of power-switch GPIO pins carefully, and add megohm-range pull-up/pull-down resistors so load switches default to off. For LDO and load-switch selection, choose devices with low quiescent current (Iq) and low shutdown current (Istb), and pay particular attention to Iq on always-on power devices.

##### 5.2.1.5. Power Design Checklist

- [ ] Confirmed which power variant (battery-powered / regular-powered) matches the exact chip model
- [ ] BUCK inductor meets 4.7 uH ±20%, DCR ≤0.4 Ω, Isat ≥450 mA
- [ ] All internal LDO decoupling capacitors are placed per requirements
- [ ] LCD power is isolated and not fed directly from the internal LDO
- [ ] Audio and RF power rails are properly filtered
- [ ] Battery-powered variant: charging path and OVP device voltage ranges verified; regular-powered variant: VDD_SIP/VDDIOA supply configured correctly for the chip model

**Common Mistakes - Power**

- Powering the LCD directly from an internal LDO instead of an external LDO.
- Mixing battery-powered and regular-powered supply assumptions in the same schematic.
- Leaving `VDD_SIP` powered during Hibernate on variants where storage leakage is a risk.
- Choosing a charger or OVP device without verifying the worst-case VBUS current and voltage range.

**Bring-Up Checks - Power**

- Measure `VCC`/`PVDD`, BUCK output, RF/audio rails, and storage supply before firmware enables peripherals.
- Confirm charger attach, trickle charge, constant-current charge, and recharge behavior on battery-powered designs.
- Measure standby and Hibernate current with display, sensors, storage, and motor load switches off.

#### 5.2.2. Operating Modes and Wake Sources

**Quick Summary**

- Active and Sleep retain fast interrupt response; DeepSleep and Standby trade wake time for lower current.
- Hibernate is the lowest-power state, but SRAM is not retained and some external supplies must be shut down.
- Wake-capable GPIO selection affects buttons, touch interrupt, charger events, and sensor wake behavior.

**Design Goal**

Select wake sources and external power-switch defaults so the product can enter the intended low-power state without leakage paths or missing wake events.

!!! note "Shared Design"
    Operating modes and wake-source behavior apply across the SF32LB52x family unless a product-specific power tree intentionally disables an external wake source.

<div align="center"><em>Table 5.2-3: CPU Mode Table</em></div>

<div align="center" markdown>

| Mode | CPU | Peripherals | SRAM | IO | LPTIM | Wake Source | Wake Time |
|:---|:---|:---|:---|:---|:---|:---|:---|
| Active | Run | Run | Accessible | Can toggle | Run | - | - |
| Sleep | Stop | Run | Accessible | Can toggle | Run | Any interrupt | <0.5 us |
| DeepSleep | Stop | Stop | Inaccessible, fully retained | Level held | Run | RTC, wake-up IO, GPIO, LPTIM, Bluetooth | 250 us |
| Standby | Reset | Reset | Inaccessible, fully retained | Level held | Run | RTC, wake-up IO, LPTIM, Bluetooth | 1 ms |
| Hibernate | Reset | Reset | Inaccessible, not retained | High-Z | Reset | RTC, wake-up IO | >2 ms |

</div>

The whole family supports 15 wake-capable interrupt sources in Standby and Hibernate modes:

<div align="center"><em>Table 5.2-4: Interrupt Wake-Up Source Table</em></div>

<div align="center" markdown>

| Wake Source | Pin | Wake Source | Pin |
|:---|:---|:---|:---|
| LWKUP_PIN0 | PA24 | LWKUP_PIN12 | PA36 |
| LWKUP_PIN1 | PA25 | LWKUP_PIN13 | PA37 |
| LWKUP_PIN2 | PA26 | LWKUP_PIN14 | PA38 |
| LWKUP_PIN3 | PA27 | LWKUP_PIN15 | PA39 |
| LWKUP_PIN10 | PA34 | LWKUP_PIN16 | PA40 |
| LWKUP_PIN11 | PA35 | LWKUP_PIN17 | PA41 |
| — | — | LWKUP_PIN18 | PA42 |
| — | — | LWKUP_PIN19 | PA43 |
| — | — | LWKUP_PIN20 | PA44 |

</div>

**Operating-Mode Checklist**

- [ ] Required wake pins are assigned before pin-mux is frozen.
- [ ] Pull states on wake pins are compatible with Standby and Hibernate.
- [ ] External storage and sensor supplies do not leak through I/O pins in Hibernate.
- [ ] Firmware and hardware teams agree which state is used for shipping, shelf, and normal standby modes.

### 5.3. Clock Generation

#### 5.3.1. Crystal Selection

**Quick Summary**

- Use a 48 MHz main crystal and a 32.768 kHz RTC crystal.
- Favor low CL and low ESR parts from the AVL to reduce startup and static current.
- Keep crystal traces short, shielded, and away from heat, RF, charger, PMU, and DC/DC noise.

**Design Goal**

Provide stable, low-jitter clock sources while minimizing oscillator current, frequency drift, RF interference, and bring-up risk.

The chip requires two external clock sources: a 48 MHz main crystal and a 32.768 kHz RTC crystal. Requirements are identical for both variants.

!!! important "Crystal Specification Requirements"
    <div align="center"><em>Table 5.3-1: Crystal Specification Requirements</em></div>

    <div align="center" markdown>

    | Crystal | Requirement | Notes |
    |:---|:---|:---|
    | 48 MHz | 7 pF ≤ CL ≤ 12 pF (8.8 pF recommended), ΔF/F0 ≤ ±10 ppm, ESR ≤ 30 Ω (22 Ω recommended) | Lower CL and ESR reduce power consumption; matching capacitors are typically unnecessary when CL < 12 pF |
    | 32.768 kHz | CL ≤ 12.5 pF (7 pF recommended), ΔF/F0 ≤ ±20 ppm, ESR ≤ 80 kΩ (38 kΩ recommended) | Lower CL and ESR reduce power consumption; matching capacitors are typically unnecessary when CL < 12.5 pF |

    </div>

Recommended crystals:

<div align="center"><em>Table 5.3-2: Recommended Crystal List</em></div>

<div align="center" markdown>

| Part Number | Manufacturer | Parameters |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0=48 MHz, ΔF/F0=-6~8 ppm, CL=8.8 pF, ESR≤22 Ω, TOPR=-30~85°C, 2016 metric package |
| SX20Y048000B31T-8.8 | TKD | F0=48 MHz, ΔF/F0=-10~10 ppm, CL=8.8 pF, ESR≤40 Ω, TOPR=-20~75°C, 2016 metric package |
| ETST00327000LE | Hosonic | F0=32.768 kHz, ΔF/F0=-20~20 ppm, CL=7 pF, ESR≤70 kΩ, TOPR=-40~85°C, 3215 metric package |
| SF32K32768D71T01 | TKD | F0=32.768 kHz, ΔF/F0=-20~20 ppm, CL=7 pF, ESR≤70 kΩ, TOPR=-40~85°C, 3215 metric package |

</div>

!!! note "Additional Notes"
    The TKD SX20Y048000B31T-8.8 has a somewhat higher ESR, which slightly increases static power consumption. SiFli's schematic application note also recommends removing at least the GND copper on the second layer beneath the 48 MHz crystal to reduce parasitic load capacitance. The PCB layout guide, however, prohibits plane voids or copper cutouts beneath the crystal on adjacent layers. These recommendations conflict; see [Clock Interface Routing](SF32LB52x_pcb_layout.md#65-clock-interface-routing). Confirm the intended layer treatment with SiFli before releasing the layout.

!!! important "Crystal ESR exception in the source"
    The source lists TKD SX20Y048000B31T-8.8 with ESR ≤ 40 Ω, although its general 48 MHz requirement is ESR ≤ 30 Ω. Treat this as a part-specific qualification question, not permission to use any 40 Ω crystal. Confirm the exact part's current AVL approval and validate startup, frequency calibration, and oscillator current before release.

!!! important "32.768 kHz crystal recommendation differs within the source"
    The source's 32.768 kHz parameter table recommends CL = 7 pF and ESR = 38 kΩ, while its accompanying prose recommends CL ≤ 9 pF and ESR ≤ 40 kΩ. Both statements are retained in the source material; confirm the intended target and the selected crystal's AVL qualification with SiFli before release.

For the complete, continuously maintained qualification data, refer to the [SiFli Approved Vendor List][SiFli Approved Vendor List (AVL)].

**Common Mistakes - Clock**

- Selecting a crystal only by frequency and package, without checking CL, ESR, tolerance, and temperature range.
- Placing the crystal near PA, charger, PMU, RF matching, or other heat/noise sources.
- Leaving copper or high-speed routing under the crystal keep-out region.
- Making 32 kHz traces long and parallel without spacing or ground shielding.

**Clock Checklist**

- [ ] 48 MHz and 32.768 kHz crystals match AVL/datasheet requirements.
- [ ] Crystal load capacitance and ESR are verified against the oscillator limits.
- [ ] Keep-out, trace length, trace width, spacing, and ground shielding are checked in PCB review.
- [ ] Bring-up plan includes measuring 48 MHz, 32 kHz, and Bluetooth frequency calibration behavior.

---

Continue to [RF & User Interfaces](SF32LB52x_schematic_rf_interfaces.md).

[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
