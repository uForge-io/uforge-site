---
icon: lucide/circle-help
description: "SF32-Produkt-FAQ: Chips, Module und Boards auswählen; Speicher, Schnittstellen, Bluetooth, GPIOs, Kennzeichnungen, Verfügbarkeit und Anpassungen."
tags:
    - Hardware
    - FAQ
---

# SF32-FAQ { #sf32-faq }

## 1. Produktauswahl { #choosing-a-product }

### 1.1. Welche SF32-Familie sollte ich wählen? { #choosing-a-family }

Beginnen Sie mit diesen entscheidenden Auswahlkriterien:

- **Displayauflösung:** Benötigte Pixelzahl, Displayschnittstelle, Bildrate und Framebufferspeicher.
- **Bluetooth-Modus:** Nur BLE oder Dual-Mode mit BLE und Classic Bluetooth.
- **GPIO-Anzahl:** Nutzbare Pins nach Berücksichtigung von Schnittstellen und Speicherbelegung.
- **Gehäusegröße:** Grundfläche, Pinabstand und Anforderungen an die PCB-Bestückung.
- **Stromversorgung:** Batterie oder geregelte Versorgung, Betriebsspannungsbereich und I/O-Pegel.
- **Audiofunktionen:** Anforderungen an ADC/DAC, I2S und PDM einschließlich Mikrofonkanälen.

Vergleichen Sie konkrete Bestellnummern statt nur Familiennummern: Eine höhere Nummer ist nicht automatisch die bessere Wahl. Jeder dieser Faktoren ist ein Filter der [SF32-Produktauswahl](../product-selector.md): Stellen Sie sie dort ein, um konkrete Bestellnummern einzugrenzen.

[Familienvergleich](SF32_family.md) · [Produktauswahl](../product-selector.md)

### 1.2. Sollte ich einen Chip, ein Modul oder ein Entwicklungsboard verwenden? { #chip-or-modules }

Ein Entwicklungsboard dient zur Plattformbewertung und Firmware-Prüfung. Ein Modul reduziert den Aufwand für RF-, Quarz- und Speicher-Routing auf der Trägerplatine und kann die Gesamtentwicklungskosten senken. Bei kleineren Stückzahlen übernimmt der Modulhersteller außerdem die Beschaffung der enthaltenen Komponenten. Die RF-Zertifizierung des Moduls kann in manchen Regionen sehr hilfreich sein. Wählen Sie ein Chip-down-Design, wenn Kosten, Größe oder Flexibilität es rechtfertigen, Schaltplan, Layout und RF selbst zu verantworten. Die Validierung des Endprodukts bleibt in jedem Fall erforderlich. Weitere Module werden aufgenommen, sobald sie verfügbar sind.

[Produktplanung](product-planning.md)

### 1.3. Mit welchem Entwicklungsboard sollte ich beginnen? { #choosing-a-board }

Beginnen Sie mit dem displayorientierten LCD-Board Ihrer Chipfamilie: [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md), [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) (Speichervariante N32R16) oder [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) (Variante N16R32N1). Für SF32LB52x gibt es zusätzlich kompakte Boards: [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) und [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) (Low-Power-Evaluierung für Wearables). Prüfen Sie, ob die Speichervariante des Boards zu Ihrer Zieltypnummer passt; der offizielle Board-Modellleitfaden von SiFli listet alle Boards.

[Produktauswahl](../product-selector.md) · [Offizieller Board-Modellleitfaden](https://wiki.sifli.com/en/board/devkit_guide.html)

### 1.4. Wie lese ich Chip- und Modulbestellnummern? { #reading-part-numbers }

Lesen Sie den gesamten Bestellcode, nicht nur das Familienpräfix. Chipcodes unterscheiden Baustein, Gehäuse und Speicher; Modulsuffixe beschreiben bestückte Speicheroptionen. Orientieren Sie sich an den Beispielen und historischen Ausnahmen der Namenskonvention und bestätigen Sie die bestellbare Konfiguration beim Lieferanten.

[SF32-Namenskonvention](SF32_namingrule.md)

## 2. Speicher und Spezifikationen { #memory-and-specifications }

### 2.1. Was unterscheidet SRAM, PSRAM und Flash? { #memory-types }

SRAM und PSRAM speichern Laufzeitdaten und verlieren sie ohne Versorgung; unterstützte Retentionsmodi hängen vom Baustein ab. Internes SRAM und externes oder im Gehäuse integriertes PSRAM unterscheiden sich bei Zugriff, Bandbreite und Leistungsaufnahme. Flash speichert Firmware und Ressourcen nichtflüchtig. Mehr Flash ersetzt fehlenden Arbeitsspeicher nicht.

[Speichertypen](../../learn/architecture/psram-and-memory-types.md)

### 2.2. Wie viel Speicher benötigt meine Anwendung? { #sizing-memory }

Planen Sie RAM für Betriebssystem, Stacks, Heap, Grafikpuffer, Audio und parallele Aufgaben ein. Ein einfacher Framebuffer benötigt Breite × Höhe × Bytes je Pixel × Pufferanzahl; berücksichtigen Sie die Stride-Ausrichtung und zusätzliche Renderpuffer. Planen Sie nichtflüchtigen Speicher für Firmware, Schriften, Bilder, Audio, Dateien und OTA-Images separat. Messen Sie die Spitzennutzung unter der vorgesehenen Last.

[Grafikübersicht](../../learn/graphics/overview.md) · [Produktplanung](product-planning.md)

### 2.3. Wann sollte ich NOR, NAND oder eMMC wählen? { #choosing-storage }

Entscheiden Sie nach Bootpfad, Kapazität, Zugriffsmuster und Softwareunterstützung, nicht nur nach Kapazität. NOR eignet sich häufig für Code und wahlfreie Lesezugriffe; NAND erfordert eine geeignete Verwaltung von Löschblöcken, ECC und defekten Blöcken; eMMC enthält einen integrierten Speichercontroller. SPI-NAND und QSPI-NAND bezeichnen hier dieselbe Moduloption, keinen Produktunterschied. Prüfen Sie Bootloader, Treiber und Dateisystem für den genauen Baustein.

[Speichertypen](../../learn/architecture/psram-and-memory-types.md) · [Modulsuffixcodes](SF32_namingrule.md#module-naming)

### 2.4. Unterstützt jeder Baustein alle Funktionen seiner Familie? { #family-versus-sku }

Nein. Eine Familienübersicht kann mehrere Bausteine zusammenfassen. Speicher, Versorgung, nutzbare Pins und Schnittstellen hängen von SKU, Gehäuse und Multiplexing ab. Ein Peripherieblock des Chips ist nicht zwingend am Modul oder Board herausgeführt. Prüfen Sie Variantentabelle, Datenblatt und Pinbelegung sowie die SDK-Unterstützung der benötigten Funktion.

[Familienvergleich](SF32_family.md) · [Produktauswahl](../product-selector.md)

## 3. Eignung für die Anwendung { #application-fit }

### 3.1. Wie wähle ich einen Baustein für mein Display? { #choosing-a-display }

Prüfen Sie zunächst elektrische Schnittstelle und Timing des Panels, dann Auflösung, Pixelformat, Zielbildrate, Framebufferspeicher und Bandbreite. Die maximale Auflösung garantiert keinen flüssigen Betrieb. Bestätigen Sie Grafikbeschleunigung und Paneltreiber und testen Sie typische Ansichten und Animationen mit der vorgesehenen Speicherkonfiguration.

[Schnittstellenmatrix pro Gerät](../../learn/graphics/display-controller.md#per-device-interface-matrix) · [Displaycontroller](../../learn/graphics/display-controller.md) · [Grafikübersicht](../../learn/graphics/overview.md)

### 3.2. Wie prüfe ich Audio- und Mikrofonunterstützung? { #audio-and-microphones }

Prüfen Sie ADC- und DAC-Kanäle für analoge Pfade, I2S für digitale Audiogeräte und PDM für digitale Mikrofone. Eine PDM-Schnittstelle kann bis zu zwei Mikrofonkanäle übertragen; Die Zahl der Schnittstellen entspricht nicht der Zahl der Mikrofone. Nutzbare Kanäle hängen außerdem von Pinzugang, Multiplexing, Treibern und Boardverdrahtung ab. Prüfen Sie die konkrete Konfiguration, statt Schnittstellenzahlen zu addieren.

[Audioübersicht](../../learn/audio/overview.md) · [Glossar](../../about/glossary.md)

### 3.3. Welche Produkte unterstützen BLE, Classic Bluetooth oder beides? { #bluetooth-modes }

SF32LB55x unterstützt nur BLE; SF32LB52x, SF32LB56x, SF32LB57x und SF32LB58x bieten Dual-Mode-Bluetooth. Die Funkhardware garantiert nicht jedes Profil, jeden Codec und jede Funktion in jeder SDK-Konfiguration. Prüfen Sie das benötigte Profil und ein getestetes Beispiel; BLE allein belegt weder Classic-Bluetooth-Audio noch BLE Audio.

[Familienvergleich](SF32_family.md) · [Bluetooth-Übersicht](../../learn/bluetooth/overview.md)

### 3.4. Benötigt mein Design einen externen Wi-Fi-Baustein? { #wifi }

Die hier katalogisierten SF32-Produkte besitzen kein integriertes Wi-Fi-Funkteil. Die Wi-Fi-Option der Produktauswahl bezeichnet einen externen SDIO-Pfad. Dafür sind auch passende Versorgung, Pins, Treiber und Netzwerksoftware nötig; eine SDIO-Schnittstelle allein belegt keine funktionsfähige Lösung.

[Produktauswahl](../product-selector.md)

### 3.5. Wie viele GPIOs sind tatsächlich verfügbar? { #usable-gpios }

Gehen Sie vom genauen Gehäuse und Speicher aus und ziehen Sie Pins für benötigte Schnittstellen und Boardfunktionen ab. Ein Modul führt nur einen Teil der Chippins heraus. Zusätzliche Pins für MPI3 bzw. statische Ausgänge sind beim SF32LB57x im BGA112 in ihrer Funktion eingeschränkt und keine frei zuweisbaren GPIOs. Betrachten Sie die beworbene Pinzahl nicht als garantiertes GPIO-Budget für Ihre Anwendung.

[GPIO-Hinweise der Familien](SF32_family.md) · [SF32LB57x-Varianten](../chips/SF32LB57x.md)

## 4. Verfügbarkeit und Produktplanung { #availability-and-product-planning }

### 4.1. Was bedeuten Modulkennzeichnungen für mein Produkt? { #module-markings }

Identifizieren Sie die gekennzeichneten Varianten anhand der Kennzeichnungsübersicht auf der Modulseite und fordern Sie geltende Zulassungsunterlagen und Integrationsbedingungen an. Eine aufgedruckte FCC-Kennung oder CE-Kennzeichnung belegt allein nicht, dass Ihr Endprodukt abgedeckt ist. Änderungen an Antenne, Trägerplatine oder Gehäuse müssen anhand der geltenden Bedingungen geprüft werden.

[52-Modulkennzeichnungen](../modules/SF32LB52-MOD-1.md#regulatory-markings) · [56-Modulkennzeichnungen](../modules/SF32LB56-MOD.md#regulatory-markings) · [58-Modulkennzeichnungen](../modules/SF32LB58-MOD.md#regulatory-markings)

### 4.2. Kann ich eine andere Speicher- oder Modulkonfiguration anfragen? { #custom-configurations }

Nennen Sie μForge.io den gewünschten Chip oder das Modul, Speicher- und PSRAM-Kapazitäten, Schnittstellen, Antennenanforderungen, Menge und Zeitplan. Bestätigen Sie Machbarkeit, SDK-Unterstützung, Mindestbestellmenge und Lieferzeit vor der Designfreigabe. Ältere Dokumentation garantiert keine heutige Verfügbarkeit; SF32LB58-MOD-E4R32N1 ist wegen Speicherchip-Lieferengpässen nicht mehr verfügbar.

[μForge.io kontaktieren](../../about/contact.md) · [58-Modulverfügbarkeit](../modules/SF32LB58-MOD.md#storage-interfaces-and-module-variants)

### 4.3. Wie bestätige ich Verfügbarkeit und erhalte Muster? { #samples-and-documentation }

Nutzen Sie die Links zu Bezugsquellen und Dokumentation auf der Produktseite und nennen Sie dem Lieferanten vollständigen Bestellcode und gewünschte Revision. Bestätigen Sie aktuelle Verfügbarkeit, Speicher, Antennenoption und Lieferzeit. Beginnen Sie möglichst mit einem unterstützten Entwicklungsboard und nutzen Sie die offiziellen Unterlagen des konkreten Bausteins statt der Familienübersicht als endgültige Designreferenz.

[μForge.io kontaktieren](../../about/contact.md) · [Produktauswahl](../product-selector.md)
