---
icon: lucide/plug
description: "M2 및 M2xM 컨택트 할당 초안과, 검증되지 않은 M2xN 및 M2xA 요약, 신호 공유 노트입니다."
tags:
  - 하드웨어
  - 모듈
  - 인터페이스
---

# M2 인터페이스 정의 { #m2-interface-definition }

!!! warning "인터페이스 정의 초안"
    이 페이지는 M2 제안 초안을 그대로 보존합니다. 로컬 제안 워크북에 M2 및 M2xM 시트가 있지만, 이 워크북은 존재하지 않는 별도의 `M2E接口定义_0714.xlsx`를 인용하고 있으며, 승인 이력과 버전 출처를 확인할 수 없었습니다. 할당이나 개수를 확인해 주는 SiFli 1차 자료는 찾지 못했습니다. 워크북에는 M2xN 및 M2xA 시트가 없으므로, 아래의 해당 요약은 검증되지 않았습니다. 이 문서는 릴리스된 μForge.io 인터페이스 표준이 아닙니다. 모든 할당을 잠정적인 것으로 취급하고, 양산을 확정하기 전에 선택한 모듈, 캐리어, 커넥터, 전기적 한계, 핀 멀티플렉싱을 검증하십시오.

## 범위 { #scope }

로컬 제안 워크북의 M2 및 M2xM 시트는 위치에 1–75번을 부여하지만 24–31번 위치를 컨택트 맵에서 제외하므로, 번호가 부여된 컨택트는 67개입니다. 두 시트 모두 이 맵을 M.2 Key-E 커넥터로 표기하며, M2xM 시트에는 M2 기준 구성이 같은 모듈에 포함되어야 한다는 설명도 있습니다. 이는 제안상의 표기일 뿐, [PCI-SIG M.2 사양](https://pcisig.com/specification-overview/pci-express-m2) 준수, 모듈과 캐리어 간 상호 교환성, 물리 커넥터의 개수와 배치를 입증하는 근거가 아닙니다. M2xN과 M2xA는 이 페이지에 요약으로만 나타나며, 이들에 대한 원본 컨택트 맵은 찾지 못했습니다.

- **M2** — 연결된 디스플레이, 오디오, 스토리지, 디버그, 범용 임베디드 I/O.
- **M2xM** — 멀티미디어 디스플레이, 카메라, PDM 할당 초안. I2S/PCM은 초안 요약에서 언급되지만 사용 가능한 M2xM 시트에는 할당이 없습니다.
- **M2xN** — 네트워킹, USB, CAN, UART 신호.
- **M2xA** — 모터 제어, 아날로그 수집, 엔코더, 타이머 신호.

`M2xH`와 `M2xP`는 명명상 예약으로만 남아 있으며, 현재 초안에서는 컨택트가 할당되어 있지 않습니다.

!!! info "커넥터 관계 미확정"
    로컬 제안 워크북에는 M2xM이 같은 모듈에 M2 기준 구성을 요구한다고 되어 있지만, 두 맵이 별도의 물리 커넥터를 사용하는지 공유하는지는 명시하지 않습니다. 커넥터의 개수나 배치는 추론할 수 없습니다. 워크북에는 M2xN 또는 M2xA 컨택트 맵이 없습니다.

## 커넥터 규칙 { #connector-convention }

로컬 제안 워크북의 M2 시트에서는 카드 에지에서 볼 때 홀수 번호 컨택트가 위쪽 면에, 짝수 번호 컨택트가 아래쪽 면에 표시됩니다. 24–31번 위치는 컨택트 맵에서 빠져 있으며 제안된 키/노치 영역으로 표시됩니다. 이 도면은 M.2 E-key 사양에 대한 기구적 준수를 입증하지 않습니다.

<div align="center"><em>표: M2 커넥터 및 확장 요약</em></div>

<div align="center" markdown>

| 항목 | 정의 |
| --- | --- |
| 커넥터 형식 | 75개 위치의 카드 에지 맵 초안, 컨택트 67개 표시, M.2 E-key 준수 여부 미검증 |
| 제안에서 제외된 위치 | 24–31 (제안된 키/노치 영역으로 표시) |
| 기본 할당 | M2 |
| 멀티미디어 할당 | M2xM |
| 이 초안의 확장 내용 | M2xM 컨택트 맵, M2xN 및 M2xA는 요약만 있으며 원본으로 검증되지 않음 |
| 선언 예시 | `M2 + M2xM` |

</div>

## M2 기본 프로파일 { #m2-base-profile }

M2는 소형 커넥티드 제품을 위한 기본 프로파일입니다. 이 할당은 QSPI 디스플레이와 정전식 터치 패널, Wi-Fi SDIO, 1비트 TF 카드 SDIO, 아날로그 오디오, 디버그, USB, CAN, 범용 버스를 포괄하도록 의도되었습니다. 일부 컨택트는 하나의 모듈이 SoC와 제품 구성에 맞는 기능을 선택할 수 있도록 의도적으로 멀티플렉싱되어 있습니다.

<div align="center"><em>표: M2 기능 할당</em></div>

<div align="center" markdown>

| 기능 | 할당된 신호 | 설계 의도 |
| --- | --- | --- |
| 전원 | `USB_VIN`, `VBAT/VBATS`, `3.3V`, `CHG_INT`, GND | 제안 맵의 레이블입니다. 전압, 전류, 시퀀싱 요건은 여기에 명시되어 있지 않습니다. |
| QSPI 디스플레이 | `LCDC1_SPI_CS`, `CLK`, `DIO0–DIO3`, `CS2`, `TE`, `RSTB`, `LCD_BL_PWM` | QSPI 디스플레이 패널, 백라이트, 선택적 보조 칩 셀렉트. |
| 정전식 터치 | `CTP_I2C1_SDA`, `CTP_I2C1_SCL`, `CTP_INT`, `CTP_REST` | 정전식 터치 제어 및 인터럽트. |
| Wi-Fi | `WiFi_SD2_CLK`, `CMD`, `D0–D3`, `PDN`, `INT`, `WAKE` | 4비트 SDIO Wi-Fi 컴패니언 인터페이스. |
| TF 카드 | `TF_SD1_CMD`, `CLK`, `D0`, `TF_DET` | 1비트 TF 카드 인터페이스와 카드 감지. |
| 아날로그 오디오 | `ADC_1P/N`, `ADC_2P/N`, `MIC_BIAS`, `DAC_1P/N`, `DAC_2P/N`, `AU_PA_EN` | 아날로그 입력 쌍 2개, 마이크 바이어스, DAC 쌍 2개, PA 인에이블. |
| 디버그 및 복구 | `DBG_UART1_TXD/RXD`, `SWDIO`, `SWCLK`, `SWD_SW`, `BOOT_MODE` | 디버그 UART, SWD, 부트/복구 선택. |
| 범용 시리얼 버스 | SPI1/SPI2, I2C2–I2C4, UART2/UART3, 범용 GPIO/버스 라인(`G0–G17`/`BUS0–BUS17`) | 모듈 핀 먹스를 통해 선택하는 제품별 버스입니다. I2C1은 터치 컨트롤러에 할당되어 있습니다. 일부 SPI2/I2C3/I2C4/UART3 위치는 대안으로 `PDM1`/`PDM2` 디지털 마이크 신호를 전달할 수 있습니다. |
| 기타 제어 | `CAN_TX/RX`, USB/USB 호스트 신호, `PWR_KEY` | 필드 버스, USB 역할 제어, 전원 키 입력. |

</div>

## 색상으로 구분한 M2 핀 배치 { #color-coded-m2-pinout-guide }

<div align="center"><em>그림: M2 신호 그룹 색상 범례</em></div>

<div class="m2-visual-guide" role="img" aria-label="Color key for the M2 two-sided pinout table">
<div class="m2-category-band">
<div class="m2-category m2-audio">오디오</div>
<div class="m2-category m2-display">디스플레이</div>
<div class="m2-category m2-touch">터치</div>
<div class="m2-category m2-wireless">Wi-Fi / SDIO</div>
<div class="m2-category m2-bus">SPI / I²C / UART</div>
<div class="m2-category m2-power">USB / 전원</div>
<div class="m2-category m2-debug">전용</div>
</div>
</div>

색상 막대가 표의 범례입니다. 아래의 양면 컨택트 표는 대체 기능과 멀티플렉싱을 포함하여 이 M2 제안의 기준 핀 배치를 기록한 것이며, 릴리스된 인터페이스 사양이 아닙니다.

### M2 컨택트 할당 { #m2-contact-assignment }

이 양면 그리드는 Bottom Pin / Top Pin / CN1 열을 사용합니다. `Alt` 열에는 워크북이 추가로 할당한 멀티플렉싱 기능을 기록합니다. 모든 기능 셀은 위 범례의 해당 카테고리 색상을 사용합니다.

<div align="center"><em>표: M2 기본 컨택트 할당</em></div>

<div align="center" markdown class="m2-grid-scroll" style="max-width: 100%; overflow-x: auto;" tabindex="0">
<table class="m2-grid" markdown="0">
<thead>
<tr><th>Alt</th><th>기능</th><th>Bot&nbsp;pin</th><th>CN1</th><th>Top&nbsp;pin</th><th>기능</th><th>Alt</th></tr>
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
<tr><td class="m2-blank"></td><td class="m2-notch" colspan="2">24–31번 위치 제외(제안된 키/노치 영역)</td><td class="m2-cn1"></td><td class="m2-notch" colspan="2">24–31번 위치 제외(제안된 키/노치 영역)</td><td class="m2-blank"></td></tr>
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

### M2 핀 설명 { #m2-pin-descriptions }

그룹과 색상은 위 컨택트 표와 일치합니다. 워크북은 I/O 방향을 정의하지 않으므로, 이 열은 모듈 기준에서 본 잠정적인 통합 가이드입니다. I는 입력, O는 출력, I/O는 양방향을 뜻합니다. 쉼표로 구분된 방향은 나열된 신호 순서를 따릅니다. SPI와 PDM 항목은 모듈이 클럭을 공급한다고 가정하며, SWD 항목은 외부 디버거를 가정합니다. 모든 방향과 전기적 요건은 선택한 모듈과 SoC 문서에서 확인하십시오.

I2C의 경우 I/O는 양방향 SDA/SCL 버스 라인을 설명하는 것이며, 모든 컨트롤러/타깃 모드나 클럭 스트레칭 기능을 보장한다는 뜻이 아닙니다. 실제 모듈의 핀 구성과 풀업을 확인하십시오. [NXP의 I2C-bus 사양](https://www.nxp.com/docs/en/user-guide/UM10204.pdf)을 참조하십시오. PDM 클럭 출력/데이터 입력 가정은 [ST의 PDM 애플리케이션 노트](https://www.st.com/resource/en/application_note/an5027-interfacing-pdm-digital-microphones-using-stm32-mcus-and-mpus-stmicroelectronics.pdf)에 나온 마이크 호스트 구성을 따른 것이며, 특정 모듈에서의 지원을 입증하지 않습니다.

<div align="center"><em>표: M2 신호 설명과 잠정 방향</em></div>

<div align="center" markdown>

| 신호 그룹 | 신호 | I/O | 설명 |
| --- | --- | :---: | --- |
| <span class="m2-chip m2-power">전원</span> | `VBAT/VBATS` | I | 배터리 입력 레일. |
| <span class="m2-chip m2-power">전원</span> | `3.3V` | I | 3.3 V 전원 레일. |
| <span class="m2-chip m2-power">전원</span> | `CHG_INT` | O | 충전기 인터럽트 / 상태 출력. |
| <span class="m2-chip m2-power">전원</span> | `USB_VIN` | I | USB 입력 / 충전 경로 레일. |
| <span class="m2-chip m2-power">전원</span> | `USB_DET` | I | USB 감지 신호. |
| <span class="m2-chip m2-power">전원</span> | `USBHOST_D+`, `USBHOST_D−` | I/O | USB 호스트 모드 데이터 쌍으로, 기본 USB 포트와는 별개입니다. |
| <span class="m2-chip m2-power">전원</span> | `USB_OTG` | I/O | 제안 워크북의 신호 레이블입니다. 해당 시트는 이를 "현재 플랫폼에서 지원되지 않음"으로 표시합니다. 컨택트 레이블만으로 지원을 추론하지 마십시오. |
| <span class="m2-chip m2-display">디스플레이</span> | `LCDC1_SPI_CS`, `LCDC1_SPI_CS2` | O | QSPI 디스플레이의 기본 및 선택적 보조 칩 셀렉트. |
| <span class="m2-chip m2-display">디스플레이</span> | `LCDC1_SPI_CLK` | O | QSPI 디스플레이 클럭. |
| <span class="m2-chip m2-display">디스플레이</span> | `LCDC1_SPI_DIO0`–`DIO3` | I/O | QSPI 디스플레이 데이터 라인. |
| <span class="m2-chip m2-display">디스플레이</span> | `LCDC1_SPI_TE` | I | 패널에서 오는 티어링 이펙트 동기 입력. |
| <span class="m2-chip m2-display">디스플레이</span> | `LCDC1_SPI_RSTB` | O | 디스플레이 패널 리셋, active low. |
| <span class="m2-chip m2-display">디스플레이</span> | `LCD_BL_PWM` | O | 백라이트 PWM 제어. |
| <span class="m2-chip m2-touch">터치</span> | `CTP_I2C1_SDA`, `CTP_I2C1_SCL` | I/O | 정전식 터치 컨트롤러 I²C 버스. |
| <span class="m2-chip m2-touch">터치</span> | `CTP_INT` | I | 터치 컨트롤러 인터럽트. |
| <span class="m2-chip m2-touch">터치</span> | `CTP_REST` | O | 터치 컨트롤러 리셋. 워크북은 이 신호를 `CTP_REST`로 표기합니다. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_CLK`, `WiFi_SD2_CMD` | O, I/O | Wi-Fi 컴패니언 SDIO 클럭과 커맨드. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_D0`, `WiFi_SD2_D1`, `WiFi_SD2_D2`, `WiFi_SD2_D3` | I/O | Wi-Fi 컴패니언 SDIO 데이터 라인(4비트). |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_PDN` | O | Wi-Fi 모듈 파워다운 제어. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_INT` | I | Wi-Fi 인터럽트. 65번 핀을 `SDIO1_D2`/`CAN_TX`와 공유합니다. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_WAKE` | I/O | Wi-Fi 웨이크 신호. 67번 핀을 `SDIO1_D3`/`CAN_RX`와 공유합니다. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_SD1_CMD`, `TF_SD1_CLK`, `TF_SD1_D0` | I/O, O, I/O | 1비트 TF 카드 SDIO 커맨드, 클럭, 데이터. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_DET` | I | TF 카드 삽입 감지. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `SDIO1_D0–D3`, `SDIO2_D0–D3` | I/O | TF 카드(SDIO1) 버스와 Wi-Fi 컴패니언(SDIO2) 버스의 동일한 물리 라인에 대한 일반적인 컨트롤러 수준 별칭입니다. 모듈이 양쪽 모두에서 완전한 4비트 SDIO를 필요로 하는 경우가 아니면 위의 역할별 이름을 사용하십시오. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `CAN_TX`, `CAN_RX` | O, I | 로직 레벨 CAN 트랜시버 인터페이스로, `WiFi_INT`/`WiFi_WAKE`와 함께 65번과 67번 핀에 멀티플렉싱됩니다. 캐리어에는 여전히 제품 버스에 적합한 CAN 트랜시버와 보호 회로가 필요합니다. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `GPADC` | I | 이 맵에서는 Wi-Fi SDIO 컨택트 74, 72, 70, 68, 66, 64번과 60번 컨택트의 `PWR_KEY`가 ADC 대체 기능을 가집니다. |
| <span class="m2-chip m2-audio">오디오</span> | `ADC_1P/N`, `ADC_2P/N` | I | 차동 아날로그 마이크 입력 쌍 2개. |
| <span class="m2-chip m2-audio">오디오</span> | `MIC_BIAS` | O | 마이크 바이어스 전원. |
| <span class="m2-chip m2-audio">오디오</span> | `DAC_1P/N`, `DAC_2P/N` | O | 차동 오디오 출력 쌍 2개. |
| <span class="m2-chip m2-audio">오디오</span> | `AU_PA_EN` | O | 오디오 파워 앰프 인에이블. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI1_CS#`, `SPI1_SCK`, `SPI1_MOSI`, `SPI1_MISO` | O, O, O, I | SPI1, TF 카드 경로와 멀티플렉싱됩니다. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI2_CS#`, `SPI2_SCK`, `SPI2_MOSI`, `SPI2_MISO` | O, O, O, I | SPI2, I2C3 및 UART2와 멀티플렉싱됩니다. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C2_SDA`, `I2C2_SCL` | I/O | I2C2는 35번 컨택트에 SDA를, 34번 컨택트에 SCL을 사용합니다. 이전의 `MPI/SD` 공유 설명은 이 컨택트 맵으로는 확인되지 않습니다. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C3_SDA`, `I2C3_SCL` | I/O | I2C3, SPI2와 멀티플렉싱됩니다. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C4_SDA`, `I2C4_SCL` | I/O | I2C4, SPI2 및 UART3와 멀티플렉싱됩니다. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART2_TXD/RXD`, `UART2_CTS/RTS` | O/I, I/O | UART2는 TF 카드 및 SPI2 그룹과 39/37번 컨택트에 대체 위치가 있습니다. 이전의 `MPI/SD` 공유 설명은 확인되지 않았으므로, 모듈의 실제 먹스 선택을 점검하십시오. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART3_TXD/RXD` | O/I | UART3는 SPI2/I2C4 그룹과 38/36번 컨택트에 대체 위치가 있습니다. 이전의 `MPI/SD` 공유 설명은 확인되지 않았으므로, 모듈의 실제 먹스 선택을 점검하십시오. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `G0–G17`/`BUS0–BUS17` | I/O | 범용 GPIO/버스 컨택트이며, 위치에 따라 SPI2, I2C2–I2C4, UART2/UART3, `PDM1`/`PDM2`, 또는 SWD와 멀티플렉싱됩니다. |
| <span class="m2-chip m2-audio">오디오</span> | `PDM1_CLK/DATA`, `PDM2_CLK/DATA` | O, I | 디지털 마이크 쌍마다 CLK는 모듈 출력이고 DATA는 모듈 입력입니다. 이 기능들은 58, 56, 54, 52번 컨택트를 SPI2/I2C3/I2C4/UART3와 공유합니다. |
| <span class="m2-chip m2-debug">전용</span> | `DBG_UART1_TXD/RXD` | O/I | 디버그 UART, SWD와 멀티플렉싱됩니다. |
| <span class="m2-chip m2-debug">전용</span> | `SWDIO`, `SWCLK` | I/O, I | SWD 디버그 포트. 공유 옵션은 두 가지입니다. 디버그 UART 위치(43/41번 핀) 또는 터치 인터럽트/리셋 위치(51/49번 핀)입니다. 모듈당 하나만 실장하는 것이 좋습니다. |
| <span class="m2-chip m2-debug">전용</span> | `SWD_SW` | I | 제안 워크북의 신호 레이블이며, 라우팅 제어 동작은 명시되어 있지 않습니다. |
| <span class="m2-chip m2-debug">전용</span> | `BOOT_MODE` | I | 부트 / 복구 모드 선택. |
| <span class="m2-chip m2-debug">전용</span> | `PWR_KEY` | I | 전원 키 신호. |
| <span class="m2-chip m2-gnd">그라운드</span> | `GND` | — | 디지털 및 아날로그 리턴 경로이며, 커넥터 전체에 분산되어 있습니다. |

</div>

!!! info "Wi-Fi SDIO 데이터 레이블 정정"
    로컬 제안 워크북은 64번 컨택트를 `WiFi_SD2_D1`에 할당하며, 이전 리비전에서 이곳에 D3 레이블이 중복되어 있었다고 기록합니다. 이는 초안 워크북 내부의 정정일 뿐이며, SiFli 1차 자료의 핀 먹스 확인이 아닙니다. 두 SDIO 버스는 모두 Alt 열에 일반적인 컨트롤러 수준 별칭도 갖고 있습니다. Wi-Fi 컴패니언 버스는 `SDIO2_D0–D3`/`SDIO2_CMD`/`SDIO2_CLK`, TF 카드 버스는 `SDIO1_D0–D3`/`SDIO1_CMD`/`SDIO1_CLK`이며, 이는 역할별 이름과 함께 표기됩니다.

### M2 공유 규칙 { #m2-sharing-rules }

- 워크북은 SWD를 두 가지 대체 라우팅 옵션을 갖는 멀티플렉싱 리소스로 표시합니다. 디버그 UART 위치(`SWDIO`는 43번 핀, `SWCLK`는 41번 핀) 또는 터치 인터럽트/리셋 위치(`SWDIO`는 51번 핀, `SWCLK`는 49번 핀)입니다. 모듈당 하나의 옵션만 실장하고, 이 컨택트를 다른 용도로 재사용하기 전에 복구 전략을 확보해 두십시오.
- SPI1은 1비트 TF 카드 경로와 공유됩니다. 두 가지 모두 일반적인 `SDIO1_D0–D3`/`CMD`/`CLK` 컨트롤러 버스로도 노출되며, 65/67번 핀은 추가로 `CAN_TX`/`CAN_RX`를 전달합니다.
- Wi-Fi SDIO2 데이터 라인도 일반적인 `SDIO2_D0–D3`/`CMD`/`CLK` 컨트롤러 버스로 노출되며, 이 컨택트 중 일부는 `GPADC` 아날로그 입력으로도 사용됩니다.
- SPI2와 I2C3/I2C4(58, 56, 54, 52번 컨택트)는 대안으로 `PDM1`/`PDM2` 디지털 마이크 신호와 일반적인 `G0–G3`/`BUS0–BUS3` GPIO 별칭을 전달할 수 있습니다.
- 6개 위치의 `G11–G16`/`BUS11–BUS16` 그룹에서 UART3는 38/36번 컨택트를, UART2는 39/37번 컨택트를 사용하고, I2C2는 35/34번에 SDA/SCL을 사용합니다. 이들은 서로 다른 쌍이며, 세 버스가 동일한 핀을 공유하는 것이 아닙니다. 각 쌍은 대응하는 GPIO 별칭과 컨택트를 공유하므로, 선택한 모듈에서 동시 동작이 가능한지 확인하십시오.
- QSPI 디스플레이 그룹과 정전식 터치 그룹은 신호 수준에서는 분리되어 있지만, 전원, 리셋, 웨이크 동작은 하나의 디스플레이 서브시스템으로 함께 검토해야 합니다.
- `CAN_TX`와 `CAN_RX`는 별도로 할당된 컨택트가 아니라 65/67번 핀에 멀티플렉싱된 로직 레벨 신호입니다. 캐리어에는 여전히 제품 버스에 적합한 CAN 트랜시버와 보호 회로가 필요합니다.

## M2xM 멀티미디어 프로파일 { #m2xm-multimedia-profile }

M2xM은 멀티미디어 할당 초안입니다. 로컬 제안 워크북은 DPI와 DVP를 기본 신호 그룹으로, MIPI DSI와 CSI를 대안으로 표시하지만, 먹스 제어나 동시 사용 제약은 정의하지 않습니다. 이러한 레이블은 특정 μForge 모듈이나 SoC 패키지에서의 지원을 입증하지 않습니다. 구현하기 전에 선택한 모듈 문서에서 디바이스 기능과 라우팅을 확인하십시오.

<div align="center"><em>표: M2xM 기능 할당</em></div>

<div align="center" markdown>

| 기능 | 제안 워크북의 레이블 | 근거와 한계 |
| --- | --- | --- |
| RGB / DPI 디스플레이 | `R0–R7`, `G0–G7`, `B0–B7`, `DPI_CLK`, `DPI_DE`, `DPI_HSYNC`, `DPI_VSYNC`, 공유 디스플레이 제어 레이블 | DPI가 기본으로 표시됩니다. 워크북에는 8080 또는 EPD 할당이 나열되어 있지 않습니다. |
| MIPI DSI | `DSI_D0±`–`DSI_D3±`, `DSI_C±`, 리셋, 백라이트 PWM, I2C 레이블 | DSI는 대안으로 표시되며, 6개 컨택트가 실드 그라운드로 지정되어 있습니다. 워크북에는 TE 신호가 할당되어 있지 않습니다. |
| 터치 제어 | 일반적인 `I2C_SCL`, `I2C_SDA`, `RESET` 레이블 | M2xM 시트는 터치 전용 인터럽트/리셋 매핑을 식별하지 않으며, 터치 컨트롤러 지원은 검증되지 않았습니다. |
| 12비트 DVP 카메라 | `D0–D11`, MCLK, PCLK, HSYNC, VSYNC, PWDN, 리셋, I2C 레이블 | 컨택트 20개가 표시되어 있으며, 워크북은 I2C 컨트롤러 번호를 식별하지 않습니다. |
| MIPI CSI | D0/D1 차동 레인, 클럭 쌍, PWDN, 리셋, I2C 레이블 | CSI는 대안으로 표시되며, 4개 컨택트가 실드 그라운드로 지정되어 있습니다. 멀티플렉싱과 동시 사용 세부 사항은 명시되어 있지 않습니다. |
| 디지털 마이크 | `PDM1_CLK/DATA` 및 `PDM2_CLK/DATA` | PDM 신호 4개가 표시되어 있습니다. |
| I2S / PCM | 사용 가능한 M2xM 시트에는 I2S/PCM 신호나 컨택트 할당이 나타나지 않습니다. | 이 할당은 검증되지 않았습니다. 승인된 출처 없이는 I2S/PCM을 이 맵의 일부로 취급하지 마십시오. |

</div>


## M2xN 네트워킹 프로파일 { #m2xn-networking-profile }

M2xN은 이 문서에서 검증되지 않은 네트워킹 프로파일 요약이며, 원본에 기반한 컨택트 맵이 아닙니다. 사용 가능한 제안 워크북에는 M2xN 시트가 없고, 이 할당에 대한 SiFli 1차 자료도 찾지 못했습니다. 아래의 신호 목록과 예약 컨택트 개수를 검증된 것으로 취급해서는 안 됩니다.

<div align="center"><em>표: M2xN 기능 할당</em></div>

<div align="center" markdown>

| 기능 | 요약 초안 (검증되지 않음) |
| --- | --- |
| Ethernet | 초안 텍스트에 Gigabit Ethernet / RGMII와 `RMII_*` 신호라는 상충하는 레이블이 있습니다. 이를 해소할 M2xN 원본 맵이나 SiFli 1차 자료가 여기에는 없습니다. 인터페이스 종류와 속도는 검증되지 않았으므로, 승인된 출처로 확인되기 전에는 제품에서 어느 쪽도 주장하지 마십시오. |
| USB | `USB1_D±`, `USB1_DET`, `USB1_OTG`, `USB2_D±`, `USB2_DET`, `USB2_OTG` |
| CAN | `CAN1_TX/RX`부터 `CAN4_TX/RX`까지, 그리고 할당된 경우 `CAN1/2_STB`와 `CAN1/2_ERR_N` 제어 신호 |
| UART | `UART1_TX/RX/CTS/RTS` 및 `UART2_TX/RX/CTS/RTS` |
| 예약 | GPIO 컨택트 15개와 GND 컨택트 12개 |

</div>

## M2xA 아날로그 및 모션 제어 프로파일 { #m2xa-analog-and-motion-control-profile }

M2xA는 이 문서에서 검증되지 않은 모터 제어 및 수집 요약이며, 원본에 기반한 컨택트 맵이 아닙니다. 사용 가능한 제안 워크북에는 M2xA 시트가 없고, 이 할당에 대한 SiFli 1차 자료도 찾지 못했습니다. 아래의 신호 이름, 개수, 물리적 할당을 검증된 것으로 취급해서는 안 됩니다.

<div align="center"><em>표: M2xA 기능 할당</em></div>

<div align="center" markdown>

| 기능 | 요약 초안 (검증되지 않음) |
| --- | --- |
| BLDC 제어 | 초안에는 `PWM1_OUT/OUTN`, `PWM2_OUT/OUTN`, `PWM3_OUT/OUTN`, `BKIN1/2`, `DRV_EN`, `DRV_NFAULT`가 나열되어 있습니다. 5채널 아날로그 입력 레이블이 서로 일치하지 않는 두 가지(`ADC_IU/V/W`, `ADC_VBUS`, `ADC_NTC` 및 `ADC_IN1–ADC_IN5`)로 제시되며, 별도의 M2xA 요약에는 `ADC0–ADC2`가 나열되어 있습니다. 이름, 개수, 할당을 검증할 M2xA 원본 맵이나 SiFli 1차 자료는 찾지 못했습니다. 승인된 인터페이스 출처가 확보될 때까지 미해결 상태로 취급하십시오. |
| 위치 피드백 | `H_A`, `H_B`, `H_C`, `ENC_A`, `ENC_B`, `ENC_Z` |
| 범용 타이밍 | `TIM_CH1–TIM_CH6` |
| 예약 | GPIO 컨택트 27개와 GND 컨택트 13개 |

</div>

## 모듈 선언과 구현 체크리스트 { #module-declaration-and-implementation-checklist }

모듈 선언에는 기본 할당과 지원하는 각 확장 맵을 명시하는 것이 좋습니다. 예를 들어 `M2`, `M2 + M2xM`, `M2 + M2xN + M2xA`와 같습니다. 구현된 M2 형식 커넥터의 개수와 카테고리, 구현된 선택 기능, 상호 배타적인 모드도 함께 명시하는 것이 좋습니다.

이 초안을 채택하기 전에 다음을 검증하십시오.

- 제안된 커넥터 풋프린트, 카드 외형, 고정 하드웨어, 삽입 방향이 해당 M.2 요건을 충족하는지 여부.
- 모듈과 캐리어에 있는 M2 형식 커넥터의 개수, 배치, 카테고리.
- 공유되는 SDIO1/SDIO2, PDM, SWD(디버그 UART 대 터치 인터럽트/리셋), CAN 라우팅을 포함하여 모듈이 선택한 모든 멀티플렉싱 기능.
- 모듈별 I/O 전압, 전류, 리셋, 부트, 전원 시퀀싱 요건.
- 주장하는 M2xM의 MIPI, RGB, DVP, PDM, I2S 기능이 동시에 지원되는지, 아니면 대체 모드로만 지원되는지 여부.
- CAN 트랜시버, USB 보호, TF 카드 전원/감지, 디스플레이 전원, 오디오 증폭, 외부 PHY에 대한 캐리어 측 요건.
