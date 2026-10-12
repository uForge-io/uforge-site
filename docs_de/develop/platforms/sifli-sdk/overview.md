---
icon: lucide/package
description: "SiFli-SDK als Referenzpfad für die SF32-Entwicklung: Builds mit scons und Konfiguration mit sdk.py menuconfig, Boardnamen, Projektstruktur und Fragen zur Produktreife."
tags:
    - Entwicklung
    - SiFli-SDK
---

# SiFli-SDK { #sifli-sdk }

SiFli-SDK ist das offizielle Entwicklungs-SDK von SiFli für SF32-Firmware. Es stellt eine RT-Thread-basierte Entwicklungsumgebung bereit und enthält für unterstützte Targets auch No-OS-Beispiele. Außerdem umfasst es von SiFli gepflegte Board-Unterstützung und Middleware für Bereiche wie Bluetooth, Grafik, Audio, Energiemanagement, Speicher und Produktionsabläufe. Welche Funktionen verfügbar sind, hängt von Chip, Board und SDK-Version ab.

!!! info "SiFli-Solution"
    SiFli-Solution ist ein separates SiFli-Softwarepaket und liegt außerhalb des Umfangs dieser Seite. Diese Seite und die verlinkten Entwicklungsunterlagen dokumentieren ausschließlich SiFli-SDK. Informationen zu Umfang, unterstützten Geräten und Zugangsvoraussetzungen von SiFli-Solution finden Sie in der offiziellen [Dokumentation zu SiFli Solution](https://docs.sifli.com/projects/solution/index.html); wenden Sie sich bei Bedarf direkt an SiFli.

Nutzen Sie [Erste Schritte mit SiFli-SDK](../../../getting-started/sifli/getting-started-sifli-sdk.md) für die Erstinstallation und zum Ausführen von `hello_world`. Diese Seite beschreibt die Arbeit mit dem SDK, sobald die Toolchain eingerichtet und einsatzbereit ist.

Primäre Referenzen:

- [SiFli-SDK-Installationsanleitung](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html)
- [Liste der vom SDK unterstützten SF32LB52x-Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)
- [OpenSiFli/SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

## Wann SiFli-SDK verwendet werden sollte { #when-to-use-sifli-sdk }

Wählen Sie SiFli-SDK, wenn Sie Folgendes benötigen:

- Einen dokumentierten Entwicklungspfad mit von SiFli gepflegter Board-Unterstützung und Beispielen für den gewählten Chip und die gewählte SDK-Version.
- Beispiele und Middleware für Bluetooth, Display, Audio, Energiemanagement, Speicher, USB und OTA, sofern sie vom gewählten Ziel und Release unterstützt werden.
- RT-Thread-Integration und Shell-Werkzeuge.
- Board-Konfiguration über SDK-Board-Namen wie `sf32lb52-lcd_n16r8`.
- Zugriff auf SiFli-spezifische Middleware, Tools, Partitionslayouts und Produktionsabläufe.

## Entwicklungsmodell { #development-model }

Die Seite [Erste Schritte mit SiFli-SDK](../../../getting-started/sifli/getting-started-sifli-sdk.md) richtet die Toolchain ein und prüft eine funktionierende `hello_world`-Referenz. Halten Sie danach SDK-Revision, ausgewähltes Board, Beispiel-/Projektverzeichnis, Konfiguration und die zugehörigen Build- und Flash-Artefakte gemeinsam in einem reproduzierbaren Build-Protokoll fest. Wenn der Board-Name keinen Core angibt, folgt das HCPU-Ausgabeverzeichnis häufig dem Muster `build_<board_name>_hcpu/`; für `sf32lb52-lcd_n16r8` lautet es beispielsweise `build_sf32lb52-lcd_n16r8_hcpu/`. Verwenden Sie das tatsächlich für das aufgelöste Board-/Core-Ziel erzeugte Verzeichnis, statt den Namen manuell zusammenzusetzen.

Legen Sie für reproduzierbare Entwicklung einen SDK-Branch fest, dokumentieren Sie den Board-Namen, halten Sie lokale Board-Änderungen getrennt von den Herstellerdateien und nehmen Sie Konfigurationsänderungen in kleinen, überprüfbaren Schritten vor. Der detaillierte Ablauf zum Bauen, Flashen und Überwachen ist unter [Bauen, Flashen und Überwachen der seriellen Ausgabe](build-flash-monitor.md) beschrieben.

## Board-Namen { #board-names }

Die Board-Namen des SiFli-SDK sind SDK-spezifisch und stimmen möglicherweise nicht mit Zephyr-Board-Namen, Arduino-FQBNs oder Marketing-Board-Namen überein. Übernehmen Sie den Namen stets aus der Liste der vom SDK unterstützten Boards oder aus der Dokumentation des Beispiels.

Für SF32LB52 DevKit LCD-Boards lautet ein in Einstiegsbeispielen häufig verwendeter SDK-Boardname:

```text
sf32lb52-lcd_n16r8
```

## Projektstruktur { #project-structure }

Die meisten SDK-Beispiele folgen dem Muster:

```text
example/<domain>/<example_name>/<rtos_or_mode>/project
```

Zum Beispiel:

```text
example/get-started/hello_world/rtt/project
```

Beginnen Sie beim Aufbau von Produkt-Firmware mit dem nächstliegenden funktionierenden SDK-Beispiel und ändern Sie jeweils ein Subsystem nach dem anderen. So bleiben Board-Konfiguration, Middleware-Abhängigkeiten, Partitionsannahmen und Treiber-Setup intakt.

## Konfiguration { #configuration }

Verwenden Sie im Beispielprojekt den SDK-Befehl `menuconfig`, um die Funktionskonfiguration für ein ausgewähltes Board anzupassen:

```bash
sdk.py menuconfig --board=<board_name>
```

Typische Anpassungen sind:

- Middleware aktivieren oder deaktivieren.
- Bluetooth-Rollen oder -Profile ändern.
- Display-, Dateisystem- oder Audio-Unterstützung anpassen.
- Energiemanagement abstimmen.
- Protokollierungs- oder Shell-Optionen auswählen.

## Fragen zur Produktreife { #production-readiness-questions }

Beantworten Sie die folgenden Fragen, bevor Sie SiFli-SDK für einen Produkt-Branch festlegen:

- Welcher SDK-Release-Branch wird für das Produkt verbindlich festgeschrieben?
- Welche Board-Support-Dateien gehören dem Produkt, welche dem Hersteller?
- Welche Beispiele belegen die kritischen Funktionen?
- Welche Partitionstabelle wird für Fertigung und OTA verwendet?
- Welche Tools sind für das Flashen in der Fertigung freigegeben?
- Welche Protokolle sind in Builds für die Produktfreigabe aktiviert?
- Welches Wiederherstellungsimage wird für den Laborbetrieb aufbewahrt?

## Praktische nächste Seiten { #practical-next-pages }

- [Bauen, Flashen und Überwachen der seriellen Ausgabe](build-flash-monitor.md)
- [Board-Konfiguration](board-configuration.md)
- [Komponenten und `sf-pkg`](components.md)
- [Beispiele](../../examples/index.md) — das am besten passende, nachweislich funktionierende Beispiel wählen, bevor ein Subsystem angepasst wird.
- [CodeKit](../../tools/codekit.md) — nutzen Sie den VS-Code-Ablauf bei Bedarf und halten Sie SDK-Board-Namen und Build-Protokoll im gesamten Projekt konsistent.
- [SDK-Anwendungshinweise](sdk-application-notes.md)
- [Partitionstabellen](../../firmware-topics/partition-tables.md)
- [Fehlersuche und Diagnose](debugging-diagnostics.md)
