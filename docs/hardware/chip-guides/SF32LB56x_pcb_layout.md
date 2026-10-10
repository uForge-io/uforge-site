---
icon: lucide/layers
description: "PCB layout guidelines for the SF32LB56x MCU: footprint, stack-up, critical routing, and the item-by-item PCB layout checklist."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# SF32LB56x Hardware Design Guide — PCB Layout Guidelines { #sf32lb56x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Part of the SF32LB56x Hardware Design Guide"
    This page covers Section 6, PCB Layout Guidelines. Return to [Schematic Design Guidelines](SF32LB56x_schematic_design.md), or continue to [Design Review Checklist and References](SF32LB56x_review_and_reference.md).

## 6. PCB Layout Guidelines { #6-pcb-layout-guidelines }

### 6.1. Footprint and Stack-Up { #61-footprint-and-stack-up }

The U variant uses a 68-pin QFN68L package measuring 7 × 7 × 0.75mm with 0.35mm pin pitch. QFN supports PTH; SiFli recommends a four-layer PTH stack-up, with every pin fanned out on the top layer. The V variant uses a 175-ball WBBGA package measuring 6.5 × 6.1 × 0.94mm, with 0.4mm ball pitch and 0.25mm ball diameter. It does not support PTH and requires HDI. Fan out the two outermost ball rows on the top layer and the remaining balls on inner layers. Before layout release, confirm the PCB supplier supports the selected stack-up, solder mask, and fanout strategy.

### 6.2. Critical Routing { #62-critical-routing }

#### 6.2.1. Clock Routing { #621-clock-routing }

Place crystals inside the shield can, more than 1mm from the board edge and preferably at least 5mm from heat-generating PA, charger, and PMU components. Keep other metal and components at least 0.25mm from the crystal circuit. Route the 48MHz crystal on the top layer where practical; keep its traces 3–10mm long and 0.075mm wide, with three-dimensional ground shielding. Keep them away from VBAT, DC-DC, and high-speed signals. Route the 32.768kHz crystal on the top layer, with trace length no greater than 10mm, 0.075mm trace width, and at least 0.15mm spacing between 32K_XI and 32K_XO. Keep the top and adjacent layers beneath both crystal areas clear; no other traces may cross them.

#### 6.2.2. RF Routing { #622-rf-routing }

Route RF as a 50Ω single-ended controlled-impedance trace, preferably wider than 10mil, on the top layer where practical; avoid vias and sharp corners. Place the matching network near the chip, not the antenna. Place the AVDD_BRF filter capacitor close to the chip pin and connect its ground directly to the main ground through a via. Provide continuous ground shielding and stitching vias along both sides of the RF trace. Keep high-di/dt power, high-speed clocks, and I2C, SPI, SDIO, I2S, and UART signals out of and beneath the RF area. Connect U-variant AVSS_RF1/2/3 and V-variant AVSS_RRF, AVSS_TRF, AVSS_TRF2, and AVSS_BB reliably to main ground.

#### 6.2.3. Power and Ground { #623-power-and-ground }

Place the BUCK inductor and filter capacitors close to the chip pins. Keep BUCK_LX short and wide; BUCK_FB must be at least 0.25mm wide. Do not pour copper on the top layer beneath the inductor; keep a solid ground reference on the adjacent layer and do not route other traces through the inductor area. Connect BUCK output-capacitor grounds to the main ground plane with multiple vias. Place the PVDD capacitor close to its pin and route PVDD short and wide; connect PVSS to main ground through vias. Place LDO and I/O supply decoupling capacitors close to their pins, and size supply traces for load current.

!!! warning "Conflicting PVDD Trace-Width Limits"
    The SF32LB56xU/V hardware application guide specifies a minimum PVDD trace width of 0.5mm, while the corresponding PCB checklist specifies 8mil. These values differ; confirm the applicable requirement with SiFli or the PCB design owner before layout freeze.

#### 6.2.4. Audio and Analog Signals { #624-audio-and-analog-signals }

Route AVDD33_ANA and AVDD33_AUD as separate star-fed supplies, guard the traces with ground, and keep them away from high-current noise sources. Place AVDD33_AUD, MIC_BIAS, and AUD_VREF filter capacitors close to their respective pins, with capacitor grounds connected directly to main ground. Route ADCP/ADCN as a short, guarded differential pair, with associated components close to the chip. Route DACP/DACN as a differential pair with parasitic capacitance below 10pF and trace length below 2cm, away from strong interference. Guard GPADC traces and keep them away from battery-level and temperature-sensing noise sources.

#### 6.2.5. USB and SDIO { #625-usb-and-sdio }

Route USB D+/D− (PA17/PA18) as a guarded 90Ω differential pair. Place ESD devices close to the connector and route signals through them before they reach the chip; do not branch the signal before the protection device. Connect the device ground to main ground with short, wide traces and vias. The U variant has one SDIO interface; the V variant has SDIO1 and SDIO2. Route SDIO signals as a group, with total length no greater than 50mm and intra-group length mismatch no greater than 6mm. Ground-shield the clock and guard DATA and CMD signals.

#### 6.2.6. EMI, ESD, and Test Points { #626-emi-esd-and-test-points }

Avoid long surface-layer runs outside the shield can for noisy clock and power signals; route them on inner layers where practical. Place TVS/ESD devices close to the associated connector. Route each signal through its protection device, then connect the device ground pad to main ground with short, wide traces and vias. Put the USB charging-cable test point upstream of its TVS; place the battery-connector TVS upstream of the battery platform so external lines pass through the TVS before reaching the chip. Connect the ground network under the chip adequately to the main ground plane using blind/buried vias.

### 6.3. PCB Layout Checklist { #63-pcb-layout-checklist }

Each table below covers one PCB layout review area. When an Applies To column is not present, the row applies to all variants covered by the workbook.

#### 6.3.1. Package { #631-package }

<div align="center"><em>Table 6.3-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Footprint matches the package SPEC | Required |

</div>

#### 6.3.2. Power Supply { #632-power-supply }

<div align="center"><em>Table 6.3-2: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PVDD supply trace is at least 8 mil | Required |
| 2 | BUCK_LX and BUCK_FB trace is at least 8 mil | Required |
| 3 | VDDIO1 supply trace is at least 5 mil | Required |
| 4 | VDDIO2 supply trace is at least 8 mil | Required |
| 5 | VDDIO3 supply trace is at least 5 mil | Required |
| 6 | VDDIO4 supply trace is at least 6 mil | Required |
| 7 | VDDIOSC supply trace is at least 6 mil | Required |
| 8 | AVDD33_ANA supply trace is at least 6 mil | Required |
| 9 | AVDD33_AUD supply trace is at least 5 mil | Required |

</div>

#### 6.3.3. Power Supply Capacitor and Inductor Placement { #633-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Table 6.3-3: Power Supply Capacitor and Inductor Placement Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PVDD capacitor is placed close to the pin | Required |
| 2 | BUCK inductor placed close to the chip | Required |
| 3 | BUCK decoupling capacitor placed as close as possible to the chip pin | Required |
| 4 | LDO1_VOUT capacitor is placed close to the pin | Required |
| 5 | LDO2_VOUT capacitor is placed close to the pin | Required |
| 6 | VDD_RET capacitor placed close to the pin | Required |
| 7 | VDD_RTC capacitor placed close to the pin | Required |
| 8 | VDDIO1 capacitor is placed close to the pin | Required |
| 9 | VDDIO2 capacitor is placed close to the pin | Required |
| 10 | VDDIO3 capacitor is placed close to the pin | Required |
| 11 | VDDIO4 capacitor is placed close to the pin | Required |
| 12 | AVDD33_ANA capacitor is placed close to the pin | Required |
| 13 | AVDD33_AUD capacitor placed close to the pin | Required |

</div>

#### 6.3.4. Clock { #634-clock }

<div align="center"><em>Table 6.3-4: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Crystal placed close to the chip | Required |
| 2 | GND shielding applied around the crystal | Required |
| 3 | Copper keep-out applied under the crystal (4-layer PTH board: top layer; 6-layer HDI board: top layer and layer 2) | Required |
| 4 | Ground-fill clearance along the crystal traces is greater than 1.5x the trace width | Required |
| 5 | 32 kHz crystal's parallel trace pair spacing is greater than 2x the trace spacing | Required |

</div>

#### 6.3.5. Buttons { #635-buttons }

<div align="center"><em>Table 6.3-5: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Button's ESD protection device placed close to the button | Required |

</div>

#### 6.3.6. RF { #636-rf }

<div align="center"><em>Table 6.3-6: RF Checklist</em></div>

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
| 8 | AVSS_RF1, AVSS_RF2, and AVSS_RF3 are strengthened with grounding and connected to the main-ground plane | Required |

</div>

#### 6.3.7. Audio { #637-audio }

<div align="center"><em>Table 6.3-7: Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | AU_ADCP/AU_ADCN are routed as differential traces with ground guarding | Required |
| 2 | AU_DACP/AU_DACN are routed as differential traces with ground guarding | Required |
| 3 | AU_DACP/AU_DACN traces are short enough that parasitic capacitance is below 10 pF | Required |
| 4 | AVDD33_ANA, AVDD33_AUD power traces use ground guarding, stay away from high-current noisy signals, use star routing, and each trace is at least 5 mm long | Required |
| 5 | AVSS is connected through vias to main-ground plane | Required |

</div>

#### 6.3.8. ADC { #638-adc }

<div align="center"><em>Table 6.3-8: ADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | No high-speed signal runs parallel to the GPADC signal without ground guarding | Required |
| 2 | Battery-voltage divider resistors are placed close to the chip input pin | Required |

</div>

#### 6.3.9. Test Points { #639-test-points }

<div align="center"><em>Table 6.3-9: Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Test-point locations are suitable for probing or fixture soldering | Required |
| 2 | Download and crystal-calibration test points include VBAT, GND, SWDIO, SWCLK, MODE, UART4_TXD, UART4_RXD, and one of PB20/PB21/PB25; include VDDIO2 plus VDDIO3 or VDDIO4 for U, or VDDIOA and VDDIOB for V, and meet fixture size and location requirements | Required |

</div>

#### 6.3.10. Ground { #6310-ground }

<div align="center"><em>Table 6.3-10: Ground Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Layers adjacent to the main chip are a complete main-ground plane, with sufficient grounding vias | Required |
| 2 | PVSS is connected through vias to main ground | Required |
| 3 | Area under the chip has enough grounding vias connected to the main ground plane | Required |
| 4 | A ring of grounding vias runs around the board edge | Required |

</div>
