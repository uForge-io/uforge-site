---
icon: lucide/circuit-board
description: "Cómo vincular el valor --board de SiFli-SDK con el hardware SF32 real: distribución de Flash/PSRAM, multiplexación de pines, rutas de pantalla y audio, y lista de comprobación de puesta en marcha."
tags:
    - Desarrollo
    - SiFli-SDK
---

# Configuración de la placa { #board-configuration }

La configuración de la placa vincula el firmware al hardware real: distribución de Flash, PSRAM, pines, la interfaz de pantalla, la ruta de audio, la configuración de reloj, las líneas de alimentación y los periféricos predeterminados.

En SiFli-SDK, el valor `--board=<board_name>` es el parámetro de compilación más importante. Selecciona el paquete de soporte de la placa que usa el ejemplo.

En las placas de doble núcleo, si se omite el sufijo del núcleo, se selecciona HCPU de forma predeterminada. Añada `_lcpu` al nombre de la placa para compilar para LCPU; use `_hcpu` para seleccionar HCPU explícitamente. Compruebe que el ejemplo sea compatible con el núcleo elegido.

## Aspectos que pueden variar según la placa seleccionada { #what-the-board-name-controls }

La placa seleccionada puede afectar a:

- Variante de chip y encapsulado.
- Distribución de Flash y PSRAM.
- Destinos de compilación HCPU/LCPU.
- Multiplexación de pines y disponibilidad de periféricos.
- Configuración de descarga UART.
- Configuración de pantalla y táctil.
- Enrutamiento del códec de audio.
- Configuración de Bluetooth.
- Tabla de particiones y condiciones de arranque.

## Reglas prácticas { #practical-rules }

- No deduzca el nombre de la placa a partir del nombre comercial.
- No copie a SiFli-SDK un nombre de placa de Zephyr o Arduino.
- Consulte el esquema de la placa o la página del kit de desarrollo al elegir GPIO, ADC, PWM, I2C, SPI o recursos de pantalla.
- Empiece con el ejemplo del SDK más cercano para esa misma placa.
- Haga una compilación limpia después de cambiar de placa.

## Lista de comprobación de puesta en marcha { #board-bring-up-checklist }

- [ ] Confirme la variante de chip y el encapsulado.
- [ ] Confirme los tipos, las capacidades y la configuración de la Flash y la PSRAM.
- [ ] Confirme la fuente de alimentación y el comportamiento del circuito de carga.
- [ ] Confirme las fuentes y frecuencias de reloj que usa esta placa, incluidos 48 MHz y 32,768 kHz cuando corresponda.
- [ ] Confirme la UART de descarga y la UART para la salida de registros.
- [ ] Confirme las interfaces de pantalla y táctil.
- [ ] Confirme la ruta de audio si se utiliza.
- [ ] Confirme los pines de arranque y el comportamiento de reset.
- [ ] Confirme la distribución de particiones.

No empiece a depurar la aplicación hasta que la configuración de la placa coincida con el hardware real.

## Ejemplo de nombre de placa del SDK { #sdk-board-name-example }

<div align="center"><em>Tabla: Nombre de la placa en SiFli-SDK para SF32LB52-DevKit-LCD_N16R8</em></div>

<div align="center" markdown>

| Tipo de nombre | Identificador |
|:---------------|:--------------|
| Modelo de placa | `SF32LB52-DevKit-LCD_N16R8` |
| Valor de `--board` de SiFli-SDK | `sf32lb52-lcd_n16r8` |

</div>

En SiFli-SDK, use el identificador del SDK con `--board`; el nombre del producto no es un identificador de compilación.

## Al portar a una placa personalizada { #when-porting-to-a-custom-board }

Empiece por la configuración del kit de desarrollo o módulo más cercano y, después, cambie:

1. Configuración de la memoria Flash y la PSRAM.
2. Multiplexación de pines.
3. UART de consola/descarga.
4. Recursos de pantalla/táctil/audio.
5. Supuestos sobre la alimentación y el circuito de carga.
6. Distribución de particiones.
7. Periféricos específicos del producto.

Valide cada cambio con el ejemplo más pequeño que permita probar el recurso correspondiente.
