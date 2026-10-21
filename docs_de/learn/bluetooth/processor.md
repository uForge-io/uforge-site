---
icon: lucide/radio-tower
description: "Wie der dedizierte SF32-Bluetooth-Prozessor der Anwendungs-CPU Funkzeitplanung und Verbindungssteuerung abnimmt und so stromsparende, dauerhaft vernetzte Produkte erlaubt."
tags:
  - Bluetooth
---
# Bluetooth-Prozessor { #bluetooth-processor }

## Einführung { #introduction }

Der **Bluetooth-Prozessor** ist das dedizierte Funksteuerungs-Subsystem in SF32LB-Geräten. Er übernimmt die zeitkritischen Teile des Bluetooth-Betriebs, darunter Funkzeitplanung, Verbindungssteuerung, das energieeffiziente Aufrechterhalten von Verbindungen sowie die Abstimmung mit dem Hauptanwendungsprozessor.

Diese Architektur ist für vernetzte, batteriebetriebene Produkte nützlich. SF32-Geräte nutzen ein heterogenes Mehrkern-Design, sodass die Haupt-CPU nicht für jedes Funkereignis aufwachen muss: Der Anwendungsprozessor übernimmt Produktlogik und benutzerseitige Funktionen, während ein Bluetooth- oder Always-on-Prozessor mit geringem Energiebedarf die Funkverbindung aufrechterhält.

Welche Anwendungsaufgaben die LCPU ausführen kann, hängt von der Gerätefamilie ab. Nutzen Sie den Vergleich unten und prüfen Sie die unterstützte Aufgabenverteilung im SDK für das konkrete Zielgerät.

Lesen Sie diese Seite, wenn Sie verstehen müssen, wo die Bluetooth-Zeitsteuerung und die Controller-Firmware ausgeführt werden, ob sich die LCPU der gewählten Familie programmieren lässt oder wie ein vernetztes Produkt die Anwendungs-CPU in den Ruhezustand versetzen kann. Für den Entwurf von Diensten und die Bluetooth-Integration auf Produktebene lesen Sie die [Bluetooth-Übersicht](overview.md).

## Warum ein dedizierter Bluetooth-Prozessor wichtig ist { #why-a-dedicated-bluetooth-processor-matters }

Bluetooth ist kein Softwareprotokoll, das nur gelegentlich im Hintergrund ausgeführt wird. Ein vernetztes Gerät muss strenge Funkzeitvorgaben für Advertising, Scanning, Verbindungsereignisse, den Paketaustausch, die Audioübertragung, die Verschlüsselung und das Zusammenspiel mit anderen Systemaktivitäten einhalten.

Ein dediziertes Bluetooth-Subsystem trennt diese zeitkritischen Funkaufgaben von der Hauptlast der Anwendung. Das bringt mehrere praktische Vorteile:

- Geringerer durchschnittlicher Energieverbrauch im verbundenen Bereitschaftsbetrieb.
- Zuverlässigere Funkzeitsteuerung bei hoher Last durch Benutzeroberfläche, Grafik, Audio oder KI.
- Controller-seitige Funkereignisse lassen sich bearbeiten, ohne die Anwendungs-CPU jedes Mal aufzuwecken.
- Sauberere Trennung zwischen Anwendungs-Firmware und Protokollsteuerungs-Firmware.
- Bessere Unterstützung für Produkte, die verbunden bleiben müssen, während die Haupt-CPU schläft.

Für tragbare Produkte ist diese Trennung besonders wertvoll. Das Gerät kann die meiste Zeit mit aktiver Verbindung in einem Energiesparzustand verbringen und nur bei Benutzereingaben, Sensorereignissen, Display-Aktualisierungen, Audioaktivität oder der Synchronisierung mit dem Telefon aufwachen.

Das sind architektonische Möglichkeiten, keine garantierten Verbrauchs- oder Aufwachwerte. Der Ausführungsort des Host-Stacks, Interrupts, Taktanlauf, Schlafstrategie und Anwendungsverkehr bestimmen das Messergebnis. Messen Sie Strom und Reaktionszeit mit der vorgesehenen Firmware und Last.

## Position im SF32-System { #position-in-the-sf32-system }

Eine vereinfachte drahtlose SF32-Architektur sieht so aus:

<div align="center"><em>Abbildung: Vereinfachte drahtlose SF32-Architektur</em></div>

```text
Application Processor
  - product firmware
  - UI and graphics
  - audio application logic
  - user services
        │
        ▼
Bluetooth Host / System Services
        │
        ▼
Bluetooth Processor / Controller Firmware
  - link-layer timing
  - radio scheduling
  - low-power connection events
  - controller-side protocol work
        │
        ▼
Bluetooth Radio and RF Front End
```

Die genaue Aufteilung zwischen Host-, Controller- und Anwendungs-Firmware hängt vom SDK, der Stack-Konfiguration und den Produktanforderungen ab. Konzeptionell sollten Sie den Hauptanwendungsprozessor jedoch nicht als einzige am Bluetooth-Betrieb beteiligte CPU betrachten. Das Bluetooth-Subsystem hat einen eigenen Ausführungskontext und ist darauf ausgelegt, das Funkverhalten deterministisch und energieeffizient zu halten.

## Unterschiede zwischen Gerätefamilien { #device-family-differences }

Je nach Geräteklasse unterscheidet sich bei der SF32LB-Familie die Auslegung der LCPU. Prüfen Sie stets das Datenblatt und die SDK-Dokumentation für das konkrete Gerät.

<div align="center"><em>Tabelle: Unterschiede zwischen Gerätefamilien</em></div>

<div align="center" markdown>

| Gerätefamilie | Bluetooth-Unterstützung | Aufgabe der LCPU | Typische Produkte |
|:--------------|:---------------------|:-------------------------|:--------------------|
| **SF32LB52x** | Dual-Mode-Bluetooth, BT Classic + BLE | Die LCPU führt den Bluetooth-Stack aus; sie ist nicht für Anwendungscode freigegeben | Kostenoptimierte Bluetooth-Module, Audiozubehör, tragbare Geräte im Einstiegssegment und kompakte HMI-Systeme. |
| **SF32LB55x** | BLE | SDK-unterstützte Anwendungsaufgaben können auf der LCPU laufen | Tragbare BLE-Geräte und stromsparende Produkte mit vielen Sensoren. |
| **SF32LB56x** | Dual-Mode-Bluetooth, BT Classic + BLE | SDK-unterstützte Anwendungsaufgaben können auf der LCPU laufen | Produkte mit anspruchsvoller Displayausstattung, vernetzte HMI-Systeme und tragbare Geräte. |
| **SF32LB57x** | Dual-Mode-Bluetooth, BT Classic + BLE | Die LCPU übernimmt Bluetooth und stromsparende Aufgaben; prüfen Sie die unterstützte Aufgabenverteilung im SDK | Produkte mit Grafik und lokaler Audioverarbeitung auf der HCPU/ACPU. |
| **SF32LB58x** | Dual-Mode-Bluetooth, BT Classic + BLE | SDK-unterstützte Anwendungsaufgaben können auf der LCPU laufen | Flaggschiffprodukte mit anspruchsvoller Grafik, Audio, KI und komplexen Konnektivitätsanforderungen. |

</div>

Der [SF32LB52x-HAL-Leitfaden](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/index.html) von SiFli besagt, dass die LCPU den Bluetooth-Protokollstack ausführt und Anwendungssoftware nicht zur Verfügung steht. Die HAL-Leitfäden für [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/index.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/index.html) und [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/hal/index.html) beschreiben, wie sich Funktionen mit geringem Energiebedarf, etwa BLE- und Sensorverarbeitung, auf der LCPU ausführen lassen. Für **SF32LB57x** beschreibt der [ACPU-Leitfaden des SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) eine HCPU/ACPU/LCPU-Architektur und ordnet BLE- und Sensorverarbeitungsaufgaben der LCPU zu, legt aber nicht den vollen Umfang beliebiger Benutzeraufgaben fest. Verallgemeinern Sie die Programmierbarkeit der LCPU nicht über Familien hinweg. Prüfen Sie beim konkreten Gerät die Kernkonfiguration im Datenblatt und anschließend, ob der verwendete SDK-Release und die Boardkonfiguration die vorgesehene Anwendungsaufgabe auf der LCPU unterstützen. Ist diese Kombination nicht dokumentiert, kennzeichnen Sie die Aufgabenverteilung als ungeprüft; prüfen Sie vor der Festlegung außerdem den verfügbaren Speicher und die Grenzen der Aufgabenplanung.

Der ACPU-Leitfaden unterscheidet außerdem die Aufgaben der Anwendungskerne: Beim SF32LB57x verarbeitet die ACPU Audio und Grafik, beim SF32LB58x dient sie als Audio-DSP. Diese Aufgaben sind von der Bluetooth-Controller-Funktion getrennt. Prüfen Sie die mögliche Aufgabenverteilung für das gewählte Board und SDK.

Die Bluetooth-Angaben in der Tabelle fassen die Dokumentation auf Familienebene zusammen; sie garantieren nicht, dass jedes Profil in jeder Variante oder jedem SDK-Build verfügbar ist. Die SiFli-Datenblätter für [SF32LB52x](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5.pdf), [SF32LB55x](https://downloads.sifli.com/silicon/DS0001-SF32LB55x-Datasheet%20V1p6.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/DS0056-SF32LB56x-Datasheet%20V1p8.pdf) und [SF32LB58x](https://downloads.sifli.com/silicon/DS0058-SF32LB58x-Datasheet%20V1p6.pdf) nennen die aufgeführten BLE- oder Dual-Mode-Funktionen. Der [Bluetooth-Signalisierungstestleitfaden des SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/bt_signaling_test_guide.html) behandelt BR/EDR- und BLE-Tests und schließt SF32LB57x ein. Prüfen Sie die Verfügbarkeit von Profilen, Funktionen und Konfigurationen für das konkrete Gerät und die verwendete SDK-Version.

### Anwendungsprogrammierbarkeit und Controller-Firmware { #controller-firmware-programmability }

Dass die LCPU Anwendungsaufgaben ausführen kann, bedeutet weder Zugriff auf den Bluetooth-Controller-Quellcode noch die Möglichkeit, den Funkstack zu ersetzen. Unterstützte Firmware-Updates, Patch-Verfahren, Speicherbudgets und die Grenzen der Aufgabenplanung hängen vom Gerät und SDK ab.

- **Energiesparende Anwendungen entwickeln.** Verlagern Sie geeignete Sensorerfassung, einfache Verarbeitung und Systemverwaltung auf die LCPU, soweit unterstützt. Planen Sie Stack-Speicher, Ausführungszeit und die Kommunikation mit der HCPU ein.
- **Controller warten und anpassen.** Nutzen Sie die vom Hersteller unterstützten Firmware-Updates und Patch-Verfahren für Gerät und SDK. Ein programmierbarer Anwendungskern belegt weder den Zugang zum proprietären Controller-Quellcode noch die Verfügbarkeit eines alternativen Funkstacks. Klären Sie diese Möglichkeiten gesondert mit SiFli.

Auch eine reine Controller-Konfiguration kann Updates vom Hersteller erhalten; das Firmware-Image ist nicht zwangsläufig unveränderlich. Prüfen Sie bei Änderungen, ob die Anforderungen an Bluetooth-Qualifizierung, Interoperabilität, Host-Controller-Kompatibilität und OTA-Wiederherstellung erfüllt sind. Unterscheiden Sie einen Rollback zur Fehlerbehebung von einer Sicherheitsrichtlinie, die die Installation verwundbarer älterer Firmware verhindert.

## BLE und Bluetooth im Dual-Mode { #ble-and-dual-mode-bluetooth }

Je nach Familienmitglied unterstützen SF32-Geräte entweder nur **Bluetooth Low Energy (BLE)** oder **Bluetooth Classic** und **BLE** im **Dual-Mode-Betrieb**.

### Bluetooth Low Energy { #bluetooth-low-energy }

BLE ist für energieeffizienten Datenaustausch optimiert. Es wird häufig verwendet für:

- Fitnessbänder und Smartwatches.
- Gesundheitssensoren und tragbare Geräte.
- Smartphone-Benachrichtigungen und zugehörige Apps.
- Sensorsynchronisation.
- Beacons und Geräte für standortbezogene Dienste.
- Steuerungs- und Konfigurationskanäle mit geringem Energiebedarf.

BLE-Verbindungen übertragen Daten meist nur zeitweise und ereignisgesteuert. Damit eignen sie sich besonders für einen Bluetooth-Prozessor mit niedrigem Energiebedarf.

### Bluetooth Classic und Dual-Mode-Designs { #bluetooth-classic-and-dual-mode-designs }

Der Dual-Mode-Betrieb ergänzt BLE um Anwendungsfälle von Bluetooth Classic. Das ist nützlich für Produkte wie:

- Bluetooth-Audiozubehör.
- Drahtlose Adapter und Module.
- Geräte, die mit bestehenden Bluetooth-Classic-Profilen kompatibel sein müssen.
- Produkte, die BLE-Steuerung mit Audio- oder Datenübertragung über Bluetooth Classic kombinieren.

Der Dual-Mode-Betrieb kann anspruchsvoller sein als der reine BLE-Betrieb, da Audio- und ältere Bluetooth-Profile höhere Anforderungen an Durchsatz, Latenz oder Koexistenz stellen können. Ein dediziertes Bluetooth-Subsystem hilft, diese Anforderungen von Lastspitzen der Haupt-CPU zu entkoppeln.

## Bluetooth-Audio und LE Audio { #bluetooth-audio-and-le-audio }

Bluetooth-Audioprodukte stellen zusätzliche Anforderungen an die Systemarchitektur. Audio-Workloads umfassen gleichzeitig Funkzeitsteuerung, Pufferung, Codec-Verarbeitung, Taktsynchronisation und mitunter Aktualisierungen der Benutzeroberfläche.

Ein gut gestaltetes SF32-Bluetooth-Audiosystem trennt typischerweise die Verantwortlichkeiten:

- Der Bluetooth-Prozessor übernimmt die Funk- und Verbindungszeitsteuerung auf der Controller-Seite.
- Der Anwendungsprozessor übernimmt Produktlogik, UI und höherstufiges Audioverhalten.
- Audioschnittstellen wie I2S, PDM, ADC oder DAC übertragen Audiodaten zwischen den Systemkomponenten.
- DMA und Pufferung reduzieren den CPU-Overhead bei kontinuierlichem Audio-Streaming.

Für LE Audio und andere moderne Bluetooth-Audio-Anwendungen sind auch die Firmware-Architektur, die Unterstützung durch den Protokollstack, die Codec-Auswahl, die Speicherbandbreite und die Energiestrategie entscheidend. Die SiFli-Datenblätter für SF32LB56x und SF32LB58x nennen BLE-Audio-Unterstützung ausdrücklich; BLE- oder Dual-Mode-Unterstützung allein belegt keine LE-Audio-Unterstützung. Welche Profile, Codecs und SDK-Implementierungen verfügbar sind, hängt weiterhin von der konkreten Variante und SDK-Version ab. Prüfen Sie dies vor einer LE-Audio-Produktentscheidung. Der Bluetooth-Prozessor stellt die Grundlage für die zeitliche Steuerung bereit; das Verhalten des fertigen Produkts hängt jedoch vom SDK und vom Anwendungsdesign ab.

## Energiesparbetrieb { #low-power-operation }

Das Bluetooth-Subsystem spielt seine Stärken aus, wenn der Hauptanwendungsprozessor in den Ruhezustand wechseln kann, während die Funkverbindung aktiv bleibt. Im verbundenen Bereitschaftsbetrieb muss das System den Anwendungsprozessor möglicherweise nur bei wichtigen Ereignissen aufwecken, zum Beispiel wenn:

- eine Benachrichtigung oder ein Befehl eingeht.
- sich der Verbindungsstatus ändert.
- eine geplante Synchronisierung ansteht.
- ein Audiostream startet oder endet.
- ein Sensorereignis oder eine Benutzereingabe eintritt.
- ein Firmware-Update oder die Gerätebereitstellung erfolgt.

Dieses Modell hält die Haupt-CPU möglichst lange in einem Energiesparzustand. Der Bluetooth-Prozessor und das Funkmodul werden zu den geplanten Verbindungsereignissen aktiv, führen die nötige Protokollverarbeitung aus und versetzen das System anschließend wieder in einen Zustand mit geringerem Energieverbrauch.

Das tatsächliche Energieprofil hängt vom Verbindungsintervall, der Sendeleistung, dem Advertising-Verhalten, dem Schlafmodus, der Quarzkonfiguration, dem RF-Layout, der Firmware-Strategie und der Häufigkeit ab, mit der der Anwendungsprozessor geweckt wird.

## Abgrenzung von Host, Controller und Anwendung { #host-controller-and-application-boundaries }

Bluetooth-Software wird oft in zwei Hauptschichten beschrieben:

<div align="center"><em>Tabelle: Host-, Controller- und Anwendungsgrenzen</em></div>

<div align="center" markdown>

| Schicht | Hauptverantwortung |
|:------|:--------------------|
| **Host** | Profile, Dienste, Pairing-Richtlinien, APIs für die Anwendung und Protokollfunktionen höherer Ebenen. |
| **Controller** | Link Layer, Funkplanung, Paketzeitsteuerung, Verschlüsselungsunterstützung und Bluetooth-Verfahren auf niedriger Ebene. |

</div>

In einem SF32-System sind die Aufgaben des Controllers eng an den Bluetooth-Prozessor und das Funksubsystem gebunden. Je nach Stack-Architektur können die Host-Funktionen auf dem Anwendungsprozessor, in der System-Firmware oder in vom SDK bereitgestellten Komponenten laufen.

Für Anwendungsentwickler ist entscheidend, dass Bluetooth-Verhalten CPU-Grenzen überschreitet. Gemeinsam genutzter Speicher, Kommunikation zwischen Prozessoren, Ereignisse und SDK-APIs gehören zur Produktarchitektur. Behandeln Sie Bluetooth als Subsystem und nicht nur als Bibliothek, die in die Hauptanwendung eingebunden ist.

## Interaktion mit dem Anwendungsprozessor { #interaction-with-the-application-processor }

Der Anwendungsprozessor steuert üblicherweise das Verhalten auf Produktebene:

- Advertising starten und beenden.
- Verbindungen aufbauen oder annehmen.
- GATT-Dienste und -Charakteristiken verwalten.
- Pairing, Bonding und Sicherheitsrichtlinien behandeln.
- Anwendungsdaten mit einem Telefon oder Gateway austauschen.
- Den UI-Zustand aktualisieren, wenn sich der Bluetooth-Status ändert.
- Audiostreams, Sensoren und Energiesparmodi koordinieren.

Der Bluetooth-Prozessor übernimmt die untergeordnete Arbeit, die zur Aufrechterhaltung der Verbindung nötig ist. Die Kommunikation zwischen den beiden Seiten wird normalerweise durch SDK-APIs, Ereignisse, Warteschlangen oder Interprozessor-Kommunikationsmechanismen abstrahiert.

Eine gute Anwendungsarchitektur vermeidet unnötige Weckvorgänge der Haupt-CPU. Bündeln Sie Ereignisse, wenn möglich, wählen Sie geeignete Verbindungsparameter und vermeiden Sie häufige Abfrageschleifen (Polling), wenn ereignisgesteuerte Callbacks verfügbar sind.

## Hinweise zu RF und Takt { #rf-and-clock-considerations }

Der Bluetooth-Prozessor allein garantiert keine gute Funkleistung; auch das umgebende Hardwaredesign ist entscheidend. RF-Layout, Antennenabstimmung, Taktgenauigkeit, Qualität der Spannungsversorgung und Kalibrierung in der Produktion beeinflussen Reichweite, Empfindlichkeit, Sendeleistung und Verbindungsstabilität.

Wichtige Hardware-Aspekte sind:

- Verwenden Sie das empfohlene RF-Anpassnetzwerk und Antennenlayout.
- Halten Sie die RF-Leiterbahn kurz, impedanzkontrolliert und mit ausreichendem Abstand zu störenden Signalen.
- Beachten Sie die Quarzvorgaben im Hardware-Design-Leitfaden.
- Sorgen Sie für stabile Versorgungsspannungen und lokale Entkopplung der RF- und Taktschaltungen.
- Sehen Sie Testzugänge für die RF-Kalibrierung und das Laden der Firmware in der Produktion vor.
- Führen Sie schnelle Display-, Speicher- oder Schaltreglersignale nicht in der Nähe empfindlicher RF-Pfade.

Software- und Hardwareteams sollten die Bluetooth-Leistung als Systemeigenschaft betrachten. Firmware-Parameter können ein ungünstiges RF-Layout oder instabile Takte nicht vollständig ausgleichen.

## Koexistenz mit anderen Systemlasten { #coexistence-with-other-workloads }

SF32-Geräte betreiben Bluetooth häufig parallel zu Grafik, Audio, Sensoren, Massenspeicher und gelegentlich externem WLAN. Diese Subsysteme teilen sich Versorgung, Takte, Speicherbandbreite, Pins und Rechenzeit der CPU.

Zu den häufigen Koexistenzproblemen zählen:

- Display-Aktualisierungen oder PSRAM-Zugriffe, die Speicherbandbreite beanspruchen.
- Audio-DMA und Bluetooth-Audiopuffer, die eine stabile Zeitsteuerung erfordern.
- Sensorinterrupts, die den Anwendungsprozessor zu häufig aufwecken.
- Externes WLAN oder andere RF-Quellen, die die Bluetooth-Leistung beeinträchtigen können.
- Lange kritische Abschnitte oder deaktivierte Interrupts, die die Bluetooth-Verarbeitung auf der Host-Seite verzögern.

Der Bluetooth-Prozessor verringert das Risiko von Zeitsteuerungsproblemen, beseitigt aber nicht alle Engpässe bei gemeinsam genutzten Ressourcen. Produkte mit Audio, umfangreicher Benutzeroberfläche oder externer Funkverbindung sollten unter realistischen Worst-Case-Lasten getestet werden.

## Typische Anwendungsfälle { #typical-use-cases }

Der Bluetooth-Prozessor ist zentral für viele SF32-Produktkategorien:

- Bluetooth-Module und serielle Adapter.
- Einsteiger-Smartwatches und Fitnessbänder.
- BLE-Gesundheitssensoren und Wearable-Geräte.
- Bluetooth-Audiozubehör.
- Smart Badges und elektronische Regaletiketten.
- Mit dem Telefon verbundene Dashboards und HMI-Geräte.
- Smart-Home-Steuerungen und Produkte mit zugehöriger App.
- Sensorsynchronisations- und Datenprotokollierungsgeräte.

Welche SF32-Variante am besten passt, hängt davon ab, ob das Produkt nur BLE oder Dual-Mode-Bluetooth benötigt, welche Anforderungen an Audio, Display und Speicherkapazität bestehen und ob sich Energiesparfunktionen auf der LCPU programmieren lassen.

## Praktische Design-Leitlinien { #practical-design-guidance }

Legen Sie beim Entwurf von Bluetooth-Firmware für SF32 zunächst das Konnektivitätsverhalten des Produkts fest:

- Benötigt das Produkt nur BLE oder Dual-Mode-Bluetooth?
- Wird Bluetooth-Audio benötigt?
- Welches Verbindungsintervall, welche Latenz und welcher Durchsatz werden benötigt?
- Wie oft sollte der Hauptanwendungsprozessor aufwachen?
- Welche Ereignisse müssen das System aus Deep Sleep oder Standby wecken?
- Konkurrieren Sensor- oder Benutzeroberflächenaufgaben mit der Bluetooth-Zeitsteuerung?
- Welche RF-Reichweiten- und Sendeleistungsziele sind erforderlich?
- Wie werden das Laden der Firmware in der Produktion und die RF-Kalibrierung umgesetzt?

Ein robustes Design kombiniert den Bluetooth-Prozessor in der Regel mit sorgfältig gewählten Verbindungsparametern, ereignisgesteuertem Anwendungscode, einer durchdachten Planung der Energiesparzustände und einem guten RF-Layout.

## Wichtigste Erkenntnisse { #key-takeaways }

- SF32LB-Geräte nutzen ein dediziertes Bluetooth- bzw. Low-Power-Prozessor-Subsystem, damit die Funkkommunikation zuverlässig und energieeffizient abläuft.
- Beim SF32LB52x dient die LCPU ausschließlich als Bluetooth-Controller. Bei SF32LB55x, SF32LB56x und SF32LB58x unterstützt die LCPU in dokumentierten Konfigurationen SDK-definierte Anwendungsaufgaben. Beim SF32LB57x übernimmt die LCPU Bluetooth und energiesensible Aufgaben; prüfen Sie jedoch für jede geplante Benutzeraufgabe die Unterstützung im Ziel-SDK und auf dem Board.
- Eine programmierbare LCPU ermöglicht Anwendungsaufgaben innerhalb der SDK-Grenzen. Quellcodezugriff und Anpassbarkeit des Controller-Stacks sind gesondert zu klären. Nutzen Sie unterstützte Hersteller-Updates und validieren Sie Controller-Änderungen.
- BLE ist für vernetzte Produkte mit niedrigem Energiebedarf optimiert. Dual-Mode-Bluetooth ergänzt Anwendungsfälle von Bluetooth Classic, etwa Audio und ältere Profile.
- Der Bluetooth-Prozessor ermöglicht es der Haupt-CPU, im Ruhezustand zu bleiben, während Verbindungen, Advertising und geplante Funkereignisse weiterlaufen.
- Die Bluetooth-Leistung hängt sowohl von der Firmware-Architektur als auch von der Hardware ab, darunter RF-Layout, Takte, Spannungsversorgung, Antennenabstimmung und Kalibrierung.
- Behandeln Sie Bluetooth als Subsystem mit Host-Controller-Grenzen, Kommunikation zwischen Prozessoren, Energiestrategie und gemeinsam genutzten Ressourcen.
