---
icon: lucide/map
description: "Eine praktische SF32-Tutorial-Roadmap, organisiert nach technischem Ergebnis: erste Peripherie, verbundene Subsysteme und Produktvalidierung."
tags:
    - Tutorials
---

# Tutorial-Übersicht { #tutorials-overview }

Diese Reihe baut auf dem ersten erfolgreichen Flash-Vorgang auf und vermittelt praktische Entwicklungsfähigkeiten für SF32. Sie ist nach dem jeweiligen Entwicklungsziel gegliedert: zuerst ein Peripheriegerät praktisch erproben, dann Subsysteme kombinieren und schließlich die nötigen Nachweise für ein Produkt erarbeiten. Die Tutorials verwenden SiFli-SDK-Beispiele als Ausgangspunkt. Hardware zu prüfen, eine bewährte Ausgangskonfiguration beizubehalten und Ergebnisse zu messen, ist jedoch bei jedem Softwarepfad für SF32 sinnvoll.

Tutorials sind die zweite Stufe von [Erste Schritte](../index.md). Erfüllen Sie zunächst die dort genannten Kriterien für eine erfolgreiche erste Inbetriebnahme. Wenn Sie einen Chip, ein Modul oder ein Entwicklungsboard auswählen, beginnen Sie mit der [SF32-Familie](../../sf32-products/family/SF32_family.md), bevor Sie mit der Reihe beginnen.

## Was Sie benötigen { #what-you-need }

Verwenden Sie ein Entwicklungsboard für SF32 mit funktionierender USB-Datenverbindung und serieller Konsole. `sf32lb52-lcd_n16r8` ist beispielsweise der SiFli-SDK-Boardname für das SF32LB52-DevKit-LCD_N16R8. Diese Reihe setzt nicht voraus, dass ein einzelnes Board alle Übungen unterstützt: Prüfen Sie für jedes Beispiel die Liste der unterstützten Plattformen und gleichen Sie Pins, Peripherie, Display, Audio und Speicher mit den entsprechenden Schaltplan- und Board-Dateien ab. Die offiziellen [unterstützten Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) enthalten die SDK-Boardkennungen für SF32LB52x.

<div align="center"><em>Tabelle: Tutorial-Voraussetzungen</em></div>

<div align="center" markdown>

| Element | Mindestprüfung der Einsatzbereitschaft |
|:-----|:------------------------|
| Toolchain | SiFli-SDK kann ein bekanntes, funktionierendes Beispiel für Ihr Board bauen. |
| Flash-Ablauf | Sie können das Board wiederholt programmieren, ohne die Einrichtung zu ändern. |
| Serielle Konsole | Sie können Boot-Logs sehen und auf den FinSH-`msh>`-Prompt zugreifen. |
| Board-Informationen | Halten Sie den Schaltplan oder die Support-Dateien des Boards bereit, bevor Sie Pins oder Peripherie zuweisen. |
| Messwerkzeuge | Verwenden Sie bei Bedarf ein Multimeter oder einen Logikanalysator; für Energiesparmessungen benötigen Sie einen geeigneten Strommessaufbau. |

</div>

## Empfohlener Lernpfad { #recommended-learning-path }

<div align="center"><em>Tabelle: Tutorial-Roadmap</em></div>

<div align="center" markdown>

| Lernziel | Startbedingung | Inhalte | Weiter, wenn |
|:------|:-----------|:------------------|:--------------|
| [Einstieg in die Peripherie](beginner.md) | `hello_world` lässt sich flashen und gibt Text über die serielle Konsole aus. | GPIO, FinSH, ADC, PWM, RTC und ein kleines Board-Projekt. | Fahren Sie fort, wenn Sie einen Eingang, einen Ausgang und ein grundlegendes Peripheriegerät selbstständig prüfen können. |
| [Subsystemintegration](intermediate.md) | Einzelne Peripheriegeräte funktionieren zuverlässig. | Sensoren über I2C, LVGL, BLE, Audio, Speicher und gezielte Koexistenztests. | Fahren Sie fort, wenn zwei Subsysteme gemeinsam stabil laufen. |
| [Produktvalidierung](advanced.md) | Sie können Middleware integrieren und gängige Fehler diagnostizieren. | Gemessene Leistungsaufnahme, OTA-Wiederherstellung, kundenspezifische Displays, Absturzanalyse, BLE mit mehreren Verbindungen und wiederverwendbare Treiber. | Nutzen Sie passende Artikel aus den Bereichen Entwicklung und Lernen als fortlaufende Referenzen für die Implementierung. |

</div>

Die Reihenfolge ist bewusst gewählt. Beginnen Sie nicht mit einem Display, BLE-Dienst oder kundenspezifischen Treiber, bevor Board, Flash-Ablauf, serielle Konsole und ein einfacher GPIO-Test nachweislich funktionieren. Schlägt ein späteres Tutorial fehl, kehren Sie zur letzten Stufe zurück, deren Erfolgskriterium sich noch reproduzieren lässt.

## So verwenden Sie jedes Tutorial { #how-to-use-each-tutorial }

Jede Übung nennt ein passendes SDK-Beispiel, ein Ziel, ein Erfolgskriterium und mögliche Prüfungen bei Fehlern. Beginnen Sie mit dem genannten Beispiel statt mit einem leeren Projekt, ändern Sie jeweils nur ein Verhalten und sichern Sie einen nachweislich funktionierenden Build, bevor Sie Funktionen kombinieren. Notieren Sie Board-Revision, SDK-Version, Boardnamen und beobachtete Ergebnisse für Konfigurationen, die Sie wiederverwenden möchten.

Die Tutorials ersetzen absichtlich nicht das Referenzmaterial:

- Verwenden Sie [Entwicklung](../../develop/index.md) für Plattform-Workflows, Tools, Firmware-Themen und den konsolidierten SDK-Beispielindex.
- Verwenden Sie [Lernen](../../learn/graphics/overview.md) für Architektur- und Subsystementscheidungen, etwa zur Grafikpipeline, zum Bluetooth-Verhalten und zur Energiestrategie.
- Verwenden Sie die [SF32-Familie](../../sf32-products/family/SF32_family.md) für die Geräteauswahl, Board-Informationen, Hardware-Design-Anleitung und Produktionsprüfungen.
