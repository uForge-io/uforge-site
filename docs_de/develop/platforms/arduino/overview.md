---
icon: lucide/infinity
description: "ArduinoCore-zephyr für SF32LB52 DevKit LCD: Plattformeignung, Board-Identität, Loader- und Build-Modus-Auswahl, Integrationsgrenzen und Eskalationspfade."
tags:
    - Entwicklung
    - Arduino
---

# Arduino { #arduino }

[OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr) ist ein auf Zephyr basierender Arduino-Core für SF32. Er ist ein nützlicher Weg für Sketches, Peripherie-Experimente, Demonstrationen und frühe Prototypen auf dem **SiFli SF32LB52 DevKit LCD**.

!!! warning "Beta-Core"
    OpenSiFli kennzeichnet diesen Core als **BETA**. Funktionen, APIs, Paketinhalte, Loader-Verhalten und Releases können sich ändern. Prüfen Sie das aktuelle Verhalten im Projekt-README und in den Releases, bevor Sie diesen Weg für ein Produkt verbindlich festlegen.

Für die anfängliche IDE-Installation, Board-/Port-Auswahl, Bootloader-Installation und den Blink-Test verwenden Sie [Erste Schritte mit Arduino](../../../getting-started/arduino/getting-started-arduino.md). Diese Seite dient dazu, zu entscheiden, ob Arduino passt, und ein Arduino-basiertes Projekt nach diesem ersten Durchlauf zu pflegen.

## Wo Arduino passt { #where-arduino-fits }

Wählen Sie Arduino, wenn schnelle Iteration und das vertraute Sketch-Modell wichtiger sind als vollständiger Zugriff auf SF32-spezifische Fähigkeiten. Es eignet sich gut für Machbarkeitsnachweise, einfache Prüfungen von Peripherie, Schul- oder Demonstrationsprojekte und Teams mit einer bestehenden Arduino-Codebasis.

Wechseln Sie zu [SiFli-SDK](../sifli-sdk/overview.md), wenn das Produkt von einer Firmware-Baseline für die Produktion, Bluetooth-Stack-Tuning, grafiklastigen Anwendungen, der Optimierung des Energieverbrauchs, der Board-Inbetriebnahme oder Hersteller-Middleware abhängt. Verwenden Sie [Zephyr](../zephyr/overview.md), wenn Sie Devicetree, Kconfig und die Zephyr-native Anwendungsstruktur direkt kontrollieren müssen.

<div align="center"><em>Tabelle: Eignung der Arduino-Plattform</em></div>

<div align="center" markdown>

| Arduino wählen für | Anderen Pfad bevorzugen für |
|:-------------------|:------------------------|
| Kurze Sketches und schnelle Peripherie-Experimente. | Ein Produkt mit umfassenden, validierten SF32-Funktionsanforderungen. |
| Teams, die bereits mit Arduino IDE oder Arduino CLI produktiv sind. | Inbetriebnahme eigener Boards oder tiefe Kontrolle über Flash, Stromversorgung und Middleware. |
| Demonstrationen und frühe Prototypen zur Machbarkeitsprüfung. | Zephyr-native Konfiguration, Treiber und RTOS-Struktur. |

</div>

## Board-Identität { #board-identity }

Das aktuelle öffentliche Paket richtet sich an das SF32LB52 DevKit LCD. Bewahren Sie diese Werte im Projektprotokoll und in Fehlerberichten auf: Sie bestimmen, wie der Sketch gebaut, geladen und dem Board zugeordnet wird.

<div align="center"><em>Tabelle: Arduino-Board-Identität</em></div>

<div align="center" markdown>

| Element | Wert |
|:-----|:------|
| Titel im Boards Manager | **SiFli Serial Boards** |
| Arduino-Plattform | `sifli:sf32lb52` |
| Board | **SiFli SF32LB52 DevKit LCD** |
| FQBN | `sifli:sf32lb52:sf32lb52devkitlcd` |
| Zephyr-Ziel | `sf32lb52_devkit_lcd` |
| Variante | `sf32lb52_devkit_lcd_sf32lb525uc6` |
| Upload-Tool | `sftool` |
| `LED_BUILTIN` | `13` |

</div>

Ein ähnlich benannter SiFli- oder Zephyr-Board-Bezeichner ist nicht mit dieser FQBN austauschbar. Die Board-Auswahl legt die Build- und Upload-Parameter fest.

## Build- und Loader-Modell { #build-and-loader-model }

ArduinoCore-zephyr kombiniert die Arduino-API für Sketches mit einem Zephyr-Loader und board-spezifischer Konfiguration. Die beiden Optionsmenüs beeinflussen das Start- und Linking-Verhalten und nicht nur Compiler-Flags.

<div align="center"><em>Tabelle: Build- und Loader-Optionen</em></div>

<div align="center" markdown>

| Option | Verhalten | Technische Auswirkung |
|:-------|:---------|:------------------------|
| Build-Modus `Standard` | Startet den Sketch, nachdem er geladen wurde. | Für normalen Sketch-Betrieb verwenden. |
| Build-Modus `Debug` | Lässt die Zephyr-Shell auf `sketch` warten. | Nur nützlich, wenn die Shell Teil des Debug-Workflows ist. |
| Link-Modus `Dynamic` | Verpackt den Sketch für den normalen Loader-basierten Ablauf. | Bindet den Loader in Laufzeit- und Speicherbudget ein. |
| Link-Modus `Static` | Verwendet ein statisch gelinktes Image. | Für Loader-bezogene Untersuchungen oder wenn die Kompromisse ausdrücklich verstanden werden. |

</div>

Beginnen Sie mit **Standard** und **Dynamic**. Im Debug-Modus startet ein hochgeladener Sketch erst, wenn `sketch` aus der Zephyr-Shell heraus ausgeführt wird; dies ist eine häufige Ursache für einen scheinbar erfolgreichen Upload ohne Anwendungsverhalten.

Der Loader ist ein separates Board-Artefakt. Burn Bootloader ist normalerweise eine Erstbenutzungs-, Update- oder Recovery-Operation, kein Teil jedes Sketch-Uploads. Dokumentieren Sie die Arduino-Paketversion und jedes Loader-Update gemeinsam; nicht übereinstimmende Annahmen sind später schwer zu diagnostizieren.

## Integrationsgrenzen { #integration-boundaries }

Betrachten Sie den Arduino-Core als Integrationsschicht, nicht als Ersatz für die zugrunde liegende Zephyr-Plattform. Ein Sketch kann Zephyr-Symbole oder Subsysteme erfordern, die der Loader nicht bereitstellt oder aktiviert. Typische Symptome sind ein undefiniertes Zephyr-Symbol, ein fehlendes Subsystem oder Speicherdruck durch dynamisches Laden und die Shell.

Stellen Sie vor der Aufnahme einer Bibliothek oder Funktion in einen Produktprototyp alle folgenden Punkte sicher:

- Die genaue Paketversion, FQBN, Build-Modus und Link-Modus.
- Die Revision des Ziel-Boards und das zugehörige Verfahren für serielles Herunterladen und Wiederherstellung.
- Ein getestetes Beispiel für die benötigte Peripherie oder Bibliothek.
- Ein messbares RAM- und Flash-Budget mit der vorgesehenen Loader-Konfiguration.
- Ein Recovery-Weg über den Arduino-Loader oder SiFli-SDK-Firmware.

Schließen Sie nicht allein deshalb auf Bibliotheksunterstützung, weil eine Arduino-API oder ein ähnlich benannter Zephyr-Treiber existiert. Validieren Sie die vollständige Kombination aus Sketch, Loader, Board und Paket auf der Zielhardware.

## Diagnose und Eskalation { #diagnose-and-escalate }

Beginnen Sie mit dem Leitfaden zur ersten Inbetriebnahme, wenn ein Board nicht erkannt, geflasht oder zum Blink-Test gebracht werden kann. Sobald diese Baseline funktioniert, nutzen Sie die folgende Zuordnung, um die Fehlersuche zu verkürzen.

<div align="center"><em>Tabelle: Zuständigkeit bei Arduino-Problemen</em></div>

<div align="center" markdown>

| Symptom nach erfolgreicher Erstinbetriebnahme | Erste Untersuchung |
|:-------------------------------------------|:--------------------|
| Sketch startet erst nach `sketch` | Bestätigen, dass der Debug-Modus absichtlich gewählt wurde. |
| Fehlende Zephyr-Funktion oder fehlendes Subsystem | Core-README und Loader-Exporte/-Konfiguration prüfen. |
| Speicherfehler oder Instabilität | Das Sketch-Budget messen; dynamisches Laden und die Zephyr-Shell berücksichtigen; Static nur mit Recovery-Plan bewerten. |
| Bibliothek kompiliert, aber Hardware funktioniert nicht | Board-Pin-Annahmen bestätigen und gegen ein minimales, board-spezifisches Beispiel testen. |
| Upload oder Recovery schlägt fehl | Die dokumentierte Arduino-Baseline neu herstellen, danach bei Bedarf den SiFli-SDK-Recovery-Pfad des Boards verwenden. |

</div>

Für einen nützlichen Fehlerbericht geben Sie die Paketversion, IDE- oder CLI-Version, das Betriebssystem, die FQBN, den Build-Modus, den Link-Modus, die Board-Revision, die vollständige Upload-Ausgabe und das serielle Log an.

## Verwandte Seiten { #related-pages }

- [Erste Schritte mit Arduino](../../../getting-started/arduino/getting-started-arduino.md)
- [Zephyr](../zephyr/overview.md)
- [SiFli-SDK](../sifli-sdk/overview.md)
- [SF32LB52 DevKit LCD](../../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)
