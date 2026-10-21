---
icon: lucide/wrench
description: "Mapa de herramientas para SF32: sftool, scripts UART del SDK, acciones de CodeKit, análisis de fallos y trazas, y herramientas de recursos y producción por uso."
tags:
    - Desarrollo
    - Herramientas
---

# Herramientas { #tools }

Desarrollar para SF32 no consiste solo en compilar firmware. Un flujo práctico también requiere herramientas para grabar, supervisar la comunicación serie, analizar fallos, capturar trazas, convertir imágenes, ajustar RF/audio y grabar dispositivos en fábrica.

La tabla siguiente relaciona tareas habituales con las herramientas correspondientes. Sirve como orientación y no sustituye los manuales; consulte la documentación enlazada para la instalación, los comandos exactos y los procedimientos de cada herramienta.

## Mapa de herramientas { #tool-map }

<div align="center"><em>Tabla: Mapa de herramientas</em></div>

<div align="center" markdown>

| Herramienta | Uso |
|:------------|:----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | Herramienta multiplataforma para descargar y grabar firmware SF32, utilizada en los flujos OpenSiFli con Zephyr y Arduino. |
| [Scripts UART de descarga del SDK](../platforms/sifli-sdk/build-flash-monitor.md) | Scripts de grabación para la primera ejecución, generados por las compilaciones de SiFli-SDK. |
| [Acciones CodeKit](codekit.md) | Configuración, compilación, grabación y supervisión desde VS Code. |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/AssertDump/AssertDump_UM.html) | Captura de los datos de memoria en el momento de un fallo para analizarlos después. |
| [`SiFli_Trace`](https://docs.sifli.com/projects/solution/6.tools/index.html) / [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/UsartServer/UsartServer_UM.html) | Captura de trazas y registros; depuración por UART mediante el Debug IP del chip. |
| [`Impeller`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/Impeller/Impeller_UM.html) | Grabación de firmware, calibración y pruebas PCBA en líneas de producción. |
| [eZip / herramientas de imagen](../../learn/graphics/ezip.md) | Conversión de recursos para los flujos de gráficos comprimidos. |
| [Herramientas RF/audio/fábrica](https://docs.sifli.com/projects/solution/6.tools/index.html) | Flujos de calibración, prueba y ajuste para producción. |

</div>

## Herramientas de grabación { #flashing-tools }

Para la primera puesta en marcha de la placa, use los scripts UART generados por el SDK: corresponden a la compilación que acaba de realizar. Añada `sftool` cuando necesite:

- Una herramienta de línea de comandos uniforme para grabar en distintos flujos.
- Integración con `west flash` de Zephyr.
- El comportamiento de carga de ArduinoCore-zephyr.
- Automatización en CI, fábrica o pruebas de regresión.

Mantenga ambos procesos documentados en el proyecto hasta que el equipo adopte un único estándar.

## Herramientas de registro y trazas { #logging-and-trace-tools }

Para el desarrollo habitual basta con un terminal serie. Ante fallos graves, capture registros estructurados y datos del fallo:

- Guarde el registro completo de arranque desde el reset.
- Guarde los archivos ELF/map/símbolos exactos que correspondan a la imagen grabada.
- Anote si estaban activos el shell de RT-Thread, el de Zephyr o el modo de depuración de Arduino.
- Si están disponibles, use las herramientas de diagnóstico de SiFli para analizar volcados de aserción y capturar trazas.

## Herramientas de recursos y producción { #asset-and-production-tools }

En productos con mucho contenido gráfico, documente el proceso de conversión de recursos, sobre todo si se usa compresión eZip o gráficos acelerados por hardware. En productos de producción, documente por separado las utilidades RF/audio/fábrica y las herramientas de grabación para desarrolladores, para que el personal de fábrica no dependa de comandos exclusivos de desarrollo.

## Lista de comprobación para elegir herramientas { #tool-selection-checklist }

<div align="center"><em>Tabla: Lista de comprobación para elegir herramientas</em></div>

<div align="center" markdown>

| Necesidad | Herramienta recomendada |
|:----------|:------------------------|
| Primera grabación de firmware con el SDK | Script UART de descarga del SDK. |
| Grabación multiplataforma mediante scripts | `sftool`. |
| Compilar y supervisar desde VS Code | CodeKit. |
| Fallo después del arranque | Registro serie y herramienta para analizar volcados de aserción. |
| Captura prolongada de trazas | Herramientas para capturar trazas y depurar por UART. |
| Flujo de recursos para pantalla | Herramientas eZip/imagen. |
| Grabación en fábrica | Utilidades de producción/fábrica de SiFli y procedimientos controlados. |

</div>

## Consejos prácticos { #practical-advice }

- Aprenda a usar un método fiable de grabación antes de añadir otro.
- Guarde registros serie conocidos como funcionales para cada placa.
- Use los scripts generados por el SDK para la primera puesta en marcha de la placa.
- Use `sftool` si necesita grabación repetible por línea de comandos en Zephyr, Arduino o procesos automatizados.
- Incorpore herramientas de análisis de fallos antes de que aparezca un problema difícil de reproducir.
