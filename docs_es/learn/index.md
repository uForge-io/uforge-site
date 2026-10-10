---
icon: lucide/lightbulb
title: "Descripción general de la sección Aprendizaje"
description: "Consulte la orientación que necesita sobre la arquitectura de SF32 y sus subsistemas: gráficos, Bluetooth, IA, audio y bajo consumo."
tags:
    - Aprendizaje
---

# Descripción general de la sección Aprendizaje { #learn-overview }

Use la sección **Aprendizaje** para tomar decisiones de arquitectura y de subsistemas antes de que resulte difícil revertirlas en el firmware o el hardware. Estas páginas explican cómo se integran los bloques de SF32, por ejemplo, cuándo conviene delegar tareas de la CPU de propósito general en un motor gráfico, un controlador inalámbrico, un acelerador de IA u otro hardware especializado. También indican qué aspectos validar cuando un producto debe integrar gráficos, conectividad inalámbrica, audio, IA y memoria, además de cumplir sus requisitos de consumo energético.

Para poner en marcha una placa por primera vez, consulte [Primeros pasos](../getting-started/index.md); para realizar ejercicios guiados, [Tutoriales](../getting-started/tutorials/overview.md); para conocer los flujos de trabajo de software y sus ejemplos, [Desarrollo](../develop/index.md); y para elegir componentes y diseñar un producto para producción, la [familia SF32](../sf32-products/family/SF32_family.md).

## Comience por su pregunta de diseño { #start-with-your-design-question }

<div align="center"><em>Tabla: Elija una ruta de aprendizaje adecuada</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Si necesita… | Comience aquí | Luego explore |
|:----------------|:-----------|:-------------|
| Entender el procesador, la memoria y cómo delegar tareas en hardware especializado | [Panorama de la arquitectura](architecture/overview.md) | Consulte [STAR-MC1](architecture/star-mc1.md), [PSRAM frente a otros tipos de memoria para sistemas embebidos](architecture/psram-and-memory-types.md) y [PTM](architecture/ptm-parallel-task-machine.md) cuando sean pertinentes para el dispositivo elegido. |
| Crear una interfaz para la pantalla o definir la estrategia de recursos gráficos y framebuffer | [Resumen de gráficos](graphics/overview.md) | Consulte [Controlador de pantalla](graphics/display-controller.md), [ePicasso](graphics/epicasso-gpu.md), [eZip](graphics/ezip.md) y [TurboPixel](graphics/turbopixel.md) para tomar las decisiones pertinentes sobre pantalla, renderizado y compresión. |
| Conectar un teléfono, accesorio o dispositivo de audio | [Resumen de Bluetooth](bluetooth/overview.md) | [Procesador Bluetooth](bluetooth/processor.md) para conocer la separación de responsabilidades entre el controlador y la aplicación, y luego [Bluetooth PAN](bluetooth/pan.md) cuando el producto necesite transporte IP a través del teléfono. |
| Añadir inferencia en el dispositivo | [Resumen de IA](ai/overview.md) | Consulte [Acelerador de IA](ai/accelerator.md) y, después, las comprobaciones de memoria, latencia y consumo que requieran el modelo y la canalización. |
| Capturar, reproducir o procesar sonido | [Resumen del audio local](audio/overview.md) | Consulte [Audio Server y gestión de búferes](audio/audio-server-buffering.md). Si el producto transmite audio o gestiona llamadas por Bluetooth, revise también la guía de Bluetooth. |
| Alcanzar un objetivo de autonomía | [Resumen del diseño de bajo consumo](low-power/overview.md) | Consulte [Medición y validación del consumo energético](low-power/measurement-and-validation.md) y, después, las páginas de Bluetooth, gráficos, audio e IA para conocer el consumo de cada subsistema. |

</div>

## Use las páginas en conjunto { #use-the-pages-together }

La mayoría de los productos combinan varios subsistemas. En un dispositivo vestible con pantalla, BLE y micrófono, sujeto a un presupuesto energético limitado por la batería, no conviene tratar estas funciones por separado: la frecuencia de actualización de la pantalla afecta al tráfico de memoria y al tiempo de actividad; la planificación de Bluetooth, a la frecuencia de activación; y el audio y la IA, a los búferes y la latencia. Cada decisión modifica el presupuesto energético del producto.

Use estas páginas como parte de un ciclo de diseño:

1. Parta del requisito de producto dominante y del dispositivo seleccionado. Confirme que las capacidades necesarias de pantalla, Bluetooth, IA, audio, memoria y bajo consumo estén realmente documentadas para ese dispositivo.
2. Defina las responsabilidades de los procesadores y la asignación de memoria antes de integrar la aplicación. Determine dónde se ubicarán el conjunto de trabajo, los framebuffers, el modelo y los búferes de audio; coloque el código y los datos necesarios para las tareas sensibles a la latencia en una memoria de baja latencia adecuada; y recurra a hardware especializado solo cuando sus capacidades y requisitos de integración encajen con el producto.
3. Desde la descripción general del subsistema dominante, continúe hacia la página de implementación detallada. Trate las referencias a Bluetooth, memoria y bajo consumo como dependencias de diseño, no como lecturas opcionales.
4. Valide la combinación completa en el hardware previsto. Use los flujos de trabajo de [Desarrollo](../develop/index.md) y las mediciones indicadas en las páginas de Aprendizaje pertinentes para probar en conjunto el comportamiento funcional, la latencia, el ancho de banda, el comportamiento de RF y el consumo de energía.

!!! note "Contenido generado automáticamente"
    Esta página se ha recopilado y redactado sin una fuente existente dedicada a su contenido. Verifique las afirmaciones técnicas en la documentación oficial de SiFli antes de basarse en ellas.
