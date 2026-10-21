---
icon: lucide/tags
description: "如何解读 SF32LB5xyZxYx6 型号：产品档位、PSRAM 变体、封装类型、内置 Flash/PSRAM 容量与温度等级，附实例解析。"
tags:
  - 硬件
  - 芯片
---

# SF32 命名规则 { #sf32-naming-convention }

## 芯片命名 { #chip-naming }

### 型号：***SF32LB5xyZxYx6*** { #part-number-sf32lb5xyzxyx6 }

!!! note "语法说明"
    * 小写 ***x*** 表示数字位。
    * 大写 ***Y*** 或 ***Z*** 表示字母位。

### 前缀：*SF32LB5xy* { #prefix-sf32lb5xy }

- **SF32** — 思澈科技（SiFli）32 位 MCU 系列
- **LB** — 产品线标识
    - **LB**：低功耗蓝牙（Bluetooth）MCU 系列
- **5** — 处理器家族
    - **5**：基于 32 位 Arm Cortex-M33 STAR-MC1 处理器，或基于性能相当的 RISC-V 处理器的器件
- **x** — 产品档位
    - **8 / 7**：双应用处理器加单低功耗处理器；具体产品定位因系列而异。
    - **6 / 5**：中端级（***单***应用处理器，***单***低功耗处理器）
    - **2**：成本优化型（***单***应用处理器，***专用***低功耗蓝牙控制器）
- **y** — 器件变体
    - 通常反映合封 PSRAM 容量；具体编号与容量的对应关系因产品子系列而异。

### 后缀：*ZxYx6* { #suffix-zxyx6 }

- **Z** — 封装类型
    - **U**：QFN68
    - **V**：BGA
    - **Y**：QFN80
- **xYx** — 集成存储器配置（QSPI-NOR Flash 与 PSRAM）
  *（注：精确编码映射取决于具体封装和器件家族。）*

`ZxYx6` 是系列级的示意格式，并非固定长度的解析模板。存储器代码的数量和顺序因器件家族及封装而异：数字 Flash 代码可能缺失；集成多颗 PSRAM 时，PSRAM 字母代码可能重复。解读具体订货型号时，应以对应家族的型号表为准。
<div align="center"><em>型号后缀字段定义</em></div>

<div align="center" markdown>

| 字段 | 类型 | 选项 | 说明 |
| :--- | :--- | :--- | :--- |
| **x** | 数字 | **1** 到 **6** | 通用 QSPI-NOR Flash 容量编码：<br>• **1**：2 Mb<br>• **2**：4 Mb<br>• **3**：8 Mb<br>• **4**：16 Mb<br>• **5**：32 Mb<br>• **6**：64 Mb<br>SF32LB57x 还使用代码 **7** 和 **8**；见下文的系列专用映射。 |
| **Y** | 字母 | **A** 到 **E** | 集成 PSRAM 容量与接口：<br>• **A**：16 Mb QPI-PSRAM<br>• **B**：32 Mb OPI-PSRAM<br>• **C**：64 Mb OPI-PSRAM<br>• **D**：128 Mb OPI/HPI-PSRAM<br>• **E**：256 Mb HPI-PSRAM |

</div>

- **6** — 工作温度等级
    - **5**：−20°C 至 +70°C（商业级）
    - **6**：−40°C 至 +85°C（工业级）

### SF32LB57x 专用存储器代码 { #sf32lb57x-memory-codes }

SF32LB57x 硬件设计指南中的[芯片型号编码图](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md#33-packages)显示，封装代码之后有三个存储字段，依次对应 MPI1、MPI2 和 MPI3；温度等级代码位于它们之后。各 MPI 位置使用的系列专用代码如下：

<div align="center"><em>表：SF32LB57x 各 MPI 位置的存储器代码</em></div>

<div align="center" markdown>

| 代码 | SF32LB57x 中对应 MPI 位置的含义 |
|:-----|:--------------------------------|
| `N` | 未合封存储器 |
| `B` | 32 Mb PSRAM |
| `C` | 64 Mb PSRAM |
| `D` | 128 Mb PSRAM |
| `E` | 256 Mb PSRAM |
| `2` | 4 Mb NOR Flash |
| `3` | 8 Mb NOR Flash |
| `4` | 16 Mb NOR Flash |
| `5` | 32 Mb NOR Flash |
| `6` | 64 Mb NOR Flash |
| `7` | 128 Mb NOR Flash |
| `8` | 256 Mb NOR Flash |

</div>

此映射仅适用于 SF32LB57x。应对照具体型号表核对完整编码；并非所有代码组合都对应可订购 SKU。

### 型号示例 { #part-number-examples }

#### 示例 1：SF32LB527UD6 { #example-1-sf32lb527ud6 }

**SF32LB52 系列**成本优化型 MCU 配置：

* **处理器配置：**单应用处理器，另配一颗专用于低功耗蓝牙的处理器（基于 Arm Cortex-M33 STAR-MC1）。
* **封装类型：**QFN68 封装（**U**）。
* **存储器配置：**集成 128 Mb OPI-PSRAM（**D**）。
* **工作温度：**−40°C 至 +85°C（**6**，工业级）。

#### 示例 2：SF32LB587VEE56 { #example-2-sf32lb587vee56 }

**SF32LB58 系列**旗舰型 MCU 配置：

* **处理器配置：**双应用处理器，另配一颗低功耗处理器（基于 Arm Cortex-M33 STAR-MC1）。
* **封装类型：**BGA256 封装（**V**）。
* **存储器配置：**集成两颗 256 Mb HPI-PSRAM（**E**），以及一颗 32 Mb QSPI-NOR Flash（**5**）。
* **工作温度：**−40°C 至 +85°C（**6**，工业级）。

#### 示例 3：SF32LB57GVD776 { #example-3-sf32lb57gvd776 }

SF32LB57x 型号表将该型号列为 BGA112。三个存储字段依次为 `D/7/7`：MPI1 合封 128 Mb PSRAM，MPI2 合封 128 Mb NOR Flash，MPI3 合封 128 Mb NOR Flash。末尾的 `6` 表示工业级温度等级。因此，`776` 中第二个 `7` 表示 MPI3 合封 NOR Flash；BGA112 GPIO 的具体含义见 [SF32 系列概览](SF32_family.md)。

#### 示例 4：SF32LB57ZVN7N6 { #example-4-sf32lb57zvn7n6 }

SF32LB57x 型号表将该型号列为 BGA112。其存储字段为 `N/7/N`：MPI1 未合封存储器，MPI2 合封 128 Mb NOR Flash，MPI3 未合封存储器。末尾的 `6` 表示工业级温度等级。SF32 系列概览说明了该型号的 `58 + 6` 不能解读为 64 路不受限制的 GPIO。

### 55x 系列沿用旧式后缀的型号 { #legacy-55x-suffix-exceptions }

SF32LB55x 系列的定义早于当前命名规则，因此部分订货型号沿用了旧式后缀格式。以下三个型号无法完全按照上文的 `SF32LB5xyZxYx6` 格式解读：`SF32LB551U4O5`、`SF32LB555V4O6` 和 `SF32LB555V436`。应根据具体的 55x 型号表和数据手册确认它们的封装及存储配置，不要套用通用格式推断字段含义。`SF32LB557VD3A6` 符合当前命名规则，不属于旧式后缀例外。

## 模组命名规则 { #module-naming }

### 型号：***SF32LB5x-MOD-y-AaaaBbbbCccc*** { #part-number-sf32lb5x-mod-y-aaaabbbbcccc }

!!! note "语法说明"
    * 通用后缀中的 `A`、`B`、`C` 用于标识三个存储器字段的位置，并非每个模组型号中都会出现的固定字符。
    * 每个已填写字段的首字符表示存储器类型，其后的数字表示容量或配置。
    * 目前只有 SF32LB52 模组家族使用 `-y` 子类别字段；已发布的 SF32LB56-MOD 和 SF32LB58-MOD 型号不使用该字段。

### 前缀：*SF32LB5x-MOD-y* { #prefix-sf32lb5x-mod-y }

- **SF32LB5x** — 模组 MCU 家族
    - **SF32**、**LB** 和 **5** 与上文芯片命名中的系列、产品线和处理器家族含义相同。
    - **x** 表示产品档位：**8 / 7** 为双应用处理器加单低功耗处理器，具体定位因系列而异；**6 / 5** 为中端级；**2** 为成本优化型。
- **MOD** — 思澈科技（SiFli）模组产品。
- **y** — 模组子类别（仅在相应模组家族定义该字段时使用）
    - **1**：支持锂离子电池直接供电，适配 SF32LB520/3/5/7 器件。芯片供电范围为 3.2–4.7 V；标配 SF32LB525UC6，合封 8 MB OPI-PSRAM。
    - **A**：面向 SF32LB52B 家族的外部稳压供电（3.3 V）模组，不支持锂离子电池直接供电。芯片供电范围为 2.97–3.63 V；标配 SF32LB52BU36，合封 1 MB QSPI-NOR Flash。
    - **B**：面向 52E/52G/52J 家族的外部稳压供电（3.3 V）模组，不支持锂离子电池直接供电。芯片供电范围为 2.97–3.63 V；标配 SF32LB52EUB6，合封 4 MB OPI-PSRAM。

`-A` 模组未搭载外置 NOR Flash。它可连接外置 NOR Flash，也可连接 SDIO 外设，例如 Wi-Fi、SD-NAND 或工作在 4-bit 模式的 eMMC。

### 后缀：*AaaaBbbbCccc* { #suffix-aaaabbbbcccc }

<div align="center"><em>模组型号后缀字段定义</em></div>

<div align="center" markdown>

| 字段 | 存储器类型代码 | 容量、配置与后缀 |
| :--- | :--- | :--- |
| `Aaaa`<br>可变 Flash 存储配置 | `N`：QSPI-NOR Flash<br>`A`：NAND Flash（接口类型因模组系列而异）<br>`D`：SD-NAND Flash<br>`E`：eMMC | `N16`：16 MB QSPI-NOR Flash<br>`A128`：SF32LB52-MOD-1 为 128 MB SPI-NAND；SF32LB56-MOD 和 SF32LB58-MOD 为 128 MB QSPI-NAND<br>`D128`：SF32LB56-MOD 的 128 MB SD-NAND<br>`E4`：SF32LB58-MOD 的 4 GB eMMC |
| `Bbbb`<br>PSRAM | `R`：PSRAM | `R4`：4 MB OPI-PSRAM<br>`R8`：8 MB OPI-PSRAM<br>`R12`：4 MB + 8 MB OPI-PSRAM<br>`R16`：16 MB OPI/HPI-PSRAM<br>`R32`：16 MB + 16 MB HPI-PSRAM<br>`R64`：32 MB + 32 MB HPI-PSRAM |
| `Cccc`<br>标准 Flash | `N`：QSPI-NOR Flash | `N1`：1 MB QSPI-NOR Flash<br>`N4`：4 MB QSPI-NOR Flash |

</div>

三个后缀字段之间不使用分隔符：`Aaaa` 表示可变 Flash 存储配置，`Bbbb` 表示 PSRAM 配置，`Cccc` 表示标准 Flash 配置。型号指南只定义了表中列出的存储器类型与容量组合，不能据此推断任意类型代码都能搭配任意容量代码。仅在已定义的模组配置需要时，才会出现相应字段。

### 型号示例 { #part-number-examples_1 }

#### 示例 1：SF32LB52-MOD-1-N16R8 { #example-1-sf32lb52-mod-1-n16r8 }

**SF32LB52 锂电池供电模组配置：**

* **模组子类别：**`-1` 表示支持锂离子电池直接供电，芯片供电范围为 3.2–4.7 V。
* **可变 Flash 存储配置：**`N16` 表示 16 MB QSPI-NOR Flash。
* **PSRAM：**`R8` 表示 8 MB OPI-PSRAM。

#### 示例 2：SF32LB58-MOD-A128R32N1 { #example-2-sf32lb58-mod-a128r32n1 }

**SF32LB58 旗舰型模组配置：**

* **模组子类别：**已发布的 SF32LB58-MOD 型号不使用 `-y` 子类别字段。
* **可变 Flash 存储配置：**对于此 SF32LB58-MOD 配置，`A128` 表示 128 MB QSPI-NAND Flash。
* **PSRAM：**`R32` 表示 16 MB + 16 MB HPI-PSRAM。
* **标准 Flash：**`N1` 表示 1 MB QSPI-NOR Flash。

型号编码用于描述配置，不表示每一种代码组合都是已发布 SKU。思澈科技（SiFli）型号指南将 SF32LB566VCB36 和 SF32LB586VDD36 分别列为 SF32LB56-MOD 与 SF32LB58-MOD 的标配芯片；其他模组配置可按需求定制。供货情况、实际搭载的 MCU、引脚定义和电气规格均应以对应模组文档为准。

[思澈科技（SiFli）芯片型号指南](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) · [思澈科技（SiFli）模组型号指南](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)
