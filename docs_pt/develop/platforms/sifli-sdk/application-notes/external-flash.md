---
icon: lucide/hard-drive
title: "Uso de Flash externa"
description: "Configure os controladores, acesse e monte memórias NOR Flash, NAND Flash e PSRAM externas e adapte os drivers com o SiFli-SDK."
tags: [Desenvolvimento, SiFli-SDK, Notas de aplicação, Flash]
---

# Uso de Flash externa { #use-external-flash }

Este artigo organiza o [guia de uso de Flash](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html) da SiFli como um fluxo prático de integração para SF32LB52x, SF32LB55x, SF32LB56x e SF32LB58x. Ele aborda a configuração dos controladores, os espaços de endereçamento de cada família, o acesso direto pelo RT-Thread, sistemas de arquivos MTD, regiões reservadas, a adaptação do suporte a novas memórias Flash, PSRAM e Open Flashloader do J-Link.

O guia de origem usa `FLASH` tanto para NOR Flash quanto para NAND Flash. Os exemplos mantêm os símbolos do SDK e os nomes dos dispositivos; antes de aplicar uma configuração ao produto, confira a branch do SDK usada pelo alvo e o esquemático da placa.

## Modelo e recursos dos controladores { #1-controller-model-and-capabilities }

O controlador Flash da SiFli pode conectar vários dispositivos Flash simultaneamente:

<div align="center" markdown>

<em>Tabela: Recursos dos controladores Flash por família</em>

| Família | Máximo de dispositivos | Modos de operação da PSRAM tratados neste guia | Nomes dos controladores nos exemplos |
|---|---:|---|---|
| SF32LB52x | Não especificado nesta fonte | Consulte o guia da família de destino | Confira os nomes QSPI/MPI usados no SDK de destino |
| SF32LB55x | 4 | Somente PSRAM de 4 linhas | QSPI |
| SF32LB56x | 4 | PSRAM de 4 e 8 linhas | Nomes de compatibilidade MPI/QSPI |
| SF32LB58x | 5 | PSRAM de 4, 8 e 16 linhas | Nomes de compatibilidade MPI/QSPI |
</div>

Os dispositivos podem ser NOR Flash ou NAND Flash. Em relação ao SF32LB55x, os controladores do SF32LB56x e do SF32LB58x também aceitam PSRAM de 8 linhas; o SF32LB58x também aceita PSRAM de 16 linhas. Nas arquiteturas anteriores, o controlador é chamado QSPI; nas arquiteturas mais recentes, voltadas à memória, é chamado MPI.

As atribuições típicas dos controladores são:

- **SF32LB55x:** o controlador 1 normalmente atende à NOR Flash integrada; os controladores 2 e 3 dependem do projeto da placa; o controlador 4 conecta-se à NOR Flash e pode ser acessado pelo LCPU e também pelo HCPU.
- **SF32LB58x:** os controladores 1 e 2 normalmente atendem à NOR Flash integrada ou à PSRAM, conforme o encapsulamento; os controladores 3 e 4 dependem do projeto da placa; o controlador 5 atende à NOR Flash integrada e pode ser acessado pelo LCPU e também pelo HCPU.
- **SF32LB56x:** os controladores 1 e 2 normalmente atendem à NOR Flash integrada ou à PSRAM, conforme o encapsulamento; o controlador 3 depende do projeto da placa; o controlador 5 atende à NOR Flash integrada e pode ser acessado pelo LCPU e também pelo HCPU. Não há controlador 4.

O driver é dividido em duas camadas. A camada HAL fornece acesso aos registradores de hardware e a lógica básica. A camada DRV oferece operações de leitura, gravação e apagamento da Flash, além de inicialização, controle e interfaces usadas pelos dispositivos e sistemas de arquivos.

O controlador oferece operações de Flash em modo de uma ou quatro linhas, aceleração por DMA, gravação e leitura de páginas e apagamento de setores/blocos. Também é possível ler a NOR Flash diretamente pela interface de memória AHB. A unidade básica de apagamento depende do componente Flash.

## Configurar QSPI ou MPI { #2-configure-qspi-or-mpi }

Atributos e uso da Flash são configurados pelo `menuconfig`, que gera `rtconfig.h`. As opções incluem habilitar o controlador, usar DMA, registrar dispositivos MTD, definir o sistema de arquivos e a capacidade da memória, além de escolher como tratar o ID do dispositivo (detecção automática ou configuração manual).

### Exemplo QSPI no SF32LB55x { #sf32lb55x-qspi-example }

No `menuconfig`, o guia de origem acessa **RTOS → On-chip Peripheral Driver → Enable QSPI → Enable QSPI Driver → QSPI Controller 1 Enable** e, em seguida, seleciona o modo QSPI1, se ele será usado por um sistema de arquivos, a capacidade da memória e se o ID do dispositivo será detectado automaticamente ou informado manualmente.

As definições correspondentes em `rtconfig.h` são:

```c
#define BSP_USING_QSPI 1            /*使能QSPI 模块*/
#define BSP_USING_SPI_FLASH 1       /*使能QSPI 控制FLASH功能（为了兼容以前版本）*/
#define BSP_ENABLE_QSPI1 1          /*使能QSPI控制器1*/
#define BSP_QSPI1_USING_DMA 1       /*QSPI1 使用FIFO DMA */
#define BSP_QSPI1_MODE 0            /*QSPI1 连接控制Nor FLASH*/
#define BSP_QSPI1_MEM_SIZE 4        /*配置FLASH1的总大小为4MB*/
#define BSP_QSPI1_CHIP_ID 0         /*FLASH1 DEV ID 由系统获取，不需要手动输入（这个配置是为了当有些FLASH获取ID的命令时序与默认设置不同时，手动添加ID以便查找正确的命令表）*/
```

Para uma segunda NOR Flash e uma terceira NAND Flash, os exemplos da fonte são:

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

### Exemplo MPI no SF32LB58x { #sf32lb58x-mpi-example }

Na EVB do SF32LB58x, o guia de origem acessa **RTOS → On-chip Peripheral Driver → Enable MPI → Enable QSPI Driver → MPI Controller 1 Enable** e seleciona o modo MPI, a capacidade da memória e as demais opções do dispositivo. Os valores de modo são `0 NOR`, `1 NAND`, `2 PSRAM`, `3 OPSRAM`, `4 HPSRAM` e `5 LEGACY_PSRAM`.

Veja a habilitação geral do MPI e os exemplos de configuração por controlador:

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

O SF32LB56x usa uma configuração MPI essencialmente igual à do SF32LB58x, mas não possui MPI4.

!!! warning "Verifique o exemplo de configuração MPI"
    A documentação de origem da SiFli é contraditória quanto ao MPI1: o texto diz que ele usa NOR Flash por padrão e que o modo não pode ser alterado, mas o trecho de configuração seguinte define o modo 4 (PSRAM de 16 linhas). Além disso, `BSP_QSPI1_MEM_SIZE` tem valor `32`, embora o comentário indique 16 MB; para MPI4, o valor é `128` e o comentário indica 128 MB, enquanto a tabela de capacidade da EVB informa 64 MB. Este artigo mantém os valores de configuração da fonte sem inferir a codificação das macros ou a capacidade real do componente. Confira-os na configuração Kconfig/gerada da versão do SDK usada, no esquemático da placa e na folha de dados da memória.

## Espaços de endereçamento da Flash { #3-flash-address-spaces }

As faixas a seguir representam as janelas máximas dos controladores. A capacidade realmente utilizável depende do componente Flash selecionado no `menuconfig`, não apenas do tamanho máximo da janela.

### SF32LB55x { #sf32lb55x }

<div align="center" markdown>

<em>Tabela: Janelas de endereçamento dos controladores Flash do SF32LB55x</em>

| Controlador | Início | Fim | Janela máxima | Configuração da EVB |
|:-----------|:------|:----|:---------------|:----------------|
| FLASH1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 bytes | Capacidade na EVB: 4 MB |
| FLASH2 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 bytes | Capacidade na EVB: 32 MB |
| FLASH3 | `0x68000000` | `0x6FFFFFFF` | 128 × 1024 × 1024 bytes | Não habilitado na EVB |
| FLASH4 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 bytes | Não habilitado na EVB |
</div>

As definições dos endereços-base dos controladores estão em `mem_map.h`:

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x64000000)
#define QSPI3_MEM_BASE   (0x68000000)
#define QSPI4_MEM_BASE   (0x12000000)
```

### SF32LB58x { #sf32lb58x }

**Espaço de endereçamento C-BUS**

<div align="center" markdown>

<em>Tabela: Espaço de endereçamento C-BUS do SF32LB58x</em>

| Controlador | Início | Fim | Janela máxima | Configuração da EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 bytes | Capacidade na EVB: 16 MB |
| MPI2 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 bytes | Capacidade na EVB: 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 bytes | Capacidade na EVB: 32 MB |
| MPI4 | `0x18000000` | `0x1BFFFFFF` | 64 × 1024 × 1024 bytes | Capacidade na EVB: 64 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 bytes | Capacidade na EVB: 4 MB |
</div>

**Espaço de endereçamento S-BUS**

<div align="center" markdown>

<em>Tabela: Espaço de endereçamento S-BUS do SF32LB58x</em>

| Controlador | Início | Fim | Janela máxima | Configuração da EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x60000000` | `0x61FFFFFF` | 32 × 1024 × 1024 bytes | Capacidade na EVB: 16 MB |
| MPI2 | `0x62000000` | `0x63FFFFFF` | 32 × 1024 × 1024 bytes | Capacidade na EVB: 16 MB |
| MPI3 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 bytes | Capacidade na EVB: 32 MB |
| MPI4 | `0x68000000` | `0x9FFFFFFF` | 896 × 1024 × 1024 bytes | Capacidade na EVB: 64 MB |
</div>

Para NAND Flash com capacidade superior a 64 MB, o guia recomenda conectá-la ao MPI4 e usar endereços a partir de `0x68000000`.

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x12000000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI4_MEM_BASE   (0x18000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

### SF32LB56x { #sf32lb56x }

**Espaço de endereçamento C-BUS**

<div align="center" markdown>

<em>Tabela: Espaço de endereçamento C-BUS do SF32LB56x</em>

| Controlador | Início | Fim | Janela máxima | Configuração da EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x107FFFFF` | 8 × 1024 × 1024 bytes | Capacidade na EVB: 4 MB |
| MPI2 | `0x10800000` | `0x13FFFFFF` | 56 × 1024 × 1024 bytes | Capacidade na EVB: 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 bytes | Capacidade na EVB: 128 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 bytes | Capacidade na EVB: 1 MB |
</div>

**Espaço de endereçamento S-BUS**

<div align="center" markdown>

<em>Tabela: Espaço de endereçamento S-BUS do SF32LB56x</em>

| Controlador | Início | Fim | Janela máxima |
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

!!! note "Janela de endereçamento e capacidade do dispositivo"
    A fonte informa que a faixa C-BUS do MPI3 no SF32LB56x é `0x14000000`–`0x17FFFFFF`, mas atribui a ela 128 MB. Incluindo os dois endereços extremos, a faixa corresponde a 64 MB, valor usado na tabela acima. A capacidade de 128 MB do dispositivo da EVB foi mantida separadamente; ela não determina o tamanho dessa janela C-BUS. Confira o mapa de memória do SDK de destino antes de usar uma faixa de endereços.

## Acessar a Flash pelo RT-Thread { #4-access-flash-through-rt-thread }

A interface Flash do RT-Thread seleciona o controlador com base no endereço absoluto. Chame `rt_hw_flash_init` depois que as configurações do controlador e do dispositivo forem geradas em `rtconfig.h`:

```c
int rt_hw_flash_init(void);
int rt_flash_read(rt_uint32_t addr, rt_uint8_t *buf, size_t size);
int rt_flash_write(rt_uint32_t addr, const rt_uint8_t *buf, size_t size);
rt_err_t rt_flash_erase(rt_uint32_t addr, size_t size);
```

`rt_flash_read` e `rt_flash_write` retornam a quantidade de bytes transferidos em caso de sucesso e `0` em caso de falha; `rt_flash_erase` retorna `RT_EOK` quando tem sucesso. As declarações foram normalizadas para facilitar a leitura; confirme os cabeçalhos e valores de retorno reais na versão do SDK usada.

Use `rt_flash_read` para ler NOR e NAND. A NOR também pode ser lida pela janela de memória; para NAND, use a API e gerencie o buffer no código chamador. Use `rt_flash_write` para ambos os tipos. Para apagar dados, NOR Flash normalmente exige que o endereço e o tamanho estejam alinhados a setores (em geral, 4 KB); NAND Flash normalmente exige alinhamento a blocos (em geral, 128 KB). Se os dados não estiverem alinhados, preserve-os e restaure-os por conta própria.

Quando a Flash não oferece suporte a XIP, o código não pode apagar nem programar a mesma Flash da qual está sendo executado. Coloque o código do driver Flash na SRAM. O trecho de configuração do linker Keil no guia de origem reserva 64 KB a partir de `0x200E1000`:

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

O exemplo original de leitura e gravação contém um buffer de dados não inicializado e erros na rotina de limpeza; portanto, não deve ser executado como publicado. O exemplo adaptado para NOR Flash recebe o endereço de teste como argumento e não pressupõe um endereço fixo do produto.

!!! warning "Apagar a Flash é destrutivo"
    Execute o teste somente em uma região NOR dedicada, apagável e reservada para testes. Ajuste `TEST_SIZE` à granularidade de apagamento exigida pelo componente e pelo driver, reserve pelo menos uma unidade de apagamento completa e respeite o alinhamento do endereço e do tamanho. Não use regiões de configuração de inicialização, calibração, imagens de firmware/OTA, sistemas de arquivos ou dados do usuário. Este exemplo não se aplica a NAND, que também exige tratamento específico de blocos defeituosos, ECC, OOB e restrições de página/bloco.

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

## Usar Flash por meio do MTD do RT-Thread { #5-use-flash-through-rt-thread-mtd }

O RT-Thread fornece drivers de dispositivo MTD-NOR e MTD-NAND. Quando as opções de MTD e do sistema de arquivos estão habilitadas na configuração, os dispositivos são registrados durante a inicialização. Consulte um controlador com `rt_device_find("flash1")`; os nomes dos controladores são `flash1`, `flash2` e `flash3` (há um nome de dispositivo correspondente para cada controlador habilitado). Um resultado diferente de nulo indica que o registro foi concluído.

O MTD é usado por sistemas de arquivos e pelo armazenamento USB. Normalmente, o código da aplicação localiza e associa o dispositivo; a camada MTD-NOR encapsula as operações de leitura e gravação. Se você registrar um dispositivo manualmente, implemente a tabela de operações mostrada abaixo.

### Estrutura do dispositivo MTD-NOR { #mtd-nor-types }

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

### Estrutura do dispositivo MTD-NAND { #mtd-nand-types }

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

O exemplo de sistema de arquivos NOR da fonte registra `flash1`, localiza o dispositivo, formata-o com Elm e monta o sistema de arquivos. O exemplo vem do guia do SF32LB56x; confirme os nomes dos controladores e as regiões reservadas ao sistema de arquivos para a família de destino:

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

## Reservar e revisar o layout atual da Flash { #6-reserve-and-review-the-current-flash-layout }

O [guia de uso de memória do SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/memory_usage.html) define o seguinte layout padrão para QSPI1: a região de 64 KB entre `0x10000000` e `0x1000FFFF` contém a tabela de configuração da Flash, a tabela de calibração e espaço reservado; os 64 KB seguintes, de `0x10010000` a `0x1001FFFF`, são reservados ao patch da boot ROM, e o código do usuário começa em `0x10020000`. Se `FLASH2` usar NOR Flash, os recursos de imagem começam em `0x64000000`. O FlashDB (ou o EasyFlash) também usa partes de `flash1` e `flash2` para variáveis e logs; recupere e redistribua essas regiões conforme os requisitos do sistema.

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

Considere esses endereços como o layout padrão do guia de origem, não como um mapa universal de partições. Antes de alocar dados do produto, confira-os em relação ao linker script, ao bootloader, ao plano de OTA, às regiões do sistema de arquivos e à capacidade real da Flash de destino.

## Adicionar suporte a uma NOR Flash { #7-port-a-nor-flash-part }

Placas diferentes podem usar componentes NOR Flash distintos. Verifique a compatibilidade tanto com as especificações de hardware quanto com os comandos de operação do componente.

### Requisitos de hardware { #hardware-requirements }

Verifique:

- tensão de alimentação: 3,3 V ou 1,8 V;
- suporte a SPI de uma, duas ou quatro linhas;
- frequência máxima em cada modo de linhas; e
- outros requisitos do projeto de hardware. A fonte observa que, nesta etapa de adaptação do driver, não é necessário avaliar a temperatura de operação nem a velocidade de apagamento/gravação.

### Comandos de operação { #operation-commands }

Os comandos de leitura, gravação e apagamento variam conforme o fabricante e o componente. Compare a folha de dados do componente com os IDs de comando em `bf0_hal_qspi.h`; se nenhuma tabela existente for compatível, adicione uma nova tabela em `flash_table.c`.

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

O SDK já contém `flash_cmd_table_list`. Use uma tabela existente somente se todos os comandos do componente corresponderem; caso contrário, adicione uma nova tabela. A configuração da tabela é:

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

Aqui, `cmd` é o ID do comando (`0x06` para habilitar gravação e `0x05` para ler o status nos exemplos da fonte). `func_mode` seleciona leitura ou gravação; `data_mode` seleciona ausência de dados ou dados em uma, duas ou quatro linhas; `dummy_cycle` define os ciclos de clock entre o comando e o endereço/dado; `ab_size` e `ab_mode` descrevem os bytes alternativos; `addr_size` e `addr_mode` definem o tamanho do endereço e o modo de linhas; e `cmd_mode` indica se o próprio comando é enviado em uma, duas ou quatro linhas.

## Adicionar suporte a uma NAND Flash { #8-port-a-nand-flash-part }

O driver de NAND segue o mesmo fluxo geral do driver de NOR, mas o conjunto de comandos e os tempos variam conforme o componente. Determine a sequência necessária com base na folha de dados. Alguns componentes usam tempos diferentes para a leitura do ID; se a configuração padrão não identificar corretamente a memória, ajuste a implementação dessa leitura ou informe o ID correto para selecionar a nova tabela de comandos.

## Adicionar suporte a PSRAM { #9-port-psram }

O guia de origem documenta suporte a PSRAM APM nos modos de 4, 8 e 16 linhas, com densidades de 4 MB a 32 MB:

- SF32LB55x aceita somente PSRAM de 4 linhas.
- SF32LB58x aceita PSRAM de 4, 8 e 16 linhas.
- SF32LB56x aceita PSRAM de 4 e 8 linhas.

Use o modo MPI/QSPI e as configurações de capacidade compatíveis com o encapsulamento, as conexões da placa e o componente PSRAM.

## Usar o J-Link DSK e o Open Flashloader { #10-use-j-link-dsk-and-open-flashloader }

O diretório `tools/flash/jlink_drv` do SDK contém o J-Link Device Support Kit (DSK) estático da SiFli. O arquivo raiz `JLinkDevices.xml` descreve as relações entre o dispositivo, os bancos Flash e os loaders; os arquivos ELF nos subdiretórios contêm os algoritmos do Open Flashloader.

Instale o J-Link V7.62 ou posterior e copie o diretório completo `tools/flash/jlink_drv` para `JLinkDevices\SiFli` no perfil do usuário atual. No Windows, o caminho padrão é `C:\Users\<user>\AppData\Roaming\SEGGER\JLinkDevices\SiFli`.

Mantenha estas configurações alinhadas ao projeto da placa:

- Desde o J-Link V7.62, todos os arquivos `*.xml` em `JLinkDevices` são pesquisados recursivamente; portanto, não é necessário modificar o `JLinkDevices.xml` da instalação do J-Link.
- Os caminhos dos loaders no XML são resolvidos em relação ao `JLinkDevices.xml`; copie o diretório completo, não apenas alguns arquivos ELF.
- O dispositivo selecionado deve corresponder a `JLINK_DEVICE` em `rtconfig.py`, por exemplo `SF32LB56X`, `SF32LB56X_NAND` ou `SF32LB52X_NOR`.
- Um `FlashBankInfo` pode conter várias entradas `LoaderInfo`. Por padrão, o J-Link usa o primeiro loader. Para selecionar outro, especifique `_device "<DeviceName>?BankAddr=<FlashBankBase>&Loader=<LoaderName>"_` ou chame `_JLINK_ExecCommand("DEVICE_SelectLoader BankAddr=<FlashBankBase> Loader=<LoaderName>");_` em um script do J-Link.
- Nomes de dispositivo sem sufixo, como `SF32LB52X`, `SF32LB55X`, `SF32LB56X` e `SF32LB58X`, agora incluem as informações completas de bancos e loaders e priorizam o loader NOR. Os nomes com sufixo permanecem disponíveis por compatibilidade com scripts existentes.

## Checklist de integração { #integration-checklist }

Antes de usar Flash externa em um produto, registre:

1. a família SF32, o encapsulamento, o componente Flash, a tensão e os modos de linhas aceitos;
2. o controlador QSPI/MPI, o modo, o DMA, a capacidade da memória, o ID do dispositivo e as opções de MTD/sistema de arquivos;
3. a janela de endereçamento selecionada e as regiões reservadas para tabelas, calibração, patch de boot, imagem, recursos, variáveis, logs e dados do sistema de arquivos;
4. o alinhamento necessário para apagamento e se o driver é executado na SRAM durante a gravação/apagamento;
5. o nome do dispositivo MTD e o caminho de montagem do sistema de arquivos, se usados; e
6. o nome do dispositivo J-Link da placa e o loader selecionado.

## Páginas relacionadas { #related-pages }

- [Tabelas de partições](../../../firmware-topics/partition-tables.md) — alinhe as regiões da Flash ao layout de imagens e OTA.
- [OTA e DFU](../../../firmware-topics/ota-dfu.md) — revise o processo de atualização antes de reservar regiões para dados do produto.
- [Notas de aplicação do SDK](../sdk-application-notes.md) — índice completo das notas de aplicação.

## Fontes oficiais { #official-source }

- [Guia de uso de Flash — guia de programação do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)
- [Uso de Flash no SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/flash_usage.html)
- [Uso de Flash no SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/flash_usage.html)
- [Uso de Flash no SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/flash_usage.html)
