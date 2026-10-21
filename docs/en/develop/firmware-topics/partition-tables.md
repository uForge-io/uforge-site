---
icon: lucide/table-properties
description: "Use SiFli-SDK partition tables to describe SF32 memory layouts: legacy JSON v1/v2, the recommended YAML v3 format, overlays, generated files, and validation."
tags:
    - Develop
    - Partitions
---

# Partition Tables { #partition-tables }

The SiFli-SDK `partition_table` build tool reads a board's partition description and generates `ptab.h`, which provides the partition macros used by an application. A partition table describes the address layout of all relevant memory, including NOR Flash, NAND Flash, eMMC, SD cards, PSRAM, and on-chip SRAM.

Each board has a default layout, and every application built for that board follows it. A project can also supply its own partition-table configuration to replace the board default.

## Enable Partition Tables { #enable-partition-tables }

Enable **Use partition table to manage all memory layout** under the middleware configuration. Projects also require the following setting in `Kconfig.proj`; SiFli-SDK examples already include it.

```kconfig
# APP-specific configuration.
config CUSTOM_MEM_MAP
    bool
    select custom_mem_map
    default y if !SOC_SIMULATOR
```

## Choose a Format { #choose-a-format }

SiFli-SDK supports three partition-table formats. Use v3 for new work unless an existing board or product must retain its v1/v2 configuration.

<div align="center"><em>Table: SiFli-SDK partition-table formats</em></div>
<div align="center" markdown>

| Format | Description file | Key model | Use for new projects? |
| --- | --- | --- | --- |
| v1 | `ptab.json` | JSON memory list, tags, optional `ftab`, `img`, and `exec` metadata | No; maintain legacy projects only. |
| v2 | `ptab.json` | JSON memory list with named, typed image and execution partitions | No; retain when an existing board depends on it. |
| v3 | `ptab.yaml` | YAML partitions with `type`, `subtype`, `region`, `exec`, generated macros, and project overlays | Yes. |

</div>

The build system first searches for `ptab.yaml` (v3), then falls back to `ptab.json` (v1/v2). Its search order is the board directory, chip directory, BSP root, and `customer/boards/<board>/`.

## v1: JSON Tags and Image Metadata { #v1-json-tags-and-image-metadata }

v1 uses a JSON array in `ptab.json`. It has no dedicated version field, but it can optionally start with a header element containing `"version": "1"`.

Each memory entry defines:

- `mem`: memory name, such as `flash2` or `psram1`.
- `base`: the memory's hexadecimal base address; verify it against the target memory map.
- `regions`: list of partitions within that memory.

Each region uses `offset` and `max_size` in bytes. Its `tags` list generates partition macros. For example, `FLASH_BOOT_LOADER` produces `FLASH_BOOT_LOADER_START_ADDR`, `FLASH_BOOT_LOADER_OFFSET`, and `FLASH_BOOT_LOADER_SIZE`; the start address is the memory `base` plus the region `offset`.

<div align="center"><em>Table: v1 optional region metadata</em></div>
<div align="center" markdown>

| Field | Purpose |
| --- | --- |
| `ftab` | Describes a Flash Table entry. |
| `img` | Names the image in the partition for generated programming scripts. If a project emits multiple binaries, use `proj_name:binary_name`. |
| `exec` | Names the executable program so shared link scripts can select its code address. |
| `custom` | Adds integer-valued custom macros to generated `ptab.h`. |

</div>

For PSRAM, the source distinguishes CBUS and SBUS address spaces. Put `exec` on the CBUS partition so code uses the execution address; place an `ftab` `xip` address on the SBUS partition when that address is used to copy code.

## v2: Named and Typed JSON Partitions { #v2-named-and-typed-json-partitions }

v2 also uses `ptab.json`, but its header must declare `"version": "2"`. The memory fields remain `mem`, `base`, and `regions`. A region keeps `offset` and `max_size`, and may use `tags` and `custom`; v2 additionally gives the region a `name`, a `type`, and, for an execution partition, an optional `core`.

<div align="center"><em>Table: v2 region fields and types</em></div>
<div align="center" markdown>

| Field or type | Meaning |
| --- | --- |
| `name` | Partition name. Program-image names must match the corresponding program or `AddCustomImg` name. A multi-file program can use `proj_name:1`, `proj_name:2`, and so on. |
| `core` | Core that executes an `app_exec` partition: `hcpu`, `lcpu`, or `acpu`. |
| `app_img` | Primary partition that stores a program image and is programmed by the flash tool. |
| `app_img2` | Backup program-image partition, normally paired with a primary partition for updates. |
| `app_exec` | Address space from which the program executes. |

</div>

`bootloader`, `main`, `dfu`, and `ftab` are reserved names. Other program names are available for user-defined images, such as `acpu`. When the table does not define `ftab` and `bootloader` partitions, the tool generates a default configuration; inspect generated `ptab.h` before relying on it.

## v3: YAML Partitions and Overlays { #v3-yaml-partitions-and-overlays }

v3 uses `ptab.yaml` and is the recommended format. It replaces the legacy `tags` model with explicit `type` and `subtype` fields, decouples a partition from physical topology through logical `region` names, and generates `ptab.h`, `ftab.bin`, and link-script fragments as part of the build.

<div align="center"><em>Table: v3 top-level and partition fields</em></div>
<div align="center" markdown>

| Scope | Field | Required | Meaning |
| --- | --- | --- | --- |
| Top level | `version` | Yes | Must be `3`. |
| Top level | `chip` | Yes | Chip part number, such as `SF32LB525UC6`. |
| Top level | `memory` | No | External storage definitions. |
| Top level | `partitions` | Yes | Partition list. |
| Partition | `name`, `type`, `region`, `offset`, `size` | Yes | Identity, kind, logical storage region, and placement. `offset` and `size` accept a `0x` prefix or `KB`/`MB` suffix. |
| Partition | `subtype`, `exec`, `core`, `attrs` | No | Specialization, non-XiP execution location, target core, and custom attributes. |

</div>

External `memory` definitions use an `mpi` or `sdmmc` interface name, a `type` of `nand`, `nor`, or `sd`, and a size. `region` can reference those external memories, `hpsys_ram`, or `lpsys_ram`.

Each `region` maps to an SBUS storage address and a CBUS address used for CPU execution or XiP. The SDK loads this mapping from the chip's SiliconSchema data. For `FAL_PART_TABLE`, the device name comes from the partition's storage `region`, not from `exec`: `mpi1` through `mpi5` map to `NOR_FLASH1_DEV_NAME` through `NOR_FLASH5_DEV_NAME`, while `sdmmc1` and `sdmmc2` map to `SDMMC1_DEV_NAME` and `SDMMC2_DEV_NAME`.

<div align="center"><em>Table: v3 partition types and subtypes</em></div>
<div align="center" markdown>

| Type | Subtype or use | Meaning |
| --- | --- | --- |
| `ftab` | — | Flash Table partition. |
| `bootloader` | — | Bootloader partition. |
| `app` | `factory` | Factory main application; generates `CODE_START_ADDR` and `CODE_SIZE`. |
| `app` | `dfu` | Independent DFU application. |
| `app` | `ex` | Resource partition. The build creates toolchain-specific resource-image outputs. |
| `data` | `flashdb_kv` | FlashDB KV database; generates `KVDB_*` macros and participates in `FAL_PART_TABLE`. |
| `data` | `filesystem`, `littlefs`, `fat`, or `fatfs` | The reference identifies `filesystem` as generating `FS_REGION_*` macros and participating in `FAL_PART_TABLE`. Elsewhere, it also lists `littlefs`, `fat`, and `fatfs` as macro-generating subtypes while describing them as having no current effect; verify these three subtype behaviors against the target SDK release. The same macro section uses the subtype name `flashdb`, while its subtype table and FAL rules use `flashdb_kv`; do not assume these names are aliases without checking the target SDK. |
| `data` | `ram`, `calibration`, `raw`, or `int_res` | RAM, calibration, application-managed raw data, or internal resource data linked into the ELF and split by section name. |

</div>

The generated v3 `FAL_PART_TABLE` includes only `data/flashdb_kv`, `data/filesystem`, and `app` partitions whose subtype is not `ex`. It excludes `ftab`, `bootloader`, `app/ex`, and other `data` subtypes, including `littlefs`, `fat`, `fatfs`, `raw`, `ram`, `calibration`, and `int_res`. Entries use each partition's `name`; legacy layout aliases such as `main`, `dfu_code`, and `fs_root` are not mapped to partition names. When migrating to v3, do not define `FAL_PART_TABLE` manually; remove a board-level `custom_mem_map.h` if present to avoid a redefinition warning.

For each partition, `ptab.h` generates `<NAME>_START_ADDR`, `<NAME>_SIZE`, and `<NAME>_OFFSET` macros, where `<NAME>` is the uppercase partition name. When the region's memory type is recognized, it also generates `<NAME>_MEM_TYPE`. For an `app/factory` partition, `CODE_START_ADDR` uses the address in `exec` when specified; otherwise it uses the partition's CBUS address.

Use `exec: {region, offset}` where code cannot execute in place, such as an application stored in NAND Flash and copied to PSRAM. Without `exec`, the generated code start address uses the partition's CBUS storage address. `attrs` adds custom macros to `ptab.h`.

### Defaults and Project Overlays { #defaults-and-project-overlays }

v3 derives system defaults when the corresponding partitions are absent. For SF32LB52, `flash_table` and `bootloader` can be inferred from the HCPU factory application's storage region; NAND and SDMMC boot storage also receive documented default data partitions. For SF32LB56 and SF32LB58, `flash_table` and `bootloader` on internal `mpi5` can be omitted. Default SiP PSRAM windows and standard RAM partitions can also be omitted unless the project changes the RAM layout.

For a small project-specific change, use `ptab.overlay.yaml` rather than copying the board's full `ptab.yaml`. It can add a partition or override an existing one:

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

The board-specific overlay has priority over the chip-specific overlay. Overlays modify partitions only: they cannot alter `memory`, `chip`, or `version`, and cannot delete partitions. They apply only to a board-level v3 `ptab.yaml`; they cannot be combined with a complete project-level `ptab.yaml` or `ptab.json`. If the board still uses `ptab.json` (v1/v2) and no complete `ptab.yaml` is selected, the build ignores the overlay, prints a warning, and continues with the non-overlay partition-table path. In that case, it does not generate `ptab.effective.yaml`. When an overlay is applied, the build writes the resulting `ptab.effective.yaml` for inspection.

## Generated Files and Validation { #generated-files-and-validation }

<div align="center"><em>Table: Partition-table build outputs</em></div>
<div align="center" markdown>

| Output | Purpose |
| --- | --- |
| `ptab.h` | Generated C header containing partition macros. |
| `ftab.bin` | Binary Flash Table used by the bootloader. In v3 it is generated directly by Python, without an `ftab` subproject. |
| `link_copy.lds` / `link_copy.sct` | Generated GCC or Keil link-script copies. v3 uses Jinja2 templates. |
| `ptab.effective.yaml` | Final v3 table after overlay processing, when an overlay is active. |

</div>

Validate a v3 board table before integration:

```bash
python tools/build/validate_ptab_v3.py customer/boards/<board>/ptab.yaml
```

The validator checks partition-name syntax, valid types and subtypes, valid regions, overlapping partitions, and bootloader uniqueness. To inspect the effective v3 configuration used by the build, run:

```bash
sdk.py ptab-export --board=<board-name>
sdk.py ptab-export --board=<board-name> --output /tmp/ptab.effective.yaml
sdk.py ptab-export --strict
```

## Inspect the Generated Flash Table { #inspect-the-generated-flash-table }

After a build, `ftab.bin` is placed in the build directory. Initialize the SDK environment, then inspect the first `build_*/ftab.bin` found under the current project:

```bash
source ./export.sh
sdk.py ftab-dump
```

In Windows PowerShell, initialize with `./export.ps1`. Specify a path when a project has several board build directories, and use JSON output when a script consumes the result:

```bash
sdk.py ftab-dump --path build_<board_name>/ftab.bin
sdk.py ftab-dump --path build_<board_name>/ftab.bin --format json
```

The table view reports partition entries, image descriptions used by DFU and boot flows, and the running-image pointers for HCPU, LCPU, bootloader, and boot images.

## Product Review { #product-review }

- [ ] The project uses the board table or an explicit project configuration intentionally.
- [ ] The selected v1, v2, or v3 syntax matches the file actually found by the build system.
- [ ] Image storage and execution locations are correct, particularly for non-XiP storage and PSRAM.
- [ ] Application, backup, DFU, filesystem, calibration, and application-managed data partitions have enough capacity and do not overlap.
- [ ] Generated `ptab.h`, `ftab.bin`, and, for v3 overlays, `ptab.effective.yaml` have been inspected.
- [ ] A recovery programming process is recorded outside the normal update path.

For the complete source references, see the official SiFli-SDK documentation for [partition tables](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table.html), [v1](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v1.html), [v2](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v2.html), and [v3](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v3.html).
