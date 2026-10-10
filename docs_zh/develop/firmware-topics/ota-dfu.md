---
icon: lucide/upload-cloud
description: "使用 SiFli-SDK DFU v2 中间件，通过 USB-CDC、BLE 或蓝牙（Bluetooth）PAN 完成固件升级，并了解配套的应用与加载器示例。"
tags:
    - 开发
    - OTA
    - DFU
---

# OTA 与 DFU { #ota-and-dfu }

DFU v2 是 SiFli-SDK 用于 DFU 和 OTA 流程的固件升级中间件。它支持 USB-CDC、BLE 和蓝牙（Bluetooth）PAN 三种传输通道；每种通道均提供用户应用和与之配套的加载器（loader）子工程。

先根据产品的实际升级路径选择传输通道，再从相应的应用示例开始；配套的加载器会自动加入构建。

## DFU v2 目录结构 { #dfu-v2-structure }

<div align="center"><em>图：DFU v2 示例目录结构</em></div>

```text
dfu_v2/
├── cdc/       USB-CDC channel
│   ├── app/       User application and PC update tool
│   └── loader/    CDC DFU loader
├── ble/       BLE channel
│   ├── app/       BLE peripheral application
│   └── loader/    BLE DFU loader
└── bt_pan/    Bluetooth PAN channel
    ├── app/       Application that downloads firmware from a server
    └── loader/    PAN DFU loader
```

每个通道的应用都与对应的加载器配套设计。构建应用时，SDK 会通过 `building.py` 中的 `AddDFU_*` 逻辑，将相应加载器作为子工程自动纳入构建，无需单独构建。BLE 示例可在用户应用运行期间更新非 HCPU 固件镜像；更新 HCPU 固件镜像则需要切换到加载器执行。

## 兼容性与配置 { #compatibility-and-configuration }

DFU v2 默认禁用，必须在中间件配置中显式启用 `USING_DFU_V2`。它仅适用于 HCPU（`BF0_HCPU`），且不能与旧版 DFU 配置 `BSP_USING_DFU` 或 `USING_DFU_PAN` 同时启用。启用 DFU v2 后，构建配置会自动选中 FlashDB（`PKG_USING_FLASHDB`），以支持断点续传。

USB CDC 和 BLE 使用推送式传输，配置项 `DFU_V2_USE_CDC_TRANSPORT` 与 `DFU_V2_USE_BLE_TRANSPORT` 二选一。蓝牙 PAN 使用拉取式传输，应启用 `DFU_V2_USE_PAN_TRANSPORT` 和设备发起模式（`DFU_V2_USE_DEVICE_MODE`），并配置 WebClient。请在确定产品升级架构前核对目标 SDK 版本中的配置选项。

## 选择升级通道 { #choose-an-update-channel }

<div align="center"><em>表：DFU v2 传输通道选择</em></div>

<div align="center" markdown>

| 通道 | 文档定义的升级路径 | 典型用途 |
| --- | --- | --- |
| USB-CDC | PC 通过 USB 虚拟串口升级设备。 | 量产、实验室和有线维护流程。 |
| BLE | BLE 外设应用接收升级包。 | 通过手机 App 升级已连接的产品。 |
| 蓝牙 PAN | 设备通过 Bluetooth PAN 联网，并从 HTTP 服务器下载升级包。 | 可自行获取升级镜像的联网产品。 |

</div>

## 产品升级检查 { #product-update-review }

- [ ] 所选通道与产品可用的连接路径相匹配。
- [ ] 已将应用和配套加载器作为一个完整升级流程构建并验证。
- [ ] 已在相应示例 README 中确认目标开发板受支持。
- [ ] 已定义产品在升级中断后的恢复方式，以及工厂维护流程。
- [ ] 已针对产品发布检查固件镜像的真实性与完整性、版本策略和分区容量。
- [ ] 在应用无法正常运行时，仍可采集升级失败日志。

## 构建 DFU v2 示例 { #build-a-dfu-v2-example }

进入示例的 `project/` 目录后，执行：

```bash
scons --board=<board-name> -j8
```

各示例支持的开发板以其 README 为准。DFU v2 中间件的配置位于 SiFli-SDK 的 `middleware/dfu_v2` 目录。

## DFU v2 SDK 示例 { #dfu-v2-sdk-examples }

<div align="center"><em>表：适用于 SF32LB58x 的 SiFli-SDK 官方 DFU v2 示例</em></div>

<div align="center" markdown>

| 通道 | 用户应用 | 加载器子工程 |
| --- | --- | --- |
| USB-CDC | [`cdc/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/app/README.html) | [`cdc/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/loader/README.html) |
| BLE | [`ble/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/app/README.html) | [`ble/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/loader/README.html) |
| Bluetooth PAN | [`bt_pan/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/app/README.html) | [`bt_pan/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/loader/README.html) |

</div>

完整的源代码索引和当前 SDK 导航请参见 [SiFli-SDK 的 DFU v2 示例](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/index.html)。
