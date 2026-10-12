---
icon: lucide/audio-lines
title: "运行蓝牙单项射频测试"
description: "使用 SiFli_RfTool 逐项控制 BLE 或经典蓝牙射频，用于板级调试和法规预测试。"
tags: [开发, SiFli-SDK, 应用笔记, Bluetooth]
---

# 运行蓝牙单项射频测试 { #run-bluetooth-single-item-rf-tests }

蓝牙（Bluetooth）单项测试是 SDK 提供的底层射频测试方式，可用于板级调试、FCC/CE 预测试，以及逐项测试载波或调制设置。它不是产品功能，也不能替代 BQB 信令测试。

## 准备 DUT 和工具 { #prepare-the-dut-and-tool }

准备被测设备（DUT）、PC、USB 数据线（非仅充电线）、射频同轴线及综测仪或频谱仪。确保 `VBAT`、`GND` 和 BLE/BT 调制信号测试所需的 UART1 TX/RX 可接入；如果要对 SF32LB55x 进行单载波（连续波，CW）测试，还需接出 UART3 TX/RX。默认引脚映射如下：

<div align="center" markdown>

<em>表：各系列调制测试与单载波测试的默认串口</em>

| 芯片/封装 | 调制测试 UART1 TX/RX | 单载波（CW）控制串口 |
|---|---|---|
| SF32LB52x | PA19 / PA18 | UART1 |
| SF32LB551 | PA49 / PA51 | UART3（PB45 / PB46） |
| SF32LB555 / SF32LB557 | PA17 / PA19 | UART3（PB45 / PB46） |
| SF32LB56xU（QFN） | PA17 / PA18 | UART1 |
| SF32LB56xV（BGA） | PA34 / PA30 | UART1 |
| SF32LB57x | PA19 / PA18 | UART1 |
| SF32LB58x | PA32 / PA31 | UART1 |

</div>

SF32LB55x 的 UART1 引脚因型号而异，单载波测试则统一改用 UART3。调制信号测试时，将 UART1 以 1,000,000 波特率连接 PC；对 SF32LB55x 进行单载波测试时，改用 UART3（PB45/PB46）。其他系列的单载波测试沿用 UART1。实际使用时，以工程中的引脚复用配置为准。RF 端口通过同轴线接入仪器；应计入线缆损耗，并区分传导测试和辐射测试。

!!! note "系列适用范围"
    UART 表汇总了多个系列和封装的默认配置。后续拓扑图和 `SiFli_RfTool` 截图均来自 SF32LB52x 指南，仅用于说明测试连接和界面操作。请在工具中选择实际芯片系列，并确认目标工程的 UART 映射。

!!! warning "思澈科技（SiFli）官方资料中的 SF32LB58x UART 映射不一致"
    [蓝牙单项 RF 测试指南](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html)将 UART1 TX/RX 标为 PA32/PA31，而[通用 RF 测试指南](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html)将 RF 调试串口标为 PA31/PA32。接线前请根据目标固件的测试路径和开发板 pinmux 核实；两份指南中的映射并不一致，不能假定二者可以互换。

![蓝牙单项测试拓扑](../../../../assets/develop/app-notes/bluetooth-single-item/figure_11-1.png){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 源示例——PC 通过 UART/HCI 控制 DUT，RF 端口通过同轴线连接综测仪或频谱仪。</em></div>

## 进入射频测试模式 { #enter-rf-test-mode }

1. 启动 DUT，并保持其唤醒。
2. 使用 SiFli_Trace 发送 FinSH 命令 `bt_cm uart_dut`。
3. 确认收到十六进制回复 `04 0E 04 XX 03 0C 00`。
4. 断开串口终端；SiFli_RfTool 将通过同一 UART 发送 HCI 控制命令。

## 发射 BLE 或经典蓝牙（Classic BT）信号 { #transmit-a-ble-or-classic-bt-signal }

1. 打开 `SiFli_RfTool.exe`，选择芯片系列，选择 BLE 非信令或 BT 非信令，选择 UART1 对应的 COM 端口，以 1,000,000 波特率连接。
2. BLE 设置 Frequency、Data Length、payload 和 PHY，点击 Start TX；修改信道或 PHY 前先停止 TX。
3. 经典蓝牙设置 Frequency、Data Length 和 Packet Type，点击 Start TX；修改数据包参数前先停止 TX。
4. 在综测仪上匹配信道、数据包类型、有效载荷和 PHY。没有综测仪时可用频谱仪观察波形。

SDK 资料中列出了 LB52x HDK 的 TX 电平参考，但这些数值只适用于该板卡。只能把它们作为调试参考，实际产品必须重新测量。

![SiFli_RfTool 主控制界面](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-1.jpg){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 源示例——工具中的芯片系列、测试模式、串口、波特率和 TX/RX 控件；应用测试向量前应先确认这些选择。</em></div>

![SiFli_RfTool 的 BLE TX 设置](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-2.png){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 源示例——选择芯片、模式、信道、有效载荷、PHY、数据长度和功率后再启动 TX。</em></div>

## 接收并计算灵敏度 { #receive-and-calculate-sensitivity }

进入 RX 前必须停止 TX。设置好信道后点击 Start RX；更换信道前先停止 RX。BLE RX 将综测仪配置为 Direct Test Mode，设置 PHY/信道，发送 1,500 个数据包，然后计算：

```text
PER = (1500 - received_packets) / 1500 × 100%
```

同时记录 RSSI。经典蓝牙 RX 使用 CMW500 GPRF Generator 的 DH1/2-DH1/3-DH1 等波形，记录收包数、错误包数、比特数、BER 和 RSSI。BLE 与经典蓝牙共用射频硬件，不能并行运行。

![SiFli_RfTool 的 BLE RX 设置](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-5.png){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 源示例——RX 测试必须先停止 TX，并记录信道、调制、PHY 和收包结果。</em></div>

## 单载波和仪器配置 { #single-carrier-and-instrument-setup }

切换到单载波（CW）测试前，先停止当前操作。SF32LB55x 需要将 DUT 与 PC 的连接从 UART1 改接 UART3（PB45/PB46），并在 SiFli_RfTool 中选择 UART3 对应的 COM 口，波特率设为 1,000,000；其他系列继续使用 UART1。设置载波频率和发射功率后启动 TX，在频谱仪或功率计上观察输出。

使用综测仪测量 BLE/BT 调制信号的 TX 时，将仪器设为 StandAlone (Non Signaling) 接收模式，并使信道、数据包类型、有效载荷和 PHY 与 SiFli_RfTool 的设置一致。测量 DUT 的 RX 时，由综测仪作为信号源发射：BLE 使用 DTM 参数，经典蓝牙使用 GPRF 波形。

如果工具或串口连接无响应，请关闭 SiFli_RfTool，将 DUT 断电后重新上电，等待启动完成再重新连接。测试记录应包含工具版本、固件标识、芯片/封装、UART 引脚、板卡版本、信道、PHY/数据包类型、功率、线缆损耗、仪器配置和原始结果。

![综测仪非信令接收配置](../../../../assets/develop/app-notes/bluetooth-single-item/figure_14-1.jpg){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 源示例——综测仪应选择 StandAlone (Non Signaling)，并匹配 DUT 端的信道和数据包参数。</em></div>

官方系列来源：[SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) 和 [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)。
