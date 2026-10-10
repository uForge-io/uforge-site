---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB55x MCUの回路図設計ガイド。電源系統、ブートモード、クロック生成、RF、ストレージ、ディスプレイ／タッチ、ウェイク、GPADC、製造用インターフェースを扱います。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB55x ハードウェア設計ガイド — 回路図設計 { #sf32lb55x-hardware-design-guide-schematic-design-guidelines }

## 5. 回路図設計ガイドライン { #5-schematic-design-guidelines }

<div align="center"><em>表 5-1: 回路図セクション一覧</em></div>

<div align="center" markdown>

| 区分 | 項目 |
|:---------|:-----|
| 電源系統 | PMU電源レール、その他の電源レール、コンデンサー、POR／BOR／リセット、BUCKインダクター |
| ブートモード | Modeピンの電圧ドメイン、プル抵抗、ダウンロードと復旧、量産アクセス。 |
| クロック生成 | 48 MHz水晶振動子、32.768 kHz水晶振動子、整合コンデンサーの確認 |
| RF | RF整合、50 Ωアンテナ経路、AVDD_BRFのフィルタリング、RFキープアウト |
| ストレージインターフェース | OPI PSRAM、QSPI NOR／NAND／PSRAM、SDIO eMMC／Micro SD |
| ディスプレイとタッチ | MIPI DSI、SPI／QSPI、MCU8080、JDI、タッチ割り込み、リセット、バックライト、パネル電源 |
| ウェイク、GPADC、製造インターフェース | ウェイク源とボタン、モーターPWM、GPADC分圧、センサー、Bluetoothオーディオ、DBG-UART、SWD、量産書き込み、水晶校正。 |

</div>

### 5.1. 電源系統 { #51-power-system }

QFN68LのSF32LB551には、VDD2、BUCK2_VSW、BUCK2_VOUT、LDOVCC2_VOUT、AVDD_DSIの各ピンがありません。電源とコンデンサーの表は、選択したパッケージに存在するピンにのみ適用してください。BGAパッケージはBUCK出力を2系統備え、BUCK2はBUCKまたはLDOモードで動作します。BUCKモードを推奨します。QFN68LのBUCK出力は1系統です。

<div align="center"><em>表 5.1-1: PMU電源ピン</em></div>

<div align="center" markdown>

| PMU電源ピン | 最小電圧 (V) | 標準電圧 (V) | 最大電圧 (V) | 最大電流 (mA) | 詳細説明 |
|:------------|-------------:|-------------:|-------------:|--------------:|:-----|
| VDD1 | 1.71 | 1.8 | 3.6 | 50 | VDD1電源入力 |
| VDD2 | 1.71 | 1.8 | 3.6 | 50 | VDD2電源入力 |
| BUCK1_VSW BUCK1_VOUT | - | 1.25 | - | 50 | BUCK1のVSW出力をインダクターへ接続します。内部電源入力1はインダクターの反対側と外付けコンデンサーに接続します |
| BUCK2_VSW BUCK2_VOUT LDOVCC2_VOUT | - | 0.9 | - | 50 | BUCK2のVSW出力をインダクターへ接続します。内部電源入力2はインダクターの反対側と外付けコンデンサーに接続します |
| LDO_VOUT1 | - | 1.1 | - | 50 | LDO出力1。外付けコンデンサーを接続します |
| LDO_VOUT2 | - | 0.9 | - | 20 | LDO出力2。外付けコンデンサーを接続します |
| VDD_RET | - | 0.9 | - | 1 | RET LDO出力。外付けコンデンサーを接続します |
| VDD_RTC | - | 1.1 | - | 1 | RTC LDO出力。外付けコンデンサーを接続します |

</div>

<div align="center"><em>表 5.1-2: その他の電源ピン</em></div>

<div align="center" markdown>

| その他の電源ピン | 最小電圧 (V) | 標準電圧 (V) | 最大電圧 (V) | 最大電流 (mA) | 詳細説明 |
|:----------------|-------------:|-------------:|-------------:|--------------:|:-----|
| AVDD_BRF | 1.71 | 1.8 | 3.63 | 30 | RF電源入力 |
| AVDD_DSI | 1.71 | 1.8 | 2.75 | 20 | MIPI DSI電源入力。必ず給電してください |
| VDD_SIP | 1.71 | 1.8 | 1.98 | 30 | SiP内蔵メモリーチップの電源入力 |
| AVDD33 | 3.15 | 3.3 | 3.63 | 50 | 電源入力 |
| VDDIOA | 1.71 | 1.8 | 3.63 | - | PA I/O電源入力 |
| VDDIOB | 1.71 | 1.8 | 3.63 | - | PB I/O電源入力 |

</div>

<div align="center"><em>表 5.1-3: 必要な電源コンデンサー</em></div>

<div align="center" markdown>

| 電源ピン | コンデンサ | 詳細説明 |
|:---------|:------------|:-----|
| VDD1 VDD2 | 0.1 µF + 10 µF | VDD1とVDD2を同一ネットに接続します。10 µFと0.1 µFのコンデンサーを各1個以上、ピンの近くに配置してください |
| BUCK1_VSW BUCK1_VOUT | 0.1 µF + 4.7 µF | 4.7 µFと0.1 µFのコンデンサーを各1個以上、ピンの近くに配置してください |
| BUCK2_VSW BUCK2_VOUT | 0.1 µF + 4.7 µF | 4.7 µFと0.1 µFのコンデンサーを各1個以上、ピンの近くに配置してください |
| LDOVCC2_VOUT | 0.1 µF + 4.7 µF | BUCK2をBUCKモードに設定する場合、このピンはオープンにします。LDOモードの場合はBUCK2_VSWをオープンにし、LDOVCC2_VOUTとBUCK2_VOUTを同一ネットに接続して、4.7 µFと0.1 µFのコンデンサーを各1個以上ピンの近くに配置します |
| LDO_VOUT1 | 4.7 µF | 4.7 µFのコンデンサーを少なくとも1個、ピンの近くに配置してください |
| LDO_VOUT2 | 4.7 µF | 4.7 µFのコンデンサーを少なくとも1個、ピンの近くに配置してください |
| VDD_RET | 0.47 µF | 0.47 µFのコンデンサーを少なくとも1個、ピンの近くに配置してください |
| VDD_RTC | 1 µF | 1 µFのコンデンサーを少なくとも1個、ピンの近くに配置してください |
| VDD_SIP | 1 µF | 1 µFのコンデンサーを少なくとも1個、ピンの近くに配置してください |
| SDMADC_VREF | 4.7 µF | 4.7 µFのコンデンサーを少なくとも1個、ピンの近くに配置してください |
| AVDD_DSI | 0.1 µF + 10 µF | 10 µFと0.1 µFのコンデンサーを各1個以上、ピンの近くに配置してください |
| AVDD33 | 4.7 µF | 4.7 µFのコンデンサーを少なくとも1個、ピンの近くに配置してください |
| AVDD_BRF | 1 µF | 1 µFのコンデンサーを少なくとも1個、ピンの近くに配置してください |
| VDDIOA VDDIOB | 2 × 0.1 µF + 2 × 1 µF | 各ピンの近くに1 µFと0.1 µFのコンデンサーを各1個以上配置してください |

</div>

必要なコンデンサーは対応するピンの近くに配置し、BUCKの電流ループを小さく保ち、レイアウト前にBUCK／LDOの動作モードを確認してください。リセット回路とPOR／BORのタイミングは実機で検証します。

資料間に不一致があります。[SiFliの中国語版ハードウェアアプリケーションガイド](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)の表3-3と[V1.0回路図チェックリスト](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)の項目9は、VDD_RTCに1 µFを指定しています。一方、[同ガイドのリファレンス回路図でC0313](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png)は0.1 µFと記載されています。各値の適用条件は資料に説明されていません。設計リリース前に対象デバイスの値をSiFliへ確認し、推測で不一致を解消しないでください。

VDD1とVDD2は同時に投入してください。SF32LB551にはVDD2がありません。RSTNをVDD1の入力電圧ドメインへプルアップし、0.1 µFをGNDへ接続します。基準図ではプルアップ電源が1.8 V/3.3 Vと記され、抵抗は10 kΩです。設計で使用するVDD1の電圧ドメインに合ったレベルを選んでください。図5.1-1には、PORレベル1.50 V、2.5 V～1.5 Vの範囲で設定できるBOR、RSTNの0.7 Vのマーカーが示されています。図5.1-3の実測波形では、電源の立ち上がりからリセット解除まで約700 µsです。これは当該例の測定結果であり、すべての設計で保証される遅延ではありません。

![図 5.1-1: 電源オン／オフのタイミング](../../sf32-products/chips/assets/55x/SF32LB55x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-1: 電源オン／オフのタイミング</em></div>

![図 5.1-2: リセット回路](../../sf32-products/chips/assets/55x/SF32LB55x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-2: リセット回路</em></div>

![図 5.1-3: 電源投入とリセットの実測波形](../../sf32-products/chips/assets/55x/SF32LB55x-RST-Test.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-3: 電源投入とリセットの実測波形</em></div>

![図 5.1-4: BGA DC-DC基準回路](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-BGA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-4: BGA DC-DC基準回路</em></div>

![図 5.1-5: QFN DC-DC基準回路](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-QFN-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-5: QFN DC-DC基準回路</em></div>

SiFliのハードウェアアプリケーションノートに従い、BUCK用インダクタは4.7 µH、直流抵抗DCR ≤ 0.4 Ω、飽和電流Isat ≥ 450 mAを満たすものを選びます。

### 5.2. ブートモード { #52-boot-mode }

<div align="center"><em>表 5.2-1: ブートモード設定</em></div>

<div align="center" markdown>

| モード設定 | 詳細説明 |
|:-----------|:-----|
| Highレベル | チップの電源投入と起動後、ダウンロードモードに入ります |
| Lowレベル | チップの電源投入と起動後、ユーザープログラム領域へ移動して実行します |

</div>

Highモードでは電源投入後にダウンロードモードへ入り、Lowモードではユーザープログラムを起動します。量産治具で必要なブート状態を強制できること、また製品筐体や試験アクセスによってブート関連ピンが操作できなくならないことを確認してください。

Modeピンの電圧ドメインはVDDIOAと共通です。外付けの10 kΩ抵抗で対応する電源またはGNDに接続し、安定したレベルを保ってください。フローティングや意図しないレベル変化は避けます。量産基板では、ファームウェア書き込みと水晶校正用のModeテストポイントが必須ですが、ジャンパは不要です。試験基板にはジャンパ用の領域を確保し、アプリケーションが停止した場合にダウンロードモードで起動して復旧できるようにしてください。

### 5.3. クロック生成 { #53-clock-generation }

<div align="center"><em>表 5.3-1: 水晶振動子の要件</em></div>

<div align="center" markdown>

| 水晶振動子 | 仕様要件 | 詳細説明 |
|:-----------|:---------|:-----|
| 48 MHz | 7 pF≦CL≦12 pF（推奨値 8.8 pF）、△F/F0≦±10 ppm、ESR≦30 Ω（推奨値 22 Ω） | 水晶発振器の消費電力は CL と ESR に関係します。両方の値が小さいほど消費電力は低くなります。消費電力を抑えるには、仕様範囲内で CL と ESR が比較的小さい部品を選びます。水晶振動子の近くに並列整合コンデンサー用のフットプリントを確保してください。CL<12 pFの場合、コンデンサーを実装する必要はありません |
| 32.768 kHz | CL≦12.5 pF（推奨値 7 pF）、△F/F0≦±20 ppm、ESR≦80 kΩ（推奨値 38 kΩ） | 水晶振動子の消費電力は CL と ESR に関係します。両方の値が小さいほど消費電力は低くなります。消費電力を抑えるには、仕様範囲内で CL と ESR が比較的小さい部品を選びます。水晶振動子の近くに並列整合コンデンサー用のフットプリントを確保してください。CL<12.5 pFの場合、コンデンサーを実装する必要はありません |

</div>

両方の水晶振動子をチップの近くに配置し、配線を短く対称に保ち、整合コンデンサー用フットプリントを確保してください。水晶ネットをRF、BUCK、ディスプレイ、モーターのノイズから保護します。

### 5.4. RF { #54-rf }

SF32LB55xのRFフロントエンドには、チップ内蔵の広帯域整合フィルター技術が使用されています。RF基板配線の特性インピーダンスを50 Ωに保ち、スプリアスフィルタリングとアンテナ整合のためにπ型整合回路を確保してください。最終的な部品値は実際のアンテナとPCBレイアウトで評価して決定します。選定したアンテナがすでに整合済みの場合、通常は確保した整合回路に追加部品を実装する必要はありません。

RF配線の基準GNDを連続させ、整合回路をチップ側の近くに配置し、AVDD_BRFのフィルターをピンの近くに置きます。DC-DC、VBAT、水晶振動子、高速クロック、SPI、SDIO、I2S、UARTの配線はRF領域から離してください。

RF基準回路ではANTにC0323（15 pF/50 V）を直列接続し、GNDへの並列位置C0318とC0319は未実装（NF）としています。これらは例示値であり、すべてのアンテナに適用できる整合値ではありません。

![図 5.4-1: RF整合の基準回路](../../sf32-products/chips/assets/55x/SF32LB55x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.4-1: RF整合の基準回路</em></div>

### 5.5. ストレージインターフェース { #55-storage-interfaces }

SF32LB55xはOPI PSRAM、QSPI NOR／NAND FlashおよびPSRAM、SDIO eMMCまたはMicro SDに対応します。パッケージによって使用可能なピンとインターフェースが異なるため、ピンを確定してPCBスタックアップをレビューする前にストレージを選定してください。

BGA145の外付けOPI PSRAMは1チャネル、BGA169は2チャネルです。表5.5-1～5.5-3は、BGA145の構成とBGA169の2個のメモリを示しており、同一パッケージの3チャネルではありません。QSPIの各表はQSPI2、QSPI3、QSPI4に対応します。SDIOの各表はSDIO1の4ビット／8ビットモードとSDIO2の4ビットモードに対応します。

外付けQSPI PSRAMにはQSPI2を推奨します。HCPUのGPIOで外付けOPI/QSPI PSRAMの電源を制御する場合、PUタイプのHCPUピンを使用し、Highでオン、Lowでオフにしてください。内蔵FlashのVDD_SIPをスイッチ制御する場合はPA58を使用し、同じ極性で制御します。QSPI4にNOR Flashを追加するか決める前に、LCPUの加速度・心拍アルゴリズムに必要なFlash容量をSiFliのFAEと確認してください。

原資料のOPI表では方向の表記が統一されていません。[BGA145のリファレンス回路図](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png)、[BGA169メモリ1のリファレンス回路図](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png)、[メモリ2のリファレンス回路図](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png)では、MCUのPA37/PA20およびPA07/PA08から外付けPSRAMのCS#とCLKへ接続されています。したがって、以下の表ではMCU側を基準にし、CS#とCLKをMCU出力／PSRAM入力として記載します。回路図ではDQS/DMの固定方向は確認できないため、選定したPSRAMのデータシートで機能と方向を確認してください。

図示の各PSRAMは1.8 V電源、0.1 µFを3個、1 µF/6.3 Vを1個使用します。未接続のRESET#やNC/CLK#は図示のメモリに固有です。選択した部品のデータシートを確認し、そのまま一般化しないでください。

![図 5.5-1: BGA145 OPI PSRAM基準回路](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-1: BGA145 OPI PSRAM基準回路</em></div>

<div align="center"><em>表 5.5-1: BGA145のOPI PSRAM</em></div>

<div align="center" markdown>

| PSRAM信号 | MCUピン | 詳細説明 |
|:----------|:----|:-----|
| CS# | PA37 | MCU出力、PSRAM入力 |
| CLK | PA20 | MCU出力、PSRAM入力 |
| DQS | PA35 | DQS/DM。機能と方向は選定したPSRAMのデータシートを確認 |
| DQ0 | PA28 | データ入出力0 |
| DQ1 | PA29 | データ入出力1 |
| DQ2 | PA30 | データ入出力2 |
| DQ3 | PA31 | データ入出力3 |
| DQ4 | PA34 | データ入出力4 |
| DQ5 | PA36 | データ入出力5 |
| DQ6 | PA38 | データ入出力6 |
| DQ7 | PA42 | データ入出力7 |

</div>

![図 5.5-2: BGA169 OPI PSRAMメモリ1基準回路](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-2: BGA169 OPI PSRAMメモリ1基準回路</em></div>

<div align="center"><em>表 5.5-2: BGA169のOPI PSRAMメモリ1</em></div>

<div align="center" markdown>

| PSRAM信号 | MCUピン | 詳細説明 |
|:----------|:----|:-----|
| CS# | PA07 | MCU出力、PSRAM入力 |
| CLK | PA08 | MCU出力、PSRAM入力 |
| DQS | PA15 | DQS/DM。機能と方向は選定したPSRAMのデータシートを確認 |
| DQ0 | PA02 | データ入出力0 |
| DQ1 | PA04 | データ入出力1 |
| DQ2 | PA05 | データ入出力2 |
| DQ3 | PA06 | データ入出力3 |
| DQ4 | PA09 | データ入出力4 |
| DQ5 | PA11 | データ入出力5 |
| DQ6 | PA12 | データ入出力6 |
| DQ7 | PA13 | データ入出力7 |

</div>

![図 5.5-3: BGA169 OPI PSRAMメモリ2基準回路](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-3: BGA169 OPI PSRAMメモリ2基準回路</em></div>

<div align="center"><em>表 5.5-3: BGA169のOPI PSRAMメモリ2</em></div>

<div align="center" markdown>

| PSRAM信号 | MCUピン | 詳細説明 |
|:----------|:----|:-----|
| CS# | PA07 | MCU出力、PSRAM入力 |
| CLK | PA08 | MCU出力、PSRAM入力 |
| DQS | PA26 | DQS/DM。機能と方向は選定したPSRAMのデータシートを確認 |
| DQ0 | PA18 | データ入出力0 |
| DQ1 | PA22 | データ入出力1 |
| DQ2 | PA24 | データ入出力2 |
| DQ3 | PA32 | データ入出力3 |
| DQ4 | PA33 | データ入出力4 |
| DQ5 | PA59 | データ入出力5 |
| DQ6 | PA62 | データ入出力6 |
| DQ7 | PA64 | データ入出力7 |

</div>

<div align="center"><em>表 5.5-4: QSPI2のNOR/NAND FlashまたはPSRAM</em></div>

<div align="center" markdown>

| インターフェース信号 | QFN68 | BGA145/169 | 詳細説明 |
|:----------|:------|:-----------|:-----|
| CS# | GPIO9 | PA61 | チップセレクト、アクティブLow |
| SO | GPIO7 | PA65 | データ入力（データ入出力1） |
| WP# | GPIO6 | PA66 | 書き込み保護出力（データ入出力2） |
| SI | GPIO8 | PA63 | データ出力（データ入出力0） |
| SCLK | GPIO10 | PA60 | シリアルクロック出力 |
| Hold# | GPIO5 | PA68 | データ出力（データ入出力3） |

</div>

<div align="center"><em>表 5.5-5: QSPI3のNOR/NAND FlashまたはPSRAM</em></div>

<div align="center" markdown>

| インターフェース信号 | QFN68 | BGA145/169 | 詳細説明 |
|:----------|:------|:-----------|:-----|
| CS# | GPIO16 | PA45 | チップセレクト、アクティブLow |
| SO | GPIO14 | PA49 | データ入力（データ入出力1） |
| WP# | GPIO13 | PA51 | 書き込み保護出力（データ入出力2） |
| SI | GPIO15 | PA47 | データ出力（データ入出力0） |
| SCLK | GPIO17 | PA44 | シリアルクロック出力 |
| Hold# | GPIO12 | PA55 | データ出力（データ入出力3） |

</div>

<div align="center"><em>表 5.5-6: QSPI4のNOR/NAND FlashまたはPSRAM</em></div>

<div align="center" markdown>

| インターフェース信号 | QFN68 | BGA145/169 | 詳細説明 |
|:----------|:------|:-----------|:-----|
| CS# | - | PB33 | チップセレクト、アクティブLow |
| SO | - | PB36 | データ入力（データ入出力1） |
| WP# | - | PB37 | 書き込み保護出力（データ入出力2） |
| SI | - | PB35 | データ出力（データ入出力0） |
| SCLK | - | PB32 | シリアルクロック出力 |
| Hold# | - | PB07 | データ出力（データ入出力3） |

</div>

<div align="center"><em>表 5.5-7: SDIO1の4ビットeMMC/Micro SD</em></div>

<div align="center" markdown>

| インターフェース信号 | QFN68 | BGA145/169 | 詳細説明 |
|:----------|:------|:-----------|:-----|
| CLK | GPIO10 | PA34 | クロック入力 |
| CMD | GPIO9 | PA36 | コマンド入力 |
| DATA0 | GPIO8 | PA28 | データ0 |
| DATA1 | GPIO7 | PA29 | データ1 |
| DATA2 | GPIO6 | PA30 | データ2 |
| DATA3 | GPIO5 | PA31 | データ3 |

</div>

<div align="center"><em>表 5.5-8: SDIO1の8ビットeMMC</em></div>

<div align="center" markdown>

| インターフェース信号 | QFN68 | BGA145/169 | 詳細説明 |
|:----------|:------|:-----------|:-----|
| CLK | GPIO10 | PA34 | クロック入力 |
| CMD | GPIO9 | PA36 | コマンド入力 |
| DATA0 | GPIO8 | PA28 | データ0 |
| DATA1 | GPIO7 | PA29 | データ1 |
| DATA2 | GPIO6 | PA30 | データ2 |
| DATA3 | GPIO5 | PA31 | データ3 |
| DATA4 | GPIO15 | PA47 | データ4 |
| DATA5 | GPIO14 | PA49 | データ5 |
| DATA6 | GPIO13 | PA51 | データ6 |
| DATA7 | GPIO12 | PA55 | データ7 |

</div>

<div align="center"><em>表 5.5-9: SDIO2の4ビットeMMC/Micro SD</em></div>

<div align="center" markdown>

| インターフェース信号 | QFN68 | BGA145/169 | 詳細説明 |
|:----------|:------|:-----------|:-----|
| CLK | GPIO17 | PA44 | クロック入力 |
| CMD | GPIO16 | PA45 | コマンド入力 |
| DATA0 | GPIO15 | PA47 | データ0 |
| DATA1 | GPIO14 | PA49 | データ1 |
| DATA2 | GPIO13 | PA51 | データ2 |
| DATA3 | GPIO12 | PA55 | データ3 |

</div>


### 5.6. ディスプレイとタッチのインターフェース { #56-display-and-touch-interfaces }

ディスプレイにはMIPI DSI、SPI／QSPI、MCU8080、JDIを選べます。ピン割り当てとPCB配線を決める前にパネルを選び、インターフェース幅、クロック、電源制御、タッチ割り込み、バックライト方式をまとめて確認してください。

パラレルJDIとシリアルJDIは、PA側のLCDC1またはPB側のLCDC2に割り当てられた信号グループで利用できます。以下の表はPA/LCDC1のピン割り当てのみを示しています。SiFliはPB/LCDC2の利用を推奨しています。原資料にはLCDC2の個別ピン割り当て表がないため、実際の割り当てはチップのピンマルチプレクサ機能表で確認し、LCDC1の表から推定しないでください。

<div align="center"><em>表 5.6-1: MIPI DSIディスプレイインターフェース</em></div>

<div align="center" markdown>

| MIPI DSI信号 | BGA145/169ピン | 説明 |
|:-------------|:---------------|:-----|
| CLKP | DSI_CLKP | MIPIクロック信号 + |
| CLKN | DSI_CLKN | MIPIクロック信号 - |
| D0P | DSI_D0P | MIPIデータレーン0+ |
| D0N | DSI_D0N | MIPIデータレーン0- |
| D1P | DSI_D1P | MIPIデータレーン1+ |
| D1N | DSI_D1N | MIPIデータレーン1- |
| - | AVDD18_DSI | MIPI電源入力 |
| - | DSI_REXT | 外付け10K抵抗をGNDへ接続 |
| - | AVSS_DSI | GND |
| TE | PA77 | MCUフレーム同期用ティアリングエフェクト信号 |
| RESET | PB17 | ディスプレイパネルのリセット信号 |

</div>

ディスプレイのピン選択に関する注意：

- TEには、PA側の別のGPIOも使用できます。
- パネルがDSI経由のTE信号に対応している場合、専用のTEピンは不要です。
- RESETには、PB側の別のGPIOも使用できます。

<div align="center"><em>表 5.6-2: SPI／QSPIディスプレイインターフェース</em></div>

<div align="center" markdown>

| SPI信号 | QFN68 GPIO | BGA145/169ピン | 詳細説明 |
|:--------|:------|:-----------|:-----|
| CSX | GPIO22 | PB33 | イネーブル信号 |
| WRX_SCL | GPIO23 | PB32 | クロック信号 |
| DCX | GPIO20 | PB36 | 4-wire SPIモードではデータ／コマンド信号、Quad-SPIモードではデータ1 |
| SDI_RDX | GPIO21 | PB35 | 3／4-wire SPIモードではデータ入力信号、Quad-SPIモードではデータ0 |
| SDO | GPIO21 | PB35 | 3／4-wire SPIモードのデータ出力信号。SDI_RDXと短絡します |
| D[0] | GPIO19 | PB37 | Quad-SPIモードのデータ2 |
| D[1] | GPIO18 | PB07 | Quad-SPIモードのデータ3 |
| RESET | GPIO2 | PB17 | ディスプレイパネルのリセット信号 |
| TE | GPIO3 | PB77 | MCUフレーム同期用ティアリングエフェクト信号 |

</div>

ディスプレイのピン選択に関する注意：

- TEにはPA77、または信号を模擬するPA側の別のGPIOを使用できます。
- RESETには任意のGPIOを使用できます。常時表示（AOD）を使用する場合は、PB側GPIOの使用を推奨します。

<div align="center"><em>表 5.6-3: MCU8080ディスプレイインターフェース</em></div>

<div align="center" markdown>

| MCU8080信号 | QFN68 GPIO | BGA145/169ピン | 詳細説明 |
|:------------|:------|:-----------|:-----|
| CSX | GPIO22 | - | チップセレクト |
| WRX | GPIO23 | - | データ書き込み用ライトストローブ信号 |
| DCX | GPIO20 | - | ディスプレイデータ／コマンド選択 |
| RDX | GPIO21 | - | 表示コントローラーから読み出す際のストローブ信号 |
| D[0] | GPIO19 | - | データ0 |
| D[1] | GPIO18 | - | データ1 |
| D[2] | GPIO17 | - | データ2 |
| D[3] | GPIO16 | - | データ3 |
| D[4] | GPIO15 | - | データ4 |
| D[5] | GPIO14 | - | データ5 |
| D[6] | GPIO13 | - | データ6 |
| D[7] | GPIO12 | - | データ7 |
| RESET | GPIO2 | - | リセット |
| TE | GPIO3 | - | MCUフレーム同期用ティアリングエフェクト信号 |

</div>

ディスプレイのピン選択に関する注意：

- TEにはPA77、または信号を模擬するPA側の別のGPIOを使用できます。
- RESETには任意のGPIOを使用できます。常時表示（AOD）を使用する場合は、PB側GPIOの使用を推奨します。

SiFliの[ハードウェアアプリケーションガイド](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md)ではRDXを読み出しストローブ信号としていますが、説明の末尾には「データを書き込む」とあります。これはRDXという信号名および対になるWRX書き込みストローブ信号と矛盾するため、本記事では原文の表現上の誤りとして扱います。読み戻しの可否とタイミングは表示コントローラーによって異なるため、コントローラーのデータシートで確認してください。

<div align="center"><em>表 5.6-4: JDIパラレルディスプレイインターフェース</em></div>

<div align="center" markdown>

| JDI信号 | MCUピン (LCDC1) | 詳細説明 |
|:--------|:-------------|:-----|
| JDI_VCK | PA20 | 垂直ドライバーのシフトクロック |
| JDI_VST | PA31 | 垂直ドライバーのスタート信号 |
| JDI_XRST | PA34 | 水平／垂直ドライバーのリセット信号 |
| JDI_HCK | PA36 | 水平ドライバーのシフトクロック |
| JDI_HST | PA38 | 水平ドライバーのスタート信号 |
| JDI_ENB | PA42 | ピクセルメモリーの書き込みイネーブル信号 |
| JDI_R1 | PA49 | 赤画像データ（奇数ピクセル） |
| JDI_R2 | PA51 | 赤画像データ（偶数ピクセル） |
| JDI_G1 | PA55 | 緑画像データ（奇数ピクセル） |
| JDI_G2 | PA77 | 緑画像データ（偶数ピクセル） |
| JDI_B1 | PA78 | 青画像データ（奇数ピクセル） |
| JDI_B2 | PA79 | 青画像データ（偶数ピクセル） |
| JDI_XFRP | PA45 | 液晶駆動信号（ピクセル「オン」） |
| JDI_VCOM/FRP | PA47 | 共通電極駆動信号／液晶駆動信号（ピクセル「オフ」） |

</div>

<div align="center"><em>表 5.6-5: JDIシリアルディスプレイインターフェース</em></div>

<div align="center" markdown>

| JDI信号 | MCUピン (LCDC1) | 詳細説明 |
|:--------|:-------------|:-----|
| JDI_SCS | PA31 | チップセレクト信号 |
| JDI_SCLK | PA20 | シリアルクロック信号 |
| JDI_SO | PA34 | シリアルデータ出力信号 |
| JDI_DISP | PA36 | ディスプレイのオン／オフ切り替え信号 |
| JDI_EXTCOMIN | PA38 | COM反転極性入力 |

</div>

<div align="center"><em>表 5.6-6: タッチおよびバックライトインターフェース</em></div>

<div align="center" markdown>

| タッチ／バックライト信号 | QFN68 GPIO | BGA145ピン | BGA169ピン | 詳細説明 |
|:-------------------------|:------|:-------|:-------|:-----|
| 割り込み | GPIO1 | PA79 | PA79 | タッチ状態の割り込み信号（ウェイク対応） |
| I2C1_SCL | GPIO25 | PA10 | PA10 | タッチパネルのI2Cクロック信号 |
| I2C1_SDA | GPIO24 | PA14 | PA14 | タッチパネルのI2Cデータ信号 |
| BL_PWM | GPIO0 | - | - | バックライトPWM制御信号 |
| リセット | GPIO16 | PA00 | PA00 | タッチリセット信号 |
| 電源イネーブル | GPIO26 | PA06 | PA03 | タッチパネル電源のイネーブル信号 |

</div>

BL_PWMにはGPTIM1_CHx機能を持つGPIOを使用し、冷間起動時にバックライトが意図せず点灯しないよう、適切なプルアップまたはプルダウン状態に設定してください。

### 5.7. ウェイク、GPADC、製造インターフェース { #57-wake-gpadc-and-manufacturing-interfaces }

ウェイク、アナログ、デバッグ、量産用アクセスは、筐体や治具を考慮して計画してください。ウェイクピンには明確なアイドルレベルとESD保護が必要です。GPADC分圧回路ではセトリング時間と漏れ電流のバランスを取り、EVTおよび量産でデバッグ／書き込みアクセスを確保してください。

SF32LB55xはHCPUのウェイク源4系統（WKUP_A0–WKUP_A3）とLCPUの6系統（WKUP_B0–WKUP_B5）を備え、各信号は対応するCPUのみを起こします。Hibernateから起動できるのはLCPUの6系統だけです。10本の入力はフローティングにせず、用途に応じた外付けプルアップ／プルダウンでスリープ時のリークを防いでください。

参考回路では、KEY1をPB48に接続し、10 kΩでVDD_1V8へプルアップしています。ESD保護とコンデンサーも示されています。KEY2側には10 kΩのプルアップとESD保護があり、ジャンパーでPA08、PA77、PA78のいずれかに接続する構成です。C0004はNF（未実装）と記されています。これらは回路例であり、すべての端子がウェイク対応という意味ではありません。PA08は表5.7-1に記載されていません。表に示すウェイク対応入力から実際に使用する端子を選び、各入力のアイドル時レベルを確定してください。

![図 5.7-1: ウェイクボタンの基準回路](../../sf32-products/chips/assets/55x/SF32LB55x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.7-1: ウェイクボタンの基準回路</em></div>

モーターPWMにはGPTIM1_CHxを備えたGPIOを使います。PU/PDのピン特性を選び、コールドスタートでモーターが意図せず作動しないようにします。基準回路はGPIO17（PA44）、ローサイドトランジスタ、1 MΩのゲートプルダウンを使用し、モーターに3 V、MCUには別の3.3 V電源を供給します。

![図 5.7-2: モータードライバの基準回路](../../sf32-products/chips/assets/55x/SF32LB55x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.7-2: モータードライバの基準回路</em></div>

<div align="center"><em>表 5.7-1: ウェイクアップ割り込みソース</em></div>

<div align="center" markdown>

| 割り込みソース | QFN68 | BGA145/169 | 詳細説明 |
|:---------------|:------|:-----------|:-----|
| WKUP_A0 | GPIO3 | PA77 | HCPU割り込み信号0 |
| WKUP_A1 | GPIO2 | PA78 | HCPU割り込み信号1 |
| WKUP_A2 | GPIO1 | PA79 | HCPU割り込み信号2 |
| WKUP_A3 | GPIO0 | PA80 | HCPU割り込み信号3 |
| WKUP_B0 | GPIO43 | PB43 | LCPU割り込み信号0 |
| WKUP_B1 | GPIO44 | PB44 | LCPU割り込み信号1 |
| WKUP_B2 | GPIO45 | PB45 | LCPU割り込み信号2 |
| WKUP_B3 | GPIO46 | PB46 | LCPU割り込み信号3 |
| WKUP_B4 | GPIO47 | PB47 | LCPU割り込み信号4 |
| WKUP_B5 | GPIO48 | PB48 | LCPU割り込み信号5 |

</div>

SiFliのハードウェアアプリケーションガイドでは、GPADCは5チャネル、10ビットで、入力範囲は0–0.9 Vとされています。保守的な基板設計では、VINが0.9 V未満の場合のみ直接接続し、それ以上では分圧してVADCを0.9 V未満に保ちます。電池測定では、原資料のR1:R2が約5:1、MΩ級の抵抗を参考にしてください。分圧電流を減らすと整定時間が長くなります。図示の回路はVADCとGND間に0.1 µFを接続しています。`VADC = VIN × R2 / (R1 + R2)`で最大電池電圧と抵抗公差を確認します。表5.7-2の電流値はVIN = 4.2 Vでの値であり、すべての電池条件に当てはまりません。

資料間に差異があります。優先度の高い[OpenSiFliハードウェアアプリケーションガイド](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)は、GPADCを10ビット・5チャネル、入力範囲を0～0.9 Vとしています。[V1.0回路図チェックリスト](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)の項目2は最大入力電圧を1.0 Vとしていますが、チャネル数は示していません。一方、[SF32LB55xデータシートV1.7.2の3.2.1節](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf)は、単端入力8チャネルまたは差動入力4組をサポートし、入力範囲をそれぞれ0～1.1 V、−0.7～0.7 Vとしています。ピン表にはGPADC_CH0～CH7が記載されています。現行の[SDK ADCガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)も8チャネル（0～7）と最大サンプリング電圧1.1 Vを記載しています。SiFliはチャネル数と電圧上限の差を説明していません。書面で確認されるまで、本ガイドでは優先度の高い資料に基づき、GPADCを5チャネル、入力範囲を0～0.9 Vとして設計します。VADCを0.9 V未満に保ち、1.0 Vや1.1 Vを承認済みの設計上限と見なさず、対象の型番とパッケージで使用できるチャネルをSiFliに確認してください。

![図 5.7-3: GPADC入力と分圧の基準回路](../../sf32-products/chips/assets/55x/SF32LB55x-GPADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.7-3: GPADC入力と分圧の基準回路</em></div>

<div align="center"><em>表 5.7-2: GPADC分圧回路例</em></div>

<div align="center" markdown>

| 抵抗の組み合わせ | R1 (kΩ) ±1% | R2 (kΩ) ±1% | 電圧整定時間 (ms) | Iq (µA) (VIN = 4.2 V) |
|:-----------------|--------------:|--------------:|------------------------:|---------------------:|
| 1 | 1000 | 220 | 138 | 3.44 |
| 2 | 2000 | 430 | 250 | 1.73 |
| 3 | 3000 | 680 | 302 | 1.14 |
| 4 | 4300 | 910 | - | 0.81 |
| 5 | 5100 | 1100 | 420 | 0.68 |

</div>

心拍・加速度センサーのI2C/SPI、制御、ウェイク割り込みにはLCPUのインターフェースを使ってください。低IqのDC-DC、LDO、ロードスイッチを選び、必要に応じて電源を切り替えます。

外付けBluetoothオーディオはHCPUのUART1を使います。電圧レベルを合わせ、必要ならレベル変換器を追加してください。モジュールの電源を切る際は変換器の電源も同時に切り、リークを防ぎます。SF32LB55xがStandbyに入ってもモジュールの電源を維持し、電源イネーブルがアクティブLowの場合は、デフォルトPDのLCPU GPIOを使用します。

<div align="center"><em>表 5.7-3: デバッグ／書き込みインターフェース</em></div>

<div align="center" markdown>

| UART信号 | QFN68 | BGA145/169 | 詳細説明 |
|:---------|:------|:-----------|:-----|
| TXD1 | GPIO13 | PA19 | UART1 RXD信号 |
| RXD1 | GPIO14 | PA17 | UART1 TXD信号 |
| TXD2 | - | PA07 | UART2 RXD信号 |
| RXD2 | - | PA05 | UART2 TXD信号 |
| TXD3 | GPIO46 | PB46 | UART3 RXD信号、システムのデフォルトログポート |
| RXD3 | GPIO45 | PB45 | UART3 TXD信号、システムのデフォルトログポート |
| TXD4 | - | PB14 | UART4 RXD信号 |
| RXD4 | - | PB12 | UART4 TXD信号 |
| TXD5 | - | PB11 | UART5 RXD信号 |
| RXD5 | - | PB06 | UART5 TXD信号 |
| SWCLK | GPIO41 | PB31 | SWDクロック信号 |
| SWDIO | GPIO42 | PB34 | SWDデータ信号 |

</div>

UART RXDをフローティングにせず、ファームウェア初期化時に内部プルアップを有効にします。UART3はデフォルトのログポートです。SiFliは量産書き込みと水晶校正用のオフライン書き込み器を提供しています。VBAT、GND、VDDIOA、VDDIOB、RSTN、Mode、SWDIO、SWCLK、RXD1、TXD1、RXD3、TXD3のテストポイントを最低限設けます。量産治具で必要なサブセットはVBAT、GND、boot_mode、VDDIOB、RXD3、TXD3です。VBATとboot_modeは原資料の治具信号名なので、配線前に実際の基板電源とMode接続へ対応付けてください。

原図では、VDD_1V8をコネクタの1番ピン（VTref）に接続し、SWDIOとSWCLKをそれぞれ22 Ωの直列抵抗を介して7番ピンと9番ピンに接続しています。標準の[J-Link SWD](https://kb.segger.com/20-pin_J-Link_Connector)でも1番ピンは[VTref](https://kb.segger.com/VTref)、つまりターゲット電圧の基準入力であり、プローブの電源出力ではありません。標準ケーブルを接続する前に、コネクタの向きと1.8 Vへの対応を確認してください。

![図 5.7-4: 原資料のSWDコネクタ：変換配線を確認](../../sf32-products/chips/assets/55x/SF32LB55x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.7-4: 原資料のSWDコネクタ：変換配線を確認</em></div>
