---
icon: lucide/list-checks
hide:
    - navigation
description: "Item-by-item PCB layout review checklist for the SF32LB58x MCU, covering package, power, clock, RF, audio, high-speed signals, and stack-up checks."
tags:
    - Hardware
    - Chip
    - Checklist
---

# SF32LB58x Hardware Design Guide — PCB Layout Checklist { #sf32lb58x-hardware-design-guide-pcb-layout-checklist }

!!! note "Part of the SF32LB58x Hardware Design Guide"
    This page covers Section 6.18, the item-by-item PCB layout checklist. Return to [PCB Layout Guidelines](SF32LB58x_pcb_layout.md).

## 6.18. PCB Layout Checklist { #618-pcb-layout-checklist }

Each table below covers one PCB layout review area. If a table has no "Applies To" column, its checks apply to all SF32LB58x PCB designs covered by this checklist.

### 6.18.1. Package { #6181-package }

<div align="center"><em>Table 6.18.1-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | The PCB footprint matches the package specification | Required |

</div>

### 6.18.2. Power Supply { #6182-power-supply }

<div align="center"><em>Table 6.18.2-1: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | VDD1 supply trace is at least 8 mil | Required |
| 2 | VDD2 supply trace is at least 8 mil | Required |
| 3 | The BUCK1_VSW and BUCK1_VOUT traces are at least 8 mil wide | Required |
| 4 | The BUCK2_VSW and BUCK2_VOUT traces are at least 8 mil wide | Required |
| 5 | VDDIOA supply trace is at least 10 mil | Required |
| 6 | VDDIOA2 supply trace is at least 10 mil | Required |
| 7 | VDDIOB supply trace is at least 10 mil | Required |
| 8 | VDDIOSA supply trace is at least 6 mil | Required |
| 9 | VDDIOSB supply trace is at least 6 mil | Required |
| 10 | VDDIOSC supply trace is at least 6 mil | Required |
| 11 | AVDD33_USB supply trace is at least 6 mil | Required |
| 12 | AVDD33_ANA supply trace is at least 6 mil | Required |
| 13 | AVDD_BRF supply trace is at least 8 mil wide | Required |
| 14 | AVDD33_AUD supply trace is at least 6 mil | Required |
| 15 | AVDD33_DSI supply trace is at least 8 mil | Required |

</div>

### 6.18.3. Power Supply Capacitor and Inductor Placement { #6183-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Table 6.18.3-1: Power Supply Capacitor and Inductor Placement Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | VDD1 capacitor is placed close to the pin | Required |
| 2 | VDD2 capacitor is placed close to the pin | Required |
| 3 | BUCK1 inductor is placed close to the chip | Required |
| 4 | BUCK1 capacitor is placed as close as possible to the chip pin | Required |
| 5 | BUCK2 inductor is placed close to the chip | Required |
| 6 | BUCK2 capacitor is placed as close as possible to the chip pin | Required |
| 7 | HPSYS_LDO_VOUT capacitor is placed close to the pin | Required |
| 8 | LPMU_VDD07_RET capacitor is placed close to the pin | Required |
| 9 | LPMU_VDD11_RTC capacitor is placed close to the pin | Required |
| 10 | VDDIOA capacitor is placed close to the pin | Required |
| 11 | VDDIOA2 capacitor is placed close to the pin | Required |
| 12 | VDDIOB capacitor is placed close to the pin | Required |
| 13 | VDDIOSA capacitor is placed close to the pin | Required |
| 14 | VDDIOSB capacitor is placed close to the pin | Required |
| 15 | VDDIOSC capacitor is placed close to the pin | Required |
| 16 | AVDD33_USB capacitor is placed close to the pin | Required |
| 17 | AVDD33_ANA capacitor is placed close to the pin | Required |
| 18 | AVDD_BRF capacitor is placed close to the pin | Required |
| 19 | AVDD33_AUD capacitor is placed close to the pin | Required |
| 20 | AVDD33_DSI capacitor is placed close to the pin | Required |

</div>

### 6.18.4. Clock { #6184-clock }

<div align="center"><em>Table 6.18.4-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Crystal placed close to the chip | Required |
| 2 | GND shielding applied around the crystal | Required |
| 3 | Keep copper out beneath the crystal. For a 4-layer PCB, apply the keep-out on at least layers 1 (top), 2, and 3 | Required |
| 4 | Keep the clearance between the crystal traces and GND guard copper greater than three times the trace width | Required |

</div>

!!! warning "Confirm the crystal keep-out layers with SiFli"
    The checklist workbook calls for copper keep-outs on layers 1, 2, and 3 of a four-layer PCB. The [PCB layout guide](SF32LB58x_pcb_layout.md#65-clock-interface-routing) specifies the surface layer and the adjacent layer beneath each crystal area. The sources differ on whether layer 3 is included; do not infer the final layer-3 requirement without confirmation from SiFli.

### 6.18.5. Buttons { #6185-buttons }

<div align="center"><em>Table 6.18.5-1: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Button ESD protection device is placed close to the button | Required |

</div>

### 6.18.6. RF { #6186-rf }

<div align="center"><em>Table 6.18.6-1: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | RF trace meets the single-ended 50 Ω characteristic-impedance requirement | Required |
| 2 | RF trace width ≥10 mil | Required |
| 3 | Reserve a footprint for a π-type antenna-matching network near the chip | Required |
| 4 | Provide a continuous GND plane beneath the RF signal | Required |
| 5 | No high-speed digital signal traces cross beneath the RF signal | Required |
| 6 | No high-di/dt power traces cross beneath the RF signal | Required |

</div>

### 6.18.7. Audio { #6187-audio }

<div align="center"><em>Table 6.18.7-1: Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | AU_ADC1P and AU_ADC1N parallel traces use ground guarding | Required |
| 2 | AU_ADC2P and AU_ADC2N parallel traces use ground guarding | Required |
| 3 | AU_DAC1P and AU_DAC1N parallel traces use ground guarding | Required |
| 4 | AU_DAC2P and AU_DAC2N parallel traces use ground guarding | Required |
| 5 | The AU_DAC1P, AU_DAC1N, AU_DAC2P, and AU_DAC2N traces have capacitance &lt; 10 pF and length &lt; 2 cm | Required |

</div>

!!! warning "Conflicting DAC trace-length limits in the source"
    This workbook specifies a DAC trace length under 2 cm (20 mm), while the [PCB layout guide](SF32LB58x_pcb_layout.md#67-audio-interface-routing) specifies under 2 mm. These source limits differ by a factor of ten. Do not choose one limit without confirmation from SiFli.

### 6.18.8. High-speed Signals { #6188-high-speed-signals }

<div align="center"><em>Table 6.18.8-1: High-speed Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | DSI differential signals meet the 100 Ω differential-impedance requirement | Required |
| 2 | DSI data differential pairs are length-matched to the clock differential pair within 200 mil | Required |
| 3 | DSI signals are routed on the same layer as much as possible | Required |

</div>

!!! warning "Conflicting DSI pair-to-pair limits in the source"
    This workbook requires the DSI data differential pairs to match the clock differential pair within 200 mil (5.08 mm). The [PCB layout guide](SF32LB58x_pcb_layout.md#610-dsi-interface-routing) instead limits inter-pair skew to ≤2 mm and intra-pair skew to ≤0.5 mm. The pair-to-pair limits conflict; confirm the applicable limit with SiFli before finalizing the layout.

### 6.18.9. ADC { #6189-adc }

<div align="center"><em>Table 6.18.9-1: ADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Avoid routing fast-switching signals in parallel with the GPADC signal; if that cannot be avoided, provide adequate ground guarding | Required |
| 2 | Battery-voltage divider resistors are placed close to the chip input pin | Required |
| 3 | Avoid routing fast-switching signals in parallel with the SDMADC signal; if that cannot be avoided, provide adequate ground guarding | Optional |

</div>

### 6.18.10. Test Points { #61810-test-points }

<div align="center"><em>Table 6.18.10-1: Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Test-point locations are suitable for probing or fixture soldering | Required |
| 2 | Program-download and crystal-calibration test points (VBAT, GND, SWDIO, SWCLK, VDDIOB, MODE, RESET, UART4_TXD, UART4_RXD, etc.) meet fixture size and location requirements | Required |

</div>

### 6.18.11. PCB Stack-up { #61811-pcb-stack-up }

<div align="center"><em>Table 6.18.11-1: PCB Stack-up Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | The layer adjacent to the main chip must be a continuous main-ground plane | Required |

</div>
