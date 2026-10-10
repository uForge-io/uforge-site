---
icon: lucide/library
description: "SF32 チップとモジュール向けに SiFli が公式配布する回路図シンボル／PCB フットプリントライブラリ。JLCEDA/LCEDA Pro、PADS、OrCAD、KiCad のダウンロードとレビュー項目を掲載しています。"
tags:
    - ハードウェア
    - EDA
    - ライブラリ
---

# SF32 EDA ツールライブラリ { #sf32-eda-tool-libraries }

## 目的 { #purpose }

SiFli は、SF32 チップおよびモジュール向けの回路図シンボルと PCB フットプリントのライブラリを公開しています。データシートを見ながらシンボル、ピン配置、ランドパターンを手作業で描き直すのではなく、これらのファイルを回路図作成と PCB レイアウトの出発点として利用してください。

ライブラリはハードウェアの初期立ち上げ時のリスク低減に役立ちますが、データシート、パッケージ図、デバイス固有のハードウェア設計ガイドの代替にはなりません。リリース前に、選択したライブラリ部品を、正確な部品番号、パッケージ、ピン配置、ランドパターン、設計ガイドと照合してください。

<div class="grid cards" markdown>

- :fontawesome-solid-download: __[JLCEDA / LCEDA Pro ライブラリ - `.epro2` プロジェクトをダウンロード](https://downloads.sifli.com/hardware/files/documentation/ProPrj_sifli-iclib_2026-04-20.epro2)__
- :fontawesome-solid-download: __[PADS ライブラリ - `.ZIP` をダウンロード](https://downloads.sifli.com/hardware/files/documentation/PADS-SIFLI-IC.ZIP)__
- :fontawesome-solid-download: __[OrCAD ライブラリ - `.OLB` をダウンロード](https://downloads.sifli.com/hardware/files/documentation/OrCAD-SIFLI-IC.OLB)__
- :fontawesome-brands-github: __[KiCad ライブラリ - OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries)__

</div>

!!! note "出典"
    直接ダウンロード用のリンクは、[SiFli Wiki のダウンロード一覧](https://wiki.sifli.com/hardware/index.html)から取得しています。ファイルのリンクが変わった場合は、このページで新しいリンクを確認してください。

## ライブラリ形式の概要 { #library-format-at-a-glance }

<div align="center"><em>ライブラリ形式の概要</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| EDA ツール | ファイル | 形式 | 内容 | 配布方法 |
|:-----------|:---------|:-----|:-----|:---------|
| JLCEDA / LCEDA Pro | `ProPrj_sifli-iclib_2026-04-20.epro2` | LCEDA Pro プロジェクトアーカイブ | 回路図シンボルと PCB フットプリント | 直接ダウンロード |
| PADS | `PADS-SIFLI-IC.ZIP` | Mentor/Siemens PADS ライブラリアーカイブ | 回路図シンボルと PCB Decal | 直接ダウンロード |
| OrCAD | `OrCAD-SIFLI-IC.OLB` | Cadence OrCAD Capture ライブラリ | 回路図シンボル | 直接ダウンロード |
| KiCad | リリース ZIP またはパッケージメタデータ（`metadata.json`） | KiCad のシンボル、フットプリント、3D モデルライブラリ | 回路図シンボル、PCB フットプリント、3D モデル | [GitHub リポジトリ](https://github.com/OpenSiFli/kicad-libraries)、バージョン付きリリース |

</div>

JLCEDA / LCEDA Pro と PADS はアーカイブ、OrCAD は単独の `.OLB` ライブラリファイルとして配布されています。Wiki のダウンロード一覧には部品ごとの対応表がないため、対象の EDA ツールに読み込み、選定した部品が含まれていることを確認してください。

リンク先の KiCad リポジトリでは、ソース、バージョン付きリリース、対応デバイス表を公開しています。対応状況を確認しやすい一方、すべての SF32 バリアントが含まれることを保証するものではありません。

## KiCad ライブラリの詳細 { #kicad-library-detail }

[OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) リポジトリは、SiFli 公式の KiCad 用シンボル、フットプリント、3D モデルライブラリを CC-BY-SA-4.0 で提供しています。このレビューでは 2026-10-05 に[リリース `1.0.0`](https://github.com/OpenSiFli/kicad-libraries/releases/tag/1.0.0)を確認しました。新規設計の前に、より新しいリリースがないか確認してください。

<div align="center"><em>KiCad ライブラリの対応状況</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 部品番号 | パッケージ | シンボル | フットプリント | 3D モデル |
|:---------|:-----------|:--------:|:--------------:|:---------:|
| SF32LB52B/D/E/G/J | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB520/3/5/7 | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB52-MOD-1 モジュール | - | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-xmark: |

</div>

この表は 2026-10-05 に確認したリポジトリの README に基づくもので、各リリースのピンをすべて検証した結果ではありません。ワイルドカードで示されたチップ群から、すべての発注品番への対応を判断することはできません。実際にインストールするファイルで、選定したシンボル、フットプリント、パッケージを確認してください。

!!! note "上流の部品番号表記について"
    OpenSiFli の KiCad ライブラリ README では、チップの行が `SF32LB52XUx` と `SF32LB52xUx` と記載されています。SiFli の命名規則では、大文字 `X` は英字の外部電源タイプ、小文字 `x` は数字のバッテリー駆動タイプを表すワイルドカードです。このページでは、それぞれを μForge の他の資料で使う明示的なグループ SF32LB52B/D/E/G/J および SF32LB520/3/5/7 に展開しています。

[OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) の README では、Package and Content Manager のカタログからのインストールは未対応とされています。手動インストール方法として、リリース ZIP をダウンロードし、マネージャーで **Install from file...** を選ぶ手順が記載されています。また、リリース `1.0.0` のページには、ZIP を KiCad のライブラリディレクトリに展開する方法と、`metadata.json` を使ってマネージャーからインストールする方法も記載されています。使用するリリースに付属の説明に従ってください。README では、インストール後のシンボル／フットプリントライブラリ名を `PCM_SiFli` としています。

## レビューチェックリスト { #review-checklist }

- [ ] 回路図をリリースする前に、ライブラリの部品番号とパッケージの接尾辞を BOM と照合する。
- [ ] シンボルのピン名とピン番号を、チップのデータシートおよびデバイス固有のハードウェア設計ガイドと照合する。
- [ ] フットプリントのパッド寸法、ピッチ、コートヤード、露出パッドの処理、実装クリアランスを公式パッケージ図で確認する。
- [ ] 3D モデルは配置と機械的な干渉確認の補助としてのみ使う。製造寸法や実装寸法の根拠にはしない。
- [ ] JLCEDA / LCEDA Pro、PADS、OrCAD では、Wiki のダウンロード一覧に部品ごとの対応状況がないため、インポート後に確認する。
- [ ] 新規設計の前にライブラリの更新を確認し、レビュー済みのアーカイブまたはパッケージのバージョンをプロジェクトと一緒に保存する。SiFli は新しいデバイスやモジュールの適合性確認に伴ってファイルを更新する場合がある。更新で部品が追加・変更される場合があるため、差し替える前に再確認する。

## 関連ページ { #related-pages }

- [SF32 ファミリー](../../sf32-products/family/SF32_family.md)
- [SF32 命名規則](../../sf32-products/family/SF32_namingrule.md)
- [SF32 承認ベンダーリスト](sifli-approved-vendor-list.md)
