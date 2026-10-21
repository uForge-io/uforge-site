---
icon: lucide/clipboard-check
hide:
    - navigation
description: "SF32LB57x 하드웨어 설계 가이드의 고객 설계 자체 점검, 관련 문서와 참고 자료, 부록, 개정 이력입니다."
tags:
    - 하드웨어
    - 칩
---

# SF32LB57x 하드웨어 설계 가이드 — 설계 검토 체크리스트 및 참고 자료 { #sf32lb57x-hardware-design-guide-design-review-checklist-and-references }

!!! note "SF32LB57x 하드웨어 설계 가이드의 일부"
    이 페이지는 7~10절, 즉 고객 설계 자체 점검, 관련 문서 및 참고 자료, 부록, 개정 이력을 다룹니다. [PCB 레이아웃 가이드라인](SF32LB57x_pcb_layout.md)으로 돌아가십시오.

## 7. 고객 설계 자체 점검 { #7-customer-design-self-check }

회로도 또는 PCB 레이아웃 검토를 요청하거나 EVT 릴리스를 진행하기 전에 이 체크리스트를 완료하십시오. 고객사 설계 담당자는 각 항목의 결과와 증빙을 기록하고, 해당하는 경우 회로도 페이지를 명시하고 PCB 스크린샷, 측정값, 검토 기록을 첨부하는 것이 좋습니다.

### 7.1. 패키지와 부품 번호 { #71-package-and-part-number }

- [ ] 주문 가능한 부품 번호, 전원 계열, 패키지, 핀 배치를 확인했습니다.
- [ ] 회로도 라이브러리 심볼과 PCB 풋프린트가 데이터시트와 일치합니다.
- [ ] QFN<!-- BGA-ONLY -->/BGA<!-- /BGA-ONLY --> 패드, 스텐실, 노출 패드, 비아 설계를 검토했습니다.

### 7.2. 전원 { #72-power }

- [ ] 모든 전원 핀이 지정된 전압 및 부하 한계 이내입니다. 커패시터 값과 배치가 데이터시트 요구 사항을 충족합니다.
- [ ] BUCK 인덕터, 커패시터, 피드백 라우팅이 레이아웃 요구 사항을 충족합니다.
- [ ] 내부 LDO 출력을 대전류 주변 장치 전원으로 잘못 사용하지 않았습니다.
- [ ] 전원 연결이 선택한 전원 계열과 일치합니다. 배터리 전원 토폴로지와 3.3 V 전원 토폴로지를 혼용하지 말고, 충전기/OVP, VBUS, VBAT, VCC 및/또는 PVDD 연결을 정확한 패키지 및 변형별 전원 표와 대조하십시오.
- [ ] 주변 장치 전원 레일을 차단할 수 있으며, 전원 차단 시 기본 상태가 안전합니다.

### 7.3. 클럭 { #73-clocks }

- [ ] 48 MHz 및 32.768 kHz 크리스털이 권장 파라미터를 충족합니다.
- [ ] 크리스털을 칩 가까이에 배치했고 그 주위에 금지 구역을 정의했습니다.
- [ ] 크리스털 라우팅이 전원, RF, USB, SDIO, 디스플레이, 충전 노이즈에서 멀리 떨어져 있습니다.

### 7.4. 스토리지와 부트 { #74-storage-and-boot }

- [ ] 선택한 부품에 코패키지 메모리가 포함된 경우, 해당 패키지 및 변형에서 그 구성과 사용 가능한 외부 메모리 인터페이스 및 패키지 핀에 미치는 영향을 확인했습니다.
- [ ] 외부 부트 미디어 유형, 풀업, 전원 제어, 기본 상태가 올바릅니다.
- [ ] 부트 구성과 다운로드/디버그 테스트 포인트를 미리 확보했습니다.

### 7.5. RF { #75-rf }

- [ ] 안테나 급전 트레이스를 50 Ω 임피던스 제어로 설계했습니다.
- [ ] π 매칭 회로를 칩 가까이에 배치했습니다.
- [ ] RF 트레이스에 연속적인 레퍼런스 그라운드와 비아 실드가 있습니다.
- [ ] RF가 노이즈원 및 고속 인터페이스에서 격리되어 있습니다.

### 7.6. 디스플레이와 터치 { #76-display-and-touch }

- [ ] 디스플레이 인터페이스, 해상도, 핀 그룹이 패널 요구 사항을 충족합니다.
- [ ] 디스플레이, 백라이트, 터치 전원을 제어할 수 있습니다.
- [ ] 웨이크업이 필요한 경우 터치 인터럽트가 웨이크업 가능한 GPIO를 사용합니다.
- [ ] FPC와 고속 디스플레이 트레이스를 RF에서 멀리 떨어뜨렸습니다.

### 7.7. 오디오와 아날로그 { #77-audio-and-analog }

- [ ] MIC_BIAS, AUD_VREF, AVDD33_AUD 디커플링이 올바릅니다.
- [ ] 아날로그 입력의 DC 차단과 필터링이 올바릅니다.
- [ ] DACP/DACN 차동 라우팅과 매칭 회로가 올바릅니다.
- [ ] GPADC 입력 전압, 분압기, 필터링, 실드가 올바릅니다.

### 7.8. 범용 인터페이스 { #78-general-interfaces }

- [ ] UART, I2C, SPI, SDIO, USB, CAN 배선과 IO 레벨이 올바릅니다.
- [ ] I2C 풀업 레일은 해당 주변 장치 I/O 전원과 함께 전환되어, 그 도메인이 꺼졌을 때 누설이 생기지 않습니다.
- [ ] 필요에 따라 USB ESD 보호, 90 Ω 차동 라우팅, VBUS 웨이크업 감지를 구현했습니다.
- [ ] 외부 웨이크업 신호는 웨이크업 가능한 핀을 사용합니다.

### 7.9. 양산과 신뢰성 { #79-production-and-reliability }

- [ ] DBG-UART, SWD, 부트 모드, PA00, PA01, PA34, 전원, 그라운드 테스트 포인트를 미리 확보했습니다.
- [ ] 테스트 포인트가 픽스처 프로브 요구 사항을 충족합니다.
- [ ] ESD, EOS, OVP, 역접속 보호, 서지 대책을 검토했습니다.
- [ ] 양산 펌웨어 다운로드, 크리스털 캘리브레이션, RF 테스트 절차를 실행할 수 있습니다.

### 7.10. 설계 검토 릴리스 기준 { #710-review-release-criteria }

설계를 동결하기 전에 다음 릴리스 기준을 사용하십시오.

- [ ] 해당하는 모든 항목을 회로도 페이지 참조, PCB 스크린샷, 측정값, 검토 메모 같은 근거와 함께 완료했으며, 해당 없음으로 표시한 항목에는 사유가 있습니다.
- [ ] 데이터시트 또는 레퍼런스 디자인에서 벗어난 모든 사항에 프로젝트 차원의 설계 사유가 있습니다.
- [ ] RF, 크리스털, 충전, 전원, USB, 디스플레이, 오디오, 양산 테스트 포인트를 담당자가 검토했습니다.
- [ ] 저전력 전류 예산에 모든 주변 장치의 대기 전류, 풀업 전류, 레귤레이터 Iq가 포함되어 있습니다.
- [ ] 다운로드, 로그, 전류 측정, 리셋, 부트 제어를 위한 EVT 브링업 경로에 접근할 수 있습니다.

## 8. 관련 문서 및 참고 자료 { #8-related-documents-and-references }

전기적 한계, 패키지 데이터, 핀 멀티플렉싱, 소프트웨어 구성, 부품 인증, 제조 제약을 확인할 때는 최신 공식 문서를 사용하십시오.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB57x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB57x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB57x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB57x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SiFli 승인 업체 목록 (AVL)][SiFli Approved Vendor List (AVL)]__

</div>

[회로도 체크리스트](SF32LB57x_schematic_checklist.md)(5.8절)와 [PCB 레이아웃 체크리스트](SF32LB57x_pcb_layout_checklist.md)(6.10절)는 SiFli 공식 SF32LB57x 설계 자체 점검표를 항목별로 수록합니다. 각 점검 항목은 점검 기준이 되는 회로도 및 PCB 레이아웃 가이드와 함께 제공됩니다.

## 9. 부록 { #9-appendices }

부록은 애플리케이션 및 레퍼런스 디자인 관련 배경을 모았습니다. 5절과 6절의 주요 회로도 및 PCB 규칙을 적용한 뒤에 사용하십시오.

<div align="center"><em>표 9-1: 부록 색인</em></div>

<div align="center" markdown>

| 필요한 내용 | 시작 위치 |
|:---|:---|
| 최소 시스템 회로도 예시 | 5.1.2절 |
| 패키지, 랜드 패턴, 스텐실, 스택업, 팬아웃, 전원, RF, 오디오, SDIO, USB, TVS 참고 이미지 | 6.9절 |
| 고객 설계 자체 점검 | 7절 |

</div>

### 9.1. 부록 A. 일반적인 SF32LB57x 제품 { #appendix-a-a-typical-sf32lb57x-product }

일반적인 SF32LB57x 제품에는 MCU, 전원 트리, 48 MHz 및 32.768 kHz 크리스털, RF 매칭 회로와 안테나, 디스플레이 및 터치 컨트롤러, 부트 스토리지, 오디오 입출력, 센서, 선택형 카메라, 그리고 제품에 필요한 USB/SDIO/CAN/UART/I2C/SPI 주변 장치와 디버그 및 양산 테스트 접근 수단이 포함될 수 있습니다. 선택한 전원 아키텍처에 해당하면 충전, OVP, 로드 스위치 선택, 저전력 상태의 누설 전류도 검토하십시오.

## 10. 개정 이력 { #10-revision-history }

<div align="center"><em>표 10-1: 개정 이력</em></div>

<div align="center" markdown>

| 버전 | 날짜 | 비고 |
|:--------|:-----|:------|
| 0.5 | 2026-08 | 공식 애플리케이션 노트의 내용을 빠짐없이 복원했습니다. 패키지 및 전원 계열별 전원 핀 참고 표 4개, 기본 디버그 포트 표, RF 회로도, 전체 디스플레이 신호 표(SPI/QSPI, RGB, RGB 모드 구성, MCU8080, EPD, 병렬/직렬 JDI, 터치/백라이트), 아날로그 MIC/PDM MIC/오디오 PA 참고 그림, 칩별 전체 카메라 신호 표, IO MUX 표, 매트릭스 표, LCDC 매트릭스 하위 MUX 표, USB 핀 표, 핀별 GPADC 확장 표, 전원 키/GPADC 키 참고 그림을 추가했습니다. 공식 설계 자체 점검표는 새로 작성한 [회로도 체크리스트](SF32LB57x_schematic_checklist.md)와 [PCB 레이아웃 체크리스트](SF32LB57x_pcb_layout_checklist.md) 두 페이지로 분리해 모든 점검 항목을 유지했습니다. |
| 0.4 | 2026-08 | 공식 SF32LB57x 하드웨어 애플리케이션 노트와 대조해 기술 내용을 바로잡았습니다. `VCC`/`VBAT` 핀 표의 최솟값을 3.2 V에서 3.0 V로 정정하고, 2.7 V 하드웨어 셧다운 임계값을 추가했습니다. `VDD33_VOUT1` 소프트 스타트 전류 제한은 30 mA로, 32.768 kHz 크리스털 부하 커패시턴스 옵션은 7 pF 또는 11.5 pF(칩 기본값 11.5 pF)로 정정했습니다. `PA34` 전원/리셋 키 회로와 GPADC 저항 분압 키 설계를 명시하고, GPADC 0 V~3.3 V 입력 범위와 100 nF 필터 커패시터를 추가했습니다. 또한 `BUCK_FB`/`VDDIOA`/`VBATS`/`AVDD33_ANA`의 커패시터 값, MPI 버스 길이/스큐와 크리스털 배치 간격에 관한 PCB 제약, 4층 스택업 배치를 추가했습니다. |
| 0.3 | 2026-07 | 회로도 가이드를 재구성하여 최소 시스템 설계, 전원 시스템, 클럭 생성, RF, 사용자 인터페이스, 스토리지 및 연결, 양산을 각각 독립된 동급 절로 분리했습니다. |
| 0.2 | 2026-07 | 증빙 자료 묶음, 브링업 가이드, 저전력 검증, RF/디스플레이/오디오/카메라 검증, PCB 핵심 제약 빠른 참조를 추가했습니다. |
| 0.1 | 2026-07 | 공식 하드웨어 애플리케이션 노트를 기반으로 한 SF32LB57x 하드웨어 설계 가이드 최초 릴리스입니다. |
| 0.0.1 | 2026-06 | 업스트림 소스 리비전 0.0.1: SF32LB57x 하드웨어 애플리케이션 노트 최초 버전이며, 이 가이드와 별도로 버전을 관리합니다. |

</div>

### 10.1. 체크리스트 개정 이력 { #101-checklist-revision-history }

[회로도 체크리스트](SF32LB57x_schematic_checklist.md)와 [PCB 레이아웃 체크리스트](SF32LB57x_pcb_layout_checklist.md)는 SiFli의 SF32LB57x 하드웨어 애플리케이션 노트에 수록된 설계 자체 점검표를 항목별로 따르며, 가이드와 별도로 버전을 관리합니다.

<div align="center"><em>표 10.1-1: 체크리스트 개정 이력</em></div>

<div align="center" markdown>

| 버전 | 날짜 | 비고 |
|:--------|:-----|:------|
| 1.0 | 2026-08 | 최초 릴리스이며, 공식 SF32LB57x 하드웨어 애플리케이션 노트 2026-06 판의 설계 자체 점검표(4절)를 전부 옮겨 적었습니다. |

</div>

[SF32LB57x Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[SF32LB57x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
