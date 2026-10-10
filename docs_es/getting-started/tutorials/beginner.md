---
icon: lucide/footprints
description: "Tutoriales prácticos de periféricos SF32 después de hello_world: GPIO, FinSH, ADC, PWM, RTC y un pequeño proyecto con una placa de desarrollo."
tags:
    - Tutoriales
---

# Primeros pasos con los periféricos { #beginner-tutorials }

Estos tutoriales continúan justo después de [Primeros pasos](../index.md). Debería tener instalada la cadena de herramientas de SiFli-SDK, haber flasheado `hello_world` al menos una vez y saber abrir la consola serie. Cada tutorial es deliberadamente breve: un concepto, un periférico y un criterio de éxito claro.

Los ejemplos asumen una placa de la clase SF32LB52-DevKit-LCD, como `sf32lb52-lcd_n16r8`. Si utiliza otra placa, sustituya el nombre de placa en el comando de compilación y confirme los nombres de pines, las instancias de periférico y la disposición de almacenamiento a partir de los archivos de soporte de esa placa.

Utilice esta serie para adquirir hábitos de trabajo fiables: verifique un comportamiento en la placa, defina un criterio de éxito claro y conserve una configuración funcional de referencia antes de pasar al siguiente periférico. Está pensada para quienes empiezan con el SDK de SF32, aunque ya tengan experiencia con C para sistemas embebidos.

## Antes de empezar { #before-you-start }

Utilice el mismo bucle básico para cada tutorial:

```bash
scons --board=<board_name> -j8
# then flash with the download script or tool used in Get Started
```

Mantenga abierto un terminal serie. La mayoría de los problemas iniciales se resuelven con más facilidad si puede ver la salida de `rt_kprintf()` y el prompt `msh>` de FinSH.

Los ejemplos de C son fragmentos, no archivos fuente completos. Añada los encabezados, las declaraciones, la inicialización específica de la placa, la comprobación de valores devueltos y la limpieza que requieran su proyecto y la versión del SDK.

<div align="center"><em>Tabla: Antes de empezar</em></div>

<div align="center" markdown>

| Elemento | Comprobación |
|:-----|:------|
| Nombre de placa | Coincide con una de las configuraciones de placa compatibles. |
| Puerto serie | Se abre sin problemas y muestra la salida de arranque. |
| Herramienta de flasheo | Permite volver a programar la placa sin cambiar los cables. |
| Esquemático o archivos de placa | Disponibles antes de elegir recursos de GPIO, ADC, PWM o RTC. |
| Un cambio cada vez | Compile, flashee y verifique después de cada pequeña modificación. |

</div>

## Haga parpadear un LED con GPIO { #blink-an-led-with-gpio }

**Objetivo:** controlar un pin GPIO desde el firmware: el equivalente, en desarrollo embebido, a completar una primera compilación con éxito.

**Tiempo:** 15 minutos

**Empiece con:** `example/hal/gpio` o `example/rt_device/gpio`

El SDK de SF32 basado en RT-Thread expone GPIO mediante la API estándar **PIN device** de RT-Thread. Un bucle mínimo de parpadeo se ve así:

```c
#include <rtthread.h>
#include <rtdevice.h>

#define LED_PIN GET_PIN(1, 0)  /* replace with your board's LED pin */

int main(void)
{
    rt_pin_mode(LED_PIN, PIN_MODE_OUTPUT);

    while (1)
    {
        rt_pin_write(LED_PIN, PIN_HIGH);
        rt_thread_mdelay(500);
        rt_pin_write(LED_PIN, PIN_LOW);
        rt_thread_mdelay(500);
    }
}
```

1. Copie el ejemplo de GPIO más cercano en su propio directorio de proyecto, o edítelo en el mismo sitio mientras aprende.
2. Busque el pin del LED en el esquemático o en los archivos de soporte de la placa. No adivine la numeración de puerto y pin.
3. Compile y flashee con el mismo nombre de placa usado para `hello_world`.
4. Confirme que el LED parpadea a la velocidad esperada.
5. Cambie el retardo a 100 ms, recompile y confirme que la velocidad de parpadeo visible cambia.

**Criterios de éxito:** el LED se conmuta repetidamente, la consola serie sigue mostrando la salida de arranque normal, y cambiar el retardo cambia la velocidad de parpadeo.

**Si no funciona:** compruebe la polaridad activa, si el LED está conectado a través de un transistor, si el pin ya está en uso por otra función, y si el nombre de su placa coincide con el hardware que tiene delante.

**Lo que ha aprendido:** la abstracción **PIN device** de RT-Thread, las definiciones de pines específicas de la placa y el ciclo básico de editar, compilar y flashear.

## Lea un botón con entrada GPIO { #read-a-button-with-gpio-input }

**Objetivo:** leer una entrada digital y reaccionar a la pulsación de un botón.

**Tiempo:** 20 minutos

**Empiece con:** `example/rt_device/gpio`

Leer un botón usa la misma API de PIN en modo de entrada. Empiece con una lectura simple para confirmar el cableado y el nivel lógico:

En el SDK de SiFli, la API PIN device de RT-Thread no configura las resistencias pull-up o pull-down del pad mediante `rt_pin_mode()`. Para un botón activo en bajo, confirme que la placa incorpora una resistencia pull-up o configúrelo mediante el pinmux de esa placa con `HAL_PIN_Set(...)`. El pad, la función y el dominio de CPU dependen de la placa; no copies una asignación de pines sin verificarla.

```c
rt_pin_mode(BUTTON_PIN, PIN_MODE_INPUT);

if (rt_pin_read(BUTTON_PIN) == PIN_LOW)
{
    /* button pressed, active-low */
}
```

Para aplicaciones que vayan más allá de una prueba rápida, usa una interrupción en vez de consultar continuamente el pin dentro de un bucle cerrado. Así el firmware puede reaccionar a un flanco de entrada sin leer el pin una y otra vez; si el diseño permite que la CPU entre en reposo entre eventos, también puede reducir el consumo:

```c
rt_pin_attach_irq(BUTTON_PIN, PIN_IRQ_MODE_FALLING, button_isr, RT_NULL);
rt_pin_irq_enable(BUTTON_PIN, PIN_IRQ_ENABLE);
```

1. Identifique un botón o pin de entrada disponible en su placa.
2. Empiece con una lectura por sondeo e imprima el valor bruto mientras pulsa y suelta el botón.
3. Confirme si el botón es activo en alto o activo en bajo.
4. Cambie a un manejador de interrupción una vez que la lectura básica funcione.
5. Conmute el LED del Tutorial 1 cada vez que se pulse el botón.
6. Añada una estrategia sencilla de antirrebote, ya sea ignorando eventos durante un intervalo corto o validando el nivel después de un pequeño retardo.

**Criterios de éxito:** una pulsación física provoca una única acción de firmware prevista, sin activaciones repetidas por rebote.

**Si no funciona:** verifique que la placa proporcione la resistencia pull-up o pull-down necesaria o que esté configurada mediante el pinmux. Después compruebe la polaridad del botón, el flanco de interrupción seleccionado y si el pin se comparte con el modo de arranque, la depuración u otro periférico.

**Lo que ha aprendido:** cómo configurar una entrada digital, distinguir entre lógica activa en alto y activa en bajo y usar interrupciones; también, por qué el sondeo continuo puede desperdiciar energía. Consulte el [Resumen del diseño de bajo consumo](../../learn/low-power/overview.md#sleep-aware-firmware-design) para conocer el motivo a nivel de sistema.

## Use el shell e imprima salida de depuración { #use-the-shell-and-print-debug-output }

**Objetivo:** familiarizarse con la consola FinSH y `rt_kprintf()` antes de que la depuración se complique.

**Tiempo:** 15 minutos

**Empiece con:** `example/system/finsh`

El shell **FinSH** de RT-Thread le ofrece un prompt interactivo `msh>` sobre la misma UART usada para los registros de arranque. Desarrolle estos hábitos desde el principio:

- Utilice `rt_kprintf()` para un registro de depuración ligero en lugar de escrituras UART directas.
- Utilice comandos de shell integrados como `list_thread`, `list_device` y comandos de memoria/estado para inspeccionar el sistema en ejecución.
- Mantenga los registros breves y significativos; un registro excesivo puede cambiar el comportamiento de temporización y consumo.

1. Flashee cualquiera de los ejemplos anteriores y vuelva a abrir su terminal serie.
2. Pulse Intro para obtener el prompt `msh>`.
3. Ejecute `list_thread` y `list_device`.
4. Añada llamadas a `rt_kprintf()` al manejador de botón del Tutorial 2.
5. Confirme que los registros aparecen cuando pulsa el botón.

**Criterios de éxito:** puede inspeccionar hilos y dispositivos desde el shell y correlacionar sus propios mensajes de registro con eventos físicos.

**Si no funciona:** compruebe la velocidad en baudios serie, la selección de puerto, si el componente de shell está habilitado, y si otra herramienta está ocupando el puerto serie.

**Lo que ha aprendido:** cómo inspeccionar un sistema en ejecución sin conectar un depurador y cómo apoyarse en registros sencillos y fáciles de añadir, en vez de cambiar el firmware a ciegas cada vez que surge un problema.

## Lea un sensor analógico con ADC { #read-an-analog-sensor-with-adc }

**Objetivo:** muestrear una tensión analógica desde un potenciómetro, un sensor sencillo o una entrada de medición de batería.

**Tiempo:** 20 minutos

**Empiece con:** `example/rt_device/adc/channel`

Para este ejemplo RT-Thread, habilite `BSP_USING_ADC`, `BSP_USING_ADC1` y `RT_USING_ADC`; de lo contrario, el SDK no registrará `bat1`. En SF32LB52, el canal 7 está conectado internamente a VBAT, por lo que no es una entrada genérica para sensores externos. Seleccione un canal ADC y un pinmux compatibles con el chip y la placa concretos. En el ejemplo documentado para SF32LB52, el canal 0 utiliza PA28. En el ejemplo actual del SDK de SiFli, `rt_adc_read()` devuelve un valor de tensión escalado en unidades de 0,1 mV, no cuentas ADC sin convertir; compruebe la unidad y la conversión para el chip y la versión del controlador concretos que utilice.

```c
rt_adc_device_t adc = (rt_adc_device_t)rt_device_find("bat1");
rt_adc_enable(adc, channel);
rt_uint32_t voltage_0p1mV = rt_adc_read(adc, channel);
```

1. Identifique un pin y un canal con capacidad ADC en su placa.
2. Confirme el rango de tensión de entrada y si existe un divisor o un circuito de acondicionamiento analógico.
3. Localice el dispositivo ADC registrado, habilite el canal y lea su valor.
4. Aplique la conversión documentada para ese controlador. En el ejemplo actual de SF32LB52, divida el valor devuelto entre 10 para obtener milivoltios; no vuelva a aplicar una fórmula de cuentas sin procesar y tensión de referencia. Si hay un divisor externo, tenga en cuenta su relación para calcular la tensión anterior al divisor.
5. Imprima el resultado a través del shell del Tutorial 3.
6. Varíe la entrada lentamente y confirme que la lectura cambia con suavidad.

**Criterios de éxito:** el valor indicado cambia en la dirección esperada y corresponde a una tensión de entrada plausible al aplicar la escala documentada y la relación de cualquier divisor de la placa.

**Si no funciona:** compruebe el multiplexado de pines, el número de canal, la escala y calibración documentadas por el controlador, el rango de entrada, si la entrada está flotante y si el sensor necesita alimentación o tiempo de estabilización antes del muestreo.

**Lo que ha aprendido:** el patrón `rt_device_find()` que se usa en los controladores de dispositivo de RT-Thread. Lo reutilizará para I2C, SPI, PWM, almacenamiento y controladores personalizados.

## Genere una salida PWM { #drive-a-pwm-output }

**Objetivo:** generar una señal PWM para atenuar un LED o accionar un zumbador sencillo.

**Tiempo:** 20 minutos

**Empiece con:** `example/rt_device/pwm`

El nombre del dispositivo PWM depende del controlador de temporizador habilitado para la placa. El SDK utiliza nombres como `pwm3`, `pwmlp1` y `pwma1`; `pwm3` en el ejemplo siguiente es solo ilustrativo, no es un nombre universal. Confirme el nombre del dispositivo registrado y el multiplexado de pines en la configuración de la placa.

```c
struct rt_device_pwm *pwm = (struct rt_device_pwm *)rt_device_find("pwm3");
rt_pwm_set(pwm, channel, period_ns, pulse_ns);
rt_pwm_enable(pwm, channel);
```

1. Elija un canal con capacidad PWM y confirme el multiplexado de pines.
2. Elija un periodo que se ajuste al periférico: lo bastante alto para evitar parpadeo visible del LED, o en el rango audible para un zumbador.
3. Recorra el ciclo de trabajo para atenuar un LED de forma gradual.
4. Pruebe algunos tonos fijos en un zumbador cambiando el periodo.
5. Deshabilite el PWM y confirme que la salida vuelve a un estado de reposo seguro.

**Criterios de éxito:** cambiar el ciclo de trabajo cambia el brillo, o cambiar el periodo cambia el tono, y deshabilitar el PWM deja la salida en el estado esperado.

**Si no funciona:** compruebe que el pin esté asignado a la instancia PWM correcta, que el número de canal sea válido, que el periodo y el ancho de pulso estén expresados en nanosegundos y que la carga externa no necesite un transistor de control.

**Lo que ha aprendido:** a configurar el periodo y el ciclo de trabajo, y a aplicar a otra clase de periférico el patrón de acceso a dispositivos del Tutorial 4.

## Mantenga la hora con el RTC { #keep-time-with-the-rtc }

**Objetivo:** leer y ajustar la hora actual usando el RTC integrado en el chip.

**Tiempo:** 15 minutos

**Empiece con:** `example/rt_device/rtc`

```c
time_t now = time(RT_NULL);
struct tm *tm_now = localtime(&now);
rt_kprintf("%04d-%02d-%02d %02d:%02d:%02d\n",
           tm_now->tm_year + 1900, tm_now->tm_mon + 1, tm_now->tm_mday,
           tm_now->tm_hour, tm_now->tm_min, tm_now->tm_sec);
```

1. Configure la hora del RTC una vez mediante un mecanismo compatible, por ejemplo un comando de shell.
2. Imprima la hora actual periódicamente.
3. Haga un ciclo de apagado/encendido de la placa y confirme si la hora se conserva.
4. Si la hora no se conserva, compruebe la ruta de alimentación de respaldo de la placa antes de modificar el firmware.

Al probar la retención, no reinicies el RTC incondicionalmente en cada arranque: eso ocultaría si se conservó la hora anterior.

**Criterios de éxito:** la hora avanza con normalidad mientras hay alimentación, y el comportamiento de retención coincide con el hardware de la placa.

**Si no funciona:** compruebe la habilitación del componente RTC, la fuente de reloj, la alimentación de respaldo, y si la placa reinicia el estado del RTC durante el arranque.

**Lo que ha aprendido:** la API estándar de tiempo en C sobre el dispositivo RTC de RT-Thread, además de un primer ejemplo de cómo el comportamiento del firmware depende del diseño de hardware.

## Miniproyecto: registrador de sensor controlado por botón { #mini-project-button-controlled-sensor-logger }

Después de terminar los seis tutoriales cortos, combínelos en un pequeño proyecto:

1. Haga parpadear el LED al arrancar.
2. Utilice el botón para iniciar o detener el muestreo.
3. Lea un valor de ADC cada segundo mientras el muestreo esté activo.
4. Imprima lecturas con marca de tiempo a través de FinSH.
5. Utilice el brillo del PWM o el tono del zumbador para indicar si el muestreo está activo.

**Criterio de aprobación:** el proyecto se ejecuta durante varios minutos sin activaciones repetidas del botón, registro descontrolado, ni reinicios inesperados.

## Lista de comprobación de la puesta en marcha de los primeros periféricos { #beginner-bring-up-checklist }

- [ ] El nombre de placa, el puerto serie y el flujo de flasheo están validados.
- [ ] La salida GPIO funciona en un LED real o en un pin medido.
- [ ] La entrada GPIO funciona con polaridad y antirrebote confirmados.
- [ ] El shell FinSH es utilizable, y `list_thread` / `list_device` funcionan.
- [ ] Las lecturas del ADC son plausibles y se han convertido a unidades físicas.
- [ ] Los ajustes de periodo/ciclo de trabajo del PWM producen la salida física esperada.
- [ ] Se entiende el comportamiento del RTC, incluidas las limitaciones de retención.

## A dónde ir después { #where-to-go-next }

Cuando todo esto le resulte familiar, pase a [Integración de subsistemas](intermediate.md). El siguiente bloque combina periféricos con middleware: sensores I2C, LVGL, BLE, reproducción de audio, almacenamiento y pruebas deliberadas de coexistencia.
