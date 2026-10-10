---
icon: lucide/timer-reset
title: ウォッチドッグの設定
description: "SiFli-SDK で SF32 の HCPU と LCPU のウォッチドッグ経路を有効化し、キック動作を検証する方法を説明します。"
tags: [開発, SiFli-SDK, アプリケーションノート, ウォッチドッグ]
---

# ウォッチドッグの設定 { #configure-the-watchdog }

SiFli SDK のウォッチドッグ資料は、HAL が公開するハードウェアウォッチドッグと、アプリケーションが使う RT-Thread ウォッチドッグドライバーの 2 層に分かれています。インスタンス名、リセット範囲、クロック設定はファミリーによって異なるため、次の比較を確認し、対象チップの SDK 設定と資料で動作を確認してください。

<div align="center" markdown>
<em>表: ファミリー別に HAL 資料が示すウォッチドッグ動作</em>

| ファミリー | HAL に記載されたウォッチドッグ動作 | HAL ガイドに記載されたクロック |
|---|---|
| SF32LB52x | HAL ガイドには、HCPU と LCPU に専用ウォッチドッグがあり、それぞれ割り込みまたは担当サブシステムのリセットを行えるとあります。また、チップ全体をリセットするシステム IWDT も備えます。 | カウンターは 32K クロックを基準に説明されています。52x 固有のクロック選択肢は記載されていません。 |
| SF32LB55x | HCPU の WDT1 と LCPU の WDT2 は割り込みを生成できます。ハードウェアリセットの対象はそれぞれのサブシステムに限られます。システム IWDT は割り込みを生成せず、チップ全体をリセットできます。 | RC10K または 32K LXT を選択できます。 |
| SF32LB56x / SF32LB58x | HAL ガイドによると、WDT1/WDT2 はチップ全体をリセットする機能も備えます。 | RC10K を使用し、32K 低消費電力クロックからは取得しません。 |
</div>

!!! warning "RT-Thread ウォッチドッグ使用ガイドの適用範囲"
    [ウォッチドッグ使用ガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html)は `sf32lb52x` のパスで公開されていますが、本文では SF32LB55X を明記しています。以下に示す 30 秒の既定値、IDLE スレッドからのキック、スリープ時の動作、アプリケーション層のリセット手順は、同ガイドに記載された 55x の設定に対するものです。SF32 全ファミリー共通の保証として扱わず、対象ファミリーの資料と生成された設定で確認してください。

## ウォッチドッグを有効化・設定する { #enable-and-configure-the-watchdog }

プロジェクトディレクトリで `sdk.py menuconfig` を実行し、RT-Thread のデバイスドライバー設定からウォッチドッグを有効にします。SDK リリースによって正確なメニュー名が異なる場合があるため、対象ファミリーの公式ドキュメントを参照し、ビルド前に生成された `rtconfig.h` を確認してください。

上記のウォッチドッグ使用ガイドの menuconfig 例では、次の 2 つの設定を個別に行います。

- `RTOS → On-chip Peripheral Drivers → Enable Watchdog Timer`：チップのハードウェアウォッチドッグタイマーを有効にします。
- `RTOS → RT-Thread Components → Device Drivers → Using Watch Dog device drivers`：RT-Thread ドライバーを有効にします。

同ガイドの 55x 設定では、既定タイムアウトは 30 秒です。ドライバーメニューの `(30) Watch Dog timeout (NEW)` で別の値を選べます。対象ファミリーの既定値は `menuconfig` で確認し、生成された設定をファームウェアイメージとともに保管してください。

以下の図は、同ガイドに掲載されたメニュー位置とタイムアウト設定項目です。ガイドの URL パスと本文が示すチップファミリーが一致しないため、図は参考例として扱い、実際のメニューと既定値はプロジェクトの `menuconfig` 出力で確認してください。

![menuconfig におけるウォッチドッグドライバー設定](../../../../assets/develop/app-notes/watchdog/watchdog2.png){ loading="lazy" }
<div align="center"><em>図: SiFli のウォッチドッグ使用ガイドに掲載されたドライバーメニュー。</em></div>

![menuconfig におけるウォッチドッグタイマー設定](../../../../assets/develop/app-notes/watchdog/watchdog.png){ loading="lazy" }
<div align="center"><em>図: SiFli のウォッチドッグ使用ガイドに掲載されたタイマー設定。</em></div>

## キックの方針 { #feeding-policy }

システムは RT-Thread の `IDLE` スレッドからウォッチドッグをキックします。アプリケーションスレッドが設定したタイムアウトを超えて連続実行しない限り、アプリケーション側で追加のコードは必要ありません。

高優先度スレッドを設定したタイムアウトより長く連続実行する必要がある場合は、そのスレッドから次の API でウォッチドッグをキックします。

```c
rt_hw_watchdog_pet();
```

スケジューラーの停止やデッドロックを隠すような無条件のキックループは追加しないでください。キックする位置は、監視対象の処理が正常に進んでいることを示す箇所にしてください。

## スリープとリセットの動作 { #sleep-and-reset-behavior }

- `Standby` または `Hibernate` に入るとウォッチドッグは無効になり、復帰後に再び有効になります。
- その他のスリープモードではウォッチドッグが動き続けるため、タイムアウト前にシステムを復帰させてキックする必要があります。
- HCPU はシステムウォッチドッグを使います。タイムアウトするとチップ全体が再起動します。
- LCPU は LCPU サブシステムのウォッチドッグを使います。タイムアウトするとまず割り込みが発生し、その割り込みハンドラーがソフトウェアによるチップ全体の再起動を実行します。

## 検証手順 { #validation-sequence }

1. チップファミリー、SDK リビジョン、タイムアウト、キックを担当する処理、スリープモードを記録します。
2. 正常な負荷で想定したキック箇所に到達することを確認します。
3. 意図的にキックを停止し、想定した範囲でリセットされ、起動することを確認します。
4. 特に `Standby` と `Hibernate` を含む、対応する各スリープモードで繰り返します。
5. リセット時の観測結果と起動時診断の証跡を、製品の復旧試験記録とともに保管します。

## 公式資料 { #official-sources }

- [Watchdog Usage Guide（英語、SF32LB52x のパスで公開。本文は SF32LB55X を明記）](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html)
- [ウォッチドッグ使用ガイド（中国語、同じ SF32LB52x のパスで公開。本文は SF32LB55X を明記）](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/watchdog.html)
- [SF32LB52x HAL WDT ガイド（英語）](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/wdt.html)
- [SF32LB55x HAL WDT ガイド（中国語、56x/58x の比較情報を含む）](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/wdt.html)

次のファミリー別ウォッチドッグ・アプリケーションノートのパスは、現時点で確認できていません: `sf32lb55x/app_note/watchdog.html`、`sf32lb56x/app_note/watchdog.html`、`sf32lb58x/app_note/watchdog.html`。検索結果や直接アクセスで確認できないことは、これらのパスが 404 を返すことを意味しません。
