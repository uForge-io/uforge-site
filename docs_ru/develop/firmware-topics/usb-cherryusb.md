---
icon: lucide/usb
description: "Работа с USB-оборудованием SF32 через CherryUSB: сценарии CDC, HID, MSC, аудио и MTP, проверка дескрипторов и тестирование перечисления в разных операционных системах."
tags:
    - Разработка
    - USB
---

# USB и CherryUSB { #usb-and-cherryusb }

Для устройств SF32 и плат с поддерживаемым USB-оборудованием документация и примеры SiFli-SDK показывают интеграцию с CherryUSB. Проверьте, какие роли и классы USB поддерживает конкретное сочетание микросхемы, платы и версии SDK, и рассматривайте USB как полноценный программный стек, а не только как аппаратную функцию.

Работа с USB затрагивает прошивку, дескрипторы, операционные системы хоста, питание и средства производства. Если устройство один раз определилось на ноутбуке разработчика, это ещё не означает, что работа завершена.

## Сценарии использования { #use-cases }

- Последовательный порт USB CDC.
- HID-устройства.
- Накопители MSC.
- USB-аудио: микрофон или динамик.
- MTP.
- Поддержка USB Host для периферии классов CDC, HID, MSC, UVC и UAC, если это поддерживают SDK и плата.

## Практический порядок работы { #practical-workflow }

1. Убедитесь, что на плате есть нужный USB-разъем и предусмотрена цепь питания.
2. Возьмите за основу ближайший по назначению пример USB из SDK.
3. Проверьте перечисление устройства в Windows, macOS и Linux.
4. Проверьте приостановку и возобновление работы, а также поведение при повторном подключении кабеля.
5. Зафиксируйте VID/PID, дескрипторы и требования к драйверам хоста.

## Что проверить { #what-to-test }

- Подключение кабеля до подачи питания и подключение/отключение во время работы устройства.
- Сброс при подключенном кабеле.
- Переход хоста в сон и выход из него.
- Отключение кабеля во время передачи данных.
- Перечисление устройства в Windows, macOS и Linux.
- Работу составного устройства при включении нескольких классов.
- Предупредите пользователей, что USB-кабели только для зарядки не поддерживают передачу данных.

## Проверка дескрипторов { #descriptor-checklist }

- Определено, кому принадлежат VID/PID.
- Строка с названием продукта окончательная либо версионируется.
- Определено поведение серийного номера.
- Значения класса/подкласса/протокола соответствуют предполагаемому драйверу хоста.
- Состав интерфейсов остается стабильным при обновлении прошивки.

## Примеры SDK { #sdk-examples }

[Официальный каталог примеров CherryUSB для SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/index.html) отдельно группирует примеры для USB Device и USB Host. Начните с примера, соответствующего роли USB и нужному классу, а проверки дескрипторов, питания и совместимости с хостом примените в реализации продукта.

<div align="center"><em>Таблица: примеры CherryUSB из SiFli-SDK для SF32LB58x</em></div>
<div align="center" markdown>

| Роль USB | Пример | Назначение |
| --- | --- | --- |
| Устройство | [USB-микрофон](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic/README.html) | Микрофон USB Audio Class 1 |
| Устройство | [USB-микрофон и динамик](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic_speaker/README.html) | Двустороннее аудио USB Audio Class 1 |
| Устройство | [CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm/README.html) | USB-устройство связи |
| Устройство | [CDC ACM UART](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm_uart/README.html) | Мост USB-UART |
| Устройство | [CDC + HID + MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_hid_msc/README.html) | Составное USB-устройство |
| Устройство | [Мышь HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/hid_mouse/README.html) | Указывающее устройство USB HID |
| Устройство | [MSC с NOR Flash](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/nor_flash_disk/README.html) | Запоминающее устройство на базе NOR Flash |
| Устройство | [MSC с RAM-диском](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk/README.html) | Запоминающее устройство на базе RAM |
| Устройство | [MSC с двумя RAM-дисками](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk_dual/README.html) | Два логических накопителя на базе RAM |
| Устройство | [MSC с SD/eMMC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/sdcard_disk/README.html) | Запоминающее устройство на базе карты SD или eMMC |
| Устройство | [MTP с DFS и RAM-диском](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/mtp/README.html) | Устройство Media Transfer Protocol |
| Хост | [Хост CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/cdc_acm_host/README.html) | Связь с периферийным устройством CDC ACM |
| Хост | [Хост HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/hid/README.html) | Подключение HID-устройства и чтение его данных |
| Хост | [Хост MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/msc_host/README.html) | Подключение USB-накопителя |
| Хост | [Хост UVC + UAC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/uvc_uac_host/README.html) | USB-периферия классов видео и аудио |

</div>
