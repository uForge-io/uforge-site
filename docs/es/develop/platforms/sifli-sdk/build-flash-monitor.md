---
icon: lucide/terminal
description: "Flujo diario con SiFli-SDK: active el entorno, compile con scons, grabe por descarga UART o sftool y supervise la salida serie."
tags:
    - Desarrollo
    - SiFli-SDK
---

# Compilar, grabar y supervisar la salida serie { #build-flash-monitor }

Esta página presenta el flujo de trabajo diario con SiFli-SDK: activar el entorno, compilar con `scons`, grabar el firmware en la placa y supervisar los registros.

## Activar el SDK { #activate-the-sdk }

Instale el entorno del SDK siguiendo la [guía oficial de instalación](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html) correspondiente a su versión. Antes de compilar, active el entorno en cada terminal nuevo ejecutando el script de exportación desde la raíz del SDK:

=== "macOS / Linux"

    ```bash
    cd ~/OpenSiFli/SiFli-SDK
    . ./export.sh
    ```

=== "Windows"

    ```powershell
    cd C:\OpenSiFli\SiFli-SDK
    .\export.ps1
    ```

El script de exportación carga en el terminal actual el entorno correspondiente a la copia del SDK que se está utilizando. Los pasos de instalación y gestión del entorno pueden variar según la versión; consulte la guía oficial correspondiente.

## Compilar { #build }

Desde el directorio del proyecto de ejemplo:

```bash
scons --board=<board_name> -j8
```

Elija un valor de `-j` adecuado para su equipo. Si el nombre de la placa no especifica un núcleo, el SDK selecciona HCPU por defecto. Por ejemplo, `sf32lb52-lcd_n16r8` genera `build_sf32lb52-lcd_n16r8_hcpu/`. Use el directorio de salida correspondiente a la combinación de placa y núcleo que determine el SDK; no añada `_hcpu` de nuevo si el identificador de la placa ya especifica un núcleo.

## Compilación limpia { #clean-rebuilds }

Realice una compilación limpia al cambiar de placa, modificar una configuración importante o investigar un artefacto sospechoso. Desde el directorio del proyecto de ejemplo, use la opción de limpieza de SCons:

```bash
scons -c
```

Este comando limpia los objetivos de compilación y los archivos temporales y archivos de objeto generados. Después, vuelva a compilar con la configuración de placa prevista.

## Grabar el firmware { #flash }

Por ejemplo, para el destino HCPU de `sf32lb52-lcd_n16r8`, use el script de descarga UART generado por la compilación:

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

OpenSiFli también publica [`sftool`](https://github.com/OpenSiFli/sftool), una utilidad de línea de comandos de código abierto para comunicarse con los SoC SiFli mediante una interfaz serie. Entre las operaciones documentadas se incluyen escribir, leer y borrar la memoria flash, así como controlar el reinicio del chip. Consulte el README de la herramienta para conocer los chips y tipos de almacenamiento compatibles y las opciones de los comandos.

## Supervisar la salida serie { #monitor }

Use un terminal serie configurado para la placa y el ejemplo. El registro serie debería mostrar la salida de arranque, los mensajes de inicio de RT-Thread, los mensajes de la aplicación o el prompt de shell.

Anote lo siguiente:

- Nombre de la placa.
- Puerto serie.
- Velocidad en baudios.
- Comando de compilación.
- Comando de grabación del firmware.
- Rama o versión del SDK.

## Ciclo diario de desarrollo { #daily-developer-loop }

<div align="center"><em>Tabla: Ciclo diario de desarrollo</em></div>

<div align="center" markdown>

| Paso | Objetivo |
|:-----|:---------|
| Activar | Cargar el entorno del SDK en el terminal actual. |
| Configurar | Seleccionar la placa y las opciones de funciones. |
| Compilar | Generar binarios específicos de la placa. |
| Grabar | Grabar la imagen del firmware en la placa. |
| Supervisar | Confirmar el arranque y el comportamiento de la aplicación. |
| Registrar | Guardar los comandos y los detalles de los registros para poder repetir el proceso. |

</div>

## Empiece con un ejemplo adecuado { #start-from-a-matching-example }

Antes de crear un proyecto o de modificarlo en profundidad, elija el [ejemplo del SDK](../../examples/index.md) que mejor se ajuste a la placa y al subsistema crítico. Primero compile y grabe el ejemplo sin modificar y compruebe su salida serie; después, registre junto al proyecto adaptado el nombre de la placa, la versión del SDK, los comandos y la salida esperada.

Si usa [CodeKit](../../tools/codekit.md), conserve esos mismos registros de validación y confirme que las acciones del editor se pueden reproducir mediante los comandos del SDK.

## Resolución de problemas { #troubleshooting }

<div align="center"><em>Tabla: Resolución de problemas</em></div>

<div align="center" markdown>

| Síntoma | Comprobación |
|:--------|:-------------|
| No se encuentra la herramienta de compilación | Vuelva a ejecutar `export.sh` / `export.ps1` en el terminal actual. |
| Nombre de placa desconocido | Consulte la documentación de placas compatibles con el SDK. |
| El script de descarga no puede abrir el puerto | Cierre los terminales serie y compruebe el cable/conector USB a UART. |
| No se inicia la grabación | Siga el procedimiento de descarga documentado para la placa. Para `sf32lb52-lcd_n16r8`, después de seleccionar el puerto serie, reinicie la placa y pulse Enter antes de que transcurran 2 segundos para iniciar la descarga; para otras placas, siga el procedimiento específico de cada una. Compruebe también la alimentación, el puerto seleccionado y la conexión UART. |
| La salida serie es ilegible | Compruebe la velocidad en baudios y conecte el UART con un cable USB que admita datos, no con uno solo de carga. |

</div>

## Lista de comprobación para el traspaso { #handoff-checklist }

Antes de entregar un proyecto a otro desarrollador, incluya:

- Rama o commit del SDK.
- Nombre de placa.
- Notas de configuración/instalación.
- Comando de compilación.
- Comando de grabación.
- Ajustes del monitor.
- Primeras líneas de registro esperadas.
- Comando de recuperación.
