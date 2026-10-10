---
icon: lucide/table-properties
description: "使用 SiFli-SDK 分区表描述 SF32 存储布局：对比传统 JSON v1/v2 与推荐的 YAML v3 格式，并了解叠加配置、构建产物和验证方法。"
tags:
    - 开发
    - 分区
---

# 分区表 { #partition-tables }

SiFli-SDK 的 `partition_table` 构建工具会解析开发板的分区描述文件，并生成 `ptab.h`。应用程序可通过该头文件中的宏获取分区信息。分区表可描述 NOR Flash、NAND Flash、eMMC、SD 卡、PSRAM 和片内 SRAM 等所有相关存储器的地址规划。

每块开发板都有默认布局。针对该板编译的应用都遵循这套地址规划；项目也可以提供自定义分区表，覆盖开发板的默认配置。

## 启用分区表 { #enable-partition-tables }

在中间件配置中启用 **Use partition table to manage all memory layout**（使用分区表管理全部内存布局）。项目的 `Kconfig.proj` 还需要包含如下配置；SiFli-SDK 示例工程已包含该配置。

```kconfig
# APP-specific configuration.
config CUSTOM_MEM_MAP
    bool
    select custom_mem_map
    default y if !SOC_SIMULATOR
```

## 选择格式 { #choose-a-format }

SiFli-SDK 支持三种分区表格式。除非现有开发板或产品必须延续 v1/v2 配置，新项目应优先使用 v3。

<div align="center"><em>表：SiFli-SDK 分区表格式</em></div>
<div align="center" markdown>

| 格式 | 描述文件 | 核心模型 | 是否适合新项目 |
| --- | --- | --- | --- |
| v1 | `ptab.json` | JSON 存储器列表、标签以及可选的 `ftab`、`img` 和 `exec` 元数据 | 否，仅维护既有项目。 |
| v2 | `ptab.json` | JSON 存储器列表，包含带名称和类型的镜像分区与执行分区 | 否，仅在现有开发板依赖该格式时保留。 |
| v3 | `ptab.yaml` | 使用 `type`、`subtype`、`region`、`exec`、自动生成宏和项目级叠加配置的 YAML 分区 | 是。 |

</div>

构建系统会优先查找 `ptab.yaml`（v3）；找不到时再使用 `ptab.json`（v1/v2）。搜索顺序依次为开发板目录、芯片目录、BSP 根目录和 `customer/boards/<board>/`。

## v1：JSON 标签和镜像元数据 { #v1-json-tags-and-image-metadata }

v1 在 `ptab.json` 中使用 JSON 数组。它没有专用版本字段，但可选地以包含 `"version": "1"` 的头元素开头。

每个存储器条目包含：

- `mem`：存储器名称，例如 `flash2` 或 `psram1`。
- `base`：存储器的十六进制基地址；应依据目标存储器映射确认该值正确。
- `regions`：该存储器中的分区列表。

每个分区使用以字节为单位的 `offset` 和 `max_size`。其中的 `tags` 列表会生成分区宏。例如，`FLASH_BOOT_LOADER` 会生成 `FLASH_BOOT_LOADER_START_ADDR`、`FLASH_BOOT_LOADER_OFFSET` 和 `FLASH_BOOT_LOADER_SIZE`；起始地址等于存储器 `base` 加分区 `offset`。

<div align="center"><em>表：v1 可选分区元数据</em></div>
<div align="center" markdown>

| 字段 | 用途 |
| --- | --- |
| `ftab` | 描述 Flash Table 条目。 |
| `img` | 为生成烧录脚本标识分区中的镜像。若工程输出多个二进制文件，使用 `proj_name:binary_name`。 |
| `exec` | 标识可执行程序，使共享链接器脚本能够选择对应的代码地址。 |
| `custom` | 向生成的 `ptab.h` 添加整数类型的自定义宏。 |

</div>

PSRAM 存在 CBUS 和 SBUS 两套地址空间。应将 `exec` 写在 CBUS 分区中，确保代码采用执行地址；当通过 SBUS 地址搬运代码时，应将 `ftab` 的 `xip` 地址写在 SBUS 分区中。

## v2：带名称和类型的 JSON 分区 { #v2-named-and-typed-json-partitions }

v2 同样使用 `ptab.json`，但头元素必须声明 `"version": "2"`。存储器字段仍为 `mem`、`base` 和 `regions`。分区保留 `offset` 和 `max_size`，并可使用 `tags` 和 `custom`；v2 还增加了 `name`、`type`，以及执行分区可选的 `core`。

<div align="center"><em>表：v2 分区字段与类型</em></div>
<div align="center" markdown>

| 字段或类型 | 含义 |
| --- | --- |
| `name` | 分区名称。程序镜像的名称必须与对应程序或 `AddCustomImg` 名称一致。多文件程序可使用 `proj_name:1`、`proj_name:2` 等格式。 |
| `core` | 执行 `app_exec` 分区的核心：`hcpu`、`lcpu` 或 `acpu`。 |
| `app_img` | 存放程序镜像的主分区，由烧录工具写入。 |
| `app_img2` | 程序镜像备份分区，通常与主分区配合用于升级。 |
| `app_exec` | 程序代码的执行地址空间。 |

</div>

`bootloader`、`main`、`dfu` 和 `ftab` 是保留名称。其他程序名称可用于用户定义的镜像，例如 `acpu`。当分区表未定义 `ftab` 和 `bootloader` 分区时，工具会生成默认配置；在依赖该默认配置前，应检查生成的 `ptab.h`。

## v3：YAML 分区和 Overlay { #v3-yaml-partitions-and-overlays }

v3 使用 `ptab.yaml`，也是推荐格式。它以显式的 `type` 和 `subtype` 取代传统 `tags` 模型，通过逻辑 `region` 名称使分区与物理拓扑解耦，并在构建过程中生成 `ptab.h`、`ftab.bin` 和链接脚本片段。v3 还支持项目级叠加配置（overlay）。

<div align="center"><em>表：v3 顶层字段和分区字段</em></div>
<div align="center" markdown>

| 范围 | 字段 | 必填 | 含义 |
| --- | --- | --- | --- |
| 顶层 | `version` | 是 | 必须为 `3`。 |
| 顶层 | `chip` | 是 | 芯片型号，例如 `SF32LB525UC6`。 |
| 顶层 | `memory` | 否 | 外挂存储器定义。 |
| 顶层 | `partitions` | 是 | 分区列表。 |
| 分区 | `name`、`type`、`region`、`offset`、`size` | 是 | 名称、类型、逻辑存储区域和位置。`offset` 与 `size` 支持 `0x` 前缀或 `KB`/`MB` 后缀。 |
| 分区 | `subtype`、`exec`、`core`、`attrs` | 否 | 子类型、非 XiP 程序的执行位置、目标核心和自定义属性。 |

</div>

每项外部 `memory` 配置需指定 `mpi` 或 `sdmmc` 接口、存储类型 `type`（`nand`、`nor` 或 `sd`）以及容量。`region` 可引用这些外部存储器，也可引用 `hpsys_ram` 或 `lpsys_ram`。

每个 `region` 都映射到 SBUS 存储地址和供 CPU 执行或 XiP 使用的 CBUS 地址。SDK 会从芯片对应的 SiliconSchema 数据中加载该映射。生成 `FAL_PART_TABLE` 时，设备名由分区的存储 `region` 决定，而不是由 `exec` 决定：`mpi1` 至 `mpi5` 分别映射到 `NOR_FLASH1_DEV_NAME` 至 `NOR_FLASH5_DEV_NAME`；`sdmmc1` 和 `sdmmc2` 分别映射到 `SDMMC1_DEV_NAME` 和 `SDMMC2_DEV_NAME`。

<div align="center"><em>表：v3 分区类型和子类型</em></div>
<div align="center" markdown>

| 类型 | 子类型或用途 | 含义 |
| --- | --- | --- |
| `ftab` | — | Flash Table 分区。 |
| `bootloader` | — | 引导加载程序分区。 |
| `app` | `factory` | 出厂主应用，生成 `CODE_START_ADDR` 和 `CODE_SIZE`。 |
| `app` | `dfu` | 独立运行的 DFU 应用。 |
| `app` | `ex` | 资源分区；构建系统生成工具链相关的资源镜像输出。 |
| `data` | `flashdb_kv` | FlashDB KV 数据库；生成 `KVDB_*` 宏并纳入 `FAL_PART_TABLE`。 |
| `data` | `filesystem`、`littlefs`、`fat` 或 `fatfs` | 文档说明 `filesystem` 会生成 `FS_REGION_*` 宏并纳入 `FAL_PART_TABLE`。同一文档在另一处也将 `littlefs`、`fat` 和 `fatfs` 列为可生成这些宏的子类型，同时称它们目前没有实际作用；请针对目标 SDK 版本核实这三种子类型的行为。此外，该宏说明还使用了子类型名 `flashdb`，而子类型表和 FAL 规则使用的是 `flashdb_kv`；未经目标 SDK 验证，不要将二者视为别名。 |
| `data` | `ram`、`calibration`、`raw` 或 `int_res` | RAM、校准数据、由应用管理的原始数据，或链接到 ELF 后按段名切分的内部资源数据。 |

</div>

v3 自动生成的 `FAL_PART_TABLE` 仅包含 `data/flashdb_kv`、`data/filesystem` 以及子类型不是 `ex` 的 `app` 分区；它不包含 `ftab`、`bootloader`、`app/ex` 或其他 `data` 子类型，包括 `littlefs`、`fat`、`fatfs`、`raw`、`ram`、`calibration` 和 `int_res`。生成条目使用分区的 `name`，不会将旧布局别名 `main`、`dfu_code` 或 `fs_root` 映射为实际分区名称。迁移到 v3 时不要手动定义 `FAL_PART_TABLE`；如果板级工程中存在 `custom_mem_map.h`，应将其移除以避免重复定义警告。

`ptab.h` 会为每个分区生成 `<NAME>_START_ADDR`、`<NAME>_SIZE` 和 `<NAME>_OFFSET` 宏，其中 `<NAME>` 是分区名称的大写形式。如果 SDK 能识别该 region 的存储类型，还会生成 `<NAME>_MEM_TYPE`。对于 `app/factory` 分区，若配置了 `exec`，`CODE_START_ADDR` 使用其中指定的地址；否则使用该分区的 CBUS 地址。

当代码不能 XiP 执行时，例如应用存放在 NAND Flash 而需搬运到 PSRAM 执行，应使用 `exec: {region, offset}`。未定义 `exec` 时，生成的代码起始地址使用分区存储地址的 CBUS 地址。`attrs` 可向 `ptab.h` 添加自定义宏。

### 默认分区与项目叠加配置 { #defaults-and-project-overlays }

若相应分区缺失，v3 会推导系统默认分区。对于 SF32LB52，`flash_table` 和 `bootloader` 可根据 HCPU 出厂应用的存储区域推导；以 NAND 或 SDMMC 作为启动存储器时，还会生成文档定义的默认数据分区。对于 SF32LB56 和 SF32LB58，可以省略内部 `mpi5` 上的 `flash_table` 和 `bootloader`。默认 SiP PSRAM 窗口和标准 RAM 分区同样可以省略，除非项目修改了 RAM 布局。

仅需进行少量项目级修改时，应使用 `ptab.overlay.yaml` 叠加配置，而不是复制完整的开发板 `ptab.yaml`。它可以新增分区或覆盖已有分区：

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

开发板级叠加配置的优先级高于芯片级叠加配置。叠加配置只能修改分区：不能修改 `memory`、`chip` 或 `version`，也不能删除分区。它只适用于开发板级 v3 `ptab.yaml`，不能与完整的项目级 `ptab.yaml` 或 `ptab.json` 同时使用。如果开发板仍使用 v1/v2 的 `ptab.json`，且构建系统没有选中完整的 `ptab.yaml`，叠加配置会被忽略并输出警告，构建继续沿用原有的分区表流程；此时不会生成 `ptab.effective.yaml`。叠加配置实际生效时，构建才会输出最终的 `ptab.effective.yaml` 供检查。

## 构建产物与验证 { #generated-files-and-validation }

<div align="center"><em>表：分区表构建产物</em></div>
<div align="center" markdown>

| 产物 | 用途 |
| --- | --- |
| `ptab.h` | 包含分区宏定义的生成 C 头文件。 |
| `ftab.bin` | 由引导加载程序使用的二进制 Flash Table。v3 由 Python 直接生成，不再需要 `ftab` 子工程。 |
| `link_copy.lds` / `link_copy.sct` | 生成的 GCC 或 Keil 链接器脚本副本。v3 使用 Jinja2 模板。 |
| `ptab.effective.yaml` | 叠加配置生效时，经过处理的最终 v3 分区表。 |

</div>

集成前应验证 v3 开发板分区表：

```bash
python tools/build/validate_ptab_v3.py customer/boards/<board>/ptab.yaml
```

该验证器检查分区名称格式、类型与子类型、区域名称、分区重叠和引导加载程序分区的唯一性。要查看构建实际使用的最终 v3 配置，可执行：

```bash
sdk.py ptab-export --board=<board-name>
sdk.py ptab-export --board=<board-name> --output /tmp/ptab.effective.yaml
sdk.py ptab-export --strict
```

## 查看生成的 Flash Table { #inspect-the-generated-flash-table }

构建完成后，`ftab.bin` 位于构建目录。初始化 SDK 环境后，可检查当前工程下找到的第一个 `build_*/ftab.bin`：

```bash
source ./export.sh
sdk.py ftab-dump
```

在 Windows PowerShell 中，使用 `./export.ps1` 初始化环境。若工程有多个开发板构建目录，应指定路径；脚本需要读取结果时可输出 JSON：

```bash
sdk.py ftab-dump --path build_<board_name>/ftab.bin
sdk.py ftab-dump --path build_<board_name>/ftab.bin --format json
```

表格输出包括分区条目、供 DFU 和启动流程使用的镜像描述，以及 HCPU、LCPU、引导加载程序和启动镜像对应的当前运行镜像指针。

## 产品评审 { #product-review }

- [ ] 项目有意识地使用开发板分区表或显式的项目配置。
- [ ] 所选 v1、v2 或 v3 语法与构建系统实际找到的文件一致。
- [ ] 镜像存储地址和执行地址正确，尤其是非 XiP 存储与 PSRAM。
- [ ] 应用、备份、DFU、文件系统、校准数据和应用管理数据分区容量充足且互不重叠。
- [ ] 已检查生成的 `ptab.h`、`ftab.bin`，以及使用 v3 叠加配置时的 `ptab.effective.yaml`。
- [ ] 已在常规升级路径之外记录恢复烧录流程。

完整源文档请参见 SiFli-SDK 的[分区表](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table.html)、[v1](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v1.html)、[v2](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v2.html)和 [v3](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v3.html) 说明。
