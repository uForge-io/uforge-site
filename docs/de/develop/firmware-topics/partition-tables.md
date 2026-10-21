---
icon: lucide/table-properties
description: "SF32-Speicherlayouts mit SiFli-SDK-Partitionstabellen beschreiben: Legacy-JSON v1/v2, empfohlenes YAML v3, Overlays, generierte Dateien und Validierung."
tags:
    - Entwicklung
    - Partitionen
---

# Partitionstabellen { #partition-tables }

Das Build-Tool `partition_table` von SiFli-SDK liest die Partitionsbeschreibung eines Boards ein und erzeugt `ptab.h`, das die von einer Anwendung verwendeten Partitionsmakros bereitstellt. Eine Partitionstabelle beschreibt das Adresslayout aller relevanten Speicher, einschließlich NOR-Flash, NAND-Flash, eMMC, SD-Karten, PSRAM und On-Chip-SRAM.

Jedes Board hat ein Standardlayout, dem jede für dieses Board gebaute Anwendung folgt. Ein Projekt kann auch eine eigene Partitionstabellen-Konfiguration bereitstellen, um den Board-Standard zu ersetzen.

## Partitionstabellen aktivieren { #enable-partition-tables }

Aktivieren Sie in der Middleware-Konfiguration die Option **Use partition table to manage all memory layout** („Partitionstabelle zur Verwaltung des gesamten Speicherlayouts verwenden“). Projekte benötigen zusätzlich die folgende Einstellung in `Kconfig.proj`; SiFli-SDK-Beispiele enthalten sie bereits.

```kconfig
# APP-specific configuration.
config CUSTOM_MEM_MAP
    bool
    select custom_mem_map
    default y if !SOC_SIMULATOR
```

## Ein Format auswählen { #choose-a-format }

SiFli-SDK unterstützt drei Partitionstabellenformate. Verwenden Sie für neue Arbeiten v3, sofern nicht ein bestehendes Board oder Produkt seine v1-/v2-Konfiguration beibehalten muss.

<div align="center"><em>Tabelle: SiFli-SDK-Partitionstabellenformate</em></div>
<div align="center" markdown>

| Format | Beschreibungsdatei | Datenmodell | Für neue Projekte verwenden? |
| --- | --- | --- | --- |
| v1 | `ptab.json` | JSON-Speicherliste, Tags, optionale `ftab`-, `img`- und `exec`-Metadaten | Nein; nur zur Pflege bestehender Projekte. |
| v2 | `ptab.json` | JSON-Speicherliste mit benannten, typisierten Image- und Ausführungspartitionen | Nein; beibehalten, wenn ein bestehendes Board davon abhängt. |
| v3 | `ptab.yaml` | YAML-Partitionen mit `type`, `subtype`, `region`, `exec`, generierten Makros und Projekt-Overlays | Ja. |

</div>

Das Build-System sucht zuerst nach `ptab.yaml` (v3) und greift dann auf `ptab.json` (v1/v2) zurück. Die Suchreihenfolge ist: Board-Verzeichnis, Chip-Verzeichnis, BSP-Wurzelverzeichnis und `customer/boards/<board>/`.

## v1: JSON-Tags und Image-Metadaten { #v1-json-tags-and-image-metadata }

v1 verwendet ein JSON-Array in `ptab.json`. Es hat kein eigenes Versionsfeld, kann aber optional mit einem Header-Element beginnen, das `"version": "1"` enthält.

Jeder Speichereintrag definiert:

- `mem`: Speichername, z. B. `flash2` oder `psram1`.
- `base`: hexadezimale Basisadresse des Speichers; prüfen Sie sie anhand des Speicheradressplans des Zielsystems.
- `regions`: Liste der Partitionen innerhalb dieses Speichers.

Jede Region verwendet `offset` und `max_size` in Bytes. Ihre `tags`-Liste erzeugt Partitionsmakros. So erzeugt `FLASH_BOOT_LOADER` beispielsweise `FLASH_BOOT_LOADER_START_ADDR`, `FLASH_BOOT_LOADER_OFFSET` und `FLASH_BOOT_LOADER_SIZE`; die Startadresse ist die `base`-Adresse des Speichers plus das `offset` der Region.

<div align="center"><em>Tabelle: Optionale v1-Regionsmetadaten</em></div>
<div align="center" markdown>

| Feld | Zweck |
| --- | --- |
| `ftab` | Beschreibt einen Flash-Table-Eintrag. |
| `img` | Benennt das Image in der Partition für generierte Programmierskripte. Wenn ein Projekt mehrere Binärdateien erzeugt, verwenden Sie `proj_name:binary_name`. |
| `exec` | Benennt das ausführbare Programm, damit gemeinsame Linker-Skripte dessen Code-Adresse auswählen können. |
| `custom` | Fügt dem generierten `ptab.h` benutzerdefinierte Ganzzahl-Makros hinzu. |

</div>

PSRAM verfügt über getrennte CBUS- und SBUS-Adressräume. Setzen Sie `exec` auf die CBUS-Partition, damit der Code die Ausführungsadresse verwendet; platzieren Sie eine `ftab`-`xip`-Adresse auf der SBUS-Partition, wenn diese Adresse zum Kopieren von Code verwendet wird.

## v2: Benannte und typisierte JSON-Partitionen { #v2-named-and-typed-json-partitions }

v2 verwendet ebenfalls `ptab.json`, aber der Header muss `"version": "2"` deklarieren. Die Speicherfelder bleiben `mem`, `base` und `regions`. Eine Region enthält weiterhin `offset` und `max_size` und kann `tags` und `custom` verwenden; zusätzlich erhält sie in v2 einen `name`, einen `type` und bei einer Ausführungspartition optional ein `core`.

<div align="center"><em>Tabelle: v2-Regionsfelder und -Typen</em></div>
<div align="center" markdown>

| Feld oder Typ | Bedeutung |
| --- | --- |
| `name` | Partitionsname. Namen von Programm-Images müssen mit dem Namen des zugehörigen Programms oder dem `AddCustomImg`-Namen übereinstimmen. Ein Programm mit mehreren Dateien kann `proj_name:1`, `proj_name:2` usw. verwenden. |
| `core` | Kern, der eine `app_exec`-Partition ausführt: `hcpu`, `lcpu` oder `acpu`. |
| `app_img` | Primäre Partition, die ein Programm-Image speichert und vom Flash-Tool programmiert wird. |
| `app_img2` | Sicherungspartition für ein Programm-Image, normalerweise für Updates mit einer primären Partition gepaart. |
| `app_exec` | Adressraum, aus dem das Programm ausgeführt wird. |

</div>

`bootloader`, `main`, `dfu` und `ftab` sind reservierte Namen. Andere Programmnamen stehen für benutzerdefinierte Images zur Verfügung, wie z. B. `acpu`. Wenn die Tabelle keine `ftab`- und `bootloader`-Partitionen definiert, erzeugt das Tool eine Standardkonfiguration; prüfen Sie das generierte `ptab.h`, bevor Sie sich darauf verlassen.

## v3: YAML-Partitionen und Overlays { #v3-yaml-partitions-and-overlays }

v3 verwendet `ptab.yaml` und ist das empfohlene Format. Es ersetzt das veraltete `tags`-Modell durch explizite `type`- und `subtype`-Felder, entkoppelt eine Partition über logische `region`-Namen von der physischen Topologie und generiert `ptab.h`, `ftab.bin` sowie Linker-Skript-Fragmente als Teil des Builds.

<div align="center"><em>Tabelle: v3-Felder auf oberster Ebene und Partitionsfelder</em></div>
<div align="center" markdown>

| Geltungsbereich | Feld | Erforderlich | Bedeutung |
| --- | --- | --- | --- |
| Oberste Ebene | `version` | Ja | Muss `3` sein. |
| Oberste Ebene | `chip` | Ja | Chip-Teilenummer, z. B. `SF32LB525UC6`. |
| Oberste Ebene | `memory` | Nein | Definitionen externer Speicher. |
| Oberste Ebene | `partitions` | Ja | Partitionsliste. |
| Partition | `name`, `type`, `region`, `offset`, `size` | Ja | Identität, Art, logische Speicherregion und Platzierung. `offset` und `size` akzeptieren ein `0x`-Präfix oder ein `KB`/`MB`-Suffix. |
| Partition | `subtype`, `exec`, `core`, `attrs` | Nein | Spezialisierung, Ausführungsort für Code ohne XiP, Zielkern und benutzerdefinierte Attribute. |

</div>

Jeder externe `memory`-Eintrag gibt eine `mpi`- oder `sdmmc`-Schnittstelle, einen `type`-Wert (`nand`, `nor` oder `sd`) und eine Größe an. `region` kann auf diese externen Speicher, `hpsys_ram` oder `lpsys_ram` verweisen.

Jede `region` wird einer SBUS-Speicheradresse und einer CBUS-Adresse für CPU-Ausführung oder XiP zugeordnet. Das SDK lädt diese Zuordnung aus den SiliconSchema-Daten des Chips. In `FAL_PART_TABLE` ergibt sich der Gerätename aus der Speicher-`region` der Partition, nicht aus `exec`: `mpi1` bis `mpi5` werden `NOR_FLASH1_DEV_NAME` bis `NOR_FLASH5_DEV_NAME` zugeordnet; `sdmmc1` und `sdmmc2` entsprechen `SDMMC1_DEV_NAME` bzw. `SDMMC2_DEV_NAME`.

<div align="center"><em>Tabelle: v3-Partitionstypen und -Subtypen</em></div>
<div align="center" markdown>

| Typ | Subtyp oder Verwendung | Bedeutung |
| --- | --- | --- |
| `ftab` | — | Flash-Table-Partition. |
| `bootloader` | — | Bootloader-Partition. |
| `app` | `factory` | Werksseitige Hauptanwendung; erzeugt `CODE_START_ADDR` und `CODE_SIZE`. |
| `app` | `dfu` | Eigenständige DFU-Anwendung. |
| `app` | `ex` | Ressourcenpartition. Der Build erzeugt toolchain-spezifische Ressourcen-Image-Ausgaben. |
| `data` | `flashdb_kv` | FlashDB-KV-Datenbank; erzeugt `KVDB_*`-Makros und ist Teil von `FAL_PART_TABLE`. |
| `data` | `filesystem`, `littlefs`, `fat` oder `fatfs` | Die Dokumentation beschreibt `filesystem` als Erzeuger der `FS_REGION_*`-Makros und als Bestandteil von `FAL_PART_TABLE`. An anderer Stelle nennt sie auch `littlefs`, `fat` und `fatfs` als Makro erzeugende Subtypen, bezeichnet sie jedoch zugleich als derzeit wirkungslos. Prüfen Sie das Verhalten dieser drei Subtypen für die verwendete SDK-Version. Dieselbe Makrobeschreibung verwendet außerdem den Subtypnamen `flashdb`, während die Subtyptabelle und die FAL-Regeln `flashdb_kv` verwenden. Behandeln Sie beide Namen ohne Prüfung im Ziel-SDK nicht als Aliase. |
| `data` | `ram`, `calibration`, `raw` oder `int_res` | RAM, Kalibrierung, anwendungsverwaltete Rohdaten oder interne, ins ELF eingebundene und nach Section-Name aufgeteilte Ressourcendaten. |

</div>

Die von v3 generierte `FAL_PART_TABLE` enthält ausschließlich `data/flashdb_kv`, `data/filesystem` und `app`-Partitionen, deren Subtyp nicht `ex` ist. Ausgeschlossen sind `ftab`, `bootloader`, `app/ex` sowie alle übrigen `data`-Subtypen, darunter `littlefs`, `fat`, `fatfs`, `raw`, `ram`, `calibration` und `int_res`. Die Einträge verwenden den jeweiligen Partitionsnamen (`name`); ältere Layout-Aliase wie `main`, `dfu_code` und `fs_root` werden nicht auf Partitionsnamen abgebildet. Definieren Sie `FAL_PART_TABLE` bei der Migration zu v3 nicht manuell; entfernen Sie eine vorhandene board-spezifische `custom_mem_map.h`, um eine Warnung wegen Mehrfachdefinition zu vermeiden.

Für jede Partition erzeugt `ptab.h` die Makros `<NAME>_START_ADDR`, `<NAME>_SIZE` und `<NAME>_OFFSET`; `<NAME>` ist der Partitionsname in Großbuchstaben. Wenn der Speichertyp der Region erkannt wird, kommt `<NAME>_MEM_TYPE` hinzu. Bei einer `app/factory`-Partition verwendet `CODE_START_ADDR` die in `exec` angegebene Adresse, falls vorhanden, andernfalls die CBUS-Adresse der Partition.

Verwenden Sie `exec: {region, offset}`, wenn eine Anwendung nicht direkt aus ihrem Speicherort ausgeführt werden kann, z. B. wenn sie im NAND-Flash gespeichert und in den PSRAM kopiert wird. Ohne `exec` verwendet die generierte Code-Startadresse die CBUS-Speicheradresse der Partition. `attrs` fügt `ptab.h` benutzerdefinierte Makros hinzu.

### Standardwerte und Projekt-Overlays { #defaults-and-project-overlays }

v3 leitet Systemstandardwerte ab, wenn die entsprechenden Partitionen fehlen. Für SF32LB52 können `flash_table` und `bootloader` aus der Speicherregion der HCPU-Werksanwendung abgeleitet werden; bei NAND- oder SDMMC-Bootspeicher werden außerdem die dokumentierten Standard-Datenpartitionen angelegt. Für SF32LB56 und SF32LB58 können `flash_table` und `bootloader` auf dem internen `mpi5` entfallen. Standard-SiP-PSRAM-Fenster und Standard-RAM-Partitionen können ebenfalls entfallen, sofern das Projekt das RAM-Layout nicht ändert.

Verwenden Sie für eine kleine projektspezifische Änderung `ptab.overlay.yaml`, statt die vollständige `ptab.yaml` des Boards zu kopieren. Es kann eine Partition hinzufügen oder eine bestehende überschreiben:

```yaml
partitions:
  - op: override
    name: fs_region
    size: 5MB

  - op: add
    name: log_region
    type: data
    subtype: raw
    region: mpi2
    offset: 0x00F00000
    size: 64KB
```

Das boardspezifische Overlay hat Vorrang vor dem chipspezifischen Overlay. Es kann nur Partitionen ändern, nicht `memory`, `chip` oder `version`; Partitionen lassen sich damit auch nicht löschen. Ein Overlay gilt nur für eine v3-`ptab.yaml` auf Board-Ebene und kann nicht mit einer vollständigen projektseitigen `ptab.yaml` oder `ptab.json` kombiniert werden. Verwendet das Board noch `ptab.json` (v1/v2) und wurde keine vollständige `ptab.yaml` ausgewählt, ignoriert der Build das Overlay mit einer Warnung und verwendet weiterhin den Pfad ohne Overlay. In diesem Fall wird keine `ptab.effective.yaml` erzeugt. Wird ein Overlay angewendet, schreibt der Build das Ergebnis zur Prüfung in `ptab.effective.yaml`.

## Generierte Dateien und Validierung { #generated-files-and-validation }

<div align="center"><em>Tabelle: Build-Ausgaben der Partitionstabelle</em></div>
<div align="center" markdown>

| Ausgabe | Zweck |
| --- | --- |
| `ptab.h` | Generierter C-Header mit Partitionsmakros. |
| `ftab.bin` | Vom Bootloader verwendete binäre Flash-Tabelle. In v3 wird sie direkt von Python erzeugt, ohne `ftab`-Subprojekt. |
| `link_copy.lds` / `link_copy.sct` | Generierte Kopien der GCC- oder Keil-Linker-Skripte. v3 verwendet Jinja2-Vorlagen. |
| `ptab.effective.yaml` | Endgültige v3-Tabelle nach der Overlay-Verarbeitung, wenn ein Overlay aktiv ist. |

</div>

Validieren Sie eine v3-Board-Tabelle vor der Integration:

```bash
python tools/build/validate_ptab_v3.py customer/boards/<board>/ptab.yaml
```

Der Validator prüft die Syntax der Partitionsnamen, gültige Typen und Subtypen, gültige Regionen, überlappende Partitionen und die Eindeutigkeit des Bootloaders. Um die vom Build verwendete effektive v3-Konfiguration zu prüfen, führen Sie aus:

```bash
sdk.py ptab-export --board=<board-name>
sdk.py ptab-export --board=<board-name> --output /tmp/ptab.effective.yaml
sdk.py ptab-export --strict
```

## Die generierte Flash-Tabelle prüfen { #inspect-the-generated-flash-table }

Nach einem Build wird `ftab.bin` im Build-Verzeichnis abgelegt. Initialisieren Sie die SDK-Umgebung und prüfen Sie anschließend die erste unter dem aktuellen Projekt gefundene `build_*/ftab.bin`:

```bash
source ./export.sh
sdk.py ftab-dump
```

Initialisieren Sie unter Windows PowerShell mit `./export.ps1`. Geben Sie einen Pfad an, wenn ein Projekt mehrere Board-Build-Verzeichnisse hat, und verwenden Sie die JSON-Ausgabe, wenn ein Skript das Ergebnis weiterverarbeitet:

```bash
sdk.py ftab-dump --path build_<board_name>/ftab.bin
sdk.py ftab-dump --path build_<board_name>/ftab.bin --format json
```

Die Tabellenansicht zeigt Partitionseinträge, von DFU- und Boot-Abläufen verwendete Image-Beschreibungen sowie die Zeiger auf die aktiven Images für HCPU, LCPU, Bootloader und Boot-Images.

## Produktprüfung { #product-review }

- [ ] Das Projekt verwendet die Board-Tabelle oder eine explizite Projektkonfiguration bewusst.
- [ ] Die gewählte v1-, v2- oder v3-Syntax passt zur tatsächlich vom Build-System gefundenen Datei.
- [ ] Image-Speicher- und Ausführungsorte sind korrekt, insbesondere bei Nicht-XiP-Speicher und PSRAM.
- [ ] Anwendungs-, Backup-, DFU-, Dateisystem-, Kalibrierungs- und anwendungsverwaltete Datenpartitionen haben ausreichend Kapazität und überlappen sich nicht.
- [ ] Generierte `ptab.h`, `ftab.bin` und, bei v3-Overlays, `ptab.effective.yaml` wurden geprüft.
- [ ] Ein Wiederherstellungsverfahren zum Flashen ist außerhalb des normalen Update-Pfads dokumentiert.

Die vollständigen Quellenverweise finden Sie in der offiziellen SiFli-SDK-Dokumentation zu [Partitionstabellen](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table.html), [v1](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v1.html), [v2](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v2.html) und [v3](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v3.html).
