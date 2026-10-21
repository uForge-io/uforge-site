---
icon: lucide/list
description: "AT-Befehlsreferenz für das Dual-Mode-Bluetooth-Modul SF32LB57 (SIFLI_AT): Framing, Kopplung, Verbindungen, Datenübertragung, GATT, URCs und PDU-Befehle."
tags:
  - Bluetooth
---

# AT-Befehlssatz { #at-command-reference }

<div align="center"><em>Tabelle: Dokumentinformationen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Version | V1.2.1 |
| Datum | 2026-07-28 |
| Anwendbares Modul | SF32LB57 Dual-Mode-Bluetooth-Modul (SIFLI_AT) |

</div>

Diese Referenz dokumentiert die externe AT-Befehlsschnittstelle des SF32LB57-Dual-Mode-Bluetooth-Moduls (SIFLI_AT) in Version V1.2.1. Befehle und Antwortzeichenketten sind in Monospace-Schrift dargestellt; `\r` steht für einen Wagenrücklauf (0x0D), `\n` für einen Zeilenvorschub (0x0A). AT-Befehle werden als ASCII-Text übertragen; binäre Felder in PDU-Rahmen verwenden Little-Endian-Byte-Reihenfolge.

Dies ist die vollständige AT-Schnittstellenspezifikation, auf die von der Seite Bluetooth-AT-Befehlsmodul verwiesen wird.

<div align="center"><em>Tabelle: Versionshistorie</em></div>

<div align="center" markdown>

| Version | Änderungen | Datum |
|:--------|:--------|:-----|
| V1.2.1 | SF32LB57 V1.2.1: `AT+CFGRESET` hinzugefügt; Synchronisierung des Classic-Bluetooth-Namens beim Start, `CLEARLINKKEY`, Verbindungs-Handle und PDU-Dokumentation aktualisiert; BQB-Build-Konfiguration aktiviert. | 2026-07-28 |

</div>

## Übersicht { #overview }

Das SF32LB57-Dual-Mode-Bluetooth-Modul stellt dem Host eine UART-basierte AT-Befehlsschnittstelle für BLE und Classic Bluetooth (BR/EDR) bereit. Über AT-Befehle kann der Host Geräteparameter konfigurieren, Verbindungen verwalten, Daten senden und empfangen sowie unaufgeforderte Statusmeldungen des Moduls erhalten.

### Standardeinstellungen { #default-settings }

<div align="center"><em>Tabelle: Standardeinstellungen</em></div>

<div align="center" markdown>

| Element | Standardwert |
|:-----|:----------------|
| Gerätename | `SIFLI_AT` |
| Baudrate der seriellen Schnittstelle | 460800 bps |
| Befehls-/Transparenzmodus | Transparenzmodus |
| Bluetooth-Betriebsmodus | Dual-Mode (BLE+BT) |
| Ereignisbenachrichtigung | Normale Benachrichtigung |
| MAC-Suffix im Gerätenamen | Aus |
| Class of Device (COD) | `000000` |
| BLE-MTU-Obergrenze | 247 |
| Hauptschalter für Mehrfachverbindung | Ein (1) |
| Leerlauf-Trennzeit im Transparenzmodus | 0 (aus) |
| Automatisches GATT-Laden beim Einschalten | Ein |
| BLE-Zufallsadresse | Aus (verwendet öffentliche Adresse) |
| Bluetooth-Adresse | Automatisch aus Chip-UID generiert |

</div>

## Befehlsformat { #command-format }

### Syntaxdefinition { #syntax-definition }

AT-Befehle werden als ASCII-Text übertragen und mit einem Wagenrücklaufzeichen `\r` (0x0D) abgeschlossen. Das Befehlspräfix ist `AT+` (AT-Format-Befehle) oder `AT>` (PDU-Format-Befehle). Beim SF32LB57 ist der AT-Port USART1; er verwendet 8N1 ohne Hardware-Flusskontrolle und standardmäßig 460800 Baud. Ein einzelner AT-Frame ist auf 512 Byte begrenzt.

### AT-Format-Befehle { #at-format-commands }

<div align="center"><em>Tabelle: AT-Format-Befehlsformen</em></div>

<div align="center" markdown>

| Form | Befehl | Beschreibung |
|:-----|:--------|:-------------|
| Abfrage | `AT+<CMD>?\r` | Einen Parameter oder Status abfragen |
| Setzen | `AT+<CMD>=<param>[,<param>...]\r` | Einen Parameter setzen |
| Ausführen | `AT+<CMD>\r` | Eine Aktion ausführen |

</div>

<div align="center"><em>Tabelle: AT-Format-Antworten</em></div>

<div align="center" markdown>

| Ergebnis | Antwortzeichenkette |
|:-------|:------------------|
| Erfolg | `\r\nOK\r\n` |
| Fehlschlag | `\r\nERROR\r\n` oder `\r\nFALSE\r\n` |
| Rückgabewert einer Abfrage | `\r\n+<CMD>:<value>\r\n\r\nOK\r\n` |

</div>

### Aufbau des PDU-Befehlsrahmens { #pdu-format-command-framing }

PDU-Befehle übertragen binäre Nutzdaten, während sich das Modul im Befehlsmodus befindet. Sofern nicht anders angegeben, sind numerische Felder innerhalb eines Frames Little-Endian, und `data` sind rohe Binärdaten.

**Befehl (Host → Modul)**

```
'A' 'T' '>' <Opcode(2 bytes)> <Total Length(2 bytes)> [Body] '\r'
```

<div align="center"><em>Tabelle: Aufbau des PDU-Befehlsrahmens</em></div>

<div align="center" markdown>

| Element | Beschreibung |
|:--------|:-------------|
| `AT>` | Befehlspräfix, 3-Byte-ASCII |
| Opcode | 2-Byte-Little-Endian-Operationscode. `0x0101`, `0x0102` |
| Gesamtlänge | Gesamtbytezahl von Body, 2-Byte-Little-Endian |
| Body | Nutzdaten; Struktur hängt vom Opcode ab |
| `\r` | 1-Byte-Befehlsabschlusszeichen |

</div>

**Meldung (Modul → Host)**

```
'\r' '\n' '<' <Opcode(2 bytes)> <Total Length(2 bytes)> [Data] '\r' '\n'
```

## Befehle und Antworten { #commands-and-responses }

Die folgenden Befehle sind nach Funktionsbereich gruppiert und folgen denselben Kategorien wie die Übersicht auf der Seite Bluetooth-AT-Befehlsmodul.

### System und Gerät { #system-and-device }

#### Firmware-Version abrufen { #get-firmware-version }

<div align="center"><em>Tabelle: Firmware-Version abrufen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GFWVER?\r` |
| Antwort | Erfolg: `\r\n+GFWVER:SIFLI_AT_<version>_<build date>\r\n\r\nOK\r\n`; bei jedem Schreibversuch: `\r\nERROR\r\n` |
| Parameter | Keine |
| Hinweise | Nur Abfrage. Der Rückgabewert beginnt immer mit `SIFLI_AT_`, gefolgt von Versionsnummer und Build-Datum. |

</div>

#### Gerätenamen abfragen { #query-device-name }

<div align="center"><em>Tabelle: Gerätenamen abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+NAME?\r` |
| Antwort | `\r\n+NAME:<device name>\r\n\r\nOK\r\n` |
| Parameter | Keine |
| Hinweise | Gibt den aktuell eingestellten Gerätenamen ohne MAC-Suffix zurück. Das Suffix wirkt sich nur auf den in Advertising-Paketen sichtbaren Namen aus. |

</div>

#### Gerätenamen setzen { #set-device-name }

<div align="center"><em>Tabelle: Gerätenamen setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+NAME=<device name>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | Gerätename: eine Zeichenkette mit 1–29 Byte Länge; leer oder über 29 Byte gibt `ERROR` zurück. Standard `SIFLI_AT`. |
| Hinweise | Aktualisiert den Gerätenamen und übernimmt ihn in den lokalen Namen sowie den BLE-Scan-Response-Namen. `MACNAME` steuert den Namen, der letztlich ausgesendet wird. |

</div>

#### MAC-Suffix im Gerätenamen abfragen { #query-mac-name-suffix-switch }

<div align="center"><em>Tabelle: MAC-Suffix im Gerätenamen abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+MACNAME?\r` |
| Antwort | `\r\n+MACNAME:<value>\r\n\r\nOK\r\n` |
| Parameter | Keine |
| Hinweise | Gibt zurück, ob das Suffix angehängt wird: 0 = nein, 1 = ja. |

</div>

#### MAC-Suffix im Gerätenamen aktivieren oder deaktivieren { #set-mac-name-suffix-switch }

<div align="center"><em>Tabelle: MAC-Suffix im Gerätenamen aktivieren oder deaktivieren</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+MACNAME=<value>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | Wert: 0 = Gerätenamen unverändert anzeigen; 1 = `-XXXX` an den Gerätenamen anhängen (XXXX ist die großgeschriebene Hexadezimaldarstellung der letzten beiden Bytes der lokalen BD_ADDR). Bereich: 0–1. Standardwert: 0. |
| Hinweise | Aktualisiert die Einstellung. Wenn Gerätename und Suffix zusammen die Grenze von 29 Byte überschreiten, wird der Gerätename gekürzt, damit das 5 Byte lange Suffix erhalten bleibt. |

</div>

#### IEEE-1284-Geräte-ID abfragen { #query-ieee-1284-device-id }

<div align="center"><em>Tabelle: IEEE-1284-Geräte-ID abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+1284ID?\r` |
| Antwort | `\r\n+1284ID:<ID string>\r\n\r\nOK\r\n` |
| Parameter | Keine |
| Hinweise | Gibt die aktuell konfigurierte IEEE-1284-Geräte-ID-Zeichenkette zurück; leer, wenn nicht konfiguriert. |

</div>

#### IEEE-1284-Geräte-ID setzen { #set-ieee-1284-device-id }

<div align="center"><em>Tabelle: IEEE-1284-Geräte-ID setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+1284ID=<ID string>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | ID-Zeichenkette: die IEEE-1284-Geräte-ID-Zeichenkette; die Länge muss unter der Kapazität des Speicherpuffers liegen, bei Überlänge wird `ERROR` zurückgegeben. Standard ist eine leere Zeichenkette. |
| Hinweise | Aktualisiert die Konfiguration. |

</div>

#### Gerät zurücksetzen { #reset-device }

<div align="center"><em>Tabelle: Gerät zurücksetzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+RESET\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Abfrageform (`AT+RESET?\r`): `\r\nERROR\r\n` |
| Parameter | Keine |
| Hinweise | Beim Empfang des Befehls speichert das Modul die aktuelle AT-Konfiguration, antwortet mit `OK`, stoppt dann das Advertising, trennt Verbindungen und führt einen Soft-Reset durch. Dieser Befehl ändert die Konfiguration selbst nicht. |

</div>

#### Werksreset { #factory-reset }

<div align="center"><em>Tabelle: Werksreset</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+FACTORYRESET\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Abfrageform (`AT+FACTORYRESET?\r`): `\r\nERROR\r\n` |
| Parameter | Keine |
| Hinweise | Stellt die Standardwerte der AT-Konfiguration wieder her und löscht die benutzerdefinierte GATT-Service-Konfiguration, die BLE- und Classic-Bluetooth-(BR/EDR)-Pairing-Daten sowie die statische BLE-Zufallsadresse. Das Modul antwortet mit `OK` und startet anschließend neu. Der Host sollte danach auf `IM_READY` warten. |

</div>

#### Konfigurationsreset { #configuration-reset }

<div align="center"><em>Tabelle: Konfigurationsreset</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+CFGRESET\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Abfrageform (`AT+CFGRESET?\r`): `\r\nERROR\r\n` |
| Parameter | Keine |
| Hinweise | Setzt die AT-Konfiguration und die gespeicherte benutzerdefinierte GATT-Konfiguration zurück, antwortet mit `OK` und startet anschließend neu. Pairing-Daten und die aktuelle BLE-Adresse bleiben erhalten. |

</div>

#### In den OTA-Updatemodus wechseln { #enter-ota-upgrade-mode }

<div align="center"><em>Tabelle: In den OTA-Updatemodus wechseln</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+OTA\r` |
| Antwort | Erfolg: `\r\nOK\r\n` (dann Wechsel in den DFU-Modus und Reset — keine weitere Antwort); Abfrageform (`AT+OTA?\r`): `\r\nERROR\r\n` |
| Parameter | Keine |
| Hinweise | Speichert zunächst die aktuelle AT-Konfiguration und antwortet mit `OK`. Anschließend setzt das Modul ein DFU-Flag und startet im UART-DFU-Updatemodus neu. |

</div>

#### Frequenzoffset-Kalibrierung abfragen { #query-frequency-offset-calibration }

<div align="center"><em>Tabelle: Frequenzoffset-Kalibrierung abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+TRIM?\r` |
| Antwort | `\r\n+TRIM:<freq_off>\r\n\r\nOK\r\n` |
| Parameter | `freq_off`: der aktuell aufgezeichnete Frequenzoffset-Kalibrierungswert, in Hz. |
| Hinweise | Gibt den in der AT-Konfiguration gespeicherten Echo-Wert zurück; der tatsächlich wirksame Wert steht in der Partition `FACTORY_CFG_ID_CRYSTAL`. |

</div>

#### Frequenzoffset-Kalibrierung setzen { #set-frequency-offset-calibration }

<div align="center"><em>Tabelle: Frequenzoffset-Kalibrierung setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+TRIM=<freq_off>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Wert außerhalb des Bereichs oder Fehler der Kalibrierschnittstelle: `\r\nERROR\r\n` |
| Parameter | `freq_off`: Kalibrierwert des Frequenzoffsets, in Hz. Bereich: -120000 bis 120000. Standardwert: 0. Der Wert 0 setzt die Kalibrierung zurück und stellt den ursprünglichen Hardwarewert aus der Fertigung wieder her; ein Wert ungleich 0 wird direkt übernommen. |
| Hinweise | Der neue Wert aktualisiert das Register der HXT-Kondensatorbank und wird in die Partition `FACTORY_CFG_ID_CRYSTAL` geschrieben. Nach erfolgreicher Kalibrierung wird der in der AT-Konfiguration gespeicherte Wert aktualisiert und zum Speichern vorgemerkt. |

</div>

#### DUT-Testmodus betreten { #enter-dut-test-mode }

<div align="center"><em>Tabelle: DUT-Testmodus betreten</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+DUT\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Abfrageform (`AT+DUT?\r`): `\r\nERROR\r\n` |
| Parameter | Keine |
| Hinweise | Setzt das BR/EDR-Classic-Bluetooth-DUT-Enable-Bit und antwortet mit `OK`, wartet dann darauf, dass die Testausrüstung über `LMP_test_control` einen Signalisierungstest über die Luftschnittstelle auslöst. Der AT-UART (USART1) bleibt verfügbar. Der Eintritt in den DUT-Modus ist unumkehrbar — er kann nur durch einen Reset verlassen werden. |

</div>

### Adresse und Identität { #address-and-identity }

#### Bluetooth-Adresse abfragen { #query-bluetooth-address }

<div align="center"><em>Tabelle: Bluetooth-Adresse abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+LBDADDR?\r` |
| Antwort | Erfolg: `\r\n+LBDADDR:<addr>\r\n\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `addr`: gibt die aktuelle öffentliche Bluetooth-Adresse zurück, 12 Hex-Zeichen (Großbuchstaben, keine Trennzeichen), höchstwertiges Byte zuerst, z. B. `001583112233`. |
| Hinweise | Gibt die aus der Firmware gelesene öffentliche Adresse zurück; gibt bei Lesefehler `ERROR` zurück. |

</div>

#### Bluetooth-Adresse setzen { #set-bluetooth-address }

<div align="center"><em>Tabelle: Bluetooth-Adresse setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+LBDADDR=<addr>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `addr`: die zu setzende Bluetooth-Adresse; sie muss aus genau 12 Hex-Zeichen ohne Trennzeichen bestehen, höchstwertiges Byte zuerst, z. B. `001583112233`. |
| Hinweise | Die Adresse wird in der Konfiguration gespeichert und nach einem Reset wirksam. Ab Werk besteht der Wert nur aus Nullen; in diesem Fall wird die Adresse automatisch aus der Chip-UID erzeugt. |

</div>

#### BLE-Adresse abfragen { #query-ble-address }

<div align="center"><em>Tabelle: BLE-Adresse abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+BLEADDR?\r` |
| Antwort | Erfolg: `\r\n+BLEADDR:<addr>\r\n\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `addr`: gibt die aktuell von BLE verwendete Adresse zurück, 12 Hex-Zeichen (Großbuchstaben, keine Trennzeichen), höchstwertiges Byte zuerst. |
| Hinweise | Wenn über `AT+RANDOMADDR=1` eine BLE-spezifische statische Zufallsadresse generiert wurde, wird diese statische Zufallsadresse zurückgegeben; andernfalls wird dieselbe öffentliche Adresse wie die Bluetooth-Adresse zurückgegeben. Gibt bei Lesefehler `ERROR` zurück. |

</div>

#### BLE-Adresse setzen { #set-ble-address }

<div align="center"><em>Tabelle: BLE-Adresse setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+BLEADDR=<addr>\r` |
| Antwort | `\r\nERROR\r\n` |
| Parameter | Keine |
| Hinweise | Mit diesem Befehl lässt sich die BLE-Adresse nicht direkt setzen; jeder Aufruf gibt `ERROR` zurück. Eine statische BLE-Zufallsadresse wird über `AT+RANDOMADDR=1` generiert. |

</div>

#### BLE-Zufallsadresseinstellung abfragen { #query-ble-random-address-switch }

<div align="center"><em>Tabelle: BLE-Zufallsadresseinstellung abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+RANDOMADDR?\r` |
| Antwort | `\r\n+RANDOMADDR:<n>\r\n\r\nOK\r\n` |
| Parameter | `n`: aktuelle Einstellung; 0 = BLE verwendet die öffentliche Adresse, 1 = BLE verwendet eine statische Zufallsadresse. |
| Hinweise | Keine |

</div>

#### BLE-Zufallsadresseinstellung ändern { #set-ble-random-address-switch }

<div align="center"><em>Tabelle: BLE-Zufallsadresseinstellung ändern</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+RANDOMADDR=<n>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `n`: 0 oder 1. 1 = aktiviert eine statische BLE-Zufallsadresse, abgeleitet von der öffentlichen Adresse (die oberen zwei Bits des höchstwertigen Bytes der öffentlichen Adresse werden auf 1 gesetzt — z. B. leitet die öffentliche Adresse `001583112233` die BLE-Adresse `C01583112233` ab); 0 = BLE kehrt zur öffentlichen Adresse zurück. Andere Werte oder zusätzliche Zeichen geben `ERROR` zurück. Standard 0. |
| Hinweise | Die Einstellung wird gespeichert. Wird 1 angefordert, aber die öffentliche Adresse kann nicht gelesen werden, wird die Einstellung auf 0 zurückgesetzt und `ERROR` zurückgegeben. Die Adressänderung wird in NVDS geschrieben und nach einem Reset wirksam. Ein erneuter Aufruf von `AT+RANDOMADDR=1` leitet dieselbe Zufallsadresse erneut von der unveränderten öffentlichen Adresse ab. |

</div>

#### Class of Device abfragen { #query-class-of-device }

<div align="center"><em>Tabelle: Class of Device abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+CLASS?\r` |
| Antwort | Erfolg: `\r\n+CLASS:<cod>\r\n\r\nOK\r\n` (`<cod>` sind 6 Hex-Ziffern in Großbuchstaben) |
| Parameter | `cod`: die aktuelle Class of Device, immer als 6 Hex-Ziffern ausgegeben (untere 24 Bit, Format `%06X`, mit Nullen aufgefüllt) |
| Hinweise | Gibt den aktuellen Class-of-Device-Wert zurück. |

</div>

#### Class of Device setzen { #set-class-of-device }

<div align="center"><em>Tabelle: Class of Device setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+CLASS=<cod>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `cod`: Class of Device, eine Hex-Zeichenkette (mit `%X` geparst). Bereich 0–FFFFFF (24 Bit). Standard `000000`. |
| Hinweise | Setzt die Class of Device und aktualisiert die Konfiguration; beim Parsen werden nur die unteren 24 Bit übernommen. |

</div>

### Betriebsmodus und Sichtbarkeit { #operating-mode-and-visibility }

#### Sichtbarkeitsstatus abfragen { #query-discoverable-state }

<div align="center"><em>Tabelle: Sichtbarkeitsstatus abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+DISCOVERABLE?\r` |
| Antwort | Erfolg: `\r\n+DISCOVERABLE:<state>\r\n\r\nOK\r\n` |
| Parameter | `state`: aktueller Sichtbarkeitsstatus. 0 = nicht sichtbar, 1 = sichtbar, 2 = teilweise sichtbar (gemischter Zustand). Die Bedeutung hängt vom Betriebsmodus ab: im BLE-Modus (`BTMODE=1`) spiegelt der Wert die BLE-Advertising-Einstellung wider — 1 = ein, 0 = aus; im BT-Modus (`BTMODE=2`) den Inquiry-Scan und Page-Scan — 1, wenn beide aktiv sind, 0, wenn beide inaktiv sind, sonst 2; im Dual-Mode (`BTMODE=0`) ist der Wert 1, wenn BLE-Advertising, Inquiry-Scan und Page-Scan aktiv sind, 0, wenn alle inaktiv sind, sonst 2. |
| Hinweise | Fragt nur den aktuellen Sichtbarkeitsstatus ab und ändert den Gerätezustand nicht. |

</div>

#### Sichtbarkeitsstatus setzen { #set-discoverable-state }

<div align="center"><em>Tabelle: Sichtbarkeitsstatus setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+DISCOVERABLE=<mode>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `mode`: 0 = Sichtbarkeit ausschalten, 1 = Sichtbarkeit einschalten. |
| Hinweise | Die Wirkung hängt vom aktuellen Betriebsmodus ab: Im BLE-Modus (`BTMODE=1`) schaltet der Befehl das BLE-Advertising ein oder aus, im BT-Modus (`BTMODE=2`) den Inquiry-Scan und Page-Scan. Im Dual-Mode (`BTMODE=0`) steuert er BLE-Advertising, Inquiry-Scan und Page-Scan gemeinsam. |

</div>

#### GATT-Advertising-Status abfragen { #query-gatt-advertising-state }

<div align="center"><em>Tabelle: GATT-Advertising-Status abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTDISCOVER?\r` |
| Antwort | Erfolg: `\r\n+GATTDISCOVER:<state>\r\n\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `state`: tatsächlicher BLE-Advertising-Status auf der Luftschnittstelle. 0 = kein Advertising, 1 = Advertising aktiv. |
| Hinweise | Gibt den tatsächlichen BLE-Advertising-Status auf der Luftschnittstelle zurück. Im reinen BT-Modus (`BTMODE=2`) ist die Abfrage nicht verfügbar und gibt `ERROR` zurück. |

</div>

#### GATT-Advertising setzen { #set-gatt-advertising }

<div align="center"><em>Tabelle: GATT-Advertising setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTDISCOVER=<value>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `value`: 0 = BLE-Advertising stoppen, 1 = BLE-Advertising starten. |
| Hinweise | Schaltet das BLE-Advertising direkt ein oder aus. Im reinen BT-Modus (`BTMODE=2`) ist der Befehl nicht verfügbar. |

</div>

#### SPP-Sichtbarkeitsstatus abfragen { #query-spp-discoverable-state }

<div align="center"><em>Tabelle: SPP-Sichtbarkeitsstatus abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+SPPDISCOVER?\r` |
| Antwort | `\r\n+SPPDISCOVER:<state>\r\n\r\nOK\r\n` |
| Parameter | `<state>`: aktueller Inquiry-Scan-Status, der die Sichtbarkeit steuert. 0 = aus, 1 = ein. |
| Hinweise | Gibt `ERROR` zurück, wenn `AT+BTMODE` gleich 1 ist (nur BLE). |

</div>

#### SPP-Sichtbarkeitsstatus setzen { #set-spp-discoverable-state }

<div align="center"><em>Tabelle: SPP-Sichtbarkeitsstatus setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+SPPDISCOVER=<state>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `<state>`: Schalter für den Inquiry-Scan, der die Sichtbarkeit steuert. 0 = aus, 1 = ein. |
| Hinweise | Gibt `ERROR` zurück, wenn `AT+BTMODE` gleich 1 ist (nur BLE). Ändert nur das Inquiry-Scan-Bit und lässt das Page-Scan-Bit unverändert. |

</div>

#### SPP-Verbindbarkeitsstatus abfragen { #query-spp-connectable-state }

<div align="center"><em>Tabelle: SPP-Verbindbarkeitsstatus abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+SPPCONNECT?\r` |
| Antwort | `\r\n+SPPCONNECT:<state>\r\n\r\nOK\r\n` |
| Parameter | `<state>`: aktueller Page-Scan-Status, der die Verbindbarkeit steuert. 0 = aus, 1 = ein. |
| Hinweise | Gibt `ERROR` zurück, wenn `AT+BTMODE` gleich 1 ist (nur BLE). |

</div>

#### SPP-Verbindbarkeitsstatus setzen { #set-spp-connectable-state }

<div align="center"><em>Tabelle: SPP-Verbindbarkeitsstatus setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+SPPCONNECT=<state>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `<state>`: Schalter für den Page-Scan, der die Verbindbarkeit steuert. 0 = aus, 1 = ein. |
| Hinweise | Gibt `ERROR` zurück, wenn `AT+BTMODE` gleich 1 ist (nur BLE). Ändert nur das Page-Scan-Bit und lässt das Inquiry-Scan-Bit unverändert. |

</div>

#### Bluetooth-Betriebsmodus abfragen { #query-bluetooth-operating-mode }

<div align="center"><em>Tabelle: Bluetooth-Betriebsmodus abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+BTMODE?\r` |
| Antwort | `\r\n+BTMODE:<mode>\r\n\r\nOK\r\n` |
| Parameter | `mode`: aktueller Bluetooth-Betriebsmodus. 0 = Dual-Mode (BLE+BT), 1 = nur BLE, 2 = nur BT. |
| Hinweise | Keine |

</div>

#### Bluetooth-Betriebsmodus setzen { #set-bluetooth-operating-mode }

<div align="center"><em>Tabelle: Bluetooth-Betriebsmodus setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+BTMODE=<mode>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `mode`: Bluetooth-Betriebsmodus. 0 = Dual-Mode (BLE+BT), 1 = nur BLE, 2 = nur BT; Bereich 0–2. Standard 0 (Dual-Mode). |
| Hinweise | Das Setzen aktualisiert die Konfiguration und wird nach einem Reset wirksam. |

</div>

#### Befehlsmodus abfragen { #query-command-mode }

<div align="center"><em>Tabelle: Befehlsmodus abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+COMMAND?\r` |
| Antwort | `\r\n+COMMAND:<mode>\r\n\r\nOK\r\n` |
| Parameter | `mode`: aktueller Betriebsmodus. 0 = Transparenzmodus, 1 = Befehlsmodus. |
| Hinweise | Keine |

</div>

#### Befehlsmodus setzen { #set-command-mode }

<div align="center"><em>Tabelle: Befehlsmodus setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+COMMAND=<mode>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `mode`: Betriebsmodus. 0 = Transparenzmodus, 1 = Befehlsmodus. Das Modul startet nach dem Einschalten im Transparenzmodus. |
| Hinweise | Wird sofort wirksam, aber nicht dauerhaft gespeichert; nach einem Reset gilt wieder der Transparenzmodus. In diesem Modus werden über die serielle Schnittstelle empfangene Daten unverändert an die verbundene Gegenstelle weitergeleitet. Im Befehlsmodus werden serielle Daten als AT-Befehle interpretiert. |

</div>

### Pairing und Sicherheit { #pairing-and-security }

#### Pairing-Informationen löschen { #clear-pairing-information }

<div align="center"><em>Tabelle: Pairing-Informationen löschen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+CLEARLINKKEY\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Abfrageform `AT+CLEARLINKKEY?\r`: `\r\nERROR\r\n` |
| Parameter | Keine Parameter. |
| Hinweise | Löscht BLE-Bonding-Informationen und den Classic-Bluetooth-Link-Key. Nach Erfolg wird das Gerät zurückgesetzt; AT-Konfiguration wie Gerätename, Baudrate und COD bleiben erhalten. Der Host sollte nach dem Reset auf `IM_READY` warten. Die Abfrageform wird nicht unterstützt. |

</div>

### Serielle Schnittstelle und Ereignisse { #serial-port-and-events }

#### Serielle Baudrate abfragen { #query-serial-baud-rate }

<div align="center"><em>Tabelle: Serielle Baudrate abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+BAUD?\r` |
| Antwort | `\r\n+BAUD:<baud_rate>\r\n\r\nOK\r\n` |
| Parameter | `baud_rate`: die aktuell konfigurierte Baudrate, in bps. |
| Hinweise | Nach dem Setzen der Baudrate wird das Gerät zurückgesetzt; die neue Baudrate wird nach dem Reset wirksam. |

</div>

#### Serielle Baudrate setzen { #set-serial-baud-rate }

<div align="center"><em>Tabelle: Serielle Baudrate setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+BAUD=<baud_rate>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `baud_rate`: serielle Baudrate, in bps. Unterstützte Werte: 38400, 57600, 115200, 230400, 460800, 921600, 1000000. Standard 460800. |
| Hinweise | Das Setzen aktualisiert die Konfiguration. |

</div>

#### Ereignisbenachrichtigungen abfragen { #query-event-reporting-switch }

<div align="center"><em>Tabelle: Ereignisbenachrichtigungen abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+EVT?\r` |
| Antwort | `\r\n+EVT:<evt_silent>\r\n\r\nOK\r\n` |
| Parameter | `evt_silent`: Status der Ereignisunterdrückung. 0 = Benachrichtigungen normal ausgeben, 1 = alle Benachrichtigungen unterdrücken. |
| Hinweise | Keine |

</div>

#### Ereignisbenachrichtigungen einstellen { #set-event-reporting-switch }

<div align="center"><em>Tabelle: Ereignisbenachrichtigungen einstellen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+EVT=<evt_silent>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `evt_silent`: Ereignisunterdrückung. 0 = `IM_CONN`/`IM_DISCONN`/`IM_READY` und weitere Ereignisse normal melden, 1 = alle diese Meldungen unterdrücken. Standardwert: 0 (normale Meldungen). |
| Hinweise | Das Setzen aktualisiert die Konfiguration. Bei Einstellung auf 1 werden Verbindungsaufbau-, Trennungs- und Bereitschaftsereignisse nicht über die serielle Schnittstelle ausgegeben. |

</div>

#### Leerlauf-Trennzeit im Transparenzmodus abfragen { #query-pass-through-idle-disconnect-time }

<div align="center"><em>Tabelle: Leerlauf-Trennzeit im Transparenzmodus abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+IDLE?\r` |
| Antwort | `\r\n+IDLE:<idle_ms>\r\n\r\nOK\r\n` |
| Parameter | `idle_ms`: aktuelles Zeitlimit für die Trennung bei Inaktivität, in Millisekunden. |
| Hinweise | Keine |

</div>

#### Leerlauf-Trennzeit im Transparenzmodus setzen { #set-pass-through-idle-disconnect-time }

<div align="center"><em>Tabelle: Leerlauf-Trennzeit im Transparenzmodus setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+IDLE=<idle_ms>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `idle_ms`: Zeitlimit für die Trennung bei Inaktivität im Transparenzmodus, in Millisekunden, Bereich 0–65535; über 65535 gibt `ERROR` zurück. 0 deaktiviert die Leerlauf-Trennfunktion. Standard 0 (aus). |
| Hinweise | Das Setzen aktualisiert die Konfiguration. Wird nur im Transparenzmodus wirksam: Sind im Transparenzmodus mehr als `idle_ms` Millisekunden seit dem letzten Datenempfang auf der seriellen Schnittstelle vergangen, werden alle Verbindungen (falls vorhanden) getrennt; `idle_ms` = 0 löst dies nie aus. |

</div>

### Verbindungsverwaltung { #connection-management }

#### Status der Mehrfachverbindung abfragen { #query-multi-connection-switch }

<div align="center"><em>Tabelle: Status der Mehrfachverbindung abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+MULTICONN?\r` |
| Antwort | `\r\n+MULTICONN:<n>\r\n\r\nOK\r\n` |
| Parameter | `<n>`: Zustand des Hauptschalters für Mehrfachverbindung. 0 = aus (global nur eine Verbindung); 1 = ein (gleichzeitig, bis zur jeweiligen Transportgrenze). |
| Hinweise | Keine |

</div>

#### Mehrfachverbindung aktivieren oder deaktivieren { #set-multi-connection-switch }

<div align="center"><em>Tabelle: Mehrfachverbindung aktivieren oder deaktivieren</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+MULTICONN=<n>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `<n>`: 0 = Mehrfachverbindung deaktivieren; 1 = Mehrfachverbindung aktivieren. Wert ist 0 oder 1. Standard 1. |
| Hinweise | Das Setzen aktualisiert die Konfiguration. Ist die Mehrfachverbindung ausgeschaltet, sind gleichzeitige Verbindungen eingeschränkt. Ist sie eingeschaltet, richtet sich die Anzahl nach den Einstellungen von `AT+BLEMULTICONN` und `AT+BTMULTICONN`. |

</div>

#### Maximale gleichzeitige BLE-Verbindungen abfragen { #query-maximum-ble-concurrent-connections }

<div align="center"><em>Tabelle: Maximale gleichzeitige BLE-Verbindungen abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+BLEMULTICONN?\r` |
| Antwort | Erfolg: `\r\n+BLEMULTICONN:<n>\r\n\r\nOK\r\n`; wenn Mehrfachverbindung aus ist: `\r\nERROR\r\n` |
| Parameter | `<n>`: die aktuell konfigurierte maximale Anzahl gleichzeitiger BLE-Verbindungen, dezimal. |
| Hinweise | Kann nur abgefragt werden, wenn die Mehrfachverbindung aktiviert ist (`AT+MULTICONN=1`); andernfalls wird `ERROR` zurückgegeben. |

</div>

#### Maximale gleichzeitige BLE-Verbindungen setzen { #set-maximum-ble-concurrent-connections }

<div align="center"><em>Tabelle: Maximale gleichzeitige BLE-Verbindungen setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+BLEMULTICONN=<n>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `<n>`: maximale Anzahl gleichzeitiger BLE-Verbindungen, dezimal, Bereich 1–6. Standard 3. |
| Hinweise | Kann nur gesetzt werden, wenn die Mehrfachverbindung aktiviert ist (`AT+MULTICONN=1`). Die Einstellung wird gespeichert. Erreicht die Anzahl der Verbindungen den Grenzwert, wird das Advertising gestoppt; weitere Verbindungen sind dann nicht möglich. Sinkt die Zahl wieder unter den Grenzwert, wird das Advertising automatisch fortgesetzt. |

</div>

#### Maximale gleichzeitige Classic-Bluetooth-Verbindungen abfragen { #query-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>Tabelle: Maximale gleichzeitige Classic-Bluetooth-Verbindungen abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+BTMULTICONN?\r` |
| Antwort | Erfolg: `\r\n+BTMULTICONN:<n>\r\n\r\nOK\r\n`; wenn Mehrfachverbindung aus ist: `\r\nERROR\r\n` |
| Parameter | `<n>`: die aktuell konfigurierte maximale Anzahl gleichzeitiger Classic-Bluetooth-(BR/EDR)-Verbindungen, dezimal. |
| Hinweise | Kann nur abgefragt werden, wenn die Mehrfachverbindung aktiviert ist (`AT+MULTICONN=1`); andernfalls wird `ERROR` zurückgegeben. |

</div>

#### Maximale gleichzeitige Classic-Bluetooth-Verbindungen setzen { #set-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>Tabelle: Maximale gleichzeitige Classic-Bluetooth-Verbindungen setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+BTMULTICONN=<n>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `<n>`: maximale Anzahl gleichzeitiger Classic-Bluetooth-Verbindungen, dezimal, Bereich 1–7. Standard 7. |
| Hinweise | Kann nur gesetzt werden, wenn die Mehrfachverbindung aktiviert ist (`AT+MULTICONN=1`). Die Einstellung wird gespeichert. Erreicht die Anzahl der Verbindungen den Grenzwert, stoppt das Modul den Page-Scan und setzt ihn automatisch fort, sobald die Anzahl wieder darunter liegt. |

</div>

#### Trennen { #disconnect }

<div align="center"><em>Tabelle: Trennen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | Eine Verbindung trennen: `AT+DISCONN=<conn_hdl>\r`; alle trennen: `AT+DISCONN\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag oder nicht gefunden: `\r\nERROR\r\n` |
| Parameter | `<conn_hdl>`: Verbindungs-Handle, hex. BLE-Verbindungs-Handles sind 1-basierte externe Handles (übereinstimmend mit dem, was `AT+CONNLIST` zurückgibt); BT-Verbindungen nutzen ihr ACL-Handle. `<conn_hdl>` = 0 wird als ungültige Eingabe behandelt und gibt `ERROR` zurück. |
| Hinweise | Ohne Parameter (oder mit leerem Parameter) werden alle aktiven Verbindungen (BLE und BR/EDR) getrennt; der Befehl gibt `OK` zurück. Mit Parameter sucht das Modul zuerst nach dem externen BLE-Handle (internes Handle = `<conn_hdl>` - 1). Gibt es keinen Treffer, sucht es nach dem rohen BT-ACL-Handle. Wird keine passende Verbindung gefunden, gibt der Befehl `ERROR` zurück. Die Abfrageform `AT+DISCONN?` gibt ebenfalls `ERROR` zurück. |

</div>

#### Verbindungsliste abfragen { #query-connection-list }

<div align="center"><em>Tabelle: Verbindungsliste abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+CONNLIST?\r` oder `AT+CONNLIST\r` |
| Antwort | Jede aktive Verbindung wird als eine Zeile ausgegeben: `\r\n+CONNLIST:<conn_hdl>,<type>,<addr>,<extra>\r\n`; gefolgt von `\r\nOK\r\n` nach allen Zeilen; nur `\r\nOK\r\n`, wenn keine aktiven Verbindungen bestehen; bei einem nicht leeren Parameter: `\r\nERROR\r\n` |
| Parameter | Ausgabefelder: `<conn_hdl>` — Verbindungs-Handle, 4 Hex-Ziffern; BLE verwendet ein 1-basiertes externes Handle. `<type>` — Verbindungstyp, BLE oder BT. `<addr>` — Bluetooth-Adresse der Gegenstelle, 12 Hex-Ziffern (höchstwertiges Byte zuerst). `<extra>` — aktuelle MTU bei BLE-Verbindungen oder Dienstkanal bei BT-Verbindungen, dezimal. |
| Hinweise | Wird der Befehl mit einem nicht leeren Parameter aufgerufen, antwortet er mit `ERROR`. Das Modul prüft alle Verbindungsslots und gibt jede aktive Verbindung aus. |

</div>

### Datenübertragung { #data-transfer }

#### BLE-MTU abfragen { #query-ble-mtu }

<div align="center"><em>Tabelle: BLE-MTU abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GMTU?\r` |
| Antwort | Erfolg: `\r\n+GMTU:<mtu>\r\n\r\nOK\r\n` |
| Parameter | `mtu`: die aktuell konfigurierte BLE-MTU-Obergrenze, dezimal. |
| Hinweise | Keine |

</div>

#### BLE-MTU setzen { #set-ble-mtu }

<div align="center"><em>Tabelle: BLE-MTU setzen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GMTU=<mtu>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nFALSE\r\n` |
| Parameter | `mtu`: BLE-MTU-Obergrenze, dezimal, Bereich 23–1024; außerhalb des Bereichs gibt `FALSE` zurück. Standard 247. |
| Hinweise | Dieser Wert setzt die während der MTU-Aushandlung verwendete Obergrenze. |

</div>

#### SPP-Daten senden { #send-spp-data }

<div align="center"><em>Tabelle: SPP-Daten senden</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+SPPSEND=<conn_hdl>,<data>\r` oder `AT+SPPSEND=,<data>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `conn_hdl`: Ziel-BT-Verbindungs-Handle, hexadezimal. Kann weggelassen oder auf 0 gesetzt werden; in diesem Fall wird die erste aktuell aktive BT-Verbindung verwendet. `data`: zu sendende Daten als Hex-Zeichenkette; je zwei Zeichen bilden ein Byte. Der Wert darf nicht leer sein und muss eine gerade Zeichenzahl haben. Die übertragbare Datenmenge ist außerdem durch die maximale Länge eines ASCII-AT-Frames begrenzt. |
| Hinweise | `conn_hdl` und `data` werden durch ein Komma getrennt; das Komma muss auch dann vorhanden sein, wenn `conn_hdl` weggelassen wird. Die Abfrageform wird nicht unterstützt. |

</div>

### Benutzerdefiniertes GATT { #custom-gatt }

#### Liste benutzerdefinierter GATT-Services abfragen { #query-custom-gatt-service-list }

<div align="center"><em>Tabelle: Liste benutzerdefinierter GATT-Services abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTSRV?\r` |
| Antwort | Für jeden konfigurierten Service wird eine Zeile `\r\n+GATTSRV:<idx>,<char_count>,<state>\r\n` zurückgegeben, gefolgt von `\r\nOK\r\n`. Sind keine Services konfiguriert, wird nur `\r\nOK\r\n` zurückgegeben |
| Parameter | `idx`: Service-Slot-Nummer, 0–5. `char_count`: die Anzahl der für diesen Service konfigurierten Charakteristiken. `state`: `REG` bedeutet im Protokollstack registriert, `CFG` bedeutet nur im RAM konfiguriert und noch nicht registriert |
| Hinweise | Listet nur aktuell genutzte Service-Slots auf |

</div>

#### Benutzerdefinierten GATT-Service erstellen { #create-custom-gatt-service }

<div align="center"><em>Tabelle: Benutzerdefinierten GATT-Service erstellen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTSRV=<idx>,<uuid>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `idx`: Service-Slot-Nummer, 0–5. `uuid`: die Service-UUID, eingegeben als Hex-Zeichenkette mit dem höchstwertigen Byte zuerst — 4 Zeichen für eine 16-Bit-UUID, 32 Zeichen für eine 128-Bit-UUID |
| Hinweise | `idx` muss eine einzelne Ziffer sein, unmittelbar gefolgt von einem Komma. Die UUID-Länge muss exakt 4 oder 32 Zeichen betragen — jede andere Länge gibt `ERROR` zurück. Ist der Slot bereits im Protokollstack registriert, kann er nicht neu konfiguriert werden, und das Erstellen gibt `ERROR` zurück. Das Erstellen eines Service löscht jede vorherige Konfiguration in diesem Slot |

</div>

#### Benutzerdefinierten GATT-Service löschen { #delete-custom-gatt-service }

<div align="center"><em>Tabelle: Benutzerdefinierten GATT-Service löschen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTSRV=<idx>,DEL\r` |
| Antwort | `\r\nOK\r\n` |
| Parameter | `idx`: Service-Slot-Nummer, 0–5 |
| Hinweise | Löscht die Konfiguration dieses Slots im RAM. Ein bereits registrierter Service kann zur Laufzeit nicht mehr aus dem Protokollstack entfernt werden; dieser Befehl löscht nur die RAM-Konfiguration. |

</div>

#### Liste benutzerdefinierter GATT-Charakteristiken abfragen { #query-custom-gatt-characteristic-list }

<div align="center"><em>Tabelle: Liste benutzerdefinierter GATT-Charakteristiken abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTCHAR?<svc>\r` |
| Antwort | Für jede Charakteristik dieses Service wird eine Zeile `\r\n+GATTCHAR:<svc>,<chr>,prop=0x<prop>,len=<max_len>\r\n` zurückgegeben, gefolgt von `\r\nOK\r\n`; falls der Service nicht existiert: `\r\nERROR\r\n` |
| Parameter | `svc`: Service-Slot-Nummer, 0–5. `chr`: Charakteristik-Index. `prop`: Eigenschaftsbits der Charakteristik, hexadezimal. `max_len`: maximale Länge des Charakteristikwerts |
| Hinweise | Keine |

</div>

#### Benutzerdefinierte GATT-Charakteristik hinzufügen { #add-custom-gatt-characteristic }

<div align="center"><em>Tabelle: Benutzerdefinierte GATT-Charakteristik hinzufügen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTCHAR=<svc>,<chr>,<uuid>,<prop>,<len>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `svc`: Service-Slot-Nummer, 0–5. `chr`: Charakteristik-Index, 0–7. `uuid`: Charakteristik-UUID, höchstwertiges Byte zuerst, 4 Zeichen für 16 Bit, 32 Zeichen für 128 Bit. `prop`: Eigenschaftszeichenkette aus den Zeichen R (Lesen), W (Schreiben mit Antwort), w (Schreiben ohne Antwort), N (Notify), I (Indicate). `len`: maximale Länge des Charakteristikwerts, 1–512 |
| Hinweise | Alle fünf Parameter sind erforderlich; fehlt einer, gibt der Befehl `ERROR` zurück. Die UUID-Länge muss exakt 4 oder 32 Zeichen betragen. `prop` muss mindestens ein erkanntes Eigenschaftszeichen enthalten. Wird keines erkannt, gibt der Befehl `ERROR` zurück; nicht erkannte Zeichen in `prop` werden ignoriert. Ist `len` 0 oder größer als 512, gibt der Befehl `ERROR` zurück. Der übergeordnete Service muss bereits angelegt und darf noch nicht im Protokollstack registriert sein. |

</div>

#### Benutzerdefinierte GATT-Services starten (registrieren) { #start-register-custom-gatt-services }

<div align="center"><em>Tabelle: Benutzerdefinierte GATT-Services starten (registrieren)</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTSTART\r` |
| Antwort | `\r\n+GATTSTART:<count>\r\n` gefolgt von `\r\nOK\r\n`; Abfrageform `AT+GATTSTART?\r`: `\r\nERROR\r\n` |
| Parameter | `count`: die Anzahl der bei diesem Aufruf erfolgreich im Protokollstack registrierten Services |
| Hinweise | Registriert alle genutzten Services, die noch nicht registriert sind und mindestens eine Charakteristik besitzen, im Protokollstack. Ein registrierter Service kann zur Laufzeit weder entfernt noch neu konfiguriert werden. Die Abfrageform wird nicht unterstützt. |

</div>

#### GATT-Charakteristikdaten senden (Notify/Indicate) { #send-gatt-characteristic-data-notifyindicate }

<div align="center"><em>Tabelle: GATT-Charakteristikdaten senden (Notify/Indicate)</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTSEND=<svc>,<chr>,<conn_hdl>,<hex>\r`; ohne Verbindungs-Handle: `AT+GATTSEND=<svc>,<chr>,,<hex>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n`; Abfrageform `AT+GATTSEND?\r`: `\r\nERROR\r\n` |
| Parameter | `svc`: Service-Slot-Nummer. `chr`: Charakteristik-Index. `conn_hdl`: BLE-Verbindungs-Handle, hexadezimal und 1-basiert; kann weggelassen werden. `hex`: zu sendende Daten als Hex-Zeichenkette mit gerader Zeichenzahl. Die übertragbare Datenmenge ist außerdem durch die maximale Länge eines ASCII-AT-Frames begrenzt. |
| Hinweise | Wird `conn_hdl` weggelassen, verwendet der Befehl die erste aktuell aktive BLE-Verbindung. Der Ziel-Service muss bereits registriert und der Charakteristik-Index gültig sein. Hat die Charakteristik die Eigenschaft Indicate (I), wird eine Indication verwendet; andernfalls wird eine Notification gesendet. |

</div>

#### Benutzerdefinierte GATT-Konfiguration in Flash speichern { #save-custom-gatt-configuration-to-flash }

<div align="center"><em>Tabelle: Benutzerdefinierte GATT-Konfiguration in Flash speichern</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTSTORE\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n`; Abfrageform `AT+GATTSTORE?\r`: `\r\nERROR\r\n` |
| Parameter | Keine |
| Hinweise | Speichert die aktuelle Konfiguration aller Services und Charakteristiken dauerhaft im Flash. Nur Konfigurationsdaten werden gespeichert — Laufzeitinformationen wie der Registrierungsstatus werden nicht gespeichert. Gibt `ERROR` zurück, wenn KVDB nicht bereit ist oder der Schreibvorgang fehlschlägt. Die Abfrageform wird nicht unterstützt |

</div>

#### Benutzerdefinierte GATT-Konfiguration im Flash löschen { #clear-custom-gatt-configuration-in-flash }

<div align="center"><em>Tabelle: Benutzerdefinierte GATT-Konfiguration im Flash löschen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTCLEAR\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Abfrageform `AT+GATTCLEAR?\r`: `\r\nERROR\r\n` |
| Parameter | Keine |
| Hinweise | Löscht die im Flash gespeicherte GATT-Konfiguration. Wirkt sich nicht auf die aktuelle Konfiguration im RAM aus. Die Abfrageform wird nicht unterstützt. |

</div>

#### Automatisches Laden der GATT-Konfiguration beim Einschalten abfragen { #query-gatt-auto-load-on-power-up-switch }

<div align="center"><em>Tabelle: Automatisches Laden der GATT-Konfiguration beim Einschalten abfragen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTAUTOSTART?\r` |
| Antwort | `\r\n+GATTAUTOSTART:<v>\r\n\r\nOK\r\n` |
| Parameter | `v`: aktueller Wert; 0 = aus, 1 = ein. Standardwert: 1. |
| Hinweise | Keine |

</div>

#### Automatisches Laden der GATT-Konfiguration beim Einschalten einstellen { #set-gatt-auto-load-on-power-up-switch }

<div align="center"><em>Tabelle: Automatisches Laden der GATT-Konfiguration beim Einschalten einstellen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+GATTAUTOSTART=<v>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `v`: 0 = aus, 1 = ein. Standardwert: 1. |
| Hinweise | Das Setzen aktualisiert die Konfiguration. Bei Aktivierung lädt das Gerät die gespeicherte GATT-Service-Konfiguration beim Einschalten automatisch. |

</div>

## Unaufgeforderte Statusmeldungen (URCs) { #unsolicited-events-urc }

Die folgenden Statusmeldungen gibt das Modul selbst aus; der Host muss sie nicht anfordern. Ihre Ausgabe wird über `AT+EVT` gesteuert. Im stillen Modus gibt das Modul keine Statusmeldungen aus.

### IM_READY-Bereitschaftsmeldung { #im_ready-ready-indication }

<div align="center"><em>Tabelle: IM_READY-Bereitschaftsmeldung</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | Keiner (wird von der Firmware selbst gemeldet, nicht vom Benutzer gesendet) |
| Antwort | Meldungstext: `\r\nIM_READY\r\n` |
| Parameter | Keine |
| Hinweise | Wird einmal ausgegeben, wenn das Modul die Initialisierung abgeschlossen hat und betriebsbereit ist. Eine weitere Meldung erfolgt, sobald alle Verbindungen getrennt sind und die Anzahl aktiver Verbindungen wieder null beträgt. Die Ausgabe wird über `AT+EVT` gesteuert; `AT+EVT=1` unterdrückt diese Meldungen. |

</div>

### IM_CONN-Verbindungsmeldung { #im_conn-connection-indication }

<div align="center"><em>Tabelle: IM_CONN-Verbindungsmeldung</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | Keiner (wird von der Firmware selbst gemeldet, wenn eine Verbindung hergestellt wird) |
| Antwort | Befehlsmodus: `\r\nIM_CONN <hdl>,<addr>,<mtu>\r\n`; Transparenzmodus: `\r\nIM_CONN\r\n` |
| Parameter | `hdl`: Verbindungs-Handle, 4 Hex-Ziffern (Großbuchstaben, feste 4 Ziffern, mit Nullen aufgefüllt). BLE-Verbindungen zeigen ein 1-basiertes Handle an (internes Handle plus 1); andere Typen zeigen den rohen Wert an. `addr`: Bluetooth-Adresse der Gegenstelle, 12 Hex-Ziffern, höchstwertiges Byte zuerst. `mtu`: MTU der aktuellen Verbindung, dezimal. |
| Hinweise | Im Befehlsmodus wird jede neu hergestellte Verbindung einmal mit Handle, Adresse der Gegenstelle und MTU gemeldet. Im Transparenzmodus wird die Meldung nur bei der ersten Verbindung ausgegeben (wenn die Anzahl aktiver Verbindungen 1 beträgt) und enthält keine Parameter. Die Ausgabe wird über `AT+EVT` gesteuert; `AT+EVT=1` unterdrückt diese Meldungen. |

</div>

### IM_DISCONN-Trennmeldung { #im_disconn-disconnect-indication }

<div align="center"><em>Tabelle: IM_DISCONN-Trennmeldung</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | Keiner (wird von der Firmware selbst gemeldet, wenn eine Verbindung getrennt wird) |
| Antwort | Befehlsmodus: `\r\nIM_DISCONN:<hdl>\r\n` |
| Parameter | `hdl`: das Handle der getrennten Verbindung, 4 Hex-Ziffern (Großbuchstaben, feste 4 Ziffern, mit Nullen aufgefüllt). BLE-Verbindungen zeigen ein 1-basiertes Handle an (rohes Handle plus 1); andere zeigen den rohen Wert an. |
| Hinweise | Enthält nur das Handle und wird ausschließlich im Befehlsmodus ausgegeben, nicht im Transparenzmodus. Sobald alle Verbindungen getrennt sind und die Anzahl aktiver Verbindungen wieder null beträgt, wird in beiden Modi zusätzlich `\r\nIM_READY\r\n` ausgegeben. Die Ausgabe wird über `AT+EVT` gesteuert; `AT+EVT=1` unterdrückt diese Meldungen. |

</div>

## PDU-Format-Befehle { #pdu-format-commands }

### PDU-Datenmeldung (Opcode 0x0101) { #pdu-data-report-opcode-0x0101 }

<div align="center"><em>Tabelle: PDU-Datenmeldung (Modul → Host, Opcode 0x0101)</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | Keiner (wird von der Firmware selbst im Befehlsmodus gemeldet) |
| Antwort | `\r\n< + opcode(2-byte little-endian) + len(2-byte little-endian) + body + \r\n` |
| Parameter | `opcode` ist fest `0x0101`; `body` = `conn_hdl` (2-Byte-Little-Endian) + `data`. BLE-Verbindungs-Handles verwenden den 1-basierten externen Wert; SPP-Verbindungen verwenden das rohe ACL-Handle. |
| Hinweise | Im Befehlsmodus meldet das Modul dem Host im obigen Format, wenn Daten in eine benutzerdefinierte BLE-Charakteristik geschrieben oder über Classic-Bluetooth-SPP empfangen werden; im Transparenzmodus werden die Daten direkt ausgegeben. |

</div>

### Daten im PDU-Modus senden (automatische Auswahl der Notify-Charakteristik, Opcode 0x0101) { #pdu-mode-send-data-auto-select-notify-characteristic-opcode-0x0101 }

<div align="center"><em>Tabelle: Daten im PDU-Modus senden (automatische Auswahl der Notify-Charakteristik, Opcode 0x0101)</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | Ein binärer Frame (keine Text-AT-Zeile): `AT>` + opcode(2-Byte-Little-Endian) + len(2-Byte-Little-Endian) + body + `\r`. Hierbei ist opcode = `0x0101` (Bytefolge 01 01); len ist die Bytezahl von body; body = `conn_hdl`(2-Byte-Little-Endian) + `data`. `data` sind die zu sendenden Nutzdaten. |
| Antwort | Keine Textantwort-Zeichenkette. Die Firmware leitet `data` je nach Verbindungstyp an die Gegenstelle weiter, ohne mit `OK`/`ERROR` zu antworten. |
| Parameter | `opcode`: fest `0x0101`. `len`: Länge des Body in Byte, Bereich 2–508 (Frames unter 2 oder über `AT_RX_BUF_SIZE`-4 werden verworfen; `AT_RX_BUF_SIZE` = 512). `conn_hdl`: Ziel-Verbindungs-Handle; 1-basiert (externer Anzeigewert) für BLE-Verbindungen, rohes ACL-Handle für SPP-Verbindungen. `data`: Nutzdatenbytes, Länge = len-2, kann 0 sein. |
| Hinweise | Bei der Auflösung von `conn_hdl` sucht das Modul zuerst nach dem 1-basierten BLE-Handle (`conn_hdl`-1 entspricht dem internen BLE-Slot). Gibt es keinen Treffer, sucht es nach dem rohen Handle eines SPP-Slots. Wird keine Verbindung gefunden, verwirft es den Frame. Bei einer BLE-Verbindung durchsucht die Firmware die benutzerdefinierten GATT-Services und wählt automatisch die erste Charakteristik mit Notify- oder Indicate-Eigenschaft aus. Gibt es keine solche Charakteristik, werden keine Daten gesendet. Bei einer SPP-Verbindung (BR/EDR) sendet die Firmware `data` über den SPP-Kanal. Unmittelbar auf den Frame muss `\r` folgen; andernfalls wird er verworfen. Treffen zwischen zwei Frames länger als das PDU-Timeout keine neuen Bytes ein, setzt die Firmware den PDU-Empfangszustand zurück. |

</div>

### Daten im PDU-Modus senden (Service und Charakteristik angeben, Opcode 0x0102) { #pdu-mode-send-data-specify-service-and-characteristic-opcode-0x0102 }

<div align="center"><em>Tabelle: Daten im PDU-Modus senden (Service und Charakteristik angeben, Opcode 0x0102)</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | Ein binärer Frame (keine Text-AT-Zeile): `AT>` + opcode(2-Byte-Little-Endian) + len(2-Byte-Little-Endian) + body + `\r`. Hierbei ist opcode = `0x0102` (Bytefolge 02 01); len ist die Bytezahl von body; body = `conn_hdl`(2-Byte-Little-Endian) + `svc_idx`(1 Byte) + `char_idx`(1 Byte) + `data`. |
| Antwort | Keine Textantwort-Zeichenkette. Die Firmware sendet `data` über den angegebenen Service und die Charakteristik an die Gegenstelle, ohne mit `OK`/`ERROR` zu antworten. |
| Parameter | `opcode`: fest `0x0102`. `len`: Länge des Body-Felds, 4–508 Byte. Die allgemeine Untergrenze der Empfangsschicht beträgt 2 Byte; dieser Opcode erfordert jedoch mindestens 4 Byte einschließlich `svc_idx` und `char_idx`. Andernfalls wird der Frame verworfen. `conn_hdl`: Ziel-BLE-Verbindungs-Handle, 1-basiert (externer Anzeigewert). `svc_idx`: Index des benutzerdefinierten GATT-Service. `char_idx`: Charakteristik-Index innerhalb dieses Service. `data`: Nutzdatenbytes, Länge = len-4; eine Länge von 0 ist zulässig. |
| Hinweise | Der Befehl gilt nur für BLE-Verbindungen. Wird das Handle einer SPP-Verbindung zugeordnet, verwirft die Firmware den Frame. `svc_idx` muss einem registrierten benutzerdefinierten Service entsprechen und `char_idx` kleiner als die Anzahl seiner Charakteristiken sein; andernfalls wird der Frame verworfen. Die angegebene Charakteristik muss die Eigenschaft Notify oder Indicate besitzen. Andernfalls wird der Frame ebenfalls verworfen. `conn_hdl` wird wie bei `0x0101` aufgelöst: zuerst als 1-basiertes BLE-Handle, danach als rohes Handle. Unmittelbar auf den Frame muss `\r` folgen. |

</div>

### Verbindungen im PDU-Modus trennen { #pdu-mode-disconnect }

<div align="center"><em>Tabelle: Verbindungen im PDU-Modus trennen</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | `AT+DISCONN\r` (ohne Parameter) oder `AT+DISCONN=<conn_hdl>\r` |
| Antwort | Erfolg: `\r\nOK\r\n`; Fehlschlag: `\r\nERROR\r\n` |
| Parameter | `conn_hdl`: das zu trennende Verbindungs-Handle, hex. BLE-Verbindungen sind 1-basiert (externer Anzeigewert); der Wert darf nicht 0 sein (0 wird als ungültige Eingabe behandelt und gibt `ERROR` zurück). SPP-Verbindungen verwenden das rohe ACL-Handle. |
| Hinweise | Ohne Parameter werden alle aktuellen Verbindungen getrennt; der Befehl gibt `OK` zurück. Mit Parameter sucht das Modul zuerst nach dem 1-basierten BLE-Handle (`conn_hdl`-1 entspricht dem internen BLE-Slot). Gibt es keinen Treffer, sucht es nach dem rohen Handle eines SPP-Slots. Wird keine Verbindung gefunden, gibt der Befehl `ERROR` zurück. Bei BLE-Verbindungen wird die Trennung mit Grundcode `0x13` eingeleitet; bei SPP-Verbindungen erfolgt sie anhand der Adresse der Gegenstelle. Die Abfrageform `AT+DISCONN?` gibt `ERROR` zurück. |

</div>

### PDU-Verbindungsstatusmeldung (IM_CONN / IM_DISCONN) { #pdu-connection-status-indication-im_conn-im_disconn }

<div align="center"><em>Tabelle: PDU-Verbindungsstatusmeldung (IM_CONN / IM_DISCONN)</em></div>

<div align="center" markdown>

| Element | Inhalt |
|:-----|:--------|
| Befehl | Wird vom Modul selbst gemeldet — kein Befehl vom Host erforderlich. `IM_CONN` wird gemeldet, wenn eine Verbindung hergestellt wird, `IM_DISCONN`, wenn eine getrennt wird. |
| Antwort | Befehlsmodus, Verbindung hergestellt: `\r\nIM_CONN <hdl>,<mac>,<mtu>\r\n`, wobei `<hdl>` ein 4-stelliges Hex-Handle, `<mac>` eine 12-stellige Hex-Adresse (höchstwertiges Byte zuerst) und `<mtu>` eine dezimale MTU ist. Befehlsmodus, Verbindung getrennt: `\r\nIM_DISCONN:<hdl>\r\n` (`<hdl>` sind 4 Hex-Ziffern). Der Transparenzmodus meldet `\r\nIM_CONN\r\n` (ohne Parameter) nur, wenn die erste Verbindung hergestellt wird, und meldet `IM_DISCONN` bei Trennung nicht. Beide Modi melden `\r\nIM_READY\r\n`, sobald alle Verbindungen getrennt wurden. |
| Parameter | `<hdl>`: Verbindungs-Handle; BLE-Verbindungen werden 1-basiert angezeigt (intern 0-basiert plus 1), SPP-Verbindungen zeigen das rohe Handle an. `<mac>`: Bluetooth-Adresse der Gegenstelle. `<mtu>`: ausgehandelte MTU. |
| Hinweise | Die Ausgabe wird über `AT+EVT` gesteuert: Bei 0 (Standard) werden die Meldungen normal ausgegeben; bei 1 werden `IM_READY`, `IM_CONN` und `IM_DISCONN` unterdrückt. Format und Inhalt richten sich nach dem aktuellen Betriebsmodus (Befehlsmodus oder Transparenzmodus), wie oben beschrieben. |

</div>

## Anhang { #appendix }

### Häufige Class-of-Device-Werte { #common-class-of-device-values }

<div align="center"><em>Tabelle: Häufige Class-of-Device-Werte</em></div>

<div align="center" markdown>

| Gerätetyp | Hex-Wert |
|:-------------|:-----------|
| Computer | `0x000100` |
| Telefon | `0x000200` |
| LAN/Netzwerkzugangspunkt | `0x000300` |
| Audio/Video | `0x000400` |
| Peripheriegerät (Tastatur/Maus usw.) | `0x000500` |
| Bildgebende Geräte (Drucker/Scanner usw.) | `0x000600` |

</div>
