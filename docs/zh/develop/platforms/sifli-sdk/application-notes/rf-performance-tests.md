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
| UART 引脚、数据包取值和命令行为 | 取决于目标系列和 SDK 版本；应检查工程配置及目标 SDK 的实现。 |

</div>

!!! warning "官方指南中的 SF32LB58x UART1 引脚映射存在冲突"
    通用 [RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) 将 UART1 TX/RX 列为 PA31/PA32，而 [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) 列为 PA32/PA31。接线前请确认目标固件采用的测试路径和板级 pinmux；两份指南给出的映射并不一致。

## 选择测试模式 { #select-the-test-mode }

<div align="center" markdown>
<em>表：蓝牙与射频测试模式选择</em>

| 模式 | 用途 | SDK 入口 | 控制路径 |
|---|---|---|---|
| BT 信令（BR/EDR） | BQB/QDID 资格测试和符合协议的性能测试 | `bt_cm dut`、`gap_enb_dut_mode_req()` | 综测仪空口和 LMP 测试控制 |
| BT 非信令 | 研发射频调试和产线筛查 | `bt_rftest`、`bt_enter_no_signal_dut_mode()` | 本地厂商专用 HCI |
| BLE 非信令（SIG DTM） | BLE 射频筛查和 SIG DTM 认证测试项 | `bt_rftest bletx/blerx`、`ble_enter_dut_mode()` | 本地 HCI，或由 `bt_cm uart_dut` 透传的标准 HCI |
| 单项射频测试 | 板级射频调试和 FCC/CE 预测试 | `bt_cm uart_dut` + `SiFli_RfTool` | PC 工具逐项发送底层操作 |

</div>

对于 BR/EDR，信令测试会建立真实的蓝牙连接，是 BQB 射频认证路径。BLE BQB 射频测试使用 SIG DTM，本页将其归在 BLE 非信令测试中。BT 非信令和单项射频测试属于思澈科技（SiFli）的厂商专用流程，不属于 BQB。非信令测试会让射频在固定信道和设定功率下持续发射或接收，常用于研发和产线筛查。单项射频测试通过 PC 工具精确设置载波或调制，并使用频谱仪或功率计进行测量。

下列拓扑图取自思澈科技（SiFli）的 SF32LB52x 射频测试指南，展示了 PC、被测设备（DUT）、综测仪以及 UART/HCI/RF 连接之间的差异；其他系列的默认 UART 和引脚映射请查阅对应系列的射频测试指南。

![BT 信令测试拓扑](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）指南中的 SF32LB52x 示例——BT 信令：PC 配置综测仪，DUT 与综测仪通过 RF 建立链路。</em></div>

![BT 非信令测试拓扑](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>图：思澈科技（SiFli）指南中的 SF32LB52x 示例——BT 非信令：PC 通过串口/HCI 直接控制 DUT 的 RF 状态。</em></div>

![BLE DTM 测试拓扑](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
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

## BR/EDR 信令与 BLE DTM 设置 { #bt-signaling-test }

1. 从 DUT 引出 `VBAT`、`GND` 以及 UART1 TX/RX。UART1 默认引脚因封装而异，始终以工程中的引脚配置为准。
2. BLE DTM：将 UART1 接到 PC，发送 `bt_cm uart_dut`，确认收到 `04 0E 04 XX 03 0C 00`，再把 UART 切换到综测仪。
3. BT 信令：保持 DUT 唤醒，发送 `bt_cm dut`，确认 `Write scan enable success`，并将 RF 同轴线接到综测仪。
4. 综测仪选择 Bluetooth Signaling。BLE 的 EUT Control 使用 USB 转 RS232、波特率 1,000,000；BT 选择 `None (EUT Control off)`，通过空口搜索 DUT。
5. TX 使用 `Bluetooth 1 Multi Eval.`，RX 使用 `Bluetooth 1 RX Meas.`。经典蓝牙（Classic BT）使用 BER，BLE 使用 PER；逐步降低综测仪 TX 电平以确定灵敏度。

## BT/BLE 非信令命令 { #btble-non-signaling-commands }

启用射频测试路径后，在 FinSH 中执行：

```text
bt_rftest enter
bt_rftest bttx
bt_rftest btrx
bt_rftest btstop
bt_rftest exit
```

文档所述 SDK 中，`bt_rftest bttx` 和 `bt_rftest btrx` 使用固定测试参数，不接受命令参数。若要修改参数，应检查目标版本 `middleware/bluetooth/service/common/bf0_bt_common.c` 中的 `bt_rftest()` 实现，并按需定义带参数的子命令。具体实现和可用取值可能随版本变化。

RX 收包统计有助于评估接收情况，但 TX 发包计数不能反映 DUT 收到的数据包数。BLE DTM 可使用 `bt_rftest bletx`/`blerx`，或标准 HCI `LE_Transmitter_Test`、`LE_Receiver_Test v2`、`LE_Test_End`。BLE 信道为 0–39，PHY 为 1M/2M/Coded；经典蓝牙信道为 0–78。对于同时支持 BT 和 BLE 的双模芯片型号，两者共用射频硬件，应分开测试。

## 使用 SiFli_RfTool 进行单项射频测试 { #single-item-testing-with-sifli_rftool }

本小节仅介绍非信令 TX/RX。单载波（CW）测试请参阅独立的[蓝牙单音测试流程](bluetooth-single-tone-tests.md)。

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

下表按结构转录了 SF32LB52x 源示例中的全部行。这些内容不是可移植 API；实现时应使用目标系列的 SDK 文档。命令标识符、字节序列、测试值、限值和操作备注均按源图保留。

<div align="center" markdown>
<em>表：SF32LB52x 源示例——设置与进入命令</em>

| 测试项目说明 | 测试项目名称 | 下发指令 | 返回值 | 测试值 | 下限 | 上限 | 备注 |
|---|---|---|---|---|---|---|---|
| 进入非信令模式 | `AT_Cmd_Enter_BT_CM_Mode` | `bt_cm uart_dut` | `bt_cm uart_dut` | `1` | `0` | `1` |  |
| 设置损耗表 | `BT_SetMultiLossTable` | `/` | `/` | `/` | `/` | `/` |  |
| 进入 HCI 测试模式 | `HEX_Cmd_Enter_HCI_Mode` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| 延时 3 秒 | `Delay_Millisecond` | `/` | `/` | `/` | `/` | `/` |  |
| 频偏校准测试 | `BT_BR_TX_Cal_Test_L` | 1. `01,71,FC,06,00,53,01,01,05,0A`<br>2. `08,FF,EE,06`<br>3. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `09,FF,EE,00,06,01,00`<br>3. `04,0E,06,06,72,FC,00,E7,02` | `1` | `0` | `1` |  |
| 发送 HCI_Reset 指令 | `HEX_Cmd_HCI_Reset_Mode` | `01,03,0C,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| 程控电源下电 | `Simple_For_Updata_8IuOFF2` | `/` | `/` | `1` | `0` | `1` |  |
| 关闭串口通信 | `Serial_Port_Switch_Reset2` | `/` | `/` | `1` | `0` | `1` |  |
| 延时 2 秒 | `Delay_Millisecond` | `/` | `/` | `1` | `0` | `1` |  |
| 程控电源上电 | `Simple_For_Updata_8IuON2` | `/` | `/` | `1` | `0` | `1` |  |
| 使能串口通信 | `Serial_Port_Switch_COM` | `/` | `/` | `1` | `0` | `1` |  |
| 等待主板开机 3 s | `Delay_Millisecond` | `/` | `/` | `1` | `0` | `1` |  |
| 检测主板开机 | `AT_Cmd_Check_OS_Ready` | `AT_START` | `START=OK` | `1` | `0` | `1` |  |
| 进入非信令模式 | `AT_Cmd_Enter_BT_CM_Mode` | `bt_cm uart_dut` | `bt_cm uart_dut` | `1` | `0` | `1` |  |
| 发送停止指令 | `HEX_Cmd_Enter_BT_Mode` | `01,72,FC,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` | 确认是否已成功进入模式。 |
| 发送 HCI_Reset 指令 | `HEX_Cmd_HCI_Reset_Mode` | `01,03,0C,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |

</div>

<div align="center" markdown>
<em>表：SF32LB52x 源示例——RX 测试矩阵</em>

| 测试项目说明 | 测试项目名称 | 下发指令 | 返回值 | 测试值 | 下限 | 上限 | 备注 |
|---|---|---|---|---|---|---|---|
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH0` RX 测试 | `BT_BR_RX_BER_2402` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,00,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH0` RX 测试 | `BT_BR_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH0` RX 测试 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX 测试失败时，重试前需要发送 reset 指令。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH39` RX 测试 | `BT_BR_RX_BER_2441` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,27,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH39` RX 测试 | `BT_BR_RX_RSSI_2441` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH39` RX 测试 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX 测试失败时，重试前需要发送 reset 指令。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH78` RX 测试 | `BT_BR_RX_BER_2480` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,4E,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH78` RX 测试 | `BT_BR_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH78` RX 测试 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX 测试失败时，重试前需要发送 reset 指令。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH0` RX 测试 | `BT_EDR_RX_BER_2402` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,00,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH0` RX 测试 | `BT_EDR_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH0` RX 测试 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX 测试失败时，重试前需要发送 reset 指令。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH39` RX 测试 | `BT_EDR_RX_BER_2441` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,27,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH39` RX 测试 | `BT_EDR_RX_RSSI_2441` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH39` RX 测试 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX 测试失败时，重试前需要发送 reset 指令。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH78` RX 测试 | `BT_EDR_RX_BER_2480` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,4E,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH78` RX 测试 | `BT_EDR_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH78` RX 测试 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX 测试失败时，重试前需要发送 reset 指令。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH0` RX 测试 | `BT_BLE_RX_BER_2402` | 1. `01,1F,20,00`<br>2. `01,33,20,03,00,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH0` RX 测试 | `BT_BLE_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH0` RX 测试 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX 测试失败时，重试前需要发送 reset 指令。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH19` RX 测试 | `BT_BLE_RX_BER_2440` | 1. `01,1F,20,00`<br>2. `01,33,20,03,13,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH19` RX 测试 | `BT_BLE_RX_RSSI_2440` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH19` RX 测试 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX 测试失败时，重试前需要发送 reset 指令。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH39` RX 测试 | `BT_BLE_RX_BER_2480` | 1. `01,1F,20,00`<br>2. `01,33,20,03,27,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH39` RX 测试 | `BT_BLE_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH39` RX 测试 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX 测试失败时，重试前需要发送 reset 指令。 |

</div>

<div align="center" markdown>
<em>表：SF32LB52x 源示例——TX 测试矩阵</em>

| 测试项目说明 | 测试项目名称 | 下发指令 | 返回值 | 测试值 | 下限 | 上限 | 备注 |
|---|---|---|---|---|---|---|---|
| `BT_BR CH0` TX 测试 | `BT_BR_TX_DF1_2402` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,00,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH0` TX 测试 | `BT_BR_TX_DF2_2402` | 1. `01,71,FC,06,00,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BR CH39` TX 测试 | `BT_BR_TX_DF1_2441` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,27,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH39` TX 测试 | `BT_BR_TX_DF2_2441` | 1. `01,71,FC,06,27,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BR CH78` TX 测试 | `BT_BR_TX_DF1_2480` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,4E,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH78` TX 测试 | `BT_BR_TX_DF2_2480` | 1. `01,71,FC,06,4E,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| 从 BR 切换到 EDR | `HEX_Cmd_Switch_To_EDR` | `08,FF,EE,02,0A` | `09,FF,EE,00,02,01,00` | `1` | `0` | `1` |  |
| `BT_EDR CH0` TX 测试 | `BT_EDR_TX_2402` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,00,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_EDR CH39` TX 测试 | `BT_EDR_TX_2441` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,27,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_EDR CH78` TX 测试 | `BT_EDR_TX_2480` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,4E,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BLE CH0` TX 测试 | `BT_BLE_TX_DF1_2402` | 1. `01,1F,20,00`<br>2. `01,34,20,04,00,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH0` TX 测试 | `BT_BLE_TX_DF2_2402` | 1. `01,34,20,04,00,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |
| `BT_BLE CH19` TX 测试 | `BT_BLE_TX_DF1_2440` | 1. `01,1F,20,00`<br>2. `01,34,20,04,13,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH19` TX 测试 | `BT_BLE_TX_DF2_2440` | 1. `01,34,20,04,13,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |
| `BT_BLE CH39` TX 测试 | `BT_BLE_TX_DF1_2480` | 1. `01,1F,20,00`<br>2. `01,34,20,04,27,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH39` TX 测试 | `BT_BLE_TX_DF2_2480` | 1. `01,34,20,04,27,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |

</div>

<div align="center" markdown>
<em>表：SF32LB52x 源示例——退出与复位命令</em>

| 测试项目说明 | 测试项目名称 | 下发指令 | 返回值 | 测试值 | 下限 | 上限 | 备注 |
|---|---|---|---|---|---|---|---|
| 退出非信令模式 | `AT_Cmd_Exit_BT_Mode` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| 写入 RFT 标志位 | `AT_Cmd_Write_RFT_Flag_Test` | `AT_SET_RFT_FLAG P` | `SET_RFT_FLAG=OK,P` | `1` | `0` | `1` |  |
| 读取 RFT 标志位 | `AT_Cmd_Read_RFT_Flag_Test` | `AT_GET_RFT_FLAG` | `GET_RFT_FLAG=OK,P` | `1` | `0` | `1` |  |
| 延时 | `Delay_Millisecond2s` | `/` | `/` | `1` | `0` | `1` |  |
| 通信盒复位 | `Serial_Port_Switch_Reset` | `/` | `/` | `1` | `0` | `1` |  |
| 程控电源复位 | `Power_Supply_Off` | `/` | `/` | `1` | `0` | `1` |  |
| 工具复位 | `Release_Test_Parameters` | `/` | `/` | `1` | `0` | `1` |  |

</div>

![SF32LB52x HCI 射频测试命令表](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>图：上述 SF32LB52x 专用矩阵的中文原始资料图，仅供参考，不是可移植 API。</em></div>

每次测试都应记录芯片系列、SDK 修订版、固件标识、板卡修订版、UART 引脚、RF 路径和线缆损耗。还应记录仪器型号和配置、信道、PHY/数据包类型、功率设置、RX 计数、RSSI 和 BER/PER。详细指南请参阅：[SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html)、[SF32LB55x（其 UART 表也列出了 SF32LB57x）](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html) 和 [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html)。
