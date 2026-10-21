---
icon: lucide/timer-reset
title: "配置看门狗"
description: "使用 SiFli-SDK 使能、喂狗并验证 SF32 的 HCPU 和 LCPU 看门狗路径。"
tags: [开发, SiFli-SDK, 应用笔记, 看门狗]
---

# 配置看门狗 { #configure-the-watchdog }

SiFli SDK 从两个层面介绍看门狗：HAL 暴露的硬件看门狗，以及应用使用的 RT-Thread 看门狗驱动。不同系列的实例名称、复位范围和时钟选项并不相同；请先查看下表，再以目标芯片对应的 SDK 配置和资料为准。

<div align="center" markdown>

<em>表：各系列资料中说明的看门狗行为</em>

| 系列 | HAL 看门狗行为 | HAL 指南中说明的时钟行为 |
|---|---|
| SF32LB52x | HAL 指南说明 HCPU 和 LCPU 各有专用看门狗，可触发中断或复位各自子系统；此外还有可复位整颗芯片的系统级 IWDT。 | 计数器以 32K 时钟为基准；该指南未说明 52x 专属的时钟选择选项。 |
| SF32LB55x | HCPU WDT1 和 LCPU WDT2 可触发中断，硬件复位仅作用于各自子系统。系统级 IWDT 不产生中断，但可复位整颗芯片。 | 可选择 RC10K 或 32K LXT。 |
| SF32LB56x / SF32LB58x | HAL 指南说明 WDT1/WDT2 增加了复位整颗芯片的能力。 | 使用 RC10K，不再取自 32K 低功耗时钟。 |

</div>

!!! warning "RT-Thread 看门狗使用指南的适用范围"
    [看门狗使用指南](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/watchdog.html) 的发布路径位于 `sf32lb52x`，但正文明确写的是 SF32LB55X。下文提到的 30 秒默认超时、IDLE 线程喂狗、睡眠行为和应用层复位流程，均应视为该指南所述 55x 配置的说明，不能直接推广为所有 SF32 系列的共同保证。请根据目标系列的资料和生成的配置逐项确认。

## 使能和配置看门狗 { #enable-and-configure-the-watchdog }

在工程目录运行 `sdk.py menuconfig`，在 RT-Thread 设备驱动相关配置中使能看门狗选项。不同 SDK 版本的菜单名称可能略有差异，请以目标系列的官方文档为准，并在构建前确认生成的 `rtconfig.h`。

上述看门狗使用指南中的 menuconfig 示例分别配置了以下两项：

- `RTOS → On-chip Peripheral Drivers → Enable Watchdog Timer`：使能芯片硬件看门狗定时器。
- `RTOS → RT-Thread Components → Device Drivers → Using Watch Dog device drivers`：使能 RT-Thread 驱动。

该指南所述 55x 配置的默认看门狗超时时间为 30 秒。在驱动菜单中，通过 `(30) Watch Dog timeout (NEW)` 设置其他超时时间。请在目标系列的 `menuconfig` 中确认默认值，并将生成的配置与固件镜像一起保存。

下面的配图展示了上述指南中的菜单位置和超时设置项。由于该指南的 URL 路径与正文所述芯片系列不一致，图示仅供参考；实际菜单层级和默认值应以目标工程的 `menuconfig` 输出为准。

![menuconfig 中的看门狗驱动选项](../../../../assets/develop/app-notes/watchdog/watchdog2.png){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）看门狗使用指南中的看门狗驱动菜单。</em></div>

![menuconfig 中的看门狗定时器选项](../../../../assets/develop/app-notes/watchdog/watchdog.png){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）看门狗使用指南中的看门狗定时器配置。</em></div>

## 喂狗策略 { #feeding-policy }

系统会在 RT-Thread 的 `IDLE` 线程中自动喂狗。只要没有应用线程连续运行超过配置的超时时间，就不需要添加额外代码。

如果高优先级线程必须连续运行超过看门狗超时时间，应在该线程中调用：

```c
rt_hw_watchdog_pet();
```

不要使用无条件的喂狗循环来掩盖调度器卡死或死锁。喂狗点应代表被监控任务确实取得了正常进展。

## 睡眠和复位行为 { #sleep-and-reset-behavior }

- 进入待机模式（`Standby`）或休眠（`Hibernate`）时会关闭看门狗，唤醒后重新启用。
- 其他睡眠模式下看门狗继续运行，因此系统必须在超时前唤醒并喂狗。
- HCPU 使用系统看门狗，超时会重启整个芯片。
- LCPU 使用 LCPU 子系统看门狗，超时先产生中断，再由中断处理函数通过软件触发整个芯片重启。

## 验证流程 { #validation-sequence }

1. 记录芯片系列、SDK 版本、超时时间、喂狗负责方和睡眠模式。
2. 验证正常工作负载能够到达预期的喂狗位置。
3. 有意停止喂狗，确认复位范围和启动行为符合预期。
4. 在所有支持的睡眠模式下重复测试，尤其要覆盖 `Standby` 和 `Hibernate`。
5. 将复位结果和启动阶段的诊断信息保存到产品恢复测试记录中。

## 官方来源 { #official-sources }

- [看门狗使用指南（中文；发布路径为 SF32LB52x，正文注明 SF32LB55X）](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/watchdog.html)
- [Watchdog Usage Guide（英文；发布路径为 SF32LB52x，正文注明 SF32LB55X）](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html)
- [SF32LB52x HAL WDT 指南（英文）](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/wdt.html)
- [SF32LB55x HAL WDT 指南（中文，含 56x/58x 差异说明）](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/wdt.html)

以下系列专属看门狗应用笔记路径目前尚未核实：`sf32lb55x/app_note/watchdog.html`、`sf32lb56x/app_note/watchdog.html` 和 `sf32lb58x/app_note/watchdog.html`。搜索和直接打开的结果均无定论，不能据此认定这些路径会返回 404。
