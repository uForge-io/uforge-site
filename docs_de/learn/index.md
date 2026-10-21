---
icon: lucide/lightbulb
title: "Lernübersicht"
description: "Orientierung zu SF32-Architektur und Subsystemen: Grafik, Bluetooth, KI, Audio, Low Power und die zugrunde liegende Prozessorarchitektur."
tags:
    - Lernen
---

# Lernübersicht { #learn-overview }

Nutzen Sie den Bereich **Lernen**, um Architektur- und Subsystementscheidungen zu treffen, solange sie sich in Firmware oder Hardware noch gut anpassen lassen. Die Beiträge erklären, wie die SF32-Geräte zusammenwirken und wann eine universell einsetzbare CPU Aufgaben an eine Grafik-Engine, einen Funk-Controller, einen KI-Beschleuniger oder andere spezialisierte Hardware auslagern kann. Außerdem zeigen sie, was zu prüfen ist, wenn Grafik, Funk, Audio, KI, Speicher und Energiebedarf in einem Produkt nebeneinander bestehen müssen.

Nutzen Sie [Erste Schritte](../getting-started/index.md) für den ersten erfolgreichen Start auf einem Board, [Tutorials](../getting-started/tutorials/overview.md) für angeleitete Übungen, [Entwicklung](../develop/index.md) für Softwareabläufe und Beispiele sowie die [SF32-Familie](../sf32-products/family/SF32_family.md) für die Bauteilauswahl und das produktionsgerechte Design.

## Beginnen Sie mit Ihrer Designfrage { #start-with-your-design-question }

<div align="center"><em>Tabelle: Den richtigen Lernpfad finden</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Wenn Sie Folgendes benötigen … | Beginnen Sie hier | Lesen Sie anschließend |
|:----------------|:-----------|:-------------|
| den Prozessor- und Speicheraufbau sowie die Auslagerung von Aufgaben an spezialisierte Hardware verstehen | [Architektur im Überblick](architecture/overview.md) | [STAR-MC1](architecture/star-mc1.md), [PSRAM und andere Speichertypen für eingebettete Systeme](architecture/psram-and-memory-types.md) und [PTM](architecture/ptm-parallel-task-machine.md), sofern diese für das gewählte Gerät relevant sind. |
| eine Display-Oberfläche erstellen oder die Strategie für Grafikressourcen und Framebuffer festlegen | [Grafikübersicht](graphics/overview.md) | [Display-Controller](graphics/display-controller.md), [ePicasso](graphics/epicasso-gpu.md), [eZip](graphics/ezip.md) und [TurboPixel](graphics/turbopixel.md) für die jeweiligen Entscheidungen zu Anzeige, Rendering und Kompression. |
| ein Smartphone, Zubehör oder ein Audiogerät verbinden | [Bluetooth-Übersicht](bluetooth/overview.md) | [Bluetooth-Prozessor](bluetooth/processor.md) zu den Grenzen zwischen Controller und Anwendung; anschließend [Bluetooth PAN](bluetooth/pan.md), falls das Produkt einen IP-Transport über das Smartphone benötigt. |
| Inferenz auf dem Gerät ergänzen | [KI-Übersicht](ai/overview.md) | [KI-Beschleuniger](ai/accelerator.md) sowie anschließend die für Modell und Pipeline erforderlichen Prüfungen von Speicher, Latenz und Energieverbrauch. |
| Audio aufnehmen, wiedergeben oder verarbeiten | [Audioübersicht](audio/overview.md) | [Audio-Server und Pufferung](audio/audio-server-buffering.md); streamt das Produkt Audio oder nutzt es Bluetooth für drahtlose Telefonate, beachten Sie auch die Bluetooth-Hinweise. |
| ein Ziel für die Akkulaufzeit erreichen | [Energiesparendes Design im Überblick](low-power/overview.md) | [Energieverbrauch messen und validieren](low-power/measurement-and-validation.md) sowie anschließend die Seiten zu Bluetooth, Grafik, Audio und KI für den Energiebedarf der einzelnen Subsysteme. |

</div>

## Die Seiten gemeinsam nutzen { #use-the-pages-together }

Die meisten realen Produkte kombinieren mehrere Subsysteme. Bei einem Wearable mit Display, BLE, Mikrofon und begrenztem Energiebudget dürfen diese nicht isoliert betrachtet werden: Die Bildwiederholrate beeinflusst Speicherverkehr und Aktivzeit, die Bluetooth-Zeitplanung die Aufwachhäufigkeit sowie Audio und KI den Pufferbedarf und die Latenz. Jede dieser Entscheidungen verändert das Energiebudget des Produkts.

Nutzen Sie die Seiten als zusammenhängenden Designablauf:

1. Gehen Sie von der wichtigsten Produktanforderung und dem ausgewählten Gerät aus. Prüfen Sie, ob die benötigten Funktionen für Anzeige, Bluetooth, KI, Audio, Speicher und Energiesparen für dieses Gerät tatsächlich dokumentiert sind.
2. Legen Sie die Aufgabenverteilung zwischen den Prozessoren und die Speicherzuordnung fest, bevor Sie die Anwendung integrieren. Planen Sie, wo Working Set (Arbeitssatz), Framebuffer, Modell und Audiopuffer liegen; legen Sie Code und Daten für latenzkritische Aufgaben in einem geeigneten Speicher mit niedriger Latenz ab; und setzen Sie spezialisierte Hardware nur ein, wenn ihre Fähigkeiten und Integrationsanforderungen zum Produkt passen.
3. Gehen Sie von der Übersicht des maßgeblichen Subsystems zur Detailseite für die Implementierung. Behandeln Sie Querverweise zu Bluetooth, Speicher und Energiesparen als Designabhängigkeiten und nicht als optionale Hintergrundinformationen.
4. Prüfen Sie das Zusammenspiel auf der vorgesehenen Hardware. Nutzen Sie die Abläufe unter [Entwicklung](../develop/index.md) und die Messverfahren der einschlägigen Lernseiten, um Funktionsverhalten, Latenz, Bandbreite, RF-Verhalten und Energieverbrauch gemeinsam zu validieren.

!!! note "Automatisch erstellter Inhalt"
    Diese Seite wurde ohne ein vorhandenes, speziell ihrem Inhalt gewidmetes Quelldokument zusammengestellt und entworfen. Prüfen Sie technische Aussagen anhand der offiziellen SiFli-Dokumentation, bevor Sie sich darauf verlassen.
