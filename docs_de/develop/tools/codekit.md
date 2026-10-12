---
icon: lucide/app-window
description: "Wie sich SiFli CodeKits VS-Code-Erweiterung in die SiFli-SDK-Entwicklung einfügt, einschließlich Projekteinrichtung, Build-/Flash-/Monitor-Workflow und Fehlerbehebung."
tags:
    - Entwicklung
    - CodeKit
---

# CodeKit { #codekit }

SiFli CodeKit ist die VS-Code-Erweiterung für die SiFli-SDK-Entwicklung. Sie führt durch SDK-Einrichtung, Projekterstellung, Konfiguration sowie Build-, Flash- und Monitor-Workflows.

Verwenden Sie [Erste Schritte mit CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md) für den ersten Durchlauf. Diese Seite erklärt, wo CodeKit im Entwicklungs-Workflow einzuordnen ist.

Primäre Referenz:

- [SiFli CodeKit – Erste Schritte](https://docs.sifli.com/projects/codekit/get-started/)

## Beste Anwendungsfälle { #best-use-cases }

Verwenden Sie CodeKit, wenn Sie Folgendes wünschen:

- Einen auf VS Code zentrierten SDK-Workflow.
- Geführte Projekteinrichtung.
- Board- und Projektkonfiguration direkt aus dem Editor.
- Build-/Flash-/Monitor-Aktionen, ohne sich jeden Befehl merken zu müssen.
- Einen einfacheren Einstieg für Entwickler, die neu bei SiFli-SDK sind.

Verwenden Sie den Kommandozeilen-SDK-Ablauf, wenn Sie CI-Skripte schreiben, Toolchain-Pfadprobleme debuggen oder Fertigungs-/Release-Verfahren vorbereiten. CodeKit ist eine Produktivitätsschicht für Entwickler, kein Ersatz für das Verständnis des SDK-Builds.

## Verhältnis zum SiFli-SDK { #relationship-to-sifli-sdk }

CodeKit stellt eine Oberfläche für den SDK-Workflow bereit, ersetzt das SDK jedoch nicht. Dieselben zugrunde liegenden Konzepte bleiben relevant:

- SDK-Wurzelverzeichnis.
- Board-Name.
- Projektverzeichnis.
- Build-Ausgabe.
- Flash-/Download-Pfad.
- Serieller Monitor.

Falls eine CodeKit-Aktion fehlschlägt, reproduzieren Sie nach Möglichkeit den zugrunde liegenden SDK-Befehl. Das macht Fehlerberichte klarer und hilft, Erweiterungsprobleme von SDK-Problemen zu unterscheiden.

Verwenden Sie [SiFli-SDK](../platforms/sifli-sdk/overview.md), um die unterstützte Basis auszuwählen, und [Bauen, Flashen und Überwachen der seriellen Ausgabe](../platforms/sifli-sdk/build-flash-monitor.md), um die entsprechenden Schritte über die Kommandozeile zu dokumentieren. Beginnen Sie mit einem passenden [SDK-Beispiel](../examples/index.md), bevor Sie ein CodeKit-Projekt anpassen.

## Betriebsmodell { #operational-model }

CodeKit ist am nützlichsten, wenn sich seine Editor-Aktionen mit dem zugrunde liegenden SDK reproduzieren lassen. Betrachten Sie die Erweiterung als Bedienoberfläche und SiFli-SDK als maßgebliche Referenz für Toolchain, Board-Definition, Build-Ausgabe und Download-Artefakte.

Die Seite [Erste Schritte mit CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md) behandelt die Installation der Erweiterung und das Ausführen von `hello_world`. Sobald diese Baseline funktioniert, nutzen Sie CodeKit, um den Bearbeiten–Bauen–Flashen–Überwachen-Zyklus zu verkürzen; verwenden Sie die SDK-Kommandozeile, wenn eine Aktion automatisiert, geprüft oder außerhalb von VS Code reproduziert werden muss.

## Was zu dokumentieren ist { #what-to-record }

Dokumentieren Sie für jedes CodeKit-Projekt:

- CodeKit-Erweiterungsversion.
- SiFli-SDK-Pfad und SDK-Branch.
- In CodeKit ausgewähltes Board.
- Entsprechende SDK-Board-Bezeichnung.
- Build-Ausgabeverzeichnis.
- Flash-/Download-Verhalten.
- Baudrate des seriellen Monitors.

Dies ermöglicht es, eine GUI-Aktion bei Bedarf über die Kommandozeile zu reproduzieren.

## Fehlerabgrenzung { #failure-boundaries }

<div align="center"><em>Tabelle: Strategie zur Fehlerbehebung</em></div>

<div align="center" markdown>

| Fehler | Bester nächster Schritt |
|:--------|:---------------|
| SDK nicht gefunden | SDK-Wurzelverzeichnis erneut auswählen und die vollständige SDK-Installation bestätigen. |
| Build schlägt fehl | Dasselbe Projekt nach Möglichkeit mit `scons` reproduzieren. |
| Flashen schlägt fehl, obwohl die Erstinbetriebnahme mit der Referenzkonfiguration funktioniert | Board und Ausgabe des Projekts mit der funktionierenden Referenzkonfiguration vergleichen. Anschließend prüfen, ob der Port belegt ist, und den Download-Modus kontrollieren. |
| Monitor zeigt unleserliche Zeichen | Baudrate und ausgewählten Port bestätigen. |
| UI-Befehl fehlt | Die Befehlspalette verwenden und nach `SiFli` suchen. |

</div>
