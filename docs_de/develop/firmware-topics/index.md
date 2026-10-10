---
icon: lucide/blocks
description: "Überblick über plattformübergreifende SF32-Firmware-Themen: Partitionstabellen, OTA/DFU, USB, Energiemanagement, Protokollierung und Fehleranalyse."
tags:
    - Entwicklung
    - Firmware
---

# Themen rund um die Firmware { #firmware-topics }

Diese Themen gelten plattformübergreifend. Sie behandeln die Firmware-Entscheidungen, die aus Beispielen Produkte machen: Boot-Layout, Partitionierung, OTA, USB, Energiemanagement, Protokollierung und Fehleranalyse.

Lesen Sie diese Seiten, bevor Sie das Firmware-Layout, das Update-Verhalten oder die Energiesparstrategie ändern. Solche Fehler verhindern nicht immer einen erfolgreichen Build, können aber die Wiederherstellung, Fehlersuche und Freigabe des Produkts erschweren.

## Themen { #topics }

<div align="center"><em>Tabelle: Themen</em></div>

<div align="center" markdown>

| Thema | Warum es wichtig ist |
|:------|:---------------|
| [Partitionstabellen](partition-tables.md) | Definiert die Speicheraufteilung für Firmware, Dateisystem, OTA und weitere Daten. |
| [OTA und DFU](ota-dfu.md) | Grundlage für Updates im Feld und Wiederherstellungspläne. |
| [USB und CherryUSB](usb-cherryusb.md) | Behandelt USB-Funktionen im Geräte- und Hostbetrieb, die ein Datenblatt allein nicht erkennen lässt. |
| [Energiemanagement](power-management.md) | Hilft, aus einer funktionierenden Demo ein batterietaugliches Produkt zu machen. |
| [Protokollierung und Fehleranalyse](logging-crash-analysis.md) | Macht Fehlerursachen nachvollziehbar. |

</div>

## Praktische Regel { #practical-rule }

Bevor Sie Boot-, OTA-, Dateisystem- oder Speicherverhalten ändern, prüfen Sie die Partitionstabelle und den Wiederherstellungsweg. Ein Fehler in der Anwendung ist ärgerlich; ein fehlerhaftes Boot- oder Update-Layout kann die Wiederherstellung des Boards erheblich erschweren.

## Checkliste zur Produktreife { #product-readiness-checklist }

- [ ] Außerhalb des normalen OTA-Pfads steht ein geprüfter Befehl zum vollständigen Flashen des Geräts zur Verfügung.
- [ ] Das Partitionslayout ist im Produkt-Repository dokumentiert.
- [ ] Das Verhalten bei OTA-/DFU-Fehlern wurde getestet.
- [ ] Falls USB verwendet wird, sind USB-Deskriptoren und die Zuweisung von VID/PID dokumentiert.
- [ ] Energiesparmodi wurden an realer Hardware gemessen.
- [ ] Absturzprotokolle lassen sich mit der zum Release gehörenden Binärdatei dekodieren.
- [ ] Die Flash-Verfahren für Fertigung und Entwicklung sind getrennt.
