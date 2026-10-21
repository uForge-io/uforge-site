---
icon: lucide/usb
description: "SF32 USB 하드웨어를 CherryUSB와 함께 사용하는 방법입니다. CDC, HID, MSC, 오디오, MTP 사용 사례, 디스크립터 체크리스트, 여러 OS에서의 열거 테스트를 다룹니다."
tags:
    - 개발
    - USB
---

# USB와 CherryUSB { #usb-and-cherryusb }

USB 하드웨어를 지원하는 SF32 디바이스와 보드의 경우, SiFli-SDK 문서와 예제에서 CherryUSB 통합을 보여 줍니다. 정확한 칩, 보드, SDK 릴리스에서 지원하는 USB 역할과 클래스를 확인하고, USB를 단순한 하드웨어 기능이 아니라 완전한 소프트웨어 스택으로 취급하십시오.

USB 통합에는 펌웨어, 디스크립터, 호스트 운영 체제, 전원 동작, 양산 도구가 모두 관련됩니다. 개발용 노트북에서 한 번 열거에 성공했다고 제품 통합이 끝난 것은 아닙니다.

## 사용 사례 { #use-cases }

- USB CDC 시리얼.
- HID 디바이스.
- MSC 스토리지.
- USB 오디오 마이크/스피커.
- MTP.
- SDK와 보드가 지원하는 경우, CDC, HID, MSC, UVC, UAC 주변 장치를 위한 USB 호스트 지원.

## 실무 워크플로 { #practical-workflow }

1. 보드가 필요한 USB 커넥터와 전원 경로를 제공하는지 확인합니다.
2. 가장 가까운 SDK USB 예제에서 시작합니다.
3. Windows, macOS, Linux에서 열거를 테스트합니다.
4. 서스펜드/재개와 케이블 재연결 동작을 검증합니다.
5. VID/PID, 디스크립터, 드라이버 요구 사항을 기록합니다.

## 테스트 항목 { #what-to-test }

- 전원 인가 전 연결, 디바이스 동작 중 연결 및 분리.
- 연결된 상태에서의 리셋.
- 호스트 절전 진입 및 복귀.
- 전송 중 케이블 분리.
- Windows, macOS, Linux 열거.
- 여러 클래스를 활성화한 경우 복합 디바이스 동작.
- 충전 전용 USB 케이블은 데이터 통신을 지원하지 않는다는 점을 사용자에게 안내합니다.

## 디스크립터 체크리스트 { #descriptor-checklist }

- VID/PID 소유권이 명확합니다.
- 제품 문자열이 최종 확정되었거나 버전이 관리됩니다.
- 시리얼 번호 동작이 정의되어 있습니다.
- 클래스/서브클래스/프로토콜 값이 의도한 호스트 드라이버와 일치합니다.
- 복합 인터페이스가 펌웨어 업데이트 후에도 안정적입니다.

## SDK 예제 { #sdk-examples }

[공식 SiFli-SDK CherryUSB 예제 색인](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/index.html)은 USB 디바이스 작업과 USB 호스트 작업을 구분합니다. 의도한 USB 역할과 클래스에 맞는 예제에서 시작하고, 해당 예제의 디스크립터, 전원, 호스트 호환성 점검 사항을 제품 구현으로 가져오십시오.

<div align="center"><em>표: SF32LB58x용 SiFli-SDK CherryUSB 예제</em></div>
<div align="center" markdown>

| USB 역할 | 예제 | 시작점 |
| --- | --- | --- |
| 디바이스 | [USB 마이크](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic/README.html) | USB Audio Class 1 마이크 |
| 디바이스 | [USB 마이크 및 스피커](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic_speaker/README.html) | USB Audio Class 1 양방향 오디오 |
| 디바이스 | [CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm/README.html) | USB 통신 디바이스 |
| 디바이스 | [CDC ACM UART](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm_uart/README.html) | USB-UART 브리지 |
| 디바이스 | [CDC + HID + MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_hid_msc/README.html) | 복합 USB 디바이스 |
| 디바이스 | [HID 마우스](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/hid_mouse/README.html) | USB HID 포인팅 디바이스 |
| 디바이스 | [NOR 플래시 기반 MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/nor_flash_disk/README.html) | NOR 플래시를 기반으로 하는 대용량 스토리지 |
| 디바이스 | [RAM 디스크 기반 MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk/README.html) | RAM을 기반으로 하는 대용량 스토리지 |
| 디바이스 | [듀얼 RAM 디스크 기반 MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk_dual/README.html) | RAM을 기반으로 하는 두 개의 논리 유닛 |
| 디바이스 | [SD/eMMC 기반 MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/sdcard_disk/README.html) | SD 카드 또는 eMMC를 기반으로 하는 대용량 스토리지 |
| 디바이스 | [DFS 및 RAM 디스크 기반 MTP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/mtp/README.html) | Media Transfer Protocol 디바이스 |
| 호스트 | [CDC ACM 호스트](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/cdc_acm_host/README.html) | CDC ACM 주변 장치와 통신 |
| 호스트 | [HID 호스트](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/hid/README.html) | HID 주변 장치를 연결하고 읽기 |
| 호스트 | [MSC 호스트](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/msc_host/README.html) | USB 대용량 스토리지 주변 장치 연결 |
| 호스트 | [UVC + UAC 호스트](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/uvc_uac_host/README.html) | USB 비디오 및 오디오 클래스 주변 장치 |

</div>
