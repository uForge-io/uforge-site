---
icon: lucide/route
description: "Ruta completa de planificación de un producto SF32: elija el dispositivo y el nivel de integración, valide el software en una placa y prepare el diseño para producción."
tags:
    - Hardware
    - Planificación de producto
---

# Planificar un producto { #plan-a-product }

Esta guía organiza las decisiones necesarias para llevar un concepto basado en SF32 desde los requisitos iniciales, pasando por la validación, hasta un plan de diseño listo para producción. Siga las etapas en orden mientras sigan sin definirse el chip, el módulo, la placa de desarrollo, la plataforma de software y el enfoque de fabricación.

## Ruta de planificación de producto { #product-planning-path }

<div align="center"><em>Tabla: ruta de planificación de producto SF32</em></div>

<div align="center" markdown>

| Etapa | Decisión clave | Empiece aquí | Criterio de salida |
|:------|:-------------|:-----------|:---------------|
| 1. Definir los requisitos | Rol del dispositivo en la conexión inalámbrica, pantalla, audio, IA, almacenamiento, alimentación y presupuesto de consumo energético, área ocupada por el encapsulado y vida útil prevista del producto. | [Familia SF32](SF32_family.md) | Lista priorizada de candidatos con las interfaces obligatorias y las restricciones claramente definidas. |
| 2. Elegir el nivel de integración | PCB personalizada con el chip montado directamente, módulo con una placa portadora o placa de desarrollo para la validación inicial. | [Selector de productos SF32](../product-selector.md) | Un dispositivo y un enfoque de integración preferidos, junto con la placa o el módulo disponible más cercano. |
| 3. Validar el entorno de software de referencia | Cadena de herramientas, proceso de grabación, salida serie y un ejemplo de referencia que funcione en la placa seleccionada o en la más cercana. | [Primeros pasos](../../getting-started/index.md) | Proceso reproducible de compilación y grabación, con el registro de consola capturado. |
| 4. Validar los riesgos del producto | Comportamiento específico del producto en pantalla, Bluetooth, audio, IA y almacenamiento, además de la ruta de alimentación y el perfil de consumo energético. | [Tutoriales](../../getting-started/tutorials/overview.md), [Aprender](../../learn/index.md) y [Desarrollo](../../develop/index.md) | Resultados medidos de los subsistemas que condicionan el coste, el consumo o el plazo. |
| 5. Cerrar el plan de implementación | Esquemático, diseño de PCB, planificación de memoria y particiones, BOM, estrategia de pruebas, comportamiento de actualización y recuperación, y supuestos de fabricación. | [Diseño para producción](../../hardware/design-for-production.md) | Paquete de diseño revisado y lista explícita de las validaciones pendientes. |

</div>

## No omita el ciclo de validación en placa { #do-not-skip-the-board-validation-loop }

Comparar la familia y conseguir que el proyecto compile no basta para seleccionar el dispositivo de producción. Antes de cerrar el diseño de hardware, valide la placa que más se aproxime al producto y registre su nombre, la versión del SDK, el ejemplo del SDK utilizado, los resultados medidos y las diferencias frente al diseño previsto. Si el producto final incorpora una pantalla, un componente de almacenamiento, una ruta de alimentación por batería, una antena o una placa portadora de módulo distintos, trate cada uno como un elemento de validación independiente.

Una vez establecida la base inicial de hardware y software, elija el [diseño de referencia](../../hardware/reference-designs/reference-designs.md) más cercano para disponer de un recorrido completo con un ejemplo práctico.

## Lista de comprobación para el traspaso { #handoff-checklist }

- [ ] El chip o módulo elegido cumple los requisitos del producto en cuanto a interfaces, memoria, encapsulado, alimentación y consumo energético.
- [ ] Se dispone de una placa compatible o de un plan concreto para validar el hardware personalizado.
- [ ] El equipo de producto acepta la plataforma de software y su nivel de madurez.
- [ ] Antes de cerrar las decisiones sobre particiones y BOM, están definidos los requisitos de recuperación, OTA/DFU, registro y programación en fábrica.
- [ ] Se han identificado la guía de diseño de hardware, la lista de comprobación, el AVL y la biblioteca EDA adecuados.

!!! note "Contenido generado automáticamente"
    Esta página se recopiló y redactó sin un documento fuente específico. Verifique las afirmaciones técnicas con la documentación oficial de SiFli antes de basarse en ellas.
