---
icon: lucide/component
description: "Lista de fornecedores aprovados pela SiFli para projetos SF32: cristais, indutores buck, memórias Flash NOR/NAND e SD-NAND e controladores LCD, com requisitos de seleção e checklists para revisar a BOM."
tags:
    - Hardware
    - Fornecedores
    - AVL
---

# Lista de fornecedores aprovados para SF32 { #sf32-approved-vendor-list }

## Para que serve esta lista { #what-this-list-is-for }

A **lista de fornecedores aprovados (Approved Vendor List, AVL)** registra os resultados da qualificação de componentes conduzida pela SiFli para projetos SF32. A V0.3 lista cristais, indutores buck, memórias Flash NOR/NAND, SD-NAND e um controlador LCD; a aba de controladores de toque não contém registros. Use a lista para selecionar componentes candidatos e possíveis fornecedores alternativos. Depois, valide a peça exata na PCB do produto com o firmware previsto, considerando o gabinete, o processo de fabricação e a cadeia de suprimentos. A inclusão na AVL não substitui a validação do produto.

Esta página foi elaborada diretamente a partir da planilha oficial de AVL da SiFli, **`SIFLI-MCU-AVL-认证表`, versão V0.3 (2026-01-21)**. Como a AVL pode mudar à medida que novos componentes são qualificados, esta página registra a versão V0.3, datada de 2026-01-21, e não é atualizada em tempo real. Esta revisão confirma apenas o conteúdo da V0.3; não estabelece se algum componente continua aprovado em revisões posteriores da AVL. Consulte a planilha-fonte vigente antes de fechar a BOM:

<div class="grid cards" markdown>

- :fontawesome-solid-file-excel: __[Lista de fornecedores aprovados da SiFli (AVL): baixar V0.3 .xlsx](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx)__
- :fontawesome-solid-globe: __[Wiki da SiFli — guias de projeto de hardware e downloads](https://wiki.sifli.com/en/hardware/index.html)__

</div>

!!! note "Como usar esta lista"
    A fonte apresenta requisitos gerais para cristais e indutores buck; as demais tabelas registram principalmente dados de cada referência. Avalie os candidatos por esses requisitos sem presumir que todos os componentes listados atendam a cada limite geral: as inconsistências da fonte são indicadas abaixo. Colunas inteiramente vazias, como o suporte a ferramentas de gravação de Flash, foram omitidas; isso não confirma tal suporte. Nas tabelas detalhadas, um travessão (—) normalmente indica que a versão V0.3 não informa um valor para aquele campo. Nas células de clock DTR de NOR Flash, porém, representa a indicação explícita da fonte de que o modo não é suportado; consulte a nota sobre NOR Flash.

Avalie cada escolha para a BOM em três etapas, em vez de selecionar um número de peça e seguir adiante:

1. **Faça uma pré-seleção pelos requisitos.** Compare capacidade, tensão de alimentação, encapsulamento e requisitos de cada tipo de componente (capacitância de carga dos cristais, DCR/Isat dos indutores e frequência SDR/DTR das memórias Flash) com o esquemático e o orçamento de energia.
2. **Verifique as restrições que não ficam evidentes no parâmetro destacado do datasheet.** Confirme se a faixa de temperatura atende às condições de operação e armazenamento do produto, se o firmware espera exatamente o ID de fabricante/JEDEC daquela peça e se o suporte a OTA, sistema de arquivos e ferramentas de gravação foi testado com essa peça específica, não apenas com outra da mesma família.
3. **Valide em hardware real antes da produção em escala.** Meça a corrente em repouso e em atividade na sua placa, repita a calibração RF do cristal na PCB e no gabinete finais e identifique pelo menos um fornecedor alternativo para cada item da BOM com fornecedor único.

## Visão geral da cobertura { #coverage-at-a-glance }

<div align="center"><em>Tabela: visão geral da cobertura</em></div>

<div align="center" markdown>

| Categoria | Componentes qualificados | Principais critérios de seleção |
|:---|---:|:---|
| Cristais de 48 MHz | 10 | Capacitância de carga, tolerância de frequência, ESR, tempo de partida, calibração CBANK e desvio de frequência Bluetooth |
| Cristais de 32,768 kHz | 5 | Capacitância de carga, tolerância de frequência, ESR, encapsulamento, temperatura de operação |
| Indutores buck | 8 | Indutância de 4,7 µH, DCR, corrente de saturação (Isat), corrente nominal (Irms), SRF e compatibilidade com encapsulamento 2016 |
| Flash NOR | 44 | Capacidade, trilho de tensão, frequência SDR/DTR, ID informado e corrente em repouso/no modo de desligamento profundo |
| Flash SPI-NAND | 18 | Capacidade, modo ECC, geometria de páginas/blocos, Golden Block e correntes em repouso, leitura e programação |
| Flash SD-NAND | 5 | Compatibilidade com SD 2.0, operação a 50 MHz, corrente em repouso e faixa de temperatura de operação |
| Controladores LCD | 1 | Uma referência listada; confirme temporização do painel, suporte do driver e modo de interface antes da liberação |
| Controladores de painel de toque | 0 | Nenhuma entrada na V0.3; confirme separadamente a qualificação e o suporte do driver |

</div>

Use o resumo para conhecer a cobertura da V0.3. A seleção do display e do painel de toque merece atenção especial: essa versão contém apenas um controlador LCD e nenhum controlador de toque. Confirme a referência com a SiFli e valide-a no produto; sua inclusão em uma revisão posterior não elimina essa necessidade.

## Histórico de revisões { #revision-history }

<div align="center"><em>Tabela: histórico de revisões</em></div>

<div align="center" markdown>

| Versão | Data | Autor | Alteração |
|:--------|:-----|:-------|:-------|
| V0.1 | 2023-12-29 | yzli | Versão inicial. |
| V0.2 | 2025-07-16 | yzli | Inclusão dos cristais de 48 MHz da Huilun e da JWT (晶威特). |
| V0.3 | 2026-01-21 | yzli | Inclusão das memórias Flash NOR da UCUN: UC25WQ80IB, UC25IQ32A, UC25IQ64A e UC25IQ128A. |

</div>

---

## Cristais { #crystal-oscillators }

A AVL inclui cristais de sistema de 48 MHz e cristais de RTC de 32,768 kHz. Consulte os requisitos das fontes de clock no guia de projeto do dispositivo SF32 exato e selecione pela capacitância de carga, tolerância de frequência, ESR, comportamento de partida e orçamento de energia. As tabelas de qualificação não estabelecem uma única configuração de clock obrigatória para todos os produtos SF32.

### Cristal de sistema de 48 MHz { #48-mhz-system-crystal }

!!! info "Requisitos"
    Capacitância de carga CL ≤ 12 pF (7 pF recomendados) · Desvio de frequência ΔF/F0 ≤ ±10 ppm · ESR ≤ 30 Ω (22 Ω recomendados)

<div align="center"><em>Cristais de sistema de 48 MHz qualificados</em></div>

<div align="center" markdown>

| Número de peça qualificado | Fornecedor | CL | ΔF/F0 | ESR | Temperatura de operação | Encapsulamento | Tempo de partida | Corrente adicional | CBANK_SEL ideal | Desvio de frequência TX Ch39 (−35 °C / 25 °C / 105 °C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:--------------|:-------------|:-------------------|:---------------------------------------------|
| E1SB48E001G00E | Hosonic (鸿星) | 8,8 pF | −10 a +9 ppm | ≤22 Ω | −30 °C a +85 °C | 2016 (padrão métrico) | <700 µs | 0 µA | 0x1C9 | −32 a −1 kHz / ±20 kHz / +33 a +73 kHz |
| SX20Y048000B31T-8.8 | TKD (泰晶) | 8,8 pF | ±10 ppm | ≤40 Ω | −20 °C a +75 °C | 2016 (padrão métrico) | <800 µs | <30 µA | 0x1DC | −52 a −15 kHz / ±22 kHz / +50 a +100 kHz |
| SX20Y048000B31T001 | TKD (泰晶) | 8,8 pF | ±10 ppm | ≤40 Ω | −40 °C a +85 °C | 2016 (padrão métrico) | <800 µs | <30 µA | 0x1F7 | −53 a +13 kHz / ±30 kHz / +44 a +90 kHz |
| CN4048M00085C822000 | JWT (晶威特) | 8 pF | ±8 ppm | ≤22 Ω | −30 °C a +85 °C | 2016 (padrão métrico) | <700 µs | 0 µA | 0x195 | −40 a +1 kHz / −25 a +14 kHz / +12 a +45 kHz |
| HS48000013 | 汇隆电子 | 8,8 pF | ±10 ppm | ≤22 Ω | −30 °C a +85 °C | 2016 (padrão métrico) | <700 µs | <12 µA | 0x1F3 | −27 a +8 kHz / −25 a +10 kHz / −1,2 a +32 kHz |
| SX20Y048000B81T003 | TKD (泰晶) | 8 pF | ±10 ppm | ≤40 Ω | −30 °C a +85 °C | 2016 (padrão métrico) | <700 µs | <10 µA | 0x1F4 | −41 a +7 kHz / −30 a +20 kHz / +5 a +57 kHz |
| L214S480D11-S | Lucki (蓝晶) | 8 pF | ±10 ppm | ≤30 Ω | −30 °C a +85 °C | 2016 (padrão métrico) | <750 µs | <50 µA | 0x196 | −38 a 0 kHz / −28 a 0 kHz / −4 a +45 kHz |
| 8Y48090002 | TXC (晶技) | 8,8 pF | −6 a +8 ppm | ≤22 Ω | −30 °C a +85 °C | 2016 (padrão métrico) | <700 µs | <30 µA | 0x1D0 | −34 a −9,6 kHz / — / +27,9 a +46,1 kHz |
| 9S48000051 | 惠伦晶体 | 8,8 pF | −6 a +8 ppm | ≤20 Ω | −30 °C a +85 °C | 2016 (padrão métrico) | <700 µs | <15 µA | — | — |
| CN4048M000885C822000 | JWT (晶威特) | 8,8 pF | ±8 ppm | ≤22 Ω | −30 °C a +85 °C | 2016 (padrão métrico) | <700 µs | <10 µA | 0x1D0 | −34 a −9,6 kHz / −25 a +10 kHz / +27,9 a +46,1 kHz |

</div>

!!! tip "O que significam as colunas de calibração RF"
    **CBANK_SEL** é o ajuste registrado nos dados de qualificação da SiFli. **TX Ch39 Freq Offset** mantém o nome original do ensaio e os resultados em três temperaturas. A planilha não identifica o modo Bluetooth nem a frequência de ensaio; não presuma que se trata do canal de advertising BLE 39 ou de um canal específico na região central da banda. Confirme as condições de ensaio e o procedimento de calibração antes de comparar resultados ou aplicar os ajustes à sua placa. Três referências da TKD indicam ESR ≤40 Ω, apesar do requisito geral de ≤30 Ω; essa divergência também precisa ser confirmada.

As correntes adicionais da tabela de cristais não têm uma referência de comparação nem uma configuração completa de ensaio documentadas. Não são correntes de alimentação do cristal isolado; confirme a definição da medição antes de comparar candidatos ou usar os valores no orçamento de energia do sistema.

### Cristal de RTC de 32,768 kHz { #32768-khz-rtc-crystal }

!!! info "Requisitos"
    Capacitância de carga CL ≤ 12,5 pF (7 pF recomendados) · Desvio de frequência ΔF/F0 ≤ ±20 ppm · ESR ≤ 80 kΩ (38 kΩ recomendados)

<div align="center"><em>Cristais de RTC de 32,768 kHz qualificados</em></div>

<div align="center" markdown>

| Número de peça qualificado | Fornecedor | CL | ΔF/F0 | ESR | Temperatura de operação | Encapsulamento | Percentuais da fonte; significado a confirmar (−35 °C / 25 °C / 105 °C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:-------------------------------------|
| ETST00327000LE | Hosonic (鸿星) | 7 pF | ±20 ppm | ≤70 kΩ | −40 °C a +85 °C | 3215 (padrão métrico) | 32% a 55% / 43% a 54% / 38% a 45% |
| SF32K32768D71T01 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40 °C a +85 °C | 3215 (padrão métrico) | 33% a 54% / 42% a 56% / 35% a 44% |
| X1A0001210008xx | Epson (爱普生) | 7 pF | ±20 ppm | ≤90 kΩ | −40 °C a +85 °C | 1610 (padrão métrico) | 35% a 61% / 42% a 58% / 36% a 48% |
| DH2032K76807T2719002 | JWT (晶威特) | 7 pF | ±20 ppm | ≤70 kΩ | −40 °C a +85 °C | 3215 (padrão métrico) | 43% a 60% / 45% a 59% / 37% a 48% |
| SF32WK32768D71T024 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40 °C a +85 °C | 3215 (padrão métrico) | 34% a 55% / 41% a 54% / 36% a 46% |

</div>

A planilha registra 32,76 kHz para cada peça em três temperaturas de ensaio distintas: −35 °C, 25 °C e 105 °C. Essa precisão de apresentação não comprova exatidão na ordem de ppm nem desempenho em toda a faixa de temperatura. Os percentuais da tabela aparecem em colunas cujo cabeçalho original é `TX_CH39_Freq_offset(KHz)`, embora o formato sugira medições de ciclo de trabalho. Confirme o significado com a SiFli antes de usá-los como limites de ciclo de trabalho. O ensaio a 105 °C também não amplia a faixa de operação indicada, de −40 °C a +85 °C. O limite de ESR de 90 kΩ da peça Epson supera o requisito geral de 80 kΩ; essa divergência da fonte foi preservada e sua aceitação precisa ser confirmada para o projeto.

---

## Indutores buck { #buck-inductors }

!!! info "Requisitos"
    Indutância L = 4,7 µH ±20% · Resistência em corrente contínua (DCR) ≤ 0,4 Ω · Corrente de saturação (Isat) ≥ 450 mA

<div align="center"><em>Indutores buck qualificados</em></div>

<div align="center" markdown>

| Número de peça qualificado | Fornecedor | Tipo | Tolerância | SRF | DCR | Isat | Irms | Encapsulamento |
|:--------------|:-------|:-----|:----------|:----|:----|:-----|:-----|:--------|
| WPN201610U4R7MT | Sunlord | Bobinado | ±20% | 21 MHz | ≤288 mΩ | 1,3 A | 1,45 A | 0806 (padrão métrico 2016) |
| WPN201610H4R7MT | Sunlord | Bobinado | ±20% | 25 MHz | ≤425 mΩ | 1,2 A | 1,0 A | 0806 (padrão métrico 2016) |
| HTTX20161T-4R7MDR | Cyntec | Bobinado | ±20% | — | ≤250 mΩ | 1,7 A | 1,5 A | 0806 (padrão métrico 2016) |
| VLS201612CX-4R7M-1 | TDK | Bobinado | ±20% | 51 MHz | ≤252 mΩ | 0,88 A | 1,32 A | 0806 (padrão métrico 2016) |
| CIGW201610GL4R7MLE | Samsung | Bobinado | ±20% | — | ≤240 mΩ | 1,4 A | 1,4 A | 0806 (padrão métrico 2016) |
| DFE201612E-4R7M=P2 | Murata | Bobinado | ±20% | — | ≤252 mΩ | 1,8 A | 1,2 A | 0806 (padrão métrico 2016) |
| SWAI201610H4R7M | 三体微 | Bobinado | ±20% | — | ≤390 mΩ | 1,3 A | 1,05 A | 0806 (padrão métrico 2016) |
| FSHJ201610-4R7M | 方磁 | Bobinado | ±20% | — | ≤425 mΩ | 1,1 A | 0,9 A | 0806 (padrão métrico 2016) |

</div>

A inclusão nesta tabela não torna os oito indutores eletricamente intercambiáveis. WPN201610H4R7MT e FSHJ201610-4R7M têm DCR máxima indicada de 425 mΩ, acima do requisito geral de 0,4 Ω. A planilha não explica essa divergência; confirme a aceitação com a SiFli, em vez de presumir que atendem ao limite. Para cada candidato, verifique as perdas por DCR, Isat, Irms, SRF, footprint, altura e elevação de temperatura com base na corrente real do indutor e nas condições do conversor, não na corrente média do produto inteiro.

---

## Flash NOR { #nor-flash }

A V0.3 lista 44 referências de Flash NOR de 4 Mb a 256 Mb, agrupadas por capacidade. As frequências indicadas são das memórias e não garantem essas velocidades em qualquer dispositivo SF32 ou placa. Verifique os comandos de leitura, os limites do controlador, a temporização e a identificação pelo driver no seu projeto. A fonte chama os valores hexadecimais de “Manufacture ID”, mas eles também incluem campos de identificação do dispositivo: compare a resposta completa esperada, não apenas o byte do fabricante. Calcule o consumo ativo e em repouso com correntes cujas condições de operação estejam documentadas.

### 4 Mb – 16 Mb { #4-mb-16-mb }

Nenhum dos seis componentes desta faixa de capacidade aceita o modo DTR; por isso, a tabela mostra apenas uma coluna para a frequência SDR.

<div align="center"><em>Memórias Flash NOR de 4 Mb a 16 Mb qualificadas</em></div>

<div align="center" markdown>

| Número de peça qualificado | Fornecedor | Capacidade | Tensão | Faixa de temperatura | Frequência SDR máx. | ID informado | Corrente em repouso | Corrente em desligamento profundo | Corrente de leitura ativa |
|:--------------|:-------|:---------|:--------|:-----------|:---------------|:-------|:--------|:------------------|:----------------------|
| P25Q40SU | PUYA | 4 Mb | 1,65–3,6 V | −40 °C a +85 °C | 85 MHz @1,8 V / 104 MHz @3,3 V | 0x856013 | 10 µA | 0,1 µA @1,8 V / 0,6 µA @3,3 V | 3,5 mA @85 MHz (1,8 V) / 5 mA @85 MHz (3,3 V) / EDH: não suportado |
| P25Q80LE | PUYA | 8 Mb | 1,65–2,0 V | −40 °C a +85 °C | 104 MHz | 0x856014 | 9 µA | 0,1 µA | 1,5 mA @85 MHz / EDH: não suportado |
| GD25LE80E | GD (GigaDevice) | 8 Mb | 1,65–2,0 V | −40 °C a +85 °C | 133 MHz | 0xC86014 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: não suportado |
| UC25WQ80IB | UCUN | 8 Mb | 1,65–3,6 V | −40 °C a +85 °C | 104 MHz | 0xB36014 | 1,5 µA | 0,5 µA | 6 mA @85 MHz / EDH: não informado |
| P25Q16LE | PUYA | 16 Mb | 1,65–2,0 V | −40 °C a +85 °C | 104 MHz | 0x856015 | 18 µA | 0,1 µA | 3 mA @85 MHz / EDH: não suportado |
| GD25LE16E | GD (GigaDevice) | 16 Mb | 1,65–2,0 V | −40 °C a +85 °C | 133 MHz | 0xC86015 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: não suportado |

</div>

### 32 Mb – 64 Mb { #32-mb-64-mb }

<div align="center"><em>Memórias Flash NOR de 32 Mb a 64 Mb qualificadas</em></div>

<div align="center" markdown>

| Número de peça qualificado | Fornecedor | Capacidade | Tensão | Faixa de temperatura | Frequência máx. (SDR / DTR) | ID informado | Corrente em repouso | Corrente em desligamento profundo | Corrente de leitura ativa |
|:--------------|:-------|:---------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q32L | PUYA | 32 Mb | 1,65–2,0 V | −40 °C a +85 °C | 120 MHz / — | 0x856016 | 9 µA | 0,2 µA | 2 mA @85 MHz / EDH: não suportado |
| SK25LE032 | SK | 32 Mb | 1,65–2,0 V | −40 °C a +85 °C | 133 MHz / 80 MHz | 0x257016 | 10 µA | 0,1 µA | 2 mA @80 MHz (SDR) / 2,6 mA @80 MHz (DTR) |
| GD25LE32E | GD (GigaDevice) | 32 Mb | 1,65–2,0 V | −40 °C a +85 °C | 133 MHz / — | 0xC86016 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: não suportado |
| UC25IQ32A | UCUN | 32 Mb | 2,7–3,6 V | −40 °C a +85 °C | 133 MHz / 66 MHz | 0xB34014 | 15 µA | 1 µA | 8 mA @80 MHz / EDH: não informado |
| P25Q64LE | PUYA | 64 Mb | 1,65–2,0 V | −40 °C a +85 °C | 104 MHz / — | 0x856017 | 18 µA | 0,3 µA | 2 mA @85 MHz / EDH: não suportado |
| P25Q64H | PUYA | 64 Mb | 2,3–3,6 V | −40 °C a +85 °C | 120 MHz / — | 0x856017 | 18 µA | 0,6 µA | 4 mA @85 MHz / EDH: não suportado |
| P25Q64SH | PUYA | 64 Mb | 2,3–3,6 V | −40 °C a +85 °C | 120 MHz / 70 MHz | 0x856017 | 10 µA | 0,3 µA | 6,8 mA @85 MHz (SDR) / 9,45 mA @70 MHz (DTR) |
| GD25LE64E | GD (GigaDevice) | 64 Mb | 1,65–2,0 V | −40 °C a +85 °C | 133 MHz / — | 0xC86017 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: não suportado |
| ZB25LQ64A | ZBIT | 64 Mb | 1,65–2,0 V | −40 °C a +85 °C | 133 MHz / 66 MHz | 0x5E7017 | 10 µA | 1 µA | 4 mA @104 MHz / EDH: não informado |
| BY25Q64ES | BOYA | 64 Mb | 2,7–3,6 V | −40 °C a +85 °C | 120 MHz / — | 0x684017 | 9 µA | 0,4 µA | 6 mA @80 MHz / EDH: não suportado |
| UC25IQ64A | UCUN | 64 Mb | 2,7–3,6 V | −40 °C a +85 °C | 133 MHz / 66 MHz | 0xB34017 | 10 µA | 1 µA | 15 mA @80 MHz / EDH: não informado |

</div>

### 128 Mb { #128-mb }

<div align="center"><em>Memórias Flash NOR de 128 Mb qualificadas</em></div>

<div align="center" markdown>

| Número de peça qualificado | Fornecedor | Tensão | Faixa de temperatura | Frequência máx. (SDR / DTR) | ID informado | Corrente em repouso | Corrente em desligamento profundo | Corrente de leitura ativa |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q128L | PUYA | 1,65–2,0 V | −40 °C a +85 °C | 70 MHz / 43 MHz | 0x856018 | 15 µA | 0,5 µA | 4,5 mA @85 MHz / EDH: não informado |
| PY25Q128HA | PUYA | 2,7–3,6 V | −40 °C a +85 °C | 104 MHz / 66 MHz | 0x852018 | 15 µA | 1 µA | 7 mA @85 MHz (SDR) / 9 mA @66 MHz (DTR) |
| SK25LP128 | SK | 1,65–2,0 V | −40 °C a +85 °C | 166 MHz / 104 MHz | 0x257018 | 8 µA | 0,1 µA | 2 mA @80 MHz (SDR) / 2,6 mA @80 MHz (DTR) |
| GD25LQ128E | GD (GigaDevice) | 1,65–2,0 V | −40 °C a +85 °C | 120 MHz / — | 0xC86018 | 35 µA | 1 µA | 13 mA @80 MHz / EDH: não suportado |
| GD25Q128E | GD (GigaDevice) | 2,7–3,6 V | −40 °C a +85 °C | 133 MHz / — | 0xC84018 | 14 µA | 1 µA | 8 mA @80 MHz / EDH: não suportado |
| GD25F128F | GD (GigaDevice) | 2,7–3,6 V | −40 °C a +85 °C | 166 MHz / 104 MHz | 0xC84318 | 16 µA | 1 µA | 12 mA @80 MHz / EDH: não informado |
| W25Q128JW | Winbond | 1,7–1,95 V | −40 °C a +85 °C | 133 MHz / — | 0xEF6018 | 10 µA | 1 µA | — / EDH: não suportado |
| W25Q128JV | Winbond | 2,7–3,6 V | −40 °C a +85 °C | 133 MHz / — | 0xEF4018 | 10 µA | 1 µA | 12 mA @104 MHz / EDH: não suportado |
| XT25F128F | XTX | 2,7–3,6 V | −40 °C a +85 °C | 133 MHz / 104 MHz | 0x0B4018 | 15 µA | 1 µA | 8 mA @80 MHz / EDH: não informado |
| XT25Q128DW | XTX | 1,7–2,0 V | −40 °C a +85 °C | 108 MHz / 76 MHz | 0x0B6018 | 12 µA | 0,4 µA | 9 mA @80 MHz / EDH: não informado |
| FM25W128 | FM | 1,65–3,6 V | −40 °C a +85 °C | 50 MHz @1,8 V / 100 MHz @3,3 V (somente SDR, sem suporte a DTR) | 0xA12818 | 5 µA | 1 µA @3,3 V | — / EDH: não suportado |
| XM25QU128C | XMC | 1,65–1,95 V | −40 °C a +85 °C | 133 MHz / — | 0x204118 | 18 µA | 6 µA | 6 mA @66 MHz / EDH: não suportado |
| ZB25VQ128D | ZBIT | 2,3–3,6 V | −40 °C a +85 °C | 104 MHz / — | 0x5E4018 | 10 µA | 1 µA | 4 mA @104 MHz / EDH: não suportado |
| ZB25LQ128B | ZBIT | 1,65–2,0 V | −40 °C a +85 °C | 104 MHz / — | 0x5E5018 | 9 µA | 3 µA | 9 mA @104 MHz / EDH: não suportado |
| BY25Q128ES | BOYA | 2,7–3,6 V | −40 °C a +85 °C | 108 MHz / — | 0x684018 | 14 µA | 0,2 µA | 6 mA @80 MHz / EDH: não suportado |
| UC25IQ128A | UCUN | 2,7–3,6 V | −40 °C a +85 °C | 133 MHz / 66 MHz | 0xB34018 | 15 µA | 1 µA | 12 mA @80 MHz / EDH: não informado |

</div>

### 256 Mb { #256-mb }

<div align="center"><em>Memórias Flash NOR de 256 Mb qualificadas</em></div>

<div align="center" markdown>

| Número de peça qualificado | Fornecedor | Tensão | Faixa de temperatura | Frequência máx. (SDR / DTR) | ID informado | Corrente em repouso | Corrente em desligamento profundo | Corrente de leitura ativa |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| W25Q256JW | Winbond | 1,7–1,95 V | −40 °C a +85 °C | 133 MHz / — | 0xEF6019 | 10 µA | 1 µA | 8 mA @80 MHz / EDH: não suportado |
| W25Q256JV | Winbond | 2,7–3,6 V | −40 °C a +85 °C | 133 MHz / — | 0xEF7019 | 10 µA | 1 µA | 12 mA @104 MHz / EDH: não suportado |
| PY25Q256HB | PUYA | 2,7–3,6 V | −40 °C a +85 °C | 133 MHz / 100 MHz | 0x852019 | 20 µA | 1 µA | 7 mA @80 MHz (SDR) / 11,5 mA @80 MHz (DTR) |
| GD25LQ256D | GD (GigaDevice) | 1,65–2,0 V | −40 °C a +85 °C | 120 MHz / — | 0xC86019 | 70 µA | 2 µA | 10 mA @80 MHz / EDH: não suportado |
| GD25Q256E | GD (GigaDevice) | 2,7–3,6 V | −40 °C a +85 °C | 133 MHz / — | 0xC84019 | 16 µA | 1 µA | 12 mA @80 MHz / EDH: não suportado |
| XM25QU256C | XMC | 1,65–1,95 V | −40 °C a +85 °C | 133 MHz / — | 0x204119 | 15 µA | 7 µA | 11 mA @66 MHz / EDH: não suportado |
| XM25QH256C | XMC | 2,3–3,6 V | −40 °C a +85 °C | 133 MHz / — | 0x204019 | 15 µA | 7 µA | 7 mA @66 MHz / EDH: não suportado |
| XT25F256BW | XTX | 2,7–3,6 V | −40 °C a +85 °C | 104 MHz / 50 MHz | 0x0B4019 | 15 µA | 0,5 µA | 8 mA @80 MHz / EDH: não informado |
| DS25M4BA | Dosilicon | 1,65–1,95 V | −40 °C a +85 °C | 108 MHz / 80 MHz | 0xE54219 | 15 µA | 5 µA | 13 mA @108 MHz / EDH: não informado |
| BY25Q256FS | BOYA | 2,7–3,6 V | −40 °C a +85 °C | 100 MHz / 54 MHz | 0x684919 | 28 µA | 2 µA | 13 mA @80 MHz / EDH: não informado |
| MX25U25643G | MXIC (Macronix) | 1,65–2,0 V | −40 °C a +85 °C | 133 MHz / 54 MHz | 0xC22539 | 15 µA | 0,8 µA | 7 mA @84 MHz / EDH: não informado |

</div>

!!! warning "Correntes e limites de modo exigem as condições originais"
    São valores registrados na AVL, não medições independentes deste site. Sem indicação explícita, não presuma que um valor é típico ou máximo, nem que condições não informadas de tensão, temperatura e clock coincidem com as de outra linha. Confira o datasheet e meça a sua placa. As correntes de leitura vêm das colunas `EBH` e `EDH` da fonte. “—” em uma célula de corrente indica um valor não informado; na coluna de clock DTR, representa um modo indicado como não suportado. A fonte chama a segunda coluna de clock de `TDR`; esta página usa `DTR`, mas o modo de leitura e o comando precisam ser verificados para a peça exata.

    As indicações EDH preservam a distinção da fonte entre dados ausentes e operação não suportada; não são deduzidas da coluna de frequência. Há uma inconsistência no P25Q128L: a frequência SDR máxima é de 70 MHz, mas a corrente de leitura é especificada a 85 MHz. Ambos os valores são mantidos; confirme as condições válidas antes de usá-los.

---

## Flash SPI-NAND { #spi-nand-flash }

A V0.3 lista 18 referências SPI-NAND de 512 Mb e 1 Gb. Com um driver e uma pilha de software compatíveis, elas podem armazenar arquivos ou dados; FatFS, FlashDB e LittleFS são exemplos, mas é necessário validar a compatibilidade com a referência escolhida. O acesso página a página, o ECC e o gerenciamento de blocos defeituosos da NAND diferem do acesso XIP direto em NOR. A planilha indica **Golden Block** como `block0` para todas as referências, sem especificar as condições da garantia nem quais rotinas de firmware dependem dele. Confirme essas premissas na documentação do dispositivo e do SDK.

Para GD5F1GM7RE e GD5F1GM7UE, a fonte informa `2048+64` bytes por página, mas `128K+8K` bytes por bloco. Os tamanhos da área de reserva não coincidem com um cálculo direto a partir das páginas. A tabela mantém os dois valores; confirme a geometria das páginas, dos blocos e das áreas de reserva no datasheet do componente exato antes de configurar o driver.

### 512 Mb { #512-mb }

<div align="center"><em>Memórias Flash SPI-NAND de 512 Mb qualificadas</em></div>

<div align="center" markdown>

| Número de peça qualificado | Fornecedor | Tensão | Faixa de temperatura | ID informado | Tamanho da página/do bloco | Taxa máx. | ECC | Golden Block | Corrente em repouso | Corrente de leitura de página | Corrente de programação/apagamento |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| F35SQA512M | FORESEE | 2,7–3,6 V | −40 °C a +85 °C | 0xCD7070 | 2048+64 B / 128K+4K | 133 MHz | HW, 1 bit | `block0` | 10 µA | 10 mA | 15 mA |
| F35UQA512M | FORESEE | 1,7–1,95 V | −40 °C a +85 °C | 0xCD6060 | 2048+64 B / 128K+4K | 104 MHz | HW, 1 bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35M12B | Dosilicon | 1,7–1,95 V | −40 °C a +85 °C | 0xE5A5E5 | 2048+128 B / 128K+8K | 83 MHz | HW, 8 bits | `block0` | 10 µA | 10 mA | 15 mA |
| DS35Q12B | Dosilicon | 2,7–3,6 V | −40 °C a +85 °C | 0xE5F5E5 | 2048+128 B / 128K+8K | 104 MHz | HW, 8 bits | `block0` | 10 µA | 10 mA | 15 mA |

</div>

### 1 Gb { #1-gb }

<div align="center"><em>Tabela: memórias Flash SPI-NAND de 1 Gb qualificadas</em></div>

<div align="center" markdown>

| Número de peça qualificado | Fornecedor | Tensão | Faixa de temperatura | ID informado | Tamanho da página/do bloco | Taxa máx. | ECC | Golden Block | Corrente em repouso | Corrente de leitura de página | Corrente de programação/apagamento |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| W25N01GW | Winbond | 1,7–1,95 V | −40 °C a +85 °C | 0xEFBA21 | 2048+64 B / 128K+4K | 104 MHz | HW, 1 bit | `block0` | 10 µA | 25 mA | 25 mA |
| W25N01GV | Winbond | 2,7–3,6 V | −40 °C a +85 °C | 0xEFAA21 | 2048+64 B / 128K+4K | 104 MHz | HW, 1 bit | `block0` | 10 µA | 25 mA | 25 mA |
| GD5F1GM7RE | GD (GigaDevice) | 1,7–2,0 V | −40 °C a +85 °C | 0xC881C8 | 2048+64 B / 128K+8K | 104 MHz SDR / 80 MHz DTR | HW, 8 bits | `block0` | 10 µA | 10 mA | 10 mA |
| GD5F1GM7UE | GD (GigaDevice) | 2,7–3,6 V | −40 °C a +85 °C | 0xC891C8 | 2048+64 B / 128K+8K | 133 MHz SDR / 104 MHz DTR | HW, 8 bits | `block0` | 10 µA | 15 mA | 15 mA |
| F35SQA001G | FORESEE | 2,7–3,6 V | −40 °C a +85 °C | 0xCD7171 | 2048+64 B / 128K+4K | 104 MHz | HW, 1 bit | `block0` | 10 µA | 10 mA | 15 mA |
| HYF1GQ4IDACAE | HeYangTek | 1,7–1,98 V | −40 °C a +85 °C | 0xC981C9 | 2048+64 B / 128K+4K | 80 MHz | HW, 4 bits | `block0` | 10 µA | 5 mA | — |
| HYF1GQ4UDACAE | HeYangTek | 2,7–3,6 V | −40 °C a +85 °C | 0xC921C9 | 2048+64 B / 128K+4K | 108 MHz | HW, 4 bits | `block0` | 10 µA | 15 mA | — |
| XT26Q01D | XTX | 1,7–1,95 V | −40 °C a +85 °C | 0x0B5100 | 2048+128 B / 128K+8K | 108 MHz | HW, 8 bits | `block0` | 15 µA | 26 mA | 28 mA / 18 mA |
| XT26G01C | XTX | 2,7–3,6 V | −40 °C a +85 °C | 0x0B3100 | 2048+128 B / 128K+8K | 104 MHz | HW, 8 bits | `block0` | 180 µA | 25 mA | 30 mA / 25 mA |
| DS35M1GB | Dosilicon | 1,7–1,95 V | −40 °C a +85 °C | 0xE5A1E5 | 2048+128 B / 128K+8K | 83 MHz | HW, 8 bits | `block0` | 10 µA | 10 mA | 15 mA |
| DS35Q1GB | Dosilicon | 2,7–3,6 V | −40 °C a +85 °C | 0xE5F1E5 | 2048+128 B / 128K+8K | 104 MHz | HW, 8 bits | `block0` | 10 µA | 10 mA | 15 mA |
| ZB35Q01A | ZBIT | 2,7–3,6 V | −40 °C a +85 °C | 0x5E415E | 2048+64 B / 128K+4K | 80 MHz | HW, 8 bits | `block0` | 10 µA | 10 mA | 10 mA |
| FM25SL01 | FM | 1,75–1,95 V | −40 °C a +85 °C | 0xA1A5A1 | 2048+128 B / 128K+8K | 80 MHz | HW, 1 bit | `block0` | 10 µA | 16 mA | 16 mA |
| TC58CYG0S3HRAIJ | KIOXIA | 1,7–1,95 V | −40 °C a +85 °C | 0x98D240 | 2048+64 B / 128K+4K | 133 MHz | HW, 8 bits | `block0` | 30 µA | 17 mA | 26 mA |

</div>

Antes de implementar a detecção de Flash, consulte em cada datasheet a sequência de leitura do ID JEDEC/do fabricante. O número de bytes retornados após o opcode `0x9F` varia conforme o fornecedor: alguns retornam um ID de dispositivo de dois bytes, `DID1` + `DID2`; outros retornam apenas um byte. Por isso, um componente de um fornecedor alternativo pode não ser reconhecido durante a inicialização.

---

### Sequências de leitura de ID da fonte { #read-jedec-id-sequences }

A planilha registra os três formatos de leitura de ID abaixo. `MID` indica o ID do fabricante; `DID`, `DID1` e `DID2` indicam campos de ID do dispositivo. São sequências de texto reproduzidas da fonte, não transações diretamente executáveis. Antes de implementar o driver, confirme o opcode, a fase dummy ou de endereço, a quantidade de bytes retornados e a temporização do chip select no datasheet da peça exata. Os IDs hexadecimais das tabelas nem sempre representam um único byte de ID do fabricante.

<div align="center"><em>Sequências de leitura de ID SPI-NAND registradas na V0.3</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Componentes | Sequência da fonte |
|:---|:---|
| F35SQA512M, F35UQA512M, W25N01GW, W25N01GV, F35SQA001G, TC58CYG0S3HRAIJ | `9F+dummy(8bit)+MID+DID1+DID2` |
| DS35M12B, DS35Q12B, GD5F1GM7RE, GD5F1GM7UE, DS35M1GB, DS35Q1GB, FM25SL01 | `9F+dummy(8bit)+MID+DID` |
| HYF1GQ4IDACAE, HYF1GQ4UDACAE, XT26Q01D, XT26G01C, ZB35Q01A | `9F+00+MID+DID` |

</div>

---

## Flash SD-NAND { #sd-nand-flash }

A V0.3 lista cinco componentes SD-NAND qualificados de 1 Gb com interface SD 2.0. Eles são candidatos para armazenamento fixo acessado por uma interface SD, sem um slot físico para cartão. Antes da seleção, confirme a compatibilidade do controlador e do driver com o componente exato e o projeto do produto.

<div align="center"><em>Memórias Flash SD-NAND qualificadas</em></div>

<div align="center" markdown>

| Número de peça qualificado | Fornecedor | Faixa de temperatura | Tensão | Interface | Frequência máx. | Corrente em repouso | Corrente de operação |
|:--------------|:-------|:-----------|:--------|:----------|:----------|:--------|:---------------------|
| CSNP1GCR01-BOW | CS | −30 °C a +85 °C | 2,7–3,6 V | SD 2.0 | 50 MHz | 150 µA (típ.) | 15 mA @50 MHz (típ.) |
| XTSD01GLGEAG | XTX | −30 °C a +85 °C | 2,7–3,6 V | SD 2.0 | 50 MHz | 200 µA (máx.) | 30 mA @50 MHz (máx.) |
| XSSD01GGAI | XSS | 0 °C a +70 °C | 2,7–3,6 V | SD 2.0 | 50 MHz | 300 µA (máx.) | 45 mA @50 MHz (máx.) |
| MKDV1GCL-AB | MK | −25 °C a +85 °C | 2,7–3,6 V | SD 2.0 | 50 MHz | 50 µA (máx.) | 28 mA @50 MHz (máx.) |
| XS26D01GACW | Icthink | −25 °C a +85 °C | 2,7–3,6 V | SD 2.0 | 50 MHz | 250 µA (máx.) | 100 mA @50 MHz (máx.) |

</div>

A XSSD01GGAI é indicada para 0 °C a +70 °C. As outras quatro referências têm limites inferiores de −25 °C ou −30 °C e limite superior de +85 °C. Use os limites reais de cada linha, sem presumir uma mesma classe de temperatura, e verifique a margem necessária para o ambiente do produto.

---

## Controlador LCD { #lcd-driver }

!!! warning "Controladores de display listados na V0.3"
    A V0.3 lista um controlador LCD. A [planilha V0.3](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx) é uma versão fixa, não um link para revisões futuras. Uma referência ausente não significa falta de suporte; confirme com a SiFli antes de selecioná-la para produção. MIPI e QSPI são interfaces do controlador de display, não necessariamente de todos os dispositivos SF32. Verifique as interfaces e o driver do chip escolhido; consulte a [visão geral de gráficos](../../learn/graphics/overview.md) e a [arquitetura da GPU ePicasso](../../learn/graphics/epicasso-gpu.md). A fonte indica `?MHz` para SDR, sem valor definido, e registra DDR como não suportado.

<div align="center"><em>Controladores LCD qualificados</em></div>

<div align="center" markdown>

| Número de peça qualificado | Fornecedor | Resolução | Tipo | Tensão de E/S | Interface | GRAM | Profundidade de cor | Taxa máx. (SDR / DDR) |
|:--------------|:-------|:-----------|:-----|:-----------|:----------|:-----|:--------------|:--------------------------|
| RM69090 | Raydium | 368×448 | AMOLED | 1,65–3,3 V | MIPI, QSPI | Sim | 16,7 milhões de cores | Não especificada / não suportada |

</div>

---

## Controlador de painel de toque { #touch-panel-controller }

A V0.3 não contém referências de controladores de toque. Isso não determina a situação de qualificação em revisões posteriores nem significa que um dispositivo não tenha suporte. Para um componente em avaliação, peça à equipe FAE ou comercial da SiFli que confirme a qualificação e o suporte do driver, informando o número de peça comercial exato e os requisitos do produto. Consulte as [informações de contato](../../about/index.md).

---

## Checklist da revisão de projeto { #design-review-checklist }

Antes de congelar o esquemático ou a BOM, confira cada componente escolhido na AVL em relação ao projeto real do produto:

- [ ] O número de peça, encapsulamento, grau de temperatura e sufixo de pedido exatos correspondem à linha aprovada ou têm um processo explícito de aprovação de engenharia.
- [ ] A faixa de tensão corresponde à alimentação de E/S do SF32, da Flash, do display ou do conversor de potência usado na placa.
- [ ] O encapsulamento, o padrão de pads, a altura e as restrições de montagem são compatíveis com a biblioteca de PCB e o processo de fabricação.
- [ ] Quando aplicável, o firmware identifica corretamente a peça pelo ID JEDEC/do fabricante ou por uma verificação equivalente em tempo de execução.
- [ ] O comportamento de inicialização, gravação, OTA, sistema de arquivos, display ou driver de toque foi verificado com a peça exata.
- [ ] A corrente nos modos de baixo consumo foi medida em hardware real, e não copiada diretamente da AVL ou do datasheet do componente.
- [ ] O desvio de frequência do cristal, o comportamento de CBANK_SEL e a calibração RF foram validados na PCB, na antena e no gabinete finais.
- [ ] Os tempos de apagamento, programação e leitura da Flash foram testados na faixa de tensão e temperatura prevista para o produto.
- [ ] Foi identificado pelo menos um fornecedor alternativo para cada item de alto risco da BOM, como cristais, indutores, Flash e painéis de display.

Este checklist é intencionalmente mais rigorosa do que “a peça aparece na AVL”. A AVL reduz o espaço de busca, mas a liberação do produto ainda depende de evidências obtidas na placa.

## Checklist de fornecimento { #sourcing-checklist }

- [ ] Confira o número de peça e o sufixo de revisão na versão atual da AVL para download: versões da planilha, inclusive esta página, ficam desatualizadas à medida que novos lotes são qualificados.
- [ ] Para memórias Flash, confirme que o ID do fabricante/JEDEC esperado pelo código de bring-up corresponde à peça exata encomendada, não apenas à família. Algumas famílias compartilham o nome comercial, mas retornam bytes de ID diferentes.
- [ ] Para NAND, SD-NAND e qualquer componente que armazene um sistema de arquivos, verifique em hardware real o suporte de inicialização e da ferramenta de gravação, o fluxo de atualização OTA e o comportamento de FatFS/FlashDB/LittleFS. Uma peça que responde corretamente durante o bring-up não está automaticamente validada para OTA.
- [ ] Valide CBANK_SEL e o desvio de frequência TX Ch39 indicado na sua placa. A planilha não especifica o layout de referência nem a configuração completa de medição; confirme o modo e as condições de teste antes de comparar resultados.
- [ ] Meça na sua placa as correntes em repouso, no modo deep-power-down e durante a leitura ativa. A AVL não documenta completamente a origem e as condições de cada valor; verifique o datasheet e as condições de medição.
- [ ] Não se limite às especificações elétricas: confirme também se o encapsulamento e o footprint correspondem à biblioteca de PCB e à capacidade de montagem.
- [ ] Antes de incluir na BOM uma peça ainda não listada, qualifique-a conforme os requisitos da classe correspondente e considere compartilhar os dados de qualificação com a SiFli.
- [ ] Identifique uma segunda fonte para cada item com fornecedor único. A V0.3 lista um controlador LCD e nenhum controlador de toque; confirme a disponibilidade e o suporte atuais sem tratar essa versão como a situação mais recente.
- [ ] Revise esta lista antes de cada congelamento importante da BOM: ela é um registro datado, não uma base de dados atualizada em tempo real.

## Páginas relacionadas { #related-pages }

- [Guia de projeto de hardware do SF32LB52x](../chip-guides/SF32LB52x_hardware_design_guide.md) — orientações de esquemático e layout que fazem referência direta a vários componentes desta lista.
- Guia de projeto de hardware do SF32LB57x
- [Família SF32](../../sf32-products/family/SF32_family.md)
