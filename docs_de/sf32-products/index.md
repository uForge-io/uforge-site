---
icon: lucide/cpu
title: "SF32-Produkte"
description: "SF32-Hardware erkunden, Produkt planen, Chip, Modul oder Entwicklungsboard wählen, Referenzdesign wiederverwenden und das Design für die Produktion vorbereiten."
tags:
    - Hardware
    - Übersicht
---

# SF32-Produkte { #sf32-products }

Der Bereich SF32-Produkte begleitet Sie von der Produktidee bis zu einem umsetzbaren SF32-Design. Hier lernen Sie die SF32-Familie kennen, treffen und überprüfen eine Hardwareauswahl, finden eine wiederverwendbare technische Basis und gelangen zu den Unterlagen für die Produktionsvorbereitung.

## Den passenden Einstieg wählen { #choose-your-starting-point }
<div align="center"><em>Orientierung bei der Hardwareauswahl</em></div>

<div align="center" markdown>

| Aufgabe | Hier starten | Das finden Sie hier |
|:----------|:-----------|:--------------------|
| SF32-Familie erkunden | [SF32 verstehen](family/SF32_family.md) | Vergleich der Produktfamilien und Regeln zum Entschlüsseln einer bestellbaren Teilenummer. |
| Aus einer Idee einen Produktplan machen | [Produkt planen](family/product-planning.md) | Ein schrittweiser Weg von den Anforderungen und der Geräteauswahl über die Boardvalidierung bis zur Produktionsvorbereitung. |
| Chip oder Modul auswählen | [SF32-Produktauswahl](product-selector.md) | Interaktive Vorauswahl von Chips und Modulen, wichtige Auswahlkriterien und Produktübersichten. Entwicklungsboards sind separat als Validierungsplattformen aufgeführt. |
| Eine technische Basis wiederverwenden | [Referenzdesigns](../hardware/reference-designs/reference-designs.md) | Reproduzierbare Hardware- und Software-Ausgangspunkte, deren Validierung und die Grenzen der Wiederverwendung. |
| Ein Platinendesign freigeben | [Design für die Produktion](../hardware/design-for-production.md) | Designleitfäden, Checklisten, Schnittstellendefinitionen, freigegebene Bauteile und offizielle EDA-Bibliotheken. |

</div>

## Inhalte dieses Bereichs { #what-this-section-covers }
Die [SF32-Familienübersicht](family/SF32_family.md) zeigt die verfügbaren Produktfamilien und die grundlegenden Unterschiede ihres Funktionsumfangs. Sobald Familie und Gehäuse eingegrenzt sind, helfen die [Benennungsregeln](family/SF32_namingrule.md), die vollständige Teilenummer zu entschlüsseln.

Nutzen Sie die [SF32-Produktauswahl](product-selector.md), wenn Anforderungen an Stromversorgung, Gehäuse, Display, Audio, Speicher, GPIO, Konnektivität oder spezielle Hardware die Auswahl bestimmen. Sie dient zur Vorauswahl. Die genaue Teilenummer, das Gehäuse, die elektrischen Grenzwerte und das Routing auf Platinenebene müssen weiterhin anhand der passenden SiFli-Dokumentation geprüft werden.

Sobald die Richtung feststeht, führen die [Referenzdesigns](../hardware/reference-designs/reference-designs.md) und der [Weg zur Produktion](../hardware/design-for-production.md) weiter. Sie verbinden die Geräteauswahl mit Referenzhardware, Designhinweisen, CAD-Bibliotheken, BOM-Entscheidungen, Checklisten für Designreviews und Inbetriebnahme-Nachweisen.

## Direkt zu den Hardwareprodukten { #browse-hardware-directly }
Wenn Sie bereits wissen, welche Hardware Sie benötigen, wechseln Sie direkt zum passenden Katalog:

- [Chips](family/SF32_family.md): Informationen zu Gerätefamilien und zur Bauteilauswahl.
- [Module](modules/SF32LB52-MOD-1.md): Planung einer Trägerplatine auf Basis eines Moduls mit bereits integriertem Funkteil und den zentralen Komponenten.
- [Entwicklungsboards](devkits/SF32LB52-DevKit-LCD.md): unterstützte Hardware zur Validierung von Software und Peripherie.

Die Hardwaredokumentation beschreibt den Weg zur physischen Produktrealisierung. Informationen zu SDK-Einrichtung, Beispielen, Toolchains und unterstützten Softwareplattformen finden Sie unter [Entwicklung](../develop/index.md).
