---
icon: lucide/network
description: "SF32의 Bluetooth PAN: BNEP 전송, NAP/GN/PANU 역할, 휴대폰 테더링의 장단점, SiFli-SDK 설정, OTA 검증."
tags:
  - Bluetooth
---

# Bluetooth PAN { #bluetooth-pan }

## 개요 { #overview }

**Bluetooth PAN**(Personal Area Networking)은 SF32 디바이스가 Classic Bluetooth 링크를 통해 IP 네트워크에 접속할 수 있게 해 주며, 보통 휴대폰의 테더링 서비스를 이용해 인터넷에 접속합니다. 이렇게 하면 전용 Wi-Fi 라디오가 필요하지 않을 수 있습니다. PAN은 [Bluetooth 개요](overview.md#classic-bluetooth-profiles)에 나열된 Classic Bluetooth 프로파일 중 하나이며, [OTA와 DFU](../../develop/firmware-topics/ota-dfu.md)에서 다루는 OTA 전송 방식 중 하나입니다.

날씨 조회, 시간 동기화, 클라우드 API 호출, 음성 어시스턴트 트래픽, 펌웨어 다운로드처럼 가끔 발생하거나 보통 수준인 IP 트래픽에는 PAN을 고려하십시오. 해당 사용 사례에서 전용 Wi-Fi 서브시스템의 비용, 보드 면적, 통합 작업량, 전력 소비가 그 가치를 넘어선다면 PAN으로 전용 Wi-Fi 서브시스템을 생략할 수 있습니다. 선택한 하드웨어와 최종 제품에 적용되는 RF 규정 준수 요구 사항을 평가하십시오.

## Bluetooth PAN의 동작 방식 { #how-bluetooth-pan-works }

Bluetooth SIG는 PAN을 Classic Bluetooth(BR/EDR) 프로파일로 정의합니다. PAN은 RFCOMM이 아니라 L2CAP 위에서 동작하는 **BNEP**(Bluetooth Network Encapsulation Protocol)를 사용하여 Bluetooth ACL 링크로 이더넷 방식의 패킷을 전달합니다. PAN에는 BR/EDR과 호환되는 PAN 구현이 필요하며, BLE 지원 자체는 요구 사항이 아니므로 Classic 전용 하드웨어도 PAN을 구현할 수 있습니다.

PAN은 BLE 위에서 동작하지 않습니다. 다만 별도의 [Internet Protocol Support Profile (IPSP)](https://www.bluetooth.com/specifications/specs/internet-protocol-support-profile-1-0/)이 BLE를 통한 IPv6를 지원합니다. 이 프로토콜 기능이 SiFli-SDK나 휴대폰 핫스팟 서비스의 IPSP 지원을 입증하는 것은 아닙니다. 아래의 BLE 비교는 IPSP가 아니라 애플리케이션 수준의 GATT 릴레이를 다룹니다.

이 프로파일은 세 가지 역할을 정의합니다.

<div align="center"><em>표: Bluetooth PAN 역할</em></div>

<div align="center" markdown>

| 역할 | 기능 |
|:-----|:---------|
| **NAP** (Network Access Point) | 연결된 Bluetooth 디바이스를 외부 네트워크에 브리징하여, Bluetooth 피코넷과 해당 네트워크 사이에서 패킷을 전달합니다. 휴대폰의 테더링/Personal Hotspot 기능을 사용할 때 보통 휴대폰이 이 역할입니다. |
| **PANU** (PAN User) | 클라이언트 역할입니다. NAP(또는 GN) 디바이스에 연결하여 해당 디바이스의 네트워크 접속을 사용합니다. SF32 디바이스가 사용하는 역할입니다. |
| **GN** (Group Ad-hoc Network) | 외부 네트워크 접속을 제공하지 않고 연결된 PANU 디바이스 사이에서 패킷을 전달합니다. 인터넷 접속이 아니라 디바이스 간 애드혹 네트워킹에 사용합니다. |

</div>

PANU는 inquiry로 주변 디바이스를 찾고 SDP를 사용하여 해당 디바이스의 PAN 서비스와 역할을 식별할 수 있습니다. Class of Device의 Networking 표시는 검색을 위한 힌트일 뿐, 사용 가능한 NAP 서비스가 있다는 증거가 아닙니다. L2CAP 위에서 ACL과 BNEP 설정이 끝나면, NAP은 자신의 구현이 제공하는 브리징 또는 라우팅 구성을 통해 트래픽을 외부 네트워크로 전달합니다. [PAN 사양](https://www.bluetooth.com/specifications/specs/personal-area-networking-profile-1-0/)에 설명된 대로 NAP은 휴대폰일 수도 있고 LAN 게이트웨이일 수도 있습니다. 어느 쪽 상대 기기든 연결을 종료할 수 있으며, 여기서 설명하는 휴대폰 테더링 설계에서는 공유 상태를 바꾸면 재연결이 필요할 수 있습니다.

## Wi-Fi 대신 PAN을 사용하는 이유 { #why-use-pan-instead-of-wi-fi }

<div align="center"><em>표: 네트워크 접속 방식 비교: PAN, Wi-Fi, BLE</em></div>

<div align="center" markdown>

| 방식 | 적합한 경우 | 장단점 |
|:---------|:---------------|:---------|
| Bluetooth PAN | 제품이 이미 듀얼 모드 Bluetooth를 사용하고, 가끔 발생하거나 보통 수준인 IP 트래픽이 필요하며, 컴패니언 휴대폰이 보통 근처에 있는 경우. | 처리량과 통신 거리는 BR/EDR과 NAP의 업스트림 연결에 따라 달라집니다. 휴대폰 테더링 설계는 해당 휴대폰에 의존하며, 다른 설계에서는 휴대폰이 아닌 NAP 게이트웨이를 사용할 수 있습니다. |
| 전용 Wi-Fi 라디오 | 제품이 지속적인 고처리량 또는 휴대폰에 의존하지 않는 연결을 필요로 하는 경우. | 라디오, 안테나, 통합 작업, 전력 예산이 추가됩니다. 선택한 라디오/모듈과 최종 제품에 적용되는 RF 규정 준수 요구 사항을 평가하십시오. |
| BLE GATT → 컴패니언 앱 → 인터넷 | 제품이 소량의 데이터를 교환하면 되고 앱이 이를 클라우드로 릴레이할 수 있는 경우. | 이 커스텀 릴레이는 디바이스의 직접적인 IP 링크가 아닙니다. BLE IPSP는 PAN이 아닌 별도의 선택지이며, 디바이스 스택과 게이트웨이의 지원 여부를 확인해야 합니다. |

</div>

오디오, GATT 서비스 또는 Classic 프로파일 때문에 이미 듀얼 모드 Bluetooth를 채택한 제품이라면, 제품의 사용 사례가 근처의 테더링이 활성화된 휴대폰에 의존해도 괜찮은 한, PAN은 두 번째 라디오 서브시스템 없이 인터넷 접속을 추가하는 가장 낮은 증분 비용의 방법인 경우가 많습니다.

## iOS 데이터 전송: BLE 릴레이, Classic Bluetooth, PAN { #ios-data-transport-ble-relay-classic-bluetooth-and-pan }

서로 다른 세 가지 iPhone 연결 설계를 구분하는 것이 중요합니다. "Classic Bluetooth에는 MFi가 필요하다"라고 단서 없이 말하는 것은 지나치게 넓은 표현입니다. iOS는 표준 Bluetooth 프로파일을 지원하며, Personal Hotspot 자체도 Bluetooth를 사용할 수 있습니다. 제한은 iOS 앱이 Apple의 External Accessory/iAP 경로를 통해 Bluetooth Classic 액세서리와 **커스텀 데이터 채널**을 사용해야 할 때 적용됩니다. Apple은 External Accessory가 Bluetooth를 통해 MFi 액세서리와 통신한다고 문서화하고 있으며, [기술 Q&A](https://developer.apple.com/library/archive/qa/qa1657/_index.html)에서는 BLE 액세서리는 대신 Core Bluetooth를 사용하며 MFi 준수가 필요하지 않다고 밝히고 있습니다.

<div align="center"><em>표: iOS 액세서리-인터넷 설계 선택지</em></div>

<div align="center" markdown>

| 설계 | 디바이스-휴대폰 경로 | iOS 제품에 미치는 영향 | 인터넷 처리량과 엔지니어링 장단점 |
|:-------|:---------------------|:------------------------|:--------------------------------------------|
| BLE → 앱 → 인터넷 | 커스텀 GATT 프로토콜. iOS 앱이 디바이스 데이터를 수신하여 클라우드로 전달합니다. | BLE는 External Accessory MFi 경로 없이 Core Bluetooth를 사용할 수 있습니다. 앱이 페어링, 프레이밍, 재시도, 백그라운드 동작, 클라우드 릴레이를 책임져야 합니다. | BLE의 페이로드 용량과 스케줄링은 연결 파라미터와 iOS/앱 동작에 의해 제한됩니다. 이 경로는 소량이고 간헐적인 데이터에는 적합한 경우가 많지만 범용 IP 링크가 아니며, 연속적이거나 데이터 비중이 큰 트래픽에서는 실질적인 병목이 될 수 있습니다. |
| 커스텀 Classic Bluetooth → 앱 | iOS 앱으로 향하는 커스텀 Bluetooth Classic 액세서리 데이터 채널. | [External Accessory 프레임워크](https://developer.apple.com/documentation/externalaccessory)는 MFi 액세서리용입니다. Apple은 이 프레임워크가 MFi 하드웨어로 제한된다고 밝히고 있습니다. 지원되는 표준 프로파일은 별개의 경우입니다. | 이 경로에는 MFi 액세서리와 해당 액세서리 프로토콜, 그리고 앱 통합과 제품 인증이 필요합니다. 그 자체로 디바이스에 직접적인 IP 네트워킹을 제공하지는 않습니다. |
| Bluetooth PAN → 휴대폰 핫스팟 → 인터넷 | 표준 PANU-NAP 네트워킹. SF32는 휴대폰의 Bluetooth Personal Hotspot/테더링 서비스를 사용합니다. | 디바이스는 커스텀 앱-액세서리 전송 대신 휴대폰의 테더링 서비스를 사용합니다. 제품은 여전히 휴대폰, 통신사, 테더링 동작을 인증해야 합니다. | SF32는 앱 릴레이 없이 자체 IP 클라이언트를 실행합니다. 이것이 BLE에 비한 속도나 에너지 이점을 입증하지는 않습니다. 동일한 페이로드와 서버를 사용하여 대상 휴대폰에서 실제 전달된 페이로드 처리량, 업데이트 시간, 에너지를 비교하십시오. 결과는 Bluetooth 링크, 휴대폰 정책, 업스트림 네트워크, 엔드포인트에 따라 달라집니다. |

</div>

음성 어시스턴트, OTA 클라이언트 또는 지속적인 스트리밍이나 직접적인 HTTP/WebSocket 트래픽이 필요한 기타 제품에서는, PAN을 사용하면 중간에 BLE 릴레이 앱을 둘 필요가 없을 수 있습니다. 다만 대상 iPhone과 SDK 구성에서 테스트한 이후에야 iOS 네트워크 경로 후보로 취급하십시오. SiFli v2.5.1 예제는 PAN만으로 연결할 때 문서화된 iOS 문제를 우회하기 위해 A2DP도 함께 활성화합니다. A2DP는 PAN 프로토콜의 요구 사항이 아닙니다. 제품에 설정 UI, 사용자 인증, 알림, 로컬 제어가 필요하다면 PAN이 앱을 **대체하지는 않습니다**. PAN은 단지 애플리케이션 데이터 플레인이 앱 릴레이에 의해 제약받지 않게 할 뿐입니다. [SF32 Xiaozhi 음성 어시스턴트](../../projects/sf32-xiaozhi.md)는 이 아키텍처의 동작하는 예입니다.

## SF32의 디바이스 지원 { #device-support-on-sf32 }

SF32에서는 Classic Bluetooth를 지원하는 제품군을 선택하고, PAN 스택, SDK 리비전, 타깃 보드 구성을 확인하십시오. 아래에서 PAN을 지원하는 제품군은 듀얼 모드 Bluetooth를 사용하며, 이는 해당 SF32 디바이스의 특성이지 PAN 프로토콜의 요구 사항이 아닙니다.

<div align="center"><em>표: SF32 제품군별 PAN 지원</em></div>

<div align="center" markdown>

| 제품군 | Bluetooth 기능 | PAN 지원 |
|:-------|:----------------------|:-------------|
| SF32LB52x | 듀얼 모드 Bluetooth | 예 |
| SF32LB55x | BLE 전용 | 아니요 — PAN에는 Classic Bluetooth가 필요 |
| SF32LB56x | 듀얼 모드 Bluetooth | 예 |
| SF32LB57x | 듀얼 모드 Bluetooth | PAN 스택과 타깃 보드를 확인할 것. 고정된 v2.5.1 PAN 예제에는 나열되어 있지 않음 |
| SF32LB58x | 듀얼 모드 Bluetooth | 예 |

</div>

더 넓은 범위의 BLE 대 듀얼 모드 디바이스 선택 가이드는 [Bluetooth 개요](overview.md#choose-ble-classic-or-dual-mode)를 참조하십시오.

## SiFli-SDK의 PAN 예제 { #sifli-sdks-pan-example }

SiFli-SDK는 `example/bt/pan`에 동작하는 PANU 구현을 제공하며, `eh-lb52x`, `eh-lb56x`, `eh-lb58x` 및 `sf32lb52/56/58-lcd` 보드 시리즈에서 지원됩니다. 이 예제는 휴대폰의 PAN(NAP) 서비스에 연결한 다음 Finsh 셸 명령으로 실제 네트워크 사용을 시연하며, 여기에는 수립된 PAN 링크를 통해 현재 날씨 정보를 가져오는 `weather` 명령이 포함됩니다. README 스크린샷에는 `id`, `name`, `country`, `path`, `timezone`, `timezone_offset`, `txt`, `code`, `temperature`, `last_update`를 담은 날씨 서비스 응답이 나와 있으며, 그 샘플은 Chongqing (CN), Asia/Shanghai (+08:00), `多云`(중국어로 "흐림"; 코드 `4`), 온도 `10`, 갱신 시각 `2025-01-13T15:54:09+08:00`입니다. 이는 PAN/BNEP 프레이밍이 아니라 애플리케이션 수준의 값이며 달라질 수 있습니다.

시작 시 예제는 Bluetooth inquiry scan과 page scan을 활성화하여, 휴대폰이 기본 Bluetooth 이름 `sifli_pan`으로 디바이스를 검색하고 페어링할 수 있게 합니다.

HTTPS는 [v2.5.1 PAN README](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md)의 인증서 설정을 따르십시오. 기본 CA 인증서는 `external/mbedtls_228/certs/default`에 있으며, 추가로 필요한 CA 인증서는 `external/mbedtls_228/certs`에 두십시오. 인증서는 DER이 아니라 PEM이어야 합니다. 파일 확장자에 의존하지 말고 내용에 `-----BEGIN CERTIFICATE-----`가 있는지 확인하십시오. `proj.conf`에서 `PKG_USING_MBEDTLS_USER_CERTS`를 활성화하면, 빌드가 해당 디렉터리의 파일을 `ports/src/tls_certificate.c`로 결합합니다. 실제 서버에 맞는 신뢰 앵커를 검토하십시오. PAN 연결에 성공했다고 해서 TLS 인증서 검증이 이루어진 것은 아닙니다. 서버 신원을 확인하고, 인증서 유효성 검사에 시간이 필요한 경우에는 디바이스 시간도 확인하십시오.

README는 이 패키지 디렉터리를 `mbedtls_288`로 표기하지만, README의 스크린샷과 [v2.5.1 인증서 생성 구현](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/external/mbedtls_228/SConscript)은 `mbedtls_228`을 사용합니다. 위의 경로는 구현을 따른 것입니다. 구현은 첫 줄이 `-----BEGIN CERTIFICATE`로 시작할 때에만 인증서 내용을 받아들이므로, 인증서를 그 형식으로 유지하고 건너뛴 파일이 있는지 빌드 경고를 확인하십시오.

<div align="center"><em>표: PAN 예제 Finsh 명령</em></div>

<div align="center" markdown>

| 명령 | 효과 |
|:--------|:-------|
| `pan_cmd conn_pan` | 휴대폰의 네트워크 공유를 활성화한 뒤 PAN에 연결합니다. |
| `pan_cmd ota_pan` | `main.c`에 지정된 펌웨어 이미지를 PAN 링크를 통해 다운로드하고 설치합니다. |
| `pan_cmd set_retry_flag 1` / `0` | PAN 자동 재연결을 활성화하거나 비활성화합니다. |
| `pan_cmd set_retry_time N` | 자동 연결 재시도 횟수의 최대값을 설정합니다. |
| `pan_cmd autoconnect` | 휴대폰의 연결이 끊어진 뒤 공유를 다시 활성화했을 때 재연결 시도를 수동으로 트리거합니다. |

</div>

예제를 실행하기 전에, 고정된 README와 타깃에 맞춰 다음 설정을 확인하십시오.

- `CONFIG_BLUETOOTH`, `CONFIG_BT_PROFILE_CUSTOMIZE`, `CONFIG_CFG_PAN`, `CONFIG_BSP_BT_CONNECTION_MANAGER`를 활성화하십시오. 이 예제는 PAN만으로 연결할 때 문서화된 iOS 문제를 우회하기 위해 A2DP도 활성화합니다. A2DP는 PAN 프로토콜의 요구 사항이 아닙니다.
- `CONFIG_BT_FINSH`는 선택 사항인 Bluetooth 제어 명령을 활성화합니다. 테스트하려는 명령에 필요한 셸 기능을 유지하십시오.
- `CONFIG_BSP_BLE_NVDS_SYNC`는 Bluetooth가 실행되는 위치에 따라 설정하십시오. README는 HCPU에서는 이를 활성화하고 LCPU에서는 비활성화합니다. 다른 프로세서 할당의 구성을 그대로 복사하지 마십시오.
- 마지막 디바이스에 재연결하려면 `CONFIG_BT_AUTO_CONNECT_LAST_DEVICE`와 `CONFIG_PKG_USING_FLASHDB`를 확인하십시오. 재부팅 후에도 값이 유지되는지 검증하고, 무기한 재시도하지 말고 위의 재시도 제어를 사용하여 재연결 시도를 제한하십시오.

## 휴대폰 OS 지원과 인증 { #mobile-phone-os-support-and-qualification }

휴대폰은 PAN **NAP**이며 제품 네트워크 경로의 일부입니다. 단순한 프로비저닝 도구가 아닙니다. 휴대폰의 운영체제, 기종, 요금제, 테더링 정책을 지원 제품 구성으로 취급하십시오. Bluetooth 페어링이 성공하는 것만으로는 충분하지 않습니다. PANU가 연결된 뒤 휴대폰이 Bluetooth 테더링/PAN 서비스를 제공하고 트래픽을 라우팅해야 합니다.

<div align="center"><em>표: Bluetooth PAN의 휴대폰 OS 지원</em></div>

<div align="center" markdown>

| 모바일 OS | 플랫폼이 문서화한 내용 | SF32 브링업 가이드 | 제품 인증 경계 |
|:----------|:----------------------------|:-----------------------|:-------------------------------|
| **셀룰러 서비스를 사용하는 iOS / iPadOS** | [Apple Personal Hotspot 문서](https://support.apple.com/guide/iphone/share-your-internet-connection-iph45447ca6/27/ios/27)는 Bluetooth를 연결 방법으로 문서화하고 있으며, Personal Hotspot이 휴대폰의 셀룰러 인터넷 연결을 공유한다고 설명합니다. | [SiFli Xiaozhi iOS 경로](https://docs.sifli.com/projects/xiaozhi/get-started/)를 따르십시오. 셀룰러 서비스가 활성화된 휴대폰을 사용하고, 페어링 전에 Personal Hotspot을 활성화하고, Bluetooth를 켜 두고, SF32 디바이스와 페어링/연결하십시오. `sifli-pan`이 보이지 않으면 휴대폰을 재시작하면 도움이 될 수 있다고 SiFli 가이드는 설명합니다. | Personal Hotspot 사용 가능 여부, 데이터 한도, 연결할 수 있는 디바이스 수는 통신사와 iPhone 기종에 따라 달라집니다. 지원하는 모든 iOS/iPadOS 릴리스, 기종 등급, 통신사 요금제를 테스트하십시오. Wi-Fi 핫스팟 동작만으로 지원 여부를 추론하지 마십시오. |
| **Android** | [Android 도움말](https://support.google.com/android/answer/9059108)은 대부분의 Android 휴대폰이 Bluetooth로 모바일 데이터를 공유할 수 있다고 설명합니다. 먼저 페어링하고, 다른 디바이스의 Bluetooth 네트워크 연결을 구성한 다음, **Bluetooth 테더링**을 활성화합니다. | `pan_cmd conn_pan`을 실행하기 전에 Bluetooth 테더링을 활성화하십시오. 설정 이름과 메뉴 위치는 제조사, Android 릴리스, 기업 정책에 따라 다릅니다. 인증한 각 휴대폰에서 사용한 정확한 경로를 기록하십시오. | Google은 이 기능이 모든 Android 휴대폰이 아니라 *대부분의* 휴대폰에서 사용할 수 있다고 설명합니다. 통신사가 테더링을 제한하거나 요금을 부과할 수 있고, 제조사가 해당 제어를 숨기거나 변경할 수 있습니다. Android 버전만 믿지 말고 출하할 기종/OS/통신사 조합을 테스트하십시오. |
| **HarmonyOS 및 기타 Android 파생 모바일 시스템** | 이 가이드에는 이들 시스템에 대한 플랫폼 전반의 PAN 지원 주장이 없습니다. 이들의 Bluetooth 및 테더링 구현은 Android에서 파생되었더라도 모델, 시장, 릴리스, 통신사 구성, 디바이스 관리 정책에 따라 다를 수 있습니다. | Bluetooth 테더링 제어를 찾고, 휴대폰과 SF32 디바이스를 페어링한 다음, PAN 예제로 실제 IP 트래픽을 확인하십시오. | 정확한 기종, OS 빌드, 지역, 통신사가 Android에 사용한 것과 동일한 검증 기록을 통과할 때까지 **인증 필요**로 취급하십시오. 브랜드나 Bluetooth 페어링만으로 지원을 홍보하지 마십시오. |

</div>

### 휴대폰 측 설정 { #phone-side-setup }

<div align="center"><em>그림: iOS Personal Hotspot 및 Android Bluetooth 테더링 스위치 위치(설명용)</em></div>

![iOS Personal Hotspot 및 Android Bluetooth 테더링 설정(설명용)](assets/mobile-hotspot-switches-illustrative.png)

이는 설명을 위한 설정 레퍼런스이며, 실제 운영체제 스크린샷이 아닙니다. 문구와 메뉴 위치는 iOS/iPadOS 버전, Android 제조사, 휴대폰 관리 정책에 따라 다릅니다. iOS/iPadOS에서는 **Allow Others to Join**을, Android에서는 **Bluetooth tethering**을 찾으십시오. [SiFli v2.5.1 iOS 스크린샷](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md)에는 **Maximize Compatibility**도 활성화되어 있습니다. 이는 PAN 요구 사항이 아니라 예시 휴대폰 설정으로 취급하십시오. 필요하다고 가정하지 말고 각 대상 디바이스에서 확인하십시오.

테스트하는 각 휴대폰에 대해 다음 순서를 사용하십시오.

1. 휴대폰의 업스트림 연결을 확인하십시오. Apple의 Personal Hotspot은 셀룰러 데이터를 공유하므로, 통신사가 테더링을 허용하는지 확인하십시오. 일부 Android 휴대폰은 Wi-Fi 연결도 공유할 수 있지만, 정확한 기종과 OS 빌드에서 그 기능을 확인하십시오.
2. SF32 디바이스에서 PAN을 요청하기 **전에** 휴대폰의 Bluetooth 테더링 또는 Personal Hotspot 기능을 활성화하십시오.
3. 휴대폰과 디바이스를 페어링하고, OS에서 요구하는 경우 휴대폰을 검색 가능 상태로 유지하십시오.
4. `pan_cmd conn_pan`을 실행한 다음, Bluetooth 연결 성공만이 아니라 예제의 `weather` 명령과 같은 IP 트랜잭션이 이루어지는지 확인하십시오.
5. 공유를 비활성화하고, 휴대폰을 슬립/웨이크하고, 휴대폰을 범위 밖으로 옮기십시오. 제품이 의도한 재연결 동작이 작동하는지 확인하십시오.

Bluetooth 연결이 이미 수립된 뒤에 공유를 활성화했다면, `pan_cmd conn_pan`으로 PAN을 명시적으로 재연결하십시오.

### 출하용 휴대폰 지원 매트릭스 정의 { #define-a-shipping-phone-support-matrix }

소비자 제품이라면 단순히 "iOS" 또는 "Android"가 아니라 지원하는 **휴대폰 기종 + OS 버전 + 통신사/지역** 조합을 공개하십시오. 각 후보에 대해 최소한 다음을 기록하십시오. 휴대폰 기종, OS 빌드, 통신사, 활성화된 셀룰러 서비스, SIM/eSIM 상태, 테더링 설정 이름, 최초 연결 시간, 화면 잠금 및 무선 연결 끊김 후의 재연결 동작, 지속 트래픽 결과, 서비스를 복원하기 위해 사용자가 해야 하는 동작. 앱, PAN 펌웨어, 휴대폰 OS, 통신사 프로파일이 변경될 때마다 이 매트릭스를 다시 실행하십시오.

## PAN 기반 OTA 전달 { #pan-based-ota-delivery }

PAN 예제는 OTA가 기본으로 활성화된 상태로 제공됩니다. `pan_cmd ota_pan`은 이미 네트워크 트래픽에 사용 중인 동일한 Bluetooth PAN 링크를 통해 펌웨어 이미지를 다운로드하고 설치하며, SiFli-SDK의 펌웨어 업그레이드 서비스와 함께 문서화된 DFU_PAN OTA 경로를 사용합니다. 이미 데이터에 PAN을 사용하고 있어 두 번째 OTA 전송 수단을 원하지 않는 제품에 적합합니다. PAN이 BLE 및 다른 업데이트 전송 수단과 어떻게 다른지는 [OTA와 DFU](../../develop/firmware-topics/ota-dfu.md)를 참조하고, 전송 수단에 관계없이 롤백/복구 동작을 같은 방식으로 계획하십시오.

README는 선택한 타깃에 적합한 OTA `ptab.json`이 없을 때 발생하는 별도의 빌드 실패를 명시합니다. README의 스크린샷은 OTA가 아닌 예제를 테스트하기 위해 DFU 서브프로젝트와 미들웨어 펌웨어 업데이트 지원을 비활성화하는 방법을 보여 줍니다. 이 진단은 OTA를 제거하는 것이며, 업데이트가 필요한 제품을 출하하는 방법이 아닙니다. OTA 경로를 활성화하기 전에 올바른 파티션 레이아웃과 업데이트 구성을 제공하고 검증하십시오.

PAN은 전송을 제공할 뿐, 펌웨어의 진위나 복구를 보장하지 않습니다. 릴리스 전에 서버 인증, 이미지 진위 및 무결성, 타깃/버전 호환성, 중단 후 복구를 검증하십시오. 연결 끊김과 전원 손실을 모두 시험하고, 다운로드 명령이 복구나 롤백을 제공한다고 가정하지 말고 부트로더의 실제 복구 또는 롤백 동작을 확인하십시오.

## PAN을 사용하는 실제 SF32 제품 { #a-real-sf32-product-using-pan }

[SF32 Xiaozhi 음성 어시스턴트](../../projects/sf32-xiaozhi.md) 프로젝트는 SF32에서 PAN을 사용하는 구체적이고 동작하는 예입니다. 이 프로젝트는 Bluetooth PAN으로 페어링된 휴대폰을 통해 인터넷에 접속하고, 그 연결을 통해 클라우드 서비스로 음성 상호작용을 스트리밍합니다. 완제품이 PAN 네트워킹, WebSocket/HTTP 애플리케이션 트래픽, 휴대폰 테더링 의존성을 종단 간에 어떻게 연결하는지 보여 주는 유용한 레퍼런스입니다.

## 문제 해결 { #troubleshooting }

README는 Bluetooth 주소 할당도 진단 항목으로 제시합니다. `nvds get_mac`으로 주소를 확인하십시오. 조직에 할당되었거나 제품에 사용할 권한이 있는 OUI만 사용하고, 디바이스마다 고유한 주소를 할당하십시오. 샘플에 있는 다른 벤더의 OUI를 복사하지 마십시오. `nvds update addr 6 xxxxxxYYYYYY`에서 `YYYYYY`는 바이트 순서가 뒤집힌 OUI이고, `xxxxxx`는 나머지 세 주소 바이트를 나타냅니다. 표시용 MAC 주소를 그대로 붙여 넣지 말고 해당 명령의 바이트 순서 규칙을 따르십시오.

`CONFIG_NVDS_AUTO_UPDATE_MAC_ADDRESS`는 수동으로 변경한 주소를 덮어쓸 수 있습니다. 허가된 테스트 주소가 유지되지 않으면, README는 해당 설정을 비활성화하고 다시 빌드하여 플래시에 기록한 뒤 주소를 다시 설정할 것을 권장합니다. 이는 테스트용 진단이며 양산용 주소 할당 정책이 아닙니다. 릴리스 전에 의도한 자동 또는 공장 프로그래밍 정책이 재부팅 후에도 유지되는지 검증하십시오.

<div align="center"><em>표: Bluetooth PAN 문제 해결</em></div>

<div align="center" markdown>

| 증상 | 점검 및 조치 |
|:--------|:--------------|
| PAN은 연결되지만 네트워크 명령(예: `weather`)이 실패함 | BNEP 수립, 할당된 IP 주소, 라우트, DNS, 엔드포인트 가용성, 해당하는 경우 TLS 오류를 확인하십시오. README는 `nvds get_mac`으로 Bluetooth MAC OUI를 확인할 것도 권장합니다. `nvds update addr 6 ...`로 변경하는 것은 허가된 할당 정책 하에서만 하십시오. 잘못된 OUI가 유일한 원인은 아닙니다. |
| 휴대폰이 디바이스를 보지 못하거나 연결되지 않음 | 연결하기 *전에* 휴대폰의 테더링/네트워크 공유가 활성화되어 있는지, 그리고 디바이스가 검색 가능한 상태(inquiry/page scan 활성)인지 확인하십시오. |
| 휴대폰은 페어링되지만 `weather` 또는 다른 IP 작업이 실패함 | 페어링은 PAN NAP 서비스가 있음을 입증하지 않습니다. Bluetooth 테더링/Personal Hotspot이 활성화되어 있고 업스트림 연결이 동작하는지 확인하십시오. 셀룰러 백홀의 경우 통신사의 허용 여부를 확인하고, Android Wi-Fi 공유의 경우 해당 기종/OS의 지원 여부를 확인하십시오. 테스트한 조합을 지원 매트릭스와 대조하십시오. |
| 휴대폰 측 네트워크 상태가 변경된 후 PAN이 끊김 | 발생할 수 있는 현상이므로 지원하는 각 휴대폰에서 이 동작을 인증하십시오. `pan_cmd conn_pan`으로 재연결하거나 `pan_cmd set_retry_flag 1`을 활성화하고, 위의 재시도 한도로 자동 시도를 제한하십시오. |
| PAN을 통한 OTA가 도중에 실패함 | PAN 자체에 원인이 있다고 가정하지 말고 다른 OTA 전송 수단과 똑같이 취급하십시오. [OTA와 DFU](../../develop/firmware-topics/ota-dfu.md)에 따라 이미지 URL, 파티션 레이아웃, 롤백 동작을 확인하십시오. |

</div>

## 브링업 체크리스트 { #bring-up-checklist }

- [ ] 정확한 SDK와 보드에 대해 Classic Bluetooth 하드웨어와 PAN 스택/구성을 확인하십시오. 참조한 예제는 SF32LB52x/56x/58x를 나열하며, SF32LB57x는 별도로 인증하십시오. SF32LB55x는 BLE 전용입니다.
- [ ] PAN의 휴대폰 테더링 의존성이 제품의 연결 모델에 맞는지, 아니면 전용 Wi-Fi 라디오가 실제로 필요한지 결정하십시오.
- [ ] 타깃 보드에서 `example/bt/pan`을 브링업하고 휴대폰 측 테더링 설정(iOS/iPadOS Personal Hotspot 또는 Android Bluetooth 테더링)을 확인하십시오.
- [ ] 실제 PAN 연결과 최소 하나의 네트워크 작업(예: 예제의 `weather` 명령)을 종단 간으로 검증하십시오.
- [ ] 의도한 모든 휴대폰 기종, OS 빌드, 지역/통신사 요금제, 테더링 설정 경로를 인증하십시오. 일반적인 "iOS/Android 지원" 주장으로 출하하지 마십시오.
- [ ] 네트워크 기능에 의존하기 전에 디바이스의 Bluetooth MAC OUI가 유효한지 확인하십시오.
- [ ] PAN을 OTA에 사용하는 경우, 출하 전에 롤백 동작을 포함하여 `pan_cmd ota_pan` 경로 전체를 테스트하십시오.
- [ ] 제품이 휴대폰이 범위 안에 있을 것으로 예상하는 빈도에 맞춰 재연결/자동 연결 동작(`set_retry_flag`, `set_retry_time`)을 설계하십시오.

## 핵심 요약 { #key-takeaways }

- Bluetooth PAN은 L2CAP 위의 BNEP를 사용하여 BR/EDR로 IP/이더넷 방식의 트래픽을 전달합니다. BLE 지원은 필요하지 않습니다. BLE를 통한 IPv6는 PAN이 아니라 별도의 IPSP 프로파일을 사용하며, 검증된 스택과 게이트웨이 지원이 필요합니다.
- SF32 디바이스는 클라이언트 **PANU** 역할을 사용하며, 보통 테더링/Personal Hotspot 기능을 통해 **NAP**으로 동작하는 휴대폰에 연결합니다.
- iOS에서 BLE 액세서리는 MFi 없이 Core Bluetooth를 사용할 수 있지만, External Accessory/iAP를 통한 커스텀 앱-액세서리 Bluetooth Classic 데이터 채널은 MFi 경로입니다. 반면 PAN은 휴대폰의 테더링 서비스를 사용하므로 SF32 디바이스가 BLE 앱 릴레이 대신 자체 IP 클라이언트를 사용할 수 있습니다.
- 참조한 PAN 예제는 SF32LB52x/56x/58x 타깃을 나열합니다. SF32LB57x는 듀얼 모드 하드웨어를 갖추었지만 PAN 스택과 보드를 별도로 검증해야 하며, SF32LB55x는 BLE 전용이므로 PAN을 실행할 수 없습니다.
- SiFli-SDK의 `example/bt/pan`은 연결, 재연결, PAN 기반 OTA 전달을 위한 Finsh 명령을 포함하는, 동작하는 레퍼런스 구현입니다.
- 휴대폰 테더링 PAN은 휴대폰이 보통 근처에 있을 때 가끔 발생하거나 보통 수준인 IP 트래픽에 적합합니다. 지속적인 고처리량이나 휴대폰에 의존하지 않는 동작이 필요하다면 전용 Wi-Fi 또는 다른 독립 네트워크 경로를 평가하십시오. 휴대폰이 아닌 NAP 게이트웨이도 가능합니다.
