---
icon: lucide/bluetooth
title: "运行蓝牙信令测试"
description: "将 SF32 被测设备连接到蓝牙综测仪，完成 BLE 或经典蓝牙信令测量。"
tags: [开发, SiFli-SDK, 应用笔记, Bluetooth]
---

# 运行蓝牙信令测试 { #run-bluetooth-signaling-tests }

信令模式会在 DUT 与蓝牙综测仪之间建立真实链路，用于符合协议的 TX/RX 测试。思澈科技（SiFli）的指南涵盖手动操作，也说明可通过软件控制综测仪进行自动化测试，例如使用 R&S® CMWrun 控制 CMW 综测仪。该模式不同于厂商专用的非信令测试或逐项 RF 测试。

!!! note "资质测试范围"
    对于资质测试，请按具体测试类型选择流程：SiFli 的 RF 测试指南将 BT 信令列为 QDID/协议一致性测试路径，并指出 BR/EDR BQB RF 测试使用 BT 信令，而 BLE BQB RF 测试使用 SIG DTM（BLE 非信令）。因此，不要把本页的 BLE 信令步骤当作 BLE BQB RF 测试流程。

## 测试准备 { #test-setup }

准备 DUT、Windows PC、USB 转串口线、射频同轴线和蓝牙综测仪；思澈科技（SiFli）的指南以 CMW500 为例。从 DUT 引出 `VBAT`、`GND` 以及 UART1 TX/RX。UART1 默认引脚因封装而异：

<div align="center" markdown>

<em>表：SiFli 蓝牙信令指南列出的器件/封装默认 UART1 引脚</em>

| 器件/封装 | UART1 TX | UART1 RX |
|---|---|---|
| SF32LB52x | PA19 | PA18 |
| SF32LB551 | PA17 | PA18 |
| SF32LB555/557 | PA34 | PA30 |
| SF32LB56xU（QFN） | PA17 | PA18 |
| SF32LB56xV（BGA） | PA34 | PA30 |
| SF32LB57x | PA19 | PA18 |
| SF32LB58x | PA32 | PA31 |

</div>

!!! warning "SF32LB58x UART1 方向存在资料冲突"
    SiFli 蓝牙信令指南和 [SF32LB58x 硬件设计指南的调试口表](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md)将芯片 UART1 TX/RX 对应为 PA32/PA31；但 [SF32LB58-DevKit-LCD 引脚表](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb58x/SF32LB58-DevKit-LCD.md)将 PA31 标为 UART1_TXD、PA32 标为 UART1_RXD，[SiFli RF 测试指南](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/rf_test_guide.html)也列出 TX=PA31/RX=PA32。官方资料不一致。接线前应核对目标板原理图及工程实际引脚配置；不要仅依据此汇总表连接。

如果工程配置不同，请以实际引脚配置为准。BLE 信令需要通过串口建立 DUT 与综测仪之间的 EUT 控制链路；经典蓝牙（Classic BT）信令则可在 DUT 进入测试模式后通过空口与其交互。

信令测试的关键是区分两种控制拓扑：BLE 需要把 UART/HCI 控制链路接到综测仪；经典蓝牙则由综测仪通过空口发现并连接 DUT。下方拓扑图展示的是思澈科技（SiFli）SF32LB52x 蓝牙信令测试指南中的示例；其他系列的引脚应以目标工程为准。

!!! note "系列适用范围"
    UART 引脚表汇总了多个系列和封装的默认配置。后续拓扑图和综测仪截图均为思澈科技（SiFli）SF32LB52x 蓝牙信令测试指南中的示例，可用于理解信号路径，但不能据此推断其他封装的引脚或菜单配置。

![BLE 信令测试拓扑](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 源示例——BLE 信令：PC 先让 DUT 进入测试模式，再把 UART/HCI 控制链路切换到综测仪。</em></div>

![经典蓝牙信令测试拓扑](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 源示例——经典蓝牙信令：综测仪通过 RF 空口发现并连接 DUT。</em></div>

## 让 DUT 进入测试模式 { #put-the-dut-into-test-mode }

### BLE { #ble }

1. 启动 DUT，并让 DFU/应用固件保持唤醒。
2. 将 UART1 接到 PC，使用 SiFli_Trace 或其他串口工具发送 FinSH 命令 `bt_cm uart_dut`。
3. 切换为十六进制显示，确认收到 `04 0E 04 XX 03 0C 00`。
4. 断开 PC，将同一 UART1 接到综测仪的 USB 转 RS232 EUT 控制端口。

![BLE 进入测试模式的串口回显](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 源示例——确认 `04 0E 04 XX 03 0C 00` 后，再切换 UART 连接对象；截图中的示例回显为 `04 0E 04 06 03 0C 00`。</em></div>

### 经典蓝牙 { #classic-bluetooth }

1. 启动 DUT，并让屏幕和 CPU 保持唤醒。
2. 将 UART1 接到 PC，发送 `bt_cm dut`。
3. 确认收到 `Write scan enable success`，然后将 RF 同轴线接到综测仪。切换另一种模式前先重启 DUT。

## 建立信令连接 { #establish-the-signaling-connection }

在综测仪的 `Bluetooth Signaling` 应用中启用信令。BLE 在 `EUT Control` 中将 `HW Interface` 设为 `USB to RS232 adapter`、将 `EUT Comm Protocol` 设为 `HCI`，并将 `Baud Rate` 设为 `1000000`；在常规设置中选择 `Burst Type: Low Energy`，图示测量示例的 `PHY=LE1M`。尚未接入串口时，`Virtual COM Port` 会显示为灰色（`None`）。将 DUT 的 UART1 接到综测仪、将射频同轴线接入 RF 输入端，然后关闭再重新启用 Bluetooth signaling，让仪器检测串口。执行 `Connection Check`，约 3 秒后应显示 `LE comm test passed`。经典蓝牙则将 `HW Interface` 设为 `None (EUT Control off)`，使用 `Inquire` 搜索 DUT 地址，再选择 `Connect Test Mode`。

![BLE 综测仪 EUT Control 设置](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 源示例——BLE 信令的 EUT Control、波特率和 Low Energy 设置。</em></div>

![经典蓝牙综测仪设置](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>图：SF32LB52x 源示例——经典蓝牙信令将 EUT Control 设为 `None (EUT Control off)`。</em></div>

!!! note "综测仪截图中的示例参数"
    BLE 截图还显示：`Stop Bits=1`、`Parity=None`、串口 `Protocol=None`、`Autoreset EUT` 已勾选、`Use BR/EDR Settings` 未勾选；测量侧字段为 `Operating Mode=RF Test`、`Burst Type=Low Energy`、`PHY=LE1M`、`Channel=19`、`Frequency=2440.0 MHz`、`Tx Level (CMW)=-40.00 dBm`、`Exp. Nom. Power=30.00 dBm`、`Auto Ranging` 和 `Dirty Tx` 未勾选、`Packet Type=RE_PHY_TestRef`、`Payload Length=37 byte(s)`、`Pattern Type=PRBS9`。经典蓝牙截图显示 `Operating Mode=RF Test`、`Burst Type=Basic Rate`、界面 `Test Mode=Loopback Test`、`Channel` 的接收/发送值为 10/39、`Frequency` 为 2412.0/2441.0 MHz、`Tx Level (CMW)=-40.00 dBm`、`Exp. Nom. Power=30.00 dBm`、`Packet Type=DH5`、`Payload Length=339 byte(s)`、`Pattern Type=10101010`；Hopping、Auto Ranging、Dirty Tx 和 Whitening 均未勾选。这些是截图中的测量示例，不是所有测试的固定参数；图中 `Loopback Test` 也不改变上文通过 `Inquire` 后选择 `Connect Test Mode` 的连接步骤。

## 执行 TX 测试 { #run-tx-measurements }

打开 `Bluetooth 1 Multi Eval.`；测量界面默认关闭，按 `ON/OFF` 启用。要修改测试参数，可从右侧选择 `Input Signal`，再从屏幕底部选择 `Burst Type`；BLE 可选 1M/2M，经典蓝牙可选 BR/EDR。信道、数据包类型和有效载荷长度可在 Bluetooth signaling 界面或 `Input Signal` 中设置。无论通过 BLE 还是经典蓝牙建立信令连接，后续都使用同一 TX 测试界面。

## 执行 RX 灵敏度测试 { #run-rx-sensitivity-measurements }

停止 TX，并从右侧的 `Bluetooth Signaling` 返回连接页面，再打开 `Bluetooth 1 RX Meas.`。经典蓝牙选择 BER，BLE 选择 PER；设置好信道、数据包类型和有效载荷长度后启用 Rx Quality。以 0.01 或 0.1 的步进逐渐降低综测仪的 `Tx Level (CMW)`；当 BER/PER 指示变红时，前一个电平就是该信道的接收灵敏度。记录采用传导测试还是辐射测试，并计入线缆损耗。

## 记录并复现 { #record-and-reproduce }

记录芯片/封装、UART 引脚、SDK 版本、固件标识、综测仪型号和配置、RF 连接方式、信道、PHY、数据包设置、TX 电平、BER/PER 以及板卡版本。官方系列页面：[SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) 和 [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)。
