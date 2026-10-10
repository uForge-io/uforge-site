---
icon: lucide/book-a
description: "Nachschlagewerk zu Begriffen und Abkürzungen aus Embedded-Systemen, Funktechnik und Grafik sowie zu SiFli-spezifischen Bezeichnungen in der μForge.io-SF32-Dokumentation."
tags:
    - Über μForge.io
---
# Glossar { #glossary }

Dieses Glossar erläutert Abkürzungen und Begriffe aus der μForge.io-Dokumentation: allgemeine Fachbegriffe aus Embedded-Systemen und Funktechnik ebenso wie SiFli-spezifische Bezeichnungen der SF32-Plattform. Die Einträge verlinken auf Seiten mit ausführlicheren Erklärungen. Das Glossar dient als Nachschlagehilfe und ersetzt nicht den jeweiligen Sachkontext.

## Architektur und Verarbeitung { #architecture-and-processing }

* **MCU** — **Microcontroller Unit (Mikrocontroller).** Integrierter Schaltkreis mit Prozessorkern, Speicher und programmierbaren Ein-/Ausgabeperipheriegeräten. Er ist dafür ausgelegt, dedizierte Firmware mit geringem Laufzeit-Overhead auszuführen, statt ein allgemeines Betriebssystem bereitzustellen.
* **SoC** — **System on Chip.** Integrierter Schaltkreis, der die für ein Computersystem benötigten Schaltungen und Komponenten auf einem Chip vereint. In dieser Dokumentation werden SF32-Bausteine als MCUs eingeordnet, da sie Firmware für Mikrocontroller-Anwendungen ausführen und nicht den vollständigen Betriebssystemumfang eines Anwendungsprozessors abdecken.
* **Arm Cortex-M33** — 32-Bit-Prozessorarchitektur der Armv8-M Mainline, auf der die Anwendungs- und Bluetooth-Kerne der SF32-Familie basieren. Armv8-M Mainline unterstützt optional die Sicherheitserweiterung TrustZone, die vertrauenswürdigen von nicht vertrauenswürdigem Code und Daten auf Hardwareebene trennt. Anders als bei früheren Cortex-M3/M4-Kernen ist TrustZone jedoch eine Konfigurationsoption der jeweiligen Siliziumimplementierung und keine garantierte Funktion jedes Cortex-M33. Bei den aktuellen Bausteinen SF32LB52x bis SF32LB58x ist TrustZone nicht konfiguriert. Weitere Informationen: STAR-MC1 weiter unten und die [SF32LB52x-Chipseite](../sf32-products/chips/SF32LB52x.md).
* **STAR-MC1** — Konfigurierbare eingebettete Armv8-M-Mainline-CPU-IP von Arm China, die in kompatiblen SF32-Bausteinen als Anwendungsprozessor der Cortex-M33-Klasse eingesetzt wird. Die Konfigurationen CU, SP und SE unterscheiden sich unter anderem bei Cache, TCM, XIPU und TrustZone. Welche Funktionen ein SF32-Baustein bereitstellt, hängt vom jeweiligen Gerät ab. Die SiFli-Dokumentation kann je nach Kontext die Bezeichnung „Arm Cortex-M33 STAR-MC1“ oder „Arm Cortex-M33“ verwenden. Siehe die [STAR-MC1-Architekturseite](../learn/architecture/star-mc1.md).
* **CDE** — **Custom Datapath Extension.** Mechanismus für benutzerdefinierte Arm-Befehle zur gezielten Beschleunigung. In den STAR-MC1-Unterlagen von Arm China dient CRC32 als CDE-Beispiel. Ob CDE auf einem konkreten SF32 verfügbar ist und von der Software unterstützt wird, muss für den jeweiligen Baustein geprüft werden.
* **DSP** — **Digital Signal Processor / Digital Signal Processing.** Erweiterungen des Cortex-M33-Kerns für rechenintensive Aufgaben wie Audioverarbeitung und Sensorfusion.
* **MPU** — **Memory Protection Unit.** Hardware, die festlegt, auf welche Speicherbereiche Code zugreifen darf, und so Fehlerisolation und Sicherheitsfunktionen unterstützt.
* **HAL** — **Hardware Abstraction Layer.** SDK-Schicht, die Peripheriegeräte über eine einheitliche API unabhängig von der konkreten Chipvariante zugänglich macht.
* **KI-/ML-Beschleuniger** — Hardware zur Beschleunigung von Aufgaben der künstlichen Intelligenz oder des maschinellen Lernens, etwa der Inferenz eines kompakten neuronalen Netzes. Die Verfügbarkeit ist bausteinspezifisch; prüfen Sie den Produktselektor und das Datenblatt des vorgesehenen Bausteins.

## Drahtlose Konnektivität { #wireless-connectivity }
* **BLE** — **Bluetooth Low Energy.** Energiesparender Bluetooth-Funkmodus, auf dem die meisten SF32-Wearables und IoT-Produkte basieren.
* **Wi-Fi** — Drahtlose Netzwerktechnik für lokale Netze. Wenn ein SF32-Produkt externe Wi-Fi-Unterstützung dokumentiert, erfolgt die Verbindung über SDIO. Prüfen Sie vor dem Design-Freeze den genauen Baustein, das Board-Routing sowie Stromversorgung und Softwareunterstützung.
* **Dual-Mode-Bluetooth** — Unterstützung von BLE und Classic Bluetooth (BR/EDR) über dasselbe Funkgerät. Das ist sinnvoll, wenn ein Produkt beides benötigt, etwa Audiostreaming (Classic Bluetooth oder LE Audio) und einen energiesparenden Steuerkanal. Unterstützt von SF32LB52x/56x/57x/58x; SF32LB55x unterstützt nur BLE.
* **GAP** — **Generic Access Profile.** Bluetooth-Schicht für Geräterollen, Advertising und Verbindungsaufbau; darauf baut jede BLE-Anwendung auf.
* **GATT** — **Generic Attribute Profile.** Bluetooth-Schicht, die festlegt, wie Services und Characteristics – also die von einem BLE-Gerät bereitgestellten Daten – strukturiert und ausgetauscht werden.
* **Sibles** — GATT-Service-Framework des SiFli-SDK, das auf der standardisierten GAP-Schicht aufsetzt. Die meisten SF32-Bluetooth-Produkte gehen von einem bestehenden Sibles-Beispiel aus, statt eine GATT-Datenbank von Grund auf zu erstellen. Siehe die [Bluetooth-Übersicht](../learn/bluetooth/overview.md).
* **LE Audio** — Neuerer Bluetooth-Low-Energy-Audiostandard mit dem Codec LC3 und Auracast-Broadcast-Audio. Er unterscheidet sich von den Classic-Bluetooth-Audioprofilen. Unterstützt von SF32LB52x/56x/57x/58x, nicht jedoch von SF32LB55x. Siehe [Bluetooth Audio und LE Audio](../learn/bluetooth/processor.md).
* **OTA** — **Over-The-Air (Firmwareaktualisierung).** Gerätefirmware wird über eine Funkverbindung – typischerweise BLE – statt über eine Kabelverbindung aktualisiert.
* **DFU** — **Device Firmware Update.** Allgemeine Bezeichnung für Verfahren und Protokolle zur Gerätefirmware-Aktualisierung; OTA-Updates über Bluetooth verwenden üblicherweise ein DFU-Verfahren.

## Grafik und Display { #graphics-and-display }

* **ePicasso** — SiFli-eigene 2D-/2,5D-Grafikengine für die SF32-Familie. Sie übernimmt Pixeloperationen wie Kopieren, Blenden, Skalieren, Drehen und Zusammensetzen von Ebenen und entlastet so die Anwendungs-CPU. Siehe die [ePicasso-Architekturseite](../learn/graphics/epicasso-gpu.md).
* **eZip** — Verlustfreies Grafik- und allgemeines Kompressionsformat von SiFli mit Hardware-Dekomprimierung auf unterstützten SF32-Geräten. Bei Grafiken beschreibt SiFli die Kompressionsrate als etwas höher als bei PNG; bei allgemeinen Daten hängt sie vom Ausgangsmaterial ab. Da komprimierte Assets vor der Dekomprimierung über den Bus übertragen werden, kann eZip die Bandbreitenlast für externen PSRAM und NOR-Flash senken.
* **TurboPixel** — Verlustbehaftetes Format mit festem Kompressionsverhältnis für den finalen Framebuffer auf unterstützten SF32-Bausteinen. extDMA komprimiert das gerenderte Bild in TurboPixel; der Displaycontroller dekomprimiert es. Dadurch lassen sich PSRAM-Bandbreite und benötigte PSRAM-Kapazität verringern. Siehe die Seite zur [TurboPixel-Framebuffer-Kompression](../learn/graphics/turbopixel.md).
* **LVGL** — **Light and Versatile Graphics Library.** Open-Source-Framework für eingebettete Benutzeroberflächen, das die meisten SF32-Produkte für ihre Anwendungsoberfläche einsetzen. Das Rendering kann durch ePicasso beschleunigt werden.
* **HMI** — **Human-Machine Interface.** Bezeichnung für die lokale Benutzerschnittstelle eines Geräts, etwa Display, Touch-Eingabe und Tasten.
* **RGB-/DPI-Displayinterface** — Parallele Displayschnittstelle, die Pixelfarbwerte direkt an ein kompatibles Display oder einen Displaycontroller überträgt. Die offizielle Bezeichnung lautet **DPI (Display Pixel Interface)**; „RGB-Interface“ ist die übliche Kurzform im Boarddesign. Typischerweise umfasst sie einen Pixeltakt, horizontale und vertikale Synchronisationssignale sowie mehrere parallele Farbdatenleitungen. Gegenüber einer seriellen Displayschnittstelle belegt DPI mehr GPIOs und erfordert sorgfältigeres Routing paralleler Leiterbahnen. Prüfen Sie daher das Pinbudget des vorgesehenen Gehäuses und die Display-Timings.
* **MIPI-Displayinterface** — Displayschnittstelle gemäß MIPI-Alliance-Standards für kompatible Displays mit höherer Bandbreite.
* **EPD** — **Electronic Paper Display.** Displaytechnik für reflektive Bildschirme mit typischerweise niedrigem Energiebedarf.
* **JDI-Displayinterface** — Unterstützung für kompatible JDI-/Sharp-Memory-in-Pixel-Displays, sofern dies für den ausgewählten SF32-Baustein dokumentiert ist.

## Audio { #audio }

* **ADC / DAC** — **Analog-to-Digital Converter / Digital-to-Analog Converter.** Wandler für die analogen Audioeingangs- und -ausgangspfade auf SF32-Bausteinen mit integrierter Audiofunktion. Dedizierte Audio-ADCs/DACs sind in SF32LB52x/56x/57x/58x verfügbar; SF32LB55x besitzt keine dedizierten Audio-ADCs/DACs.
* **PDM** — **Pulse-Density Modulation.** Verbreitetes Format für digitale Mikrofonschnittstellen, das bei audiotauglichen SF32-Bausteinen neben I2S unterstützt wird. Eine PDM-Schnittstelle entspricht nicht einem einzelnen Mikrofon: Üblicherweise lassen sich bis zu zwei digitale Mikrofone anschließen. Sie teilen sich den Takt und nutzen entgegengesetzte Taktflanken, um den linken vom rechten Kanal zu unterscheiden. Geben Sie daher die Zahl der PDM-Schnittstellen an und vergleichen Sie diese, nicht die Zahl der Mikrofone.
* **I2S** — **Inter-IC Sound.** Standardisierte digitale Audioschnittstelle zum Anschluss von Codecs, DACs und anderen Audioperipheriegeräten.

## Stromversorgung und Zuverlässigkeit { #power-and-reliability }
* **PMU** — **Power Management Unit.** Integrierter Block in SF32-Chips zur Spannungsregelung, unter anderem über BUCK- und LDO-Ausgänge. Für zusätzliche Versorgungsschienen wird die PMU mancher Designs mit einem externen SiFli-PMIC wie dem SF30147C kombiniert.
* **PMIC** — **Power Management IC.** Externer Baustein, der zusätzliche geregelte Versorgungsschienen bereitstellt, die über die interne MCU-PMU hinausgehen.
* **LDO** — **Low-Dropout Regulator.** Linearer Spannungsregler und eine der internen PMU-Ausgangsstufen in SF32-Bausteinen.
* **BUCK** — Schaltende (nichtlineare) Reglertopologie, die bei höheren Strömen effizienter als ein LDO ist und ebenfalls in die SF32-PMU integriert ist.
* **TRNG** — **True Random Number Generator.** Hardwarequelle für Entropie, die physikalisches thermisches Rauschen nutzt und unter anderem für kryptografische Schlüssel und Sicherheitsfunktionen eingesetzt wird.
* **PSA** — **Platform Security Architecture.** Sicherheitsframework und Zertifizierungsprogramm von Arm. In den Unterlagen zu einigen SF32-Chips ist **PSA Certified Level 1** aufgeführt. Prüfen Sie Zertifizierungsstatus und -stufe für das jeweilige Bauteil in dessen offiziellen Unterlagen; sie gelten nicht automatisch für die gesamte Familie.

## Speicher und Arbeitsspeicher { #storage-and-memory }
* **SRAM** — **Static RAM.** Schneller, direkt auf dem Chip integrierter Arbeitsspeicher für Programmcode und Daten.
* **PSRAM** — **Pseudo-Static RAM.** Externer Speicher mit höherer Kapazität, der bei SF32-Modulen häufig als System-in-Package integriert ist. Er ergänzt den internen SRAM, etwa für Grafikpuffer und größere Anwendungen.
* **NOR-/NAND-Flash** — Nichtflüchtige Flash-Speichertypen für Firmware und Assets. NOR ermöglicht schnelle Direktzugriffe und wird häufig für die direkte Codeausführung (XiP, Execute-in-Place) verwendet. NAND bzw. SD-NAND bietet bei geringerer Direktzugriffsgeschwindigkeit eine höhere Dichte und eignet sich daher für größere Datenmengen wie Bilder, Schriftarten und Protokolle.
* **OPI / QPI / QSPI** — **Octal/Quad Peripheral (oder Serial Peripheral) Interface.** Bezeichnen Pinzahl- und Bandbreitenklassen der Flash- oder PSRAM-Schnittstelle: Quad verwendet vier, Octal acht Datenleitungen. Das wirkt sich auf die erreichbare Speicherbandbreite aus.
* **eMMC** — **Embedded MultiMediaCard.** Verwaltete NAND-Flash-Speicherschnittstelle für SF32-Designs mit höherem Speicherbedarf.

## Peripheriegeräte und Schnittstellen { #peripherals-and-interfaces }
* **GPIO** — **General-Purpose Input/Output.** Konfigurierbare digitale Pins für einfache Signale, Tasten, LEDs und softwarebasierte Schnittstellen.
* **I/O** — **Input/Output.** Allgemeine Bezeichnung für Pins und Peripheriesignale, über die ein Gerät Daten oder Steuersignale mit dem übrigen System austauscht.
* **UART** — **Universal Asynchronous Receiver/Transmitter.** Serielle Standardschnittstelle für Konsolen- und Debug-Ausgaben sowie einfache Punkt-zu-Punkt-Verbindungen.
* **SPI** — **Serial Peripheral Interface.** Synchroner serieller Bus für Displays, Flash-Speicher, Sensoren und andere schnelle Peripheriegeräte.
* **I2C** — **Inter-Integrated Circuit.** Synchroner Mehrpunkt-Bus, der häufig für Sensoren und die Konfiguration langsamer Peripheriegeräte verwendet wird.
* **SDIO** — **Secure Digital Input Output.** Host-Schnittstelle, über die dokumentierte SF32-Designs ein externes Wi-Fi-Gerät anbinden.
* **DCMI** — **Digital Camera Module Interface.** Parallele Kameraschnittstelle zum Anschluss eines kompatiblen Bildsensors.
* **FreeIO** — Flexible GPIO-Zuweisung von SiFli, mit der unterstützte Signale innerhalb der dokumentierten Einschränkungen des Bausteins geeigneten GPIOs zugeordnet werden können.
* **PTM** — **Peripheral Task Machine.** Hardwarefunktion von SiFli zur deterministischen Verarbeitung von Peripherieaufgaben auf unterstützten Geräten.
* **RTC** — **Real-Time Clock.** Echtzeituhr, die unabhängig von den Haupttaktbereichen der Anwendung weiterlaufen oder das System aufwecken kann.

## Hardware und Fertigung { #hardware-and-manufacturing }
* **QFN** — **Quad Flat No-lead.** Gehäusetyp für SF32-Chips, angegeben durch Pinzahl und Gehäuseabmessungen, zum Beispiel QFN68.
* **BGA** — **Ball Grid Array.** Gehäuse mit Lötkugeln an der Unterseite. Es ermöglicht eine kompakte Bauform und eine höhere Pinzahl, erfordert aber BGA-taugliches Fan-out-Routing auf der Leiterplatte und geeignete Bestückung.
* **BOM** — **Bill of Materials (Stückliste).** Formale, positionsweise aufgeschlüsselte Liste aller Bauteile, passiven Komponenten und mechanischen Teile, die für die Fertigung einer Leiterplattenbaugruppe (PCBA) benötigt werden. Ein wesentlicher Grund, von SiFli empfohlene Bauteile und Module zu bevorzugen, ist die geringere Komplexität der Stückliste.
* **EDA** — **Electronic Design Automation.** Softwarekategorie für Schaltplanerstellung, SPICE-Simulation und Leiterplattenlayout. Die Seite [SF32 EDA-Tool-Bibliotheken](../hardware/cad-components/eda-tool-libraries.md) enthält SF32-spezifische Footprints und Symbole.
* **AVL** — **Approved Vendor List.** Liste von SiFli freigegebener Zweitquellen für Bauteile wie Quarze, Regler und Flash-Speicher. Die Komponenten werden anhand der elektrischen Toleranzen von SF32-Hardwaredesigns geprüft. Siehe die Seite [Freigegebene Lieferantenliste für SF32](../hardware/cad-components/sifli-approved-vendor-list.md).
* **EVB** — **Evaluation Board.** Von SiFli bereitgestelltes SF32-Referenz- bzw. Entwicklungsboard zur Inbetriebnahme und Validierung, bevor kundenspezifische Hardware verfügbar ist.
* **FAE** — **Field Application Engineer.** Technischer Ansprechpartner von SiFli für Fragen zum Hardwaredesign, die über die öffentliche Dokumentation hinausgehen.

## Software und Werkzeuge { #software-and-tools }
* **SiFli-SDK** — Zentrales Firmware-Entwicklungskit von SiFli für SF32-Bausteine und Referenz-SDK, auf dem die meisten Produktionsfirmwares basieren.
* **SiFli CodeKit** — VS-Code-Erweiterung für die SiFli-SDK-Entwicklung. Sie unterstützt Projekterstellung, Konfiguration, Build, Flashen und Monitorbetrieb, ohne dass die Befehlszeilen-Toolchain direkt verwendet werden muss.
* **RTOS** — **Real-Time Operating System.** Betriebssystemklasse mit deterministischer Ablaufplanung und geringem Overhead, die SF32-Firmware typischerweise verwendet – entweder über die RTOS-Integration des SiFli-SDK oder über Zephyr.
* **sftool** — Kommandozeilenwerkzeug von SiFli zum Flashen und Wiederherstellen von SF32-Boards, einschließlich der Wiederherstellung nicht mehr startfähiger Boards.
