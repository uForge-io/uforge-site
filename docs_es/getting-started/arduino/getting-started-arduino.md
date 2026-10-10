---
icon: lucide/puzzle
description: "Primera puesta en marcha paso a paso del ArduinoCore-zephyr en beta de OpenSiFli en el SF32LB52 DevKit LCD: instale el paquete de placa, suba una prueba serie y Blink."
tags:
    - Primeros pasos
    - Arduino
---

# Arduino { #arduino }

OpenSiFli cuenta con un núcleo Arduino en beta para SF32 basado en Zephyr: [OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr). Publica el paquete Arduino `sifli:sf32lb52`, aparece en el Gestor de placas como **SiFli Serial Boards** y actualmente está dirigido a la placa **SiFli SF32LB52 DevKit LCD**.

Este núcleo resulta adecuado para probar sketches, comprobar periféricos rápidamente, preparar demostraciones y desarrollar prototipos iniciales. Para firmware de producción, ajustar la pila Bluetooth, crear aplicaciones con mucha carga gráfica, optimizar el consumo o poner en marcha una placa personalizada, utilice [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).

!!! warning "Núcleo en beta"
    OpenSiFli marca este núcleo de Arduino como **BETA** e indica que debe usarse solo para pruebas. Las funciones, las API, el comportamiento del cargador, el contenido del paquete y el proceso de publicación pueden cambiar. No lo consideres listo para producción.

## Qué necesitará { #what-youll-need }

**Hardware**

- SiFli SF32LB52 DevKit LCD.
- Un cable de datos USB tipo C conectado al puerto USB-to-UART de la placa.
- Un ordenador con Windows, macOS o Linux.

**Software**

- [Arduino IDE 2.x](https://www.arduino.cc/en/software) o [Arduino CLI](https://docs.arduino.cc/arduino-cli/).
- El paquete Arduino `sifli:sf32lb52` de OpenSiFli.
- Un monitor serie.

## Instala el paquete de placa { #install-the-board-package }

Abra **Arduino IDE > Settings** y añada esta URL en **Additional Boards Manager URLs**:

```text
https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

Para usuarios en China continental, utilice el índice de paquetes del espejo:

```text
https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

Después abra **Boards Manager**, busque **SiFli Serial Boards** e instale la plataforma `sifli:sf32lb52`.

Con Arduino CLI:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

Para usar el espejo de China:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

## Seleccione la placa { #select-the-board }

En Arduino IDE, seleccione:

```text
SiFli SF32LB52 DevKit LCD
```

El FQBN de la placa es:

```text
sifli:sf32lb52:sf32lb52devkitlcd
```

La definición de placa de OpenSiFli asigna esta placa Arduino al objetivo Zephyr `sf32lb52_devkit_lcd` y a la variante `sf32lb52_devkit_lcd_sf32lb525uc6`.

## Elija las opciones de compilación { #choose-build-options }

El núcleo expone dos menús importantes:

<div align="center"><em>Opciones de compilación</em></div>

<div align="center" markdown>

| Menú | Opción | Significado |
|:-----|:-------|:--------|
| **Mode** | `Standard` | El sketch se inicia automáticamente después de cargarse. |
| **Mode** | `Debug` | El shell de Zephyr espera el comando `sketch`. |
| **Link mode** | `Dynamic` | El sketch se empaqueta para el cargador de Zephyr. |
| **Link mode** | `Static` | El sketch se enlaza en un binario grabable. |

</div>

Elija **Dynamic** para usar el flujo del cargador de Zephyr. Elija **Static** si necesita que el sketch quede enlazado en una imagen de firmware grabable.

## Ponga la placa en modo de descarga serie { #put-the-board-in-serial-download-mode }

OpenSiFli documenta que el primer uso requiere que la placa esté en modo de descarga serie. Utilice la secuencia de arranque/reinicio del SF32LB52 DevKit LCD y luego suba el sketch desde Arduino IDE o CLI.

La herramienta de subida es `sftool`.

## Suba una prueba serie básica { #upload-a-serial-smoke-test }

Empiece comprobando la salida serie. Así puede verificar la subida, el reinicio, el arranque del entorno de ejecución y la salida por consola sin depender de la polaridad del LED:

```cpp
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello from SF32 Arduino");
  delay(1000);
}
```

Suba el sketch desde Arduino IDE, o utilice Arduino CLI:

```bash
arduino-cli compile \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch

arduino-cli upload \
  -p /dev/cu.usbserial-XXXX \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch
```

Sustituya `/dev/cu.usbserial-XXXX` por el puerto serie de su placa. En Windows, utilice el puerto `COM` correspondiente. En Linux, utilice el puerto `/dev/ttyUSB*` o `/dev/ttyACM*` correspondiente.

Abra el monitor serie a `115200` baudios. En el modo de compilación **Standard**, el sketch debería imprimir una línea por segundo. En el modo **Debug**, abra el shell de Zephyr y ejecute:

```text
sketch
```

## Suba Blink { #upload-blink }

Compruebe si la variante instalada del SF32LB52 DevKit LCD define `LED_BUILTIN`; no dé por hecho que los números de pin de Arduino son universales. Si la macro está disponible y la variante asigna el LED integrado, pruebe Blink cuando la prueba serie básica funcione. De lo contrario, consulte la documentación de la placa para confirmar la conexión y la polaridad del LED antes de elegir un GPIO.

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

## Solución de problemas { #troubleshooting }

<div align="center"><em>Tabla: Solución de problemas</em></div>

<div align="center" markdown>

| Síntoma | Comprobación |
|:--------|:------|
| El paquete no aparece | Confirme la URL del índice de paquetes y utilice Arduino IDE 2.x. |
| La subida falla | Ponga la placa en modo de descarga serie y asegúrese de que ningún monitor serie esté ocupando el puerto. |
| El sketch no se inicia | Confirme **Mode**. En `Debug`, ejecute `sketch` desde el shell de Zephyr. |
| Símbolo de Zephyr indefinido | El README del núcleo indica que las funciones de Zephyr que falten pueden necesitar exportarse en `loader/llext_exports.c` y que hay que recompilar el cargador. |
| Falta un subsistema de Zephyr | Active la opción `CONFIG_` necesaria en el `.conf` de la placa, recompile el cargador y suba. |
| Memoria insuficiente | El shell de Zephyr y la carga dinámica de sketches consumen RAM; reduzca el uso de pila o cambie el modo de compilación cuando proceda. |

</div>

## Alcance actual { #what-sifli-team-should-finish }

El paquete publicado actualmente está dirigido a la SF32LB52 DevKit LCD y sigue siendo una versión beta para pruebas. Antes de probar otra placa o depender de una API, consulte el [repositorio upstream](https://github.com/OpenSiFli/ArduinoCore-zephyr) y las notas de la versión correspondientes a la versión exacta del paquete. Que Zephyr o SiFli-SDK admitan una función no significa que también esté admitida en este paquete de Arduino.
