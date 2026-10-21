---
icon: lucide/hard-drive
title: "Utiliser une mémoire Flash externe"
description: "Configurer les contrôleurs, accéder aux mémoires NOR Flash, NAND Flash et PSRAM externes, monter les systèmes de fichiers associés et adapter les pilotes avec SiFli-SDK."
tags: [Développement, SiFli-SDK, Notes d'application, Flash]
---

# Utiliser une mémoire Flash externe { #use-external-flash }

Cet article transforme le [guide d'utilisation de la Flash](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html) de SiFli en une démarche pratique d'intégration pour les SF32LB52x, SF32LB55x, SF32LB56x et SF32LB58x. Il couvre la configuration du contrôleur, les espaces d'adressage propres à chaque famille, l'accès direct via RT-Thread, les systèmes de fichiers MTD, les régions réservées, le portage de nouvelles puces Flash, la PSRAM et la prise en charge du J-Link Open Flashloader.

Le guide d'origine utilise `FLASH` à la fois pour la Flash NOR et la Flash NAND. Les exemples conservent ses symboles SDK et noms de composants ; vérifiez la branche SDK cible et le schéma de la carte avant de reprendre une configuration dans un produit.

## Modèle et capacités du contrôleur { #1-controller-model-and-capabilities }

Le contrôleur Flash SiFli peut connecter plusieurs composants Flash simultanément :

<div align="center" markdown>

<em>Tableau : Capacités du contrôleur Flash par famille</em>

| Famille | Nombre maximal de composants | Modes de lignes PSRAM couverts par ce guide | Nommage du contrôleur dans les exemples |
|---|---:|---|---|
| SF32LB52x | Non indiqué dans cette source | Vérifiez le guide de la famille cible | Vérifiez le nommage QSPI/MPI du SDK cible |
| SF32LB55x | 4 | PSRAM 4 lignes uniquement | QSPI |
| SF32LB56x | 4 | PSRAM 4 lignes et 8 lignes | Noms compatibles MPI/QSPI |
| SF32LB58x | 5 | PSRAM 4 lignes, 8 lignes et 16 lignes | Noms compatibles MPI/QSPI |
</div>

Les composants peuvent être de la Flash NOR ou de la Flash NAND. Par rapport au SF32LB55x, les contrôleurs SF32LB56x et SF32LB58x prennent en charge la PSRAM en mode 8 lignes ; le SF32LB58x prend également en charge le mode 16 lignes. Les contrôleurs de la génération précédente sont appelés QSPI ; ceux de la génération plus récente, conçue pour différents types de mémoire, sont appelés MPI.

Les affectations habituelles du contrôleur sont :

- **SF32LB55x :** le contrôleur 1 gère normalement la Flash NOR intégrée ; les contrôleurs 2 et 3 dépendent de la conception de la carte ; le contrôleur 4 est relié à une Flash NOR et est accessible depuis le LCPU et le HCPU.
- **SF32LB58x :** les contrôleurs 1 et 2 gèrent normalement la Flash NOR intégrée ou la PSRAM, selon le boîtier ; les contrôleurs 3 et 4 dépendent de la conception de la carte ; le contrôleur 5 correspond à la Flash NOR intégrée et est accessible depuis le LCPU et le HCPU.
- **SF32LB56x :** les contrôleurs 1 et 2 gèrent normalement la Flash NOR intégrée ou la PSRAM, selon le boîtier ; le contrôleur 3 dépend de la conception de la carte ; le contrôleur 5 correspond à la Flash NOR intégrée et est accessible depuis le LCPU et le HCPU. Il n'existe pas de contrôleur 4.

Le pilote est réparti sur deux couches. La couche HAL fournit l'accès aux registres matériels et une logique simple. La couche DRV fournit les opérations de lecture/écriture/effacement de la Flash, l'initialisation et le contrôle, ainsi que les interfaces utilisées par les composants et les systèmes de fichiers.

Le contrôleur prend en charge les opérations Flash sur une ou quatre lignes, l'accélération DMA, la programmation par page, la lecture par page, et l'effacement par secteur/bloc. La Flash NOR peut aussi être lue directement via l'interface mémoire AHB. L'unité d'effacement de base dépend de la puce Flash.

## Configurer QSPI ou MPI { #2-configure-qspi-or-mpi }

Les attributs et l'utilisation de la Flash se configurent via `menuconfig`, qui génère `rtconfig.h`. Les options incluent l'activation du contrôleur, l'utilisation du DMA, l'enregistrement MTD, les paramètres du système de fichiers, la taille mémoire et la gestion de l'ID du composant (détection automatique ou définition manuelle).

### Exemple QSPI pour SF32LB55x { #sf32lb55x-qspi-example }

Dans `menuconfig`, le guide d'origine suit le chemin **RTOS → On-chip Peripheral Driver → Enable QSPI → Enable QSPI Driver → QSPI Controller 1 Enable**, puis configure le mode QSPI1, l'utilisation du système de fichiers, la taille mémoire et le choix entre la détection automatique de l'ID et sa définition manuelle.

Les définitions `rtconfig.h` correspondantes sont :

```c
#define BSP_USING_QSPI 1            /*使能QSPI 模块*/
#define BSP_USING_SPI_FLASH 1       /*使能QSPI 控制FLASH功能（为了兼容以前版本）*/
#define BSP_ENABLE_QSPI1 1          /*使能QSPI控制器1*/
#define BSP_QSPI1_USING_DMA 1       /*QSPI1 使用FIFO DMA */
#define BSP_QSPI1_MODE 0            /*QSPI1 连接控制Nor FLASH*/
#define BSP_QSPI1_MEM_SIZE 4        /*配置FLASH1的总大小为4MB*/
#define BSP_QSPI1_CHIP_ID 0         /*FLASH1 DEV ID 由系统获取，不需要手动输入（这个配置是为了当有些FLASH获取ID的命令时序与默认设置不同时，手动添加ID以便查找正确的命令表）*/
```

Pour une deuxième Flash NOR et une troisième Flash NAND, les exemples du guide d'origine sont :

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

### Exemple MPI pour SF32LB58x { #sf32lb58x-mpi-example }

Sur l'EVB SF32LB58x, le guide d'origine suit le chemin **RTOS → On-chip Peripheral Driver → Enable MPI → Enable QSPI Driver → MPI Controller 1 Enable**, puis configure le mode MPI, la taille mémoire et d'autres options du composant. Les valeurs de mode sont `0 NOR`, `1 NAND`, `2 PSRAM`, `3 OPSRAM`, `4 HPSRAM` et `5 LEGACY_PSRAM`.

Les exemples communs d'activation MPI et par contrôleur sont :

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

Le SF32LB56x utilise essentiellement la même configuration MPI que le SF32LB58x, à ceci près que le MPI4 n'est pas présent.

!!! warning "Vérifier l'exemple de configuration MPI"
    La documentation source de SiFli est contradictoire au sujet de MPI1 : le texte indique que MPI1 est relié par défaut à une mémoire NOR Flash et que son mode ne peut pas être modifié, tandis que l'extrait de configuration suivant règle MPI1 sur le mode 4 (PSRAM 16 lignes). De plus, `BSP_QSPI1_MEM_SIZE` vaut `32` alors que le commentaire indique 16 MB ; pour MPI4, la valeur est `128` et le commentaire indique 128 MB, tandis que le tableau de capacité de l'EVB indique 64 MB. Cet article conserve les valeurs de configuration de la source sans déduire l'encodage des macros ni la capacité réelle du composant. Vérifiez-les avec la configuration Kconfig/générée de la version du SDK cible, le schéma de la carte et la fiche technique de la mémoire.

## Espaces d'adressage Flash { #3-flash-address-spaces }

Les plages suivantes sont les fenêtres maximales du contrôleur. La taille réellement utilisable dépend de la puce Flash sélectionnée dans `menuconfig`, et non de la seule fenêtre maximale.

### SF32LB55x { #sf32lb55x }

<div align="center" markdown>

<em>Tableau : Fenêtres d'adressage du contrôleur Flash SF32LB55x</em>

| Contrôleur | Début | Fin | Fenêtre maximale | Description EVB |
|:-----------|:------|:----|:---------------|:----------------|
| FLASH1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 octets | Capacité EVB 4 MB |
| FLASH2 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 octets | Capacité EVB 32 MB |
| FLASH3 | `0x68000000` | `0x6FFFFFFF` | 128 × 1024 × 1024 octets | Non activé sur l'EVB |
| FLASH4 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 octets | Non activé sur l'EVB |
</div>

Les définitions des adresses de base des contrôleurs se trouvent dans `mem_map.h` :

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x64000000)
#define QSPI3_MEM_BASE   (0x68000000)
#define QSPI4_MEM_BASE   (0x12000000)
```

### SF32LB58x { #sf32lb58x }

**Espace d'adressage C-BUS**

<div align="center" markdown>

<em>Tableau : Espace d'adressage C-BUS de SF32LB58x</em>

| Contrôleur | Début | Fin | Fenêtre maximale | Description EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 octets | Capacité EVB 16 MB |
| MPI2 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 octets | Capacité EVB 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 octets | Capacité EVB 32 MB |
| MPI4 | `0x18000000` | `0x1BFFFFFF` | 64 × 1024 × 1024 octets | Capacité EVB 64 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 octets | Capacité EVB 4 MB |
</div>

**Espace d'adressage S-BUS**

<div align="center" markdown>

<em>Tableau : Espace d'adressage S-BUS de SF32LB58x</em>

| Contrôleur | Début | Fin | Fenêtre maximale | Description EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x60000000` | `0x61FFFFFF` | 32 × 1024 × 1024 octets | Capacité EVB 16 MB |
| MPI2 | `0x62000000` | `0x63FFFFFF` | 32 × 1024 × 1024 octets | Capacité EVB 16 MB |
| MPI3 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 octets | Capacité EVB 32 MB |
| MPI4 | `0x68000000` | `0x9FFFFFFF` | 896 × 1024 × 1024 octets | Capacité EVB 64 MB |
</div>

Pour une Flash NAND de plus de 64 MB, le guide recommande de la raccorder à MPI4 et d'utiliser des adresses débutant à `0x68000000`.

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x12000000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI4_MEM_BASE   (0x18000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

### SF32LB56x { #sf32lb56x }

**Espace d'adressage C-BUS**

<div align="center" markdown>

<em>Tableau : Espace d'adressage C-BUS de SF32LB56x</em>

| Contrôleur | Début | Fin | Fenêtre maximale | Description EVB |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x107FFFFF` | 8 × 1024 × 1024 octets | Capacité EVB 4 MB |
| MPI2 | `0x10800000` | `0x13FFFFFF` | 56 × 1024 × 1024 octets | Capacité EVB 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 octets | Capacité EVB 128 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 octets | Capacité EVB 1 MB |
</div>

**Espace d'adressage S-BUS**

<div align="center" markdown>

<em>Tableau : Espace d'adressage S-BUS de SF32LB56x</em>

| Contrôleur | Début | Fin | Fenêtre maximale |
|:-----------|:------|:----|:---------------|
| MPI1 | `0x60000000` | `0x607FFFFF` | 8 × 1024 × 1024 octets |
| MPI2 | `0x60800000` | `0x63FFFFFF` | 56 × 1024 × 1024 octets |
| MPI3 | `0x64000000` | `0x9FFFFFFF` | 960 × 1024 × 1024 octets |
</div>

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x10800000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

!!! note "Fenêtre d'adressage et capacité de la puce"
    La source donne la plage C-BUS de MPI3 sur SF32LB56x comme `0x14000000`–`0x17FFFFFF`, mais indique une taille de 128 MB. En incluant les deux adresses limites, cette plage couvre 64 MB, valeur retenue dans le tableau ci-dessus. La capacité de 128 MB de la puce de l'EVB reste indiquée séparément ; elle ne détermine pas la taille de cette fenêtre C-BUS. Vérifiez le plan mémoire du SDK cible avant d'utiliser une plage d'adresses.

## Accéder à la Flash via RT-Thread { #4-access-flash-through-rt-thread }

L'interface Flash de RT-Thread sélectionne le contrôleur à partir de l'adresse absolue. Appelez `rt_hw_flash_init` une fois que les paramètres du contrôleur et du composant ont été générés dans `rtconfig.h` :

```c
int rt_hw_flash_init(void);
int rt_flash_read(rt_uint32_t addr, rt_uint8_t *buf, size_t size);
int rt_flash_write(rt_uint32_t addr, const rt_uint8_t *buf, size_t size);
rt_err_t rt_flash_erase(rt_uint32_t addr, size_t size);
```

`rt_flash_read` et `rt_flash_write` renvoient le nombre d'octets transférés en cas de succès et `0` en cas d'échec ; `rt_flash_erase` renvoie `RT_EOK` en cas de succès. Les déclarations ont été normalisées pour faciliter la lecture ; vérifiez les en-têtes et les valeurs de retour réels dans la branche du SDK cible.

Utilisez `rt_flash_read` pour les lectures NOR comme NAND ; la NOR peut aussi être lue via sa fenêtre mémoire, tandis que la NAND doit obligatoirement passer par l'API, l'appelant devant gérer lui-même le tampon. Utilisez `rt_flash_write` pour les deux types. Pour les opérations d'effacement, la NOR exige normalement une adresse et une longueur alignées sur un secteur (généralement 4 KB) ; la NAND exige normalement un alignement sur un bloc (généralement 128 KB). Sauvegardez et restaurez vous-même toute donnée non alignée.

Lorsque la Flash ne prend pas en charge le XIP, le code ne peut pas effacer ni programmer la même Flash depuis laquelle il s'exécute. Placez le code du pilote Flash en SRAM. Le fragment de script d'édition de liens Keil du guide d'origine réserve 64 KB à `0x200E1000` :

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

L'exemple source de lecture/écriture contient un tampon de données non initialisé et une séquence de nettoyage incorrecte ; il ne doit donc pas être exécuté tel quel. L'exemple NOR Flash adapté reçoit l'adresse de test en paramètre et ne suppose pas d'adresse fixe dans le produit.

!!! warning "L'effacement de la Flash est destructif"
    N'exécutez ce test que dans une zone NOR dédiée, effaçable et réservée aux essais. Réglez `TEST_SIZE` sur la granularité d'effacement requise par le composant et le pilote, réservez au moins une unité d'effacement complète et respectez l'alignement de l'adresse et de la longueur. Ne ciblez pas la configuration de démarrage, les données de calibration, les images firmware/OTA, un système de fichiers ni les données utilisateur. Cet exemple ne s'applique pas à la NAND, qui nécessite également une gestion des blocs défectueux, de l'ECC, de l'OOB et des contraintes de pages/blocs propres au composant et au pilote.

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

## Utiliser la Flash via le MTD de RT-Thread { #5-use-flash-through-rt-thread-mtd }

RT-Thread fournit des pilotes de périphériques MTD-NOR et MTD-NAND. Lorsque les options MTD et système de fichiers sont activées dans la configuration, les périphériques sont enregistrés au démarrage. Interrogez un contrôleur avec `rt_device_find("flash1")` ; les noms de contrôleur sont `flash1`, `flash2` et `flash3` (et le nom de périphérique correspondant pour chaque contrôleur activé). Un résultat non nul indique un enregistrement réussi.

Le MTD est utilisé par les systèmes de fichiers et le stockage USB. Le code applicatif recherche normalement le périphérique et s'y associe ; la couche MTD NOR encapsule les opérations de lecture/écriture. Si vous enregistrez vous-même un périphérique, implémentez la table d'opérations présentée ci-dessous.

### Structure du périphérique MTD-NOR { #mtd-nor-types }

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

### Structure du périphérique MTD-NAND { #mtd-nand-types }

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

L'exemple de système de fichiers NOR du guide SF32LB56x enregistre `flash1`, le recherche, le formate avec Elm, puis le monte. Vérifiez les noms de contrôleur et les régions du système de fichiers pour la famille cible :

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

## Réserver des zones et examiner la disposition Flash actuelle { #6-reserve-and-review-the-current-flash-layout }

Le [guide d'utilisation de la mémoire SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/memory_usage.html) décrit cette disposition QSPI1 par défaut : la zone de 64 KB comprise entre `0x10000000` et `0x1000FFFF` contient la table de configuration Flash, la table d'étalonnage et une zone réservée. Les 64 KB suivants, de `0x10010000` à `0x1001FFFF`, sont réservés au correctif de la ROM de démarrage ; le code utilisateur commence à `0x10020000`. Si `FLASH2` utilise une Flash NOR, les ressources d'image débutent à `0x64000000`. FlashDB (ou EasyFlash) utilise également des portions de `flash1` et `flash2` pour les variables et les journaux ; réaffectez ces régions et redéfinissez leur découpage selon les besoins du système.

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

Traitez ces adresses comme la disposition par défaut du guide d'origine, et non comme un plan de partition universel. Comparez-les avec le script d'édition de liens cible, le bootloader, le plan OTA, les plages du système de fichiers et la capacité Flash réelle avant d'allouer les données produit.

## Ajouter la prise en charge d'une mémoire NOR Flash { #7-port-a-nor-flash-part }

Les cartes peuvent utiliser différentes puces Flash NOR. Pour intégrer une puce, vérifiez à la fois ses caractéristiques matérielles et ses commandes d'exploitation.

### Exigences matérielles { #hardware-requirements }

Vérifiez :

- la tension d'alimentation : 3,3 V ou 1,8 V ;
- si la puce prend en charge le SPI simple, double et quadruple ligne ;
- la fréquence maximale dans chaque mode de ligne ; et
- tout autre détail requis par la conception matérielle. Le guide d'origine précise que la température de fonctionnement et la vitesse d'effacement/programmation ne sont pas nécessaires pour vérifier la compatibilité du portage logiciel à ce stade.

### Commandes d'exploitation { #operation-commands }

Les commandes de lecture, d'écriture et d'effacement varient selon le fournisseur et la puce. Comparez la fiche technique de la puce avec les identifiants de commande dans `bf0_hal_qspi.h` et ajoutez une table de commandes dans `flash_table.c` lorsque la table existante ne correspond pas.

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

Le SDK contient déjà `flash_cmd_table_list`. Une puce peut utiliser une table existante si ses commandes correspondent entièrement ; sinon, ajoutez une nouvelle table. La configuration de la table est :

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

Ici, `cmd` est l'identifiant de commande (`0x06` pour l'activation en écriture et `0x05` pour la lecture du statut dans les exemples du guide d'origine). `func_mode` sélectionne la lecture ou l'écriture ; `data_mode` sélectionne l'absence de données ou leur transfert sur une, deux ou quatre lignes ; `dummy_cycle` décrit les cycles d'horloge entre la commande et l'adresse/les données ; `ab_size` et `ab_mode` décrivent les octets alternatifs ; `addr_size` et `addr_mode` décrivent la longueur de l'adresse et le mode de ligne ; `cmd_mode` indique si la commande elle-même est envoyée sur une, deux ou quatre lignes.

## Ajouter la prise en charge d'une mémoire NAND Flash { #8-port-a-nand-flash-part }

Le portage NAND suit le même processus que le portage NOR, mais le jeu de commandes et les contraintes temporelles diffèrent selon la puce. Établissez la séquence requise à partir de sa fiche technique. Certaines puces exigent une séquence temporelle différente pour lire l'ID ; si la séquence par défaut ne permet pas de lire l'ID correct, modifiez son implémentation ou configurez explicitement l'ID correct afin que la nouvelle table de commandes puisse être sélectionnée.

## Ajouter la prise en charge de la PSRAM { #9-port-psram }

Le guide d'origine documente la prise en charge de la PSRAM APM en modes 4 lignes, 8 lignes et 16 lignes, pour des capacités de 4 MB à 32 MB :

- SF32LB55x ne prend en charge que la PSRAM 4 lignes.
- SF32LB58x prend en charge la PSRAM 4 lignes, 8 lignes et 16 lignes.
- SF32LB56x prend en charge la PSRAM 4 lignes et 8 lignes.

Utilisez les réglages de mode MPI/QSPI et de taille mémoire correspondant au boîtier, au câblage de la carte et à la puce PSRAM.

## Utiliser le DSK J-Link et l'Open Flashloader { #10-use-j-link-dsk-and-open-flashloader }

Le répertoire `tools/flash/jlink_drv` du SDK contient le paquet statique Device Support Kit (DSK) de SiFli pour J-Link. Le fichier `JLinkDevices.xml` à la racine décrit les relations entre le composant, la banque Flash et le chargeur Flash ; les fichiers ELF présents dans ses sous-répertoires sont les algorithmes Open Flashloader.

Installez J-Link V7.62 ou une version ultérieure, puis copiez l'intégralité du répertoire `tools/flash/jlink_drv` dans le répertoire `JLinkDevices\SiFli` de l'utilisateur courant. Sous Windows, le chemin par défaut est `C:\Users\<user>\AppData\Roaming\SEGGER\JLinkDevices\SiFli`.

Gardez ces règles synchronisées avec le projet de carte :

- Depuis J-Link V7.62, tous les fichiers `*.xml` sous `JLinkDevices` sont analysés récursivement ; il n'est donc pas nécessaire de modifier le fichier `JLinkDevices.xml` de l'installation J-Link.
- Les chemins des chargeurs Flash dans le XML sont résolus par rapport à `JLinkDevices.xml` ; copiez le répertoire complet, pas seulement les fichiers ELF sélectionnés.
- Le composant sélectionné doit correspondre à `JLINK_DEVICE` dans `rtconfig.py`, par exemple `SF32LB56X`, `SF32LB56X_NAND` ou `SF32LB52X_NOR`.
- Un `FlashBankInfo` peut contenir plusieurs entrées `LoaderInfo`. J-Link utilise le premier chargeur Flash par défaut. Sélectionnez explicitement un autre chargeur avec `_device "<DeviceName>?BankAddr=<FlashBankBase>&Loader=<LoaderName>"_` ou en appelant `_JLINK_ExecCommand("DEVICE_SelectLoader BankAddr=<FlashBankBase> Loader=<LoaderName>");_` depuis un script J-Link.
- Les noms de composant sans suffixe tels que `SF32LB52X`, `SF32LB55X`, `SF32LB56X` et `SF32LB58X` incluent désormais les informations complètes sur les banques et les chargeurs Flash, avec une préférence pour le chargeur NOR. Les noms suffixés restent disponibles pour la compatibilité avec les scripts existants.

## Liste de contrôle d'intégration { #integration-checklist }

Avant d'utiliser une Flash externe dans un produit, consignez :

1. la famille SF32 exacte, le boîtier, la puce Flash, la tension et les modes de ligne pris en charge ;
2. le contrôleur QSPI/MPI, le mode, le DMA, la taille mémoire, l'ID du composant et les réglages MTD/système de fichiers ;
3. la fenêtre d'adressage sélectionnée et les régions réservées pour la table, l'étalonnage, le correctif de démarrage, l'image, les ressources, les variables, les journaux et les données du système de fichiers ;
4. l'alignement d'effacement et si le pilote s'exécute depuis la SRAM pendant la programmation/l'effacement ;
5. le nom du périphérique MTD et le point de montage du système de fichiers, le cas échéant ; et
6. le nom du composant J-Link de la carte et le chargeur Flash sélectionné.

## Pages associées { #related-pages }

- [Tables de partitions](../../../firmware-topics/partition-tables.md) — aligner les régions Flash avec la disposition de l'image et de l'OTA.
- [OTA et DFU](../../../firmware-topics/ota-dfu.md) — revoir le comportement de mise à jour avant de réserver des régions de données produit.
- [Notes d'application SiFli-SDK](../sdk-application-notes.md) — l'index complet des notes d'application.

## Source officielle { #official-source }

- [Guide d'utilisation de la Flash — Guide de programmation du SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)
- [Utilisation de la Flash sur SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/flash_usage.html)
- [Utilisation de la Flash sur SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/flash_usage.html)
- [Utilisation de la Flash sur SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/flash_usage.html)
