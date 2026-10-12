---
icon: lucide/plug
description: "M2／M2xMのコンタクト割り当て案と、未検証のM2xN／M2xA概要および信号共有に関する注記。"
tags:
  - ハードウェア
  - モジュール
  - インターフェース
---

# M2インターフェース定義 { #m2-interface-definition }

!!! warning "インターフェース定義案"
    このページにはM2インターフェース案をまとめています。M2とM2xMのシートを含むローカル提案ワークブックがありますが、同ワークブックが参照する別ファイル`M2E接口定义_0714.xlsx`は見つからず、提案の版数や承認元も確認できませんでした。割り当てや数値を裏付けるSiFliの一次資料も確認できていません。ワークブックにはM2xN／M2xAのシートがないため、以下の該当概要は未検証です。これはリリース済みの μForge.ioインターフェース規格ではありません。すべて暫定案として扱い、量産設計に進む前に、選択したモジュール、キャリア基板、コネクター、電気的制限、ピン多重化を確認してください。

## 適用範囲 { #scope }

ローカル提案ワークブックのM2とM2xMの各シートは位置を1～75で番号付けし、コンタクト表では24～31を省略しているため、67個の番号付きコンタクトを示しています。両シートはマップをM.2 Key-Eコネクターとして記載し、M2xMシートには同じモジュールにM2ベースも必要とあります。これらは提案上の記載であり、[PCI-SIGのM.2仕様](https://pcisig.com/specification-overview/pci-express-m2)への準拠やモジュールとキャリア基板の相互交換可能性、実際のコネクター数・配置を証明するものではありません。このページにはM2xNとM2xAの概要もありますが、照合できる元のコンタクトマップ資料は見つかっていません。

- **M2** — ディスプレイ、オーディオ、ストレージ、デバッグ、汎用組み込みI/Oを接続します。
- **M2xM** — ディスプレイ、カメラ、PDMのマルチメディア割り当て案です。草案概要にはI2S／PCMも記載されていますが、利用可能なM2xMシートには割り当てがありません。
- **M2xN** — ネットワーク、USB、CAN、UART信号を扱います。
- **M2xA** — モーター制御、アナログ取得、エンコーダー、タイマー信号を扱います。

現在の草案では`M2xH`と`M2xP`は名称のみ予約されており、コンタクトは割り当てられていません。

!!! info "コネクター間の関係は未確定"
    ローカル提案ワークブックには、M2xMを含むモジュールにはM2ベースも必要とありますが、両マップが別々のコネクターか共用コネクターかは示されていません。したがって、コネクター数や配置は推定できません。ワークブックにはM2xN／M2xAのコンタクトマップもありません。

## コネクターの規約 { #connector-convention }

ローカル提案ワークブックのM2シートでは、カード端面から見て奇数番号のコンタクトを上側、偶数番号を下側に示しています。位置24～31はコンタクト表に記載されず、提案上のキー用切り欠き領域として示されています。この図だけでは、実際のコネクターがM.2 E-keyの機械仕様に適合することは確認できません。

<div align="center"><em>表: M2コネクターと拡張の概要</em></div>

<div align="center" markdown>

| 項目 | 定義 |
| --- | --- |
| コネクター形式 | 位置番号1～75のカードエッジ配置案。コンタクト67個を掲載。M.2 E-key準拠は未確認 |
| 提案図で省略された位置 | 24～31（キー用切り欠き案として表示） |
| ベース配分 | M2 |
| マルチメディア配分 | M2xM |
| 本文に含まれる拡張情報 | M2xMコンタクトマップ。M2xN／M2xAは概要のみで未検証 |
| 宣言例 | `M2 + M2xM` |

</div>

## M2ベースプロファイル { #m2-base-profile }

M2は、小型のコネクテッド製品向けのベースプロファイルです。QSPIディスプレイと静電容量式タッチパネル、Wi-Fi SDIO、1-bit TFカードSDIO、アナログオーディオ、デバッグ、USB、CAN、汎用バスを想定しています。SoCと製品構成に応じてモジュール側で適切な機能を選べるよう、複数のコンタクトを意図的に多重化しています。

<div align="center"><em>表: M2の機能配分</em></div>

<div align="center" markdown>

| 機能 | 割り当て信号 | 設計上の用途 |
| --- | --- | --- |
| 電源 | `USB_VIN`、`VBAT/VBATS`、`3.3V`、`CHG_INT`、GND | 提案マップ上の信号名です。電圧、電流、電源投入シーケンスはここでは規定していません。 |
| QSPIディスプレイ | `LCDC1_SPI_CS`、`CLK`、`DIO0–DIO3`、`CS2`、`TE`、`RSTB`、`LCD_BL_PWM` | QSPIディスプレイパネル、バックライト、任意の第 2 チップセレクト。 |
| 静電容量式タッチ | `CTP_I2C1_SDA`、`CTP_I2C1_SCL`、`CTP_INT`、`CTP_REST` | 静電容量式タッチの制御と割り込み。 |
| Wi-Fi | `WiFi_SD2_CLK`、`CMD`、`D0–D3`、`PDN`、`INT`、`WAKE` | 4-bit SDIO Wi-Fiコンパニオンインターフェース。 |
| TFカード | `TF_SD1_CMD`、`CLK`、`D0`、`TF_DET` | 1-bit TFカードインターフェースとカード検出。 |
| アナログオーディオ | `ADC_1P/N`、`ADC_2P/N`、`MIC_BIAS`、`DAC_1P/N`、`DAC_2P/N`、`AU_PA_EN` | 2組のアナログ入力、マイクバイアス、2組のDAC出力、PA有効化。 |
| デバッグと復旧 | `DBG_UART1_TXD/RXD`、`SWDIO`、`SWCLK`、`SWD_SW`、`BOOT_MODE` | デバッグUART、SWD、ブート／復旧モード選択。 |
| 汎用シリアルバス | SPI1／SPI2、I2C2～I2C4、UART2／UART3、汎用GPIO／バス信号（`G0–G17`／`BUS0–BUS17`） | モジュールのピン多重化で選択する製品固有バス。I2C1はタッチコントローラー用です。SPI2／I2C3／I2C4／UART3の一部ポジションは、`PDM1`／`PDM2`のデジタルマイク信号にも割り当てられます。 |
| その他の制御 | `CAN_TX/RX`、USB／USBホスト信号、`PWR_KEY` | フィールドバス、USBロール制御、電源キー入力。 |

</div>

## 色分けされたM2ピン配置 { #color-coded-m2-pinout-guide }

<div align="center"><em>図: M2信号グループの色分け凡例</em></div>

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

色付きの帯は表の凡例です。以下の両面コンタクト表に、この定義案で基準とするM2のピン配置を示します。代替機能や多重化も含みますが、公開済みのインターフェース仕様ではありません。

### M2コンタクト割り当て { #m2-contact-assignment }

この両面グリッドの列は、下側ピン／上側ピン／CN1の構成です。ワークブックで追加の多重化機能が定義されている場合は、`Alt`（代替機能）列に記載しています。各機能セルの色は上の凡例と対応します。

<div align="center"><em>表: M2ベースコンタクト割り当て</em></div>

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
<tr><td class="m2-blank"></td><td class="m2-notch" colspan="2">24～31の位置は省略（キー用切り欠き案）</td><td class="m2-cn1"></td><td class="m2-notch" colspan="2">24～31の位置は省略（キー用切り欠き案）</td><td class="m2-blank"></td></tr>
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

### M2ピンの説明 { #m2-pin-descriptions }

グループと色は上のコンタクト表に対応しています。ワークブックにはI/O方向の定義がないため、この列は暫定的な設計上の参考情報です。方向はモジュールを基準とし、Iは入力、Oは出力、I/Oは双方向を表します。複数の方向は信号の記載順に対応します。SPIとPDMはモジュールがクロックを供給する構成、SWDは外部デバッガーを接続する構成を想定しています。各信号の方向と電気的要件は、選択したモジュールおよびSoCのドキュメントで確認してください。

I2CのI/OはSDA/SCLが双方向のバス信号であることを示します。すべてのコントローラー／ターゲット動作モードやクロックストレッチへの対応を保証するものではありません。実際のモジュールに必要なピン設定とプルアップを確認してください。詳しくは [NXPのI2Cバス仕様](https://www.nxp.com/docs/en/user-guide/UM10204.pdf)を参照してください。PDMのクロック出力／データ入力という想定は、[STのPDMアプリケーションノート](https://www.st.com/resource/en/application_note/an5027-interfacing-pdm-digital-microphones-using-stm32-mcus-and-mpus-stmicroelectronics.pdf)に示されたマイクとホストの接続構成に基づきます。特定モジュールの対応を示すものではありません。

<div align="center"><em>表: M2信号の説明と暫定的な方向</em></div>

<div align="center" markdown>

| 信号グループ | 信号 | I/O | 説明 |
| --- | --- | :---: | --- |
| <span class="m2-chip m2-power">電源</span> | `VBAT/VBATS` | I | バッテリー入力電源。 |
| <span class="m2-chip m2-power">電源</span> | `3.3V` | I | 3.3 V電源。 |
| <span class="m2-chip m2-power">電源</span> | `CHG_INT` | O | 充電器の割り込み／状態出力。 |
| <span class="m2-chip m2-power">電源</span> | `USB_VIN` | I | USB入力／充電経路の電源。 |
| <span class="m2-chip m2-power">電源</span> | `USB_DET` | I | USB検出信号。 |
| <span class="m2-chip m2-power">電源</span> | `USBHOST_D+`、`USBHOST_D−` | I/O | 主USBポートとは別のUSBホストモードデータペア。 |
| <span class="m2-chip m2-power">電源</span> | `USB_OTG` | I/O | 提案ワークブック上の信号名です。同シートには「現行プラットフォームでは非対応」と記載されています。コンタクト名だけで対応を判断しないでください。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCDC1_SPI_CS`、`LCDC1_SPI_CS2` | O | QSPIディスプレイの主チップセレクトおよび任意の第 2 チップセレクト。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCDC1_SPI_CLK` | O | QSPIディスプレイクロック。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCDC1_SPI_DIO0`～`DIO3` | I/O | QSPIディスプレイのデータ線。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCDC1_SPI_TE` | I | パネルからのティアリング効果同期入力。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCDC1_SPI_RSTB` | O | ディスプレイパネルのリセット。Lowアクティブ。 |
| <span class="m2-chip m2-display">ディスプレイ</span> | `LCD_BL_PWM` | O | バックライトPWM制御。 |
| <span class="m2-chip m2-touch">タッチ</span> | `CTP_I2C1_SDA`、`CTP_I2C1_SCL` | I/O | 静電容量式タッチコントローラーのI²Cバス。 |
| <span class="m2-chip m2-touch">タッチ</span> | `CTP_INT` | I | タッチコントローラーの割り込み。 |
| <span class="m2-chip m2-touch">タッチ</span> | `CTP_REST` | O | タッチコントローラーのリセット。ワークブックでは信号名を`CTP_REST`と表記しています。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `WiFi_SD2_CLK`、`WiFi_SD2_CMD` | O、I/O | Wi-FiコンパニオンSDIOのクロックとコマンド。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `WiFi_SD2_D0`、`WiFi_SD2_D1`、`WiFi_SD2_D2`、`WiFi_SD2_D3` | I/O | Wi-FiコンパニオンSDIOデータ線（4-bit）。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `WiFi_PDN` | O | Wi-Fiモジュールの電源ダウン制御。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `WiFi_INT` | I | Wi-Fi割り込み。ピン65の`SDIO1_D2`／`CAN_TX`と共用。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `WiFi_WAKE` | I/O | Wi-Fiのウェイク信号。ピン67の`SDIO1_D3`／`CAN_RX`と共用。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `TF_SD1_CMD`、`TF_SD1_CLK`、`TF_SD1_D0` | I/O、O、I/O | 1-bit TFカードのSDIOコマンド、クロック、データ。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `TF_DET` | I | TFカードの挿入検出。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `SDIO1_D0–D3`、`SDIO2_D0–D3` | I/O | TFカード（SDIO1）とWi-Fiコンパニオン（SDIO2）バスの同じ物理線に対する、コントローラーレベルの汎用別名です。両側で4-bit SDIOが必要な場合を除き、上記の役割別信号名を使ってください。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `CAN_TX`、`CAN_RX` | O、I | ピン65と67で`WiFi_INT`／`WiFi_WAKE`と多重化される、ロジックレベルのCANトランシーバーインターフェースです。キャリアには製品バスに適したCANトランシーバーと保護回路が別途必要です。 |
| <span class="m2-chip m2-wireless">Wi-Fi／SDIO</span> | `GPADC` | I | この割り当てでは、Wi-Fi SDIOのコンタクト74、72、70、68、66、64と、`PWR_KEY`のコンタクト60にADCの代替機能があります。 |
| <span class="m2-chip m2-audio">オーディオ</span> | `ADC_1P/N`、`ADC_2P/N` | I | アナログマイク用の差動入力ペア2組。 |
| <span class="m2-chip m2-audio">オーディオ</span> | `MIC_BIAS` | O | マイクバイアス電源。 |
| <span class="m2-chip m2-audio">オーディオ</span> | `DAC_1P/N`、`DAC_2P/N` | O | 差動オーディオ出力ペア2組。 |
| <span class="m2-chip m2-audio">オーディオ</span> | `AU_PA_EN` | O | オーディオパワーアンプの有効化。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `SPI1_CS#`、`SPI1_SCK`、`SPI1_MOSI`、`SPI1_MISO` | O、O、O、I | TFカード経路と多重化されたSPI1。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `SPI2_CS#`、`SPI2_SCK`、`SPI2_MOSI`、`SPI2_MISO` | O、O、O、I | I2C3およびUART2と多重化されたSPI2。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `I2C2_SDA`、`I2C2_SCL` | I/O | I2C2のSDAはコンタクト35、SCLは34に割り当てられています。従来の説明にある`MPI/SD`との共用は、このコンタクトマップでは確認できません。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `I2C3_SDA`、`I2C3_SCL` | I/O | SPI2と多重化されたI2C3。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `I2C4_SDA`、`I2C4_SCL` | I/O | SPI2およびUART3と多重化されたI2C4。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `UART2_TXD/RXD`、`UART2_CTS/RTS` | O/I、I/O | UART2はTFカード群、SPI2群、またはコンタクト39／37の代替位置を使用します。従来の`MPI/SD`との共用は未確認です。モジュールの実際の多重化設定を確認してください。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `UART3_TXD/RXD` | O/I | UART3はSPI2／I2C4群、またはコンタクト38／36の代替位置を使用します。従来の`MPI/SD`との共用は未確認です。モジュールの実際の多重化設定を確認してください。 |
| <span class="m2-chip m2-bus">SPI／I²C／UART</span> | `G0–G17`／`BUS0–BUS17` | I/O | 位置に応じてSPI2、I2C2～I2C4、UART2／UART3、`PDM1`／`PDM2`、SWDと多重化される汎用GPIO／バスコンタクト。 |
| <span class="m2-chip m2-audio">オーディオ</span> | `PDM1_CLK/DATA`、`PDM2_CLK/DATA` | O、I | 各デジタルマイク用信号ペアのCLKはモジュールの出力、DATAは入力です。SPI2／I2C3／I2C4／UART3とコンタクト58、56、54、52を共用します。 |
| <span class="m2-chip m2-debug">専用信号</span> | `DBG_UART1_TXD/RXD` | O/I | SWDと多重化されたデバッグUART。 |
| <span class="m2-chip m2-debug">専用信号</span> | `SWDIO`、`SWCLK` | I/O、I | SWDデバッグポート。デバッグUARTの位置（ピン43／41）またはタッチ割り込み／リセットの位置（ピン51／49）のいずれかを選択できます。各モジュールでは一方だけを実装してください。 |
| <span class="m2-chip m2-debug">専用信号</span> | `SWD_SW` | I | 提案ワークブック上の信号名です。配線をどのように制御・選択する信号かは記載されていません。 |
| <span class="m2-chip m2-debug">専用信号</span> | `BOOT_MODE` | I | ブート／復旧モード選択。 |
| <span class="m2-chip m2-debug">専用信号</span> | `PWR_KEY` | I | 電源キー信号。 |
| <span class="m2-chip m2-gnd">グラウンド</span> | `GND` | — | コネクター内に分散配置されたデジタル／アナログのリターン経路。 |

</div>

!!! info "Wi-Fi SDIOデータラベルの訂正"
    提案ワークブックでは、コンタクト64を`WiFi_SD2_D1`に割り当て、旧版ではここにD3が重複して記載されていたと注記しています。これはワークブック内の修正履歴であり、SiFliによるピン多重化設定の確認ではありません。両方のSDIOバスでは、役割別信号名に加えて、代替機能列にコントローラーレベルの汎用別名も記載されています。Wi-Fiバスは`SDIO2_D0–D3`／`SDIO2_CMD`／`SDIO2_CLK`、TFカードバスは`SDIO1_D0–D3`／`SDIO1_CMD`／`SDIO1_CLK`です。

### M2の共用ルール { #m2-sharing-rules }

- ワークブックではSWDを多重化リソースとして扱い、デバッグUARTの位置（ピン43の`SWDIO`、ピン41の`SWCLK`）か、タッチ割り込み／リセットの位置（ピン51の`SWDIO`、ピン49の`SWCLK`）のいずれかを選択します。各モジュールで一方だけを実装し、これらのコンタクトを他用途に使う前に復旧方法を確保してください。
- SPI1は1-bit TFカード経路と共用されます。どちらも汎用`SDIO1_D0–D3`／`CMD`／`CLK`コントローラーバスとして利用でき、ピン65／67はさらに`CAN_TX`／`CAN_RX`に割り当てられています。
- Wi-Fi SDIO2のデータ線は、汎用`SDIO2_D0–D3`／`CMD`／`CLK`コントローラーバスとしても利用できます。同じコンタクトの一部は`GPADC`アナログ入力にもなります。
- SPI2とI2C3／I2C4（コンタクト58、56、54、52）は、`PDM1`／`PDM2`のデジタルマイク信号、および汎用`G0–G3`／`BUS0–BUS3` GPIO別名にも切り替えられます。
- `G11–G16`／`BUS11–BUS16`の6ポジションでは、UART3がコンタクト38／36、UART2が39／37、I2C2のSDA／SCLが35／34を使用します。3本のバスが同一ピンを共用するのではなく、それぞれ別のペアです。各ペアは対応するGPIO別名とコンタクトを共用します。同時動作の可否は選択したモジュールで確認してください。
- QSPIディスプレイと静電容量式タッチは信号上は独立していますが、電源、リセット、ウェイク動作は1つのディスプレイサブシステムとしてレビューしてください。
- `CAN_TX`と`CAN_RX`はピン65／67に多重化されたロジックレベル信号で、独立したコンタクトではありません。キャリアには製品バスに適したCANトランシーバーと保護回路が引き続き必要です。

## M2xMマルチメディアプロファイル { #m2xm-multimedia-profile }

M2xMはマルチメディア割り当て案です。ローカル提案ワークブックではDPI／DVPを主信号群、MIPI DSI／CSIを代替信号群として示していますが、多重化制御や同時使用の条件は定義されていません。この記載だけでは、特定の μForgeモジュールやSoCパッケージでの対応を確認できません。実装前に、選択したモジュールの資料で機能と配線要件を確認してください。

<div align="center"><em>表: M2xMの機能配分</em></div>

<div align="center" markdown>

| 機能 | 提案ワークブックの信号名 | 根拠と制約 |
| --- | --- | --- |
| RGB／DPIディスプレイ | `R0–R7`、`G0–G7`、`B0–B7`、`DPI_CLK`、`DPI_DE`、`DPI_HSYNC`、`DPI_VSYNC`、共用の表示制御信号 | DPIは主信号として記載。8080とEPDの割り当てはワークブックにありません。 |
| MIPI DSI | `DSI_D0±`～`DSI_D3±`、`DSI_C±`、リセット、バックライトPWM、I2C信号 | DSIは代替として記載され、シールド接地用のコンタクトが6個示されています。ワークブックではTE信号は割り当てられていません。 |
| タッチ制御 | 汎用の`I2C_SCL`、`I2C_SDA`、`RESET`信号 | M2xMシートにはタッチ専用の割り込み／リセット割り当てがなく、タッチ対応は確認できません。 |
| 12-bit DVPカメラ | `D0–D11`、MCLK、PCLK、HSYNC、VSYNC、PWDN、リセット、I2C信号 | 20個のコンタクトが示されていますが、I2Cコントローラー番号は記載されていません。 |
| MIPI CSI | D0／D1差動レーン、クロックペア、PWDN、リセット、I2C信号 | CSIは代替として記載され、シールド接地用のコンタクトが4個示されています。多重化と同時動作の条件は未定義です。 |
| デジタルマイク | `PDM1_CLK/DATA`、`PDM2_CLK/DATA` | PDM信号が4本示されています。 |
| I2S／PCM | 利用可能なM2xMシートにI2S／PCM信号やコンタクト割り当てはありません。 | 割り当ては未検証です。承認済み資料がない限り、このマップの機能として扱わないでください。 |

</div>


## M2xNネットワークプロファイル { #m2xn-networking-profile }

M2xNは本ページに記載された未検証のネットワーク拡張概要であり、根拠資料で確認されたコンタクトマップではありません。利用可能な提案ワークブックにはM2xNシートがなく、割り当てを確認できるSiFliの一次資料も見つかっていません。以下の信号一覧と予約コンタクト数は未検証です。

<div align="center"><em>表: M2xNの機能配分</em></div>

<div align="center" markdown>

| 機能 | 草案概要（未検証） |
| --- | --- |
| Ethernet | 草案内にはGigabit Ethernet／RGMIIと`RMII_*`信号名が併記され、記載が矛盾しています。M2xNの元資料となるコンタクトマップもSiFliの一次資料もなく、この不一致を解決できません。インターフェースと速度は未検証です。承認済み資料で確認できるまで、製品対応を主張しないでください。 |
| USB | `USB1_D±`、`USB1_DET`、`USB1_OTG`、`USB2_D±`、`USB2_DET`、`USB2_OTG` |
| CAN | `CAN1_TX/RX`～`CAN4_TX/RX`。割り当て箇所では`CAN1/2_STB`と`CAN1/2_ERR_N`制御信号も含みます。 |
| UART | `UART1_TX/RX/CTS/RTS`、`UART2_TX/RX/CTS/RTS` |
| 予約 | GPIOコンタクト15本、GNDコンタクト12本 |

</div>

## M2xAアナログ／モーション制御プロファイル { #m2xa-analog-and-motion-control-profile }

M2xAは本ページに記載された未検証のモーター制御／データ取得概要であり、根拠資料で確認されたコンタクトマップではありません。利用可能な提案ワークブックにはM2xAシートがなく、割り当てを確認できるSiFliの一次資料も見つかっていません。以下の信号名、数、割り当ては未検証です。

<div align="center"><em>表: M2xAの機能配分</em></div>

<div align="center" markdown>

| 機能 | 草案概要（未検証） |
| --- | --- |
| BLDC制御 | 草案には`PWM1_OUT/OUTN`、`PWM2_OUT/OUTN`、`PWM3_OUT/OUTN`、`BKIN1/2`、`DRV_EN`、`DRV_NFAULT`が記載されています。アナログ入力は、5チャネルを示す2種類の表記（`ADC_IU/V/W`、`ADC_VBUS`、`ADC_NTC`と`ADC_IN1–ADC_IN5`）が食い違っています。別のM2xA概要には`ADC0–ADC2`とあります。M2xAの元資料となるコンタクトマップやSiFliの一次資料はなく、名称、数、割り当てを検証できません。承認済み資料が得られるまで未確定として扱ってください。 |
| 位置フィードバック | `H_A`、`H_B`、`H_C`、`ENC_A`、`ENC_B`、`ENC_Z` |
| 汎用タイミング | `TIM_CH1–TIM_CH6` |
| 予約 | GPIOコンタクト27本、GNDコンタクト13本 |

</div>

## モジュール宣言と実装チェックリスト { #module-declaration-and-implementation-checklist }

モジュール宣言では、ベース配分と対応する各拡張マップを明記します。たとえば`M2`、`M2 + M2xM`、`M2 + M2xN + M2xA`のように記載します。また、実装するM2形式コネクターの数と種類、実装する任意機能、相互排他となる動作モードを示してください。

この案を採用する前に、以下を確認してください。

- 提案コネクターのフットプリント、カード外形、固定機構、挿入方向が、適用されるM.2要件を満たしているか。
- モジュールとキャリアに実装するM2形式コネクターの数、配置、種類。
- モジュールが選択するすべての多重化機能。SDIO1／SDIO2、PDM、SWD（デバッグUARTとタッチ割り込み／リセットのどちらを使うか）、CANの共用配線を含みます。
- モジュール固有のI/O電圧、電流、リセット、ブート、電源シーケンスの要件。
- M2xMのMIPI、RGB、DVP、PDM、I2S機能が同時に利用できるか、代替モードとしてのみ利用できるか。
- CANトランシーバー、USB保護、TFカード電源／検出、ディスプレイ電源、オーディオアンプ、外部PHYに関するキャリア側要件。
