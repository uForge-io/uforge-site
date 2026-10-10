---
icon: lucide/layers
description: "OpenSiFli-Downstream-Unterstützung für Zephyr auf dem SF32LB52 DevKit LCD: Board-Identität, Konfigurationsgrenzen, Treiberabdeckung und Integrationsrisiko."
tags:
    - Entwicklung
    - Zephyr
---

# Zephyr { #zephyr }

OpenSiFli arbeitet in [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream) und [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream) aktiv an der Zephyr-Unterstützung. Der Downstream-Baum enthält das Board `sf32lb52_devkit_lcd`, die SiFli-HAL-Integration, SF32LB52-Devicetree-Dateien, Treiber, Tests und Beispiel-Overlays.

Verwenden Sie Zephyr, wenn Sie Zephyr-APIs, Devicetree, Kconfig, eine portable RTOS-Struktur oder einen Anschluss an ArduinoCore-zephyr benötigen. Wenn Sie aktuell den umfassendsten Funktionsumfang des Herstellers benötigen, wählen Sie SiFli-SDK.

Für die Workspace-Einrichtung, den ersten `hello_world`-Build, das Flashen und die Konsolenprüfung verwenden Sie [Erste Schritte mit Zephyr Downstream](../../../getting-started/zephyr/getting-started-zephyr-upstream.md). Diese Seite behandelt die Downstream-Plattform, sobald diese Baseline funktioniert.

Primäre Referenzen:

- [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)
- [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)
- [Zephyr-Projektdokumentation](https://docs.zephyrproject.org/)
- [SF32LB52-DevKit-LCD in der Zephyr-Boarddokumentation](https://docs.zephyrproject.org/latest/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)

## Verifiziertes Downstream-Board { #verified-downstream-board }

<div align="center"><em>Tabelle: Verifiziertes Downstream-Board</em></div>

<div align="center" markdown>

| Element | Wert |
|:-----|:------|
| Board | `sf32lb52_devkit_lcd` |
| Vollständiger Name | SF32LB52-DevKit-LCD |
| SoC | `sf32lb525uc6` |
| Flash-Runner | `sftool` |
| Runner-Argument | `--chip=SF32LB52` |
| Konsole | `usart1` |
| Konsolengeschwindigkeit | `1000000` Baud |
| Ausgewählter Display-Devicetree-Knoten | `co5300` |

</div>

Die Downstream-Board-Dokumentation beschreibt das Modul SF32LB52x-MOD-N16R8 mit 8 MB OPI-PSRAM, 128 Mb QSPI-NOR, 48-MHz- und 32,768-kHz-Quarzen, Display-Schnittstellen, Audio, USB und microSD-Hardware.

## Konfigurationsgrenzen { #configuration-boundaries }

Das Board-Target, das Devicetree, die Kconfig-Konfiguration, Overlays und die Downstream-HAL-Revision bilden eine gemeinsame Kompatibilitätsgrenze. Fixieren Sie die Downstream-Revision in jedem Projekt und halten Sie Anwendungs-Overlays und Konfigurationsfragmente zusammen mit der Anwendung unter Versionskontrolle.

Übernehmen Sie keinen Board-Namen, keine Pin-Zuordnung und keine Runner-Einstellung aus einem Arduino- oder SiFli-SDK-Projekt in Zephyr. Die drei Pfade verwenden unterschiedliche Konfigurationsmodelle, selbst wenn sie auf demselben physischen Board laufen.

## Hinweise zur Board-Hardware { #board-hardware-notes }

Die Downstream-Board-Dokumentation listet auf:

- Modul SF32LB52x-MOD-N16R8 auf Basis von SF32LB525UC6.
- 8 MB OPI-PSRAM.
- 128 Mb QSPI-NOR.
- 48-MHz- und 32,768-kHz-Quarze.
- SPI-/DSPI-/QSPI- und MCU/8080-Display-Schnittstellen.
- I2C-Touch-Unterstützung.
- Analogen Mikrofoneingang und analogen Audioausgang mit integriertem Class-D-Verstärker.
- USB-Typ-C-Anschlüsse für USB-zu-Seriell und USB 2.0 FS.
- microSD über SPI.

## Im Downstream-Baum vorhandene Treiberbereiche { #driver-areas-present-in-the-downstream-tree }

Der Downstream-Baum enthält SF32LB-bezogene Treiber, Bindings oder board-spezifische Beispielkonfigurationen für Bereiche wie:

- GPIO, Pinctrl, UART, I2C, SPI, ADC, PWM, RTC, Watchdog.
- Flash, Speichercontroller, OPI-PSRAM, QSPI-NOR.
- Display/LCDC/MIPI-DBI und LVGL-Beispielkonfiguration.
- Bluetooth-HCI-Mailbox und BAP-Broadcast-Sink-Konfiguration.
- Audio-Codec, DMA, CRC, Kryptografie, Entropie, OTP/eFuse, Spannungsregler, Reset und Temperatursensor.

Das Vorhandensein im Baum bedeutet nicht, dass jedes Produktszenario produktionsreif ist. Validieren Sie die genaue Kombination aus Beispiel und Treiber auf dem Ziel-Board.

## Integrationsreihenfolge { #integration-sequence }

Validieren Sie nach erfolgreicher Erstinbetriebnahme jeweils ein Subsystem nach dem anderen: Board-I/O, UART-Verhalten, Display, Speicher, Bluetooth, Audio und Energiemanagement. Bewahren Sie zu jedem Prüfpunkt das Beispiel, das Overlay, die Kconfig-Fragmente, die Downstream-Revision und das serielle Log zusammen auf. Dass ein Treiber im Baum vorhanden ist, belegt nicht, dass die vollständige Anwendungskombination produktionsreif ist.

## Downstream-Risiko-Checkliste { #downstream-risk-checklist }

- Verwenden Sie das OpenSiFli-Downstream und nicht Upstream-Zephyr?
- Ist die HAL-Revision fixiert?
- Verwendet `west flash` den erwarteten `sftool`-Runner?
- Ist die Konsole auf `1000000` Baud konfiguriert?
- Sind die erforderlichen Overlays für das Beispiel enthalten?
- Ist der Treiber als durch Tests unterstützt gekennzeichnet oder nur im Baum vorhanden?
