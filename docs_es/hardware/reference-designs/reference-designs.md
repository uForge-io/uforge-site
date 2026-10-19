---
icon: lucide/waypoints
description: "Compare los recorridos de diseño de referencia de μForge y elija el que más se acerque a su producto para seguir una ruta reproducible de validación de hardware y software."
tags:
    - Hardware
    - Diseño de referencia
---

# Diseños de referencia { #reference-designs }

Los diseños de referencia conectan la planificación del producto con la implementación. Una base reutilizable de hardware y software debe identificar el hardware de partida, la versión de software, los archivos de diseño disponibles, las evidencias de puesta en marcha y los límites de reutilización. Los recorridos de esta sección ayudan a establecer y validar esa base; su inclusión no demuestra que exista un esquemático, una BOM o un paquete de cualificación para producción publicados.

Use [Planificar un producto](../../sf32-products/family/product-planning.md) para elaborar una primera lista de candidatos y, después, elija el recorrido más parecido a su producto para organizar la validación de la placa y reducir los riesgos del producto.

## Diseños de referencia y proyectos { #reference-designs-and-projects }

Use un diseño de referencia para responder: **«¿Con qué base técnica reutilizable puedo empezar?»** Use un [proyecto](../../projects/index.md) para responder: **«¿Cómo llevo un producto concreto desde esa base hasta la integración y las decisiones de lanzamiento?»**

<div align="center"><em>Tabla: Límite entre diseño de referencia y proyecto</em></div>

<div align="center" markdown>

| Elemento | Diseño de referencia | Proyecto |
|:---------|:--------------------|:---------|
| Función principal | Una base técnica reutilizable. | Un recorrido específico del producto para la integración y las decisiones de liberación. |
| Evidencias principales | Base de hardware/software, archivos de diseño o su disponibilidad, resultados de puesta en marcha y límites de reutilización. | Decisiones de producto, dependencias, etapas de adaptación, puntos de control de validación y evidencias de lanzamiento. |
| Expectativa de reutilización | El lector puede adoptar y adaptar la base para varios productos. | El lector sigue el resultado de un producto concreto y después realiza cambios controlados específicos de ese producto. |
| Relación | Incluye enlaces a los proyectos que la adoptan. | Cuando corresponda, enlaza al diseño de referencia del que parte. |

</div>

## Recorridos disponibles { #available-journeys }

El recorrido actual de Wearable conectado es un flujo de validación, no un paquete publicado de una placa de referencia. Todavía no publica una combinación fija de revisiones de placa y SDK, una entrega de archivos de diseño ni un registro de cualificación basado en mediciones. Establezca y registre esas bases para su producto antes de considerar reproducibles los resultados.

<div align="center"><em>Tabla: Recorridos de diseño de referencia</em></div>

<div align="center" markdown>

| Recorrido | Enfoque del producto | Base de hardware | Base de software | Prioridades de validación |
|:----------|:---------------------|:-----------------|:----------------|:--------------------------|
| [Wearable conectado](connected-wearable-journey.md) | Producto compacto con batería, pantalla, BLE y entrada de sensores. | SF32LB52-DevKit-LCD o una placa alternativa adecuada, seguida de una placa personalizada basada en el chip o módulo seleccionado. | `hello_world` de SiFli-SDK y ejemplos relevantes para el producto. | Pantalla, Bluetooth, sensores, suspensión/activación, recuperación y evidencias del diseño para producción. |

</div>

## Cómo usar un recorrido { #how-to-use-a-journey }

1. Confirme que el enfoque del producto y el hardware seleccionado encajan con las restricciones del diseño.
2. Reproduzca la base de software en la placa indicada antes de adaptarla.
3. Conserve con el registro del proyecto la placa exacta, la versión del SDK, el ejemplo, el comando de compilación y grabación y el registro del puerto serie.
4. Añada validaciones específicas del producto para cada cambio en la pantalla, el dispositivo de memoria, la ruta de batería, el diseño RF, la carcasa o la interfaz.
5. Use los resultados como entradas para [Diseño para producción](../design-for-production.md), incluyendo la guía y la lista de comprobación seleccionadas, las decisiones de la AVL, el método de recuperación y los riesgos restantes.

## Añadir un nuevo recorrido { #adding-a-new-journey }

Antes de presentar un recorrido como base de referencia reproducible, documente el producto y el público previstos, las versiones de hardware y software compatibles, los requisitos previos, el repositorio fuente, los hitos, los criterios de validación, las mediciones y el traspaso para adaptar el producto. Si todavía es un flujo de planificación, indique ese estado y las evidencias pendientes, sin dar a entender que la base ya está cualificada.

Para desarrollos de producto de principio a fin que van más allá de una base reutilizable, consulte [Proyectos](../../projects/index.md). El proyecto debe enlazar al diseño de referencia pertinente, en lugar de duplicar su base de hardware, archivos de diseño o documentación de producción.
