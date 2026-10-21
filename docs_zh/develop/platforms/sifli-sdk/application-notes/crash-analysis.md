---
icon: lucide/file-search-2
title: "日志采集与崩溃分析"
description: "使用 SiFli-SDK 工具采集日志和内存现场，恢复故障上下文并分析断言或硬故障。"
tags: [开发, SiFli-SDK, 应用笔记, 调试]
---

# 日志采集与崩溃分析 { #capture-logs-and-analyze-crashes }

SDK 的 `debug_logging` 与 `crash_analysis` 指南互为补充：日志用于还原两个处理器核的运行情况，内存现场则可供调试器恢复故障上下文。每次采集都应同时保存对应的 ELF、map/符号文件、SDK 版本、芯片型号、工程配置和板卡版本。

## 选择调试连接 { #choose-a-debug-connection }

<div align="center" markdown>

<em>表：各 SF32 系列的调试与日志连接方式</em>

| 芯片系列 | 调试与日志行为 |
|---|---|
| SF32LB52x、SF32LB56x、SF32LB58x | 官方指南介绍了 UART 采集、`SifliUsartServer`/`AssertDumpUart` 以及通过 J-Link/Trace32 恢复现场的方法。应根据所选的睡眠状态，使用此时仍然可用的传输方式。 |
| SF32LB55x | 可使用 `$SDK_ROOT/tools/segger/jlink_hcpu_a0.bat` 和 `jlink_lcpu_a0.bat` 在 HCPU/LCPU 间切换 SWD。LCPU ROM 控制台为 UART3、波特率 1,000,000；HCPU 可使用 UART1/2 或 SWD。由于 SWD 使用 PB IO，连接期间应保持 LPSYS 处于活动状态（Active）或轻度睡眠（Light Sleep）。 |

</div>

LPSYS 从待机（Standby）唤醒后，SWD 会切回 HCPU。J-Link 复位不会自动切换当前调试核。异步日志可能导致断言转储不完整；调试故障路径时，应使用同步采集，或选择能够保留完整现场的采集方式。

## 采集实时或事后崩溃现场 { #capture-a-live-or-post-mortem-package }

对于当前版本的 SDK，可使用 `sdk.py` 通过 UART 或 J-Link 采集：

!!! note "示例适用范围"
    下面的命令以 SF32LB52/LB525 为例。保留命令结构，但必须根据目标系列和 SDK 版本替换芯片/型号、核、传输方式和 ELF。

```text
sdk.py crash-dump capture-live --transport uart --probe /dev/ttyUSB0 \
  --chip SF32LB52 --chip-model LB525 \
  --output /tmp/live-crash --elf build_hcpu/main.elf
```

目标使用 PSRAM 时添加 `--include-psram --psram-size 8MB`。J-Link 可使用 `--transport jlink --jlink-ip 127.0.0.1:19025`，并用 `--core hcpu` 或 `--core lcpu` 指定发生故障的处理器核。输出目录应包含现场二进制文件、对应处理器核的 ELF/AXF、`log.txt`、`manifest.json` 和 `sdk_manifest.json`。

较早版本 SDK 可参考对应系列指南，选择以下方法：

- UART：控制台仍可用时，可使用 `SifliUsartServer` 或 `AssertDumpUart` 导出断言现场包。
- J-Link/SWD：先将 J-Link 加入 `PATH`，再运行与目标系列对应的脚本；例如 SF32LB55x 使用 `$SDK_ROOT/tools/crash_dump_analyser/script/save_ram_55x.bat`。匹配的脚本会保存 RAM、EPIC 寄存器和 PSRAM。
- 需要排查堆内存泄漏时，启用 `RTOS → RT-Thread Kernel → Memory Management → Enable memory trace`。

使用脚本采集时，`.jlink` 文件必须与目标系列、PSRAM 配置及连接方式匹配：通过 `SifliUsartServer` 进行 IP 连接时使用 IP 模式脚本；通过 USB 直连 J-Link 时使用 USB 模式脚本。脚本与连接方式不匹配可能导致采集失败。

![SF32LB52x menuconfig 中的 memory trace 选项](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_mem_trace.png){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 指南示例——若需获取堆跟踪信息，应在复现故障前启用内存跟踪（memory trace）。</em></div>

UART 方式通常需要先确认串口工具、服务器地址和目标处理器核。指南中的截图可用于检查连接设置：

![SiFli_Trace 和 SifliUsartServer 工具位置](../../../../assets/develop/app-notes/crash-analysis/Sifli_Trace.png){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 指南示例——SiFli_Trace/SifliUsartServer 工具目录。</em></div>

![SifliUsartServer 的 SF32LB52x 连接设置](../../../../assets/develop/app-notes/crash-analysis/UsartServer52.png){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 指南示例——串口、波特率、服务器地址和调试核选择必须与目标现场匹配。</em></div>

![崩溃转储分析工具的 RAM 保存脚本](../../../../assets/develop/app-notes/crash-analysis/save_ram_uart_52.png){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 指南示例——目录中包含按芯片系列和连接方式区分的脚本，例如 `save_ram_55x.bat`、`save_ram_58x.bat` 和 `save_ram_uart_52x.bat`；应根据目标芯片和连接方式选择脚本。</em></div>

## 恢复并分析现场 { #restore-and-analyze-the-context }

将现场包转换为调试器可读取的 core 转储文件，再使用匹配的 ELF 进行分析：

```text
sdk.py crash-dump readcore --package /tmp/live-crash \
  --elf build_hcpu/main.elf --output /tmp/live-crash/coredump.elf
sdk.py crash-dump analyze --core /tmp/live-crash/coredump.elf \
  --elf build_hcpu/main.elf
```

较早的 Trace32 流程使用 HCPU 断言（HA）按钮和 `run_next_step` 加载 HCPU 现场；LCPU 转储则必须使用 LCPU 恢复配置。如果没有显示异常栈，应先确认调试核、ELF 和内存范围，再解读寄存器。

![Trace32 现场恢复脚本选择示例](../../../../assets/develop/app-notes/crash-analysis/dump_select.png){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 指南示例——J-Link/Trace32 现场导出脚本选择。</em></div>

![Trace32 HCPU 断言窗口](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_hcpu_window.png){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 指南示例——恢复后同时查看调用栈、线程列表、堆信息和错误原因。</em></div>

## 在启动或疑似竞态处暂停 { #stop-early-during-boot-or-a-suspected-race }

要调试初始化过程，可在对应 `Reset_Handler` 的第一条指令取消注释，使其变为 `B .`：

下面的启动文件路径来自 SF32LB55x 指南；其他系列应使用对应的启动文件。

- HCPU：`$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_hcpu.S`
- LCPU：`$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_lcpu.S`

连接 J-Link 后将 PC 前移 2 字节即可继续。在 C 中使用 `_asm("B .");` 可实现同样的暂停。不要使用 `while (1);` 代替，编译器可能会优化掉循环之后的代码。

## 分析现场信息 { #read-the-evidence }

断言转储通常包含断言函数及行号、线程表、邮箱（mailbox）和消息队列状态、互斥锁、信号量、堆使用情况以及 CPU 寄存器。使用完全匹配的 ELF 将故障 PC 符号化后，还应检查栈余量、阻塞任务等待的资源由哪个任务持有、队列条目，以及故障前最后一条日志。符号化前先保存原始转储。

Ozone 可加载 HCPU/LCPU ELF，以及 `$SDK_ROOT/tools/svd_external` 中适用于带 FPU 的 Cortex-M33 的 SVD。若目标核当前状态不允许连接 SWD，可改用 UART 或 `SifliUsartServer`。ULOG 可通过 UART 输出；启用 RTT 支持后，将 `segger` 设为 RT-Thread 日志设备即可使用 Segger RTT。

## 检查总线和内存故障 { #instrument-bus-and-memory-failures }

SDK 的总线监控功能（bus monitor）可以捕获导致总线错误（bus fault）的访问。参考指南中的示例，使用 `dbg_busmon_reg_callback` 注册回调，再用 `dbg_busmon_read` 和 `dbg_busmon_write` 检查相关地址范围。将总线监控与堆跟踪和崩溃现场包结合使用；没有符号和内存上下文的寄存器转储通常不足以定位问题。

![Trace32 堆调用栈示例](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_heap_callstack.png){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 指南示例——堆调用栈与内存窗口。</em></div>

官方系列资料：[SF32LB52x 崩溃分析](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/crash_analysis.html)、[SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/crash_analysis.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/crash_analysis.html)、[SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/crash_analysis.html) 以及对应的[调试和日志指南](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/debug_logging.html)。
