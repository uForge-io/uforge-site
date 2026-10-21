---
icon: lucide/code
description: "Community-Rust-Unterstützung für SF32 über OpenSiFlis sifli-rs (sifli-hal, sifli-pac) bewerten: Reifegrad, passende und unpassende Szenarien und Risiko-Checkliste."
tags:
    - Entwicklung
    - Rust
---

# Rust { #rust }

OpenSiFli entwickelt Rust-Unterstützung in [OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs). Das Repository enthält HAL, PAC, Crates für Flash-Tabellen, Beispiele sowie Hinweise zum Flashen und Debuggen.

Die Maintainer beschreiben das Projekt als in Entwicklung und nicht für den Produktionseinsatz bereit. Betrachten Sie Rust auf SF32 als Erprobungspfad, es sei denn, Ihr Team kann hardwarenah arbeiten und ist bereit, Korrekturen upstream beizutragen.

Für die anfängliche Toolchain, den unveränderten Blinky-Build und die Flash-Runner-Einrichtung verwenden Sie [Erste Schritte mit Rust](../../../getting-started/rust/getting-started-rust.md). Diese Seite dient dazu, den Unterstützungsumfang zu bewerten und zu entscheiden, ob Rust über diese Baseline hinaus weiterverfolgt wird.

## Von OpenSiFli genannte Crates { #crates-mentioned-by-opensifli }

<div align="center"><em>Tabelle: Von OpenSiFli genannte Crates</em></div>

<div align="center" markdown>

| Crate | Zweck |
|:------|:--------|
| `sifli-hal` | Hardware-Abstraktionsschicht. |
| `sifli-pac` | Peripheral Access Crate. |
| `sifli-flash-table` | Unterstützung für die Flash-Tabelle. |

</div>

## Wann Rust sinnvoll ist { #when-rust-makes-sense }

Rust kann gut passen, wenn Sie Folgendes vorhaben:

- Embedded Rust erproben.
- Starke Typisierung im Low-Level-Firmware-Code einsetzen.
- Künftige Treiber im Stil von `embedded-hal` aufbauen.
- Zum SF32-Rust-Ökosystem beitragen.

Verwenden Sie heute SiFli-SDK für Produktions-Firmware.

## Prüfpunkte zur Bewertung { #evaluation-gates }

Beginnen Sie erst mit einer Produktportierung, wenn die Erstinbetriebnahme auf dem Ziel-Board funktioniert. Validieren Sie anschließend jede benötigte Peripherie, jedes Flash-Layout, jeden Debug-Pfad und jede Laufzeitfunktion einzeln. Dokumentieren Sie zu jedem Ergebnis den Upstream-Commit, das Rust-Target, die Cargo-Konfiguration, die Board-Revision und das Wiederherstellungsverfahren.

Da das Repository `sifli-hal`, `sifli-pac`, Werkzeuge für Flash-Tabellen und Beispiele im Embassy-Stil (async) verwendet, hängt der Anwendungserfolg auch davon ab, wie diese Komponenten zusammenspielen, und nicht nur davon, ob ein Crate kompiliert. Halten Sie bei der Untersuchung einer Lücke das Reproduktionsbeispiel so klein wie möglich.

## Risiko-Checkliste { #risk-checklist }

- Unterstützt das Crate den exakten Chip?
- Deckt die HAL die benötigte Peripherie ab?
- Ist das Flash-Layout mit dem Board kompatibel?
- Ist der Debug-Ablauf für die verwendete Debug-Probe bzw. das Debug-Tool dokumentiert?
- Kann dasselbe Board mit SiFli-SDK oder `sftool` wiederhergestellt werden?
- Ist das Team bereit, Fixes beizutragen?

## Gute Eignung / Schlechte Eignung { #good-fit-poor-fit }

<div align="center"><em>Tabelle: Gute Eignung / Schlechte Eignung</em></div>

<div align="center" markdown>

| Gute Eignung | Schlechte Eignung |
|:---------|:---------|
| Experimente und die Erkundung von Treibern. | Produktionszeitplan, der Hersteller-Support erfordert. |
| Teams, die bereits Embedded Rust verwenden. | Produkte, die heute vollständige Bluetooth-/Display-/Audio-Stacks benötigen. |
| Beitrag zur Reife von HAL/PAC. | Einmalige Prototypen, bei denen Arduino- oder SDK-Beispiele schneller sind. |

</div>
