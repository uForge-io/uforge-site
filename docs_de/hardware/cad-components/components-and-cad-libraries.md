---
icon: lucide/boxes
description: "Beginnen Sie ein SF32-Produktionsdesign mit qualifizierten Bauteilen und offiziellen CAD-Daten und prüfen Sie anschließend Stückliste und Layout in der richtigen Reihenfolge."
tags:
    - Hardware
    - Produktion
    - CAD
---

# Komponenten und CAD-Bibliotheken { #components-and-cad-libraries }

Verwenden Sie diese Seite, wenn ein ausgewählter SF32-Chip oder ein SF32-Modul nach der Architekturentscheidung in eine verbindliche Stückliste und ein PCB-Design überführt wird. Die beiden folgenden Ressourcen erfüllen unterschiedliche Aufgaben: Die **freigegebene Lieferantenliste (AVL)** hilft bei der Auswahl von Komponenten, deren Eignung SiFli bestätigt hat. Die **EDA-Tool-Bibliotheken** stellen Symbole, Footprints und Referenzprojektdaten als Grundlage für die korrekte Umsetzung der gewählten Hardware bereit.

Keine der beiden Ressourcen ersetzt den gerätespezifischen Hardware-Design-Leitfaden, die Gehäusezeichnung oder die abschließende Validierung auf der für die Serienfertigung vorgesehenen Leiterplatte.

## Die richtige Ressource wählen { #choose-the-right-resource }

<div align="center"><em>Tabelle: Komponenten- und CAD-Ressourcen</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Ressource | Verwendung | Kein Ersatz für |
|:---------|:-----------|:----------------------------------|
| [Freigegebene Lieferantenliste für SF32](sifli-approved-vendor-list.md) | Vorauswahl qualifizierter Quarze, Induktivitäten, Flash-Speicher und anderer unterstützter Komponenten; Prüfung elektrischer Anforderungen und Firmware-Identifikationsbeschränkungen. | Endgültige Bauteilfreigabe, Lieferkettenqualifizierung oder elektrische Validierung auf Produktebene. |
| [EDA-Tool-Bibliotheken](eda-tool-libraries.md) | Schaltplansymbole, PCB-Footprints, Gehäusezeichnungen und Referenzdesign-Daten als Ausgangspunkt in den unterstützten EDA-Tools. | Verifizierung der genauen Bestellnummer, der Padstack-Definitionen, des Fertigungsprozesses oder der aktuellen Gerätedokumentation. |

</div>

## Prüfablauf von der Stückliste bis zum CAD-Layout { #bom-to-cad-review-sequence }

1. **Die Implementierungsbasis festlegen.** Wählen Sie den exakten Chip oder das Modul, das Gehäuse, die Speicherkonfiguration, die Display-Schnittstelle und die Stromversorgungsarchitektur. Lesen Sie den zugehörigen Hardware-Design-Leitfaden, bevor Sie unterstützende Komponenten auswählen.
2. **Kritische Komponenten aus der AVL vorauswählen.** Prüfen Sie die angegebenen elektrischen Anforderungen, nicht nur eine passende Teilenummer. Achten Sie besonders auf die Lastkapazität und den ESR des Quarzes, die zulässigen Stromgrenzen der Drossel im Abwärtswandler, die Spannung und den Timing-Modus des Flash-Speichers, den Temperaturbereich und die Firmware-Kompatibilität.
3. **Den Schaltplan mit offiziellen Bibliotheken erstellen.** Verwenden Sie die relevanten EDA-Bibliotheken und Referenzdesigns als Ausgangspunkt. Vergleichen Sie jedes Symbol, jeden Footprint, jede Pinnummer, jede Lötflächenanordnung und jede Keep-out-Regel separat mit dem aktuellen Datenblatt und der Gehäusezeichnung des ausgewählten Geräts.
4. **Die vollständige Stückliste und das Layout gemeinsam überprüfen.** Stellen Sie sicher, dass jede qualifizierte Komponente weiterhin zu den tatsächlichen Versorgungsspannungen und -strömen, zur Schnittstellengeschwindigkeit, zum Fertigungsprozess und zu den Gehäusebeschränkungen passt. Wenden Sie die Anforderungen des Geräte- oder Modul-Designleitfadens für Stromversorgung, RF, Taktsignale, Speicher, Display und Debug-Zugang an.
5. **Produktionsnahe Hardware validieren.** Prüfen Sie Start, Programmierung, Peripherie- und Funkbetrieb sowie Wiederherstellung und messen Sie die Leistungsaufnahme auf der Leiterplatte in ihrer endgültigen Revision. Dokumentieren Sie freigegebene Alternativbauteile und jede bewusste Abweichung vom Leitfaden oder der AVL.

## Praktische Grenzen { #practical-boundaries }

- Eine AVL ist eine Momentaufnahme der Qualifizierung. Prüfen Sie die Revision der Liste und die Verfügbarkeit der Bauteile erneut, bevor Sie eine Produktionsstückliste freigeben.
- Eine EDA-Bibliothek liefert Ausgangsdaten für den Entwurf, ist aber kein Nachweis dafür, dass ein fertiges Layout fertigungsfähig oder elektrisch korrekt ist.
- Wenn eine Komponente nicht in der AVL aufgeführt ist, qualifizieren Sie sie anhand der relevanten Anforderungen und validieren Sie sie auf der Zielhardware, bevor sie in Serie eingesetzt wird.
- Bei einem modulbasierten Produkt beginnen Sie mit dem Designleitfaden des Moduls; die Stückliste und das Layout der Trägerplatine erfordern weiterhin dieselbe Überprüfungsdisziplin.

Fahren Sie mit [Design für die Produktion](../design-for-production.md) fort, um den vollständigen Designprüfungsablauf zu erhalten, oder kehren Sie zum [SF32-Produktselektor](../../sf32-products/product-selector.md) zurück, falls die Chip-, Modul- oder Boardbasis noch nicht ausgewählt wurde.
