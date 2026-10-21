---
icon: lucide/table-properties
description: "Use las tablas de particiones de SiFli-SDK para describir la memoria SF32: formatos JSON v1/v2, formato YAML v3 recomendado, overlays, archivos generados y validación."
tags:
    - Desarrollo
    - Particiones
---

# Tablas de particiones { #partition-tables }

La herramienta de compilación `partition_table` de SiFli-SDK lee la descripción de particiones de una placa y genera `ptab.h`, que contiene las macros de partición que usa la aplicación. La tabla describe la distribución de direcciones de todas las memorias pertinentes, incluidas NOR Flash, NAND Flash, eMMC, tarjetas SD, PSRAM y SRAM integrada en el chip.

Cada placa tiene una distribución predeterminada, que siguen todas las aplicaciones compiladas para ella. Un proyecto también puede proporcionar su propia configuración de tabla de particiones para sustituir la predeterminada de la placa.

## Habilitar las tablas de particiones { #enable-partition-tables }

Active «Usar la tabla de particiones para administrar toda la distribución de memoria» (**Use partition table to manage all memory layout**) en la configuración del middleware. El proyecto también necesita el siguiente ajuste en `Kconfig.proj`; los ejemplos de SiFli-SDK ya lo incluyen.

```kconfig
# APP-specific configuration.
config CUSTOM_MEM_MAP
    bool
    select custom_mem_map
    default y if !SOC_SIMULATOR
```

## Elegir un formato { #choose-a-format }

SiFli-SDK admite tres formatos de tabla de particiones. Para proyectos nuevos, use v3 salvo que una placa o un producto existente necesite conservar su configuración v1/v2.

<div align="center"><em>Tabla: formatos de tabla de particiones de SiFli-SDK</em></div>
<div align="center" markdown>

| Formato | Archivo de descripción | Modelo principal | ¿Usar en proyectos nuevos? |
| --- | --- | --- | --- |
| v1 | `ptab.json` | Lista de memorias en JSON, etiquetas y metadatos opcionales `ftab`, `img` y `exec` | No; solo para mantener proyectos heredados. |
| v2 | `ptab.json` | Lista de memorias en JSON con particiones de imagen y ejecución con nombre y tipo | No; conservar si una placa existente depende de él. |
| v3 | `ptab.yaml` | Particiones YAML con `type`, `subtype`, `region`, `exec`, macros generadas y overlays del proyecto | Sí. |

</div>

El sistema de compilación busca primero `ptab.yaml` (v3) y, si no lo encuentra, recurre a `ptab.json` (v1/v2). El orden de búsqueda es: directorio de la placa, directorio del chip, raíz de BSP y `customer/boards/<board>/`.

## v1: etiquetas JSON y metadatos de imagen { #v1-json-tags-and-image-metadata }

v1 usa una matriz JSON en `ptab.json`. No tiene un campo de versión dedicado, pero puede comenzar opcionalmente con un elemento de encabezado que contenga `"version": "1"`.

Cada entrada de memoria define:

- `mem`: nombre de la memoria, como `flash2` o `psram1`.
- `base`: dirección base hexadecimal de la memoria; compruébela con el mapa de memoria de destino.
- `regions`: lista de particiones de esa memoria.

Cada región usa `offset` y `max_size`, expresados en bytes. La lista `tags` genera macros de partición. Por ejemplo, `FLASH_BOOT_LOADER` genera `FLASH_BOOT_LOADER_START_ADDR`, `FLASH_BOOT_LOADER_OFFSET` y `FLASH_BOOT_LOADER_SIZE`; la dirección inicial es la suma de `base` de la memoria y `offset` de la región.

<div align="center"><em>Tabla: metadatos opcionales de región en v1</em></div>
<div align="center" markdown>

| Campo | Propósito |
| --- | --- |
| `ftab` | Describe una entrada de Flash Table. |
| `img` | Asigna el nombre de la imagen de la partición que usarán los scripts de grabación generados. Si el proyecto genera varios binarios, use `proj_name:binary_name`. |
| `exec` | Identifica el programa ejecutable para que los scripts compartidos del enlazador puedan seleccionar su dirección de código. |
| `custom` | Añade macros personalizadas de valor entero a `ptab.h`, que se genera. |

</div>

Para PSRAM, la fuente distingue los espacios de direcciones CBUS y SBUS. Asigne `exec` a la partición CBUS para que el código use la dirección de ejecución; coloque una dirección `xip` de `ftab` en la partición SBUS cuando esa dirección se use para copiar código.

## v2: particiones JSON con nombre y tipo { #v2-named-and-typed-json-partitions }

v2 también usa `ptab.json`, pero el encabezado debe declarar `"version": "2"`. Los campos de memoria siguen siendo `mem`, `base` y `regions`. Cada región conserva `offset` y `max_size`, y puede usar `tags` y `custom`; además, v2 asigna a la región un `name`, un `type` y, en una partición de ejecución, un `core` opcional.

<div align="center"><em>Tabla: campos y tipos de región en v2</em></div>
<div align="center" markdown>

| Campo o tipo | Significado |
| --- | --- |
| `name` | Nombre de la partición. El nombre de una imagen de programa debe coincidir con el nombre del programa correspondiente o de `AddCustomImg`. Un programa con varios archivos puede usar `proj_name:1`, `proj_name:2`, etc. |
| `core` | Núcleo que ejecuta una partición `app_exec`: `hcpu`, `lcpu` o `acpu`. |
| `app_img` | Partición primaria donde se almacena la imagen del programa; se graba con la herramienta de grabación. |
| `app_img2` | Partición de respaldo de la imagen de programa, normalmente emparejada con una partición primaria para las actualizaciones. |
| `app_exec` | Espacio de direcciones desde el que se ejecuta el programa. |

</div>

`bootloader`, `main`, `dfu` y `ftab` son nombres reservados. Los demás nombres de programa se pueden usar para imágenes definidas por el usuario, como `acpu`. Si la tabla no define las particiones `ftab` y `bootloader`, la herramienta genera una configuración predeterminada; inspeccione el `ptab.h` generado antes de depender de ella.

## v3: particiones YAML y overlays { #v3-yaml-partitions-and-overlays }

v3 usa `ptab.yaml` y es el formato recomendado. Con este formato, el modelo heredado basado en `tags` da paso a los campos explícitos `type` y `subtype`; las particiones se desacoplan de la topología física mediante nombres lógicos `region`, y durante la compilación se generan `ptab.h`, `ftab.bin` y fragmentos para los scripts del enlazador.

<div align="center"><em>Tabla: campos de nivel superior y de partición en v3</em></div>
<div align="center" markdown>

| Ámbito | Campo | Obligatorio | Significado |
| --- | --- | --- | --- |
| Nivel superior | `version` | Sí | Debe ser `3`. |
| Nivel superior | `chip` | Sí | Número de parte del chip, como `SF32LB525UC6`. |
| Nivel superior | `memory` | No | Definiciones de almacenamiento externo. |
| Nivel superior | `partitions` | Sí | Lista de particiones. |
| Partición | `name`, `type`, `region`, `offset`, `size` | Sí | Nombre, tipo, región lógica de almacenamiento y ubicación. `offset` y `size` admiten el prefijo `0x` o los sufijos `KB`/`MB`. |
| Partición | `subtype`, `exec`, `core`, `attrs` | No | Subtipo, ubicación de ejecución para código que no se ejecuta en XiP, núcleo de destino y atributos personalizados. |

</div>

Cada definición de `memory` externa especifica una interfaz `mpi` o `sdmmc`, un `type` (`nand`, `nor` o `sd`) y un tamaño. `region` puede hacer referencia a esas memorias externas, a `hpsys_ram` o a `lpsys_ram`.

Cada `region` se asigna a una dirección de almacenamiento SBUS y a una dirección CBUS para ejecución de CPU o XiP. El SDK obtiene esta asignación de los datos SiliconSchema del chip. En `FAL_PART_TABLE`, el nombre del dispositivo depende de la `region` de almacenamiento de la partición, no de `exec`: `mpi1` a `mpi5` se asignan a `NOR_FLASH1_DEV_NAME` a `NOR_FLASH5_DEV_NAME`, mientras que `sdmmc1` y `sdmmc2` se asignan a `SDMMC1_DEV_NAME` y `SDMMC2_DEV_NAME`, respectivamente.

<div align="center"><em>Tabla: tipos y subtipos de partición en v3</em></div>
<div align="center" markdown>

| Tipo | Subtipo o uso | Significado |
| --- | --- | --- |
| `ftab` | — | Partición de Flash Table. |
| `bootloader` | — | Partición del cargador de arranque. |
| `app` | `factory` | Aplicación principal de fábrica; genera `CODE_START_ADDR` y `CODE_SIZE`. |
| `app` | `dfu` | Aplicación DFU independiente. |
| `app` | `ex` | Partición de recursos. La compilación genera salidas de imagen de recursos específicas de la cadena de herramientas. |
| `data` | `flashdb_kv` | Base de datos KV de FlashDB; genera macros `KVDB_*` y participa en `FAL_PART_TABLE`. |
| `data` | `filesystem`, `littlefs`, `fat` o `fatfs` | La documentación indica que `filesystem` genera macros `FS_REGION_*` y participa en `FAL_PART_TABLE`. En otra sección también enumera `littlefs`, `fat` y `fatfs` como subtipos que generan esas macros, aunque afirma que actualmente no tienen efecto; verifique el comportamiento de estos tres subtipos para la versión del SDK de destino. Esa misma sección de macros también emplea el subtipo `flashdb`, mientras que la tabla de subtipos y las reglas de FAL usan `flashdb_kv`; no los trate como alias sin comprobarlo en el SDK de destino. |
| `data` | `ram`, `calibration`, `raw` o `int_res` | RAM, datos de calibración, datos sin formato gestionados por la aplicación o datos de recursos internos enlazados al ELF y divididos por nombre de sección. |

</div>

La `FAL_PART_TABLE` generada por v3 incluye únicamente `data/flashdb_kv`, `data/filesystem` y las particiones `app` cuyo subtipo no sea `ex`. Excluye `ftab`, `bootloader`, `app/ex` y los demás subtipos de `data`, incluidos `littlefs`, `fat`, `fatfs`, `raw`, `ram`, `calibration` e `int_res`. Las entradas generadas usan el `name` de cada partición; los alias de diseños anteriores, como `main`, `dfu_code` y `fs_root`, no se asignan como nombres de partición. Al migrar a v3, no defina `FAL_PART_TABLE` manualmente; si existe un `custom_mem_map.h` en el nivel de placa, elimínelo para evitar una advertencia de redefinición.

Para cada partición, `ptab.h` genera las macros `<NAME>_START_ADDR`, `<NAME>_SIZE` y `<NAME>_OFFSET`, donde `<NAME>` es el nombre de la partición en mayúsculas. Si el SDK reconoce el tipo de memoria de la región, también genera `<NAME>_MEM_TYPE`. En una partición `app/factory`, `CODE_START_ADDR` usa la dirección de `exec` si se ha especificado; de lo contrario, usa la dirección CBUS de la partición.

Use `exec: {region, offset}` cuando el código no se pueda ejecutar en el lugar, por ejemplo, si una aplicación se almacena en NAND Flash y se copia a PSRAM. Sin `exec`, la dirección inicial de código generada usa la dirección de almacenamiento CBUS de la partición. `attrs` añade macros personalizadas a `ptab.h`.

### Valores predeterminados y overlays del proyecto { #defaults-and-project-overlays }

v3 deriva valores predeterminados del sistema cuando faltan las particiones correspondientes. Para SF32LB52, `flash_table` y `bootloader` se pueden inferir de la región de almacenamiento de la aplicación de fábrica HCPU; si se usa NAND o SDMMC como almacenamiento de arranque, también se generan las particiones de datos predeterminadas documentadas. Para SF32LB56 y SF32LB58, se pueden omitir `flash_table` y `bootloader` en `mpi5` interno. También se pueden omitir las ventanas predeterminadas de SiP PSRAM y las particiones de RAM estándar, salvo que el proyecto cambie la distribución de RAM.

Para un cambio pequeño y específico del proyecto, use `ptab.overlay.yaml` en vez de copiar todo el `ptab.yaml` de la placa. Permite añadir una partición o modificar una existente:

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

El overlay de la placa tiene prioridad sobre el del chip. Solo puede modificar particiones: no puede cambiar `memory`, `chip` ni `version`, ni eliminar particiones. Se aplica únicamente a un `ptab.yaml` v3 de nivel de placa y no puede combinarse con un `ptab.yaml` o `ptab.json` de proyecto completo. Si la placa aún usa `ptab.json` (v1/v2) y no se selecciona ningún `ptab.yaml` completo, el sistema ignora el overlay, muestra una advertencia y continúa por la ruta sin overlay. En ese caso no genera `ptab.effective.yaml`. Cuando sí se aplica, la compilación escribe el resultado en `ptab.effective.yaml` para que se pueda inspeccionar.

## Archivos generados y validación { #generated-files-and-validation }

<div align="center"><em>Tabla: resultados de compilación de la tabla de particiones</em></div>
<div align="center" markdown>

| Salida | Propósito |
| --- | --- |
| `ptab.h` | Encabezado C generado que contiene macros de partición. |
| `ftab.bin` | Tabla Flash binaria que usa el cargador de arranque. En v3 se genera directamente con Python, sin un subproyecto `ftab`. |
| `link_copy.lds` / `link_copy.sct` | Copias generadas de los scripts del enlazador para GCC o Keil. v3 usa plantillas Jinja2. |
| `ptab.effective.yaml` | Tabla v3 final tras procesar el overlay, si hay uno activo. |

</div>

Valide una tabla v3 de placa antes de integrarla:

```bash
python tools/build/validate_ptab_v3.py customer/boards/<board>/ptab.yaml
```

El validador comprueba la sintaxis de los nombres de partición, los tipos y subtipos válidos, las regiones válidas, el solapamiento de particiones y que el cargador de arranque sea único. Para inspeccionar la configuración v3 efectiva que utiliza la compilación, ejecute:

```bash
sdk.py ptab-export --board=<board-name>
sdk.py ptab-export --board=<board-name> --output /tmp/ptab.effective.yaml
sdk.py ptab-export --strict
```

## Inspeccionar la Flash Table generada { #inspect-the-generated-flash-table }

Después de compilar, `ftab.bin` se coloca en el directorio de compilación. Inicialice el entorno del SDK y luego inspeccione el primer `build_*/ftab.bin` que se encuentre en el proyecto actual:

```bash
source ./export.sh
sdk.py ftab-dump
```

En Windows PowerShell, inicialice el entorno con `./export.ps1`. Si el proyecto tiene varios directorios de compilación para distintas placas, especifique la ruta; use la salida JSON cuando un script vaya a procesar el resultado:

```bash
sdk.py ftab-dump --path build_<board_name>/ftab.bin
sdk.py ftab-dump --path build_<board_name>/ftab.bin --format json
```

La tabla muestra las entradas de partición, las descripciones de imagen que usan los flujos DFU y de arranque, y los punteros a las imágenes activas de HCPU, LCPU, el cargador de arranque y las imágenes de arranque.

## Revisión del producto { #product-review }

- [ ] Se ha elegido intencionadamente la tabla de la placa o una configuración explícita del proyecto.
- [ ] La sintaxis v1, v2 o v3 seleccionada coincide con el archivo que encuentra realmente el sistema de compilación.
- [ ] Las ubicaciones de almacenamiento y ejecución de las imágenes son correctas, sobre todo para almacenamiento que no sea XiP y para PSRAM.
- [ ] Las particiones de aplicación, respaldo, DFU, sistema de archivos, calibración y datos gestionados por la aplicación tienen capacidad suficiente y no se solapan.
- [ ] Se han inspeccionado `ptab.h`, `ftab.bin` y, para overlays v3, `ptab.effective.yaml`.
- [ ] Se ha documentado un procedimiento de grabación para recuperación, separado de la ruta normal de actualización.

Para ver las referencias completas de las fuentes, consulte la documentación oficial de SiFli-SDK sobre [tablas de particiones](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table.html), [v1](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v1.html), [v2](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v2.html) y [v3](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v3.html).
