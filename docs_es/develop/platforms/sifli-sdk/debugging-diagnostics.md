---
icon: lucide/bug
description: "Depure el firmware SF32 con sftool, AssertDump, SiFli_Trace y el shell de RT-Thread mediante un orden reproducible y una lista de comprobación para informar de fallos."
tags:
    - Desarrollo
    - Depuración
---

# Depuración y diagnóstico { #debugging-and-diagnostics }

Empiece a depurar SF32 con los registros del puerto serie. Según el chip, la versión del SDK y la configuración del proyecto, también puede disponer de herramientas de volcados de fallos, captura de trazas y shell de RT-Thread; use únicamente los procedimientos documentados para el dispositivo objetivo.

## Depuración inicial { #first-line-debugging }

Use la consola serie para recopilar:

- Registros de arranque.
- Mensajes de la aplicación.
- Salida del shell de RT-Thread, si está habilitado en el proyecto.
- Mensajes de fallo.
- Comportamiento de la descarga y del reinicio.

Guarde los registros junto con la revisión de la placa, la rama del SDK, el comando de compilación, el comando de grabación y la configuración serie.

## Orden de depuración { #debugging-order }

1. Reproduzca el problema con el mismo firmware.
2. Compruebe si vuelve a aparecer tras un reinicio.
3. Compruebe si vuelve a aparecer después de volver a grabar el firmware completo.
4. Compruebe si se reproduce con el ejemplo del SDK más cercano.
5. Vuelva a incorporar los cambios específicos del producto de uno en uno.

Así se evita mezclar los fallos del hardware, el soporte de placa, el middleware y la aplicación.

## Herramientas que conviene conocer { #tools-to-know }

<div align="center"><em>Tabla: Herramientas que conviene conocer</em></div>

<div align="center" markdown>

| Herramienta | Uso |
|:------------|:----|
| `sftool` | Herramienta de línea de comandos serie para leer, escribir o borrar Flash y restablecer los chips compatibles; las opciones dependen del chip y del almacenamiento. |
| `SiFli_Trace` | Captura y consulta de los registros de la placa mediante el flujo compatible con el objetivo. |
| `UsartServer` | Herramienta auxiliar necesaria para depurar por UART mediante el Debug IP integrado, según el procedimiento documentado para SF32LB52X y SF32LB56X; no presuponga que se aplica a todos los dispositivos. |
| `AssertDump` y herramientas de volcados | Úselas solo si están disponibles para el chip y la versión del SDK; siga el procedimiento de captura y análisis documentado para esa versión. |
| Shell de RT-Thread | Inspección y comandos en tiempo de ejecución solo si la configuración del proyecto habilita la shell. |

</div>

## Qué revisar primero { #what-to-inspect-first }

<div align="center"><em>Tabla: Qué revisar primero</em></div>

<div align="center" markdown>

| Síntoma | Primeras comprobaciones |
|:--------|:------------------------|
| HardFault o assert | Tamaño de pila, punteros nulos, búferes DMA, mantenimiento de caché. |
| Periférico sin respuesta | Multiplexación de pines, reloj, raíl de alimentación, nombre de placa, activación del controlador. |
| Bluetooth inestable | Reloj RF, ruta de antena, configuración de la pila Bluetooth y parámetros de conexión. |
| Artefactos gráficos en pantalla | Temporización del panel, formato del búfer, sincronización de caché/DMA. |
| Reinicio aleatorio | Watchdog, raíl de alimentación, caída de tensión, desbordamiento de pila. |

</div>

## Lista de comprobación para informar de un fallo { #crash-report-checklist }

Al informar de un fallo, incluya:

- Placa y revisión.
- Variante del chip.
- Rama o commit del SDK.
- Ejemplo o proyecto exacto.
- Comando de compilación y nombre de placa.
- Comando de grabación.
- Registro del puerto serie desde el reinicio.
- Volcado del fallo o salida del assert.
- Indicación de si el problema se reproduce en un ejemplo del SDK sin modificar.
