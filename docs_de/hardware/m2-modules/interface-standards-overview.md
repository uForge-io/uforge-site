---
icon: lucide/cable
description: "Die μForge-M2-Modulschnittstellenkonventionen: Verwenden Sie die Benennungsregeln für eine stabile Terminologie und validieren Sie den Entwurf der Schnittstellendefinition auf Pin-Ebene, bevor Sie die Trägerplatine festlegen."
tags:
    - Hardware
    - Modul
    - Schnittstelle
---

# Modulschnittstellen-Standards { #module-interface-standards }

Dieser Abschnitt stellt die Konventionen zur Beschreibung von μForge-Modulschnittstellen vor. Lesen Sie ihn, bevor Sie sich auf einen Trägerplatinen-Steckverbinder, eine Pinbelegung oder eine Kompatibilitätsaussage festlegen. Er verweist auf zwei unterschiedliche Arten von Dokumenten: Benennungsregeln für eine gemeinsame Terminologie und einen Vorschlag auf Pin-Ebene, der die Planung unterstützen kann, aber für das ausgewählte Modul und Produkt validiert werden muss.

## Die Dokumente in der richtigen Reihenfolge verwenden { #use-the-documents-in-the-right-order }

<div align="center"><em>Tabelle: Modulschnittstellen-Dokumente</em></div>

<div align="center" markdown>

| Dokument | Status und Zweck | Verwendung |
|:---------|:-------------------|:------------|
| [Benennungsregeln für die μForge-M2-Schnittstelle](M2%20Interface%20Naming%20Rules.md) | Benennungskonvention für M2-Schnittstellenfamilien und -profile. | Zum Benennen eines Moduls, Steckverbinders, einer Trägerplatine oder eines Schnittstellenprofils in Dokumentation und Designdateien. |
| [M2-Schnittstellendefinition](M2-interface-definition.md) | Entwurf der Definition auf Pin-Ebene und Vorschlag zur Signalzuordnung. | Beim Prüfen einer vorgeschlagenen M2-Trägerplatinen-Schnittstelle und möglicher Konflikte bei der Signalnutzung, bevor der Steckverbinder festgelegt wird. |

</div>

## Benennung und elektrische Kompatibilität { #what-is-stable-and-what-must-be-verified }

Verwenden Sie die Benennungsregeln einheitlich in Modulbeschreibungen, Schaltplänen, Stücklistenhinweisen und Produktdokumentation. Die Namen beschreiben das vorgesehene Schnittstellenprofil, keine endgültige elektrische oder mechanische Spezifikation. Weder ein Profilname noch eine passende Steckverbinderform belegt die Austauschbarkeit von Modul und Trägerplatine.

Die Definition auf Pin-Ebene ist keine Zusage, dass jedes μForge-Modul oder SF32-Gehäuse jedes zugewiesene Signal, jede Schnittstelle oder jede Kombination zur gleichzeitigen Nutzung unterstützt. Prüfen Sie vor einer Designfestlegung alle folgenden Punkte anhand des genau ausgewählten Moduls, Chips, Gehäuses und Hardware-Design-Leitfadens:

- mechanische Steckverbinderzeichnung, Kodierung, Pinnummerierung und Montagebeschränkungen;
- Versorgungsspannungen, Spannungsdomänen, Strombelastbarkeit und Versorgungssequenz;
- Schnittstellenverfügbarkeit, Pin-Multiplexing und alle sich gegenseitig ausschließenden Funktionen;
- Signalintegrität, Impedanz, Längenanpassung sowie Anforderungen an ESD und RF-Freihaltebereiche;
- Debug-, Boot-, Wiederherstellungs- und Fertigungstestzugang; und
- die Anforderungen der Trägerplatine an Display, Kamera, Audio, Speicher und Komponenten für drahtlose Kommunikation.

## Entscheidungspfad für die Trägerplatine { #carrier-board-decision-path }

1. Wählen Sie das Modul aus und lesen Sie seine Einführung und seinen Hardware-Design-Leitfaden.
2. Verwenden Sie die [Benennungsregeln für die μForge-M2-Schnittstelle](M2%20Interface%20Naming%20Rules.md), um das beabsichtigte Profil eindeutig zu beschreiben.
3. Verwenden Sie die [M2-Schnittstellendefinition](M2-interface-definition.md), um Kandidatensignale und Konflikte bei der gemeinsamen Nutzung zu identifizieren.
4. Bestätigen Sie jeden verwendeten Kontakt in der modulspezifischen Dokumentation und der jeweils zutreffenden SiFli-Quelldokumentation.
5. Halten Sie vor Beginn des Layouts die Dokumentversionen, die Revisionen von Modul und Trägerplatine, bestätigte Ausnahmen und offene Fragen in der Schaltplanprüfung fest.

Fahren Sie für eine vollständige Trägerplatinen-Überprüfung mit [Design für die Produktion](../design-for-production.md) fort. Verwenden Sie für modulspezifische Implementierungsanforderungen den passenden Modul-Leitfaden in der Gruppe **Hardware-Design-Leitfäden**.
