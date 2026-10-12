---
icon: lucide/memory-stick
description: "PSRAM in eingebetteten Systemen: wie Pseudo-Static-RAM SRAM erweitert, wie es sich von DRAM, RRAM und MRAM unterscheidet und wie Daten über die SF32-Speicherhierarchie verteilt werden."
tags:
    - Architektur
    - Speicher
    - Lernen
---

# PSRAM im Vergleich zu anderen Speichertypen für eingebettete Systeme { #psram-vs-other-embedded-memory-types }

In vielen Embedded-Produkten erweitert PSRAM — **Pseudo-Static RAM** — den knappen internen SRAM um zusätzlichen Arbeitsspeicher. Darin lassen sich Framebuffer, große Grafik-Assets, Audiopuffer, Modelldaten oder aktive Arbeitsmengen der Anwendung ablegen, die nicht in den internen SRAM passen. Bei einigen stromsparenden Produkten wie Wearables kann PSRAM gegenüber einem diskreten DRAM-Subsystem die Leistungsaufnahme des Systems senken; das hängt jedoch von den Speicherbausteinen, dem Controller, den Betriebszuständen und der Arbeitslast ab. PSRAM bleibt flüchtiger Arbeitsspeicher: Es ersetzt kein Flash und eignet sich nicht automatisch für latenzkritische Daten.

Dieser Überblick hilft bei der Entscheidung, welche Daten in SRAM, PSRAM oder nichtflüchtigen Speicher gehören. Welche Speicher tatsächlich in einer ausgewählten SKU vorhanden sind, geht aus der [SF32-Familie](../../sf32-products/family/SF32_family.md) und der Dokumentation des jeweiligen Chips, Moduls oder Entwicklungsboards hervor.

!!! tip "Kurz gesagt"
    PSRAM verwendet intern dynamischen, DRAM-ähnlichen Speicher, verwaltet aber den Refresh innerhalb des Speicherbausteins, sodass der Host ihn eher wie statisches RAM nutzen kann.

Die Grundregel ist einfach: PSRAM schafft zusätzliche Kapazität, SRAM bleibt deterministischen Aufgaben mit niedriger Latenz vorbehalten, und die externe Speicherschnittstelle ist ein gemeinsam genutztes Budget für Bandbreite und Leistungsaufnahme.

## Statisch und dynamisch: Woher „Pseudo“ kommt { #static-vs-dynamic-where-pseudo-comes-from }

In diesem Kontext beschreiben **statisch** und **dynamisch**, wie eine RAM-Zelle ein Bit hält, während die Stromversorgung anliegt. Sie sagen **nicht** aus, ob die Daten einen Stromausfall überleben: Sowohl SRAM als auch DRAM sind flüchtig.

- Ein **SRAM**-Bit wird in einem statischen Latch gehalten. Einmal geschrieben, bleibt es gültig, ohne dass ein periodischer Refresh erforderlich ist, solange das Gerät mit Strom versorgt wird und innerhalb der Spezifikation arbeitet. Der Kompromiss ist eine größere Speicherzelle, die die Kapazität begrenzt und die Siliziumfläche sowie die Kosten pro Bit erhöht.
- Ein **DRAM**-Bit wird als Ladung auf einem Kondensator gehalten. Diese Ladung nimmt mit der Zeit ab, sodass das Bit periodisch gelesen und wiederhergestellt werden muss (ein **Refresh**), bevor die Ladung zu weit abfällt. Die kleinere Zelle verschafft DRAM einen Dichtevorteil, erfordert aber normalerweise einen DRAM-fähigen Controller, um den Refresh zu planen und Timing-Regeln einzuhalten.

PSRAM verwendet intern häufig ein **dynamisches, DRAM-ähnliches Zellenarray**. Der PSRAM-Baustein führt den Refresh durch und verbirgt einen Großteil des DRAM-spezifischen Steuerverhaltens im Gehäuse. Sein Host-Modell ist daher eher SRAM-ähnlich: Der Host liest und schreibt einen adressierbaren Speicherbereich, ohne den periodischen Refresh selbst planen zu müssen. Dies bedeutet nicht, dass jeder PSRAM die elektrische Schnittstelle oder das Timing von SRAM teilt. Es ist **pseudo-statisch**, weil dynamisches RAM *das externe Verhalten von statischem RAM nachahmt*, nicht weil die Speicherzelle selbst statisch geworden ist.

Die Vereinfachung liegt an der Schnittstelle, nicht in einer Beseitigung physikalischer Kompromisse. PSRAM hat weiterhin gerätespezifische Befehlslatenz, Burst-Verhalten, Taktgrenzen, Schlafmodi, Zugriffsbeschränkungen und Stromverbrauch. Lesen Sie das ausgewählte PSRAM-Datenblatt, anstatt alle PSRAM-Bauteile als austauschbar zu behandeln.

!!! note "Was PSRAM nicht ist"
    PSRAM ist kein nichtflüchtiger Speicher. Es garantiert weder die Latenz des internen SRAM noch ausreichende Systembandbreite. Es löst ein Kapazitätsproblem; das ausgewählte Gerät und die Arbeitslast bestimmen die Kosten für Latenz, Stromverbrauch und Bandbreite.

## Speichertyp-Vergleich { #memory-type-comparison }

<div align="center"><em>Tabelle: Vergleich eingebetteter Speichertypen</em></div>

<div align="center" markdown>

| Speichertyp | Behält Daten ohne Strom? | Kerncharakteristik | Typische Stärke | Wichtigster Design-Kompromiss | Typische Rolle im eingebetteten System |
|:------------|:----------------------------|:--------------------|:-----------------|:----------------------|:----------------------|
| **SRAM** | Nein | Statisches Latch; kein Refresh | Der interne SRAM bietet meist niedrige, vorhersehbare Latenz; das tatsächliche Timing hängt vom Speicherpfad des SoC und konkurrierenden Zugriffen ab | Flächenineffizient, daher begrenzte On-Chip-Kapazität; Leckströme sind bei Always-on-Designs relevant | Stacks, häufig genutzter Code und Daten, DMA-Deskriptoren, Puffer für zeitkritische Interrupt-Bearbeitung, eng gekoppelte Speicher |
| **DRAM** | Nein | Kondensatorbasierter Speicher mit extern verwaltetem Refresh und DRAM-Controller | Hohe Dichte und niedrige Kosten pro Bit bei großen Kapazitäten | Refresh, Controller-Komplexität, Row/Bank-Timing und Energieverwaltungsaufwand | Hauptspeicher in Anwendungsprozessorsystemen und eingebetteten Systemen mit hoher Kapazität |
| **PSRAM** | Nein | DRAM-ähnlicher Speicher; Refresh und Steuerung übernimmt der Speicherbaustein, das Host-Modell ähnelt SRAM | Erweitert die Arbeitskapazität über den internen SRAM hinaus; kann bei einigen Designs mit niedriger bis mittlerer Bandbreite die Integration vereinfachen und die Leistungsaufnahme des Systems gegenüber einem diskreten DRAM-Subsystem senken | Höhere und weniger vorhersehbare Latenz als der interne SRAM; begrenzte Schnittstellenbandbreite, die mehrere Systemkomponenten gemeinsam nutzen | Framebuffer, große UI-/Audio-/KI-Puffer, dekomprimierte Assets und aktive Arbeitsmengen der Anwendung |
| **RRAM / ReRAM** | Ja | Der Widerstand einer Zelle wird verändert, um Daten darzustellen | Potenziell kompakter nichtflüchtiger eingebetteter Speicher mit niedrigem Standby-Stromverbrauch | Schreibverhalten, Schreibfestigkeit, Datenerhalt, Variabilität und Verfügbarkeit hängen stark von Prozess und Produkt ab | Nichtflüchtige Konfiguration, Code-/Datenspeicherung oder spezialisierte eingebettete Speichernutzung, sofern eine unterstützte Technologie verfügbar ist |
| **MRAM** | Ja | Der magnetische Zustand repräsentiert die Daten | Schneller nichtflüchtiger Zugriff, hohe Schreibfestigkeit und kein Refresh | Kosten, Dichte, Schreibenergie und verfügbare Kapazität variieren je nach MRAM-Generation und Produkt | Persistenter Zustand, Code-/Datenspeicherung oder schnelle nichtflüchtige Arbeitsdaten in unterstützten Geräten |

</div>

Die Tabelle ist qualitativ. „Schneller“, „dichter“ und „stromsparender“ beschreiben allgemeine Tendenzen, reichen aber nicht zur Auswahl eines Bausteins aus. Prozessknoten, Schnittstelle, Temperatur, Zugriffsmuster, Standby-Modus, Gehäuse und Controller-Konfiguration können einen scheinbar offensichtlichen Vergleich umkehren.

### Warum PSRAM zu stromsparenden Produkten passt { #why-psram-fits-low-power-products }

PSRAM zielt oft auf einen anderen Betriebspunkt als herkömmliches diskretes DRAM ab: moderate Kapazität und Bandbreite bei einfacherer Schnittstelle, weniger Controller-Overhead und stromsparenden Betriebszuständen. Bei manchen Wearables, tragbaren und batteriebetriebenen Produkten ohne Bedarf an DRAM-ähnlicher Bandbreite kann diese Kombination den Systemenergiebedarf senken. Das ist keine allgemeine Garantie: Vergleichen Sie die konkreten Speicherbausteine, den Controller, die Betriebszustände und eine repräsentative Arbeitslast im Zielsystem.

Dies ist kein universelles Versprechen pro Byte oder pro Zugriff. Eine aggressiv getaktete PSRAM-Schnittstelle, ein kontinuierlich gescannter Framebuffer oder starker Display-/Audio-/KI-Verkehr können weiterhin das Speicher-Strombudget dominieren. Vergleichen Sie den aktiven, Standby-, Retention- und Aufweckstrom der ausgewählten Geräte bei tatsächlichem Takt, Spannung, Temperatur und Zugriffsmuster — und verwenden Sie Modi wie Half-Sleep, wenn unterstützt und vorteilhaft.

## Aufgabe der einzelnen Speicher im System { #where-each-memory-fits-in-a-system }

Denken Sie in Bezug auf Datenlebensdauer und Zugriffsdringlichkeit:

1. Platzieren Sie Code oder Daten, die **interruptkritisch, häufig genutzt und latenzkritisch** sind, im internen SRAM oder einem anderen dokumentierten Speicher mit niedriger Latenz.
2. Platzieren Sie **große, aktive Arbeitsbereiche** in PSRAM, wenn der Kapazitätsvorteil die Latenz- und Bandbreitenkosten übersteigt.
3. Platzieren Sie **Daten, die einen Stromausfall überleben müssen**, in einer nichtflüchtigen Technologie: üblicherweise NOR-Flash, NAND-Flash, eMMC oder — in Systemen, die es bieten — RRAM oder MRAM.
4. Halten Sie **selten benötigte Ressourcen** im nichtflüchtigen Speicher und verschieben oder dekodieren Sie nur den für den aktuellen Vorgang benötigten Teil.

Eine typische Speicheraufteilung in einem Embedded-System ist:

<div align="center"><em>Diagramm: Typische Speicheraufteilung in einem Embedded-System</em></div>

```text
Persistent firmware image, assets, settings -> Non-volatile storage
Active large buffers and framebuffers -> PSRAM
Hot stacks, control state, DMA data  -> Internal SRAM
```

Dies ist eine Platzierungsrichtlinie, keine Regel, der jeder Puffer folgen muss. Ein kleines, häufig wiederverwendetes Bild gehört möglicherweise in SRAM; ein großes Modell verbleibt möglicherweise in Flash oder PSRAM; ein Display-System benötigt möglicherweise PSRAM, einfach weil ein vollständiger Framebuffer nicht intern passt.

## Die Schnittstellenbandbreite begrenzt die PSRAM-Leistung { #psram-performance-is-an-interface-budget }

Ausreichende PSRAM-Kapazität bedeutet nicht, dass auch die Bandbreite ausreicht. In unterstützten SF32-Konfigurationen greift der Host über OPI oder HPI auf PSRAM zu. CPU, Caches, DMA, Grafik, Display-Ausgabe, Audio, Funk und Speichertransfers können diesen Zugriffspfad gemeinsam nutzen. Bei konkurrierenden Zugriffen sind daher trotz ausreichender Kapazität Ruckeln oder Pufferunterläufe möglich.

### Schnittstellenbreite und Übertragungsrate { #interface-width-and-transfer-rate }

Die Rohdatenrate wird durch Datenleitungsbreite, Transfers pro Takt und den ausgewählten Schnittstellentakt bestimmt:

`payload rate (MB/s) = data lines × transfers per clock × interface clock (MHz) ÷ 8`

Für die folgenden DTR-/DDR-Zeilen werden zwei Transfers pro Takt angenommen; bei den Dual-Channel-Zeilen wird vorausgesetzt, dass beide Kanäle gleichzeitig mit der angegebenen Taktfrequenz arbeiten können. Dies sind Rechenannahmen und keine Bestätigung, dass jeder Chip, jedes Gehäuse, jeder Speicherbaustein oder jede SDK-Konfiguration den jeweiligen Modus oder die Frequenz unterstützt.

<div align="center"><em>Tabelle: Theoretische Payload-Rate für serielle Speicher</em></div>

<div align="center" markdown>

| Schnittstelle und Übertragungsmodus | Nutzdaten-Leitungen | Transfers pro Takt | Nutzdatenrate pro MHz | Repräsentativer Takt zum Vergleich | Theoretische Nutzdatenrate |
|:----------------------------|:------------------:|:--------------------:|:-------------------:|:-----------------------------------:|:------------------------:|
| QSPI / STR | 4 | 1 | 0,5 MB/s | 72 MHz | 36 MB/s |
| QSPI / DTR | 4 | 2 | 1 MB/s | 72 MHz | 72 MB/s |
| OPI / DDR | 8 | 2 | 2 MB/s | 144 MHz | 288 MB/s |
| Dual-Channel OPI / DDR | 2 × 8 = 16 | 2 | 4 MB/s | 144 MHz | 576 MB/s |
| HPI / DDR | 16 | 2 | 4 MB/s | 144 MHz | 576 MB/s |
| Dual-Channel HPI / DDR | 2 × 16 = 32 | 2 | 8 MB/s | 144 MHz | 1 152 MB/s |

</div>

Die Spalte der Datenleitungen zählt Nutzdatensignale, nicht Takt-, Chip-Select- oder andere Steuerpins. Diese Taktfrequenzen sind dokumentierte Beispiele, keine familienweiten Grenzwerte. Der [SF32LB52-DevKit-LCD-Leitfaden](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-LCD.md) nennt OPI-PSRAM mit 144 MHz und QSPI-NOR mit 72 MHz im STR-Modus; der [SF32LB58-DevKit-LCD-Leitfaden](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb58x/SF32LB58-DevKit-LCD.md) nennt HPI-PSRAM mit 144 MHz sowie Entwicklungsboardvarianten mit externem Flash bei 72 MHz. Die QSPI/DTR-Zeile verwendet 72 MHz nur, um den Effekt der Double-Data-Rate-Übertragung isoliert zu zeigen. Die Dual-Channel-Zeilen setzen voraus, dass beide Kanäle gleichzeitig genutzt werden können; sie zeigen die aggregierte Busbreite, garantieren aber nicht die doppelte effektive Rate für einen einzelnen CPU-Stream. Dies sind **Bus-Payload-Obergrenzen**, keine gemessenen Anwendungsdurchsätze. Befehls-/Adresszyklen, Dummy-Zyklen, Refresh, Lese-/Schreib-Umschaltungen, Controller-Grenzen, Cache-Misses, DMA-Arbitrierung, PCB-Signalintegrität und gleichzeitige Clients reduzieren die nutzbare Rate. Der ausgewählte Chip, das Gehäuse, der Speicherbaustein und die SDK-Konfiguration bestimmen, was gültig ist.

Der SiFli-[Chipmodell-Leitfaden](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) nennt als Beispiele für Dual-Channel-Konfigurationen: **SF32LB566VCB36** mit 8 MB OPI-PSRAM an MPI1 und 4 MB an MPI2, **SF32LB586VDD36** mit jeweils 16 MB HPI-PSRAM an beiden Schnittstellen sowie **SF32LB587VEE56** mit jeweils 32 MB HPI-PSRAM. Diese Bestellnummern veranschaulichen die Speichertopologie; sie garantieren nicht, dass ein einzelner Client die aggregierte Payload-Rate aus der Tabelle erreicht. Prüfen Sie vor der Auslegung eines bandbreitenkritischen Designs die vollständige Bestellnummer und das SDK-Speichermapping. Andere Gehäusevarianten oder SKUs derselben Familie können eine andere Speicheranordnung verwenden.

### Warum zwei Speicherkanäle wichtig sind { #why-two-memory-channels-matter }

Der wichtigste Vorteil einer Dual-Channel-Anordnung ist nicht allein ein höherer aggregierter Durchsatz. Wenn die Speicherzuordnung des ausgewählten SF32 und die Display-/Controller-Konfiguration eine unabhängige Platzierung erlauben, kann ein Kanal einem bandbreitenkritischen Client zugewiesen werden, während der andere die übrigen Systemzugriffe übernimmt.

Ein RGB/DPI-Display ist ein gängiges Beispiel. Sein Display-Controller muss den Framebuffer kontinuierlich mit der Pixeltaktrate lesen; verzögerte Zugriffe können Underruns, Bildartefakte oder instabile Bildaktualisierungen verursachen. Liegt der Framebuffer im Speicherbereich eines PSRAM-Kanals und liegen die von CPU, ePicasso oder DMA verwendeten UI-Assets, Audiopuffer und sonstigen Arbeitsdaten im Bereich des anderen Kanals, lassen sich vermeidbare Zugriffskonflikte im Display-Lesepfad reduzieren.

Verwenden Sie dies als Bandbreitenzuweisungsstrategie, nicht als automatisches Versprechen. Überprüfen Sie, dass das ausgewählte Gerät die erforderliche Kanalzuordnung bereitstellt, dass die Framebuffer-Basisadresse auf dem beabsichtigten Kanal liegt und dass der Display-Controller und andere Busmaster die Kanäle unabhängig nutzen können. Messen Sie Scanout-Stabilität, Frame-Zeit und gleichzeitige Audio-/Bluetooth-/CPU-Last; Speicher-Interleaving, eine gemeinsam genutzte Interconnect-Struktur oder ein ungeeignetes Pufferlayout können den erwarteten Vorteil verringern.

### Caches und Ausführung aus externem Speicher { #caches-and-external-memory-execution }

Wenn Code oder Daten in externem DRAM/PSRAM liegen, können **I-Cache** und **D-Cache** wiederholte langsame Zugriffe erheblich reduzieren, sofern das SF32-Gerät die Caches unterstützt, sie aktiviert sind und die betreffenden Bereiche als cachefähig zugeordnet wurden:

- Der **I-Cache** hält kürzlich abgerufene Befehlszeilen nahe der CPU. Code mit Lokalität — wie Schleifen, wiederverwendete Funktionen, RTOS-Pfade oder UI-Code — kann nach dem Befüllen des Caches wiederholte PSRAM- oder NOR-Abrufe vermeiden.
- Der **D-Cache** hält kürzlich gelesene Datenzeilen nahe der CPU. Er hilft bei wiederholten CPU-Lesevorgängen von Tabellen, Assets und Arbeitsdaten, entfernt aber nicht die von einem Einzeldurchlauf-Stream verwendete Bandbreite.
- **Bei nicht kohärentem DMA müssen Pufferbesitz und Cache-Wartung explizit verwaltet werden.** Bei cachefähigen Puffern ohne hardwareseitige Kohärenzgarantie müssen CPU-Schreibzugriffe vor dem Lesen durch DMA oder Peripherie aus dem Cache zurückgeschrieben werden. Bereiten Sie den Empfangspuffer vor einem DMA-Schreibzugriff nach den Plattformvorgaben vor, damit später zurückgeschriebene Dirty-Cache-Lines die empfangenen Daten nicht überschreiben. Invalidieren Sie nach Abschluss der Übertragung veraltete Cache-Lines, bevor die CPU das Ergebnis liest. Solange DMA den Puffer besitzt, darf die CPU nicht darauf zugreifen.

Legen Sie DMA-Puffer auf vollständigen Cache-Line-Grenzen an, ohne die Cache-Lines mit unabhängigen Daten zu teilen. Das Invalidieren einer gemeinsam genutzten Dirty-Line kann Änderungen anderer Variablen verwerfen. Ihr Zurückschreiben nach einem DMA-Schreibzugriff kann neue Daten überschreiben. Verwenden Sie die APIs des gewählten SDK oder RTOS und beachten Sie dessen Cache-Line-Größe, Abschlussprüfungen und erforderliche Speicherbarrieren. Übernehmen Sie Cache-APIs oder Ausrichtungswerte anderer Prozessoren nicht ungeprüft. Nicht cachefähige oder hardwarekohärente Puffer unterliegen den jeweiligen Synchronisationsregeln der Plattform.

Cache ist daher eine Lokalitätsoptimierung, kein Ersatz für ein Bandbreitenbudget. Ein Streaming-Framebuffer-Scanout oder ein einmaliger Puffertransfer kann die PSRAM-Schnittstelle dennoch nahezu mit der erforderlichen Datenrate belegen.

### Code beim Start in PSRAM kopieren und dort ausführen (Non-XIP) { #boot-copy-and-execute-in-place-from-psram }

Die SiFli-Startablauf-Dokumentation für SF32LB52x und SF32LB58x beschreibt Konfigurationen, in denen eine auf externem NAND-Flash gespeicherte Anwendung zur Ausführung in den PSRAM kopiert wird; beide Dokumente nennen auch eine Option mit externem SD-Flash über SDIO. SiFli bezeichnet dies als **Non-XIP**: Bei XIP wird Code direkt von einer NOR-Flash-Adresse ausgeführt, sodass Speicher- und Ausführungsadresse übereinstimmen. Bei Non-XIP wird Code aus dem Flash in den RAM kopiert, daher unterscheiden sich die Adressen. Siehe den [Startablauf für SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_development/startup_flow.html) und den [Startablauf für SF32LB58x (chinesisch)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_development/startup_flow.html). Dies sind dokumentierte Konfigurationen, keine Garantie für jedes Entwicklungsboard. Prüfen Sie das unterstützte Bootmedium, das Speichermapping, die Linker-/Partitionskonfiguration und das SDK des Zielgeräts. Das Ausführen ausgewählter Abschnitte aus PSRAM kann knappen On-Chip-SRAM für andere Zwecke freihalten, garantiert aber keine höhere Ausführungsgeschwindigkeit. Messen Sie repräsentative Workloads mit den tatsächlichen Cache-Einstellungen und Speicherzugriffskonflikten.

In repräsentativen SiFli-Konfigurationen hat 72-MHz-QSPI/STR-NOR eine Rohdaten-Obergrenze von 36 MB/s, während 144-MHz-OPI/DDR- und HPI/DDR-PSRAM 288 MB/s bzw. 576 MB/s erreichen; die Dual-Channel-Varianten erreichen aggregiert 576 MB/s und 1 152 MB/s. Diese Werte sind Obergrenzen für die Nutzdatenrate der Schnittstelle, keine Ergebnisse zur Anwendungsleistung. In einer unterstützten Konfiguration kann die höhere PSRAM-Bandbreite mehr Spielraum für Befehlsabrufe bieten, belegt aber nicht, dass die Ausführung aus PSRAM schneller ist. Das Ergebnis hängt von Speicherbaustein-Latenz, Code-Lokalität, Cache-Konfiguration, PSRAM-Konflikten und davon ab, ob die Anwendung CPU-, Cache- oder Bandbreiten-limitiert ist. Messen Sie Boot-Zeit, Cache-Miss-Verhalten und repräsentative Arbeitslasten, statt die Anwendungsleistung aus dem Verhältnis der Rohdatenraten abzuleiten.

Validieren Sie für ein PSRAM-intensives Design diese Fragen auf der Zielhardware:

- Welche Komponenten lesen oder schreiben im Nutzungsszenario mit der höchsten Last gleichzeitig auf PSRAM?
- Wird der Puffer sequenziell, in Bursts, zufällig oder wiederholt von der CPU gelesen?
- Reduziert das Cache-Verhalten wiederholte Zugriffe, und sind die Cache-Wartungsschritte rund um DMA korrekt?
- Kann ein Framebuffer partielle Aktualisierungen, kleinere Zeichenpuffer oder Kompression anstelle einer größeren vollständigen Framebuffer-Zuweisung verwenden?
- Was passiert, wenn Display-Refresh, Bluetooth-Audio und Anwendungsarbeit gleichzeitig auftreten?
- Erfüllt das Standby- oder Schlafverhalten des ausgewählten PSRAM die Anforderungen an Datenerhalt und Akkulaufzeit?

Messen Sie Frame-Zeit, Pufferunterläufe, CPU-Stalls, Strom und Wiederherstellungsverhalten. Leiten Sie die Systemleistung nicht allein aus PSRAM-Kapazität oder Schnittstellenbreite ab.

## Half-Sleep bei unterstützten AP-Memory-PSRAMs { #half-sleep-on-applicable-ap-memory-psram }

Einige AP-Memory-PSRAM-Bauteile bieten den **Half-Sleep**-Modus: einen ultra-stromsparenden Zustand, der die gespeicherten Daten behält. Er ist nützlich, wenn ein großer Puffer gültig bleiben muss, während das System die PSRAM-Aktivität pausiert, das Produkt es sich aber nicht leisten kann, den Puffer nach jedem Leerlaufintervall aus Flash neu zu befüllen oder neu zu berechnen.

Half-Sleep ist ein **gerätespezifischer Energiesparmodus**, kein generisches PSRAM-Feature. Das [AP Memory APS6408L-OBMx DDR OPI Xccela PSRAM-Datenblatt](https://www.apmemory.com/wp-content/uploads/APS6408L-OBM-BA.pdf) dokumentiert eine Implementierung dieses Modus. Ein-/Austritts-Timing, Mode-Register-Kodierung, zulässiges Taktverhalten, Strom, Temperaturgrenzen und Retention-Garantien sind **nicht auf andere** PSRAM-Familien oder -Revisionen übertragbar. Verwenden Sie das genaue Datenblatt und prüfen Sie die SDK-Unterstützung für das verbaute Bauteil.

### Relative Stromersparnis { #relative-power-saving }

Die folgenden Vergleiche verwenden das AP-Memory-Datenblatt Rev. 3.7, das auf der [Website des Herstellers](https://www.apmemory.com/wp-content/uploads/APS6408L-OBM-BA.pdf) verfügbar ist. Prüfen Sie Revision und verbauten Baustein, bevor Sie die Grenzwerte übernehmen.

Für dasselbe APS6408L-OBMx-Referenzteil, bei dem **das gesamte Speicherarray seine Daten behält**, veröffentlicht AP Memory die folgenden typischen mittleren Standby- und Half-Sleep-Ströme. Bei gleicher Versorgungsspannung entspricht die relative Stromreduktion auch der relativen Verringerung der PSRAM-Leistungsaufnahme.

<div align="center"><em>Tabelle: Half-Sleep-Einsparung des APS6408L-OBMx bei vollständigem Datenerhalt im Speicherarray</em></div>

<div align="center" markdown>

| Temperatur | Standard-Standby-Strom | Half-Sleep-Strom | Relative Reduktion |
|:------------|:------------------------:|:------------------:|:------------------:|
| 25 °C | 66 µA | 20 µA | etwa 70 % |
| 85 °C | 190 µA | 120 µA | etwa 37 % |

</div>

Bei 25 °C nutzt Half-Sleep daher etwa **30 % des Standard-Standby-Stroms des Referenzteils**, während das gesamte Speicherarray seine Daten behält. Die Ersparnis ist bei 85 °C geringer, da der Retention-Strom mit der Temperatur steigt. Diese Zahlen vergleichen zwei Leerlauf-/Retention-Zustände und sind typische Werte, keine Design-Garantien; sie vergleichen nicht Half-Sleep mit aktivem Lese-/Schreibstrom. Einstellungen für partiellen Array-Refresh können den Strom weiter ändern, behalten aber möglicherweise nicht jeden Speicherbereich; verwenden Sie sie nur, wenn die Datenretentionsrichtlinie dies erlaubt.

### Design-Regeln für Half-Sleep { #design-rules-for-half-sleep }

Verwechseln Sie die 150 ms für die Stromgarantie nicht mit den 150 µs Mindestdauer von Half-Sleep und der Austrittszeit von 150 µs in Tabelle 30 dieser Revision. Trotz niedrigem Durchschnittsstrom können beim Refresh Stromspitzen auftreten; prüfen Sie daher das Verhalten von Regler und Entkopplung. Anders als Half-Sleep verliert Deep Power Down den Speicherinhalt und setzt beim Austritt die Modusregister zurück.

Die Anmerkungen zu den Stromtabellen des Referenzdatenblatts gelten für einen 64-Mb-Baustein ohne Taktflanken. Die Slow-Refresh-Werte bei 25 °C erfordern aktivierte Slow Refresh Frequency. Für VDD und VDDQ ist ein Bereich von 1,62 bis 1,98 V spezifiziert. Der spezifizierte Half-Sleep-Strom wird erst nach 150 ms in diesem Modus garantiert; die typischen Tabellenwerte werden dadurch nicht zu garantierten Grenzwerten. Messen Sie bei kürzeren Ruhephasen den gesamten Stromverlauf während Eintritt, Datenerhalt und Austritt, statt den eingeschwungenen Strom für das ganze Intervall anzusetzen.

- Aktivieren Sie Half-Sleep erst, nachdem alle CPU-, DMA-, Display-, Audio-, Wireless- und Speicher-Clients den Zugriff auf den PSRAM-Bereich beendet haben. Eine Transaktion während des Eintritts oder im Schlafmodus kann die Übertragung stören oder den Baustein unerwartet aufwecken.
- Behandeln Sie den Austritt als geplante Aufwachkosten. Die Firmware muss das angegebene Austritts-Timing abwarten, bevor Code, DMA oder ein Peripherie-Controller wieder auf PSRAM zugreift.
- Halten Sie die PSRAM-Versorgung und die für das ausgewählte Gerät erforderlichen Signale innerhalb seiner Retention-Spezifikation. Half-Sleep behält Daten nur, solange seine dokumentierten Stromversorgungsbedingungen erfüllt sind; es ist kein Ersatz für nichtflüchtigen Speicher.
- Messen Sie den vollständigen Systemzustand, nicht nur den PSRAM-Strom. Ersparnisse können verloren gehen, wenn CPU, Display, Schnittstellentakt oder ein anderes Subsystem aktiv bleiben.

Bei kurzen Leerlaufintervallen kann der Ein-/Austritts-Overhead die Ersparnis übersteigen. Bei längeren Pausen kann das Beibehalten eines Framebuffers, dekodierten Assets oder Modellpuffers in Half-Sleep teures Neuladen oder Neuaufbauen vermeiden. Messen Sie auf dem Entwicklungsboard des Zielsystems die Energie für aktiven Betrieb, Half-Sleep und Aufwachen. Bestimmen Sie daraus, ab welcher Leerlaufdauer netto Energie eingespart wird.

## PSRAM in SF32-Designs { #psram-in-sf32-designs }

SF32-Speicherkonfigurationen sind SKU-, Gehäuse- und modulabhängig. Die SiFli-Moduldokumentation listet OPI-PSRAM- und HPI-PSRAM-Optionen über die gesamte SF32LB5x-Modulreihe auf; sie zeigt auch, dass Kapazität und Topologie je nach Modulcode variieren. Bei einigen Konfigurationen ist der PSRAM im selben Gehäuse integriert, während andere Produkte eine externe Speicherschnittstelle bereitstellen. Weder ein SF32-Familienname noch eine externe Speicherschnittstelle belegt, dass jede Variante PSRAM enthält.

Verwenden Sie die genaue Produktseite und den Designleitfaden, um Kapazität, Schnittstelle, Gehäusebeschränkungen, Routing-Anforderungen und Einschränkungen bei gleichzeitiger Peripherienutzung zu bestätigen. Typische Einsatzbereiche des PSRAM in Anwendungen sind:

- **Grafik:** Verwenden Sie PSRAM für große Framebuffer, Zeichenpuffer, Bilder oder Schriftarten, wenn SRAM nicht ausreicht. Die [Grafikübersicht](../graphics/overview.md) erklärt den Render-to-Display-Ablauf und die PSRAM-Bandbreitenkonsequenzen.
- **Audio und Bluetooth:** Verwenden Sie es für größere Warteschlangen oder Assets nur nach dem Testen von gleichzeitigem Verkehr; latenzsensitive Kontrollstrukturen sollten in geeignetem Speicher mit niedriger Latenz bleiben.
- **KI:** Nutzen Sie PSRAM bei Bedarf für große Modellgewichte oder Tensoren. Häufig genutzte oder latenzkritische Puffer gehören in einen laut Dokumentation geeigneten Speicherbereich.
- **Kompression:** [eZip](../graphics/ezip.md) kann die Größe gespeicherter Assets und den Datenverkehr vor der Dekodierung reduzieren. Auf unterstützten SF32LB55x-, SF32LB56x- und SF32LB58x-Geräten senkt [TurboPixel](../graphics/turbopixel.md) durch verlustbehaftete Kompression mit festem Verhältnis den PSRAM-Kapazitätsbedarf und die Speicherbandbreite für den endgültigen Framebuffer; es ist kein Asset-Speicherformat.

## Praktische Auswahlregeln { #practical-selection-rules }

Wählen Sie PSRAM, wenn das Problem Kapazität ist und die Arbeitslast die Latenz- und Bandbreitengrenzen des ausgewählten Speicherpfads tolerieren kann. Bevorzugen Sie mehr internen SRAM — oder gestalten Sie die Pufferung neu — wenn das Problem deterministische Latenz, häufige kleine zufällige Zugriffe oder ein zeitkritischer DMA-/Kontrollpfad ist. Wählen Sie nichtflüchtigen Speicher, wenn Daten einen Stromausfall überleben müssen; wählen Sie RRAM oder MRAM nur, wenn das genaue SoC- oder Speicherprodukt deren Verfügbarkeit und Betriebsgrenzen dokumentiert.

Eine robuste Architektur nutzt mehrere Speicherstufen gezielt: nichtflüchtigen Speicher für dauerhafte Daten, PSRAM für große aktive Datenmengen und SRAM für Aufgaben, die schnell und vorhersehbar ausgeführt werden müssen.
