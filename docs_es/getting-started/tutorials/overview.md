---
icon: lucide/map
description: "Una hoja de ruta práctica de tutoriales de SF32 organizada por resultado de ingeniería: primeros periféricos, subsistemas conectados y validación de producto."
tags:
    - Tutoriales
---

# Resumen de tutoriales { #tutorials-overview }

Esta serie convierte un primer flasheo exitoso en habilidades prácticas de desarrollo en SF32. Está organizada por alcance de ingeniería: primero comprobar un periférico, después combinar subsistemas y, por último, reunir la evidencia necesaria para un producto. Los tutoriales parten de ejemplos de SiFli-SDK, pero las buenas prácticas —verificar el hardware, conservar una configuración de referencia comprobada y medir los resultados— se aplican a cualquier entorno de software para SF32.

Los tutoriales son la segunda etapa de [Primeros pasos](../index.md). Complete antes sus criterios de éxito de la primera puesta en marcha. Si está eligiendo un chip, un módulo o una placa de desarrollo, empiece por la [Familia SF32](../../sf32-products/family/SF32_family.md) antes de iniciar la serie.

## Qué necesita { #what-you-need }

Utilice una placa de desarrollo SF32 con una conexión de datos USB funcional y consola serie. Por ejemplo, `sf32lb52-lcd_n16r8` es el nombre de placa de SiFli-SDK para la SF32LB52-DevKit-LCD_N16R8. La serie no presupone que una misma placa admita todos los ejercicios: consulte la lista de plataformas compatibles de cada ejemplo y verifique los pines, periféricos, pantalla, audio y almacenamiento en el esquemático y los archivos de la placa correspondientes. Para consultar los identificadores de placa de SF32LB52x en el SDK, usa la lista oficial de [placas compatibles](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html).

<div align="center"><em>Tabla: Requisitos previos del tutorial</em></div>

<div align="center" markdown>

| Elemento | Comprobación mínima de preparación |
|:-----|:------------------------|
| Cadena de herramientas | SiFli-SDK puede compilar un ejemplo probado para su placa. |
| Flujo de flasheo | Puede programar la placa repetidamente sin cambiar la configuración. |
| Consola serie | Puede ver los registros de arranque y acceder al prompt `msh>` de FinSH. |
| Información de la placa | Dispone del esquemático de la placa o de los archivos de soporte antes de asignar pines o periféricos. |
| Herramientas de medición | Utilice un multímetro o analizador lógico cuando sea útil; para trabajar en bajo consumo, utilice un montaje de medición de corriente. |

</div>

## Ruta de aprendizaje recomendada { #recommended-learning-path }

<div align="center"><em>Tabla: Hoja de ruta de los tutoriales</em></div>

<div align="center" markdown>

| Ruta por resultado | Empiece cuando | Practicará | Continuar con |
|:------|:-----------|:------------------|:--------------|
| [Primeros pasos con los periféricos](beginner.md) | `hello_world` se compila y se flashea, y funciona la salida serie. | GPIO, FinSH, ADC, PWM, RTC y un pequeño proyecto a nivel de placa. | Continúe cuando pueda comprobar por su cuenta una entrada, una salida y un periférico básico. |
| [Integración de subsistemas](intermediate.md) | Cada periférico funciona de forma fiable por separado. | Sensores I2C, LVGL, BLE, audio, almacenamiento y pruebas planificadas de coexistencia. | Continúe cuando dos subsistemas reales funcionen juntos de forma estable. |
| [Validación de producto](advanced.md) | Puede integrar middleware y diagnosticar fallos habituales. | Consumo medido, recuperación OTA, pantallas personalizadas, análisis de fallos, BLE con múltiples conexiones y controladores reutilizables. | Consulte los artículos pertinentes de Desarrollo y Aprendizaje como referencia continua para la implementación. |

</div>

El orden es deliberado. No empiece con una pantalla, un servicio BLE o un controlador personalizado hasta que la placa, el flujo de flasheo, la consola serie y una prueba simple de GPIO sean fiables. Cuando un tutorial posterior falle, vuelve a la última etapa cuyo criterio de éxito todavía pueda reproducir.

## Cómo usar cada tutorial { #how-to-use-each-tutorial }

Cada ejercicio identifica un ejemplo del SDK adecuado como punto de partida, un objetivo, un criterio de éxito y las comprobaciones probables en caso de fallo. Empiece desde el ejemplo indicado en lugar de un proyecto vacío, cambie un comportamiento cada vez y conserve una compilación comprobada antes de combinar funciones. Anote la revisión de la placa, la versión del SDK, el nombre de placa y el resultado observado para cualquier configuración que prevea reutilizar.

Los tutoriales no sustituyen la documentación de referencia:

- Utilice el [Panorama del desarrollo](../../develop/index.md) para los flujos de trabajo de la plataforma, las herramientas, los temas de firmware y el índice consolidado de ejemplos del SDK.
- Utilice [Aprendizaje](../../learn/graphics/overview.md) para las decisiones de arquitectura y subsistema, como el flujo de procesamiento gráfico, el comportamiento de Bluetooth y la estrategia de consumo.
- Utilice la [Familia SF32](../../sf32-products/family/SF32_family.md) para la selección de dispositivo, la información de placas, la guía de diseño de hardware y las comprobaciones de producción.
