---
icon: lucide/battery-charging
title: "Schätzung des Akkuladezustands"
description: "SF32-Akkustand aus der Spannung mit dem SiFli-SDK-Rechner schätzen: Entladekurven, Erkennung des Ladezustands des Laders und mehrstufige Filterung."
tags:
  - Energiesparen
  - Akku
  - Energiemanagement
---

# Schätzung des Akkuladezustands { #battery-capacity-calculation }

Der Akkurechner des SiFli-SDK schätzt den Ladezustand eines Akkus anhand seiner gemessenen Spannung als Prozentwert. Er ordnet Spannungswerten einen Ladezustand zu, misst aber nicht wie ein Coulomb-Zähler die ein- und ausfließende Ladung. Die Genauigkeit hängt daher von der hinterlegten Akkukurve und der korrekten Ladegerätesterkennung ab.

Die Middleware erkennt den Ladegerätestatus, wählt die passende Lade- oder Entladekurve aus und schätzt den Prozentwert durch Interpolation. Zusätzlich stabilisieren ein primärer Sprungfilter und ein optionaler gewichteter Mittelwertfilter das Ergebnis. Die veröffentlichte Anleitung beschreibt die interne Reihenfolge der Filter nicht vollständig. Prüfen Sie daher die Implementierung der SDK-Revision Ihres Projekts, bevor Sie eine bestimmte Reihenfolge annehmen.

## Was der Rechner tut { #what-the-calculator-does }

<div align="center"><em>Tabelle: Verhalten des Akkurechners</em></div>
<div align="center" markdown>

| Funktion | Verhalten |
| --- | --- |
| Lade- und Entladekurven | Wählt je nach Ladegerätestatus die passende Zuordnung von Spannung zu Ladezustand aus. |
| Lineare Interpolation | Berechnet den Prozentwert zwischen zwei Punkten der gewählten Kurve. |
| Primärfilter | Filtert Spannungssprünge anhand des konfigurierten Schwellenwerts und der erforderlichen Anzahl aufeinanderfolgender Messwerte, die diesen überschreiten. |
| Sekundärfilter | Berechnet optional einen gewichteten Mittelwert aus dem vorherigen und dem aktuellen Spannungswert. |
| Erkennung des Ladegerätestatus | Wählt anhand der Ladegeräteerkennung des Boards die Lade- oder Entladekurve aus. |

</div>

<div align="center"><em>Diagramm: Ablauf zur Schätzung des Akkuladezustands</em></div>

```mermaid
flowchart LR
    A["Akkuspannung über ADC lesen"] --> B{"Ladegerät erkannt?"}
    B -->|"Ja"| C["Ladekurve auswählen"]
    B -->|"Nein"| D["Entladekurve auswählen"]
    C --> F["Kurveninterpolation, Filter und Trendregel für Laden/Entladen<br/>(interne Reihenfolge gemäß SDK-Implementierung)"]
    D --> F
    F --> G["Ladezustand in Prozent ausgeben"]
```

Das Diagramm fasst den Ablauf konzeptionell zusammen und garantiert keine interne Aufrufreihenfolge. Die veröffentlichte Anleitung legt die genaue Reihenfolge von Interpolation, Filtern und der Trendregel für Laden und Entladen nicht fest. Prüfen Sie dafür die Implementierung der SDK-Revision Ihres Produkts. Laut Anleitung sinkt der gemeldete Prozentwert beim Laden nicht und steigt beim Entladen nicht.

## Zuerst das Board konfigurieren { #configure-the-board-first }

Konfigurieren Sie das Board vor der Nutzung der Middleware in menuconfig:

1. ADC-Unterstützung zur Messung der Akkuspannung aktivieren.
2. Die Akkurechner-Funktion aktivieren.
3. Ladeunterstützung aktivieren.
4. Den auf dem Board verwendeten Lade-IC auswählen. Die einfache Ladegeräteoption nur verwenden, wenn keiner der aufgeführten Lade-ICs zutrifft.
5. Den Erkennungspin für das Einstecken des Ladegeräts am Board konfigurieren.
6. Die Polarität des Erkennungspins passend zur Hardware wählen.

`BSP_CHARGER_INT_PIN_ACTIVE_HIGH` legt die Polarität der Ladegeräteerkennung fest. Ist das Makro definiert, bedeutet ein High-Pegel, dass das Ladegerät angeschlossen ist. Ist es nicht definiert, signalisiert ein Low-Pegel den Anschluss. Eine falsch konfigurierte Polarität führt zur Auswahl der falschen Akkukurve und kann bewirken, dass der angezeigte Prozentwert stehen bleibt oder sich in die falsche Richtung ändert.

## Akkukurven der tatsächlich verwendeten Zelle verwenden { #use-battery-curves-from-the-actual-cell }

Die Standarddatei `battery_table.c` im Board-Verzeichnis ist ein Beispiel, kein universelles Akkumodell. Fragen Sie den Hersteller nach den Kurven, die Spannung und Ladezustand der tatsächlich verwendeten Zelle zuordnen, und konfigurieren Sie passende Nachschlagetabellen für das Produkt.

<div align="center"><em>Tabelle: Anforderungen an die Lade- und Entladekurven</em></div>
<div align="center" markdown>

| Tabelle | Erforderliche Definition |
| --- | --- |
| `charging_curve_table` | `const battery_lookup_point_t[]`-Tabelle für das Laden. Spannungseinträge müssen von hoch nach niedrig geordnet sein. |
| `discharge_curve_table` | `const battery_lookup_point_t[]`-Tabelle für das Entladen. Spannungseinträge müssen von hoch nach niedrig geordnet sein. |
| Tabelleninhalt | Die Prozentwerte sind in absteigender Reihenfolge von 100 bis 0 anzugeben und müssen das tatsächliche Verhalten des Akkus widerspiegeln. |
| Tabellenspeicherort | Board-spezifische `battery_table.c`. |

</div>

Verwenden Sie getrennte Kurven, da die Zellspannung bei gleichem Ladezustand beim Laden und Entladen unterschiedlich ist. Ersetzen Sie die Kurve der tatsächlich verwendeten Zelle nicht durch eine beliebige 4,2-V-Kurve für Lithiumzellen, nur weil die Nennchemie übereinstimmt.

!!! warning "Spannungsskalierung für das verwendete SDK und Board prüfen"
    Die veröffentlichte SiFli-Dokumentation ist in sich widersprüchlich: `voltage_mv` und die Filterschwellen sind als mV bezeichnet, im Beispiel wird jedoch `38000` für `3.8 V` übergeben und die Beispielkurve verwendet `41808` für `4.18 V`. Diese Zahlen passen zu einer Skalierung in 0,1 mV, die Dokumentation benennt diese Skalierung aber nicht ausdrücklich. Das ist daher eine Schlussfolgerung aus den Zahlen und keine API-Garantie. Prüfen Sie vor der Verwendung den ADC-Umrechnungspfad, die Akkutabelle und die Schwellenwertvergleiche in der genauen SDK-Revision und Board-Konfiguration.

    ADC-Messwert, ausgewählte Kurventabelle und Filterschwellen müssen kompatible Skalierungen verwenden. Die Dokumentation nennt für die Schwellen die Werte `50` und `30` und bezeichnet sie als mV. Rechnen Sie diese Werte nicht allein aufgrund der Spannungsbeispiele um. Prüfen Sie, wie die verwendete SDK-Revision die einzelnen Felder interpretiert und vergleicht. Ändern Sie nicht nur die Skalierung des ADC-Messwerts, während Tabelle oder Schwellenwerte eine andere Skalierung behalten.

## Den Rechner konfigurieren { #configure-the-calculator }

`battery_calculator_config_t` liefert die beiden Kurventabellen und Filtereinstellungen.

<div align="center"><em>Tabelle: Konfiguration des Akkurechners</em></div>
<div align="center" markdown>

| Feld | Zweck | Literal aus dem veröffentlichten Beispiel (Einheit laut Dokumentation) |
| --- | --- | --- |
| `charging_table`, `charging_table_size` | Ladekurve und Anzahl der Punkte | Board-spezifisch |
| `discharging_table`, `discharging_table_size` | Entladekurve und Anzahl der Punkte | Board-spezifisch |
| `charge_filter_threshold` | Schwellenwert für Spannungssprünge beim Laden | `50` (in der Dokumentation als mV bezeichnet; SDK-Skalierung prüfen) |
| `discharge_filter_threshold` | Schwellenwert für Spannungssprünge beim Entladen | `30` (in der Dokumentation als mV bezeichnet; SDK-Skalierung prüfen) |
| `filter_count` | Anzahl aufeinanderfolgender Messwerte, die den Schwellenwert für Spannungssprünge überschreiten müssen, damit der Primärfilter die Änderung bestätigt | `3` |
| `secondary_filter_enabled` | Aktiviert den gewichteten Sekundärfilter | `true` |
| `secondary_filter_weight_pre` | Gewichtung der vorherigen Spannung | `90` |
| `secondary_filter_weight_cur` | Gewichtung der aktuellen Spannung | `10` |

</div>

Wenn der Sekundärfilter aktiviert ist, muss `secondary_filter_weight_pre + secondary_filter_weight_cur` gleich `100` sein. Stimmen Sie Schwellenwerte, Messanzahl und Gewichtungen auf den verwendeten Akku, Lasttransienten und das gewünschte Produktverhalten ab. Die SDK-Referenzwerte ersetzen keine Kalibrierung.

## Initialisieren und Berechnen { #initialize-and-calculate }

Initialisieren Sie den Rechner, bevor Sie einen Prozentsatz anfordern. Die veröffentlichte SiFli-Anleitung deklariert die Initialisierungsfunktion mit Rückgabetyp `void`; maßgeblich für die Kompilierung ist der Header der SDK-Revision Ihres Projekts.

```c
void battery_calculator_init(battery_calculator_t *calc,
                             const battery_calculator_config_t *config);
```

Die Prozent-API liefert 0–100 als Ladezustand, nicht die Akkukapazität in mAh. Prüfen Sie vor der Integration den Header und die Implementierung der verwendeten SDK-Revision auf zusätzliche Parameterbedingungen oder einen Initialisierungsstatus.

Übergeben Sie die Akkuspannung in der Skalierung, die von der verwendeten SDK-Revision erwartet wird. Der veröffentlichte API-Parameter heißt `voltage_mv`; prüfen Sie die tatsächliche Skalierung dennoch wie oben beschrieben:

```c
uint8_t battery_calculator_get_percent(battery_calculator_t *calc,
                                       uint32_t voltage_mv);
```

<div align="center"><em>Tabelle: Empfohlene Integrationsreihenfolge</em></div>
<div align="center" markdown>

| Schritt | Aktion |
| --- | --- |
| 1 | ADC, Ladegerätetyp, Ladegeräte-Erkennungspin und dessen Polarität für das Board konfigurieren. |
| 2 | Validierte Lade- und Entladekurven in `battery_table.c` definieren. |
| 3 | `battery_calculator_t` mit `battery_calculator_config_t` initialisieren. |
| 4 | Die Akkuspannung über den konfigurierten ADC-Pfad auslesen. |
| 5 | Nach Prüfung der einheitlichen Skalierung von Spannung, Tabellen und Filterschwellen die Spannung an `battery_calculator_get_percent()` übergeben. |
| 6 | Das gefilterte Ergebnis für die Benutzeroberfläche, Warn- und Abschaltlogik bei niedrigem Akkustand sowie die Produkttelemetrie verwenden. |

</div>

## Verhalten auf der Produkthardware verifizieren { #verify-behavior-on-product-hardware }

Der angezeigte Prozentwert muss den tatsächlichen Produktzustand widerspiegeln und darf nicht nur im Labor plausibel wirken. Prüfen Sie beim Laden und Entladen sowie beim Anschließen und Abziehen des Kabels gemeinsam, ob das Ladegerät erkannt wird, welche Spannung gemessen und welche Kurve ausgewählt wird und welcher Prozentwert angezeigt wird.

<div align="center"><em>Tabelle: Fehlerbehebung bei der Ladezustandsanzeige</em></div>
<div align="center" markdown>

| Symptom | Zuerst prüfen |
| --- | --- |
| Prozentsatz ändert sich zu abrupt | Zuerst prüfen, ob ADC-Messwert, Kurventabellen und Schwellen dieselbe Skalierung verwenden. Danach den relevanten Schwellenwert oder `filter_count` anpassen und bei Bedarf den Sekundärfilter aktivieren oder verstärken. |
| Prozentsatz ist ungenau | Eine zum tatsächlichen Akku passende Kurve beziehen und die Nachschlagepunkte neu kalibrieren. |
| Prozentsatz bleibt unverändert | Den gemeldeten Ladegerätestatus und die Polarität von `BSP_CHARGER_INT_PIN_ACTIVE_HIGH` prüfen. Laut der veröffentlichten Anleitung verhindert das Laden, dass der Prozentwert sinkt, und das Entladen, dass er steigt. |
| Prozentsatz ändert sich in die falsche Richtung | Den Ladegeräte-Erkennungspin, seine elektrische Polarität und die ausgewählte Lade- oder Entladekurve prüfen. |

</div>

Die offizielle Middleware-Referenz und aktuelle Konfigurations-Screenshots finden Sie unter [Akkuladezustand mit dem SiFli-SDK berechnen](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/battery_calculator.html). Für Abschätzungen der Akkulaufzeit auf Systemebene fahren Sie mit [Stromverbrauchsanalyse einer Smartwatch](smartwatch-power-profiling.md) fort; zur Überprüfung durch Messungen siehe [Energieverbrauch messen und validieren](measurement-and-validation.md).

Die veröffentlichte Anleitung ist ein Ausgangspunkt, ersetzt aber nicht die Prüfung der SDK-Revision, die Ihr Produkt verwendet. Klären Sie insbesondere die widersprüchliche Spannungsskalierung anhand des ADC-Pfads, der Akkutabelle, der Schwellenwertvergleiche und des API-Headers dieser Revision.
