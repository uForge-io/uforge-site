---
icon: lucide/bluetooth
title: "运行蓝牙信令测试"
description: "将 SF32 被测设备连接到蓝牙综测仪，完成 BLE 或经典蓝牙信令测量。"
tags: [开发, SiFli-SDK, 应用笔记, Bluetooth]
---

# 运行蓝牙信令测试 { #run-bluetooth-signaling-tests }

信令模式会在被测设备（DUT）与综测仪之间建立真实的蓝牙（Bluetooth）链路。SDK 通过该模式进行符合协议的 TX/RX 验证和 BQB/QDID 测试；它不同于厂商专用的非信令测试或单项射频测试。

## 测试准备 { #test-setup }

准备 DUT、Windows PC、USB 转串口线、射频同轴线和蓝牙综测仪；思澈科技（SiFli）的指南以 CMW500 为例。从 DUT 引出 `VBAT`、`GND` 以及 UART1 TX/RX。UART1 默认引脚因封装而异：

<div align="center" markdown>

<em>表：器件/封装默认 UART1 引脚</em>

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

如果工程配置不同，请以实际引脚配置为准。BLE 信令需要通过串口建立 DUT 与综测仪之间的 EUT 控制链路；经典蓝牙（Classic BT）信令则可在 DUT 进入测试模式后通过空口与其交互。

信令测试的关键是区分两种控制拓扑：BLE 需要把 UART/HCI 控制链路接到综测仪；经典蓝牙则由综测仪通过空口发现并连接 DUT。下方拓扑图展示的是思澈科技（SiFli）SF32LB52x 蓝牙信令测试指南中的示例；其他系列的引脚应以目标工程为准。

!!! note "系列适用范围"
    UART 引脚表汇总了多个系列和封装的默认配置。后续拓扑图和综测仪截图均为思澈科技（SiFli）SF32LB52x 蓝牙信令测试指南中的示例，可用于理解信号路径，但不能据此推断其他封装的引脚或菜单配置。

![BLE 信令测试拓扑](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）SF32LB52x 指南示例——BLE 信令：PC 先让 DUT 进入测试模式，再把 UART/HCI 控制链路切换到综测仪。</em></div>

![经典蓝牙信令测试拓扑](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）SF32LB52x 指南示例——经典蓝牙信令：综测仪通过 RF 空口发现并连接 DUT。</em></div>

## 让 DUT 进入测试模式 { #put-the-dut-into-test-mode }

### BLE { #ble }

1. 启动 DUT，并让 DFU/应用固件保持唤醒。
2. 将 UART1 接到 PC，使用 SiFli_Trace 或其他串口工具发送 FinSH 命令 `bt_cm uart_dut`。
3. 切换为十六进制显示，确认收到 `04 0E 04 XX 03 0C 00`。
4. 断开 PC，将同一 UART1 接到综测仪的 USB 转 RS232 EUT 控制端口。

![BLE 进入测试模式的串口回显](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）SF32LB52x 指南示例——确认 `04 0E 04 XX 03 0C 00` 后，再切换 UART 连接对象。</em></div>

### 经典蓝牙 { #classic-bluetooth }

1. 启动 DUT，并让屏幕和 CPU 保持唤醒。
2. 将 UART1 接到 PC，发送 `bt_cm dut`。
3. 确认收到 `Write scan enable success`，然后将 RF 同轴线接到综测仪。切换另一种模式前先重启 DUT。

## 建立信令连接 { #establish-the-signaling-connection }

在综测仪的 `Bluetooth Signaling` 应用中启用信令。BLE 在 `EUT Control` 中选择 `USB-to-RS232 adapter`、1,000,000 波特率和 `Low Energy burst type`；将 DUT 的 UART1 接到综测仪，并将 DUT 的射频同轴线接入综测仪的 RF 输入端，再执行 `Connection Check`，等待 `LE comm test passed`。经典蓝牙则将 `HW Interface` 设为 `None (EUT Control off)`，使用 `Inquire` 搜索 DUT 地址，再选择 `Connect Test Mode`。

![BLE 综测仪 EUT Control 设置](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）SF32LB52x 指南示例——BLE 信令的 EUT Control、波特率和 Low Energy 设置。</em></div>

![经典蓝牙综测仪设置](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）SF32LB52x 指南示例——经典蓝牙信令将 EUT Control 设为 `None (EUT Control off)`。</em></div>

## 执行 TX 测试 { #run-tx-measurements }

打开 `Bluetooth 1 Multi Eval.` 并启用测量。根据需要选择 BLE 1M/2M 或经典蓝牙 BR/EDR 突发类型，再设置信道、数据包类型和有效载荷长度。无论通过 BLE 还是经典蓝牙建立信令连接，后续都使用综测仪的同一 TX 测试界面。

## 执行 RX 灵敏度测试 { #run-rx-sensitivity-measurements }

停止 TX，返回信令页面后打开 `Bluetooth 1 RX Meas.`。经典蓝牙选择 BER，BLE 选择 PER；设置好信道和数据包类型后启用 Rx Quality。逐步降低综测仪的 `Tx Level (CMW)`；BER/PER 指示仍有效时的最低电平，就是测得的接收灵敏度。记录采用传导测试还是辐射测试，并计入线缆损耗。

## 记录并复现 { #record-and-reproduce }

记录芯片/封装、UART 引脚、SDK 版本、固件标识、综测仪型号和配置、RF 连接方式、信道、PHY、数据包设置、TX 电平、BER/PER 以及板卡版本。官方系列页面：[SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) 和 [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)。
