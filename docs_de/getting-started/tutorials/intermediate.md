---
icon: lucide/trending-up
description: "SF32-Tutorials zur Integration mehrerer Subsysteme: Sensoren am I2C-Bus, ein einfacher LVGL-Bildschirm, ein BLE-Peripheriedienst, lokale Audiowiedergabe, Dateisystemspeicher und Koexistenztests."
tags:
    - Tutorials
---

# Subsystemintegration { #intermediate-tutorials }

Diese Tutorials setzen voraus, dass Sie die Inhalte zu [Erste Peripherie](beginner.md) beherrschen: GPIO, Shell, ADC-/PWM-Grundlagen und das Treibermuster `rt_device_find()`. Hier geht es von einzelnen Peripheriegeräten weiter zu Middleware und kombinierten Abläufen: Sensoren am I2C-Bus, grafische Benutzeroberfläche, BLE-Dienste, Audiowiedergabe, dauerhafte Datenspeicherung und einfache Koexistenztests.

Es geht nicht nur darum, jedes Subsystem einmal zum Laufen zu bringen. Sie sollen lernen, wie Firmware für SF32 typischerweise aufgebaut wird: von einem passenden SDK-Beispiel ausgehen, den Hardwarepfad überprüfen, ihn an die RT-Thread-Geräte- oder Middleware-Schicht anbinden und anschließend im Zusammenspiel mit dem restlichen Produkt testen.

Nutzen Sie diese Reihe, sobald die einzelnen Peripheriegeräte funktionieren und Integrationsrisiken relevant werden: gemeinsam genutzter Speicher, Timing, Stromverbrauch, boardspezifische Verdrahtung und Wechselwirkungen zwischen Middleware-Komponenten. Jede Übung soll eine klar abgegrenzte, testbare Funktionseinheit ergeben, nicht nur eine Demo, die auf einem Screenshot gut aussieht.

## Bevor Sie beginnen { #before-you-start }

Die C-Beispiele sind Ausschnitte und keine vollständigen Quelldateien. Ergänzen Sie die für Ihr Projekt und Ihre SDK-Version erforderlichen Header, Deklarationen, Fehlerbehandlung und Ressourcenfreigabe.

Beispielpfade und unterstützte Boards können je nach SDK-Version variieren. Prüfen Sie vor dem Build die aktuelle Liste „Supported Platforms“ sowie die boardspezifischen Hardware- und Konfigurationsanforderungen jedes Beispiels; die Unterstützung eines Beispiels bedeutet nicht automatisch, dass das Board auch die anderen Beispiele unterstützt.

<div align="center"><em>Tabelle: Bevor Sie beginnen</em></div>

<div align="center" markdown>

| Anforderung | Warum es wichtig ist |
|:------------|:---------------|
| Funktionierende Shell | Sie benötigen `list_thread`, `list_device`, Logs und schnelle Inspektion. |
| Bekanntermaßen funktionierender GPIO-Ein-/Ausgang | Viele Middleware-Demos benötigen weiterhin Taster, LEDs oder Interrupts. |
| Board-Schaltplan | Pins für I2C und Display, Audiopfad und Speicherlayout sind board-spezifisch. |
| Verifizierter Ausgangsstand | Bewahren Sie einen nachweislich funktionierenden Build auf, bevor Sie Funktionen kombinieren. |
| Möglichkeit, den Strom zu messen | Bei der Integration von Subsystemen kann sich der Ruhestrom ändern, auch wenn scheinbar alles funktioniert. |

</div>

## Einen Sensor über I2C lesen { #read-a-sensor-over-i2c }

**Ziel:** mit einem realen Gerät am I2C-Bus kommunizieren statt mit einem einzelnen GPIO-Pin.

**Zeit:** 30–45 Minuten

**Beispiel als Ausgangspunkt:** `example/hal/i2c/master` oder `example/rt_device/i2c/eeprom`

```c
struct rt_i2c_bus_device *bus = (struct rt_i2c_bus_device *)rt_device_find("i2c1");
struct rt_i2c_msg msgs[2] = { /* write register address, then read result */ };
rt_i2c_transfer(bus, msgs, 2);
```

Der Name `i2c1` dient nur als Beispiel. Verwenden Sie den von Ihrem Board registrierten I2C-Gerätenamen und prüfen Sie, ob `rt_device_find()` ein gültiges Gerät zurückgibt, bevor Sie den Bus verwenden.

1. Bestätigen Sie anhand des Datenblatts die Adresse des Sensors am I2C-Bus, das Registerlayout, die Versorgungsspannung und die erforderlichen Pull-ups.
2. Bestätigen Sie, welchen `i2cX`-Bus und welche Pins Ihr Board verwendet.
3. Passen Sie das EEPROM- oder Master-Beispiel für I2C an, um mit dem Sensor zu kommunizieren. Falls er ein Geräte-ID-Register besitzt, lesen Sie dieses zuerst; andernfalls beginnen Sie mit einem Register, dessen erwartetes Verhalten bekannt ist.
4. Dekodieren Sie eine echte Messung und geben Sie sie über die Shell aus.
5. Falls der Sensor einen Interrupt- oder Data-Ready-Pin hat, verbinden Sie ihn mit dem GPIO-Interrupt-Muster aus Erste Peripherie, Übung 2.
6. Ersetzen Sie regelmäßiges Polling nach Möglichkeit durch ereignisgesteuerte Lesevorgänge.

**Erfolgskriterien:** Die Firmware liest ein bekanntes Register erwartungsgemäß (wenn verfügbar, ein Geräte-ID-Register), dekodiert einen plausiblen Sensorwert und blockiert das System nicht, wenn das Gerät fehlt.

**Fehlerbehebung:** Wenn Lesevorgänge durchgehend ausschließlich `0xff`, ausschließlich `0x00` liefern oder ein Timeout auftritt, prüfen Sie Adressbreite, 7-Bit- vs. 8-Bit-Adressnotation, Pull-ups, Einschaltreihenfolge und ob eine andere Peripherie dieselben Pins belegt.

**Was Sie gelernt haben:** Mehrbyte-Transaktionen über I2C und wie man einen interruptgesteuerten GPIO-Pin mit einer Bus-Peripherie kombiniert.

## Einen einfachen LVGL-Bildschirm erstellen { #build-a-basic-lvgl-screen }

**Ziel:** ein echtes UI-Element auf dem Display darstellen, statt rohe Framebuffer-Schreibvorgänge.

**Zeit:** 45–60 Minuten

**Beispiel als Ausgangspunkt:** `example/multimedia/lvgl/lvgl_v8_examples`

```c
lv_obj_t *label = lv_label_create(lv_scr_act());
lv_label_set_text(label, "Hello, SF32!");
lv_obj_align(label, LV_ALIGN_CENTER, 0, 0);
```

1. Initialisieren Sie den Display-Treiber und prüfen Sie einfarbige Flächen, bevor Sie LVGL-Widgets debuggen.
2. Erstellen Sie ein Label und ein Button-Widget.
3. Verbinden Sie den Button-Callback, um den Labeltext zu ändern.
4. Fügen Sie eine kleine Animation hinzu und beobachten Sie die CPU-Auslastung oder das Frame-Timing über Shell-Tools.
5. Lesen Sie die Abschnitte der [Grafikübersicht](../../learn/graphics/overview.md) zu Pufferstrategie, partieller Aktualisierung und ePicasso, bevor Sie skalieren.

**Erfolgskriterien:** Der Bildschirm wird nach einem Reset zuverlässig initialisiert; konfigurierte Touch- oder Tastereingaben ändern den UI-Zustand, sofern sie verfügbar sind; und eine einfache Animation beeinträchtigt weder die Shell noch Bluetooth.

**Fehlerbehebung:** Trennen Sie Panel-Probleme von LVGL-Problemen. Wenn einfarbige Füllungen fehlschlagen, prüfen Sie Stromversorgung, Reset, Init-Sequenz, Pixelformat und Byte-Reihenfolge, bevor Sie den LVGL-Code anfassen.

**Was Sie gelernt haben:** das Objekt-/Ereignismodell von LVGL und die Display-Initialisierung, die jedem grafikintensiven Projekt vorausgeht.

## BLE-Advertising und Verbindung als Peripheriegerät { #advertise-and-connect-as-a-ble-peripheral }

**Ziel:** ein Smartphone oder ein anderes BLE-Zentralgerät über einen funktionierenden GATT-Dienst mit Ihrem Board verbinden.

**Zeit:** 45–60 Minuten

**Beispiel als Ausgangspunkt:** `example/ble/peripheral`

1. Beginnen Sie mit dem einfachen BLE-Peripherie-Beispiel und prüfen Sie das Advertising mit einer BLE-Scanner-App.
2. Verbinden Sie sich vom Telefon aus und bestätigen Sie, dass das Gerät mehrere Minuten stabil bleibt.
3. Wenn Sie Sensordaten senden möchten, richten Sie im GATT-Dienst des Beispiels eine passende Characteristic ein und aktualisieren Sie sie mit einem echten Messwert, etwa dem ADC-Wert aus Erste Peripherie, Übung 4, oder dem I2C-Sensorwert aus Übung 1 dieses Lernpfads.
4. Konfigurieren Sie die erforderlichen Eigenschaften der Characteristic. Falls Sie Benachrichtigungen verwenden, aktivieren Sie sie und prüfen Sie, ob das Telefon die Wertänderungen empfängt.
5. Testen Sie Trennung und Wiederverbindung sowie einen Reset des Boards während einer Verbindung.
6. Lesen Sie die [Bluetooth-Übersicht](../../learn/bluetooth/overview.md#gatt-services-and-the-sibles-framework), bevor Sie einen individuellen Dienst entwerfen.

**Erfolgskriterien:** Das Gerät sendet Advertising-Pakete, stellt eine Verbindung her, stellt den konfigurierten GATT-Dienst bereit, tauscht Daten entsprechend den ausgewählten Characteristic-Eigenschaften aus und kehrt nach Trennung/Wiederverbindung in einen sauberen Zustand zurück.

**Fehlerbehebung:** Prüfen Sie diese Fälle: veraltete Bonding-Daten, „Gerät vergessen“ auf dem Smartphone, ein Neustart des Boards während einer Verbindung und Änderungen der Verbindungsparameter. Viele BLE-Fehler zeigen sich erst nach der ersten erfolgreichen Verbindung.

**Was Sie gelernt haben:** den Ablauf Advertising -> Verbindung -> GATT-Benachrichtigung, der in den meisten BLE-Produkten verwendet wird.

## Lokale Audiodateien vom Speicher abspielen { #play-local-audio-from-storage }

**Ziel:** eine Audiodatei abspielen statt eines synthetisierten Tons.

**Zeit:** 45–60 Minuten

**Beispiel als Ausgangspunkt:** `example/multimedia/audio/local_music`

Die aktuelle Dokumentation nennt `sf32lb52-lchspi-ulp` als unterstützte Plattform für `example/multimedia/audio/mp3_sd_player`. Gehen Sie nicht davon aus, dass das Beispiel auch Ihr Board unterstützt. Prüfen Sie vor der Nutzung die Liste der [unterstützten Plattformen und Hardwarevoraussetzungen](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html).

1. Laden Sie eine kleine Audiodatei im Format WAV oder MP3 auf das vom Beispiel erwartete Speichermedium.
2. Bauen und flashen Sie das Beispiel.
3. Bestätigen Sie, dass die Wiedergabe startet, der Ton sauber ist und das Board bei Wiedergabebeginn nicht zurückgesetzt wird.
4. Binden Sie die Start-/Stopp-Logik der Wiedergabe in den Taster-Handler aus Erste Peripherie, Übung 2 ein.
5. Achten Sie auf Audioaussetzer durch Pufferunterläufe, während Shell-Logs ausgegeben oder Display-Inhalte aktualisiert werden.
6. Lesen Sie die [Audioübersicht](../../learn/audio/overview.md#playback-and-recording-basics), bevor Sie Abtastrate, Format oder Puffergröße ändern.

**Erfolgskriterien:** Die Wiedergabe lässt sich wiederholt starten, stoppen und fortsetzen, ohne Knackgeräusche oder Pufferunterläufe. Nach dem Stoppen bleibt kein Zustand mit hoher Leistungsaufnahme unnötig aktiv.

**Fehlerbehebung:** Wenn der Ton verzerrt ist, prüfen Sie Abtastrate, Bittiefe, Ausgangspfad, Codec-Konfiguration, Dateiformat und Puffergröße. Prüfen Sie außerdem, ob die Lesevorgänge aus dem Speicher den Decoder rechtzeitig mit Daten versorgen.

**Was Sie gelernt haben:** wie Audio-Middleware des SDK, gepufferte Wiedergabe und Dateidekodierung zusammenspielen.

## Persistente Daten speichern und abrufen { #store-and-retrieve-data-with-a-filesystem }

**Ziel:** Daten über Neustarts hinweg persistent halten, statt sie bei jedem Reset zu verlieren.

**Zeit:** 30–45 Minuten

**Beispiel als Ausgangspunkt:** `example/storage/littlefs` oder `example/storage/flashdb`

LittleFS eignet sich für dateiorientierte Daten. FlashDB ist eine eingebettete Datenbank mit Schlüssel-Wert-Modus (KVDB) und Zeitreihenmodus (TSDB); Speicher-Backend und Board-Unterstützung hängen von der Beispielkonfiguration ab. Prüfen Sie vor der Zielauswahl die offizielle Dokumentation zu [LittleFS NOR](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/littlefs/nor/README.html) und [FlashDB](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/flashdb/README.html).

Die folgenden POSIX-Aufrufe zeigen den Zugriff auf ein eingebundenes Dateisystem; es sind keine FlashDB-API-Aufrufe.

```c
int fd = open("/data/log.txt", O_WRONLY | O_CREAT | O_APPEND, 0666);
write(fd, buf, len);
close(fd);
```

1. Verwenden Sie ein Dateisystem wie LittleFS für dateibasierte Logs. Für strukturierte Einstellungen oder Datensätze mit Zeitstempel können Sie den KVDB- oder TSDB-Modus von FlashDB prüfen und das zu Board und Speicherbaustein passende Backend wählen.
2. Bestätigen Sie die vom Beispiel verwendete Partition und den Mount-Pfad.
3. Schreiben Sie einen kleinen Log-Eintrag oder eine Einstellung.
4. Trennen Sie das Board kurz von der Stromversorgung und bestätigen Sie, dass die Daten noch vorhanden sind.
5. Protokollieren Sie periodisch Sensormesswerte aus Tutorial 1.
6. Legen Sie eine einfache Aufbewahrungsregel fest, damit die Logs nicht unbegrenzt wachsen.

**Erfolgskriterien:** Daten überstehen einen Neustart, und die Firmware behandelt fehlenden, vollen oder frisch formatierten Speicher robust.

**Fehlerbehebung:** Prüfen Sie Partitionslayout, Mount-Pfad, Flash-Lösch- und Schreibfehler sowie das Schließen der Dateien. Achten Sie auch darauf, dass die Schreibfrequenz zur erwarteten Schreibfestigkeit des Speichers passt.

**Was Sie gelernt haben:** wann ein Dateisystem oder eine eingebettete Datenbank sinnvoll ist und wie Produktzustand Resets übersteht.

## Zwei Subsysteme absichtlich kombinieren { #combine-two-subsystems-on-purpose }

**Ziel:** zwei Subsysteme gleichzeitig betreiben und lernen, wie sie sich gegenseitig beeinflussen.

**Zeit:** 1 Stunde

**Beispiel als Ausgangspunkt:** Wählen Sie zwei der Tutorials 1–5 aus, die für Ihr Produkt am relevantesten sind.

1. Wählen Sie zwei Subsysteme, die Ihr Produkt tatsächlich zusammen benötigt, etwa BLE plus einen Sensor am I2C-Bus, oder LVGL plus Audiowiedergabe.
2. Verifizieren Sie zunächst jedes einzeln.
3. Kombinieren Sie sie mit minimalen Änderungen.
4. Testen Sie beide unter gleichzeitiger Last: etwa eine BLE-Benachrichtigung während eines Lesevorgangs am I2C-Bus, eine UI-Animation während der Audiowiedergabe oder einen Speicherschreibvorgang während einer Sensoraktualisierung.
5. Beobachten Sie CPU-Auslastung, Logs, Speicher und sichtbares Verhalten.
6. Vergleichen Sie Ihre Beobachtungen mit der [Bluetooth-Übersicht](../../learn/bluetooth/overview.md#coexistence-with-other-workloads), der [Grafik-Übersicht](../../learn/graphics/overview.md#graphics-validation-matrix) und der [Low-Power-Übersicht](../../learn/low-power/overview.md#what-drains-power-on-an-sf32-product).

**Erfolgskriterien:** Beide Subsysteme funktionieren weiterhin unter gleichzeitiger Aktivität, und der Ruhestrom kehrt nach Testende auf das erwartete Niveau zurück.

**Fehlerbehebung:** Achten Sie auf lange blockierende Aufrufe, übermäßige Protokollausgaben, eine Häufung von Timer-Ereignissen, Schreibvorgänge in latenzkritischen Pfaden und Fehler bei der Cache-Verwaltung gemeinsam genutzter Puffer.

**Was Sie gelernt haben:** Auch einzeln funktionierende Subsysteme können sich gegenseitig beeinträchtigen, wenn sie CPU-Zeit, Speicherbandbreite, Interrupts und Energiemanagement gemeinsam nutzen.

## Checkliste zur Subsystemintegration { #intermediate-integration-checklist }

- [ ] Jedes Tutorial beginnt mit einem SDK-Beispiel, dessen Funktion bereits bestätigt wurde.
- [ ] Zuerst wird jeder Hardwarepfad überprüft: ein bekanntes Sensorregister oder einen Messwert lesen, eine einfarbige Fläche anzeigen, BLE-Advertising, Audioausgabe oder Speicher einbinden.
- [ ] Die Funktion übersteht Reset und, sofern zutreffend, Trennung/Wiederverbindung.
- [ ] Fehlerpfade werden getestet: fehlender Sensor, fehlende Datei, getrenntes Telefon, voller Speicher.
- [ ] Mindestens ein kombinierter Lasttest wurde durchgeführt.
- [ ] Das Ruheverhalten wurde nach dem Stoppen jeder Funktion überprüft.

## Wie es weitergeht { #where-to-go-next }

[Produktvalidierung](advanced.md) behandelt die Optimierung des Stromverbrauchs, OTA-Updates, die Inbetriebnahme kundenspezifischer Displays und Treiber, Bluetooth mit mehreren Verbindungen sowie das Debugging in der Produktion. So werden funktionierende Demos zu produktionsreifer Firmware.
