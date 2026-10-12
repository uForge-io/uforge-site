---
icon: lucide/code
description: "Evalúe el soporte comunitario de Rust para SF32 mediante sifli-rs de OpenSiFli (sifli-hal y sifli-pac): madurez actual, escenarios adecuados y no adecuados, y lista de riesgos."
tags:
    - Desarrollo
    - Rust
---

# Rust { #rust }

OpenSiFli desarrolla código Rust en [OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs), que incluye HAL, PAC, crates para tablas Flash, ejemplos y notas sobre grabación de la memoria Flash y depuración.

Los responsables del mantenimiento describen el proyecto como trabajo en curso y aún no apto para producción. Considere Rust en SF32 una vía exploratoria, salvo que su equipo esté dispuesto a trabajar a bajo nivel y aportar correcciones al proyecto de origen.

Para configurar la cadena de herramientas y el ejecutor de grabación, y compilar Blinky sin modificar, consulte [Primeros pasos con Rust](../../../getting-started/rust/getting-started-rust.md). Esta página ayuda a evaluar el alcance del soporte y decidir si conviene ir más allá de esa base.

## Crates mencionados por OpenSiFli { #crates-mentioned-by-opensifli }

<div align="center"><em>Tabla: Crates mencionados por OpenSiFli</em></div>

<div align="center" markdown>

| Crate | Propósito |
|:------|:----------|
| `sifli-hal` | Capa de abstracción de hardware. |
| `sifli-pac` | Crate de acceso a periféricos. |
| `sifli-flash-table` | Compatibilidad con tablas Flash. |

</div>

## Cuándo tiene sentido Rust { #when-rust-makes-sense }

Rust puede ser una buena opción si desea:

- Experimentar con Rust para sistemas embebidos.
- Aplicar tipado fuerte al código de firmware de bajo nivel.
- Avanzar hacia drivers de estilo `embedded-hal` en el futuro.
- Contribuir al ecosistema Rust de SF32.

Para firmware de producción actual, use SiFli-SDK.

## Hitos de evaluación { #evaluation-gates }

No inicie la adaptación a un producto hasta que la configuración de referencia para los primeros pasos funcione en la placa de destino. Después, establezca una prueba independiente para cada periférico, distribución Flash, ruta de depuración y función de ejecución requerida. Registre con cada resultado el commit upstream, el destino Rust, la configuración de Cargo, la revisión de la placa y el procedimiento de recuperación.

El uso de `sifli-hal`, `sifli-pac`, herramientas para tablas Flash y ejemplos asíncronos de estilo Embassy en el repositorio implica que el éxito de una aplicación también depende de cómo interactúan, no solo de que compile un crate. Al evaluar una carencia, conserve el caso mínimo que la reproduce.

## Lista de comprobación de riesgos { #risk-checklist }

- ¿El crate es compatible con el chip exacto?
- ¿La HAL cubre el periférico necesario?
- ¿La distribución Flash es compatible con la placa?
- ¿Está documentado el flujo de depuración para la sonda/herramienta utilizada?
- ¿Se puede recuperar la misma placa con SiFli-SDK o `sftool`?
- ¿El equipo está preparado para contribuir correcciones?

## Adecuado / no adecuado { #good-fit-poor-fit }

<div align="center"><em>Tabla: Usos adecuados y no adecuados de Rust</em></div>

<div align="center" markdown>

| Adecuado | No adecuado |
|:---------|:------------|
| Experimentos y exploración de drivers. | Calendario de producción que requiere soporte del proveedor. |
| Equipos que ya usan Rust embebido. | Productos que necesitan ahora pilas completas de Bluetooth, pantalla y audio. |
| Contribuir a la madurez de HAL/PAC. | Prototipos puntuales donde Arduino o los ejemplos del SDK permiten avanzar antes. |

</div>
