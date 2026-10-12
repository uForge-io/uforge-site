---
icon: lucide/wrench
description: "Tool-Übersicht für die SF32-Entwicklung: sftool, SDK-UART-Download-Skripte, CodeKit-Aktionen, Crash-/Trace-Tools sowie Asset-/Produktionswerkzeuge nach Anwendungsfall."
tags:
    - Entwicklung
    - Werkzeuge
---

# Werkzeuge { #tools }

Für die SF32-Entwicklung braucht es mehr als einen Compiler. Ein praxistauglicher Firmware-Workflow umfasst außerdem Werkzeuge zum Flashen, zur seriellen Überwachung, zur Crash-Analyse, zur Trace-Erfassung, zur Bildkonvertierung, zur RF-/Audio-Abstimmung und zur Programmierung in der Fertigung.

Die folgende Tabelle ordnet typischen Entwicklungsaufgaben passende Werkzeuge zu. Sie ergänzt die jeweiligen Handbücher, ersetzt sie aber nicht. Hinweise zur Installation, genaue Befehle und werkzeugspezifische Verfahren finden Sie in der verlinkten Dokumentation.

## Tool-Übersicht { #tool-map }

<div align="center"><em>Tabelle: Tool-Übersicht</em></div>

<div align="center" markdown>

| Tool | Verwendung |
|:-----|:----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | Plattformübergreifendes Werkzeug zum Herunterladen und Flashen von SF32-Firmware, das in OpenSiFli-Abläufen mit Zephyr und Arduino verwendet wird. |
| [SDK-UART-Download-Skripte](../platforms/sifli-sdk/build-flash-monitor.md) | Von SiFli-SDK-Builds erzeugte Skripte zum ersten Flashen. |
| [CodeKit-Aktionen](codekit.md) | VS-Code-Einrichtungs-, Build-, Flash- und Monitor-Aktionen. |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/AssertDump/AssertDump_UM.html) | Erfassung von Speicherinhalten bei einem Absturz zur späteren Analyse. |
| [`SiFli_Trace`](https://docs.sifli.com/projects/solution/6.tools/index.html) / [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/UsartServer/UsartServer_UM.html) | Trace-/Log-Erfassung und UART-basierte Fehlersuche über die Debug-IP des Chips. |
| [`Impeller`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/Impeller/Impeller_UM.html) | Firmware-Programmierung, Kalibrierung und PCBA-Tests in der Fertigung. |
| [eZip-/Bildwerkzeuge](../../learn/graphics/ezip.md) | Asset-Konvertierung für komprimierte Grafik-Pipelines. |
| [RF-/Audio-/Fertigungswerkzeuge](https://docs.sifli.com/projects/solution/6.tools/index.html) | Produktionskalibrierung, Test- und Abstimmungsworkflows. |

</div>

## Flash-Tools { #flashing-tools }

Verwenden Sie für die erste Inbetriebnahme die vom SDK erzeugten UART-Skripte, da sie aus dem gerade erstellten Build stammen. Setzen Sie `sftool` ein, wenn Sie Folgendes benötigen:

- Ein einheitliches Kommandozeilenwerkzeug zum Flashen über verschiedene Workflows hinweg.
- Integration mit Zephyr `west flash`.
- ArduinoCore-zephyr-Upload-Verhalten.
- Automatisierung in CI, Fertigung oder Regressionstests.

Halten Sie beide Wege in Ihrem Projekt dokumentiert, bis sich das Team auf einen Weg festlegt.

## Logging- und Trace-Tools { #logging-and-trace-tools }

Für die normale Entwicklung genügt ein serielles Terminal. Bei schwerwiegenden Fehlern erfassen Sie strukturierte Logs und Crash-Daten:

- Ein vollständiges Startprotokoll ab dem Reset sichern.
- Die exakten ELF-/Map-/Symbol-Dateien passend zum geflashten Image sichern.
- Festhalten, ob RT-Thread-Shell, Zephyr-Shell oder Arduino-Debug-Modus aktiv war.
- SiFli-Diagnosewerkzeuge für Assert-Dumps und Trace-Erfassung nutzen, sofern verfügbar.

## Asset- und Produktionswerkzeuge { #asset-and-production-tools }

Grafikintensive Produkte sollten den Pfad zur Asset-Konvertierung dokumentieren, insbesondere bei eZip-Komprimierung oder hardwarebeschleunigter Grafik. Bei Produkten für die Serienfertigung sollten Werkzeuge für RF, Audio und Fertigung getrennt von Entwickler-Flash-Tools dokumentiert werden, damit das Fertigungspersonal nicht auf entwicklerspezifische Befehle angewiesen ist.

## Checkliste zur Toolauswahl { #tool-selection-checklist }

<div align="center"><em>Tabelle: Checkliste zur Toolauswahl</em></div>

<div align="center" markdown>

| Bedarf | Empfohlene Werkzeuge |
|:-----|:------------------|
| Erstes SDK-Flashen | SDK-UART-Download-Skript. |
| Plattformübergreifendes skriptgesteuertes Flashen | `sftool`. |
| VS-Code-Build und -Monitor | CodeKit. |
| Absturz nach dem Boot | Serielles Log und Werkzeug zur Auswertung von Assert-Dumps. |
| Lange Trace-Erfassung | Serverwerkzeuge zur Trace-/UART-Erfassung. |
| Display-Asset-Pipeline | eZip-/Bildwerkzeuge. |
| Fertigungsprogrammierung | SiFli-Produktions-/Fertigungswerkzeuge plus festgelegte Verfahren. |

</div>

## Praktische Hinweise { #practical-advice }

- Lernen Sie zunächst einen zuverlässigen Flash-Pfad, bevor Sie einen zweiten hinzufügen.
- Sichern Sie für jedes Board nachweislich funktionierende serielle Protokolle.
- Verwenden Sie für die erste Inbetriebnahme vom SDK erzeugte Skripte.
- Verwenden Sie `sftool`, wenn Sie wiederholbares Kommandozeilen-Flashen über Zephyr, Arduino oder Automatisierung hinweg benötigen.
- Ergänzen Sie Werkzeuge zur Absturzanalyse, bevor der erste schwer reproduzierbare Fehler auftritt.
