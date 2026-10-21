---
icon: lucide/brain-circuit
title: "KI-Übersicht"
description: "Überblick über On-Device-KI auf SF32: Geräteauswahl, Nutzung der NNACC-HAL, Speicherplanung und Inferenzplanung innerhalb des Energiebudgets."
tags:
  - KI
---

# KI-Übersicht { #ai-overview }

## Überblick { #overview }

Diese Seite beschreibt die Umsetzung von On-Device-KI auf SF32: Bauteilwahl, Vorbereitung des Modells für den tatsächlichen Ausführungspfad, Speicherplanung und Inferenz innerhalb des Energiebudgets. Sie setzt die Grundlagen aus [KI-Beschleuniger](accelerator.md) voraus. Lesen Sie diesen Artikel zuerst, wenn Sie Rolle und Grenzen des Beschleunigers kennenlernen möchten.

Das SDK stellt beschleunigte Operationen über die **NNACC**-HAL (Neural Network Accelerator) bereit. Es gibt getrennte Beispiele für die [HAL](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/hal/nnacc/README_EN.md) und den [RT-Thread-Treiber](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/rt_device/nnacc/README_EN.md). Diese prüfen eine einzelne kanalweise Faltungsoperation (Depthwise Convolution), nicht die vollständige Bereitstellung eines trainierten Modells. Verwenden Sie sie zunächst als Funktionstest einer Operation. Modelllaufzeit, Konvertierungswerkzeuge und die Zuordnung der einzelnen Schichten müssen Sie gesondert auswählen und prüfen.

Die nachfolgend zitierten Implementierungsdetails gelten für SDK v2.5.1. Weder diese Details noch die NNACC-Verfügbarkeit auf Familienebene garantieren die Unterstützung eines bestimmten Geräts, eines Konverters oder einer Laufzeitumgebung für vollständige Modelle, die Kompatibilität von Operatoren, einen automatischen CPU-Fallback oder Kameraeingang. Prüfen Sie diese Punkte anhand der genauen SDK-Revision und -Konfiguration, der Chiprevision, der Laufzeitumgebung und der Platine.

Nutzen Sie diese Seite, wenn Sie die Produktentscheidung und den Bereitstellungspfad für eine KI-Funktion verantworten: was das Gerät lokal entscheiden muss, wie viel Speicher und Energie es verbrauchen darf und wie sich die Funktion bei realen Sensordaten verhalten soll. Sie ergänzt den Artikel zum Beschleuniger, der die Hardwaregrenze erklärt.

## Definieren Sie, was das Produkt lokal entscheiden muss { #define-what-the-product-needs-to-decide-locally }

Beginnen Sie mit der Produktentscheidung, nicht mit dem Modell:

- Was muss das Gerät selbst klassifizieren oder erkennen, ohne Umweg über Smartphone oder Cloud?
- Welche Sensoren liefern die Daten für diese Entscheidung – Bewegungs-, Audio- oder biometrische Daten, Kameradaten oder eine Kombination?
- Wie häufig muss das Gerät die Entscheidung treffen, und wie schnell muss es reagieren?
- Was passiert, wenn das On-Device-Modell falsch liegt – ist ein Fehlalarm (False Positive) oder eine übersehene Erkennung (False Negative) kostspieliger?
- Muss das Modell jemals im Feld aktualisiert werden, und wie?

Diese Antworten bestimmen alles Weitere: Modellgröße, Speicherbudget, Geräteauswahl und wie lange das System zwischen Inferenzen im energiesparenden Zustand bleiben kann.

## Das passende SF32-Gerät wählen { #pick-the-right-sf32-device }

Nicht jedes SF32-Gerät eignet sich gleichermaßen für KI-Workloads:

<div align="center"><em>Tabelle: Das passende SF32-Gerät wählen</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Anforderung | Typische Gerätewahl |
|:------------|:-------------------------|
| Leichte, gelegentliche Klassifikation auf einem kostenoptimierten Produkt | SF32LB52x – Modelle klein und CPU-orientiert halten. |
| BLE-Wearable mit einfachen Sensorfusionsanforderungen | SF32LB55x |
| Umfangreichere Sensor- oder Multimedia-Pipeline neben der UI | SF32LB56x |
| Edge-AI als Hauptfunktion – größere Modelle, Kameraeingang (sofern vom gewählten Gerät unterstützt) oder enge Latenzanforderungen | SF32LB58x |

</div>

Die Tabelle ist ein Ausgangspunkt für die Evaluierung, keine Garantie für ausreichenden Speicher oder effiziente Ausführung. Prüfen Sie beim konkreten Gerät Speicher, Sensorschnittstellen, Beschleunigerinstanz und SDK-Unterstützung anhand der gesamten Last. Der [NNACC-Leitfaden für SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) nennt je einen NNACC im HCPU von SF32LB55x und SF32LB56x sowie je einen im HCPU und LCPU von SF32LB58x. Für SF32LB52x oder SF32LB57x belegt der Leitfaden keine NNACC-Verfügbarkeit; diese fehlende Angabe ist kein Nachweis für das Fehlen eines NNACC. Die genannten Instanzzahlen belegen weder Modellkompatibilität noch Energieeffizienz. Zur übergeordneten Auswahl siehe [Einordnung nach Gerätefamilie](accelerator.md#device-family-positioning).

## Der Workflow der Modellentwicklung { #the-model-development-workflow }

In der Praxis folgt die Bereitstellung eines Modells auf SF32-Hardware unabhängig vom konkreten Anwendungsfall demselben Muster:

1. **Trainieren oder wählen Sie ein Modell** auf einem Entwicklungsrechner und verwenden Sie Daten, die den später im Feld erfassten Sensorsignalen möglichst nahekommen. Saubere Labordaten unterscheiden sich oft deutlich von verrauschten Sensordaten aus der Praxis.
2. **Verkleinern Sie das Modell für die Beschränkungen eingebetteter Systeme** – durch Architekturwahl, Pruning oder Quantisierung –, bevor Sie die beschleunigerspezifische Konvertierung angehen.
3. **Exportieren Sie das Modell und ordnen Sie seine Operatoren zu**: zur gewählten Inferenzlaufzeit sowie zu den vom Ziel-SDK tatsächlich unterstützten Operatoren, Layouts und Zahlenformaten. Eine NNACC-HAL allein stellt weder einen Konverter für vollständige Modelle noch eine Graph-Laufzeit bereit.
4. **Vergleichen Sie die numerischen Ergebnisse und die Modellgenauigkeit** nach Konvertierung und Quantisierung. Gehen Sie nicht davon aus, dass sich die Desktop-Genauigkeit unverändert überträgt.
5. **Integrieren Sie Vorverarbeitung, Inferenz und Nachverarbeitung** in die Firmware – das Modell ist ein Funktionsaufruf innerhalb einer größeren Pipeline.
6. **Messen und bewerten Sie Latenz, Speicherbedarf, Energieverbrauch und Genauigkeit** auf echter Hardware, nicht nur in der Simulation.
7. **Testen Sie unter realistischer kombinierter Last** – Bluetooth, Display und Sensoren müssen gleichzeitig mit der Inferenz aktiv sein, nicht isoliert.

Ein häufiger Integrationsfehler ist, das Modell zu optimieren, ohne Vorverarbeitung, Pufferung und Nachverarbeitung zu messen. Diese Stufen können ebenso aufwendig sein wie die beschleunigte Inferenz. Messen Sie deshalb den gesamten Pfad.

## Laufzeitvorgaben festlegen { #define-the-runtime-contract }

Halten Sie vor der Modellkonvertierung genau fest, welche Laufzeitvorgaben die Firmware erfüllen muss:

<div align="center"><em>Tabelle: Laufzeitvorgaben</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Laufzeitvorgabe | Festzulegende Entscheidung |
|:--------------|:----------------------|
| Eingabeform | Abtastfenster, Bildgröße, Kanalanzahl, Tensor-Layout. |
| Numerisches Format | Integer-Breite, Skalierungs-/Zero-Point-Behandlung, Kalibrierungsdatensatz. |
| Operatorsatz | Layer, die auf NNACC laufen müssen, und zulässige CPU-Fallbacks. |
| Latenzziel | Latenz der gesamten Pipeline, nicht nur der Beschleunigerzeit. |
| Speicherobergrenze | Gewichte, Aktivierungen, Ein-/Ausgabetensoren, Vor-/Nachverarbeitungspuffer. |
| Update-Richtlinie | Ob das Modell per OTA geändert werden kann und wie es validiert wird. |

</div>

Diese Vorgaben sollten sowohl von den ML- als auch von den Firmware-Verantwortlichen geprüft werden. Wenn sich die Tensorformen, das Format oder der Operator-Mix des Modells ändern, ohne dass die Firmware aktualisiert wird, äußern sich Fehler häufig als schlechte Genauigkeit oder instabile Latenz statt als eindeutiger Build-Fehler.

## Operator- und Fallback-Überprüfung { #operator-and-fallback-review }

Prüfen Sie vor der Modellwahl jeden Operator, seine Parameter und den tatsächlichen Ausführungspfad. Eine CPU-Implementierung oder ein automatischer Fallback muss ausdrücklich von der gewählten Laufzeit bereitgestellt werden; eine nicht unterstützte Operation kann die Bereitstellung auch vollständig verhindern. Selbst kleine Modelle können langsam sein, wenn häufig ausgeführte Schichten die CPU nutzen oder wiederholte Layoutkonvertierungen erfordern.

<div align="center"><em>Tabelle: Operator- und Fallback-Überprüfung</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Klasse | Bedeutung | Maßnahme |
|:------|:--------|:-------|
| Beschleunigt | Direkt vom NNACC-Pfad für das Zielgerät unterstützt. | Für häufig ausgeführte Schichten bevorzugen. |
| CPU-Fallback | Die gewählte Laufzeit oder Firmware stellt eine geprüfte CPU-Implementierung bereit. | Kosten messen; nur akzeptieren, wenn die gesamte Pipeline ihre Ziele erreicht. |
| Konvertierung erforderlich | Erfordert Layout-, Typ- oder Formatkonvertierung. | Konvertierungskosten in Latenz- und Energiebudget einrechnen. |
| Nicht unterstützt | In der Ziel-Laufzeitumgebung nicht verfügbar. | Schicht ersetzen oder Modellarchitektur ändern. |

</div>

Das Erfolgskriterium ist nicht „das Modell läuft“. Das Erfolgskriterium lautet: „die gesamte Pipeline erreicht Genauigkeits-, Latenz-, Speicher- und Energieziele mit derselben Datenverteilung, die das Produkt im Feld sieht.“

## Quantisierung und Speicherbudgetierung { #quantization-and-memory-budgeting }

Kompakte, quantisierte Modelle sind für KI auf Mikrocontrollern verbreitet, häufig mit 8-Bit-Integern statt Fließkomma. Wählen Sie das Zahlenformat passend zum tatsächlichen Ausführungspfad. Planen Sie vor der Festlegung der Modellarchitektur Speicher für alle folgenden Bestandteile, nicht nur für die Gewichte:

<div align="center"><em>Tabelle: Quantisierung und Speicherbudgetierung</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Speicherverbraucher | Hinweise |
|:------------------|:------|
| Modellgewichte | Durch Quantisierung deutlich reduziert, aber weiterhin die Basisgröße. |
| Eingabetensoren | Bemessen nach Sensorfenster, Bildauflösung oder Audio-Frame-Länge. |
| Zwischen-Aktivierungen | Leicht zu unterschätzen; kann bei manchen Architekturen die Gewichtsgröße übersteigen. |
| Ausgabetensoren | Meist klein, aber im Budget nicht vergessen. |
| Vor-/Nachverarbeitungspuffer | Filterung, Framing, Merkmalsextraktion und Schwellenwertbildung benötigen alle Arbeitsspeicher. |
| Speicherbedarf gleichzeitig aktiver Funktionen | UI-, Bluetooth- und Audiopuffer greifen gleichzeitig auf denselben SRAM/PSRAM zu. |

</div>

Quantisierung kann Speicher- und Rechenaufwand reduzieren. Prüfen Sie die Genauigkeit nach der Konvertierung erneut mit repräsentativen Sensordaten. Der SDK-v2.5.1-Leitfaden dokumentiert Beschleunigung für `arm_convolve_1x1_HWC_q7_fast_nonsquare`, `arm_convolve_HWC_q7_basic_nonsquare` und `arm_depthwise_separable_conv_HWC_q7_nonsquare`. Die [HAL-Konfiguration](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/bf0_hal_nn_acc.h) verwendet 8-Bit-Puffer und Shift-Werte für Bias und Ausgabe. Daraus folgt nicht, dass Zero-Points und kanalweise Skalierungen beliebiger moderner int8-Modelle direkt kompatibel sind. Prüfen Sie die numerische Gleichwertigkeit und legen Sie für jede nicht unterstützte Schicht CPU-Implementierung, Konvertierung oder Ablehnung der Bereitstellung fest.

## Pufferplatzierung und die Speicherhierarchie { #buffer-placement-and-the-memory-hierarchy }

Speicherbandbreite kann die KI-Leistung begrenzen, obwohl Rechenkapazität verfügbar ist. Prüfen Sie bei SF32-Geräten mit SRAM, Flash, PSRAM und STAR-MC1-Instruktions-/Daten-Caches sowohl den Speicherzugriff als auch die Kosten der Pufferplatzierung:

- Platzieren Sie häufig genutzte Tensoren und Zwischenpuffer in Speicher, auf den CPU und gewählte Beschleunigerinstanz zugreifen können. Beachten Sie Ausrichtung und Layout.
- Legen Sie große Gewichte oder selten genutzte Daten nur dann extern ab, wenn der gewählte Ausführungspfad diese Platzierung unterstützt. Erforderliche Kopien in beschleunigerzugänglichen Speicher gehören zum Speicher-, Latenz- und Energiebudget.
- Während einer Übertragung darf nur die CPU oder der Beschleuniger/DMA einen gemeinsamen Puffer verwenden. Bereiten Sie vor dem Hardwarezugriff den vollständigen, an Cache-Zeilen ausgerichteten Bereich vor: Bereinigen Sie die Cache-Zeilen mit den von der CPU geschriebenen Eingabedaten und behandeln Sie modifizierte Ausgabe-Cache-Zeilen gemäß den SDK-Regeln für Geräteschreibzugriffe. Warten Sie auf den Abschluss, bevor Sie den Ausgabebereich invalidieren und der CPU wieder Zugriff gewähren. Ändern Sie während des Hardwarezugriffs weder den Puffer noch andere Daten in denselben Cache-Zeilen.

Die [HAL-Implementierung in v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_nn_acc.c) prüft die Puffergrenzen in Adressfenstern von 1 MiB (1 048 576 Byte); Eingabe und Bias müssen im selben Fenster liegen. Prüfen Sie die tatsächlich zugewiesenen Adressen, nicht nur den freien Gesamtspeicher. Der blockierende Start wartet per Polling auf den Abschluss. Der Interrupt-Pfad benötigt korrekte IRQ-Behandlung und Abschlussmeldung. Prüfen Sie Rückgabewerte und planen Sie Fehlerwiederherstellung sowie begrenzte Wartezeiten auf Anwendungsebene, statt ein Timeout der Modelllaufzeit vorauszusetzen.

Überlegungen zu Cache und Speichersystem bei einem solchen gemischten Zugriffsmuster finden Sie unter [STAR-MC1](../architecture/star-mc1.md#memory-system-optimization).

## Arbeitsblatt zur Speicherplanung { #memory-sizing-worksheet }

Nutzen Sie vor der Firmware-Integration ein Arbeitsblatt zur Speicherplanung. Tragen Sie Worst-Case-Werte ein, keine Durchschnittsschätzungen:

<div align="center"><em>Tabelle: Arbeitsblatt zur Speicherplanung</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Puffer | Größenfaktor | Bevorzugte Platzierung |
|:-------|:------------|:---------------------|
| Roh-Eingabefenster | Abtastrate x Kanäle x Fensterdauer x Bytes pro Sample, plus Layout-Padding | DMA-zugänglicher Speicher bei Erfassung durch Peripherie. |
| Vorverarbeitungs-Arbeitsbereich | Filter, FFT/MFCC, Normalisierung, Resize/Crop | Schneller SRAM, wenn bei jeder Inferenz wiederverwendet. |
| Modellgewichte | Größe des quantisierten Modells | Flash/PSRAM, sofern unterstützt; SRAM nur für stark genutzte Abschnitte. |
| Aktivierungen | Größte Zwischentensoren | Schneller, für den Beschleuniger zugänglicher Speicher. |
| Ausgabe/Nachverarbeitung | Klassen, Boxen, Scores, Glättungszustand | SRAM; meist klein, aber latenzempfindlich. |
| Koexistenzpuffer | Audio, Display, Bluetooth, Logging | Gleichzeitig einplanen, nicht erst, nachdem die KI „passt“. |

</div>

Lassen Sie Spielraum für Stack, Heap, RTOS-Objekte, Logging und OTA. Ein Modell, das nur passt, wenn jedes andere Subsystem deaktiviert ist, ist kein produktionsreifes Modell.

## Aufbau der vollständigen Pipeline { #building-the-full-pipeline }

Der Beschleuniger ist eine Stufe der Pipeline vom Sensor zur Entscheidung. Nachfolgend werden drei häufige Eingabepfade beschrieben.

### Audio und Sprache { #audio-and-voice }

Keyword Spotting, Wake-Word-artige Trigger und Audio-Ereignisklassifikation benötigen Mikrofonerfassung, Framing und Merkmalsextraktion, bevor die Inferenz beginnt. Die Erfassung und Pufferung dieses Pfads beschreibt die [Audioübersicht](../audio/overview.md) – der Beschleuniger hilft nur, wenn das Eingangsaudio von Anfang an effizient erfasst und gepuffert wird.

### Bewegung und Sensorfusion { #motion-and-sensor-fusion }

Gestenerkennung, Aktivitätsklassifikation und biometrische Analyse nutzen typischerweise Daten von Beschleunigungssensoren, Gyroskopen oder anderen Sensoren. Messen Sie Sensorbetrieb, Erfassung, Vorverarbeitung und Inferenz getrennt, bevor Sie den größten Energieverbraucher bestimmen. Bündelung und interruptgesteuerte Erfassung können Weckvorgänge reduzieren, sofern Latenz und vollständige Erfassung der benötigten Signale dies zulassen. Ihr Nutzen überwiegt nicht grundsätzlich die Modellkosten. Hinweise bietet [Energiesparendes Design im Überblick](../low-power/overview.md#ai-and-sensor-power-tuning).

### Kamera- und Bildeingang { #camera-and-image-input }

Kameraeingaben können erhebliche Kosten für Erfassung, Pufferung, Bandbreite und Inferenz verursachen. Die tatsächliche Last hängt von Auflösung, Bildrate, Sensorbetrieb und Modellarchitektur ab. Reduzieren Sie die Bildgröße oder verarbeiten Sie einen Bildausschnitt, sofern die Genauigkeit dies zulässt. Wählen Sie ein Modell für eingebettete Systeme, statt die unveränderte Bereitstellung eines Desktop-Vision-Modells vorauszusetzen.

## Energieeffiziente Inferenzplanung { #power-aware-inference-scheduling }

Planen Sie die Inferenz so, dass benötigte Signale erkannt und Reaktionszeiten eingehalten werden. Periodische Inferenz ist sinnvoll, wenn das Produkt regelmäßige Entscheidungen benötigt. Eine ereignisgesteuerte Auslösung ist nur dann hilfreich, wenn dadurch keine erforderlichen Signale verloren gehen.

- Lösen Sie die Inferenz bei geeigneten Anwendungen anhand neuer, relevanter Daten aus, etwa bei einem Sensorschwellwert oder nach Eingang eines vollständigen Audio-Frames. Behalten Sie erforderliche periodische Verarbeitung bei und prüfen Sie nach Änderungen am Trigger übersehene Ereignisse sowie die maximale Reaktionszeit.
- Bündeln Sie Samples, wo die Latenzanforderungen dies erlauben, statt viele kleine Inferenzen auszuführen.
- Verlagern Sie leichte Always-on-Sensorik, sofern Gerät und SDK dies unterstützen, auf den stromsparenden Prozessor, statt für jedes Sample die Anwendungs-CPU zu wecken.
- Bestimmen Sie die **Energie pro Inferenz**, indem Sie die gemessene Versorgungsleistung (Versorgungsspannung × Strom) über ein klar angegebenes Messfenster integrieren. Beziehen Sie Erfassung, Vor-/Nachverarbeitung und Wechsel zwischen Aktiv- und Schlafzustand in das Budget der Funktion ein. Schnellere Verarbeitung kann aktive Energie reduzieren oder früheren Schlaf ermöglichen; der Nutzen hängt jedoch von Strom, Speicherverkehr und dem übrigen System ab.

Die systemweiten Hinweise zum Energieverbrauch finden Sie unter [Energiesparendes Design im Überblick](../low-power/overview.md). Verwenden Sie sie als Ergänzung für KI-Funktionen, die kontinuierlich oder nahezu kontinuierlich laufen müssen.

## Zielkonflikt zwischen Genauigkeit, Latenz und Energieverbrauch { #the-accuracy-latency-power-tradeoff }

Die folgenden Punkte beschreiben typische Entwurfsfolgen, keine festen Zusammenhänge. Messen Sie für die Abwägung tatsächliche Modellgenauigkeit und Energie der gesamten Pipeline:

<div align="center"><em>Tabelle: Zielkonflikt zwischen Genauigkeit, Latenz und Energieverbrauch</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Priorität | Typische Auswirkungen auf die Auslegung |
|:---------|:--------------------------|
| Höhere Genauigkeit | Größeres Modell, mehr Eingabemerkmale, längeres Fenster, mehr Speicher. |
| Geringere Latenz | Kürzere Erfassungsfenster, schnellere Ausführung oder häufigere Entscheidungen; Folgen für Genauigkeit und Energie prüfen. |
| Geringerer Energieverbrauch | Seltenere Inferenz, kompaktes Modell, effiziente Speicherplatzierung und längere Ruhephasen zwischen den Durchläufen. |

</div>

Legen Sie vor der Optimierung fest, was das Produkt priorisieren muss. Ein Gestendetektor kann zugunsten der Akkulaufzeit etwas mehr Latenz zulassen. Ein Sprachtrigger benötigt meist eine schnelle Reaktion und muss zugleich energieaufwendige Fehlaktivierungen vermeiden.

## Modell-Update und Feldvalidierung { #model-update-and-field-validation }

Wenn die KI-Funktion sich nach der Markteinführung verbessern kann, planen Sie die Unterstützung für Modell-Updates frühzeitig:

- Versionieren Sie das Modell wenn möglich getrennt von der Firmware und dokumentieren Sie die erwarteten Eingabevorgaben im Modellpaket.
- Prüfen Sie vor der Aktivierung Authentizität, Integrität sowie Laufzeit- und Eingabekompatibilität des Pakets. Gestalten Sie die Aktivierung robust gegenüber unterbrochenen Updates und halten Sie einen Rollback-Pfad zu einer funktionsgeprüften Version vor, falls die Startprüfung fehlschlägt.
- Speichern Sie Kalibrierung, Schwellenwerte und Nachverarbeitungskonstanten zusammen mit der Modellversion, die sie benötigt.
- Protokollieren Sie genug Feldstatistiken, um Drift zu diagnostizieren, ohne unnötig private Rohsensordaten zu speichern.
- Führen Sie Energie- und Koexistenztests nach jedem Modell-Update erneut durch; eine Verbesserung der Modellgenauigkeit kann dennoch eine Produktregression sein, wenn sie das System häufiger aufweckt.

## Debugging von KI-Leistung und -Genauigkeit { #debugging-ai-performance-and-accuracy }

<div align="center"><em>Tabelle: Debugging von KI-Leistung und -Genauigkeit</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Symptom | Wahrscheinlicher zu prüfender Bereich |
|:--------|:----------------------|
| Modell läuft, aber Genauigkeit sinkt gegenüber Ergebnissen vom Entwicklungsrechner | Fehlanpassung bei Quantisierung/Kalibrierung, oder Trainingsdaten nicht repräsentativ für echtes Sensorrauschen. |
| Inferenz ist langsamer als erwartet | Tatsächliche Schichtausführung auf der CPU, Layoutkonvertierung, Speicherbandbreite oder Scheduling-Konflikte. |
| System erreicht nie die erwartete Schlaftiefe | Unnötige Weckvorgänge, aktive Treiber/Takte, Energiemanagement-Sperren oder eine nicht abgeschlossene Beschleunigertransaktion. |
| Funktion läuft eigenständig, scheitert aber im Gesamtprodukt | Nicht unter kombinierter Last getestet (Bluetooth, Display und Sensoren gleichzeitig aktiv). |
| Hoher Energieverbrauch trotz „schnellem“ Modell | Latenz statt Energie pro Inferenz gemessen; Codec-/Sensorpfad bleibt zwischen den Durchläufen aktiv. |
| Sporadisch fehlerhafte Ausgabe bei gemeinsam genutzten Puffern | Vorbereitung der Cache-Zeilen, modifizierte Zeilen, vorzeitige Wiederverwendung, fehlender Abschluss oder gleichzeitiger Zugriff von CPU und Hardware. |

</div>

## Häufige Fehler { #common-mistakes }

- Wahl einer Modellarchitektur, bevor geprüft wurde, welche Operatoren die Ziel-Laufzeitumgebung tatsächlich beschleunigt.
- Portierung eines Desktop-Modells statt eines von Anfang an für eingebettete Beschränkungen entworfenen Modells.
- Ignorieren der Speicherkosten von Zwischen-Aktivierungen und Budgetierung nur der Modellgewichte.
- Ausführen der Inferenz, ohne zu prüfen, ob Rate und Trigger zu den benötigten Eingangssignalen und Reaktionszeiten passen.
- Validierung der Genauigkeit nur mit sauberen Labordaten, nie mit realistischem Feld-/Sensorrauschen.
- Testen der KI-Funktion isoliert und Entdecken von Koexistenzproblemen erst nach vollständiger Produktintegration.
- Optimierung der Modelllatenz bei Vernachlässigung der umgebenden Vor- und Nachverarbeitungsstufen.

## Inbetriebnahme-Checkliste { #bring-up-checklist }

- [ ] Definieren Sie die lokale Entscheidung, die das Produkt treffen muss, sowie den akzeptablen Kompromiss aus Latenz/Genauigkeit/Energie.
- [ ] Wählen Sie das SF32-Gerät anhand von Modellgröße und Speicherbedarf, nicht nur des Kostenziels.
- [ ] Bauen und validieren Sie die vollständige Pipeline (Erfassung -> Vorverarbeitung -> Inferenz -> Nachverarbeitung) zunächst mit einem minimalen Testmodell, dann mit dem Produktionsmodell.
- [ ] Konvertieren und quantisieren Sie das reale Modell, validieren Sie dann die Genauigkeit anhand realistischer Sensordaten.
- [ ] Budgetieren Sie den Speicher für Gewichte, Ein-/Ausgabetensoren und Zwischen-Aktivierungen gemeinsam.
- [ ] Validieren Sie die Cache-Kohärenzbehandlung für jeden von CPU/Beschleuniger gemeinsam genutzten Puffer.
- [ ] Prüfen Sie, ob periodisches oder ereignisgesteuertes Scheduling die erforderliche Signalerkennung, maximale Latenz und das gemessene Energiebudget erfüllt.
- [ ] Profilieren Sie die Energie pro Inferenz unter kombinierter Systemlast (Bluetooth, Display, Sensoren aktiv).
- [ ] Validieren Sie Genauigkeit und Energie nach jeder Änderung an Quantisierung, Modell oder Scheduling erneut.

## Wichtigste Erkenntnisse { #key-takeaways }

- Beginnen Sie mit der Produktentscheidung und den Sensordaten, nicht mit der Modellarchitektur – das Modell ist eine Stufe in einer größeren Pipeline.
- Nutzen Sie die Familienpositionierung zur Vorauswahl und prüfen Sie dann konkretes Gerät, SDK, Operatorzuordnung, Speicherbelegung und gleichzeitige Last.
- Budgetieren Sie Speicher für die gesamte Pipeline (Gewichte, Tensoren, Aktivierungen, Vor-/Nachverarbeitungspuffer), nicht nur für die Größe der Modelldatei.
- Wählen Sie periodische oder ereignisgesteuerte Inferenz ohne Abstriche bei der erforderlichen Signalerkennung. Messen Sie die Energie der gesamten Funktion; behandeln Sie die Modellgeschwindigkeit nicht als Maß für den Energieverbrauch.
- Testen Sie die Genauigkeit mit realistischen Felddaten und die gesamte Funktion unter kombinierter Systemlast, nicht isoliert.
