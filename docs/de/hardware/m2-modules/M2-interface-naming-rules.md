---
icon: lucide/plug
description: "Benennungsregeln für die M2-Modulschnittstelle von μForge und ihre Erweiterungen M2xM/M2xA/M2xN/M2xH/M2xP, mit Deklarationsbeispielen und Designprinzipien."
tags:
  - Hardware
  - Modul
  - Schnittstelle
---

# Benennungsregeln für die μForge-M2-Schnittstelle { #forge-m2-interface-naming-rules }

## Basisspezifikation { #base-specification }

Dieses Dokument legt die Bezeichnungen des vorgeschlagenen μForge-Modulschnittstellensystems fest. Es beschreibt eine Benennungskonvention, keinen veröffentlichten elektrischen oder mechanischen Standard.

In dieser Konvention bezeichnet **M2** die gemeinsame, verpflichtende Basisschnittstelle für Module, die diese Konvention verwenden. Daraus folgt nicht, dass jedes bestehende μForge- oder SiFli-Modul M2 implementiert. Die Pinbelegung sowie die elektrischen und mechanischen Anforderungen befinden sich noch in Entwicklung und werden hier nicht festgelegt.

Bevor M2 als mit M.2 E-key kompatibel bezeichnet wird, muss eine veröffentlichte M2-Definition die mechanische Schnittstelle, Pinbelegung, elektrischen Grenzwerte, erforderlichen und optionalen Signale, Anforderungen an die Trägerplatine und Konformitätsregeln festlegen. Die aktuelle [M2-Schnittstellendefinition](M2-interface-definition.md) ist ein Entwurf. Die Bezeichnung M2 allein belegt weder elektrische Kompatibilität mit M.2 noch die Austauschbarkeit eines Moduls zwischen verschiedenen Trägerplatinen.

## Erweiterungsspezifikationen { #extension-specifications }

Optionale Funktionen werden in **M2xY**-Erweiterungsspezifikationen zusammengefasst. Die Bezeichnungen kennzeichnen Funktionskategorien, garantieren aber nicht, dass ein bestimmtes Modul alle Funktionen einer Kategorie implementiert.

**Benennungsformat:**

> **M2xY**

Dabei gilt:

- **M2** = Basis-Schnittstellenspezifikation
- **x** = Erweiterungstrenner
- **Y** = Erweiterungskategorie

## Erweiterungskategorien { #extension-categories }

<div align="center"><em>M2-Erweiterungskategorien</em></div>

<div align="center" markdown>

| Spezifikation | Beschreibung |
| --- | --- |
| **M2xM** | Multimedia: geplant für RGB-Displays, DVP-Kameras, Digitalmikrofone und erweiterte Audiofunktionen. |
| **M2xA** | Analog: geplant für präzise analoge Ein-/Ausgänge und Datenerfassung. |
| **M2xN** | Netzwerk: geplant für Ethernet, CAN und industrielle Vernetzung. |
| **M2xH** | High-Speed: geplant für Schnittstellen mit hoher Bandbreite. |
| **M2xP** | Stromversorgung: geplant für Energiemanagement und Ein-/Ausgänge für hohe Ströme. |

</div>

Diese Beschreibungen geben den vorgesehenen Umfang der Kategorien an, keine abschließend festgelegten elektrischen Anforderungen. Die lokal verfügbare Vorschlagsarbeitsmappe enthält Kontaktbelegungen für M2 und M2xM. Der Artikel zur Schnittstellendefinition enthält außerdem Zusammenfassungen zu M2xN und M2xA. Es wurden jedoch keine Original-Kontaktbelegungen gefunden, anhand derer sich diese Zusammenfassungen prüfen ließen; sie sind daher ungeprüft. M2xH und M2xP sind reservierte Bezeichnungen ohne zugewiesene Kontakte.

## Moduldeklaration { #module-declaration }

Ein Modul, das diese Konvention übernimmt, führt **M2** als Basisschnittstelle auf und kann eine oder mehrere implementierte Erweiterungen angeben. Seine Dokumentation muss außerdem die tatsächlich verwendeten Steckverbinder, optionalen Funktionen und gegenseitig ausschließenden Betriebsarten nennen.

Beispiele für die Angabe, keine Liste bereits veröffentlichter Modulkonfigurationen:

- **M2**
- **M2 + M2xM**
- **M2 + M2xA**
- **M2 + M2xM + M2xN**

## Designprinzipien { #design-principles }

- **M2** soll bei der Weiterentwicklung des Systems stabil und abwärtskompatibel bleiben. Die Kompatibilität muss anhand der geltenden Spezifikationsrevisionen und der tatsächlichen Implementierung geprüft werden.
- Jede **M2xY**-Erweiterung hat einen eigenen Funktionsumfang. Getrennte Bezeichnungen bedeuten nicht, dass alle Funktionen gleichzeitig nutzbar oder ihre Pinbelegungen voneinander unabhängig sind.
- Erweiterungen ergänzen die Basisschnittstelle, ohne sie zu verändern oder zu ersetzen.
- Module geben ihre unterstützten Funktionen durch eine Liste der implementierten M2xY-Spezifikationen an.

Folgen Sie vor der Auswahl eines Steckverbinders oder einer Kompatibilitätszusage dem Prüfablauf unter [Modulschnittstellen-Standards](interface-standards-overview.md).
