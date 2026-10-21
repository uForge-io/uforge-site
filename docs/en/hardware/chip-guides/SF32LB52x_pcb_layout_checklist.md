---
icon: lucide/list-checks
hide:
    - navigation
description: "Item-by-item PCB layout review checklist for the SF32LB52x MCU, covering package, routing, power, and grounding checks."
tags:
    - Hardware
    - Chip
    - Checklist
---

# SF32LB52x Hardware Design Guide — PCB Layout Checklist { #sf32lb52x-hardware-design-guide-pcb-layout-checklist }

!!! note "Part of the SF32LB52x Hardware Design Guide"
    This page covers Section 6.15, the item-by-item PCB layout checklist. Return to [PCB Layout Guidelines](SF32LB52x_pcb_layout.md).

## 6.15. PCB Layout Checklist { #615-pcb-layout-checklist }

The source PCB checklist has no Applies To column. Apply each check only where the selected part and circuit include the named pin, rail or function; mark absent functions as not applicable. Preserve the source's Required/Optional categories, but do not interpret Optional as permission to omit a component required by the device specification.

!!! note "Crystal copper treatment in the source"
    The checklist workbook's clock item 3 does not identify which layers require a copper keep-out. The battery-variant application note itself conflicts: its clock section says to remove L2 ground beneath the crystal, but its PCB-routing section prohibits plane voids or copper cutouts on the top and adjacent layers and depicts continuous L2 ground; the separate PCB layout guide repeats the no-void instruction. Confirm the stack-up-specific treatment with SiFli before release; do not infer it from the checklist wording.

!!! note "Trace-width checks"
    The workbook specifies VCC ≥12 mil, BUCK traces ≥10 mil and RF ≥10 mil. Section 6 includes stricter VCC and BUCK guidance and a recommendation of RF >10 mil. Meet both applicable sets of constraints, including the 50 Ω RF requirement; the checklist minimum does not override the detailed layout guidance.

### 6.15.1. Package { #6151-package }

<div align="center"><em>Table 6.15.1-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PCB footprint matches the package specification | Required |

</div>

### 6.15.2. Power Supply Routing { #6152-power-supply-routing }

<div align="center"><em>Table 6.15.2-1: Power Supply Routing Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | <span class="flag-red">VBUS supply trace width ≥16 mil</span> | Required |
| 2 | <span class="flag-red">VBAT supply trace width ≥16 mil</span> | Required |
| 3 | <span class="flag-red">VCC supply trace width ≥12 mil</span> | Required |
| 4 | LDO2_OUT supply trace width ≥10 mil | Required |
| 5 | LDO3_OUT supply trace width ≥8 mil | Required |
| 6 | <span class="flag-red">PMU_BUCK_VSW and PMU_BUCK_VOUT trace widths ≥10 mil</span> | Required |
| 7 | AVDD_BRF supply trace width ≥8 mil | Required |
| 8 | <span class="flag-red">AVDD33_AUD supply trace width ≥8 mil</span> | Required |

</div>

### 6.15.3. Power Supply Capacitor and Inductor Placement { #6153-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Table 6.15.3-1: Power Supply Capacitor and Inductor Placement Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | VBUS capacitor placed close to the pin | Required |
| 2 | VBAT capacitor placed close to the pin | <span class="flag-red">Optional</span> |
| 3 | VCC capacitor placed close to the pin | Required |
| 4 | LDO2_OUT capacitor placed close to the pin | <span class="flag-red">Optional</span> |
| 5 | LDO3_OUT capacitor placed close to the pin | <span class="flag-red">Optional</span> |
| 6 | VSYS capacitor placed close to the pin | Required |
| 7 | BUCK inductor placed close to the chip | <span class="flag-red">Optional</span> |
| 8 | BUCK decoupling capacitor placed as close as possible to the chip pin | Required |
| 9 | VDD_HPSYS capacitor placed close to the pin | Required |
| 10 | VDD_LPSYS capacitor placed close to the pin | Required |
| 11 | VDD_RET capacitor placed close to the pin | Required |
| 12 | VDD_RTC capacitor placed close to the pin | Required |
| 13 | AVDD_BRF capacitor placed close to the pin | Required |
| 14 | AVDD<span class="flag-red">33</span>_AUD capacitor placed close to the pin | Required |

</div>

### 6.15.4. Clock { #6154-clock }

<div align="center"><em>Table 6.15.4-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Crystal placed close to the chip | Required |
| 2 | GND shielding applied around the crystal | Required |
| 3 | Crystal-area copper treatment is confirmed with SiFli for the selected stack-up; see the source-discrepancy note above | Required |
| 4 | Edge-to-edge clearance from each crystal trace to adjacent GND copper is greater than 1.5x the trace width | Required |
| 5 | Spacing between the parallel 32.768 kHz XI/XO traces is ≥0.15 mm | Required |

</div>

### 6.15.5. Buttons { #6155-buttons }

<div align="center"><em>Table 6.15.5-1: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Button's ESD protection device placed close to the button | Required |

</div>

### 6.15.6. RF { #6156-rf }

<div align="center"><em>Table 6.15.6-1: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | RF trace meets the single-ended 50 Ω characteristic-impedance requirement | Required |
| 2 | RF trace width ≥10 mil | Required |
| 3 | At least 60 mil of ground on each side of the RF trace, with sufficient stitching vias to the main ground | Required |
| 4 | Reserved Pi-type antenna matching network placed close to the chip side | Required |
| 5 | Continuous GND plane beneath the RF signal | Required |
| 6 | No high-speed digital signal traces cross beneath the RF signal | Required |
| 7 | No high-di/dt power traces cross beneath the RF signal | Required |

</div>

### 6.15.7. Audio { #6157-audio }

<div align="center"><em>Table 6.15.7-1: Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | ADCP has three-dimensional ground shielding | Required |
| 2 | DACP/DACN use differential routing with three-dimensional ground shielding | Required |
| 3 | DACP/DACN traces are short enough that parasitic capacitance stays below 10 pF | Required |
| 4 | AVDD_BRF/AVDD<span class="flag-red">33</span>_AUD power routing is ground-guarded and kept away from high-current, strongly interfering signals | Required |

</div>

### 6.15.8. ADC { #6158-adc }

<div align="center"><em>Table 6.15.8-1: ADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | No high-speed signal runs parallel to the GPADC signal without ground guarding | Required |

</div>

### 6.15.9. Test Points { #6159-test-points }

<div align="center"><em>Table 6.15.9-1: Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Test-point locations are suitable for probing or fixture soldering | Required |
| 2 | Program-download test points (VBAT, GND, PA18/DBG_UART_RXD, PA19/DBG_UART_TXD, LDO2_OUT, PA0, PA1, PA34, etc.) meet the size and location requirements of the test fixture | Required |

</div>

### 6.15.10. Ground { #61510-ground }

<div align="center"><em>Table 6.15.10-1: Ground Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Layers adjacent to the main chip are a complete main-ground plane, with sufficient grounding vias | Required |
| 2 | Exposed pad (EPAD) is connected to the main ground through vias | Required |
| 3 | Area under the chip has enough grounding vias connected to the main ground plane | Required |
| 4 | <span class="flag-red">A ring of grounding vias runs around the board edge</span> | Required |

</div>
