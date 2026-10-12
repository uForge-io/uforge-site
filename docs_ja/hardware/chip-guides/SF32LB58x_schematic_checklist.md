---
icon: lucide/list-checks
description: "SF32LB58x MCUの電源、クロック、RF、ストレージ、ディスプレイ、製造に関する回路図レビュー用チェックリスト。"
tags:
    - ハードウェア
    - チップ
    - チェックリスト
hide:
    - navigation
---

# SF32LB58xハードウェア設計ガイド — 回路図チェックリスト { #sf32lb58x-hardware-design-guide-schematic-checklist }

!!! note "SF32LB58xハードウェア設計ガイドの一部"
    このページでは、第5.8節の回路図チェックリストを項目ごとに説明します。[回路図設計ガイドライン](SF32LB58x_schematic_design.md)に戻ります。

## 5.8. 回路図チェックリスト { #58-schematic-checklist }

以下の各表は、回路図の機能ブロックごとに確認項目をまとめたものです。各項目に記載された条件に基づいて適用範囲を判断してください。「必須」項目は条件を満たす場合に必ず確認し、「任意」項目は該当する機能や設計を採用する場合に確認してください。

### 5.8.1. パッケージ { #581-package }

<div align="center"><em>表 5.8.1-1: パッケージのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | 選定した製品型番のパッケージが正しく、ピン名とピン番号が一致している | 必須 |

</div>

### 5.8.2. 電源 { #582-power-supply }

<div align="center"><em>表 5.8.2-1: 電源のチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | PVDD1の電源電圧が1.8 V～3.3 Vである | 必須 |
| 2 | PVDD2の電源電圧が1.8 V～3.3 Vである | 必須 |
| 3 | BUCK1_LXおよびBUCK1_FBの接続が正しい | 必須 |
| 4 | BUCK2_LXおよびBUCK2_FBの接続が正しい | 必須 |
| 5 | LDO_VOUT1出力にテストポイントを設けるか、電圧測定に便利なフィルターコンデンサを使用する | 必須 |
| 6 | VDD_RET出力にテストポイントを設けるか、電圧測定に便利なフィルターコンデンサを使用する | 必須 |
| 7 | VDD_RTC出力にテストポイントを設けるか、電圧測定に便利なフィルターコンデンサを使用する | 必須 |
| 8 | VDDIOAの電源電圧が1.8 V～3.3 Vである。初回基板リビジョンでは0 Ωの直列抵抗を実装できるようにする | 必須 |
| 9 | VDDIOA2の電源電圧が1.8 V～3.3 Vである。初回基板リビジョンでは0 Ωの直列抵抗を実装できるようにする | 必須 |
| 10 | VDDIOBの電源電圧が1.8 V～3.3 Vである。初回基板リビジョンでは0 Ωの直列抵抗を実装できるようにする | 必須 |
| 11 | VDDIOSAの電源電圧が1.8 Vであり、電源を遮断できるようロードスイッチを設ける | 必須 |
| 12 | VDDIOSBの電源電圧が1.8 Vであり、電源を遮断できるようロードスイッチを設ける | 必須 |
| 13 | VDDIOSCの電源電圧が1.8 Vであり、常時給電する | 必須 |
| 14 | AVDD33_USBの電源電圧が3.3 Vである | 必須 |
| 15 | AVDD33_ANAの電源電圧が3.3 Vである | 必須 |
| 16 | AVDD_BRFの電源電圧が1.8 V～3.3 Vであり、VDD1電源と一致している | 必須 |
| 17 | AVDD33_AUDの電源電圧が3.3 Vである | 必須 |
| 18 | AVDD18_DSIの電源電圧が1.8 Vである | 必須 |
| 19 | SF30147Cから給電する場合、TWI制御インターフェースにMCUのPBピンを使用し、そのピンをPDピンとする | 必須 |
| 20 | バッテリー電圧が低すぎる場合でも、充電器の5 V入力からシステムに給電できるよう、充電回路にパス管理機能を設ける | 必須 |
| 21 | SF30147Cから給電する場合、チップ専用のTWI制御インターフェースを使用する | 必須 |
| 22 | SF30147Cから給電する場合、ENで制御する電源レールのEN電源ドメインにはPVDDまたはAVDDを使用し、MCU GPIOからENを制御しない。代わりにENをGNDへ接続し、レジスターで対応する電源出力を制御してもよい | 必須 |
| 23 | SF30147Cから給電する場合、<span class="flag-red">BUCKとLDO1</span>はそれぞれのイネーブル信号EN_BUCKおよびEN_LDO1でのみ制御でき、内部レジスターからは制御できない | 必須 |
| 24 | 58xではPVDDとVDDIOBの電源を一致させる。PVDDがVDDIOBより低い場合（例：VDDIOB = 3.3 V、PVDD = 1.8 V）、StandbyおよびHibernate時にVDDIOBで約15 µAのリーク電流が発生する | 必須 |
| 25 | 58xではB4ピンがVDD_EXT1、B5ピンがVDD_EXT2であり、設計上は未接続としてよい | 必須 |

</div>

!!! note "出典の補足説明"
    ワークブックの電源チェックリスト項目19では、TWI制御インターフェースにMCUのPBピンを使用し、そのピンを「PDピン」とするよう求めています。一方、項目21ではチップ専用のTWI制御インターフェースを使用するよう求めています。ワークブックは「PD」の意味や、これらの要件の関係を説明していません。OpenSiFliのハードウェアアプリケーションノートには、SF32LB58xが2本のGPIOでTWI信号をエミュレートしてSF30147Cを制御すると記載されています。回路図を確定する前に、使用するインターフェースとピンをSiFliに確認してください。

### 5.8.3. 電源コンデンサとインダクタ { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>表 5.8.3-1: 電源コンデンサとインダクタのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | PVDD1のバルクコンデンサが10 µF以上である | 必須 |
| 2 | PVDD2のコンデンサが10 µF以上である | 必須 |
| 3 | BUCK1_FBのコンデンサが4.7 µFである | 必須 |
| 4 | BUCK2_FBのコンデンサが4.7 µFである | 必須 |
| 5 | LDO_VOUT1のコンデンサが4.7 µFである | 必須 |
| 6 | VDD_RETのコンデンサが0.47 µFである | 必須 |
| 7 | VDD_RTCのコンデンサが1 µFである | 必須 |
| 8 | VDDIOAのコンデンサが1 µF以上である | 必須 |
| 9 | VDDIOA2のコンデンサが1 µF以上である | 必須 |
| 10 | VDDIOBのコンデンサが1 µF以上である | 必須 |
| 11 | VDDIOSAのコンデンサが1 µF以上である | 必須 |
| 12 | VDDIOSBのコンデンサが1 µF以上である | 必須 |
| 13 | VDDIOSCのコンデンサが1 µF以上である | 必須 |
| 14 | AVDD33_USBのコンデンサが1 µF以上である | 必須 |
| 15 | AVDD33_ANAのコンデンサが4.7 µF以上である | 必須 |
| 16 | AVDD_BRFのコンデンサが4.7 µF以上である | 必須 |
| 17 | AVDD33_AUDのコンデンサが4.7 µF以上である | 必須 |
| 18 | AUD_VREFのコンデンサが1 µFである | 必須 |
| 19 | AVDD18_DSIのコンデンサが4.7 µF以上である | 必須 |
| 20 | MIC_BIASのコンデンサが1 µFである | 必須 |
| 21 | GPADC VREFPのコンデンサが4.7 µFである | 必須 |
| 22 | <span class="flag-red">PVDD1、PVDD2、AVDD_BRF、およびRSTNのプルアップ電源を同じ電源にする</span> | 必須 |
| 23 | BUCK1およびBUCK2のインダクタがSiFli推奨の品番である | 必須 |
| 24 | BUCKインダクタがSiFli推奨品でない場合、L = 4.7 µH、DCR ≤ 0.4 Ω、Isat ≥ 450 mAを満たす | 必須 |
| 25 | <span class="flag-red">VBATからPVDD1およびPVDD2へ1.8 Vを供給する場合、DCDCコンバーターで1.8 Vを生成し、LDOは使用しない</span> | 必須 |
| 26 | <span class="flag-red">選定したDCDCの静止電流を記録し、プロジェクト要件を満たすことを確認する</span> | 必須 |
| 27 | <span class="flag-red">選定したLDOの静止電流を記録し、プロジェクト要件を満たすことを確認する</span> | 必須 |

</div>

!!! note "BUCKインダクターの飽和電流に関する差異"
    ワークブックの「電源コンデンサとインダクタ」チェックリスト項目24では、AVL非掲載のインダクターについてIsat ≥ 450 mAとしています。一方、OpenSiFliのハードウェアアプリケーションノートでは、L = 4.7 µH、DCR ≤ 0.4 ΩのBUCKインダクターにIsat ≥ 500 mAを指定しています。表にはワークブックの450 mAを残し、[回路図設計のBUCKインダクター選定ガイダンス](SF32LB58x_schematic_design.md#5114-buck-inductor-selection)では500 mAを採用しています。SiFliから明確な説明が得られるまでは、Isatが500 mA以上のインダクターを使用してください。

### 5.8.4. クロック { #584-clock }

<div align="center"><em>表 5.8.4-1: クロックのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | メイン48 MHz水晶振動子がAVL掲載品である | 必須 |
| 2 | 48 MHz水晶振動子がAVL掲載品でない場合、7 pF ≤ CL ≤ 12 pF（8.8 pF推奨）、周波数偏差≤±10 ppm、ESR ≤30 Ω（22 Ω推奨）を満たす | 必須 |
| 3 | RTC用32.768 kHz水晶振動子がAVL掲載品である | 必須 |
| 4 | 32.768 kHz水晶振動子がAVL掲載品でない場合、CL ≤12.5 pF（7 pF推奨）、周波数偏差≤±20 ppm、ESR ≤80 kΩ（38 kΩ推奨）を満たす | 必須 |

</div>

### 5.8.5. リセット { #585-reset }

<div align="center"><em>表 5.8.5-1: リセットのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | RSTNをPVDD1と同じ電源へプルアップする | 必須 |
| 2 | RSTNとGND間に0.1 µFのコンデンサを実装できるようにする | 必須 |
| 3 | RSTNにESD保護を設ける | 必須 |

</div>

### 5.8.6. グラウンド信号 { #586-ground-signals }

<div align="center"><em>表 5.8.6-1: グラウンド信号のチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | すべてのAVSS_***信号をGNDに接続する | 必須 |
| 2 | すべてのVSS信号をGNDに接続する | 必須 |

</div>

### 5.8.7. ブートモード { #587-boot-mode }

<div align="center"><em>表 5.8.7-1: ブートモードのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | MODEには内部プルダウンがある。VDDIOAへの10 kΩプルアップを設け、プログラム書き込み時にMODEをHighにする | 必須 |
| 2 | <span class="flag-red">MODE信号にテストポイントを設け、量産書き込み治具まで引き出す</span> | 必須 |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>表 5.8.8-1: RFのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | ANT信号にシングルエンド50 Ωの特性インピーダンス要件を注記する | 必須 |
| 2 | ANT信号にπ型マッチング回路を設ける。並列側にNC（未実装）コンデンサ、直列側に15 pFコンデンサを配置する | 必須 |
| 3 | スプリアス放射のフィルタリングが必要な場合に備え、2.7 nHの直列インダクタと2 pFの並列コンデンサを含むπ型マッチング回路を設ける | 任意 |
| 4 | 外付けRF PAのRXENおよびTXENをMCUで制御する場合、PA RXENにはPB39、PA TXENにはPB40のみを使用する | 任意 |
| 5 | <span class="flag-red">Wi-Fiチップがアンテナ共存アービトレーションに対応する場合：<br>（1）3線モードを推奨する。Wi-FiチップがBluetooth／Wi-FiアンテナのRFスイッチを制御し、アービトレーションを行う。BluetoothのBT_ACTIVEとBT_PRIORITYを使ってBluetoothへのアンテナ使用許可を判断し、WLAN_ACTIVEによりWi-Fi動作中のBluetooth送受信を無効にできる。<br>（2）BT_ACTIVEにはPB08またはPB45、WLAN_ACTIVEにはPB09またはPB41を使用する。BT_PRIORITYには任意のPB GPIOを使用できる。</span> | 任意 |
| 6 | Wi-Fiチップがアンテナ共存アービトレーションに対応しない場合：<br>（1）1線モードを推奨する。BluetoothがBluetooth／Wi-FiアンテナのRFスイッチを制御し、BT_ACTIVEでアービトレーションを行ってWi-Fiチップに通知する。<br>（2）Wi-Fiチップが動作状態信号を出力できる場合は、2線モードに拡張できる。Wi-Fi出力をWLAN_ACTIVEに接続すると、Wi-Fi動作中にBluetoothの低優先度送受信を抑止でき、Wi-Fiアイドル時のBluetooth動作には影響しない。<br>（3）BT_ACTIVEにはPB08またはPB45、WLAN_ACTIVEにはPB09またはPB41を使用する | 任意 |

</div>

### 5.8.9. I/Oリソース割り当て { #589-io-resource-allocation }

<div align="center"><em>表 5.8.9-1: I/Oリソース割り当てのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | 回路図と一致するGPIOリソース割り当て表を用意する | 必須 |
| 2 | リソース表のGPIO割り当てが回路図と一致している | 必須 |
| 3 | 実際のGPIO割り当てがSiFliの推奨に従っている（EVBのI/O設定ファイルを参照） | 必須 |

</div>

### 5.8.10. ハードウェアウェイクアップ { #5810-hardware-wake-up }

<div align="center"><em>表 5.8.10-1: ハードウェアウェイクアップのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | <span class="flag-red">HCPUのウェイクアップ割り込みソースが正しい：PA64、PA65、PA66、PA67、PA68、PA69の計6ピン</span> | 必須 |
| 2 | <span class="flag-red">LCPUのウェイクアップ割り込みソースが正しい：PB54、PB55、PB56、PB57、PB58、PB59、PBR0、PBR1、PBR2、PBR3の計10ピン。MCU復帰後、PBR0～PBR3では割り込み信号を受信できない</span> | 必須 |
| 3 | <span class="flag-red">Gセンサーや心拍センサーなど、LCPU側周辺デバイスの割り込み信号と制御信号はPB GPIOに接続する</span> | 必須 |

</div>

### 5.8.11. ストレージ { #5811-storage }

<div align="center"><em>表 5.8.11-1: ストレージのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | MPI3にNOR FlashまたはSPI NAND Flashを意図したとおりに接続する | 必須 |
| 2 | VDDIOSCに常時給電する | 必須 |
| 3 | VDDIOSAおよびVDDIOSBの電源をPBR0で有効化する | 必須 |
| 4 | 外付けNOR FlashまたはSPI NAND FlashにはMPI3またはMPI4を使用できる | 必須 |
| 5 | SPI NAND FlashのHOLD#ピンを10 kΩの抵抗でSPI NAND Flashの電源にプルアップする | 必須 |
| 6 | 量産時にMPI3またはMPI4上の外付けFlashへ書き込む場合、書き込みツールでPA43をHighにしてMPI3電源を有効にする | 必須 |
| 7 | 量産時にSDIO1上のeMMCまたはSD NANDへ書き込む場合、書き込みツールで対応する電源を有効にする | 必須 |
| 8 | <span class="flag-red">PBR0／PA43で制御する電圧スイッチはHighでオン、Lowでオフとする。HibernateではPBR0でVDDIOSA／VDDIOSBを切り替え、VDDIOSCには常時給電し、PA43で外付けFlash電源を切り替える</span> | 必須 |
| 9 | SD1インターフェースにeMMCまたはSD NANDを接続する場合、信号接続が正しい | 必須 |
| 10 | eMMCまたはSD NANDのI/OインターフェースレベルがVDDIOA2と一致している | 必須 |
| 11 | MPI3またはMPI4の信号接続が正しい | 必須 |
| 12 | 周辺デバイスのI/Oロジックレベルがメインチップと一致している | 必須 |
| 13 | <span class="flag-red">NOR Flashが主要部品選定ガイドで認定されている</span> | 必須 |
| 14 | <span class="flag-red">SPI／SD NAND Flashが主要部品選定ガイドで認定されている</span> | 必須 |
| 15 | <span class="flag-red">eMMCが主要部品選定ガイドで認定されている</span> | 必須 |

</div>

<div align="center"><em>表 5.8.11-2: SiFli EVBのSPI NAND用MPI4参考接続</em></div>

<div align="center" markdown>

| SPI NAND信号 | SF32LB58xピン | 参考情報 |
|:---|:---|:---|
| CS# | PA10（SD1_CMD） | チップセレクト、Lowアクティブ |
| SO | PA04（SD1_D1） | チップへの入力データ（IO1） |
| WP# | PA01（SD1_D2） | 書き込み保護信号（IO2） |
| SI | PA05（SD1_D0） | チップからの出力データ（IO0） |
| SCLK | PA09（SD1_CLK） | シリアルクロック |
| HOLD# | PA06（SD1_D3） | IO3。10 kΩ抵抗でVDD18_MPI4にプルアップ |

</div>

EVBの参考回路図では、SPI NAND FlashのVCCをVDD18_MPI4に接続し、この電源に0.1 µFおよび1 µF（6.3 V）のコンデンサを接続しています。これらのピン割り当てと部品値はEVBの参考例です。実際の設計では、選定したチップのパッケージ、Flashのデータシート、および対象基板のピンマルチプレクス設定を確認してください。

SD1のI/O電源ドメインであるVDDIOA2は1.8 Vまたは3.3 Vに設定でき、周辺デバイスのI/Oレベルに合わせる必要があります。SiFliはSPI NAND FlashとeMMCに1.8 Vインターフェースを推奨しています。SD NANDは3.3 Vのみに対応するため、使用時はVDDIOA2を3.3 Vに設定してください。

### 5.8.12. ディスプレイ { #5812-display }

<div align="center"><em>表 5.8.12-1: ディスプレイのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | SF32LB58xのディスプレイを意図したとおりDSI + LCDC2経由で接続する | 必須 |
| 2 | DSI信号の接続が正しい | 必須 |
| 3 | <span class="flag-red">QSPI LCDのみを使用する場合は、フレームレートやRAMの問題を避けるため、HCPUのLCDC1 QSPIインターフェースを推奨します</span> | 必須 |
| 4 | DSI_REXTを10 kΩの抵抗を介してGNDに接続する | 必須 |
| 5 | LCDCのRSTB接続が正しい | 必須 |
| 6 | LCDCのTE接続が正しい（パネルのTEまたはFmark信号に接続） | 必須 |
| 7 | TP信号が推奨ピン割り当てに従っている（EVBのI/O設定ファイルを参照） | 必須 |
| 8 | LCDインターフェースがMIPI-DSI、3線／4線SPI、デュアル／クアッドデータSPI、DBI 8080、DPI、パラレル／シリアルJDIに対応している | 必須 |
| 9 | <span class="flag-red">SPI LCDの3線モードではCSをPA44またはPB08、CLKをPA46またはPB10、DATAをPA50またはPB09に接続する。<br>4線モードではCSをPA44またはPB08、CLKをPA46またはPB10、DATAをPA50またはPB09、DCをPA48またはPB03に接続する</span> | 必須 |
| 10 | LCDにAOD対応が必要か確認する。必要な場合、QSPIパネルはHCPUに接続し、JDIパネルはLCPUに接続できる | 必須 |
| 11 | 周辺デバイスのI/Oロジックレベルがメインチップと一致している | 必須 |
| 12 | DSI LCDではDSIデータ信号とクロック信号を接続する。DSIビデオモードのパネルはRGBパネルと同様に動作し、TE信号はない。DSIコマンドモードのパネルにはTE信号があり、DSI17801ではTEが必要。TEとRSTの両方を推奨するが、最終的な使用方法は選定したLCDによる | 必須 |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>表 5.8.13-1: GPADCのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | GPADC入力を対応するピンに接続する | 任意 |
| 2 | GPADC入力範囲が適切であり、最大入力電圧がAVDD33_ANAを超えない | 任意 |
| 3 | バッテリー電圧分圧回路の推奨値：電源側に470 kΩ・1%の抵抗、GND側に1 MΩ・1%の抵抗、フィルターコンデンサに100 nFを使用する | 必須 |
| 4 | <span class="flag-red">GPADCで測定するすべての抵抗分圧信号に許容差1%の抵抗を使用する。各GPADCチャネルには100 nFのフィルターコンデンサを設け、チップのピン近くに配置する</span> | 必須 |
| 5 | <span class="flag-red">ADCで複数のボタンを検出してピン数を節約できる。たとえばPB32をADCボタンとして使用する場合、バッテリーをプルアップ電源に使用しない</span> | 必須 |

</div>

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>表 5.8.14-1: SDMADCのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | SDMADC入力を対応するピンに接続する | 任意 |
| 2 | SDMADC入力範囲が適切であり、最大入力電圧はAVDD33_ANAを超えないことが望ましい | 任意 |
| 3 | SDMADC_VREFおよびSDMADC_VSS_VREFの接続が正しい | 必須 |

</div>

### 5.8.15. ボタン { #5815-buttons }

<div align="center"><em>表 5.8.15-1: ボタンのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | ボタンにウェイクアップ機能が必要か、顧客に確認する | 必須 |
| 2 | 通常のボタン接続が正しい（プルアップの有無、抵抗値、プルアップ電源ドメインを確認） | 必須 |
| 3 | <span class="flag-red">電源ボタンにはPB54を使用し、アクティブHighとする。10秒間の長押しでリセットし、10 kΩのプルダウン抵抗をメイン基板に実装する</span> | 必須 |
| 4 | すべてのボタン信号にESD保護を設ける | 必須 |

</div>

### 5.8.16. EOS／ESD保護 { #5816-eos-and-esd-protection }

<div align="center"><em>表 5.8.16-1: EOS／ESD保護のチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | 充電インターフェースにEOS、ESD、OVP保護を設ける | 必須 |
| 2 | 充電器挿入検出信号にESD保護素子を設ける | 必須 |
| 3 | バッテリーインターフェースにESD保護素子を設ける | 必須 |
| 4 | アンテナインターフェースにESD保護素子を設ける | 必須 |
| 5 | LCDおよびTPの電源インターフェースにESD保護素子を設ける | 必須 |
| 6 | TPのI2C、RST、INTラインにESD保護素子を設ける | 必須 |
| 7 | 心拍センサーの電源インターフェースと信号ラインにESD保護素子を設ける | 必須 |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>表 5.8.17-1: I2Cのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | HCPU／LCPUの分担と、低消費電力モードで動作させる必要性を考慮してI2Cを割り当てる | 必須 |
| 2 | I2Cのプルアップ抵抗値が適切である。400 kHzで動作させる場合は2.2 kΩを推奨する。周辺デバイス側の電圧ドメインを使用し、電源オフ時は周辺デバイスとともにプルアップ電源もオフにする | 必須 |
| 3 | 必要な場合、I2C割り込み信号でハードウェアウェイクアップできる | 必須 |
| 4 | 複数のデバイスを同じI2Cバスに接続する場合、各デバイスのアドレスが重複していない | 必須 |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>表 5.8.18-1: I2Sのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | <span class="flag-red">I2S1は入力専用で、マスターモードのみで動作する。マイクを意図したとおりにI2S1へ接続する</span> | 任意 |
| 2 | <span class="flag-red">I2S2はマスターモードのみで入力と出力に対応し、外付けコーデックのDAC／ADCデバイスを接続できる</span> | 任意 |
| 3 | <span class="flag-red">I2S3はマスターモードのみで入力と出力に対応する。HCPUがスリープ中にLCPUがI2S3経由で音声を受信・処理する低消費電力用途に適する</span> | 任意 |
| 4 | I2S信号の接続が正しい | 任意 |
| 5 | <span class="flag-red">I2S1インターフェースのデジタルマイク接続が正しい</span> | 任意 |
| 6 | 周辺デバイスのI/Oロジックレベルがメインチップと一致している | 任意 |

</div>

### 5.8.19. PDMおよびアナログオーディオ { #5819-pdm-and-analog-audio }

<div align="center"><em>表 5.8.19-1: PDMおよびアナログオーディオのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | PDMデュアルマイクの接続が正しい | 任意 |
| 2 | PDMマイクにデジタル電源から給電する | 任意 |
| 3 | 周辺デバイスのI/Oロジックレベルがメインチップと一致している | 任意 |
| 4 | アナログデュアルマイクの接続が正しい | 任意 |
| 5 | アナログマイクにMIC_BIAS出力から給電する | 任意 |
| 6 | 2つのオーディオADC入力それぞれに2.2 µF以上のDCカットコンデンサを設ける | 任意 |
| 7 | DAC出力のP／N経路それぞれに1 kΩの直列抵抗を設け、両者間に1.5 nFのコンデンサを接続する | 任意 |
| 8 | 推奨オーディオアンプはAW8155。推奨品を使用する場合、ソフトウェアでMode 4／Class ABモードに設定する | 任意 |
| 9 | <span class="flag-red">オーディオPA出力をMCUのADCに入力する場合、分圧回路とRCフィルター、または追加のデジタルフィルターを設ける。分圧後の電圧をADC入力範囲内に保ち、RCフィルターのカットオフ周波数は20 kHzとする</span> | 任意 |
| 10 | <span class="flag-red">チップ内蔵のアナログオーディオADC経路を使用しない場合、ADC1P／ADC1NおよびADC2P／ADC2Nそれぞれに0 Ωの直列抵抗を介してGNDへ接続することを推奨する</span> | 任意 |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>表 5.8.20-1: SPIのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | SPIの接続が正しく、MCUと周辺デバイス間でSDOとSDIが正しく交差接続されている | 任意 |
| 2 | SPI周辺デバイスのタイミング要件を確認し、対応可能であることを確認する | 任意 |
| 3 | 周辺デバイスのI/Oロジックレベルがメインチップと一致している | 任意 |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>表 5.8.21-1: USARTのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | USART4をダウンロードおよびログ用インターフェースとして設計する | 必須 |
| 2 | <span class="flag-red">USART4にテストポイントを設ける。TXDとRXDには100 Ωの直列抵抗を推奨する</span> | 必須 |
| 3 | <span class="flag-red">USART1にテストポイントを設ける</span> | 必須 |
| 4 | HCPUで動作させるデバイスはUSART2またはUSART3に接続する | 任意 |
| 5 | LCPUで動作させるデバイスはUSART5またはUSART6に接続する | 任意 |
| 6 | 周辺デバイスを接続する際、RXDとTXDを交差接続する | 必須 |
| 7 | 周辺デバイスのI/Oロジックレベルがメインチップと一致している | 必須 |
| 8 | 未使用のUSARTテストポイントを予備用に確保する | 任意 |
| 9 | <span class="flag-red">周辺デバイス接続用UARTにはHCPUインターフェースを推奨する。HCPUソフトウェアがLCPU UARTを使用するのを避けるため</span> | 必須 |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>表 5.8.22-1: PWMのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | バックライトPWMのピン割り当てが正しい。モーターPWMとは異なるGPTIMxを使用し、バックライトがHCPU周波数低下の影響を受けないよう、PBインターフェースを推奨する | 必須 |
| 2 | モーターPWMのピン割り当てが正しい。バックライトPWMとは異なるGPTIMxを使用し、振動制御がHCPU周波数低下の影響を受けないよう、PBインターフェースを推奨する | 必須 |
| 3 | モーターPWM制御には、SMTモーター使用時にファームウェア書き込み中の異常動作を防ぐため、デフォルトで無効となるGPIOを選ぶ | 必須 |
| 4 | PWM出力が必要な信号にはPBインターフェースを使用し、コールドブート時の異常動作も確認する | 必須 |

</div>

### 5.8.23. デバッグ { #5823-debug }

<div align="center"><em>表 5.8.23-1: デバッグのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | SWD信号の接続が正しい | 必須 |
| 2 | J-Linkコネクターまたはテストポイントに、I/O電源リファレンスを正しく確保する | 必須 |
| 3 | <span class="flag-yellow">プログラム書き込み時にPVDD、VDDIO、VDDSCなどの電源に給電する。AVDD18_DSI（CAU2電源）にも給電する</span> | 必須 |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>表 5.8.24-1: USBのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | USBインターフェースの接続が正しい | 任意 |
| 2 | USBインターフェースにESD保護を設ける | 任意 |
| 3 | 通常動作中は、USBを有効にしておけばPC／デバイス側で接続と取り外しを検出できる。<br>MCUのスリープ中も接続と取り外しを検出する必要がある場合は、VBUSの抵抗分圧回路を追加し、I/O電圧と一致するHighレベルをMCUのウェイクアップピンに入力する。充電器挿入検出用のウェイクアップピンとの共用を推奨する | 任意 |

</div>

### 5.8.25. PBR { #5825-pbr }

<div align="center"><em>表 5.8.25-1: PBRのチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | 電源投入時にPBR0が0から1へ遷移し、一部の外部ロードスイッチ制御に使用できる。PBR1～PBR5はデフォルトでLow出力 | 必須 |
| 2 | PBR0～PBR5はStandbyとHibernateの両方で出力として使用できる | 任意 |
| 3 | PBR0～PBR5からLPTIM信号を出力できる | 任意 |
| 4 | <span class="flag-red">SF32LB567ではLPTIM3を推奨する。LPTIM3_OUTとLPTIM3_OUT_BARからPBRピン経由で21～25 kHzの信号を出力し、デューティ比を変えて互いに逆相にする</span> | 任意 |
| 5 | <span class="flag-red">デューティ比が異なり互いに逆相となる21～25 kHz信号は、HCPUのATIMからも出力できる。適切なATIMx_CHxおよびATIMx_CHxN信号をPin_Configとともに選び、HCPU周波数を下げた場合の影響を考慮する</span> | 任意 |
| 6 | PBR0～PBR5から32 kHzクロック信号を出力できる | 任意 |
| 7 | <span class="flag-red">PBR0～PBR3をウェイクアップ入力として設定できる。ただしMCU復帰後、PBR0～PBRxでは割り込み信号を受信できず、0／1レベルのみを検出するため、使用時は注意する</span> | 任意 |

</div>

!!! note "出典の適用範囲と技術確認"
    [出典のチェックリストワークブック](https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)のPBRチェックリスト項目4にはSF32LB567が記載されています。ただし、PBRチェックリスト項目4と5がSF32LB58x向けの推奨事項であることはワークブックから確認できません。採用する前に、SiFliへ適用可否を確認してください。

    ワークブックのストレージチェックリスト項目6では、量産時にPA43をHighにして「MPI3の電源」を有効にするとしています。一方、[公式SF32LB58xハードウェアアプリケーションノート](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md)では、PA43は外付けFlashの電源制御ピンと説明され、外付けFlashに給電するにはHighにすると記載されています。チェックリストにはワークブックの記述をそのまま残しています。量産書き込みの方法を確定する前に、実際に制御される電源レールと対象インターフェースをSiFliに確認してください。

### 5.8.26. 消費電力 { #5826-power-consumption }

<div align="center"><em>表 5.8.26-1: 消費電力のチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | 電源切り替えに使用するすべてのMOSFET、LDO、DCDCのイネーブルピンがアクティブHighの場合、1 MΩのプルダウン抵抗をGNDに接続する | 必須 |
| 2 | Hibernateモード時の基準電流要件を記録する | 必須 |
| 3 | <span class="flag-red">選択した周辺デバイスのHibernateモード時の基準電流を合計して記録し、プロジェクト要件を満たすことを確認する</span> | 必須 |
| 4 | Standbyモード時の基準電流要件を記録する | 必須 |
| 5 | <span class="flag-red">選択した周辺デバイスのStandbyモード時の基準電流を合計して記録し、プロジェクト要件を満たすことを確認する</span> | 必須 |

</div>

### 5.8.27. 書き込みと水晶振動子の校正 { #5827-download-and-crystal-calibration }

<div align="center"><em>表 5.8.27-1: 書き込みと水晶振動子校正のチェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 | 区分 |
|:---|:---|:---|
| 1 | SWD書き込み用にVBAT、GND、SWDIO、SDCLK、MODE、RSTN、VDDIOA、VDDIOBのテストポイントを確保する | 必須 |
| 2 | オフライン書き込み基板でファームウェアを書き込む場合は、VBAT、GND、UART4_TXD、UART4_RXD、MODE、RSTN、VDDIOAのテストポイントを確保する | 任意 |
| 3 | 水晶振動子の校正が必要な場合は、校正用テストポイントを確保する。PB45を推奨する | 任意 |

</div>
