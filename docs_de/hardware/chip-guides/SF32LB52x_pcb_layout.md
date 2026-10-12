---
icon: lucide/layers
hide:
    - navigation
description: "PCB-Layout-Richtlinien für den MCU SF32LB52x: Footprint, Stack-up, Fanout, Takt-/RF-/Audio-/USB-/SDIO-Routing, DC-DC- und Power-Routing, EMI/ESD sowie weitere Layout-Hinweise."
tags:
    - Hardware
    - Chip
---

# SF32LB52x Hardware-Design-Leitfaden — PCB-Layout-Richtlinien { #sf32lb52x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Teil des SF32LB52x Hardware-Design-Leitfadens"
    Diese Seite behandelt Abschnitt 6 mit den PCB-Layout-Richtlinien. Kehren Sie zu den [Schaltplan-Designrichtlinien](SF32LB52x_schematic_design.md) (der ersten von drei Seiten) zurück, lesen Sie die [PCB-Layout-Checkliste](SF32LB52x_pcb_layout_checklist.md) oder gehen Sie direkt zur [Design-Review-Checkliste mit Referenzen](SF32LB52x_review_and_reference.md).

## 6. PCB-Layout-Richtlinien { #6-pcb-layout-guidelines }

Nutzen Sie dieses Kapitel zusammen mit Abschnitt 5 zur Prüfung des PCB-Layouts. Vor der endgültigen Platzierung sollte der Schaltplan bereits Variante, Stromversorgungsbaum, Taktbauteile, RF-Reserve, Display-/Speicherpins und den Zugang zu Testpunkten festlegen.

**Design-Ziel**

Setzen Sie den Schaltplan in eine fertigungsgerechte, vierlagige Leiterplatte mit durchkontaktierten Bohrungen (PTH) um. Schützen Sie dabei die empfindlichen RF-, Quarz-, Audio-, USB- und SDIO-Signalwege sowie die Versorgungsleitungen vor Impedanz-, Stör- und Rückstromproblemen.

**PCB-Review-Ablauf**

1. Gehäuse-Footprint sowie Lotpasten- und Lötflächenanordnung prüfen.
2. Stack-up, Leiterbahn-/Abstandsregeln, Bohrungen und Impedanzvorgaben mit dem PCB-Hersteller abstimmen.
3. Chip, Quarze, RF-Pfad, DC/DC, Lader, Display-/Speicheranschlüsse und Audiobauteile platzieren.
4. Fanout und empfindliche Signalführung prüfen, bevor GPIO-Leiterbahnen mit niedrigerer Priorität vervollständigt werden.
5. Screenshots zur Dokumentation des Layouts von RF, Quarzen, USB, SDIO, Audio, DC/DC, Ladeschaltung und Versorgungsschienen speichern.

### 6.1. PCB-Footprint-Design { #61-pcb-footprint-design }

Das QFN68L-Gehäuse des SF32LB52x misst 7 mm x 7 mm x 0,85 mm, hat 68 Pins und ein Rastermaß von 0,35 mm.

Die Gehäusezeichnung gibt eine nominale Gesamthöhe von 0,85 mm mit einem Bereich von 0,8–0,9 mm an. Der Abstand zur Platine beträgt nominal 0,02 mm, maximal 0,05 mm. Prüfen Sie Montage- und Gehäusefreiräume anhand der Detailzeichnung, nicht nur anhand der gerundeten Maßangaben.

![Abbildung 6.1-1: QFN68L-Gehäuseabmessungen](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.1-1: QFN68L-Gehäuseabmessungen</em></div>

![Abbildung 6.1-2: QFN68L-Gehäuseform](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.1-2: QFN68L-Gehäuseform</em></div>

![Abbildung 6.1-3: Referenz-Lötflächenanordnung für QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.1-3: Referenz-Lötflächenanordnung für QFN68L</em></div>

Abbildung 6.1-3 gibt Anschlussflächen von 0,2 mm x 0,55 mm, einen Abstand von 0,35 mm, Lötstoppöffnungen von 0,3 mm x 0,65 mm und Lotpastenöffnungen von 0,2 mm x 0,55 mm vor. Dies sind Referenzmaße; prüfen Sie vor der Freigabe die Anforderungen des Bestückungsprozesses.

Die Gehäusezeichnung gibt für die freiliegende Anschlussfläche ein Nennmaß von 5,49 mm x 5,49 mm an. Im Fanout-Beispiel ist die zentrale Fläche mit GND verbunden; sie ist also kein rein mechanisches, elektrisch ungenutztes Element.

### 6.2. PCB-Stack-up { #62-pcb-stack-up }

Das Referenzdesign unterstützt einseitige und doppelseitige Bestückung. Alle Bauteile können auf einer Seite liegen; alternativ lassen sich Kondensatoren und ähnliche passive Bauteile auf der Rückseite unter dem Chip platzieren. Empfohlen wird ein 4-Lagen-Aufbau mit durchgehenden metallisierten Bohrungen (PTH).

![Abbildung 6.2-1: Referenz-Stack-up-Struktur](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.2-1: Referenz-Stack-up-Struktur</em></div>

Abbildung 6.2-1 zeigt einen Referenzlagenaufbau mit 0,8 mm ±10 % einschließlich Galvanisierung und Lötstoppmaske. Die berechnete Gesamtdicke beträgt 0,79553 mm. Stimmen Sie die tatsächliche Fertigdicke und den dielektrischen Aufbau mit dem PCB-Hersteller ab; dieses Beispiel ist kein universell gültiger Lagenaufbau.

<div align="center"><em>Tabelle 6.2-1: Werte des Referenzlagenaufbaus</em></div>

<div align="center" markdown>

| Lage | Material | Dicke (mil) | Dicke (mm) | Dk | Df |
|:---|:---|---:|---:|---:|---:|
| Obere Lötstoppmaske | Lötstoppmaske | 1 | 0,0254 | 3,5 | 0,8 |
| L1 | Kupfer + Galvanisierung | 1,81 | 0,045974 | — | — |
| L1–L2-Dielektrikum | 1080 (66 %) x3 Prepreg | 8,5 | 0,2159 | 3,8 | 0,019 |
| L2 | Kupfer + Galvanisierung | 1,4 | 0,03556 | — | — |
| L2–L3-Dielektrikum | Kern | 5,9 | 0,14986 | 4 | 0,017 |
| L3 | Kupfer + Galvanisierung | 1,4 | 0,03556 | — | — |
| L3–L4-Dielektrikum | 1080 (66 %) x3 Prepreg | 8,5 | 0,2159 | 3,8 | 0,019 |
| L4 | Kupfer + Galvanisierung | 1,81 | 0,045974 | — | — |
| Untere Lötstoppmaske | Lötstoppmaske | 1 | 0,0254 | 3,5 | 0,8 |

</div>

Die Prepreg-Zeilen setzen einen Kupferflächenanteil von 70 % voraus. Dk und Df sind aus der Abbildung übernommen, einschließlich Df 0,8 für die Lötstoppmaske; dies sind keine verifizierten universellen Materialkennwerte. Verwenden Sie für Impedanz- und Verlustberechnungen die tatsächlichen Herstellerdaten.

### 6.3. Allgemeine PCB-Designregeln { #63-general-pcb-design-rules }

Befolgen Sie die allgemeinen PCB-Designregeln für Leiterplatten mit durchkontaktierten Bohrungen aus dem Referenzdesign.

![Abbildung 6.3-1: Allgemeine PCB-Designregeln](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.3-1: Allgemeine PCB-Designregeln</em></div>

Abbildung 6.3-1 verwendet eine minimale und empfohlene Leiterbahnbreite von 0,1 mm sowie eine maximale Breite von 2,54 mm. Sie unterscheidet Abstände von 0,1 mm für Leiterbahnen, Vias und Pads von Kupferabständen mit 0,127 mm (0,15 mm zwischen Kupferflächen) und gibt einen Abstand zum Platinenrand von 0,25 mm vor. Dies sind CAD-Referenzregeln. Fertigungsgrenzen und impedanzkontrollierte Leiterbahnen sind gesondert zu prüfen.

Die zusätzlichen Regeln in Abbildung 6.3-1 legen jeweils 0,1 mm Abstand zwischen Bohrungen sowie zwischen Bauteilkörpern fest. Für einige Objekte desselben Netzes ist der Abstand mit 0 mm angegeben. Das hebt weder die Abstandsregeln zwischen verschiedenen Netzen noch die Rand- und Kupferregeln auf.

### 6.4. PCB-Leiterbahn-Fanout { #64-pcb-trace-fanout }

Führen Sie alle QFN-Gehäusesignale über die obere Lage heraus (Fanout).

![Abbildung 6.4-1: Referenz für Fanout auf der oberen Lage](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.4-1: Referenz für Fanout auf der oberen Lage</em></div>

### 6.5. Routing der Taktschnittstelle { #65-clock-interface-routing }

Wenden Sie diese Takt-Routing-Regeln auf beide Variantengruppen an:

- Platzieren Sie Quarze innerhalb des Abschirmgehäuses und mehr als 1 mm vom PCB-Rand entfernt. Halten Sie möglichst großen Abstand zu wärmeerzeugenden Bauteilen (PA, Lader, PMU-Schaltungen), idealerweise mehr als 5 mm, damit deren Wärme die Frequenzdrift nicht beeinflusst.
- Halten Sie um den Quarz einen Freiraum von mehr als 0,25 mm ein, in dem sich weder anderes Metall noch Bauteile befinden.
- Verlegen Sie die 48-MHz-Quarzleiterbahnen auf der oberen Lage, mit 3–10 mm Länge, 0,1 mm Breite und vollständiger Masseabschirmung. Halten Sie Abstand zu VBAT/VCC, DC/DC und Hochgeschwindigkeitssignalleitungen. Führen Sie unter dem Quarzbereich weder auf der oberen noch auf der angrenzenden Lage andere Leiterbahnen.
- Verlegen Sie die 32,768-kHz-Quarzleiterbahnen auf der oberen Lage, höchstens 10 mm lang und 0,1 mm breit. Halten Sie zwischen den parallelen 32K_XI- und 32K_XO-Leiterbahnen mindestens 0,15 mm Abstand und schirmen Sie sie mit Masse ab. Führen Sie unter dieser Quarzschaltung weder auf der oberen noch auf der angrenzenden Lage andere Leiterbahnen.

![Abbildung 6.5-1: Quarzplatzierung](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-1: Quarzplatzierung</em></div>

![Abbildung 6.5-2: 48-MHz-Quarz-Schaltplan](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-2: 48-MHz-Quarz-Schaltplan</em></div>

![Abbildung 6.5-3: 48-MHz-Quarz-Routing-Modell](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-3: 48-MHz-Quarz-Routing-Modell</em></div>

![Abbildung 6.5-4: 48-MHz-Quarz-Routing-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-4: 48-MHz-Quarz-Routing-Referenz</em></div>

![Abbildung 6.5-5: 32,768-kHz-Quarz-Schaltplan](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-5: 32,768-kHz-Quarz-Schaltplan</em></div>

![Abbildung 6.5-6: 32,768-kHz-Quarz-Routing-Modell](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-6: 32,768-kHz-Quarz-Routing-Modell</em></div>

![Abbildung 6.5-7: 32,768-kHz-Quarz-Routing-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.5-7: 32,768-kHz-Quarz-Routing-Referenz</em></div>

Abbildungen 6.5-3 und 6.5-6 zeigen für beide Quarze mindestens 0,15 mm Abstand zwischen den parallelen XI/XO-Leiterbahnen. Abbildung 6.5-2 verwendet einen 48-MHz-Quarz mit 8,8 pF Lastkapazität; die externen Lastkondensatoren sind als NF (nicht bestückt) markiert. Abbildung 6.5-5 verwendet einen 32,768-kHz-Quarz mit 7 pF an PA22/PA23, die auch mit PDM_CLK/PDM_DATA multiplexiert sind.

!!! important "Widersprüchliche Quellen zur Kupferfläche unter dem Quarz"
    Der Anwendungshinweis für batteriegespeiste Varianten widerspricht sich bei der Kupferfläche unter dem Quarz: Im Taktabschnitt soll die L2-Massefläche direkt unter dem Quarz entfernt werden; im PCB-Routing-Abschnitt sind dagegen Ebenenaussparungen und Kupferausschnitte auf der oberen und den angrenzenden Lagen untersagt. Das Routing-Modell zeigt eine durchgehende L2-Massefläche. Der separate PCB-Layout-Leitfaden wiederholt das Verbot von Aussparungen. Leiten Sie keine allgemeine L2-Regel ab und entscheiden Sie nicht allein anhand der Lagenzahl. Klären Sie die Ausführung für den gewählten Lagenaufbau vor der Freigabe mit SiFli. Quarz-Freihaltebereich und Bauteilabstände sind getrennt zu prüfen.

### 6.6. Routing der RF-Schnittstelle { #66-rf-interface-routing }

Wenden Sie diese RF-Routing-Regeln auf beide Variantengruppen an:

- Platzieren Sie das RF-Anpassnetzwerk nahe am Chip, nicht an der Antenne
- Platzieren Sie den AVDD_BRF-Filterkondensator nahe am Chip-Pin und verbinden Sie seine Masse-Vias direkt mit der Hauptmasse
- Verlegen Sie RF-Leiterbahnen möglichst auf der oberen Lage und vermeiden Sie leistungsbeeinträchtigende Vias. Die Quelle empfiehlt eine Breite über 10 mil; prüfen Sie, ob der tatsächliche Lagenaufbau 50 Ω ergibt. Schirmen Sie mit Masse ab und vermeiden Sie spitze oder rechtwinklige Richtungswechsel.
- Stellen Sie für die RF-Leiterbahn eine kontrollierte Impedanz von 50 Ω ein und setzen Sie auf beiden Seiten dicht angeordnete Massevias zur Abschirmung.

![Abbildung 6.6-1: Schaltplan des π-Netzwerks und der Stromversorgungsschaltung](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.6-1: Schaltplan des π-Netzwerks und der Stromversorgungsschaltung</em></div>

![Abbildung 6.6-2: PCB-Layout des π-Netzwerks und der Stromversorgungsschaltung](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.6-2: PCB-Layout des π-Netzwerks und der Stromversorgungsschaltung</em></div>

![Abbildung 6.6-3: Schaltplan der RF-Signalschaltung](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.6-3: Schaltplan der RF-Signalschaltung</em></div>

![Abbildung 6.6-4: PCB-Routing des RF-Signals](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.6-4: PCB-Routing des RF-Signals</em></div>

Die RF-Beispiele verwenden einen Serienkondensator mit 15 pF/50 V (C0333), lassen C0318/C0319 unbestückt (NF) und zeigen 0,47 µF zur Filterung von AVDD_BRF. Dies sind Bestückungsbeispiele, keine universellen Vorgaben zur Antennenanpassung.

### 6.7. Routing der Audioschnittstelle { #67-audio-interface-routing }

Wenden Sie diese Audio-Routing-Regeln auf beide Variantengruppen an:

- Platzieren Sie die Filterkondensatoren für AVDD33_AUD, MIC_BIAS und AUD_VREF nahe an den jeweiligen Pins und verbinden Sie ihre Masseanschlüsse zuverlässig mit der Hauptmasse.
- Platzieren Sie die Bauteile für den analogen ADCP-Eingang nahe am Chip-Pin. Halten Sie die Leiterbahnen kurz, schirmen Sie sie vollständig mit Masse ab und halten Sie Abstand zu starken Störquellen.
- Platzieren Sie die Bauteile für den analogen DACP/DACN-Ausgang nahe am Chip-Pin. Führen Sie die Signale als differenzielles Paar mit kurzen Leiterbahnen, parasitärer Kapazität unter 10 pF und vollständiger Masseabschirmung.

![Abbildung 6.7-1: Schaltplan der Audio-Stromversorgungsfilterung](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-1: Schaltplan der Audio-Stromversorgungsfilterung</em></div>

![Abbildung 6.7-2: PCB-Referenzrouting der Audio-Stromversorgungsfilterung](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-2: PCB-Referenzrouting der Audio-Stromversorgungsfilterung</em></div>

![Abbildung 6.7-3: Schaltplan des analogen Audioeingangs](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-3: Schaltplan des analogen Audioeingangs</em></div>

![Abbildung 6.7-4: PCB-Design des analogen Audioeingangs](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-4: PCB-Design des analogen Audioeingangs</em></div>

![Abbildung 6.7-5: Schaltplan des analogen Audioausgangs](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-5: Schaltplan des analogen Audioausgangs</em></div>

![Abbildung 6.7-6: PCB-Design des analogen Audioausgangs](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.7-6: PCB-Design des analogen Audioausgangs</em></div>

Abbildung 6.7-1 zeigt Referenzfilterkondensatoren mit 1 µF/6,3 V für MIC_BIAS, 2,2 µF/10 V für AVDD33_AUD und 1 µF/6,3 V für AUD_VREF. Diese Werte erläutern die abgebildete Schaltung; bestätigen Sie die erforderlichen Werte für das konkrete Design. Halten Sie DACP/DACN zusätzlich zur differentiellen Führung von starken Störquellen fern.

Die Schaltplanrichtlinien der Quelle begrenzen außerdem die DAC-Ausgangsleiterbahnen auf weniger als 2 cm.

### 6.8. Routing der USB-Schnittstelle { #68-usb-interface-routing }

Führen Sie USB DP (PA35) / DN (PA36) zuerst über die Anschlüsse des ESD-Schutzbauteils und anschließend zum Chip. Verbinden Sie dessen Masseanschluss zuverlässig mit der Hauptmasse. Führen Sie das Paar mit einer kontrollierten differenziellen Impedanz von 90 Ω und vollständiger Masseabschirmung.

![Abbildung 6.8-1: USB-Signal-Schaltplan](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.8-1: USB-Signal-Schaltplan</em></div>

![Abbildung 6.8-2: USB-Signal-PCB-Design](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.8-2: USB-Signal-PCB-Design</em></div>

![Abbildung 6.8-3: Referenz für die Bauteilplatzierung des USB-Signals](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.8-3: Referenz für die Bauteilplatzierung des USB-Signals</em></div>

![Abbildung 6.8-4: USB-Signal-Routing-Modell](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.8-4: USB-Signal-Routing-Modell</em></div>

Abbildung 6.8-3 vergleicht die Führung über Schutzbauteil-Pads mit ungeschützten Abzweigen: Kein Abzweig darf den Chip erreichen, ohne die Schutzverbindung zu durchlaufen.

### 6.9. Routing der SDIO-Schnittstelle { #69-sdio-interface-routing }

Verlegen Sie SDIO-Signale als Gruppe zusammen, mit einer Gesamtleiterbahnlänge ≤50 mm und einer Längendifferenz innerhalb der Gruppe ≤6 mm. Sehen Sie für das Taktsignal eine vollständige Masseabschirmung vor und schirmen Sie auch die DATA- und CMD-Signale ab.

![Abbildung 6.9-1: Schaltplan der SDIO-Schnittstellenschaltung](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-1: Schaltplan der SDIO-Schnittstellenschaltung</em></div>

![Abbildung 6.9-2: SDIO-PCB-Routing-Modell](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-2: SDIO-PCB-Routing-Modell</em></div>

Abbildung 6.9-2 zeigt außerdem mindestens 0,15 mm Abstand zwischen CMD und der angrenzenden Masseabschirmung.

Der SDIO-Schaltplan bezeichnet PA11 als MPI2_VDD_EN/SD_VDD_EN. Die höherrangigen OpenSiFli-Anwendungshinweise und der Schaltungsentwurfsleitfaden nennen PA21 zum Schalten der Boot-Speicherversorgung; verwenden Sie daher PA21 als quellenbasierte Entwurfsgrundlage. Ob der PA11-Eintrag des Checklisten-Arbeitsblatts für externen Flash bei batteriegespeisten Varianten eine separate Steuerfunktion bezeichnet, bleibt offen. Ersetzen Sie PA21 nicht ohne Bestätigung durch PA11. Klären Sie das konkrete Netz und die Variante vor der Freigabe mit SiFli; siehe [Speicher und Fertigung](SF32LB52x_schematic_storage_mfg.md#5613-boot-storage-power-control).

### 6.10. Routing der DC/DC-Schaltung { #610-dcdc-circuit-routing }

Platzieren Sie die Leistungsinduktivität und die Filterkondensatoren nahe an den Chip-Pins. Halten Sie die BUCK_LX-Leiterbahn kurz und breit, und halten Sie die BUCK_FB-Rückkopplungsleiterbahn breiter als 0,25 mm. Verbinden Sie alle Massepins der DC/DC-Ausgangsfilterkondensatoren mit mehreren Vias zur Hauptmassefläche. Verlegen Sie im Bereich der Leistungsinduktivität kein Kupfer auf der oberen Lage und halten Sie die angrenzende Lage als vollständige Referenzmasse.

![Abbildung 6.10-1: Schaltplan der wichtigsten DC/DC-Bauteile](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.10-1: Schaltplan der wichtigsten DC/DC-Bauteile</em></div>

![Abbildung 6.10-2: PCB-Layout der wichtigsten DC/DC-Bauteile](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.10-2: PCB-Layout der wichtigsten DC/DC-Bauteile</em></div>

Abbildung 6.10-1 verwendet eine Induktivität von 4,7 µH und einen Ausgangskondensator von 4,7 µF/10 V. PMU_BUCK_VSW und PMU_BUCK_VOUT bezeichnen den Schaltknoten und den Ausgangs-/Rückkopplungsknoten, die in der Pin-Tabelle der Quelle BUCK_LX und BUCK_FB heißen. Halten Sie andere Leiterbahnen aus dem Induktivitätsbereich fern.

### 6.11. Routing der Stromversorgung { #611-power-supply-routing }

=== "SF32LB520/3/5/7 (akkubetrieben)"

    VCC ist der Eingangspin des internen PMU-Moduls. Platzieren Sie den zugehörigen Kondensator nahe am Pin und führen Sie die Leiterbahn mit mindestens 0,4 mm Breite. Platzieren Sie auch die Filterkondensatoren für VDD_VOUT1, VDD_VOUT2, VDD_RET, VDD_RTC, VDD18_VOUT, VDD33_VOUT1, VDD33_VOUT2, AVDD33_AUD und AVDD_BRF nahe an den jeweiligen Pins. Dimensionieren Sie die Leiterbahnbreiten nach dem erforderlichen Eingangsstrom.

    ![Abbildung 6.11-1: VCC-Stromversorgungsrouting (Schaltplan)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 6.11-1: VCC-Stromversorgungsrouting (Schaltplan)</em></div>

    ![Abbildung 6.11-2: VCC-Stromversorgungsrouting (PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 6.11-2: VCC-Stromversorgungsrouting (PCB)</em></div>

    **Routing der Ladeschaltung**

    VBUS und VBAT sind die Eingangs-/Ausgangspins des internen Lademoduls des Chips. Platzieren Sie ihre Filterkondensatoren nahe an den Pins. Da durch die Ladeschleife ein relativ hoher Strom fließt, müssen die Leiterbahnen mindestens 16 mil (etwa 0,41 mm) breit sein. Führen Sie empfindliche Signale nicht parallel dazu. Führen Sie den Ladepfad sternförmig, damit er keine Leiterbahnen mit empfindlichen Schaltungsblöcken teilt. Der Anwendungshinweis rundet diesen Mindestwert auf 0,4 mm.

    ![Abbildung 6.11-3: VBUS- & VBAT-Stromversorgungsrouting (Schaltplan)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 6.11-3: VBUS- & VBAT-Stromversorgungsrouting (Schaltplan)</em></div>

    ![Abbildung 6.11-4: VBUS- & VBAT-Stromversorgungsrouting (PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 6.11-4: VBUS- & VBAT-Stromversorgungsrouting (PCB)</em></div>

    !!! note "Referenzschaltplan der Ladeschaltung"
        Abbildung 6.11-3 zeigt 10 µF/10 V an VBUS und 4,7 µF/10 V an VBAT. Der abgedruckte VBUS-Bereich beträgt 4,3–5,5 V; Electrical Specification-A3 nennt 4,5–5,5 V, und der Anwendungshinweis für akkubetriebene Varianten gibt für den integrierten Lader 4,6–5,5 V an und verlangt bei maximalem Ladestrom mindestens 4,6 V am VBUS-Pin. Die Abbildung dient als Platzierungsreferenz und bestätigt 4,3 V nicht als geprüfte untere Betriebsspannung. Beachten Sie auch den Quellenhinweis in Abschnitt 5.2.

=== "52B/D/E/G/J (extern geregelte Versorgung)"

    PVDD ist der Eingangspin des internen PMU-Moduls des Chips. Platzieren Sie den zugehörigen Kondensator nahe am Pin und führen Sie die Leiterbahn mit mindestens 0,4 mm Breite. Platzieren Sie auch die Filterkondensatoren für AVDD33, VDDIOA, VDD_SIP, AVDD33_AUD und AVDD_BRF nahe an den jeweiligen Pins. Dimensionieren Sie die Leiterbahnbreiten nach dem erforderlichen Eingangsstrom und halten Sie die Leiterbahnen möglichst kurz und breit, um die Versorgungsspannungswelligkeit zu reduzieren und die Systemstabilität zu verbessern.

    ![Abbildung 6.11-5: PVDD-Stromversorgungsrouting](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 6.11-5: PVDD-Stromversorgungsrouting</em></div>

    !!! info "Nicht zutreffend"
        Diese Variante verfügt über keine Lademanagement-Schaltung, sodass kein Routing für eine Ladeschaltung erforderlich ist.

### 6.12. Routing weiterer Schnittstellen { #612-other-interface-routing }

Schirmen Sie GPADC-Eingangsleiterbahnen mit Masse ab und halten Sie Abstand zu anderen möglicherweise störenden Schaltungen, einschließlich Akkustands- und Temperaturerfassung.

### 6.13. EMI & ESD { #613-emi-esd }

Wenden Sie diese EMI- und ESD-Regeln auf beide Variantengruppen an:

- Führen Sie lange störende Takt- und Versorgungsleitungen außerhalb der Abschirmung nicht auf der oberen Lage, sondern auf inneren Lagen.
- Platzieren Sie ESD-Schutzbauteile nahe an den Steckverbinder-Pins und führen Sie Signale zuerst durch das ESD-Bauteil, bevor sie weiterverlaufen
- Verbinden Sie die Massepins der ESD-Bauteile über Vias mit der Hauptmasse. Halten Sie die Masseleiterbahnen kurz und breit, um die Impedanz zu verringern und die ESD-Festigkeit zu verbessern.

### 6.14. Weitere Überlegungen { #614-other-considerations }

Platzieren Sie Testpunkte der USB-Ladeleitung auf der Steckverbinderseite vor dem TVS-Schutzanschluss. Der TVS auf der Akkuseite gehört an den Platinenzugang, vor der Verzweigung zu MCU und weiteren Lasten. Führen Sie die Leitung zuerst über den TVS-Anschlusspunkt zum Chip. Der TVS selbst liegt als Parallelableiter gegen Masse, nicht in Reihe mit der Leitung. Halten Sie seine Masseverbindung kurz.

![Abbildung 6.14-1: Referenz für die Platzierung des TVS-Schutzes der Versorgung](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.14-1: Referenz für die Platzierung des TVS-Schutzes der Versorgung</em></div>

![Abbildung 6.14-2: TVS-Routing-Referenz](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.14-2: TVS-Routing-Referenz</em></div>
