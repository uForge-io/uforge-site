---
icon: lucide/clipboard-check
description: "Punto de partida para diseñar hardware SF32 para producción: guías de diseño de chips y módulos, listas de comprobación, definiciones de interfaz, componentes aprobados y bibliotecas EDA."
tags:
    - Hardware
    - Producción
---

# Diseño para producción { #design-for-production }

Use este proceso después de seleccionar un chip o módulo y antes de publicar un esquema, un diseño de PCB, una BOM o un paquete de fabricación. Reúne las referencias de implementación que ayudan a reducir el riesgo durante la primera puesta en marcha y la cualificación: guías de diseño de hardware específicas del dispositivo, listas de comprobación, definiciones de interfaz de módulos, componentes aprobados y bibliotecas EDA.

## Secuencia de producción recomendada { #recommended-production-sequence }

Use esta secuencia como un ciclo de revisión, no como una entrega única. Compruebe símbolos y huellas antes de fabricar el prototipo; libere los archivos CAD y el paquete de fabricación para producción solo después de revisar el diseño y validar el hardware previsto para producción. Repita las comprobaciones afectadas cuando cambien la placa, el firmware o la BOM.

<div align="center"><em>Tabla: Secuencia de diseño para producción</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Etapa | Consulte | Evidencia que debe conservar |
|:------|:---------|:-----------------------------|
| Arquitectura | Introducción del producto y requisitos de interfaz | Pieza, encapsulado, memoria, pantalla, audio, almacenamiento y supuestos de alimentación elegidos. |
| Esquema y diseño de PCB | Guía de diseño de hardware del chip o módulo | Implementación revisada de alimentación, reloj, reset, RF, almacenamiento, pantalla e interfaces. |
| BOM | Lista de proveedores aprobados (AVL) y hojas de datos de componentes | Alternativas cualificadas o validadas específicamente para cada componente crítico. |
| Revisión de diseño | Lista de comprobación de diseño de hardware | Resolución documentada de cada punto aplicable y cada excepción. |
| Puesta en marcha | Referencias de placas de desarrollo, ejemplos del SDK y pruebas con mediciones | Resultados reproducibles de arranque, programación, periféricos, conectividad inalámbrica, consumo de energía y recuperación. |
| Liberación de CAD para producción | Bibliotecas EDA oficiales y planos del encapsulado | Símbolo, huella, distribución de pines, patrón de pads y archivos de fabricación verificados. |

</div>

## Use la referencia adecuada para el producto elegido { #use-the-right-reference-for-the-chosen-product }

Use estos puntos de entrada para encontrar las referencias de cada tarea de implementación:

- **[Guías de diseño de hardware](index.md#find-a-guide)** ofrecen orientación específica para cada chip sobre esquema, diseño de PCB, alimentación, interfaces y puesta en marcha, además de pautas para integrar módulos en una placa portadora. Cuando exista, use la lista de comprobación correspondiente; consulte primero la introducción del módulo para confirmar que encaja con la arquitectura del producto.
- **[Módulos M2](m2-modules/interface-standards-overview.md)** incluyen las reglas de nomenclatura M2 de μForge y el borrador de una definición de interfaz a nivel de pin. La definición es una propuesta: valídela antes de comprometer un diseño de producción.
- **[CAD y componentes](cad-components/components-and-cad-libraries.md)** contienen el [AVL de SiFli](cad-components/sifli-approved-vendor-list.md) y [bibliotecas EDA oficiales](cad-components/eda-tool-libraries.md). Ninguno sustituye la verificación final con la pieza y el plano del encapsulado exactos, ni con la guía de diseño seleccionada.

## Una referencia de producción no sustituye la validación { #a-production-reference-is-not-a-substitute-for-validation }

Las guías de diseño y las listas de componentes cualificados reducen el riesgo, pero no demuestran que el producto terminado esté validado. Verifique la revisión final de la PCB, la imagen de firmware, la carcasa, la batería, la pantalla, el dispositivo de almacenamiento, el comportamiento RF, el entorno de operación y el flujo de pruebas de fabricación. Registre las diferencias respecto a una guía o lista como decisiones de ingeniería explícitas, no como excepciones sin documentar.
