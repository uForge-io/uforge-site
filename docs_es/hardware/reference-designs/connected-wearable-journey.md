---
icon: lucide/waypoints
description: "Recorrido práctico de diseño de referencia con SF32: desde validar una placa de desarrollo SF32LB52 hasta preparar la publicación de hardware y firmware personalizados para un wearable conectado."
tags:
    - Hardware
    - Diseño de referencia
---

# Recorrido de diseño de referencia para un wearable conectado { #connected-wearable-reference-design-journey }

Este recorrido es un proceso de validación para un producto conectado compacto, alimentado por batería, con pantalla, BLE y entrada de sensores. No es un esquema publicado, una BOM ni un paquete de placa de referencia cualificado. Úselo para establecer y probar su propia configuración de hardware y software antes de diseñar hardware personalizado.

1. **Seleccione y establezca una configuración de referencia.** Consulte la [familia SF32](../../sf32-products/family/SF32_family.md) y el [selector de productos SF32](../../sf32-products/product-selector.md) para reducir la lista de candidatos. Ejecute `hello_world` de SiFli-SDK en una [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md) o en una placa disponible que cumpla las restricciones de hardware y las interfaces necesarias. Registre la revisión de la placa, la versión o el commit del SDK, los comandos de compilación y programación y el registro del puerto serie.
2. **Compruebe las funciones del producto.** Siga los [tutoriales](../../getting-started/tutorials/overview.md) para validar la gestión de entradas y sensores, BLE, una interfaz de usuario sencilla, el almacenamiento si hace falta y el procedimiento de recuperación a través del puerto serie.
3. **Valide las interacciones del sistema.** Use [Gráficos](../../learn/graphics/overview.md), [Bluetooth](../../learn/bluetooth/overview.md) y [Bajo consumo](../../learn/low-power/overview.md) para probar conjuntamente la actualización de pantalla, la actividad inalámbrica y la suspensión/activación.
4. **Prepare el hardware personalizado.** Use la guía de diseño y la lista de comprobación del chip seleccionado a través de [Diseño para producción](../design-for-production.md); confirme los supuestos sobre pantalla, almacenamiento, batería, antena/RF y programación/pruebas.
5. **Prepare las evidencias de lanzamiento.** Conserve el nombre y la revisión de la placa, la versión o el commit del SDK, la imagen de firmware validada, los registros, el consumo medido en cada escenario y sus condiciones, el comportamiento de recuperación/OTA, las decisiones de BOM y las decisiones de la lista de comprobación.

Una demostración que funciona no basta para completar este proceso. La compilación, la programación y la recuperación deben ser reproducibles, con mediciones que demuestren que los subsistemas principales del producto funcionan conjuntamente en hardware representativo. Registre el escenario de funcionamiento, la tensión de alimentación y las condiciones de medición junto con cada resultado de consumo, para que otro ingeniero pueda reproducir la comparación.
