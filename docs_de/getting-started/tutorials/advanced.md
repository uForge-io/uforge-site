---
icon: lucide/rocket
description: "SF32-Tutorials zur Produktvalidierung: gemessene Optimierung des Stromverbrauchs, wiederherstellbares BLE-OTA, Inbetriebnahme individueller Displays, Absturz- und Coredump-Analyse, Bluetooth mit mehreren Verbindungen und eigene Treiber."
tags:
    - Tutorials
---

# Produktvalidierung { #advanced-tutorials }

Diese Tutorials setzen voraus, dass Sie mit der [Subsystemintegration](intermediate.md) vertraut sind: Sie können Peripheriegeräte in Betrieb nehmen und an Middleware anbinden und haben bereits mindestens ein Koexistenzproblem selbst erlebt. Hier geht es um die Arbeit, die eine funktionierende Demo von einem auslieferbaren Produkt unterscheidet: gemessene Leistungsaufnahme, OTA mit geprüftem Wiederherstellungsverhalten, wiederholbare Inbetriebnahme eigener Hardware, Absturzanalyse, Bluetooth mit mehreren Verbindungen und wiederverwendbare Treiber.

Bei der Produktvalidierung zählt nicht das Kopieren eines einzelnen Beispiels, sondern der nachvollziehbare Nachweis. Dokumentieren Sie für jedes Tutorial die Board-Revision, SDK-Version, das zugrunde liegende Beispiel, den Testaufbau, das erwartete und das beobachtete Ergebnis sowie alle Änderungen.

Nutzen Sie diese Reihe, wenn eine Funktion nicht nur einmal laufen soll: Sie benötigen messbares Stromverhalten, zuverlässig wiederherstellbare Updates, eine reproduzierbare Inbetriebnahme eigener Hardware und nachvollziehbare Befunde zu Fehlern außerhalb des Normalbetriebs.

Beispielpfade und unterstützte Boards können je nach SDK-Version variieren. Prüfen Sie vor dem Build für jedes Beispiel die aktuelle Liste „Supported Platforms“ sowie die boardspezifischen Hardware- und Konfigurationsanforderungen. Die Unterstützung eines Beispiels bedeutet nicht automatisch, dass das Board auch die anderen Beispiele oder jede Funktionskombination unterstützt.

## Energiesparmodi und Weckquellen abstimmen { #tune-low-power-modes-and-wake-sources }

**Ziel:** belastbare Messdaten zum Stromverbrauch erfassen, statt die Firmware allein deshalb für stromsparend zu halten, weil sie eine Sleep-Funktion aufruft.

**Zeit:** 2+ Stunden, plus Mess-Setup

**Ausgangspunkt:** `example/pm/classical`, `example/pm/raise_wrist`

1. Richten Sie die Strommessung wie im Artikel [Energiesparendes Design im Überblick](../../learn/low-power/overview.md#measuring-power-in-practice) beschrieben ein.
2. Erfassen Sie Vergleichswerte für den Start, den aktiven Betrieb, den Ruhezustand bei bestehender Verbindung, den Ruhezustand bei ausgeschaltetem Display und – sofern verfügbar – Deep Sleep.
3. Beginnen Sie mit dem klassischen PM-Beispiel und ermitteln Sie, wo `rt_pm_request(PM_SLEEP_MODE_IDLE)` den Eintritt in tiefere Energiesparmodi als IDLE blockiert und wo der passende Aufruf `rt_pm_release(PM_SLEEP_MODE_IDLE)` diese Beschränkung wieder aufhebt. Prüfen Sie außerdem, ob das Treiber-Framework den Ruhezustand bei aktiver Peripherie automatisch blockiert.
4. Untersuchen Sie anschließend das Raise-to-Wake-Beispiel: Wie erfasst es Beschleunigungsdaten, erkennt eine Handgelenkbewegung, schaltet das Display ein und kehrt in den Schlaf zurück? Prüfen Sie den tatsächlichen Ablauf der Abtastung und des Aufwachens; gehen Sie nicht von einem Interrupt aus.
5. Übertragen Sie denselben Energiespargrundsatz auf Ihr Produkt. Nutzen Sie, wo Hardware und Treiber es unterstützen, Interrupts oder ereignisgesteuerte Verarbeitung, um unnötige Timer und Polling-Schleifen zu vermeiden.
6. Messen Sie nach jeder Änderung erneut.
7. Ist Deep Sleep nicht so stromsparend wie erwartet, nutzen Sie `list_thread`, `list_device`, PM-Logs und Diagnoseinformationen zu den Weckquellen, um das noch aktive Subsystem zu finden.

**Erfolgskriterien:** Die Firmware erreicht den erwarteten Energiesparzustand, der Stromverbrauch ist über mehrere Durchläufe reproduzierbar, und Weckquellen sind beabsichtigt statt zufällig.

**Fehlerbehebung:** Ist eine Messung unauffällig, eine spätere jedoch nicht, prüfen Sie Fehler- und Wiederverbindungspfade, die Abschaltsequenz des Displays und das Beenden von Audiositzungen sowie alle nach dem Start angelegten Timer.

**Was Sie gelernt haben:** wie Sie von „sollte stromsparend sein“ zu nachgewiesenem Stromsparverhalten gelangen und eine PM-Anforderung aufspüren, die versehentlich nicht zurückgenommen wurde.

## OTA-Firmware-Updates über BLE hinzufügen { #add-ota-firmware-updates-over-ble }

**Ziel:** Firmware im Feld ohne Kabelverbindung aktualisieren.

**Zeit:** 2 Stunden

**Ausgangspunkt:** `example/ble/peripheral_with_ota`

1. Bauen und flashen Sie das OTA-fähige Peripherie-Beispiel.
2. Prüfen Sie vor dem Update, ob das normale BLE-Peripherieverhalten weiterhin funktioniert.
3. Lösen Sie ein OTA-Update aus und prüfen Sie, ob das Gerät anschließend das neue Image startet.
4. Testen Sie auf einem Gerät mit dokumentiertem Wiederherstellungsweg jeweils nur einen Unterbrechungsfall, etwa eine Trennung während der Übertragung oder das Verlassen der Funkreichweite. Unterbrechen Sie die Stromversorgung nur, wenn Board-Dokumentation und Wiederherstellungsdesign des Produkts den Test ausdrücklich als sicher ausweisen.
5. Prüfen Sie, welches Verhalten das Produkt nach einem unterbrochenen oder abgelehnten Update tatsächlich implementiert, etwa Wiederholung, Fortsetzung, Wiederherstellungsmodus oder Rollback. Setzen Sie Rollback nur voraus, wenn es im Boot- und Partitionsdesign umgesetzt ist.
6. Testen Sie OTA in drei Fällen: mit veralteten Bonding-Daten, nachdem Sie das Gerät auf dem Smartphone entfernt haben und nach einem Neustart des Geräts.
7. Falls Ihr Produkt bereits PAN für Daten verwendet, bewerten Sie den PAN-OTA-Pfad als separate Designentscheidung.

**Erfolgskriterien:** Nach einem erfolgreichen OTA-Update startet das neue Image. Ein unterbrochenes oder abgelehntes Update folgt der dokumentierten Wiederherstellungsrichtlinie des Produkts; der Nutzer kann den Gerätestatus erkennen. Gehen Sie nicht davon aus, dass jedes OTA-Design Rollback unterstützt.

**Fehlerbehebung:** Prüfen Sie das Partitionslayout, die Image-Signatur oder Integritätsprüfungen (falls verwendet), die Auswahl des zu startenden Images und das Wiederherstellungsverhalten, eine gegebenenfalls implementierte Rollback-Unterstützung, die Verbindungsparameter während der Übertragung sowie, ob Bonding- oder Speicheränderungen das Update überstehen.

**Was Sie gelernt haben:** wie Partitionslayout, Image-Validierung, Auswahl des zu startenden Images und Wiederherstellungsrichtlinie das OTA-Verhalten bestimmen – und warum ein erfolgreiches Update allein nicht belegt, dass sich das Gerät nach einer Unterbrechung wiederherstellen lässt.

## Ein individuelles Display-Modul in Betrieb nehmen { #bring-up-a-custom-display-module }

**Ziel:** ein neues LCD, AMOLED, EPD oder Memory-Display integrieren, statt ein bereits unterstütztes Referenzdisplay zu verwenden.

**Zeit:** 3+ Stunden

**Ausgangspunkt:** der vorhandene Display-Treiber im SDK, der Ihrem Panel am nächsten kommt

1. Beschaffen Sie das Panel-Datenblatt und ermitteln Sie Initialisierungssequenz, Timing-Parameter, Schnittstellentyp, Reset-Anforderungen und Einschaltsequenz.
2. Prüfen Sie, ob das gewählte SF32-Gerät und sein Gehäuse die erforderliche Schnittstelle und Pinbelegung unterstützen.
3. Übernehmen Sie den ähnlichsten vorhandenen Display-Treiber und ersetzen Sie die panelspezifische Initialisierungssequenz und Registerbelegung.
4. Testen Sie zuerst einfarbige Flächen. Debuggen Sie LVGL-Widgets erst, wenn das Panel einfache Muster korrekt anzeigt.
5. Prüfen Sie Farbreihenfolge, Byte-Reihenfolge, Ausrichtung, Adressfenster und das Verhalten bei partiellen Aktualisierungen.
6. Binden Sie LVGL aus „Subsystemintegration“, Übung 2, wieder ein.
7. Aktivieren Sie DMA, partielle Aktualisierung und ePicasso-Beschleunigung einzeln nacheinander, sofern der gewählte Chip, Displaypfad, Treiber und SDK diese Funktionen unterstützen.
8. Testen Sie die Abläufe für Display aus, Schlafen, Aufwachen und erneute Initialisierung.

**Erfolgskriterien:** Das Panel initialisiert sich nach Kaltstart und Reset zuverlässig, stellt bekannte Muster korrekt dar und übersteht Schlaf-/Aufwachzyklen ohne Bildfehler.

**Fehlerbehebung:** Sind die Farbflächen falsch, prüfen Sie Pixelformat, MADCTL-/Orientierungsbits, Byte-Reihenfolge, Befehls-/Datenleitungen, Reset-Timing und die Reihenfolge der Versorgungsspannungen, bevor Sie den UI-Code ändern.

**Was Sie gelernt haben:** wie man elektrische/sequenzielle Korrektheit von der UI-Framework-Konfiguration trennt.

## CPU-Auslastung profilieren und einen Absturz analysieren { #profile-cpu-usage-and-analyze-a-crash }

**Ziel:** Probleme debuggen, die sich mit angeschlossenem Debugger nicht ohne Weiteres reproduzieren lassen.

**Zeit:** 2 Stunden

**Ausgangspunkt:** `example/system/cpu_usage_profiler`, `example/system/coredump`

1. Führen Sie das CPU-Auslastungsprofiling-Beispiel mit einer kombinierten Workload aus „Subsystemintegration“ aus.
2. Identifizieren Sie, welcher Task CPU-Zeit verbraucht und ob dies Ihrer Erwartung entspricht.
3. Fügen Sie in einem Testzweig oder Wegwerf-Beispiel einen kontrollierten Fehler hinzu und erfassen Sie einen Core Dump.
4. Verwenden Sie die Dump-Analyse-Tools des SDK, um die fehlerhafte Funktion und den Call-Stack zu lokalisieren.
5. Vergleichen Sie den Absturzkontext mit `list_thread`, Logs und aktuellen Ereignissen.
6. Entfernen Sie den absichtlichen Fehler und wiederholen Sie den Ablauf mit einem echten, unregelmäßig auftretenden Problem, falls vorhanden.

**Erfolgskriterien:** Sie können sowohl ein Leistungsproblem als auch einen Absturz anhand erfasster Belege statt anhand von Vermutungen erklären.

**Fehlerbehebung:** Stellen Sie sicher, dass die Symbole zur geflashten Binärdatei passen, dass Logs die Firmware-Version enthalten, und dass die Optimierungsstufe bekannt ist, bevor Sie Call-Stacks interpretieren.

**Was Sie gelernt haben:** proaktives Profiling für langsame Pfade und Post-Mortem-Dump-Analyse für Fehler, die sich live nur schwer erfassen lassen.

## Ein Mehrfachverbindungs-BLE-Produkt bauen { #build-a-multi-connection-ble-product }

**Ziel:** mehr als eine gleichzeitige BLE-Rolle oder -Verbindung unterstützen.

**Zeit:** 2 Stunden

**Ausgangspunkt:** `example/ble/central_and_peripheral`, `example/ble/multi_connection`

1. Beginnen Sie mit dem BLE-Peripherieverhalten aus „Subsystemintegration“, Übung 3.
2. Ergänzen Sie eine zentrale Rolle, sodass das Gerät beispielsweise gegenüber einem Telefon als Peripherie und gegenüber einem Sensorzubehör als Zentrale auftritt.
3. Erweitern Sie auf mehrere gleichzeitige Verbindungen.
4. Erfassen Sie für jede Verbindung das Verbindungsintervall, die Slave-Latenz, den Überwachungs-Timeout und die Benachrichtigungsrate.
5. Ermitteln Sie mit dem SDK-Durchsatzbeispiel zunächst einen Referenzdurchsatz, bevor Sie die Ursache im Anwendungscode suchen.
6. Testen Sie Wiederverbindungen, den Ruhezustand des Smartphones, den Verlust des Zubehörs und gleichzeitige Benachrichtigungsbursts.

**Erfolgskriterien:** Das Gerät kann in allen vorgesehenen Rollen zuverlässig Verbindungen herstellen, trennen und erneut aufbauen. Die gewählten Verbindungsparameter bleiben auch bei kombinierter Aktivität stabil.

**Fehlerbehebung:** Achten Sie auf inkompatible Parameteranforderungen, zu viel Benachrichtigungsverkehr, blockierende Anwendungs-Callbacks und eine Energiesteuerung, die die Haupt-CPU bei jedem Verbindungsereignis aufweckt.

**Was Sie gelernt haben:** Unterstützte BLE-Konfigurationen des SiFli-SDK können Peripheral- und Central-Rollen kombinieren; manche unterstützen auch mehrere gleichzeitige Verbindungen. Prüfen Sie die Rollen- und Verbindungslimits für den Zielchip, die Stack-Konfiguration und das Beispiel. Teilen sich mehrere Verbindungen den Funkzeitplan, wirken sich die Kompromisse bei den Verbindungsparametern gemeinsam aus.

## Einen individuellen RT-Thread-Gerätetreiber schreiben { #write-a-custom-rt-thread-device-driver }

**Ziel:** ein Peripheriegerät ohne vorhandenen SDK-Treiber als reguläres RT-Thread-Gerät integrieren, statt es mit einem einmaligen Anwendungstrick einzubinden.

**Zeit:** 3+ Stunden

**Ausgangspunkt:** SDK-Anleitung zur Anwendungsentwicklung plus der architektonisch nächstliegende vorhandene Treiber

1. Prüfen Sie, wie das SDK Board-Definitionen, Pin-Muxing, Takte und Peripherietreiber organisiert.
2. Beginnen Sie mit dem vorhandenen Treiber, der Ihrer Peripherie architektonisch am nächsten kommt.
3. Halten Sie Buszugriff, Geräteregistrierung, Konfiguration und Anwendungslogik getrennt.
4. Registrieren Sie das Gerät und prüfen Sie, ob es unter `list_device` erscheint.
5. Testen Sie es auf dieselbe Weise, wie Sie ADC-, PWM-, I2C- und Speichergeräte in früheren Tutorials getestet haben.
6. Ergänzen Sie die Fehlerbehandlung für fehlende Hardware, ungültige Argumente, Zeitüberschreitungen und Suspend/Resume.
7. Falls der Treiber wiederverwendbar ist, verpacken Sie ihn als SDK-Komponente, statt ihn zwischen Produkten zu kopieren.

**Erfolgskriterien:** Der Anwendungscode kann den Treiber über das normale RT-Thread-Gerätemodell finden und verwenden. Bei Initialisierung, Betrieb, Fehlern und Sleep-/Wake-Übergängen verhält sich der Treiber vorhersehbar.

**Fehlerbehebung:** Wenn der Treiber nur aus einer Anwendungsdatei heraus funktioniert, umgeht er wahrscheinlich das Gerätemodell. Refaktorieren Sie ihn, bis er sich wie die eingebauten Geräte anfühlt.

**Was Sie gelernt haben:** wie Sie das SDK-Ökosystem sauber erweitern, ohne eine zusätzliche Wartungslast zu schaffen.

## Produktvalidierung: Freigabe-Checkliste { #advanced-release-checklist }

- [ ] Stromwerte sind gemessen, reproduzierbar und an benannte Testszenarien gebunden.
- [ ] OTA-Erfolg, Integritätsprüfungen und Wiederherstellung nach einer Unterbrechung wurden anhand der dokumentierten Produktrichtlinie getestet; ein Rollback gilt nur dann als verifiziert, wenn das Design ihn implementiert.
- [ ] Die Inbetriebnahme eigener Displays wird mit Testmustern validiert, bevor LVGL-Komplexität hinzukommt.
- [ ] Profiling- und Coredump-Workflows sind für das Team dokumentiert.
- [ ] Mehrfachverbindungs-Bluetooth wird über Wiederverbindung und Telefon-/Zubehör-Grenzfälle hinweg getestet.
- [ ] Eigene Treiber verwenden das RT-Thread-Gerätemodell und behandeln Sleep/Wake.
- [ ] Kombinierte Lasttests umfassen Display, Bluetooth, Speicher, Audio, Sensoren und gegebenenfalls KI.

## Wie es weitergeht { #where-to-go-next }

Damit verfügen Sie über das nötige Werkzeugset: Peripherie, Middleware, Koexistenztests, konsequentes Energiemanagement, OTA, Inbetriebnahme eigener Hardware, Absturzanalyse und Treiberintegration. Der [Beispiele-Katalog](../../develop/examples/index.md) und die [Grafikübersicht](../../learn/graphics/overview.md) dienen Ihnen anschließend als laufende Referenzen. Schlagen Sie dort gezielt nach, statt die Inhalte der Reihe nach durchzuarbeiten.
