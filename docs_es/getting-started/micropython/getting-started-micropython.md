---
icon: lucide/braces
description: "Aún no hay una guía de inicio de MicroPython verificada para SF32. Utilice SiFli-SDK para una primera puesta en marcha reproducible y consulte la página de estado de MicroPython para seguir su avance."
tags:
    - Primeros pasos
    - MicroPython
---

# MicroPython { #micropython }

MicroPython aún no cuenta con un procedimiento de inicio verificado para SF32. En las fuentes de SiFli y OpenSiFli consultadas no se documentan actualmente imágenes oficiales de firmware específicas para cada placa, procedimientos de grabación ni configuraciones de REPL.

Utilice [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) para establecer una configuración de referencia reproducible de placa, cable, puerto serie y grabación. No siga instrucciones genéricas de instalación de MicroPython ni utilice una imagen destinada a otro MCU o placa.

La página [Estado de MicroPython](../../develop/platforms/micropython/status.md) recoge los artefactos públicos concretos y los criterios de aceptación necesarios antes de que esta página pueda convertirse en un tutorial.

!!! warning "Aún no hay un tutorial de MicroPython verificado"
    Una guía útil de MicroPython para SF32 requiere una imagen de firmware compatible con la placa y su configuración de memoria, comandos de grabación y recuperación, el puerto y la velocidad en baudios del REPL, el comportamiento del sistema de archivos y una matriz de soporte de periféricos que refleje con precisión el estado real. Hasta que se publiquen esos datos, esta página no incluye pasos de instalación.

## Qué necesita un tutorial verificado { #what-sifli-should-publish }

Antes de seguir un futuro tutorial de MicroPython para SF32, compruebe que indique una imagen específica para una placa compatible, comandos probados de grabación y recuperación, el puerto y la velocidad en baudios del REPL, el comportamiento del sistema de archivos y una matriz de soporte de periféricos mantenida al día. Hasta que esos datos estén disponibles en la [página de estado](../../develop/platforms/micropython/status.md), siga el procedimiento de SiFli-SDK descrito arriba para la primera puesta en marcha.
