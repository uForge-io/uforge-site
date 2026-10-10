---
icon: lucide/clipboard-check
description: "SF32LB58x ハードウェア設計ガイドの設計レビュー用チェックリスト、関連資料、付録、改訂履歴。"
tags:
    - ハードウェア
    - チップ
hide:
    - navigation
---

# SF32LB58x ハードウェア設計ガイド — 設計レビュー用チェックリストと参考資料 { #sf32lb58x-hardware-design-guide-design-review-checklist-and-references }

!!! note "SF32LB58x ハードウェア設計ガイドの一部"
    このページでは、第 7～10 節（設計レビュー用チェックリスト、関連資料、付録、改訂履歴）を扱います。[PCB レイアウトチェックリスト](SF32LB58x_pcb_layout_checklist.md)に戻ります。

## 7. 設計レビュー用チェックリスト { #7-design-review-checklist }

- [ ] 選択した型番にパッケージ内蔵された Flash／PSRAM の組み合わせが製品要件を満たすことを確認する。
- [ ] PMU 電源（PVDD1/PVDD2/BUCK/LDO）およびその他すべての電源ピンの電圧が、データシートの規定範囲内であることを確認する。
- [ ] 選定した BUCK インダクターの公称インダクタンスが 4.7 µH、DCR ≤ 0.4 Ω、Isat ≥ 500 mA であることを確認する。
- [ ] 48 MHz および 32.768 kHz の水晶振動子が推奨仕様を満たし、配線とキープアウト領域が設計要件に適合することを確認する。
- [ ] RF 配線が 50 Ω の制御インピーダンスであることを確認し、マッチング回路をチップの近くに配置する。
- [ ] 選択した外部ストレージインターフェースが想定するブート設計に適合することを確認する。これとは別に、Mode ピンが意図した起動モードに設定されていることを確認する（High：ダウンロードモード、Low：ユーザーアプリケーション起動）。
- [ ] ディスプレイインターフェース（MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI）が各方式のインピーダンスと長さ合わせの要件を満たすことを確認する。DSI については、差動インピーダンス 100 Ω、各差動ペア内の長さ差 ≤0.5 mm、差動ペア間の長さ差 ≤2 mm を確認する。
- [ ] USB 配線が 90 Ω の差動インピーダンス要件を満たすことを確認する。SDIO 信号はまとめて配線し、全長を ≤50 mm、グループ内の長さ差を ≤6 mm にする。
- [ ] SWD へのアクセスと、利用可能な 6 系統の UART から選んだデバッグ出力用インターフェース（信号ピンを含む）、および量産試験ポイントを確保する。
- [ ] BGA パッドのビアが中央に配置され、チップ下のグランドプレーンが連続していることを確認する。
- [ ] 主要部品の型番を最新版の[SiFli 承認ベンダーリスト (AVL)]と照合する。
- [ ] レビュー用資料に、スタックアップと製造能力、インピーダンスと DRC の結果、AVL、レイアウトの主要箇所のスクリーンショットを含める。
- [ ] 試作リリース前に回路図、レイアウト、製造に関する未解決事項を解消する。未解決のまま残す場合は、明示的に記録して追跡する。

## 8. 関連資料と参考文献 { #8-related-documents-and-references }

電気的仕様の限界値、パッケージ情報、ピン多重化、ソフトウェア設定、部品認定を確認するときは、最新の公式資料を参照してください。

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB58x 製品概要]__
- :fontawesome-solid-file-pdf: __[SF32LB58x データシート]__
- :fontawesome-solid-file-pdf: __[SF32LB58x ユーザーマニュアル]__
- :fontawesome-solid-file-lines: __[SF32LB58x ハードウェアアプリケーションノート]__
- :fontawesome-solid-file-excel: __[SiFli 承認ベンダーリスト (AVL)]__
- :fontawesome-brands-wikipedia-w: __[SiFli チップハードウェア設計ガイド一覧 (Wiki)]__

</div>

[回路図チェックリスト](SF32LB58x_schematic_checklist.md)（第 5.8 節）と[PCB レイアウトチェックリスト](SF32LB58x_pcb_layout_checklist.md)（第 6.18 節）を合わせると、*SF32LB58x Schematic & PCB Checklist*（V1.0、2026-01-21）のうち、該当する回路図および PCB の項目が、対応する設計ガイダンスとともに再掲されています。

[SF32LB58x 製品概要]: https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf
[SF32LB58x データシート]: https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf
[SF32LB58x ユーザーマニュアル]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58x ハードウェアアプリケーションノート]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[SiFli 承認ベンダーリスト (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli チップハードウェア設計ガイド一覧 (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. 付録 { #9-appendices }

付録では、アプリケーションやリファレンスデザインの背景をまとめます。第 5 節と第 6 節の回路図／PCB の設計ルールを適用した後、レビューの補助資料として使ってください。

<div align="center"><em>表 9-1: 付録一覧</em></div>

<div align="center" markdown>

| 必要な情報 | 参照先 |
|:---|:---|
| 高機能ウェアラブルまたはスマート端末のアプリケーション概要 | 付録 A: 典型的なスマートウェアラブル機器またはスマート端末 |
| 回路図のスクリーンショットと回路レベルの例 | 第 5 節および SF32LB58x ハードウェアアプリケーションノート |
| BGA、HDI、RF、DSI、USB、SDIO、オーディオ、電源の PCB レイアウト例 | 第 6 節および SF32LB58x ハードウェアアプリケーションノート |

</div>

### 9.1. 付録 A. 典型的なスマートウェアラブル機器またはスマート端末 { #appendix-a-a-typical-smart-wearable-or-smart-terminal }

典型的な SF32LB58x スマートウェアラブル／スマート端末の設計には、MCU、PMIC、高解像度ディスプレイ、タッチコントローラー、ブート用ストレージ、外部メモリーまたは eMMC、センサー、振動モーター、オーディオ入出力、Bluetooth アンテナ、水晶振動子、USB、デバッグアクセス、量産試験用アクセスが含まれます。BGA256 パッケージと高速ディスプレイ／ストレージインターフェースを採用するため、HDI プロセスの選定は単なる PCB レイアウト上の詳細ではなく、システムアーキテクチャの一部です。

## 10. 改訂履歴 { #10-revision-history }

<div align="center"><em>表 10-1: 改訂履歴</em></div>

<div align="center" markdown>

| バージョン | 日付 | 備考 |
|:---|:---|:---|
| 1.0 | 2026-07 | 回路図、PCB、検証、量産レビューのガイダンスを含む SF32LB58x ハードウェア設計ガイドを更新。 |
| 0.0.1 | 1/2025 | `SF32LB58x-HW-Application` の公式ドラフト版を公開。 |

</div>

### 10.1. チェックリストの改訂履歴 { #101-checklist-revision-history }

[回路図チェックリスト](SF32LB58x_schematic_checklist.md)および[PCB レイアウトチェックリスト](SF32LB58x_pcb_layout_checklist.md)に掲載した項目別チェックリストは、SiFli の *SF32LB58x Schematic & PCB Checklist* ワークブックに従い、設計ガイドとは別にバージョン管理しています。

<div align="center"><em>表 10.1-1: チェックリストの改訂履歴</em></div>

<div align="center" markdown>

| 番号 | バージョン | 日付 | リリースノート |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | 回路図・PCB チェックリストの初版リリース |

</div>
