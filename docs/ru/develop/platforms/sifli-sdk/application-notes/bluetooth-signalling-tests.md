---
icon: lucide/bluetooth
title: "Сигнальные испытания Bluetooth"
description: "Подключение устройств SF32 к Bluetooth-тестеру и измерение характеристик BLE или классического Bluetooth в сигнальном режиме."
tags: [Разработка, SiFli-SDK, Практические руководства, Bluetooth]
---

# Сигнальные испытания Bluetooth { #run-bluetooth-signaling-tests }

В режиме сигнальных испытаний между DUT и тестером радиосвязи устанавливается реальное Bluetooth-соединение для проверки TX/RX на соответствие протоколу. Руководство SiFli описывает как ручную работу, так и автоматизированные испытания под управлением программного обеспечения, например R&S® CMWrun, управляющего тестером CMW. Этот режим отличается от фирменных тестов без сигнализации и отдельных RF-тестов по конкретным параметрам.

!!! note "Область квалификационных испытаний"
    Для квалификации выбирайте процедуру в соответствии с типом испытания. В руководстве SiFli по RF-тестам сигнализация BT указана для QDID/проверок соответствия протоколу; RF-испытания BR/EDR BQB выполняются с сигнализацией BT, а RF-испытания BLE BQB используют SIG DTM (BLE без сигнализации). Поэтому шаги сигнального тестирования BLE на этой странице не являются процедурой RF-испытания BLE BQB.

## Подготовка к тесту { #test-setup }

Подготовьте DUT, тестер Bluetooth-связи (в руководстве SiFli используется CMW500), ПК с Windows, кабель USB-UART и RF-коаксиальный кабель. Обеспечьте доступ к `VBAT`, `GND`, а также сигналам TX/RX UART1 на DUT. Распиновка UART1 по умолчанию зависит от корпуса:

<div align="center" markdown>

<em>Таблица: Распиновка UART1 по умолчанию согласно руководству SiFli по сигнальным испытаниям Bluetooth</em>

| Устройство/корпус | UART1 TX | UART1 RX |
|---|---|---|
| SF32LB52x | PA19 | PA18 |
| SF32LB551 | PA17 | PA18 |
| SF32LB555/557 | PA34 | PA30 |
| SF32LB56xU (QFN) | PA17 | PA18 |
| SF32LB56xV (BGA) | PA34 | PA30 |
| SF32LB57x | PA19 | PA18 |
| SF32LB58x | PA32 | PA31 |

</div>

!!! warning "Расхождение в направлении сигналов UART1 для SF32LB58x"
    Руководство SiFli по сигнальным испытаниям Bluetooth и таблица отладочного порта в [руководстве по аппаратному проектированию SF32LB58x](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md) сопоставляют TX/RX UART1 микросхемы с PA32/PA31. Однако в таблице выводов [SF32LB58-DevKit-LCD](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb58x/SF32LB58-DevKit-LCD.md) PA31 указан как UART1_TXD, а PA32 — как UART1_RXD; [руководство SiFli по RF-тестам](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/rf_test_guide.html) также указывает TX=PA31/RX=PA32. Официальные источники противоречат друг другу. Перед подключением проверьте схему целевой платы и конфигурацию выводов проекта; не полагайтесь только на эту сводную таблицу.

Если в проекте используется другая распиновка, руководствуйтесь фактической конфигурацией его выводов. Для сигнальных испытаний BLE требуется последовательное соединение управления EUT с тестером. В режиме Classic BT тестер может управлять DUT по радиоканалу после перехода устройства в тестовый режим.

Главное различие — в топологии управления: при BLE путь управления UART/HCI подключается к тестеру, а при Classic BT тестер обнаруживает DUT и подключается к нему по радиоканалу. Ниже приведены схемы из руководства SiFli для SF32LB52x; для других семейств используйте таблицу выводов целевого проекта.

!!! note "Область применимости по семействам"
    В таблице UART сведены распиновки по умолчанию для нескольких семейств и корпусов. Приведённые далее схемы подключения и снимки экрана тестера взяты из руководства SiFli для SF32LB52x. Они помогают понять путь сигнала, но не являются универсальной справкой по выводам или меню для любых корпусов.

![Топология сигнальных испытаний BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>Иллюстрация: пример из руководства для SF32LB52x — при тестировании BLE компьютер переводит DUT в тестовый режим, после чего путь управления UART/HCI подключается к тестеру.</em></div>

![Топология сигнальных испытаний Classic BT](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>Иллюстрация: пример из руководства для SF32LB52x — при тестировании Classic BT тестер обнаруживает DUT и подключается к нему по RF.</em></div>

## Перевод DUT в тестовый режим { #put-the-dut-into-test-mode }

### BLE { #ble }

1. Включите DUT и не допускайте перехода в сон при работе прошивки DFU/приложения.
2. Подключите UART1 к ПК и отправьте команду FinSH `bt_cm uart_dut` из SiFli_Trace или другой программы для работы с последовательным портом.
3. Переключите отображение терминала в шестнадцатеричный режим и проверьте ответ `04 0E 04 XX 03 0C 00`.
4. Отключите ПК и подключите тот же UART1 к порту управления EUT USB-to-RS232 на тестере.

![Ответ последовательного порта при входе в режим тестирования BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>Иллюстрация: пример из руководства для SF32LB52x — прежде чем переключать UART, убедитесь, что получен ответ `04 0E 04 XX 03 0C 00`; на примере снимка экрана показано `04 0E 04 06 03 0C 00`.</em></div>

### Classic Bluetooth { #classic-bluetooth }

1. Включите DUT, оставив экран включённым, а процессор — в активном состоянии.
2. Подключите UART1 к ПК и отправьте `bt_cm dut`.
3. Убедитесь, что получен ответ `Write scan enable success`, затем подключите RF-коаксиальный кабель к тестеру. Перед переходом в другой тестовый режим перезагрузите DUT.

## Установление сигнального соединения { #establish-the-signaling-connection }

В приложении тестера `Bluetooth Signaling` включите сигнализацию. Для BLE в разделе `EUT Control` задайте `HW Interface`=`USB to RS232 adapter`, `EUT Comm Protocol`=`HCI` и `Baud Rate`=`1000000`; в General Setup выберите `Burst Type: Low Energy`. В показанном примере измерения используется `PHY=LE1M`. Пока последовательный кабель не подключен, `Virtual COM Port` отображается как `None` и недоступен. Подключите UART1 DUT к тестеру, а RF-коаксиальный кабель — ко входу RF тестера. Затем выключите и снова включите Bluetooth Signaling, чтобы тестер обнаружил последовательный порт. Запустите `Connection Check`; сообщение `LE comm test passed` должно появиться примерно через 3 секунды. Для Classic BT установите `HW Interface` в `None (EUT Control off)`, найдите адрес DUT с помощью `Inquire` и выберите `Connect Test Mode`.

![Настройки EUT Control для тестера BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>Иллюстрация: пример из руководства для SF32LB52x — настройки EUT Control, скорости в бодах и Low Energy для BLE.</em></div>

![Настройки тестера для Classic BT](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>Иллюстрация: пример из руководства для SF32LB52x — тестирование Classic BT с параметром EUT Control `None (EUT Control off)`.</em></div>

!!! note "Примеры настроек на снимках экрана тестера"
    На снимке BLE также показаны `Stop Bits=1`, `Parity=None`, последовательный `Protocol=None`, включенный `Autoreset EUT` и отключенный `Use BR/EDR Settings`. Поля примера измерения: `Operating Mode=RF Test`, `Burst Type=Low Energy`, `PHY=LE1M`, `Channel=19`, `Frequency=2440.0 MHz`, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Auto Ranging` и `Dirty Tx` отключены, `Packet Type=RE_PHY_TestRef`, `Payload Length=37 byte(s)`, `Pattern Type=PRBS9`. На снимке Classic BT показаны `Operating Mode=RF Test`, `Burst Type=Basic Rate`, интерфейсный `Test Mode=Loopback Test`, значения Rx/Tx для `Channel` 10/39 и `Frequency` 2412.0/2441.0 MHz, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Packet Type=DH5`, `Payload Length=339 byte(s)`, `Pattern Type=10101010`; Hopping, Auto Ranging, Dirty Tx и Whitening отключены. Это параметры примеров на снимках, а не универсальные настройки. Поле `Loopback Test` на снимке не меняет описанный выше этап подключения: после `Inquire` выбирается `Connect Test Mode`.

## Измерения TX { #run-tx-measurements }

Откройте `Bluetooth 1 Multi Eval.`; по умолчанию измерение выключено, поэтому нажмите `ON/OFF`. Чтобы изменить параметры, выберите справа `Input Signal`, затем внизу экрана укажите `Burst Type`. Для BLE доступны 1M/2M, для Classic BT — BR/EDR. Канал, тип пакета и длину полезной нагрузки задайте на экране Bluetooth Signaling или в меню `Input Signal`. После сигнального подключения BLE или BT используется один и тот же экран TX тестера.

## Измерение чувствительности RX { #run-rx-sensitivity-measurements }

Отключите TX, вернитесь на экран подключения кнопкой `Bluetooth Signaling` справа и откройте `Bluetooth 1 RX Meas.`. Для Classic BT выберите BER, для BLE — PER; задайте канал, тип пакета и длину полезной нагрузки, затем включите Rx Quality. Уменьшайте `Tx Level (CMW)` с шагом 0,01 или 0,1. Когда индикатор BER/PER станет красным, предыдущий уровень соответствует чувствительности приема на этом канале. Укажите, проводилось ли измерение по кабелю или в эфире, и учтите потери в кабеле.

## Регистрация и воспроизведение результатов { #record-and-reproduce }

Вместе с результатами сохраните сведения о микросхеме и корпусе, распиновке UART, ревизии SDK, идентификаторе прошивки, модели и настройках тестера, RF-подключении, канале, PHY, параметрах пакетов, уровне TX, BER/PER и ревизии платы. Официальные страницы для семейств: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
