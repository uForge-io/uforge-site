---
icon: lucide/app-window
description: "Guía para usar SiFli CodeKit por primera vez en VS Code: instalar la extensión, elegir una placa SF32, compilar y grabar hello_world y abrir la consola serie."
tags:
    - Primeros pasos
    - SiFli CodeKit
    - VS Code
---

# SiFli CodeKit { #sifli-codekit }

SiFli CodeKit es la extensión de VS Code para desarrollar con SiFli-SDK. Ofrece acciones guiadas para instalar las herramientas del SDK, seleccionar una placa, compilar un ejemplo, grabar el firmware y abrir una consola serie.

Utilice esta ruta si prefiere un flujo de trabajo con IDE. Si quiere entender los comandos que hay detrás de los botones, utilice la [guía manual de SiFli-SDK](getting-started-sifli-sdk.md).

Esta guía cubre la configuración inicial. Cuando `hello_world` funcione, consulte la [guía de referencia principal de CodeKit](../../develop/tools/codekit.md) para conocer su función en el trabajo diario, los requisitos para reproducir el entorno y los límites del soporte de CodeKit ante fallos.

## Qué necesitará { #what-youll-need }

**Hardware**

- Una placa de desarrollo SF32 compatible con SiFli-SDK.
- Un cable de datos USB tipo C conectado al puerto USB-to-UART de la placa.
- Un ordenador con Windows, macOS o Linux.

**Software**

- [Visual Studio Code](https://code.visualstudio.com/)
- La extensión SiFli CodeKit.
- Git, si CodeKit le pide clonar o importar SiFli-SDK.

**Referencia oficial**

- [Guía oficial de instalación de SiFli CodeKit](https://docs.sifli.com/projects/codekit/get-started/install.html)

## Instale CodeKit { #install-codekit }

1. Abra VS Code.
2. Abra **Extensions**.
3. Busque **SiFli-SDK-CodeKit**.
4. Instale la extensión.
5. Recargue VS Code si se le solicita.

Para abrir la administración del SDK, haga clic en el icono de SiFli en la barra lateral de VS Code y seleccione **SDK Manager**. También puede abrir **View > Command Palette** (atajo predeterminado: `F1`) y ejecutar **Manage SiFli SDK installation**. Los nombres exactos pueden variar según la versión de la extensión; consulte la guía oficial de instalación enlazada arriba.

!!! tip
    Si no encuentra la acción que necesita, abra la paleta de comandos y busque `SiFli`.

## Instale o seleccione SiFli-SDK { #install-or-select-sifli-sdk }

Utilice el flujo de configuración de CodeKit para instalar SiFli-SDK o indique la ruta de una copia que ya haya clonado. Para la mayoría de los usuarios, elija **Release/Tag**: es una base versionada y probada. Elija **Branch** si necesita correcciones o funciones más recientes y acepta una estabilidad menor. La guía oficial describe `release/vX.Y` como una rama que suele incluir las funciones y correcciones más recientes de esa línea de lanzamiento, sin tener que usar la rama `main`, menos estable. Aun así, su contenido puede cambiar con el tiempo.

Para usuarios en China continental, la guía oficial recomienda Gitee como origen del SDK y el espejo nacional de SiFli para descargar la cadena de herramientas.

Si CodeKit le pide la ubicación del SDK, elija una ruta corta y sin espacios, por ejemplo:

=== "macOS / Linux"

    ```text
    ~/OpenSiFli/SiFli-SDK
    ```

=== "Windows"

    ```text
    C:\OpenSiFli\SiFli-SDK
    ```

CodeKit utiliza el instalador y los scripts de entorno incluidos en el SDK. Así se prepara el mismo entorno que con la instalación manual: compilador, entorno de Python, herramientas de compilación y herramientas de grabación.

## Abra un ejemplo { #open-an-example }

Empiece con el ejemplo `hello_world` del SDK:

```text
example/get-started/hello_world/rtt/project
```

Abra esa carpeta de proyecto en VS Code. Si CodeKit ofrece un asistente de importación de proyectos, elija el proyecto `hello_world` y deje que detecte la raíz del SDK.

## Seleccione la placa { #select-the-board }

Elija la configuración que coincida con su hardware. Para una placa del tipo SF32LB52-DevKit-LCD, el nombre de placa habitual es:

```text
sf32lb52-lcd_n16r8
```

Si utiliza otra placa, seleccione el nombre correspondiente en la lista de CodeKit o en la documentación de placas compatibles del SDK. Ese nombre determina la disposición de memoria, la asignación de pines, los ajustes de Flash y los periféricos predeterminados.

## Compile { #build }

Ejecute la acción **Build** de CodeKit. Una compilación correcta crea una carpeta de salida específica de la placa, como:

```text
build_sf32lb52-lcd_n16r8_hcpu
```

Si la compilación falla de inmediato, compruebe que CodeKit sabe dónde está instalado SiFli-SDK y que la instalación del entorno del SDK ha terminado.

## Grabe el firmware { #flash }

Conecte la placa a través del puerto USB-to-UART y ejecute la acción **Flash** o **Download** de CodeKit.

Cuando se le pida un puerto serie:

- En Windows, elija el puerto `COM` correspondiente.
- En macOS, elija el dispositivo `/dev/cu.*` en lugar de `/dev/tty.*`.
- En Linux, elija el dispositivo `/dev/ttyUSB*` o `/dev/ttyACM*` correspondiente.

Si la herramienta de descarga no logra poner la placa en modo de descarga UART, reinicie la placa justo antes de iniciar la transferencia. Si el problema persiste, siga las instrucciones de grabación específicas de la placa.

## Abra la consola serie { #open-the-serial-console }

Utilice el monitor serie de CodeKit, las herramientas serie de VS Code u otro programa de terminal. Tras el reinicio, la consola debería mostrar una salida de arranque legible y la salida del ejemplo `hello_world`.

Si puede leer los mensajes de arranque, la placa y la configuración serie funcionan correctamente. Si la salida aparece distorsionada, cierre las demás herramientas serie y compruebe la velocidad en baudios que usa el ejemplo.

## Compruebe que todo funciona { #success-check }

Puede continuar cuando se cumplan estas condiciones:

- CodeKit reconoce la ubicación del SDK.
- La placa seleccionada coincide con su hardware.
- Las acciones de compilación y grabación se completan.
- La consola serie muestra la salida de `hello_world` tras el reinicio.

## Solución de problemas { #troubleshooting }

<div align="center"><em>Tabla: Solución de problemas</em></div>

<div align="center" markdown>

| Síntoma | Comprobación |
|:--------|:------|
| No aparece ningún puerto serie | Pruebe con un cable de datos, otro puerto USB o el conector USB-to-UART de la placa. |
| CodeKit no encuentra el SDK | Vuelva a ejecutar el flujo de configuración de CodeKit y seleccione la carpeta raíz de SiFli-SDK. |
| La compilación no encuentra las herramientas | Deje que CodeKit reinstale la cadena de herramientas o ejecute manualmente el instalador del SDK una vez. |
| La grabación no se inicia | Si la herramienta no entra en el modo de descarga UART, reinicie la placa justo antes de iniciar la transferencia. Si el problema persiste, siga las instrucciones de grabación específicas de la placa. |
| La salida serie es ilegible | Compruebe la velocidad en baudios y asegúrese de que solo haya un monitor serie abierto. |

</div>

## A dónde ir después { #where-to-go-next }

- Utilice [SiFli-SDK](getting-started-sifli-sdk.md) para entender los comandos de terminal equivalentes.
- Continúe con [Primeros pasos con los periféricos](../tutorials/beginner.md) una vez que `hello_world` funcione.
- Cuando empiece a implementar funciones para un producto real, consulte el [Resumen de Bluetooth](../../learn/bluetooth/overview.md), el [Resumen de gráficos](../../learn/graphics/overview.md), el [Resumen del audio local](../../learn/audio/overview.md) y el [Resumen del diseño de bajo consumo](../../learn/low-power/overview.md).

## Registre una configuración reproducible { #what-sifli-should-add }

Anote la versión de CodeKit y del SDK, la etiqueta o rama elegida y el objetivo exacto de la placa. Si algún nombre de menú o comando difiere, consulte la [guía oficial de instalación](https://docs.sifli.com/projects/codekit/get-started/install.html) y la [lista de placas compatibles](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) para las versiones instaladas.
