---
icon: lucide/hard-drive
title: "Uso de memoria Flash externa"
description: "Configure los controladores, acceda a memorias NOR Flash, NAND Flash y PSRAM externas, integre sus sistemas de archivos y adapte los drivers con SiFli-SDK."
tags: [Desarrollo, SiFli-SDK, Notas de aplicación, Flash]
---

# Uso de memoria Flash externa { #use-external-flash }

Este artículo convierte la [guía de uso de Flash](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html) de SiFli en una ruta práctica de integración para SF32LB52x, SF32LB55x, SF32LB56x y SF32LB58x. Incluye la configuración del controlador, espacios de direcciones propios de cada familia, acceso directo desde RT-Thread, sistemas de archivos MTD, regiones reservadas, integración de nuevas memorias Flash, PSRAM y compatibilidad con J-Link Open Flashloader.

La guía original utiliza `FLASH` tanto para Flash NOR como NAND. Los ejemplos conservan los símbolos del SDK y los nombres de dispositivo originales; antes de copiar una configuración al producto, confirme la rama del SDK y el esquemático de la placa de destino.

## Modelo y capacidades del controlador { #1-controller-model-and-capabilities }

El controlador Flash de SiFli puede conectar varios dispositivos Flash simultáneamente:

<div align="center" markdown>

<em>Tabla: capacidades del controlador Flash por familia</em>

| Familia | Máximo de dispositivos | Modos de líneas PSRAM tratados en esta guía | Nombres del controlador en los ejemplos |
|---|---:|---|---|
| SF32LB52x | No se indica en esta fuente | Consulte la guía de la familia de destino | Compruebe los nombres QSPI/MPI del SDK de destino |
| SF32LB55x | 4 | Solo PSRAM de 4 líneas | QSPI |
| SF32LB56x | 4 | PSRAM de 4 y 8 líneas | Nombres MPI/QSPI por compatibilidad |
| SF32LB58x | 5 | PSRAM de 4, 8 y 16 líneas | Nombres MPI/QSPI por compatibilidad |
</div>

Los dispositivos pueden ser Flash NOR o NAND. Frente al SF32LB55x, SF32LB56x y SF32LB58x añaden compatibilidad con PSRAM de 8 líneas; el SF32LB58x también admite PSRAM de 16 líneas. En la arquitectura anterior, el controlador se denomina QSPI; en la arquitectura más reciente, orientada a memoria, se denomina MPI.

Las asignaciones habituales de los controladores son:

- **SF32LB55x:** normalmente, el controlador 1 gestiona la Flash NOR integrada; los controladores 2 y 3 dependen del diseño de la placa; el controlador 4 se conecta a Flash NOR y permite el acceso desde LCPU y HCPU.
- **SF32LB58x:** los controladores 1 y 2 suelen gestionar Flash NOR integrada o PSRAM, según el encapsulado; los controladores 3 y 4 dependen del diseño de la placa; el controlador 5 gestiona la Flash NOR integrada y permite el acceso desde LCPU y HCPU.
- **SF32LB56x:** los controladores 1 y 2 suelen gestionar Flash NOR integrada o PSRAM, según el encapsulado; el controlador 3 depende del diseño de la placa; el controlador 5 gestiona la Flash NOR integrada y permite el acceso desde LCPU y HCPU. No existe el controlador 4.

El driver se divide en dos capas. HAL permite acceder a los registros de hardware y ofrece lógica básica. DRV proporciona operaciones de lectura, escritura y borrado de Flash, inicialización y control, además de las interfaces utilizadas por dispositivos y sistemas de archivos.

El controlador admite operaciones Flash de una y cuatro líneas, aceleración DMA, programación y lectura de páginas, y borrado de sectores o bloques. La Flash NOR también puede leerse directamente mediante la interfaz de memoria AHB. La unidad mínima de borrado depende del componente Flash.

## Configurar QSPI o MPI { #2-configure-qspi-or-mpi }

Los atributos y el uso de Flash se configuran mediante `menuconfig`, que genera `rtconfig.h`. Las opciones incluyen la activación del controlador, el uso de DMA, el registro MTD, los ajustes del sistema de archivos, el tamaño de memoria y la gestión del ID del dispositivo (detección automática o especificación manual).

### Ejemplo QSPI para SF32LB55x { #sf32lb55x-qspi-example }

En `menuconfig`, la guía original selecciona **RTOS → On-chip Peripheral Driver → Enable QSPI → Enable QSPI Driver → QSPI Controller 1 Enable** y, a continuación, configura el modo QSPI1, el uso del sistema de archivos, el tamaño de memoria y si el ID se detecta automáticamente o se especifica manualmente.

Las definiciones correspondientes en `rtconfig.h` son:

```c
#define BSP_USING_QSPI 1            /*使能QSPI 模块*/
#define BSP_USING_SPI_FLASH 1       /*使能QSPI 控制FLASH功能（为了兼容以前版本）*/
#define BSP_ENABLE_QSPI1 1          /*使能QSPI控制器1*/
#define BSP_QSPI1_USING_DMA 1       /*QSPI1 使用FIFO DMA */
#define BSP_QSPI1_MODE 0            /*QSPI1 连接控制Nor FLASH*/
#define BSP_QSPI1_MEM_SIZE 4        /*配置FLASH1的总大小为4MB*/
#define BSP_QSPI1_CHIP_ID 0         /*FLASH1 DEV ID 由系统获取，不需要手动输入（这个配置是为了当有些FLASH获取ID的命令时序与默认设置不同时，手动添加ID以便查找正确的命令表）*/
```

Para una segunda Flash NOR y una tercera Flash NAND, los ejemplos de la guía original son:

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

### Ejemplo MPI para SF32LB58x { #sf32lb58x-mpi-example }

En la EVB SF32LB58x, la guía selecciona **RTOS → On-chip Peripheral Driver → Enable MPI → Enable QSPI Driver → MPI Controller 1 Enable** y después configura el modo MPI, el tamaño de memoria y otras opciones del dispositivo. Los valores de modo son `0 NOR`, `1 NAND`, `2 PSRAM`, `3 OPSRAM`, `4 HPSRAM` y `5 LEGACY_PSRAM`.

Estos son los ejemplos de activación común de MPI y de configuración por controlador:

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

El SF32LB56x utiliza prácticamente la misma configuración MPI que el SF32LB58x, salvo que no dispone de MPI4.

!!! warning "Verifique el ejemplo de configuración MPI"
    La documentación fuente de SiFli es contradictoria respecto a MPI1: el texto indica que MPI1 usa NOR Flash por defecto y que no se puede cambiar su modo, pero el fragmento de configuración siguiente establece el modo 4 (PSRAM de 16 líneas). Además, `BSP_QSPI1_MEM_SIZE` tiene el valor `32` y el comentario indica 16 MB; en MPI4, el valor es `128` y el comentario indica 128 MB, mientras que la tabla de capacidad de la EVB indica 64 MB. Este artículo conserva los valores de configuración de la fuente sin inferir la codificación de las macros ni la capacidad real. Verifíquelo con la configuración Kconfig/generada de la versión del SDK, el esquemático de la placa y la hoja de datos de la memoria.

## Espacios de direcciones Flash { #3-flash-address-spaces }

Los rangos siguientes representan las ventanas máximas de los controladores. La capacidad realmente utilizable depende del componente Flash seleccionado en `menuconfig`, no solo del tamaño máximo de la ventana.

### SF32LB55x { #sf32lb55x }

<div align="center" markdown>

<em>Tabla: ventanas de direcciones de los controladores Flash del SF32LB55x</em>

| Controlador | Inicio | Fin | Ventana máxima | Configuración de la EVB |
|:-----------|:------|:----|:---------------|:----------------|
| FLASH1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 bytes | Capacidad de la EVB: 4 MB |
| FLASH2 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 bytes | Capacidad de la EVB: 32 MB |
| FLASH3 | `0x68000000` | `0x6FFFFFFF` | 128 × 1024 × 1024 bytes | No habilitado en la EVB |
| FLASH4 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 bytes | No habilitado en la EVB |
</div>

Las direcciones base de los controladores se definen en `mem_map.h`:

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x64000000)
#define QSPI3_MEM_BASE   (0x68000000)
#define QSPI4_MEM_BASE   (0x12000000)
```

### SF32LB58x { #sf32lb58x }

**Espacio de direcciones C-BUS**

<div align="center" markdown>

<em>Tabla: espacio de direcciones C-BUS del SF32LB58x</em>

| Controlador | Inicio | Fin | Ventana máxima | Configuración de la EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 bytes | Capacidad de la EVB: 16 MB |
| MPI2 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 bytes | Capacidad de la EVB: 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 bytes | Capacidad de la EVB: 32 MB |
| MPI4 | `0x18000000` | `0x1BFFFFFF` | 64 × 1024 × 1024 bytes | Capacidad de la EVB: 64 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 bytes | Capacidad de la EVB: 4 MB |
</div>

**Espacio de direcciones S-BUS**

<div align="center" markdown>

<em>Tabla: espacio de direcciones S-BUS del SF32LB58x</em>

| Controlador | Inicio | Fin | Ventana máxima | Configuración de la EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x60000000` | `0x61FFFFFF` | 32 × 1024 × 1024 bytes | Capacidad de la EVB: 16 MB |
| MPI2 | `0x62000000` | `0x63FFFFFF` | 32 × 1024 × 1024 bytes | Capacidad de la EVB: 16 MB |
| MPI3 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 bytes | Capacidad de la EVB: 32 MB |
| MPI4 | `0x68000000` | `0x9FFFFFFF` | 896 × 1024 × 1024 bytes | Capacidad de la EVB: 64 MB |
</div>

Para Flash NAND de más de 64 MB, la guía recomienda conectarla a MPI4 y utilizar direcciones a partir de `0x68000000`.

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x12000000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI4_MEM_BASE   (0x18000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

### SF32LB56x { #sf32lb56x }

**Espacio de direcciones C-BUS**

<div align="center" markdown>

<em>Tabla: espacio de direcciones C-BUS del SF32LB56x</em>

| Controlador | Inicio | Fin | Ventana máxima | Configuración de la EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x107FFFFF` | 8 × 1024 × 1024 bytes | Capacidad de la EVB: 4 MB |
| MPI2 | `0x10800000` | `0x13FFFFFF` | 56 × 1024 × 1024 bytes | Capacidad de la EVB: 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 bytes | Capacidad de la EVB: 128 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 bytes | Capacidad de la EVB: 1 MB |
</div>

**Espacio de direcciones S-BUS**

<div align="center" markdown>

<em>Tabla: espacio de direcciones S-BUS del SF32LB56x</em>

| Controlador | Inicio | Fin | Ventana máxima |
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

!!! note "Ventana de direcciones y capacidad del dispositivo"
    La fuente indica que el rango C-BUS de MPI3 en SF32LB56x es `0x14000000`–`0x17FFFFFF`, pero le asigna un tamaño de 128 MB. Incluyendo ambos extremos, el rango abarca 64 MB, valor utilizado en la tabla anterior. La capacidad de 128 MB del dispositivo de la EVB se conserva por separado: no determina el tamaño de esta ventana C-BUS. Compruebe el mapa de memoria del SDK de destino antes de utilizar un rango de direcciones.

## Acceder a Flash mediante RT-Thread { #4-access-flash-through-rt-thread }

La interfaz Flash de RT-Thread selecciona el controlador a partir de la dirección absoluta. Llame a `rt_hw_flash_init` después de que la configuración del controlador y del dispositivo se haya generado en `rtconfig.h`:

```c
int rt_hw_flash_init(void);
int rt_flash_read(rt_uint32_t addr, rt_uint8_t *buf, size_t size);
int rt_flash_write(rt_uint32_t addr, const rt_uint8_t *buf, size_t size);
rt_err_t rt_flash_erase(rt_uint32_t addr, size_t size);
```

`rt_flash_read` y `rt_flash_write` devuelven los bytes transferidos si tienen éxito y `0` si fallan; `rt_flash_erase` devuelve `RT_EOK` cuando termina correctamente. Las declaraciones se han normalizado para facilitar la lectura; confirme los encabezados y valores de retorno reales en la rama del SDK de destino.

Utilice `rt_flash_read` para leer tanto NOR como NAND. La NOR también puede leerse mediante su ventana de memoria; para NAND es obligatorio usar la API y la aplicación debe gestionar el búfer. Use `rt_flash_write` con ambos tipos. Para borrar, la NOR suele requerir que la dirección y la longitud estén alineadas a sectores (normalmente 4 KB), mientras que NAND normalmente requiere alineación a bloques (normalmente 128 KB). La aplicación debe conservar y restaurar por su cuenta cualquier dato que no esté alineado.

Si Flash no admite XIP, el código no puede borrar ni programar la misma Flash desde la que se está ejecutando. Coloque el código del driver Flash en SRAM. El fragmento del enlazador Keil de la guía original reserva 64 KB a partir de `0x200E1000`:

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

El ejemplo original de lectura y escritura contiene un búfer de datos sin inicializar y errores en la limpieza, por lo que no debe ejecutarse tal como está. El ejemplo adaptado de NOR Flash recibe la dirección de prueba como argumento y no presupone una dirección fija del producto:

!!! warning "El borrado de Flash es destructivo"
    Ejecútelo solo en una región de prueba NOR dedicada y borrable, y ajuste `TEST_SIZE` a la granularidad de borrado que exijan el componente y el controlador. Reserve al menos una unidad de borrado completa y respete la alineación de la dirección y la longitud. No use regiones de configuración de arranque, calibración, firmware/OTA, sistemas de archivos ni datos de usuario. Este ejemplo no sirve para NAND; NAND también requiere gestionar bloques defectuosos, ECC, OOB y restricciones de página/bloque específicas del componente y del controlador.

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

## Usar Flash mediante MTD de RT-Thread { #5-use-flash-through-rt-thread-mtd }

RT-Thread proporciona controladores de dispositivo MTD-NOR y MTD-NAND. Al habilitar MTD y las opciones del sistema de archivos en la configuración, los dispositivos se registran durante el arranque. Busque un controlador con `rt_device_find("flash1")`; los nombres son `flash1`, `flash2` y `flash3` (y el nombre correspondiente para cada controlador habilitado). Un resultado distinto de NULL indica que el registro se completó correctamente.

MTD se utiliza con sistemas de archivos y almacenamiento USB. Normalmente, el código de aplicación busca el dispositivo y lo asocia; la capa MTD-NOR encapsula las operaciones de lectura y escritura. Si registra un dispositivo manualmente, implemente la tabla de operaciones siguiente.

### Estructura del dispositivo MTD-NOR { #mtd-nor-types }

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

### Estructura del dispositivo MTD-NAND { #mtd-nand-types }

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

El ejemplo de sistema de archivos NOR de la guía original registra `flash1`, lo busca, lo formatea con Elm y lo monta. Es un ejemplo específico del SF32LB56x; confirme los nombres de los controladores y las regiones del sistema de archivos para la familia de destino:

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

## Revisar la distribución actual de Flash y reservar regiones { #6-reserve-and-review-the-current-flash-layout }

La [guía de uso de memoria de SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/memory_usage.html) define esta distribución predeterminada de QSPI1: la región de 64 KB entre `0x10000000` y `0x1000FFFF` contiene la tabla de configuración de Flash, la tabla de calibración y espacio reservado; los siguientes 64 KB, entre `0x10010000` y `0x1001FFFF`, se reservan para el parche de la ROM de arranque, y el código de usuario comienza en `0x10020000`. Si `FLASH2` utiliza Flash NOR, los recursos de imagen empiezan en `0x64000000`. FlashDB (o EasyFlash) también utiliza partes de `flash1` y `flash2` para variables y registros; libere y vuelva a particionar esas regiones según los requisitos del sistema.

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

Considere estas direcciones como la distribución predeterminada de la guía original, no como un mapa de particiones universal. Antes de asignar datos del producto, concílielas con el script del enlazador, el cargador de arranque, el plan OTA, los rangos del sistema de archivos y la capacidad real de Flash del objetivo.

## Añadir soporte para una memoria NOR Flash { #7-port-a-nor-flash-part }

Las placas pueden utilizar distintos componentes Flash NOR. Compruebe que coincidan tanto las especificaciones de hardware como los comandos de operación.

### Requisitos de hardware { #hardware-requirements }

Compruebe lo siguiente:

- Tensión de alimentación: 3,3 V o 1,8 V.
- Compatibilidad con SPI de una, dos y cuatro líneas.
- Frecuencia máxima de cada modo de líneas.
- Otros datos necesarios para el diseño de hardware. La guía original indica que, en esta fase de adaptación de software, no es necesario cotejar la temperatura de funcionamiento ni la velocidad de borrado/programación.

### Comandos de operación { #operation-commands }

Los comandos de lectura, escritura y borrado varían según el proveedor y el componente. Compare la hoja de datos con los ID de comando de `bf0_hal_qspi.h` y añada una tabla de comandos a `flash_table.c` si la existente no coincide.

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

El SDK ya incluye `flash_cmd_table_list`. Si los comandos del componente coinciden por completo, puede usar una tabla existente; de lo contrario, añada otra. La configuración de la tabla es:

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

Aquí, `cmd` es el ID de comando (`0x06` para habilitar escritura y `0x05` para leer el estado en los ejemplos de origen). `func_mode` selecciona lectura o escritura; `data_mode` selecciona sin datos o datos por una, dos o cuatro líneas; `dummy_cycle` especifica los ciclos de reloj entre el comando y la dirección/datos; `ab_size` y `ab_mode` describen los bytes alternativos; `addr_size` y `addr_mode` indican la longitud de la dirección y el modo de líneas; y `cmd_mode` especifica si el propio comando se envía por una, dos o cuatro líneas.

## Añadir soporte para una memoria NAND Flash { #8-port-a-nand-flash-part }

La adaptación de NAND sigue el proceso de NOR, aunque el conjunto de comandos y los tiempos varían según el componente. Determine la secuencia necesaria a partir de su hoja de datos. Algunos componentes utilizan una temporización distinta para leer el ID; si la configuración predeterminada no permite leerlo correctamente, modifique la implementación de lectura del ID o configure explícitamente el ID correcto para que pueda seleccionarse la nueva tabla de comandos.

## Compatibilidad y configuración de PSRAM { #9-port-psram }

La guía original documenta la compatibilidad con APM PSRAM en modos de 4, 8 y 16 líneas, con capacidades admitidas de 4 MB a 32 MB:

- SF32LB55x solo admite PSRAM de 4 líneas.
- SF32LB58x admite PSRAM de 4, 8 y 16 líneas.
- SF32LB56x admite PSRAM de 4 y 8 líneas.

Seleccione el modo MPI/QSPI y el tamaño de memoria que correspondan al encapsulado, el cableado de la placa y el componente PSRAM.

## Usar J-Link DSK y Open Flashloader { #10-use-j-link-dsk-and-open-flashloader }

El directorio `tools/flash/jlink_drv` del SDK contiene el paquete estático J-Link Device Support Kit (DSK) de SiFli. El archivo raíz `JLinkDevices.xml` describe las relaciones entre el dispositivo, los bancos Flash y los cargadores; los archivos ELF de sus subdirectorios son los algoritmos de Open Flashloader.

Instale J-Link V7.62 o posterior y copie el directorio `tools/flash/jlink_drv` completo en `JLinkDevices\SiFli` dentro del perfil del usuario actual. En Windows, la ruta predeterminada es `C:\Users\<user>\AppData\Roaming\SEGGER\JLinkDevices\SiFli`.

Mantenga estas reglas sincronizadas con el proyecto de la placa:

- Desde J-Link V7.62, se buscan recursivamente todos los archivos `*.xml` bajo `JLinkDevices`; por tanto, no es necesario modificar el `JLinkDevices.xml` de la instalación de J-Link.
- Las rutas de los cargadores del XML se resuelven respecto a `JLinkDevices.xml`. Copie el directorio completo, no solo algunos archivos ELF.
- El dispositivo seleccionado debe coincidir con `JLINK_DEVICE` en `rtconfig.py`, por ejemplo `SF32LB56X`, `SF32LB56X_NAND` o `SF32LB52X_NOR`.
- Un `FlashBankInfo` puede incluir varias entradas `LoaderInfo`. J-Link utiliza el primer cargador de forma predeterminada. Para seleccionar otro, especifique `_device "<DeviceName>?BankAddr=<FlashBankBase>&Loader=<LoaderName>"_` o llame a `_JLINK_ExecCommand("DEVICE_SelectLoader BankAddr=<FlashBankBase> Loader=<LoaderName>");_` desde un script J-Link.
- Los nombres de dispositivo sin sufijo, como `SF32LB52X`, `SF32LB55X`, `SF32LB56X` y `SF32LB58X`, ahora incluyen información completa de bancos y cargadores y dan prioridad al cargador NOR. Se mantienen los nombres con sufijo por compatibilidad con scripts existentes.

## Lista de comprobación de integración { #integration-checklist }

Antes de utilizar Flash externa en un producto, registre lo siguiente:

1. La familia SF32, el encapsulado, el componente Flash, la tensión y los modos de líneas compatibles exactos.
2. El controlador QSPI/MPI, el modo, DMA, el tamaño de memoria, el ID del dispositivo y los ajustes de MTD/sistema de archivos.
3. La ventana de direcciones seleccionada y las regiones reservadas para tablas, calibración, parche de arranque, imagen, recursos, variables, registros y datos del sistema de archivos.
4. La alineación de borrado y si el código del driver se ejecuta desde SRAM durante la programación/el borrado.
5. El nombre del dispositivo MTD y la ruta de montaje del sistema de archivos, si se utilizan.
6. El nombre de dispositivo J-Link de la placa y el cargador seleccionado.

## Páginas relacionadas { #related-pages }

- [Tablas de particiones](../../../firmware-topics/partition-tables.md): concilie las regiones Flash con la distribución de imágenes y OTA.
- [OTA y DFU](../../../firmware-topics/ota-dfu.md): revise el proceso de actualización antes de reservar regiones para datos del producto.
- [Notas de aplicación del SDK](../sdk-application-notes.md): índice completo de notas de aplicación.

## Fuente oficial { #official-source }

- [Guía de uso de Flash — Guía de programación del SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)
- [Guía de uso de Flash del SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/flash_usage.html)
- [Guía de uso de Flash del SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/flash_usage.html)
- [Guía de uso de Flash del SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/flash_usage.html)
