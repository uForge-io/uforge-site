---
icon: lucide/package
description: "SiFli-SDK como ruta de referencia para desarrollar con SF32: compilación con scons y configuración con sdk.py menuconfig, nombres de placas, estructura de proyectos y preparación para producción."
tags:
    - Desarrollo
    - SiFli-SDK
---

# SiFli-SDK { #sifli-sdk }

SiFli-SDK es el SDK oficial de SiFli para desarrollar firmware SF32. Ofrece un entorno basado en RT-Thread y, para los objetivos compatibles, también incluye ejemplos No-OS. Además, proporciona soporte de placas y middleware mantenidos por SiFli para áreas como Bluetooth, gráficos, audio, gestión de energía, almacenamiento y flujos de producción. La disponibilidad depende del chip, la placa y la versión del SDK.

!!! info "SiFli-Solution"
    SiFli-Solution es un paquete de software independiente de SiFli y queda fuera del alcance de esta página. Esta página y los materiales de desarrollo enlazados documentan únicamente SiFli-SDK. Para conocer el alcance de SiFli-Solution, los dispositivos compatibles y los requisitos de acceso, consulte la [documentación oficial de SiFli Solution](https://docs.sifli.com/projects/solution/index.html) y póngase en contacto directamente con SiFli.

Consulte [Primeros pasos con SiFli-SDK](../../../getting-started/sifli/getting-started-sifli-sdk.md) para instalarlo y ejecutar `hello_world` por primera vez. Esta página explica cómo trabajar con el SDK una vez que la cadena de herramientas está configurada y operativa.

Referencias principales:

- [Guía de instalación de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html)
- [Lista de placas SF32LB52x compatibles con el SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)
- [OpenSiFli/SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

## Cuándo usar SiFli-SDK { #when-to-use-sifli-sdk }

Elija SiFli-SDK si necesita:

- Una ruta de desarrollo documentada, con soporte de placas y ejemplos mantenidos por SiFli para el chip y la versión del SDK elegidos.
- Ejemplos y middleware para Bluetooth, pantalla, audio, energía, almacenamiento, USB y OTA cuando sean compatibles con el objetivo y la versión seleccionados.
- Integración con RT-Thread y sus herramientas de shell.
- Configuración a nivel de placa mediante nombres del SDK, como `sf32lb52-lcd_n16r8`.
- Acceso al middleware, herramientas, distribuciones de particiones y procesos de producción específicos de SiFli.

## Modelo de desarrollo { #development-model }

La página [Primeros pasos con SiFli-SDK](../../../getting-started/sifli/getting-started-sifli-sdk.md) establece la cadena de herramientas y una base funcional con `hello_world`. Después, mantenga la revisión del SDK, la placa, el directorio del ejemplo/proyecto, la configuración y los artefactos de compilación y descarga correspondientes en un registro reproducible. Si el nombre de placa no especifica un núcleo, la salida HCPU suele seguir el formato `build_<board_name>_hcpu/`; por ejemplo, `sf32lb52-lcd_n16r8` genera `build_sf32lb52-lcd_n16r8_hcpu/`. Use el directorio generado para la placa y el núcleo resueltos, en lugar de construir su nombre manualmente.

Para desarrollar de forma reproducible, fije una rama del SDK, registre el nombre de placa, mantenga separados los cambios locales de placa y los archivos del proveedor, y haga cambios de configuración pequeños y fáciles de revisar. Consulte [Compilar, grabar y supervisar la salida serie](build-flash-monitor.md) para ver el flujo detallado.

## Nombres de placas { #board-names }

Los nombres de placa de SiFli-SDK son específicos del SDK y pueden no coincidir con los nombres de Zephyr, los FQBN de Arduino o los nombres comerciales de las placas. Copie siempre el nombre de la lista de placas compatibles del SDK o de la documentación del ejemplo.

Para las placas de la familia SF32LB52 DevKit LCD, un nombre habitual del SDK en los ejemplos de inicio es:

```text
sf32lb52-lcd_n16r8
```

## Estructura del proyecto { #project-structure }

La mayoría de los ejemplos del SDK siguen este patrón:

```text
example/<domain>/<example_name>/<rtos_or_mode>/project
```

Por ejemplo:

```text
example/get-started/hello_world/rtt/project
```

Al crear firmware de producto, empiece con el ejemplo funcional más cercano y cambie un subsistema cada vez. Así se conservan la configuración de placa, las dependencias de middleware, los supuestos de particiones y la configuración de drivers.

## Configuración { #configuration }

En el proyecto de ejemplo, use el comando `menuconfig` del SDK para cambiar la configuración de funciones de una placa seleccionada:

```bash
sdk.py menuconfig --board=<board_name>
```

Motivos habituales para abrir la configuración:

- Activar o desactivar middleware.
- Cambiar roles o perfiles Bluetooth.
- Ajustar el soporte de pantalla, sistema de archivos o audio.
- Ajustar la gestión de energía.
- Elegir opciones de registro o shell.

## Cuestiones de preparación para producción { #production-readiness-questions }

Antes de comprometerse con SiFli-SDK para una rama de producto, responda:

- ¿Qué rama de publicación del SDK se congelará para el producto?
- ¿Qué archivos de soporte de placa son responsabilidad del producto y cuáles del proveedor?
- ¿Qué ejemplos demuestran las funciones críticas?
- ¿Qué tabla de particiones se usa para fabricación y OTA?
- ¿Qué herramientas están aprobadas para grabar en fábrica?
- ¿Qué registros estarán habilitados en las compilaciones de publicación?
- ¿Qué imagen de recuperación se conservará para el laboratorio?

## Próximas páginas recomendadas { #practical-next-pages }

- [Compilar, grabar y supervisar la salida serie](build-flash-monitor.md)
- [Configuración de la placa](board-configuration.md)
- [Componentes y `sf-pkg`](components.md)
- [Ejemplos](../../examples/index.md): elija una base funcional conocida antes de adaptar un subsistema.
- [CodeKit](../../tools/codekit.md): use el flujo de VS Code cuando resulte útil y mantenga coherentes con el resto del proyecto el nombre de placa del SDK y los registros de compilación.
- [Notas de aplicación del SDK](sdk-application-notes.md)
- [Tablas de particiones](../../firmware-topics/partition-tables.md)
- [Depuración y diagnóstico](debugging-diagnostics.md)
