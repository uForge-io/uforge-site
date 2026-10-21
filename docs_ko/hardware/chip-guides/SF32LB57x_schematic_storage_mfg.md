---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB57x MCU의 회로도 설계 가이드라인 중 스토리지 및 연결과 양산 부분으로, 부트 매체, GPIO, UART/I2C/SPI/SDIO/USB/CAN/GPADC, 양산 프로그래밍, 캘리브레이션, 픽스처 접근을 다룹니다."
tags:
    - 하드웨어
    - 칩
---

# SF32LB57x 하드웨어 설계 가이드 — 스토리지 및 양산

!!! note "SF32LB57x 하드웨어 설계 가이드의 일부"
    이 페이지는 회로도 설계 가이드라인의 5.6~5.7절, 즉 스토리지 및 연결과 양산을 다룹니다. [클럭, RF 및 사용자 인터페이스](SF32LB57x_schematic_clock_rf_interfaces.md)로 돌아가거나, [PCB 레이아웃 가이드라인](SF32LB57x_pcb_layout.md)으로 넘어가십시오.

### 5.6. 스토리지 및 연결

#### 5.6.1. 스토리지 및 부트

스토리지와 부트에 관한 결정은 함께 검토해야 합니다. 선택한 부트 매체에 따라 스트랩 저항, 기본 스토리지 전원 상태, 버스 할당, 양산 복구 접근이 정해집니다.

패키지에 SPI NOR 플래시가 내장된 제품은 기본적으로 해당 플래시에서 부팅합니다. 패키지에 SPI NOR 플래시가 내장되지 않은 제품은 외부 스토리지에서 부팅해야 합니다. 외부 부트 매체는 `PA13`(`Bootstrap[1]`)과 `PA17`(`Bootstrap[0]`)로 선택합니다. 원본 회로도에는 각 핀에 점퍼와 7.5 kΩ 풀업 저항 풋프린트가 있으며, `VDD33_VOUT1/VDDIOA`에 연결되어 있습니다.

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-A-Bootstrap.png" width="80%" alt="PA13과 PA17의 부트스트랩 선택 점퍼 및 풀업 저항" /></div>
<div align="center"><em>그림 5.6-1: PA13과 PA17의 부트스트랩 선택 회로</em></div>

<div align="center"><em>표 5.6-1: 외부 부트 매체 선택</em></div>

<div align="center" markdown>

| `PA13` (`Bootstrap[1]`) | `PA17` (`Bootstrap[0]`) | 외부 부트 매체 |
|:------------------------|:------------------------|:---------------------|
| L | L | SPI NOR 플래시 |
| L | H | SPI NAND 플래시 |
| H | L | SD NAND 플래시 |
| H | H | eMMC |

</div>

#### 5.6.2. 스토리지 인터페이스

SF32LB57x는 외부 SPI NOR 플래시, SPI NAND 플래시, SD NAND 플래시, eMMC를 지원합니다. SPI NOR와 SPI NAND는 `PA12`~`PA17`의 MPI3만 지원하며, SD NAND와 eMMC는 두 SDIO 인터페이스 중 어느 쪽에든 연결할 수 있습니다. 일부 주문 가능 제품에서는 패키지 내장 메모리가 MPI3를 점유합니다.

회로도를 확정하기 전에 다음을 확인하십시오.

- 패키지 내장 플래시 또는 PSRAM이 MPI 채널을 점유하는지 여부.
- 지원되는 외부 부트 매체 중 무엇을 사용하는지: SPI NOR, SPI NAND, SD NAND, eMMC.
- IO 전압이 스토리지 디바이스와 일치하는지 여부.
- 풀업, 칩 셀렉트, 클럭, 데이터 라인, 전원 제어가 부트 요구 사항을 충족하는지 여부.
- 외부 부트 매체의 기본 전원 상태가 올바른지 여부.

<div align="center"><em>표 5.6-2: 권장 MPI3 스토리지 연결</em></div>

<div align="center" markdown>

| 스토리지 신호 | SPI NOR / SPI NAND | SD NAND / eMMC |
|:---------------|:-------------------|:---------------|
| `CS#` / `SD2_D2` | `PA12` | `PA12` |
| `SO` / `SD2_D3` | `PA13` | `PA13` |
| `WP#` / `SD2_CLK` | `PA14` | `PA14` |
| `SI` / `SD2_CMD` | `PA15` | `PA15` |
| `SCLK` / `SD2_D0` | `PA16` | `PA16` |
| `HOLD#` / `SD2_D1` | `PA17` | `PA17` |

</div>

#### 5.6.3. 부트 및 전원 제어

eMMC 디바이스에는 `VCC`와 `VCCQ`의 두 전원 도메인이 있습니다. 둘을 함께 스위칭하면 셧다운 전력은 줄어들지만 eMMC의 슬립 복귀가 느려지고 평균 CPU 전력이 높아집니다. `VCCQ`는 켜 둔 채 `VCC`만 스위칭하면 셧다운 전력은 늘어나지만 eMMC의 복귀가 빨라지고 평균 CPU 전력이 낮아집니다.

<div align="center"><em>표 5.6-3: MPI3 외부 스토리지 풀업 요구 사항</em></div>

<div align="center" markdown>

| 외부 매체 | `PA13` | `PA15` | `PA17` |
|:-----------------|:-------|:-------|:-------|
| SPI NOR 플래시 | MPI `D1`: 풀업 없음 | 원본에 명시되지 않음 | MPI `D3`: 풀업 없음 |
| SPI NAND 플래시 | MPI `D1`: 풀업 없음 | 원본에 명시되지 않음 | MPI `D3`: 7.5 kΩ 풀업 |
| SD NAND 플래시 | SD `D3`: 7.5 kΩ 풀업 | SD `CMD`: 7.5 kΩ 풀업 | SD `D1`: 풀업 없음 |
| eMMC | SD `D3`: 7.5 kΩ 풀업 | SD `CMD`: 7.5 kΩ 풀업 | SD `D1`: 7.5 kΩ 풀업 |

</div>

"원본에 명시되지 않음"은 원본 체크리스트가 해당 칸에 요구 사항을 제시하지 않는다는 뜻이며, 풀업이 필요 없다는 의미가 아닙니다.

외부 부트 선택은 표 5.6-1과 그림 5.6-1에 나와 있습니다. 스토리지 전원 스위치의 인에이블 신호는 `PA21`로 고정되어 있으며 High 활성입니다. 전원 변형(variant)에 따라 스토리지 전원을 선택하십시오.

- 배터리 전원 변형: 외부 SPI NOR 플래시는 `VDD33_VOUT1`에서 항상 전원을 공급해도 됩니다. SPI NAND 플래시는 `VDD33_VOUT1` 뒤의 스위치를 통해 전원을 공급해야 합니다. SD NAND 플래시와 eMMC는 외부 LDO를 사용하며, `PA21`로 활성화하는 것이 좋습니다. `PA21`이 없는 패키지 변형은 리셋 기본값이 풀업인 GPIO를 사용할 수 있습니다.
- 3.3 V 전원 변형: 모든 외부 부트 스토리지가 외부 LDO를 사용하며, LDO 인에이블 제어는 `PA21`을 사용하기를 권장합니다.
- SPI NOR 플래시는 항상 전원을 켜 두어도 되지만, SPI NAND, SD NAND, eMMC에는 전원 스위치가 필요합니다. 외부 매체에서 부팅하려면 시작 시 해당 전원이 기본적으로 켜져 있어야 합니다.
- `PA13`과 `PA17`에 풀업 풋프린트를 예약하고, 선택한 부트 매체에 맞춰 실장하십시오. 권장 값은 7.5 kΩ입니다. 핀별 MPI3 요구 사항은 표 5.6-3을 참조하십시오.
- 패키지 내장 스토리지가 이미 MPI3를 점유하고 있으면 외부 MPI3 사용은 SD NAND 또는 eMMC로 제한됩니다. 해당 채널에 외부 SPI NOR/SPI NAND를 연결하지 마십시오.
- 스토리지 디바이스의 동작 IO 전압을 MCU IO 전원에 맞추고, 프로젝트의 승인 업체 목록(AVL)에 등재된 스토리지 부품을 사용하십시오.

#### 5.6.4. GPIO 및 핀 멀티플렉싱

부트, 디버그, 웨이크, USB, 아날로그, 디스플레이, 스토리지, 고속 신호가 그 외에는 유연한 매트릭스 라우팅을 제약할 수 있으므로, 제품 주변 장치를 완전히 할당하기 전에 GPIO를 계획하는 것이 좋습니다.

#### 5.6.5. 핀 계획

SF32LB57x는 유연한 핀 멀티플렉싱을 지원하지만, 다음 신호는 일찍 고정하는 것이 좋습니다.

- RF, 크리스털, 전원, USB, 아날로그 오디오, GPADC, 부트, 디버그 핀.
- 특정 핀 그룹이 필요한 고속 디스플레이, SDIO, 스토리지, DCMI 인터페이스.
- 웨이크 GPIO, 부트 구성, SWD 전환, 양산 테스트 핀.

#### 5.6.6. GPIO 가이드라인

- 사용하지 않는 GPIO는 정해진 상태로 구성하십시오.
- 주변 장치의 IO 전압을 해당 IO 전원 도메인과 일치시키십시오.
- GPIO 풀업의 슬립 누설을 전력 예산에 포함하십시오.
- 핀을 아날로그 입력, USB, 오디오 또는 특수 기능으로 재사용할 때는 사용자 매뉴얼에 따라 디지털 입출력 경로를 구성하십시오.
- 유연한 매트릭스 라우팅이 고속 레이아웃 제약을 없애지는 않습니다. 핀 그룹과 PCB 요구 사항을 지키십시오.

모든 GPIO는 아래 IO MUX 표를 통해 Function 0~15에 도달할 수 있습니다. IO MUX 표의 Function 16-255 열은 매트릭스 라우팅을 가리키며, 이어지는 매트릭스 표에는 기능 인덱스 16~175가 나열되어 있습니다. 회로도를 확정하기 전에 두 표를 함께 사용하여 특정 주변 장치 신호가 어느 물리 핀에 놓일 수 있는지 정확히 확인하십시오.

<div align="center"><em>표 5.6-4: IO MUX 표</em></div>

<div align="center" markdown>

| PAD | PUPD | Function 0 | Function 1 | Function 2 | Function 3 | Function 4 | Function 5 | Function 6 | Function 15 | Function 16-255 |
|:----|:-----|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-------------|:-------------------|
| `PA00` | PD | **`GPIO_A0`** | `LCDC1_SPI_RSTB` | - | `SD2_DIO2` | - | - | - | - | 매트릭스 표 |
| `PA01` | PD | **`GPIO_A1`** | - | - | `SD2_DIO3` | - | - | - | - | 매트릭스 표 |
| `PA02` | PD | **`GPIO_A2`** | `LCDC1_SPI_TE` | - | `SD2_CLK` | - | - | - | - | 매트릭스 표 |
| `PA03` | PU | **`GPIO_A3`** | `LCDC1_SPI_CS` | - | `SD2_CMD` | - | - | - | - | 매트릭스 표 |
| `PA04` | PD | **`GPIO_A4`** | `LCDC1_SPI_CLK` | - | `SD2_DIO0` | - | - | - | - | 매트릭스 표 |
| `PA05` | PD | **`GPIO_A5`** | `LCDC1_SPI_DIO0` | - | `SD2_DIO1` | - | - | - | - | 매트릭스 표 |
| `PA06` | PD | **`GPIO_A6`** | `LCDC1_SPI_DIO1` | `SD1_DIO2` | - | - | - | - | - | 매트릭스 표 |
| `PA07` | PD | **`GPIO_A7`** | `LCDC1_SPI_DIO2` | `SD1_DIO3` | - | - | - | - | - | 매트릭스 표 |
| `PA08` | PD | **`GPIO_A8`** | `LCDC1_SPI_DIO3` | `SD1_CLK` | - | - | - | - | - | 매트릭스 표 |
| `PA09` | PD | **`GPIO_A9`** | - | `SD1_CMD` | - | - | - | - | `#ADC1N` | 매트릭스 표 |
| `PA10` | PD | **`GPIO_A10`** | - | `SD1_DIO0` | - | - | - | - | `#ADC2P` | 매트릭스 표 |
| `PA11` | PU | **`GPIO_A11`** | `MPI3_CS2` | `SD1_DIO1` | - | - | - | - | `#ADC2N` | 매트릭스 표 |
| `PA12` | PU | **`GPIO_A12`** | `MPI3_CS` | `SD1_DIO2` | - | - | - | - | - | 매트릭스 표 |
| `PA13` | PD | **`GPIO_A13`** | `MPI3_DIO1` | `SD1_DIO3` | - | - | - | - | - | 매트릭스 표 |
| `PA14` | PD | **`GPIO_A14`** | `MPI3_DIO2` | `SD1_CLK` | - | - | - | - | - | 매트릭스 표 |
| `PA15` | PD | **`GPIO_A15`** | `MPI3_DIO0` | `SD1_CMD` | - | - | - | - | - | 매트릭스 표 |
| `PA16` | PD | **`GPIO_A16`** | `MPI3_CLK` | `SD1_DIO0` | - | - | - | - | - | 매트릭스 표 |
| `PA17` | PD | **`GPIO_A17`** | `MPI3_DIO3` | `SD1_DIO1` | - | - | - | - | - | 매트릭스 표 |
| `PA18` | PU | `GPIO_A18` | **`USART1_RXD`** | `SWCLK` | - | - | - | - | - | 매트릭스 표 |
| `PA19` | PU | `GPIO_A19` | **`USART1_TXD`** | `SWDIO` | - | - | - | - | - | 매트릭스 표 |
| `PA20` | PD | **`GPIO_A20`** | `SWO` | - | - | - | - | - | - | 매트릭스 표 |
| `PA21` | PD | **`GPIO_A21`** | - | - | - | - | - | - | - | 매트릭스 표 |
| `PA22` | - | **`GPIO_A22`** | - | `SD1_DIO2` | `SD2_DIO2` | - | - | - | `#XTAL32K_XI` | 매트릭스 표 |
| `PA23` | - | **`GPIO_A23`** | - | `SD1_DIO3` | `SD2_DIO3` | - | - | - | `#XTAL32K_XO` | 매트릭스 표 |
| `PA24` | PD | **`GPIO_A24`** | `SPI1_DIO` | `SD1_CLK` | `SD2_CLK` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | 매트릭스 표 |
| `PA25` | PD | **`GPIO_A25`** | `SPI1_DI` | `SD1_CMD` | `SD2_CMD` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | `#XTAL32K_EXT` | 매트릭스 표 |
| `PA26` | PU | **`GPIO_A26`** | - | `SD1_DIO0` | `SD2_DIO0` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | 매트릭스 표 |
| `PA27` | PU | **`GPIO_A27`** | - | `SD1_DIO1` | `SD2_DIO1` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | 매트릭스 표 |
| `PA28` | PD | **`GPIO_A28`** | `SPI1_CLK` | - | `SD2_DIO2` | - | - | - | `#GPADC_CH0` | 매트릭스 표 |
| `PA29` | PD | **`GPIO_A29`** | `SPI1_CS` | - | `SD2_DIO3` | - | - | - | `#GPADC_CH1` | 매트릭스 표 |
| `PA30` | PD | **`GPIO_A30`** | - | - | `SD2_CLK` | `#EFUSE_PWR` | - | - | `#GPADC_CH2` | 매트릭스 표 |
| `PA31` | PD | **`GPIO_A31`** | - | - | `SD2_CMD` | - | - | - | `#GPADC_CH3` | 매트릭스 표 |
| `PA32` | PD | **`GPIO_A32`** | - | - | `SD2_DIO0` | - | - | - | `#GPADC_CH4` | 매트릭스 표 |
| `PA33` | PD | **`GPIO_A33`** | - | - | `SD2_DIO1` | `#WKUP_PIN` | - | - | `#GPADC_CH5` | 매트릭스 표 |
| `PA34` | PD | **`GPIO_A34`** | - | - | - | `#WKUP_PIN` | - | - | `#GPADC_CH6` | 매트릭스 표 |
| `PA35` | PD | **`GPIO_A35`** | - | - | `USB_DP` | `#WKUP_PIN` | - | - | `#GPADC_CH7` | 매트릭스 표 |
| `PA36` | PD | **`GPIO_A36`** | - | - | `USB_DM` | `#WKUP_PIN` | - | - | `#GPADC_CH8` | 매트릭스 표 |
| `PA37` | PD | **`GPIO_A37`** | `SPI2_DIO` | `SD1_DIO2` | - | `#WKUP_PIN` | - | - | `#GPADC_CH9` | 매트릭스 표 |
| `PA38` | PD | **`GPIO_A38`** | `SPI2_DI` | `SD1_DIO3` | - | `#WKUP_PIN` | - | - | `#GPADC_CH10` | 매트릭스 표 |
| `PA39` | PU | **`GPIO_A39`** | `SPI2_CLK` | `SD1_CLK` | - | `#WKUP_PIN` | - | - | - | 매트릭스 표 |
| `PA40` | PU | **`GPIO_A40`** | `SPI2_CS` | `SD1_CMD` | - | `#WKUP_PIN` | - | - | - | 매트릭스 표 |
| `PA41` | PU | **`GPIO_A41`** | - | `SD1_DIO0` | - | `#WKUP_PIN` | - | - | - | 매트릭스 표 |
| `PA42` | PU | **`GPIO_A42`** | - | `SD1_DIO1` | - | `#WKUP_PIN` | - | - | - | 매트릭스 표 |
| `PA43` | PD | `GPIO_A43` | **`SWCLK`** | - | - | - | - | - | - | 매트릭스 표 |
| `PA44` | PD | `GPIO_A44` | **`SWDIO`** | - | - | - | - | - | - | 매트릭스 표 |
| `PA45` | PD | **`GPIO_A45`** | - | - | `SD2_DIO2` | - | - | - | - | 매트릭스 표 |
| `PA46` | PD | **`GPIO_A46`** | - | - | `SD2_DIO3` | - | - | - | - | 매트릭스 표 |
| `PA47` | PD | **`GPIO_A47`** | - | - | `SD2_CLK` | - | - | - | - | 매트릭스 표 |
| `PA48` | PD | **`GPIO_A48`** | - | - | `SD2_CMD` | - | - | - | - | 매트릭스 표 |
| `PA49` | PD | **`GPIO_A49`** | - | - | `SD2_DIO0` | - | - | - | - | 매트릭스 표 |
| `PA50` | PD | **`GPIO_A50`** | - | - | `SD2_DIO1` | - | - | - | - | 매트릭스 표 |
| `PA51` | PD | **`GPIO_A51`** | - | - | - | - | - | - | - | 매트릭스 표 |
| `PA52` | PD | **`GPIO_A52`** | - | - | - | - | - | - | - | 매트릭스 표 |
| `PA53` | PD | **`GPIO_A53`** | - | - | - | - | - | - | - | 매트릭스 표 |
| `PA54` | PD | **`GPIO_A54`** | - | - | - | - | - | - | - | 매트릭스 표 |
| `PA55` | PD | **`GPIO_A55`** | - | - | - | - | - | - | `#ADC1P` | 매트릭스 표 |
| `PA56` | PD | **`GPIO_A56`** | - | - | - | - | - | - | `#MICBIAS` | 매트릭스 표 |
| `PA57` | PD | **`GPIO_A57`** | - | - | - | - | - | - | - | 매트릭스 표 |

</div>

굵게 표시한 것은 리셋 시 해당 핀의 기능입니다. `PUPD`는 리셋 시 내부 풀 방향입니다(`PU` 풀업, `PD` 풀다운, `-` 없음). `#`은 아날로그 기능을 나타냅니다.

!!! note
    - 아날로그 기능은 위 IO MUX 표의 Function 0~15를 통해서만 사용할 수 있습니다.
    - MPI 인터페이스는 `PA11`~`PA17`과 `SB01`~`SB09`만 지원합니다.
    - Sleep, DeepSleep, Standby 모드에서는 `PA24`~`PA27`만 신호를 계속 출력할 수 있으며, 이 핀들은 최대 16 kHz의 LPTIM2 PWM 클럭을 출력할 수 있습니다.
    - `PA18`과 `PA19`는 전용 디버그 핀이며 `DBG-UART`와 `SWD`를 지원합니다.
    - `PA43`과 `PA44`는 예비 디버그 핀이며 `SWD`만 지원합니다.
    - `PA00`과 `PA01`은 디바이스 다운로드 모드와 `SWD` 핀 위치 전환을 구성합니다. 5.7.1절을 참조하십시오.
    - 외부 하드웨어 웨이크 인터럽트는 `PA33`~`PA42`의 GPIO 10개로 제한됩니다.

<div align="center"><em>표 5.6-5: 매트릭스 표 (기능 인덱스 16-175)</em></div>

<div align="center" markdown>

| 모듈 | 비트 폭 | 인덱스 | 하위 인덱스 | 기능 |
|:-------|:----------|:------|:----------|:----------|
| I2C | 8 | 16-23 | 0-7 | `I2C1_SCL`, `I2C1_SDA`, `I2C2_SCL`, `I2C2_SDA`, `I2C3_SCL`, `I2C3_SDA`, `I2C4_SCL`, `I2C4_SDA` (인덱스 순서). |
| SPI | 8 | 24-31 | 8-15 | `SPI1_CLK`, `SPI1_CS`, `SPI1_DI`, `SPI1_DIO`, `SPI2_CLK`, `SPI2_CS`, `SPI2_DI`, `SPI2_DIO` (인덱스 순서). |
| UART | 12 | 32-43 | 16-27 | `UART1_TXD`, `UART1_RXD`, `UART1_RTS`, `UART1_CTS`, `UART2_TXD`, `UART2_RXD`, `UART2_RTS`, `UART2_CTS`, `UART3_TXD`, `UART3_RXD`, `UART3_RTS`, `UART3_CTS` (인덱스 순서). |
| CAN | 4 | 44-47 | 28-31 | `CAN1_TXD`, `CAN1_RXD`, `CAN2_TXD`, `CAN2_RXD` (인덱스 순서). |
| PTA/BT | 6 | 48-53 | 32-37 | `BT_ACTIVE`, `BT_PRIORITY`, `BT_COLLISION`, `WLAN_ACTIVE`, `BT_TX`, `BT_RX` (인덱스 순서). |
| GPTIM | 10 | 54-63 | 38-47 | `GPTIM1_CH1`, `GPTIM1_CH2`, `GPTIM1_CH3`, `GPTIM1_CH4`, `GPTIM1_ETR`, `GPTIM2_CH1`, `GPTIM2_CH2`, `GPTIM2_CH3`, `GPTIM2_CH4`, `GPTIM2_ETR` (인덱스 순서). |
| LPTIM | 6 | 64-69 | 48-53 | `LPTIM1_IN`, `LPTIM1_OUT`, `LPTIM1_ETR`, `LPTIM2_IN`, `LPTIM2_OUT`, `LPTIM2_ETR` (인덱스 순서). |
| ATIM | 20 | 70-89 | 54-73 | `ATIM1_CH1`, `ATIM1_CH2`, `ATIM1_CH3`, `ATIM1_CH4`, `ATIM1_ETR`, `ATIM1_CH1N`, `ATIM1_CH2N`, `ATIM1_CH3N`, `ATIM1_BK`, `ATIM1_BK2`, `ATIM2_CH1`, `ATIM2_CH2`, `ATIM2_CH3`, `ATIM2_CH4`, `ATIM2_ETR`, `ATIM2_CH1N`, `ATIM2_CH2N`, `ATIM2_CH3N`, `ATIM2_BK`, `ATIM2_BK2` (인덱스 순서). |
| PWM | 5 | 90-94 | 74-78 | `PWM1_CH1`, `PWM1_CH2`, `PWM1_CH3`, `PWM1_CH4`, `PWM1_CH5` (인덱스 순서). |
| I2S | 10 | 95-104 | 79-88 | `I2S1_MCLK`, `I2S1_SDO`, `I2S1_SDI`, `I2S1_BCK`, `I2S1_LRCK`, `I2S2_MCLK`, `I2S2_SDO`, `I2S2_SDI`, `I2S2_BCK`, `I2S2_LRCK` (인덱스 순서). |
| PTM | 16 | 105-120 | 89-104 | `PTM1_CH0`~`PTM1_CH15` (인덱스 순서). |
| LCDC | 30 | 121-150 | 105-134 | `LCDC_IF0`~`LCDC_IF29` (인덱스 순서). 인터페이스 모드별 하위 매핑은 표 5.6-6을 참조하십시오. |
| PDM | 6 | 151-156 | 135-140 | `PDM1_CLK`, `PDM2_CLK`, `PDM1_DATA`, `PDM1_DATA2`, `PDM2_DATA`, `PDM2_DATA2` (인덱스 순서). |
| DCMI | 19 | 157-175 | 141-159 | `DCMI_CLK`, `DCMI_HSYNC`, `DCMI_VSYNC`, `DCMI_DI0`~`DCMI_DI15` (인덱스 순서). |

</div>

모든 GPIO는 위의 어느 기능에든 매트릭스 매핑할 수 있습니다(이 가이드의 다른 곳에 기재된 라우팅 및 레이아웃 제약 적용). 인덱스 열과 하위 인덱스 열은 펌웨어에서 매트릭스 라우터를 구성할 때 사용하는 정확한 레지스터 필드 값입니다.

<div align="center"><em>표 5.6-6: LCDC 매트릭스 하위 MUX 표</em></div>

<div align="center" markdown>

| 매트릭스 신호 | SPI (`IF_SEL=0`) | JDI (`IF_SEL=0`) | EPD (`IF_SEL=1`) | DBI (`IF_SEL=2`) | DPI (`IF_SEL=3`) |
|:---------------|:--------------------|:---------------------|:---------------------|:---------------------|:---------------------|
| `LCDC_IF0` | `LCDC_SPI_TE` | - | `LCDC_TCON_GDSP` | `LCDC_8080_TE` | `LCDC_DPI_CLK` |
| `LCDC_IF1` | `LCDC_SPI_RSTB` | - | `LCDC_TCON_GDCLK` | `LCDC_8080_RSTB` | `LCDC_DPI_HSYNC` |
| `LCDC_IF2` | `LCDC_SPI_CS` | - | `LCDC_TCON_SDCLK` | `LCDC_8080_CS` | `LCDC_DPI_VSYNC` |
| `LCDC_IF3` | `LCDC_SPI_CLK` | - | `LCDC_TCON_SDSTL` | `LCDC_8080_WR` | `LCDC_DPI_DE` |
| `LCDC_IF4` | - | - | `LCDC_TCON_SDLE` | `LCDC_8080_RD` | `LCDC_DPI_SD` |
| `LCDC_IF5` | - | - | `LCDC_TCON_SDOE` | `LCDC_8080_DC` | `LCDC_DPI_CM` |
| `LCDC_IF6` | `LCDC_SPI_DIO0` | - | `LCDC_TCON_SDAT0` | `LCDC_8080_DIO0` | `LCDC_DPI_R0` |
| `LCDC_IF7` | `LCDC_SPI_DIO1` | - | `LCDC_TCON_SDAT1` | `LCDC_8080_DIO1` | `LCDC_DPI_R1` |
| `LCDC_IF8` | `LCDC_SPI_DIO2` | - | `LCDC_TCON_SDAT2` | `LCDC_8080_DIO2` | `LCDC_DPI_R2` |
| `LCDC_IF9` | `LCDC_SPI_DIO3` | - | `LCDC_TCON_SDAT3` | `LCDC_8080_DIO3` | `LCDC_DPI_R3` |
| `LCDC_IF10` | - | `LCDC_JDI_SCS` | `LCDC_TCON_SDAT4` | `LCDC_8080_DIO4` | `LCDC_DPI_R4` |
| `LCDC_IF11` | - | `LCDC_JDI_SCLK` | `LCDC_TCON_SDAT5` | `LCDC_8080_DIO5` | `LCDC_DPI_R5` |
| `LCDC_IF12` | - | `LCDC_JDI_SO` | `LCDC_TCON_SDAT6` | `LCDC_8080_DIO6` | `LCDC_DPI_R6` |
| `LCDC_IF13` | - | `LCDC_JDI_DISP` | `LCDC_TCON_SDAT7` | `LCDC_8080_DIO7` | `LCDC_DPI_R7` |
| `LCDC_IF14` | - | `LCDC_JDI_EXTCOMIN` | `LCDC_TCON_SDAT8` | `LCDC_8080_DIO8` | `LCDC_DPI_G0` |
| `LCDC_IF15` | - | - | `LCDC_TCON_SDAT9` | `LCDC_8080_DIO9` | `LCDC_DPI_G1` |
| `LCDC_IF16` | - | - | `LCDC_TCON_SDAT10` | `LCDC_8080_DIO10` | `LCDC_DPI_G2` |
| `LCDC_IF17` | - | - | `LCDC_TCON_SDAT11` | `LCDC_8080_DIO11` | `LCDC_DPI_G3` |
| `LCDC_IF18` | - | `LCDC_JDI_VCK` | `LCDC_TCON_SDAT12` | `LCDC_8080_DIO12` | `LCDC_DPI_G4` |
| `LCDC_IF19` | - | `LCDC_JDI_XRST` | `LCDC_TCON_SDAT13` | `LCDC_8080_DIO13` | `LCDC_DPI_G5` |
| `LCDC_IF20` | - | `LCDC_JDI_HCK` | `LCDC_TCON_SDAT14` | `LCDC_8080_DIO14` | `LCDC_DPI_G6` |
| `LCDC_IF21` | - | `LCDC_JDI_HST` | `LCDC_TCON_SDAT15` | `LCDC_8080_DIO15` | `LCDC_DPI_G7` |
| `LCDC_IF22` | - | `LCDC_JDI_ENB` | - | `LCDC_8080_RWN` | `LCDC_DPI_B0` |
| `LCDC_IF23` | - | `LCDC_JDI_VST` | - | `LCDC_8080_CS2` | `LCDC_DPI_B1` |
| `LCDC_IF24` | - | `LCDC_JDI_R1` | - | - | `LCDC_DPI_B2` |
| `LCDC_IF25` | - | `LCDC_JDI_G1` | - | - | `LCDC_DPI_B3` |
| `LCDC_IF26` | - | `LCDC_JDI_B1` | - | - | `LCDC_DPI_B4` |
| `LCDC_IF27` | - | `LCDC_JDI_R2` | - | - | `LCDC_DPI_B5` |
| `LCDC_IF28` | - | `LCDC_JDI_G2` | - | - | `LCDC_DPI_B6` |
| `LCDC_IF29` | - | `LCDC_JDI_B2` | - | - | `LCDC_DPI_B7` |

</div>

!!! warning "LCDC 하위 MUX 표의 IF_SEL 값"
    SiFli의 원본 표는 SPI와 JDI 모드 모두에 `IF_SEL=0`을 할당합니다. 이 문서는 원본 값을 그대로 유지하지만, 중복 할당은 모호합니다. 패널을 구성하기 전에 해당 SDK 드라이버와 레퍼런스 디자인으로 설정을 확인하십시오. 이 표만으로 레지스터 값을 추정하지 마십시오.

#### 5.6.7. 범용 인터페이스

모든 범용 인터페이스에 같은 검토 패턴을 적용하십시오. 전기적 연결, IO 전압, 리셋/슬립 기본 상태, 풀업 레일, ESD 노출, 부트·디버그·웨이크·고속 기능과의 충돌을 확인합니다.

`PA34`는 전원 키와 길게 누르기 리셋을 지원합니다. 리셋은 High 활성이므로 메인 보드에 10 kΩ 풀다운을 연결하십시오. 키를 누르면 핀이 High가 되고, 10초 동안 길게 누르면 하드웨어 리셋이 발생합니다. GPADC 저항 래더 레퍼런스 회로는 1.1 kΩ, 2.8 kΩ, 5.1 kΩ 키 저항을 사용합니다. 각 노드 라벨은 순서대로 2.97 V/1.62 V, 2.58 V/1.41 V, 2.19 V/1.19 V입니다. `PA34` 노드에는 10 kΩ 풀다운과 그라운드로 연결되는 100 nF 커패시터도 있습니다. 노출되는 모든 키 근처에 ESD 보호를 추가하십시오.

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png" width="80%" alt="PA34 전원 키와 GPADC 저항 분압식 키 입력 기준 회로" /></div>
<div align="center"><em>그림 5.6-2: PA34 전원 키 및 GPADC 키 레퍼런스 회로</em></div>

!!! warning "GPADC 키 전압 라벨"
    SiFli 원본 회로도는 각 키 노드에 슬래시로 구분된 두 전압 값을 표시하지만, 각 값이 나타내는 조건은 설명하지 않습니다. 이 값을 임계값으로 사용하기 전에 대상 전원 구성과 레퍼런스 디자인에 비추어 매핑을 확인하십시오.

#### 5.6.8. 인터페이스 검토 원칙

모든 주변 장치 인터페이스에 대해 네 가지 항목을 검토하십시오.

1. 신호 교차, 풀업/풀다운 저항, ESD, 종단을 포함한 전기적 연결.
2. 주변 장치가 꺼졌을 때의 백파워 위험을 포함한 IO 전압 도메인 호환성.
3. 안전한 리셋 및 슬립 기본 상태.
4. 부트, 다운로드, SWD, USB, 웨이크 또는 고속 디스플레이 멀티플렉싱 기능과의 충돌.

#### 5.6.9. UART

- SF32LB57x는 최대 6 Mbps 보레이트와 구성 가능한 데이터 형식을 지원하는 전이중 UART 3개를 제공합니다. UART 신호는 Function 0~15 핀을 사용하거나 임의의 GPIO로 매트릭스 라우팅할 수 있습니다.
- MCU RXD는 주변 장치 TXD에, MCU TXD는 주변 장치 RXD에 연결합니다.
- 주변 장치 IO 전압을 MCU IO 도메인과 일치시키십시오.
- USB, 부트, 다운로드 또는 디버그 기능과 멀티플렉싱되는 UART 핀은 리셋 상태 동작을 검토하십시오.
- `PA18`과 `PA19`는 기본 `DBG-UART` 핀입니다. 자주 연결하고 분리하는 UART 테스트 인터페이스에는 원본이 `PA18`, `PA19`, `PA43`, `PA44`를 권장하며, 이 GPIO 그룹은 5.5 V까지 허용됩니다. 테스트 리드가 긴 경우 오버슈트를 억제하기 위해 100 Ω 직렬 저항을 추가하십시오.

#### 5.6.10. I2C

- SDA와 SCL에는 풀업 저항이 필요합니다.
- SF32LB57x는 각각 호스트 모드와 디바이스 모드를 지원하는 I2C 인터페이스 4개를 제공하며, 매트릭스 라우팅으로 임의의 GPIO에 할당할 수 있습니다.
- 원본은 Standard-mode(100 kHz)에 4.7 kΩ, Fast-mode(400 kHz)에 2.2 kΩ~3.3 kΩ, Fast-mode Plus(1 MHz)에 1 kΩ~2.2 kΩ을 권장합니다. 400 kHz에서는 2.2 kΩ이 시작점이며, 버스 커패시턴스에 맞춰 조정하십시오.
- 공유 I2C 버스에는 호스트 근처에 풀업 한 세트면 충분하며, 디바이스마다 별도의 세트를 추가하지 마십시오. 풀업은 주변 장치 레일에서 전원을 공급하여 주변 장치와 함께 꺼지도록 하고 슬립 누설이 생기지 않게 하십시오.
- 같은 버스의 모든 디바이스가 고유한 주소를 갖도록 하십시오.

#### 5.6.11. SPI

- SF32LB57x는 각각 호스트 모드와 디바이스 모드를 지원하는 SPI 인터페이스 2개를 제공합니다. Function 0~15 핀 또는 매트릭스 라우팅을 사용할 수 있습니다.
- MCU SDO는 주변 장치 SDI에, MCU SDI는 주변 장치 SDO에 연결합니다.
- CLK, CS, 모드, 위상, 극성, 최대 주파수를 주변 장치 데이터시트와 일치시키십시오.
- 고속 SPI 라우팅은 연속된 기준 그라운드를 두고 짧게 유지하십시오. 신호 무결성 테스트에서 필요하다고 확인되면 직렬 댐핑을 추가하십시오.
- 30 MHz 미만의 SPI는 임의의 GPIO로 매트릭스 라우팅할 수 있으며, 30 MHz를 초과하면 전용 Function 0~Function 15 핀을 우선 사용하십시오.
- 고속 SPI에서는 드라이버 근처에 22 ohm~27 ohm 직렬 저항을 배치하고, 신호 무결성 튜닝을 위해 클럭 라인에 션트 커패시터 풋프린트를 예약하십시오.

#### 5.6.12. SDIO

- SF32LB57x에는 SD/MMC 호스트 컨트롤러가 2개 있으며, 호스트로만 동작하고 SD 카드, SDIO 주변 장치, eMMC에 연결할 수 있습니다. SDIO 신호의 GPIO 할당은 핀 멀티플렉싱 표에 고정되어 있습니다.
- SDIO 신호를 그룹으로 라우팅하십시오.
- 가능하면 전체 길이를 약 50 mm 이내로, 그룹 스큐를 약 6 mm 이내로 유지하십시오.
- CLK, CMD, DATA 트레이스를 연속된 기준 그라운드 위에 두십시오.
- SDIO/eMMC/SD NAND의 풀업, 전원 제어, 전압 도메인을 확인하십시오.
- 24 MHz에서는 CMD와 Data0~Data3에 내부 GPIO 풀업으로 충분할 수 있으며, 48 MHz 이상에서는 CMD와 Data0~Data3에 10 kohm 외부 풀업을 추가하십시오.
- SDIO 신호에 27 ohm~33 ohm 직렬 저항을 추가하고, 클럭 라인에 션트 커패시터 풋프린트를 예약하십시오.
- 외부 TF 카드 소켓에서는 카드 감지 `DET` 핀을 10 kΩ을 통해 3.3 V로 풀업하고, 해당 MCU 핀을 내부 풀업 입력으로 구성하십시오. SDIO 신호와 전원 경로 모두에 ESD 보호를 추가하십시오.

#### 5.6.13. USB

<div align="center"><em>표 5.6-7: USB 핀 할당</em></div>

<div align="center" markdown>

| USB 신호 | GPIO 핀 |
|:------------|:----------|
| `USB_DP` | `PA35` |
| `USB_DM` | `PA36` |

</div>

- USB DP/DN은 90 ohm 차동 쌍으로 라우팅하십시오.
- USB DP/DM에는 보통 `PA35` / `PA36`의 멀티플렉싱 기능을 사용합니다. USB를 활성화할 때는 외부 회로가 리셋 중에 안전하지 않은 레벨을 강제하지 않도록 하십시오.
- ESD는 커넥터 가까이에 배치하고, 신호가 칩에 도달하기 전에 ESD를 거치도록 라우팅하십시오.
- 스텁을 피하고 쌍 매칭과 기준 그라운드 연속성을 유지하십시오.
- 슬립 중 USB 연결로 디바이스를 깨워야 하면 VBUS 저항 분압기를 하드웨어 웨이크 GPIO에 연결하십시오. 이 GPIO를 충전기 연결 감지와 공유하기를 권장합니다.
- `PA35`는 `USB_DP`로, `PA36`은 `USB_DM`으로 고정되어 있으며, 이 기능들은 다시 매핑할 수 없습니다. USB2.0 FS는 최대 12 Mbps를 지원합니다.
- DP/DM의 칩 쪽 가까이에 22 ohm 또는 33 ohm 직렬 저항을 예약하고, 신호 무결성 튜닝용으로 실장하지 않는 션트 커패시터 풋프린트도 함께 예약하십시오.
- USB 인터페이스는 3.3 V 싱글 엔디드 시그널링을 사용합니다. 칩에는 식별 저항이 내장되어 있으며, 소프트웨어가 DP 또는 DM에 1.5 kΩ 풀업을 구성하여 풀 스피드 또는 로우 스피드 디바이스를 식별할 수 있습니다. 핀 멀티플렉싱 충돌을 피하려면 USB를 활성화할 때 `PA35`와 `PA36`을 고임피던스 입력으로 구성하십시오.

#### 5.6.14. CAN

- 이 칩은 CAN 2.0B와 호환되는 CAN 인터페이스 2개를 제공하며, 매트릭스 라우팅으로 임의의 GPIO에 할당할 수 있습니다.
- CAN 트랜시버의 전원과 IO 전압을 MCU와 일치시키십시오.
- 시스템 요구 사항에 따라 종단, 커먼 모드 초크, ESD를 추가하십시오.
- 산업 또는 차량 환경에서는 서지, EFT, ESD, 그라운드 전위차를 검토하십시오.

#### 5.6.15. GPADC

- GPADC 입력 전압을 0 V~3.3 V 정격 범위 안으로 유지하십시오.
- 핀 멀티플렉싱을 통해 GPADC를 사용할 수 있는 핀은 `PA28`~`PA38`(11개)뿐이므로, 다른 핀에는 이 기능을 할당하지 마십시오.
- 분압기 기반 측정에는 1% 저항을 사용하십시오.
- 모든 GPADC 입력에 칩 핀 가까이 100 nF(0.1 uF) 필터링 커패시터를 배치하십시오.
- GPADC 트레이스를 DC/DC, RF, USB, SDIO, 디스플레이 클럭, 충전 루프에서 멀리 두십시오.

<div align="center"><em>표 5.6-8: GPADC 핀 할당</em></div>

<div align="center" markdown>

| 핀 | GPADC 기능 |
|:----|:---------------|
| `PA28` | `GPADC_CH0` |
| `PA29` | `GPADC_CH1` |
| `PA30` | `GPADC_CH2` |
| `PA31` | `GPADC_CH3` |
| `PA32` | `GPADC_CH4` |
| `PA33` | `GPADC_CH5` |
| `PA34` | `GPADC_CH6` |
| `PA35` | `GPADC_CH7` |
| `PA36` | `GPADC_CH8` |
| `PA37` | `GPADC_CH9` |
| `PA38` | `GPADC_CH10` |
| `VBAT` / `VBATS` | `GPADC_CH11`. 배터리 전압 도메인에 속하며 일반 GPADC 핀과 측정 범위가 다릅니다. |

</div>

!!! warning "VBATS 핀 전압과 측정 범위"
    3.3 V 전원 변형의 경우 전원 핀 표는 `VBATS`를 0 V~4.7 V로 기재하지만, 회로도 체크리스트는 배터리 전압 감지 범위를 0 V~4.5 V로 제시합니다. GPADC 측정에는 더 좁은 0 V~4.5 V 범위를 따르고, 핀 표의 4.7 V 한계를 유효한 ADC 측정 범위로 취급하지 마십시오.

### 5.7. 양산

#### 5.7.1. 양산 부트 및 다운로드 모드

기본 디버그/다운로드 핀은 양산 픽스처가 접근할 수 있게 하고, 제품 IO를 할당하기 전에 부트 모드 제어를 예약하십시오. 원본 체크리스트는 `PA43` / `PA44`에 납땜 가능한 테스트 포인트를 요구하며, `PA00`에는 풀업과 테스트 포인트를 요구하고 `PA01`에는 저항과 테스트 포인트를 선택 사항으로 둡니다.

<div align="center"><em>표 5.7-1: 디버그 및 부트 제어 테스트 포인트</em></div>

<div align="center" markdown>

| 신호 | 핀 | 양산 요구 사항 |
|:-------|:----|:------------------------|
| `DBG_UART_RXD` | `PA18` | 기본 디버그 UART 수신 핀을 예약하고 픽스처 접근을 제공합니다. |
| `DBG_UART_TXD` | `PA19` | 기본 디버그 UART 송신 핀을 예약하고 픽스처 접근을 제공합니다. |
| `SWD_CLK` | `PA43` | 납땜 가능한 테스트 포인트를 제공합니다. |
| `SWD_DIO` | `PA44` | 납땜 가능한 테스트 포인트를 제공합니다. |
| 부트 모드 선택 | `PA00` | 풀업과 테스트 포인트를 제공합니다. |
| SWD 위치 선택 | `PA01` | 저항과 테스트 포인트는 선택 사항입니다. |

</div>

<div align="center"><em>표 5.7-2: 부트 모드와 다운로드 인터페이스</em></div>

<div align="center" markdown>

| `PA00` / 부트 레지스터 | `PA01` | 호스트 BOOT 스위치 | 부트 분기 및 사용 가능한 인터페이스 |
|:-----------------------|:-------|:-----------------|:--------------------------------------|
| L | H | 무관 | 정상 부팅. `PA19`는 부트 로그를 출력하지 않고, `PA18` / `PA19`는 SWD로 전환되며 `PA43` / `PA44`의 SWD는 비활성화됩니다. |
| L | L | 꺼짐 | 정상 부팅. `PA19`는 부트 로그를 출력하고, `PA18` / `PA19`는 DBG-UART이며 `PA43` / `PA44`는 SWD입니다. |
| L | L | 켜짐 | 부트 모드. DBG-UART, SWD, UART, USB 프로그래밍을 지원합니다. |
| PA00 또는 부트 레지스터 = 1 | L | 무관 | 부트 모드. DBG-UART, SWD, UART, USB 프로그래밍을 지원합니다. |
| PA00 또는 부트 레지스터 = 1 | H | 무관 | 부트 모드. `PA19`는 부트 로그를 출력하지 않고, SWD/USB 프로그래밍을 지원하며, `PA18` / `PA19`는 SWD로 전환됩니다. |

</div>

!!! warning "원본의 디버그 UART 테스트 포인트 명칭"
    2.10절에는 `DB_UART_RXD`(`G` 없음)가 두 번 나열되어 있습니다. 디버그 핀 표와 체크리스트는 `PA18`을 `DBG_UART_RXD`로, `PA19`를 `DBG_UART_TXD`로 식별합니다. 릴리스 전에 양산 픽스처와 대조하여 의도한 신호 이름을 확인하고, RXD를 두 번 예약하지 마십시오.

<div align="center"><em>표 5.7-3: 원본의 양산 테스트 포인트 목록</em></div>

<div align="center" markdown>

| 원본 목록 | 원본이 명시한 적용 범위 | 나열된 테스트 포인트 |
|:------------|:-----------------------|:-------------------|
| 2.10절 양산 프로그래밍/크리스털 캘리브레이션 목록 | 명시되지 않음 | `VBAT`, `PVDD`, `GND`, `AVDD33`, `PA00`, `PA01`, `DB_UART_RXD` 두 번. |
| 하드웨어 체크리스트 4.8, 항목 1 | 배터리 전원 변형 | `VBAT` 또는 3.3 V, `GND`, `PA18`(`DBG_UART_RXD`), `PA19`(`DBG_UART_TXD`), `VSYS`(3.3 V 변형에는 없음), `PA34`. |
| 하드웨어 체크리스트 4.8, 항목 3 | 모든 모델 | `VBAT` 또는 3.3 V, `GND`, `PA18`, `PA19`, `VDD33_VOUT1`(3.3 V 시리즈에는 없음), `PA00`, `PA01`, `PA34`. 패드 치수, 간격, 방향을 픽스처 프로브에 맞추십시오. |

</div>

#### 5.7.2. 양산 프로그래밍 및 캘리브레이션

원본은 오프라인 프로그래머로 플래시를 프로그래밍하고 크리스털 캘리브레이션을 수행하도록 요구합니다. 이 절에서는 RF 캘리브레이션이나 공급 전류 테스트를 명시하지 않습니다. 양산 패드를 레이아웃할 때는 원본의 프로브 치수, 간격, 방향 요구 사항을 따르고, 표 5.7-3에 나온 서로 다른 테스트 포인트 목록은 양산 픽스처 담당자와 확인하십시오.

[SiFli 오프라인 프로그래머 문서](https://wiki.sifli.com/tools/index.html)를 참조하십시오.
