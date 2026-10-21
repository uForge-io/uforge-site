---
icon: lucide/waypoints
description: "Praktischer SF32-Referenzpfad von der Validierung auf dem SF32LB52-Entwicklungsboard bis zum Freigabeplan für Hardware und Firmware eines vernetzten Wearables."
tags:
    - Hardware
    - Referenzdesign
---

# Referenzpfad für vernetzte Wearables { #connected-wearable-reference-design-journey }

Dieser Pfad beschreibt die Validierung eines kompakten, akkubetriebenen, vernetzten Produkts mit Display, BLE und Sensoreingang. Er ist weder ein freigegebener Schaltplan noch eine freigegebene Stückliste noch ein qualifiziertes Referenzboard-Paket. Nutzen Sie ihn, um vor dem Entwurf eigener Hardware eine geeignete Hardware-/Software-Referenzkonfiguration festzulegen und zu validieren.

1. **Produkt auswählen und Referenzkonfiguration festlegen.** Grenzen Sie die Kandidaten mit der [SF32-Familie](../../sf32-products/family/SF32_family.md) und dem [SF32-Produktselektor](../../sf32-products/product-selector.md) ein. Führen Sie SiFli-SDK `hello_world` auf einem [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md) oder einem verfügbaren Entwicklungsboard aus, das die erforderlichen Schnittstellen und Hardwareanforderungen erfüllt. Dokumentieren Sie Boardrevision, SDK-Version oder Commit, Build-/Flash-Befehle und die serielle Protokollausgabe.
2. **Produktfunktionen nachweisen.** Folgen Sie den [Tutorials](../../getting-started/tutorials/overview.md), um Eingabe- und Sensorverarbeitung, BLE, eine einfache Benutzeroberfläche, gegebenenfalls Speicher und die Wiederherstellung über die serielle Schnittstelle zu validieren.
3. **Systeminteraktionen validieren.** Verwenden Sie [Grafik](../../learn/graphics/overview.md), [Bluetooth](../../learn/bluetooth/overview.md) und [Low Power](../../learn/low-power/overview.md), um Display-Aktualisierung, Funkaktivität und Schlaf-/Aufwachverhalten gemeinsam zu testen.
4. **Individuelle Hardware vorbereiten.** Nutzen Sie im Abschnitt [Design für die Produktion](../design-for-production.md) den Designleitfaden und die Checkliste des ausgewählten Chips. Prüfen Sie die Anforderungen und Annahmen zu Display, Speicher, Batterie, Antenne/RF sowie Programmierung und Test.
5. **Nachweise für die Produktfreigabe zusammenstellen.** Bewahren Sie Entwicklungsboard-Modell und -Revision, SDK-Version oder Commit, ein nachweislich funktionsfähiges Firmware-Image, Logs, gemessene Leistungsaufnahmeszenarien samt Bedingungen, OTA- und Wiederherstellungsverhalten, Stücklistenentscheidungen und Checklistenergebnisse auf.

Eine erfolgreiche Demo allein schließt diesen Ablauf nicht ab. Build, Flashen und Wiederherstellung müssen reproduzierbar sein. Messungen müssen belegen, dass die entscheidenden Subsysteme auf repräsentativer Hardware zusammenarbeiten. Halten Sie zu jedem Verbrauchsmesswert das Betriebsszenario, die Versorgungsspannung und die Messbedingungen fest, damit andere Entwickler den Vergleich reproduzieren können.
