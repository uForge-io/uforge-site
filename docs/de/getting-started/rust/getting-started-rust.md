---
icon: lucide/code
description: "Erste Evaluierung von OpenSiFli sifli-rs auf SF32LB52: Rust-Target installieren, unverändertes Blinky bauen, sftool konfigurieren und SDK-Wiederherstellungspfad behalten."
tags:
    - Erste Schritte
    - Rust
---

# Rust { #rust }

[OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs) entwickelt Rust-HAL- und PAC-Unterstützung sowie Funktionen für Flash-Tabellen für SiFli-MCUs. Die Maintainer kennzeichnen das Projekt als in Arbeit und noch nicht für den Produktionseinsatz geeignet. Dieser Leitfaden schafft daher eine **Ausgangsbasis für die Evaluierung**, keinen Workflow für Produktions-Firmware.

Arbeiten Sie zunächst auf demselben Board den Leitfaden [Erste Schritte mit SiFli-SDK](../sifli/getting-started-sifli-sdk.md) durch. So steht Ihnen ein erprobter serieller Zugang und Wiederherstellungspfad zur Verfügung, falls sich das Rust-Projekt nicht flashen oder debuggen lässt.

## Was Sie benötigen { #what-you-need }

- Ein SF32LB52 DevKit LCD und ein USB-Typ-C-Datenkabel, das mit dem USB-zu-UART-Port des Boards verbunden ist.
- Grundlegende Vertrautheit mit Rust, eingebetteter Entwicklung und der Kommandozeile.
- `git` und eine aktuelle Rust-Toolchain, installiert mit [rustup](https://rustup.rs/).
- Der aktuelle [sifli-rs Get-Started-Leitfaden](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/get_started.md) und der [Flash- und Debug-Leitfaden](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/flash_and_debug.md).

!!! warning "Erkundungspfad"
    Betrachten Sie diesen Leitfaden nicht als Beleg dafür, dass ein Chip, ein Peripheriegerät, eine Board-Konfiguration oder ein Anwendungsstack produktionsreif ist. Prüfen Sie vor einer Portierung im Repository den Supportstatus des konkreten Ziels und Peripheriegeräts.

## Rust-Target vorbereiten { #prepare-the-rust-target }

Der Leitfaden des Repositorys verwendet Arm-Cortex-M-Rust-Targets. Installieren Sie die dort dokumentierten Targets:

```bash
rustup target add thumbv8m.main-none-eabi
rustup target add thumbv8m.main-none-eabihf
```

Klonen Sie das aktuelle Repository und arbeiten Sie dann vom Beispielverzeichnis für SF32LB52 aus:

```bash
git clone https://github.com/OpenSiFli/sifli-rs.git
cd sifli-rs/examples/sf32lb52x
```

Das Beispielverzeichnis enthält die Cargo-Target-Konfiguration, das Speicherlayout, das Build-Skript und die Beispiel-Binärdateien. Übernehmen Sie diese Dateien nicht ungeprüft in ein Produkt: Sie enthalten Annahmen zu Board und Flash, die für die Zielhardware überprüft werden müssen.

## Flash-Runner konfigurieren { #configure-the-flash-runner }

Das Repository dokumentiert `sftool` als normalen Flash-Runner. Setzen Sie in `examples/sf32lb52x/.cargo/config.toml` den Runner auf den USB-zu-UART-Port des Boards, gemäß dem aktuellen Flash- und Debug-Leitfaden. Das dort dokumentierte Muster lautet:

```toml
runner = 'sftool -c SF32LB52 -p <Your_Port> --compat write_flash'
```

Der erste Flash-Vorgang erfordert möglicherweise eine Flash-Tabelle, einen Bootloader und ein Anwendungs-Image. Die genauen Images und Adressen hängen von der dokumentierten Board-/Flash-Anordnung ab. Folgen Sie dem Leitfaden des Repositorys, anstatt Adressen oder Binärdateien aus Arduino, Zephyr oder SiFli-SDK zu übernehmen.

## Referenzbeispiel bauen und ausführen { #build-and-run-the-baseline }

Bauen und flashen Sie mit konfiguriertem Runner das unveränderte Blinky-Beispiel:

```bash
cargo run --bin blinky
```

Eine erfolgreiche Kompilierung ist nur die erste Prüfung. Stellen Sie sicher, dass sich das Board wie erwartet verhält, und bewahren Sie die vollständige Ausgabe von `cargo` und `sftool` auf. Nehmen Sie anschließend eine kleine, reversible Änderung vor — etwa die Blink-Verzögerung —, bevor Sie ein weiteres Peripheriegerät ausprobieren.

## Wenn das Referenzbeispiel fehlschlägt { #if-the-baseline-fails }

Prüfen Sie zunächst, ob die SiFli-SDK-Referenzkonfiguration auf dem Board noch funktioniert. Erfassen Sie dann das Rust-Target, den Commit, das gewählte Beispiel, die Cargo-Konfiguration, den `sftool`-Befehl samt Ausgabe, die Board-Revision und das serielle oder Debug-Protokoll. Laut Upstream-Leitfaden kann das Debug-Verhalten im Zusammenhang mit Idle/WFI instabil sein. Außerdem muss die Flash-Tabelle groß genug für das Anwendungs-Image sein.

Informationen zu Architektur, Supportumfang und Produkteignung finden Sie auf der Seite [Rust im Bereich Develop](../../develop/platforms/rust/overview.md).

## Vor der Wiederverwendung des Beispiels { #what-sifli-should-add }

Prüfen Sie vor der Anpassung des Beispiels, ob das Repository die Unterstützung für Ihr konkretes Board und dessen Peripherie dokumentiert. Kontrollieren Sie außerdem das passende Rust-Target, den Bootloader, das Flash-Tabellenlayout und den Debug-Pfad. Bewahren Sie die nachweislich funktionierende SiFli-SDK-Basiskonfiguration als Wiederherstellungsoption auf.
