---
icon: lucide/layers
description: "Soporte Zephyr de OpenSiFli para SF32LB52 DevKit LCD: identidad de placa, límites de configuración, cobertura de drivers y riesgos de integración."
tags:
    - Desarrollo
    - Zephyr
---

# Zephyr { #zephyr }

OpenSiFli desarrolla activamente el soporte para Zephyr en [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream) y [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream). El árbol downstream incluye la placa `sf32lb52_devkit_lcd`, la integración de SiFli HAL, archivos devicetree SF32LB52, drivers, pruebas y overlays de ejemplo.

Use Zephyr si necesita sus API, devicetree, Kconfig, una estructura RTOS portable o una ruta conectada con ArduinoCore-zephyr. Si necesita acceder actualmente al conjunto más completo de funciones del fabricante, elija SiFli-SDK.

Para configurar el espacio de trabajo, compilar el primer `hello_world`, programar la placa y verificar la consola, consulte [Primeros pasos con Zephyr Downstream](../../../getting-started/zephyr/getting-started-zephyr-upstream.md). Esta página trata la plataforma downstream una vez que esa base ya funciona.

Referencias principales:

- [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)
- [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)
- [Documentación del proyecto Zephyr](https://docs.zephyrproject.org/)
- [SF32LB52-DevKit-LCD en la documentación de placas de Zephyr](https://docs.zephyrproject.org/latest/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)

## Placa downstream verificada { #verified-downstream-board }

<div align="center"><em>Tabla: Placa downstream verificada</em></div>

<div align="center" markdown>

| Elemento | Valor |
|:---------|:------|
| Placa | `sf32lb52_devkit_lcd` |
| Nombre completo | SF32LB52-DevKit-LCD |
| SoC | `sf32lb525uc6` |
| Runner para programar la Flash | `sftool` |
| Argumento del runner | `--chip=SF32LB52` |
| Consola | `usart1` |
| Velocidad de consola | `1000000` baudios |
| Nodo de pantalla seleccionado | `co5300` |

</div>

La documentación de la placa downstream describe el módulo SF32LB52x-MOD-N16R8 con 8 MB de OPI-PSRAM, 128 Mb de QSPI-NOR, cristales de 48 MHz y 32,768 kHz, interfaces de pantalla, audio, USB y hardware microSD.

## Límites de configuración { #configuration-boundaries }

El destino de la placa, devicetree, configuración Kconfig, overlays y revisión de HAL downstream forman un límite de compatibilidad conjunto. Fije la revisión downstream en cada proyecto y mantenga los overlays de aplicación y fragmentos de configuración bajo control de versiones junto con la aplicación.

No copie a Zephyr un nombre de placa, asignación de pines o configuración de runner de un proyecto Arduino o SiFli-SDK. Las tres rutas usan modelos de configuración distintos, aunque funcionen en la misma placa física.

## Notas del hardware de la placa { #board-hardware-notes }

La documentación de la placa downstream enumera:

- Módulo SF32LB52x-MOD-N16R8 basado en SF32LB525UC6.
- 8 MB de OPI-PSRAM.
- 128 Mb de QSPI-NOR.
- Cristales de 48 MHz y 32,768 kHz.
- Interfaces de pantalla SPI/DSPI/QSPI y MCU/8080.
- Compatibilidad con táctil I2C.
- Entrada de micrófono analógico y salida de audio analógica con PA Class-D integrado.
- Puertos USB Type-C para USB a serie y USB 2.0 FS.
- microSD mediante SPI.

## Áreas de drivers presentes en el árbol downstream { #driver-areas-present-in-the-downstream-tree }

El árbol downstream contiene drivers, bindings o configuraciones de ejemplo específicas de la placa para SF32LB en áreas como:

- GPIO, pinctrl, UART, I2C, SPI, ADC, PWM, RTC y watchdog.
- Flash, controlador de memoria, OPI PSRAM y QSPI NOR.
- Configuración de muestra para pantalla/LCDC/MIPI DBI y LVGL.
- Configuración de Bluetooth HCI mailbox y BAP broadcast sink.
- Códec de audio, DMA, CRC, criptografía, entropía, OTP/eFuse, reguladores, reset y sensor de temperatura.

Que algo esté presente en el árbol no significa que todos los escenarios de producto estén listos para producción. Valide la combinación exacta de ejemplo y driver en la placa de destino.

## Secuencia de integración { #integration-sequence }

Una vez verificada la configuración base en el primer arranque, valide un subsistema cada vez: E/S de la placa, UART, pantalla, almacenamiento, Bluetooth, audio y gestión de energía. Para cada hito, conserve juntos el ejemplo, el overlay, los fragmentos Kconfig, la revisión downstream y el registro serie. La presencia de un driver en el árbol no demuestra que la combinación completa de la aplicación esté lista para producción.

## Lista de comprobación de riesgos downstream { #downstream-risk-checklist }

- ¿Está utilizando OpenSiFli downstream en vez de Zephyr upstream?
- ¿Está fijada la revisión de HAL?
- ¿`west flash` utiliza el runner `sftool` esperado?
- ¿La consola está configurada a `1000000` baudios?
- ¿Se incluyen los overlays necesarios para el ejemplo?
- ¿Las pruebas confirman la compatibilidad del driver o solo está presente en el árbol?
