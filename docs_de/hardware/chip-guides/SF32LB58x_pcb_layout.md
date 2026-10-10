---
icon: lucide/layers
hide:
    - navigation
description: "PCB-Layout-Richtlinien für die SF32LB58x-MCU: Gehäuse-Footprint, Lagenaufbau, Fanout sowie Leiterbahnführung für Takt, HF, Audio, USB, SDIO, DSI und Stromversorgung."
tags:
    - Hardware
    - Chip
---

# SF32LB58x Hardware-Design-Leitfaden — PCB-Layout-Richtlinien { #sf32lb58x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Teil des SF32LB58x Hardware-Design-Leitfadens"
    Diese Seite behandelt Abschnitt 6, PCB-Layout-Richtlinien. Kehren Sie zu den [Schaltplan-Design-Richtlinien](SF32LB58x_schematic_design.md) zurück, fahren Sie mit der [PCB-Layout-Checkliste](SF32LB58x_pcb_layout_checklist.md) fort, oder springen Sie zur [Design-Review-Checkliste und Referenzen](SF32LB58x_review_and_reference.md).

## 6. PCB-Layout-Richtlinien { #6-pcb-layout-guidelines }

### 6.1. Entwurf des Gehäuse-Footprints { #61-package-footprint-design }

Die SF32LB58x-Serie verwendet ein BGA256-Gehäuse mit den Abmessungen 8,5 mm x 6,5 mm x 0,94 mm, einem Ball-Pitch von 0,4 mm und einem nominalen Balldurchmesser von 0,25 mm. Vollständige Gehäuse-Qualifizierungsdaten finden Sie im offiziellen Datenblatt.

!!! warning "Widersprüchliche Angaben zur Gehäusehöhe"
    Der Fließtext des SiFli-Leitfadens nennt eine Gehäusehöhe von 0,94 mm. In der BGA256-Gehäusezeichnung ist Maß A dagegen mit einem Nennwert von 0,91 mm und einem Bereich von 0,84–1,04 mm angegeben. Diese Quellenwerte widersprechen sich. Wenn die Höhe den mechanischen Freiraum oder die Passung des Gehäuses beeinflusst, legen Sie keinen Wert ohne Rückfrage bei SiFli fest; verwenden Sie die bestätigte Gehäusespezifikation.

![Abbildung 6.1-1: BGA256-Gehäuseabmessungen](../../sf32-products/chips/assets/58x/sf32lb58x-POD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.1-1: BGA256-Gehäuseabmessungen</em></div>

![Abbildung 6.1-2: Form des Gehäuse-Footprints](../../sf32-products/chips/assets/58x/sf32lb58x-DECAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.1-2: Form des Gehäuse-Footprints</em></div>

![Abbildung 6.1-3: Referenz für das PCB-Landmuster](../../sf32-products/chips/assets/58x/sf32lb58x-PAD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.1-3: Referenz für das PCB-Landmuster</em></div>

![Abbildung 6.1-4: Gehäuse-Ball-Map](../../sf32-products/chips/assets/58x/sf32lb58x-BALLMAP-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.1-4: Gehäuse-Ball-Map</em></div>

![Abbildung 6.1-5: Ball-Informationen des Gehäusesubstrats](../../sf32-products/chips/assets/58x/sf32lb58x-BALL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.1-5: Ball-Informationen des Gehäusesubstrats</em></div>

### 6.2. PCB-Lagenaufbau { #62-pcb-stack-up }

Die SF32LB58x-Serie unterstützt die Bestückung auf einer oder auf beiden Platinenseiten. Die Leiterplatte muss in HDI-Technik ausgeführt sein; PTH wird nicht unterstützt. Empfohlen wird das Stack-up 6HDI-2. Die Referenzstruktur in der Abbildung gibt eine fertige Platinendicke von 0,8 mm ±10 % (nominal etwa 32 mil) an.

![Abbildung 6.2-1: Referenz-Stack-up-Struktur](../../sf32-products/chips/assets/58x/sf32lb58x-STACK-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.2-1: Referenz-Stack-up-Struktur</em></div>

### 6.3. Allgemeine PCB-Designregeln { #63-general-pcb-design-rules }

Siehe die Abbildung mit den allgemeinen PCB-Designregeln im offiziellen Datenblatt (Abmessungen in mm). Als Referenz sind eine minimale und empfohlene Leiterbahnbreite von 0,075 mm und eine maximale Breite von 2 mm angegeben; Mindestabstände von 0,075 mm zwischen Leiterbahnen, Vias, Pads, SMD-Bauteilen, Text und Kupferflächen; 0,25 mm Abstand zur Platinenkante sowie 0,1 mm Bohrungsabstand und Abstand zwischen Bauteilkörpern. Stimmen Sie die endgültigen Regeln mit dem Leiterplattenhersteller ab.

![Abbildung 6.3-1: Allgemeine PCB-Designregeln](../../sf32-products/chips/assets/58x/sf32lb58x-RULE-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.3-1: Allgemeine PCB-Designregeln</em></div>

#### 6.3.1. Blind-Via-Design { #631-blind-via-design }

Siehe die Blind-Via-Design-Abbildungen (Lagen 1-2 und 1-3) im offiziellen Datenblatt (Abmessungen in mm). Die dargestellten metallisierten Blind Vias haben einen Durchmesser von 0,23 mm und einen Bohrdurchmesser von 0,10 mm.

![Abbildung 6.3-2: Blind-Via-Design der Lagen 1-2](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.3-2: Blind-Via-Design der Lagen 1-2</em></div>

![Abbildung 6.3-3: Blind-Via-Design der Lagen 1-3](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.3-3: Blind-Via-Design der Lagen 1-3</em></div>

#### 6.3.2. Buried-Via-Design { #632-buried-via-design }

Siehe die Buried-Via-Design-Abbildung (Lagen 2-5) im offiziellen Datenblatt (Abmessungen in mm). Das dargestellte metallisierte Buried Via hat einen Durchmesser von 0,40 mm und einen Bohrdurchmesser von 0,20 mm.

![Abbildung 6.3-4: Buried-Via-Design der Lagen 2-5](../../sf32-products/chips/assets/58x/sf32lb58x-VIA2-5-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.3-4: Buried-Via-Design der Lagen 2-5</em></div>

### 6.4. Leiterbahn-Fanout { #64-trace-fanout }

Die ersten beiden Reihen der BGA-Kugeln werden auf der obersten Lage herausgeführt; die übrigen Kugeln werden über Vias auf Innenlagen geführt.

![Abbildung 6.4-1: Referenz für Fanout auf der obersten Lage](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-T-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.4-1: Referenz für Fanout auf der obersten Lage</em></div>

![Abbildung 6.4-2: Referenz für Fanout auf inneren Lagen](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-I-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.4-2: Referenz für Fanout auf inneren Lagen</em></div>

### 6.5. Leiterbahnführung der Taktschnittstelle { #65-clock-interface-routing }

Platzieren Sie den Quarz innerhalb einer Abschirmhaube, mehr als 1 mm vom Platinenrand entfernt und so weit wie möglich von wärmeerzeugenden Bauteilen wie PA, Ladeschaltung und PMU entfernt. Ein Abstand von mehr als 5 mm ist ideal, damit die Wärme die Frequenzabweichung des Quarzes nicht beeinflusst. Halten Sie im Quarz-Sperrbereich mehr als 0,25 mm Abstand zu anderen Metallteilen und Bauteilen ein.

Führen Sie die 48-MHz-Quarzleitungen auf der obersten Lage. Ihre Länge muss 3 bis 10 mm und ihre Breite 0,075 mm betragen. Sehen Sie eine vollständige 3D-Abschirmung vor und halten Sie die Leitungen von VBAT, DC/DC und Hochgeschwindigkeits-Signalen fern. Lassen Sie sowohl die oberste als auch die darunterliegende Lage unter dem 48-MHz-Quarzbereich frei von anderen Leiterbahnen.

Führen Sie die 32,768-kHz-Quarzleitungen auf der obersten Lage. Die Leiterbahnlänge muss ≤10 mm und die Leiterbahnbreite 0,075 mm betragen; der Abstand zwischen den parallelen Leitungen 32K_XI und 32K_XO muss ≥0,15 mm sein. Sehen Sie eine vollständige 3D-Abschirmung vor. Lassen Sie sowohl die oberste als auch die darunterliegende Lage unter dem Quarzbereich frei von anderen Leiterbahnen.

!!! warning "Lagen der kupferfreien Zone unter dem Quarz mit SiFli abstimmen"
    Der Layoutleitfaden fordert einen Freihaltebereich auf der Oberseite und der direkt darunterliegenden Lage im jeweiligen Quarzbereich. Die Checklisten-Arbeitsmappe fordert bei einer vierlagigen Leiterplatte kupferfreie Zonen auf den Lagen 1, 2 und 3. Die Quellen unterscheiden sich darin, ob Lage 3 einzubeziehen ist. Legen Sie die endgültige Anforderung für Lage 3 nicht selbst fest, sondern klären Sie sie mit SiFli.

![Abbildung 6.5-1: Quarzplatzierung](../../sf32-products/chips/assets/58x/sf32lb58x-CRYSTAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-1: Quarzplatzierung</em></div>

![Abbildung 6.5-2: 48-MHz-Quarz-Schaltplan](../../sf32-products/chips/assets/58x/sf32lb58x-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-2: 48-MHz-Quarz-Schaltplan</em></div>

![Abbildung 6.5-3: 48-MHz-Quarz-Routing-Modell](../../sf32-products/chips/assets/58x/sf32lb58x-48M-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-3: 48-MHz-Quarz-Routing-Modell</em></div>

![Abbildung 6.5-4: 48-MHz-Quarz-Routing-Referenz](../../sf32-products/chips/assets/58x/sf32lb58x-48M-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-4: 48-MHz-Quarz-Routing-Referenz</em></div>

![Abbildung 6.5-5: 32,768-kHz-Quarz-Schaltplan](../../sf32-products/chips/assets/58x/sf32lb58x-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-5: 32,768-kHz-Quarz-Schaltplan</em></div>

![Abbildung 6.5-6: 32,768-kHz-Quarz-Routing-Modell](../../sf32-products/chips/assets/58x/sf32lb58x-32K-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-6: 32,768-kHz-Quarz-Routing-Modell</em></div>

![Abbildung 6.5-7: 32,768-kHz-Quarz-Routing-Referenz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-7: 32,768-kHz-Quarz-Routing-Referenz</em></div>

### 6.6. HF-Leiterbahnführung { #66-rf-interface-routing }

Platzieren Sie die HF-Anpassschaltung so nah wie möglich am Chip, nicht am antennenseitigen Ende. Platzieren Sie den AVDD_BRF-HF-Entkopplungskondensator so nah wie möglich am Chip-Pin, wobei dessen Massepin-Vias direkt auf der Hauptmasseebene landen müssen.

Führen Sie HF-Leiterbahnen nach Möglichkeit auf der obersten Lage, um Vias zu vermeiden, die die HF-Leistung beeinträchtigen können. Die Leiterbahnbreite sollte vorzugsweise mehr als 10 mil betragen. Sehen Sie eine vollständige 3D-Abschirmung vor und vermeiden Sie spitze oder rechte Winkel. Ergänzen Sie auf beiden Seiten der HF-Leiterbahn Abschirmvias für Masse und legen Sie die Impedanz auf 50 Ω aus. Halten Sie DC-DC, VBAT und digitale Hochgeschwindigkeitssignale wie Quarz-, Hochfrequenztakt- sowie I2C-, SPI-, SDIO-, I2S- und UART-Signale vom HF-Routingbereich fern. AVSS_RRF, AVSS_TRF, AVSS_TRF2, AVSS_VCO und AVSS_BB sind Massepins der HF-Schaltung und müssen zuverlässig geerdet werden. Platzieren Sie Blindvias direkt auf den zugehörigen Pads und verbinden Sie sie mit der Hauptmasse.

![Abbildung 6.6-1: Schaltplan des π-Netzwerks und der Stromversorgungsschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.6-1: Schaltplan des π-Netzwerks und der Stromversorgungsschaltung</em></div>

![Abbildung 6.6-2: PCB-Layout des π-Netzwerks und der Stromversorgungsschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.6-2: PCB-Layout des π-Netzwerks und der Stromversorgungsschaltung</em></div>

![Abbildung 6.6-3: Schaltplan der HF-Signalschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.6-3: Schaltplan der HF-Signalschaltung</em></div>

![Abbildung 6.6-4: PCB-Routing des HF-Signals](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.6-4: PCB-Routing des HF-Signals</em></div>

![Abbildung 6.6-5: Schaltplan des HF-Schaltungs-Massesignals](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.6-5: Schaltplan des HF-Schaltungs-Massesignals</em></div>

![Abbildung 6.6-6: PCB des HF-Schaltungs-Massesignals](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.6-6: PCB des HF-Schaltungs-Massesignals</em></div>

### 6.7. Leiterbahnführung der Audioschnittstelle { #67-audio-interface-routing }

Platzieren Sie den AVDD33_AUD-Audioversorgungs-Entkopplungskondensator nah an seinem Pin, wobei dessen Massepin gut mit der Hauptmasse verbunden ist. Platzieren Sie den MIC_BIAS-Mikrofonversorgungs-Entkopplungskondensator nah an seinem Pin, ebenfalls gut geerdet. Platzieren Sie den AUD_VREF-Entkopplungskondensator nah an seinem Pin.

AU_ADC1P/AU_ADC1N und AU_ADC2P/AU_ADC2N sind die beiden analogen Eingangspaare — platzieren Sie zugehörige Bauteile so nah wie möglich an ihren Pins, führen Sie jedes P/N-Paar als Differenzleitung mit möglichst kurzer Leiterbahnlänge, wenden Sie 3D-Abschirmung auf das Differenzpaar an und halten Sie andere stark störende Signale von diesen Leiterbahnen fern.

AU_DAC1P/AU_DAC1N und AU_DAC2P/AU_DAC2N sind die beiden analogen Ausgangspaare — platzieren Sie zugehörige Bauteile so nah wie möglich an ihren Pins, führen Sie jedes P/N-Paar als möglichst kurze Differenzleitung unter 2 mm, mit einer Leiterbahn-Parasitärkapazität unter 10 pF und einer Differenzleiterbahnbreite von 0,075 mm. Wenden Sie 3D-Abschirmung auf das Differenzpaar an und halten Sie andere stark störende Signale von diesen Leiterbahnen fern.

!!! warning "Widersprüchliche Grenzwerte für die DAC-Leiterbahnlänge"
    Der Layoutleitfaden begrenzt die DAC-Leiterbahnlänge auf unter 2 mm; die Checklisten-Arbeitsmappe nennt dagegen unter 2 cm (20 mm). Die Grenzwerte unterscheiden sich um den Faktor zehn. Wählen oder ersetzen Sie keinen Grenzwert ohne Bestätigung durch SiFli.

![Abbildung 6.7-1: Schaltplan der Audio-Stromversorgung](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-1: Schaltplan der Audio-Stromversorgung</em></div>

![Abbildung 6.7-2: PCB-Design der Audio-Stromversorgungsfilterung](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-2: PCB-Design der Audio-Stromversorgungsfilterung</em></div>

![Abbildung 6.7-3: Schaltplan des analogen Audioeingangs](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-3: Schaltplan des analogen Audioeingangs</em></div>

![Abbildung 6.7-4: PCB-Design des analogen Audioeingangs](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-4: PCB-Design des analogen Audioeingangs</em></div>

![Abbildung 6.7-5: Schaltplan des analogen Audioausgangs](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-5: Schaltplan des analogen Audioausgangs</em></div>

![Abbildung 6.7-6: PCB-Design des analogen Audioausgangs](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-6: PCB-Design des analogen Audioausgangs</em></div>

### 6.8. Leiterbahnführung der USB-Schnittstelle { #68-usb-interface-routing }

Platzieren Sie den AVDD33_USB-Entkopplungskondensator nah an seinem Pin und platzieren Sie den USB2_REXT-Kalibrierwiderstand nah an seinem Pin. USB-Leiterbahnen müssen die Pins der ESD-Schutzkomponente durchlaufen, bevor sie den Chip erreichen, wobei der Massepin des ESD-Bauteils gut mit der Hauptmasse verbunden sein muss. Führen Sie USB DP/DN als Differenzpaar mit geregelter 90-Ω-Differenzimpedanz, mit angewendeter 3D-Abschirmung.

![Abbildung 6.8-1: Schaltplan des USB-Signals](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.8-1: Schaltplan des USB-Signals</em></div>

![Abbildung 6.8-2: PCB-Design des USB-Signals](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.8-2: PCB-Design des USB-Signals</em></div>

![Abbildung 6.8-3: Referenz zur Bauteilplatzierung des USB-Signals](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.8-3: Referenz zur Bauteilplatzierung des USB-Signals</em></div>

![Abbildung 6.8-4: Routing-Modell des USB-Signals](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.8-4: Routing-Modell des USB-Signals</em></div>

### 6.9. Leiterbahnführung der SDIO-Schnittstelle { #69-sdio-interface-routing }

Der SF32LB58x bietet zwei SDIO-Schnittstellen: SDIO1 und SDIO2. Führen Sie die Signale jeder Schnittstelle gemeinsam, statt sie aufzuteilen. Die Gesamtleiterbahnlänge muss ≤50 mm betragen; die Längenabweichung zwischen den Signalen einer Gruppe darf ≤6 mm betragen. Schirmen Sie das SDIO-Taktsignal dreidimensional ab und sehen Sie eine Abschirmung auch für DATA und CMD vor.

![Abbildung 6.9-1: SDIO1-Schnittstellenschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-1: SDIO1-Schnittstellenschaltung</em></div>

![Abbildung 6.9-2: SDIO1-PCB-Routing-Modell](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-2: SDIO1-PCB-Routing-Modell</em></div>

### 6.10. Leiterbahnführung der DSI-Schnittstelle { #610-dsi-interface-routing }

Platzieren Sie den AVDD18_DSI-Entkopplungskondensator und den DSI_REXT-Kalibrierwiderstand jeweils nahe am zugehörigen Pin. Führen Sie DSI-Signale als Differenzpaare mit einer kontrollierten differentiellen Impedanz von 100 Ω. Stimmen Sie die Längen von Takt- und Datenleitungen ab: Die Längenabweichung innerhalb eines Differenzpaares darf ≤0,5 mm, die zwischen den Paaren ≤2 mm betragen. Schirmen Sie jedes Differenzpaar dreidimensional ab.

!!! warning "Widersprüchliche DSI-Grenzwerte zwischen Differenzpaaren"
    Der Layoutleitfaden begrenzt den Längenversatz zwischen Paaren auf ≤2 mm und innerhalb eines Paars auf ≤0,5 mm. Die Checklisten-Arbeitsmappe fordert dagegen, dass die DSI-Datendifferenzpaare innerhalb von 200 mil (5,08 mm) auf das Takt-Differenzpaar längenangepasst sind. Die Grenzwerte zwischen Paaren widersprechen sich. Halten Sie den Intra-Paar-Grenzwert davon getrennt und klären Sie den anzuwendenden Grenzwert zwischen Paaren vor Abschluss des Layouts mit SiFli.

![Abbildung 6.10-1: DSI-Signalschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.10-1: DSI-Signalschaltung</em></div>

![Abbildung 6.10-2: PCB-Routing des DSI-Signals](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.10-2: PCB-Routing des DSI-Signals</em></div>

### 6.11. Leiterbahnführung des DC-DC-Wandlers { #611-dc-dc-circuit-routing }

Platzieren Sie die DC-DC-Leistungsdrossel und die Entkopplungskondensatoren nahe an den Chip-Pins. Halten Sie BUCK_LX-Leiterbahnen so kurz und breit wie möglich, um die Schleifeninduktivität des DC-DC-Wandlers zu minimieren. Fügen Sie an den Massepins aller DC-DC-Ausgangsentkopplungskondensatoren zusätzliche Massevias hinzu und verbinden Sie diese mit der Hauptmassefläche. Die BUCK_FB-Rückkopplungsleiterbahn muss >0,25 mm breit sein. Unter der Drossel darf auf der obersten Lage keine Kupferfläche vorhanden sein. Die angrenzende Lage muss als durchgehende Masse-Referenzfläche ausgeführt sein; andere Leiterbahnen dürfen nicht durch den Drosselbereich verlaufen.

![Abbildung 6.11-1: Schaltung der DC-DC-Schlüsselbauteile](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.11-1: Schaltung der DC-DC-Schlüsselbauteile</em></div>

![Abbildung 6.11-2: PCB-Layout der DC-DC-Schlüsselbauteile](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.11-2: PCB-Layout der DC-DC-Schlüsselbauteile</em></div>

### 6.12. Stromversorgungs-Routing { #612-power-supply-routing }

PVDD1 und PVDD2 sind die Stromversorgungseingänge des integrierten PMU-Moduls. Platzieren Sie die Entkopplungskondensatoren nahe an den Pins. Die Leiterbahnen müssen so breit wie möglich sein; ihre Breite muss ≥0,5 mm betragen. PVSS1 und PVSS2 sind Massepins des PMU-Moduls und müssen über Vias mit der Hauptmassefläche verbunden werden. Sie dürfen nicht unbeschaltet bleiben, da dies die Gesamtleistung der PMU beeinträchtigen kann.

![Abbildung 6.12-1: DC-DC-Schaltbild](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.12-1: DC-DC-Schaltbild</em></div>

![Abbildung 6.12-2: DC-DC-PCB-Routing](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.12-2: DC-DC-PCB-Routing</em></div>

### 6.13. Leiterbahnführung der LDO- und I/O-Versorgung { #613-ldo-and-io-power-input-routing }

Platzieren Sie Entkopplungskondensatoren für alle LDO-Ausgänge und IO-Stromversorgungseingänge nah an ihren jeweiligen Pins, mit Leiterbahnbreiten, die den Eingangsstrombedarf erfüllen — halten Sie die Leiterbahnen so kurz und breit wie möglich, um die Restwelligkeit der Stromversorgungsschiene zu reduzieren und die Systemstabilität zu verbessern.

![Abbildung 6.13-1: Referenz für LDO- und IO-Eingangsversorgungs-Routing](../../sf32-products/chips/assets/58x/sf32lb58x-LDOIO-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.13-1: Referenz für LDO- und IO-Eingangsversorgungs-Routing</em></div>

### 6.14. Leiterbahnführung weiterer Schnittstellen { #614-other-interface-routing }

GPADC-Pin-Signalnetze erfordern vollständige 3D-Abschirmung und müssen von anderen Störquellen wie Batteriestandserfassung und Temperaturerfassungsschaltungen ferngehalten werden.

![Abbildung 6.14-1: GPADC-Schaltung](../../sf32-products/chips/assets/58x/sf32lb58x-GPADC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.14-1: GPADC-Schaltung</em></div>

Takteingangs-/-ausgangs-Pin-Signalnetze, wie der 32-kHz-Ausgang, erfordern ebenfalls vollständige 3D-Abschirmung und müssen von anderen Störquellen ferngehalten werden.

![Abbildung 6.14-2: 32-kHz-Taktausgangsschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-32K-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.14-2: 32-kHz-Taktausgangsschaltung</em></div>

### 6.15. Masseführung des Chips { #615-chip-ground-routing }

Das Masse-Netz im mittleren Bereich unter dem SF32LB58x muss durch Leiterbahnen vollständig verbunden sein. Sorgen Sie für eine ausreichend große Massefläche und verbinden Sie diese über Blind- oder Buried Vias mit der Hauptmassefläche.

![Abbildung 6.15-1: Massesignal der obersten Lage unterhalb des Chips](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.15-1: Massesignal der obersten Lage unterhalb des Chips</em></div>

![Abbildung 6.15-2: Massesignal der zweiten Lage unterhalb des Chips](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.15-2: Massesignal der zweiten Lage unterhalb des Chips</em></div>

![Abbildung 6.15-3: Massesignal der dritten Lage unterhalb des Chips](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.15-3: Massesignal der dritten Lage unterhalb des Chips</em></div>

![Abbildung 6.15-4: Massesignal der vierten Lage unterhalb des Chips](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-4-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.15-4: Massesignal der vierten Lage unterhalb des Chips</em></div>

### 6.16. EMI und ESD { #616-emi-esd }

Vermeiden Sie außerhalb der Abschirmhaube lange Leiterbahnen auf der obersten Lage. Takt-, Versorgungs- und andere störungserzeugende Signale müssen auf inneren Lagen geführt werden, nicht auf der obersten Lage. Platzieren Sie ESD-Schutzbauteile nahe an den Steckverbinderpins und führen Sie die Signale zuerst durch das ESD-Bauteil, damit keine Abzweigungen davor entstehen. Verbinden Sie die Massepins des ESD-Bauteils über Vias mit der Hauptmasse. Halten Sie die Masseleiterbahnen an den Pads kurz und breit, um die Impedanz zu senken und die ESD-Wirkung zu verbessern.

### 6.17. Sonstige Überlegungen { #617-other-considerations }

Platzieren Sie Testpunkte der USB-Ladeleitung vor der TVS-Diode. Die TVS-Diode des Batteriehalters muss vor dem Anschluss an die Plattform liegen; führen Sie die Signale so, dass sie die TVS passieren, bevor sie den Chip erreichen. Halten Sie die Leiterbahn vom Massepin der TVS so kurz wie möglich.

!!! note "Der Quelltext definiert den TVS-Bezugspunkt „Plattform“ nicht"
    Der chinesische SiFli-Quelltext verlangt, die TVS-Diode am Batterieanschluss „vor der Plattform“ zu platzieren, definiert aber nicht, welchen Knoten oder Anschlusspunkt „Plattform“ bezeichnet. Klären Sie den Bezugspunkt mit SiFli, statt ihn abzuleiten. Separat fordert die Quelle, dass das Signal vor dem Chip durch die TVS-Diode geführt wird und die Masseleiterbahn der TVS kurz bleibt.

![Abbildung 6.17-1: Referenz zur Platzierung des Stromversorgungs-TVS](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.17-1: Referenz zur Platzierung des Stromversorgungs-TVS</em></div>

![Abbildung 6.17-2: TVS-Routing-Referenz](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.17-2: TVS-Routing-Referenz</em></div>

Damit der Lötstopplack die Pads nicht bedeckt und die Lötverbindungen zuverlässig bleiben, müssen Vias in BGA-Pads mittig unter der jeweiligen BGA-Kugel platziert werden. Eine außermittige Platzierung ist zu vermeiden. Für eine höhere Fertigungsausbeute siehe die Referenzabbildungen zur BGA-Kugelverbindung.

![Abbildung 6.17-3: Referenz zur BGA-Via-Platzierung](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-VIA-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.17-3: Referenz zur BGA-Via-Platzierung</em></div>

![Abbildung 6.17-4: BGA-Ball-Verbindungsreferenz 1](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.17-4: BGA-Ball-Verbindungsreferenz 1</em></div>

![Abbildung 6.17-5: BGA-Ball-Verbindungsreferenz 2](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.17-5: BGA-Ball-Verbindungsreferenz 2</em></div>
