---
icon: lucide/file-search-2
title: "Сбор журналов и анализ сбоев"
description: "Собирайте соответствующие друг другу журналы и дампы памяти, восстанавливайте контекст сбоя и анализируйте assert или HardFault средствами SiFli-SDK."
tags: [Разработка, SiFli-SDK, Практические руководства, Отладка]
---

# Сбор журналов и анализ сбоев { #capture-logs-and-analyze-crashes }

Руководства SDK `debug_logging` и `crash_analysis` дополняют друг друга: журналы показывают, что выполняли оба ядра, а дамп памяти позволяет отладчику восстановить контекст сбоя. Для каждого дампа сохраняйте соответствующие ELF, файлы карты компоновки и символов, ревизию SDK, модель микросхемы, конфигурацию и ревизию платы.

## Выбор отладочного подключения { #choose-a-debug-connection }

<div align="center" markdown>

<em>Таблица: Отладка и сбор журналов для семейств SF32</em>

| Семейство | Особенности отладки и сбора журналов |
|---|---|
| SF32LB52x, SF32LB56x, SF32LB58x | Исходное руководство описывает сбор через UART, использование `SifliUsartServer`/`AssertDumpUart` и восстановление дампа с помощью J-Link/Trace32. Выбирайте транспорт, который остается доступным в заданном режиме энергосбережения. |
| SF32LB55x | Подключение SWD можно переключать между HCPU и LCPU с помощью `$SDK_ROOT/tools/segger/jlink_hcpu_a0.bat` и `jlink_lcpu_a0.bat`. ROM-консоль LCPU работает через UART3 со скоростью 1 000 000 бод; для HCPU можно использовать UART1/2 или SWD. Поскольку SWD использует выводы PB, на время подключения оставьте LPSYS активной или переведите ее в режим легкого сна (light sleep). |

</div>

После выхода LPSYS из режима Standby подключение SWD возвращается к HCPU. Сам по себе сброс через J-Link не переключает выбранное ядро. При асинхронном журналировании дамп assert может оказаться неполным; для фиксации сбоя используйте синхронное журналирование или механизм, сохраняющий данные при сбое.

## Сбор данных в реальном времени или после сбоя { #capture-a-live-or-post-mortem-package }

В актуальных версиях SDK собирайте данные через UART или J-Link с помощью `sdk.py`:

!!! note "Область применимости примера"
    Команда ниже приведена для SF32LB52/LB525. Сохраните ее структуру, но укажите микросхему/модель, ядро, транспорт и ELF, поддерживаемые целевым семейством и версией SDK.

```text
sdk.py crash-dump capture-live --transport uart --probe /dev/ttyUSB0 \
  --chip SF32LB52 --chip-model LB525 \
  --output /tmp/live-crash --elf build_hcpu/main.elf
```

Если в целевом устройстве используется PSRAM, добавьте `--include-psram --psram-size 8MB`. Для J-Link можно задать `--transport jlink --jlink-ip 127.0.0.1:19025`; выберите ядро, в котором произошел сбой, с помощью `--core hcpu` или `--core lcpu`. В каталоге результатов должны находиться сохраненный двоичный дамп, ELF/AXF ядра, `log.txt`, `manifest.json` и `sdk_manifest.json`.

Для более старых версий SDK используйте способ, предусмотренный для семейства в исходном руководстве:

- UART: `SifliUsartServer` или `AssertDumpUart` могут выгрузить пакет assert, пока консоль доступна.
- J-Link/SWD: добавьте J-Link в `PATH` и запустите скрипт для целевого семейства. Например, для SF32LB55x используется `$SDK_ROOT/tools/crash_dump_analyser/script/save_ram_55x.bat`. Соответствующий скрипт сохраняет RAM, регистры EPIC и PSRAM.
- Если нужны данные для выявления утечки памяти в куче, включите `RTOS → RT-Thread Kernel → Memory Management → Enable memory trace`.

Для скриптового сбора выберите файл `.jlink`, соответствующий семейству, конфигурации PSRAM и способу подключения. При использовании `SifliUsartServer` нужен скрипт для режима IP, а для прямого подключения J-Link — скрипт для режима USB. Несовпадение конфигурации может привести к сбою захвата.

![Параметр трассировки памяти в menuconfig SF32LB52x](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_mem_trace.png){ loading="lazy" }
<div align="center"><em>Рисунок: пример для SF32LB52x — включите трассировку памяти до воспроизведения сбоя, если нужны данные о куче.</em></div>

Для сбора по UART обычно требуется согласовать настройки утилиты последовательного порта, адрес сервера и целевое ядро. Следующие снимки экрана из исходного руководства помогут проверить подключение:

![Расположение SiFli_Trace и SifliUsartServer](../../../../assets/develop/app-notes/crash-analysis/Sifli_Trace.png){ loading="lazy" }
<div align="center"><em>Рисунок: пример для SF32LB52x — каталог инструментов, показанный в исходном руководстве.</em></div>

![Настройки подключения SifliUsartServer для SF32LB52x](../../../../assets/develop/app-notes/crash-analysis/UsartServer52.png){ loading="lazy" }
<div align="center"><em>Рисунок: пример для SF32LB52x — последовательный порт, скорость обмена, адрес сервера и ядро отладки должны соответствовать целевому устройству.</em></div>

![Скрипт сохранения RAM для анализатора аварийных дампов](../../../../assets/develop/app-notes/crash-analysis/save_ram_uart_52.png){ loading="lazy" }
<div align="center"><em>Рисунок: пример для SF32LB52x — в каталоге есть скрипты для разных семейств и способов подключения, например `save_ram_55x.bat`, `save_ram_58x.bat` и `save_ram_uart_52x.bat`. Выберите скрипт для целевого устройства и подключения.</em></div>

## Восстановление и анализ контекста { #restore-and-analyze-the-context }

Преобразуйте собранный пакет в core-файл, который можно открыть в отладчике, и анализируйте его с соответствующим ELF:

```text
sdk.py crash-dump readcore --package /tmp/live-crash \
  --elf build_hcpu/main.elf --output /tmp/live-crash/coredump.elf
sdk.py crash-dump analyze --core /tmp/live-crash/coredump.elf \
  --elf build_hcpu/main.elf
```

В старом процессе с Trace32 загрузите пакет assert HCPU кнопкой HCPU assertion (HA) и командой `run_next_step`; для дампа LCPU используйте конфигурацию восстановления LCPU. Если стек исключения не отображается, прежде чем интерпретировать регистры, проверьте выбранное ядро, ELF и диапазоны памяти.

![Пример выбора скрипта захвата в Trace32](../../../../assets/develop/app-notes/crash-analysis/dump_select.png){ loading="lazy" }
<div align="center"><em>Рисунок: пример для SF32LB52x — выбор скрипта захвата для J-Link/Trace32.</em></div>

![Окно assert HCPU в Trace32](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_hcpu_window.png){ loading="lazy" }
<div align="center"><em>Рисунок: пример для SF32LB52x — после восстановления сопоставьте стек вызовов, список потоков, состояние кучи и причину ошибки.</em></div>

## Остановка на раннем этапе загрузки или при подозрении на гонку { #stop-early-during-boot-or-a-suspected-race }

Для отладки инициализации раскомментируйте первую инструкцию в соответствующем `Reset_Handler`, чтобы она стала `B .`:

Пути к файлам запуска ниже относятся к SF32LB55x. Для другого семейства используйте соответствующие файлы запуска.

- HCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_hcpu.S`
- LCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_lcpu.S`

Подключите J-Link и увеличьте PC на два байта, чтобы продолжить выполнение. В C та же преднамеренная остановка задается выражением `_asm("B .");`. Не заменяйте его на `while (1);`: компилятор может удалить код после цикла.

## Анализ диагностических данных { #read-the-evidence }

Дамп assert обычно содержит функцию и номер строки сработавшей проверки, таблицу потоков, состояние почтовых ящиков и очередей сообщений, мьютексов и семафоров, использование кучи и регистры CPU. Сопоставьте PC на момент сбоя с соответствующим ELF, затем проверьте запас свободного места в стеке, владение ресурсами, на которых заблокировано ожидание, содержимое очередей и последнюю запись журнала перед сбоем. Сохраните исходный дамп до подстановки имен символов.

Для интерактивного анализа Ozone может загрузить ELF для HCPU/LCPU и соответствующий SVD-файл для Cortex-M33 с FPU из `$SDK_ROOT/tools/svd_external`. Если состояние ядра не позволяет подключиться по SWD, используйте UART или `SifliUsartServer`. ULOG может работать через UART; после включения поддержки RTT выберите `segger` в качестве устройства журналирования RT-Thread, чтобы использовать Segger RTT.

## Диагностика сбоев шины и памяти { #instrument-bus-and-memory-failures }

Монитор шины SDK позволяет зафиксировать обращения, приводящие к ошибке шины (bus fault). Зарегистрируйте функцию обратного вызова с помощью `dbg_busmon_reg_callback`, а затем используйте `dbg_busmon_read` и `dbg_busmon_write` из исходного примера, чтобы проверить нужный диапазон адресов. Дополните это трассировкой кучи и пакетом аварийного дампа: одного дампа регистров без символов и контекста памяти обычно недостаточно.

![Пример стека вызовов для кучи в Trace32](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_heap_callstack.png){ loading="lazy" }
<div align="center"><em>Рисунок: пример для SF32LB52x — стек вызовов для кучи и окна памяти.</em></div>

Официальные источники по семействам: [анализ сбоев SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/crash_analysis.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/crash_analysis.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/crash_analysis.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/crash_analysis.html) и соответствующее [руководство по отладке и журналированию](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/debug_logging.html).
