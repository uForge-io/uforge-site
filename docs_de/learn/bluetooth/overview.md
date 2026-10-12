---
icon: lucide/bluetooth
title: "Bluetooth-Übersicht"
description: "Bluetooth auf SF32: Auswahl zwischen BLE und Dual-Mode, GATT-Service-Design, Verbindungsparameter, Pairing und Sicherheit, LE Audio und Koexistenz."
tags:
  - Bluetooth
---

# Bluetooth-Übersicht { #bluetooth-overview }

## Übersicht { #overview }

Dieser Leitfaden erklärt, wie sich Bluetooth für SF32-Produkte planen und implementieren lässt. Im Mittelpunkt stehen praktische Entwurfsentscheidungen: BLE oder Dual-Mode-Bluetooth, GATT-Service-Design, Profilwahl, Abstimmung der Verbindungsparameter, Pairing und Sicherheit, LE Audio sowie die Koexistenz mit Grafik-, Audio- und Sensorverarbeitung.

SF32 trennt die Anwendungsverarbeitung von zeitkritischen Aufgaben des Bluetooth-Controllers. Der Anwendungsprozessor übernimmt normalerweise Produktlogik und UI; ein Bluetooth- oder Low-Power-Prozessor übernimmt das Timing der Verbindungsschicht und die Funkplanung. Auf welchem Prozessor der Host-Stack und die GATT-Services laufen, hängt vom Gerät und der SDK-Konfiguration ab. Gehen Sie nicht davon aus, dass alle Services auf dem Anwendungsprozessor laufen. Prüfen Sie die Kernkonfiguration und die Kommunikation zwischen den Kernen im gewählten Beispiel.

Eine ausführlichere Erklärung des zugrunde liegenden Subsystems finden Sie unter [Bluetooth-Prozessor](processor.md).

Nutzen Sie diesen Leitfaden, um das drahtlose Verhalten des Produkts festzulegen: benötigte Rollen und Profile, die erwartete Reaktionsfähigkeit und Akkulaufzeit sowie die Aufgabenverteilung zwischen Telefon, Funk und Anwendungs-Firmware. Er ersetzt nicht die Interoperabilitätstests mit den vorgesehenen Telefonen und Zubehörgeräten.

## Die Konnektivitätsanforderungen des Produkts festlegen { #define-the-products-connectivity-requirements }

Bevor Sie GATT-Code schreiben, legen Sie fest, was das Produkt tatsächlich benötigt:

- Nur BLE, oder Dual-Mode-Bluetooth (BT Classic + BLE)?
- Bluetooth-Audio — Classic (A2DP/AVRCP/HFP) oder LE Audio?
- Typisches Verbindungsintervall, Latenz- und Durchsatzanforderungen.
- Wie oft der Anwendungsprozessor aufwachen muss und wie lange er jeweils im Schlafzustand bleiben kann.
- Ob das Produkt mit vorhandenen telefonseitigen Diensten (Benachrichtigungen, Medienkontrolle, Anrufe) interoperieren muss oder nur mit einer eigenen Companion-App.
- Erwartete Reichweite, Antennen-/Gehäusebeschränkungen und RF-Zulassungsziele.
- Ob Firmware-Updates über Bluetooth ausgeliefert werden.

Diese Antworten bestimmen die Geräteauswahl, die passenden SDK-Beispiele und wie lange die Haupt-CPU im Schlafzustand bleiben kann.

## BLE, Classic oder Dual-Mode wählen { #choose-ble-classic-or-dual-mode }

### Bluetooth Low Energy (BLE) { #bluetooth-low-energy-ble }

BLE ist für die meisten vernetzten Wearables und Sensoren die beste Ausgangswahl: Der Datenverkehr tritt sporadisch und ereignisgesteuert auf, der durchschnittliche Energiebedarf ist niedrig, und gängige mobile Betriebssysteme unterstützen BLE breit. Typische BLE-orientierte Produkte sind Fitnessarmbänder, Gesundheitssensoren, Beacons sowie Konfigurations- und Steuerverbindungen zu einer Companion-App.

### Classic Bluetooth und Dual-Mode { #classic-bluetooth-and-dual-mode }

Ergänzen Sie Classic Bluetooth, wenn das Produkt Audio-Streaming (A2DP/AVRCP), Freisprechen (HFP), serielle Datenverbindungen (SPP) oder die Kompatibilität mit vorhandenen Classic-Profilen benötigt. Dual-Mode-Designs stellen höhere Anforderungen an Funkplanung und Koexistenz als reine BLE-Designs. Genau diese Last soll der dedizierte Bluetooth-Prozessor vom übrigen System isolieren.

Nicht jedes Mitglied der SF32-Familie unterstützt Dual-Mode-Bluetooth. Prüfen Sie daher vor der Festlegung auf eine Teilenummer die Gerätetabelle im Artikel [Bluetooth-Prozessor](processor.md#device-family-differences).

## Das richtige SF32-Gerät wählen { #pick-the-right-sf32-device }

Wählen Sie das Gerät anhand der benötigten Konnektivitätsfunktionen des Produkts aus, nicht allein nach der Taktfrequenz.

<div align="center"><em>Tabelle: Das richtige SF32-Gerät wählen</em></div>

<div align="center" markdown>

| Anforderung | Typische Geräteauswahl |
|:------------|:-------------------------|
| Reines BLE-Wearable oder Sensor | SF32LB55x |
| Kostenoptimiertes Dual-Mode-Bluetooth (Audiozubehör, Modul) | SF32LB52x |
| Dual-Mode-Bluetooth mit anspruchsvoller Anzeige und Benutzeroberfläche | SF32LB56x |
| Dual-Mode-Bluetooth mit zwei Anwendungskernen für Grafik und lokale Audioverarbeitung | SF32LB57x |
| Flaggschiffprodukt mit Bedarf an Bluetooth, Grafik, KI und großem Speicher | SF32LB58x |
| Ein dedizierter Low-Power-Kern als Bluetooth-Controller genügt | SF32LB52x |
| Der Low-Power-Kern soll zusätzliche, vom Nutzer programmierbare Always-on-Aufgaben ausführen | SF32LB55x / SF32LB56x / SF32LB58x |

</div>

Wenn das Produkt mehr als nur Konnektivität benötigt, gleichen Sie die Anforderungen an Display, Speicher und KI mit der [Grafikübersicht](../graphics/overview.md) und der Seite [KI-Beschleuniger](../ai/accelerator.md) ab.

## GATT-Services und das Sibles-Framework { #gatt-services-and-the-sibles-framework }

SiFli-SDK stellt **Sibles** zum Registrieren und Nutzen von GATT-Services bereit. GATT definiert die Hierarchie aus Services und Charakteristiken sowie den Zugriff auf Attribute; GAP regelt Advertising, Geräteerkennung, Verbindungsaufbau und die zugehörigen Rollen. Beide Bereiche ergänzen sich; GATT ist keine auf GAP aufgesetzte Schicht. Verwenden Sie ein passendes SDK-Beispiel als Ausgangspunkt, statt eine GATT-Datenbank von Grund auf zu erstellen.

Das SDK liefert Beispielimplementierungen mehrerer Standard- und herstellerspezifischer Profile, darunter:

<div align="center"><em>Tabelle: GATT-Services und das Sibles-Framework</em></div>

<div align="center" markdown>

| Profil / Service | Typische Nutzung |
|:-------------------|:------------|
| **HRPC** (Heart Rate Profile Collector) | Als GATT-Client Herzfrequenzmessungen eines externen Sensors empfangen; für Fitness- und Gesundheitsprodukte. |
| **DISS** (Device Information Service) | Bereitstellung von Herstellername, Modell und Firmwareversion für das Telefon. |
| **CTS** (Current Time Service) | Zeitsynchronisation vom Telefon zum Gerät. |
| **BASC** / **CSCPC** / **CPPC** | Client-Profile für Batterie, Radgeschwindigkeit/Trittfrequenz und Radleistung in Fitnessanwendungen. |
| **HID over GATT** | Emulation von Tastaturen, Fernbedienungen und anderen Eingabegeräten. |
| **ANCS**-Client (Apple Notification Center Service) | Lesen von iOS-Benachrichtigungen auf dem Gerät. |
| **AMS**-Client (Apple Media Service) | Steuerung der iOS-Medienwiedergabe vom Gerät aus. |
| Serielles Übertragungsprofil | Benutzerdefinierter bidirektionaler Datentransport über BLE, funktional ähnlich wie SPP, aber auf GATT aufgebaut. |

</div>

Übernehmen Sie Registrierung, Ereignisbehandlung und Sicherheitsprüfungen aus dem am besten passenden Beispiel. Behalten Sie bei der Implementierung eines Standardprofils dessen UUIDs und Verhalten bei; verwenden Sie einen eigenen Service mit eigenen UUIDs, wenn das Datenmodell des Produkts dies erfordert. Ziel ist, erprobte Infrastruktur wiederzuverwenden, nicht jedes App-Protokoll in ein Standardprofil zu pressen.

## Classic-Bluetooth-Profile { #classic-bluetooth-profiles }

Für Dual-Mode-Produkte stellt das SDK Beispiel-Profilimplementierungen bereit für:

- **SPP** — einfache bidirektionale serielle Daten, nützlich für Legacy- oder Nicht-GATT-Companion-Apps.
- **A2DP** (Sink und Source) — Bluetooth-Audio-Streaming.
- **AVRCP** — Wiedergabesteuerung (Play/Pause/Titel/Lautstärke) neben einer A2DP-Verbindung.
- **HFP** — Freisprechen mit den Rollen HF (Freisprechgerät) und AG (Audio-Gateway). Das dokumentierte [HFP-Beispiel](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) implementiert HF; prüfen Sie AG-Unterstützung separat in der gewählten SDK-Konfiguration.
- **PAN** — Netzwerk über Bluetooth, einschließlich eines PAN-basierten OTA-Zustellbeispiels.

Audio- und Legacy-Profile stellen meist höhere Anforderungen an Zeitverhalten und Durchsatz als einfache BLE-Verbindungen. Planen Sie dafür ausreichend Zeit für Koexistenztests ein (siehe [Koexistenz](#coexistence-with-other-workloads)).

## Bluetooth-Audio und LE Audio { #bluetooth-audio-and-le-audio }

Es gibt zwei unterschiedliche Pfade, abhängig vom Audio-Ansatz:

- **Classic-Bluetooth-Audio** — A2DP für Streaming, AVRCP für die Wiedergabesteuerung, HFP für Anrufe. Ausgereift, breit kompatibel mit vorhandenen Telefonen und Headsets.
- **LE Audio** — das [Basic Audio Profile (BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/) definiert Verfahren zur Verwaltung von LE-Audio-Streams sowohl im Unicast- als auch im Broadcast-Betrieb. Das SDK enthält Broadcast-Source- und -Sink-Beispiele sowie ein Beispiel, das LE-Audio-Broadcast mit Classic Bluetooth kombiniert. Es eignet sich für Produkte, die während einer Übergangsphase beide Technologien unterstützen müssen.

Beide Wege benötigen stabiles Zeitverhalten, Pufferung und eine zuverlässige Übertragung der Audiodaten, üblicherweise per DMA. Wählen Sie SF32LB52x/56x/58x, wenn deren unterstützte Bluetooth-Audiorollen und SDK-Konfigurationen die Produktanforderungen erfüllen. SF32LB55x unterstützt nur BLE und kann kein Classic-Bluetooth-Audio bereitstellen; das bedeutet jedoch nicht, dass lokale Audiofunktionen fehlen. Hinweise zu DMA und Pufferung finden Sie in der [Audioübersicht](../audio/overview.md) und im Artikel [Bluetooth-Prozessor](processor.md#bluetooth-audio-and-le-audio).

## Implementierungsmuster für Sibles-Services { #implementation-pattern-for-sibles-services }

Ein wartbarer BLE-Service folgt üblicherweise diesem Muster:

<div align="center"><em>Tabelle: Implementierungsmuster für Sibles-Services</em></div>

<div align="center" markdown>

| Schritt | Firmware-Verantwortung | Prüfpunkt |
|:-----|:------------------------|:-------------|
| Service-Schnittstelle festlegen | UUIDs, Charakteristiken, Berechtigungen, Benachrichtigungsverhalten. | Mit den Anforderungen der Companion-App und den Sicherheitsanforderungen abgleichen. |
| Service registrieren | Den Sibles-/GATT-Implementierungsweg des nächstliegenden SDK-Beispiels verwenden. | Sonderlösungen für die Service-Registrierung vermeiden. |
| Advertising gezielt konfigurieren | Nur die für Geräteerkennung und Wiederverbindung benötigten Daten einschließen. | Advertising-Payload klein und stabil halten. |
| Schreibvorgänge validieren | Länge, Zustand, Berechtigungen und Befehlssequenz prüfen. | Verhindern, dass fehlerhafter App-Verkehr die Firmware destabilisiert. |
| Benachrichtigungen begrenzen | Änderungen oder gebündelte Daten senden, nicht denselben Status wiederholt melden. | Spart Sendezeit und Energie im Leerlauf. |
| Zustand dauerhaft speichern | Bonding-Schlüssel und Produkteinstellungen sicher speichern. CCCD-Abonnements für jeden Client getrennt verwalten: bei gebondeten Clients über Verbindungen hinweg behalten, bei nicht gebondeten Clients auf den Standardwert zurücksetzen. | Wiederherstellung nach Neustart und OTA prüfen; Änderungen der GATT-Datenbank berücksichtigen, statt alte Handles ungeprüft wiederherzustellen. |

</div>

So bleiben GATT-Service, Schnittstelle zur Telefon-App, Sicherheitsrichtlinie und Energieverhalten aufeinander abgestimmt.

## Advertising- und Verbindungsparameter { #advertising-and-connection-parameters }

Verbindungs- und Advertising-Parameter sind die wichtigsten Stellschrauben, um Latenz, Durchsatz und Energiebedarf gegeneinander abzuwägen.

Diese Parameter gelten für BLE-ACL-Verbindungen, nicht für alle Bluetooth-Audiotransporte. Classic-Audio verwendet das BR/EDR-Zeitverhalten; LE Audio verwendet das isochrone Zeitverhalten von CIS oder BIS. Übertragen Sie ein BLE-GATT-Verbindungsintervall nicht direkt auf diese Audiopfade. Die [LE-Einführung der Bluetooth SIG](https://www.bluetooth.com/bluetooth-le-primer/) erläutert die unterschiedlichen Transporte.

<div align="center"><em>Tabelle: Advertising- und Verbindungsparameter</em></div>

<div align="center" markdown>

| Parameter | Wirkung | Leitlinie |
|:----------|:-------|:---------|
| Advertising-Intervall | Erkennungsgeschwindigkeit und Energiebedarf des Advertising | Für ein begrenztes Zeitfenster zur schnellen Erkennung kurz wählen; danach beim Warten auf eine Verbindung oder Wiederverbindung verlängern. Eine bestehende Verbindung macht weiteres Advertising nicht erforderlich. |
| Verbindungsintervall | BLE-ACL-Reaktionszeit und Energiebedarf | Längere Intervalle können bei wenig Datenverkehr den mittleren Energiebedarf senken; kürzere können die Reaktion auf Eingaben verbessern. Prüfen Sie ausgehandelte Einstellungen, Durchsatz und Stromaufnahme mit dem Zieltelefon. |
| Peripheral-Latenz (in älteren SDKs Slave-Latenz) | Ermöglicht dem Peripheriegerät, Verbindungsereignisse auszulassen | Verlängert die Akkulaufzeit bei meist inaktiven Verbindungen; setzen Sie den Wert auf 0, wenn geringe Latenz wichtiger ist als niedriger Energieverbrauch. |
| Supervision-Timeout | Maximale Zeit ohne Empfang eines gültigen Link-Layer-Datenpakets, bevor die Verbindung als verloren gilt | Zu kurz führt bei schwachen RF-Verbindungen zu Abbrüchen; zu lang verzögert die Wiederverbindung nach einem tatsächlichen Verbindungsverlust. |
| TX-Leistung | Reichweite, Energiebedarf und Koexistenz | Mit der niedrigsten Einstellung beginnen, die die Reichweitenanforderung erfüllt. Gesamtenergie, Wiederholungen und Koexistenz im endgültigen Gehäuse messen: Bei häufigen Wiederholungen ist eine niedrigere Einstellung nicht unbedingt energiesparender. |

</div>

Beacon-Produkte (mit iBeacon-kompatiblem Advertising) und Anwendungsfälle mit periodischem Advertising, einschließlich der Synchronisierung für groß angelegte oder unidirektionale Broadcasts, werden durch eigene SDK-Beispiele unterstützt und benötigen keine vollständige GATT-Verbindung.

Verbindungsintervall, Peripheral-Latenz und Supervision-Timeout müssen eine gültige Kombination bilden, die Controller und Gegenstelle akzeptieren. Eine angeforderte Aktualisierung ist noch kein Nachweis ihrer Übernahme. Protokollieren Sie die ausgehandelten Werte und testen Sie mit dem vorgesehenen Telefon oder Zubehör, einschließlich abgelehnter Aktualisierungen und der Rückkehr zu den Leerlaufeinstellungen.

## Parameterempfehlungen je Produktphase { #parameter-presets-by-product-phase }

Verwenden Sie für unterschiedliche Phasen unterschiedliche Bluetooth-Parameter statt einer einzigen Kompromisseinstellung:

<div align="center"><em>Tabelle: Parameterempfehlungen je Produktphase</em></div>

<div align="center" markdown>

| Phase | Typisches Ziel | Einstellungsempfehlung |
|:------|:-------------|:--------------------|
| Ersterkennung | Schnelle Geräteerkennung | Kurzes Advertising-Intervall, klare Geräteidentität, begrenzte Dauer. |
| Wiederverbindung | Geringerer Durchschnittsverbrauch | Nach einem Timeout das Advertising-Intervall verlängern; bei Bedarf gerichtetes oder gefiltertes Verhalten verwenden. |
| Interaktive Steuerung | Niedrige Latenz | Kürzeres Verbindungsintervall, geringe oder keine Peripheral-Latenz. |
| Verbundener Leerlauf | Akkulaufzeit | Längeres Verbindungsintervall, Peripheral-Latenz größer null, möglichst wenige Benachrichtigungen. |
| BLE-OTA-Übertragung | Durchsatz und Zuverlässigkeit | Kurzes Intervall, keine Peripheral-Latenz, konservativ gewählter Supervision-Timeout. |
| Audio | Stabiles Zeitverhalten | Parameter, abgestimmt auf die Zeitvorgaben der Codec-Frames und die Puffertiefe. |

</div>

Dokumentieren Sie die Übergänge zwischen den Phasen. Viele scheinbar „zufällige“ Bluetooth-Probleme mit Energieverbrauch oder Latenz entstehen, weil das Produkt nach einem Zustandswechsel in der falschen Phase bleibt.

## Pairing, Bonding und Sicherheit { #pairing-bonding-and-security }

BLE kann ohne Pairing eine Verbindung herstellen. Beim Pairing werden Sicherheitsschlüssel erzeugt; Bonding speichert sie für spätere Verbindungen. Legen Sie für jeden Service fest, ob Verschlüsselung, Authentifizierung und dauerhaft gespeicherte Bonds erforderlich sind, statt Bonding pauschal für jedes Produkt vorauszusetzen:

- Entscheiden Sie frühzeitig, ob das Produkt Just Works, Passkey-Eingabe oder numerischen Vergleich benötigt. Just Works schützt nicht vor Man-in-the-Middle-Angriffen (MITM): Eine verschlüsselte Verbindung ist nicht zwangsläufig authentifiziert. Wählen Sie das Verfahren passend zu den I/O-Fähigkeiten beider Geräte und den Sicherheitsanforderungen des Produkts; siehe [Bluetooth-GAP-Sicherheitsanforderungen](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core-60/out/en/host/generic-access-profile.html).
- Bei [ANCS](https://developer.apple.com/library/archive/documentation/CoreBluetooth/Reference/AppleNotificationCenterServiceSpecification/Specification/Specification.html) ist die Freigabe auf dem Telefon von Link-Verschlüsselung und Bonding zu unterscheiden. Berücksichtigen Sie verweigerte oder widerrufene Freigaben. ANCS und [AMS](https://developer.apple.com/library/archive/documentation/CoreBluetooth/Reference/AppleMediaService_Reference/Specification/Specification.html) können während einer Verbindung verfügbar werden oder verschwinden. Überwachen Sie Service Changed und suchen Sie den Service erneut; Pairing garantiert keine dauerhafte Verfügbarkeit.
- Speichern Sie Bonding-Informationen gemäß dem vom SDK empfohlenen Speicher-/Partitionsansatz, damit Bonds Neustarts und OTA-Updates überstehen.
- Definieren Sie einen Ablauf für erneutes Pairing und „Gerät vergessen“ sowohl in der Produkt-UI als auch auf dem Telefon.
- Behandeln Sie die Sicherheitsrichtlinie (Verschlüsselungsanforderungen, I/O-Fähigkeit, Schlüsselgröße) als Produktentscheidung, nicht als unbeachteten Standardwert.

## Mehrfachverbindungen und Rollen { #multi-connection-and-roles }

Das SDK demonstriert **gleichzeitige Central- und Peripheral-Rollen** sowie **mehrere gleichzeitige Verbindungen**. Ein Produkt kann als BLE-Peripheral mit einem Telefon und als Central mit einem Sensor verbunden sein oder mehrere Companion-Verbindungen verwalten. Prüfen Sie die Rollenkombination und die maximale Verbindungszahl für das Gerät, die Controller-Firmware, die SDK-Konfiguration, die Puffer und die gesamte Funklast. Ein Beispiel garantiert keine einheitliche Verbindungskapazität für die ganze Familie.

Wenn das Produkt den Durchsatz nahe an die maximale Datenrate der Verbindung bringen muss, verwenden Sie zunächst das SDK-Durchsatzbeispiel als Referenz, bevor Sie eine Einschränkung im Anwendungscode vermuten.

## OTA-Firmware-Updates über Bluetooth { #ota-firmware-updates-over-bluetooth }

Es gibt zwei gängige Übertragungswege:

- **DFU-artige Updates über BLE**, integriert in eine Peripheral-Verbindung (siehe das Beispiel `peripheral_with_ota` dafür, wie OTA in eine normale Peripheral-GATT-Rolle eingebunden wird).
- **PAN OTA**, das Firmware über eine Bluetooth-PAN-Netzwerkverbindung für Dual-Mode-Produkte liefert, die PAN bereits für Daten nutzen.

Planen und testen Sie vor der Auslieferung für beide Wege das Partitionslayout, die Wiederherstellung nach Fehlern und das Rollback. Prüfen Sie für BLE-OTA ein kürzeres Verbindungsintervall und eine Peripheral-Latenz von null während der Übertragung; stellen Sie danach die normalen Energiespareinstellungen wieder her. PAN-OTA nutzt Classic Bluetooth. Optimieren Sie Durchsatz und Wiederherstellung nach Fehlern dafür separat, statt BLE-Verbindungsparameter zu übernehmen.

## Koexistenz mit anderen Systemlasten { #coexistence-with-other-workloads }

Bluetooth läuft auf SF32 selten allein — es teilt sich das System mit Grafik, Audio, Sensoren und manchmal externem WLAN. Der dedizierte Bluetooth-Prozessor übernimmt den Großteil der zeitkritischen Link-Verarbeitung. Die Koexistenz auf Anwendungsebene muss dennoch berücksichtigt werden:

- Lange kritische Abschnitte oder deaktivierte Interrupts auf dem Anwendungsprozessor können die hostseitige Bluetooth-Verarbeitung verzögern.
- Display- und PSRAM-Verkehr konkurrieren mit Bluetooth-Audio-Puffern um Speicherbandbreite.
- Sensorinterrupts, die den Anwendungsprozessor zu oft wecken, können die Energieersparnis zunichtemachen, die dadurch entsteht, dass er schläft, während der Bluetooth-Prozessor die Verbindung abwickelt.

Für die Systemsicht siehe [Koexistenz mit anderen Systemlasten](processor.md#coexistence-with-other-workloads). Testen Sie realistische, besonders anspruchsvolle Kombinationen (z. B. aktives Display, Audio und eine stark ausgelastete BLE-Verbindung) statt jedes Subsystem isoliert.

## RF, Interoperabilität und Zertifizierungsvorbereitung { #rf-interoperability-and-certification-readiness }

Bluetooth-Firmware sollte mit derselben Disziplin validiert werden wie RF-Hardware:

- Testen Sie mit Telefonen verschiedener Hersteller, unterschiedlichen Betriebssystemversionen und in mehreren Wiederverbindungsszenarien, nicht nur mit einem Entwicklungstelefon.
- Prüfen Sie das Verhalten nach veralteten Bonds, telefonseitigem „Gerät vergessen“, geräteseitigem Werksreset und OTA.
- Validieren Sie Reichweite und Paketstabilität im endgültigen Gehäuse mit Akku, Display und Ladegerät sowie in typischen Trage- und Haltepositionen.
- Halten Sie RF-Testmodi, Kalibrierungszugang und Protokolle für Produktion und Zulassungsunterstützung verfügbar.
- Reservieren Sie bei Produkten mit vielen Profilen genügend Zeit für Qualifikations- und Profiltests. Eine funktionierende Demo-App belegt noch keine Interoperabilität.

## Bluetooth-Fehler eingrenzen { #debugging-bluetooth-issues }

<div align="center"><em>Tabelle: Bluetooth-Fehler eingrenzen</em></div>

<div align="center" markdown>

| Symptom | Wahrscheinlich zu prüfender Bereich |
|:--------|:----------------------|
| Langsame oder unzuverlässige Geräteerkennung | Advertising-Intervall/-Typ, RF-Layout, Antennenanpassung. |
| Häufige Trennungen bei ansonsten guten RF-Bedingungen | Supervision-Timeout zu kurz, Fehlanpassung des Verbindungsintervalls, Koexistenzinterferenz. |
| Hohe Leistungsaufnahme trotz „inaktiver“ Verbindung | Peripheral-Latenz nicht konfiguriert, Anwendungsprozessor zu oft geweckt, unnötiger GATT-Verkehr. |
| Audiostörungen oder Aussetzer | DMA-/Pufferunterlauf, Ressourcenkonkurrenz mit Display-/PSRAM-Verkehr oder transportspezifische Timing- und Konfigurationsprobleme (BR/EDR für Classic-Audio; CIS/BIS für LE Audio). |
| Pairing schlägt gelegentlich fehl | Probleme bei der Bonding-Speicherung, Fehlanpassung der I/O-Fähigkeit, veralteter Bond auf einer Seite. |
| Gute Reichweite auf der Werkbank, schlechte Reichweite im Gehäuse | Antennenverstimmung durch Gehäuse/Akku/Leiterplatte, TX-Leistungseinstellung, RF-Anpassnetzwerk. |

</div>

## Häufige Fehler { #common-mistakes }

- Auswahl reiner BLE-Hardware, nachdem das Produkt bereits Classic-Audio benötigt.
- Unnötiges Neuimplementieren der Service-Infrastruktur oder Erzwingen eines eigenen Datenmodells in einem ungeeigneten Standardprofil.
- Belassen der Peripheral-Latenz bei 0 für Verbindungen, die die meiste Zeit inaktiv sind.
- Vernachlässigung von Koexistenztests bis zur späten Integration, wenn Display/Audio/Bluetooth erstmals kombiniert werden.
- Pairing und Bonding erst spät als Frage der Nutzerführung behandeln, statt den Ablauf von Anfang an zu gestalten.
- Auslassen der RF-Bring-up-Validierung (Antenne, Anpassnetzwerk, Quarzgenauigkeit) bis zu den finalen Leiterplattenrevisionen.
- Die Annahme, reines Firmware-Tuning könne ein schlechtes RF-Layout kompensieren.

## Inbetriebnahme-Checkliste { #bring-up-checklist }

- [ ] Prüfen Sie, ob das Produkt nur BLE oder Dual-Mode benötigt, und wählen Sie das passende SF32-Gerät.
- [ ] Ermitteln Sie die am besten passenden SDK-Beispiele für Profile und Services des Produktanwendungsfalls.
- [ ] Legen Sie die Zielwerte für Advertising- und Verbindungsparameter bei Geräteerkennung, aktiver Nutzung und im Leerlauf fest.
- [ ] Gestalten Sie den Ablauf für Pairing, Bonding und „Gerät vergessen“.
- [ ] Validieren Sie RF-Layout, Antennenanpassung und Quarzgenauigkeit an realer Hardware.
- [ ] Nehmen Sie die gewählten Profile (GATT-Services, A2DP/AVRCP/HFP oder LE-Audio-Broadcast) mit einem realen Telefon oder Referenz-Host in Betrieb und testen Sie sie.
- [ ] Testen Sie die Koexistenz mit Display, Audio und Sensoren unter realistischer kombinierter Last.
- [ ] Planen und testen Sie den OTA-Zustellpfad, falls Firmware-Updates über Bluetooth ausgeliefert werden.
- [ ] Messen Sie die Leistungsaufnahme im verbundenen Leerlauf und prüfen Sie, ob der Anwendungsprozessor wie erwartet in den Schlafzustand wechselt.

## Wichtigste Erkenntnisse { #key-takeaways }

- Entscheiden Sie zuerst zwischen reinem BLE und Dual-Mode-Bluetooth. Davon hängen die Gerätewahl und das weitere Vorgehen mit dem SDK maßgeblich ab.
- Beginnen Sie mit den vorhandenen GATT-Services und Classic-Profilbeispielen des SDK (HRPC, DISS, CTS, HID, ANCS/AMS, SPP, A2DP, AVRCP, HFP, PAN), statt von Grund auf zu bauen.
- Verbindungsintervall, Peripheral-Latenz, Supervision-Timeout und TX-Leistung sind die wichtigsten Stellschrauben, um Latenz, Durchsatz und Energiebedarf auszubalancieren.
- Prüfen Sie bei Bluetooth-Audio die benötigte Classic- oder LE-Audio-Rolle für das konkrete Gerät und die SDK-Konfiguration. Entwerfen und testen Sie anschließend Pufferung und Koexistenz; eine Aussage über die gesamte Familie ersetzt diese Prüfung nicht.
- Bluetooth ist ein Thema auf Systemebene: RF-Layout, Takte, Nutzerführung beim Pairing und Koexistenz mit Grafik, Audio und Sensoren sind ebenso wichtig wie der GATT-Code selbst.

Für eine aufgabenorientierte Übersicht der aktuellen Classic-Bluetooth-, BLE- und LE-Audio-SDK-Projekte siehe [Bluetooth-SDK-Beispiele](bluetooth-sdk-examples.md).

Für eine praktische Methode zur Messung und Analyse der Bluetooth-Leistungsaufnahme eines Zielgeräts siehe [Bluetooth-Leistungsaufnahme messen und analysieren](bluetooth-low-power-profiling.md).
