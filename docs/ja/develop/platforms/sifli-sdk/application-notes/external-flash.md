---
icon: lucide/hard-drive
title: "外付けFlashメモリーの使い方"
description: "SiFli-SDKで外付けNOR Flash、NAND Flash、PSRAMを設定・アクセスし、ファイルシステムをマウントする方法と、ドライバーの移植方法を解説します。"
tags: [開発, SiFli-SDK, アプリケーションノート, Flash]
---

# 外付けFlashメモリーの使い方 { #use-external-flash }

この記事では、SiFliの[Flash使用ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)を基に、SF32LB52x、SF32LB55x、SF32LB56x、SF32LB58xに外付けメモリーを組み込む手順をまとめています。コントローラー設定、ファミリー別のアドレス空間、RT-Threadからの直接アクセス、MTDファイルシステム、予約領域、新しいFlashデバイス向けドライバーの移植、PSRAM、J-Link Open Flashloaderへの対応を扱います。

参照元のガイドでは、NOR FlashとNAND Flashの両方に`FLASH`という表記を使っています。サンプル内のSDKシンボルとデバイス名は変更していません。製品に設定を適用する前に、対象SDKのブランチと基板回路図を確認してください。

## コントローラーの構成と機能 { #1-controller-model-and-capabilities }

SiFliのFlashコントローラーには、複数のFlashデバイスを同時に接続できます。

<div align="center" markdown>

<em>表: ファミリー別のFlashコントローラー機能</em>

| ファミリー | 最大デバイス数 | 本ガイドで扱うPSRAMのラインモード | サンプルでのコントローラー名 |
|---|---:|---|---|
| SF32LB52x | この資料には記載なし | 対象ファミリーのガイドで確認 | 対象SDKのQSPI／MPI名称を確認 |
| SF32LB55x | 4 | 4ラインPSRAMのみ | QSPI |
| SF32LB56x | 4 | 4ラインおよび8ラインPSRAM | MPI／QSPIの互換名称 |
| SF32LB58x | 5 | 4、8、16ラインPSRAM | MPI／QSPIの互換名称 |
</div>

接続するデバイスにはNOR FlashとNAND Flashがあります。SF32LB55xと比べて、SF32LB56xとSF32LB58xのコントローラーは8ラインPSRAMに対応します。さらに、SF32LB58xは16ラインPSRAMにも対応します。従来の構成ではコントローラーをQSPIと呼び、新しいメモリー向け構成ではMPIと呼びます。

一般的なコントローラーの割り当ては次のとおりです。

- **SF32LB55x：**通常、コントローラー1はチップ内蔵NOR Flashを扱います。コントローラー2と3は基板設計によって異なります。コントローラー4にはNOR Flashを接続し、LCPU（およびHCPU）からアクセスできます。
- **SF32LB58x：**コントローラー1と2は、パッケージに応じてチップ内蔵NOR FlashまたはPSRAMを扱います。コントローラー3と4は基板設計によって異なります。コントローラー5はチップ内蔵NOR Flashで、LCPU（およびHCPU）からアクセスできます。
- **SF32LB56x：**コントローラー1と2は、パッケージに応じてチップ内蔵NOR FlashまたはPSRAMを扱います。コントローラー3は基板設計によって異なります。コントローラー5はチップ内蔵NOR Flashで、LCPU（およびHCPU）からアクセスできます。コントローラー4はありません。

ドライバーは2層構成です。HAL層はハードウェアレジスターへのアクセスと基本的な処理を提供します。DRV層はFlashの読み出し／書き込み／消去、初期化と制御、およびデバイスやファイルシステムが使うインターフェースを提供します。

コントローラーは、1ライン／4ラインFlash操作、DMAによる高速化、ページ書き込み、ページ読み出し、セクター／ブロック消去に対応します。NOR FlashはAHBメモリーインターフェースから直接読み出すこともできます。最小消去単位はFlashデバイスによって異なります。

## QSPIまたはMPIを設定する { #2-configure-qspi-or-mpi }

Flashの属性と用途は`menuconfig`で設定し、その結果として`rtconfig.h`が生成されます。設定項目には、コントローラーの有効化、DMAの使用、MTD登録、ファイルシステム、メモリーサイズ、デバイスIDの扱い（自動取得または手動指定）などがあります。

### SF32LB55xのQSPI設定例 { #sf32lb55x-qspi-example }

参照元のガイドでは、`menuconfig`の **RTOS → On-chip Peripheral Driver → Enable QSPI → Enable QSPI Driver → QSPI Controller 1 Enable** を選択し、続けてQSPI1のモード、ファイルシステムの使用、メモリーサイズ、デバイスIDを自動取得するか手動指定するかを設定します。

対応する`rtconfig.h`の定義は次のとおりです。

```c
#define BSP_USING_QSPI 1            /*使能QSPI 模块*/
#define BSP_USING_SPI_FLASH 1       /*使能QSPI 控制FLASH功能（为了兼容以前版本）*/
#define BSP_ENABLE_QSPI1 1          /*使能QSPI控制器1*/
#define BSP_QSPI1_USING_DMA 1       /*QSPI1 使用FIFO DMA */
#define BSP_QSPI1_MODE 0            /*QSPI1 连接控制Nor FLASH*/
#define BSP_QSPI1_MEM_SIZE 4        /*配置FLASH1的总大小为4MB*/
#define BSP_QSPI1_CHIP_ID 0         /*FLASH1 DEV ID 由系统获取，不需要手动输入（这个配置是为了当有些FLASH获取ID的命令时序与默认设置不同时，手动添加ID以便查找正确的命令表）*/
```

2個目のNOR Flashと3個目のNAND Flashについて、参照元には次の設定例があります。

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

### SF32LB58xのMPI設定例 { #sf32lb58x-mpi-example }

SF32LB58x EVBでは、参照元のガイドに従い **RTOS → On-chip Peripheral Driver → Enable MPI → Enable QSPI Driver → MPI Controller 1 Enable** を選び、MPIモード、メモリーサイズ、その他のデバイス設定を行います。モード値は`0 NOR`、`1 NAND`、`2 PSRAM`、`3 OPSRAM`、`4 HPSRAM`、`5 LEGACY_PSRAM`です。

共通のMPI有効化設定と、コントローラーごとの設定例を示します。

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

SF32LB56xのMPI設定はSF32LB58xとほぼ同じですが、MPI4はありません。

!!! warning "MPI設定例の確認"
    SiFliの資料にはMPI1の設定について矛盾があります。説明文では「MPI1は標準でNOR Flashに接続され、モードを変更できない」とされていますが、続く設定例ではMPI1をモード4（16ラインPSRAM）に設定しています。また、例の`BSP_QSPI1_MEM_SIZE`は`32`ですがコメントは16 MB、MPI4の値は`128`でコメントは128 MBである一方、EVB容量表では64 MBです。本記事では設定値を原資料どおりに残し、マクロ値の意味や実容量を推測していません。対象SDKのKconfig／生成設定、基板回路図、メモリーのデータシートで確認してください。

## Flashのアドレス空間 { #3-flash-address-spaces }

以下の範囲は、コントローラーが提供する最大ウィンドウです。実際に使用できる容量は最大ウィンドウだけでは決まらず、`menuconfig`で選択したFlashデバイスの容量に依存します。

### SF32LB55x { #sf32lb55x }

<div align="center" markdown>

<em>表: SF32LB55x Flashコントローラーのアドレスウィンドウ</em>

| コントローラー | 開始アドレス | 終了アドレス | 最大ウィンドウ | EVBの構成 |
|:-----------|:------|:----|:---------------|:----------------|
| FLASH1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 bytes | EVB容量4 MB |
| FLASH2 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 bytes | EVB容量32 MB |
| FLASH3 | `0x68000000` | `0x6FFFFFFF` | 128 × 1024 × 1024 bytes | EVBでは無効 |
| FLASH4 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 bytes | EVBでは無効 |
</div>

コントローラーのベースアドレスは`mem_map.h`で定義されています。

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x64000000)
#define QSPI3_MEM_BASE   (0x68000000)
#define QSPI4_MEM_BASE   (0x12000000)
```

### SF32LB58x { #sf32lb58x }

**C-BUSアドレス空間**

<div align="center" markdown>

<em>表: SF32LB58xのC-BUSアドレス空間</em>

| コントローラー | 開始アドレス | 終了アドレス | 最大ウィンドウ | EVBの構成 |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 bytes | EVB容量16 MB |
| MPI2 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 bytes | EVB容量16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 bytes | EVB容量32 MB |
| MPI4 | `0x18000000` | `0x1BFFFFFF` | 64 × 1024 × 1024 bytes | EVB容量64 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 bytes | EVB容量4 MB |
</div>

**S-BUSアドレス空間**

<div align="center" markdown>

<em>表: SF32LB58xのS-BUSアドレス空間</em>

| コントローラー | 開始アドレス | 終了アドレス | 最大ウィンドウ | EVBの構成 |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x60000000` | `0x61FFFFFF` | 32 × 1024 × 1024 bytes | EVB容量16 MB |
| MPI2 | `0x62000000` | `0x63FFFFFF` | 32 × 1024 × 1024 bytes | EVB容量16 MB |
| MPI3 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 bytes | EVB容量32 MB |
| MPI4 | `0x68000000` | `0x9FFFFFFF` | 896 × 1024 × 1024 bytes | EVB容量64 MB |
</div>

64 MBを超えるNAND Flashについて、ガイドではMPI4に接続し、`0x68000000`から始まるアドレスを使うことを推奨しています。

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x12000000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI4_MEM_BASE   (0x18000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

### SF32LB56x { #sf32lb56x }

**C-BUSアドレス空間**

<div align="center" markdown>

<em>表: SF32LB56xのC-BUSアドレス空間</em>

| コントローラー | 開始アドレス | 終了アドレス | 最大ウィンドウ | EVBの構成 |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x107FFFFF` | 8 × 1024 × 1024 bytes | EVB容量4 MB |
| MPI2 | `0x10800000` | `0x13FFFFFF` | 56 × 1024 × 1024 bytes | EVB容量16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 bytes | EVB容量128 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 bytes | EVB容量1 MB |
</div>

**S-BUSアドレス空間**

<div align="center" markdown>

<em>表: SF32LB56xのS-BUSアドレス空間</em>

| コントローラー | 開始アドレス | 終了アドレス | 最大ウィンドウ |
|:-----------|:------|:----|:---------------|
| MPI1 | `0x60000000` | `0x607FFFFF` | 8 × 1024 × 1024 bytes |
| MPI2 | `0x60800000` | `0x63FFFFFF` | 56 × 1024 × 1024 bytes |
| MPI3 | `0x64000000` | `0x9FFFFFFF` | 960 × 1024 × 1024 bytes |
</div>

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x10800000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

!!! note "アドレスウィンドウとデバイス容量の違い"
    参照元では、SF32LB56x MPI3のC-BUS範囲を`0x14000000`～`0x17FFFFFF`としながら、そのサイズを128 MBと記載しています。開始・終了アドレスを含めて計算すると64 MBになるため、上表ではウィンドウサイズを64 MBとしています。参照元にあるEVBのデバイス容量128 MBは別の値として残しています。デバイス容量からこのC-BUSウィンドウのサイズは判断できません。使用前に対象SDKのメモリーマップを確認してください。

## RT-ThreadからFlashにアクセスする { #4-access-flash-through-rt-thread }

RT-ThreadのFlashインターフェースは、絶対アドレスからコントローラーを選択します。コントローラーとデバイスの設定が`rtconfig.h`に生成された後で、`rt_hw_flash_init`を呼び出してください。

```c
int rt_hw_flash_init(void);
int rt_flash_read(rt_uint32_t addr, rt_uint8_t *buf, size_t size);
int rt_flash_write(rt_uint32_t addr, const rt_uint8_t *buf, size_t size);
rt_err_t rt_flash_erase(rt_uint32_t addr, size_t size);
```

`rt_flash_read`と`rt_flash_write`は、成功時に実際に転送したバイト数を返し、失敗時は`0`を返します。`rt_flash_erase`は成功時に`RT_EOK`を返します。読みやすさのために宣言を整理しています。実際のヘッダーと戻り値は、対象SDKブランチで確認してください。

NORとNANDの読み出しには`rt_flash_read`を使用します。NORはメモリーウィンドウから直接読み出すこともできますが、NANDではAPIを使用し、呼び出し側でバッファーを管理する必要があります。どちらの種類にも`rt_flash_write`を使用してください。消去時、NORは通常セクター境界（一般に4 KB）、NANDは通常ブロック境界（一般に128 KB）にアドレスとサイズを合わせます。境界に揃わないデータは、呼び出し側で退避・復元してください。

FlashがXIPに対応しない場合、実行中のコードと同じFlashを消去または書き込みすることはできません。FlashドライバーのコードをSRAMに配置してください。参照元のKeilリンカーフラグメントでは、`0x200E1000`から64 KBを予約しています。

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

元の読み書き確認サンプルには、初期化されていないデータバッファーと誤った後処理があり、そのまま実行できません。以下は、製品で使う固定アドレスを仮定せず、テスト領域のアドレスを引数で受け取るNOR Flash専用の例です。

!!! warning "消去テストはデータを破壊します"
    専用の消去可能なNORテスト領域でのみ実行し、`TEST_SIZE`はメモリーとドライバーが要求する消去単位に合わせてください。テスト領域には少なくとも消去単位全体を確保し、アドレスと長さを適切に整列させてください。ブート設定、校正データ、ファームウェア／OTAイメージ、ファイルシステム、ユーザーデータは対象にしないでください。この例はNAND用ではありません。NANDではデバイスとドライバーに応じた不良ブロック、ECC、OOB、ページ／ブロックの処理も必要です。

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

## RT-Thread MTD経由でFlashを使用する { #5-use-flash-through-rt-thread-mtd }

RT-ThreadにはMTD-NORおよびMTD-NANDデバイスドライバーがあります。設定でMTDとファイルシステムを有効にすると、起動時にデバイスが登録されます。`rt_device_find("flash1")`でコントローラーを検索します。コントローラー名は`flash1`、`flash2`、`flash3`です（有効にした各コントローラーに対応するデバイス名が使われます）。戻り値がNULLでなければ、登録は成功しています。

MTDはファイルシステムやUSBストレージから使用されます。通常、アプリケーションコードでデバイスを検索して関連付けます。MTD NOR層が読み出し／書き込み操作をカプセル化します。デバイスを独自に登録する場合は、以下の操作テーブルを実装してください。

### MTD-NORのデータ構造 { #mtd-nor-types }

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

### MTD-NANDのデータ構造 { #mtd-nand-types }

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

参照元のNORファイルシステム例では、`flash1`を登録・検索し、Elmでフォーマットしてマウントします。これはSF32LB56x向けの参照ガイドの例です。対象ファミリーのコントローラー名とファイルシステム領域を確認してください。

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

## 現在のFlashレイアウトを確認し、領域を確保する { #6-reserve-and-review-the-current-flash-layout }

SiFliの[SF32LB55xメモリー使用ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/memory_usage.html)では、QSPI1のデフォルト配置を次のように示しています。`0x10000000`～`0x1000FFFF`の64 KB領域にはFlash設定テーブル、キャリブレーションテーブル、予約領域が含まれます。続く`0x10010000`～`0x1001FFFF`の64 KBはブートROMパッチ用で、ユーザーコードは`0x10020000`から始まります。`FLASH2`がNOR Flashの場合、画像リソースは`0x64000000`から配置します。FlashDB（またはEasyFlash）も`flash1`と`flash2`の一部を変数やログに使用します。システム要件に合わせてこれらの領域を確保し直し、再分割してください。

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

これらのアドレスは参照元ガイドのデフォルト配置であり、すべての製品に共通するパーティションマップではありません。製品データを割り当てる前に、対象リンカースクリプト、ブートローダー、OTA計画、ファイルシステム領域、実際のFlash容量と照合してください。

## NOR Flashドライバーを移植する { #7-port-a-nor-flash-part }

基板によって使用するNOR Flashデバイスは異なります。対象デバイスのハードウェア仕様と操作コマンドの両方を確認してください。

### ハードウェア要件 { #hardware-requirements }

次の項目を確認します。

- 電源電圧：3.3 Vまたは1.8 V。
- 1／2／4ラインSPIへの対応状況。
- 各ラインモードでの最大周波数。
- ハードウェア設計に必要なその他の項目。参照元によると、この段階のソフトウェア移植時の照合では、動作温度と消去／書き込み速度は必須項目ではありません。

### 操作コマンド { #operation-commands }

読み出し、書き込み、消去コマンドはベンダーや部品によって異なります。部品のデータシートと`bf0_hal_qspi.h`内のコマンドIDを比較し、既存のテーブルと合わない場合は`flash_table.c`に新しいコマンドテーブルを追加してください。

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

SDKには`flash_cmd_table_list`が用意されています。コマンドが完全に一致する場合は既存テーブルを使用でき、一致しない場合は新しいテーブルを追加します。テーブルの設定項目は次のとおりです。

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

`cmd`はコマンドIDです（参照元の例では、書き込み有効化が`0x06`、ステータス読み出しが`0x05`です）。`func_mode`は読み出しまたは書き込みを選択します。`data_mode`はデータなし、1／2／4ラインのデータを選びます。`dummy_cycle`はコマンドとアドレス／データ間のクロック数です。`ab_size`と`ab_mode`は代替バイト（alternate bytes）のサイズとラインモードを、`addr_size`と`addr_mode`はアドレス長とラインモードを表します。`cmd_mode`はコマンド自体を1／2／4ラインのどれで送るかを示します。

## NAND Flashドライバーを移植する { #8-port-a-nand-flash-part }

NANDの移植手順はNORと同様ですが、コマンドセットとタイミングは部品ごとに異なります。必要なシーケンスは部品のデータシートから判断してください。ID読み出しのタイミングが異なる部品もあります。デフォルトのタイミングで正しいIDを読めない場合は、ID読み出し処理を変更するか、正しいIDを明示的に設定して新しいコマンドテーブルが選択されるようにします。

## PSRAMの対応状況と設定 { #9-port-psram }

参照元のガイドでは、4／8／16ラインモードのAPM PSRAMを扱っており、対応容量は4 MB～32 MBです。

- SF32LB55xは4ラインPSRAMのみ対応します。
- SF32LB58xは4／8／16ラインPSRAMに対応します。
- SF32LB56xは4／8ラインPSRAMに対応します。

パッケージ、基板配線、PSRAM部品に合ったMPI／QSPIモードとメモリーサイズを設定してください。

## J-Link DSKとOpen Flashloaderを使用する { #10-use-j-link-dsk-and-open-flashloader }

SDKの`tools/flash/jlink_drv`ディレクトリには、SiFliの静的なJ-Link Device Support Kit（DSK）が格納されています。ルートの`JLinkDevices.xml`にはデバイス、Flashバンク、ローダーの関係が記述されています。サブディレクトリ内のELFファイルはOpen Flashloaderのアルゴリズムです。

J-Link V7.62以降をインストールし、`tools/flash/jlink_drv`ディレクトリー全体を現在のユーザーの`JLinkDevices\SiFli`ディレクトリーにコピーします。Windowsのデフォルトパスは`C:\Users\<user>\AppData\Roaming\SEGGER\JLinkDevices\SiFli`です。

以下の設定を基板プロジェクトと一致させてください。

- J-Link V7.62以降は、`JLinkDevices`以下のすべての`*.xml`ファイルが再帰的に検索されます。そのため、J-Linkインストール先にある`JLinkDevices.xml`を変更する必要はありません。
- XML内のローダーパスは`JLinkDevices.xml`からの相対パスとして解決されます。一部のELFファイルだけでなく、ディレクトリー全体をコピーしてください。
- 選択したデバイスは、`rtconfig.py`の`JLINK_DEVICE`と一致させる必要があります。例：`SF32LB56X`、`SF32LB56X_NAND`、`SF32LB52X_NOR`。
- `FlashBankInfo`には複数の`LoaderInfo`を含められます。J-Linkはデフォルトで最初のローダーを使います。別のローダーを選ぶには、`_device "<DeviceName>?BankAddr=<FlashBankBase>&Loader=<LoaderName>"_`を明示するか、J-Linkスクリプトから`_JLINK_ExecCommand("DEVICE_SelectLoader BankAddr=<FlashBankBase> Loader=<LoaderName>");_`を呼び出します。
- `SF32LB52X`、`SF32LB55X`、`SF32LB56X`、`SF32LB58X`などの接尾辞なしデバイス名には、現在は完全なバンク／ローダー情報が含まれており、NORローダーが優先されます。接尾辞付き名称は既存スクリプトとの互換性のために残されています。

## 組み込み時のチェックリスト { #integration-checklist }

製品で外付けFlashを使用する前に、以下を記録してください。

1. 正確なSF32ファミリー、パッケージ、Flashデバイス、電圧、対応ラインモード。
2. QSPI／MPIコントローラー、モード、DMA、メモリーサイズ、デバイスID、MTD／ファイルシステム設定。
3. 選択したアドレスウィンドウと、テーブル、校正データ、ブートパッチ、イメージ、アセット、変数、ログ、ファイルシステムデータ用の予約領域。
4. 消去時のアドレス境界と、書き込み／消去中にドライバーがSRAMから実行されるかどうか。
5. MTDデバイス名とファイルシステムのマウントパス（使用する場合）。
6. 基板のJ-Linkデバイス名とローダーの選択。

## 関連ページ { #related-pages }

- [パーティションテーブル](../../../firmware-topics/partition-tables.md) — Flash領域とイメージ／OTAの配置を照合します。
- [OTAとDFU](../../../firmware-topics/ota-dfu.md) — 製品データ領域を予約する前に、更新動作を確認します。
- [SDKアプリケーションノート](../sdk-application-notes.md) — アプリケーションノートの一覧です。

## 公式資料 { #official-source }

- [Flash使用ガイド — SiFli SDKプログラミングガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)
- [SF32LB52x Flash使用ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/flash_usage.html)
- [SF32LB55x Flash使用ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/flash_usage.html)
- [SF32LB58x Flash使用ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/flash_usage.html)
