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

시그널링 모드는 DUT와 통신 테스터 사이에 실제 Bluetooth 링크를 만들어 프로토콜 준수 TX/RX 시험을 수행합니다. SiFli 안내서는 수동 조작과 소프트웨어로 테스터를 제어하는 자동 시험(예: R&S® CMWrun으로 CMW 제어)을 모두 다룹니다. 이는 제조사 전용 비시그널링 시험 및 개별 RF 파라미터 시험과 다릅니다.

!!! note "인증 시험 범위"
    인증 목적이라면 시험 유형에 맞는 절차를 따르십시오. SiFli RF 시험 안내서는 BT 시그널링을 QDID/프로토콜 적합성 시험 경로로 제시하며, BR/EDR BQB RF 시험은 BT 시그널링을, BLE BQB RF 시험은 SIG DTM(BLE 비시그널링)을 사용한다고 설명합니다. 따라서 이 페이지의 BLE 시그널링 절차를 BLE BQB RF 시험 절차로 간주하지 마십시오.

## 테스트 구성 { #test-setup }

DUT, Bluetooth 통신 테스터(소스 가이드는 CMW500 사용), Windows PC, USB-UART 케이블, RF 동축 케이블을 준비하십시오. DUT에서 `VBAT`, `GND`, UART1 TX/RX를 노출하십시오. 기본 UART1 핀은 패키지마다 다릅니다.

<div align="center" markdown>

<em>표: SiFli Bluetooth 시그널링 안내서에 기재된 디바이스/패키지별 기본 UART1 핀</em>

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

!!! warning "SF32LB58x UART1 방향 자료 불일치"
    SiFli Bluetooth 시그널링 안내서와 [SF32LB58x 하드웨어 설계 안내서의 디버그 포트 표](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md)는 칩 UART1 TX/RX를 PA32/PA31에 대응시킵니다. 반면 [SF32LB58-DevKit-LCD 핀 표](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb58x/SF32LB58-DevKit-LCD.md)는 PA31을 UART1_TXD, PA32를 UART1_RXD로 표시하며, [SiFli RF 시험 안내서](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/rf_test_guide.html)도 TX=PA31/RX=PA32로 기재합니다. 공식 자료 간에 표기가 일치하지 않습니다. 배선 전에 대상 보드 회로도와 프로젝트의 실제 핀 설정을 확인하고, 이 통합 표만 보고 연결하지 마십시오.

프로젝트의 실제 핀 구성이 기본 맵과 다르면 프로젝트 설정을 따르십시오. BLE 시그널링은 UART 시리얼을 통해 테스터와 EUT 제어 연결을 구성합니다. Classic BT는 DUT를 테스트 모드로 전환한 뒤 테스터가 무선으로 제어합니다.

핵심 차이는 제어 토폴로지입니다. BLE는 UART/HCI 제어 경로를 테스터에 연결하는 반면, Classic BT는 테스터가 무선으로 DUT를 검색하여 연결합니다. 소스 가이드의 SF32LB52x 다이어그램을 아래에 나타냈으며, 다른 제품군에서는 대상 프로젝트의 핀 표를 사용하십시오.

!!! note "제품군 범위"
    UART 핀 표는 제품군과 패키지를 비교한 통합 표입니다. 이어지는 토폴로지와 테스터 화면은 SF32LB52x 소스 예시입니다. 신호 경로를 이해하는 참고로만 사용하고, 모든 패키지에 공통으로 적용되는 핀 배치나 메뉴 안내로 간주하지 마십시오.

![BLE 시그널링 테스트 토폴로지](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — BLE 시그널링: PC가 DUT를 테스트 모드로 전환한 다음 UART/HCI 제어 경로가 테스터로 이동합니다.</em></div>

![Classic BT 시그널링 테스트 토폴로지](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — Classic BT 시그널링: 테스터가 RF로 DUT를 검색하여 연결합니다.</em></div>

## DUT를 테스트 모드로 전환 { #put-the-dut-into-test-mode }

### BLE { #ble }

1. DUT를 부팅하고 DFU/애플리케이션 펌웨어를 깨어 있는 상태로 유지합니다.
2. UART1을 PC에 연결하고 SiFli_Trace 또는 다른 시리얼 도구로 FinSH 명령 `bt_cm uart_dut`을 보냅니다.
3. 터미널을 16진수 표시로 전환하고 `04 0E 04 XX 03 0C 00`을 확인합니다.
4. PC 연결을 해제하고 같은 UART1을 테스터의 USB-to-RS232 EUT 제어 포트에 연결합니다.

![BLE 테스트 모드의 시리얼 응답](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — UART 연결을 옮기기 전에 `04 0E 04 XX 03 0C 00`을 확인합니다. 화면 예시의 응답은 `04 0E 04 06 03 0C 00`입니다.</em></div>

### Classic Bluetooth { #classic-bluetooth }

1. DUT를 부팅하고 화면과 CPU가 깨어 있는 상태를 유지합니다.
2. UART1을 PC에 연결하고 `bt_cm dut`을 보냅니다.
3. `Write scan enable success` 응답을 확인한 다음 RF 동축 케이블을 테스터에 연결합니다. 다른 테스트 모드에 들어가기 전에 재부팅합니다.

## 시그널링 연결 설정 { #establish-the-signaling-connection }

테스터의 `Bluetooth Signaling` 애플리케이션에서 시그널링을 켭니다. BLE에서는 `EUT Control`의 `HW Interface`=`USB to RS232 adapter`, `EUT Comm Protocol`=`HCI`, `Baud Rate`=`1000000`으로 설정하고, General Setup에서 `Burst Type: Low Energy`를 선택합니다. 화면의 측정 예시는 `PHY=LE1M`을 사용합니다. 시리얼 케이블이 연결되기 전에는 `Virtual COM Port`가 `None`으로 표시되고 비활성화됩니다. DUT의 UART1과 RF 동축 케이블을 각각 테스터와 RF 입력에 연결한 다음 Bluetooth Signaling을 껐다가 다시 켜면 테스터가 시리얼 포트를 감지합니다. `Connection Check`를 실행하고 약 3초 후 `LE comm test passed`가 표시되는지 확인합니다. Classic BT에서는 `HW Interface`를 `None (EUT Control off)`로 설정하고 `Inquire`로 DUT 주소를 검색한 다음 `Connect Test Mode`를 선택합니다.

![BLE 테스터의 EUT Control 설정](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — BLE EUT Control, 보레이트, Low Energy 설정.</em></div>

![Classic BT 테스터 설정](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예시 — EUT Control을 `None (EUT Control off)`로 설정한 Classic BT 시그널링.</em></div>

!!! note "테스터 화면에 표시된 설정 예시"
    BLE 화면에는 `Stop Bits=1`, `Parity=None`, 시리얼 `Protocol=None`, `Autoreset EUT` 켜짐, `Use BR/EDR Settings` 꺼짐도 표시됩니다. 측정 예시의 필드는 `Operating Mode=RF Test`, `Burst Type=Low Energy`, `PHY=LE1M`, `Channel=19`, `Frequency=2440.0 MHz`, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Auto Ranging` 및 `Dirty Tx` 꺼짐, `Packet Type=RE_PHY_TestRef`, `Payload Length=37 byte(s)`, `Pattern Type=PRBS9`입니다. Classic BT 화면에는 `Operating Mode=RF Test`, `Burst Type=Basic Rate`, 화면의 `Test Mode=Loopback Test`, `Channel` Rx/Tx 값 10/39, `Frequency` Rx/Tx 값 2412.0/2441.0 MHz, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Packet Type=DH5`, `Payload Length=339 byte(s)`, `Pattern Type=10101010`이 표시됩니다. Hopping, Auto Ranging, Dirty Tx, Whitening은 모두 꺼져 있습니다. 이는 화면의 측정 예시이며 모든 시험에 적용되는 고정 설정은 아닙니다. 화면의 `Loopback Test` 항목은 위 연결 절차에서 `Inquire` 후 `Connect Test Mode`를 선택하는 것과 별개의 설정입니다.

## TX 측정 실행 { #run-tx-measurements }

`Bluetooth 1 Multi Eval.`을 엽니다. 측정 화면은 기본적으로 꺼져 있으므로 `ON/OFF`를 눌러 활성화합니다. 설정을 변경하려면 오른쪽에서 `Input Signal`을 선택하고 화면 아래쪽에서 `Burst Type`을 지정합니다. BLE는 1M/2M, Classic BT는 BR/EDR을 선택할 수 있습니다. 채널, 패킷 유형, 페이로드 길이는 Bluetooth Signaling 화면이나 `Input Signal`에서 설정합니다. BLE 또는 BT 시그널링 연결 후 동일한 TX 화면을 사용합니다.

## RX 감도 측정 실행 { #run-rx-sensitivity-measurements }

TX를 비활성화하고 오른쪽의 `Bluetooth Signaling`을 눌러 연결 화면으로 돌아간 다음 `Bluetooth 1 RX Meas.`를 엽니다. Classic BT에서는 BER을, BLE에서는 PER을 선택하고 채널, 패킷 유형, 페이로드 길이를 설정한 뒤 Rx Quality를 활성화합니다. 테스터의 `Tx Level (CMW)`를 0.01 또는 0.1씩 낮춥니다. BER/PER 표시가 빨간색으로 바뀌면 직전 레벨이 해당 채널의 수신 감도입니다. 전도 측정인지 방사 측정인지 기록하고 케이블 손실도 포함하십시오.

## 기록과 재현 { #record-and-reproduce }

칩/패키지, UART 핀 맵, SDK 리비전, 펌웨어 식별 정보, 테스터 모델과 구성, RF 연결, 채널, PHY, 패킷 설정, TX 레벨, BER/PER, 보드 리비전을 결과와 함께 보관하십시오. 공식 제품군 페이지는 [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)입니다.
