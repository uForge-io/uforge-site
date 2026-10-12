---
icon: lucide/footprints
description: "Praxisnahe SF32-Peripherie-Tutorials nach hello_world: GPIO, FinSH, ADC, PWM, RTC und ein kleines Projekt mit einem Entwicklungsboard."
tags:
    - Tutorials
---

# Einstieg in die Peripherie { #beginner-tutorials }

Diese Tutorials knüpfen direkt an [Erste Schritte](../index.md) an. Sie sollten die SiFli-SDK-Toolchain bereits installiert und `hello_world` mindestens einmal geflasht haben sowie wissen, wie Sie die serielle Konsole öffnen. Jedes Tutorial ist bewusst kompakt gehalten: ein Konzept, ein Peripheriegerät und ein klares Erfolgskriterium.

Die Beispiele setzen ein Board der Klasse SF32LB52-DevKit-LCD voraus, etwa `sf32lb52-lcd_n16r8`. Wenn Sie ein anderes Board verwenden, ersetzen Sie den Board-Namen im Build-Befehl und prüfen Sie Pin-Namen, Peripherieinstanzen und Speicherlayout anhand der Support-Dateien dieses Boards.

Nutzen Sie diese Reihe, um verlässliche Arbeitsweisen zu entwickeln: Prüfen Sie jeweils ein Verhalten auf der konkreten Platine, legen Sie ein klares Erfolgskriterium fest und bewahren Sie eine nachweislich funktionierende Ausgangskonfiguration, bevor Sie zum nächsten Peripheriegerät übergehen. Die Übungen richten sich an Entwickler, die neu mit dem SF32 SDK arbeiten, auch wenn sie eingebettetes C bereits beherrschen.

## Bevor Sie beginnen { #before-you-start }

Verwenden Sie für jedes Tutorial denselben grundlegenden Ablauf:

```bash
scons --board=<board_name> -j8
# then flash with the download script or tool used in Get Started
```

Lassen Sie ein serielles Terminal geöffnet. Viele typische Anfangsprobleme lassen sich leichter beheben, wenn Sie die Ausgabe von `rt_kprintf()` und den FinSH-Prompt `msh>` sehen.

Die C-Beispiele sind Ausschnitte und keine vollständigen Quelldateien. Ergänzen Sie die für Ihr Projekt und Ihre SDK-Version erforderlichen Header, Deklarationen, boardspezifische Initialisierung, Rückgabewertprüfungen und Aufräumarbeiten.

<div align="center"><em>Tabelle: Bevor Sie beginnen</em></div>

<div align="center" markdown>

| Element | Prüfung |
|:-----|:------|
| Board-Name | Entspricht einer der unterstützten Board-Konfigurationen. |
| Serieller Port | Lässt sich problemlos öffnen und zeigt Boot-Ausgaben. |
| Flash-Tool | Sie können das Board wiederholt programmieren, ohne die Kabelverbindung zu ändern. |
| Schaltplan oder Board-Dateien | Verfügbar, bevor GPIO-, ADC-, PWM- oder RTC-Ressourcen ausgewählt werden. |
| Eine Änderung nach der anderen | Nach jeder kleinen Änderung bauen, flashen und verifizieren. |

</div>

## Eine LED mit GPIO blinken lassen { #blink-an-led-with-gpio }

**Ziel:** einen GPIO-Pin per Firmware steuern – das eingebettete Pendant zu einem ersten erfolgreichen Build.

**Zeit:** 15 Minuten

**Ausgangsbeispiel:** `example/hal/gpio` oder `example/rt_device/gpio`

Das RT-Thread-basierte SDK von SF32 stellt GPIO über die standardmäßige RT-Thread-**PIN-Device**-API bereit. Eine minimale Blink-Schleife sieht so aus:

```c
#include <rtthread.h>
#include <rtdevice.h>

#define LED_PIN GET_PIN(1, 0)  /* replace with your board's LED pin */

int main(void)
{
    rt_pin_mode(LED_PIN, PIN_MODE_OUTPUT);

    while (1)
    {
        rt_pin_write(LED_PIN, PIN_HIGH);
        rt_thread_mdelay(500);
        rt_pin_write(LED_PIN, PIN_LOW);
        rt_thread_mdelay(500);
    }
}
```

1. Kopieren Sie das am besten passende GPIO-Beispiel in Ihr Projektverzeichnis oder bearbeiten Sie es zum Lernen direkt.
2. Ermitteln Sie den LED-Pin anhand des Schaltplans oder der Board-Support-Dateien. Erraten Sie weder Port noch Pinnummer.
3. Bauen und flashen Sie mit demselben Board-Namen, der für `hello_world` verwendet wurde.
4. Prüfen Sie, ob die LED wie erwartet blinkt.
5. Ändern Sie die Verzögerung auf 100 ms, bauen Sie erneut und prüfen Sie, ob sich die sichtbare Blinkrate ändert.

**Erfolgskriterien:** Die LED wechselt wiederholt zwischen ein und aus, die serielle Konsole zeigt weiterhin normale Boot-Ausgaben und eine geänderte Verzögerung verändert die Blinkrate.

**Falls es nicht funktioniert:** Prüfen Sie die aktive Polarität, eine mögliche Transistoransteuerung der LED, eine etwaige anderweitige Belegung des Pins und ob der gewählte Board-Name zur verwendeten Hardware passt.

**Was Sie gelernt haben:** die PIN-Device-Abstraktion, boardspezifische Pin-Definitionen und den grundlegenden Ablauf aus Bearbeiten, Bauen, Flashen und Prüfen.

## Einen Taster mit GPIO-Eingang lesen { #read-a-button-with-gpio-input }

**Ziel:** einen digitalen Eingang lesen und auf einen Tastendruck reagieren.

**Zeit:** 20 Minuten

**Ausgangsbeispiel:** `example/rt_device/gpio`

Das Lesen eines Tasters verwendet dieselbe PIN-API im Eingangsmodus. Beginnen Sie mit einem einfachen Lesevorgang, um Verkabelung und Logikpegel zu prüfen:

Im SiFli-SDK konfiguriert die RT-Thread-PIN-Device-API den Pull-up oder Pull-down des Pads nicht über `rt_pin_mode()`. Bei einem low-aktiven Taster muss der Pull-up entweder auf dem Board vorhanden sein oder entsprechend der boardspezifischen Pinmux-Konfiguration mit `HAL_PIN_Set(...)` eingestellt werden. Pad, Funktion und CPU-Domäne sind boardabhängig; ziehen Sie die Board-Support-Dateien heran, statt eine Pinzuweisung blind zu übernehmen.

```c
rt_pin_mode(BUTTON_PIN, PIN_MODE_INPUT);

if (rt_pin_read(BUTTON_PIN) == PIN_LOW)
{
    /* button pressed, active-low */
}
```

Für Anwendungen, die über einen kurzen Test hinausgehen, sollten Sie einen Interrupt verwenden, statt den Pin fortlaufend in einer engen Schleife abzufragen. So kann die Firmware auf eine Eingangsflanke reagieren, ohne den Pin ständig erneut auszulesen. Wenn es das übrige Systemdesign erlaubt, die CPU zwischen Ereignissen schlafen zu legen, kann dies auch den Stromverbrauch senken:

```c
rt_pin_attach_irq(BUTTON_PIN, PIN_IRQ_MODE_FALLING, button_isr, RT_NULL);
rt_pin_irq_enable(BUTTON_PIN, PIN_IRQ_ENABLE);
```

1. Identifizieren Sie einen verfügbaren Taster- oder Eingangspin auf Ihrem Board.
2. Lesen Sie den Pin zunächst zyklisch aus und geben Sie den Rohwert aus, während Sie den Taster drücken und loslassen.
3. Prüfen Sie, ob der Taster high-aktiv oder low-aktiv ist.
4. Wechseln Sie zu einem Interrupt-Handler, sobald das grundlegende Lesen funktioniert.
5. Schalten Sie bei jedem Tastendruck die LED aus Tutorial 1 um.
6. Fügen Sie eine einfache Entprellstrategie hinzu, indem Sie entweder Ereignisse für ein kurzes Intervall ignorieren oder den Pegel nach einer kurzen Verzögerung erneut prüfen.

**Erfolgskriterien:** Ein physischer Tastendruck löst genau eine beabsichtigte Firmware-Aktion aus, ohne wiederholte Auslösungen durch Prellen.

**Falls es nicht funktioniert:** Prüfen Sie, ob der benötigte Pull-up oder Pull-down auf dem Board vorhanden oder über den Pinmux konfiguriert ist. Kontrollieren Sie anschließend Tasterpolarität, Interrupt-Flankenauswahl und ob der Pin mit Boot-Modus, Debug oder einer anderen Peripherie geteilt wird.

**Was Sie gelernt haben:** die Konfiguration digitaler Eingänge, den Unterschied zwischen high-aktiv und low-aktiv, interruptgesteuerte Eingaben und warum kontinuierliches Abfragen unnötig Strom verbrauchen kann. Den systemweiten Hintergrund erläutert die [Übersicht zum Energiesparen](../../learn/low-power/overview.md#sleep-aware-firmware-design).

## Die Shell verwenden und Debug-Ausgaben drucken { #use-the-shell-and-print-debug-output }

**Ziel:** sich mit der FinSH-Konsole und `rt_kprintf()` vertraut machen, bevor das Debuggen schwieriger wird.

**Zeit:** 15 Minuten

**Ausgangspunkt:** `example/system/finsh`

Die **FinSH**-Shell von RT-Thread stellt über denselben UART wie die Bootmeldungen einen interaktiven Prompt `msh>` bereit. Machen Sie sich frühzeitig mit folgenden Vorgehensweisen vertraut:

- Verwenden Sie `rt_kprintf()` für sparsame Debug-Ausgaben, statt direkt auf den UART zu schreiben.
- Verwenden Sie eingebaute Shell-Befehle wie `list_thread`, `list_device` und Speicher-/Statusbefehle, um das laufende System zu inspizieren.
- Halten Sie Logs kurz und aussagekräftig; übermäßiges Logging kann Timing- und Stromverbrauchsverhalten verändern.

1. Flashen Sie eines der vorherigen Beispiele und öffnen Sie Ihr serielles Terminal erneut.
2. Drücken Sie die Eingabetaste, um den `msh>`-Prompt zu erhalten.
3. Führen Sie `list_thread` und `list_device` aus.
4. Fügen Sie `rt_kprintf()`-Aufrufe zum Taster-Handler aus Tutorial 2 hinzu.
5. Prüfen Sie, ob die Logs beim Drücken des Tasters erscheinen.

**Erfolgskriterien:** Sie können Threads und Geräte über die Shell inspizieren und Ihre eigenen Log-Nachrichten mit physischen Ereignissen korrelieren.

**Falls es nicht funktioniert:** Prüfen Sie die serielle Baudrate, die Port-Auswahl, ob die Shell-Komponente aktiviert ist und ob ein anderes Tool den seriellen Port blockiert.

**Was Sie gelernt haben:** wie Sie ein laufendes System ohne angeschlossenen Debugger untersuchen und unkomplizierte Logs zur Fehlersuche nutzen, statt Probleme durch blindes Ändern der Firmware zu erraten.

## Einen analogen Sensor mit ADC lesen { #read-an-analog-sensor-with-adc }

**Ziel:** eine analoge Spannung von einem Potentiometer, einem einfachen Sensor oder einem Eingang zur Akkuspannungsmessung abtasten.

**Zeit:** 20 Minuten

**Ausgangsbeispiel:** `example/rt_device/adc/channel`

Aktivieren Sie für dieses RT-Thread-Beispiel `BSP_USING_ADC`, `BSP_USING_ADC1` und `RT_USING_ADC`; andernfalls registriert das SDK `bat1` nicht. Beim SF32LB52 ist Kanal 7 intern mit VBAT verbunden und daher kein allgemeiner externer Sensoreingang. Wählen Sie einen ADC-Kanal und Pin-Mux, die vom konkreten Chip und Board unterstützt werden. Im dokumentierten SF32LB52-Beispiel wird Kanal 0 mit PA28 verwendet. Im aktuellen SiFli-SDK-Beispiel liefert `rt_adc_read()` einen auf 0,1 mV skalierten Spannungswert und keine rohen ADC-Zählwerte. Prüfen Sie Einheit und Umrechnung in der Dokumentation der konkreten Chip- und Treiberversion.

```c
rt_adc_device_t adc = (rt_adc_device_t)rt_device_find("bat1");
rt_adc_enable(adc, channel);
rt_uint32_t voltage_0p1mV = rt_adc_read(adc, channel);
```

1. Identifizieren Sie einen ADC-fähigen Pin und Kanal auf Ihrem Board.
2. Prüfen Sie den zulässigen Eingangsspannungsbereich und ob ein Spannungsteiler oder eine analoge Eingangsschaltung vorhanden ist.
3. Ermitteln Sie das registrierte ADC-Gerät, aktivieren Sie den Kanal und lesen Sie den Wert aus.
4. Wenden Sie die für den Treiber dokumentierte Umrechnung an. Im aktuellen SF32LB52-Beispiel erhalten Sie Millivolt, indem Sie den Rückgabewert durch 10 teilen. Wenden Sie nicht zusätzlich eine Formel für rohe ADC-Zählwerte mit Referenzspannung und Auflösung an. Berücksichtigen Sie einen externen Spannungsteiler, wenn Sie die Spannung vor dem Teiler bestimmen.
5. Geben Sie das Ergebnis über die Shell aus Tutorial 3 aus.
6. Verändern Sie die Eingangsspannung langsam und prüfen Sie, ob sich der Messwert gleichmäßig ändert.

**Erfolgskriterien:** Der ausgegebene Wert ändert sich in die erwartete Richtung und entspricht nach Anwendung der dokumentierten Skalierung und eines etwaigen Board-Spannungsteilers einer plausiblen Eingangsspannung.

**Falls es nicht funktioniert:** Prüfen Sie Pin-Muxing, Kanalnummer, dokumentierte Skalierung und Kalibrierung des Treibers, Eingangsbereich, ob der Eingang offen (floating) ist, und ob der Sensor eine Versorgung oder Einschwingzeit vor der Abtastung benötigt.

**Was Sie gelernt haben:** das Muster `rt_device_find()`, das in RT-Thread-Gerätetreibern durchgängig verwendet wird. Sie werden dieses Muster für I2C, SPI, PWM, Speicher und eigene Treiber wiederverwenden.

## Einen PWM-Ausgang ansteuern { #drive-a-pwm-output }

**Ziel:** ein PWM-Signal erzeugen, um eine LED zu dimmen oder einen einfachen Summer anzusteuern.

**Zeit:** 20 Minuten

**Ausgangsbeispiel:** `example/rt_device/pwm`

Der PWM-Gerätename hängt davon ab, welcher Timer-Treiber für das Board aktiviert ist. Das SDK verwendet Namen wie `pwm3`, `pwmlp1` und `pwma1`; `pwm3` im folgenden Beispiel ist nur ein Beispielname und nicht universell. Prüfen Sie den registrierten Gerätenamen und das Pin-Muxing in der Board-Konfiguration.

```c
struct rt_device_pwm *pwm = (struct rt_device_pwm *)rt_device_find("pwm3");
rt_pwm_set(pwm, channel, period_ns, pulse_ns);
rt_pwm_enable(pwm, channel);
```

1. Wählen Sie einen PWM-fähigen Kanal und prüfen Sie das Pin-Muxing.
2. Wählen Sie eine zum Peripheriegerät passende Periode: hoch genug, um sichtbares LED-Flackern zu vermeiden, oder im hörbaren Bereich für einen Summer.
3. Variieren Sie den Tastgrad, um die LED heller und dunkler zu stellen.
4. Probieren Sie einige feste Töne an einem Summer aus, indem Sie die Periode ändern.
5. Deaktivieren Sie die PWM und prüfen Sie, ob der Ausgang in einen sicheren Ruhezustand zurückkehrt.

**Erfolgskriterien:** Eine Änderung des Tastgrads ändert die Helligkeit, oder eine Änderung der Periode ändert den Ton, und das Deaktivieren der PWM lässt den Ausgang im erwarteten Zustand zurück.

**Falls es nicht funktioniert:** Prüfen Sie, ob der Pin der richtigen PWM-Instanz zugeordnet ist, ob die Kanalnummer stimmt, ob Periode und Pulsbreite in Nanosekunden angegeben sind und ob die externe Last einen Treibertransistor benötigt.

**Was Sie gelernt haben:** die Konfiguration von Periode/Tastgrad und dasselbe Gerätetreiber-Muster aus Tutorial 4, angewendet auf eine andere Peripherieklasse.

## Uhrzeit mit der RTC lesen und einstellen { #keep-time-with-the-rtc }

**Ziel:** die Echtzeituhr des Chips auslesen und einstellen.

**Zeit:** 15 Minuten

**Ausgangsbeispiel:** `example/rt_device/rtc`

```c
time_t now = time(RT_NULL);
struct tm *tm_now = localtime(&now);
rt_kprintf("%04d-%02d-%02d %02d:%02d:%02d\n",
           tm_now->tm_year + 1900, tm_now->tm_mon + 1, tm_now->tm_mday,
           tm_now->tm_hour, tm_now->tm_min, tm_now->tm_sec);
```

1. Stellen Sie die RTC-Zeit einmal über einen unterstützten Weg ein, zum Beispiel mit einem Shell-Befehl.
2. Geben Sie die aktuelle Uhrzeit periodisch aus.
3. Schalten Sie das Board aus und wieder ein und prüfen Sie, ob die Uhrzeit erhalten bleibt.
4. Falls sie nicht erhalten bleibt, prüfen Sie vor einer Firmwareänderung die Backup-Stromversorgung des Boards.

Setzen Sie die RTC beim Test der Zeiterhaltung nicht bei jedem Start bedingungslos zurück. Andernfalls lässt sich nicht feststellen, ob die vorherige Zeit erhalten blieb.

**Erfolgskriterien:** Die Uhrzeit läuft bei eingeschaltetem Board normal weiter; das Verhalten bei der Zeiterhaltung entspricht der Hardware des Boards.

**Falls es nicht funktioniert:** Prüfen Sie, ob die RTC-Komponente aktiviert ist, welche Taktquelle verwendet wird, ob eine Backup-Versorgung vorhanden ist und ob das Board den RTC-Zustand beim Start zurücksetzt.

**Was Sie gelernt haben:** die Standard-Zeit-API von C auf Basis des RT-Thread-RTC-Geräts sowie ein erstes Beispiel dafür, wie das Firmware-Verhalten vom Hardwaredesign abhängt.

## Miniprojekt: Tastergesteuerter Sensor-Logger { #mini-project-button-controlled-sensor-logger }

Nach Abschluss der sechs kurzen Tutorials kombinieren Sie sie zu einem kleinen Projekt:

1. Die LED beim Booten blinken lassen.
2. Mit dem Taster die Abtastung starten oder stoppen.
3. Bei aktiver Abtastung jede Sekunde einen ADC-Wert lesen.
4. Zeitgestempelte Messwerte über FinSH ausgeben.
5. Mit PWM-Helligkeit oder Summer-Ton anzeigen, ob die Abtastung aktiv ist.

**Erfolgskriterium:** Das Projekt läuft mehrere Minuten ohne wiederholte Tasterauslösungen, unkontrollierte Log-Ausgaben oder unerwartete Resets.

## Checkliste: Erste Peripheriegeräte in Betrieb nehmen { #beginner-bring-up-checklist }

- [ ] Board-Name, serieller Port und Flash-Ablauf wurden erfolgreich geprüft.
- [ ] GPIO-Ausgang funktioniert an einer echten LED oder einem gemessenen Pin.
- [ ] GPIO-Eingang funktioniert mit geprüfter Polarität und Entprellung.
- [ ] Die FinSH-Shell ist nutzbar, und `list_thread` / `list_device` funktionieren.
- [ ] ADC-Messwerte sind plausibel und in physikalische Einheiten umgerechnet.
- [ ] PWM-Perioden-/Tastgrad-Einstellungen erzeugen die erwartete physische Ausgabe.
- [ ] Das RTC-Verhalten einschließlich der Grenzen der Zeiterhaltung ist bekannt.

## Wie es weitergeht { #where-to-go-next }

Wenn Sie diese Grundlagen sicher beherrschen, fahren Sie mit der [Subsystemintegration](intermediate.md) fort. Dort kombinieren Sie Peripheriegeräte mit Middleware: Sensoren über I2C, LVGL, BLE, Audiowiedergabe, Speicher und gezielte Koexistenztests.
