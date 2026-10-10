---
icon: lucide/upload-cloud
description: "Использование промежуточного ПО DFU v2 из SiFli-SDK для обновления прошивки по USB-CDC, BLE и Bluetooth PAN; в статье приведены пары примеров приложения и загрузчика."
tags:
    - Разработка
    - OTA
    - DFU
---

# OTA и DFU { #ota-and-dfu }

DFU v2 — это промежуточное ПО SiFli-SDK для сценариев обновления прошивки по DFU и OTA. Оно поддерживает три транспортных канала: USB-CDC, BLE и Bluetooth PAN. Для каждого канала предусмотрены пользовательское приложение и соответствующий подпроект загрузчика.

Сначала выберите транспортный канал, соответствующий способу обновления продукта. Затем возьмите за основу пример приложения для этого канала: соответствующий загрузчик автоматически включается в сборку.

## Структура DFU v2 { #dfu-v2-structure }

<div align="center"><em>Рисунок: структура примеров DFU v2</em></div>

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

Приложение и загрузчик каждого канала рассчитаны на совместное использование. При сборке приложения SDK использует логику `AddDFU_*` из `building.py`, чтобы добавить соответствующий загрузчик как подпроект; собирать загрузчик отдельно не нужно. В примере BLE работающее приложение может обновлять образы прошивки, кроме образа прошивки HCPU; для обновления последнего необходимо переключиться на загрузчик.

## Совместимость и настройка { #compatibility-and-configuration }

DFU v2 по умолчанию отключен; явно включите `USING_DFU_V2` в конфигурации промежуточного ПО. Он доступен только на HCPU (`BF0_HCPU`) и не может быть включен вместе с устаревшими параметрами DFU `BSP_USING_DFU` или `USING_DFU_PAN`. При включении DFU v2 конфигурация выбирает FlashDB (`PKG_USING_FLASHDB`) для поддержки возобновляемой передачи.

USB CDC и BLE используют передачу типа push и являются взаимоисключающими каналами: выберите `DFU_V2_USE_CDC_TRANSPORT` или `DFU_V2_USE_BLE_TRANSPORT`. Bluetooth PAN использует передачу типа pull; включите `DFU_V2_USE_PAN_TRANSPORT` вместе с режимом, инициируемым устройством (`DFU_V2_USE_DEVICE_MODE`), и WebClient. Прежде чем определять архитектуру обновления продукта, проверьте доступные параметры в целевой версии SDK.

## Выбор канала обновления { #choose-an-update-channel }

<div align="center"><em>Таблица: выбор транспорта DFU v2</em></div>

<div align="center" markdown>

| Канал | Описанный способ обновления | Типичный сценарий |
| --- | --- | --- |
| USB-CDC | ПК обновляет устройство через виртуальный USB-последовательный порт. | Производство, лабораторные работы и проводное обслуживание. |
| BLE | Обновление принимает приложение BLE в роли периферийного устройства. | Мобильное приложение обновляет подключенный продукт. |
| Bluetooth PAN | Устройство использует сеть Bluetooth PAN, чтобы загрузить обновление с HTTP-сервера. | Подключенные продукты, самостоятельно получающие образ обновления. |

</div>

## Проверка плана обновления продукта { #product-update-review }

- [ ] Выбранный транспорт соответствует доступным способам подключения продукта.
- [ ] Приложение и соответствующий загрузчик собираются и тестируются как единый процесс обновления.
- [ ] Поддержка целевой платы подтверждена по README соответствующего примера.
- [ ] Для продукта определены поведение при прерывании обновления, восстановление и порядок заводского обслуживания.
- [ ] Для выпуска продукта проверены подлинность и целостность образа прошивки, политика версий и емкость разделов.
- [ ] Сбои обновления можно диагностировать по журналам, даже если приложение не работает.

## Сборка примера DFU v2 { #build-a-dfu-v2-example }

Перейдите в каталог `project/` примера и выполните сборку:

```bash
scons --board=<board-name> -j8
```

Список поддерживаемых плат приведен в README каждого примера. Конфигурация промежуточного ПО DFU v2 находится в `middleware/dfu_v2` SiFli-SDK.

## Примеры DFU v2 для SDK { #dfu-v2-sdk-examples }

<div align="center"><em>Таблица: официальные примеры DFU v2 из SiFli-SDK для SF32LB58x</em></div>

<div align="center" markdown>

| Канал | Пользовательское приложение | Подпроект загрузчика |
| --- | --- | --- |
| USB-CDC | [`cdc/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/app/README.html) | [`cdc/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/loader/README.html) |
| BLE | [`ble/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/app/README.html) | [`ble/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/loader/README.html) |
| Bluetooth PAN | [`bt_pan/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/app/README.html) | [`bt_pan/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/loader/README.html) |

</div>

Полный индекс исходников и актуальную навигацию SDK см. в разделе [примеры DFU v2 в SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/index.html).
