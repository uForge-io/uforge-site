---
icon: lucide/plug
description: "Reglas de nomenclatura de la interfaz de módulos M2 de μForge y sus extensiones M2xM/M2xA/M2xN/M2xH/M2xP, con ejemplos de declaración y principios de diseño."
tags:
  - Hardware
  - Módulos
  - Interfaz
---

# Reglas de nomenclatura de la interfaz M2 de μForge { #forge-m2-interface-naming-rules }

## Especificación base { #base-specification }

Este documento define los nombres utilizados en la propuesta de sistema de interfaces de módulos de μForge. Es una convención de nomenclatura, no una norma eléctrica o mecánica publicada.

En esta convención, **M2** identifica la interfaz base común obligatoria para los módulos que adopten el sistema. Este requisito no significa que todos los módulos actuales de μForge o SiFli implementen M2. La asignación de pines y los requisitos eléctricos y mecánicos de M2 siguen en desarrollo y no se especifican aquí.

Antes de describir M2 como compatible con M.2 E-key, una definición M2 publicada tendría que especificar la interfaz mecánica, la asignación de pines, los límites eléctricos, las señales obligatorias y opcionales, los requisitos de la placa portadora y las reglas de conformidad. La [Definición de la interfaz M2](M2-interface-definition.md) actual es un borrador: el nombre M2 por sí solo no demuestra compatibilidad eléctrica con M.2 ni que un módulo pueda utilizarse indistintamente con distintas placas portadoras.

## Especificaciones de extensión { #extension-specifications }

Las capacidades opcionales se agrupan en especificaciones de extensión **M2xY**. Los nombres identifican categorías funcionales, pero no garantizan que un módulo concreto implemente todas las funciones de una categoría.

**Formato de nomenclatura:**

> **M2xY**

Donde:

- **M2** = especificación de la interfaz base
- **x** = separador de extensión
- **Y** = categoría de extensión

## Categorías de extensión { #extension-categories }

<div align="center"><em>Categorías de extensión M2</em></div>

<div align="center" markdown>

| Especificación | Descripción |
|:---------------|:------------|
| **M2xM** | Multimedia: futuras capacidades de pantalla RGB, cámara DVP, micrófonos digitales y audio avanzado. |
| **M2xA** | Analógica: futuras capacidades de E/S analógica de precisión y adquisición de datos. |
| **M2xN** | Redes: futuras capacidades de Ethernet, CAN y redes industriales. |
| **M2xH** | Alta velocidad: futuras interfaces de gran ancho de banda. |
| **M2xP** | Alimentación: futuras capacidades de gestión de energía y E/S de alta corriente. |

</div>

Estas descripciones indican el alcance previsto de cada categoría, no requisitos eléctricos definitivos. La hoja de cálculo local de la propuesta contiene mapas de asignación de contactos para M2 y M2xM. El artículo de definición también resume M2xN y M2xA, pero no se encontraron mapas originales de asignación de contactos que permitan verificar esos resúmenes; deben considerarse no verificados. M2xH y M2xP son nombres reservados sin contactos asignados.

## Declaración del módulo { #module-declaration }

Un módulo que adopte esta convención declara **M2** como interfaz base y puede enumerar una o más extensiones implementadas. Su documentación también debe identificar los conectores reales, las funciones opcionales y los modos mutuamente excluyentes.

Ejemplos de declaración, no una lista de configuraciones de módulos oficialmente publicadas:

- **M2**
- **M2 + M2xM**
- **M2 + M2xA**
- **M2 + M2xM + M2xN**

## Principios de diseño { #design-principles }

- **M2** tiene como objetivo mantener la estabilidad y la compatibilidad con versiones anteriores a medida que evoluciona el sistema. La compatibilidad debe verificarse con las revisiones de especificación aplicables y la implementación real.
- Cada extensión **M2xY** tiene su propio alcance funcional. Los nombres distintos no implican que todas las funciones puedan operar simultáneamente ni que sus asignaciones de pines sean independientes.
- Las extensiones complementan la interfaz base, no la modifican ni la reemplazan.
- Los módulos anuncian sus capacidades indicando las especificaciones M2xY implementadas.

Antes de seleccionar un conector o afirmar la compatibilidad, siga el proceso de verificación de [Estándares de interfaz de módulos](interface-standards-overview.md).
