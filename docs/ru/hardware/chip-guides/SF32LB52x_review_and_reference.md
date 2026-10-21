---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Проверка проекта, справочные документы, эталонные схемы и разводка PCB, механические чертежи, схемы питания и история изменений руководства SF32LB52x."
tags:
    - Аппаратное обеспечение
    - Чип
---

# Руководство по проектированию аппаратной части SF32LB52x — проверка проекта и справочные материалы { #sf32lb52x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Часть руководства по проектированию аппаратной части SF32LB52x"
    Эта страница содержит разделы 7–10: проверку проекта, документы и справочные материалы, приложения и историю изменений. См. также [рекомендации по разводке PCB](SF32LB52x_pcb_layout.md).

## 7. Проверка проекта { #7-design-review-checklist }

- [ ] Проверка минимальной системы завершена: задокументированы точный вариант, корпус, дерево питания, загрузочный носитель, выводы настройки загрузки, доступ для отладки и программирования, тактирование и стратегия пробуждения
- [ ] Подтверждены точная модель чипа и вариант питания; схемы питания двух вариантов не смешаны
- [ ] Напряжения на выводах питания процессора (VBUS/VBAT/VCC или PVDD/VDDIOA/VDD_SIP) находятся в пределах, указанных в даташите
- [ ] Дроссель BUCK соответствует требованиям: 4,7 uH ±20%, DCR ≤0,4 Ω, Isat ≥450 mA
- [ ] Для варианта с питанием от аккумулятора проверены цепь зарядки, диапазон напряжений компонента OVP и ёмкость на выходе встроенного LDO
- [ ] Кварцевые резонаторы 48 MHz и 32,768 kHz соответствуют рекомендованным характеристикам; соблюдены требования к разводке и запретным зонам
- [ ] Волновое сопротивление RF-трассы составляет 50 Ω, согласующая цепь размещена рядом с чипом
- [ ] Настройка загрузки из памяти, включая вариант eMMC при внешнем стабилизированном питании, соответствует состояниям выводов Bootstrap
- [ ] Проверьте вывод управления переключателем питания памяти для конкретного варианта; до выпуска устраните расхождение PA11/PA21 между официальным контрольным списком и рекомендациями по применению
- [ ] USB DP/DN разведены как дифференциальная пара с дифференциальным волновым сопротивлением 90 Ω
- [ ] Сигналы SDIO разведены вместе: общая длина ≤50 mm, разница длин внутри группы ≤6 mm; предусмотрено экранирование землёй
- [ ] Предусмотрены мультиплексируемые выводы DBG_UART/SWD и производственные тестовые точки
- [ ] Номера деталей ключевых компонентов сверены с актуальным [перечнем поставщиков, одобренных SiFli][SiFli Approved Vendor List (AVL)]

## 8. Документы и справочные материалы { #8-related-documents-and-references }

[SF32LB52x Datasheet (Official PDF)]: https://downloads.sifli.com/silicon/DS0052-SF32LB52x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V2p4.pdf?
[SF32LB52x User Manual (Official PDF)]: https://downloads.sifli.com/silicon/UM0052-SF32LB52x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p3.pdf?
[SF32LB52 Hardware Reference Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-%E7%A1%AC%E4%BB%B6%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1-20250619.zip?
[SF32LB520/3/5/7 Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md
[52B/D/E/G/J Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md
[Local SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Даташит SF32LB52x (официальный PDF)][SF32LB52x Datasheet (Official PDF)]__
- :fontawesome-solid-file-pdf: __[Руководство пользователя SF32LB52x (официальный PDF)][SF32LB52x User Manual (Official PDF)]__
- :fontawesome-solid-file-zipper: __[Пакет эталонного аппаратного проекта SF32LB52][SF32LB52 Hardware Reference Design Package]__
- :fontawesome-brands-github: __[Рекомендации по аппаратному применению SF32LB520/3/5/7 (источник)][SF32LB520/3/5/7 Hardware Application Note (Source)]__
- :fontawesome-brands-github: __[Рекомендации по аппаратному применению 52B/D/E/G/J (источник)][52B/D/E/G/J Hardware Application Note (Source)]__
- :fontawesome-solid-file-excel: __[Перечень одобренных поставщиков SiFli на сайте][Local SiFli Approved Vendor List]__
- :fontawesome-solid-file-excel: __[Чек-лист SiFli для схемы и PCB SF32LB52 (XLSX)][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]__
- :fontawesome-brands-wikipedia-w: __[Указатель руководств SiFli по аппаратному проектированию (Wiki)][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Дополнительные источники:

- [Краткое описание SF32LB52x](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf)
- [Даташит SF32LB52x](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf)
- [Справочное руководство SF32LB52x](https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf)
- [Рекомендации по аппаратному применению SF32LB520/3/5/7](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md)
- [Рекомендации по аппаратному применению 52B/D/E/G/J](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md)

[Чек-лист схемы](SF32LB52x_schematic_checklist.md) (раздел 5.8) и [чек-лист разводки PCB](SF32LB52x_pcb_layout_checklist.md) (раздел 6.15) по пунктам воспроизводят один и тот же *Чек-лист схемы и PCB SF32LB52* (V1.0, 2026-01-21). Они размещены рядом с рекомендациями по схемотехнике и разводке, которые помогают выполнить проверку.

## 9. Приложения { #9-appendices }

В исходных рекомендациях SiFli приведены следующие эталонные схемы, примеры разводки PCB, механические чертежи и схемы питания. Приложения сохраняют эти иллюстрации для проверки проекта; основные рекомендации по проектированию остаются в разделах 5 и 6.

!!! note "Как пользоваться иллюстрациями"
    Рассматривайте иллюстрации как эталонные схемы и примеры разводки из исходных рекомендаций. Окончательную реализацию для выбранного устройства и изделия проверяйте по правилам, таблицам, даташиту, справочному руководству, актуальному пакету эталонного проекта и AVL.

<div align="center"><em>Таблица 9-1: Содержание приложений</em></div>

<div align="center" markdown>

| Задача | Где искать |
|:---|:---|
| Примеры структурных схем умных часов для двух групп SF32LB52x | Приложение A: типовое применение в умных часах |
| Примеры схем RF, памяти/загрузки, кнопок, двигателя, аудио, тактирования, USB и DC/DC | Приложение B: эталонные схемы |
| Примеры размещения и разводки RF, памяти, аудио, стека слоёв, вывода трасс из корпуса, тактовых цепей, USB и DC/DC | Приложение C: эталонная разводка PCB |
| Чертежи габаритов, формы корпуса и посадочного места | Приложение D: механические чертежи |
| Эталонные схемы и разводка зарядки, OVP, дерева питания и PMU | Приложение E: питание |

</div>

### 9.1. Приложение A. Типовое применение в умных часах { #appendix-a-a-typical-smart-watch-application }

Типовой проект умных часов на SF32LB52x включает MCU, дисплей, контроллер сенсорного ввода, память, датчики, вибромотор, аудиовход/выход, антенну Bluetooth, источники тактирования, управление питанием, интерфейсы отладки и производственного тестирования. Вариант с питанием от аккумулятора также включает управление зарядкой.
На рисунках 9.1-1 и 9.1-2 показаны дисплей QSPI, акселерометр/гироскоп с интерфейсом SPI, модуль измерения пульса по I2C, аналоговый микрофон и тракт DAC-усилитель, вибромотор с управлением PWM, тактирование 48 MHz, RF-тракт Bluetooth и доступ SWD/UART. QSPI NAND, SD NAND и NOR Flash приведены как примеры памяти, а не полный перечень загрузочных носителей. На обеих схемах показаны внешнее зарядное устройство и цепь Buck/LDO. Реальную архитектуру питания выбирайте по разделу 5.2: структурная схема не требует обязательного применения именно такой цепи.


![Рисунок 9.1-1: Структурная схема умных часов (SF32LB520/3/5/7)](../../sf32-products/chips/assets/52xA/sf32lb52x-A-watch-app-diagram-52x.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.1-1: Структурная схема умных часов (SF32LB520/3/5/7)</em></div>

![Рисунок 9.1-2: Структурная схема умных часов (52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-watch-app-diagram-52X.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.1-2: Структурная схема умных часов (52B/D/E/G/J)</em></div>

### 9.2. Приложение B. Эталонные схемы { #appendix-b-reference-schematics }

**RF**

![Рисунок 9.2-1: Структурная схема RF-тракта](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-1: Структурная схема RF-тракта</em></div>

![Рисунок 9.2-2: Эталонная схема RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-2: Эталонная схема RF</em></div>

![Рисунок 9.2-3: Схема соединений RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-3: Схема соединений RF</em></div>

**Память и загрузка**

![Рисунок 9.2-4: Настройка выводов Bootstrap (SF32LB520/3/5/7)](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-4: Настройка выводов Bootstrap (SF32LB520/3/5/7)</em></div>

![Рисунок 9.2-5: Настройка выводов Bootstrap (52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-5: Настройка выводов Bootstrap (52B/D/E/G/J)</em></div>

![Рисунок 9.2-6: Эталонная схема SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-6: Эталонная схема SDIO</em></div>

**Кнопки, двигатель и аудио**

![Рисунок 9.2-7: Эталонная схема вибромотора (SF32LB520/3/5/7)](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-7: Эталонная схема вибромотора (SF32LB520/3/5/7)</em></div>

![Рисунок 9.2-8: Эталонная схема вибромотора (52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-8: Эталонная схема вибромотора (52B/D/E/G/J)</em></div>

![Рисунок 9.2-9: Эталонная схема кнопки питания](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-9: Эталонная схема кнопки питания</em></div>

![Рисунок 9.2-10: Эталонная схема поворотного энкодера](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-10: Эталонная схема поворотного энкодера</em></div>

![Рисунок 9.2-11: Эталонная схема аналогового микрофона MEMS](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-11: Эталонная схема аналогового микрофона MEMS</em></div>

![Рисунок 9.2-12: Эталонная схема аналогового микрофона ECM](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-12: Эталонная схема аналогового микрофона ECM</em></div>

![Рисунок 9.2-13: Эталонная схема подключения аналогового DAC к PA](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-13: Эталонная схема подключения аналогового DAC к PA</em></div>

![Рисунок 9.2-14: Эталонная схема питания аудиотракта](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-14: Эталонная схема питания аудиотракта</em></div>

![Рисунок 9.2-15: Эталонная схема аудио-ADC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-15: Эталонная схема аудио-ADC</em></div>

![Рисунок 9.2-16: Эталонная схема аудио-DAC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-16: Эталонная схема аудио-DAC</em></div>

**Тактирование**

![Рисунок 9.2-17: Схема кварцевого резонатора 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-17: Схема кварцевого резонатора 48 MHz</em></div>

![Рисунок 9.2-18: Схема кварцевого резонатора 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-18: Схема кварцевого резонатора 32,768 kHz</em></div>

**USB**

![Рисунок 9.2-19: Эталонная схема USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-19: Эталонная схема USB</em></div>

**DC/DC**

![Рисунок 9.2-20: Эталонная схема DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.2-20: Эталонная схема DC/DC</em></div>

### 9.3. Приложение C. Эталонная разводка PCB { #appendix-c-reference-pcb-layouts }

**RF**

![Рисунок 9.3-1: Эталонная разводка согласующей цепи RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-1: Эталонная разводка согласующей цепи RF</em></div>

![Рисунок 9.3-2: Эталонная разводка RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-2: Эталонная разводка RF</em></div>

**Память**

![Рисунок 9.3-3: Эталонная разводка SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-3: Эталонная разводка SDIO</em></div>

**Аудио**

![Рисунок 9.3-4: Эталонная разводка питания аудиотракта](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-4: Эталонная разводка питания аудиотракта</em></div>

![Рисунок 9.3-5: Эталонная разводка аудио-ADC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-5: Эталонная разводка аудио-ADC</em></div>

![Рисунок 9.3-6: Эталонная разводка аудио-DAC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-6: Эталонная разводка аудио-DAC</em></div>

**Основы PCB**

![Рисунок 9.3-7: Эталонный стек слоёв PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-7: Эталонный стек слоёв PCB</em></div>

![Рисунок 9.3-8: Эталонные правила проектирования PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-8: Эталонные правила проектирования PCB</em></div>

![Рисунок 9.3-9: Эталонный вывод трасс из корпуса QFN](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-9: Эталонный вывод трасс из корпуса QFN</em></div>

![Рисунок 9.3-10: Эталонное размещение кварцевых резонаторов](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-10: Эталонное размещение кварцевых резонаторов</em></div>

**Разводка тактовых сигналов**

![Рисунок 9.3-11: Модель разводки резонатора 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-11: Модель разводки резонатора 48 MHz</em></div>

![Рисунок 9.3-12: Эталонная разводка резонатора 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-12: Эталонная разводка резонатора 48 MHz</em></div>

![Рисунок 9.3-13: Модель разводки резонатора 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-13: Модель разводки резонатора 32,768 kHz</em></div>

![Рисунок 9.3-14: Эталонная разводка резонатора 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-14: Эталонная разводка резонатора 32,768 kHz</em></div>

**USB**

![Рисунок 9.3-15: Эталонная разводка USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-15: Эталонная разводка USB</em></div>

![Рисунок 9.3-16: Эталонное размещение компонентов USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-16: Эталонное размещение компонентов USB</em></div>

![Рисунок 9.3-17: Эталонная трассировка USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-17: Эталонная трассировка USB</em></div>

**DC/DC**

![Рисунок 9.3-18: Эталонная разводка DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.3-18: Эталонная разводка DC/DC</em></div>

### 9.4. Приложение D. Механические чертежи { #appendix-d-mechanical }

![Рисунок 9.4-1: Чертёж корпуса SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.4-1: Чертёж корпуса SF32LB520/3/5/7</em></div>

![Рисунок 9.4-2: Чертёж корпуса 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.4-2: Чертёж корпуса 52B/D/E/G/J</em></div>

![Рисунок 9.4-3: Габариты корпуса QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.4-3: Габариты корпуса QFN68L</em></div>

![Рисунок 9.4-4: Форма корпуса QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.4-4: Форма корпуса QFN68L</em></div>

![Рисунок 9.4-5: Рекомендованное посадочное место QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.4-5: Рекомендованное посадочное место QFN68L</em></div>

### 9.5. Приложение E. Питание { #appendix-e-power }

**SF32LB520/3/5/7 (питание от аккумулятора)**

Ниже показаны внешние схемы зарядки с управлением трактом питания (PPM) и без него, а затем — схема встроенного зарядного устройства.

![Рисунок 9.5-1: Внешняя схема зарядки без PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-1: Внешняя схема зарядки без управления трактом питания (PPM)</em></div>

![Рисунок 9.5-2: Внешняя схема зарядки с PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-2: Внешняя схема зарядки с управлением трактом питания (PPM)</em></div>

![Рисунок 9.5-3: Схема встроенного зарядного устройства](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-3: Схема встроенного зарядного устройства</em></div>

![Рисунок 9.5-4: Настройка порога OVP](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-4: Настройка порога OVP</em></div>

![Рисунок 9.5-5: Применение OVP с регулируемым OVLO](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-5: Применение OVP с регулируемым OVLO</em></div>

![Рисунок 9.5-6: Применение OVP со стабилизированным выходом](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-6: Применение OVP со стабилизированным выходом</em></div>

![Рисунок 9.5-7: Структура питания (SF32LB520/3/5/7)](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-7: Структура питания (SF32LB520/3/5/7)</em></div>

![Рисунок 9.5-8: Эталонная схема VCC](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-8: Эталонная схема VCC</em></div>

![Рисунок 9.5-9: Эталонная разводка VCC](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-9: Эталонная разводка VCC</em></div>

![Рисунок 9.5-10: Эталонная схема зарядки](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-10: Эталонная схема зарядки</em></div>

![Рисунок 9.5-11: Эталонная разводка зарядки](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-11: Эталонная разводка зарядки</em></div>

![Рисунок 9.5-12: Эталонное подключение TVS для PMU](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-12: Эталонное подключение TVS для PMU</em></div>

![Рисунок 9.5-13: Эталонная защита PMU от EOS](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-13: Эталонная защита PMU от EOS</em></div>

**52B/D/E/G/J (внешнее стабилизированное питание)**

![Рисунок 9.5-14: Эталонная разводка PMU (52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ loading="lazy" }

<div align="center"><em>Рисунок 9.5-14: Эталонная разводка PMU (52B/D/E/G/J)</em></div>

## 10. История изменений { #10-revision-history }

<div align="center"><em>Таблица 10-1: История изменений</em></div>

<div align="center" markdown>

| Версия | Дата | Изменение |
|:---|:---|:---|
| 1.1 | 2026-07 | Система питания выделена в самостоятельный раздел схемотехники; тактирование и RF разделены, последующие разделы перенумерованы. |
| 1.0 | Этот документ | Две официальные рекомендации объединены в одно руководство; содержание для вариантов с питанием от аккумулятора и внешним стабилизированным питанием разделено вкладками. |
| 0.0.1 | 10/2024 | Исходная публикация `SF32LB520-3-5-7-HW-Application` |
| 0.0.1 | 10/2024 | Исходная публикация `SF32LB52B-E-G-J-HW-Application` |

</div>

### 10.1. История изменений чек-листа { #101-checklist-revision-history }

[Чек-лист схемы](SF32LB52x_schematic_checklist.md) и [чек-лист разводки PCB](SF32LB52x_pcb_layout_checklist.md) имеют собственные версии, независимые от руководства; они соответствуют исходной таблице SiFli *Чек-лист схемы и PCB SF32LB52*.

<div align="center"><em>Таблица 10.1-1: История изменений чек-листа</em></div>

<div align="center" markdown>

| Версия | Дата | Изменение |
|:---|:---|:---|
| 1.0 | 2026-01-21 | Первая версия на основе *Чек-листа схемы и PCB SF32LB52* V1.0 от SiFli |

</div>

[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
