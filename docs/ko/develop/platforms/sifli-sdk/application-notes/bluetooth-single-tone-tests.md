---
icon: lucide/audio-lines
title: "Bluetooth 개별 RF 테스트 실행"
description: "SiFli_RfTool로 BLE 또는 Classic Bluetooth RF를 한 번에 한 가지 동작씩 제어하여 보드를 튜닝하고 사전 적합성 시험을 수행합니다."
tags:
    - 개발
    - SiFli-SDK
    - 애플리케이션 노트
    - Bluetooth
---

# Bluetooth 개별 RF 테스트 실행 { #run-bluetooth-single-item-rf-tests }

개별 RF 테스트는 보드 튜닝과 FCC/CE 사전 적합성 평가에서 한 번에 하나의 캐리어나 변조 설정을 확인하는 저수준 SDK 테스트 경로입니다. 제품 기능이 아니며 BQB 시그널링 테스트를 대체하지 않습니다.

## DUT와 도구 준비 { #prepare-the-dut-and-tool }

DUT, PC, USB 데이터 케이블(충전 전용 케이블 불가), RF 동축 케이블, 통신 테스터 또는 스펙트럼 분석기를 준비하십시오. 변조된 BLE/BT 테스트를 위해 `VBAT`, `GND`, UART1 TX/RX를 노출하십시오. SF32LB55x에서 단일 캐리어(CW) 테스트를 하려면 UART3 TX/RX도 노출하십시오. 기본 매핑은 다음과 같습니다.

<div align="center" markdown>

<em>표: 변조 테스트와 단일 캐리어 테스트의 기본 UART 매핑</em>

| 디바이스/패키지 | 변조 테스트용 UART1 TX/RX | 단일 캐리어(CW) 제어 UART |
|---|---|---|
| SF32LB52x | PA19 / PA18 | UART1 |
| SF32LB551 | PA49 / PA51 | UART3 (PB45 / PB46) |
| SF32LB555 / SF32LB557 | PA17 / PA19 | UART3 (PB45 / PB46) |
| SF32LB56xU (QFN) | PA17 / PA18 | UART1 |
| SF32LB56xV (BGA) | PA34 / PA30 | UART1 |
| SF32LB57x | PA19 / PA18 | UART1 |
| SF32LB58x | PA32 / PA31 | UART1 |

</div>

SF32LB55x의 UART1 핀은 부품 번호에 따라 다릅니다. 변조된 BLE/BT 테스트에서는 UART1을 보레이트 1,000,000으로 PC에 연결하십시오. SF32LB55x 단일 캐리어 테스트에서는 대신 UART3(PB45/PB46)을 사용하며, 나열된 다른 제품군은 UART1을 사용합니다. 대상 프로젝트의 핀 구성이 이 기본값과 다르면 프로젝트의 구성을 적용하십시오. RF 포트를 동축 케이블로 계측기에 연결하고, 케이블 손실을 고려하며, 전도 측정과 방사 측정을 구분하십시오.

!!! note "제품군 범위"
    UART 표는 제품군과 패키지를 비교한 통합 표입니다. 이어지는 토폴로지와 `SiFli_RfTool` 화면은 SF32LB52x 소스 예시입니다. 도구에서 실제 칩 제품군을 선택하고 대상 프로젝트의 UART 매핑을 확인하십시오.

!!! warning "공식 가이드 간 SF32LB58x UART 매핑 충돌"
    [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html)는 UART1 TX/RX를 PA32/PA31로 나열하는 반면, [일반 RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html)는 RF 디버그 UART를 PA31/PA32로 나열합니다. 배선하기 전에 대상 펌웨어의 테스트 경로와 보드 핀 설정을 확인하십시오. 가이드마다 다르게 기재된 이 매핑을 서로 바꿔 적용할 수 있다고 가정하지 마십시오.

![Bluetooth 개별 RF 테스트 토폴로지](../../../../assets/develop/app-notes/bluetooth-single-item/figure_11-1.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — PC는 UART/HCI로 DUT를 제어하고, RF 포트는 동축 케이블로 테스터 또는 스펙트럼 분석기에 연결됩니다.</em></div>

## RF 테스트 모드 진입 { #enter-rf-test-mode }

1. DUT를 부팅하고 깨어 있는 상태로 유지합니다.
2. SiFli_Trace를 통해 FinSH 명령 `bt_cm uart_dut`을 보냅니다.
3. 16진수 응답 `04 0E 04 XX 03 0C 00`을 확인합니다.
4. 터미널 연결을 해제합니다. SiFli_RfTool이 같은 UART를 HCI 제어에 사용합니다.

## BLE 또는 Classic BT 신호 송신 { #transmit-a-ble-or-classic-bt-signal }

1. `SiFli_RfTool.exe`를 열고 칩 제품군을 선택한 다음 BLE non-signaling 또는 BT non-signaling을 선택하고, UART1 COM 포트를 선택하여 보레이트 1,000,000으로 연결합니다.
2. BLE의 경우 Frequency, Data Length, 페이로드, PHY를 설정한 다음 Start TX를 선택합니다. 채널이나 PHY를 변경하기 전에 TX를 중지합니다.
3. Classic BT의 경우 Frequency, Data Length, Packet Type을 설정한 다음 Start TX를 선택합니다. 패킷 파라미터를 변경하기 전에 TX를 중지합니다.
4. 테스터에서 채널, 패킷 유형, 페이로드, PHY를 일치시킵니다. 통신 테스터가 없을 때는 스펙트럼 분석기로 파형을 확인할 수 있습니다.

SDK 소스에는 LB52x HDK 레퍼런스 TX 레벨이 포함되어 있지만, 이 값은 보드마다 다릅니다. 디버깅 레퍼런스로만 사용하고 실제 제품 보드에서 측정하십시오.

![SiFli_RfTool 주요 제어 항목](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-1.jpg){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — 도구의 칩 제품군, 모드, UART, 보레이트, TX/RX 컨트롤. 테스트 벡터를 적용하기 전에 이 선택 사항을 확인하십시오.</em></div>

![SiFli_RfTool의 BLE TX 설정](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-2.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — TX를 시작하기 전에 칩, 모드, 채널, 페이로드, PHY, 데이터 길이, 전력을 선택합니다.</em></div>

## 수신 및 감도 계산 { #receive-and-calculate-sensitivity }

RX에 진입하기 전에 TX를 중지합니다. 채널을 설정한 뒤 Start RX를 누르고, 설정을 변경하기 전에는 RX를 중지합니다. BLE RX에서는 테스터를 Direct Test Mode로 구성하고 PHY와 채널을 선택한 다음 1,500개의 패킷을 보내고 다음과 같이 계산합니다.

```text
PER = (1500 - received_packets) / 1500 × 100%
```

RSSI도 함께 기록하십시오. Classic BT RX에서는 DH1/2-DH1/3-DH1 같은 CMW500 GPRF Generator 파형을 사용하고, 수신 패킷, 오류 패킷, 비트 수, BER, RSSI를 기록합니다. BLE와 Classic BT의 RF 경로는 하드웨어를 공유하므로 병렬로 실행하지 마십시오.

![SiFli_RfTool의 BLE RX 설정](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-5.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — RX 전에 TX를 중지하고 채널, 변조, PHY, 수신 결과를 기록합니다.</em></div>

## 단일 캐리어와 계측기 설정 { #single-carrier-and-instrument-setup }

단일 캐리어(CW) 테스트로 전환하기 전에 현재 동작을 중지합니다. SF32LB55x에서는 DUT와 PC의 연결을 UART1에서 UART3(PB45/PB46)으로 옮기고, SiFli_RfTool에서 UART3에 해당하는 COM 포트를 선택한 다음 보레이트 1,000,000을 설정합니다. 나열된 다른 제품군은 UART1을 사용합니다. 캐리어 주파수와 TX 전력을 설정하고 송신을 시작한 뒤 스펙트럼 분석기나 파워 미터로 출력을 확인합니다.

테스터로 변조된 BLE/BT TX를 측정할 때는 StandAlone (Non Signaling) 수신을 선택하고, SiFli_RfTool에서 구성한 채널, 패킷 유형, 페이로드, PHY와 일치시킵니다. DUT RX 측정에서는 테스터를 신호 소스로 구성합니다. BLE는 DTM 파라미터를 사용하고 Classic BT는 GPRF 파형을 사용합니다.

도구나 시리얼 연결이 응답하지 않으면 SiFli_RfTool을 닫고 DUT의 전원을 껐다 켠 다음, 부팅을 기다렸다가 다시 연결하십시오. 도구 버전, 펌웨어 식별 정보, 칩/패키지, UART 핀, 보드 리비전, 채널, PHY/패킷 유형, 전력, 케이블 손실, 계측기 구성, 원시 결과를 테스트 기록과 함께 보관하십시오.

![테스터의 논시그널링 수신 설정](../../../../assets/develop/app-notes/bluetooth-single-item/figure_14-1.jpg){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — StandAlone (Non Signaling)을 선택하고 DUT의 채널 및 패킷 파라미터와 일치시킵니다.</em></div>

공식 제품군 출처: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
