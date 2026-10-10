---
icon: lucide/waypoints
description: "Ein praktischer SF32-Referenzpfad von der Validierung auf dem SF32LB52-Entwicklungsboard bis zum Freigabeplan für die individuelle Hardware und Firmware eines vernetzten Wearables."
tags:
    - Hardware
    - Referenzdesign
---

# Referenzpfad für vernetzte Wearables { #connected-wearable-reference-design-journey }

Dieser Pfad beschreibt die Validierung eines kompakten, batteriebetriebenen, vernetzten Produkts mit Display, BLE und Sensoreingang. Er ist weder ein freigegebener Schaltplan noch eine freigegebene Stückliste oder ein qualifiziertes Referenzboard-Paket. Nutzen Sie ihn, um vor dem Entwurf eigener Hardware eine passende Hardware-/Software-Referenzkonfiguration festzulegen und zu prüfen.

1. **Produkt auswählen und Referenzkonfiguration festlegen.** Grenzen Sie die Kandidaten mit der [SF32-Familie](../../sf32-products/family/SF32_family.md) und dem [SF32-Produktselektor](../../sf32-products/product-selector.md) ein. Führen Sie SiFli-SDK `hello_world` auf einem [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md) oder einem verfügbaren Board aus, das die erforderlichen Schnittstellen und Hardware-Randbedingungen erfüllt. Dokumentieren Sie Boardrevision, SDK-Version oder Commit, Build-/Flash-Befehle und serielles Log.
2. **Produktfunktionen nachweisen.** Folgen Sie den [Tutorials](../../getting-started/tutorials/overview.md), um Eingabe- und Sensorverarbeitung, BLE, eine einfache Benutzeroberfläche, gegebenenfalls Speicher und die Wiederherstellung über die serielle Schnittstelle zu validieren.
3. **Systeminteraktionen validieren.** Verwenden Sie [Grafik](../../learn/graphics/overview.md), [Bluetooth](../../learn/bluetooth/overview.md) und [Low Power](../../learn/low-power/overview.md), um Display-Aktualisierung, Wireless-Aktivität und Schlaf-/Aufwachverhalten gemeinsam zu testen.
4. **Individuelle Hardware vorbereiten.** Nutzen Sie im Abschnitt [Design für die Produktion](../design-for-production.md) den Designleitfaden und die Checkliste des ausgewählten Chips. Prüfen Sie die Anforderungen und Annahmen zu Display, Speicher, Batterie, Antenne/RF sowie Programmierung und Test.
5. **Freigabenachweise zusammenstellen.** Bewahren Sie Boardbezeichnung und Revision, SDK-Version oder Commit, ein nachweislich funktionsfähiges Firmware-Image, Logs, gemessene Verbrauchsszenarien mit ihren Bedingungen, das OTA- und Wiederherstellungsverhalten, Stücklistenentscheidungen und die Ergebnisse der Checkliste auf.

Eine erfolgreiche Demo allein schließt diesen Ablauf nicht ab. Build, Flashen und Wiederherstellung müssen reproduzierbar sein. Messungen müssen belegen, dass die entscheidenden Subsysteme auf repräsentativer Hardware zusammenarbeiten. Halten Sie zu jedem Verbrauchsmesswert das Betriebsszenario, die Versorgungsspannung und die Messbedingungen fest, damit andere Entwickler den Vergleich reproduzieren können.
