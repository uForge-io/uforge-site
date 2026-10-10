---
icon: lucide/palette
title: "Grafikübersicht"
description: "Übersicht zum Aufbau von SF32-UIs: Display-Auswahl, Framebuffer-Strategie, LVGL-Integration, ePicasso-Beschleunigung und Speicherzuordnung für flüssige Grafik."
tags:
  - Grafik
---

# Grafikübersicht { #graphics-overview }

## Grafikarchitektur planen { #overview }

Dieser Leitfaden erklärt, wie sich auf SF32-Bauteilen reaktionsschnelle grafische Benutzeroberflächen entwickeln lassen. Im Mittelpunkt stehen praktische Entscheidungen für das Produkt: Display-Auswahl, Framebuffer-Strategie, LVGL-Integration, ePicasso-Hardwarebeschleunigung, Speicherzuordnung und Aktualisierungsverhalten.

SF32-Bauteile eignen sich für kompakte AIoT- und Wearable-Produkte mit strengen Vorgaben für Stromverbrauch, Speicher und Leiterplattenfläche. Gleichzeitig soll sich die Benutzeroberfläche flüssig bedienen lassen. Der Grafikpfad trennt Ressourcenverarbeitung, Pixelkomposition, optionale Framebuffer-Kompression und Panel-Ausgabe. Wer diese Aufgaben auseinanderhält, kann gezielter optimieren.

Nutzen Sie diese Seite für frühe UI-Architekturentscheidungen, die sich später nur mit hohem Aufwand ändern lassen: Panel und Schnittstelle, Framebuffer-Strategie, Farbtiefe, Transparenz, Ablage der Ressourcen und Aktualisierungsrichtlinie. Die verlinkten Grafikartikel erläutern die Implementierung der einzelnen Schritte.

## SF32-Grafikablauf { #sf32-graphics-flow }

Der typische Pfad für Display-Ressourcen ist:

<div align="center"><em>Diagramm: Grafikressourcen und Display-Pipeline</em></div>

```text
Quellbilder, Schriftarten und Animationen
        │
        ▼
GraphicsTool konvertiert unterstützte Ressourcen in eZip oder eZip-A
        │
        ▼
Komprimierte Ressourcen in NOR-Flash, PSRAM, NAND oder einem Dateispeicher
        │
        ▼
Der eZip-Hardwaredecoder dekomprimiert Ressourcen bei Bedarf
        │
        ▼
LVGL oder ein anderes UI-Framework + Grafik-/Displaytreiber
        │
        ├── Rendering per CPU als Rückfallpfad
        │
        └── Pixelbeschleunigung durch ePicasso
        │
        ▼
Das fertige Bitmap liegt in einem Zeichenpuffer oder Framebuffer
        │
        ├── Unkomprimierter Displaypfad
        │
        └── Optional: extDMA komprimiert es in das TurboPixel-Format
                    │
                    ▼
             TurboPixel-Framebuffer in PSRAM
        │
        ▼
Der Display-Controller überträgt die Pixel an das Panel
        │
        ▼
SPI- / QSPI- / 8080- / RGB- / MIPI-DSI- / EPD- / JDI-Panel
```

Der Grafikpfad lässt sich flexibel zusammenstellen; ein Produkt kann auch ohne eZip, ePicasso, TurboPixel oder einen vollständigen Framebuffer auskommen. Verfügbarkeit und Anbindung hängen vom Bauteil, SDK, der Display-Schnittstelle, dem Panel und der Treiberkonfiguration ab. Der aktuelle OpenSiFli-LCDC-Header definiert `LCDC_SUPPORTED_COMPRESSED_LAYER` nur, wenn `HAL_EXTDMA_MODULE_ENABLED` aktiviert ist und die Familienbedingung erfüllt wird; SF32LB52x und SF32LB57x sind ausgeschlossen. Ein Quellcodekommentar weist außerdem darauf hin, dass der LCPU-Pfad nicht aktiviert ist. Die veröffentlichte SDK-LCDC-Funktionstabelle kennzeichnet die Dekomprimierung komprimierter Ebenen auf SF32LB55x als nicht unterstützt. Daher ist 55x als bedingt und nicht als end-to-end validiert zu betrachten. Prüfen Sie die genaue SDK-Version, den Kern, die Build-Konfiguration und die Zielhardware; weitere Hinweise finden Sie unter [TurboPixel](turbopixel.md#availability-in-the-sf32-family).

<div align="center"><em>Aufgaben der einzelnen Schritte im SF32-Grafikpfad</em></div>

<div align="center" markdown>

| Block | Position im Ablauf | Hauptverantwortung | Ersetzt nicht |
|:---|:---|:---|:---|
| **eZip / eZip-A** | Vor dem Rendering, beim Lesen gespeicherter Ressourcen | Dekomprimiert unterstützte eZip-Grafikressourcen verlustfrei, darunter statische Bilder und Animationen. | Den Renderer, den finalen Framebuffer oder den Display-Controller. |
| **ePicasso** | Während Rendering und Komposition | Beschleunigt unterstützte Kopier-, Füll-, Blend-, Transformations- und Kompositionsoperationen auf Pixeln im Speicher. | Ressourcenkompression oder Panel-Übertragung. |
| **TurboPixel** | Nach dem Rendering und vor der Panel-Ausgabe auf unterstützten Bauteilen | Komprimiert die fertige Bitmap mithilfe von extDMA verlustbehaftet mit festem Kompressionsverhältnis. Dadurch sinken der PSRAM-Bedarf und der Display-Leseverkehr. Der aktuelle Header stellt die Funktion für komprimierte Ebenen bei aktiviertem extDMA für SF32LB55x, SF32LB56x und SF32LB58x bereit und schließt SF32LB52x und SF32LB57x aus; ein Kommentar weist darauf hin, dass der LCPU-Pfad nicht aktiviert ist. Die veröffentlichte SDK-Funktionstabelle kennzeichnet 55x als nicht unterstützt. Prüfen Sie daher Kern, SDK-Konfiguration und Zielhardware, bevor Sie den Pfad einplanen. | Verlustfreie Ressourcenkompression oder Pixel-Rendering. |
| **Display-Controller** | Finale Ausgabestufe | Dekomprimiert TurboPixel, wenn dieser Pfad aktiviert ist, und überträgt die fertigen Pixel über die Panel-Schnittstelle. | eZip-Dekompression oder Grafikkomposition. |

</div>

Der Anwendungscode beschreibt Zustand und Verhalten der Benutzeroberfläche. Das UI-Framework verwaltet Widgets, zu aktualisierende Bereiche und das Zeichnen. Der Grafik-/Displaytreiber entscheidet, ob die CPU oder ePicasso eine Operation ausführt, und koordiniert die Puffer. Der Display-Controller übernimmt die Übertragung an das Panel. Details zu den einzelnen Funktionen finden Sie unter [ePicasso](epicasso-gpu.md), [eZip](ezip.md) und [TurboPixel](turbopixel.md).

## Zuerst das Display auswählen { #choose-the-display-first }

Die Display-Wahl beeinflusst nahezu jede Grafikentscheidung. Definieren Sie die Panel-Anforderungen klar, bevor Sie Code optimieren:

- Auflösung.
- Farbtiefe.
- Aktualisierungsrate.
- Schnittstellentyp.
- Anforderungen an den Touch-Controller.
- Hintergrundbeleuchtung oder Display-Versorgungsspannungen.
- Ob Teilaktualisierung unterstützt wird.
- Ob das Panel internes GRAM hat.
- Ob stromsparendes Always-on-Display-Verhalten erforderlich ist.

Ein kleines SPI- oder QSPI-AMOLED verhält sich ganz anders als ein RGB- oder MIPI-DSI-Panel, ein JDI-Memory-Display oder ein EPD-Panel. Dasselbe UI-Framework kann für viele Displaytypen eingesetzt werden, doch die passende Pufferstrategie und Aktualisierungsrichtlinie unterscheiden sich.

Informationen zur Schnittstellenauswahl, zum Flush-Pfad und zur Inbetriebnahme des Panels finden Sie unter [Display-Controller](display-controller.md).

## Mit einem verifizierten LVGL-Beispiel beginnen { #start-from-a-verified-lvgl-example }

Wählen Sie zunächst ein SDK-Beispiel, das den grafischen Aspekt mit dem größten Produktrisiko bereits abdeckt. [LVGL-SDK-Beispiele](lvgl-sdk-examples.md) ordnet offizielle Beispiele zu Basisfunktionen, Designtools, Widgets, komprimierten Ressourcen, Animation und Medien, Kompass, Spielen und Uhrenoberflächen nach der jeweiligen technischen Aufgabe. Außerdem zeigt die Seite, welche Annahmen zu Board, Version, Display, Speicher und Leistung bei der Produktanpassung erneut geprüft werden müssen.

## Das richtige SF32-Bauteil wählen { #pick-the-right-sf32-device }

Wählen Sie den Chip anhand des Displays und der UI-Arbeitslast, nicht nur der CPU-Frequenz.

<div align="center"><em>Tabelle: Das richtige SF32-Bauteil wählen</em></div>

<div align="center" markdown>

| Anforderung | Orientierung für die Bauteilauswahl |
|:------------|:-------------------------|
| Einfaches Bluetooth-Produkt mit kleiner UI | SF32LB52x |
| Einsteiger-Smartwatch, Badge, Etikett, einfache HMI | SF32LB52x |
| BLE-Wearable mit UI, die viele Sensordaten darstellt | SF32LB55x |
| RGB-Display oder reichhaltigere LVGL-Oberfläche | SF32LB56x |
| Audio-/Grafiklasten, die sich auf die ACPU auslagern lassen | SF32LB57x; SDK-Unterstützung und Aufgabenverteilung prüfen |
| Hochauflösendes Display oder fortgeschrittene Grafik | SF32LB56x oder SF32LB58x |
| MIPI-DSI-Display | SF32LB55x oder SF32LB58x, je nach Panel und Produktklasse |
| Flaggschiff-UI mit Grafik, Audio, KI und großem Speicher | SF32LB58x |

</div>

Die wichtigsten Einschränkungen sind Display-Schnittstelle, Auflösung, Speicherkapazität, Generation des Grafikbeschleunigers, verfügbare Pins und Leistungsbudget.

## Framebuffer-Größe und Bandbreite berechnen { #framebuffer-and-bandwidth-calculator }

Schätzen Sie Speicher- und Übertragungskosten, bevor Sie ein Panel oder einen Animationsstil wählen:

```text
framebuffer bytes = width x height x bytes_per_pixel
raw full-frame bandwidth = framebuffer bytes x frames_per_second
```

Beispiele:

<div align="center"><em>Tabelle: Framebuffer- und Bandbreitenrechner</em></div>

<div align="center" markdown>

| Panel | Format | Ein vollständiger Puffer | Datenrate bei 30 Vollbildern/s |
|:------|:-------|----------------:|--------------------------:|
| 240 x 240 | RGB565 | ~113 KiB | ~3,46 MB/s |
| 390 x 390 | RGB565 | ~297 KiB | ~9,13 MB/s |
| 454 x 454 | RGB565 | ~403 KiB | ~12,37 MB/s |
| 480 x 480 | RGB888 | ~675 KiB | ~20,74 MB/s |

</div>

Die Puffergrößen sind in KiB (1.024 Byte), die Bandbreite in dezimalen MB/s (1.000.000 Byte/s) angegeben. Die Werte berücksichtigen nur die Rohdaten der Pixel. Befehls-Overhead, Ausrichtung, Cache-Wartung, Lesen von Ressourcen, Blending und sonstige Datenbewegungen im System sind nicht enthalten. Wenn das Produkt gleichzeitig Bluetooth-Audio oder KI nutzt oder andere Zugriffe auf externen PSRAM anfallen, planen Sie zusätzliche Reserven ein.

## Die verschiedenen Puffer verstehen { #understand-your-buffers }

Eine UI wird letztlich als Pixel im Speicher dargestellt. Die wichtigsten Puffertypen sind:

<div align="center"><em>Tabelle: Grafikpuffertypen</em></div>

<div align="center" markdown>

| Puffertyp | Zweck |
|:------------|:--------|
| **Zeichenpuffer** | Temporärer Bereich, den LVGL oder der Grafiktreiber zum Rendern geänderter Bereiche nutzt. |
| **Framebuffer** | Vollbild-Pixelspeicher, der als Display-Quelle dient. |
| **Teil-Framebuffer** | Kleinerer Bereichspuffer, der genutzt wird, wenn Vollbildpufferung zu teuer ist. |
| **Asset-Puffer** | Bild-, Schriftart-, Symbol- oder dekodierte Ressourcendaten. |
| **Zwischenebene** | Temporäre Oberfläche für Blending, Animation oder Zusammensetzung. |

</div>

Ein Vollbild-Framebuffer ist bequem, kann bei größeren Panels aber zu viel SRAM belegen. Ein 454 × 454 großer RGB565-Puffer enthält 412.232 Byte (etwa 412 kB bzw. 403 KiB); zwei Puffer benötigen die doppelte Kapazität. Mit höherer Farbtiefe und größerer Auflösung steigt der Bedarf schnell.

Wenn der Speicher knapp ist, verwenden Sie partielle Zeichenpuffer und aktualisieren Sie nur geänderte Bereiche. Ist Animation wichtig und genügend Speicher vorhanden, kann ein Vollbild-Framebuffer oder Doppelpufferung die UI flüssiger machen.

## Farbtiefe sorgfältig wählen { #choose-color-depth-carefully }

Die Farbtiefe beeinflusst visuelle Qualität, Speicherverbrauch und Busbandbreite.

<div align="center"><em>Tabelle: Farbtiefe sorgfältig wählen</em></div>

<div align="center" markdown>

| Format | Byte pro Pixel | Anmerkungen |
|:-------|----------------:|:------|
| **RGB565** | 2 | Übliche Balance für eingebettete UI; gute Speicher- und Bandbreiteneffizienz. |
| **RGB666** | 3 oder gepackt | Bessere Farbgenauigkeit, mehr Bandbreite. |
| **RGB888** | 3 | Höhere Qualität, größerer Speicher- und Übertragungsaufwand. |
| **RGB111 / monochrome Formate** | Geräteabhängig | Nützlich für einfache oder extrem stromsparende Displays wie EPD-/JDI-artige Anwendungen. |

</div>

Für die meisten Wearables und kompakten HMI-Produkte ist RGB565 eine gute Ausgangswahl, sofern Panel, gewünschte UI-Qualität oder Produktanforderungen keine höhere Farbtiefe verlangen.

## Transparenz, Alpha und Ebenenzusammensetzung { #transparency-alpha-and-layer-composition }

Transparenz wird durch den **Alpha**-Faktor angegeben. Er bestimmt, wie stark ein Vordergrundpixel beim Zeichnen über einem Hintergrundpixel in das Ergebnis eingeht. Alpha ist unabhängig von den RGB-Farbkanälen. Ein opaker Pixel hat den Alpha-Wert 1 (oder 255 in einem 8-Bit-Alphakanal), ein vollständig transparenter Pixel den Wert 0.

Bei der Source-over-Komposition auf einen **undurchsichtigen Hintergrund**, mit **nicht vormultiplizierten RGB-Farbwerten** im Vordergrund und einem Alpha-Wert von 0 bis 1, wird jeder Ausgabe-RGB-Kanal wie folgt berechnet. Diese vereinfachte Formel berechnet nicht den Ausgabe-Alpha-Wert eines transparenten Ziels:

```text
output = foreground × alpha + background × (1 − alpha)
```

Ein Symbolpixel mit 50 % Alpha trägt beispielsweise die Hälfte seiner Farbe bei und lässt die Hälfte des Hintergrunds sichtbar. Die Wiederholung dieser Operation erzeugt den visuellen Stapel einer UI: einen Hintergrund, Bilder, Text, durchscheinende Steuerelemente, Schatten und Animationsebenen. Die finale zusammengesetzte Bitmap durchläuft anschließend die oben gezeigten Framebuffer- und Display-Controller-Stufen.

<div align="center"><em>Tabelle: Alpha-Modi und ihre Verwendung</em></div>

<div align="center" markdown>

| Alpha-Modus | Bedeutung | Typische Verwendung | Integrationsüberlegung |
|:-----------|:--------|:------------|:--------------------------|
| **Pixelweises Alpha** | Jeder Pixel trägt seinen eigenen Alphawert. | Kantengeglättete Symbole und Text, weiche Kanten, Schatten, PNG-artige Assets. | Bewahrt detaillierte Transparenz, erhöht aber Quelldatengröße und Blend-Aufwand. |
| **Globales Alpha** | Ein Alphawert gilt für ein gesamtes Objekt oder eine Ebene. | Ausblenden eines Bildschirms, Dialogs oder Bilds. | Effizient für gleichmäßige Ausblendungen; kann keine weichen Kanten innerhalb des Objekts darstellen. |
| **Binäres Alpha** | Ein Pixel ist entweder vollständig sichtbar oder vollständig transparent. | Masken und einfache Glyphen. | Geringere Komplexität, aber Kanten können ohne Kantenglättung gezackt wirken. |

</div>

RGB565 enthält keinen Alphakanal und wird daher normalerweise für opake Zeichenziele und finale Framebuffer verwendet. Quell-Assets oder Zwischenebenen, die Alpha benötigen, verwenden üblicherweise ein Format mit Alphakanal, wie ARGB8888, oder ein Farbbild plus separate Alphamaske. Der Treiber muss die tatsächlich vom SDK, Display-Pfad und gewählten Beschleuniger unterstützten Formate verwenden.

Zwei Alpha-Darstellungen sind üblich. Bei **nicht vormultipliziertem Alpha (straight alpha)** beschreibt RGB die ursprüngliche Farbe, und Alpha wird beim Blending angewendet. Bei **vormultipliziertem Alpha (premultiplied alpha)** wurde RGB bereits mit Alpha multipliziert; die Source-over-Gleichung wird zu `output = premultiplied_foreground + background × (1 − alpha)`. Verwechseln Sie die beiden Darstellungen nicht: Werden nicht vormultiplizierte Daten als vormultipliziert interpretiert oder umgekehrt, entstehen dunkle oder helle Säume an den Kanten.

Alpha-Blending liest sowohl Vordergrund- als auch Zielpixel und schreibt dann das Ergebnis. Es erhöht daher den Speicherverkehr im Vergleich zu einer einfachen opaken Kopie oder Füllung. Nutzen Sie ePicasso, wo der Treiber die gewählte Blend-Operation und Pixelformate unterstützt; andernfalls behalten Sie einen CPU-Fallback bei. Begrenzen Sie durchscheinende Vollbildebenen, aktualisieren Sie nur invalidierte Bereiche und vermeiden Sie unnötige Zwischenoberflächen, wenn PSRAM-Bandbreite oder Stromverbrauch knapp sind.

## LVGL integrieren { #integrating-lvgl }

LVGL eignet sich für UIs auf SF32-Bauteilen und stellt Widgets, Stile, Eingabeverarbeitung, Animation, Bereichsinvalidierung und Schnittstellen zum Displaytreiber bereit.

Eine typische LVGL-Integration benötigt:

- Einen Display-Treiber-Flush-Callback.
- Einen oder mehrere Zeichenpuffer.
- Eine Tick-Quelle für das LVGL-Timing.
- Eingabegerätetreiber für Touch, Tasten, Encoder oder Gesten.
- Asset-Verarbeitung für Bilder und Schriftarten.
- Optionale Hardware-Beschleunigungs-Hooks für ePicasso.

Der Display-Flush-Callback bildet die Grenze zwischen Rendering und Ausgabe. Das Verhalten des Controllers und des DMA ist unter [Display-Controller](display-controller.md#controller-buffers-and-flush-paths) beschrieben.

## LVGL-Portierungsentscheidungen { #lvgl-porting-decisions }

Legen Sie diese LVGL-Integrationsdetails fest, bevor Sie Bildschirme verfeinern:

<div align="center"><em>Tabelle: LVGL-Portierungsentscheidungen</em></div>

<div align="center" markdown>

| Entscheidung | Bevorzugte Richtung |
|:---------|:--------------------|
| Tick-Quelle | Stabile Systemzeitbasis, die nach Schlafmodus und Aufwachen weiterhin korrekte Zeitwerte liefert. |
| Flush-Callback | Übertragung der betroffenen Bildbereiche mit Abschlussmeldung vom DMA- oder Displaytreiber. |
| Anzahl Zeichenpuffer | Ein oder zwei Puffer je nach Latenz und Speicherbudget. |
| Richtlinie für invalidierte Bereiche | Kleine Bereiche nur zusammenführen, wenn es die Gesamtübertragungskosten senkt. |
| Eingabegeräte | Touch/Tasten/Encoder über LVGL-Eingabetreiber integriert, nicht durch App-Polling-Schleifen. |
| Hardwarebeschleunigung | Nur vom SDK/Treiber unterstützte Operationen aktivieren und CPU-Fallback beibehalten. |
| Cache-Handhabung | Geteilte Puffer an der Framework-Treiber-Grenze bereinigen/invalidieren. |

</div>

Eine gute LVGL-Portierung sollte es dem Bildschirmcode erlauben, deklarativ zu bleiben, während der Treiber Übertragung, Synchronisation, Beschleunigung und Cache-Verhalten übernimmt.

## ePicasso-Beschleunigung nutzen { #using-epicasso-acceleration }

ePicasso ist nützlich, wenn die UI Operationen enthält, die andernfalls viele wiederholte Pixelberechnungen erfordern würden. Häufige Kandidaten umfassen:

- Rechteckfüllungen.
- Bildkopie- und Blit-Operationen.
- Alpha-Blending.
- Bildskalierung.
- Rotation oder Transformation unterstützter Bildbereiche.
- Ebenenzusammensetzung.
- Pixelformatkonvertierung, sofern vom Treiber unterstützt.

Eine gute Portierung sollte häufige, volumenstarke Operationen beschleunigen und dabei CPU-Fallback-Pfade für nicht unterstützte Fälle beibehalten. Gehen Sie nicht davon aus, dass jeder LVGL-Stileffekt oder jedes Widget auf Hardware abgebildet wird. Messen Sie die tatsächlichen Bildschirme, die für das Produkt wichtig sind.

### Wann Beschleunigung am meisten hilft { #when-acceleration-helps-most }

ePicasso hilft üblicherweise am meisten, wenn:

- Große Bereiche gefüllt, kopiert, geblendet, skaliert oder transformiert werden.
- Die UI transparente Symbole, Textmasken, Schatten, Overlays oder animierte Übergänge verwendet.
- Die CPU andernfalls einen großen Teil jedes Frames mit Pixelschleifen verbringen würde.
- Speicherplatzierung und Pixelformate zu dem passen, was der Beschleuniger effizient verarbeiten kann.

### Wann Beschleunigung möglicherweise wenig hilft { #when-acceleration-may-not-help-much }

Hardwarebeschleunigung bietet möglicherweise begrenzten Nutzen, wenn:

- Der aktualisierte Bereich sehr klein ist.
- Der Engpass die Panel-Übertragungsbandbreite ist, nicht das Rendering.
- Assets nicht unterstützte Formate oder aufwändige Konvertierung erfordern.
- Puffer in langsamem Speicher ohne ausreichende Bandbreite liegen.
- Der Cache-Wartungsaufwand die Operation dominiert.

## Strategie der Speicherzuordnung { #memory-placement-strategy }

Die Grafikleistung wird häufig durch den Datentransfer zwischen Speichern begrenzt. Ordnen Sie Puffer deshalb gezielt zu:

- Häufig genutzte Zeichenpuffer nach Möglichkeit in schnellem SRAM platzieren.
- Große Framebuffer nur in PSRAM halten, wenn SRAM nicht ausreicht.
- Große Bilder und Schriftarten in Flash oder PSRAM speichern, aber Zugriffslatenz berücksichtigen.
- Wiederholte Laufzeitkonvertierung von Assets vermeiden.
- DMA-zugängliche Puffer gemäß SDK-Vorgaben ausgerichtet halten.
- Komprimierte oder indizierte Assets nutzen, wenn sie die Gesamtbandbreite und Dekodierkosten reduzieren.

Wenn CPU und Grafik- oder Display-Hardware Puffer gemeinsam nutzen, beachten Sie die SDK-Regeln für Cache-Pflege und Pufferbesitz. Bevor Hardware CPU-Daten liest, führen Sie Clean für die betroffenen Cache-Zeilen aus und schließen die erforderliche Synchronisierung ab. Bereiten Sie den Puffer vor einem Hardware-Schreibzugriff so vor, dass veränderte CPU-Cache-Zeilen das Ergebnis nicht später durch Zurückschreiben überschreiben. Warten Sie das Transferende ab und invalidieren Sie veraltete Cache-Zeilen, bevor die CPU das Ergebnis liest. Beachten Sie Cache-Zeilen-Ausrichtung und benachbarte Daten; verändern Sie keinen Puffer, solange die Hardware ihn besitzt. Verwenden Sie die unterstützten SDK-Routinen: Clean und Invalidate sind nicht austauschbar.

Für Teilaktualisierung, panelspezifisches Verhalten und den gestuften Inbetriebnahmeablauf siehe [Display-Controller](display-controller.md).

## Grafikressourcen vorbereiten { #asset-preparation }

Gut vorbereitete Grafikressourcen können die UI beschleunigen, bevor Sie den Code optimieren.

Nutzen Sie diese Faustregeln:

- Bildabmessungen an die tatsächliche Bildschirmgröße anpassen.
- Skalierung großer Bilder in jedem Frame vermeiden.
- Komplexe Schatten, Farbverläufe oder Hintergründe nach Möglichkeit vorrendern.
- Alpha nur dort verwenden, wo Transparenz benötigt wird.
- Gemeinsame Symbolsätze und Schriftart-Teilmengen bevorzugen.
- Ungenutzte Glyphen aus Schriftarten entfernen.
- Häufig genutzte Assets in Formaten halten, die der Grafikpfad effizient unterstützt.

Bei mehrsprachigen Produkten kann der Schriftartspeicher das UI-Budget dominieren. Planen Sie Schriftart-Fallback, Glyphen-Teilmengen und Textlayout frühzeitig.

## Animationsstrategie { #animation-strategy }

Flüssige Animationen hängen vom Zeitbudget pro Frame, der Panel-Bandbreite, dem Rendering-Aufwand und dem Stromverbrauch ab.

Ein praktischer Ansatz:

- Nur animieren, was Nutzer bemerken.
- Animierte Bereiche klein halten.
- Transformationen oder Deckkraftänderungen bevorzugen, die sich gut auf Beschleunigung abbilden lassen.
- Aufwändige Vollbild-Unschärfe-, Schatten- oder Transparenzeffekte in jedem Frame vermeiden.
- Bildrate für unkritische Effekte reduzieren.
- Animationen stoppen, wenn der Bildschirm gedimmt, abgedeckt oder inaktiv ist.

Eine Wearable-UI benötigt nicht überall Desktop-artige Animation. Wenige schnelle, klare Übergänge fühlen sich meist besser an als viele Effekte, die Strom verbrauchen oder Frames auslassen.

## Matrix zur Grafikvalidierung { #graphics-validation-matrix }

Verwenden Sie wiederholbare Bildschirme statt subjektiver „flüssig genug“-Prüfungen:

<div align="center"><em>Tabelle: Grafik-Validierungsmatrix</em></div>

<div align="center" markdown>

| Testbildschirm | Was er belastet |
|:------------|:-----------------|
| Volltonfüllung und Farbbalken | Pixelformat, Byte-Reihenfolge, Flush-Pfad. |
| Textreicher Bildschirm | Schriftartspeicher, Glyphen-Cache, Teilaktualisierung. |
| Symbolraster mit Alpha | Blending, Asset-Bandbreite, ePicasso-Pfad. |
| Scrollliste | Invalidierte Bereiche, Übertragungsbandbreite, Eingabelatenz. |
| Vollbildübergang | Frame-Budget, Doppelpufferung, Panel-Bandbreite. |
| Gedimmter/inaktiver Bildschirm | Richtlinie zum Animationsstopp, Hintergrundbeleuchtung und Energiemanagement-Anforderungen (PM vote). |
| Worst-Case-Koexistenz | Bluetooth/Audio/KI aktiv, während UI aktualisiert wird. |

</div>

Verfolgen Sie Render-Zeit, Flush-Zeit, CPU-Last und Stromverbrauch für jeden Bildschirm. Wird nur die Gesamt-Frame-Zeit gemessen, ist schwer zu erkennen, ob der Engpass LVGL, ePicasso, der Speicher oder die Panel-Schnittstelle ist.

## Grafikleistung untersuchen { #debugging-graphics-performance }

Wenn die UI langsam ist, identifizieren Sie den Engpass, bevor Sie das Design ändern.

<div align="center"><em>Tabelle: Grafikleistung debuggen</em></div>

<div align="center" markdown>

| Symptom | Wahrscheinlich zu prüfender Bereich |
|:--------|:---------------------|
| Hohe CPU-Auslastung beim Zeichnen | Fehlende Hardwarebeschleunigung, zu viele Software-Pixeloperationen, komplexe Widgets. |
| Rendering abgeschlossen, aber Display aktualisiert sich langsam | Bandbreite der Panel-Schnittstelle, Flush-Größe, Übertragungspfad des Display-Treibers. |
| Tearing oder Flackern | Pufferstrategie, Synchronisation, Zeitpunkt der Teilaktualisierung. |
| Zufällige Artefakte | Cache-Kohärenz, Pufferlebensdauer, Stride-/Pixelformat-Fehlanpassung. |
| Gute einfache Bildschirme, schlechte Animation | Vollbildneuzeichnungen, große Alpha-Blends, Asset-Skalierung, Panel-Bandbreite. |
| Hoher Stromverbrauch bei inaktiver UI | Unnötige Neuzeichnungen, Timer, Animationen, Display-/Hintergrundbeleuchtungsrichtlinie. |

</div>

Messen Sie diese getrennt:

- LVGL-Render-Zeit.
- ePicasso-Operationszeit.
- Display-Flush-Zeit.
- CPU-Last.
- Auslastung der Speicherbandbreite.
- Stromverbrauch in aktiven, inaktiven und Schlafzuständen.

## Häufige Fehler { #common-mistakes }

Vermeiden Sie diese frühzeitig; sie sind spät nur schwer zu beheben:

- Wahl einer Panel-Schnittstelle vor der Bandbreitenabschätzung.
- Vollbildneuzeichnungen für kleine UI-Änderungen verwenden.
- Alle UI-Assets ohne Profiling in langsamem Speicher ablegen.
- RGB888 verwenden, wenn RGB565 ausreicht.
- Große Bilder in jedem Frame skalieren.
- Cache-Wartung für hardware-geteilte Puffer vergessen.
- Annehmen, dass ePicasso automatisch jede UI-Operation beschleunigt.
- Zu viele Timer oder Animationen verwenden, die die CPU wachhalten.
- Touch-Latenz ignorieren, während nur die Bildrate optimiert wird.
- Bis zur PCB-Inbetriebnahme warten, um die Panel-Initialisierung zu validieren.

## Inbetriebnahme-Checkliste { #bring-up-checklist }

Verwenden Sie diese Checkliste zum Start eines neuen SF32-Grafikprojekts:

- [ ] Display-Auflösung, Farbtiefe, Schnittstelle und Panel-Treiber-IC bestätigen.
- [ ] Bestätigen, dass das gewählte SF32-Bauteil die benötigte Display-Schnittstelle unterstützt.
- [ ] Speicheranforderungen für Framebuffer und Zeichenpuffer abschätzen.
- [ ] Vollbild oder Teilaktualisierung sowie Einzel- oder Doppelpufferung festlegen.
- [ ] Panel-Reset, Versorgungsspannungen, Hintergrundbeleuchtung und Initialisierungssequenz in Betrieb nehmen.
- [ ] LVGL-Tick, Display-Flush und Eingabetreiber implementieren.
- [ ] Grundlegendes Füll-, Bild-, Text- und Touch-Verhalten verifizieren.
- [ ] ePicasso-Beschleunigung aktivieren, wo vom SDK und Treiber unterstützt.
- [ ] Cache-Clean-/Invalidate-Verhalten für geteilte Puffer validieren.
- [ ] Render-Zeit, Flush-Zeit, CPU-Last und Stromverbrauch profilieren.
- [ ] Worst-Case-Bildschirme, Animationen, Bluetooth-Aktivität und Schlaf-/Aufwach-Pfade testen.

## Wichtige Erkenntnisse { #key-takeaways }

- Beginnen Sie das Grafikdesign mit Display-Schnittstelle, Auflösung, Farbtiefe und Aktualisierungsanforderungen.
- Nutzen Sie LVGL oder ein ähnliches Framework, um Widgets, Invalidierung, Zeichnen und Eingabe zu verwalten.
- Nutzen Sie ePicasso, um häufige Pixeloperationen zu beschleunigen, behalten Sie aber CPU-Fallback-Pfade bei.
- Optimieren Sie Speicherplatzierung und Pufferstrategie ebenso sorgfältig wie Rendering-Code.
- Bevorzugen Sie Teilaktualisierung für bandbreitenbegrenzte Panels und statische Wearable-Bildschirme.
- Betrachten Sie UI-Leistung als Systemaufgabe, an der CPU, ePicasso, Speicher, Display-Controller, Panel-Schnittstelle, Touch und Energiemanagement beteiligt sind.
