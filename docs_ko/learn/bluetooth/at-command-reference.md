---
icon: lucide/list
description: "SF32LB57 듀얼 모드 Bluetooth 모듈(SIFLI_AT)의 AT 명령 레퍼런스: 프레임, 페어링, 연결, 데이터 전송, GATT, URC, PDU 명령."
tags:
  - Bluetooth
---

# AT 명령 세트 { #at-command-reference }

<div align="center"><em>표: 문서 정보</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 버전 | V1.2.1 |
| 날짜 | 2026-07-28 |
| 적용 모듈 | SF32LB57 듀얼 모드 Bluetooth 모듈(SIFLI_AT) |

</div>

이 레퍼런스는 SF32LB57 듀얼 모드 Bluetooth 모듈(SIFLI_AT) V1.2.1 버전의 외부 AT 명령 인터페이스를 설명합니다. 명령과 응답 문자열은 고정폭 글꼴로 표기하며, `\r`은 캐리지 리턴(0x0D)을, `\n`은 라인 피드(0x0A)를 나타냅니다. AT 명령은 ASCII 텍스트로 전송되고, PDU 프레임의 바이너리 필드는 리틀 엔디언 바이트 순서를 사용합니다.

이 문서는 Bluetooth AT 명령 모듈 페이지에서 참조하는 전체 AT 인터페이스 사양입니다.

<div align="center"><em>표: 개정 이력</em></div>

<div align="center" markdown>

| 버전 | 변경 사항 | 날짜 |
|:--------|:--------|:-----|
| V1.2.1 | SF32LB57 V1.2.1: `AT+CFGRESET` 추가, 부팅 시 Classic Bluetooth 이름 동기화, `CLEARLINKKEY`, 연결 핸들 및 PDU 문서 갱신, BQB 빌드 구성 활성화. | 2026-07-28 |

</div>

## 개요

SF32LB57 듀얼 모드 Bluetooth 모듈은 호스트에 BLE와 Classic Bluetooth(BR/EDR)를 모두 지원하는 UART 기반 AT 명령 인터페이스를 제공합니다. 호스트는 AT 명령으로 디바이스 매개변수를 설정하고, 연결을 관리하고, 데이터를 송수신하며, 모듈이 보내는 비요청 상태 표시를 수신합니다.

### 기본 설정 { #default-settings }

<div align="center"><em>표: 기본 설정</em></div>

<div align="center" markdown>

| 항목 | 기본값 |
|:-----|:----------------|
| 디바이스 이름 | `SIFLI_AT` |
| 시리얼 보레이트 | 460800 bps |
| 명령/패스스루 모드 | 패스스루 모드 |
| Bluetooth 동작 모드 | 듀얼 모드(BLE+BT) |
| 이벤트 보고 | 일반 보고 |
| MAC 접미사 이름 | 끔 |
| Class of Device(COD) | `000000` |
| BLE MTU 상한 | 247 |
| 다중 연결 마스터 스위치 | 켬(1) |
| 패스스루 유휴 연결 해제 시간 | 0(끔) |
| 전원 투입 시 GATT 자동 로드 | 켬 |
| BLE 랜덤 주소 | 끔(공개 주소 사용) |
| Bluetooth 주소 | 칩 UID에서 자동 생성 |

</div>

## 명령 형식 { #command-format }

### 구문 정의

AT 명령은 ASCII 텍스트로 전송되며 캐리지 리턴 `\r`(0x0D)으로 끝납니다. 명령 접두사는 `AT+`(AT 형식 명령) 또는 `AT>`(PDU 형식 명령)입니다. SF32LB57에서 AT 포트는 USART1이며, 하드웨어 흐름 제어 없이 8N1 프레이밍을 사용하고 기본 보레이트는 460800 bps입니다. AT 프레임 하나는 512바이트로 제한됩니다.

### AT 형식 명령

<div align="center"><em>표: AT 형식 명령 형태</em></div>

<div align="center" markdown>

| 형태 | 명령 | 설명 |
|:-----|:--------|:-------------|
| 조회 | `AT+<CMD>?\r` | 매개변수 또는 상태를 읽습니다 |
| 설정 | `AT+<CMD>=<param>[,<param>...]\r` | 매개변수를 기록합니다 |
| 실행 | `AT+<CMD>\r` | 동작을 트리거합니다 |

</div>

<div align="center"><em>표: AT 형식 응답</em></div>

<div align="center" markdown>

| 결과 | 응답 문자열 |
|:-------|:------------------|
| 성공 | `\r\nOK\r\n` |
| 실패 | `\r\nERROR\r\n` 또는 `\r\nFALSE\r\n` |
| 조회 반환값 | `\r\n+<CMD>:<value>\r\n\r\nOK\r\n` |

</div>

### PDU 형식 명령 프레임 구조

PDU 명령은 모듈이 명령 모드에 있는 동안 바이너리 페이로드를 전송합니다. 별도의 언급이 없으면 프레임 내 숫자 필드는 리틀 엔디언이며, `data`는 원시 바이너리 데이터입니다.

**명령(호스트 → 모듈)**

```
'A' 'T' '>' <Opcode(2 bytes)> <Total Length(2 bytes)> [Body] '\r'
```

<div align="center"><em>표: PDU 명령 프레임 구조</em></div>

<div align="center" markdown>

| 요소 | 설명 |
|:--------|:-------------|
| `AT>` | 명령 접두사, 3바이트 ASCII |
| Opcode | 2바이트 리틀 엔디언 동작 코드. `0x0101`, `0x0102` |
| Total Length | Body의 전체 바이트 수, 2바이트 리틀 엔디언 |
| Body | 페이로드. 구조는 Opcode에 따라 달라집니다 |
| `\r` | 1바이트 명령 종결자 |

</div>

**보고(모듈 → 호스트)**

```
'\r' '\n' '<' <Opcode(2 bytes)> <Total Length(2 bytes)> [Data] '\r' '\n'
```

## 명령과 응답 { #commands-and-responses }

아래 명령은 기능별로 분류되어 있으며, 분류는 Bluetooth AT 명령 모듈 페이지의 색인 표에 사용된 분류와 같습니다.

### 시스템 및 디바이스

#### 펌웨어 버전 조회

<div align="center"><em>표: 펌웨어 버전 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GFWVER?\r` |
| 응답 | 성공: `\r\n+GFWVER:SIFLI_AT_<version>_<build date>\r\n\r\nOK\r\n`, 모든 설정 형태: `\r\nERROR\r\n` |
| 매개변수 | 없음 |
| 비고 | 조회 전용입니다. 반환값은 항상 `SIFLI_AT_`로 시작하며, 이어서 버전 번호와 빌드 날짜가 옵니다. |

</div>

#### 디바이스 이름 조회

<div align="center"><em>표: 디바이스 이름 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+NAME?\r` |
| 응답 | `\r\n+NAME:<device name>\r\n\r\nOK\r\n` |
| 매개변수 | 없음 |
| 비고 | 현재 설정된 디바이스 이름을 반환합니다(MAC 접미사는 제외하며, MAC 접미사는 광고에 표시되는 이름에만 영향을 줍니다). |

</div>

#### 디바이스 이름 설정

<div align="center"><em>표: 디바이스 이름 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+NAME=<device name>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | 디바이스 이름: 길이 1~29바이트의 문자열이며, 비어 있거나 29바이트를 초과하면 `ERROR`를 반환합니다. 기본값은 `SIFLI_AT`입니다. |
| 비고 | 디바이스 이름 설정을 갱신하고 로컬 이름 및 BLE 스캔 응답 이름에 동기화합니다. 최종 광고 이름은 `MACNAME`이 제어합니다. |

</div>

#### MAC 이름 접미사 스위치 조회

<div align="center"><em>표: MAC 이름 접미사 스위치 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+MACNAME?\r` |
| 응답 | `\r\n+MACNAME:<value>\r\n\r\nOK\r\n` |
| 매개변수 | 없음 |
| 비고 | 현재 접미사 스위치 상태를 반환합니다. 0 = 끔, 1 = 켬. |

</div>

#### MAC 이름 접미사 스위치 설정

<div align="center"><em>표: MAC 이름 접미사 스위치 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+MACNAME=<value>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | 값: 0 = 표시 이름이 디바이스 이름 그대로입니다. 1 = 디바이스 이름에 `-XXXX` 접미사를 덧붙입니다(XXXX는 로컬 BD_ADDR 마지막 2바이트의 대문자 16진수). 범위 0~1. 기본값 0. |
| 비고 | 설정을 갱신합니다. 켜져 있을 때 디바이스 이름에 접미사를 더한 길이가 표시 이름 제한인 29바이트를 초과하면, 5바이트 접미사가 들어가도록 디바이스 이름 부분이 잘립니다. |

</div>

#### IEEE 1284 디바이스 ID 조회

<div align="center"><em>표: IEEE 1284 디바이스 ID 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+1284ID?\r` |
| 응답 | `\r\n+1284ID:<ID string>\r\n\r\nOK\r\n` |
| 매개변수 | 없음 |
| 비고 | 현재 설정된 IEEE 1284 디바이스 ID 문자열을 반환하며, 설정되지 않았으면 비어 있습니다. |

</div>

#### IEEE 1284 디바이스 ID 설정

<div align="center"><em>표: IEEE 1284 디바이스 ID 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+1284ID=<ID string>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | ID 문자열: IEEE 1284 디바이스 ID 문자열이며, 길이가 저장 버퍼 용량보다 작아야 합니다. 길이를 초과하면 `ERROR`를 반환합니다. 기본값은 빈 문자열입니다. |
| 비고 | 설정을 갱신합니다. |

</div>

#### 디바이스 리셋

<div align="center"><em>표: 디바이스 리셋</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+RESET\r` |
| 응답 | 성공: `\r\nOK\r\n`, 조회 형태(`AT+RESET?\r`): `\r\nERROR\r\n` |
| 매개변수 | 없음 |
| 비고 | 명령을 수신하면 모듈은 현재 AT 설정을 저장하고 `OK`로 응답한 다음, 광고를 중지하고 연결을 끊은 뒤 소프트 리셋을 수행합니다. 이 명령 자체는 설정을 변경하지 않습니다. |

</div>

#### 공장 초기화

<div align="center"><em>표: 공장 초기화</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+FACTORYRESET\r` |
| 응답 | 성공: `\r\nOK\r\n`, 조회 형태(`AT+FACTORYRESET?\r`): `\r\nERROR\r\n` |
| 매개변수 | 없음 |
| 비고 | AT 설정을 기본값으로 복원하고, 커스텀 GATT 서비스 설정, BLE 본딩, Classic Bluetooth(BR/EDR) 페어링 본드, BLE 정적 랜덤 주소를 삭제한 다음 `OK`로 응답하고 리셋합니다. 호스트는 리셋 후 `IM_READY`를 기다려야 합니다. |

</div>

#### 설정 리셋

<div align="center"><em>표: 설정 리셋</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+CFGRESET\r` |
| 응답 | 성공: `\r\nOK\r\n`, 조회 형태(`AT+CFGRESET?\r`): `\r\nERROR\r\n` |
| 매개변수 | 없음 |
| 비고 | AT 설정과 저장된 커스텀 GATT 설정을 복원한 다음 `OK`로 응답하고 리셋합니다. 페어링 기록과 현재 BLE 주소는 유지됩니다. |

</div>

#### OTA 업그레이드 모드 진입 { #enter-ota-upgrade-mode }

<div align="center"><em>표: OTA 업그레이드 모드 진입</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+OTA\r` |
| 응답 | 성공: `\r\nOK\r\n`(이후 DFU 모드로 진입하고 리셋하며 추가 응답은 없음), 조회 형태(`AT+OTA?\r`): `\r\nERROR\r\n` |
| 매개변수 | 없음 |
| 비고 | 먼저 현재 AT 설정을 저장하고 `OK`로 응답한 다음, DFU 플래그를 기록하고 리셋하여 UART DFU 업그레이드 모드로 진입합니다. |

</div>

#### 주파수 오프셋 캘리브레이션 조회

<div align="center"><em>표: 주파수 오프셋 캘리브레이션 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+TRIM?\r` |
| 응답 | `\r\n+TRIM:<freq_off>\r\n\r\nOK\r\n` |
| 매개변수 | `freq_off`: 현재 기록된 주파수 오프셋 캘리브레이션 값이며 단위는 Hz입니다. |
| 비고 | AT 설정에 기록된 에코 값을 반환하며, 실제로 적용 중인 값은 `FACTORY_CFG_ID_CRYSTAL` 파티션에 저장되어 있습니다. |

</div>

#### 주파수 오프셋 캘리브레이션 설정

<div align="center"><em>표: 주파수 오프셋 캘리브레이션 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+TRIM=<freq_off>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 범위를 벗어난 값 또는 캘리브레이션 인터페이스 실패: `\r\nERROR\r\n` |
| 매개변수 | `freq_off`: 주파수 오프셋 캘리브레이션 값이며 단위는 Hz, 범위는 -120000~120000, 기본값은 0입니다. 값이 0이면 캘리브레이션 리셋을 수행하고(하드웨어/공장 라인의 원래 값으로 복원), 0이 아니면 해당 값을 그대로 설정합니다. |
| 비고 | 값을 설정하면 HXT 커패시터 뱅크 레지스터가 갱신되고 그 결과가 `FACTORY_CFG_ID_CRYSTAL` 파티션에 기록됩니다. 캘리브레이션이 성공하면 AT 설정에 기록된 값이 갱신되고 저장 대상으로 표시됩니다. |

</div>

#### DUT 테스트 모드 진입

<div align="center"><em>표: DUT 테스트 모드 진입</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+DUT\r` |
| 응답 | 성공: `\r\nOK\r\n`, 조회 형태(`AT+DUT?\r`): `\r\nERROR\r\n` |
| 매개변수 | 없음 |
| 비고 | BR/EDR Classic Bluetooth DUT 활성화 비트를 설정하고 `OK`로 응답한 다음, 테스트 장비가 `LMP_test_control`을 통해 무선으로 시그널링 테스트를 트리거하기를 기다립니다. AT UART(USART1)는 계속 사용할 수 있습니다. DUT 모드 진입은 되돌릴 수 없으며, 리셋해야만 빠져나올 수 있습니다. |

</div>

### 주소 및 식별 정보

#### Bluetooth 주소 조회

<div align="center"><em>표: Bluetooth 주소 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+LBDADDR?\r` |
| 응답 | 성공: `\r\n+LBDADDR:<addr>\r\n\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `addr`: 현재 공개 Bluetooth 주소를 반환하며, 16진수 12자(대문자, 구분자 없음)이고 최상위 바이트가 먼저 옵니다. 예: `001583112233`. |
| 비고 | 펌웨어에서 읽은 공개 주소를 반환하며, 읽기에 실패하면 `ERROR`를 반환합니다. |

</div>

#### Bluetooth 주소 설정

<div align="center"><em>표: Bluetooth 주소 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+LBDADDR=<addr>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `addr`: 설정할 Bluetooth 주소이며, 16진수 12자(구분자 없음)여야 하고 최상위 바이트가 먼저 옵니다. 예: `001583112233`. 길이는 정확히 16진수 12자여야 합니다. |
| 비고 | 주소는 설정에 기록되고 저장됩니다. 리셋 후에 적용됩니다. 공장 기본값은 모두 0이며, 이는 주소가 칩 UID에서 자동 생성된다는 뜻입니다. |

</div>

#### BLE 주소 조회

<div align="center"><em>표: BLE 주소 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+BLEADDR?\r` |
| 응답 | 성공: `\r\n+BLEADDR:<addr>\r\n\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `addr`: BLE가 현재 사용하는 주소를 반환하며, 16진수 12자(대문자, 구분자 없음)이고 최상위 바이트가 먼저 옵니다. |
| 비고 | `AT+RANDOMADDR=1`로 BLE 전용 정적 랜덤 주소를 생성했다면 그 정적 랜덤 주소를 반환하고, 그렇지 않으면 Bluetooth 주소와 같은 공개 주소를 반환합니다. 읽기에 실패하면 `ERROR`를 반환합니다. |

</div>

#### BLE 주소 설정

<div align="center"><em>표: BLE 주소 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+BLEADDR=<addr>\r` |
| 응답 | `\r\nERROR\r\n` |
| 매개변수 | 없음 |
| 비고 | 이 명령은 BLE 주소를 직접 설정하는 것을 지원하지 않으며, 호출하면 항상 `ERROR`를 반환합니다. BLE 정적 랜덤 주소는 `AT+RANDOMADDR=1`로 생성합니다. |

</div>

#### BLE 랜덤 주소 스위치 조회

<div align="center"><em>표: BLE 랜덤 주소 스위치 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+RANDOMADDR?\r` |
| 응답 | `\r\n+RANDOMADDR:<n>\r\n\r\nOK\r\n` |
| 매개변수 | `n`: 현재 스위치 상태이며, 0 = BLE가 공개 주소를 사용, 1 = BLE가 정적 랜덤 주소를 사용합니다. |
| 비고 | 없음 |

</div>

#### BLE 랜덤 주소 스위치 설정

<div align="center"><em>표: BLE 랜덤 주소 스위치 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+RANDOMADDR=<n>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `n`: 0 또는 1. 1 = 공개 주소에서 파생된 BLE 정적 랜덤 주소를 활성화합니다(공개 주소 최상위 바이트의 상위 2비트를 1로 설정하며, 예를 들어 공개 주소 `001583112233`에서 BLE 주소 `C01583112233`이 파생됩니다). 0 = BLE가 공개 주소로 되돌아갑니다. 다른 값이나 추가 문자는 `ERROR`를 반환합니다. 기본값 0. |
| 비고 | 스위치 상태가 구성에 반영됩니다. 1로 설정했는데 공개 주소 읽기에 실패하면 스위치는 0으로 되돌아가고 `ERROR`를 반환합니다. 주소 변경은 NVDS에 기록되며 리셋 후에 적용됩니다. `AT+RANDOMADDR=1`을 다시 실행하면 (변하지 않은) 공개 주소에서 같은 랜덤 주소가 다시 파생됩니다. |

</div>

#### Class of Device 조회

<div align="center"><em>표: Class of Device 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+CLASS?\r` |
| 응답 | 성공: `\r\n+CLASS:<cod>\r\n\r\nOK\r\n`(`<cod>`는 대문자 16진수 6자리) |
| 매개변수 | `cod`: 현재 Class of Device이며, 항상 16진수 6자리(하위 24비트, `%06X` 형식, 0으로 채움)로 출력됩니다 |
| 비고 | 현재 Class of Device 값을 반환합니다. |

</div>

#### Class of Device 설정

<div align="center"><em>표: Class of Device 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+CLASS=<cod>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `cod`: Class of Device이며 16진수 문자열입니다(`%X`로 파싱). 범위 0~FFFFFF(24비트). 기본값 `000000`. |
| 비고 | Class of Device 값을 설정하고 구성을 갱신하며, 파싱할 때 하위 24비트만 유지됩니다. |

</div>

### 동작 모드 및 가시성

#### 검색 가능 상태 조회

<div align="center"><em>표: 검색 가능 상태 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+DISCOVERABLE?\r` |
| 응답 | 성공: `\r\n+DISCOVERABLE:<state>\r\n\r\nOK\r\n` |
| 매개변수 | `state`: 현재 검색 가능 상태입니다. 0 = 검색 불가, 1 = 검색 가능, 2 = 부분적으로 검색 가능(혼합 상태). 의미는 동작 모드에 따라 달라집니다. BLE 모드(`BTMODE=1`)에서는 BLE 광고 설정을 반영하여 1 = 켬, 0 = 끔입니다. BT 모드(`BTMODE=2`)에서는 inquiry scan과 page scan을 반영하여 둘 다 켜져 있으면 1, 둘 다 꺼져 있으면 0, 그 외에는 2입니다. 듀얼 모드(`BTMODE=0`)에서는 BLE 광고, inquiry scan, page scan이 모두 켜져 있으면 1, 모두 꺼져 있으면 0, 그 외에는 2입니다. |
| 비고 | 현재 검색 가능 상태만 조회하며 디바이스 상태를 변경하지 않습니다. |

</div>

#### 검색 가능 상태 설정

<div align="center"><em>표: 검색 가능 상태 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+DISCOVERABLE=<mode>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `mode`: 0 = 검색 가능 기능 끔, 1 = 검색 가능 기능 켬. |
| 비고 | 현재 동작 모드에 따라 동작합니다. BLE 모드(`BTMODE=1`)에서는 BLE 광고를 켜거나 끕니다. BT 모드(`BTMODE=2`)에서는 inquiry scan과 page scan을 켜거나 끕니다. 듀얼 모드(`BTMODE=0`)에서는 BLE 광고, inquiry scan, page scan을 함께 제어합니다. |

</div>

#### GATT 광고 상태 조회

<div align="center"><em>표: GATT 광고 상태 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTDISCOVER?\r` |
| 응답 | 성공: `\r\n+GATTDISCOVER:<state>\r\n\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `state`: 실제 무선상의 BLE 광고 상태입니다. 0 = 광고 중 아님, 1 = 광고 중. |
| 비고 | 실제 온에어 BLE 광고 상태를 반환합니다. 동작 모드가 BT 전용(`BTMODE=2`)이면 사용할 수 없으며 `ERROR`를 반환합니다. |

</div>

#### GATT 광고 설정

<div align="center"><em>표: GATT 광고 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTDISCOVER=<value>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `value`: 0 = BLE 광고 중지, 1 = BLE 광고 시작. |
| 비고 | BLE 광고의 시작과 중지를 직접 제어합니다. 동작 모드가 BT 전용(`BTMODE=2`)이면 사용할 수 없습니다. |

</div>

#### SPP 검색 가능 상태 조회

<div align="center"><em>표: SPP 검색 가능 상태 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+SPPDISCOVER?\r` |
| 응답 | `\r\n+SPPDISCOVER:<state>\r\n\r\nOK\r\n` |
| 매개변수 | `<state>`: 검색 가능 여부를 제어하는 현재 inquiry scan 상태입니다. 0 = 끔, 1 = 켬. |
| 비고 | `AT+BTMODE`가 1(BLE 전용)이면 `ERROR`를 반환합니다. |

</div>

#### SPP 검색 가능 상태 설정

<div align="center"><em>표: SPP 검색 가능 상태 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+SPPDISCOVER=<state>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `<state>`: 검색 가능 여부를 제어하는 inquiry scan 스위치입니다. 0 = 끔, 1 = 켬. |
| 비고 | `AT+BTMODE`가 1(BLE 전용)이면 `ERROR`를 반환합니다. inquiry scan 비트만 변경하며 page scan 비트는 그대로 둡니다. |

</div>

#### SPP 연결 가능 상태 조회

<div align="center"><em>표: SPP 연결 가능 상태 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+SPPCONNECT?\r` |
| 응답 | `\r\n+SPPCONNECT:<state>\r\n\r\nOK\r\n` |
| 매개변수 | `<state>`: 연결 가능 여부를 제어하는 현재 page scan 상태입니다. 0 = 끔, 1 = 켬. |
| 비고 | `AT+BTMODE`가 1(BLE 전용)이면 `ERROR`를 반환합니다. |

</div>

#### SPP 연결 가능 상태 설정

<div align="center"><em>표: SPP 연결 가능 상태 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+SPPCONNECT=<state>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `<state>`: 연결 가능 여부를 제어하는 page scan 스위치입니다. 0 = 끔, 1 = 켬. |
| 비고 | `AT+BTMODE`가 1(BLE 전용)이면 `ERROR`를 반환합니다. page scan 비트만 변경하며 inquiry scan 비트는 그대로 둡니다. |

</div>

#### Bluetooth 동작 모드 조회

<div align="center"><em>표: Bluetooth 동작 모드 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+BTMODE?\r` |
| 응답 | `\r\n+BTMODE:<mode>\r\n\r\nOK\r\n` |
| 매개변수 | `mode`: 현재 Bluetooth 동작 모드입니다. 0 = 듀얼 모드(BLE+BT), 1 = BLE 전용, 2 = BT 전용. |
| 비고 | 없음 |

</div>

#### Bluetooth 동작 모드 설정

<div align="center"><em>표: Bluetooth 동작 모드 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+BTMODE=<mode>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `mode`: Bluetooth 동작 모드입니다. 0 = 듀얼 모드(BLE+BT), 1 = BLE 전용, 2 = BT 전용. 범위 0~2. 기본값 0(듀얼 모드). |
| 비고 | 설정 변경이 구성에 반영되며 리셋 후에 적용됩니다. |

</div>

#### 명령 모드 조회

<div align="center"><em>표: 명령 모드 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+COMMAND?\r` |
| 응답 | `\r\n+COMMAND:<mode>\r\n\r\nOK\r\n` |
| 매개변수 | `mode`: 현재 동작 모드입니다. 0 = 패스스루 모드, 1 = 명령 모드. |
| 비고 | 없음 |

</div>

#### 명령 모드 설정

<div align="center"><em>표: 명령 모드 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+COMMAND=<mode>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `mode`: 동작 모드입니다. 0 = 패스스루 모드, 1 = 명령 모드. 모듈은 전원을 켠 후 패스스루 모드로 시작합니다. |
| 비고 | 즉시 적용되며 영구 저장되지 않아, 리셋하면 패스스루 모드로 돌아갑니다. 패스스루 모드에서는 시리얼 포트로 수신한 데이터가 연결된 상대에게 그대로 전달되고, 명령 모드에서는 시리얼 데이터가 AT 명령으로 파싱됩니다. |

</div>

### 페어링 및 보안

#### 페어링 정보 삭제

<div align="center"><em>표: 페어링 정보 삭제</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+CLEARLINKKEY\r` |
| 응답 | 성공: `\r\nOK\r\n`, 조회 형태 `AT+CLEARLINKKEY?\r`: `\r\nERROR\r\n` |
| 매개변수 | 매개변수 없음. |
| 비고 | BLE 본딩 정보와 Classic Bluetooth 링크 키를 삭제합니다. 성공하면 디바이스가 리셋되며, 디바이스 이름, 보레이트, COD 같은 AT 설정은 유지됩니다. 호스트는 리셋 후 `IM_READY`를 기다려야 합니다. 조회 형태는 지원되지 않습니다. |

</div>

### 시리얼 포트 및 이벤트

#### 시리얼 보레이트 조회

<div align="center"><em>표: 시리얼 보레이트 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+BAUD?\r` |
| 응답 | `\r\n+BAUD:<baud_rate>\r\n\r\nOK\r\n` |
| 매개변수 | `baud_rate`: 현재 설정된 보레이트이며 단위는 bps입니다. |
| 비고 | 보레이트를 설정하면 디바이스가 리셋되며, 새 보레이트는 리셋 후에 적용됩니다. |

</div>

#### 시리얼 보레이트 설정

<div align="center"><em>표: 시리얼 보레이트 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+BAUD=<baud_rate>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `baud_rate`: 시리얼 보레이트이며 단위는 bps입니다. 지원 값: 38400, 57600, 115200, 230400, 460800, 921600, 1000000. 기본값 460800. |
| 비고 | 설정 변경이 구성에 반영됩니다. |

</div>

#### 이벤트 보고 스위치 조회

<div align="center"><em>표: 이벤트 보고 스위치 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+EVT?\r` |
| 응답 | `\r\n+EVT:<evt_silent>\r\n\r\nOK\r\n` |
| 매개변수 | `evt_silent`: 현재 이벤트 보고 상태입니다. 0 = 일반 보고, 1 = 완전 무음. |
| 비고 | 없음 |

</div>

#### 이벤트 보고 스위치 설정

<div align="center"><em>표: 이벤트 보고 스위치 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+EVT=<evt_silent>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `evt_silent`: 이벤트 보고 스위치입니다. 0 = `IM_CONN`/`IM_DISCONN`/`IM_READY` 등의 이벤트를 정상적으로 보고, 1 = 모두 무음 처리(보고하지 않음). 기본값 0(일반 보고). |
| 비고 | 설정 변경이 구성에 반영됩니다. 1로 설정하면 연결 설정, 연결 해제, 준비 완료 이벤트가 시리얼 포트로 출력되지 않습니다. |

</div>

#### 패스스루 유휴 연결 해제 시간 조회

<div align="center"><em>표: 패스스루 유휴 연결 해제 시간 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+IDLE?\r` |
| 응답 | `\r\n+IDLE:<idle_ms>\r\n\r\nOK\r\n` |
| 매개변수 | `idle_ms`: 현재 유휴 연결 해제 타임아웃이며 단위는 밀리초입니다. |
| 비고 | 없음 |

</div>

#### 패스스루 유휴 연결 해제 시간 설정

<div align="center"><em>표: 패스스루 유휴 연결 해제 시간 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+IDLE=<idle_ms>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `idle_ms`: 패스스루 유휴 연결 해제 타임아웃이며 단위는 밀리초, 범위는 0~65535입니다. 65535를 초과하면 `ERROR`를 반환합니다. 0은 유휴 연결 해제 기능을 끕니다. 기본값 0(끔). |
| 비고 | 설정 변경이 구성에 반영됩니다. 패스스루 모드에서만 적용됩니다. 패스스루 모드에서 시리얼 포트가 마지막으로 데이터를 수신한 뒤 `idle_ms` 밀리초를 초과해 경과하면 모든 연결(있는 경우)이 해제되며, `idle_ms` = 0이면 이 동작이 발생하지 않습니다. |

</div>

### 연결 관리

#### 다중 연결 스위치 조회

<div align="center"><em>표: 다중 연결 스위치 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+MULTICONN?\r` |
| 응답 | `\r\n+MULTICONN:<n>\r\n\r\nOK\r\n` |
| 매개변수 | `<n>`: 다중 연결 마스터 스위치 상태입니다. 0 = 끔(전체적으로 단일 연결), 1 = 켬(동시 연결, 각 전송 방식의 한도까지). |
| 비고 | 없음 |

</div>

#### 다중 연결 스위치 설정

<div align="center"><em>표: 다중 연결 스위치 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+MULTICONN=<n>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `<n>`: 0 = 다중 연결 비활성화, 1 = 다중 연결 활성화. 값은 0 또는 1입니다. 기본값 1. |
| 비고 | 설정 변경이 구성에 반영됩니다. 다중 연결이 꺼져 있으면 동시 연결 기능이 제한되고, 켜져 있으면 `AT+BLEMULTICONN` 및 `AT+BTMULTICONN` 설정에 따라 동작합니다. |

</div>

#### BLE 최대 동시 연결 수 조회

<div align="center"><em>표: BLE 최대 동시 연결 수 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+BLEMULTICONN?\r` |
| 응답 | 성공: `\r\n+BLEMULTICONN:<n>\r\n\r\nOK\r\n`, 다중 연결이 꺼져 있을 때: `\r\nERROR\r\n` |
| 매개변수 | `<n>`: 현재 설정된 BLE 최대 동시 연결 수이며 10진수입니다. |
| 비고 | 다중 연결 스위치가 켜져 있을 때(`AT+MULTICONN=1`)만 조회할 수 있으며, 꺼져 있으면 `ERROR`를 반환합니다. |

</div>

#### BLE 최대 동시 연결 수 설정

<div align="center"><em>표: BLE 최대 동시 연결 수 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+BLEMULTICONN=<n>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `<n>`: BLE 최대 동시 연결 수이며 10진수, 범위 1~6입니다. 기본값 3. |
| 비고 | 다중 연결 스위치가 켜져 있을 때(`AT+MULTICONN=1`)만 설정할 수 있습니다. 설정 변경이 구성에 반영됩니다. 연결 수가 한도에 도달하면 광고가 중지되어(더 이상 연결할 수 없음), 링크가 끊어져 연결 수가 한도 아래로 내려가면 자동으로 재개됩니다. |

</div>

#### Classic Bluetooth 최대 동시 연결 수 조회

<div align="center"><em>표: Classic Bluetooth 최대 동시 연결 수 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+BTMULTICONN?\r` |
| 응답 | 성공: `\r\n+BTMULTICONN:<n>\r\n\r\nOK\r\n`, 다중 연결이 꺼져 있을 때: `\r\nERROR\r\n` |
| 매개변수 | `<n>`: 현재 설정된 Classic Bluetooth(BR/EDR) 최대 동시 연결 수이며 10진수입니다. |
| 비고 | 다중 연결 스위치가 켜져 있을 때(`AT+MULTICONN=1`)만 조회할 수 있으며, 꺼져 있으면 `ERROR`를 반환합니다. |

</div>

#### Classic Bluetooth 최대 동시 연결 수 설정

<div align="center"><em>표: Classic Bluetooth 최대 동시 연결 수 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+BTMULTICONN=<n>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `<n>`: Classic Bluetooth 최대 동시 연결 수이며 10진수, 범위 1~7입니다. 기본값 7. |
| 비고 | 다중 연결 스위치가 켜져 있을 때(`AT+MULTICONN=1`)만 설정할 수 있습니다. 설정 변경이 구성에 반영됩니다. 연결 수가 한도에 도달하면 모듈은 page scan을 중지하고, 연결 수가 한도 아래로 내려가면 자동으로 재개합니다. |

</div>

#### 연결 해제

<div align="center"><em>표: 연결 해제</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | 하나 해제: `AT+DISCONN=<conn_hdl>\r`, 전체 해제: `AT+DISCONN\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패 또는 찾을 수 없음: `\r\nERROR\r\n` |
| 매개변수 | `<conn_hdl>`: 연결 핸들이며 16진수입니다. BLE 연결 핸들은 1부터 시작하는 외부 핸들(`AT+CONNLIST`가 반환하는 값과 일치)이고, BT 연결은 ACL 핸들을 사용합니다. `<conn_hdl>` = 0은 잘못된 입력으로 간주되어 `ERROR`를 반환합니다. |
| 비고 | 매개변수가 없거나 비어 있으면 활성 링크(BLE 및 BR/EDR) 전체를 해제하고 `OK`를 반환합니다. 매개변수가 있으면 핸들을 조회합니다. 먼저 BLE 외부 핸들과 대조하고(내부 핸들 = `<conn_hdl>` - 1), 찾지 못하면 원시 BT ACL 핸들과 대조하며, 일치하는 연결이 없으면 `ERROR`를 반환합니다. 조회 형태 `AT+DISCONN?`는 `ERROR`를 반환합니다. |

</div>

#### 연결 목록 조회

<div align="center"><em>표: 연결 목록 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+CONNLIST?\r` 또는 `AT+CONNLIST\r` |
| 응답 | 활성 연결마다 한 줄로 출력됩니다: `\r\n+CONNLIST:<conn_hdl>,<type>,<addr>,<extra>\r\n`. 모든 줄 뒤에 `\r\nOK\r\n`이 따라오며, 활성 연결이 없으면 `\r\nOK\r\n`만 출력됩니다. 비어 있지 않은 매개변수가 있으면 `\r\nERROR\r\n` |
| 매개변수 | 출력 필드: `<conn_hdl>` — 연결 핸들, 16진수 4자리이며 BLE는 1부터 시작하는 외부 핸들을 사용합니다. `<type>` — 연결 유형, BLE 또는 BT. `<addr>` — 상대방의 Bluetooth 주소, 16진수 12자리(최상위 바이트가 먼저). `<extra>` — BLE 연결은 현재 MTU, BT 연결은 서비스 채널이며 10진수입니다. |
| 비고 | 설정 형태에서 비어 있지 않은 매개변수를 지정하면 `ERROR`를 반환합니다. 모듈은 모든 연결 슬롯을 확인하여 활성 연결을 각각 출력합니다. |

</div>

### 데이터 전송

#### BLE MTU 조회

<div align="center"><em>표: BLE MTU 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GMTU?\r` |
| 응답 | 성공: `\r\n+GMTU:<mtu>\r\n\r\nOK\r\n` |
| 매개변수 | `mtu`: 현재 설정된 BLE MTU 상한이며 10진수입니다. |
| 비고 | 없음 |

</div>

#### BLE MTU 설정

<div align="center"><em>표: BLE MTU 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GMTU=<mtu>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nFALSE\r\n` |
| 매개변수 | `mtu`: BLE MTU 상한이며 10진수, 범위 23~1024입니다. 범위를 벗어나면 `FALSE`를 반환합니다. 기본값 247. |
| 비고 | 이 값은 MTU 협상 중에 사용되는 상한을 설정합니다. |

</div>

#### SPP 데이터 전송

<div align="center"><em>표: SPP 데이터 전송</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+SPPSEND=<conn_hdl>,<data>\r` 또는 `AT+SPPSEND=,<data>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `conn_hdl`: 대상 BT 연결 핸들이며 16진수입니다. 생략하거나 0으로 설정할 수 있으며, 이 경우 현재 첫 번째 활성 BT 연결이 사용됩니다. `data`: 전송할 데이터이며 16진수 문자열이고, 두 문자가 1바이트를 나타냅니다. 비어 있을 수 없으며 문자 수는 짝수여야 합니다. ASCII AT 프레임으로 전달할 수 있는 실제 데이터 길이는 AT 프레임 하나의 제한에도 영향을 받습니다. |
| 비고 | `conn_hdl`과 `data`는 쉼표로 구분하며, `conn_hdl`을 생략하더라도 쉼표는 반드시 있어야 합니다. 조회 형태는 지원되지 않습니다. |

</div>

### 커스텀 GATT

#### 커스텀 GATT 서비스 목록 조회

<div align="center"><em>표: 커스텀 GATT 서비스 목록 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTSRV?\r` |
| 응답 | 설정된 서비스마다 한 줄 `\r\n+GATTSRV:<idx>,<char_count>,<state>\r\n`을 반환하고, 이어서 `\r\nOK\r\n`을 반환합니다. 설정된 서비스가 없으면 `\r\nOK\r\n`만 반환합니다 |
| 매개변수 | `idx`: 서비스 슬롯 번호, 0~5. `char_count`: 해당 서비스에 설정된 특성(characteristic)의 수. `state`: `REG`는 프로토콜 스택에 등록됨을, `CFG`는 RAM에만 설정되어 있고 아직 등록되지 않았음을 의미합니다 |
| 비고 | 현재 사용 중인 서비스 슬롯만 나열합니다 |

</div>

#### 커스텀 GATT 서비스 생성

<div align="center"><em>표: 커스텀 GATT 서비스 생성</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTSRV=<idx>,<uuid>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `idx`: 서비스 슬롯 번호, 0~5. `uuid`: 서비스 UUID이며 MSB가 먼저 오는 16진수 문자열로 입력합니다. 16비트 UUID는 4자, 128비트 UUID는 32자입니다 |
| 비고 | `idx`는 한 자리 숫자여야 하며 바로 뒤에 쉼표가 와야 합니다. UUID 길이는 정확히 4자 또는 32자여야 하며, 다른 길이는 `ERROR`를 반환합니다. 슬롯이 이미 프로토콜 스택에 등록되어 있으면 다시 설정할 수 없으며 생성은 `ERROR`를 반환합니다. 서비스를 생성하면 해당 슬롯의 이전 설정이 지워집니다 |

</div>

#### 커스텀 GATT 서비스 삭제

<div align="center"><em>표: 커스텀 GATT 서비스 삭제</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTSRV=<idx>,DEL\r` |
| 응답 | `\r\nOK\r\n` |
| 매개변수 | `idx`: 서비스 슬롯 번호, 0~5 |
| 비고 | 해당 슬롯의 RAM 설정을 지웁니다. 이미 프로토콜 스택에 등록된 서비스는 런타임에 철회할 수 없으며, 이 명령은 RAM 설정만 지웁니다 |

</div>

#### 커스텀 GATT 특성 목록 조회

<div align="center"><em>표: 커스텀 GATT 특성 목록 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTCHAR?<svc>\r` |
| 응답 | 해당 서비스의 특성마다 한 줄 `\r\n+GATTCHAR:<svc>,<chr>,prop=0x<prop>,len=<max_len>\r\n`을 반환하고, 이어서 `\r\nOK\r\n`을 반환합니다. 서비스가 존재하지 않으면 `\r\nERROR\r\n` |
| 매개변수 | `svc`: 서비스 슬롯 번호, 0~5. `chr`: 특성 인덱스. `prop`: 특성의 속성 비트이며 16진수. `max_len`: 특성 값의 최대 길이 |
| 비고 | 없음 |

</div>

#### 커스텀 GATT 특성 추가

<div align="center"><em>표: 커스텀 GATT 특성 추가</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTCHAR=<svc>,<chr>,<uuid>,<prop>,<len>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `svc`: 서비스 슬롯 번호, 0~5. `chr`: 특성 인덱스, 0~7. `uuid`: 특성 UUID이며 MSB가 먼저 오고, 16비트는 4자, 128비트는 32자입니다. `prop`: R(읽기), W(응답 있는 쓰기), w(응답 없는 쓰기), N(notify), I(indicate) 문자로 구성된 속성 문자열. `len`: 특성 값의 최대 길이, 1~512 |
| 비고 | 다섯 매개변수가 모두 필수이며, 하나라도 생략하면 `ERROR`를 반환합니다. UUID 길이는 정확히 4자 또는 32자여야 합니다. `prop`에는 인식되는 속성 문자가 하나 이상 있어야 하며, 인식되는 문자가 없으면 `ERROR`를 반환합니다. `prop` 안의 인식되지 않는 문자는 그냥 무시됩니다. `len`이 0이거나 512를 초과하면 `ERROR`를 반환합니다. 상위 서비스는 이미 생성되어 있어야 하며 아직 프로토콜 스택에 등록되지 않은 상태여야 합니다 |

</div>

#### 커스텀 GATT 서비스 시작(등록)

<div align="center"><em>표: 커스텀 GATT 서비스 시작(등록)</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTSTART\r` |
| 응답 | `\r\n+GATTSTART:<count>\r\n`에 이어 `\r\nOK\r\n`, 조회 형태 `AT+GATTSTART?\r`: `\r\nERROR\r\n` |
| 매개변수 | `count`: 이번 호출에서 프로토콜 스택에 성공적으로 등록된 서비스의 수 |
| 비고 | 사용 중이고, 아직 등록되지 않았으며, 특성이 하나 이상 있는 모든 서비스를 프로토콜 스택에 등록합니다. 등록된 서비스는 런타임에 더 이상 철회하거나 다시 설정할 수 없습니다. 조회 형태는 지원되지 않습니다 |

</div>

#### GATT 특성 데이터 전송(Notify/Indicate)

<div align="center"><em>표: GATT 특성 데이터 전송(Notify/Indicate)</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTSEND=<svc>,<chr>,<conn_hdl>,<hex>\r`, 연결 핸들 생략: `AT+GATTSEND=<svc>,<chr>,,<hex>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n`, 조회 형태 `AT+GATTSEND?\r`: `\r\nERROR\r\n` |
| 매개변수 | `svc`: 서비스 슬롯 번호. `chr`: 특성 인덱스. `conn_hdl`: BLE 연결 핸들이며 16진수, 1부터 시작하고 생략할 수 있습니다. `hex`: 전송할 데이터이며 문자 수가 짝수인 16진수 문자열입니다. ASCII AT 프레임으로 전달할 수 있는 실제 데이터 길이는 AT 프레임 하나의 제한에도 영향을 받습니다. |
| 비고 | `conn_hdl`을 생략하면 현재 첫 번째 BLE 연결이 사용됩니다. 대상 서비스는 이미 등록되어 있어야 하고 특성 인덱스가 유효해야 합니다. 특성의 속성에 Indicate(I)가 포함되어 있으면 indication을 사용하고, 그렇지 않으면 notification을 사용합니다. |

</div>

#### 커스텀 GATT 설정을 플래시에 저장

<div align="center"><em>표: 커스텀 GATT 설정을 플래시에 저장</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTSTORE\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n`, 조회 형태 `AT+GATTSTORE?\r`: `\r\nERROR\r\n` |
| 매개변수 | 없음 |
| 비고 | 모든 서비스와 특성의 현재 설정을 플래시에 영구 저장합니다. 설정 데이터만 저장되며 등록 상태 같은 런타임 정보는 저장되지 않습니다. KVDB가 준비되지 않았거나 쓰기에 실패하면 `ERROR`를 반환합니다. 조회 형태는 지원되지 않습니다 |

</div>

#### 플래시의 커스텀 GATT 설정 삭제

<div align="center"><em>표: 플래시의 커스텀 GATT 설정 삭제</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTCLEAR\r` |
| 응답 | 성공: `\r\nOK\r\n`, 조회 형태 `AT+GATTCLEAR?\r`: `\r\nERROR\r\n` |
| 매개변수 | 없음 |
| 비고 | 플래시에 저장된 GATT 설정을 삭제합니다. RAM의 현재 설정에는 영향을 주지 않습니다. 조회 형태는 지원되지 않습니다. |

</div>

#### 전원 투입 시 GATT 자동 로드 스위치 조회

<div align="center"><em>표: 전원 투입 시 GATT 자동 로드 스위치 조회</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTAUTOSTART?\r` |
| 응답 | `\r\n+GATTAUTOSTART:<v>\r\n\r\nOK\r\n` |
| 매개변수 | `v`: 현재 스위치 값, 0 = 끔, 1 = 켬. 기본값: 1. |
| 비고 | 없음 |

</div>

#### 전원 투입 시 GATT 자동 로드 스위치 설정

<div align="center"><em>표: 전원 투입 시 GATT 자동 로드 스위치 설정</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+GATTAUTOSTART=<v>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `v`: 스위치 값. 0 = 끔, 1 = 켬. 기본값: 1. |
| 비고 | 설정 변경이 구성에 반영됩니다. 활성화하면 디바이스가 전원을 켤 때 저장된 GATT 서비스 설정을 자동으로 로드합니다. |

</div>

## 비요청 이벤트(URC)

아래는 모듈이 스스로 보고하는 상태 표시이며, 호스트가 명령을 보내지 않아도 수신됩니다. 보고 여부는 이벤트 보고 스위치(`AT+EVT`)가 제어하며, 무음 모드가 켜져 있는 동안에는 아무것도 보고되지 않습니다.

### IM_READY 준비 완료 표시

<div align="center"><em>표: IM_READY 준비 완료 표시</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | 없음(펌웨어가 스스로 보고하며 사용자가 보내지 않음) |
| 응답 | 보고 문자열: `\r\nIM_READY\r\n` |
| 매개변수 | 없음 |
| 비고 | 모듈이 초기화를 마치고 사용 가능한 상태가 되면 한 번 보고되며, 모든 연결이 끊어져 연결 수가 0으로 돌아왔을 때도 다시 보고됩니다. 보고 여부는 `AT+EVT`가 제어하며, `AT+EVT=1`로 설정하면 보고되지 않습니다. |

</div>

### IM_CONN 연결 표시

<div align="center"><em>표: IM_CONN 연결 표시</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | 없음(연결이 설정되면 펌웨어가 스스로 보고) |
| 응답 | 명령 모드: `\r\nIM_CONN <hdl>,<addr>,<mtu>\r\n`, 패스스루 모드: `\r\nIM_CONN\r\n` |
| 매개변수 | `hdl`: 연결 핸들, 16진수 4자리(대문자, 4자리 고정, 0으로 채움). BLE 연결은 1부터 시작하는 핸들(내부 핸들에 1을 더한 값)을 표시하고, 다른 유형은 원시 값을 표시합니다. `addr`: 상대방의 주소, 16진수 12자리, MSB가 먼저. `mtu`: 현재 연결의 MTU, 10진수. |
| 비고 | 명령 모드에서는 연결이 설정될 때마다 핸들, 상대방 주소, MTU와 함께 한 번씩 보고됩니다. 패스스루 모드에서는 연결 수가 1일 때(첫 번째 연결)만 보고되며 매개변수는 없습니다. 보고 여부는 `AT+EVT`가 제어하며, `AT+EVT=1`로 설정하면 보고되지 않습니다. |

</div>

### IM_DISCONN 연결 해제 표시

<div align="center"><em>표: IM_DISCONN 연결 해제 표시</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | 없음(연결이 끊어지면 펌웨어가 스스로 보고) |
| 응답 | 명령 모드: `\r\nIM_DISCONN:<hdl>\r\n` |
| 매개변수 | `hdl`: 해제된 연결의 핸들, 16진수 4자리(대문자, 4자리 고정, 0으로 채움). BLE 연결은 1부터 시작하는 핸들(원시 핸들에 1을 더한 값)을 표시하고, 나머지는 원시 값을 표시합니다. |
| 비고 | 핸들만 포함하며 명령 모드에서만 보고되고, 패스스루 모드에서는 보고되지 않습니다. 모드와 관계없이 모든 연결이 끊어져 연결 수가 0으로 돌아오면 `\r\nIM_READY\r\n`이 추가로 보고됩니다. 보고 여부는 `AT+EVT`가 제어하며, `AT+EVT=1`로 설정하면 보고되지 않습니다. |

</div>

## PDU 형식 명령 { #pdu-format-commands }

### PDU 데이터 보고(opcode 0x0101)

<div align="center"><em>표: PDU 데이터 보고(모듈 → 호스트, opcode 0x0101)</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | 없음(명령 모드에서 펌웨어가 스스로 보고) |
| 응답 | `\r\n< + opcode(2-byte little-endian) + len(2-byte little-endian) + body + \r\n` |
| 매개변수 | `opcode`는 `0x0101`로 고정입니다. `body` = `conn_hdl`(2바이트 리틀 엔디언) + `data`. BLE 연결 핸들은 1부터 시작하는 외부 값을 사용하고, SPP 연결은 원시 ACL 핸들을 사용합니다. |
| 비고 | 명령 모드에서 커스텀 BLE 특성에 데이터가 기록되거나 Classic Bluetooth SPP로 데이터를 수신하면, 모듈은 위 형식으로 호스트에 보고합니다. 패스스루 모드에서는 데이터가 그대로 출력됩니다. |

</div>

### PDU 모드 데이터 전송(Notify 특성 자동 선택, opcode 0x0101)

<div align="center"><em>표: PDU 모드 데이터 전송(Notify 특성 자동 선택, opcode 0x0101)</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | 바이너리 프레임(텍스트 AT 라인이 아님): `AT>` + opcode(2바이트 리틀 엔디언) + len(2바이트 리틀 엔디언) + body + `\r`. 여기서 opcode = `0x0101`(바이트 순서 01 01), len은 body의 바이트 수, body = `conn_hdl`(2바이트 리틀 엔디언) + `data`입니다. `data`는 전송할 페이로드입니다. |
| 응답 | 텍스트 응답 문자열이 없습니다. 펌웨어는 `OK`/`ERROR`로 응답하지 않고 연결 유형에 따라 `data`를 상대방에게 전달합니다. |
| 매개변수 | `opcode`: `0x0101`로 고정. `len`: body 길이, 범위 2~508(2 미만이거나 `AT_RX_BUF_SIZE`-4를 초과하는 프레임은 폐기되며, `AT_RX_BUF_SIZE` = 512). `conn_hdl`: 대상 연결 핸들이며, BLE 연결은 1부터 시작(외부 표시 값), SPP 연결은 원시 ACL 핸들입니다. `data`: 페이로드 바이트, 길이 = len-2, 0일 수 있습니다. |
| 비고 | `conn_hdl` 확인 순서: 먼저 BLE의 1부터 시작하는 핸들과 대조하고(즉, `conn_hdl`-1이 BLE 슬롯에 해당), 찾지 못하면 SPP 슬롯의 원시 값과 대조하며, 연결을 찾지 못하면 프레임은 폐기됩니다. BLE 대상의 경우 펌웨어가 커스텀 GATT 서비스를 순회하여 Notify 또는 Indicate 속성이 있는 첫 번째 특성을 자동으로 선택해 전송하며, 그런 특성이 없으면 아무것도 전송하지 않습니다. SPP(BR/EDR) 대상의 경우 `data`가 SPP 채널로 전송됩니다. 프레임 바로 뒤에는 `\r`이 와야 하며, 없으면 현재 프레임은 폐기됩니다. 프레임 사이에서 PDU 타임아웃 임계값 안에 새 바이트가 도착하지 않으면 PDU 수신 상태가 리셋됩니다. |

</div>

### PDU 모드 데이터 전송(서비스 및 특성 지정, opcode 0x0102)

<div align="center"><em>표: PDU 모드 데이터 전송(서비스 및 특성 지정, opcode 0x0102)</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | 바이너리 프레임(텍스트 AT 라인이 아님): `AT>` + opcode(2바이트 리틀 엔디언) + len(2바이트 리틀 엔디언) + body + `\r`. 여기서 opcode = `0x0102`(바이트 순서 02 01), len은 body의 바이트 수, body = `conn_hdl`(2바이트 리틀 엔디언) + `svc_idx`(1바이트) + `char_idx`(1바이트) + `data`입니다. |
| 응답 | 텍스트 응답 문자열이 없습니다. 펌웨어는 `OK`/`ERROR`로 응답하지 않고 지정된 서비스/특성을 통해 `data`를 상대방에게 전송합니다. |
| 매개변수 | `opcode`: `0x0102`로 고정. `len`: body 길이, 범위 4~508(수신 계층의 일반 하한은 2이지만 이 opcode는 `svc_idx`+`char_idx`를 포함하여 body가 4바이트 이상이어야 함). 그렇지 않으면 폐기됩니다. `conn_hdl`: 대상 BLE 연결 핸들이며 1부터 시작(외부 표시 값). `svc_idx`: 커스텀 GATT 서비스 인덱스. `char_idx`: 해당 서비스 내의 특성 인덱스. `data`: 페이로드 바이트, 길이 = len-4, 0일 수 있습니다. |
| 비고 | BLE 연결에만 해당하며, 확인된 연결이 SPP 유형이면 프레임은 폐기됩니다. `svc_idx`는 등록된 커스텀 서비스에 해당해야 하고 `char_idx`는 해당 서비스의 특성 수보다 작아야 하며, 그렇지 않으면 폐기됩니다. 지정한 특성에는 Notify 또는 Indicate 속성이 있어야 하며, 그렇지 않으면 폐기됩니다. `conn_hdl` 확인은 `0x0101`과 같은 규칙을 따릅니다(BLE의 1부터 시작하는 핸들을 먼저, 그다음 원시 값). 프레임 바로 뒤에는 `\r`이 와야 합니다. |

</div>

### PDU 모드 연결 해제

<div align="center"><em>표: PDU 모드 연결 해제</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | `AT+DISCONN\r`(매개변수 없음) 또는 `AT+DISCONN=<conn_hdl>\r` |
| 응답 | 성공: `\r\nOK\r\n`, 실패: `\r\nERROR\r\n` |
| 매개변수 | `conn_hdl`: 해제할 연결 핸들이며 16진수입니다. BLE 연결은 1부터 시작(외부 표시 값)하며, 값이 0이면 안 됩니다(0은 잘못된 입력으로 간주되어 `ERROR`를 반환). SPP 연결은 원시 ACL 핸들을 사용합니다. |
| 비고 | 매개변수가 없으면 현재 연결 전체를 해제하고 `OK`를 반환합니다. 매개변수가 있으면 확인 순서는 다음과 같습니다. 먼저 BLE의 1부터 시작하는 핸들과 대조하고(`conn_hdl`-1이 BLE 슬롯에 해당), 찾지 못하면 SPP 슬롯의 원시 값과 대조하며, 연결을 찾지 못하면 `ERROR`를 반환합니다. BLE 연결은 이유 코드 `0x13`으로 연결 해제를 시작하고, SPP 연결은 상대방 주소로 연결 해제를 시작합니다. 조회 형태 `AT+DISCONN?`는 `ERROR`를 반환합니다. |

</div>

### PDU 연결 상태 표시(IM_CONN / IM_DISCONN)

<div align="center"><em>표: PDU 연결 상태 표시(IM_CONN / IM_DISCONN)</em></div>

<div align="center" markdown>

| 항목 | 내용 |
|:-----|:--------|
| 명령 | 모듈이 스스로 보고하므로 호스트가 명령을 보낼 필요가 없습니다. `IM_CONN`은 연결이 설정될 때, `IM_DISCONN`은 연결이 끊어질 때 보고됩니다. |
| 응답 | 명령 모드, 연결 설정: `\r\nIM_CONN <hdl>,<mac>,<mtu>\r\n`. 여기서 `<hdl>`은 16진수 4자리 핸들, `<mac>`은 16진수 12자리 주소(최상위 바이트가 먼저), `<mtu>`는 10진수 MTU입니다. 명령 모드, 연결 해제: `\r\nIM_DISCONN:<hdl>\r\n`(`<hdl>`은 16진수 4자리). 패스스루 모드는 첫 번째 연결이 설정될 때만 `\r\nIM_CONN\r\n`(매개변수 없음)을 보고하며, 연결이 해제될 때 `IM_DISCONN`은 보고하지 않습니다. 두 모드 모두 모든 연결이 끊어지면 `\r\nIM_READY\r\n`을 보고합니다. |
| 매개변수 | `<hdl>`: 연결 핸들. BLE 연결은 1부터 시작하는 값(내부 0부터 시작하는 값에 1을 더한 값)으로 표시되고, SPP 연결은 원시 핸들을 표시합니다. `<mac>`: 상대방의 Bluetooth 주소. `<mtu>`: 협상된 MTU. |
| 비고 | 보고 여부는 `AT+EVT`가 제어합니다. 0(기본값)이면 알림이 정상적으로 보고되고, 1이면 `IM_READY`/`IM_CONN`/`IM_DISCONN`이 보고되지 않습니다. 보고 형식과 내용은 현재 동작 모드(명령 모드/패스스루 모드)에 따라 다르며, 위에 설명되어 있습니다. |

</div>

## 부록

### 일반적인 Class of Device 값

<div align="center"><em>표: 일반적인 Class of Device 값</em></div>

<div align="center" markdown>

| 디바이스 유형 | 16진수 값 |
|:-------------|:-----------|
| 컴퓨터 | `0x000100` |
| 휴대폰 | `0x000200` |
| LAN/네트워크 액세스 포인트 | `0x000300` |
| 오디오/비디오 | `0x000400` |
| 주변 장치(키보드/마우스 등) | `0x000500` |
| 이미징(프린터/스캐너 등) | `0x000600` |

</div>
