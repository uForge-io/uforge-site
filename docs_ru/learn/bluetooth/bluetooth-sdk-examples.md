---
icon: lucide/bluetooth-connected
title: "Примеры Bluetooth SDK"
description: "Выберите подходящий пример Bluetooth из SiFli-SDK для сервисов BLE, профилей классического Bluetooth, интеграции с телефоном, OTA, передачи данных или широковещательной передачи LE Audio."
tags:
  - Bluetooth
  - Примеры
---

# Примеры Bluetooth SDK { #bluetooth-sdk-examples }

Примеры Bluetooth в SiFli-SDK помогают начать работу с конкретным профилем, ролью или радиосценарием, но не являются готовой прошивкой продукта. Начните с проекта, который позволяет проверить самое сложное техническое требование изделия. Запустите его без изменений на целевой плате, а затем добавляйте требования к изделию по одному.

На этой странице примеры [классического Bluetooth](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/index.html), [BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/index.html) и [широковещательной передачи LE Audio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/index.html) из документации SF32LB58x сгруппированы по инженерным задачам. Путь `sf32lb58x` указывает раздел документации, а не гарантирует совместимость каждого примера со всеми платами SF32LB58x или другими семействами SF32. URL `latest` обновляется. Для используемого выпуска или коммита SDK откройте раздел **Supported Platforms** на странице нужного проекта и используйте только указанные там имена плат и инструкции по сборке. Если поддержка конкретной платы и ревизии SDK явно не подтверждена, отметьте совместимость как **непроверенную**; не делайте вывод по URL, другому примеру или похожему названию платы. Даже если указано «all platforms», до адаптации примера проверьте его сборку с фактической ревизией SDK и конфигурацией платы. Страница проекта также содержит сведения о настройках `menuconfig`, испытательном оборудовании и ограничениях.

## Выбор подходящего сценария Bluetooth { #start-with-the-right-bluetooth-path }

<div align="center"><em>Таблица: выбор примера Bluetooth SDK</em></div>

<div align="center" markdown>

| Требование изделия | Начните с | Что проверить до интеграции в изделие |
|:-------------------|:----------|:---------------------------------------|
| Собственный сервис BLE или связь с приложением-компаньоном | [Периферийное устройство BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html) | Передачу рекламных пакетов BLE, подключение, интерфейс и поведение сервиса, повторное подключение и проверку со стороны телефона |
| Устройство должно работать как периферийное по отношению к телефону и как центральное по отношению к датчику | [Центральное и периферийное устройства BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html) | Одновременная работа в ролях GAP и распределение функций клиента/сервера GATT |
| Надёжная передача данных по BLE | [Пропускная способность BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html) или [Передача файлов по BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html) | Необходимый поток данных, параметры подключения и поведение при восстановлении после сбоя |
| Обновление прошивки по Bluetooth | [Периферийное устройство с OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html) или [Центральное и периферийное устройства с Pingpong OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Роли при обновлении, восстановление после прерывания обновления, разделы памяти и план отката |
| Последовательная связь или доступ к сети через телефон по классическому Bluetooth | [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) или [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html) | Соответствие последовательного профиля или сетевого доступа через телефон требованиям изделия, совместимость с удалённым устройством и повторное подключение |
| Транспорт HCI по UART между хостом и контроллером BT/BLE | [HCI через UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html) | Границу между хостом и контроллером, транспорт UART и конфигурацию целевого контроллера и платы |
| Аудио или вызовы по классическому Bluetooth | [Приёмник музыки](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Передатчик музыки](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) или [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) | Аудиотракт, тактирование, буферизация, совместимость с телефоном и бюджет энергопотребления |
| Широковещательная передача LE Audio | [Передатчик широковещательного аудио BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) или [Приёмник широковещательного аудио BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | Роль при вещании, аудиотракт, тестовый приёмник или передатчик и запас по времени |

</div>

## Проверка примера на целевой плате { #bring-up-an-example-as-evidence }

До изменения проекта зафиксируйте точную версию SDK, имя платы, конфигурацию, удалённое устройство или приложение, параметры радиосвязи и ожидаемую запись в журнале. Затем выполните следующие шаги:

1. Соберите и прошейте неизменённый пример, используя точное имя платы и инструкции для соответствующего выпуска SDK. Если соответствие документации и ревизии SDK или поддержка платы не установлены, перед адаптацией считайте совместимость непроверенной.
2. Подтвердите основной сценарий по радиоканалу: обнаружение, подключение, передачу, потоковое воспроизведение или приём — в зависимости от задачи.
3. Повторите проверку после сброса, отключения, повторного подключения и выключения/включения питания.
4. Добавляйте по одному элементу, специфичному для изделия: сервис, пользовательский сценарий, аудиотракт или политику управления питанием.
5. Повторно проверьте систему под совокупной нагрузкой изделия, включая дисплей, датчики, накопитель, аудио и переходы в режимы низкого энергопотребления, если они применимы.

Рабочий пример демонстрирует только предусмотренный в нём сценарий. Сам по себе он не подтверждает готовность изделия к выпуску по таким параметрам, как политика безопасности, дальность связи, задержка, энергопотребление и совместимость.

## Примеры BLE { #ble-examples }

Используйте примеры BLE для связи с приложениями-компаньонами, совместимых сервисов GATT, маяков, передачи данных и OTA по BLE. Сначала выберите пример для нужной роли, а затем добавляйте пример профиля, только если изделию требуется соответствующий стандартизованный сервис.

<div align="center"><em>Таблица: примеры BLE SDK по инженерным задачам</em></div>

<div align="center" markdown>

| Инженерная задача | Официальные примеры | Что проверить с помощью этих проектов |
|:------------------|:--------------------|:-------------------------------------|
| Базовые роли и доступ к сервисам | [Периферийное устройство](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html), [Центральное и периферийное устройства](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html), [Несколько соединений](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/multi_connection/README.html) | Передачу рекламных пакетов BLE, сканирование, управление подключениями и корректное распределение ролей центрального и периферийного устройств |
| Интеграция с телефоном | [AMS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ams/README.html), [ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs/README.html), [ANCS на двух ядрах](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs_dualcore/README.html) | Интеграция с медиафункциями или уведомлениями Apple и требуемый сценарий сопряжения на телефоне |
| Стандартные профили GATT | [BASC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/basc/README.html), [CPPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cppc/README.html), [CSCPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cscpc/README.html), [DISS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/diss/README.html), [HRPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hrpc/README.html), [CTS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/tip_cts/README.html) | Роль сервиса, определение характеристик GATT и совместимость стандартного профиля с удалённым устройством |
| Устройства ввода и двусторонняя голосовая связь | [HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hid/README.html), [Переговорное устройство BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/talkback/README.html) | Модель взаимодействия до добавления интерфейса изделия или функций голосовой связи |
| Сопряжение и повторное подключение | [Сопряжение BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/pair/README.html) | Сохранение ключей сопряжения (bonding), управление идентификаторами и сценарий повторного сопряжения изделия |
| Передача рекламных пакетов и обнаружение устройств | [iBeacon](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/iBeacon/README.html), [Периодическая передача рекламных пакетов BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv/README.html), [Синхронизация с периодической передачей рекламных пакетов BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv_sync/README.html) | Требуемое поведение широковещательной передачи или синхронизации без предположения о наличии подключения GATT |
| Передача данных и OTA | [Передача файлов](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html), [Пропускная способность](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html), [Периферийное устройство с OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html), [Центральное и периферийное устройства с Pingpong OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Данные, параметры соединения, роли при обновлении, восстановление после прерывания и сквозную проверку |

</div>

Не следует считать измеренную в тесте пропускную способность гарантированной скоростью передачи данных изделия. Результат зависит от выбранного PHY, параметров подключения, поведения удалённого устройства, радиочастотной обстановки, активности хоста и структуры полезной нагрузки. Аналогично, пример ANCS или AMS — это отправная точка для интеграции с телефоном, а не гарантия работы со всеми версиями iOS и при любых настройках разрешений пользователя.

## Примеры классического Bluetooth { #classic-bluetooth-examples }

Проекты классического Bluetooth подходят изделиям, которым нужны профили BR/EDR, аудио, последовательная передача данных или доступ к IP-сети через телефон. Успешная демонстрация на отладочной плате — лишь отправная точка; проверьте совместимость с фактическими удалёнными устройствами и рабочей нагрузкой изделия.

<div align="center"><em>Таблица: примеры классического Bluetooth SDK по инженерным задачам</em></div>

<div align="center" markdown>

| Инженерная задача | Официальные примеры | Что проверить с помощью этих проектов |
|:------------------|:--------------------|:-------------------------------------|
| Транспорт между хостом и контроллером или профиль классической последовательной связи | [HCI через UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html), [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) | Границу между хостом и контроллером и транспорт UART для HCI либо работу последовательного профиля SPP |
| Потоковое аудио и управление воспроизведением | [Несколько соединений A2DP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_multi_connect/README.html), [Совместная передача аудио A2DP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_sharing/README.html), [Обложка альбома AVRCP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/avrcp_cover_art/README.html), [Приёмник музыки](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Приёмник музыки с ретрансляцией](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink_with_relay/README.html), [Передатчик музыки](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) | Предполагаемую схему «источник/приёмник», аудиотракт, канал управления воспроизведением и бюджет ресурсов |
| Вызовы и голосовые соединения | [3-SCO](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/3sco/README.html), [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html), [Ретрансляция HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp_relay/README.html) | Схему вызова, задержку аудио, тракт микрофона/динамика и поведение телефона |
| Сеть через телефон и OTA | [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html), [PAN OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan_ota/README.html) | Раздачу сети телефоном, IP-трафик, повторное подключение и способ доставки OTA |

</div>

Описание модели сетевого доступа PAN и настройки телефона см. в статье [Bluetooth PAN](pan.md). О маршрутизации аудио, управлении буферами и проверке под системной нагрузкой см. статьи [Обзор аудио](../audio/overview.md) и [Audio Server и буферизация](../audio/audio-server-buffering.md).

## Примеры широковещательной передачи LE Audio { #le-audio-broadcast-examples }

Путь документации `sf32lb58x` сам по себе не подтверждает совместимость с платой; проверьте раздел **Supported Platforms** для нужной ревизии SDK и целевой платы. В примере, соединяющем классический Bluetooth и BAP, заголовок README указывает на передатчик, а путь и обзор описывают приёмник. [Реализация в проверенной версии SDK](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/example/zbt/bap_broadcast_src_with_classic_bt/src/main.c) обрабатывает Classic A2DP и запускает передатчик широковещательного аудио BAP. Этот вывод относится только к указанному коммиту и не переносится автоматически на все версии, доступные через `latest`. Перед сборкой проверьте README, исходный код и конфигурацию платы для фактически используемого выпуска или коммита SDK. Не определяйте роль или поддержку платы по скопированному описанию приёмника.

Проекты `zbt` содержат примеры источника и приёмника широковещательной передачи LE Audio на основе [базового аудиопрофиля (Basic Audio Profile, BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/). Проверяйте источник и приёмник как единую систему: на результат влияют конфигурация вещания, источник аудио, приёмник, тактирование и условия радиосвязи.

<div align="center"><em>Таблица: примеры SDK для широковещательной передачи LE Audio</em></div>

<div align="center" markdown>

| Назначение изделия | Официальный пример | Что проверить в первую очередь |
|:-------------------|:-------------------|:-------------------------------|
| Приём широковещательного аудиопотока | [Приёмник широковещательного аудио BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | Поведение приёмника, тракт вывода аудио и конфигурацию тестового вещания |
| Передача широковещательного аудиопотока | [Передатчик широковещательного аудио BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) | Аудиотракт источника, конфигурацию вещания и заведомо исправный приёмник |
| Совместная работа классического Bluetooth и широковещательной передачи LE Audio | [Передатчик широковещательного аудио BAP с классическим Bluetooth](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src_with_classic_bt/README.html) | Оба аудиодомена, границу переключения между ними и общий запас по времени и ресурсам |

</div>

## Проверка изделия после адаптации примера { #product-validation-beyond-the-example }

<div align="center"><em>Таблица: проверка адаптации примеров Bluetooth к изделию</em></div>

<div align="center" markdown>

| Аспект | Что сохранить из исходного примера | Что повторно проверить на изделии |
|:-------|:----------------------------------|:---------------------------------|
| Работа радиосистемы | Поддерживаемую плату и предусмотренную примером роль или профиль | Антенну, корпус, дальность, сосуществование радиосистем, удалённые устройства и план испытаний на соответствие нормативам |
| Политика подключения | Базовый сценарий передачи рекламных пакетов BLE, сканирования или подключения | Требуемую задержку, целевое энергопотребление, стратегию повторного подключения и переходы состояний |
| Безопасность | Настройку сопряжения или сохранения ключей (bonding) в примере | Требования к аутентификации, хранение ключей, конфиденциальность, сброс к заводским настройкам и пользовательское восстановление |
| Данные и аудио | Продемонстрированный обмен пакетами или потоковую передачу | Формат и правила обмена данными, восстановление после ошибок, задержку, буферизацию, настройки кодека и запас памяти |
| Результаты проверки | Настройки сборки, журналы и ожидаемое поведение | Воспроизводимую матрицу телефонов и аксессуаров, график энергопотребления во времени, восстановление после разрыва связи и регрессионные тесты |

</div>

## Связанные материалы { #related-resources }

- [Обзор Bluetooth](overview.md) — выбор ролей, профилей, мер безопасности, параметров подключения и сосуществования радиосистем на уровне изделия.
- [Bluetooth-процессор](processor.md) — разделение функций между хостом и контроллером и особенности энергопотребления.
- [Bluetooth PAN](pan.md) — IP-сеть через телефон и OTA на основе PAN.
- [Аудиопримеры SDK](../audio/audio-sdk-examples.md) — дополнительные примеры локального захвата, работы с кодеками и воспроизведения.
- [Примеры](../../develop/examples/index.md) — каталог примеров SDK для разных областей.
