---
icon: lucide/radio-tower
title: "运行 SiFli-SDK 射频测试"
description: "根据测试目标选择蓝牙射频测试模式、控制路径和测量仪器。"
tags: [开发, SiFli-SDK, 应用笔记, RF]
---

# 运行 SiFli-SDK 射频测试 { #run-sifli-sdk-rf-tests }

SDK 将蓝牙（Bluetooth）射频验证分为信令、非信令和单项射频测试。加载测试固件前，先根据测试目标选择正确路径。

<div align="center" markdown>
<em>表：射频测试内容的系列适用范围</em>

| 内容 | 系列适用范围 |
|---|---|
| 测试模式对比和测量流程 | 合并 SF32LB52x、SF32LB55x、SF32LB56x、SF32LB57x 和 SF32LB58x 的通用流程。 |
| 经典蓝牙测试支持情况 | 仅适用于支持经典蓝牙的目标型号。SF32LB55x 仅支持 BLE，不支持经典蓝牙测试流程；该系列应使用 BLE 测试路径。 |
| SF32LB57x 的测试工具支持范围 | [射频测试指南](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html)列出了 SF32LB57x 的 UART 引脚，但 [SiFli_RfTool 使用手册](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/SiFli_RfTool/SiFli_RfTool_UM.html)的平台选择列表中没有 57x。这里只能据此确认引脚映射；使用前应核实目标 SDK 版本支持的测试路径。 |
| 拓扑截图和 HCI 命令表 | 思澈科技（SiFli）SF32LB52x 射频测试指南中的示例；实现时应以目标系列的命令和引脚文档为准。 |
| `CONFIG_BT_RF_TEST` 配置 | 适用于文档所述的非 55x 路径；SF32LB55x 的 `bt_rftest` 不使用该符号。 |
| UART 引脚、数据包取值和命令语法 | 取决于目标系列和 SDK 版本；应检查工程配置并运行 `bt_rftest help`。 |

</div>

!!! warning "官方指南中的 SF32LB58x UART1 引脚映射存在冲突"
    通用 [RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) 将 UART1 TX/RX 列为 PA31/PA32，而 [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) 列为 PA32/PA31。接线前请确认目标固件采用的测试路径和板级 pinmux；两份指南给出的映射并不一致。

## 选择测试模式 { #select-the-test-mode }

<div align="center" markdown>
<em>表：蓝牙与射频测试模式选择</em>

| 模式 | 用途 | SDK 入口 | 控制路径 |
|---|---|---|---|
| BT 信令 | BQB/QDID 资格测试和符合协议的性能测试 | `bt_cm dut`、`gap_enb_dut_mode_req()` | 综测仪空口和 LMP 测试控制 |
| BT 非信令 | 研发射频调试和产线筛查 | `bt_rftest`、`bt_enter_no_signal_dut_mode()` | 本地厂商专用 HCI |
| BLE 非信令（SIG DTM） | BLE 射频筛查和 SIG DTM 项目 | `bt_rftest bletx/blerx`、`ble_enter_dut_mode()` | 本地 HCI，或由 `bt_cm uart_dut` 透传的标准 HCI |
| 单项射频测试 | 板级射频调试和 FCC/CE 预测试 | `bt_cm uart_dut` + `SiFli_RfTool` | PC 工具逐项发送底层操作 |

</div>

信令测试建立真实蓝牙链路，是资格测试路径；非信令测试直接让射频保持在固定信道、功率和收发状态，是研发/产线常用路径；单项射频测试通过 PC 工具精确控制载波或调制，并配合频谱仪、功率计。BT 非信令测试和单项射频测试是思澈科技（SiFli）定义的厂商专用流程，不属于 BQB。

下列拓扑图取自思澈科技（SiFli）的 SF32LB52x 射频测试指南，展示了 PC、被测设备（DUT）、综测仪以及 UART/HCI/RF 连接之间的差异；其他系列的默认串口和管脚仍应以对应系列的资料为准。

![BT 信令测试拓扑](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）指南中的 SF32LB52x 示例——BT 信令：PC 配置综测仪，DUT 与综测仪通过 RF 建立链路。</em></div>

![BT 非信令测试拓扑](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）指南中的 SF32LB52x 示例——BT 非信令：PC 通过串口/HCI 直接控制 DUT 的 RF 状态。</em></div>

![BLE 信令测试拓扑](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）指南中的 SF32LB52x 示例——BLE DTM：UART/HCI 控制通道和 RF 测量通道同时连接到综测仪。</em></div>

## 选择固件并配置工程 { #choose-firmware-and-configure-the-project }

`rf_test.bin` 是思澈科技（SiFli）内部用于射频测试的固件构建产物，不作为常规 SDK 发布产物。`User.bin` 是用户基于 SDK 编译的应用固件；协议栈已集成射频测试功能，可通过 `bt_cm dut`、`bt_cm uart_dut` 和 `bt_rftest` 等 FinSH 命令进入测试模式。

用户工程可启用：

```kconfig
CONFIG_RT_USING_FINSH=y
CONFIG_BSP_BT_CONNECTION_MANAGER=y
CONFIG_BT_RF_TEST=y
```

SF32LB55x 的 `bt_rftest` 路径不使用 `CONFIG_BT_RF_TEST`；`CONFIG_BT_FINSH` 只用于跟踪，不是测试命令的必选项。控制路径使用 SDK 自带 IPC UART 时，可按开发板配置 `CONFIG_IPC_USE_OWN_DEVICE=y` 和 `CONFIG_IPC_OWN_DEVICE_NAME="uart2"`。可参考 `example/bt/spp/` 与 `example/bt/HCI_over_uart/`。

## BT 信令测试 { #bt-signaling-test }

1. 从 DUT 引出 `VBAT`、`GND` 以及 UART1 TX/RX。UART1 默认引脚因封装而异，始终以工程中的引脚配置为准。
2. BLE 信令：将 UART1 接到 PC，发送 `bt_cm uart_dut`，确认收到 `04 0E 04 XX 03 0C 00`，再把 UART 切换到综测仪。
3. BT 信令：保持 DUT 唤醒，发送 `bt_cm dut`，确认 `Write scan enable success`，并将 RF 同轴线接到综测仪。
4. 综测仪选择 Bluetooth Signaling。BLE 的 EUT Control 使用 USB 转 RS232、波特率 1,000,000；BT 选择 `None (EUT Control off)`，通过空口搜索 DUT。
5. TX 使用 `Bluetooth 1 Multi Eval.`，RX 使用 `Bluetooth 1 RX Meas.`。经典蓝牙（Classic BT）使用 BER，BLE 使用 PER；逐步降低综测仪 TX 电平以确定灵敏度。

## BT/BLE 非信令命令 { #btble-non-signaling-commands }

启用射频测试路径后，在 FinSH 中执行：

```text
bt_rftest enter
bt_rftest bttx <channel> <packet_type> <power> <length>
bt_rftest btrx <channel> <packet_type> <power>
bt_rftest btstop
bt_rftest exit
```

具体参数顺序和数据包取值随 SDK 版本变化，应以目标 SDK 中 `bt_rftest help` 的输出为准。RX 收包统计可用于评估接收情况；TX 命令显示的包数不代表接收端收到的数据包数。BLE DTM 可使用 `bt_rftest bletx`/`blerx`，或标准 HCI `LE_Transmitter_Test`、`LE_Receiver_Test v2`、`LE_Test_End`。BLE 信道为 0–39，PHY 为 1M/2M/Coded；经典蓝牙信道为 0–78。对于同时支持 BT 和 BLE 的双模芯片型号，两者共用射频硬件，应分开测试。

## 使用 SiFli_RfTool 进行单项射频测试 { #single-item-testing-with-sifli_rftool }

将 DUT 的 UART1 以 1,000,000 波特率连接到 PC，再用同轴线将 RF 端口连接到综测仪、频谱仪或功率计。

发送 `bt_cm uart_dut`，确认收到 `04 0E 04 XX 03 0C 00`。然后在 `SiFli_RfTool.exe` 中选择芯片系列、BLE 或 BT 非信令模式以及 COM 端口。

修改信道、PHY、数据包类型或功率前，先停止 TX/RX。进行 BLE RX 测试时，可由综测仪发送 1,500 个数据包；按 `PER = (1500 - received) / 1500 × 100%` 计算 PER，并记录 RSSI。

进行经典蓝牙 RX 测试时，使用 CMW500 GPRF 波形，并记录 RSSI、包/比特错误数和 BER/PER。补偿线缆损耗，并标明测量结果属于传导测试还是辐射测试。

## 记录测试结果 { #record-the-result }

思澈科技（SiFli）的指南还提供了完整的 HCI 命令/返回值对照表。遇到“命令已发出但 DUT 没有进入预期状态”时，可用它排查问题；不要把表中的所有测试向量都当成通用 API，具体命令要与目标 SDK 和芯片系列匹配。

<div align="center"><em>表：SF32LB52x 命令矩阵中的接收测试信道和中心频率示例</em></div>

<div align="center" markdown>

| 测试模式 | 信道 | 中心频率 |
|:---------|:-----|:---------|
| BR/EDR | 0 / 39 / 78 | 2402 / 2441 / 2480 MHz |
| BLE | 0 / 19 / 39 | 2402 / 2440 / 2480 MHz |

</div>

源矩阵要求 RX 测试失败后重试前发送 `HCI_Reset`（`01,03,0C,00`）。上述命令和信道仅为 SF32LB52x 源资料中的示例；请针对目标 SDK 和芯片系列核对实际命令序列。

![SF32LB52x HCI 射频测试命令表](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）指南中的 SF32LB52x 示例——HCI 命令、返回值和 RF 测试项对照表。</em></div>

每次结果都记录芯片系列、SDK 版本、固件标识、UART 引脚、RF 路径、线缆损耗、仪器型号和配置、信道、PHY/数据包类型、功率设置、RX 计数、RSSI、BER/PER 以及板卡版本。详细的原始指南见：[SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html)、[SF32LB55x（其 UART 表也列出了 SF32LB57x）](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html) 和 [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html)。
