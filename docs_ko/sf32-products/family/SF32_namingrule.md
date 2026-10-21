---
icon: lucide/tags
description: "SF32LB5xyZxYx6 파트 넘버를 해독하는 방법: 제품 등급, PSRAM 변형, 패키지 유형, 내장 플래시/PSRAM 용량, 온도 등급을 실제 예시와 함께 설명합니다."
tags:
  - 하드웨어
  - 칩
---

# SF32 명명 규칙 { #sf32-naming-convention }

## 칩 명명 { #chip-naming }

### 파트 넘버: ***SF32LB5xyZxYx6*** { #part-number-sf32lb5xyzxyx6 }

!!! note "구문 참고"
    * 소문자 ***x***는 숫자 1자리를 나타냅니다.
    * 대문자 ***Y*** 또는 ***Z***는 알파벳 1자를 나타냅니다.

### 접두사: *SF32LB5xy* { #prefix-sf32lb5xy }

- **SF32** — SiFli 32비트 MCU 시리즈
- **LB** — 제품 라인 식별자
    - **LB**: 저전력 Bluetooth MCU 시리즈
- **5** — 프로세서 제품군
    - **5**: 32비트 Arm Cortex-M33 STAR-MC1 프로세서 또는 이에 상응하는 성능의 RISC-V 프로세서를 기반으로 하는 디바이스
- **x** — 제품 등급
    - **8 / 7**: 애플리케이션 프로세서 2개와 저전력 프로세서 1개. 제품 포지셔닝은 제품군에 따라 다릅니다.
    - **6 / 5**: 중급(애플리케이션 프로세서 ***1개***, 저전력 프로세서 ***1개***)
    - **2**: 비용 최적화(애플리케이션 프로세서 ***1개***, ***전용*** 저전력 Bluetooth 컨트롤러)
- **y** — 디바이스 변형
    - 이 값은 일반적으로 패키지 내장 PSRAM 용량을 반영하며, 정확한 대응 관계는 하위 제품군에 따라 다릅니다.

### 접미사: *ZxYx6* { #suffix-zxyx6 }
- **Z** — 패키지 유형
    - **U**: QFN68
    - **V**: BGA
    - **Y**: QFN80
- **xYx** — 내장 메모리 구성(QSPI-NOR 플래시 및 PSRAM)
  *(참고: 정확한 코드 대응 관계는 패키지와 디바이스 제품군에 따라 다릅니다)*

`ZxYx6` 접미사는 고정 폭 파싱 템플릿이 아니라 제품군 수준의 패턴으로 취급하십시오. 메모리 코드의 개수와 순서는 디바이스 제품군과 패키지에 따라 다릅니다. 숫자로 된 플래시 코드가 없을 수 있고, 여러 디바이스가 내장된 경우 PSRAM 문자가 반복될 수 있습니다. 각 주문 코드는 해당 제품군의 변형 표와 대조하여 해독하십시오.
<div align="center"><em>파트 넘버 접미사 필드 정의</em></div>

<div align="center" markdown>

| 필드 | 유형 | 선택지 | 설명 |
| :--- | :--- | :--- | :--- |
| **x** | 숫자 | **1**~**6** | 일반 QSPI-NOR 플래시 용량 대응:<br>• **1**: 2 Mb<br>• **2**: 4 Mb<br>• **3**: 8 Mb<br>• **4**: 16 Mb<br>• **5**: 32 Mb<br>• **6**: 64 Mb<br>SF32LB57x는 코드 **7**과 **8**도 사용합니다. 아래의 제품군별 대응표를 참고하십시오. |
| **Y** | 알파벳 | **A**~**E** | 내장 PSRAM 용량 및 인터페이스:<br>• **A**: 16 Mb QPI-PSRAM<br>• **B**: 32 Mb OPI-PSRAM<br>• **C**: 64 Mb OPI-PSRAM<br>• **D**: 128 Mb OPI/HPI-PSRAM<br>• **E**: 256 Mb HPI-PSRAM |

</div>

- **6** — 동작 온도 등급
    - **5**: −20 °C~+70 °C (상업용)
    - **6**: −40 °C~+85 °C (산업용)

### SF32LB57x 전용 메모리 코드 { #sf32lb57x-memory-codes }

[하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md#33-packages)의 SF32LB57x 파트 넘버 그림에는 패키지 코드 뒤에 MPI1, MPI2, MPI3 순서로 메모리 위치 코드 3개가 표시되고, 그 뒤에 온도 등급 코드가 이어집니다. 각 MPI 위치의 제품군별 코드는 다음과 같습니다.

<div align="center"><em>표: MPI 위치별 SF32LB57x 메모리 코드</em></div>

<div align="center" markdown>

| 코드 | 해당 MPI 위치에서의 SF32LB57x 의미 |
|:-----|:----------------------------------------------------|
| `N` | 코패키지 메모리 없음 |
| `B` | 32 Mb PSRAM |
| `C` | 64 Mb PSRAM |
| `D` | 128 Mb PSRAM |
| `E` | 256 Mb PSRAM |
| `2` | 4 Mb NOR 플래시 |
| `3` | 8 Mb NOR 플래시 |
| `4` | 16 Mb NOR 플래시 |
| `5` | 32 Mb NOR 플래시 |
| `6` | 64 Mb NOR 플래시 |
| `7` | 128 Mb NOR 플래시 |
| `8` | 256 Mb NOR 플래시 |

</div>

이 대응표는 SF32LB57x 전용입니다. 전체 코드는 정확한 변형 표와 대조하여 확인하십시오. 이 대응표가 모든 조합이 주문 가능한 SKU임을 의미하지는 않습니다.

### 파트 넘버 예시 { #part-number-examples }

#### 예시 1: SF32LB527UD6 { #example-1-sf32lb527ud6 }
**SF32LB52 시리즈** 비용 최적화 MCU 구성:

* **프로세서 구성:** 애플리케이션 프로세서 1개와 전용 저전력 Bluetooth 컨트롤러 프로세서(Arm Cortex-M33 STAR-MC1 기반).
* **패키지:** QFN68 (**U**).
* **메모리 구성:** 내장 128 Mb OPI-PSRAM(**D**).
* **동작 온도:** −40 °C~+85 °C (**6**, 산업용 등급).

#### 예시 2: SF32LB587VEE56 { #example-2-sf32lb587vee56 }
**SF32LB58 시리즈** 플래그십 MCU 구성:

* **프로세서 구성:** 애플리케이션 프로세서 2개와 저전력 프로세서 1개(Arm Cortex-M33 STAR-MC1 기반).
* **패키지:** BGA256 (**V**).
* **메모리 구성:** 내장 256 Mb HPI-PSRAM(**E**) 2개(2x)와 32 Mb QSPI-NOR 플래시(**5**) 1개.
* **동작 온도:** −40 °C~+85 °C (**6**, 산업용 등급).

#### 예시 3: SF32LB57GVD776 { #example-3-sf32lb57gvd776 }

SF32LB57x 변형 표에는 이 부품이 BGA112로 나열되어 있습니다. 메모리 위치 코드는 `D/7/7`입니다. MPI1에는 128 Mb PSRAM이, MPI2와 MPI3에는 각각 128 Mb NOR 플래시가 있습니다. 마지막 `6`은 산업용 온도 등급입니다. 따라서 `776`의 두 번째 `7`은 MPI3 NOR 플래시를 나타냅니다. BGA112의 GPIO 관련 영향은 [SF32 제품군 개요](SF32_family.md)를 참고하십시오.

#### 예시 4: SF32LB57ZVN7N6 { #example-4-sf32lb57zvn7n6 }

SF32LB57x 변형 표에는 이 부품이 BGA112로 나열되어 있습니다. 메모리 위치 코드는 `N/7/N`입니다. MPI1과 MPI3에는 코패키지 메모리가 없고, MPI2에는 128 Mb NOR 플래시가 있습니다. 마지막 `6`은 산업용 온도 등급입니다. 제품군 개요에서는 이 부품의 `58 + 6` 표기가 제한 없이 사용할 수 있는 GPIO 64개를 의미하지 않는 이유를 설명합니다.

### 55x 레거시 접미사 예외 { #legacy-55x-suffix-exceptions }

SF32LB55x 제품군은 현재의 명명 패턴이 정해지기 전에 정의되었으므로, 일부 주문 코드는 레거시 접미사 구성을 유지합니다. 다음 세 주문 코드는 위의 `SF32LB5xyZxYx6` 패턴으로 완전히 해독되지 않습니다: `SF32LB551U4O5`, `SF32LB555V4O6`, `SF32LB555V436`. 일반 패턴으로 필드를 추론하지 말고, 정확한 55x 변형 표와 데이터시트에서 패키지와 메모리 구성을 확인하십시오. `SF32LB557VD3A6`은 현재의 명명 규칙을 따르며 레거시 예외가 아닙니다.

## 모듈 명명 { #module-naming }

### 파트 넘버: ***SF32LB5x-MOD-y-AaaaBbbbCccc*** { #part-number-sf32lb5x-mod-y-aaaabbbbcccc }

!!! note "구문 참고"
    * 일반 접미사에서 `A`, `B`, `C`는 스토리지 필드 3개의 위치를 나타내며, 모든 모듈 이름에 이 문자가 그대로 들어 있는 것은 아닙니다.
    * 사용되는 각 필드의 첫 문자는 스토리지 유형을 나타냅니다. 나머지 숫자는 용량 또는 구성을 나타냅니다.
    * `-y` 하위 유형 필드는 현재 SF32LB52 모듈 제품군에서만 사용됩니다. 공개된 SF32LB56-MOD 및 SF32LB58-MOD 이름에서는 사용하지 않습니다.

### 접두사: *SF32LB5x-MOD-y* { #prefix-sf32lb5x-mod-y }

- **SF32LB5x** — 모듈 MCU 제품군
    - **SF32**, **LB**, **5**는 위의 칩 명명 규칙과 동일하게 각각 시리즈, 제품 라인, 프로세서 제품군을 의미합니다.
    - **x**는 제품 등급을 나타냅니다. **8 / 7**은 애플리케이션 프로세서 2개와 저전력 프로세서 1개이며 포지셔닝은 제품군에 따라 다르고, **6 / 5**는 중급, **2**는 비용 최적화입니다.
- **MOD** — SiFli 모듈 제품.
- **y** — 모듈 하위 유형(제품군에서 정의하는 경우)
    - **1**: SF32LB520/3/5/7 디바이스를 위한 리튬 이온 배터리 직접 동작. 칩 공급 전압 범위는 3.2~4.7 V이며, 표준 구성은 8 MB OPI-PSRAM을 탑재한 SF32LB525UC6을 사용합니다.
    - **A**: SF32LB52B 제품군을 위한 일반 3.3 V 동작. 리튬 이온 배터리 직접 전원 공급은 지원하지 않으며, 칩 공급 전압 범위는 2.97~3.63 V입니다. 표준 구성은 1 MB QSPI-NOR 플래시를 내장한 SF32LB52BU36을 사용합니다.
    - **B**: 52E/52G/52J 제품군을 위한 일반 3.3 V 동작. 리튬 이온 배터리 직접 전원 공급은 지원하지 않으며, 칩 공급 전압 범위는 2.97~3.63 V입니다. 표준 구성은 4 MB OPI-PSRAM을 내장한 SF32LB52EUB6을 사용합니다.

`-A` 모듈에는 외부 NOR 플래시가 실장되어 있지 않습니다. 외부 NOR 플래시 또는 SDIO 주변 장치에 연결할 수 있으며, 여기에는 Wi-Fi, SD-NAND, 4비트 모드의 eMMC가 포함됩니다.

### 접미사: *AaaaBbbbCccc* { #suffix-aaaabbbbcccc }

<div align="center"><em>모듈 파트 넘버 접미사 필드 정의</em></div>

<div align="center" markdown>

| 필드 | 스토리지 유형 코드 | 용량, 구성 및 접미사 |
| :--- | :--- | :--- |
| `Aaaa`<br>가변 플래시 | `N`: QSPI-NOR 플래시<br>`A`: NAND 플래시(인터페이스는 모듈 제품군에 따라 다름)<br>`D`: SD-NAND 플래시<br>`E`: eMMC | `N16`: 16 MB QSPI-NOR 플래시<br>`A128`: SF32LB52-MOD-1에서는 128 MB SPI-NAND, SF32LB56-MOD 및 SF32LB58-MOD에서는 128 MB QSPI-NAND<br>`D128`: SF32LB56-MOD의 128 MB SD-NAND<br>`E4`: SF32LB58-MOD의 4 GB eMMC |
| `Bbbb`<br>PSRAM | `R`: PSRAM | `R4`: 4 MB OPI-PSRAM<br>`R8`: 8 MB OPI-PSRAM<br>`R12`: 4 MB + 8 MB OPI-PSRAM<br>`R16`: 16 MB OPI/HPI-PSRAM<br>`R32`: 16 MB + 16 MB HPI-PSRAM<br>`R64`: 32 MB + 32 MB HPI-PSRAM |
| `Cccc`<br>표준 플래시 | `N`: QSPI-NOR 플래시 | `N1`: 1 MB QSPI-NOR 플래시<br>`N4`: 4 MB QSPI-NOR 플래시 |

</div>

세 접미사 필드는 구분자 없이 이어 붙입니다. `Aaaa`는 가변 플래시 구성, `Bbbb`는 PSRAM 구성, `Cccc`는 표준 플래시 구성입니다. 원본 가이드는 나열된 유형과 용량의 조합만 정의하므로, 모든 유형 코드를 모든 용량 코드와 조합할 수 있다고 가정해서는 안 됩니다. 필드는 문서화된 모듈 구성에서 사용하는 경우에만 나타납니다.

### 파트 넘버 예시 { #part-number-examples_1 }

#### 예시 1: SF32LB52-MOD-1-N16R8 { #example-1-sf32lb52-mod-1-n16r8 }

**SF32LB52 리튬 배터리 모듈 구성:**

* **모듈 하위 유형:** `-1`은 3.2~4.7 V 칩 공급 전압으로 리튬 이온 배터리 직접 동작을 지원합니다.
* **가변 플래시:** `N16`은 16 MB QSPI-NOR 플래시를 나타냅니다.
* **PSRAM:** `R8`은 8 MB OPI-PSRAM을 나타냅니다.

#### 예시 2: SF32LB58-MOD-A128R32N1 { #example-2-sf32lb58-mod-a128r32n1 }

**SF32LB58 플래그십 모듈 구성:**

* **모듈 하위 유형:** 공개된 SF32LB58-MOD 이름에는 `-y` 하위 유형을 사용하지 않습니다.
* **가변 플래시:** `A128`은 이 SF32LB58-MOD 구성의 128 MB QSPI-NAND 플래시를 나타냅니다.
* **PSRAM:** `R32`는 16 MB + 16 MB HPI-PSRAM을 나타냅니다.
* **표준 플래시:** `N1`은 1 MB QSPI-NOR 플래시를 나타냅니다.

이 명명 패턴은 구성을 설명할 뿐이며, 모든 코드 조합이 출시된 SKU라는 보장은 아닙니다. SiFli 가이드는 SF32LB566VCB36과 SF32LB586VDD36을 각각 SF32LB56-MOD 및 SF32LB58-MOD 제품군의 표준 MCU 구성으로 제시하며, 그 밖의 모듈 구성은 맞춤 제작될 수 있습니다. 공급 가능 여부, 실장된 MCU, 핀 배치, 전기적 사양은 해당 모듈 문서에서 확인하십시오.

[SiFli Chip Model Guide](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) · [SiFli Module Model Guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)
