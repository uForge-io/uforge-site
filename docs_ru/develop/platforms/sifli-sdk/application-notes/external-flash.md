---
icon: lucide/hard-drive
title: "Работа с внешней Flash-памятью"
description: "Настройка контроллеров, доступ к внешним NOR Flash, NAND Flash и PSRAM, монтирование файловых систем и адаптация драйверов с помощью SiFli-SDK."
tags: [Разработка, SiFli-SDK, Практические руководства, Flash]
---

# Работа с внешней Flash-памятью { #use-external-flash }

В этой статье руководство SiFli по [работе с Flash-памятью](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html) представлено как практический план интеграции для SF32LB52x, SF32LB55x, SF32LB56x и SF32LB58x. Рассматриваются настройка контроллеров, адресные пространства семейств, прямой доступ через RT-Thread, файловые системы MTD, зарезервированные области, добавление поддержки новых микросхем Flash и PSRAM, а также Open Flashloader для J-Link.

В исходном руководстве обозначение `FLASH` используется и для NOR Flash, и для NAND Flash. В примерах сохранены символы SDK и имена устройств; прежде чем использовать конфигурацию в изделии, проверьте ветку SDK для целевой системы и схему платы.

## Архитектура и возможности контроллеров { #1-controller-model-and-capabilities }

Контроллер Flash SiFli может одновременно работать с несколькими устройствами Flash:

<div align="center" markdown>

<em>Таблица: Возможности контроллеров Flash по семействам</em>

| Семейство | Максимум устройств | Рассматриваемые режимы линий PSRAM | Имена контроллеров в примерах |
|---|---:|---|---|
| SF32LB52x | В этом источнике не указано | Сверьтесь с руководством для целевого семейства | Проверьте обозначения QSPI/MPI в целевой версии SDK |
| SF32LB55x | 4 | Только 4-линейная PSRAM | QSPI |
| SF32LB56x | 4 | 4- и 8-линейная PSRAM | Совместимые обозначения MPI/QSPI |
| SF32LB58x | 5 | 4-, 8- и 16-линейная PSRAM | Совместимые обозначения MPI/QSPI |
</div>

Подключаемые устройства могут быть NOR Flash или NAND Flash. По сравнению с SF32LB55x контроллеры SF32LB56x и SF32LB58x также поддерживают 8-линейную PSRAM; SF32LB58x дополнительно поддерживает 16-линейный режим. В более ранней архитектуре контроллер называется QSPI, а в более новой, ориентированной на работу с памятью, — MPI.

Типичное распределение контроллеров:

- **SF32LB55x:** контроллер 1 обычно обслуживает встроенную NOR Flash; назначение контроллеров 2 и 3 зависит от платы; к контроллеру 4 подключается NOR Flash, доступная LCPU, а также HCPU.
- **SF32LB58x:** контроллеры 1 и 2 обычно обслуживают встроенную NOR Flash или PSRAM — в зависимости от корпуса; назначение контроллеров 3 и 4 зависит от платы; контроллер 5 обслуживает встроенную NOR Flash, доступную LCPU и HCPU.
- **SF32LB56x:** контроллеры 1 и 2 обычно обслуживают встроенную NOR Flash или PSRAM — в зависимости от корпуса; назначение контроллера 3 зависит от платы; контроллер 5 обслуживает встроенную NOR Flash, доступную LCPU и HCPU. Контроллера 4 нет.

Драйвер состоит из двух уровней. HAL обеспечивает доступ к аппаратным регистрам и базовую логику. DRV предоставляет операции чтения, записи и стирания Flash, инициализацию и управление, а также интерфейсы для устройств и файловых систем.

Контроллер поддерживает операции Flash в одно- и четырехлинейном режимах, ускорение с помощью DMA, запись и чтение страниц, а также стирание секторов и блоков. NOR Flash можно также читать напрямую через интерфейс памяти AHB. Минимальная единица стирания зависит от микросхемы Flash.

## Настройка QSPI или MPI { #2-configure-qspi-or-mpi }

Параметры и режимы использования Flash задаются в `menuconfig`, который формирует `rtconfig.h`. Среди настроек — включение контроллера, использование DMA, регистрация MTD, параметры файловой системы, объем памяти и обработка идентификатора устройства (автоопределение или ручное задание).

### Пример QSPI для SF32LB55x { #sf32lb55x-qspi-example }

В примере исходного руководства откройте в `menuconfig` раздел **RTOS → On-chip Peripheral Driver → Enable QSPI → Enable QSPI Driver → QSPI Controller 1 Enable**, затем выберите режим QSPI1, использование файловой системы, объем памяти и способ задания ID устройства — автоматическое определение или ручной ввод.

Соответствующие определения в `rtconfig.h`:

```c
#define BSP_USING_QSPI 1            /*使能QSPI 模块*/
#define BSP_USING_SPI_FLASH 1       /*使能QSPI 控制FLASH功能（为了兼容以前版本）*/
#define BSP_ENABLE_QSPI1 1          /*使能QSPI控制器1*/
#define BSP_QSPI1_USING_DMA 1       /*QSPI1 使用FIFO DMA */
#define BSP_QSPI1_MODE 0            /*QSPI1 连接控制Nor FLASH*/
#define BSP_QSPI1_MEM_SIZE 4        /*配置FLASH1的总大小为4MB*/
#define BSP_QSPI1_CHIP_ID 0         /*FLASH1 DEV ID 由系统获取，不需要手动输入（这个配置是为了当有些FLASH获取ID的命令时序与默认设置不同时，手动添加ID以便查找正确的命令表）*/
```

Примеры настройки второй NOR Flash и третьей NAND Flash:

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

### Пример MPI для SF32LB58x { #sf32lb58x-mpi-example }

На отладочной плате SF32LB58x в исходном руководстве выбирается путь **RTOS → On-chip Peripheral Driver → Enable MPI → Enable QSPI Driver → MPI Controller 1 Enable**, после чего задаются режим MPI, объем памяти и остальные параметры устройства. Значения режимов: `0 NOR`, `1 NAND`, `2 PSRAM`, `3 OPSRAM`, `4 HPSRAM` и `5 LEGACY_PSRAM`.

Общее включение MPI и примеры настройки отдельных контроллеров:

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

Для SF32LB56x используется практически та же конфигурация MPI, что и для SF32LB58x, но MPI4 отсутствует.

!!! warning "Проверьте пример конфигурации MPI"
    В исходных материалах SiFli есть противоречие по MPI1: в тексте сказано, что MPI1 по умолчанию подключен к NOR Flash и его режим нельзя изменить, но в следующем фрагменте MPI1 настроен на режим 4 (16-линейная PSRAM). Кроме того, `BSP_QSPI1_MEM_SIZE` задан как `32`, хотя в комментарии указано 16 MB; для MPI4 значение равно `128` и комментарий указывает 128 MB, тогда как таблица емкости EVB сообщает 64 MB. В статье сохранены исходные значения конфигурации; смысл кодировки макросов и фактическая емкость не предполагаются. Сверьте данные с Kconfig/сгенерированной конфигурацией целевой версии SDK, схемой платы и спецификацией памяти.

## Адресные пространства Flash { #3-flash-address-spaces }

Ниже приведены максимальные адресные окна контроллеров. Фактически доступный объем определяется выбранной в `menuconfig` микросхемой Flash, а не только размером окна.

### SF32LB55x { #sf32lb55x }

<div align="center" markdown>

<em>Таблица: Адресные окна контроллеров Flash в SF32LB55x</em>

| Контроллер | Начало | Конец | Максимальное окно | Конфигурация EVB |
|:-----------|:------|:----|:---------------|:----------------|
| FLASH1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 байт | Объем на EVB: 4 MB |
| FLASH2 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 байт | Объем на EVB: 32 MB |
| FLASH3 | `0x68000000` | `0x6FFFFFFF` | 128 × 1024 × 1024 байт | На EVB не используется |
| FLASH4 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 байт | На EVB не используется |
</div>

Определения базовых адресов контроллеров находятся в `mem_map.h`:

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x64000000)
#define QSPI3_MEM_BASE   (0x68000000)
#define QSPI4_MEM_BASE   (0x12000000)
```

### SF32LB58x { #sf32lb58x }

**Адресное пространство C-BUS**

<div align="center" markdown>

<em>Таблица: Адресное пространство C-BUS в SF32LB58x</em>

| Контроллер | Начало | Конец | Максимальное окно | Конфигурация EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 байт | Объем на EVB: 16 MB |
| MPI2 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 байт | Объем на EVB: 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 байт | Объем на EVB: 32 MB |
| MPI4 | `0x18000000` | `0x1BFFFFFF` | 64 × 1024 × 1024 байт | Объем на EVB: 64 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 байт | Объем на EVB: 4 MB |
</div>

**Адресное пространство S-BUS**

<div align="center" markdown>

<em>Таблица: Адресное пространство S-BUS в SF32LB58x</em>

| Контроллер | Начало | Конец | Максимальное окно | Конфигурация EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x60000000` | `0x61FFFFFF` | 32 × 1024 × 1024 байт | Объем на EVB: 16 MB |
| MPI2 | `0x62000000` | `0x63FFFFFF` | 32 × 1024 × 1024 байт | Объем на EVB: 16 MB |
| MPI3 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 байт | Объем на EVB: 32 MB |
| MPI4 | `0x68000000` | `0x9FFFFFFF` | 896 × 1024 × 1024 байт | Объем на EVB: 64 MB |
</div>

Для NAND Flash объемом более 64 MB руководство рекомендует использовать MPI4 и адреса начиная с `0x68000000`.

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x12000000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI4_MEM_BASE   (0x18000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

### SF32LB56x { #sf32lb56x }

**Адресное пространство C-BUS**

<div align="center" markdown>

<em>Таблица: Адресное пространство C-BUS в SF32LB56x</em>

| Контроллер | Начало | Конец | Максимальное окно | Конфигурация EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x107FFFFF` | 8 × 1024 × 1024 байт | Объем на EVB: 4 MB |
| MPI2 | `0x10800000` | `0x13FFFFFF` | 56 × 1024 × 1024 байт | Объем на EVB: 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 байт | Объем на EVB: 128 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 байт | Объем на EVB: 1 MB |
</div>

**Адресное пространство S-BUS**

<div align="center" markdown>

<em>Таблица: Адресное пространство S-BUS в SF32LB56x</em>

| Контроллер | Начало | Конец | Максимальное окно |
|:-----------|:------|:----|:---------------|
| MPI1 | `0x60000000` | `0x607FFFFF` | 8 × 1024 × 1024 байт |
| MPI2 | `0x60800000` | `0x63FFFFFF` | 56 × 1024 × 1024 байт |
| MPI3 | `0x64000000` | `0x9FFFFFFF` | 960 × 1024 × 1024 байт |
</div>

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x10800000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

!!! note "Адресное окно и ёмкость микросхемы"
    В источнике для MPI3 C-BUS семейства SF32LB56x указан диапазон `0x14000000`–`0x17FFFFFF`, но его размер обозначен как 128 MB. С учётом обеих границ этот диапазон занимает 64 MB; именно это значение приведено в таблице выше. Указанная в источнике ёмкость микросхемы на EVB, 128 MB, сохранена отдельно: она не определяет размер этого окна C-BUS. Перед использованием диапазона проверьте карту памяти целевой версии SDK.

## Доступ к Flash через RT-Thread { #4-access-flash-through-rt-thread }

Интерфейс Flash в RT-Thread выбирает контроллер по абсолютному адресу. Вызовите `rt_hw_flash_init` после того, как настройки контроллера и устройства будут сформированы в `rtconfig.h`:

```c
int rt_hw_flash_init(void);
int rt_flash_read(rt_uint32_t addr, rt_uint8_t *buf, size_t size);
int rt_flash_write(rt_uint32_t addr, const rt_uint8_t *buf, size_t size);
rt_err_t rt_flash_erase(rt_uint32_t addr, size_t size);
```

При успешном выполнении `rt_flash_read` и `rt_flash_write` возвращают число фактически переданных байтов, при ошибке — `0`; `rt_flash_erase` при успехе возвращает `RT_EOK`. Объявления упрощены для удобства чтения. Проверьте реальные заголовки и значения возврата в используемой ветке SDK.

Для чтения и NOR, и NAND используйте `rt_flash_read`. NOR также можно читать через ее окно памяти; для NAND необходимо использовать API, а буфером управляет вызывающий код. Для записи обоих типов используйте `rt_flash_write`. При стирании адрес и размер NOR обычно должны быть выровнены по секторам (как правило, 4 KB), а для NAND — по блокам (как правило, 128 KB). Невыровненные данные необходимо сохранить и восстановить самостоятельно.

Если Flash не поддерживает XIP, нельзя стирать или программировать ту же Flash-память, из которой выполняется код. Разместите код драйвера Flash в SRAM. Фрагмент настроек линкера Keil из исходного руководства резервирует 64 KB по адресу `0x200E1000`:

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

В исходном примере чтения и записи используется неинициализированный буфер, а освобождение памяти реализовано с ошибками, поэтому запускать его без исправлений нельзя. Пример для NOR Flash ниже принимает адрес тестовой области параметром и не предполагает фиксированный адрес в изделии.

!!! warning "Стирание Flash уничтожает данные"
    Запускайте тест только в специально выделенной стираемой области NOR. Задайте `TEST_SIZE` в соответствии с гранулярностью стирания микросхемы и драйвера, выделите как минимум полный блок стирания и соблюдайте выравнивание адреса и длины. Не используйте область загрузочной конфигурации, калибровочных данных, образов прошивки/OTA, файловой системы или пользовательских данных. Пример не предназначен для NAND: для нее также необходима обработка дефектных блоков, ECC, OOB и ограничений страниц/блоков согласно микросхеме и драйверу.

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

## Использование Flash через MTD в RT-Thread { #5-use-flash-through-rt-thread-mtd }

В RT-Thread есть драйверы устройств MTD-NOR и MTD-NAND. Если в конфигурации включены MTD и параметры файловой системы, устройства регистрируются при запуске. Найти контроллер можно вызовом `rt_device_find("flash1")`; имена контроллеров — `flash1`, `flash2` и `flash3` (каждому включенному контроллеру соответствует свое имя устройства). Ненулевой результат означает, что регистрация прошла успешно.

MTD используется файловыми системами и USB-накопителями. Обычно код приложения находит устройство и подключает его; слой MTD-NOR инкапсулирует операции чтения и записи. При самостоятельной регистрации устройства реализуйте приведенную ниже таблицу операций.

### Структура устройства MTD-NOR { #mtd-nor-types }

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

### Структура устройства MTD-NAND { #mtd-nand-types }

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

В примере исходного руководства для файловой системы NOR регистрируется `flash1`, после чего устройство находится, форматируется с помощью Elm и монтируется. Пример относится к SF32LB56x; для целевого семейства проверьте имена контроллеров и области файловой системы:

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

## Резервирование и проверка текущей разметки Flash { #6-reserve-and-review-the-current-flash-layout }

В [руководстве по использованию памяти SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/memory_usage.html) приведена стандартная разметка QSPI1: область размером 64 KB от `0x10000000` до `0x1000FFFF` содержит таблицу конфигурации Flash, таблицу калибровки и резервную область; следующие 64 KB, от `0x10010000` до `0x1001FFFF`, зарезервированы под патч boot ROM, а пользовательский код начинается с `0x10020000`. Если для `FLASH2` используется NOR Flash, ресурсы изображений начинаются с `0x64000000`. FlashDB (или EasyFlash) также использует части `flash1` и `flash2` для переменных и журналов; перераспределите эти области в соответствии с требованиями системы.

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

Считайте эти адреса стандартной разметкой из исходного руководства, а не универсальной картой разделов. Перед размещением данных изделия сверяйте их с линкерным скриптом целевой системы, загрузчиком, планом OTA, диапазонами файловой системы и фактическим объемом Flash.

## Добавление поддержки NOR Flash { #7-port-a-nor-flash-part }

На разных платах могут использоваться разные микросхемы NOR Flash. Сверьте выбранную микросхему и с аппаратными характеристиками, и с набором команд.

### Требования к аппаратной части { #hardware-requirements }

Проверьте:

- напряжение питания: 3,3 V или 1,8 V;
- поддержку SPI в режимах с одной, двумя и четырьмя линиями;
- максимальную частоту в каждом режиме; и
- прочие параметры, необходимые для аппаратного проекта. В источнике отмечено, что при адаптации драйвера на этом этапе можно не учитывать рабочую температуру и скорость стирания/записи.

### Команды операций { #operation-commands }

Команды чтения, записи и стирания зависят от производителя и конкретной микросхемы. Сверьте команды из ее технической документации с идентификаторами в `bf0_hal_qspi.h`; если существующая таблица не подходит, добавьте новую в `flash_table.c`.

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

В SDK уже есть `flash_cmd_table_list`. Используйте существующую таблицу только при полном совпадении команд микросхемы; иначе добавьте новую. Конфигурация таблицы:

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

Здесь `cmd` — ID команды (`0x06` для разрешения записи и `0x05` для чтения регистра состояния в примерах источника). `func_mode` выбирает чтение или запись; `data_mode` задает отсутствие данных либо передачу по одной, двум или четырем линиям; `dummy_cycle` — число тактов между командой и адресом/данными; `ab_size` и `ab_mode` описывают альтернативные байты; `addr_size` и `addr_mode` задают размер адреса и режим линий; `cmd_mode` указывает, по скольким линиям передается сама команда: одной, двум или четырем.

## Добавление поддержки NAND Flash { #8-port-a-nand-flash-part }

Добавление поддержки NAND в целом выполняется так же, как для NOR, но набор команд и временные параметры зависят от микросхемы. Определите необходимую последовательность команд по ее технической документации. У некоторых микросхем отличаются временные параметры чтения ID; если стандартные настройки не позволяют правильно прочитать ID, измените реализацию чтения либо задайте корректный ID явно, чтобы выбрать новую таблицу команд.

## Добавление поддержки PSRAM { #9-port-psram }

В исходном руководстве описана поддержка PSRAM APM в режимах с 4, 8 и 16 линиями и объемами от 4 MB до 32 MB:

- SF32LB55x поддерживает только 4-линейную PSRAM.
- SF32LB58x поддерживает PSRAM с 4, 8 и 16 линиями.
- SF32LB56x поддерживает PSRAM с 4 и 8 линиями.

Выбирайте режим MPI/QSPI и объем памяти с учетом корпуса, разводки платы и используемой микросхемы PSRAM.

## Использование J-Link DSK и Open Flashloader { #10-use-j-link-dsk-and-open-flashloader }

В каталоге SDK `tools/flash/jlink_drv` находится статический J-Link Device Support Kit (DSK) от SiFli. Корневой `JLinkDevices.xml` описывает связи между устройством, банками Flash и загрузчиками; файлы ELF в подкаталогах содержат алгоритмы Open Flashloader.

Установите J-Link V7.62 или новее и скопируйте весь каталог `tools/flash/jlink_drv` в `JLinkDevices\SiFli` текущего пользователя. В Windows путь по умолчанию: `C:\Users\<user>\AppData\Roaming\SEGGER\JLinkDevices\SiFli`.

Синхронизируйте следующие настройки с проектом платы:

- Начиная с J-Link V7.62, все файлы `*.xml` в `JLinkDevices` сканируются рекурсивно, поэтому изменять `JLinkDevices.xml` из каталога установки J-Link не требуется.
- Пути к загрузчикам в XML разрешаются относительно `JLinkDevices.xml`; копируйте весь каталог, а не только отдельные ELF-файлы.
- Выбранное устройство должно соответствовать `JLINK_DEVICE` в `rtconfig.py`, например `SF32LB56X`, `SF32LB56X_NAND` или `SF32LB52X_NOR`.
- `FlashBankInfo` может содержать несколько записей `LoaderInfo`. По умолчанию J-Link использует первую. Чтобы выбрать другую, укажите `_device "<DeviceName>?BankAddr=<FlashBankBase>&Loader=<LoaderName>"_` или вызовите `_JLINK_ExecCommand("DEVICE_SelectLoader BankAddr=<FlashBankBase> Loader=<LoaderName>");_` из скрипта J-Link.
- Имена устройств без суффикса, например `SF32LB52X`, `SF32LB55X`, `SF32LB56X` и `SF32LB58X`, теперь содержат полную информацию о банках и загрузчиках и по умолчанию используют NOR-загрузчик. Имена с суффиксами сохранены для совместимости с существующими скриптами.

## Контрольный список интеграции { #integration-checklist }

Перед использованием внешней Flash в изделии зафиксируйте:

1. семейство SF32, корпус, микросхему Flash, напряжение и поддерживаемые режимы линий;
2. контроллер QSPI/MPI, режим, DMA, объем памяти, ID устройства и настройки MTD/файловой системы;
3. выбранное адресное окно и зарезервированные области для таблиц, калибровки, патча загрузчика, образов, ресурсов, переменных, журналов и данных файловой системы;
4. требования к выравниванию при стирании и размещение драйвера в SRAM на время записи/стирания;
5. имя устройства MTD и путь монтирования файловой системы, если они используются; и
6. имя устройства J-Link для платы и выбранный загрузчик.

## Связанные страницы { #related-pages }

- [Таблицы разделов](../../../firmware-topics/partition-tables.md) — согласуйте области Flash с размещением образов и обновлением OTA.
- [OTA и DFU](../../../firmware-topics/ota-dfu.md) — проверьте процесс обновления перед резервированием областей под данные изделия.
- [Практические руководства по SiFli-SDK](../sdk-application-notes.md) — полный перечень руководств по применению SDK.

## Официальные источники { #official-source }

- [Руководство по использованию Flash — руководство по программированию SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)
- [Работа с Flash на SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/flash_usage.html)
- [Работа с Flash на SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/flash_usage.html)
- [Работа с Flash на SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/flash_usage.html)
