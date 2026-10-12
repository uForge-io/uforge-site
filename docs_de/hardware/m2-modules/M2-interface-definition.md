---
icon: lucide/plug
description: "Entwurf der M2- und M2xM-Kontaktbelegungen sowie ungeprüfte M2xN-/M2xA-Zusammenfassungen und Hinweise zur Signalteilung."
tags:
  - Hardware
  - Modul
  - Schnittstelle
---

# M2-Schnittstellendefinition { #m2-interface-definition }

!!! warning "Entwurf der Schnittstellendefinition"
    Diese Seite dokumentiert einen M2-Entwurf. Eine lokal verfügbare Arbeitsmappe mit einem Vorschlag enthält Blätter zu M2 und M2xM. Sie verweist jedoch auf die separate Quelldatei `M2E接口定义_0714.xlsx`, die hier nicht vorliegt; Version und Freigabestatus des Vorschlags ließen sich nicht feststellen. Auch eine SiFli-Primärquelle, die Belegungen oder Kontaktzahlen bestätigt, wurde nicht gefunden. Die Arbeitsmappe enthält keine M2xN- oder M2xA-Blätter; die entsprechenden Zusammenfassungen unten sind daher ungeprüft. Dies ist kein veröffentlichter μForge.io-Schnittstellenstandard. Behandeln Sie alle Belegungen als vorläufig und prüfen Sie das ausgewählte Modul, die Trägerplatine, den Steckverbinder, elektrische Grenzwerte und Pin-Multiplexing, bevor Sie sich auf ein Produktionsdesign festlegen.

## Umfang { #scope }

Die M2- und M2xM-Blätter der lokalen Arbeitsmappe nummerieren die Positionen von 1 bis 75. In der Kontaktbelegung fehlen die Positionen 24–31; auf jedem Blatt sind daher 67 Kontakte nummeriert. Beide kennzeichnen die Belegung als Zuordnung für einen M.2-Key-E-Steckverbinder. Das M2xM-Blatt verlangt außerdem, dass dasselbe Modul auch die M2-Basisschnittstelle enthält. Diese Angaben sind Kennzeichnungen des Vorschlags. Sie belegen weder die Konformität mit der [PCI-SIG-M.2-Spezifikation](https://pcisig.com/specification-overview/pci-express-m2) noch die Austauschbarkeit von Modul und Trägerplatine. Auch Anzahl und Anordnung physischer Steckverbinder gehen daraus nicht hervor. Dieser Artikel enthält außerdem Zusammenfassungen zu M2xN und M2xA; ursprüngliche Kontaktpläne für diese Profile wurden nicht gefunden.

- **M2** — Anschlüsse für Display, Audio, Speicher, Debug und allgemeine Embedded-E/A.
- **M2xM** — Entwurf einer Multimedia-Belegung für Display, Kamera und PDM. I2S/PCM wird in der Zusammenfassung erwähnt, ist im verfügbaren M2xM-Blatt aber nicht zugewiesen.
- **M2xN** — Netzwerk-, USB-, CAN- und UART-Signale.
- **M2xA** — Motorsteuerung, analoge Erfassung, Encoder- und Timer-Signale.

Im aktuellen Entwurf sind `M2xH` und `M2xP` als Namen reserviert; Kontakte sind ihnen nicht zugewiesen.

!!! info "Zuordnung zu Steckverbindern nicht festgelegt"
    Laut lokaler Arbeitsmappe muss ein Modul mit M2xM auch die M2-Basisschnittstelle enthalten. Die Arbeitsmappe legt jedoch nicht fest, ob die beiden Belegungen getrennte oder gemeinsam genutzte physische Steckverbinder darstellen. Anzahl und Anordnung lassen sich daraus nicht ableiten. Kontaktbelegungen für M2xN und M2xA sind in der Arbeitsmappe nicht enthalten.

## Steckverbinderkonvention { #connector-convention }

Im M2-Blatt der lokalen Arbeitsmappe sind von der Kartenkante aus gesehen ungerade Kontakte auf der Oberseite und gerade Kontakte auf der Unterseite dargestellt. Die Positionen 24–31 fehlen in der Kontaktbelegung und sind im Vorschlag als Bereich für die Kodierkerbe markiert. Diese Zeichnung belegt keine mechanische Konformität mit der M.2-E-Key-Spezifikation.

<div align="center"><em>Tabelle: M2-Steckverbinder- und Erweiterungsübersicht</em></div>

<div align="center" markdown>

| Element | Definition |
| --- | --- |
| Steckverbinderformat | Vorgeschlagene Kartenrand-Belegung, nummeriert von 1 bis 75; 67 Kontakte aufgeführt. M.2-E-Key-Konformität nicht überprüft |
| Im Vorschlag ausgelassene Positionen | 24–31 (als vorgesehener Bereich für die Kodierkerbe markiert) |
| Basisbelegung | M2 |
| Multimedia-Belegung | M2xM |
| Erweiterungsinhalt dieses Entwurfs | M2xM-Kontaktplan; zu M2xN und M2xA nur Zusammenfassungen, nicht anhand einer Quelle verifiziert |
| Deklarationsbeispiel | `M2 + M2xM` |

</div>

## M2-Basisprofil { #m2-base-profile }

M2 ist das Basisprofil für kompakte vernetzte Produkte. Seine Belegung soll ein QSPI-Display mit kapazitivem Touch-Panel, Wi-Fi-SDIO, 1-Bit-TF-Karten-SDIO, analoges Audio, Debug, USB, CAN und allgemeine Busse abdecken. Mehrere Kontakte sind bewusst gemultiplext, sodass ein Modul die für sein SoC und seine Produktkonfiguration passende Funktion auswählen kann.

<div align="center"><em>Tabelle: M2-Funktionsbelegung</em></div>

<div align="center" markdown>

| Funktion | Zugewiesene Signale | Vorgesehene Verwendung |
| --- | --- | --- |
| Stromversorgung | `USB_VIN`, `VBAT/VBATS`, `3.3V`, `CHG_INT` und GND | Signalbezeichnungen des Vorschlags; Spannung, Strom und Einschaltsequenz sind hier nicht spezifiziert. |
| QSPI-Display | `LCDC1_SPI_CS`, `CLK`, `DIO0–DIO3`, `CS2`, `TE`, `RSTB`, `LCD_BL_PWM` | QSPI-Display-Panel, Hintergrundbeleuchtung und optionaler sekundärer Chip-Select. |
| Kapazitiver Touch | `CTP_I2C1_SDA`, `CTP_I2C1_SCL`, `CTP_INT`, `CTP_REST` | Steuerung und Interrupt des kapazitiven Touchcontrollers. |
| Wi-Fi | `WiFi_SD2_CLK`, `CMD`, `D0–D3`, `PDN`, `INT`, `WAKE` | 4-Bit-SDIO-Wi-Fi-Begleitschnittstelle. |
| TF-Karte | `TF_SD1_CMD`, `CLK`, `D0`, `TF_DET` | 1-Bit-TF-Karten-Schnittstelle und Kartenerkennung. |
| Analoges Audio | `ADC_1P/N`, `ADC_2P/N`, `MIC_BIAS`, `DAC_1P/N`, `DAC_2P/N`, `AU_PA_EN` | Zwei analoge Eingangspaare, Mikrofon-Bias, zwei DAC-Paare und PA-Freigabe. |
| Debug und Wiederherstellung | `DBG_UART1_TXD/RXD`, `SWDIO`, `SWCLK`, `SWD_SW`, `BOOT_MODE` | Debug-UART, SWD und Boot-/Wiederherstellungsauswahl. |
| Allgemeine serielle Busse | SPI1/SPI2, I2C2–I2C4, UART2/UART3 und allgemeine GPIO-/Busleitungen (`G0–G17`/`BUS0–BUS17`) | Produktspezifische Busse, ausgewählt über den Modul-Pin-Mux; I2C1 ist dem Touch-Controller zugewiesen. Mehrere Positionen von SPI2/I2C3/I2C4/UART3 können alternativ `PDM1`/`PDM2`-Digitalmikrofonsignale führen. |
| Sonstige Steuerung | `CAN_TX/RX`, USB-/USB-Host-Signale, `PWR_KEY` | Feldbus, USB-Rollensteuerung und Power-Key-Eingang. |

</div>

## Farbcodierte M2-Pinbelegung { #color-coded-m2-pinout-guide }

<div align="center"><em>Abbildung: Farblegende der M2-Signalgruppen</em></div>

<div class="m2-visual-guide" role="img" aria-label="Farblegende für die zweiseitige M2-Pinout-Tabelle">
<div class="m2-category-band">
<div class="m2-category m2-audio">Audio</div>
<div class="m2-category m2-display">Display</div>
<div class="m2-category m2-touch">Touch</div>
<div class="m2-category m2-wireless">Wi-Fi / SDIO</div>
<div class="m2-category m2-bus">SPI / I²C / UART</div>
<div class="m2-category m2-power">USB / Stromversorgung</div>
<div class="m2-category m2-debug">Dediziert</div>
</div>
</div>

Der Farbbalken dient als Legende. Die folgende Tabelle zeigt die Kontaktbelegung beider Kartenseiten, die diesem M2-Entwurf zugrunde liegt, einschließlich alternativer Funktionen und Mehrfachbelegungen; sie ist keine veröffentlichte Schnittstellenspezifikation.

### M2-Kontaktbelegung { #m2-contact-assignment }

Dieses zweiseitige Raster verwendet die Spalten Unterer Pin / Oberer Pin / CN1. Eine zusätzliche, von der Arbeitsmappe zugewiesene Multiplexfunktion ist in der Spalte `Alt` („Alternativfunktion“) vermerkt. Jede Funktionszelle verwendet ihre Kategoriefarbe aus der obigen Legende.

<div align="center"><em>Tabelle: M2-Basiskontaktbelegung</em></div>

<div align="center" markdown class="m2-grid-scroll" style="max-width: 100%; overflow-x: auto;" tabindex="0">
<table class="m2-grid" markdown="0">
<thead>
<tr><th>Alternativfunktion</th><th>Funktion</th><th>Unt.&nbsp;Pin</th><th>CN1</th><th>Ob.&nbsp;Pin</th><th>Funktion</th><th>Alternativfunktion</th></tr>
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
<tr><td class="m2-blank"></td><td class="m2-notch" colspan="2">Positionen 24–31 ausgelassen (vorgesehener Bereich für die Kodierkerbe)</td><td class="m2-cn1"></td><td class="m2-notch" colspan="2">Positionen 24–31 ausgelassen (vorgesehener Bereich für die Kodierkerbe)</td><td class="m2-blank"></td></tr>
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

### M2-Pin-Beschreibungen { #m2-pin-descriptions }

Gruppen und Farben entsprechen der Kontakttabelle oben. Die Arbeitsmappe definiert keine I/O-Richtungen; diese Spalte ist daher eine vorläufige Integrationshilfe aus Sicht des Moduls: I steht für Eingang, O für Ausgang und I/O für bidirektional. Durch Kommas getrennte Richtungen entsprechen der Reihenfolge der Signale. Bei SPI und PDM wird angenommen, dass das Modul den Takt bereitstellt; bei SWD wird ein externer Debugger angenommen. Bestätigen Sie jede Signalrichtung und elektrische Anforderung anhand der Dokumentation des ausgewählten Moduls sowie der SoC-Dokumentation.

Bei I2C bezeichnet I/O die bidirektionalen SDA-/SCL-Busleitungen. Dies garantiert weder alle Controller-/Target-Betriebsarten noch Clock-Stretching-Unterstützung. Prüfen Sie Pin-Konfiguration und Pull-ups am tatsächlichen Modul; siehe [I2C-Busspezifikation von NXP](https://www.nxp.com/docs/en/user-guide/UM10204.pdf). Die Annahme eines PDM-Taktausgangs und Dateneingangs folgt der Mikrofon-Host-Anordnung in [STs PDM-Anwendungshinweis](https://www.st.com/resource/en/application_note/an5027-interfacing-pdm-digital-microphones-using-stm32-mcus-and-mpus-stmicroelectronics.pdf). Daraus ergibt sich keine Funktionszusage für ein bestimmtes Modul.

<div align="center"><em>Tabelle: M2-Signalbeschreibungen und vorläufige Richtungen</em></div>

<div align="center" markdown>

| Signalgruppe | Signal | I/O | Beschreibung |
| --- | --- | :---: | --- |
| <span class="m2-chip m2-power">Stromversorgung</span> | `VBAT/VBATS` | I | Akku-Eingangsschiene. |
| <span class="m2-chip m2-power">Stromversorgung</span> | `3.3V` | I | 3,3-V-Versorgungsschiene. |
| <span class="m2-chip m2-power">Stromversorgung</span> | `CHG_INT` | O | Ladegerät-Interrupt-/Statusausgang. |
| <span class="m2-chip m2-power">Stromversorgung</span> | `USB_VIN` | I | USB-Eingang / Ladepfad-Schiene. |
| <span class="m2-chip m2-power">Stromversorgung</span> | `USB_DET` | I | USB-Erkennungssignal. |
| <span class="m2-chip m2-power">Stromversorgung</span> | `USBHOST_D+`, `USBHOST_D−` | I/O | USB-Host-Modus-Datenpaar, getrennt vom primären USB-Anschluss. |
| <span class="m2-chip m2-power">Stromversorgung</span> | `USB_OTG` | I/O | Signalbezeichnung in der Arbeitsmappe; das Blatt kennzeichnet es als „auf der aktuellen Plattform nicht unterstützt“. Aus der Kontaktbezeichnung darf keine Unterstützung abgeleitet werden. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_CS`, `LCDC1_SPI_CS2` | O | Primärer und optionaler sekundärer Chip-Select des QSPI-Displays. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_CLK` | O | QSPI-Display-Takt. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_DIO0`–`DIO3` | I/O | QSPI-Display-Datenleitungen. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_TE` | I | Tearing-Effect-Sync-Eingang vom Panel. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_RSTB` | O | Display-Panel-Reset, low-aktiv. |
| <span class="m2-chip m2-display">Display</span> | `LCD_BL_PWM` | O | Hintergrundbeleuchtungs-PWM-Steuerung. |
| <span class="m2-chip m2-touch">Touch</span> | `CTP_I2C1_SDA`, `CTP_I2C1_SCL` | I/O | I²C-Bus des kapazitiven Touch-Controllers. |
| <span class="m2-chip m2-touch">Touch</span> | `CTP_INT` | I | Interrupt des Touch-Controllers. |
| <span class="m2-chip m2-touch">Touch</span> | `CTP_REST` | O | Reset des Touch-Controllers. Die Arbeitsmappe schreibt dieses Signal als `CTP_REST`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_CLK`, `WiFi_SD2_CMD` | O, I/O | SDIO-Takt und -Kommando des Wi-Fi-Begleitmoduls. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_D0`, `WiFi_SD2_D1`, `WiFi_SD2_D2`, `WiFi_SD2_D3` | I/O | SDIO-Datenleitungen des Wi-Fi-Begleitmoduls (4-Bit). |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_PDN` | O | Power-Down-Steuerung des Wi-Fi-Moduls. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_INT` | I | Wi-Fi-Interrupt. Teilt sich Pin 65 mit `SDIO1_D2`/`CAN_TX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_WAKE` | I/O | Wi-Fi-Wecksignal. Teilt sich Pin 67 mit `SDIO1_D3`/`CAN_RX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_SD1_CMD`, `TF_SD1_CLK`, `TF_SD1_D0` | I/O, O, I/O | Kommando, Takt und Daten des 1-Bit-TF-Karten-SDIO. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_DET` | I | Erkennung der TF-Karten-Präsenz. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `SDIO1_D0–D3`, `SDIO2_D0–D3` | I/O | Generische Controller-Ebenen-Aliasse für dieselben physischen Leitungen wie die TF-Karten- (SDIO1) und Wi-Fi-Begleit- (SDIO2) Busse; verwenden Sie die oben genannten rollenspezifischen Namen, sofern das Modul nicht vollständiges 4-Bit-SDIO auf beiden Seiten benötigt. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `CAN_TX`, `CAN_RX` | O, I | CAN-Transceiver-Schnittstelle auf Logikebene, gemultiplext auf die Pins 65 und 67 zusammen mit `WiFi_INT`/`WiFi_WAKE`. Der Träger benötigt weiterhin einen für den Produktbus geeigneten CAN-Transceiver und Schutz. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `GPADC` | I | In dieser Belegung haben die Wi-Fi-SDIO-Kontakte 74, 72, 70, 68, 66 und 64 sowie Kontakt 60 für `PWR_KEY` ADC-Alternativfunktionen. |
| <span class="m2-chip m2-audio">Audio</span> | `ADC_1P/N`, `ADC_2P/N` | I | Zwei differenzielle analoge Mikrofon-Eingangspaare. |
| <span class="m2-chip m2-audio">Audio</span> | `MIC_BIAS` | O | Mikrofon-Bias-Versorgung. |
| <span class="m2-chip m2-audio">Audio</span> | `DAC_1P/N`, `DAC_2P/N` | O | Zwei differenzielle Audio-Ausgangspaare. |
| <span class="m2-chip m2-audio">Audio</span> | `AU_PA_EN` | O | Freigabe des Audio-Leistungsverstärkers. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI1_CS#`, `SPI1_SCK`, `SPI1_MOSI`, `SPI1_MISO` | O, O, O, I | SPI1, gemultiplext mit dem TF-Karten-Pfad. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI2_CS#`, `SPI2_SCK`, `SPI2_MOSI`, `SPI2_MISO` | O, O, O, I | SPI2, gemultiplext mit I2C3 und UART2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C2_SDA`, `I2C2_SCL` | I/O | I2C2 nutzt Kontakt 35 für SDA und Kontakt 34 für SCL. Die zuvor beschriebene gemeinsame Nutzung mit `MPI/SD` wird durch diese Kontaktbelegung nicht bestätigt. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C3_SDA`, `I2C3_SCL` | I/O | I2C3, gemultiplext mit SPI2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C4_SDA`, `I2C4_SCL` | I/O | I2C4, gemultiplext mit SPI2 und UART3. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART2_TXD/RXD`, `UART2_CTS/RTS` | O/I, I/O | UART2 hat alternative Positionen in den TF-Karten- und SPI2-Gruppen sowie an den Kontakten 39/37. Die zuvor beschriebene gemeinsame Nutzung mit `MPI/SD` ist unbestätigt; prüfen Sie die tatsächliche Multiplexer-Auswahl des Moduls. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART3_TXD/RXD` | O/I | UART3 hat alternative Positionen in der SPI2-/I2C4-Gruppe sowie an den Kontakten 38/36. Die zuvor beschriebene gemeinsame Nutzung mit `MPI/SD` ist unbestätigt; prüfen Sie die tatsächliche Multiplexer-Auswahl des Moduls. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `G0–G17`/`BUS0–BUS17` | I/O | Generische GPIO-/Buskontakte, je nach Position gemultiplext mit SPI2, I2C2–I2C4, UART2/UART3, `PDM1`/`PDM2` oder SWD. |
| <span class="m2-chip m2-audio">Audio</span> | `PDM1_CLK/DATA`, `PDM2_CLK/DATA` | O, I | Bei jedem Digitalmikrofon-Signalpaar ist CLK ein Modulausgang und DATA ein Moduleingang. Die Funktionen teilen sich die Kontakte 58, 56, 54 und 52 mit SPI2/I2C3/I2C4/UART3. |
| <span class="m2-chip m2-debug">Dediziert</span> | `DBG_UART1_TXD/RXD` | O/I | Debug-UART, gemultiplext mit SWD. |
| <span class="m2-chip m2-debug">Dediziert</span> | `SWDIO`, `SWCLK` | I/O, I | SWD-Debug-Port. Zwei alternative Belegungen: die Debug-UART-Kontakte (Pins 43/41) oder die Interrupt-/Reset-Kontakte des Touchcontrollers (Pins 51/49). Pro Modul sollte nur eine Option bestückt werden. |
| <span class="m2-chip m2-debug">Dediziert</span> | `SWD_SW` | I | Signalbezeichnung in der Arbeitsmappe; die Funktion zur Steuerung oder Auswahl des Routings ist nicht beschrieben. |
| <span class="m2-chip m2-debug">Dediziert</span> | `BOOT_MODE` | I | Boot-/Wiederherstellungsmodusauswahl. |
| <span class="m2-chip m2-debug">Dediziert</span> | `PWR_KEY` | I | Power-Key-Signal. |
| <span class="m2-chip m2-gnd">Masse</span> | `GND` | — | Digitale und analoge Rückleitungen, über den Steckverbinder verteilt. |

</div>

!!! info "Korrektur der Wi-Fi-SDIO-Datenbeschriftung"
    Die lokale Arbeitsmappe ordnet Kontakt 64 `WiFi_SD2_D1` zu und vermerkt, dass in einer früheren Revision dort fälschlich D3 doppelt eingetragen war. Dies dokumentiert nur eine Korrektur innerhalb des Entwurfs und bestätigt nicht den SiFli-Pinmux. Beide SDIO-Busse enthalten in der Spalte „Alternativfunktion“ außerdem generische Controller-Aliasse: `SDIO2_D0–D3`/`SDIO2_CMD`/`SDIO2_CLK` für den Wi-Fi-Begleitbus und `SDIO1_D0–D3`/`SDIO1_CMD`/`SDIO1_CLK` für den TF-Karten-Bus, zusätzlich zu ihren funktionsbezogenen Namen.

### Regeln für gemeinsam genutzte M2-Signale { #m2-sharing-rules }

- Die Arbeitsmappe kennzeichnet SWD als gemultiplexte Ressource mit zwei alternativen Routing-Optionen: die Debug-UART-Positionen (`SWDIO` auf Pin 43, `SWCLK` auf Pin 41) oder die Touch-Interrupt-/Reset-Positionen (`SWDIO` auf Pin 51, `SWCLK` auf Pin 49). Bestücken Sie pro Modul nur eine Option und reservieren Sie eine Wiederherstellungsstrategie, bevor Sie einen dieser Kontakte wiederverwenden.
- SPI1 wird gemeinsam mit dem 1-Bit-TF-Karten-Pfad genutzt; beide werden zudem als generischer `SDIO1_D0–D3`/`CMD`/`CLK`-Controller-Bus bereitgestellt, und die Pins 65/67 führen zusätzlich `CAN_TX`/`CAN_RX`.
- Die Wi-Fi-SDIO2-Datenleitungen werden ebenfalls als generischer `SDIO2_D0–D3`/`CMD`/`CLK`-Controller-Bus bereitgestellt; mehrere derselben Kontakte dienen zugleich als `GPADC`-Analogeingänge.
- SPI2 und I2C3/I2C4 (Kontakte 58, 56, 54 und 52) können alternativ `PDM1`/`PDM2`-Digitalmikrofonsignale führen, zusätzlich zu generischen `G0–G3`/`BUS0–BUS3`-GPIO-Aliassen.
- In der Gruppe mit sechs Positionen `G11–G16`/`BUS11–BUS16` nutzt UART3 die Kontakte 38/36, UART2 die Kontakte 39/37 und I2C2 SDA/SCL die Kontakte 35/34. Es sind getrennte Paare, nicht drei Busse auf identischen Pins. Jedes Paar teilt seine Kontakte mit den entsprechenden GPIO-Aliassen; bestätigen Sie den gleichzeitigen Betrieb am gewählten Modul.
- Die Gruppen QSPI-Display und kapazitives Touch sind auf Signalebene getrennt, aber ihr Strom-, Reset- und Weckverhalten muss als ein einziges Display-Subsystem überprüft werden.
- `CAN_TX` und `CAN_RX` sind Signale auf Logikebene, die auf die Pins 65/67 gemultiplext sind, keine separat zugewiesenen Kontakte. Der Träger benötigt weiterhin einen für den Produktbus geeigneten CAN-Transceiver und Schutz.

## M2xM-Multimedia-Profil { #m2xm-multimedia-profile }

M2xM ist ein Entwurf für eine Multimedia-Belegung. Die lokale Arbeitsmappe kennzeichnet DPI und DVP als primäre sowie MIPI DSI und CSI als alternative Signalgruppen, legt jedoch weder die Multiplexing-Steuerung noch Bedingungen für den gleichzeitigen Betrieb fest. Diese Kennzeichnungen belegen keine Unterstützung durch ein bestimmtes μForge-Modul oder SoC-Gehäuse. Prüfen Sie vor der Umsetzung die Gerätefunktionen und Routing-Anforderungen in der Dokumentation des ausgewählten Moduls.

<div align="center"><em>Tabelle: M2xM-Funktionsbelegung</em></div>

<div align="center" markdown>

| Funktion | Signalbezeichnungen in der Arbeitsmappe | Beleglage und Einschränkungen |
| --- | --- | --- |
| RGB-/DPI-Display | `R0–R7`, `G0–G7`, `B0–B7`, `DPI_CLK`, `DPI_DE`, `DPI_HSYNC`, `DPI_VSYNC` und gemeinsame Display-Steuersignale | DPI ist als primär gekennzeichnet. 8080- oder EPD-Belegungen sind nicht aufgeführt. |
| MIPI DSI | `DSI_D0±`–`DSI_D3±`, `DSI_C±`, Reset, Hintergrundbeleuchtungs-PWM und I2C-Signale | DSI ist als Alternative gekennzeichnet; sechs Kontakte sind als Schirmmasse ausgewiesen. In der Arbeitsmappe ist kein TE-Signal zugewiesen. |
| Touch-Steuerung | Allgemeine Signale `I2C_SCL`, `I2C_SDA` und `RESET` | Das M2xM-Blatt enthält keine touchspezifische Interrupt-/Reset-Belegung; Touch-Unterstützung ist nicht belegt. |
| 12-Bit-DVP-Kamera | `D0–D11`, MCLK, PCLK, HSYNC, VSYNC, PWDN, Reset und I2C-Signale | 20 Kontakte sind dargestellt; eine I2C-Controller-Nummer ist nicht angegeben. |
| MIPI CSI | D0/D1-Differenzleitungen, Taktpaar, PWDN, Reset und I2C-Signale | CSI ist als Alternative gekennzeichnet; vier Kontakte sind als Schirmmasse ausgewiesen. Multiplexing und gleichzeitiger Betrieb sind nicht spezifiziert. |
| Digitalmikrofone | `PDM1_CLK/DATA` und `PDM2_CLK/DATA` | Vier PDM-Signale sind dargestellt. |
| I2S / PCM | Im verfügbaren M2xM-Blatt sind keine I2S-/PCM-Signale oder Kontaktbelegungen enthalten. | Die Belegung ist ungeprüft; I2S/PCM nicht ohne freigegebene Quelle als Teil dieses Plans behandeln. |

</div>


## M2xN-Netzwerkprofil { #m2xn-networking-profile }

M2xN ist eine ungeprüfte Netzwerkprofil-Zusammenfassung in diesem Artikel, kein durch eine Quelle belegter Kontaktplan. Die verfügbare Arbeitsmappe enthält kein M2xN-Blatt; auch eine passende SiFli-Primärquelle wurde nicht gefunden. Die folgende Signalliste und die Zahl reservierter Kontakte dürfen nicht als verifiziert behandelt werden.

<div align="center"><em>Tabelle: M2xN-Funktionsbelegung</em></div>

<div align="center" markdown>

| Funktion | Entwurfszusammenfassung (ungeprüft) |
| --- | --- |
| Ethernet | Der Entwurf enthält widersprüchliche Bezeichnungen: Gigabit-Ethernet/RGMII und `RMII_*`-Signale. Ein M2xN-Quellplan oder eine SiFli-Primärquelle zur Klärung liegt hier nicht vor. Schnittstelle und Datenrate sind ungeprüft; behaupten Sie keine der beiden Fähigkeiten für ein Produkt, bevor eine freigegebene Quelle sie bestätigt. |
| USB | `USB1_D±`, `USB1_DET`, `USB1_OTG`, `USB2_D±`, `USB2_DET`, `USB2_OTG` |
| CAN | `CAN1_TX/RX` bis `CAN4_TX/RX`, plus `CAN1/2_STB`- und `CAN1/2_ERR_N`-Steuerleitungen, sofern zugewiesen |
| UART | `UART1_TX/RX/CTS/RTS` und `UART2_TX/RX/CTS/RTS` |
| Reserviert | 15 GPIO-Kontakte und 12 GND-Kontakte |

</div>

## M2xA-Analog- und Motorsteuerungsprofil { #m2xa-analog-and-motion-control-profile }

M2xA ist in diesem Artikel als Zusammenfassung zu Motorsteuerung und Datenerfassung aufgeführt, jedoch nicht durch eine Quelle als Kontaktbelegung belegt. Die verfügbare Arbeitsmappe enthält kein M2xA-Blatt; auch eine passende SiFli-Primärquelle wurde nicht gefunden. Die folgenden Signalnamen, Anzahlen und Belegungen dürfen nicht als verifiziert behandelt werden.

<div align="center"><em>Tabelle: M2xA-Funktionsbelegung</em></div>

<div align="center" markdown>

| Funktion | Entwurfszusammenfassung (ungeprüft) |
| --- | --- |
| BLDC-Steuerung | Der Entwurf nennt `PWM1_OUT/OUTN`, `PWM2_OUT/OUTN`, `PWM3_OUT/OUTN`, `BKIN1/2`, `DRV_EN` und `DRV_NFAULT`. Für die Analogeingänge enthält er zwei widersprüchliche Fünf-Kanal-Bezeichnungen (`ADC_IU/V/W`, `ADC_VBUS`, `ADC_NTC` und `ADC_IN1–ADC_IN5`); eine separate M2xA-Zusammenfassung nennt `ADC0–ADC2`. Ein M2xA-Quellplan oder eine SiFli-Primärquelle zur Prüfung der Namen, Anzahl und Zuordnung fehlt. Bis eine freigegebene Schnittstellenquelle vorliegt, bleibt dies ungeklärt. |
| Positionsrückmeldung | `H_A`, `H_B`, `H_C`, `ENC_A`, `ENC_B`, `ENC_Z` |
| Allgemeines Timing | `TIM_CH1–TIM_CH6` |
| Reserviert | 27 GPIO-Kontakte und 13 GND-Kontakte |

</div>

## Moduldeklaration und Prüfliste zur Umsetzung { #module-declaration-and-implementation-checklist }

Eine Moduldeklaration sollte ihre Basisbelegung und jede unterstützte Erweiterungsbelegung angeben, zum Beispiel `M2`, `M2 + M2xM` oder `M2 + M2xN + M2xA`. Sie sollte die Anzahl der implementierten Steckverbinder in M2-Form, deren Kategorie, die implementierten optionalen Funktionen und alle sich gegenseitig ausschließenden Modi angeben.

Bevor Sie diesen Entwurf übernehmen, verifizieren Sie:

- Ob Footprint, Kartenkontur, Rückhaltemechanik und Einsteckorientierung des vorgeschlagenen Steckverbinders die geltenden M.2-Anforderungen erfüllen.
- Die Anzahl, Platzierung und Kategorie der Steckverbinder in M2-Form auf dem Modul und Träger.
- Alle vom Modul ausgewählten gemultiplexten Funktionen, einschließlich gemeinsam genutztem SDIO1/SDIO2-, PDM-, SWD- (Debug-UART vs. Touch-Interrupt/-Reset) oder CAN-Routing.
- Modulspezifische Anforderungen an I/O-Spannung, Strom, Reset, Boot und Einschaltsequenz.
- Ob eine behauptete M2xM-MIPI-, RGB-, DVP-, PDM- oder I2S-Funktion gleichzeitig oder nur als alternativer Modus unterstützt wird.
- Trägerseitige Anforderungen an CAN-Transceiver, USB-Schutz, TF-Karten-Stromversorgung/-Erkennung, Display-Stromversorgung, Audioverstärkung und externe PHYs.
