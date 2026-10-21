---
icon: lucide/chart-no-axes-column
title: "Messwerte mit GPADC erfassen"
description: "Den Allzweck-ADC (GPADC) auf SF32LB52x, 55x, 56x, 57x und 58x nutzen: elektrische Grenzwerte, Pad-Zuordnung, Gerätezugriff und Kalibrierung."
tags: [Entwicklung, SiFli-SDK, Anwendungshinweise, ADC]
---

# Messwerte mit GPADC erfassen { #sample-with-gpadc }

Dieser Anwendungshinweis fasst die ADC-Dokumentation für SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x und SF32LB58x zusammen. Der grundlegende Softwareablauf ist bei allen Familien gleich; Eingangsgrenzwerte, Pad-Zuordnungen und Kalibrierpunkte unterscheiden sich jedoch. Prüfen Sie vor der Hardware- oder Firmwarekonfiguration die Angaben zur Zielfamilie in den Tabellen.

Der GPADC ist bei SiFli der Analog-Digital-Wandler für allgemeine Messaufgaben, etwa zur Erfassung von Sensorsignalen und der Akkuspannung. Er ist vom Audio-ADC der Familien SF32LB52x, SF32LB56x, SF32LB57x und SF32LB58x sowie vom Sigma-Delta-ADC der Familien SF32LB55x und SF32LB58x getrennt. Dieser Anwendungshinweis behandelt ausschließlich GPADC. Informationen zu den anderen Wandlern finden Sie in der Audio- beziehungsweise Sigma-Delta-Dokumentation der jeweiligen Familie.

## Umfang und Kanalmodell des ADC { #adc-scope-and-channel-model }

Die SDK-Anwendungshinweise für SF32LB52x, SF32LB55x, SF32LB56x und SF32LB58x beschreiben acht ADC-Kanäle, `GPADC_CH0` bis `GPADC_CH7`, für analoge Quellen wie Sensorausgänge und Akkuspannung. Die SDK-ADC-Kanalübersicht für SF32LB57x definiert zwölf Kanäle: `PA28`–`PA38` entsprechen `GPADC_CH0`–`GPADC_CH10`; der Akkumesskanal ist `GPADC_CH11` (in der SDK-Übersicht `BAT`). Der Hardware-Design-Leitfaden für SF32LB57x bezeichnet das entsprechende Gehäusesignal je nach Versorgungsausführung als `VBAT` oder `VBATS`. Ein aussagekräftiger Spannungswert hängt vom gewählten Kanal, der Eingangsbeschaltung und der passenden Softwarekalibrierung ab.

SF32LB52x verfügt über einen dedizierten Akkumesspfad auf `GPADC_CH7` (`BAT`): Laut SDK-Beispiel ist dieser Kanal über einen internen Teiler mit VBAT verbunden; zur Umrechnung des Messwerts in die Akkuspannung ist der im SDK vorgesehene Umrechnungsfaktor zu verwenden. Dagegen ist `GPADC_CH7` bei SF32LB56x dem externen Pad `PB32` und bei SF32LB58x `PB39` zugeordnet. Der Akkumesskanal von SF32LB57x ist `GPADC_CH11`. Verwenden Sie je nach Versorgungsausführung das passende Signal `VBAT` oder `VBATS` und dessen Grenzwerte im Akkuspannungsbereich. Schließen Sie aus einer batteriebezogenen Boardverbindung eines Kanals nicht darauf, dass es sich um einen dedizierten Akkukanal im Chip handelt.

## ADC-Kenndaten und Eingangsnetzwerk { #adc-characteristics-and-input-network }

<div align="center"><em>Tabelle: Kenndaten normaler GPADC-Eingänge nach SF32-Familie</em></div>

<div align="center" markdown>

| Familie | GPADC-Kanäle | Auflösung | Typische Genauigkeit | Maximale Spannung an normalen GPADC-Eingängen |
|:-------|:--------------|:-----------|:--------------------|:----------------------------------------------|
| SF32LB55x | 8 | 10 Bit | 3–4 mV | 1,1 V (X1); 3,3 V (X3) |
| SF32LB52x | 8 | 12 Bit | 1–2 mV | 3,3 V |
| SF32LB56x / 58x | 8 | 12 Bit | 1–2 mV | 3,3 V |
| SF32LB57x | 12 | 12 Bit | 1–2 mV | 3,3 V |

</div>

Die oben angegebenen maximalen Eingangsspannungen gelten für normale GPADC-Eingänge; dedizierte Akkumesskanäle haben eigene Beschaltungen und Grenzwerte. Das SF32LB55x-Beispiel verwendet einen Teiler mit 1 MΩ / 220 kΩ und einer RC-Einschwingzeit von 157 ms. Die zusammengefasste ADC-Tabelle im SF32LB56x-Guide nennt 470 kΩ / 1000 kΩ und 200 ms für SF32LB52x, SF32LB56x und SF32LB58x; für SF32LB57x enthält sie diese Empfehlung nicht. Folgen Sie bei 57x dem für die genaue Variante dokumentierten Akkumesspfad und dessen Grenzwerten, statt diese Widerstandswerte oder Einschwingzeit zu übertragen. Diese Empfehlungen gelten für externe Teilernetzwerke. Insbesondere besitzt der dedizierte SF32LB52x-Akkupfad `GPADC_CH7` bereits einen internen Teiler. Fügen Sie keinen externen Teiler hinzu, sofern dies nicht der Schaltungsentwurf des Zielboards vorsieht. Die Toleranz des Teilers beeinflusst die endgültige Messgenauigkeit; kalibrieren Sie einen externen Teiler separat in der Fertigung, wenn der Entwurf dies erfordert.

<div align="center"><em>Tabelle: Akkuspannungsmesspfade nach SF32-Familie</em></div>

<div align="center" markdown>

| Familie | Akkumesspfad | Konstruktionshinweis |
|:-------|:-----------------|:--------------------|
| SF32LB55x | Externer Teiler an einem ausgewählten GPADC-Eingang; die Referenzschaltung nutzt `PB10` / `GPADC_CH1`. | Der Teilerausgang muss innerhalb des Eingangslimits des gewählten X1-/X3-Bereichs bleiben. |
| SF32LB52x | Dedizierter `GPADC_CH7` / `BAT`; laut SDK-Beispiel ist VBAT über einen internen Teiler angeschlossen. | Verwenden Sie `vbat_factor` des SDK, um den Messwert dieses dedizierten Kanals in Akkuspannung umzurechnen. |
| SF32LB56x / 58x | Ein externer Teiler auf dem Board speist ein ausgewähltes GPADC-Pad; die SDK-Referenz ordnet `GPADC_CH7` `PB32` / `PB39` zu. | Prüfen Sie den tatsächlichen Akku-Teilerpfad im Schaltplan des Zielboards. Dies sind normale GPADC-Pads, keine dedizierten Akkukanäle im Chip. |
| SF32LB57x | Dedizierter `GPADC_CH11`; die SDK-Kanalübersicht nennt ihn `BAT`, der Hardware-Guide je nach Versorgungsausführung `VBAT` oder `VBATS`. | Beachten Sie das Messlimit des Akkumesskanals für das genaue Gerät. Für 3,3-V-Versorgungsvarianten nennt der Guide für `VBATS` einen GPADC-Messbereich von 0–4,5 V; verwenden Sie nicht stattdessen die 4,7-V-Pin-Nennspannung. |

</div>

Für den externen Akku-Messpfad des SF32LB55x zeigt die OpenSiFli-FAQ einen Teiler aus 1-MΩ- und 220-kΩ-Widerständen mit 1 % Toleranz. Die hohen Widerstandswerte senken den kontinuierlichen Leckstrom des Teilers; die 1-%-Toleranz begrenzt den Fehler des Teilungsverhältnisses und trägt zur Messgenauigkeit bei. Der Teilerausgang ist der ADC-Messpunkt, nicht die Akkuspannung selbst. Berücksichtigen Sie bei der Übernahme dieser Referenz den Schaltplan und die elektrischen Grenzwerte der Zielschaltung.

![Referenzschaltung des VBAT-Widerstandsteilers aus dem SF32LB56x-SDK-Leitfaden](../../../../assets/develop/adc/adc-resistor-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>Abbildung: VBAT-Widerstandsteiler und ADC-Messpunkt, wie im SF32LB56x-SDK-Leitfaden gezeigt.</em></div>

![SF32LB55x-Referenz für den 1-MΩ/220-kΩ-Spannungsteiler](../../../../assets/develop/adc/adc003.png){ loading="lazy" }
<div align="center"><em>Abbildung: Referenzwerte am Ausgang des SF32LB55x-Spannungsteilers aus der OpenSiFli-ADC-FAQ.</em></div>

<div align="center"><em>Tabelle: Referenz-Ausgangsspannung des SF32LB55x-Spannungsteilers mit 1 MΩ / 220 kΩ</em></div>

<div align="center" markdown>

| Akkuspannung am Eingang | Ausgang an `PB10_BAT_DET_ADC` |
|:----------------------------|:------------------------------------|
| 3,0 V | 0,540983607 V |
| 3,3 V | 0,595081967 V |
| 3,6 V | 0,649180328 V |
| 4,0 V | 0,721311475 V |
| 4,2 V | 0,757377049 V |
| 5,0 V | 0,901639344 V |

</div>

Im SF32LB55x-Referenzschaltplan führt VBAT über R125 (1 MΩ) zu `PB10_BAT_DET_ADC`. R126 (220 kΩ) und C118 (0,1 µF) verbinden diesen Knoten parallel mit Masse. Diese Werte sind Referenzwerte; gleichen Sie sie mit dem Schaltplan und den elektrischen Grenzwerten des Zielgeräts ab.

![Schaltplan des externen Akkuspannungsteilers für SF32LB55x](../../../../assets/develop/adc/adc004.png){ loading="lazy" }
<div align="center"><em>Abbildung: Externer Messpfad für die Akkuspannung beim SF32LB55x.</em></div>

## Analogversorgung und Referenz { #analog-supply-and-reference }

Die Beschaltung von Analogversorgung und Referenzpins unterscheidet sich je nach Familie. Verwenden Sie den Schaltplan des Zielgeräts, statt für alle GPADC dieselbe VREF-Pinbelegung anzunehmen:

<div align="center"><em>Tabelle: GPADC-Versorgung und Referenzbeschaltung nach SF32-Familie</em></div>

<div align="center" markdown>

| Familie | Versorgung und Referenzbeschaltung |
|:-------|:------------------------------------|
| SF32LB52x / 56x | Versorgen Sie `AVDD33_ANA` mit einer stabilen 3,3-V-Schiene. Der Referenzschaltplan zeigt `GPADC_VREF` mit einem Kondensator gegen Masse; der Pin ist kein Versorgungseingang. |
| SF32LB55x | Der Referenzschaltplan zeigt `AVDD33_ANA` und `AVSS33_ANA`; folgen Sie dem Zielschaltplan für Anschluss und Abblockung. |
| SF32LB57x | Versorgen Sie `AVDD33_ANA` mit 3,3 V. `GPADC_VREF` ist ein Referenzpin: Schließen Sie nur den vorgeschriebenen Kondensator gegen Masse an und treiben Sie ihn nicht extern. |
| SF32LB58x | Der Referenzschaltplan zeigt `AVDD33_ANA` / `AVSS33_ANA`, `GPADC_VREFP` mit dem vorgeschriebenen Kondensator und `GPADC_VREFN` an Masse. Keiner der beiden Referenzpins ist ein Versorgungseingang. |

</div>

Das SF32LB58x-Paar `GPADC_VREFP` / `GPADC_VREFN` ist nicht mit dem einzelnen Pin `GPADC_VREF` anderer Familien gleichzusetzen. Der SDK-Schaltplan zeigt außerdem familienabhängige Filterbauteile. Verwenden Sie die Referenzschaltung und Bauteilwerte des konkreten Zielgeräts. Legen Sie niemals direkt eine Versorgung an einen GPADC-Referenzpin an. `AVDD33_ANA` ist die Analogversorgung; `AVSS33_ANA` ist, sofern vorhanden, Analogmasse.

![SF32LB56x-SDK-Leitfaden GPADC-Analogversorgung und Referenzverdrahtung](../../../../assets/develop/adc/adc-ana-ref-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>Abbildung: Familienabhängige GPADC-Analogversorgung und Referenzverdrahtung im SF32LB56x-SDK-Leitfaden.</em></div>

## ADC-Pad konfigurieren { #configure-the-adc-pad }

Stellen Sie das ausgewählte Eingangs-Pad vor dem Abtasten auf seine Analogfunktion ein. Die generischen API-Beispiele des Leitfadens lauten:

```c
HAL_PIN_Set_Analog(PAD_PB08, 0);
HAL_PIN_Set_Analog(PAD_PB13, 0);
```

Diese Aufrufe veranschaulichen die Analog-Pin-API, nicht eine Pad-Auswahl für eine bestimmte Zielfamilie. Wählen Sie den physischen Eingang aus dieser Kanalzuordnung aus:

<div align="center"><em>Tabelle: GPADC-Kanalzuordnung der Pads nach SF32-Familie</em></div>

<div align="center" markdown>

| Familie | `GPADC_CH0` | `GPADC_CH1` | `GPADC_CH2` | `GPADC_CH3` | `GPADC_CH4` | `GPADC_CH5` | `GPADC_CH6` | `GPADC_CH7` |
|:-------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|
| SF32LB55x | `PB08` | `PB10` | `PB12` | `PB13` | `PB16` | `PB17` | `PB18` | `PB19` |
| SF32LB52x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `BAT` |
| SF32LB56x | `PB22` | `PB23` | `PB24` | `PB25` | `PB26` | `PB27` | `PB28` | `PB32` |
| SF32LB58x | `PB32` | `PB33` | `PB34` | `PB35` | `PB36` | `PB37` | `PB38` | `PB39` |
| SF32LB57x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `PA35` |

</div>

Die SiFli-Quellen zur SF32LB52x-Padzuordnung weichen voneinander ab: Der [dedizierte SF32LB52x-ADC-Anwendungshinweis](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html) ordnet in der Revision A0 die externen Pads `PB08`, `PB10`, `PB12`, `PB13`, `PB16`, `PB17`, `PB18` und `PB19` den Kanälen `GPADC_CH0` bis `GPADC_CH7` zu. Die [zusammengefasste ADC-Tabelle im SF32LB56x-Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html) nennt dagegen `PA28` bis `PA34` für `GPADC_CH0` bis `GPADC_CH6` sowie `BAT` für `GPADC_CH7`. Die SF32LB52x-Zeile oben gibt die zusammengefasste Tabelle wieder und ist keine allgemeingültige Pinzuordnung für alle 52x-Varianten. Prüfen Sie vor dem Routing oder der GPADC-Konfiguration eines 52x-Geräts die genaue Variante und Revision anhand der passenden SDK-Pinmux-Konfiguration und des Board-Schaltplans; kombinieren Sie die beiden Zuordnungen nicht.

SF32LB57x verfügt über vier zusätzliche ADC-Kanäle: `PA36` ist `GPADC_CH8`, `PA37` ist `GPADC_CH9`, `PA38` ist `GPADC_CH10`, und das Akkumesssignal ist `GPADC_CH11` (`BAT` in der SDK-Übersicht; je nach Versorgungsausführung `VBAT` oder `VBATS` im Hardware-Guide). Dieser Kanal gehört zur Akkuspannungsdomäne und hat einen anderen Messbereich als normale GPADC-Pins. Bei 3,3-V-Versorgungsausführungen ist der im Guide angegebene GPADC-Messbereich von 0–4,5 V für `VBATS` einzuhalten, nicht die 4,7-V-Pin-Nennspannung. Die 12-Kanal-Zuordnung und der Akkueingang sind daher nicht mit den obigen Acht-Kanal-Zuordnungen austauschbar.

Bei SF32LB55x kann ein Pin außerdem direkt einem GPADC-Kanal zugewiesen werden, zum Beispiel mit `HAL_PIN_Set(PAD_PB08, GPADC_CH0, PIN_NOPULL, 0)`. Übernehmen Sie diese spezielle Zuordnung nicht für andere Familien.

![Analoge Pin-Konfiguration für den Akkuspannungseingang des SF32LB55x](../../../../assets/develop/adc/adc008.png){ loading="lazy" }
<div align="center"><em>Abbildung: SF32LB55x-Pin-Konfiguration mit analogem Eingangsmodus für den Akku-ADC-Pfad.</em></div>

## ADC-Kanal auslesen { #read-an-adc-channel }

SiFli-SDK registriert den ADC als Gerät zur Akkuspannungsmessung; der Leitfaden verwendet `bat1` als Standardgerätenamen. Über die RT-Thread-Geräteschnittstelle suchen Sie das Gerät, öffnen es nur zum Lesen, aktivieren den gewünschten Kanal und lesen dessen Rohwert:

```c
uint32_t channel = 1;
uint32_t value;
rt_device_t dev = rt_device_find("bat1");

if (dev) {
    rt_device_open(dev, RT_DEVICE_FLAG_RDONLY);
    rt_device_control(dev, RT_ADC_CMD_ENABLE, (void *)channel);
    rt_device_read(dev, channel, &value, 1);
}
```

Lesen Sie das Konvertierungsergebnis auf HAL-Ebene mit `HAL_ADC_GetValue(&hadc, slot)`. Übergeben Sie das initialisierte ADC-Handle und die für die Konvertierung konfigurierte Slot-Nummer; stellen Sie sicher, dass dieser Slot dem vorgesehenen Kanal und PAD zugeordnet ist.

## ADC-Kalibrierung und Spannungsumwandlung { #adc-calibration-and-voltage-conversion }

Der Leitfaden modelliert die Umwandlung als lineare Beziehung:

<div align="center"><em>V<sub>real</sub> = (Value<sub>adc</sub> − Offset) × Ratio</em></div>

`Offset` ist der ADC-Rohwert bei einer Eingangsspannung von 0 V; `Ratio` gibt die Spannungsänderung pro ADC-Zählschritt an. Die Werkskalibrierung gleicht Fertigungsschwankungen aus. Der Leitfaden beschreibt zusätzlich eine Zweipunktkalibrierung des vollständig aufgebauten Eingangspfads:

1. Legen Sie zwei genaue, stabile Spannungen an und lesen Sie die entsprechenden ADC-Werte.
2. Verwenden Sie die zwei Kalibrierspannungen der Zielfamilie anstelle von 0 V oder der maximalen Eingangsspannung.
3. Verwenden Sie `sifli_adc_calibration`, um Ratio und Offset zu berechnen und zu speichern.
4. Rechnen Sie spätere Rohwerte mit den gespeicherten Kalibrierwerten um. Wenn Sie die Spannung vor dem Teiler angeben, berücksichtigen Sie zusätzlich das Teilungsverhältnis.

In der Quellimplementierung ist `ADC_RATIO_ACCURATE` auf 1000 gesetzt; die Anfangswerte für `adc_vol_offset` und `adc_vol_ratio` sind 200 beziehungsweise 3930. Dieser ältere Hilfsalgorithmus veranschaulicht die lineare Umrechnung, ersetzt aber nicht den Kalibrierablauf der jeweiligen SDK-Version. Wenn das Ziel-SDK eine HAL- oder Gerätetreiber-Kalibrier-API bereitstellt, verwenden Sie diese Schnittstelle.

### SF32LB55x-Kalibrierbereiche { #sf32lb55x-calibration-ranges }

Die OpenSiFli-FAQ beschreibt den Kalibrierablauf des SF32LB55x ausführlicher. Bei `sifli_adc_init` werden die gespeicherten Kalibriermesswerte aus der Werkskonfiguration im Flash ausgelesen, die durch `FACTORY_CFG_ID_ADC` gekennzeichnet ist. `sifli_adc_calibration` leitet daraus den linearen `offset` und `ratio` ab; spätere Abtastungen verwenden die `sifli_adc_get_mv`-Berechnung für den gewählten Bereich.

Zwei Kalibrierbereiche sind dokumentiert:

![SF32LB55x: Auswahl des Kalibriermodus und Ablauf der Werkskalibrierung](../../../../assets/develop/adc/adc001.png){ loading="lazy" }
<div align="center"><em>Abbildung: Initialisierung der SF32LB55x-Kalibrierung, Auswahl des Messbereichs sowie Berechnung von Offset und Ratio.</em></div>

- **X1-Bereich:** 0,3 V und 0,8 V. In den gespeicherten Kalibrierwerten ist Bit 15 gesetzt; die Implementierung wählt dadurch den kleineren Messbereich. Die Genauigkeit ist nahe 0 V und oberhalb von 1 V reduziert. Dieser Pfad deaktiviert `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`, sodass der interne Teiler ausgeschaltet ist und der ADC-Messpunkt 1,1 V nicht überschreiten darf.
- **X3-Bereich:** 1,0 V und 2,5 V. Dies ist die frühere Kalibriermethode. Sie aktiviert `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`, wodurch der interne Teiler mit 3-facher Abschwächung aktiviert wird; der Eingang darf 3,3 V nicht überschreiten.

![SF32LB55x: Steuerung des internen Teilers in den Bereichen X1 und X3](../../../../assets/develop/adc/adc002.png){ loading="lazy" }
<div align="center"><em>Abbildung: Aktivierung und Deaktivierung des internen Teilers für den gewählten SF32LB55x-Kalibrierbereich.</em></div>

Wählen Sie niemals einen Kalibrierbereich allein aus der Tabelle: verwenden Sie die Werkskonfiguration und die tatsächliche SDK-Implementierung des Ziels. Das X1- und X3-Verhalten ist spezifisch für das hier zitierte SF32LB55x-Material und keine Regel, die auf eine andere Familie anzuwenden ist.

<div align="center"><em>Tabelle: Zweipunkt-Kalibriereingänge laut zusammengeführtem ADC-Anwendungshinweis</em></div>

<div align="center" markdown>

| Familie | Kalibriereingänge |
|:-------|:-------------------|
| SF32LB55x | 0,3 V und 0,8 V |
| SF32LB52x / 56x / 58x | 1,0 V und 2,5 V |
| SF32LB57x | 1,0 V und 2,5 V |

</div>

Für SF32LB52x unterscheiden sich die Angaben je nach Dokumentversion: Der zusammengeführte ADC-Anwendungshinweis nennt 1,0 V und 2,5 V für die Zweipunktkalibrierung, während die aktuelle HAL-API-Referenz den standardmäßigen Kalibrierbereich von SF32LB52X als X1 mit den Kalibrierpunkten 0,3 V und 0,8 V definiert. Behandeln Sie diese beiden Paare nicht als austauschbare Standardwerte. Prüfen Sie vor der Wahl der Kalibrierpunkte oder des zulässigen Eingangsbereichs die genaue SDK-Version, die Werksdaten und den Laufzeit-Kalibrierbereich.

```c
static uint32_t adc_vol_offset = 200;
static uint32_t adc_vol_ratio = 3930;
#define ADC_RATIO_ACCURATE 1000

int sifli_adc_get_mv(uint32_t value)
{
    return (value - adc_vol_offset) * adc_vol_ratio / ADC_RATIO_ACCURATE;
}

int sifli_adc_calibration(uint32_t value1, uint32_t value2,
                          uint32_t vol1, uint32_t vol2,
                          uint32_t *offset, uint32_t *ratio)
{
    uint32_t gap1, gap2;

    if (offset == NULL || ratio == NULL) return 0;

    gap1 = (value1 > value2) ? (value1 - value2) : (value2 - value1);
    gap2 = (vol1 > vol2) ? (vol1 - vol2) : (vol2 - vol1);

    if (gap1 == 0) return 0;

    *ratio = gap2 * ADC_RATIO_ACCURATE / gap1;
    adc_vol_ratio = *ratio;
    *offset = value1 - (vol1 * ADC_RATIO_ACCURATE / adc_vol_ratio);
    adc_vol_offset = *offset;

    return adc_vol_offset;
}
```

### Kalibrierung nach Start und Aufwachen validieren { #validate-calibration-after-startup-and-wake }

Bei der Fehlersuche an der Akkuspannungsmessung des SF32LB55x weist die FAQ darauf hin, dass die Messwerte in den ersten etwa 300 ms nach dem Start oder dem Aufwachen wegen des Lade- und Entladevorgangs im RC-Netzwerk ungenau sein können. Die beobachtete Kurve stabilisiert sich nach ungefähr 350 ms. Fügen Sie eine angemessene Abtastverzögerung ein oder verwerfen Sie die zunächst instabilen Werte. Berücksichtigen Sie beim Messen des Teilers mit Multimeter oder Oszilloskop auch die Eingangsimpedanz des Messgeräts; laut FAQ kann sie einen Spannungsabfall von etwa 30 mV verursachen.

![Einschwingverlauf der SF32LB55x-Akkumessung nach dem Start](../../../../assets/develop/adc/adc005.png){ loading="lazy" }
<div align="center"><em>Abbildung: SF32LB55x-Messkurve nach dem Start mit einer Einschwingzeit von etwa 350 ms.</em></div>

### SF32LB55x-ADC-Pin nach Standby und Aufwachen prüfen { #check-sf32lb55x-pin-configuration-after-standby }

Prüfen Sie die Pin-Konfiguration des Akku-Messeingangs `PB10` am SF32LB55x sowohl vor dem Wechsel in den Standby-Modus als auch nach dem Aufwachen. Vor der Initialisierung ist der interne Pull-up von `PB10` standardmäßig aktiviert. Konfigurieren Sie den Pin in `pinmux.c` mit `PIN_NOPULL` und `PIN_ANALOG_INPUT`. Andernfalls kann der Pull-up aktiv bleiben und gelegentlich zu zu hohen Messwerten führen.

![Signalverlauf am Messknoten des SF32LB55x-Akkuteilers im Standby](../../../../assets/develop/adc/adc006.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispielhafter Signalverlauf am Messknoten des SF32LB55x-Akkuteilers im Standby-Modus.</em></div>

![Signalverlauf am Messknoten des SF32LB55x-Akkuteilers nach dem Aufwachen](../../../../assets/develop/adc/adc007.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispielhafter Signalverlauf am Messknoten des SF32LB55x-Akkuteilers nach dem Aufwachen aus dem Standby.</em></div>

## Inbetriebnahmeprüfung { #bring-up-check }

Bevor Sie eine Mehrkanal- oder zyklische Erfassung hinzufügen, überprüfen Sie einen Kanal mit einem stabilen, unabhängig gemessenen Eingang:

1. Bestätigen Sie dessen Pad-Zuordnung und Analogkonfiguration für die Zielfamilie.
2. Bestätigen Sie, dass der Teilerausgang innerhalb des ADC-Grenzwerts der Zielfamilie bleibt.
3. Vergleichen Sie die Roh- und kalibrierten Ergebnisse mit der angelegten Spannung.
4. Bewahren Sie die Teiler- und Kalibrierbedingungen zusammen mit dem Board-Testprotokoll auf.

Beim Anschluss des SF32LB56x-Log-UART an einen externen PC muss der Referenzpegel des seriellen Adapters zur I/O-Spannung des Chips passen. Die OpenSiFli-ADC-FAQ warnt, dass ADC-Werte deutlich zu niedrig ausfallen können, wenn die Chip-I/Os mit 3,3 V arbeiten, der Adapter aber auf 5 V referenziert ist. So kann eine 4-V-Akku beispielsweise als 3,3 V erkannt werden.

## Offizielle Quelle { #official-source }

- [SF32LB52x ADC-Anwendungs- und Konfigurationsleitfaden](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html)
- [SF32LB55x ADC-Anwendungs- und Konfigurationsleitfaden](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)
- [SF32LB56x ADC-Anwendungs- und Konfigurationsleitfaden](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html)
- [SF32LB57x ADC-Anwendungs- und Konfigurationsleitfaden](https://docs.sifli.com/projects/sdk/latest/sf32lb57x/app_note/adc.html)
- [SF32LB58x ADC-Anwendungs- und Konfigurationsleitfaden](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/adc.html)
- [SF32LB52x ADC-HAL-API-Referenz](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/api/hal/adc.html) — Definition der Standard-Kalibrierbereiche.
- [SF32LB57x Hardware-Design-Leitfaden — Speicher & Fertigung](../../../../hardware/chip-guides/SF32LB57x_schematic_storage_mfg.md) — GPADC-Kanal- und Pad-Zuordnung.
- [SF32LB57x Hardware-Design-Leitfaden — Minimalsystem & Stromversorgung](../../../../hardware/chip-guides/SF32LB57x_schematic_system_power.md) — Analogversorgung/Referenzbeschaltung und batteriespezifische Grenzwerte nach Versorgungsausführung.
- [OpenSiFli-ADC-FAQ](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/faq/mcu/adc.md) — SF32LB55x-Werkskalibrierbereiche und Prüfung nach Start, Standby und Aufwachen sowie Hinweise zum Pegel des SF32LB56x-Log-UART.
