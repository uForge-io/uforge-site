---
icon: lucide/code-2
title: "Panorama del desarrollo"
description: "Guía práctica para desarrollar productos SF32 con SiFli-SDK: flujo de trabajo, notas de aplicación, ejemplos, herramientas, temas de firmware y opciones de la comunidad."
tags:
    - Desarrollo
    - Software
---

# Panorama del desarrollo { #develop }

La sección de desarrollo explica cómo convertir una placa SF32 funcional en un firmware de producto mantenible. Úsela después de ejecutar `hello_world` por primera vez para elegir la configuración de placa, repetir compilaciones y grabaciones, adaptar un ejemplo adecuado, integrar funciones del producto, diagnosticar fallos y planificar actualizaciones y recuperación.

Para la primera ejecución de la placa, consulte [Primeros pasos](../getting-started/index.md); para elegir el dispositivo y la placa de desarrollo, [Productos SF32](../sf32-products/index.md); para esquemas y hardware de producción, [Hardware](../hardware/index.md); y para conocer los fundamentos de arquitectura, [Aprendizaje](../learn/index.md). Esta sección se centra en el flujo de ingeniería y en la orientación de implementación para tareas concretas.

!!! info "SiFli-Solution"
    SiFli-Solution es otro paquete de software de SiFli que μForge.io no documenta actualmente. La información de esta sección se limita a SiFli-SDK y a las opciones comunitarias indicadas a continuación. Si su producto necesita una solución más completa para dispositivos con pantalla, consulte la [documentación oficial de SiFli Solution](https://docs.sifli.com/projects/solution/index.html) y póngase en contacto directamente con SiFli. Un producto complejo que siga esta vía puede requerir una colaboración directa y estrecha con SiFli.

## Establecer una base de SiFli-SDK { #establish-a-sifli-sdk-baseline }

[SiFli-SDK](platforms/sifli-sdk/overview.md) es el paquete oficial de SiFli basado en RT-Thread y la ruta de referencia para desarrollar firmware SF32. Empiece por aquí, salvo que tenga un motivo concreto para evaluar otro ecosistema: ofrece la cobertura documental más amplia para placas, Bluetooth, gráficos, audio, almacenamiento, gestión de energía y desarrollo para producción.

Antes de implementar funciones del producto, establezca y registre una base reproducible:

1. Seleccione la configuración exacta de la placa del SDK en [Configuración de la placa](platforms/sifli-sdk/board-configuration.md).
2. Ejecute correctamente el flujo de [Compilar, grabar y supervisar la salida serie](platforms/sifli-sdk/build-flash-monitor.md).
3. Guarde la versión o el commit del SDK, el nombre de la placa, los comandos de compilación y grabación, los ajustes serie y un registro de arranque.
4. Empiece con el [ejemplo](examples/index.md) más cercano, sobre todo si ya ejercita el subsistema más complejo del producto.

Este registro será la referencia para evaluar cambios posteriores en la aplicación, adaptaciones de placa, fallos de pruebas y recuperación en campo.

## Buscar orientación por tarea { #find-guidance-by-task }

<div align="center"><em>Tabla: tareas de desarrollo SF32</em></div>

<div align="center" markdown>

| Tarea | Consulte primero | Después, consulte |
|:----------------|:-----------|:---------|
| Compilar y grabar el firmware; revisar la salida serie | [Compilar, grabar y supervisar la salida serie](platforms/sifli-sdk/build-flash-monitor.md) | [Herramientas](tools/index.md) para grabación mediante scripts, trazas y utilidades de análisis de fallos. |
| Adaptar el firmware a una placa de desarrollo, un módulo o hardware propio | [Configuración de la placa](platforms/sifli-sdk/board-configuration.md) | La guía de hardware correspondiente y el ejemplo más cercano para esa placa. |
| Reutilizar un controlador o una capa de middleware en varios proyectos | [Componentes y `sf_pkg`](platforms/sifli-sdk/components.md) | Un ejemplo mínimo y documentación que delimite las opciones de configuración. |
| Implementar un periférico o subsistema concreto | [Notas de aplicación de SiFli-SDK](platforms/sifli-sdk/sdk-application-notes.md) | La guía oficial del SDK enlazada para consultar las API, los símbolos de configuración y los comandos exactos. |
| Empezar el desarrollo del producto con código que ya funciona | [Ejemplos](examples/index.md) | La configuración de placa correspondiente; pruebe después cada cambio. |
| Diagnosticar un fallo o recopilar evidencias del producto | [Depuración y diagnóstico](platforms/sifli-sdk/debugging-diagnostics.md) | [Registro de eventos y análisis de fallos](firmware-topics/logging-crash-analysis.md). |
| Cambiar el diseño de arranque, el almacenamiento, las actualizaciones, USB o la gestión de energía | [Temas de firmware](firmware-topics/index.md) | Revise el tema de particiones, actualizaciones, USB, energía o registros pertinente antes de cambiar el código. |

</div>

## Notas de aplicación de SiFli-SDK { #sifli-sdk-application-notes }

Las notas de aplicación se organizan por tarea de integración, no según el orden del catálogo del SDK. Empiece por la nota del subsistema que necesita. Antes de reutilizar una configuración o un comando, compruebe qué familias de chips cubre la nota, la configuración de placa, la versión del SDK y los requisitos de hardware indicados.

<div align="center"><em>Tabla: notas de aplicación de SiFli-SDK</em></div>

<div align="center" markdown>

| Área de ingeniería | Nota de aplicación inicial |
|:-----------------|:--------------------------------|
| Señales analógicas y sensores | [Muestreo con GPADC](platforms/sifli-sdk/application-notes/adc-sampling.md) · [Integración y lectura de sensores](platforms/sifli-sdk/application-notes/sensor-integration.md) |
| Almacenamiento y recursos gráficos | [Uso de memoria Flash externa](platforms/sifli-sdk/application-notes/external-flash.md) · [Comprimir recursos gráficos con EZIP](platforms/sifli-sdk/application-notes/ezip-image-assets.md) |
| Fiabilidad, consumo y depuración | [Configurar el watchdog](platforms/sifli-sdk/application-notes/watchdog.md) · [Configurar modos de bajo consumo y medir corriente](platforms/sifli-sdk/application-notes/low-power-measurement.md) · [Capturar registros y analizar fallos](platforms/sifli-sdk/application-notes/crash-analysis.md) |
| Validación de RF y Bluetooth | [Realizar pruebas RF con SiFli SDK](platforms/sifli-sdk/application-notes/rf-performance-tests.md) · [Realizar pruebas de señalización Bluetooth](platforms/sifli-sdk/application-notes/bluetooth-signalling-tests.md) · [Realizar pruebas RF individuales de Bluetooth](platforms/sifli-sdk/application-notes/bluetooth-single-tone-tests.md) |

</div>

## Navegar por la sección de desarrollo { #navigate-the-develop-section }

<div align="center"><em>Tabla: estructura de la sección de desarrollo</em></div>

<div align="center" markdown>

| Área | Propósito |
|:-----|:--------|
| [SiFli-SDK](platforms/sifli-sdk/overview.md) | Establecer el flujo de referencia: configuración, compilación, grabación, componentes reutilizables y diagnóstico. |
| [Notas de aplicación de SiFli-SDK](platforms/sifli-sdk/sdk-application-notes.md) | Aplicar el SDK a una tarea concreta, como ADC, sensores, Flash externo, bajo consumo, diagnóstico o pruebas de RF y Bluetooth. |
| [Ejemplos](examples/index.md) | Elegir y adaptar una implementación funcional para la placa exacta y el subsistema más exigente del producto. |
| [Herramientas](tools/index.md) | Elegir herramientas de grabación, monitorización, trazas, análisis de fallos, recursos y producción. |
| [Temas de firmware](firmware-topics/index.md) | Tomar decisiones transversales sobre particiones, OTA/DFU, USB, gestión de energía y evidencias de diagnóstico. |
| [Experimental / Comunidad](platforms/zephyr/overview.md) | Evaluar Zephyr, Arduino, MicroPython o Rust teniendo en cuenta el alcance y el nivel de madurez indicados en cada página. |

</div>

## Evaluar con criterio las opciones comunitarias { #evaluate-community-paths-deliberately }

El grupo [Experimental / Comunidad](platforms/zephyr/overview.md) está dirigido a equipos que tienen motivos para ir más allá de la ruta de referencia del SDK. Esto no implica un soporte de producción equivalente.

<div align="center"><em>Tabla: adecuación de las opciones comunitarias</em></div>

<div align="center" markdown>

| Opción | Considérela si | Interprétela como |
|:-----|:-----------------|:------------|
| [Zephyr](platforms/zephyr/overview.md) | Necesita las API de Zephyr, devicetree, Kconfig o adaptar el soporte para una placa en una rama derivada. | Una vía de evaluación derivada, con soporte específico para cada placa. |
| [Arduino](platforms/arduino/overview.md) | Necesita sketches o un prototipo rápido de periféricos en una placa compatible. | Una vía beta limitada a determinadas placas. |
| [MicroPython](platforms/micropython/status.md) | Está evaluando el soporte futuro para ejecutar scripts. | Una página de estado hasta que exista un port público reproducible. |
| [Rust](platforms/rust/overview.md) | Puede evaluar el trabajo de HAL/PAC y contribuir correcciones al proyecto upstream. | Una iniciativa comunitaria aún en desarrollo. |

</div>

Antes de basar un producto en una de estas opciones, valide en la placa exacta todos los periféricos necesarios, la distribución de la memoria Flash, el método de depuración y el procedimiento de recuperación. Guarde junto con el código del producto la revisión probada, la configuración, los comandos y los resultados.

## Evidencias de desarrollo listas para el producto { #product-ready-development-evidence }

Antes de considerar que una ruta de firmware está lista para incorporarse al producto, asegúrese de poder responder a estas preguntas:

- ¿Qué chip, revisión de la placa o del hardware propio y configuración se probaron?
- ¿Qué SDK, paquete, rama o commit generó el firmware?
- ¿Qué comandos de compilación, grabación, monitorización y recuperación completa funcionan?
- ¿Qué ejemplo o prueba demuestra el funcionamiento de cada periférico y subsistema requerido?
- ¿Se validaron el diseño de particiones, el comportamiento de actualización, el objetivo de consumo y el procedimiento para decodificar los volcados de fallos?

Si falta alguna respuesta, el trabajo puede seguir siendo un prototipo útil, pero todavía no se dispone de una base de firmware reproducible para el producto.
