---
icon: lucide/layout-dashboard
title: "LVGL-SDK-Beispiele"
description: "Wählen Sie das richtige SiFli-SDK-LVGL-Beispiel für die Inbetriebnahme von Displays und UI, Widgets, Design-Tools, komprimierte Assets, Animation, Medien und Wearable-Oberflächen."
tags:
  - Grafik
  - LVGL
  - Beispiele
---

# LVGL-SDK-Beispiele { #lvgl-sdk-examples }

Die LVGL-Beispiele des SiFli-SDK sind Ausgangspunkte zur Prüfung von Display und UI, keine austauschbaren Produktvorlagen. Prüfen Sie zunächst Panel und Eingabe mit einer Demo der passenden Version. Wählen Sie anschließend ein Beispiel für das größte Integrationsrisiko des Produkts, führen Sie es unverändert mit einer dokumentierten Board-Konfiguration aus und ersetzen Sie dann jeweils eine Schicht. Prüfen Sie den Verifizierungsstatus und die Einschränkungen der jeweiligen README, bevor Sie das Beispiel als funktionierende Referenz verwenden.

Dieser Leitfaden ordnet die Beispiele im [SiFli-SDK-LVGL-Index](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) nach dem technischen Ziel. Auf der offiziellen Quellseite finden Sie die aktuell unterstützten Boards, die SDK-Konfiguration, Quellpfade, Assets, Build-Befehle und versionsspezifischen Einschränkungen.

Der Index ist ein Katalog, keine Kompatibilitätsmatrix für Boards. Die Unterstützung gilt jeweils für das einzelne Beispiel; ein Familienname in der Dokumentations-URL belegt keine Unterstützung dieser Familie. Maßgeblich ist der Abschnitt **Supported Boards** im jeweiligen Beispiel. Ein allgemeiner Build-Befehl oder ein Board in der Build-Matrix des Repositories belegt für sich genommen keine Laufzeitvalidierung. Weichen die Quellen voneinander ab, halten Sie den Unterschied fest und prüfen Sie die genaue SDK-Revision und das Board.

## Mit einer passenden LVGL-Referenz beginnen { #start-with-the-right-lvgl-baseline }

<div align="center"><em>Tabelle: SiFli-SDK-LVGL-Beispiele nach technischer Aufgabe</em></div>

<div align="center" markdown>

| Technisches Ziel | Beispiel | Was sich damit prüfen lässt | Weiter, wenn |
|:-----------------|:-----------|:----------------------------|:-------------|
| Eine Standard-LVGL-Anwendung in Betrieb nehmen | **[LVGL-v8-Demos](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_demos/README.html)**, **[Offizielle LVGL-v8-Beispiele](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_examples/README.html)**, **[LVGL-v9-Demo](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_demos/README.html)** oder **[Offizielle LVGL-v9-Beispiele](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_examples/README.html)** | Die gewählte LVGL-Version, den Display-Treiber des Boards, die Rendering-Schleife und grundlegende Widgets | Der Display-Flush-Pfad und das Eingabegerät auf dem tatsächlichen Panel stabil sind |
| Einen UI-Design-Workflow bewerten | Beispiele für **[gui_guider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/NXP_GUI_guider/README.html)**, **[SquareLine](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/Square_Line/README.html)** oder **[EEZ Studio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/eez_studio/README.html)** | Wie sich generierter UI-Code in ein SDK-Projekt integrieren lässt | Der generierte Code fehlerfrei baut und dieselbe LVGL-Version wie das Projekt verwendet |
| Gezieltes UI-Verhalten prototypisieren | **[Basechart](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_basechart/README.html)**, **[Baselabel](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_baselabel/README.html)**, **[Follow](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_follow/README.html)**, **[Imgarray](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgarray/README.html)**, **[Imgbar](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgbar/README.html)**, **[Mulroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_mulroller/README.html)**, **[Multanim](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multanim/README.html)**, **[Multlist](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multlist/README.html)**, **[Multroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multroller/README.html)**, **[Multslider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multslider/README.html)**, **[Sector](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_sector/README.html)**, **[Select](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_select/README.html)** oder **[Timeline](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_timeline/README.html)** | Ein bestimmtes Interaktions-, Widget-, Layout- oder Animationsmuster | Das Produkt eine zusammengesetzte Oberfläche statt eines einzelnen Anzeigeelements benötigt |
| Assets, Animation oder Medien validieren | **[Dynamisches Laden von eZip v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip_v9/README.html)**, **[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html)**, **[Lokale Videowiedergabe](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html)** oder **[Streaming-Wiedergabe](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html)** | Den Speicher-, Dekodier-, Rendering- und Aktualisierungspfad für reichhaltigere Inhalte | Asset-Größe, Speicherplatzierung, Aktualisierungsrate und Leistungsaufnahme auf der Zielhardware gemessen sind und die Produktgrenzen einhalten |
| Eine repräsentative UI mit vollständigem Ablauf aufbauen | **[Elektronischer Kompass](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/compass/README.html)**, **[Spieleindex](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/games/index.html)** ([Minesweeper-README](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/lvgl/games/minesweeper/README.html)) oder **[Smartwatch-Oberfläche v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch_v9/README.html)** | Bildschirmablauf, Interaktion und eine Grafiklast mit mehreren Funktionen | Produktspezifische Daten, Lebenszyklusverhalten und Leistungsgrenzen den Demo-Inhalt ersetzen können |

</div>

Die Board-Listen unterscheiden sich je nach Beispiel. Die README der v8-Demos nennt `eh-lb563` sowie die SF32LB52x-, SF32LB56x- und SF32LB58x-LCD-Serien. Die README der offiziellen v8-Beispiele nennt `sf32lb52-lchspi-ulp` und dieselben drei LCD-Serien. Die README der v9-Demo nennt die drei LCD-Serien; in den allgemeinen Build-Anweisungen erscheint zusätzlich `eh-lb563`, das jedoch nicht in der expliziten Liste **Supported Development Boards** steht. Die README der offiziellen v9-Beispiele nennt `sf32lb52-lchspi-ulp` und die drei LCD-Serien. Betrachten Sie die explizite Liste der jeweiligen README als dokumentierten Umfang; leiten Sie aus einem allgemeinen Build-Beispiel kein zusätzliches Zielboard ab.

## Zuerst den Integrationsumfang klären { #confirm-the-integration-boundary-first }

Klären Sie vor der Anpassung eines LVGL-Beispiels, welche Bereiche es bereits abdeckt und was für das Produkt noch entwickelt und geprüft werden muss:

<div align="center"><em>Tabelle: Integrationsgrenzen der LVGL-Beispiele</em></div>

<div align="center" markdown>

| Bereich | Was das Beispiel abdeckt | Was für das Produkt noch zu prüfen ist |
|:---------|:--------------------------|:--------------------------------|
| Board und Panel | Eine bekannte SDK-Board-Konfiguration und ein Display-Signalweg | Konkretes Panel, Touch-Controller, Einschaltsequenz, Pin-Multiplexing, Reset-Timing und Produktionstest |
| LVGL | Versionsspezifische Initialisierung und UI-Verhalten des Beispiels | Bildschirmarchitektur, Event-Zuständigkeit, Speichergrenzen und Aktualisierungsrichtlinie des Produkts |
| Assets | Einen unterstützten Asset-Pfad des Beispiels | Asset-Format, Speicherbedarf, Ladezeit, Cache-Richtlinie, Lizenzierung und Fehlerbehandlung |
| Rendering | Eine funktionierende Zeichen- und Flush-Schleife | Strategie für geänderte Bereiche, Pufferanzahl, Farbformat, DMA-/Cache-Handhabung und UI-Reaktionsfähigkeit unter Last |
| Anwendung | Sichtbares Verhalten der Demo | Sensoren, Bluetooth, Speicher, Zeitverwaltung, Low-Power-Übergänge, Wiederherstellung und Nutzerdaten |

</div>

Prüfen Sie zuerst das physische Display, seine Schnittstelle und den grundlegenden Flush-Pfad. Lesen Sie auch die [Grafikübersicht](overview.md) und den [Display-Controller](display-controller.md); eine LVGL-Demo allein belegt nicht, dass die endgültige Grafikarchitektur einsatzbereit ist.

## Die LVGL-Version bewusst wählen { #choose-the-lvgl-version-deliberately }

Der offizielle Index enthält sowohl LVGL-v8- als auch LVGL-v9-Beispiele. Halten Sie ein generiertes UI-Projekt, dessen Beispielbasis und die SDK-Konfiguration auf derselben LVGL-Hauptversion. Übernehmen Sie keinen generierten Bildschirm oder ein benutzerdefiniertes Widget von einer Hauptversion in eine andere ohne eine ausdrückliche Portierungsprüfung.

Verwenden Sie zur ersten Inbetriebnahme des Boards die Demo oder das offizielle Beispiel, das zur in der SDK-Board-Konfiguration gewählten LVGL-Version passt. Damit lassen sich Panel, Puffer, Eingabe und Scheduling-Pfad zuverlässig prüfen, bevor die anwendungsspezifische Entwicklung beginnt.

!!! warning "Karte vor Verwendung des LVGL-v8-SJPG-Beispiels sichern"
    Im Projekt der offiziellen v8-Beispiele ruft der optionale Pfad zum Laden von SJPG-Dateien von einer TF-Karte bei fehlgeschlagenem Mount `dfs_mkfs()` für den Root-Bereich der Karte auf; dabei können Daten gelöscht werden. Sichern Sie die Karte, bevor Sie diesen Pfad aktivieren und ausführen, und prüfen Sie den Code Ihrer SDK-Revision. Verallgemeinern Sie diese Warnung nicht auf alle LVGL-v8- oder v9-Beispiele; prüfen Sie Mount- und Formatierverhalten für jedes Projekt einzeln.

## Generierte UI: gui_guider, SquareLine und EEZ Studio { #generated-ui-gui_guider-squareline-and-eez-studio }

Verwenden Sie ein Beispiel für ein UI-Design-Tool, wenn das Team einen visuellen Editor benötigt, um eine Bildschirmhierarchie, Stile und Assets zu erzeugen. Der Index enthält Beispiele für **gui_guider**, **SquareLine** und **EEZ Studio**.

Prüfen Sie vor dem Import der Generatorausgabe in das Produkt die Version des generierten Codes, die Bildschirmauflösung, Farbtiefe, Ressourcenpfade und Zuständigkeit für Callbacks.

Die Quellbeispiele für gui_guider und EEZ Studio geben beide LVGL v8 vor. SquareLine benötigt auch das vom generierten Code verwendete Standardthema. Nehmen Sie generierte Unterverzeichnisse in den Build auf und folgen Sie den dokumentierten optionalen eZip-Konvertierungsschritten; bloßes Kopieren reicht nicht aus.

Generierter Code beschleunigt den UI-Aufbau, ersetzt aber weder Display-Treiber noch Pufferplanung, Eingabetreiber, Energiesparstrategie oder Integrationstests. Trennen Sie generierte Dateien von der handgeschriebenen Anwendungslogik, damit ein erneuter Export keine produktspezifischen Änderungen unbemerkt überschreibt.

## Widget- und Interaktionsmuster { #widget-and-interaction-patterns }

Nutzen Sie die gezielten LVGL-v8-Beispiele für einzelne UI-Funktionen. Ihr Umfang ist unterschiedlich: Multlist ist eine vollständige Anwendung mit Framework, kein minimaler Widget-Test.

- **Basechart** zeichnet Datenreihen; **Baselabel** verbindet Datenquellen mit periodisch aktualisiertem Text.
- **Follow** zeigt ein schwerkraftgesteuertes Symbolmenü; **Select** zeigt Auswahlzustände; **Sector** bildet Werte auf einen sichtbaren Winkelsektor eines Bildes ab.
- **Imgarray** setzt Zahlenanzeigen aus Bildzeichen zusammen; **Imgbar** beschneidet ein Vordergrundbild zur Fortschrittsanzeige.
- **Mulroller** ist ein über Callbacks anpassbarer Auswahlroller; **Multroller** bietet eine einfachere Auswahl zwischen Textoptionen.
- **Multlist** behandelt Listen, Seitenwechsel, Übergänge, Ressourcen-Caching und den Seitenlebenszyklus; **Multslider** zeigt einen Wert oder kurzen Text auf dem Schiebereglerknopf.
- **Multanim** zeigt Übergangseffekte, teils abhängig von GPU/VGLite-Unterstützung; **Timeline** koordiniert Animationen auf einer gemeinsamen Zeitachse.

Die Board-Unterstützung ist bei diesen Beispielen nicht einheitlich. So nennen die expliziten Listen **Supported Boards** von Multanim und Multlist `sf32lb52-lcd_n16r8` und `sf32lb52-lchspi-ulp`, während spätere allgemeine Build-Anweisungen weiter gefasste 52x-/56x-/58x-Ziele erwähnen und `eh-lb563` als Build-Beispiel verwenden. Diese Angaben haben nicht denselben Geltungsbereich. Prüfen Sie die jeweilige README und die aktuelle Projektkonfiguration; leiten Sie aus Index oder URL keine Kompatibilität der anderen Widgets ab.

Nutzen Sie eines dieser Beispiele, wenn ein bestimmtes Steuerelement ein Risiko für Ihr Produkt darstellt. Halten Sie die erste Portierung klein: Führen Sie das Original-Steuerelement aus, setzen Sie Produktdaten ein und messen Sie Neuzeichnungsaufwand sowie Speicherbedarf, bevor Sie es in eine größere Oberfläche integrieren. Auch mehrere visuell einfache Steuerelemente können den Framebuffer, die Bandbreite beim Lesen von Grafikressourcen oder die zeitliche Planung der Eingabeverarbeitung stark belasten.

## Arbeitslasten mit Assets, Animationen und Medien { #asset-animation-and-media-workloads }

Die Dynamic-eZip-Beispiele sind sowohl für LVGL v8 als auch LVGL v9 verfügbar. Verwenden Sie die zur Anwendung passende Version, um das dynamische Laden komprimierter Assets zu validieren, bevor Sie es breit einsetzen. Der Artikel [eZip](ezip.md) erklärt die Rolle der Asset-Kompression in der Grafik-Pipeline.

Für animierte GIF/APNG-Ressourcen bietet SiFli außerdem die Beispiele [AGIF/APNG + LVGL v8](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl/README.html) und [AGIF/APNG + LVGL v9](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl_v9/README.html) unter **Multimedia > AGIF**. Beide READMEs nennen `eh-lb525`; die aktuelle [GCC-Build-Matrix](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) registriert außerdem beide Projektpfade unter `devkit_lcd_boards`. Ein Eintrag in der Matrix weist auf ein Build-Ziel hin, nicht auf eine Laufzeitvalidierung für jedes Board dieser Gruppe. Prüfen Sie das genaue Zielboard und die SDK-Revision, bevor Sie eines der Beispiele als Produktbasis verwenden.

Die dynamischen eZip-Beispiele vergleichen den Zugriff über Dateipfade mit dem Vorladen in SRAM oder PSRAM. Vorladen benötigt zusätzlichen Speicher und kann wiederholte Dateizugriffe reduzieren. Erzeugen Sie Ressourcen für die passende LVGL-Version v8/v9. Der dokumentierte v9-Pfad benötigt anders als v8 einen Laufwerkspräfix wie `A:/`. Prüfen Sie Speicher-Backend und Laufwerksbuchstaben. Die v9-README nennt ausdrücklich `sf32lb52-lcd_n16r8`, `sf32lb52-lcd_a128r16`, `sf32lb52-lchspi-ulp`, `sf32lb52-core_e8r16`, `sf32lb56-lcd_a128r12n1`, `sf32lb56-lcd_n16r12n1`, `sf32lb58-lcd_n16r32n1_dsi`, `sf32lb58-lcd_a128r32n1_qspi` und `sf32lb58-lcd_n16r32n1_qspi`; übertragen Sie diese Liste nicht auf v8 und leiten Sie daraus keine Unterstützung anderer Boards ab. Nur für SF32LB57 verlangt die eZip-Dokumentation die Konvertierungsoption `-winsize 2048`.

[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html), [lokale Videowiedergabe](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html) und [Streaming-Wiedergabe](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html) prüfen unterschiedliche Inhaltspfade, keine festgelegte Komplexitätsrangfolge. Die Lottie-README kennzeichnet das Beispiel als **nicht verifiziert**, nennt `eh-lb563` sowie die Serien SF32LB52x/SF32LB56x, und der aktuelle GCC-Build-Matrixeintrag für das Projekt ist auskommentiert. Betrachten Sie die Board-Liste daher als nicht verifizierte Dokumentation, nicht als validierte Zielliste. Die README zur lokalen Videowiedergabe nennt ausdrücklich `eh-lb523` und `sf32lb52-lcd_n16r8`, enthält aber auch allgemeinere Build-Anweisungen; der Projekteinstieg ist in der aktuellen GCC-Build-Matrix auskommentiert. Prüfen Sie den genauen SDK-Stand, bevor Sie diese Angaben auf ein anderes Ziel übertragen. Das Beispiel spielt H.264-Video aus `disk/video_example.mp4` ab; wird eine TF-Karte erfolgreich eingebunden, liest es zuerst `video_example.mp4` im Karten-Root. Die Streaming-README nennt nur `sf32lb52-lchspi-ulp`; sie nutzt für den Netzwerkzugang Bluetooth-PAN-Tethering eines Smartphones und FFmpeg. Es ist kein Beispiel für Video-Streaming über BLE.

Bewerten Sie jedes Beispiel als Systemlast. Messen Sie bei aktiven Bluetooth-Verbindungen, Sensoren und der vorgesehenen Display-Schnittstelle den Speicherbedarf für Ressourcen oder Streams, die Dekodierzeit, Bildaktualisierungsrate, PSRAM-/SRAM-Nutzung, Display-Bandbreite und Stromaufnahme. Der tatsächliche Aufwand hängt von Inhalt, Auflösung, Dekoderkonfiguration und Pufferung ab.

Eine kurze, flüssige Demo belegt nicht, dass der Pfad eine lang andauernde Animation zuverlässig ausführen kann. Validieren Sie das Produkt mit realistischen Inhaltsdauern und der tatsächlich vorgesehenen Panel-Aktualisierungsrichtlinie.

## Schriftarten und Sprachwechsel zur Laufzeit { #fonts-and-runtime-language-switching }

Das [FreeType-Beispiel](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_freetype/README.html) lädt TrueType-Schriften aus dem Dateisystem und wechselt Schrift und Größe zur Laufzeit. Laut README wurde es auf `sf32lb52-lchspi-ulp` verifiziert; andere Boards benötigen eine `FS_REGION`-Partition und ausreichend System-Heap und gelten daher nicht als durch dieses Beispiel verifiziert. Es zeigt den Rückfall auf eine integrierte Schrift bei Ladefehlern, Heap-Prüfungen und die Freigabe der vorherigen Schrift beim Wechsel. Prüfen Sie Zeichenabdeckung und Heap-Bedarf für die tatsächlichen Sprachen und Größen; reduzieren Sie große CJK-Schriften auf die benötigten Zeichen, statt anzunehmen, dass die gesamte Schrift hineinpasst. Der dokumentierte Pfad benötigt TrueType-Konturen, keine CFF-basierten OpenType-Schriften. Solange Widgets oder Styles eine Schrift referenzieren, darf sie nicht freigegeben werden. Schriftwechsel müssen im LVGL-Thread erfolgen. Bei geänderten mitgelieferten Schriften müssen Sie das Dateisystemabbild `fs_root.bin` neu erzeugen und flashen; ein reines Anwendungsupdate ersetzt diese Dateien nicht.

Die mehrsprachigen Beispiele für [LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v8/README.html) und [LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v9/README.html) behandeln integrierte Sprachen, externe Sprachpakete, Laufzeitwechsel, erneutes Durchsuchen des Installationsverzeichnisses und die Speicherung der Sprachauswahl über `share_prefs`. Die v8-README nennt `sf32lb52-lchspi-ulp`; prüfen Sie die Zielliste der v9-README separat, statt das Board ungeprüft zu übernehmen. JSON- oder XLSX-Eingaben erzeugen einkompilierte Sprachressourcen oder externe Binärpakete. Verwenden Sie dieselben Übersetzungsschlüssel für alle Sprachen und prüfen Sie die Zeichenabdeckung der Schriften. Testen Sie Wechsel, Neustart-Persistenz, fehlende Ressourcen und das Dateisystemupdate. Folgen Sie den je Version dokumentierten Pfaden und Konfigurationen; nehmen Sie nicht allein aufgrund des gleichen Funktionsnamens an, dass sie identisch sind.

## Kompass, Spiele und Smartwatch-Oberflächen { #compass-games-and-watch-interfaces }

Elektronischer Kompass und Smartwatch-Oberflächen verbinden Anzeigeverhalten mit Anwendungsfunktionen. Untersuchen Sie daran Bildschirmaufbau, Eingabe- und Animationszeiten sowie die Folgen höherer Grafiklast. Der Spieleindex verlinkt auf ein Minesweeper-Beispiel. Dessen README nennt `eh-lb563` sowie die Serien SF32LB52x/56x, aber nicht 58x. Prüfen Sie vor dem Einsatz auf 58x die Unterstützung im aktuellen SDK-Quellstand.

Das dokumentierte Kompass-Beispiel verwendet ein MMC56x3-Dreiachs-Magnetometer über I2C auf `sf32lb52-lchspi-ulp`. Prüfen Sie Treiber, Verdrahtung und Kalibrierung für das tatsächliche Produkt; die angezeigte Richtung allein belegt keine Messgenauigkeit.

Spiele und Smartwatch-Oberflächen sind Ausgangspunkte für die Bildschirmnavigation. Für das Produkt müssen dennoch Datenverwaltung, Low-Power-Verhalten, Display-Aufweckstrategie, Benachrichtigungen und Wiederherstellung nach Fehlern festgelegt werden.

Die v8-Smartwatch-README nennt die SF32LB52x-, SF32LB56x- und SF32LB58x-LCD-Serien sowie `sf32lb52-lchspi-ulp`; die v9-README nennt die drei LCD-Serien. Beide schließen `520-hdk` aus und kennzeichnen die 3D-Rotationsdemo auf SF32LB55x als nicht verfügbar. Prüfen Sie beim Hinzufügen von Schriften die Ressourcenpartitionen; im v8-Beispiel kann der zugewiesene Schriftbereich überlaufen.

## Beispiele mit nachvollziehbaren Prüfergebnissen anpassen { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>Tabelle: Produktanpassungsprüfungen für LVGL-Beispiele</em></div>

<div align="center" markdown>

| Schritt | Zu bewahrender Beleg | Warum es wichtig ist |
|:-----|:-----------------|:---------------|
| Das Original bauen | SDK-Revision, Board-Name, Konfiguration und Build-Log | Bewahrt eine nachweislich funktionierende Referenz |
| Auf Hardware ausführen | Foto/Video, serielles Log, Panel- und Touch-Verhalten | Bestätigt den tatsächlichen Display- und Eingabepfad |
| Ein Produktelement hinzufügen | Änderungsprotokoll sowie Messwerte zur Bildrate und zum Aktualisierungsverhalten | Erleichtert es, Regressionen konkreten Änderungen zuzuordnen |
| Produktlast testen | UI-Reaktionsfähigkeit mit Bluetooth, Sensoren, Speicher und Low-Power-Übergängen | Zeigt Integrationsgrenzen auf, die eine eigenständige Demo nicht sichtbar macht |
| Endgültige Grenzen dokumentieren | Pufferverbrauch, Speicherplatzierung, Bildrate, Stromverbrauch und bekannte Fehler | Macht das Beispiel zu einer wartbaren technischen Referenz |

</div>

## Verwandte Ressourcen { #related-resources }

- [Grafikübersicht](overview.md) für Display-Auswahl, Framebuffer-Planung, LVGL-Integration und Systemkompromisse.
- [Display-Controller](display-controller.md) für Controller, Puffer und Flush-Pfad.
- [ePicasso](epicasso-gpu.md), [eZip](ezip.md) und [TurboPixel](turbopixel.md) für SF32-Grafikbeschleunigung und Kompressionsfunktionen.
- [Beispiele](../../develop/examples/index.md) für den domänenübergreifenden SDK-Beispielkatalog.
- [SiFli-SDK-LVGL-Beispielindex](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) für die aktuelle offizielle Liste und Einrichtungsdetails.
