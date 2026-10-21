---
icon: lucide/layers-3
description: "Wie die 2D/2.5D-Grafik-Engine ePicasso von SiFli das Rendering eingebetteter UIs auf SF32 beschleunigt und mit LVGL, Speicher und Display-Controller zusammenarbeitet."
tags:
  - Grafik
---
# ePicasso 2D/2.5D-Grafik-Engine { #epicasso-2d-25d-graphics-engine }

## Einführung { #introduction }

**ePicasso** ist der 2D/2.5D-Grafikbeschleuniger von SiFli für die SF32-Mikrocontrollerfamilie. Er übernimmt unterstützte, wiederkehrende Pixeloperationen von der Anwendungs-CPU, damit eingebettete UIs flüssige Effekte, schnelle Reaktionen und effiziente Display-Aktualisierungen innerhalb des für Mikrocontroller typischen Energiebudgets ermöglichen.

Im SF32-Grafikablauf arbeitet ePicasso, nachdem Ressourcen für den Renderer verfügbar sind und bevor die finale Bitmap den Display-Controller erreicht. Es beschleunigt Pixelverarbeitungsaufgaben wie Bildkopie, Blending, Skalierung, Rotation und Ebenenzusammensetzung. eZip dekomprimiert die Assets und kann die dekodierten Bilddaten an ePicasso weitergeben; der Display-Controller überträgt die vorbereiteten Pixel an das Panel. Den vollständigen Pfad von der Ressource bis zum Panel finden Sie unter [Grafikübersicht](overview.md#sf32-graphics-flow).

Anwendungen programmieren einzelne ePicasso-Operationen üblicherweise nicht direkt. Stattdessen erstellt ein Grafik-Framework wie **LVGL** oder eine herstellerspezifische Grafikbibliothek Befehle für übliche UI-Arbeiten. Der SF32-Grafiktreiber leitet unterstützte Operationen an ePicasso weiter und fällt auf CPU-Rendering zurück, wenn eine Operation nicht unterstützt wird.

Nutzen Sie diese Seite, wenn die Leistungsanalyse der UI zeigt, dass Kopieren, Füllen, Alpha-Blending, Skalierung, Rotation oder Zusammensetzen die Reaktionsfähigkeit einschränken oder den Energieverbrauch erhöhen. Sie hilft Firmware-Ingenieuren zu entscheiden, welche Operationen sich beschleunigen lassen und für welche ein korrekter CPU-Fallback erhalten bleiben muss.

## Warum Hardware-Grafikbeschleunigung wichtig ist { #why-hardware-graphics-acceleration-matters }

Die Leistung eingebetteter UIs wird häufig stärker durch den Datentransport im Speicher als durch den CPU-Befehlsdurchsatz begrenzt. Selbst ein einfaches halbtransparentes Symbol kann für jeden betroffenen Pixel einen Lesezugriff auf die Quelle und den Framebuffer, das Mischen der Pixel sowie einen Schreibzugriff auf den Framebuffer erfordern.

ePicasso verbessert diese Situation, indem es die sich wiederholenden Pixeloperationen beschleunigt, die in einer Benutzeroberfläche durchgängig auftreten:

- Kopieren von Bildblöcken und Framebuffer-Bereichen.
- Füllen von Rechtecken und UI-Hintergründen.
- Alpha-Blending von Symbolen, Textmasken, Schatten und Overlays.
- Skalieren von Bitmaps für responsive Layouts und Animationen.
- Rotieren oder Transformieren von Bildbereichen.
- Zusammensetzen mehrerer Ebenen zu einem finalen Anzeigepuffer.
- Konvertieren zwischen gängigen Pixelformaten, sofern vom Gerät und Treiber unterstützt.

Der Nutzen beschränkt sich nicht auf die Bildwiederholrate: Hardwarebeschleunigung kann die CPU-Auslastung senken, die Touch-Reaktionsfähigkeit verbessern und mehr Gelegenheit für stromsparende Zustände zwischen Display-Aktualisierungen schaffen.

Weniger CPU-Arbeit garantiert keinen geringeren Gesamtenergieverbrauch. Der Takt des Beschleunigers, Speicherverkehr, Synchronisierung und Treiberaufwand können die CPU-Einsparung aufheben. Vergleichen Sie auf der Zielhardware die Energie pro abgeschlossener Bildschirmaktualisierung und berücksichtigen Sie dabei auch den Energiebedarf des Displays sowie die anschließende Leerlaufphase, statt die Effizienz allein anhand der CPU-Auslastung zu bewerten.

## Zentrale Rendering-Konzepte { #core-rendering-concepts }

### Grafikflächen und Framebuffer { #surfaces-and-framebuffers }

Eine **Grafikfläche (Surface)** ist ein rechteckiger Bereich im Pixelspeicher. Sie kann einen vollständigen Bildschirm-Framebuffer, einen partiellen Zeichenpuffer, eine Bildressource, eine Zeichenfläche oder eine Zwischenebene darstellen. ePicasso-Operationen lesen im Allgemeinen Pixel aus einer oder mehreren Quellflächen und schreiben sie in eine Zielfläche.

Platzieren Sie Grafikflächen in einem Speicherbereich, der zu ihrem Zugriffsmuster passt:

- Häufig aktualisierte Zeichenpuffer profitieren oft von schnellem internem SRAM, wenn ausreichend Platz verfügbar ist.
- Große Bilder, Schriftarten und UI-Assets können in Flash oder PSRAM liegen.
- Vollbild-Framebuffer für höher auflösende Displays können PSRAM erfordern.
- DMA-sichtbare Puffer müssen den Speicher- und Cache-Kohärenzregeln des SDK folgen.

### Blending { #blending }

Blending kombiniert Quellpixel mit Zielpixeln. Dies ist essenziell für moderne UI-Elemente wie durchscheinende Karten, weiche Schatten, kantengeglättete Glyphen, Overlays und Ausblendanimationen.

Häufige Blending-Fälle sind:

- Konstantes Alpha-Blending zum Ausblenden einer gesamten Ebene.
- Pixelweises Alpha-Blending für PNG-ähnliche Bilder und kantengeglättete Symbole.
- Maskenbasiertes Blending für Text, Formen oder monochrome Assets.

Wenn ePicasso das Blending in Hardware übernimmt, muss die CPU dieselbe Arithmetik nicht für jeden Pixel im betroffenen Bereich ausführen.

### Skalierung und Rotation { #scaling-and-rotation }

Skalierung und Rotation sind in animierten Oberflächen und responsiven Layouts üblich. Hardware-Skalierung kann für Zoom-Effekte, Vorschau-Miniaturansichten, verkleinerte Symbole oder die Anpassung von Assets an unterschiedliche Bildschirmdichten genutzt werden. Rotation ist nützlich für Bildschirmorientierungswechsel, rotierende Anzeigen, Zifferblattelemente und bestimmte Übergangseffekte.

Diese Operationen beanspruchen Speicherbandbreite. Ihr Nutzen hängt von Quell- und Zielformat, Speicherplatzierung und davon ab, ob der Grafiktreiber die Operation einer unterstützten Hardwarefunktion zuweisen kann.

### Ebenenzusammensetzung { #layer-composition }

Viele Bildschirme werden aus mehreren visuellen Ebenen aufgebaut: einem Hintergrund, Bild-Assets, Text, Statusanzeigen, Popups und Animations-Overlays. Die Ebenenzusammensetzung kombiniert diese Elemente zum finalen sichtbaren Ergebnis.

ePicasso ist darauf ausgelegt, diese Art der 2D-Zusammensetzung zu beschleunigen. Statt den gesamten Bildschirm per Software neu zu zeichnen, kann ein UI-Framework nur die neu zu zeichnenden Bereiche aktualisieren und den Beschleuniger nutzen, um die geänderten Pixel effizient zusammenzusetzen.

## 2D- und 2.5D-Grafik { #2d-and-25d-graphics }

Der Begriff **2D-Grafik** bezieht sich üblicherweise auf Operationen an flachen rechteckigen Bildern: Kopieren, Füllen, Blenden, Skalieren, Rotieren und Zusammensetzen.

Der Begriff **2.5D-Grafik** wird für Effekte verwendet, die weiterhin in einen 2D-Framebuffer rendern, aber Transformations- oder perspektivenähnliches Verhalten hinzufügen. Im Design eingebetteter UIs kann dies transformierte Bildbereiche, reichhaltigere Übergänge oder Effekte umfassen, die einen visuellen Tiefeneindruck vermitteln, ohne eine vollständige 3D-Rendering-Pipeline zu erfordern.

Für die SF32-Dokumentation sollte ePicasso in erster Linie als **2D/2.5D-UI-Beschleuniger** verstanden werden, nicht als programmierbare 3D-GPU im Desktop-Format. Sein Zweck ist es, eingebettete Oberflächen flüssiger und energieeffizienter zu machen, insbesondere bei Displays für Wearables, intelligente Bedienelemente, Handgeräte und kompakte Dashboards.

## Vergleich der ePicasso-Implementierungen { #epicasso-generation-comparison }

Vergleichen Sie die Implementierung der jeweiligen Gerätefamilie, nicht nur den Namen der Engine. Display-Auflösung, Ebenenanzahl, unterstützte Formate, eZip-Funktionen, externe Speicherbandbreite und Treiberunterstützung hängen auch vom gewählten SF32-Gerät, Gehäuse, SDK und Board-Design ab. Der [SF32LB52x-Produktbrief von SiFli](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf) bezeichnet die Engine als ePicasso 2.0. Das [SF32LB56x-Datenblatt](https://downloads.sifli.com/silicon/DS0056-SF32LB56x-Datasheet%20V1p8.pdf) nennt vier Vordergrundebenen, eine dedizierte Maskenebene und eine monochrome Hintergrundebene; TurboPixel wird separat als Framebuffer-Kompressionsfunktion des LCD-Controllers beschrieben. Das [SF32LB58x-Datenblatt](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf) dokumentiert ePicasso 2.0 und die separate Vektorgrafik-Engine Vivante GCNanoUltraV.

<div align="center"><em>Vergleich der ePicasso-Implementierungen</em></div>

<div align="center" markdown>

| Dokumentierte Engine | Repräsentative SF32-Familie | Grafikfunktionen | Dokumentierte Merkmale | Geeignet für |
|:---|:---|:---|:---|:---|
| **ePicasso** | SF32LB55x | 2.5D-UI-Beschleunigung | Hardware-Rotation, -Skalierung, horizontale Spiegelung und Alpha-Blending; vertikale Spiegelung wird nicht unterstützt. Verlustfreier eZip-Asset-Workflow | BLE-Wearables und kompakte HMIs, die eine reichhaltigere UI als ein Einstiegsdesign benötigen |
| **ePicasso 2.0** | SF32LB52x | 2D/2.5D-UI-Beschleunigung | eZip-2.0-Asset-Dekompression in einer kostenoptimierten Grafikkonfiguration | Einstiegs-Wearables, Bluetooth-Produkte, E-Paper und kompakte HMIs |
| **ePicasso 2.0** | SF32LB56x | 2D/2.5D-UI-Beschleunigung | Vier Vordergrundebenen mit Alpha-Blending, eine dedizierte Maskenebene und eine monochrome Hintergrundebene; Hardware-Rotation, -Skalierung und horizontale Spiegelung (keine vertikale Spiegelung); Formatkonvertierung, eZip 2.0 und separate TurboPixel-Framebuffer-Kompression | Höher auflösende Displays und umfangreichere LVGL-Oberflächen; prüfen Sie die unterstützten Operationen für Gerät und SDK |
| **ePicasso 2.0** | SF32LB58x | 2D/2.5D-UI-Beschleunigung | Enthält ePicasso 2.0 und die separate Vektorgrafik-Engine Vivante GCNanoUltraV; prüfen Sie die Funktionen beider Engines getrennt | Hochauflösende, grafikintensive Produkte; prüfen Sie, welche Funktionen das jeweilige SDK für jede Engine unterstützt |
| **ePicasso (EPIC)** | SF32LB57x | 2D/2.5D-UI-Beschleunigung | Rotation, Skalierung, Matrixtransformationen, horizontale und vertikale Spiegelung, Alpha-Blending und Mehrebenenzusammensetzung; EZIP liefert dekomprimierte eZip-/eZip-A-Ressourcen an EPIC. Die EPIC-Formattabelle führt JPEG-Eingabe auf SF32LB57x gesondert auf; das SDK stellt außerdem einen eigenständigen JPEGD-HAL-Decoder bereit, der einen separaten Pfad darstellt. | Grafikreiche, kamerafähige und multimediaorientierte vernetzte Produkte |

</div>

Dies ist keine Benchmark-Rangliste. Prüfen Sie für das konkrete Produkt die unterstützten Pixelformate, Ebenen- und Auflösungsgrenzen, eZip-Funktionen, den verfügbaren Framebuffer-Speicher, die Bandbreite der Display-Schnittstelle und die Unterstützung durch den SDK-Treiber.

Die EPIC-Funktionstabelle des SDK dokumentiert horizontale Spiegelung für alle aufgeführten Familien, vertikale Spiegelung jedoch nur für SF32LB52x und SF32LB57x. Eine nicht näher bezeichnete Angabe „Spiegelung“ bedeutet nicht, dass beide Richtungen unterstützt werden. Dieselbe Tabelle schließt EZIP-, JPEG- und YUV-Eingaben von Rotation und Matrixtransformationen aus.

Der EZIP-zu-EPIC-Pfad erspart die Ablage eines vollständig dekomprimierten Quellbilds in einem Zwischen-Framebuffer. Decoder-Arbeitsspeicher und der abschließende Renderpuffer bleiben erforderlich. JPEG-Dekodierung ist keine EZIP-Funktion. Das SDK führt JPEG als Eingabeformat für EPIC auf SF32LB57x auf und stellt davon getrennt ein [JPEGD-HAL-Beispiel](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/hal/jpegd/README.html) bereit, das die JPEG-Bilddekodierung mit HAL_JPEGD zeigt. Die Dokumentation beschreibt beide Pfade getrennt; prüfen Sie, welcher davon in der Anwendung tatsächlich verwendet wird.

Dieses Beispiel zur Dekodierung eines JPEG-Einzelbilds belegt nicht, dass JPEGD MJPEG-Streams dekodiert. Das SDK beschreibt MJPEG separat im [FFmpeg-Video-Middleware-Leitfaden](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/middleware/video.html); dessen Konfigurationshinweis besagt, dass MJPEG-Hardwaredekodierung nur auf SF32LB58x verfügbar ist.

Prüfen Sie vor der Auswahl eines beschleunigten Pfads außerdem formatspezifische Einschränkungen und Unterschiede zwischen den Familien. Nutzen Sie dazu die [EPIC-Funktionstabelle im Upstream-Repository](https://github.com/OpenSiFli/SiFli-SDK/blob/main/docs/source/zh_CN/hal/epic.md) und die [JPEGD-Schnittstelle](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_jpegd.h).

## ePicasso in der gesamten SF32-Familie { #epicasso-across-the-sf32-family }

Die SF32-Geräte integrieren unterschiedliche ePicasso-Konfigurationen. Maßgeblich für den Funktionsumfang sind das Datenblatt und Referenzhandbuch des gewählten Chips.

<div align="center"><em>Tabelle: ePicasso in der gesamten SF32-Familie</em></div>

<div align="center" markdown>

| Geräte-Familie | Grafikbeschleuniger | Typische Positionierung |
|:--------------|:---------------------|:--------------------|
| **SF32LB52x** | ePicasso-2.0-2D/2.5D-Beschleuniger | Kostenoptimierte Wearable-, Bluetooth- und kompakte HMI-Produkte. |
| **SF32LB55x** | ePicasso-2.5D-Beschleuniger | BLE-Wearables und sensorreiche Geräte mit Display-Anforderungen. |
| **SF32LB56x** | ePicasso-2.0-2D/2.5D-Beschleuniger | Display-Produkte mit höherer Auflösung und umfangreichere LVGL-basierte Oberflächen. |
| **SF32LB57x** | ePicasso-(EPIC)-2D/2.5D-Beschleuniger | Grafikreiche, kamerafähige und multimediaorientierte vernetzte Produkte. |
| **SF32LB58x** | ePicasso 2.0 und die separate Vektorgrafik-Engine Vivante GCNanoUltraV | Flaggschiff-Grafik, hochauflösende UI und fortgeschrittene visuelle Anwendungen. |

</div>

Diese Entwicklungslinie erlaubt es Entwicklern, ein ähnliches Grafik-Softwaremodell über SF32 hinweg beizubehalten und dabei das Gerät zu wählen, das zur benötigten Display-Auflösung, zum Speicher, zur Grafikkomplexität, zur GPIO-Anzahl und zum Leistungsbudget passt.

## Integration mit LVGL und UI-Frameworks { #integration-with-lvgl-and-ui-frameworks }

**LVGL** wird häufig für grafische Oberflächen auf SF32-Geräten verwendet. Die Anwendung setzt Bildschirme aus Widgets, Stilen, Bildern, Schriftarten und Animationen zusammen. LVGL bestimmt die neu zu zeichnenden Bereiche; der Software-Renderer oder das Hardware-Zeichenbackend erzeugt deren Pixel. Der Flush-Pfad des Displaytreibers überträgt die fertigen Pixel an das Panel und meldet den Abschluss. Unterscheiden Sie zwischen abgeschlossenem Rendering und abgeschlossener Displayübertragung.

ePicasso kann die LVGL-Leistung verbessern, wenn der SF32-Port unterstützte Zeichenoperationen an die Hardware weiterleitet. Die nützlichsten Beschleunigungspunkte sind üblicherweise:

- Bild-Blits.
- Farbfüllungen.
- Alpha-Blending.
- Bildskalierung.
- Rotation oder Transformation unterstützter Bildbereiche.
- Zusammensetzung in einen Zeichenpuffer oder Framebuffer.

Eine robuste LVGL-Integration behält CPU-Fallback-Pfade bei. Nicht jedes LVGL-Feature, Pixelformat, jeder Stileffekt und jedes Bildlayout lässt sich direkt einer Hardwareoperation zuweisen. Beschleunigen Sie häufige Operationen mit hohem Datenaufkommen und überlassen Sie seltene oder komplexe Fälle der Software.

## Überlegungen zu Speicher und Bandbreite { #memory-and-bandwidth-considerations }

Grafikbeschleunigung ersetzt nicht die Notwendigkeit eines sorgfältigen Speicherdesigns. In vielen eingebetteten Display-Systemen ist der Speicherbus die begrenzende Ressource: ePicasso, die CPU, der Display-Controller, DMA-Engines, Flash, PSRAM, Audio- und Funksubsysteme können alle um Zugriff konkurrieren.

Eine gute Grafikleistung hängt von mehreren Design-Entscheidungen ab:

- Verwenden Sie Display-Auflösungen und Farbtiefen, die den Produktanforderungen entsprechen.
- Halten Sie häufig genutzte UI-Assets an Speicherorten mit akzeptabler Zugriffslatenz.
- Nutzen Sie partielles Rendering oder die Aktualisierung geänderter Bereiche, wenn eine Vollbildaktualisierung unnötig ist.
- Vermeiden Sie unnötige Formatkonvertierungen im zeitkritischen Pfad.
- Richten Sie Zeichenpuffer und Framebuffer gemäß den SDK-Empfehlungen aus.
- Beachten Sie die DMA- und Cache-Kohärenzregeln, wenn Puffer zwischen CPU, ePicasso und Display-Controller geteilt werden.

Für cachebare Puffer, die CPU und ePicasso gemeinsam nutzen, befolgen Sie die SDK-Regeln für Cache-Wartung und Pufferbesitz. Führen Sie für die von der CPU geschriebenen Quelldaten einen Cache-Clean aus, bevor die Hardware sie liest. Bevor die Hardware in einen Zielpuffer schreibt, bereiten Sie ihn gemäß den SDK-Regeln vor, damit veränderte CPU-Cache-Zeilen das Ergebnis nicht später überschreiben; invalidieren Sie nach Abschluss des Hardwarevorgangs veraltete Zeilen, bevor die CPU das Ergebnis liest. Beachten Sie Cache-Zeilen-Ausrichtung und benachbarte Daten und verändern Sie keine Puffer im Besitz der Hardware. Den Ablauf beschreibt die [Grafikübersicht](overview.md#memory-placement-strategy).

Die in der [Grafikübersicht](overview.md#sf32-graphics-flow) beschriebene Aufgabenteilung ist entscheidend für die Fehlersuche bei der UI-Leistung. Eine langsame Aktualisierung kann durch Renderzeit, Speicherbandbreite, Panel-Übertragung, Display-Schnittstellenkonfiguration oder Synchronisation verursacht werden. ePicasso hilft vor allem dann, wenn das Rendering der Engpass ist. Begrenzt dagegen die Panel-Übertragung die Leistung, können Teilaktualisierungen, eine geringere Farbtiefe, eine andere Pufferstrategie oder eine schnellere Schnittstelle wirksamer sein.

## Typische Anwendungsfälle { #typical-use-cases }

ePicasso ist am nützlichsten in Produkten, deren Oberfläche viele visuelle Elemente enthält, das System aber dennoch innerhalb des Leistungsbudgets eines Mikrocontrollers bleiben muss.

Typische Anwendungsfälle sind:

- Smartwatch-Zifferblätter und App-Bildschirme.
- Fitness-Tracker und tragbare Gesundheitsdisplays.
- Bluetooth-Audio-Benutzeroberflächen.
- E-Bike-, E-Scooter- und kompakte Fahrzeug-Dashboards.
- Smart-Home-Bedienelemente und kleine Touch-Panels.
- Tragbare medizinische oder industrielle Instrumente.
- Etikettendrucker, Smart Badges und elektronische Regaletiketten.
- LVGL-basierte HMIs mit Symbolen, Transparenz und Animationen.

## Praktischer Design-Leitfaden { #practical-design-guidance }

Legen Sie zunächst die Anforderungen an Display und Bedienung fest und leiten Sie daraus die benötigte Grafikarchitektur ab.

Wichtige Fragen sind:

- Wie hoch sind Display-Auflösung und Farbtiefe?
- Wird das Panel über SPI, QSPI, 8080, RGB/DPI, MIPI DSI, EPD oder JDI aktualisiert?
- Benötigt das Produkt Vollbildanimation oder überwiegend Teilaktualisierungen?
- Sind UI-Assets in internem SRAM, Flash oder PSRAM gespeichert?
- Wie viel Speicher steht für Zeichenpuffer oder Framebuffer zur Verfügung?
- Welche Operationen kann der Grafiktreiber über ePicasso beschleunigen?
- Sind CPU-, ePicasso- und Display-Controller-Puffer cache-kohärent?

Für viele Produkte ergibt sich das beste Ergebnis aus der Kombination mehrerer Techniken: hardwarebeschleunigtes Zeichnen, Teilaktualisierung, komprimierte oder optimierte Assets, sorgfältige Pufferplatzierung und ein UI-Design, das unnötige Vollbildneuzeichnungen vermeidet.

## Wichtige Erkenntnisse { #key-takeaways }

- ePicasso ist der 2D/2.5D-Grafikbeschleuniger von SiFli für SF32-Mikrocontroller.
- Er übernimmt gängige Pixeloperationen wie Füllen, Kopieren, Blending, Skalierung, Rotation und Ebenenzusammensetzung von der CPU.
- Er arbeitet mit dem Display-Controller zusammen: ePicasso bereitet die Pixeldaten vor, und der Display-Controller überträgt sie an das Panel.
- Besonders nützlich ist ePicasso bei Produkten mit aufwendiger UI, wenn Speichertransfers, Blending und wiederholte Pixelverarbeitung sonst viel CPU-Zeit beanspruchen würden.
- LVGL und andere UI-Frameworks können von ePicasso profitieren, wenn der SF32-Grafiktreiber unterstützte Zeichenoperationen auf Hardware abbildet.
- Die tatsächliche Leistung hängt von Display-Auflösung, Speicherplatzierung, Pixelformaten, Pufferstrategie, Cache-Verwaltung und Bandbreite der Panel-Schnittstelle ab.
