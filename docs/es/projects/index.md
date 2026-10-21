---
icon: lucide/folder-kanban
title: Resumen de proyectos
description: "Proyectos de μForge de principio a fin que combinan hardware seleccionado, una base de software, evidencias de validación y el traspaso a producción."
tags:
    - Proyectos
---

# Resumen de proyectos { #projects-overview }

Los proyectos son referencias prácticas basadas en aplicaciones que puede reproducir y adaptar para explorar una propuesta de producto con SF32. En lugar de mostrar cada función de forma aislada, cada proyecto combina capacidades de SF32 en un producto que alguien podría construir y utilizar en la práctica.

## Para qué sirven los proyectos { #what-projects-are-for }

Cada proyecto debe:

- **Partir de una aplicación.** Debe comenzar con un comportamiento o caso de uso reconocible, no con una demostración abstracta de una función.
- **Ser lo bastante completo para seguirlo.** Debe conectar el hardware seleccionado, la base de software, las dependencias, los hitos de integración, las evidencias de validación y una vía de adaptación, de modo que el lector pueda recorrer una parte sustancial del proceso de desarrollo.
- **Poder duplicarse.** Debe ofrecer una base práctica que pueda reproducirse primero y modificarse después para adaptarla al hardware, la interacción o los requisitos propios del producto.
- **Ser entretenido de construir.** Debe invitar a experimentar y mostrar lo que permiten las capacidades de SF32. Aquí, la utilidad y el disfrute van de la mano.

Utilice un proyecto después de completar la base pertinente de [Primeros pasos](../getting-started/index.md). [Diseños de referencia](../hardware/reference-designs/reference-designs.md) describen bases reutilizables y recorridos de validación. La entrada actual de Connected Wearable es un flujo de trabajo, no un paquete de placa publicado. Cada proyecto debe enlazar una base concreta y aplicable cuando exista; de lo contrario, debe identificar y validar una base propia, sin dar a entender que un recorrido de planificación es un diseño cualificado.

## Proyectos con SiFli-SDK { #sifli-sdk-projects }

!!! info "Responsabilidad de proyectos de terceros"
    [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) lo mantiene Xinyuan-LilyGO/LilyGO, no SiFli. Para el soporte de hardware y firmware específico de la placa, consulte el repositorio de LilyGO; para el dispositivo SF32 subyacente y SiFli-SDK, consulte las fuentes de SiFli.

<div align="center"><em>Tabla: Catálogo de proyectos</em></div>

<div align="center" markdown>

| Proyecto | Resultado | Base de hardware y software | Adecuado para |
|:---------|:----------|:---------------------------|:--------------|
| [Asistente de voz SF32 Xiaozhi](sf32-xiaozhi.md) | Asistente conectado de voz y pantalla basado en la implementación abierta de Xiaozhi para SF32. | Placas SF32LB52 compatibles, código fuente de Xiaozhi SF32, Bluetooth PAN y servicios en la nube de Xiaozhi. | Evaluar el flujo de un producto de interacción por voz con IA y adaptar su hardware o comportamiento de aplicación. |
| [Intercomunicador BLE SF32 Talkback](sf32-ble-talkback.md) | Intercomunicador BLE multidispositivo de pulsar para hablar (push-to-talk) con selección de roles, audio Opus, reconexión de los dispositivos secundarios, indicadores de estado y funcionamiento de bajo consumo. | Dos o más placas SF32LB52-DevKit-ULP, código fuente fijado de Talkback, una revisión fijada de SiFli-SDK compatible con la versión 2.4 y `talk_back/1.2@sifli`. | Validar su funcionamiento como intercomunicador portátil de grupo, así como la acústica, la recuperación RF y el consumo, antes de desarrollar hardware a medida. |
| [Lector de EPUB SF32 con pantalla de tinta electrónica](sf32-epd-reader.md) | Lector EPUB local con biblioteca y tabla de contenidos, teclas y pantalla táctil, fuentes dinámicas, actualización completa o parcial, almacenamiento y estados de bajo consumo. | SF32-OED-EPD V1.1, pantalla de tinta electrónica YZC085 V1.05, revisiones fijadas de EPD Reader y SDK, almacenamiento TF y contenido y fuentes tipográficas verificados. | Evaluar un lector de tinta electrónica, los límites de EPUB y renderizado, las formas de onda del panel, la recuperación del almacenamiento y el consumo. |
| [Teclado macro multifunción SuperKey](superkey.md) | Controlador de escritorio con tres pantallas, USB HID/CDC, teclas, codificador, sensores, telemetría y aplicación complementaria. | Hardware abierto sf32-keyboard, destino de firmware `sf32lb52-superkey` y SuperKeyHub. | Evaluar una HMI de escritorio, teclado macro, panel de estado o superficie de control conectada a un equipo host. |
| [Radiation Monitor](radiation-monitor.md) | Visualizador portátil de intensidad de señal de 2,4 GHz con 79 puntos, suavizado y reproducción del historial. | Ruta de prueba RF SF32LB52, pantalla LVGL, control KEY2 y entorno controlado de comparación RF. | Explorar tendencias relativas de interferencia y decidir si hace falta recurrir a un instrumento RF calibrado. |
| [Consola portátil Pocket Pi SF32](pocket-pi.md) | Consola local con emulación NES, navegador de juegos, controles, audio, estados guardados y almacenamiento integrado o en tarjeta TF. | Destino SF32LB52-DevKit-ULP, código PocketPi/Nofrendo, controles AW9523 y contenido NES con derechos de uso confirmados. | Probar una carga de trabajo de gráficos, controles, audio, almacenamiento y consumo orientada a juegos antes del hardware personalizado. |
| [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) | Plataforma de desarrollo SF32 de terceros, centrada en pantalla y con rutas para táctil, movimiento, almacenamiento, audio, LoRa y gestión de energía. | Hardware LilyGO T-Display-SF32, revisiones del repositorio de la placa y del fork de LilyGO SDK seleccionadas y registradas para la evaluación, y destino `t-display-sf32_hcpu`. | Evaluar una base mantenida por LilyGO para dispositivos vestibles, portátiles, terminales de sensores o HMI, sin confundirla con un proyecto oficial de SiFli. |

</div>

## Proyectos Zephyr { #zephyr-projects }

Este grupo incluye proyectos basados directamente en Zephyr o en una capa derivada documentada, como ArduinoCore-zephyr de OpenSiFli.

<div align="center"><em>Tabla: Catálogo de proyectos Zephyr</em></div>

<div align="center" markdown>

| Proyecto | Resultado | Base de hardware y software | Adecuado para |
|:---------|:----------|:---------------------------|:--------------|
| [Adaptación de Arduboy2 para SF32LB52](arduboy2-sifli.md) | Proceso reproducible para evaluar un juego o una demostración interactiva al estilo Arduboy2 en SF32LB52. | Código Arduboy2-SiFli de OpenSiFli, variante ArduinoCore-Zephyr `sf32lb52_devkit_lcd_sf32lb525uc6` y ruta documentada de pantalla, controles y audio externos. | Probar interacción con juegos locales, gráficos, controles, audio y los límites de una capa de aplicación portátil orientada a Arduino. |
| [Firmware de teclado ZMK en SF32](zmk-sf32.md) | Base reproducible de teclado dividido SF32LB52 con escaneo de matriz, capas, USB HID, enlaces BLE entre mitades y al host, ajustes y ZMK Studio. | OpenSiFli/zmk, variante de placa ZMK para SF32LB52-DevKit-LCD y shields `urchin_sf32lb52_left/right` con dependencias de manifiesto fijadas. | Evaluar teclados inalámbricos ZMK, teclados macro o productos HID personalizados y medir la madurez de la adaptación derivada para SF32. |

</div>

## Contenido de cada proyecto { #what-every-project-includes }

Cada proyecto de μForge debería documentar el resultado esperado, el lector al que se dirige, las versiones compatibles de hardware y software, los requisitos previos, el repositorio fuente, los pasos de compilación organizados por hitos, los criterios de validación, las mediciones y el traspaso al diseño del producto. Un proyecto es un punto de partida para el trabajo de ingeniería, no sustituye la validación para producción del hardware final, la integración con servicios, la seguridad, la privacidad ni los requisitos normativos.

!!! note "Contenido generado automáticamente"
    Esta página se compiló y redactó sin un documento fuente existente. Verifique las afirmaciones técnicas en la documentación oficial de SiFli antes de basarse en ellas.
