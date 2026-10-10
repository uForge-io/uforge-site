---
icon: lucide/blocks
description: "Temas de firmware SF32 aplicables a varias plataformas: tablas de particiones, OTA/DFU, USB, gestión de energía y análisis de registros y fallos."
tags:
    - Desarrollo
    - Firmware
---

# Temas de firmware { #firmware-topics }

Estos temas se aplican a varias plataformas y abarcan las decisiones de firmware necesarias para pasar de los ejemplos a un producto: estructura de arranque, particiones, OTA, USB, gestión de energía, registros y análisis de fallos.

Consulte estas páginas antes de cambiar la estructura del firmware, el comportamiento de las actualizaciones o la política de bajo consumo. Estos errores pueden no impedir que el código compile, pero sí dificultar la recuperación, la depuración o la entrega del producto.

## Temas { #topics }

<div align="center"><em>Tabla: Temas</em></div>

<div align="center" markdown>

| Tema | Por qué importa |
|:-----|:----------------|
| [Tablas de particiones](partition-tables.md) | Definen la distribución del firmware, el sistema de archivos, OTA y el almacenamiento. |
| [OTA y DFU](ota-dfu.md) | Son necesarios para las actualizaciones en campo y los planes de recuperación. |
| [USB y CherryUSB](usb-cherryusb.md) | Describe las capacidades USB de dispositivo y host que una simple casilla de una ficha técnica no revela. |
| [Gestión de energía](power-management.md) | Convierte una demostración funcional en un producto preparado para funcionar con batería. |
| [Registros y análisis de fallos](logging-crash-analysis.md) | Permite diagnosticar los fallos. |

</div>

## Regla práctica { #practical-rule }

Antes de cambiar el comportamiento del arranque, de OTA, del sistema de archivos o del almacenamiento, comprenda la tabla de particiones y compruebe la ruta de recuperación. Un fallo en la aplicación resulta incómodo; un error en la estructura de arranque o actualización puede hacer que recuperar la placa sea difícil.

## Lista de comprobación de preparación del producto { #product-readiness-checklist }

- [ ] Hay disponible, fuera de la ruta OTA habitual, un comando probado para grabar el dispositivo completo.
- [ ] La distribución de particiones está documentada en el repositorio del producto.
- [ ] Se ha probado el comportamiento ante fallos de OTA/DFU.
- [ ] Si se usa USB, están documentados los descriptores USB y quién gestiona el VID/PID.
- [ ] Se han medido los modos de bajo consumo en hardware real.
- [ ] Es posible decodificar los registros de fallos con el binario de la versión publicada.
- [ ] Los procedimientos de grabación de fábrica y de desarrollo están separados.
