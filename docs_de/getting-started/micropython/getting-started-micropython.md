---
icon: lucide/braces
description: "Für SF32 gibt es noch keinen verifizierten Einstieg mit MicroPython. Nutzen Sie SiFli-SDK für eine reproduzierbare Erstinbetriebnahme und verfolgen Sie den Stand auf der MicroPython-Statusseite."
tags:
    - Erste Schritte
    - MicroPython
---

# MicroPython { #micropython }

Für SF32 gibt es noch keinen verifizierten Einstieg mit MicroPython. In den geprüften SiFli- und OpenSiFli-Quellen sind derzeit weder ein offizielles boardspezifisches Firmware-Image noch ein Flash-Verfahren noch eine REPL-Konfiguration dokumentiert.

Verwenden Sie [SiFli-SDK](../sifli/getting-started-sifli-sdk.md), um eine reproduzierbare Basis für Board, Kabel, seriellen Port und Flash-Vorgang herzustellen. Folgen Sie keinen allgemeinen MicroPython-Installationsanweisungen und verwenden Sie kein Image, das für einen anderen Mikrocontroller oder ein anderes Board bestimmt ist.

Die Seite [MicroPython-Status](../../develop/platforms/micropython/status.md) verfolgt die genauen öffentlichen Artefakte und Abnahmekriterien, die erforderlich sind, bevor diese Seite zu einem Tutorial werden kann.

!!! warning "Noch kein verifiziertes MicroPython-Tutorial"
    Ein nutzbarer SF32-MicroPython-Leitfaden benötigt ein Firmware-Image, das genau zur Board- und Speicherkonfiguration passt, Flash- und Wiederherstellungsbefehle, REPL-Port und Baudrate, Angaben zum Dateisystemverhalten sowie eine gepflegte Matrix zur Peripherieunterstützung, die den tatsächlichen Stand klar ausweist. Solange diese Informationen fehlen, enthält diese Seite bewusst keine Installationsschritte.

## Voraussetzungen für ein verifiziertes Tutorial { #what-sifli-should-publish }

Bevor Sie einem künftigen MicroPython-Tutorial für SF32 folgen, prüfen Sie, ob es ein kompatibles boardspezifisches Firmware-Image, getestete Flash- und Wiederherstellungsbefehle, REPL-Port und Baudrate, das Verhalten des Dateisystems sowie eine gepflegte Matrix zur Peripherieunterstützung nennt. Solange diese Angaben nicht auf der [Statusseite](../../develop/platforms/micropython/status.md) verfügbar sind, verwenden Sie für die erste Inbetriebnahme den oben beschriebenen SiFli-SDK-Pfad.
