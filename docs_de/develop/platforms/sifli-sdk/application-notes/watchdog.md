---
icon: lucide/timer-reset
title: "Watchdog konfigurieren"
description: "Die SF32-HCPU- und LCPU-Watchdog-Pfade mit SiFli-SDK aktivieren, bedienen und validieren."
tags: [Entwicklung, SiFli-SDK, Anwendungshinweise, Watchdog]
---

# Watchdog konfigurieren { #configure-the-watchdog }

Die SiFli-SDK-Dokumentation behandelt Watchdogs auf zwei Ebenen: die über die HAL zugängliche Hardware und den von Anwendungen verwendeten RT-Thread-Treiber. Instanznamen, Rücksetzungsumfang und Taktoptionen unterscheiden sich je nach Familie. Nutzen Sie den Vergleich unten und prüfen Sie die Konfiguration des Ziel-SDKs, bevor Sie sich auf ein bestimmtes Verhalten verlassen.

<div align="center" markdown>

<em>Tabelle: Dokumentiertes Watchdog-Verhalten nach Familie</em>

| Familie | Watchdog-Verhalten laut HAL | In der HAL-Anleitung angegebener Takt |
|---|---|
| SF32LB52x | Die HAL-Anleitung beschreibt eigene Watchdogs für HCPU und LCPU, die einen Interrupt auslösen oder ihr jeweiliges Subsystem zurücksetzen können. Zusätzlich gibt es einen systemweiten IWDT, der den gesamten Chip zurücksetzt. | Die Zählerbeschreibung basiert auf einem 32K-Takt; eine separate 52x-Taktauswahl wird in der Anleitung nicht genannt. |
| SF32LB55x | HCPU-WDT1 und LCPU-WDT2 können Interrupts auslösen; ein Hardware-Reset ist jeweils auf das zugehörige Subsystem beschränkt. Der System-IWDT löst keinen Interrupt aus, kann aber den gesamten Chip zurücksetzen. | Wahlweise RC10K oder 32K LXT. |
| SF32LB56x / SF32LB58x | Laut HAL-Anleitung können WDT1/WDT2 zusätzlich den gesamten Chip zurücksetzen. | RC10K; der Takt stammt nicht mehr aus dem 32K-Niedrigleistungstakt. |

</div>

!!! warning "Geltungsbereich des RT-Thread-Watchdog-Leitfadens"
    Der [Watchdog Usage Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/watchdog.html) ist unter dem Pfad `sf32lb52x` veröffentlicht, nennt im Text jedoch ausdrücklich SF32LB55X. Der unten beschriebene Standard-Timeout von 30 Sekunden, die Bedienung aus dem IDLE-Thread, das Verhalten im Schlafmodus und die Anwendungs-Resetfolge gelten für die dort beschriebene 55x-Konfiguration. Sie sind keine allgemeine Zusicherung für alle Familien. Prüfen Sie diese Punkte anhand der Quelle und der generierten Konfiguration der Zielfamilie.

## Den Watchdog aktivieren und konfigurieren { #enable-and-configure-the-watchdog }

Führen Sie `sdk.py menuconfig` im Projektverzeichnis aus und aktivieren Sie die Watchdog-Option in der RT-Thread-Konfiguration für Gerätetreiber. Die genaue Menübezeichnung kann je nach SDK-Release variieren. Orientieren Sie sich an der Quellseite der Zielfamilie und prüfen Sie vor dem Kompilieren die erzeugte `rtconfig.h`.

Der verlinkte Watchdog Usage Guide zeigt zwei getrennte Einstellungen:

- `RTOS → On-chip Peripheral Drivers → Enable Watchdog Timer` aktiviert den Hardware-Watchdogtimer des Chips.
- `RTOS → RT-Thread Components → Device Drivers → Using Watch Dog device drivers` aktiviert den RT-Thread-Treiber.

Für die im verlinkten Leitfaden beschriebene 55x-Konfiguration beträgt der dokumentierte Standard-Timeout 30 Sekunden. Im Treibermenü legt `(30) Watch Dog timeout (NEW)` einen anderen Wert fest. Prüfen Sie den Standardwert für die Zielfamilie in `menuconfig` und bewahren Sie die erzeugte Konfiguration zusammen mit dem Firmware-Image auf.

Die folgenden Abbildungen zeigen Menüposition und Timeout-Feld aus dem verlinkten Leitfaden. Da URL-Pfad und im Text genannte Chipfamilie voneinander abweichen, dienen sie nur als Anschauungsbeispiele. Prüfen Sie den tatsächlichen Menüpfad und Standardwert in der `menuconfig`-Ausgabe Ihres Projekts.

![Watchdog-Treiberoption im menuconfig](../../../../assets/develop/app-notes/watchdog/watchdog2.png){ loading="lazy" }
<div align="center"><em>Abbildung: Watchdog-Treibermenü aus dem verlinkten Watchdog Usage Guide.</em></div>

![Watchdog-Timer-Option im menuconfig](../../../../assets/develop/app-notes/watchdog/watchdog.png){ loading="lazy" }
<div align="center"><em>Abbildung: Watchdog-Timer-Konfiguration aus dem verlinkten Watchdog Usage Guide.</em></div>

## Vorgaben zum Bedienen des Watchdogs { #feeding-policy }

Das System bedient den Watchdog über den RT-Thread-`IDLE`-Thread. Solange kein Anwendungsthread länger als der konfigurierte Timeout ununterbrochen läuft, ist kein zusätzlicher Anwendungscode erforderlich.

Muss ein hochpriorer Thread länger als der Timeout ununterbrochen laufen, bedienen Sie den Watchdog aus diesem Thread mit:

```c
rt_hw_watchdog_pet();
```

Fügen Sie keine bedingungslose Watchdog-Schleife hinzu, die einen Scheduler-Stillstand oder ein Deadlock verdeckt. Der Bedienpunkt sollte den ordnungsgemäßen Fortschritt der überwachten Arbeit widerspiegeln.

## Schlaf- und Neustartverhalten { #sleep-and-reset-behavior }

- Beim Wechsel in `Standby` oder `Hibernate` wird der Watchdog deaktiviert; nach dem Aufwachen wird er wieder aktiviert.
- In den übrigen Schlafmodi läuft der Watchdog weiter. Das System muss daher vor Ablauf des Timeouts aufwachen und den Watchdog bedienen.
- HCPU verwendet den System-Watchdog. Ein Timeout startet den gesamten Chip neu.
- LCPU verwendet den LCPU-Subsystem-Watchdog. Ein Timeout erzeugt zunächst einen Interrupt; der Interrupt-Handler löst dann einen Software-Neustart des gesamten Chips aus.

## Validierungsablauf { #validation-sequence }

1. Halten Sie Chipfamilie, SDK-Revision, Timeout, die für die Watchdog-Bedienung zuständige Instanz und den Schlafmodus fest.
2. Prüfen Sie, ob eine normale Arbeitslast den vorgesehenen Punkt zum Bedienen des Watchdogs erreicht.
3. Unterbrechen Sie den Bedienpfad gezielt und prüfen Sie den erwarteten Neustartumfang und das Startverhalten.
4. Wiederholen Sie dies aus jedem unterstützten Schlafmodus, insbesondere `Standby` und `Hibernate`.
5. Bewahren Sie die Beobachtungen zum Neustart und alle Diagnosedaten aus dem Startvorgang zusammen mit dem Wiederherstellungstest des Produkts auf.

## Offizielle Quellen { #official-sources }

- [Watchdog Usage Guide (englisch; unter dem SF32LB52x-Pfad veröffentlicht, Text nennt SF32LB55X)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html)
- [Watchdog Usage Guide (chinesisch; derselbe SF32LB52x-Pfad, Text nennt SF32LB55X)](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/watchdog.html)
- [SF32LB52x-HAL-WDT-Anleitung (englisch)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/wdt.html)
- [SF32LB55x-HAL-WDT-Anleitung (chinesisch; mit Vergleichshinweisen zu 56x/58x)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/wdt.html)

Die folgenden familienbezogenen Watchdog-Anwendungshinweise konnten nicht verifiziert werden: `sf32lb55x/app_note/watchdog.html`, `sf32lb56x/app_note/watchdog.html` und `sf32lb58x/app_note/watchdog.html`. Suchergebnisse und direkte Aufrufversuche waren nicht eindeutig; daraus lässt sich nicht ableiten, dass diese Pfade einen 404-Fehler liefern.
