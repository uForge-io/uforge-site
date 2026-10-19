---
icon: lucide/monitor
description: "Wie der SF32-Display-Controller vorbereitete Pixel an ein Panel überträgt, einschließlich Schnittstellenwahl, Flush-Pfaden, Teilaktualisierung und Panel-Inbetriebnahme."
tags:
  - Grafik
---

# Display-Controller { #display-controller }

## Übersicht { #overview }

Der **Display-Controller** (LCDC) überträgt vorbereitete Pixel über die gewählte Schnittstelle an das Panel. Bei unterstützten Geräten und Konfigurationen dekomprimiert er außerdem einen TurboPixel-Framebuffer während der Ausgabe. LCDC unterstützt ein begrenztes Alpha-Blending seiner Ausgabeebenen über einem einfarbigen Hintergrund. Dokumentiert sind Ebene 0 und Ebene 1; SF32LB52x unterstützt Ebene 1 nicht. Diese Funktion ersetzt weder das allgemeine UI-Rendering noch die Bildkomposition mit ePicasso. Die Dekodierung von eZip-Bildressourcen bleibt ein separater Vorgang.

Primärquelle: [SiFli-LCDC-HAL-Dokumentation](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/lcdc.md).

Der obige Link ist auf einen bestimmten SiFli-SDK-Commit festgelegt. Er dokumentiert das HAL-Verhalten in dieser Revision, belegt jedoch nicht, dass jede Schnittstelle, Ebene oder Funktion auf jedem SF32-Gerät und Gehäuse oder in anderen SDK-Versionen verfügbar ist. Prüfen Sie die konkrete Kombination aus Gerät, Gehäuse und SDK-Version Ihres Projekts.

Den vollständigen Ablauf von der Ressource bis zum Panel finden Sie unter [Grafikübersicht](overview.md#sf32-graphics-flow). Dieser Artikel konzentriert sich auf den Controller, die Panel-Anbindung und die Treiberintegration.

Lesen Sie diese Seite, wenn Sie eine Panel-Schnittstelle auswählen, einen LVGL-Flush-Pfad definieren oder ein neues Panel auf der Hardware in Betrieb nehmen. Sie trennt die Ausgabeaufgaben des Controllers von der Asset-Dekodierung und der Pixelzusammensetzung, sodass Display-Probleme auf der richtigen Ebene isoliert werden können.

## Auswahl der Display-Schnittstelle { #select-the-display-interface }

EPD und Memory-in-Pixel bezeichnen Paneltechnologien oder Verfahren zur Pixelaktualisierung, keine austauschbaren Busstandards. Ein EPD-Modul kann einen externen Controller über SPI ansprechen; für SF32LB57x ist außerdem ein LCDC-Direktmodus zur EPD-Ansteuerung dokumentiert. JDI bietet serielle und parallele Schnittstellenmodi mit unterschiedlichen Signalen. Prüfen Sie die elektrische Schnittstelle und die Wartungsanforderungen des Panels, nicht nur dessen Displaykategorie.

Die Panel-Wahl beeinflusst Bandbreite, Pufferstrategie, Pin-Nutzung, Stromverbrauch, Initialisierungskomplexität und PCB-Risiko. Bestätigen Sie die genaue Schnittstellenliste für das gewählte Gerät und Gehäuse.

<div align="center"><em>Optionen für Display-Schnittstellen und Paneltechnologien</em></div>

<div align="center" markdown>

| Schnittstelle oder Paneltyp | Typische Verwendung | Design-Hinweise |
|:---|:---|:---|
| **SPI mit 3 bzw. 4 Leitungen** | Kleine TFT- oder AMOLED-Panels, einfache HMIs | Geringe Pin-Anzahl und einfaches Routing, aber begrenzte Bandbreite für Vollbildanimationen. |
| **Dual-SPI / Quad-SPI** | Wearable-AMOLED und kompakte Displays | Bessere Bandbreite als einfaches SPI bei moderater Pin-Anzahl. |
| **8080-MCU-Schnittstelle** | Panels mit paralleler Schnittstelle | Höhere Bandbreite als serielles SPI, benötigt jedoch mehr Pins. |
| **RGB / DPI** | Größere Displays oder solche mit hoher Bildwiederholrate | Kontinuierlicher Pixelstrom, höherer Bandbreiten- und Pin-Bedarf sowie engere Timing-Vorgaben. |
| **MIPI DSI** | Hochauflösende AMOLED-Panels oder andere anspruchsvolle Panels | Hohe Bandbreite bei wenigen Pins, aber komplexere Initialisierung und Signalintegrität. |
| **EPD-Paneltechnologie** | E-Paper und Displays mit sehr niedriger Bildwiederholrate | Die Host-Schnittstelle hängt von Modul und Controller ab. Ein statisches Bild kann bei geringer Leistungsaufnahme des Panels gehalten werden; Aktualisierungen sind langsam und erfordern eine panelspezifische Wellenform- und Stromversorgungssteuerung. |
| **JDI (seriell oder parallel)** | Reflektierende Panels mit niedrigem Stromverbrauch | Die JDI-Modi verwenden unterschiedliche Signale; elektrische Schnittstelle und Wartungsanforderungen des konkreten Panels prüfen. |
| **Memory-in-Pixel-Paneltechnologie** | Reflektierende Displays mit niedrigem Stromverbrauch, auch für Always-on- oder sonnenlichttaugliche UIs | Der Pixelspeicher ist in das Panel integriert; das Aktualisierungsverhalten unterscheidet sich von TFT/AMOLED. Datenblatt des Panels beachten. |

</div>

Zum Beispiel kann ein kleines SPI/QSPI-Panel Teilaktualisierungen bevorzugen, während ein RGB/DPI-Panel eine dauerhaft ausreichende Bandbreite für kontinuierliches Scanout benötigt. Wählen Sie eine Schnittstelle nicht allein anhand des theoretischen Durchsatzes: Berücksichtigen Sie Pixelformat, Auflösung, Aktualisierungsverhalten, Panel-GRAM und andere PSRAM-Nutzer.

## Schnittstellenmatrix pro Gerät { #per-device-interface-matrix }

Die folgende Matrix unterstützt die Auswahl einer Familie; sie ist keine Pin-Zuordnungstabelle. Sie fasst die für die jeweilige SF32-Familie oder Siliziumvariante dokumentierten Display-Schnittstellen zusammen. Ein Strich bedeutet, dass die Dokumentation die Schnittstelle für diese Zeile nicht aufführt. Ein GPIO-gesteuerter externer Controller oder eine boardspezifische Implementierung ist damit nicht ausgeschlossen. Prüfen Sie vor dem Schaltplanabschluss immer die genaue Bestellnummer, das Gehäuse, die Pin-Multiplexierung, die SDK-Version und den Panel-Treiber.

<div align="center"><em>SF32-Display-Schnittstellenmatrix</em></div>

<div align="center" markdown>

| SF32-Familie / Variante | Dokumentierte LCD-/Panel-Schnittstellen | Gehäuse- oder Variantenbeschränkung | Praktische Auswahlrichtung |
|:---|:---|:---|:---|
| **SF32LB52x** | 3-/4-Draht-SPI, Dual-SPI, Quad-SPI, MCU/8080 (MIPI DBI), serielles/paralleles JDI; SPI-angebundenes EPD; der Hardwareleitfaden für 52B/D/E/G/J dokumentiert zudem eine 8-Bit-Parallel-EPD-Signalschnittstelle | Die aufgeführten 52x-Modelle verwenden QFN68L. Der Hardwareleitfaden führt Signalbelegung und TPS-PMIC-Steuerung für 52B/D/E/G/J auf; daraus folgt jedoch keine Unterstützung des LCDC-Direktmodus für EPD. Treiber und genaue Variante prüfen. | Geeignet für kompakte SPI/QSPI-, 8080- und JDI-Designs; bei parallelem EPD GPIO-, Timing- und TPS-Stromversorgungssteuerung für die gewählte Variante verifizieren. |
| **SF32LB55x** | 3-/4-Draht-SPI, Dual-SPI, Quad-SPI, MCU/8080, DPI/RGB, serielles/paralleles JDI, MIPI-DSI-Kommandomodus | Die dokumentierte MIPI-DSI-Schnittstelle mit 2 Daten-Lanes ist bei BGA145/169-Gehäusen verfügbar; JDI und der Dual-Display-Betrieb über MIPI DSI + SPI/DSPI sind nur für 557VD3A6 aufgeführt. Der Kommandomodus erfordert einen Panel-Controller mit internem SRAM/GRAM. | Wearables und andere vernetzte Geräte mit Display, kompatiblem BGA-Gehäuse und MIPI-Panel im Kommandomodus. |
| **SF32LB56xU** | 3-/4-Draht-SPI, Dual-SPI, Quad-SPI, serielles JDI | Die aufgeführten U-Varianten verwenden QFN68L; genaue Bestellnummer und Pin-Multiplexierung prüfen. | Geeignet für kompakte serielle Panel-Designs, bei denen QSPI-Bandbreite und eine geringere Pin-Anzahl wichtig sind. |
| **SF32LB56xV** | 3-/4-Draht-SPI, Dual-SPI, Quad-SPI, DBI 8080, DPI/RGB, serielles/paralleles JDI | Die aufgeführten V-Varianten verwenden WBBGA175 (BGA175 in der Modellübersicht); benötigte Pins und Platinenrouting für die genaue Bestellnummer prüfen. | Geeignet für höhere Auflösungen oder Bildwiederholraten und für Designs mit 8080, DPI/RGB oder parallelem JDI. |
| **SF32LB57x** | 3-/4-Draht-SPI, Dual-SPI, Quad-SPI, 8-/16-Bit-8080/DBI, DPI/RGB, JDI und direkt angesteuerte EPD | Zu den Gehäuseoptionen zählen QFN68L, QFN80L und BGA112. Genaue Bestellnummer, verfügbare Pins und vorgesehenen Panel-Treiberpfad prüfen. | Für grafikintensive Designs mit unterschiedlichen Anforderungen an parallele oder serielle Displays sowie an JDI oder EPD. |
| **SF32LB58x** | 3-/4-Draht-SPI, Dual-SPI, Quad-SPI, MCU/8080, DPI/RGB, serielles/paralleles JDI, MIPI DSI mit 2 Daten-Lanes in Kommando- und Videomodus | Die aufgeführten Bestellnummern verwenden BGA256. Der Kommandomodus nutzt einen Panel-Controller mit internem SRAM/GRAM; der Videomodus unterstützt zudem RAM-lose Panel-Controller. Die Modellübersicht führt auch Dual-Display über MIPI DSI + SPI/DSPI/QSPI auf. LCD-Controller und Pin-Mux für das konkrete Design bestätigen. | Hochauflösende und bandbreitenintensive UI-Designs, einschließlich Dual-Display-Konfigurationen und MIPI-DSI-Panels mit oder ohne Controller-RAM. |

</div>

Behandeln Sie bei **SF32LB56x** die U- und V-Varianten nicht als austauschbar. Sehen Sie MIPI DSI bei **SF32LB55x** oder **SF32LB58x** erst im Schaltplan vor, nachdem das genaue Gehäuse, die verfügbaren DSI-Pins und die Lane- und Modusanforderungen des Panels bestätigt sind. SF32LB55x unterstützt ausschließlich den Kommandomodus und passt daher nicht zu einem RAM-losen Panel im Videomodus. Für EPD-Designs müssen außerdem Timing, Wellenform und Stromversorgung des konkreten Panels berücksichtigt werden; die Schnittstellenangabe allein reicht dafür nicht aus.

Die SiFli-Chipmodellübersicht führt DPI/RGB als Schnittstelle der SF32LB55x-Familie auf, ordnet DPI in ihrer Tabelle der einzelnen Bestellnummern jedoch keinem der dort aufgeführten SKUs zu. Behandeln Sie dies nur als Hinweis auf Familienebene und prüfen Sie vor einer DPI-Auslegung die Unterstützung und Pinverfügbarkeit für die genaue Bestellnummer. Die U/V-Unterscheidung bei SF32LB56x folgt den getrennten Hardwareleitfäden, nicht der HAL-Tabelle für die gesamte Familie.

Die beiden SF32LB52x-Hardwareleitfäden widersprechen sich bei JDI: In den Übersichten wird serielles JDI genannt, während die detaillierten JDI-Abschnitte parallele Signalbelegungen zeigen. Daher führt die Matrix beide dokumentierten Angaben auf, ohne eine Pin-Verfügbarkeit für ein konkretes Gerät zu garantieren. Vor dem Designabschluss LCDC-Mapping, SDK/Treiber und Panelsignale der genauen Variante prüfen.

Bei SF32LB52x ist zwischen der dokumentierten 8-Bit-Parallel-EPD-Signalschnittstelle und dem LCDC-Direktmodus für EPD zu unterscheiden. Der Hardwareleitfaden für 52B/D/E/G/J führt parallele EPD-Signale und die TPS-PMIC-Steuerung auf; die Versionshinweise des SiFli-SDK v2.5.1 dokumentieren die direkte LCDC-EPD-Ansteuerung dagegen für SF32LB57x. Leiten Sie daraus nicht ab, dass ein 52x-Design denselben LCDC-Direktmodus wie 57x verwenden kann. Treiber und Timing-Implementierung für die konkrete Variante prüfen.

Quellen zu den Schnittstellen: [SiFli-Chipmodellübersicht](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html), [SF32LB52x-Hardwareleitfaden für akkubetriebene Varianten](https://wiki.sifli.com/hardware/SF32LB520-3-5-7-HW-Application.html), [52B/D/E/G/J-Hardwareleitfaden](https://wiki.sifli.com/hardware/SF32LB52B-E-G-J-HW-Application.html), [SF32LB55x](https://wiki.sifli.com/hardware/SF32LB55x-HW-Application.html), [SF32LB56xU](https://wiki.sifli.com/hardware/SF32LB56xU-HW-Application.html), [SF32LB56xV](https://wiki.sifli.com/hardware/SF32LB56xV-HW-Application.html), [SF32LB58x](https://wiki.sifli.com/hardware/SF32LB58x-HW-Application.html) und [SF32LB57x-SDK-Unterstützung](https://github.com/OpenSiFli/SiFli-SDK/releases/tag/v2.5.1).

## Controller, Puffer und Flush-Pfade { #controller-buffers-and-flush-paths }

Das LCDC-Referenzdiagramm unterscheidet den sichtbaren Panelbereich, das Aktualisierungsfenster und den Quellpufferbereich. Wenden Sie Spalten- und Zeilenoffsets des Panels konsistent an. Das Aktualisierungsfenster kann nur einen Teil des Quellpufferbereichs überdecken; Pixel im Fenster, für die keine Quelldaten vorliegen, erhalten die Hintergrundfarbe. Prüfen Sie Fensterkoordinaten, Pufferursprung und Stride gemeinsam, statt Puffer und Fenster als identisch anzunehmen.

Das UI-Framework erzeugt geänderte Pixel; der Display-Treiber und -Controller liefern sie an das Panel. Der passende Pfad hängt vom Panel ab:

- Ein SPI-/QSPI- oder 8080-Treiber setzt üblicherweise ein Panel-Fenster und überträgt nur den geänderten Bereich.
- Ein Controller, der einen Framebuffer abtastet, entnimmt Pixeldaten gemäß dem Display-Timing aus dem Speicher.
- Ein TurboPixel-fähiger Pfad liest die komprimierte finale Bitmap und dekomprimiert sie in der Display-Controller-Stufe.

In einem LVGL-Design bildet der Display-Flush-Callback die Grenze zwischen Rendering und Ausgabe. Er sollte den aktualisierten Bereich berücksichtigen, die passende DMA- oder Controller-Operation starten und den Abschluss erst melden, wenn das Framework den Zeichenpuffer sicher wiederverwenden kann. Legen Sie die Regeln zur Cache-Bereinigung (clean) und -Invalidierung (invalidate) ausdrücklich fest, sobald CPU und Hardware Puffer gemeinsam nutzen.

Die Pufferzuständigkeit muss dem tatsächlichen Übertragungspfad folgen. Bei der Übertragung in den Panelspeicher geben Sie den Zeichenpuffer erst frei, nachdem die Hardware ihn gelesen hat. Bei kontinuierlichem Scanout gibt ein Frame-Interrupt allein den aktiven Framebuffer nicht frei. Warten Sie auf den bestätigten Pufferwechsel, nach dem der Controller den alten Puffer nicht mehr liest. Übertragungsabschluss und sichtbare Aktualisierung sind getrennte Ereignisse; verwenden Sie bei Bedarf das TE-Signal oder das Frame-Timing des Panels, um Tearing zu vermeiden.

Bei cachebarem gemeinsam genutztem Speicher bereinigen Sie den Cache der von der CPU geschriebenen Quelldaten, bevor die Hardware sie liest. Bereiten Sie vor einem Hardware-Schreibzugriff den Zielpuffer nach den Cache-Regeln der Plattform vor, damit später zurückgeschriebene geänderte Cache-Lines das Ergebnis nicht überschreiben. Nach Abschluss des Hardwarezugriffs invalidieren Sie den Zielbereich, bevor die CPU ihn liest. Beachten Sie die Ausrichtung und Zuständigkeit für Cache-Lines, auch bei benachbarten Daten in derselben Cache-Line.

<div align="center"><em>Entscheidungen zum Display-Pfad</em></div>

<div align="center" markdown>

| Entscheidung | Zu validierende Richtung |
|:---|:---|
| Übertragungsbereich | Übertragen Sie nur geänderte Bereiche, sofern Panel und Treiber dies unterstützen. |
| Pufferung | Wählen Sie Teil-, Vollbild-, Einzel- oder Doppelpufferung anhand der Latenz- und Speicheranforderungen. |
| Synchronisation | Geben Sie Puffer erst frei oder verwenden Sie sie wieder, wenn die Hardware sie nicht mehr liest. Bestätigen Sie bei kontinuierlichem Scanout den Pufferwechsel. |
| Pixelformat | Stimmen Sie Panel, Treiber, Renderer und Beschleunigerpfad aufeinander ab, um Formatkonvertierungen im zeitkritischen Pfad zu vermeiden. |
| Cache | Bereinigen Sie von der CPU beschriebene Puffer vor dem Hardware-Lesezugriff (clean). Invalidieren Sie von der Hardware beschriebene Puffer vor dem CPU-Lesezugriff (invalidate). |

</div>

## Teilaktualisierung und geänderte Bereiche { #partial-refresh-and-dirty-regions }

Teilweises Rendering und teilweise Übertragung an das Panel sind unterschiedliche Optimierungen. Ein kontinuierlicher RGB/DPI- oder DSI-Videostrom kann weiterhin das gesamte Bild übertragen, obwohl nur ein kleiner Speicherbereich verändert wurde. Prüfen Sie bei EPD die unterstützten Ansteuerungswellenformen, Temperaturabhängigkeit, Nachbilder und erforderlichen Vollbildaktualisierungsintervalle. Ein kleinerer Aktualisierungsbereich ist nicht automatisch zulässig.

Die meisten eingebetteten UIs müssen nicht in jedem Frame den gesamten Bildschirm neu zeichnen. LVGL verfolgt ungültig gewordene Bereiche, und der Treiber kann nur die geänderten Bereiche an das Panel übertragen. Das ist besonders bei SPI/QSPI-Panels, batteriebetriebenen Wearables, statischen Seiten mit wenigen wechselnden Werten sowie EPD- und JDI-Displays nützlich.

Eine vollständige Bildschirmaktualisierung ist bei animationsreichen Bildschirmen, Übergängen oder Panels sinnvoll, die naturgemäß aus einem vollständigen Framebuffer scannen. Die Wahl hängt von der Bandbreite der Display-Schnittstelle, dem Panel-Verhalten und dem Speicherbudget ab – nicht nur von der Einstellung des UI-Frameworks.

## Ablauf der Panel-Inbetriebnahme { #panel-bring-up-sequence }

Nehmen Sie das Panel schrittweise in Betrieb, bevor Sie Widgets oder Anwendungsverhalten debuggen:

1. Prüfen Sie Versorgungsschienen, Reset-Timing, Backlight-/Enable-Pins und die grundlegende Stromaufnahme.
2. Senden Sie die Initialisierungssequenz des Panel-Herstellers exakt wie geliefert.
3. Zeigen Sie einfarbige Testbilder an, um Byte-Reihenfolge, Pixelformat und Fehler in der Schnittstellenverdrahtung zu erkennen.
4. Zeichnen Sie einfache geometrische Muster, um Stride, Fensteradressierung und Koordinaten zu prüfen.
5. Fügen Sie Bilder und Text hinzu, um Farbkonvertierung, Schriftarten und die Platzierung der Ressourcen zu prüfen.
6. Aktivieren Sie Teilaktualisierung, DMA, TurboPixel und Grafikbeschleunigung nacheinander.
7. Testen Sie Schlafmodus, Display-Aus, Aufwachen und Reinitialisierungspfade.

Validieren Sie zuerst einfarbige Bilder und Muster mit einer Minimalkonfiguration der vorgesehenen Panelschnittstelle. Wiederholen Sie diese Tests nach dem Hinzufügen von DMA, Kompression oder Beschleunigung über jeden neuen Pfad, bevor Sie die vollständige LVGL-UI testen.

## Isolierung von Fehlern im Display-Pfad { #isolate-display-path-failures }

Behandeln Sie jede Stufe als separate Grenze. Das vermeidet, Panel-Befehle, LVGL-Code, Pufferplatzierung und DMA-Einstellungen gleichzeitig zu ändern – ein Vorgehen, das einen Display-Fehler schwerer reproduzierbar macht.

<div align="center"><em>Diagnosematrix für den Display-Pfad</em></div>

<div align="center" markdown>

| Symptom | Zuerst zu prüfende Grenze | Gezielter Test | Wahrscheinliche Ursachenklasse |
|:---|:---|:---|:---|
| Panel bleibt leer | Stromversorgung, Reset und Panel-Initialisierung | Versorgungsschienen und Reset messen, die Initialisierung des Herstellers ausführen und ein einfarbiges Testbild anzeigen. | Einschaltsequenz, Reset-Polarität, Initialisierungsbefehle oder physische Verbindung der Schnittstelle. |
| Einfarbige Testbilder funktionieren, aber die Farben stimmen nicht | Pixelformat zwischen Renderer und Panel | Testbalken in Rot, Grün, Blau, Schwarz und Weiß anzeigen. | RGB-/BGR-Reihenfolge, Byte-Reihenfolge, Farbtiefe oder Formatkonvertierung. |
| Bild ist verschoben, abgeschnitten oder zeigt Tearing | Adressierung und Synchronisation | Ein Raster zeichnen, dann einen festen Aktualisierungsbereich wiederholt testen. | Fensterkoordinaten, Stride, Panel-Timing, Pufferwiederverwendung oder unvollständige DMA-Synchronisation. |
| Statische UI funktioniert, aber Animationen ruckeln | Rendering-, Übertragungs- und Speicherpfad | Renderzeit und Dauer bis zum Flush-Abschluss getrennt messen. | Zu große Neuzeichnungsbereiche, PSRAM-Konkurrenz, langsame Schnittstelle oder ungeeignete Pufferstrategie. |
| Artefakte treten nur nach Schlaf/Aufwachen auf | Übergang des Stromzustands | Test mit einfarbigen Bildern und Raster nach jedem unterstützten Display-Aus- und Aufwach-Pfad erneut ausführen. | Verlorener Panel-Zustand, ausgelassener Reset/Init, Versorgungssequenzierung oder veralteter Cache-/Pufferzustand. |
| Ein Feature schlägt nur bei Aktivierung fehl | Spezifischer optionaler Pfad | DMA, Teilaktualisierung, ePicasso oder TurboPixel einzeln aktivieren. | Nicht unterstützte Konfiguration, Ausrichtungs-/Cache-Regel oder Treiberintegrationsfehler. |

</div>

## Panel-spezifische Hinweise { #panel-specific-guidance }

### SPI- und QSPI-AMOLED/TFT { #spi-and-qspi-amoledtft }

Bevorzugen Sie Teilaktualisierungen, verwenden Sie RGB565, sofern geeignet, und halten Sie Animationsbereiche klein. Lösen Sie bei kleinen Änderungen keine Vollbildneuzeichnung aus; rendern und komponieren Sie den geänderten Bereich vor der Übertragung.

### RGB-/DPI-Panels { #rgb-dpi-panels }

Planen Sie die kontinuierliche Scanout-Bandbreite zusammen mit CPU-, ePicasso-, DMA- und anderem Speicherverkehr ein. Wählen Sie eine Framebuffer-Strategie für die erforderliche Aktualisierungsrate, ziehen Sie Doppelpufferung in Betracht, sofern der Speicher dies erlaubt, und berücksichtigen Sie Timing sowie Signalintegrität im PCB-Design.

### MIPI-DSI-Panels { #mipi-dsi-panels }

Wählen Sie den Panel-Modus, bevor Sie sich auf das Bauteil festlegen. **SF32LB55x unterstützt nur den MIPI-DSI-Kommandomodus**, sodass der Panel-Controller internes SRAM/GRAM zum Halten des aktualisierten Bilds bereitstellen muss. **SF32LB58x unterstützt sowohl Kommando- als auch Videomodus**: Kommandomodus-Panels benötigen Controller-RAM, während der Videomodus einen RAM-losen Panel-Controller aus dem kontinuierlichen Pixelstrom ansteuern kann. Validieren Sie die Initialisierung frühzeitig, testen Sie Energiesparzustände und Aufwach-Timing und halten Sie die erforderliche Datenrate unter dem nutzbaren Schnittstellendurchsatz. Berücksichtigen Sie dabei Protokoll-Overhead, Timing-Vorgaben und weiteren Speicherverkehr.

### EPD-Displays { #epd-displays }

Legen Sie EPD auf seltene Aktualisierungen aus und verwenden Sie Teilaktualisierungsmodi nur, wenn sie unterstützt und visuell akzeptabel sind. Vermeiden Sie Annahmen zu Animationen und planen Sie die Anforderungen an Display-PMIC, VCOM und Ansteuerungswellenform ein.

### JDI-Schnittstellen und Memory-in-Pixel-Panels { #jdi-memory-in-pixel-displays }

JDI bezeichnet hier serielle oder parallele Panel-Schnittstellenmodi; Memory-in-Pixel ist eine Paneltechnologie. In manchen Energiespar-Displaydesigns treten sie gemeinsam auf, die Begriffe sind jedoch nicht austauschbar. Nutzen Sie bei einem MIP-Panel kleine Aktualisierungsbereiche und ein geeignetes UI-Layout, um den gespeicherten Pixelzustand bei versorgtem Panel auszunutzen. Das bedeutet weder nichtflüchtige Bildspeicherung noch einen Standby-Verbrauch des Gesamtsystems von null. Beachten Sie COM-Inversion und weitere Wartungsvorgänge gemäß Datenblatt des konkreten Panels. Messen Sie anschließend Aktualisierungsverhalten, Lesbarkeit im Freien und Leistungsaufnahme unter Produktbedingungen.

## Checkliste für die Produktionsübergabe { #production-handoff-checklist }

Bevor Sie den Display-Pfad als abgeschlossen betrachten, dokumentieren Sie die Entscheidungen, die ein anderer Ingenieur reproduzieren muss:

- Genaues SF32-Gerät, Gehäuse, SDK-Version, Board-Revision, Panel-Teilenummer und Panel-Controller-Revision.
- Schnittstellenmodus, Pin-Zuordnung, Pixelformat, Byte-/Farbreihenfolge, angestrebtes Aktualisierungsverhalten und Quelle der Panel-Initialisierung.
- Speicherorte, Größen, Ausrichtung von Zeichenpuffer und Framebuffer, Zuständigkeit für Cache-Wartung und DMA-/Controller-Abschlusssignal.
- Richtlinie zur Teilaktualisierung, Panel-Fenster-Regeln und alle Bereiche, die gemeinsam aktualisiert werden müssen, um Artefakte zu vermeiden.
- Gemessene Render-Zeit, Übertragungszeit, Spitzen-/Durchschnitts-PSRAM-Verkehr, sofern relevant, und Stromaufnahme für repräsentative UI-Zustände.
- Testergebnisse für Schlaf, Display-Aus, Aufwachen und Wiederherstellung, einschließlich des Verhaltens nach einer fehlgeschlagenen oder unterbrochenen Übertragung.

Diese Aufzeichnung macht die Display-Unterstützung von einem einmaligen Inbetriebnahmeergebnis zu einer wiederholbaren Produktintegration. Validieren Sie sie erneut, wann immer sich Panel, SDK, Speicherlayout, Pixelformat oder Display-Treiber ändern.

## Wichtige Erkenntnisse { #key-takeaways }

- Der Display-Controller ist für die Panel-Ausgabe zuständig; er ist getrennt von der Pixelzusammensetzung von ePicasso und der Asset-Dekompression von eZip.
- Die Schnittstellenwahl bestimmt einen Großteil von Bandbreite, Puffer, Stromverbrauch, Pins und PCB-Design.
- Behandeln Sie den Flush- bzw. Übertragungspfad, die Synchronisation, Cache-Wartung und Panel-Initialisierung als zentrale Firmware-Aufgaben.
- Validieren Sie das Panel mit einfachen Mustern, bevor Sie höherstufige UI-, DMA-, TurboPixel- oder Beschleunigungsfunktionen aktivieren.
- Grenzen Sie Fehler entlang des Display-Pfads Schritt für Schritt ein und dokumentieren Sie die geprüfte Konfiguration und Messwerte für die Produktionsübergabe.
