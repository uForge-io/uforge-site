---
icon: lucide/trending-up
description: "SF32 子系统集成教程：I2C 传感器、基础 LVGL 界面、BLE 外设服务、本地音频播放、文件系统存储，以及多子系统联合测试。"
tags:
    - 教程
---

# 子系统集成 { #intermediate-tutorials }

这些教程默认你已熟悉[基础外设](beginner.md)中的内容：GPIO、命令行 Shell、ADC 和 PWM 基础，以及 `rt_device_find()` 这一设备驱动访问模式。本阶段从单一外设走向中间件和组合工作流，包括 I2C 传感器、图形 UI、BLE 服务、音频播放、持久化存储和有意识的共存测试。

目标不只是让每个子系统“单独跑通一次”。更重要的是理解 SF32 固件通常如何搭建：从与目标功能最相关的 SDK 示例起步，先验证硬件路径，再接入 RT-Thread 设备层或中间件层，最后与产品中的其他部分联调。

当单个外设已经可用、集成风险开始出现时，请使用本系列：共享内存、时序、功耗、板级接线和中间件之间的相互影响。每个练习都应最终形成一个边界清晰、可独立测试的子系统，而不只是做出一个适合截图展示的演示。

## 开始前 { #before-you-start }

下面的 C 代码均为片段，并非可直接编译的完整源文件。请根据项目和 SDK 版本补充所需的头文件、声明、错误处理和资源清理。

不同 SDK 版本中的示例路径和支持平台可能会变化。构建前，请查看每个示例当前列出的支持平台，以及对应的板级硬件和配置要求；某块板支持一个练习，不代表它也支持本页的其他示例。

<div align="center"><em>表：开始前检查项</em></div>

<div align="center" markdown>

| 要求 | 为什么重要 |
|:-----|:-----------|
| 可用的 Shell | 你需要 `list_thread`、`list_device`、日志输出和快速检查能力。 |
| 已验证可用的 GPIO 输入和输出 | 许多中间件示例仍然需要按键、LED 或中断。 |
| 开发板原理图 | I2C 引脚、显示引脚、音频路径和存储布局都依赖具体开发板。 |
| 一个干净的基线版本 | 在组合功能前，先保留一个已知可工作的构建版本。 |
| 电流测量能力 | 多个子系统组合运行后，即使功能表面正常，空闲功耗也可能发生变化。 |

</div>

## 通过 I2C 读取传感器 { #read-a-sensor-over-i2c }

**目标：** 和一个真实的 I2C 外设通信，而不只是控制单个 GPIO 引脚。

**时间：** 30 到 45 分钟

**起点示例：** `example/hal/i2c/master` 或 `example/rt_device/i2c/eeprom`

```c
struct rt_i2c_bus_device *bus = (struct rt_i2c_bus_device *)rt_device_find("i2c1");
struct rt_i2c_msg msgs[2] = { /* write register address, then read result */ };
rt_i2c_transfer(bus, msgs, 2);
```

代码中的 `i2c1` 仅为示例名称。请使用开发板实际注册的 I2C 设备名，并在使用总线前确认 `rt_device_find()` 调用成功。

1. 从传感器数据手册确认 I2C 地址、寄存器映射、供电电压，以及所需上拉电阻。
2. 确认开发板实际使用的是哪个 `i2cX` 总线和哪些引脚。
3. 从 I2C EEPROM 或主机示例改起，与传感器通信。如果传感器提供设备 ID 寄存器，先读取该寄存器；否则，从预期行为明确的寄存器开始。
4. 解码一个真实测量值，并通过 Shell 打印出来。
5. 如果传感器带有中断或 data-ready 引脚，可将其连接到 GPIO，并采用基础外设教程练习 2 中的中断处理方式。
6. 如果条件允许，把固定轮询改成事件驱动读取。

**成功标准：** 固件能按预期读取一个已知寄存器（如果传感器提供设备 ID 寄存器，就读取该寄存器），能解码出合理的传感器值，而且当设备缺失时不会把整个系统卡死。

**排查思路：** 如果读取结果全是 `0xff`、全是 `0x00`，或者直接超时，重点检查地址宽度、7 位和 8 位地址写法、上拉电阻、电源时序，以及是否有其他外设占用了同一组引脚。

**你学到的内容：** 多字节 I2C 事务，以及如何把中断驱动的 GPIO 引脚和总线类外设组合起来。

## 构建一个基础 LVGL 界面 { #build-a-basic-lvgl-screen }

**目标：** 在显示屏上跑出一个真实的 UI 元素，而不是只做原始帧缓冲区写入。

**时间：** 45 到 60 分钟

**起点示例：** `example/multimedia/lvgl/lvgl_v8_examples`

```c
lv_obj_t *label = lv_label_create(lv_scr_act());
lv_label_set_text(label, "Hello, SF32!");
lv_obj_align(label, LV_ALIGN_CENTER, 0, 0);
```

1. 先让显示驱动正常工作，并确认纯色填充正常，再调试 LVGL 控件。
2. 创建一个 label 和一个 button 控件。
3. 把按钮回调接上，用来修改 label 文本。
4. 加一个简单动画，并通过 Shell 工具观察 CPU 使用率或帧时序。
5. 在继续扩展前，先阅读[图形概览](../../learn/graphics/overview.md)中关于缓冲策略、局部刷新和 ePicasso 的章节。

**成功标准：** 屏幕在复位后能稳定初始化；在触摸或按键输入可用且已完成配置时，输入能改变 UI 状态；简单动画也不会影响 Shell 或蓝牙（Bluetooth）相关任务的运行。

**排查思路：** 把“面板问题”和“LVGL 问题”分开看。如果纯色填充都失败，先检查供电、复位、初始化时序、像素格式和字节序，再考虑 LVGL 代码。

**你学到的内容：** LVGL 的对象和事件模型，以及几乎所有图形类项目都会经历的显示模块调试流程。

## 作为 BLE 外设进行广播与连接 { #advertise-and-connect-as-a-ble-peripheral }

**目标：** 让手机或 BLE 中心设备通过实际的 GATT 服务与开发板通信。

**时间：** 45 到 60 分钟

**起点示例：** `example/ble/peripheral`

1. 先从最基础的 BLE 外设（peripheral）示例开始，用 BLE 扫描 App 确认广播正常。
2. 用手机连接，并确认设备能稳定保持连接几分钟。
3. 如果要发送传感器数据，请在该示例的 GATT 服务中配置合适的 GATT 特征，并用真实测量值更新它，例如基础外设教程练习 4 中的 ADC 读数，或本系列练习 1 中 I2C 传感器的读数。
4. 按需配置 GATT 特征的属性。如果要使用通知，请启用通知并确认手机端能收到数值变化。
5. 测试断开后重连，以及设备在连接期间复位的情况。
6. 在设计自定义服务前，先阅读[蓝牙概览](../../learn/bluetooth/overview.md#gatt-services-and-the-sibles-framework)。

**成功标准：** 设备能广播、连接、暴露已配置的 GATT 服务，并根据所选 GATT 特征的属性交换数据；断开和重连后也能恢复到干净状态。

**排查思路：** 分别测试以下 BLE 场景：存在过期的绑定信息、手机端“忘记”该设备、设备在连接期间重启，以及连接参数发生变化。许多 BLE 问题只有在首次成功连接之后才会暴露出来。

**你学到的内容：** 大多数 BLE 产品都会采用的“广播 -> 连接 -> GATT 通知”流程。

## 从存储介质播放本地音频 { #play-local-audio-from-storage }

**目标：** 播放一个真实音频文件，而不是输出合成音调。

**时间：** 45 到 60 分钟

**起点示例：** `example/multimedia/audio/local_music`

当前文档将 `sf32lb52-lchspi-ulp` 列为 `example/multimedia/audio/mp3_sd_player` 的支持平台。不要默认它也支持你的开发板；使用前请查看该示例的[支持平台和硬件要求](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html)。

1. 按示例要求，把一个小的 WAV 或 MP3 文件放到对应存储介质上。
2. 构建并烧录示例。
3. 确认播放能开始，音频干净，而且开始播放时开发板不会复位。
4. 将播放的启动和停止操作接入基础外设教程练习 2 中的按键处理逻辑。
5. 在 Shell 打日志或显示更新同时进行时，观察是否发生欠载（underrun）。
6. 在修改采样率、格式或缓冲区大小前，先阅读[音频概览](../../learn/audio/overview.md#playback-and-recording-basics)。

**成功标准：** 播放可以反复开始、停止和重新开始，不出现爆音或 underrun；播放停止后，也不会有模块仍处于不必要的高功耗状态。

**排查思路：** 如果声音失真，重点检查采样率、位深、输出路径、编解码器（codec）配置、文件格式、缓冲区大小，以及存储读取是否拖慢了解码器。

**你学到的内容：** SDK 音频中间件、带缓冲的播放流程和文件解码是如何配合工作的。

## 持久化存取数据 { #store-and-retrieve-data-with-a-filesystem }

**目标：** 让数据在重启后仍然保留，而不是每次复位都丢失。

**时间：** 30 到 45 分钟

**起点示例：** `example/storage/littlefs` 或 `example/storage/flashdb`

LittleFS 适合按文件组织的数据。FlashDB 是嵌入式数据库，提供键值数据库（KVDB）和时序数据库（TSDB）模式；具体存储后端和支持的开发板取决于示例配置。选择目标前，请查看官方的 [LittleFS NOR 示例文档](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/littlefs/nor/README.html)和 [FlashDB 示例文档](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/flashdb/README.html)。

下面的 POSIX 调用示例用于访问已挂载的文件系统，不是 FlashDB API。

```c
int fd = open("/data/log.txt", O_WRONLY | O_CREAT | O_APPEND, 0666);
write(fd, buf, len);
close(fd);
```

1. 文件日志可选择 LittleFS 等文件系统。对于结构化配置或带时间戳的记录，可评估 FlashDB 的 KVDB 或 TSDB 模式，并根据开发板和存储器件选择相应后端。
2. 确认示例使用的分区和挂载路径。
3. 写入一条小日志或一个设置项。
4. 断电重启后确认数据仍然存在。
5. 定期记录教程 1 中传感器的读数。
6. 加一个简单保留策略，避免日志无限增长。

**成功标准：** 数据能跨重启保留，而且固件对“存储缺失、存储已满、存储刚被格式化”这些状态都能平稳处理。

**排查思路：** 检查分区布局、挂载路径、Flash 擦写错误、文件关闭行为，以及写入频率是否已经超出目标存储寿命预期。

**你学到的内容：** 何时使用文件系统或嵌入式数据库，以及如何让产品状态在复位后继续保留。

## 有意识地组合两个子系统 { #combine-two-subsystems-on-purpose }

**目标：** 同时运行两个子系统，并观察它们是如何相互影响的。

**时间：** 1 小时

**起点示例：** 从教程 1 到 5 中挑两个最贴近你产品需求的方向

1. 选择两个产品最终确实会一起使用的子系统，例如 BLE 加 I2C 传感器，或 LVGL 加音频播放。
2. 先分别独立验证它们。
3. 用尽量少的改动把它们合在一起。
4. 让它们同时工作，例如 I2C 读取时发 BLE 通知、音频播放时跑 UI 动画、传感器更新时写存储。
5. 观察 CPU 使用率、日志、内存，以及用户可见行为。
6. 对照[蓝牙概览](../../learn/bluetooth/overview.md#coexistence-with-other-workloads)、[图形概览](../../learn/graphics/overview.md#graphics-validation-matrix)和[低功耗概览](../../learn/low-power/overview.md#what-drains-power-on-an-sf32-product)，判断这些现象是否合理。

**成功标准：** 两个子系统在同时活动时都能持续工作，而且测试停止后空闲电流能回到预期水平。

**排查思路：** 重点检查长时间阻塞调用、过量日志、定时器风暴、在对延迟（latency）敏感的路径中写存储，以及共享缓冲区的缓存维护错误。

**你学到的内容：** 很多子系统单独看没问题，但一旦共享 CPU 时间、内存带宽、中断和功耗策略，就可能产生糟糕的交互。

## 子系统集成检查清单 { #intermediate-integration-checklist }

- [ ] 每个教程都从一个已知可工作的 SDK 示例开始。
- [ ] 先验证每条硬件路径，例如读取传感器的已知寄存器或测量值、面板纯色填充、BLE 广播、音频输出或存储挂载。
- [ ] 在适用场景下，功能可经受复位以及断开和重连。
- [ ] 已测试错误路径：传感器缺失、文件缺失、手机断连、存储已满。
- [ ] 至少做过一次组合负载测试。
- [ ] 每个特性停止后，都检查过空闲行为。

## 下一步去哪里 { #where-to-go-next }

[产品验证](advanced.md)会继续覆盖低功耗调优、OTA 更新、自定义显示硬件适配与驱动调试、多连接蓝牙，以及量产阶段调试。这条路径会把“能跑”的演示进一步推向“可交付产品”的固件质量。
