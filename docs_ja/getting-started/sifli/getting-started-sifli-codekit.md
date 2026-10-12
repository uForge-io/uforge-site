---
icon: lucide/app-window
description: "VS CodeでSiFli CodeKitを初めて使う手順を説明します。拡張機能、SF32ボード、hello_worldのビルドと書き込み、シリアルコンソールを扱います。"
tags:
    - はじめに
    - SiFli CodeKit
    - VS Code
---

# SiFli CodeKit { #sifli-codekit }

SiFli CodeKitは、SiFli-SDK開発向けのVS Code拡張機能です。SDKツールのインストール、ボードの選択、サンプルのビルド、ファームウェアの書き込み、シリアルコンソールを開くといった操作をガイド付きで実行できます。

IDEでの操作を希望する場合は、この手順を使ってください。各ボタンで実行されるコマンドを確認したい場合は、[SiFli-SDKの手動セットアップガイド](getting-started-sifli-sdk.md)を参照してください。

このページは初回セットアップ向けです。`hello_world`が動作したら、CodeKitの普段の使い方、開発環境を再現するための要件、対応範囲と障害時の切り分け方を[CodeKitツールリファレンス](../../develop/tools/codekit.md)で確認してください。

## 必要なもの { #what-youll-need }

**ハードウェア**

- SiFli-SDKが対応するSF32開発ボード。
- ボードのUSB-to-UARTポートに接続するUSB Type-Cデータケーブル。
- Windows、macOS、またはLinuxを実行するコンピューター。

**ソフトウェア**

- [Visual Studio Code](https://code.visualstudio.com/)
- SiFli CodeKit拡張機能。
- CodeKitがSiFli-SDKのクローンまたはインポートを求める場合はGit。

**公式リファレンス**

- [SiFli CodeKitのインストールガイド](https://docs.sifli.com/projects/codekit/get-started/install.html)

## CodeKitのインストール { #install-codekit }

1. VS Codeを開く。
2. **Extensions**を開く。
3. **SiFli-SDK-CodeKit**を検索する。
4. 拡張機能をインストールする。
5. 求められたらVS Codeを再読み込みする。

SDK管理を開くには、VS CodeのサイドバーにあるSiFliアイコンをクリックし、**SDK Manager**を選択します。または、**View > Command Palette**（既定のショートカットは`F1`）を開き、**Manage SiFli SDK installation**を実行します。メニュー名は拡張機能のバージョンによって異なる場合があります。上記リンクの公式インストールガイドも参照してください。

!!! tip
    必要なアクションが見つからない場合は、Command Paletteを開いて`SiFli`を検索してください。

## SiFli-SDKのインストールまたは選択 { #install-or-select-sifli-sdk }

CodeKitのセットアップ手順でSiFli-SDKをインストールするか、すでにクローンしたSDKの場所を指定してください。多くのユーザーには、バージョンが固定され、テスト済みの**Release/Tag**が適しています。新しい機能や修正が必要で、安定性が低い可能性を許容できる場合は**Branch**を選んでください。公式ガイドでは、`release/vX.Y`は、より不安定な`main`ブランチを使わずに、そのリリース系列の最新の修正や機能を取り込む方法として説明されています。ただし、その内容は時間とともに変わる可能性があります。

中国本土から利用する場合、公式ガイドではSDKの取得元にGitee、ツールチェーンのダウンロード元にSiFli国内ミラーを推奨しています。

CodeKitがSDKの場所を尋ねてきた場合は、スペースを含まない短いパスを選んでください。例えば次のとおりです。

=== "macOS / Linux"

    ```text
    ~/OpenSiFli/SiFli-SDK
    ```

=== "Windows"

    ```text
    C:\OpenSiFli\SiFli-SDK
    ```

CodeKitはSDK自体のインストーラーと環境スクリプトを使用します。結果は手動セットアップと一致するはずです。コンパイラ、Python環境、ビルドツール、書き込みツールがまとめて準備されます。

## サンプルを開く { #open-an-example }

SDKの`hello_world`サンプルから始めます。

```text
example/get-started/hello_world/rtt/project
```

そのプロジェクトフォルダをVS Codeで開きます。CodeKitのプロジェクト取り込みウィザードが表示されたら、`hello_world`を選択し、SDKのルートフォルダを自動検出させてください。

## ボードの選択 { #select-the-board }

ハードウェアに合ったボード構成を選択してください。SF32LB52-DevKit-LCDクラスのボードの場合、一般的なボード名は次のとおりです。

```text
sf32lb52-lcd_n16r8
```

別のボードを使用する場合は、CodeKitの一覧またはSDKの対応ボード資料から該当するボード名を選択してください。ボード名に応じて、メモリーレイアウト、ピン割り当て、フラッシュ設定、デフォルトの周辺機能が決まります。

## ビルド { #build }

CodeKitの**Build**アクションを実行します。ビルドが成功すると、次のようなボード固有の出力フォルダが作成されます。

```text
build_sf32lb52-lcd_n16r8_hcpu
```

ビルドが即座に失敗する場合は、CodeKitがSiFli-SDKのインストール場所を認識しているか、SDK環境のインストールが完了しているかを確認してください。

## 書き込み { #flash }

USB-to-UARTポート経由でボードを接続し、CodeKitの**Flash**または**Download**アクションを実行します。

シリアルポートの入力を求められたら次のようにします。

- Windowsでは、対応する`COM`ポートを選択します。
- macOSでは、`/dev/tty.*`ではなく`/dev/cu.*`デバイスを選択します。
- Linuxでは、対応する`/dev/ttyUSB*`または`/dev/ttyACM*`デバイスを選択します。

書き込みツールがUARTダウンロードモードに入れない場合は、転送を始める直前にボードをリセットしてください。それでも解決しない場合は、ボード固有の書き込み手順を確認してください。

## シリアルコンソールを開く { #open-the-serial-console }

CodeKitのシリアルモニター、VS Codeのシリアルツール、または別のターミナルプログラムを使用してください。リセット後、コンソールには読み取り可能なブート出力と`hello_world`サンプルの出力が表示されるはずです。

読み取れるブートログが表示されれば、ボードとシリアル設定は正しい状態です。文字化けする場合は、ほかのシリアルツールを閉じ、サンプルで使われているボーレートを確認してください。

## 成功の確認 { #success-check }

次の条件を満たしたら、次の作業に進めます。

- CodeKitがSDKの場所を認識している。
- 選択したボードがハードウェアと一致している。
- ビルドと書き込みのアクションが完了する。
- リセット後、シリアルコンソールに`hello_world`の出力が表示される。

## トラブルシューティング { #troubleshooting }

<div align="center"><em>表: トラブルシューティング</em></div>

<div align="center" markdown>

| 症状 | 確認事項 |
|:--------|:------|
| シリアルポートが表示されない | データケーブル、別のUSBポート、またはボードのUSB-to-UARTコネクタを試してください。 |
| CodeKitがSDKを見つけられない | CodeKitのセットアップフローを再実行し、SiFli-SDKのルートフォルダを選択してください。 |
| ビルド時にツールが見つからない | CodeKitでツールチェーンを再インストールするか、SDKのインストーラーを一度手動で実行してください。 |
| 書き込みが開始しない | ツールがUARTダウンロードモードに入れない場合は、転送直前にボードをリセットしてください。それでも解決しない場合は、ボード固有の書き込み手順を確認してください。 |
| シリアル出力が読み取れない | ボーレートを確認し、開いているシリアルモニターが1つだけであることを確認してください。 |

</div>

## 次に進む先 { #where-to-go-next }

- [SiFli-SDK](getting-started-sifli-sdk.md)を使って、対応するターミナルコマンドを理解してください。
- `hello_world`が動作したら、[ペリフェラル入門](../tutorials/beginner.md)に進んでください。
- 実際の製品機能に取り組み始める際は、[Bluetooth概要](../../learn/bluetooth/overview.md)、[グラフィックス概要](../../learn/graphics/overview.md)、[オーディオ概要](../../learn/audio/overview.md)、[低消費電力の概要](../../learn/low-power/overview.md)を確認してください。

## 再現可能な構成を記録する { #what-sifli-should-add }

CodeKitとSDKのバージョン、選択したリリースタグまたはブランチ、正確なボードターゲットを記録してください。メニューやコマンド名が本ページと異なる場合は、最新の[公式インストールガイド](https://docs.sifli.com/projects/codekit/get-started/install.html)と、SDKの[対応ボード一覧](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)を、インストール済みのバージョンに対する基準として参照してください。
