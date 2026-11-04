---
icon: lucide/circle-help
description: "SF32 제품 FAQ: 칩, 모듈과 개발 보드 선택, 메모리와 인터페이스, Bluetooth, GPIO, 모듈 표시, 공급 현황과 맞춤 구성."
tags:
    - 하드웨어
    - 자주 묻는 질문
---

# SF32 FAQ { #sf32-faq }

## 제품 선택 { #choosing-a-product }

### 어떤 SF32 제품군을 선택해야 합니까? { #choosing-a-family }

다음 핵심 선택 기준부터 정리하십시오.

- **디스플레이 해상도:** 필요한 픽셀 수, 디스플레이 인터페이스, 주사율, 프레임버퍼 메모리.
- **Bluetooth 모드:** BLE 전용 또는 BLE와 Classic Bluetooth를 함께 지원하는 듀얼 모드.
- **GPIO 수:** 인터페이스와 메모리 할당을 고려한 뒤 사용할 수 있는 핀 수.
- **패키지 크기:** 차지하는 면적, 핀 피치, PCB 조립 요구 사항.
- **전원:** 배터리 또는 정전압 전원, 동작 전압 범위, I/O 레벨.
- **오디오 기능:** 마이크 채널을 포함한 ADC/DAC, I2S, PDM 요구 사항.

제품군 번호만 보지 말고 정확한 부품을 비교하십시오. 번호가 크다고 항상 더 적합한 것은 아닙니다. 이 기준은 모두 [제품 선택기](../product-selector.md)의 필터로 제공되므로, 그곳에서 설정해 정확한 부품을 추리십시오.

[제품군 비교](SF32_family.md) · [제품 선택기](../product-selector.md)

### 칩, 모듈, 개발 보드 중 무엇을 사용해야 합니까? { #chip-or-modules }

개발 보드는 플랫폼 평가와 펌웨어 검증에 사용합니다. 모듈은 제품 캐리어 보드의 RF, 크리스털, 메모리 배선 작업을 줄여 줍니다. 또한 전체 개발 비용을 줄일 수 있습니다. 소량 생산 제품에서는 모듈 안에 들어 있는 부품의 공급망을 외부에 맡길 수 있고, 모듈의 RF 인증은 세계 일부 지역에서 매우 유용할 수 있습니다. 비용, 크기, 유연성의 이점이 회로도, 레이아웃, RF를 직접 설계할 부담을 정당화하면 칩 다운을 선택하십시오. 어느 방식도 최종 제품 검증을 생략할 수 없습니다. 모듈은 출시되는 대로 계속 추가됩니다.

[제품 계획](product-planning.md)

### 어떤 개발 보드로 시작해야 합니까? { #choosing-a-board }

사용할 칩 제품군의 디스플레이 중심 LCD 개발 보드부터 시작하십시오: [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md), [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md)(N32R16 메모리 버전) 또는 [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md)(N16R32N1 버전). SF32LB52x에는 소형 보드인 [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md), [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md)(웨어러블용 저전력 평가)도 있습니다. 보드의 메모리 버전이 목표 부품과 일치하는지 확인하십시오. 전체 보드 목록은 SiFli 공식 보드 모델 가이드에서 볼 수 있습니다.

[제품 선택기](../product-selector.md) · [공식 개발 보드 모델 가이드](https://wiki.sifli.com/en/board/devkit_guide.html)

### 칩과 모듈의 부품 번호는 어떻게 읽습니까? { #reading-part-numbers }

제품군 접두사만 보지 말고 전체 주문 코드를 확인하십시오. 칩 코드는 디바이스, 패키지, 메모리 구성을 구분하고 모듈 접미사는 실장된 스토리지와 메모리 옵션을 나타냅니다. 명명 규칙의 예제와 기존 예외를 참고한 뒤 공급업체에 주문 가능한 정확한 구성을 확인하십시오.

[SF32 명명 규칙](SF32_namingrule.md)

## 메모리와 사양 { #memory-and-specifications }

### SRAM, PSRAM, 플래시는 어떻게 다릅니까? { #memory-types }

SRAM과 PSRAM은 실행 중 데이터를 저장하며 전원이 제거되면 데이터가 사라집니다. 지원되는 데이터 유지 모드는 디바이스마다 다릅니다. 온칩 SRAM과 외부 또는 동일 패키지 내 PSRAM은 접근 경로, 대역폭, 소비 전력이 다릅니다. 플래시는 펌웨어와 에셋을 저장하는 비휘발성 메모리입니다. 플래시를 늘려도 작업 RAM 부족을 해결하지는 못합니다.

[메모리 유형](../../learn/architecture/psram-and-memory-types.md)

### 애플리케이션에 메모리가 얼마나 필요합니까? { #sizing-memory }

OS, 스택, 힙, 그래픽 버퍼, 오디오 및 동시 작업에 필요한 RAM을 산정하십시오. 기본 프레임버퍼 용량은 너비 × 높이 × 픽셀당 바이트 수 × 버퍼 수이며 행 간격 정렬과 추가 렌더링 버퍼도 고려해야 합니다. 펌웨어, 폰트, 이미지, 오디오, 파일, OTA 이미지용 비휘발성 공간은 별도로 산정하십시오. 목표 워크로드에서 최대 사용량을 측정하십시오.

[그래픽 개요](../../learn/graphics/overview.md) · [제품 계획](product-planning.md)

### NOR, NAND, eMMC는 언제 선택합니까? { #choosing-storage }

용량만 보지 말고 부팅 경로, 접근 패턴, 소프트웨어 지원도 함께 고려하십시오. NOR는 코드와 임의 읽기에 흔히 쓰이고 NAND는 삭제 블록, ECC, 불량 블록 관리가 필요합니다. eMMC는 스토리지 관리 컨트롤러를 포함합니다. 여기의 모듈 설명에서 SPI-NAND와 QSPI-NAND는 같은 스토리지 옵션을 가리키며 제품 차이가 아닙니다. 정확한 디바이스의 부트로더, 드라이버, 파일 시스템 지원을 확인하십시오.

[메모리 유형](../../learn/architecture/psram-and-memory-types.md) · [모듈 접미사 코드](SF32_namingrule.md#module-naming)

### 모든 부품이 제품군에 나열된 기능을 지원합니까? { #family-versus-sku }

아닙니다. 제품군 요약은 여러 부품의 기능을 합쳐 설명할 수 있습니다. 메모리, 전원 요구 사항, 사용 가능한 핀, 노출된 인터페이스는 SKU, 패키지, 핀 멀티플렉싱에 따라 다릅니다. 칩에 있는 주변 장치가 모듈이나 보드에서 노출되지 않을 수도 있습니다. 부품별 표, 데이터시트, 핀 배치와 필요한 기능의 SDK 지원을 확인하십시오.

[제품군 비교](SF32_family.md) · [제품 선택기](../product-selector.md)

## 애플리케이션 적합성 { #application-fit }

### 디스플레이에 맞는 디바이스는 어떻게 선택합니까? { #choosing-a-display }

패널의 전기적 인터페이스와 타이밍부터 맞춘 뒤 해상도, 픽셀 형식, 목표 주사율, 프레임버퍼 메모리와 대역폭을 확인하십시오. 최대 해상도 수치만으로 부드러운 동작이 보장되지는 않습니다. 필요한 그래픽 가속과 패널 드라이버를 확인하고 목표 메모리 구성에서 대표 화면과 애니메이션을 시험하십시오.

[디바이스별 인터페이스 매트릭스](../../learn/graphics/display-controller.md#per-device-interface-matrix) · [디스플레이 컨트롤러](../../learn/graphics/display-controller.md) · [그래픽 개요](../../learn/graphics/overview.md)

### 오디오와 마이크 지원은 어떻게 확인합니까? { #audio-and-microphones }

아날로그 경로는 ADC와 DAC 채널, 디지털 오디오 디바이스는 I2S, 디지털 마이크는 PDM을 확인하십시오. PDM 인터페이스 하나는 최대 두 마이크 채널을 전달할 수 있지만 인터페이스 수가 마이크 수는 아닙니다. 사용 가능한 채널은 핀 노출, 멀티플렉싱, 드라이버, 보드 배선에도 좌우됩니다. 인터페이스 수를 단순히 더하지 말고 목표 구성을 확인하십시오.

[오디오 개요](../../learn/audio/overview.md) · [용어집](../../about/glossary.md)

### 어떤 제품이 BLE, Classic Bluetooth 또는 둘 다 지원합니까? { #bluetooth-modes }

SF32LB55x는 BLE만 지원하며 SF32LB52x, SF32LB56x, SF32LB57x, SF32LB58x는 듀얼 모드 Bluetooth를 제공합니다. 무선 기능이 있다고 모든 SDK 구성에서 모든 프로파일, 코덱, 기능을 지원하는 것은 아닙니다. 필요한 프로파일과 검증된 예제를 확인하십시오. BLE 지원만으로 Classic Bluetooth 오디오나 BLE Audio 지원을 판단할 수는 없습니다.

[제품군 비교](SF32_family.md) · [Bluetooth 개요](../../learn/bluetooth/overview.md)

### 외부 Wi-Fi 디바이스가 필요합니까? { #wifi }

이 카탈로그의 SF32 제품은 Wi-Fi 무선부를 내장하지 않습니다. 선택기의 Wi-Fi 옵션은 내장 Wi-Fi가 아니라 SDIO 기반 외부 연결 경로를 뜻합니다. 외부 디바이스에는 호환되는 전원, 핀, 드라이버, 네트워크 소프트웨어도 필요합니다. SDIO가 있다는 것만으로 동작하는 솔루션이 입증되지는 않습니다.

[제품 선택기](../product-selector.md)

### 실제로 사용할 수 있는 GPIO는 몇 개입니까? { #usable-gpios }

정확한 패키지와 메모리 구성을 기준으로 필요한 인터페이스와 보드 기능에 할당된 핀을 제외하십시오. 모듈은 칩 핀의 일부만 노출합니다. SF32LB57x BGA112의 추가 MPI3/정적 출력 핀은 기능이 제한되어 자유롭게 할당할 수 있는 GPIO가 아닙니다. 표기된 핀 수를 애플리케이션에 보장된 GPIO 수로 간주하지 마십시오.

[제품군 GPIO 참고 사항](SF32_family.md) · [SF32LB57x 변형](../chips/SF32LB57x.md)

## 공급 현황과 제품 계획 { #availability-and-product-planning }

### 모듈의 규제 관련 표기는 제품에 어떤 의미가 있습니까? { #module-markings }

모듈 페이지의 규제 관련 표기 요약에서 해당 표기가 있는 모델을 확인하고, 적용되는 승인 문서와 통합 조건을 요청하십시오. 인쇄된 FCC 식별번호나 CE 마크만으로 최종 제품까지 적용된다는 사실이 입증되지는 않습니다. 안테나, 캐리어 보드, 외함이 바뀌면 적용 조건에 따라 검토해야 합니다.

[52 모듈의 규제 관련 표기](../modules/SF32LB52-MOD-1.md#regulatory-markings) · [56 모듈의 규제 관련 표기](../modules/SF32LB56-MOD.md#regulatory-markings) · [58 모듈의 규제 관련 표기](../modules/SF32LB58-MOD.md#regulatory-markings)

### 다른 메모리나 모듈 구성을 요청할 수 있습니까? { #custom-configurations }

μForge.io에 원하는 칩이나 모듈, 스토리지와 PSRAM 용량, 인터페이스, 안테나 요구 사항, 예상 물량과 일정을 전달하십시오. 설계 확정 전에 실현 가능성, SDK 지원, 최소 주문 수량과 납기를 확인하십시오. 과거 문서의 구성이 현재 공급을 보장하지는 않습니다. SF32LB58-MOD-E4R32N1은 메모리 칩 공급 부족으로 더 이상 공급되지 않습니다.

[μForge.io에 문의](../../about/contact.md) · [58 모듈 공급 현황](../modules/SF32LB58-MOD.md#storage-interfaces-and-module-variants)

### 공급 현황을 확인하고 샘플을 구하려면 어떻게 해야 합니까? { #samples-and-documentation }

선택한 제품 페이지의 구매 및 문서 링크를 사용하고 공급업체에 전체 주문 코드와 필요한 리비전을 명시하십시오. 현재 공급 현황, 메모리, 안테나 옵션, 납기를 확인하십시오. 가능하면 지원되는 평가 보드에서 시작하고 최종 설계 근거로 제품군 요약이 아닌 정확한 부품의 공식 문서를 사용하십시오.

[μForge.io에 문의](../../about/contact.md) · [제품 선택기](../product-selector.md)
