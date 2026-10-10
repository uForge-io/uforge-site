---
icon: lucide/network
title: "Architekturübersicht"
description: "Architekturentscheidungen zu SF32-Prozessoren, Speicher, Bluetooth und Hardware-Offload – mit Prüfung der Funktionen des konkreten Bauteils."
tags:
    - Architektur
    - Lernen
---

# Architektur im Überblick { #architecture-overview }

Die Konfiguration von Prozessoren, Speicher und spezialisierter Hardware unterscheidet sich je nach SF32-Bauteil. Sind die benötigten Blöcke im ausgewählten Bauteil vorhanden, lassen sich zeitkritische oder dauerhaft aktive Aufgaben an dedizierte Subsystemhardware auslagern. Verfügt das Bauteil über einen passenden Beschleuniger, können Aufgaben wie die Grafikverarbeitung ebenfalls in Hardware laufen. Dieser Abschnitt ordnet die Architekturthemen fünf technischen Fragen zu: Wo läuft der Anwendungscode? Wo liegen Code und Puffer? Welche Aufgaben übernimmt der Funkcontroller? Wann ist eine dedizierte Task-Engine sinnvoll? Stellt das gewählte Bauteil die benötigten Architekturblöcke und Schnittstellen bereit?

## Beginnen Sie mit der Arbeitslast { #start-with-the-workload }

<div align="center"><em>Tabelle: Passende Architekturinformationen zur jeweiligen Entscheidung</em></div>

<div align="center" markdown>

| Zu klärende Frage… | Weiterführender Artikel | Was der Artikel erläutert |
|:----------------------|:-----------|:-----------------|
| Wie Anwendungsfirmware ausgeführt wird und mit dem Speichersystem interagiert | [STAR-MC1](star-mc1.md) | Das Cortex-M33-kompatible Anwendungsprozessormodell, Cache-Verhalten und Arbeitslastmerkmale auf relevanten SF32-Geräten. |
| Wo Code, Ressourcen sowie große oder latenzkritische Puffer abgelegt werden sollten | [PSRAM im Vergleich zu anderen Speichertypen für eingebettete Systeme](psram-and-memory-types.md) | Vergleicht PSRAM, SRAM, DRAM, RRAM und MRAM nach Kapazität, Latenz, Datenpersistenz, Bandbreite und Energieverbrauch. |
| Welche Bluetooth-Aufgaben im Controller verbleiben und welche die Produkt-Firmware übernimmt | [Bluetooth-Prozessor](../bluetooth/processor.md) | Erläutert die Abgrenzung zwischen Controller-Zeitsteuerung, Host und Anwendung, HF-Aspekten und energiesparendem Betrieb. |
| Ob eine spezielle Abfolge von Peripherieoperationen eine programmierbare Task-Engine erfordert | [PTM (Parallel Task Machine)](ptm-parallel-task-machine.md) | Der Hardware-Design-Leitfaden für den SF32LB57x beschreibt einen PTM-Block mit 16 Kanälen für kompakte, zeitkritische Peripherieaufgaben, die sich mit Peripherieblöcken mit festgelegtem Funktionsumfang nicht sinnvoll umsetzen lassen. |
| Ob das gewählte Bauteil die benötigte Architektur und Schnittstellen tatsächlich bereitstellt | [SF32-Familie](../../sf32-products/family/SF32_family.md) | Die Auswahl hängt vom vollständigen Bauteil ab, darunter Speicher, Schnittstellen, Funkfunktionen und verfügbare Beschleuniger. |

</div>

## Praktische Entscheidungshilfe { #practical-decision-rule }

Gehen Sie bei Architekturentscheidungen in dieser Reihenfolge vor:

1. Produktlogik, Bedienoberfläche, Anwendungsrichtlinien und übliche Treiber gehören in die Anwendungsfirmware. Bewerten Sie Prozessor- und Cache-Verhalten anhand des ausgewählten Bauteils und der konkreten Arbeitslast; verlassen Sie sich nicht allein auf allgemeine Benchmark-Erwartungen. Der Artikel zu STAR-MC1 hilft bei dieser Einordnung.
2. Legen Sie früh fest, wo Code und Daten im Speicher liegen sollen. Platzieren Sie latenzkritischen Code und Daten in geeigneten Ebenen der Speicherhierarchie. Dimensionieren Sie außerdem externe Speicherkapazität, Schnittstellenbandbreite und Energiebedarf, bevor Sie eine UI-, Audio-, KI- oder Konnektivitäts-Arbeitslast festlegen.
3. Trennen Sie die Zeitsteuerung des Bluetooth-Controllers von den Entscheidungen auf Produktebene. Der Artikel zum Bluetooth-Prozessor hilft, die Grenzen zwischen Controller, Host, Anwendung, HF und energiesparendem Betrieb zu bestimmen, die gemeinsam ausgelegt werden müssen.
4. Prüfen Sie bei individuellen Peripherieaufgaben zuerst, ob vorhandene Timer, DMA, UART, SPI, I2C, Audio-, Display- oder Bluetooth-Funktionen ausreichen. Ziehen Sie PTM beim SF32LB57x nur in Betracht, wenn die Aufgabe tatsächlich zeitkritisch ist oder sich mit diesen Standardfunktionen nicht sinnvoll umsetzen lässt.

Prüfen Sie bei jeder Entscheidung die dokumentierten Funktionen des ausgewählten Bauteils, bevor Sie davon ausgehen, dass ein Architekturblock vorhanden oder vom Anwender programmierbar ist. Der Hardware-Design-Leitfaden für den SF32LB57x beschreibt einen PTM-Block mit 16 Kanälen. Bevor Sie ein Design auf PTM stützen, prüfen Sie die Unterstützung in der Dokumentation des Zielbauteils.
