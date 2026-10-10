---
icon: lucide/plug
description: "Проект назначений контактов M2 и M2xM; непроверенные сводки M2xN и M2xA и примечания о совмещении сигналов."
tags:
  - Аппаратная часть
  - Модуль
  - Интерфейс
---

# Определение интерфейса M2 { #m2-interface-definition }

!!! warning "Проект определения интерфейса"
    На этой странице зафиксирован проект интерфейса M2. Локальная рабочая книга предложения содержит листы M2 и M2xM, но в ней упомянут отдельный файл `M2E接口定义_0714.xlsx`, которого нет; подтвердить версию и статус утверждения предложения не удалось. Первичный источник SiFli, подтверждающий назначения или число контактов, не найден. В книге нет листов M2xN и M2xA, поэтому приведённые ниже сводки для них не проверены. Это не опубликованный стандарт интерфейса μForge.io. Считайте все назначения предварительными и до запуска в производство проверьте выбранный модуль, плату-носитель, разъём, электрические ограничения и мультиплексирование выводов.

## Область применения { #scope }

В листах M2 и M2xM локальной рабочей книги пронумерованы позиции с 1 по 75, но позиции 24–31 пропущены в схеме контактов. Поэтому на каждом листе указано 67 пронумерованных контактов. Оба листа обозначают схему как относящуюся к разъёму M.2 Key-E. В листе M2xM также указано, что тот же модуль должен включать базовый интерфейс M2. Эти обозначения в проекте не подтверждают соответствие [спецификации M.2 PCI-SIG](https://pcisig.com/specification-overview/pci-express-m2) или взаимозаменяемость модуля и платы-носителя. По ним также нельзя определить количество и расположение физических разъёмов. На этой странице приведены сводки M2xN и M2xA, но исходные схемы контактов для этих профилей не найдены.

- **M2** — подключение дисплея, аудио, накопителей, отладки и общего ввода-вывода встраиваемых систем.
- **M2xM** — проект мультимедийного назначения контактов для дисплея, камеры и PDM. В сводном описании также упоминается I2S/PCM, но на доступном листе M2xM эти сигналы не назначены.
- **M2xN** — сетевые сигналы, USB, CAN и UART.
- **M2xA** — управление двигателями, сбор аналоговых данных, сигналы энкодера и таймера.

В текущем проекте обозначения `M2xH` и `M2xP` зарезервированы; контакты для них не назначены.

!!! info "Связь схем с разъёмами не определена"
    В локальной рабочей книге указано, что модуль M2xM должен также включать базовый интерфейс M2. При этом не уточняется, используют ли карты отдельные физические разъёмы или общий разъём, поэтому определить их количество и расположение нельзя. В книге нет схем контактов M2xN и M2xA.

## Правила разъёма { #connector-convention }

На листе M2 локальной рабочей книги нечётные контакты показаны сверху, а чётные — снизу, если смотреть со стороны края платы. Позиции 24–31 пропущены в схеме контактов и обозначены в проекте как предполагаемая зона выреза под ключ. Сам чертёж не подтверждает механическое соответствие спецификации M.2 E-key.

<div align="center"><em>Таблица: разъём M2 и его расширения</em></div>

<div align="center" markdown>

| Параметр | Определение |
| --- | --- |
| Формат разъёма | Предлагаемая схема контактов на краю платы с нумерацией 1–75; указано 67 контактов. Соответствие M.2 E-key не проверено |
| Позиции, пропущенные в проекте | 24–31 (обозначены как предполагаемая зона выреза под ключ) |
| Базовое назначение | M2 |
| Мультимедийное назначение | M2xM |
| Содержание расширения в этом проекте | Схема контактов M2xM; только непроверенные сводки M2xN и M2xA |
| Пример обозначения | `M2 + M2xM` |

</div>

## Базовый профиль M2 { #m2-base-profile }

M2 — базовый профиль для компактных подключённых устройств. Назначение контактов предусматривает дисплей QSPI и ёмкостную сенсорную панель, Wi-Fi SDIO, 1-битный SDIO для карты TF, аналоговое аудио, отладку, USB, CAN и общие шины. Несколько контактов мультиплексированы, чтобы модуль мог выбирать функции под свою SoC и конфигурацию изделия.

<div align="center"><em>Таблица: функциональное назначение M2</em></div>

<div align="center" markdown>

| Функция | Назначенные сигналы | Назначение в проекте |
| --- | --- | --- |
| Питание | `USB_VIN`, `VBAT/VBATS`, `3.3V`, `CHG_INT` и GND | Обозначения на схеме предложения; требования к напряжению, току и последовательности включения здесь не указаны. |
| Дисплей QSPI | `LCDC1_SPI_CS`, `CLK`, `DIO0–DIO3`, `CS2`, `TE`, `RSTB`, `LCD_BL_PWM` | Дисплей QSPI, подсветка и необязательный второй сигнал выбора кристалла. |
| Ёмкостная сенсорная панель | `CTP_I2C1_SDA`, `CTP_I2C1_SCL`, `CTP_INT`, `CTP_REST` | Управление сенсорной панелью и прерывание. |
| Wi-Fi | `WiFi_SD2_CLK`, `CMD`, `D0–D3`, `PDN`, `INT`, `WAKE` | 4-битный SDIO для внешнего устройства Wi-Fi. |
| Карта TF | `TF_SD1_CMD`, `CLK`, `D0`, `TF_DET` | 1-битный интерфейс карты TF и обнаружение карты. |
| Аналоговое аудио | `ADC_1P/N`, `ADC_2P/N`, `MIC_BIAS`, `DAC_1P/N`, `DAC_2P/N`, `AU_PA_EN` | Две пары аналоговых входов, питание микрофона, две пары DAC и разрешение работы усилителя мощности. |
| Отладка и восстановление | `DBG_UART1_TXD/RXD`, `SWDIO`, `SWCLK`, `SWD_SW`, `BOOT_MODE` | Отладочный UART, SWD и выбор режима загрузки/восстановления. |
| Общие последовательные шины | SPI1/SPI2, I2C2–I2C4, UART2/UART3 и общие линии GPIO/шины (`G0–G17`/`BUS0–BUS17`) | Шины изделия, выбираемые мультиплексором выводов модуля; I2C1 выделен контроллеру сенсорной панели. Часть позиций SPI2/I2C3/I2C4/UART3 может также передавать сигналы цифровых микрофонов `PDM1`/`PDM2`. |
| Прочее управление | `CAN_TX/RX`, сигналы USB/USB host, `PWR_KEY` | Промышленная шина, выбор роли USB и вход кнопки питания. |

</div>

## Цветовая схема распиновки M2 { #color-coded-m2-pinout-guide }

<div align="center"><em>Рисунок: цветовая легенда групп сигналов M2</em></div>

<div class="m2-visual-guide" role="img" aria-label="Цветовая легенда таблицы контактов M2 на двух сторонах платы">
<div class="m2-category-band">
<div class="m2-category m2-audio">Аудио</div>
<div class="m2-category m2-display">Дисплей</div>
<div class="m2-category m2-touch">Сенсорная панель</div>
<div class="m2-category m2-wireless">Wi-Fi / SDIO</div>
<div class="m2-category m2-bus">SPI / I²C / UART</div>
<div class="m2-category m2-power">USB / Питание</div>
<div class="m2-category m2-debug">Выделенные</div>
</div>
</div>

Цветная полоса служит легендой таблицы. Таблица контактов обеих сторон показывает распиновку этого проекта M2, включая альтернативные функции и мультиплексирование; это не опубликованная спецификация интерфейса.

### Назначение контактов M2 { #m2-contact-assignment }

В таблице отдельно показаны контакты нижней и верхней сторон и столбец CN1. Дополнительные мультиплексированные функции, назначенные в книге, указаны в столбце `Alt` (альтернативная функция). Цвет каждой ячейки функции соответствует категории в легенде выше.

<div align="center"><em>Таблица: назначение контактов базового профиля M2</em></div>

<div align="center" markdown class="m2-grid-scroll" style="max-width: 100%; overflow-x: auto;" tabindex="0">
<table class="m2-grid" markdown="0">
<thead>
<tr><th>Альтернатива</th><th>Функция</th><th>Нижний&nbsp;контакт</th><th>CN1</th><th>Верхний&nbsp;контакт</th><th>Функция</th><th>Альтернатива</th></tr>
</thead>
<tbody>
<tr><td class="m2-alt m2-wireless">SDIO2_D2 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D2</td><td class="m2-pin">74</td><td class="m2-cn1"></td><td class="m2-pin">75</td><td class="m2-fn m2-wireless">TF_DET</td><td class="m2-alt m2-wireless">SDIO1_D1 / SPI1_MOSI / UART2_RXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D3 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D3</td><td class="m2-pin">72</td><td class="m2-cn1"></td><td class="m2-pin">73</td><td class="m2-fn m2-wireless">TF_SD1_D0</td><td class="m2-alt m2-wireless">SDIO1_D0 / SPI1_MISO / UART2_TXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CMD / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CMD</td><td class="m2-pin">70</td><td class="m2-cn1"></td><td class="m2-pin">71</td><td class="m2-fn m2-wireless">TF_SD1_CLK</td><td class="m2-alt m2-wireless">SDIO1_CLK / SPI1_SCK / UART2_CTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CLK / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CLK</td><td class="m2-pin">68</td><td class="m2-cn1"></td><td class="m2-pin">69</td><td class="m2-fn m2-wireless">TF_SD1_CMD</td><td class="m2-alt m2-wireless">SDIO1_CMD / SPI1_CS# / UART2_RTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D0 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D0</td><td class="m2-pin">66</td><td class="m2-cn1"></td><td class="m2-pin">67</td><td class="m2-fn m2-wireless">WiFi_WAKE</td><td class="m2-alt m2-wireless">SDIO1_D3 / CAN_RX</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D1 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D1</td><td class="m2-pin">64</td><td class="m2-cn1"></td><td class="m2-pin">65</td><td class="m2-fn m2-wireless">WiFi_INT</td><td class="m2-alt m2-wireless">SDIO1_D2 / CAN_TX</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">62</td><td class="m2-cn1"></td><td class="m2-pin">63</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">GPADC</td><td class="m2-fn m2-debug">PWR_KEY</td><td class="m2-pin">60</td><td class="m2-cn1"></td><td class="m2-pin">61</td><td class="m2-fn m2-power">USBHOST_D−</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_DATA / I2C3_SDA / UART2_RXD / G0/BUS0</td><td class="m2-fn m2-bus">SPI2_MISO</td><td class="m2-pin">58</td><td class="m2-cn1"></td><td class="m2-pin">59</td><td class="m2-fn m2-power">USBHOST_D+</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_CLK / I2C3_SCL / UART2_TXD / G1/BUS1</td><td class="m2-fn m2-bus">SPI2_MOSI</td><td class="m2-pin">56</td><td class="m2-cn1"></td><td class="m2-pin">57</td><td class="m2-fn m2-power">USB_OTG</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM2_DATA / I2C4_SDA / UART3_RXD / UART2_CTS / G2/BUS2</td><td class="m2-fn m2-bus">SPI2_SCK</td><td class="m2-pin">54</td><td class="m2-cn1"></td><td class="m2-pin">55</td><td class="m2-fn m2-touch">CTP_I2C1_SDA</td><td class="m2-alt m2-bus">G5/BUS5</td></tr>
<tr><td class="m2-alt m2-bus">PDM2_CLK / I2C4_SCL / UART3_TXD / UART2_RTS / G3/BUS3</td><td class="m2-fn m2-bus">SPI2_CS#</td><td class="m2-pin">52</td><td class="m2-cn1"></td><td class="m2-pin">53</td><td class="m2-fn m2-touch">CTP_I2C1_SCL</td><td class="m2-alt m2-bus">G6/BUS6</td></tr>
<tr><td class="m2-alt m2-bus">G4/BUS4</td><td class="m2-fn m2-power">CHG_INT</td><td class="m2-pin">50</td><td class="m2-cn1"></td><td class="m2-pin">51</td><td class="m2-fn m2-touch">CTP_INT</td><td class="m2-alt m2-debug">G7/BUS7 / SWDIO</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">USB_VIN</td><td class="m2-pin">48</td><td class="m2-cn1"></td><td class="m2-pin">49</td><td class="m2-fn m2-touch">CTP_REST</td><td class="m2-alt m2-debug">G8/BUS8 / SWCLK</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">46</td><td class="m2-cn1"></td><td class="m2-pin">47</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">3.3V</td><td class="m2-pin">44</td><td class="m2-cn1"></td><td class="m2-pin">45</td><td class="m2-fn m2-power">VBAT/VBATS</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">G9/BUS9</td><td class="m2-fn m2-power">USB_DET</td><td class="m2-pin">42</td><td class="m2-cn1"></td><td class="m2-pin">43</td><td class="m2-fn m2-debug">DBG_UART1_TXD</td><td class="m2-alt m2-debug">SWDIO</td></tr>
<tr><td class="m2-alt m2-bus">G10/BUS10</td><td class="m2-fn m2-wireless">WiFi_PDN</td><td class="m2-pin">40</td><td class="m2-cn1"></td><td class="m2-pin">41</td><td class="m2-fn m2-debug">DBG_UART1_RXD</td><td class="m2-alt m2-debug">SWCLK</td></tr>
<tr><td class="m2-alt m2-bus">UART3_RXD</td><td class="m2-fn m2-bus">G11/BUS11</td><td class="m2-pin">38</td><td class="m2-cn1"></td><td class="m2-pin">39</td><td class="m2-fn m2-bus">G14/BUS14</td><td class="m2-alt m2-bus">UART2_RXD</td></tr>
<tr><td class="m2-alt m2-bus">UART3_TXD</td><td class="m2-fn m2-bus">G12/BUS12</td><td class="m2-pin">36</td><td class="m2-cn1"></td><td class="m2-pin">37</td><td class="m2-fn m2-bus">G15/BUS15</td><td class="m2-alt m2-bus">UART2_TXD</td></tr>
<tr><td class="m2-alt m2-bus">I2C2_SCL</td><td class="m2-fn m2-bus">G13/BUS13</td><td class="m2-pin">34</td><td class="m2-cn1"></td><td class="m2-pin">35</td><td class="m2-fn m2-bus">G16/BUS16</td><td class="m2-alt m2-bus">I2C2_SDA</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">32</td><td class="m2-cn1"></td><td class="m2-pin">33</td><td class="m2-fn m2-audio">AU_PA_EN</td><td class="m2-alt m2-bus">G17/BUS17</td></tr>
<tr><td class="m2-blank"></td><td class="m2-notch" colspan="2">Позиции 24–31 пропущены (предполагаемая зона выреза под ключ)</td><td class="m2-cn1"></td><td class="m2-notch" colspan="2">Позиции 24–31 пропущены (предполагаемая зона выреза под ключ)</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1N</td><td class="m2-pin">22</td><td class="m2-cn1"></td><td class="m2-pin">23</td><td class="m2-fn m2-audio">DAC_2N</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1P</td><td class="m2-pin">20</td><td class="m2-cn1"></td><td class="m2-pin">21</td><td class="m2-fn m2-audio">DAC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_2N</td><td class="m2-pin">18</td><td class="m2-cn1"></td><td class="m2-pin">19</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">MIC_BIAS</td><td class="m2-pin">16</td><td class="m2-cn1"></td><td class="m2-pin">17</td><td class="m2-fn m2-audio">ADC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_1N</td><td class="m2-pin">14</td><td class="m2-cn1"></td><td class="m2-pin">15</td><td class="m2-fn m2-audio">ADC_1P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS2</td><td class="m2-pin">12</td><td class="m2-cn1"></td><td class="m2-pin">13</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO2</td><td class="m2-pin">10</td><td class="m2-cn1"></td><td class="m2-pin">11</td><td class="m2-fn m2-display">LCDC1_SPI_DIO3</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO0</td><td class="m2-pin">8</td><td class="m2-cn1"></td><td class="m2-pin">9</td><td class="m2-fn m2-display">LCDC1_SPI_DIO1</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS</td><td class="m2-pin">6</td><td class="m2-cn1"></td><td class="m2-pin">7</td><td class="m2-fn m2-display">LCDC1_SPI_CLK</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCD_BL_PWM</td><td class="m2-pin">4</td><td class="m2-cn1"></td><td class="m2-pin">5</td><td class="m2-fn m2-display">LCDC1_SPI_TE</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-debug">SWD_SW</td><td class="m2-pin">2</td><td class="m2-cn1"></td><td class="m2-pin">3</td><td class="m2-fn m2-display">LCDC1_SPI_RSTB</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-blank">—</td><td class="m2-pin">—</td><td class="m2-cn1"></td><td class="m2-pin">1</td><td class="m2-fn m2-debug">BOOT_MODE</td><td class="m2-blank"></td></tr>
</tbody>
</table>
</div>

### Описание выводов M2 { #m2-pin-descriptions }

Группы и цвета соответствуют таблице контактов выше. В книге направления ввода-вывода не определены, поэтому этот столбец содержит предварительные рекомендации по интеграции с точки зрения модуля: I означает вход, O — выход, I/O — двунаправленный сигнал. Направления, разделённые запятыми, соответствуют порядку сигналов. Для SPI и PDM предполагается, что модуль формирует тактовый сигнал; для SWD — что подключён внешний отладчик. Каждое направление и электрическое требование необходимо проверить по документации выбранного модуля и SoC.

Для I2C обозначение I/O описывает двунаправленные линии SDA/SCL, а не гарантирует все режимы контроллера/целевого устройства или поддержку растягивания тактового сигнала. Проверьте конфигурацию выводов и подтягивающие резисторы конкретного модуля; см. [спецификацию I2C компании NXP](https://www.nxp.com/docs/en/user-guide/UM10204.pdf). Предположение о выходе тактового сигнала и входе данных PDM соответствует соединению микрофона с хостом в [рекомендациях ST по PDM](https://www.st.com/resource/en/application_note/an5027-interfacing-pdm-digital-microphones-using-stm32-mcus-and-mpus-stmicroelectronics.pdf), но не подтверждает поддержку этой функции конкретным модулем.

<div align="center"><em>Таблица: сигналы M2 и предварительные направления</em></div>

<div align="center" markdown>

| Группа сигналов | Сигнал | I/O | Описание |
| --- | --- | :---: | --- |
| <span class="m2-chip m2-power">Питание</span> | `VBAT/VBATS` | I | Вход питания от аккумулятора. |
| <span class="m2-chip m2-power">Питание</span> | `3.3V` | I | Линия питания 3,3 V. |
| <span class="m2-chip m2-power">Питание</span> | `CHG_INT` | O | Выход прерывания/состояния зарядного устройства. |
| <span class="m2-chip m2-power">Питание</span> | `USB_VIN` | I | Вход USB/линия питания цепи зарядки. |
| <span class="m2-chip m2-power">Питание</span> | `USB_DET` | I | Сигнал обнаружения USB. |
| <span class="m2-chip m2-power">Питание</span> | `USBHOST_D+`, `USBHOST_D−` | I/O | Пара данных USB в режиме хоста, отдельная от основного порта USB. |
| <span class="m2-chip m2-power">Питание</span> | `USB_OTG` | I/O | Обозначение из книги предложения; на листе указано «не поддерживается на текущей платформе». Не делайте вывод о поддержке по названию контакта. |
| <span class="m2-chip m2-display">Дисплей</span> | `LCDC1_SPI_CS`, `LCDC1_SPI_CS2` | O | Основной и необязательный второй сигналы выбора кристалла для дисплея QSPI. |
| <span class="m2-chip m2-display">Дисплей</span> | `LCDC1_SPI_CLK` | O | Тактовый сигнал дисплея QSPI. |
| <span class="m2-chip m2-display">Дисплей</span> | `LCDC1_SPI_DIO0`–`DIO3` | I/O | Линии данных дисплея QSPI. |
| <span class="m2-chip m2-display">Дисплей</span> | `LCDC1_SPI_TE` | I | Вход синхронизации Tearing Effect (TE) от панели. |
| <span class="m2-chip m2-display">Дисплей</span> | `LCDC1_SPI_RSTB` | O | Сброс дисплея, активный низкий уровень. |
| <span class="m2-chip m2-display">Дисплей</span> | `LCD_BL_PWM` | O | Управление подсветкой с помощью PWM. |
| <span class="m2-chip m2-touch">Сенсорная панель</span> | `CTP_I2C1_SDA`, `CTP_I2C1_SCL` | I/O | Шина I²C контроллера ёмкостной сенсорной панели. |
| <span class="m2-chip m2-touch">Сенсорная панель</span> | `CTP_INT` | I | Прерывание контроллера сенсорной панели. |
| <span class="m2-chip m2-touch">Сенсорная панель</span> | `CTP_REST` | O | Сброс контроллера сенсорной панели. В книге сохранено обозначение `CTP_REST`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_CLK`, `WiFi_SD2_CMD` | O, I/O | Тактовый сигнал и команда SDIO внешнего устройства Wi-Fi. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_D0`, `WiFi_SD2_D1`, `WiFi_SD2_D2`, `WiFi_SD2_D3` | I/O | 4-битные линии данных SDIO внешнего устройства Wi-Fi. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_PDN` | O | Управление отключением модуля Wi-Fi. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_INT` | I | Прерывание Wi-Fi. Совмещено на контакте 65 с `SDIO1_D2`/`CAN_TX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_WAKE` | I/O | Сигнал пробуждения Wi-Fi. Совмещён на контакте 67 с `SDIO1_D3`/`CAN_RX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_SD1_CMD`, `TF_SD1_CLK`, `TF_SD1_D0` | I/O, O, I/O | Команда, тактовый сигнал и данные 1-битного SDIO карты TF. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_DET` | I | Обнаружение карты TF. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `SDIO1_D0–D3`, `SDIO2_D0–D3` | I/O | Общие обозначения контроллеров для тех же физических линий, что используются шинами карты TF (SDIO1) и внешнего устройства Wi-Fi (SDIO2). Используйте приведённые выше обозначения по назначению, если модулю не требуется полноценный 4-битный SDIO на обеих шинах. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `CAN_TX`, `CAN_RX` | O, I | Интерфейс CAN-трансивера с логическими уровнями, совмещённый на контактах 65 и 67 с `WiFi_INT`/`WiFi_WAKE`. Плате-носителю по-прежнему нужны CAN-трансивер и защита, соответствующая шине изделия. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `GPADC` | I | В этой схеме контакты Wi-Fi SDIO 74, 72, 70, 68, 66 и 64, а также контакт 60 для `PWR_KEY` имеют альтернативные функции ADC. |
| <span class="m2-chip m2-audio">Аудио</span> | `ADC_1P/N`, `ADC_2P/N` | I | Две пары дифференциальных входов для аналоговых микрофонов. |
| <span class="m2-chip m2-audio">Аудио</span> | `MIC_BIAS` | O | Напряжение смещения для микрофона. |
| <span class="m2-chip m2-audio">Аудио</span> | `DAC_1P/N`, `DAC_2P/N` | O | Две пары дифференциальных аудиовыходов. |
| <span class="m2-chip m2-audio">Аудио</span> | `AU_PA_EN` | O | Разрешение работы усилителя мощности аудио. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI1_CS#`, `SPI1_SCK`, `SPI1_MOSI`, `SPI1_MISO` | O, O, O, I | SPI1, мультиплексированный с линиями карты TF. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI2_CS#`, `SPI2_SCK`, `SPI2_MOSI`, `SPI2_MISO` | O, O, O, I | SPI2, мультиплексированный с I2C3 и UART2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C2_SDA`, `I2C2_SCL` | I/O | I2C2 использует контакт 35 для SDA и контакт 34 для SCL. Ранее описанное совмещение с `MPI/SD` этой схемой контактов не подтверждается. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C3_SDA`, `I2C3_SCL` | I/O | I2C3, мультиплексированный с SPI2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C4_SDA`, `I2C4_SCL` | I/O | I2C4, мультиплексированный с SPI2 и UART3. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART2_TXD/RXD`, `UART2_CTS/RTS` | O/I, I/O | UART2 имеет альтернативные позиции в группах карты TF и SPI2, а также на контактах 39/37. Ранее описанное совмещение с `MPI/SD` не подтверждено; проверьте фактический выбор мультиплексора модуля. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART3_TXD/RXD` | O/I | UART3 имеет альтернативные позиции в группе SPI2/I2C4, а также на контактах 38/36. Ранее описанное совмещение с `MPI/SD` не подтверждено; проверьте фактический выбор мультиплексора модуля. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `G0–G17`/`BUS0–BUS17` | I/O | Общие контакты GPIO/шины, совмещённые с SPI2, I2C2–I2C4, UART2/UART3, `PDM1`/`PDM2` или SWD в зависимости от позиции. |
| <span class="m2-chip m2-audio">Аудио</span> | `PDM1_CLK/DATA`, `PDM2_CLK/DATA` | O, I | В каждой паре сигналов цифрового микрофона CLK — выход модуля, DATA — вход. Эти функции совмещены с SPI2/I2C3/I2C4/UART3 на контактах 58, 56, 54 и 52. |
| <span class="m2-chip m2-debug">Выделенные</span> | `DBG_UART1_TXD/RXD` | O/I | Отладочный UART, совмещённый с SWD. |
| <span class="m2-chip m2-debug">Выделенные</span> | `SWDIO`, `SWCLK` | I/O, I | Отладочный порт SWD. Два варианта совмещения: позиции отладочного UART (контакты 43/41) или контакты прерывания/сброса сенсорной панели (контакты 51/49). В модуле следует реализовать только один вариант. |
| <span class="m2-chip m2-debug">Выделенные</span> | `SWD_SW` | I | Обозначение из книги предложения; поведение управления маршрутизацией не определено. |
| <span class="m2-chip m2-debug">Выделенные</span> | `BOOT_MODE` | I | Выбор режима загрузки/восстановления. |
| <span class="m2-chip m2-debug">Выделенные</span> | `PWR_KEY` | I | Сигнал кнопки питания. |
| <span class="m2-chip m2-gnd">Земля</span> | `GND` | — | Пути обратного тока цифровых и аналоговых цепей, распределённые по разъёму. |

</div>

!!! info "Исправление обозначения линии данных Wi-Fi SDIO"
    В локальной книге предложения контакту 64 назначен `WiFi_SD2_D1`; также отмечено, что в предыдущей редакции здесь ошибочно повторялось обозначение D3. Это фиксирует исправление только внутри проекта книги и не является подтверждением распиновки SiFli. Обе шины SDIO также имеют общие обозначения контроллеров в столбце альтернативных функций: `SDIO2_D0–D3`/`SDIO2_CMD`/`SDIO2_CLK` для Wi-Fi, `SDIO1_D0–D3`/`SDIO1_CMD`/`SDIO1_CLK` для карты TF, наряду с названиями по назначению.

### Правила совмещения функций M2 { #m2-sharing-rules }

- В книге SWD обозначен как мультиплексированный ресурс с двумя вариантами маршрутизации: позиции отладочного UART (`SWDIO` на контакте 43, `SWCLK` на 41) или контакты прерывания/сброса ёмкостной сенсорной панели (`SWDIO` на 51, `SWCLK` на 49). Реализуйте только один вариант в модуле и предусмотрите способ восстановления до использования этих контактов для других функций.
- SPI1 совмещён с 1-битным интерфейсом карты TF. Линии также представлены общими обозначениями контроллера `SDIO1_D0–D3`/`CMD`/`CLK`; контакты 65/67 дополнительно имеют функции `CAN_TX`/`CAN_RX`.
- Линии данных Wi-Fi SDIO2 также представлены общими обозначениями контроллера `SDIO2_D0–D3`/`CMD`/`CLK`; часть этих контактов может работать как аналоговые входы `GPADC`.
- SPI2 и I2C3/I2C4 (контакты 58, 56, 54 и 52) могут альтернативно передавать сигналы цифровых микрофонов `PDM1`/`PDM2`, а также использовать общие имена GPIO `G0–G3`/`BUS0–BUS3`.
- В группе из шести позиций `G11–G16`/`BUS11–BUS16` UART3 использует контакты 38/36, UART2 — 39/37, а SDA/SCL I2C2 — 35/34. Это разные пары, а не три шины на одних и тех же выводах. Каждая пара совмещена с соответствующими именами GPIO; проверьте возможность одновременной работы на выбранном модуле.
- Группы дисплея QSPI и ёмкостной сенсорной панели разделены на уровне сигналов, но их питание, сброс и пробуждение следует проверять как единую подсистему дисплея.
- `CAN_TX` и `CAN_RX` — логические сигналы, совмещённые на контактах 65/67, а не отдельные выделенные контакты. Плате-носителю по-прежнему нужны CAN-трансивер и защита, соответствующая шине изделия.

## Мультимедийный профиль M2xM { #m2xm-multimedia-profile }

M2xM — предварительный вариант мультимедийного назначения контактов. В локальной рабочей книге DPI и DVP помечены как основные группы сигналов, а MIPI DSI и CSI — как альтернативные. При этом не определены управление мультиплексированием и условия одновременного использования. Эти обозначения не подтверждают поддержку конкретным модулем μForge или корпусом SoC; до реализации проверьте возможности устройства и требования к разводке по документации выбранного модуля.

<div align="center"><em>Таблица: функциональное назначение M2xM</em></div>

<div align="center" markdown>

| Функция | Обозначения в книге предложения | Данные и ограничения |
| --- | --- | --- |
| Дисплей RGB / DPI | `R0–R7`, `G0–G7`, `B0–B7`, `DPI_CLK`, `DPI_DE`, `DPI_HSYNC`, `DPI_VSYNC` и общие обозначения управления дисплеем | DPI помечен как основной. В книге нет назначений 8080 или EPD. |
| MIPI DSI | `DSI_D0±`–`DSI_D3±`, `DSI_C±`, сброс, PWM подсветки и обозначения I2C | DSI обозначен как альтернативный; шесть контактов обозначены как заземление экрана (GND). В рабочей книге сигнал TE не назначен. |
| Управление сенсорной панелью | Общие обозначения `I2C_SCL`, `I2C_SDA` и `RESET` | На листе M2xM нет отдельного назначения прерывания/сброса контроллера сенсорной панели; поддержка сенсорной панели не подтверждена. |
| 12-битная камера DVP | `D0–D11`, MCLK, PCLK, HSYNC, VSYNC, PWDN, сброс и обозначения I2C | Показано 20 контактов; номер контроллера I2C в книге не указан. |
| MIPI CSI | Дифференциальные линии D0/D1, тактовая пара, PWDN, сброс и обозначения I2C | CSI обозначен как альтернативный; четыре контакта обозначены как заземление экрана (GND). Мультиплексирование и одновременное использование не описаны. |
| Цифровые микрофоны | `PDM1_CLK/DATA` и `PDM2_CLK/DATA` | Показаны четыре сигнала PDM. |
| I2S / PCM | На доступном листе M2xM нет сигналов или назначений контактов I2S/PCM. | Назначение не проверено; не считайте I2S/PCM частью этой схемы без утверждённого источника. |

</div>


## Сетевой профиль M2xN { #m2xn-networking-profile }

M2xN — непроверенная сводка сетевого профиля на этой странице, а не подтверждённая источником схема контактов. В доступной книге предложения нет листа M2xN, и первичный источник SiFli для этих назначений не найден. Перечень сигналов и количество резервных контактов ниже не следует считать проверенными.

<div align="center"><em>Таблица: функциональное назначение M2xN</em></div>

<div align="center" markdown>

| Функция | Сводка проекта (не проверена) |
| --- | --- |
| Ethernet | В тексте проекта приведены противоречивые обозначения: Gigabit Ethernet / RGMII и сигналы `RMII_*`. Здесь нет исходной схемы M2xN или первичного источника SiFli, которые позволили бы разрешить противоречие. Тип интерфейса и скорость не проверены; не заявляйте их для продукта без подтверждения утверждённым источником. |
| USB | `USB1_D±`, `USB1_DET`, `USB1_OTG`, `USB2_D±`, `USB2_DET`, `USB2_OTG` |
| CAN | От `CAN1_TX/RX` до `CAN4_TX/RX`, а также управляющие сигналы `CAN1/2_STB` и `CAN1/2_ERR_N` там, где они назначены |
| UART | `UART1_TX/RX/CTS/RTS` и `UART2_TX/RX/CTS/RTS` |
| Резерв | 15 контактов GPIO и 12 контактов GND |

</div>

## Аналоговый профиль и управление движением M2xA { #m2xa-analog-and-motion-control-profile }

M2xA — непроверенная сводка управления двигателями и сбора данных на этой странице, а не подтверждённая источником схема контактов. В доступной книге предложения нет листа M2xA, и первичный источник SiFli для этих назначений не найден. Названия сигналов, их количество и физическое назначение ниже не следует считать проверенными.

<div align="center"><em>Таблица: функциональное назначение M2xA</em></div>

<div align="center" markdown>

| Функция | Сводка проекта (не проверена) |
| --- | --- |
| Управление BLDC | В проекте перечислены `PWM1_OUT/OUTN`, `PWM2_OUT/OUTN`, `PWM3_OUT/OUTN`, `BKIN1/2`, `DRV_EN` и `DRV_NFAULT`. Для аналоговых входов приведены два противоречивых обозначения на пять каналов (`ADC_IU/V/W`, `ADC_VBUS`, `ADC_NTC` и `ADC_IN1–ADC_IN5`); в другой сводке M2xA перечислены `ADC0–ADC2`. Исходная схема M2xA и первичный источник SiFli, подтверждающие названия, количество или назначение, не найдены. Считайте эти сведения неразрешёнными до появления утверждённого описания интерфейса. |
| Обратная связь по положению | `H_A`, `H_B`, `H_C`, `ENC_A`, `ENC_B`, `ENC_Z` |
| Общие функции таймеров | `TIM_CH1–TIM_CH6` |
| Резерв | 27 контактов GPIO и 13 контактов GND |

</div>

## Обозначение модуля и контрольный список реализации { #module-declaration-and-implementation-checklist }

Обозначение модуля должно указывать базовое назначение контактов и каждую поддерживаемую схему расширения, например `M2`, `M2 + M2xM` или `M2 + M2xN + M2xA`. Также следует указать количество реализованных разъёмов форм-фактора M2, их категории, реализованные дополнительные функции и взаимоисключающие режимы.

Перед применением этого проекта проверьте:

- Соответствие предлагаемого посадочного места, контура платы, крепежа и направления установки применимым требованиям M.2.
- Количество, расположение и категории разъёмов форм-фактора M2 на модуле и плате-носителе.
- Все выбранные модулем мультиплексированные функции, включая совмещённые линии SDIO1/SDIO2, PDM, SWD (отладочный UART или прерывание/сброс сенсорной панели) и CAN.
- Требования конкретного модуля к напряжению и току ввода-вывода, сбросу, загрузке и последовательности подачи питания.
- Могут ли заявленные функции M2xM MIPI, RGB, DVP, PDM и I2S работать одновременно или только в альтернативных режимах.
- Требования платы-носителя к CAN-трансиверам, защите USB, питанию/обнаружению карты TF, питанию дисплея, усилению аудио и внешним PHY.
