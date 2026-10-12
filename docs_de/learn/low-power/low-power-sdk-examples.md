---
icon: lucide/battery-charging
title: "Energiesparbeispiele des SiFli-SDK"
description: "Finden Sie das passende Energiemanagement-Beispiel des SiFli-SDK für Schlafzustände, Weckquellen, GPIO, CPU, Bluetooth, Displays, UI und Wearable-Anwendungen."
tags:
  - Energiesparen
  - Beispiele
---

# Energiesparbeispiele des SiFli-SDK { #low-power-sdk-examples }

Die Energiemanagement-Beispiele des SiFli-SDK dienen als Mess- und Integrationsreferenzen, nicht als universelle Stromspezifikationen. Jedes Beispiel basiert auf einer bestimmten Chipfamilie, einem Entwicklungsboard, einem Versorgungspfad, aktivierten Peripheriegeräten, einer Firmware-Konfiguration und einer Arbeitslast. Nutzen Sie es, um einen definierten Zustand oder ein Szenario auf der Zielhardware reproduzierbar einzurichten, und messen Sie anschließend Strom und Spannung Ihres Produkts unter denselben Bedingungen.

Diese Seite ordnet die Projekte aus dem [SiFli-SDK-PM-Beispielindex](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html) nach der technischen Fragestellung. Für unterstützte Boards, Versorgungsanschlüsse, Jumper, SDK-Einstellungen, Befehle und das erwartete Verhalten ist jeweils die offizielle Beispielseite maßgeblich.

## Mit dem passenden Energiesparbeispiel beginnen { #start-with-the-right-power-example }

<div align="center"><em>Tabelle: SiFli-SDK-PM-Beispiele nach technischer Aufgabe</em></div>

<div align="center" markdown>

| Technisches Ziel | Beginnen Sie mit | Wobei das Beispiel hilft | Was am Produkt erneut zu prüfen ist |
|:-----------------|:-----------|:------------------------|:-------------------------|
| Den Eintritt in grundlegende PM-Zustände und das Aufwachverhalten verifizieren | [PM-Beispiel](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) | Es veranschaulicht die grundlegende Energiemanagementkonfiguration des SDK sowie den Ablauf für Schlafen und Aufwachen | Tatsächliche Weckquellen, Taktabhängigkeiten, erhaltene Zustände und die PM-Zustandsanforderungen der einzelnen Treiber |
| GPIO-Aktivität bei niedrigem Energieverbrauch charakterisieren | [GPIO-Stromverbrauchstest](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gpio/README.html) | Periodisches Aufwachen per Timer, GPIO-Zugriffe und die Unterschiede zwischen Aufwachvorgängen, Schlafzustand und I/O-Aktivität | Externe Pull-Widerstände, abgeschaltete Peripheriegeräte, Pin-Multiplexing, Versorgungsschienen und unbeabsichtigte Leckpfade |
| Rechenlast und Abschaltverhalten getrennt untersuchen | [Prozessor-Stromverbrauchstest](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/coremark/README.html) | CPU-Benchmark- und Schleifenlasten sowie Abschaltung, RTC-Aufwachen und Aufwachen per Pin | Kernfrequenz, Arbeitslast, Polarität des Aufweckpins, boardabhängige Zuordnung des Aufwecksignals und Versorgungsspannung |
| Bluetooth-Szenarien messen | [BLE-Advertising und Verbindungen: Stromverbrauchstest](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) oder [BLE/BT-Stromverbrauchstest](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) | Advertising, Verbindungen und Bluetooth-Aktivität als messbare Szenarien | RF-Bedingungen, Sendeleistung, Advertising- und Verbindungsintervalle, Verhalten des Gegenübers, Antenne und Anwendungs-Callbacks |
| AMOLED-Betrieb mit ausgeschaltetem und permanent aktivem Display vergleichen | [AMOLED-Stromverbrauchstest](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/AMOLED/README.html) | Display-Aktualisierung, Schlaf bei ausgeschaltetem Bildschirm und den Always-on-Betrieb | Tatsächliches Panel, Helligkeit, Aktualisierungsstrategie, Display-Versorgungsschienen und tatsächliches Nutzungsprofil im Alltag |
| Einen JDI-Display-Pfad messen | [JDI-Stromverbrauchstest](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) | Das displayspezifische Energiesparverhalten des dokumentierten JDI-Aufbaus | Panel-Variante, Aktualisierungsbereich, Controller-Konfiguration, Versorgungsschienen und Aktualisierungsfrequenz |
| Eine stromsparende grafische UI integrieren | [GUI_PM-Energiesparbeispiel](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) | Das Zusammenspiel von UI-Verhalten, Display-Zustand und PM-Richtlinie | Lebenszyklus der Produktanzeige, Animationen, Touch- oder Controller-Weckquellen und Strategie für geänderte Bereiche |
| Eine Display-Aktualisierung als Arbeitslast charakterisieren | [Stromverbrauchstest bei Bildschirmaktualisierung](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) | Den Anteil der Display-Aktualisierung an einer Produktarbeitslast | Auflösung, Pixelformat, geänderter Bereich, Schnittstellenrate, Pufferstrategie und Aktualisierungsrhythmus der Inhalte |
| Eine sensorgesteuerte Wearable-Interaktion aufbauen | [Display durch Anheben des Handgelenks einschalten](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/raise_wrist/README.html) | Sensorbasiertes Aufwachen, Display-Aktivität und die Rückkehr in den Schlafzustand | Sensorwahl, Gestenerkennung, Abtastintervall, Bildschirm-Timeout, Akkumodell und gemessene tägliche Nutzung |

</div>

### Den Board-Umfang prüfen { #verify-the-board-scope }

Die folgenden Angaben unterscheiden zwischen Boards, die im jeweiligen offiziellen Beispielhandbuch ausdrücklich genannt werden, und Zielen in der aktuellen GCC-Build-Konfiguration des SiFli-SDK. Ein Eintrag in der Build-Matrix bedeutet, dass das Projekt für dieses Build-Ziel konfiguriert ist. Er belegt nicht, dass die veröffentlichten Stromverbrauchswerte auf diesem Board gemessen wurden. Die Konfigurationslinks verweisen auf den aktuellen Branch `main`; bei einer anderen SDK-Revision ist die Datei `build_config_gcc.yaml` aus genau diesem Checkout maßgeblich, wenn Sie ein Ziel mit `scons --board` auswählen. Für eine reproduzierbare Messung ist der im Handbuch beschriebene Hardwareaufbau maßgeblich. Aus einer Chipfamilie in der Dokumentations-URL lässt sich keine Unterstützung für alle Chips oder Boards dieser Familie ableiten.

- **PM Example** ([SDK-Quellcode](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/classical)): Das Handbuch nennt `sf32lb56-devkit-lcd_n16r12n1`, `eh-lb551`, `sf32lb52-lcd_n16r8` und `sf32lb58-lcd_n16r64n4`. Der aktuelle GCC-Projekteintrag verwendet `sf32lb56-lcd_n16r12n1`, `eh-lb551`, `sf32lb52-lcd_n16r8`, `sf32lb58-lcd_n16r64n4` und zusätzlich `sf32lb52-core_n16r16`. Die erste Kennung unterscheidet sich von `sf32lb56-devkit-lcd_n16r12n1` im Handbuch. Prüfen Sie die Board-Zuordnung, statt unterschiedlich benannte Kennungen als austauschbar anzunehmen.
- **GPIO Power Consumption Test** ([SDK-Quellcode](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gpio)): Handbuch und aktuelle GCC-Build-Konfiguration nennen beide `sf32lb52-core_n16r16`.
- **Processor Power Consumption Test** ([SDK-Quellcode](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/coremark)): Das Handbuch nennt `eh-lb551`, `eh-lb555`, `ec-lb583`, `ec-lb587`, `eh-lb561`, `eh-lb563` und `eh-lb523`. Die aktuelle GCC-Build-Konfiguration weist dem Projekt die Menge `default_boards` zu; die aktuellen Build-Zielkennungen stehen in der [Konfiguration](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml). Die Board-Namen im Handbuch und die Ziele in `default_boards` stimmen nicht eins zu eins überein. Prüfen Sie die Board-Zuordnung in Ihrer SDK-Revision, statt sie aus den Namen abzuleiten. Ein Build-Ziel belegt außerdem nicht, dass die veröffentlichten Messwerte alle Boards der Menge abdecken.
- **BLE Broadcast and Connection Power Consumption Test** ([SDK-Quellcode](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/ble)): Das Handbuch nennt die Boards `eh-lb551` und `eh-lb555`; die aktuellen GCC-Build-Ziele heißen `eh-lb551_hcpu` und `eh-lb555_hcpu`.
- **BLE/BT Power Consumption Test** ([SDK-Quellcode](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/bt)): Das Handbuch nennt `ec-lb583`, `ec-lb587`, `eh-lb561`, `eh-lb563` und `eh-lb523`. Die aktuelle GCC-Konfiguration verwendet die Menge `bt_boards`; ihre genauen Build-Zielkennungen stehen in der [Konfiguration](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml), einige davon mit dem Suffix `_hcpu`. Ein separater Eintrag für dieses Projekt enthält außerdem `sf32lb56-wlan-core_a128r12n1` und `sf32lb56-wlan-core_n16r12n1`. Setzen Sie die Board-Namen aus dem Handbuch nicht ohne bestätigte Zuordnung mit den Build-Zielkennungen gleich.
- **AMOLED Power Consumption Test** ([SDK-Quellcode](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/AMOLED)): Handbuch und aktuelle GCC-Build-Konfiguration nennen beide `sf32lb52-core_n16r16`.
- **JDI Power Consumption Test** ([SDK-Quellcode](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/jdi)): Handbuch und aktuelle GCC-Build-Konfiguration nennen beide `sf32lb52-core_n16r16`.
- **GUI_PM Low-Power Example Guide** ([SDK-Quellcode](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gui_pm)): Handbuch und aktuelle GCC-Build-Konfiguration nennen beide `sf32lb52-lchspi-ulp`.
- **Power Consumption Test Example — Screen Refresh Scenario** ([SDK-Quellcode](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/lcd_refresh)): Das Handbuch verwendet `sf32lb52-core_n16r16` als Build-Beispiel. Dieses Projekt ist nicht in der aktuellen GCC-Build-Matrix aufgeführt; das veröffentlichte Beispiel und sein Handbuch sind dennoch verfügbar.
- **Raise Wrist to Light Up Screen** ([SDK-Quellcode](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/raise_wrist)): Handbuch und aktuelle GCC-Build-Konfiguration nennen beide `sf32lb52-lchspi-ulp`.

## Den elektrischen Messumfang festlegen { #measure-at-the-right-electrical-boundary }

Vergleichen Sie eine Produktmessung erst dann mit einem SDK-Beispiel, wenn beide denselben elektrischen Messumfang abdecken. Die GPIO- und Raise-to-Wake-Beispiele dokumentieren beispielsweise boardspezifische Versorgungsanschlüsse und Jumperstellungen für die Messung bei niedrigem Energieverbrauch. Ein USB-versorgtes Board, ein angeschlossener Debugger, ein UART-Adapter, eine Ladeschaltung oder ein Displaymodul können das Ergebnis erheblich verändern.

Erfassen Sie für jeden Durchlauf:

1. Wo die Versorgung eingespeist wird und welche Versorgungsschienen aktiv sind.
2. Versorgungsspannung sowie Abtastmodus und Messbereich des Strommessgeräts.
3. Welche externen Geräte, Pull-Widerstände, Kabel und Debug-Schnittstellen angeschlossen bleiben.
4. Firmware-Version, Board-Name, `menuconfig`-Konfiguration und PM-Debug-Einstellung.
5. Welcher Zustandsübergang oder welche Arbeitslast in den einzelnen Abschnitten der Messkurve dargestellt ist.

Erfassen Sie Spannung und Strom gemeinsam, damit sich auch Leistung und Energie bestimmen lassen. Der Artikel [Energieverbrauch messen und validieren](measurement-and-validation.md) beschreibt die Prüfung von Komponenten, Szenarien und Tagesprofilen im Detail.

## Erste Tests für PM, GPIO und Prozessor { #baseline-pm-gpio-and-processor-tests }

Verwenden Sie das [PM-Beispiel](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html), um den erwarteten Schlafmodus und die vorgesehenen Weckquellen zu prüfen, bevor Sie eine Produktarbeitslast hinzufügen. Halten Sie den angeforderten PM-Zustand fest und prüfen Sie, welchen Zustand das System tatsächlich erreicht. Bleibt der angeforderte tiefe Schlafzustand aus, prüfen Sie zuerst die Konfiguration und die Zuständigkeit für PM-Zustandsanforderungen. Nehmen Sie erst danach eine Feinabstimmung vor.

Der **GPIO-Stromverbrauchstest** ist ein guter Ausgangspunkt, wenn eine scheinbar inaktive Schnittstelle trotzdem den Ruhestrom erhöht. Im dokumentierten Szenario wacht das System regelmäßig auf, um GPIO zu lesen. So lassen sich Schlafstrom sowie der Strom für Aufwachvorgänge und I/O-Aktivität getrennt betrachten. Prüfen Sie beim Produkt zusätzlich interne und externe Pull-Widerstände, hochohmige Zustände, Verbindungen zwischen Versorgungsdomänen, Pins an abgeschalteten Peripheriegeräten, Reset-Standardwerte sowie mögliche ESD- und Rückspeisepfade. Auch ein Signal mit gültigem Logikpegel kann Leckstrom verursachen.

Der **Prozessor-Stromverbrauchstest** unterscheidet mehrere grundverschiedene Fälle: aktive CPU-Berechnung, eine einfache Schleife, Abschaltung sowie Aufwachen per Timer oder Pin. Damit lassen sich der Energieaufwand aktiver Berechnungen und das Aufwachverhalten charakterisieren, nicht aber der Verbrauch einer Anwendung vorhersagen. Ersetzen Sie den Benchmark oder die Schleife durch eine repräsentative Firmware-Arbeitslast, bevor Sie die Messkurve in ein Energiebudget übernehmen.

## Bluetooth- und Display-Szenarien { #bluetooth-and-display-scenarios }

Nutzen Sie die Projekte [BLE-Advertising und Verbindungen](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) und [BLE/BT](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html), um wiederholbare Funkszenarien einzurichten, bevor Sie die Verbindungsparameter in Ihrer Anwendung optimieren. Messen Sie das fertige Produkt mit den eigenen Advertising- oder Verbindungseinstellungen, dem jeweiligen Gegenüber, der RF-Umgebung, der Antenne und dem Callback-Verhalten. Weckt die Anwendung bei jedem Funkereignis die Haupt-CPU auf, kann sie selbst ein gutes Ergebnis auf Verbindungsebene zunichtemachen.

Die displaybezogenen Projekte helfen bei anderen Entscheidungen:

- **AMOLED-Stromverbrauchstest** vergleicht den Schlaf bei ausgeschaltetem Display mit dauerhaft aktivem Bildschirm. Die Moduswechsel und Akkulaufzeitangaben des Beispiels gelten nur für das dokumentierte Board, Panel, die Helligkeit, den Aktualisierungsrhythmus und das Nutzungsmodell; sie lassen sich nicht pauschal auf alle AMOLED-Produkte übertragen.
- [JDI-Stromverbrauchstest](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) liefert eine plattformspezifische Referenz für einen JDI-Display-Pfad.
- [GUI_PM-Energiesparbeispiel](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) zeigt den Zusammenhang zwischen UI-Lebenszyklus und PM-Verhalten.
- [Bildschirmaktualisierungsszenario](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) untersucht gezielt den Energiebedarf der Display-Aktualisierung.

Zusammen helfen diese Beispiele bei einer zentralen Produktfrage: Bei welchen Ereignissen müssen sich tatsächlich Pixel ändern, und welcher Teil des Panels muss aktualisiert werden? Nutzen Sie die [Grafikübersicht](../graphics/overview.md) und den [Display-Controller](../graphics/display-controller.md), um daraus eine Pufferstrategie und ein Verfahren für Teilaktualisierungen abzuleiten.

## Raise-to-Wake als vollständiges Anwendungsszenario { #raise-to-wake-as-a-complete-scenario }

Das Projekt **Display durch Anheben des Handgelenks einschalten** ist besonders nützlich, weil es Sensorabtastung, Gestenerkennung, das Einschalten des Displays, eine begrenzte Interaktionsdauer und die Rückkehr in den Schlaf kombiniert. Es bildet damit ein Produktszenario statt eines isolierten Zustands ab.

Die Akkulaufzeitschätzung des Upstream-Beispiels gilt nur für die dokumentierte Akkukapazität, die Anzahl der Aufweckvorgänge, die Display-Einschaltdauer, den Sensor, das Abtastintervall, das Board und die gemessenen Ströme. Übernehmen Sie bei der Anpassung die Berechnungsmethode: Messen Sie den Verbrauch bei ein- und ausgeschaltetem Bildschirm, erfassen Sie die tägliche Ereigniszahl und berechnen Sie den Gesamtenergiebedarf pro Tag. Ersetzen Sie anschließend die Beispielwerte durch die Messwerte Ihres Produkts.

Ein vollständiges Beispiel für den Kreislauf aus Modellierung und Messung finden Sie im Beitrag zur [Stromverbrauchsanalyse einer Smartwatch](smartwatch-power-profiling.md).

## Aus einem PM-Beispiel belastbare Produktnachweise ableiten { #adapt-a-pm-example-into-product-evidence }

<div align="center"><em>Tabelle: Prüfpunkte zur Produktanpassung von PM-Beispielen</em></div>

<div align="center" markdown>

| Schritt | Beizubehaltende Nachweise | Warum das wichtig ist |
|:-----|:-----------------|:---------------|
| Ausgangsreferenz festhalten | Board, Versorgungsanschluss, Jumper, SDK-Version, Konfiguration und erwartetes Verhalten | Trennt das Verhalten des SiFli-Beispiels von späteren Produktänderungen |
| Ein Szenario festlegen | PM-Zustand, aktive Komponenten, Weckquelle, Dauer und Endbedingung | Verhindert eine mittlere Stromangabe ohne technischen Kontext |
| Strom und Spannung messen | Marker in der Messkurve sowie Strom, Spannung, Leistung und Energie | Ermöglicht den Vergleich zwischen Versorgungsschienen und Firmware-Versionen |
| Produkthardware ergänzen | Externe Komponenten, Pin-Zustände, Versorgungsschienen und Sensoren | Macht Leckströme und Peripherieverbrauch sichtbar, die auf dem Entwicklungsboard fehlen |
| Das Energiemodell abgleichen | Häufigkeit und Dauer der Szenarien sowie die gemessene Energie | Hilft, die berechnete Tagesenergie mit dem gemessenen Produktverhalten abzugleichen |

</div>

## Weiterführende Ressourcen { #related-resources }

- [Energiesparendes Design im Überblick](overview.md) zu PM-Verantwortlichkeiten, Energiesparmodi, Systemdesign und Profilierung.
- [Energieverbrauch messen und validieren](measurement-and-validation.md) zur Prüfung von Komponenten, Szenarien und Produktprofilen.
- [Stromverbrauchsanalyse einer Smartwatch](smartwatch-power-profiling.md) mit einem ausgearbeiteten Tagesnutzungsmodell.
- [Beispiele](../../develop/examples/index.md) für den SDK-Beispielkatalog über verschiedene Bereiche hinweg.
- [SiFli-SDK-PM-Beispielindex](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html) mit den aktuellen offiziellen Projekten und Konfigurationshinweisen.
