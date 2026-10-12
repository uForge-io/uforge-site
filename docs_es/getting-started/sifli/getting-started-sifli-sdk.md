---
icon: lucide/terminal
description: "Ponga en marcha hello_world por UART en una placa SF32 con SiFli-SDK: instale la cadena de herramientas, compile con scons y grabe el firmware mediante descarga UART."
tags:
    - Primeros pasos
    - SiFli SDK
---

# SiFli-SDK { #sifli-sdk }

Esta guía explica cómo pasar de una placa de desarrollo SF32 recién sacada de la caja a ejecutar el ejemplo `hello_world` por UART con **SiFli-SDK**, el SDK oficial basado en RT-Thread para dispositivos SF32.

Aunque tenga previsto usar Arduino, Zephyr o MicroPython, conviene completar esta guía una vez. Así podrá comprobar que la placa, el cable, el puerto serie, el proceso de grabación por UART y la cadena de herramientas básica funcionan antes de incorporar otro framework.

## Qué necesitará { #what-youll-need }

**Hardware**

- Una placa de desarrollo SF32, como el [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md), u otra placa que identifique en la [Familia SF32](../../sf32-products/family/SF32_family.md).
- Un cable USB tipo C de **datos** conectado al puerto USB-to-UART de la placa; no utilice un cable solo de carga ni un puerto secundario de función USB.
- Un ordenador con Windows, macOS o Linux.

**Software**

- [git](https://git-scm.com/)
- Una cadena de herramientas de C/C++ preparada con [`uv`](https://docs.astral.sh/uv/getting-started/installation/) (el instalador de SiFli-SDK descarga el compilador, el depurador y el entorno de Python)
- El propio repositorio de [SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

**Referencias oficiales**

- [Guía de instalación de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)
- [Placas compatibles con SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)
- [Repositorio de SiFli-SDK en OpenSiFli](https://github.com/OpenSiFli/SiFli-SDK)
- [Versiones publicadas de SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK/releases)

!!! tip "¿Prefiere un IDE?"
    SiFli también publica una extensión **SiFli-SDK-CodeKit** para VS Code que empaqueta la configuración, la compilación y el flujo de grabación del SDK en acciones guiadas. Consulte [SiFli CodeKit](getting-started-sifli-codekit.md) si prefiere ese flujo de trabajo.

## Instale la cadena de herramientas { #install-the-toolchain }

Para partir de una base reproducible, utilice una etiqueta de versión publicada en lugar de `main`. En el momento de esta revisión, la etiqueta publicada más reciente es `v2.5.1`; consulte la [lista oficial de versiones](https://github.com/OpenSiFli/SiFli-SDK/releases) por si hubiera una más nueva. La rama `release/v2.5` recibe actualizaciones de esa serie y puede cambiar con el tiempo.

=== "macOS / Linux"

    Instale `uv`, el gestor de paquetes y entornos en el que se apoyan los scripts de SiFli-SDK:

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

    Clone el SDK:

    ```bash
    mkdir -p ~/OpenSiFli && cd ~/OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Ejecute el instalador y luego cargue el entorno del SDK en su shell:

    ```bash
    cd SiFli-SDK
    ./install.sh
    . ./export.sh
    ```

=== "Windows"

    Instale `uv` (PowerShell):

    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    Clone el SDK:

    ```powershell
    mkdir C:\OpenSiFli
    cd C:\OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Ejecute el instalador y luego cargue el entorno del SDK:

    ```powershell
    cd SiFli-SDK
    .\install.ps1
    .\export.ps1
    ```

!!! info "SiFli-SDK contiene submódulos"
    La opción «Download ZIP» de GitHub no incluirá los submódulos necesarios. Utilice `git clone --recursive`. Si ya lo clonó sin submódulos, ejecute `git submodule update --init --recursive` desde la raíz del SDK.

!!! note "¿Trabaja desde China continental?"
    Antes de instalar, configure `SIFLI_SDK_MIRROR_CHINA` con el valor `1` en la shell: utilice `export SIFLI_SDK_MIRROR_CHINA=1` en macOS/Linux o `$env:SIFLI_SDK_MIRROR_CHINA = "1"` en PowerShell. También puede clonar desde el [espejo de Gitee](https://gitee.com/SiFli/sifli-sdk) en lugar de GitHub. Consulte la [guía de instalación](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html) para más detalles.

`install.sh` / `install.ps1` descarga las versiones correspondientes del compilador y el depurador, además de las dependencias de Python. Vuelva a ejecutar el instalador cuando cambie la versión del SDK. `export.sh` / `export.ps1` activa ese entorno en el terminal actual; ejecútelo cada vez que abra uno nuevo para compilar. En Windows, ejecute los scripts `.ps1` desde PowerShell.

## Elija el objetivo de placa { #choose-the-board-target }

El valor que se pasa a `scons --board` es el nombre del directorio de la placa dentro de `customer/boards`. Elija el objetivo que coincida con la configuración de memoria y pantalla de su placa. Los nombres distinguen entre mayúsculas y minúsculas.

<div align="center" markdown>

*Objetivos de compilación de las placas de desarrollo de SiFli-SDK*

| Placa de desarrollo | Objetivos exactos de `scons --board` |
| --- | --- |
| SF32LB52-DevKit-Core-3p3 | `sf32lb52-core_e8r16`<br>`sf32lb52-core_n16r16` |
| SF32LB52-DevKit-LCD | `sf32lb52-lcd_52d`<br>`sf32lb52-lcd_n16r8`<br>`sf32lb52-lcd_a128r16` |
| SF32LB52-DevKit-Nano | `sf32lb52-nano_n4`<br>`sf32lb52-nano_n16r16`<br>`sf32lb52-nano_a128r16` |
| Huangshan-Pi (SF32LB52-LCHSPI-ULP) | `sf32lb52-lchspi-ulp` |
| SF32LB56-DevKit-LCD | `sf32lb56-lcd_a128r12n1`<br>`sf32lb56-lcd_n16r12n1` |
| SF32LB58-DevKit-LCD | `sf32lb58-lcd_a128r32n1_dsi`<br>`sf32lb58-lcd_a128r32n1_qspi`<br>`sf32lb58-lcd_n16r32n1_dpi`<br>`sf32lb58-lcd_n16r32n1_dsi`<br>`sf32lb58-lcd_n16r32n1_qspi`<br>`sf32lb58-lcd_n16r64n4` |

</div>

En una placa de doble núcleo, si omite el sufijo del núcleo se compila la configuración HCPU. Puede indicar `_hcpu` explícitamente o añadir `_lcpu` para compilar la configuración LCPU; por ejemplo, `scons --board=eh-lb551_lcpu`. Si su configuración no aparece en la tabla, consulte la [lista oficial de placas compatibles](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html), que contiene la información más reciente.

## Compile el ejemplo «Hello World» { #build-the-hello-world-example }

Con el entorno cargado, compile el ejemplo `hello_world` de RT-Thread para su placa:

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb52-lcd_n16r8 -j8
```

Sustituya `sf32lb52-lcd_n16r8` por el nombre de su placa. Consulte la [lista de placas compatibles](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) para ver los nombres disponibles. `-j8` compila con 8 procesos en paralelo; ajuste ese número a su equipo. Como el comando del ejemplo omite el sufijo del núcleo, se compila HCPU y los binarios se guardan en `build_sf32lb52-lcd_n16r8_hcpu/`. Si indica explícitamente un destino con sufijo `_lcpu`, el directorio de salida también termina en `_lcpu`.

!!! tip "¿Necesita ajustes personalizados?"
    Ejecute `sdk.py menuconfig --board=<board_name>` desde el directorio del proyecto para abrir el menú de configuración interactivo. Pulse ++esc++ dos veces y, cuando se le indique, elija guardar la configuración.

## Grabe el firmware en la placa { #flash-the-board }

Mantenga la placa conectada por USB y ejecute el script de grabación UART generado por la compilación:

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

    Cuando se le pida el puerto serie, introduzca la ruta del dispositivo que muestra el sistema operativo. En macOS, utilice `/dev/cu.*` (por ejemplo, `/dev/cu.usbserial-12345678`), no `/dev/tty.*`; en Linux, utilice la ruta correspondiente, como `/dev/ttyUSB0`.

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

    Cuando se le pida `please input serial port number`, escriba solo el número de su puerto COM (por ejemplo, `19` para `COM19`) y pulse Intro.

!!! tip
    Si la herramienta no consigue entrar en el modo de descarga UART, reinicie la placa justo antes de iniciar la transferencia. Si el problema persiste, siga las instrucciones de grabación específicas de la placa.

## Véalo en funcionamiento { #see-it-run }

Una vez completada la grabación, reinicie la placa o deje que se reinicie automáticamente. Abra un terminal serie a la velocidad en baudios predeterminada de la placa. Debería ver la salida de arranque y la salida del ejemplo `hello_world` por UART.

## Verifique que todo funciona { #success-check }

Puede continuar cuando se cumplan estas condiciones:

- El proyecto compila sin errores.
- El script de descarga por UART se completa.
- La consola serie muestra una salida de arranque legible.
- El ejemplo `hello_world` muestra su salida después del reinicio.

## A dónde ir después { #where-to-go-next }

- **Elija su chip:** compare las series LB52, LB55, LB56 y LB58 en la [Familia SF32](../../sf32-products/family/SF32_family.md).
- **Explore más ejemplos:** más allá de `hello_world`, el SDK incluye ejemplos de BLE, Bluetooth clásico, gráficos LVGL, audio y modos de bajo consumo.
- **¿Prefiere otro framework?** Continúe con [Arduino](../arduino/getting-started-arduino.md), [Zephyr](../zephyr/getting-started-zephyr-upstream.md) o [MicroPython](../micropython/getting-started-micropython.md).
- **¿Necesita ayuda?** Consulte las [preguntas frecuentes de SiFli](https://wiki.sifli.com/en/faq/index.html) para resolver problemas habituales de la cadena de herramientas, J-Link y depuración.

## Registre su configuración de referencia { #what-sifli-should-add }

Para poder repetir la configuración, anote la etiqueta o rama del SDK, el objetivo exacto de `scons --board`, el sistema operativo del equipo, el puerto serie y el procedimiento de descarga que funcionó con su placa. Al actualizar el SDK o cambiar de placa, vuelva a consultar la [lista oficial de placas compatibles](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) y las [versiones publicadas](https://github.com/OpenSiFli/SiFli-SDK/releases).
