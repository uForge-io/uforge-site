---
icon: lucide/code-2
title: "Entwicklungsübersicht"
description: "Eine aufgabenorientierte Übersicht für die Entwicklung von SF32-Produkten mit SiFli-SDK: täglicher Arbeitsablauf, Anwendungshinweise, Beispiele, Werkzeuge, Firmware-Themen und Community-Pfade."
tags:
    - Entwicklung
    - Software
---

# Entwicklungsübersicht { #develop }

Dieser Bereich zeigt, wie Sie aus einem funktionierenden SF32-Board wartbare Produkt-Firmware entwickeln. Nutzen Sie ihn nach dem ersten erfolgreichen `hello_world`, um die passende Board-Konfiguration auszuwählen, Build und Flashen reproduzierbar durchzuführen, ein geeignetes Beispiel anzupassen, Produktfunktionen zu integrieren, Fehler zu diagnostizieren und Updates sowie Wiederherstellungswege zu planen.

Nutzen Sie [Erste Schritte](../getting-started/index.md) für die erste erfolgreiche Inbetriebnahme eines Entwicklungsboards, [SF32-Produkte](../sf32-products/index.md) zur Auswahl von Chip und Entwicklungsboard, [Hardware](../hardware/index.md) für Schaltpläne und Serienhardware sowie [Lernen](../learn/index.md) für Hintergrundwissen zur Architektur. In diesem Abschnitt finden Sie den technischen Arbeitsablauf und konkrete Umsetzungshinweise für einzelne Aufgaben.

!!! info "SiFli-Solution"
    SiFli-Solution ist ein separates Softwarepaket von SiFli, das μForge.io derzeit nicht dokumentiert. Die Hinweise hier beschränken sich auf SiFli-SDK und die unten aufgeführten Community-Pfade. Benötigt Ihr Produkt eine umfassendere Lösung für Displaygeräte, lesen Sie die offizielle [Dokumentation zu SiFli Solution](https://docs.sifli.com/projects/solution/index.html) und wenden Sie sich direkt an SiFli. Bei einem komplexen Produkt kann dieser Entwicklungsweg eine enge, direkte Zusammenarbeit mit SiFli erfordern.

## Eine SiFli-SDK-Referenzkonfiguration einrichten { #establish-a-sifli-sdk-baseline }

[SiFli-SDK](platforms/sifli-sdk/overview.md) ist SiFlis offizielles, auf RT-Thread basierendes Softwarepaket und der Referenzpfad für die SF32-Firmwareentwicklung. Beginnen Sie damit, sofern kein konkreter Grund für die Evaluierung eines anderen Ökosystems spricht: Für Board-Unterstützung, Bluetooth, Grafik, Audio, Speicher, Energiemanagement und Produktionsabläufe bietet es die umfassendste dokumentierte Referenzkonfiguration.

Bevor Sie Produktfunktionen entwickeln, richten Sie eine reproduzierbare Referenzkonfiguration ein und dokumentieren Sie sie:

1. Wählen Sie unter [Board-Konfiguration](platforms/sifli-sdk/board-configuration.md) die exakt passende SDK-Board-Konfiguration.
2. Führen Sie den Ablauf [Bauen, Flashen und Überwachen der seriellen Ausgabe](platforms/sifli-sdk/build-flash-monitor.md) erfolgreich aus.
3. Dokumentieren Sie SDK-Version oder Commit, Boardnamen, Build- und Flash-Befehle, serielle Einstellungen und ein Startprotokoll.
4. Beginnen Sie mit dem nächstliegenden [Beispiel](examples/index.md), idealerweise mit einem Beispiel, das bereits das anspruchsvollste Subsystem des Produkts nutzt.

Die so festgehaltenen Angaben sind der Bezugspunkt für spätere Änderungen an der Anwendung, Board-Portierungen, fehlgeschlagene Tests und die Wiederherstellung im Feld.

## Anleitung nach Aufgabe finden { #find-guidance-by-task }

<div align="center"><em>Tabelle: SF32-Entwicklungsaufgaben</em></div>

<div align="center" markdown>

| Aufgabe | Hier beginnen | Danach verwenden |
|:----------------|:-----------|:---------|
| Firmware bauen und flashen; serielle Ausgabe prüfen | [Bauen, Flashen und Überwachen der seriellen Ausgabe](platforms/sifli-sdk/build-flash-monitor.md) | [Werkzeuge](tools/index.md) für skriptgesteuertes Flashen, Trace und Absturzdiagnose. |
| Firmware an ein Entwicklungsboard, Modul oder eine eigene Hardware anpassen | [Board-Konfiguration](platforms/sifli-sdk/board-configuration.md) | Der passende Hardware-Leitfaden und das nächstliegende boardspezifische Beispiel. |
| Einen Treiber oder eine Middleware-Schicht in mehreren Projekten wiederverwenden | [Komponenten und `sf_pkg`](platforms/sifli-sdk/components.md) | Ein minimales Beispiel und eine dokumentierte Grenze der Konfigurierbarkeit. |
| Eine konkrete Peripherie oder ein Subsystem implementieren | [SDK-Anwendungshinweise](platforms/sifli-sdk/sdk-application-notes.md) | Der verlinkte offizielle SDK-Leitfaden mit den genauen APIs, Konfigurationssymbolen und Befehlen. |
| Produktarbeit mit bereits lauffähigem Code beginnen | [Beispiele](examples/index.md) | Die passende Board-Konfiguration, dann nach jeder Änderung testen. |
| Einen Fehler diagnostizieren oder Produktnachweise sammeln | [Fehlersuche und Diagnose](platforms/sifli-sdk/debugging-diagnostics.md) | [Protokollierung und Absturzanalyse](firmware-topics/logging-crash-analysis.md). |
| Boot-Layout, Speicher, Updates, USB oder Energieverhalten ändern | [Firmware-Themen](firmware-topics/index.md) | Das relevante Thema zu Partitionen, Updates, USB, Energie oder Protokollierung, bevor Code geändert wird. |

</div>

## SiFli-SDK-Anwendungshinweise { #sifli-sdk-application-notes }

Die Anwendungshinweise sind nach Integrationsaufgabe statt nach der Reihenfolge des SDK-Katalogs geordnet. Beginnen Sie mit dem unmittelbar relevanten Subsystem. Prüfen Sie vor dem Anpassen einer Konfiguration oder eines Befehls den angegebenen Geltungsbereich der Chipfamilie, die Board-Konfiguration, das SDK-Release und die Hardwarevoraussetzungen.

<div align="center"><em>Tabelle: Anwendungshinweise für SiFli-SDK</em></div>

<div align="center" markdown>

| Technischer Bereich | Passender Anwendungshinweis |
|:-----------------|:--------------------------------|
| Analog und Sensoren | [Messwerte mit GPADC erfassen](platforms/sifli-sdk/application-notes/adc-sampling.md) · [Sensoren integrieren und auslesen](platforms/sifli-sdk/application-notes/sensor-integration.md) |
| Speicher und Grafikressourcen | [Externen Flash verwenden](platforms/sifli-sdk/application-notes/external-flash.md) · [Grafikressourcen mit EZIP komprimieren](platforms/sifli-sdk/application-notes/ezip-image-assets.md) |
| Zuverlässigkeit, Energie und Fehlerdiagnose | [Watchdog konfigurieren](platforms/sifli-sdk/application-notes/watchdog.md) · [Energiesparfunktionen konfigurieren und messen](platforms/sifli-sdk/application-notes/low-power-measurement.md) · [Protokolle erfassen und Abstürze analysieren](platforms/sifli-sdk/application-notes/crash-analysis.md) |
| RF- und Bluetooth-Validierung | [RF-Tests mit SiFli-SDK durchführen](platforms/sifli-sdk/application-notes/rf-performance-tests.md) · [Bluetooth-Signalisierungstests durchführen](platforms/sifli-sdk/application-notes/bluetooth-signalling-tests.md) · [Bluetooth-RF-Einzeltests durchführen](platforms/sifli-sdk/application-notes/bluetooth-single-tone-tests.md) |

</div>

## Im Entwicklungsbereich navigieren { #navigate-the-develop-section }

<div align="center"><em>Tabelle: Übersicht des Entwicklungsbereichs</em></div>

<div align="center" markdown>

| Bereich | Zweck |
|:-----|:--------|
| [SiFli-SDK](platforms/sifli-sdk/overview.md) | Den unterstützten Referenzablauf einrichten: Konfiguration, Build, Flashen, wiederverwendbare Komponenten und Diagnose. |
| [SDK-Anwendungshinweise](platforms/sifli-sdk/sdk-application-notes.md) | Das SDK für eine konkrete Aufgabe nutzen, etwa ADC, Sensoren, externen Flash, Energiesparfunktionen, Diagnose sowie RF- und Bluetooth-Tests. |
| [Beispiele](examples/index.md) | Eine funktionierende Implementierung für das konkrete Board und das anspruchsvollste Produkt-Subsystem auswählen und anpassen. |
| [Werkzeuge](tools/index.md) | Werkzeuge für Download, Überwachung, Trace, Absturzdiagnose, Ressourcenaufbereitung und Fertigung auswählen. |
| [Firmware-Themen](firmware-topics/index.md) | Querschnittliche Produktentscheidungen zu Partitionen, OTA/DFU, USB, Energiemanagement und Diagnosebelegen treffen. |
| [Experimentell / Community](platforms/zephyr/overview.md) | Zephyr, Arduino, MicroPython oder Rust im Rahmen des auf jeder Seite beschriebenen Umfangs und Reifegrads evaluieren. |

</div>

## Community-Pfade bewusst evaluieren { #evaluate-community-paths-deliberately }

Die Gruppe [Experimentell / Community](platforms/zephyr/overview.md) richtet sich an Teams, die aus einem bestimmten Grund über den Referenzpfad des SDK hinausgehen möchten. Daraus folgt keine gleichwertige Unterstützung für den Produktionseinsatz.

<div align="center"><em>Tabelle: Eignung der Community-Pfade</em></div>

<div align="center" markdown>

| Pfad | In Betracht ziehen, wenn | Einzuordnen als |
|:-----|:-----------------|:------------|
| [Zephyr](platforms/zephyr/overview.md) | Sie Zephyr-APIs, Devicetree, Kconfig oder Board-Anpassungen in einem abgeleiteten (Downstream-)Projekt benötigen. | Ein abgeleiteter (Downstream-), boardspezifischer Evaluierungspfad. |
| [Arduino](platforms/arduino/overview.md) | Sie Sketches oder einen schnellen Peripherie-Prototyp auf einem unterstützten Board benötigen. | Ein Beta-Pfad, der auf bestimmte Boards begrenzt ist. |
| [MicroPython](platforms/micropython/status.md) | Sie zukünftige Skripting-Unterstützung bewerten. | Eine Statusseite, bis ein reproduzierbarer öffentlicher Port existiert. |
| [Rust](platforms/rust/overview.md) | Sie HAL-/PAC-Arbeiten bewerten und Korrekturen zum Upstream-Projekt beitragen können. | Ein Community-Projekt in Entwicklung. |

</div>

Bevor Sie ein Produkt auf einen dieser Pfade festlegen, prüfen Sie alle benötigten Peripheriegeräte, die Flash-Belegung, die Debug-Methode und die Wiederherstellung auf dem konkreten Entwicklungsboard. Dokumentieren Sie die getestete Revision, Konfiguration, Befehle und Ergebnisse zusammen mit dem Produktquellcode.

## Nachweise für eine produktreife Entwicklung { #product-ready-development-evidence }

Bevor Sie einen Firmware-Pfad als produktreif einstufen, stellen Sie sicher, dass Sie folgende Fragen beantworten können:

- Welcher Chip, welche Revision des Boards oder der kundenspezifischen Hardware und welche Konfiguration wurden getestet?
- Mit welchem SDK, Paket, Branch oder Commit wurde die Firmware erstellt?
- Welche Befehle für Build, Flashen, Überwachung und vollständige Wiederherstellung funktionieren?
- Welches Beispiel oder welcher Test belegt die Funktion jedes benötigten Peripheriegeräts und Produkt-Subsystems?
- Welches Partitionslayout, welches Update-Verhalten, welches Stromverbrauchsziel und welches Vorgehen zur Dekodierung von Absturzprotokollen wurden validiert?

Fehlt eine Antwort, kann die Arbeit weiterhin ein nützlicher Prototyp sein; eine wiederholbare Produkt-Referenzkonfiguration ist sie dann jedoch noch nicht.
