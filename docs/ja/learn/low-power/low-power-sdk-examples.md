---
icon: lucide/battery-charging
title: "低消費電力SDKサンプル"
description: "スリープ、ウェイクアップ要因、GPIO、CPU、Bluetooth、ディスプレイ、UI、ウェアラブル機器の電力シナリオに適したSiFli-SDKの電源管理サンプルを選びます。"
tags:
  - 低消費電力
  - サンプル
---

# 低消費電力SDKサンプル { #low-power-sdk-examples }

SiFli-SDKの電源管理サンプルは、測定や統合の基準となるものであり、あらゆる製品に適用できる電流仕様ではありません。各サンプルは、特定のチップファミリー、ボード、電源経路、有効な周辺機器、ファームウェア設定、ワークロードを前提としています。サンプルを使って対象ハードウェア上で状態やシナリオを再現し、同じ条件で製品自体の電流と電圧を測定してください。

このページでは、[SiFli-SDKの電源管理サンプル一覧](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html)を、解決したい設計上の課題ごとに整理しています。対応ボード、電源接続、ジャンパー、SDK設定、コマンド、期待される動作については、各サンプルの公式ページを参照してください。

## 目的に合った電源管理サンプルを選ぶ { #start-with-the-right-power-example }

<div align="center"><em>表: 設計課題別SiFli-SDK電源管理サンプル</em></div>

<div align="center" markdown>

| 設計目的 | 参照するサンプル | 確認に役立つ点 | 製品で再確認する項目 |
|:-----------------|:-----------|:------------------------|:-------------------------|
| 基本的な電源管理状態への遷移とウェイクアップ動作を確認する | [電源管理サンプル (PM Example)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) | SDKの基本的な電源管理設定とスリープ/ウェイクアップの流れ | 実際のウェイクアップ要因、クロック依存関係、保持状態、各ドライバーが要求するPM状態 |
| 低消費電力時のGPIO動作を評価する | [GPIO消費電力測定 (GPIO Power Consumption Test)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gpio/README.html) | タイマーによる定期ウェイクアップ、GPIOアクセス、ウェイクアップ/スリープ/I/O動作の違い | 外付けプル抵抗、電源オフ中の周辺機器、ピン多重化、電源レール、意図しないリーク経路 |
| 演算処理とシャットダウン動作を切り分ける | [プロセッサー消費電力測定 (Processor Power Consumption Test)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/coremark/README.html) | CPUベンチマーク/ループ処理、シャットダウン、RTCウェイクアップ、ピンウェイクアップ | コア周波数、ワークロード、ウェイクアップピンの極性、ボード固有の信号割り当て、電源電圧 |
| Bluetoothシナリオを測定する | [BLEアドバタイズ／接続の消費電力測定 (BLE Broadcast and Connection Power Consumption Test)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) または [BLE/BT消費電力測定 (BLE/BT Power Consumption Test)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) | アドバタイズ、接続、Bluetooth動作を測定シナリオとして評価 | RF環境、送信出力、アドバタイズ間隔と接続間隔、相手機器の動作、アンテナ、アプリケーションのコールバック |
| AMOLEDの画面オフと常時表示ポリシーを比較する | [AMOLED消費電力測定 (AMOLED Power Consumption Test)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/AMOLED/README.html) | ディスプレイ更新、画面オフ時のスリープ、常時表示の比較 | 実際のパネル、輝度、更新ポリシー、ディスプレイ電源、実際の使用時間の割合 |
| JDIディスプレイ経路を測定する | [JDI消費電力測定 (JDI Power Consumption Test)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) | 資料に記載されたJDI構成におけるディスプレイ固有の低消費電力動作 | パネルの型番、更新領域、コントローラー設定、電源レール、更新頻度 |
| 低消費電力のグラフィカルUIを統合する | [GUI_PM低消費電力サンプルガイド (GUI_PM Low-Power Example Guide)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) | UIの動作、ディスプレイ状態、電源管理ポリシーの相互作用 | 製品における画面表示のライフサイクル、アニメーション、タッチ/コントローラーのウェイクアップ要因、差分更新領域の方針 |
| 画面更新ワークロードを評価する | [画面リフレッシュ時の消費電力測定サンプル (Power Consumption Test Example — Screen Refresh Scenario)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) | 製品ワークロードにおけるディスプレイ更新部分 | 解像度、ピクセル形式、更新領域、インターフェース速度、バッファー方式、コンテンツ更新頻度 |
| センサー起点のウェアラブル操作を構成する | [手首を上げて画面を点灯する (Raise Wrist to Light Up Screen)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/raise_wrist/README.html) | センサー起点のウェイクアップ、画面点灯中の処理、スリープ復帰 | センサーの選定、ジェスチャー判定アルゴリズム、サンプリング間隔、画面タイムアウト、バッテリーモデル、実測した1日の使用状況 |

</div>

### 対象ボードを確認する { #verify-the-board-scope }

以下では、各サンプルの公式ガイドに記載されたボードと、SiFli-SDKの現行GCCビルド設定にあるターゲットを分けて示します。ビルドマトリクスに含まれることは、そのターゲット向けのビルド設定があることを示すだけで、そのボードでガイド記載の消費電力値を実測したことを意味しません。下記の設定リンクは現在の`main`ブランチを参照しています。別のSDKリビジョンを使う場合は、そのチェックアウトにある`build_config_gcc.yaml`を確認してから`scons --board`のターゲットを選んでください。測定を再現する場合はガイド指定のハードウェア構成を使い、ドキュメントURLのチップファミリー名だけからファミリー全体の対応を推定しないでください。

- **PM Example**（[SDKソース](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/classical)）：ガイドには`sf32lb56-devkit-lcd_n16r12n1`、`eh-lb551`、`sf32lb52-lcd_n16r8`、`sf32lb58-lcd_n16r64n4`が記載されています。現行GCC設定のPMプロジェクトでは`sf32lb56-lcd_n16r12n1`（ガイドの`sf32lb56-devkit-lcd_n16r12n1`とは異なる識別子）、`eh-lb551`、`sf32lb52-lcd_n16r8`、`sf32lb58-lcd_n16r64n4`が使われ、さらに`sf32lb52-core_n16r16`も含まれます。名前の異なるターゲットを、ボード対応を確認せずに同一視しないでください。
- **GPIO Power Consumption Test**（[SDKソース](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gpio)）：ガイドと現行GCCビルド設定の両方に`sf32lb52-core_n16r16`が記載されています。
- **Processor Power Consumption Test**（[SDKソース](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/coremark)）：ガイドには`eh-lb551`、`eh-lb555`、`ec-lb583`、`ec-lb587`、`eh-lb561`、`eh-lb563`、`eh-lb523`が記載されています。現行GCCビルド設定では`default_boards`セットが使われます。現在のビルドターゲット名は[ビルド設定](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)で確認できます。ガイドのボード名と`default_boards`内のターゲット名は一対一で対応していません。名前から推測せず、使用するSDKリビジョンでボードの対応関係を確認してください。また、ビルド対象の範囲は、ガイドの消費電力測定がセット内の全ボードを対象としていることを意味しません。
- **BLE Broadcast and Connection Power Consumption Test**（[SDKソース](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/ble)）：ガイドに記載されたボード名は`eh-lb551`と`eh-lb555`ですが、現行GCC設定のビルドターゲット名は`eh-lb551_hcpu`と`eh-lb555_hcpu`です。
- **BLE/BT Power Consumption Test**（[SDKソース](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/bt)）：ガイドに記載されたボードは`ec-lb583`、`ec-lb587`、`eh-lb561`、`eh-lb563`、`eh-lb523`です。現行GCC設定では`bt_boards`セットが使われます。正確なビルドターゲット名は[設定](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)で確認でき、一部は`_hcpu`で終わります。このプロジェクトの別エントリーには`sf32lb56-wlan-core_a128r12n1`と`sf32lb56-wlan-core_n16r12n1`も含まれます。ガイドのボード名とビルドターゲット名は、対応関係を確認せずに置き換えないでください。
- **AMOLED Power Consumption Test**（[SDKソース](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/AMOLED)）：ガイドと現行GCCビルド設定の両方に`sf32lb52-core_n16r16`が記載されています。
- **JDI Power Consumption Test**（[SDKソース](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/jdi)）：ガイドと現行GCCビルド設定の両方に`sf32lb52-core_n16r16`が記載されています。
- **GUI_PM Low-Power Example Guide**（[SDKソース](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gui_pm)）：ガイドと現行GCCビルド設定の両方に`sf32lb52-lchspi-ulp`が記載されています。
- **Power Consumption Test Example — Screen Refresh Scenario**（[SDKソース](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/lcd_refresh)）：ガイドのビルド例は`sf32lb52-core_n16r16`です。現行GCCビルドマトリクスにはこのプロジェクトが記載されていませんが、この省略によって、公開ガイドとソースサンプルがなくなるわけではありません。
- **Raise Wrist to Light Up Screen**（[SDKソース](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/raise_wrist)）：ガイドと現行GCCビルド設定の両方に`sf32lb52-lchspi-ulp`が記載されています。

## 測定に含める回路の範囲をそろえる { #measure-at-the-right-electrical-boundary }

製品の測定波形とSDKサンプルを比較する際は、両者の電気的測定境界をそろえてください。たとえば、GPIOのサンプルや手首を上げて画面を点灯するサンプルでは、低消費電力測定時のボード固有の電源接続やジャンパー設定が指定されています。USB給電、接続されたデバッガー、UART変換器、充電回路、ディスプレイモジュールは、測定結果を大きく変えることがあります。

測定ごとに、次の項目を記録します:

1. 電源を供給する箇所と、給電されているすべての電源レール。
2. 電源電圧、電流測定器のサンプリングモードと測定レンジ。
3. 接続したままの外部デバイス、プル抵抗、ケーブル、デバッグインターフェース。
4. ファームウェアのリビジョン、ボード名、`menuconfig`設定、電源管理のデバッグ設定。
5. 波形の各区間が示す状態遷移またはワークロードの内容。

電流だけでなく電力とエネルギーも記録できるよう、電圧と電流を同時に測定してください。[電力測定と検証](measurement-and-validation.md)では、部品、シナリオ、1日の使用プロファイルを検証する手順を詳しく説明しています。

## 電源管理、GPIO、プロセッサーの基本評価 { #baseline-pm-gpio-and-processor-tests }

製品のワークロードを追加する前に、[電源管理サンプル](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html)を使って、想定したスリープモードとウェイクアップ要因が動作することを確認してください。要求したPM状態を記録し、システムが実際に遷移した状態を確認します。要求した深いスリープ状態に入らない場合は、パラメーターを調整する前に、設定とPM状態要求の管理方法を確認してください。

非アクティブに見えるインターフェースが待機電流を増加させている場合は、**GPIO消費電力テスト**から始めるとよいでしょう。資料に記載されたシナリオでは、定期的にウェイクアップしてGPIOを読み取るため、スリープ電流とウェイクアップ/I/O動作による電流を切り分けられます。製品のレビューではさらに、内部/外部プル抵抗、High-Z状態、電源ドメインをまたぐ信号、電源オフ中の周辺機器につながるピン、リセット時の初期状態、ESD保護や逆給電の経路を確認してください。論理的に正しい信号でも、電流リークが発生する場合があります。

**プロセッサー消費電力テスト**では、CPU処理、単純なループ処理、シャットダウン、タイマーウェイクアップ、ピンウェイクアップという性質の異なる状態を切り分けます。CPUが処理を実行しているときの消費電力やウェイクアップの仕組みを評価するのに役立ちますが、アプリケーションの消費エネルギーを予測するものではありません。電力予算に波形を使う前に、ベンチマークやループを実際の製品を代表するファームウェア処理に置き換えてください。

## Bluetoothとディスプレイのシナリオ { #bluetooth-and-display-scenarios }

専用の[BLEアドバタイズ/接続サンプル](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html)と[BLE/BTサンプル](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html)を使い、再現可能な無線シナリオを確立してから、アプリケーションの接続パラメーターを最適化してください。最終製品では、実際のアドバタイズ/接続設定、相手機器、RF環境、アンテナ、コールバック動作で測定する必要があります。無線イベントごとにメインCPUをウェイクアップするアプリケーションでは、リンク層の測定結果が良好でも、製品全体ではその効果が失われることがあります。

ディスプレイ関連のサンプルでは、次の項目を個別に評価できます:

- **AMOLED消費電力テスト**では、画面オフ時のスリープと常時表示ポリシーを比較します。元サンプルに記載されたモード切り替えやバッテリー駆動時間は、指定されたボード、パネル、輝度、更新タイミング、使用モデルに対する値であり、すべてのAMOLED製品に当てはまるものではありません。
- [JDI消費電力テスト](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html)では、JDIディスプレイ経路のプラットフォーム固有の基準を確認できます。
- [GUI_PM低消費電力サンプルガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html)では、UIのライフサイクル設計と電源管理動作の関係を確認できます。
- [画面更新シナリオ](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html)では、ディスプレイ更新自体の負荷に焦点を当てます。

これらのサンプルを通じて、製品に関する「どのイベントで実際に画素を変更する必要があるか」「パネルのどの範囲を更新すべきか」という問いを検討できます。その答えをバッファリング方式や部分更新の方針に反映するには、[グラフィックス概要](../graphics/overview.md)と[ディスプレイコントローラー](../graphics/display-controller.md)を参照してください。

## 手首を上げて画面を点灯する一連の動作を評価する { #raise-to-wake-as-a-complete-scenario }

**手首を上げて画面を点灯する**プロジェクトは、センサーのサンプリング、ジェスチャー認識、ディスプレイのウェイクアップ、一定時間の操作受付、スリープへの再移行を組み合わせているため、特に参考になります。単独の状態ではなく、製品の一連の動作を示しています。

上流サンプルのバッテリー推定値は、記載されたバッテリー容量、ウェイクアップ回数、画面点灯時間、センサー、サンプリング間隔、ボード、実測電流に固有のものです。製品に適用する際は、画面点灯時と消灯時の状態を測定し、1日あたりのイベント数を定め、1日の合計エネルギーを計算するという構成を参考にしてください。数値はそのまま流用せず、製品固有の値に置き換えます。

モデル化と測定を組み合わせた例は、[スマートウォッチの消費電力分析](smartwatch-power-profiling.md)を参照してください。

## 電源管理サンプルを製品の検証データに活用する { #adapt-a-pm-example-into-product-evidence }

<div align="center"><em>表: 電源管理サンプルを製品に適用する際の確認項目</em></div>

<div align="center" markdown>

| 手順 | 保存する検証データ | 重要な理由 |
|:-----|:-----------------|:---------------|
| 元の条件で基準値を取得する | ボード、電源接続、ジャンパー、SDKリビジョン、設定、想定動作 | サンプル本来の動作と、その後に加えた製品変更を区別できる |
| 対象シナリオを特定する | 電源管理状態の名称、動作中の部品、ウェイクアップ要因、継続時間、終了条件 | 設計上の意味を持たない平均電流値だけが残ることを防ぐ |
| 電流と電圧を測定する | 波形マーカーと電流、電圧、電力、エネルギー | 電源レールやファームウェアリビジョン間で結果を比較できる |
| 製品ハードウェアを追加する | 追加・変更した外部部品、ピン状態、電源レール、センサー | 開発ボードにはないリーク経路や周辺機器の消費電力を明らかにする |
| 電力モデルを実測値と照合する | シナリオの発生頻度、継続時間、実測エネルギー | 1日の消費エネルギーの見積もりを、製品の実測値に近づける |

</div>

## 関連資料 { #related-resources }

- 電源管理の責務、電源モード、システム設計、プロファイリングの考え方については、[低消費電力設計の概要](overview.md)を参照してください。
- 部品、シナリオ、製品プロファイルの検証については、[電力測定と検証](measurement-and-validation.md)を参照してください。
- 1日の使用モデルの例は、[スマートウォッチの消費電力分析](smartwatch-power-profiling.md)を参照してください。
- 複数分野にわたるSDKサンプル一覧は、[サンプル](../../develop/examples/index.md)を参照してください。
- 最新の公式プロジェクトとセットアップ手順は、[SiFli-SDK電源管理サンプル一覧](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html)を参照してください。
