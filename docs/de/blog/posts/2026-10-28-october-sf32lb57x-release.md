---
icon: lucide/rss
description: "SF32LB57x ist jetzt dokumentiert: etwa doppelte Anwendungs-CPU-Leistung gegenüber SF32LB56x, ePicasso-3.0-Grafik und eine wettbewerbsfähige Kostenstruktur."
---

# Oktober: SF32LB57x im Überblick [2026-10-28] { #october-sf32lb57x-2026-10-28 }

In diesem Monat hat μForge.io die SF32LB57x-Familie aufgenommen. Sie ist die erweiterte Ausbaustufe von SF32LB52x und SF32LB56x – mit deutlich mehr CPU-Rechenleistung und Grafikfähigkeit bei weiterhin sehr wettbewerbsfähiger Kostenstruktur.

### Mehr CPU-Rechenleistung { #more-cpu-power }

SF32LB52x und SF32LB56x kombinieren jeweils einen 240-MHz-Cortex-M33-Anwendungskern mit einem Low-Power-Kern. SF32LB57x nutzt zwei 240-MHz-Cortex-M33-STAR-MC1-Performance-Kerne plus einen 24-MHz-Low-Power-Kern, der als dedizierter Bluetooth-Controller dient. Die beiden Performance-Kerne kommen zusammen auf 1968 CoreMark / 740 DMIPS – etwa das Doppelte der 984 CoreMark / 370 DMIPS des Anwendungskerns von SF32LB56x. Dieser Spielraum erlaubt es, UI-Rendering, Anwendungslogik und Audio- oder Multimedia-Verarbeitung auf getrennten Kernen laufen zu lassen, statt um einen Kern zu konkurrieren, während Bluetooth und Sensoraufgaben auf dem Low-Power-Pfad bleiben.

### Mehr Grafikfähigkeit { #more-graphics-capability }

Die Grafik steigt auf ePicasso 3.0 mit eZip-3.0-Hardware-Dekomprimierung auf, gegenüber ePicasso 2.0 Lite bei SF32LB52x und ePicasso 2.0 bei SF32LB56x. ePicasso 3.0 beschleunigt Drehen, Skalieren, Projizieren, Spiegeln und Alpha-Blending in Echtzeit, und eZip 3.0 dekomprimiert eZip-, JPEG- und MJPEG-Assets ohne CPU-lastige Dekodierung. Neben den Kernen bietet die Familie DCMI-Kameraeingang, bei ausgewählten Bauteilen bis zu 48 MB In-Package-PSRAM und 32 MB In-Package-NOR-Flash, zwei Audio-ADCs, zwei CAN-Schnittstellen sowie PTM, eine Parallel Task Machine, die zeitkritische Peripherieaufgaben auslagert.

### Eine wettbewerbsfähige Kostenstruktur { #competitive-cost-structure }

Der Sprung verschiebt SF32LB57x nicht in eine andere Kostenklasse. Unserer Einschätzung nach bleibt die Kostenstruktur für die gebotene Rechen- und Grafikleistung sehr wettbewerbsfähig, und die kompakten Gehäuse QFN68 (7 × 7 mm), QFN80 (8 × 8 mm) und BGA112 (5,4 × 4,4 mm) helfen, Platinengröße und Komplexität im Rahmen zu halten. Damit ist er ein naheliegender Kandidat für Produkte, die SF32LB52x oder SF32LB56x entwachsen sind – etwa Smartwatches mit reichhaltigerer Oberfläche, Handhelds mit Kamera oder displayzentrierte Kompaktterminals – ohne auf eine Flaggschiff-Plattform wechseln zu müssen.

### Dokumentation und Einstieg { #documentation-and-where-to-start }

Die [SF32LB57x-Chipseite](../../sf32-products/chips/SF32LB57x.md) enthält die vollständige Übersicht, die Bauteildatensätze finden Sie im [Produktselektor](../../sf32-products/product-selector.md). Der [Hardware-Design-Leitfaden](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) folgt derselben Gliederung aus Schaltplan, PCB-Layout, Checkliste und Review wie bei den anderen Familien. Wählen Sie vor der Wiederverwendung eines Schaltplans das exakte bestellbare Bauteil, da Gehäuse und Versorgungsbasis Details wie die nutzbare GPIO-Anzahl bestimmen, und prüfen Sie die endgültigen Werte in den SiFli-Datenblättern.

### Außerdem in diesem Monat { #also-this-month }

Koreanisch ist als neunte Sprache hinzugekommen, und die im [vorigen Beitrag](2026-10-07-multi-language-translation.md) beschriebenen Übersetzungen sind jetzt veröffentlicht. Sie bleiben maschinell unterstützt und klingen für Muttersprachler möglicherweise nicht natürlich; wenn eine Seite verbessert werden sollte, [sagen Sie uns Bescheid](../../about/contact.md).
