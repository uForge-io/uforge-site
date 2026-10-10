---
icon: lucide/notebook-tabs
title: "SDK-Anwendungshinweise"
description: "Ein nach Aufgaben geordneter, quellenverlinkter Wegweiser zu den SiFli-SDK-Nutzungsleitfäden für die SF32-Entwicklung."
tags:
    - Entwicklung
    - SiFli-SDK
    - Anwendungshinweise
---

# SDK-Anwendungshinweise { #sdk-application-notes }

Diese Seite ordnet die SiFli-SDK-Anleitungen nach konkreten Entwicklungsaufgaben. So finden Sie schnell den passenden Ablauf und sehen, welche Prüfergebnisse für die Produktdokumentation festgehalten werden sollten.

Die Artikel bieten praktische Hinweise zur Integration, ersetzen jedoch nicht das SDK-Handbuch. Wählen Sie im offiziellen [SiFli-SDK-Nutzungsleitfaden](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/index.html) zuerst die Ziel-Chipfamilie und das SDK-Release aus, bevor Sie eine Konfiguration, API, ein Beispiel oder ein Testverfahren anwenden.

## Nach Aufgabe lesen { #read-by-task }

<div align="center"><em>Tabelle: Lesepfade der SDK-Anwendungshinweise</em></div>

<div align="center" markdown>

| Aufgabe | Hier beginnen, wenn Sie Folgendes benötigen | Thema im offiziellen Nutzungsleitfaden |
|:-----|:----------------------------|:--------------------------|
| [Messwerte mit GPADC erfassen](application-notes/adc-sampling.md) | Einen Messpfad für allgemeine ADC-Messaufgaben einrichten. | ADC Usage Guide (GPADC) |
| [Sensoren integrieren und auslesen](application-notes/sensor-integration.md) | Einen externen Sensor anschließen und validieren. | Sensor Adding Guide |
| [Externen Flash verwenden](application-notes/external-flash.md) | Daten, Assets oder ein Dateisystem im Flash speichern. | Flash Usage Guide |
| [Watchdog konfigurieren](application-notes/watchdog.md) | Einen Watchdog-Recovery-Pfad validieren. | Watchdog Usage Guide |
| [Grafikressourcen mit EZIP komprimieren](application-notes/ezip-image-assets.md) | EZIP-Bildressourcen konvertieren und integrieren. | EZIP Image Conversion Tool Usage |
| [Energiesparfunktionen konfigurieren und messen](application-notes/low-power-measurement.md) | Einen Energiesparmodus konfigurieren und Messwerte vergleichen. | Low Power Development Guide |
| [Protokolle erfassen und Abstürze analysieren](application-notes/crash-analysis.md) | Zusammengehörige Protokolle, Absturzinformationen und Symboldateien sichern. | Crash Analysis Guide; Debugging and Logging |
| [RF-Tests mit SiFli-SDK durchführen](application-notes/rf-performance-tests.md) | Zwischen RF-Tests mit Signalisierung, ohne Signalisierung und Einzelprüfungen wählen. | SiFli SDK RF Test Guide |
| [Bluetooth-Signalisierungstests durchführen](application-notes/bluetooth-signalling-tests.md) | Protokollbasierte Bluetooth-Validierung durchführen. | Bluetooth Signaling Test Guide |
| [Bluetooth-RF-Einzeltests durchführen](application-notes/bluetooth-single-tone-tests.md) | Das Verfahren für Bluetooth-RF-Einzeltests für den gewählten Prüfpunkt befolgen. | Bluetooth Individual RF Test Guide |

</div>

## Wie diese Artikel zu nutzen sind { #how-to-use-these-articles }

1. Beginnen Sie mit der Seite, deren Titel zu Ihrer aktuellen Entwicklungsaufgabe passt.
2. Erfüllen Sie die genannten Voraussetzungen für Projekt, Board, SDK-Release, Konfiguration und Hardware, bevor Sie ein Beispiel oder einen Befehl anpassen.
3. Prüfen Sie in der verlinkten SDK-Quelle die genauen Pfade, Konfigurationssymbole, Befehle, APIs und Tool-Versionen.
4. Halten Sie das geprüfte Board, das SDK-Release, die Konfigurationsdateien, die Testausrüstung und die beobachteten Ergebnisse als Produktnachweise fest.

Für plattformübergreifende Architekturentscheidungen verwenden Sie [Firmware-Themen](../../firmware-topics/index.md). Unterstützte SDK- und Community-Beispiele finden Sie unter [Beispiele](../../examples/index.md).
