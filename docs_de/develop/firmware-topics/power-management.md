---
icon: lucide/battery-charging
description: "Stromverbrauch des SF32 bei Taktkonfiguration, Schlafmodi, Displaybetrieb, Bluetooth-Verbindungsintervallen und Sensoraktivität messen und optimieren, damit aus einem Prototyp ein für den Akkubetrieb ausgelegtes Produkt wird."
tags:
    - Entwicklung
    - Energiemanagement
---

# Energiemanagement { #power-management }

Mit gutem Energiemanagement wird aus einem funktionsfähigen Prototyp ein Produkt für Wearables. Beim SF32 umfasst die Arbeit am Energieverbrauch Taktkonfiguration, Schlafmodi, Displaybetrieb, Bluetooth-Verbindungsintervalle, Interrupts der Sensoren und die Anwendungsarchitektur.

Optimieren Sie den Stromverbrauch nicht anhand einzelner Codeausschnitte. Messen Sie Produktszenarien: Start, Leerlauf, Leerlauf bei bestehender Verbindung, aktives Display, aktiver Audiobetrieb, Aufwecken durch einen Sensor, OTA und Herunterfahren.

## Praktischer Arbeitsablauf { #practical-workflow }

1. Messen Sie das unveränderte SDK-Beispiel.
2. Aktivieren Sie jeweils nur ein Subsystem.
3. Messen Sie Display, Bluetooth, Audio, Speicher und Sensoren zu Beginn der Messungen getrennt voneinander.
4. Verwenden Sie interruptgesteuertes Aufwecken statt Polling.
5. Dokumentieren Sie die Stromaufnahme für jeden Betriebsmodus und jedes Produktszenario.

## Nützliche Ausgangspunkte { #useful-starting-points }

- SDK-Beispiele zum Energiemanagement.
- Profiling der CPU-Auslastung.
- Zustandsprüfung über die RT-Thread-Shell.
- Strommessung auf der Platine.

## Hinweise zur Messung { #measurement-notes }

Dokumentieren Sie zu jeder Messung:

- Board und Revision.
- Stromversorgung und Messpunkt.
- Firmware-Branch und Build.
- Display-Zustand.
- Bluetooth-Zustand.
- Sensor-Zustand.
- Protokollierungsstufe.
- Durchschnitts- und Spitzenstrom sowie Messzeitraum.

## Häufige Probleme beim Energiemanagement { #common-power-problems }

<div align="center"><em>Tabelle: Häufige Probleme beim Energiemanagement</em></div>

<div align="center" markdown>

| Symptom | Wahrscheinliche Ursache |
|:--------|:-------------|
| Leerlaufstrom zu hoch | Pollingschleife, Protokollierung, Display-Versorgung oder Peripherietakt bleibt eingeschaltet. |
| Schlafmodus lässt sich nicht aktivieren | Ein aktiver Timer, ein noch geöffnetes Gerät, anstehende Aufgaben oder eine nicht behandelte Weckquelle. |
| Bluetooth verursacht Stromspitzen | Verbindungsintervall, Scan-Fenster, Audiopfad oder erneute Übertragungen. |
| Display dominiert den Stromverbrauch | LCD-Hintergrundbeleuchtung, angezeigter AMOLED-Inhalt, Display-Aktualisierungsstrategie oder Strategie für Teilaktualisierungen. |
| Messwerte schwanken stark | Änderungen am Testaufbau, Akkuzustand, USB-Strompfad oder Protokollierungsaufwand. |

</div>
