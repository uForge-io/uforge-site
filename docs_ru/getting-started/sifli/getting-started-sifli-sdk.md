---
icon: lucide/terminal
description: "Первый запуск платы SF32: установка SiFli-SDK и инструментов, сборка примера hello_world и загрузка прошивки по UART."
tags:
    - Начало работы
    - SiFli SDK
---

# SiFli-SDK { #sifli-sdk }

Это руководство поможет пройти путь от только что распакованной отладочной платы SF32 до запуска примера `hello_world` по UART с помощью **SiFli-SDK** — официального SDK для устройств SF32 на базе RT-Thread.

Даже если вы планируете использовать Arduino, Zephyr или MicroPython, сначала рекомендуется один раз пройти это руководство. Так вы проверите работу платы, кабеля, последовательного порта, процедуры прошивки и базового инструментария, прежде чем подключать другую платформу.

## Что понадобится { #what-youll-need }

**Оборудование**

- Отладочная плата SF32, например [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md), или другая плата из [семейства SF32](../../sf32-products/family/SF32_family.md).
- Кабель USB Type-C с поддержкой **передачи данных**, подключённый к разъёму USB-to-UART на плате. Не используйте кабель только для зарядки или дополнительный USB-порт платы, предназначенный для другой функции.
- Компьютер под управлением Windows, macOS или Linux.

**Программное обеспечение**

- [git](https://git-scm.com/)
- Инструментарий C/C++, который устанавливает [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Установщик SiFli-SDK автоматически загрузит компилятор, отладчик и среду Python.
- Сам репозиторий [SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK).

**Официальная документация**

- [Руководство по установке SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)
- [Список плат, поддерживаемых SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)
- [Репозиторий SiFli-SDK в OpenSiFli](https://github.com/OpenSiFli/SiFli-SDK)
- [Опубликованные версии SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK/releases)

!!! tip "Нужна IDE?"
    SiFli также выпускает расширение **SiFli-SDK-CodeKit** для VS Code. Оно помогает настроить SDK, собрать и прошить проект с помощью пошаговых команд. Если такой процесс вам удобнее, см. руководство [SiFli CodeKit](getting-started-sifli-codekit.md).

## Установка инструментов { #install-the-toolchain }

Для воспроизводимой исходной конфигурации используйте опубликованный тег версии, а не `main`. На момент проверки последний опубликованный тег — `v2.5.1`; перед началом проверьте [список официальных версий](https://github.com/OpenSiFli/SiFli-SDK/releases), возможно, появился более новый тег. Ветка `release/v2.5` получает обновления этой серии и со временем меняется.

=== "macOS / Linux"

    Установите `uv` — менеджер пакетов и окружений, на котором основаны скрипты SiFli-SDK:

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

    Клонируйте SDK:

    ```bash
    mkdir -p ~/OpenSiFli && cd ~/OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Запустите установщик, затем подключите окружение SDK в текущей оболочке:

    ```bash
    cd SiFli-SDK
    ./install.sh
    . ./export.sh
    ```

=== "Windows"

    Установите `uv` из PowerShell:

    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    Клонируйте SDK:

    ```powershell
    mkdir C:\OpenSiFli
    cd C:\OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Запустите установщик, затем подключите окружение SDK:

    ```powershell
    cd SiFli-SDK
    .\install.ps1
    .\export.ps1
    ```

!!! info "В SiFli-SDK используются подмодули Git"
    Функция GitHub «Download ZIP» не включает необходимые подмодули. Клонируйте репозиторий командой `git clone --recursive`. Если репозиторий уже клонирован без подмодулей, выполните `git submodule update --init --recursive` из корневого каталога SDK.

!!! note "Работаете из материкового Китая?"
    Перед установкой задайте в оболочке значение `1` для `SIFLI_SDK_MIRROR_CHINA`: в macOS/Linux используйте `export SIFLI_SDK_MIRROR_CHINA=1`, а в PowerShell — `$env:SIFLI_SDK_MIRROR_CHINA = "1"`. SDK также можно клонировать из [зеркала Gitee](https://gitee.com/SiFli/sifli-sdk), а не с GitHub. Подробности см. в [руководстве по установке](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html).

Скрипт `install.sh` или `install.ps1` загружает подходящие версии компилятора, отладчика и зависимостей Python. Запускайте его повторно при смене версии SDK. Скрипт `export.sh` или `export.ps1` активирует это окружение в текущем терминале; выполняйте его при каждом открытии нового терминала перед сборкой. В Windows запускайте `.ps1`-скрипты из PowerShell.

## Выбор целевой платы { #choose-the-board-target }

Значение параметра `scons --board` — это имя каталога платы в `customer/boards`. Выберите цель, соответствующую конфигурации памяти и дисплея на вашей плате: имена чувствительны к регистру.

<div align="center" markdown>

*Цели сборки для отладочных комплектов SiFli-SDK*

| Отладочный комплект | Точное имя цели `scons --board` |
| --- | --- |
| SF32LB52-DevKit-Core-3p3 | `sf32lb52-core_e8r16`<br>`sf32lb52-core_n16r16` |
| SF32LB52-DevKit-LCD | `sf32lb52-lcd_52d`<br>`sf32lb52-lcd_n16r8`<br>`sf32lb52-lcd_a128r16` |
| SF32LB52-DevKit-Nano | `sf32lb52-nano_n4`<br>`sf32lb52-nano_n16r16`<br>`sf32lb52-nano_a128r16` |
| Huangshan-Pi (SF32LB52-LCHSPI-ULP) | `sf32lb52-lchspi-ulp` |
| SF32LB56-DevKit-LCD | `sf32lb56-lcd_a128r12n1`<br>`sf32lb56-lcd_n16r12n1` |
| SF32LB58-DevKit-LCD | `sf32lb58-lcd_a128r32n1_dsi`<br>`sf32lb58-lcd_a128r32n1_qspi`<br>`sf32lb58-lcd_n16r32n1_dpi`<br>`sf32lb58-lcd_n16r32n1_dsi`<br>`sf32lb58-lcd_n16r32n1_qspi`<br>`sf32lb58-lcd_n16r64n4` |

</div>

Для платы с двумя ядрами, если не указывать суффикс ядра, собирается конфигурация HCPU. При необходимости явно укажите `_hcpu` или добавьте `_lcpu` для сборки конфигурации LCPU; например, `scons --board=eh-lb551_lcpu`. Если конфигурации вашей платы нет в этой таблице, сверьтесь с актуальным [списком плат, поддерживаемых SiFli](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html).

## Сборка примера «Hello World» { #build-the-hello-world-example }

После подключения окружения соберите пример RT-Thread `hello_world` для вашей платы:

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb52-lcd_n16r8 -j8
```

Замените `sf32lb52-lcd_n16r8` на имя вашей платы. Доступные имена см. в [списке поддерживаемых плат](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html). Параметр `-j8` запускает 8 параллельных заданий сборки; при необходимости скорректируйте число с учётом возможностей компьютера. В команде примера суффикс ядра не указан, поэтому собирается HCPU, а бинарные файлы помещаются в каталог `build_sf32lb52-lcd_n16r8_hcpu/`. Если явно указать цель с суффиксом `_lcpu`, суффикс выходного каталога также будет `_lcpu`.

!!! tip "Нужны пользовательские настройки?"
    В каталоге проекта выполните `sdk.py menuconfig --board=<board_name>`, чтобы открыть интерактивное меню конфигурации. Дважды нажмите ++esc++, а затем при появлении запроса выберите сохранение конфигурации перед выходом.

## Прошивка платы { #flash-the-board }

Не отключая плату от USB, запустите скрипт загрузки, созданный в ходе сборки:

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

    Когда программа запросит последовательный порт, укажите путь к устройству, который показывает операционная система. В macOS выбирайте `/dev/cu.*` (например, `/dev/cu.usbserial-12345678`), а не `/dev/tty.*`; в Linux укажите соответствующий путь, например `/dev/ttyUSB0`.

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

    Когда появится запрос `please input serial port number`, введите только номер COM-порта (например, `19` для `COM19`) и нажмите Enter.

!!! tip
    Если утилита не может перевести плату в режим загрузки по UART, сбросьте плату непосредственно перед началом передачи. Если проблема сохраняется, следуйте инструкции по прошивке для этой платы.

## Проверка запуска { #see-it-run }

После завершения прошивки сбросьте плату или дождитесь её автоматического перезапуска. Откройте терминал последовательного порта и задайте скорость по умолчанию для платы. В терминале должны появиться загрузочные сообщения и вывод примера `hello_world` по UART.

## Проверка результата { #success-check }

Можно переходить дальше, если:

- Проект собирается без ошибок.
- Скрипт загрузки по UART завершается успешно.
- В консоли последовательного порта отображаются читаемые загрузочные сообщения.
- После сброса платы выводится сообщение примера `hello_world`.

## Что делать дальше { #where-to-go-next }

- **Выбрать микросхему:** сравните серии LB52, LB55, LB56 и LB58 в [обзоре семейства SF32](../../sf32-products/family/SF32_family.md).
- **Изучить другие примеры:** помимо `hello_world`, в SDK есть примеры для BLE, классического Bluetooth, графики LVGL, аудио и режимов энергосбережения.
- **Попробовать другую платформу:** перейдите к руководствам по [Arduino](../arduino/getting-started-arduino.md), [Zephyr](../zephyr/getting-started-zephyr-upstream.md) или [MicroPython](../micropython/getting-started-micropython.md).
- **Если возникла проблема:** найдите решение типичных проблем с инструментарием, J-Link и отладкой в [разделе часто задаваемых вопросов SiFli](https://wiki.sifli.com/en/faq/index.html).

## Зафиксируйте рабочую базовую конфигурацию { #what-sifli-should-add }

Чтобы настройку можно было повторить, запишите тег или ветку SDK, точное значение `scons --board`, ОС компьютера, последовательный порт и способ загрузки, который сработал на вашей плате. При обновлении SDK или смене платы сверяйтесь с [официальным списком поддерживаемых плат](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) и [опубликованными версиями](https://github.com/OpenSiFli/SiFli-SDK/releases).
