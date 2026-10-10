---
icon: lucide/file-search-2
title: "ログの取得とクラッシュ解析"
description: "SiFli-SDK のツールを使ってログとメモリーを取得し、クラッシュ時の実行コンテキストを復元してアサーションやハードフォルトを解析します。"
tags: [開発, SiFli-SDK, アプリケーションノート, デバッグ]
---

# ログの取得とクラッシュ解析 { #capture-logs-and-analyze-crashes }

SDK の `debug_logging` と `crash_analysis` のガイドは相互に補完します。ログからは 2 つのコアが何をしていたかが分かり、取得したメモリーイメージを使うとデバッガーで障害時のコンテキストを復元できます。各取得データには、対応する ELF、マップ／シンボルファイル、SDK リビジョン、チップ型番、設定、ボードリビジョンを必ず添付してください。

## デバッグ接続を選ぶ { #choose-a-debug-connection }

<div align="center" markdown>
<em>表: SF32 ファミリー別のデバッグ／ログ接続</em>

| ファミリー | デバッグとログの方法 |
|---|---|
| SF32LB52x、SF32LB56x、SF32LB58x | SiFli のガイドでは、UART での取得、`SifliUsartServer`／`AssertDumpUart`、J-Link/Trace32 による実行コンテキストの復元方法が説明されています。選択したスリープ状態でも利用できる転送手段を選んでください。 |
| SF32LB55x | `$SDK_ROOT/tools/segger/jlink_hcpu_a0.bat` と `jlink_lcpu_a0.bat` で SWD 接続先を HCPU／LCPU 間で切り替えられます。LCPU の ROM コンソールは UART3、1,000,000 baud です。HCPU では UART1/2 または SWD を使えます。SWD は PB IO を使うため、接続中は LPSYS をアクティブまたは Light Sleep 状態に保ってください。 |

</div>

LPSYS がスタンバイから復帰すると、SWD は HCPU に戻ります。J-Link のリセット操作だけでは、選択コアは切り替わりません。非同期ログを有効にしているとアサーションダンプが途中で切れることがあります。障害時には同期取得、またはデータを保持できる取得方式を使ってください。

## 実行中の障害情報または事後解析用データを取得する { #capture-a-live-or-post-mortem-package }

現行 SDK リリースでは、`sdk.py` を使って UART または J-Link 経由で取得します。

!!! note "コマンド例の適用範囲"
    以下のコマンドは SF32LB52/LB525 の例です。コマンド構成はそのままにし、チップ／モデル、コア、転送手段、ELF を対象ファミリーと SDK リリースに合う値へ置き換えてください。

```text
sdk.py crash-dump capture-live --transport uart --probe /dev/ttyUSB0 \
  --chip SF32LB52 --chip-model LB525 \
  --output /tmp/live-crash --elf build_hcpu/main.elf
```

対象が PSRAM を使う場合は `--include-psram --psram-size 8MB` を追加します。J-Link プローブでは `--transport jlink --jlink-ip 127.0.0.1:19025` を使えます。`--core hcpu` または `--core lcpu` で対象コアを選択します。出力ディレクトリには、取得したバイナリー、対象コアの ELF/AXF、`log.txt`、`manifest.json`、`sdk_manifest.json` が含まれているはずです。

古い SDK では、各ファミリーのガイドに記載された方法を使ってください。

- UART: コンソールを使える状態であれば、`SifliUsartServer` または `AssertDumpUart` でアサーションデータを出力できます。
- J-Link/SWD: J-Link を `PATH` に追加し、対象ファミリー用のスクリプトを実行します。たとえば SF32LB55x では `$SDK_ROOT/tools/crash_dump_analyser/script/save_ram_55x.bat` を使います。対応するスクリプトで RAM、EPIC レジスター、PSRAM を保存できます。
- ヒープリークを調べる場合は、`RTOS → RT-Thread Kernel → Memory Management → Enable memory trace` を有効にします。

スクリプトで取得する場合は、`.jlink` ファイルを対象ファミリー、PSRAM 構成、接続方式に合わせてください。`SifliUsartServer` 経由の IP 接続では IP 用スクリプトを、J-Link を USB で直接接続する場合は USB 用スクリプトを使います。接続方式とスクリプトが一致しないと取得に失敗することがあります。

![menuconfig の SF32LB52x メモリートレース設定](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_mem_trace.png){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — ヒープ情報が必要な障害を再現する前に、メモリートレースを有効にします。</em></div>

UART で取得する場合、シリアルユーティリティ、サーバーアドレス、対象コアを一致させる必要があります。次の画面例は接続確認に役立ちます。

![SiFli_Trace と SifliUsartServer のツール配置](../../../../assets/develop/app-notes/crash-analysis/Sifli_Trace.png){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — ツールディレクトリ。</em></div>

![SifliUsartServer の SF32LB52x 接続設定](../../../../assets/develop/app-notes/crash-analysis/UsartServer52.png){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — 取得対象に合わせてシリアルポート、ボーレート、サーバーアドレス、デバッグ対象コアを設定します。</em></div>

![クラッシュダンプ解析用 RAM 保存スクリプト](../../../../assets/develop/app-notes/crash-analysis/save_ram_uart_52.png){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — 一覧には `save_ram_55x.bat`、`save_ram_58x.bat`、`save_ram_uart_52x.bat` など、ファミリー別・接続方式別のスクリプトがあります。対象と接続方式に合うものを選びます。</em></div>

## 実行コンテキストを復元して解析する { #restore-and-analyze-the-context }

取得したパッケージをデバッガーで読み込めるコアファイルに変換し、対応する ELF で解析します。

```text
sdk.py crash-dump readcore --package /tmp/live-crash \
  --elf build_hcpu/main.elf --output /tmp/live-crash/coredump.elf
sdk.py crash-dump analyze --core /tmp/live-crash/coredump.elf \
  --elf build_hcpu/main.elf
```

従来の Trace32 手順では、HCPU アサーションデータを HCPU assertion (HA) ボタンと `run_next_step` で読み込みます。LCPU ダンプには LCPU のコンテキスト復元用設定を使います。例外スタックが表示されない場合、レジスターを解釈する前にコア選択、ELF、メモリー範囲を確認してください。

![Trace32 の取得スクリプト選択例](../../../../assets/develop/app-notes/crash-analysis/dump_select.png){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — J-Link/Trace32 の取得スクリプト選択。</em></div>

![Trace32 の HCPU アサーション画面](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_hcpu_window.png){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — コンテキストの復元後はコールスタック、スレッド一覧、ヒープ、エラー理由をまとめて確認します。</em></div>

## 起動初期や競合の疑いがある箇所で停止する { #stop-early-during-boot-or-a-suspected-race }

初期化をデバッグするには、対応する `Reset_Handler` の先頭命令のコメントを外して `B .` にします。

次のスタートアップファイルのパスは SF32LB55x のガイドに記載されたものです。他のファミリーでは対応するスタートアップファイルを使ってください。

- HCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_hcpu.S`
- LCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_lcpu.S`

J-Link を接続し、実行を再開するには PC を 2 バイト進めます。C では `_asm("B .");` で同じ意図的な停止を作れます。`while (1);` に置き換えないでください。ループ以降のコードがコンパイラーにより最適化で取り除かれる場合があります。

## 取得データを読む { #read-the-evidence }

アサーションダンプには通常、アサーション関数と行番号、スレッド表、メールボックスとメッセージキューの状態、ミューテックス、セマフォ、ヒープ使用量、CPU レジスターが含まれます。障害時の PC を正確な ELF と照合したうえで、スタックの余裕、待機対象となっているリソースの所有者、キュー項目、障害直前のログを確認します。シンボル化する前に、未加工のダンプを保存してください。

対話的に調査する場合は、Ozone に HCPU/LCPU の ELF と、`$SDK_ROOT/tools/svd_external` にある FPU 搭載 Cortex-M33 用の SVD を読み込みます。対象コアの状態によって SWD 接続できない場合は、UART または `SifliUsartServer` を使ってください。ULOG は UART で出力できます。Segger RTT を使うには、RTT サポートを有効にしたうえで RT-Thread のログデバイスに `segger` を選びます。

## バス／メモリー障害を計測する { #instrument-bus-and-memory-failures }

SDK のバスモニターで、バスフォルトにつながるアクセスを取得できます。`dbg_busmon_reg_callback` でコールバックを登録し、ガイドの例にある `dbg_busmon_read` と `dbg_busmon_write` を使って対象アドレス範囲を調査します。ヒープトレースとクラッシュデータを組み合わせてください。シンボルやメモリーコンテキストのないレジスターダンプだけでは、ほとんどの場合、十分な情報が得られません。

![Trace32 のヒープコールスタック例](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_heap_callstack.png){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — ヒープコールスタックとメモリーウィンドウ。</em></div>

公式ファミリー別資料: [SF32LB52x のクラッシュ解析](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/crash_analysis.html)、[SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/crash_analysis.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/crash_analysis.html)、[SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/crash_analysis.html)、および対応する[デバッグ／ログガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/debug_logging.html)。
