---
icon: lucide/list-tree
description: "So wählen und passen Sie ein SiFli-SDK- oder Zephyr-Beispiel nach Board, Framework und schwierigster Peripherie an, statt SF32-Firmware neu zu schreiben."
tags:
    - Entwicklung
    - Beispiele
---

# Beispiele { #examples }

Beginnen Sie mit einem passenden Beispiel. Die Entwicklung von SF32-Firmware geht meist schneller, wenn Sie ein funktionierendes boardspezifisches Beispiel anpassen, statt jedes Subsystem von Grund auf neu zu erstellen.

Das kleinste Beispiel ist nicht automatisch das beste. Wählen Sie eines, das bereits den anspruchsvollsten Teil Ihres Produkts enthält: Bluetooth-Profil, Display, Audio-Signalweg, Dateisystem, OTA, USB, Energiesparzustand oder KI-Beschleuniger.

## Beispielbereiche { #example-areas }

<div align="center"><em>Tabelle: Beispielbereiche</em></div>

<div align="center" markdown>

| Bereich | Beginnen Sie mit |
|:-----|:-----------|
| Erstinbetriebnahme | `example/get-started/hello_world/rtt/project` |
| LED-Blinken / GPIO | `example/get-started/blink/rtt` oder GPIO-Beispiele aus HAL und RT-Device. |
| Bluetooth | BLE-, BT-Classic-, LE-Audio-, Durchsatz-, Beacon-, OTA- und Profilbeispiele. Beginnen Sie mit der Aufgabenübersicht [Bluetooth-SDK-Beispiele](../../learn/bluetooth/bluetooth-sdk-examples.md). |
| Grafik | LVGL-Demos, Design-Tool-Integrationen, Widgets, komprimierte Assets, Animationen, Medien und Beispiele für bestimmte Displays. Beginnen Sie mit der Aufgabenübersicht [LVGL-SDK-Beispiele](../../learn/graphics/lvgl-sdk-examples.md). |
| Audio | Wiedergabe, Aufnahme, PDM-Erfassung, Codec, Opus, MP3, Audiomischung und USB-Audio, sofern unterstützt. Beginnen Sie mit der Aufgabenübersicht [Audio-SDK-Beispiele](../../learn/audio/audio-sdk-examples.md). |
| Energiesparen | Beispiele zu PM-Zuständen, GPIO, Prozessor, Bluetooth, Display, UI und Wearable-Szenarien. Beginnen Sie mit der Aufgabenübersicht [Energiesparbeispiele des SiFli-SDK](../../learn/low-power/low-power-sdk-examples.md). |
| Speicher | Beispiele zu Dateisystemen, Flash, SD und Partitionen. |
| USB | CherryUSB-Device- und -Host-Beispiele. |
| KI | NNACC-HAL- und RT-Device-Beispiele. |

</div>

## Repräsentative SDK-Ausgangspunkte { #representative-sdk-starting-points }

Verwenden Sie diese Tabelle, nachdem Sie den relevanten Bereich ausgewählt haben. Die Pfade sind repräsentativ und können sich zwischen SDK-Releases ändern; überprüfen Sie das gewählte SDK, das Ziel-Board und die Konfiguration vor dem Bauen.

<div align="center"><em>Typische Einstiegspunkte für SF32-SDK-Beispiele</em></div>

<div align="center" markdown>

| Entwicklungsziel | Repräsentativer SDK-Ausgangspunkt | Was zuerst zu prüfen ist | Weiter mit |
|:---|:---|:---|:---|
| GPIO-Ausgabe oder -Eingabe | `example/hal/gpio`, `example/rt_device/gpio` | Korrekte Pin-Multiplex-Konfiguration, Polarität und Interrupt-Verhalten auf dem konkreten Board. | [Einstieg in die Peripherie](../../getting-started/tutorials/beginner.md) |
| Konsole und Systemprüfung | `example/system/finsh` | Serielle Konsole, Logs und grundlegende Laufzeitprüfung. | [Einstieg in die Peripherie](../../getting-started/tutorials/beginner.md) |
| ADC, PWM oder RTC | `example/hal/adc`, `example/rt_device/pwm`, `example/rt_device/rtc` | Board-spezifische Pin-, Takt- und Peripheriekonfiguration. | [Einstieg in die Peripherie](../../getting-started/tutorials/beginner.md) |
| I2C-Sensor | `example/hal/i2c/master`, `example/rt_device/i2c/eeprom` | Elektrischer Anschluss, Busadressierung und zuverlässige wiederholte Übertragungen. | [Subsystemintegration](../../getting-started/tutorials/intermediate.md) |
| LVGL und lokales Display | `example/multimedia/lvgl/lvgl_v8_examples` | Panel-Initialisierung, Pixelformat und ein stabiler Flush-Pfad, bevor komplexe Ansichten erstellt werden. | [Grafikübersicht](../../learn/graphics/overview.md), [Display-Controller](../../learn/graphics/display-controller.md) |
| BLE-Peripheral-Dienst | `example/ble/peripheral`, `example/ble/hrpc` | Advertising, Verbindung, eine GATT-Charakteristik und Wiederverbindungsverhalten. | [Bluetooth-Übersicht](../../learn/bluetooth/overview.md) |
| Lokale Audiowiedergabe | `example/multimedia/audio/local_music`, `mp3_sd_player` | Codec-/Board-Pfad, Pufferstabilität und Aufräumen nach der Wiedergabe. | [Audioübersicht](../../learn/audio/overview.md) |
| Flash-Speicher | `example/storage/littlefs/nor`, `example/storage/flashdb` | Einhängen, Lese-/Schreibverhalten und Wiederherstellung nach einem Reset oder bei vollem Speicher. | [Subsystemintegration](../../getting-started/tutorials/intermediate.md) |
| Energiesparverhalten | `example/pm/classical`, `example/pm/raise_wrist` | Gemessener Strom in benannten Zuständen und korrektes Verhalten der Weckquellen. | [Energiesparendes Design im Überblick](../../learn/low-power/overview.md) |
| BLE-OTA | `example/ble/peripheral_with_ota` | Wiederherstellung nach unterbrochenem Update und Rollback auf der Zielhardware. | [Produktvalidierung](../../getting-started/tutorials/advanced.md) |
| Laufzeitdiagnose | `example/system/cpu_usage_profiler`, `example/system/coredump` | Reproduzierbarer CPU-Trace oder Crash-Erfassung vor der Optimierung. | [Produktvalidierung](../../getting-started/tutorials/advanced.md) |

</div>

## So wählen Sie ein Beispiel aus { #how-to-choose-an-example }

Gehen Sie in dieser Reihenfolge vor:

1. Wählen Sie ein Beispiel für das Ziel-Board.
2. Wählen Sie ein Beispiel für das verwendete Framework.
3. Wählen Sie ein Beispiel, das die anspruchsvollste Peripherie abdeckt.
4. Wählen Sie ein Beispiel mit der benötigten Middleware.
5. Berücksichtigen Sie Leistungsaufnahme und Speicherbedarf.

Ein Bluetooth-Audio-Produkt sollte beispielsweise mit einem passenden Audio-/Bluetooth-Beispiel beginnen und nicht mit einem schlichten `hello_world`, auch wenn Letzteres leichter zu verstehen ist.

## Anpassungs-Workflow { #adaptation-workflow }

1. Das unveränderte Beispiel bauen und flashen.
2. Den erfolgreichen Build-Befehl, Boardnamen, Flash-Befehl, seriellen Port und das Log sichern.
3. Eine Produktänderung vornehmen.
4. Neu bauen und erneut testen.
5. Die Änderung committen oder dokumentieren, bevor ein weiteres Subsystem hinzugefügt wird.

Dieser Ablauf ist in der ersten Stunde langsamer und nach dem ersten schwerwiegenden Fehler deutlich schneller.

## Zu bewahrende Nachweise { #evidence-to-keep }

Dokumentieren Sie für jedes Beispiel, das zur Produktbasis wird:

- SDK-Branch oder Paketversion.
- Boardname oder FQBN.
- Erforderliche Konfigurationsoptionen.
- Erforderliche Pins und Peripherie.
- Erwartete serielle Ausgabe.
- Bekannte Einschränkungen.
- Speicherbedarf, falls verfügbar.
- Wiederherstellungsbefehl.

## Regel zur Beispielauswahl { #example-selection-rule }

Wählen Sie das Beispiel für das Subsystem mit den strengsten technischen Randbedingungen:

- Bei Bluetooth-Produkten mit dem nächstliegenden Profil beginnen.
- Bei Display-Produkten mit dem Display- und LVGL-Pfad beginnen.
- Bei akkubetriebenen Produkten mit einem Energiesparbeispiel beginnen.
- Bei OTA-Produkten mit dem Update-Ablauf und dem Partitionslayout beginnen.

Fügen Sie dann die übrigen Subsysteme nacheinander hinzu.

## Empfohlener Lernpfad { #suggested-learning-path }

Wenn Sie neu im SDK sind, beginnen Sie mit [Einstieg in die Peripherie](../../getting-started/tutorials/beginner.md) und wechseln Sie zu [Subsystemintegration](../../getting-started/tutorials/intermediate.md), sobald eine einzelne Peripherie stabil läuft. Nutzen Sie [Produktvalidierung](../../getting-started/tutorials/advanced.md) für Messungen des Stromverbrauchs, OTA, die Inbetriebnahme kundenspezifischer Displays, Fehleranalyse, mehrere Bluetooth-Verbindungen und eigene Treiber. Die Themenübersichten erklären die Architektur und Abwägungen hinter diesen Beispielen.
