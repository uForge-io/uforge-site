---
icon: lucide/app-window
description: "Cómo encaja la extensión SiFli CodeKit para VS Code en el desarrollo con SiFli-SDK: configuración de proyectos, compilación, grabación de firmware, supervisión y resolución de problemas."
tags:
    - Desarrollo
    - CodeKit
---

# CodeKit { #codekit }

SiFli CodeKit es la extensión de VS Code para desarrollar con SiFli-SDK. Guía la configuración del SDK y de los proyectos, y facilita su compilación, la grabación de firmware y la supervisión.

Para la primera ejecución, consulte [Primeros pasos con CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md). Esta página explica dónde encaja CodeKit en el flujo de desarrollo.

Referencia principal:

- [Guía de inicio de SiFli CodeKit](https://docs.sifli.com/projects/codekit/get-started/)

## Casos de uso recomendados { #best-use-cases }

Use CodeKit si necesita:

- Un flujo del SDK centrado en VS Code.
- Configuración guiada de proyectos.
- Configuración de la placa y del proyecto desde el editor.
- Acciones de compilación, grabación y supervisión sin memorizar todos los comandos.
- Un camino más sencillo para quienes se inician en SiFli-SDK.

Use el flujo del SDK por línea de comandos para escribir scripts de CI, investigar problemas con las rutas de la cadena de herramientas o preparar procedimientos de fábrica/publicación. CodeKit mejora la productividad del desarrollador, pero no sustituye la comprensión del proceso de compilación del SDK.

## Relación con SiFli-SDK { #relationship-to-sifli-sdk }

CodeKit proporciona una interfaz para el flujo de trabajo del SDK, pero no sustituye al SDK. Los mismos elementos subyacentes siguen siendo importantes:

- Raíz del SDK.
- Nombre de placa.
- Directorio del proyecto.
- Salida de compilación.
- Ruta de grabación/descarga.
- Monitor serie.

Si falla una acción de CodeKit, intente reproducir, cuando sea posible, el comando subyacente del SDK. Así se aclara el informe del fallo y se separan los problemas de la extensión de los del SDK.

Use [SiFli-SDK](../platforms/sifli-sdk/overview.md) para elegir una base admitida y [Compilar, grabar y supervisar la salida serie](../platforms/sifli-sdk/build-flash-monitor.md) para conservar evidencias equivalentes de la línea de comandos. Antes de adaptar un proyecto de CodeKit, empiece con un [ejemplo del SDK](../examples/index.md) correspondiente.

## Modelo operativo { #operational-model }

CodeKit resulta más útil cuando las acciones del editor se pueden reproducir con el SDK subyacente. Considere la extensión como la interfaz de control y SiFli-SDK como la referencia principal para la cadena de herramientas, la definición de la placa, la salida de compilación y los artefactos de descarga.

La página [Primeros pasos con CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md) explica cómo instalar la extensión y ejecutar `hello_world`. Cuando esa base funcione, use CodeKit para agilizar el ciclo de edición, compilación, grabación y supervisión; use la línea de comandos del SDK cuando necesite automatizar, inspeccionar o reproducir una acción fuera de VS Code.

## Qué registrar { #what-to-record }

Para cada proyecto de CodeKit, registre:

- Versión de la extensión CodeKit.
- Ruta de SiFli-SDK y rama del SDK.
- Placa seleccionada en CodeKit.
- Nombre equivalente de la placa en el SDK.
- Directorio de salida de compilación.
- Comportamiento de grabación/descarga.
- Velocidad en baudios del monitor serie.

Así podrá reproducir desde la línea de comandos una acción realizada en la interfaz gráfica cuando sea necesario.

## Diagnóstico de problemas { #failure-boundaries }

<div align="center"><em>Tabla: Estrategia de resolución de problemas</em></div>

<div align="center" markdown>

| Fallo | Siguiente paso recomendado |
|:------|:---------------------------|
| No se encuentra el SDK | Vuelva a seleccionar la raíz del SDK y confirme que la instalación haya terminado. |
| Falla la compilación | Si es posible, reproduzca el proyecto con `scons`. |
| La primera prueba de referencia funciona, pero falla la grabación posterior | Compare la placa y la salida del proyecto con la base funcional y revise si el puerto está ocupado, además del modo de descarga. |
| El monitor muestra caracteres ilegibles | Confirme la velocidad en baudios y el puerto seleccionado. |
| Falta un comando de la interfaz | Abra la paleta de comandos y busque `SiFli`. |

</div>
