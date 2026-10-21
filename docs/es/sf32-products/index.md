---
icon: lucide/cpu
title: "Productos SF32"
description: "Explore el hardware SF32, planifique un producto, elija un chip, módulo o placa de desarrollo, reutilice un diseño de referencia y prepare un diseño para producción."
tags:
    - Hardware
    - Descripción general
---

# Productos SF32 { #sf32-products }

La sección Productos SF32 le ayuda a convertir una idea de producto en un diseño basado en SF32 que pueda llevar a la práctica. Aquí puede conocer la familia SF32, elegir y validar el hardware, encontrar una base técnica reutilizable y acceder a la documentación necesaria para preparar el diseño para producción.

## Elija por dónde empezar { #choose-your-starting-point }

<div align="center"><em>Rutas para elegir el hardware</em></div>

<div align="center" markdown>

| Lo que necesita hacer | Empiece aquí | Qué encontrará |
|:----------|:-----------|:--------------------|
| Conocer la familia SF32 | [Entender la familia SF32](family/SF32_family.md) | Una comparación de las familias y las reglas para interpretar la referencia de un dispositivo disponible para pedido. |
| Convertir una idea en un plan | [Planificar un producto](family/product-planning.md) | Un proceso por etapas: desde los requisitos y la elección inicial del dispositivo hasta la validación de la placa y la preparación para producción. |
| Elegir un chip o módulo | [Selector de productos SF32](product-selector.md) | Una herramienta interactiva para crear una preselección de chips y módulos, consultar los criterios de selección y acceder a las presentaciones de producto. Las placas de desarrollo se catalogan aparte para la validación. |
| Reutilizar una base técnica | [Diseños de referencia](../hardware/reference-designs/reference-designs.md) | Bases reproducibles de hardware y software, qué se ha validado y qué partes pueden reutilizarse. |
| Liberar el diseño de una placa para producción | [Diseño para producción](../hardware/design-for-production.md) | Guías de diseño, listas de comprobación, definiciones de interfaces, componentes incluidos en la lista aprobada y bibliotecas EDA oficiales. |

</div>

## Qué cubre esta sección { #what-this-section-covers }

Empiece por la [visión general de la familia SF32](family/SF32_family.md) para conocer las familias disponibles y sus principales diferencias de capacidad. Cuando haya acotado la familia y el encapsulado, consulte las [reglas de nomenclatura](family/SF32_namingrule.md) para interpretar el número de pieza completo.

Use el [selector de productos SF32](product-selector.md) si la arquitectura de alimentación, el encapsulado, la pantalla, el audio, la memoria, las GPIO, la conectividad u otras funciones especializadas determinan la elección. El selector sirve para crear una lista inicial de candidatos; el número de pieza exacto, el encapsulado, los límites eléctricos y el enrutamiento a nivel de placa deben confirmarse igualmente en la documentación correspondiente de SiFli.

Una vez definida la dirección del diseño, continúe con los [diseños de referencia](../hardware/reference-designs/reference-designs.md) y la [preparación para producción](../hardware/design-for-production.md). Allí podrá relacionar la elección del dispositivo con el hardware de referencia, las recomendaciones de diseño, las bibliotecas CAD, las decisiones sobre la BOM, las listas de comprobación de revisión y los resultados documentados de la puesta en marcha.

## Ir directamente al hardware { #browse-hardware-directly }

¿Ya sabe qué tipo de hardware necesita? Vaya directamente al catálogo correspondiente:

- [Chips](family/SF32_family.md): información sobre las familias y la selección del dispositivo.
- [Módulos](modules/SF32LB52-MOD-1.md): planificación de una placa portadora a partir de un módulo con los circuitos principales y la sección de RF ya integrados.
- [Placas de desarrollo](devkits/SF32LB52-DevKit-LCD.md): hardware compatible para validar el software y los periféricos.

La documentación de hardware cubre la implementación física del producto. Para configurar el SDK, consultar ejemplos y cadenas de herramientas, o comprobar el soporte de las plataformas de software, continúe en [Desarrollo](../develop/index.md).
