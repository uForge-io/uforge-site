---
icon: lucide/list-checks
hide:
    - navigation
description: "Punkt-für-Punkt-Checkliste für das PCB-Layout des SF32LB57x MCU mit Prüfpunkten zu Gehäuse, Stromversorgungs-, Takt-, RF-, Display-, Audio- und GPADC-Leiterbahnen."
tags:
    - Hardware
    - Chip
    - Checkliste
---

# SF32LB57x Hardware-Design-Leitfaden — PCB-Layout-Checkliste { #sf32lb57x-hardware-design-guide-pcb-layout-checklist }

!!! note "Teil des SF32LB57x Hardware-Design-Leitfadens"
    Diese Seite enthält die einzelnen Prüfpunkte aus Abschnitt 6.10, zusammengestellt auf Basis von SiFlis offiziellen Tabellen zur Design-Selbstprüfung. Zurück zu den [PCB-Layout-Richtlinien](SF32LB57x_pcb_layout.md).

## 6.10. PCB-Layout-Checkliste { #610-pcb-layout-checklist }

Die meisten der folgenden Layoutregeln gelten für alle Varianten der SF32LB57x-Familie. Wenn eine Leitung nur bei einer bestimmten Versorgungsvariante vorhanden ist, grenzt die Spalte „Gilt für“ den Prüfpunkt auf akkubetriebene oder 3,3-V-Versorgungsvarianten ein.

### 6.10.1. Gehäuse { #6101-package }

<div align="center"><em>Tabelle 6.10.1-1: Gehäuse-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Der PCB-Footprint entspricht den Gehäusevorgaben im Datenblatt | Alle Varianten | Erforderlich |

</div>

### 6.10.2. Leiterbahnführung der Stromversorgung { #6102-power-supply-routing }

<div align="center"><em>Tabelle 6.10.2-1: Checkliste für die Leiterbahnführung der Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Leiterbahnbreite der `VBUS`-Versorgungsleitung ≥16 mil | Akkubetriebene Varianten | Erforderlich |
| 2 | Leiterbahnbreite der `VBAT`-Versorgungsleitung ≥16 mil | Akkubetriebene Varianten | Erforderlich |
| 3 | Leiterbahnbreite der `VCC`-Versorgungsleitung ≥12 mil | Akkubetriebene Varianten | Erforderlich |
| 4 | Leiterbahnbreite der `VDD33_VOUT1`-Versorgungsleitung ≥10 mil | Akkubetriebene Varianten | Erforderlich |
| 5 | Leiterbahnbreite der `VDD33_VOUT2`-Versorgungsleitung ≥10 mil (Titel von Quellpunkt 46 wiederholt `VDD33_VOUT1`) | Akkubetriebene Varianten | Erforderlich |
| 6 | Leiterbahnbreite der `PVDD`-Versorgungsleitung ≥12 mil (Prüfdetail von Quellpunkt 47 nennt `VCC`) | 3,3-V-Versorgungsvarianten | Erforderlich |
| 7 | Leiterbahnbreite der `VDDIOA`-Versorgungsleitung ≥10 mil | 3,3-V-Versorgungsvarianten | Erforderlich |
| 8 | Leiterbahnbreite der `BUCK_LX`-/`BUCK_FB`-Leitungen ≥10 mil; die Leitungen sind so kurz wie möglich zu führen | Alle Varianten | Erforderlich |
| 9 | Leiterbahnbreite der `AVDD_BRF`-Versorgungsleitung ≥8 mil | Alle Varianten | Erforderlich |
| 10 | Leiterbahnbreite der `AVDD33_AUD`-Versorgungsleitung ≥8 mil | Alle Varianten | Erforderlich |

</div>

!!! warning "Ungeklärte Konflikte bei Versorgungsnetzen in der Quelle"
    - **Bezeichnungen in der Checkliste:** Punkt 44 der originalen Selbstprüftabelle 4-2-1-1 gilt für akkubetriebene Varianten und verlangt `VCC` >= 12 mil. Die Punkte 45 und 46 verlangen jeweils mindestens 10 mil für `VDD33_VOUT1` beziehungsweise `VDD33_VOUT2`; der Titel von Punkt 46 wiederholt jedoch `VDD33_VOUT1`, während das Prüfdetail `VDD33_VOUT2` nennt. Punkt 47 gilt für 3,3-V-Varianten und trägt den Titel `PVDD`, nennt im Prüfdetail aber `VCC` >= 12 mil. Diese Tabelle übernimmt die aufgeführten Angaben, ohne die Quellenwidersprüche aufzulösen.
    - **Leiterbahnbreite:** Abschnitt 3.2.1 des originalen PCB-Leitfadens verlangt für `VCC` und `PVDD` jeweils mindestens 0,4 mm (ca. 15,7 mil); die Punkte 44 (akkubetriebene Varianten) und 47 (3,3-V-Varianten) der Selbstprüftabelle 4-2-1-1 verlangen `VCC` >= 12 mil. Die Quelle erklärt nicht, wie diese Anforderungen je nach Versorgungsvariante abzugleichen sind oder ob bei Punkt 47 der Titel `PVDD` oder das Prüfdetail `VCC` maßgeblich ist. Keinen korrigierten Wert ableiten und keinen der beiden Einträge ohne Bestätigung als verbindlich anwenden.
    - **Ausgangsbezeichnungen:** Abschnitt 3.2.1 des originalen PCB-Leitfadens verwendet `VDD_VOUT1` / `VDD_VOUT2`, während die Punkte 45/46 der Selbstprüftabelle 4-2-1-1 `VDD33_VOUT1` / `VDD33_VOUT2` nennen. Die Quelle erklärt nicht, ob die Bezeichnungen Aliasnamen oder unterschiedliche Netze sind.
    Vor der Designfreigabe von SiFli die beabsichtigten Bezeichnungen, Ziel-Versorgungsschienen, den Geltungsbereich der Versorgungsvarianten und die Leiterbahnbreiten bestätigen lassen. Ohne diese Bestätigung die widersprüchlichen Checklisten-Bezeichnungen keinen Netzen zuordnen, die Varianten der Ausgangsnamen nicht als gleichwertig behandeln und nicht zwischen 12 mil und 0,4 mm wählen.

### 6.10.3. Takt-Layout { #6103-clock-layout }

<div align="center"><em>Tabelle 6.10.3-1: Takt-Layout-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Quarze sind nahe an den zugehörigen Chipanschlüssen platziert, damit die Leiterbahnen kurz bleiben | Alle Varianten | Erforderlich |
| 2 | Quarz und Oszillatorleitungen sind vollständig mit GND abgeschirmt | Alle Varianten | Erforderlich |
| 3 | Kupferfreie Zone unter dem Quarz: Bei der 4-lagigen PTH-Platine bleibt nur die Top-Lage kupferfrei; bei der 6-lagigen HDI-Platine bleiben sowohl die Top-Lage als auch Lage 2 kupferfrei | Alle Varianten | Erforderlich |
| 4 | Oszillator-Signalleitungen haben zu umgebendem GND-Kupfer einen Abstand von mehr als dem 1,5-fachen der Leitungsbreite | Alle Varianten | Erforderlich |
| 5 | Die parallelen Leitungen des 32,768-kHz-Quarzes haben einen Abstand von mehr als dem 2-fachen der Basisleitungsbreite | Alle Varianten | Erforderlich |

</div>

!!! warning "Ungeklärte Konflikte in den Quarz-Layoutvorgaben der Quelle"
    - **Masseabschirmung und kupferfreie Bereiche:** Abschnitt 3.3 des PCB-Leitfadens verlangt eine durchgehende Referenzmasse im Quarzbereich und eine Kupferfreistellung auf der Top-Lage um den Quarz. Abbildung 3-3-1 (hier als Abbildung 6.9-30 wiedergegeben) nennt mindestens 0,25 mm Abstand um das Gehäuse. Die Punkte 6 und 7 der originalen Selbstprüftabelle 4-3-1 verlangen eine vollständige GND-Abschirmung um Quarz und Oszillatorleitungen beziehungsweise unter dem Quarz kupferfreie Bereiche nur auf TOP bei einer 4-lagigen PTH-Platine und auf TOP sowie Lage 2 bei einer 6-lagigen HDI-Platine. Die Quelle grenzt Abschirm- und Freistellungsbereich nicht voneinander ab und erklärt nicht, wie die Forderung nach durchgehender Masse auf die für den jeweiligen Lagenaufbau kupferfreien Lagen anzuwenden ist. Dieser Konflikt im Geltungsbereich ist ungelöst; das lagenweise Kupfer- oder Massebild darf nicht abgeleitet werden.
    - **Abstand der 32,768-kHz-Leiterbahnen:** Abschnitt 3.3 des PCB-Leitfadens und das Routingmodell in Abbildung 3-3-4 (hier als Abbildung 6.9-33 wiedergegeben) verlangen mindestens 0,15 mm zwischen parallelen `32K_XI`- und `32K_XO`-Leiterbahnen. Punkt 9 der originalen Selbstprüftabelle 4-3-1 fordert einen Abstand von mehr als der doppelten Basis-Leiterbahnbreite, also mehr als 0,2 mm bei der im Leitfaden genannten Breite von 0,1 mm. Die Mindestabstände widersprechen sich.
    - **Geltungsbereich des Gehäuseabstands:** Abbildung 3-3-1 (hier als Abbildung 6.9-30 wiedergegeben) fordert auf der TOP-Lage mindestens 0,25 mm Kupferabstand um das Gehäuse. Punkt 7 der Selbstprüftabelle 4-3-1 legt für zwei Lagenaufbauten separat fest, welche Lagen unter dem Quarz kupferfrei bleiben müssen; die Quelle erklärt jedoch nicht, in welchem Verhältnis der umlaufende 0,25-mm-Abstand zu den Bereichen unter dem Gehäuse oder zu den Routing-Ausschlüssen auf angrenzenden Lagen steht.
    Diese Konflikte und Unklarheiten zum Geltungsbereich sind in SiFlis Quelldokumentation ungelöst. Vor der Layoutfreigabe die Anforderungen für das konkrete Gehäuse und den Lagenaufbau von SiFli bestätigen lassen; weder einen der Leiterbahnabstände auswählen noch lagenbezogene Masse- oder Kupferfreistellungsgrenzen ableiten.

### 6.10.4. RF-Layout { #6104-rf-layout }

<div align="center"><em>Tabelle 6.10.4-1: RF-Layout-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Für jede RF-Leiterbahn ist eine kontrollierte Zielimpedanz von 50 Ω im Single-Ended-Modus vorzusehen | Alle Varianten | Erforderlich |
| 2 | Die Massekupferflächen auf beiden Seiten der RF-Leiterbahn sind mindestens 60 mil breit und über mehrere Durchkontaktierungen mit der Hauptmassefläche verbunden | Alle Varianten | Erforderlich |
| 3 | Das reservierte PI-Anpassnetzwerk ist nahe am RF-Chip-Pin platziert | Alle Varianten | Erforderlich |
| 4 | Eine durchgehende, ununterbrochene GND-Abschirmlage verläuft direkt unter der RF-Signalleitung | Alle Varianten | Erforderlich |
| 5 | Keine Hochgeschwindigkeits-Digitalsignalleitung verläuft direkt unter der RF-Signalleitung | Alle Varianten | Erforderlich |
| 6 | Keine versorgungsbezogene Leiterbahn mit großen Stromschwankungen verläuft direkt unter der RF-Signalleitung | Alle Varianten | Erforderlich |

</div>

### 6.10.5. Display-Leiterbahnführung { #6105-display-routing }

<div align="center"><em>Tabelle 6.10.5-1: Checkliste für Display-Leiterbahnen</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Für die Display-Taktleitung ist ein Serienwiderstand ≤50 Ω vorzusehen. Zusätzlich ist eine unbestückte Lötfläche für einen Shunt-Kondensator zu reservieren, damit bei Bedarf ein RC-Netzwerk zur EMI-Unterdrückung bestückt werden kann | Alle Varianten | Erforderlich |
| 2 | Hochgeschwindigkeits-Display-Signalleitungen sind bevorzugt auf Innenlagen zu führen; Display-Anschluss und FPC-Flachbandkabel müssen vom RF-Antennenbereich ferngehalten werden | Alle Varianten | Erforderlich |

</div>

### 6.10.6. Audio-Leiterbahnführung { #6106-audio-routing }

<div align="center"><em>Tabelle 6.10.6-1: Checkliste für Audio-Leiterbahnen</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Der `ADCP`-Leitungsbereich ist zur Unterdrückung externer elektromagnetischer Störungen mit GND abgeschirmt | Alle Varianten | Erforderlich |
| 2 | `DACP`/`DACN` sind als strikt längenangepasstes Differenzpaar geroutet; der Leitungsbereich ist mit GND abgeschirmt | Alle Varianten | Erforderlich |
| 3 | Die Gesamtleitungslänge von `DACP`/`DACN` ist so kontrolliert, dass die parasitäre Kapazität unter 10 pF bleibt | Alle Varianten | Erforderlich |
| 4 | Die analogen Versorgungsleitungen `AVDD_BRF`/`AVDD33_AUD` sind mit GND abgeschirmt und von hochstromführenden sowie stark störenden Signalleitungen entfernt geroutet | Alle Varianten | Erforderlich |

</div>

### 6.10.7. GPADC-Leiterbahnführung { #6107-gpadc-routing }

<div align="center"><em>Tabelle 6.10.7-1: Checkliste für GPADC-Leiterbahnen</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | GPADC-Analogleitungen sind von parallel verlaufenden Hochgeschwindigkeits-Signalleitungen fernzuhalten. Der Leiterbahnbereich ist mit GND abzuschirmen, damit digitales Rauschen die Abtastgenauigkeit nicht beeinträchtigt | Alle Varianten | Erforderlich |

</div>
