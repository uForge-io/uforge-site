---
icon: lucide/network
description: "Bluetooth PAN auf SF32: BNEP-Transport, NAP/GN/PANU-Rollen, Abwägungen beim Telefon-Tethering, SiFli-SDK-Konfiguration und OTA-Validierung."
tags:
  - Bluetooth
---

# Bluetooth PAN { #bluetooth-pan }

## Übersicht { #overview }

**Bluetooth PAN** (Personal Area Networking) ermöglicht einem SF32-Gerät den Zugriff auf ein IP-Netzwerk über eine Classic-Bluetooth-Verbindung. Für den Internetzugang nutzt es typischerweise den Tethering-Dienst eines Telefons. So kann ein separates WLAN-Funkmodul entfallen. PAN ist eines der Bluetooth-Classic-Profile in der [Bluetooth-Übersicht](overview.md#classic-bluetooth-profiles) und eine der in [OTA und DFU](../../develop/firmware-topics/ota-dfu.md) beschriebenen OTA-Transportoptionen.

Ziehen Sie PAN für gelegentlichen oder moderaten IP-Datenverkehr in Betracht, etwa für Wetterabfragen, Zeitsynchronisation, Cloud-API-Aufrufe, Sprachassistenten-Daten und Firmware-Downloads. Ein separates WLAN-Subsystem lässt sich vermeiden, wenn sein Nutzen Kosten, Platzbedarf, Integrationsaufwand und Energiebedarf nicht aufwiegt. Bewerten Sie die geltenden RF-Konformitätsanforderungen für die gewählte Hardware und das Endprodukt.

## Funktionsweise von Bluetooth PAN { #how-bluetooth-pan-works }

Die Bluetooth SIG definiert PAN als Bluetooth-Classic-Profil (BR/EDR). Über eine Bluetooth-ACL-Verbindung transportiert es Ethernet-ähnliche Pakete mithilfe von **BNEP** (Bluetooth Network Encapsulation Protocol). BNEP läuft über L2CAP, nicht über RFCOMM. PAN erfordert BR/EDR und eine kompatible PAN-Implementierung, aber keine BLE-Unterstützung. Auch reine Bluetooth-Classic-Hardware kann PAN implementieren.

PAN läuft nicht über BLE. Das eigenständige [Internet Protocol Support Profile (IPSP)](https://www.bluetooth.com/specifications/specs/internet-protocol-support-profile-1-0/) ermöglicht jedoch IPv6 über BLE. Diese Protokollfähigkeit belegt nicht, dass SiFli-SDK oder der Hotspot-Dienst eines Telefons IPSP unterstützen. Der folgende BLE-Vergleich bezieht sich auf die Weiterleitung von GATT-Daten durch eine App, nicht auf IPSP.

Das Profil definiert drei Rollen:

<div align="center"><em>Tabelle: Bluetooth-PAN-Rollen</em></div>

<div align="center" markdown>

| Rolle | Funktion |
|:-----|:---------|
| **NAP** (Network Access Point) | Verbindet Bluetooth-Geräte mit einem externen Netzwerk und leitet Pakete zwischen dem Bluetooth-Piconetz und diesem Netzwerk weiter. Diese Rolle übernimmt typischerweise das Telefon, wenn es Tethering oder den persönlichen Hotspot bereitstellt. |
| **PANU** (PAN User) | Client-Rolle, die sich mit einem NAP- oder GN-Gerät verbindet und dessen Netzwerkzugang nutzt. SF32-Geräte verwenden diese Rolle. |
| **GN** (Group Ad-hoc Network) | Leitet Pakete zwischen den verbundenen PANU-Geräten weiter, ohne Zugang zu einem externen Netzwerk bereitzustellen. GN dient der direkten Ad-hoc-Vernetzung von Geräten, nicht dem Internetzugang. |

</div>

Ein PANU kann Geräte in der Nähe mit Inquiry finden und deren PAN-Dienst und Rolle über SDP ermitteln. Die Networking-Angabe in Class of Device ist ein Hinweis für die Suche, kein Nachweis für einen nutzbaren NAP-Dienst. Nach dem ACL- und BNEP-Verbindungsaufbau über L2CAP leitet der NAP Daten per Bridge oder Routing an sein externes Netzwerk weiter, je nach Implementierung. Ein NAP kann ein Telefon oder ein LAN-Gateway sein, wie die [PAN-Spezifikation](https://www.bluetooth.com/specifications/specs/personal-area-networking-profile-1-0/) beschreibt. Beide Seiten können die Verbindung beenden. Beim hier beschriebenen Telefon-Tethering kann eine Änderung der Freigabe eine Wiederverbindung erfordern.

## Wann sich PAN statt WLAN eignet { #why-use-pan-instead-of-wi-fi }

<div align="center"><em>Tabelle: Netzwerkzugang über PAN, WLAN oder BLE</em></div>

<div align="center" markdown>

| Ansatz | Geeignet, wenn | Abwägung |
|:---------|:---------------|:---------|
| Bluetooth PAN | Das Produkt nutzt bereits Bluetooth im Dual-Mode, benötigt zeitweise oder mäßige IP-Datenübertragung und hat üblicherweise ein gekoppeltes Telefon in der Nähe. | Datenrate und Reichweite hängen von BR/EDR und der übergeordneten Netzwerkverbindung des NAP ab. Ein Telefon-Tethering-Design hängt vom Telefon ab; andere Designs können ein eigenständiges NAP-Gateway verwenden. |
| Dedizierter WLAN-Funk | Das Produkt benötigt dauerhaft eine hohe Datenrate oder eine vom Telefon unabhängige Verbindung. | Erfordert zusätzliche Funkhardware, Antenne, Integrationsarbeit und ein Energiebudget. Prüfen Sie die geltenden RF-Konformitätsanforderungen für die gewählte Funkhardware oder das Modul und das Endprodukt. |
| BLE GATT → Begleit-App → Internet | Das Produkt tauscht geringe Datenmengen aus, die eine App an einen Cloud-Dienst weiterleiten kann. | Diese eigene Weiterleitung stellt dem Gerät keine direkte IP-Verbindung bereit. BLE IPSP ist eine separate Option; die Unterstützung durch Gerätestack und Gateway muss geprüft werden. IPSP ist nicht PAN. |

</div>

Wenn ein Produkt Bluetooth im Dual-Mode bereits für Audio, GATT-Dienste oder Bluetooth-Classic-Profile nutzt, lässt sich mit PAN oft vergleichsweise kostengünstig Internetzugang ergänzen, ohne ein zweites Funksubsystem einzubauen. Voraussetzung ist, dass der Anwendungsfall die Abhängigkeit von einem Tethering-fähigen Telefon in der Nähe zulässt.

## Datenübertragung unter iOS: BLE-Weiterleitung, Bluetooth Classic und PAN { #ios-data-transport-ble-relay-classic-bluetooth-and-pan }

Drei verschiedene iPhone-Verbindungswege müssen auseinandergehalten werden. Die pauschale Aussage „Bluetooth Classic erfordert MFi“ greift zu kurz: iOS unterstützt standardisierte Bluetooth-Profile, und auch der persönliche Hotspot kann Bluetooth verwenden. Die Einschränkung betrifft den Fall, dass eine iOS-App über Apples External-Accessory-/iAP-Weg einen **benutzerdefinierten Datenkanal** zu einem Bluetooth-Classic-Zubehör benötigt. Laut Apple kommuniziert External Accessory über Bluetooth mit MFi-Zubehör. In der [technischen Q&A](https://developer.apple.com/library/archive/qa/qa1657/_index.html) stellt Apple klar, dass BLE-Zubehör Core Bluetooth nutzt und keine MFi-Zertifizierung benötigt.

<div align="center"><em>Tabelle: Optionen für die Internetverbindung von iOS-Zubehör</em></div>

<div align="center" markdown>

| Design | Verbindung zwischen Gerät und Telefon | Bedeutung für das iOS-Produkt | Internet-Datenrate und technische Abwägung |
|:-------|:---------------------|:------------------------|:--------------------------------------------|
| BLE → App → Internet | Benutzerdefiniertes GATT-Protokoll; die iOS-App empfängt Gerätedaten und leitet sie an die Cloud weiter. | BLE kann Core Bluetooth ohne den External-Accessory-MFi-Pfad nutzen. Die App muss Pairing, Datenrahmung, Wiederholungsversuche, Verhalten im Hintergrund und die Weiterleitung an die Cloud selbst verwalten. | Nutzlast und Übertragungsplanung von BLE hängen von den Verbindungsparametern sowie vom Verhalten von iOS und der App ab. Der Weg eignet sich häufig für kleine, unregelmäßig anfallende Datenmengen, ist aber keine allgemeine IP-Verbindung. Bei kontinuierlichem oder großem Datenverkehr kann er zum praktischen Engpass werden. |
| Benutzerdefiniertes Bluetooth Classic → App | Benutzerdefinierter Datenkanal von einem Bluetooth-Classic-Zubehör zu einer iOS-App. | Das [External-Accessory-Framework](https://developer.apple.com/documentation/externalaccessory) ist für MFi-Zubehör bestimmt. Apple zufolge ist es auf MFi-Hardware beschränkt; standardisierte, unterstützte Profile sind davon nicht betroffen. | Dieser Weg setzt ein MFi-Zubehör und dessen unterstütztes Zubehörprotokoll voraus. Außerdem sind App-Integration und Produktqualifizierung erforderlich. Er stellt dem Gerät allein keine direkte IP-Verbindung bereit. |
| Bluetooth PAN → Telefon-Hotspot → Internet | Standardmäßige PANU-NAP-Verbindung; SF32 nutzt den Bluetooth-Tethering-Dienst (persönlicher Hotspot) des Telefons. | Das Gerät verwendet den Tethering-Dienst des Telefons statt eines benutzerdefinierten App-Zubehör-Transports. Für das Produkt müssen weiterhin Telefon, Mobilfunkanbieter und Tethering-Verhalten validiert werden. | SF32 führt einen eigenen IP-Client ohne Weiterleitung durch eine App aus. Das belegt keinen Geschwindigkeits- oder Energievorteil gegenüber BLE. Vergleichen Sie die Nutzdatenrate, Aktualisierungsdauer und den Energiebedarf auf den vorgesehenen Telefonen mit identischen Nutzdaten und demselben Server. Die Ergebnisse hängen vom Bluetooth-Link, den Telefonrichtlinien, dem übergeordneten Netz und dem Zielserver ab. |

</div>

Für Sprachassistenten, OTA-Clients und andere Produkte mit kontinuierlichem Streaming oder direktem HTTP-/WebSocket-Verkehr kann PAN nach erfolgreicher Prüfung des Ziel-iPhones und der SDK-Konfiguration eine Alternative zur BLE-Weiterleitung über eine App sein. Das SiFli-Beispiel v2.5.1 aktiviert zusätzlich A2DP, um das dokumentierte iOS-Problem beim alleinigen PAN-Verbindungsaufbau zu umgehen; A2DP ist keine Anforderung des PAN-Protokolls. PAN ersetzt eine App für Produktkonfiguration, Nutzerauthentifizierung, Benachrichtigungen oder lokale Steuerung **nicht**; es verhindert lediglich, dass die Anwendungsdatenebene durch diese App-Weiterleitung eingeschränkt wird. Der [SF32-Sprachassistent Xiaozhi](../../projects/sf32-xiaozhi.md) zeigt diese Architektur in einem funktionsfähigen Beispiel.

## Geräteunterstützung bei SF32 { #device-support-on-sf32 }

Wählen Sie bei SF32 eine Familie mit Bluetooth Classic und prüfen Sie PAN-Stack, SDK-Version und Zielboard-Konfiguration. Die PAN-fähigen Familien in der Tabelle nutzen Bluetooth im Dual-Mode. Das ist eine Eigenschaft dieser SF32-Geräte, keine Anforderung des PAN-Protokolls.

<div align="center"><em>Tabelle: PAN-Unterstützung nach SF32-Familie</em></div>

<div align="center" markdown>

| Familie | Bluetooth-Fähigkeit | PAN-Unterstützung |
|:-------|:----------------------|:-------------|
| SF32LB52x | Dual-Mode-Bluetooth | Ja |
| SF32LB55x | Nur BLE | Nein — PAN erfordert Bluetooth Classic |
| SF32LB56x | Dual-Mode-Bluetooth | Ja |
| SF32LB57x | Dual-Mode-Bluetooth | PAN-Stack und Zielboard prüfen; im hier referenzierten PAN-Beispiel von v2.5.1 nicht aufgeführt |
| SF32LB58x | Dual-Mode-Bluetooth | Ja |

</div>

Weitere Kriterien zur Auswahl zwischen BLE und Bluetooth im Dual-Mode finden Sie in der [Bluetooth-Übersicht](overview.md#choose-ble-classic-or-dual-mode).

## Das PAN-Beispiel des SiFli-SDK { #sifli-sdks-pan-example }

Das SiFli-SDK liefert eine funktionierende PANU-Implementierung unter `example/bt/pan`, unterstützt auf den Board-Serien `eh-lb52x`, `eh-lb56x`, `eh-lb58x` und `sf32lb52/56/58-lcd`. Das Beispiel verbindet sich mit dem PAN-(NAP-)Dienst eines Telefons und nutzt dann Finsh-Shell-Befehle, um echte Netzwerknutzung zu demonstrieren — einschließlich eines `weather`-Befehls, der aktuelle Bedingungen über die aufgebaute PAN-Verbindung abruft. Der README-Screenshot zeigt Felder der Wetterdienst-Antwort: `id`, `name`, `country`, `path`, `timezone`, `timezone_offset`, `txt`, `code`, `temperature` und `last_update`. Das Beispiel nennt Chongqing (CN), Asia/Shanghai (+08:00), `多云` (chinesisch für „bewölkt“; Code `4`), Temperatur `10` und den Zeitstempel `2025-01-13T15:54:09+08:00`. Das sind Anwendungsschichtdaten, keine PAN/BNEP-Felder; die Werte können sich ändern.

Beim Start aktiviert das Beispiel Bluetooth-Inquiry- und Page-Scan, damit ein Telefon das Gerät unter seinem Standard-Bluetooth-Namen `sifli_pan` entdecken und koppeln kann.

Richten Sie für HTTPS die Zertifikate gemäß der [PAN-README für v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md) ein. Standard-CA-Zertifikate liegen unter `external/mbedtls_228/certs/default`; zusätzliche benötigte CA-Zertifikate gehören nach `external/mbedtls_228/certs`. Erforderlich ist PEM, nicht DER. Prüfen Sie den Inhalt auf `-----BEGIN CERTIFICATE-----`, statt sich allein auf die Dateiendung zu verlassen. Ist `PKG_USING_MBEDTLS_USER_CERTS` in `proj.conf` aktiviert, führt der Build die Dateien dieses Verzeichnisses in `ports/src/tls_certificate.c` zusammen. Prüfen Sie die Vertrauensanker für den tatsächlichen Server. Eine erfolgreiche PAN-Verbindung belegt keine erfolgreiche TLS-Zertifikatsprüfung. Prüfen Sie die Serveridentität und, wenn die Gültigkeitsprüfung davon abhängt, die Gerätezeit.

Die README nennt das Verzeichnis `mbedtls_288`; ihre Screenshots und der [Zertifikatsgenerator in v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/external/mbedtls_228/SConscript) verwenden jedoch `mbedtls_228`. Die obigen Pfade folgen der Implementierung. Das Skript akzeptiert Zertifikate nur, wenn die erste Zeile mit `-----BEGIN CERTIFICATE` beginnt. Behalten Sie dieses Format bei und prüfen Sie die Build-Warnungen auf übersprungene Dateien.

<div align="center"><em>Tabelle: Finsh-Befehle des PAN-Beispiels</em></div>

<div align="center" markdown>

| Befehl | Wirkung |
|:--------|:-------|
| `pan_cmd conn_pan` | Mit PAN verbinden, nachdem die Netzwerkfreigabe des Telefons aktiviert wurde. |
| `pan_cmd ota_pan` | Das in `main.c` angegebene Firmware-Image über die PAN-Verbindung herunterladen und installieren. |
| `pan_cmd set_retry_flag 1` / `0` | Die automatische PAN-Wiederverbindung aktivieren oder deaktivieren. |
| `pan_cmd set_retry_time N` | Die maximale Anzahl automatischer Wiederverbindungsversuche festlegen. |
| `pan_cmd autoconnect` | Manuell einen Wiederverbindungsversuch auslösen, nachdem das Telefon die Verbindung getrennt und die Freigabe erneut aktiviert hat. |

</div>

Prüfen Sie vor dem Start des Beispiels diese Einstellungen anhand der versionsgebundenen README und Ihrer Zielplattform:

- Aktivieren Sie `CONFIG_BLUETOOTH`, `CONFIG_BT_PROFILE_CUSTOMIZE`, `CONFIG_CFG_PAN` und `CONFIG_BSP_BT_CONNECTION_MANAGER`. Das Beispiel aktiviert außerdem A2DP, um das dokumentierte iOS-Problem beim alleinigen Verbindungsaufbau mit PAN zu umgehen. A2DP ist keine Anforderung des PAN-Protokolls.
- `CONFIG_BT_FINSH` aktiviert optionale Bluetooth-Steuerbefehle. Behalten Sie die Shell-Funktionen bei, die für Ihre Testbefehle benötigt werden.
- Setzen Sie `CONFIG_BSP_BLE_NVDS_SYNC` entsprechend dem Prozessor, auf dem Bluetooth läuft: Die README aktiviert es für HCPU und deaktiviert es für LCPU. Übernehmen Sie eine Konfiguration mit anderer Prozessoraufteilung nicht unverändert.
- Prüfen Sie für die Wiederverbindung mit dem letzten Gerät `CONFIG_BT_AUTO_CONNECT_LAST_DEVICE` und `CONFIG_PKG_USING_FLASHDB`. Testen Sie die Speicherung über Neustarts hinweg und begrenzen Sie die Verbindungsversuche mit den oben aufgeführten Wiederholungseinstellungen, statt unbegrenzt erneut zu versuchen.

## Unterstützung und Produktvalidierung für Smartphone-Betriebssysteme { #mobile-phone-os-support-and-qualification }

Das Telefon übernimmt die Rolle des PAN-**NAP** und ist Teil des Netzwerkpfads des Produkts, nicht bloß ein Werkzeug zur Ersteinrichtung. Betriebssystem, Modell, Mobilfunktarif und Tethering-Richtlinie gehören daher zur unterstützten Produktkonfiguration. Eine erfolgreiche Bluetooth-Kopplung genügt nicht: Das Telefon muss einen Bluetooth-Tethering-/PAN-Dienst bereitstellen und nach der PANU-Verbindung den Datenverkehr weiterleiten.

<div align="center"><em>Tabelle: Bluetooth-PAN-Unterstützung nach Smartphone-Betriebssystem</em></div>

<div align="center" markdown>

| Mobiles Betriebssystem | Dokumentierte Plattformangaben | Erste Schritte mit SF32 | Für das Produkt zu validieren |
|:----------|:----------------------------|:-----------------------|:-------------------------------|
| **iOS / iPadOS mit Mobilfunkdienst** | Laut [Apples Dokumentation zum persönlichen Hotspot](https://support.apple.com/guide/iphone/share-your-internet-connection-iph45447ca6/27/ios/27) ist Bluetooth eine Verbindungsmethode. Der persönliche Hotspot teilt die mobile Internetverbindung des Telefons. | Folgen Sie dem [SiFli-Xiaozhi-iOS-Pfad](https://docs.sifli.com/projects/xiaozhi/get-started/): Verwenden Sie ein Telefon mit aktivem Mobilfunkdienst, aktivieren Sie vor dem Koppeln den persönlichen Hotspot, lassen Sie Bluetooth eingeschaltet und koppeln Sie das SF32-Gerät. Wird `sifli-pan` nicht angezeigt, kann laut SiFli-Leitfaden ein Neustart des Telefons helfen. | Verfügbarkeit des persönlichen Hotspots, Datenlimits und Anzahl verbundener Geräte hängen vom Mobilfunkanbieter und iPhone-Modell ab. Testen Sie alle unterstützten iOS-/iPadOS-Versionen, Gerätekategorien und Tarife. Leiten Sie PAN-Unterstützung nicht allein daraus ab, dass der WLAN-Hotspot funktioniert. |
| **Android** | Laut [Android-Hilfe](https://support.google.com/android/answer/9059108) können die meisten Android-Telefone mobile Daten über Bluetooth teilen: Koppeln Sie zuerst die Geräte, konfigurieren Sie die Bluetooth-Netzwerkverbindung des anderen Geräts und aktivieren Sie anschließend **Bluetooth tethering** (Bluetooth-Tethering). | Aktivieren Sie Bluetooth-Tethering vor `pan_cmd conn_pan`. Namen und Menüpositionen der Einstellungen unterscheiden sich je nach Hersteller, Android-Version und Unternehmensrichtlinie. Dokumentieren Sie den genauen Pfad für jedes getestete Telefon. | Google zufolge ist die Funktion auf *den meisten*, aber nicht allen Android-Telefonen verfügbar. Mobilfunkanbieter können Tethering einschränken oder dafür Gebühren erheben; Hersteller können die Einstellung verbergen oder ändern. Testen Sie die vorgesehenen Telefon-/OS-/Anbieter-Kombinationen, statt sich allein auf die Android-Version zu verlassen. |
| **HarmonyOS und andere von Android abgeleitete mobile Systeme** | Dieser Leitfaden macht für diese Systeme keine allgemeine Aussage zur PAN-Unterstützung. Bluetooth- und Tethering-Implementierungen können zwar von Android abgeleitet sein, sich aber je nach Modell, Markt, Version, Anbieterkonfiguration oder Geräteverwaltungsrichtlinie unterscheiden. | Suchen Sie die Bluetooth-Tethering-Einstellung, koppeln Sie Telefon und SF32-Gerät und weisen Sie mit dem PAN-Beispiel tatsächlichen IP-Verkehr nach. | Behandeln Sie jede konkrete Telefon-/OS-Build-/Regions-/Anbieter-Kombination als **noch zu validieren**, bis sie dieselben Prüfungen wie Android bestanden hat. Leiten Sie Unterstützung weder allein aus der Marke noch aus erfolgreichem Bluetooth-Pairing ab. |

</div>

### Telefonseitige Einrichtung { #phone-side-setup }

<div align="center"><em>Abbildung: Beispielhafte Positionen der Einstellungen für den iOS-Hotspot und Android-Bluetooth-Tethering</em></div>

![Beispielhafte iOS-Personal-Hotspot- und Android-Bluetooth-Tethering-Einstellungen](assets/mobile-hotspot-switches-illustrative.png)

Die Abbildung dient als Orientierung und zeigt keinen originalen Betriebssystem-Screenshot. Bezeichnungen und Menüpositionen unterscheiden sich je nach iOS-/iPadOS-Version, Android-Hersteller und Verwaltungsrichtlinie. Suchen Sie unter iOS/iPadOS nach **Allow Others to Join** („Verbindung für andere erlauben“) und unter Android nach **Bluetooth tethering** („Bluetooth-Tethering“). Der [iOS-Screenshot von SiFli v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md) zeigt außerdem die aktivierte Option **Maximize Compatibility**. Das ist eine beispielhafte Telefoneinstellung, keine PAN-Anforderung; prüfen Sie für jedes Zielgerät, ob sie benötigt wird.

Prüfen Sie jedes Telefon anhand dieser Schritte:

1. Prüfen Sie die Internetverbindung des Telefons. Apples Persönlicher Hotspot teilt die Mobilfunkverbindung; der Tarif muss Tethering erlauben. Manche Android-Telefone können auch eine WLAN-Verbindung teilen. Prüfen Sie diese Funktion jedoch für das konkrete Modell und den OS-Build.
2. Aktivieren Sie die Bluetooth-Tethering- oder Hotspot-Funktion des Telefons, **bevor** Sie PAN vom SF32-Gerät anfordern.
3. Koppeln Sie Telefon und Gerät, und halten Sie das Telefon auffindbar, wenn das Betriebssystem dies verlangt.
4. Führen Sie `pan_cmd conn_pan` aus und prüfen Sie tatsächlichen IP-Datenverkehr, etwa mit dem Befehl `weather`. Eine erfolgreiche Bluetooth-Verbindung allein genügt nicht.
5. Deaktivieren Sie die Freigabe, versetzen Sie das Telefon in den Ruhezustand und aktivieren Sie es wieder. Entfernen Sie es außerdem aus der Funkreichweite und prüfen Sie, ob das vorgesehene Wiederverbindungsverhalten funktioniert.

Wird die Freigabe erst aktiviert, nachdem die Bluetooth-Verbindung bereits besteht, verbinden Sie PAN explizit mit `pan_cmd conn_pan` erneut.

### Unterstützte Smartphone-Kombinationen festlegen { #define-a-shipping-phone-support-matrix }

Geben Sie für ein Endkundenprodukt die unterstützten Kombinationen aus **Telefonmodell + Betriebssystemversion + Mobilfunkanbieter/Region** an, nicht pauschal nur „iOS“ oder „Android“. Dokumentieren Sie für jedes getestete Modell mindestens Telefonmodell, OS-Build, Anbieter, aktiven Mobilfunkdienst und SIM-/eSIM-Status, Bezeichnung der Tethering-Einstellung, Zeit bis zur ersten Verbindung, Wiederverbindung nach Bildschirmsperre oder Funkverlust, Ergebnis bei anhaltendem Datenverkehr und erforderliche Nutzeraktionen zur Wiederherstellung. Wiederholen Sie die Tests nach jeder Änderung an App, PAN-Firmware, Telefon-OS oder Anbieterprofil.

## OTA-Übertragung über PAN { #pan-based-ota-delivery }

Im PAN-Beispiel ist OTA standardmäßig aktiviert. Mit `pan_cmd ota_pan` wird ein Firmware-Image über dieselbe Bluetooth-PAN-Verbindung heruntergeladen und installiert, die bereits für den Netzwerkverkehr dient. Dabei kommt der DFU_PAN-OTA-Pfad zum Einsatz, der zusammen mit dem Firmware-Upgrade-Dienst von SiFli-SDK dokumentiert ist. Das eignet sich für Produkte, die PAN bereits für die Datenübertragung nutzen und keinen zusätzlichen OTA-Transport benötigen. Unter [OTA und DFU](../../develop/firmware-topics/ota-dfu.md) werden PAN, BLE und andere Update-Transportwege verglichen. Planen Sie Rollback und Wiederherstellung unabhängig vom Transport auf dieselbe Weise.

Die README beschreibt außerdem einen Build-Fehler, wenn dem gewählten Ziel eine passende OTA-`ptab.json` fehlt. Die Screenshots zeigen, wie DFU-Unterprojekt und Firmware-Update-Unterstützung der Middleware deaktiviert werden, um das Beispiel ohne OTA zu testen. Diese Diagnose entfernt OTA und ist keine Auslieferungsstrategie für ein Produkt mit Update-Anforderung. Stellen Sie vor der Aktivierung des OTA-Pfads das passende Partitionslayout und die Update-Konfiguration bereit und validieren Sie beides.

PAN stellt einen Transportweg bereit, belegt aber weder die Authentizität der Firmware noch gewährleistet es eine sichere Wiederherstellung. Prüfen Sie vor der Auslieferung Serverauthentifizierung, Authentizität und Integrität des Images, Ziel- und Versionskompatibilität sowie die Wiederherstellung nach Unterbrechungen. Testen Sie Verbindungs- und Stromausfälle und prüfen Sie das tatsächliche Wiederherstellungs- oder Rollback-Verhalten des Bootloaders, statt es dem Download-Befehl zu unterstellen.

## Beispiel eines SF32-Produkts mit PAN { #a-real-sf32-product-using-pan }

Das Projekt [SF32-Sprachassistent Xiaozhi](../../projects/sf32-xiaozhi.md) zeigt PAN in einem funktionsfähigen SF32-Produkt: Über Bluetooth PAN erhält das Gerät via gekoppeltem Telefon Internetzugang und überträgt Sprachdaten an einen Cloud-Dienst. Das Projekt veranschaulicht, wie PAN-Netzwerkzugang, WebSocket-/HTTP-Anwendungsverkehr und die Abhängigkeit vom Tethering des Telefons im Produkt zusammenspielen.

## Fehlerbehebung { #troubleshooting }

Die README nennt außerdem die Bluetooth-Adressvergabe als Prüfpunkt. Lesen Sie die Adresse mit `nvds get_mac` aus. Verwenden Sie nur eine Ihrer Organisation zugewiesene oder für das Produkt autorisierte OUI und vergeben Sie eindeutige Geräteadressen. Kopieren Sie keine fremde Hersteller-OUI aus einem Beispiel. Bei `nvds update addr 6 xxxxxxYYYYYY` ist `YYYYYY` die OUI in umgekehrter Byte-Reihenfolge; `xxxxxx` steht für die übrigen drei Adressbytes. Beachten Sie die Byte-Reihenfolge des Befehls, statt eine angezeigte MAC-Adresse unverändert einzufügen.

`CONFIG_NVDS_AUTO_UPDATE_MAC_ADDRESS` kann manuelle Änderungen überschreiben. Bleibt eine autorisierte Testadresse nach einem Neustart nicht erhalten, empfiehlt die README, diese Option zu deaktivieren, die Firmware neu zu bauen und zu flashen und die Adresse erneut zu setzen. Das ist eine Diagnose für Tests, keine Adressvergabestrategie für die Produktion. Validieren Sie die vorgesehene automatische oder werkseitige Vergabe über Neustarts hinweg vor der Auslieferung.

<div align="center"><em>Tabelle: Fehlerbehebung bei Bluetooth PAN</em></div>

<div align="center" markdown>

| Symptom | Prüfungen und Maßnahmen |
|:--------|:--------------|
| PAN verbindet sich, aber Netzwerkbefehle (z. B. `weather`) schlagen fehl | Prüfen Sie BNEP-Verbindungsaufbau, zugewiesene IP-Adresse, Route, DNS, Serververfügbarkeit und gegebenenfalls TLS-Fehler. Die README empfiehlt außerdem die Prüfung der Bluetooth-MAC-OUI mit `nvds get_mac`. Ändern Sie sie mit `nvds update addr 6 ...` nur gemäß einer autorisierten Vergabestrategie. Eine ungültige OUI ist nicht die einzige mögliche Ursache. |
| Das Telefon erkennt das Gerät nicht oder kann keine Verbindung herstellen | Prüfen Sie, ob Tethering bzw. Netzwerkfreigabe des Telefons *vor* dem Verbindungsaufbau aktiviert wurde und das Gerät auffindbar ist (Inquiry/Page Scan aktiv). |
| Das Telefon wird gekoppelt, aber `weather` oder eine andere IP-Operation schlägt fehl | Eine Kopplung belegt noch keinen PAN-NAP-Dienst. Prüfen Sie Bluetooth-Tethering bzw. den persönlichen Hotspot und die Internetverbindung des Telefons. Bei Mobilfunk muss der Anbieter Tethering erlauben; bei Android-WLAN-Freigabe müssen Modell und OS diese Funktion unterstützen. Gleichen Sie die getestete Kombination mit der Unterstützungsmatrix ab. |
| PAN wird nach einer Änderung des Netzwerkzustands am Telefon getrennt | Das kann vorkommen; prüfen Sie das Verhalten für jedes unterstützte Telefon. Verbinden Sie sich mit `pan_cmd conn_pan` erneut oder aktivieren Sie `pan_cmd set_retry_flag 1`. Begrenzen Sie automatische Versuche mit der oben beschriebenen Wiederholungsgrenze. |
| OTA über PAN schlägt während der Übertragung fehl | Gehen Sie wie bei jedem anderen OTA-Transport vor: Prüfen Sie die URL des Firmware-Images, das Partitionslayout sowie Rollback und Wiederherstellung gemäß [OTA und DFU](../../develop/firmware-topics/ota-dfu.md), statt PAN selbst als Ursache anzunehmen. |

</div>

## Inbetriebnahme-Checkliste { #bring-up-checklist }

- [ ] Prüfen Sie Bluetooth-Classic-Hardware und PAN-Stack/Konfiguration für das konkrete SDK und Board. Das Referenzbeispiel nennt SF32LB52x/56x/58x; validieren Sie SF32LB57x separat. SF32LB55x unterstützt nur BLE.
- [ ] Entscheiden Sie, ob die Abhängigkeit von der Tethering-Verbindung eines Telefons zum Konnektivitätsmodell des Produkts passt oder ob ein eigener WLAN-Funk erforderlich ist.
- [ ] Nehmen Sie `example/bt/pan` auf dem Zielboard in Betrieb und prüfen Sie die Tethering-Einrichtung am Telefon (persönlicher Hotspot bei iOS/iPadOS oder Bluetooth-Tethering bei Android).
- [ ] Validieren Sie durchgängig eine echte PAN-Verbindung und mindestens einen Netzwerkvorgang (z. B. den `weather`-Befehl des Beispiels).
- [ ] Testen Sie alle vorgesehenen Telefonmodelle, OS-Builds, Regionen und Anbietertarife sowie die jeweiligen Tethering-Einstellungen. Werben Sie nicht pauschal mit „iOS/Android unterstützt“.
- [ ] Prüfen Sie vor der Nutzung der Netzwerkfunktion, ob die OUI der Bluetooth-MAC-Adresse des Geräts gültig ist.
- [ ] Testen Sie bei OTA über PAN den vollständigen `pan_cmd ota_pan`-Pfad einschließlich Rollback und Wiederherstellung vor der Auslieferung.
- [ ] Legen Sie das Verhalten beim Wiederverbinden und bei automatischen Verbindungsversuchen (`set_retry_flag`, `set_retry_time`) danach aus, wie oft das Produkt ein Telefon in Reichweite erwartet.

## Wichtigste Erkenntnisse { #key-takeaways }

- Bluetooth PAN überträgt IP- bzw. Ethernet-ähnlichen Verkehr über BR/EDR mit BNEP über L2CAP. BLE-Unterstützung ist nicht erforderlich. IPv6 über BLE nutzt das separate IPSP-Profil, nicht PAN, und setzt nachgewiesene Stack- und Gateway-Unterstützung voraus.
- SF32-Geräte verwenden die Client-Rolle **PANU** und verbinden sich typischerweise über Tethering oder den persönlichen Hotspot mit einem Telefon in der Rolle **NAP**.
- Unter iOS können BLE-Zubehörgeräte Core Bluetooth ohne MFi verwenden. Ein benutzerdefinierter Datenkanal zwischen App und Bluetooth-Classic-Zubehör über External Accessory/iAP erfordert dagegen MFi. PAN verwendet den Tethering-Dienst des Telefons, sodass das SF32-Gerät seinen eigenen IP-Client statt einer BLE-Weiterleitung über die App nutzen kann.
- Das referenzierte PAN-Beispiel nennt SF32LB52x/56x/58x als Ziele. SF32LB57x besitzt Dual-Mode-Hardware, erfordert aber eine separate Prüfung von PAN-Stack und Board. SF32LB55x unterstützt nur BLE und kann PAN nicht ausführen.
- `example/bt/pan` in SiFli-SDK ist eine funktionsfähige Referenzimplementierung mit Finsh-Befehlen zum Verbinden, Wiederverbinden und für OTA über PAN.
- Telefongebundenes PAN eignet sich für gelegentlichen oder moderaten IP-Datenverkehr, wenn meist ein Telefon in der Nähe ist. Für dauerhaft hohe Datenraten oder telefonunabhängigen Betrieb prüfen Sie dediziertes WLAN oder einen anderen unabhängigen Netzwerkweg. Auch ein NAP-Gateway ohne Telefon ist möglich.
