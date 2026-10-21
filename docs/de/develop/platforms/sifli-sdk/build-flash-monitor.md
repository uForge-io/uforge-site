---
icon: lucide/terminal
description: "Der tägliche Entwicklungsablauf mit dem SiFli-SDK: Umgebung aktivieren, mit scons bauen, per UART-Download oder sftool flashen und die serielle Ausgabe überwachen."
tags:
    - Entwicklung
    - SiFli-SDK
---

# Bauen, Flashen und Überwachen der seriellen Ausgabe { #build-flash-monitor }

Diese Seite beschreibt den täglichen Entwicklungsablauf mit dem SiFli-SDK: Umgebung aktivieren, mit `scons` bauen, das Board flashen und die Logs beobachten.

## Das SDK aktivieren { #activate-the-sdk }

Installieren Sie die SDK-Umgebung anhand der [offiziellen Installationsanleitung](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html) für Ihre SDK-Version. Aktivieren Sie die Umgebung vor dem Build in jedem neuen Terminal, indem Sie das Export-Skript im SDK-Stammverzeichnis ausführen:

=== "macOS / Linux"

    ```bash
    cd ~/OpenSiFli/SiFli-SDK
    . ./export.sh
    ```

=== "Windows"

    ```powershell
    cd C:\OpenSiFli\SiFli-SDK
    .\export.ps1
    ```

Das Export-Skript lädt die zur aktuellen SDK-Arbeitskopie gehörende Umgebung in das jeweilige Terminal. Installations- und Verwaltungsschritte unterscheiden sich je nach SDK-Version; folgen Sie deshalb der passenden offiziellen Anleitung.

## Bauen { #build }

Aus dem Verzeichnis eines Beispielprojekts:

```bash
scons --board=<board_name> -j8
```

Wählen Sie einen zu Ihrem Rechner passenden Wert für `-j`. Wenn die Board-Kennung keinen Core angibt, wählt das SDK standardmäßig HCPU. Für `sf32lb52-lcd_n16r8` lautet das Ausgabeverzeichnis beispielsweise `build_sf32lb52-lcd_n16r8_hcpu/`. Verwenden Sie das Ausgabeverzeichnis für die vom SDK ermittelte Kombination aus Board und Core. Ist der Core bereits in der Board-Kennung angegeben, hängen Sie `_hcpu` nicht noch einmal an.

## Bereinigen und neu bauen { #clean-rebuilds }

Bereinigen Sie den Build, wenn Sie das Board wechseln, die Konfiguration wesentlich ändern oder ein verdächtiges Build-Artefakt untersuchen. Führen Sie dazu im Verzeichnis des Beispielprojekts die dokumentierte SCons-Bereinigungsoption aus:

```bash
scons -c
```

Der Befehl bereinigt die Build-Ziele sowie die erzeugten temporären Dateien und Objektdateien. Bauen Sie anschließend mit der vorgesehenen Board-Konfiguration erneut.

## Flashen { #flash }

Verwenden Sie beispielsweise für das HCPU-Ziel `sf32lb52-lcd_n16r8` das beim Build erzeugte UART-Download-Skript:

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

OpenSiFli veröffentlicht außerdem [`sftool`](https://github.com/OpenSiFli/sftool), ein quelloffenes Kommandozeilenwerkzeug zur Kommunikation mit SiFli-SoCs über eine serielle Schnittstelle. Zu den dokumentierten Funktionen zählen das Schreiben, Lesen und Löschen von Flash sowie die Steuerung des Chip-Resets. Welche Chips und Speichertypen unterstützt werden und welche Befehlsoptionen verfügbar sind, erfahren Sie in der README des Werkzeugs.

## Serielle Ausgabe überwachen { #monitor }

Verwenden Sie ein serielles Terminal mit den Einstellungen des Boards und Beispiels. Die serielle Ausgabe sollte Bootmeldungen, RT-Thread-Startmeldungen, Anwendungsausgaben oder eine Shell-Eingabeaufforderung enthalten.

Halten Sie fest:

- Boardname.
- Serieller Port.
- Baudrate.
- Build-Befehl.
- Flash-Befehl.
- SDK-Branch oder -Release.

## Täglicher Entwicklungszyklus { #daily-developer-loop }

<div align="center"><em>Tabelle: Täglicher Entwicklungszyklus</em></div>

<div align="center" markdown>

| Schritt | Ziel |
|:-----|:-----|
| Aktivieren | Die SDK-Umgebung in das aktuelle Terminal laden. |
| Konfigurieren | Board und Funktionsoptionen auswählen. |
| Bauen | Board-spezifische Binärdateien erzeugen. |
| Flashen | Das Image auf die Hardware übertragen. |
| Überwachen | Boot- und Anwendungsverhalten bestätigen. |
| Dokumentieren | Befehle und Protokolldetails für die Reproduzierbarkeit sichern. |

</div>

## Mit einem passenden Beispiel beginnen { #start-from-a-matching-example }

Bevor Sie ein Projekt anlegen oder grundlegend ändern, wählen Sie das [SDK-Beispiel](../../examples/index.md), das am besten zum Board und zum kritischen Subsystem passt. Bauen, flashen und überwachen Sie zunächst dieses Beispiel im unveränderten Zustand. Halten Sie anschließend für das angepasste Projekt Boardname, SDK-Release, Befehle und erwartete Ausgabe fest.

Wenn Sie [CodeKit](../../tools/codekit.md) verwenden, bewahren Sie dieselben Nachweise auf und prüfen Sie, ob sich die Aktionen im Editor auch mit den SDK-Befehlen reproduzieren lassen.

## Fehlerbehebung { #troubleshooting }

<div align="center"><em>Tabelle: Fehlerbehebung</em></div>

<div align="center" markdown>

| Symptom | Prüfung |
|:--------|:------|
| Build-Tool nicht gefunden | `export.sh` / `export.ps1` im aktuellen Terminal erneut ausführen. |
| Boardname unbekannt | Die SDK-Dokumentation zu den unterstützten Boards prüfen. |
| Download-Skript kann den Port nicht öffnen | Serielle Terminals schließen und USB-UART-Kabel sowie Anschluss prüfen. |
| Flashen startet nicht | Die dokumentierte Download-Sequenz des Boards befolgen. Bei `sf32lb52-lcd_n16r8` nach Auswahl des seriellen Ports das Board neu starten und innerhalb von 2 Sekunden die Eingabetaste drücken, um den Download zu starten. Für andere Boards gilt deren jeweilige Anleitung. Zusätzlich Stromversorgung, ausgewählten Port und UART-Verbindung prüfen. |
| Serielle Ausgabe ist unlesbar | Baudrate prüfen und die Daten-UART verwenden, kein reines Ladekabel. |

</div>

## Checkliste für die Übergabe { #handoff-checklist }

Dokumentieren Sie bei der Übergabe eines Projekts an einen anderen Entwickler:

- SDK-Branch oder -Commit.
- Boardname.
- Einrichtungs- und Installationshinweise.
- Build-Befehl.
- Flash-Befehl.
- Einstellungen des seriellen Monitors.
- Erwartete erste Protokollzeilen.
- Befehl zur Wiederherstellung.
