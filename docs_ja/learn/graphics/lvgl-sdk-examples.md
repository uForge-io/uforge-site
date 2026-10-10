---
icon: lucide/layout-dashboard
title: "LVGL SDKサンプル"
description: "SiFli-SDKのLVGLサンプルを目的別に選び、画面の立ち上げ、ウィジェット、UI生成、圧縮リソース、動画、フォント、多言語対応を検証する。"
tags:
  - グラフィックス
  - LVGL
  - サンプル
---

# LVGL SDKサンプル { #lvgl-sdk-examples }

SiFli-SDKのLVGLサンプルは、ディスプレイとUIを検証する出発点です。そのまま流用できる製品テンプレートではありません。まずバージョンの合うデモでパネルと入力の基本動作を確認します。その後、製品で特に検証が必要な機能のサンプルを選び、公式に記載されたボード設定で変更せずに実行してから、一度に1層ずつ製品向けへ置き換えてください。動作する基準構成として扱う前に、各READMEの検証状況と制約を確認します。

このガイドは、[SiFli-SDK LVGLインデックス](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html)にある例を、設計・評価の目的別に整理しています。現在サポートされているボード、SDK構成、ソースパス、アセット、ビルドコマンド、バージョン固有の制限については、公式のソースページを参照してください。

このインデックスはサンプル一覧であり、ボード互換性の一覧ではありません。対応範囲はサンプルごとに異なり、ドキュメントURLにチップファミリー名が含まれていても、そのファミリーのボードがすべて対応しているとは限りません。各サンプルのREADMEにある**Supported Boards**を確認してください。汎用的なビルドコマンドやリポジトリのビルドマトリクスへの登録だけでは、そのボードで実機動作が検証済みとは言えません。情報源によって範囲が異なる場合は区別して記載し、使用するSDKリビジョンとボードで確認してください。

## 適切なLVGL基準構成から始める { #start-with-the-right-lvgl-baseline }

<div align="center"><em>表: 目的別に選ぶSiFli-SDK LVGLサンプル</em></div>

<div align="center" markdown>

| 目的 | ここから始める | 確立できること | 次に進むタイミング |
|:-----------------|:-----------|:----------------------------|:-------------|
| 標準的なLVGLアプリケーションを立ち上げる | **[LVGL v8デモ](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_demos/README.html)**、**[LVGL v8公式サンプル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_examples/README.html)**、**[LVGL v9デモ](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_demos/README.html)**、または**[LVGL v9公式サンプル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_examples/README.html)** | 選択したLVGLバージョン、ボードのディスプレイドライバ、レンダリングループ、基本ウィジェット | 実際のパネルで画面更新（flush）処理と入力デバイスが安定して動作したら |
| UIデザインワークフローを評価する | **[gui_guider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/NXP_GUI_guider/README.html)**、**[SquareLine](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/Square_Line/README.html)**、または**[EEZ Studio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/eez_studio/README.html)**の例 | 生成されたUIコードをSDKプロジェクトにどう組み込むか | 生成コードが問題なくビルドでき、LVGLのバージョンがプロジェクトと一致したら |
| 焦点を絞ったUIの挙動を試作する | **[Basechart](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_basechart/README.html)**、**[Baselabel](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_baselabel/README.html)**、**[Follow](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_follow/README.html)**、**[Imgarray](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgarray/README.html)**、**[Imgbar](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgbar/README.html)**、**[Mulroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_mulroller/README.html)**、**[Multanim](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multanim/README.html)**、**[Multlist](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multlist/README.html)**、**[Multroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multroller/README.html)**、**[Multslider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multslider/README.html)**、**[Sector](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_sector/README.html)**、**[Select](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_select/README.html)**、または**[Timeline](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_timeline/README.html)** | 特定のインタラクション、ウィジェット、配置、あるいはアニメーションパターン | 単体の表示要素から複数要素を組み合わせた製品画面へ進むとき |
| アセット、アニメーション、またはメディアを検証する | **[eZipの動的読み込みv8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip_v9/README.html)**、**[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html)**、**[ローカル動画再生](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html)**、または**[ストリーミング再生](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html)** | リッチなコンテンツを保存・デコード・描画・更新する処理経路 | 実機でリソース容量、メモリ配置、更新頻度、消費電力を測定し、製品の制約を満たすことを確認できたら |
| 製品を想定した一連のUIを構築する | **[電子コンパス](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/compass/README.html)**、**[ゲーム索引](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/games/index.html)**（[マインスイーパーのREADME](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/lvgl/games/minesweeper/README.html)）、または**[時計UI v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch_v9/README.html)** | 画面遷移、インタラクション、複数機能を含む表示負荷 | 製品固有のデータ、ライフサイクルの挙動、性能限界を使ってデモ内容を置き換えられる段階になったら |

</div>

サンプルごとに対象ボードは異なります。v8 DemosのREADMEには`eh-lb563`とSF32LB52x、SF32LB56x、SF32LB58xのLCDシリーズが記載されています。v8 Official Examplesには`sf32lb52-lchspi-ulp`とこれら3つのLCDシリーズが記載されています。v9 DemoのREADMEが対応ボードとして挙げているのは3つのLCDシリーズです。後段の汎用的なビルド手順には`eh-lb563`も登場しますが、明示的な**Supported Development Boards**の一覧には含まれていません。v9 Official Examplesには`sf32lb52-lchspi-ulp`と3つのLCDシリーズが記載されています。READMEの明示的な一覧を対象範囲とし、汎用ビルド例だけを根拠にボードを追加しないでください。

## サンプルで確認できる範囲を先に整理する { #confirm-the-integration-boundary-first }

LVGLサンプルを製品向けに変更する前に、サンプルで確認できる層と、製品側で別途対応が必要な層を整理してください。

<div align="center"><em>表: LVGLサンプルで確認できる範囲と製品側の課題</em></div>

<div align="center" markdown>

| 対象範囲 | サンプルで確認できること | 製品側で別途確認すること |
|:---------|:--------------------------|:--------------------------------|
| ボードとパネル | 既知のSDKボード構成とディスプレイ経路 | 実際に使うパネル、タッチコントローラ、電源投入シーケンス、ピン機能の割り当て、リセットタイミング、量産テスト手順 |
| LVGL | バージョンごとの初期化とサンプルUIの動作 | 製品の画面構成、イベント管理の責務分担、メモリ上限、画面更新方針 |
| アセット | サポートされているサンプルアセットパス | アセットフォーマット、ストレージサイズ、ロード時間、キャッシュポリシー、ライセンス、失敗時の処理 |
| レンダリング | 動作する描画・flushループ | 更新領域の管理方針、バッファ数、カラーフォーマット、DMA/キャッシュ処理、負荷下でのUI応答性 |
| アプリケーション | 画面上で確認できるデモの動作 | センサー、Bluetooth、ストレージ、計時、低消費電力への遷移、復旧、ユーザーデータ |

</div>

まず実際のディスプレイとパネルインターフェースを確認し、基本的な画面更新（flush）処理を検証してください。LVGLデモだけで最終的なグラフィックス構成の準備が整ったと判断せず、[グラフィックス概要](overview.md)と[ディスプレイコントローラ](display-controller.md)も参照してください。

## LVGLバージョンを意図的に選ぶ { #choose-the-lvgl-version-deliberately }

公式のインデックスには、LVGL v8とLVGL v9の両方の例が含まれています。生成されたUIプロジェクト、基準となる例、SDK構成は同じLVGLメジャーバージョンに揃えてください。あるメジャーバージョンから生成された画面やカスタムウィジェットを、移植に必要な変更を確認せずに別のバージョンに持ち込まないでください。

最初のボード立ち上げでは、SDKのボード構成がすでに選択しているLVGLバージョンと一致するデモまたは公式例を使用してください。これにより、アプリケーション固有の作業に進む前に、パネル、バッファ、入力、スケジューリングの経路を確実に検証できます。

!!! warning "LVGL v8 SJPGサンプルを使う前にカードをバックアップする"
    v8 Official ExamplesプロジェクトでTFカードからSJPGを読み込むオプション経路は、マウントに失敗するとカードのルート領域に対して`dfs_mkfs()`を呼び出し、データを消去する可能性があります。この経路を有効にして実行する前にカードをバックアップし、使用するSDKリビジョンのコードを確認してください。この警告をすべてのLVGL v8/v9サンプルに一般化せず、各プロジェクトのマウント・フォーマット処理を個別に確認してください。

## UIコード生成ツール: gui_guider、SquareLine、EEZ Studio { #generated-ui-gui_guider-squareline-and-eez-studio }

チームがビジュアルエディタを使って画面階層、スタイル、アセットを生成する必要がある場合は、UIデザインツールの例を使用してください。インデックスには**gui_guider**、**SquareLine**、**EEZ Studio**の例が含まれています。

生成コードを製品へ取り込む前に、出力コードのバージョン、画面解像度、色深度、リソースのパス、コールバックの管理主体を確認してください。

gui_guiderとEEZ Studioの公式サンプルは、どちらもLVGL v8を指定しています。SquareLineでは生成コードが使うデフォルトテーマも有効にします。生成されたサブディレクトリをビルド対象に含め、任意のeZip変換も公式手順に従ってください。ファイルのコピーだけでは組み込みは完了しません。

生成コードはUIの構築を速めますが、ディスプレイドライバ、バッファ設計、入力ドライバ、電力管理の方針、統合テストの代わりにはなりません。再エクスポートで製品固有の変更を誤って上書きしないよう、生成ファイルと手作業で記述したアプリケーションロジックを分けて管理してください。

## ウィジェットとインタラクションのパターン { #widget-and-interaction-patterns }

LVGL v8の個別サンプルで、必要なUI動作を検証できます。ただし規模は一様ではありません。Multlistは単体ウィジェットの最小テストではなく、アプリケーションフレームワークを使った一式のデモです。

- **Basechart**はデータ系列の描画、**Baselabel**はデータソースに連動するテキストの定期更新を扱います。
- **Follow**は重力方向に応じて動くアイコンメニュー、**Select**は選択状態、**Sector**は値に応じた画像の扇形表示を扱います。
- **Imgarray**は画像の字形を組み合わせた数値表示、**Imgbar**は前景画像を切り取った進捗表示です。
- **Mulroller**はコールバックで細かく調整できるローラー選択、**Multroller**は文字列の選択肢を使う簡易ローラーです。
- **Multlist**はリスト、ページ送り、画面遷移、リソースキャッシュ、ページのライフサイクルを扱います。**Multslider**はスライダーのつまみに数値や短いラベルを表示します。
- **Multanim**は画面遷移の効果を扱い、一部はGPU/VGLiteの対応に依存します。**Timeline**は共通の時間軸で複数のアニメーションを制御します。

個別ウィジェットのサンプルごとに対応ボードは異なります。たとえばMultanimとMultlistの**Supported Boards**には`sf32lb52-lcd_n16r8`と`sf32lb52-lchspi-ulp`が記載されていますが、後段の汎用ビルド手順ではより広い52x/56x/58xの対象が言及され、`eh-lb563`がビルド例として示されています。これらは同じ対応範囲を示すものではありません。該当READMEと現在のプロジェクト設定を確認し、インデックスやURLから他のウィジェットの互換性を推測しないでください。

製品で特定の操作部品の動作が懸念される場合は、対応するサンプルから検証してください。最初は変更範囲を絞り、元の部品を動かしてから製品のデータへ置き換えます。大きな画面に組み込む前に、再描画の処理量とメモリ使用量を測定してください。見た目が単純でも、複数の部品を組み合わせるとフレームバッファ、グラフィックスリソースの読み出し帯域、入力イベントの処理スケジュールに負荷がかかります。

## アセット、アニメーション、メディアのワークロード { #asset-animation-and-media-workloads }

eZipの動的読み込み例は、LVGL v8とLVGL v9の両方で利用可能です。動的な圧縮アセットのロードを広く採用する前に、アプリケーションに一致するバージョンを使ってそれを検証してください。[eZip](ezip.md)の記事は、グラフィックスパイプラインにおけるアセット圧縮の役割を説明しています。

GIF/APNGアニメーション素材向けに、SiFliは**Multimedia > AGIF**に [AGIF/APNG + LVGL v8](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl/README.html)と [AGIF/APNG + LVGL v9](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl_v9/README.html)の例も用意しています。各READMEには`eh-lb525`が記載されています。一方、現行の [GCCビルドマトリクス](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)では、両方のプロジェクトパスが`devkit_lcd_boards`に登録されています。マトリクスへの登録はビルド対象を示すものであり、そのグループ内の全ボードで実機動作が検証済みという意味ではありません。製品の基準例として使う前に、対象ボードとSDKリビジョンを確認してください。

動的eZipサンプルでは、ファイルパスによるアクセスとSRAM/PSRAMへの事前読み込みを比較できます。事前読み込みは追加メモリを使いますが、繰り返しのファイル読み込みを減らせます。リソース形式をLVGL v8/v9に合わせてください。公式v9のパスには、v8と異なり`A:/`などのドライブ接頭辞が必要です。実際のストレージ構成とドライブ文字の設定を確認します。v9 READMEには`sf32lb52-lcd_n16r8`、`sf32lb52-lcd_a128r16`、`sf32lb52-lchspi-ulp`、`sf32lb52-core_e8r16`、`sf32lb56-lcd_a128r12n1`、`sf32lb56-lcd_n16r12n1`、`sf32lb58-lcd_n16r32n1_dsi`、`sf32lb58-lcd_a128r32n1_qspi`、`sf32lb58-lcd_n16r32n1_qspi`が明記されています。この一覧はv9 READMEの対象であり、v8に転用したり、他のボードも対応していると推測したりしないでください。eZipのドキュメントでは、`-winsize 2048`の変換オプションが必要なのはSF32LB57のみです。

[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html)、[ローカル動画再生](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html)、[ストリーミング再生](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html)は、それぞれ異なる処理経路を検証するサンプルです。負荷の大小がこの順に決まるわけではありません。Lottie READMEは**未検証**と明記し、`eh-lb563`とSF32LB52x/SF32LB56xシリーズを挙げていますが、現行GCCビルドマトリクスではプロジェクトの登録がコメントアウトされています。このボード一覧を検証済みの対象とみなさないでください。ローカル動画READMEは`eh-lb523`と`sf32lb52-lcd_n16r8`を明示していますが、より広い対象を示す汎用ビルド手順も含みます。こちらもGCCビルドマトリクスではプロジェクトの登録がコメントアウトされているため、別の対象で使う場合はSDKの実際のチェックアウトを確認してください。サンプルは`disk/video_example.mp4`のH.264動画を再生し、TFカードを正常にマウントできた場合はカードのルートにある`video_example.mp4`を優先して読み込みます。ストリーミングREADMEが挙げるボードは`sf32lb52-lchspi-ulp`のみです。スマートフォンのBluetooth PANテザリングでネットワークに接続し、FFmpegを使います。BLEで動画を転送するサンプルではありません。

個々の表示だけでなく、システム全体の負荷として評価してください。Bluetooth、センサー、製品で使用するディスプレイインターフェースを動作させた状態で、リソースやストリームの保存容量、デコード時間、フレーム更新頻度、PSRAM/SRAM使用量、表示帯域、消費電流を測定します。実際の負荷は、コンテンツの複雑さ、解像度、デコーダー設定、バッファ構成によって変わります。

短いデモが滑らかに動いても、長時間のアニメーションを安定して実行できるとは限りません。製品で使うコンテンツの長さと、実際のパネル更新方針で検証してください。

## フォントと実行時の言語切り替え { #fonts-and-runtime-language-switching }

[FreeTypeサンプル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_freetype/README.html)では、ファイルシステムからTrueTypeフォントを読み込み、実行時にフォントやサイズを切り替えます。READMEでは`sf32lb52-lchspi-ulp`での動作が確認されています。他のボードでは`FS_REGION`パーティションと、使用するフォントに十分なシステムヒープが必要です。このサンプルによって他のボードまで検証済みになるわけではありません。読み込み失敗時の内蔵フォントへの切り替え、ヒープ容量の確認、変更時の旧フォントの解放も扱います。製品で使う言語とサイズで、文字の収録範囲とヒープ使用量を確認してください。大きなCJKフォントは必要な文字に絞り込みます。このサンプルはTrueTypeアウトラインを必要とし、CFFアウトラインのOpenTypeフォントには対応しません。ウィジェットやスタイルが参照しているフォントは解放できず、フォントの変更はLVGLスレッドで行う必要があります。同梱フォントを変更したら、ファイルシステムイメージ`fs_root.bin`を再生成して書き込んでください。アプリケーションだけを書き換えても、そのファイルは更新されません。

多言語サンプルの [LVGL v8版](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v8/README.html)と [LVGL v9版](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v9/README.html)は、内蔵言語、外部言語パックのインストール、実行時の切り替え、インストールディレクトリの再走査、`share_prefs`による選択言語の保存を扱います。v8 READMEには`sf32lb52-lchspi-ulp`が記載されています。v9についてはv9 READMEの対象一覧を別途確認し、v8のボード範囲を推測で引き継がないでください。JSONまたはXLSXから、ファームウェアに組み込む言語リソースや外部配布用のバイナリパックを生成します。翻訳キーを全言語で揃え、必要な文字をフォントが収録していることを確認してください。切り替え、再起動後の設定保持、リソース欠落時の動作、ファイルシステムの更新手順を検証します。機能名が同じでも、各バージョンのドキュメントに記載されたパスや設定が同一とは限りません。

## コンパス、ゲーム、時計インターフェース { #compass-games-and-watch-interfaces }

電子コンパスと時計UIのサンプルでは、表示処理とアプリケーションの動作を合わせて確認できます。画面構成、入力・アニメーションのタイミング、表示負荷が増えた場合の影響を調べる際に利用してください。ゲーム索引にはマインスイーパーのサンプルがあります。READMEに記載されているのは`eh-lb563`とSF32LB52x/56xで、58xは含まれていません。58xで使う場合は、現在のSDKソースで対応状況を確認してください。

ドキュメントに記載されたコンパスの基準構成は、`sf32lb52-lchspi-ulp`でMMC56x3の3軸磁力計をI2C接続して使用します。製品ではドライバ、配線、校正条件を確認してください。画面に方位角が表示されるだけでは、測定精度は保証できません。

ゲームや時計UIのサンプルは画面遷移を検討する出発点になります。ただし、データの管理主体、低消費電力時の動作、画面のウェイクアップ方針、通知、障害復旧は製品側で定義する必要があります。

v8の時計UI READMEにはSF32LB52x、SF32LB56x、SF32LB58xのLCDシリーズと`sf32lb52-lchspi-ulp`が記載され、v9 READMEには3つのLCDシリーズが記載されています。どちらも`520-hdk`は非対応で、SF32LB55xでは3D回転デモを使用できないとしています。フォント追加時はリソースパーティションの容量を確認してください。v8ではフォント領域の容量超過が起こり得ます。

## 検証記録を残しながら製品へ組み込む { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>表: LVGLサンプルを製品へ組み込む際の確認事項</em></div>

<div align="center" markdown>

| ステップ | 残す検証記録 | 重要な理由 |
|:-----|:-----------------|:---------------|
| 元のサンプルをビルドする | SDKのリビジョン、ボード名、構成、ビルドログ | 動作確認済みの基準構成を保持する |
| ハードウェアで実行する | 写真/動画、シリアルログ、パネルとタッチの挙動 | 実際のディスプレイと入力の経路を確認する |
| 1つの製品要素を追加する | 変更履歴と、フレームレートおよび画面更新に関する測定結果 | 変更による不具合の原因を特定しやすくする |
| 製品負荷をかける | Bluetooth、センサー、ストレージ、低消費電力への遷移を伴うUIの応答性 | 単体デモでは見えない組み込み時の制約を見つける |
| 最終的な制約を記録する | バッファ使用量、メモリ配置、フレームレート、電力、既知の故障挙動 | サンプルを保守可能な技術資料にする |

</div>

## 関連リソース { #related-resources }

- ディスプレイ選定、フレームバッファ計画、LVGL統合、システムのトレードオフについては[グラフィックス概要](overview.md)。
- コントローラ、バッファ、画面更新（flush）経路については[ディスプレイコントローラ](display-controller.md)。
- SF32グラフィックスアクセラレーションと圧縮機能については[ePicasso](epicasso-gpu.md)、[eZip](ezip.md)、[TurboPixel](turbopixel.md)。
- 分野横断のSDK例カタログについては[サンプル集](../../develop/examples/index.md)。
- 現行の公式一覧とセットアップの詳細については[SiFli-SDK LVGL例インデックス](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html)。
