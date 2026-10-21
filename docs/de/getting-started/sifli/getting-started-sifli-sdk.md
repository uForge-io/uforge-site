---
icon: lucide/terminal
description: "Starten Sie hello_world per UART auf einem SF32-Board mit SiFli-SDK: Installieren Sie die Toolchain, bauen Sie mit scons und übertragen Sie die Firmware per UART."
tags:
    - Erste Schritte
    - SiFli SDK
---

# SiFli-SDK { #sifli-sdk }

Dieser Leitfaden zeigt, wie Sie auf einem frisch ausgepackten SF32-Entwicklungsboard mit **SiFli-SDK**, dem offiziellen RT-Thread-basierten SDK für SF32-Geräte, das Beispiel `hello_world` über UART starten.

Auch wenn Sie Arduino, Zephyr oder MicroPython verwenden möchten, sollten Sie diesen Leitfaden einmal durchlaufen. So prüfen Sie vor dem Einsatz eines weiteren Frameworks, ob Board, Kabel, serielle Schnittstelle, Firmware-Übertragung und grundlegende Toolchain funktionieren.

## Was Sie benötigen { #what-youll-need }

**Hardware**

- Ein SF32-Entwicklungsboard, z. B. das [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md), oder ein anderes Entwicklungsboard auf Basis eines Chips aus der [SF32-Familie](../../sf32-products/family/SF32_family.md).
- Ein USB-Typ-C-**Daten**kabel, das mit dem USB-zu-UART-Port des Boards verbunden ist, kein reines Ladekabel und kein USB-Port, der für eine andere Funktion vorgesehen ist.
- Ein Computer mit Windows, macOS oder Linux.

**Software**

- [git](https://git-scm.com/)
- Eine C/C++-Toolchain, die mit [`uv`](https://docs.astral.sh/uv/getting-started/installation/) eingerichtet wird (der SiFli-SDK-Installer lädt Compiler, Debugger und Python-Umgebung herunter)
- Das [SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)-Repository selbst

**Offizielle Referenzen**

- [SiFli-SDK-Installationsanleitung](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)
- [Von SiFli-SDK unterstützte Boards](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)
- [OpenSiFli SiFli-SDK-Repository](https://github.com/OpenSiFli/SiFli-SDK)
- [OpenSiFli SiFli-SDK-Releases](https://github.com/OpenSiFli/SiFli-SDK/releases)

!!! tip "Bevorzugen Sie eine IDE?"
    SiFli stellt außerdem die VS-Code-Erweiterung **SiFli-SDK-CodeKit** bereit. Sie führt durch Einrichtung, Build und Firmware-Übertragung. Wenn Sie diesen Ablauf bevorzugen, lesen Sie [SiFli CodeKit](getting-started-sifli-codekit.md).

## Toolchain installieren { #install-the-toolchain }

Für einen reproduzierbaren Ausgangspunkt verwenden Sie ein veröffentlichtes Release-Tag statt `main`. Zum Zeitpunkt dieser Prüfung ist `v2.5.1` das neueste veröffentlichte Tag; prüfen Sie vor Beginn die [offizielle Release-Liste](https://github.com/OpenSiFli/SiFli-SDK/releases) auf eine neuere Version. Der Branch `release/v2.5` erhält Aktualisierungen für diese Release-Linie und kann sich im Laufe der Zeit ändern.

=== "macOS / Linux"

    Installieren Sie `uv`, den Paket- und Umgebungsmanager, den die SiFli-SDK-Skripte verwenden:

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

    Klonen Sie das SDK:

    ```bash
    mkdir -p ~/OpenSiFli && cd ~/OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Führen Sie den Installer aus und laden Sie anschließend die SDK-Umgebung in Ihre Shell:

    ```bash
    cd SiFli-SDK
    ./install.sh
    . ./export.sh
    ```

=== "Windows"

    Installieren Sie `uv` (PowerShell):

    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    Klonen Sie das SDK:

    ```powershell
    mkdir C:\OpenSiFli
    cd C:\OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Führen Sie den Installer aus und laden Sie anschließend die SDK-Umgebung:

    ```powershell
    cd SiFli-SDK
    .\install.ps1
    .\export.ps1
    ```

!!! info "SiFli-SDK enthält Submodule"
    Die Option „Download ZIP“ von GitHub enthält nicht die erforderlichen Submodule. Verwenden Sie `git clone --recursive`. Falls Sie bereits ohne Submodule geklont haben, führen Sie `git submodule update --init --recursive` im Stammverzeichnis des SDK aus.

!!! note "Arbeiten Sie vom chinesischen Festland aus?"
    Setzen Sie vor der Installation `SIFLI_SDK_MIRROR_CHINA` in Ihrer Shell auf `1`: Verwenden Sie unter macOS/Linux `export SIFLI_SDK_MIRROR_CHINA=1` und in PowerShell `$env:SIFLI_SDK_MIRROR_CHINA = "1"`. Sie können das SDK auch aus dem [Gitee-Spiegelrepository](https://gitee.com/SiFli/sifli-sdk) statt von GitHub klonen. Weitere Informationen enthält die [Installationsanleitung](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html).

`install.sh` / `install.ps1` lädt die passenden Compiler- und Debugger-Versionen sowie die Python-Abhängigkeiten herunter. Führen Sie das Installationsskript erneut aus, wenn sich die SDK-Version ändert. `export.sh` / `export.ps1` aktiviert die Umgebung im aktuellen Terminal. Führen Sie das Export-Skript in jedem neu geöffneten Terminal erneut aus, bevor Sie bauen. Führen Sie die `.ps1`-Skripte unter Windows in PowerShell aus.

## Board-Ziel wählen { #choose-the-board-target }

Der Wert für `scons --board` ist der Name des Board-Verzeichnisses unter `customer/boards`. Wählen Sie das Ziel passend zur Speicher- und Display-Konfiguration Ihres Kits. Bei den folgenden Namen ist die Groß- und Kleinschreibung relevant.

<div align="center" markdown>

*Build-Ziele für SiFli-SDK-Entwicklungsboards*

| Entwicklungsboard | Genaue `scons --board`-Ziele |
| --- | --- |
| SF32LB52-DevKit-Core-3p3 | `sf32lb52-core_e8r16`<br>`sf32lb52-core_n16r16` |
| SF32LB52-DevKit-LCD | `sf32lb52-lcd_52d`<br>`sf32lb52-lcd_n16r8`<br>`sf32lb52-lcd_a128r16` |
| SF32LB52-DevKit-Nano | `sf32lb52-nano_n4`<br>`sf32lb52-nano_n16r16`<br>`sf32lb52-nano_a128r16` |
| Huangshan-Pi (SF32LB52-LCHSPI-ULP) | `sf32lb52-lchspi-ulp` |
| SF32LB56-DevKit-LCD | `sf32lb56-lcd_a128r12n1`<br>`sf32lb56-lcd_n16r12n1` |
| SF32LB58-DevKit-LCD | `sf32lb58-lcd_a128r32n1_dsi`<br>`sf32lb58-lcd_a128r32n1_qspi`<br>`sf32lb58-lcd_n16r32n1_dpi`<br>`sf32lb58-lcd_n16r32n1_dsi`<br>`sf32lb58-lcd_n16r32n1_qspi`<br>`sf32lb58-lcd_n16r64n4` |

</div>

Bei einem Dual-Core-Board wird ohne Kern-Suffix die HCPU-Konfiguration gebaut. Sie können `_hcpu` explizit angeben oder `_lcpu` ergänzen, um die LCPU-Konfiguration zu bauen (zum Beispiel `scons --board=eh-lb551_lcpu`). Fehlt Ihre Board-Konfiguration in der Tabelle, nutzen Sie SiFlis [Liste der unterstützten Boards](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) als maßgebliche Quelle.

## Das „Hello World“-Beispiel bauen { #build-the-hello-world-example }

Bauen Sie bei geladener Umgebung das RT-Thread-Beispiel `hello_world` für Ihr Board:

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb52-lcd_n16r8 -j8
```

Ersetzen Sie `sf32lb52-lcd_n16r8` durch den Namen Ihres Boards. Verfügbare Namen finden Sie in der [Liste der unterstützten Boards](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html). `-j8` baut mit 8 parallelen Jobs. Passen Sie die Zahl an Ihren Rechner an. Da der Befehl oben kein Core-Suffix angibt, wird HCPU gebaut; die Binärdateien liegen in `build_sf32lb52-lcd_n16r8_hcpu/`. Wenn Sie beim Ziel ausdrücklich `_lcpu` angeben, endet auch das Ausgabeverzeichnis auf `_lcpu`.

!!! tip "Benötigen Sie individuelle Einstellungen?"
    Führen Sie `sdk.py menuconfig --board=<board_name>` aus dem Projektverzeichnis aus, um das interaktive Konfigurationsmenü zu öffnen. Drücken Sie zweimal ++esc++ und wählen Sie bei der Abfrage das Speichern der Konfiguration.

## Board flashen { #flash-the-board }

Halten Sie das Board über USB verbunden und führen Sie dann das vom Build erzeugte Download-Skript aus:

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

    Geben Sie bei Aufforderung den vom Betriebssystem angezeigten Pfad des seriellen Geräts ein. Verwenden Sie unter macOS `/dev/cu.*` (zum Beispiel `/dev/cu.usbserial-12345678`), nicht `/dev/tty.*`; unter Linux den passenden Gerätepfad, etwa `/dev/ttyUSB0`.

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

    Geben Sie bei der Aufforderung `please input serial port number` nur die Nummer Ihres COM-Ports ein (z. B. `19` für `COM19`) und drücken Sie die Eingabetaste.

!!! tip
    Wenn das Download-Werkzeug nicht in den UART-Download-Modus wechselt, setzen Sie das Board unmittelbar vor dem Start der Übertragung zurück. Bleibt das Problem bestehen, folgen Sie der Flash-Anleitung für das jeweilige Board.

## Ergebnis ansehen { #see-it-run }

Sobald der Flash-Vorgang abgeschlossen ist, setzen Sie das Board zurück oder lassen Sie es automatisch zurücksetzen. Öffnen Sie ein serielles Terminal mit der Standard-Baudrate des Boards. Sie sollten Boot-Ausgaben und die Ausgabe des `hello_world`-Beispiels über UART sehen.

## Erfolg prüfen { #success-check }

Fahren Sie fort, sobald alle folgenden Punkte erfüllt sind:

- Das Projekt wird fehlerfrei gebaut.
- Das UART-Download-Skript wird vollständig ausgeführt.
- Die serielle Konsole zeigt lesbare Boot-Ausgaben.
- Das `hello_world`-Beispiel gibt nach dem Reset Text aus.

## Wie es weitergeht { #where-to-go-next }

- **Chip wählen:** Vergleichen Sie die Serien LB52, LB55, LB56 und LB58 in der [SF32-Familienübersicht](../../sf32-products/family/SF32_family.md).
- **Weitere Beispiele erkunden:** Über `hello_world` hinaus liefert das SDK Beispiele für BLE, klassisches Bluetooth, LVGL-Grafik, Audio und Energiesparmodi.
- **Ein anderes Framework bevorzugen:** Fahren Sie fort mit [Arduino](../arduino/getting-started-arduino.md), [Zephyr](../zephyr/getting-started-zephyr-upstream.md) oder [MicroPython](../micropython/getting-started-micropython.md).
- **Sie kommen nicht weiter?** In der [SiFli-FAQ](https://wiki.sifli.com/en/faq/index.html) finden Sie Hilfe zu häufigen Problemen mit Toolchain, J-Link und Debugging.

## Den funktionierenden Ausgangsstand dokumentieren { #what-sifli-should-add }

Damit sich die Einrichtung wiederholen lässt, dokumentieren Sie den SDK-Tag oder -Branch, das genaue `scons --board`-Ziel, das Host-Betriebssystem, den seriellen Port und das für Ihr Board funktionierende Download-Verfahren. Prüfen Sie beim SDK- oder Board-Wechsel erneut die offizielle [Liste unterstützter Boards](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) und die [Releases](https://github.com/OpenSiFli/SiFli-SDK/releases).
