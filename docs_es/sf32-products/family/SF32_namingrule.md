---
icon: lucide/tags
description: "Cómo interpretar el número de pieza SF32LB5xyZxYx6: gama del producto, variante de PSRAM, encapsulado, capacidad de Flash y PSRAM integrada y rango de temperatura, con ejemplos."
tags:
  - Hardware
  - Chip
---

# Convención de nomenclatura SF32 { #sf32-naming-convention }

## Nomenclatura de chips { #chip-naming }

### Número de pieza: ***SF32LB5xyZxYx6*** { #part-number-sf32lb5xyzxyx6 }

!!! note "Nota de sintaxis"
    * La ***x*** minúscula denota un dígito numérico.
    * La ***Y*** o ***Z*** mayúscula denota un carácter alfabético.

### Prefijo: *SF32LB5xy* { #prefix-sf32lb5xy }

- **SF32** — Serie de MCU de 32 bits de SiFli
- **LB** — Identificador de línea de producto
    - **LB**: serie de microcontroladores Bluetooth de bajo consumo
- **5** — Familia de procesadores
    - **5**: dispositivos basados en un procesador Arm Cortex-M33 STAR-MC1 de 32 bits o en un procesador RISC-V de rendimiento comparable
- **x** — Nivel de producto
    - **8 / 7**: configuración con dos procesadores de aplicación y uno de bajo consumo; el posicionamiento depende de la familia.
    - **6 / 5**: gama media (***un*** procesador de aplicación, ***un*** procesador de bajo consumo)
    - **2**: optimizado para reducir costes (***un*** procesador de aplicación y un controlador Bluetooth de bajo consumo ***dedicado***)
- **y** — Variante de dispositivo
    - Su valor suele reflejar la capacidad de PSRAM integrada en el encapsulado; la correspondencia exacta varía según la subfamilia.

### Sufijo: *ZxYx6* { #suffix-zxyx6 }
- **Z** — Tipo de encapsulado
    - **U**: QFN68
    - **V**: BGA
    - **Y**: QFN80
- **xYx** — Configuración de memoria integrada (Flash QSPI-NOR y PSRAM)
  *(Nota: la correspondencia exacta entre códigos y configuraciones depende del encapsulado y de la familia del dispositivo)*

`ZxYx6` es un patrón general de la familia, no una plantilla de longitud fija. La cantidad y el orden de los códigos de memoria varían según la familia del dispositivo y el encapsulado: el código numérico de Flash puede omitirse y el código alfabético de PSRAM puede repetirse cuando hay varios dispositivos integrados. Decodifique cada referencia exacta con la tabla de variantes de su familia.
<div align="center"><em>Definiciones de campo del sufijo del número de pieza</em></div>

<div align="center" markdown>

| Campo | Tipo | Opciones | Descripción |
| :--- | :--- | :--- | :--- |
| **x** | Numérico | **1** a **6** | Mapeo genérico de capacidad de Flash QSPI-NOR:<br>• **1**: 2 Mb<br>• **2**: 4 Mb<br>• **3**: 8 Mb<br>• **4**: 16 Mb<br>• **5**: 32 Mb<br>• **6**: 64 Mb<br>SF32LB57x también usa los códigos **7** y **8**; consulte el mapeo específico de esa familia más abajo. |
| **Y** | Alfabético | **A** a **E** | Capacidad e interfaz de PSRAM integrada:<br>• **A**: 16 Mb QPI-PSRAM<br>• **B**: 32 Mb OPI-PSRAM<br>• **C**: 64 Mb OPI-PSRAM<br>• **D**: 128 Mb OPI/HPI-PSRAM<br>• **E**: 256 Mb HPI-PSRAM |

</div>

- **6** — Grado de temperatura de funcionamiento
    - **5**: de −20 °C a +70 °C (grado comercial)
    - **6**: de −40 °C a +85 °C (grado industrial)

### Códigos de memoria específicos de SF32LB57x { #sf32lb57x-memory-codes }

El diagrama de numeración de piezas de la guía de diseño de hardware de SF32LB57x muestra tres códigos de posición de memoria después del código de encapsulado, en el orden MPI1, MPI2 y MPI3; a continuación aparece el código de grado de temperatura. Los códigos específicos de esta familia para cada posición MPI son:

<div align="center"><em>Tabla: códigos de memoria por posición MPI de SF32LB57x</em></div>

<div align="center" markdown>

| Código | Significado en la posición MPI correspondiente de SF32LB57x |
|:-----|:-------------------------------------------------------------|
| `N` | Sin memoria integrada en el encapsulado |
| `B` | PSRAM de 32 Mb |
| `C` | PSRAM de 64 Mb |
| `D` | PSRAM de 128 Mb |
| `E` | PSRAM de 256 Mb |
| `2` | Flash NOR de 4 Mb |
| `3` | Flash NOR de 8 Mb |
| `4` | Flash NOR de 16 Mb |
| `5` | Flash NOR de 32 Mb |
| `6` | Flash NOR de 64 Mb |
| `7` | Flash NOR de 128 Mb |
| `8` | Flash NOR de 256 Mb |

</div>

Este mapeo es específico de SF32LB57x. Compruebe el código completo en la tabla de variantes exacta; el mapeo no implica que todas las combinaciones sean referencias comerciales disponibles.

### Ejemplos de números de pieza { #part-number-examples }

#### Ejemplo 1: SF32LB527UD6 { #example-1-sf32lb527ud6 }
Configuración de MCU optimizada para reducir costes de la **serie SF32LB52**:

* **Configuración del procesador:** un procesador de aplicación y un procesador dedicado al control Bluetooth de bajo consumo (basado en Arm Cortex-M33 STAR-MC1).
* **Tipo de encapsulado:** encapsulado QFN68 (**U**).
* **Configuración de memoria:** 128 Mb de OPI-PSRAM integrada (**D**).
* **Temperatura de operación:** de −40 °C a +85 °C (**6**, grado industrial).

#### Ejemplo 2: SF32LB587VEE56 { #example-2-sf32lb587vee56 }
Configuración de MCU de gama alta de la **serie SF32LB58**:

* **Configuración del procesador:** dos procesadores de aplicación y uno de bajo consumo, basados en Arm Cortex-M33 STAR-MC1.
* **Tipo de encapsulado:** encapsulado BGA256 (**V**).
* **Configuración de memoria:** dos HPI-PSRAM integradas de 256 Mb cada una (**E**) y Flash QSPI-NOR de 32 Mb (**5**).
* **Temperatura de operación:** de −40 °C a +85 °C (**6**, grado industrial).

#### Ejemplo 3: SF32LB57GVD776 { #example-3-sf32lb57gvd776 }

La tabla de variantes de SF32LB57x identifica esta referencia como BGA112. Sus tres códigos de posición de memoria son `D/7/7`: MPI1 lleva una PSRAM de 128 Mb, y MPI2 y MPI3 llevan cada uno una Flash NOR de 128 Mb. El `6` final indica el grado industrial de temperatura. Por tanto, el segundo `7` de `776` identifica la Flash NOR de MPI3. Consulte la [descripción general de la familia SF32](SF32_family.md) para conocer la implicación de GPIO en BGA112.

#### Ejemplo 4: SF32LB57ZVN7N6 { #example-4-sf32lb57zvn7n6 }

La tabla de variantes de SF32LB57x identifica esta referencia como BGA112. Sus códigos de posición de memoria son `N/7/N`: no hay memoria integrada en MPI1, MPI2 lleva una Flash NOR de 128 Mb y MPI3 no lleva memoria integrada. El `6` final indica el grado industrial de temperatura. La descripción general de la familia explica por qué `58 + 6` no significa 64 GPIO de asignación libre.

### Excepciones de sufijo heredado de 55x { #legacy-55x-suffix-exceptions }

La familia SF32LB55x se definió antes de establecerse el patrón de nomenclatura actual, por lo que algunas referencias conservan formatos de sufijo heredados. Estas tres referencias no se pueden decodificar por completo con el patrón `SF32LB5xyZxYx6` descrito arriba: `SF32LB551U4O5`, `SF32LB555V4O6` y `SF32LB555V436`. Confirme el encapsulado y la configuración de memoria en la tabla de variantes 55x y la hoja de datos de cada referencia; no deduzca los campos a partir del patrón general. `SF32LB557VD3A6` sí sigue la convención actual y no es una excepción heredada.

## Nomenclatura de módulos { #module-naming }

### Número de pieza: ***SF32LB5x-MOD-y-AaaaBbbbCccc*** { #part-number-sf32lb5x-mod-y-aaaabbbbcccc }

!!! note "Nota de sintaxis"
    * En el sufijo genérico, `A`, `B` y `C` identifican las tres posiciones de campo de almacenamiento; no son caracteres literales en cada nombre de módulo.
    * El primer carácter dentro de cada campo poblado identifica el tipo de almacenamiento. Los dígitos restantes identifican su capacidad o configuración.
    * El campo de subtipo `-y` actualmente solo se utiliza en la familia de módulos SF32LB52. Los nombres publicados de SF32LB56-MOD y SF32LB58-MOD no lo incluyen.

### Prefijo: *SF32LB5x-MOD-y* { #prefix-sf32lb5x-mod-y }

- **SF32LB5x** — Familia de MCU del módulo
    - **SF32**, **LB** y **5** siguen los mismos significados de serie, línea de producto y familia de procesador que la convención de nomenclatura de chips anterior.
    - **x** identifica el nivel de producto: **8 / 7** tiene dos procesadores de aplicación y uno de bajo consumo, con un posicionamiento que depende de la familia; **6 / 5** es de gama media; **2** está optimizado para reducir costes.
- **MOD** — Producto de módulo SiFli.
- **y** — Subtipo de módulo, cuando la familia define uno
    - **1**: alimentación directa desde una batería Li-ion para los dispositivos SF32LB520/3/5/7. El rango de tensión de alimentación del chip es de 3,2 a 4,7 V. La configuración estándar utiliza el SF32LB525UC6, con 8 MB de OPI-PSRAM.
    - **A**: funcionamiento estándar a 3,3 V para la familia SF32LB52B; no admite alimentación directa desde una batería Li-ion. El rango de tensión de alimentación del chip es de 2,97 a 3,63 V. La configuración estándar utiliza el SF32LB52BU36, con 1 MB de Flash QSPI-NOR integrada.
    - **B**: funcionamiento estándar a 3,3 V para la familia 52E/52G/52J; no admite alimentación directa desde una batería Li-ion. El rango de tensión de alimentación del chip es de 2,97 a 3,63 V. La configuración estándar utiliza el SF32LB52EUB6, con 4 MB de OPI-PSRAM integrada.

El módulo `-A` no incorpora Flash NOR externa. Admite la conexión de una Flash NOR externa o de periféricos SDIO, como Wi-Fi, SD-NAND y eMMC en modo de 4 bits.

### Sufijo: *AaaaBbbbCccc* { #suffix-aaaabbbbcccc }

<div align="center"><em>Definiciones de campo del sufijo del número de pieza del módulo</em></div>

<div align="center" markdown>

| Campo | Código de tipo de almacenamiento | Capacidad, configuración y sufijo |
| :--- | :--- | :--- |
| `Aaaa`<br>Flash variable | `N`: Flash QSPI-NOR<br>`A`: Flash NAND (la interfaz depende de la familia del módulo)<br>`D`: Flash SD-NAND<br>`E`: eMMC | `N16`: 16 MB de Flash QSPI-NOR<br>`A128`: 128 MB de SPI-NAND en SF32LB52-MOD-1; 128 MB de QSPI-NAND en SF32LB56-MOD y SF32LB58-MOD<br>`D128`: 128 MB de SD-NAND en SF32LB56-MOD<br>`E4`: 4 GB de eMMC en SF32LB58-MOD |
| `Bbbb`<br>PSRAM | `R`: PSRAM | `R4`: 4 MB OPI-PSRAM<br>`R8`: 8 MB OPI-PSRAM<br>`R12`: 4 MB + 8 MB OPI-PSRAM<br>`R16`: 16 MB OPI/HPI-PSRAM<br>`R32`: 16 MB + 16 MB HPI-PSRAM<br>`R64`: 32 MB + 32 MB HPI-PSRAM |
| `Cccc`<br>Flash estándar | `N`: Flash QSPI-NOR | `N1`: 1 MB de Flash QSPI-NOR<br>`N4`: 4 MB de Flash QSPI-NOR |

</div>

Los tres campos del sufijo se concatenan sin separadores. `Aaaa` indica la opción de Flash variable, `Bbbb` la opción de PSRAM y `Cccc` la Flash estándar. La guía de SiFli define las combinaciones de tipo y capacidad que aparecen en la tabla; no dé por sentado que cualquier tipo puede combinarse con cualquier capacidad. Un campo solo aparece cuando se utiliza en la configuración documentada del módulo.

### Ejemplos de números de pieza { #part-number-examples_1 }

#### Ejemplo 1: SF32LB52-MOD-1-N16R8 { #example-1-sf32lb52-mod-1-n16r8 }

**Configuración del módulo SF32LB52 para batería Li-ion:**

* **Subtipo de módulo:** `-1` indica alimentación directa por batería Li-ion. El rango de tensión de alimentación del chip es de 3,2 a 4,7 V.
* **Flash variable:** `N16` indica 16 MB de Flash QSPI-NOR.
* **PSRAM:** `R8` indica 8 MB de OPI-PSRAM.

#### Ejemplo 2: SF32LB58-MOD-A128R32N1 { #example-2-sf32lb58-mod-a128r32n1 }

**Configuración de módulo de gama alta SF32LB58:**

* **Subtipo de módulo:** no se usa subtipo `-y` para los nombres publicados de SF32LB58-MOD.
* **Flash variable:** en esta configuración SF32LB58-MOD, `A128` indica 128 MB de Flash QSPI-NAND.
* **PSRAM:** `R32` indica 16 MB + 16 MB de HPI-PSRAM.
* **Flash estándar:** `N1` indica 1 MB de Flash QSPI-NOR.

El patrón de nomenclatura describe una configuración; no implica que todas las combinaciones de códigos correspondan a un SKU comercializado. La guía de SiFli identifica SF32LB566VCB36 y SF32LB586VDD36 como configuraciones estándar de MCU para las familias SF32LB56-MOD y SF32LB58-MOD, respectivamente; también pueden personalizarse otras configuraciones de módulo. Confirme la disponibilidad, el MCU instalado, la asignación de pines y las especificaciones eléctricas en la documentación del módulo correspondiente.

[Guía de modelos de chips de SiFli](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) · [Guía de modelos de módulos de SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)
