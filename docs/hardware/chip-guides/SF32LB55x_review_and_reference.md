---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Design review checklist, related documents and references, appendices, and revision history for the SF32LB55x hardware design guide."
tags:
    - Hardware
    - Chip
---

# SF32LB55x Hardware Design Guide — Design Review Checklist and References { #sf32lb55x-hardware-design-guide-design-review-checklist-and-references }

## 7. Design Review Checklist { #7-design-review-checklist }

- [ ] Exact package, pinout, land pattern, and PCB process are confirmed.
- [ ] All PMU and auxiliary power rails match the datasheet voltage/current limits.
- [ ] Required decoupling capacitors are placed close to pins.
- [ ] POR/BOR/reset timing and boot mode are verified.
- [ ] 48 MHz and 32.768 kHz crystals meet CL, ppm, ESR, placement, and routing requirements.
- [ ] RF matching, antenna, and ground keep-out are reviewed.
- [ ] External memory and display pin groups match the selected package.
- [ ] Wake, GPADC, sensor, audio, touch, backlight, and motor circuits meet low-power requirements.
- [ ] Debug, download, production flashing, RF test, and crystal calibration access are reserved.

## 8. Related Documents and References { #8-related-documents-and-references }

Use the latest official documents when checking electrical limits, package data, pin multiplexing, software configuration, component qualification, and manufacturing constraints.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[SF32LB55x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List (AVL)]__
- :fontawesome-brands-wikipedia-w: __[SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

The [Schematic Checklist](SF32LB55x_schematic_checklist.md) (Section 5.8) and Section 6.4 of the [PCB Layout Guidelines](SF32LB55x_pcb_layout.md) reproduce the same *SF32LB55x Schematic & PCB Checklist* (V1.0, 2026-01-21) item by item, alongside the schematic and PCB layout guidance they check against.

[SF32LB55x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Appendices { #9-appendices }

### 9.1. Appendix A. A Typical SF32LB55x Product { #appendix-a-a-typical-sf32lb55x-product }

A typical SF32LB55x product includes the MCU, power tree, crystals, RF matching and antenna, external memory, display and touch controller, sensors, GPADC inputs, vibration motor, optional Bluetooth audio, debug access, and production test access. Battery-powered designs should also include low-power leakage review and fixture-access planning.

### 9.2. Design Q&A { #91-design-qa }

1. **Why do some GPIO defaults differ from the specification when Mode = 1?** Download mode changes the states of GPIOs associated with external Flash on QSPI2 and QSPI3.
2. **Why can a surface-mount motor vibrate unexpectedly during programming?** Its power-enable or PWM signal may be asserted unexpectedly. If a high level starts the motor, a GPIO with a default pull-up (PU) can power it on; SiFli recommends using default-pull-down (PD) GPIO17 or GPIO39 for PWM.
3. **Why can soldering the battery cause the chip to hang, and how can this be prevented?** Poor grounding of the soldering iron can cause a surge. Add surge and ESD protection at the battery interface and ensure the iron is properly grounded.
4. **Why does a wake button fail to wake the MCU from Hibernate?** Only the six LCPU wake inputs, GPIO43–GPIO48, can wake the MCU from Hibernate; the HCPU-side GPIO0–GPIO3 cannot.
5. **Why can a G-sensor or heart-rate sensor draw too much power or malfunction during low-power debugging?** Its firmware runs on the LCPU, so its I2C, SPI, control, and interrupt signals must all use LCPU interfaces. Assigning any of them to an HCPU interface can increase power or cause malfunction.
6. **Why can sensor power remain high even when all signals use LCPU interfaces?** Turning off the sensor rail alone is insufficient if the pull-up supply for its I2C or interrupt signals remains on. Disable those interface pull-up supplies as well.
7. **Why can using both GPIO26 and GPIO27 as output controls increase sleep current?** Make their levels identical during sleep, or place at least one in high impedance with no pull-up or pull-down.
8. **How should high Hibernate current on SS6600 be investigated?** Keep all ten wake inputs stable at a defined high or low level: HCPU GPIO0–GPIO3 and LCPU GPIO43–GPIO48. If all ten are pulled up, use an always-on 3.3 V supply for the pull-ups.
9. **Can power-component quiescent current explain excessive low-power consumption?** Yes. BUCK converters, LDOs, and load switches with high quiescent current (Iq) increase consumption; SiFli recommends parts with Iq below 1 µA.
10. **How can display artifacts during ESD testing be prevented?** Add ESD devices to the touch-panel VDD, SCL, SDA, RESET, and INT signals, as well as LCD power and RESET signals.
11. **How can abnormal always-on-display behavior be avoided?** This function is mainly used with AMOLED panels, whose power is lower than TFT panels. PB GPIOs are recommended for LCD_EN, LCD_RST, and related controls. If a PA GPIO drives an active-high enable, it must have a default pull-up (PU); using a default-pull-down (PD) PA GPIO can leave the display abnormally blank for more than 10 ms after wake.
12. **How can external Bluetooth audio power-control faults after wake be avoided when the module must stay powered during sleep?** Use an LCPU GPIO to control its power switch. For an active-low switch, select an LCPU GPIO with a default pull-down (PD).
13. **How can charging be made reliable after battery over-discharge?** When battery voltage is too low, power-path management should let the charger input power the system after a charger is connected. Without power-path management, the selected charger IC must provide a trickle-charge current of at least 40 mA.
14. **Why might charging not start after connecting a charger?** The charger-insertion detect signal must connect to one of the wake-capable LCPU GPIOs, GPIO43–GPIO48. Using another GPIO can prevent the charging sequence from starting correctly.
15. **How can excessive current in download mode be avoided when MODE is high?** For high-current peripherals such as an audio PA with an active-high enable, use a default-pull-down (PD) GPIO for control, never a default-pull-up (PU) GPIO. Download mode may otherwise turn the peripheral on and disrupt programming.
16. **Why can programming fail when MODE is high, and what is the workaround for a sensor interrupt on GPIO46?** In download mode GPIO46 defaults to UART3_RX, which can interfere with programming. Move the sensor interrupt to GPIO43, GPIO44, GPIO47, or GPIO48. If more LCPU wake inputs are needed, connect an off-board button to GPIO45 or GPIO46 through a 0 Ω resistor.
17. **What should be done if the G-sensor and heart-rate algorithms exceed the available memory resources?** Check whether the memory allocated to the LCPU is sufficient. If it is not, add external NOR Flash on QSPI4.

## 10. Revision History { #10-revision-history }

<div align="center"><em>Table 10-1: Revision History</em></div>

<div align="center" markdown>

| Version | Date | Notes |
|:---|:---|:---|
| 0.1 | 2026-07 | Initial SF32LB55x hardware design guide generated from the official SiFli wiki hardware application note. |

</div>

### 10.1. Checklist Revision History { #101-checklist-revision-history }

The item-by-item checklist in the [Schematic Checklist](SF32LB55x_schematic_checklist.md) and Section 6.4 of the [PCB Layout Guidelines](SF32LB55x_pcb_layout.md) is versioned separately from the guide, following SiFli's own *SF32LB55x Schematic & PCB Checklist* workbook.

<div align="center"><em>Table 10.1-1: Checklist Revision History</em></div>

<div align="center" markdown>

| No. | Version | Date | Release Notes |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Initial release of the Schematic & PCB Checklist document |

</div>
