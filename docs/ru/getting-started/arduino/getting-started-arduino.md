---
icon: lucide/puzzle
description: "Пошаговый первый запуск бета-версии ArduinoCore-zephyr от OpenSiFli на SF32LB52 DevKit LCD: установка пакета платы, проверка вывода в последовательный порт и запуск Blink."
tags:
    - Начало работы
    - Arduino
---

# Arduino { #arduino }

В OpenSiFli доступно бета-ядро Arduino для SF32 на базе Zephyr: [OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr). Оно публикует пакет Arduino `sifli:sf32lb52`, который в Boards Manager отображается как **SiFli Serial Boards**. Сейчас пакет рассчитан на плату **SiFli SF32LB52 DevKit LCD**.

Этот вариант подходит для скетчей, быстрой проверки периферии, демонстраций и ранних прототипов. Для разработки прошивки серийного изделия, настройки стека Bluetooth, приложений с интенсивной графикой, оптимизации энергопотребления или разработки собственной платы используйте [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).

!!! warning "Бета-версия ядра"
    OpenSiFli помечает это ядро Arduino как **BETA** и рекомендует использовать его только для тестирования. Функции, API, поведение загрузчика, состав пакета и процесс выпуска могут измениться. Не считайте его готовым к серийному применению.

## Что понадобится { #what-youll-need }

**Оборудование**

- Плата SiFli SF32LB52 DevKit LCD.
- Кабель USB Type-C с поддержкой передачи данных, подключённый к интерфейсу USB-to-UART платы.
- Компьютер под управлением Windows, macOS или Linux.

**Программное обеспечение**

- [Arduino IDE 2.x](https://www.arduino.cc/en/software) или [Arduino CLI](https://docs.arduino.cc/arduino-cli/).
- Пакет Arduino OpenSiFli `sifli:sf32lb52`.
- Монитор последовательного порта.

## Установка пакета платы { #install-the-board-package }

В Arduino IDE откройте **Arduino IDE > Settings** и добавьте следующий URL в поле **Additional Boards Manager URLs**:

```text
https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

Если вы находитесь в материковом Китае, используйте зеркало индекса пакетов:

```text
https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

Затем откройте **Boards Manager**, найдите **SiFli Serial Boards** и установите платформу `sifli:sf32lb52`.

Для Arduino CLI выполните:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

Для зеркала в Китае:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

## Выбор платы { #select-the-board }

В Arduino IDE выберите:

```text
SiFli SF32LB52 DevKit LCD
```

FQBN платы:

```text
sifli:sf32lb52:sf32lb52devkitlcd
```

В определении платы OpenSiFli этот вариант Arduino сопоставлен с целью Zephyr `sf32lb52_devkit_lcd` и вариантом `sf32lb52_devkit_lcd_sf32lb525uc6`.

## Выбор параметров сборки { #choose-build-options }

Ядро предоставляет два важных меню:

<div align="center"><em>Параметры сборки</em></div>

<div align="center" markdown>

| Меню | Параметр | Значение |
|:-----|:---------|:---------|
| **Mode** | `Standard` | Скетч запускается автоматически после загрузки. |
| **Mode** | `Debug` | Оболочка Zephyr ожидает команду `sketch`. |
| **Link mode** | `Dynamic` | Скетч упаковывается для загрузчика Zephyr. |
| **Link mode** | `Static` | Скетч включается в прошиваемый бинарный файл. |

</div>

Используйте **Dynamic** для работы через загрузчик Zephyr. Выбирайте **Static**, если скетч нужно скомпоновать с образом прошивки для записи во флеш-память.

## Перевод платы в режим загрузки по последовательному порту { #put-the-board-in-serial-download-mode }

По документации OpenSiFli, перед первой загрузкой плату необходимо перевести в режим загрузки по последовательному порту. Выполните описанную для SF32LB52 DevKit LCD последовательность Boot/Reset, затем запустите загрузку из Arduino IDE или CLI.

Для загрузки используется инструмент `sftool`.

## Загрузка проверочного примера с выводом в последовательный порт { #upload-a-serial-smoke-test }

Сначала проверьте вывод в последовательный порт. Он позволяет проверить загрузку, сброс платы, запуск среды выполнения и вывод в консоль, не полагаясь на полярность светодиода:

```cpp
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello from SF32 Arduino");
  delay(1000);
}
```

Загрузите скетч из Arduino IDE или выполните команды Arduino CLI:

```bash
arduino-cli compile \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch

arduino-cli upload \
  -p /dev/cu.usbserial-XXXX \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch
```

Замените `/dev/cu.usbserial-XXXX` на последовательный порт платы. В Windows укажите соответствующий порт `COM`, а в Linux — `/dev/ttyUSB*` или `/dev/ttyACM*`.

Откройте Serial Monitor и задайте скорость `115200` бод. В режиме сборки **Standard** скетч должен выводить одну строку в секунду. В режиме **Debug** откройте оболочку Zephyr и выполните команду:

```text
sketch
```

## Загрузка примера Blink { #upload-blink }

Проверьте, определён ли `LED_BUILTIN` в установленном варианте SF32LB52 DevKit LCD: номера выводов Arduino не универсальны. Если макрос определён и вариант сопоставляет его со встроенным светодиодом, после успешной проверки последовательного вывода попробуйте Blink. В противном случае перед выбором GPIO уточните по документации платы, куда подключён светодиод и какова его полярность.

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

## Устранение неполадок { #troubleshooting }

<div align="center"><em>Таблица: устранение неполадок</em></div>

<div align="center" markdown>

| Проблема | Что проверить |
|:---------|:-------------|
| Пакет не отображается | Проверьте URL индекса пакетов и используйте Arduino IDE 2.x. |
| Загрузка прошивки завершается ошибкой | Переведите плату в режим загрузки по последовательному порту и убедитесь, что монитор последовательного порта не занимает этот порт. |
| Скетч не запускается | Проверьте параметр **Mode**. В режиме `Debug` выполните `sketch` в оболочке Zephyr. |
| Неопределённый символ Zephyr | Согласно README ядра, отсутствующие функции Zephyr могут потребовать экспорта в `loader/llext_exports.c` и повторной сборки загрузчика. |
| Отсутствует подсистема Zephyr | Включите требуемый параметр `CONFIG_` в конфигурации платы `.conf`, пересоберите загрузчик и загрузите его на плату. |
| Не хватает памяти | Оболочка Zephyr и динамическая загрузка скетча занимают RAM. При необходимости уменьшите размер стека или выберите другой режим сборки. |

</div>

## Текущий охват { #what-sifli-team-should-finish }

Опубликованный сейчас пакет предназначен для SF32LB52 DevKit LCD и остаётся бета-версией для тестирования. Прежде чем пробовать его на другой плате или полагаться на какой-либо API, проверьте [репозиторий исходного проекта](https://github.com/OpenSiFli/ArduinoCore-zephyr) и примечания к выпуску именно этой версии пакета. Поддержка функции в Zephyr или SiFli-SDK сама по себе не означает, что она поддерживается этим пакетом Arduino.
