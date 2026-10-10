---
icon: lucide/upload-cloud
description: "Use el middleware DFU v2 de SiFli-SDK para actualizar el firmware por USB-CDC, BLE y Bluetooth PAN, con los pares de ejemplos documentados para la aplicación y el cargador."
tags:
    - Desarrollo
    - OTA
    - DFU
---

# OTA y DFU { #ota-and-dfu }

DFU v2 es el middleware de SiFli-SDK para flujos de actualización de firmware DFU y OTA. Ofrece tres canales de transporte: USB-CDC, BLE y Bluetooth PAN. Cada canal incluye una aplicación de usuario y un subproyecto de cargador correspondiente.

Empiece por elegir el transporte que coincida con la ruta de actualización del producto. Después, utilice el ejemplo de aplicación correspondiente; el cargador asociado se incorpora automáticamente a la compilación.

## Estructura de DFU v2 { #dfu-v2-structure }

<div align="center"><em>Figura: Estructura de los ejemplos DFU v2</em></div>

```text
dfu_v2/
├── cdc/       USB-CDC channel
│   ├── app/       User application and PC update tool
│   └── loader/    CDC DFU loader
├── ble/       BLE channel
│   ├── app/       BLE peripheral application
│   └── loader/    BLE DFU loader
└── bt_pan/    Bluetooth PAN channel
    ├── app/       Application that downloads firmware from a server
    └── loader/    PAN DFU loader
```

La aplicación de cada canal está diseñada para funcionar con su cargador correspondiente. Al compilarla, el SDK incorpora automáticamente ese cargador como subproyecto mediante la lógica `AddDFU_*` de `building.py`; no lo compile por separado. En el ejemplo BLE, la aplicación en ejecución puede actualizar imágenes distintas de la imagen de HCPU; para actualizar la imagen de HCPU, hay que pasar al cargador.

## Compatibilidad y configuración { #compatibility-and-configuration }

DFU v2 está deshabilitado de forma predeterminada; habilite explícitamente `USING_DFU_V2` en la configuración del middleware. Solo está disponible en HCPU (`BF0_HCPU`) y no se puede habilitar junto con las opciones DFU heredadas `BSP_USING_DFU` o `USING_DFU_PAN`. Al habilitar DFU v2, la configuración selecciona FlashDB (`PKG_USING_FLASHDB`) para admitir transferencias reanudables.

USB CDC y BLE son transportes push mutuamente excluyentes: elija `DFU_V2_USE_CDC_TRANSPORT` o `DFU_V2_USE_BLE_TRANSPORT`. Bluetooth PAN usa un transporte pull; habilite `DFU_V2_USE_PAN_TRANSPORT` y el modo iniciado por el dispositivo (`DFU_V2_USE_DEVICE_MODE`), además de WebClient. Antes de definir la arquitectura de actualización del producto, confirme las opciones disponibles en la versión de SDK de destino.

## Elegir un canal de actualización { #choose-an-update-channel }

<div align="center"><em>Tabla: Selección del transporte de DFU v2</em></div>

<div align="center" markdown>

| Canal | Ruta de actualización documentada | Uso habitual |
| --- | --- | --- |
| USB-CDC | Un PC actualiza el dispositivo mediante un puerto serie virtual USB. | Producción, laboratorio y mantenimiento por cable. |
| BLE | Una aplicación BLE en modo periférico recibe la actualización. | Una aplicación móvil actualiza un producto conectado. |
| Bluetooth PAN | El dispositivo utiliza la red Bluetooth PAN para descargar una actualización desde un servidor HTTP. | Productos conectados que descargan su propia imagen de actualización. |

</div>

## Revisión de la actualización del producto { #product-update-review }

- [ ] El transporte elegido coincide con las vías de conexión disponibles en el producto.
- [ ] La aplicación y el cargador correspondiente se compilan y prueban como un único flujo de actualización.
- [ ] Se ha confirmado que la placa de destino es compatible según el README del ejemplo.
- [ ] Se han definido el comportamiento ante interrupciones, la recuperación y el procedimiento de servicio en fábrica.
- [ ] Para la versión del producto, se revisan la autenticidad e integridad de la imagen de firmware, la política de versiones y la capacidad de las particiones.
- [ ] Se pueden recopilar registros de una actualización fallida sin depender de que la aplicación funcione correctamente.

## Compilar un ejemplo DFU v2 { #build-a-dfu-v2-example }

Desde el directorio `project/` del ejemplo, compile con:

```bash
scons --board=<board-name> -j8
```

El README de cada ejemplo indica las placas compatibles. La configuración del middleware DFU v2 se encuentra en `middleware/dfu_v2` de SiFli-SDK.

## Ejemplos DFU v2 del SDK { #dfu-v2-sdk-examples }

<div align="center"><em>Tabla: Ejemplos oficiales DFU v2 de SiFli-SDK para SF32LB58x</em></div>

<div align="center" markdown>

| Canal | Aplicación de usuario | Subproyecto del cargador |
| --- | --- | --- |
| USB-CDC | [`cdc/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/app/README.html) | [`cdc/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/loader/README.html) |
| BLE | [`ble/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/app/README.html) | [`ble/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/loader/README.html) |
| Bluetooth PAN | [`bt_pan/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/app/README.html) | [`bt_pan/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/loader/README.html) |

</div>

Para ver el índice completo del código fuente y la navegación actual del SDK, consulte los [ejemplos DFU v2 de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/index.html).
