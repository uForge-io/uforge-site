---
icon: lucide/circuit-board
description: "SF32LB57-DevKit-LCD: RGB 디스플레이, DVP 카메라, PDM 마이크 2개, 스피커, SDIO Wi-Fi 및 USB용 모듈 기반 평가 보드."
tags:
    - 하드웨어
    - 개발 보드
    - SF32LB57
---

# SF32LB57-DevKit-LCD { #sf32lb57-devkit-lcd }

## 개요 { #overview }

SF32LB57-DevKit-LCD는 **SF32LB57-MOD-WD**를 중심으로 SF32LB57x MCU, SDIO Wi-Fi, 부팅 플래시와 주변 장치 연결을 통합한 멀티미디어 평가 보드입니다. SiFli가 이 모듈을 제품으로 제공하려는 것으로 보이며, **WD**가 **Wi-Fi Dual-band**를 뜻한다는 해석은 공식적으로 확인되지 않았습니다. 스마트 HMI, 카메라 단말, 인터콤, 네트워크 디스플레이를 개발하고 캐리어 보드 설계 전에 그래픽, 영상 캡처, 오디오, 연결 기능을 검증하는 데 적합합니다.

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png" alt="SF32LB57-DevKit-LCD — 앞면" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>앞면</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png" alt="SF32LB57-DevKit-LCD — 뒷면" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>뒷면</figcaption></figure>
</div>

## 보드 리소스 { #board-resources }

원문은 240 MHz STAR-MC1 성능 코어 2개, 합산 1968 CoreMark, 리텐션 SRAM 592 KB(HPSYS 512 KB + LPSYS 80 KB)를 명시합니다. 전체 멀티코어 아키텍처는 [SF32LB57x](../chips/SF32LB57x.md)를 참조하십시오. 모듈에는 QSPI-NOR 부팅 플래시, 변형별 OPI-PSRAM, MCU용 48 MHz 크리스털, Wi-Fi용 40 MHz 크리스털이 포함됩니다. 메모리 구성을 선택하기 전에 모듈 마킹을 확인하십시오.

원문은 3.3 V 전원 SF32LB57x 변형과 캐리어 보드 실장용 캐슬레이션 패드를 명시합니다. OPI-PSRAM은 정확한 모듈 부품 번호에 따라 선택되는 구성이며 모든 구성에 실장되는 것은 아닙니다.

<div align="center"><em>보드 리소스</em></div>

<div align="center" markdown>

| 부품 / 커넥터 | 구현 |
|:---|:---|
| 1 · SF32LB57-MOD-WD | SF32LB57x; QSPI-NOR; OPI-PSRAM(선택); SDIO Wi-Fi |
| 2 · USB Type-C | CH343P · USB-to-UART |
| 3 · USB Type-C | USB 2.0 FS · PA35 / PA36 |
| 4 · FPC1 | 40P · 0.5 mm · DPI / RGB888 |
| 5 · FPC4 | 24P · 0.5 mm · DCMI / DVP |
| 6 · J6 | MicroSD / TF · 1-bit SDIO |
| 7 · J3 | 40P · 2 × 20 · 2.54 mm · S-2100S40P-S110 |
| 8 · J7 | MX1.25-2P · 8 Ω |
| 9 · S4 | KEY_RSTN |
| 10 · S1–S3 | PA_34 · GPADC_CH6 |
| 11 · LED1–LED3 | AW9523B · P1_1 / P1_2 / P1_3 |
| 12 · U1 | WS2812B · V1.0: PA_11 · V1.1: PA_08 |
| 13 · ANT | IPEX-1 |
| 14 · U11 | AW9523BTOR · 16 IO · I2C |
| 15 · U8 | NS4150B · Class-D |
| 16 · MIC1 / MIC2 | 2 × PDM · MSM261DGT007 / LMD4020T261-AC23 |

</div>

SiFli는 Wi-Fi 디바이스를 AIC8800D40LS-N으로 명시하며 일부 문장에서 Wi-Fi/Bluetooth 콤보로 설명합니다. SF32 MCU 자체 Bluetooth와 구분해야 합니다. 두 번째 Bluetooth 경로를 사용할 수 있다고 가정하지 말고 실제 실장 부품, RF 스위치 연결, SDK 드라이버를 확인하십시오. 보드는 IPEX-1 안테나 커넥터와 Wi-Fi 전원, 웨이크업, 안테나 전환 제어를 제공합니다.

![블록 다이어그램](assets/sf32lb57x/57DEVKIT_LCD_Block_Diagram-en.svg){ width="100%" loading="lazy" }
<div align="center"><em>블록 다이어그램</em></div>

원본 블록도는 기능 개요이며 배선 기준이 아닙니다. 그림은 TF 데이터 D0–D3과 IO 확장기 아래의 WS2812B를 보여 주지만 본문은 TF를 1비트 SDIO로, WS2812B를 보드 리비전에 따른 MCU PA_11/PA_08 직접 제어로 명시합니다. 해당 회로도와 SDK 핀 설정으로 연결을 확인해야 합니다.

<div style="display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; width: 100%; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg" alt="SF32LB57-DevKit-LCD — 앞면 부품" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>앞면 부품</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg" alt="SF32LB57-DevKit-LCD — 뒷면 부품" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>뒷면 부품</figcaption></figure>
</div>

## 첫 실행 { #getting-started }

디스플레이 검증에는 보드, 호환되는 40핀 / 0.5 mm DPI-RGB 패널, 데이터 USB 케이블, Windows·Linux·macOS 컴퓨터가 필요합니다. IPEX-1 안테나, DVP 카메라, MicroSD/TF 카드, 8 Ω 스피커, J-Link 또는 DAP-Link는 선택 사항입니다. UART 로그와 네이티브 USB 시험을 동시에 수행하려면 데이터 케이블 2개가 필요합니다.

1. 전원을 끈 상태에서 FPC 1번 핀, 접점 방향, 패널 전압을 확인한 뒤 디스플레이를 FPC1에 연결하십시오. 무선 시험 전에 안테나를 장착하십시오.
2. 네이티브 USB가 아닌 USB-to-UART Type-C 포트를 연결하고, SifliTrace 또는 Impeller에서 해당 COM 포트를 선택하십시오.
3. 다운로드 모드로 진입하려면 전원을 켜거나 리셋하기 전에 BOOT MODE 점퍼 J1을 장착하십시오. 정상 모드로 부팅해 시리얼 로그를 확인하려면 J1을 제거한 뒤 리셋하십시오.
4. 먼저 시리얼 hello-world 예제를 실행해 기본 동작을 확인한 다음 단색 화면과 터치 기능을 시험하십시오. 터치 시험은 패널이 터치를 지원하는 경우에만 수행하십시오. 카메라, 오디오, 스토리지, 무선 기능을 하나씩 추가한 뒤 함께 동작하는지 시험하십시오.

출하 펌웨어가 기록된 보드는 켜질 때 기본 UI를 표시할 수 있지만 펌웨어와 패널에 따라 다릅니다. 검은 화면만으로 기록 실패라고 판단하면 안 됩니다. 툴체인, 환경 설정, 플래싱 절차는 [SiFli-SDK 시작하기](../../getting-started/sifli/getting-started-sifli-sdk.md)를 참조하십시오.

## SDK 빌드 대상 { #sdk-build-targets }

현재 SDK 빌드 설정에는 다음 대상이 나열됩니다. 정확한 빌드 식별자이지만 모든 SF32LB57-MOD-WD 보드가 각 대상에 맞는다는 뜻은 아닙니다. SDK 체크아웃과 실제 보드의 메모리, 디스플레이, 핀 설정, 리비전을 대조하십시오. 원문은 WD 모듈 리비전과 이 대상 이름의 대응 관계를 제시하지 않습니다.

- `sf32lb57-lcd_n16r16_dpi`
- `sf32lb57-lcd_n16r8_dpi`
- `sf32lb57-lcd_n16r16_qspi`

SDK 환경을 설정한 후 다음 hello-world 명령은 **하드웨어가 N16R16 DPI 구성과 일치할 때만 적용하는 예**입니다. UART hello-world가 성공해도 디스플레이, 카메라, Wi-Fi 드라이버가 검증된 것은 아닙니다.

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb57-lcd_n16r16_dpi -j8
```

## 전원 및 디버깅 { #power-and-debug }

두 Type-C 커넥터 모두 보드에 5 V를 공급할 수 있습니다. U4(ETA3425D2G)는 주 전원 `VDD_3V3`, U7(ETA3425D2G)은 `IOEX_WF_PWREN`으로 독립 활성화되는 `WF_3V3`를 생성합니다. USB-to-UART 브리지는 CH343P이며 다른 커넥터는 `PA35`/`PA36`의 USB 2.0 FS를 제공합니다. SWD에는 `PA_43`(SWCLK), `PA_44`(SWDIO), 3.3 V 타깃 전압 기준과 공통 GND를 사용합니다. 디버거의 5 V 출력을 3.3 V 핀에 연결하면 안 됩니다.

보드 SWD 도면은 J3의 17번 핀을 3.3 V, 18번을 SWCLK, 19번을 SWDIO, 20번을 GND로 명시합니다. 이는 보드 헤더 번호이며 디버거 어댑터 핀 번호가 아닙니다. 양쪽을 신호 이름에 맞춰 연결하십시오.

![SWD 배선](assets/sf32lb57x/57DEVKIT-LCD-JLINK-Notes.svg){ width="100%" loading="lazy" }
<div align="center"><em>SWD 배선</em></div>

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png" alt="SF32LB57-DevKit-LCD — J-Link 어댑터" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>J-Link 어댑터</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png" alt="SF32LB57-DevKit-LCD — SWD 어댑터" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>SWD 어댑터</figcaption></figure>
</div>

## 디스플레이 및 카메라 { #display-and-camera }

FPC1은 ALIENTEK RGB 핀 순서의 40핀 / 0.5 mm `FPC-05FB-40PH20` 커넥터입니다. 기본값은 RGB888이며 패널과 펌웨어가 지원하면 RGB565/RGB666으로 일부 데이터 핀을 확보할 수 있습니다. FreeIO를 통해 같은 커넥터를 QSPI, MCU8080, EPD, JDI 시험용으로 변환할 수도 있습니다. 올바른 어댑터, 전원 구성, 펌웨어가 필요하며 네이티브 DSI 연결은 아닙니다.

원문에 따르면 전체 24비트 RGB888에는 QFN80 또는 BGA112 기반 모듈이 필요하며 ePicasso 3.0은 2D/2.5D 그래픽 가속기입니다. FPC1의 1번 핀은 백라이트 또는 디스플레이 드라이버 승압 회로용 5 V이며 3.3 V GPIO가 아닙니다. J3의 3번 및 5번 핀은 PA_23/PA_22의 카메라/터치 설정용 I2C 버스를 공유합니다.

!!! warning
    원문은 ePicasso 3.0 처리 한계 2048 × 2048과 전체 화면 60 fps를 언급하지만 뒤에서는 해상도와 주사율이 패널에 따라 다르다고 설명합니다. 이를 2048 × 2048에서 60 fps 보장으로 해석하면 안 됩니다. LCDC 타이밍, 패널 인터페이스, 프레임버퍼, 메모리 대역폭, 실측 부하를 확인하십시오. FPC1의 37–40번 핀도 접점 4개에 제어 신호 후보 5개가 제시되어 확정되지 않았습니다. 패널 연결 전에 `57x LCD-DevKit ioconfig-08192026.xlsx`와 해당 회로도를 확인하십시오.

![RGB 패널 연결](assets/sf32lb57x/57DEVKIT-LCD-RGB-Panel-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>RGB 패널 연결</em></div>

FPC4는 24핀 / 0.5 mm DCMI DVP 커넥터입니다. 원문은 GC032A, OV2640, OV5640, OV3660을 나열하며 기본 구성은 OV2640/OV5640입니다. 다른 모듈은 회로도 주석에 따라 전원 변경이 필요할 수 있습니다. 카메라 전원에는 `DVDD_1V5`, `DVDD_2V8`, `AVDD_2V8`이 있으므로 커넥터뿐 아니라 센서 요구 사항을 맞춰야 합니다. DVP 데이터는 점퍼로 선택되는 핀을 Wi-Fi SDIO 또는 TF 카드 SDIO와 공유합니다. 기본 구성에서는 충돌 기능을 동시에 사용할 수 없습니다.

카메라 전원 레일 3개에는 독립 LDO가 사용됩니다. 전면 주석 이미지에는 카메라 커넥터가 22P로 표기되어 있지만 본문과 FPC4 표는 24핀을 명시합니다. 문서상으로는 24핀 표를 참조하되 카메라를 연결하기 전에 실제 커넥터와 회로도를 확인하십시오. FPC4의 6번 핀 리셋 할당(IOEX_DVP_PDN/RESET)도 불명확하므로 리셋과 전원 차단을 독립적으로 제어할 수 있다고 가정하지 말고 배선을 확인해야 합니다.

![카메라 연결](assets/sf32lb57x/57DEVKIT-LCD-CAM-MOD-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>카메라 연결</em></div>

## 공유 핀 및 리비전 확인 { #shared-pins-and-revisions }

- `PA35`/`PA36`은 FPC1과 네이티브 USB FS에 모두 연결됩니다. 충돌하는 패널 연결과 USB 디바이스 기능을 동시에 사용하면 안 됩니다.
- `PA_43`/`PA_44`의 SWD는 디스플레이/카메라와 핀을 공유하므로 디버깅 복구 경로를 유지하십시오.
- WS2812B는 V1.0에서 `PA_11`, V1.1에서 `PA_08`을 사용합니다. 원문은 `PA_11`을 `BL_PWM`에도 할당하므로 LED나 백라이트를 구동하기 전에 충돌을 해결해야 합니다.
- J3는 Raspberry Pi 40핀의 전원/GND 위치만 따르며 소프트웨어 환경이나 모든 HAT 호환성을 보장하지 않습니다. 확장 보드를 연결하기 전에 전압, pinmux, 공유 신호를 확인하십시오.

## 오디오, 버튼 및 IO 확장 { #audio-controls-and-io-expansion }

원문은 24비트 DAC에서 모노 Class-D 앰프 U8(NS4150B)을 거쳐 J7(`MX1.25-2P`)로 출력하는 재생 경로를 설명하며 기본 스피커는 8 Ω입니다. PDM 마이크 2개는 MSM261DGT007 또는 핀 호환 LMD4020T261-AC23입니다. `PA_56`은 PDM 클럭, `PA_55`는 데이터이며 `IOEX_PDM_PWREN`이 전원을 제어하고 `IOEX_AU_PA_EN`이 앰프를 활성화합니다. 제품에 사용하기 전에 실제 오디오 형식, 게인, 스피커 한계를 확인하십시오.

S1–S3은 `PA_34` / `GPADC_CH6`을 공유하며 원문의 버튼 공칭 전압은 2.97 V, 2.58 V, 2.19 V입니다. S4는 액티브 로우 `KEY_RSTN`입니다. U11(AW9523BTOR)은 `PA_22`(SCL), `PA_23`(SDA)의 I2C로 IO 16개를 제공합니다. 표는 원문의 초기 상태를 유지하지만 실제 보드에서 리셋 동작과 펌웨어 초기화를 확인해야 합니다. 원문 표는 P0_2/P0_3을 명시하지 않습니다.

<div align="center"><em>IO 확장기 초기 상태</em></div>

<div align="center" markdown>

| 포트 | 신호 / 표기 | 초기 상태 | 방향 | 기능 |
|:---|:---|:---|:---|:---|
| P1_0 | IOEX_2.4G_RFSW | 3.3 V | 출력 | 2.4 GHz 안테나 전환 |
| P1_1 | IOEX_LED_R | 3.3 V | 출력 | 빨간색 LED |
| P1_2 | IOEX_LED_G | 3.3 V | 출력 | 녹색 LED |
| P1_3 | IOEX_LED_B | 3.3 V | 출력 | 파란색 LED |
| P1_4 | IOEX_WF_PWRKEY | 0 V | 출력 | Wi-Fi 모듈 전원 키 |
| P1_5 | IOEX_WF_PWREN | 0 V | 출력 | Wi-Fi 3.3 V 벅 활성화 |
| P1_6 | IOEX_CTP_RST | 0 V | 출력 | 터치 컨트롤러 리셋 |
| P1_7 | IOEX_LCD_RESET | 0 V | 출력 | LCD 리셋 |
| P0_0 | IOEX_USB_DET | Hi-Z | 입력 | USB 연결 감지 |
| P0_1 | IOEX_TF_DET | Hi-Z | 입력 | TF 카드 삽입 감지 |
| P0_4 | IOEX_PDM_PWREN | 0 V | 출력 | PDM 마이크 전원 활성화 |
| P0_5 | IOEX_AU_PA_EN | 0 V | 출력 | 오디오 앰프 활성화 |
| P0_6 | IOEX_DVP_PDN | 0 V | 출력 | 카메라 전원 차단 |
| P0_7 | IOEX_HST_WAK_WF | 0 V | 출력 | 호스트의 Wi-Fi 웨이크업 |

</div>

## 커넥터 참조 { #connector-reference }

!!! warning
    다음 표는 원문의 보드 연결을 옮긴 것이며 회로도를 대체하지 않습니다. 모듈 요약에는 미완성 항목(`58~?`)이 있고 `PA_00`/`PA_01`을 USB_DP/USB_DM으로 표기하여 명시된 네이티브 USB 핀 `PA35`/`PA36`과 충돌합니다. 모듈 패드 번호와 MCU GPIO를 구분하고 미확정 행으로 PCB를 설계하면 안 됩니다.

<div align="center"><em>모듈 패드 요약: 원문 미확정 항목 유지</em></div>

<div align="center" markdown>

| 핀 | 신호 / 표기 | 기능 |
|:---|:---|:---|
| 1 | GND | 그라운드 |
| 2 | VDD_3V3 · 3.3 V | 3.3 V 전원 입력 |
| 3 | VDD_1V8 · 1.8 V LDO | 내부 LDO의 1.8 V 출력 |
| 4 | RSTN | 리셋 버튼에 연결된 리셋 |
| 5~22 | PA_41 ~ PA_24 | GPIO / LCDC / SPI / SD / 디버그 멀티플렉싱 |
| 23~36 | PA_23 ~ PA_10 | GPIO / I2C / SD / USB / 오디오 / 디버그 멀티플렉싱 |
| 37 | DAC1P | 차동 DAC 출력 P |
| 38 | DAC1N | 차동 DAC 출력 N |
| 39 | MICBIAS_PA56 / PDM_CLK | 마이크 바이어스 / PDM 클럭 |
| 40 | ADC1P_PA55 / PDM_DAT | 오디오 ADC 입력 P / PDM 데이터 |
| 41 | GND | 그라운드 |
| 42 | PA_00 / USB_DP | GPIO / USB_DP(원문 충돌, 경고 참조) |
| 43 | PA_01 / USB_DM | GPIO / USB_DM(원문 충돌, 경고 참조) |
| 44~53 | PA_07 ~ PA_09, PA_06 | GPIO / SD / 터치 / USB 감지 |
| 54 | GND | 그라운드 |
| 55 | PA_42 | GPIO |
| 56 | PA_43 / SWCLK | SWCLK / GPIO |
| 57 | PA_44 / SWDIO | SWDIO / GPIO |
| 58~? | PA_45 ~ PA_57 · QFN80 / BGA112 | DPI-RGB 상위 데이터 / PDM / Wi-Fi 웨이크업, 모듈 패키지에 따라 인출 여부 결정 |

</div>

<div align="center"><em>J3: 40핀 확장 헤더</em></div>

<div align="center" markdown>

| 핀 | 신호 / 표기 | 연결 / 기능 |
|:---|:---|:---|
| 1 | 3V3 | 3.3 V |
| 2 | 5V | 5 V |
| 3 | IO2 / I2C_SDA | PA_23 · I2C_SDA · DVP / CTP |
| 4 | 5V | 5 V |
| 5 | IO3 / I2C_SCL | PA_22 · I2C_SCL · DVP / CTP |
| 6 | GND | GND |
| 7 | IO4 | PA_27 · DPI_R3 |
| 8 | IO14 | PA_26 · DPI_R2 / DVP_PCLK |
| 9 | GND | GND |
| 10 | IO15 | PA_28 · DPI_R4 / GPADC_CH0 |
| 11 | IO17 | PA_29 · DPI_R5 / GPADC_CH1 |
| 12 | IO18 | PA_30 · DPI_R6 / GPADC_CH2 |
| 13 | IO27 | PA_31 · DPI_R7 |
| 14 | GND | GND |
| 15 | IO22 | PA_32 · DPI_G0 / DVP_D4 |
| 16 | IO23 | PA_33 · DPI_G1 / DVP_D0 / WKUP |
| 17 | 3V3 | 3.3 V |
| 18 | IO24 / SWCLK | PA_43 · DPI_B0 / SWCLK / DVP_D3 |
| 19 | IO10 / SWDIO | PA_44 · DPI_B1 / SWDIO / DVP_D1 |
| 20 | GND | GND |
| 21 | IO9 | PA_38 · DPI_G3 / SPI2_DI |
| 22 | IO25 | PA_37 · DPI_G2 / SPI2_DIO |
| 23 | IO11 | PA_40 · DPI_G5 / SPI2_CS |
| 24 | IO8 | PA_39 · DPI_G4 / SPI2_CLK |
| 25 | GND | GND |
| 26 | IO7 | PA_41 · DPI_G6 |
| 27 | IO0 | PA_45 · DPI_B2 / DVP_D2 |
| 28 | IO1 | PA_42 · DPI_G7 |
| 29 | IO5 | PA_46 · DPI_B6 |
| 30 | GND | GND |
| 31 | IO6 | PA_48 · DPI_CLK / SD2_CMD |
| 32 | IO12 | PA_47 · DPI_B7 / SD2_CLK |
| 33 | IO13 | PA_49 · DPI_HSYNC / SD2_DIO0 |
| 34 | GND | GND |
| 35 | IO19 | PA_50 · DPI_DE / SD2_DIO1 |
| 36 | IO16 | PA_51 · DPI_VSYNC |
| 37 | IO26 | PA_52 · DPI_B3 |
| 38 | IO20 | PA_53 · DPI_B4 |
| 39 | GND | GND |
| 40 | IO21 | PA_54 · DPI_B5 |

</div>

<div align="center"><em>FPC1: RGB 디스플레이 커넥터</em></div>

<div align="center" markdown>

| 핀 | 신호 / 표기 |
|:---|:---|
| 1 | 5V |
| 2 | GND |
| 3 | PA_24 · DPI_R0 |
| 4 | PA_25 · DPI_R1 |
| 5 | PA_26 · DPI_R2 |
| 6 | PA_27 · DPI_R3 |
| 7 | PA_28 · DPI_R4 |
| 8 | PA_29 · DPI_R5 |
| 9 | PA_30 · DPI_R6 |
| 10 | PA_31 · DPI_R7 |
| 11 | GND |
| 12 | GND |
| 13 | PA_32 · DPI_G0 |
| 14 | PA_33 · DPI_G1 |
| 15 | PA_34 · PWRKEY / GPADC_CH6 |
| 16 | PA_35 · USB_DP |
| 17 | PA_36 · USB_DM |
| 18 | PA_37 · DPI_G2 |
| 19 | PA_38 · DPI_G3 |
| 20 | GND |
| 21 | PA_39 · DPI_G4 |
| 22 | PA_40 · DPI_G5 |
| 23 | PA_41 · DPI_G6 |
| 24 | PA_42 · DPI_G7 |
| 25 | PA_43 · DPI_B0 |
| 26 | PA_44 · DPI_B1 |
| 27 | PA_45 · DPI_B2 |
| 28 | PA_52 · DPI_B3 |
| 29 | PA_53 · DPI_B4 |
| 30 | PA_54 · DPI_B5 |
| 31 | PA_46 · DPI_B6 |
| 32 | PA_47 · DPI_B7 |
| 33 | PA_48 · DPI_CLK |
| 34 | PA_49 · DPI_HSYNC |
| 35 | PA_50 · DPI_DE |
| 36 | PA_51 · DPI_VSYNC |
| 37~40 | 제어 신호: 할당 확인 필요: PA_11 / BL_PWM, IOEX_CTP_RST, I2C_SDA / PA_23, I2C_SCL / PA_22, IOEX_LCD_RST |

</div>

<div align="center"><em>FPC4: DVP 카메라 커넥터</em></div>

<div align="center" markdown>

| 핀 | 신호 / 표기 |
|:---|:---|
| 1 | NC |
| 2 | GND |
| 3 | I2C_SDA |
| 4 | VDD_2V8 · 2.8 V |
| 5 | I2C_SCL |
| 6 | RESET · IOEX_DVP_PDN/RESET |
| 7 | VSYNC |
| 8 | PWDN · IOEX_DVP_PDN |
| 9 | HSYNC |
| 10 | NC |
| 11 | D0 |
| 12 | D1 |
| 13 | D2 |
| 14 | D3 |
| 15 | D4 |
| 16 | D5 |
| 17 | D6 |
| 18 | D7 |
| 19 | MCLK |
| 20 | PCLK |
| 21 | GND |
| 22 | AVDD_2V8 · 2.8 V |
| 23 | NC |
| 24 | GND |

</div>

## 출처 및 후속 설계 { #related-documents }

맞춤 보드는 [SF32LB57x 하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)와 [양산 설계](../../hardware/design-for-production.md)를 참조하십시오. 하위 시스템 개발은 [그래픽](../../learn/graphics/overview.md), [오디오](../../learn/audio/overview.md), [Bluetooth](../../learn/bluetooth/overview.md)를 이어서 살펴볼 수 있습니다.

- [SiFli SF32LB57x 제품 자료](https://wiki.sifli.com/silicon/product-index.html#sf32lb57x)
- [SiFli 사용자 매뉴얼 다운로드](https://downloads.sifli.com/user%20manual/)
- [SF32LB57x 원본 하드웨어 설계 가이드](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)

보드 원문은 SF32LB57x 사용자 매뉴얼을 공개 예정으로 표시합니다. 현재 제공 여부는 다운로드 디렉터리에서 확인하십시오.

- [중국어 원문 보드 가이드](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)
- [Markdown 원문](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb57x/SF32LB57-DevKit-LCD.md)
- [SDK 빌드 설정](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)
- [디스플레이 도구](https://wiki.sifli.com/tools/%E5%B1%8F%E5%B9%95%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95.html)
- [Impeller 플래싱 도구](https://wiki.sifli.com/tools/%E7%83%A7%E5%BD%95%E5%B7%A5%E5%85%B7.html)
- [SiFli 스토어](https://sifli.taobao.com/)

SiFli 원문은 샘플 및 소량 구매를 공식 스토어로, 대량 문의를 sales@sifli.com으로 안내합니다. 오픈소스 프로젝트용 샘플 신청과 QQ 그룹 674699679도 언급하므로 자격과 현재 공급 여부는 SiFli에 확인하십시오. 프로젝트는 [μForge.io에 문의](../../about/contact.md)할 수 있습니다.
