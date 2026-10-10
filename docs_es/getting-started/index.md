---
icon: lucide/rocket
title: "Resumen de primeros pasos"
description: "Cómo elegir la primera ruta de desarrollo para SF32 — SiFli-SDK, CodeKit, Zephyr, Arduino, Rust o MicroPython — con su estado actual y el hardware necesario."
tags:
    - Primeros pasos
    - SF32
---

# Resumen de primeros pasos { #getting-started }

Los dispositivos SF32 admiten varias rutas de desarrollo de software. Actualmente, SiFli-SDK y CodeKit son las rutas oficiales para la primera puesta en marcha. Desde Zephyr v4.3.0, el proyecto principal de Zephyr mantiene soporte para la placa SF32LB52 DevKit LCD. OpenSiFli ofrece en versión beta ArduinoCore-zephyr y desarrolla soporte de Rust para SF32LB52. Para que MicroPython pueda presentarse en un tutorial verificado, aún hacen falta imágenes de firmware oficiales e instrucciones específicas para cada placa.

Para conocer el flujo de trabajo de desarrollo de referencia y el alcance actual de cada opción, consulte el [Panorama del desarrollo](../develop/index.md). Utilice la tabla siguiente solo para elegir por dónde empezar. En cada página de plataforma encontrará la información de referencia sobre las placas compatibles y sus limitaciones.

## Elija su ruta { #choose-your-path }

<div align="center"><em>Tabla: Elija su ruta</em></div>

<div align="center" markdown>

| Ruta | Estado actual | Empiece aquí |
|:-----|:---------------|:-----------|
| **SiFli-SDK** | Ruta oficial de SiFli para el desarrollo de referencia en SF32: RT-Thread, Bluetooth, gráficos, audio, bajo consumo y puesta en marcha de placas. | [SiFli-SDK](sifli/getting-started-sifli-sdk.md) |
| **SiFli CodeKit** | Flujo oficial de SiFli para VS Code: configuración del SDK, creación de proyectos, compilación, flasheo y monitor serie. | [SiFli CodeKit](sifli/getting-started-sifli-codekit.md) |
| **Zephyr** | Desde la versión v4.3.0, el proyecto principal de Zephyr mantiene soporte para `sf32lb52_devkit_lcd`. | [Zephyr upstream](zephyr/getting-started-zephyr-upstream.md) |
| **Arduino** | OpenSiFli ofrece en versión beta un paquete ArduinoCore-zephyr para la SF32LB52 DevKit LCD. | [Arduino](arduino/getting-started-arduino.md) |
| **Rust** | `sifli-rs` de OpenSiFli permite evaluar Rust, aunque el soporte sigue en desarrollo y no está listo para producción. | [Rust](rust/getting-started-rust.md) |
| **MicroPython** | Necesita imágenes de firmware oficiales, comandos de flasheo, ajustes de REPL y detalles de la API compatible. | [MicroPython](micropython/getting-started-micropython.md) |

</div>

## Qué necesita { #what-you-need }

Empiece con una placa compatible con la ruta de software elegida. Las conexiones de programación y serie pueden variar según la placa y el framework:

- Una placa de desarrollo SF32, por ejemplo, la [SF32LB52-DevKit-LCD](../sf32-products/devkits/SF32LB52-DevKit-LCD.md).
- Un cable de datos y la interfaz de programación/serie indicada para esa placa y framework. En la SF32LB52-DevKit-LCD, las [instrucciones de conexión de SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/get-started.html) indican usar el puerto USB-to-UART para la descarga serie; no lo confundas con el puerto USB dedicado a funciones USB.
- Un ordenador con Windows, macOS o Linux.
- Un terminal serie configurado para la consola de la placa, para ver los registros de arranque y la salida de los ejemplos.

!!! tip "Utilice un cable de datos"
    Los cables USB que solo sirven para cargar son una causa habitual de problemas durante la primera puesta en marcha. Si la placa se enciende pero no aparece ningún puerto serie, pruebe con un cable de datos que haya comprobado y un puerto USB directo.

## Primera ejecución recomendada { #recommended-first-run }

Si esta es su primera placa SF32, empiece con [SiFli-SDK](sifli/getting-started-sifli-sdk.md). Es la pila de software de referencia para SF32 y el punto de partida más fiable para comprobar que funcionan correctamente la placa, el cable, el puerto serie, el proceso de flasheo y la cadena de herramientas.

Cuando `hello_world` se ejecute correctamente, puede pasar a otro framework compatible con su hardware concreto. Así conservará una configuración conocida y funcional a la que volver si los experimentos posteriores fallan.

## Criterios de éxito { #what-success-looks-like }

Al terminar una guía de primeros pasos, deberías haber:

- Compilado o cargado un primer ejemplo.
- Flasheado ese ejemplo en la placa.
- Abierto la consola serie.
- Visto una salida predecible, como un registro de arranque, `hello_world`, un prompt de shell o un banner de REPL.
- Anotado el nombre de la placa, el puerto serie y el comando de flasheo que funcionaron.

Guarde esos detalles junto con las notas de su proyecto. Son la vía más rápida para volver a una configuración funcional cuando empiece a modificar los ejemplos.

## Continúe con los tutoriales { #continue-with-tutorials }

Cuando pueda repetir los criterios de éxito de la primera puesta en marcha, continúe con el [Resumen de tutoriales](tutorials/overview.md). Los tutoriales son la siguiente etapa del proceso: empiece con un periférico, combine después varios subsistemas y practique finalmente la validación que requiere un producto.

## Cuándo pasar a la sección de desarrollo { #when-to-move-to-develop }

La etapa de primeros pasos termina cuando puede repetir una puesta en marcha que sabe que funciona. El [Panorama del desarrollo](../develop/index.md) es la referencia de ingeniería para el trabajo continuo: madurez de la plataforma, herramientas, flujos de flasheo y depuración, arquitectura del firmware e integración del producto. Después de la puesta en marcha inicial, consulte en particular la [referencia de CodeKit](../develop/tools/codekit.md) para incorporarlo al flujo diario de desarrollo. Esta página se centra en los primeros pasos.

## Antes de elegir una ruta de desarrollo { #before-choosing-a-development-path }

Antes de adoptar una ruta de software, compruebe que la documentación cubra su placa y versión de software concretas. En particular, busque:

- Una matriz pública, por placa, del estado y nivel de madurez de SiFli-SDK, CodeKit, Zephyr, Arduino y MicroPython.
- El identificador exacto de la placa que utiliza cada ruta de software compatible.
- Instrucciones de flasheo/descarga para Windows, macOS y Linux.
- La salida serie esperada para cada primer ejemplo.
- Pasos de recuperación ante flasheos fallidos o imágenes de firmware no válidas.
- Limitaciones conocidas de cada framework, especialmente en Bluetooth, pantalla, almacenamiento, USB y funcionamiento de bajo consumo.
- Notas de versión que indiquen qué versiones del SDK, CodeKit, el paquete, la imagen de firmware y el soporte de placa son compatibles.

No dé por hecho que una ruta compatible con una placa funciona en todas las placas SF32; verifique la placa y la versión de software concretas que va a utilizar.
