---
icon: lucide/layers
description: "Das Upstream-Boardziel SF32LB52 DevKit LCD in Zephyr bauen und flashen und anschließend die dokumentierte Konsole und unterstützten Funktionen prüfen."
tags:
    - Erste Schritte
    - Zephyr
---

# Zephyr Upstream { #zephyr-upstream }

Seit Zephyr v4.3.0 wird das Board `sf32lb52_devkit_lcd` im Zephyr-Upstream unterstützt und gepflegt. Siehe die [Release Notes zu v4.3.0](https://docs.zephyrproject.org/4.3.0/releases/release-notes-4.3.html) und die [Board-Dokumentation für das SF32LB52 DevKit LCD](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html). Diese Anleitung richtet einen v4.3.0-Arbeitsbereich ein, baut ein erstes Beispiel und flasht das Board. Für den umfassenderen offiziellen Funktionsumfang der SF32-Familie verwenden Sie [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).

!!! note "Unterstützte Board-Funktionen prüfen"
    Eine Upstream-Boarddefinition bestätigt nicht automatisch, dass jedes Peripheriegerät oder jeder Betriebsmodus aktiviert und für ein Produkt validiert ist. Prüfen Sie die Tabelle der unterstützten Funktionen in der Board-Dokumentation und verifizieren Sie das benötigte Verhalten auf der konkreten Board-Revision.

## Voraussetzungen { #what-youll-need }

**Hardware**

- SF32LB52 DevKit LCD auf Basis des Moduls SF32LB52x-MOD-N16R8 mit SF32LB525UC6, 8 MB OPI-PSRAM und 128 Mb QSPI-NOR.
- USB-Type-C-Datenkabel, das mit dem USB-zu-UART-Pfad des Boards verbunden ist.

**Software**

- Ein von Zephyr v4.3.0 unterstütztes Hostbetriebssystem, eingerichtet gemäß der [Getting-Started-Anleitung](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html).
- Hostabhängigkeiten und Zephyr SDK für das ARM-Cortex-M-Ziel, installiert gemäß dieser Anleitung.
- Git, Python 3 und `pip`.

## Werkzeuge einrichten { #prepare-the-tooling }

Richten Sie zunächst die Hostabhängigkeiten und das Zephyr SDK gemäß der [Getting-Started-Anleitung für Zephyr v4.3.0](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html) ein. Erstellen Sie anschließend eine Python-Umgebung und initialisieren Sie einen Arbeitsbereich mit dem passenden Zephyr-Tag:

```bash
python3 -m venv ~/zephyr-venv
source ~/zephyr-venv/bin/activate
pip install west
west init -m https://github.com/zephyrproject-rtos/zephyr --mr v4.3.0 ~/zephyrproject
cd ~/zephyrproject
west update
west zephyr-export
pip install -r zephyr/scripts/requirements.txt
```

Lassen Sie diese Python-Umgebung für die folgenden Build- und Flash-Schritte aktiviert.

## Board bestätigen { #confirm-the-board }

Prüfen Sie, ob das Ziel im Arbeitsbereich enthalten ist:

```bash
west boards
```

Der erwartete Boardname lautet:

```text
sf32lb52_devkit_lcd
```

## Hello World bauen { #build-hello-world }

Bauen Sie das Standardbeispiel Hello World von Zephyr:

```bash
west build -b sf32lb52_devkit_lcd samples/hello_world --pristine
```

Ein erfolgreicher Build bestätigt, dass Boardziel und Toolchain im Arbeitsbereich verfügbar sind. Er validiert nicht alle Board-Peripheriegeräte.

## Board flashen { #flash-the-board }

Das Upstream-Board legt `sftool` als Standard-Flash-Runner fest. Installieren Sie [OpenSiFli sftool](https://github.com/OpenSiFli/sftool), stellen Sie sicher, dass es in `PATH` liegt, und versetzen Sie das Board gemäß der Board-Dokumentation in den seriellen Download-Modus. Führen Sie dann Folgendes aus:

```bash
west flash
```

Wenn das Flashen fehlschlägt, prüfen Sie die Auswahl des seriellen Ports, den Download-Modus und die Runner-Hinweise in der [Board-Dokumentation](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html).

## Serielle Konsole öffnen { #open-the-serial-console }

Die Upstream-Boardkonfiguration leitet die Zephyr-Konsole an `usart1` mit `1000000` Baud weiter. Öffnen Sie diese UART-Schnittstelle in einem seriellen Terminal und prüfen Sie die Ausgabe:

```text
Hello World! sf32lb52_devkit_lcd
```

## Nächstes Beispiel auswählen { #choose-a-next-sample }

Wählen Sie anhand der Tabelle unterstützter Funktionen in der Upstream-Boarddokumentation und des [Zephyr-Beispielbrowsers](https://docs.zephyrproject.org/4.3.0/samples/index.html) die nächste zu prüfende API oder Peripheriefunktion aus. Vergewissern Sie sich, dass die Funktion für dieses Board aufgeführt und die erforderliche Konfiguration aktiviert ist, bevor Sie ein Beispiel als Nachweis der Produktreife betrachten.

## Fehlerbehebung { #troubleshooting }

<div align="center"><em>Tabelle: Fehlerbehebung</em></div>

<div align="center" markdown>

| Symptom | Prüfen |
|:--------|:------|
| `west boards` zeigt das SF32-Ziel nicht an | Prüfen Sie, ob der Arbeitsbereich mit Zephyr Upstream v4.3.0 oder höher initialisiert wurde und `west update` abgeschlossen ist. |
| Build scheitert vor dem Kompilieren | Prüfen Sie, ob die Python-Umgebung aktiv, das Zephyr SDK für ARM Cortex-M installiert und die Anforderungen für v4.3.0 installiert sind. |
| Board lässt sich bauen, aber nicht flashen | Prüfen Sie, ob `sftool` installiert und in `PATH` ist, der serielle Port stimmt und sich das Board im seriellen Download-Modus befindet. |
| Keine serielle Ausgabe | Prüfen Sie `usart1`, `1000000` Baud, die USB-zu-UART-Verbindung und ob ein anderes Terminal den Port belegt. |
| Ein Peripheriebeispiel schlägt fehl | Prüfen Sie die Tabelle unterstützter Board-Funktionen und die Beispielkonfiguration. Das Basis-Boardziel aktiviert nicht zwingend alle Peripheriegeräte. |

</div>

## Vor der Produktintegration { #before-product-integration }

- Prüfen Sie die Tabelle der unterstützten Funktionen des Upstream-Boards und die Konfiguration des vorgesehenen Beispiels.
- Validieren Sie die benötigten Schnittstellen, die Leistung, die Speichernutzung und das Stromverbrauchsverhalten auf dem Zielboard und mit der Produktkonfiguration. Ein erfolgreicher Hello-World-Build ist lediglich ein Smoke-Test der Toolchain.
- Vergleichen Sie den Funktionsumfang des Upstream-Ziels mit [SiFli-SDK](../sifli/getting-started-sifli-sdk.md), wenn Ihr Design eine für dieses Zephyr-Ziel nicht aufgeführte oder validierte Funktion benötigt.
