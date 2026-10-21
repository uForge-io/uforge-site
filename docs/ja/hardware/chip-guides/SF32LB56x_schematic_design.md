---
icon: lucide/circuit-board
description: "SF32LB56x MCUの回路図設計ガイド。電源、動作モードとウェイクアップ要因、クロック生成、RF、ディスプレイ／タッチ／バックライト、ストレージ／センサー／オーディオ／接続機能、製造について説明します。"
tags:
    - ハードウェア
    - チップ
hide:
    - navigation
---

# SF32LB56xハードウェア設計ガイド — 回路図設計ガイドライン { #sf32lb56x-hardware-design-guide-schematic-design-guidelines }

!!! note "SF32LB56xハードウェア設計ガイドの一部"
    このページではセクション5「回路図設計ガイドライン」を扱います。デバイス選定と設計フロー全体については[SF32LB56xハードウェア設計ガイドの概要](SF32LB56x_hardware_design_guide.md)から確認してください。続けて[回路図チェックリスト](SF32LB56x_schematic_checklist.md)を確認するか、[PCBレイアウトガイドライン](SF32LB56x_pcb_layout.md)に進むこともできます。

## 5. 回路図設計ガイドライン { #5-schematic-design-guidelines }

### 5.1. 電源システム { #51-power-system }

プロセッサーの電源レール、ピン近くに配置する必須のコンデンサー、PMIC出力の割り当て、リセットタイミング、充電回路の配線をまとめて確認してください。UバリアントとVバリアントは電源設計の考え方が共通ですが、電源ピン名と負荷の割り当ては異なります。

<div align="center"><em>表 5.1-1: SF32LB56xUプロセッサーの電源レール</em></div>

<div align="center" markdown>

| PMU電源ピン | 最小電圧(V) | 標準電圧(V) | 最大電圧(V) | 最大電流(mA) | 詳細 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1.7 | 1.8 | 3.6 | 100 | PVDD電源入力 |
| BUCK_LX BUCK_FB | - | 1.25 | - | 100 | BUCK_LX出力はインダクターに接続します。内部電源入力はインダクターの反対側と外付けコンデンサーに接続します。 |
| LDO1_VOUT | - | 1.1 | - | 50 | 外付けコンデンサーを接続するLDO1出力 |
| LDO2_VOUT | - | 0.9 | - | 20 | 外付けコンデンサーを接続するLDO2出力 |
| VDD_RET | - | 0.9 | - | 1 | 外付けコンデンサーを接続するRET LDO出力 |
| VDD_RTC | - | 1.1 | - | 1 | 外付けコンデンサーを接続するRTC LDO出力 |
| MIC_BIAS | 1.4 | - | 2.8 | - | マイク電源出力 |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | アナログ電源およびRFPA電源入力 |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | アナログオーディオ電源 |
| VDDIO1 | 1.71 | 1.8 | 1.98 | - | ビッグコア内蔵ストレージデバイスの電源入力 |
| VDDIO2 | 1.71 | 1.8 | 3.45 | - | PA GPIO（PA5~11を除く）の電源入力 |
| VDDIO3 | 1.71 | 1.8 | 3.45 | - | PA5~11の電源入力 |
| VDDIO4 | 1.71 | 1.8 | 3.45 | - | PB GPIOおよびスモールコア内蔵Flashの電源入力 |
| GPADC_VREF | - | - | - | - | GPADC基準電圧入力。外付けコンデンサーのみを接続し、外部電源は不要です。 |
| AUD_VREF | - | - | - | - | オーディオ基準電圧入力。外付けコンデンサーのみを接続し、外部電源は不要です。 |

</div>

<div align="center"><em>表 5.1-2: SF32LB56xVプロセッサーの電源レール</em></div>

<div align="center" markdown>

| PMU電源ピン | 最小電圧(V) | 標準電圧(V) | 最大電圧(V) | 最大電流(mA) | 詳細 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1.71 | 1.8 | 3.6 | 100 | PVDD電源入力 |
| BUCK_LX BUCK_FB | - | 1.25 | - | 100 | BUCK_LX出力はインダクターに接続します。内部電源入力はインダクターの反対側と外付けコンデンサーに接続します。 |
| LDO1_VOUT | - | 1.1 | - | 50 | 外付けコンデンサーに接続するLDO1出力 |
| LDO2_VOUT | - | 0.9 | - | 20 | 外付けコンデンサーに接続するLDO2出力 |
| VDD_RET | - | 0.9 | - | 1 | 外付けコンデンサーに接続するRET LDO出力 |
| VDD_RTC | - | 1.1 | - | 1 | 外付けコンデンサーに接続するRTC LDO出力 |
| MIC_BIAS | 1.4 | - | 2.8 | - | マイク電源出力 |
| AVDD_BRF | 1.71 | 1.8 | 3.3 | 1 | RF電源入力 |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | アナログ電源およびRFPA電源入力 |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | アナログオーディオ電源 |
| VDDIOA | 1.71 | 1.8 | 3.45 | - | PA12-PA78 I/O電源入力 |
| VDDIOA2 | 1.71 | 1.8 | 3.45 | - | PA0-PA11 I/O電源入力 |
| VDDIOB | 1.71 | 1.8 | 3.45 | - | PB I/O電源入力 |
| VDDIOSA | 1.71 | 1.8 | 1.98 | - | SIPA電源入力 |
| VDDIOSB | 1.71 | 1.8 | 1.98 | - | SIPB電源入力 |
| VDDIOSC | 1.71 | 1.8 | 1.98 | - | SIPC電源入力 |
| GPADC_VREF | - | - | - | - | GPADC基準電圧入力。外付けコンデンサーのみを接続し、外部電源は不要です。 |
| AUD_VREF | - | - | - | - | オーディオ基準電圧入力。外付けコンデンサーのみを接続し、外部電源は不要です。 |

</div>

<div align="center"><em>表 5.1-3: SF32LB56xUで必要な電源コンデンサー</em></div>

<div align="center" markdown>

| 電源ピン | コンデンサー | 詳細 |
| :--- | :--- | :--- |
| PVDD | 0.1uF + 10uF | 10uFと0.1uFのコンデンサーを各1個以上、ピンの近くに配置します。 |
| BUCK_LX BUCK_FB | 0.1uF + 4.7uF | 4.7uFと0.1uFのコンデンサーを各1個以上、ピンの近くに配置します。 |
| LDO1_VOUT | 4.7uF | 4.7uFコンデンサーを1個以上、ピンの近くに配置します。 |
| LDO2_VOUT | 4.7uF | 4.7uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDD_RET | 0.47uF | 0.47uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDD_RTC | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| AVDD33_ANA | 4.7uF | 4.7uFコンデンサーを1個以上、ピンの近くに配置します。 |
| GPADC_VREF | 4.7uF | 4.7uFコンデンサーを1個以上、ピンの近くに配置します。 |
| AVDD33_AUD | 4.7uF | 4.7uFコンデンサーを1個以上、ピンの近くに配置します。 |
| AUD_VREF | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| MIC_BIAS | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDDIO1 | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDDIO2 | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDDIO3 | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDDIO4 | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |

</div>

<div align="center"><em>表 5.1-4: SF32LB56xVで必要な電源コンデンサー</em></div>

<div align="center" markdown>

| 電源ピン | コンデンサー | 詳細 |
| :--- | :--- | :--- |
| PVDD | 0.1uF + 10uF | 10uFと0.1uFのコンデンサーを各1個以上、ピンの近くに配置します。 |
| BUCK_LX BUCK_FB | 0.1uF + 4.7uF | 4.7uFと0.1uFのコンデンサーを各1個以上、ピンの近くに配置します。 |
| LDO1_VOUT | 4.7uF | 4.7uFコンデンサーを1個以上、ピンの近くに配置します。 |
| LDO2_VOUT | 4.7uF | 4.7uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDD_RET | 0.47uF | 0.47uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDD_RTC | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| AVDD_BRF | 4.7uF | 4.7uFコンデンサーを1個以上、ピンの近くに配置します。 |
| AVDD33_ANA | 4.7uF | 4.7uFコンデンサーを1個以上、ピンの近くに配置します。 |
| GPADC_VREFP | 4.7uF | 4.7uFコンデンサーを1個以上、ピンの近くに配置します。 |
| AVDD33_AUD | 4.7uF | 4.7uFコンデンサーを1個以上、ピンの近くに配置します。 |
| AUD_VREF | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| MIC_BIAS | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDDIOA | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDDIOA2 | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDDIOB | 1uF | 1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDDIOSA | 0.1uF | 0.1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDDIOSB | 0.1uF | 0.1uFコンデンサーを1個以上、ピンの近くに配置します。 |
| VDDIOSC | 0.1uF | 0.1uFコンデンサーを1個以上、ピンの近くに配置します。 |

</div>

<div align="center"><em>表 5.1-5: SF30147C PMICの出力定格（Uバリアントの例）</em></div>

<div align="center" markdown>

| SF30147C電源ピン | 最小電圧(V) | 最大電圧(V) | 最大電流(mA) | 詳細 |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1.8 | 1.8 | 500 | 1.8V出力。Uバリアントのチップ電源端子への割り当てはこの行から推定しないでください。 |
| LVSW1 | 1.8 | 1.8 | 100 | 1.8V電源出力 |
| LVSW2 | 1.8 | 1.8 | 100 | G-SENSOR用1.8V電源入力 |
| LVSW3 | 1.8 | 1.8 | 150 | 心拍センサー用1.8V電源入力 |
| LVSW4 | 1.8 | 1.8 | 150 | LCD用1.8V電源入力 |
| LVSW5 | 1.8 | 1.8 | 150 | 1.8V電源出力 |
| LDO1 | 2.8 | 3.3 | 100 | 2.8～3.3V出力。Uバリアントのチップ電源端子への割り当てはこの行から推定しないでください。 |
| LDO2 | 2.8 | 3.3 | 100 | モーター電源入力 |
| LDO3 | 2.8 | 3.3 | 100 | LCD用3.3V電源入力 |
| LDO4 | 2.8 | 3.3 | 100 | 心拍センサー用3.3V電源入力 |
| HVSW1 | 2.8 | 5 | 150 | アナログClass-K PA電源入力 |
| HVSW2 | 2.8 | 5 | 150 | GPS電源入力 |

</div>

!!! warning "UバリアントのPMIC電源レールの割り当てを確認"
    SiFliの原典にあるUバリアント電源割り当て表にはVDDIOA、VDDIOA2、VDDIOB、VDDIOSA/B/C、AVDD_BRFが記載されていますが、同じガイドのUバリアントのプロセッサー電源表と一致しません。上表ではPMIC出力の電圧・電流定格のみを示しています。Uバリアントのチップ端子接続を推定するために使用せず、レイアウトのリリース前に該当する回路図リビジョンとSF30147Cデータシートで確認してください。

<div align="center"><em>表 5.1-6: V向けSF30147C PMIC電源分配例</em></div>

<div align="center" markdown>

| SF30147C電源ピン | 最小電圧(V) | 最大電圧(V) | 最大電流(mA) | 詳細 |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1.8 | 1.8 | 500 | SF32LB56xVのPVDD、VDDIOA、VDDIOA2、VDDIOB、VDDIOSA、VDDIOSB、VDDIOSC、AVDD_BRFなどの1.8V電源入力 |
| LVSW1 | 1.8 | 1.8 | 100 | I2S Class-K PAロジック電源入力 |
| LVSW2 | 1.8 | 1.8 | 100 | G-SENSOR用1.8V電源入力 |
| LVSW3 | 1.8 | 1.8 | 150 | 心拍センサー用1.8V電源入力 |
| LVSW4 | 1.8 | 1.8 | 150 | LCD用1.8V電源入力 |
| LVSW5 | 1.8 | 1.8 | 150 | eMMCコア電源入力 |
| LDO1 | 2.8 | 3.3 | 100 | SF32LB56xVのAVDD33_ANA、AVDD33_AUD、VDDIOA2などの3.3V電源入力 |
| LDO2 | 2.8 | 3.3 | 100 | eMMCまたはSD NANDの電源入力 |
| LDO3 | 2.8 | 3.3 | 100 | LCD用3.3V電源入力 |
| LDO4 | 2.8 | 3.3 | 100 | 心拍センサー用3.3V電源入力 |
| HVSW1 | 2.8 | 5 | 150 | アナログClass-K PA電源入力 |
| HVSW2 | 2.8 | 5 | 150 | GPS電源入力 |

</div>

![図 5.1-1: SF32LB56xUのPOR/BORタイミング](../../sf32-products/chips/assets/56x/SF32LB56xU-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-1: SF32LB56xUのPOR/BORタイミング</em></div>

![図 5.1-2: SF32LB56xVのPOR/BORタイミング](../../sf32-products/chips/assets/56x/sf32lb56xV-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-2: SF32LB56xVのPOR/BORタイミング</em></div>

![図 5.1-3: SF32LB56xUのBUCKリファレンス回路](../../sf32-products/chips/assets/56x/SF32LB56xU-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-3: SF32LB56xUのBUCKリファレンス回路</em></div>

![図 5.1-4: SF32LB56xVのBUCKリファレンス回路](../../sf32-products/chips/assets/56x/sf32lb56xV-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-4: SF32LB56xVのBUCKリファレンス回路</em></div>

![図 5.1-5: SF32LB56xUのLDOリファレンス回路](../../sf32-products/chips/assets/56x/SF32LB56xU-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-5: SF32LB56xUのLDOリファレンス回路</em></div>

![図 5.1-6: SF32LB56xVのLDOリファレンス回路](../../sf32-products/chips/assets/56x/sf32lb56xV-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-6: SF32LB56xVのLDOリファレンス回路</em></div>

![図 5.1-7: SF32LB56xUの充電リファレンス回路](../../sf32-products/chips/assets/56x/sf32lb56xU-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-7: SF32LB56xUの充電リファレンス回路</em></div>

![図 5.1-8: SF32LB56xVの充電リファレンス回路](../../sf32-products/chips/assets/56x/sf32lb56xV-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>図 5.1-8: SF32LB56xVの充電リファレンス回路</em></div>

電源パス管理のない充電器では、システムはバッテリーとともにVBATへ直接接続されます。低コストですが、下流回路をバッテリーから完全に切り離せず、漏れ電流が増えるため、低消費電力のShipping Mode要件を満たしません。過放電時は、充電器のトリクル電流がシステム電流と漏れ電流の合計（元の図のi1+i2）を上回る必要があります。システム動作中も、定電流充電電流がi1+i2を上回らなければ、システム負荷が充電電流を消費して満充電に至らないことがあります。電源パス管理付き充電器は、VSYSのシステム電源とVBATのバッテリー充電を分離し、Shipping Modeに対応します。バッテリーが過放電していても、VSYSからシステムへ給電できます。

Uバリアントでは、周辺機器のI/O電圧とシステム消費電力に応じて、3つの電源構成から選択します。いずれの構成でもAVDD33_ANAとAVDD33_AUDには3.3 Vを供給します。最も低消費電力の構成では、PVDDとVDDIO1～VDDIO4を1.8 Vとし、I/O電圧が1.8 Vの周辺機器を使用します。中間の構成ではPVDDとVDDIO1を1.8 V、VDDIO2～VDDIO4と周辺機器のI/Oを3.3 Vにします。最も消費電力が大きい構成では、内蔵PSRAMに給電するVDDIO1のみを1.8 Vとし、PVDD、VDDIO2～VDDIO4、周辺機器のI/Oを3.3 Vにします。外部モジュールは負荷スイッチで動的に電源管理し、未使用時は既定でオフにします。常時オンにする必要があるモジュールには、静止電流の小さい部品を選んでください。負荷スイッチ制御GPIOのハードウェア既定レベルはスイッチのイネーブル極性と一致させ、起動時にオフになるようにします。SiFliはイネーブル入力に1 MΩのプルアップまたはプルダウンを推奨しています。

UバリアントのPMUはPVDDが1.5 Vに達するとパワーオンリセットを完了します。PVDDが低下すると、1.5～2.5 Vの範囲で設定可能なBORしきい値に達した時点でブラウンアウトリセットが発生します。

### 5.2. 動作モードとウェイクアップ要因 { #52-operating-modes-and-wake-sources }

動作モード、ウェイクアップ要因、プルアップ抵抗の電源、漏れ電流に関する設計判断をまとめて確認してください。ボタン、タッチ、センサー割り込み、充電器イベントなど、低消費電力状態からの復帰信号にはウェイクアップ対応ピンを使用します。

<div align="center"><em>表 5.2-1: SF32LB56xUの動作モード</em></div>

<div align="center" markdown>

| 動作モード | CPU | 周辺機能 | SRAM | I/O | LPTIM | ウェイクアップ要因 | 復帰時間 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| アクティブ | 動作 | 動作 | アクセス可能 | トグル可能 | 動作 |  |  |
| WFI/WFE | 停止 | 動作 | アクセス可能 | トグル可能 | 動作 | 任意の割り込み | < 0.5us |
| DEEPWFI | 停止 | 動作 | アクセス可能 | トグル可能 | 動作 | 任意の割り込み | < 5us |
| Light sleep | 停止 | 停止 | アクセス不可、全領域を保持 | レベル保持 | 動作 | RTC、GPIO、LPTIM、システム間割り込み、Bluetooth、コンパレーター | < 100us |
| Deep sleep | 停止 | 停止 | アクセス不可、全領域を保持 | レベル保持 | 動作 |  | < 300us |
| Standby | リセット | リセット | アクセス不可。LPは全領域を保持し、HPは160KBのみ保持 | レベル保持 | 動作 | RTC、ボタン、LPTIM、システム間割り込み、Bluetooth | 1.5ms+復帰処理 |
| Hibernate rtc | リセット | リセット | データ保持なし | High-Z | リセット | RTC、ボタン | > 2ms |
| Hibernate pin | リセット | リセット | データ保持なし | High-Z | リセット | ボタン | > 2ms |

</div>

<div align="center"><em>表 5.2-2: SF32LB56xVの動作モード</em></div>

<div align="center" markdown>

| 動作モード | CPU | 周辺機能 | SRAM | I/O | LPTIM | ウェイクアップ要因 | 復帰時間 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| アクティブ | 動作 | 動作 | アクセス可能 | トグル可能 | 動作 |  |  |
| WFI/WFE | 停止 | 動作 | アクセス可能 | トグル可能 | 動作 | 任意の割り込み | < 0.5us |
| DEEPWFI | 停止 | 動作 | アクセス可能 | トグル可能 | 動作 | 任意の割り込み | < 5us |
| Light sleep | 停止 | 停止 | アクセス不可、全領域を保持 | レベル保持 | 動作 | RTC、GPIO、LPTIM、LPCOMP、システム間割り込み、Bluetooth | < 100us |
| Deep sleep | 停止 | 停止 | アクセス不可、全領域を保持 | レベル保持 | 動作 | RTC、GPIO、LPTIM、LPCOMP、システム間割り込み、Bluetooth | < 300us |
| Standby | リセット | リセット | アクセス不可。LPは全領域を保持し、HPは160KBのみ保持 | レベル保持 | 動作 | RTC、ボタン、LPTIM、システム間割り込み、Bluetooth | 1.5ms+復帰処理 |
| Hibernate rtc | リセット | リセット | データ保持なし | High-Z | リセット | RTC、ボタン | > 2ms |
| Hibernate pin | リセット | リセット | データ保持なし | High-Z | リセット | ボタン | > 2ms |

</div>

<div align="center"><em>表 5.2-3: SF32LB56xUのウェイクアップ割り込み源</em></div>

<div align="center" markdown>

| 割り込み源 | ピン | 詳細 |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | 割り込み信号0 |
| WKUP_PIN1 | PB33 | 割り込み信号1 |
| WKUP_PIN2 | PB34 | 割り込み信号2 |
| WKUP_PIN5 | PA50 | 割り込み信号5 |
| WKUP_PIN6 | PA51 | 割り込み信号6 |
| WKUP_PIN10 | PBR0 | 割り込み信号10 |
| WKUP_PIN11 | PBR1 | 割り込み信号11 |
| WKUP_PIN12 | PBR2 | 割り込み信号12 |

</div>

<div align="center"><em>表 5.2-4: SF32LB56xVのウェイクアップ割り込み源</em></div>

<div align="center" markdown>

| 割り込み源 | ピン | 詳細 |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | 割り込み信号0 |
| WKUP_PIN1 | PB33 | 割り込み信号1 |
| WKUP_PIN2 | PB34 | 割り込み信号2 |
| WKUP_PIN3 | PB35 | 割り込み信号3 |
| WKUP_PIN4 | PB36 | 割り込み信号4 |
| WKUP_PIN5 | PA50 | 割り込み信号5 |
| WKUP_PIN6 | PA51 | 割り込み信号6 |
| WKUP_PIN7 | PA52 | 割り込み信号7 |
| WKUP_PIN8 | PA53 | 割り込み信号8 |
| WKUP_PIN9 | PA54 | 割り込み信号9 |
| WKUP_PIN10 | PBR0 | 割り込み信号10 |
| WKUP_PIN11 | PBR1 | 割り込み信号11 |
| WKUP_PIN12 | PBR2 | 割り込み信号12 |
| WKUP_PIN13 | PBR3 | 割り込み信号13 |

</div>

BOOT_MODEで起動動作を選択します。Highではダウンロードモードに入り、LowではROMがユーザープログラムを確認し、存在すれば実行、なければダウンロードモードに入ります。UバリアントのMode端子には内部プルダウンがあり、未使用時はオープンにできます。電源ドメインはVDDIO2です。VバリアントのMode端子はVDDIOAドメインで、10 kΩのプルアップまたはプルダウンで安定させます。Vバリアントではオープンやノイズによるレベル変化を避けてください。量産基板にはModeのテストポイントを設け、開発ボードでは復旧用ジャンパーも有用です。

低消費電力時のメモリーI/O電源も確認してください。UバリアントはStandby中にGPIOレベルが保持され、VDDIO1を給電し続けられます。MPI1/MPI2接続のストレージは低消費電力モードにしてください。HibernateではGPIOレベルが保持されないため、内蔵メモリーI/O経由の漏れを防ぐためにVDDIO1をオフにします。VバリアントはStandby中に内蔵メモリーI/Oを給電したままにします。Hibernate前にPBR0でVDDIOSAとVDDIOSBをオフにし、NOR FlashをDeep Power-Downにしてください。VDDIOSCは給電を維持します。

### 5.3. クロック生成 { #53-clock-generation }

<div align="center"><em>表 5.3-1: 水晶振動子の要件</em></div>

<div align="center" markdown>

| 水晶振動子 | 仕様要件 | 詳細 |
| :--- | :--- | :--- |
| 48 MHz | 7 pF ≤ CL ≤ 12 pF（推奨値：8.8 pF）、△F/F0 ≤ ±10 ppm、ESR ≤ 30 Ω（推奨値：22 Ω） | 水晶発振器の消費電力はCLとESRに関係します。CLとESRが小さいほど消費電力は低くなります。消費電力を抑えるには、規定範囲内でCLとESRが比較的小さい部品を選んでください。水晶振動子の近くに並列接続用のマッチングコンデンサーを実装できるフットプリントを確保してください。CL < 12 pFの場合、コンデンサーを実装する必要はありません。 |
| 32.768 kHz | CL ≤ 12.5 pF（推奨値：7 pF）、△F/F0 ≤ ±20 ppm、ESR ≤ 80 kΩ（推奨値：38 kΩ） | 水晶振動子の消費電力はCLとESRに関係します。CLとESRが小さいほど消費電力は低くなります。消費電力を抑えるには、規定範囲内でCLとESRが比較的小さい部品を選んでください。水晶振動子の近くに並列接続用のマッチングコンデンサーを実装できるフットプリントを確保してください。CL < 12.5 pFの場合、コンデンサーを実装する必要はありません。 |

</div>

<div align="center"><em>表 5.3-2: 推奨水晶振動子型番</em></div>

<div align="center" markdown>

| 型番 | メーカー | パラメーター |
| :--- | :--- | :--- |
| E1SB48E001G00E | Hosonic | F0 = 48.000000 MHz、△F/F0 = −6～+8 ppm、CL = 8.8 pF、ESR ≤ 22 Ω、TOPR = −30～+85 °C、パッケージ：2016（メートル法） |
| ETST00327000LE | Hosonic | F0 = 32.768 kHz、△F/F0 = −20～+20 ppm、CL = 7 pF、ESR ≤ 70 kΩ、TOPR = −40～+85 °C、パッケージ：3215（メートル法） |
| SX20Y048000B31T-8.8 | TKD | F0 = 48.000000 MHz、△F/F0 = −10～+10 ppm、CL = 8.8 pF、ESR ≤ 40 Ω、TOPR = −20～+75 °C、パッケージ：2016（メートル法） |
| SF32K32768D71T01 | TKD | F0 = 32.768 kHz、△F/F0 = −20～+20 ppm、CL = 7 pF、ESR ≤ 70 kΩ、TOPR = −40～+85 °C、パッケージ：3215（メートル法） |

</div>

48 MHzと32.768 kHzの水晶振動子はチップの近くに配置し、マッチングコンデンサー用のフットプリントを確保してください。また、水晶配線にBUCK、RF、ディスプレイ、モーター、充電回路からのノイズが結合しないよう配慮してください。

### 5.4. RF { #54-rf }

SF32LB56xUとSF32LB56xVのいずれも、RF経路は50Ωの特性インピーダンスで配線してください。選定したアンテナが整合済みであれば、通常は追加のRF部品は不要です。ただし、不要波のフィルタリングや最終的なアンテナ調整に備え、π型マッチング回路を実装できる領域を確保してください。

RFマッチング回路はアンテナ側ではなくチップ側の近くに配置します。AVDD_BRFのフィルターはチップピンの近くに置き、コンデンサーのグラウンドはメイングラウンドに直接接続してください。可能な限りRF配線は表層に引き回し、ビアや急な屈曲を避けます。RF配線の両側にはグラウンドシールド用ビアを密に配置し、DC-DC、VBAT、水晶振動子、高速クロック、I2C、SPI、SDIO、I2S、UARTの各信号をRF領域から離してください。

### 5.5. ディスプレイ、タッチ、バックライトのインターフェース { #55-display-touch-and-backlight-interfaces }

ディスプレイインターフェースの選択は、パッケージを選ぶ段階で決めてください。UバリアントではSPI/QSPIとJDIのディスプレイ構成が示され、VバリアントではMCU8080とDPIの構成も示されています。タッチ割り込み、リセット、バックライト制御の信号は、ウェイクアップと量産時のアクセスを考慮して割り当ててください。

<div align="center"><em>表 5.5-1: ディスプレイドライバーの例</em></div>

<div align="center" markdown>

| 型番 | メーカー | 解像度 | 種類 | インターフェース |
| :--- | :--- | :--- | :--- | :--- |
| RM69090 | Raydium | 368*448 | AMOLED | 3線SPI、4線SPI、デュアルデータSPI、クアッドデータSPI、MIPI-DSI |
| RM69330 | Raydium | 454*454 | AMOLED | 3線SPI、4線SPI、デュアルデータSPI、クアッドデータSPI、8-bit 8080系MCU、MIPI-DSI |
| ILI8688E | ILITEK | 368*448 | AMOLED | クアッドデータSPI、MIPI-DSI |
| SH8601A | Shine World Technology | 454*454 | AMOLED | 3線SPI、4線SPI、デュアルデータSPI、クアッドデータSPI、8-bit 8080系MCU、MIPI-DSI |
| SPD2012 | Solomon | 356*400 | TFT | クアッドデータSPI |
| GC9C01 | Galaxycore | 360*360 | TFT | クアッドデータSPI |
| ST77903 | Sitronix | 400*400 | TFT | クアッドデータSPI |

</div>

<div align="center"><em>表 5.5-2: SF32LB56xUのSPI/QSPIディスプレイインターフェース</em></div>

<div align="center" markdown>

| SPI信号 | SF32LB56xUピン | SS6700Aピン | 詳細 |
| :--- | :--- | :--- | :--- |
| CSX | PA36 | PA36 | イネーブル信号 |
| WRX_SCL | PA37 | PA37 | クロック信号 |
| DCX | PA39 | PA39 | 4線SPIモードではデータ／コマンド信号、Quad-SPIモードではデータ1 |
| SDI_RDX | PA38 | PA38 | 3/4線SPIモードではデータ入力、Quad-SPIモードではデータ0 |
| SDO | PA38 | PA38 | 3/4線SPIモードではデータ出力。SDI_RDXと短絡してください。 |
| D0 | PA40 | PA40 | Quad-SPIモードのデータ2 |
| D1 | PA41 | PA41 | Quad-SPIモードのデータ3 |
| REST | PA05 | PB04 | ディスプレイパネルのリセット信号 |
| TE | PA33 | PA33 | MCUのフレーム同期に使うTearing Effect信号 |

</div>

<div align="center"><em>表 5.5-3: SF32LB56xUのJDIディスプレイインターフェース</em></div>

<div align="center" markdown>

| JDI信号 | ピン | 詳細 |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | チップセレクト信号 |
| JDI_SCLK | PA41 | シリアルクロック信号 |
| JDI_SO | PA40 | シリアルデータ出力信号 |
| JDI_DISP | PA36 | ディスプレイON/OFF切り替え信号 |
| JDI_EXTCOMIN | PA38 | COM反転極性入力 |

</div>

<div align="center"><em>表 5.5-4: SF32LB56xUのタッチ／バックライトインターフェース</em></div>

<div align="center" markdown>

| タッチ／バックライト信号 | ピン | 詳細 |
| :--- | :--- | :--- |
| 割り込み | PA50 | タッチ状態割り込み信号（ウェイクアップ対応） |
| I2C1_SCL | PA48 | タッチ用I2Cクロック信号 |
| I2C1_SDA | PA49 | タッチ用I2Cデータ信号 |
| BL_PWM | PA31 | バックライトPWM制御信号 |
| リセット | PB18 | タッチリセット信号 |

</div>

<div align="center"><em>表 5.5-5: SF32LB56xVのSPI/QSPIディスプレイインターフェース</em></div>

<div align="center" markdown>

| SPI信号 | I/O | 詳細 |
| :--- | :--- | :--- |
| CSX | PA36 | イネーブル信号 |
| WRX_SCL | PA37 | クロック信号 |
| DCX | PA39 | 4線SPIモードではデータ／コマンド信号、Quad-SPIモードではデータ1 |
| SDI_RDX | PA38 | 3/4線SPIモードではデータ入力、Quad-SPIモードではデータ0 |
| SDO | PA38 | 3/4線SPIモードではデータ出力。SDI_RDXと短絡してください。 |
| D[0] | PA40 | Quad-SPIモードのデータ2 |
| D[1] | PA41 | Quad-SPIモードのデータ3 |
| REST | PA43 | ディスプレイのリセット信号 |
| TE | PA33 | MCUのフレーム同期に使うTearing Effect信号 |

</div>

<div align="center"><em>表 5.5-6: SF32LB56xVのMCU8080ディスプレイインターフェース</em></div>

<div align="center" markdown>

| MCU8080信号 | I/O | 詳細 |
| :--- | :--- | :--- |
| CSX | PA36 | チップセレクト |
| WRX | PA37 | データ書き込み用ストローブ信号 |
| DCX | PA39 | ディスプレイデータ／コマンドの選択 |
| RDX | PA38 | 読み出しストローブ信号（データ書き込み用） |
| D[0] | PA40 | データ0 |
| D[1] | PA41 | データ1 |
| D[2] | PA28 | データ2 |
| D[3] | PA29 | データ3 |
| D[4] | PA30 | データ4 |
| D[5] | PA31 | データ5 |
| D[6] | PA32 | データ6 |
| D[7] | PA34 | データ7 |
| REST | PA43 | リセット |
| TE | PA33 | MCUのフレーム同期に使うTearing Effect信号 |

</div>

<div align="center"><em>表 5.5-7: SF32LB56xVのDPIディスプレイインターフェース</em></div>

<div align="center" markdown>

| DPI信号 | I/O | 詳細 |
| :--- | :--- | :--- |
| CLK | PA45 | クロック信号 |
| DE | PA47 | データイネーブル信号 |
| HSYNC | PA44 | 水平同期信号 |
| VSYNC | PA42 | 垂直同期信号 |
| SD | PA50 | ディスプレイのシャットダウン制御 |
| CM | PA51 | 通常カラーと低減カラーの各モードを切り替え |
| R0 | PA14 | ピクセル信号 |
| R1 | PA13 | ピクセル信号 |
| R2 | PA16 | ピクセル信号 |
| R3 | PA24 | ピクセル信号 |
| R4 | PA19 | ピクセル信号 |
| R5 | PA21 | ピクセル信号 |
| R6 | PA23 | ピクセル信号 |
| R7 | PA25 | ピクセル信号 |
| G0 | PA28 | ピクセル信号 |
| G1 | PA30 | ピクセル信号 |
| G2 | PA32 | ピクセル信号 |
| G3 | PA33 | ピクセル信号 |
| G4 | PA34 | ピクセル信号 |
| G5 | PA29 | ピクセル信号 |
| G6 | PA31 | ピクセル信号 |
| G7 | PA35 | ピクセル信号 |
| B0 | PA36 | ピクセル信号 |
| B1 | PA37 | ピクセル信号 |
| B2 | PA38 | ピクセル信号 |
| B3 | PA43 | ピクセル信号 |
| B4 | PA41 | ピクセル信号 |
| B5 | PA39 | ピクセル信号 |
| B6 | PA40 | ピクセル信号 |
| B7 | PA46 | ピクセル信号 |

</div>

<div align="center"><em>表 5.5-8: SF32LB56xVのJDIパラレルディスプレイインターフェース</em></div>

<div align="center" markdown>

| JDI信号 | I/O | 詳細 |
| :--- | :--- | :--- |
| JDI_VCK | PA41 | 垂直ドライバーのシフトクロック |
| JDI_VST | PA40 | 垂直ドライバーの開始信号 |
| JDI_XRST | PA39 | 水平／垂直ドライバーのリセット信号 |
| JDI_HCK | PA36 | 水平ドライバーのシフトクロック |
| JDI_HST | PA38 | 水平ドライバーの開始信号 |
| JDI_ENB | PA43 | ピクセルメモリーの書き込みイネーブル信号 |
| JDI_R1 | PA29 | 赤画像データ（奇数ピクセル） |
| JDI_R2 | PA31 | 赤画像データ（偶数ピクセル） |
| JDI_G1 | PA34 | 緑画像データ（奇数ピクセル） |
| JDI_G2 | PA32 | 緑画像データ（偶数ピクセル） |
| JDI_B1 | PA30 | 青画像データ（奇数ピクセル） |
| JDI_B2 | PA28 | 青画像データ（偶数ピクセル） |
| JDI_XFRP | PBR1 | 液晶駆動信号（「オン」ピクセル） |
| JDI_VCOM/FRP | PBR2 | 共通電極駆動信号／液晶駆動信号（「オフ」ピクセル） |

</div>

<div align="center"><em>表 5.5-9: SF32LB56xVのJDIシリアルディスプレイインターフェース</em></div>

<div align="center" markdown>

| JDI信号 | ピン | 詳細 |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | チップセレクト信号 |
| JDI_SCLK | PA41 | シリアルクロック信号 |
| JDI_SO | PA40 | シリアルデータ出力信号 |
| JDI_DISP | PA36 | ディスプレイON/OFF切り替え信号 |
| JDI_EXTCOMIN | PA38 | COM反転極性入力 |

</div>

<div align="center"><em>表 5.5-10: SF32LB56xVのタッチ／バックライトインターフェース</em></div>

<div align="center" markdown>

| タッチ／バックライト信号 | ピン | 詳細 |
| :--- | :--- | :--- |
| 割り込み | PA50 | タッチ状態割り込み信号（ウェイクアップ対応） |
| I2C1_SCL | PA48 | タッチ用I2Cクロック信号 |
| I2C1_SDA | PA49 | タッチ用I2Cデータ信号 |
| BL_PWM | PA35 | バックライトPWM制御信号 |
| リセット | PA44 | タッチリセット信号 |

</div>

### 5.6. ストレージ、センサー、オーディオ、接続機能 { #56-storage-sensors-audio-and-connectivity }

ストレージバスとディスプレイバスは、どちらも重要なGPIO群を使用し、PCBの層構成にも影響するため、個別に割り当てないでください。回路図を確定する前に、起動用ストレージの種類、プルアップ、電圧ドメイン、電源スイッチの動作、製造治具からのアクセスを確認してください。

<div align="center"><em>表 5.6-1: SF32LB56xUのQSPI Flashインターフェース</em></div>

<div align="center" markdown>

| Flash信号 | I/O信号 | 詳細 |
| :--- | :--- | :--- |
| CS# | PA06 | チップセレクト、アクティブLow。 |
| SO | PA07 | データ入力（データ入出力1） |
| WP# | PA08 | 書き込み保護出力（データ入出力2） |
| SI | PA09 | データ出力（データ入出力0） |
| SCLK | PA10 | シリアルクロック出力 |
| Hold# | PA11 | データ出力（データ入出力3） |

</div>

<div align="center"><em>表 5.6-2: SF32LB56xUのSDIO Flashインターフェース</em></div>

<div align="center" markdown>

| Flash信号 | I/O信号 | 詳細 |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | コマンド信号 |
| SD2_D1 | PA11 | データ1 |
| SD2_D0 | PA10 | データ0 |
| SD2_CLK | PA08 | クロック信号 |
| SD2_D2 | PA06 | データ2 |
| SD2_D3 | PA07 | データ3 |

</div>

<div align="center"><em>表 5.6-3: SF32LB56xVのQSPI Flashインターフェース</em></div>

<div align="center" markdown>

| Flash信号 | I/O信号 | 詳細 |
| :--- | :--- | :--- |
| CS# | PA06 | チップセレクト、アクティブLow。 |
| SO | PA07 | データ入力（データ入出力1） |
| WP# | PA08 | 書き込み保護出力（データ入出力2） |
| SI | PA09 | データ出力（データ入出力0） |
| SCLK | PA10 | シリアルクロック出力 |
| Hold# | PA11 | データ出力（データ入出力3） |

</div>

<div align="center"><em>表 5.6-4: SF32LB56xVのSDIO Flashインターフェース</em></div>

<div align="center" markdown>

| Flash信号 | I/O信号 | 詳細 |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | コマンド信号 |
| SD2_D1 | PA11 | データ1 |
| SD2_D0 | PA10 | データ0 |
| SD2_CLK | PA08 | クロック信号 |
| SD2_D2 | PA06 | データ2 |
| SD2_D3 | PA07 | データ3 |

</div>

<div align="center"><em>表 5.6-5: SF32LB56xVのeMMCインターフェース</em></div>

<div align="center" markdown>

| eMMC信号 | I/O信号 | 詳細 |
| :--- | :--- | :--- |
| SD1_CMD | PA27 | コマンド信号 |
| SD1_CLK | PA26 | クロック信号 |
| SD1_D0 | PA22 | データ0 |
| SD1_D1 | PA15 | データ1 |
| SD1_D2 | PA12 | データ6 |
| SD1_D3 | PA20 | データ3 |
| SD1_D4 | PA21 | データ4 |
| SD1_D5 | PA19 | データ5 |
| SD1_D6 | PA13 | データ6 |
| SD1_D7 | PA14 | データ7 |

</div>

!!! warning "SF32LB56xVのSD1データ線マッピングを確認してください"
    SiFliの原資料ではPA12をSD1_D2としながら`Data 6`と説明しています。同じ表ではSD1_D6も`Data 6`と記載され、`Data 2`の行がありません。配線前に公開済みのpin-mux資料で実際の信号割り当てを確認してください。本ガイドではSiFliが公開した表記を維持しています。

<div align="center"><em>表 5.6-6: センサー用I2Cインターフェース</em></div>

<div align="center" markdown>

| I2C信号 | I/O | 詳細 |
| :--- | :--- | :--- |
| SDA | PA18 | 光追跡センサー用I2Cデータ信号 |
| SCL | PA17 | 光追跡センサー用I2Cクロック信号 |

</div>

接続するメモリーのロジック電圧に合わせてストレージI/O電源を設定します。UバリアントのストレージI/OにはVDDIO3、VバリアントにはVDDIOA2を使用します。SPI NAND FlashのHold#端子は、10 kΩ抵抗で電源へプルアップしてください。SD1/eMMCはVバリアントのみで使用できます。UバリアントはSD2ストレージインターフェースを使用するため、VバリアントのSD1/eMMC端子表を適用しないでください。

<div align="center"><em>表 5.6-7: SF32LB56xUのオーディオインターフェース</em></div>

<div align="center" markdown>

| オーディオ信号 | I/O | 詳細 |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | 差動入力Pまたはシングルエンド・アナログマイク入力 |
| AU_ADC1N | ADCN | 差動アナログマイク入力NまたはGND |
| AU_DAC1P | DACP | 差動アナログ出力P |
| AU_DAC1N | DACN | 差動アナログ出力N |

</div>

<div align="center"><em>表 5.6-8: SF32LB56xVのオーディオインターフェース</em></div>

<div align="center" markdown>

| オーディオ信号 | I/O | 詳細 |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | 差動入力Pまたはシングルエンド・アナログマイク入力 |
| AU_ADC1N | ADCN | 差動アナログマイク入力NまたはGND |
| AU_DAC1P | DACP | 差動アナログ出力P |
| AU_DAC1N | DACN | 差動アナログ出力N |
| I2S1_LRCK | PA71 | I2S2フレームクロック |
| I2S1_SDI | PA69 | I2S2データ入力 |
| I2S1_SDO | PA64 | I2S2データ出力 |
| I2S1_BCK | PA73 | I2S2ビットクロック |

</div>

!!! warning "VバリアントのI2Sインスタンスを確認してください"
    SiFliのピン表と回路図のネット名ではI2S1_LRCK/SDI/SDO/BCKと示されていますが、表の説明ではI2S2信号とされています。この資料だけでは周辺機能のインスタンスを確定できないため、ピンを割り当てる前に公開済みのpin-mux資料で確認してください。

外付け差動アナログマイクでは、ADC入力に2.2 µF以上のDCカットコンデンサーを配置し、マイクにはMIC_BIASから給電します。UバリアントのMEMSマイク参考回路では、MIC_BIASを1 kΩ経由で供給し、4.7 µFのバイパスコンデンサーを追加しています。マイク出力回路には0.01 µFの結合コンデンサーも示されています。UバリアントのアナログPA参考回路では、33 nFの入力結合コンデンサーを使用し、差動ローパスフィルターをチップの近くに配置します。アナログDAC出力はガード付き差動ペアとして配線し、寄生容量を10 pF未満、配線長を2 cm未満に抑えます。VバリアントはI2Sも備え、参考回路のI2SアンプはI2C3経由で設定します。オーディオ電源および基準電圧のコンデンサーは各端子の近くに配置し、アナログ音声をスイッチング電源や高速デジタル信号から離してください。

両バリアントは振動モーター用PWMに対応します。起動電流でシステムが不安定にならない場合、モーターをVBATから直接給電できます。`BSP_PM_FREQ_SCALING`を`1`として定義すると、HCPUの周波数スケーリングに伴ってPAピンのPWM周波数も変化します。この場合はPBピンを使用してください。PB32はアクティブHighの電源／リセット入力で、10秒以上の長押しによりリセットします。Uバリアントの参考回路では、VDDIOBから1 kΩを介してキーへ接続し、10 kΩプルダウンとGNDへの0.1 µFコンデンサーを追加します。VバリアントではVDD_1V8から1 kΩを介して接続し、10 kΩでプルダウンします。その他のボタンとロータリーエンコーダーにはプルアップが必要です。回転後にオフ状態へ戻らない機械式エンコーダーは、漏れ電流を防ぐため、Standby中にプルアップ電源を停止できるようにしてください。

UバリアントはPBR0～PBR2、VバリアントはPBR0～PBR3を備えます。起動時にPBR0はLowからHighへ遷移し、外部ロードスイッチの制御に使用できます。他のPBR端子は既定でLowです。PBR端子はStandby/Hibernate中も出力でき、LPTIM信号を出力できます。PBR0以外は32 kHzクロックも出力できます。PBR端子はウェイクアップ入力にも設定できますが、ウェイクアップ後にMCUはその入力から割り込みを受け取れません。センサーのI2C、SPI、制御、割り込みウェイクアップにはLCPU側PB端子を優先してください。センサー電源はSF30147CのLVSWまたはLDO出力で必要に応じてスイッチできます。

U/VともにすべてのPA端子をUART、I2C、GPTIMへ多重化できます。UバリアントではPB32/PB33/PB34およびPBR0/PBR1/PBR2、VバリアントではPB32～PB36およびPBR0～PBR3が例外です。ウェイクアップ、ボタン、PBRの割り当てと併せて確認してください。

### 5.7. 製造 { #57-manufacturing }

デバッグ／書き込み用アクセス、量産書き込みモード、水晶振動子の校正用アクセス、電源測定ポイント、RF試験用アクセス、PMIC制御状態の確認手段を確保してください。治具から基板に給電し、起動／ダウンロードモードを強制し、チップと通信して校正データを取得できることを確認します。

最低限、量産用テストポイントとしてVBAT、GND、UバリアントのVDDIO2（VバリアントではVDDIOB）、Mode、SWDIO、SWCLK、UART4_RXD、UART4_TXD、およびPB20/PB21/PB25のいずれかを確保してください。J-Linkを接続する場合、デバッガーの電源設定を外部入力にし、ターゲット基板から給電します。量産書き込み・水晶校正治具からこれらの点にアクセスできるようにしてください。

<div align="center"><em>表 5.7-1: SF32LB56xUのデバッグ／書き込みインターフェース</em></div>

<div align="center" markdown>

| 信号 | ピン | 詳細 |
| :--- | :--- | :--- |
| SWCLK | PB15 | J-Linkのクロック信号、デバッグインターフェース |
| SWDIO | PB13 | J-Linkのデータ信号、デバッグインターフェース |
| UART4_RXD | PB16 | UART受信信号、ダウンロード／ログ出力インターフェース |
| UART4_TXD | PB17 | UART送信信号、ダウンロード／ログ出力インターフェース |

</div>

<div align="center"><em>表 5.7-2: SF32LB56xVのデバッグ／書き込みインターフェース</em></div>

<div align="center" markdown>

| 信号 | ピン | 詳細 |
| :--- | :--- | :--- |
| SWCLK | PB15 | J-Linkのクロック信号、デバッグインターフェース |
| SWDIO | PB13 | J-Linkのデータ信号、デバッグインターフェース |
| UART4_RXD | PB16 | UART受信信号、ダウンロード／ログ出力インターフェース |
| UART4_TXD | PB17 | UART送信信号、ダウンロード／ログ出力インターフェース |

</div>
