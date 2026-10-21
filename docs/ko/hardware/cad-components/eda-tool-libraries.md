---
icon: lucide/library
description: "SF32 칩과 모듈을 위한 SiFli 공식 회로도 심볼 및 PCB 풋프린트 라이브러리(JLCEDA/LCEDA Pro, PADS, OrCAD, KiCad)의 다운로드 링크와 검토 체크리스트입니다."
tags:
    - 하드웨어
    - EDA
    - 라이브러리
---

# SF32 EDA 툴 라이브러리 { #sf32-eda-tool-libraries }

## 목적 { #purpose }

SiFli는 SF32 칩 및 모듈 제품군을 위한 회로도 심볼과 PCB 풋프린트 라이브러리를 공개합니다. 데이터시트를 보고 심볼, 핀 맵, 랜드 패턴을 직접 다시 그리는 대신, 이 파일들을 회로도 작성과 PCB 레이아웃의 시작점으로 사용하십시오.

이 라이브러리는 초기 구동과 검증 과정의 위험을 줄이는 데 도움이 되지만, 데이터시트와 패키지 도면, 디바이스별 하드웨어 설계 가이드를 대신하지는 않습니다. 설계를 릴리스하기 전에 라이브러리 부품이 실제 설계에 사용할 정확한 부품 번호, 패키지, 핀 배치, 랜드 패턴, 레이아웃 지침과 일치하는지 반드시 확인하십시오.

<div class="grid cards" markdown>

- :fontawesome-solid-download: __[JLCEDA / LCEDA Pro 라이브러리 - `.epro2` 프로젝트 다운로드](https://downloads.sifli.com/hardware/files/documentation/ProPrj_sifli-iclib_2026-04-20.epro2)__
- :fontawesome-solid-download: __[PADS 라이브러리 - `.ZIP` 다운로드](https://downloads.sifli.com/hardware/files/documentation/PADS-SIFLI-IC.ZIP)__
- :fontawesome-solid-download: __[OrCAD 라이브러리 - `.OLB` 다운로드](https://downloads.sifli.com/hardware/files/documentation/OrCAD-SIFLI-IC.OLB)__
- :fontawesome-brands-github: __[KiCad 라이브러리 - OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries)__

</div>

!!! note "출처"
    직접 다운로드 링크는 [SiFli Wiki의 리소스 다운로드](https://wiki.sifli.com/hardware/index.html)에서 가져온 것입니다. 파일 링크가 바뀌면 해당 페이지에서 대체 링크를 찾으십시오.

## 라이브러리 형식 한눈에 보기 { #library-format-at-a-glance }

<div align="center"><em>라이브러리 형식 요약</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| EDA 툴 | 파일 | 형식 | 내용 | 배포 방식 |
|:---|:---|:---|:---|:---|
| JLCEDA / LCEDA Pro | `ProPrj_sifli-iclib_2026-04-20.epro2` | LCEDA Pro 프로젝트 아카이브 | 회로도 심볼 및 PCB 풋프린트 | 직접 다운로드 |
| PADS | `PADS-SIFLI-IC.ZIP` | Mentor/Siemens PADS 라이브러리 아카이브 | 회로도 심볼 및 PCB 데칼 | 직접 다운로드 |
| OrCAD | `OrCAD-SIFLI-IC.OLB` | Cadence OrCAD Capture 라이브러리 | 회로도 심볼 | 직접 다운로드 |
| KiCad | 릴리스 ZIP 또는 패키지 메타데이터(`metadata.json`) | KiCad 심볼, 풋프린트, 3D 모델 라이브러리 | 회로도 심볼, PCB 풋프린트, 3D 모델 | [GitHub 저장소](https://github.com/OpenSiFli/kicad-libraries), 버전별 릴리스 |

</div>

JLCEDA / LCEDA Pro와 PADS는 다운로드 가능한 아카이브이고, OrCAD는 독립형 `.OLB` 라이브러리 파일입니다. Wiki 색인은 이 다운로드 파일에 대한 부품별 지원 범위 표를 제공하지 않습니다. 파일을 사용할 EDA 툴로 가져온 뒤 선택한 부품이 들어 있는지 확인하십시오.

링크된 KiCad 저장소는 소스 코드와 버전별 릴리스, 지원 디바이스 표를 공개합니다. 따라서 지원 범위를 확인하기는 쉽지만, 모든 SF32 변형(variant)이 포함된다는 보장은 없습니다.

## KiCad 라이브러리 상세 { #kicad-library-detail }

[OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) 저장소는 SiFli의 공식 KiCad 심볼, 풋프린트, 3D 모델 라이브러리를 CC-BY-SA-4.0 라이선스로 제공합니다. [릴리스 `1.0.0`](https://github.com/OpenSiFli/kicad-libraries/releases/tag/1.0.0)은 이번 검토를 위해 2026-10-05에 확인했습니다. 설계를 시작하기 전에 저장소에서 새 릴리스가 있는지 확인하십시오.

<div align="center"><em>KiCad 라이브러리 지원 범위</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 부품 번호 | 패키지 | 심볼 | 풋프린트 | 3D 모델 |
|:---|:---|:---:|:---:|:---:|
| SF32LB52B/D/E/G/J | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB520/3/5/7 | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB52-MOD-1 모듈 | - | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-xmark: |

</div>

이 표는 2026-10-05에 확인한 저장소 README를 반영한 것으로, 다운로드 가능한 모든 릴리스의 핀을 하나씩 검증한 결과는 아닙니다. 와일드카드로 묶인 칩 그룹이 모든 주문 코드의 지원을 보증하지는 않습니다. 설치한 파일에서 선택한 심볼과 풋프린트가 해당 패키지에 맞는지 직접 확인하십시오.

!!! note "업스트림 부품 번호 행 해석"
    OpenSiFli KiCad 라이브러리 README의 칩 모델 행에는 `SF32LB52XUx`와 `SF32LB52xUx`가 기재되어 있습니다. SiFli 명명 규칙에서 대문자 `X`는 알파벳 변형인 일반 전원 제품군을, 소문자 `x`는 숫자 변형인 배터리 전원 제품군을 나타내는 와일드카드입니다. 이 페이지에서는 해당 표기를 μForge 문서의 다른 곳에서 사용하는 SF32LB52B/D/E/G/J 및 SF32LB520/3/5/7 그룹으로 풀어 썼습니다.

[OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries)의 README에 따르면 Package and Content Manager 카탈로그를 통한 설치는 아직 지원되지 않습니다. 수동 설치 방법으로는 릴리스 ZIP을 내려받아 관리자에서 **Install from file...**을 선택하라고 설명합니다. `1.0.0` 릴리스 페이지에는 ZIP을 KiCad의 라이브러리 디렉터리에 압축 해제하거나 `metadata.json`을 사용해 관리자로 설치하는 방법도 문서화되어 있습니다. 사용하는 릴리스에 포함된 안내를 따르십시오. README는 설치되는 심볼 및 풋프린트 라이브러리의 이름을 `PCM_SiFli`로 명시합니다.

## 검토 체크리스트 { #review-checklist }

- [ ] 회로도를 릴리스하기 전에 라이브러리 부품 번호와 패키지 접미사를 BOM과 대조합니다.
- [ ] 심볼의 핀 이름과 핀 번호를 칩 데이터시트 및 디바이스별 하드웨어 설계 가이드와 교차 확인합니다.
- [ ] 풋프린트의 패드 크기, 피치, 코트야드, 노출 패드 처리, 조립 시 필요한 간격을 공식 패키지 도면과 대조합니다.
- [ ] 3D 모델은 배치와 기구 적합성을 확인하는 보조 수단으로만 취급하고, 제조 또는 조립 치수로 사용하지 않습니다.
- [ ] JLCEDA / LCEDA Pro, PADS, OrCAD는 가져온 뒤 부품별 지원 범위를 확인합니다. Wiki 다운로드 색인에는 부품별 지원 여부가 나와 있지 않습니다.
- [ ] 새 설계를 시작하기 전에 업데이트된 라이브러리가 있는지 확인합니다. 검토한 아카이브 또는 패키지 버전을 프로젝트와 함께 보관하십시오. SiFli는 새 디바이스와 모듈의 검증을 마치면 라이브러리를 업데이트할 수 있습니다. 업데이트로 부품이 추가되거나 변경될 수 있으므로, 새 버전을 채택하기 전에 다시 확인하십시오.

## 관련 페이지 { #related-pages }

- [SF32 제품군](../../sf32-products/family/SF32_family.md)
- [SF32 명명 규칙](../../sf32-products/family/SF32_namingrule.md)
- [SF32 승인 업체 목록](sifli-approved-vendor-list.md)
