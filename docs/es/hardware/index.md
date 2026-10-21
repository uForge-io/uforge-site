---
icon: lucide/cpu
title: Hardware
description: Reutilice un diseño de referencia de SF32 o diseñe con el dispositivo elegido y prepare el diseño para producción.
---

# Hardware { #hardware }

Después de elegir un dispositivo SF32 y validar una configuración básica en una placa de desarrollo, use esta sección para diseñar la placa o la placa portadora del módulo y preparar el producto para producción. Reutilice un diseño de referencia si encaja, siga la guía del dispositivo elegido y reúna las evidencias y la documentación necesarias para la revisión de preparación para producción.

## Elija por dónde empezar { #choose-a-starting-point }

<div align="center"><em>Rutas de diseño de hardware</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Su tarea | Empiece aquí | Resultado |
|:---------|:-------------|:----------|
| Reutilizar una configuración de hardware y software validada | [Diseños de referencia](reference-designs/reference-designs.md) | Un punto de partida reproducible, qué se valida y hasta dónde puede reutilizarse. |
| Diseñar una placa alrededor del chip o una placa portadora para un módulo | [Buscar la guía adecuada](#find-a-guide) | La guía de diseño correspondiente al chip o módulo y la lista de comprobación disponible. |
| Planificar una interfaz de módulo según la propuesta M2 | [Módulos M2](m2-modules/interface-standards-overview.md) | Las reglas de nomenclatura M2 y el borrador de asignación de pines que debe contrastarse con el módulo elegido. |
| Preparar los recursos de CAD y BOM | [CAD y componentes](cad-components/components-and-cad-libraries.md) | Bibliotecas EDA oficiales, recursos AVL y comprobaciones para el componente seleccionado. |
| Liberar un paquete de diseño | [Diseño para producción](design-for-production.md) | Revisión de preparación para producción, evidencias que conservar y traspaso a fabricación. |

</div>

## Buscar una guía { #find-a-guide }

Elija el chip o módulo principal del diseño y consulte la guía correspondiente. Si aún debe confirmar el encapsulado, la alimentación, la configuración de memoria o la forma de integración, empiece por la introducción del producto.

### Guías y listas de comprobación para chips { #chip-guides-and-checklists }

<div align="center"><em>Tabla: Guías y listas de comprobación para chips</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Familia de chips seleccionada | Guía de diseño de hardware | Lista de comprobación | Empiece aquí para |
|:------------------------------|:---------------------------|:----------------------|:------------------|
| SF32LB52x | [Guía](chip-guides/SF32LB52x_hardware_design_guide.md) | [Lista](chip-guides/SF32LB52x_hardware_design_guide.md#using-the-checklists) | Diseñar una placa chip-down con el SF32LB52x. |
| SF32LB55x | [Guía](chip-guides/SF32LB55x_hardware_design_guide.md) | [Lista](chip-guides/SF32LB55x_hardware_design_guide.md#using-the-checklists) | Diseñar una placa chip-down con el SF32LB55x. |
| SF32LB56x | [Guía](chip-guides/SF32LB56x_hardware_design_guide.md) | [Lista](chip-guides/SF32LB56x_hardware_design_guide.md#using-the-checklists) | Diseñar una placa chip-down con el SF32LB56x. |
| SF32LB57x | [Guía](chip-guides/SF32LB57x_hardware_design_guide.md) | [Esquemático](chip-guides/SF32LB57x_schematic_checklist.md) / [Diseño de PCB](chip-guides/SF32LB57x_pcb_layout_checklist.md) | Diseñar una placa chip-down con el SF32LB57x. |
| SF32LB58x | [Guía](chip-guides/SF32LB58x_hardware_design_guide.md) | [Lista](chip-guides/SF32LB58x_hardware_design_guide.md#using-the-checklists) | Diseñar una placa chip-down con el SF32LB58x. |

</div>

### Guías de módulos { #module-guides }

<div align="center"><em>Tabla: Guías de integración de módulos</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Módulo seleccionado | Guía del módulo | Uso |
|:--------------------|:----------------|:----|
| SF32LB52-MOD-1 | [Guía del módulo](chip-guides/SF32LB52-MOD-1_hardware_design_guide.md) | Alimentación de la placa portadora, planificación de pines, zona libre alrededor de la antena y precauciones de manipulación durante la fabricación. |
| SF32LB56-MOD | [Guía del módulo](chip-guides/SF32LB56-MOD_hardware_design_guide.md) | Integración en la placa portadora, alimentación, disposición de los circuitos RF, interfaces y validación. |
| SF32LB58-MOD | [Guía del módulo](chip-guides/SF32LB58-MOD_hardware_design_guide.md) | Alimentación de la placa portadora, planificación de pines, zona libre alrededor de la antena y precauciones de manipulación durante la fabricación. |

</div>

## Siga el proceso de diseño de hardware { #follow-the-hardware-path }

1. **Reutilice un diseño de referencia cuando sea adecuado.** Antes de adaptarlo, reproduzca la configuración de hardware y software que especifica. Si no hay un diseño que encaje, empiece por la guía del dispositivo seleccionado.
2. **Implemente y revise.** Consulte la guía correspondiente antes de preparar el esquemático; después, use su lista de comprobación al revisar el esquemático y el diseño de la PCB. Antes de cerrar el diseño de hardware, valide el software y los periféricos previstos en la [placa de desarrollo](../sf32-products/index.md) más parecida. Las pruebas en la placa de desarrollo no sustituyen la validación de la alimentación, las funciones de los pines y la RF en la placa final.
3. **Consulte la documentación M2 si la placa portadora va a seguir la propuesta M2.** Aplique las [reglas de nomenclatura M2](m2-modules/M2%20Interface%20Naming%20Rules.md) y confirme la [definición de interfaz](m2-modules/M2-interface-definition.md) con el módulo exacto antes de fijar la interfaz; la definición de pines sigue siendo un borrador.
4. **Verifique los archivos CAD y la selección de componentes.** Use [CAD y componentes](cad-components/components-and-cad-libraries.md) para cotejar, para el número de pieza exacto, el símbolo, la huella, el plano del encapsulado, la AVL y las hipótesis sobre componentes críticos.
5. **Cierre el criterio de liberación del diseño.** Continúe con [Diseño para producción](design-for-production.md) cuando tenga las evidencias del diseño, las desviaciones aprobadas, los riesgos pendientes y las hipótesis de las pruebas de fabricación.

## Continúe el desarrollo { #stay-connected-to-the-platform-path }

Si aún no ha decidido qué dispositivo, módulo o placa elegir, vuelva a [Productos SF32](../sf32-products/index.md). Para preparar una base reproducible de cadena de herramientas, grabación y registro serie, consulte [Primeros pasos](../getting-started/index.md). Vaya a [Desarrollo](../develop/index.md) para consultar la implementación de software que también debe validarse con el hardware.
