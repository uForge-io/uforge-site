---
icon: lucide/usb
description: "Einsatz der SF32-USB-Hardware mit CherryUSB: CDC-, HID-, MSC-, Audio- und MTP-Anwendungsfälle, Deskriptor-Checkliste und betriebssystemübergreifende Enumerationstests."
tags:
    - Entwicklung
    - USB
---

# USB und CherryUSB { #usb-and-cherryusb }

Bei SF32-Geräten und Boards mit unterstützter USB-Hardware zeigen die SiFli-SDK-Dokumentation und Beispiele die Integration mit CherryUSB. Prüfen Sie die vom konkreten Chip, Board und SDK-Release unterstützten USB-Rollen und -Klassen, und betrachten Sie USB als vollständigen Software-Stack statt nur als Hardwarefunktion.

Bei USB müssen Firmware, Deskriptoren, Host-Betriebssysteme, Energieverhalten und Produktionswerkzeuge gemeinsam berücksichtigt werden. Wird ein Gerät auf dem Entwicklungs-Laptop einmal erfolgreich enumeriert, ist die Arbeit noch nicht abgeschlossen.

## Anwendungsfälle { #use-cases }

- Serielle Kommunikation über USB CDC.
- HID-Geräte.
- MSC-Speicher.
- USB-Audio: Mikrofon/Lautsprecher.
- MTP.
- USB-Host-Unterstützung für CDC-, HID-, MSC-, UVC- und UAC-Peripheriegeräte, sofern SDK und Board dies unterstützen.

## Praktischer Arbeitsablauf { #practical-workflow }

1. Prüfen Sie, ob das Board den benötigten USB-Anschluss und den passenden Versorgungspfad bereitstellt.
2. Beginnen Sie mit dem SDK-USB-Beispiel, das dem Anwendungsfall am nächsten kommt.
3. Testen Sie die USB-Enumeration unter Windows, macOS und Linux.
4. Prüfen Sie Suspend/Resume sowie das Verhalten nach erneutem Anschließen des Kabels.
5. Dokumentieren Sie VID/PID, Deskriptoren und Anforderungen an Host-Treiber.

## Was zu testen ist { #what-to-test }

- Vor dem Einschalten anschließen; im laufenden Betrieb ein- und ausstecken.
- Zurücksetzen bei bestehender Verbindung.
- Ruhezustand und Reaktivierung des Hosts.
- Kabeltrennung während der Übertragung.
- USB-Enumeration unter Windows, macOS und Linux.
- Verhalten von Composite-Geräten, falls mehrere Klassen aktiviert sind.
- Benutzer darauf hinweisen, dass reine Ladekabel keine Datenkommunikation unterstützen.

## Deskriptor-Checkliste { #descriptor-checklist }

- Die VID/PID-Zuordnung ist eindeutig geklärt.
- Der Produktstring ist final oder versioniert.
- Das Verhalten der Seriennummer ist definiert.
- Class-/Subclass-/Protocol-Werte passen zum vorgesehenen Host-Treiber.
- Composite-Schnittstellen bleiben über Firmware-Updates hinweg stabil.

## SDK-Beispiele { #sdk-examples }

Der [offizielle SiFli-SDK-CherryUSB-Beispielindex](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/index.html) führt Beispiele für USB-Geräte und USB-Hosts getrennt auf. Beginnen Sie mit dem Beispiel, das zur vorgesehenen USB-Rolle und -Klasse passt, und übernehmen Sie dessen Prüfungen zu Deskriptoren, Stromversorgung und Host-Kompatibilität in die Produktimplementierung.

<div align="center"><em>Tabelle: SiFli-SDK-CherryUSB-Beispiele für SF32LB58x</em></div>
<div align="center" markdown>

| USB-Rolle | Beispiel | Ausgangspunkt |
| --- | --- | --- |
| Gerät | [USB-Mikrofon](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic/README.html) | USB-Audio-Class-1-Mikrofon |
| Gerät | [USB-Mikrofon und -Lautsprecher](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic_speaker/README.html) | Bidirektionales Audio nach USB Audio Class 1 |
| Gerät | [CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm/README.html) | USB-Kommunikationsgerät |
| Gerät | [CDC ACM UART](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm_uart/README.html) | USB-UART-Brücke |
| Gerät | [CDC + HID + MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_hid_msc/README.html) | Zusammengesetztes USB-Gerät |
| Gerät | [HID-Maus](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/hid_mouse/README.html) | USB-HID-Zeigegerät |
| Gerät | [MSC mit NOR-Flash](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/nor_flash_disk/README.html) | Massenspeicher mit NOR-Flash als Speicher |
| Gerät | [MSC mit RAM-Disk](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk/README.html) | Massenspeicher mit RAM als Speicher |
| Gerät | [MSC mit zwei RAM-Disks](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk_dual/README.html) | Zwei logische Einheiten mit RAM als Speicher |
| Gerät | [MSC mit SD/eMMC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/sdcard_disk/README.html) | Massenspeicher mit SD-Karte oder eMMC als Speicher |
| Gerät | [MTP mit DFS und RAM-Disk](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/mtp/README.html) | Media-Transfer-Protocol-Gerät |
| Host | [CDC-ACM-Host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/cdc_acm_host/README.html) | Kommunikation mit einem CDC-ACM-Gerät |
| Host | [HID-Host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/hid/README.html) | HID-Gerät anschließen und Eingaben auslesen |
| Host | [MSC-Host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/msc_host/README.html) | USB-Massenspeicher anschließen |
| Host | [UVC + UAC Host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/uvc_uac_host/README.html) | USB-Geräte der Video- und Audio-Klasse |

</div>
