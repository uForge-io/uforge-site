---
icon: lucide/file-search-2
title: "Protokolle erfassen und Abstürze analysieren"
description: "Zusammengehörige Logs und Speicherabbilder erfassen, den Absturzkontext wiederherstellen und Assertions oder Hard Faults mit SiFli-SDK-Tools analysieren."
tags: [Entwicklung, SiFli-SDK, Anwendungshinweise, Debugging]
---

# Protokolle erfassen und Abstürze analysieren { #capture-logs-and-analyze-crashes }

Die SDK-Leitfäden `debug_logging` und `crash_analysis` ergänzen sich: Logs zeigen, was die beiden Kerne getan haben. Ein Speicherabbild ermöglicht es dem Debugger, den Ausführungskontext zum Fehlerzeitpunkt wiederherzustellen. Bewahren Sie zu jeder Erfassung das exakt passende ELF, die Map- und Symboldateien, die SDK-Revision, das Chipmodell, die Konfiguration und die Platinenrevision auf.

## Debug-Verbindung wählen { #choose-a-debug-connection }

<div align="center" markdown>

<em>Tabelle: Debug- und Log-Verbindungen nach SF32-Familie</em>

| Familie | Debug- und Log-Verhalten |
|---|---|
| SF32LB52x, SF32LB56x, SF32LB58x | Der zugehörige SiFli-Leitfaden dokumentiert UART-Erfassung, `SifliUsartServer`/`AssertDumpUart` sowie die Wiederherstellung mit J-Link/Trace32. Verwenden Sie den Transport, der im ausgewählten Schlafzustand verfügbar bleibt. |
| SF32LB55x | SWD kann mit `$SDK_ROOT/tools/segger/jlink_hcpu_a0.bat` und `jlink_lcpu_a0.bat` zwischen HCPU und LCPU umgeschaltet werden. Die ROM-Konsole des LCPU ist UART3 mit 1 000 000 Baud; HCPU kann UART1/2 oder SWD verwenden. Da SWD PB-IO nutzt, halten Sie LPSYS aktiv oder im Light Sleep, solange die Verbindung besteht. |

</div>

Wenn LPSYS aus dem Standby aufwacht, kehrt SWD zu HCPU zurück. Ein J-Link-Reset schaltet den ausgewählten Kern nicht selbst um. Ist die asynchrone Log-Ausgabe aktiviert, kann ein Assert-Dump abgeschnitten werden. Verwenden Sie für den Fehlerpfad daher einen synchronen oder persistent gespeicherten Mitschnitt.

## Ein Live- oder Post-Mortem-Paket erfassen { #capture-a-live-or-post-mortem-package }

Erfassen Sie bei aktuellen SDK-Releases über UART oder J-Link mit `sdk.py`:

!!! note "Geltungsbereich des Beispiels"
    Der folgende Befehl ist ein Beispiel für SF32LB52/LB525. Behalten Sie die Befehlsstruktur bei, ersetzen Sie aber Chip/Modell, Kern, Transport und ELF durch Werte, die von der Zielfamilie und dem SDK-Release unterstützt werden.

```text
sdk.py crash-dump capture-live --transport uart --probe /dev/ttyUSB0 \
  --chip SF32LB52 --chip-model LB525 \
  --output /tmp/live-crash --elf build_hcpu/main.elf
```

Fügen Sie `--include-psram --psram-size 8MB` hinzu, wenn das Ziel PSRAM verwendet. Mit J-Link lässt sich `--transport jlink --jlink-ip 127.0.0.1:19025` verwenden; wählen Sie den betroffenen Kern mit `--core hcpu` oder `--core lcpu` aus. Das Ausgabeverzeichnis sollte die erfasste Binärdatei, Core-ELF/AXF, `log.txt`, `manifest.json` und `sdk_manifest.json` enthalten.

Verwenden Sie bei älteren SDKs das familienspezifische Verfahren aus dem Quellleitfaden:

- UART: `SifliUsartServer` oder `AssertDumpUart` kann ein Assertion-Paket exportieren, solange die Konsole verfügbar ist.
- J-Link/SWD: Fügen Sie J-Link zu `PATH` hinzu und führen Sie das Skript für die Zielfamilie aus; für SF32LB55x beispielsweise `$SDK_ROOT/tools/crash_dump_analyser/script/save_ram_55x.bat`. Das passende Skript sichert RAM, EPIC-Register und PSRAM.
- Stellen Sie sicher, dass `RTOS → RT-Thread Kernel → Memory Management → Enable memory trace` aktiviert ist, wenn Nachweise für Heap-Lecks benötigt werden.

Bei skriptbasierter Erfassung muss die `.jlink`-Datei zur Zielfamilie, zur PSRAM-Konfiguration und zur Verbindungsart passen. Für eine IP-Verbindung über `SifliUsartServer` ist das IP-Skript zu verwenden, für eine direkte J-Link-Verbindung über USB das USB-Skript. Bei einer unpassenden Kombination kann die Erfassung fehlschlagen.

![SF32LB52x-Option Memory Trace im menuconfig](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_mem_trace.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — Memory Trace vor der Fehlerreproduktion aktivieren, wenn Heap-Nachweise benötigt werden.</em></div>

Für eine UART-Erfassung müssen in der Regel das serielle Hilfsprogramm, die Serveradresse und der Zielkern übereinstimmen. Die folgenden Screenshots aus dem Leitfaden helfen, die Verbindungseinstellungen zu prüfen:

![SiFli_Trace- und SifliUsartServer-Tool-Speicherort](../../../../assets/develop/app-notes/crash-analysis/Sifli_Trace.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — Verzeichnis der Tools.</em></div>

![SifliUsartServer SF32LB52x-Verbindungseinstellungen](../../../../assets/develop/app-notes/crash-analysis/UsartServer52.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — serieller Port, Baudrate, Serveradresse und Debug-Kern müssen zum erfassten Ziel passen.</em></div>

![RAM-Sicherungsskript des Crash-Dump-Analyzers](../../../../assets/develop/app-notes/crash-analysis/save_ram_uart_52.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — das Verzeichnis enthält familien- und verbindungsspezifische Skripte, etwa `save_ram_55x.bat`, `save_ram_58x.bat` und `save_ram_uart_52x.bat`. Wählen Sie das zum Ziel und zur Verbindung passende Skript.</em></div>

## Den Kontext wiederherstellen und analysieren { #restore-and-analyze-the-context }

Konvertieren Sie ein erfasstes Paket in eine für den Debugger lesbare Core-Datei und analysieren Sie diese mit der passenden ELF:

```text
sdk.py crash-dump readcore --package /tmp/live-crash \
  --elf build_hcpu/main.elf --output /tmp/live-crash/coredump.elf
sdk.py crash-dump analyze --core /tmp/live-crash/coredump.elf \
  --elf build_hcpu/main.elf
```

Der ältere Trace32-Workflow lädt ein HCPU-Assertion-Paket über die HCPU-Assertion-Schaltfläche (HA) und `run_next_step`; verwenden Sie für einen LCPU-Dump die LCPU-Wiederherstellungskonfiguration. Wird kein Exception-Stack angezeigt, überprüfen Sie Kernauswahl, ELF und Speicherbereiche, bevor Sie Register interpretieren.

![Trace32-Beispiel für die Auswahl des Erfassungsskripts](../../../../assets/develop/app-notes/crash-analysis/dump_select.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — Auswahl des J-Link-/Trace32-Erfassungsskripts.</em></div>

![Trace32-HCPU-Assertion-Fenster](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_hcpu_window.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — Callstack, Thread-Liste, Heap und Fehlerursache nach der Wiederherstellung gemeinsam betrachten.</em></div>

## Frühzeitig beim Booten oder bei einer vermuteten Race Condition anhalten { #stop-early-during-boot-or-a-suspected-race }

Um die Initialisierung zu debuggen, entfernen Sie das Kommentarzeichen vor der ersten Anweisung im passenden `Reset_Handler`, sodass daraus `B .` wird:

Die folgenden Startdateipfade gelten für SF32LB55x; verwenden Sie für eine andere Familie die entsprechenden Startdateien.

- HCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_hcpu.S`
- LCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_lcpu.S`

Verbinden Sie J-Link und erhöhen Sie den Programmzähler (PC) um zwei Bytes, um fortzufahren. In C erzeugt `_asm("B .");` denselben beabsichtigten Halt. Ersetzen Sie ihn nicht durch `while (1);`; der Compiler kann Code nach der Schleife wegoptimieren.

## Die Nachweise auswerten { #read-the-evidence }

Ein Assertion-Dump enthält normalerweise die Assertion-Funktion und -Zeile, die Thread-Tabelle, Mailbox- und Message-Queue-Zustand, Mutexe, Semaphore, Heap-Nutzung und CPU-Register. Ordnen Sie den Fehler-PC der genau passenden ELF zu und prüfen Sie anschließend, wie viel Stack-Reserve verbleibt, welcher Task die Ressource hält, auf die ein blockierter Task wartet, welche Einträge in den Queues stehen und welcher Logeintrag zuletzt vor dem Fehler ausgegeben wurde. Bewahren Sie den Rohdump auf, bevor Sie ihn symbolisieren.

Für die interaktive Untersuchung kann Ozone die HCPU-/LCPU-ELF sowie die passende SVD-Datei für den Cortex-M33 mit FPU aus `$SDK_ROOT/tools/svd_external` laden. Verwenden Sie UART oder `SifliUsartServer`, wenn der Zustand des Kerns keine SWD-Verbindung zulässt. ULOG kann UART verwenden. Für Segger RTT aktivieren Sie die RTT-Unterstützung und wählen `segger` als RT-Thread-Log-Gerät aus.

## Bus- und Speicherfehler instrumentieren { #instrument-bus-and-memory-failures }

Der Bus-Monitor des SDK kann Zugriffe erfassen, die zu einem Bus-Fault führen. Registrieren Sie einen Callback mit `dbg_busmon_reg_callback` und verwenden Sie dann `dbg_busmon_read` und `dbg_busmon_write` aus dem Leitfadenbeispiel, um den betreffenden Adressbereich zu untersuchen. Kombinieren Sie dies mit Heap-Tracing und dem Crash-Paket; ein Registerdump ohne Symbole oder Speicherkontext ist selten ausreichend.

![Trace32-Beispiel für Heap-Callstack](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_heap_callstack.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — Heap-Callstack und Speicherfenster.</em></div>

Offizielle Quellen nach Familie: [SF32LB52x Crash-Analyse](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/crash_analysis.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/crash_analysis.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/crash_analysis.html) und [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/crash_analysis.html) sowie der passende [Leitfaden zu Debugging und Logging](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/debug_logging.html).
