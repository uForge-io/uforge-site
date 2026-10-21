---
icon: lucide/boxes
description: "SiFli-SDK-Beispielcode in wiederverwendbare Komponenten und `sf-pkg`-Pakete überführen: Qualitätsmaßstab, Dokumentationsinhalte und typische Stolperfallen."
tags:
    - Entwicklung
    - SiFli-SDK
---

# Komponenten und `sf-pkg` { #components-and-sf_pkg }

SiFli-Projekte nutzen häufig wiederverwendbare Middleware, Treiber und Komponenten. Sobald ein Projekt über das Kopieren eines Beispiels hinauswächst, nutzen Sie SiFlis Paket- und Komponenten-Ökosystem, um wiederverwendbare Firmware-Bausteine zu veröffentlichen und zu pflegen.

## Wann sich eine Komponente lohnt { #how-to-think-about-components }

Verwenden Sie Komponenten für Code, der projekt- oder beispielübergreifend geteilt werden sollte:

- Peripherie-Treiber.
- Unterstützung für Display-Panels.
- Bluetooth-Dienste.
- GUI-Widgets.
- Sensor-Adapter.
- Speicher-Hilfsfunktionen.
- Produkt-Middleware.

Belassen Sie nur für eine Anwendung benötigte Logik im Anwendungsprojekt, bis sie eine stabile Schnittstelle hat und von mehreren Anwendern genutzt wird.

## Praktischer Arbeitsablauf { #practical-workflow }

1. Beginnen Sie mit einem funktionierenden SDK-Beispiel.
2. Identifizieren Sie den Teil, der wiederverwendbar sein soll.
3. Stellen Sie die Funktion über eine schlanke API mit klar abgegrenztem Zuständigkeitsbereich bereit.
4. Ergänzen Sie die Konfiguration über den üblichen Build- und Konfigurationsmechanismus des SDK.
5. Dokumentieren Sie Abhängigkeiten, Speicherbedarf und benötigte Peripherie.
6. Verpacken Sie den Code erst danach als wiederverwendbare Komponente.

## Komponenten mit `sf-pkg` verteilen { #use-sf-pkg-to-distribute-components }

Eine Komponente ist eine wiederverwendbare technische Einheit. SiFlis Komponenten-Registry basiert auf Conan; das aktuelle Kommandozeilen-Subkommando im SDK heißt `sf-pkg`.

Um ein Paket zu verwenden, führen Sie `sdk.py sf-pkg init` im Verzeichnis `project` des SDK-Projekts aus; dadurch wird `conanfile.py` erstellt. Ergänzen Sie im Feld `requires` Paketverweise im Format `package/version@<username>`, wobei der Platzhalter den Benutzernamen im Paketregister bezeichnet. Führen Sie anschließend im selben Verzeichnis `sdk.py sf-pkg install` aus. Installierte Pakete liegen unter `project/sf-pkgs`; ihre Kconfig-Dateien werden in `menuconfig` unter `SiFli External Components` eingebunden.

Zum Veröffentlichen einer Komponente führen Sie in ihrem Verzeichnis `sdk.py sf-pkg new --name <package_name>` aus und prüfen die erzeugte `conanfile.py`. Mit `--support-sdk-version <sdk_version_range>` können Sie den kompatiblen Versionsbereich bereits beim Erstellen festlegen. Unabhängig davon, ob Sie diese Option verwenden, prüfen Sie, ob das Rezept den vorgesehenen kompatiblen SDK-Versionsbereich in `support_sdk_version` angibt, und passen Sie ihn bei Bedarf an. Verwenden Sie eine semantische Paketversion und vervollständigen Sie Metadaten und Abhängigkeiten. Nach der Anmeldung bei der Registry bauen und laden Sie das Paket hoch:

```bash
sdk.py sf-pkg build --version <version>
sdk.py sf-pkg upload --name <package_name>/<version>@<username>
```

Der genaue Ablauf kann je nach SDK-Version abweichen. Hinweise zu Einrichtung, Anmeldung und versionsabhängigen Befehlen finden Sie in den Anleitungen von SiFli zur [Paketintegration (Chinesisch)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/sf_pkg/use.html), zur [Erstellung und Veröffentlichung von Paketen (Englisch)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/sf_pkg/create.html) und in der [chinesischen Fassung](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/sf_pkg/create.html).

## Qualitätsmaßstab für Komponenten { #component-quality-bar }

Eine Komponente ist zur gemeinsamen Nutzung bereit, wenn:

- Sie sich mit dokumentierter Umgebung und Abhängigkeiten aus einem sauberen Checkout bauen lässt.
- Sie ein minimales Beispiel enthält.
- Sie die erforderliche Konfiguration dokumentiert.
- Sie keine impliziten Annahmen über ein bestimmtes Board voraussetzt.
- Sie Fehler klar meldet.
- Sie jede Nutzung globaler Ressourcen sowie Zuständigkeiten und Freigaberegeln dokumentiert.
- Sie Regeln für Threads, Callbacks und den Besitz von Speicher festlegt.

## Was zu dokumentieren ist { #what-to-record }

Jede wiederverwendbare Komponente sollte dokumentieren:

- Unterstützte Chips und Boards.
- Erforderliche SDK-Version.
- Erforderliche Peripherie und Pins.
- Erforderliche RTOS-/Middleware-Konfiguration.
- Threading- und Callback-Verhalten.
- Erwarteter Bedarf an RAM, Flash und Stack.
- Pfad des Beispielprojekts.

## Diese Fallstricke vermeiden { #avoid-these-traps }

<div align="center"><em>Tabelle: Diese Fallstricke vermeiden</em></div>

<div align="center" markdown>

| Falle | Besserer Ansatz |
|:-----|:----------------|
| Ein ganzes Beispiel in jedes Produkt kopieren. | Nur die stabile, wiederverwendbare Schicht extrahieren. |
| Pin-Namen im Komponentencode verstecken. | Board-Ressourcen über Konfiguration übergeben. |
| Einen einzigen Display-/Audio-Pfad annehmen. | Unterstützte Hardware-Pfade dokumentieren. |
| Speicherverbrauch ignorieren. | Erwarteten Bedarf an Stack, Heap, DMA und Puffern dokumentieren. |
| Ohne Beispiel ausliefern. | Ein minimales Integrationsbeispiel beilegen. |

</div>
