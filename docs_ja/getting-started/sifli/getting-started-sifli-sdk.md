---
icon: lucide/terminal
description: "開封したばかりのSF32ボードで、SiFli-SDKの環境を構築し、sconsでビルドして、UART経由でhello_worldを実行するまでを説明します。"
tags:
    - はじめに
    - SiFli SDK
---

# SiFli-SDK { #sifli-sdk }

このガイドでは、開封したばかりのSF32開発ボードから、SF32デバイス向けの公式なRT-ThreadベースのSDKである**SiFli-SDK**を使って、UART経由で`hello_world`サンプルを動作させるところまでを説明します。

Arduino、Zephyr、MicroPythonを使う予定でも、まずこのガイドを一度実行してみてください。別のフレームワークを導入する前に、ボード、ケーブル、シリアルポート、書き込み手順、基本のツールチェーンが正しく動作するか確認できます。

## 必要なもの { #what-youll-need }

**ハードウェア**

- [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)などのSF32開発ボード、または[SF32ファミリー](../../sf32-products/family/SF32_family.md)の製品ラインアップから選んだ別のボード。
- 充電専用ケーブルや別のUSB機能用ポートではなく、ボードのUSB-to-UARTポートに接続するUSB Type-Cの**データ**ケーブル。
- Windows、macOS、またはLinuxを実行するコンピューター。

**ソフトウェア**

- [git](https://git-scm.com/)
- [`uv`](https://docs.astral.sh/uv/getting-started/installation/)によってブートストラップされるC/C++ツールチェーン（SiFli-SDKのインストーラーが、コンパイラ、デバッガー、Python環境を取得します）
- [SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)リポジトリ自体

**公式リファレンス**

- [SiFli-SDKのインストールガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)
- [SiFli-SDKの対応ボード一覧](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)
- [OpenSiFliのSiFli-SDKリポジトリ](https://github.com/OpenSiFli/SiFli-SDK)
- [OpenSiFli SiFli-SDKのリリース一覧](https://github.com/OpenSiFli/SiFli-SDK/releases)

!!! tip "IDEの方がお好みですか?"
    SiFliは、SDKの環境構築からビルド、書き込みまでを案内するVS Code拡張機能**SiFli-SDK-CodeKit**も公開しています。IDEを使った手順を希望する場合は、[SiFli CodeKit](getting-started-sifli-codekit.md)を参照してください。

## ツールチェーンのインストール { #install-the-toolchain }

再現性のある基準構成には、`main`ではなく公開済みのリリースタグを使ってください。今回の確認時点で最新の公開タグは`v2.5.1`です。始める前に[公式リリース一覧](https://github.com/OpenSiFli/SiFli-SDK/releases)で新しいタグがないか確認してください。`release/v2.5`ブランチには同リリース系列の更新が入りますが、内容は時間とともに変わります。

=== "macOS / Linux"

    SiFli-SDKのスクリプトで使われるパッケージ・環境管理ツール`uv`をインストールします。

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

    SDKをクローンします。

    ```bash
    mkdir -p ~/OpenSiFli && cd ~/OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    インストーラーを実行してから、SDK環境をシェルにロードします。

    ```bash
    cd SiFli-SDK
    ./install.sh
    . ./export.sh
    ```

=== "Windows"

    `uv`をインストールします（PowerShell）。

    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    SDKをクローンします。

    ```powershell
    mkdir C:\OpenSiFli
    cd C:\OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    インストーラーを実行してから、SDK環境をロードします。

    ```powershell
    cd SiFli-SDK
    .\install.ps1
    .\export.ps1
    ```

!!! info "SiFli-SDKにはサブモジュールが含まれています"
    GitHubの「Download ZIP」オプションには、必要なサブモジュールが含まれません。`git clone --recursive`を使用してください。すでにサブモジュールなしでクローンしてしまった場合は、SDKのルートから`git submodule update --init --recursive`を実行してください。

!!! note "中国本土から利用する場合"
    インストール前に、使用するシェルで`SIFLI_SDK_MIRROR_CHINA`を`1`に設定してください。macOS/Linuxでは`export SIFLI_SDK_MIRROR_CHINA=1`、PowerShellでは`$env:SIFLI_SDK_MIRROR_CHINA = "1"`を使います。GitHubの代わりに[Giteeミラー](https://gitee.com/SiFli/sifli-sdk)からクローンする方法もあります。詳しくは[インストールガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)を参照してください。

`install.sh` / `install.ps1`は、対応するコンパイラ、デバッガー、Python依存関係をダウンロードします。SDKのバージョンが変わったら再実行してください。`export.sh` / `export.ps1`は、現在のターミナルでその環境を有効化します。ビルドのために新しいターミナルを開くたびに実行してください。WindowsではPowerShellから`.ps1`スクリプトを実行してください。

## ボードターゲットの選択 { #choose-the-board-target }

`scons --board`に渡す値は、`customer/boards`配下のボードディレクトリ名です。お使いのキットに搭載されたメモリおよびディスプレイ構成に合ったターゲットを選択してください。以下の名前は大文字小文字を区別します。

<div align="center" markdown>

*SiFli-SDK 開発キット ビルドターゲット*

| 開発キット | 正確な`scons --board`ターゲット |
| --- | --- |
| SF32LB52-DevKit-Core-3p3 | `sf32lb52-core_e8r16`<br>`sf32lb52-core_n16r16` |
| SF32LB52-DevKit-LCD | `sf32lb52-lcd_52d`<br>`sf32lb52-lcd_n16r8`<br>`sf32lb52-lcd_a128r16` |
| SF32LB52-DevKit-Nano | `sf32lb52-nano_n4`<br>`sf32lb52-nano_n16r16`<br>`sf32lb52-nano_a128r16` |
| Huangshan-Pi（SF32LB52-LCHSPI-ULP） | `sf32lb52-lchspi-ulp` |
| SF32LB56-DevKit-LCD | `sf32lb56-lcd_a128r12n1`<br>`sf32lb56-lcd_n16r12n1` |
| SF32LB58-DevKit-LCD | `sf32lb58-lcd_a128r32n1_dsi`<br>`sf32lb58-lcd_a128r32n1_qspi`<br>`sf32lb58-lcd_n16r32n1_dpi`<br>`sf32lb58-lcd_n16r32n1_dsi`<br>`sf32lb58-lcd_n16r32n1_qspi`<br>`sf32lb58-lcd_n16r64n4` |

</div>

デュアルコアボードでは、コアのサフィックスを省略するとHCPU構成がビルドされます。必要に応じて`_hcpu`を明示するか、`_lcpu`を追加してLCPU構成をビルドしてください（例: `scons --board=eh-lb551_lcpu`）。お使いのボード構成が表にない場合は、SiFliの[対応ボード一覧](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)で最新情報を確認してください。

## 「Hello World」サンプルのビルド { #build-the-hello-world-example }

環境をロードした状態で、お使いのボード向けにRT-Threadの`hello_world`サンプルをビルドします。

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb52-lcd_n16r8 -j8
```

`sf32lb52-lcd_n16r8`をお使いのボード名に置き換えてください。利用可能な名前については[対応ボード一覧](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)を参照してください。`-j8`は8並列ジョブでビルドします。お使いのマシンに合わせて調整してください。この例ではコアサフィックスを省略しているため、HCPUがビルドされ、出力バイナリは`build_sf32lb52-lcd_n16r8_hcpu/`に生成されます。`--board`で`_lcpu`を明示した場合、出力ディレクトリにも`_lcpu`が付きます。

!!! tip "カスタム設定が必要ですか?"
    プロジェクトディレクトリから`sdk.py menuconfig --board=<board_name>`を実行すると、対話型の設定メニューが開きます。++esc++を2回押し、表示されたら設定を保存して終了してください。

## ボードへの書き込み { #flash-the-board }

ボードをUSBで接続したまま、ビルドで生成されたUART書き込みスクリプトを実行します。

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

    シリアルポートを求められたら、OSに表示されるシリアルデバイスのパスを入力してください。macOSでは`/dev/tty.*`ではなく`/dev/cu.*`デバイス（例: `/dev/cu.usbserial-12345678`）、Linuxでは該当するデバイスパス（例: `/dev/ttyUSB0`）を使います。

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

    `please input serial port number`と表示されたら、COMポートの番号だけを入力し（例: `COM19`なら`19`）、Enterを押してください。

!!! tip
    ダウンロードツールがUARTダウンロードモードに入れない場合は、転送を開始する直前にボードをリセットしてください。それでも解決しない場合は、ボード固有の書き込み手順を確認してください。

## 動作の確認 { #see-it-run }

書き込みが完了したら、ボードをリセットするか、自動的にリセットされるのを待ちます。ボードのデフォルトボーレートでシリアルターミナルを開いてください。UART経由でブート出力と`hello_world`サンプルの出力が表示されるはずです。

## 完了の確認 { #success-check }

次の条件を満たしたら、次の作業に進めます。

- プロジェクトがエラーなくビルドされる。
- UARTダウンロードスクリプトが完了する。
- シリアルコンソールに読み取り可能なブート出力が表示される。
- リセット後に`hello_world`サンプルが出力される。

## 次に進む先 { #where-to-go-next }

- **チップを選ぶ:** [SF32ファミリーの概要](../../sf32-products/family/SF32_family.md)でLB52、LB55、LB56、LB58の各シリーズを比較してください。
- **さらにサンプルを試す:** `hello_world`以外にも、SDKにはBLE、クラシックBluetooth、LVGLグラフィックス、オーディオ、低消費電力モードのサンプルが含まれています。
- **別のフレームワークを使いたい場合:** [Arduino](../arduino/getting-started-arduino.md)、[Zephyr](../zephyr/getting-started-zephyr-upstream.md)、または[MicroPython](../micropython/getting-started-micropython.md)に進んでください。
- **行き詰まった場合:** ツールチェーン、J-Link、デバッグに関するよくある問題については、[SiFli FAQ](https://wiki.sifli.com/en/faq/index.html)を確認してください。

## 動作確認済みの基準構成を記録する { #what-sifli-should-add }

再現可能なセットアップのため、SDKのタグまたはブランチ、正確な`scons --board`ターゲット、ホストOS、シリアルポート、ボード固有のダウンロード手順を記録してください。SDKやボードを変更する際は、公式の[対応ボード一覧](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)と[リリース一覧](https://github.com/OpenSiFli/SiFli-SDK/releases)を再確認してください。
