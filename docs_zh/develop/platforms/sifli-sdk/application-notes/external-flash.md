---
icon: lucide/hard-drive
title: "使用外部 Flash"
description: "使用 SiFli-SDK 配置、访问、挂载并移植外部 NOR Flash、NAND Flash 和 PSRAM。"
tags: [开发, SiFli-SDK, 应用笔记, Flash]
---

# 使用外部 Flash { #use-external-flash }

本文根据思澈科技（SiFli）的 [Flash 使用指南](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)整理出一套外部存储集成流程，覆盖 SF32LB52x、SF32LB55x、SF32LB56x 和 SF32LB58x 的控制器配置、地址空间、RT-Thread 直接访问、MTD 文件系统、预留区域、新型号 Flash 器件的驱动移植、PSRAM 以及 J-Link Open Flashloader 支持。

原指南中的 `FLASH` 同时指 NOR Flash 和 NAND Flash。本文保留 SDK 的符号名和设备名；复制配置到产品前，请先核对目标 SDK 分支和开发板原理图。

## 控制器模型和能力 { #1-controller-model-and-capabilities }

思澈科技（SiFli）的 Flash 控制器可以同时连接多个 Flash 器件：

<div align="center" markdown>

<em>表：各系列 Flash 控制器能力</em>

| 系列 | 最大器件数 | 本文覆盖的 PSRAM 线数 | 示例中的控制器命名 |
|---|---:|---|---|
| SF32LB52x | 汇总的源资料未列出该项 | 以目标系列指南为准 | 以目标 SDK 的 QSPI/MPI 命名为准 |
| SF32LB55x | 4 | 仅 4 线 PSRAM | QSPI |
| SF32LB56x | 4 | 4 线和 8 线 PSRAM | MPI/QSPI 兼容命名 |
| SF32LB58x | 5 | 4 线、8 线和 16 线 PSRAM | MPI/QSPI 兼容命名 |
</div>

这些器件可以是 NOR Flash，也可以是 NAND Flash。相较于 SF32LB55x，SF32LB56x 和 SF32LB58x 的控制器都支持 8 线 PSRAM；其中，SF32LB58x 还支持 16 线 PSRAM。早期的控制器称为 QSPI，面向更多存储器类型的新控制器称为 MPI。

典型的控制器分配如下：

- **SF32LB55x：** 控制器 1 通常处理片内 NOR Flash；控制器 2 和 3 取决于板级方案；控制器 4 连接 NOR Flash，可由 LCPU 访问（HCPU 也可以访问）。
- **SF32LB58x：** 控制器 1 和 2 通常处理片内 NOR Flash 或 PSRAM，具体取决于封装；控制器 3 和 4 取决于板级方案；控制器 5 是片内 NOR Flash，可由 LCPU 访问（HCPU 也可以访问）。
- **SF32LB56x：** 控制器 1 和 2 通常处理片内 NOR Flash 或 PSRAM，具体取决于封装；控制器 3 取决于板级方案；控制器 5 是片内 NOR Flash，可由 LCPU 访问（HCPU 也可以访问）。该系列没有控制器 4。

Flash 驱动分为两层：HAL 层负责访问硬件寄存器和执行基础逻辑；DRV 层提供 Flash 读写、擦除、初始化和控制功能，以及供设备和文件系统使用的接口。

控制器支持单线和四线 Flash 操作，内部可以使用 DMA 加速，支持页编程、页读取以及不同大小的扇区/块擦除。NOR Flash 还可以通过 AHB 内存接口直接读取；基本擦除单位取决于具体 Flash 器件。

## 配置 QSPI 或 MPI { #2-configure-qspi-or-mpi }

Flash 属性和使用方式通过 `menuconfig` 配置，并生成 `rtconfig.h`。配置项包括控制器使能、DMA、MTD 注册、文件系统设置、存储容量，以及设备 ID 的处理方式（自动读取或手动指定）。

### SF32LB55x QSPI 示例 { #sf32lb55x-qspi-example }

在 `menuconfig` 中，原指南依次进入 **RTOS → On-chip Peripheral Driver → Enable QSPI → Enable QSPI Driver → QSPI Controller 1 Enable**，再选择 QSPI1 模式、是否使用文件系统、存储容量，以及设备 ID 是自动读取还是手动指定。

对应的 `rtconfig.h` 定义如下：

```c
#define BSP_USING_QSPI 1            /*使能QSPI 模块*/
#define BSP_USING_SPI_FLASH 1       /*使能QSPI 控制FLASH功能（为了兼容以前版本）*/
#define BSP_ENABLE_QSPI1 1          /*使能QSPI控制器1*/
#define BSP_QSPI1_USING_DMA 1       /*QSPI1 使用FIFO DMA */
#define BSP_QSPI1_MODE 0            /*QSPI1 连接控制Nor FLASH*/
#define BSP_QSPI1_MEM_SIZE 4        /*配置FLASH1的总大小为4MB*/
#define BSP_QSPI1_CHIP_ID 0         /*FLASH1 DEV ID 由系统获取，不需要手动输入（这个配置是为了当有些FLASH获取ID的命令时序与默认设置不同时，手动添加ID以便查找正确的命令表）*/
```

第二个 NOR Flash 和第三个 NAND Flash 的源示例如下：

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

### SF32LB58x MPI 示例 { #sf32lb58x-mpi-example }

在 SF32LB58x EVB 上，原指南依次进入 **RTOS → On-chip Peripheral Driver → Enable MPI → Enable QSPI Driver → MPI Controller 1 Enable**，再选择 MPI 模式、存储容量和其他器件选项。模式值为：`0 NOR`、`1 NAND`、`2 PSRAM`、`3 OPSRAM`、`4 HPSRAM` 和 `5 LEGACY_PSRAM`。

MPI 总开关和各控制器示例如下：

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

SF32LB56x 的 MPI 配置基本与 SF32LB58x 一致，但不存在 MPI4。

!!! warning "核对 MPI 配置示例"
    思澈科技（SiFli）的源资料中，MPI1 配置说明与示例代码存在矛盾：文字说明称 MPI1 默认连接 NOR Flash，且模式不可修改；紧接着的配置片段却将 MPI1 配置为模式 4（16 线 PSRAM）。此外，MPI1 的 `BSP_QSPI1_MEM_SIZE` 值为 `32`，注释称总容量为 16 MB；MPI4 的配置值为 `128`，注释称 128 MB，而 EVB 容量表列为 64 MB。本文保留源代码配置值，不推断宏的编码含义或实际容量。请以目标 SDK 版本的 Kconfig/生成配置、开发板原理图及器件规格为准。

## Flash 地址空间 { #3-flash-address-spaces }

下表是控制器的最大地址窗口。实际可用容量由 `menuconfig` 中选择的 Flash 器件决定，不能只依据最大窗口判断。

### SF32LB55x { #sf32lb55x }

<div align="center" markdown>

<em>表：SF32LB55x Flash 控制器地址窗口</em>

| 控制器 | 起始地址 | 结束地址 | 最大窗口 | EVB 说明 |
|:-------|:---------|:---------|:---------|:---------|
| FLASH1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 字节 | EVB 容量 4 MB |
| FLASH2 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 字节 | EVB 容量 32 MB |
| FLASH3 | `0x68000000` | `0x6FFFFFFF` | 128 × 1024 × 1024 字节 | EVB 未使能 |
| FLASH4 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 字节 | EVB 未使能 |
</div>

控制器基地址定义位于 `mem_map.h`：

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x64000000)
#define QSPI3_MEM_BASE   (0x68000000)
#define QSPI4_MEM_BASE   (0x12000000)
```

### SF32LB58x { #sf32lb58x }

**C-BUS 地址空间**

<div align="center" markdown>

<em>表：SF32LB58x C-BUS 地址空间</em>

| 控制器 | 起始地址 | 结束地址 | 最大窗口 | EVB 说明 |
|:-------|:---------|:---------|:---------|:---------|
| MPI1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 字节 | EVB 容量 16 MB |
| MPI2 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 字节 | EVB 容量 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 字节 | EVB 容量 32 MB |
| MPI4 | `0x18000000` | `0x1BFFFFFF` | 64 × 1024 × 1024 字节 | EVB 容量 64 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 字节 | EVB 容量 4 MB |
</div>

**S-BUS 地址空间**

<div align="center" markdown>

<em>表：SF32LB58x S-BUS 地址空间</em>

| 控制器 | 起始地址 | 结束地址 | 最大窗口 | EVB 说明 |
|:-------|:---------|:---------|:---------|:---------|
| MPI1 | `0x60000000` | `0x61FFFFFF` | 32 × 1024 × 1024 字节 | EVB 容量 16 MB |
| MPI2 | `0x62000000` | `0x63FFFFFF` | 32 × 1024 × 1024 字节 | EVB 容量 16 MB |
| MPI3 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 字节 | EVB 容量 32 MB |
| MPI4 | `0x68000000` | `0x9FFFFFFF` | 896 × 1024 × 1024 字节 | EVB 容量 64 MB |
</div>

如果需要让 NAND Flash 使用超过 64 MB 的空间，指南建议将其挂载到 MPI4，并使用从 `0x68000000` 开始的地址。

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x12000000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI4_MEM_BASE   (0x18000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

### SF32LB56x { #sf32lb56x }

**C-BUS 地址空间**

<div align="center" markdown>

<em>表：SF32LB56x C-BUS 地址空间</em>

| 控制器 | 起始地址 | 结束地址 | 最大窗口 | EVB 说明 |
|:-------|:---------|:---------|:---------|:---------|
| MPI1 | `0x10000000` | `0x107FFFFF` | 8 × 1024 × 1024 字节 | EVB 容量 4 MB |
| MPI2 | `0x10800000` | `0x13FFFFFF` | 56 × 1024 × 1024 字节 | EVB 容量 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 字节 | EVB 容量 128 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 字节 | EVB 容量 1 MB |
</div>

**S-BUS 地址空间**

<div align="center" markdown>

<em>表：SF32LB56x S-BUS 地址空间</em>

| 控制器 | 起始地址 | 结束地址 | 最大窗口 |
|:-------|:---------|:---------|:---------|
| MPI1 | `0x60000000` | `0x607FFFFF` | 8 × 1024 × 1024 字节 |
| MPI2 | `0x60800000` | `0x63FFFFFF` | 56 × 1024 × 1024 字节 |
| MPI3 | `0x64000000` | `0x9FFFFFFF` | 960 × 1024 × 1024 字节 |
</div>

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x10800000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

!!! note "地址窗口不等于器件容量"
    原指南将 SF32LB56x MPI3 的 C-BUS 地址范围列为 `0x14000000`–`0x17FFFFFF`，却将窗口大小标为 128 MB。按包含首尾地址计算，该范围实际为 64 MB，因此上表采用 64 MB。原指南中的 EVB 器件容量仍单独保留为 128 MB；器件容量不能用于推算这个 C-BUS 窗口的大小。使用地址范围前，请核对目标 SDK 的内存映射。

## 通过 RT-Thread 访问 Flash { #4-access-flash-through-rt-thread }

RT-Thread 的 Flash 接口根据绝对地址选择控制器。先完成控制器和 Flash 器件配置并生成 `rtconfig.h`，再调用 `rt_hw_flash_init`：

```c
int rt_hw_flash_init(void);
int rt_flash_read(rt_uint32_t addr, rt_uint8_t *buf, size_t size);
int rt_flash_write(rt_uint32_t addr, const rt_uint8_t *buf, size_t size);
rt_err_t rt_flash_erase(rt_uint32_t addr, size_t size);
```

`rt_flash_read` 和 `rt_flash_write` 成功时返回实际读写的字节数，失败时返回 `0`；`rt_flash_erase` 成功时返回 `RT_EOK`。以上为便于阅读而整理的接口声明，实际头文件和返回行为应以目标 SDK 分支为准。

使用 `rt_flash_read` 读取 NOR 和 NAND。NOR 也可以通过内存窗口直接读取；NAND 则必须通过 API 读取，并由调用方管理缓冲区。两者的写操作都使用 `rt_flash_write`。擦除时，NOR 的地址和长度通常需要按扇区对齐（一般为 4 KB），NAND 则需要按块对齐（一般为 128 KB）。未对齐区域中的数据需要由调用方自行备份和恢复。

如果 Flash 不支持 XIP，就不能在同一片 Flash 上执行代码的同时进行擦写。因此应将 Flash 驱动代码放到 SRAM 中执行。原指南的 Keil 链接脚本片段在 `0x200E1000` 开始处预留 64 KB：

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

原指南的回读示例存在未初始化数据缓冲区和清理路径错误，不能直接运行。下面改为传入测试地址的 NOR Flash 示例，不预设产品中的固定地址：

!!! warning "擦除测试具有破坏性"
    仅在专用、可擦写的 NOR 测试区域中运行，并将示例中的 `TEST_SIZE` 调整为器件与驱动要求的擦除粒度。测试区域至少应覆盖完整擦除单元；地址和长度必须满足对齐要求。不得覆盖引导配置、校准数据、固件/OTA 镜像、文件系统或用户数据。本例不适用于 NAND；NAND 还需要按器件和驱动处理坏块、ECC、OOB 及页/块约束。

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

## 通过 RT-Thread MTD 使用 Flash { #5-use-flash-through-rt-thread-mtd }

RT-Thread 提供 MTD-NOR 和 MTD-NAND 两类设备驱动。如果在配置文件中正确配置并使能 MTD 和文件系统，系统启动时会自动注册设备。可以通过 `rt_device_find("flash1")` 查询；控制器设备名分别为 `flash1`、`flash2`、`flash3`（以及其他已使能控制器对应的设备名）。返回非空值表示注册成功。

MTD 可供文件系统和 USB 存储使用。应用通常只需查找设备并绑定；MTD-NOR 已封装读写操作。如果自行注册设备，则需要实现下面的操作表。

### MTD-NOR 设备结构 { #mtd-nor-types }

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

### MTD-NAND 设备结构 { #mtd-nand-types }

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

原指南中的 NOR 文件系统示例注册 `flash1`、查找设备、使用 Elm 格式化并挂载。该示例针对 SF32LB56x；目标系列应重新确认控制器名称和文件系统区域：

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

## 检查并预留当前 Flash 布局 { #6-reserve-and-review-the-current-flash-layout }

思澈科技（SiFli）的 [SF32LB55x 内存使用指南](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/memory_usage.html) 给出了默认的 QSPI1 布局：`0x10000000` 至 `0x1000FFFF` 的 64 KB 区域包含 Flash 配置表、校准表和保留区；接下来的 64 KB（`0x10010000` 至 `0x1001FFFF`）用于 Boot ROM 补丁，用户代码从 `0x10020000` 开始。如果 `FLASH2` 使用 NOR Flash，图片资源从 `0x64000000` 开始。FlashDB（或 EasyFlash）也会使用 `flash1` 和 `flash2` 的部分空间保存变量和日志；这些区域需要根据系统需求重新规划。

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

这些地址是原指南中的默认布局，不是适用于所有产品的通用分区表。分配产品数据前，应与目标链接脚本、引导程序（bootloader）、OTA 方案、文件系统范围和实际 Flash 容量统一核对。

## 移植 NOR Flash 器件驱动 { #7-port-a-nor-flash-part }

不同开发板可能使用不同型号的 NOR Flash。移植驱动时，需要同时核对器件的硬件规格和操作命令。

### 硬件要求 { #hardware-requirements }

请检查：

- 供电电压：3.3 V 或 1.8 V；
- 器件是否支持单线、双线和四线 SPI；
- 各种线数模式下支持的最高频率；
- 硬件设计所需的其他规格。原指南指出，工作温度和擦写速度不属于此阶段软件移植所要求的匹配条件。

### 操作命令 { #operation-commands }

读、写和擦除命令随厂商及器件型号而异。请将器件规格书与 `bf0_hal_qspi.h` 中的命令 ID 对照；如果现有命令表不匹配，则在 `flash_table.c` 中添加命令表。

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

SDK 已包含 `flash_cmd_table_list`。如果器件命令与现有表完全一致，可以直接复用；否则需要添加新的命令表。表项结构如下：

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

其中，`cmd` 是命令 ID（源示例中写使能为 `0x06`，读状态寄存器为 `0x05`）；`func_mode` 选择读或写；`data_mode` 选择无数据、单线、双线或四线数据；`dummy_cycle` 表示命令与地址/数据之间的空时钟周期；`ab_size` 和 `ab_mode` 描述交替字节（alternate bytes）；`addr_size` 和 `addr_mode` 描述地址长度及线数模式；`cmd_mode` 表示命令本身使用单线、双线还是四线发送。

## 移植 NAND Flash 器件驱动 { #8-port-a-nand-flash-part }

NAND 驱动的移植流程基本与 NOR 一致，但命令集和时序因器件而异，需要依据具体器件的规格书确定操作序列。有些器件的 ID 读取时序不同；如果默认时序无法读到正确 ID，就需要修改 ID 读取实现，或者在配置中显式指定正确 ID，以便选中新增的命令表。

## 移植 PSRAM { #9-port-psram }

原指南记录了 APM PSRAM 的支持情况：支持 4 线、8 线和 16 线模式，容量覆盖 4 MB 到 32 MB：

- SF32LB55x 只支持 4 线 PSRAM。
- SF32LB58x 支持 4 线、8 线和 16 线 PSRAM。
- SF32LB56x 支持 4 线和 8 线 PSRAM。

请根据芯片封装、板级布线和 PSRAM 器件选择匹配的 MPI / QSPI 模式及存储容量配置。

## 使用 J-Link DSK 和 Open Flashloader { #10-use-j-link-dsk-and-open-flashloader }

SDK 中的 `tools/flash/jlink_drv` 是思澈科技（SiFli）提供的静态 J-Link 设备支持包（Device Support Kit，DSK）。根目录下的 `JLinkDevices.xml` 描述设备、Flash 存储区（bank）和加载器（loader）的关系；各子目录中的 ELF 文件是对应的 Open Flashloader 算法。

请安装 J-Link V7.62 或更高版本，然后将整个 `tools/flash/jlink_drv` 目录复制到当前用户的 `JLinkDevices\SiFli` 目录。Windows 默认路径为 `C:\Users\<user>\AppData\Roaming\SEGGER\JLinkDevices\SiFli`。

请让以下规则与板级工程保持一致：

- 从 J-Link V7.62 开始，`JLinkDevices` 下的所有 `*.xml` 文件会被递归扫描，因此不需要修改 J-Link 安装目录中的 `JLinkDevices.xml`。
- XML 中的加载器路径相对于 `JLinkDevices.xml` 解析，因此必须复制完整目录，不能只复制部分 ELF 文件。
- 选择的设备必须与板级工程 `rtconfig.py` 中的 `JLINK_DEVICE` 一致，例如 `SF32LB56X`、`SF32LB56X_NAND` 或 `SF32LB52X_NOR`。
- 同一个 `FlashBankInfo` 下可以包含多个 `LoaderInfo`。J-Link 默认使用列表中的第一个加载器。需要显式选择其他加载器时，可使用 `_device "<DeviceName>?BankAddr=<FlashBankBase>&Loader=<LoaderName>"_`，或在 J-Link 脚本中调用 `_JLINK_ExecCommand("DEVICE_SelectLoader BankAddr=<FlashBankBase> Loader=<LoaderName>");_`。
- 不带后缀的设备名，如 `SF32LB52X`、`SF32LB55X`、`SF32LB56X` 和 `SF32LB58X`，现在已经包含完整的存储区和加载器信息，并默认优先使用 NOR 加载器。带后缀的设备名仍然保留，用于兼容已有脚本。

## 集成检查清单 { #integration-checklist }

将外部 Flash 用于产品前，请记录：

1. 准确的 SF32 系列、封装、Flash 器件、电压和支持的线数模式；
2. QSPI / MPI 控制器、模式、DMA、存储容量、设备 ID 以及 MTD / 文件系统设置；
3. 地址窗口和预留区域：表、校准数据、启动补丁、镜像、资源、变量、日志和文件系统数据；
4. 擦除对齐要求，以及擦写期间驱动是否从 SRAM 执行；
5. 使用的 MTD 设备名和文件系统挂载路径；
6. 开发板的 J-Link 设备名和加载器选择。

## 相关页面 { #related-pages }

- [分区表](../../../firmware-topics/partition-tables.md) — 将 Flash 区域与镜像和 OTA 布局统一起来。
- [OTA 与 DFU](../../../firmware-topics/ota-dfu.md) — 预留产品数据区域前检查升级行为。
- [SiFli-SDK 应用笔记](../sdk-application-notes.md) — 完整的应用笔记索引。

## 官方来源 { #official-source }

- [Flash 使用指南 — SiFli-SDK 编程指南](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)
- [SF32LB52x Flash 使用指南](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/flash_usage.html)
- [SF32LB55x Flash 使用指南](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/flash_usage.html)
- [SF32LB58x Flash 使用指南](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/flash_usage.html)
