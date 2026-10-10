---
icon: lucide/usb
description: "使用 CherryUSB 驱动 SF32 USB 硬件：CDC、HID、MSC、音频与 MTP 应用场景、描述符核对清单，以及跨操作系统枚举测试。"
tags:
    - 开发
    - USB
---

# USB 与 CherryUSB { #usb-and-cherryusb }

对于具备受支持 USB 硬件的 SF32 器件和开发板，SiFli-SDK 文档及示例展示了 CherryUSB 集成。请针对具体芯片、开发板和 SDK 版本确认支持的 USB 角色与类，并将 USB 作为完整软件栈设计和验证，而非仅视为硬件功能。

USB 开发涉及固件、描述符、主机操作系统、供电与功耗表现以及生产工具。设备仅在开发者笔记本上成功枚举过一次，并不意味着 USB 功能已经具备量产条件。

## 应用场景 { #use-cases }

- USB CDC 串口。
- HID 设备。
- MSC 存储。
- USB Audio 麦克风/扬声器。
- MTP。
- 在 SDK 和开发板支持的前提下，以 USB Host 连接使用 CDC、HID、MSC、UVC 或 UAC 类的外设。

## 实用流程 { #practical-workflow }

1. 确认开发板引出了所需 USB 接口和电源路径。
2. 从最接近需求的 SDK USB 示例开始。
3. 在 Windows、macOS 和 Linux 上测试枚举。
4. 验证挂起/恢复以及拔插 USB 线缆时的行为。
5. 记录 VID/PID、描述符和预期使用的驱动。

## 测试内容 { #what-to-test }

- 先在设备断电时连接 USB，再给设备上电；并测试设备运行时插入或拔出 USB 线缆。
- 连接状态下复位。
- 主机睡眠/唤醒。
- 传输过程中断开线缆。
- Windows、macOS 和 Linux 枚举。
- 启用多个类别（Class）时的复合设备行为。
- 在用户文档中说明，仅供电、不含数据线芯的 USB 线缆不支持数据通信。

## 描述符检查表 { #descriptor-checklist }

- VID/PID 的归属明确。
- USB 产品描述字符串已定稿，或已纳入版本管理。
- 已定义序列号行为。
- 类别（Class）/子类（Subclass）/协议（Protocol）的取值与目标主机驱动匹配。
- 固件升级前后，复合接口保持稳定。

## SDK 示例 { #sdk-examples }

[SiFli-SDK 官方 CherryUSB 示例索引](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/index.html)将 USB Device 和 USB Host 示例分开组织。你应先按产品需要确定 USB 角色和设备类别，再从相应示例入手；其描述符、电源和主机兼容性检查也应落实到产品设计中。

<div align="center"><em>表：适用于 SF32LB58x 的 SiFli-SDK CherryUSB 示例</em></div>
<div align="center" markdown>

| USB 角色 | 示例 | 适用起点 |
| --- | --- | --- |
| 设备（Device） | [USB 麦克风](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic/README.html) | USB Audio Class 1 麦克风 |
| 设备（Device） | [USB 麦克风和扬声器](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic_speaker/README.html) | USB Audio Class 1 双向音频 |
| 设备（Device） | [CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm/README.html) | USB 通信设备 |
| 设备（Device） | [CDC ACM UART](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm_uart/README.html) | USB 转 UART 桥接 |
| 设备（Device） | [CDC + HID + MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_hid_msc/README.html) | USB 复合设备 |
| 设备（Device） | [HID 鼠标](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/hid_mouse/README.html) | USB HID 指针设备 |
| 设备（Device） | [NOR Flash MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/nor_flash_disk/README.html) | 以 NOR Flash 为后端的 USB 大容量存储设备 |
| 设备（Device） | [RAM Disk MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk/README.html) | 以 RAM 为后端的 USB 大容量存储设备 |
| 设备（Device） | [双 RAM Disk MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk_dual/README.html) | 以 RAM 为后端的两个逻辑单元 |
| 设备（Device） | [SD/eMMC MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/sdcard_disk/README.html) | 以 SD 卡或 eMMC 为后端的 USB 大容量存储设备 |
| 设备（Device） | [MTP（DFS + RAM 磁盘）](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/mtp/README.html) | 媒体传输协议（Media Transfer Protocol，MTP）设备 |
| 主机（Host） | [CDC ACM Host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/cdc_acm_host/README.html) | 与 CDC ACM 外设通信 |
| 主机（Host） | [HID Host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/hid/README.html) | 连接并读取 HID 外设 |
| 主机（Host） | [MSC Host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/msc_host/README.html) | 连接 USB 大容量存储外设 |
| 主机（Host） | [UVC + UAC Host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/uvc_uac_host/README.html) | 连接 USB 视频类和音频类外设 |

</div>
