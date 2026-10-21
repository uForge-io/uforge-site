---
icon: lucide/puzzle
description: "Erste Schritte mit dem Beta-ArduinoCore-zephyr von OpenSiFli auf dem SF32LB52 DevKit LCD: Board-Paket installieren, seriellen Test hochladen und Blink ausführen."
tags:
    - Erste Schritte
    - Arduino
---

# Arduino { #arduino }

OpenSiFli bietet einen Beta-Arduino-Core für SF32 auf Zephyr-Basis an: [OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr). Das Projekt stellt das Arduino-Paket `sifli:sf32lb52` bereit. In Boards Manager erscheint es als **SiFli Serial Boards**; derzeit wird das Board **SiFli SF32LB52 DevKit LCD** unterstützt.

Dieser Arduino-Core eignet sich für Sketches, schnelle Prüfungen von Peripheriefunktionen, Demos und erste Prototypen. Für Produktionsfirmware, die Feinabstimmung des Bluetooth-Stacks, grafikintensive Anwendungen, die Optimierung des Stromverbrauchs oder die Inbetriebnahme eigener Boards verwenden Sie [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).

!!! warning "Beta-Core"
    OpenSiFli kennzeichnet diesen Arduino-Core als **BETA** und weist darauf hin, dass er ausschließlich zu Testzwecken verwendet werden soll. Funktionen, APIs, Loader-Verhalten, Paketinhalte und Release-Verfahren können sich ändern. Betrachten Sie ihn nicht als produktionsreif.

## Was Sie benötigen { #what-youll-need }

**Hardware**

- SiFli SF32LB52 DevKit LCD.
- Ein USB-Typ-C-Datenkabel, das mit dem USB-zu-UART-Anschluss des Boards verbunden ist.
- Ein Computer mit Windows, macOS oder Linux.

**Software**

- [Arduino IDE 2.x](https://www.arduino.cc/en/software) oder [Arduino CLI](https://docs.arduino.cc/arduino-cli/).
- Das Arduino-Paket `sifli:sf32lb52` von OpenSiFli.
- Ein serieller Monitor.

## Board-Paket installieren { #install-the-board-package }

Öffnen Sie **Arduino IDE > Settings** und fügen Sie diese URL zu **Additional Boards Manager URLs** hinzu:

```text
https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

Nutzer auf dem chinesischen Festland können den Paketindex über den Spiegelserver verwenden:

```text
https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

Öffnen Sie dann den **Boards Manager**, suchen Sie nach **SiFli Serial Boards** und installieren Sie die Plattform `sifli:sf32lb52`.

Mit der Arduino CLI:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

Für den Spiegelserver in China:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

## Board auswählen { #select-the-board }

Wählen Sie in der Arduino IDE:

```text
SiFli SF32LB52 DevKit LCD
```

Die Board-FQBN lautet:

```text
sifli:sf32lb52:sf32lb52devkitlcd
```

Die OpenSiFli-Board-Definition ordnet dieses Arduino-Board dem Zephyr-Ziel `sf32lb52_devkit_lcd` und der Variante `sf32lb52_devkit_lcd_sf32lb525uc6` zu.

## Build-Optionen wählen { #choose-build-options }

Der Arduino-Core stellt zwei wichtige Menüs bereit:

<div align="center"><em>Build-Optionen</em></div>

<div align="center" markdown>

| Menü | Option | Bedeutung |
|:-----|:-------|:--------|
| **Mode** | `Standard` | Der Sketch startet automatisch nach dem Laden. |
| **Mode** | `Debug` | Die Zephyr-Shell wartet auf den Befehl `sketch`. |
| **Link mode** | `Dynamic` | Der Sketch wird für den Zephyr-Loader verpackt. |
| **Link mode** | `Static` | Der Sketch wird statisch in ein flashfähiges Binärimage gelinkt. |

</div>

Wählen Sie **Dynamic** für den Workflow mit dem Zephyr-Loader. Wählen Sie **Static**, wenn der Sketch statisch in ein flashfähiges Firmware-Image gelinkt werden soll.

## Board in den seriellen Download-Modus versetzen { #put-the-board-in-serial-download-mode }

Bei der ersten Nutzung muss sich das Board laut OpenSiFli-Dokumentation im seriellen Download-Modus befinden. Verwenden Sie die Boot-/Reset-Sequenz für das SF32LB52 DevKit LCD und laden Sie anschließend über die Arduino IDE oder CLI hoch.

Das Upload-Tool ist `sftool`.

## Seriellen Smoke-Test hochladen { #upload-a-serial-smoke-test }

Beginnen Sie mit der seriellen Ausgabe. Damit lassen sich Upload, Reset, Start der Laufzeitumgebung und Konsolenausgabe prüfen, ohne von der LED-Polarität abhängig zu sein:

```cpp
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello from SF32 Arduino");
  delay(1000);
}
```

Laden Sie von der Arduino IDE hoch, oder verwenden Sie die Arduino CLI:

```bash
arduino-cli compile \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch

arduino-cli upload \
  -p /dev/cu.usbserial-XXXX \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch
```

Ersetzen Sie `/dev/cu.usbserial-XXXX` durch den seriellen Port Ihres Boards. Verwenden Sie unter Windows den entsprechenden `COM`-Port. Verwenden Sie unter Linux den entsprechenden Port `/dev/ttyUSB*` oder `/dev/ttyACM*`.

Öffnen Sie den Serial Monitor mit `115200` Baud. Im Build-Modus **Standard** sollte der Sketch eine Zeile pro Sekunde ausgeben. Öffnen Sie im Build-Modus **Debug** die Zephyr-Shell und führen Sie aus:

```text
sketch
```

## Blink hochladen { #upload-blink }

Prüfen Sie, ob die installierte Variante des SF32LB52 DevKit LCD `LED_BUILTIN` definiert; Arduino-Pinnummern sind nicht grundsätzlich universell. Wenn das Makro definiert ist und die Variante es der integrierten LED zuordnet, testen Sie Blink nach dem erfolgreichen seriellen Smoke-Test. Andernfalls prüfen Sie anhand der Board-Dokumentation Anschluss und Polarität der LED, bevor Sie einen GPIO auswählen.

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

## Fehlerbehebung { #troubleshooting }

<div align="center"><em>Tabelle: Fehlerbehebung</em></div>

<div align="center" markdown>

| Symptom | Prüfung |
|:--------|:------|
| Paket erscheint nicht | Prüfen Sie, ob die Paketindex-URL stimmt, und verwenden Sie Arduino IDE 2.x. |
| Upload schlägt fehl | Versetzen Sie das Board in den seriellen Download-Modus und stellen Sie sicher, dass kein serieller Monitor den Port blockiert. |
| Sketch startet nicht | Prüfen Sie **Mode**. Führen Sie im Modus `Debug` `sketch` in der Zephyr-Shell aus. |
| Undefiniertes Zephyr-Symbol | Laut README des Kerns müssen fehlende Zephyr-Funktionen möglicherweise in `loader/llext_exports.c` exportiert und der Loader neu gebaut werden. |
| Zephyr-Subsystem fehlt | Aktivieren Sie die erforderliche `CONFIG_`-Option in der Board-`.conf`, bauen Sie den Loader neu und laden Sie ihn hoch. |
| Speicher reicht nicht | Zephyr-Shell und dynamisches Sketch-Laden verbrauchen RAM; reduzieren Sie den Stack-Verbrauch oder wechseln Sie gegebenenfalls den Build-Modus. |

</div>

## Aktueller Umfang { #what-sifli-team-should-finish }

Das derzeit veröffentlichte Paket zielt auf das SF32LB52 DevKit LCD und bleibt eine Beta-Version für Tests. Bevor Sie ein anderes Board ausprobieren oder sich auf eine API verlassen, prüfen Sie das [Upstream-Repository](https://github.com/OpenSiFli/ArduinoCore-zephyr) und die Release Notes für die genaue Paketversion. Unterstützung in Zephyr oder SiFli-SDK belegt nicht automatisch, dass auch dieses Arduino-Paket die Funktion unterstützt.
