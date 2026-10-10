---
icon: lucide/microchip
description: "SF32-NNACC-Operatoren, CPU- und Laufzeitrollen, Speichergrenzen sowie Latenz- und Energiebewertung für eingebettete KI."
tags:
  - KI
---
# KI-Beschleuniger { #ai-accelerator }

## Einführung { #introduction }

Der **KI-Beschleuniger**, im SDK NNACC genannt, übernimmt unterstützte Operationen neuronaler Netze auf ausgewählten SF32-Geräten. Er ermöglicht **Edge-KI** mit lokaler Inferenz, die nicht von einem Cloud-Dienst abhängt. Ob Latenz, CPU-Belegung oder Energiebedarf sinken, hängt vom Modell, der Speicherzuordnung, der Softwareimplementierung und der gesamten Produktlast ab.

Wearables, Gesundheitsmonitore, intelligente Displays, Sprachzubehör, Sensorfusionssysteme und kompakte AIoT-Produkte sind mögliche Anwendungen. Solche batteriebetriebenen Geräte verbinden häufig Bluetooth, Grafik, Audio, Sensorerfassung und Benutzerinteraktion. Das Delegieren unterstützter Operationen an die Hardware kann CPU-Zeit für andere Aufgaben freigeben; Reaktionsfähigkeit und Energieeinsparung müssen jedoch gemessen werden.

Der genaue Funktionsumfang der KI hängt vom jeweiligen SF32-Gerät und der Unterstützung durch das SDK ab. Prüfen Sie stets das Datenblatt, das Referenzhandbuch und die SDK-Dokumentation für den Zielchip, bevor Sie sich auf eine Modellarchitektur oder Speicheraufteilung festlegen.

Die folgenden Angaben zu CMSIS-NN-Operationen und zur NNACC-Anzahl je Gerät beruhen auf der Dokumentation zu SiFli-SDK v2.5.1. Der NNACC-Leitfaden dieser Version nennt Ressourcen für SF32LB55x/56x/58x, belegt aber keine Verfügbarkeit für SF32LB52x oder SF32LB57x; die fehlende Angabe beweist nicht, dass diese Familien keinen NNACC haben. Die Prüfungen von Adressfenstern, das Warteverhalten und die GC032A-Konfiguration sind Beobachtungen aus den HAL- oder Treiberquellen dieser Version, keine allgemeingültigen Garantien für alle Chiprevisionen oder SDK-Versionen. Der zitierte NNACC-Leitfaden und die Beispiele belegen weder einen durchgängigen Modellkonverter oder eine Graph-Laufzeitumgebung noch einen automatischen CPU-Fallback oder Kameraerfassung für jedes Bauteil und jede Platine. Prüfen Sie vor der Festlegung des Designs die genaue SDK-Version und -Konfiguration, Chiprevision, Laufzeitumgebung und Platine.

Diese Seite hilft Ihnen zu beurteilen, ob eine lokale KI-Funktion zum gewählten SF32-Gerät passt und wie sich die Inferenz auf Sensoren, CPU, Speicher und Beschleuniger verteilen lässt. Für die Integration und Bereitstellung von Modellen lesen Sie die ergänzende [KI-Übersicht](overview.md).

## Warum KI auf dem Gerät wichtig ist { #why-on-device-ai-matters }

Viele eingebettete Produkte müssen intelligent reagieren, ohne fortlaufend Rohdaten an ein Smartphone oder einen Cloud-Dienst zu übertragen. KI auf dem Gerät kann ein Produkt auf mehrere Arten verbessern:

- Potenziell geringere Latenz: Lokale Inferenz kann den Umweg über ein Smartphone oder einen Cloud-Dienst vermeiden. Messen Sie dennoch die Latenz vom Sensoreingang bis zur Entscheidung am vollständigen Produkt.
- Bessere Privatsphäre, da rohe biometrische, Audio- oder Bewegungsdaten lokal bleiben können.
- Geringerer Funkverkehr, da nur Ereignisse oder Zusammenfassungen übertragen werden müssen.
- Besseres Offline-Verhalten, da Kernfunktionen ohne Netzwerkzugang funktionieren können.
- Eine geringere durchschnittliche Leistungsaufnahme ist nur dann möglich, wenn die vollständige Funktion bei gleicher Genauigkeit und Erkennungsabdeckung über denselben Nutzungszeitraum weniger Energie benötigt. Berücksichtigen Sie dabei auch den Aufwand für die Auslagerung.

Für tragbare Geräte und AIoT-Produkte sind diese Vorteile konkret: Eine Uhr kann Gesten klassifizieren, Aktivitätszustände erkennen, Gesundheitssignale überwachen, einfache Sprachtrigger erkennen oder Sensordaten verarbeiten, während Display, Bluetooth und Anwendungsprozessor reaktionsfähig bleiben.

Diese Vorteile gelten nicht ohne Bedingungen. Lokale Verarbeitung reduziert Funkverkehr nur, wenn das Produkt auf die Übertragung der Rohdaten verzichtet. Datenschutz erfordert weiterhin geeignete Speicherung, Zugriffskontrollen und Schutz übertragener Daten. Die folgenden Anwendungen sind Entwurfsmöglichkeiten, keine Zusage, dass das SDK alle Modelle mitliefert.

## Position im SF32-System { #position-in-the-sf32-system }

Eine vereinfachte Edge-KI-Verarbeitung auf SF32 sieht so aus:

<div align="center"><em>Diagramm: Verarbeitungsschritte und firmwaregesteuerte Inferenz</em></div>

```text
Sensoren / Audio / Kamera
        │
        ▼
Vorverarbeitung
  - Filterung
  - Aufteilung in Frames
  - Normalisierung
  - Merkmalsextraktion
        │
        ▼
Firmware / Inferenzlaufzeit
  - Steuerung des Modellgraphen
  - von NNACC unterstützte Operationen
  - sonstige Operationen auf der CPU, sofern implementiert
        │
        ▼
Nachverarbeitung
  - Schwellwertbildung
  - Glättung
  - Ereigniserkennung
  - Anwendungsentscheidungen
        │
        ▼
Anwendung, UI, Bluetooth oder Speicher
```

Der Beschleuniger ist nur ein Teil der vollständigen KI-Verarbeitungskette. Produkte benötigen weiterhin Datenerfassung und -pufferung, Vorverarbeitung, die Planung der Inferenz, Nachverarbeitung und Entscheidungslogik auf Anwendungsebene. Die beste Leistung ergibt sich meist, wenn die gesamte Verarbeitungskette auf die Speicherhierarchie und die verfügbaren Beschleuniger abgestimmt wird, statt Inferenz als isolierten Funktionsaufruf zu behandeln.

## Aufgaben des KI-Beschleunigers { #what-the-ai-accelerator-does }

KI-Beschleuniger sind nützlich, weil viele Anwendungen neuronaler Netze dieselben mathematischen Muster tausend- oder millionenfach wiederholen. Dazu können Faltungen, Matrixmultiplikationen, Vektoroperationen, Aktivierungsfunktionen, Pooling oder andere Festkomma-Rechenoperationen gehören. Dedizierte Hardware kann ausgewählte Rechenoperationen energieeffizienter ausführen als eine Allzweck-CPU.

Dies sind Beispiele für Berechnungen neuronaler Netze, keine Liste der von SF32 NNACC unterstützten Operationen. Der [NNACC-Leitfaden des SiFli SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) dokumentiert die NNACC-Beschleunigung für drei CMSIS-NN-q7-Faltungsfunktionen, darunter kanalweise Faltung (Depthwise Convolution), und gibt an, dass die NNACC-beschleunigte CMSIS-NN-Implementierung achtmal schneller ist als die ARM-DSP-Implementierung in CMSIS-NN. Der Leitfaden nennt für diesen Wert keine Testbedingungen; behandeln Sie ihn als Herstellerangabe und nicht als Garantie für eine geringere Latenz oder Energieaufnahme des Gesamtmodells. Prüfen Sie jeden Modelloperator und sein Zahlenformat auf Kompatibilität mit der gewählten Implementierung. Matrixmultiplikation, Aktivierung und Pooling sind nicht automatisch jeweils eigenständig beschleunigt. Das SDK bietet außerdem HAL-APIs zur direkten Steuerung des Beschleunigers; gehen Sie jedoch nicht davon aus, dass eine dieser Schnittstellen einen vollständigen Modellkonverter oder eine Laufzeitumgebung für den Rechengraphen bereitstellt. Firmware oder eine separate Inferenz-Laufzeitumgebung muss die Schichten orchestrieren und Puffer verwalten. Für einen CPU-Fallback ist zudem eine Implementierung der nicht unterstützten Operationen erforderlich.

SF32-Geräte haben begrenzte Speicher- und Bandbreitenressourcen. Beginnen Sie daher mit einem kompakten eingebetteten Modell. Prüfen Sie die NNACC-Verfügbarkeit und die Operatorunterstützung für die genaue Teilenummer und messen Sie anschließend Speicherbedarf, Latenz und Energieverbrauch der gesamten Verarbeitungskette. Leiten Sie die Unterstützung nicht allein aus dem Familiennamen ab.

Typische KI-Anwendungen sind:

- Erkennung von Schlüsselwörtern oder einfache Erkennung von Sprachereignissen.
- Gestenerkennung anhand von Beschleunigungssensor- und Gyroskopdaten.
- Aktivitätsklassifikation und Bewegungszustandserkennung.
- Sensorfusion für Wearables und Gesundheitsgeräte.
- Biometrische Signalanalyse, abhängig von Sensor- und Algorithmusunterstützung.
- Einfache Bild- oder kameragestützte Klassifikation bei Geräten mit Kameraeingang.
- Anomalieerkennung und lokale Ereignisfilterung.

## Rollen von CPU, Beschleuniger und Speicher { #cpu-accelerator-and-memory-roles }

Als Orientierung gilt: Die CPU steuert den Ablauf, während der Beschleuniger ausgewählte, besonders rechenintensive Operationen übernimmt.

<div align="center"><em>Tabelle: Rollen von CPU, Beschleuniger und Speicher</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Komponente | Typische Rolle |
|:----------|:-------------|
| **Anwendungs-CPU** | Führt die Anwendungslogik aus, plant die Inferenz, verwaltet Puffer und steuert Benutzeroberfläche, Bluetooth, Speicher und Systemrichtlinien. |
| **Low-Power-Prozessor** | Kann auf Geräten, auf denen er benutzerprogrammierbar ist, die kontinuierliche Sensorüberwachung oder Hintergrundaufgaben übernehmen. |
| **KI-Beschleuniger** | Führt unterstützte NNACC-Operationen aus. Vergleichen Sie CPU-Zeit und Energiebedarf der gesamten Verarbeitungskette mit der Software-Referenz. |
| **DMA-/Speichersystem** | Ermöglicht Speicherzugriffe und konfigurierte Datenübertragungen; nicht jeder NNACC-Ein- oder -Ausgang benötigt eine eigene DMA-Kopie. |
| **Weitere Beschleuniger** | Audio-, Grafik-, Kryptografie- oder Sensorverarbeitungsblöcke können die gesamte Verarbeitungskette unterstützen. |

</div>

Der Beschleuniger ersetzt die CPU nicht und führt nicht jedes beliebige Modell eigenständig aus. Die Firmware bereitet Eingaben vor, konfiguriert unterstützte Operationen, wartet auf deren Abschluss, verarbeitet Ergebnisse und steuert die Anwendung. Eine nicht unterstützte Operation kann nur dann auf der CPU laufen, wenn die gewählte Laufzeitumgebung oder Anwendung eine entsprechende Implementierung bereitstellt. Andernfalls kann die Bereitstellung des Modells scheitern. Vorhandene Hardware bedeutet nicht, dass automatisch auf die CPU zurückgegriffen wird.

## Einordnung nach Gerätefamilie { #device-family-positioning }

Wählen Sie das Gerät anhand der Operatoren, des Speicherbudgets und der gesamten Produktlast, nicht anhand einer pauschalen Leistungsrangfolge der Familien. Der SDK-v2.5.1-Leitfaden dokumentiert jeweils einen NNACC im HCPU-Subsystem von SF32LB55x und SF32LB56x sowie jeweils einen im HCPU- und LCPU-Subsystem von SF32LB58x. Diese Ressourcen helfen bei der Auswahl, garantieren aber weder eine schnellere Ausführung des gesamten Modells noch weniger Energieverbrauch. Prüfen Sie Verfügbarkeit, zugänglichen Speicher und Softwareunterstützung für die konkrete Teilenummer und Konfiguration.

<div align="center"><em>Tabelle: Einordnung nach Gerätefamilie</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Gerätefamilie | KI-Positionierung |
|:--------------|:---------------|
| **SF32LB52x** | Ein Kandidat für kostenoptimierte Bluetooth-, Audio- und einfache HMI-Produkte; eine schlanke CPU-Implementierung als Referenz verwenden, sofern keine konkrete Beschleunigung verifiziert ist. |
| **SF32LB55x** | Geeignet für tragbare BLE-Geräte und sensorreiche Produkte; passend für stromsparende Sensorik und kompakte Algorithmen. |
| **SF32LB56x** | Ein Kandidat für umfangreichere UI, vernetzte HMI sowie Sensor- oder Multimedia-Verarbeitung; gewählte Konfiguration und Operatorunterstützung des HCPU-NNACC prüfen. |
| **SF32LB57x** | Der zitierte Leitfaden belegt die NNACC-Verfügbarkeit für diese Familie nicht; prüfen Sie vor der Auswahl für KI die genaue Teilenummer sowie Operator-, Laufzeit- und Speicherunterstützung von SDK und Platine. |
| **SF32LB58x** | Ein Kandidat für kombinierte KI-, Grafik- und Audiolasten, wenn Speicher und HCPU/LCPU-Ressourcen der gewählten Teilenummer die Produktanforderungen erfüllen; Operatoren, Integrationsaufwand und gemessenen Energiebedarf prüfen. |

</div>

Diese Tabelle dient der Produktauswahl und ersetzt nicht das Datenblatt. Prüfen Sie für die gewählte Teilenummer die genaue Verfügbarkeit des Beschleunigers, die unterstützten Operatoren, die Speichergrenzen und die verfügbaren SDK-Werkzeuge.

## Ablauf der Modellentwicklung { #model-development-flow }

Ein typischer Entwicklungsablauf für eingebettete KI umfasst mehrere Phasen:

1. Ein Modell anhand repräsentativer Daten auf einem Entwicklungsrechner trainieren oder auswählen.
2. Das Modell durch sorgfältige Auswahl, Ausdünnen weniger relevanter Parameter (Pruning), Quantisierung oder Architekturänderungen an die Grenzen des eingebetteten Systems anpassen.
3. Inferenz-Laufzeitumgebung und Modelldarstellung wählen oder implementieren, Operatorabdeckung und numerische Kompatibilität mit den gewählten SDK-Kerneln prüfen. Keinen Konverter für vollständige Modelle in der NNACC-HAL voraussetzen.
4. Die numerische Genauigkeit nach der Konvertierung und Quantisierung überprüfen.
5. Vorverarbeitung, Inferenz und Nachverarbeitung in die Firmware integrieren.
6. Latenz, Speicherbedarf, Energieverbrauch und Genauigkeit auf der Zielhardware messen und profilieren.
7. Realistische parallele Bluetooth-, Display-, Audio- und Sensorlasten einschließlich der Übergänge in die vorgesehenen Energiesparzustände und zurück testen.

Der häufigste Fehler besteht darin, nur das neuronale Netz zu optimieren und den Rest der Verarbeitungskette zu vernachlässigen. In vielen eingebetteten Produkten sind Vorverarbeitung, Speichertransfers, das zeitliche Verhalten der Sensoren und Nachverarbeitung ebenso wichtig wie der Beschleuniger selbst.

## Quantisierung und Modellgröße { #quantization-and-model-size }

KI auf Mikrocontrollern hängt in der Regel von kompakten Modellen und effizienten numerischen Formaten ab. Quantisierte Modelle, oft mit 8-Bit-Ganzzahldaten, können Speicherbedarf, erforderliche Speicherbandbreite und Rechenkosten im Vergleich zu Fließkommamodellen reduzieren.

Ein 8-Bit-Modell ist nicht automatisch mit NNACC kompatibel. Die [HAL-Konfiguration des SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/bf0_hal_nn_acc.h) verwendet `int8_t`-Puffer und die Felder `bias_shift` / `out_shift`. Daraus folgt keine Unterstützung für beliebige Nullpunkte, kanalweise Skalierungen oder alle heutigen int8-Operatoren. Prüfen Sie Tensorlayout, Vorzeichenbehandlung, Schiebeoperationen und Bias-Darstellung anhand der konkreten Kernelimplementierung. Vergleichen Sie anschließend deren Ausgaben mit einer Softwarereferenz, einschließlich repräsentativer Eingaben und Grenzwerte.

Quantisierung bringt Kompromisse mit sich:

- Sie kann die Effizienz erheblich verbessern.
- Sie kann Modellgröße und Tensorspeicher reduzieren.
- Sie kann die Genauigkeit verringern, wenn das Modell nicht sorgfältig trainiert oder kalibriert wurde.
- Manche Operatoren lassen sich möglicherweise nicht direkt auf dem Beschleuniger oder in der Laufzeitumgebung ausführen.

Messen Sie für den Produktionseinsatz sowohl die Genauigkeit als auch die Systemleistung nach der Konvertierung. Ein Modell, das in einer Trainingsumgebung auf dem Entwicklungsrechner gut abschneidet, kann sich nach der Quantisierung, bei Sensorrauschen und mit der eingebetteten Vorverarbeitung anders verhalten.

## Speicher- und Bandbreitenbedarf { #memory-and-bandwidth-considerations }

KI-Anwendungen können speicherintensiv sein, selbst wenn das Modell klein wirkt. Das System benötigt möglicherweise Speicher für:

- Modellgewichte.
- Eingabetensoren.
- Puffer für Zwischenaktivierungen.
- Ausgabetensoren.
- Audioframes, Sensorfenster oder Kamerabilder.
- Vor- und Nachverarbeitungspuffer.
- Daten der Benutzeroberfläche, von Bluetooth und der Anwendung, die gleichzeitig verarbeitet werden.

Platzieren Sie häufig genutzte Tensoren und Zwischenpuffer entsprechend der internen SRAM-, Flash-, PSRAM- und Cache-Konfiguration des Zielgeräts so, dass CPU und Beschleuniger effizient darauf zugreifen können. Budgetieren Sie externen Speicher, Arbeitspuffer und Kopien gemeinsam statt nur die Modellgröße zu optimieren.

Prüfen Sie zunächst, ob der gewählte NNACC jeden Puffer erreichen kann. Daten in externem Flash oder PSRAM können eine Kopie in Arbeitspuffer erfordern. Berücksichtigen Sie Kopierzeit, Arbeits-RAM und Energiebedarf. Die [HAL-Implementierung des SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_nn_acc.c) rundet die geprüften Puffergrößen auf 4-Byte-Vielfache auf und lehnt einen Puffer ab, wenn Beginn und geprüftes Ende in unterschiedlichen 1-MiB-Adressfenstern (1 048 576 Byte) liegen. Eingabe und Bias müssen ebenfalls dasselbe Fenster nutzen. Ein Ende genau an der Grenze zum nächsten Fenster besteht die Prüfung nicht. Planen Sie die Speicherzuordnung nach diesen tatsächlichen Prüfbedingungen und behandeln Sie Fehlerrückgaben vor der nächsten Operation.

Teilt die CPU Puffer mit DMA oder NNACC, darf während jeder Übertragung oder Operation nur der jeweils zuständige Teilnehmer darauf zugreifen. Schreiben Sie CPU-Eingaben vor dem Lesen durch die Hardware aus dem Cache zurück. Bereiten Sie die Cache-Zeilen des Zielpuffers vor dem Hardware-Schreibzugriff gemäß SDK vor, damit noch nicht zurückgeschriebene CPU-Cache-Zeilen später nicht das Ergebnis überschreiben. Nach bestätigtem Hardware-Abschluss invalidieren Sie veraltete CPU-Kopien vor dem Lesen der Ausgabe. Cache-Pflege muss vollständige Cache-Zeilen abdecken; vermeiden Sie gemeinsame Zeilen mit anderen noch verwendeten Daten. Das Zurückschreiben alter Ausgabedaten nach dem Hardware-Schreibzugriff kann das Ergebnis zerstören. Zurückschreiben und Invalidieren sind nicht austauschbar.

## Audio-, Sensor- und Kameraverarbeitung { #audio-sensor-and-camera-pipelines }

KI-Beschleunigung arbeitet selten allein. Sie ist meist Teil einer Sensor-, Audio- oder Kameraverarbeitungskette.

### Audio und Sprache { #audio-and-voice }

Die Erkennung von Sprache oder Audioereignissen kann Mikrofoneingang, DMA-Pufferung, Framebildung, Filterung, Merkmalsextraktion, Inferenz und Glättung der Ergebnisse umfassen. NNACC führt unterstützte neuronale Operationen aus; Firmware oder die gewählte Laufzeitumgebung verarbeitet den übrigen Graphen. CPU oder Audio-Subsystem verwaltet Abtastwerte und Merkmale. Modell und validierte Softwareimplementierung werden weiterhin benötigt.

Typische Beispiele sind:

- Erkennung von Schlüsselwörtern.
- Erkennung eines Aktivierungsworts, sofern die Software dies unterstützt.
- Klassifikation von Audioszenen oder -ereignissen.
- Sprachaktivitätserkennung.

### Bewegung und Sensorfusion { #motion-and-sensor-fusion }

Bei tragbaren Produkten stammen Sensordaten häufig von Beschleunigungssensoren, Gyroskopen, Herzfrequenzsensoren, SpO2-Sensoren, EKG-Frontends oder anderen Peripheriegeräten. KI kann Bewegungszustände, Gesten, Aktivitätsmuster oder gesundheitsbezogene Signalmerkmale klassifizieren.

Bündeln Sie Abtastwerte und verwenden Sie Interrupts, soweit Erkennungsabdeckung und Latenz dies erlauben. Geeignete Hintergrundaufgaben auf einen benutzerprogrammierbaren Low-Power-Prozessor zu verlagern kann die Anwendungs-CPU seltener aufwecken. Berücksichtigen Sie jedoch dessen Aktivität, Sensorabtastung und Weckkosten im Vergleich. Schalten Sie die für die Ereigniserkennung nötige Erfassung nicht ab.

### Kamera- und Bildeingang { #camera-and-image-input }

Der Kameraeingang hängt von Chip, Gehäuse, Board und Erfassungstreiber ab. Der [GC032A-Sensortreiber im SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/customer/peripherals/camera/gc032a/drv_gc032a.c) konfiguriert einen 8-Bit-DVP- oder Zwei-Bit-SPI-Sensorausgang. Das belegt nicht, dass beide Erfassungspfade auf jedem SF32-Gerät funktionieren. Prüfen Sie vor der Kameraauswahl Pins, Erfassung über Peripherie oder PTM, Sensortiming und Treiber. Bildverarbeitung benötigt häufig größere Framebuffer und mehr Bandbreite als Audio- oder Bewegungsverarbeitung; vergleichen Sie aber die tatsächlichen Auflösungen und Raten.

Erwägen Sie kleinere Frames, Bildbereiche, niedrigere Bildraten oder ein für eingebettete Systeme ausgelegtes Modell. Zuschneiden in der Firmware nach der Erfassung verkleinert den Modelleingang, nicht zwingend den Kameradatenverkehr oder den Erfassungspuffer. Dafür können sensorinternes Zuschneiden oder eine geringere Datenerfassung nötig sein.

## Planung und Energieverwaltung { #scheduling-and-power-management }

KI-Aufgaben sollten mit Blick auf den Rest des Systems geplant werden. Ein tragbares Produkt muss möglicherweise Bluetooth verbunden halten, das Display aktualisieren, Audio erfassen, Sensoren auslesen und Inferenz ausführen, ohne Energie- oder Latenzziele zu überschreiten.

Zu einer guten Zeitplanung gehören:

- Periodische oder ereignisgesteuerte Inferenz entsprechend der nötigen Erkennungsabdeckung, dem Risiko übersehener Ereignisse und den Latenzanforderungen wählen.
- Polling-Schleifen vermeiden, wenn Interrupts oder Ereignisse die Verarbeitung auslösen können.
- Sensorabtastwerte bündeln, sofern die Latenzanforderungen dies erlauben.
- Die Verzögerung vom Eingang bis zur Entscheidung begrenzen und zugleich das für zuverlässige Erkennung nötige Eingabefenster erhalten.
- KI-Anwendungen mit Display- und Bluetooth-Aktivität koordinieren.
- CPU und Beschleuniger erst nach bestätigtem Abschluss, Pufferübergabe und Freigabe der nötigen Energiemanagement-Sperren in zulässige Energiesparzustände versetzen; erforderliche Sensorerfassung und ausstehende Arbeiten weiterlaufen lassen.

Ermitteln Sie die Energie der vollständigen Funktion, indem Sie die gemessene Versorgungsleistung (Versorgungsspannung × Strom) über die Zeit integrieren; die Inferenzlatenz allein reicht dafür nicht. Berücksichtigen Sie Sensorerfassung, Vorverarbeitung, Kopien, Beschleunigerbetrieb, CPU-Fallback, Nachverarbeitung und Leerlaufzeiten. Schnellere Ausführung kann aktive Energie sparen, ohne einen früheren Schlafzustand zu ermöglichen; der Nutzen hängt von den übrigen Systemlasten ab. Vergleichen Sie gleichwertige Erkennungsabdeckung und Genauigkeit, bevor Sie die Inferenzhäufigkeit reduzieren.

Im SDK v2.5.1 wartet der blockierende HAL-Start per Polling auf den Abschluss, ohne eigenes explizites Zeitlimit. Der Interrupt-Modus benötigt einen funktionierenden IRQ-Handler und eine Abschlussmeldung. Prüfen Sie Startfehler, begrenzen Sie die Wartezeit der Anwendung und definieren Sie die Wiederherstellung vor Pufferwiederverwendung oder Freigabe von Energiemanagement-Sperren.

## Kompromisse zwischen Genauigkeit, Latenz und Energie { #accuracy-latency-and-power-tradeoffs }

Bei eingebetteter KI müssen Genauigkeit, Latenz und Energiebedarf gegeneinander abgewogen werden.

<div align="center"><em>Tabelle: Kompromisse zwischen Genauigkeit, Latenz und Energie</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Ziel | Typische Auswirkungen auf die Auslegung |
|:-----|:------------------------|
| Höhere Genauigkeit | Kann größere Modelle, zusätzliche Merkmale oder längere Eingabefenster erfordern; tatsächlichen Genauigkeitsgewinn und Speicherbedarf prüfen. |
| Geringere Latenz | Erfassungs-, Warte- und Rechenverzögerungen reduzieren. Kürzere Fenster können die Genauigkeit beeinträchtigen; höhere Inferenzraten können mehr Energie benötigen. |
| Geringerer Energieverbrauch | Kompakte Modelle und effiziente Speicherzuordnung nutzen. Inferenzhäufigkeit nur reduzieren, wenn die Erkennungsabdeckung dies erlaubt; Erfassung und Schlafstrategie prüfen. |

</div>

Die richtige Balance hängt vom Produkt ab. Eine Gestenerkennung kann eine geringe Verzögerung tolerieren, wenn dadurch Energie gespart wird. Die Erkennung eines Sprachaktivierungsworts erfordert möglicherweise eine schnelle Reaktion, darf aber keine Fehlaktivierungen auslösen. Ein Algorithmus zur Gesundheitsüberwachung priorisiert möglicherweise Robustheit und lange Batterielaufzeit gegenüber einer sofortigen Klassifikation.

## Praktische Design-Hinweise { #practical-design-guidance }

Beginnen Sie bei der Planung eines SF32-KI-Produkts mit dem Produktverhalten, nicht mit dem Modell:

- Welche Entscheidung muss das Gerät lokal treffen?
- Welche Sensoren liefern die Eingabedaten?
- Wie oft muss die Inferenz laufen?
- Welche Latenz ist akzeptabel?
- Wie hoch ist das maximale Speicherbudget für Modellgewichte und Tensoren?
- Kann das Modell quantisiert werden, ohne zu viel Genauigkeit zu verlieren?
- Welche Operationen werden vom gewählten Chip und SDK beschleunigt?
- Was passiert, wenn Bluetooth, Display, Audio und Inferenz gleichzeitig aktiv sind?
- Wie wird die Modellgenauigkeit mit echten Produktdaten validiert?
- Wie wird die Firmware das Modell im Feld aktualisieren oder ersetzen, falls erforderlich?

Ein erfolgreiches eingebettetes KI-Produkt kombiniert in der Regel ein kompaktes Modell, sorgfältige Datenerfassung, eine an die Hardware angepasste Speicherzuordnung, realistische Leistungsmessungen und eine Energiestrategie, die unnötige Weckvorgänge vermeidet.

## Typische Anwendungsfälle { #typical-use-cases }

SF32-KI-Beschleunigung kommt für kompakte lokale Inferenz in vernetzten, batteriebetriebenen Produkten infrage, wenn unterstützte Operatoren und das gemessene Systembudget passen:

- Gestenerkennung bei Uhren, Armbändern und Handgeräten.
- Aktivitätsklassifikation für Fitness- und Gesundheitsprodukte.
- Sprachereignis- oder Schlüsselworterkennung für Audiozubehör.
- Sensorfusionsalgorithmen für tragbare Geräte.
- Biometrische Signalanalyse, sofern von Sensoren und Software unterstützt.
- Lokale Anomalieerkennung für intelligente Geräte.
- Einfache Bildklassifikation oder kameraausgelöste Ereignisse bei Geräten mit Kameraeingang.
- Eine HMI, die ihr Verhalten an den Nutzungskontext anpasst.

## Wichtigste Erkenntnisse { #key-takeaways }

- NNACC kann unterstützte Operationen übernehmen und die CPU-Belegung senken; Latenz- und Energievorteile müssen für die vollständige Funktion geprüft werden.
- Er ist Teil einer vollständigen Verarbeitungskette, die auch Sensoren, Audio- oder Kameraeingang, Vorverarbeitung, Speichertransfers, Nachverarbeitung und Anwendungslogik umfasst.
- SDK v2.5.1 dokumentiert NNACC-Ressourcen für SF32LB55x, SF32LB56x und SF32LB58x, belegt die Verfügbarkeit für SF32LB52x oder SF32LB57x jedoch nicht. Prüfen Sie Teilenummer und Produktlast, statt aus dem Familiennamen auf Unterstützung oder deren Fehlen zu schließen.
- Die tatsächliche Leistung hängt von Modellgröße, Quantisierung, unterstützten Operatoren, Speicherzuordnung, Cache-Verhalten, DMA und Laufzeitunterstützung des SDK ab.
- Lokale Inferenz ist sinnvoll, wenn sie Reaktions-, Offline-, Datenschutz- oder Funkverkehrsziele des Produkts erfüllt. Die Beschleunigerhardware allein garantiert diese Vorteile nicht.
