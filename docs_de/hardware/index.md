---
icon: lucide/cpu
title: Hardware
description: Verwenden Sie eine passende SF32-Referenzkonfiguration oder setzen Sie das ausgewählte Gerät auf einer eigenen Platine um und bereiten Sie das Design für die Fertigung vor.
---

# Hardware { #hardware }

Nach der Auswahl eines SF32-Geräts und der Prüfung einer Grundkonfiguration auf einem Entwicklungsboard hilft Ihnen dieser Bereich, die Leiterplatte oder Modulträgerplatine zu entwickeln und für die Produktion vorzubereiten. Verwenden Sie bei Bedarf ein passendes Referenzdesign, folgen Sie dem bausteinspezifischen Leitfaden und stellen Sie die Nachweise und Unterlagen für die Prüfung der Fertigungsreife zusammen.

## Startpunkt wählen { #choose-a-starting-point }

<div align="center"><em>Hardware-Pfade</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Ihre Aufgabe | Hier beginnen | Ergebnis |
|:----------|:-----------|:--------|
| Eine validierte Hardware- und Softwarekonfiguration wiederverwenden | [Referenzdesigns](reference-designs/reference-designs.md) | Ein reproduzierbarer Ausgangspunkt, die Prüfschwerpunkte und die Grenzen der Wiederverwendung. |
| Eine Leiterplatte direkt für den Chip oder eine Trägerplatine für ein Modul entwickeln | [Passenden Leitfaden finden](#find-a-guide) | Der passende Entwurfsleitfaden für Chip oder Modul und die verfügbare Checkliste. |
| Eine Modulschnittstelle anhand des M2-Vorschlags planen | [M2-Module](m2-modules/interface-standards-overview.md) | Die M2-Benennungsregeln und der mit dem gewählten Modul abzugleichende Entwurf der Pinbelegung. |
| CAD- und Stücklistenunterlagen vorbereiten | [CAD & Komponenten](cad-components/components-and-cad-libraries.md) | Offizielle EDA-Bibliotheken, AVL-Ressourcen und die für das ausgewählte Gerät nötigen Prüfungen. |
| Ein Designpaket zur Fertigung freigeben | [Design für die Produktion](design-for-production.md) | Prüfung der Fertigungsreife, aufzubewahrende Nachweise und Übergabe an die Fertigung. |

</div>

## Leitfaden finden { #find-a-guide }

Wählen Sie den Chip oder das Modul aus, auf dem Ihr Design basiert, und öffnen Sie den passenden Hardware-Design-Leitfaden. Sind Gehäuse, Stromversorgung, Speicherkonfiguration oder Integrationskonzept noch offen, sehen Sie sich zunächst die Produkteinführung an.

### Chip-Leitfäden und Checklisten { #chip-guides-and-checklists }

<div align="center"><em>Tabelle: Chip-Leitfäden und Checklisten</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Ausgewählte Chip-Familie | Hardware-Design-Leitfaden | Checkliste | Hier beginnen, wenn |
|:---------------------|:----------------------|:----------|:----------------|
| SF32LB52x | [Leitfaden](chip-guides/SF32LB52x_hardware_design_guide.md) | [Checkliste](chip-guides/SF32LB52x_hardware_design_guide.md#using-the-checklists) | Sie eine Leiterplatte für den direkt bestückten SF32LB52x entwickeln. |
| SF32LB55x | [Leitfaden](chip-guides/SF32LB55x_hardware_design_guide.md) | [Checkliste](chip-guides/SF32LB55x_hardware_design_guide.md#using-the-checklists) | Sie eine Leiterplatte für den direkt bestückten SF32LB55x entwickeln. |
| SF32LB56x | [Leitfaden](chip-guides/SF32LB56x_hardware_design_guide.md) | [Checkliste](chip-guides/SF32LB56x_hardware_design_guide.md#using-the-checklists) | Sie eine Leiterplatte für den direkt bestückten SF32LB56x entwickeln. |
| SF32LB57x | Leitfaden | Schaltplan / PCB-Layout | Sie eine Leiterplatte für den direkt bestückten SF32LB57x entwickeln. |
| SF32LB58x | [Leitfaden](chip-guides/SF32LB58x_hardware_design_guide.md) | [Checkliste](chip-guides/SF32LB58x_hardware_design_guide.md#using-the-checklists) | Sie eine Leiterplatte für den direkt bestückten SF32LB58x entwickeln. |

</div>

### Modul-Leitfäden { #module-guides }

<div align="center"><em>Tabelle: Leitfäden zur Modulintegration</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Ausgewähltes Modul | Modul-Leitfaden | Schwerpunkte |
|:----------------|:-------------|:-----------|
| SF32LB52-MOD-1 | [Modul-Leitfaden](chip-guides/SF32LB52-MOD-1_hardware_design_guide.md) | Stromversorgung und Pinbelegung der Trägerplatine, Antennenfreiraum und Handhabung bei der Fertigung. |
| SF32LB56-MOD | [Modul-Leitfaden](chip-guides/SF32LB56-MOD_hardware_design_guide.md) | Integration auf der Trägerplatine, Stromversorgung, Layout der RF-Schaltung, Schnittstellen und Validierung. |
| SF32LB58-MOD | [Modul-Leitfaden](chip-guides/SF32LB58-MOD_hardware_design_guide.md) | Stromversorgung und Pinbelegung der Trägerplatine, Antennenfreiraum und Handhabung bei der Fertigung. |

</div>

## Dem Hardware-Pfad folgen { #follow-the-hardware-path }

1. **Eine passende Referenzkonfiguration wiederverwenden.** Stellen Sie zunächst die darin angegebene Hardware- und Softwarekonfiguration nach und passen Sie sie erst danach an. Gibt es keine geeignete Referenzkonfiguration, beginnen Sie direkt mit dem Leitfaden für das ausgewählte Gerät.
2. **Entwickeln und prüfen.** Lesen Sie vor dem Schaltplanentwurf den passenden Leitfaden und nutzen Sie dessen Checkliste bei der Prüfung von Schaltplan und Leiterplattenlayout. Prüfen Sie die vorgesehene Software und Peripherie auf dem am besten passenden [Entwicklungsboard](../sf32-products/index.md), bevor Sie das Hardwaredesign endgültig festlegen. Tests auf dem Entwicklungsboard ersetzen nicht die Prüfung von Stromversorgung, Pinfunktionen und RF-Verhalten auf der endgültigen Leiterplatte.
3. **M2-Unterlagen verwenden, wenn die Trägerplatine dem M2-Vorschlag folgen soll.** Berücksichtigen Sie die [M2-Benennungsregeln](m2-modules/M2%20Interface%20Naming%20Rules.md) und prüfen Sie die [Schnittstellendefinition](m2-modules/M2-interface-definition.md) für das genaue Modul, bevor Sie die Schnittstelle festlegen; die Pinbelegung ist weiterhin ein Entwurf.
4. **CAD-Unterlagen und Bauteilauswahl prüfen.** Gleichen Sie mit [CAD & Komponenten](cad-components/components-and-cad-libraries.md) Symbol, Footprint, Gehäusezeichnung, AVL und Annahmen zu kritischen Bauteilen für die genaue Bestellnummer ab.
5. **Freigabe-Kontrollpunkt abschließen.** Wechseln Sie zu [Design für die Produktion](design-for-production.md), sobald Designnachweise, genehmigte Abweichungen, offene Risiken und Annahmen zu Fertigungstests vorliegen.

## Weitere Entwicklungsschritte { #stay-connected-to-the-platform-path }

Falls noch unklar ist, welches Gerät, welches Modul oder welches Entwicklungsboard passt, kehren Sie zu [SF32-Produkte](../sf32-products/index.md) zurück. Eine wiederholbare Ausgangskonfiguration für Toolchain, Flashen und serielle Logausgabe finden Sie unter [Erste Schritte](../getting-started/index.md). Unter [Entwickeln](../develop/index.md) finden Sie Hinweise zur Software, die zusammen mit der Hardware validiert werden muss.
