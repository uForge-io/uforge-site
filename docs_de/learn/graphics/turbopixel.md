---
icon: lucide/minimize-2
description: "Wie TurboPixel verlustbehaftete Framebuffer-Kompression mit festem Verhältnis nutzt, um Framebuffer-Speicherbedarf und Display-Lesezugriffe auf unterstützten SF32-Bauteilen zu reduzieren."
tags:
  - Grafik
---

# TurboPixel-Framebuffer-Kompression { #turbopixel-framebuffer-compression }

## Übersicht { #overview }

**TurboPixel** ist ein verlustbehaftetes Kompressionsformat mit festem Kompressionsverhältnis, das auf unterstützten SF32-Bauteilen die finale, gerenderte Bitmap komprimiert. Es ist Teil des Display-Pfads: **extDMA** komprimiert die Bitmap, und der Display-Controller dekomprimiert sie bei der Übertragung der Pixel an das Panel.

TurboPixel ist kein Asset-Speicherformat und ersetzt nicht [eZip](ezip.md). eZip komprimiert Quell-Assets verlustfrei, bevor sie aus dem Speicher gelesen werden; TurboPixel komprimiert die finale gerenderte Bitmap, um die durch Framebuffer-Verkehr benötigte PSRAM-Kapazität und PSRAM-Bandbreite zu reduzieren.

Den vollständigen Grafikablauf und die Position von TurboPixel gegenüber eZip, ePicasso und dem Display-Controller finden Sie unter [Grafikübersicht](overview.md#sf32-graphics-flow). Diese Seite konzentriert sich auf das Kompressionsverhalten, die Integrationskompromisse und die Verfügbarkeit von TurboPixel.

Lesen Sie diese Seite, wenn Framebuffer-Kapazität oder die Speicherzugriffe beim Auslesen des Framebuffers in einem Design mit SF32LB55x, SF32LB56x oder SF32LB58x zum Engpass werden. Sie hilft Produkt- und Firmware-Ingenieuren, planbare PSRAM-Einsparungen gegen verlustbehaftete Bildqualität abzuwägen; sie ersetzt nicht die eZip-Kompression von Assets.

## Festes Kompressionsverhältnis und verlustbehaftete Kompression { #fixed-ratio-and-lossy-by-design }

TurboPixel hat zwei definierende Eigenschaften:

- **Festes Verhältnis für eine gewählte Konfiguration.** Eingabepixelformat und Kompressionsstufe bestimmen den nominalen Faktor; er ändert sich nicht mit den Bilddetails. Der Speicherbedarf hängt zusätzlich von Zeilenausrichtung und Blockaufteilung ab. Verwenden Sie die Größenberechnung des gewählten Chips und SDK statt eines Werts aus einer anderen Konfiguration.
- **Verlustbehaftete Kompression.** Bei einer mit TurboPixel dekomprimierten Bitmap ist nicht garantiert, dass jeder ursprüngliche Pixelwert erhalten bleibt. Das Format tauscht etwas Bildtreue gegen planbare Reduzierungen von PSRAM-Nutzung und PSRAM-Verkehr.

Verlustbehaftete Kompression ist in einem eingeschränkten eingebetteten Display-System oft ein sinnvoller Kompromiss, ist aber eine Produktentscheidung. Bewerten Sie reale Bildschirme bei der Zielauflösung des Panels, der Farbtiefe, dem Betrachtungsabstand und dem Aktualisierungsverhalten, statt die Qualität anhand eines generischen Testbilds zu beurteilen.

## Framebuffer-Messvorlage { #framebuffer-compression-comparison-placeholder }

Verwenden Sie diesen Abschnitt, um gemessene TurboPixel-Ergebnisse für eine repräsentative Display-Auflösung und SDK-Konfiguration zu erfassen. Anders als der eZip-Dateigrößenvergleich ist dies ein Vergleich der **Framebuffer-Zuweisung und des PSRAM-Verkehrs**: TurboPixel arbeitet nach dem Rendering, nicht an der Quell-Asset-Datei.

Beziehen Sie sowohl opake als auch alpha-geblendete Bildschirminhalte ein. Alpha-Blending erfolgt normalerweise vor TurboPixel, wenn der Renderer Vordergrund- und Hintergrundpixel zum finalen Framebuffer zusammensetzt. Auch bei halbtransparenten Symbolen, Text, Schatten oder Ebenen kann der finale Framebuffer ein opakes RGB565-Bild enthalten. Dokumentieren Sie diesen Unterschied: Alpha in den Quell-Assets bedeutet nicht, dass der komprimierte Framebuffer einen Alphakanal enthält.

<div align="center"><em>Messvorlage für einen repräsentativen TurboPixel-Framebuffer</em></div>

<div align="center" markdown>

| Szenario | Quell-/Ebenen-Alpha | Format und Alpha-Zustand des finalen Framebuffers | Speicherbedarf/Datenverkehr ohne Kompression | TurboPixel-Speicherbedarf/Datenverkehr | Relativ zu unkomprimiert | Testeinstellungen / visuelles Ergebnis |
|:---|:---|:---|---:|---:|---:|:---|
| Opake UI | Kein Alpha | Noch festzulegen; der Framebuffer ist opak | Noch zu messen | Noch zu messen | Noch zu messen | Auflösung, Aktualisierungsrichtlinie und TurboPixel-Verhältnis/Konfiguration: noch festzulegen |
| Alpha-geblendete UI, vor der Ausgabe zusammengesetzt | Pixelweises und/oder globales Alpha in Quellebenen | Noch festzulegen (nach dem Compositing in der Regel opak) | Noch zu messen | Noch zu messen | Noch zu messen | Inhalte mit Alpha-Blending dokumentieren; Kanten-, Schatten-, Verlaufs- und Textartefakte prüfen |
| Alpha-erhaltender Ausgabepfad, sofern unterstützt | Alpha bis zum finalen Puffer erhalten | Noch festzulegen | Noch zu messen | Noch zu messen | Noch zu messen | Zielchip, SDK, Format und Display-Pfad vor dem Test bestätigen |

</div>

Berechnen Sie für jeden gültigen TurboPixel-Pfad **Relativ zu unkomprimiert** mit der Formel `TurboPixel framebuffer bytes ÷ uncompressed framebuffer bytes × 100%`. Der erwartete Speicherbedarf ergibt sich aus dem jeweils gültigen festen Verhältnis. Das genaue Verhältnis, die unterstützten Formate, die Ausrichtung, die Aktualisierungsrichtlinie und der gemessene PSRAM-Verkehr müssen jedoch anhand der Chipdokumentation, des SDK und eines Tests auf der Zielhardware bestätigt werden. Erfassen Sie die visuelle Akzeptanz separat: Ein festes Speicherverhältnis garantiert keine identischen Artefakte bei opakem, textreichem, verlaufs- oder alpha-geblendetem Inhalt.

## Warum TurboPixel verwenden { #why-use-turbopixel }

### Framebuffer-Speicherbedarf reduzieren { #reduce-psram-capacity }

Ein vollständiger Framebuffer kann bei hoher Auflösung oder mehreren Zeichenpuffern viel PSRAM benötigen. TurboPixel verringert den Speicherbedarf der komprimierten Endbitmap und kann so Speicher für UI-Ressourcen, Audio, Anwendungsdaten oder andere Grafikflächen freigeben.

Berechnen Sie jedoch den maximal gleichzeitig belegten Speicher, nicht nur diese Bitmap. Unkomprimierter Renderpuffer, komprimierter Display-Puffer, Kompressionsarbeitsspeicher und Doppelpuffer können gleichzeitig existieren. Ob das Gesamtdesign weniger PSRAM benötigt, hängt von ihren Größen und Lebensdauern ab.

### Display-Lesezugriffe reduzieren { #reduce-psram-bandwidth }

Der Display-Controller liest vor der Dekompression weniger Bytes aus einem komprimierten Framebuffer. Dadurch sinkt der Speicherverkehr durch Display-Lesezugriffe und die Konkurrenz mit CPU, ePicasso, DMA, Audio und Funkaktivität.

Das ist nicht die Einsparung des gesamten Speicherverkehrs. Rendering schreibt weiterhin Pixel; die Kompression liest Eingaben und schreibt Ausgaben. Messen Sie diese Übertragungen und ihre Überschneidung mit Display-Lesezugriffen. Bei häufig neu gerenderten Bildern kann der Kompressionsaufwand die Leseeinsparung aufheben; bei wiederholter Anzeige desselben Bildes kann die Bilanz anders aussehen. Messen Sie neben der Bandbreite auch die Systemenergie.

### Speicher- und Bandbreitenbudgets planbar machen { #make-budgeting-predictable }

Bei gleichem Pixelformat und gleicher Kompressionsstufe bleibt das nominale Verhältnis unabhängig vom Inhalt. Dimensionieren Sie Puffer nach den SDK-Regeln für komprimierte Zeilen und Ausrichtung und berücksichtigen Sie alle Render-, Kompressions- und Display-Lese-/Schreibzugriffe. Erfassen Sie Panel-Übertragungen separat: TurboPixel wird vor der Panel-Ausgabe dekomprimiert und reduziert diese Datenmenge nicht automatisch.

## Kompromisse bei Qualität und Integration { #quality-and-integration-trade-offs }

TurboPixel sollte als Teil des vollständigen Display-Designs validiert werden:

- Text, dünne Linien, Farbverläufe, Symbole, Fotografien, Animationen und kontrastreiche UI-Elemente auf sichtbare Artefakte testen.
- Farbformat, Pufferausrichtung, extDMA-Pfad und Display-Controller-Konfiguration bestätigen, die vom gewählten Bauteil und SDK unterstützt werden.
- Frame-Zeit, PSRAM-Bandbreite, UI-Latenz und Energieverbrauch unter kombinierten Display-, Bluetooth-, Audio- und KI-Arbeitslasten messen.
- Einen unkomprimierten Pfad während der Inbetriebnahme verfügbar halten, damit Bildqualitäts- und Treiberprobleme isoliert werden können.
- TurboPixel nicht als verlustfrei darstellen, selbst wenn in einer bestimmten UI keine Artefakte sichtbar sind.

## SDK-Integrationsprüfungen { #sdk-integration-checks }

Die verlinkte extDMA-Anleitung nennt zehn nominale Kompressionsstufen; die verlinkte SDK-Größenberechnung implementiert dagegen die Stufen 1, 2 und 3. Setzen Sie nicht voraus, dass Ihr Build alle dokumentierten Stufen akzeptiert. Prüfen Sie die gewählte Stufe und die zugehörige Zeilengröße; ein nicht unterstützter Wert kann in einer Hilfsfunktion auf eine andere Einstellung zurückfallen.

Die extDMA-Anleitung nennt RGB565, RGB888 und ARGB8888 als Eingabeformate. Daraus folgt keine Garantie für einen alpha-erhaltenden komprimierten Display-Pfad. Der LCDC-Zweig ohne dediziertes Layer-0-Dekompressionsregister akzeptiert nur RGB565/RGB888 für komprimierte Ebenen. Prüfen Sie den Zweig des gewählten Chips. Im verlinkten LCDC-Treiber aktiviert `HAL_LCDC_LayerSetCmpr` die Kompression für Ebene 0.

Der aktuelle OpenSiFli-LCDC-Header definiert das Support-Makro für komprimierte Ebenen nur bei aktiviertem `HAL_EXTDMA_MODULE_ENABLED`; die Familienbedingung schließt SF32LB52x und SF32LB57x aus. Der Header legt maximale Breiten von 512 Pixeln für SF32LB55x/SF32LB56x und 1024 Pixeln für SF32LB58x fest. Das sind Integrationsgrenzen für komprimierte Ebenen, keine allgemeinen Grenzen der Panelauflösung. Ein Quellcodekommentar weist zudem darauf hin, dass der LCPU-Pfad nicht aktiviert ist.

Für SF32LB55x ist eine Integrationsbesonderheit zu beachten: Der aktuelle OpenSiFli-LCDC-Header definiert das Makro für komprimierte Ebenen, wenn `HAL_EXTDMA_MODULE_ENABLED` aktiviert ist; ein Kommentar weist jedoch darauf hin, dass der LCPU-Pfad nicht aktiviert ist. Die veröffentlichte SDK-LCDC-Funktionstabelle kennzeichnet die Dekomprimierung komprimierter Ebenen auf 55x als nicht unterstützt, während das SF32LB55x-Datenblatt TurboPixel und die Dekomprimierung durch den LCD-Controller beschreibt. Ein Präprozessor-Makro belegt nicht, dass der vollständige Displaypfad validiert wurde. Betrachten Sie 55x daher als bedingt unterstützt und prüfen Sie die konkrete SDK-Version, den Kern, die Build-Konfiguration und die Zielhardware. Leiten Sie die Laufzeitunterstützung nicht allein aus dem Makro ab.

Trennen Sie die Pufferzuständigkeit von Renderer, extDMA und Display-Controller. Erst nach dem Rendern darf komprimiert werden, nach der Kompression darf das Display lesen und nach dessen Nutzung darf der Puffer wiederverwendet werden. Bei cachebarem gemeinsamem Speicher schreiben Sie die vom Prozessor geänderten Quell-Cachezeilen vor dem Hardware-Lesezugriff mit einer Cache-Clean-Operation in den Speicher zurück. Bereiten Sie Ziel-Cachezeilen so vor, dass veränderte Cachezeilen das Hardware-Ergebnis nicht nachträglich überschreiben; invalidieren Sie nach Abschluss veraltete Cachezeilen, bevor die CPU liest. Beachten Sie Cachezeilengrenzen und benachbarte Daten. Kompressionsende ist nicht das Ende der Panel-Übertragung.

Quelladresse, Zieladresse und extDMA-Übertragungslänge müssen auf 4 Byte ausgerichtet sein. Beachten Sie die SDK-Regeln für Zeilenstride, Blockaufteilung und Puffergröße; Rohbildbytes durch den nominalen Faktor zu teilen reicht nicht aus.

## Verfügbarkeit in der SF32-Familie { #availability-in-the-sf32-family }

TurboPixel ist für die folgenden SF32-Familien dokumentiert:

<div align="center"><em>Dokumentierte TurboPixel-Verfügbarkeit</em></div>

<div align="center" markdown>

| SF32-Familie | TurboPixel-Status | Integrationskontext |
|:---|:---|:---|
| **SF32LB52x** | Nicht verfügbar | Einen unkomprimierten Framebuffer oder eine andere unterstützte Speicher-/Bandbreitenstrategie verwenden. |
| **SF32LB55x** | Im aktuellen Quellcode bedingt; vollständige Unterstützung nicht nachgewiesen | Der aktuelle LCDC-Header stellt komprimierte Ebenen mit extDMA bereit, weist aber darauf hin, dass der LCPU-Pfad nicht aktiviert ist; die veröffentlichte SDK-Funktionstabelle kennzeichnet 55x als nicht unterstützt. Prüfen Sie Kern, SDK-Konfiguration und Zielhardware. |
| **SF32LB56x** | Dokumentiert | extDMA komprimiert den finalen Framebuffer verlustbehaftet mit festem Verhältnis; der Display-Controller dekomprimiert ihn. |
| **SF32LB57x** | Nicht verfügbar | Einen unkomprimierten Framebuffer oder eine andere unterstützte Speicher-/Bandbreitenstrategie verwenden. |
| **SF32LB58x** | Dokumentiert | extDMA komprimiert den finalen Framebuffer verlustbehaftet mit festem Verhältnis; der Display-Controller dekomprimiert ihn. |
| **Andere SF32-Familien** | Pro Bauteil bestätigen | TurboPixel-Unterstützung nicht aus eZip, ePicasso oder dem Vorhandensein von PSRAM ableiten. Das genaue Chip-Datenblatt, Referenzhandbuch, die SDK-Version und den Display-Treiber prüfen. |

</div>

Diese Tabelle erfasst die dokumentierte Verfügbarkeit auf Familienebene, nicht ein Versprechen für jedes Gehäuse, jede Panel-Schnittstelle, jedes Pixelformat, jede SDK-Version oder Board-Konfiguration. Bestätigen Sie das genaue Ziel, bevor Sie sich auf Speicher- oder Bandbreitenzusagen festlegen.

## Wichtige Erkenntnisse { #key-takeaways }

- TurboPixel komprimiert den finalen Framebuffer verlustbehaftet mit einem **festen Verhältnis**.
- extDMA erzeugt TurboPixel aus der gerenderten Bitmap; der Display-Controller dekomprimiert es auf dem Panel-Pfad.
- TurboPixel reduziert vor allem den **Framebuffer-Speicherbedarf** und die **Display-Lesezugriffe**; prüfen Sie die Einsparung für sämtliche Puffer und Übertragungen.
- SiFli-Unterlagen beschreiben TurboPixel für SF32LB55x, SF32LB56x und SF32LB58x. Beim 55x definiert der aktuelle Header das Makro für komprimierte Ebenen bei aktiviertem extDMA, weist aber darauf hin, dass der LCPU-Pfad nicht aktiviert ist; die veröffentlichte SDK-Funktionstabelle kennzeichnet 55x als nicht unterstützt. Betrachten Sie 55x als bedingt und validieren Sie den vollständigen Displaypfad. Der aktuelle Quellcode schließt SF32LB52x und SF32LB57x aus. Andere Ziele sind einzeln zu bestätigen.
- TurboPixel ergänzt eZip: eZip ist verlustfreie Asset-Kompression, während TurboPixel verlustbehaftete Kompression für die finale Bitmap ist.

## Primärquellen { #primary-references }

- [extDMA-Anleitung](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/ext_dma.md)
- [Implementierung der Größenberechnung](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/sifli_cmpr.h)
- [extDMA-API](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_ext_dma.h)
- [LCDC-Unterstützungsbedingungen](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_lcdc.h)
- [Aktuelle OpenSiFli-LCDC-Bedingung für komprimierte Ebenen](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_lcdc.h)
- [Generierte SDK-LCDC-Funktionstabelle](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/lcdc.html)
- [LCDC-Ebenenimplementierung](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/hal/bf0_hal_lcdc.c)
- Produktübersichten: [SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf), [SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
