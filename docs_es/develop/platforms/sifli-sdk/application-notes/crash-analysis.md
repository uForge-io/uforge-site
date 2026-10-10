---
icon: lucide/file-search-2
title: "Capturar registros y analizar fallos"
description: "Capture registros y memoria correspondientes, restaure el contexto de un fallo y analice aserciones o hard faults con las herramientas de SiFli-SDK."
tags: [Desarrollo, SiFli-SDK, Notas de aplicación, Depuración]
---

# Capturar registros y analizar fallos { #capture-logs-and-analyze-crashes }

Las guías `debug_logging` y `crash_analysis` del SDK se complementan: los registros muestran qué hacían ambos núcleos, mientras que una imagen de memoria permite al depurador recuperar el contexto de ejecución en el momento del fallo. Conserve junto a cada captura el ELF correspondiente, los archivos de mapa y símbolos, la revisión del SDK, el modelo del chip, la configuración y la revisión de la placa.

## Elegir una conexión de depuración { #choose-a-debug-connection }

<div align="center" markdown>
<em>Tabla: Conexiones de depuración y registro por familia SF32</em>

| Familia | Métodos de depuración y registro |
|---|---|
| SF32LB52x, SF32LB56x, SF32LB58x | La guía oficial documenta la captura por UART, `SifliUsartServer`/`AssertDumpUart` y la recuperación con J-Link/Trace32. Use el transporte que siga disponible en el estado de suspensión seleccionado. |
| SF32LB55x | Se puede cambiar SWD entre HCPU y LCPU con `$SDK_ROOT/tools/segger/jlink_hcpu_a0.bat` y `jlink_lcpu_a0.bat`. La consola ROM de LCPU es UART3 a 1 000 000 baudios; HCPU puede usar UART1/2 o SWD. Como SWD utiliza PB IO, mantenga LPSYS activo o en Light Sleep mientras esté conectado. |

</div>

Cuando LPSYS sale del estado Standby, SWD vuelve a HCPU. Un reinicio de J-Link no cambia por sí solo el núcleo seleccionado. Si la salida asíncrona de registros está habilitada, el volcado de aserción puede quedar truncado. Para la ruta de fallo, use una captura síncrona o retenida.

## Capturar datos en tiempo real o un paquete para el análisis posterior al fallo { #capture-a-live-or-post-mortem-package }

En las versiones actuales del SDK, use `sdk.py` para capturar por UART o J-Link:

!!! note "Ámbito del ejemplo"
    El comando siguiente es un ejemplo para SF32LB52/LB525. Mantenga su estructura, pero sustituya el chip/modelo, núcleo, transporte y ELF por valores admitidos por la familia y versión del SDK de destino.

```text
sdk.py crash-dump capture-live --transport uart --probe /dev/ttyUSB0 \
  --chip SF32LB52 --chip-model LB525 \
  --output /tmp/live-crash --elf build_hcpu/main.elf
```

Añada `--include-psram --psram-size 8MB` si el destino utiliza PSRAM. Con una sonda J-Link se puede usar `--transport jlink --jlink-ip 127.0.0.1:19025`; seleccione el núcleo afectado con `--core hcpu` o `--core lcpu`. El directorio de salida debe contener el binario capturado, el ELF/AXF del núcleo correspondiente, `log.txt`, `manifest.json` y `sdk_manifest.json`.

En versiones antiguas del SDK, use el método específico de la familia descrito en la guía correspondiente:

- UART: `SifliUsartServer` o `AssertDumpUart` pueden exportar un paquete de aserción mientras la consola esté disponible.
- J-Link/SWD: añada J-Link a `PATH` y ejecute el script de la familia de destino; por ejemplo, para SF32LB55x use `$SDK_ROOT/tools/crash_dump_analyser/script/save_ram_55x.bat`. El script correspondiente guarda RAM, registros EPIC y PSRAM.
- Si necesita detectar fugas de memoria en el heap, habilite `RTOS → RT-Thread Kernel → Memory Management → Enable memory trace`.

Al capturar con scripts, haga coincidir el archivo `.jlink` con la familia, la configuración de PSRAM y el método de conexión. Para la conexión IP a través de `SifliUsartServer`, use el script para IP; para una conexión J-Link directa por USB, use el script para USB. Una combinación incorrecta puede hacer que falle la captura.

![Opción de traza de memoria de SF32LB52x en menuconfig](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_mem_trace.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: habilite la traza de memoria antes de reproducir un fallo si necesita datos del heap.</em></div>

La captura por UART normalmente requiere que coincidan la utilidad serie, la dirección del servidor y el núcleo de destino. Las capturas de pantalla siguientes, tomadas de la guía, ayudan a comprobar la conexión:

![Ubicación de las herramientas SiFli_Trace y SifliUsartServer](../../../../assets/develop/app-notes/crash-analysis/Sifli_Trace.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: directorio de herramientas.</em></div>

![Ajustes de conexión SifliUsartServer SF32LB52x](../../../../assets/develop/app-notes/crash-analysis/UsartServer52.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: el puerto serie, la velocidad en baudios, la dirección del servidor y el núcleo de depuración deben coincidir con el destino capturado.</em></div>

![Script de guardado de RAM del analizador de volcados](../../../../assets/develop/app-notes/crash-analysis/save_ram_uart_52.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: el directorio incluye scripts por familia y método de conexión, como `save_ram_55x.bat`, `save_ram_58x.bat` y `save_ram_uart_52x.bat`; elija el que corresponda al destino y a la conexión.</em></div>

## Restaurar y analizar el contexto { #restore-and-analyze-the-context }

Convierta el paquete capturado en un archivo core que pueda leer el depurador y analícelo con el ELF correspondiente:

```text
sdk.py crash-dump readcore --package /tmp/live-crash \
  --elf build_hcpu/main.elf --output /tmp/live-crash/coredump.elf
sdk.py crash-dump analyze --core /tmp/live-crash/coredump.elf \
  --elf build_hcpu/main.elf
```

El flujo antiguo de Trace32 carga un paquete de aserción HCPU con el botón HCPU assertion (HA) y `run_next_step`; para un volcado LCPU, use la configuración de recuperación LCPU. Si no aparece la pila de excepciones, compruebe qué núcleo seleccionó, el ELF y los rangos de memoria antes de interpretar los registros.

![Ejemplo de selección del script de captura de Trace32](../../../../assets/develop/app-notes/crash-analysis/dump_select.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: selección del script de captura J-Link/Trace32.</em></div>

![Ventana de aserción HCPU de Trace32](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_hcpu_window.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: tras recuperar el contexto, inspeccione conjuntamente la pila de llamadas, la lista de hilos, el heap y el motivo del error.</em></div>

## Detenerse al inicio o ante una posible condición de carrera { #stop-early-during-boot-or-a-suspected-race }

Para depurar la inicialización, descomente la primera instrucción del `Reset_Handler` correspondiente para que quede como `B .`:

Las rutas de los archivos de arranque siguientes corresponden a SF32LB55x; use los archivos equivalentes para otra familia.

- HCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_hcpu.S`
- LCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_lcpu.S`

Conecte J-Link e incremente el PC en dos bytes para continuar. En C, `_asm("B .");` crea la misma detención intencionada. No lo sustituya por `while (1);`: el compilador puede eliminar el código posterior al bucle.

## Analizar la información capturada { #read-the-evidence }

Un volcado de aserción suele incluir la función y la línea de la aserción, la tabla de hilos, el estado de los buzones y las colas de mensajes, los mutexes, los semáforos, el uso del heap y los registros de CPU. Correlacione el PC del fallo con el ELF exacto y compruebe el margen de pila, la propiedad de cualquier recurso implicado en una espera bloqueada, las entradas de las colas y la última línea del registro antes del fallo. Conserve el volcado original antes de simbolizarlo.

Para inspección interactiva, Ozone puede cargar los ELF de HCPU/LCPU y el SVD correspondiente a Cortex-M33 con FPU desde `$SDK_ROOT/tools/svd_external`. Si la interfaz SWD no puede conectarse debido al estado del núcleo, use UART o `SifliUsartServer`. ULOG puede usar UART; para utilizar Segger RTT, habilite su soporte y seleccione `segger` como dispositivo de registro de RT-Thread.

## Instrumentar fallos de bus y memoria { #instrument-bus-and-memory-failures }

El monitor de bus del SDK puede capturar accesos que provoquen un fallo de bus (bus fault). Registre un callback con `dbg_busmon_reg_callback` y use `dbg_busmon_read` y `dbg_busmon_write` del ejemplo de la guía para inspeccionar el rango de direcciones relevante. Combine esta información con el seguimiento del heap y el paquete de fallo; un volcado de registros sin símbolos ni contexto de memoria rara vez basta.

![Ejemplo de pila de llamadas del heap en Trace32](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_heap_callstack.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la guía SF32LB52x: pila de llamadas del heap y ventanas de memoria.</em></div>

Fuentes oficiales por familia: [análisis de fallos SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/crash_analysis.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/crash_analysis.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/crash_analysis.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/crash_analysis.html) y la [guía correspondiente de depuración y registro](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/debug_logging.html).
