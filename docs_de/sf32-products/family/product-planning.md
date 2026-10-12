---
icon: lucide/route
description: "Leitfaden zur SF32-Produktplanung: Chip und Integrationsform auswählen, Software und Produktrisiken auf einem Board validieren und das Design für die Fertigung vorbereiten."
tags:
    - Hardware
    - Produktplanung
---

# Ein Produkt planen { #plan-a-product }

Dieser Leitfaden strukturiert die Entscheidungen, mit denen Sie eine SF32-Idee von den ersten Anforderungen über die Validierung bis zu einem produktionsreifen Designplan führen. Arbeiten Sie die Schritte der Reihe nach durch, solange Chip, Modul, Entwicklungsboard, Softwareplattform und Fertigungskonzept noch nicht feststehen.

## Produktplanungspfad { #product-planning-path }

<div align="center"><em>Tabelle: SF32-Produktplanungspfad</em></div>

<div align="center" markdown>

| Phase | Kernentscheidung | Hier beginnen | Abnahmekriterium |
|:------|:-------------|:-----------|:---------------|
| 1. Anforderungen festlegen | Funkrolle des Geräts, Display, Audio, KI, Speicher, Stromversorgung und Energiebudget, Platzbedarf des Chipgehäuses und geplante Produktlebensdauer. | [SF32-Familie](SF32_family.md) | Priorisierte Kandidatenliste mit klar festgehaltenen Pflichtschnittstellen und Randbedingungen. |
| 2. Integrationsform wählen | Kundenspezifisches PCB mit direkt bestücktem Chip, Modul mit Trägerplatine oder Entwicklungsboard für die erste Validierung. | [SF32-Produktauswahl](../product-selector.md) | Bevorzugtes Gerät und Integrationsform sowie das am besten passende verfügbare Board oder Modul. |
| 3. Softwarebasis verifizieren | Toolchain, Flash-Vorgang, serielle Ausgabe und ein nachweislich funktionierendes Beispiel auf dem gewählten oder nächstliegenden Board. | [Erste Schritte](../../getting-started/index.md) | Ein reproduzierbarer Build- und Flash-Ablauf mit aufgezeichnetem Konsolenlog. |
| 4. Produktrisiken prüfen | Produktspezifisches Verhalten von Display, Bluetooth, Audio, KI und Speicher sowie Stromversorgungspfad und Energieverbrauchsprofil. | [Tutorials](../../getting-started/tutorials/overview.md), [Lernen](../../learn/index.md) und [Entwicklung](../../develop/index.md) | Messergebnisse für die Subsysteme, die Kosten, Leistungsaufnahme oder Terminrisiken maßgeblich beeinflussen. |
| 5. Umsetzungsplan festlegen | Schaltplan, Layout, Speicher- und Partitionsplan, Stückliste (BOM), Testkonzept, Update- und Wiederherstellungsverhalten sowie Fertigungsannahmen. | [Design für die Produktion](../../hardware/design-for-production.md) | Geprüfte Designunterlagen und eine klare Liste der noch offenen Validierungspunkte. |

</div>

## Validierung auf einem Entwicklungsboard nicht auslassen { #do-not-skip-the-board-validation-loop }

Ein Vergleich der Produktfamilie und ein erfolgreicher Build genügen nicht, um einen Chip für die Fertigung auszuwählen. Prüfen Sie vor dem Festlegen der Hardware das am besten passende Board und dokumentieren Sie dessen Namen, die SDK-Version, das verwendete Beispiel, das gemessene Verhalten und die Abweichungen zum geplanten Produkt. Verwendet das Endprodukt ein neues Display, ein neues Speicherbauteil, eine neue Akkuversorgung, Antenne oder Modul-Trägerplatine, muss jede dieser Änderungen separat validiert werden.

Wenn die anfängliche Hardware- und Softwarebasis steht, wählen Sie das nächstliegende [Referenzdesign](../../hardware/reference-designs/reference-designs.md) als vollständig ausgearbeitetes Beispiel.

## Übergabe-Checkliste { #handoff-checklist }

- [ ] Der gewählte Chip oder das Modul erfüllt die Anforderungen an Schnittstellen, Speicher, Gehäuse, Stromversorgung und Leistungsaufnahme.
- [ ] Ein unterstütztes Board oder ein konkreter Validierungsplan für die kundenspezifische Hardware liegt vor.
- [ ] Das Produktteam hat Softwareplattform und Reifegrad freigegeben.
- [ ] Anforderungen an Wiederherstellung, OTA/DFU, Protokollierung und Werksprogrammierung sind vor dem Festlegen von Partitionen und BOM definiert.
- [ ] Der passende Hardware-Design-Leitfaden, die Checkliste, AVL und EDA-Bibliothek sind ermittelt.

!!! note "Automatisch erstellter Inhalt"
    Diese Seite wurde ohne ein eigenes Quelldokument zusammengestellt und entworfen. Prüfen Sie technische Aussagen anhand der offiziellen SiFli-Dokumentation, bevor Sie sich darauf verlassen.
