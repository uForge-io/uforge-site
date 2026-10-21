---
icon: lucide/file-archive
description: "Wie SiFli eZip und eZip-A den Speicherbedarf für UI-Ressourcen, den Speicherverkehr und die CPU-Dekodierlast auf unterstützten SF32-Geräten senken."
tags:
  - Grafik
---

# eZip: verlustfreie Kompression und Hardware-Dekodierung { #ezip-lossless-compression-and-hardware-decoding }

## Einführung { #introduction }

**eZip** ist das proprietäre, verlustfreie Kompressionsformat von SiFli für Grafikressourcen. Auf SF32-Geräten, die die jeweiligen Funktionen unterstützen, dekodiert der EZIP-Hardwareblock eZip-Grafikressourcen. Er bietet außerdem separate GZIP- und LZ4-Modi für allgemeine Daten; die dekomprimierten Daten werden über AHB in den Speicher geschrieben und nicht direkt an EPIC ausgegeben. Statt jede Display-Ressource als unkomprimierte Bitmap in NOR-Flash, PSRAM oder einem Dateisystem abzulegen, kann das Produkt die eZip-Daten speichern und erst bei Bedarf für die UI dekodieren.

**eZip-A** ist das entsprechende Format für animierte Ressourcen. Die Quelldateien werden beim Build oder in der Ressourcenaufbereitung konvertiert. eZip ist kein allgemeiner Bilddekoder, der zur Laufzeit beliebige Dateien verarbeitet.

Für Nicht-Grafikdaten wie ein OTA-Image muss das Produkt den gesamten Update-Ablauf festlegen und prüfen. Dazu gehören Speicherung, Integritätsprüfung, Kompatibilität und der vorgesehene Dekompressionspfad. Der [Grafikablauf](overview.md#sf32-graphics-flow) gilt für Display-Ressourcen, nicht für den anwendungsspezifischen Update-Prozess.

Bei einem Grafikprodukt soll weniger Datenverkehr vom Speicher anfallen und die Anwendungs-CPU nicht wiederholt dieselben Ressourcen dekomprimieren müssen. So lassen sich Speicherbedarf und externe Speicherzugriffe reduzieren; zugleich bleibt mehr Rechen- und Bandbreitenreserve für UI, Bluetooth, Audio und andere Anwendungsaufgaben.

Zur Positionierung von eZip gegenüber ePicasso, TurboPixel und dem Display-Controller siehe [Grafikübersicht](overview.md#sf32-graphics-flow). Diese Seite konzentriert sich auf die eZip-Asset-Vorbereitung, das Kompressionsverhalten und die Dekodierung.

Lesen Sie diese Seite, wenn UI-Ressourcen zu viel Flash-Speicher belegen, zu viel externe Speicherbandbreite beanspruchen oder ein reproduzierbarer Konvertierungsprozess benötigt wird. Sie grenzt die verlustfreie Kompression der Quelldateien von der Kompression des finalen Framebuffers ab, die im Artikel [TurboPixel](turbopixel.md) behandelt wird.

## Fähigkeiten und Grenzen { #capabilities-and-boundaries }

eZip ist für eine durchgängige Ressourcenpipeline in der Produktentwicklung gedacht, nicht für die gelegentliche Dateikonvertierung:

- **Verlustfreie Grafikkompression.** Das Format erhält Bilddaten und Transparenz. SiFli beschreibt das typische Kompressionsverhältnis bei Grafiken als *leicht höher als bei PNG*, veröffentlicht aber keinen festen Zahlenwert.
- **Statische und animierte Ressourcen.** GraphicsTool kann PNG-, GIF- und APNG-Dateien in statische eZip-Ressourcen oder eZip-A-Animationen umwandeln.
- **Hardwaregestützte Dekodierung auf unterstützten Geräten.** Je nach Chip, SDK, Quellformat und Treiberpfad kann sie den Dekodieraufwand der Anwendungs-CPU verringern.
- **GraphicsTool-Workflow.** GraphicsTool von SiFli verarbeitet gängige Quellformate, ändert Bildgrößen, konvertiert und verarbeitet Bilder stapelweise und erzeugt eZip/eZip-A.
- **ePicasso-Anbindung auf unterstützten Geräten.** Die direkte Ausgabe kann einen Puffer für das vollständig dekodierte Quellbild einsparen und dadurch Pufferbedarf und Speicherverkehr senken.

„Verlustfrei“ bezieht sich auf die Kompression der Pixel, die der Encoder erhält, nicht auf sämtliche vorherigen Konvertierungsschritte. Skalierung, die Umwandlung von RGB888 in RGB565 oder das Entfernen von Alpha können bereits davor Informationen verlieren. Vergleichen Sie die dekodierten Pixel mit dem gleich großen Encoder-Eingabebild im selben Pixelformat und erhalten Sie Alpha, wenn Transparenz benötigt wird.

## Kompressionsverhältnis und allgemeine Verwendung { #compression-ratio-and-general-purpose-use }

Verwenden Sie PNG als praktische Referenz für Grafikressourcen. Laut SiFli ist das Kompressionsverhältnis von eZip etwas höher als das von PNG, wobei Bilddaten und Transparenz erhalten bleiben. Die tatsächliche Dateigrößenersparnis hängt jedoch von Bildabmessungen, Pixelformat, Transparenz, Palettennutzung und Detailgrad ab. Messen Sie repräsentative Ressourcen mit dem freigegebenen Konvertierungsprofil und planen Sie den Speicherbedarf nicht anhand eines einzelnen Prozentwerts.

Das SiFli-EZIP-Tool kann allgemeine Dateien auch mit GZIP oder LZ4 komprimieren. Das ist ein anderer Vorgang als die Umwandlung von Grafikressourcen in das eZip-Format. Das Kompressionsverhältnis allgemeiner Daten hängt von den Quelldaten ab: Wiederholende oder strukturierte Daten lassen sich möglicherweise gut komprimieren; bereits komprimierte Dateien wie JPEG-Bilder, MP4-Videos, ZIP-Archive oder verschlüsselte Daten werden dagegen unter Umständen kaum oder gar nicht kleiner. Prüfen Sie vor der Verwendung für Nicht-Grafikdaten die resultierende Dateigröße und den vom Zielgerät unterstützten Dekompressionsmodus.

Die EZIP-HAL unterscheidet die Betriebsarten Grafik-eZip, GZIP und LZ4. Die allgemeine GZIP/LZ4-Dekompression schreibt über AHB in den Speicher, nicht direkt an EPIC. Ein OTA-Archiv muss die vom gewählten Modus unterstützte Datenkapselung (Framing) und dessen Größenbeschränkungen einhalten; eine Grafikdatei im Format `.ezip` ist nicht mit einem beliebigen komprimierten Updatepaket austauschbar.

## Vergleich repräsentativer Bildgrößen (Vorlage) { #representative-image-size-comparison-placeholder }

Verwenden Sie diesen Abschnitt, um Messwerte für repräsentative **Bilder ohne Transparenz** und **UI-Bilder mit Alpha-Kanal** unter vergleichbaren Bedingungen festzuhalten. Ersetzen Sie die Platzhalter, nachdem Sie jedes Quellbild mit freigegebenen Tool-Versionen und Einstellungen konvertiert haben. Erfassen Sie auch Quellabmessungen, Farbformat, Alpha-Behandlung und JPEG-Qualität. eZip und PNG erhalten die Quelltransparenz; JPEG unterstützt keinen Alpha-Kanal. Für den Vergleich transparenter Bilder mit JPEG ist daher ein dokumentierter, vorab zusammengesetzter Hintergrund erforderlich. Stellen Sie das Ergebnis nicht als gleichwertige Alpha-Erhaltung dar.

<div align="center"><em>Dateigrößenvergleich repräsentativer Bilder — Vorlage</em></div>

<div align="center" markdown>

| Szenario | Format | Kodierung | Dateigröße | Relativ zu BMP | Testeinstellungen / Anmerkungen |
|:---|:---|:---|---:|---:|:---|
| Opakes UI-Bild | BMP | Unkomprimierte Referenz | Noch zu messen | 100% | Quellbild, Abmessungen und Pixelformat dokumentieren |
| Opakes UI-Bild | eZip | Verlustfrei | Noch zu messen | Noch zu messen | GraphicsTool-Version und Konvertierungsprofil dokumentieren |
| Opakes UI-Bild | PNG | Verlustfrei | Noch zu messen | Noch zu messen | Encoder und Einstellungen dokumentieren |
| Opakes UI-Bild | JPEG | Verlustbehaftet | Noch zu messen | Noch zu messen | Encoder und Qualitätseinstellung dokumentieren |
| UI-Bild mit Alpha-Kanal pro Pixel | BMP | Unkomprimierte Referenz | Noch zu messen | 100% | Genaue BMP-Variante und Alpha-Behandlung angeben |
| UI-Bild mit Alpha-Kanal pro Pixel | eZip | Verlustfrei mit Alpha | Noch zu messen | Noch zu messen | GraphicsTool-Version und Konvertierungsprofil dokumentieren; transparente Kanten prüfen |
| UI-Bild mit Alpha-Kanal pro Pixel | PNG | Verlustfrei mit Alpha | Noch zu messen | Noch zu messen | Encoder und Einstellungen dokumentieren |
| UI-Bild mit Alpha-Kanal pro Pixel | JPEG | Verlustbehaftet, ohne Alpha | Noch zu messen | Noch zu messen | Zusammengesetzten Hintergrund und Qualitätseinstellung dokumentieren; Alpha bleibt nicht erhalten |

</div>

Berechnen Sie **Relativ zu BMP** je Szenario als `file size ÷ BMP file size × 100%`. Vergleichen Sie nicht direkt die Zeilen ohne Alpha-Kanal mit denen mit Alpha-Kanal. Die Tabelle ist eine Messvorlage und keine allgemeine Aussage zum Kompressionsverhältnis; die Ergebnisse hängen vom Bildmaterial, der Alpha-Abdeckung und den Konvertierungseinstellungen ab.

## Warum eZip verwenden { #why-use-ezip }

### Asset-Speicherbedarf reduzieren { #reduce-asset-storage }

Komprimierte Ressourcen können weniger Speicherplatz in NOR-Flash, PSRAM, NAND oder Wechselspeichern belegen als unkomprimierte Pixelpuffer. Das ist besonders bei Zifferblättern, mehrsprachigen Schriftpaketen, Icon-Sammlungen, UI-Themes und animationsreichen Oberflächen hilfreich.

### Speicherbus-Verkehr reduzieren { #reduce-memory-bus-traffic }

Liegen Ressourcen in externem NOR-Flash oder PSRAM, können unkomprimierte Bitmaps bereits vor dem Zeichnen viel Busbandbreite beanspruchen. Werden komprimierte Ressourcen übertragen und nahe am Grafikpfad dekodiert, kann dieser Verkehr sinken. Der tatsächliche Gewinn hängt vom Kompressionsverhältnis, Quellformat, Display-Aktualisierungsmuster und der Geschwindigkeit der Speicherschnittstelle ab.

### CPU-Zeit freisetzen { #preserve-cpu-time }

Auf einem unterstützten Hardware-Dekodierpfad muss die Anwendungs-CPU nicht jedes Asset per Software dekomprimieren. Der freigewordene Spielraum kann die UI-Reaktionsfähigkeit verbessern oder der Aufgabenplanung für Funk, Audio, Sensoren und Energiesparbetrieb zugutekommen.

### Asset-Bereitstellung wiederholbar machen { #make-asset-delivery-repeatable }

Mit einem Konvertierungswerkzeug und einem festgelegten Ressourcenformat lassen sich Releases reproduzierbar erstellen: Quellbilder, Konvertierungseinstellungen, erzeugte Ressourcen und Zielauflösungsprofile können gemeinsam versioniert werden. Das ist zuverlässiger als eine manuelle Konvertierung oder die Annahme, dass UI-Entwickler Bildeinstellungen jedes Mal identisch reproduzieren.

## Vergleich der eZip-Implementierungen { #ezip-version-comparison }

Die Tabelle verwendet Bezeichnungen aus den Produktübersichten und dem SDK. Eine Versionsnummer garantiert keinen einheitlichen Funktionsumfang. Prüfen Sie den gewählten Chip, die SDK-Version, das Ressourcenformat und die Speicherkonfiguration des Boards.

<div align="center"><em>eZip-Implementierungen und separate JPEG-Unterstützung</em></div>

<div align="center" markdown>

| Implementierung | Repräsentative SF32-Familien | Dokumentierte Funktionen | Bedeutung für das Design |
|:---|:---|:---|:---|
| **eZip** | SF32LB55x | Verlustfreie Grafikdekompression mit direkter ePicasso-Anbindung; das SDK nimmt diese Familie von der nativen eZip-A-Unterstützung aus. | Verwenden Sie statische eZip-Ressourcen; setzen Sie keine native eZip-A-Animationsunterstützung voraus. |
| **eZip 2.0** | SF32LB52x, SF32LB56x, SF32LB58x | Verlustfreie Grafikdekompression und native eZip-A-Animationen. SF32LB58x verfügt zusätzlich über einen separaten JPEG-Codec. | Prüfen Sie die Animations- und Speicheranforderungen; behandeln Sie JPEG/MJPEG als separaten Medienverarbeitungspfad. |
| **EZIP** | SF32LB57x | eZip/eZip-A-Dekodierung und direkte Ausgabe an EPIC. JPEGD ist ein separater JPEG-Decoder; gehen Sie nicht davon aus, dass er denselben direkten Ausgabepfad wie EZIP nutzt. | Erzeugen Sie Ressourcen mit einem Kompressionsfenster von 2048 Byte. Die genannten Quellen belegen keinen vollständigen MJPEG-Wiedergabepfad; prüfen Sie Middleware- und Decoder-Unterstützung für das konkrete Zielgerät. |

</div>

Die direkte Ausgabe an EPIC erspart einen Puffer für das vollständig dekodierte Quellbild vor dem Rendern. Der Arbeitsspeicher des Dekoders und der endgültige Renderpuffer bleiben erforderlich; JPEG-Dekodierung wird dadurch nicht zu einer EZIP-Funktion. Richten Sie den separaten JPEGD-Pfad nach der dokumentierten Treiberpipeline der jeweiligen Zielfamilie aus.

## Ressourcen vorbereiten { #preparing-assets }

Verwalten Sie bearbeitbare Quelldateien in der Versionskontrolle und erzeugen Sie die eZip-Ausgabe als Build-Artefakt:

1. Legen Sie Zielauflösung, Pixelformat und Animationsanforderungen für das gewählte Gerät fest.
2. Bereiten Sie Quellbilder oder -animationen in den vorgesehenen Abmessungen vor. Vermeiden Sie Laufzeit-Skalierung, um falsch dimensioniertes Bildmaterial auszugleichen.
3. Konvertieren Sie die Dateien mit SiFli GraphicsTool, ändern Sie bei Bedarf die Bildgröße und erzeugen Sie eZip- oder eZip-A-Ausgaben.
4. Dokumentieren Sie Tool-Version und Konvertierungsprofil im Projekt und prüfen Sie die generierten Ressourcen auf der Zielhardware.
5. Legen Sie die Ausgabe am vorgesehenen Speicherort ab. Testen Sie Kaltstart, wiederholte UI-Nutzung, Verhalten bei knappem Speicher und Display-Aktualisierungen bei gleichzeitiger Bluetooth- oder Audio-Aktivität.

GraphicsTool unterstützt gängige Bildformate wie PNG, JPEG, WebP und AVIF und kann GIF, PNG und APNG in eZip-/eZip-A-Ressourcen umwandeln. Eine konvertierte Ressource lässt sich nur verwenden, wenn Zielgerät und SDK den dafür konfigurierten Dekodierpfad unterstützen.

Für andere statische Bildformate sieht der dokumentierte Ablauf zunächst die Größenanpassung und Konvertierung in PNG und anschließend die eZip-Kodierung vor. Stimmen Sie Farbformat, Alpha-Behandlung und LVGL-Version auf das Ziel ab. Das SDK-Kommandozeilenbeispiel verlangt für SF32LB57x `-winsize 2048`; die anderen aufgeführten Familien benötigen diese Option nicht. Verwenden Sie `sdk/tools/png2ezip/ezip.exe` und dokumentieren Sie die genauen Argumente zusammen mit den erzeugten Ressourcen.

## Integrationswerkzeuge { #integration-tools }

Neben dem Desktop-Workflow mit GraphicsTool bietet SiFli weitere Integrationsmöglichkeiten:

- **Kommandozeilenwerkzeuge** lassen sich in skriptgesteuerte und reproduzierbare eZip-Konvertierungsprozesse integrieren. Nutzen Sie sie in lokalen Build-Skripten oder CI-Jobs, damit die versionierten Quelldateien und die erzeugte eZip-Ausgabe nachvollziehbar bleiben.
- **Android- und iOS-SDKs** ermöglichen die eZip-Integration in mobile Anwendungen. Sie sind hilfreich, wenn eine Begleit-App eZip-Ressourcen im Rahmen eines Geräte-Workflows vorbereiten, verwalten, übertragen oder anderweitig verarbeiten muss.

Verwalten Sie Konvertierungsprofile, Tool- und SDK-Versionen, Prüfsummen der Ausgabedateien sowie die Kompatibilitätsanforderungen des Zielgeräts in der Versionskontrolle. Mobile Apps und Kommandozeilenwerkzeuge sollten dasselbe freigegebene Ressourcenprofil wie das eingebettete Produkt verwenden. Eine für einen bestimmten Chip oder eine SDK-Konfiguration erzeugte Datei funktioniert nicht zwangsläufig unverändert auf jedem SF32-Ziel.

## Hinweise zu Design und Debugging { #design-and-debugging-guidance }

- **Verwenden Sie eZip für Ressourcen.** Diese können in NOR Flash, PSRAM, NAND oder einem Dateisystem liegen; der Dekoder interpretiert jedoch keine Dateipfade. Der Speichertreiber muss die Daten über einen unterstützten, hardwarezugänglichen Pfad bereitstellen oder laden. Die HAL verlangt 4-Byte-Ausrichtung für Eingabepuffer und AHB-Ausgabepuffer. eZip ist kein Kompressionsformat für den endgültigen Framebuffer.
- **Planen Sie die Bandbreite für die Ressourcenübertragung ein.** eZip kann den Übertragungsverkehr senken, doch dekodierte Pixel durchlaufen weiterhin den in der [Grafikübersicht](overview.md#sf32-graphics-flow) beschriebenen Rendering- und Display-Pfad.
- **Behalten Sie CPU-Fallback-Pfade bei.** Nicht jeder Asset-Typ, jedes Pixelformat oder jede UI-Operation lässt sich auf einen Hardware-Dekodier- oder Grafikpfad abbilden.
- **Validieren Sie die Speicherplatzierung.** Testen Sie Assets und Zeichenpuffer in internem SRAM, NOR-Flash, PSRAM oder Wechselspeicher; jede Wahl verändert Latenz und Buskonkurrenz.
- **Testen Sie mit der realen Arbeitslast.** Messen Sie Kaltladezeit, Animationstakt, UI-Latenz und Stromverbrauch, während Bluetooth, Audio, Sensoren und Display-Aktualisierung gleichzeitig aktiv sind.
- **Schreiben Sie die Konvertierungseinstellungen vor der Freigabe fest.** Änderungen an Tool-Version oder Parametern können Ausgabekompatibilität, Qualität, Speicherbedarf und Dekodierleistung beeinflussen.

## Wichtige Erkenntnisse { #key-takeaways }

- eZip ist SiFlis verlustfreies Kompressionsformat für Display-Assets sowie der zugehörige hardwaregestützte Dekodierpfad auf unterstützten SF32-Geräten.
- Verwenden Sie eZip für Grafikressourcen und die GZIP-/LZ4-Modi des Tools für allgemeine Daten; deren Kompressionsverhältnis hängt von den Quelldaten ab und muss gemessen werden.
- eZip-A ist das Format für animierte Ressourcen. GraphicsTool erzeugt eZip-/eZip-A-Ressourcen aus gängigem Ausgangsbildmaterial.
- SiFli bietet zudem Kommandozeilen-Werkzeuge und Android-/iOS-SDKs zur Integration von eZip in automatisierte und mobile Begleit-App-Workflows.
- eZip kann Asset-Speicherbedarf, externen Speicherverkehr und Dekodieraufwand der Anwendungs-CPU reduzieren, ersetzt aber nicht ePicasso oder den Display-Controller.
- Wählen Sie die dokumentierte Implementierung und den Ausgabepfad statt einer angenommenen Versionshierarchie. Trennen Sie JPEGD von EZIP und verwenden Sie das vorgeschriebene SF32LB57x-Kompressionsfenster.
- Ein erfolgreiches eZip-Design beruht auf einer kontrollierten Asset-Pipeline: Ausgangsgrafiken, Konvertierungseinstellungen, Speicherplatzierung, Grafikintegration und Tests auf dem Zielgerät sind gleichermaßen wichtig.

## Primärquellen { #primary-references }

- [GraphicsTool und Ressourcenaufbereitung](https://wiki.sifli.com/tools/图形转换工具.html)
- [EZIP-HAL-Modi, Ausgabepfade, Ausrichtung und Animationsunterstützung](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/ezip.html)
- [Dokumentation des EZIP-Werkzeugs](https://docs.sifli.com/projects/solution/2.application-notes/ezip/index.html)
- [EZIP-HAL: Betriebsarten, Ausrichtung und Animationen](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_ezip.h)
- [LVGL-eZip-Beispiel und Konvertierungsparameter](https://github.com/OpenSiFli/SiFli-SDK/blob/main/example/multimedia/lvgl/ezip_v9/README_EN.md)
- [Dokumentation des mobilen eZip-SDK](https://docs.sifli.com/projects/solution/mobile-sdk/ezip/index.html)
- Produktübersichten: [SF32LB52x](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf), [SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf), [SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
- [Separate JPEGD-Schnittstelle](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_jpegd.h)
