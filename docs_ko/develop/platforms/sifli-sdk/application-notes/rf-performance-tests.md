---
icon: lucide/radio-tower
title: "SiFli-SDK RF 테스트 실행"
description: "올바른 Bluetooth RF 테스트 모드, 제어 경로, 측정 장비를 선택합니다."
tags: [개발, SiFli-SDK, 애플리케이션 노트, RF]
---

# SiFli-SDK RF 테스트 실행 { #run-sifli-sdk-rf-tests }

SDK는 Bluetooth RF 검증을 시그널링(signaling), 논시그널링(non-signaling), 개별 RF 테스트로 구분합니다. 테스트 펌웨어를 로드하기 전에 테스트 목적에 따라 경로를 선택하십시오.

<div align="center" markdown>
<em>표: 제품군별 RF 테스트 내용 범위</em>

| 내용 | 제품군 범위 |
|---|---|
| 테스트 모드 비교 및 측정 순서 | SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x, SF32LB58x를 통합한 워크플로입니다. |
| Bluetooth Classic 테스트 지원 여부 | Bluetooth Classic을 지원하는 타깃이 필요합니다. SF32LB55x는 BLE 전용이며 Bluetooth Classic 테스트 절차를 지원하지 않으므로 BLE 테스트 경로를 사용하십시오. |
| SF32LB57x 테스트 도구 지원 | [RF Test Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html)에는 SF32LB57x UART 핀이 나열되어 있지만, [SiFli_RfTool manual](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/SiFli_RfTool/SiFli_RfTool_UM.html)의 플랫폼 선택기에는 57x가 빠져 있습니다. 이는 핀 맵에 대한 안내로만 취급하고, 타깃 SDK 릴리스에서 지원하는 테스트 경로를 확인하십시오. |
| 토폴로지 스크린샷과 HCI 명령 매트릭스 | SF32LB52x 소스 예제입니다. 구현에는 타깃 제품군의 명령 및 핀 문서를 사용하십시오. |
| `CONFIG_BT_RF_TEST` 설정 | 문서화된 55x 이외의 경로에 적용됩니다. SF32LB55x `bt_rftest`는 이 심볼을 사용하지 않습니다. |
| UART 핀, 패킷 값, 명령 구문 | 타깃 제품군과 SDK 릴리스에 따라 다릅니다. 프로젝트 설정과 `bt_rftest help`를 확인하십시오. |

</div>

!!! warning "공식 가이드 간 SF32LB58x UART1 매핑 불일치"
    [general RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html)는 UART1 TX/RX를 PA31/PA32로 나열하지만, [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html)는 PA32/PA31로 나열합니다. 배선하기 전에 타깃 펌웨어의 테스트 경로와 보드 pinmux를 확인하십시오. 이 두 가이드의 매핑은 서로 충돌합니다.

## 테스트 모드 선택 { #select-the-test-mode }

<div align="center" markdown>
<em>표: Bluetooth 및 RF 테스트 모드 선택</em>

| 모드 | 용도 | SDK 진입점 | 제어 경로 |
|---|---|---|---|
| BT 시그널링 | BQB/QDID 인증 및 프로토콜 규격에 맞는 성능 측정 | `bt_cm dut`, `gap_enb_dut_mode_req()` | 테스터 무선 인터페이스 및 LMP 테스트 제어 |
| BT 논시그널링 | 개발 단계의 RF 튜닝 및 양산 선별 | `bt_rftest`, `bt_enter_no_signal_dut_mode()` | 로컬 벤더 HCI |
| BLE 논시그널링(SIG DTM) | BLE RF 선별 및 SIG DTM 항목 | `bt_rftest bletx/blerx`, `ble_enter_dut_mode()` | 로컬 HCI 또는 `bt_cm uart_dut`로 전달되는 표준 HCI |
| 개별 RF 테스트 | 보드 수준 RF 튜닝 및 FCC/CE 사전 적합성 평가 | `bt_cm uart_dut` + `SiFli_RfTool` | PC 도구가 한 번에 하나의 저수준 동작을 전송 |

</div>

시그널링 테스트는 실제 Bluetooth 링크를 형성하며 인증에 사용됩니다. 논시그널링 테스트는 RF를 특정 채널과 출력의 송신 또는 수신 상태로 직접 고정하며, 개발과 양산 선별에 주로 사용됩니다. 개별 RF 테스트에서는 PC 도구로 캐리어 또는 변조를 정밀하게 제어하고 분석기나 파워 미터로 측정합니다. BT 논시그널링 및 개별 RF 테스트는 SiFli가 제공하는 벤더 절차이며 BQB 테스트가 아닙니다.

아래 토폴로지 그림은 SF32LB52x RF 테스트 가이드에서 가져왔습니다. PC, DUT, 테스터 사이의 UART/HCI/RF 연결 방식이 어떻게 다른지 보여 줍니다. 실제 기본 UART와 핀 맵은 대상 제품군의 표에서 확인하십시오.

![BT signaling test topology](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예제 — BT 시그널링: PC가 테스터를 설정하고, DUT와 테스터가 RF 링크를 수립합니다.</em></div>

![BT non-signaling test topology](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예제 — BT 논시그널링: PC가 시리얼/HCI 명령으로 DUT의 RF 상태를 직접 제어합니다.</em></div>

![BLE signaling test topology](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예제 — BLE DTM: UART/HCI 제어 경로와 RF 측정 경로가 모두 테스터에 연결됩니다.</em></div>

## 펌웨어 선택 및 프로젝트 설정 { #choose-firmware-and-configure-the-project }

`rf_test.bin`은 SiFli 내부 RF 테스트 빌드이며 일반적인 SDK 산출물로 배포되지 않습니다. `User.bin`은 SDK로 빌드한 애플리케이션 펌웨어를 가리킵니다. RF 기능은 프로토콜 스택에 통합되어 있으며 `bt_cm dut`, `bt_cm uart_dut`, `bt_rftest` 같은 FinSH 명령으로 실행합니다.

사용자 빌드에서는 관련 옵션을 활성화하십시오.

```kconfig
CONFIG_RT_USING_FINSH=y
CONFIG_BSP_BT_CONNECTION_MANAGER=y
CONFIG_BT_RF_TEST=y
```

`CONFIG_BT_RF_TEST`는 SF32LB55x `bt_rftest` 경로에서 사용하지 않습니다. `CONFIG_BT_FINSH`는 트레이싱용이며 테스트 명령에는 필요하지 않습니다. 제어 경로가 SDK 자체 IPC UART를 사용하는 경우, 보드에 맞게 `CONFIG_IPC_USE_OWN_DEVICE=y`와 `CONFIG_IPC_OWN_DEVICE_NAME="uart2"`를 설정하십시오. SDK 예제 `example/bt/spp/`와 `example/bt/HCI_over_uart/`가 시작점이 됩니다.

## BT 시그널링 테스트 { #bt-signaling-test }

1. DUT의 `VBAT`, `GND`, UART1 TX/RX를 외부로 인출합니다. 기본 UART1 핀은 패키지에 따라 다르므로 프로젝트의 핀 설정을 사용하십시오.
2. BLE 시그널링의 경우 UART1을 PC에 연결하고 `bt_cm uart_dut`를 전송합니다. `04 0E 04 XX 03 0C 00`을 확인한 다음 UART를 테스터로 옮깁니다.
3. BT 시그널링의 경우 DUT를 깨어 있는 상태로 유지하고 `bt_cm dut`를 전송한 뒤 `Write scan enable success`를 확인하고, RF 동축 케이블을 테스터에 연결합니다.
4. Bluetooth Signaling에서 BLE는 보레이트 1,000,000의 USB-to-RS232 EUT 제어를 사용합니다. BT는 `None (EUT Control off)`로 설정하고 무선으로 DUT를 탐색합니다.
5. TX는 `Bluetooth 1 Multi Eval.`에서, RX는 `Bluetooth 1 RX Meas.`에서 실행하십시오. Classic BT에는 BER을, BLE에는 PER을 사용하고, 테스터 TX 레벨을 낮추어 감도를 판단하십시오.

## BT/BLE 논시그널링 명령 { #btble-non-signaling-commands }

RF 테스트 경로를 활성화한 후 FinSH 셸을 사용합니다.

```text
bt_rftest enter
bt_rftest bttx <channel> <packet_type> <power> <length>
bt_rftest btrx <channel> <packet_type> <power>
bt_rftest btstop
bt_rftest exit
```

정확한 인자 순서와 허용 패킷 값은 릴리스마다 다르므로 대상 SDK의 `bt_rftest help`에 표시된 구문을 그대로 사용하십시오. RX 패킷 통계는 유효한 측정값이지만 TX 패킷 수는 수신 패킷 수를 나타내지 않습니다. BLE DTM은 `bt_rftest bletx`/`blerx` 또는 표준 HCI 명령 `LE_Transmitter_Test`, `LE_Receiver_Test v2`, `LE_Test_End`로 실행합니다. BLE 채널은 0~39이고 PHY 값은 1M/2M/Coded입니다. Classic BT 채널은 0~78입니다. BT와 BLE를 모두 지원하는 듀얼 모드 타깃에서는 두 방식이 RF 하드웨어를 공유하므로 각각 따로 테스트하십시오.

## SiFli_RfTool을 이용한 개별 RF 테스트 { #single-item-testing-with-sifli_rftool }

DUT UART1을 보레이트 1,000,000으로 PC에 연결합니다. RF 포트는 동축 케이블로 테스터, 스펙트럼 분석기 또는 파워 미터에 연결합니다.

`bt_cm uart_dut`를 전송하고 `04 0E 04 XX 03 0C 00`을 확인합니다. `SiFli_RfTool.exe`에서 제품군, BLE 또는 BT 논시그널링 모드, COM 포트를 선택합니다.

채널, PHY, 패킷 유형 또는 송신 출력을 변경하기 전에 TX/RX를 중지하십시오. BLE RX에서는 테스터가 1,500개의 패킷을 전송할 수 있습니다. `PER = (1500 - received) / 1500 × 100%`로 PER을 계산하고 RSSI를 기록합니다.

Classic BT RX에서는 CMW500 GPRF 파형을 사용하고 RSSI, 패킷/비트 오류 수, BER/PER을 기록합니다. 케이블 손실을 보정하고, 결과에 전도 측정인지 방사 측정인지 표시하십시오.

## 결과 기록 { #record-the-result }

원본 가이드에는 전체 HCI 명령/반환값 매트릭스도 있습니다. 명령을 전송했는데 DUT가 예상한 상태로 들어가지 않으면 이 매트릭스를 확인하십시오. 표에 나온 모든 명령/응답 예시를 이식 가능한 API로 간주하면 안 됩니다. 대상 SDK와 칩 제품군에 맞는 명령을 사용하십시오.

<div align="center"><em>표: SF32LB52x 매트릭스의 RX 채널과 중심 주파수 예시</em></div>

<div align="center" markdown>

| 테스트 모드 | 채널 | 중심 주파수 |
|:----------|:---------|:-------------------|
| BR/EDR | 0 / 39 / 78 | 2402 / 2441 / 2480 MHz |
| BLE | 0 / 19 / 39 | 2402 / 2440 / 2480 MHz |

</div>

원본 매트릭스는 실패 후 RX 테스트를 다시 시도하기 전에 `HCI_Reset`(`01,03,0C,00`)을 수행하도록 안내합니다. 이 내용과 위의 채널 벡터는 SF32LB52x 소스 예제로 취급하고, 타깃 SDK와 제품군에 맞는 명령 순서를 확인하십시오.

![SF32LB52x HCI RF-test command matrix](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 소스 예제 — HCI 명령, 반환값, RF 테스트 항목 매트릭스.</em></div>

모든 결과에 제품군, SDK 리비전, 펌웨어 식별 정보, UART 핀, RF 경로, 케이블 손실, 계측기 모델과 설정, 채널, PHY/패킷 유형, 출력 설정, RX 카운트, RSSI, BER/PER, 보드 리비전을 함께 기록하십시오. 자세한 내용은 제품군별 공식 가이드인 [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html), [SF32LB55x(UART 표에는 SF32LB57x도 포함)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html)를 참조하십시오.
