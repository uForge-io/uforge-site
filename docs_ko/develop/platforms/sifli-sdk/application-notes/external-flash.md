---
icon: lucide/hard-drive
title: "외부 플래시 사용"
description: "SiFli-SDK로 외부 NOR 플래시, NAND 플래시, PSRAM을 구성하고, 접근하고, 마운트하고, 포팅합니다."
tags: [Develop, SiFli-SDK, 애플리케이션 노트, 플래시]
---

# 외부 플래시 사용 { #use-external-flash }

이 문서는 SiFli의 [플래시 사용 가이드](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)를 SF32LB52x, SF32LB55x, SF32LB56x, SF32LB58x용 실용적인 통합 절차로 재구성한 것입니다. 컨트롤러 구성, 제품군별 주소 공간, RT-Thread 직접 접근, MTD 파일 시스템, 예약 영역, 새 플래시 부품 포팅, PSRAM, J-Link Open Flashloader 지원을 다룹니다.

원본 가이드는 NOR 플래시와 NAND 플래시를 모두 `FLASH`라고 부릅니다. 예제는 원본의 SDK 심볼과 디바이스 이름을 그대로 유지하므로, 구성을 제품에 복사하기 전에 대상 SDK 브랜치와 보드 회로도를 확인하십시오.

## 컨트롤러 모델과 기능 { #1-controller-model-and-capabilities }

SiFli 플래시 컨트롤러는 여러 플래시 디바이스를 동시에 연결할 수 있습니다.

<div align="center" markdown>

<em>표: 제품군별 플래시 컨트롤러 기능</em>

| 제품군 | 최대 디바이스 수 | 이 가이드가 다루는 PSRAM 라인 모드 | 예제의 컨트롤러 명칭 |
|---|---:|---|---|
| SF32LB52x | 통합 원본 자료에는 표로 정리되어 있지 않음 | 대상 제품군 가이드로 확인 | 대상 SDK의 QSPI/MPI 명칭 확인 |
| SF32LB55x | 4 | 4라인 PSRAM만 해당 | QSPI |
| SF32LB56x | 4 | 4라인 및 8라인 PSRAM | MPI/QSPI 호환 명칭 |
| SF32LB58x | 5 | 4라인, 8라인, 16라인 PSRAM | MPI/QSPI 호환 명칭 |
</div>

디바이스는 NOR 플래시 또는 NAND 플래시일 수 있습니다. SF32LB55x와 비교하면 SF32LB56x와 SF32LB58x 컨트롤러는 8라인 PSRAM도 지원하며, SF32LB58x는 추가로 16라인 PSRAM을 지원합니다. 컨트롤러는 이전 구성에서는 QSPI라고 부르고, 메모리 중심의 새 구성에서는 MPI라고 부릅니다.

일반적인 컨트롤러 할당은 다음과 같습니다.

- **SF32LB55x:** 컨트롤러 1은 보통 온칩 NOR 플래시를 담당하고, 컨트롤러 2와 3은 보드 설계에 따라 달라지며, 컨트롤러 4는 NOR 플래시에 연결되어 LCPU가 접근할 수 있습니다(HCPU도 접근할 수 있습니다).
- **SF32LB58x:** 컨트롤러 1과 2는 패키지에 따라 보통 온칩 NOR 플래시 또는 PSRAM을 담당하고, 컨트롤러 3과 4는 보드 설계에 따라 달라지며, 컨트롤러 5는 온칩 NOR 플래시로 LCPU가 접근할 수 있습니다(HCPU도 접근할 수 있습니다).
- **SF32LB56x:** 컨트롤러 1과 2는 패키지에 따라 보통 온칩 NOR 플래시 또는 PSRAM을 담당하고, 컨트롤러 3은 보드 설계에 따라 달라지며, 컨트롤러 5는 온칩 NOR 플래시로 LCPU가 접근할 수 있습니다(HCPU도 접근할 수 있습니다). 컨트롤러 4는 없습니다.

드라이버는 두 계층으로 나뉩니다. HAL 계층은 하드웨어 레지스터 접근과 간단한 로직을 제공합니다. DRV 계층은 플래시 읽기/쓰기/지우기 동작, 초기화와 제어, 디바이스와 파일 시스템이 사용하는 인터페이스를 제공합니다.

컨트롤러는 1라인 및 4라인 플래시 동작, DMA 가속, 페이지 프로그래밍, 페이지 읽기, 섹터/블록 지우기를 지원합니다. NOR 플래시는 AHB 메모리 인터페이스로 직접 읽을 수도 있습니다. 기본 지우기 단위는 플래시 부품에 따라 다릅니다.

## QSPI 또는 MPI 구성 { #2-configure-qspi-or-mpi }

플래시 속성과 사용 방식은 `menuconfig`로 구성하며, 그 결과로 `rtconfig.h`가 생성됩니다. 옵션에는 컨트롤러 활성화 여부, DMA 사용, MTD 등록, 파일 시스템 설정, 메모리 크기, 디바이스 ID 처리(자동 감지 또는 수동 지정)가 포함됩니다.

### SF32LB55x QSPI 예시 { #sf32lb55x-qspi-example }

원본 가이드는 `menuconfig`에서 **RTOS → On-chip Peripheral Driver → Enable QSPI → Enable QSPI Driver → QSPI Controller 1 Enable**로 들어간 다음, QSPI1 모드, 파일 시스템 사용 여부, 메모리 크기, 디바이스 ID를 자동 감지할지 수동으로 지정할지를 선택합니다.

대응하는 `rtconfig.h` 정의는 다음과 같습니다.

```c
#define BSP_USING_QSPI 1            /*使能QSPI 模块*/
#define BSP_USING_SPI_FLASH 1       /*使能QSPI 控制FLASH功能（为了兼容以前版本）*/
#define BSP_ENABLE_QSPI1 1          /*使能QSPI控制器1*/
#define BSP_QSPI1_USING_DMA 1       /*QSPI1 使用FIFO DMA */
#define BSP_QSPI1_MODE 0            /*QSPI1 连接控制Nor FLASH*/
#define BSP_QSPI1_MEM_SIZE 4        /*配置FLASH1的总大小为4MB*/
#define BSP_QSPI1_CHIP_ID 0         /*FLASH1 DEV ID 由系统获取，不需要手动输入（这个配置是为了当有些FLASH获取ID的命令时序与默认设置不同时，手动添加ID以便查找正确的命令表）*/
```

두 번째 NOR 플래시와 세 번째 NAND 플래시에 대한 원본 예시는 다음과 같습니다.

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

### SF32LB58x MPI 예시 { #sf32lb58x-mpi-example }

SF32LB58x EVB에서 원본 가이드는 **RTOS → On-chip Peripheral Driver → Enable MPI → Enable QSPI Driver → MPI Controller 1 Enable**로 들어간 다음, MPI 모드, 메모리 크기, 그 밖의 디바이스 옵션을 선택합니다. 모드 값은 `0 NOR`, `1 NAND`, `2 PSRAM`, `3 OPSRAM`, `4 HPSRAM`, `5 LEGACY_PSRAM`입니다.

공통 MPI 활성화 및 컨트롤러별 예시는 다음과 같습니다.

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

SF32LB56x는 MPI4가 없다는 점을 제외하면 SF32LB58x와 사실상 같은 MPI 구성을 사용합니다.

!!! warning "MPI 구성 예시 확인"
    SiFli의 원본 자료는 MPI1에 대해 내용이 서로 일치하지 않습니다. 본문에서는 MPI1이 기본적으로 NOR 플래시이며 모드를 바꿀 수 없다고 설명하지만, 뒤이은 구성 스니펫에서는 MPI1을 모드 4(16라인 PSRAM)로 설정합니다. 또한 이 스니펫은 `BSP_QSPI1_MEM_SIZE`를 `32`로 설정하면서 주석에는 16 MB라고 적혀 있습니다. MPI4의 경우 값은 `128`이고 주석은 128 MB이지만, EVB 용량 표에는 64 MB로 나와 있습니다. 이 문서는 매크로 인코딩이나 실제 디바이스 용량을 추정하지 않고 원본의 구성 값을 그대로 보존합니다. 대상 SDK 릴리스의 Kconfig/생성된 구성, 보드 회로도, 메모리 데이터시트로 확인하십시오.

## 플래시 주소 공간 { #3-flash-address-spaces }

아래 범위는 컨트롤러 윈도우의 최대치입니다. 실제로 사용할 수 있는 크기는 윈도우 최대치가 아니라 `menuconfig`에서 선택한 플래시 부품에 따라 결정됩니다.

### SF32LB55x { #sf32lb55x }

<div align="center" markdown>

<em>표: SF32LB55x 플래시 컨트롤러 주소 윈도우</em>

| 컨트롤러 | 시작 | 끝 | 최대 윈도우 | EVB 설명 |
|:-----------|:------|:----|:---------------|:----------------|
| FLASH1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 바이트 | EVB 용량 4 MB |
| FLASH2 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 바이트 | EVB 용량 32 MB |
| FLASH3 | `0x68000000` | `0x6FFFFFFF` | 128 × 1024 × 1024 바이트 | EVB에서 활성화되지 않음 |
| FLASH4 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 바이트 | EVB에서 활성화되지 않음 |
</div>

컨트롤러 베이스 정의는 `mem_map.h`에 있습니다.

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x64000000)
#define QSPI3_MEM_BASE   (0x68000000)
#define QSPI4_MEM_BASE   (0x12000000)
```

### SF32LB58x { #sf32lb58x }

**C-BUS 주소 공간**

<div align="center" markdown>

<em>표: SF32LB58x C-BUS 주소 공간</em>

| 컨트롤러 | 시작 | 끝 | 최대 윈도우 | EVB 설명 |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 바이트 | EVB 용량 16 MB |
| MPI2 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 바이트 | EVB 용량 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 바이트 | EVB 용량 32 MB |
| MPI4 | `0x18000000` | `0x1BFFFFFF` | 64 × 1024 × 1024 바이트 | EVB 용량 64 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 바이트 | EVB 용량 4 MB |
</div>

**S-BUS 주소 공간**

<div align="center" markdown>

<em>표: SF32LB58x S-BUS 주소 공간</em>

| 컨트롤러 | 시작 | 끝 | 최대 윈도우 | EVB 설명 |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x60000000` | `0x61FFFFFF` | 32 × 1024 × 1024 바이트 | EVB 용량 16 MB |
| MPI2 | `0x62000000` | `0x63FFFFFF` | 32 × 1024 × 1024 바이트 | EVB 용량 16 MB |
| MPI3 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 바이트 | EVB 용량 32 MB |
| MPI4 | `0x68000000` | `0x9FFFFFFF` | 896 × 1024 × 1024 바이트 | EVB 용량 64 MB |
</div>

64 MB보다 큰 NAND 플래시는 MPI4에 마운트하고 `0x68000000`부터 시작하는 주소를 사용할 것을 가이드가 권장합니다.

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x12000000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI4_MEM_BASE   (0x18000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

### SF32LB56x { #sf32lb56x }

**C-BUS 주소 공간**

<div align="center" markdown>

<em>표: SF32LB56x C-BUS 주소 공간</em>

| 컨트롤러 | 시작 | 끝 | 최대 윈도우 | EVB 설명 |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x107FFFFF` | 8 × 1024 × 1024 바이트 | EVB 용량 4 MB |
| MPI2 | `0x10800000` | `0x13FFFFFF` | 56 × 1024 × 1024 바이트 | EVB 용량 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 바이트 | EVB 용량 128 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 바이트 | EVB 용량 1 MB |
</div>

**S-BUS 주소 공간**

<div align="center" markdown>

<em>표: SF32LB56x S-BUS 주소 공간</em>

| 컨트롤러 | 시작 | 끝 | 최대 윈도우 |
|:-----------|:------|:----|:---------------|
| MPI1 | `0x60000000` | `0x607FFFFF` | 8 × 1024 × 1024 바이트 |
| MPI2 | `0x60800000` | `0x63FFFFFF` | 56 × 1024 × 1024 바이트 |
| MPI3 | `0x64000000` | `0x9FFFFFFF` | 960 × 1024 × 1024 바이트 |
</div>

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x10800000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

!!! note "주소 윈도우와 디바이스 용량"
    원본은 SF32LB56x MPI3의 C-BUS 범위를 `0x14000000`–`0x17FFFFFF`로 표기하면서 크기는 128 MB로 적어 두었습니다. 이 범위의 양 끝점(끝점 포함)은 64 MB에 해당하며, 위에 표시한 윈도우 크기가 이 값입니다. 원본의 128 MB EVB 디바이스 용량은 별도로 유지되며, 디바이스 용량이 이 C-BUS 윈도우의 크기를 결정하지는 않습니다. 주소 범위를 사용하기 전에 대상 SDK의 메모리 맵을 확인하십시오.

## RT-Thread를 통한 플래시 접근 { #4-access-flash-through-rt-thread }

RT-Thread 플래시 인터페이스는 절대 주소로 컨트롤러를 선택합니다. 컨트롤러와 디바이스 설정이 `rtconfig.h`에 생성된 후에 `rt_hw_flash_init`을 호출하십시오.

```c
int rt_hw_flash_init(void);
int rt_flash_read(rt_uint32_t addr, rt_uint8_t *buf, size_t size);
int rt_flash_write(rt_uint32_t addr, const rt_uint8_t *buf, size_t size);
rt_err_t rt_flash_erase(rt_uint32_t addr, size_t size);
```

`rt_flash_read`와 `rt_flash_write`는 성공 시 전송된 바이트 수를, 실패 시 `0`을 반환하며, `rt_flash_erase`는 성공 시 `RT_EOK`를 반환합니다. 이 선언들은 가독성을 위해 정리한 것이므로, 실제 헤더와 반환 동작은 대상 SDK 브랜치에서 확인하십시오.

NOR와 NAND 읽기에는 모두 `rt_flash_read`를 사용합니다. NOR는 메모리 윈도우로도 읽을 수 있지만, NAND는 반드시 API를 사용해야 하며 호출자가 버퍼를 관리해야 합니다. 두 유형 모두 쓰기에는 `rt_flash_write`를 사용합니다. 지우기 동작의 경우 NOR는 보통 섹터 정렬된 주소와 길이(일반적으로 4 KB)가 필요하고, NAND는 보통 블록 정렬된 주소와 길이(일반적으로 128 KB)가 필요합니다. 정렬되지 않은 데이터는 직접 보존하고 복원해야 합니다.

플래시가 XIP를 지원하지 않으면, 코드는 자신이 실행되고 있는 같은 플래시를 지우거나 프로그래밍할 수 없습니다. 플래시 드라이버 코드는 SRAM에 배치하십시오. 원본 가이드의 Keil 링커 조각은 `0x200E1000`에 64 KB를 예약합니다.

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

원본의 왕복 예제는 초기화되지 않은 데이터 버퍼와 잘못된 정리 코드가 있으므로 게시된 그대로 실행해서는 안 됩니다. 아래에 수정한 NOR 플래시 예제는 고정된 제품 주소를 가정하지 않고 테스트 주소를 인자로 받습니다.

!!! warning "플래시 지우기는 파괴적입니다"
    전용으로 확보한, 지워도 되는 NOR 테스트 영역에서만 실행하고, `TEST_SIZE`는 부품과 드라이버가 요구하는 지우기 단위로 설정하십시오. 최소 하나의 완전한 지우기 단위를 예약하고 주소/길이 정렬을 만족시키십시오. 부트 구성, 캘리브레이션 데이터, 펌웨어/OTA 이미지, 파일 시스템, 사용자 데이터를 대상으로 삼지 마십시오. 이 예제는 NAND용이 아닙니다. NAND는 부품 및 드라이버에 따른 배드 블록, ECC, OOB, 페이지, 블록 처리도 필요합니다.

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

## RT-Thread MTD를 통한 플래시 사용 { #5-use-flash-through-rt-thread-mtd }

RT-Thread는 MTD-NOR 및 MTD-NAND 디바이스 드라이버를 제공합니다. 구성에서 MTD와 파일 시스템 옵션을 활성화하면 시작 시 디바이스가 등록됩니다. `rt_device_find("flash1")`로 컨트롤러를 조회하며, 컨트롤러 이름은 `flash1`, `flash2`, `flash3`입니다(활성화된 각 컨트롤러에 대응하는 디바이스 이름이 있습니다). 결과가 null이 아니면 등록에 성공한 것입니다.

MTD는 파일 시스템과 USB 스토리지에서 사용합니다. 애플리케이션 코드는 보통 디바이스를 찾아서 바인딩하기만 하며, 읽기/쓰기 동작은 MTD NOR 계층이 캡슐화합니다. 디바이스를 직접 등록하는 경우 아래에 나온 동작 테이블을 구현하십시오.

### MTD-NOR 디바이스 구조체 { #mtd-nor-types }

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

### MTD-NAND 디바이스 구조체 { #mtd-nand-types }

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

원본의 NOR 파일 시스템 예제는 `flash1`을 등록하고, 찾은 다음, Elm으로 포맷하고 마운트합니다. 이 예제는 SF32LB56x 원본 가이드의 예시이므로, 대상 제품군에 맞는 컨트롤러 이름과 파일 시스템 영역을 확인하십시오.

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

## 현재 플래시 레이아웃 예약 및 검토 { #6-reserve-and-review-the-current-flash-layout }

[SF32LB55x 메모리 사용 가이드](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/memory_usage.html)는 다음과 같은 기본 QSPI1 레이아웃을 제시합니다. `0x10000000`부터 `0x1000FFFF`까지의 64 KB 영역에는 플래시 구성 테이블, 캘리브레이션 테이블, 예약 공간이 들어 있고, 그 다음 64 KB인 `0x10010000`부터 `0x1001FFFF`까지는 부트 ROM 패치용으로 예약되어 있으며, 사용자 코드는 `0x10020000`에서 시작합니다. `FLASH2`가 NOR 플래시를 사용하면 이미지 리소스는 `0x64000000`에서 시작합니다. FlashDB(또는 EasyFlash)도 변수와 로그를 위해 `flash1`과 `flash2`의 일부를 사용하므로, 시스템 요구 사항에 맞게 해당 영역을 회수하고 다시 파티셔닝하십시오.

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

이 주소들은 범용 파티션 맵이 아니라 원본 가이드의 기본 레이아웃으로 취급하십시오. 제품 데이터를 할당하기 전에 대상 링커 스크립트, 부트로더, OTA 계획, 파일 시스템 범위, 실제 플래시 용량과 대조하여 조정하십시오.

## NOR 플래시 부품 포팅 { #7-port-a-nor-flash-part }

보드마다 다른 NOR 플래시 부품을 사용할 수 있습니다. 부품을 하드웨어 사양과 동작 명령 양쪽에 대해 대조하십시오.

### 하드웨어 요구 사항 { #hardware-requirements }

다음을 확인합니다.

- 공급 전압: 3.3 V 또는 1.8 V
- 부품이 1라인, 2라인, 4라인 SPI를 지원하는지 여부
- 각 라인 모드의 최대 주파수
- 그 밖에 하드웨어 설계에 필요한 세부 사항. 원본은 동작 온도와 지우기/프로그래밍 속도가 이 단계의 소프트웨어 포팅 대조에는 필요하지 않다고 설명합니다.

### 동작 명령 { #operation-commands }

읽기, 쓰기, 지우기 명령은 공급업체와 부품마다 다릅니다. 부품의 데이터시트를 `bf0_hal_qspi.h`의 명령 ID와 비교하고, 기존 테이블이 맞지 않으면 `flash_table.c`에 명령 테이블을 추가하십시오.

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

SDK에는 이미 `flash_cmd_table_list`가 포함되어 있습니다. 부품의 명령이 완전히 일치하면 기존 테이블을 사용할 수 있으며, 그렇지 않으면 새 테이블을 추가합니다. 테이블 구성은 다음과 같습니다.

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

여기서 `cmd`는 명령 ID입니다(원본 예제에서 쓰기 활성화는 `0x06`, 상태 읽기는 `0x05`). `func_mode`는 읽기 또는 쓰기를 선택하고, `data_mode`는 데이터 없음, 1라인, 2라인, 4라인 데이터 중 하나를 선택하며, `dummy_cycle`은 명령과 주소/데이터 사이의 클럭 수를 나타내고, `ab_size`와 `ab_mode`는 대체 바이트를 나타내며, `addr_size`와 `addr_mode`는 주소 길이와 라인 모드를 나타내고, `cmd_mode`는 명령 자체를 1라인, 2라인, 4라인 중 어느 것으로 전송하는지를 나타냅니다.

## NAND 플래시 부품 포팅 { #8-port-a-nand-flash-part }

NAND 포팅은 NOR 과정을 따르지만, 명령 집합과 타이밍은 부품마다 다릅니다. 필요한 시퀀스는 부품의 데이터시트에서 도출하십시오. 일부 부품은 ID 읽기 타이밍이 다릅니다. 기본 타이밍으로 올바른 ID를 읽을 수 없으면 ID 읽기 구현을 변경하거나 올바른 ID를 명시적으로 구성하여 새 명령 테이블이 선택되도록 하십시오.

## PSRAM 포팅 { #9-port-psram }

원본 가이드는 4 MB에서 32 MB까지의 지원 용량으로 4라인, 8라인, 16라인 모드의 APM PSRAM 지원을 문서화합니다.

- SF32LB55x는 4라인 PSRAM만 지원합니다.
- SF32LB58x는 4라인, 8라인, 16라인 PSRAM을 지원합니다.
- SF32LB56x는 4라인 및 8라인 PSRAM을 지원합니다.

패키지, 보드 배선, PSRAM 부품에 맞는 MPI/QSPI 모드 및 메모리 크기 설정을 사용하십시오.

## J-Link DSK 및 Open Flashloader 사용 { #10-use-j-link-dsk-and-open-flashloader }

SDK의 `tools/flash/jlink_drv` 디렉터리는 SiFli의 정적 J-Link Device Support Kit(DSK)입니다. 루트의 `JLinkDevices.xml`은 디바이스, 플래시 뱅크, 로더의 관계를 기술하며, 하위 디렉터리의 ELF 파일이 Open Flashloader 알고리즘입니다.

J-Link V7.62 이상을 설치한 다음, `tools/flash/jlink_drv` 디렉터리 전체를 현재 사용자의 `JLinkDevices\SiFli` 디렉터리로 복사합니다. Windows에서 기본 경로는 `C:\Users\<user>\AppData\Roaming\SEGGER\JLinkDevices\SiFli`입니다.

다음 규칙을 보드 프로젝트와 일치시키십시오.

- J-Link V7.62부터 `JLinkDevices` 아래의 모든 `*.xml` 파일을 재귀적으로 검색하므로, J-Link 설치본의 `JLinkDevices.xml`을 수정할 필요가 없습니다.
- XML의 로더 경로는 `JLinkDevices.xml`을 기준으로 해석됩니다. 일부 ELF 파일만이 아니라 디렉터리 전체를 복사하십시오.
- 선택한 디바이스는 `rtconfig.py`의 `JLINK_DEVICE`와 일치해야 합니다(예: `SF32LB56X`, `SF32LB56X_NAND`, `SF32LB52X_NOR`).
- 하나의 `FlashBankInfo`에 여러 `LoaderInfo` 항목이 있을 수 있으며, J-Link는 기본적으로 첫 번째 로더를 사용합니다. 다른 로더를 선택하려면 `_device "<DeviceName>?BankAddr=<FlashBankBase>&Loader=<LoaderName>"_`로 명시적으로 지정하거나, J-Link 스크립트에서 `_JLINK_ExecCommand("DEVICE_SelectLoader BankAddr=<FlashBankBase> Loader=<LoaderName>");_`를 호출하십시오.
- `SF32LB52X`, `SF32LB55X`, `SF32LB56X`, `SF32LB58X`처럼 접미사가 없는 디바이스 이름은 이제 완전한 뱅크 및 로더 정보를 포함하며 NOR 로더를 우선합니다. 접미사가 붙은 이름은 기존 스크립트와의 호환성을 위해 남아 있습니다.

## 통합 체크리스트 { #integration-checklist }

제품에서 외부 플래시를 사용하기 전에 다음을 기록하십시오.

1. 정확한 SF32 제품군, 패키지, 플래시 부품, 전압, 지원되는 라인 모드
2. QSPI/MPI 컨트롤러, 모드, DMA, 메모리 크기, 디바이스 ID, MTD/파일 시스템 설정
3. 선택한 주소 윈도우와, 테이블, 캘리브레이션, 부트 패치, 이미지, 에셋, 변수, 로그, 파일 시스템 데이터를 위한 예약 영역
4. 지우기 정렬, 그리고 프로그래밍/지우기 중에 드라이버가 SRAM에서 실행되는지 여부
5. 사용하는 경우 MTD 디바이스 이름과 파일 시스템 마운트 경로
6. 보드의 J-Link 디바이스 이름과 로더 선택

## 관련 페이지 { #related-pages }

- [파티션 테이블](../../../firmware-topics/partition-tables.md) — 플래시 영역을 이미지 및 OTA 레이아웃과 조정합니다.
- [OTA와 DFU](../../../firmware-topics/ota-dfu.md) — 제품 데이터 영역을 예약하기 전에 업데이트 동작을 검토합니다.
- [SDK 애플리케이션 노트](../sdk-application-notes.md) — 전체 애플리케이션 노트 색인입니다.

## 공식 출처 { #official-source }

- [Flash使用指南 — SiFli SDK 编程指南](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)
- [SF32LB52x Flash usage](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/flash_usage.html)
- [SF32LB55x Flash usage](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/flash_usage.html)
- [SF32LB58x Flash usage](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/flash_usage.html)
