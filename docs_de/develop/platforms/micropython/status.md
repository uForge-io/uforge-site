---
icon: lucide/terminal-square
description: "Aktueller Status von MicroPython auf SF32: bisher kein offizieller Port gefunden, dazu die Voraussetzungen für einen unterstützten Entwicklungsweg."
tags:
    - Entwicklung
    - MicroPython
---

# MicroPython-Status { #micropython-status }

In der geprüften SiFli-Dokumentation und den OpenSiFli-Repositories wurde kein offizieller SF32-MicroPython-Port, kein Firmware-Image und kein boardspezifisches Flash-Verfahren gefunden.

Geprüft wurden die [öffentlichen OpenSiFli-Repositories auf GitHub](https://github.com/OpenSiFli/) und das [Dokumentationsportal von SiFli](https://docs.sifli.com/).

Das beweist nicht, dass es keine privaten oder von der Community durchgeführten Experimente gibt. Es bedeutet jedoch, dass diese Site MicroPython nicht als verifizierten SF32-Entwicklungspfad darstellen sollte, solange kein öffentliches Firmware-Image oder Quellbaum zum Verlinken vorliegt.

## Aktuelle Empfehlung { #current-recommendation }

Führen Sie MicroPython noch nicht als unterstützten Entwicklungsweg für SF32-Endnutzer auf. Belassen Sie diese Seite als Roadmap- und Statusseite, bis ein öffentliches Artefakt existiert, das Entwickler flashen und dessen Funktion sie reproduzieren können.

## Was eine vollständige Anleitung enthalten muss { #what-a-real-page-needs }

Bevor daraus ein normales Tutorial wird, sollte SiFli Folgendes veröffentlichen:

- Firmware-Images nach Board und Speicherkonfiguration.
- Quell-Repository und Build-Anleitung.
- Flash-Befehl und Recovery-Befehl.
- REPL-UART und Baudrate.
- Erwartete MicroPython-Startmeldung.
- Unterstützte `machine`-APIs.
- Dateisystemverhalten sowie Verhalten im abgesicherten Modus und bei der Wiederherstellung.
- Bekannte Einschränkungen bei Display, Bluetooth, Speicher, USB und im Energiesparbetrieb.

## Vorgeschlagener erster Funktionstest { #suggested-first-smoke-test }

Sobald Firmware existiert, sollte der erste Test rein seriell sein:

```python
import time

while True:
    print("Hello from SF32 MicroPython")
    time.sleep(1)
```

Prüfen Sie GPIO erst, wenn die Pinbezeichnungen dokumentiert sind.

## Mindestkriterien für den Einstieg { #minimum-acceptance-criteria }

Die MicroPython-Seite kann von einer Statusseite zu einer Anleitung „Erste Schritte“ werden, sobald alle folgenden Punkte erfüllt sind:

- Ein öffentliches Repository oder eine Release-Seite.
- Eine boardspezifische Binärdatei für mindestens ein SF32-Dev-Kit.
- Ein dokumentierter Flash-Befehl.
- Ein dokumentierter REPL-Port und eine Baudrate.
- Ein Recovery-Pfad zurück zur SiFli-SDK-Firmware.
- Eine Liste unterstützter `machine`-APIs.
- Mindestens ein auf echter Hardware getestetes GPIO-Beispiel.

## Warum das wichtig ist { #why-this-matters }

Eine vage Anweisung wie „ein MicroPython-Image herunterladen“ ist nicht umsetzbar. Nutzer benötigen ein genau bezeichnetes Image, ein passendes Board, ein Flash-Tool, eine REPL-Einstellung und einen Recovery-Pfad. Ohne diese Angaben erzeugt eine MicroPython-Seite Support-Aufwand, statt zu helfen.
