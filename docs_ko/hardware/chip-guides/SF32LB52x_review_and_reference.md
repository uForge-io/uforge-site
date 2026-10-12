---
icon: lucide/clipboard-check
hide:
    - navigation
description: "SF32LB52x 하드웨어 설계 가이드의 설계 검토 체크리스트, 관련 문서와 참고 자료, 레퍼런스 회로도/PCB/기구/전원 부록, 개정 이력입니다."
tags:
    - 하드웨어
    - 칩
---

# SF32LB52x 하드웨어 설계 가이드 — 설계 검토 체크리스트 및 참고 자료 { #sf32lb52x-hardware-design-guide-design-review-checklist-and-references }

!!! note "SF32LB52x 하드웨어 설계 가이드의 일부"
    이 페이지는 7~10절인 설계 검토 체크리스트, 관련 문서 및 참고 자료, 부록, 개정 이력을 다룹니다. [PCB 레이아웃 가이드라인](SF32LB52x_pcb_layout.md)으로 돌아가십시오.

## 7. 설계 검토 체크리스트 { #7-design-review-checklist }

- [ ] 최소 시스템 검토를 완료했습니다. 정확한 변형(variant), 패키지, 전원 트리, 부트 매체, 부트스트랩 핀, 디버그/플래싱 접근 수단, 클럭, 웨이크업 전략이 모두 문서화되어 있습니다.
- [ ] 정확한 칩 모델과 전원 변형을 확인했으며, 두 변형의 전원 회로도를 섞어 사용하지 않았습니다.
- [ ] 프로세서 전원 핀(VBUS/VBAT/VCC 또는 PVDD/VDDIOA/VDD_SIP)이 데이터시트의 전압 범위 안에 있습니다.
- [ ] BUCK 인덕터가 4.7 uH ±20%, DCR ≤0.4 Ω, Isat ≥450 mA를 충족합니다.
- [ ] 배터리 전원 변형: 충전 경로, OVP 소자 전압 범위, 내장 LDO 출력 커패시턴스를 검증했습니다.
- [ ] 48 MHz 및 32.768 kHz 크리스털이 권장 사양을 충족하며, 라우팅과 금지 구역 요구 사항을 만족합니다.
- [ ] RF 트레이스의 임피던스가 50 Ω이며, 매칭 회로를 칩 가까이에 배치했습니다.
- [ ] 스토리지 부트 구성(일반 전원 변형의 eMMC 구성 포함)이 부트스트랩 핀 설정과 일치합니다.
- [ ] 스토리지 전원 스위치 제어 핀을 해당 변형에 맞게 검증했습니다. 릴리스 전에 공식 체크리스트와 애플리케이션 노트 간의 PA11/PA21 불일치를 해소하십시오.
- [ ] USB DP/DN을 차동 임피던스 90 Ω의 차동 쌍으로 라우팅했습니다.
- [ ] SDIO 신호를 함께 라우팅했으며, 전체 길이는 ≤50 mm, 그룹 내 길이 차이는 ≤6 mm이고 그라운드 차폐가 적용되어 있습니다.
- [ ] DBG_UART/SWD 멀티플렉싱 핀과 양산 테스트 포인트를 확보했습니다.
- [ ] 주요 부품 번호를 최신 [SiFli 승인 업체 목록][SiFli Approved Vendor List (AVL)]과 대조해 확인했습니다.

## 8. 관련 문서 및 참고 자료 { #8-related-documents-and-references }

[SF32LB52x Datasheet (Official PDF)]: https://downloads.sifli.com/silicon/DS0052-SF32LB52x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V2p4.pdf?
[SF32LB52x User Manual (Official PDF)]: https://downloads.sifli.com/silicon/UM0052-SF32LB52x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p3.pdf?
[SF32LB52 Hardware Reference Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-%E7%A1%AC%E4%BB%B6%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1-20250619.zip?
[SF32LB520/3/5/7 Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md
[52B/D/E/G/J Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md
[Local SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB52x Datasheet (Official PDF)]__
- :fontawesome-solid-file-pdf: __[SF32LB52x User Manual (Official PDF)]__
- :fontawesome-solid-file-zipper: __[SF32LB52 Hardware Reference Design Package]__
- :fontawesome-brands-github: __[SF32LB520/3/5/7 Hardware Application Note (Source)]__
- :fontawesome-brands-github: __[52B/D/E/G/J Hardware Application Note (Source)]__
- :fontawesome-solid-file-excel: __[Local SiFli Approved Vendor List]__
- :fontawesome-solid-file-excel: __[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]__
- :fontawesome-brands-wikipedia-w: __[SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

추가 출처 참고 자료:

- [SF32LB52x 제품 개요서](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf)
- [SF32LB52x 데이터시트](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf)
- [SF32LB52x 레퍼런스 매뉴얼](https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf)
- [SF32LB520/3/5/7 하드웨어 애플리케이션 노트](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md)
- [52B/D/E/G/J 하드웨어 애플리케이션 노트](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md)

[회로도 체크리스트](SF32LB52x_schematic_checklist.md)(5.8절)와 [PCB 레이아웃 체크리스트](SF32LB52x_pcb_layout_checklist.md)(6.15절)는 동일한 *SF32LB52 Schematic & PCB Checklist*(V1.0, 2026-01-21)를 항목별로 재현하며, 각 항목이 점검 대상으로 삼는 회로도 및 PCB 레이아웃 가이드와 함께 제공합니다.

## 9. 부록 { #9-appendices }

원본 SiFli 애플리케이션 노트에는 다음과 같은 회로도, PCB 레이아웃, 기구, 전원 레퍼런스 그림이 포함되어 있습니다. 이 부록은 검토 근거로 삼을 수 있도록 해당 원본 그림을 보존하며, 5절과 6절이 여전히 주된 설계 가이드입니다.

!!! note "이 그림의 활용 방법"
    이 그림은 원본 애플리케이션 노트의 레퍼런스 회로 및 레이아웃 예시로 취급하십시오. 해당 디바이스와 제품의 최종 구현은 규칙 본문, 표, 데이터시트, 레퍼런스 매뉴얼, 최신 레퍼런스 디자인 패키지, AVL로 확인하십시오.

<div align="center"><em>표 9-1: 부록 맵</em></div>

<div align="center" markdown>

| 필요 사항 | 시작 위치 |
|:---|:---|
| 두 SF32LB52x 설계 그룹의 스마트워치 블록 다이어그램 예시 | 부록 A: 일반적인 스마트워치 애플리케이션 |
| RF, 스토리지/부트, 버튼, 모터, 오디오, 클럭, USB, DC/DC의 회로 수준 회로도 예시 | 부록 B: 레퍼런스 회로도 |
| RF, 스토리지, 오디오, 스택업, 팬아웃, 클럭, USB, DC/DC의 PCB 배치 및 라우팅 예시 | 부록 C: 레퍼런스 PCB 레이아웃 |
| 패키지 외곽, 외형, 랜드 패턴 도면 | 부록 D: 기구 |
| 충전, OVP, 전원 트리, PMU 레퍼런스 회로 및 레이아웃 | 부록 E: 전원 |

</div>

### 9.1. 부록 A. 일반적인 스마트워치 애플리케이션 { #appendix-a-a-typical-smart-watch-application }

일반적인 SF32LB52x 스마트워치 설계는 MCU, 디스플레이, 터치 컨트롤러, 스토리지, 센서, 진동 모터, 오디오 입출력, Bluetooth 안테나, 클럭 소스, 전원 관리, 디버그 접근 수단, 양산 테스트 접근 수단을 포함합니다. 배터리 전원 설계는 여기에 충전 관리도 포함합니다.
그림 9.1-1과 9.1-2는 QSPI 디스플레이, SPI 가속도계/자이로스코프, I2C 심박 모듈, 아날로그 마이크 및 DAC-앰프 경로, PWM으로 구동하는 진동 모터, 48 MHz 클럭, Bluetooth RF 경로, SWD/UART 접근 수단을 보여 줍니다. 스토리지 예시로는 QSPI NAND, SD NAND, NOR 플래시가 나와 있으며, 이는 예시일 뿐 부트 매체의 전체 목록이 아닙니다. 두 다이어그램 모두 외부 충전기와 Buck/LDO 경로를 나타냅니다. 실제 전원 아키텍처는 이 블록 다이어그램을 필수 회로로 간주하지 말고 5.2절에 따라 선택하십시오.


![그림 9.1-1: SF32LB520/3/5/7 스마트워치 애플리케이션 다이어그램](../../sf32-products/chips/assets/52xA/sf32lb52x-A-watch-app-diagram-52x.png){ loading="lazy" }

<div align="center"><em>그림 9.1-1: SF32LB520/3/5/7 스마트워치 애플리케이션 다이어그램</em></div>

![그림 9.1-2: 52B/D/E/G/J 스마트워치 애플리케이션 다이어그램](../../sf32-products/chips/assets/52xB/sf32lb52X-B-watch-app-diagram-52X.png){ loading="lazy" }

<div align="center"><em>그림 9.1-2: 52B/D/E/G/J 스마트워치 애플리케이션 다이어그램</em></div>

### 9.2. 부록 B. 레퍼런스 회로도 { #appendix-b-reference-schematics }

**RF**

![그림 9.2-1: RF 프런트엔드 블록 다이어그램](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ loading="lazy" }

<div align="center"><em>그림 9.2-1: RF 프런트엔드 블록 다이어그램</em></div>

![그림 9.2-2: RF 회로도 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ loading="lazy" }

<div align="center"><em>그림 9.2-2: RF 회로도 레퍼런스</em></div>

![그림 9.2-3: RF 회로도 라우팅 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ loading="lazy" }

<div align="center"><em>그림 9.2-3: RF 회로도 라우팅 레퍼런스</em></div>

**스토리지 및 부트**

![그림 9.2-4: SF32LB520/3/5/7 부트스트랩 레퍼런스](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ loading="lazy" }

<div align="center"><em>그림 9.2-4: SF32LB520/3/5/7 부트스트랩 레퍼런스</em></div>

![그림 9.2-5: 52B/D/E/G/J 부트스트랩 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ loading="lazy" }

<div align="center"><em>그림 9.2-5: 52B/D/E/G/J 부트스트랩 레퍼런스</em></div>

![그림 9.2-6: SDIO 회로도 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ loading="lazy" }

<div align="center"><em>그림 9.2-6: SDIO 회로도 레퍼런스</em></div>

**버튼, 모터, 오디오**

![그림 9.2-7: SF32LB520/3/5/7 진동 모터 레퍼런스](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ loading="lazy" }

<div align="center"><em>그림 9.2-7: SF32LB520/3/5/7 진동 모터 레퍼런스</em></div>

![그림 9.2-8: 52B/D/E/G/J 진동 모터 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ loading="lazy" }

<div align="center"><em>그림 9.2-8: 52B/D/E/G/J 진동 모터 레퍼런스</em></div>

![그림 9.2-9: 전원 키 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ loading="lazy" }

<div align="center"><em>그림 9.2-9: 전원 키 레퍼런스</em></div>

![그림 9.2-10: 로터리 인코더 키 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ loading="lazy" }

<div align="center"><em>그림 9.2-10: 로터리 인코더 키 레퍼런스</em></div>

![그림 9.2-11: 아날로그 MEMS 마이크 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ loading="lazy" }

<div align="center"><em>그림 9.2-11: 아날로그 MEMS 마이크 레퍼런스</em></div>

![그림 9.2-12: 아날로그 ECM 마이크 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ loading="lazy" }

<div align="center"><em>그림 9.2-12: 아날로그 ECM 마이크 레퍼런스</em></div>

![그림 9.2-13: 아날로그 DAC-PA 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ loading="lazy" }

<div align="center"><em>그림 9.2-13: 아날로그 DAC-PA 레퍼런스</em></div>

![그림 9.2-14: 오디오 전원 회로도 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>그림 9.2-14: 오디오 전원 회로도 레퍼런스</em></div>

![그림 9.2-15: 오디오 ADC 회로도 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>그림 9.2-15: 오디오 ADC 회로도 레퍼런스</em></div>

![그림 9.2-16: 오디오 DAC 회로도 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>그림 9.2-16: 오디오 DAC 회로도 레퍼런스</em></div>

**클럭**

![그림 9.2-17: 48 MHz 크리스털 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ loading="lazy" }

<div align="center"><em>그림 9.2-17: 48 MHz 크리스털 회로도</em></div>

![그림 9.2-18: 32.768 kHz 크리스털 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ loading="lazy" }

<div align="center"><em>그림 9.2-18: 32.768 kHz 크리스털 회로도</em></div>

**USB**

![그림 9.2-19: USB 회로도 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ loading="lazy" }

<div align="center"><em>그림 9.2-19: USB 회로도 레퍼런스</em></div>

**DC/DC**

![그림 9.2-20: DC/DC 회로도 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ loading="lazy" }

<div align="center"><em>그림 9.2-20: DC/DC 회로도 레퍼런스</em></div>

### 9.3. 부록 C. 레퍼런스 PCB 레이아웃 { #appendix-c-reference-pcb-layouts }

**RF**

![그림 9.3-1: RF PCB 매칭 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ loading="lazy" }

<div align="center"><em>그림 9.3-1: RF PCB 매칭 레퍼런스</em></div>

![그림 9.3-2: RF PCB 라우팅 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ loading="lazy" }

<div align="center"><em>그림 9.3-2: RF PCB 라우팅 레퍼런스</em></div>

**스토리지**

![그림 9.3-3: SDIO PCB 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ loading="lazy" }

<div align="center"><em>그림 9.3-3: SDIO PCB 레퍼런스</em></div>

**오디오**

![그림 9.3-4: 오디오 전원 PCB 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>그림 9.3-4: 오디오 전원 PCB 레퍼런스</em></div>

![그림 9.3-5: 오디오 ADC PCB 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>그림 9.3-5: 오디오 ADC PCB 레퍼런스</em></div>

![그림 9.3-6: 오디오 DAC PCB 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>그림 9.3-6: 오디오 DAC PCB 레퍼런스</em></div>

**PCB 기본 사항**

![그림 9.3-7: PCB 스택업 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ loading="lazy" }

<div align="center"><em>그림 9.3-7: PCB 스택업 레퍼런스</em></div>

![그림 9.3-8: PCB 설계 규칙 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ loading="lazy" }

<div align="center"><em>그림 9.3-8: PCB 설계 규칙 레퍼런스</em></div>

![그림 9.3-9: QFN 팬아웃 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ loading="lazy" }

<div align="center"><em>그림 9.3-9: QFN 팬아웃 레퍼런스</em></div>

![그림 9.3-10: 크리스털 배치 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ loading="lazy" }

<div align="center"><em>그림 9.3-10: 크리스털 배치 레퍼런스</em></div>

**클럭 라우팅**

![그림 9.3-11: 48 MHz 크리스털 라우팅 모델](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ loading="lazy" }

<div align="center"><em>그림 9.3-11: 48 MHz 크리스털 라우팅 모델</em></div>

![그림 9.3-12: 48 MHz 크리스털 라우팅 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>그림 9.3-12: 48 MHz 크리스털 라우팅 레퍼런스</em></div>

![그림 9.3-13: 32.768 kHz 크리스털 라우팅 모델](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ loading="lazy" }

<div align="center"><em>그림 9.3-13: 32.768 kHz 크리스털 라우팅 모델</em></div>

![그림 9.3-14: 32.768 kHz 크리스털 라우팅 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>그림 9.3-14: 32.768 kHz 크리스털 라우팅 레퍼런스</em></div>

**USB**

![그림 9.3-15: USB PCB 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ loading="lazy" }

<div align="center"><em>그림 9.3-15: USB PCB 레퍼런스</em></div>

![그림 9.3-16: USB 레이아웃 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ loading="lazy" }

<div align="center"><em>그림 9.3-16: USB 레이아웃 레퍼런스</em></div>

![그림 9.3-17: USB 라우팅 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ loading="lazy" }

<div align="center"><em>그림 9.3-17: USB 라우팅 레퍼런스</em></div>

**DC/DC**

![그림 9.3-18: DC/DC PCB 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ loading="lazy" }

<div align="center"><em>그림 9.3-18: DC/DC PCB 레퍼런스</em></div>

### 9.4. 부록 D. 기구 { #appendix-d-mechanical }

![그림 9.4-1: SF32LB520/3/5/7 패키지 레이아웃](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ loading="lazy" }

<div align="center"><em>그림 9.4-1: SF32LB520/3/5/7 패키지 레이아웃</em></div>

![그림 9.4-2: 52B/D/E/G/J 패키지 레이아웃](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ loading="lazy" }

<div align="center"><em>그림 9.4-2: 52B/D/E/G/J 패키지 레이아웃</em></div>

![그림 9.4-3: QFN68L 패키지 치수](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ loading="lazy" }

<div align="center"><em>그림 9.4-3: QFN68L 패키지 치수</em></div>

![그림 9.4-4: QFN68L 패키지 외형](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ loading="lazy" }

<div align="center"><em>그림 9.4-4: QFN68L 패키지 외형</em></div>

![그림 9.4-5: QFN68L 권장 풋프린트](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ loading="lazy" }

<div align="center"><em>그림 9.4-5: QFN68L 권장 풋프린트</em></div>

### 9.5. 부록 E. 전원 { #appendix-e-power }

**SF32LB520/3/5/7(배터리 전원)**

아래 그림은 전원 경로 관리(PPM)가 있는 경우와 없는 경우의 외부 충전 회로를 보여 주고, 이어서 통합 충전기 회로를 보여 줍니다.

![그림 9.5-1: PPM이 없는 외부 충전 회로](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ loading="lazy" }

<div align="center"><em>그림 9.5-1: 전원 경로 관리(PPM)가 없는 외부 충전 회로</em></div>

![그림 9.5-2: PPM이 있는 외부 충전 회로](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ loading="lazy" }

<div align="center"><em>그림 9.5-2: 전원 경로 관리(PPM)가 있는 외부 충전 회로</em></div>

![그림 9.5-3: 통합 충전기 회로](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ loading="lazy" }

<div align="center"><em>그림 9.5-3: 통합 충전기 회로</em></div>

![그림 9.5-4: OVP 임계값 설정](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ loading="lazy" }

<div align="center"><em>그림 9.5-4: OVP 임계값 설정</em></div>

![그림 9.5-5: 조정 가능한 OVLO OVP 적용 예](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ loading="lazy" }

<div align="center"><em>그림 9.5-5: 조정 가능한 OVLO OVP 적용 예</em></div>

![그림 9.5-6: 레귤레이트 출력 OVP 적용 예](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ loading="lazy" }

<div align="center"><em>그림 9.5-6: 레귤레이트 출력 OVP 적용 예</em></div>

![그림 9.5-7: SF32LB520/3/5/7 전원 구조](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ loading="lazy" }

<div align="center"><em>그림 9.5-7: SF32LB520/3/5/7 전원 구조</em></div>

![그림 9.5-8: VCC 회로도 레퍼런스](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ loading="lazy" }

<div align="center"><em>그림 9.5-8: VCC 회로도 레퍼런스</em></div>

![그림 9.5-9: VCC PCB 레퍼런스](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ loading="lazy" }

<div align="center"><em>그림 9.5-9: VCC PCB 레퍼런스</em></div>

![그림 9.5-10: 충전 회로도 레퍼런스](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ loading="lazy" }

<div align="center"><em>그림 9.5-10: 충전 회로도 레퍼런스</em></div>

![그림 9.5-11: 충전 PCB 레퍼런스](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ loading="lazy" }

<div align="center"><em>그림 9.5-11: 충전 PCB 레퍼런스</em></div>

![그림 9.5-12: PMU TVS 레퍼런스](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ loading="lazy" }

<div align="center"><em>그림 9.5-12: PMU TVS 레퍼런스</em></div>

![그림 9.5-13: PMU EOS 레퍼런스](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ loading="lazy" }

<div align="center"><em>그림 9.5-13: PMU EOS 레퍼런스</em></div>

**52B/D/E/G/J(일반 전원)**

![그림 9.5-14: 52B/D/E/G/J PMU PCB 레퍼런스](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ loading="lazy" }

<div align="center"><em>그림 9.5-14: 52B/D/E/G/J PMU PCB 레퍼런스</em></div>

## 10. 개정 이력 { #10-revision-history }

<div align="center"><em>표 10-1: 개정 이력</em></div>

<div align="center" markdown>

| 버전 | 날짜 | 비고 |
|:---|:---|:---|
| 1.1 | 2026-07 | 전원 시스템을 동급 회로도 절로 승격하고, 클럭 생성과 RF를 별도의 회로도 절로 분리했으며, 이후 회로도 가이드 절의 번호를 다시 매겼습니다. |
| 1.0 | 본 문서 | 두 공식 하드웨어 애플리케이션 노트를 하나의 가이드로 통합하고, 탭으로 배터리 전원 변형과 일반 전원 변형의 내용을 구분함 |
| 0.0.1 | 10/2024 | `SF32LB520-3-5-7-HW-Application` 초판 릴리스 |
| 0.0.1 | 10/2024 | `SF32LB52B-E-G-J-HW-Application` 초판 릴리스 |

</div>

### 10.1. 체크리스트 개정 이력 { #101-checklist-revision-history }

[회로도 체크리스트](SF32LB52x_schematic_checklist.md)와 [PCB 레이아웃 체크리스트](SF32LB52x_pcb_layout_checklist.md)의 항목별 체크리스트는 SiFli의 *SF32LB52 Schematic & PCB Checklist* 스프레드시트를 따라 가이드와 별도로 버전을 관리합니다.

<div align="center"><em>표 10.1-1: 체크리스트 개정 이력</em></div>

<div align="center" markdown>

| 버전 | 날짜 | 비고 |
|:---|:---|:---|
| 1.0 | 2026-01-21 | SiFli의 *SF32LB52 Schematic & PCB Checklist* V1.0을 기반으로 한 초판 릴리스 |

</div>

[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
