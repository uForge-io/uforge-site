---
icon: lucide/timer-reset
title: Configurar el watchdog
description: "Active y valide las rutas del watchdog HCPU y LCPU de SF32 con SiFli-SDK, incluida la estrategia de refresco."
tags: [Desarrollo, SiFli-SDK, Notas de aplicación, Watchdog]
---

# Configurar el watchdog { #configure-the-watchdog }

La documentación del SDK de SiFli trata el watchdog en dos niveles: el hardware expuesto por la HAL y el controlador de RT-Thread que utiliza la aplicación. Los nombres de las instancias, el alcance del reinicio y las opciones de reloj varían según la familia; consulte la comparación y confirme el comportamiento en la configuración y la documentación del SDK de destino.

<div align="center" markdown>
<em>Tabla: Comportamiento del watchdog documentado para cada familia</em>

| Familia | Comportamiento del watchdog según la HAL | Reloj indicado en la guía HAL |
|---|---|
| SF32LB52x | La guía HAL describe watchdogs dedicados para HCPU y LCPU que pueden generar interrupciones o reiniciar su propio subsistema, además de un IWDT de sistema que reinicia el chip completo. | La descripción del contador usa un reloj de 32K; la guía no indica una opción de selección de reloj específica para 52x. |
| SF32LB55x | WDT1 para HCPU y WDT2 para LCPU pueden generar interrupciones; su reinicio por hardware se limita al subsistema correspondiente. El IWDT de sistema no genera interrupciones, pero puede reiniciar el chip completo. | Seleccionable entre RC10K y 32K LXT. |
| SF32LB56x / SF32LB58x | La guía HAL indica que WDT1/WDT2 incorporan la capacidad de reiniciar el chip completo. | Usan RC10K, no el reloj de bajo consumo de 32K. |
</div>

!!! warning "Ámbito de la guía de watchdog para RT-Thread"
    La [guía de uso del watchdog](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html) se publica bajo la ruta `sf32lb52x`, pero su texto menciona explícitamente SF32LB55X. El tiempo predeterminado de 30 segundos, el refresco desde el hilo IDLE, el comportamiento durante la suspensión y la secuencia de reinicio de la aplicación que se describen abajo corresponden a la configuración 55x documentada allí; no son una garantía común a toda la familia SF32. Verifique estos detalles en la documentación y la configuración generada para el chip de destino.

## Activar y configurar el watchdog { #enable-and-configure-the-watchdog }

Ejecute `sdk.py menuconfig` en el directorio del proyecto y active la opción de watchdog en la configuración de controladores de dispositivos de RT-Thread. La etiqueta exacta del menú puede variar según la versión del SDK; consulte la documentación oficial de la familia de destino y compruebe el `rtconfig.h` generado antes de compilar.

La guía de uso del watchdog enlazada muestra dos opciones independientes:

- `RTOS → On-chip Peripheral Drivers → Enable Watchdog Timer` activa el temporizador watchdog del chip.
- `RTOS → RT-Thread Components → Device Drivers → Using Watch Dog device drivers` activa el controlador de RT-Thread.

Para la configuración 55x descrita en la guía enlazada, el tiempo de espera predeterminado documentado es de 30 segundos. En el menú del controlador, `(30) Watch Dog timeout (NEW)` permite elegir otro valor. Compruebe el valor predeterminado de la familia de destino en `menuconfig` y conserve la configuración generada junto con la imagen del firmware.

Las figuras siguientes muestran la ubicación del menú y el campo de tiempo de espera en la guía enlazada. Como la ruta de la página y la familia nombrada en el texto no coinciden, considérelas solo ilustrativas; compruebe la salida de `menuconfig` del proyecto para conocer la ruta y el valor predeterminado reales.

![Opción del controlador de watchdog en menuconfig](../../../../assets/develop/app-notes/watchdog/watchdog2.png){ loading="lazy" }
<div align="center"><em>Figura: Menú del controlador de watchdog mostrado en la guía de uso del watchdog enlazada.</em></div>

![Opción del temporizador watchdog en menuconfig](../../../../assets/develop/app-notes/watchdog/watchdog.png){ loading="lazy" }
<div align="center"><em>Figura: Configuración del temporizador watchdog mostrada en la guía de uso del watchdog enlazada.</em></div>

## Política de refresco { #feeding-policy }

El sistema refresca el watchdog desde el hilo `IDLE` de RT-Thread. Si ningún hilo de la aplicación permanece ejecutándose de forma continua durante más tiempo que el tiempo de espera configurado, no se necesita código adicional en la aplicación.

Si un hilo de alta prioridad debe ejecutarse de forma continua más allá del tiempo de espera, refresque el watchdog desde ese hilo con:

```c
rt_hw_watchdog_pet();
```

No añada un bucle de refresco incondicional que oculte una parada del planificador o un interbloqueo. El punto de refresco debe representar un avance normal del trabajo supervisado.

## Comportamiento de suspensión y reinicio { #sleep-and-reset-behavior }

- Al entrar en `Standby` o `Hibernate`, el watchdog se desactiva y vuelve a activarse al salir de ese modo.
- En los demás modos de suspensión, el watchdog sigue funcionando; el sistema debe reanudarse y refrescarlo antes de que venza el tiempo de espera.
- HCPU usa el watchdog del sistema. Si vence el tiempo de espera, se reinicia todo el chip.
- LCPU usa el watchdog del subsistema LCPU. Cuando vence el tiempo de espera, primero se genera una interrupción; después, el controlador de interrupción provoca un reinicio por software de todo el chip.

## Secuencia de validación { #validation-sequence }

1. Registre la familia del chip, la revisión del SDK, el tiempo de espera, el responsable de refrescar el watchdog y el modo de suspensión.
2. Compruebe que una carga de trabajo normal alcanza el punto de refresco previsto.
3. Detenga deliberadamente el mecanismo de refresco y confirme el alcance del reinicio y el comportamiento de arranque esperados.
4. Repita la prueba en cada modo de suspensión compatible, especialmente `Standby` y `Hibernate`.
5. Conserve las observaciones del reinicio y las evidencias de diagnóstico durante el arranque con las pruebas de recuperación del producto.

## Fuentes oficiales { #official-sources }

- [Guía de uso del watchdog (en inglés; publicada bajo SF32LB52x, el texto identifica SF32LB55X)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html)
- [Guía de uso del watchdog (en chino; misma ruta SF32LB52x, el texto identifica SF32LB55X)](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/watchdog.html)
- [Guía HAL WDT de SF32LB52x (en inglés)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/wdt.html)
- [Guía HAL WDT de SF32LB55x (en chino; incluye notas comparativas de 56x/58x)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/wdt.html)

No se han podido verificar estas rutas de notas de aplicación del watchdog específicas de cada familia: `sf32lb55x/app_note/watchdog.html`, `sf32lb56x/app_note/watchdog.html` y `sf32lb58x/app_note/watchdog.html`. Las búsquedas y los intentos de acceso directo no fueron concluyentes; eso no demuestra que las rutas devuelvan un error 404.
