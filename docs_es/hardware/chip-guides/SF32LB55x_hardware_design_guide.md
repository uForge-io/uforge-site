---
icon: lucide/book-check
hide:
    - navigation
description: "Guía de diseño de hardware para la MCU SF32LB55x: alimentación, circuitos de reloj, adaptación RF, interfaces de almacenamiento y pantalla, y diseño de PCB."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB55x { #sf32lb55x-hardware-design-guide }

## 1. Introducción { #1-introduction }

Esta guía reúne recomendaciones y material de referencia para productos basados en la familia de microcontroladores SF32LB55x, diseñada para aplicaciones AIoT de uso general. Está dirigida a ingenieros de hardware, diseñadores de PCB y desarrolladores de producto que trabajan en wearables BLE, dispositivos a batería con varios sensores, equipos de supervisión de la salud y sistemas conectados compactos.

La guía abarca todo el proceso de desarrollo de hardware: selección del encapsulado, diseño de la alimentación y los circuitos de reloj, diseño de RF, memoria externa, interfaces de pantalla, fuentes de activación, sensores, audio, acceso de depuración, diseño de PCB, validación y preparación para fabricación. Aplicar estas recomendaciones ayuda a reducir los riesgos del esquemático y del diseño de PCB, conservar el funcionamiento de bajo consumo y tener en cuenta los requisitos de encapsulado, alimentación, memoria, RF e interfaces del SF32LB55x.

Se presupone que el lector conoce los fundamentos del diseño de hardware embebido y la captura de esquemáticos. Esta guía complementa la hoja de datos, el manual de usuario, la nota oficial de aplicación de hardware, los diseños de referencia y la lista de proveedores aprobados por SiFli. Estos documentos siguen siendo la referencia normativa para las especificaciones eléctricas, la multiplexación de pines, las dimensiones de encapsulado, la cualificación de componentes y los límites de producción.

SF32LB55x conserva una convención histórica de sufijos. Para determinar las interfaces disponibles, las capacidades que dependen del encapsulado y la configuración exacta de memoria, consulte el número de pieza completo y la documentación del encapsulado; no se base únicamente en el sufijo.

## 2. Recursos de desarrollo { #2-development-resources }

[Nota de aplicación de hardware SF32LB55x]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[Archivo fuente de la nota de aplicación de hardware SF32LB55x]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[Hoja de datos SF32LB55x]: https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[Manual de usuario SF32LB55x]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501%E2%80%90SF32LB55x%E2%80%90EN.pdf
[Documentación del SDK SF32LB55x]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[Referencia de API SF32LB55x]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[Resumen de la familia SF32]: ../../sf32-products/family/SF32_family.md
[Lista de proveedores aprobados por SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Comprar muestras]: https://sifli.taobao.com/
[Comprar placas de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Nota de aplicación de hardware SF32LB55x]__
- :fontawesome-brands-github: __[Archivo fuente de la nota de aplicación de hardware SF32LB55x]__
- :fontawesome-solid-file-pdf: __[Hoja de datos SF32LB55x]__
- :fontawesome-solid-file-pdf: __[Manual de usuario SF32LB55x]__
- :fontawesome-solid-book: __[Documentación del SDK SF32LB55x]__
- :fontawesome-solid-book-open: __[Referencia de API SF32LB55x]__
- :fontawesome-solid-microchip: __[Resumen de la familia SF32]__
- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados por SiFli (AVL)]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__

</div>

## 3. Descripción del dispositivo { #3-device-overview }

### 3.1. Arquitectura { #31-architecture }

SF32LB55x está orientado a productos AIoT de bajo consumo que deben responder con rapidez al usuario y mantener un consumo reducido en espera y suspensión. Integra un transceptor Bluetooth 5.2 de bajo consumo, gestión de alimentación e interfaces de memoria y pantalla. La integración de hardware debe contemplar la selección del encapsulado, los rieles de la PMU, el modo de arranque, los dos circuitos de cristal, la adaptación RF, la memoria externa, la selección de pantalla MIPI/SPI/MCU8080/JDI, las conexiones de GPADC y sensores, el audio Bluetooth externo, el acceso de depuración y grabación y la calibración en producción.

La conectividad de almacenamiento incluye varias interfaces QSPI, una interfaz OPI-PSRAM independiente y compatibilidad con SD/eMMC. La configuración de NOR Flash y PSRAM integrada en el encapsulado depende de la referencia exacta. Las interfaces de memoria y pantalla también dependen del encapsulado. BGA145 admite un canal de OPI-PSRAM externa y BGA169 admite dos. La interfaz MIPI DSI de dos carriles de datos está disponible en BGA145 y BGA169, no en QFN68L. Compruebe el mapa de pines y la memoria integrada en el encapsulado de la pieza exacta antes de asignar dispositivos externos.

### 3.2. Variantes y encapsulados { #32-variants-and-packages }

<div align="center"><em>Tabla 3.2-1: Opciones de encapsulado</em></div>

<div align="center" markdown>

| Nombre del encapsulado | Tamaño | Paso entre pines | Diámetro de bola |
| :--- | :--- | :--- | :--- |
| QFN68L | 7x7x0.75 mm | 0.35 mm | - |
| BGA145 | 7x7x0.94 mm | 0.5 mm | 0.25 mm |
| BGA169 | 7x7x0.94 mm | 0.5 mm | 0.25 mm |

</div>

SF32LB55x está disponible en encapsulados QFN68L, BGA145 y BGA169. Elija el encapsulado pronto, ya que las interfaces de memoria, el fanout, los requisitos de fabricación de la PCB y las GPIO disponibles varían según el encapsulado.

![Figura 3.2-1: Distribución de pines de QFN68L](../../sf32-products/chips/assets/55x/SF32LB55x-QFN68-Leadmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-1: Distribución de pines de QFN68L</em></div>

![Figura 3.2-2: Distribución de pines de BGA145](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-2: Distribución de pines de BGA145</em></div>

!!! warning "Mapas de bolas BGA169 históricos"
    SiFli identifica SF32LB557V8N6 como un componente al final de su vida útil (EOL). Su mapa se conserva para revisar diseños existentes, no como recomendación para diseños nuevos. SF32LB557VD3A6 utiliza otro mapa BGA169: D11, E9, K12, L11, L13 y M13 son NC. Compruebe el mapa de la pieza exacta; unas dimensiones idénticas no implican compatibilidad de pines.

![Figura 3.2-3: Distribución de pines de BGA169 SF32LB557V8N6](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-3: Distribución de pines de BGA169 SF32LB557V8N6</em></div>

![Figura 3.2-4: Distribución de pines de BGA169 SF32LB557VD3A6](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-4: Distribución de pines de BGA169 SF32LB557VD3A6</em></div>

### 3.3. Principales características de hardware { #33-major-hardware-features }

- Opciones de encapsulado QFN68L, BGA145 y BGA169.
- Requisitos de diseño con cristales de cuarzo de 48 MHz y 32,768 kHz.
- Transceptor Bluetooth 5.2 de bajo consumo, requisitos de adaptación RF y diseño de antena.
- Interfaces OPI PSRAM, QSPI NOR/NAND Flash y PSRAM, y SDIO eMMC o Micro SD; la memoria integrada en el encapsulado depende de la referencia exacta.
- Opciones de pantalla MIPI DSI, SPI/QSPI, MCU8080 y JDI.
- Directrices de diseño para botón de activación, motor de vibración, interrupción de activación, GPADC, sensores y audio Bluetooth externo.
- Compatibilidad con DBG-UART, SWD, grabación en producción y calibración del cristal.

### 3.4. Aplicaciones habituales { #34-typical-applications }

Entre las aplicaciones previstas se incluyen pulseras, dispositivos móviles inteligentes, productos para el hogar inteligente y otros diseños AIoT de bajo consumo.

## 4. Resumen de diseño { #4-design-at-a-glance }

### 4.1. Resumen de ingeniería { #41-engineering-summary }

<div align="center"><em>Tabla 4.1-1: Resumen de diseño de SF32LB55x</em></div>

<div align="center" markdown>

| Tema | Enfoque de diseño |
|:---|:---|
| Encapsulado | Elija QFN68L o un encapsulado BGA antes de planificar los pines y el apilado de capas de la PCB. |
| Alimentación | Revise los rieles de la PMU, los demás pines de alimentación, los condensadores necesarios, POR/BOR/reset y el modo BUCK. |
| Reloj | Use cristales de cuarzo de 48 MHz y 32,768 kHz que cumplan los requisitos de CL, ppm y ESR. |
| RF | Sitúe la red de adaptación cerca del chip y mantenga limpia la ruta de antena de 50 Ω. |
| Memoria | Planifique por separado la PSRAM volátil OPI/QSPI y el almacenamiento de arranque y persistente en QSPI Flash o SDIO eMMC/Micro SD; confirme la compatibilidad del encapsulado y del modo de arranque. |
| Pantalla | Elija MIPI DSI, SPI/QSPI, MCU8080 o JDI con antelación, ya que cambian los grupos de pines y el diseño de PCB. |
| Producción | Reserve acceso a DBG-UART, SWD, modo de arranque, alimentación y calibración de RF/cristal. |

</div>

### 4.2. Flujo de diseño de hardware { #42-hardware-design-flow }

1. Confirme el encapsulado, la estrategia de memoria, la interfaz de pantalla y el objetivo de bajo consumo.
2. Defina el árbol de alimentación, los rieles de la PMU, el comportamiento de BUCK/LDO y el circuito de reset.
3. Seleccione los cristales, la topología de adaptación RF y las restricciones de diseño de la antena.
4. Asigne los pines de memoria, pantalla, activación, sensores, audio, depuración y pruebas de producción.
5. Fije las restricciones de apilado de PCB, fanout, impedancia, ESD, RF e interfaces de alta velocidad.
6. Revise la lista de comprobación del apartado 7 antes de cerrar el esquemático, liberar el diseño de PCB y comenzar EVT.

### 4.3. Paquete de evidencias para la revisión { #43-review-evidence-pack }

Antes de EVT, archive las versiones de la hoja de datos y el manual de usuario, el plano del encapsulado, el PDF del esquemático, el apilado de la PCB, el informe de impedancia, los informes DRC/ERC, el árbol de alimentación, la tabla de modos de arranque, capturas del diseño RF y del cristal, capturas del trazado de memoria y pantalla, y el plan de puntos de prueba de producción.

### 4.4. Uso de las listas de comprobación { #using-the-checklists }

Esta guía ofrece dos niveles de revisión. La lista breve del apartado 7 reúne los puntos de mayor riesgo para una comprobación técnica rápida. La [Lista de comprobación del esquemático](SF32LB55x_schematic_checklist.md) (apartado 5.8) y el apartado 6.4 de las [Pautas de diseño de PCB](SF32LB55x_pcb_layout.md) reproducen, punto por punto, la lista completa de SiFli *SF32LB55x Schematic & PCB Checklist* (V1.0, 2026-01-21), publicada junto con los materiales de diseño de hardware en el [índice de guías de diseño de hardware para chips de la wiki de SiFli][Índice de guías de diseño de hardware para chips de SiFli (Wiki)]. Este documento abarca los dispositivos 551/555/557 y la variante SS6600A8.

Cada punto indica los grupos de variantes a los que se aplica y si es obligatorio (debe superarse antes de liberar el diseño) u opcional (recomendado cuando se utilice la función correspondiente). El texto en color y el texto con <span class="flag-yellow">fondo amarillo</span> conservan el énfasis de revisión del archivo Excel de origen. Como este no explica el motivo de cada resaltado, considérelos señales adicionales de revisión, no sustitutos de otros puntos de la misma tabla que no estén resaltados.

Use la [Lista de comprobación del esquemático](SF32LB55x_schematic_checklist.md) durante la revisión del esquemático y antes de iniciar el diseño de PCB. Use la lista de comprobación de PCB (apartado 6.4) durante la revisión del trazado y antes de publicar los archivos Gerber. En la práctica, cada lista suele revisarse en dos pasadas: primero por el ingeniero de diseño y después por una persona revisora independiente, antes de congelar el diseño o liberarlo para fabricación.

Para sacarles el máximo partido, utilice las listas como registros de aprobación, no como simples documentos de consulta:

1. Confirme primero el número de pieza exacto y el encapsulado de destino.
2. Durante la revisión, marque cada punto como aprobado, no aprobado o no aplicable; no se limite a leer la tabla.
3. Contraste los puntos sobre pantalla, almacenamiento, activación y bajo consumo con los apartados correspondientes de la guía de diseño de hardware.
4. Anote los supuestos específicos del encapsulado —en especial BGA frente a QFN, pantalla DSI frente a SPI y uso de almacenamiento QSPI2/QSPI3— en las notas de revisión.

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

- :fontawesome-solid-bolt: __[Directrices de diseño esquemático](SF32LB55x_schematic_design.md)__ — sistema de alimentación, modo de arranque, generación de reloj, RF, interfaces de almacenamiento, interfaces de pantalla/táctiles e interfaces de activación/GPADC/fabricación
- :fontawesome-solid-list-check: __[Lista de comprobación del esquemático](SF32LB55x_schematic_checklist.md)__ — lista de comprobación punto por punto para revisar esquemáticos (apartado 5.8)
- :fontawesome-solid-microchip: __[Pautas de diseño de PCB](SF32LB55x_pcb_layout.md)__ — huella, apilado de capas, reglas generales de PCB, trazado de interfaces y lista de comprobación punto por punto del diseño de PCB
- :fontawesome-solid-book-open: __[Lista de comprobación para la revisión del diseño y referencias](SF32LB55x_review_and_reference.md)__ — lista de comprobación de publicación, documentos relacionados, apéndices e historial de revisiones

</div>
