---
icon: lucide/bug
description: "Fehlersuche in SF32-Firmware mit sftool, AssertDump, SiFli_Trace und der RT-Thread-Shell: reproduzierbare Prüfschritte und Checkliste für Absturzberichte."
tags:
    - Entwicklung
    - Debugging
---

# Fehlersuche und Diagnose { #debugging-and-diagnostics }

Beginnen Sie die Fehlersuche bei SF32 mit seriellen Protokollen. Je nach Chip, SDK-Version und Projektkonfiguration stehen zusätzlich Werkzeuge für Absturz-Dumps, Trace-Aufzeichnungen und eine RT-Thread-Shell zur Verfügung. Verwenden Sie nur Abläufe, die für die jeweilige Plattform dokumentiert sind.

## Erste Diagnoseschritte { #first-line-debugging }

Verwenden Sie die serielle Konsole, um Folgendes zu erfassen:

- Startprotokolle.
- Anwendungsausgaben.
- Ausgaben der RT-Thread-Shell, sofern sie im Projekt aktiviert ist.
- Fehlermeldungen.
- Assert-/Absturz-Ausgaben, einschließlich der gemeldeten Datei und Zeile, des PC am ersten Fehlerort und der Stack-Daten, sofern verfügbar.
- Download- und Reset-Verhalten.

Bewahren Sie die Protokolle zusammen mit Board-Revision, SDK-Branch, Build-Befehl, Flash-Befehl und den seriellen Einstellungen auf.

## Reihenfolge der Fehlersuche { #debugging-order }

1. Reproduzieren Sie den Fehler mit derselben Firmware.
2. Prüfen Sie, ob er nach einem Reset erneut auftritt.
3. Prüfen Sie, ob er nach dem erneuten Flashen der vollständigen Firmware auftritt.
4. Prüfen Sie, ob er auch mit dem ähnlichsten SDK-Beispiel auftritt.
5. Fügen Sie Produktänderungen einzeln wieder hinzu.

So lassen sich Fehler in Hardware, Board-Support, Middleware und Anwendung voneinander unterscheiden.

## Nützliche Werkzeuge { #tools-to-know }

<div align="center"><em>Tabelle: Nützliche Werkzeuge</em></div>

<div align="center" markdown>

| Werkzeug | Verwendung |
|:-----|:----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | Kommandozeilenwerkzeug für die serielle Schnittstelle mit unterstützten Flash-Lese-, Schreib- und Löschvorgängen sowie Reset; die Optionen hängen von Chip und Speicher ab. |
| [`SiFli_Trace`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/SifliTrace/SifliTrace_UM.html) | Board-Protokolle mit dem für das Ziel unterstützten Ablauf erfassen und prüfen. |
| [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/UsartServer/UsartServer_UM.html) | Hilfswerkzeug für das UART-Debugging über die integrierte Debug-IP. Der [Leitfaden v2.5.1](https://docs.sifli.com/projects/sdk/v2.5.1/sf32lb52x/tools/UsartServer/UsartServer_UM.html) nennt SF32LB52X und SF32LB56X; ein neuerer englischer Leitfaden erwähnt außerdem `SF322LB57`. Prüfen Sie die Unterstützung für den genauen Chip und das SDK, statt sie für alle Ziele anzunehmen. |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/AssertDump/AssertDump_UM.html) und [Crash-Analysewerkzeuge](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html) | Nur verwenden, wenn sie für Chip und SDK-Version bereitgestellt werden; das dazugehörige dokumentierte Erfassungs- und Analyseverfahren befolgen. |
| RT-Thread-Shell | Laufzeitprüfung und Befehle nur dann, wenn die Projektkonfiguration die Shell aktiviert. |

</div>

## Was zuerst zu prüfen ist { #what-to-inspect-first }

<div align="center"><em>Tabelle: Was zuerst zu prüfen ist</em></div>

<div align="center" markdown>

| Symptom | Erste Prüfungen |
|:--------|:-------------|
| HardFault oder Assert | Stackgröße, Nullzeiger, DMA-Puffer und Cache-Wartung. |
| Peripheriegerät reagiert nicht | Pin-Mux, Takt, Versorgungsschiene, Boardname, Treiberaktivierung. |
| Bluetooth instabil | RF-Takt, Antennenpfad, Bluetooth-Stack-Konfiguration, Verbindungsparameter. |
| Bildfehler auf dem Display | Panel-Timing, Pufferformat und Cache-/DMA-Synchronisation. |
| Zufälliger Neustart | Watchdog, Versorgungsschiene, Brownout und Stack-Überlauf. |
| HCPU-/LCPU-Protokolle fehlen | Prüfen Sie UART-Zuweisung, `ulog`, pinmux und den Start des LCPU. |

</div>

In den angeführten LB551-Beispielen verwendet der HCPU UART1 und der LCPU UART3 an PB45/PB46. Prüfen Sie, dass UART3 nicht auch dem HCPU zugewiesen ist, kontrollieren Sie in `pinmux.c` die Überlappung der QSPI3-/UART1-Pinbelegung und bestätigen Sie, dass der LCPU gestartet wurde. Manche Beispiele erfordern dazu `lcpu on` oder `lcpu_power_on()`.

## Checkliste für Absturzberichte { #crash-report-checklist }

Geben Sie in einem Absturzbericht Folgendes an:

- Board und Revision.
- Chipvariante.
- SDK-Branch oder -Commit.
- Exaktes Beispiel oder Projekt.
- Build-Befehl und Boardname.
- Flash-Befehl.
- Serielles Startprotokoll ab dem Reset.
- Absturz-Dump oder Assert-Ausgabe.
- Ob sich das Problem mit einem unveränderten SDK-Beispiel reproduzieren lässt.

## Offizielle Quellen { #official-sources }

- [SiFli-SDK: Debugging und Protokollierung](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/debug_logging.html)
- [SiFli-SDK: Anleitung zur Crash-Analyse](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html)
- [OpenSiFli SiFli-Wiki: Log-Debugging (chinesisch)](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/log.md)
- [OpenSiFli SiFli-Wiki: Crash-Wiederherstellung per Speicherauszug (chinesisch)](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/dump.md)
