---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB58x MCUの回路図設計ガイド。電源、クロック生成、RF、ユーザーインターフェース、ストレージと接続、製造を扱います。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB58xハードウェア設計ガイド — 回路図設計ガイドライン {#sf32lb58x-hardware-design-guide-schematic-design-guidelines}

!!! note "SF32LB58xハードウェア設計ガイドの一部"
    このページでは第5節「回路図設計ガイドライン」を扱います。デバイス選定と設計フロー全体については[SF32LB58xハードウェア設計ガイドの概要](SF32LB58x_hardware_design_guide.md)から確認してください。続けて[回路図チェックリスト](SF32LB58x_schematic_checklist.md)を参照するか、[PCBレイアウト指針](SF32LB58x_pcb_layout.md)へ進むこともできます。

## 5. 回路図設計ガイドライン {#5-schematic-design-guidelines}

この章では、SF32LB58xの回路図設計を最小システムから始め、電源、クロック生成、RF、ユーザーインターフェース、ストレージと接続、製造へと設計フローに沿って説明します。各節では設計意図を示したうえで、回路要件、よくあるリスク、リリース前の確認事項を説明します。

<div align="center"><em>表 5-1: 回路図設計セクション一覧</em></div>

<div align="center" markdown>

| 分類 | 主な設計判断 | リリース時の確認資料 |
|:---|:---|:---|
| 最小システム設計 | 正確なデバイス／パッケージ、電源／リセット、クロック、ブート／ストレージ、デバッグと復旧 | 初期立ち上げレビュー、ブート／復旧計画 |
| 電源システム | システムPMIC、チップPMUの電源レール、BUCKインダクター、LDOコンデンサー、リセット、低消費電力時のウェイクアップ要因 | 電源ツリー、PMIC設定、電源レール測定、POR/BOR/リセットのレビュー |
| クロック生成 | 48 MHzおよび32.768 kHz水晶振動子 | 水晶振動子仕様の確認、マッチングコンデンサー計画、水晶振動子レイアウトのスクリーンショット |
| RF | RF整合とアンテナ経路 | インピーダンス設計、RFマッチング回路、アンテナのキープアウト領域、レイアウトのスクリーンショット |
| ユーザーインターフェース | ディスプレイ、タッチ／バックライト、オーディオ、ボタン、モーター、PBR制御 | インターフェース回路図、ピン割り当て、電源シーケンス、アナログ／オーディオレビュー |
| ストレージと接続 | ブートモード、MPI4、SD1/SD2、eMMC/SD NAND/SDカード、USB2.0 HS | ブート設定、ストレージ電源計画、差動／高速配線の確認資料 |
| 製造 | SWD、UARTデバッグ出力、製造テスト用アクセス、回路図／PCBチェックリスト | テストポイント図、復旧経路、量産書き込み／校正計画 |

</div>

### 5.1. 最小システム設計 {#51-minimum-system-design}

最小システム設計を、回路図レビューの最初のゲートとして扱います。製品固有の周辺機器を追加する前に、正確なデバイスとパッケージ、必要な電源レールとクロック、リセット動作、ブート設定とストレージ、実用的なデバッグおよび復旧経路を確認してください。これらの決定は、基板が確実に電源投入、起動し、立ち上げられるかを左右します。

<div align="center"><em>表 5.1-1: 最小システム設計の確認項目</em></div>

<div align="center" markdown>

| ブロック | SF32LB58xの設計確認事項 | 詳細ガイド |
|:---|:---|:---|
| デバイスとパッケージ | 正確な型番とパッケージを確認し、ピン配置と内蔵メモリー構成が予定するインターフェースに対応することを確認します。 | [デバイスの型番とパッケージ](SF32LB58x_hardware_design_guide.md#32-variants) |
| 電源 | 必要なPMUおよび外部電源レール、BUCK部品、近接デカップリングを実装します。 | [電源システム](#51-power-system) |
| クロック | 48 MHzメイン水晶振動子と32.768 kHz RTC水晶振動子を実装し、指定された負荷と配置条件を満たします。 | [クロック生成](#52-clock-generation) |
| リセット | `PVDD1`電源ドメインを基準に、外部`RSTN`のRCリセット回路を実装します。 | [電源投入シーケンスとリセット](#5115-power-up-sequencing-and-reset) |
| ブートモード | `Mode`ピンを10 kΩ抵抗で安定したレベルに設定します。量産テスト用のアクセスを確保し、テスト基板には復旧用ジャンパーを設けます。 | [ブート設定](#551-boot-configuration) |
| ブートストレージ | 対応するストレージインターフェースを選び、使用デバイスに応じてピン配置、I/O電圧、電源構成を確認します。 | [ストレージ](#552-storage) |
| 立ち上げ時のアクセス | SWDと必要なUARTデバッグ信号へ基板上からアクセスできるようにし、プローブ用の電源とGNDも確保します。 | [デバッグ／ダウンロードインターフェース](#561-debug-and-download-interface) |
| 低消費電力時の動作 | 対象スリープモードで必要なウェイクアップ要因と外部電源制御を確認します。 | [動作モードとウェイクアップ要因](#512-operating-modes-and-wake-sources) |

</div>

### 5.2. 電源システム {#51-power-system}

#### 5.2.1. 電源供給 {#511-power-supply}
SF32LB58xシリーズにはPMUが内蔵され、外付けインダクターとコンデンサーを内部電源入力へ接続するBUCK出力を2系統、外付けコンデンサーが必要なLDO出力を3系統備えています。スマートウォッチ向けの設計では、SiFliのPMICであるSF30147Cを組み合わせ、SF32LB58xと周辺デバイスの両方に電源を供給できます。

##### 5.2.1.1. SiFli PMICの電源分配 {#5111-sifli-pmic-power-distribution}

SF30147Cは、超低消費電力のウェアラブル製品向けに高集積・高効率を実現した電源管理ICです。広い入出力電圧範囲と最大100 mAの負荷電流に対応するLDOを4系統内蔵しています。また、周辺デバイス用に、リーク電流とオン抵抗の小さいロードスイッチを7系統備えています。このうち2系統はバッテリー電圧で直接駆動する周辺デバイス（オーディオPAなど）向けの高電圧スイッチ、5系統は1.8 V給電の周辺デバイス向けの低電圧スイッチです。SF32LB58xは2本のGPIOでTWI信号をエミュレートし、SF30147Cを制御します。

<div align="center"><em>表 5.2-1: SF30147Cの電源分配</em></div>

<div align="center" markdown>

| SF30147C電源ピン | 最小電圧 (V) | 最大電圧 (V) | 最大電流 (mA) | 説明 |
|:---|:---|:---|:---|:---|
| VBUCK | 1.8 | 1.8 | 500 | SF32LB58xのPVDD1、PVDD2、VDDIOA、VDDIOA2、VDDIOB、AVDD_BRF、AVDD18_DSIなど、1.8 V系の電源レールに供給 |
| LVSW1 | 1.8 | 1.8 | 100 | I2S Class-K PAのロジック電源 |
| LVSW2 | 1.8 | 1.8 | 100 | Gセンサー用1.8 V電源 |
| LVSW3 | 1.8 | 1.8 | 150 | 心拍センサー用1.8 V電源 |
| LVSW4 | 1.8 | 1.8 | 150 | LCD用1.8 V電源 |
| LVSW5 | 1.8 | 1.8 | 150 | eMMCコア電源 |
| LDO1 | 2.8 | 3.3 | 100 | SF32LB58xのAVDD33_USB、AVDD33_ANA、AVDD33_AUD、AVDDIOA2など、3.3 V系の電源レールに供給 |
| LDO2 | 2.8 | 3.3 | 100 | eMMCまたはSD NAND用電源 |
| LDO3 | 2.8 | 3.3 | 100 | LCD用3.3 V電源 |
| LDO4 | 2.8 | 3.3 | 100 | 心拍センサー用3.3 V電源 |
| HVSW1 | 2.8 | 5 | 150 | アナログClass-K PA用電源 |
| HVSW2 | 2.8 | 5 | 150 | GPS用電源 |

</div>

詳細はSF30147Cのデータシートを参照してください。

##### 5.2.1.2. SF32LB58xの電源要件 {#5112-sf32lb58x-power-requirements}

SF32LB58xシリーズのPMU電源仕様を以下に示します。

<div align="center"><em>表 5.2-2: PMU電源仕様</em></div>

<div align="center" markdown>

| PMU電源ピン | 最小電圧 (V) | 標準電圧 (V) | 最大電圧 (V) | 最大電流 (mA) | 説明 |
|:---|:---|:---|:---|:---|:---|
| PVDD1 | 1.71 | 1.8 | 3.6 | 100 | PVDD1電源入力 |
| PVDD2 | 1.71 | 1.8 | 3.6 | 50 | PVDD2電源入力 |
| BUCK1_LX / BUCK1_FB | - | 1.25 | - | 100 | BUCK1_LX出力をインダクターと内部電源入力1に接続し、インダクターのもう一端を外付けコンデンサーに接続 |
| BUCK2_LX / BUCK2_FB | - | 0.9 | - | 50 | BUCK2_LX出力をインダクターと内部電源入力2に接続し、インダクターのもう一端を外付けコンデンサーに接続 |
| LDO_VOUT1 | - | 1.1 | - | 100 | LDO出力。外付けコンデンサーが必要 |
| VDD_RET | - | 0.9 | - | 1 | RET LDO出力。外付けコンデンサーが必要 |
| VDD_RTC | - | 1.1 | - | 1 | RTC LDO出力。外付けコンデンサーが必要 |
| MIC_BIAS | 1.4 | - | 2.8 | - | マイク電源出力 |

</div>

外部から電源を供給するその他の電源ピンを以下に示します。

<div align="center"><em>表 5.2-3: その他の電源仕様</em></div>

<div align="center" markdown>

| その他の電源ピン | 最小電圧 (V) | 標準電圧 (V) | 最大電圧 (V) | 最大電流 (mA) | 説明 |
|:---|:---|:---|:---|:---|:---|
| AVDD_BRF | 1.71 | 1.8 | 3.3 | 1 | RF電源入力 |
| AVDD18_DSI | 1.71 | 1.8 | 2.5 | 20 | MIPI DSI電源入力。未使用時は未接続にする |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | アナログ電源およびRF PA電源入力 |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | アナログオーディオ電源入力 |
| AVDD33_USB | 3.15 | 3.3 | 3.45 | 50 | USB電源入力 |
| VDDIOA | 1.71 | 1.8 | 3.45 | - | PA12-PA93のIO電源入力 |
| VDDIOA2 | 1.71 | 1.8 | 3.45 | - | PA0-PA11のIO電源入力 |
| VDDIOB | 1.71 | 1.8 | 3.45 | - | PBのIO電源入力 |
| VDDIOSA | 1.71 | 1.8 | 1.98 | - | SIPA電源入力 |
| VDDIOSB | 1.71 | 1.8 | 1.98 | - | SIPB電源入力 |
| VDDIOSC | 1.71 | 1.8 | 1.98 | - | SIPC電源入力 |
| GPADC_VREFP | - | - | - | - | GPADC基準電圧入力。コンデンサーのみ接続し、外部電源は不要 |
| AUD_VREF | - | - | - | - | オーディオ基準電圧入力。コンデンサーのみ接続し、外部電源は不要 |

</div>

##### 5.2.1.3. 推奨コンデンサー容量 {#5113-recommended-capacitor-values}

<div align="center"><em>表 5.2-4: 推奨デカップリングコンデンサー</em></div>

<div align="center" markdown>

| 電源ピン | コンデンサー | 説明 |
|:---|:---|:---|
| PVDD1 | 0.1 µF + 10 µF | 10 µFコンデンサーと0.1 µFコンデンサー（計2個）をピンの近くに配置 |
| PVDD2 | 0.1 µF + 10 µF | 10 µFコンデンサーと0.1 µFコンデンサー（計2個）をピンの近くに配置 |
| BUCK1_LX / BUCK1_FB | 0.1 µF + 4.7 µF | 4.7 µFコンデンサーと0.1 µFコンデンサー（計2個）をピンの近くに配置 |
| BUCK2_LX / BUCK2_FB | 0.1 µF + 4.7 µF | 4.7 µFコンデンサーと0.1 µFコンデンサー（計2個）をピンの近くに配置 |
| LDO_VOUT1 | 4.7 µF | 4.7 µFコンデンサーを少なくとも1個、ピンの近くに配置 |
| VDD_RET | 0.47 µF | 0.47 µFコンデンサーを少なくとも1個、ピンの近くに配置 |
| VDD_RTC | 0.1 µF | 0.1 µFコンデンサーを少なくとも1個、ピンの近くに配置 |
| AVDD_BRF | 1 µF | 1 µFコンデンサーを少なくとも1個、ピンの近くに配置 |
| AVDD18_DSI | 4.7 µF | 4.7 µFコンデンサーを少なくとも1個、ピンの近くに配置 |
| AVDD33_ANA | 1 µF | 1 µFコンデンサーを少なくとも1個、ピンの近くに配置 |
| AVDD33_AUD | 4.7 µF | 4.7 µFコンデンサーを少なくとも1個、ピンの近くに配置 |
| AVDD33_USB | 1 µF | 1 µFコンデンサーを少なくとも1個、ピンの近くに配置 |
| MIC_BIAS | 1 µF | 1 µFコンデンサーを少なくとも1個、ピンの近くに配置 |
| VDDIOA / VDDIOA2 / VDDIOB | 1 µF | 1 µFコンデンサーを少なくとも1個、各ピンの近くに配置 |
| VDDIOSA / VDDIOSB / VDDIOSC | 1 µF | 1 µFコンデンサーを少なくとも1個、各ピンの近くに配置 |

</div>

##### 5.2.1.4. BUCKインダクターの選定 {#5114-buck-inductor-selection}

!!! important "電源インダクターの主要パラメーター"
    L（インダクタンス）= 4.7 µH、DCR（直流抵抗）≤ 0.4 Ω、Isat（飽和電流）≥ 500 mA

##### 5.2.1.5. 電源投入シーケンスとリセット {#5115-power-up-sequencing-and-reset}

SF32LB58xシリーズにはPOR（Power-On Reset）とBOR（Brownout Reset）が内蔵され、外部ハードウェアリセット信号RSTNにも対応します。

RSTNはPVDD1入力と同じ電圧ドメインにプルアップし、0.1 µFのコンデンサーをグラウンドに接続してRC遅延リセット回路を構成してください。

![図 5.2-1: 電源投入／電源切断シーケンス](../../sf32-products/chips/assets/58x/sf32lb58x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.2-1: 電源投入／電源切断シーケンス</em></div>

![図 5.2-2: リセット回路](../../sf32-products/chips/assets/58x/sf32lb58x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.2-2: リセット回路</em></div>

##### 5.2.1.6. 標準的な電源回路 {#5116-typical-power-circuit}

SF32LB58xシリーズでは、SiFliのPMIC SF30147Cから各電源レールに給電できます。電源の割り当ては表5.2-1を参照してください。チップにはBUCK出力が2系統、LDO出力が3系統内蔵されています。

![図 5.2-3: SF30147C電源供給図](../../sf32-products/chips/assets/58x/sf32lb58x-30147-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.2-3: SF30147C電源供給図</em></div>

![図 5.2-4: 内蔵DC-DC（BUCK）回路](../../sf32-products/chips/assets/58x/sf32lb58x-BUCK-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.2-4: 内蔵DC-DC（BUCK）回路</em></div>

![図 5.2-5: 内蔵LDO回路](../../sf32-products/chips/assets/58x/sf32lb58x-LDO-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.2-5: 内蔵LDO回路</em></div>

##### 5.2.1.7. 電源設計チェックリスト {#5117-power-design-checklist}

- [ ] 選択した型番のPVDD1/PVDD2電源範囲（1.71 V～3.6 V）が実際の電源構成に合っていることを確認
- [ ] BUCKインダクターが4.7 µH、DCR ≤ 0.4 Ω、Isat ≥ 500 mAを満たすことを確認
- [ ] PVDD1/PVDD2、BUCK1/2_LX/FB、LDO_VOUT1、VDD_RET、VDD_RTCのデカップリングコンデンサーに、本節の推奨値を適用
- [ ] SF30147Cを使用する場合、7系統のロードスイッチの電圧／電流割り当てが周辺デバイスの要件に合っていることを確認
- [ ] RSTNリセット回路のRC遅延がデバイスのリセットタイミング要件を満たすことを確認

#### 5.2.2. 動作モードとウェイクアップ要因 {#512-operating-modes-and-wake-sources}

低消費電力設計では、PBR機能、ウェイクアップ対応割り込み、ストレージ電源スイッチ、センサー電源、外付けPMICのロードスイッチを合わせて検討してください。

SF32LB58xシリーズはPBRインターフェースを6系統備え、主な特性は次のとおりです。

1. 電源投入時にPBR0は0から1へ遷移するため、一部の外付けLSWの駆動に利用できます。PBR1-PBR5は初期状態で出力0です。
2. StandbyモードとHibernateモードのどちらでも、PBR0-PBR5を出力として使用できます。
3. PBR0-PBR5からLPTIM信号を出力できます。
4. PBR0-PBR5から32 kHzクロック信号を出力できます。
5. PBR0-PBR3はウェイクアップ信号入力用に設定できます。ただし、MCUの動作中は割り込みを受け取りません。

SF32LB58xシリーズのすべてのGPIOはLight Sleep／Deep Sleepモードでウェイクアップに対応します。StandbyモードとHibernateモードでは、ウェイクアップ対応割り込みソースを16系統（PAに6系統、PBに10系統）利用できます。

<div align="center"><em>表 5.2-5: 割り込みソースの接続</em></div>

<div align="center" markdown>

| 割り込みソース | I/O | 説明 |
|:---|:---|:---|
| WKUP_PIN0 | PB54 | 割り込み信号0 |
| WKUP_PIN1 | PB55 | 割り込み信号1 |
| WKUP_PIN2 | PB56 | 割り込み信号2 |
| WKUP_PIN3 | PB57 | 割り込み信号3 |
| WKUP_PIN4 | PB58 | 割り込み信号4 |
| WKUP_PIN5 | PB59 | 割り込み信号5 |
| WKUP_PIN6 | PA64 | 割り込み信号6 |
| WKUP_PIN7 | PA65 | 割り込み信号7 |
| WKUP_PIN8 | PA66 | 割り込み信号8 |
| WKUP_PIN9 | PA67 | 割り込み信号9 |
| WKUP_PIN10 | PA68 | 割り込み信号10 |
| WKUP_PIN11 | PA69 | 割り込み信号11 |
| WKUP_PIN12 | PBR0 | 割り込み信号12 |
| WKUP_PIN13 | PBR1 | 割り込み信号13 |
| WKUP_PIN14 | PBR2 | 割り込み信号14 |
| WKUP_PIN15 | PBR3 | 割り込み信号15 |

</div>

!!! note "ウェイクアップ要因数の要確認"
    原資料本文では、ウェイクアップ可能な割り込みソースは合計16系統（PAに6系統、PBに10系統）とされています。一方、表ではPBが6系統、PAが6系統、PBRが4系統です。PBRがPBの内数かどうかは原資料に記載がありません。PA/PB別の数を前提に設計する前にSiFliへ確認してください。

### 5.3. クロック生成 {#52-clock-generation}
SF32LB58xシリーズには、48 MHzのメイン水晶振動子と32.768 kHzのRTC水晶振動子という2つの外部クロック源が必要です。

<div align="center"><em>表 5.3-1: 水晶振動子の仕様要件</em></div>

<div align="center" markdown>

| 水晶振動子 | 仕様 | 説明 |
|:---|:---|:---|
| 48 MHz | 7 pF ≤ CL ≤ 12 pF（8.8 pFを推奨）、ΔF/F0 ≤ ±10 ppm、ESR ≤ 30 Ω（22 Ωを推奨） | 水晶振動子の消費電力はCLとESRに依存し、値が小さいほど消費電力を抑えられます。水晶振動子の近くに並列マッチングコンデンサー用のフットプリントを確保してください。CL < 12 pFの場合、コンデンサーは不要です。 |
| 32.768 kHz | CL ≤ 12.5 pF（7 pFを推奨）、ΔF/F0 ≤ ±20 ppm、ESR ≤ 80 kΩ（38 kΩを推奨） | 水晶振動子の消費電力はCLとESRに依存し、値が小さいほど消費電力を抑えられます。水晶振動子の近くに並列マッチングコンデンサー用のフットプリントを確保してください。CL < 12.5 pFの場合、コンデンサーは不要です。 |

</div>

<div align="center"><em>表 5.3-2: SiFli AVL掲載水晶振動子モデル</em></div>

<div align="center" markdown>

| 型番 | メーカー | パラメーター |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0 = 48.000000 MHz、ΔF/F0 = -6 ~ 8 ppm、CL = 8.8 pF、ESR ≤ 22 Ω（最大）、TOPR = -30 ~ 85°C、2016（メートル法）パッケージ |
| ETST00327000LE | Hosonic | F0 = 32.768 kHz、ΔF/F0 = -20 ~ 20 ppm、CL = 7 pF、ESR ≤ 70 kΩ（最大）、TOPR = -40 ~ 85°C、3215（メートル法）パッケージ |
| SX20Y048000B31T-8.8 | TKD | F0 = 48.000000 MHz、ΔF/F0 = -10 ~ 10 ppm、CL = 8.8 pF、ESR ≤ 40 Ω（最大）、TOPR = -20 ~ 75°C、2016（メートル法）パッケージ |
| SF32K32768D71T01 | TKD | F0 = 32.768 kHz、ΔF/F0 = -20 ~ 20 ppm、CL = 7 pF、ESR ≤ 70 kΩ（最大）、TOPR = -40 ~ 85°C、3215（メートル法）パッケージ |

</div>

!!! note
    一般的な48 MHz水晶振動子の推奨ではESR ≤ 30 Ω（推奨値22 Ω）ですが、記載されているSX20Y048000B31T-8.8はESR ≤ 40 Ωとされています。原資料は両方の値を示していますが、その差を説明していません。使用前にSiFliへ適合性を確認してください。ESRが高いと静的消費電力も増加する可能性があります。PCB配線では、水晶振動子の直下にある2層目のGND銅箔を除去し、クロック信号の寄生負荷容量を低減してください。

掲載部品の詳細は[SiFli承認ベンダーリスト][SiFli承認ベンダーリスト (Approved Vendor List, AVL)]を参照してください。

### 5.4. RF {#53-rf}

SF32LB58xのRFフロントエンドには広帯域マッチングフィルター技術が内蔵されているため、PCBにはインピーダンスを50 Ωに制御したRF配線が必要です。スプリアス除去とアンテナ整合のため、π型マッチング回路を設けるスペースを確保してください。

![図 5.4-1: RF回路図](../../sf32-products/chips/assets/58x/sf32lb58x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.4-1: RF回路図</em></div>

!!! note "注記"
    マッチング回路の部品定数は、実際のアンテナとPCBレイアウトを用いた評価によって決定してください。

### 5.5. ユーザーインターフェース {#54-user-interfaces}

#### 5.5.1. ディスプレイ {#541-display}
##### 5.5.1.1. MIPI DSIディスプレイインターフェース {#5411-mipi-dsi-display-interface}

SF32LB58xシリーズは、2レーンのMIPI DSIディスプレイインターフェースに対応します。

<div align="center"><em>表 5.5-1: MIPI-DSI信号の接続</em></div>

<div align="center" markdown>

| MIPI DSI信号 | I/O | 説明 |
|:---|:---|:---|
| CLKP | DSI_CLKP | MIPIクロック信号 + |
| CLKN | DSI_CLKN | MIPIクロック信号 - |
| D0P | DSI_D0P | MIPIデータレーン0 + |
| D0N | DSI_D0N | MIPIデータレーン0 - |
| D1P | DSI_D1P | MIPIデータレーン1 + |
| D1N | DSI_D1N | MIPIデータレーン1 - |
| - | AVDD18_DSI | MIPI電源入力 |
| - | DSI_REXT | 外付け10 kΩ抵抗をグラウンドに接続 |
| - | AVSS_DSI | グラウンド |
| TE | PB2 | MCUへのフレーム同期用ティアリングエフェクト信号 |
| RESET | PB5 | ディスプレイリセット信号 |

</div>

##### 5.5.1.2. SPI/QSPIディスプレイインターフェース {#5412-spiqspi-display-interface}

SF32LB58xシリーズは、LCDパネル接続用の3線式／4線式SPIおよびQuad-SPIに対応します。HCPUはPA上のLCDC1を、LCPUはPB上のLCDC2を使用します。

<div align="center"><em>表 5.5-2: SPI/QSPI信号の接続</em></div>

<div align="center" markdown>

| SPI信号 | I/O（LCDC1） | I/O（LCDC2） | 説明 |
|:---|:---|:---|:---|
| CSX | PA44 | PB08 | チップイネーブル |
| WRX_SCL | PA46 | PB10 | クロック信号 |
| DCX | PA48 | PB03 | 4線式SPIモードではデータ／コマンド信号、Quad-SPIモードではデータ1 |
| SDI_RDX | PA50 | PB09 | 3線式／4線式SPIモードではデータ入力、Quad-SPIモードではデータ0 |
| SDO | PA50 | PB09 | 3線式／4線式SPIモードではデータ出力。SDI_RDXと接続 |
| D[0] | PA47 | PB04 | Quad-SPIモードのデータ2 |
| D[1] | PA45 | PB06 | Quad-SPIモードのデータ3 |
| REST | PA74 | PB05 | ディスプレイリセット信号 |
| TE | PA43 | PB02 | MCUへのフレーム同期用ティアリングエフェクト信号 |

</div>

##### 5.5.1.3. MCU8080ディスプレイインターフェース {#5413-mcu8080-display-interface}

SF32LB58xシリーズは、LCDパネル接続用のMCU8080インターフェースに対応します。

<div align="center"><em>表 5.5-3: MCU8080信号の接続</em></div>

<div align="center" markdown>

| MCU8080信号 | I/O | 説明 |
|:---|:---|:---|
| CSX | PA44 | チップセレクト |
| WRX | PA46 | データ書き込み用のライトストローブ信号 |
| DCX | PA48 | ディスプレイデータ／コマンド選択信号 |
| RDX | PA50 | 読み出しストローブ信号 |
| D[0] | PA47 | データ0 |
| D[1] | PA45 | データ1 |
| D[2] | PA26 | データ2 |
| D[3] | PA27 | データ3 |
| D[4] | PA42 | データ4 |
| D[5] | PA51 | データ5 |
| D[6] | PA52 | データ6 |
| D[7] | PA58 | データ7 |
| REST | PA24 | リセット |
| TE | PA43 | MCUへのフレーム同期用ティアリングエフェクト信号 |

</div>

!!! note "RDX信号の説明"
    原資料ではRDXを「書き込みデータ用の読み出しストローブ信号」と説明しており、記述に矛盾があります。本表では「読み出しストローブ信号」としています。公開前にRDXの意図された機能をSiFliに確認してください。

##### 5.5.1.4. DPIディスプレイインターフェース {#5414-dpi-display-interface}

SF32LB58xシリーズは、LCDパネル接続用のDPIインターフェースに対応します。

<div align="center"><em>表 5.5-4: DPI信号の接続</em></div>

<div align="center" markdown>

| DPI信号 | I/O | 説明 |
|:---|:---|:---|
| CLK | PA12 | クロック信号 |
| DE | PA13 | データイネーブル信号 |
| HSYNC | PA14 | 水平同期信号 |
| VSYNC | PA15 | 垂直同期信号 |
| SD | PA18 | ディスプレイ停止制御 |
| CM | PA19 | Normal ColorモードとReduced Colorモードの切り替え |
| R0-R7 | PA22/PA23/PA24/PA25/PA26/PA27/PA43/PA44 | ピクセルデータ（赤R0-R7） |
| G0-G7 | PA45/PA46/PA47/PA48/PA50/PA53/PA54/PA55 | ピクセルデータ（緑G0-G7） |
| B0-B7 | PA56/PA57/PA58/PA61/PA62/PA63/PA65/PA67 | ピクセルデータ（青B0-B7） |

</div>

##### 5.5.1.5. JDIディスプレイインターフェース {#5415-jdi-display-interface}

SF32LB58xシリーズはLCDパネル接続用にパラレルJDIとシリアルJDIの両方に対応し、信号はLCDC1（PA）またはLCDC2（PB）に割り当てられます。LCDC2（PB）の使用を推奨します。

<div align="center"><em>表 5.5-5: パラレルJDI信号の接続</em></div>

<div align="center" markdown>

| JDI信号 | I/O（LCDC1） | I/O（LCDC2） | 説明 |
|:---|:---|:---|:---|
| JDI_VCK | PA19 | PB15 | 垂直ドライバーのシフトクロック |
| JDI_VST | PA22 | PB19 | 垂直ドライバーの開始信号 |
| JDI_XRST | PA25 | PB16 | 水平・垂直ドライバーのリセット信号 |
| JDI_HCK | PA43 | PB05 | 水平ドライバーのシフトクロック |
| JDI_HST | PA44 | PB10 | 水平ドライバーの開始信号 |
| JDI_ENB | PA45 | PB12 | ピクセルメモリーの書き込みイネーブル信号 |
| JDI_R1 | PA46 | PB09 | 赤の画像データ（奇数画素） |
| JDI_R2 | PA47 | PB06 | 赤の画像データ（偶数画素） |
| JDI_G1 | PA48 | PB08 | 緑の画像データ（奇数画素） |
| JDI_G2 | PA50 | PB04 | 緑の画像データ（偶数画素） |
| JDI_B1 | PA65 | PB02 | 青の画像データ（奇数画素） |
| JDI_B2 | PA67 | PB03 | 青の画像データ（偶数画素） |
| JDI_XFRP | PBR1 | PBR1 | 液晶駆動信号（「オン」画素） |
| JDI_VCOM/FRP | PBR2 | PBR2 | 共通電極の駆動信号／液晶駆動信号（「オフ」画素） |

</div>

<div align="center"><em>表 5.5-6: シリアルJDI信号の接続</em></div>

<div align="center" markdown>

| JDI信号 | I/O（LCDC1） | I/O（LCDC2） | 説明 |
|:---|:---|:---|:---|
| JDI_SCS | PA82 | PB03 | チップセレクト信号 |
| JDI_SCLK | PA84 | PB02 | シリアルクロック信号 |
| JDI_SO | PA86 | PB06 | シリアルデータ出力信号 |
| JDI_DISP | PA90 | PB04 | ディスプレイのオン／オフ切り替え信号 |
| JDI_EXTCOMIN | PA91 | PB05 | COM反転極性の入力信号 |

</div>

#### 5.5.2. タッチとバックライト {#542-touch-and-backlight}

SF32LB58xシリーズは、I2C接続のタッチコントローラー用インターフェースと、タッチ状態を通知する割り込み入力に対応します。また、バックライトドライバーの有効化と輝度を制御するPWM信号を1系統備えています。

<div align="center"><em>表 5.5-7: タッチとバックライトの接続</em></div>

<div align="center" markdown>

| タッチ／バックライト信号 | I/O | 説明 |
|:---|:---|:---|
| 割り込み | PA69 | タッチ状態割り込み（ウェイクアップ対応） |
| I2C1_SCL | PA17 | タッチパネルのI2Cクロック |
| I2C1_SDA | PA16 | タッチパネルのI2Cデータ |
| BL_PWM | PB44 | バックライトのPWM制御信号 |
| リセット | PA15 | タッチリセット信号 |
| 電源イネーブル | PA12 | タッチパネルの電源イネーブル信号 |

</div>

#### 5.5.3. オーディオ {#543-audio}

SF32LB58xシリーズは複数のオーディオ関連インターフェースを備え、主な特性は次のとおりです。

1. I2Sインターフェースを3系統備えています。I2S1は入力専用、I2S2とI2S3は入力・出力の両方に対応します。いずれもマスターモードのみ対応し、スレーブモードには対応しません。
2. I2S MIC入力にはI2S1の使用を推奨します。
3. オーディオDACにはI2S2の使用を推奨します。
4. オーディオコーデックにはI2S3の使用を推奨します。
5. デジタルマイク入力用のPDMインターフェースを2系統備えています。各PDMインターフェースには最大2個のデジタルマイクを接続できます。PDMインターフェースの数とマイクの数は同じではありません。
6. アナログMIC入力を2系統備えています。それぞれに、2.2 µF以上のDCカットコンデンサーを直列に接続する必要があります。アナログMIC電源はSF32LB58xのMIC_BIASから供給します。
7. 外付けアナログオーディオパワーアンプを接続できます。各DACチャネルのP/N配線を差動ペアとして配線し、適切なシールドをグラウンドに接続してください。寄生容量は10 pF未満にします。配線長については原資料内で上限値が一致していないため、下記の注記を参照してください。
8. ステレオアナログヘッドホン接続に対応します。

!!! note "原資料におけるDAC配線長の不一致"
    SiFliのハードウェアアプリケーションノートには、DAC配線長の上限値が2種類記載されています。音声概要では`<2 cm`、詳細なDACのPCB配線セクションでは`<2 mm`とされています。原資料にはこの差の説明がありません。PCB設計を確定する前に、適用する上限値をSiFliに確認してください。一方の値が他方に優先すると推測しないでください。

![図 5.5-1: 差動アナログオーディオ入力回路](../../sf32-products/chips/assets/58x/sf32lb58x-DIFAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-1: 差動アナログオーディオ入力回路</em></div>

![図 5.5-2: シングルエンド・アナログオーディオ入力回路](../../sf32-products/chips/assets/58x/sf32lb58x-SIGLEAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-2: シングルエンド・アナログオーディオ入力回路</em></div>

![図 5.5-3: アナログオーディオ出力回路](../../sf32-products/chips/assets/58x/sf32lb58x-DAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-3: アナログオーディオ出力回路</em></div>

![図 5.5-4: アナログMIC回路](../../sf32-products/chips/assets/58x/sf32lb58x-MIC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-4: アナログMIC回路</em></div>

![図 5.5-5: ステレオヘッドホン回路](../../sf32-products/chips/assets/58x/sf32lb58x-PHONE-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-5: ステレオヘッドホン回路</em></div>

![図 5.5-6: アナログオーディオPA回路](../../sf32-products/chips/assets/58x/sf32lb58x-AUPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-6: アナログオーディオPA回路</em></div>

![図 5.5-7: I2SオーディオPA回路](../../sf32-products/chips/assets/58x/sf32lb58x-I2SPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-7: I2SオーディオPA回路</em></div>

<div align="center"><em>表 5.5-8: オーディオ信号の接続</em></div>

<div align="center" markdown>

| オーディオ信号 | I/O | 説明 |
|:---|:---|:---|
| I2S1_LRCK | PA14 | I2S1フレームクロック |
| I2S1_SDI | PA18 | I2S1データ入力 |
| I2S1_BCK | PA23 | I2S1ビットクロック |
| I2S2_LRCK | PA84 | I2S2フレームクロック |
| I2S2_SDI | PA86 | I2S2データ入力 |
| I2S2_SDO | PA82 | I2S2データ出力 |
| I2S2_BCK | PA91 | I2S2ビットクロック |
| I2S3_LRCK | PB31 | I2S3フレームクロック |
| I2S3_SDI | PB27 | I2S3データ入力 |
| I2S3_SDO | PB24 | I2S3データ出力 |
| I2S3_BCK | PB30 | I2S3ビットクロック |
| I2S3_MCLK | PB34 | I2S3マスタークロック |
| PDM1_CLK | PA23 | PDM1クロック |
| PDM1_DATA | PA18 | PDM1データ |
| PDM2_CLK | PA25 | PDM2クロック |
| PDM2_DATA | PA22 | PDM2データ |
| AU_ADC1P/AU_ADC1N | ADC1P/ADC1N | アナログ入力1P/1N |
| AU_ADC2P/AU_ADC2N | ADC2P/ADC2N | アナログ入力2P/2N |
| AU_DAC1P/AU_DAC1N | DAC1P/DAC1N | アナログ出力1P/1N |
| AU_DAC2P/AU_DAC2N | DAC2P/DAC2N | アナログ出力2P/2N |

</div>

!!! note "ピン多重化に関する注意"
    I2S1_SDIはPDM1_DATAとPA18を共有し、I2S1_BCKはPDM1_CLKとPA23を共有します。I2S1_LRCKはPA14、PDM2_DATAはPA22を使用します。回路図を確定する前に、ソフトウェアのインターフェース設定で有効にするオーディオ機能を確認してください。

SF32LB58xのアナログMIC入力はシングルエンドモードと差動モードの両方に対応し、いずれの場合も2.2 µFのコンデンサーを直列に接続します。AU_ADC1P/AU_ADC1N/AU_ADC2P/AU_ADC2NはSF32LB58x側に接続してください。アナログ出力側のAU_DAC1P/AU_DAC1N/AU_DAC2P/AU_DAC2NはSF32LB58xの出力で、ステレオヘッドホンPA入力または外付けアナログオーディオPA入力を駆動できます。アナログオーディオPAとI2SオーディオPAはどちらもI2C3経由で設定します。

#### 5.5.4. ボタン {#544-buttons}

##### 5.5.4.1. 電源ボタンと長押しリセット {#5441-power-and-long-press-reset-button}

SF32LB58xシリーズでは、電源キー信号にPB54を推奨します。短押しで電源をオン／オフし、長押しでリセットする機能を1つのボタンにまとめられます。アクティブHighで、10秒を超えて押し続けるとチップが自動的にリセットされます。

![図 5.5-8: 電源／リセットボタン回路](../../sf32-products/chips/assets/58x/sf32lb58x-PWRKEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-8: 電源／リセットボタン回路</em></div>

##### 5.5.4.2. 機能ボタンまたはロータリーエンコーダー {#5442-function-button-or-rotary-encoder}

SF32LB58xシリーズは機能ボタン入力とロータリーエンコーダー信号入力に対応し、どちらもプルアップが必要です。また、光学トラッキングセンサーにも対応し、I2C4インターフェースの使用を推奨します。

![図 5.5-9: 機能ボタン／ロータリーエンコーダー回路](../../sf32-products/chips/assets/58x/sf32lb58x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-9: 機能ボタン／ロータリーエンコーダー回路</em></div>

<div align="center"><em>表 5.5-9: 光学トラッキングセンサー信号</em></div>

<div align="center" markdown>

| I2C信号 | I/O | 説明 |
|:---|:---|:---|
| INT | PA58 | 光学トラッキングセンサーの割り込み入力 |
| SDA | PA59 | 光学トラッキングセンサーのI2Cデータ |
| SCL | PA60 | 光学トラッキングセンサーのI2Cクロック |

</div>

#### 5.5.5. 振動モーター {#545-vibration-motor}

SF32LB58xシリーズは複数のPWM出力に対応し、振動モーターを駆動できます。

!!! important
    ソフトウェアでHCPUの周波数スケーリングマクロ`#define BSP_PM_FREQ_SCALING 1`を有効にすると、アイドルスレッドに入ったときにHCPUクロックが低下し、それに伴って該当するPAピンのPWM周波数も変化します。そのため、PWM信号はPBピンから出力することを推奨します。

![図 5.5-10: 振動モーター回路](../../sf32-products/chips/assets/58x/sf32lb58x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.5-10: 振動モーター回路</em></div>

### 5.6. ストレージと接続 {#55-storage-and-connectivity}

#### 5.6.1. ブート設定 {#551-boot-configuration}
SF32LB58xシリーズは、ブートモードを設定する`Mode`ピンを備えています。

<div align="center"><em>表 5.6-1: Mode設定</em></div>

<div align="center" markdown>

| `Mode`設定 | 説明 |
|:---|:---|
| High | 電源投入後にダウンロードモードへ移行 |
| Low | 電源投入後にユーザーアプリケーション領域へジャンプ |

</div>

!!! note "注意事項"
    1. `Mode`ピンの電圧ドメインはVDDIOAと同じです。
    2. `Mode`のレベルを安定させるため、10 kΩ抵抗を介して電源またはGNDにプルしてください。フローティングやレベルの切り替わりを避けてください。
    3. 量産基板では、ファームウェアの書き込みと水晶振動子の校正に使う`Mode`ピンのテストポイントを確保してください。ジャンパーは不要です。
    4. テスト基板では、ファームウェア異常後にダウンロードモードで起動できるよう、`Mode`ピン用ジャンパーを設けることを推奨します。

#### 5.6.2. ストレージ {#552-storage}

SF32LB58xシリーズは、外付けNOR FlashおよびSPI NAND Flash用にMPI3またはMPI4、外付けSD NANDおよびeMMC用にSD1インターフェースをサポートします。

##### 5.6.2.1. QSPI NAND Flashインターフェース {#5521-qspi-nand-flash-interface}

SF32LB58x EVBのリファレンス基板では、外付けSPI NAND Flashデバイスの接続にMPI4を標準で使用します。

![図 5.6-1: SPI NAND Flashリファレンス回路](../../sf32-products/chips/assets/58x/sf32lb58x-SPINAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.6-1: SPI NAND Flashリファレンス回路</em></div>

<div align="center"><em>表 5.6-2: MPI4信号の接続</em></div>

<div align="center" markdown>

| Flash信号 | I/O信号（MPI4） | 説明 |
|:---|:---|:---|
| CS# | PA10 | チップセレクト、アクティブLow |
| SO | PA04 | データ入力（データ入出力1） |
| WP# | PA01 | 書き込み保護出力（データ入出力2） |
| SI | PA05 | データ出力（データ入出力0） |
| SCLK | PA09 | シリアルクロック出力 |
| Hold# | PA06 | データ出力（データ入出力3） |

</div>

!!! note "注意事項"
    1. 量産ラインで外付けFlashにファームウェアを書き込む場合、ダウンロードツールのソフトウェアで外付けFlashの電源制御ピンPA43をHighにし、電源を有効にする必要があります。
    2. SPI NAND FlashのHold#ピンは、10 kΩ抵抗を介してSPI NAND Flashの電源にプルアップしてください。

##### 5.6.2.2. SDIO eMMC／Micro SDインターフェース {#5522-sdio-emmc-micro-sd-interface}

SF32LB58xシリーズはSDIOインターフェースを2系統備えています。EVBでは、SD1にeMMCまたはSD NAND、SD2にSDカードまたはWi-Fiチップを標準で接続します。

SD1はVDDIOA2ドメインから給電される12本のGPIO（PA00-PA11）を使用し、周辺デバイスのIOレベルに応じて1.8 Vまたは3.3 Vを選択できます。SPI NAND FlashとeMMCには1.8 Vを推奨します。SD NAND Flashデバイスは3.3 Vのインターフェースレベルのみ対応するため、その場合はVDDIOA2を3.3 Vに設定してください。

![図 5.6-2: eMMCリファレンス回路](../../sf32-products/chips/assets/58x/sf32lb58x-EMMC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.6-2: eMMCリファレンス回路</em></div>

![図 5.6-3: SD NANDリファレンス回路](../../sf32-products/chips/assets/58x/sf32lb58x-SDNAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.6-3: SD NANDリファレンス回路</em></div>

![図 5.6-4: SDカードリファレンス回路](../../sf32-products/chips/assets/58x/sf32lb58x-TF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.6-4: SDカードリファレンス回路</em></div>

<div align="center"><em>表 5.6-3: SD1信号の接続</em></div>

<div align="center" markdown>

| SD1信号 | I/O信号 | 説明 |
|:---|:---|:---|
| SD1_D7 | PA00 | データ7 |
| SD1_D2 | PA01 | データ6 |
| SD1_D5 | PA03 | データ5 |
| SD1_D1 | PA04 | データ1 |
| SD1_D0 | PA05 | データ0 |
| SD1_D3 | PA06 | データ3 |
| SD1_D4 | PA07 | データ4 |
| SD1_D6 | PA08 | データ6 |
| SD1_CLK | PA09 | クロック信号 |
| SD1_CMD | PA10 | コマンド信号 |

</div>

!!! note "SD1信号名の確認"
    原資料ではSD1がPA00～PA11の計12本のGPIOを使用するとしていますが、信号表に記載されているのは10信号（SD1_D[7:0]、CLK、CMD）のみです。また同表ではSD1_D2とSD1_D6の詳細説明がどちらも「Data 6」になっています。原資料には未掲載の2本のGPIOの用途も、重複表記の説明もありません。回路図を確定する前に、チップのデータシートでSD1の完全なピン割り当てを確認してください。

<div align="center"><em>表 5.6-4: SD2信号の接続</em></div>

<div align="center" markdown>

| SD2信号 | I/O信号 | 説明 |
|:---|:---|:---|
| SD2_CMD | PA70 | コマンド信号 |
| SD2_D1 | PA75 | データ1 |
| SD2_D0 | PA76 | データ0 |
| SD2_CLK | PA77 | クロック信号 |
| SD2_D2 | PA79 | データ2 |
| SD2_D3 | PA81 | データ3 |

</div>

#### 5.6.3. USB {#553-usb}

SF32LB58xシリーズのUSBは、USB 2.0 HSのホストモードとデバイスモードの両方に対応します。USB DPとDMのそれぞれに、GNDへ接続するTVS保護を設けてください。TVSの接合容量は5 pF未満とします。DP/DMの基板配線は差動ペアとして引き、インピーダンスを90 Ωに制御します。

![図 5.6-5: USBインターフェース回路](../../sf32-products/chips/assets/58x/sf32lb58x-USB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.6-5: USBインターフェース回路</em></div>

### 5.7. 製造 {#56-manufacturing}

#### 5.7.1. デバッグ／ダウンロードインターフェース {#561-debug-and-download-interface}
SF32LB58xシリーズは、EDAツールによるステップ実行デバッグに使用するArm®標準のSWDデバッグインターフェースに対応します。SEGGER® J-Link®プローブを接続する場合は、電源設定を外部給電に変更し、SF32LB58x基板から給電してください。

![図 5.7-1: SWDデバッグインターフェース回路](../../sf32-products/chips/assets/58x/sf32lb58x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.7-1: SWDデバッグインターフェース回路</em></div>

SF32LB58xでは、1系統のSWDインターフェースに加え、デバッグ出力用に6系統のUARTインターフェースを選択して使用できます。

<div align="center"><em>表 5.7-1: デバッグポートの接続</em></div>

<div align="center" markdown>

| UART信号 | I/O | 説明 |
|:---|:---|:---|
| TXD1 | PA31 | UART1 RXD、HCPUのデフォルト出力ポート |
| RXD1 | PA32 | UART1 TXD、HCPUのデフォルト出力ポート |
| TXD2 | PA28 | UART2 RXD |
| RXD2 | PA29 | UART2 TXD |
| TXD3 | PA21 | UART3 RXD |
| RXD3 | PA20 | UART3 TXD |
| TXD4 | PB37 | UART4 RXD、LCPUのデフォルト出力ポート |
| RXD4 | PB36 | UART4 TXD、LCPUのデフォルト出力ポート |
| TXD5 | PB18 | UART5 RXD |
| RXD5 | PB17 | UART5 TXD |
| TXD6 | PB14 | UART6 RXD |
| RXD6 | PB13 | UART6 TXD |
| SWCLK | PB07 | J-Linkクロック信号 |
| SWDIO | PB11 | J-Linkデータ信号 |

</div>

!!! note "注意"
    UARTx RXD信号をフローティング状態にしないでください。ソフトウェアの初期化時に内部プルアップを有効にしてください。

#### 5.7.2. 量産時の書き込みとハードウェアアクセス {#562-production-flashing-and-hardware-access}

量産書き込み、リカバリー、校正用のアクセス方法は、筐体と治具の設計を確定する前に計画してください。少なくとも電源、GND、SWD、必要なUARTデバッグ出力、ブート／設定ピンにアクセスできるようにします。また、ファームウェアが起動しない場合の復旧に必要な基板上のリセット信号やPMIC制御点も確保してください。

#### 5.7.3. 回路図・PCB設計チェックリスト {#563-schematic-and-pcb-drawing-checklists}

- [ ] 内蔵PMUから直接給電する構成、またはSF30147Cを併用する構成が、システムの電力予算に合っていること
- [ ] Modeブート設定ピンに外付け10 kΩ抵抗を接続し、量産基板にテストポイントを確保していること
- [ ] 48 MHz／32.768 kHz水晶振動子の仕様が推奨値に合い、水晶振動子直下の第2層からGNDを除去していること
- [ ] ストレージインターフェース（MPI4／SD1／SD2）の選択がブート設定に合い、外付けFlashの電源制御ピンPA43を確認していること
- [ ] ディスプレイインターフェース（MIPI-DSI／SPI-QSPI／MCU8080／DPI／JDI）の選択がLCDC1／LCDC2のピン割り当てに合っていること
- [ ] 必要なデバッグポート（SWDおよび6系統のUART）のピンを割り当て、UART RXDの内部プルアップを有効にしていること
- [ ] オーディオインターフェース（I2S／PDM）とアナログオーディオとのピン多重化を確認し、差動配線の予算を満たしていること
- [ ] USB DPとDMの両方にGND接続のTVS保護を設け、TVSの接合容量を5 pF未満にすること

[SiFli承認ベンダーリスト (Approved Vendor List, AVL)]: ../cad-components/sifli-approved-vendor-list.md
