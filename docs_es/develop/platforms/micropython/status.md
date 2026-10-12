---
icon: lucide/terminal-square
description: "Estado actual de MicroPython en SF32: aún no se ha encontrado un port oficial, junto con los criterios que deberían cumplirse antes de ofrecerlo como ruta compatible."
tags:
    - Desarrollo
    - MicroPython
---

# Estado de MicroPython { #micropython-status }

En la documentación de SiFli y los repositorios de OpenSiFli consultados no se encontró un port oficial de MicroPython para SF32, una imagen de firmware ni un proceso de grabación específico para una placa.

La revisión abarcó los [repositorios públicos de OpenSiFli en GitHub](https://github.com/OpenSiFli/) y el [portal de documentación de SiFli](https://docs.sifli.com/).

Esto no demuestra que no exista ningún experimento privado o comunitario. Sí significa que el sitio no debe presentar MicroPython como una ruta de desarrollo SF32 verificada hasta que exista una imagen pública de firmware o un árbol público de código fuente al que se pueda enlazar.

## Recomendación actual { #current-recommendation }

Por ahora, no presente MicroPython a los usuarios finales como una vía de desarrollo admitida para SF32. Mantenga esta página como referencia de estado y hoja de ruta hasta que haya un artefacto público que los desarrolladores puedan grabar y cuyo funcionamiento puedan reproducir.

## Qué debe incluir una página completa { #what-a-real-page-needs }

Antes de convertirla en un tutorial normal, SiFli debería publicar:

- Imágenes de firmware por placa y configuración de memoria.
- Repositorio fuente e instrucciones de compilación.
- Comando de grabación y comando de recuperación.
- UART y velocidad en baudios del REPL.
- Mensaje de inicio esperado de MicroPython.
- API `machine` compatibles.
- Comportamiento del sistema de archivos y de los modos seguro y de recuperación.
- Limitaciones conocidas de pantalla, Bluetooth, almacenamiento, USB y bajo consumo.

## Primera prueba rápida recomendada { #suggested-first-smoke-test }

Cuando exista firmware, la primera prueba debería usar únicamente la conexión serie:

```python
import time

while True:
    print("Hello from SF32 MicroPython")
    time.sleep(1)
```

Pruebe GPIO solo después de documentar los nombres de los pines.

## Criterios mínimos de aceptación { #minimum-acceptance-criteria }

MicroPython podrá pasar de «estado» a «primeros pasos» cuando se cumplan todos estos puntos:

- Repositorio público o página de versiones.
- Binario específico de placa para al menos una placa de desarrollo SF32.
- Comando de grabación documentado.
- Puerto REPL y velocidad en baudios documentados.
- Vía de recuperación para volver al firmware de SiFli-SDK.
- Lista de API `machine` compatibles.
- Al menos un ejemplo GPIO probado en hardware real.

## Por qué importa { #why-this-matters }

Una instrucción imprecisa como «descargue una imagen de MicroPython» no basta para empezar. Los usuarios necesitan una imagen exacta, una placa compatible, una herramienta de grabación, los ajustes del REPL y una vía de recuperación. Sin ellos, una página de MicroPython aumenta la carga de soporte en vez de ayudar.
