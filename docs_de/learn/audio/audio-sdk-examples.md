---
icon: lucide/audio-lines
title: "Audio-SDK-Beispiele"
description: "Wählen Sie das passende SiFli-SDK-Audiobeispiel für PDM-Mikrofonerfassung, Aufnahme, Wiedergabe, Codecs, Speicherung und Mischung."
tags:
  - Audio
  - Beispiele
---

# Audio-SDK-Beispiele { #audio-sdk-examples }

Die Audio-Beispiele des SiFli-SDK sind praktische Ausgangspunkte, um einen vollständigen Signalpfad zu prüfen. Sie sind keine fertige Produkt-Firmware. Wählen Sie das Beispiel, das den anspruchsvollsten Teil Ihres Designs bereits abdeckt — Mikrofonaufnahme, Lautsprecherausgabe, Speicherung, Codec oder mehrere gleichzeitige Audioströme. Führen Sie das unveränderte Beispiel zunächst auf dem Zielboard aus; passen Sie danach jeweils nur ein Subsystem an.

Diese Seite ordnet ausgewählte SiFli-SDK-Audiobeispiele nach Entwicklungsaufgabe. Der offizielle [Audio-Index](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html) dient als Einstieg. Die Tabelle nennt die Boards, die auf den offiziellen SiFli-Seiten zum Zeitpunkt dieser Prüfung ausdrücklich aufgeführt sind; aus einem Seriennamen folgt keine Unterstützung für jedes Board oder jede SDK-Version dieser Serie. Prüfen Sie vor dem Build die genaue Seite und die Dateien des Zielboards.

## Das passende Beispiel auswählen { #start-with-the-right-example }

<div align="center"><em>Tabelle: Audio-Beispiele des SiFli-SDK nach Entwicklungsaufgabe</em></div>

<div align="center" markdown>

| Entwicklungsziel | Empfohlenes Beispiel | Was sich damit prüfen lässt | Offiziell dokumentierte Boards und Einschränkungen |
|:-----------------|:-----------|:---------------|:----------------------------|
| Zwei oder vier digitale Mikrofone erfassen | [PDM-Beispiel](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) | PDM-Erfassung; WAV-Aufnahme und Wiedergabe in dafür vorgesehenen Verarbeitungsmodi | Aktuell ist nur `sf32lb56-lcd_a128r12n1` aufgeführt. Prüfen Sie PDM-Verdrahtung und Pin-Mux. In der Beschreibung der Pin-Konfiguration ist der Boardname als `f32lb56-lcd_a128r12n1` falsch geschrieben (das führende `s` fehlt); der Build-Befehl verwendet den korrekten Namen. |
| Zwei analoge Mikrofone erfassen | [Beispiel für lokale Musikwiedergabe mit Stereolautsprechern (Local Music Example for stereo speaker, Dual-ADC/DAC)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/dual_adc_dac/README.html) | Gleichzeitige Erfassung in getrennten PCM-Dateien; Auswahl eines Mikrofons zur Wiedergabe über den Lautsprecher | Erfordert ein kundenspezifisches SF32LB58x-Board und läuft nicht auf SiFli-Modulboards. Benötigt zwei analoge Mikrofone und zwei analoge Lautsprecher. |
| Grundlegende Mikrofon-zu-Lautsprecher-Funktion prüfen | [Aufnahmebeispiel](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/record/README.html) | Fünf Sekunden Mikrofonaufnahme in einen PCM-Puffer im Speicher, danach automatische Wiedergabe | `eh-lb525` sowie die Serien `sf32lb52-lcd`, `sf32lb56-lcd` oder `sf32lb58-lcd`; ein Lautsprecher ist erforderlich. |
| Eine vorbereitete Audiodatei aus dem Root-Dateisystem abspielen | [Beispiel für lokale Musikwiedergabe](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/local_music/README.html) | Wiedergabe der vorbereiteten `16k.wav` aus der eingebundenen FAT-Root-Partition; MP3 ist ebenfalls möglich, sofern die Datei hineinpasst | `eh-lb525` sowie die Serien `sf32lb52-lcd`, `sf32lb56-lcd` oder `sf32lb58-lcd`; FAT-Root-Partition und Lautsprecher erforderlich. |
| Musik von einer SD-Karte abspielen | [MP3-Player für lokale Musikwiedergabe](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html) | MP3- oder WAV-Wiedergabe aus dem SD-Kartenverzeichnis `music` sowie Lautstärkeregelung über die Shell | Aktuell ist nur `sf32lb52-lchspi-ulp` aufgeführt. Benötigt SPI1, FAT/MSD und einen Lautsprecher; für die Erkennung langer Tastendrücke ist außerdem ein externer Akku nötig. |
| Verlustfreies Audio aufnehmen, komprimieren, decodieren und wiedergeben | [FLAC-Beispiel](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/flac/README.html) | PCM-Aufnahme sowie FLAC-Codierung, -Decodierung und -Wiedergabe | Die Serien `sf32lb52-lcd`, `sf32lb56-lcd` und `sf32lb58-lcd`; erforderlich sind FAT, `libFLAC` und Audiokomponenten. |
| Sprachsignale aufnehmen, komprimieren, decodieren und wiedergeben | [Opus-Beispiel](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/opus/README.html) | Mikrofonaufnahme mit 16 kHz, Opus-Codierung und -Decodierung sowie Lautsprecherwiedergabe | Aktuell ist nur `eh-lb525` aufgeführt. Erforderlich sind FAT und Audiokomponenten; beachten Sie die unten erläuterte beispielspezifische Stack-Empfehlung. |
| Mehrere lokale Titel mischen | [Dreikanal-Audiomixer (offizielle chinesische Seite)](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/example/multimedia/audio/mixer/README.html) | Separate Decodierung dreier lokaler Dateien, bei Bedarf Resampling und gemischte Ausgabe | Aktuell sind `sf32lb52-lcd_n16r8` und `sf32lb56-lcd_n16r12n1` als getestet aufgeführt. Verwenden Sie das dokumentierte Dateisystem-Image und die Beispieldateien. |

</div>

## Gemeinsame Voraussetzungen { #shared-starting-point }

Die meisten Beispiele haben dieselben Voraussetzungen: Die benötigte Audio-Hardware muss auf dem Entwicklungsboard vorhanden und korrekt angeschlossen sein. Die Board-Konfiguration muss die erforderlichen Audio-Blöcke aktivieren, und das Beispiel muss das jeweilige Zielboard unterstützen. Beispiele, die Dateien lesen oder schreiben, benötigen außerdem ein eingebundenes Dateisystem. Übernehmen Sie Boardnamen, Pinbelegungen oder `menuconfig`-Einstellungen nicht ungeprüft aus anderen Beispielen, sondern gleichen Sie sie mit der offiziellen SiFli-Seite und den Konfigurationsdateien des Zielboards ab.

!!! warning "Vorhandene Dateisystemdaten schützen"
    Das Opus-Beispiel aus v2.5.1 ruft nach einem fehlgeschlagenen Mounten des Wurzeldateisystems `dfs_mkfs()` auf ([Quellcode](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/multimedia/audio/opus/src/main.c)). Übernehmen Sie diese automatische Formatierung nicht ohne ausdrückliche Datenerhaltungsstrategie in ein Produkt. Ein Mountfehler berechtigt nicht zum Löschen von Nutzerdaten.

Beschränken Sie die erste Prüfung bei allen Beispielen bewusst auf das Wesentliche:

1. Kompilieren und flashen Sie das unveränderte Projekt für ein unterstütztes Board.
2. Prüfen Sie das erwartete Aufnahme- oder Wiedergabeverhalten mit nachweislich funktionierender Audio-Hardware und geprüften Dateien.
3. Dokumentieren Sie SDK-Revision, Boardname, Konfiguration, Pinbelegung und serielle Ausgabe.
4. Ändern Sie genau ein produktspezifisches Element und wiederholen Sie denselben Test.

Die [Audioübersicht](overview.md) erläutert die Schnittstellen- und Systementscheidungen hinter diesen Beispielen. Informationen zur Pufferverwaltung, zum Beenden von Sitzungen und zur Koexistenz mit Display oder Bluetooth finden Sie unter [Audio-Server und Pufferung](audio-server-buffering.md).

## Digitale Mikrofone erfassen: PDM { #digital-microphone-capture-pdm }

Verwenden Sie das PDM-Beispiel, wenn das Produkt digitale Mikrofone statt eines analogen Mikrofoneingangs benötigt. Das offizielle Beispiel unterstützt zwei oder vier PDM-Mikrofone; ob eine Aufnahmedatei entsteht und wie sie wiedergegeben wird, hängt vom Verarbeitungsmodus ab. In der dokumentierten Topologie dienen der linke und rechte Kanal von `PDM1` für zwei Mikrofone; mit `PDM2` werden vier erreicht. Eine PDM-Schnittstelle kann bis zu zwei digitale Mikrofone bedienen; die Zahl der Schnittstellen entspricht daher nicht der Mikrofonanzahl. Prüfen Sie die unterstützte Konfiguration anhand der Schnittstellen- und Kanalzuordnung des Ziel-SoC.

Die aktuelle offizielle Seite führt `sf32lb56-lcd_a128r12n1` als unterstütztes Board. `pdm open pdm12 4 raw` erzeugt nur Protokollausgaben, keine Aufnahmedatei. Die Anyka-Verarbeitungsmodi liefern auch bei vier Mikrofonen Monoausgabe. Vier Eingänge bedeuten daher keine vierkanalige Ausgabedatei. Prüfen Sie Algorithmusabhängigkeiten und Ausgabeformat, bevor Sie das Beispiel als Grundlage für ein Mikrofonarray nutzen.

Prüfen Sie vor der Anpassung diese vier Punkte:

- Der gewählte Chip und das Entwicklungsboard stellen die benötigten PDM-Signale bereit.
- Mikrofontakt, Datenleitungen, Versorgung und Masseführung entsprechen dem Mikrofon-Datenblatt.
- Die Pin-Mux-Konfiguration des Boards weist die PDM-Funktionen zu, bevor der Treiber gestartet wird.
- Das Produkt benötigt die im Beispiel aktivierten Aufnahme- und Wiedergabedienste tatsächlich; für die reine PDM-Erfassung sind sie nicht erforderlich.

Die offizielle PDM-Seite dokumentiert eine eigene Board-Konfiguration und beispielhafte Pinbelegung. Nutzen Sie diese als geprüfte Referenz, ersetzen Sie sie jedoch durch die tatsächliche Verdrahtung des Zielboards. Übernehmen Sie die Angaben nicht ungeprüft. Siehe das [PDM-Beispiel](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html).

## Analoge Erfassung sowie einfache Aufnahme und Wiedergabe { #analog-capture-and-basic-recordplayback }

Das **Aufnahmebeispiel** prüft den Signalweg von der Mikrofonaufnahme bis zur lokalen Wiedergabe: Es zeichnet fünf Sekunden in einen PCM-Puffer im Speicher auf und gibt diesen anschließend automatisch über den Lautsprecher wieder. Die offizielle Seite führt `eh-lb525` sowie die Serien `sf32lb52-lcd`, `sf32lb56-lcd` und `sf32lb58-lcd` auf. Es eignet sich als erster Schritt, bevor Dateisystem, Komprimierung, Bluetooth-Übertragung oder mehrere Mikrofone hinzukommen.

Das **Local Music Example for stereo speaker** (Dual-ADC/DAC-Beispiel) ist eine spezielle Referenz für ein kundenspezifisches SF32LB58x-Board. Laut offizieller Seite läuft es nicht auf SiFli-Modulboards und benötigt zwei analoge Mikrofone sowie zwei analoge Lautsprecher. `mic2file` zeichnet beide Mikrofone gleichzeitig in getrennte PCM-Dateien auf; `mic2speaker 0` oder `mic2speaker 1` wählt ein Mikrofon zur Wiedergabe über den Lautsprecher aus. Verwenden Sie es nur, wenn diese analoge Topologie den Produktanforderungen entspricht; andernfalls beginnen Sie mit dem einfacheren Aufnahmebeispiel.

Prüfen Sie bei beiden Signalwegen zunächst den Rauschpegel ohne Eingangssignal, die Verstärkung, Übersteuerungen und das Verhalten beim Starten und Stoppen. Erst danach sollten Sie weitere Softwarefunktionen untersuchen. Ein stabiler PCM-Aufnahme- und Wiedergabepfad ist die Grundlage für Codecs, Dateizugriff und Bluetooth.

## Lokale Wiedergabe und Speichermedien { #local-playback-and-storage }

Das **Beispiel für lokale Musikwiedergabe** ist die einfachste Referenz für dateibasierte Wiedergabe. Die offizielle Seite führt `eh-lb525` sowie die Serien `sf32lb52-lcd`, `sf32lb56-lcd` und `sf32lb58-lcd` auf. Es bindet die FAT-Root-Partition ein und spielt die vorbereitete Datei `16k.wav` ab. Eine MP3-Datei kann ebenfalls im Verzeichnis `disk/` des Beispiels bereitgestellt werden, sofern sie in die konfigurierte Dateisystemkapazität passt. Das Beispiel eignet sich für Benachrichtigungstöne, mitgelieferte Ansagen und die erste Prüfung des lokalen Lautsprecherpfads.

Der **MP3-Player für lokale Musikwiedergabe** ergänzt Wechselspeicher: Er spielt MP3 oder WAV aus dem SD-Kartenverzeichnis `music` ab und regelt die Lautstärke über die Shell. Beide lokalen Wiedergabebeispiele benötigen ein Dateisystem; dieses nutzt zusätzlich SPI1 und den SPI-MSD-Treiber. Schließen Sie beim dokumentierten Board `sf32lb52-lchspi-ulp` einen Akku an, sonst werden lange Tastendrücke nicht erkannt. Wählen Sie das Beispiel, wenn SD-Karten zum Produkt gehören.

Beide Beispiele demonstrieren die Wiedergabe, aber keine vollständige Architektur für einen Mediaplayer. Bevor Sie eines davon zu einer Produktfunktion ausbauen, planen Sie Dateiverwaltung, den Umgang mit beschädigten Medien, Unterbrechungen, die Wiederherstellung nach Energiesparzuständen und das Verhalten der Benutzeroberfläche separat.

## FLAC- und Opus-Verarbeitungsketten { #flac-and-opus-codec-pipelines }

Das **FLAC-Beispiel** deckt den vollständigen verlustfreien Ablauf ab: PCM vom Mikrofon aufnehmen, als FLAC codieren, decodieren und wiedergeben. Die offizielle Seite führt die Serien `sf32lb52-lcd`, `sf32lb56-lcd` und `sf32lb58-lcd` auf; erforderlich sind FAT, `libFLAC` und Audiokomponenten. Es eignet sich zum Testen einer dateibasierten Aufnahmekette oder zum Vergleich des Speicherbedarfs mit unkomprimiertem PCM.

Das **Opus-Beispiel** demonstriert einen komprimierten Signalweg für Sprachsignale. Die aktuelle offizielle Seite führt nur `eh-lb525` auf. Das Beispiel erfasst Audio mit 16 kHz, verarbeitet 10-ms-Frames mit etwa 16 kbit/s und decodiert und gibt den resultierenden Stream wieder. Die Dokumentation weist außerdem darauf hin, dass die benötigte Stackgröße vom gewählten Encoder-Modus abhängt. Berücksichtigen Sie diese Anforderung beim Anpassen des Beispiels; der standardmäßige Task-Stack reicht nach dem Hinzufügen von Anwendungscode möglicherweise nicht mehr aus.

Die offizielle SiFli-SDK-README nennt beispielspezifische Stack-Einstellungen: `OPUS_STACK_SIZE` soll 20k betragen, wenn `opus_test()` `opus_encoder_ctl(encoder, OPUS_SET_FORCE_MODE(MODE_SILK_ONLY))` aufruft; ohne diesen erzwungenen Modus empfiehlt sie 200k. Das sind keine allgemeinen Opus-Anforderungen. Prüfen Sie vor der Übernahme die verwendete SDK-Revision und den Encoder-Pfad und messen Sie den Stack-Höchstverbrauch unter der Produktlast, um die Task-Stackgröße festzulegen.

Keines der beiden Beispiele bildet einen vollständigen Bluetooth-Anruf oder ein Streaming-Produkt ab. Prüfen Sie damit zunächst die lokale Codierung und Decodierung. Integrieren Sie anschließend Transport, Pufferverwaltung und Sitzungssteuerung und messen Sie die verfügbaren Latenz- und Speicherreserven.

## Drei Audiokanäle mischen { #three-channel-mixing }

Die aktuelle offizielle Seite des **Dreikanal-Audiomixers** führt `sf32lb52-lcd_n16r8` und `sf32lb56-lcd_n16r12n1` als getestete Boards auf. Das Beispiel liest drei lokale Audiodateien, decodiert jeden Stream, tastet Eingaben mit einer anderen Abtastrate als 48 kHz bei Bedarf neu ab, mischt die Mono-PCM-Streams und gibt das Ergebnis wieder. Die dokumentierten Beispieldateien umfassen zwei MP3-Dateien und eine WAV-Datei. Verwenden Sie das angegebene Dateisystem-Image und die Dateinamen; beliebige Audiodateien sind darin nicht zwingend enthalten.

Der geprüfte Mixer addiert die drei Mono-Samples und teilt durch drei, statt sie mit voller Verstärkung zu summieren. Der dokumentierte Durchlauf dauert etwa 50 Sekunden. Trennen Sie diese Verstärkungsstrategie und die begrenzte Demodauer von den Mischanforderungen des Produkts.

Das ist eine geeignete Referenz für gleichzeitig abgespielte Ansagen, Effekte und Musik, wenn das Produkt festlegen muss, welche Klänge überlagert werden dürfen. Eine fertige Audiorichtlinie ist damit nicht gegeben: Legen Sie Stream-Prioritäten, Lautstärkeregelung, Verhalten bei Übersteuerung, Speicherbudget und Reaktion auf eine verpasste Frist beim Lesen oder Decodieren fest. Der Artikel [Audio-Server und Pufferung](audio-server-buffering.md) hilft, diese Laufzeitbedingungen genauer festzulegen.

## Ein Beispiel anpassen und die Nachweise erhalten { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>Tabelle: Audiobeispiele anpassen — übernehmen und erneut prüfen</em></div>

<div align="center" markdown>

| Bereich | Aus dem Beispiel übernehmen | Für das Produkt erneut prüfen |
|:---------|:----------------------|:----------------------------|
| Hardware | Nachweislich funktionierende Board-Verdrahtung und unterstützter Peripheriepfad | Mikrofon- oder Lautsprechermodell, Verstärkung, Versorgungsschienen, Pin-Mux, Layout und Zugang für Fertigungstests |
| Konfiguration | Minimal erforderliche SDK-Komponenten | Speicher, Dateisystem, Codecs, Audio Manager und die tatsächlich benötigten Funktionsoptionen |
| Audiodaten | Sample-Format und geprüfte Audiodateien | Abtastrate, Kanalanzahl, Puffergrößen, Latenzziel und Fehlerbehandlung |
| Laufzeitverhalten | Grundlegender Ablauf für Aufnahme oder Wiedergabe | Gleichzeitiger Betrieb mit UI, Bluetooth und Speicher, Übergänge in und aus Energiesparzuständen, Fehlerbehandlung und Sitzungsabbau |
| Nachweise | Erwartetes Verhalten laut offizieller Quelle | Serielles Protokoll, Aufnahme-/Wiedergabedateien, gemessene Stromaufnahme und wiederholbarer Regressionstest |

</div>

## Weiterführende Informationen { #related-resources }

- [Audioübersicht](overview.md) zu Schnittstellen, Sitzungstypen, Energiebedarf und Validierung.
- [Audio-Server und Pufferung](audio-server-buffering.md) zu Stream-Verwaltung, DMA-Puffern und Tests unter Produktlast.
- [Beispiele](../../develop/examples/index.md) zum SDK-Beispielkatalog aus verschiedenen Bereichen.
- [Audio-Beispielindex des SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html) mit der aktuellen offiziellen Liste und den Einrichtungsanleitungen der einzelnen Beispiele.
