---
icon: lucide/clipboard-check
description: "Einstieg in die Produktionsentwicklung mit SF32: Chip- und Modul-Designleitfäden, Checklisten, Schnittstellendefinitionen, genehmigte Komponenten und EDA-Bibliotheken."
tags:
    - Hardware
    - Produktion
---

# Design für die Produktion { #design-for-production }

Nutzen Sie diesen Weg nach der Auswahl eines Chips oder Moduls und bevor Sie Schaltplan, PCB-Layout, Stückliste oder Fertigungsunterlagen freigeben. Er bündelt die Implementierungsreferenzen, die das Risiko bei der ersten Inbetriebnahme und der Qualifizierung verringern: gerätespezifische Hardware-Designleitfäden, Checklisten, Modulschnittstellendefinitionen, freigegebene Komponenten und EDA-Bibliotheken.

## Empfohlener Produktionsablauf { #recommended-production-sequence }

Nutzen Sie diese Reihenfolge als wiederholten Prüfablauf, nicht als einmalige Übergabe. Prüfen Sie Symbole und Footprints vor der Prototypenfertigung. Geben Sie die Produktions-CAD-Daten und Fertigungsunterlagen erst nach der Designprüfung und Validierung der für die Serie vorgesehenen Hardware frei. Wiederholen Sie betroffene Prüfungen bei Änderungen an Leiterplatte, Firmware oder Stückliste.

<div align="center"><em>Tabelle: Ablauf für das Produktionsdesign</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Phase | Verwendung | Aufzubewahrende Nachweise |
|:------|:-----------|:-------------------------|
| Architektur | Produktbeschreibung und Schnittstellenanforderungen | Ausgewähltes Bauteil, Gehäuse, Arbeitsspeicher, Display, Audio, Massenspeicher und Annahmen zur Stromversorgung. |
| Schaltplan und Layout | Chip- oder Modul-Hardware-Designleitfaden | Überprüfte Stromversorgung, Takt, Reset, RF, Speicher, Display und Schnittstellenimplementierung. |
| Stückliste | Freigegebene Lieferantenliste (AVL) und Komponentendatenblätter | Qualifizierte oder gezielt validierte Alternativen für jedes kritische Bauteil. |
| Designüberprüfung | Hardware-Designcheckliste | Dokumentierte Bewertung aller zutreffenden Checklistenpunkte und Ausnahmen. |
| Inbetriebnahme | Entwicklungsboard-Referenzen, SDK-Beispiele und Messungen | Reproduzierbare Ergebnisse für Start, Programmierung, Peripherie, Funk, Leistungsaufnahme und Wiederherstellung. |
| Produktions-CAD-Freigabe | Offizielle EDA-Bibliotheken plus Gehäusezeichnungen | Prüfergebnisse zu Symbol, Footprint, Pinbelegung, Pad-Layout und Fertigungsdaten. |

</div>

## Verwenden Sie die richtige Referenz für das ausgewählte Produkt { #use-the-right-reference-for-the-chosen-product }

Für die Umsetzung stehen folgende Referenzen zur Verfügung:

- **[Hardware-Designleitfäden](index.md#find-a-guide)** bieten chipspezifische Anleitungen zu Schaltplan, Layout, Stromversorgung und Schnittstellen sowie Hinweise zur Inbetriebnahme. Für Module enthalten sie zusätzlich Hinweise zur Integration auf der Trägerplatine. Verwenden Sie, sofern verfügbar, die passende Checkliste und lesen Sie zuerst die Moduleinführung, um die Eignung für die Produktarchitektur zu prüfen.
- **[M2-Module](m2-modules/interface-standards-overview.md)** enthalten die μForge-M2-Benennungsregeln und den Entwurf einer Schnittstellendefinition auf Pin-Ebene. Diese Definition ist ein Vorschlag und muss vor einer Produktionsentscheidung validiert werden.
- **[CAD & Komponenten](cad-components/components-and-cad-libraries.md)** enthält die [AVL von SiFli](cad-components/sifli-approved-vendor-list.md) und die [offiziellen EDA-Bibliotheken](cad-components/eda-tool-libraries.md). Beides ersetzt nicht die abschließende Prüfung anhand des genauen Bauteils, der Gehäusezeichnung und des ausgewählten Designleitfadens.

## Eine Produktionsreferenz ist kein Ersatz für Validierung { #a-production-reference-is-not-a-substitute-for-validation }

Designleitfäden und qualifizierte Komponentenlisten reduzieren das Risiko, belegen aber nicht die Validierung des fertigen Produkts. Prüfen Sie die finale PCB-Revision, das Firmware-Image, das Gehäuse, die Batterie, das Display, den Speicher, das RF-Verhalten, die Betriebsumgebung und den Fertigungstestablauf. Dokumentieren Sie Abweichungen von einem Leitfaden oder einer Checkliste als explizite technische Entscheidungen statt als undokumentierte Ausnahmen.
