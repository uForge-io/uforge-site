---
icon: lucide/footprints
description: "hello_world 之后的 SF32 外设实操教程：GPIO、FinSH、ADC、PWM、RTC，以及一个基于开发板的小项目。"
tags:
    - 教程
---

# 外设入门 { #beginner-tutorials }

这些教程承接自[入门指南](../index.md)。开始前，你应已安装 SiFli-SDK 工具链，至少成功烧录过一次 `hello_world`，并知道如何打开串口终端。每篇教程都围绕一个概念和一个外设展开，篇幅精简但内容完整，并设有明确的成功标准。

这些示例默认使用 SF32LB52-DevKit-LCD 这一类开发板，例如 `sf32lb52-lcd_n16r8`。如使用其他开发板，请在构建命令中替换开发板名称，并根据该板的支持文件确认引脚名称、外设实例和存储布局。

本系列帮助你建立可靠的工程习惯：验证一个板级行为，明确成功判据，并在进入下一个外设前保留可工作的基线。即使你已熟悉嵌入式 C，只是刚接触 SF32 SDK，也建议从这里开始。

## 开始前 { #before-you-start }

每个教程都沿用同一套基本循环：

```bash
scons --board=<board_name> -j8
# then flash with the download script or tool used in Get Started
```

请始终保持串口终端打开。很多初学阶段的问题，只要能看到 `rt_kprintf()` 输出和 FinSH 的 `msh>` 提示符，就会容易定位得多。

下面的 C 代码均为片段，并非可直接编译的完整源文件。请根据项目和 SDK 版本补充所需的头文件、声明、开发板专属初始化、返回值检查和资源清理。

<div align="center"><em>表：开始前检查项</em></div>

<div align="center" markdown>

| 项目 | 检查内容 |
|:-----|:---------|
| 开发板名称 | 与受支持的开发板配置一致。 |
| 串口 | 能正常打开，并看到启动输出。 |
| 烧录工具 | 不换线即可反复给开发板重新烧录。 |
| 原理图或开发板文件 | 在选择 GPIO、ADC、PWM 或 RTC 资源前已准备好。 |
| 一次只改一项 | 每次小改动后都重新构建、烧录并验证。 |

</div>

## 用 GPIO 闪烁 LED { #blink-an-led-with-gpio }

**目标：** 用固件控制一个 GPIO 引脚，完成嵌入式开发里的第一个“跑通”示例。

**时间：** 15 分钟

**起点示例：** `example/hal/gpio` 或 `example/rt_device/gpio`

SF32 的 RT-Thread SDK 可通过 RT-Thread 标准的 **PIN device** API 操作 GPIO。最简单的闪灯循环如下：

```c
#include <rtthread.h>
#include <rtdevice.h>

#define LED_PIN GET_PIN(1, 0)  /* replace with your board's LED pin */

int main(void)
{
    rt_pin_mode(LED_PIN, PIN_MODE_OUTPUT);

    while (1)
    {
        rt_pin_write(LED_PIN, PIN_HIGH);
        rt_thread_mdelay(500);
        rt_pin_write(LED_PIN, PIN_LOW);
        rt_thread_mdelay(500);
    }
}
```

1. 把最接近的 GPIO 示例复制到自己的工程目录，或者先直接在示例上修改学习。
2. 在原理图或开发板支持文件中找到 LED 所连接的引脚，不要靠猜端口号和引脚号。
3. 用和 `hello_world` 相同的开发板名称进行构建和烧录。
4. 确认 LED 以预期频率闪烁。
5. 把延时改成 100 ms，重新构建，并确认肉眼可见的闪烁频率发生变化。

**成功标准：** LED 持续翻转，串口仍有正常启动输出，修改延时会改变闪烁频率。

**如果没有成功：** 检查 LED 的有效电平、是否经过三极管驱动、该引脚是否已被其他功能占用，以及开发板名称是否与手上的硬件一致。

**你学到的内容：** PIN device 抽象、开发板专用引脚定义，以及最基础的“修改代码 -> 构建 -> 烧录 -> 验证”循环。

## 通过 GPIO 读取按键输入 { #read-a-button-with-gpio-input }

**目标：** 读取数字量输入，并对按键动作作出响应。

**时间：** 20 分钟

**起点示例：** `example/rt_device/gpio`

读取按键同样使用 PIN API，只是工作在输入模式。先用最简单的读取方式确认连线和逻辑电平：

在 SiFli-SDK 中，RT-Thread 的 PIN device API 不会通过 `rt_pin_mode()` 配置引脚的上拉或下拉电阻。对于低电平有效的按键，请确认板卡电路已提供上拉电阻，或按该板的引脚配置通过 `HAL_PIN_Set(...)` 在引脚复用设置中启用上拉。具体引脚、复用功能和 CPU 域均与开发板有关，不要直接照搬其他板卡的配置。

```c
rt_pin_mode(BUTTON_PIN, PIN_MODE_INPUT);

if (rt_pin_read(BUTTON_PIN) == PIN_LOW)
{
    /* button pressed, active-low */
}
```

除快速验证外，建议使用中断处理，避免固件在循环中持续轮询。这样，固件无需反复读取引脚，也能响应输入边沿；如果系统设计允许 CPU 在事件之间休眠，还能进一步降低功耗：

```c
rt_pin_attach_irq(BUTTON_PIN, PIN_IRQ_MODE_FALLING, button_isr, RT_NULL);
rt_pin_irq_enable(BUTTON_PIN, PIN_IRQ_ENABLE);
```

1. 在开发板上找出一个可用的按键或数字输入引脚。
2. 先用轮询方式读取，并在按下/释放按键时打印原始值。
3. 确认该按键是高电平有效还是低电平有效。
4. 基础读取确认没问题后，再切换到中断处理。
5. 每按下一次按键，就翻转教程 1 里的 LED。
6. 加入一个简单的去抖策略，例如短时间忽略重复事件，或在短延时后再次确认电平。

**成功标准：** 一次真实按压只触发一次预期固件动作，不会因抖动而重复触发。

**如果没有成功：** 确认开发板已提供所需的上拉/下拉电阻，或已通过引脚复用配置完成相应设置；再检查按键极性、中断边沿选择，以及该引脚是否与启动模式、调试口或其他外设复用。

**你学到的内容：** 数字输入配置、高有效与低有效逻辑、中断驱动输入，以及持续轮询为何会造成不必要的功耗。系统层面的原因可参考[低功耗概览](../../learn/low-power/overview.md#sleep-aware-firmware-design)。

## 使用 Shell 并打印调试输出 { #use-the-shell-and-print-debug-output }

**目标：** 在调试问题变复杂之前，先熟悉 FinSH 控制台和 `rt_kprintf()`。

**时间：** 15 分钟

**起点示例：** `example/system/finsh`

RT-Thread 的 **FinSH** Shell 通过同一个 UART 提供交互式 `msh>` 提示符，这个 UART 通常也承载启动日志。建议尽早养成以下习惯：

- 使用 `rt_kprintf()` 输出轻量级调试日志，而不是直接向 UART 写数据。
- 使用内置 Shell 命令，例如 `list_thread`、`list_device` 以及内存和状态类命令，快速观察运行中的系统。
- 保持日志简短且有意义；过量日志会改变时序和功耗表现。

1. 烧录前面任意一个示例，然后重新打开串口终端。
2. 按 Enter，进入 `msh>` 提示符。
3. 运行 `list_thread` 和 `list_device`。
4. 在教程 2 的按键处理逻辑中加入 `rt_kprintf()` 日志。
5. 确认按键按下时，日志能正常输出。

**成功标准：** 你能通过 Shell 查看线程和设备，并将自己的日志输出与实际物理事件对应起来。

**如果没有成功：** 检查串口波特率、端口选择、shell 组件是否启用，以及是否有其他工具占用了串口。

**你学到的内容：** 如何在不接入调试器的情况下观察运行系统，以及如何通过简单有效的日志输出减少对固件问题的盲目猜测。

## 用 ADC 读取模拟传感器 { #read-an-analog-sensor-with-adc }

**目标：** 采样一个模拟电压输入，例如电位器、简单传感器或电池检测信号。

**时间：** 20 分钟

**起点示例：** `example/rt_device/adc/channel`

运行此 RT-Thread 示例前，需启用 `BSP_USING_ADC`、`BSP_USING_ADC1` 和 `RT_USING_ADC`；否则 SDK 不会注册 `bat1`。在 SF32LB52 上，通道 7 在芯片内部连接至 VBAT，不能作为通用的外部传感器输入。请根据具体芯片和开发板选择受支持的 ADC 通道并配置引脚复用。思澈科技（SiFli）文档中的 SF32LB52 示例使用通道 0，对应 PA28。当前 SiFli-SDK 示例中，`rt_adc_read()` 返回的是按 0.1 mV 缩放的电压值，不是原始 ADC 计数；使用其他芯片或驱动版本时，请核对对应说明中的单位和换算方式。

```c
rt_adc_device_t adc = (rt_adc_device_t)rt_device_find("bat1");
rt_adc_enable(adc, channel);
rt_uint32_t voltage_0p1mV = rt_adc_read(adc, channel);
```

1. 在开发板上确认一个支持 ADC 的引脚和通道。
2. 确认输入电压范围，以及是否有分压或模拟前端电路。
3. 找到已注册的 ADC 设备，启用通道并读取数值。
4. 按照对应驱动的说明换算。对于当前 SF32LB52 示例，将返回值除以 10 即可得到 mV；不要再按原始 ADC 计数套用参考电压和分辨率公式。如果板上有外部分压电路，计算分压前的电压时还需计入分压比。
5. 通过教程 3 里的 shell 打印结果。
6. 缓慢改变输入，并确认读数平滑变化。

**成功标准：** 读数按预期方向变化，并在应用驱动说明中的换算系数和板级分压比后，对应合理的输入电压。

**如果没有成功：** 检查引脚复用、通道号、驱动规定的单位和校准方式、输入量程、输入是否悬空，以及传感器在采样前是否需要供电或稳定时间。

**你学到的内容：** `rt_device_find()` 这一 RT-Thread 设备驱动常见模式。之后在 I2C、SPI、PWM、存储和自定义驱动中都会反复用到它。

## 驱动 PWM 输出 { #drive-a-pwm-output }

**目标：** 生成 PWM 信号来调光 LED，或者驱动一个简单蜂鸣器。

**时间：** 20 分钟

**起点示例：** `example/rt_device/pwm`

PWM 设备名取决于该开发板启用的定时器驱动。SDK 中的设备名包括 `pwm3`、`pwmlp1` 和 `pwma1` 等；下面的 `pwm3` 仅为示例，并非所有开发板都使用此名称。请根据开发板配置确认已注册的设备名和引脚复用。

```c
struct rt_device_pwm *pwm = (struct rt_device_pwm *)rt_device_find("pwm3");
rt_pwm_set(pwm, channel, period_ns, pulse_ns);
rt_pwm_enable(pwm, channel);
```

1. 选择一个支持 PWM 的通道，并确认引脚复用配置。
2. 选择适合外设的周期：对 LED 来说要足够高以避免可见闪烁；对蜂鸣器来说则可选择可听频段。
3. 调整占空比，让 LED 逐渐变亮、变暗。
4. 对蜂鸣器尝试几个固定音调，可通过修改周期实现。
5. 关闭 PWM，并确认输出回到安全的空闲状态。

**成功标准：** 改变占空比会改变亮度，或改变周期会改变音调；关闭 PWM 后输出符合预期。

**如果没有成功：** 检查引脚是否真的路由到对应 PWM 实例、通道号是否正确、周期和脉宽单位是否为纳秒，以及外部负载是否需要驱动三极管。

**你学到的内容：** 周期和占空比配置，以及教程 4 中的设备驱动访问模式如何迁移到另一类外设。

## 用 RTC 保持时间 { #keep-time-with-the-rtc }

**目标：** 使用片上 RTC 读取和设置日历时间。

**时间：** 15 分钟

**起点示例：** `example/rt_device/rtc`

```c
time_t now = time(RT_NULL);
struct tm *tm_now = localtime(&now);
rt_kprintf("%04d-%02d-%02d %02d:%02d:%02d\n",
           tm_now->tm_year + 1900, tm_now->tm_mon + 1, tm_now->tm_mday,
           tm_now->tm_hour, tm_now->tm_min, tm_now->tm_sec);
```

1. 使用受支持的方式设置一次 RTC 时间，例如通过 Shell 命令设置。
2. 周期性打印当前时间。
3. 断电再上电，确认时间是否被保留。
4. 如果时间没有保留，先检查开发板的备份电源路径，再决定是否改固件。

测试掉电保持时，不要在每次启动时都无条件重设 RTC，否则无法判断上次设置的时间是否被保留。

**成功标准：** 上电后时间正常递增，掉电保持行为与开发板硬件设计一致。

**如果没有成功：** 检查 RTC 组件是否启用、时钟源、备份供电路径，以及开发板启动流程是否重置了 RTC 状态。

**你学到的内容：** RT-Thread RTC 设备之上的标准 C 时间 API，以及固件行为如何受到硬件设计约束的一个早期例子。

## 小项目：按键控制的传感器记录器 { #mini-project-button-controlled-sensor-logger }

完成前面六个短教程后，可以把它们组合成一个小项目：

1. 启动时让 LED 闪烁。
2. 用按键控制开始或停止采样。
3. 在采样处于激活状态时，每秒读取一个 ADC 值。
4. 通过 FinSH 打印带时间戳的读数。
5. 用 PWM 亮度或蜂鸣器音调表示当前是否在采样。

**通过标准：** 项目连续运行几分钟后，不会出现按键重复触发、日志失控或意外复位。

## 基础外设启动调试检查清单 { #beginner-bring-up-checklist }

- [ ] 开发板名称、串口和烧录流程都已经验证可用。
- [ ] GPIO 输出已在真实 LED 或被测引脚上验证通过。
- [ ] GPIO 输入已确认极性并完成基本去抖。
- [ ] FinSH Shell 可正常使用，`list_thread` 和 `list_device` 能工作。
- [ ] ADC 读数合理，并已换算成工程单位。
- [ ] PWM 周期和占空比设置能产生预期的物理输出。
- [ ] RTC 行为已理解，包括掉电保持限制。

## 下一步去哪里 { #where-to-go-next }

熟悉这些内容后，可以继续学习[子系统集成](intermediate.md)，把外设与中间件组合起来，例如 I2C 传感器、LVGL、BLE、音频播放和存储，并有针对性地测试它们的共存情况。
