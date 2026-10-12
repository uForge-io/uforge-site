---
icon: lucide/library
description: "Offizielle Schaltplansymbol- und PCB-Footprint-Bibliotheken von SiFli für SF32-Chips und -Module — JLCEDA/LCEDA Pro, PADS, OrCAD und KiCad — mit Download-Links und Prüfliste."
tags:
    - Hardware
    - EDA
    - Bibliothek
---

# SF32 EDA-Tool-Bibliotheken { #sf32-eda-tool-libraries }

## Zweck { #purpose }

SiFli veröffentlicht Schaltplansymbol- und PCB-Footprint-Bibliotheken für die SF32-Chip- und -Modulfamilie. Verwenden Sie diese Dateien als Ausgangspunkt für die Schaltplanerfassung und das PCB-Layout, anstatt Symbole, Pinbelegungen und Pad-Layouts von Hand aus dem Datenblatt nachzuzeichnen.

Die Bibliotheken reduzieren das Risiko bei der Inbetriebnahme, ersetzen jedoch nicht das Datenblatt, die Gehäusezeichnung oder den gerätespezifischen Hardware-Design-Leitfaden. Vergleichen Sie vor der Freigabe immer das ausgewählte Bibliotheksbauteil mit der genauen Teilenummer, dem Gehäuse, der Pinbelegung, dem Pad-Layout und den Layoutvorgaben für Ihr Design.

<div class="grid cards" markdown>

- :fontawesome-solid-download: __[JLCEDA / LCEDA Pro Bibliothek – `.epro2`-Projekt herunterladen](https://downloads.sifli.com/hardware/files/documentation/ProPrj_sifli-iclib_2026-04-20.epro2)__
- :fontawesome-solid-download: __[PADS-Bibliothek – `.ZIP` herunterladen](https://downloads.sifli.com/hardware/files/documentation/PADS-SIFLI-IC.ZIP)__
- :fontawesome-solid-download: __[OrCAD-Bibliothek – `.OLB` herunterladen](https://downloads.sifli.com/hardware/files/documentation/OrCAD-SIFLI-IC.OLB)__
- :fontawesome-brands-github: __[KiCad-Bibliothek – OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries)__

</div>

!!! note "Quelle"
    Die direkten Download-Links stammen aus der [Download-Übersicht im SiFli-Wiki](https://wiki.sifli.com/hardware/index.html). Falls sich ein Link ändert, finden Sie dort den Ersatz.

## Bibliotheksformate im Überblick { #library-format-at-a-glance }

<div align="center"><em>Zusammenfassung der Bibliotheksformate</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| EDA-Tool | Datei | Format | Inhalt | Bereitstellung |
|:---|:---|:---|:---|:---|
| JLCEDA / LCEDA Pro | `ProPrj_sifli-iclib_2026-04-20.epro2` | LCEDA-Pro-Projektarchiv | Schaltplansymbole und PCB-Footprints | Direkter Download |
| PADS | `PADS-SIFLI-IC.ZIP` | Mentor/Siemens-PADS-Bibliotheksarchiv | Schaltplansymbole und PCB-Decals | Direkter Download |
| OrCAD | `OrCAD-SIFLI-IC.OLB` | Cadence-OrCAD-Capture-Bibliothek | Schaltplansymbole | Direkter Download |
| KiCad | Release-ZIP oder Paketmetadaten (`metadata.json`) | KiCad-Symbol-, Footprint- und 3D-Modell-Bibliothek | Schaltplansymbole, PCB-Footprints und 3D-Modelle | [GitHub-Repository](https://github.com/OpenSiFli/kicad-libraries), versionierte Veröffentlichungen |

</div>

JLCEDA / LCEDA Pro und PADS werden als Archive bereitgestellt; OrCAD besteht aus einer eigenständigen `.OLB`-Bibliotheksdatei. Die Wiki-Übersicht nennt nicht, welche einzelnen Bauteile enthalten sind. Importieren Sie die Datei in das vorgesehene EDA-Tool und prüfen Sie, ob das ausgewählte Bauteil enthalten ist.

Das verlinkte KiCad-Repository bietet öffentlichen Quellcode, versionierte Releases und eine Tabelle unterstützter Bauteile. Das erleichtert die Prüfung des Umfangs, garantiert aber nicht, dass jede SF32-Variante enthalten ist.

## Details zur KiCad-Bibliothek { #kicad-library-detail }

Das Repository [OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) stellt SiFlis offizielle KiCad-Bibliothek mit Symbolen, Footprints und 3D-Modellen unter CC-BY-SA-4.0 bereit. Für diese Überprüfung wurde [Release `1.0.0`](https://github.com/OpenSiFli/kicad-libraries/releases/tag/1.0.0) am 2026-10-05 geprüft. Prüfen Sie vor einem neuen Entwurf, ob neuere Releases verfügbar sind.

<div align="center"><em>Abdeckung der KiCad-Bibliothek</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Teilenummer | Gehäuse | Symbol | Footprint | 3D-Modell |
|:---|:---|:---:|:---:|:---:|
| SF32LB52B/D/E/G/J | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB520/3/5/7 | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB52-MOD-1-Modul | - | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-xmark: |

</div>

Die Tabelle gibt den Stand der am 2026-10-05 geprüften Repository-README wieder, nicht eine Prüfung jedes Pins in jedem Download-Paket. Chipgruppen mit Platzhaltern belegen keine Unterstützung für jede genaue Bestellnummer. Prüfen Sie Symbol, Footprint und Gehäuse des gewählten Bauteils in der tatsächlich installierten Datei.

!!! note "Teilenummern in der OpenSiFli-README richtig lesen"
    Die README der OpenSiFli-KiCad-Bibliothek führt die Chipzeilen als `SF32LB52XUx` und `SF32LB52xUx` auf. In der SiFli-Namenskonvention steht das großgeschriebene `X` als Platzhalter für die alphabetischen Varianten mit externer Stromversorgung; das kleingeschriebene `x` steht für die numerischen, akkubetriebenen Varianten. Diese Seite löst die Platzhalter in die expliziten Gruppen SF32LB52B/D/E/G/J und SF32LB520/3/5/7 auf, die auch an anderer Stelle in der μForge-Dokumentation verwendet werden.

Die README von [OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) bezeichnet die Installation aus dem Katalog des Package and Content Manager als noch nicht unterstützt. Für die manuelle Installation beschreibt sie, ein Release-ZIP herunterzuladen und im Manager **Install from file...** zu wählen. Auf der Seite zu Release `1.0.0` wird außerdem beschrieben, das ZIP in das KiCad-Bibliotheksverzeichnis zu entpacken oder es mit `metadata.json` über den Manager zu installieren. Folgen Sie der Anleitung des verwendeten Releases. Laut README heißen die installierten Symbol- und Footprint-Bibliotheken `PCM_SiFli`.

## Prüfcheckliste { #review-checklist }

- [ ] Gleichen Sie die Bibliotheks-Teilenummer und das Gehäusesuffix vor der Schaltplanfreigabe mit der Stückliste ab.
- [ ] Vergleichen Sie Symbol-Pinnamen und Pinnummern mit dem Chip-Datenblatt und dem gerätespezifischen Hardware-Design-Leitfaden.
- [ ] Überprüfen Sie Footprint-Pad-Größe, Rastermaß, Courtyard, Behandlung des freiliegenden Pads und Montagefreiraum anhand der offiziellen Gehäusezeichnung.
- [ ] Behandeln Sie 3D-Modelle nur als Platzierungs- und mechanische Passform-Hilfsmittel; verwenden Sie sie nicht als Fertigungs- oder Montagemaße.
- [ ] Prüfen Sie bei JLCEDA / LCEDA Pro, PADS und OrCAD nach dem Import, welche Bauteile unterstützt werden; die Wiki-Download-Übersicht enthält keine Angaben für jedes einzelne Bauteil.
- [ ] Prüfen Sie vor einem neuen Entwurf, ob Bibliotheksupdates verfügbar sind. Bewahren Sie die geprüfte Archiv- oder Paketversion zusammen mit dem Projekt auf. SiFli kann die Dateien aktualisieren, wenn neue Bauteile und Module validiert werden. Updates können Bauteile hinzufügen oder ändern; prüfen Sie eine Ersatzversion deshalb vor der Übernahme erneut.

## Verwandte Seiten { #related-pages }

- [SF32-Familie](../../sf32-products/family/SF32_family.md)
- [SF32-Namenskonvention](../../sf32-products/family/SF32_namingrule.md)
- [Freigegebene Lieferantenliste für SF32](sifli-approved-vendor-list.md)
