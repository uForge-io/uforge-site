---
icon: lucide/app-window
description: "Anleitung zur ersten Verwendung von SiFli CodeKit in VS Code: Erweiterung installieren, SF32-Board wählen, hello_world bauen und flashen sowie die serielle Konsole öffnen."
tags:
    - Erste Schritte
    - SiFli CodeKit
    - VS Code
---

# SiFli CodeKit { #sifli-codekit }

SiFli CodeKit ist die VS-Code-Erweiterung für die SiFli-SDK-Entwicklung. Sie bietet geführte Aktionen zum Installieren von SDK-Tools, zur Auswahl eines Boards, zum Bauen eines Beispiels, zum Flashen der Firmware und zum Öffnen einer seriellen Konsole.

Nutzen Sie diese Anleitung, wenn Sie lieber in einer IDE arbeiten. Wenn Sie nachvollziehen möchten, welche Befehle die Schaltflächen ausführen, lesen Sie den [SiFli-SDK-Leitfaden für die manuelle Einrichtung](getting-started-sifli-sdk.md).

Diese Anleitung behandelt die erste Inbetriebnahme. Sobald `hello_world` funktioniert, finden Sie in der [CodeKit-Toolreferenz](../../develop/tools/codekit.md) Informationen zu seiner Rolle im Entwicklungsalltag, zu den Erwartungen an die Reproduzierbarkeit und zu den Grenzen bei Fehlern.

## Was Sie benötigen { #what-youll-need }

**Hardware**

- Ein von SiFli-SDK unterstütztes SF32-Entwicklungsboard.
- Ein USB-Typ-C-Datenkabel, das mit dem USB-zu-UART-Port des Boards verbunden ist.
- Ein Computer mit Windows, macOS oder Linux.

**Software**

- [Visual Studio Code](https://code.visualstudio.com/)
- Die SiFli CodeKit-Erweiterung.
- Git, falls CodeKit Sie auffordert, SiFli-SDK zu klonen oder zu importieren.

**Offizielle Referenz**

- [Offizielle Installationsanleitung für SiFli CodeKit](https://docs.sifli.com/projects/codekit/get-started/install.html)

## CodeKit installieren { #install-codekit }

1. Öffnen Sie VS Code.
2. Öffnen Sie **Extensions**.
3. Suchen Sie nach **SiFli-SDK-CodeKit**.
4. Installieren Sie die Erweiterung.
5. Laden Sie VS Code neu, falls dazu aufgefordert.

Um die SDK-Verwaltung zu öffnen, klicken Sie in der VS-Code-Seitenleiste auf das SiFli-Symbol und wählen **SDK Manager**. Alternativ öffnen Sie **View > Command Palette** (Standardkürzel: `F1`) und führen **Manage SiFli SDK installation** aus. Die genauen Bezeichnungen können je nach Erweiterungsversion variieren; maßgeblich ist die oben verlinkte offizielle Installationsanleitung.

!!! tip
    Wenn Sie die benötigte Aktion nicht finden können, öffnen Sie die Befehlspalette und suchen Sie nach `SiFli`.

## SiFli-SDK installieren oder auswählen { #install-or-select-sifli-sdk }

Installieren Sie SiFli-SDK über den Einrichtungsablauf von CodeKit oder geben Sie den Pfad zu einer bereits geklonten SDK-Kopie an. Für die meisten Nutzer ist **Release/Tag** die passende Wahl: Diese Version ist festgelegt und getestet. Wählen Sie **Branch**, wenn Sie neuere Fehlerbehebungen oder Funktionen benötigen und eine möglicherweise geringere Stabilität akzeptieren. Die offizielle Anleitung beschreibt `release/vX.Y` als Branch für aktuelle Fehlerkorrekturen und Funktionen innerhalb der jeweiligen Release-Linie, ohne dass Sie dafür auf den weniger stabilen `main`-Branch wechseln müssen. Auch der Inhalt dieses Branches kann sich im Laufe der Zeit ändern.

Für Nutzer auf dem chinesischen Festland empfiehlt die offizielle Anleitung Gitee als SDK-Quelle und den SiFli-Spiegelserver für Toolchain-Downloads.

Wenn CodeKit nach einem SDK-Speicherort fragt, wählen Sie einen kurzen Pfad ohne Leerzeichen, zum Beispiel:

=== "macOS / Linux"

    ```text
    ~/OpenSiFli/SiFli-SDK
    ```

=== "Windows"

    ```text
    C:\OpenSiFli\SiFli-SDK
    ```

CodeKit verwendet den Installer und die Umgebungsskripte des SDK. So wird dieselbe Umgebung wie bei der manuellen Einrichtung vorbereitet: Compiler, Python-Umgebung, Build- und Flash-Werkzeuge.

## Ein Beispiel öffnen { #open-an-example }

Beginnen Sie mit dem `hello_world`-Beispiel des SDK:

```text
example/get-started/hello_world/rtt/project
```

Öffnen Sie diesen Projektordner in VS Code. Falls CodeKit einen Importassistenten anbietet, wählen Sie das Projekt `hello_world` aus und lassen Sie den Assistenten das SDK-Stammverzeichnis erkennen.

## Board auswählen { #select-the-board }

Wählen Sie die Board-Konfiguration, die zu Ihrer Hardware passt. Für ein Board der Klasse SF32LB52-DevKit-LCD lautet der gängige Board-Name:

```text
sf32lb52-lcd_n16r8
```

Wenn Sie ein anderes Board verwenden, wählen Sie den passenden Namen aus der CodeKit-Liste oder der SDK-Dokumentation zu unterstützten Boards. Der Board-Name legt Speicherlayout, Pinbelegung, Flash-Einstellungen und Standardperipherie fest.

## Bauen { #build }

Führen Sie die **Build**-Aktion von CodeKit aus. Ein erfolgreicher Build erzeugt einen Ausgabeordner für das jeweilige Board, zum Beispiel:

```text
build_sf32lb52-lcd_n16r8_hcpu
```

Wenn der Build sofort fehlschlägt, prüfen Sie, ob CodeKit den Installationspfad von SiFli-SDK kennt und die Einrichtung der SDK-Umgebung abgeschlossen ist.

## Flashen { #flash }

Verbinden Sie das Board über den USB-zu-UART-Port und führen Sie dann die Aktion **Flash** oder **Download** von CodeKit aus.

Bei Aufforderung zur Auswahl eines seriellen Ports:

- Wählen Sie unter Windows den passenden `COM`-Port.
- Wählen Sie unter macOS das `/dev/cu.*`-Gerät statt `/dev/tty.*`.
- Wählen Sie unter Linux das passende Gerät `/dev/ttyUSB*` oder `/dev/ttyACM*`.

Falls das Download-Werkzeug das Board nicht in den UART-Download-Modus versetzt, setzen Sie es unmittelbar vor Beginn der Übertragung zurück. Besteht das Problem weiterhin, folgen Sie der boardspezifischen Flash-Anleitung.

## Serielle Konsole öffnen { #open-the-serial-console }

Verwenden Sie den seriellen Monitor von CodeKit, die seriellen Tools von VS Code oder ein anderes Terminalprogramm. Nach dem Reset sollte die Konsole lesbare Boot-Ausgaben und die Ausgabe des `hello_world`-Beispiels zeigen.

Wenn die Boot-Meldungen lesbar sind, funktionieren Board und serielle Einstellungen. Ist die Ausgabe unleserlich, schließen Sie andere serielle Programme und prüfen Sie die vom Beispiel verwendete Baudrate.

## Erfolgskontrolle { #success-check }

Fahren Sie fort, sobald alle folgenden Punkte erfüllt sind:

- CodeKit erkennt den SDK-Speicherort.
- Das ausgewählte Board passt zu Ihrer Hardware.
- Build und Flash werden erfolgreich abgeschlossen.
- Die serielle Konsole zeigt nach dem Reset die Ausgabe von `hello_world`.

## Fehlerbehebung { #troubleshooting }

<div align="center"><em>Tabelle: Fehlerbehebung</em></div>

<div align="center" markdown>

| Symptom | Prüfung |
|:--------|:------|
| Kein serieller Port erscheint | Versuchen Sie ein Datenkabel, einen anderen USB-Port oder den USB-zu-UART-Anschluss des Boards. |
| CodeKit findet das SDK nicht | Durchlaufen Sie die CodeKit-Einrichtung erneut und wählen Sie den Stammordner von SiFli-SDK aus. |
| Beim Build fehlen Werkzeuge | Lassen Sie CodeKit die Toolchain erneut installieren oder führen Sie den SDK-Installer einmal manuell aus. |
| Flash startet nicht | Wechselt das Werkzeug nicht in den UART-Download-Modus, setzen Sie das Board unmittelbar vor der Übertragung zurück. Bleibt das Problem bestehen, folgen Sie der Flash-Anleitung für das jeweilige Board. |
| Serielle Ausgabe unleserlich | Prüfen Sie die Baudrate und stellen Sie sicher, dass nur ein serieller Monitor geöffnet ist. |

</div>

## Wie es weitergeht { #where-to-go-next }

- Verwenden Sie [SiFli-SDK](getting-started-sifli-sdk.md), um die entsprechenden Terminalbefehle zu verstehen.
- Fahren Sie mit den [Einsteiger-Tutorials](../tutorials/beginner.md) fort, nachdem `hello_world` funktioniert.
- Lesen Sie die [Bluetooth-Übersicht](../../learn/bluetooth/overview.md), die [Grafikübersicht](../../learn/graphics/overview.md), die [Audioübersicht](../../learn/audio/overview.md) und [Energiesparendes Design im Überblick](../../learn/low-power/overview.md), wenn Sie mit einer konkreten Produktfunktion beginnen.

## Eine reproduzierbare Konfiguration festhalten { #what-sifli-should-add }

Notieren Sie CodeKit- und SDK-Version, den gewählten Tag oder Branch sowie das genaue Board-Ziel. Falls Menü- oder Befehlsnamen abweichen, verwenden Sie die offizielle [Installationsanleitung](https://docs.sifli.com/projects/codekit/get-started/install.html) und die [Liste unterstützter Boards](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) für die installierten Versionen als Referenz.
