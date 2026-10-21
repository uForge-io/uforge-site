---
icon: lucide/list-checks
hide:
    - navigation
description: "Item-by-item PCB layout review checklist for the SF32LB57x MCU: package, power, clock, RF, display, audio, and GPADC routing checks."
tags:
    - Hardware
    - Chip
    - Checklist
---

# SF32LB57x Hardware Design Guide — PCB Layout Checklist { #sf32lb57x-hardware-design-guide-pcb-layout-checklist }

!!! note "Part of the SF32LB57x Hardware Design Guide"
    This page covers Section 6.10 and compiles PCB layout checks from SiFli's official design self-check tables. Return to [PCB Layout Guidelines](SF32LB57x_pcb_layout.md).

## 6.10. PCB Layout Checklist { #610-pcb-layout-checklist }

Most layout rules below apply to all SF32LB57x variants; the Applies To column narrows a check point to battery-powered or 3.3 V supply variants where the trace only exists on that power family.

### 6.10.1. Package { #6101-package }

<div align="center"><em>Table 6.10.1-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | PCB footprint is built to the datasheet package spec | All variants | Required |

</div>

### 6.10.2. Power Supply Routing { #6102-power-supply-routing }

<div align="center"><em>Table 6.10.2-1: Power Supply Routing Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | `VBUS` supply trace ≥16 mil | Battery-powered variants | Required |
| 2 | `VBAT` supply trace ≥16 mil | Battery-powered variants | Required |
| 3 | `VCC` supply trace ≥12 mil | Battery-powered variants | Required |
| 4 | `VDD33_VOUT1` supply trace ≥10 mil | Battery-powered variants | Required |
| 5 | `VDD33_VOUT2` supply trace ≥10 mil (source item 46 title repeats `VDD33_VOUT1`) | Battery-powered variants | Required |
| 6 | `PVDD` supply trace ≥12 mil (source item 47 check detail says `VCC`) | 3.3 V supply variants | Required |
| 7 | `VDDIOA` supply trace ≥10 mil | 3.3 V supply variants | Required |
| 8 | `BUCK_LX`/`BUCK_FB` traces ≥10 mil and as short as possible | All variants | Required |
| 9 | `AVDD_BRF` supply trace ≥8 mil | All variants | Required |
| 10 | `AVDD33_AUD` supply trace ≥8 mil | All variants | Required |

</div>

!!! warning "Unresolved conflicts in the source power-routing guidance"
    - **Checklist labels:** Original self-check Table 4-2-1-1 item 44 (battery-powered variants) specifies `VCC` at at least 12 mil. Items 45 and 46 each specify at least 10 mil for `VDD33_VOUT1` and `VDD33_VOUT2`, respectively, but item 46's title repeats `VDD33_VOUT1` while its check detail names `VDD33_VOUT2`. Item 47 (3.3 V-powered variants) is titled `PVDD`, while its check detail specifies `VCC` at at least 12 mil. This page transcribes the listed values and details without resolving either source-label mismatch.
    - **Trace width:** Original PCB guide Section 3.2.1 specifies at least 0.4 mm (about 15.7 mil) for both `VCC` and `PVDD`. This differs from the 12 mil `VCC` requirements in self-check Table 4-2-1-1 items 44 (battery-powered variants) and 47 (3.3 V-powered variants); item 47 also conflicts between its `PVDD` title and `VCC` check detail. The source does not explain how these references should be reconciled across supply variants. Do not infer a corrected value or apply either entry as controlling without confirmation.
    - **Output names:** Original PCB guide Section 3.2.1 uses `VDD_VOUT1` / `VDD_VOUT2`; self-check Table 4-2-1-1, items 45/46, uses `VDD33_VOUT1` / `VDD33_VOUT2`. The source does not say whether these names are aliases or different nets.
    Before finalizing the design, obtain SiFli confirmation of the intended labels, target rails, applicable supply-variant scope, and trace widths. Do not assign the conflicting checklist labels to nets, treat the output-name variants as equivalent, or choose between 12 mil and 0.4 mm without that confirmation.

### 6.10.3. Clock Layout { #6103-clock-layout }

<div align="center"><em>Table 6.10.3-1: Clock Layout Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Crystals are placed close to the chip's corresponding crystal pins to keep trace length short | All variants | Required |
| 2 | Crystal component and oscillator traces have complete GND shielding | All variants | Required |
| 3 | No-copper-fill zone under the crystal: 4-layer PTH board keeps copper clear on the top layer only; 6-layer HDI board keeps copper clear on both the top layer and layer 2 | All variants | Required |
| 4 | Oscillator signal traces are spaced from surrounding GND copper by more than 1.5x the trace width | All variants | Required |
| 5 | 32.768 kHz crystal's parallel traces are spaced more than 2x the base trace width apart | All variants | Required |

</div>

!!! warning "Unresolved conflicts in the source crystal-layout guidance"
    - **Ground shielding and copper keep-out:** PCB guide Section 3.3 requires a continuous reference ground in the crystal region and a top-layer copper keep-out around the crystal. Its Figure 3-3-1 (shown here as Figure 6.9-30) gives at least 0.25 mm around the package. Self-check Table 4-3-1, item 6 requires complete GND shielding around the crystal and oscillator traces, while item 7 specifies no copper beneath the crystal on the TOP layer for a 4-layer PTH board and on both TOP and Layer 2 for a 6-layer HDI board. The source does not define the boundary between the shielded region and the crystal keep-out or explain how the continuous-ground instruction applies within those stack-up-specific no-copper layers. This is an unresolved scope conflict; do not infer a layer-by-layer copper or ground pattern.
    - **32.768 kHz trace spacing:** PCB guide Section 3.3 and routing-model Figure 3-3-4 (shown here as Figure 6.9-33) specify at least 0.15 mm between parallel `32K_XI` / `32K_XO` traces. Self-check Table 4-3-1, item 9 requires spacing greater than twice the base trace width, which is greater than 0.2 mm for the guide's 0.1 mm trace. These are conflicting minimum-spacing requirements.
    - **Clearance scope:** Figure 3-3-1 (shown here as Figure 6.9-30) specifies at least 0.25 mm of TOP-layer copper clearance around the package. Self-check Table 4-3-1, item 7 separately defines which layers must be copper-free beneath the crystal for the two listed stack-ups, but the source does not say how the 0.25 mm perimeter clearance relates to those under-package zones or to adjacent-layer routing exclusions.
    These conflicts and scope gaps are unresolved in SiFli's source guidance. Before layout release, obtain confirmation for the actual package and stack-up; do not choose between the spacing requirements or derive a layer-specific ground/keep-out boundary from these references.

### 6.10.4. RF Layout { #6104-rf-layout }

<div align="center"><em>Table 6.10.4-1: RF Layout Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Every RF trace is PCB impedance-controlled to a single-ended 50 Ω target | All variants | Required |
| 2 | Ground copper on both sides of the RF trace is at least 60 mil wide and connected to the main ground plane through multiple vias | All variants | Required |
| 3 | The reserved PI matching network is placed close to the RF chip pin | All variants | Required |
| 4 | A continuous, unbroken GND shielding layer runs directly beneath the RF signal trace | All variants | Required |
| 5 | No high-speed digital signal trace runs directly beneath the RF signal trace | All variants | Required |
| 6 | No power-related signal trace with large current swings runs directly beneath the RF signal trace | All variants | Required |

</div>

### 6.10.5. Display Routing { #6105-display-routing }

<div align="center"><em>Table 6.10.5-1: Display Routing Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | A series resistor ≤50 Ω is placed on the display-clock trace; an unpopulated shunt-capacitor footprint is reserved so an RC network can be used for EMI suppression | All variants | Required |
| 2 | High-speed display signal traces are preferentially routed on inner layers; the display connector/FPC ribbon is kept away from the RF antenna area | All variants | Required |

</div>

### 6.10.6. Audio Routing { #6106-audio-routing }

<div align="center"><em>Table 6.10.6-1: Audio Routing Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | GND shielding is provided around the `ADCP` routing region to suppress external electromagnetic interference | All variants | Required |
| 2 | `DACP`/`DACN` are routed as a strict length-matched differential pair, with GND shielding around the routing region | All variants | Required |
| 3 | Total `DACP`/`DACN` trace length is controlled so parasitic capacitance stays under 10 pF | All variants | Required |
| 4 | `AVDD_BRF`/`AVDD33_AUD` analog-supply traces are GND-shielded and routed away from high-current and strongly interfering signal traces | All variants | Required |

</div>

### 6.10.7. GPADC Routing { #6107-gpadc-routing }

<div align="center"><em>Table 6.10.7-1: GPADC Routing Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | GPADC analog traces are routed away from parallel high-speed signal traces, with GND shielding around the routing region to keep digital noise from degrading sampling accuracy | All variants | Required |

</div>
