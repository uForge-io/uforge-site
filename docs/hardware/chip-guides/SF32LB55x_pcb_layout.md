---
icon: lucide/layers
hide:
    - navigation
description: "PCB layout guidelines for the SF32LB55x MCU: footprint, stack-up, general PCB rules, interface routing, and the item-by-item PCB layout checklist."
tags:
    - Hardware
    - Chip
---

# SF32LB55x Hardware Design Guide — PCB Layout Guidelines { #sf32lb55x-hardware-design-guide-pcb-layout-guidelines }

## 6. PCB Layout Guidelines { #6-pcb-layout-guidelines }

### 6.1. Footprint and Stack-Up { #61-footprint-and-stack-up }

Use the package drawing, land-pattern requirements, and assembly capability of the selected QFN or BGA package. BGA packages require early confirmation of ball escape, via strategy, solder-mask rules, and fabrication limits.

#### 6.1.1. Stack-Up and Fabrication Reference { #611-stack-up-and-fabrication }

SiFli recommends a conventional PTH process and a four-layer board for QFN68L and BGA145. For BGA169, the reference recommends one-step HDI with blind/buried vias. The illustrated four- and six-layer stack-ups have a finished thickness of 0.7 mm ±10%. These are reference constructions, not universal limits; confirm the selected package drawing, finished thickness, and process capability with the board fabricator.

<div align="center"><em>Table 6.1-1: Four-Layer PTH Reference Stack-Up</em></div>

<div align="center" markdown>

| Layer / material | Assumed copper area | Material type | Dk | DF | Theoretical thickness (mil) | Theoretical thickness (mm) |
|:---|:---:|:---|:---:|:---:|---:|---:|
| Top solder mask | - | - | 3.5 | 0.8 | 1 | 0.0254 |
| L1 copper + plating | - | Copper + plating | - | - | 0.048 | 0.001219 |
| Prepreg | 70% | 2116 | 4.2 | 0.015 | 4.2 | 0.10668 |
| L2 copper | - | Copper | - | - | 0.07 | 0.001778 |
| Core | 70% | Not specified in source figure | 4 | 0.017 | 16.1 | 0.408941 |
| L3 copper | - | Copper | - | - | 0.07 | 0.001778 |
| Prepreg | 70% | 2116 | 4.2 | 0.015 | 4.2 | 0.10668 |
| L4 copper + plating | - | Copper + plating | - | - | 0.048 | 0.001219 |
| Bottom solder mask | - | - | 3.5 | 0.8 | 1 | 0.0254 |
| Theoretical total | - | - | - | - | 26.736 | 0.679096 |

</div>

The source figure specifies a finished board thickness of 0.7 mm ±10%, including plating and solder mask. It prints the L1/L4 copper-plus-plating thickness as 0.048 mil (0.001219 mm) and the L2/L3 copper thickness as 0.07 mil (0.001778 mm). These values differ markedly from customary PCB copper-thickness notation. They are transcribed as printed, not fabrication targets; obtain written confirmation from SiFli and the board fabricator before using them.

<div align="center"><em>Table 6.1-2: Six-Layer HDI Reference Stack-Up</em></div>

<div align="center" markdown>

| Layer / material | Assumed copper area | Material type | Dk | DF | Theoretical thickness (mil) | Theoretical thickness (mm) |
|:---|:---:|:---|:---:|:---:|---:|---:|
| Top solder mask | - | - | 3.5 | 0.8 | 0.4 | 0.01016 |
| L1 copper + plating | - | Copper + plating | - | - | 1.2 | 0.03048 |
| Prepreg | 70% | 1080 | 4.14 | 0.02 | 2.6 | 0.06604 |
| L2 copper | - | Copper | - | - | 0.7 | 0.01778 |
| Prepreg | 70% | 2116 | 4.14 | 0.02 | 4.8 | 0.12192 |
| L3 copper | - | Copper | - | - | 0.7 | 0.01778 |
| Core | 70% | FR-4 CORE | 4.43 | 0.017 | 4 | 0.1016 |
| L4 copper | - | Copper | - | - | 0.7 | 0.01778 |
| Prepreg | 70% | 2116 | 4.14 | 0.02 | 4.8 | 0.12192 |
| L5 copper | - | Copper | - | - | 0.7 | 0.01778 |
| Prepreg | 70% | 1080 | 4.14 | 0.02 | 2.6 | 0.06604 |
| L6 copper + plating | - | Copper + plating | - | - | 1.2 | 0.03048 |
| Bottom solder mask | - | - | 3.5 | 0.8 | 0.4 | 0.01016 |
| Theoretical total | - | - | - | - | 24.8 | 0.629921 |

</div>

The source figure specifies a finished six-layer HDI board thickness of 0.7 mm ±10%, including plating and solder mask. The stack-up, dielectric parameters, and theoretical thickness are references; have the board fabricator verify them against the actual materials, copper weights, and impedance requirements.

#### 6.1.2. Land-Pattern Dimensions { #612-land-pattern-dimensions }

- BGA145/BGA169: 0.25 mm ball diameter and 0.5 mm pitch; the reference land pattern shows a 0.33 mm solder-mask opening and a 0.25 mm paste opening.
- QFN68L: perimeter pads are 0.2 × 0.55 mm on 0.35 mm pitch; the reference shows a 0.3 × 0.65 mm solder-mask opening and a 0.2 × 0.55 mm paste opening. The exposed pad is 5.49 mm square nominally, with a 5.39–5.59 mm range.

Check the package drawing and assembly house's stencil and solder-mask rules before releasing the footprint.

### 6.2. General PCB Rules { #62-general-pcb-rules }

- Keep BUCK loops short and wide, with return current close to the switching loop.
- Keep RF, crystal, GPADC, and audio regions away from switching supplies, display clocks, motors, and chargers.
- Route high-speed memory and display interfaces over continuous reference ground.
- Place ESD protection close to connectors and route signals through the protection device first.
- Provide enough test points for power, boot, debug, RF, and production calibration.

#### 6.2.1. Fabrication Clearances { #621-fabrication-clearances }

The following values are transcribed from SiFli's PTH and six-layer HDI reference-rule figures. They are not substitutes for the fabricator's current rules for the selected stack-up.

<div align="center"><em>Table 6.2-1: PTH and Six-Layer HDI Reference Clearances</em></div>

<div align="center" markdown>

| Rule / clearance | Four-layer PTH (mm) | Six-layer HDI (mm) |
|:---|---:|---:|
| Trace width: minimum / recommended | 0.10 / 0.10 | 0.075 / 0.075 |
| Trace width: maximum | 2.54 | 2.54 |
| Trace-to-trace, trace-to-via, via-to-via | 0.10 | 0.075 |
| Pad/SMD-to-trace or via | 0.10 | 0.075 |
| Pad-to-pad or SMD-to-pad | 0.10 | 0.10 |
| Copper-to-trace, drill, pad, or SMD | 0.127 | 0.10 |
| Copper-to-copper | 0.15 | 0.15 |
| Board edge-to-trace, drill, pad, SMD, or copper | 0.25 | 0.20 |
| Drill-to-trace or via | 0.10 | 0.075 |
| Drill-to-pad, SMD, or copper | 0.10 | 0.10 |
| Drill-to-drill; component-body-to-component-body | 0.10 | 0.10 |

</div>

In each source figure's same-net matrix, only selected cells are marked 0 mm; blank cells are unspecified. Do not infer that unlisted combinations also permit 0 mm clearance. Confirm every rule with the PCB fabricator before layout release.

#### 6.2.2. Power and Ground Layout { #622-power-and-ground-layout }

- Place DC-DC inductors and capacitors close to their pins. Keep BUCK_VSW short and wide, minimize loop area, connect output-capacitor grounds to the plane with multiple vias, and make the BUCK_VOUT feedback trace wider than 0.25 mm. Do not place surface copper or unrelated traces beneath an inductor; use a solid ground plane on the adjacent layer.
- Place PVDD_PMU1 (pin 67) capacitors close to the pin and use a trace at least 0.3 mm wide. Place LDO/IO capacitors close to their corresponding pins; size traces for load current and keep them short and wide where ripple or stability is sensitive.
- Connect the QFN exposed pad directly to main ground with multiple vias, especially near RF and PMU regions. For BGA145 and BGA169, connect RF ground balls C12, C13, D12, and E13 to main ground as shown in the [BGA145 ball map](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-Ballmap.svg), [BGA169 device 1 ball map](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg), and [BGA169 device 2 ball map](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg). D2 and B3 are PMU ground balls on BGA169; on BGA145, D2 is PA79 and B3 is BUCK2_VOUT. Do not bridge separate ground balls together with surface copper.

**Source-map clarification:** The source prose repeats E13 in its RF-ground ball list. The [RF-ground figure](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-RF-VSS-PCB.png) labels AVSS_TRF at C13, AVSS_RRF at E13, AVSS_BB at C12, and AVSS_VCO at D12. The coordinates above follow the figure; verify them against the ball map for the selected package before routing.

#### 6.2.3. EMI, ESD, and Protection { #623-emi-esd-and-protection }

Keep clocks and noisy power routes on inner layers where practical. Place ESD devices at the connector so each signal passes through the device before entering the board, without a branch stub; use a short, wide ground path with a direct via to the plane. For USB charging, place the test point on the connector side of the TVS. For the battery input, place the TVS between the connector and board load so the path to the chip passes the TVS first, and keep its ground connection short.

### 6.3. Interface Routing { #63-interface-routing }

Clock traces should be short, shielded, and isolated from fast digital signals. RF should be controlled as a 50 ohm path with a compact matching network. Storage and display traces should be length-controlled according to their speed and routed as grouped buses. Audio and GPADC signals should be shielded and kept away from switching currents.

#### 6.3.1. Crystal Placement and Routing { #631-crystal-placement-and-routing }

- Place each crystal inside the shielded area, more than 1 mm from the board edge and more than 5 mm from heat sources such as the PA, charger, and PMU. Keep at least 0.25 mm clearance around the crystal.
- Route the 48 MHz crystal traces on the top layer; keep them 3–10 mm long and 0.1 mm wide. Keep 48M_XI and 48M_XO at least 0.15 mm apart, as shown in the [source routing model](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-48M-M-PCB.png), and provide three-dimensional ground shielding. Keep the routes away from VBAT, DC-DC, and high-speed signals. The source prose calls for a copper keep-out on the top and adjacent layers beneath the crystal region and prohibits unrelated routing through that region.
- Route the 32.768 kHz crystal traces on the top layer; keep them no longer than 10 mm and 0.1 mm wide. Keep XI and XO at least 0.15 mm apart and provide three-dimensional ground shielding. The source prose calls for a copper keep-out on the top and adjacent layers beneath the crystal region and prohibits unrelated routing through that region.

#### 6.3.2. RF and High-Speed Interfaces { #632-rf-and-high-speed-interfaces }

Place the RF matching network close to the chip, not at the antenna. Keep the AVDD_BRF capacitor close to its pin and connect its ground directly to main ground. Route RF on the top layer without layer changes, with a 50 Ω controlled impedance. The source prose recommends a width greater than 10 mil, while the source checklist marks ≥10 mil as Required; preserve that distinction and size the final trace for 50 Ω on the selected stack-up. Use three-dimensional ground shielding and stitching vias on both sides; avoid sharp corners and keep DC-DC, VBAT, clocks, and high-speed I2C/SPI/SDIO/I2S/UART away from the RF region.

Route MIPI_DSI as 100 Ω differential pairs and length-match data pairs to the clock pair. Length-match OPI PSRAM and LCDC SPI/QSPI buses. Guard clock and I2C routes with ground where practical and avoid long parallel runs with unrelated signals.

#### 6.3.3. Analog Routing { #633-analog-routing }

Surround GPADC routes with ground shielding in three dimensions and keep them away from noisy battery-voltage and temperature-sensing paths. Review divider impedance and leakage against the required settling time.

### 6.4. PCB Layout Checklist { #64-pcb-layout-checklist }

Each table below covers one PCB layout review area. When an Applies To column is not present, the row applies to all variants covered by the workbook.

#### 6.4.1. Package { #641-package }

<div align="center"><em>Table 6.4-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | The footprint matches the package specification | All variants | Required |

</div>

#### 6.4.2. Power Supply { #642-power-supply }

<div align="center"><em>Table 6.4-2: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | VDD1 supply trace is at least 8 mil | All variants | Required |
| 2 | VDD2 supply trace is at least 8 mil | 555 only | Required |
| 3 | Both BUCK1_VSW and BUCK1_VOUT traces are at least 8 mil wide | All variants | Required |
| 4 | Both BUCK2_VSW and BUCK2_VOUT traces are at least 8 mil wide | 555 only | Required |
| 5 | LDOVCC2_VOUT trace is at least 8 mil | 555 only | Optional |
| 6 | AVDD_DSI supply trace is at least 8 mil | 555 only | Required |
| 7 | VDD_SIP supply trace is at least 6 mil | All variants | Required |
| 8 | VDDIOA supply trace is at least 10 mil | All variants | Required |
| 9 | VDDIOB supply trace is at least 10 mil | All variants | Required |

</div>

#### 6.4.3. Power Supply Capacitor and Inductor Placement { #643-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Table 6.4-3: Power Supply Capacitor and Inductor Placement Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | VDD1 capacitor is placed close to the pin | All variants | Required |
| 2 | VDD2 capacitor is placed close to the pin | 555 only | Required |
| 3 | BUCK1 inductor is placed close to the chip | All variants | Required |
| 4 | BUCK1 capacitor is placed as close as possible to the chip pin | All variants | Required |
| 5 | BUCK2 inductor is placed close to the chip | 555 only | Required |
| 6 | The 0.1 µF capacitor on AVDD_DSI is placed close to the pin | 555 only | Required |
| 7 | LDO_VOUT1 capacitor is placed close to the pin | All variants | Required |
| 8 | LDO_VOUT2 capacitor is placed close to the pin | All variants | Required |
| 9 | VDD_RET capacitor is placed close to the pin | All variants | Required |
| 10 | VDD_RTC capacitor is placed close to the pin | All variants | Required |
| 11 | VDD_SIP capacitor is placed close to the pin | All variants | Required |
| 12 | AVDD33 capacitor is placed close to the pin | All variants | Required |
| 13 | AVDD_BRF capacitor is placed close to the pin | All variants | Required |
| 14 | VDDIOA capacitor is placed close to the pin | All variants | Required |
| 15 | VDDIOB capacitor is placed close to the pin | All variants | Required |

</div>

#### 6.4.4. Clock { #644-clock }

<div align="center"><em>Table 6.4-4: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Crystal placed close to the chip | All variants | Required |
| 2 | GND shielding applied around the crystal | All variants | Required |
| 3 | The checklist calls for a copper keep-out beneath the crystal on the top layer of a 4-layer board, and on layers 2 and 3 where required | All variants | Required |
| 4 | Clearance between the crystal traces and GND guard copper is greater than 3× the trace width | All variants | Required |
| 5 | The 32 kHz crystal signal does not run parallel to BUCK1; ground is placed between them | All variants | Required |

</div>

**Source clarification:** The source prose calls for a copper keep-out on the top and adjacent layers beneath the crystal region; the checklist names the top layer for a 4-layer board and layers 2 and 3 where required. The [48 MHz routing model](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-48M-M-PCB.png) and [32.768 kHz routing model](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-32K-M-PCB.png) both depict an L2 ground plane beneath the XI/XO routes. The source does not clarify whether the keep-out applies only beneath the crystal package or also beneath the routing, nor how the layer requirements correspond. Confirm the required keep-out with SiFli before release; do not infer it.

#### 6.4.5. Buttons { #645-buttons }

<div align="center"><em>Table 6.4-5: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | The button's ESD protection device is placed close to the button | All variants | Required |

</div>

#### 6.4.6. RF { #646-rf }

<div align="center"><em>Table 6.4-6: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | RF trace meets the single-ended 50 Ω characteristic-impedance requirement | All variants | Required |
| 2 | RF trace width ≥10 mil | All variants | Required |
| 3 | Provide a ground-copper strip at least 60 mil wide on each side of the RF trace, with sufficient stitching vias connecting the strips to the main ground | All variants | Required |
| 4 | Reserve space for a Pi-type antenna matching network close to the chip | All variants | Required |
| 5 | Continuous GND plane beneath the RF signal | All variants | Required |
| 6 | No high-speed digital signal traces cross beneath the RF signal | All variants | Required |
| 7 | No high-di/dt power traces cross beneath the RF signal | All variants | Required |

</div>

#### 6.4.7. High-speed Signals { #647-high-speed-signals }

<div align="center"><em>Table 6.4-7: High-speed Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | DSI differential signals meet the 100 Ω differential-impedance requirement | 555 only | Required |
| 2 | DSI data differential pairs are length-matched to the clock differential pair within 200 mil | 555 only | Required |
| 3 | DSI signals are routed on the same layer as much as possible | 555 only | Required |
| 4 | OPI PSRAM signal trace length matching is controlled within 200 mil | 555 only | Optional |

</div>

#### 6.4.8. ADC { #648-adc }

<div align="center"><em>Table 6.4-8: ADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Do not route rapidly switching signals in parallel with the GPADC signal unless it is properly guarded | All variants | Required |
| 2 | Battery-voltage divider resistors are placed close to the chip input pin | All variants | Required |
| 3 | Route the battery-voltage sensing signal from the battery connector and provide ground guarding | All variants | Required |
| 4 | Do not route rapidly switching signals in parallel with the SDMADC signal unless it is properly guarded | 555 only | Optional |

</div>

#### 6.4.9. Test Points { #649-test-points }

<div align="center"><em>Table 6.4-9: Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Test-point locations are suitable for probing or fixture soldering | All variants | Required |
| 2 | Program-download and crystal-calibration test pads (VBAT, GND, SWDCLK, SWDIO, MODE, RSTN, VDDIOA, UART3_TXD, UART3_RXD, etc.) must be at least 0.8 mm in diameter and spaced 2 mm apart, with a 2 mm component-free area around them | All variants | Required |

</div>

#### 6.4.10. Ground { #6410-ground }

<div align="center"><em>Table 6.4-10: Ground Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Provide a continuous main-ground plane on the layers adjacent to the main chip, with sufficient ground vias | All variants | Required |
| 2 | Exposed pad (EPAD) is connected to the main ground through vias | All variants | Required |
| 3 | Area under the chip has enough grounding vias connected to the main ground plane | All variants | Required |
| 4 | A ring of grounding vias runs around the board edge | All variants | Required |

</div>
