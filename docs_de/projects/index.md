---
icon: lucide/folder-kanban
title: "Projektübersicht"
description: "Durchgängige μForge-Projekte verbinden ausgewählte Hardware, eine Softwarebasis, Validierungsnachweise und eine Übergabe an die Produktion."
tags:
    - Projekte
---

# Projektübersicht { #projects-overview }

Projekte sind anwendungsbezogene Referenzen, die Sie kopieren, anpassen und zur Erkundung einer Produktidee mit SF32 nutzen können. Statt einzelne Funktionen isoliert vorzuführen, zeigt jedes Projekt eine gezielte Kombination von SF32-Fähigkeiten in etwas, das man tatsächlich bauen und nutzen könnte.

## Wofür Projekte gedacht sind { #what-projects-are-for }

Jedes Projekt sollte:

- **Anwendungsbezogen sein.** Ausgangspunkt ist ein nachvollziehbares Produktverhalten oder Anwendungsszenario, keine abstrakte Funktionsdemo.
- **Vollständig genug zum Nachvollziehen sein.** Das Projekt verbindet ausgewählte Hardware, Softwarebasis und Abhängigkeiten mit Integrationsmeilensteinen, Validierungsnachweisen und einem Anpassungspfad. So können Sie einen wesentlichen Teil des Entwicklungsablaufs selbst durchlaufen.
- **Zum Kopieren gedacht sein.** Es bietet eine praktische Basis, die Sie zunächst reproduzieren und anschließend an eigene Hardware, Ihr Bedienkonzept oder Ihre Produktanforderungen anpassen.
- **Spaß beim Bauen machen.** Ein Projekt soll zum Experimentieren einladen und sichtbar machen, was die Fähigkeiten von SF32 ermöglichen; Nutzen und Freude gehören hier zusammen.

Beginnen Sie mit einem Projekt, nachdem Sie die passende Grundlage aus [Erste Schritte](../getting-started/index.md) erarbeitet haben. [Referenzdesigns](../hardware/reference-designs/reference-designs.md) beschreiben wiederverwendbare Baselines und Validierungsabläufe. Deren aktueller Eintrag Connected Wearable ist ein Workflow, kein veröffentlichtes Board-Paket. Ein Projekt sollte auf eine konkrete, passende Baseline verweisen, sofern eine existiert; andernfalls sollte es seine eigene Baseline benennen und validieren, statt den Eindruck zu erwecken, ein Planungsablauf sei ein qualifiziertes Design.

## SiFli-SDK-Projekte { #sifli-sdk-projects }

!!! info "Zuständigkeit für Drittanbieterprojekte"
    [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) wird von Xinyuan-LilyGO/LilyGO und nicht von SiFli gepflegt. Informationen zu Board-spezifischer Hardware und Firmware finden Sie im Repository von LilyGO; für den SF32-Baustein und das SiFli-SDK sind die SiFli-Quellen maßgeblich.

<div align="center"><em>Tabelle: Projektverzeichnis</em></div>

<div align="center" markdown>

| Projekt | Ergebnis | Hardware- und Softwarebasis | Geeignet für |
|:--------|:--------|:-------------------------------|:---------|
| [SF32-Sprachassistent Xiaozhi](sf32-xiaozhi.md) | Vernetzter Sprach- und Displayassistent auf Basis der Open-Source-Implementierung Xiaozhi SF32. | Unterstützte SF32LB52-Boards, Xiaozhi-SF32-Quellcode, Bluetooth PAN und Xiaozhi-Clouddienste. | Einen KI-Sprachdialog als Produktablauf bewerten und Hardware oder Anwendungsverhalten anpassen. |
| [SF32-BLE-Gegensprechanlage (Talkback)](sf32-ble-talkback.md) | BLE-Push-to-Talk-Gegensprechanlage für mehrere Geräte mit Rollenwahl, Opus-Sprachcodierung, Wiederverbindung der sekundären Geräte, Statusanzeige und Energiesparbetrieb. | Mindestens zwei SF32LB52-DevKit-ULP-Boards, festgelegter Talkback-Quellstand, festgelegte, mit SiFli-SDK 2.4 kompatible Revision und `talk_back/1.2@sifli`. | Verhalten einer mobilen Gruppensprechanlage, Akustik, HF-Wiederherstellung und Energiebedarf vor eigener Hardware qualifizieren. |
| [EPUB-Reader mit E-Paper-Display auf SF32](sf32-epd-reader.md) | Lokaler EPUB-Reader mit Bibliotheks- und Inhaltsnavigation, Tasten- und Touchbedienung, dynamischen Schriftarten, Voll- und Teilaktualisierung, Speicher und Energiesparzuständen. | SF32-OED-EPD V1.1, E-Paper YZC085 V1.05, festgelegte EPD-Reader- und SDK-Commits, TF-Speicher sowie geprüfte Inhalte und Schriftarten. | E-Paper-Lesegerät, EPUB- und Renderinggrenzen, Panel-Waveforms, Speicherwiederherstellung und Energieverhalten bewerten. |
| [SuperKey Multifunktions-Makrotastatur](superkey.md) | USB-HID/CDC-Desktopcontroller mit drei Displays, Tasten, Drehgeber, Sensorik, Telemetrie und Begleit-App. | Offene sf32-keyboard-Hardware, Firmwareziel `sf32lb52-superkey` und SuperKeyHub. | Desktop-HMI, Makrotastatur, Statusanzeige oder hostverbundene Steueroberfläche evaluieren. |
| [Radiation Monitor](radiation-monitor.md) | Tragbare 2,4-GHz-Signalstärkeanzeige mit 79 Messpunkten, Glättung und Verlaufswiedergabe. | SF32LB52-HF-Testpfad, LVGL-Display, KEY2-Steuerung und kontrollierter HF-Vergleichsaufbau. | Relative Interferenztrends untersuchen und entscheiden, ob ein kalibrierter HF-Messpfad gerechtfertigt ist. |
| [Pocket Pi SF32 Handheld-Spielkonsole](pocket-pi.md) | Lokales Handheld mit NES-Emulation, Spielebrowser, Eingabe, Audio, Speicherständen sowie internem und TF-Kartenspeicher. | SF32LB52-DevKit-ULP-Ziel, PocketPi-/Nofrendo-Quellcode, AW9523-Steuerung und rechtmäßig nutzbare NES-Inhalte. | Eine spielorientierte Last aus Grafik, Eingabe, Audio, Speicher und Energiebedarf vor eigener Hardware testen. |
| [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) | Drittanbieter-SF32-Entwicklungsplattform mit Display, Touch, Bewegungssensorik, Speicher, Audio, LoRa und Energieverwaltung. | LilyGO-T-Display-SF32-Hardware, für die Evaluierung ausgewählte und dokumentierte Revisionen des Board-Repositorys und des LilyGO-SDK-Forks sowie das Ziel `t-display-sf32_hcpu`. | Eine von LilyGO gepflegte Wearable-, Handheld-, Sensor- oder HMI-Basis evaluieren, ohne sie mit einem offiziellen SiFli-Projekt zu verwechseln. |

</div>

## Zephyr-Projekte { #zephyr-projects }

Diese Gruppe umfasst Projekte, die direkt auf Zephyr oder auf einer dokumentierten Zephyr-basierten Schicht wie OpenSiFli ArduinoCore-zephyr aufbauen.

<div align="center"><em>Tabelle: Zephyr-Projektverzeichnis</em></div>

<div align="center" markdown>

| Projekt | Ergebnis | Hardware- und Softwarebasis | Geeignet für |
|:--------|:--------|:-------------------------------|:---------|
| [Arduboy2-Port für SF32LB52](arduboy2-sifli.md) | Reproduzierbarer Weg, ein Arduboy2-artiges Spiel oder interaktives Demo auf SF32LB52 zu evaluieren. | OpenSiFli-Quelle Arduboy2-SiFli, ArduinoCore-Zephyr-Variante `sf32lb52_devkit_lcd_sf32lb525uc6` und der dokumentierte externe Pfad für Display, Eingabe und Audio. | Lokale Spielinteraktion, Grafik, Eingabe, Audio und die Grenzen einer portablen, Arduino-orientierten Anwendungsschicht testen. |
| [ZMK-Tastaturfirmware auf SF32](zmk-sf32.md) | Reproduzierbare SF32LB52-Basis für eine geteilte Tastatur mit Matrixscan, Ebenen, USB-HID, BLE-Verbindungen zwischen den Tastaturhälften und zum Host, Einstellungen und ZMK Studio. | OpenSiFli/zmk, die ZMK-Boardvariante SF32LB52-DevKit-LCD sowie die Shields `urchin_sf32lb52_left/right` mit festgelegten Manifest-Abhängigkeiten. | Drahtlose ZMK-Tastaturen, Makropads oder eigene HID-Produkte evaluieren und dabei den Reifegrad des SF32-Downstream-Ports erfassen. |

</div>

## Was jedes Projekt enthält { #what-every-project-includes }

Jedes μForge-Projekt sollte das angestrebte Ergebnis, die Zielgruppe, unterstützte Hardware- und Softwareversionen, Voraussetzungen, das Quell-Repository, Build-Schritte nach Meilensteinen, Validierungskriterien, Messwerte und die Übergabe zur Produktanpassung dokumentieren. Ein Projekt ist ein Ausgangspunkt für die Entwicklung, ersetzt jedoch nicht die Produktionsvalidierung der finalen Hardware sowie die Prüfung von Serviceintegration, Sicherheit, Datenschutz und regulatorischen Anforderungen.

!!! note "Automatisch erstellter Inhalt"
    Diese Seite wurde ohne vorhandenes Quelldokument zusammengestellt bzw. entworfen. Prüfen Sie technische Aussagen anhand der offiziellen SiFli-Dokumentation, bevor Sie sich darauf verlassen.
