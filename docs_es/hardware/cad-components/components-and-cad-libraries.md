---
icon: lucide/boxes
description: "Utilice registros de cualificación de componentes y datos CAD oficiales en un diseño SF32 para producción; después, revise la BOM y el diseño de PCB en el orden adecuado."
tags:
    - Hardware
    - Producción
    - CAD
---

# Componentes y bibliotecas CAD { #components-and-cad-libraries }

Use esta página cuando un dispositivo o módulo SF32 seleccionado pase de la decisión de arquitectura a una BOM y un diseño de PCB controlados. Los dos recursos siguientes cumplen funciones distintas: la **Lista de proveedores aprobados (AVL)** ayuda a elegir componentes cualificados por SiFli, mientras que las **Bibliotecas de herramientas EDA** proporcionan los símbolos, las huellas y los datos de proyectos de referencia necesarios para implementar correctamente el hardware elegido.

Ninguno de estos recursos sustituye la guía de diseño de hardware específica del dispositivo, el plano del encapsulado ni la validación final en una placa destinada a producción.

## Elija el recurso adecuado { #choose-the-right-resource }

<div align="center"><em>Tabla: Recursos de componentes y CAD</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Recurso | Uso | No sustituye a |
|:--------|:----|:---------------|
| [Lista de proveedores aprobados para SF32](sifli-approved-vendor-list.md) | Seleccionar cristales, inductores, Flash y otros componentes compatibles ya cualificados; comprobar restricciones eléctricas y de identificación por firmware. | Aprobación final de componentes, cualificación de la cadena de suministro o validación eléctrica del producto. |
| [Bibliotecas de herramientas EDA](eda-tool-libraries.md) | Obtener símbolos esquemáticos, huellas de PCB, planos de encapsulado y recursos de diseños de referencia como punto de partida en las herramientas EDA compatibles. | Verificación de la referencia exacta del componente disponible para pedido, las definiciones de pad stack, el proceso de montaje o la documentación vigente del dispositivo. |

</div>

## Secuencia de revisión desde la BOM hasta CAD { #bom-to-cad-review-sequence }

1. **Fije la base de implementación.** Seleccione el chip o módulo exacto, el encapsulado, la configuración de memoria, la interfaz de pantalla y la arquitectura de alimentación. Consulte la guía de diseño de hardware antes de elegir los componentes asociados.
2. **Preseleccione los componentes críticos con el AVL.** Compruebe los requisitos eléctricos indicados, no solo que coincida el número de pieza. Preste especial atención a la capacitancia de carga y el ESR del cristal, los límites de corriente del inductor del convertidor reductor, la tensión y el modo de temporización de la Flash, el rango de temperatura y la compatibilidad del firmware.
3. **Cree el esquema con las bibliotecas oficiales.** Use como punto de partida las bibliotecas EDA y los diseños de referencia pertinentes. Compare de forma independiente cada símbolo, huella, número de pin, patrón de pads y regla de zona de exclusión con la hoja de datos vigente y el plano del encapsulado de la pieza elegida.
4. **Revise conjuntamente la BOM y el diseño.** Compruebe que todos los componentes cualificados siguen siendo compatibles con la tensión y la corriente reales de los raíles, la velocidad de las interfaces, el proceso de montaje y las restricciones de la carcasa. Aplique los requisitos de la guía del dispositivo o módulo para alimentación, RF, relojes, memoria, pantalla y acceso de depuración.
5. **Valide el hardware previsto para producción.** Pruebe el arranque, la programación, los periféricos, la conectividad inalámbrica y la recuperación, y mida el consumo de energía en la revisión final de la placa. Registre las alternativas aprobadas y cada desviación deliberada respecto a la guía o al AVL.

## Límites prácticos { #practical-boundaries }

- El AVL es una instantánea de la cualificación. Antes de publicar una BOM de producción, vuelva a confirmar su revisión y la disponibilidad de los componentes.
- Una biblioteca EDA proporciona datos de diseño iniciales, no una prueba de que un diseño terminado sea fabricable o eléctricamente correcto.
- Si un componente no aparece en el AVL, evalúelo según los requisitos pertinentes y valídelo en el hardware de destino antes de usarlo en producción en serie.
- Para un producto basado en módulos, empiece por la guía de diseño del módulo; la BOM y el diseño de la placa portadora siguen requiriendo la misma disciplina de revisión.

Consulte [Diseño para producción](../design-for-production.md) para ver el proceso completo de revisión de diseño, o vuelva al [selector de productos SF32](../../sf32-products/product-selector.md) si aún no ha elegido la base de chip, módulo o placa.
