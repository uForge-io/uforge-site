---
icon: lucide/chart-no-axes-column
title: "使用 GPADC 采样"
description: "介绍适用于 SF32LB52x、SF32LB55x、SF32LB56x、SF32LB57x 和 SF32LB58x 的通用 ADC（GPADC），包括电气限制、PAD 映射、设备访问和校准。"
tags: [开发, SiFli-SDK, 应用笔记, ADC]
---

# 使用 GPADC 采样 { #sample-with-gpadc }

本页整合 SF32LB52x、SF32LB55x、SF32LB56x、SF32LB57x 和 SF32LB58x 的 ADC 指南。软件使用流程基本相同，但输入限制、PAD 分配和校准点因系列而异。配置硬件或固件前，请先确认目标系列。

GPADC 是思澈科技（SiFli）的通用模数转换器，用于测量传感器输出、电池电压等模拟信号。它不同于 SF32LB52x、SF32LB56x、SF32LB57x 和 SF32LB58x 提供的音频 ADC，也不同于 SF32LB55x 和 SF32LB58x 提供的 Sigma-Delta ADC。本页只介绍 GPADC；其他转换器请参阅对应系列的专用文档。

## ADC 范围与通道模型 { #adc-scope-and-channel-model }

SF32LB52x、SF32LB55x、SF32LB56x 和 SF32LB58x 的 SDK 应用笔记使用 8 个 ADC 通道，即 `GPADC_CH0` 至 `GPADC_CH7`，可用于传感器输出、电池电压等模拟信号。SF32LB57x 的 SDK ADC 通道表定义了 12 个通道：`PA28`–`PA38` 对应 `GPADC_CH0`–`GPADC_CH10`，电池检测通道为 `GPADC_CH11`（SDK 通道表中标为 `BAT`）。SF32LB57x 硬件设计指南则按供电型号将封装信号标为 `VBAT` 或 `VBATS`。能否得到有效电压值，取决于所选通道、输入网络和目标型号对应的软件校准方式。

SF32LB52x 的 `GPADC_CH7`（`BAT`）是专用电池检测通道：SDK 示例说明，该通道通过片上分压器连接 VBAT，换算电池电压时还要应用 SDK 的 `vbat_factor`。相比之下，SF32LB56x 和 SF32LB58x 的 `GPADC_CH7` 分别映射到外部 PAD `PB32` 和 `PB39`。SF32LB57x 的电池检测通道为 `GPADC_CH11`；应根据供电型号使用对应的 `VBAT` 或 `VBATS` 信号，并遵守电池域的相应限制。不能仅凭开发板将某个通道接到电池分压器，就把它当作芯片专用的电池检测通道。

## ADC 特性与输入网络 { #adc-characteristics-and-input-network }

<div align="center"><em>表：各 SF32 系列普通 GPADC 输入的特性</em></div>

<div align="center" markdown>

| 系列 | GPADC 通道数 | 分辨率 | 典型精度 | 普通 GPADC 输入最高电压 |
|:-----|:-------------|:-------|:---------|:------------------------|
| SF32LB55x | 8 | 10 bit | 3–4 mV | 1.1 V（X1）；3.3 V（X3） |
| SF32LB52x | 8 | 12 bit | 1–2 mV | 3.3 V |
| SF32LB56x / 58x | 8 | 12 bit | 1–2 mV | 3.3 V |
| SF32LB57x | 12 | 12 bit | 1–2 mV | 3.3 V |

</div>

上表所列的最高输入电压适用于普通 GPADC 输入；专用电池检测通道有各自的连接方式和输入限制。SF32LB55x 示例使用 1 MΩ / 220 kΩ 分压器，RC 稳定时间为 157 ms。SF32LB56x 指南的汇总表针对 SF32LB52x、SF32LB56x 和 SF32LB58x 列出 470 kΩ / 1000 kΩ 电阻及 200 ms 稳定时间；该建议不适用于 SF32LB57x。对于 57x，应依据具体型号的文档确认电池检测路径和限制，不要直接套用这些电阻值或稳定时间。上述建议针对外部分压网络。特别是 SF32LB52x 专用 `GPADC_CH7` 电池检测路径已使用片上分压器，除非目标板设计明确要求，否则不要再接外部分压器。分压电阻容差会影响最终测量精度；设计使用外部分压网络时，建议在产线上单独校准。

<div align="center"><em>表：各 SF32 系列的电池电压检测路径</em></div>

<div align="center" markdown>

| 系列 | 电池检测路径 | 设计注意事项 |
|:-----|:-------------|:-------------|
| SF32LB55x | 外部分压器接入选定的 GPADC 输入；参考电路使用 `PB10` / `GPADC_CH1`。 | 确保分压输出不超过所选 X1/X3 量程的输入上限。 |
| SF32LB52x | 专用 `GPADC_CH7` / `BAT`；SDK 示例说明该通道通过片上分压器连接 VBAT。 | 使用 SDK 的 `vbat_factor` 将该专用通道的结果换算为电池电压。 |
| SF32LB56x / 58x | 外部分压器接入开发板选定的 GPADC PAD；SDK 参考映射分别将 `GPADC_CH7` 对应到 `PB32` / `PB39`。 | 核对目标开发板原理图中的电池分压连接；这些是普通 GPADC PAD，不是芯片专用的电池检测通道。 |
| SF32LB57x | 专用 `GPADC_CH11`；SDK 通道表标为 `BAT`，硬件设计指南则根据供电型号标为 `VBAT` 或 `VBATS`。 | 按具体型号采用电池通道的测量范围。对于 3.3 V 供电型号，指南规定 `VBATS` 的 GPADC 测量范围为 0–4.5 V；不能用 4.7 V 管脚额定值替代该范围。 |

</div>

对于 SF32LB55x 的外部电池电压采样路径，OpenSiFli ADC FAQ 给出了一个分压器示例，使用 1 MΩ 和 220 kΩ、容差为 1% 的电阻。较大的阻值可降低分压网络的持续漏电流；1% 的容差可限制分压比误差，有助于保证测量精度。分压器输出是 ADC 测试点，不是电池电压本身。采用该参考设计时，仍需结合目标设备的原理图和电气限制。

![SF32LB56x SDK 指南中的 VBAT 分压器参考](../../../../assets/develop/adc/adc-resistor-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>图：SF32LB56x SDK 指南中的 VBAT 分压器和 ADC 测试点参考。</em></div>

![SF32LB55x 1 MΩ / 220 kΩ 分压电压参考](../../../../assets/develop/adc/adc003.png){ loading="lazy" }
<div align="center"><em>图：OpenSiFli ADC FAQ 中的 SF32LB55x 分压输出参考值。</em></div>

<div align="center"><em>表：SF32LB55x 1 MΩ / 220 kΩ 分压器的输出电压参考值</em></div>

<div align="center" markdown>

| 电池输入电压 | `PB10_BAT_DET_ADC` 输出电压 |
|:-------------|:---------------------------------|
| 3.0 V | 0.540983607 V |
| 3.3 V | 0.595081967 V |
| 3.6 V | 0.649180328 V |
| 4.0 V | 0.721311475 V |
| 4.2 V | 0.757377049 V |
| 5.0 V | 0.901639344 V |

</div>

SF32LB55x 参考原理图中，VBAT 经 R125（1 MΩ）连接到 `PB10_BAT_DET_ADC`；R126（220 kΩ）和 C118（0.1 µF）并联接地。采用该参考值时，仍需根据目标设备的原理图和电气限制进行核对。

![SF32LB55x 外部电池电压分压原理图](../../../../assets/develop/adc/adc004.png){ loading="lazy" }
<div align="center"><em>图：SF32LB55x 外部电池电压采样路径。</em></div>

## 模拟电源与参考电压 { #analog-supply-and-reference }

各系列的模拟电源和参考电压管脚配置并不完全相同。请按目标型号的原理图连接，不要假设所有 GPADC 都使用相同的 VREF 管脚：

<div align="center"><em>表：各 SF32 系列的 GPADC 电源与参考电压连接</em></div>

<div align="center" markdown>

| 系列 | 电源与参考电压连接 |
|:-----|:-------------------|
| SF32LB52x / 56x | `AVDD33_ANA` 接稳定的 3.3 V 电源。参考原理图显示 `GPADC_VREF` 通过电容接地；该管脚不是电源输入。 |
| SF32LB55x | 参考原理图显示 `AVDD33_ANA` 和 `AVSS33_ANA`；具体连接和去耦方式以目标原理图为准。 |
| SF32LB57x | `AVDD33_ANA` 接 3.3 V。`GPADC_VREF` 是参考电压管脚，只能按要求接电容到地，不可外部驱动。 |
| SF32LB58x | 参考原理图显示 `AVDD33_ANA` / `AVSS33_ANA`、需按要求接电容的 `GPADC_VREFP`，以及接地的 `GPADC_VREFN`。两个参考管脚都不能作为电源输入。 |

</div>

58x 的 `GPADC_VREFP` / `GPADC_VREFN` 与其他系列使用的单一 `GPADC_VREF` 命名不同，不能混为一谈。SDK 原理图还显示，各系列的滤波元件配置也有差别；请按目标型号对应的参考电路及元件值设计。不要向任何 GPADC 参考管脚直接加电。`AVDD33_ANA` 是模拟电源；如有 `AVSS33_ANA`，它是模拟地。

![SF32LB56x SDK 指南中的 GPADC 模拟电源与参考电压连接](../../../../assets/develop/adc/adc-ana-ref-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>图：SF32LB56x SDK 指南展示的各系列 GPADC 模拟电源与参考电压连接方式。</em></div>

## 配置 ADC PAD { #configure-the-adc-pad }

采样前，先将输入 PAD 配置为模拟功能。指南中的通用 API 示例为：

```c
HAL_PIN_Set_Analog(PAD_PB08, 0);
HAL_PIN_Set_Analog(PAD_PB13, 0);
```

这些调用只用于说明模拟 PAD API，不代表所有系列都使用这些 PAD。实际输入应按下表选择：

<div align="center"><em>表：各 SF32 系列的 GPADC PAD 与通道映射</em></div>

<div align="center" markdown>

| 系列 | `GPADC_CH0` | `GPADC_CH1` | `GPADC_CH2` | `GPADC_CH3` | `GPADC_CH4` | `GPADC_CH5` | `GPADC_CH6` | `GPADC_CH7` |
|:-----|:------------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|
| SF32LB55x | `PB08` | `PB10` | `PB12` | `PB13` | `PB16` | `PB17` | `PB18` | `PB19` |
| SF32LB52x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `BAT` |
| SF32LB56x | `PB22` | `PB23` | `PB24` | `PB25` | `PB26` | `PB27` | `PB28` | `PB32` |
| SF32LB58x | `PB32` | `PB33` | `PB34` | `PB35` | `PB36` | `PB37` | `PB38` | `PB39` |
| SF32LB57x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `PA35` |

</div>

SiFli 的资料对 SF32LB52x 引脚映射的说法不一致：[SF32LB52x ADC 专用应用笔记](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html) 给出的 A0 版外部引脚映射为 `PB08`、`PB10`、`PB12`、`PB13`、`PB16`、`PB17`、`PB18`、`PB19`，分别对应 `GPADC_CH0`–`GPADC_CH7`；而 [SF32LB56x 指南中的汇总 ADC 表](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html) 列出 `PA28`–`PA34` 对应 `GPADC_CH0`–`GPADC_CH6`，`BAT` 对应 `GPADC_CH7`。上表中的 SF32LB52x 一行采用的是汇总表，不能视为适用于所有 52x 型号的通用映射。为 52x 器件布线或配置 GPADC 前，请根据具体芯片型号和版本，核对对应 SDK 的引脚复用配置及开发板原理图；不要混用这两套映射。

SF32LB57x 还有 4 个 ADC 通道：`PA36` 为 `GPADC_CH8`，`PA37` 为 `GPADC_CH9`，`PA38` 为 `GPADC_CH10`，电池检测信号为 `GPADC_CH11`（SDK 通道表标为 `BAT`；硬件设计指南根据供电型号标为 `VBAT` 或 `VBATS`）。该通道属于电池电压域，测量范围与普通 GPADC 管脚不同。对于 3.3 V 供电型号，应遵守指南规定的 `VBATS` 0–4.5 V GPADC 测量范围，不能用 4.7 V 管脚额定值替代。因此，57x 的 12 通道映射及电池检测输入不能与上方的 8 通道映射混用。

SF32LB55x 还可以将 PIN 直接映射到指定的 GPADC 通道，例如 `HAL_PIN_Set(PAD_PB08, GPADC_CH0, PIN_NOPULL, 0)`。不要将这一映射复制到其他系列。

![SF32LB55x 模拟电池输入管脚模式配置](../../../../assets/develop/adc/adc008.png){ loading="lazy" }
<div align="center"><em>图：SF32LB55x 电池 ADC 路径的管脚模拟输入模式配置。</em></div>

## 读取 ADC 通道 { #read-an-adc-channel }

SiFli-SDK 默认将 ADC 注册为电池电压设备，设备名为 `bat1`。使用 RT-Thread 设备接口时，按以下步骤查找设备、以只读方式打开、启用通道并读取原始值：

```c
uint32_t channel = 1;
uint32_t value;
rt_device_t dev = rt_device_find("bat1");

if (dev) {
    rt_device_open(dev, RT_DEVICE_FLAG_RDONLY);
    rt_device_control(dev, RT_ADC_CMD_ENABLE, (void *)channel);
    rt_device_read(dev, channel, &value, 1);
}
```

使用 HAL 时，可调用 `HAL_ADC_GetValue(&hadc, slot)` 读取转换结果。传入已初始化的 ADC 句柄和本次转换所配置的 slot 编号，并确认该 slot 对应预期的通道及 PAD。

## ADC 校准与电压换算 { #adc-calibration-and-voltage-conversion }

ADC 值与输入电压呈线性关系：

<div align="center"><em>V<sub>real</sub> = (Value<sub>adc</sub> − Offset) × Ratio</em></div>

`Offset` 是输入为 0 V 时的 ADC 原始值，`Ratio` 是每个原始计数对应的电压增量。出厂校准用于补偿制造差异；指南还介绍了针对装配后输入路径的两点校准方法：

1. 施加两个准确、稳定的电压，读取对应的 ADC 值。
2. 使用目标系列对应的校准电压，不要使用 0 V 或最大输入电压。
3. 调用 `sifli_adc_calibration` 计算并保存比例系数 ratio 和偏移量 offset。
4. 使用保存的校准值换算后续读数；计算分压前的输入电压时，还要计入分压比。

参考实现将 `ADC_RATIO_ACCURATE` 设为 1000，`adc_vol_offset` 和 `adc_vol_ratio` 的初始值分别设为 200 和 3930。这段旧版辅助代码仅用于说明线性换算原理，不能替代目标 SDK 版本提供的校准流程；目标 SDK 若提供 HAL 或设备驱动校准 API，应优先使用对应接口。

### SF32LB55x 的校准范围 { #sf32lb55x-calibration-ranges }

OpenSiFli ADC FAQ 对 SF32LB55x 的校准流程有更详细的说明。`sifli_adc_init` 初始化时，从 Flash 工厂区读取 `FACTORY_CFG_ID_ADC` 对应的校准值。`sifli_adc_calibration` 根据这些值计算线性 `offset` 和 `ratio`；后续采样由所选范围对应的 `sifli_adc_get_mv` 算法换算。

文档中定义了两种校准范围：

![SF32LB55x 校准方式选择与工厂值流程](../../../../assets/develop/adc/adc001.png){ loading="lazy" }
<div align="center"><em>图：SF32LB55x 校准初始化、范围选择以及偏移量/比例计算。</em></div>

- **X1 范围：**校准点为 0.3 V 和 0.8 V。存储的校准值中 bit 15 已置 1，软件据此选择小范围模式。该模式在接近 0 V 或超过 1 V 时精度较低，并关闭 `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`，即关闭内部电阻分压器。因此，ADC 测试点不得超过 1.1 V。
- **X3 范围：**校准点为 1.0 V 和 2.5 V，是早期版本采用的方法。该模式开启 `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`，启用 3× 衰减的内部电阻分压器；输入不得超过 3.3 V。

![SF32LB55x X1/X3 内部分压控制](../../../../assets/develop/adc/adc002.png){ loading="lazy" }
<div align="center"><em>图：SF32LB55x 对应校准范围的内部分压器启用/关闭控制。</em></div>

不要只根据表格选择校准范围，应以工厂配置和目标 SDK 实现为准。这里的 X1/X3 行为仅适用于所引 SF32LB55x 资料，不适用于其他系列。

<div align="center"><em>表：综合 ADC 应用笔记列出的两点校准输入</em></div>

<div align="center" markdown>

| 系列 | 校准输入 |
|:-----|:---------|
| SF32LB55x | 0.3 V 和 0.8 V |
| SF32LB52x / 56x / 58x | 1.0 V 和 2.5 V |
| SF32LB57x | 1.0 V 和 2.5 V |

</div>

关于 SF32LB52x，不同版本资料存在差异：综合 ADC 应用笔记将 1.0 V 和 2.5 V 列为两点校准电压；而当前 HAL API 参考将 SF32LB52X 的默认校准范围定义为 X1，对应的校准点为 0.3 V 和 0.8 V。这两组电压不能视为可互换的默认值。选择校准点或判断允许输入电压前，应核对目标 SDK 版本、工厂校准数据和运行时校准范围。

```c
static uint32_t adc_vol_offset = 200;
static uint32_t adc_vol_ratio = 3930;
#define ADC_RATIO_ACCURATE 1000

int sifli_adc_get_mv(uint32_t value)
{
    return (value - adc_vol_offset) * adc_vol_ratio / ADC_RATIO_ACCURATE;
}

int sifli_adc_calibration(uint32_t value1, uint32_t value2,
                          uint32_t vol1, uint32_t vol2,
                          uint32_t *offset, uint32_t *ratio)
{
    uint32_t gap1, gap2;

    if (offset == NULL || ratio == NULL) return 0;

    gap1 = (value1 > value2) ? (value1 - value2) : (value2 - value1);
    gap2 = (vol1 > vol2) ? (vol1 - vol2) : (vol2 - vol1);

    if (gap1 == 0) return 0;

    *ratio = gap2 * ADC_RATIO_ACCURATE / gap1;
    adc_vol_ratio = *ratio;
    *offset = value1 - (vol1 * ADC_RATIO_ACCURATE / adc_vol_ratio);
    adc_vol_offset = *offset;

    return adc_vol_offset;
}
```

### 验证启动和唤醒后的校准结果 { #validate-calibration-after-startup-and-wake }

调试 SF32LB55x 电池电压时，OpenSiFli ADC FAQ 提醒：上电或从睡眠唤醒后的约 300 ms 内，读数可能不准确。这是 RC 充放电造成的，波形通常约 350 ms 后才稳定。实际应用中应增加采样延时，或丢弃起始阶段不稳定的读数。用万用表或示波器测量分压节点时，还要考虑仪器输入阻抗造成的影响；FAQ 指出这可能带来约 30 mV 的压降。

![SF32LB55x 电池采样启动稳定波形](../../../../assets/develop/adc/adc005.png){ loading="lazy" }
<div align="center"><em>图：SF32LB55x 启动波形，显示约 350 ms 的稳定时间。</em></div>

### 检查 SF32LB55x 在待机和唤醒后的 ADC 管脚配置 { #check-sf32lb55x-pin-configuration-after-standby }

对于 SF32LB55x 的 `PB10` 电池检测输入，应分别检查进入待机（Standby）前和唤醒后的管脚配置。初始化前，`PB10` 默认启用内部上拉。在 `pinmux.c` 中，应将其配置为 `PIN_NOPULL` 和 `PIN_ANALOG_INPUT`；否则内部上拉可能仍然有效，导致读数偶尔偏高。

![SF32LB55x 待机时电池采样节点波形](../../../../assets/develop/adc/adc006.png){ loading="lazy" }
<div align="center"><em>图：SF32LB55x 处于待机状态时电池采样节点的示例波形。</em></div>

![SF32LB55x 唤醒后电池采样节点波形](../../../../assets/develop/adc/adc007.png){ loading="lazy" }
<div align="center"><em>图：SF32LB55x 从待机状态唤醒后电池采样节点的示例波形。</em></div>

## 启动调试检查 { #bring-up-check }

在启用多通道或循环采样前，先用稳定且已通过独立测量确认的输入验证一个通道：

1. 确认所选系列的 PAD 映射和模拟配置。
2. 确认分压输出始终符合该系列的 ADC 限制。
3. 将原始值和校准结果与实际施加的电压进行对比。
4. 在开发板测试记录中保存分压和校准条件。

将 SF32LB56x 的日志 UART 接到外部 PC 时，串口适配器的参考电平必须与芯片 I/O 电压一致。OpenSiFli ADC FAQ 提醒，若芯片 I/O 为 3.3 V、适配器参考电平却为 5 V，ADC 读数可能明显偏低；例如，4 V 电池可能被测成 3.3 V。

## 官方来源 { #official-source }

- [SF32LB52x ADC 使用与配置指南](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html)
- [SF32LB55x ADC 使用与配置指南](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)
- [SF32LB56x ADC 使用与配置指南](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html)
- [SF32LB57x ADC 使用与配置指南](https://docs.sifli.com/projects/sdk/latest/sf32lb57x/app_note/adc.html)
- [SF32LB58x ADC 使用与配置指南](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/adc.html)
- [SF32LB52x ADC HAL API 参考](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/api/hal/adc.html)——默认校准范围定义。
- SF32LB57x 硬件设计指南——存储与制造——GPADC 通道与 PAD 分配。
- SF32LB57x 硬件设计指南——最小系统与电源——模拟电源/参考电压连接及不同供电型号的电池检测限制。
- [OpenSiFli ADC FAQ](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/faq/mcu/adc.md)——SF32LB55x 出厂校准范围及启动、待机和唤醒验证，以及 SF32LB56x 日志 UART 电平说明。
