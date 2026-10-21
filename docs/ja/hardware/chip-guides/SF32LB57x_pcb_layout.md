---
icon: lucide/layers
hide:
    - navigation
description: "SF32LB57x MCUのPCBレイアウト指針。基板積層、重要な設計制約、電源／水晶／RF／アナログ／オーディオ／高速信号の配線、EMI／ESD／EOS対策、参考図を解説します。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB57xハードウェア設計ガイド — PCBレイアウト指針 { #sf32lb57x-hardware-design-guide-pcb-layout-guidelines }

!!! note "SF32LB57xハードウェア設計ガイドの一部"
    このページでは、第6節「PCBレイアウト指針」を扱います。[ストレージと製造](SF32LB57x_schematic_storage_mfg.md)に戻るか、[設計レビューのチェックリストと参考資料](SF32LB57x_review_and_reference.md)に進んでください。

## 6. PCBレイアウト指針 { #6-pcb-layout-guidelines }

### 6.1. 基板積層構成 { #61-stack-up }

SF32LB57xには、QFN68L（7 × 7 mm、68ピン、0.35 mmピッチ）とQFN80L（8 × 8 mm、80ピン、0.35 mmピッチ）のパッケージがあります。QFN設計では通常4層のPTH基板を使用でき、片面または両面に部品を配置でき、たとえばコンデンサーを基板の裏面に配置することもできます。<!-- BGA-ONLY -->BGA112パッケージは5.4 × 4.4 mm、112ボール、0.4 mmピッチです。BGA設計では通常4層以上が必要で、ファンアウトの難易度に応じて1次HDIのブラインド／埋め込みビアを使用できます。部品は片面または両面に配置できます。<!-- /BGA-ONLY -->

適切な積層構成では、次の点を確保します。

- 重要部品を表層に配置でき、配線を短くできること。
- 内層に切れ目のないグラウンドプレーンを設けること。
- 低インピーダンスの電源分配を確保すること。
- 高速信号、RF、水晶、オーディオ、アナログ信号に連続したリファレンスグラウンドを確保すること。

参考積層図に示されている材料と総厚みの範囲を以下に示します。最終的な積層構成と完成基板厚の公差は、基板メーカーに確認してください。

<div align="center"><em>表 6.1-1: QFN参考積層の材料と厚み</em></div>

<div align="center" markdown>

| 参考積層 | コア材 | プリプレグ | 総厚み範囲 |
|:-----|:-----|:-----|:-----|
| QFN、1.6 mm | 1.1 mm H/HOZ銅箔付きコア | 7628 RC49%、材料表記8.6 mil、厚さ欄8.28 mil（0.2104 mm） | 1.43～1.74 mm |
| QFN、0.8 mm | 0.25 mm H/HOZ銅箔なしコア | 7628 RC49%、材料表記8.6 mil、厚さ欄8.28 mil（0.2104 mm） | 0.67～0.87 mm |

</div>

!!! warning "原資料におけるQFNプリプレグの材料表記と厚さの不一致"
    PCB設計ガイド第3.1.2節のQFN積層図3-1-2-1、3-1-2-2（本ページの表6.1-1に転記）では、プリプレグの材料表記が`7628 RC49%, 8.6 mil`ですが、厚さ欄は`8.28 mil (0.2104 mm)`です。原資料は差の理由も製造管理値とすべき値も示していません。SiFliの確認を得るまで、一方を選択したり他方に置き換えたりして、積層構成を確定・発注しないでください。

<!-- BGA-ONLY -->
<div align="center"><em>表 6.1-2: BGA参考積層の材料と厚み</em></div>

<div align="center" markdown>

| 参考積層 | コア材 | プリプレグ | 総厚み範囲 |
|:-----|:-----|:-----|:-----|
| BGA、1.6 mm | 1.3 mm H/HOZ銅箔付きコア | 1080 RC67%、材料表記3.3 mil、厚さ欄3.01 mil（0.0764 mm） | 1.37～1.67 mm |
| BGA、0.8 mm | 0.55 mm H/H銅箔なしコア | 1080 RC67%、材料表記3.3 mil、厚さ欄3.01 mil（0.0764 mm） | 0.70～0.90 mm |

</div>

!!! warning "原資料におけるBGAプリプレグの材料表記と厚さの不一致"
    PCB設計ガイド第3.1.2節のBGA積層図3-1-2-3、3-1-2-4（本ページの表6.1-2に転記）では、プリプレグの材料表記が`1080 RC67%, 3.3 mil`ですが、厚さ欄は`3.01 mil (0.0764 mm)`です。原資料は差の理由も製造管理値とすべき値も示していません。SiFliの確認を得るまで、一方を選択したり他方に置き換えたりして、積層構成を確定・発注しないでください。
<!-- /BGA-ONLY -->

4種類の参考積層はいずれも、L1/L4に1 oz銅箔（1.38 mil、0.0350 mm）、L2/L3の両面にそれぞれ0.60 mil（0.0152 mm）の銅箔を使用します。

4層QFN設計では、次の層構成を推奨します。第1層（表層）：全面グラウンド領域、部品配置、信号配線。第2層：連続したグラウンドプレーンとし、リファレンスグラウンドの連続性を保つため信号を配線しません。第3層：電源プレーン。電源ドメインごとに分割でき、信号配線にも使用できます。第4層（裏層）：信号配線を含む全面グラウンド領域。

### 6.2. PCB重要設計制約の早見表 { #62-critical-pcb-constraint-quick-reference }

<div align="center"><em>表 6.2-1: PCB重要設計制約の早見表</em></div>

<div align="center" markdown>

| 項目 | 制約 / 出典 | 備考 |
|:-----|:-----------------------|:------|
| `VBUS` / `VBAT` | 配線幅 >= 0.4 mm（約16 mil） | 充電器とバッテリーの経路には大電流が流れます。短く太く配線し、ノイズの影響を受けやすい信号から離してください。 |
| `VCC` / `PVDD` | 原資料の値が不一致：PCB設計ガイド第3.2.1節は >= 0.4 mm。セルフチェック表4-2-1-1の項目44（バッテリー駆動バリアント）は`VCC` >= 12 mil、項目47（3.3 V電源バリアント）はタイトルが`PVDD`、確認内容が`VCC`で >= 12 mil。 | 対象レール、適用範囲、配線幅をSiFliに確認してください。これらの記載だけで選定しないでください。 |
| `VDD33_VOUT1` / `VDD33_VOUT2` | 配線幅 >= 10 mil | バッテリー給電バリアントのみ。ソフトスタート時の電流制限、突入電流、許容負荷を確認してください。 |
| `BUCK_LX` / `BUCK_FB` | `BUCK_LX`：>= 10 mil、`BUCK_FB`：> 0.25 mm | `BUCK_LX`は短く太く配線してください。部品配置と銅箔禁止領域は6.3節を参照してください。 |
| `AVDD_BRF` / `AVDD33_AUD` | 配線幅 >= 8 mil | アナログ／RF／オーディオ電源は短く配線してノイズを抑え、個別にフィルターしてください。 |
| USB DP/DN | 90 Ω差動 | 先にESD保護素子を通し、スタブを避け、リファレンスグラウンドを連続させてください。 |
| RFアンテナ配線 | 50 Ωシングルエンド | 表層を優先し、ビアを最小限に抑え、連続したリファレンスグラウンドとグラウンドビアによるシールドを確保してください。 |
| RF配線両側のグラウンド銅箔幅 | 片側あたり >= 60 mil | 両側のグラウンド銅箔を複数のビアでメイングラウンドに接続してください。 |
| 48 MHz水晶配線 | 約3 mm～10 mm | 表層を優先し、グラウンドでシールドし、水晶の下には銅箔禁止領域を設けてください。 |
| 32.768 kHz水晶配線 | <= 10 mm | 配線間隔を確保してシールドし、ノイズ源を避けてください。 |
| 水晶の配置 | チップのクロックピンから >= 1.5 mm、基板端から > 1 mm、PA／充電回路／PMUの発熱源から >= 5 mm | 48 MHzと32.768 kHzの両方に適用します。 |
| MPIバス | 全長 <= 20 mm、グループ内スキュー <= 3 mm | クロック、データ、コマンドをグループとして配線し、連続したリファレンスグラウンドを確保してください。 |
| SDIOバス | 全長 <= 50 mm、グループ内スキュー <= 6 mm | CLK、CMD、DATAをグループとして配線し、連続したリファレンスグラウンドを確保してください。 |
| `VDDIOA` | 配線幅 >= 10 mil | 3.3 V電源のバリアントのみ。 |

</div>

PTH／HDIの設計ルール図には製造例の値も示されています。最小・推奨配線幅はPTHが0.10 mm、HDIが0.075 mm、両者とも最大幅は2.54 mmです。ビア例では、PTHはドリル径0.25 mm／パッド径0.45 mm、HDIマイクロビアは0.10 mm／0.23 mm（貫通ビア例は0.25 mm／0.45 mm）です。これらは参考例です。製造前に基板メーカーの対応能力と実際の設計ルールを確認してください。

### 6.3. 電源配線 { #63-power-layout }

- 大電流の電源経路は短く太く配線してください。
- 充電経路はノイズの影響を受けやすいアナログ、RF、水晶の配線から離してください。
- `VCC`、`PVDD`、`VBUS`、`VBAT`のフィルターコンデンサーはチップの各ピンの近くに配置してください。`VCC` / `PVDD`について、PCB設計ガイド第3.2.1節は0.4 mm以上としていますが、セルフチェック表4-2-1-1の項目47は12 milという矛盾する値を示しています（タイトルは`PVDD`、確認内容は`VCC`）。SiFliが適用要件を確認するまで、いずれのレールについても配線幅を確定しないでください。VDD_VOUT1、VDD_VOUT2、VDD_RET、VDD_RTC、VDD18_VOUT、VDD33_VOUT1、VDD33_VOUT2、AVDD33_AUD、AVDD_BRFなど、その他の出力のフィルターコンデンサーも各ピンの近くに配置します。各配線は入力電流に応じて幅を決め、短く太くして電源リップルを抑え、動作安定性を高めてください。
- PVDD、AVDD_BRF、AVDD33、AVDD33_AUDが同じ電源を共有する場合は、電源源から個別のスター配線で分岐し、上流の配線区間を共有しないでください。
- VBUSとVBATは他の配線と経路を共有しない独立したスター配線とし、充電経路とノイズの影響を受けやすい信号を並走させないでください。
- BUCKインダクターとフィルターコンデンサーはチップの各ピンの近くに配置します。BUCK_LXは短く太く配線し、BUCK_FBの配線幅は0.25 mmを超えるようにします。DC/DC出力コンデンサーのグラウンド端子は、複数のグラウンドビアでメイングラウンドプレーンに接続してください。インダクター直下の表層には銅箔を設けず、隣接層には連続したリファレンスプレーンを確保し、インダクター領域に他の信号を配線しないでください。
- コンデンサーのグラウンドは近傍のビアでメイングラウンドに接続してください。
- 3.3 V電源バリアントでは、主要なアナログ／RF／IO電源レールにスター配線を使用してください。

!!! warning "原資料の電源配線幅とネット名に未解決の不一致があります"
    - **配線幅とレール表記：** 原資料のPCB設計ガイド第3.2.1節は、`VCC`と`PVDD`の両方を0.4 mm以上（約15.7 mil）としています。セルフチェック表4-2-1-1の項目44（バッテリー駆動バリアント）は`VCC`を12 mil以上とし、項目47（3.3 V電源バリアント）はタイトルに`PVDD`、確認内容に`VCC`を記し、12 mil以上としています。原資料はこれらの幅を整合させておらず、項目47ではタイトルと確認内容のどちらが対象レールかも明示していません。修正値を推定したり、両方の電源バリアントに1つの記載を一律に適用したりせず、設計確定前に対象レール、適用範囲、配線幅をSiFliに確認してください。
    - **出力名：** 原資料のPCB設計ガイド第3.2.1節は`VDD_VOUT1` / `VDD_VOUT2`を記載していますが、セルフチェック表4-2-1-1の項目45/46は`VDD33_VOUT1` / `VDD33_VOUT2`を使っています。項目46のタイトルは`VDD33_VOUT1`を重複記載し、確認内容は`VDD33_VOUT2`です。原資料は、これらが別ネットか別名かを説明していません。
    設計を確定する前に、適用する配線幅、項目47の対象ネット、二つの出力名が同一ネットを指すかをSiFliに確認してください。確認なしに幅を選択したり、ネット名を対応付けたり、同一視したりしないでください。

### 6.4. 水晶のレイアウト { #64-crystal-layout }

- RF回路とメインICの下には連続したリファレンスグラウンドを確保し、グラウンドプレーンを分割したりスリットを設けたりしないでください。水晶領域については、原資料が連続したリファレンスグラウンドと水晶下の銅箔除去の両方を求めています。下記の警告を参照し、SiFliが実際の積層構成に応じた境界を確認するまで、この領域の銅箔配置を確定しないでください。
- 水晶はチップのクロックピンから1.5 mm以上、基板端から1 mm超、PA・充電回路・PMUなどの発熱部品から5 mm以上離してください。原資料はパッケージ周囲の表層に0.25 mm以上の銅箔クリアランスを設け、隣接層の禁止領域はリファレンスデザインに従うよう示していますが、この寸法とパッケージ直下の銅箔禁止領域との関係は明確ではありません。レイアウト確定前に、適用する境界をSiFliに確認してください。水晶直下に高速デジタル信号を配線せず、できれば一切の配線を避けてください。電力インダクターなどの磁性部品を水晶に近づけないでください。
- XI/XOは表層のみで配線し、層を変更しないでください。両側に近接したグラウンドビアを並べて立体的にシールドします。負荷コンデンサーは水晶の両側、配線の水晶側端部近くに配置し、コンデンサーのグラウンドパッドを水晶のグラウンドパッド近くに接続してください。電源ビアは水晶配線から離します。
- 48 MHz水晶は表層に配線し、配線長を3～10 mm、幅を0.1 mmとします。平行な48M_XIと48M_XOの間隔を0.15 mm以上確保し、立体的にグラウンドでシールドしてください。VBAT、DC/DC、高速信号から離し、水晶領域では表層と隣接層を空けておきます。
- 32.768 kHz水晶の配線は表層で長さ10 mm以下、幅0.1 mmとしてください。32K_XIと32K_XOの平行配線間隔について、配線モデルは0.15 mm以上、セルフチェック表は配線幅の2倍超（幅0.1 mmなら0.2 mm超）を求めています。SiFliが適用要件を確認するまで、最終的な間隔を決めないでください。立体的にグラウンドでシールドし、水晶領域では表層と隣接層を空けておいてください。

!!! warning "原資料の水晶レイアウト指示に未解決の不一致があります"
    - **GNDシールドと銅箔禁止範囲：** PCB設計ガイド第3.3節は、水晶領域に連続したリファレンスグラウンドを確保し、水晶周辺の表層で銅箔を避けるよう求めています。図3-3-1（本ページの図6.9-30）はパッケージ周囲に0.25 mm以上の間隔を示しています。一方、原資料のセルフチェック表4-3-1の項目6は水晶部品と発振配線の周囲を完全にGNDシールドするよう求め、項目7は4層PTH基板では水晶直下の表層のみ、6層HDI基板では表層と第2層を銅箔禁止としています。シールド領域と銅箔禁止領域の境界、および連続GNDの指示を各積層構成の禁止層にどう適用するかは明記されていません。これは適用範囲の未解決な不一致です。層ごとの銅箔・GNDパターンを推定しないでください。
    - **32.768 kHzの配線間隔：** PCB設計ガイド第3.3節の配線モデル図3-3-4（本ページの図6.9-33）は、平行な`32K_XI` / `32K_XO`配線の間隔を0.15 mm以上としています。原資料のセルフチェック表4-3-1、項目9は基本配線幅の2倍を超える間隔を求めており、ガイド記載の配線幅0.1 mmでは0.2 mmを超えます。最小間隔の要求が互いに矛盾しています。
    - **パッケージ周囲のクリアランス範囲：** 図3-3-1（本ページの図6.9-30）は、パッケージ周囲の表層銅箔クリアランスを0.25 mm以上としています。セルフチェック表4-3-1、項目7は2種類の積層構成について水晶直下で銅箔を避ける層を別途指定していますが、周囲の0.25 mm寸法と直下の禁止領域、隣接層の配線禁止範囲との関係は示されていません。
    これらの不一致と適用範囲の曖昧さは、SiFliの原資料では解決されていません。実際のパッケージと積層構成についてSiFliの確認を得るまで、間隔要件のいずれかを選んだり、層ごとのGND・銅箔禁止境界を推定したりしないでください。

### 6.5. RFレイアウト { #65-rf-layout }

- RFマッチング回路はチップの近く、アンテナから離して配置してください。AVDD_BRFのフィルターコンデンサーはチップのピンのすぐ近くに置き、その接地端子をビアでメイングラウンドプレーンに直接接続します。
- RF配線はできるだけ短くし、ビアの数を実用上可能な限り抑えてください。
- RFは可能な限り表層に配線し、層変更を避けます。適用可能な場合は配線幅10 mil超を推奨します。立体的なグラウンドシールドを設け、鋭角と直角を避け、基板スタックアップに基づいてインピーダンスを50 Ωに制御してください。配線の両側にグラウンドビアを密に配置し、連続したビアフェンスを形成します。
- アンテナのクリアランスは、アンテナメーカーの要件と製品の工業デザイン上の制約に従って確保してください。
- マッチング部品のパッド幅と配線幅の差はインピーダンス不連続の原因になります。パッド寸法に合わせてその下のグラウンドプレーンを切り欠くと、インピーダンスの連続性を改善できる場合があります。
- IPEXアンテナコネクターを使う場合は、その直下のすべてのPCB層で銅箔を除去してください。PCBアンテナは実基板上でシミュレーションと調整を行います。CLCマッチング回路を確保し、できるだけアンテナの近くに配置してください。
- RF配線はLCD FPC、USB、SDIO、DC/DC、水晶、充電経路から離してください。

### 6.6. アナログとオーディオ { #66-analog-and-audio }

- AVDD33_AUD、MIC_BIAS、AUD_VREFのフィルターコンデンサーは各チップピンの近くに配置し、グラウンド端子をPCBのメイングラウンドに確実に接続してください。
- アナログ電源のデカップリングコンデンサーをチップの近くに配置してください。
- オーディオ差動配線の長さを合わせ、RCネットワークをチップの近くに配置してください。
- ADCP入力の周辺部品をチップピンの近くに配置し、配線を短くして立体的にグラウンドでシールドし、強い干渉源から離してください。
- DACP/DACN出力の周辺部品をチップピンの近くに配置します。各P/Nペアを差動配線し、できるだけ短くして寄生容量を10 pF未満に抑え、立体的にグラウンドでシールドして強い干渉源から離してください。
- GPADC配線は立体的にグラウンドでシールドし、バッテリー検出や温度検出など、干渉源となり得る回路から離してください。
- 大電流のリターン経路をオーディオ領域に通さないでください。

### 6.7. 高速インターフェース { #67-high-speed-interfaces }

- USB DP/DNは90 Ωの差動ペアとして配線し、最初にESD保護素子を通してください。
- MPIストレージ信号はまとめて配線し、総配線長を20 mm以下、グループ内の配線長差を3 mm以下としてください。クロック、データ、コマンド信号を立体的にグラウンドでシールドし、連続したリファレンスグラウンドを確保します。
- SDIO信号はまとめて配線し、総配線長を50 mm以下、グループ内の配線長差を6 mm以下としてください。クロック、コマンド、データ信号を立体的にグラウンドでシールドします。
- RGB/DPI、8080、EPDなどのパラレル表示バスは、連続したリファレンスグラウンド上に配線してください。
- USB PA35（USB_DP）とPA36（USB_DN）は、チップに接続する前にESD保護素子を通してください。90 Ωの差動配線と立体的なグラウンドシールドを適用し、ESD素子のグラウンド端子をメイングラウンドに確実に接続してください。
- EMI調整が必要になる可能性がある高速クロックには、直列抵抗用のフットプリントを確保してください。

### 6.8. EMI、ESD、EOS { #68-emi-esd-and-eos }

- すべての外部インターフェースについてESD保護を確認してください。
- シールドケース外側の表層では、クロックや電源などのノイズ源を長距離配線しないでください。これらは内層に配線します。
- ESD保護素子は対応するコネクターピンのすぐ近くに配置します。信号は必ず保護素子を通してから後段回路へ接続し、保護素子の前で分岐させないでください。接地ピンはビアでメイングラウンドへ直接接続し、短く太く配線します。
- USB、充電器、バッテリーコネクター、キー、タッチ、ディスプレイ、心拍センサー、アンテナは優先度の高い保護対象です。
- USB充電ラインのテストポイントはTVSの前段に配置します。バッテリーコネクター用TVSはチップ回路の前段に配置し、信号がチップに到達する前にTVSを通るようにしてください。
- 充電器入力の保護では、OVP、EOS、ESDをまとめて考慮してください。

### 6.9. PCBレイアウト参考図 { #69-pcb-reference-figures }

以下のSF32LB57xのパッケージ、フットプリント、積層構成、ファンアウト、配線、保護に関する図を、新規設計の主要なPCB参考資料として使用してください。

QFN80Lのランドパターン図は中央露出パッドを5.90 mm、パッケージ図は標準5.50 mm（5.40～5.60 mm）と記載しています。前者はPCBランド、後者はパッケージのパッド寸法であり、同一寸法として置き換えないでください。ライブラリー作成前にパッケージ版とSiFli推奨フットプリントを確認してください。QFN68L/QFN80Lのステンシル図は厚さ0.125 mm、露出パッドのペースト面積率60%を記載しています。開口寸法と面積率の整合性はステンシルメーカーに確認してください。

<!-- BGA-ONLY -->
BGA112のステンシル図は厚さ0.075 mm、112個の0.18 mm角の開口、角R0.05 mmを指定しています。
<!-- /BGA-ONLY -->

![図 6.9-1: QFN68L 7 × 7 × 0.9 mmパッケージ寸法](../../sf32-products/chips/assets/57x/PO-BQFN770E05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-1: QFN68L 7 × 7 × 0.9 mmパッケージ寸法</em></div>

![図 6.9-2: QFN68L 7 × 7 × 1.1 mmパッケージ寸法](../../sf32-products/chips/assets/57x/PO-BQFN770D05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-2: QFN68L 7 × 7 × 1.1 mmパッケージ寸法</em></div>

![図 6.9-3: QFN68L PCBランドパターン](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-3: QFN68L PCBランドパターン</em></div>

![図 6.9-4: QFN68Lステンシル開口部](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-4: QFN68Lステンシル開口部</em></div>

![図 6.9-5: QFN80L 8 × 8 × 0.9 mmパッケージ寸法](../../sf32-products/chips/assets/57x/PO-BQFN880E20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-5: QFN80L 8 × 8 × 0.9 mmパッケージ寸法</em></div>

![図 6.9-6: QFN80L 8 × 8 × 1.1 mmパッケージ寸法](../../sf32-products/chips/assets/57x/PO-BQFN880D20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-6: QFN80L 8 × 8 × 1.1 mmパッケージ寸法</em></div>

![図 6.9-7: QFN80L PCBランドパターン](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-7: QFN80L PCBランドパターン</em></div>

![図 6.9-8: QFN80Lステンシル開口部](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-8: QFN80Lステンシル開口部</em></div>

<!-- BGA-ONLY -->
![図 6.9-9: BGA112 5.4 × 4.4 × 0.98 mmパッケージ寸法](../../sf32-products/chips/assets/57x/PO-ABGA451X33-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-9: BGA112 5.4 × 4.4 × 0.98 mmパッケージ寸法</em></div>

![図 6.9-10: BGA112 5.4 × 4.4 × 1.03 mmパッケージ寸法](../../sf32-products/chips/assets/57x/PO-ABGA451X34-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-10: BGA112 5.4 × 4.4 × 1.03 mmパッケージ寸法</em></div>

![図 6.9-11: BGA112 PCBランドパターン](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-11: BGA112 PCBランドパターン</em></div>

![図 6.9-12: BGA112ステンシル開口部](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-12: BGA112ステンシル開口部</em></div>
<!-- /BGA-ONLY -->

![図 6.9-13: QFN 1.6 mm PCB積層構成の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-13: QFN 1.6 mm PCB積層構成の参考図</em></div>

![図 6.9-14: QFN 0.8 mm PCB積層構成の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-14: QFN 0.8 mm PCB積層構成の参考図</em></div>

<!-- BGA-ONLY -->
![図 6.9-15: BGA 1.6 mm PCB積層構成の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-15: BGA 1.6 mm PCB積層構成の参考図</em></div>

![図 6.9-16: BGA 0.8 mm PCB積層構成の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-16: BGA 0.8 mm PCB積層構成の参考図</em></div>
<!-- /BGA-ONLY -->

![図 6.9-17: PTH PCB設計ルール](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-17: PTH PCB設計ルール</em></div>

![図 6.9-18: PTHビア設計ルール](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-18: PTHビア設計ルール</em></div>

![図 6.9-19: HDI PCB設計ルール](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-19: HDI PCB設計ルール</em></div>

![図 6.9-20: HDIビア設計ルール](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-20: HDIビア設計ルール</em></div>

![図 6.9-21: QFN68表層ファンアウトの参考図](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-21: QFN68表層ファンアウトの参考図</em></div>

![図 6.9-22: QFN80表層ファンアウトの参考図](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-22: QFN80表層ファンアウトの参考図</em></div>

<!-- BGA-ONLY -->
![図 6.9-23: BGA112ファンアウトの参考図](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-23: BGA112ファンアウトの参考図</em></div>
<!-- /BGA-ONLY -->

![図 6.9-24: QFN VCC電源配線](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-24: QFN VCC電源配線</em></div>

<!-- BGA-ONLY -->
![図 6.9-25: BGA VCC電源配線](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-25: BGA VCC電源配線</em></div>
<!-- /BGA-ONLY -->

![図 6.9-26: QFN VBUS／VBAT配線](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-26: QFN VBUS／VBAT配線</em></div>

<!-- BGA-ONLY -->
![図 6.9-27: BGA VBUS／VBAT配線](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-27: BGA VBUS／VBAT配線</em></div>
<!-- /BGA-ONLY -->

![図 6.9-28: QFN DC/DC配線](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-28: QFN DC/DC配線</em></div>

<!-- BGA-ONLY -->
![図 6.9-29: BGA DC/DC配線](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-29: BGA DC/DC配線</em></div>
<!-- /BGA-ONLY -->

![図 6.9-30: 水晶配置の禁止領域](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-30: 水晶配置の禁止領域</em></div>

![図 6.9-31: 48 MHz水晶配線モデル](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-31: 48 MHz水晶配線モデル</em></div>

![図 6.9-32: 48 MHz水晶配線の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-32: 48 MHz水晶配線の参考図</em></div>

![図 6.9-33: 32.768 kHz水晶配線モデル](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-33: 32.768 kHz水晶配線モデル</em></div>

![図 6.9-34: 32.768 kHz水晶配線の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-34: 32.768 kHz水晶配線の参考図</em></div>

![図 6.9-35: RFマッチング回路のレイアウト](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-35: RFマッチング回路のレイアウト</em></div>

![図 6.9-36: RF信号配線の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-36: RF信号配線の参考図</em></div>

![図 6.9-37: オーディオ電源フィルターのレイアウト](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-37: オーディオ電源フィルターのレイアウト</em></div>

![図 6.9-38: アナログオーディオ入力のレイアウト](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-38: アナログオーディオ入力のレイアウト</em></div>

![図 6.9-39: アナログオーディオ出力のレイアウト](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-39: アナログオーディオ出力のレイアウト</em></div>

![図 6.9-40: SDIO配線モデル](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-40: SDIO配線モデル</em></div>

![図 6.9-41: SDIO PCB配線の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-41: SDIO PCB配線の参考図</em></div>

![図 6.9-42: USB部品配置の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-42: USB部品配置の参考図</em></div>

![図 6.9-43: USB配線モデル](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-43: USB配線モデル</em></div>

![図 6.9-44: USB PCB配線の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-44: USB PCB配線の参考図</em></div>

![図 6.9-45: 電源TVS配置の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-45: 電源TVS配置の参考図</em></div>

![図 6.9-46: EOS／TVS接地の参考図](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-46: EOS／TVS接地の参考図</em></div>
