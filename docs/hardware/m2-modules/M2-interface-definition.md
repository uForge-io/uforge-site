---
icon: lucide/plug
description: "Draft M2 and M2xM contact assignments, plus unverified M2xN and M2xA summaries and signal-sharing notes."
tags:
  - Hardware
  - Module
  - Interface
---

# M2 Interface Definition { #m2-interface-definition }

!!! warning "Draft interface definition"
    This page preserves a draft M2 proposal. A local proposal workbook contains M2 and M2xM sheets, but it cites a separate `M2E接口定义_0714.xlsx` that is not present, and its approval and version provenance could not be established. No primary SiFli source confirming the assignments or counts was found. The workbook has no M2xN or M2xA sheets, so the corresponding summaries below are unverified. This is not a released μForge.io interface standard. Treat all assignments as provisional; verify the selected module, carrier, connector, electrical limits, and pin multiplexing before committing to production.

## Scope { #scope }

The local proposal workbook's M2 and M2xM sheets number positions 1–75 but omit positions 24–31 from the contact map, leaving 67 numbered contacts. Both sheets label the map as an M.2 Key-E connector; the M2xM sheet also says the M2 baseline must be included in the same module. These are proposal labels, not evidence of conformance with the [PCI-SIG M.2 specification](https://pcisig.com/specification-overview/pci-express-m2), module-to-carrier interchangeability, or the number and arrangement of physical connectors. M2xN and M2xA appear only as summaries on this page; no source contact maps for them were found.

- **M2** — connected display, audio, storage, debug, and general embedded I/O.
- **M2xM** — draft multimedia display, camera, and PDM allocation. I2S/PCM is mentioned in the draft summary but has no assignment in the available M2xM sheet.
- **M2xN** — networking, USB, CAN, and UART signals.
- **M2xA** — motor control, analog acquisition, encoder, and timer signals.

`M2xH` and `M2xP` remain naming reservations; no contacts are assigned to them in the current draft.

!!! info "Connector relationship not established"
    The local proposal workbook says M2xM requires the M2 baseline in the same module, but does not say whether their maps use separate or shared physical connectors. No connector count or arrangement can be inferred. The workbook provides no M2xN or M2xA contact maps.

## Connector convention { #connector-convention }

In the local proposal workbook's M2 sheet, odd-numbered contacts are shown on the top side and even-numbered contacts on the bottom, viewed from the card edge. Positions 24–31 are absent from the contact map and identified as the proposed key/notch area; this drawing does not establish mechanical conformance with the M.2 E-key specification.

<div align="center"><em>Table: M2 Connector and Extension Summary</em></div>

<div align="center" markdown>

| Item | Definition |
| --- | --- |
| Connector format | Draft 75-position card-edge map; 67 contacts shown; M.2 E-key conformance not verified |
| Positions omitted in the proposal | 24–31 (shown as a proposed key/notch area) |
| Base allocation | M2 |
| Multimedia allocation | M2xM |
| Extension content in this draft | M2xM contact map; M2xN and M2xA summaries only, not source-verified |
| Declaration example | `M2 + M2xM` |

</div>

## M2 base profile { #m2-base-profile }

M2 is the base profile for compact connected products. Its allocation is intended to cover a QSPI display and capacitive touch panel, Wi-Fi SDIO, 1-bit TF-card SDIO, analog audio, debug, USB, CAN, and general buses. Several contacts are intentionally multiplexed so that one module can select the function appropriate to its SoC and product configuration.

<div align="center"><em>Table: M2 Functional Allocation</em></div>

<div align="center" markdown>

| Function | Allocated signals | Design intent |
| --- | --- | --- |
| Power | `USB_VIN`, `VBAT/VBATS`, `3.3V`, `CHG_INT`, and GND | Labels in the proposal map; voltage, current, and sequencing requirements are not specified here. |
| QSPI display | `LCDC1_SPI_CS`, `CLK`, `DIO0–DIO3`, `CS2`, `TE`, `RSTB`, `LCD_BL_PWM` | QSPI display panel, backlight, and optional secondary chip select. |
| Capacitive touch | `CTP_I2C1_SDA`, `CTP_I2C1_SCL`, `CTP_INT`, `CTP_REST` | Capacitive-touch control and interrupt. |
| Wi-Fi | `WiFi_SD2_CLK`, `CMD`, `D0–D3`, `PDN`, `INT`, `WAKE` | 4-bit SDIO Wi-Fi companion interface. |
| TF card | `TF_SD1_CMD`, `CLK`, `D0`, `TF_DET` | 1-bit TF-card interface and card detect. |
| Analog audio | `ADC_1P/N`, `ADC_2P/N`, `MIC_BIAS`, `DAC_1P/N`, `DAC_2P/N`, `AU_PA_EN` | Two analog-input pairs, microphone bias, two DAC pairs, and PA enable. |
| Debug and recovery | `DBG_UART1_TXD/RXD`, `SWDIO`, `SWCLK`, `SWD_SW`, `BOOT_MODE` | Debug UART, SWD, and boot/recovery selection. |
| General serial buses | SPI1/SPI2, I2C2–I2C4, UART2/UART3, and general GPIO/bus lines (`G0–G17`/`BUS0–BUS17`) | Product-specific buses selected through the module pin mux; I2C1 is allocated to the touch controller. Several SPI2/I2C3/I2C4/UART3 positions can alternatively carry `PDM1`/`PDM2` digital-microphone signals. |
| Other control | `CAN_TX/RX`, USB/USB host signals, `PWR_KEY` | Field bus, USB role control, and power-key input. |

</div>

## Color-coded M2 pinout { #color-coded-m2-pinout-guide }

<div align="center"><em>Figure: M2 Signal-Group Color Legend</em></div>

<div class="m2-visual-guide" role="img" aria-label="Color key for the M2 two-sided pinout table">
<div class="m2-category-band">
<div class="m2-category m2-audio">Audio</div>
<div class="m2-category m2-display">Display</div>
<div class="m2-category m2-touch">Touch</div>
<div class="m2-category m2-wireless">Wi-Fi / SDIO</div>
<div class="m2-category m2-bus">SPI / I²C / UART</div>
<div class="m2-category m2-power">USB / Power</div>
<div class="m2-category m2-debug">Dedicated</div>
</div>
</div>

The colored bar is the table key. The two-sided contact table below records this M2 proposal's reference pinout, including alternate functions and multiplexing; it is not a released interface specification.

### M2 contact assignment { #m2-contact-assignment }

This two-sided grid uses Bottom Pin / Top Pin / CN1 columns. The `Alt` columns record an additional multiplexed function when the workbook assigns one. Every function cell uses its category color from the legend above.

<div align="center"><em>Table: M2 Base Contact Assignment</em></div>

<div align="center" markdown class="m2-grid-scroll" style="max-width: 100%; overflow-x: auto;" tabindex="0">
<table class="m2-grid" markdown="0">
<thead>
<tr><th>Alt</th><th>Function</th><th>Bot&nbsp;pin</th><th>CN1</th><th>Top&nbsp;pin</th><th>Function</th><th>Alt</th></tr>
</thead>
<tbody>
<tr><td class="m2-alt m2-wireless">SDIO2_D2 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D2</td><td class="m2-pin">74</td><td class="m2-cn1"></td><td class="m2-pin">75</td><td class="m2-fn m2-wireless">TF_DET</td><td class="m2-alt m2-wireless">SDIO1_D1 / SPI1_MOSI / UART2_RXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D3 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D3</td><td class="m2-pin">72</td><td class="m2-cn1"></td><td class="m2-pin">73</td><td class="m2-fn m2-wireless">TF_SD1_D0</td><td class="m2-alt m2-wireless">SDIO1_D0 / SPI1_MISO / UART2_TXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CMD / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CMD</td><td class="m2-pin">70</td><td class="m2-cn1"></td><td class="m2-pin">71</td><td class="m2-fn m2-wireless">TF_SD1_CLK</td><td class="m2-alt m2-wireless">SDIO1_CLK / SPI1_SCK / UART2_CTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CLK / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CLK</td><td class="m2-pin">68</td><td class="m2-cn1"></td><td class="m2-pin">69</td><td class="m2-fn m2-wireless">TF_SD1_CMD</td><td class="m2-alt m2-wireless">SDIO1_CMD / SPI1_CS# / UART2_RTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D0 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D0</td><td class="m2-pin">66</td><td class="m2-cn1"></td><td class="m2-pin">67</td><td class="m2-fn m2-wireless">WiFi_WAKE</td><td class="m2-alt m2-wireless">SDIO1_D3 / CAN_RX</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D1 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D1</td><td class="m2-pin">64</td><td class="m2-cn1"></td><td class="m2-pin">65</td><td class="m2-fn m2-wireless">WiFi_INT</td><td class="m2-alt m2-wireless">SDIO1_D2 / CAN_TX</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">62</td><td class="m2-cn1"></td><td class="m2-pin">63</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">GPADC</td><td class="m2-fn m2-debug">PWR_KEY</td><td class="m2-pin">60</td><td class="m2-cn1"></td><td class="m2-pin">61</td><td class="m2-fn m2-power">USBHOST_D−</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_DATA / I2C3_SDA / UART2_RXD / G0/BUS0</td><td class="m2-fn m2-bus">SPI2_MISO</td><td class="m2-pin">58</td><td class="m2-cn1"></td><td class="m2-pin">59</td><td class="m2-fn m2-power">USBHOST_D+</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_CLK / I2C3_SCL / UART2_TXD / G1/BUS1</td><td class="m2-fn m2-bus">SPI2_MOSI</td><td class="m2-pin">56</td><td class="m2-cn1"></td><td class="m2-pin">57</td><td class="m2-fn m2-power">USB_OTG</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM2_DATA / I2C4_SDA / UART3_RXD / UART2_CTS / G2/BUS2</td><td class="m2-fn m2-bus">SPI2_SCK</td><td class="m2-pin">54</td><td class="m2-cn1"></td><td class="m2-pin">55</td><td class="m2-fn m2-touch">CTP_I2C1_SDA</td><td class="m2-alt m2-bus">G5/BUS5</td></tr>
<tr><td class="m2-alt m2-bus">PDM2_CLK / I2C4_SCL / UART3_TXD / UART2_RTS / G3/BUS3</td><td class="m2-fn m2-bus">SPI2_CS#</td><td class="m2-pin">52</td><td class="m2-cn1"></td><td class="m2-pin">53</td><td class="m2-fn m2-touch">CTP_I2C1_SCL</td><td class="m2-alt m2-bus">G6/BUS6</td></tr>
<tr><td class="m2-alt m2-bus">G4/BUS4</td><td class="m2-fn m2-power">CHG_INT</td><td class="m2-pin">50</td><td class="m2-cn1"></td><td class="m2-pin">51</td><td class="m2-fn m2-touch">CTP_INT</td><td class="m2-alt m2-debug">G7/BUS7 / SWDIO</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">USB_VIN</td><td class="m2-pin">48</td><td class="m2-cn1"></td><td class="m2-pin">49</td><td class="m2-fn m2-touch">CTP_REST</td><td class="m2-alt m2-debug">G8/BUS8 / SWCLK</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">46</td><td class="m2-cn1"></td><td class="m2-pin">47</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">3.3V</td><td class="m2-pin">44</td><td class="m2-cn1"></td><td class="m2-pin">45</td><td class="m2-fn m2-power">VBAT/VBATS</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">G9/BUS9</td><td class="m2-fn m2-power">USB_DET</td><td class="m2-pin">42</td><td class="m2-cn1"></td><td class="m2-pin">43</td><td class="m2-fn m2-debug">DBG_UART1_TXD</td><td class="m2-alt m2-debug">SWDIO</td></tr>
<tr><td class="m2-alt m2-bus">G10/BUS10</td><td class="m2-fn m2-wireless">WiFi_PDN</td><td class="m2-pin">40</td><td class="m2-cn1"></td><td class="m2-pin">41</td><td class="m2-fn m2-debug">DBG_UART1_RXD</td><td class="m2-alt m2-debug">SWCLK</td></tr>
<tr><td class="m2-alt m2-bus">UART3_RXD</td><td class="m2-fn m2-bus">G11/BUS11</td><td class="m2-pin">38</td><td class="m2-cn1"></td><td class="m2-pin">39</td><td class="m2-fn m2-bus">G14/BUS14</td><td class="m2-alt m2-bus">UART2_RXD</td></tr>
<tr><td class="m2-alt m2-bus">UART3_TXD</td><td class="m2-fn m2-bus">G12/BUS12</td><td class="m2-pin">36</td><td class="m2-cn1"></td><td class="m2-pin">37</td><td class="m2-fn m2-bus">G15/BUS15</td><td class="m2-alt m2-bus">UART2_TXD</td></tr>
<tr><td class="m2-alt m2-bus">I2C2_SCL</td><td class="m2-fn m2-bus">G13/BUS13</td><td class="m2-pin">34</td><td class="m2-cn1"></td><td class="m2-pin">35</td><td class="m2-fn m2-bus">G16/BUS16</td><td class="m2-alt m2-bus">I2C2_SDA</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">32</td><td class="m2-cn1"></td><td class="m2-pin">33</td><td class="m2-fn m2-audio">AU_PA_EN</td><td class="m2-alt m2-bus">G17/BUS17</td></tr>
<tr><td class="m2-blank"></td><td class="m2-notch" colspan="2">Positions 24–31 omitted (proposed key/notch area)</td><td class="m2-cn1"></td><td class="m2-notch" colspan="2">Positions 24–31 omitted (proposed key/notch area)</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1N</td><td class="m2-pin">22</td><td class="m2-cn1"></td><td class="m2-pin">23</td><td class="m2-fn m2-audio">DAC_2N</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1P</td><td class="m2-pin">20</td><td class="m2-cn1"></td><td class="m2-pin">21</td><td class="m2-fn m2-audio">DAC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_2N</td><td class="m2-pin">18</td><td class="m2-cn1"></td><td class="m2-pin">19</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">MIC_BIAS</td><td class="m2-pin">16</td><td class="m2-cn1"></td><td class="m2-pin">17</td><td class="m2-fn m2-audio">ADC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_1N</td><td class="m2-pin">14</td><td class="m2-cn1"></td><td class="m2-pin">15</td><td class="m2-fn m2-audio">ADC_1P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS2</td><td class="m2-pin">12</td><td class="m2-cn1"></td><td class="m2-pin">13</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO2</td><td class="m2-pin">10</td><td class="m2-cn1"></td><td class="m2-pin">11</td><td class="m2-fn m2-display">LCDC1_SPI_DIO3</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO0</td><td class="m2-pin">8</td><td class="m2-cn1"></td><td class="m2-pin">9</td><td class="m2-fn m2-display">LCDC1_SPI_DIO1</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS</td><td class="m2-pin">6</td><td class="m2-cn1"></td><td class="m2-pin">7</td><td class="m2-fn m2-display">LCDC1_SPI_CLK</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCD_BL_PWM</td><td class="m2-pin">4</td><td class="m2-cn1"></td><td class="m2-pin">5</td><td class="m2-fn m2-display">LCDC1_SPI_TE</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-debug">SWD_SW</td><td class="m2-pin">2</td><td class="m2-cn1"></td><td class="m2-pin">3</td><td class="m2-fn m2-display">LCDC1_SPI_RSTB</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-blank">—</td><td class="m2-pin">—</td><td class="m2-cn1"></td><td class="m2-pin">1</td><td class="m2-fn m2-debug">BOOT_MODE</td><td class="m2-blank"></td></tr>
</tbody>
</table>
</div>

### M2 pin descriptions { #m2-pin-descriptions }

The groups and colors match the contact table above. The workbook does not define I/O directions, so this column is provisional integration guidance, viewed from the module: I means input, O means output, and I/O means bidirectional. Comma-separated directions follow the listed signal order. SPI and PDM entries assume the module supplies the clock; SWD entries assume an external debugger. Confirm every direction and electrical requirement against the selected module and SoC documentation.

For I2C, I/O describes the bidirectional SDA/SCL bus lines, not a guarantee of every controller/target mode or clock-stretching capability. Confirm pin configuration and pull-ups for the actual module. See [NXP's I2C-bus specification](https://www.nxp.com/docs/en/user-guide/UM10204.pdf). The PDM clock-output/data-input assumption follows the microphone-host arrangement illustrated in [ST's PDM application note](https://www.st.com/resource/en/application_note/an5027-interfacing-pdm-digital-microphones-using-stm32-mcus-and-mpus-stmicroelectronics.pdf); it does not establish support on a particular module.

<div align="center"><em>Table: M2 Signal Descriptions and Provisional Directions</em></div>

<div align="center" markdown>

| Signal group | Signal | I/O | Description |
| --- | --- | :---: | --- |
| <span class="m2-chip m2-power">Power</span> | `VBAT/VBATS` | I | Battery-input rail. |
| <span class="m2-chip m2-power">Power</span> | `3.3V` | I | 3.3 V supply rail. |
| <span class="m2-chip m2-power">Power</span> | `CHG_INT` | O | Charger interrupt / status output. |
| <span class="m2-chip m2-power">Power</span> | `USB_VIN` | I | USB input / charging-path rail. |
| <span class="m2-chip m2-power">Power</span> | `USB_DET` | I | USB detection signal. |
| <span class="m2-chip m2-power">Power</span> | `USBHOST_D+`, `USBHOST_D−` | I/O | USB host-mode data pair, separate from the primary USB port. |
| <span class="m2-chip m2-power">Power</span> | `USB_OTG` | I/O | Signal label in the proposal workbook; that sheet marks it “Not supported on current platform.” Do not infer support from the contact label. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_CS`, `LCDC1_SPI_CS2` | O | QSPI display primary and optional secondary chip select. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_CLK` | O | QSPI display clock. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_DIO0`–`DIO3` | I/O | QSPI display data lines. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_TE` | I | Tearing-effect sync input from the panel. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_RSTB` | O | Display panel reset, active low. |
| <span class="m2-chip m2-display">Display</span> | `LCD_BL_PWM` | O | Backlight PWM control. |
| <span class="m2-chip m2-touch">Touch</span> | `CTP_I2C1_SDA`, `CTP_I2C1_SCL` | I/O | Capacitive-touch controller I²C bus. |
| <span class="m2-chip m2-touch">Touch</span> | `CTP_INT` | I | Touch-controller interrupt. |
| <span class="m2-chip m2-touch">Touch</span> | `CTP_REST` | O | Touch-controller reset. The workbook spells this signal `CTP_REST`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_CLK`, `WiFi_SD2_CMD` | O, I/O | Wi-Fi companion SDIO clock and command. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_D0`, `WiFi_SD2_D1`, `WiFi_SD2_D2`, `WiFi_SD2_D3` | I/O | Wi-Fi companion SDIO data lines (4-bit). |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_PDN` | O | Wi-Fi module power-down control. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_INT` | I | Wi-Fi interrupt. Shares pin 65 with `SDIO1_D2`/`CAN_TX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_WAKE` | I/O | Wi-Fi wake signal. Shares pin 67 with `SDIO1_D3`/`CAN_RX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_SD1_CMD`, `TF_SD1_CLK`, `TF_SD1_D0` | I/O, O, I/O | 1-bit TF-card SDIO command, clock, and data. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_DET` | I | TF-card presence detect. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `SDIO1_D0–D3`, `SDIO2_D0–D3` | I/O | Generic controller-level aliases for the same physical lines as the TF-card (SDIO1) and Wi-Fi companion (SDIO2) buses; use the role-specific names above unless the module needs full 4-bit SDIO on both sides. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `CAN_TX`, `CAN_RX` | O, I | Logic-level CAN transceiver interface, multiplexed onto pins 65 and 67 alongside `WiFi_INT`/`WiFi_WAKE`. The carrier still needs a CAN transceiver and protection appropriate to the product bus. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `GPADC` | I | Wi-Fi SDIO contacts 74, 72, 70, 68, 66, and 64, plus `PWR_KEY` on contact 60, have ADC alternate functions in this map. |
| <span class="m2-chip m2-audio">Audio</span> | `ADC_1P/N`, `ADC_2P/N` | I | Two differential analog-microphone input pairs. |
| <span class="m2-chip m2-audio">Audio</span> | `MIC_BIAS` | O | Microphone bias supply. |
| <span class="m2-chip m2-audio">Audio</span> | `DAC_1P/N`, `DAC_2P/N` | O | Two differential audio-output pairs. |
| <span class="m2-chip m2-audio">Audio</span> | `AU_PA_EN` | O | Audio power-amplifier enable. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI1_CS#`, `SPI1_SCK`, `SPI1_MOSI`, `SPI1_MISO` | O, O, O, I | SPI1, multiplexed with the TF-card path. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI2_CS#`, `SPI2_SCK`, `SPI2_MOSI`, `SPI2_MISO` | O, O, O, I | SPI2, multiplexed with I2C3 and UART2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C2_SDA`, `I2C2_SCL` | I/O | I2C2 uses SDA on contact 35 and SCL on contact 34. The earlier `MPI/SD` sharing description is not established by this contact map. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C3_SDA`, `I2C3_SCL` | I/O | I2C3, multiplexed with SPI2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C4_SDA`, `I2C4_SCL` | I/O | I2C4, multiplexed with SPI2 and UART3. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART2_TXD/RXD`, `UART2_CTS/RTS` | O/I, I/O | UART2 has alternative positions in the TF-card and SPI2 groups and on contacts 39/37. The earlier `MPI/SD` sharing description is unconfirmed; check the module's actual mux selection. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART3_TXD/RXD` | O/I | UART3 has alternatives in the SPI2/I2C4 group and on contacts 38/36. The earlier `MPI/SD` sharing description is unconfirmed; check the module's actual mux selection. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `G0–G17`/`BUS0–BUS17` | I/O | Generic GPIO/bus contacts, multiplexed with SPI2, I2C2–I2C4, UART2/UART3, `PDM1`/`PDM2`, or SWD depending on position. |
| <span class="m2-chip m2-audio">Audio</span> | `PDM1_CLK/DATA`, `PDM2_CLK/DATA` | O, I | For each digital-microphone pair, CLK is a module output and DATA a module input. These functions share contacts 58, 56, 54, and 52 with SPI2/I2C3/I2C4/UART3. |
| <span class="m2-chip m2-debug">Dedicated</span> | `DBG_UART1_TXD/RXD` | O/I | Debug UART, multiplexed with SWD. |
| <span class="m2-chip m2-debug">Dedicated</span> | `SWDIO`, `SWCLK` | I/O, I | SWD debug port. Two alternative sharing options: the debug-UART positions (pins 43/41) or the touch interrupt/reset positions (pins 51/49). Only one should be populated per module. |
| <span class="m2-chip m2-debug">Dedicated</span> | `SWD_SW` | I | Signal label in the proposal workbook; its routing-control behavior is not specified. |
| <span class="m2-chip m2-debug">Dedicated</span> | `BOOT_MODE` | I | Boot / recovery mode select. |
| <span class="m2-chip m2-debug">Dedicated</span> | `PWR_KEY` | I | Power-key signal. |
| <span class="m2-chip m2-gnd">Ground</span> | `GND` | — | Digital and analog return paths, distributed across the connector. |

</div>

!!! info "Wi-Fi SDIO data-label correction"
    The local proposal workbook assigns contact 64 to `WiFi_SD2_D1` and notes that an earlier revision duplicated the D3 label there. This records a correction within the draft workbook only; it is not primary SiFli pin-mux confirmation. Both SDIO buses also carry generic controller-level aliases in the Alt column — `SDIO2_D0–D3`/`SDIO2_CMD`/`SDIO2_CLK` for the Wi-Fi companion bus, `SDIO1_D0–D3`/`SDIO1_CMD`/`SDIO1_CLK` for the TF-card bus — alongside their role-specific names.

### M2 sharing rules { #m2-sharing-rules }

- The workbook marks SWD as a multiplexed resource with two alternative routing options: the debug-UART positions (`SWDIO` on pin 43, `SWCLK` on pin 41) or the touch interrupt/reset positions (`SWDIO` on pin 51, `SWCLK` on pin 49). Populate only one option per module and reserve a recovery strategy before reusing any of these contacts.
- SPI1 is shared with the 1-bit TF-card path; both are also exposed as the generic `SDIO1_D0–D3`/`CMD`/`CLK` controller bus, and pins 65/67 additionally carry `CAN_TX`/`CAN_RX`.
- The Wi-Fi SDIO2 data lines are also exposed as the generic `SDIO2_D0–D3`/`CMD`/`CLK` controller bus; several of the same contacts double as `GPADC` analog inputs.
- SPI2 and I2C3/I2C4 (contacts 58, 56, 54, and 52) can alternatively carry `PDM1`/`PDM2` digital-microphone signals, plus generic `G0–G3`/`BUS0–BUS3` GPIO aliases.
- In the six-position `G11–G16`/`BUS11–BUS16` group, UART3 uses contacts 38/36, UART2 uses 39/37, and I2C2 uses SDA/SCL on 35/34. These are distinct pairs, not three buses sharing identical pins. Each pair shares its contacts with the corresponding GPIO aliases; confirm simultaneous operation on the selected module.
- The QSPI display and capacitive-touch groups are separate at the signal level, but their power, reset, and wake behavior must be reviewed as one display subsystem.
- `CAN_TX` and `CAN_RX` are logic-level signals multiplexed onto pins 65/67, not separately allocated contacts. The carrier still needs a CAN transceiver and protection appropriate to the product bus.

## M2xM multimedia profile { #m2xm-multimedia-profile }

M2xM is a draft multimedia allocation. The local proposal workbook marks DPI and DVP as primary signal groups and MIPI DSI and CSI as alternatives, but does not define mux control or concurrent-use constraints. These labels do not establish support on a particular μForge module or SoC package; confirm device capability and routing in the selected module documentation before implementation.

<div align="center"><em>Table: M2xM Functional Allocation</em></div>

<div align="center" markdown>

| Function | Labels in the proposal workbook | Evidence and limits |
| --- | --- | --- |
| RGB / DPI display | `R0–R7`, `G0–G7`, `B0–B7`, `DPI_CLK`, `DPI_DE`, `DPI_HSYNC`, `DPI_VSYNC`, and shared display-control labels | DPI is marked primary. The workbook does not list 8080 or EPD assignments. |
| MIPI DSI | `DSI_D0±`–`DSI_D3±`, `DSI_C±`, reset, backlight PWM, and I2C labels | DSI is marked as an alternative; six contacts are designated as shield ground. No TE signal is assigned in the workbook. |
| Touch control | Generic `I2C_SCL`, `I2C_SDA`, and `RESET` labels | The M2xM sheet does not identify a touch-specific interrupt/reset mapping; touch-controller support is unverified. |
| 12-bit DVP camera | `D0–D11`, MCLK, PCLK, HSYNC, VSYNC, PWDN, reset, and I2C labels | Twenty contacts are shown; the workbook does not identify an I2C controller number. |
| MIPI CSI | D0/D1 differential lanes, clock pair, PWDN, reset, and I2C labels | CSI is marked as an alternative; four contacts are designated as shield ground. Multiplexing and concurrent-use details are not specified. |
| Digital microphones | `PDM1_CLK/DATA` and `PDM2_CLK/DATA` | Four PDM signals are shown. |
| I2S / PCM | No I2S/PCM signal or contact assignment appears in the available M2xM sheet. | The allocation is unverified; do not treat I2S/PCM as part of this map without an approved source. |

</div>


## M2xN networking profile { #m2xn-networking-profile }

M2xN is an unverified networking-profile summary in this document, not a source-backed contact map. The available proposal workbook has no M2xN sheet, and no primary SiFli source for these assignments was found. The signal list and reserved-contact counts below must not be treated as verified.

<div align="center"><em>Table: M2xN Functional Allocation</em></div>

<div align="center" markdown>

| Function | Draft summary (unverified) |
| --- | --- |
| Ethernet | The draft text contains conflicting labels: Gigabit Ethernet / RGMII and `RMII_*` signals. No M2xN source map or primary SiFli source is available here to resolve them. Interface type and speed are unverified; do not claim either for a product until confirmed by an approved source. |
| USB | `USB1_D±`, `USB1_DET`, `USB1_OTG`, `USB2_D±`, `USB2_DET`, `USB2_OTG` |
| CAN | `CAN1_TX/RX` through `CAN4_TX/RX`, plus `CAN1/2_STB` and `CAN1/2_ERR_N` controls where assigned |
| UART | `UART1_TX/RX/CTS/RTS` and `UART2_TX/RX/CTS/RTS` |
| Reserved | 15 GPIO contacts and 12 GND contacts |

</div>

## M2xA analog and motion-control profile { #m2xa-analog-and-motion-control-profile }

M2xA is an unverified motor-control and acquisition summary in this document, not a source-backed contact map. The available proposal workbook has no M2xA sheet, and no primary SiFli source for these assignments was found. Signal names, counts, and physical assignments below must not be treated as verified.

<div align="center"><em>Table: M2xA Functional Allocation</em></div>

<div align="center" markdown>

| Function | Draft summary (unverified) |
| --- | --- |
| BLDC control | The draft lists `PWM1_OUT/OUTN`, `PWM2_OUT/OUTN`, `PWM3_OUT/OUTN`, `BKIN1/2`, `DRV_EN`, and `DRV_NFAULT`. It gives two inconsistent five-channel analog-input labels (`ADC_IU/V/W`, `ADC_VBUS`, `ADC_NTC` and `ADC_IN1–ADC_IN5`); a separate M2xA summary lists `ADC0–ADC2`. No M2xA source map or primary SiFli source was found to verify the names, count, or assignments. Treat these as unresolved until an approved interface source is available. |
| Position feedback | `H_A`, `H_B`, `H_C`, `ENC_A`, `ENC_B`, `ENC_Z` |
| General timing | `TIM_CH1–TIM_CH6` |
| Reserved | 27 GPIO contacts and 13 GND contacts |

</div>

## Module declaration and implementation checklist { #module-declaration-and-implementation-checklist }

A module declaration should identify its base allocation and each supported extension map, for example `M2`, `M2 + M2xM`, or `M2 + M2xN + M2xA`. It should state the number of M2-form connectors implemented, their category, the implemented optional functions, and any mutually exclusive modes.

Before adopting this draft, verify:

- Whether the proposed connector footprint, card outline, retention hardware, and insertion orientation meet the applicable M.2 requirements.
- The number, placement, and category of M2-form connectors on the module and carrier.
- All multiplexed functions selected by the module, including any shared SDIO1/SDIO2, PDM, SWD (debug-UART vs. touch interrupt/reset), or CAN routing.
- Module-specific I/O voltage, current, reset, boot, and power-sequencing requirements.
- Whether a claimed M2xM MIPI, RGB, DVP, PDM, or I2S function is supported simultaneously or only as an alternate mode.
- Carrier-side requirements for CAN transceivers, USB protection, TF-card power/detect, display power, audio amplification, and external PHYs.
