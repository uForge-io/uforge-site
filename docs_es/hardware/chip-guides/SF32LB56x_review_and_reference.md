---
icon: lucide/clipboard-check
description: "Lista de comprobación de revisión del diseño, documentos y referencias relacionados, apéndices e historial de revisiones de la guía de diseño de hardware SF32LB56x."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# Guía de diseño de hardware SF32LB56x: lista de comprobación de revisión del diseño y referencias { #sf32lb56x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Parte de la guía de diseño de hardware SF32LB56x"
    Esta página cubre las secciones 7 a 10: lista de comprobación de revisión, documentos y referencias, apéndices e historial de revisiones. Vuelva a las [directrices de diseño de PCB](SF32LB56x_pcb_layout.md).

## 7. Lista de comprobación de revisión del diseño { #7-design-review-checklist }

- [ ] Se han confirmado la variante U o V, el encapsulado, la asignación de pines y el proceso de fabricación de la PCB.
- [ ] Se han revisado las líneas de alimentación del procesador, las salidas del PMIC, los condensadores, el reset, el cargador y los interruptores de bajo consumo.
- [ ] Se han revisado los modos de funcionamiento, las fuentes de activación, las líneas de alimentación de las resistencias pull-up y las corrientes de fuga durante el modo de suspensión.
- [ ] Se han revisado los parámetros, la colocación y el trazado de los cristales de cuarzo de 48 MHz y 32,768 kHz.
- [ ] Se han completado la red de adaptación de RF, el diseño de la antena y el plan de sintonización.
- [ ] No hay conflictos en los pines de pantalla, almacenamiento, audio, sensores, PBR, UART/I2C, GPTIM, depuración y producción.
- [ ] Se han completado el fan-out QFN o BGA, el apilado de capas, la impedancia, el DRC y la estrategia ESD.
- [ ] Se han probado los flujos de programación de producción y calibración del cristal.

## 8. Documentos y referencias relacionados { #8-related-documents-and-references }

Consulte la documentación oficial más reciente para verificar límites eléctricos, datos del encapsulado, multiplexación de pines, configuración del software, cualificación de componentes y restricciones de fabricación.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Nota de aplicación de hardware SF32LB56xU]__
- :fontawesome-solid-file-lines: __[Nota de aplicación de hardware SF32LB56xV]__
- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados de SiFli (AVL)]__
- :fontawesome-brands-wikipedia-w: __[Índice de guías de diseño de hardware de chips SiFli (Wiki)]__

</div>

La [lista de comprobación del esquema](SF32LB56x_schematic_checklist.md) (sección 5.8) y la sección 6.3 de las [directrices de diseño de PCB](SF32LB56x_pcb_layout.md) reproducen punto por punto la misma *SF32LB56x Schematic & PCB Checklist* (V1.0, 2026-01-21), junto con las pautas de esquemático y diseño de PCB que verifica.

[Nota de aplicación de hardware SF32LB56xU]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Nota de aplicación de hardware SF32LB56xV]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[Lista de proveedores aprobados de SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Índice de guías de diseño de hardware de chips SiFli (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Apéndices { #9-appendices }

### 9.1. Apéndice A. Producto típico basado en SF32LB56x { #appendix-a-a-typical-sf32lb56x-product }

Un producto SF32LB56x típico incluye el MCU, el PMIC, la pantalla y el controlador táctil, el almacenamiento de arranque, memoria externa opcional, sensores, un motor de vibración, entrada y salida de audio, antena Bluetooth, cristales de cuarzo y conexiones para depuración y pruebas de producción. El encapsulado U favorece una implementación QFN compacta; el V admite más interfaces, pero requiere planificar el diseño BGA/HDI.

## 10. Historial de revisiones { #10-revision-history }

<div align="center"><em>Tabla 10-1: Historial de revisiones</em></div>

<div align="center" markdown>

| Versión | Fecha | Notas |
|:---|:---|:---|
| 0.1 | 2026-07 | Primera versión de la guía de diseño de hardware SF32LB56x, elaborada a partir de las notas oficiales de aplicación de hardware para SF32LB56xU y SF32LB56xV de la wiki de SiFli. |

</div>

### 10.1. Historial de revisiones de la lista de comprobación { #101-checklist-revision-history }

La lista punto por punto de la [lista de comprobación del esquema](SF32LB56x_schematic_checklist.md) y de la sección 6.3 de las [directrices de diseño de PCB](SF32LB56x_pcb_layout.md) se versiona por separado de la guía, de acuerdo con el propio libro de trabajo *SF32LB56x Schematic & PCB Checklist* de SiFli.

<div align="center"><em>Tabla 10.1-1: Historial de revisiones de la lista de comprobación</em></div>

<div align="center" markdown>

| N.º | Versión | Fecha | Notas de la versión |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Primera publicación de la lista de comprobación de esquemático y PCB |

</div>
