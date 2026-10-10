---
icon: lucide/layers
hide:
    - navigation
description: "PCB layout guidelines for the SF32LB58x MCU: package footprint, stack-up, fanout, and routing guidance for clock, RF, audio, USB, SDIO, DSI, and power."
tags:
    - Hardware
    - Chip
---

# SF32LB58x Hardware Design Guide — PCB Layout Guidelines { #sf32lb58x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Part of the SF32LB58x Hardware Design Guide"
    This page covers Section 6, PCB Layout Guidelines. Return to [Schematic Design Guidelines](SF32LB58x_schematic_design.md), continue to the [PCB Layout Checklist](SF32LB58x_pcb_layout_checklist.md), or skip ahead to [Design Review Checklist and References](SF32LB58x_review_and_reference.md).

## 6. PCB Layout Guidelines { #6-pcb-layout-guidelines }

### 6.1. Package Footprint Design { #61-package-footprint-design }

The SF32LB58x series uses a BGA256 package measuring 8.5 mm x 6.5 mm x 0.94 mm, with a 0.4 mm ball pitch and 0.25 mm nominal ball diameter. Refer to the official datasheet for full package qualification data.

!!! warning "Conflicting package-height values in the source"
    The SiFli guide prose gives a package height of 0.94 mm, while its BGA256 drawing labels dimension A as 0.91 mm nominal, with a 0.84–1.04 mm range. These source values conflict. If package height affects mechanical clearance or enclosure fit, do not choose one value without confirmation from SiFli; use the confirmed package specification.

![Figure 6.1-1: BGA256 Package Dimensions](../../sf32-products/chips/assets/58x/sf32lb58x-POD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-1: BGA256 Package Dimensions</em></div>

![Figure 6.1-2: Package Footprint Shape](../../sf32-products/chips/assets/58x/sf32lb58x-DECAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-2: Package Footprint Shape</em></div>

![Figure 6.1-3: PCB Land Pattern Reference](../../sf32-products/chips/assets/58x/sf32lb58x-PAD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-3: PCB Land Pattern Reference</em></div>

![Figure 6.1-4: Package Ball Map](../../sf32-products/chips/assets/58x/sf32lb58x-BALLMAP-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-4: Package Ball Map</em></div>

![Figure 6.1-5: Package Substrate Ball Information](../../sf32-products/chips/assets/58x/sf32lb58x-BALL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-5: Package Substrate Ball Information</em></div>

### 6.2. PCB Stack-Up { #62-pcb-stack-up }

The SF32LB58x series supports single- or double-sided assembly. The PCB must use HDI construction; PTH boards are not supported. A 6HDI-2 stack-up is recommended. The reference stack-up figure specifies a finished board thickness of 0.8 mm ±10% (about 32 mil nominal).

![Figure 6.2-1: Reference Stack-Up Structure](../../sf32-products/chips/assets/58x/sf32lb58x-STACK-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.2-1: Reference Stack-Up Structure</em></div>

### 6.3. General PCB Design Rules { #63-general-pcb-design-rules }

Refer to the general PCB design-rule figure in the official datasheet (dimensions in mm). The reference rules specify a minimum and recommended trace width of 0.075 mm and a maximum of 2 mm; 0.075 mm minimum clearance between traces, vias, pads, SMDs, text, and copper; 0.25 mm board-edge clearance; and 0.1 mm drill-to-drill and body-to-body spacing. Confirm final rules with the PCB fabricator.

![Figure 6.3-1: General PCB Design Rules](../../sf32-products/chips/assets/58x/sf32lb58x-RULE-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.3-1: General PCB Design Rules</em></div>

#### 6.3.1. Blind Via Design { #631-blind-via-design }

Refer to the blind-via design figures (layers 1-2 and 1-3) in the official datasheet (dimensions in mm). The reference plated blind vias use a 0.23 mm diameter and a 0.10 mm drill.

![Figure 6.3-2: 1-2 Layer Blind Via Design](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.3-2: 1-2 Layer Blind Via Design</em></div>

![Figure 6.3-3: 1-3 Layer Blind Via Design](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.3-3: 1-3 Layer Blind Via Design</em></div>

#### 6.3.2. Buried Via Design { #632-buried-via-design }

Refer to the buried-via design figure (layers 2-5) in the official datasheet (dimensions in mm). The reference plated buried via uses a 0.40 mm diameter and a 0.20 mm drill.

![Figure 6.3-4: 2-5 Layer Buried Via Design](../../sf32-products/chips/assets/58x/sf32lb58x-VIA2-5-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.3-4: 2-5 Layer Buried Via Design</em></div>

### 6.4. Trace Fanout { #64-trace-fanout }

The first two rows of BGA balls are fanned out on the top layer; the remaining balls are fanned out through vias to inner layers.

![Figure 6.4-1: Top-Layer Fanout Reference](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-T-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.4-1: Top-Layer Fanout Reference</em></div>

![Figure 6.4-2: Inner-Layer Fanout Reference](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-I-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.4-2: Inner-Layer Fanout Reference</em></div>

### 6.5. Clock Interface Routing { #65-clock-interface-routing }

Place the crystal inside a shield can, more than 1 mm from the PCB board edge, and as far as possible from heat-generating components (such as PA, charging, and PMU circuitry) — ideally more than 5 mm away — to avoid affecting crystal frequency offset. Keep the crystal keep-out zone more than 0.25 mm from other metal or components.

Route the 48 MHz crystal on the top layer with a length of 3-10 mm, trace width 0.075 mm, with full 3D shielding, and route away from VBAT, DC/DC, and high-speed signal lines. Keep the top layer and adjacent layer beneath the 48 MHz crystal area clear of any other routing.

Route the 32.768 kHz crystal on the top layer with a length ≤10 mm, trace width 0.075 mm, and 32K_XI/32K_XO parallel-trace spacing ≥0.15 mm, with full 3D shielding. Keep the top layer and adjacent layer beneath the crystal area clear of any other routing.

!!! warning "Confirm the crystal keep-out layers with SiFli"
    The layout guide specifies a keep-out on the surface layer and the adjacent layer beneath each crystal area. The checklist workbook specifies copper keep-outs on layers 1, 2, and 3 for a four-layer PCB. The sources differ on whether layer 3 is included. Do not infer the final layer-3 requirement; confirm it with SiFli.

![Figure 6.5-1: Crystal Placement](../../sf32-products/chips/assets/58x/sf32lb58x-CRYSTAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-1: Crystal Placement</em></div>

![Figure 6.5-2: 48 MHz Crystal Schematic](../../sf32-products/chips/assets/58x/sf32lb58x-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-2: 48 MHz Crystal Schematic</em></div>

![Figure 6.5-3: 48 MHz Crystal Routing Model](../../sf32-products/chips/assets/58x/sf32lb58x-48M-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-3: 48 MHz Crystal Routing Model</em></div>

![Figure 6.5-4: 48 MHz Crystal Routing Reference](../../sf32-products/chips/assets/58x/sf32lb58x-48M-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-4: 48 MHz Crystal Routing Reference</em></div>

![Figure 6.5-5: 32.768 kHz Crystal Schematic](../../sf32-products/chips/assets/58x/sf32lb58x-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-5: 32.768 kHz Crystal Schematic</em></div>

![Figure 6.5-6: 32.768 kHz Crystal Routing Model](../../sf32-products/chips/assets/58x/sf32lb58x-32K-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-6: 32.768 kHz Crystal Routing Model</em></div>

![Figure 6.5-7: 32.768 kHz Crystal Routing Reference](../../sf32-products/chips/assets/58x/sf32lb58x-32K-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-7: 32.768 kHz Crystal Routing Reference</em></div>

### 6.6. RF Interface Routing { #66-rf-interface-routing }

Place the RF matching circuit as close to the chip as possible, not near the antenna end. Place the AVDD_BRF RF power decoupling capacitor as close to the chip pin as possible, with its ground pin vias landing directly on the main ground plane.

Route RF traces on the top layer where possible to avoid vias that would degrade RF performance; use a trace width preferably greater than 10 mil, apply full 3D shielding, and avoid sharp or right angles. Add extra shielding ground vias along both sides of the RF trace, and control the RF trace to 50 Ω impedance. Keep DC-DC, VBAT, and high-speed digital signals (such as the crystal, high-frequency clocks, and I2C/SPI/SDIO/I2S/UART interface signals) out of the RF routing area. AVSS_RRF, AVSS_TRF, AVSS_TRF2, AVSS_VCO, and AVSS_BB are RF circuit ground pins that must be well grounded — place blind vias directly on their pads connecting to the main ground.

![Figure 6.6-1: π-Network and Power Circuit Schematic](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-1: π-Network and Power Circuit Schematic</em></div>

![Figure 6.6-2: π-Network and Power Circuit PCB Layout](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-2: π-Network and Power Circuit PCB Layout</em></div>

![Figure 6.6-3: RF Signal Circuit Schematic](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-3: RF Signal Circuit Schematic</em></div>

![Figure 6.6-4: RF Signal PCB Routing](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-4: RF Signal PCB Routing</em></div>

![Figure 6.6-5: RF Circuit Ground Signal Schematic](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-5: RF Circuit Ground Signal Schematic</em></div>

![Figure 6.6-6: RF Circuit Ground Signal PCB](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-6: RF Circuit Ground Signal PCB</em></div>

### 6.7. Audio Interface Routing { #67-audio-interface-routing }

Place the AVDD33_AUD audio-supply decoupling capacitor close to its pin, with its ground pin well connected to the main ground. Place the MIC_BIAS microphone-supply decoupling capacitor close to its pin, similarly well grounded. Place the AUD_VREF decoupling capacitor close to its pin.

AU_ADC1P/AU_ADC1N and AU_ADC2P/AU_ADC2N are the two analog input pairs — place associated components as close to their pins as possible, route each P/N pair as a differential line with as short a trace length as possible, apply 3D shielding to the differential pair, and keep other strongly interfering signals away from these traces.

AU_DAC1P/AU_DAC1N and AU_DAC2P/AU_DAC2N are the two analog output pairs — place associated components as close to their pins as possible, route each P/N pair as a differential line as short as possible and under 2 mm, with trace parasitic capacitance below 10 pF and a differential trace width of 0.075 mm. Apply 3D shielding to the differential pair, and keep other strongly interfering signals away from these traces.

!!! warning "Conflicting DAC trace-length limits in the source"
    The layout guide specifies a DAC trace length under 2 mm, while the PCB checklist workbook specifies a length under 2 cm (20 mm). These limits differ by a factor of ten. Do not select or substitute a limit without confirmation from SiFli.

![Figure 6.7-1: Audio Power Schematic](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-1: Audio Power Schematic</em></div>

![Figure 6.7-2: Audio Power Filtering PCB Design](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-2: Audio Power Filtering PCB Design</em></div>

![Figure 6.7-3: Analog Audio Input Schematic](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-3: Analog Audio Input Schematic</em></div>

![Figure 6.7-4: Analog Audio Input PCB Design](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-4: Analog Audio Input PCB Design</em></div>

![Figure 6.7-5: Analog Audio Output Schematic](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-5: Analog Audio Output Schematic</em></div>

![Figure 6.7-6: Analog Audio Output PCB Design](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-6: Analog Audio Output PCB Design</em></div>

### 6.8. USB Interface Routing { #68-usb-interface-routing }

Place the AVDD33_USB decoupling capacitor close to its pin, and place the USB2_REXT calibration resistor close to its pin. USB traces must pass through the ESD-protection component pins before reaching the chip, with the ESD device's ground pin well connected to the main ground. Route USB DP/DN as a differential pair controlled to 90 Ω differential impedance, with 3D shielding applied.

![Figure 6.8-1: USB Signal Schematic](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-1: USB Signal Schematic</em></div>

![Figure 6.8-2: USB Signal PCB Design](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-2: USB Signal PCB Design</em></div>

![Figure 6.8-3: USB Signal Component Placement Reference](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-3: USB Signal Component Placement Reference</em></div>

![Figure 6.8-4: USB Signal Routing Model](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-4: USB Signal Routing Model</em></div>

### 6.9. SDIO Interface Routing { #69-sdio-interface-routing }

The SF32LB58x provides 2 SDIO interfaces, SDIO1 and SDIO2. Route all signals of each SDIO interface together rather than splitting them — total trace length ≤50 mm, with intra-group length control ≤6 mm. Apply 3D shielding to the SDIO clock signal, and shield the DATA and CMD signals as well.

![Figure 6.9-1: SDIO1 Interface Circuit](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-1: SDIO1 Interface Circuit</em></div>

![Figure 6.9-2: SDIO1 PCB Routing Model](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-2: SDIO1 PCB Routing Model</em></div>

### 6.10. DSI Interface Routing { #610-dsi-interface-routing }

Place the AVDD18_DSI decoupling capacitor close to its pin, and place the DSI_REXT calibration resistor close to its pin. Route DSI signals as differential pairs controlled to 100 Ω differential impedance, with clock and data length-matched: intra-pair skew ≤0.5 mm and inter-pair skew ≤2 mm. Apply 3D shielding to each differential pair.

!!! warning "Conflicting DSI pair-to-pair limits in the source"
    The layout guide limits inter-pair skew to ≤2 mm (and intra-pair skew to ≤0.5 mm). The PCB checklist workbook instead requires the DSI data differential pairs to match the clock differential pair within 200 mil (5.08 mm). The pair-to-pair limits conflict. Keep the intra-pair limit distinct, and confirm the applicable pair-to-pair limit with SiFli before finalizing the layout.

![Figure 6.10-1: DSI Signal Circuit](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.10-1: DSI Signal Circuit</em></div>

![Figure 6.10-2: DSI Signal PCB Routing](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.10-2: DSI Signal PCB Routing</em></div>

### 6.11. DC-DC Circuit Routing { #611-dc-dc-circuit-routing }

Place the DC-DC power inductor and decoupling capacitors close to the chip pins. Keep BUCK_LX traces as short and wide as possible to minimize loop inductance in the DC-DC circuit. Add extra ground vias on all DC-DC output decoupling-capacitor ground pins connecting to the main ground plane. The BUCK_FB feedback trace must not be too thin — keep it above 0.25 mm. Prohibit copper pour on the top layer beneath the power inductor, keep the adjacent layer as a complete reference ground, and avoid routing other traces through the inductor area.

![Figure 6.11-1: DC-DC Key Component Circuit](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.11-1: DC-DC Key Component Circuit</em></div>

![Figure 6.11-2: DC-DC Key Component PCB Layout](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.11-2: DC-DC Key Component PCB Layout</em></div>

### 6.12. Power Supply Routing { #612-power-supply-routing }

PVDD1 and PVDD2 are the power inputs to the built-in PMU module — place their decoupling capacitors close to the pins and keep the traces as wide as possible, never below 0.5 mm. PVSS1 and PVSS2 are PMU module ground pins that must be connected to the main ground through vias — avoid leaving them floating, which would affect overall PMU performance.

![Figure 6.12-1: DC-DC Circuit Diagram](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.12-1: DC-DC Circuit Diagram</em></div>

![Figure 6.12-2: DC-DC PCB Routing](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.12-2: DC-DC PCB Routing</em></div>

### 6.13. LDO and IO Power Input Routing { #613-ldo-and-io-power-input-routing }

Place decoupling capacitors for all LDO outputs and IO power inputs close to their respective pins, with trace widths meeting the input current requirement — keep traces as short and wide as possible to reduce power-rail ripple and improve system stability.

![Figure 6.13-1: LDO and IO Input Power Routing Reference](../../sf32-products/chips/assets/58x/sf32lb58x-LDOIO-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.13-1: LDO and IO Input Power Routing Reference</em></div>

### 6.14. Other Interface Routing { #614-other-interface-routing }

GPADC pin signal nets require full 3D shielding and must be kept away from other interference sources, such as battery-level sensing and temperature-sensing circuits.

![Figure 6.14-1: GPADC Circuit](../../sf32-products/chips/assets/58x/sf32lb58x-GPADC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.14-1: GPADC Circuit</em></div>

Clock input/output pin signal nets, such as the 32 kHz output, likewise require full 3D shielding and must be kept away from other interference sources.

![Figure 6.14-2: 32 kHz Clock Output Circuit](../../sf32-products/chips/assets/58x/sf32lb58x-32K-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.14-2: 32 kHz Clock Output Circuit</em></div>

### 6.15. Chip Ground Routing { #615-chip-ground-routing }

The ground network under the SF32LB58x chip's central area must be fully connected by traces, ensuring an adequate ground plane connected to the main ground plane through blind/buried vias.

![Figure 6.15-1: Top-Layer Ground Signal Beneath the Chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.15-1: Top-Layer Ground Signal Beneath the Chip</em></div>

![Figure 6.15-2: Second-Layer Ground Signal Beneath the Chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.15-2: Second-Layer Ground Signal Beneath the Chip</em></div>

![Figure 6.15-3: Third-Layer Ground Signal Beneath the Chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.15-3: Third-Layer Ground Signal Beneath the Chip</em></div>

![Figure 6.15-4: Fourth-Layer Ground Signal Beneath the Chip](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-4-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.15-4: Fourth-Layer Ground Signal Beneath the Chip</em></div>

### 6.16. EMI & ESD { #616-emi-esd }

Avoid long top-layer traces outside the shield can. Clock, power, and other noise-generating signals must be routed on inner layers, not on the top layer. Place ESD protection devices close to the connector pins, routing signals through the ESD device before anything else to avoid signal branching. Ensure ESD device ground pins connect to the main ground through vias, with short and wide ground pad traces to reduce impedance and improve ESD performance.

### 6.17. Other Considerations { #617-other-considerations }

Place USB charging-line test points before the TVS diode, and place the battery-holder TVS diode before the platform connection — route so the signal always passes through the TVS before reaching the chip. Keep TVS ground-pin traces as short as possible.

!!! note "The source does not define the TVS placement reference"
    The Chinese source says to place the battery-connector TVS “before the platform” (平台) but does not identify which node or connection point “platform” means. Confirm the intended placement reference with SiFli rather than inferring it. The source separately requires the path to pass through the TVS before reaching the chip and calls for a short TVS ground trace.

![Figure 6.17-1: Power TVS Placement Reference](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.17-1: Power TVS Placement Reference</em></div>

![Figure 6.17-2: TVS Routing Reference](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.17-2: TVS Routing Reference</em></div>

To keep solder mask off the pads and preserve solder-joint reliability, vias in BGA pads must land at the center of the ball — avoid off-center placement. For improved manufacturability yield, refer to the BGA ball-connection reference figures.

![Figure 6.17-3: BGA Via Placement Reference](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-VIA-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.17-3: BGA Via Placement Reference</em></div>

![Figure 6.17-4: BGA Ball Connection Reference 1](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.17-4: BGA Ball Connection Reference 1</em></div>

![Figure 6.17-5: BGA Ball Connection Reference 2](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.17-5: BGA Ball Connection Reference 2</em></div>
