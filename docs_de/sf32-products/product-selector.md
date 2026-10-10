---
icon: lucide/list-checks
description: "Erstellen Sie anhand Ihrer Produktanforderungen eine Vorauswahl an SF32-Chips und -Modulen und prüfen Sie den Integrationspfad auf unterstützter Hardware."
tags:
    - Hardware
    - Auswahl
hide:
    - toc
---

# SF32-Produktauswahl { #sf32-product-selector }

Grenzen Sie zunächst passende SF32-Chips und -Module ein, bevor Sie sich auf einen Schaltplan festlegen. Berücksichtigen Sie früh die Anforderungen, deren spätere Änderung aufwendig wäre: Stromversorgung, Gehäuse, Display, Audio, Speicher, GPIO, Konnektivität und Softwarevalidierung. Vergleichen Sie anschließend die verbleibenden Kandidaten.

Nutzen Sie für den ersten Schritt die interaktive Auswahlhilfe. Sie enthält nur Chips und Module und filtert nach Integrationsstufe, PSRAM- und GPIO-Kapazität, Gehäuse, Hauptversorgung, Display-Schnittstelle und Zielauflösung, Anzahl der SDIO-Schnittstellen, Anzahl der Audio-Schnittstellen sowie speziellen Hardwarefunktionen. Jedes Ergebnis führt zur jeweiligen Produktbeschreibung. Entwicklungsboards sind separate Validierungsplattformen und keine Einträge im Selektor.

## Produktauswahl { #product-selector }

!!! info "Terminologie und Anzahl der Audio-Schnittstellen"
    Abkürzungen und Schnittstellenbegriffe finden Sie im [Glossar](../about/glossary.md). An eine PDM-Schnittstelle lassen sich bis zu zwei digitale Mikrofone anschließen; die Anzahl der PDM-Schnittstellen entspricht daher nicht der Mikrofonanzahl. Wie viele Mikrofoneingänge nutzbar sind und wie die Pins belegt werden, hängt vom Baustein ab. Prüfen Sie dazu die Dokumentation des konkreten Modells.

Alle aktiven Filter werden gemeinsam angewendet: Ein Ergebnis muss jedes ausgewählte Kriterium erfüllen. Integrationsstufe, Gehäuse, Stromversorgung und Display-Schnittstelle sind Einzelauswahlen. PSRAM- und GPIO-Werte stehen für den Bedarf der Anwendung; ein Kandidat muss sie erreichen oder überschreiten. Die Angabe zum maximalen Bedarf beschreibt, was die Anwendung benötigt; sie ist keine Obergrenze für die Kapazität des Bausteins. Auch die Zielauflösung, die Anzahl der SDIO-Schnittstellen und die Anzahl der jeweiligen Audio-Schnittstellen sind Mindestwerte. Die Kontrollkästchen fügen benötigte Fähigkeiten hinzu (externes WLAN über SDIO, DCMI-Kameraschnittstelle, KI-/ML-Beschleuniger, FreeIO oder PTM). Der Filter für die Anzahl der SDIO-Schnittstellen ist vom Kontrollkästchen für externes WLAN getrennt.

<div id="uf-product-selector"></div>

<noscript>
Für Filter und Darstellung der Bauteiltabelle benötigt dieses Tool JavaScript. Wenn JavaScript deaktiviert ist, verwenden Sie stattdessen die [Vergleichstabelle der SF32-Familie](family/SF32_family.md).
</noscript>

Die Ergebnistabelle zeigt genaue Teilenummern und Gehäuse, Speicherkapazitäten, die maximale GPIO-Anzahl, Angaben zu Versorgung und E/A-Spannung, Displayfunktionen, die Anzahl der Audio-Schnittstellen (DAC/ADC/PDM/I2S), die Anzahl digitaler Peripherieschnittstellen und -kanäle (UART/I2C/SPI/CAN/GPADC), USB-Geschwindigkeit und im Katalog ausgewiesene Funktionen. Steht bei einer Anzahl oder einem Wert `n/a`, ist diese Angabe auf der Detailstufe des Katalogs nicht dokumentiert. Das bedeutet weder null noch, dass die Funktion nicht unterstützt wird. Ein Gedankenstrich in einer Funktionsspalte bedeutet, dass der Katalogeintrag diese Fähigkeit nicht ausweist; prüfen Sie dazu die Dokumentation des konkreten Bausteins. Die aufgeführten Display-Schnittstellen dienen der Vorauswahl und sind keine vollständige Pin-Multiplexing-Liste.

## Auswahlkriterien { #selection-factors }

Der Selektor dient dazu, Ausschlusskriterien anzuwenden; er gibt keine automatische Empfehlung ab. Beginnen Sie mit der Anforderung, deren verspätete Entdeckung eine Änderung an Platine oder Schaltplan erzwingen würde. Mit den übrigen Kriterien grenzen Sie anschließend die geeigneten Kandidaten weiter ein.

### Integrationsstufe { #integration-level }

Legen Sie die Integrationsstufe vor dem Vergleich einzelner Spezifikationen fest, wenn Zeitplan, HF-Aufwand oder Zuständigkeit für die Platine bereits feststehen. Mit einem Chip haben Sie die größte Gestaltungsfreiheit, übernehmen aber auch die Verantwortung für Stromversorgung, HF, Takt, Layout und Fertigungsreife. Ein Modul reduziert den Entwicklungs- und Integrationsaufwand auf Modulebene; die Trägerplatine müssen Sie weiterhin selbst entwickeln. Mit einem Entwicklungsboard lassen sich Firmware, Peripherieverhalten und Systemannahmen am schnellsten überprüfen. Es ist jedoch nicht automatisch für die Serienfertigung geeignet.

### Stromversorgung und Gehäuse { #power-supply-and-package }

Wählen Sie früh Stromversorgung und Gehäuse. Der Selektor unterscheidet eine direkte Li-Ion-Versorgung (3,2–4,7 V), Bausteine mit dokumentierter extern geregelter 3,3-V-Versorgung und Bausteine, deren Hauptversorgung bis auf etwa 1,8 V abgesenkt werden kann (in einigen Spezifikationen liegt die Untergrenze bei 1,71 V). Diese Filter beschreiben die Hauptversorgung, nicht die GPIO-E/A-Spannung. Die Ergebnisse zeigen die E/A-Spannung separat als Nennpegel, nicht als garantierten Betriebsbereich; prüfen Sie die elektrischen Grenzwerte des konkreten Bausteins. Auch das Gehäuse prägt den Entwurf: Es bestimmt Platinenfläche, Fan-out-Aufwand, Wärmeableitung und verfügbares Pinbudget. Der Gehäusefilter arbeitet mit groben Kategorien; prüfen Sie die genaue Gehäusebezeichnung in den Ergebnissen. Ein Gehäuse mit einer höheren angegebenen GPIO-Höchstzahl reicht nicht unbedingt aus, wenn Pins für Versorgung, Takte, Debugging, Display, Speicher und zwingend benötigte Peripherie reserviert werden müssen.

### Speicher- und GPIO-Reserven { #memory-and-gpio-headroom }

Verwenden Sie die PSRAM- und GPIO-Filter zunächst als Mindestwerte. Prüfen Sie anschließend die Speicheraufteilung und Pinbelegung der infrage kommenden Ausführung. Die PSRAM-Kapazität beeinflusst Grafik- und Audiopuffer, ML-Modelle und den Arbeitsspeicherbedarf der Anwendung. Die Gesamtkapazität allein garantiert jedoch keinen zusammenhängenden Speicherbereich. Planen Sie bei den GPIO-Reserven auch Produktionstests, Debugging, Interrupts, spätere Sensoren und Platinen-Steuersignale ein, nicht nur die Schnittstellen des ersten Prototyps.

### Display und Grafik { #display-and-graphics }

Filtern Sie nach der Schnittstelle, die Ihr Display tatsächlich benötigt, und verwenden Sie die Zielauflösung als erste Kapazitätsprüfung. Die Breite-mal-Höhe-Werte sind Schwellen für die Gesamtpixelzahl; Seitenverhältnis und Display-Timing werden damit nicht exakt geprüft. Die angezeigten Auflösungswerte dienen der Vorauswahl im Katalog. Sie garantieren weder einen bestimmten Displaymodus noch stellen sie für jede Teilenummer verbindliche Maximalwerte dar; prüfen Sie Baustein und Display anhand der SiFli-Dokumentation. Der Selektor verwendet RGB, die im Platinenentwurf übliche Kurzbezeichnung, für die parallele Display-Schnittstelle; ihr formaler Name lautet DPI (Display Pixel Interface). Die aufgeführten Schnittstellen sind keine vollständige Pin-Multiplexing-Liste. Prüfen Sie den genauen Schnittstellenmodus, Speicherbedarf, Pin-Routing, die Einschaltsequenz des Displays und den Softwaretreiber in der Dokumentation des konkreten Bausteins.

### Audio-Schnittstellen { #audio-interfaces }

Der Selektor bietet unabhängige Mindestwertfilter für Audio-DACs, ADCs, PDM-Schnittstellen und I2S-Schnittstellen. Jeder Wert ist eine Untergrenze und kein gebündeltes Audio-Profil. Prüfen Sie anschließend mögliche Ressourcenkonflikte mit anderer Peripherie und berücksichtigen Sie die analoge Schaltung auf Platinenebene.

### Konnektivität und Spezialhardware { #connectivity-and-specialist-hardware }

Verwenden Sie die Filter für WLAN, Kamera, KI-Beschleuniger, FreeIO und PTM nur, wenn die jeweilige Funktion tatsächlich benötigt wird. Das Kontrollkästchen für externes WLAN kennzeichnet einen dokumentierten SDIO-Pfad; es bedeutet nicht, dass WLAN integriert ist. Der separate Filter prüft die im Katalog dokumentierte Anzahl der SDIO-Schnittstellen. Externes WLAN setzt außerdem eine passende Stromversorgung, Platinenverdrahtung und Softwareunterstützung voraus. Bei Kamera- und KI-Anwendungen müssen Schnittstelle, Speicherbandbreite, Rechenlast und Softwarestack zusammen betrachtet werden. FreeIO und PTM sind nützlich, wenn eine flexible Signalzuordnung oder die deterministische Verarbeitung von Peripherieaufgaben zentrale Anforderungen sind. Grundlegende Einschränkungen bei Stromversorgung, Speicher und Gehäuse bleiben jedoch vorrangig.

### Validierungsnachweise { #validation-evidence }

Öffnen Sie vor der Festlegung über den Ergebnislink die Produktbeschreibung und prüfen Sie dort die genaue Teilenummer, das Gehäuse, die elektrischen Grenzwerte, das Referenzdesign sowie verfügbare Designleitfäden und Checklisten. Testen Sie den vorgesehenen Firmwareablauf nach Möglichkeit auf dem unterstützten Entwicklungsboard, dessen Hardware dem Zielbaustein am ähnlichsten ist. Der Selektor dient der Vorauswahl; maßgeblich für den Entwurf bleibt die SiFli-Dokumentation zum konkreten Baustein.

## Integrationsstufe wählen { #choose-an-integration-level }

Der interaktive Katalog enthält nur Chip- und Moduleinträge. Entwicklungsboards sind unten separat als Möglichkeit zur Validierung von Software und Systemannahmen aufgeführt.

<div align="center"><em>Ausgangspunkt für die Hardwareentwicklung</em></div>

<div align="center" markdown>

| Ausgangspunkt | Geeignet, wenn ... | Nächster Schritt |
|:---------------|:---------------|:----------|
| Chip | Sie eine eigene Leiterplatte entwickeln und Schnittstellen sowie Stromversorgung direkt kontrollieren möchten. | Wählen Sie eine Produktfamilie und prüfen Sie vor der Schaltplanerstellung den zugehörigen Leitfaden zur produktionsgerechten Hardwareauslegung. |
| Modul | Sie HF- und Integrationsaufwand reduzieren, aber eine eigene Trägerplatine entwickeln möchten. | Lesen Sie die Modulbeschreibung, Schnittstellendefinition und den Modul-Designleitfaden. |
| Entwicklungsboard | Sie Software, Peripherie oder ein Produktkonzept schnell überprüfen möchten. | Beginnen Sie mit dem Board, dessen Ausstattung am besten zum vorgesehenen Produkt passt, und führen Sie ein verifiziertes Beispiel aus. Verwenden Sie den Schaltplan als Referenz, nicht als Serienentwurf. |

</div>

## Vorauswahl bestätigen { #confirm-the-shortlist }

1. **Prüfen Sie den konkreten Baustein.** Bestätigen Sie anhand der [SF32-Familienübersicht](family/SF32_family.md), der Produktbeschreibung des Ergebnisses und der [Benennungsregeln](family/SF32_namingrule.md) die bestellbare Teilenummer, das Gehäuse, die Versorgungstopologie, die Speicherorganisation, die Schnittstellenbelegung und die Referenzhardware. Wählen Sie nicht allein nach einem hervorgehobenen Merkmal: Stellen Sie sicher, dass Display, Audio, Speicher, Sensoren, Bluetooth und Energiesparfunktionen im vorgesehenen Gehäuse und Platinendesign gemeinsam nutzbar sind.
2. **Erproben Sie den Softwarepfad.** Testen Sie [Erste Schritte](../getting-started/index.md), [Tutorials](../getting-started/tutorials/overview.md) und [Entwicklung](../develop/index.md) vor der Hardwarefestlegung auf dem verfügbaren Board, dessen Hardware der geplanten Zielkonfiguration am ähnlichsten ist.
3. **Prüfen Sie die Fertigungsanforderungen.** Lesen Sie [Design für die Produktion](../hardware/design-for-production.md), bevor Sie Schaltplan, Layout, Stückliste oder Display- und Speicherwahl einfrieren.
