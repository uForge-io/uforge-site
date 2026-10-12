---
icon: lucide/workflow
description: "PTM (Parallel Task Machine), für SF32LB57x dokumentiert: eine programmierbare Engine für zeitkritische Peripherieaufgaben und individuelle Protokolle, die den Cortex-M33 entlasten kann."
tags:
    - Architektur
    - PTM
    - SF32LB57
---

# PTM (Parallel Task Machine) { #ptm-parallel-task-machine }

## Einführung { #introduction }

**PTM** steht für **Parallel Task Machine** und ist eine programmierbare Engine für Peripherieaufgaben, die für SF32LB57x dokumentiert ist. Sie ist für Aufgaben gedacht, deren Zeitverhalten für gewöhnliche Firmware-Schleifen zu kritisch ist, die zu individuell für fest verdrahtete Peripheriefunktionen sind und die zu klein sind, um den Cortex-M33-Hauptkern dauerhaft einzubinden.

In der Produktentwicklung kann die Firmware zeitlich genau definierte Peripherieabläufe an PTM auslagern: I/O-Sequenzen auf Taktzyklusebene, individuelle Protokolle, die Erfassung von Sensordaten, PWM-ähnliche Signalformen, schnelle Reaktionen auf Trigger sowie einfache Register- oder Speicheroperationen, die durch externe Ereignisse ausgelöst werden.

Die Aufgabenverteilung ist einfach: Die CPU konfiguriert und überwacht den Ablauf, PTM führt die wiederkehrenden, zeitkritischen Schritte aus. Dazu greift PTM auf I/O, FIFO/DMA, Ereignisse und den AHB-Bus zu. PTM ist daher mehr als ein Helfer zur GPIO-Signalerzeugung: Es automatisiert Peripherieabläufe mit einem kleinen programmierbaren Ausführungsmodul.

Diese Seite ist relevant, wenn eine Standardperipherie das erforderliche Zeitverhalten oder Protokoll nicht unterstützt und eine Polling-Schleife auf der Haupt-CPU zusätzliche Latenz, Energieverbrauch oder Firmware-Komplexität verursachen würde. Sie richtet sich an Entwicklungsteams, die die Aufgabenteilung zwischen Hardware und Firmware festlegen, nicht an Entwickler, die GPIOs oder Timer lediglich im normalen Betrieb nutzen.

## Warum es PTM gibt { #why-ptm-exists }

Bei Mikrocontrollern passen die Zeitvorgaben von Peripherien nicht immer zur Verarbeitung durch die Anwendung. Die Haupt-CPU kann für das Produkt leistungsfähig genug sein, dennoch können bestimmte hardwarenahe Abläufe die Firmware unnötig komplizieren:

- I/O-Sequenzen auf Bit- oder Taktzyklusebene;
- eigene serielle Protokolle, die sich nicht ohne Weiteres mit UART, SPI, I2C oder CAN umsetzen lassen;
- Sensorabfragen oder Abtastabläufe, die schnell auf einen Trigger reagieren müssen;
- PWM-ähnliche Steuerungsmuster, die über die Standard-Ausgabemodi eines Timers hinausgehen;
- kleine Datenübertragungen oder Registeroperationen, die an Peripherieereignisse gekoppelt sind;
- die Abstimmung mehrerer Peripherien, ohne bei jedem Schritt den Anwendungskern aufzuwecken.

Die Bearbeitung solcher Aufgaben in Interrupts kann die Interruptlast erhöhen und die Latenz schwerer beherrschbar machen. Busy-Wait-Schleifen verschwenden CPU-Zeit und Energie; zusätzliche externe Logik macht den Schaltungsentwurf komplexer. PTM bietet dazwischen eine Alternative: kompakte, deterministische Peripherieabläufe, die von der Firmware gesteuert werden.

## PTM in der SF32LB57x-Architektur { #ptm-in-the-sf32lb57x-architecture }

PTM ist eine kleine programmierbare Engine, die mit der I/O-, Ereignis-, FIFO/DMA- und AHB-Bus-Infrastruktur des SF32LB57x-SoC verbunden ist. PTM ist für SF32LB57x dokumentiert. Prüfen Sie die Dokumentation des jeweiligen Geräts, bevor Sie davon ausgehen, dass PTM auch bei einer anderen SF32-Familie verfügbar ist.

<div align="center"><em>Abbildung: Ablauf einer PTM-Aufgabe</em></div>

```text
Application / firmware
        │
        ▼
CPU configures PTM task
        │
        ▼
PTM executes deterministic peripheral sequences
        │
        ├── IO read/write
        ├── FIFO / DMA data movement
        ├── AHB memory or register access
        ├── Event wait / fixed delay
        └── CPU interrupt or internal event notification
```

Der architektonische Vorteil: PTM kann eine kompakte Folge eigener Befehle ausführen und mehr als nur Pins steuern. Es liest und schreibt I/O, wartet auf Ereignisse, nutzt FIFO/DMA-Pfade und greift auf AHB-Speicher sowie Peripherieregister zu. Die CPU wird erst benachrichtigt, wenn Firmware auf höherer Ebene eingreifen muss.

So kann das System Standardperipherien für Standardaufgaben beibehalten und zugleich einen deterministischen Umsetzungsweg für die individuellen Zeitabläufe bieten, die in realen Hardwaredesigns auftreten.

## PTM-Funktionen { #core-capabilities }

Der SF32LB57x Hardware-Design-Leitfaden führt **einen PTM-Block mit 16 Kanälen** auf; die Pin-Multiplex-Tabelle nennt PTM1_CH0 bis PTM1_CH15. Zusammen mit den SDK-Definitionen umfassen die dokumentierten Funktionen unter anderem:

- unabhängig steuerbare PTM-Ausführungsressourcen;
- ein kompakter, eigener Befehlssatz;
- Befehlsausführung aus internem TCM oder vom Systembus;
- Lesen und Schreiben von Busadressen;
- Datenoperationen;
- bedingte Sprünge und Schleifen;
- IO-Lese- und Schreibzugriffe;
- Warten auf Trigger;
- feste Verzögerung;
- zyklengenaue Timing-Kontrolle bei Ausführung aus dem PTM-TCM;
- 16 IO-Kanäle im PTM-Block;
- FIFO-Unterstützung mit DMA-Schnittstelle;
- AHB-Buszugriff für Speicher- und Peripherieregisteroperationen;
- CPU-Interrupt-Erzeugung;
- interne Ereignisse zur Verknüpfung von Aufgabenabläufen;
- SDK-Steuerfunktionen für Zurücksetzen, Start, Pause und Einzelschritt indizierter PTM-Ressourcen.

Insgesamt ist PTM damit ein Modul zur deterministischen Automatisierung von Peripherieabläufen und nicht nur ein Pin-Sequenzer.

**Ressourcenkonfiguration:** Die [Registerdefinitionen des SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/cmsis/sf32lb57x/ptm.h) enthalten Steuerungs- und Registergruppen mit den Indizes 0–7. Die [Befehlsdefinitionen](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/ptm_ins.h) verwenden entsprechende Indizes für TCM-Ressourcen. Die verfügbaren Quellen erklären nicht, wie die SDK-Indizes physischen Verarbeitungskernen zugeordnet sind. Leiten Sie aus dem Indexbereich daher keine Kernzahl ab und prüfen Sie die verfügbaren Ressourcen anhand der Gerätedokumentation und SDK-Implementierung.

## Ausführungsmodell { #execution-model }

PTM führt Befehle in einem eigenen Format aus. Der Befehlssatz ist bewusst kompakt, enthält aber die für Peripherieabläufe erforderlichen Operationen:

- **Ablaufsteuerung**: Bedingungen prüfen, springen, Schleifen ausführen, warten und verzögern.
- **I/O-Steuerung**: zugeordnete I/O-Kanäle lesen und beschreiben.
- **Datenverarbeitung**: einfache arithmetische und bitweise Operationen.
- **Buszugriff**: Speicher und Peripherieregister über den AHB-Bus lesen und beschreiben.
- **Synchronisierung**: auf Trigger warten, Interrupts auslösen und Abläufe über interne Ereignisse koordinieren.

Wird eine Aufgabe aus dem PTM-TCM ausgeführt, lässt sich ihr Zeitverhalten auf Taktzyklusebene steuern. Das ist für individuelle Protokolle und I/O-Sequenzen entscheidend: Die CPU muss nicht auf jede Signalflanke, jedes Zeitfenster oder jede kurze Peripheriephase reagieren.

PTM eignet sich vor allem für kleine, klar definierte und deterministische Aufgaben. Wird die Logik abstrakt, enthält sie viele Verzweigungen oder setzt sie Entscheidungen der Anwendung voraus, sollte sie wahrscheinlich auf der CPU ausgeführt werden.

## IO, FIFO und DMA { #io-fifo-and-dma }

Der PTM-Block des SF32LB57x stellt insgesamt 16 I/O-Kanäle bereit. Damit kann eine PTM-Aufgabe mehrere Pins überwachen, die Signalfolge einer individuellen Schnittstelle steuern oder Abläufe mit mehreren Signalen erzeugen.

PTM unterstützt außerdem ein FIFO mit DMA-Schnittstelle. Eigene Protokolle erfordern meist mehr als das Schalten von Pins: Oft müssen Daten zwischen dem Speicher und der I/O-Logik übertragen werden, ohne dass die CPU jedes Byte oder Wort einzeln verarbeiten muss.

Mit PTM lassen sich beispielsweise folgende Abläufe umsetzen:

- Daten über eine individuelle Schnittstelle übertragen;
- wiederkehrende I/O-Muster erfassen oder erzeugen;
- Datenübertragungen mit Peripherieereignissen abstimmen;
- kleine Protokolltransaktionen puffern;
- Daten per DMA an die Aufgabe übergeben oder deren Ergebnisse auslesen, ohne die CPU in den kritischen Pfad einzubeziehen.

## Ereignisse und Interrupts { #events-interrupts-and-multicore-coordination }

PTM arbeitet ereignisgesteuert. Es kann auf ein Ereignis oder eine festgelegte Verzögerung warten; interne Ereignisse können Aufgabenabläufe verknüpfen. Die verfügbare Gerätedokumentation legt weder die Zahl physischer PTM-Kerne noch die Zuordnung der SDK-Ressourcenindizes zu solchen Kernen fest. Über bestimmte Ereignispfade lässt sich die CPU per Interrupt benachrichtigen. Die Firmware muss dadurch erst dann aufwachen oder reagieren, wenn der deterministische Ablauf einen relevanten Punkt erreicht.

Das ist der zentrale Vorteil auf Systemebene: PTM übernimmt die hardwarenahe Zeitsteuerung und meldet der Firmware klar definierte Ereignispunkte. Statt kontinuierlich abzufragen oder jeden Zeitabschnitt per Interrupt zu behandeln, kann die CPU die PTM-Aufgabe konfigurieren, ausführen lassen und anschließend das Ergebnis verarbeiten.

## Typische PTM-Anwendungsfälle { #typical-ptm-use-cases }

Bei einem SF32LB57x-Design ist PTM besonders nützlich, wenn das erforderliche Peripherieverhalten zu spezifisch für fest verdrahtete Funktionsblöcke und zu zeitkritisch für gewöhnliche Firmware-Schleifen ist.

Typische Anwendungsfälle sind:

- eigene Schnittstellenprotokolle;
- eigene PWM-Steuerung oder Impulserzeugung;
- automatische Erfassung von Sensordaten;
- schnelle Reaktion auf Trigger;
- Koordination mehrerer Module;
- gebündelte Speicher- oder Registeroperationen;
- kleine deterministische Regelschleifen für externe Geräte;
- Ausgleich unterschiedlicher Protokoll-Zeitvorgaben zwischen Sensoren, Displays, Aktoren oder Begleit-ICs und der Anwendungs-Firmware.

### Nutzungsgrenzen { #usage-boundaries }

PTM sollte eine Standardperipherie nicht ersetzen, wenn diese die Aufgabe bereits erfüllt. Für übliche Funktionen sind UART, SPI, I2C, CAN, SDIO, I2S, PDM, Timer und DMA weiterhin die erste Wahl. PTM ist dann sinnvoll, wenn das Produkt ein Verhalten benötigt, das über die Funktionen dieser fest zugeordneten Module hinausgeht.

## PTM und Energieverbrauch der CPU { #ptm-and-cpu-power }

PTM kann die Zahl der CPU-Aufwachvorgänge für kurze, deterministische Peripherieaufgaben verringern. Die CPU konfiguriert die PTM-Aufgabe und bleibt während ihrer Ausführung weitgehend unbeteiligt. Sie reagiert erst wieder, wenn PTM einen Punkt erreicht, an dem die Firmware eingreifen muss.

Das ist besonders für Wearables und AIoT-Produkte relevant, die beispielsweise Folgendes tun müssen:

- Sensorwerte oder GPIO-Zustände überwachen;
- kurze Datenbursts erfassen;
- eine spezielle externe Komponente ansteuern;
- Zeitvorgaben einhalten, während der Anwendungskern nicht durchgehend aktiv ist;
- bei wiederkehrenden Peripherieaufgaben die Zahl der Interrupts verringern.

Die tatsächliche Energieeinsparung hängt von der Taktkonfiguration, der Aufweckstrategie, der Platzierung von Code und Daten im Speicher, dem Zustand der Peripherien und der Firmware-Architektur ab. PTM kann kleine Peripherieaufgaben ausführen, ohne die CPU für jeden einzelnen Schritt aufzuwecken.

## PTM, RP2040 PIO und Nordic PPI/DPPI { #ptm-rp2040-pio-and-nordic-ppidppi }

PTM, RP2040 PIO und Nordic PPI/DPPI können die CPU bei zeitkritischen Aufgaben entlasten. Sie arbeiten jedoch auf unterschiedlichen Architekturebenen und sind daher nicht austauschbar.

- **PTM** ist eine programmierbare Engine für Peripherieaufgaben. Sie führt eigene Aufgabenbefehle aus und kann I/O, Ereignisse, FIFO/DMA sowie Zugriffe auf AHB-Speicher und -Register kombinieren.
- **PIO** ist eine programmierbare I/O-Zustandsmaschine. Sie führt ein kleines Befehlsprogramm für frei programmierbare GPIO-Zeitsteuerung und serielle Protokolle aus.
- **PPI/DPPI** sind programmierbare Verbindungen zwischen Peripherien. Sie leiten Peripherieereignisse an bereits vorhandene Peripherieaufgaben weiter, führen aber selbst keine Befehle aus und verarbeiten keine Daten.

<div align="center"><em>Tabelle: Vergleich von PTM, RP2040 PIO und Nordic PPI/DPPI</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Vergleichskriterium | SF32LB57x PTM | RP2040 PIO | Nordic PPI/DPPI |
|:-----|:--------------|:-----------|:-----------|
| Grundprinzip | Programmierbare Engine für deterministische I/O, individuelle Protokolle, Sensordatenerfassung und ereignisgesteuerte Peripherieabläufe. | Programmierbare I/O-Zustandsmaschinen für deterministische GPIO-Steuerung und eigene serielle Protokolle. | Hardwareverbindung zwischen Peripherieereignissen und -aufgaben zur CPU-unabhängigen Koordination, sofern die erforderlichen Endpunkte vorhanden sind. |
| Ausführungseinheit | Indizierte PTM-Ausführungsressourcen; Verfügbarkeit beim gewählten Gerät prüfen. | Zwei PIO-Blöcke mit je vier Zustandsmaschinen, insgesamt acht. | Ereigniskanäle leiten Trigger weiter, führen aber keine Programme aus. |
| Funktionsweise | PTM führt eigene Aufgabenbefehle aus. | Zustandsmaschinen führen PIO-Befehle Taktzyklus für Taktzyklus aus. | PPI verbindet Ereignis- und Aufgabenendpunkte; DPPI verwendet Publisher- und Subscriber-Peripherien auf einem gemeinsamen Kanal. |
| Zeitverhalten | Taktzyklusgenaue Steuerung bei Ausführung aus dem PTM-TCM; unterstützt Warten und feste Verzögerungen. | Taktzyklusgenaue Ausführung mit Verzögerungsslots und Wartebefehlen. | Ein Ereignis löst eine vorhandene Peripherieaufgabe aus. Das Zeitverhalten hängt von den verbundenen Peripherien und der Interconnect-Implementierung ab. |
| I/O | Der PTM-Block des SF32LB57x stellt insgesamt 16 I/O-Kanäle bereit. | Die Zustandsmaschinen steuern ausgewählte GPIO-Pins gemäß der Pin-Konfiguration. | Erzeugt keine GPIO-Signalformen direkt, kann aber Aufgaben von Peripherien wie GPIOTE und Timern auslösen. |
| Befehle und Logik | Eigener Befehlssatz für I/O, Bus-Lese-/Schreibzugriffe, Datenoperationen, bedingte Sprünge, Wartezeiten und Verzögerungen. | Kompakter Befehlssatz für Pin-I/O, Schieben, Warten, Sprünge, FIFO-Push/Pull, IRQ und Datenbewegungen. | Keine Befehlsausführung, Schleifen, Verzweigungen oder Datenverarbeitung. |
| Speicher- und Registerzugriff | Zugriff auf AHB-Speicher und Peripherieregister. | Schwerpunkt auf GPIO, FIFO und Schieberegistern; Daten und Konfiguration werden üblicherweise von CPU oder DMA bereitgestellt. | Kein Zugriff auf Speicher oder allgemeine Peripherieregister; verbindet nur verfügbare Ereignis- und Aufgabenendpunkte. |
| FIFO/DMA | FIFO mit DMA-Schnittstelle. | TX/RX-FIFOs, üblicherweise in Verbindung mit DMA. | Kein eigener Datenpfad im Interconnect; kann Aufgaben DMA-fähiger Peripherien auslösen. |
| Zusammenspiel mit der CPU | Kann CPU-Interrupts auslösen und Aufgabenabläufe über interne Ereignisse verknüpfen. | Nutzt IRQ-Flags, FIFOs und die Zusammenarbeit mit CPU oder DMA. | Die CPU konfiguriert die Kanäle; zur Laufzeit können Peripherien Aufgaben autonom durch Ereignisse auslösen. |
| Typische Anwendungsfälle | Eigene Schnittstellenprotokolle, kundenspezifische PWM-Signale, automatische Sensordatenerfassung, gebündelte Speicher-/Registeroperationen und Koordination mehrerer Module. | Eigene Schnittstellen nach Art von UART/SPI/I2S, WS2812-ähnliche Signalformen, serielle Protokolle auf Pin-Ebene und präzise GPIO-Zeitsteuerung. | RTC- oder Timer-Ereignisse, die ADC-Wandlungen, Zählvorgänge oder andere von Peripherien unterstützte Standardaufgaben auslösen. |

</div>

### Zugrundeliegendes Modell { #under-the-hood-model }

Die Ausführungspfade dieser Mechanismen sind:

<div align="center"><em>Abbildung: Ausführungspfade von PPI, DPPI, PIO und PTM</em></div>

```text
PPI:  Event endpoint ──> PPI channel ──> Task endpoint

DPPI: Publisher peripheral ──> DPPI channel ──> Subscriber peripheral task

PIO: CPU/DMA ──> PIO state-machine instructions ──> GPIO timing and FIFOs

PTM: CPU configuration ──> PTM task instructions ──> IO + events + FIFO/DMA + AHB access
```

PPI und DPPI verbinden Ereignisse ohne Befehlsausführung, verbinden aber nur vorhandene Ereignisse und Aufgaben; neue Protokolllogik lässt sich damit nicht definieren. PIO kann das Verhalten von Pins über Zustandsmaschinen programmieren, ist aber hauptsächlich auf GPIO und FIFO ausgerichtet. PTM deckt einen größeren Aufgabenbereich ab: Es kann I/O-Zeitsteuerung, das Warten auf Ereignisse, Datentransfers, Registerzugriffe und die Abstimmung kleiner Aufgaben in einem ausführbaren Ablauf zusammenfassen.

PIO kann bei einer Wartebedingung oder einem vollen beziehungsweise leeren FIFO anhalten. Die Datenbereitstellung durch System-DMA ist keine Garantie für das Timing der Befehle. Auch die Ereignisweiterleitung hat eine implementierungsabhängige Latenz. Daraus lässt sich keine allgemeingültige Rangfolge des Energieverbrauchs ableiten. Domänenübergreifende DPPI-Verbindungen benötigen entsprechende Brücken im gewählten Gerät; nicht jedes DPPI-System unterstützt sie.

### Nordic PPI und DPPI { #nordic-ppi-and-dppi }

PPI ist das ältere Nordic-Modell und findet sich unter anderem in Geräten der nRF52-Familie. Die Software weist jedem Kanal einen Ereignis- und einen Aufgabenendpunkt zu. Ein Kanal kann zusätzlich einen Fork-Aufgabenendpunkt bereitstellen; auch dabei werden Ereignisse und Aufgaben explizit miteinander verbunden.

DPPI ist das neuere Nordic-Modell. Eine Peripherie veröffentlicht ein Ereignis auf einem Kanal, den eine oder mehrere Peripherieaufgaben abonnieren können. Dadurch sind Ereignisquelle und Abonnenten voneinander entkoppelt. Das passt zu neueren Nordic-Architekturen mit mehreren Domänen. Muss ein Signal eine Versorgungsdomänengrenze überqueren, kann eine PPI-Brücke unterstützte DPPI-Kanäle zwischen den Domänen übertragen.

<div align="center"><em>Tabelle: Vergleich von Nordic PPI und DPPI</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Vergleichskriterium | PPI | DPPI |
| :--- | :--- | :--- |
| Konfiguration | Die Software weist einem Kanal einen Ereignis- und einen oder mehrere Aufgabenendpunkte zu. | Peripherien als Ereignis-Publisher und Aufgaben-Subscriber wählen denselben Kanal. |
| Verbindungsart | Explizite Verbindung zwischen Ereignis- und Aufgabenendpunkt. | Publish/Subscribe-Modell. |
| Ein Ereignis, mehrere Aufgaben | Mehrere Kanäle oder einen zusätzlichen Fork-Aufgabenendpunkt des Kanals verwenden. | Mehrere Aufgaben können denselben veröffentlichten Kanal abonnieren. |
| Typische Plattformen | Ältere Nordic-Geräte mit PPI, darunter viele nRF52-Geräte. | Neuere Nordic-Geräte mit verteiltem Ereignissystem. |
| Ausführungsfunktionen | Führt keine Befehle aus und verarbeitet keine Daten. | Führt keine Befehle aus und verarbeitet keine Daten. |

</div>

### Anwendungsfälle im Smartwatch-Sensor-Hub { #smartwatch-sensor-hub-use-cases }

Für einen üblichen Sensor-Hub in einer Smartwatch sollten zunächst Standardperipherien mit I2C/SPI, DMA, Timer und energiesparende Aufweckmechanismen betrachtet werden. Ordnen Sie den Bedarf anschließend ein:

- **Regelmäßige Abtastung:** Ein RTC- oder Timer-Ereignis startet beispielsweise eine unterstützte Aufgabe einer Standardperipherie. Nach Abschluss oder beim Erreichen eines Schwellenwerts wird die CPU benachrichtigt. Auf Nordic-Plattformen eignet sich dafür PPI bei älteren und DPPI bei neueren Geräten. Ein PIO- oder PTM-Programm ist nicht erforderlich.
- **Eigenes elektrisches Protokoll:** Benötigt ein Sensor eine Signalform, Bitbreite oder Zeitsteuerung, die Standard-I2C/SPI nicht unterstützt, eignet sich PIO besser für die Protokollimplementierung direkt an den Pins.
- **Individueller Sensorablauf:** Muss eine Transaktion auf mehrere Trigger warten, mehrere I/Os steuern, kleine Datenmengen übertragen, auf Register zugreifen und mehrere Schritte koordinieren, ist PTM beim SF32LB57x besser geeignet. Die CPU kann an festgelegten Punkten benachrichtigt werden.

PPI/DPPI, PIO und PTM sind daher keine konkurrierenden Lösungen, die sich pauschal als besser oder schlechter einstufen lassen. Sie decken unterschiedliche Ebenen ab: die Verbindung von Ereignissen, Protokolle auf Pin-Ebene und die Automatisierung von Peripherieaufgaben. Verwenden Sie beim SF32LB57x zunächst Standardperipherien und ziehen Sie PTM erst dann in Betracht, wenn deren Fähigkeiten für die erforderlichen Zeitvorgaben oder Abläufe nicht ausreichen.

Referenzen: [SiFli-PTM-Befehlsdefinitionen](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/ptm_ins.h), [Datenblatt des RP2040](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf), [Nordic-PPI-Spezifikation](https://docs.nordicsemi.com/r/bundle/ps_nrf52811/page/ppi.html) und [Nordic-DPPI-Ereignissystem](https://docs.nordicsemi.com/r/bundle/ps_nrf54lv10a/page/ppi.html).

## Design-Leitfaden { #design-guidance }

**Zeit- und Energiegrenzen:** Taktzyklusgenaues Befehls-Timing garantiert keine feste Dauer der gesamten Transaktion. AHB-Zugriffe, das Warten auf den DMA-Abschluss und externe Ereignisse können variable Verzögerungen verursachen. Die benötigten Takte und Versorgungsdomänen von PTM, Speicher und Peripherie müssen aktiv bleiben. Eine inaktive CPU bedeutet nicht, dass PTM in jedem SoC-Schlafmodus arbeitet. Messen Sie die Gesamtenergie einschließlich weiterlaufender Takte und Aufweckaufwand und vergleichen Sie sie mit einer Standardperipherie-Implementierung.

**Ressourcenzuordnung:** Im SDK v2.5.1 nutzt der [RAMless-DPI-Displaytreiber](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_lcdc_aux.c) für SF32LB57x die im SDK als „PTM core 0“ bezeichnete Ausführungsressource, deren TCM, Ereignis 0, den zugehörigen Interrupt und einen zugewiesenen DMA-Kanal. Diese SDK-Bezeichnung belegt nicht die Zahl physischer PTM-Kerne. Das ist ein konkretes Beispiel für Buszugriffe und DMA-Koordination, keine frei wiederverwendbare Ressourcenzuordnung. Überschreiben Sie keine Ressourcen eines aktiven Treibers. Regeln Sie den Pufferzugriff zwischen CPU und DMA und führen Sie bei Bedarf Cache-Wartungsoperationen aus.

Prüfen Sie zunächst, ob das Zielgerät zur SF32LB57x-Familie gehört und ob die benötigten PTM-Funktionen für den vorgesehenen Einsatz dokumentiert sind. PTM kann sinnvoll sein, wenn mehrere der folgenden Punkte zutreffen:

- die Aufgabe wiederholt sich so häufig, dass ihre Bearbeitung durch die CPU unnötig Energie verbraucht oder die Zeitreserve verringert;
- an I/O-Flanken oder bei der Trigger-Reaktion ist ein deterministisches Zeitverhalten erforderlich;
- die individuelle Schnittstelle wird von Standardperipherien nicht passend unterstützt;
- die Aufgabe profitiert von Datentransfers über FIFO/DMA;
- sie lässt sich als kompakte Zustandsmaschine oder Aufgabenfolge beschreiben;
- die Firmware soll nur an wichtigen Punkten benachrichtigt werden.

Vermeiden Sie PTM, wenn:

- eine Standardperipherie das Protokoll bereits passend umsetzt;
- es sich um komplexe Anwendungslogik mit vielen Verzweigungen handelt;
- die Zeitvorgaben so großzügig sind, dass normale Interrupts oder RTOS-Aufgaben einfacher sind;
- dem Softwareteam noch SDK-Unterstützung, Beispiele oder Werkzeuge für das benötigte PTM-Programm fehlen.

Ein gutes PTM-Design trennt deterministische Abläufe von anwendungsabhängigen Entscheidungen. Überlassen Sie PTM die Zeitsteuerung, kurze Datentransfers und die Reaktion auf Ereignisse. Produktentscheidungen, die Fehlerbehandlungsstrategie, große Puffer und die Verwaltung komplexer Zustände gehören in die Firmware.

## Wichtigste Erkenntnisse { #key-takeaways }

- Der SF32LB57x Hardware-Design-Leitfaden dokumentiert einen PTM-Block mit 16 Kanälen; prüfen Sie bei anderen Familien die jeweilige Gerätedokumentation.
- Prüfen Sie die implementierten PTM-Ressourcen des gewählten Geräts und SDKs.
- PTM führt kompakte eigene Befehle aus dem PTM-TCM oder über den Systembus aus.
- PTM unterstützt I/O-Steuerung, Bus- und Registerzugriffe, Datenoperationen, Wartezeiten, Verzögerungen, FIFO/DMA, Interrupts und interne Ereignisse.
- Sie eignet sich für individuelle, deterministische Peripherieabläufe zwischen fest verdrahteter Hardware und normaler Firmware.
- Konzeptionell ähnelt PTM RP2040 PIO, ist aber stärker ins System integriert und deckt einen größeren Aufgabenbereich ab.
- Bei SF32LB57x-Designs kann PTM ein architektonisches Unterscheidungsmerkmal sein, sofern die Dokumentation des ausgewählten Geräts die benötigten PTM-Ressourcen bestätigt. Besonders nützlich ist es für kundenspezifische Sensoren, Displays und Aktoren, Protokollanpassungen und die Peripherieautomatisierung mit geringer CPU-Last.
