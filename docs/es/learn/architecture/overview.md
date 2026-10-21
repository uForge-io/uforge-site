---
icon: lucide/network
title: "Resumen de arquitectura"
description: "Decisiones de arquitectura SF32 sobre procesadores, memoria, Bluetooth y aceleración por hardware, con comprobaciones específicas por dispositivo."
tags:
    - Arquitectura
    - Aprendizaje
---

# Panorama de la arquitectura { #architecture-overview }

Las configuraciones de procesador, memoria y hardware especializado varían entre los dispositivos SF32. Según los bloques integrados en el modelo elegido, el diseño puede delegar en subsistemas dedicados las tareas sensibles a la temporización o que deban permanecer siempre activas. Si el dispositivo incluye un acelerador adecuado, también puede ejecutar por hardware tareas compatibles, como el procesamiento gráfico. Esta sección organiza la arquitectura en torno a cinco decisiones de ingeniería: dónde ejecutar el código de aplicación; dónde ubicar el código y los búferes; qué tareas corresponden al controlador inalámbrico; cuándo conviene usar un motor de tareas dedicado; y si el dispositivo elegido ofrece los bloques de arquitectura y las interfaces necesarios.

## Empiece por la carga de trabajo { #start-with-the-workload }

<div align="center"><em>Tabla: Elija el detalle de arquitectura que necesita</em></div>

<div align="center" markdown>

| Si necesita decidir… | Consulte… | Qué encontrará |
|:----------------------|:-----------|:-----------------|
| Cómo se ejecuta el firmware de la aplicación y cómo interactúa con el sistema de memoria | [STAR-MC1](star-mc1.md) | El modelo de procesador de aplicación compatible con Cortex-M33, el comportamiento de la caché y las características de carga de trabajo en los dispositivos SF32 pertinentes. |
| Dónde ubicar el código, los recursos y los búferes grandes o que requieren baja latencia | [PSRAM frente a otros tipos de memoria para sistemas embebidos](psram-and-memory-types.md) | Las diferencias entre PSRAM, SRAM, DRAM, RRAM y MRAM en capacidad, latencia, persistencia, ancho de banda y consumo energético. |
| Qué trabajo de Bluetooth permanece en el controlador y cuál corresponde al firmware del producto | [Procesador Bluetooth](../bluetooth/processor.md) | El límite entre la temporización del controlador, las responsabilidades del host/aplicación, las consideraciones de RF y el funcionamiento de bajo consumo. |
| Si una secuencia específica de operaciones en periféricos requiere un motor de tareas programable | [PTM (Parallel Task Machine)](ptm-parallel-task-machine.md) | La guía de diseño de hardware del SF32LB57x documenta un bloque PTM con 16 canales para ejecutar tareas periféricas compactas y sensibles a la temporización que no se resuelven fácilmente con periféricos de función fija. |
| Si el dispositivo elegido ofrece realmente la arquitectura y las interfaces necesarias | [Familia SF32](../../sf32-products/family/SF32_family.md) | La selección depende del dispositivo completo: memoria, interfaces, conectividad inalámbrica y aceleradores disponibles. |

</div>

## Criterios prácticos de decisión { #practical-decision-rule }

Aborde las decisiones de arquitectura en este orden:

1. Mantenga la lógica del producto, el comportamiento de la interfaz de usuario, las reglas de funcionamiento de la aplicación y los controladores habituales en el firmware de aplicación. Consulte el artículo de STAR-MC1 para evaluar el procesador y la caché según el dispositivo y la carga de trabajo elegidos; no dé por sentado un rendimiento basándose en resultados genéricos de benchmarks.
2. Decida desde el principio dónde ubicar el código y los datos. Sitúe los que requieren baja latencia en los niveles adecuados de la jerarquía de memoria. Antes de definir una carga de trabajo de interfaz de usuario, audio, IA o conectividad, calcule también la capacidad de memoria externa, el ancho de banda de la interfaz y el presupuesto energético.
3. Separe la temporización del controlador Bluetooth de las decisiones propias del producto. El artículo sobre el procesador Bluetooth ayuda a distinguir las responsabilidades del controlador, el host y la aplicación, además de los aspectos de RF y bajo consumo que deben diseñarse en conjunto.
4. Antes de crear una secuencia personalizada de control de periféricos, compruebe si puede resolverla con un temporizador, DMA, UART, SPI, I2C, audio, pantalla o Bluetooth. En SF32LB57x, recurra a PTM solo si la tarea exige una temporización estricta o no puede implementarse adecuadamente con esos bloques estándar.

Antes de dar por hecho que el dispositivo elegido incluye un bloque de arquitectura o que este es programable por el usuario, confirme sus capacidades documentadas. La guía de diseño de hardware del SF32LB57x documenta un bloque PTM con 16 canales; antes de basar un diseño en PTM, confirme su disponibilidad en la documentación del dispositivo de destino.
