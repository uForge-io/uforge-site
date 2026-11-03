---
icon: lucide/circuit-board
description: "SF32LB57-DevKit-LCD: modulares Evaluierungsboard für RGB-Displays, DVP-Kameras, zwei PDM-Mikrofone, Lautsprecher, SDIO-Wi-Fi und USB."
tags:
    - Hardware
    - Development board
    - SF32LB57
---

# SF32LB57-DevKit-LCD { #sf32lb57-devkit-lcd }

## Überblick { #overview }

Das SF32LB57-DevKit-LCD ist ein Multimedia-Evaluierungsboard auf Basis von **SF32LB57-MOD-WD**, offenbar als Modulprodukt von SiFli vorgesehen. **WD** steht vermutlich für **Wi-Fi Dual-band**; diese Namensdeutung ist jedoch nicht offiziell bestätigt. Das Board kombiniert eine SF32LB57x-MCU mit SDIO-Wi-Fi, Boot-Flash und Peripherieanschlüssen. Es eignet sich für intelligente HMIs, Kameraterminals, Gegensprechanlagen und vernetzte Displays. Damit lassen sich Grafik, Bilderfassung, Audio und Konnektivität gemeinsam prüfen, bevor Sie ein eigenes Trägerboard entwerfen.

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png" alt="SF32LB57-DevKit-LCD — Vorderseite" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Vorderseite</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png" alt="SF32LB57-DevKit-LCD — Rückseite" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Rückseite</figcaption></figure>
</div>

## Board-Ressourcen { #board-resources }

Die Board-Unterlagen nennen zwei STAR-MC1-Leistungskerne mit 240 MHz und zusammen 1968 CoreMark sowie 592 KB Retention-SRAM (512 KB HPSYS + 80 KB LPSYS). Die vollständige Mehrkernarchitektur ist unter [SF32LB57x](../chips/SF32LB57x.md) beschrieben. Das Modul enthält QSPI-NOR-Boot-Flash, variantenabhängigen OPI-PSRAM sowie einen 48-MHz-MCU- und einen 40-MHz-Wi-Fi-Quarz. Prüfen Sie vor der Wahl der Speicherkonfiguration die Modulbeschriftung.

Die Board-Unterlagen beschreiben eine SF32LB57x-Variante mit 3,3-V-Versorgung und halbgebohrten Randkontakten, über die das Modul auf einem Trägerboard montiert wird. OPI-PSRAM ist optional; maßgeblich ist die genaue Modulbestellnummer, denn nicht jede Konfiguration ist damit bestückt.

<div align="center"><em>Board-Ressourcen</em></div>

<div align="center" markdown>

| Bauteil / Anschluss | Ausführung |
|:---|:---|
| 1 · SF32LB57-MOD-WD | SF32LB57x; QSPI-NOR; OPI-PSRAM (optional); SDIO Wi-Fi |
| 2 · USB Type-C | CH343P · USB-to-UART |
| 3 · USB Type-C | USB 2.0 FS · PA35 / PA36 |
| 4 · FPC1 | 40P · 0,5 mm · DPI / RGB888 |
| 5 · FPC4 | 24P · 0,5 mm · DCMI / DVP |
| 6 · J6 | MicroSD / TF · 1-bit SDIO |
| 7 · J3 | 40P · 2 × 20 · 2,54 mm · S-2100S40P-S110 |
| 8 · J7 | MX1.25-2P · 8 Ω |
| 9 · S4 | KEY_RSTN |
| 10 · S1–S3 | PA_34 · GPADC_CH6 |
| 11 · LED1–LED3 | AW9523B · P1_1 / P1_2 / P1_3 |
| 12 · U1 | WS2812B · V1.0: PA_11 · V1.1: PA_08 |
| 13 · ANT | IPEX-1 |
| 14 · U11 | AW9523BTOR · 16 IO · I2C |
| 15 · U8 | NS4150B · Class-D |
| 16 · MIC1 / MIC2 | 2 × PDM · MSM261DGT007 / LMD4020T261-AC23 |

</div>

SiFli nennt den Wi-Fi-Baustein AIC8800D40LS-N und bezeichnet ihn teilweise als Wi-Fi/Bluetooth-Kombibaustein. Diese Bluetooth-Funktion ist von der im SF32-MCU integrierten Bluetooth-Funktion zu unterscheiden. Prüfen Sie den bestückten Funkbaustein, die RF-Umschaltung und den SDK-Treiber; setzen Sie keinen zweiten nutzbaren Bluetooth-Pfad voraus. Das Board verfügt über einen IPEX-1-Antennenanschluss sowie Steuerungen für Wi-Fi-Versorgung, Aufwecken und Antennenumschaltung.

![Blockdiagramm](assets/sf32lb57x/57DEVKIT_LCD_Block_Diagram-en.svg){ width="100%" loading="lazy" }
<div align="center"><em>Blockdiagramm</em></div>

Das Originalblockdiagramm zeigt Funktionen, aber keine konkrete Verdrahtung. Es zeigt TF-Datenleitungen D0–D3 und ordnet WS2812B dem IO-Expander zu; der Text nennt dagegen 1-Bit-TF-SDIO und eine direkte MCU-Steuerung von WS2812B über PA_11/PA_08, abhängig von der Board-Revision. Prüfen Sie diese Verbindungen anhand des passenden Schaltplans und der SDK-Pinkonfiguration.

<div style="display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; width: 100%; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg" alt="SF32LB57-DevKit-LCD — Bauteile auf der Vorderseite" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Bauteile auf der Vorderseite</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg" alt="SF32LB57-DevKit-LCD — Bauteile auf der Rückseite" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Bauteile auf der Rückseite</figcaption></figure>
</div>

## Erster Start { #getting-started }

Für einen ersten Displaytest benötigen Sie das Board, ein kompatibles 40-poliges DPI-RGB-Panel mit 0,5 mm Raster, ein USB-Datenkabel und einen Rechner mit Windows, Linux oder macOS. Optional sind eine IPEX-1-Antenne, eine DVP-Kamera, eine MicroSD-/TF-Karte, ein 8-Ω-Lautsprecher und ein J-Link oder DAP-Link. Für gleichzeitige UART-Protokollierung und native USB-Tests benötigen Sie zwei Datenkabel.

1. Prüfen Sie bei getrennter Spannungsversorgung die Pin-1-Markierung, die Kontaktseite und die Panelspannung, bevor Sie FPC1 anschließen. Montieren Sie vor Funkprüfungen die Antenne.
2. Verbinden Sie den USB-to-UART-Type-C-Port, nicht den nativen USB-Port, und wählen Sie den zugehörigen COM-Port in SifliTrace oder Impeller.
3. Setzen Sie zum Programmieren den Jumper J1 (BOOT MODE) vor dem Einschalten oder Reset. Entfernen Sie J1 für den normalen Start und die serielle Protokollierung und setzen Sie das Board zurück.
4. Prüfen Sie zuerst einen seriellen Hello-World-Test, dann die einfarbige Anzeige und gegebenenfalls die Touchfunktion. Ergänzen Sie Kamera, Audio, Speicher und Funk einzeln und testen Sie anschließend den gemeinsamen Betrieb.

Ein Board mit Werksfirmware zeigt nach dem Einschalten möglicherweise seine Standardoberfläche; dies hängt von Firmware und Panel ab. Ein schwarzes Display allein weist nicht auf einen Programmierfehler hin. Toolchain, Umgebung und Programmierablauf finden Sie unter [SiFli-SDK-Einstieg](../../getting-started/sifli/getting-started-sifli-sdk.md).

## SDK-Build-Ziele { #sdk-build-targets }

Die aktuelle SDK-Build-Konfiguration führt folgende Ziele auf. Es handelt sich um exakte Build-Bezeichner, nicht um eine Zusage, dass jedes SF32LB57-MOD-WD-Board zu jedem Ziel passt. Gleichen Sie Speicher, Display, Pins und Board-Revision mit Ihrem SDK-Stand ab. Der Board-Leitfaden ordnet die WD-Modulrevisionen diesen Zielnamen nicht zu.

- `sf32lb57-lcd_n16r16_dpi`
- `sf32lb57-lcd_n16r8_dpi`
- `sf32lb57-lcd_n16r16_qspi`

Nach Einrichtung der SDK-Umgebung gilt dieses Hello-World-Beispiel **nur für Hardware, die der N16R16-DPI-Konfiguration entspricht**. Ein erfolgreiches UART-Hello-World validiert keine Display-, Kamera- oder Wi-Fi-Treiber.

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb57-lcd_n16r16_dpi -j8
```

## Versorgung und Debugging { #power-and-debug }

Beide Type-C-Anschlüsse können 5 V einspeisen. U4 (ETA3425D2G) erzeugt `VDD_3V3`; U7 (ETA3425D2G) erzeugt `WF_3V3`, das sich unabhängig über `IOEX_WF_PWREN` aktivieren lässt. Die USB-to-UART-Brücke ist ein CH343P; der andere Anschluss führt USB 2.0 FS über `PA35`/`PA36`. SWD verwendet `PA_43` (SWCLK), `PA_44` (SWDIO), eine Zielspannungsreferenz von 3,3 V und gemeinsame Masse. Schließen Sie keinen 5-V-Debuggerausgang an einen 3,3-V-Pin an.

Am J3-Header ist Pin 17 die 3,3-V-Referenz, Pin 18 SWCLK, Pin 19 SWDIO und Pin 20 GND. Das sind die Pinnummern des Board-Headers, nicht die des Debuggeradapters. Verbinden Sie beide Seiten anhand der Signalnamen.

![SWD-Verdrahtung](assets/sf32lb57x/57DEVKIT-LCD-JLINK-Notes.svg){ width="100%" loading="lazy" }
<div align="center"><em>SWD-Verdrahtung</em></div>

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png" alt="SF32LB57-DevKit-LCD — J-Link-Adapter" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>J-Link-Adapter</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png" alt="SF32LB57-DevKit-LCD — SWD-Adapter" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>SWD-Adapter</figcaption></figure>
</div>

## Display und Kamera { #display-and-camera }

FPC1 ist ein 40-poliger `FPC-05FB-40PH20` mit 0,5 mm Raster und ALIENTEK-RGB-Pinfolge. Standard ist RGB888; RGB565/RGB666 können bei passendem Panel und Firmware Datenpins freigeben. Mit FreeIO lassen sich auch QSPI, MCU8080, EPD und JDI über Adapter testen. Dafür sind korrekter Adapter, Versorgung und Firmware nötig; es handelt sich nicht um native DSI-Anschlüsse.

Für RGB888 mit 24-Bit-Datenbreite ist laut Quelle ein Modul mit QFN80- oder BGA112-Gehäuse erforderlich. ePicasso 3.0 ist ein 2D/2.5D-Grafikbeschleuniger. FPC1-Pin 1 liefert 5 V für die Hintergrundbeleuchtung beziehungsweise die Aufwärtswandlerschaltung des Displaytreibers; er ist kein 3,3-V-GPIO. J3-Pins 3 und 5 teilen sich den I2C-Konfigurationsbus für Kamera und Touch an PA_23/PA_22.

!!! warning
    Die Quelle nennt für ePicasso 3.0 eine Verarbeitungsgrenze von 2048 × 2048 und außerdem 60 fps bei Vollbildaktualisierung. Später macht sie Auflösung und Bildrate vom Panel abhängig. Daraus folgt keine Garantie für 2048 × 2048 bei 60 fps. Prüfen Sie LCDC-Timing, Panel-Schnittstelle, Framebuffer, Speicherbandbreite und gemessene Arbeitslast. FPC1-Pins 37–40 sind ungeklärt: Fünf Steuersignale werden für vier Kontakte genannt. Prüfen Sie vor dem Anschluss eines Panels die Datei `57x LCD-DevKit ioconfig-08192026.xlsx` und den passenden Schaltplan.

![RGB-Panelanschluss](assets/sf32lb57x/57DEVKIT-LCD-RGB-Panel-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>RGB-Panelanschluss</em></div>

FPC4 ist ein 24-poliger DCMI-DVP-Anschluss mit 0,5 mm Raster. Als Kamerasensoren werden GC032A, OV2640, OV5640 und OV3660 genannt; OV2640/OV5640 bilden die Standardkonfiguration. Bei anderen Modulen kann laut Schaltplanhinweisen eine abweichende Versorgung erforderlich sein. Die Kamera-Versorgungsschienen heißen `DVDD_1V5`, `DVDD_2V8` und `AVDD_2V8`; maßgeblich sind die Anforderungen des Sensors, nicht allein der Stecker. DVP-Datenleitungen werden per Jumper auf Pins gelegt, die Wi-Fi-SDIO oder TF-SDIO gemeinsam nutzen. In der Standardkonfiguration können diese konkurrierenden Funktionen nicht gleichzeitig betrieben werden.

Für die drei Kamera-Versorgungsschienen sind unabhängige LDOs vorgesehen. Das beschriftete Vorderseitenbild nennt 22 Pins, Text und FPC4-Tabelle dagegen 24. Verwenden Sie die 24-Pin-Tabelle als dokumentierte Referenz und prüfen Sie vor dem Anschluss den tatsächlichen Stecker sowie den Schaltplan. Auch die Resetzuordnung an FPC4-Pin 6 (IOEX_DVP_PDN/RESET) ist mehrdeutig. Prüfen Sie die Verdrahtung, statt unabhängige Reset- und Power-down-Steuerungen vorauszusetzen.

![Kameraanschluss](assets/sf32lb57x/57DEVKIT-LCD-CAM-MOD-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>Kameraanschluss</em></div>

## Gemeinsame Pins und Revisionen { #shared-pins-and-revisions }

- `PA35`/`PA36` liegen an FPC1 und am nativen USB FS. Verwenden Sie konkurrierende Panelanschlüsse und die USB-Gerätefunktion nicht gleichzeitig.
- SWD an `PA_43`/`PA_44` teilt Pins mit Display/Kamera. Halten Sie einen Wiederherstellungspfad für das Debugging offen.
- WS2812B verwendet bei V1.0 `PA_11`, bei V1.1 `PA_08`. Die Quelle weist `PA_11` außerdem `BL_PWM` zu. Lösen Sie diesen Konflikt, bevor Sie die LED oder die Hintergrundbeleuchtung ansteuern.
- J3 entspricht den Versorgungs-/Massepositionen des 40-poligen Raspberry-Pi-Headers, nicht dessen Softwareumgebung oder universeller HAT-Kompatibilität. Prüfen Sie Spannung, Pinmux und gemeinsam genutzte Signale, bevor Sie Erweiterungsboards anschließen.

## Audio, Tasten und IO-Erweiterung { #audio-controls-and-io-expansion }

Die Quelle beschreibt einen 24-Bit-DAC-Wiedergabepfad über den Mono-Class-D-Verstärker U8 (NS4150B) zu J7 (`MX1.25-2P`), ausgelegt für einen 8-Ω-Lautsprecher. Als PDM-Mikrofone sind MSM261DGT007 oder pinkompatible LMD4020T261-AC23 vorgesehen. `PA_56` ist der PDM-Takt, `PA_55` die Datenleitung; `IOEX_PDM_PWREN` schaltet die Mikrofonversorgung, `IOEX_AU_PA_EN` den Verstärker. Prüfen Sie vor dem Produkteinsatz Audioformat, Verstärkung und Lautsprechergrenzen.

S1–S3 teilen sich `PA_34` / `GPADC_CH6`; die Quelle nennt nominale Tastenspannungen von 2,97 V, 2,58 V und 2,19 V. S4 ist das low-aktive Signal `KEY_RSTN`. U11 (AW9523BTOR) stellt 16 IOs über I2C an `PA_22` (SCL) und `PA_23` (SDA) bereit. Die Tabelle übernimmt die aufgeführten Anfangszustände. Prüfen Sie Resetverhalten und Firmwareinitialisierung auf dem eigenen Board. P0_2/P0_3 sind in der Quelltabelle nicht aufgeführt.

<div align="center"><em>Anfangszustände des IO-Expanders</em></div>

<div align="center" markdown>

| Port | Signal / Bezeichnung | Anfangszustand | Richtung | Funktion |
|:---|:---|:---|:---|:---|
| P1_0 | IOEX_2.4G_RFSW | 3,3 V | Ausgang | 2,4-GHz-Antennenumschaltung |
| P1_1 | IOEX_LED_R | 3,3 V | Ausgang | Rote LED |
| P1_2 | IOEX_LED_G | 3,3 V | Ausgang | Grüne LED |
| P1_3 | IOEX_LED_B | 3,3 V | Ausgang | Blaue LED |
| P1_4 | IOEX_WF_PWRKEY | 0 V | Ausgang | Wi-Fi-Modul-Einschalttaste |
| P1_5 | IOEX_WF_PWREN | 0 V | Ausgang | Freigabe des Wi-Fi-3,3-V-Abwärtswandlers |
| P1_6 | IOEX_CTP_RST | 0 V | Ausgang | Touch-Controller-Reset |
| P1_7 | IOEX_LCD_RESET | 0 V | Ausgang | LCD-Reset |
| P0_0 | IOEX_USB_DET | Hi-Z | Eingang | USB-Anschlusserkennung |
| P0_1 | IOEX_TF_DET | Hi-Z | Eingang | TF-Karteneinschuberkennung |
| P0_4 | IOEX_PDM_PWREN | 0 V | Ausgang | Freigabe der PDM-Mikrofonversorgung |
| P0_5 | IOEX_AU_PA_EN | 0 V | Ausgang | Audioverstärker-Freigabe |
| P0_6 | IOEX_DVP_PDN | 0 V | Ausgang | Kamera-Power-down |
| P0_7 | IOEX_HST_WAK_WF | 0 V | Ausgang | Wi-Fi durch Host aufwecken |

</div>

## Anschlussreferenz { #connector-reference }

!!! warning
    Die Tabellen übernehmen die Board-Zuordnungen der Quelle und ersetzen keinen Schaltplan. Die Modulübersicht ist unvollständig (`58~?`) und bezeichnet `PA_00`/`PA_01` fälschlich als USB_DP/USB_DM, im Widerspruch zur ausdrücklichen USB-Zuordnung `PA35`/`PA36`. Unterscheiden Sie Modul-Padnummern und MCU-GPIOs. Verwenden Sie die ungeklärten Zeilen nicht für den PCB-Entwurf.

<div align="center"><em>Modul-Padübersicht mit ungeklärten Quelleneinträgen</em></div>

<div align="center" markdown>

| Pin | Signal / Bezeichnung | Funktion |
|:---|:---|:---|
| 1 | GND | Masse |
| 2 | VDD_3V3 · 3,3 V | 3,3-V-Versorgungseingang |
| 3 | VDD_1V8 · 1,8 V LDO | 1,8-V-Ausgang des internen LDO |
| 4 | RSTN | Reset; mit Resettaster verbunden |
| 5~22 | PA_41 ~ PA_24 | GPIO / LCDC / SPI / SD / Debug-Multiplexing |
| 23~36 | PA_23 ~ PA_10 | GPIO / I2C / SD / USB / Audio / Debug-Multiplexing |
| 37 | DAC1P | Differenzieller DAC-Ausgang P |
| 38 | DAC1N | Differenzieller DAC-Ausgang N |
| 39 | MICBIAS_PA56 / PDM_CLK | Mikrofonvorspannung / PDM-Takt |
| 40 | ADC1P_PA55 / PDM_DAT | Audio-ADC-Eingang P / PDM-Daten |
| 41 | GND | Masse |
| 42 | PA_00 / USB_DP | GPIO / USB_DP (Quellkonflikt; siehe Warnung) |
| 43 | PA_01 / USB_DM | GPIO / USB_DM (Quellkonflikt; siehe Warnung) |
| 44~53 | PA_07 ~ PA_09, PA_06 | GPIO / SD / Touch / USB-Erkennung |
| 54 | GND | Masse |
| 55 | PA_42 | GPIO |
| 56 | PA_43 / SWCLK | SWCLK / GPIO |
| 57 | PA_44 / SWDIO | SWDIO / GPIO |
| 58~? | PA_45 ~ PA_57 · QFN80 / BGA112 | Höherwertige DPI-RGB-Daten / PDM / Wi-Fi-Aufwecken; Verfügbarkeit abhängig vom Modulgehäuse |

</div>

<div align="center"><em>J3: 40-poliger Erweiterungsheader</em></div>

<div align="center" markdown>

| Pin | Signal / Bezeichnung | Verbindung / Funktion |
|:---|:---|:---|
| 1 | 3V3 | 3,3 V |
| 2 | 5V | 5 V |
| 3 | IO2 / I2C_SDA | PA_23 · I2C_SDA · DVP / CTP |
| 4 | 5V | 5 V |
| 5 | IO3 / I2C_SCL | PA_22 · I2C_SCL · DVP / CTP |
| 6 | GND | GND |
| 7 | IO4 | PA_27 · DPI_R3 |
| 8 | IO14 | PA_26 · DPI_R2 / DVP_PCLK |
| 9 | GND | GND |
| 10 | IO15 | PA_28 · DPI_R4 / GPADC_CH0 |
| 11 | IO17 | PA_29 · DPI_R5 / GPADC_CH1 |
| 12 | IO18 | PA_30 · DPI_R6 / GPADC_CH2 |
| 13 | IO27 | PA_31 · DPI_R7 |
| 14 | GND | GND |
| 15 | IO22 | PA_32 · DPI_G0 / DVP_D4 |
| 16 | IO23 | PA_33 · DPI_G1 / DVP_D0 / WKUP |
| 17 | 3V3 | 3,3 V |
| 18 | IO24 / SWCLK | PA_43 · DPI_B0 / SWCLK / DVP_D3 |
| 19 | IO10 / SWDIO | PA_44 · DPI_B1 / SWDIO / DVP_D1 |
| 20 | GND | GND |
| 21 | IO9 | PA_38 · DPI_G3 / SPI2_DI |
| 22 | IO25 | PA_37 · DPI_G2 / SPI2_DIO |
| 23 | IO11 | PA_40 · DPI_G5 / SPI2_CS |
| 24 | IO8 | PA_39 · DPI_G4 / SPI2_CLK |
| 25 | GND | GND |
| 26 | IO7 | PA_41 · DPI_G6 |
| 27 | IO0 | PA_45 · DPI_B2 / DVP_D2 |
| 28 | IO1 | PA_42 · DPI_G7 |
| 29 | IO5 | PA_46 · DPI_B6 |
| 30 | GND | GND |
| 31 | IO6 | PA_48 · DPI_CLK / SD2_CMD |
| 32 | IO12 | PA_47 · DPI_B7 / SD2_CLK |
| 33 | IO13 | PA_49 · DPI_HSYNC / SD2_DIO0 |
| 34 | GND | GND |
| 35 | IO19 | PA_50 · DPI_DE / SD2_DIO1 |
| 36 | IO16 | PA_51 · DPI_VSYNC |
| 37 | IO26 | PA_52 · DPI_B3 |
| 38 | IO20 | PA_53 · DPI_B4 |
| 39 | GND | GND |
| 40 | IO21 | PA_54 · DPI_B5 |

</div>

<div align="center"><em>FPC1: RGB-Displayanschluss</em></div>

<div align="center" markdown>

| Pin | Signal / Bezeichnung |
|:---|:---|
| 1 | 5V |
| 2 | GND |
| 3 | PA_24 · DPI_R0 |
| 4 | PA_25 · DPI_R1 |
| 5 | PA_26 · DPI_R2 |
| 6 | PA_27 · DPI_R3 |
| 7 | PA_28 · DPI_R4 |
| 8 | PA_29 · DPI_R5 |
| 9 | PA_30 · DPI_R6 |
| 10 | PA_31 · DPI_R7 |
| 11 | GND |
| 12 | GND |
| 13 | PA_32 · DPI_G0 |
| 14 | PA_33 · DPI_G1 |
| 15 | PA_34 · PWRKEY / GPADC_CH6 |
| 16 | PA_35 · USB_DP |
| 17 | PA_36 · USB_DM |
| 18 | PA_37 · DPI_G2 |
| 19 | PA_38 · DPI_G3 |
| 20 | GND |
| 21 | PA_39 · DPI_G4 |
| 22 | PA_40 · DPI_G5 |
| 23 | PA_41 · DPI_G6 |
| 24 | PA_42 · DPI_G7 |
| 25 | PA_43 · DPI_B0 |
| 26 | PA_44 · DPI_B1 |
| 27 | PA_45 · DPI_B2 |
| 28 | PA_52 · DPI_B3 |
| 29 | PA_53 · DPI_B4 |
| 30 | PA_54 · DPI_B5 |
| 31 | PA_46 · DPI_B6 |
| 32 | PA_47 · DPI_B7 |
| 33 | PA_48 · DPI_CLK |
| 34 | PA_49 · DPI_HSYNC |
| 35 | PA_50 · DPI_DE |
| 36 | PA_51 · DPI_VSYNC |
| 37~40 | Steuersignale (Zuordnung prüfen): PA_11 / BL_PWM, IOEX_CTP_RST, I2C_SDA / PA_23, I2C_SCL / PA_22, IOEX_LCD_RST |

</div>

<div align="center"><em>FPC4: DVP-Kameraanschluss</em></div>

<div align="center" markdown>

| Pin | Signal / Bezeichnung |
|:---|:---|
| 1 | NC |
| 2 | GND |
| 3 | I2C_SDA |
| 4 | VDD_2V8 · 2,8 V |
| 5 | I2C_SCL |
| 6 | RESET · IOEX_DVP_PDN/RESET |
| 7 | VSYNC |
| 8 | PWDN · IOEX_DVP_PDN |
| 9 | HSYNC |
| 10 | NC |
| 11 | D0 |
| 12 | D1 |
| 13 | D2 |
| 14 | D3 |
| 15 | D4 |
| 16 | D5 |
| 17 | D6 |
| 18 | D7 |
| 19 | MCLK |
| 20 | PCLK |
| 21 | GND |
| 22 | AVDD_2V8 · 2,8 V |
| 23 | NC |
| 24 | GND |

</div>

## Quellen und nächste Schritte { #related-documents }

Wenn Sie ein eigenes Board entwickeln, nutzen Sie den [SF32LB57x-Hardwareleitfaden](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) und die Anleitung zur [Serienfertigung](../../hardware/design-for-production.md). Die Bereiche [Grafik](../../learn/graphics/overview.md), [Audio](../../learn/audio/overview.md) und [Bluetooth](../../learn/bluetooth/overview.md) unterstützen Sie bei der Entwicklung der jeweiligen Subsysteme.

- [SiFli-Produktunterlagen zum SF32LB57x](https://wiki.sifli.com/silicon/product-index.html#sf32lb57x)
- [SiFli-Benutzerhandbuch-Downloads](https://downloads.sifli.com/user%20manual/)
- [Ursprünglicher SF32LB57x-Hardwareleitfaden](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)

Die Board-Unterlagen führen das SF32LB57x-Benutzerhandbuch als noch nicht veröffentlicht auf. Prüfen Sie den aktuellen Stand im Downloadverzeichnis.

- [Chinesischer Originalleitfaden](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)
- [Markdown-Quelle](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb57x/SF32LB57-DevKit-LCD.md)
- [SDK-Build-Konfiguration](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)
- [Display-Werkzeuge](https://wiki.sifli.com/tools/%E5%B1%8F%E5%B9%95%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95.html)
- [Impeller-Programmierwerkzeug](https://wiki.sifli.com/tools/%E7%83%A7%E5%BD%95%E5%B7%A5%E5%85%B7.html)
- [SiFli-Shop](https://sifli.taobao.com/)

SiFlis Quelle verweist für Muster und kleinere Bestellmengen auf den Shop und für größere Mengen auf sales@sifli.com. Sie nennt außerdem Open-Source-Musteranträge und die QQ-Gruppe 674699679. Klären Sie Bedingungen und aktuelle Verfügbarkeit mit SiFli. Für Projektanfragen können Sie [μForge.io kontaktieren](../../about/contact.md).
