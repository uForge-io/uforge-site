---
icon: lucide/book-check
description: "Guía de diseño de hardware para la MCU SF32LB56x: sistema de alimentación, generación de reloj, diseño RF, pantalla, audio y diseño de PCB."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# Guía de diseño de hardware SF32LB56x { #sf32lb56x-hardware-design-guide }

## 1. Introducción { #1-introduction }

Esta guía ofrece recomendaciones y material de referencia para desarrollar productos basados en la familia SF32LB56x, una gama de microcontroladores AIoT optimizada para el procesamiento gráfico. Está dirigida a ingenieros de hardware, diseñadores de PCB y desarrolladores de producto que trabajan en relojes inteligentes, sistemas HMI conectados, dispositivos médicos y de atención sanitaria, terminales portátiles industriales, instrumentos portátiles y pantallas avanzadas para bicicletas o patinetes eléctricos.

La guía cubre todo el proceso de desarrollo de hardware para diseños SF32LB56xU y SF32LB56xV: selección del encapsulado, alimentación del PMIC y del procesador, reinicio, modo de arranque, modos de funcionamiento, cristales, RF, pantalla, almacenamiento, audio, sensores, planificación de pines UART/I2C/GPTIM, diseño de PCB, validación y preparación para fabricación. Seguir estas recomendaciones ayuda a reducir los riesgos del esquemático y el diseño físico, proteger el comportamiento de bajo consumo y mantener visibles las diferencias entre las variantes U y V a lo largo del diseño.

Se presupone que el lector conoce los fundamentos del diseño de hardware embebido, la captura de esquemáticos y el diseño de PCB. Esta guía complementa las notas de aplicación de hardware de SF32LB56xU y SF32LB56xV, sus hojas de datos y manuales de usuario, los diseños de referencia y la lista de proveedores aprobados por SiFli. Estos documentos siguen siendo las fuentes autorizadas para consultar las especificaciones eléctricas, la multiplexación de pines, las dimensiones del encapsulado, la cualificación de componentes y los límites de producción.

## 2. Recursos de desarrollo { #2-development-resources }

[Nota de aplicación de hardware SF32LB56xU]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Nota de aplicación de hardware SF32LB56xV]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[Código fuente de la nota de aplicación de hardware SF32LB56xU]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[Código fuente de la nota de aplicación de hardware SF32LB56xV]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[Resumen de la familia SF32]: ../../sf32-products/family/SF32_family.md
[Lista de proveedores aprobados por SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Comprar muestras]: https://sifli.taobao.com/
[Comprar placas de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Nota de aplicación de hardware SF32LB56xU]__
- :fontawesome-solid-file-lines: __[Nota de aplicación de hardware SF32LB56xV]__
- :fontawesome-brands-github: __[Código fuente de la nota de aplicación de hardware SF32LB56xU]__
- :fontawesome-brands-github: __[Código fuente de la nota de aplicación de hardware SF32LB56xV]__
- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados por SiFli (AVL)]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__

</div>

## 3. Descripción del dispositivo { #3-device-overview }

### 3.1. Arquitectura { #31-architecture }

SF32LB56x está pensado para productos con pantallas e interfaces HMI más complejas que los nodos de sensores exclusivamente BLE. Las notas oficiales de hardware para U y V comparten los mismos temas de ingeniería: distribución de alimentación basada en PMIC, cristales de 48 MHz y 32,768 kHz, diseño RF, selección de interfaces de pantalla y almacenamiento, audio, pines PBR, sensores, planificación de UART/I2C/GPTIM, depuración y grabación, y calibración del cristal en producción.

### 3.2. Variantes y encapsulados { #32-variants-and-packages }

<div align="center"><em>Tabla 3.2-1: Variantes de encapsulado SF32LB56x</em></div>

<div align="center" markdown>

| Variante | Encapsulado | Dimensiones | Paso entre pines | Diámetro de las bolas |
|:---|:---|:---|:---|:---|
| SF32LB56xU | QFN68L | 7 × 7 × 0,75 mm | 0,35 mm | - |
| SF32LB56xV | WBBGA175 | 6,5 × 6,1 × 0,94 mm | 0,4 mm | 0,25 mm |

</div>

La variante U utiliza el encapsulado QFN68L. La variante V utiliza WBBGA175 y requiere una planificación más cuidadosa de la salida de pistas desde el encapsulado, las vías y el proceso HDI.

![Figura 3.2-1: Distribución de pines de SF32LB56xU QFN68L](../../sf32-products/chips/assets/56x/sf32lb56xU-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-1: Distribución de pines de SF32LB56xU QFN68L</em></div>

![Figura 3.2-2: Distribución de pines de SF32LB56xV WBBGA175](../../sf32-products/chips/assets/56x/sf32lb56xV-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-2: Distribución de pines de SF32LB56xV WBBGA175</em></div>

### 3.3. Principales características de hardware { #33-major-hardware-features }

- Distribución de alimentación centrada en PMIC, con ejemplos que utilizan SF30147C.
- Requisitos para cristales de 48 MHz y 32,768 kHz, junto con modelos recomendados.
- Requisitos de diseño RF Bluetooth y adaptación de antena.
- Pantallas SPI/QSPI y JDI en U; pantallas SPI/QSPI, MCU8080, DPI y JDI en V.
- Opciones de memoria externa y almacenamiento de arranque, incluidas interfaces de tipo SDIO/eMMC/SD NAND.
- Botones, motor de vibración, interfaz de audio, pines PBR, sensores, UART/I2C, GPTIM, depuración/grabación y calibración.

### 3.4. Aplicaciones habituales { #34-typical-applications }

![Figura 3.4-1: Diagrama de bloques de una aplicación de reloj inteligente con SF32LB56xU](../../sf32-products/chips/assets/56x/sf32lb56xU-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.4-1: Diagrama de bloques de una aplicación de reloj inteligente con SF32LB56xU</em></div>

![Figura 3.4-2: Diagrama de bloques de una aplicación de reloj inteligente con SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.4-2: Diagrama de bloques de una aplicación de reloj inteligente con SF32LB56xV</em></div>

SF32LB56x es adecuado para relojes inteligentes, paneles HMI conectados, productos sanitarios, terminales portátiles industriales, instrumentos portátiles y productos con pantallas avanzadas que necesiten Bluetooth, audio, sensores, memoria externa y una interfaz de usuario más completa.

## 4. Resumen de diseño { #4-design-at-a-glance }

### 4.1. Resumen de ingeniería { #41-engineering-summary }

<div align="center"><em>Tabla 4.1-1: Resumen de diseño de SF32LB56x</em></div>

<div align="center" markdown>

| Tema | SF32LB56xU | SF32LB56xV |
|:---|:---|:---|
| Encapsulado | QFN68L, 7 × 7 × 0,75 mm, paso de 0,35 mm | WBBGA175, 6,5 × 6,1 × 0,94 mm, paso de 0,4 mm |
| Pantalla | SPI/QSPI y JDI son las interfaces principales documentadas | Se documentan SPI/QSPI, MCU8080, DPI y JDI |
| Proceso de PCB | Trazado compacto de las pistas de QFN | Planificación BGA/HDI, revisión de vías ciegas/enterradas y control más estricto de la salida de pistas desde el encapsulado |
| Alimentación | Rieles del procesador y distribución de alimentación mediante PMIC SF30147C | Rieles del procesador y distribución de alimentación mediante PMIC SF30147C, con asignación de cargas específica para V |
| Almacenamiento | Diseño de memoria externa mediante los pines de almacenamiento documentados para SF32LB56xU | Diseño de memoria externa mediante los pines de almacenamiento documentados para SF32LB56xV |

</div>

### 4.2. Flujo de diseño de hardware { #42-hardware-design-flow }

1. Seleccione la variante U o V, el encapsulado, la interfaz de pantalla, el almacenamiento y el proceso de fabricación de PCB previsto.
2. Defina la distribución de alimentación del PMIC, las líneas de alimentación del procesador, el reinicio, la carga de batería y el control de bajo consumo.
3. Seleccione los cristales, la adaptación RF y los circuitos de pantalla, almacenamiento, audio, sensores, botones, motor y PBR.
4. Fije la asignación de pines y compruebe los conflictos entre pantalla, almacenamiento, audio, depuración, activación y funciones de producción.
5. Revise la salida de pistas desde el encapsulado y el apilado de la PCB, la impedancia, RF, relojes, USB/SDIO, audio, DC-DC y ESD.
6. Ejecute la lista de comprobación de diseño antes de cerrar el esquemático, liberar el diseño de PCB, comenzar EVT y liberar los útiles de producción.

### 4.3. Paquete de evidencias para la revisión { #43-review-evidence-pack }

Antes de EVT, archive las versiones de los documentos fuente de las variantes U y V, las versiones de la hoja de datos y del manual de usuario, el PDF del esquemático, el apilado de la PCB, la capacidad del proceso de fabricación de PCB, los informes DRC/ERC, la configuración del PMIC, el árbol de alimentación, la configuración de arranque y almacenamiento, capturas del trazado de la pantalla, del diseño RF y de los cristales, y de las rutas de audio y señales analógicas, así como el plan de grabación y calibración en producción.

### 4.4. Uso de las listas de comprobación { #using-the-checklists }

Esta guía incluye dos niveles de cobertura mediante listas de comprobación. La lista breve del apartado 7 reúne los puntos de mayor riesgo para una revisión de ingeniería rápida. La [Lista de comprobación del esquemático](SF32LB56x_schematic_checklist.md) (apartado 5.8) y el apartado 6.3 de las [Directrices de diseño de PCB](SF32LB56x_pcb_layout.md) reproducen, punto por punto, la lista completa de SiFli *SF32LB56x Schematic & PCB Checklist* (V1.0, 2026-01-21), publicada junto con los materiales de diseño de hardware en el [índice de guías de diseño de hardware para chips de la wiki de SiFli][Índice de guías de diseño de hardware para chips de SiFli (Wiki)]. Abarca las familias SF32LB56xU y SF32LB56xV, además de la variante SS6700A.

Cada punto indica los grupos de chips a los que se aplica y si es obligatorio (debe superarse antes de liberar el diseño) u opcional (recomendado cuando se utilice la función correspondiente). El texto en color y el texto con <span class="flag-yellow">fondo amarillo</span> conservan el énfasis de revisión del libro de cálculo de origen. Como este no explica el motivo de cada resaltado, considérelos indicadores adicionales de revisión, no sustitutos de otros puntos de la misma tabla que no estén resaltados.

Use la [Lista de comprobación del esquemático](SF32LB56x_schematic_checklist.md) durante la revisión del esquemático y antes de iniciar el diseño de PCB. Use la lista de comprobación del diseño de PCB (apartado 6.3) durante la revisión del trazado y antes de liberar los archivos Gerber. En la práctica, cada revisión suele realizarse dos veces: primero por el ingeniero de diseño y después por un revisor independiente antes de congelar el diseño o liberarlo para fabricación.

Para sacarles el máximo partido, utilice las listas como registros de aprobación, no solo como material de lectura:

1. Confirme primero la referencia comercial exacta del chip y el encapsulado de destino.
2. Durante la revisión, marque cada punto como conforme, no conforme o no aplicable; no se limite a leer la tabla.
3. Contraste los puntos sobre pantalla, almacenamiento, activación y bajo consumo con los apartados correspondientes de la guía de diseño de hardware.
4. Anote las decisiones específicas del encapsulado —en especial 56xU frente a 56xV, QFN frente a WBBGA, pantalla DSI frente a SPI y uso de almacenamiento SD2/MPI3— en las notas de revisión.

<div align="center"><em>Tabla 4.4-1: Plantilla de registro de revisión</em></div>

<div align="center" markdown>

| Campo | Valor |
|:---|:---|
| Nombre del cliente | |
| Nombre del diseño del cliente | |
| Fecha de envío para revisión | |
| Revisor inicial | |
| Fecha de la revisión inicial | |
| Revisor de seguimiento | |
| Fecha de la revisión de seguimiento | |

</div>

<div align="center"><em>Tabla 4.4-2: Historial de versiones del documento de la lista de comprobación</em></div>

<div align="center" markdown>

| N.º | Versión | Fecha | Notas de publicación |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Primera publicación del documento de la lista de comprobación de esquemático y PCB |

</div>

[Índice de guías de diseño de hardware para chips de SiFli (Wiki)]: https://wiki.sifli.com/hardware/index.html

## Continuar con la guía de diseño { #continue-the-design-guide }

La guía completa continúa en las siguientes páginas, cada una dedicada a una fase del proceso de diseño.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Diseño del esquemático](SF32LB56x_schematic_design.md)__ — sistema de alimentación, modos de funcionamiento y fuentes de activación, generación de reloj, RF, interfaces de pantalla/táctiles/retroiluminación, almacenamiento/sensores/audio/conectividad y fabricación
- :fontawesome-solid-list-check: __[Lista de comprobación del esquemático](SF32LB56x_schematic_checklist.md)__ — lista de comprobación punto por punto para revisar esquemáticos (apartado 5.8)
- :fontawesome-solid-microchip: __[Directrices de diseño de PCB](SF32LB56x_pcb_layout.md)__ — huella, apilado de capas, trazado crítico y lista de comprobación punto por punto del diseño de PCB
- :fontawesome-solid-book-open: __[Lista de comprobación de revisión del diseño y referencias](SF32LB56x_review_and_reference.md)__ — lista de comprobación de publicación, documentos relacionados, apéndices e historial de revisiones

</div>
