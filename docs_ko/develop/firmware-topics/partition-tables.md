---
icon: lucide/table-properties
description: "SiFli-SDK 파티션 테이블로 SF32 메모리 레이아웃을 기술하는 방법입니다. 레거시 JSON v1/v2 형식과 권장 YAML v3 형식, 오버레이, 생성 파일, 검증을 비교합니다."
tags:
    - Develop
    - Partitions
---

# 파티션 테이블 { #partition-tables }

SiFli-SDK의 `partition_table` 빌드 도구는 보드의 파티션 기술 파일을 읽어 애플리케이션이 사용하는 파티션 매크로를 제공하는 `ptab.h`를 생성합니다. 파티션 테이블은 NOR 플래시, NAND 플래시, eMMC, SD 카드, PSRAM, 온칩 SRAM을 포함하여 관련된 모든 메모리의 주소 레이아웃을 기술합니다.

각 보드에는 기본 레이아웃이 있으며, 해당 보드용으로 빌드되는 모든 애플리케이션이 이를 따릅니다. 프로젝트가 자체 파티션 테이블 구성을 제공하여 보드 기본값을 대체할 수도 있습니다.

## 파티션 테이블 활성화 { #enable-partition-tables }

미들웨어 구성에서 **Use partition table to manage all memory layout**을 활성화하십시오. 프로젝트에는 `Kconfig.proj`에 다음 설정도 필요합니다. SiFli-SDK 예제에는 이미 포함되어 있습니다.

```kconfig
# APP-specific configuration.
config CUSTOM_MEM_MAP
    bool
    select custom_mem_map
    default y if !SOC_SIMULATOR
```

## 형식 선택 { #choose-a-format }

SiFli-SDK는 세 가지 파티션 테이블 형식을 지원합니다. 기존 보드나 제품이 v1/v2 구성을 유지해야 하는 경우가 아니라면 새 작업에는 v3를 사용하십시오.

<div align="center"><em>표: SiFli-SDK 파티션 테이블 형식</em></div>
<div align="center" markdown>

| 형식 | 기술 파일 | 핵심 모델 | 새 프로젝트에 사용? |
| --- | --- | --- | --- |
| v1 | `ptab.json` | JSON 메모리 목록, 태그, 선택적 `ftab`, `img`, `exec` 메타데이터 | 아니요. 레거시 프로젝트 유지보수용으로만 사용합니다. |
| v2 | `ptab.json` | 이름과 타입이 있는 이미지 및 실행 파티션을 갖춘 JSON 메모리 목록 | 아니요. 기존 보드가 의존하는 경우에만 유지합니다. |
| v3 | `ptab.yaml` | `type`, `subtype`, `region`, `exec`, 생성되는 매크로, 프로젝트 오버레이를 갖춘 YAML 파티션 | 예. |

</div>

빌드 시스템은 먼저 `ptab.yaml`(v3)을 찾고, 없으면 `ptab.json`(v1/v2)으로 대체합니다. 검색 순서는 보드 디렉터리, 칩 디렉터리, BSP 루트, `customer/boards/<board>/`입니다.

## v1: JSON 태그와 이미지 메타데이터 { #v1-json-tags-and-image-metadata }

v1은 `ptab.json`의 JSON 배열을 사용합니다. 전용 버전 필드는 없지만, `"version": "1"`을 포함하는 헤더 요소로 시작할 수 있습니다.

각 메모리 항목은 다음을 정의합니다.

- `mem`: `flash2`, `psram1` 같은 메모리 이름.
- `base`: 메모리의 16진수 베이스 주소. 타깃 메모리 맵과 대조하여 확인하십시오.
- `regions`: 해당 메모리 안의 파티션 목록.

각 리전은 바이트 단위의 `offset`과 `max_size`를 사용합니다. 리전의 `tags` 목록이 파티션 매크로를 생성합니다. 예를 들어 `FLASH_BOOT_LOADER`는 `FLASH_BOOT_LOADER_START_ADDR`, `FLASH_BOOT_LOADER_OFFSET`, `FLASH_BOOT_LOADER_SIZE`를 만들며, 시작 주소는 메모리 `base`에 리전 `offset`을 더한 값입니다.

<div align="center"><em>표: v1 선택적 리전 메타데이터</em></div>
<div align="center" markdown>

| 필드 | 용도 |
| --- | --- |
| `ftab` | 플래시 Table 항목을 기술합니다. |
| `img` | 생성되는 프로그래밍 스크립트에서 사용할, 파티션 안의 이미지 이름을 지정합니다. 프로젝트가 여러 바이너리를 출력하는 경우 `proj_name:binary_name`을 사용합니다. |
| `exec` | 공유 링크 스크립트가 코드 주소를 선택할 수 있도록 실행 프로그램의 이름을 지정합니다. |
| `custom` | 생성되는 `ptab.h`에 정수 값을 갖는 커스텀 매크로를 추가합니다. |

</div>

PSRAM의 경우 소스 문서는 CBUS와 SBUS 주소 공간을 구분합니다. 코드가 실행 주소를 사용하도록 `exec` 필드를 CBUS 파티션에 지정하십시오. 코드를 복사하는 데 해당 주소를 사용한다면 `ftab`의 `xip` 주소를 SBUS 파티션에 배치하십시오.

## v2: 이름과 타입이 있는 JSON 파티션 { #v2-named-and-typed-json-partitions }

v2도 `ptab.json`을 사용하지만, 헤더에 `"version": "2"`를 선언해야 합니다. 메모리 필드는 `mem`, `base`, `regions` 그대로입니다. 리전은 `offset`과 `max_size`를 유지하며 `tags`와 `custom`을 사용할 수 있습니다. v2는 여기에 더해 리전에 `name`과 `type`을 부여하며, 실행 파티션에는 선택적으로 `core`를 지정할 수 있습니다.

<div align="center"><em>표: v2 리전 필드와 타입</em></div>
<div align="center" markdown>

| 필드 또는 타입 | 의미 |
| --- | --- |
| `name` | 파티션 이름. 프로그램 이미지 이름은 해당 프로그램 또는 `AddCustomImg` 이름과 일치해야 합니다. 여러 파일로 이루어진 프로그램은 `proj_name:1`, `proj_name:2` 등을 사용할 수 있습니다. |
| `core` | `app_exec` 파티션을 실행하는 코어: `hcpu`, `lcpu`, `acpu`. |
| `app_img` | 프로그램 이미지를 저장하며 플래시 도구가 프로그래밍하는 기본 파티션. |
| `app_img2` | 백업 프로그램 이미지 파티션. 업데이트를 위해 보통 기본 파티션과 쌍으로 사용합니다. |
| `app_exec` | 프로그램이 실행되는 주소 공간. |

</div>

`bootloader`, `main`, `dfu`, `ftab`은 예약된 이름입니다. 그 밖의 프로그램 이름은 `acpu` 같은 사용자 정의 이미지에 사용할 수 있습니다. 테이블에 `ftab` 및 `bootloader` 파티션이 정의되어 있지 않으면 도구가 기본 구성을 생성하므로, 이에 의존하기 전에 생성된 `ptab.h`를 확인하십시오.

## v3: YAML 파티션과 오버레이 { #v3-yaml-partitions-and-overlays }

v3는 `ptab.yaml`을 사용하며 권장 형식입니다. 레거시 `tags` 모델을 명시적인 `type` 및 `subtype` 필드로 대체하고, 논리적인 `region` 이름을 통해 파티션을 물리적 토폴로지에서 분리하며, 빌드 과정에서 `ptab.h`, `ftab.bin`, 링크 스크립트 조각을 생성합니다.

<div align="center"><em>표: v3 최상위 및 파티션 필드</em></div>
<div align="center" markdown>

| 범위 | 필드 | 필수 | 의미 |
| --- | --- | --- | --- |
| 최상위 | `version` | 예 | `3`이어야 합니다. |
| 최상위 | `chip` | 예 | `SF32LB525UC6` 같은 칩 부품 번호. |
| 최상위 | `memory` | 아니요 | 외부 스토리지 정의. |
| 최상위 | `partitions` | 예 | 파티션 목록. |
| 파티션 | `name`, `type`, `region`, `offset`, `size` | 예 | 식별자, 종류, 논리적 스토리지 리전, 배치. `offset`과 `size`는 `0x` 접두사 또는 `KB`/`MB` 접미사를 사용할 수 있습니다. |
| 파티션 | `subtype`, `exec`, `core`, `attrs` | 아니요 | 세부 유형, non-XiP 실행 위치, 타깃 코어, 커스텀 속성. |

</div>

외부 `memory` 정의는 `mpi` 또는 `sdmmc` 인터페이스 이름, `nand`, `nor`, `sd` 중 하나의 `type`, 크기를 사용합니다. `region`은 이러한 외부 메모리, `hpsys_ram`, `lpsys_ram`을 참조할 수 있습니다.

각 `region`은 SBUS 스토리지 주소와, CPU 실행 또는 XiP에 사용하는 CBUS 주소로 매핑됩니다. SDK는 칩의 SiliconSchema 데이터에서 이 매핑을 불러옵니다. `FAL_PART_TABLE`의 디바이스 이름은 `exec` 필드가 아니라 파티션의 스토리지 `region`에서 가져옵니다. `mpi1`부터 `mpi5`까지는 `NOR_FLASH1_DEV_NAME`부터 `NOR_FLASH5_DEV_NAME`에 대응하고, `sdmmc1`과 `sdmmc2`는 `SDMMC1_DEV_NAME`과 `SDMMC2_DEV_NAME`에 대응합니다.

<div align="center"><em>표: v3 파티션 타입과 서브타입</em></div>
<div align="center" markdown>

| 타입 | 서브타입 또는 용도 | 의미 |
| --- | --- | --- |
| `ftab` | — | 플래시 Table 파티션. |
| `bootloader` | — | 부트로더 파티션. |
| `app` | `factory` | 공장 출하 메인 애플리케이션. `CODE_START_ADDR`와 `CODE_SIZE`를 생성합니다. |
| `app` | `dfu` | 독립 DFU 애플리케이션. |
| `app` | `ex` | 리소스 파티션. 빌드가 툴체인별 리소스 이미지 출력을 생성합니다. |
| `data` | `flashdb_kv` | FlashDB KV 데이터베이스. `KVDB_*` 매크로를 생성하며 `FAL_PART_TABLE`에 포함됩니다. |
| `data` | `filesystem`, `littlefs`, `fat`, 또는 `fatfs` | 레퍼런스는 `filesystem`이 `FS_REGION_*` 매크로를 생성하고 `FAL_PART_TABLE`에 포함된다고 명시합니다. 다른 부분에서는 `littlefs`, `fat`, `fatfs`도 매크로를 생성하는 서브타입으로 나열하면서 현재는 아무 효과가 없다고 설명하므로, 이 세 서브타입의 동작은 타깃 SDK 릴리스에서 확인하십시오. 같은 매크로 절에서는 서브타입 이름으로 `flashdb`를 사용하지만 서브타입 표와 FAL 규칙에서는 `flashdb_kv`를 사용합니다. 타깃 SDK를 확인하지 않고 이 이름들이 별칭이라고 가정하지 마십시오. |
| `data` | `ram`, `calibration`, `raw`, 또는 `int_res` | RAM, 캘리브레이션, 애플리케이션이 관리하는 원시 데이터, 또는 ELF에 링크되어 섹션 이름으로 분할되는 내부 리소스 데이터. |

</div>

생성되는 v3 `FAL_PART_TABLE`에는 `data/flashdb_kv`, `data/filesystem`, 그리고 서브타입이 `ex`가 아닌 `app` 파티션만 포함됩니다. `ftab`, `bootloader`, `app/ex`, 그리고 `littlefs`, `fat`, `fatfs`, `raw`, `ram`, `calibration`, `int_res`를 포함한 그 밖의 `data` 서브타입은 제외됩니다. 항목에는 각 파티션의 `name`이 사용되며, `main`, `dfu_code`, `fs_root` 같은 레거시 레이아웃 별칭은 파티션 이름으로 매핑되지 않습니다. v3로 마이그레이션할 때는 `FAL_PART_TABLE`을 직접 정의하지 마십시오. 재정의 경고를 피하려면 보드 수준의 `custom_mem_map.h`가 있는 경우 제거하십시오.

`ptab.h`는 각 파티션에 대해 `<NAME>_START_ADDR`, `<NAME>_SIZE`, `<NAME>_OFFSET` 매크로를 생성하며, 여기서 `<NAME>`은 대문자로 쓴 파티션 이름입니다. 리전의 메모리 타입이 인식되면 `<NAME>_MEM_TYPE`도 생성합니다. `app/factory` 파티션의 경우, `CODE_START_ADDR`는 `exec`에 지정된 주소가 있으면 그 주소를 사용하고, 없으면 파티션의 CBUS 주소를 사용합니다.

NAND 플래시에 저장된 애플리케이션을 PSRAM으로 복사하는 경우처럼 코드를 제자리에서 실행할 수 없는 곳에는 `exec: {region, offset}`을 사용하십시오. `exec` 필드가 없으면 생성되는 코드 시작 주소는 파티션의 CBUS 스토리지 주소를 사용합니다. `attrs`는 `ptab.h`에 커스텀 매크로를 추가합니다.

### 기본값과 프로젝트 오버레이 { #defaults-and-project-overlays }

v3는 해당 파티션이 없을 때 시스템 기본값을 도출합니다. SF32LB52에서는 HCPU 공장 출하 애플리케이션의 스토리지 리전으로부터 `flash_table`과 `bootloader`를 추론할 수 있으며, NAND 및 SDMMC 부트 스토리지에도 문서화된 기본 데이터 파티션이 부여됩니다. SF32LB56과 SF32LB58에서는 내부 `mpi5`의 `flash_table`과 `bootloader`를 생략할 수 있습니다. 기본 SiP PSRAM 윈도우와 표준 RAM 파티션도 프로젝트가 RAM 레이아웃을 변경하지 않는 한 생략할 수 있습니다.

프로젝트별로 작게 변경할 때는 보드의 전체 `ptab.yaml`을 복사하는 대신 `ptab.overlay.yaml`을 사용하십시오. 이 파일로 파티션을 추가하거나 기존 파티션을 재정의할 수 있습니다.

```yaml
partitions:
  - op: override
    name: fs_region
    size: 5MB

  - op: add
    name: log_region
    type: data
    subtype: raw
    region: mpi2
    offset: 0x00F00000
    size: 64KB
```

보드별 오버레이는 칩별 오버레이보다 우선합니다. 오버레이는 파티션만 수정합니다. `memory`, `chip`, `version`은 변경할 수 없으며 파티션을 삭제할 수도 없습니다. 오버레이는 보드 수준 v3 `ptab.yaml`에만 적용되며, 완전한 프로젝트 수준 `ptab.yaml` 또는 `ptab.json`과는 함께 사용할 수 없습니다. 보드가 여전히 `ptab.json`(v1/v2)을 사용하고 완전한 `ptab.yaml`이 선택되지 않은 경우, 빌드는 오버레이를 무시하고 경고를 출력한 뒤 오버레이를 사용하지 않는 파티션 테이블 경로로 계속 진행합니다. 이 경우 `ptab.effective.yaml`은 생성되지 않습니다. 오버레이가 적용되면 빌드는 확인용으로 결과 `ptab.effective.yaml`을 기록합니다.

## 생성 파일과 검증 { #generated-files-and-validation }

<div align="center"><em>표: 파티션 테이블 빌드 출력</em></div>
<div align="center" markdown>

| 출력 | 용도 |
| --- | --- |
| `ptab.h` | 파티션 매크로를 담은 생성된 C 헤더. |
| `ftab.bin` | 부트로더가 사용하는 바이너리 플래시 Table. v3에서는 `ftab` 서브프로젝트 없이 Python이 직접 생성합니다. |
| `link_copy.lds` / `link_copy.sct` | 생성된 GCC 또는 Keil 링크 스크립트 사본. v3는 Jinja2 템플릿을 사용합니다. |
| `ptab.effective.yaml` | 오버레이가 활성화된 경우, 오버레이 처리 후의 최종 v3 테이블. |

</div>

통합하기 전에 v3 보드 테이블을 검증하십시오.

```bash
python tools/build/validate_ptab_v3.py customer/boards/<board>/ptab.yaml
```

검증기는 파티션 이름 구문, 유효한 타입과 서브타입, 유효한 리전, 파티션 중첩, 부트로더 고유성을 검사합니다. 빌드에서 사용하는 유효 v3 구성을 확인하려면 다음을 실행하십시오.

```bash
sdk.py ptab-export --board=<board-name>
sdk.py ptab-export --board=<board-name> --output /tmp/ptab.effective.yaml
sdk.py ptab-export --strict
```

## 생성된 플래시 Table 확인 { #inspect-the-generated-flash-table }

빌드 후 `ftab.bin`은 빌드 디렉터리에 배치됩니다. SDK 환경을 초기화한 다음, 현재 프로젝트 아래에서 처음 발견되는 `build_*/ftab.bin`을 확인하십시오.

```bash
source ./export.sh
sdk.py ftab-dump
```

Windows PowerShell에서는 `./export.ps1`로 초기화합니다. 프로젝트에 보드별 빌드 디렉터리가 여러 개 있으면 경로를 지정하고, 스크립트가 결과를 처리하는 경우에는 JSON 출력을 사용하십시오.

```bash
sdk.py ftab-dump --path build_<board_name>/ftab.bin
sdk.py ftab-dump --path build_<board_name>/ftab.bin --format json
```

테이블 보기에는 파티션 항목, DFU 및 부트 흐름에서 사용하는 이미지 설명, HCPU, LCPU, 부트로더, 부트 이미지의 실행 중 이미지 포인터가 표시됩니다.

## 제품 검토 { #product-review }

- [ ] 프로젝트가 보드 테이블 또는 명시적인 프로젝트 구성을 의도적으로 사용합니다.
- [ ] 선택한 v1, v2, v3 구문이 빌드 시스템이 실제로 찾은 파일과 일치합니다.
- [ ] 특히 non-XiP 스토리지와 PSRAM에서 이미지 저장 위치와 실행 위치가 올바릅니다.
- [ ] 애플리케이션, 백업, DFU, 파일 시스템, 캘리브레이션, 애플리케이션 관리 데이터 파티션의 용량이 충분하고 서로 겹치지 않습니다.
- [ ] 생성된 `ptab.h`, `ftab.bin`, 그리고 v3 오버레이의 경우 `ptab.effective.yaml`을 확인했습니다.
- [ ] 일반 업데이트 경로와 별도로 복구용 프로그래밍 절차가 기록되어 있습니다.

전체 소스 참고 자료는 공식 SiFli-SDK 문서의 [파티션 테이블](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table.html), [v1](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v1.html), [v2](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v2.html), [v3](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v3.html)를 참조하십시오.
