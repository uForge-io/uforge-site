---
icon: lucide/waypoints
description: "Referenzdesign-Pfade für μForge: Vergleichen Sie reproduzierbare Hardware- und Softwarevalidierungen und wählen Sie den Pfad, der Ihrem Produkt am nächsten kommt."
tags:
    - Hardware
    - Referenzdesign
---

# Referenzdesigns { #reference-designs }

Referenzdesigns verbinden die Produktplanung mit der Umsetzung. Eine wiederverwendbare Hardware- und Softwarebasis sollte Ausgangshardware, Softwareversion, verfügbare Designdateien, Inbetriebnahmenachweise und Grenzen der Wiederverwendung benennen. Die hier aufgeführten Referenzpfade helfen dabei, diese Basis aufzubauen und zu validieren. Ihre Aufnahme in diese Übersicht belegt jedoch weder einen freigegebenen Schaltplan noch eine freigegebene Stückliste noch ein Paket zur Produktionsqualifizierung.

Verwenden Sie [Ein Produkt planen](../../sf32-products/family/product-planning.md), um eine erste Vorauswahl zu treffen. Wählen Sie anschließend den passenden Referenzpfad aus, um die Boardvalidierung zu planen und Produktrisiken zu reduzieren.

## Referenzdesigns und Projekte { #reference-designs-and-projects }

Verwenden Sie ein Referenzdesign, um die Frage zu beantworten: **„Von welcher wiederverwendbaren technischen Basis kann ich ausgehen?“** Verwenden Sie ein [Projekt](../../projects/index.md), um die Frage zu beantworten: **„Wie führe ich ein bestimmtes Produkt von dieser Basis durch Integrations- und Freigabeentscheidungen?“**

<div align="center"><em>Tabelle: Abgrenzung zwischen Referenzdesign und Projekt</em></div>

<div align="center" markdown>

| Element | Referenzdesign | Projekt |
|:-----|:-----------------|:--------|
| Primäre Rolle | Eine wiederverwendbare technische Basis. | Ein produktspezifischer Weg durch Integration und Freigabeentscheidungen. |
| Kernnachweise | Hardware- und Softwarebasis, Designdateien oder Hinweise zu ihrer Verfügbarkeit, Ergebnisse der Inbetriebnahme und Grenzen der Wiederverwendung. | Produktentscheidungen, Abhängigkeiten, Anpassungsphasen, Prüfpunkte für die Validierung und Freigabenachweise. |
| Erwartete Wiederverwendung | Leser können die Basis für mehrere Produkte übernehmen und anpassen. | Leser verfolgen den Weg eines konkreten Produkts und nehmen kontrollierte, produktspezifische Änderungen vor. |
| Beziehung | Verweist auf Projekte, die das Referenzdesign nutzen. | Verweist gegebenenfalls auf das Referenzdesign, von dem das Projekt ausgeht. |

</div>

## Verfügbare Referenzpfade { #available-journeys }

Der aktuelle Pfad für ein vernetztes Wearable beschreibt einen Validierungsablauf, kein freigegebenes Referenzboard-Paket. Auf dieser Seite sind bisher weder eine festgelegte Kombination aus Entwicklungsboard-Revision und SDK-Version noch ein freigegebener Stand der Designdateien noch ein messbasierter Qualifizierungsnachweis veröffentlicht. Legen Sie diese Grundlagen für Ihr Produkt fest und dokumentieren Sie sie, bevor Sie die Ergebnisse als reproduzierbar betrachten.

<div align="center"><em>Tabelle: Referenzdesign-Pfade</em></div>

<div align="center" markdown>

| Referenzpfad | Produktschwerpunkt | Hardwarebasis | Softwarebasis | Validierungsschwerpunkt |
|:--------|:--------------|:------------------|:------------------|:--------------------|
| [Vernetztes Wearable](connected-wearable-journey.md) | Kompaktes akkubetriebenes Produkt mit Display, BLE und Sensoreingabe. | SF32LB52-DevKit-LCD oder ein geeignetes alternatives Entwicklungsboard, anschließend eine eigene Platine mit dem gewählten Chip oder Modul. | SiFli-SDK `hello_world` und produktrelevante Beispiele. | Display, Bluetooth, Sensorverhalten, Schlaf-/Aufwachverhalten, Wiederherstellung und Nachweise zur produktionsgerechten Auslegung. |

</div>

## Einen Referenzpfad verwenden { #how-to-use-a-journey }

1. Prüfen Sie, ob der Produktschwerpunkt und die ausgewählte Hardware zu Ihren Entwurfsanforderungen passen.
2. Reproduzieren Sie die Softwarebasis auf dem angegebenen Entwicklungsboard, bevor Sie sie anpassen.
3. Halten Sie das genaue Entwicklungsboard-Modell, die SDK-Version, das Beispiel, den Build-/Flash-Befehl und die serielle Protokollausgabe in der Projektdokumentation fest.
4. Ergänzen Sie produktspezifische Validierungen für jede Änderung an Display, Speicherbauteil, Akkuversorgung, RF-Design, Gehäuse oder Schnittstelle.
5. Übergeben Sie die Ergebnisse an [Design für die Produktion](../design-for-production.md), einschließlich des ausgewählten Leitfadens, der Checkliste, der AVL-Entscheidungen, des Wiederherstellungsansatzes und der verbleibenden Risiken.

## Einen neuen Referenzpfad hinzufügen { #adding-a-new-journey }

Bevor Sie einen Referenzpfad als reproduzierbare technische Basis vorstellen, dokumentieren Sie Zielprodukt und Zielgruppe, unterstützte Hardware- und Softwareversionen, Voraussetzungen, Quellrepository, Meilensteine, Validierungskriterien, Messungen und die Übergabe zur Produktanpassung. Ist er noch ein Planungsablauf, kennzeichnen Sie diesen Status und die fehlenden Nachweise ausdrücklich, statt eine bereits erfolgte Qualifizierung anzudeuten.

Verwenden Sie [Projekte](../../projects/index.md) für durchgängige, projektbezogene Umsetzungen, die über einen wiederverwendbaren Referenzpfad hinausgehen. Ein Projekt sollte auf das passende Referenzdesign verweisen, statt dessen Hardwarebasis, Designdateien oder Fertigungsunterlagen zu duplizieren.
