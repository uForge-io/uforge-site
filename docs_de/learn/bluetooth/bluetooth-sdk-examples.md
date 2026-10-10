---
icon: lucide/bluetooth-connected
title: "Bluetooth-SDK-Beispiele"
description: "Wählen Sie das passende SiFli-SDK-Bluetooth-Beispiel für BLE-Services, Classic-Bluetooth-Profile, Telefonintegration, OTA, Datenübertragung oder LE-Audio-Broadcast."
tags:
  - Bluetooth
  - Beispiele
---

# Bluetooth-SDK-Beispiele { #bluetooth-sdk-examples }

Die SiFli-SDK-Bluetooth-Beispiele sind gezielte Ausgangspunkte für ein Profil, eine Rolle oder einen Funkablauf; sie sind keine fertige Produkt-Firmware. Beginnen Sie mit dem Projekt, das die technisch anspruchsvollste Produktanforderung abdeckt. Bringen Sie das unveränderte Beispiel auf dem Zielboard zum Laufen und ergänzen Sie anschließend jeweils eine Produktanforderung.

Diese Seite ordnet die Beispiele für [Classic Bluetooth](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/index.html), [BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/index.html) und [LE-Audio-Broadcast](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/index.html) aus der SF32LB58x-Dokumentation nach Entwicklungsaufgabe. Der Pfad `sf32lb58x` kennzeichnet den Dokumentationsbereich und ist keine Zusage, dass jedes Beispiel auf jedem SF32LB58x-Board oder einer anderen SF32-Familie unterstützt wird. Die URL `latest` wird fortlaufend aktualisiert. Prüfen Sie für den vorgesehenen SDK-Release oder Commit den Abschnitt **Supported Platforms** der jeweiligen Projektseite und verwenden Sie nur die dort genannten Boardnamen und Build-Anweisungen. Ist die Unterstützung für das konkrete Board und den SDK-Stand nicht ausdrücklich belegt, kennzeichnen Sie sie als **ungeprüft**; leiten Sie sie weder aus der URL noch aus einem anderen Beispiel oder einem ähnlich benannten Board ab. Auch bei der Angabe „all platforms“ muss das Beispiel vor der Produktentwicklung mit dem tatsächlichen SDK-Stand und der Boardkonfiguration gebaut werden. `menuconfig`-Einstellungen, Testausrüstung und Einschränkungen stehen ebenfalls auf der jeweiligen Projektseite.

## Mit dem richtigen Bluetooth-Pfad beginnen { #start-with-the-right-bluetooth-path }

<div align="center"><em>Tabelle: Auswahl von Bluetooth-SDK-Beispielen</em></div>

<div align="center" markdown>

| Produktbedarf | Beginnen mit | Vor der Produktintegration validieren |
|:-------------|:-----------|:-------------------------------------|
| Ein benutzerdefinierter BLE-Service oder eine Companion-App-Verbindung | [BLE-Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html) | Advertising, Verbindung, die Service-Schnittstelle und ihr Verhalten, Reconnection und telefonseitige Validierung |
| Das Gerät muss gleichzeitig mit dem Telefon als Peripheral und mit dem Sensor als Central kommunizieren | [BLE-Central und -Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html) | Gleichzeitige GAP-Rollen und die Zuordnung der GATT-Client- und -Server-Rollen |
| Zuverlässige BLE-Datenübertragung | [BLE-Durchsatz](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html) oder [BLE-Dateiübertragung](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html) | Der benötigte Nutzdatenfluss, die Verbindungseinstellungen und das Wiederherstellungsverhalten |
| Bluetooth-Firmware-Update | [Peripheral mit OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html) oder [Central und Peripheral mit Pingpong-OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Update-Rollen, Wiederherstellung nach einem unterbrochenen Update, Partitionen und Rollback-Plan |
| Serielle Verbindung oder Netzwerkzugang über das Telefon mit Classic Bluetooth | [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) oder [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html) | Das serielle Profil bzw. der Netzwerkzugang über das Telefon, Peer-Kompatibilität und Wiederverbindungsverhalten |
| HCI-Transport über UART zwischen Host und BT/BLE-Controller | [HCI over UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html) | Host-/Controller-Grenze, UART-Transport sowie Konfiguration des Zielcontrollers und Boards |
| Classic-Bluetooth-Audio oder -Anrufe | [Musikempfänger](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Musiksender](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) oder [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) | Audio-Routing, Taktung, Pufferung, Telefon-Interoperabilität und Energiebudget |
| LE-Audio-Broadcast | [BAP-Broadcast-Sender](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) oder [BAP-Broadcast-Empfänger](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | Broadcast-Rolle, Audio-Pipeline, Testempfänger oder -sender und zeitliche Reserve |

</div>

## Ein Beispiel als Validierungsbasis in Betrieb nehmen { #bring-up-an-example-as-evidence }

Protokollieren Sie vor Änderungen am Projekt die genaue SDK-Version, den Boardnamen, die Konfiguration, das Gegenstellengerät oder die App, die Funkeinstellungen und die erwarteten Logmeldungen. Gehen Sie anschließend wie folgt vor:

1. Bauen und flashen Sie das unveränderte Beispiel mit dem exakten Boardnamen und den Anweisungen, die für den passenden SDK-Release angegeben sind. Ist die Zuordnung zwischen Dokumentation und SDK-Stand oder die Boardunterstützung nicht belegt, behandeln Sie sie vor der Anpassung als ungeprüft.
2. Prüfen Sie das zentrale Funkverhalten: Geräteerkennung, Verbindung, Übertragung, Streaming oder Empfang, je nach Anwendungsfall.
3. Wiederholen Sie den Test nach Reset, Trennung, Wiederverbindung sowie Aus- und Einschalten.
4. Ergänzen Sie jeweils einen produktspezifischen Service, Nutzungspfad, Audiopfad oder eine Energiesparrichtlinie.
5. Testen Sie erneut unter der kombinierten Produktlast, einschließlich Display, Sensoren, Speicher, Audio und Übergängen in Energiesparzustände, sofern zutreffend.

Ein funktionierendes Beispiel zeigt nur den darin abgedeckten Ablauf. Es belegt nicht, dass Sicherheitsrichtlinie, Funkreichweite, Latenz, Stromverbrauch oder Interoperabilität des Produkts bereits für die Freigabe ausreichen.

## BLE-Beispiele { #ble-examples }

Verwenden Sie BLE-Beispiele für Companion-App-Verbindungen, interoperable GATT-Services, Beacons, Datenübertragung und BLE-basiertes OTA. Wählen Sie zunächst ein rollenorientiertes Beispiel und fügen Sie ein Profilbeispiel nur hinzu, wenn das Produkt diesen standardisierten Service benötigt.

<div align="center"><em>Tabelle: BLE-SDK-Beispiele nach Entwicklungsaufgabe</em></div>

<div align="center" markdown>

| Entwicklungsaufgabe | Offizielle Beispiele | Mit diesen Projekten prüfen |
|:-----------------|:------------------|:--------------------------------|
| Grundlegende Rollen und Servicezugriff | [Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html), [Central und Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html), [Mehrfachverbindungen](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/multi_connection/README.html) | Advertising, Scanning, Verbindungsverwaltung und die richtige Zuordnung von Central und Peripheral |
| Telefonintegration | [AMS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ams/README.html), [ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs/README.html), [ANCS auf zwei Kernen](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs_dualcore/README.html) | Apple-Medien- oder Benachrichtigungsintegration und der benötigte telefonseitige Pairing-Ablauf |
| Standard-GATT-Profile | [BASC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/basc/README.html), [CPPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cppc/README.html), [CSCPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cscpc/README.html), [DISS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/diss/README.html), [HRPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hrpc/README.html), [CTS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/tip_cts/README.html) | Servicerolle, Definition der GATT-Charakteristiken und Interoperabilität des Standardprofils mit dem Gegenüber |
| Eingabe und Gegensprechfunktion | [HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hid/README.html), [BLE-Gegensprechfunktion](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/talkback/README.html) | Das Interaktionsmodell, bevor Produkt-UI oder Sprachverhalten hinzugefügt werden |
| Pairing- und Reconnect-Verhalten | [BLE-Pairing](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/pair/README.html) | Bonding, Identitätsbehandlung und den erneuten Pairing-Pfad des Produkts |
| Advertising und Discovery | [iBeacon](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/iBeacon/README.html), [Periodisches Advertising](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv/README.html), [Synchronisation mit periodischem Advertising](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv_sync/README.html) | Das erforderliche Broadcast- oder Synchronisationsverhalten, ohne eine GATT-Verbindung vorauszusetzen |
| Datenübertragung und OTA | [Dateiübertragung](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html), [Durchsatz](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html), [Peripheral mit OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html), [Central und Peripheral mit Pingpong-OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Nutzdaten, Verbindungsparameter, Update-Rollen, Wiederherstellung nach Unterbrechung und End-zu-End-Validierung |

</div>

Behandeln Sie ein Durchsatzergebnis nicht als Produkt-Datenrate. Sie hängt von der gewählten PHY, den Verbindungseinstellungen, dem Peer-Verhalten, der HF-Umgebung, der Hostaktivität und dem Nutzdatenmuster ab. Ebenso ist ein ANCS- oder AMS-Beispiel ein Ausgangspunkt für die Telefonintegration, keine Garantie für jede iOS-Version oder jeden Nutzerberechtigungszustand.

## Classic-Bluetooth-Beispiele { #classic-bluetooth-examples }

Classic-Bluetooth-Projekte sind relevant, wenn ein Produkt BR/EDR-Profile, Audio, seriellen Transport oder IP-Netzwerkzugang über ein Telefon benötigt. Eine erfolgreiche Demonstration auf dem Entwicklungsboard ist nur der Ausgangspunkt; validieren Sie die Interoperabilität mit den tatsächlichen Peer-Geräten und der Produktlast.

<div align="center"><em>Tabelle: Classic-Bluetooth-SDK-Beispiele nach Entwicklungsaufgabe</em></div>

<div align="center" markdown>

| Entwicklungsaufgabe | Offizielle Beispiele | Mit diesen Projekten prüfen |
|:-----------------|:------------------|:--------------------------------|
| Host-/Controller-Transport oder serielles Classic-Bluetooth-Profil | [HCI over UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html), [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) | Die Host-/Controller-Grenze und der UART-Transport für HCI oder das Verhalten des seriellen SPP-Profils |
| Audio-Streaming und Mediensteuerung | [A2DP-Mehrfachverbindungen](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_multi_connect/README.html), [A2DP-Audiofreigabe](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_sharing/README.html), [AVRCP-Albumcover](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/avrcp_cover_art/README.html), [Musikempfänger](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Musikempfänger mit Weiterleitung](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink_with_relay/README.html), [Musiksender](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) | Die vorgesehene Source-/Sink-Topologie, das Audio-Routing, den Pfad der Mediensteuerung und das Ressourcenbudget |
| Anrufe und Sprachverbindungen | [3-SCO](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/3sco/README.html), [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html), [HFP-Weiterleitung](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp_relay/README.html) | Anruftopologie, Audio-Latenz, Mikrofon-/Lautsprecherpfad und Telefonverhalten |
| Netzwerkfreigabe über das Telefon und OTA | [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html), [PAN OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan_ota/README.html) | Freigabe der Telefonverbindung, IP-Verkehr, Wiederverbindung und OTA-Übertragung |

</div>

Für das PAN-Netzwerkmodell und die telefonseitige Einrichtung siehe [Bluetooth PAN](pan.md). Für Audio-Routing, die Zuständigkeit für Puffer und die Validierung unter Systemlast siehe [Audioübersicht](../audio/overview.md) und [Audio-Server und Pufferung](../audio/audio-server-buffering.md).

## LE-Audio-Broadcast-Beispiele { #le-audio-broadcast-examples }

Der Dokumentationspfad `sf32lb58x` belegt für sich genommen keine Boardkompatibilität; prüfen Sie im Abschnitt **Supported Platforms** die genaue SDK-Revision und das Zielboard. Beim Beispiel für die Verbindung von Classic Bluetooth und BAP bezeichnet der README-Titel einen Sender, während Pfad und Übersicht einen Empfänger beschreiben. Die [Implementierung im geprüften SDK-Stand](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/example/zbt/bap_broadcast_src_with_classic_bt/src/main.c) verarbeitet Classic A2DP und startet einen BAP-Broadcast-Sender. Dieser Befund gilt nur für den verlinkten Commit und nicht automatisch für jeden über `latest` bereitgestellten SDK-Release. Prüfen Sie vor dem Build README, Quellcode und Boardkonfiguration für den tatsächlich verwendeten SDK-Release oder Commit. Leiten Sie weder Rolle noch Boardunterstützung aus der kopierten Empfängerbeschreibung ab.

Die `zbt`-Projekte enthalten LE-Audio-Broadcast-Source- und -Sink-Beispiele auf Basis des [Basic Audio Profile (BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/). Betrachten Sie Sender (Source) und Empfänger (Sink) als zusammengehörigen Systemtest: Broadcast-Konfiguration, Audioquelle, Empfangsgerät, Taktsynchronisierung und HF-Bedingungen beeinflussen gemeinsam das Ergebnis.

<div align="center"><em>Tabelle: LE-Audio-Broadcast-SDK-Beispiele</em></div>

<div align="center" markdown>

| Anwendungsfall | Offizielles Beispiel | Zuerst nachzuweisen |
|:------------------|:-----------------|:------------------------|
| Einen Broadcast-Audiostream empfangen | [BAP-Broadcast-Empfänger](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | Verhalten des Empfängers, Audio-Ausgabepfad und Testkonfiguration des Broadcasts |
| Einen Broadcast-Audiostream senden | [BAP-Broadcast-Sender](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) | Audio-Pipeline des Senders, Broadcast-Konfiguration und ein nachweislich kompatibler Empfänger |
| Classic Bluetooth und LE-Audio-Broadcast überbrücken | [BAP-Broadcast-Sender mit Classic Bluetooth](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src_with_classic_bt/README.html) | Die beiden Audiobereiche, ihre Datenübergabe und die Zeit- und Ressourcenreserve bei gleichzeitigem Betrieb |

</div>

## Produktvalidierung über das Beispiel hinaus { #product-validation-beyond-the-example }

<div align="center"><em>Tabelle: Prüfpunkte für die Produktanpassung von Bluetooth-Beispielen</em></div>

<div align="center" markdown>

| Prüfbereich | Aus dem Ausgangsbeispiel übernehmen | Für das Produkt neu validieren |
|:---------|:---------------------------------|:----------------------------|
| Funkverhalten | Das unterstützte Board und die vorgesehene Rolle oder das Profil des Beispiels | Antenne, Gehäuse, Reichweite, HF-Koexistenz, Peer-Geräte und Zulassungstestplan |
| Verbindungsrichtlinie | Der grundlegende Advertising-, Scan- oder Verbindungsablauf | Produktlatenz, Zielwert für den Energieverbrauch, Reconnect-Strategie und Zustandswechsel |
| Sicherheit | Das Pairing- oder Bonding-Setup des Beispiels | Authentifizierungsanforderungen, Schlüsselspeicherung, Datenschutz, Werksreset und nutzerseitige Wiederherstellung |
| Daten und Audio | Der demonstrierte Paket- oder Stream-Fluss | Nutzdatenformat und Austauschregeln, Fehlerbehandlung, Latenz, Pufferung, Codec-Konfiguration und Speicherreserve |
| Validierungsnachweis | Build-Einstellungen, Logs und erwartetes Verhalten | Wiederholbare Telefon-/Zubehör-Matrix, Messkurve der Leistungsaufnahme, Wiederherstellung nach Trennung und Regressionstest |

</div>

## Verwandte Ressourcen { #related-resources }

- [Bluetooth-Übersicht](overview.md) für Entscheidungen zu Rollen, Profilen, Sicherheit, Verbindungsparametern und Koexistenz auf Produktebene.
- [Bluetooth-Prozessor](processor.md) für Host-/Controller-Grenzen und Stromsparverhalten.
- [Bluetooth PAN](pan.md) für IP-Netzwerkverbindungen über das Telefon und PAN-basiertes OTA.
- [Audio-SDK-Beispiele](../audio/audio-sdk-examples.md) für lokale Erfassungs-, Codec- und Wiedergabebeispiele, die Bluetooth-Audio ergänzen.
- [Beispiele](../../develop/examples/index.md) für den domänenübergreifenden SDK-Beispielkatalog.
