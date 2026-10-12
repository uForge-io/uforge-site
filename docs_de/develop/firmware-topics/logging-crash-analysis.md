---
icon: lucide/file-warning
description: "Protokollierung und Absturzanalyse für SF32-Firmware planen, damit sich Fehler im Feld diagnostizieren lassen: mit Mindestdaten, Ablauf der Absturzanalyse und Empfehlungen zur Protokollierung je Phase."
tags:
    - Entwicklung
    - Protokollierung
    - Absturzanalyse
---

# Protokollierung und Absturzanalyse { #logging-and-crash-analysis }

Protokolle sind Bestandteil des Produkts und kein vorübergehendes Hilfsmittel für die Fehlersuche. Gute Protokolle verkürzen die Inbetriebnahme, die Fehlersuche im Feld und die Untersuchung von Fehlern in der Fertigung.

Planen Sie die Protokollierung vor dem ersten Feldtest. Fällt ein Gerät im Feld aus, stehen nur die Daten zur Verfügung, deren Speicherung oder Ausgabe in der Firmware bereits vorgesehen ist.

## Mindestumfang der Protokollierung { #minimum-logging-setup }

Erfassen Sie für jeden Firmware-Build:

- Firmware-Version.
- SDK-Branch oder Commit.
- Board-Name und -Revision.
- Startursache.
- Version des Partitionslayouts.
- Ergebnisse der Initialisierung wichtiger Subsysteme.
- Absturz- oder Assert-Ausgabe, falls der Start fehlschlägt.

## Ablauf der Absturzanalyse { #crash-analysis-flow }

1. Reproduzieren Sie den Fehler auf einem Board, dessen funktionierende Baseline verifiziert wurde.
2. Erfassen Sie das vollständige Startprotokoll ab dem Reset.
3. Sichern Sie die exakte Binärdatei und die zugehörigen Symboldateien.
4. Dekodieren Sie Assert- oder Dump-Ausgaben mit den SiFli-Tools.
5. Prüfen Sie Stackgrößen, die Zuständigkeit für Speicherbereiche, DMA-Puffer und Cache-Wartungsoperationen.
6. Grenzen Sie das Problem mit dem am ehesten passenden SDK-Beispiel ein.

## Protokollierungsstufen { #log-levels }

<div align="center"><em>Tabelle: Protokollierungsstufen</em></div>

<div align="center" markdown>

| Phase | Empfohlene Protokollierung |
|:------|:------------------|
| Inbetriebnahme der Platine | Ausführliche Protokolle zu Peripherie und Startvorgang. |
| Funktionsentwicklung | Modulbezogene Debug-Protokolle rund um die geprüfte Funktion. |
| Optimierung des Stromverbrauchs | Möglichst wenige Protokolle, da die Protokollierung selbst das Energieverhalten verändert. |
| Freigabekandidat | Warnungen, Fehler, Version, Startursache und wichtige Zustandsprüfungen. |
| Build zur Analyse eines Feldfehlers | Gezielte Protokolle zum vermuteten Subsystem. |

</div>

## Merkmale eines guten Absturzberichts { #what-makes-a-good-crash-report }

- Er enthält das vollständige Protokoll vom Reset bis zum Absturz.
- Er benennt die exakte Binärdatei.
- Er enthält Symboldateien oder einen reproduzierbaren Build.
- Er gibt an, ob der Absturz auch bei einem unveränderten SDK-Beispiel auftritt.
- Er listet angeschlossene Peripherie und Stromquelle auf.
- Er gibt an, ob der Absturz auch nach vollständigem Löschen und erneuter Programmierung des Flashs auftritt.
