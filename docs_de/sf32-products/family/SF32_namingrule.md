---
icon: lucide/tags
description: "Wie eine SF32LB5xyZxYx6-Teilenummer decodiert wird: Produktstufe, PSRAM-Variante, Gehäusetyp, integrierte Flash-/PSRAM-Kapazität und Temperaturklasse, mit durchgerechneten Beispielen."
tags:
  - Hardware
  - Chip
---

# SF32-Namenskonvention { #sf32-naming-convention }

## Benennung der Chips { #chip-naming }

### Teilenummer: ***SF32LB5xyZxYx6*** { #part-number-sf32lb5xyzxyx6 }

!!! note "Syntaxhinweis"
    * Kleinbuchstabe ***x*** bezeichnet eine numerische Ziffer.
    * Großbuchstabe ***Y*** oder ***Z*** bezeichnet ein alphabetisches Zeichen.

### Präfix: *SF32LB5xy* { #prefix-sf32lb5xy }

- **SF32** — SiFli-32-Bit-MCU-Serie
- **LB** — Produktlinien-Kennung
    - **LB**: Low-Power-Bluetooth-MCU-Serie
- **5** — Prozessorfamilie
    - **5**: Bausteine mit einem 32-Bit-Arm-Cortex-M33-Prozessor vom Typ STAR-MC1 oder einem RISC-V-Prozessor mit vergleichbarer Leistung
- **x** — Produktstufe
    - **8 / 7**: Konfigurationen mit zwei Anwendungsprozessoren und einem Low-Power-Prozessor; die Produktpositionierung hängt von der jeweiligen Familie ab.
    - **6 / 5**: Mittelklasse (***ein*** Anwendungsprozessor, ***ein*** Low-Power-Prozessor)
    - **2**: Kostenoptimiert (***ein*** Anwendungsprozessor, ***dedizierter*** Low-Power-Bluetooth-Controller)
- **y** — Bausteinvariante
    - Der Wert richtet sich in der Regel nach der im Gehäuse integrierten PSRAM-Kapazität; die genaue Zuordnung hängt von der Produkt-Unterfamilie ab.

### Suffix: *ZxYx6* { #suffix-zxyx6 }
- **Z** — Gehäusetyp
    - **U**: QFN68
    - **V**: BGA
    - **Y**: QFN80
- **xYx** — Integrierte Speicherkonfiguration (QSPI-NOR-Flash & PSRAM)
  *(Hinweis: Die genaue Codierungszuordnung hängt vom jeweiligen Gehäuse und der Bausteinfamilie ab)*

`ZxYx6` ist ein familienweites Schema und keine Vorlage mit fester Länge. Anzahl und Reihenfolge der Speichercodes hängen von Bausteinfamilie und Gehäuse ab: Ein numerischer Flash-Code kann fehlen, und der PSRAM-Buchstabencode kann bei mehreren integrierten Bausteinen wiederholt auftreten. Die konkrete Bestellnummer ist anhand der Variantentabelle der jeweiligen Familie zu decodieren.
<div align="center"><em>Felddefinitionen des Teilenummern-Suffixes</em></div>

<div align="center" markdown>

| Feld | Typ | Optionen | Beschreibung |
| :--- | :--- | :--- | :--- |
| **x** | Numerisch | **1** bis **6** | Allgemeine Zuordnung der QSPI-NOR-Flash-Kapazität:<br>• **1**: 2 Mb<br>• **2**: 4 Mb<br>• **3**: 8 Mb<br>• **4**: 16 Mb<br>• **5**: 32 Mb<br>• **6**: 64 Mb<br>SF32LB57x verwendet zusätzlich die Codes **7** und **8**; siehe die familiespezifische Zuordnung unten. |
| **Y** | Alphabetisch | **A** bis **E** | Integrierte PSRAM-Kapazität und Schnittstelle:<br>• **A**: 16 Mb QPI-PSRAM<br>• **B**: 32 Mb OPI-PSRAM<br>• **C**: 64 Mb OPI-PSRAM<br>• **D**: 128 Mb OPI/HPI-PSRAM<br>• **E**: 256 Mb HPI-PSRAM |

</div>

- **6** — Betriebstemperaturklasse
    - **5**: −20 °C bis +70 °C (kommerzieller Temperaturbereich)
    - **6**: −40 °C bis +85 °C (industrieller Temperaturbereich)

### SF32LB57x-spezifische Speichercodes { #sf32lb57x-memory-codes }

Die Teilenummerngrafik im SF32LB57x-Hardwaredesign-Leitfaden zeigt nach dem Gehäusecode drei Speicherpositionscodes in der Reihenfolge MPI1, MPI2 und MPI3; danach folgt der Temperaturcode. Für jede MPI-Position gelten bei SF32LB57x diese familiespezifischen Codes:

<div align="center"><em>Tabelle: SF32LB57x-Speichercodes nach MPI-Position</em></div>

<div align="center" markdown>

| Code | Bedeutung an der entsprechenden MPI-Position bei SF32LB57x |
|:-----|:-----------------------------------------------------------|
| `N` | Kein SiP-Speicher |
| `B` | 32 Mb PSRAM |
| `C` | 64 Mb PSRAM |
| `D` | 128 Mb PSRAM |
| `E` | 256 Mb PSRAM |
| `2` | 4 Mb NOR-Flash |
| `3` | 8 Mb NOR-Flash |
| `4` | 16 Mb NOR-Flash |
| `5` | 32 Mb NOR-Flash |
| `6` | 64 Mb NOR-Flash |
| `7` | 128 Mb NOR-Flash |
| `8` | 256 Mb NOR-Flash |

</div>

Diese Zuordnung gilt nur für SF32LB57x. Prüfen Sie den vollständigen Code anhand der exakten Variantentabelle; nicht jede mögliche Kombination ist als SKU bestellbar.

### Beispiele für Teilenummern { #part-number-examples }

#### Beispiel 1: SF32LB527UD6 { #example-1-sf32lb527ud6 }
Merkmale der kostenoptimierten MCU-Ausführung der **SF32LB52-Serie**:

* **Prozessorkonfiguration:** ein Anwendungsprozessor sowie ein dedizierter, stromsparender Bluetooth-Controller-Prozessor (Arm Cortex-M33 STAR-MC1-basiert).
* **Gehäusetyp:** QFN68-Gehäuse (**U**).
* **Speicherkonfiguration:** integriertes OPI-PSRAM mit 128 Mb (**D**).
* **Betriebstemperatur:** −40 °C bis +85 °C (**6**, Industrieklasse).

#### Beispiel 2: SF32LB587VEE56 { #example-2-sf32lb587vee56 }
Merkmale der Flaggschiff-MCU-Ausführung der **SF32LB58-Serie**:

* **Prozessorkonfiguration:** zwei Anwendungsprozessoren und ein Low-Power-Prozessor auf Basis von Arm Cortex-M33 STAR-MC1.
* **Gehäusetyp:** BGA256-Gehäuse (**V**).
* **Speicherkonfiguration:** zwei integrierte HPI-PSRAMs mit je 256 Mb (**E**) sowie 32 Mb QSPI-NOR-Flash (**5**).
* **Betriebstemperatur:** −40 °C bis +85 °C (**6**, Industrieklasse).

#### Beispiel 3: SF32LB57GVD776 { #example-3-sf32lb57gvd776 }

Die SF32LB57x-Variantentabelle führt diese Bestellnummer als BGA112. Ihre drei Speicherpositionscodes lauten `D/7/7`: MPI1 enthält 128 Mb PSRAM, MPI2 und MPI3 enthalten jeweils 128 Mb NOR-Flash. Die abschließende `6` steht für die industrielle Temperaturklasse. Somit kennzeichnet die zweite `7` in `776` den NOR-Flash auf MPI3. Die [SF32-Familienübersicht](SF32_family.md) erläutert die GPIO-Bedeutung bei BGA112.

#### Beispiel 4: SF32LB57ZVN7N6 { #example-4-sf32lb57zvn7n6 }

Die SF32LB57x-Variantentabelle führt auch diese Bestellnummer als BGA112. Ihre Speicherpositionscodes lauten `N/7/N`: MPI1 hat keinen SiP-Speicher, MPI2 enthält 128 Mb NOR-Flash und MPI3 hat keinen SiP-Speicher. Die abschließende `6` steht für die industrielle Temperaturklasse. Die Familienübersicht erklärt, warum `58 + 6` nicht 64 frei zuweisbare GPIOs bedeutet.

### 55x-Ausnahmen mit älterem Suffixformat { #legacy-55x-suffix-exceptions }

Die SF32LB55x-Familie wurde vor der aktuellen Namenskonvention definiert; deshalb verwenden einige Bestellnummern weiterhin ältere Suffixformen. Diese drei Bestellnummern lassen sich nicht vollständig nach dem oben beschriebenen Muster `SF32LB5xyZxYx6` decodieren: `SF32LB551U4O5`, `SF32LB555V4O6` und `SF32LB555V436`. Gehäuse und Speicherbestückung sind der passenden 55x-Variantentabelle und dem Datenblatt der konkreten Bestellnummer zu entnehmen; leiten Sie die Felder nicht aus dem allgemeinen Muster ab. `SF32LB557VD3A6` entspricht dagegen der aktuellen Namenskonvention und ist keine Altformat-Ausnahme.

## Benennung der Module { #module-naming }

### Teilenummer: ***SF32LB5x-MOD-y-AaaaBbbbCccc*** { #part-number-sf32lb5x-mod-y-aaaabbbbcccc }

!!! note "Syntaxhinweis"
    * Im Suffixschema stehen `A`, `B` und `C` für die Positionen der drei Speicherfelder; sie müssen nicht als Buchstaben im jeweiligen Modulnamen vorkommen.
    * Das erste Zeichen innerhalb jedes belegten Feldes kennzeichnet den Speichertyp. Die verbleibenden Ziffern kennzeichnen dessen Kapazität oder Konfiguration.
    * Das `-y`-Subtyp-Feld wird derzeit nur von der SF32LB52-Modulfamilie verwendet. Veröffentlichte SF32LB56-MOD- und SF32LB58-MOD-Namen verwenden es nicht.

### Präfix: *SF32LB5x-MOD-y* { #prefix-sf32lb5x-mod-y }

- **SF32LB5x** — Modul-MCU-Familie
    - **SF32**, **LB** und **5** folgen derselben Bedeutung für Serie, Produktlinie und Prozessorfamilie wie die Chip-Namenskonvention oben.
    - **x** kennzeichnet die Produktstufe: **8 / 7** steht für zwei Anwendungsprozessoren und einen Low-Power-Prozessor; die Positionierung hängt von der Familie ab. **6 / 5** bezeichnet die Mittelklasse, **2** eine kostenoptimierte Ausführung.
- **MOD** — SiFli-Modulprodukt.
- **y** — Modul-Subtyp, wenn die Familie einen definiert
    - **1**: Direkter Li-Ion-Batteriebetrieb für SF32LB520/3/5/7. Die Versorgungsspannung des Chips muss zwischen 3,2 und 4,7 V liegen. Die Standardkonfiguration basiert auf SF32LB525UC6 mit 8 MB OPI-PSRAM.
    - **A**: Regulärer 3,3-V-Betrieb für die SF32LB52B-Familie. Eine direkte Versorgung aus einer Li-Ion-Batterie wird nicht unterstützt; die Versorgungsspannung des Chips muss zwischen 2,97 und 3,63 V liegen. Die Standardkonfiguration basiert auf SF32LB52BU36 mit integriertem 1 MB QSPI-NOR-Flash.
    - **B**: Regulärer 3,3-V-Betrieb für die 52E/52G/52J-Familie. Eine direkte Versorgung aus einer Li-Ion-Batterie wird nicht unterstützt; die Versorgungsspannung des Chips muss zwischen 2,97 und 3,63 V liegen. Die Standardkonfiguration basiert auf SF32LB52EUB6 mit integriertem 4 MB OPI-PSRAM.

Das `-A`-Modul ist nicht mit externem NOR-Flash bestückt. Es kann mit externem NOR-Flash oder SDIO-Peripheriegeräten wie Wi-Fi, SD-NAND und eMMC im 4-Bit-Modus verbunden werden.

### Suffix: *AaaaBbbbCccc* { #suffix-aaaabbbbcccc }

<div align="center"><em>Aufschlüsselung der Felder im Modul-Teilenummer-Suffix</em></div>

<div align="center" markdown>

| Feld | Speichertyp-Code | Kapazität, Konfiguration und Suffix |
| :--- | :--- | :--- |
| `Aaaa`<br>Variabler Flash | `N`: QSPI-NOR-Flash<br>`A`: NAND-Flash (Schnittstelle abhängig von der Modulfamilie)<br>`D`: SD-NAND-Flash<br>`E`: eMMC | `N16`: 16 MB QSPI-NOR-Flash<br>`A128`: 128 MB SPI-NAND bei SF32LB52-MOD-1; 128 MB QSPI-NAND bei SF32LB56-MOD und SF32LB58-MOD<br>`D128`: 128 MB SD-NAND bei SF32LB56-MOD<br>`E4`: 4 GB eMMC bei SF32LB58-MOD |
| `Bbbb`<br>PSRAM | `R`: PSRAM | `R4`: 4 MB OPI-PSRAM<br>`R8`: 8 MB OPI-PSRAM<br>`R12`: 4 MB + 8 MB OPI-PSRAM<br>`R16`: 16 MB OPI/HPI-PSRAM<br>`R32`: 16 MB + 16 MB HPI-PSRAM<br>`R64`: 32 MB + 32 MB HPI-PSRAM |
| `Cccc`<br>Standard-Flash | `N`: QSPI-NOR-Flash | `N1`: 1 MB QSPI-NOR-Flash<br>`N4`: 4 MB QSPI-NOR-Flash |

</div>

Die drei Suffixfelder werden ohne Trennzeichen aneinandergereiht: `Aaaa` bezeichnet die variable Flash-Option, `Bbbb` die PSRAM-Option und `Cccc` den Standard-Flash. Der SiFli-Leitfaden definiert die aufgeführten Kombinationen aus Speichertyp und Kapazität. Daraus folgt nicht, dass jeder Typcode mit jedem Kapazitätscode kombiniert werden kann. Ein Feld erscheint nur, wenn es in der dokumentierten Modulkonfiguration verwendet wird.

### Beispiele für Teilenummern { #part-number-examples_1 }

#### Beispiel 1: SF32LB52-MOD-1-N16R8 { #example-1-sf32lb52-mod-1-n16r8 }

**SF32LB52-Modul für Li-Ion-Batteriebetrieb:**

* **Modul-Subtyp:** `-1` steht für direkten Li-Ion-Batteriebetrieb. Die Versorgungsspannung des Chips liegt zwischen 3,2 und 4,7 V.
* **Variabler Flash:** `N16` bezeichnet 16 MB QSPI-NOR-Flash.
* **PSRAM:** `R8` bezeichnet 8 MB OPI-PSRAM.

#### Beispiel 2: SF32LB58-MOD-A128R32N1 { #example-2-sf32lb58-mod-a128r32n1 }

**SF32LB58-Flaggschiff-Modulkonfiguration:**

* **Modul-Subtyp:** Für veröffentlichte SF32LB58-MOD-Namen wird kein `-y`-Subtyp verwendet.
* **Variabler Flash:** Bei dieser SF32LB58-MOD-Konfiguration bezeichnet `A128` 128 MB QSPI-NAND-Flash.
* **PSRAM:** `R32` bezeichnet 16 MB + 16 MB HPI-PSRAM.
* **Standard-Flash:** `N1` bezeichnet 1 MB QSPI-NOR-Flash.

Das Namensmuster beschreibt eine Konfiguration und garantiert nicht, dass jede Codekombination als SKU verfügbar ist. Der SiFli-Leitfaden identifiziert SF32LB566VCB36 und SF32LB586VDD36 als Standard-MCU-Konfigurationen für die SF32LB56-MOD- bzw. SF32LB58-MOD-Familien; weitere Modulkonfigurationen können kundenspezifisch angepasst sein. Prüfen Sie anhand der Dokumentation des jeweiligen Moduls, ob es verfügbar ist, welcher MCU bestückt ist, wie die Pinbelegung aussieht und welche elektrischen Spezifikationen gelten.

[SiFli-Chip-Modellleitfaden](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) · [SiFli-Modulmodell-Leitfaden](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)
