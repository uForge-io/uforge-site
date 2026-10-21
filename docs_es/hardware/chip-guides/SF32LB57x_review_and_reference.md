---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Lista de comprobación de la revisión del diseño, documentos y referencias relacionados, apéndices e historial de revisiones de la guía de hardware SF32LB57x."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB57x — Lista de comprobación de la revisión del diseño y referencias { #sf32lb57x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Parte de la guía de diseño de hardware SF32LB57x"
    Esta página cubre los apartados 7–10: autocomprobación del diseño del cliente, documentos y referencias relacionados, apéndices e historial de revisiones. Vuelva a las [Directrices de diseño de PCB](SF32LB57x_pcb_layout.md).

## 7. Autocomprobación del diseño del cliente { #7-customer-design-self-check }

Complete esta lista antes de solicitar la revisión del esquemático, la revisión del diseño de PCB o la liberación para EVT. El responsable del diseño del cliente debe anotar el resultado y las evidencias de cada punto y, cuando corresponda, citar las páginas del esquemático y adjuntar capturas de la PCB, mediciones o registros de revisión.

### 7.1. Encapsulado y número de pieza { #71-package-and-part-number }

- [ ] Se han confirmado el número de pieza comercial, la familia de alimentación, el encapsulado y la asignación de pines.
- [ ] El símbolo de la biblioteca de esquemáticos y la huella de PCB coinciden con la hoja de datos.
- [ ] Se han revisado los pads QFN<!-- BGA-ONLY -->/BGA<!-- /BGA-ONLY -->, el esténcil, el pad expuesto y el diseño de las vías.

### 7.2. Alimentación { #72-power }

- [ ] Cada pin de alimentación se mantiene dentro de los límites especificados de tensión y carga; los valores y la ubicación de los condensadores cumplen la hoja de datos.
- [ ] El inductor BUCK, los condensadores y el trazado de realimentación cumplen los requisitos de diseño.
- [ ] No se utilizan incorrectamente las salidas LDO internas para alimentar periféricos de alta corriente.
- [ ] Las rutas de alimentación corresponden a la familia seleccionada. Compruebe las conexiones aplicables del cargador/OVP, VBUS, VBAT, VCC y/o PVDD en la tabla de alimentación correspondiente al encapsulado y la variante exactos; no mezcle las topologías de las variantes alimentadas por batería y de 3,3 V.
- [ ] Se pueden apagar las alimentaciones de los periféricos y estos tienen estados predeterminados seguros.

### 7.3. Relojes { #73-clocks }

- [ ] Los cristales de 48 MHz y 32,768 kHz cumplen los parámetros recomendados.
- [ ] Los cristales están cerca del chip y cuentan con zonas de exclusión.
- [ ] El trazado de los cristales está alejado del ruido de alimentación, RF, USB, SDIO, pantalla y circuitos de carga.

### 7.4. Almacenamiento y arranque { #74-storage-and-boot }

- [ ] Si la pieza seleccionada incluye memoria integrada en el encapsulado, se han confirmado su configuración y su efecto sobre las interfaces de memoria externa y los pines del encapsulado para ese encapsulado y variante concretos.
- [ ] Son correctos el tipo de medio de arranque externo, los pull-ups, el control de alimentación y el estado predeterminado.
- [ ] Se han reservado la configuración de arranque y los puntos de prueba de descarga y depuración.

### 7.5. RF { #75-rf }

- [ ] La pista de señal RF hacia la antena está diseñada para una impedancia controlada de 50 Ω.
- [ ] La red de adaptación π está cerca del chip.
- [ ] La pista RF cuenta con una referencia GND continua y apantallamiento mediante vías.
- [ ] RF está aislada de las fuentes de ruido y de las interfaces de alta velocidad.

### 7.6. Pantalla y táctil { #76-display-and-touch }

- [ ] La interfaz de pantalla, la resolución y el grupo de pines cumplen los requisitos del panel.
- [ ] Se pueden controlar las alimentaciones de la pantalla, la retroiluminación y el panel táctil.
- [ ] Si se necesita activación desde el táctil, la interrupción se conecta a una GPIO con capacidad de activación.
- [ ] El FPC y las pistas de alta velocidad de la pantalla están alejados de RF.

### 7.7. Audio y señales analógicas { #77-audio-and-analog }

- [ ] El desacoplo de MIC_BIAS, AUD_VREF y AVDD33_AUD es correcto.
- [ ] El bloqueo de CC y el filtrado de la entrada analógica son correctos.
- [ ] El trazado diferencial de DACP/DACN y la red de adaptación son correctos.
- [ ] La tensión de entrada del GPADC, el divisor de tensión, el filtrado y el apantallamiento son correctos.

### 7.8. Interfaces generales { #78-general-interfaces }

- [ ] El cableado y los niveles de IO de UART, I2C, SPI, SDIO, USB y CAN son correctos.
- [ ] El raíl de los pull-ups de I2C conmuta junto con la alimentación de E/S del periférico correspondiente para evitar fugas cuando ese dominio está apagado.
- [ ] Se han implementado, según sea necesario, la protección ESD de USB, el trazado diferencial de 90 Ω y la detección de activación mediante VBUS.
- [ ] Las señales externas de activación utilizan pines con capacidad de activación.

### 7.9. Producción y fiabilidad { #79-production-and-reliability }

- [ ] Se han reservado puntos de prueba para DBG-UART, SWD, modo de arranque, PA00, PA01, PA34, alimentación y GND.
- [ ] Los puntos de prueba cumplen los requisitos de las sondas del utillaje de prueba.
- [ ] Se han revisado las medidas contra ESD, EOS, OVP, inversión de polaridad y sobretensiones transitorias.
- [ ] Se pueden ejecutar los procesos de grabación del firmware de producción, calibración del cristal y prueba de RF.

### 7.10. Criterios de liberación de la revisión del diseño { #710-review-release-criteria }

Antes de congelar el diseño, cumpla estos criterios de liberación:

- [ ] Se han cerrado todos los puntos aplicables con evidencias, como referencias a páginas del esquemático, capturas de la PCB, mediciones o notas de revisión; los puntos marcados como no aplicables incluyen una justificación.
- [ ] Toda desviación respecto a la hoja de datos o al diseño de referencia tiene una justificación de diseño específica del proyecto.
- [ ] Los responsables han revisado RF, cristales, carga, alimentación, USB, pantalla, audio y puntos de prueba de producción.
- [ ] El presupuesto de corriente de bajo consumo incluye las corrientes en modo de espera de todos los periféricos, las corrientes de los pull-ups y la corriente en reposo Iq de los reguladores.
- [ ] Están disponibles los medios necesarios para la puesta en marcha de EVT: descarga de firmware, acceso a los logs, medición de corriente, control del reinicio y control de arranque.

## 8. Documentos y referencias relacionados { #8-related-documents-and-references }

Consulte los documentos oficiales más recientes para verificar límites eléctricos, datos del encapsulado, multiplexación de pines, configuración de software, cualificación de componentes y restricciones de fabricación.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumen de producto SF32LB57x]__
- :fontawesome-solid-file-pdf: __[Hoja de datos SF32LB57x]__
- :fontawesome-solid-file-pdf: __[Manual de usuario SF32LB57x]__
- :fontawesome-solid-file-lines: __[Nota de aplicación de hardware SF32LB57x]__
- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados por SiFli (AVL)]__

</div>

La [Lista de comprobación del esquemático](SF32LB57x_schematic_checklist.md) (apartado 5.8) y la [Lista de comprobación del diseño de PCB](SF32LB57x_pcb_layout_checklist.md) (apartado 6.10) reproducen, punto por punto, las tablas oficiales de autocomprobación del diseño SF32LB57x de SiFli, junto con las directrices de diseño esquemático y de PCB con las que deben contrastarse.

## 9. Apéndices { #9-appendices }

Los apéndices reúnen información sobre aplicaciones y diseños de referencia. Consúltelos una vez aplicadas las reglas principales de esquemático y PCB de los apartados 5 y 6.

<div align="center"><em>Tabla 9-1: Índice de apéndices</em></div>

<div align="center" markdown>

| Necesidad | Consulte |
|:---|:---|
| Ejemplos de esquemático de sistema mínimo | Apartado 5.1.2 |
| Imágenes de referencia de encapsulado, huella, esténcil, apilado, salida de pistas desde el encapsulado, alimentación, RF, audio, SDIO, USB y dispositivos TVS | Apartado 6.9 |
| Autocomprobación del diseño del cliente | Apartado 7 |

</div>

### 9.1. Apéndice A. Un producto SF32LB57x típico { #appendix-a-a-typical-sf32lb57x-product }

Un producto basado en SF32LB57x puede incluir la MCU, la red de alimentación, cristales de 48 MHz y 32,768 kHz, una red de adaptación RF y antena, pantalla y controlador táctil, almacenamiento de arranque, entrada/salida de audio, sensores, una cámara opcional y los periféricos USB/SDIO/CAN/UART/I2C/SPI que requiera el producto, junto con el acceso de depuración y de prueba de producción. Revise el circuito de carga, el OVP, la selección del interruptor de carga y las corrientes de fuga en bajo consumo según corresponda a la arquitectura de alimentación elegida.

## 10. Historial de revisiones { #10-revision-history }

<div align="center"><em>Tabla 10-1: Historial de revisiones</em></div>

<div align="center" markdown>

| Versión | Fecha | Notas |
|:--------|:-----|:------|
| 0.5 | 2026-08 | Se recuperó el nivel de detalle completo de la nota de aplicación oficial. Se añadieron las cuatro tablas de referencia de pines de alimentación por encapsulado/familia de alimentación, la tabla del puerto de depuración predeterminado, el esquemático del circuito de RF, las tablas completas de señales de pantalla (SPI/QSPI, RGB, configuración del modo RGB, MCU8080, EPD, JDI paralelo/serie, táctil/retroiluminación), las figuras de referencia del micrófono analógico, el micrófono PDM y el amplificador de potencia de audio, la tabla completa de señales de cámara específica del chip, las tablas IO MUX y de matriz, la tabla de sub-MUX de la matriz LCDC, la tabla de pines USB, la tabla ampliada de GPADC por pin y los circuitos de referencia del botón de encendido y del botón GPADC. Las tablas oficiales de autocomprobación del diseño se separaron en nuevas páginas complementarias: [Lista de comprobación del esquemático](SF32LB57x_schematic_checklist.md) y [Lista de comprobación del diseño de PCB](SF32LB57x_pcb_layout_checklist.md), sin omitir ningún punto de comprobación. |
| 0.4 | 2026-08 | Se contrastaron los datos con la nota oficial de aplicación de hardware SF32LB57x: se corrigió a 3,0 V (no 3,2 V) el mínimo de la tabla de pines `VCC`/`VBAT`; se añadió el umbral de apagado por hardware de 2,7 V; se corrigió a 30 mA el límite de corriente de arranque suave de `VDD33_VOUT1`; se corrigieron las opciones de capacitancia de carga del cristal de 32,768 kHz (7 pF u 11,5 pF; el valor predeterminado del chip es 11,5 pF); se especificaron el circuito de la tecla de alimentación/reinicio `PA34` y el diseño de la tecla con divisor resistivo GPADC; se añadieron el rango de entrada GPADC de 0 V a 3,3 V y el condensador de filtro de 100 nF; se añadieron los valores de los condensadores de `BUCK_FB`/`VDDIOA`/`VBATS`/`AVDD33_ANA`; se añadieron restricciones sobre la longitud total y la diferencia de longitud entre señales del bus MPI, además de las distancias de colocación del cristal; y se incorporó la asignación del apilado de 4 capas. |
| 0.3 | 2026-07 | Se reorganizaron las directrices de diseño del esquemático para que el sistema mínimo, la alimentación, la generación de reloj, RF, las interfaces de usuario, el almacenamiento y la conectividad, y la fabricación fueran secciones independientes del mismo nivel. |
| 0.2 | 2026-07 | Se añadieron el paquete de evidencias, instrucciones de puesta en marcha, validación de bajo consumo, validación RF/pantalla/audio/cámara y una referencia rápida de las restricciones críticas de PCB. |
| 0.1 | 2026-07 | Primera versión de la guía de diseño de hardware SF32LB57x, basada en la nota oficial de aplicación de hardware. |
| 0.0.1 | 2026-06 | Revisión 0.0.1 de la fuente: primera edición de la nota de aplicación de hardware SF32LB57x, con versión independiente de esta guía. |

</div>

### 10.1. Historial de revisiones de la lista de comprobación { #101-checklist-revision-history }

La lista de comprobación punto por punto de la [Lista de comprobación del esquemático](SF32LB57x_schematic_checklist.md) y la [Lista de comprobación del diseño de PCB](SF32LB57x_pcb_layout_checklist.md) tiene un control de versiones independiente de la guía, según las tablas de autocomprobación del diseño incluidas en la nota de aplicación de hardware SF32LB57x de SiFli.

<div align="center"><em>Tabla 10.1-1: Historial de revisiones de la lista de comprobación</em></div>

<div align="center" markdown>

| Versión | Fecha | Notas |
|:--------|:-----|:------|
| 1.0 | 2026-08 | Primera publicación, transcrita íntegramente de las tablas de autocomprobación del diseño (apartado 4) de la nota oficial de aplicación de hardware SF32LB57x, edición de 2026-06. |

</div>

[Resumen de producto SF32LB57x]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[Hoja de datos SF32LB57x]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[Manual de usuario SF32LB57x]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[Nota de aplicación de hardware SF32LB57x]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[Lista de proveedores aprobados por SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
