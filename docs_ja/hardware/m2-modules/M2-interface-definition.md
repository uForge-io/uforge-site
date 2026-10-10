---
icon: lucide/plug
description: "M2／M2xM のコンタクト割り当て案と、未検証の M2xN／M2xA 概要および信号共有に関する注記。"
tags:
  - ハードウェア
  - モジュール
  - インターフェース
---

# M2 インターフェース定義 { #m2-interface-definition }

!!! warning "インターフェース定義案"
    このページには M2 インターフェース案をまとめています。M2 と M2xM のシートを含むローカル提案ワークブックがありますが、同ワークブックが参照する別ファイル `M2E接口定义_0714.xlsx` は見つからず、提案の版数や承認元も確認できませんでした。割り当てや数値を裏付ける SiFli の一次資料も確認できていません。ワークブックには M2xN／M2xA のシートがないため、以下の該当概要は未検証です。これはリリース済みの μForge.io インターフェース規格ではありません。すべて暫定案として扱い、量産設計に進む前に、選択したモジュール、キャリア基板、コネクター、電気的制限、ピン多重化を確認してください。

## 適用範囲 { #scope }

ローカル提案ワークブックの M2 と M2xM の各シートは位置を 1～75 で番号付けし、コンタクト表では 24～31 を省略しているため、67 個の番号付きコンタクトを示しています。両シートはマップを M.2 Key-E コネクターとして記載し、M2xM シートには同じモジュールに M2 ベースも必要とあります。これらは提案上の記載であり、[PCI-SIG の M.2 仕様](https://pcisig.com/specification-overview/pci-express-m2)への準拠やモジュールとキャリア基板の相互交換可能性、実際のコネクター数・配置を証明するものではありません。このページには M2xN と M2xA の概要もありますが、照合できる元のコンタクトマップ資料は見つかっていません。

- **M2** — ディスプレイ、オーディオ、ストレージ、デバッグ、汎用組み込み I/O を接続します。
- **M2xM** — ディスプレイ、カメラ、PDM のマルチメディア割り当て案です。草案概要には I2S／PCM も記載されていますが、利用可能な M2xM シートには割り当てがありません。
- **M2xN** — ネットワーク、USB、CAN、UART 信号を扱います。
- **M2xA** — モーター制御、アナログ取得、エンコーダー、タイマー信号を扱います。

現在の草案では `M2xH` と `M2xP` は名称のみ予約されており、コンタクトは割り当てられていません。

!!! info "コネクター間の関係は未確定"
    ローカル提案ワークブックには、M2xM を含むモジュールには M2 ベースも必要とありますが、両マップが別々のコネクターか共用コネクターかは示されていません。したがって、コネクター数や配置は推定できません。ワークブックには M2xN／M2xA のコンタクトマップもありません。

## コネクターの規約 { #connector-convention }

ローカル提案ワークブックの M2 シートでは、カード端面から見て奇数番号のコンタクトを上側、偶数番号を下側に示しています。位置 24～31 はコンタクト表に記載されず、提案上のキー用切り欠き領域として示されています。この図だけでは、実際のコネクターが M.2 E-key の機械仕様に適合することは確認できません。

<div align="center"><em>表: M2 コネクターと拡張の概要</em></div>

<div align="center" markdown>

| 項目 | 定義 |
| --- | --- |
| コネクター形式 | 位置番号 1～75 のカードエッジ配置案。コンタクト 67 個を掲載。M.2 E-key 準拠は未確認 |
| 提案図で省略された位置 | 24～31（キー用切り欠き案として表示） |
| ベース配分 | M2 |
| マルチメディア配分 | M2xM |
| 本文に含まれる拡張情報 | M2xM コンタクトマップ。M2xN／M2xA は概要のみで未検証 |
| 宣言例 | `M2 + M2xM` |

</div>

## M2 ベースプロファイル { #m2-base-profile }

M2 は、小型のコネクテッド製品向けのベースプロファイルです。QSPI ディスプレイと静電容量式タッチパネル、Wi-Fi SDIO、1-bit TF カード SDIO、アナログオーディオ、デバッグ、USB、CAN、汎用バスを想定しています。SoC と製品構成に応じてモジュール側で適切な機能を選べるよう、複数のコンタクトを意図的に多重化しています。

<div align="center"><em>表: M2 の機能配分</em></div>

<div align="center" markdown>

| 機能 | 割り当て信号 | 設計上の用途 |
| --- | --- | --- |
| 電源 | `USB_VIN`、`VBAT/VBATS`、`3.3V`、`CHG_INT`、GND | 提案マップ上の信号名です。電圧、電流、電源投入シーケンスはここでは規定していません。 |
| QSPI ディスプレイ | `LCDC1_SPI_CS`、`CLK`、`DIO0–DIO3`、`CS2`、`TE`、`RSTB`、`LCD_BL_PWM` | QSPI ディスプレイパネル、バックライト、任意の第 2 チップセレクト。 |
| 静電容量式タッチ | `CTP_I2C1_SDA`、`CTP_I2C1_SCL`、`CTP_INT`、`CTP_REST` | 静電容量式タッチの制御と割り込み。 |
| Wi-Fi | `WiFi_SD2_CLK`、`CMD`、`D0–D3`、`PDN`、`INT`、`WAKE` | 4-bit SDIO Wi-Fi コンパニオンインターフェース。 |
| TF カード | `TF_SD1_CMD`、`CLK`、`D0`、`TF_DET` | 1-bit TF カードインターフェースとカード検出。 |
| アナログオーディオ | `ADC_1P/N`、`ADC_2P/N`、`MIC_BIAS`、`DAC_1P/N`、`DAC_2P/N`、`AU_PA_EN` | 2 組のアナログ入力、マイクバイアス、2 組の DAC 出力、PA 有効化。 |
| デバッグと復旧 | `DBG_UART1_TXD/RXD`、`SWDIO`、`SWCLK`、`SWD_SW`、`BOOT_MODE` | デバッグ UART、SWD、ブート／復旧モード選択。 |
| 汎用シリアルバス | SPI1／SPI2、I2C2～I2C4、UART2／UART3、汎用 GPIO／バス信号（`G0–G17`／`BUS0–BUS17`） | モジュールのピンマルチプレクサーで選択する製品固有バス。I2C1 はタッチコントローラー用です。SPI2／I2C3／I2C4／UART3 の一部ポジションは、`PDM1`／`PDM2` のデジタルマイク信号にも割り当てられます。 |
| その他の制御 | `CAN_TX/RX`、USB／USB ホスト信号、`PWR_KEY` | フィールドバス、USB ロール制御、電源キー入力。 |

</div>

## 色分けされた M2 ピン配置 { #color-coded-m2-pinout-guide }

<div align="center"><em>図: M2 信号グループの色分け凡例</em></div>

<div class="m2-visual-guide" role="img" aria-label="M2 両面ピン配置表の色分け凡例">
<div class="m2-category-band">
<div class="m2-category m2-audio">オーディオ</div>
<div class="m2-category m2-display">ディスプレイ</div>
<div class="m2-category m2-touch">タッチ</div>
<div class="m2-category m2-wireless">Wi-Fi／SDIO</div>
<div class="m2-category m2-bus">SPI／I²C／UART</div>
<div class="m2-category m2-power">USB／電源</div>
<div class="m2-category m2-debug">専用信号</div>
</div>
</div>

色付きの帯は表の凡例です。以下の両面コンタクト表に、この定義案で基準とする M2 のピン配置を示します。代替機能や多重化も含みますが、公開済みのインターフェース仕様ではありません。

### M2 コンタクト割り当て { #m2-contact-assignment }

この両面グリッドの列は、下側ピン／上側ピン／CN1 の構成です。ワークブックで追加の多重化機能が定義されている場合は、`Alt`（代替機能）列に記載しています。各機能セルの色は上の凡例と対応します。

<div align="center"><em>表: M2 ベースコンタクト割り当て</em></div>

<div align="center" markdown class="m2-grid-scroll" style="max-width: 100%; overflow-x: auto;" tabindex="0">
<table class="m2-grid" markdown="0">
<thead>
<tr><th>代替機能</th><th>機能</th><th>下側ピン</th><th>CN1</th><th>上側ピン</th><th>機能</th><th>代替機能</th></tr>
</thead>
<tbody>
<tr><td class="m2-alt m2-wireless">SDIO2_D2 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D2</td><td class="m2-pin">74</td><td class="m2-cn1"></td><td class="m2-pin">75</td><td class="m2-fn m2-wireless">TF_DET</td><td class="m2-alt m2-wireless">SDIO1_D1 / SPI1_MOSI / UART2_RXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D3 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D3</td><td class="m2-pin">72</td><td class="m2-cn1"></td><td class="m2-pin">73</td><td class="m2-fn m2-wireless">TF_SD1_D0</td><td class="m2-alt m2-wireless">SDIO1_D0 / SPI1_MISO / UART2_TXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CMD / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CMD</td><td class="m2-pin">70</td><td class="m2-cn1"></td><td class="m2-pin">71</td><td class="m2-fn m2-wireless">TF_SD1_CLK</td><td class="m2-alt m2-wireless">SDIO1_CLK / SPI1_SCK / UART2_CTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CLK / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CLK</td><td class="m2-pin">68</td><td class="m2-cn1"></td><td class="m2-pin">69</td><td class="m2-fn m2-wireless">TF_SD1_CMD</td><td class="m2-alt m2-wireless">SDIO1_CMD / SPI1_CS# / UART2_RTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D0 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D0</td><td class="m2-pin">66</td><td class="m2-cn1"></td><td class="m2-pin">67</td><td class="m2-fn m2-wireless">WiFi_WAKE</td><td class="m2-alt m2-wireless">SDIO1_D3 / CAN_RX</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D1 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D1</td><td class="m2-pin">64</td><td class="m2-cn1"></td><td class="m2-pin">65</td><td class="m2-fn m2-wireless">WiFi_INT</td><td class="m2-alt m2-wireless">SDIO1_D2 / CAN_TX</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">62</td><td class="m2-cn1"></td><td class="m2-pin">63</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">GPADC</td><td class="m2-fn m2-debug">PWR_KEY</td><td class="m2-pin">60</td><td class="m2-cn1"></td><td class="m2-pin">61</td><td class="m2-fn m2-power">USBHOST_D−</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_DATA / I2C3_SDA / UART2_RXD / G0/BUS0</td><td class="m2-fn m2-bus">SPI2_MISO</td><td class="m2-pin">58</td><td class="m2-cn1"></td><td class="m2-pin">59</td><td class="m2-fn m2-power">USBHOST_D+</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_CLK / I2C3_SCL / UART2_TXD / G1/BUS1</td><td class="m2-fn m2-bus">SPI2_MOSI</td><td class="m2-pin">56</td><td class="m2-cn1"></td><td class="m2-pin">57</td><td class="m2-fn m2-power">USB_OTG</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM2_DATA / I2C4_SDA / UART3_RXD / UART2_CTS / G2/BUS2</td><td class="m2-fn m2-bus">SPI2_SCK</td><td class="m2-pin">54</td><td class="m2-cn1"></td><td class="m2-pin">55</td><td class="m2-fn m2-touch">CTP_I2C1_SDA</td><td class="m2-alt m2-bus">G5/BUS5</td></tr>
<tr><td class="m2-alt m2-bus">PDM2_CLK / I2C4_SCL / UART3_TXD / UART2_RTS / G3/BUS3</td><td class="m2-fn m2-bus">SPI2_CS#</td><td class="m2-pin">52</td><td class="m2-cn1"></td><td class="m2-pin">53</td><td class="m2-fn m2-touch">CTP_I2C1_SCL</td><td class="m2-alt m2-bus">G6/BUS6</td></tr>
<tr><td class="m2-alt m2-bus">G4/BUS4</td><td class="m2-fn m2-power">CHG_INT</td><td class="m2-pin">50</td><td class="m2-cn1"></td><td class="m2-pin">51</td><td class="m2-fn m2-touch">CTP_INT</td><td class="m2-alt m2-debug">G7/BUS7 / SWDIO</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">USB_VIN</td><td class="m2-pin">48</td><td class="m2-cn1"></td><td class="m2-pin">49</td><td class="m2-fn m2-touch">CTP_REST</td><td class="m2-alt m2-debug">G8/BUS8 / SWCLK</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">46</td><td class="m2-cn1"></td><td class="m2-pin">47</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">3.3V</td><td class="m2-pin">44</td><td class="m2-cn1"></td><td class="m2-pin">45</td><td class="m2-fn m2-power">VBAT/VBATS</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">G9/BUS9</td><td class="m2-fn m2-power">USB_DET</td><td class="m2-pin">42</td><td class="m2-cn1"></td><td class="m2-pin">43</td><td class="m2-fn m2-debug">DBG_UART1_TXD</td><td class="m2-alt m2-debug">SWDIO</td></tr>
<tr><td class="m2-alt m2-bus">G10/BUS10</td><td class="m2-fn m2-wireless">WiFi_PDN</td><td class="m2-pin">40</td><td class="m2-cn1"></td><td class="m2-pin">41</td><td class="m2-fn m2-debug">DBG_UART1_RXD</td><td class="m2-alt m2-debug">SWCLK</td></tr>
<tr><td class="m2-alt m2-bus">UART3_RXD</td><td class="m2-fn m2-bus">G11/BUS11</td><td class="m2-pin">38</td><td class="m2-cn1"></td><td class="m2-pin">39</td><td class="m2-fn m2-bus">G14/BUS14</td><td class="m2-alt m2-bus">UART2_RXD</td></tr>
<tr><td class="m2-alt m2-bus">UART3_TXD</td><td class="m2-fn m2-bus">G12/BUS12</td><td class="m2-pin">36</td><td class="m2-cn1"></td><td class="m2-pin">37</td><td class="m2-fn m2-bus">G15/BUS15</td><td class="m2-alt m2-bus">UART2_TXD</td></tr>
<tr><td class="m2-alt m2-bus">I2C2_SCL</td><td class="m2-fn m2-bus">G13/BUS13</td><td class="m2-pin">34</td><td class="m2-cn1"></td><td class="m2-pin">35</td><td class="m2-fn m2-bus">G16/BUS16</td><td class="m2-alt m2-bus">I2C2_SDA</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">32</td><td class="m2-cn1"></td><td class="m2-pin">33</td><td class="m2-fn m2-audio">AU_PA_EN</td><td class="m2-alt m2-bus">G17/BUS17</td></tr>
<tr><td class="m2-blank"></td><td class="m2-notch" colspan="2">24～31 の位置は省略（キー用切り欠き案）</td><td class="m2-cn1"></td><td class="m2-notch" colspan="2">24～31 の位置は省略（キー用切り欠き案）</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1N</td><td class="m2-pin">22</td><td class="m2-cn1"></td><td class="m2-pin">23</td><td class="m2-fn m2-audio">DAC_2N</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1P</td><td class="m2-pin">20</td><td class="m2-cn1"></td><td class="m2-pin">21</td><td class="m2-fn m2-audio">DAC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_2N</td><td class="m2-pin">18</td><td class="m2-cn1"></td><td class="m2-pin">19</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">MIC_BIAS</td><td class="m2-pin">16</td><td class="m2-cn1"></td><td class="m2-pin">17</td><td class="m2-fn m2-audio">ADC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_1N</td><td class="m2-pin">14</td><td class="m2-cn1"></td><td class="m2-pin">15</td><td class="m2-fn m2-audio">ADC_1P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS2</td><td class="m2-pin">12</td><td class="m2-cn1"></td><td class="m2-pin">13</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO2</td><td class="m2-pin">10</td><td class="m2-cn1"></td><td class="m2-pin">11</td><td class="m2-fn m2-display">LCDC1_SPI_DIO3</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO0</td><td class="m2-pin">8</td><td class="m2-cn1"></td><td class="m2-pin">9</td><td class="m2-fn m2-display">LCDC1_SPI_DIO1</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS</td><td class="m2-pin">6</td><td class="m2-cn1"></td><td class="m2-pin">7</td><td class="m2-fn m2-display">LCDC1_SPI_CLK</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCD_BL_PWM</td><td class="m2-pin">4</td><td class="m2-cn1"></td><td class="m2-pin">5</td><td class="m2-fn m2-display">LCDC1_SPI_TE</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-debug">SWD_SW</td><td class="m2-pin">2</td><td class="m2-cn1"></td><td class="m2-pin">3</td><td class="m2-fn m2-display">LCDC1_SPI_RSTB</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-blank">—</td><td class="m2-pin">—</td><td class="m2-cn1"></td><td class="m2-pin">1</td><td class="m2-fn m2-debug">BOOT_MODE</td><td class="m2-blank"></td></tr>
</tbody>
</table>
</div>

### M2 ピンの説明 { #m2-pin-descriptions }

グループと色は上のコンタクト表に対応しています。ワークブックには I/O 方向の定義がないため、この列は暫定的な設計上の参考情報です。方向はモジュールを基準とし、I は入力、O は出力、I/O は双方向を表します。複数の方向は信号の記載順に対応します。SPI と PDM はモジュールがクロックを供給する構成、SWD は外部デバッガーを接続する構成を想定しています。各信号の方向と電気的要件は、選択したモジュールおよび SoC のドキュメントで確認してください。

I2C の I/O は SDA/SCL が双方向のバス信号であることを示します。すべてのコントローラー／ターゲット動作モードやクロックストレッチへの対応を保証するものではありません。実際のモジュールに必要なピン設定とプルアップを確認してください。詳しくは [NXP の I2C バス仕様](https://www.nxp.com/docs/en/user-guide/UM10204.pdf)を参照してください。PDM のクロック出力／データ入力という想定は、[ST の PDM アプリケーションノート](https://www.st.com/resource/en/application_note/an5027-interfacing-pdm-digital-microphones-using-stm32-mcus-and-mpus-stmicroelectronics.pdf)に示されたマイクとホストの接続構成に基づきます。特定モジュールの対応を示すものではありません。

<div align="center"><em>表: M2 信号の説明と暫定的な方向</em></div>

<div align="center" markdown>

| 信号グループ | 信号 | I/O | 説明 |
| --- | --- | :---: | --- |
| <span class="m2-chip m2-power">電源</span> | `VBAT/VBATS` | I | バッテリー入力電源。 |
| <span class="m2-chip m2-power">電源</span> | `3.3V` | I | 3.3 V 電源。 |
| <span class="m2-chip m2-power">電源</span> | `CHG_INT` | O | 充電器の割り込み／状態出力。 |
| <span class="m2-chip m2-power">電源</span> | `USB_VIN` | I | USB 入力／充電経路の電源。 |
| <span class="m2-chip m2-power">電源</span> | `USB_DET` | I | USB 検出信号。 |
| <span class="m2-chip m2-power">電源</span> | `USBHOST_D+`、`USBHOST_D−` | I/O | 主 USB ポートとは別の USB ホストモードデータペア。 |
| <span class="m2-chip m2-power">電源</span> | `USB_OTG` | I/O | 提案ワークブック上の信号名です。同シートには「現行プラットフォームでは非対応」と記載されています。コンタクト名だけで対応を判断しないでください。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCDC1_SPI_CS`、`LCDC1_SPI_CS2` | O | QSPI ディスプレイの主チップセレクトおよび任意の第 2 チップセレクト。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCDC1_SPI_CLK` | O | QSPI ディスプレイクロック。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCDC1_SPI_DIO0`～`DIO3` | I/O | QSPI ディスプレイのデータ線。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCDC1_SPI_TE` | I | パネルからのティアリング効果同期入力。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCDC1_SPI_RSTB` | O | ディスプレイパネルのリセット。Low アクティブ。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCD_BL_PWM` | O | バックライト PWM 制御。 |
| <span class="m2-chip m2-touch">タッチ</span> | `CTP_I2C1_SDA`、`CTP_I2C1_SCL` | I/O | 静電容量式タッチコントローラーの I²C バス。 |
| <span class="m2-chip m2-touch">タッチ</span> | `CTP_INT` | I | タッチコントローラーの割り込み。 |
| <span class="m2-chip m2-touch">タッチ</span> | `CTP_REST` | O | タッチコントローラーのリセット。ワークブックでは信号名を `CTP_REST` と表記しています。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `WiFi_SD2_CLK`、`WiFi_SD2_CMD` | O、I/O | Wi-Fi コンパニオン SDIO のクロックとコマンド。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `WiFi_SD2_D0`、`WiFi_SD2_D1`、`WiFi_SD2_D2`、`WiFi_SD2_D3` | I/O | Wi-Fi コンパニオン SDIO データ線（4-bit）。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `WiFi_PDN` | O | Wi-Fi モジュールの電源ダウン制御。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `WiFi_INT` | I | Wi-Fi 割り込み。ピン 65 の `SDIO1_D2`／`CAN_TX` と共用。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `WiFi_WAKE` | I/O | Wi-Fi のウェイク信号。ピン 67 の `SDIO1_D3`／`CAN_RX` と共用。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `TF_SD1_CMD`、`TF_SD1_CLK`、`TF_SD1_D0` | I/O、O、I/O | 1-bit TF カードの SDIO コマンド、クロック、データ。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `TF_DET` | I | TF カードの挿入検出。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `SDIO1_D0–D3`、`SDIO2_D0–D3` | I/O | TF カード（SDIO1）と Wi-Fi コンパニオン（SDIO2）バスの同じ物理線に対する、コントローラーレベルの汎用別名です。両側で 4-bit SDIO が必要な場合を除き、上記の役割別信号名を使ってください。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `CAN_TX`、`CAN_RX` | O、I | ピン 65 と 67 で `WiFi_INT`／`WiFi_WAKE` と多重化される、ロジックレベルの CAN トランシーバーインターフェースです。キャリアには製品バスに適した CAN トランシーバーと保護回路が別途必要です。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `GPADC` | I | この割り当てでは、Wi-Fi SDIO のコンタクト 74、72、70、68、66、64 と、`PWR_KEY` のコンタクト 60 に ADC の代替機能があります。 |
| <span class="m2-chip m2-audio">オーディオ</span> | `ADC_1P/N`、`ADC_2P/N` | I | アナログマイク用の差動入力ペア 2 組。 |
| <span class="m2-chip m2-audio">オーディオ</span> | `MIC_BIAS` | O | マイクバイアス電源。 |
| <span class="m2-chip m2-audio">オーディオ</span> | `DAC_1P/N`、`DAC_2P/N` | O | 差動オーディオ出力ペア 2 組。 |
| <span class="m2-chip m2-audio">オーディオ</span> | `AU_PA_EN` | O | オーディオパワーアンプの有効化。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `SPI1_CS#`、`SPI1_SCK`、`SPI1_MOSI`、`SPI1_MISO` | O、O、O、I | TF カード経路と多重化された SPI1。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `SPI2_CS#`、`SPI2_SCK`、`SPI2_MOSI`、`SPI2_MISO` | O、O、O、I | I2C3 および UART2 と多重化された SPI2。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `I2C2_SDA`、`I2C2_SCL` | I/O | I2C2 の SDA はコンタクト 35、SCL は 34 に割り当てられています。従来の説明にある `MPI/SD` との共用は、このコンタクトマップでは確認できません。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `I2C3_SDA`、`I2C3_SCL` | I/O | SPI2 と多重化された I2C3。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `I2C4_SDA`、`I2C4_SCL` | I/O | SPI2 および UART3 と多重化された I2C4。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `UART2_TXD/RXD`、`UART2_CTS/RTS` | O/I、I/O | UART2 は TF カード群、SPI2 群、またはコンタクト 39／37 の代替位置を使用します。従来の `MPI/SD` との共用は未確認です。モジュールの実際の多重化設定を確認してください。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `UART3_TXD/RXD` | O/I | UART3 は SPI2／I2C4 群、またはコンタクト 38／36 の代替位置を使用します。従来の `MPI/SD` との共用は未確認です。モジュールの実際の多重化設定を確認してください。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `G0–G17`／`BUS0–BUS17` | I/O | 位置に応じて SPI2、I2C2～I2C4、UART2／UART3、`PDM1`／`PDM2`、SWD と多重化される汎用 GPIO／バスコンタクト。 |
| <span class="m2-chip m2-audio">オーディオ</span> | `PDM1_CLK/DATA`、`PDM2_CLK/DATA` | O、I | 各デジタルマイク用信号ペアの CLK はモジュールの出力、DATA は入力です。SPI2／I2C3／I2C4／UART3 とコンタクト 58、56、54、52 を共用します。 |
| <span class="m2-chip m2-debug">専用信号</span> | `DBG_UART1_TXD/RXD` | O/I | SWD と多重化されたデバッグ UART。 |
| <span class="m2-chip m2-debug">専用信号</span> | `SWDIO`、`SWCLK` | I/O、I | SWD デバッグポート。デバッグ UART の位置（ピン 43／41）またはタッチ割り込み／リセットの位置（ピン 51／49）のいずれかを選択できます。各モジュールでは一方だけを実装してください。 |
| <span class="m2-chip m2-debug">専用信号</span> | `SWD_SW` | I | 提案ワークブック上の信号名です。配線をどのように制御・選択する信号かは記載されていません。 |
| <span class="m2-chip m2-debug">専用信号</span> | `BOOT_MODE` | I | ブート／復旧モード選択。 |
| <span class="m2-chip m2-debug">専用信号</span> | `PWR_KEY` | I | 電源キー信号。 |
| <span class="m2-chip m2-gnd">グランド</span> | `GND` | — | コネクター内に分散配置されたデジタル／アナログのリターン経路。 |

</div>

!!! info "Wi-Fi SDIO データラベルの訂正"
    提案ワークブックでは、コンタクト 64 を `WiFi_SD2_D1` に割り当て、旧版ではここに D3 が重複して記載されていたと注記しています。これはワークブック内の修正履歴であり、SiFli によるピンマルチプレクサ設定の確認ではありません。両方の SDIO バスでは、役割別信号名に加えて、代替機能列にコントローラーレベルの汎用別名も記載されています。Wi-Fi バスは `SDIO2_D0–D3`／`SDIO2_CMD`／`SDIO2_CLK`、TF カードバスは `SDIO1_D0–D3`／`SDIO1_CMD`／`SDIO1_CLK` です。

### M2 の共用ルール { #m2-sharing-rules }

- ワークブックでは SWD を多重化リソースとして扱い、デバッグ UART の位置（ピン 43 の `SWDIO`、ピン 41 の `SWCLK`）か、タッチ割り込み／リセットの位置（ピン 51 の `SWDIO`、ピン 49 の `SWCLK`）のいずれかを選択します。各モジュールで一方だけを実装し、これらのコンタクトを他用途に使う前に復旧方法を確保してください。
- SPI1 は 1-bit TF カード経路と共用されます。どちらも汎用 `SDIO1_D0–D3`／`CMD`／`CLK` コントローラーバスとして利用でき、ピン 65／67 はさらに `CAN_TX`／`CAN_RX` に割り当てられています。
- Wi-Fi SDIO2 のデータ線は、汎用 `SDIO2_D0–D3`／`CMD`／`CLK` コントローラーバスとしても利用できます。同じコンタクトの一部は `GPADC` アナログ入力にもなります。
- SPI2 と I2C3／I2C4（コンタクト 58、56、54、52）は、`PDM1`／`PDM2` のデジタルマイク信号、および汎用 `G0–G3`／`BUS0–BUS3` GPIO 別名にも切り替えられます。
- `G11–G16`／`BUS11–BUS16` の 6 ポジションでは、UART3 がコンタクト 38／36、UART2 が 39／37、I2C2 の SDA／SCL が 35／34 を使用します。3 本のバスが同一ピンを共用するのではなく、それぞれ別のペアです。各ペアは対応する GPIO 別名とコンタクトを共用します。同時動作の可否は選択したモジュールで確認してください。
- QSPI ディスプレイと静電容量式タッチは信号上は独立していますが、電源、リセット、ウェイク動作は 1 つのディスプレイサブシステムとしてレビューしてください。
- `CAN_TX` と `CAN_RX` はピン 65／67 に多重化されたロジックレベル信号で、独立したコンタクトではありません。キャリアには製品バスに適した CAN トランシーバーと保護回路が引き続き必要です。

## M2xM マルチメディアプロファイル { #m2xm-multimedia-profile }

M2xM はマルチメディア割り当て案です。ローカル提案ワークブックでは DPI／DVP を主信号群、MIPI DSI／CSI を代替信号群として示していますが、多重化制御や同時使用の条件は定義されていません。この記載だけでは、特定の μForge モジュールや SoC パッケージでの対応を確認できません。実装前に、選択したモジュールの資料で機能と配線要件を確認してください。

<div align="center"><em>表: M2xM の機能配分</em></div>

<div align="center" markdown>

| 機能 | 提案ワークブックの信号名 | 根拠と制約 |
| --- | --- | --- |
| RGB／DPI ディスプレイ | `R0–R7`、`G0–G7`、`B0–B7`、`DPI_CLK`、`DPI_DE`、`DPI_HSYNC`、`DPI_VSYNC`、共用の表示制御信号 | DPI は主信号として記載。8080 と EPD の割り当てはワークブックにありません。 |
| MIPI DSI | `DSI_D0±`～`DSI_D3±`、`DSI_C±`、リセット、バックライト PWM、I2C 信号 | DSI は代替として記載され、シールド接地用のコンタクトが 6 個示されています。ワークブックでは TE 信号は割り当てられていません。 |
| タッチ制御 | 汎用の `I2C_SCL`、`I2C_SDA`、`RESET` 信号 | M2xM シートにはタッチ専用の割り込み／リセット割り当てがなく、タッチ対応は確認できません。 |
| 12-bit DVP カメラ | `D0–D11`、MCLK、PCLK、HSYNC、VSYNC、PWDN、リセット、I2C 信号 | 20 個のコンタクトが示されていますが、I2C コントローラー番号は記載されていません。 |
| MIPI CSI | D0／D1 差動レーン、クロックペア、PWDN、リセット、I2C 信号 | CSI は代替として記載され、シールド接地用のコンタクトが 4 個示されています。多重化と同時動作の条件は未定義です。 |
| デジタルマイク | `PDM1_CLK/DATA`、`PDM2_CLK/DATA` | PDM 信号が 4 本示されています。 |
| I2S／PCM | 利用可能な M2xM シートに I2S／PCM 信号やコンタクト割り当てはありません。 | 割り当ては未検証です。承認済み資料がない限り、このマップの機能として扱わないでください。 |

</div>


## M2xN ネットワークプロファイル { #m2xn-networking-profile }

M2xN は本ページに記載された未検証のネットワーク拡張概要であり、根拠資料で確認されたコンタクトマップではありません。利用可能な提案ワークブックには M2xN シートがなく、割り当てを確認できる SiFli の一次資料も見つかっていません。以下の信号一覧と予約コンタクト数は未検証です。

<div align="center"><em>表: M2xN の機能配分</em></div>

<div align="center" markdown>

| 機能 | 草案概要（未検証） |
| --- | --- |
| Ethernet | 草案内には Gigabit Ethernet／RGMII と `RMII_*` 信号名が併記され、記載が矛盾しています。M2xN の元資料となるコンタクトマップも SiFli の一次資料もなく、この不一致を解決できません。インターフェースと速度は未検証です。承認済み資料で確認できるまで、製品対応を主張しないでください。 |
| USB | `USB1_D±`、`USB1_DET`、`USB1_OTG`、`USB2_D±`、`USB2_DET`、`USB2_OTG` |
| CAN | `CAN1_TX/RX`～`CAN4_TX/RX`。割り当て箇所では `CAN1/2_STB` と `CAN1/2_ERR_N` 制御信号も含みます。 |
| UART | `UART1_TX/RX/CTS/RTS`、`UART2_TX/RX/CTS/RTS` |
| 予約 | GPIO コンタクト 15 本、GND コンタクト 12 本 |

</div>

## M2xA アナログ／モーション制御プロファイル { #m2xa-analog-and-motion-control-profile }

M2xA は本ページに記載された未検証のモーター制御／データ取得概要であり、根拠資料で確認されたコンタクトマップではありません。利用可能な提案ワークブックには M2xA シートがなく、割り当てを確認できる SiFli の一次資料も見つかっていません。以下の信号名、数、割り当ては未検証です。

<div align="center"><em>表: M2xA の機能配分</em></div>

<div align="center" markdown>

| 機能 | 草案概要（未検証） |
| --- | --- |
| BLDC 制御 | 草案には `PWM1_OUT/OUTN`、`PWM2_OUT/OUTN`、`PWM3_OUT/OUTN`、`BKIN1/2`、`DRV_EN`、`DRV_NFAULT` が記載されています。アナログ入力は、5 チャネルを示す 2 種類の表記（`ADC_IU/V/W`、`ADC_VBUS`、`ADC_NTC` と `ADC_IN1–ADC_IN5`）が食い違っています。別の M2xA 概要には `ADC0–ADC2` とあります。M2xA の元資料となるコンタクトマップや SiFli の一次資料はなく、名称、数、割り当てを検証できません。承認済み資料が得られるまで未確定として扱ってください。 |
| 位置フィードバック | `H_A`、`H_B`、`H_C`、`ENC_A`、`ENC_B`、`ENC_Z` |
| 汎用タイミング | `TIM_CH1–TIM_CH6` |
| 予約 | GPIO コンタクト 27 本、GND コンタクト 13 本 |

</div>

## モジュール宣言と実装チェックリスト { #module-declaration-and-implementation-checklist }

モジュール宣言では、ベース配分と対応する各拡張マップを明記します。たとえば `M2`、`M2 + M2xM`、`M2 + M2xN + M2xA` のように記載します。また、実装する M2 形式コネクターの数と種類、実装する任意機能、相互排他となる動作モードを示してください。

この案を採用する前に、以下を確認してください。

- 提案コネクターのフットプリント、カード外形、固定機構、挿入方向が、適用される M.2 要件を満たしているか。
- モジュールとキャリアに実装する M2 形式コネクターの数、配置、種類。
- モジュールが選択するすべての多重化機能。SDIO1／SDIO2、PDM、SWD（デバッグ UART とタッチ割り込み／リセットのどちらを使うか）、CAN の共用配線を含みます。
- モジュール固有の I/O 電圧、電流、リセット、ブート、電源シーケンスの要件。
- M2xM の MIPI、RGB、DVP、PDM、I2S 機能が同時に利用できるか、代替モードとしてのみ利用できるか。
- CAN トランシーバー、USB 保護、TF カード電源／検出、ディスプレイ電源、オーディオアンプ、外部 PHY に関するキャリア側要件。
