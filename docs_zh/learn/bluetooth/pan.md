---
icon: lucide/network
description: "SF32 蓝牙 PAN：BNEP 传输、NAP/GN/PANU 角色、手机共享网络的权衡、SiFli-SDK 配置与 OTA 验证。"
tags:
  - 蓝牙
---

# 蓝牙 PAN { #bluetooth-pan }

## 概述 { #overview }

**蓝牙（Bluetooth）PAN**（Personal Area Networking，个域网）让 SF32 设备通过经典蓝牙链路接入 IP 网络；若要访问互联网，通常可使用手机的网络共享服务。采用 PAN 可以免去专用 Wi-Fi 射频。PAN 是一种蓝牙应用规范（Profile），属于[蓝牙概览](overview.md#classic-bluetooth-profiles)中介绍的经典蓝牙 Profile，也是[OTA 与 DFU](../../develop/firmware-topics/ota-dfu.md)中介绍的一种 OTA 传输方式。

如果产品需要间歇性或中等速率的 IP 通信，例如天气查询、时间同步、云端 API 调用、语音助手通信或固件下载，可以考虑 PAN。如果专用 Wi-Fi 子系统带来的收益不足以抵消其成本、电路板占用面积、集成工作量和功耗，采用 PAN 就可以避免增加该子系统。仍需根据所选硬件和最终产品评估适用的射频合规要求。

## 蓝牙 PAN 的工作方式 { #how-bluetooth-pan-works }

PAN 是蓝牙 SIG 定义的经典蓝牙（BR/EDR）应用规范（Profile）。它通过 **BNEP**（Bluetooth Network Encapsulation Protocol）在蓝牙 ACL 链路上传输以太网格式的数据包；BNEP 运行在 L2CAP 之上，而不是 RFCOMM。实现 PAN 需要 BR/EDR 和兼容的 PAN 协议栈，并不要求同时支持 BLE，因此仅支持经典蓝牙的硬件也可以实现 PAN。

PAN 不能运行在 BLE 上，但独立的[互联网协议支持规范（IPSP）](https://www.bluetooth.com/specifications/specs/internet-protocol-support-profile-1-0/)支持通过 BLE 传输 IPv6 数据包。规范支持这项能力，不代表 SiFli-SDK 或手机热点服务已经实现 IPSP。下表中的 BLE 方案指 App 转发 GATT 数据，并非 IPSP 联网。

PAN 定义了三种角色：

<div align="center"><em>表：蓝牙 PAN 角色</em></div>

<div align="center" markdown>

| 角色 | 功能 |
|:-----|:-----|
| **NAP**（Network Access Point，网络接入点） | 将已连接的蓝牙设备桥接到外部网络，在蓝牙微微网（piconet）与外部网络之间转发数据包。手机通常通过网络共享（Personal Hotspot）功能承担此角色。 |
| **PANU**（PAN User，PAN 用户） | 客户端角色，连接到 NAP（或 GN）并使用其网络接入能力。SF32 设备使用此角色。 |
| **GN**（Group Ad-hoc Network，群组自组网） | 在已连接的 PANU 设备之间转发数据包，但不提供外部网络接入，适用于设备间自组网，而非互联网访问。 |

</div>

PANU 可通过设备查询（inquiry）发现附近设备，再用 SDP 确认其 PAN 服务和角色。Class of Device 中的 Networking 标识只是发现设备时的提示，并不能证明该设备提供了可用的 NAP 服务。建立 ACL 连接和 L2CAP 上的 BNEP 连接后，NAP 会按其实现采用桥接或路由方式，将数据转发到外部网络。[PAN 规范](https://www.bluetooth.com/specifications/specs/personal-area-networking-profile-1-0/)中的 NAP 既可以是手机，也可以是 LAN 网关。任一方都可终止连接；在本文介绍的手机共享网络方案中，共享状态变化可能需要重新连接。

## 为什么选择 PAN 而不是 Wi-Fi { #why-use-pan-instead-of-wi-fi }

<div align="center"><em>表：PAN、Wi-Fi 与 BLE 在网络接入上的对比</em></div>

<div align="center" markdown>

| 方案 | 适用场景 | 权衡 |
|:-----|:---------|:-----|
| 蓝牙 PAN | 产品已使用双模蓝牙，只需间歇性或中等 IP 流量，且配套手机通常就在附近。 | 吞吐量和覆盖范围取决于 BR/EDR 链路及 NAP 的上游网络。手机共享网络方案依赖该手机；其他方案也可以使用非手机的 NAP 网关。 |
| 专用 Wi-Fi 射频 | 产品需要持续的高吞吐量，或需要不依赖手机的连接方式。 | 需要增加射频、天线、集成工作及相应的功耗预算。应根据所选射频或模组及最终产品，评估适用的射频合规要求。 |
| BLE GATT → 配套 App → 互联网 | 产品只需交换少量数据，且 App 可以将数据转发到云端。 | 这种自定义转发方案并未给设备提供直接的 IP 连接。BLE IPSP 是另一种方案，需要单独确认设备协议栈和网关是否支持，不能与 PAN 混为一谈。 |

</div>

对于已因音频、GATT 服务或经典蓝牙 Profile 而采用双模蓝牙的产品，只要使用场景能够接受依赖附近一台已开启网络共享的手机，PAN 通常是增加互联网接入能力时增量成本较低的方案，无需引入第二套射频子系统。

## iOS 数据传输：BLE 中继、经典蓝牙与 PAN { #ios-data-transport-ble-relay-classic-bluetooth-and-pan }

必须区分三种不同的 iPhone 连接设计。笼统地说“经典蓝牙需要 MFi”并不准确：iOS 支持标准蓝牙 Profile，Personal Hotspot 本身也可使用蓝牙。限制适用于 iOS App 需要通过 Apple 的 External Accessory/iAP 路径，与经典蓝牙配件建立**自定义数据通道**的情形。Apple 文档说明 External Accessory 可通过蓝牙与 MFi 配件通信；其[技术问答](https://developer.apple.com/library/archive/qa/qa1657/_index.html)则指出，BLE 配件使用 Core Bluetooth，不需要符合 MFi。

<div align="center"><em>表：iOS 配件联网方案的设计选择</em></div>

<div align="center" markdown>

| 设计 | 设备到手机的路径 | iOS 产品影响 | 互联网吞吐量与工程权衡 |
|:-----|:-----------------|:-------------|:---------------------------|
| BLE → App → 互联网 | 自定义 GATT 协议；iOS App 接收设备数据并转发至云端。 | BLE 可通过 Core Bluetooth 使用，无需采用 External Accessory 的 MFi 路径。App 必须负责配对、帧格式、重试、后台行为和云端中继。 | BLE 有效载荷能力和调度受连接参数及 iOS/App 行为限制。该路径通常适合少量、间歇性数据，但不是通用 IP 链路；对于持续或数据量较大的流量，它可能成为实际瓶颈。 |
| 自定义经典蓝牙 → App | 经典蓝牙配件到 iOS App 的自定义数据通道。 | [External Accessory 框架](https://developer.apple.com/documentation/externalaccessory)面向 MFi 配件；Apple 指出该框架仅适用于 MFi 硬件。标准支持的蓝牙 Profile 不属于此限制范围。 | 该路径要求使用 MFi 配件及其支持的配件协议，并完成 App 集成和产品验证；它本身不会为设备提供直连 IP 网络。 |
| 蓝牙 PAN → 手机热点 → 互联网 | 标准 PANU 到 NAP 的联网；SF32 使用手机的蓝牙 Personal Hotspot/网络共享服务。 | 设备使用手机的网络共享服务，而不是自定义的 App 到配件传输通道。产品仍需验证手机、运营商和网络共享行为。 | SF32 可运行自己的 IP 客户端，不再需要 App 中继，但这并不代表速度或能耗一定优于 BLE。应在目标手机上，使用相同的数据负载和服务器，对比有效数据吞吐量、升级耗时及能耗。结果取决于蓝牙链路、手机策略、上游网络和服务端。 |

</div>

对于需要持续流式传输或直接处理 HTTP/WebSocket 流量的语音助手、OTA 客户端及其他产品，只有在目标 iPhone 和 SDK 配置均经过验证后，PAN 才可作为避免依赖 BLE 中继 App 的联网方案。思澈科技（SiFli）v2.5.1 示例还启用了 A2DP，以规避 iOS 单独连接 PAN 的已记录问题；A2DP 是该示例的处理方式，并非 PAN 规范要求。PAN **不能**取代用于产品配置、用户认证、通知或本地控制的 App。[SF32 小智语音助手](../../projects/sf32-xiaozhi.md)提供了这一架构的可运行示例。

## SF32 各系列对 PAN 的支持 { #device-support-on-sf32 }

为 SF32 选择 PAN 方案时，需要确认器件支持经典蓝牙，并核实 PAN 协议栈、SDK 版本和目标开发板配置。下表中支持 PAN 的 SF32 系列采用双模蓝牙，这是这些器件的能力，并非 PAN 规范要求必须支持双模。

<div align="center"><em>表：SF32 系列 PAN 支持情况</em></div>

<div align="center" markdown>

| 系列 | 蓝牙能力 | PAN 支持 |
|:-----|:---------|:---------|
| SF32LB52x | 双模蓝牙 | 支持 |
| SF32LB55x | 仅 BLE | 不支持——PAN 需要经典蓝牙 |
| SF32LB56x | 双模蓝牙 | 支持 |
| SF32LB57x | 双模蓝牙 | 需验证 PAN 协议栈和目标板；本文引用的 v2.5.1 PAN 示例未列出该系列 |
| SF32LB58x | 双模蓝牙 | 支持 |

</div>

关于 BLE 与双模蓝牙更全面的器件选型指引，请参见[蓝牙概览](overview.md#choose-ble-classic-or-dual-mode)。

## SiFli-SDK 的 PAN 示例 { #sifli-sdks-pan-example }

SiFli-SDK 在 `example/bt/pan` 提供了可运行的 PANU 实现，支持 `eh-lb52x`、`eh-lb56x`、`eh-lb58x` 以及 `sf32lb52/56/58-lcd` 系列开发板。连接到手机的 PAN（NAP）服务后，该示例可通过 Finsh Shell 命令演示实际联网操作，其中 `weather` 命令会通过已建立的 PAN 链路获取当前天气信息。README 截图还展示了天气服务响应字段：`id`、`name`、`country`、`path`、`timezone`、`timezone_offset`、`txt`、`code`、`temperature` 和 `last_update`；样例地点是重庆（CN），时区为 Asia/Shanghai（+08:00），天气文字为“`多云`”（代码 `4`），温度值为 `10`，更新时间为 `2025-01-13T15:54:09+08:00`。这些是应用层天气数据，不属于 PAN/BNEP 帧，实际值会变化。

启动时，示例会开启蓝牙设备查询（Inquiry）和寻呼扫描（Page Scan），使手机能够发现并配对该设备。设备的默认蓝牙名称为 `sifli_pan`。

使用 HTTPS 时，按 [v2.5.1 PAN 示例说明](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md)配置证书。默认 CA 证书位于 `external/mbedtls_228/certs/default`，需要补充的 CA 证书放在 `external/mbedtls_228/certs`。仅支持 PEM，不支持 DER；应检查文件内容是否包含 `-----BEGIN CERTIFICATE-----`，不能只看扩展名。在 `proj.conf` 中启用 `PKG_USING_MBEDTLS_USER_CERTS` 后，构建过程会将该目录中的文件合并到 `ports/src/tls_certificate.c`。应根据实际服务器审查信任锚。PAN 连接成功并不代表 TLS 证书校验通过；还需验证服务器身份，并在证书有效期校验依赖设备时间时，确认时间正确。

README 将目录写成了 `mbedtls_288`，但其截图和 [v2.5.1 证书生成代码](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/external/mbedtls_228/SConscript)使用的是 `mbedtls_228`，因此上面的路径以代码为准。构建脚本仅接受首行以 `-----BEGIN CERTIFICATE` 开头的证书内容；应按此格式保存证书，并检查构建警告，确认文件未被跳过。

<div align="center"><em>表：PAN 示例 Finsh 命令</em></div>

<div align="center" markdown>

| 命令 | 作用 |
|:-----|:-----|
| `pan_cmd conn_pan` | 在手机开启网络共享后连接 PAN。 |
| `pan_cmd ota_pan` | 通过 PAN 链路下载并安装 `main.c` 中指定的固件镜像。 |
| `pan_cmd set_retry_flag 1` / `0` | 启用或禁用 PAN 自动重连。 |
| `pan_cmd set_retry_time N` | 设置自动重连的最大重试次数。 |
| `pan_cmd autoconnect` | 在手机断开又重新开启共享后，手动触发一次重连尝试。 |

</div>

运行示例前，应结合对应版本的 README 和目标平台检查以下配置：

- 启用 `CONFIG_BLUETOOTH`、`CONFIG_BT_PROFILE_CUSTOMIZE`、`CONFIG_CFG_PAN` 和 `CONFIG_BSP_BT_CONNECTION_MANAGER`。示例还启用了 A2DP，用于规避文档中提到的 iOS 无法单独连接 PAN 的问题；PAN 规范本身并不要求 A2DP。
- `CONFIG_BT_FINSH` 用于启用可选的蓝牙控制命令。保留待测命令所需的 Shell 功能。
- 根据蓝牙运行的位置设置 `CONFIG_BSP_BLE_NVDS_SYNC`：README 要求在 HCPU 上运行时启用，在 LCPU 上运行时关闭。不能直接照搬另一种处理器分配方案的配置。
- 若要重连上次连接的设备，检查 `CONFIG_BT_AUTO_CONNECT_LAST_DEVICE` 和 `CONFIG_PKG_USING_FLASHDB`。验证重启后配置能否保留，并用上表中的重试控制限制重连次数，避免无限重试。

## 手机操作系统支持与验证 { #mobile-phone-os-support-and-qualification }

手机是 PAN 的 **NAP**，属于产品网络路径的一部分，而不只是配网工具。应将其操作系统、手机型号、运营商套餐和网络共享策略视为产品支持配置。蓝牙配对成功并不充分：手机还必须提供蓝牙网络共享/PAN 服务，并在 PANU 连接后实际转发流量。

<div align="center"><em>表：手机操作系统对蓝牙 PAN 的支持</em></div>

<div align="center" markdown>

| 移动操作系统 | 平台已有文档说明 | SF32 启动调试指引 | 产品验证边界 |
|:-------------|:----------------|:-----------------|:-------------|
| **带蜂窝网络服务的 iOS / iPadOS** | [Apple Personal Hotspot 文档](https://support.apple.com/guide/iphone/share-your-internet-connection-iph45447ca6/27/ios/27)将蓝牙列为连接方式，并说明 Personal Hotspot 会共享手机的蜂窝互联网连接。 | 遵循[思澈科技（SiFli）小智 iOS 流程](https://docs.sifli.com/projects/xiaozhi/get-started/)：使用已开通蜂窝服务的手机，在配对前开启 Personal Hotspot，保持蓝牙开启，再与 SF32 设备配对并连接。若找不到 `sifli-pan`，思澈科技（SiFli）指南指出重启手机可能有效。 | Personal Hotspot 的可用性、流量限制和可连接设备数量取决于运营商与 iPhone 型号。应测试每个支持的 iOS/iPadOS 版本、手机类型和运营商套餐；不要只因 Wi-Fi 热点可用便推断其蓝牙 PAN 可用。 |
| **Android** | [Android 帮助](https://support.google.com/android/answer/9059108)指出，大多数 Android 手机可通过蓝牙共享移动数据：先配对，再配置另一设备的蓝牙网络连接，随后启用**蓝牙网络共享**。 | 在执行 `pan_cmd conn_pan` 前启用蓝牙网络共享。设置名称和菜单位置会因厂商、Android 版本和企业策略而异；应为每台已验证手机记录准确的设置路径。 | Google 使用的是“大多数”而非全部 Android 手机；运营商可能限制或额外收费，厂商也可能隐藏或更改该控制项。应测试实际出货的手机/OS/运营商组合，而不能只依赖 Android 版本。 |
| **HarmonyOS 和其他 Android 衍生移动系统** | 本文不对这些系统作平台级 PAN 支持承诺。其蓝牙和网络共享实现可能源自 Android，但会因型号、市场、版本、运营商配置或设备管理策略而不同。 | 查找蓝牙网络共享控制项，配对手机与 SF32 设备，然后用 PAN 示例证明真实 IP 流量。 | 在通过与 Android 相同的验证记录前，应将每个准确的手机型号、OS 构建、地区和运营商视为**需要验证**。不能只依据品牌或蓝牙配对便宣称支持。 |

</div>

### 手机端设置 { #phone-side-setup }

<div align="center"><em>图：iOS Personal Hotspot 与 Android 蓝牙网络共享开关的示意位置</em></div>

![iOS Personal Hotspot 和 Android 蓝牙网络共享设置示意图](assets/mobile-hotspot-switches-illustrative.png)

这是设置位置示意图，并非操作系统的原始截图。文字和菜单位置会随 iOS/iPadOS 版本、Android 厂商以及手机管理策略而变化；在 iOS/iPadOS 上查找 **Allow Others to Join**，在 Android 上查找**蓝牙网络共享（Bluetooth tethering）**。SiFli-SDK v2.5.1 的 PAN 示例中的 [iOS 截图](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md)还显示已开启“最大兼容性（Maximize Compatibility）”。这只是示例手机设置，不是 PAN 协议要求；应在目标手机上确认是否需要。

对每台待测手机使用以下顺序：

1. 确认手机的上游网络可用。Apple 的 Personal Hotspot 共享蜂窝数据，需确认运营商允许网络共享。部分 Android 手机也可共享 Wi-Fi 连接，但必须在具体机型和 OS 版本上验证。
2. 在 SF32 设备请求 PAN **之前**，开启手机的蓝牙网络共享或 Personal Hotspot。
3. 将手机与设备配对；当操作系统要求时，保持手机处于可被发现状态。
4. 执行 `pan_cmd conn_pan`，再用示例中的 `weather` 等命令验证实际 IP 通信。仅确认蓝牙已连接还不够。
5. 关闭网络共享、让手机休眠/唤醒并移出范围；确认产品预期的重连行为正常工作。

如果网络共享是在蓝牙连接建立之后才开启的，请使用 `pan_cmd conn_pan` 显式重新连接 PAN。

### 制定产品支持的手机矩阵 { #define-a-shipping-phone-support-matrix }

对于消费类产品，应公布经过验证的**手机型号 + OS 版本 + 运营商/地区**组合，而不是只写“支持 iOS”或“支持 Android”。每个候选组合至少记录：手机型号、OS 构建版本、运营商、蜂窝服务状态、SIM/eSIM 状态、网络共享设置名称、首次连接耗时、锁屏和无线断开后的重连行为、持续通信测试结果，以及恢复服务所需的用户操作。App、PAN 固件、手机 OS 或运营商配置变化后，都应重新验证这些组合。

## 基于 PAN 的 OTA 固件分发 { #pan-based-ota-delivery }

PAN 示例默认已启用 OTA：`pan_cmd ota_pan` 会通过已用于网络流量的同一条蓝牙 PAN 链路下载并安装固件镜像，采用 SiFli-SDK 固件升级服务文档中说明的 DFU_PAN OTA 路径。对于已依赖 PAN 传输数据、又不希望引入第二种 OTA 传输方式的产品，这是合适的方案。参见 [OTA 与 DFU](../../develop/firmware-topics/ota-dfu.md)，了解 PAN 与 BLE 等其他升级传输方式的对比；无论采用哪种传输方式，都应规划回滚与故障恢复行为。

README 还提到一种构建失败：所选目标平台缺少适用的 OTA `ptab.json`。其截图展示了关闭 DFU 子工程和中间件固件升级支持，以便测试不带 OTA 的示例。这种排查手段会移除 OTA，不能用于交付必须支持升级的产品。启用 OTA 路径前，应补齐并验证正确的分区布局和升级配置。

PAN 只提供传输通道，不能证明固件可信或故障恢复可靠。发布前应验证服务器身份、镜像真实性与完整性、目标型号和版本兼容性，以及中断后的恢复。既要测试网络断开，也要测试掉电，确认 bootloader 实际提供的恢复或回滚行为，不能假定下载命令已经包含这些保障。

## 采用 PAN 的 SF32 产品实例 { #a-real-sf32-product-using-pan }

[SF32 小智语音助手](../../projects/sf32-xiaozhi.md)是一个采用 PAN 的 SF32 产品实例：它通过蓝牙 PAN 借助已配对手机接入互联网，再通过该链路与云端服务进行语音交互。该项目展示了完整产品如何将 PAN 联网、WebSocket/HTTP 应用流量和对手机网络共享的依赖串联起来，可供参考。

## 故障排查 { #troubleshooting }

README 还将蓝牙地址分配列为排查项，可用 `nvds get_mac` 查看地址。OUI 必须属于你的组织，或已获授权用于该产品，并应为每台设备分配唯一地址；不能直接复制示例中其他厂商的 OUI。命令 `nvds update addr 6 xxxxxxYYYYYY` 中，`YYYYYY` 是按字节反序后的 OUI，`xxxxxx` 表示地址的其余三个字节。应按命令要求处理字节顺序，不要直接粘贴显示格式的 MAC 地址。

`CONFIG_NVDS_AUTO_UPDATE_MAC_ADDRESS` 可能覆盖手动修改的地址。若已获授权的测试地址在重启后未保留，README 建议关闭该选项，重新编译并烧录，再次设置地址。这是测试排查手段，并非量产地址分配策略；发布前应验证所采用的自动分配或工厂烧录策略在重启后仍符合预期。

<div align="center"><em>表：蓝牙 PAN 故障排查</em></div>

<div align="center" markdown>

| 现象 | 检查与处理 |
|:-----|:---------|
| PAN 已连接，但网络命令（如 `weather`）失败 | 检查 BNEP 是否建立、是否获得 IP 地址、路由和 DNS 是否正确、服务器是否可用，以及适用时的 TLS 错误。README 还建议用 `nvds get_mac` 检查蓝牙 MAC 的 OUI；只有符合已授权的地址分配策略时，才用 `nvds update addr 6 ...` 修改。OUI 无效并非唯一可能原因。 |
| 手机无法发现设备，或无法连接 | 确认手机已在连接前开启网络共享，且设备处于可被发现状态（Inquiry 和 Page Scan 均已启用）。 |
| 手机已配对，但 `weather` 或其他 IP 操作失败 | 配对成功不代表手机已提供 PAN NAP 服务。确认已开启蓝牙网络共享/Personal Hotspot，且上游网络可用。使用蜂窝网络时，检查运营商是否允许共享；使用 Android 的 Wi-Fi 共享时，验证具体机型和 OS 是否支持。确认待测组合已纳入支持矩阵。 |
| 手机端网络状态变化后 PAN 断开 | 可能发生这种情况，应逐一验证支持的手机。使用 `pan_cmd conn_pan` 重连，或启用 `pan_cmd set_retry_flag 1`，并通过上文的重试次数限制控制自动重连次数。 |
| 通过 PAN 的 OTA 中途失败 | 按其他 OTA 传输方式同样对待：依据 [OTA 与 DFU](../../develop/firmware-topics/ota-dfu.md) 核实镜像地址、分区布局和回滚行为，而不要直接假定问题出在 PAN 本身。 |

</div>

## 启动调试检查清单 { #bring-up-checklist }

- [ ] 确认硬件支持经典蓝牙，并在具体 SDK 和目标板上验证 PAN 协议栈与配置。参考示例列出了 SF32LB52x/56x/58x；SF32LB57x 需单独验证。SF32LB55x 仅支持 BLE。
- [ ] 判断 PAN 依赖手机联网这一特性是否符合产品的连接模式，还是产品其实需要专用 Wi-Fi 射频。
- [ ] 在目标开发板上搭建 `example/bt/pan`，并确认手机端网络共享设置（iOS/iPadOS Personal Hotspot 或 Android 蓝牙网络共享）。
- [ ] 端到端验证一次真实的 PAN 连接及至少一次网络操作（例如示例中的 `weather` 命令）。
- [ ] 验证每个预期手机型号、OS 构建、地区/运营商套餐和网络共享设置路径；不得以笼统的“支持 iOS/Android”作为出货声明。
- [ ] 在依赖网络功能之前，确认设备蓝牙 MAC 的 OUI 有效。
- [ ] 如果使用 PAN 进行 OTA，在发布前完整测试 `pan_cmd ota_pan` 路径，包括回滚行为。
- [ ] 根据手机处于通信范围内的预期频率，设计重连和自动重连行为（`set_retry_flag`、`set_retry_time`）。

## 要点 { #key-takeaways }

- 蓝牙 PAN 通过运行在 L2CAP 之上的 BNEP，在 BR/EDR 链路上传输 IP/以太网格式的数据，不要求支持 BLE。通过 BLE 传输 IPv6 使用的是独立的 IPSP，而不是 PAN，且需要确认协议栈和网关支持。
- SF32 设备使用客户端 **PANU** 角色，通常通过手机的网络共享/个人热点功能连接到充当 **NAP** 的手机。
- 在 iOS 上，BLE 配件可通过 Core Bluetooth 使用而无需 MFi；但通过 External Accessory/iAP 建立自定义 App 到经典蓝牙配件的数据通道属于 MFi 路径。PAN 则使用手机的网络共享服务，让 SF32 设备通过自身 IP 客户端联网，而不是依赖 BLE-App 中继。
- 参考 PAN 示例列出了 SF32LB52x/56x/58x 目标板。SF32LB57x 的硬件支持双模蓝牙，但其 PAN 协议栈和目标板需单独验证；SF32LB55x 仅支持 BLE，无法运行 PAN。
- SiFli-SDK 的 `example/bt/pan` 是一份可运行的参考实现，包含用于连接、重连和基于 PAN 的 OTA 分发的 Finsh 命令。
- 当手机通常就在附近，且产品只需间歇性或中等速率的 IP 通信时，手机共享网络的 PAN 方案较合适。若需要持续高吞吐量或独立于手机运行，应评估专用 Wi-Fi 或其他独立网络路径，也可以考虑非手机的 NAP 网关。
