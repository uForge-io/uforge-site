---
icon: lucide/audio-lines
description: "Praxisleitfaden zu Audio-Server und DMA-Puffern in SF32: störungsfreie Wiedergabe und Aufnahme sowie Koexistenz mit Bluetooth und Grafikverarbeitung."
tags:
    - Audio
---

# Audio-Server und Pufferung { #audio-server-and-buffering }

Lesen Sie diese Seite, nachdem Sie in der [Audioübersicht](overview.md) Audioschnittstelle und Anwendungsszenario festgelegt haben. Sie beschreibt, wie Anwendungscode, Audio-Server-Sitzungen, DMA-Puffer und Hardware-Audiopfad zur Laufzeit zusammenarbeiten.

**Geltungsbereich SDK-spezifischer Aussagen:** Die folgenden API-Details sind in der aktuellen SiFli-SDK-Dokumentation für SF32LB52x beschrieben. Prüfen Sie sie für die verwendete Chipfamilie und SDK-Version anhand von `audio_server.h`, Implementierung und Konfiguration. Empfehlungen zu Puffergrößen, Ablaufplanung und Cache-Management sind technische Hinweise; Audio Server garantiert nicht auf jedem Ziel dasselbe Verhalten oder dieselben Eigentumsregeln für Puffer.

## Zuständigkeiten in der Sitzung { #session-ownership }

Trennen Sie die Anwendungslogik von der Übertragung des Datenstroms. Die Anwendung entscheidet, wann Wiedergabe oder Aufnahme beginnt oder endet und wie Zustandswechsel behandelt werden. Der Audio-Server koordiniert die Sitzung, DMA überträgt Sample-Blöcke und der Treiber konfiguriert die Hardware. Während eines aktiven Streams dürfen UI, Bluetooth-Callbacks und Lesezugriffe auf das Dateisystem nicht direkt auf Codec-Register zugreifen.

<div align="center"><em>Tabelle: Zuständigkeit für die Puffer</em></div>

<div align="center" markdown>

| Verantwortungsgrenze | Zuständig | Prüffrage |
|:---------|:------|:----------------|
| Quelldaten | Anwendung, Decoder oder Speicher-Task | Wird die Wiedergabewarteschlange rechtzeitig nachgefüllt, bevor sie leerläuft? |
| Audio-Server-Schreibcache, falls konfiguriert | Audio Server; Größe durch Anwendungskonfiguration | Ist `write_cache_size` für dieses SDK gültig, und wertet die Anwendung jedes Ergebnis von `audio_write()` aus? |
| Puffer während der Übertragung | DMA-/Audio-Treiber | Bleibt der Puffer während der gesamten Übertragung stabil und cache-kohärent? |
| Puffer nach Abschluss der Übertragung | Anwendungs- oder Verarbeitungs-Task | Sind Wiedergabedaten nachgefüllt oder Aufnahmedaten verarbeitet, bevor DMA den Bereich erneut nutzt? |
| Sitzungszustand | Audio-Server plus Anwendungsrichtlinie | Verhindern wiederholte Start-, Stopp-, Fehler- und Beendigungsanforderungen ein doppeltes Schließen oder Freigeben von Ressourcen? |

</div>

## Eine Pufferstrategie wählen { #choose-a-buffer-strategy }

Sofern der Treiber sie unterstützt, ist Doppelpufferung ein sinnvoller Ausgangspunkt: DMA überträgt einen Bereich, während die Software im anderen Wiedergabedaten vorbereitet oder Aufnahmedaten verarbeitet. Unterscheiden Sie die PCM-Warteschlange der Anwendung vom DMA-Puffer des Treibers. Das Schreiben an Audio Server belegt für sich genommen nicht, dass die Daten ohne Kopiervorgang per DMA übertragen werden.

Erhöhen Sie die Kapazität der Warteschlange nur, wenn die Zugriffslatenz des Speichermediums, die Decodierzeit, Jitter beim Bluetooth-Transport oder Schwankungen in der Ablaufplanung dies erfordern. Die Kapazität kostet Speicher; die tatsächlich in der Warteschlange befindliche Audiomenge bestimmt die Wartezeit. Zusätzliche Puffer erhöhen die Latenz nicht automatisch. Verwenden Sie die framebasierten Berechnungen der [Audioübersicht](overview.md#buffer-and-latency-budget) mit Kanalzahl und gespeicherten Bytes pro Sample.

Messen Sie Blockdauer, maximale Vorbereitungs- oder Verarbeitungszeit und zulässige Ende-zu-Ende-Latenz. Leiten Sie jede Frist aus den Meldungen des Zieltreibers zum Nachfüllen des Puffers und zum Abschluss der Übertragung sowie aus der Wiederverwendungsreihenfolge ab. Wenn der Treiber Callbacks für Halb- und Vollübertragung bereitstellt, planen Sie die Verarbeitung anhand dieser Übergänge; betrachten Sie nicht nur das Ende der aktuellen Übertragung als Frist. Wiedergabedaten müssen bereitstehen, bevor DMA sie benötigt; Aufnahmedaten müssen verarbeitet oder kopiert sein, bevor DMA sie überschreibt. Planen Sie zeitlichen Spielraum ein und untersuchen Sie auch gelegentliche Unterläufe im Wiedergabepuffer (Underruns) und Überläufe im Aufnahmepuffer (Overruns).

Beachten Sie für Speicher, den die Anwendung oder der Treiber direkt an DMA übergibt, die Cache- und Eigentumsregeln des Ziels: Schreiben Sie geänderte Cache-Zeilen mit Wiedergabedaten vor dem DMA-Zugriff zurück (Clean), bereiten Sie Empfangspuffer nach Vorgabe vor und invalidieren Sie bei Bedarf den Cache abgeschlossener Aufnahmedaten vor dem CPU-Zugriff. Diese Anforderungen hängen von SoC, Speicherbereich und Treiber-API ab. Führen Sie für Puffer, die Audio Server oder dem Treiber gehören, keine manuelle Cache-Wartung durch, sofern die jeweilige API dies nicht verlangt. Verändern oder geben Sie einen Bereich nicht frei und nutzen Sie ihn nicht anderweitig, solange DMA ihn besitzt.

Die [Audio-Server-Dokumentation für SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/middleware/multimedia.html) besagt, dass Callbacks im Audio-Server-Thread laufen und ein Callback von `audio_open()` nicht `audio_close()` aufrufen darf, da dies einen Deadlock verursachen kann. Halten Sie Callbacks kurz und übergeben Sie blockierende Speicherzugriffe oder Verarbeitung an einen Worker-Thread. Der Aufnahme-Callback erhält einen Zeiger und die Länge eines Datenframes; die zitierte Dokumentation legt nicht fest, wie lange der Zeiger nach dem Callback gültig bleibt. Kopieren Sie die Daten vor der Rückkehr, sofern das Ziel-SDK nicht ausdrücklich eine längere Gültigkeit garantiert.

Dieselbe SF32LB52x-Dokumentation beschreibt folgende Rückgabewerte von `audio_write()`:

<div align="center"><em>Tabelle: Dokumentierte audio_write()-Ergebnisse (SF32LB52x)</em></div>

<div align="center" markdown>

| Rückgabewert | Dokumentierte Bedeutung |
|:-------------|:------------------------|
| `> 0` | Der Wert entspricht `data_len`; die Daten wurden in den Schreibcache übernommen. |
| `0` | Der Schreibcache ist voll. Auch eine Anfrage, die größer als der konfigurierte Cache ist, wird mit `0` abgewiesen. |
| `-1` | Der Client ist pausiert oder suspendiert; die übermittelten Audiodaten werden verworfen. |
| `-2` | Ungültiger Parameter. |

</div>

In dieser API ist `write_cache_size` auf `0x7FFF` Byte begrenzt; für das Ping-Pong-Schreibmuster empfiehlt die Dokumentation mindestens das Doppelte der Datenmenge eines einzelnen `audio_write()`-Aufrufs. Das ist der Software-Schreibcache von Audio Server und keine Zusicherung zur physischen DMA-Pufferanordnung des Treibers. Prüfen Sie diese Grenzen für das konkrete Ziel-SDK. Client-Prioritäten, Mischung und verfügbare Audiopfade hängen ebenfalls von der Konfiguration ab. Eine geöffnete Sitzung bedeutet nicht, dass Audio Server sämtliche Audioschnittstellen des Chips bereitstellt.

## Unter realer Produktlast validieren { #validate-under-product-load }

Testen Sie die Audiositzung mit den parallelen Produktlasten: Display-Aktualisierung, Bluetooth-Benachrichtigungen oder -Audio, Speicherzugriffen, Protokollierung und Wechseln in Energiesparzustände. Protokollieren Sie Unterläufe im Wiedergabepuffer, Überläufe im Aufnahmepuffer, Warteschlangenbelegung, Verzögerung vom Callback bis zum Worker, Audioaussetzer, Wiederverbindungen sowie Schlaf- und Aufwachvorgänge. Testen Sie Prioritätsunterbrechungen, Unterbrechen und Fortsetzen, Startfehler und wiederholte Stoppanforderungen. Prüfen Sie die vorgesehene Wiederherstellung, statt unbemerkt Daten zu verlieren.

Beim Beenden muss der Treiber die Übertragungen stoppen; ausstehende Callbacks dürfen keine freigegebenen Puffer mehr ansprechen. Prüfen Sie, ob Anforderungen an die Energieverwaltung aufgehoben und externe Komponenten gemäß der Hardwaresequenz abgeschaltet werden. Zur Validierung der Systemleistungsaufnahme siehe [Energiesparendes Design im Überblick](../low-power/overview.md); zur Funkkoexistenz siehe die [Bluetooth-Übersicht](../bluetooth/overview.md).
