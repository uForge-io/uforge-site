---
icon: lucide/hard-drive
title: "Externen Flash verwenden"
description: "Externe NOR-Flash-, NAND-Flash- und PSRAM-Bausteine mit dem SiFli-SDK konfigurieren und anbinden, Dateisysteme integrieren sowie passende Treiber portieren."
tags: [Entwicklung, SiFli-SDK, Anwendungshinweise, Flash]
---

# Externen Flash verwenden { #use-external-flash }

Dieser Artikel bereitet den [Flash-Leitfaden von SiFli](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html) als praktischen Integrationsablauf für SF32LB52x, SF32LB55x, SF32LB56x und SF32LB58x auf. Er behandelt Controller-Konfiguration, Adressräume der einzelnen Familien, direkten RT-Thread-Zugriff, MTD-Dateisysteme, reservierte Bereiche, die Portierung neuer Flash-Bausteine, PSRAM und J-Link Open Flashloader.

Die SiFli-Anleitung verwendet `FLASH` sowohl für NOR-Flash als auch für NAND-Flash. Die Beispiele übernehmen die SDK-Symbole und Gerätenamen unverändert. Prüfen Sie den SDK-Branch und den Schaltplan der Zielplatine, bevor Sie eine Konfiguration in ein Produkt übernehmen.

## Controllermodell und Fähigkeiten { #1-controller-model-and-capabilities }

Der SiFli-Flash-Controller kann mehrere Flash-Geräte gleichzeitig anbinden:

<div align="center" markdown>

<em>Tabelle: Flash-Controller-Fähigkeiten nach Familie</em>

| Familie | Maximale Geräteanzahl | In diesem Leitfaden behandelte PSRAM-Leitungsmodi | Controller-Bezeichnung in den Beispielen |
|---|---:|---|---|
| SF32LB52x | In dieser Quelle nicht angegeben | Leitfaden der Zielfamilie prüfen | QSPI-/MPI-Bezeichnung im Ziel-SDK prüfen |
| SF32LB55x | 4 | Nur 4-Leitungs-PSRAM | QSPI |
| SF32LB56x | 4 | 4-Leitungs- und 8-Leitungs-PSRAM | MPI-/QSPI-Bezeichnungen aus Kompatibilitätsgründen |
| SF32LB58x | 5 | 4-Leitungs-, 8-Leitungs- und 16-Leitungs-PSRAM | MPI-/QSPI-Bezeichnungen aus Kompatibilitätsgründen |
</div>

Bei den Speichern kann es sich um NOR-Flash oder NAND-Flash handeln. Gegenüber SF32LB55x unterstützen die Controller von SF32LB56x und SF32LB58x zusätzlich PSRAM im 8-Leitungsmodus; SF32LB58x unterstützt darüber hinaus den 16-Leitungsmodus. In der älteren Konfiguration wird der Controller als QSPI bezeichnet, in der neueren, speicherorientierten Konfiguration als MPI.

Die üblichen Controller-Zuordnungen sind:

- **SF32LB55x:** Controller 1 ist in der Regel mit integriertem NOR-Flash verbunden. Controller 2 und 3 hängen vom Platinenentwurf ab. Controller 4 ist mit NOR-Flash verbunden und kann sowohl von LCPU als auch von HCPU angesprochen werden.
- **SF32LB58x:** Controller 1 und 2 sind je nach Gehäuse mit integriertem NOR-Flash oder PSRAM verbunden. Controller 3 und 4 hängen vom Platinenentwurf ab. Controller 5 ist mit integriertem NOR-Flash verbunden und kann sowohl von LCPU als auch von HCPU angesprochen werden.
- **SF32LB56x:** Controller 1 und 2 sind je nach Gehäuse mit integriertem NOR-Flash oder PSRAM verbunden. Controller 3 hängt vom Platinenentwurf ab. Controller 5 ist mit integriertem NOR-Flash verbunden und kann sowohl von LCPU als auch von HCPU angesprochen werden. Einen Controller 4 gibt es nicht.

Der Treiber ist in zwei Schichten aufgeteilt. Die HAL-Schicht stellt den Zugriff auf Hardwareregister und einfache Logik bereit. Die DRV-Schicht stellt Flash-Lese-/Schreib-/Löschoperationen, Initialisierung und Steuerung sowie von Geräten und Dateisystemen genutzte Schnittstellen bereit.

Der Controller unterstützt Flash-Zugriffe im Ein- und Vier-Leitungsmodus, DMA-Beschleunigung, Page-Programmierung, Page-Lesevorgänge sowie das Löschen von Sektoren und Blöcken. NOR-Flash kann außerdem direkt über die AHB-Speicherschnittstelle gelesen werden. Die grundlegende Löscheinheit hängt vom jeweiligen Flash-Baustein ab.

## QSPI oder MPI konfigurieren { #2-configure-qspi-or-mpi }

Flash-Eigenschaften und -Nutzung werden über `menuconfig` konfiguriert; daraus wird `rtconfig.h` erzeugt. Zu den Optionen gehören die Controller-Aktivierung, die DMA-Nutzung, die MTD-Registrierung, Dateisystemeinstellungen, die Speicherkapazität und die Geräte-ID-Behandlung (automatische Erkennung oder manuelle Festlegung).

### SF32LB55x-QSPI-Beispiel { #sf32lb55x-qspi-example }

In `menuconfig` folgt die SiFli-Anleitung dem Pfad **RTOS → On-chip Peripheral Driver → Enable QSPI → Enable QSPI Driver → QSPI Controller 1 Enable** und konfiguriert anschließend den QSPI1-Modus, die Dateisystemnutzung, die Speichergröße und ob die Geräte-ID automatisch erkannt oder manuell festgelegt wird.

Die entsprechenden `rtconfig.h`-Definitionen lauten:

```c
#define BSP_USING_QSPI 1            /*使能QSPI 模块*/
#define BSP_USING_SPI_FLASH 1       /*使能QSPI 控制FLASH功能（为了兼容以前版本）*/
#define BSP_ENABLE_QSPI1 1          /*使能QSPI控制器1*/
#define BSP_QSPI1_USING_DMA 1       /*QSPI1 使用FIFO DMA */
#define BSP_QSPI1_MODE 0            /*QSPI1 连接控制Nor FLASH*/
#define BSP_QSPI1_MEM_SIZE 4        /*配置FLASH1的总大小为4MB*/
#define BSP_QSPI1_CHIP_ID 0         /*FLASH1 DEV ID 由系统获取，不需要手动输入（这个配置是为了当有些FLASH获取ID的命令时序与默认设置不同时，手动添加ID以便查找正确的命令表）*/
```

Die Beispiele der Anleitung für ein zweites NOR-Flash und ein drittes NAND-Flash lauten:

```c
#define BSP_ENABLE_QSPI2 1          /*使能QSPI2 模块*/
#define BSP_QSPI2_USING_DMA 1       /*使能QSPI2 FIFO DMA <*/
#define BSP_QSPI2_MODE 0            /*设置FLASH2 为NOR-FLASH*/
#define BSP_QSPI2_MTD_EN 1          /*FLASH2 注册MTD 设备 */
#define BSP_QSPI2_FS_START 2048     /*FLASH2 MTD 设备可访问地址的起始位置为8MB(2048*4K)*/
#define BSP_QSPI2_FS_SIZE 2048      /*长度为8MB(2048*4KB)*/
#define BSP_QSPI2_MEM_SIZE 32       /*配置FLASH2的总大小为32MB*/
#define BSP_QSPI2_CHIP_ID 0         /*FLASH2 DEV ID 由系统获取，不需要手动输入*/
```

```c
#define BSP_ENABLE_QSPI3 1          /*使能QSPI3 模块*/
#define BSP_QSPI3_USING_DMA 1       /*使能QSPI3 FIFO DMA <*/
#define BSP_QSPI3_MODE 1            /*设置FLASH3 为NAND-FLASH*/
#define BSP_QSPI3_MEM_SIZE 128      /*配置FLASH3的总大小为128MB*/
#define BSP_QSPI3_CHIP_ID 0         /*FLASH3 DEV ID 由系统获取，不需要手动输入*/
```

### SF32LB58x-MPI-Beispiel { #sf32lb58x-mpi-example }

Auf dem SF32LB58x-EVB folgt die SiFli-Anleitung dem Pfad **RTOS → On-chip Peripheral Driver → Enable MPI → Enable QSPI Driver → MPI Controller 1 Enable** und konfiguriert anschließend den MPI-Modus, die Speichergröße und weitere Geräteoptionen. Die Moduswerte sind `0 NOR`, `1 NAND`, `2 PSRAM`, `3 OPSRAM`, `4 HPSRAM` und `5 LEGACY_PSRAM`.

Die gemeinsame MPI-Aktivierung und die Beispiele je Controller lauten:

```c
#define BSP_USING_MPI 1             /*使能MPI 模块*/
#define BSP_USING_SPI_FLASH 1       /*使能MPI 控制FLASH功能（为了兼容之前版本）*/
```

```c
#define BSP_ENABLE_MPI1 1           /*使能MPI 1 模块*/
#define BSP_ENABLE_QSPI1 1          /*使能MPI 1（为了兼容之前版本）*/
#define BSP_MPI1_MODE_4 1           /*MPI1 设置为功能4---16线PSRAM*/
#define BSP_QSPI1_MODE 4
#define BSP_USING_PSRAM1 1
#define BSP_QSPI1_MEM_SIZE 32       /*Source value; verify its size encoding for the target SDK release.*/
```

```c
#define BSP_ENABLE_MPI2 1           /*使能MPI 2 模块*/
#define BSP_ENABLE_QSPI2 1          /*使能MPI 2（为了兼容之前版本）*/
#define BSP_MPI2_MODE_4 1           /*MPI2 设置为功能4---16线PSRAM*/
#define BSP_QSPI2_MODE 4
#define BSP_USING_PSRAM2 1
#define BSP_QSPI2_MEM_SIZE 32       /*配置MPI2的总大小为32MB*/
```

```c
#define BSP_ENABLE_MPI3 1           /*使能MPI 3 模块*/
#define BSP_ENABLE_QSPI3 1          /*使能MPI 3（为了兼容之前版本）*/
#define BSP_MPI3_MODE_0 1           /*MPI3 设置为功能0---NOR FLASH*/
#define BSP_QSPI3_MODE 0
#define BSP_USING_NOR_FLASH3 1
#define BSP_QSPI3_USING_DMA 1       /*MPI3 使用DMA*/
#define BSP_QSPI3_MEM_SIZE 32       /*配置MPI3的总大小为32MB*/
```

```c
#define BSP_ENABLE_MPI4 1           /*使能MPI 4 模块*/
#define BSP_ENABLE_QSPI4 1          /*使能MPI 4（为了兼容之前版本）*/
#define BSP_MPI4_MODE_1 1           /*MPI4 设置为功能1---NAND FLASH*/
#define BSP_QSPI4_MODE 1
#define BSP_USING_NAND_FLASH4 1
#define BSP_QSPI4_USING_DMA 1       /*MPI4 使用DMA*/
#define BSP_QSPI4_MEM_SIZE 128      /*Source comment says 128 MB; verify against the target device and SDK.*/
```

```c
#define BSP_ENABLE_MPI5 1           /*使能MPI 5 模块*/
#define BSP_ENABLE_QSPI5 1          /*使能MPI 5（为了兼容之前版本）*/
#define BSP_MPI5_MODE_0 1           /*MPI5 设置为功能0---NOR FLASH*/
#define BSP_QSPI5_MODE 0
#define BSP_USING_NOR_FLASH5 1
#define BSP_QSPI5_USING_DMA 1       /*MPI5 使用DMA*/
#define BSP_QSPI5_MEM_SIZE 4        /*配置MPI5的总大小为4MB*/
```

SF32LB56x verwendet im Wesentlichen dieselbe MPI-Konfiguration wie SF32LB58x, mit der Ausnahme, dass MPI4 nicht vorhanden ist.

!!! warning "MPI-Konfigurationsbeispiel prüfen"
    Die SiFli-Quelldokumentation widerspricht sich bei MPI1: Im Fließtext heißt es, MPI1 sei standardmäßig mit NOR-Flash verbunden und der Modus könne nicht geändert werden; das folgende Konfigurationsbeispiel setzt MPI1 jedoch auf Modus 4 (16-Leitungs-PSRAM). Außerdem steht `BSP_QSPI1_MEM_SIZE` auf `32`, während der Kommentar 16 MB nennt. Für MPI4 beträgt der Wert `128` und der Kommentar nennt 128 MB, die EVB-Kapazitätstabelle jedoch 64 MB. Dieser Artikel übernimmt die Konfigurationswerte aus der Quelle, ohne die Makro-Codierung oder die tatsächliche Bausteinkapazität abzuleiten. Prüfen Sie diese Angaben anhand der Kconfig-/generierten Konfiguration der verwendeten SDK-Version, des Board-Schaltplans und des Speicherdatenblatts.

## Flash-Adressräume { #3-flash-address-spaces }

Die folgenden Bereiche sind die maximalen Controller-Fenster. Die tatsächlich nutzbare Größe ergibt sich aus dem in `menuconfig` ausgewählten Flash-Baustein, nicht allein aus dem maximalen Fenster.

### SF32LB55x { #sf32lb55x }

<div align="center" markdown>

<em>Tabelle: SF32LB55x Flash-Controller-Adressfenster</em>

| Controller | Start | Ende | Maximales Fenster | EVB-Beschreibung |
|:-----------|:------|:----|:---------------|:----------------|
| FLASH1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 Byte | EVB-Kapazität 4 MB |
| FLASH2 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 Byte | EVB-Kapazität 32 MB |
| FLASH3 | `0x68000000` | `0x6FFFFFFF` | 128 × 1024 × 1024 Byte | EVB nicht aktiviert |
| FLASH4 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 Byte | EVB nicht aktiviert |
</div>

Die Controller-Basisdefinitionen befinden sich in `mem_map.h`:

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x64000000)
#define QSPI3_MEM_BASE   (0x68000000)
#define QSPI4_MEM_BASE   (0x12000000)
```

### SF32LB58x { #sf32lb58x }

**C-BUS-Adressraum**

<div align="center" markdown>

<em>Tabelle: SF32LB58x C-BUS-Adressraum</em>

| Controller | Start | Ende | Maximales Fenster | EVB-Beschreibung |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 Byte | EVB-Kapazität 16 MB |
| MPI2 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 Byte | EVB-Kapazität 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 Byte | EVB-Kapazität 32 MB |
| MPI4 | `0x18000000` | `0x1BFFFFFF` | 64 × 1024 × 1024 Byte | EVB-Kapazität 64 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 Byte | EVB-Kapazität 4 MB |
</div>

**S-BUS-Adressraum**

<div align="center" markdown>

<em>Tabelle: SF32LB58x S-BUS-Adressraum</em>

| Controller | Start | Ende | Maximales Fenster | EVB-Beschreibung |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x60000000` | `0x61FFFFFF` | 32 × 1024 × 1024 Byte | EVB-Kapazität 16 MB |
| MPI2 | `0x62000000` | `0x63FFFFFF` | 32 × 1024 × 1024 Byte | EVB-Kapazität 16 MB |
| MPI3 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 Byte | EVB-Kapazität 32 MB |
| MPI4 | `0x68000000` | `0x9FFFFFFF` | 896 × 1024 × 1024 Byte | EVB-Kapazität 64 MB |
</div>

Für NAND-Flash über 64 MB empfiehlt der Leitfaden, den Baustein über MPI4 anzubinden und Adressen ab `0x68000000` zu verwenden.

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x12000000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI4_MEM_BASE   (0x18000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

### SF32LB56x { #sf32lb56x }

**C-BUS-Adressraum**

<div align="center" markdown>

<em>Tabelle: SF32LB56x C-BUS-Adressraum</em>

| Controller | Start | Ende | Maximales Fenster | EVB-Beschreibung |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x107FFFFF` | 8 × 1024 × 1024 Byte | EVB-Kapazität 4 MB |
| MPI2 | `0x10800000` | `0x13FFFFFF` | 56 × 1024 × 1024 Byte | EVB-Kapazität 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 Byte | EVB-Kapazität 128 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 Byte | EVB-Kapazität 1 MB |
</div>

**S-BUS-Adressraum**

<div align="center" markdown>

<em>Tabelle: SF32LB56x S-BUS-Adressraum</em>

| Controller | Start | Ende | Maximales Fenster |
|:-----------|:------|:----|:---------------|
| MPI1 | `0x60000000` | `0x607FFFFF` | 8 × 1024 × 1024 Byte |
| MPI2 | `0x60800000` | `0x63FFFFFF` | 56 × 1024 × 1024 Byte |
| MPI3 | `0x64000000` | `0x9FFFFFFF` | 960 × 1024 × 1024 Byte |
</div>

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x10800000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

!!! note "Adressfenster und Bausteinkapazität"
    Die Quelle nennt für das MPI3-C-BUS-Fenster des SF32LB56x den Bereich `0x14000000`–`0x17FFFFFF`, gibt dessen Größe aber mit 128 MB an. Einschließlich beider Endadressen umfasst dieser Bereich 64 MB; diesen Wert verwendet die obige Tabelle. Die in der Quelle genannte EVB-Bausteinkapazität von 128 MB bleibt separat erhalten. Sie bestimmt nicht die Größe dieses C-BUS-Fensters. Prüfen Sie vor der Verwendung eines Adressbereichs die Speicherbelegung des Ziel-SDK.

## Zugriff auf Flash über RT-Thread { #4-access-flash-through-rt-thread }

Die RT-Thread-Flash-Schnittstelle wählt den Controller anhand der absoluten Adresse aus. Rufen Sie `rt_hw_flash_init` auf, nachdem die Controller- und Geräteeinstellungen in `rtconfig.h` erzeugt wurden:

```c
int rt_hw_flash_init(void);
int rt_flash_read(rt_uint32_t addr, rt_uint8_t *buf, size_t size);
int rt_flash_write(rt_uint32_t addr, const rt_uint8_t *buf, size_t size);
rt_err_t rt_flash_erase(rt_uint32_t addr, size_t size);
```

`rt_flash_read` und `rt_flash_write` geben bei Erfolg die Anzahl der übertragenen Bytes zurück, bei einem Fehler `0`; `rt_flash_erase` gibt bei Erfolg `RT_EOK` zurück. Die Deklarationen wurden zur besseren Lesbarkeit vereinheitlicht. Prüfen Sie die tatsächlichen Header und Rückgabewerte im verwendeten SDK-Branch.

Verwenden Sie `rt_flash_read` sowohl für NOR- als auch für NAND-Lesevorgänge; NOR kann alternativ über sein Speicherfenster gelesen werden, während NAND die API verwenden muss und der Aufrufer den Puffer selbst verwalten muss. Verwenden Sie `rt_flash_write` für beide Typen. Für Löschoperationen erfordert NOR normalerweise sektorausgerichtete Adresse und Länge (typischerweise 4 KB); NAND erfordert normalerweise blockausgerichtete Adresse und Länge (typischerweise 128 KB). Sichern und stellen Sie nicht ausgerichtete Daten selbst wieder her.

Unterstützt der Flash-Baustein kein XIP, kann Code den Flash, aus dem er ausgeführt wird, nicht löschen oder programmieren. Platzieren Sie den Flash-Treibercode im SRAM. Das Keil-Linker-Fragment der SiFli-Anleitung reserviert 64 KB ab `0x200E1000`:

```text
LR_IROM1 0x10020000 0x100000  {    ; load region size_region
  ...
  ER_IROM1_EX 0x200E1000 0x10000  {  ; Flash code and RO need to put in SRAM
   drv_flash_z0.o (.text.*)
   drv_flash_z0.o (.rodata.*)
   bf0_hal_flash.o (.text.*)
   bf0_hal_flash_ext_z0.o (.text.*)
   ...
  }
  ...
}
```

Das ursprüngliche Lese-/Schreibbeispiel enthält einen nicht initialisierten Datenpuffer und eine fehlerhafte Bereinigung und darf daher nicht unverändert ausgeführt werden. Das angepasste NOR-Flash-Beispiel erhält die Testadresse als Argument und setzt keine feste Produktadresse voraus:

!!! warning "Flash-Löschen ist destruktiv"
    Führen Sie den Test nur in einem dafür reservierten, löschbaren NOR-Testbereich aus und passen Sie `TEST_SIZE` an die vom Baustein und Treiber geforderte Löschgranularität an. Reservieren Sie mindestens eine vollständige Löscheinheit und beachten Sie die Ausrichtung von Adresse und Länge. Verwenden Sie keine Bereiche für Boot-Konfiguration, Kalibrierdaten, Firmware-/OTA-Images, Dateisysteme oder Benutzerdaten. Dieses Beispiel gilt nicht für NAND; dort müssen zusätzlich baustein- und treiberspezifische Vorgaben zu Bad Blocks, ECC, OOB sowie Seiten und Blöcken berücksichtigt werden.

```c
#include <rtthread.h>
#include <string.h>

#define TEST_SIZE 4096u /* Set to the device erase granularity; reserve a full test region. */

static int flash_nor_round_trip(rt_uint32_t address)
{
    rt_uint8_t *write_buf = RT_NULL;
    rt_uint8_t *read_buf = RT_NULL;
    int result = RT_ERROR;

    if ((address % TEST_SIZE) != 0)
        return RT_ERROR;

    write_buf = rt_malloc(TEST_SIZE);
    read_buf = rt_malloc(TEST_SIZE);
    if (write_buf == RT_NULL || read_buf == RT_NULL)
        goto cleanup;

    for (rt_size_t i = 0; i < TEST_SIZE; ++i)
        write_buf[i] = (rt_uint8_t)(i & 0xFFu);

    if (rt_flash_erase(address, TEST_SIZE) != RT_EOK)
        goto cleanup;
    if (rt_flash_write(address, write_buf, TEST_SIZE) != (int)TEST_SIZE)
        goto cleanup;
    if (rt_flash_read(address, read_buf, TEST_SIZE) != (int)TEST_SIZE)
        goto cleanup;
    if (memcmp(write_buf, read_buf, TEST_SIZE) != 0)
        goto cleanup;

    result = RT_EOK;

cleanup:
    if (read_buf != RT_NULL)
        rt_free(read_buf);
    if (write_buf != RT_NULL)
        rt_free(write_buf);
    return result;
}
```

## Flash über RT-Thread MTD verwenden { #5-use-flash-through-rt-thread-mtd }

RT-Thread stellt MTD-NOR- und MTD-NAND-Gerätetreiber bereit. Sind MTD- und Dateisystemoptionen in der Konfiguration aktiviert, werden die Geräte beim Start registriert. Suchen Sie das Gerät mit `rt_device_find("flash1")`. Die Gerätenamen der Controller lauten `flash1`, `flash2` und `flash3`; für jeden weiteren aktivierten Controller wird der entsprechende Gerätename verwendet. Ein von null verschiedener Rückgabewert zeigt an, dass das Gerät erfolgreich registriert wurde.

MTD wird von Dateisystemen und USB-Speicher genutzt. Anwendungscode sucht das Gerät normalerweise und bindet es ein; die MTD-NOR-Schicht kapselt die Lese- und Schreiboperationen. Wenn Sie ein Gerät selbst registrieren, implementieren Sie die unten gezeigte Operationstabelle.

### MTD-NOR-Gerätestruktur { #mtd-nor-types }

```c
struct rt_mtd_nor_device
{
	struct rt_device parent;

	rt_uint32_t block_size;			/* The Block size in the flash */
	rt_uint32_t block_start;		/* The start of available block*/
	rt_uint32_t block_end;			/* The end of available block */

	/* operations interface */
	const struct rt_mtd_nor_driver_ops* ops;
};

struct rt_mtd_nor_driver_ops
{
	rt_uint32_t (*read_id) (struct rt_mtd_nor_device* device);

	rt_size_t (*read)    (struct rt_mtd_nor_device* device, rt_off_t offset, rt_uint8_t* data, rt_uint32_t length);
	rt_size_t (*write)   (struct rt_mtd_nor_device* device, rt_off_t offset, const rt_uint8_t* data, rt_uint32_t length);

	rt_err_t (*erase_block)(struct rt_mtd_nor_device* device, rt_off_t offset, rt_uint32_t length);
};

rt_err_t rt_mtd_nor_register_device(const char* name, struct rt_mtd_nor_device* device);
```

### MTD-NAND-Gerätestruktur { #mtd-nand-types }

```c
struct rt_mtd_nand_device
{
    struct rt_device parent;

    rt_uint16_t page_size;          /* The Page size in the flash */
    rt_uint16_t oob_size;           /* Out-of-band (OOB) bytes per page */
    rt_uint16_t oob_free;           /* the free area in oob that flash driver not use */
    rt_uint16_t plane_num;          /* the number of plane in the NAND Flash */

    rt_uint32_t pages_per_block;    /* The number of page a block */
    rt_uint16_t block_total;

    rt_uint32_t block_start;        /* The start of available block*/
    rt_uint32_t block_end;          /* The end of available block */

    /* operations interface */
    const struct rt_mtd_nand_driver_ops* ops;
};

struct rt_mtd_nand_driver_ops
{
    rt_uint32_t (*read_id) (struct rt_mtd_nand_device* device);

    rt_err_t (*read_page)(struct rt_mtd_nand_device* device,
                          rt_off_t page,
                          rt_uint8_t* data, rt_uint32_t data_len,
                          rt_uint8_t * spare, rt_uint32_t spare_len);

    rt_err_t (*write_page)(struct rt_mtd_nand_device * device,
                           rt_off_t page,
                           const rt_uint8_t * data, rt_uint32_t data_len,
                           const rt_uint8_t * spare, rt_uint32_t spare_len);
    rt_err_t (*move_page) (struct rt_mtd_nand_device *device, rt_off_t src_page, rt_off_t dst_page);

    rt_err_t (*erase_block)(struct rt_mtd_nand_device* device, rt_uint32_t block);
    rt_err_t (*check_block)(struct rt_mtd_nand_device* device, rt_uint32_t block);
    rt_err_t (*mark_badblock)(struct rt_mtd_nand_device* device, rt_uint32_t block);
};

rt_err_t rt_mtd_nand_register_device(const char* name, struct rt_mtd_nand_device* device);
```

Das NOR-Dateisystembeispiel der SiFli-Anleitung registriert `flash1`, sucht das Gerät, formatiert es mit Elm und bindet es ein. Es ist ein Beispiel für SF32LB56x; prüfen Sie die Controllernamen und Dateisystembereiche für die Zielfamilie:

```c
    // 注册MTD DEVICE
    struct rt_mtd_nor_device *nod = malloc(sizeof(struct rt_mtd_nor_device));

    nod->block_start = BSP_FLASH1_FS_START;
    nod->block_size = FLASH_SECT_SIZE;
    nod->block_end = nod->block_start + BSP_FLASH1_FS_SIZE;
    nod->ops = &flash_ops;
    nod->parent.user_data = &lflash_handle[0];
    lflash_handle[0].nod = nod;

    rt_mtd_nor_register_device("flash1", (struct rt_mtd_nor_device *)(lflash_handle[0].nod));
	
	// 查找MTD DEVICE:
	rt_device_t dev = rt_device_find("flash1");
    if (dev) // device find, it has beed registered to mtd
    {
        // MTD设备的使用，直接使用设备名，mkfs, mount都会去查找设备并调用设备的读写接口
        if (dfs_mkfs("elm", "flash1") == 0)
        {
          dfs_mount("flash1", "/", "elm", 0, 0);
		  ....
        }
    }
```

## Bestehendes Flash-Layout prüfen und Speicherbereiche reservieren { #6-reserve-and-review-the-current-flash-layout }

Der [Speichernutzungsleitfaden für SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/memory_usage.html) beschreibt diese Standardaufteilung von QSPI1: Der 64-KB-Bereich von `0x10000000` bis `0x1000FFFF` enthält die Flash-Konfigurationstabelle, die Kalibrierungstabelle und reservierten Speicher. Die folgenden 64 KB von `0x10010000` bis `0x1001FFFF` sind für den Boot-ROM-Patch reserviert; der Benutzercode beginnt bei `0x10020000`. Ist `FLASH2` mit NOR-Flash bestückt, beginnen Bildressourcen bei `0x64000000`. FlashDB (oder EasyFlash) belegt ebenfalls Teile von `flash1` und `flash2` für Variablen und Protokolleinträge. Planen Sie diese Bereiche entsprechend den Systemanforderungen neu ein.

```c
#define FLASH_TABLE_SIZE            (20*1024)
#define FLASH_CAL_TABLE_SIZE        (8*1024)
#define FLASH_BOOT_PATCH_SIZE       (64*1024)

#define FLASH_BASE_ADDR             (0x10000000)
#define FLASH_TABLE_START_ADDR      (FLASH_BASE_ADDR)
#define FLASH_TABLE_END_ADDR        (END_ADDR(FLASH_TABLE_START_ADDR, FLASH_TABLE_SIZE))
#define FLASH_CAL_TABLE_START_ADDR  (FLASH_TABLE_END_ADDR+1)
#define FLASH_BOOT_PATCH_START_ADDR (0x10010000)
#define FLASH_BOOT_PATCH_END_ADDR   (END_ADDR(FLASH_BOOT_PATCH_START_ADDR, FLASH_BOOT_PATCH_SIZE)) /* 0x1001FFFF */
#define FLASH_USER_CODE_START_ADDR   (FLASH_BOOT_PATCH_END_ADDR + 1)   /* 0x10020000 */
```

Behandeln Sie diese Adressen als das Standardlayout der SiFli-Anleitung, nicht als universelle Partitionskarte. Stimmen Sie sie mit dem Ziel-Linker-Skript, dem Bootloader, dem OTA-Plan, den Dateisystembereichen und der tatsächlichen Flash-Kapazität ab, bevor Sie Produktdaten zuweisen.

## Einen NOR-Flash-Baustein portieren { #7-port-a-nor-flash-part }

Verschiedene Platinen können unterschiedliche NOR-Flash-Bausteine verwenden. Gleichen Sie den Baustein sowohl anhand seiner Hardwarespezifikation als auch anhand seiner Befehle ab.

### Hardwareanforderungen { #hardware-requirements }

Prüfen Sie:

- die Versorgungsspannung: 3,3 V oder 1,8 V;
- ob der Baustein SPI mit einer, zwei oder vier Datenleitungen unterstützt;
- die maximale Frequenz für jeden dieser Leitungsmodi; und
- alle weiteren vom Hardwaredesign benötigten Details. Die Anleitung weist darauf hin, dass Betriebstemperatur sowie Lösch-/Programmiergeschwindigkeit für die Software-Portierung in dieser Phase nicht abgeglichen werden müssen.

### Befehle { #operation-commands }

Lese-, Schreib- und Löschbefehle unterscheiden sich je nach Hersteller und Baustein. Vergleichen Sie das Datenblatt mit den Befehls-IDs in `bf0_hal_qspi.h`. Passt keine vorhandene Tabelle, fügen Sie eine neue in `flash_table.c` hinzu.

```c
/**
  * @brief  SPI_FLASH command index
  */
typedef enum
{
    SPI_FLASH_CMD_WREN = 0,  /*!<  write enable, nor+nand    */
    SPI_FLASH_CMD_WRDI,     /*!<  write disable, nor+nand    */
    SPI_FLASH_CMD_RDSR,     /*!<  read status register, nor+nand    */
    SPI_FLASH_CMD_WRSR,     /*!<  write status register, nor+nand    */
    SPI_FLASH_CMD_PREAD,    /*!<  page read, nand    */
    SPI_FLASH_CMD_READ,     /*!<  single line read, nor+nand    */
    SPI_FLASH_CMD_FREAD,    /*!<  fast read , nor + nand    */
    SPI_FLASH_CMD_DREAD,    /*!<  fast read dual output, nor+nand    */
    SPI_FLASH_CMD_QREAD,    /*!<  fast read quad output, nor+nand    */
    SPI_FLASH_CMD_2READ,    /*!<  2 line read, nor+nand    */
    SPI_FLASH_CMD_4READ,   /*!<  4 line read, nor+nand .   ==== 10    */
    SPI_FLASH_CMD_RDID,    /*!<  read id, nor+nand    */
    SPI_FLASH_CMD_PLD,     /*!<  load program data, nand    */
    SPI_FLASH_CMD_QPLD,    /*!<  qual program load, nand    */
    SPI_FLASH_CMD_PLDR,    /*!<  randome program load, nand    */
    SPI_FLASH_CMD_QPLDR,   /*!<  qual random program load, nand    */
    SPI_FLASH_CMD_PEXE,    /*!<  program execute, nand    */
    SPI_FLASH_CMD_BE,      /*!<  block erase, nand    */
    SPI_FLASH_CMD_RST,     /*!<  reset, nor+nand    */
    SPI_FLASH_CMD_RST_EN,     /*!<  reset en, nor    */
    SPI_FLASH_CMD_RDSR2,   /*!<  read status register 2, nor       ==== 20    */
    SPI_FLASH_CMD_WVSR,    /*!<  write volatile status register, nor    */
    SPI_FLASH_CMD_PP,      /*!<  PAGE PROGRAM, nor    */
    SPI_FLASH_CMD_QPP,     /*!<  QUAL PAGE PROGRAM, nor    */
    SPI_FLASH_CMD_RDEAR,     /*!<  read extended address register, nor    */
    SPI_FLASH_CMD_WREAR,     /*!<  write extended address register, nor    */
    SPI_FLASH_CMD_PE,        /*!<  page erase, nor    */
    SPI_FLASH_CMD_SE,        /*!<  SECTOR erase, nor    */
    SPI_FLASH_CMD_BE32,        /*!<  BLOCK erase 32KB, nor    */
    SPI_FLASH_CMD_BE64,        /*!<  BLOCK erase 64KB, nor    */
    SPI_FLASH_CMD_CE,        /*!<  CHIP ERASE, nor             ===== 30    */
    SPI_FLASH_CMD_RDSR3,   /*!<  read status register 3, nor    */
    SPI_FLASH_CMD_WRSR3,   /*!<  WRITE status register 3, nor    */
    SPI_FLASH_CMD_EN4BM,   /*!<  enter 4-byte address mode, nor    */
    SPI_FLASH_CMD_ET4BM,   /*!<  exit 4-byte address mode, nor    */
    SPI_FLASH_CMD_RD4BA,   /*!<  read with 4-byte address, nor    */
    SPI_FLASH_CMD_FR4BA, /*!<  fast read with 4-byte address, nor    */
    SPI_FLASH_CMD_FQR4BA, /*!<  fast read quad output with 4-byte address, nor    */
    SPI_FLASH_CMD_4RD4BA, /*!<  4 IO read with 4-byte address, nor    */
    SPI_FLASH_CMD_PP4BA, /*!<  page program with 4-byte address, nor    */
    SPI_FLASH_CMD_QPP4BA, /*!<  quad page program with 4-byte address, nor     ==== 40    */
    SPI_FLASH_CMD_SE4BA, /*!<  sector erase with 4-byte address, nor    */
    SPI_FLASH_CMD_BE4BA, /*!<  64KB block erase with 4-byte address, nor    */
    SPI_FLASH_CMD_WRSR2, /*!<  write status register command 2, nor    */
    SPI_FLASH_CMD_LEFPA, /*!< Last ECC Failue Page Address, NAND    */
    SPI_FLASH_CMD_BBM, /*!< Bad Block Management, NAND    */
    SPI_FLASH_CMD_RBLUT, /*!< Read BBM Look Up Table, NAND    */
    SPI_FLASH_CMD_COUNT /*!< current support flash command     */
} SPI_FLASH_CMD_E;
```

Das SDK enthält bereits `flash_cmd_table_list`. Ein Baustein kann eine vorhandene Tabelle verwenden, wenn seine Befehle vollständig übereinstimmen; andernfalls fügen Sie eine neue Tabelle hinzu. Die Tabellenkonfiguration lautet:

```c
/**
  * @brief  SPI_FLASH manual command
  */
typedef struct
{
    uint8_t cmd;
    uint8_t func_mode;   /*!<   manual read 0 / write 1  */
    uint8_t data_mode;   /*!<   0 no data / 1 single line / 2 dual line / 3 quad line  */
    uint8_t dummy_cycle;     /*!<   dummy cycle between command and address/data  */
    uint8_t ab_size;          /*!<   alternate byte size, */
    uint8_t ab_mode;          /*!<   alternate byte mode, 0 no, 1 single line, 2 dual line, 3 four-line */
    uint8_t addr_size;   /*!<   address byte count - 1 */
    uint8_t addr_mode;   /*!<   0 no, 1 single line / 2 dual line / 3 four line */
    uint8_t cmd_mode;    /*!<   0 no, 1 single line / 2 dual line / 3 four line */
} FLASH_CMD_CFG_T;
```

Dabei ist `cmd` die Befehls-ID (`0x06` für Write Enable und `0x05` für Read Status in den Beispielen der Anleitung). `func_mode` wählt Lesen oder Schreiben; `data_mode` legt fest, ob keine Daten oder Daten im 1-, 2- oder 4-Leitungsmodus übertragen werden; `dummy_cycle` gibt die zusätzlichen Taktzyklen zwischen Befehl und Adresse beziehungsweise Daten an; `ab_size` und `ab_mode` beschreiben die Alternate-Bytes; `addr_size` und `addr_mode` legen Adresslänge und Leitungsmodus fest; `cmd_mode` bestimmt, ob der Befehl selbst über eine, zwei oder vier Leitungen gesendet wird.

## Einen NAND-Flash-Baustein portieren { #8-port-a-nand-flash-part }

Die NAND-Portierung folgt grundsätzlich demselben Ablauf wie die NOR-Portierung. Befehlssatz und Timing hängen jedoch vom Baustein ab; leiten Sie die erforderliche Sequenz aus dessen Datenblatt ab. Bei manchen Bausteinen weicht das Timing zum Auslesen der ID ab. Lässt sich die ID mit dem Standard-Timing nicht korrekt lesen, passen Sie entweder die ID-Leseroutine an oder konfigurieren Sie die richtige ID explizit, damit die neue Befehlstabelle ausgewählt wird.

## PSRAM portieren { #9-port-psram }

Die SiFli-Anleitung dokumentiert APM-PSRAM in 4-, 8- und 16-Leitungsmodi mit unterstützten Kapazitäten von 4 MB bis 32 MB:

- SF32LB55x unterstützt nur 4-Leitungs-PSRAM.
- SF32LB58x unterstützt 4-Leitungs-, 8-Leitungs- und 16-Leitungs-PSRAM.
- SF32LB56x unterstützt 4-Leitungs- und 8-Leitungs-PSRAM.

Verwenden Sie die MPI-/QSPI-Modus- und Speichergrößeneinstellungen, die zum Gehäuse, zur Platinenverdrahtung und zum PSRAM-Baustein passen.

## J-Link DSK und Open Flashloader verwenden { #10-use-j-link-dsk-and-open-flashloader }

Das Verzeichnis `tools/flash/jlink_drv` des SDK enthält das statische J-Link Device Support Kit (DSK) von SiFli. Die `JLinkDevices.xml` im Stammverzeichnis beschreibt die Zuordnung von Geräten, Flash-Bänken und Loadern; die ELF-Dateien in den Unterverzeichnissen enthalten die jeweiligen Open-Flashloader-Algorithmen.

Installieren Sie J-Link V7.62 oder neuer und kopieren Sie dann das gesamte Verzeichnis `tools/flash/jlink_drv` in das Verzeichnis `JLinkDevices\SiFli` des aktuellen Benutzers. Unter Windows lautet der Standardpfad `C:\Users\<user>\AppData\Roaming\SEGGER\JLinkDevices\SiFli`.

Halten Sie die Einstellungen im Board-Projekt mit den folgenden Vorgaben im Einklang:

- Seit J-Link V7.62 werden alle `*.xml`-Dateien unter `JLinkDevices` rekursiv durchsucht, sodass Sie die `JLinkDevices.xml` der J-Link-Installation nicht ändern müssen.
- Loader-Pfade in der XML werden relativ zu `JLinkDevices.xml` aufgelöst; kopieren Sie das vollständige Verzeichnis, nicht nur ausgewählte ELF-Dateien.
- Das ausgewählte Gerät muss mit `JLINK_DEVICE` in `rtconfig.py` übereinstimmen, zum Beispiel `SF32LB56X`, `SF32LB56X_NAND` oder `SF32LB52X_NOR`.
- Eine `FlashBankInfo` kann mehrere `LoaderInfo`-Einträge enthalten. J-Link verwendet standardmäßig den ersten Loader. Wählen Sie explizit einen anderen Loader mit `_device "<DeviceName>?BankAddr=<FlashBankBase>&Loader=<LoaderName>"_` oder rufen Sie `_JLINK_ExecCommand("DEVICE_SelectLoader BankAddr=<FlashBankBase> Loader=<LoaderName>");_` aus einem J-Link-Skript auf.
- Gerätenamen ohne Suffix wie `SF32LB52X`, `SF32LB55X`, `SF32LB56X` und `SF32LB58X` enthalten inzwischen vollständige Bank- und Loader-Informationen und bevorzugen den NOR-Loader. Die Namen mit Suffix bleiben für die Kompatibilität mit vorhandenen Skripten erhalten.

## Integrations-Checkliste { #integration-checklist }

Halten Sie vor der Verwendung von externem Flash in einem Produkt fest:

1. die genaue SF32-Familie, das Gehäuse, den Flash-Baustein, die Spannung und die unterstützten Leitungsmodi;
2. den QSPI-/MPI-Controller, Modus, DMA, Speichergröße, Geräte-ID sowie die MTD-/Dateisystemeinstellungen;
3. das ausgewählte Adressfenster und die reservierten Bereiche für Tabelle, Kalibrierung, Boot-Patch, Image, Assets, Variablen, Logs und Dateisystemdaten;
4. die erforderliche Ausrichtung beim Löschen und ob der Treiber beim Programmieren oder Löschen aus dem SRAM ausgeführt wird;
5. den MTD-Gerätenamen und den Dateisystem-Einbindungspfad, falls verwendet; und
6. den J-Link-Gerätenamen und die Loader-Auswahl des Boards.

## Verwandte Seiten { #related-pages }

- [Partitionstabellen](../../../firmware-topics/partition-tables.md) — Flash-Bereiche mit Image- und OTA-Layout abgleichen.
- [OTA und DFU](../../../firmware-topics/ota-dfu.md) — Update-Verhalten überprüfen, bevor Produktdatenbereiche reserviert werden.
- [SiFli-SDK-Anwendungshinweise](../sdk-application-notes.md) — der vollständige Index der Anwendungshinweise.

## Offizielle Quelle { #official-source }

- [Flash-Nutzung — SiFli-SDK-Programmierhandbuch](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)
- [SF32LB52x: Flash-Nutzung](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/flash_usage.html)
- [SF32LB55x: Flash-Nutzung](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/flash_usage.html)
- [SF32LB58x: Flash-Nutzung](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/flash_usage.html)
