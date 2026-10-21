---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB57x MCUのストレージ、接続、製造に関する回路図設計指針です。ブートメディア、GPIO、UART／I2C／SPI／SDIO／USB／CAN／GPADC、量産書き込み、校正、治具アクセスを扱います。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB57xハードウェア設計ガイド — ストレージと製造 { #sf32lb57x-hardware-design-guide-storage-manufacturing }

!!! note "SF32LB57xハードウェア設計ガイドの一部"
    このページでは、回路図設計ガイドの5.6～5.7節（ストレージと接続、製造）を扱います。[クロック、RF、ユーザーインターフェース](SF32LB57x_schematic_clock_rf_interfaces.md)に戻るか、[PCBレイアウト指針](SF32LB57x_pcb_layout.md)に進んでください。

### 5.6. ストレージと接続 { #56-storage-and-connectivity }

#### 5.6.1. ストレージとブート { #561-storage-and-boot }

ストレージとブートの設計は、一体として確認する必要があります。選択したブートメディアによって、ストラップ抵抗、ストレージの初期電源状態、バスの割り当て、量産時の復旧アクセス方法が決まります。

パッケージ内蔵SPI NOR Flashを搭載する型番は、これを既定のブート元とします。内蔵SPI NOR Flashがない型番は、外部ストレージからブートする必要があります。外部ブートメディアは`PA13`（`Bootstrap[1]`）と`PA17`（`Bootstrap[0]`）で選択します。SiFliの回路図には、各信号にジャンパーと7.5 kΩプルアップ用フットプリントがあり、`VDD33_VOUT1/VDDIOA`に接続されています。

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-A-Bootstrap.png" width="80%" alt="PA13とPA17のブートストラップ選択ジャンパーおよびプルアップ回路" /></div>
<div align="center"><em>図 5.6-1: PA13/PA17のブートストラップ選択回路</em></div>

<div align="center"><em>表 5.6-1: 外部ブートメディアの選択</em></div>

<div align="center" markdown>

| `PA13`（`Bootstrap[1]`） | `PA17`（`Bootstrap[0]`） | 外部ブートメディア |
|:------------------------|:------------------------|:-------------------|
| L | L | SPI NOR Flash |
| L | H | SPI NAND Flash |
| H | L | SD NAND Flash |
| H | H | eMMC |

</div>

#### 5.6.2. ストレージインターフェース { #562-storage-interfaces }

SF32LB57xは、外部SPI NOR Flash、SPI NAND Flash、SD NAND Flash、eMMCをサポートします。SPI NOR/SPI NANDに使用できるのは`PA12`～`PA17`のMPI3のみです。SD NAND/eMMCはどちらのSDIOインターフェースにも接続できます。一部の発注可能な型番では、パッケージ内蔵メモリーがMPI3を占有します。

回路図を確定する前に、次の点を確認してください。

- パッケージ内蔵FlashまたはPSRAMがMPIチャネルを使用しているか。
- 外部ブートメディアとしてSPI NOR、SPI NAND、SD NAND、eMMCのいずれを使うか。
- IO電圧がストレージデバイスに適合しているか。
- プルアップ、チップセレクト、クロック、データ線、電源制御がブート要件を満たしているか。
- 外部ブートメディアの初期電源状態が正しいか。

<div align="center"><em>表 5.6-2: MPI3ストレージの推奨接続</em></div>

<div align="center" markdown>

| ストレージ信号 | SPI NOR／SPI NAND | SD NAND／eMMC |
|:---------------|:-------------------|:---------------|
| `CS#` / `SD2_D2` | `PA12` | `PA12` |
| `SO` / `SD2_D3` | `PA13` | `PA13` |
| `WP#` / `SD2_CLK` | `PA14` | `PA14` |
| `SI` / `SD2_CMD` | `PA15` | `PA15` |
| `SCLK` / `SD2_D0` | `PA16` | `PA16` |
| `HOLD#` / `SD2_D1` | `PA17` | `PA17` |

</div>

#### 5.6.3. ブートと電源制御 { #563-boot-and-power-control }

eMMCには`VCC`と`VCCQ`の2つの電源ドメインがあります。両方を同時にスイッチングするとシャットダウン時の消費電力は下がりますが、スリープからの復帰が遅くなり、CPUの平均消費電力は高くなります。`VCC`のみをスイッチングし、`VCCQ`を常時給電すると、シャットダウン時の消費電力は増えますが、復帰は速くなり、CPUの平均消費電力は低くなります。

<div align="center"><em>表 5.6-3: MPI3外部ストレージのプルアップ要件</em></div>

<div align="center" markdown>

| 外部メディア | `PA13` | `PA15` | `PA17` |
|:-------------|:-------|:-------|:-------|
| SPI NOR Flash | MPI `D1`：プルアップ不要 | 原文に要件の記載なし | MPI `D3`：プルアップ不要 |
| SPI NAND Flash | MPI `D1`：プルアップ不要 | 原文に要件の記載なし | MPI `D3`：7.5 kΩプルアップ |
| SD NAND Flash | SD `D3`：7.5 kΩプルアップ | SD `CMD`：7.5 kΩプルアップ | SD `D1`：プルアップ不要 |
| eMMC | SD `D3`：7.5 kΩプルアップ | SD `CMD`：7.5 kΩプルアップ | SD `D1`：7.5 kΩプルアップ |

</div>

「原文に要件の記載なし」は、SiFliのチェックリストにそのセルの要件がないことを示します。プルアップが不要という意味ではありません。

ブートメディアの選択は表5.6-1と図5.6-1を参照してください。ストレージ電源スイッチのイネーブルは`PA21`固定で、アクティブHighです。電源バリアントに応じて電源方式を選んでください。

- バッテリー駆動バリアント：外部SPI NOR Flashは`VDD33_VOUT1`から常時給電できます。SPI NAND Flashは`VDD33_VOUT1`の後段に置いたスイッチを介して給電する必要があります。SD NAND FlashとeMMCには外付けLDOを使用し、`PA21`でのイネーブル制御を推奨します。`PA21`のないパッケージバリアントでは、リセット時にプルアップとなるGPIOを使用できます。
- 3.3 V電源バリアント：すべての外部ブートストレージに外付けLDOを使用し、LDOのイネーブルには`PA21`を推奨します。
- SPI NOR Flashは常時給電できますが、SPI NAND、SD NAND、eMMCには電源スイッチが必要です。外部メディアからブートする場合、起動時にその電源が既定でオンになっていなければなりません。
- `PA13`と`PA17`にはプルアップ用フットプリントを確保し、選択したブートメディアに応じて実装します。推奨値は7.5 kΩです。MPI3の各ピンに必要な条件は表5.6-3を参照してください。
- パッケージ内蔵ストレージがMPI3を占有する場合、外部MPI3で使用できるのはSD NANDまたはeMMCです。同じチャネルに外部SPI NOR/SPI NANDを接続しないでください。
- ストレージの動作IO電圧をMCUのIO電源に合わせ、プロジェクトの承認済みベンダーリスト（AVL）にある部品を使用してください。

#### 5.6.4. GPIOとピン多重化 { #564-gpio-and-pin-multiplexing }

ブート、デバッグ、ウェイクアップ、USB、アナログ、ディスプレイ、ストレージ、高速信号によって、自由度の高いマトリックス接続にも制約が生じます。製品周辺機能を割り当てきる前にGPIOを計画してください。

#### 5.6.5. ピン配置の計画 { #565-pin-planning }

SF32LB57xは柔軟なピン多重化に対応しますが、次の信号は早い段階で割り当てを確定してください。

- RF、水晶振動子、電源、USB、アナログオーディオ、GPADC、ブート、デバッグの各ピン。
- 特定のピン群を必要とする高速ディスプレイ、SDIO、ストレージ、DCMIインターフェース。
- ウェイクアップGPIO、ブート設定、SWD切り替え、量産テスト用ピン。

#### 5.6.6. GPIO設計指針 { #566-gpio-guidelines }

- 未使用GPIOは、定義済みの状態に設定します。
- 周辺デバイスのIO電圧を、対応するIO電源ドメインに合わせます。
- GPIOプルアップによるスリープ時の漏れ電流を電力予算に含めます。
- ピンをアナログ入力、USB、オーディオ、または特殊機能に使う場合は、ユーザーマニュアルに従ってデジタル入力／出力経路を設定します。
- マトリックス接続の柔軟性によって高速配線の制約がなくなるわけではありません。ピン群とPCBの要件を守ってください。

各GPIOでは、下のIO MUX表にある機能0～15を使用できます。IO MUX表の機能16～255列はマトリックス接続を示し、続くマトリックス表には機能インデックス16～175が列挙されています。回路図を確定する前に両方の表を照合し、各周辺信号を割り当てられる物理ピンを確認してください。

<div align="center"><em>表 5.6-4: IO MUX表</em></div>

<div align="center" markdown>

| PAD | PUPD | 機能0 | 機能1 | 機能2 | 機能3 | 機能4 | 機能5 | 機能6 | 機能15 | 機能16～255 |
|:----|:-----|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-------------|:-------------------|
| `PA00` | PD | **`GPIO_A0`** | `LCDC1_SPI_RSTB` | - | `SD2_DIO2` | - | - | - | - | マトリックス表 |
| `PA01` | PD | **`GPIO_A1`** | - | - | `SD2_DIO3` | - | - | - | - | マトリックス表 |
| `PA02` | PD | **`GPIO_A2`** | `LCDC1_SPI_TE` | - | `SD2_CLK` | - | - | - | - | マトリックス表 |
| `PA03` | PU | **`GPIO_A3`** | `LCDC1_SPI_CS` | - | `SD2_CMD` | - | - | - | - | マトリックス表 |
| `PA04` | PD | **`GPIO_A4`** | `LCDC1_SPI_CLK` | - | `SD2_DIO0` | - | - | - | - | マトリックス表 |
| `PA05` | PD | **`GPIO_A5`** | `LCDC1_SPI_DIO0` | - | `SD2_DIO1` | - | - | - | - | マトリックス表 |
| `PA06` | PD | **`GPIO_A6`** | `LCDC1_SPI_DIO1` | `SD1_DIO2` | - | - | - | - | - | マトリックス表 |
| `PA07` | PD | **`GPIO_A7`** | `LCDC1_SPI_DIO2` | `SD1_DIO3` | - | - | - | - | - | マトリックス表 |
| `PA08` | PD | **`GPIO_A8`** | `LCDC1_SPI_DIO3` | `SD1_CLK` | - | - | - | - | - | マトリックス表 |
| `PA09` | PD | **`GPIO_A9`** | - | `SD1_CMD` | - | - | - | - | `#ADC1N` | マトリックス表 |
| `PA10` | PD | **`GPIO_A10`** | - | `SD1_DIO0` | - | - | - | - | `#ADC2P` | マトリックス表 |
| `PA11` | PU | **`GPIO_A11`** | `MPI3_CS2` | `SD1_DIO1` | - | - | - | - | `#ADC2N` | マトリックス表 |
| `PA12` | PU | **`GPIO_A12`** | `MPI3_CS` | `SD1_DIO2` | - | - | - | - | - | マトリックス表 |
| `PA13` | PD | **`GPIO_A13`** | `MPI3_DIO1` | `SD1_DIO3` | - | - | - | - | - | マトリックス表 |
| `PA14` | PD | **`GPIO_A14`** | `MPI3_DIO2` | `SD1_CLK` | - | - | - | - | - | マトリックス表 |
| `PA15` | PD | **`GPIO_A15`** | `MPI3_DIO0` | `SD1_CMD` | - | - | - | - | - | マトリックス表 |
| `PA16` | PD | **`GPIO_A16`** | `MPI3_CLK` | `SD1_DIO0` | - | - | - | - | - | マトリックス表 |
| `PA17` | PD | **`GPIO_A17`** | `MPI3_DIO3` | `SD1_DIO1` | - | - | - | - | - | マトリックス表 |
| `PA18` | PU | `GPIO_A18` | **`USART1_RXD`** | `SWCLK` | - | - | - | - | - | マトリックス表 |
| `PA19` | PU | `GPIO_A19` | **`USART1_TXD`** | `SWDIO` | - | - | - | - | - | マトリックス表 |
| `PA20` | PD | **`GPIO_A20`** | `SWO` | - | - | - | - | - | - | マトリックス表 |
| `PA21` | PD | **`GPIO_A21`** | - | - | - | - | - | - | - | マトリックス表 |
| `PA22` | - | **`GPIO_A22`** | - | `SD1_DIO2` | `SD2_DIO2` | - | - | - | `#XTAL32K_XI` | マトリックス表 |
| `PA23` | - | **`GPIO_A23`** | - | `SD1_DIO3` | `SD2_DIO3` | - | - | - | `#XTAL32K_XO` | マトリックス表 |
| `PA24` | PD | **`GPIO_A24`** | `SPI1_DIO` | `SD1_CLK` | `SD2_CLK` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | マトリックス表 |
| `PA25` | PD | **`GPIO_A25`** | `SPI1_DI` | `SD1_CMD` | `SD2_CMD` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | `#XTAL32K_EXT` | マトリックス表 |
| `PA26` | PU | **`GPIO_A26`** | - | `SD1_DIO0` | `SD2_DIO0` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | マトリックス表 |
| `PA27` | PU | **`GPIO_A27`** | - | `SD1_DIO1` | `SD2_DIO1` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | マトリックス表 |
| `PA28` | PD | **`GPIO_A28`** | `SPI1_CLK` | - | `SD2_DIO2` | - | - | - | `#GPADC_CH0` | マトリックス表 |
| `PA29` | PD | **`GPIO_A29`** | `SPI1_CS` | - | `SD2_DIO3` | - | - | - | `#GPADC_CH1` | マトリックス表 |
| `PA30` | PD | **`GPIO_A30`** | - | - | `SD2_CLK` | `#EFUSE_PWR` | - | - | `#GPADC_CH2` | マトリックス表 |
| `PA31` | PD | **`GPIO_A31`** | - | - | `SD2_CMD` | - | - | - | `#GPADC_CH3` | マトリックス表 |
| `PA32` | PD | **`GPIO_A32`** | - | - | `SD2_DIO0` | - | - | - | `#GPADC_CH4` | マトリックス表 |
| `PA33` | PD | **`GPIO_A33`** | - | - | `SD2_DIO1` | `#WKUP_PIN` | - | - | `#GPADC_CH5` | マトリックス表 |
| `PA34` | PD | **`GPIO_A34`** | - | - | - | `#WKUP_PIN` | - | - | `#GPADC_CH6` | マトリックス表 |
| `PA35` | PD | **`GPIO_A35`** | - | - | `USB_DP` | `#WKUP_PIN` | - | - | `#GPADC_CH7` | マトリックス表 |
| `PA36` | PD | **`GPIO_A36`** | - | - | `USB_DM` | `#WKUP_PIN` | - | - | `#GPADC_CH8` | マトリックス表 |
| `PA37` | PD | **`GPIO_A37`** | `SPI2_DIO` | `SD1_DIO2` | - | `#WKUP_PIN` | - | - | `#GPADC_CH9` | マトリックス表 |
| `PA38` | PD | **`GPIO_A38`** | `SPI2_DI` | `SD1_DIO3` | - | `#WKUP_PIN` | - | - | `#GPADC_CH10` | マトリックス表 |
| `PA39` | PU | **`GPIO_A39`** | `SPI2_CLK` | `SD1_CLK` | - | `#WKUP_PIN` | - | - | - | マトリックス表 |
| `PA40` | PU | **`GPIO_A40`** | `SPI2_CS` | `SD1_CMD` | - | `#WKUP_PIN` | - | - | - | マトリックス表 |
| `PA41` | PU | **`GPIO_A41`** | - | `SD1_DIO0` | - | `#WKUP_PIN` | - | - | - | マトリックス表 |
| `PA42` | PU | **`GPIO_A42`** | - | `SD1_DIO1` | - | `#WKUP_PIN` | - | - | - | マトリックス表 |
| `PA43` | PD | `GPIO_A43` | **`SWCLK`** | - | - | - | - | - | - | マトリックス表 |
| `PA44` | PD | `GPIO_A44` | **`SWDIO`** | - | - | - | - | - | - | マトリックス表 |
| `PA45` | PD | **`GPIO_A45`** | - | - | `SD2_DIO2` | - | - | - | - | マトリックス表 |
| `PA46` | PD | **`GPIO_A46`** | - | - | `SD2_DIO3` | - | - | - | - | マトリックス表 |
| `PA47` | PD | **`GPIO_A47`** | - | - | `SD2_CLK` | - | - | - | - | マトリックス表 |
| `PA48` | PD | **`GPIO_A48`** | - | - | `SD2_CMD` | - | - | - | - | マトリックス表 |
| `PA49` | PD | **`GPIO_A49`** | - | - | `SD2_DIO0` | - | - | - | - | マトリックス表 |
| `PA50` | PD | **`GPIO_A50`** | - | - | `SD2_DIO1` | - | - | - | - | マトリックス表 |
| `PA51` | PD | **`GPIO_A51`** | - | - | - | - | - | - | - | マトリックス表 |
| `PA52` | PD | **`GPIO_A52`** | - | - | - | - | - | - | - | マトリックス表 |
| `PA53` | PD | **`GPIO_A53`** | - | - | - | - | - | - | - | マトリックス表 |
| `PA54` | PD | **`GPIO_A54`** | - | - | - | - | - | - | - | マトリックス表 |
| `PA55` | PD | **`GPIO_A55`** | - | - | - | - | - | - | `#ADC1P` | マトリックス表 |
| `PA56` | PD | **`GPIO_A56`** | - | - | - | - | - | - | `#MICBIAS` | マトリックス表 |
| `PA57` | PD | **`GPIO_A57`** | - | - | - | - | - | - | - | マトリックス表 |

</div>

太字はリセット時のピン機能を示します。`PUPD`はリセット時の内部プル方向（`PU`はプルアップ、`PD`はプルダウン、`-`はなし）です。`#`はアナログ機能を示します。

!!! note
    - アナログ機能を使えるのは、上記IO MUX表の機能0～15に限られます。
    - MPIインターフェースに対応するのは`PA11`～`PA17`および`SB01`～`SB09`のみです。
    - Sleep、DeepSleep、Standbyでは、`PA24`～`PA27`だけが信号を出力でき、LPTIM2のPWMクロックを最大16 kHzで出力できます。
    - `PA18`と`PA19`は専用デバッグピンで、`DBG-UART`と`SWD`に対応します。
    - `PA43`と`PA44`は予備デバッグピンで、`SWD`のみに対応します。
    - `PA00`と`PA01`でデバイスのダウンロードモードと`SWD`ピン位置の切り替えを設定します。5.7.1節を参照してください。
    - 外部ハードウェア割り込みでウェイクアップできるGPIOは、`PA33`～`PA42`の10本に限られます。

<div align="center"><em>表 5.6-5: マトリックス表（機能インデックス16～175）</em></div>

<div align="center" markdown>

| モジュール | ビット幅 | インデックス | サブインデックス | 機能 |
|:-------|:----------|:------|:----------|:----------|
| I2C | 8 | 16-23 | 0-7 | `I2C1_SCL`, `I2C1_SDA`, `I2C2_SCL`, `I2C2_SDA`, `I2C3_SCL`, `I2C3_SDA`, `I2C4_SCL`, `I2C4_SDA`（インデックス順）。 |
| SPI | 8 | 24-31 | 8-15 | `SPI1_CLK`, `SPI1_CS`, `SPI1_DI`, `SPI1_DIO`, `SPI2_CLK`, `SPI2_CS`, `SPI2_DI`, `SPI2_DIO`（インデックス順）。 |
| UART | 12 | 32-43 | 16-27 | `UART1_TXD`, `UART1_RXD`, `UART1_RTS`, `UART1_CTS`, `UART2_TXD`, `UART2_RXD`, `UART2_RTS`, `UART2_CTS`, `UART3_TXD`, `UART3_RXD`, `UART3_RTS`, `UART3_CTS`（インデックス順）。 |
| CAN | 4 | 44-47 | 28-31 | `CAN1_TXD`, `CAN1_RXD`, `CAN2_TXD`, `CAN2_RXD`（インデックス順）。 |
| PTA/BT | 6 | 48-53 | 32-37 | `BT_ACTIVE`, `BT_PRIORITY`, `BT_COLLISION`, `WLAN_ACTIVE`, `BT_TX`, `BT_RX`（インデックス順）。 |
| GPTIM | 10 | 54-63 | 38-47 | `GPTIM1_CH1`, `GPTIM1_CH2`, `GPTIM1_CH3`, `GPTIM1_CH4`, `GPTIM1_ETR`, `GPTIM2_CH1`, `GPTIM2_CH2`, `GPTIM2_CH3`, `GPTIM2_CH4`, `GPTIM2_ETR`（インデックス順）。 |
| LPTIM | 6 | 64-69 | 48-53 | `LPTIM1_IN`, `LPTIM1_OUT`, `LPTIM1_ETR`, `LPTIM2_IN`, `LPTIM2_OUT`, `LPTIM2_ETR`（インデックス順）。 |
| ATIM | 20 | 70-89 | 54-73 | `ATIM1_CH1`, `ATIM1_CH2`, `ATIM1_CH3`, `ATIM1_CH4`, `ATIM1_ETR`, `ATIM1_CH1N`, `ATIM1_CH2N`, `ATIM1_CH3N`, `ATIM1_BK`, `ATIM1_BK2`, `ATIM2_CH1`, `ATIM2_CH2`, `ATIM2_CH3`, `ATIM2_CH4`, `ATIM2_ETR`, `ATIM2_CH1N`, `ATIM2_CH2N`, `ATIM2_CH3N`, `ATIM2_BK`, `ATIM2_BK2`（インデックス順）。 |
| PWM | 5 | 90-94 | 74-78 | `PWM1_CH1`, `PWM1_CH2`, `PWM1_CH3`, `PWM1_CH4`, `PWM1_CH5`（インデックス順）。 |
| I2S | 10 | 95-104 | 79-88 | `I2S1_MCLK`, `I2S1_SDO`, `I2S1_SDI`, `I2S1_BCK`, `I2S1_LRCK`, `I2S2_MCLK`, `I2S2_SDO`, `I2S2_SDI`, `I2S2_BCK`, `I2S2_LRCK`（インデックス順）。 |
| PTM | 16 | 105-120 | 89-104 | `PTM1_CH0`～`PTM1_CH15`（インデックス順）。 |
| LCDC | 30 | 121-150 | 105-134 | インデックス順に`LCDC_IF0`～`LCDC_IF29`。インターフェースモードごとのサブマッピングは表5.6-6を参照してください。 |
| PDM | 6 | 151-156 | 135-140 | `PDM1_CLK`, `PDM2_CLK`, `PDM1_DATA`, `PDM1_DATA2`, `PDM2_DATA`, `PDM2_DATA2`（インデックス順）。 |
| DCMI | 19 | 157-175 | 141-159 | `DCMI_CLK`、`DCMI_HSYNC`、`DCMI_VSYNC`、`DCMI_DI0`～`DCMI_DI15`（インデックス順）。 |

</div>

上記の機能は、配線およびレイアウト上の制約に従い、任意のGPIOにマトリックス接続できます。インデックス列とサブインデックス列は、ファームウェアでマトリックスルーターを設定するときに使用するレジスターフィールド値です。

<div align="center"><em>表 5.6-6: LCDCマトリックスSub-MUX表</em></div>

<div align="center" markdown>

| マトリックス信号 | SPI（`IF_SEL=0`） | JDI（`IF_SEL=0`） | EPD（`IF_SEL=1`） | DBI（`IF_SEL=2`） | DPI（`IF_SEL=3`） |
|:---------------|:--------------------|:---------------------|:---------------------|:---------------------|:---------------------|
| `LCDC_IF0` | `LCDC_SPI_TE` | - | `LCDC_TCON_GDSP` | `LCDC_8080_TE` | `LCDC_DPI_CLK` |
| `LCDC_IF1` | `LCDC_SPI_RSTB` | - | `LCDC_TCON_GDCLK` | `LCDC_8080_RSTB` | `LCDC_DPI_HSYNC` |
| `LCDC_IF2` | `LCDC_SPI_CS` | - | `LCDC_TCON_SDCLK` | `LCDC_8080_CS` | `LCDC_DPI_VSYNC` |
| `LCDC_IF3` | `LCDC_SPI_CLK` | - | `LCDC_TCON_SDSTL` | `LCDC_8080_WR` | `LCDC_DPI_DE` |
| `LCDC_IF4` | - | - | `LCDC_TCON_SDLE` | `LCDC_8080_RD` | `LCDC_DPI_SD` |
| `LCDC_IF5` | - | - | `LCDC_TCON_SDOE` | `LCDC_8080_DC` | `LCDC_DPI_CM` |
| `LCDC_IF6` | `LCDC_SPI_DIO0` | - | `LCDC_TCON_SDAT0` | `LCDC_8080_DIO0` | `LCDC_DPI_R0` |
| `LCDC_IF7` | `LCDC_SPI_DIO1` | - | `LCDC_TCON_SDAT1` | `LCDC_8080_DIO1` | `LCDC_DPI_R1` |
| `LCDC_IF8` | `LCDC_SPI_DIO2` | - | `LCDC_TCON_SDAT2` | `LCDC_8080_DIO2` | `LCDC_DPI_R2` |
| `LCDC_IF9` | `LCDC_SPI_DIO3` | - | `LCDC_TCON_SDAT3` | `LCDC_8080_DIO3` | `LCDC_DPI_R3` |
| `LCDC_IF10` | - | `LCDC_JDI_SCS` | `LCDC_TCON_SDAT4` | `LCDC_8080_DIO4` | `LCDC_DPI_R4` |
| `LCDC_IF11` | - | `LCDC_JDI_SCLK` | `LCDC_TCON_SDAT5` | `LCDC_8080_DIO5` | `LCDC_DPI_R5` |
| `LCDC_IF12` | - | `LCDC_JDI_SO` | `LCDC_TCON_SDAT6` | `LCDC_8080_DIO6` | `LCDC_DPI_R6` |
| `LCDC_IF13` | - | `LCDC_JDI_DISP` | `LCDC_TCON_SDAT7` | `LCDC_8080_DIO7` | `LCDC_DPI_R7` |
| `LCDC_IF14` | - | `LCDC_JDI_EXTCOMIN` | `LCDC_TCON_SDAT8` | `LCDC_8080_DIO8` | `LCDC_DPI_G0` |
| `LCDC_IF15` | - | - | `LCDC_TCON_SDAT9` | `LCDC_8080_DIO9` | `LCDC_DPI_G1` |
| `LCDC_IF16` | - | - | `LCDC_TCON_SDAT10` | `LCDC_8080_DIO10` | `LCDC_DPI_G2` |
| `LCDC_IF17` | - | - | `LCDC_TCON_SDAT11` | `LCDC_8080_DIO11` | `LCDC_DPI_G3` |
| `LCDC_IF18` | - | `LCDC_JDI_VCK` | `LCDC_TCON_SDAT12` | `LCDC_8080_DIO12` | `LCDC_DPI_G4` |
| `LCDC_IF19` | - | `LCDC_JDI_XRST` | `LCDC_TCON_SDAT13` | `LCDC_8080_DIO13` | `LCDC_DPI_G5` |
| `LCDC_IF20` | - | `LCDC_JDI_HCK` | `LCDC_TCON_SDAT14` | `LCDC_8080_DIO14` | `LCDC_DPI_G6` |
| `LCDC_IF21` | - | `LCDC_JDI_HST` | `LCDC_TCON_SDAT15` | `LCDC_8080_DIO15` | `LCDC_DPI_G7` |
| `LCDC_IF22` | - | `LCDC_JDI_ENB` | - | `LCDC_8080_RWN` | `LCDC_DPI_B0` |
| `LCDC_IF23` | - | `LCDC_JDI_VST` | - | `LCDC_8080_CS2` | `LCDC_DPI_B1` |
| `LCDC_IF24` | - | `LCDC_JDI_R1` | - | - | `LCDC_DPI_B2` |
| `LCDC_IF25` | - | `LCDC_JDI_G1` | - | - | `LCDC_DPI_B3` |
| `LCDC_IF26` | - | `LCDC_JDI_B1` | - | - | `LCDC_DPI_B4` |
| `LCDC_IF27` | - | `LCDC_JDI_R2` | - | - | `LCDC_DPI_B5` |
| `LCDC_IF28` | - | `LCDC_JDI_G2` | - | - | `LCDC_DPI_B6` |
| `LCDC_IF29` | - | `LCDC_JDI_B2` | - | - | `LCDC_DPI_B7` |

</div>

!!! warning "LCDCサブMUX表のIF_SEL値"
    SiFliの原表では、SPIとJDIの両モードに`IF_SEL=0`が割り当てられています。本記事では原表の値を維持していますが、重複した割り当ては曖昧です。パネルを設定する前に、該当するSDKドライバーとリファレンスデザインで確認してください。この表だけからレジスター値を推定しないでください。

#### 5.6.7. 汎用インターフェース { #567-general-interfaces }

すべての汎用インターフェースを同じ観点で確認してください。電気的な接続、IO電圧、リセット／スリープ時の初期状態、プルアップ電源レール、ESDへの露出、ブート／デバッグ／ウェイクアップ／高速機能との競合を点検します。

`PA34`は電源キーおよび長押しリセットに対応します。リセットはHighアクティブのため、基板側に10 kΩのプルダウンを設けます。キーを押すとピンがHighになり、10秒間の長押しでハードウェアリセットが発生します。GPADCの抵抗ラダー式キー回路では、1.1 kΩ、2.8 kΩ、5.1 kΩのキー抵抗を使用します。各ノードには順に2.97 V/1.62 V、2.58 V/1.41 V、2.19 V/1.19 Vと記されています。`PA34`ノードには10 kΩのプルダウンとGNDへの100 nFコンデンサーも接続します。外部に露出する各キーの近くにESD保護を設けてください。

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png" width="80%" alt="PA34電源キーおよびGPADC抵抗ラダー式キーの参考回路" /></div>
<div align="center"><em>図 5.6-2: PA34電源キーおよびGPADCキーの参考回路</em></div>

!!! warning "GPADCキー電圧のラベル"
    SiFliの回路図は各キーのノード電圧をスラッシュ区切りで2つ示していますが、それぞれの電圧が対応する条件は説明されていません。しきい値として使う前に、対象の電源構成とリファレンスデザインで対応関係を確認してください。

#### 5.6.8. インターフェースの確認原則 { #568-interface-review-principles }

周辺インターフェースごとに、次の4項目を確認してください。

1. 信号の接続方向、プルアップ／プルダウン抵抗、ESD保護、終端を含む電気的接続。
2. 周辺デバイスの電源オフ時の逆給電リスクを含むIO電圧ドメインの互換性。
3. リセット時とスリープ時の安全な初期状態。
4. ブート、ダウンロード、SWD、USB、ウェイクアップ、高速ディスプレイの多重化機能との競合。

#### 5.6.9. UART { #569-uart }

- SF32LB57xは最大6 Mbpsの全二重UARTを3系統備え、データ形式を設定できます。機能0～15のピン、または任意GPIOへのマトリックス接続を使用できます。
- MCUのRXDを周辺デバイスのTXDに、MCUのTXDを周辺デバイスのRXDに接続します。
- 周辺デバイスのIO電圧をMCUのIOドメインに合わせます。
- USB、ブート、ダウンロード、デバッグ機能と多重化されているUARTピンについて、リセット時の動作を確認します。
- `PA18`と`PA19`は既定のDBG-UARTピンです。頻繁に抜き差しするUARTテストインターフェースについて、原文では`PA18`、`PA19`、`PA43`、`PA44`を推奨しています。これらのGPIOの耐圧は5.5 Vです。長いテストリードには100 Ωの直列抵抗を追加し、オーバーシュートを抑えてください。

#### 5.6.10. I2C { #5610-i2c }

- SDAとSCLにはプルアップ抵抗が必要です。
- SF32LB57xはホスト／デバイス両モードに対応するI2Cを4系統備え、任意GPIOにマトリックス接続できます。
- 原文では、標準モード（100 kHz）に4.7 kΩ、ファストモード（400 kHz）に2.2～3.3 kΩ、ファストモードプラス（1 MHz）に1～2.2 kΩを推奨しています。400 kHzでは2.2 kΩを初期値とし、バス容量に応じて調整してください。
- 共用I2Cバスではホスト付近に1組のプルアップ抵抗を設ければ十分です。各デバイスに個別の抵抗を追加しないでください。プルアップは周辺機器の電源レールから給電し、その電源と一緒にオフにしてスリープ時の漏れ電流を防いでください。
- 同じバス上の各デバイスに固有のアドレスが設定されていることを確認します。

#### 5.6.11. SPI { #5611-spi }

- SF32LB57xはホスト／デバイス両モードに対応するSPIを2系統備えます。機能0～15のピンまたはマトリックス接続を使用できます。
- MCUのSDOを周辺デバイスのSDIに、MCUのSDIを周辺デバイスのSDOに接続します。
- CLK、CS、モード、位相、極性、最大周波数を周辺デバイスのデータシートに合わせます。
- 高速SPIは連続したリファレンスGND上で短く配線します。シグナルインテグリティ試験で必要と確認された場合は、直列ダンピング抵抗を追加します。
- 30 MHz未満のSPIは任意のGPIOにマトリックス接続できます。30 MHzを超える場合は、機能0～15の専用ピンを優先してください。
- 高速SPIでは、ドライバーの近くに22～27 Ωの直列抵抗を配置し、シグナルインテグリティ調整用にクロック線へシャントコンデンサーの未実装フットプリントを確保します。

#### 5.6.12. SDIO { #5612-sdio }

- SF32LB57xにはSD/MMCホストコントローラーが2系統あり、ホストモードのみで動作します。SDカード、SDIO周辺機器、eMMCに接続でき、SDIO信号はピンMUXで決まるGPIOに固定されます。
- SDIO信号は一組として配線します。
- 可能な限り全長を約50 mm以内に、信号間のスキューを約6 mm以内に抑えます。
- CLK、CMD、DATAの各配線は、連続したリファレンスGND上に配置します。
- SDIO／eMMC／SD NANDのプルアップ、電源制御、電圧ドメインを確認します。
- 24 MHzではCMDとData0～Data3に内蔵GPIOプルアップを使用できる場合があります。48 MHz以上では、CMDとData0～Data3に10 kΩの外付けプルアップを追加します。
- SDIO信号に27～33 Ωの直列抵抗を追加し、クロック線にはシャントコンデンサー用の未実装フットプリントを確保します。
- 外部TFカードソケットでは、カード検出DETを10 kΩで3.3 Vにプルアップし、MCU側を内部プルアップ入力に設定します。SDIO信号と電源経路の両方にESD保護を設けてください。

#### 5.6.13. USB { #5613-usb }

<div align="center"><em>表 5.6-7: USBピン割り当て</em></div>

<div align="center" markdown>

| USB信号 | GPIOピン |
|:------------|:----------|
| `USB_DP` | `PA35` |
| `USB_DM` | `PA36` |

</div>

- USBのDP／DNは90 Ω差動ペアとして配線します。
- USBのDP／DMには通常、多重化機能として`PA35`／`PA36`を使います。USBを有効にする場合、リセット中に外部回路が危険な電圧レベルを強制しないようにしてください。
- ESD保護素子はコネクターの近くに配置し、信号をチップに入れる前にESD素子を通します。
- スタブを避け、差動ペアのマッチングとリファレンスGNDの連続性を保ちます。
- スリープ中のUSB接続をウェイクアップ要因にする場合は、VBUS分圧回路をウェイクアップ対応GPIOに接続します。このGPIOを充電器の接続検出にも共用することを推奨します。
- `PA35`は`USB_DP`、`PA36`は`USB_DM`に固定されており、これらの機能は再マッピングできません。USB 2.0 FSは最大12 Mbpsに対応します。
- DP／DMのチップ側近くに22 Ωまたは33 Ωの直列抵抗を設け、シグナルインテグリティ調整用にシャントコンデンサーの未実装フットプリントを確保します。
- USBは3.3 Vシングルエンド信号です。チップ内蔵の識別抵抗を備え、ソフトウェアからDPまたはDMに1.5 kΩのプルアップを有効化してフルスピード／ロースピードを識別できます。USB有効時は、多重化の競合を避けるためPA35とPA36を高インピーダンス入力に設定してください。

#### 5.6.14. CAN { #5614-can }

- SF32LB57xはCAN 2.0B互換のCANインターフェースを2系統備え、マトリックス接続で任意GPIOに割り当てられます。
- CANトランシーバーの電源電圧とIO電圧をMCUに合わせます。
- システム要件に応じて終端抵抗、コモンモードチョーク、ESD保護を追加します。
- 産業機器や車載環境では、サージ、EFT、ESD、グラウンド電位差への対策を確認します。

#### 5.6.15. GPADC { #5615-gpadc }

- GPADC入力電圧を定格範囲の0～3.3 V以内に保ちます。
- ピン多重化を介してGPADCに使用できるのは`PA28`～`PA38`の11ピンだけです。他のピンにこの機能を割り当てないでください。
- 分圧測定には1%抵抗を使用します。
- 各GPADC入力では、チップピンの近くに100 nF（0.1 µF）のフィルターコンデンサーを配置します。
- GPADC配線をDC/DC、RF、USB、SDIO、ディスプレイクロック、充電ループから離します。

<div align="center"><em>表 5.6-8: GPADCピン割り当て</em></div>

<div align="center" markdown>

| ピン | GPADC機能 |
|:----|:---------------|
| `PA28` | `GPADC_CH0` |
| `PA29` | `GPADC_CH1` |
| `PA30` | `GPADC_CH2` |
| `PA31` | `GPADC_CH3` |
| `PA32` | `GPADC_CH4` |
| `PA33` | `GPADC_CH5` |
| `PA34` | `GPADC_CH6` |
| `PA35` | `GPADC_CH7` |
| `PA36` | `GPADC_CH8` |
| `PA37` | `GPADC_CH9` |
| `PA38` | `GPADC_CH10` |
| `VBAT`／`VBATS` | `GPADC_CH11`。電池電圧ドメインに属し、通常のGPADCピンとは測定範囲が異なります。 |

</div>

!!! warning "VBATSのピン電圧と測定範囲"
    3.3 V電源バリアントの電源ピン表では`VBATS`を0～4.7 Vとしていますが、回路図チェックリストのバッテリー電圧測定範囲は0～4.5 Vです。GPADCで測定する場合は、より狭い0～4.5 Vの範囲に従ってください。ピン表の4.7 V上限をADCの有効測定範囲とみなさないでください。

### 5.7. 製造 { #57-manufacturing }

#### 5.7.1. 量産時のブート／ダウンロードモード { #571-production-boot-and-download-modes }

既定のデバッグ／ダウンロードピンに量産治具からアクセスできるようにし、製品IO割り当て前にブート制御用ピンを確保してください。SiFliのチェックリストでは`PA43`/`PA44`にハンダ付け可能なテストポイントを必須とし、`PA00`にはプルアップとテストポイントを指定しています。`PA01`の抵抗とテストポイントは任意です。

<div align="center"><em>表 5.7-1: デバッグおよびブート制御用テストポイント</em></div>

<div align="center" markdown>

| 信号 | ピン | 量産要件 |
|:-----|:----|:---------|
| DBG_UART_RXD | PA18 | 既定のデバッグUART受信ピンを確保し、治具からアクセスできるようにします。 |
| DBG_UART_TXD | PA19 | 既定のデバッグUART送信ピンを確保し、治具からアクセスできるようにします。 |
| SWD_CLK | PA43 | ハンダ付け可能なテストポイントを設けます。 |
| SWD_DIO | PA44 | ハンダ付け可能なテストポイントを設けます。 |
| ブートモード選択 | PA00 | プルアップとテストポイントを設けます。 |
| SWD位置選択 | PA01 | 抵抗とテストポイントは任意です。 |

</div>

<div align="center"><em>表 5.7-2: ブートモードとダウンロードインターフェース</em></div>

<div align="center" markdown>

| `PA00`／ブートレジスター | `PA01` | ホスト側ブートスイッチ | ブート分岐と利用可能なインターフェース |
|:-----------------------|:-------|:-----------------|:------------|
| L | H | 任意 | 通常ブート。`PA19`からブートログは出力されません。`PA18`／`PA19`はSWDに切り替わり、`PA43`／`PA44`のSWDは無効です。 |
| L | L | オフ | 通常ブート。`PA19`からブートログを出力します。`PA18`／`PA19`はDBG-UART、`PA43`／`PA44`はSWDです。 |
| L | L | オン | ブートモード。DBG-UART、SWD、UART、USBによる書き込みに対応します。 |
| `PA00`またはブートレジスター=1 | L | 任意 | ブートモード。DBG-UART、SWD、UART、USBによる書き込みに対応します。 |
| `PA00`またはブートレジスター=1 | H | 任意 | ブートモード。`PA19`からブートログは出力されません。SWD／USB書き込みに対応し、`PA18`／`PA19`はSWDに切り替わります。 |

</div>

!!! warning "原文のデバッグUARTテストポイント名"
    2.10節ではGのないDB_UART_RXDが2回記載されています。デバッグピン表とチェックリストでは、`PA18`がDBG_UART_RXD、`PA19`がDBG_UART_TXDです。製造リリース前に治具との信号名を照合し、RXDを重複して確保しないでください。

<div align="center"><em>表 5.7-3: 原文に記載された量産テストポイント一覧</em></div>

<div align="center" markdown>

| 原文の一覧 | 原文に記載された適用範囲 | 記載されたテストポイント |
|:-----------|:------------------------|:-------------------------|
| 2.10節の量産書き込み／水晶校正の一覧 | 記載なし | VBAT、PVDD、GND、AVDD33、PA00、PA01、DB_UART_RXD（2回記載）。 |
| ハードウェアチェックリスト4.8、項目1 | バッテリー駆動バリアント | VBATまたは3.3 V、GND、PA18（DBG_UART_RXD）、PA19（DBG_UART_TXD）、VSYS（3.3 Vバリアントにはなし）、PA34。 |
| ハードウェアチェックリスト4.8、項目3 | 全モデル | VBATまたは3.3 V、GND、PA18、PA19、VDD33_VOUT1（3.3 V系列にはなし）、PA00、PA01、PA34。パッドの寸法、間隔、向きを治具プローブに合わせます。 |

</div>

#### 5.7.2. 量産書き込みと校正 { #572-production-programming-and-calibration }

原文では、オフラインプログラマーを使ってFlashへの書き込みと水晶校正を行います。この節では、RF校正や電源電流の測定については規定されていません。量産パッドを配置する際は、原文に記載されたプローブの寸法、間隔、向きの要件に従い、表5.7-3のテストポイント一覧の相違点を量産治具の担当者に確認してください。

[SiFliオフラインプログラマーの資料](https://wiki.sifli.com/tools/index.html)を参照してください。
