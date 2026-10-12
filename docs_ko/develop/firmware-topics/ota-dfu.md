---
icon: lucide/upload-cloud
description: "USB-CDC, BLE, Bluetooth PAN 펌웨어 업데이트에 SiFli-SDK DFU v2 미들웨어를 사용하는 방법과, 문서화된 애플리케이션 및 로더 예제 쌍을 설명합니다."
tags:
    - Develop
    - OTA
    - DFU
---

# OTA와 DFU { #ota-and-dfu }

DFU v2는 DFU 및 OTA 워크플로를 위한 SiFli-SDK 펌웨어 업데이트 미들웨어입니다. USB-CDC, BLE, Bluetooth PAN의 세 가지 전송 채널을 제공합니다. 각 채널에는 사용자 애플리케이션과 이에 대응하는 로더 서브프로젝트가 포함됩니다.

먼저 제품의 업데이트 경로에 맞는 전송 채널을 선택하십시오. 그런 다음 해당하는 애플리케이션 예제에서 시작하십시오. 대응하는 로더는 빌드에 자동으로 추가됩니다.

## DFU v2 구조 { #dfu-v2-structure }

<div align="center"><em>그림: DFU v2 예제 구조</em></div>

```text
dfu_v2/
├── cdc/       USB-CDC channel
│   ├── app/       User application and PC update tool
│   └── loader/    CDC DFU loader
├── ble/       BLE channel
│   ├── app/       BLE peripheral application
│   └── loader/    BLE DFU loader
└── bt_pan/    Bluetooth PAN channel
    ├── app/       Application that downloads firmware from a server
    └── loader/    PAN DFU loader
```

채널별 애플리케이션과 로더는 함께 사용하도록 설계되었습니다. 애플리케이션을 빌드할 때 SDK는 `building.py`의 `AddDFU_*` 로직을 사용하여 대응하는 로더를 서브프로젝트로 포함하므로, 해당 로더를 따로 빌드하지 마십시오. BLE 예제에서는 실행 중인 애플리케이션이 HCPU 이외의 이미지를 업데이트할 수 있으며, HCPU를 업데이트하려면 로더로 전환해야 합니다.

## 호환성과 구성 { #compatibility-and-configuration }

DFU v2는 기본적으로 비활성화되어 있으므로, 미들웨어 구성에서 `USING_DFU_V2`를 명시적으로 활성화하십시오. HCPU(`BF0_HCPU`)에서만 사용할 수 있으며, 레거시 DFU 옵션 `BSP_USING_DFU` 또는 `USING_DFU_PAN`과 함께 활성화할 수 없습니다. DFU v2를 활성화하면 이어받기 전송을 지원하기 위해 FlashDB(`PKG_USING_FLASHDB`)가 선택됩니다.

USB CDC와 BLE는 푸시 전송이며 서로 배타적입니다. `DFU_V2_USE_CDC_TRANSPORT` 또는 `DFU_V2_USE_BLE_TRANSPORT`로 하나를 선택하십시오. Bluetooth PAN은 풀 전송을 사용하며, 디바이스 시작 모드(`DFU_V2_USE_DEVICE_MODE`) 및 WebClient와 함께 `DFU_V2_USE_PAN_TRANSPORT`를 활성화하십시오. 제품의 업데이트 아키텍처를 확정하기 전에 타깃 SDK 릴리스에서 사용 가능한 옵션을 확인하십시오.

## 업데이트 채널 선택 { #choose-an-update-channel }

<div align="center"><em>표: DFU v2 전송 채널 선택</em></div>

<div align="center" markdown>

| 채널 | 문서화된 업데이트 경로 | 일반적인 적합 사례 |
| --- | --- | --- |
| USB-CDC | PC가 USB 가상 시리얼 포트를 통해 디바이스를 업데이트합니다. | 양산, 실험실, 유선 서비스 워크플로. |
| BLE | BLE 페리퍼럴 애플리케이션이 업데이트를 수신합니다. | 모바일 앱이 연결된 제품을 업데이트하는 경우. |
| Bluetooth PAN | 디바이스가 Bluetooth PAN 네트워킹을 사용하여 HTTP 서버에서 업데이트를 다운로드합니다. | 업데이트 이미지를 스스로 가져오는 연결형 제품. |

</div>

## 제품 업데이트 검토 { #product-update-review }

- [ ] 선택한 전송 채널이 제품에서 사용할 수 있는 연결 경로와 일치합니다.
- [ ] 애플리케이션과 대응하는 로더를 하나의 업데이트 흐름으로 빌드하고 테스트했습니다.
- [ ] 지원되는 타깃 보드를 해당 예제의 README에서 확인했습니다.
- [ ] 제품의 업데이트 중단, 복구, 양산 서비스 시 동작이 정의되어 있습니다.
- [ ] 제품 릴리스에 대해 펌웨어 이미지의 진본성과 무결성, 버전 정책, 파티션 용량을 검토했습니다.
- [ ] 정상적인 애플리케이션에 의존하지 않고도 업데이트 실패 로그를 수집할 수 있습니다.

## DFU v2 예제 빌드 { #build-a-dfu-v2-example }

예제의 `project/` 디렉터리에서 다음 명령으로 빌드합니다.

```bash
scons --board=<board-name> -j8
```

각 예제의 README에 지원되는 보드가 나열되어 있습니다. DFU v2 미들웨어 구성 자체는 SiFli-SDK의 `middleware/dfu_v2` 아래에 있습니다.

## DFU v2 SDK 예제 { #dfu-v2-sdk-examples }

<div align="center"><em>표: SF32LB58x용 공식 SiFli-SDK DFU v2 예제</em></div>

<div align="center" markdown>

| 채널 | 사용자 애플리케이션 | 로더 서브프로젝트 |
| --- | --- | --- |
| USB-CDC | [`cdc/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/app/README.html) | [`cdc/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/loader/README.html) |
| BLE | [`ble/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/app/README.html) | [`ble/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/loader/README.html) |
| Bluetooth PAN | [`bt_pan/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/app/README.html) | [`bt_pan/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/loader/README.html) |

</div>

전체 소스 색인과 최신 SDK 탐색 경로는 [SiFli-SDK의 DFU v2 예제](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/index.html)를 참조하십시오.
