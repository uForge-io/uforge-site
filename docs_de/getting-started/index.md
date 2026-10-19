---
icon: lucide/rocket
title: "Überblick: Erste Schritte"
description: "Auswahl des passenden ersten SF32-Softwarepfads — SiFli-SDK, CodeKit, Zephyr, Arduino, Rust oder MicroPython — mit aktuellem Stand und benötigter Hardware."
tags:
    - Erste Schritte
    - SF32
---

# Erste Schritte im Überblick { #getting-started }

Für SF32 gibt es mehrere Softwarepfade. SiFli-SDK und CodeKit sind derzeit die offiziellen Wege für den Einstieg. Seit Zephyr v4.3.0 wird das SF32LB52 DevKit LCD im Zephyr-Upstream gepflegt. OpenSiFli bietet außerdem ArduinoCore-zephyr als Beta-Version an und entwickelt Rust-Unterstützung für SF32LB52. Für MicroPython fehlen noch offizielle Firmware-Images und boardspezifische Anleitungen, bevor ein verifiziertes Tutorial möglich ist.

Den Referenzablauf für die Entwicklung und den aktuellen Umfang der einzelnen Pfade finden Sie in der [Entwicklungsübersicht](../develop/index.md). Nutzen Sie die folgende Tabelle nur zur Wahl des Einstiegspunkts. Die jeweiligen Plattformseiten enthalten die verbindlichen Angaben zu unterstützten Boards und Einschränkungen.

## Wählen Sie Ihren Pfad { #choose-your-path }

<div align="center"><em>Tabelle: Wählen Sie Ihren Pfad</em></div>

<div align="center" markdown>

| Pfad | Aktueller Status | Hier starten |
|:-----|:---------------|:-----------|
| **SiFli-SDK** | Offizieller SiFli-Pfad für die SF32-Referenzentwicklung mit RT-Thread, Bluetooth, Grafik, Audio und Energiesparfunktionen sowie für die Inbetriebnahme der Boards. | [SiFli-SDK](sifli/getting-started-sifli-sdk.md) |
| **SiFli CodeKit** | Offizieller SiFli-Workflow für VS Code: SDK einrichten, Projekte anlegen, bauen, flashen und den seriellen Monitor verwenden. | [SiFli CodeKit](sifli/getting-started-sifli-codekit.md) |
| **Zephyr** | Für `sf32lb52_devkit_lcd` ist seit Zephyr v4.3.0 gepflegter Support im Upstream verfügbar. | [Zephyr Upstream](zephyr/getting-started-zephyr-upstream.md) |
| **Arduino** | OpenSiFli bietet ein ArduinoCore-zephyr-Paket in der Betaversion für das SF32LB52 DevKit LCD an. | [Arduino](arduino/getting-started-arduino.md) |
| **Rust** | `sifli-rs` von OpenSiFli ermöglicht eine Rust-Evaluierung, befindet sich aber noch in Entwicklung und ist nicht produktionsreif. | [Rust](rust/getting-started-rust.md) |
| **MicroPython** | Für ein verifiziertes Tutorial fehlen noch offizielle Firmware-Images, Flash-Befehle, REPL-Einstellungen und Angaben zu unterstützten APIs. | [MicroPython](micropython/getting-started-micropython.md) |

</div>

## Was Sie benötigen { #what-you-need }

Verwenden Sie zunächst ein Board, das den gewählten Softwarepfad unterstützt. Programmier- und serielle Anschlüsse können sich je nach Board und Framework unterscheiden:

- Ein SF32-Entwicklungsboard, z. B. das [SF32LB52-DevKit-LCD](../sf32-products/devkits/SF32LB52-DevKit-LCD.md).
- Ein Datenkabel und die für Board und Framework angegebene Programmier-/Seriellschnittstelle. Beim SF32LB52-DevKit-LCD verwenden Sie gemäß den [Anschlussanweisungen von SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/get-started.html) für serielle Downloads den USB-zu-UART-Port; verwechseln Sie ihn nicht mit dem dedizierten USB-Funktionsanschluss.
- Ein Computer mit Windows, macOS oder Linux.
- Ein serielles Terminal, das für die Board-Konsole eingerichtet ist, damit Sie Startmeldungen und Beispielausgaben sehen können.

!!! tip "Verwenden Sie ein Datenkabel"
    USB-Kabel, die nur zum Laden geeignet sind, verursachen häufig Probleme bei der Erstinbetriebnahme. Wenn das Board zwar mit Strom versorgt wird, aber kein serieller Anschluss erscheint, verwenden Sie ein nachweislich funktionierendes Datenkabel und schließen Sie es direkt an einen USB-Anschluss des Computers an.

## Empfohlene Erstinbetriebnahme { #recommended-first-run }

Wenn Sie zum ersten Mal mit einem SF32-Board arbeiten, beginnen Sie mit [SiFli-SDK](sifli/getting-started-sifli-sdk.md). Es ist der Referenz-Softwarestack für SF32 und die zuverlässigste Grundlage, um Board, Kabel, serielle Schnittstelle, Flash-Ablauf und Toolchain zu überprüfen.

Sobald `hello_world` erfolgreich läuft, können Sie zu einem anderen Framework wechseln, das Ihre konkrete Hardware unterstützt. Falls spätere Experimente fehlschlagen, steht Ihnen damit eine nachweislich funktionierende Konfiguration zur Wiederherstellung zur Verfügung.

## Erfolgskriterien { #what-success-looks-like }

Am Ende eines Leitfadens für die ersten Schritte sollten Sie:

- Ein erstes Beispiel gebaut oder geladen haben.
- Das Beispiel auf das Board geflasht haben.
- Die serielle Konsole geöffnet haben.
- Vorhersehbare Ausgaben gesehen haben, wie ein Boot-Protokoll, `hello_world`, einen Shell-Prompt oder ein REPL-Banner.
- Den Boardnamen, den seriellen Port und den funktionierenden Flash-Befehl notiert haben.

Halten Sie diese Angaben in Ihren Projektnotizen fest. Wenn Sie Beispiele ändern, können Sie damit am schnellsten zu einer funktionierenden Ausgangskonfiguration zurückkehren.

## Weiter mit den Tutorials { #continue-with-tutorials }

Sobald Sie die erfolgreiche Erstinbetriebnahme wiederholen können, fahren Sie mit der [Tutorial-Übersicht](tutorials/overview.md) fort. Dort geht es zunächst um einzelne Peripheriefunktionen, dann um die Kombination mehrerer Subsysteme und schließlich um die Validierung, die für ein Produkt erforderlich ist.

## Wann Sie zum Bereich „Entwicklung“ wechseln sollten { #when-to-move-to-develop }

Der Bereich „Erste Schritte“ ist abgeschlossen, sobald Sie eine funktionierende Erstinbetriebnahme wiederholen können. [Entwicklung](../develop/index.md) bietet die laufende technische Referenz zu Plattformreife, Tools, Flash- und Debug-Abläufen, Firmwarearchitektur und Produktintegration. Nach der ersten Inbetriebnahme erfahren Sie in der [CodeKit-Toolreferenz](../develop/tools/codekit.md), welche Rolle CodeKit im täglichen Entwicklungsablauf spielt. Diese Seite konzentriert sich auf den Einstieg.

## Vor der Wahl eines Entwicklungspfads { #before-choosing-a-development-path }

Prüfen Sie vor der Wahl eines Softwarepfads, ob die Dokumentation genau Ihr Board und Ihre Softwareversion abdeckt. Achten Sie insbesondere auf:

- Eine öffentliche, nach Board aufgeschlüsselte Übersicht zum Supportstatus und Reifegrad von SiFli-SDK, CodeKit, Zephyr, Arduino und MicroPython.
- Die genaue Board-Kennung, die der jeweilige unterstützte Softwarepfad verwendet.
- Flash-/Download-Anleitungen für Windows, macOS und Linux.
- Erwartete serielle Ausgabe für jedes erste Beispiel.
- Wiederherstellungsschritte bei fehlgeschlagenen Flash-Vorgängen oder ungültigen Firmware-Images.
- Bekannte Einschränkungen der Frameworks, insbesondere bei Bluetooth, Display, Speicher, USB und dem Energiesparverhalten.
- Release Notes mit den kompatiblen Versionen von SDK, CodeKit, Paket, Firmware-Image und Board-Support.

Gehen Sie nicht davon aus, dass ein Softwarepfad, der auf einem Board funktioniert, für alle SF32-Boards verfügbar ist. Prüfen Sie das konkrete Board und die vorgesehene Softwareversion.
