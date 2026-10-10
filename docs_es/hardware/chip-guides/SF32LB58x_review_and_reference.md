---
icon: lucide/clipboard-check
description: "Lista de comprobación de revisión del diseño, documentos y referencias relacionados, apéndices e historial de revisiones de la guía de diseño de hardware SF32LB58x."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# Guía de diseño de hardware SF32LB58x: lista de comprobación para la revisión de diseño y referencias { #sf32lb58x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Parte de la guía de diseño de hardware SF32LB58x"
    Esta página cubre las secciones 7 a 10: lista de comprobación de revisión, documentos y referencias, apéndices e historial de revisiones. Vuelva a la [lista de comprobación de diseño de PCB](SF32LB58x_pcb_layout_checklist.md).

## 7. Lista de comprobación para la revisión del diseño { #7-design-review-checklist }

- [ ] Confirme que la combinación de Flash/PSRAM integrada en el encapsulado del modelo elegido satisface los requisitos del producto.
- [ ] Compruebe que la alimentación del PMU (PVDD1/PVDD2/BUCK/LDO) y la tensión de todos los demás pines de alimentación se mantienen dentro de los límites de la hoja de datos.
- [ ] Verifique que la inductancia nominal del inductor BUCK seleccionado sea de 4,7 µH, con DCR ≤ 0,4 Ω e Isat ≥ 500 mA.
- [ ] Confirme que los cristales de 48 MHz y 32,768 kHz cumplen las especificaciones recomendadas y que su trazado y zonas de exclusión respetan los requisitos de diseño.
- [ ] Verifique que la pista RF tiene una impedancia controlada de 50 Ω y que la red de adaptación está cerca del chip.
- [ ] Confirme que la interfaz de almacenamiento externa elegida es compatible con el diseño de arranque previsto. Por separado, verifique que el pin Mode esté configurado como corresponde: nivel alto para el modo de descarga o nivel bajo para iniciar desde el área de aplicaciones del usuario.
- [ ] Confirme que el trazado de las interfaces de pantalla (MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI) cumple las reglas de impedancia y ajuste de longitudes propias de cada interfaz. Para DSI, verifica una impedancia diferencial de 100 Ω, una diferencia de longitud ≤0,5 mm dentro de cada par y ≤2 mm entre pares.
- [ ] Compruebe que el trazado USB cumple el requisito de impedancia diferencial de 90 Ω. Enrute juntas las señales SDIO, mantenga la longitud total ≤50 mm y limite la diferencia de longitud dentro de cada grupo a ≤6 mm.
- [ ] Reserve el acceso SWD y seleccione, entre las seis UART disponibles, la interfaz de salida de depuración y sus pines de señal; reserva también puntos de prueba para producción.
- [ ] Compruebe que las vías de los pads BGA están centradas y que el plano de masa bajo el chip es continuo.
- [ ] Verifique las referencias de los componentes principales con la [Lista de proveedores aprobados de SiFli (AVL)] más reciente.
- [ ] Incluya en el paquete de evidencias de revisión el apilado de capas, la capacidad del proceso de fabricación, los resultados de impedancia y DRC, la AVL y capturas de las zonas críticas del diseño.
- [ ] Resuelva las cuestiones pendientes sobre esquemático, PCB y fabricación antes de liberar el prototipo o, si alguna sigue abierta, regístrela y haga un seguimiento explícito hasta su cierre.

## 8. Documentos y referencias relacionados { #8-related-documents-and-references }

Consulte la documentación oficial más reciente para verificar límites eléctricos, datos del encapsulado, multiplexación de pines, configuración del software y cualificación de componentes.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumen del producto SF32LB58x]__
- :fontawesome-solid-file-pdf: __[Hoja de datos SF32LB58x]__
- :fontawesome-solid-file-pdf: __[Manual de usuario SF32LB58x]__
- :fontawesome-solid-file-lines: __[Nota de aplicación de hardware SF32LB58x]__
- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados de SiFli (AVL)]__
- :fontawesome-brands-wikipedia-w: __[Índice de guías de diseño de hardware de chips SiFli (Wiki)]__

</div>

En conjunto, la [lista de comprobación de esquemáticos](SF32LB58x_schematic_checklist.md) (sección 5.8) y la [lista de comprobación de diseño de PCB](SF32LB58x_pcb_layout_checklist.md) (sección 6.18) reproducen los puntos aplicables de esquemático y PCB de la hoja de cálculo *SF32LB58x Schematic & PCB Checklist* (V1.0, 2026-01-21), junto con las pautas de diseño correspondientes.

[Resumen del producto SF32LB58x]: https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf
[Hoja de datos SF32LB58x]: https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf
[Manual de usuario SF32LB58x]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[Nota de aplicación de hardware SF32LB58x]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[Lista de proveedores aprobados de SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Índice de guías de diseño de hardware de chips SiFli (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Apéndices { #9-appendices }

Los apéndices reúnen el contexto de aplicación y de los diseños de referencia. Úselos como apoyo a la revisión después de aplicar las reglas principales de esquemático y PCB de las secciones 5 y 6.

<div align="center"><em>Tabla 9-1: Índice de apéndices</em></div>

<div align="center" markdown>

| Necesidad | Dónde empezar |
|:---|:---|
| Contexto de aplicación de un dispositivo vestible con numerosas funciones o de un terminal inteligente | Apéndice A: Un dispositivo vestible inteligente o terminal inteligente típico |
| Capturas de esquemáticos y ejemplos de circuito | Sección 5 y nota de aplicación de hardware SF32LB58x |
| Capturas del diseño de PCB para BGA, HDI, RF, DSI, USB, SDIO, audio y alimentación | Sección 6 y nota de aplicación de hardware SF32LB58x |

</div>

### 9.1. Apéndice A. Un dispositivo vestible inteligente o terminal inteligente típico { #appendix-a-a-typical-smart-wearable-or-smart-terminal }

Un diseño típico basado en SF32LB58x para un dispositivo vestible inteligente o un terminal inteligente incluye el MCU, el PMIC, una pantalla de alta resolución, un controlador táctil, almacenamiento de arranque, memoria externa o eMMC, sensores, un motor de vibración, entrada/salida de audio, una antena Bluetooth, cristales, USB e interfaces de depuración y de prueba en producción. El encapsulado BGA256 y las interfaces de pantalla y almacenamiento de alta velocidad hacen que la selección del proceso HDI forme parte de la arquitectura del sistema, no sea solo un detalle del diseño de PCB.

## 10. Historial de revisiones { #10-revision-history }

<div align="center"><em>Tabla 10-1: Historial de revisiones</em></div>

<div align="center" markdown>

| Versión | Fecha | Nota |
|:---|:---|:---|
| 1.0 | 2026-07 | Guía de diseño de hardware SF32LB58x actualizada con pautas de esquemático, PCB, validación y revisión de producción. |
| 0.0.1 | 1/2025 | Publicación del borrador oficial de `SF32LB58x-HW-Application`. |

</div>

### 10.1. Historial de revisiones de la lista de comprobación { #101-checklist-revision-history }

La lista punto por punto de la [lista de comprobación de esquemáticos](SF32LB58x_schematic_checklist.md) y la [lista de comprobación de diseño de PCB](SF32LB58x_pcb_layout_checklist.md) se versiona por separado de la guía, de acuerdo con el propio libro de trabajo *SF32LB58x Schematic & PCB Checklist* de SiFli.

<div align="center"><em>Tabla 10.1-1: Historial de revisiones de la lista de comprobación</em></div>

<div align="center" markdown>

| N.º | Versión | Fecha | Notas de la versión |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Primera publicación de la lista de comprobación de esquemático y PCB |

</div>
