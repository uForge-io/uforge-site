---
icon: lucide/plug
description: "μForge M2 和 M2xM 触点分配草案，以及尚未核实的 M2xN、M2xA 摘要与信号复用说明。"
tags:
  - 硬件
  - 模组
  - 接口
---

# M2 接口定义 { #m2-interface-definition }

!!! warning "接口定义草案"
    本页整理了 M2 接口方案草案。仓库中的本地提案工作簿包含 M2 和 M2xM 两张表，但引用的另一份源文件 `M2E接口定义_0714.xlsx` 未在仓库中找到，因此无法确认这份提案的版本和审批来源。目前也未找到可确认触点分配或数量的思澈科技（SiFli）一手资料。该工作簿不含 M2xN 或 M2xA 工作表，因此下文相应摘要尚未核实。本页不是 μForge.io 已发布的接口标准。所有分配都应视为暂定；在将设计用于量产前，请核实所选模组、载板、连接器、电气限制和引脚复用情况。

## 适用范围 { #scope }

本地提案工作簿中的 M2 和 M2xM 两张表按 1–75 编号，但触点映射中不列 24–31 号位置，因此共列出 67 个编号触点。两张表都将映射标注为 M.2 Key-E 连接器；M2xM 表还注明同一模组必须包含 M2 基础接口。这些都是提案中的标注，不能证明其符合 [PCI-SIG M.2 规范](https://pcisig.com/specification-overview/pci-express-m2)，也不能据此认定模组与载板可互换，或确定实际连接器的数量和布局。本页另含 M2xN 和 M2xA 摘要，但目前没有这两类接口的原始触点映射资料可供核实。

- **M2**：连接显示、音频、存储、调试及通用嵌入式 I/O。
- **M2xM**：显示、摄像头和 PDM 的多媒体分配草案。摘要中还提到 I2S/PCM，但现有 M2xM 工作表没有对应触点分配。
- **M2xN**：网络、USB、CAN 和 UART 信号。
- **M2xA**：电机控制、模拟采集、编码器和定时器信号。

当前草案仅预留了 `M2xH` 和 `M2xP` 两个名称，尚未为其分配触点。

!!! info "连接器关系尚未明确"
    本地提案工作簿注明，M2xM 所在模组还必须包含 M2 基础接口，但没有说明两张映射表对应独立连接器还是共用连接器。因此不能据此推断连接器数量或布局。工作簿也不含 M2xN 或 M2xA 的触点映射。

## 连接器约定 { #connector-convention }

本地提案工作簿的 M2 表以卡边为观察方向，奇数号触点标在顶面，偶数号触点标在底面。图中未列出 24–31 号位置，并将其标作拟议键位缺口；这仍不能证明实际连接器符合 M.2 E-key 的机械规范。

<div align="center"><em>表：M2 连接器与扩展概要</em></div>

<div align="center" markdown>

| 项目 | 定义 |
| --- | --- |
| 连接器格式 | 按 1–75 编号的草案卡边触点图，共列出 67 个触点；尚未核验是否符合 M.2 E-key 规范 |
| 提案中未列出的位置（拟议键位区） | 24–31 号位置 |
| 基础分配 | M2 |
| 多媒体分配 | M2xM |
| 本文中的扩展内容 | M2xM 触点映射；M2xN 和 M2xA 仅有摘要，尚未核实 |
| 声明示例 | `M2 + M2xM` |

</div>

## M2 基础配置 { #m2-base-profile }

M2 是面向小型互联产品的基础接口配置方案，涵盖 QSPI 显示屏和电容触控面板、Wi-Fi SDIO、1-bit TF 卡 SDIO、模拟音频、调试、USB、CAN 和通用总线。部分触点设有复用功能，模组可根据所用 SoC 和产品配置选择对应的用途。

<div align="center"><em>表：M2 功能分配</em></div>

<div align="center" markdown>

| 功能 | 分配信号 | 设计目的 |
| --- | --- | --- |
| 电源 | `USB_VIN`、`VBAT/VBATS`、`3.3V`、`CHG_INT` 和 GND | 提案映射中的信号名称；本文未规定电压、电流或上电时序要求。 |
| QSPI 显示 | `LCDC1_SPI_CS`、`CLK`、`DIO0–DIO3`、`CS2`、`TE`、`RSTB`、`LCD_BL_PWM` | QSPI 显示面板、背光和可选第二片选。 |
| 电容触控 | `CTP_I2C1_SDA`、`CTP_I2C1_SCL`、`CTP_INT`、`CTP_REST` | 电容触控控制和中断。 |
| Wi-Fi | `WiFi_SD2_CLK`、`CMD`、`D0–D3`、`PDN`、`INT`、`WAKE` | 连接外部 Wi-Fi 器件的 4-bit SDIO 接口。 |
| TF 卡 | `TF_SD1_CMD`、`CLK`、`D0`、`TF_DET` | 1-bit TF 卡接口和卡检测。 |
| 模拟音频 | `ADC_1P/N`、`ADC_2P/N`、`MIC_BIAS`、`DAC_1P/N`、`DAC_2P/N`、`AU_PA_EN` | 两对模拟输入、麦克风偏置、两对 DAC 和 PA 使能。 |
| 调试与恢复 | `DBG_UART1_TXD/RXD`、`SWDIO`、`SWCLK`、`SWD_SW`、`BOOT_MODE` | 调试 UART、SWD 和启动/恢复选择。 |
| 通用串行总线 | SPI1/SPI2、I2C2–I2C4、UART2/UART3 和通用 GPIO/总线 (`G0–G17`/`BUS0–BUS17`) | 通过模组引脚复用选择的产品专用总线；I2C1 分配给触控控制器。部分 SPI2/I2C3/I2C4/UART3 位置也可复用为 `PDM1`/`PDM2` 数字麦克风信号。 |
| 其他控制 | `CAN_TX/RX`、USB/USB Host 信号、`PWR_KEY` | 现场总线、USB 角色控制和电源键输入。 |

</div>

## M2 引脚分组与配色 { #color-coded-m2-pinout-guide }

<div align="center"><em>图：M2 信号组颜色图例</em></div>

<div class="m2-visual-guide" role="img" aria-label="M2 双面引脚表的颜色图例">
<div class="m2-category-band">
<div class="m2-category m2-audio">音频</div>
<div class="m2-category m2-display">显示</div>
<div class="m2-category m2-touch">触控</div>
<div class="m2-category m2-wireless">Wi-Fi / SDIO</div>
<div class="m2-category m2-bus">SPI / I²C / UART</div>
<div class="m2-category m2-power">USB / 电源</div>
<div class="m2-category m2-debug">专用</div>
</div>
</div>

彩色条带是表格图例。下方双面触点表记录了这份 M2 草案的参考引脚分配，包括备选功能和复用关系；它不是已发布的接口规范。

### M2 触点分配 { #m2-contact-assignment }

表格分别列出板卡底面和顶面的触点，中央为 CN1 列。工作簿为触点指定其他复用功能时，会列在 `Alt`（复用功能）列中；功能单元格的配色与上方图例对应。

<div align="center"><em>表：M2 基础触点分配</em></div>

<div align="center" markdown class="m2-grid-scroll" style="max-width: 100%; overflow-x: auto;" tabindex="0">
<table class="m2-grid" markdown="0">
<thead>
<tr><th>复用功能</th><th>功能</th><th>底面引脚</th><th>CN1</th><th>顶面引脚</th><th>功能</th><th>复用功能</th></tr>
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
<tr><td class="m2-blank"></td><td class="m2-notch" colspan="2">提案中未列出的位置：24–31（拟议键位区）</td><td class="m2-cn1"></td><td class="m2-notch" colspan="2">提案中未列出的位置：24–31（拟议键位区）</td><td class="m2-blank"></td></tr>
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

### M2 引脚说明 { #m2-pin-descriptions }

分组和配色与上方触点表一致。工作簿未定义 I/O 方向，因此这一列仅作为暂定的集成参考，方向均以模组为参照：I 表示输入，O 表示输出，I/O 表示双向。多个方向按所列信号的顺序对应。SPI 和 PDM 按模组提供时钟的用法列出，SWD 按外接调试器的用法列出。各信号的方向及电气要求仍须查阅所选模组和 SoC 文档确认。

I2C 的 I/O 表示 SDA/SCL 是双向总线信号，不代表模组支持所有控制器或目标器件模式，也不保证支持时钟拉伸。具体的引脚配置和上拉要求须按模组确认，参见 [NXP I2C 总线规范](https://www.nxp.com/docs/en/user-guide/UM10204.pdf)。PDM 的时钟输出、数据输入方向采用 [ST PDM 应用笔记](https://www.st.com/resource/en/application_note/an5027-interfacing-pdm-digital-microphones-using-stm32-mcus-and-mpus-stmicroelectronics.pdf) 中所示的麦克风主机连接方式，不代表特定模组一定支持该功能。

<div align="center"><em>表：M2 信号说明与暂定方向</em></div>

<div align="center" markdown>

| 信号组 | 信号 | I/O | 说明 |
| --- | --- | :---: | --- |
| <span class="m2-chip m2-power">电源</span> | `VBAT/VBATS` | I | 电池输入电源轨。 |
| <span class="m2-chip m2-power">电源</span> | `3.3V` | I | 3.3 V 电源。 |
| <span class="m2-chip m2-power">电源</span> | `CHG_INT` | O | 充电器中断/状态输出。 |
| <span class="m2-chip m2-power">电源</span> | `USB_VIN` | I | USB 输入 / 充电路径电源轨。 |
| <span class="m2-chip m2-power">电源</span> | `USB_DET` | I | USB 检测信号。 |
| <span class="m2-chip m2-power">电源</span> | `USBHOST_D+`、`USBHOST_D−` | I/O | USB Host 模式数据对，独立于主 USB 端口。 |
| <span class="m2-chip m2-power">电源</span> | `USB_OTG` | I/O | 提案工作簿中的信号名称；该表注明“当前平台不支持”。不能仅凭触点标注认定平台支持此功能。 |
| <span class="m2-chip m2-display">显示</span> | `LCDC1_SPI_CS`、`LCDC1_SPI_CS2` | O | QSPI 显示主片选和可选的第二片选。 |
| <span class="m2-chip m2-display">显示</span> | `LCDC1_SPI_CLK` | O | QSPI 显示时钟。 |
| <span class="m2-chip m2-display">显示</span> | `LCDC1_SPI_DIO0`–`DIO3` | I/O | QSPI 显示数据线。 |
| <span class="m2-chip m2-display">显示</span> | `LCDC1_SPI_TE` | I | 面板防撕裂同步（TE）信号输入。 |
| <span class="m2-chip m2-display">显示</span> | `LCDC1_SPI_RSTB` | O | 显示面板复位，低有效。 |
| <span class="m2-chip m2-display">显示</span> | `LCD_BL_PWM` | O | 背光 PWM 控制。 |
| <span class="m2-chip m2-touch">触控</span> | `CTP_I2C1_SDA`、`CTP_I2C1_SCL` | I/O | 电容触控控制器 I²C 总线。 |
| <span class="m2-chip m2-touch">触控</span> | `CTP_INT` | I | 触控控制器中断。 |
| <span class="m2-chip m2-touch">触控</span> | `CTP_REST` | O | 触控控制器复位。工作簿将该信号拼写为 `CTP_REST`。 |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_CLK`、`WiFi_SD2_CMD` | O、I/O | 外部 Wi-Fi 器件的 SDIO 时钟和命令。 |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_D0`、`WiFi_SD2_D1`、`WiFi_SD2_D2`、`WiFi_SD2_D3` | I/O | 外部 Wi-Fi 器件的 4-bit SDIO 数据线。 |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_PDN` | O | Wi-Fi 模组掉电控制。 |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_INT` | I | Wi-Fi 中断，与 65 号引脚的 `SDIO1_D2`/`CAN_TX` 共享。 |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_WAKE` | I/O | Wi-Fi 唤醒信号，与 67 号引脚的 `SDIO1_D3`/`CAN_RX` 共享。 |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_SD1_CMD`、`TF_SD1_CLK`、`TF_SD1_D0` | I/O、O、I/O | 1-bit TF 卡 SDIO 命令、时钟和数据。 |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_DET` | I | TF 卡在位检测。 |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `SDIO1_D0–D3`、`SDIO2_D0–D3` | I/O | SDIO 控制器的通用信号别名，分别对应 TF 卡（SDIO1）和外部 Wi-Fi 器件（SDIO2）所用的同一组物理线路。除非模组需要两条完整的 4-bit SDIO 总线，否则应使用上方按用途列出的信号名称。 |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `CAN_TX`、`CAN_RX` | O、I | 逻辑电平 CAN 收发接口，与 `WiFi_INT`/`WiFi_WAKE` 共享 65 号和 67 号引脚。载板仍需要 CAN 收发器以及适合产品总线的保护电路。 |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `GPADC` | I | 此引脚分配中，Wi-Fi SDIO 的 74、72、70、68、66、64 号触点，以及 `PWR_KEY` 所在的 60 号触点，均列有 ADC 备选功能。 |
| <span class="m2-chip m2-audio">音频</span> | `ADC_1P/N`、`ADC_2P/N` | I | 两对差分模拟麦克风输入。 |
| <span class="m2-chip m2-audio">音频</span> | `MIC_BIAS` | O | 麦克风偏置电源。 |
| <span class="m2-chip m2-audio">音频</span> | `DAC_1P/N`、`DAC_2P/N` | O | 两对差分音频输出。 |
| <span class="m2-chip m2-audio">音频</span> | `AU_PA_EN` | O | 音频功放使能。 |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI1_CS#`、`SPI1_SCK`、`SPI1_MOSI`、`SPI1_MISO` | O、O、O、I | SPI1，与 TF 卡路径复用。 |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI2_CS#`、`SPI2_SCK`、`SPI2_MOSI`、`SPI2_MISO` | O、O、O、I | SPI2，与 I2C3 和 UART2 复用。 |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C2_SDA`、`I2C2_SCL` | I/O | I2C2 的 SDA 和 SCL 分别位于 35、34 号触点。此前提及的 `MPI/SD` 复用关系未在此触点图中得到确认。 |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C3_SDA`、`I2C3_SCL` | I/O | I2C3，与 SPI2 复用。 |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C4_SDA`、`I2C4_SCL` | I/O | I2C4，与 SPI2 和 UART3 复用。 |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART2_TXD/RXD`、`UART2_CTS/RTS` | O/I、I/O | UART2 可选用 TF 卡组、SPI2 组或 39/37 号触点中的对应位置。此前提及的 `MPI/SD` 复用关系尚未确认，须按模组实际的引脚复用配置核对。 |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART3_TXD/RXD` | O/I | UART3 可选用 SPI2/I2C4 组或 38/36 号触点中的对应位置。此前提及的 `MPI/SD` 复用关系尚未确认，须按模组实际的引脚复用配置核对。 |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `G0–G17`/`BUS0–BUS17` | I/O | 通用 GPIO/总线触点，视位置与 SPI2、I2C2–I2C4、UART2/UART3、`PDM1`/`PDM2` 或 SWD 复用。 |
| <span class="m2-chip m2-audio">音频</span> | `PDM1_CLK/DATA`、`PDM2_CLK/DATA` | O、I | 每组数字麦克风信号中，CLK 为模组输出，DATA 为模组输入；这些功能与 SPI2/I2C3/I2C4/UART3 共用 58、56、54、52 号触点。 |
| <span class="m2-chip m2-debug">专用</span> | `DBG_UART1_TXD/RXD` | O/I | 调试 UART，与 SWD 复用。 |
| <span class="m2-chip m2-debug">专用</span> | `SWDIO`、`SWCLK` | I/O、I | SWD 调试端口，有两种可选共享位置：调试 UART 位置（43/41 号引脚）或触控中断/复位位置（51/49 号引脚）。每个模组只应实现其中一种。 |
| <span class="m2-chip m2-debug">专用</span> | `SWD_SW` | I | 提案工作簿中的信号名称；未说明该信号如何控制或选择路由。 |
| <span class="m2-chip m2-debug">专用</span> | `BOOT_MODE` | I | 启动/恢复模式选择。 |
| <span class="m2-chip m2-debug">专用</span> | `PWR_KEY` | I | 电源键信号。 |
| <span class="m2-chip m2-gnd">地</span> | `GND` | — | 数字和模拟回流路径，分布在连接器各处。 |

</div>

!!! info "Wi-Fi SDIO 数据标签更正"
    本地提案工作簿将 64 号触点分配为 `WiFi_SD2_D1`，并注明早期版本曾在此重复使用 D3 标注。这只记录了草案工作簿内部的修正，并非思澈科技（SiFli）对引脚复用的确认。两条 SDIO 总线在“复用功能”列中还列有控制器通用别名：Wi-Fi 总线为 `SDIO2_D0–D3`/`SDIO2_CMD`/`SDIO2_CLK`，TF 卡总线为 `SDIO1_D0–D3`/`SDIO1_CMD`/`SDIO1_CLK`，并同时保留各自的功能名称。

### M2 共享规则 { #m2-sharing-rules }

- 工作簿将 SWD 标为复用资源，提供两种可选路由：调试 UART 位置（43 号引脚的 `SWDIO` 和 41 号引脚的 `SWCLK`）或触控中断/复位位置（51 号引脚的 `SWDIO` 和 49 号引脚的 `SWCLK`）。每个模组只应实现其中一种，并在复用任一触点前保留恢复策略。
- SPI1 与 1-bit TF 卡接口复用触点。这些线路也列有 SDIO 控制器通用别名 `SDIO1_D0–D3`/`CMD`/`CLK`；65/67 号引脚另可复用为 `CAN_TX`/`CAN_RX`。
- Wi-Fi SDIO2 数据线也列有 SDIO 控制器通用别名 `SDIO2_D0–D3`/`CMD`/`CLK`；其中多个触点还可复用为 `GPADC` 模拟输入。
- SPI2 与 I2C3/I2C4（58、56、54、52 号触点）可复用为 `PDM1`/`PDM2` 数字麦克风信号，并附带通用 `G0–G3`/`BUS0–BUS3` GPIO 别名。
- 在 `G11–G16`/`BUS11–BUS16` 这组六个位置中，UART3 使用 38/36 号触点，UART2 使用 39/37 号触点，I2C2 的 SDA/SCL 使用 35/34 号触点。三组接口各用不同的一对触点，并非共用同一对引脚；每对触点均与对应的 GPIO 功能复用。能否同时运行须按所选模组确认。
- QSPI 显示和电容触控在信号层面独立，但其电源、复位和唤醒行为必须作为一个显示子系统共同审查。
- `CAN_TX` 和 `CAN_RX` 为逻辑电平信号，复用在 65/67 号引脚上，并非独立分配的触点。载板仍需要 CAN 收发器以及适合产品总线的保护电路。

## M2xM 多媒体配置 { #m2xm-multimedia-profile }

M2xM 是多媒体分配草案。本地提案工作簿将 DPI 和 DVP 标为主用信号组，将 MIPI DSI 和 CSI 标为替代信号组，但未说明复用控制方式或并发使用限制。这些标注不能证明特定 μForge 模组或 SoC 封装支持相应接口；实施前应依据所选模组文档确认器件能力和布线要求。

<div align="center"><em>表：M2xM 功能分配</em></div>

<div align="center" markdown>

| 功能 | 提案工作簿中的标注 | 证据与限制 |
| --- | --- | --- |
| RGB / DPI 显示 | `R0–R7`、`G0–G7`、`B0–B7`、`DPI_CLK`、`DPI_DE`、`DPI_HSYNC`、`DPI_VSYNC` 和共用显示控制信号 | DPI 标为主用。工作簿未列出 8080 或 EPD 的触点分配。 |
| MIPI DSI | `DSI_D0±`–`DSI_D3±`、`DSI_C±`、复位、背光 PWM 和 I2C 信号 | DSI 标为替代项；图中有 6 个触点标为屏蔽接地（GND）。工作簿未分配 TE 信号。 |
| 触控控制 | 通用 `I2C_SCL`、`I2C_SDA` 和 `RESET` 信号 | M2xM 表未列出触控专用中断/复位映射；无法据此确认触控控制器支持。 |
| 12 位 DVP 摄像头 | `D0–D11`、MCLK、PCLK、HSYNC、VSYNC、PWDN、复位和 I2C 信号 | 表中列出 20 个触点，但未注明 I2C 控制器编号。 |
| MIPI CSI | D0/D1 差分通道、时钟对、PWDN、复位和 I2C 信号 | CSI 标为替代项；图中有 4 个触点标为屏蔽接地（GND）。复用与并发使用条件未规定。 |
| 数字麦克风 | `PDM1_CLK/DATA` 和 `PDM2_CLK/DATA` | 表中列出 4 个 PDM 信号。 |
| I2S / PCM | 现有 M2xM 工作表中没有 I2S/PCM 信号或触点分配。 | 分配尚未核实；没有获批来源前，不应将 I2S/PCM 视为该映射的一部分。 |

</div>


## M2xN 网络配置 { #m2xn-networking-profile }

M2xN 是本文中的网络扩展摘要，目前没有可核实其触点分配的原始资料。现有提案工作簿不含 M2xN 工作表，本次也未找到相关思澈科技（SiFli）一手资料。因此，下表中的信号列表和预留触点数量均未核实，不能视为已确认的触点定义。

<div align="center"><em>表：M2xN 功能分配</em></div>

<div align="center" markdown>

| 功能 | 草案摘要（尚未核实） |
| --- | --- |
| 以太网 | 草案文本中出现了互相矛盾的标注：千兆以太网 / RGMII，以及 `RMII_*` 信号名。仓库中没有 M2xN 原始触点映射资料，也没有可用于判定的思澈科技（SiFli）一手资料。接口类型和速率均未核实；获批来源确认前，不应对产品宣称支持其中任一能力。 |
| USB | `USB1_D±`、`USB1_DET`、`USB1_OTG`、`USB2_D±`、`USB2_DET`、`USB2_OTG` |
| CAN | `CAN1_TX/RX` 至 `CAN4_TX/RX`，以及已分配的 `CAN1/2_STB` 和 `CAN1/2_ERR_N` 控制信号 |
| UART | `UART1_TX/RX/CTS/RTS` 和 `UART2_TX/RX/CTS/RTS` |
| 预留 | 15 个 GPIO 触点和 12 个 GND 触点 |

</div>

## M2xA 模拟与电机控制配置 { #m2xa-analog-and-motion-control-profile }

M2xA 是本文中的电机控制与采集摘要，目前没有可核实其触点分配的原始资料。现有提案工作簿不含 M2xA 工作表，本次也未找到相关思澈科技（SiFli）一手资料。因此，下表中的信号名称、数量和分配均未核实，不能视为已确认的触点定义。

<div align="center"><em>表：M2xA 功能分配</em></div>

<div align="center" markdown>

| 功能 | 草案摘要（尚未核实） |
| --- | --- |
| BLDC 控制 | 草案列出 `PWM1_OUT/OUTN`、`PWM2_OUT/OUTN`、`PWM3_OUT/OUTN`、`BKIN1/2`、`DRV_EN` 和 `DRV_NFAULT`。模拟输入出现两套不一致的五路标注（`ADC_IU/V/W`、`ADC_VBUS`、`ADC_NTC` 和 `ADC_IN1–ADC_IN5`）；另一份 M2xA 摘要则列出 `ADC0–ADC2`。仓库中没有 M2xA 原始触点映射资料或思澈科技（SiFli）一手资料可核实这些名称、数量和分配。在获批的接口来源补齐前，这些信息均未确定。 |
| 位置反馈 | `H_A`、`H_B`、`H_C`、`ENC_A`、`ENC_B`、`ENC_Z` |
| 通用定时 | `TIM_CH1–TIM_CH6` |
| 预留 | 27 个 GPIO 触点和 13 个 GND 触点 |

</div>

## 模组声明与实施检查表 { #module-declaration-and-implementation-checklist }

模组声明应标识其基础分配和每个支持的扩展映射，例如 `M2`、`M2 + M2xM` 或 `M2 + M2xN + M2xA`。还应说明实现的 M2 形式连接器数量、类别、已实现的可选功能和任何互斥模式。

采用本草案前，请验证：

- 拟议连接器的焊盘图形、板卡外形、固定件和插入方向是否符合适用的 M.2 要求。
- 模组和载板上 M2 形式连接器的数量、位置和类别。
- 模组选择的所有复用功能，包括任何共享的 SDIO1/SDIO2、PDM、SWD（调试 UART 或触控中断/复位）或 CAN 路由。
- 模组特定的 I/O 电压、电流、复位、启动和上电时序要求。
- 声称的 M2xM MIPI、RGB、DVP、PDM 或 I2S 功能是可同时使用，还是仅为替代模式。
- 载板对 CAN 收发器、USB 保护、TF 卡供电/检测、显示供电、音频放大器和外部 PHY 的要求。
