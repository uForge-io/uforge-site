---
icon: lucide/chart-no-axes-column
title: "Muestreo con GPADC"
description: "Uso del ADC de propósito general (GPADC) en SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x y SF32LB58x: límites eléctricos, asignación de pads, acceso al dispositivo y calibración."
tags: [Desarrollo, SiFli-SDK, Notas de aplicación, ADC]
---

# Muestreo con GPADC { #sample-with-gpadc }

Esta nota reúne las guías de ADC para SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x y SF32LB58x. El flujo de software es común, pero los límites de entrada, las asignaciones de pads y los puntos de calibración dependen de cada familia. Antes de configurar el hardware o el firmware, consulte las tablas de la familia de destino.

GPADC es el ADC de propósito general de SiFli para medir señales de sensores y la tensión de la batería. Es independiente del ADC de audio disponible en SF32LB52x, SF32LB56x, SF32LB57x y SF32LB58x, y del ADC sigma-delta disponible en SF32LB55x y SF32LB58x. Esta nota cubre solo GPADC; para esos otros convertidores, consulte la documentación de audio o sigma-delta de la familia correspondiente.

## Alcance del ADC y modelo de canales { #adc-scope-and-channel-model }

En las notas de aplicación del SDK para SF32LB52x, SF32LB55x, SF32LB56x y SF32LB58x se usan ocho canales ADC, `GPADC_CH0` a `GPADC_CH7`, para fuentes analógicas como salidas de sensores y mediciones de tensión de batería. El mapa de canales ADC del SDK para SF32LB57x define doce canales: `PA28`–`PA38` corresponden a `GPADC_CH0`–`GPADC_CH10`, y el canal de detección de batería es `GPADC_CH11` (denominado `BAT` en el mapa del SDK). La guía de diseño de hardware de SF32LB57x denomina la señal correspondiente del encapsulado `VBAT` o `VBATS` según la variante de alimentación. Una lectura válida depende del canal elegido, la red de entrada y la calibración de software específica del dispositivo.

SF32LB52x tiene un canal dedicado para detectar la batería en `GPADC_CH7` (`BAT`): el ejemplo del SDK indica que este canal se conecta a VBAT a través de un divisor interno y que se aplica el factor de conversión de tensión de batería del SDK (`vbat_factor`) para obtener esa tensión. En cambio, en SF32LB56x `GPADC_CH7` está asignado al pad externo `PB32`, y en SF32LB58x a `PB39`. El canal de batería de SF32LB57x es `GPADC_CH11`; utilice la señal `VBAT` o `VBATS` que corresponda a la variante de alimentación y respete los límites aplicables a ese dominio. Que una placa conecte un canal a un divisor de batería no significa que sea un canal dedicado integrado en el chip.

## Características del ADC y red de entrada { #adc-characteristics-and-input-network }

<div align="center"><em>Tabla: características de las entradas GPADC normales por familia SF32</em></div>

<div align="center" markdown>

| Familia | Canales GPADC | Resolución | Precisión típica | Tensión máxima de entrada GPADC normal |
|:-------|:---------------|:-----------|:----------------|:--------------------------------------|
| SF32LB55x | 8 | 10 bit | 3–4 mV | 1,1 V (X1); 3,3 V (X3) |
| SF32LB52x | 8 | 12 bit | 1–2 mV | 3,3 V |
| SF32LB56x / 58x | 8 | 12 bit | 1–2 mV | 3,3 V |
| SF32LB57x | 12 | 12 bit | 1–2 mV | 3,3 V |

</div>

Las tensiones máximas de entrada indicadas arriba se aplican a las entradas GPADC normales; los canales dedicados de detección de batería tienen rutas y límites propios. El ejemplo del SF32LB55x utiliza un divisor de 1 MΩ / 220 kΩ con un tiempo de establecimiento RC de 157 ms. La tabla consolidada de la guía del SF32LB56x indica 470 kΩ / 1000 kΩ y 200 ms para SF32LB52x, SF32LB56x y SF32LB58x; no incluye esta recomendación para SF32LB57x. En 57x, consulte la ruta de detección de batería y sus límites en la documentación de la pieza exacta, sin extrapolar esos valores de resistencia ni ese tiempo de establecimiento. Estas recomendaciones se aplican a redes divisoras externas. En particular, la ruta dedicada `GPADC_CH7` de SF32LB52x ya tiene un divisor interno; no añada otro divisor externo salvo que el diseño de la placa de destino lo requiera. La tolerancia de las resistencias afecta a la precisión final; cuando el diseño use un divisor externo, calibre esa red por separado en producción.

<div align="center"><em>Tabla: rutas de detección de tensión de batería por familia SF32</em></div>

<div align="center" markdown>

| Familia | Ruta de detección de batería | Nota de diseño |
|:-------|:-----------------------------|:---------------|
| SF32LB55x | Un divisor externo se conecta a una entrada GPADC seleccionada; el circuito de referencia utiliza `PB10` / `GPADC_CH1`. | Mantenga la salida del divisor dentro del límite de entrada del rango X1/X3 seleccionado. |
| SF32LB52x | Canal dedicado `GPADC_CH7` / `BAT`; el ejemplo del SDK indica una conexión de VBAT mediante un divisor interno. | Use el `vbat_factor` del SDK para convertir el resultado de este canal dedicado a tensión de batería. |
| SF32LB56x / 58x | Un divisor externo de la placa alimenta el pad GPADC elegido; el mapa de referencia del SDK asigna `GPADC_CH7` a `PB32` / `PB39`, respectivamente. | Compruebe la conexión real del divisor de batería en el esquemático de la placa. Son pads GPADC normales, no canales dedicados integrados en el chip. |
| SF32LB57x | Canal dedicado `GPADC_CH11`; el mapa del SDK lo denomina `BAT`, mientras que la guía de hardware usa `VBAT` o `VBATS` según la variante de alimentación. | Consulte el límite de medición del canal de batería para la pieza exacta. En las variantes con alimentación de 3,3 V, la guía especifica para `VBATS` un rango de medición GPADC de 0–4,5 V; no lo sustituya por la tensión nominal de pin de 4,7 V. |

</div>

Para la ruta externa de medición de batería de SF32LB55x, la FAQ de OpenSiFli muestra un divisor con resistencias de 1 MΩ y 220 kΩ, ambas con una tolerancia del 1 %. Los valores de resistencia elevados reducen la corriente de fuga continua del divisor; esa tolerancia limita el error de la relación de división y ayuda a mantener la precisión. La salida del divisor es el punto de prueba del ADC, no la tensión de la batería. Al adaptar esta referencia, consulte el esquemático y los límites eléctricos del dispositivo de destino.

![Referencia del divisor resistivo de VBAT en la guía del SDK de SF32LB56x](../../../../assets/develop/adc/adc-resistor-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>Figura: referencia del divisor resistivo de VBAT y del punto de prueba ADC en la guía del SDK de SF32LB56x.</em></div>

![Referencia de tensión del divisor de 1 MΩ / 220 kΩ de SF32LB55x](../../../../assets/develop/adc/adc003.png){ loading="lazy" }
<div align="center"><em>Figura: valores de referencia de la salida del divisor de SF32LB55x según la FAQ de ADC de OpenSiFli.</em></div>

<div align="center"><em>Tabla: tensión de salida de referencia del divisor de 1 MΩ / 220 kΩ de SF32LB55x</em></div>

<div align="center" markdown>

| Tensión de batería | Salida de `PB10_BAT_DET_ADC` |
|:------------------|:-----------------------------------|
| 3,0 V | 0,540983607 V |
| 3,3 V | 0,595081967 V |
| 3,6 V | 0,649180328 V |
| 4,0 V | 0,721311475 V |
| 4,2 V | 0,757377049 V |
| 5,0 V | 0,901639344 V |

</div>

En el esquemático de referencia del SF32LB55x, VBAT pasa por R125 (1 MΩ) hasta `PB10_BAT_DET_ADC`. R126 (220 kΩ) y C118 (0,1 µF) conectan este nodo a tierra en paralelo. Considere estos valores como una referencia y compruébelos con el esquemático y los límites eléctricos del dispositivo de destino.

![Esquemático del divisor externo de tensión de batería de SF32LB55x](../../../../assets/develop/adc/adc004.png){ loading="lazy" }
<div align="center"><em>Figura: ruta externa de muestreo de tensión de batería de SF32LB55x.</em></div>

## Alimentación y referencia analógicas { #analog-supply-and-reference }

La configuración de la alimentación analógica y de los pines de referencia depende de la familia. Consulte el esquemático del dispositivo de destino; no presuponga que todos los GPADC tienen la misma distribución de pines VREF:

<div align="center"><em>Tabla: conexiones de alimentación y referencia del GPADC por familia SF32</em></div>

<div align="center" markdown>

| Familia | Conexiones de alimentación y referencia |
|:-------|:----------------------------------------|
| SF32LB52x / 56x | Alimente `AVDD33_ANA` con una línea estable de 3,3 V. El esquemático de referencia muestra `GPADC_VREF` desacoplado a tierra; no es una entrada de alimentación. |
| SF32LB55x | El esquemático de referencia muestra `AVDD33_ANA` y `AVSS33_ANA`; siga el esquemático de destino para conectarlos y desacoplarlos. |
| SF32LB57x | Alimente `AVDD33_ANA` con 3,3 V. `GPADC_VREF` es un pin de referencia: conecte únicamente el condensador especificado a tierra y no lo alimente externamente. |
| SF32LB58x | El esquemático de referencia muestra `AVDD33_ANA` / `AVSS33_ANA`, `GPADC_VREFP` con su condensador especificado y `GPADC_VREFN` conectado a tierra. No trate ninguno de los dos pines de referencia como entrada de alimentación. |

</div>

El par `GPADC_VREFP` / `GPADC_VREFN` del SF32LB58x no es intercambiable con la denominación única `GPADC_VREF` que usan las demás familias. El esquemático del SDK también muestra componentes de filtrado específicos por familia; use el circuito de referencia y los valores exactos del dispositivo de destino. Nunca aplique alimentación directamente a un pin de referencia GPADC. `AVDD33_ANA` es la alimentación analógica y `AVSS33_ANA` es la masa analógica cuando está presente.

![Conexión de alimentación analógica y referencia GPADC en la guía del SDK de SF32LB56x](../../../../assets/develop/adc/adc-ana-ref-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>Figura: conexión específica por familia de la alimentación analógica y la referencia GPADC que muestra la guía del SDK de SF32LB56x.</em></div>

## Configurar el pad ADC { #configure-the-adc-pad }

Configure el pad de entrada seleccionado con su función analógica antes del muestreo. Los ejemplos de API genérica de la guía son:

```c
HAL_PIN_Set_Analog(PAD_PB08, 0);
HAL_PIN_Set_Analog(PAD_PB13, 0);
```

Estas llamadas ilustran la API de pines analógicos, no la selección de pads de una familia concreta. Elija la entrada física en este mapa de canales:

<div align="center"><em>Tabla: asignación de pads y canales GPADC por familia SF32</em></div>

<div align="center" markdown>

| Familia | `GPADC_CH0` | `GPADC_CH1` | `GPADC_CH2` | `GPADC_CH3` | `GPADC_CH4` | `GPADC_CH5` | `GPADC_CH6` | `GPADC_CH7` |
|:-------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|
| SF32LB55x | `PB08` | `PB10` | `PB12` | `PB13` | `PB16` | `PB17` | `PB18` | `PB19` |
| SF32LB52x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `BAT` |
| SF32LB56x | `PB22` | `PB23` | `PB24` | `PB25` | `PB26` | `PB27` | `PB28` | `PB32` |
| SF32LB58x | `PB32` | `PB33` | `PB34` | `PB35` | `PB36` | `PB37` | `PB38` | `PB39` |
| SF32LB57x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `PA35` |

</div>

Las fuentes de SiFli difieren en la asignación de pads del SF32LB52x: la [nota de aplicación ADC específica de SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html) indica, para la revisión A0, la siguiente asignación de pads externos: `PB08`, `PB10`, `PB12`, `PB13`, `PB16`, `PB17`, `PB18` y `PB19` corresponden a `GPADC_CH0`–`GPADC_CH7`; la [tabla ADC consolidada de la guía de SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html) indica en cambio `PA28`–`PA34` para `GPADC_CH0`–`GPADC_CH6` y `BAT` para `GPADC_CH7`. La fila de SF32LB52x anterior refleja la tabla consolidada y no constituye una asignación universal para todos los 52x. Antes de trazar las pistas o configurar GPADC en un 52x, compruebe el modelo y la revisión exactos con la configuración de multiplexado del SDK correspondiente y el esquemático de la placa; no combine ambos mapas.

SF32LB57x tiene cuatro canales ADC adicionales: `PA36` es `GPADC_CH8`, `PA37` es `GPADC_CH9`, `PA38` es `GPADC_CH10` y la señal de detección de batería es `GPADC_CH11` (`BAT` en el mapa del SDK; `VBAT` o `VBATS` en la guía de hardware, según la variante de alimentación). Este canal pertenece al dominio de tensión de batería y tiene un rango de medida distinto al de las entradas GPADC normales. En las variantes con alimentación de 3,3 V, respete el rango de medición GPADC `VBATS` de 0–4,5 V que indica la guía, no la tensión nominal de pin de 4,7 V. Por tanto, ni el mapa de 12 canales ni la entrada de batería son intercambiables con los mapas de ocho canales anteriores.

La ruta exclusiva de SF32LB55x también permite asignar directamente el PIN a un canal GPADC, por ejemplo `HAL_PIN_Set(PAD_PB08, GPADC_CH0, PIN_NOPULL, 0)`. No copie esa asignación concreta a otra familia.

![Configuración del modo de pin de entrada de batería analógica de SF32LB55x](../../../../assets/develop/adc/adc008.png){ loading="lazy" }
<div align="center"><em>Figura: configuración del pin en modo de entrada analógica para la ruta ADC de batería de SF32LB55x.</em></div>

## Leer un canal ADC { #read-an-adc-channel }

SiFli-SDK registra el ADC como un dispositivo de tensión de batería; la guía usa `bat1` como nombre predeterminado. Con la interfaz de dispositivos de RT-Thread, busque el dispositivo, ábralo en modo de solo lectura, habilite el canal previsto y lea su valor bruto:

```c
uint32_t channel = 1;
uint32_t value;
rt_device_t dev = rt_device_find("bat1");

if (dev) {
    rt_device_open(dev, RT_DEVICE_FLAG_RDONLY);
    rt_device_control(dev, RT_ADC_CMD_ENABLE, (void *)channel);
    rt_device_read(dev, channel, &value, 1);
}
```

En HAL, lea el resultado de la conversión con `HAL_ADC_GetValue(&hadc, slot)`. Pase el manejador (handle) ADC inicializado y el número de slot configurado para la conversión; compruebe que ese slot corresponda al canal y al PAD previstos.

## Calibración del ADC y conversión de tensión { #adc-calibration-and-voltage-conversion }

La guía modela la conversión como una relación lineal:

<div align="center"><em>V<sub>real</sub> = (Value<sub>adc</sub> − Offset) × Ratio</em></div>

`Offset` es el valor bruto del ADC cuando la entrada es de 0 V; `Ratio` es el incremento de tensión por cada cuenta ADC. La calibración de fábrica compensa las variaciones de fabricación, pero la guía también describe un método de calibración de dos puntos para la ruta de entrada ya montada:

1. Aplique dos tensiones precisas y estables y lea los valores ADC correspondientes.
2. Use las dos tensiones de calibración especificadas para la familia de destino, no 0 V ni la tensión máxima de entrada.
3. Use `sifli_adc_calibration` para calcular y guardar la relación y el offset.
4. Convierta las lecturas posteriores con los valores de calibración almacenados e incluya la relación del divisor al calcular la tensión de entrada antes del divisor.

La implementación del código fuente define `ADC_RATIO_ACCURATE` como 1000 y los valores iniciales de `adc_vol_offset` y `adc_vol_ratio` como 200 y 3930, respectivamente. Esta función auxiliar heredada ilustra el cálculo lineal; no sustituye el flujo de calibración de la versión del SDK de destino. Si el SDK ofrece una API de calibración HAL o del controlador de dispositivo, use esa interfaz.

### Rangos de calibración de SF32LB55x { #sf32lb55x-calibration-ranges }

La FAQ de OpenSiFli describe con más detalle el flujo de calibración de SF32LB55x. Durante `sifli_adc_init`, la configuración de fábrica guardada en Flash e identificada por `FACTORY_CFG_ID_ADC` proporciona las lecturas de calibración almacenadas. `sifli_adc_calibration` obtiene de ellas el `offset` y el `ratio` lineales; las muestras posteriores usan el cálculo `sifli_adc_get_mv` correspondiente al rango elegido.

Se documentan dos rangos de calibración:

![Selección del modo de calibración y flujo de valores de fábrica de SF32LB55x](../../../../assets/develop/adc/adc001.png){ loading="lazy" }
<div align="center"><em>Figura: inicialización de calibración, selección de rango y cálculo de offset/ratio en SF32LB55x.</em></div>

- **Rango X1:** 0,3 V y 0,8 V. Los valores de calibración almacenados tienen activado el bit 15, por lo que la implementación selecciona la ruta de rango pequeño. La precisión se reduce cerca de 0 V y por encima de 1 V. Esta ruta deshabilita `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`, por lo que el divisor interno queda apagado y el punto de prueba ADC no debe superar 1,1 V.
- **Rango X3:** 1,0 V y 2,5 V. Es el método de calibración anterior. Habilita `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`, que activa el divisor interno con atenuación de 3×; la entrada no debe superar 3,3 V.

![Control del divisor interno X1/X3 de SF32LB55x](../../../../assets/develop/adc/adc002.png){ loading="lazy" }
<div align="center"><em>Figura: control de habilitación/deshabilitación del divisor interno de SF32LB55x para el rango de calibración seleccionado.</em></div>

No elija el rango de calibración basándose únicamente en la tabla: compruebe la configuración de fábrica y la implementación del SDK de destino. El comportamiento X1 y X3 es específico de la documentación de SF32LB55x citada aquí, no una regla que deba aplicarse a otra familia.

<div align="center"><em>Tabla: puntos de calibración de dos puntos que enumera la nota de aplicación ADC consolidada</em></div>

<div align="center" markdown>

| Familia | Entradas de calibración |
|:-------|:-------------------|
| SF32LB55x | 0,3 V y 0,8 V |
| SF32LB52x / 56x / 58x | 1,0 V y 2,5 V |
| SF32LB57x | 1,0 V y 2,5 V |

</div>

En SF32LB52x hay una diferencia entre versiones de la documentación: la nota de aplicación ADC consolidada enumera 1,0 V y 2,5 V como tensiones para la calibración de dos puntos, mientras que la referencia actual de la API HAL identifica el rango de calibración predeterminado de SF32LB52X como X1, con puntos de 0,3 V y 0,8 V. No trate ambos pares como valores predeterminados intercambiables. Antes de elegir puntos de calibración o el límite de entrada, compruebe la versión exacta del SDK, los datos de fábrica y el rango de calibración en tiempo de ejecución.

```c
static uint32_t adc_vol_offset = 200;
static uint32_t adc_vol_ratio = 3930;
#define ADC_RATIO_ACCURATE 1000

int sifli_adc_get_mv(uint32_t value)
{
    return (value - adc_vol_offset) * adc_vol_ratio / ADC_RATIO_ACCURATE;
}

int sifli_adc_calibration(uint32_t value1, uint32_t value2,
                          uint32_t vol1, uint32_t vol2,
                          uint32_t *offset, uint32_t *ratio)
{
    uint32_t gap1, gap2;

    if (offset == NULL || ratio == NULL) return 0;

    gap1 = (value1 > value2) ? (value1 - value2) : (value2 - value1);
    gap2 = (vol1 > vol2) ? (vol1 - vol2) : (vol2 - vol1);

    if (gap1 == 0) return 0;

    *ratio = gap2 * ADC_RATIO_ACCURATE / gap1;
    adc_vol_ratio = *ratio;
    *offset = value1 - (vol1 * ADC_RATIO_ACCURATE / adc_vol_ratio);
    adc_vol_offset = *offset;

    return adc_vol_offset;
}
```

### Validar la calibración después del arranque y la reactivación { #validate-calibration-after-startup-and-wake }

Para depurar la medición de tensión de batería de SF32LB55x, la FAQ de OpenSiFli advierte que las lecturas pueden ser inexactas durante los primeros 300 ms aproximadamente después del arranque o la reactivación, debido a la carga y descarga del circuito RC. La forma de onda observada se estabiliza al cabo de unos 350 ms. Añada un retardo de muestreo adecuado o descarte las primeras muestras inestables. Al medir el nodo del divisor con un multímetro o un osciloscopio, tenga en cuenta la impedancia de entrada del instrumento, que puede provocar una caída de unos 30 mV.

![Forma de onda de estabilización del muestreo de batería de SF32LB55x tras el arranque](../../../../assets/develop/adc/adc005.png){ loading="lazy" }
<div align="center"><em>Figura: forma de onda de arranque de SF32LB55x que muestra una estabilización de aproximadamente 350 ms.</em></div>

### Comprobar la configuración del pin ADC del SF32LB55x tras standby y reactivación { #check-sf32lb55x-pin-configuration-after-standby }

Para la entrada de detección de batería del SF32LB55x en `PB10`, compruebe la configuración del pin tanto antes de entrar en standby como después de reactivarse. Antes de la inicialización, `PB10` tiene activada por defecto una resistencia pull-up interna. En `pinmux.c`, configúrelo como `PIN_NOPULL` y `PIN_ANALOG_INPUT`; de lo contrario, la resistencia pull-up puede seguir activa y provocar lecturas ocasionalmente demasiado altas.

![Forma de onda del nodo de muestreo de batería del SF32LB55x en standby](../../../../assets/develop/adc/adc006.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la forma de onda del nodo de muestreo de batería del SF32LB55x mientras el dispositivo está en standby.</em></div>

![Forma de onda del nodo de muestreo de batería del SF32LB55x tras reactivarse](../../../../assets/develop/adc/adc007.png){ loading="lazy" }
<div align="center"><em>Figura: Ejemplo de la forma de onda del nodo de muestreo de batería del SF32LB55x después de salir de standby.</em></div>

## Comprobación de puesta en marcha { #bring-up-check }

Antes de añadir la adquisición multicanal o cíclica, verifique un canal con una entrada estable medida de forma independiente:

1. Confirme la asignación de pads de la familia de destino y su configuración analógica.
2. Compruebe que la salida del divisor permanezca dentro del límite de entrada del ADC para esa familia.
3. Compare los valores brutos y calibrados con la tensión aplicada.
4. Registre las condiciones del divisor y de calibración en el informe de prueba de la placa.

Al conectar el UART de registro del SF32LB56x a un PC externo, asegúrese de que el nivel de referencia del adaptador serie coincida con la tensión de E/S del chip. La FAQ de ADC de OpenSiFli advierte que, si la E/S del chip está a 3,3 V y el adaptador usa una referencia de 5 V, las lecturas del ADC pueden ser mucho más bajas de lo esperado; por ejemplo, una batería de 4 V podría leerse como 3,3 V.

## Fuente oficial { #official-source }

- [Guía de uso y configuración del ADC de SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html)
- [Guía de uso y configuración del ADC de SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)
- [Guía de uso y configuración del ADC de SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html)
- [Guía de uso y configuración del ADC de SF32LB57x](https://docs.sifli.com/projects/sdk/latest/sf32lb57x/app_note/adc.html)
- [Guía de uso y configuración del ADC de SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/adc.html)
- [Referencia de la API HAL ADC de SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/api/hal/adc.html): definiciones del rango de calibración predeterminado.
- Guía de diseño de hardware SF32LB57x — almacenamiento y fabricación: asignación de canales GPADC y pads.
- Guía de diseño de hardware SF32LB57x — sistema mínimo y alimentación: conexiones de alimentación/referencia analógicas y límites de detección de batería por variante.
- [FAQ de ADC de OpenSiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/faq/mcu/adc.md): rangos de calibración de fábrica y comprobaciones tras arranque, standby y reactivación del SF32LB55x, además de recomendaciones sobre el nivel del UART de registro del SF32LB56x.
