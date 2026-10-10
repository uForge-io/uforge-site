---
icon: lucide/upload-cloud
description: "Verwendung der SiFli-SDK DFU-v2-Middleware für Firmware-Updates über USB-CDC, BLE und Bluetooth PAN, mit den dokumentierten Anwendungs- und Loader-Beispielpaaren."
tags:
    - Entwicklung
    - OTA
    - DFU
---

# OTA und DFU { #ota-and-dfu }

DFU v2 ist die Firmware-Update-Middleware des SiFli-SDK für DFU- und OTA-Abläufe. Sie stellt drei Übertragungswege bereit: USB-CDC, BLE und Bluetooth PAN. Zu jedem Weg gehören eine Benutzeranwendung und ein passendes Loader-Subprojekt.

Wählen Sie zunächst den Übertragungsweg passend zum Update-Pfad des Produkts. Beginnen Sie anschließend mit dem zugehörigen Anwendungsbeispiel; der passende Loader wird automatisch in den Build eingebunden.

## DFU-v2-Struktur { #dfu-v2-structure }

<div align="center"><em>Abbildung: DFU-v2-Beispielstruktur</em></div>

```text
dfu_v2/
├── cdc/       USB-CDC channel
│   ├── app/       User application and PC update tool
│   └── loader/    CDC DFU loader
├── ble/       BLE channel
│   ├── app/       BLE peripheral application
│   └── loader/    BLE DFU loader
└── bt_pan/    Bluetooth PAN channel
    ├── app/       Application that downloads firmware from a server
    └── loader/    PAN DFU loader
```

Anwendung und Loader sind für jeden Übertragungsweg auf den gemeinsamen Einsatz ausgelegt. Beim Build der Anwendung bindet das SDK über die `AddDFU_*`-Logik in `building.py` den passenden Loader als Subprojekt ein; ein separater Build des Loaders ist nicht erforderlich. Im BLE-Beispiel kann die laufende Anwendung andere Firmware-Images als das HCPU-Firmware-Image aktualisieren; für ein HCPU-Firmware-Image muss zum Loader gewechselt werden.

## Kompatibilität und Konfiguration { #compatibility-and-configuration }

DFU v2 ist standardmäßig deaktiviert und muss in der Middleware-Konfiguration mit `USING_DFU_V2` ausdrücklich aktiviert werden. Es ist nur auf der HCPU (`BF0_HCPU`) verfügbar und kann nicht zusammen mit den älteren DFU-Optionen `BSP_USING_DFU` oder `USING_DFU_PAN` aktiviert werden. Bei aktivierter DFU-v2-Konfiguration wird FlashDB (`PKG_USING_FLASHDB`) für fortsetzbare Übertragungen ausgewählt.

USB CDC und BLE sind Push-Transportwege und schließen sich gegenseitig aus; wählen Sie `DFU_V2_USE_CDC_TRANSPORT` oder `DFU_V2_USE_BLE_TRANSPORT`. Bluetooth PAN verwendet einen Pull-Transportweg; aktivieren Sie `DFU_V2_USE_PAN_TRANSPORT` zusammen mit dem vom Gerät initiierten Modus (`DFU_V2_USE_DEVICE_MODE`) und WebClient. Prüfen Sie vor der Festlegung der Update-Architektur die Optionen der verwendeten SDK-Version.

## Einen Update-Kanal wählen { #choose-an-update-channel }

<div align="center"><em>Tabelle: Auswahl des DFU-v2-Transports</em></div>

<div align="center" markdown>

| Kanal | Dokumentierter Update-Pfad | Typischer Einsatzbereich |
| --- | --- | --- |
| USB-CDC | Ein PC aktualisiert das Gerät über eine virtuelle serielle USB-Schnittstelle. | Produktion, Labor und kabelgebundene Wartung. |
| BLE | Eine BLE-Anwendung im Peripheral-Modus empfängt ein Update. | Eine mobile App aktualisiert ein verbundenes Produkt. |
| Bluetooth PAN | Das Gerät lädt über ein Bluetooth-PAN-Netzwerk ein Update von einem HTTP-Server herunter. | Vernetzte Produkte, die ihr eigenes Update-Image abrufen. |

</div>

## Produkt-Update-Konzept prüfen { #product-update-review }

- [ ] Der gewählte Transport passt zum verfügbaren Verbindungspfad des Produkts.
- [ ] Die Anwendung und der passende Loader werden als ein einziger Update-Ablauf gebaut und getestet.
- [ ] Das unterstützte Ziel-Board ist im README des jeweiligen Beispiels bestätigt.
- [ ] Verhalten bei Update-Unterbrechungen, Wiederherstellung und Service im Werk sind für das Produkt definiert.
- [ ] Authentizität und Integrität des Firmware-Images, Versionsrichtlinie und Partitionskapazität sind für das Produkt-Release geprüft.
- [ ] Protokolle zu fehlgeschlagenen Updates lassen sich erfassen, ohne auf eine funktionsfähige Anwendung angewiesen zu sein.

## Ein DFU-v2-Beispiel bauen { #build-a-dfu-v2-example }

Führen Sie im `project/`-Verzeichnis eines Beispiels folgenden Build aus:

```bash
scons --board=<board-name> -j8
```

Die unterstützten Boards sind im README des jeweiligen Beispiels aufgeführt. Die Konfiguration der DFU-v2-Middleware befindet sich im SiFli-SDK unter `middleware/dfu_v2`.

## DFU-v2-SDK-Beispiele { #dfu-v2-sdk-examples }

<div align="center"><em>Tabelle: Offizielle SiFli-SDK-DFU-v2-Beispiele für SF32LB58x</em></div>

<div align="center" markdown>

| Kanal | Benutzeranwendung | Loader-Subprojekt |
| --- | --- | --- |
| USB-CDC | [`cdc/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/app/README.html) | [`cdc/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/loader/README.html) |
| BLE | [`ble/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/app/README.html) | [`ble/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/loader/README.html) |
| Bluetooth PAN | [`bt_pan/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/app/README.html) | [`bt_pan/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/loader/README.html) |

</div>

Den vollständigen Quellenindex und die aktuelle SDK-Navigation finden Sie unter [DFU-v2-Beispiele in SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/index.html).
