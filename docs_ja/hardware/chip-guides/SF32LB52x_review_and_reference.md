---
icon: lucide/clipboard-check
hide:
    - navigation
description: "SF32LB52x ハードウェア設計ガイドの設計レビュー用チェックリスト、関連資料と参考資料、回路図／PCB／機構／電源の付録、および改訂履歴。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB52x ハードウェア設計ガイド — 設計レビュー用チェックリストと参考資料 { #sf32lb52x-hardware-design-guide-design-review-checklist-and-references }

!!! note "SF32LB52x ハードウェア設計ガイドの一部"
    このページでは第 7～10 節の設計レビュー用チェックリスト、関連資料と参考資料、付録、改訂履歴を扱います。[PCB レイアウト指針](SF32LB52x_pcb_layout.md)に戻ってください。

## 7. 設計レビュー用チェックリスト { #7-design-review-checklist }

- [ ] 最小システムのレビューが完了し、正確なバリアント、パッケージ、電源ツリー、ブートメディア、ブートストラップピン、デバッグ／ダウンロードアクセス、クロック、ウェイクアップ方針がすべて文書化されている
- [ ] 正確なチップ型番と電源バリアントを確認し、2 つのバリアントの電源回路図を混在させていない
- [ ] プロセッサーの電源ピン（VBUS/VBAT/VCC、または PVDD/VDDIOA/VDD_SIP）がデータシートの電圧範囲内にある
- [ ] BUCK インダクターが 4.7 μH ±20%、DCR ≤0.4 Ω、Isat ≥450 mA の要件を満たしている
- [ ] バッテリー駆動バリアント: 充電経路、OVP デバイスの電圧範囲、内蔵 LDO 出力のコンデンサー容量を確認している
- [ ] 48 MHz と 32.768 kHz の水晶振動子が推奨仕様を満たし、配線とキープアウト領域の要件にも適合している
- [ ] RF 配線のインピーダンスが 50 Ω で、整合回路がチップの近くに配置されている
- [ ] ストレージからのブート設定（外部レギュレーター給電バリアントの eMMC オプションを含む）が Bootstrap ピンの設定と一致している
- [ ] ストレージ電源スイッチの制御ピンが対象バリアントに適合することを確認し、リリース前に公式チェックリストとアプリケーションノート間のPA11/PA21の不一致を解消する
- [ ] USB DP/DN が差動ペアで配線され、差動インピーダンスが 90 Ω である
- [ ] SDIO 信号がまとめて配線され、総配線長 ≤50 mm、グループ内の配線長差 ≤6 mm を満たし、GND シールドが設けられている
- [ ] DBG_UART/SWD の多重化ピンと量産テストポイントを確保している
- [ ] 主要部品の型番を最新の[SiFli 承認ベンダーリスト][SiFli 承認ベンダーリスト (AVL)]と照合している

## 8. 関連資料と参考資料 { #8-related-documents-and-references }

[SF32LB52x データシート (公式 PDF)]: https://downloads.sifli.com/silicon/DS0052-SF32LB52x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V2p4.pdf?
[SF32LB52x ユーザーマニュアル (公式 PDF)]: https://downloads.sifli.com/silicon/UM0052-SF32LB52x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p3.pdf?
[SF32LB52 ハードウェアリファレンスデザイン一式]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-%E7%A1%AC%E4%BB%B6%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1-20250619.zip?
[SF32LB520/3/5/7 ハードウェアアプリケーションノート (ソース)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md
[52B/D/E/G/J ハードウェアアプリケーションノート (ソース)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md
[ローカル版 SiFli 承認ベンダーリスト]: ../cad-components/sifli-approved-vendor-list.md
[SiFli SF32LB52 回路図・PCB チェックリスト (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli チップハードウェア設計ガイド一覧 (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB52x データシート (公式 PDF)]__
- :fontawesome-solid-file-pdf: __[SF32LB52x ユーザーマニュアル (公式 PDF)]__
- :fontawesome-solid-file-zipper: __[SF32LB52 ハードウェアリファレンスデザイン一式]__
- :fontawesome-brands-github: __[SF32LB520/3/5/7 ハードウェアアプリケーションノート (ソース)]__
- :fontawesome-brands-github: __[52B/D/E/G/J ハードウェアアプリケーションノート (ソース)]__
- :fontawesome-solid-file-excel: __[ローカル版 SiFli 承認ベンダーリスト]__
- :fontawesome-solid-file-excel: __[SiFli SF32LB52 回路図・PCB チェックリスト (XLSX)]__
- :fontawesome-brands-wikipedia-w: __[SiFli チップハードウェア設計ガイド一覧 (Wiki)]__

</div>

追加の参考資料:

- [SF32LB52x 製品概要](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf)
- [SF32LB52x データシート](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf)
- [SF32LB52x リファレンスマニュアル](https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf)
- [SF32LB520/3/5/7 ハードウェアアプリケーションノート](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md)
- [52B/D/E/G/J ハードウェアアプリケーションノート](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md)

[回路図チェックリスト](SF32LB52x_schematic_checklist.md)（第 5.8 節）と[PCB レイアウトチェックリスト](SF32LB52x_pcb_layout_checklist.md)（第 6.15 節）には、同じ *SF32LB52 回路図・PCB チェックリスト*（V1.0、2026-01-21）の全項目を、確認対象となる回路図および PCB レイアウトの指針とあわせて掲載しています。

## 9. 付録 { #9-appendices }

SiFli のアプリケーションノートには、次の回路図、PCB レイアウト、機構、電源の参考図が掲載されています。ここではレビュー証跡として元資料の図を掲載します。主な設計指針は引き続き第 5 節と第 6 節を参照してください。

!!! note "図の使い方"
    これらの図は、元のアプリケーションノートにある回路例およびレイアウト例として参照してください。正確なデバイスと製品に対する最終実装は、ルールの説明、表、データシート、リファレンスマニュアル、最新版のリファレンスデザイン一式、AVL に基づいて確認してください。

<div align="center"><em>表 9-1: 付録一覧</em></div>

<div align="center" markdown>

| 確認したい内容 | 参照先 |
|:---|:---|
| SF32LB52x の両設計グループにおけるスマートウォッチのブロック図例 | 付録 A: 代表的なスマートウォッチの構成例 |
| RF、ストレージ／ブート、ボタン、モーター、オーディオ、クロック、USB、DC/DC の回路図例 | 付録 B: 回路図例 |
| RF、ストレージ、オーディオ、積層、ファンアウト、クロック、USB、DC/DC の PCB 配置・配線例 | 付録 C: PCB レイアウト例 |
| パッケージ外形、形状、ランドパターンの図面 | 付録 D: 機構 |
| 充電、OVP、電源ツリー、PMU の回路図およびレイアウト例 | 付録 E: 電源 |

</div>

### 9.1. 付録 A. 代表的なスマートウォッチの構成例 { #appendix-a-a-typical-smart-watch-application }

一般的な SF32LB52x スマートウォッチの設計には、MCU、ディスプレイ、タッチコントローラー、ストレージ、センサー、振動モーター、オーディオ入出力、Bluetooth アンテナ、クロック源、電源管理、デバッグ用インターフェース、量産テスト用インターフェースが含まれます。バッテリー駆動設計では、さらに充電管理回路が必要です。
図 9.1-1 と 9.1-2 は、QSPI ディスプレイ、SPI 接続の加速度センサー／ジャイロ、I2C 接続の心拍数モジュール、アナログマイクと DAC からアンプへの音声経路、PWM 駆動の振動モーター、48 MHz クロック、Bluetooth の RF 経路、SWD/UART を示しています。記載された QSPI NAND、SD NAND、NOR Flash はストレージの例であり、対応ブート媒体の全一覧ではありません。両図には外付け充電器と Buck/LDO 経路が描かれていますが、この構成を必須回路とせず、実際の電源構成は第 5.2 節に基づいて選定してください。


![図 9.1-1: SF32LB520/3/5/7 のスマートウォッチアプリケーション構成図](../../sf32-products/chips/assets/52xA/sf32lb52x-A-watch-app-diagram-52x.png){ loading="lazy" }

<div align="center"><em>図 9.1-1: SF32LB520/3/5/7 のスマートウォッチアプリケーション構成図</em></div>

![図 9.1-2: 52B/D/E/G/J のスマートウォッチアプリケーション構成図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-watch-app-diagram-52X.png){ loading="lazy" }

<div align="center"><em>図 9.1-2: 52B/D/E/G/J のスマートウォッチアプリケーション構成図</em></div>

### 9.2. 付録 B. 回路図例 { #appendix-b-reference-schematics }

**RF**

![図 9.2-1: RF フロントエンドのブロック図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ loading="lazy" }

<div align="center"><em>図 9.2-1: RF フロントエンドのブロック図</em></div>

![図 9.2-2: RF 回路図例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ loading="lazy" }

<div align="center"><em>図 9.2-2: RF 回路図例</em></div>

![図 9.2-3: RF 配線の回路図例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ loading="lazy" }

<div align="center"><em>図 9.2-3: RF 配線の回路図例</em></div>

**ストレージとブート**

![図 9.2-4: SF32LB520/3/5/7 ブートストラップ例](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ loading="lazy" }

<div align="center"><em>図 9.2-4: SF32LB520/3/5/7 ブートストラップ例</em></div>

![図 9.2-5: 52B/D/E/G/J ブートストラップ例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ loading="lazy" }

<div align="center"><em>図 9.2-5: 52B/D/E/G/J ブートストラップ例</em></div>

![図 9.2-6: SDIO 回路図例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ loading="lazy" }

<div align="center"><em>図 9.2-6: SDIO 回路図例</em></div>

**ボタン、モーター、オーディオ**

![図 9.2-7: SF32LB520/3/5/7 振動モーター回路例](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ loading="lazy" }

<div align="center"><em>図 9.2-7: SF32LB520/3/5/7 振動モーター回路例</em></div>

![図 9.2-8: 52B/D/E/G/J 振動モーター回路例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ loading="lazy" }

<div align="center"><em>図 9.2-8: 52B/D/E/G/J 振動モーター回路例</em></div>

![図 9.2-9: 電源ボタンの回路例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ loading="lazy" }

<div align="center"><em>図 9.2-9: 電源ボタンの回路例</em></div>

![図 9.2-10: ロータリーエンコーダーのボタン回路例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ loading="lazy" }

<div align="center"><em>図 9.2-10: ロータリーエンコーダーのボタン回路例</em></div>

![図 9.2-11: アナログ MEMS マイク回路例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ loading="lazy" }

<div align="center"><em>図 9.2-11: アナログ MEMS マイク回路例</em></div>

![図 9.2-12: アナログ ECM マイク回路例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ loading="lazy" }

<div align="center"><em>図 9.2-12: アナログ ECM マイク回路例</em></div>

![図 9.2-13: アナログ DAC-PA 接続例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ loading="lazy" }

<div align="center"><em>図 9.2-13: アナログ DAC-PA 接続例</em></div>

![図 9.2-14: オーディオ電源回路例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>図 9.2-14: オーディオ電源回路例</em></div>

![図 9.2-15: オーディオ ADC 回路例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>図 9.2-15: オーディオ ADC 回路例</em></div>

![図 9.2-16: オーディオ DAC 回路例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>図 9.2-16: オーディオ DAC 回路例</em></div>

**クロック**

![図 9.2-17: 48 MHz 水晶振動子回路](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ loading="lazy" }

<div align="center"><em>図 9.2-17: 48 MHz 水晶振動子回路</em></div>

![図 9.2-18: 32.768 kHz 水晶振動子回路](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ loading="lazy" }

<div align="center"><em>図 9.2-18: 32.768 kHz 水晶振動子回路</em></div>

**USB**

![図 9.2-19: USB 回路図例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ loading="lazy" }

<div align="center"><em>図 9.2-19: USB 回路図例</em></div>

**DC/DC**

![図 9.2-20: DC/DC 回路図例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ loading="lazy" }

<div align="center"><em>図 9.2-20: DC/DC 回路図例</em></div>

### 9.3. 付録 C. PCB レイアウト例 { #appendix-c-reference-pcb-layouts }

**RF**

![図 9.3-1: RF の PCB 整合回路例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ loading="lazy" }

<div align="center"><em>図 9.3-1: RF の PCB 整合回路例</em></div>

![図 9.3-2: RF の PCB 配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ loading="lazy" }

<div align="center"><em>図 9.3-2: RF の PCB 配線例</em></div>

**ストレージ**

![図 9.3-3: SDIO の PCB 配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ loading="lazy" }

<div align="center"><em>図 9.3-3: SDIO の PCB 配線例</em></div>

**オーディオ**

![図 9.3-4: オーディオ電源の PCB 配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>図 9.3-4: オーディオ電源の PCB 配線例</em></div>

![図 9.3-5: オーディオ ADC の PCB 配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>図 9.3-5: オーディオ ADC の PCB 配線例</em></div>

![図 9.3-6: オーディオ DAC の PCB 配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>図 9.3-6: オーディオ DAC の PCB 配線例</em></div>

**PCB の基本構成**

![図 9.3-7: PCB 積層例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ loading="lazy" }

<div align="center"><em>図 9.3-7: PCB 積層例</em></div>

![図 9.3-8: PCB 設計ルール例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ loading="lazy" }

<div align="center"><em>図 9.3-8: PCB 設計ルール例</em></div>

![図 9.3-9: QFN ファンアウト例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ loading="lazy" }

<div align="center"><em>図 9.3-9: QFN ファンアウト例</em></div>

![図 9.3-10: 水晶振動子の配置例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ loading="lazy" }

<div align="center"><em>図 9.3-10: 水晶振動子の配置例</em></div>

**クロック配線**

![図 9.3-11: 48 MHz 水晶振動子の配線モデル](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ loading="lazy" }

<div align="center"><em>図 9.3-11: 48 MHz 水晶振動子の配線モデル</em></div>

![図 9.3-12: 48 MHz 水晶振動子の配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>図 9.3-12: 48 MHz 水晶振動子の配線例</em></div>

![図 9.3-13: 32.768 kHz 水晶振動子の配線モデル](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ loading="lazy" }

<div align="center"><em>図 9.3-13: 32.768 kHz 水晶振動子の配線モデル</em></div>

![図 9.3-14: 32.768 kHz 水晶振動子の配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>図 9.3-14: 32.768 kHz 水晶振動子の配線例</em></div>

**USB**

![図 9.3-15: USB の PCB 配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ loading="lazy" }

<div align="center"><em>図 9.3-15: USB の PCB 配線例</em></div>

![図 9.3-16: USB レイアウト例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ loading="lazy" }

<div align="center"><em>図 9.3-16: USB レイアウト例</em></div>

![図 9.3-17: USB 配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ loading="lazy" }

<div align="center"><em>図 9.3-17: USB 配線例</em></div>

**DC/DC**

![図 9.3-18: DC/DC の PCB 配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ loading="lazy" }

<div align="center"><em>図 9.3-18: DC/DC の PCB 配線例</em></div>

### 9.4. 付録 D. 機構 { #appendix-d-mechanical }

![図 9.4-1: SF32LB520/3/5/7 パッケージレイアウト](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ loading="lazy" }

<div align="center"><em>図 9.4-1: SF32LB520/3/5/7 パッケージレイアウト</em></div>

![図 9.4-2: 52B/D/E/G/J パッケージレイアウト](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ loading="lazy" }

<div align="center"><em>図 9.4-2: 52B/D/E/G/J パッケージレイアウト</em></div>

![図 9.4-3: QFN68L パッケージ寸法](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ loading="lazy" }

<div align="center"><em>図 9.4-3: QFN68L パッケージ寸法</em></div>

![図 9.4-4: QFN68L パッケージ形状](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ loading="lazy" }

<div align="center"><em>図 9.4-4: QFN68L パッケージ形状</em></div>

![図 9.4-5: QFN68L 推奨フットプリント](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ loading="lazy" }

<div align="center"><em>図 9.4-5: QFN68L 推奨フットプリント</em></div>

### 9.5. 付録 E. 電源 { #appendix-e-power }

**SF32LB520/3/5/7 (バッテリー駆動)**

以下の図は、電源パス管理（power-path management、PPM）なし／ありの外付け充電回路と、内蔵充電回路を示します。

![図 9.5-1: PPM なしの外付け充電回路](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ loading="lazy" }

<div align="center"><em>図 9.5-1: 電源パス管理（PPM）なしの外付け充電回路</em></div>

![図 9.5-2: PPM 付きの外付け充電回路](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ loading="lazy" }

<div align="center"><em>図 9.5-2: 電源パス管理（PPM）付きの外付け充電回路</em></div>

![図 9.5-3: 内蔵充電回路](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ loading="lazy" }

<div align="center"><em>図 9.5-3: 内蔵充電回路</em></div>

![図 9.5-4: OVP しきい値の設定](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ loading="lazy" }

<div align="center"><em>図 9.5-4: OVP しきい値の設定</em></div>

![図 9.5-5: OVLO 調整式 OVP の適用例](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ loading="lazy" }

<div align="center"><em>図 9.5-5: OVLO 調整式 OVP の適用例</em></div>

![図 9.5-6: 出力電圧を安定化する OVP の適用例](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ loading="lazy" }

<div align="center"><em>図 9.5-6: 出力電圧を安定化する OVP の適用例</em></div>

![図 9.5-7: SF32LB520/3/5/7 電源構成](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ loading="lazy" }

<div align="center"><em>図 9.5-7: SF32LB520/3/5/7 電源構成</em></div>

![図 9.5-8: VCC 回路図例](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ loading="lazy" }

<div align="center"><em>図 9.5-8: VCC 回路図例</em></div>

![図 9.5-9: VCC の PCB 配線例](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ loading="lazy" }

<div align="center"><em>図 9.5-9: VCC の PCB 配線例</em></div>

![図 9.5-10: 充電回路図例](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ loading="lazy" }

<div align="center"><em>図 9.5-10: 充電回路図例</em></div>

![図 9.5-11: 充電回路の PCB 配線例](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ loading="lazy" }

<div align="center"><em>図 9.5-11: 充電回路の PCB 配線例</em></div>

![図 9.5-12: PMU の TVS 回路例](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ loading="lazy" }

<div align="center"><em>図 9.5-12: PMU の TVS 回路例</em></div>

![図 9.5-13: PMU の EOS 回路例](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ loading="lazy" }

<div align="center"><em>図 9.5-13: PMU の EOS 回路例</em></div>

**52B/D/E/G/J (外部レギュレーター給電)**

![図 9.5-14: 52B/D/E/G/J PMU の PCB 配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ loading="lazy" }

<div align="center"><em>図 9.5-14: 52B/D/E/G/J PMU の PCB 配線例</em></div>

## 10. 改訂履歴 { #10-revision-history }

<div align="center"><em>表 10-1: 改訂履歴</em></div>

<div align="center" markdown>

| バージョン | 日付 | 内容 |
|:---|:---|:---|
| 1.1 | 2026-07 | 電源システムを回路図設計の独立した同列セクションに変更し、クロック生成と RF を別々のセクションに分割。後続の回路図設計セクションの番号も更新。 |
| 1.0 | 本書 | バッテリー駆動バリアントと外部レギュレーター給電バリアントの内容をタブで分け、2 つの公式ハードウェアアプリケーションノートを 1 冊のガイドに統合 |
| 0.0.1 | 10/2024 | `SF32LB520-3-5-7-HW-Application` の初版公開 |
| 0.0.1 | 10/2024 | `SF32LB52B-E-G-J-HW-Application` の初版公開 |

</div>

### 10.1. チェックリストの改訂履歴 { #101-checklist-revision-history }

[回路図チェックリスト](SF32LB52x_schematic_checklist.md)と[PCB レイアウトチェックリスト](SF32LB52x_pcb_layout_checklist.md)の項目別チェックリストは、SiFli の *SF32LB52 回路図・PCB チェックリスト* スプレッドシートに準拠し、本ガイドとは別にバージョン管理します。

<div align="center"><em>表 10.1-1: チェックリストの改訂履歴</em></div>

<div align="center" markdown>

| バージョン | 日付 | 内容 |
|:---|:---|:---|
| 1.0 | 2026-01-21 | SiFli の *SF32LB52 回路図・PCB チェックリスト* V1.0 に基づく初版 |

</div>

[SiFli 承認ベンダーリスト]: ../cad-components/sifli-approved-vendor-list.md
[SiFli 承認ベンダーリスト (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
