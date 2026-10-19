---
icon: lucide/library
description: "SF32チップとモジュール向けにSiFliが公式配布する回路図シンボル／PCBフットプリントライブラリ。JLCEDA/LCEDA Pro、PADS、OrCAD、KiCadのダウンロードとレビュー項目を掲載しています。"
tags:
    - ハードウェア
    - EDA
    - ライブラリ
---

# SF32 EDAツールライブラリ { #sf32-eda-tool-libraries }

## 目的 { #purpose }

SiFliは、SF32チップおよびモジュール向けの回路図シンボルとPCBフットプリントのライブラリを公開しています。データシートを見ながらシンボル、ピン配置、ランドパターンを手作業で描き直すのではなく、これらのファイルを回路図作成とPCBレイアウトの出発点として利用してください。

ライブラリはハードウェアの初期立ち上げ時のリスク低減に役立ちますが、データシート、パッケージ図、デバイス固有のハードウェア設計ガイドの代替にはなりません。リリース前に、選択したライブラリ部品を、正確な部品番号、パッケージ、ピン配置、ランドパターン、設計ガイドと照合してください。

<div class="grid cards" markdown>

- :fontawesome-solid-download: __[JLCEDA / LCEDA Proライブラリ - `.epro2`プロジェクトをダウンロード](https://downloads.sifli.com/hardware/files/documentation/ProPrj_sifli-iclib_2026-04-20.epro2)__
- :fontawesome-solid-download: __[PADSライブラリ - `.ZIP`をダウンロード](https://downloads.sifli.com/hardware/files/documentation/PADS-SIFLI-IC.ZIP)__
- :fontawesome-solid-download: __[OrCADライブラリ - `.OLB`をダウンロード](https://downloads.sifli.com/hardware/files/documentation/OrCAD-SIFLI-IC.OLB)__
- :fontawesome-brands-github: __[KiCadライブラリ - OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries)__

</div>

!!! note "出典"
    直接ダウンロード用のリンクは、[SiFli Wikiのダウンロード一覧](https://wiki.sifli.com/hardware/index.html)から取得しています。ファイルのリンクが変わった場合は、このページで新しいリンクを確認してください。

## ライブラリ形式の概要 { #library-format-at-a-glance }

<div align="center"><em>ライブラリ形式の概要</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| EDAツール | ファイル | 形式 | 内容 | 配布方法 |
|:-----------|:---------|:-----|:-----|:---------|
| JLCEDA / LCEDA Pro | `ProPrj_sifli-iclib_2026-04-20.epro2` | LCEDA Proプロジェクトアーカイブ | 回路図シンボルとPCBフットプリント | 直接ダウンロード |
| PADS | `PADS-SIFLI-IC.ZIP` | Mentor/Siemens PADSライブラリアーカイブ | 回路図シンボルとPCB Decal | 直接ダウンロード |
| OrCAD | `OrCAD-SIFLI-IC.OLB` | Cadence OrCAD Captureライブラリ | 回路図シンボル | 直接ダウンロード |
| KiCad | リリースZIPまたはパッケージメタデータ（`metadata.json`） | KiCadのシンボル、フットプリント、3Dモデルライブラリ | 回路図シンボル、PCBフットプリント、3Dモデル | [GitHubリポジトリー](https://github.com/OpenSiFli/kicad-libraries)、バージョン付きリリース |

</div>

JLCEDA / LCEDA ProとPADSはアーカイブ、OrCADは単独の`.OLB`ライブラリファイルとして配布されています。Wikiのダウンロード一覧には部品ごとの対応表がないため、対象のEDAツールに読み込み、選定した部品が含まれていることを確認してください。

リンク先のKiCadリポジトリーでは、ソース、バージョン付きリリース、対応デバイス表を公開しています。対応状況を確認しやすい一方、すべてのSF32バリアントが含まれることを保証するものではありません。

## KiCadライブラリの詳細 { #kicad-library-detail }

[OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) リポジトリーは、SiFli公式のKiCad用シンボル、フットプリント、3DモデルライブラリをCC-BY-SA-4.0で提供しています。このレビューでは2026-10-05に[リリース`1.0.0`](https://github.com/OpenSiFli/kicad-libraries/releases/tag/1.0.0)を確認しました。新規設計の前に、より新しいリリースがないか確認してください。

<div align="center"><em>KiCadライブラリの対応状況</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 部品番号 | パッケージ | シンボル | フットプリント | 3Dモデル |
|:---------|:-----------|:--------:|:--------------:|:---------:|
| SF32LB52B/D/E/G/J | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB520/3/5/7 | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB52-MOD-1モジュール | - | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-xmark: |

</div>

この表は2026-10-05に確認したリポジトリーのREADMEに基づくもので、各リリースのピンをすべて検証した結果ではありません。ワイルドカードで示されたチップ群から、すべての発注品番への対応を判断することはできません。実際にインストールするファイルで、選定したシンボル、フットプリント、パッケージを確認してください。

!!! note "上流の部品番号表記について"
    OpenSiFliのKiCadライブラリREADMEでは、チップの行が`SF32LB52XUx`と`SF32LB52xUx`と記載されています。SiFliの命名規則では、大文字`X`は英字の外部電源タイプ、小文字`x`は数字のバッテリー駆動タイプを表すワイルドカードです。このページでは、それぞれを μForgeの他の資料で使う明示的なグループSF32LB52B/D/E/G/JおよびSF32LB520/3/5/7に展開しています。

[OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) のREADMEでは、Package and Content Managerのカタログからのインストールは未対応とされています。手動インストール方法として、リリースZIPをダウンロードし、マネージャーで **Install from file...** を選ぶ手順が記載されています。また、リリース`1.0.0`のページには、ZIPをKiCadのライブラリディレクトリに展開する方法と、`metadata.json`を使ってマネージャーからインストールする方法も記載されています。使用するリリースに付属の説明に従ってください。READMEでは、インストール後のシンボル／フットプリントライブラリ名を`PCM_SiFli`としています。

## レビューチェックリスト { #review-checklist }

- [ ] 回路図をリリースする前に、ライブラリの部品番号とパッケージの接尾辞をBOMと照合する。
- [ ] シンボルのピン名とピン番号を、チップのデータシートおよびデバイス固有のハードウェア設計ガイドと照合する。
- [ ] フットプリントのパッド寸法、ピッチ、コートヤード、露出パッドの処理、実装クリアランスを公式パッケージ図で確認する。
- [ ] 3Dモデルは配置と機械的な干渉確認の補助としてのみ使う。製造寸法や実装寸法の根拠にはしない。
- [ ] JLCEDA / LCEDA Pro、PADS、OrCADでは、Wikiのダウンロード一覧に部品ごとの対応状況がないため、インポート後に確認する。
- [ ] 新規設計の前にライブラリの更新を確認し、レビュー済みのアーカイブまたはパッケージのバージョンをプロジェクトと一緒に保存する。SiFliは新しいデバイスやモジュールの適合性確認に伴ってファイルを更新する場合がある。更新で部品が追加・変更される場合があるため、差し替える前に再確認する。

## 関連ページ { #related-pages }

- [SF32ファミリー](../../sf32-products/family/SF32_family.md)
- [SF32命名規則](../../sf32-products/family/SF32_namingrule.md)
- [SF32承認ベンダーリスト](sifli-approved-vendor-list.md)
