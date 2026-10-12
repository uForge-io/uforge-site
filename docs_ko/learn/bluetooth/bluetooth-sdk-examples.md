---
icon: lucide/bluetooth-connected
title: "Bluetooth SDK 예제"
description: "BLE 서비스, Classic Bluetooth 프로파일, 휴대폰 연동, OTA, 데이터 전송, LE Audio 브로드캐스트에 적합한 SiFli-SDK Bluetooth 예제를 선택하는 방법입니다."
tags:
  - Bluetooth
  - 예제
---

# Bluetooth SDK 예제 { #bluetooth-sdk-examples }

SiFli-SDK Bluetooth 예제는 특정 프로파일, 역할 또는 라디오 워크플로에 초점을 맞춘 시작점이며, 그대로 가져다 쓸 수 있는 제품 펌웨어가 아닙니다. 제품에서 가장 까다로운 기술 요구 사항을 다루는 프로젝트로 시작하여, 수정하지 않은 예제를 타깃 보드에서 먼저 동작시킨 다음, 제품 요구 사항을 한 번에 하나씩 추가하십시오.

이 페이지는 SF32LB58x 문서에 나열된 [Classic Bluetooth](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/index.html), [BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/index.html), [LE Audio 브로드캐스트](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/index.html) 예제를 엔지니어링 작업별로 정리한 것입니다. `sf32lb58x` 경로는 문서 섹션을 나타낼 뿐이며, 모든 예제가 모든 SF32LB58x 보드나 다른 SF32 제품군을 지원한다는 뜻이 아닙니다. `latest` URL은 계속 바뀌는 주소입니다. 사용하려는 SDK 릴리스 또는 커밋에 해당하는 프로젝트의 **Supported Platforms** 섹션을 확인하고, 거기에 나열된 보드 이름과 빌드 지침만 따르십시오. 타깃 보드나 SDK 리비전이 명확히 확인되지 않았다면, URL이나 인접한 예제, 이름이 비슷한 보드로부터 추론하지 말고 호환성을 **미검증(unverified)**으로 표시하십시오. 페이지에 "모든 플랫폼"이라고 되어 있더라도, 제품 작업 전에 실제 SDK 리비전과 보드 구성에서 예제를 검증하십시오. 프로젝트 페이지는 `menuconfig` 설정, 테스트 장비, 제약 사항에 대한 레퍼런스이기도 합니다.

## 적합한 Bluetooth 경로 선택 { #start-with-the-right-bluetooth-path }

<div align="center"><em>표: Bluetooth SDK 예제 선택</em></div>

<div align="center" markdown>

| 제품 요구 | 시작점 | 제품 통합 전에 검증할 항목 |
|:-------------|:-----------|:-------------------------------------|
| 커스텀 BLE 서비스 또는 컴패니언 앱 링크 | [BLE Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html) | 광고, 연결, 서비스 인터페이스와 동작, 재연결, 휴대폰 측 검증 |
| 디바이스가 휴대폰에 대한 페리퍼럴이면서 센서에 대한 센트럴로도 동작해야 함 | [BLE Central and Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html) | 동시 GAP 역할과 GATT 클라이언트/서버 소유 관계 |
| 신뢰할 수 있는 BLE 데이터 전송 | [BLE Throughput](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html) 또는 [BLE File Transfer](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html) | 필요한 페이로드 흐름, 연결 설정, 복구 동작 |
| Bluetooth 펌웨어 업데이트 | [Peripheral with OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html) 또는 [Central and Peripheral with Pingpong OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | 업데이트 역할, 업데이트 중단 후 복구, 파티션, 롤백 계획 |
| Classic Bluetooth 시리얼 또는 휴대폰 테더링 네트워킹 | [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) 또는 [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html) | 시리얼 프로파일 또는 휴대폰이 제공하는 네트워크 경로, 상대 기기 호환성, 재연결 동작 |
| BT/BLE용 UART 기반 호스트-컨트롤러 HCI 전송 | [HCI over UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html) | 호스트/컨트롤러 경계, UART 전송, 타깃 컨트롤러 및 보드 구성 |
| Classic Bluetooth 오디오 또는 통화 | [Music Sink](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Music Source](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) 또는 [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) | 오디오 경로, 클럭, 버퍼링, 휴대폰 상호 운용성, 전력 예산 |
| LE Audio 브로드캐스트 | [BAP Broadcast Source](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) 또는 [BAP Broadcast Sink](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | 브로드캐스트 역할, 오디오 파이프라인, 테스트용 수신기 또는 송신기, 타이밍 마진 |

</div>

## 예제를 증거로서 브링업 { #bring-up-an-example-as-evidence }

프로젝트를 변경하기 전에 정확한 SDK 버전, 보드 이름, 구성, 상대 기기 또는 앱, 라디오 설정, 기대 로그를 기록하십시오. 그런 다음 다음 순서로 진행하십시오.

1. 해당 SDK 릴리스에 나열된 정확한 보드 이름과 지침을 사용하여 수정하지 않은 예제를 빌드하고 플래시에 기록하십시오. 릴리스와 문서의 일치 여부 또는 보드 지원이 확인되지 않았다면, 예제를 가져다 쓰기 전에 호환성을 미검증으로 취급하십시오.
2. 예제의 핵심인 무선 구간 동작을 입증하십시오. 상황에 따라 검색, 연결, 전송, 스트리밍 또는 수신을 확인합니다.
3. 리셋, 연결 해제, 재연결, 전원 재투입 조건 후에 테스트를 반복하십시오.
4. 제품 고유의 서비스, 사용자 흐름, 오디오 경로 또는 전력 정책을 한 번에 하나씩 추가하십시오.
5. 해당하는 경우 디스플레이, 센서, 스토리지, 오디오, 저전력 전환을 포함한 제품의 결합 워크로드에서 다시 테스트하십시오.

동작하는 예제는 그 예제가 다루는 워크플로만 보여 줍니다. 제품의 보안 정책, 무선 통신 거리, 지연 시간, 소비 전력, 상호 운용성이 릴리스 준비가 되었음을 의미하지는 않습니다.

## BLE 예제 { #ble-examples }

BLE 예제는 컴패니언 앱 링크, 상호 운용 가능한 GATT 서비스, 비콘, 데이터 전송, BLE 기반 OTA에 사용하십시오. 먼저 역할 중심의 예제를 선택하고, 제품에 해당 표준 서비스가 필요한 경우에만 프로파일 예제를 추가하십시오.

<div align="center"><em>표: 엔지니어링 작업별 BLE SDK 예제</em></div>

<div align="center" markdown>

| 엔지니어링 작업 | 공식 예제 | 이 프로젝트들로 확립할 항목 |
|:-----------------|:------------------|:--------------------------------|
| 기본 역할과 서비스 접근 | [Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html), [Central and Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html), [Multi-Connection](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/multi_connection/README.html) | 광고, 스캔, 연결 소유 관계, 올바른 센트럴/페리퍼럴 분담 |
| 휴대폰 연동 | [AMS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ams/README.html), [ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs/README.html), [Dual-Core ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs_dualcore/README.html) | Apple 미디어 또는 알림 연동과 필요한 휴대폰 측 페어링 흐름 |
| 표준 GATT 프로파일 | [BASC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/basc/README.html), [CPPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cppc/README.html), [CSCPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cscpc/README.html), [DISS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/diss/README.html), [HRPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hrpc/README.html), [CTS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/tip_cts/README.html) | 표준 프로파일의 서비스 역할, GATT 특성(characteristic) 정의, 상대 기기와의 상호 운용성 |
| 입력 및 인터콤 | [HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hid/README.html), [BLE Talkback](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/talkback/README.html) | 제품 UI나 음성 동작을 추가하기 전의 상호작용 모델 |
| 페어링 및 재연결 동작 | [BLE Pair](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/pair/README.html) | 본딩, ID(identity) 처리, 제품의 재페어링 경로 |
| 광고 및 검색 | [iBeacon](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/iBeacon/README.html), [Periodic Advertising](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv/README.html), [Periodic Advertising Sync](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv_sync/README.html) | GATT 연결을 가정하지 않고 필요한 브로드캐스트 또는 동기화 동작 |
| 데이터 전송 및 OTA | [File Transfer](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html), [Throughput](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html), [Peripheral with OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html), [Central and Peripheral with Pingpong OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | 페이로드, 링크 파라미터, 업데이트 역할, 중단 후 복구, 종단 간 검증 |

</div>

처리량(throughput) 결과를 제품의 데이터 전송률로 취급하지 마십시오. 처리량은 선택한 PHY, 연결 설정, 상대 기기 동작, RF 환경, 호스트 활동, 페이로드 패턴에 따라 달라집니다. 마찬가지로 ANCS 또는 AMS 예제는 휴대폰 연동의 기준선일 뿐, 모든 iOS 릴리스나 사용자 권한 상태에 대한 보증이 아닙니다.

## Classic Bluetooth 예제 { #classic-bluetooth-examples }

Classic Bluetooth 프로젝트는 BR/EDR 프로파일, 오디오, 시리얼 방식 전송 또는 휴대폰을 통한 IP 네트워킹이 필요한 제품과 관련이 있습니다. 개발 보드에서의 시연 성공은 시작점에 불과하므로, 제품이 실제로 사용하는 상대 기기와 워크로드로 상호 운용성을 검증하십시오.

<div align="center"><em>표: 엔지니어링 작업별 Classic Bluetooth SDK 예제</em></div>

<div align="center" markdown>

| 엔지니어링 작업 | 공식 예제 | 이 프로젝트들로 확립할 항목 |
|:-----------------|:------------------|:--------------------------------|
| 호스트/컨트롤러 전송 또는 Classic Bluetooth 시리얼 프로파일 | [HCI over UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html), [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) | HCI의 경우 호스트/컨트롤러 경계와 UART 전송, SPP의 경우 시리얼 프로파일 동작 |
| 오디오 스트리밍 및 미디어 제어 | [A2DP Multi-Connection](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_multi_connect/README.html), [A2DP Sharing](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_sharing/README.html), [AVRCP Cover Art](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/avrcp_cover_art/README.html), [Music Sink](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Music Sink with Relay](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink_with_relay/README.html), [Music Source](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) | 의도한 소스/싱크 토폴로지, 오디오 경로, 미디어 제어 경로, 리소스 예산 |
| 통화 및 음성 링크 | [3-SCO](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/3sco/README.html), [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html), [HFP Relay](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp_relay/README.html) | 통화 토폴로지, 오디오 지연 시간, 마이크/스피커 경로, 휴대폰 동작 |
| 휴대폰 제공 네트워킹 및 OTA | [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html), [PAN OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan_ota/README.html) | 휴대폰 테더링, IP 트래픽, 재연결, OTA 전달 경로 |

</div>

PAN 네트워킹 모델과 휴대폰 측 설정은 [Bluetooth PAN](pan.md)을 참조하십시오. 오디오 라우팅, 버퍼 소유 관계, 시스템 부하 검증은 [오디오 개요](../audio/overview.md)와 [Audio Server와 버퍼링](../audio/audio-server-buffering.md)을 참조하십시오.

## LE Audio 브로드캐스트 예제 { #le-audio-broadcast-examples }

`sf32lb58x` 문서 경로만으로는 보드 호환성이 확립되지 않습니다. 정확한 SDK 리비전과 타깃 보드에 대해 **Supported Platforms** 섹션을 확인하십시오. Classic Bluetooth/BAP 브리지 예제에서 README 제목은 소스를 가리키지만, 경로와 개요는 싱크를 설명합니다. [검토한 SDK 리비전의 구현](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/example/zbt/bap_broadcast_src_with_classic_bt/src/main.c)은 Classic A2DP를 처리하고 BAP 브로드캐스트 소스를 시작합니다. 이 결과는 고정된 해당 리비전에 대한 것이며, `latest`로 제공되는 모든 릴리스에 자동으로 적용되지는 않습니다. 빌드하기 전에 사용하는 정확한 SDK 릴리스 또는 커밋에 대해 README, 소스, 보드 구성을 확인하십시오. 복사된 싱크 설명으로부터 예제의 역할이나 보드 지원을 추론하지 마십시오.

`zbt` 프로젝트는 [Basic Audio Profile (BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/)을 기반으로 한 LE Audio 브로드캐스트 소스 및 싱크 예제를 제공합니다. 소스와 싱크는 짝을 이루는 시스템 테스트로 취급하십시오. 브로드캐스트 구성, 오디오 소스, 수신기, 클럭, RF 조건이 모두 관찰 결과에 영향을 줍니다.

<div align="center"><em>표: LE Audio 브로드캐스트 SDK 예제</em></div>

<div align="center" markdown>

| 제품 방향 | 공식 예제 | 먼저 확립할 항목 |
|:------------------|:-----------------|:------------------------|
| 브로드캐스트 오디오 스트림 수신 | [BAP Broadcast Sink](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | 수신기 동작, 출력 오디오 경로, 테스트 브로드캐스트 구성 |
| 브로드캐스트 오디오 스트림 송신 | [BAP Broadcast Source](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) | 소스 오디오 파이프라인, 브로드캐스트 구성, 정상 동작이 확인된 수신기 |
| Classic Bluetooth와 LE Audio 브로드캐스트 브리징 | [BAP Broadcast Source with Classic Bluetooth](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src_with_classic_bt/README.html) | 두 오디오 도메인, 두 도메인 간 전달 경계, 결합된 타이밍/리소스 마진 |

</div>

## 예제를 넘어선 제품 검증 { #product-validation-beyond-the-example }

<div align="center"><em>표: Bluetooth 예제 제품 적용 점검</em></div>

<div align="center" markdown>

| 경계 | 소스 예제에서 유지할 항목 | 제품에서 다시 검증할 항목 |
|:---------|:---------------------------------|:----------------------------|
| 라디오 동작 | 지원되는 보드와 예제가 의도한 역할 또는 프로파일 | 안테나, 인클로저, 통신 거리, RF 공존, 상대 기기, 인증 시험 계획 |
| 연결 정책 | 기준이 되는 광고, 스캔 또는 연결 흐름 | 제품의 지연 시간, 전력 목표, 재연결 전략, 상태 전환 |
| 보안 | 예제의 페어링 또는 본딩 설정 | 인증 요구 사항, 키 저장, 프라이버시, 공장 초기화, 사용자에게 보이는 복구 |
| 데이터 및 오디오 | 시연된 패킷 또는 스트림 흐름 | 페이로드 형식과 교환 규칙, 오류 복구, 지연 시간, 버퍼링, 코덱 구성, 메모리 마진 |
| 증거 | 빌드 설정, 로그, 기대 동작 | 반복 가능한 휴대폰/액세서리 매트릭스, 전력 트레이스, 연결 해제 복구, 회귀 테스트 |

</div>

## 관련 리소스 { #related-resources }

- [Bluetooth 개요](overview.md): 제품 수준의 역할, 프로파일, 보안, 연결 파라미터, 공존 선택.
- [Bluetooth 프로세서](processor.md): 호스트/컨트롤러 경계와 전력 동작.
- [Bluetooth PAN](pan.md): 휴대폰 테더링 IP 네트워킹과 PAN 기반 OTA.
- [오디오 SDK 예제](../audio/audio-sdk-examples.md): Bluetooth 오디오 작업을 보완하는 로컬 캡처, 코덱, 재생 예제.
- [예제](../../develop/examples/index.md): 여러 도메인에 걸친 SDK 예제 카탈로그.
