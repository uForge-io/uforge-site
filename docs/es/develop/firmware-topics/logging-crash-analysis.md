---
icon: lucide/file-warning
description: "Diseñe el registro y el análisis de fallos del firmware SF32 para diagnosticar problemas en campo: datos mínimos, flujo de informes y niveles de registro por etapa."
tags:
    - Desarrollo
    - Registros
    - Análisis de fallos
---

# Registros y análisis de fallos { #logging-and-crash-analysis }

Los registros forman parte del producto; no son solo una herramienta temporal de depuración. Un buen sistema de registro reduce el tiempo de puesta en marcha, el diagnóstico en campo y el análisis de fallos en fábrica.

Diseñe el sistema de registros antes de la primera prueba en campo. Si un dispositivo falla en campo, solo podrá recuperar los datos que el firmware estuviera preparado para guardar o emitir.

## Configuración mínima de registros { #minimum-logging-setup }

Anote lo siguiente para cada compilación del firmware:

- Versión del firmware.
- Rama o commit del SDK.
- Nombre y revisión de la placa.
- Motivo del arranque.
- Versión de la distribución de particiones.
- Resultados de inicialización de los subsistemas principales.
- Mensajes de fallo o de assert si no se completa el arranque.

## Flujo de análisis de fallos { #crash-analysis-flow }

1. Reproduzca el problema en una placa con una configuración de referencia cuyo funcionamiento ya esté comprobado.
2. Capture el registro completo desde el reinicio.
3. Guarde el binario exacto y los archivos de símbolos.
4. Decodifique la salida del assert o del volcado con las herramientas de SiFli.
5. Revise los tamaños de pila, quién gestiona cada región de memoria, los búferes DMA y el mantenimiento de la caché.
6. Aísle el problema usando como referencia el ejemplo del SDK más parecido.

## Niveles de registro { #log-levels }

<div align="center"><em>Tabla: Niveles de registro</em></div>

<div align="center" markdown>

| Etapa | Registro recomendado |
|:------|:---------------------|
| Puesta en marcha de la placa | Registros detallados de periféricos y arranque. |
| Desarrollo de funciones | Registros de depuración por módulo alrededor de la función que se prueba. |
| Ajuste del consumo energético | Registros mínimos, ya que el propio registro altera el consumo. |
| Versión candidata | Advertencias, errores, versión, motivo del arranque y comprobaciones de salud clave. |
| Versión de diagnóstico para incidencias en campo | Registros específicos del subsistema sospechoso. |

</div>

## Contenido de un buen informe de fallo { #what-makes-a-good-crash-report }

- Registro completo desde el reinicio hasta el fallo.
- Identificación del binario exacto.
- Archivos de símbolos o una compilación reproducible.
- Indicación de si el fallo también ocurre con un ejemplo del SDK sin modificar.
- Periféricos conectados y fuente de alimentación.
- Indicación de si el fallo persiste tras borrar toda la Flash y volver a grabarla.
