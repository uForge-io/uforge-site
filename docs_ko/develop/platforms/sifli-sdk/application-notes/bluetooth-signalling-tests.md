---
icon: lucide/bluetooth
title: "Bluetooth 시그널링 테스트 실행하기"
description: "SF32 DUT를 Bluetooth 테스터에 연결하여 BLE 또는 Classic Bluetooth 시그널링 측정을 수행합니다."
tags:
    - 개발
    - SiFli-SDK
    - 애플리케이션 노트
    - Bluetooth
---

# Bluetooth 시그널링 테스트 실행하기 { #run-bluetooth-signaling-tests }

시그널링 모드는 DUT와 통신 테스터 사이에 실제 Bluetooth 링크를 만듭니다. 프로토콜을 준수하는 TX/RX 검증과 BQB/QDID 작업을 위한 SDK 경로이며, 벤더의 논시그널링 테스트나 단일 항목 RF 테스트와는 다릅니다.

## 테스트 구성 { #test-setup }

DUT, Bluetooth 통신 테스터(소스 가이드는 CMW500 사용), Windows PC, USB-UART 케이블, RF 동축 케이블을 준비하십시오. DUT에서 `VBAT`, `GND`, UART1 TX/RX를 노출하십시오. 기본 UART1 핀은 패키지마다 다릅니다.

<div align="center" markdown>

<em>표: 디바이스/패키지별 기본 UART1 핀</em>

| 디바이스/패키지 | UART1 TX | UART1 RX |
|---|---|---|
| SF32LB52x | PA19 | PA18 |
| SF32LB551 | PA17 | PA18 |
| SF32LB555/557 | PA34 | PA30 |
| SF32LB56xU (QFN) | PA17 | PA18 |
| SF32LB56xV (BGA) | PA34 | PA30 |
| SF32LB57x | PA19 | PA18 |
| SF32LB58x | PA32 | PA31 |

</div>

프로젝트의 실제 핀 구성이 이 기본 맵과 다르면 프로젝트의 구성을 사용하십시오. BLE 시그널링에는 테스터로의 시리얼 EUT 제어 연결이 필요하며, Classic BT 시그널링은 DUT가 테스트 모드에 들어간 후 무선으로 DUT를 제어할 수 있습니다.

핵심 차이는 제어 토폴로지입니다. BLE는 UART/HCI 제어 경로를 테스터에 연결하는 반면, Classic BT는 테스터가 무선으로 DUT를 검색하여 연결합니다. 소스 가이드의 SF32LB52x 다이어그램을 아래에 나타냈으며, 다른 제품군에서는 대상 프로젝트의 핀 표를 사용하십시오.

!!! note "제품군 범위"
    UART 핀 표는 제품군/패키지를 비교한 통합 표입니다. 이어지는 토폴로지와 테스터 스크린샷은 SF32LB52x 소스 예시이므로, 신호 경로를 이해하는 데 사용하고 패키지에 무관한 핀 또는 메뉴 레퍼런스로 사용하지 마십시오.

![BLE signaling test topology](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — BLE 시그널링: PC가 DUT를 테스트 모드로 전환한 다음 UART/HCI 제어 경로가 테스터로 이동합니다.</em></div>

![Classic BT signaling test topology](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — Classic BT 시그널링: 테스터가 RF로 DUT를 검색하여 연결합니다.</em></div>

## DUT를 테스트 모드로 전환 { #put-the-dut-into-test-mode }

### BLE { #ble }

1. DUT를 부팅하고 DFU/애플리케이션 펌웨어를 깨어 있는 상태로 유지합니다.
2. UART1을 PC에 연결하고 SiFli_Trace 또는 다른 시리얼 도구로 FinSH 명령 `bt_cm uart_dut`을 보냅니다.
3. 터미널을 16진수 표시로 전환하고 `04 0E 04 XX 03 0C 00`을 확인합니다.
4. PC 연결을 해제하고 같은 UART1을 테스터의 USB-RS232 EUT 제어 포트에 연결합니다.

![BLE test-mode serial response](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — UART 연결을 옮기기 전에 `04 0E 04 XX 03 0C 00`을 확인합니다.</em></div>

### Classic Bluetooth { #classic-bluetooth }

1. DUT를 부팅하고 화면/CPU를 깨어 있는 상태로 유지합니다.
2. UART1을 PC에 연결하고 `bt_cm dut`을 보냅니다.
3. `Write scan enable success` 응답을 확인한 다음 RF 동축 케이블을 테스터에 연결합니다. 다른 테스트 모드에 들어가기 전에 재부팅합니다.

## 시그널링 연결 설정 { #establish-the-signaling-connection }

테스터의 `Bluetooth Signaling` 애플리케이션에서 시그널링을 켭니다. BLE의 경우 `EUT Control`에서 `USB-to-RS232 adapter`, 1,000,000 baud, `Low Energy burst type`을 선택합니다. DUT의 UART1을 테스터에 연결하고 RF 동축 케이블을 테스터의 RF 입력에 연결한 다음 `Connection Check`를 실행하여 `LE comm test passed`가 표시될 때까지 기다립니다. Classic BT의 경우 `HW Interface`를 `None (EUT Control off)`로 설정하고, `Inquire`로 DUT 주소를 검색한 다음 `Connect Test Mode`를 선택합니다.

![BLE tester EUT Control settings](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — BLE EUT Control, baud rate, Low Energy 설정.</em></div>

![Classic BT tester settings](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — EUT Control을 `None (EUT Control off)`로 설정한 Classic BT 시그널링.</em></div>

## TX 측정 실행 { #run-tx-measurements }

`Bluetooth 1 Multi Eval.`을 열고 측정을 활성화합니다. 필요한 BLE 1M/2M 또는 Classic BT BR/EDR 버스트 유형, 채널, 패킷 유형, 페이로드 길이를 선택합니다. BLE 시그널링 연결 후와 BT 시그널링 연결 후 모두 동일한 테스터 TX 화면을 사용합니다.

## RX 감도 측정 실행 { #run-rx-sensitivity-measurements }

시그널링 화면으로 돌아가기 전에 TX를 비활성화한 다음 `Bluetooth 1 RX Meas.`를 엽니다. Classic BT에서는 BER을, BLE에서는 PER을 선택하고 채널과 패킷 유형을 구성한 다음 Rx Quality를 활성화합니다. 테스터의 `Tx Level (CMW)`를 작은 단계로 낮춥니다. BER/PER 표시가 유효하지 않게 되기 직전의 값이 측정된 감도입니다. 결과가 전도(conducted) 측정인지 방사(radiated) 측정인지 기록하고 케이블 손실을 포함하십시오.

## 기록과 재현 { #record-and-reproduce }

칩/패키지, UART 핀 맵, SDK 리비전, 펌웨어 식별 정보, 테스터 모델과 구성, RF 연결, 채널, PHY, 패킷 설정, TX 레벨, BER/PER, 보드 리비전을 결과와 함께 보관하십시오. 공식 제품군 페이지는 [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)입니다.
