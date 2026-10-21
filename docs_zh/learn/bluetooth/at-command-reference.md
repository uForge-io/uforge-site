---
icon: lucide/list
description: "SF32LB57 双模蓝牙 AT 指令模组（SIFLI_AT）完整 AT 指令参考：指令格式、系统与设备、地址与标识、工作模式与可见性、配对与安全、串口与事件、连接管理、数据收发、自定义 GATT 各类命令，以及主动事件（URC）与 PDU 格式命令。"
tags:
  - 蓝牙
---

# AT 指令集 { #at-command-reference }

<div align="center"><em>表：文档信息</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 版本 | V1.2.1 |
| 日期 | 2026-07-28 |
| 适用模组 | SF32LB57 双模蓝牙模组（SIFLI_AT） |

</div>

本文档说明 SF32LB57 双模蓝牙（Bluetooth）模组（SIFLI_AT）V1.2.1 版提供的对外 AT 指令接口。命令和响应字符串均以等宽字体标注；其中 `\r` 表示回车符（0x0D），`\n` 表示换行符（0x0A）。AT 指令以 ASCII 文本传输，PDU 帧中的二进制字段按小端字节序排列。

本文档是蓝牙 AT 指令模组页面引用的完整 AT 接口规范。

<div align="center"><em>表：变更记录</em></div>

<div align="center" markdown>

| 版本 | 变更内容 | 日期 |
|:-----|:---------|:-----|
| V1.2.1 | SF32LB57 V1.2.1 版本：补充 `AT+CFGRESET`；更新经典蓝牙名称的上电同步、`CLEARLINKKEY`、连接句柄和 PDU 说明；启用 BQB 构建配置。 | 2026-07-28 |

</div>

## 概述 { #overview }

SF32LB57 双模蓝牙模组通过 UART 向主机提供 AT 指令接口，用于 BLE 和经典蓝牙（BR/EDR）。主机可用 AT 指令配置设备参数、管理连接、收发数据，并接收模组主动上报的状态信息。

### 默认设置 { #default-settings }

<div align="center"><em>表：默认设置</em></div>

<div align="center" markdown>

| 项目 | 默认值 |
|:-----|:-------|
| 设备名 | `SIFLI_AT` |
| 串口波特率 | 460800 bps |
| 命令/透传模式 | 透传模式 |
| 蓝牙工作模式 | 双模（BLE+BT） |
| 事件上报 | 正常上报 |
| 设备名附加 MAC 后缀 | 关闭 |
| 设备类别（Class of Device，COD） | `000000` |
| BLE MTU 上限 | 247 |
| 全局多连接 | 已启用（1） |
| 透传空闲断连时间 | 0（关闭） |
| GATT 上电自动加载 | 开启 |
| BLE 随机地址 | 关闭（使用公有地址） |
| 蓝牙地址 | 由芯片 UID 自动生成 |

</div>

## 指令格式 { #command-format }

### 语法定义 { #syntax-definition }

AT 指令以 ASCII 文本传输，以回车符 `\r`（0x0D）作为命令结束符。命令前缀为 `AT+`（AT 格式指令）或 `AT>`（PDU 格式指令）。SF32LB57 的 AT 口为 USART1，串口格式为 8N1、无硬件流控，默认波特率为 460800 bps。单条 AT 帧最大长度为 512 字节。

### AT 格式指令 { #at-format-commands }

<div align="center"><em>表：AT 格式指令形式</em></div>

<div align="center" markdown>

| 形式 | 命令 | 说明 |
|:-----|:-----|:-----|
| 查询 | `AT+<CMD>?\r` | 读取参数或状态 |
| 设置 | `AT+<CMD>=<param>[,<param>...]\r` | 写入参数 |
| 执行 | `AT+<CMD>\r` | 触发动作 |

</div>

<div align="center"><em>表：AT 格式响应</em></div>

<div align="center" markdown>

| 结果 | 响应字符串 |
|:-----|:-------|
| 成功 | `\r\nOK\r\n` |
| 失败 | `\r\nERROR\r\n` 或 `\r\nFALSE\r\n` |
| 查询返回值 | `\r\n+<CMD>:<value>\r\n\r\nOK\r\n` |

</div>

### PDU 格式指令 { #pdu-format-command-framing }

PDU 指令用于在命令模式下传输二进制数据。除特别标注外，帧内数值字段均按小端字节序排列，`data` 为原始二进制数据。

**命令（主机 → 模组）**

```
'A' 'T' '>' <Opcode(2 bytes)> <Total Length(2 bytes)> [Body] '\r'
```

<div align="center"><em>表：PDU 命令帧结构</em></div>

<div align="center" markdown>

| 元素 | 说明 |
|:-----|:-----|
| `AT>` | 命令前缀，3 字节 ASCII |
| Opcode | 操作码，2 字节小端。`0x0101`、`0x0102` |
| Total Length | Body 总字节数，2 字节小端 |
| Body | 载荷数据，具体结构由 Opcode 决定 |
| `\r` | 命令结束符，1 字节 |

</div>

**上报（模组 → 主机）**

```
'\r' '\n' '<' <Opcode(2 bytes)> <Total Length(2 bytes)> [Data] '\r' '\n'
```

## 命令与响应 { #commands-and-responses }

以下按能力分类列出全部 AT 指令；分类与"蓝牙 AT 指令模组"页中的索引表一致。

### 系统与设备 { #system-and-device }

#### 获取固件版本信息 { #get-firmware-version }

<div align="center"><em>表：获取固件版本信息</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GFWVER?\r` |
| 响应 | 成功：`\r\n+GFWVER:SIFLI_AT_<version>_<build date>\r\n\r\nOK\r\n`；任何设置命令均返回 `\r\nERROR\r\n`。 |
| 参数 | 无 |
| 备注 | 仅支持查询。返回值固定以 `SIFLI_AT_` 开头，依次拼接版本号与编译日期。 |

</div>

#### 查询设备名 { #query-device-name }

<div align="center"><em>表：查询设备名</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+NAME?\r` |
| 响应 | `\r\n+NAME:<device name>\r\n\r\nOK\r\n` |
| 参数 | 无 |
| 备注 | 返回当前配置的设备名（不含 MAC 后缀，MAC 后缀仅影响对外广播显示名）。 |

</div>

#### 设置设备名 { #set-device-name }

<div align="center"><em>表：设置设备名</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+NAME=<device name>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | 设备名：设备名称字符串，长度 1~29 字节；为空或超过 29 字节返回 `ERROR`。默认值 `SIFLI_AT`。 |
| 备注 | 设置后更新设备名配置，并同步更新本地名称及 BLE 扫描响应中的名称。最终对外显示的设备名由 `MACNAME` 控制。 |

</div>

#### 查询名称附加 MAC 后缀设置 { #query-mac-name-suffix-switch }

<div align="center"><em>表：查询名称附加 MAC 后缀设置</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+MACNAME?\r` |
| 响应 | `\r\n+MACNAME:<value>\r\n\r\nOK\r\n` |
| 参数 | 无 |
| 备注 | 返回当前设置状态：0=不附加后缀，1=附加后缀。 |

</div>

#### 设置是否附加 MAC 名称后缀 { #set-mac-name-suffix-switch }

<div align="center"><em>表：设置是否附加 MAC 名称后缀</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+MACNAME=<value>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | 值：0=对外显示名直接使用设备名；1=在设备名后追加 `-XXXX` 后缀（XXXX 为本机 BD_ADDR 最后两个字节的大写十六进制）。取值范围 0~1。默认值 0。 |
| 备注 | 设置后更新配置。开启时若设备名加后缀超过显示名长度上限（29 字节），设备名部分会被截断以容纳 5 字节后缀。 |

</div>

#### 查询 IEEE 1284 设备 ID { #query-ieee-1284-device-id }

<div align="center"><em>表：查询 IEEE 1284 设备 ID</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+1284ID?\r` |
| 响应 | `\r\n+1284ID:<ID string>\r\n\r\nOK\r\n` |
| 参数 | 无 |
| 备注 | 返回当前配置的 IEEE 1284 设备 ID 字符串；未配置时为空字符串。 |

</div>

#### 设置 IEEE 1284 设备 ID { #set-ieee-1284-device-id }

<div align="center"><em>表：设置 IEEE 1284 设备 ID</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+1284ID=<ID string>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | ID 字符串：IEEE 1284 设备 ID 字符串，长度须小于存储缓冲区容量，超长返回 `ERROR`。默认值为空字符串。 |
| 备注 | 设置后更新配置。 |

</div>

#### 重启设备 { #reset-device }

<div align="center"><em>表：重启设备</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+RESET\r` |
| 响应 | 成功：`\r\nOK\r\n`；查询形式（`AT+RESET?\r`）：`\r\nERROR\r\n` |
| 参数 | 无 |
| 备注 | 收到命令后保存当前 AT 配置，回复 `OK`，随后停止广播、断开连接并软复位重启设备。本命令不修改配置。 |

</div>

#### 恢复出厂设置 { #factory-reset }

<div align="center"><em>表：恢复出厂设置</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+FACTORYRESET\r` |
| 响应 | 成功：`\r\nOK\r\n`；查询形式（`AT+FACTORYRESET?\r`）：`\r\nERROR\r\n` |
| 参数 | 无 |
| 备注 | 恢复 AT 配置默认值，清除自定义 GATT 服务配置、BLE 配对绑定、BR/EDR 经典蓝牙配对绑定和 BLE 静态随机地址，然后回复 `OK` 并重启设备。主机应在重启后等待 `IM_READY`。 |

</div>

#### 配置复位 { #configuration-reset }

<div align="center"><em>表：配置复位</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+CFGRESET\r` |
| 响应 | 成功：`\r\nOK\r\n`；查询形式（`AT+CFGRESET?\r`）：`\r\nERROR\r\n` |
| 参数 | 无 |
| 备注 | 恢复 AT 配置和已保存的自定义 GATT 配置，然后回复 `OK` 并重启设备；配对记录和当前 BLE 地址保留。 |

</div>

#### 进入 OTA 升级模式 { #enter-ota-upgrade-mode }

<div align="center"><em>表：进入 OTA 升级模式</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+OTA\r` |
| 响应 | 成功：`\r\nOK\r\n`（随后进入 DFU 模式并复位，不再返回）；查询形式（`AT+OTA?\r`）：`\r\nERROR\r\n` |
| 参数 | 无 |
| 备注 | 先保存当前 AT 配置，回复 `OK`，随后写入 DFU 标志并复位进入串口 DFU 升级模式。 |

</div>

#### 查询频偏校准值 { #query-frequency-offset-calibration }

<div align="center"><em>表：查询频偏校准值</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+TRIM?\r` |
| 响应 | `\r\n+TRIM:<freq_off>\r\n\r\nOK\r\n` |
| 参数 | `freq_off`：当前记录的频偏校准值，单位 Hz。 |
| 备注 | 返回的是 AT 配置中记录的回显值；实际生效值保存在 `FACTORY_CFG_ID_CRYSTAL` 分区。 |

</div>

#### 设置频偏校准值 { #set-frequency-offset-calibration }

<div align="center"><em>表：设置频偏校准值</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+TRIM=<freq_off>\r` |
| 响应 | 成功：`\r\nOK\r\n`；取值越界或校准接口返回失败：`\r\nERROR\r\n` |
| 参数 | `freq_off`：频偏校准值，单位 Hz，取值范围 -120000~120000，默认值 0。取值为 0 时执行校准复位（恢复硬件/产线原始值）；非零值则直接按指定值设置。 |
| 备注 | 设置时修改 HXT 电容组寄存器，并将结果写入 `FACTORY_CFG_ID_CRYSTAL` 分区。校准成功后，更新 AT 配置中记录的回显值并标记保存。 |

</div>

#### 进入被测设备（DUT）测试模式 { #enter-dut-test-mode }

<div align="center"><em>表：进入 DUT 测试模式</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+DUT\r` |
| 响应 | 成功：`\r\nOK\r\n`；查询形式（`AT+DUT?\r`）：`\r\nERROR\r\n` |
| 参数 | 无 |
| 备注 | 置位 BR/EDR 经典蓝牙 DUT 使能位并回复 `OK`，随后等待综测仪通过空口发送 `LMP_test_control` 触发信令测试。AT 串口（USART1）保持可用。进入 DUT 模式后不可逆，只能通过复位退出。 |

</div>

### 地址与标识 { #address-and-identity }

#### 查询蓝牙地址 { #query-bluetooth-address }

<div align="center"><em>表：查询蓝牙地址</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+LBDADDR?\r` |
| 响应 | 成功：`\r\n+LBDADDR:<addr>\r\n\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `addr`：返回当前公有蓝牙地址，12 位十六进制字符（大写，无分隔符），高字节在前，例如 `001583112233`。 |
| 备注 | 返回固件读取到的公有地址；读取失败时返回 `ERROR`。 |

</div>

#### 设置蓝牙地址 { #set-bluetooth-address }

<div align="center"><em>表：设置蓝牙地址</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+LBDADDR=<addr>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `addr`：要设置的蓝牙地址，必须为 12 位十六进制字符（无分隔符），高字节在前，例如 `001583112233`。长度必须恰为 12 位十六进制字符。 |
| 备注 | 地址写入配置并保存。重启后生效。出厂默认为全 0，表示由芯片 UID 自动生成。 |

</div>

#### 查询 BLE 地址 { #query-ble-address }

<div align="center"><em>表：查询 BLE 地址</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+BLEADDR?\r` |
| 响应 | 成功：`\r\n+BLEADDR:<addr>\r\n\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `addr`：返回当前 BLE 使用的地址，12 位十六进制字符（大写，无分隔符），高字节在前。 |
| 备注 | 若已通过 `AT+RANDOMADDR=1` 生成 BLE 专用静态随机地址，则返回该静态随机地址；否则返回与蓝牙地址相同的公有地址。读取失败时返回 `ERROR`。 |

</div>

#### 设置 BLE 地址 { #set-ble-address }

<div align="center"><em>表：设置 BLE 地址</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+BLEADDR=<addr>\r` |
| 响应 | `\r\nERROR\r\n` |
| 参数 | 无 |
| 备注 | 该命令不接受直接设置 BLE 地址，调用即返回 `ERROR`。BLE 静态随机地址通过 `AT+RANDOMADDR=1` 生成。 |

</div>

#### 查询 BLE 随机地址使用设置 { #query-ble-random-address-switch }

<div align="center"><em>表：查询 BLE 随机地址使用设置</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+RANDOMADDR?\r` |
| 响应 | `\r\n+RANDOMADDR:<n>\r\n\r\nOK\r\n` |
| 参数 | `n`：当前设置值，0=BLE 使用公有地址，1=BLE 使用静态随机地址。 |
| 备注 | 无 |

</div>

#### 设置 BLE 随机地址使用方式 { #set-ble-random-address-switch }

<div align="center"><em>表：设置 BLE 随机地址使用方式</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+RANDOMADDR=<n>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `n`：0 或 1。1=启用 BLE 静态随机地址，由公有地址推导生成（将公有地址最高字节的高两位置 1，例如公有 `001583112233` 推导为 BLE `C01583112233`）；0=BLE 改用公有地址。其他取值或多余字符返回 `ERROR`。默认值为 0。 |
| 备注 | 命令会更新配置。设为 1 后，如果读取公有地址失败，设置值会回退为 0 并返回 `ERROR`。地址变更会写入 NVDS，重启后生效。再次执行 `AT+RANDOMADDR=1` 时，会根据未改变的公有地址生成相同的随机地址。 |

</div>

#### 查询设备类别（Class of Device） { #query-class-of-device }

<div align="center"><em>表：查询设备类别（Class of Device）</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+CLASS?\r` |
| 响应 | 成功：`\r\n+CLASS:<cod>\r\n\r\nOK\r\n`（`<cod>` 为 6 位大写十六进制） |
| 参数 | `cod`：当前设备类别（Class of Device），固定输出 6 位十六进制（取低 24 位，`%06X` 格式，不足前补 0） |
| 备注 | 返回当前设备类别（Class of Device）值。 |

</div>

#### 设置设备类别（Class of Device） { #set-class-of-device }

<div align="center"><em>表：设置设备类别（Class of Device）</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+CLASS=<cod>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `cod`：设备类别，十六进制字符串（按 `%X` 解析）。取值范围 0~FFFFFF（24 位）。默认值 `000000`。 |
| 备注 | 设置设备类别并更新配置；解析时仅保留低 24 位。 |

</div>

### 工作模式与可见性 { #operating-mode-and-visibility }

#### 查询可被发现状态 { #query-discoverable-state }

<div align="center"><em>表：查询可被发现状态</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+DISCOVERABLE?\r` |
| 响应 | 成功：`\r\n+DISCOVERABLE:<state>\r\n\r\nOK\r\n` |
| 参数 | `state`：当前可被发现状态。0=不可被发现，1=可被发现，2=部分可被发现（混合状态）。含义随工作模式而定：BLE 模式（`BTMODE=1`）反映 BLE 广播设置，1=开启，0=关闭；BT 模式（`BTMODE=2`）反映查询扫描（inquiry scan）和分页扫描（page scan）的状态，二者均开为 1，均关为 0，其余为 2；双模（`BTMODE=0`）下，BLE 广播、查询扫描和分页扫描均开为 1，均关为 0，其余为 2。 |
| 备注 | 仅查询当前可被发现状态，不改变设备状态。 |

</div>

#### 设置可被发现状态 { #set-discoverable-state }

<div align="center"><em>表：设置可被发现状态</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+DISCOVERABLE=<mode>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `mode`：0=关闭可被发现，1=开启可被发现。 |
| 备注 | 命令按当前工作模式生效：BLE 模式（`BTMODE=1`）下控制 BLE 广播；BT 模式（`BTMODE=2`）下控制查询扫描（inquiry scan）和分页扫描（page scan）；双模（`BTMODE=0`）下同时控制上述三项。 |

</div>

#### 查询 GATT 广播状态 { #query-gatt-advertising-state }

<div align="center"><em>表：查询 GATT 广播状态</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTDISCOVER?\r` |
| 响应 | 成功：`\r\n+GATTDISCOVER:<state>\r\n\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `state`：BLE 广播当前是否处于空口发射状态。0=未广播，1=正在广播。 |
| 备注 | 返回 BLE 广播当前的实际发送状态。当工作模式为仅 BT（`BTMODE=2`）时，该命令不可用并返回 `ERROR`。 |

</div>

#### 设置 GATT 广播 { #set-gatt-advertising }

<div align="center"><em>表：设置 GATT 广播</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTDISCOVER=<value>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `value`：0=停止 BLE 广播，1=启动 BLE 广播。 |
| 备注 | 直接控制 BLE 广播的启动与停止。当工作模式为 BT 模式（`BTMODE=2`）时该命令不可用。 |

</div>

#### 查询 SPP 可被发现状态 { #query-spp-discoverable-state }

<div align="center"><em>表：查询 SPP 可被发现状态</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+SPPDISCOVER?\r` |
| 响应 | `\r\n+SPPDISCOVER:<state>\r\n\r\nOK\r\n` |
| 参数 | `<state>`：当前查询扫描（inquiry scan）状态，用于控制设备可被发现。0=关闭，1=开启。 |
| 备注 | 当 `AT+BTMODE` 为 1（仅 BLE）时返回 `ERROR`。 |

</div>

#### 设置 SPP 可被发现状态 { #set-spp-discoverable-state }

<div align="center"><em>表：设置 SPP 可被发现状态</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+SPPDISCOVER=<state>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `<state>`：查询扫描（inquiry scan）设置，用于控制设备是否可被发现。0=关闭，1=开启。 |
| 备注 | 当 `AT+BTMODE` 为 1（仅 BLE）时返回 `ERROR`。仅改变查询扫描位，保持分页扫描（page scan）位不变。 |

</div>

#### 查询 SPP 可被连接状态 { #query-spp-connectable-state }

<div align="center"><em>表：查询 SPP 可被连接状态</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+SPPCONNECT?\r` |
| 响应 | `\r\n+SPPCONNECT:<state>\r\n\r\nOK\r\n` |
| 参数 | `<state>`：当前分页扫描（page scan）状态，用于控制设备可被连接。0=关闭，1=开启。 |
| 备注 | 当 `AT+BTMODE` 为 1（仅 BLE）时返回 `ERROR`。 |

</div>

#### 设置 SPP 可被连接状态 { #set-spp-connectable-state }

<div align="center"><em>表：设置 SPP 可被连接状态</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+SPPCONNECT=<state>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `<state>`：分页扫描（page scan）设置，用于控制设备是否可被连接。0=关闭，1=开启。 |
| 备注 | 当 `AT+BTMODE` 为 1（仅 BLE）时返回 `ERROR`。仅改变分页扫描位，保持查询扫描（inquiry scan）位不变。 |

</div>

#### 查询蓝牙工作模式 { #query-bluetooth-operating-mode }

<div align="center"><em>表：查询蓝牙工作模式</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+BTMODE?\r` |
| 响应 | `\r\n+BTMODE:<mode>\r\n\r\nOK\r\n` |
| 参数 | `mode`：当前蓝牙工作模式。0=双模（BLE+BT），1=仅 BLE，2=仅 BT。 |
| 备注 | 无 |

</div>

#### 设置蓝牙工作模式 { #set-bluetooth-operating-mode }

<div align="center"><em>表：设置蓝牙工作模式</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+BTMODE=<mode>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `mode`：蓝牙工作模式。0=双模（BLE+BT），1=仅 BLE，2=仅 BT；取值范围 0~2。默认值 0（双模）。 |
| 备注 | 设置值更新配置，重启后生效。 |

</div>

#### 查询命令模式 { #query-command-mode }

<div align="center"><em>表：查询命令模式</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+COMMAND?\r` |
| 响应 | `\r\n+COMMAND:<mode>\r\n\r\nOK\r\n` |
| 参数 | `mode`：当前工作模式。0=透传模式，1=命令模式。 |
| 备注 | 无 |

</div>

#### 设置命令模式 { #set-command-mode }

<div align="center"><em>表：设置命令模式</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+COMMAND=<mode>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `mode`：工作模式。0=透传模式，1=命令模式。设备上电后默认进入透传模式。 |
| 备注 | 立即生效，不写入持久化配置，重启后回到透传模式。透传模式下串口收到的数据按透传方式转发给已连接的对端；命令模式下串口数据按 AT 命令解析。 |

</div>

### 配对与安全 { #pairing-and-security }

#### 清除配对信息 { #clear-pairing-information }

<div align="center"><em>表：清除配对信息</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+CLEARLINKKEY\r` |
| 响应 | 成功：`\r\nOK\r\n`；查询形式 `AT+CLEARLINKKEY?\r`：`\r\nERROR\r\n` |
| 参数 | 无参数。 |
| 备注 | 清除 BLE 绑定信息和经典蓝牙 link key。命令成功后设备会重启；设备名、波特率、COD 等 AT 配置保留。主机应在重启后等待 `IM_READY`。不支持查询形式。 |

</div>

### 串口与事件 { #serial-port-and-events }

#### 查询串口波特率 { #query-serial-baud-rate }

<div align="center"><em>表：查询串口波特率</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+BAUD?\r` |
| 响应 | `\r\n+BAUD:<baud_rate>\r\n\r\nOK\r\n` |
| 参数 | `baud_rate`：当前配置的波特率，单位 bps。 |
| 备注 | 设置波特率后重启设备，新的串口波特率在重启后生效。 |

</div>

#### 设置串口波特率 { #set-serial-baud-rate }

<div align="center"><em>表：设置串口波特率</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+BAUD=<baud_rate>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `baud_rate`：串口波特率，单位 bps。可使用 38400、57600、115200、230400、460800、921600、1000000。默认值 460800。 |
| 备注 | 设置值更新配置。 |

</div>

#### 查询事件上报设置 { #query-event-reporting-switch }

<div align="center"><em>表：查询事件上报设置</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+EVT?\r` |
| 响应 | `\r\n+EVT:<evt_silent>\r\n\r\nOK\r\n` |
| 参数 | `evt_silent`：事件上报设置值。0=正常上报，1=启用静默模式（不再上报事件）。 |
| 备注 | 无 |

</div>

#### 设置事件上报方式 { #set-event-reporting-switch }

<div align="center"><em>表：设置事件上报方式</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+EVT=<evt_silent>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `evt_silent`：事件上报设置值。0=正常上报 `IM_CONN`/`IM_DISCONN`/`IM_READY` 等事件，1=抑制所有事件通知。默认值为 0（正常上报）。 |
| 备注 | 设置值会更新配置。置 1 后，连接建立、断开及就绪事件均不会通过串口输出。 |

</div>

#### 查询透传空闲断连时间 { #query-pass-through-idle-disconnect-time }

<div align="center"><em>表：查询透传空闲断连时间</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+IDLE?\r` |
| 响应 | `\r\n+IDLE:<idle_ms>\r\n\r\nOK\r\n` |
| 参数 | `idle_ms`：当前空闲断连超时时间，单位毫秒。 |
| 备注 | 无 |

</div>

#### 设置透传空闲断连时间 { #set-pass-through-idle-disconnect-time }

<div align="center"><em>表：设置透传空闲断连时间</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+IDLE=<idle_ms>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `idle_ms`：透传空闲断连超时时间，单位毫秒，取值范围 0~65535；超过 65535 返回 `ERROR`。0 表示关闭空闲断连功能。默认值 0（关闭）。 |
| 备注 | 设置值更新配置。仅在透传模式下生效：当处于透传模式且串口距上一次收到数据已超过 `idle_ms` 毫秒时，若当前存在连接则断开全部连接；`idle_ms` 为 0 时不触发。 |

</div>

### 连接管理 { #connection-management }

#### 查询多连接设置 { #query-multi-connection-switch }

<div align="center"><em>表：查询多连接设置</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+MULTICONN?\r` |
| 响应 | `\r\n+MULTICONN:<n>\r\n\r\nOK\r\n` |
| 参数 | `<n>`：多连接全局设置值。0=关闭（全局单连接）；1=开启（按各传输上限并发）。 |
| 备注 | 无 |

</div>

#### 设置多连接功能 { #set-multi-connection-switch }

<div align="center"><em>表：设置多连接功能</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+MULTICONN=<n>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `<n>`：0=关闭多连接；1=开启多连接。取值为 0 或 1。默认值 1。 |
| 备注 | 设置后更新配置。关闭多连接时限制并发连接能力；开启多连接时按 `AT+BLEMULTICONN`、`AT+BTMULTICONN` 的配置工作。 |

</div>

#### 查询最大 BLE 并发连接数 { #query-maximum-ble-concurrent-connections }

<div align="center"><em>表：查询最大 BLE 并发连接数</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+BLEMULTICONN?\r` |
| 响应 | 成功：`\r\n+BLEMULTICONN:<n>\r\n\r\nOK\r\n`；多连接关闭时：`\r\nERROR\r\n` |
| 参数 | `<n>`：当前配置的最大 BLE 并发连接数，十进制。 |
| 备注 | 仅在全局多连接已启用（`AT+MULTICONN=1`）时可查询；未启用时返回 `ERROR`。 |

</div>

#### 设置最大 BLE 并发连接数 { #set-maximum-ble-concurrent-connections }

<div align="center"><em>表：设置最大 BLE 并发连接数</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+BLEMULTICONN=<n>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `<n>`：最大 BLE 并发连接数，十进制，取值范围 1~6。默认值 3。 |
| 备注 | 仅在全局多连接已启用（`AT+MULTICONN=1`）时可设置。命令会更新配置；连接数达到上限后停止广播（不再接受新连接）。连接断开、连接数降至上限以下后，广播会自动恢复。 |

</div>

#### 查询最大经典蓝牙并发连接数 { #query-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>表：查询最大经典蓝牙并发连接数</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+BTMULTICONN?\r` |
| 响应 | 成功：`\r\n+BTMULTICONN:<n>\r\n\r\nOK\r\n`；多连接关闭时：`\r\nERROR\r\n` |
| 参数 | `<n>`：当前配置的最大经典蓝牙（BR/EDR）并发连接数，十进制。 |
| 备注 | 仅在全局多连接已启用（`AT+MULTICONN=1`）时可查询；未启用时返回 `ERROR`。 |

</div>

#### 设置最大经典蓝牙并发连接数 { #set-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>表：设置最大经典蓝牙并发连接数</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+BTMULTICONN=<n>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `<n>`：最大经典蓝牙并发连接数，十进制，取值范围 1~7。默认值 7。 |
| 备注 | 仅在全局多连接已启用（`AT+MULTICONN=1`）时可设置。命令会更新配置；连接数达到上限时，模组会停止分页扫描（page scan），连接数降至上限以下后自动恢复。 |

</div>

#### 断开连接 { #disconnect }

<div align="center"><em>表：断开连接</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | 断开单个：`AT+DISCONN=<conn_hdl>\r`；断开全部：`AT+DISCONN\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败或未找到：`\r\nERROR\r\n` |
| 参数 | `<conn_hdl>`：连接句柄，十六进制。BLE 连接句柄为从 1 开始编号的外部句柄（与 `AT+CONNLIST` 返回的句柄一致）；BT 连接使用其 ACL 句柄。`<conn_hdl>` 为 0 视为非法输入，返回 `ERROR`。 |
| 备注 | 不带参数（或参数为空）时断开所有活动链路（BLE 与 BR/EDR）并返回 `OK`。带参数时按句柄查找：优先按 BLE 外部句柄（内部句柄 = `<conn_hdl>`-1）匹配，未命中再按 BT ACL 原始句柄匹配；找不到对应连接返回 `ERROR`。查询形式 `AT+DISCONN?` 返回 `ERROR`。 |

</div>

#### 查询连接列表 { #query-connection-list }

<div align="center"><em>表：查询连接列表</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+CONNLIST?\r` 或 `AT+CONNLIST\r` |
| 响应 | 每条活动连接输出一行 `\r\n+CONNLIST:<conn_hdl>,<type>,<addr>,<extra>\r\n`；全部输出后 `\r\nOK\r\n`；无活动连接时仅返回 `\r\nOK\r\n`；带非空参数：`\r\nERROR\r\n` |
| 参数 | 输出字段：`<conn_hdl>`——连接句柄，4 位十六进制；BLE 使用从 1 开始编号的外部句柄。`<type>`——连接类型，BLE 或 BT。`<addr>`——对端蓝牙地址，12 位十六进制（高字节在前）。`<extra>`——BLE 连接为当前 MTU，BT 连接为服务通道，十进制。 |
| 备注 | 以设置形式传入非空参数时返回 `ERROR`。模组遍历所有连接槽位，并输出每条活动连接。 |

</div>

### 数据收发 { #data-transfer }

#### 查询 BLE MTU { #query-ble-mtu }

<div align="center"><em>表：查询 BLE MTU</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GMTU?\r` |
| 响应 | 成功：`\r\n+GMTU:<mtu>\r\n\r\nOK\r\n` |
| 参数 | `mtu`：当前配置的 BLE MTU 上限值，十进制。 |
| 备注 | 无 |

</div>

#### 设置 BLE MTU { #set-ble-mtu }

<div align="center"><em>表：设置 BLE MTU</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GMTU=<mtu>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nFALSE\r\n` |
| 参数 | `mtu`：BLE MTU 上限值，十进制，取值范围 23~1024，超出范围返回 `FALSE`。默认值 247。 |
| 备注 | 该值为 MTU 协商的上限设置。 |

</div>

#### SPP 数据发送 { #send-spp-data }

<div align="center"><em>表：SPP 数据发送</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+SPPSEND=<conn_hdl>,<data>\r` 或 `AT+SPPSEND=,<data>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `conn_hdl`：目标 BT 连接句柄，十六进制。可省略或填 0，此时使用当前第一个活动 BT 连接。`data`：待发送数据，十六进制字符串，每两个字符表示一个字节，不能为空且字符数须为偶数。ASCII AT 帧的实际数据长度还受单条 AT 帧上限约束。 |
| 备注 | `conn_hdl` 与 `data` 之间以逗号分隔；省略 `conn_hdl` 时仍需保留逗号。不支持查询形式。 |

</div>

### 自定义 GATT { #custom-gatt }

#### 查询自定义 GATT 服务列表 { #query-custom-gatt-service-list }

<div align="center"><em>表：查询自定义 GATT 服务列表</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTSRV?\r` |
| 响应 | 对每个已配置的服务依次返回一行 `\r\n+GATTSRV:<idx>,<char_count>,<state>\r\n`，最后返回 `\r\nOK\r\n`。无已配置服务时仅返回 `\r\nOK\r\n` |
| 参数 | `idx`：服务槽位编号，取值 0~5。`char_count`：该服务已配置的特征数量。`state`：`REG` 表示已注册到协议栈，`CFG` 表示仅在 RAM 中配置、尚未注册 |
| 备注 | 仅列出处于占用状态的服务槽位 |

</div>

#### 创建自定义 GATT 服务 { #create-custom-gatt-service }

<div align="center"><em>表：创建自定义 GATT 服务</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTSRV=<idx>,<uuid>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `idx`：服务槽位编号，取值 0~5。`uuid`：服务 UUID，按 MSB 在前的十六进制字符串输入，4 个字符表示 16 位 UUID，32 个字符表示 128 位 UUID |
| 备注 | `idx` 必须为单个数字且其后紧跟逗号。UUID 长度只能为 4 或 32 个字符，其它长度返回 `ERROR`。若该槽位已注册到协议栈，则不能重新配置，创建返回 `ERROR`。创建会清空该槽位原有配置 |

</div>

#### 删除自定义 GATT 服务 { #delete-custom-gatt-service }

<div align="center"><em>表：删除自定义 GATT 服务</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTSRV=<idx>,DEL\r` |
| 响应 | `\r\nOK\r\n` |
| 参数 | `idx`：服务槽位编号，取值 0~5 |
| 备注 | 清除该槽位在 RAM 中的配置。已注册到协议栈的服务无法在运行期撤销，此命令仅清除 RAM 配置 |

</div>

#### 查询自定义 GATT 特征列表 { #query-custom-gatt-characteristic-list }

<div align="center"><em>表：查询自定义 GATT 特征列表</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTCHAR?<svc>\r` |
| 响应 | 对该服务的每个特征依次返回一行 `\r\n+GATTCHAR:<svc>,<chr>,prop=0x<prop>,len=<max_len>\r\n`，最后返回 `\r\nOK\r\n`；服务不存在：`\r\nERROR\r\n` |
| 参数 | `svc`：服务槽位编号，取值 0~5。`chr`：特征索引。`prop`：特征属性位的十六进制值。`max_len`：特征值最大长度 |
| 备注 | 无 |

</div>

#### 添加自定义 GATT 特征 { #add-custom-gatt-characteristic }

<div align="center"><em>表：添加自定义 GATT 特征</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTCHAR=<svc>,<chr>,<uuid>,<prop>,<len>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `svc`：服务槽位编号，取值 0~5。`chr`：特征索引，取值 0~7。`uuid`：特征 UUID，按 MSB 在前输入，4 个字符为 16 位、32 个字符为 128 位。`prop`：属性字符串，由字符 R（读）、W（写，需响应）、w（写，无响应）、N（通知）、I（指示）组合而成。`len`：特征值最大长度，取值 1~512 |
| 备注 | 五个参数缺一不可，否则返回 `ERROR`。UUID 长度只能为 4 或 32 个字符。`prop` 必须至少包含一个有效属性字符，未识别出任何属性返回 `ERROR`；`prop` 中无法识别的字符被忽略。`len` 为 0 或大于 512 返回 `ERROR`。所属服务必须已创建且尚未注册到协议栈 |

</div>

#### 启动（注册）自定义 GATT 服务 { #start-register-custom-gatt-services }

<div align="center"><em>表：启动（注册）自定义 GATT 服务</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTSTART\r` |
| 响应 | `\r\n+GATTSTART:<count>\r\n` 随后 `\r\nOK\r\n`；查询形式 `AT+GATTSTART?\r`：`\r\nERROR\r\n` |
| 参数 | `count`：本次成功注册到协议栈的服务数量 |
| 备注 | 将所有处于占用、尚未注册且至少含一个特征的服务注册到协议栈。服务一经注册即无法在运行期撤销或重新配置。不支持查询形式 |

</div>

#### 发送 GATT 特征数据（通知/指示） { #send-gatt-characteristic-data-notifyindicate }

<div align="center"><em>表：发送 GATT 特征数据（通知/指示）</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTSEND=<svc>,<chr>,<conn_hdl>,<hex>\r`；省略连接句柄：`AT+GATTSEND=<svc>,<chr>,,<hex>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n`；查询形式 `AT+GATTSEND?\r`：`\r\nERROR\r\n` |
| 参数 | `svc`：服务槽位编号。`chr`：特征索引。`conn_hdl`：BLE 连接句柄，十六进制，从 1 开始计数，可省略。`hex`：待发送数据，十六进制字符串，字符数须为偶数；ASCII AT 帧的实际数据长度受单条 AT 帧上限约束。 |
| 备注 | 省略 `conn_hdl` 时使用当前第一个 BLE 连接。目标服务须已注册，特征索引须有效；特征属性含指示（I）时使用指示，否则使用通知。 |

</div>

#### 保存自定义 GATT 配置到 Flash { #save-custom-gatt-configuration-to-flash }

<div align="center"><em>表：保存自定义 GATT 配置到 Flash</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTSTORE\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n`；查询形式 `AT+GATTSTORE?\r`：`\r\nERROR\r\n` |
| 参数 | 无 |
| 备注 | 将当前所有服务与特征配置持久化到 Flash。仅保存配置数据，注册状态等运行期信息不保存。KVDB 未就绪或写入失败返回 `ERROR`。不支持查询形式 |

</div>

#### 清除 Flash 中的自定义 GATT 配置 { #clear-custom-gatt-configuration-in-flash }

<div align="center"><em>表：清除 Flash 中的自定义 GATT 配置</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTCLEAR\r` |
| 响应 | 成功：`\r\nOK\r\n`；查询形式 `AT+GATTCLEAR?\r`：`\r\nERROR\r\n` |
| 参数 | 无 |
| 备注 | 删除 Flash 中保存的 GATT 配置项。不影响当前 RAM 中的配置。不支持查询形式。 |

</div>

#### 查询 GATT 服务上电自动加载设置 { #query-gatt-auto-load-on-power-up-switch }

<div align="center"><em>表：查询 GATT 服务上电自动加载设置</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTAUTOSTART?\r` |
| 响应 | `\r\n+GATTAUTOSTART:<v>\r\n\r\nOK\r\n` |
| 参数 | `v`：当前设置值，0=关闭，1=开启。默认值为 1。 |
| 备注 | 无 |

</div>

#### 设置 GATT 服务上电自动加载方式 { #set-gatt-auto-load-on-power-up-switch }

<div align="center"><em>表：设置 GATT 服务上电自动加载方式</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+GATTAUTOSTART=<v>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `v`：0=关闭，1=开启。默认值为 1。 |
| 备注 | 设置后更新配置。开启时，设备会在上电后自动加载已保存的 GATT 服务配置。 |

</div>

## 主动上报事件（URC） { #unsolicited-events-urc }

以下为模组主动发出的状态通知（URC），主机无需下发命令即可接收。通知由 `AT+EVT` 控制；启用静默模式后，不再输出这些事件。

### IM_READY 就绪通知 { #im_ready-ready-indication }

<div align="center"><em>表：IM_READY 就绪通知</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | 无（由固件主动上报，非用户下发） |
| 响应 | 上报字符串：`\r\nIM_READY\r\n` |
| 参数 | 无 |
| 备注 | 模组完成初始化并进入可用状态时会主动上报一次；当所有连接断开、连接数归零后也会再次上报。是否输出由 `AT+EVT` 控制；设置为 `AT+EVT=1` 后，这些通知会被抑制。 |

</div>

### IM_CONN 连接指示 { #im_conn-connection-indication }

<div align="center"><em>表：IM_CONN 连接指示</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | 无（连接建立时由固件主动上报） |
| 响应 | 命令模式：`\r\nIM_CONN <hdl>,<addr>,<mtu>\r\n`；透传模式：`\r\nIM_CONN\r\n` |
| 参数 | `hdl`：连接句柄，4 位十六进制（大写、固定 4 位、不足补 0）。BLE 连接对外显示的句柄从 1 开始编号（内部 0 起始句柄加 1），其他类型显示原始值。`addr`：对端地址，12 位十六进制，MSB 在前（高字节先出）。`mtu`：当前连接的 MTU，十进制。 |
| 备注 | 命令模式下，每建立一条连接就会上报一次，并携带句柄、对端地址和 MTU。透传模式下，仅在首条连接建立时（连接数为 1）上报，且不带参数。是否输出由 `AT+EVT` 控制；设置为 `AT+EVT=1` 后，这些通知会被抑制。 |

</div>

### IM_DISCONN 断开指示 { #im_disconn-disconnect-indication }

<div align="center"><em>表：IM_DISCONN 断开指示</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | 无（连接断开时由固件主动上报） |
| 响应 | 命令模式：`\r\nIM_DISCONN:<hdl>\r\n` |
| 参数 | `hdl`：断开的连接句柄，4 位十六进制（大写、固定 4 位、不足补 0）。BLE 连接对外显示的句柄从 1 开始编号（原始句柄加 1），其他类型显示原始值。 |
| 备注 | 该通知仅在命令模式下输出，并携带句柄；透传模式下不输出此通知。无论处于哪种模式，当所有连接断开、连接数归零后，模组还会额外上报 `\r\nIM_READY\r\n`。是否输出由 `AT+EVT` 控制；设置为 `AT+EVT=1` 后，这些通知会被抑制。 |

</div>

## PDU 格式命令 { #pdu-format-commands }

### PDU 数据上报（opcode 0x0101） { #pdu-data-report-opcode-0x0101 }

<div align="center"><em>表：PDU 数据上报（模组 → 主机，opcode 0x0101）</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | 无（由固件在命令模式下主动上报） |
| 响应 | `\r\n< + opcode(2-byte little-endian) + len(2-byte little-endian) + body + \r\n` |
| 参数 | `opcode` 固定为 `0x0101`；`body` = `conn_hdl`（2 字节小端） + `data`。BLE 连接使用从 1 开始编号的外部句柄，SPP 连接使用原始 ACL 句柄。 |
| 备注 | 命令模式下，BLE 自定义特征写入数据或经典蓝牙 SPP 收到数据时，模组按上述格式向主机上报；透传模式下直接输出数据。 |

</div>

### PDU 模式发送数据（自动选择通知特征，opcode 0x0101） { #pdu-mode-send-data-auto-select-notify-characteristic-opcode-0x0101 }

<div align="center"><em>表：PDU 模式发送数据（自动选择通知特征，opcode 0x0101）</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | 二进制帧（非文本 AT 行）：`AT>` + opcode（2 字节小端） + len（2 字节小端） + body + `\r`。其中 opcode = `0x0101`（字节序列 01 01）；len 为 body 字节数；body = `conn_hdl`（2 字节小端） + `data`。`data` 为待发送的有效负载。 |
| 响应 | 无文本应答串。固件按连接类型把 `data` 透传给对端，不回 `OK`/`ERROR`。 |
| 参数 | `opcode`：固定 `0x0101`。`len`：body 长度，取值范围 2~508（小于 2 或大于 `AT_RX_BUF_SIZE`-4 的帧被丢弃；`AT_RX_BUF_SIZE`=512）。`conn_hdl`：目标连接句柄；BLE 连接使用从 1 开始编号的外部句柄，SPP 连接使用原始 ACL 句柄。`data`：有效负载字节，长度 = len-2，可为 0。 |
| 备注 | `conn_hdl` 解析顺序：先按从 1 开始编号的 BLE 句柄查找（即用 `conn_hdl`-1 命中 BLE 槽），未命中再按原始值查找 SPP 槽；查不到连接则丢弃该帧。当目标为 BLE 连接时，固件遍历自定义 GATT 服务，自动选用第一个带 Notify 或 Indicate 属性的特征发送；找不到此类特征则不发送。当目标为 SPP（BR/EDR）连接时，`data` 经 SPP 通道发送。帧尾必须紧跟 `\r`，缺失则丢弃当前帧。帧间若超过 PDU 超时阈值无新字节，PDU 接收状态会被复位。 |

</div>

### PDU 模式发送数据（指定服务与特征，opcode 0x0102） { #pdu-mode-send-data-specify-service-and-characteristic-opcode-0x0102 }

<div align="center"><em>表：PDU 模式发送数据（指定服务与特征，opcode 0x0102）</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | 二进制帧（非文本 AT 行）：`AT>` + opcode（2 字节小端） + len（2 字节小端） + body + `\r`。其中 opcode = `0x0102`（字节序列 02 01）；len 为 body 字节数；body = `conn_hdl`（2 字节小端） + `svc_idx`（1 字节） + `char_idx`（1 字节） + `data`。 |
| 响应 | 无文本应答串。固件按指定服务/特征把 `data` 发往对端，不回 `OK`/`ERROR`。 |
| 参数 | `opcode`：固定 `0x0102`。`len`：body 长度，取值范围 4~508（接收层统一门限为 2，本 opcode 要求 body 不少于 4 字节，含 `svc_idx`+`char_idx`），否则丢弃。`conn_hdl`：目标 BLE 连接句柄，使用从 1 开始编号的外部值。`svc_idx`：自定义 GATT 服务索引。`char_idx`：该服务内的特征索引。`data`：有效负载字节，长度 = len-4，可为 0。 |
| 备注 | 仅支持 BLE 连接；若解析到的连接为 SPP 类型则丢弃。`svc_idx` 必须对应一个已注册的自定义服务，`char_idx` 必须小于该服务的特征数量，否则丢弃。所指定特征必须带 Notify 或 Indicate 属性，否则丢弃。`conn_hdl` 解析方式同 `0x0101`（先按从 1 开始编号的 BLE 句柄、再按原始值查找）。帧尾必须紧跟 `\r`。 |

</div>

### PDU 模式断开连接 { #pdu-mode-disconnect }

<div align="center"><em>表：PDU 模式断开连接</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | `AT+DISCONN\r`（无参数）或 `AT+DISCONN=<conn_hdl>\r` |
| 响应 | 成功：`\r\nOK\r\n`；失败：`\r\nERROR\r\n` |
| 参数 | `conn_hdl`：要断开的连接句柄，十六进制。BLE 连接使用从 1 开始编号的外部句柄；0 为非法值，会返回 `ERROR`。SPP 连接使用原始 ACL 句柄。 |
| 备注 | 无参数时断开当前所有连接并返回 `OK`。带参数时解析顺序：先按从 1 开始编号的 BLE 句柄查找（用 `conn_hdl`-1 命中 BLE 槽），未命中再按原始值查找 SPP 槽；查不到连接返回 `ERROR`。对 BLE 连接以原因码 `0x13` 发起断开；对 SPP 连接按对端地址发起断开。查询形式 `AT+DISCONN?` 返回 `ERROR`。 |

</div>

### PDU 连接状态指示（IM_CONN / IM_DISCONN） { #pdu-connection-status-indication-im_conn-im_disconn }

<div align="center"><em>表：PDU 连接状态指示（IM_CONN / IM_DISCONN）</em></div>

<div align="center" markdown>

| 项目 | 内容 |
|:-----|:-----|
| 命令 | 主动上报，无需主机下发命令。建立连接时上报 `IM_CONN`，断开时上报 `IM_DISCONN`。 |
| 响应 | 命令模式建立连接：`\r\nIM_CONN <hdl>,<mac>,<mtu>\r\n`，其中 `<hdl>` 为 4 位十六进制句柄，`<mac>` 为 12 位十六进制地址（高字节在前），`<mtu>` 为十进制 MTU。命令模式断开连接：`\r\nIM_DISCONN:<hdl>\r\n`（`<hdl>` 为 4 位十六进制）。透传模式仅在建立首条连接时上报 `\r\nIM_CONN\r\n`（无参数），断开不上报 `IM_DISCONN`。所有连接断开后两种模式均上报 `\r\nIM_READY\r\n`。 |
| 参数 | `<hdl>`：连接句柄；BLE 连接显示为从 1 开始编号的值（内部句柄从 0 开始编号，再加 1），SPP 连接显示为原始句柄。`<mac>`：对端蓝牙地址。`<mtu>`：协商后的 MTU。 |
| 备注 | 是否上报由 `AT+EVT` 控制：值为 0（默认）时正常上报，值为 1 时不再上报 `IM_READY`/`IM_CONN`/`IM_DISCONN`。上报格式与内容随当前工作模式（命令模式/透传模式）不同，见上文。 |

</div>

## 附录 { #appendix }

### 常用设备类别（Class of Device） { #common-class-of-device-values }

<div align="center"><em>表：常用设备类别（Class of Device）</em></div>

<div align="center" markdown>

| 设备类别 | 十六进制值 |
|:---------|:-----------|
| Computer | `0x000100` |
| Phone | `0x000200` |
| LAN/Network Access Point | `0x000300` |
| Audio/Video | `0x000400` |
| Peripheral（键盘/鼠标等） | `0x000500` |
| Imaging（打印机/扫描仪等） | `0x000600` |

</div>
