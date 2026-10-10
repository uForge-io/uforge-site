---
icon: lucide/circuit-board
description: "Entwicklungsboard SF32LB56-DevKit-LCD: eine modulbasierte Plattform auf Basis des SF32LB56xV für die Entwicklung mit Display, Audio, Speicher und Peripherie."
tags:
    - Hardware
    - Entwicklungsboard
    - SF32LB56
---

# SF32LB56-DevKit-LCD { #sf32lb56-devkit-lcd }

SF32LB56-DevKit-LCD ist ein displayorientiertes Entwicklungsboard, das wahlweise mit dem Modul SF32LB56-MOD-N16R12N1 oder SF32LB56-MOD-A128R12N1 erhältlich ist; beide verwenden einen Baustein der Serie SF32LB56xV. Nutzen Sie es, um Display-Schnittstellen, Audio, Wechselspeicher und Peripherietreiber zu evaluieren, bevor Sie eine eigene SF32LB56x-Platine entwerfen.

## Wofür es sich am besten eignet { #what-it-is-best-for }

- Display-Anwendungen mit den Schnittstellen MIPI-DPI (RGB), SPI, DSPI, QSPI oder 8-Bit-MCU/8080.
- Touchscreen-Integration über I2C.
- Audioversuche mit analogem Mikrofoneingang und analogem Ausgang über den integrierten Class-D-Leistungsverstärker.
- SDIO/TF-Karten-Speicher und allgemeine Entwicklung von Peripherietreibern.
- Bewertung einer modulbasierten SF32LB56-Produktarchitektur, bevor Sie sich auf eine Trägerplatine festlegen.

## Board-Ressourcen { #board-resources }

<div align="center"><em>Tabelle: Ressourcen des SF32LB56-DevKit-LCD</em></div>

<div align="center" markdown>

| Ressource | Umsetzung auf dem Board | Praktischer Nutzen |
|:----------|:------------------------|:-------------------|
| Konfiguration N16R12N1 | SF32LB56-DevKit-LCD-N16R12N1 / SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR, 4 MB + 8 MB OPI-PSRAM und 1 MB QSPI-NOR; modulbasierte Evaluierung und Planung der Trägerplatine. |
| Konfiguration A128R12N1 | SF32LB56-DevKit-LCD-A128R12N1 / SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND, 4 MB + 8 MB OPI-PSRAM und 1 MB QSPI-NOR; modulbasierte Evaluierung und Planung der Trägerplatine. |
| Abmessungen und Temperatur | 65 mm × 38 mm; -40 °C bis 85 °C laut Modellleitfaden | Mechanische und umgebungsbezogene Planung. |
| Display | 24-Bit-MIPI-DPI-RGB über einen 40-poligen FPC-Steckverbinder mit 0,5 mm Raster in der Pinbelegung von ALIENTEK; SPI/DSPI/QSPI- und 8-Bit-MCU/8080-Signale auf der 40-poligen Stiftleiste (2 × 20) | Inbetriebnahme von Panels und Entwicklung von Displaytreibern. |
| Touch | Unterstützung für I2C-Touchscreens | Prototypen interaktiver Displays. |
| Audio | Ein analoger MEMS-Mikrofoneingang und ein Class-D-Verstärkerkanal auf dem Board; Lautsprecherausgang bis 3 W / 4 Ω laut Modellleitfaden | Aufnahme- und lokale Wiedergabeversuche; prüfen Sie Lautsprecherlast und Board-Revision. |
| Speicher | MicroSD-Steckplatz über SDIO | Tests mit Medien, Protokollierung, Dateisystem und Assets. |
| USB und Stromversorgung | Zwei USB-Type-C-Buchsen: eine für USB-zu-UART (laut Modellleitfaden CH343K) und eine für USB 2.0 FS; beide können das Board versorgen | Serielle Logs, Download/Debug, USB-Evaluierung und Versorgung am Prüfplatz. |
| Spannungswandlung | 3,3-V- und 1,8-V-Wandler-ICs auf dem Board | Prüfen Sie die Anforderungen der Versorgungsschienen im Schaltplan, bevor Sie Lasten hinzufügen. |
| Debug und Boot | 4-polige einreihige SWD-Stiftleiste mit 2,54 mm Raster; Boot-Jumper „Mode“; Tasten für Versorgung, Funktion und Reset | Firmware-Download, SWD-Debug und Auswahl des Boot-Modus. |
| Anzeigen | RGB-LED, per GPIO gesteuerte LED und Versorgungs-LED | Prüfung von Firmware- und Versorgungszustand. |
| HF | Standardmäßig Antenne auf dem Board; IPEX-Auswahl über eine 0-Ω-Option | Bewertung von Antenne und Gehäuse mit der jeweiligen Modulkonfiguration. |

</div>

**Quellenhinweis — Board-Revision bestätigen:** Der ausführliche Board-Leitfaden von SiFli beschreibt das dokumentierte Board mit dem Modul `SF32LB56-MOD-A128R12N1`, mit gemeinsam gehäustem 4 MB + 8 MB OPI-PSRAM und 1 Gb QSPI-NAND; er warnt, dass sich diese Speicherangaben vor der offiziellen Veröffentlichung ändern können. Der aktuelle Modellleitfaden führt sowohl N16R12N1 als auch A128R12N1 auf, jeweils mit 4 + 8 MB OPI-PSRAM und 1 MB Standard-QSPI-NOR. Für A128R12N1 entsprechen die 128 MB QSPI-NAND des Modellleitfadens kapazitätsmäßig den 1 Gb des ausführlichen Leitfadens. Diese Kapazitäten stimmen für A128R12N1 also überein; der ausführliche Leitfaden erwähnt jedoch den 1-MB-Standard-NOR nicht und legt nicht fest, welche SKU auf jedem Board oder jeder Revision bestückt ist. Der Modellleitfaden nennt zwei USB-zu-UART-Debug-Kanäle am CH343K, während der ausführliche Leitfaden die Rollen der Type-C-Buchsen als USB-zu-UART und USB 2.0 FS beschreibt, ohne die Zuordnung der Kanäle zu den Buchsen zu dokumentieren. Prüfen Sie den passenden Schaltplan bzw. die Stückliste, bevor Sie sich auf einen bestimmten UART-Kanal verlassen. Bestätigen Sie die Modulkennzeichnung und den passenden Schaltplan bzw. die Stückliste, bevor Sie ein bestimmtes Exemplar als Produkt-Referenzkonfiguration verwenden.

**Abweichung beim USB-zu-UART-Baustein — bestückten Typ prüfen:** Das Blockdiagramm im ausführlichen Board-Leitfaden bezeichnet den Baustein als CH342K, der Modellleitfaden nennt ihn CH343K. Prüfen Sie den tatsächlichen Typ anhand von Schaltplan und Stückliste der jeweiligen Board-Revision.

**Abweichung zwischen Foto und Text bei der SKU — bestücktes Modul prüfen:** Der Text des ausführlichen Leitfadens beschreibt das dokumentierte Board mit `SF32LB56-MOD-A128R12N1`, das beschriftete Frontfoto des Boards bezeichnet das Modul jedoch als `SF32LB56-MOD-N16R12N1`. SiFli erläutert nicht, ob das Foto eine andere Variante oder Revision zeigt. Prüfen Sie Modulkennzeichnung und Stückliste Ihres Exemplars; bestimmen Sie die SKU nicht allein anhand von Text oder Foto.

## Programmierung und Debug { #programming-and-debug }

Für den Download-Modus setzen Sie den Jumper „Mode“, bevor Sie das Board mit Spannung versorgen oder zurücksetzen; für den normalen Anwendungsstart und den Betrieb mit seriellem Log entfernen Sie ihn. Verbinden Sie den Host mit einem datenfähigen Kabel mit der Type-C-Buchse für USB-zu-UART. Die separate Type-C-Buchse für USB 2.0 FS steht für Tests mit nativem USB zur Verfügung. Das Board bietet außerdem eine 4-polige einreihige SWD-Stiftleiste mit 2,54 mm Raster für einen kompatiblen Debugger. Beide Type-C-Buchsen können das Board versorgen; die vorgesehene Versorgungsanordnung entnehmen Sie dem Board-Leitfaden und dem Schaltplan.

## SDK-Build-Targets { #sdk-build-targets }

Das SiFli SDK verwendet mit `scons --board=<board_name>` die folgenden genauen Board-Target-Namen:

- `sf32lb56-lcd_a128r12n1`
- `sf32lb56-lcd_n16r12n1`

Dies sind Build-Target-Bezeichner des SDK und nicht zwingend die auf einem Board oder Modul aufgedruckten Produktnamen. Der [Index der unterstützten Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) und die Datei [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) des SDK können unterschiedliche Mengen aufführen; bestätigen Sie das Target anhand der verwendeten SDK-Revision.

## Erster Validierungsablauf { #first-validation-path }

1. Schließen Sie ein kompatibles 24-Bit-MIPI-DPI-Display an den 40-poligen FPC-Steckverbinder an und verwenden Sie die USB-zu-UART-Buchse mit einem datenfähigen USB-Kabel.
2. Folgen Sie [Erste Schritte](../../getting-started/index.md), um eine bewährte Referenz für Build, Flashen und serielles Log herzustellen.
3. Nehmen Sie einfarbige Testbilder auf dem Display in Betrieb, bevor Sie ein UI-Framework debuggen; siehe [Grafik-Überblick](../../learn/graphics/overview.md).
4. Fügen Sie Touch, Speicher, Audio oder Funk jeweils einzeln hinzu und testen Sie anschließend Koexistenz und Energieverhalten.
5. Prüfen Sie vor einem eigenen Design [SF32LB56-MOD](../modules/SF32LB56-MOD.md) und [Design für die Produktion](../../hardware/design-for-production.md).

## Referenz { #reference }

SiFli pflegt einen [Modellleitfaden für Entwicklungsboards](https://wiki.sifli.com/en/board/devkit_guide.html) mit den wählbaren Board- und Modulcodes sowie ein ausführliches [Benutzerhandbuch zum Entwicklungsboard SF32LB56-DevKit-LCD](https://wiki.sifli.com/en/board/sf32lb56x/SF32LB56-DevKit-LCD.html) mit GPIO-Zuordnungen, Definitionen der Stiftleisten und Schnittstellen, Hinweisen zur Stromversorgung und Abläufen für Flashen und Debug.
