---
icon: lucide/notebook-tabs
title: Notas de aplicación del SDK
description: "Recorrido de lectura organizado por tareas y enlazado a las fuentes para consultar las guías de uso de SiFli-SDK durante el desarrollo de SF32."
tags:
    - Desarrollo
    - SiFli-SDK
    - Notas de aplicación
---

# Notas de aplicación del SDK { #sdk-application-notes }

Esta página organiza las guías de uso de SiFli-SDK por tarea de ingeniería. Así puede localizar rápidamente el flujo de trabajo pertinente y saber qué registros de validación conviene conservar para el producto.

Estos artículos ofrecen orientación práctica para integrar cada tema, pero no sustituyen al manual del SDK. Antes de aplicar una configuración, API, ejemplo o procedimiento de prueba, seleccione la familia de chips de destino y la versión del SDK en la guía oficial de [uso de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/index.html).

## Lecturas por tarea { #read-by-task }

<div align="center"><em>Tabla: Recorridos de lectura de las notas de aplicación del SDK</em></div>

<div align="center" markdown>

| Tarea | Consulte este artículo si necesita | Tema de la guía oficial |
|:------|:-----------------------------------|:------------------------|
| [Muestreo con GPADC](application-notes/adc-sampling.md) | Establecer una ruta de medición con ADC de propósito general. | Guía de uso del ADC (GPADC) |
| [Integración y lectura de sensores](application-notes/sensor-integration.md) | Conectar y validar un sensor externo. | Guía para añadir sensores |
| [Uso de memoria Flash externa](application-notes/external-flash.md) | Guardar datos, recursos o un sistema de archivos en Flash. | Guía de uso de Flash |
| [Configurar el watchdog](application-notes/watchdog.md) | Validar una ruta de recuperación mediante watchdog. | Guía de uso del watchdog |
| [Comprimir recursos gráficos para EZIP](application-notes/ezip-image-assets.md) | Convertir e integrar recursos de imagen EZIP. | Uso de la herramienta de conversión de imágenes EZIP |
| [Configurar modos de bajo consumo y medir corriente](application-notes/low-power-measurement.md) | Configurar un estado de energía y comparar las mediciones. | Guía de desarrollo de bajo consumo |
| [Capturar registros y analizar fallos](application-notes/crash-analysis.md) | Conservar los registros asociados, el contexto del fallo y los símbolos correspondientes. | Guía de análisis de fallos; depuración y registros |
| [Realizar pruebas RF con SiFli SDK](application-notes/rf-performance-tests.md) | Elegir entre validación RF con señalización, sin señalización o pruebas RF individuales. | Guía de pruebas RF de SiFli SDK |
| [Realizar pruebas de señalización Bluetooth](application-notes/bluetooth-signalling-tests.md) | Realizar validación Bluetooth basada en protocolos. | Guía de pruebas Bluetooth con señalización |
| [Realizar pruebas RF individuales de Bluetooth](application-notes/bluetooth-single-tone-tests.md) | Seguir el procedimiento de prueba RF Bluetooth individual del elemento seleccionado. | Guía de pruebas RF individuales de Bluetooth |

</div>

## Cómo usar estos artículos { #how-to-use-these-articles }

1. Empiece por la página cuyo título corresponda a la tarea inmediata de ingeniería.
2. Antes de adaptar un ejemplo o comando, establezca los requisitos previos indicados para el proyecto, la placa, la versión, la configuración y el hardware.
3. Consulte la fuente del SDK enlazada para obtener rutas, símbolos de configuración, comandos, API y revisiones de herramientas exactos.
4. Registre como evidencia del proyecto la placa validada, la versión del SDK, los archivos de configuración, el equipo de prueba y los resultados observados.

Para decisiones de arquitectura que afecten a varias plataformas, consulte [Temas de firmware](../../firmware-topics/index.md). Para las bases de ejemplos compatibles en SiFli-SDK y las rutas de la comunidad, consulte [Ejemplos](../../examples/index.md).
