---
icon: lucide/book-check
hide:
    - navigation
description: "Guía de diseño de hardware para la MCU SF32LB58x: arquitectura de alimentación, diseño de reloj y RF, pantalla, almacenamiento, audio y diseño de PCB."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB58x { #sf32lb58x-hardware-design-guide }

## 1. Introducción { #1-introduction }

Esta guía ofrece recomendaciones y material de referencia para desarrollar productos basados en la familia SF32LB58x, una serie de microcontroladores AIoT de alto rendimiento. Está dirigida a ingenieros de hardware, diseñadores de PCB y desarrolladores de producto que crean dispositivos alimentados por batería con interfaces de usuario avanzadas, gran capacidad de memoria, Bluetooth de modo dual, audio, gran cantidad de GPIO y requisitos de bajo consumo en espera.

La guía cubre todo el proceso de desarrollo de hardware: PMIC y distribución de alimentación, fanout de BGA256, planificación del apilado HDI, circuitos de reloj, diseño RF, MIPI-DSI, USB2.0 High-Speed, SDIO/eMMC, circuitos de audio, diseño de PCB, validación y preparación para la fabricación. Seguir estas recomendaciones ayuda a reducir los riesgos de los diseños BGA/HDI de alta densidad, proteger la integridad de señal en interfaces de alta velocidad y asegurar que el producto cumpla los requisitos de alimentación, encapsulado y producción de SF32LB58x.

Se presupone que el lector conoce los fundamentos del diseño de hardware embebido, la elaboración de esquemáticos y el diseño de PCB de alta densidad. Esta guía complementa la hoja de datos, el manual de usuario, la nota oficial de aplicación de hardware, el paquete de diseño de referencia y la lista de proveedores aprobados por SiFli para SF32LB58x. Estos documentos siguen siendo las fuentes de referencia para las especificaciones eléctricas, la multiplexación de pines, las dimensiones del encapsulado, la cualificación de componentes y los límites de producción.

## 2. Recursos de desarrollo { #2-development-resources }

[Resumen de producto SF32LB58x]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[Hoja de datos SF32LB58x]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[Manual de usuario SF32LB58x]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[Nota de aplicación de hardware SF32LB58x]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[Lista de comprobación del esquemático y de PCB SF32LB58x]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[Lista de proveedores aprobados por SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Comprar muestras]: https://sifli.taobao.com/
[Comprar placas de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumen de producto SF32LB58x]__
- :fontawesome-solid-file-pdf: __[Hoja de datos SF32LB58x]__
- :fontawesome-solid-file-pdf: __[Manual de usuario SF32LB58x]__
- :fontawesome-solid-file-lines: __[Nota de aplicación de hardware SF32LB58x]__
- :fontawesome-solid-file-excel: __[Lista de comprobación del esquemático y de PCB SF32LB58x]__
- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados por SiFli (AVL)]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__

</div>

## 3. Descripción del dispositivo { #3-device-overview }

### 3.1. Arquitectura { #31-architecture }

<div align="center"><em>Tabla 3.1-1: Resumen de las principales características de hardware</em></div>

<div align="center" markdown>

| Característica | Descripción |
|:---|:---|
| Arquitectura de núcleos | Arquitectura heterogénea de tres núcleos: 2 núcleos Arm Cortex-M33 STAR-MC1 para aplicaciones, hasta 240 MHz, y 1 núcleo Arm Cortex-M33 STAR-MC1 de bajo consumo, hasta 96 MHz |
| Bluetooth | Transceptor Bluetooth 5.3 de bajo consumo y modo dual integrado |
| Gráficos | Aceleración gráfica 2D/2.5D ePicasso 2.0 y gráficos vectoriales Vivante GCNanoUltraV |
| Interfaces de pantalla | MIPI-DSI, SPI/QSPI, MCU8080, DPI, JDI paralelo/serie |
| Almacenamiento | NOR Flash/PSRAM en SiP según el modelo; NOR o SPI NAND Flash externa mediante MPI3 o MPI4; interfaces SDIO SD1 y SD2 |
| Audio | 3 interfaces I2S, 2 interfaces PDM, entrada/salida de audio analógico diferencial y compatibilidad con PA de audio analógico externo y PA de audio I2S |
| Interrupciones de activación | Todas las GPIO pueden activar el chip desde Light/Deep Sleep. Standby/Hibernate admite 16 fuentes de interrupción de activación: 6 en PA y 10 en PB |
| Interfaz PBR | Seis pines PBR. PBR0 pasa de nivel bajo a alto al encenderse y puede controlar algunos LSW externos; PBR1-PBR5 están en nivel bajo de forma predeterminada. PBR0-PBR5 pueden emitir LPTIM o una señal de reloj de 32 kHz y seguir funcionando como salidas durante Standby/Hibernate. PBR0-PBR3 pueden configurarse como entradas de activación, pero no generan interrupciones mientras la MCU está activa. |

</div>

### 3.2. Variantes { #32-variants }

Antes de cerrar el esquemático, confirme los códigos de pedido SF32LB58x y la configuración de memoria en SiP con la hoja de datos más reciente y la AVL. Considere la familia una plataforma BGA256 que requiere HDI; la memoria SiP varía según el modelo. La familia permite conectar NOR o SPI NAND Flash externa mediante MPI3 o MPI4. En la EVB de SiFli, MPI4 es la interfaz predeterminada para la SPI NAND externa; SD1 se usa para eMMC o SD NAND, y SD2 para una tarjeta SD o un dispositivo Wi-Fi. Antes de cerrar el diseño, compruebe la asignación de pines de la variante elegida y el enrutamiento de la placa.

### 3.3. Encapsulado { #33-packages }

<div align="center"><em>Tabla 3.3-1: Encapsulado</em></div>

<div align="center" markdown>

| Nombre del encapsulado | Dimensiones | Paso entre pines |
|:---|:---|:---|
| BGA256 | 8,5 mm x 6,5 mm x 0,94 mm | 0,4 mm |

</div>

### 3.4. Principales características de hardware { #34-major-hardware-features }

- Encapsulado BGA256 con paso de 0,4 mm y fanout denso de alimentación/GPIO.
- Requiere un proceso de PCB HDI; el diseño no es compatible con PTH.
- PMU integrada con 2 salidas BUCK y 3 salidas LDO internas.
- PMIC de sistema SF30147C opcional para gestionar la alimentación de sistemas tipo reloj inteligente.
- MIPI-DSI, USB2.0 HS, SDIO/eMMC, RF, audio y el fanout denso de BGA requieren confirmar con antelación el apilado y la impedancia.

### 3.5. Aplicaciones habituales { #35-typical-applications }

SF32LB58x es adecuado para productos conectados que combinan gráficos avanzados, gran capacidad de memoria, multimedia y cargas de trabajo de IA en el borde. Algunos ejemplos son:

- Relojes inteligentes, relojes deportivos y dispositivos vestibles para actividades al aire libre
- Ciclocomputadores avanzados y paneles para vehículos
- Pantallas inteligentes y cuadros de instrumentos conectados
- Dispositivos vestibles con funciones de IA
- Sistemas de IA en el borde y fusión de sensores
- Dispositivos HMI de alta resolución basados en LVGL
- Terminales médicos e industriales portátiles
- Accesorios Bluetooth + Wi-Fi que utilizan un dispositivo Wi-Fi SDIO externo

## 4. Resumen de diseño { #4-design-at-a-glance }

### 4.1. Arquitectura de hardware { #41-hardware-architecture }

<div align="center"><em>Tabla 4.1-1: Resumen rápido del diseño</em></div>

<div align="center" markdown>

| Elemento de diseño | Implementación habitual |
|:---|:---|
| Encapsulado | BGA256, 8,5 mm × 6,5 mm × 0,94 mm, paso de 0,4 mm |
| PCB | Solo placa HDI; no compatible con PTH; se recomienda apilado 6HDI-2 |
| Alimentación | PMU integrada (2 BUCK + 3 LDO); se puede combinar con el PMIC SF30147C de SiFli para alimentar todo el sistema |
| Inductor BUCK | 4,7 µH, DCR ≤0,4 Ω, Isat ≥500 mA |
| Reloj | Cristal principal de 48 MHz + cristal RTC de 32,768 kHz |
| RF | Pista con impedancia controlada de 50 Ω y espacio reservado para una red π de adaptación |
| Pantalla | MIPI-DSI (2 líneas), SPI de 3/4 hilos, Quad-SPI, MCU8080, DPI y JDI paralelo/serie; asignación de pines para las dos LCDC: LCDC1 (PA) / LCDC2 (PB) |
| Almacenamiento | NOR o SPI NAND Flash externa mediante MPI3 o MPI4. En la EVB de SiFli, MPI4 se usa para SPI NAND, SD1 para eMMC o SD NAND, y SD2 para tarjeta SD o dispositivo Wi-Fi |
| Audio | 3 interfaces I2S (solo en modo maestro), 2 interfaces PDM y entrada/salida de audio analógico diferencial |
| Depuración | 1 interfaz SWD + 6 salidas UART de depuración seleccionables |
| USB | USB2.0 HS, modos Host/Device |

</div>

### 4.2. Flujo de diseño de hardware { #42-hardware-design-flow }

<div align="center"><em>Tabla 4.2-1: Flujo de diseño de hardware</em></div>

<div align="center" markdown>

| Paso | Decisión de diseño | Secciones principales |
|:---|:---|:---|
| 1 | Confirme el código de pedido, la configuración de memoria en SiP y las premisas del encapsulado BGA256 | Descripción del dispositivo, Encapsulado |
| 2 | Fije el apilado HDI, la estructura de vías, las reglas de impedancia y la capacidad de montaje antes de iniciar el diseño de PCB | Directrices de diseño de PCB |
| 3 | Decida si necesita el PMIC de sistema opcional SF30147C y defina los raíles de alimentación de la PMU del chip, los inductores BUCK, los condensadores LDO, el circuito de reinicio y la secuencia de alimentación | Sistema de alimentación |
| 4 | Elija el almacenamiento de arranque, la interfaz de pantalla, el modo USB, el uso de SDIO/eMMC, la topología de audio y el acceso de depuración | Almacenamiento y conectividad, Interfaces de usuario, Fabricación |
| 5 | Revise capturas de pantalla del trazado de reloj, RF, DSI, USB2.0 HS, SDIO/eMMC, audio, DC/DC, fanout BGA y ESD | Generación de reloj, RF, Directrices de diseño de PCB |
| 6 | Archive el esquemático, el apilado, los informes DRC y de impedancia, la AVL, la documentación de fabricación y las evidencias de diseño pertinentes antes de liberar el prototipo | Lista de comprobación de revisión de diseño |

</div>

### 4.3. Cómo utilizar esta guía { #43-how-to-use-this-guide }

Siga el orden de revisión de la placa: confirme el encapsulado y la configuración de memoria en SiP, cierre el apilado HDI y la estrategia del PMIC, revise el almacenamiento de arranque y el trazado de pantalla y, después, verifique los relojes, RF, USB, audio, depuración y acceso a las pruebas de producción. La sección 5 es la referencia para el esquemático, la sección 6 para la implementación de PCB y la sección 7 contiene la lista de comprobación previa a la liberación.

### 4.4. Paquete de evidencias para la revisión { #44-review-evidence-pack }

Antes de liberar el prototipo, archive el PDF del esquemático, el apilado de la PCB, la documentación sobre las capacidades del proceso y la fabricación de vías, los informes de impedancia y DRC, y la verificación frente a la AVL. Guarde también capturas de pantalla de las zonas críticas del diseño: PMIC, inductores BUCK, DSI, USB, SDIO/eMMC, RF, cristales, audio, fanout BGA, retorno de masa y puntos de entrada de ESD.

### 4.5. Uso de las listas de comprobación { #using-the-checklists }

Esta guía incluye dos niveles de cobertura mediante listas de comprobación. Las listas breves incluidas en las secciones 5.2.1.7 y 5.7.3 reúnen los puntos de mayor riesgo para una revisión de ingeniería rápida. La [Lista de comprobación del esquemático](SF32LB58x_schematic_checklist.md) (sección 5.8) y la [Lista de comprobación del diseño de PCB](SF32LB58x_pcb_layout_checklist.md) (sección 6.18) reproducen, punto por punto, la lista completa de SiFli *SF32LB58x Schematic & PCB Checklist* (V1.0, 2026-01-21).

Cada punto es obligatorio (debe superarse antes de la liberación) u opcional (recomendado cuando se utilice la función correspondiente). El texto en color y el texto con <span class="flag-yellow">fondo amarillo</span> conservan el énfasis de revisión de la hoja de cálculo de origen. Como esta no explica el motivo de cada resaltado, considérelos indicadores adicionales de revisión, no sustitutos de otros puntos de la misma tabla que no estén resaltados.

La hoja de cálculo de origen especifica Isat ≥ 450 mA para un inductor BUCK que no figure en la AVL, mientras que la nota oficial de aplicación de hardware especifica Isat ≥ 500 mA para L = 4,7 µH y DCR ≤ 0,4 Ω. La lista conserva el valor de la hoja de cálculo. Hasta que SiFli aclare la diferencia, use un inductor no incluido en la AVL con Isat de al menos 500 mA.

Use la [Lista de comprobación del esquemático](SF32LB58x_schematic_checklist.md) durante la revisión del esquemático y antes de iniciar el diseño de PCB. Use la [Lista de comprobación del diseño de PCB](SF32LB58x_pcb_layout_checklist.md) durante la revisión del trazado y antes de la liberación de los archivos Gerber. En la práctica, cada revisión suele realizarse dos veces: primero por el ingeniero de diseño y después por un revisor independiente antes de congelar el diseño o liberarlo para fabricación.

Para sacarles el máximo partido, utilice las listas como registros de aprobación, no solo como material de lectura:

1. Confirme primero el número de pieza exacto y la configuración de memoria en SiP.
2. Durante la revisión, marque cada punto como aprobado, no aprobado o no aplicable; no se limite a leer la tabla.
3. Contraste los puntos sobre pantalla, almacenamiento, activación y bajo consumo con las secciones correspondientes de la guía de diseño de hardware.
4. Anote en el registro de revisión cualquier premisa que siga pendiente antes de liberar el diseño.

<div align="center"><em>Tabla 4.5-1: Plantilla de registro de revisión</em></div>

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

<div align="center"><em>Tabla 4.5-2: Historial de versiones de la lista de comprobación</em></div>

<div align="center" markdown>

| N.º | Versión | Fecha | Notas de versión |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Versión inicial de la lista de comprobación de esquemático y PCB |

</div>

## Continuar con la guía de diseño { #continue-the-design-guide }

La guía completa continúa en las siguientes páginas, cada una dedicada a una fase del proceso de diseño.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Directrices de diseño esquemático](SF32LB58x_schematic_design.md)__ — sistema de alimentación, generación de reloj, RF, interfaces de usuario, almacenamiento y conectividad, y fabricación
- :fontawesome-solid-list-check: __[Lista de comprobación del esquemático](SF32LB58x_schematic_checklist.md)__ — lista de comprobación punto por punto para revisar esquemáticos (sección 5.8)
- :fontawesome-solid-microchip: __[Pautas de diseño de PCB](SF32LB58x_pcb_layout.md)__ — huella del encapsulado, apilado, fanout y trazado de reloj, RF, audio, USB, SDIO, DSI y alimentación
- :fontawesome-solid-list-check: __[Lista de comprobación del diseño de PCB](SF32LB58x_pcb_layout_checklist.md)__ — lista de comprobación punto por punto para revisar el diseño de PCB (sección 6.18)
- :fontawesome-solid-book-open: __[Lista de comprobación de revisión de diseño y referencias](SF32LB58x_review_and_reference.md)__ — lista de comprobación de liberación, documentos relacionados, apéndices e historial de revisiones

</div>
