---
icon: lucide/infinity
description: "Adecuación de ArduinoCore-zephyr para SF32LB52 DevKit LCD: identidad de la placa, cargador y modos de compilación, límites de integración y vías de escalado."
tags:
    - Desarrollo
    - Arduino
---

# Arduino { #arduino }

[OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr) es un core Arduino basado en Zephyr para SF32. Es una opción útil para sketches, experimentos con periféricos, demostraciones y prototipos iniciales en la **SiFli SF32LB52 DevKit LCD**.

!!! warning "Core beta"
    OpenSiFli etiqueta este core como **BETA**. Las funciones, API, contenido de los paquetes, comportamiento del cargador y versiones pueden cambiar. Antes de adoptar esta plataforma para un producto, confirme el comportamiento actual en el README del proyecto y en Releases.

Para la instalación inicial del IDE, seleccionar la placa y el puerto, instalar el bootloader y comprobar Blink, siga [Primeros pasos con Arduino](../../../getting-started/arduino/getting-started-arduino.md). Esta página ayuda a decidir si Arduino encaja y a mantener un proyecto Arduino después de esa primera ejecución.

## Cuándo encaja Arduino { #where-arduino-fits }

Elija Arduino cuando la iteración rápida y el modelo familiar de sketches sean más importantes que el acceso completo a las capacidades específicas de SF32. Es adecuado para pruebas de concepto, validación sencilla de periféricos, proyectos de aula o demostración y equipos con una base de código Arduino existente.

Pase a [SiFli-SDK](../sifli-sdk/overview.md) cuando el producto dependa de una base de firmware para producción, ajuste de la pila Bluetooth, aplicaciones con muchos gráficos, optimización de bajo consumo, puesta en marcha de la placa o middleware del proveedor. Use [Zephyr](../zephyr/overview.md) si necesita controlar directamente devicetree, Kconfig y la estructura de aplicaciones nativa de Zephyr.

<div align="center"><em>Tabla: Adecuación de la plataforma Arduino</em></div>

<div align="center" markdown>

| Elegir Arduino para | Preferir otra opción para |
|:-------------------|:------------------------|
| Sketches breves y experimentos rápidos con periféricos. | Un producto que requiera un conjunto amplio y validado de funciones SF32. |
| Equipos que ya trabajan con Arduino IDE o Arduino CLI. | Puesta en marcha de placas personalizadas o control profundo de Flash, alimentación y middleware. |
| Demostraciones y prototipos iniciales para validar la viabilidad. | Configuración, drivers y estructura RTOS nativos de Zephyr. |

</div>

## Identidad de la placa { #board-identity }

El paquete público actual está dirigido a la SF32LB52 DevKit LCD. Guarde estos valores en el registro del proyecto y en los informes de incidencias: determinan cómo se compila, programa y asigna el sketch a la placa.

<div align="center"><em>Tabla: Identidad de la placa Arduino</em></div>

<div align="center" markdown>

| Elemento | Valor |
|:-----|:------|
| Nombre en Boards Manager | **SiFli Serial Boards** |
| Plataforma Arduino | `sifli:sf32lb52` |
| Placa | **SiFli SF32LB52 DevKit LCD** |
| FQBN | `sifli:sf32lb52:sf32lb52devkitlcd` |
| Objetivo Zephyr | `sf32lb52_devkit_lcd` |
| Variante | `sf32lb52_devkit_lcd_sf32lb525uc6` |
| Herramienta de carga | `sftool` |
| `LED_BUILTIN` | `13` |

</div>

Un identificador de placa SiFli o Zephyr con un nombre parecido no es intercambiable con este FQBN. La selección de la placa determina los parámetros de compilación y carga.

## Modelo de compilación y cargador { #build-and-loader-model }

ArduinoCore-zephyr combina una API Arduino para sketches con un cargador Zephyr y la configuración específica de la placa. Los dos menús de opciones afectan al arranque y al enlazado, no son simples indicadores del compilador.

<div align="center"><em>Tabla: Opciones de compilación y cargador</em></div>

<div align="center" markdown>

| Opción | Comportamiento | Implicación de ingeniería |
|:-------|:---------|:------------------------|
| Modo de compilación `Standard` | Inicia el sketch después de cargarlo. | Úselo para la ejecución normal de sketches. |
| Modo de compilación `Debug` | Deja la shell de Zephyr a la espera de `sketch`. | Solo es útil si la shell forma parte del flujo de depuración. |
| Modo de enlace `Dynamic` | Empaqueta el sketch para el flujo normal basado en el cargador. | El cargador se incluye en el presupuesto de ejecución y memoria. |
| Modo de enlace `Static` | Se usa una imagen enlazada estáticamente. | Úselo para investigar el cargador o cuando se entiendan expresamente sus contrapartidas. |

</div>

Empiece con **Standard** y **Dynamic**. En modo Debug, el sketch cargado no comienza hasta ejecutar `sketch` desde la shell de Zephyr; es una causa habitual de que la carga parezca exitosa, aunque la aplicación no haga nada.

El cargador es un artefacto independiente para cada placa. Burn Bootloader suele ser una operación de primer uso, actualización o recuperación, no un paso de cada carga de sketch. Registre juntos la versión del paquete Arduino y cualquier actualización del cargador; las suposiciones incompatibles son difíciles de diagnosticar después.

## Límites de integración { #integration-boundaries }

Trate el core Arduino como una capa de integración, no como un sustituto de la plataforma Zephyr subyacente. Un sketch puede requerir símbolos o subsistemas Zephyr que el cargador no exponga o habilite. Los síntomas habituales son símbolos Zephyr sin definir, subsistemas ausentes o presión de memoria debida a la carga dinámica y a la shell.

Antes de incorporar una biblioteca o función a un prototipo de producto, confirme todo lo siguiente:

- Versión exacta del paquete, FQBN, modo de compilación y modo de enlace.
- Revisión de la placa de destino y procedimiento de descarga serie/recuperación.
- Un ejemplo probado para el periférico o biblioteca necesarios.
- Un presupuesto medible de RAM y Flash con la configuración del cargador prevista.
- Una vía de recuperación mediante el cargador Arduino o firmware SiFli-SDK.

No deduzca que una biblioteca es compatible solo porque exista una API Arduino o un driver Zephyr de nombre parecido. Valide en el hardware de destino la combinación completa de sketch, cargador, placa y paquete.

## Diagnóstico y escalado { #diagnose-and-escalate }

Si no se detecta la placa, no se puede programar o Blink no funciona, empiece por la guía de primera ejecución. Una vez confirmada esa base, use la siguiente tabla para acotar el diagnóstico.

<div align="center"><em>Tabla: Diagnóstico inicial de problemas Arduino</em></div>

<div align="center" markdown>

| Síntoma tras completar la primera ejecución | Primera investigación |
|:-------------------------------------------|:--------------------|
| El sketch solo se inicia tras ejecutar `sketch`. | Confirme que se seleccionó Debug intencionadamente. |
| Falta una función o subsistema Zephyr. | Revise el README del core y las exportaciones/configuración del cargador. |
| Error de memoria o inestabilidad. | Mida el presupuesto del sketch, tenga en cuenta la carga dinámica y la shell de Zephyr, y evalúe Static solo con un plan de recuperación. |
| La biblioteca compila, pero el hardware no funciona. | Confirme las suposiciones sobre los pines de la placa y pruebe un ejemplo mínimo específico para ella. |
| Falla la carga o la recuperación. | Restablezca el procedimiento Arduino documentado y, si hace falta, use la vía de recuperación SiFli-SDK de la placa. |

</div>

Para informar de una incidencia, incluya la versión del paquete, la versión del IDE o CLI, el sistema operativo, FQBN, modo de compilación, modo de enlace, revisión de la placa, salida completa de la carga y registro serie.

## Páginas relacionadas { #related-pages }

- [Primeros pasos con Arduino](../../../getting-started/arduino/getting-started-arduino.md)
- [Zephyr](../zephyr/overview.md)
- [SiFli-SDK](../sifli-sdk/overview.md)
- [SF32LB52 DevKit LCD](../../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)
