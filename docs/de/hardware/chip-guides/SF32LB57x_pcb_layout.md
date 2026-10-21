---
icon: lucide/layers
hide:
    - navigation
description: "PCB-Layout-Richtlinien für den SF32LB57x-MCU: Lagenaufbau, kritische Randbedingungen, Routing für Versorgung/Quarz/RF/Analog/Audio/High-Speed sowie EMI/ESD/EOS."
tags:
    - Hardware
    - Chip
---

# SF32LB57x Hardware-Design-Leitfaden — PCB-Layout-Richtlinien { #sf32lb57x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Teil des SF32LB57x Hardware-Design-Leitfadens"
    Diese Seite behandelt die PCB-Layout-Richtlinien aus Abschnitt 6. Zurück zu [Speicher und Fertigung](SF32LB57x_schematic_storage_mfg.md) oder weiter zur [Design-Review-Checkliste und den Referenzen](SF32LB57x_review_and_reference.md).

## 6. PCB-Layout-Richtlinien { #6-pcb-layout-guidelines }

### 6.1. Lagenaufbau { #61-stack-up }

Der SF32LB57x ist in den Gehäusen QFN68L (7 x 7 mm, 68 Pins, 0,35-mm-Raster) und QFN80L (8 x 8 mm, 80 Pins, 0,35-mm-Raster) erhältlich. Für QFN-Designs reicht in der Regel eine 4-lagige PTH-Leiterplatte aus. Bauteile können auf einer oder beiden Seiten platziert werden (zum Beispiel Kondensatoren auf der Leiterplattenrückseite).<!-- BGA-ONLY --> Das BGA112-Gehäuse misst 5,4 x 4,4 mm und hat 112 Lötkugeln (Balls) mit 0,4-mm-Raster. BGA-Designs benötigen üblicherweise mindestens 4 Lagen; je nach Schwierigkeit der Ausfächerung kann ein HDI-Aufbau erster Ordnung mit Blind- und Buried-Vias eingesetzt werden. Auch hier ist eine ein- oder beidseitige Bauteilplatzierung möglich.<!-- /BGA-ONLY -->

Ein guter Lagenaufbau bietet:

- Platz für kritische Bauteile und kurze Leitungswege auf der obersten Lage.
- Eine durchgehende innere Massefläche.
- Niederohmige Stromverteilung.
- Durchgehende Referenzmasse für Hochgeschwindigkeits-, RF-, Quarz-, Audio- und Analogleitungen.

Die Referenz-Lagenaufbauten geben folgende Materialien und Gesamtdickenbereiche an. Den endgültigen Lagenaufbau und die Toleranz der fertigen Leiterplattendicke mit dem Leiterplattenhersteller abstimmen.

<div align="center"><em>Tabelle 6.1-1: Materialien und Dicken der QFN-Referenzaufbauten</em></div>

<div align="center" markdown>

| Referenzaufbau | Kern | Prepreg | Gesamtdickenbereich |
|:-----|:-----|:-----|:-----|
| QFN, 1,6 mm | 1,1-mm-H/HOZ-Kupferkern | 7628 RC49 %, Materialangabe 8,6 mil; Dickenangabe 8,28 mil (0,2104 mm) | 1,43–1,74 mm |
| QFN, 0,8 mm | 0,25-mm-H/HOZ-Kern ohne Kupfer | 7628 RC49 %, Materialangabe 8,6 mil; Dickenangabe 8,28 mil (0,2104 mm) | 0,67–0,87 mm |

</div>

!!! warning "Quellkonflikt: QFN-Prepregbezeichnung und Dickenangabe"
    Die QFN-Referenzaufbauabbildungen 3-1-2-1 und 3-1-2-2 des originalen PCB-Leitfadens, hier in Tabelle 6.1-1 übertragen, bezeichnen das Prepreg mit `7628 RC49%, 8.6 mil`; in der Dicken-Spalte stehen dagegen `8.28 mil (0.2104 mm)`. Die Quelle erklärt weder die Abweichung noch, welcher Wert für die Fertigung maßgeblich ist. Ohne Bestätigung durch SiFli weder einen der Werte auswählen noch in einem freigegebenen Lagenaufbau den einen durch den anderen ersetzen.

<!-- BGA-ONLY -->
<div align="center"><em>Tabelle 6.1-2: Materialien und Dicken der BGA-Referenzaufbauten</em></div>

<div align="center" markdown>

| Referenzaufbau | Kern | Prepreg | Gesamtdickenbereich |
|:-----|:-----|:-----|:-----|
| BGA, 1,6 mm | 1,3-mm-H/HOZ-Kupferkern | 1080 RC67 %, Materialangabe 3,3 mil; Dickenangabe 3,01 mil (0,0764 mm) | 1,37–1,67 mm |
| BGA, 0,8 mm | 0,55-mm-H/H-Kern ohne Kupfer | 1080 RC67 %, Materialangabe 3,3 mil; Dickenangabe 3,01 mil (0,0764 mm) | 0,70–0,90 mm |

</div>

!!! warning "Quellkonflikt: BGA-Prepregbezeichnung und Dickenangabe"
    Die BGA-Referenzaufbauabbildungen 3-1-2-3 und 3-1-2-4 des originalen PCB-Leitfadens, hier in Tabelle 6.1-2 übertragen, bezeichnen das Prepreg mit `1080 RC67%, 3.3 mil`; in der Dicken-Spalte stehen dagegen `3.01 mil (0.0764 mm)`. Die Quelle erklärt weder die Abweichung noch, welcher Wert für die Fertigung maßgeblich ist. Ohne Bestätigung durch SiFli weder einen der Werte auswählen noch in einem freigegebenen Lagenaufbau den einen durch den anderen ersetzen.
<!-- /BGA-ONLY -->

Alle vier Referenzaufbauten verwenden 1 oz Kupfer auf L1/L4 (1,38 mil; 0,0350 mm) sowie jeweils 0,60 mil (0,0152 mm) Kupfer auf beiden Seiten von L2/L3.

Für ein 4-lagiges QFN-Design wird folgende Lagenzuordnung empfohlen: Lage 1 (oben) mit durchgehender Massefläche, Bauteilplatzierung und Signalführung; Lage 2 als durchgehende Massefläche ohne Signale, damit die Referenzmasse intakt bleibt; Lage 3 als Versorgungsfläche, die nach Versorgungsdomänen aufgeteilt werden und zusätzlich Signale führen kann; Lage 4 (unten) mit durchgehender Massefläche und Signalführung.

### 6.2. Kurzreferenz kritischer PCB-Randbedingungen { #62-critical-pcb-constraint-quick-reference }

<div align="center"><em>Tabelle 6.2-1: Kurzreferenz kritischer PCB-Randbedingungen</em></div>

<div align="center" markdown>

| Element | Randbedingung / Quellenhinweis | Hinweise |
|:-----|:-----------------------|:------|
| `VBUS` / `VBAT` | Leiterbahnbreite >= 0,4 mm (ca. 16 mil) | Lade- und Akkupfade führen höhere Ströme; kurz und breit halten, entfernt von empfindlichen Leitungen. |
| `VCC` / `PVDD` | Widersprüchliche Quellenwerte: PCB-Leitfaden, Abschnitt 3.2.1, fordert >= 0,4 mm; Selbstprüftabelle 4-2-1-1, Punkt 44 (akkubetriebene Varianten), fordert `VCC` >= 12 mil, während Punkt 47 (3,3-V-Varianten) mit `PVDD` überschrieben ist, im Prüfdetail aber `VCC` >= 12 mil fordert. | Mit SiFli die Zielversorgung, den Variantenumfang und die geltende Breite klären; nicht allein anhand dieser Angaben auswählen. |
| `VDD33_VOUT1` / `VDD33_VOUT2` | Leiterbahnbreite >= 10 mil | Nur bei akkubetriebenen Varianten; Softstart-Strombegrenzung, Einschaltstrom und zulässige Last prüfen. |
| `BUCK_LX` / `BUCK_FB` | `BUCK_LX`: >= 10 mil; `BUCK_FB`: > 0,25 mm | `BUCK_LX` kurz und breit führen; Platzierung und Kupfer-Freihaltebereich siehe Abschnitt 6.3. |
| `AVDD_BRF` / `AVDD33_AUD` | Leiterbahnbreite >= 8 mil | Analog-/RF-/Audioversorgungen sollten kurz, sauber und separat gefiltert sein. |
| USB DP/DN | 90-Ω-Differenzpaar | Zuerst durch ESD routen, Stubs vermeiden und Referenzmasse durchgehend halten. |
| RF-Antennenleitung | 50 Ω unsymmetrisch | Oberste Lage bevorzugen, Durchkontaktierungen minimieren sowie durchgehende Referenzmasse und Abschirmung mit Masse-Durchkontaktierungen vorsehen. |
| Massekupferbreite beidseits der RF-Leitung | >= 60 mil je Seite | Das Massekupfer auf beiden Seiten mit mehreren Durchkontaktierungen an die Hauptmasse anbinden. |
| 48-MHz-Quarzleitungen | Etwa 3 mm bis 10 mm | Oberste Lage bevorzugen, Masseabschirmung und Kupfer-Freihaltebereich unter dem Quarz vorsehen. |
| 32,768-kHz-Quarzleitungen | <= 10 mm | Abstand zwischen den Leitungen einhalten, Abschirmung hinzufügen und Störquellen meiden. |
| Quarzplatzierung | >= 1,5 mm vom Chip-Takt-Pin; > 1 mm vom Leiterplattenrand; >= 5 mm zu Wärmequellen im Bereich der PA, des Ladepfads und des PMU | Gilt sowohl für den 48-MHz- als auch den 32,768-kHz-Quarz. |
| MPI-Bus | Gesamtlänge <= 20 mm, Längenabweichung innerhalb der Gruppe <= 3 mm | Takt-, Daten- und Befehlssignale als Gruppe mit durchgehender Referenzmasse führen. |
| SDIO-Bus | Gesamtlänge <= 50 mm, Längenabweichung innerhalb der Gruppe <= 6 mm | CLK, CMD und DATA als Gruppe über durchgehender Referenzmasse führen. |
| `VDDIOA` | Leiterbahnbreite >= 10 mil | Nur 3,3-V-Versorgungsvarianten. |

</div>

Die PTH- und HDI-Designregelabbildungen zeigen auch beispielhafte Fertigungswerte: Die minimale und empfohlene Leiterbahnbreite beträgt 0,10 mm für PTH und 0,075 mm für HDI, die maximale Breite jeweils 2,54 mm. Die Via-Beispiele zeigen für PTH eine Bohrung von 0,25 mm mit einem Pad von 0,45 mm und für ein HDI-Microvia eine Bohrung von 0,10 mm mit einem Pad von 0,23 mm (das Durchkontaktierungsbeispiel beträgt 0,25 mm/0,45 mm). Diese Werte sind Referenzaufbauten; vor der Freigabe die Fertigungsmöglichkeiten und konkreten Regeln des Leiterplattenherstellers bestätigen.

### 6.3. Stromversorgungs-Layout { #63-power-layout }

- Hochstrom-Versorgungspfade kurz und breit halten.
- Ladepfade von empfindlichen Analog-, RF- und Quarzleitungen fernhalten.
- Filterkondensatoren für VCC, PVDD, VBUS und VBAT nahe an den Chip-Pins platzieren. Abschnitt 3.2.1 des PCB-Leitfadens nennt für `VCC` / `PVDD` mindestens 0,4 mm, während Punkt 47 der Selbstprüftabelle 4-2-1-1 einen widersprüchlichen Wert von 12 mil angibt (Titel `PVDD`, Prüfdetail `VCC`); die Leiterbahnbreite keiner der beiden Versorgungen festlegen, bis SiFli die geltende Vorgabe bestätigt hat. Auch die Filterkondensatoren weiterer Ausgänge wie VDD_VOUT1, VDD_VOUT2, VDD_RET, VDD_RTC, VDD18_VOUT, VDD33_VOUT1, VDD33_VOUT2, AVDD33_AUD und AVDD_BRF nahe an den Pins platzieren. Die Leiterbahnbreite dieser Ausgänge nach dem Eingangsstrom dimensionieren und die Pfade kurz und breit halten, um Versorgungswelligkeit zu verringern und die Stabilität zu verbessern.
- Wenn PVDD, AVDD_BRF, AVDD33 oder AVDD33_AUD dieselbe Versorgung nutzen, die Zweige sternförmig und separat an der Quelle abzweigen; kein gemeinsames vorgelagertes Leiterbahnsegment verwenden.
- VBUS und VBAT als unabhängige Sternzweige ohne gemeinsam genutzte Pfade führen. Empfindliche Signale nicht parallel zu diesen Ladepfaden verlegen.
- BUCK-Induktivität und Filterkondensatoren nahe an den Chip-Pins platzieren. BUCK_LX kurz und breit führen; die Leiterbahn zu BUCK_FB breiter als 0,25 mm auslegen. Die Masseanschlüsse der DC/DC-Ausgangskondensatoren mit mehreren Masse-Durchkontaktierungen an die Hauptmassefläche anbinden. Unter der Induktivität auf der obersten Lage kein Kupfer vorsehen, auf der angrenzenden Lage eine durchgehende Referenzfläche erhalten und keine anderen Signale durch den Induktivitätsbereich führen.
- Kondensatormassen über nahegelegene Durchkontaktierungen an die Hauptmasse anbinden.
- Für zentrale Analog-/RF-/I/O-Versorgungsschienen bei 3,3-V-Varianten eine sternförmige Leitungsführung verwenden.

!!! warning "Ungeklärte Konflikte bei Versorgungsnetzen in der Quelle"
    - **Leiterbahnbreite und Netzbezeichnung:** Abschnitt 3.2.1 des originalen PCB-Leitfadens verlangt für `VCC` und `PVDD` jeweils mindestens 0,4 mm (ca. 15,7 mil). Punkt 44 der Selbstprüftabelle 4-2-1-1 gilt für akkubetriebene Varianten und verlangt für `VCC` mindestens 12 mil; Punkt 47 gilt für 3,3-V-Varianten, trägt den Titel `PVDD`, nennt im Prüfdetail jedoch `VCC` mit mindestens 12 mil. Die Quelle gleicht diese Breitenangaben nicht ab und erklärt nicht, ob bei Punkt 47 der Titel oder das Prüfdetail das Zielnetz bezeichnet. Keinen korrigierten Wert ableiten und keinen Eintrag pauschal auf beide Versorgungsvarianten übertragen; vor der Freigabe mit SiFli Zielnetz, Anwendungsbereich und Breite bestätigen.
    - **Ausgangsbezeichnungen:** Abschnitt 3.2.1 des originalen PCB-Leitfadens verwendet `VDD_VOUT1` / `VDD_VOUT2`, während die Punkte 45/46 der Selbstprüftabelle 4-2-1-1 und die Kurzreferenztabelle in Abschnitt 6.2 dieser Seite `VDD33_VOUT1` / `VDD33_VOUT2` verwenden. Die Quelle erklärt nicht, ob die Bezeichnungen Aliasnamen oder unterschiedliche Netze sind. Der Titel von Punkt 46 wiederholt `VDD33_VOUT1`, im Prüfdetail steht jedoch `VDD33_VOUT2`.
    Ohne Bestätigung durch SiFli beim Finalisieren des Designs weder eine Leiterbahnbreite wählen noch Punkt 47 einem Netz zuordnen noch die Varianten der Ausgangsnamen als gleichwertig behandeln.

### 6.4. Quarz-Layout { #64-crystal-layout }

- Unter der RF-Schaltung und dem Hauptchip eine durchgehende Referenzmasse erhalten; die Massefläche nicht aufteilen oder durch Schlitze unterbrechen. Für den Quarzbereich fordert die Quelle zugleich eine durchgehende Referenzmasse und kupferfreie Bereiche unter dem Quarz. Siehe den folgenden Warnhinweis; die Kupfergeometrie dort erst festlegen, wenn SiFli die für den jeweiligen Lagenaufbau geltenden Grenzen bestätigt hat.
- Quarze mindestens 1,5 mm vom Chip-Taktpin, mehr als 1 mm vom Leiterplattenrand und mindestens 5 mm von Wärmequellen wie PA, Ladung und PMU entfernt platzieren, um temperaturbedingte Frequenzdrift zu begrenzen. Die Quelle nennt mindestens 0,25 mm Kupferabstand auf der Top-Lage um das Gehäuse und verweist für angrenzende Lagen auf das Referenzdesign, erklärt aber nicht das Verhältnis zur kupferfreien Zone unter dem Gehäuse. Die geltenden Grenzen vor Layoutfreigabe mit SiFli bestätigen. Keine hochfrequenten Digitalsignale direkt unter dem Quarz führen; möglichst sämtliche Leitungen dort vermeiden. Magnetische Bauteile wie Leistungsinduktivitäten vom Quarz fernhalten.
- XI/XO ausschließlich auf der obersten Lage und ohne Lagenwechsel führen. Die Leitungen kurz und symmetrisch halten und beidseitig mit dicht angeordneten Masse-Durchkontaktierungen dreidimensional abschirmen. Lastkondensatoren auf beiden Seiten des Quarzes nahe den quarzseitigen Leitungsenden platzieren und ihre Massepads nahe am Quarz-Massepad anbinden. Stromversorgungs-Durchkontaktierungen von den Quarzleitungen fernhalten.
- Für den 48-MHz-Quarz Leiterbahnen auf der obersten Lage mit 3 bis 10 mm Länge und 0,1 mm Breite verwenden. Zwischen den parallelen Leitungen 48M_XI und 48M_XO mindestens 0,15 mm Abstand einhalten und dreidimensional mit Masse abschirmen. Abstand zu VBAT, DC/DC und Hochgeschwindigkeitssignalen halten; den Quarzbereich auf der obersten und den angrenzenden Lagen freihalten.
- Für den 32,768-kHz-Quarz Leiterbahnen auf der obersten Lage mit höchstens 10 mm Länge und 0,1 mm Breite verwenden. Das Routingmodell nennt mindestens 0,15 mm Abstand zwischen parallelen 32K_XI- und 32K_XO-Leitungen; die Selbstprüftabelle verlangt mehr als die doppelte Leiterbahnbreite (>0,2 mm bei 0,1 mm Breite). Den endgültigen Abstand erst festlegen, wenn SiFli die geltende Vorgabe bestätigt hat. Dreidimensional mit Masse abschirmen und den Quarzbereich auf der obersten und den angrenzenden Lagen freihalten.

!!! warning "Ungeklärte Konflikte in den Quarz-Layoutvorgaben der Quelle"
    - **Masseabschirmung und kupferfreie Bereiche:** Abschnitt 3.3 des PCB-Leitfadens verlangt eine durchgehende Referenzmasse im Quarzbereich und eine Kupferfreistellung auf der Top-Lage um den Quarz. Abbildung 3-3-1 (hier als Abbildung 6.9-30 wiedergegeben) nennt mindestens 0,25 mm Abstand um das Gehäuse. Punkt 6 der originalen Selbstprüftabelle 4-3-1 fordert eine vollständige GND-Abschirmung um Quarz und Oszillatorleitungen; Punkt 7 verlangt dagegen unter dem Quarz kupferfreie Bereiche nur auf TOP bei einer 4-lagigen PTH-Leiterplatte und auf TOP sowie Lage 2 bei einer 6-lagigen HDI-Leiterplatte. Die Quelle grenzt Abschirm- und Freistellungsbereich nicht voneinander ab und erklärt nicht, wie die Forderung nach durchgehender Masse auf die für den jeweiligen Lagenaufbau kupferfreien Lagen anzuwenden ist. Dieser Konflikt im Geltungsbereich ist ungelöst; das lagenweise Kupfer- oder Massebild darf nicht abgeleitet werden.
    - **Abstand der 32,768-kHz-Leiterbahnen:** Abschnitt 3.3 des PCB-Leitfadens und das Routingmodell in Abbildung 3-3-4 (hier als Abbildung 6.9-33 wiedergegeben) verlangen mindestens 0,15 mm zwischen parallelen `32K_XI`- und `32K_XO`-Leiterbahnen. Punkt 9 der originalen Selbstprüftabelle 4-3-1 verlangt einen Abstand von mehr als der doppelten Basis-Leiterbahnbreite, also mehr als 0,2 mm bei der im Leitfaden genannten Breite von 0,1 mm. Die Mindestabstände widersprechen sich.
    - **Geltungsbereich des Gehäuseabstands:** Abbildung 3-3-1 (hier als Abbildung 6.9-30 wiedergegeben) fordert auf der TOP-Lage mindestens 0,25 mm Kupferabstand um das Gehäuse. Punkt 7 der Selbstprüftabelle 4-3-1 legt für zwei Lagenaufbauten separat fest, welche Lagen unter dem Quarz kupferfrei bleiben müssen; die Quelle erklärt jedoch nicht, wie der umlaufende 0,25-mm-Abstand zu den Bereichen unter dem Gehäuse oder zu den Routing-Ausschlüssen auf angrenzenden Lagen steht.
    Diese Konflikte und Unklarheiten zum Geltungsbereich sind in SiFlis Quelldokumentation ungelöst. Vor der Layoutfreigabe die Anforderungen für das konkrete Gehäuse und den Lagenaufbau von SiFli bestätigen lassen; weder einen der Leiterbahnabstände auswählen noch lagenbezogene Masse- oder Kupferfreistellungsgrenzen ableiten.

### 6.5. RF-Layout { #65-rf-layout }

- Das RF-Anpassnetzwerk nahe am Chip und entfernt von der Antenne platzieren. Den AVDD_BRF-Filterkondensator direkt neben dem Chip-Pin platzieren und seine Masse über eine Durchkontaktierung direkt mit der Hauptmassefläche verbinden.
- RF-Leiterbahnen kurz halten und so wenige Durchkontaktierungen wie praktikabel verwenden.
- RF möglichst auf der obersten Lage und ohne Lagenwechsel führen. Sofern anwendbar, wird eine Leiterbahnbreite über 10 mil empfohlen. Eine dreidimensionale Masseabschirmung vorsehen, scharfe und rechte Winkel vermeiden, die Impedanz passend zum Leiterplattenaufbau auf 50 Ω auslegen und beidseitig dicht angeordnete Masse-Durchkontaktierungen als durchgehenden Via-Zaun platzieren.
- Den Antennenbereich gemäß den Anforderungen des Antennenherstellers und den Vorgaben des Produktdesigns freihalten.
- Ein Unterschied zwischen der Padbreite eines Anpassbauteils und der Leiterbahnbreite kann eine Impedanzdiskontinuität verursachen. Ein an die Padabmessungen angepasster Kupfer-Ausschnitt in der darunterliegenden Referenzmasse kann die Impedanzkontinuität verbessern.
- Bei einem IPEX-Antennenstecker das Kupfer auf allen Leiterplattenlagen unter dem Stecker entfernen. PCB-Antennen auf der tatsächlichen Leiterplatte simulieren und abstimmen; ein CLC-Anpassnetzwerk vorsehen und möglichst nahe an der Antenne platzieren.
- RF von LCD-FPC, USB, SDIO, DC/DC, Quarzen und Ladepfaden fernhalten.

### 6.6. Analog und Audio { #66-analog-and-audio }

- Filterkondensatoren für AVDD33_AUD, MIC_BIAS und AUD_VREF direkt an den Chip-Pins platzieren und ihre Masseanschlüsse zuverlässig mit der PCB-Hauptmasse verbinden.
- Analoge Versorgungsentkopplung nahe am Chip platzieren.
- Audio-Differenzleitungen längenangepasst routen und RC-Netzwerke nahe am Chip platzieren.
- Peripheriebauteile am ADCP-Eingang nahe an den Chip-Pins platzieren. Die Leiterbahnen kurz halten, dreidimensional mit Masse abschirmen und von starken Störquellen fernhalten.
- Peripheriebauteile an den DACP/DACN-Ausgängen nahe an den Chip-Pins platzieren. Jedes P/N-Paar als Differenzpaar möglichst kurz führen und die parasitäre Kapazität auf unter 10 pF begrenzen. Dreidimensionale Masseabschirmung vorsehen und starke Störquellen meiden.
- GPADC-Leiterbahnen mit Masse abschirmen und von potenziell störenden Schaltungen wie Akku- und Temperaturmessungen fernhalten.
- Hochstrom-Rückstrompfade nicht durch den Audiobereich führen.

### 6.7. Hochgeschwindigkeitsschnittstellen { #67-high-speed-interfaces }

- USB DP/DN als 90-Ω-Differenzpaar führen und zuerst durch den ESD-Schutz leiten.
- MPI-Speichersignale eng gruppiert führen: Gesamtlänge ≤20 mm und Längenunterschied innerhalb der Gruppe ≤3 mm. Takt-, Daten- und Befehlssignale dreidimensional mit Masse abschirmen und eine durchgehende Referenzmasse erhalten.
- SDIO-Signale kompakt gruppieren: Gesamtlänge ≤50 mm und Längenunterschied innerhalb der Gruppe ≤6 mm. Takt-, Befehls- und Datensignale dreidimensional mit Masse abschirmen.
- RGB/DPI-, 8080-, EPD- und andere parallele Display-Busse über einer durchgehenden Referenzmasse führen.
- USB PA35 (USB_DP) und PA36 (USB_DN) vor dem Chip durch ESD-Schutz führen. Eine differenzielle Leitungsführung mit 90 Ω Impedanz und dreidimensionaler Masseabschirmung verwenden; den Masseanschluss des ESD-Bauteils zuverlässig mit der Hauptmasse verbinden.
- Serienwiderstände auf Hochgeschwindigkeitstakten reservieren, falls EMI-Abstimmung nötig sein könnte.

### 6.8. EMI, ESD und EOS { #68-emi-esd-and-eos }

- ESD-Schutz für jede externe Schnittstelle prüfen.
- Außerhalb des Abschirmblechs keine langen Leitungswege für störende Signale wie Takt und Versorgung auf der Außenlage vorsehen; diese Signale auf Innenlagen führen.
- ESD-Schutzbauteile direkt neben den zugehörigen Steckerpins platzieren. Das Signal muss zuerst durch das ESD-Schutzbauteil laufen, bevor es nachfolgende Schaltungen erreicht; vor dem Bauteil darf es keine Abzweigung geben. Den Masseanschluss über Durchkontaktierungen direkt mit der Hauptmasse verbinden und kurz sowie breit ausführen.
- USB, Ladeanschluss, Akkustecker, Tasten, Touch, Display und Herzfrequenzsensor sowie Antenne sind vorrangige Schutzpunkte.
- Den Testpunkt der USB-Ladeleitung vor dem TVS-Bauteil platzieren. Das TVS-Bauteil des Akkuanschlusses vor der Chip-Schaltung platzieren, sodass das Signal vor dem Chip zuerst durch das TVS läuft.
- Beim Ladeeingangsschutz OVP, EOS und ESD gemeinsam betrachten.

### 6.9. PCB-Referenzabbildungen { #69-pcb-reference-figures }

Die folgenden SF32LB57x-Abbildungen zeigen Gehäuseabmessungen, PCB-Footprints, Lagenaufbauten, Fanout, Leiterbahnführung und Schutzbeschaltungen. Sie dienen als zentrale PCB-Referenzen für neue Designs.

Die QFN80L-Land-Pattern-Referenz nennt für das zentrale freiliegende Pad 5,90 mm, die Gehäusezeichnung dagegen nominal 5,50 mm (5,40–5,60 mm). Sie beschreiben das PCB-Land bzw. das Gehäusepad; die Maße nicht als austauschbar behandeln. Vor der Bibliothekserstellung die genaue Gehäuserevision und den von SiFli empfohlenen Footprint prüfen. Die QFN68L/QFN80L-Schablonenreferenzen verwenden 0,125 mm Schablonendicke und eine angegebene Pastenabdeckung von 60 % auf dem freiliegenden Pad; die Übereinstimmung von Öffnungsmaßen und Abdeckung durch den Schablonenhersteller prüfen lassen.

<!-- BGA-ONLY -->
Die BGA112-Schablonenreferenz verwendet 0,075 mm Dicke und 112 quadratische Öffnungen von 0,18 mm mit Eckradius R0,05 mm.
<!-- /BGA-ONLY -->

![Abbildung 6.9-1: QFN68L 7 x 7 x 0,9 mm Gehäuseabmessungen](../../sf32-products/chips/assets/57x/PO-BQFN770E05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-1: QFN68L 7 x 7 x 0,9 mm Gehäuseabmessungen</em></div>

![Abbildung 6.9-2: QFN68L 7 x 7 x 1,1 mm Gehäuseabmessungen](../../sf32-products/chips/assets/57x/PO-BQFN770D05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-2: QFN68L 7 x 7 x 1,1 mm Gehäuseabmessungen</em></div>

![Abbildung 6.9-3: QFN68L PCB-Lötflächenmuster](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-3: QFN68L PCB-Lötflächenmuster</em></div>

![Abbildung 6.9-4: QFN68L Schablonenöffnung](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-4: QFN68L Schablonenöffnung</em></div>

![Abbildung 6.9-5: QFN80L 8 x 8 x 0,9 mm Gehäuseabmessungen](../../sf32-products/chips/assets/57x/PO-BQFN880E20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-5: QFN80L 8 x 8 x 0,9 mm Gehäuseabmessungen</em></div>

![Abbildung 6.9-6: QFN80L 8 x 8 x 1,1 mm Gehäuseabmessungen](../../sf32-products/chips/assets/57x/PO-BQFN880D20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-6: QFN80L 8 x 8 x 1,1 mm Gehäuseabmessungen</em></div>

![Abbildung 6.9-7: QFN80L PCB-Lötflächenmuster](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-7: QFN80L PCB-Lötflächenmuster</em></div>

![Abbildung 6.9-8: QFN80L Schablonenöffnung](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-8: QFN80L Schablonenöffnung</em></div>

<!-- BGA-ONLY -->
![Abbildung 6.9-9: BGA112 5,4 x 4,4 x 0,98 mm Gehäuseabmessungen](../../sf32-products/chips/assets/57x/PO-ABGA451X33-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-9: BGA112 5,4 x 4,4 x 0,98 mm Gehäuseabmessungen</em></div>

![Abbildung 6.9-10: BGA112 5,4 x 4,4 x 1,03 mm Gehäuseabmessungen](../../sf32-products/chips/assets/57x/PO-ABGA451X34-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-10: BGA112 5,4 x 4,4 x 1,03 mm Gehäuseabmessungen</em></div>

![Abbildung 6.9-11: BGA112 PCB-Lötflächenmuster](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-11: BGA112 PCB-Lötflächenmuster</em></div>

![Abbildung 6.9-12: BGA112 Schablonenöffnung](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-12: BGA112 Schablonenöffnung</em></div>
<!-- /BGA-ONLY -->

![Abbildung 6.9-13: QFN 1,6 mm PCB-Lagenaufbau-Referenz](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-13: QFN 1,6 mm PCB-Lagenaufbau-Referenz</em></div>

![Abbildung 6.9-14: QFN 0,8 mm PCB-Lagenaufbau-Referenz](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-14: QFN 0,8 mm PCB-Lagenaufbau-Referenz</em></div>

<!-- BGA-ONLY -->
![Abbildung 6.9-15: BGA 1,6 mm PCB-Lagenaufbau-Referenz](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-15: BGA 1,6 mm PCB-Lagenaufbau-Referenz</em></div>

![Abbildung 6.9-16: BGA 0,8 mm PCB-Lagenaufbau-Referenz](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-16: BGA 0,8 mm PCB-Lagenaufbau-Referenz</em></div>
<!-- /BGA-ONLY -->

![Abbildung 6.9-17: PTH-PCB-Designregeln](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-17: PTH-PCB-Designregeln</em></div>

![Abbildung 6.9-18: PTH-Durchkontaktierungsregeln](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-18: PTH-Durchkontaktierungsregeln</em></div>

![Abbildung 6.9-19: HDI-PCB-Designregeln](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-19: HDI-PCB-Designregeln</em></div>

![Abbildung 6.9-20: HDI-Durchkontaktierungsregeln](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-20: HDI-Durchkontaktierungsregeln</em></div>

![Abbildung 6.9-21: QFN68-Ausfächerungsreferenz auf der obersten Lage](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-21: QFN68-Ausfächerungsreferenz auf der obersten Lage</em></div>

![Abbildung 6.9-22: QFN80-Ausfächerungsreferenz auf der obersten Lage](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-22: QFN80-Ausfächerungsreferenz auf der obersten Lage</em></div>

<!-- BGA-ONLY -->
![Abbildung 6.9-23: BGA112-Ausfächerungsreferenz](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-23: BGA112-Ausfächerungsreferenz</em></div>
<!-- /BGA-ONLY -->

![Abbildung 6.9-24: QFN VCC-Versorgungsführung](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-24: QFN VCC-Versorgungsführung</em></div>

<!-- BGA-ONLY -->
![Abbildung 6.9-25: BGA VCC-Versorgungsführung](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-25: BGA VCC-Versorgungsführung</em></div>
<!-- /BGA-ONLY -->

![Abbildung 6.9-26: QFN Leitungsführung von VBUS und VBAT](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-26: QFN Leitungsführung von VBUS und VBAT</em></div>

<!-- BGA-ONLY -->
![Abbildung 6.9-27: BGA Leitungsführung von VBUS und VBAT](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-27: BGA Leitungsführung von VBUS und VBAT</em></div>
<!-- /BGA-ONLY -->

![Abbildung 6.9-28: QFN DCDC-Leitungsführung](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-28: QFN DCDC-Leitungsführung</em></div>

<!-- BGA-ONLY -->
![Abbildung 6.9-29: BGA DCDC-Leitungsführung](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-29: BGA DCDC-Leitungsführung</em></div>
<!-- /BGA-ONLY -->

![Abbildung 6.9-30: Freihaltebereich für die Quarzplatzierung](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-30: Freihaltebereich für die Quarzplatzierung</em></div>

![Abbildung 6.9-31: 48-MHz-Quarz-Leitungsführungsmodell](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-31: 48-MHz-Quarz-Leitungsführungsmodell</em></div>

![Abbildung 6.9-32: 48-MHz-Quarz-Leitungsführungsreferenz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-32: 48-MHz-Quarz-Leitungsführungsreferenz</em></div>

![Abbildung 6.9-33: 32,768-kHz-Quarz-Leitungsführungsmodell](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-33: 32,768-kHz-Quarz-Leitungsführungsmodell</em></div>

![Abbildung 6.9-34: 32,768-kHz-Quarz-Leitungsführungsreferenz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-34: 32,768-kHz-Quarz-Leitungsführungsreferenz</em></div>

![Abbildung 6.9-35: Layout des RF-Anpassnetzwerks](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-35: Layout des RF-Anpassnetzwerks</em></div>

![Abbildung 6.9-36: Referenz für die RF-Signalführung](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-36: Referenz für die RF-Signalführung</em></div>

![Abbildung 6.9-37: Layout des Audio-Versorgungsfilters](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-37: Layout des Audio-Versorgungsfilters</em></div>

![Abbildung 6.9-38: Layout des analogen Audioeingangs](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-38: Layout des analogen Audioeingangs</em></div>

![Abbildung 6.9-39: Layout des analogen Audioausgangs](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-39: Layout des analogen Audioausgangs</em></div>

![Abbildung 6.9-40: SDIO-Leitungsführungsmodell](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-40: SDIO-Leitungsführungsmodell</em></div>

![Abbildung 6.9-41: SDIO-PCB-Leitungsführungsreferenz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-41: SDIO-PCB-Leitungsführungsreferenz</em></div>

![Abbildung 6.9-42: USB-Bauteilplatzierungsreferenz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-42: USB-Bauteilplatzierungsreferenz</em></div>

![Abbildung 6.9-43: USB-Leitungsführungsmodell](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-43: USB-Leitungsführungsmodell</em></div>

![Abbildung 6.9-44: USB-PCB-Leitungsführungsreferenz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-44: USB-PCB-Leitungsführungsreferenz</em></div>

![Abbildung 6.9-45: Referenz zur Platzierung der Versorgungs-TVS](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-45: Referenz zur Platzierung der Versorgungs-TVS</em></div>

![Abbildung 6.9-46: Referenz zur Erdung der EOS-/TVS-Schutzbauteile](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 6.9-46: Referenz zur Erdung der EOS-/TVS-Schutzbauteile</em></div>
