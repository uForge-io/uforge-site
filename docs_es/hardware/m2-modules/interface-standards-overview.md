---
icon: lucide/cable
description: "Conozca las convenciones de interfaz de módulos M2 de μForge: use las reglas de nomenclatura para mantener términos coherentes y valide el borrador de asignación de pines antes de cerrar el diseño de la placa portadora."
tags:
    - Hardware
    - Módulos
    - Interfaz
---

# Estándares de interfaz de módulos { #module-interface-standards }

Esta sección presenta las convenciones para describir las interfaces de módulos de μForge. Consúltela antes de definir el conector o la asignación de pines de una placa portadora, o de declarar compatibilidad. Enlaza dos tipos de documentos: reglas de nomenclatura que establecen una terminología común y una propuesta de interfaz a nivel de pin que puede servir para planificar, pero debe validarse para el módulo y el producto seleccionados.

## Consulte los documentos en el orden adecuado { #use-the-documents-in-the-right-order }

<div align="center"><em>Tabla: Documentos de interfaz de módulos</em></div>

<div align="center" markdown>

| Documento | Estado y propósito | Cuándo usarlo |
|:----------|:-------------------|:--------------|
| [Reglas de nomenclatura de la interfaz M2](M2%20Interface%20Naming%20Rules.md) | Convención para nombrar familias y perfiles de interfaz M2. | Para nombrar un módulo, conector, placa portadora o perfil de interfaz en la documentación y los archivos de diseño. |
| [Definición de la interfaz M2](M2-interface-definition.md) | Borrador de definición de pines y propuesta de asignación de señales. | Para evaluar una interfaz M2 propuesta para una placa portadora o revisar el uso compartido de señales antes de elegir el conector. |

</div>

## Nomenclatura y compatibilidad eléctrica { #what-is-stable-and-what-must-be-verified }

Aplique las reglas de nomenclatura de forma coherente en las descripciones de módulos, esquemas, notas de BOM y documentación del producto. Los nombres describen el perfil de interfaz previsto, no una especificación eléctrica o mecánica definitiva. Ni un nombre de perfil ni una forma de conector coincidente demuestran que un módulo y una placa portadora sean intercambiables.

La definición a nivel de pin no garantiza que todos los módulos de μForge o encapsulados SF32 admitan todas las señales e interfaces asignadas ni todas las combinaciones de uso simultáneo. Antes de cerrar el diseño, contraste todos los puntos siguientes con el módulo, el chip y el encapsulado exactos que haya seleccionado y con la guía de diseño de hardware correspondiente:

- plano mecánico del conector, codificación mecánica, numeración de pines y restricciones de montaje;
- líneas de alimentación, dominios de tensión, capacidad de corriente y secuenciación;
- disponibilidad de interfaces, multiplexación de pines y funciones mutuamente excluyentes;
- integridad de señal, impedancia, igualación de longitudes de pista, ESD y requisitos de exclusión RF;
- acceso a depuración, arranque, recuperación y pruebas de producción; y
- requisitos de periféricos de pantalla, cámara, audio, almacenamiento e inalámbricos de la placa portadora.

## Proceso de decisión para la placa portadora { #carrier-board-decision-path }

1. Elija el módulo y lea su introducción y guía de diseño de hardware.
2. Use las [Reglas de nomenclatura de la interfaz M2](M2%20Interface%20Naming%20Rules.md) para definir sin ambigüedad el perfil previsto.
3. Use la [Definición de la interfaz M2](M2-interface-definition.md) para identificar señales candidatas y conflictos de uso compartido.
4. Confirme cada contacto usado en la documentación específica del módulo y en las fuentes de SiFli aplicables.
5. Antes de iniciar el diseño de PCB, registre en la revisión del esquema las versiones de los documentos, las revisiones del módulo y de la placa portadora, las excepciones confirmadas y los puntos pendientes.

Para revisar por completo la placa portadora, continúe con [Diseño para producción](../design-for-production.md). Para conocer los requisitos de implementación específicos del módulo, consulte la guía correspondiente en el grupo **Guías de diseño de hardware**.
