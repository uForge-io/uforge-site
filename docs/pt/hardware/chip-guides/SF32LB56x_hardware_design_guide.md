---
icon: lucide/book-check
description: "Guia de projeto de hardware do microcontrolador SF32LB56x: alimentação, geração de clock, RF, display, áudio e layout da PCB."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# Guia de projeto de hardware SF32LB56x { #sf32lb56x-hardware-design-guide }

## 1. Introdução { #1-introduction }

Este guia apresenta recomendações e materiais de referência para produtos baseados nos microcontroladores AIoT da família SF32LB56x, otimizados para aplicações gráficas. Destina-se a engenheiros de hardware, projetistas de PCB e desenvolvedores de smartwatches, sistemas HMI conectados, dispositivos médicos e de saúde, equipamentos industriais portáteis, instrumentos portáteis e displays avançados para bicicletas e scooters elétricas.

O guia cobre todo o processo de desenvolvimento de hardware para projetos com SF32LB56xU e SF32LB56xV, incluindo seleção do encapsulamento, alimentação do PMIC e do processador, reset, modo de boot, modos de operação, cristais, RF, display, armazenamento, áudio, sensores, planejamento dos pinos UART/I2C/GPTIM, layout da PCB, validação e preparação para produção. Seguir estas recomendações ajuda a reduzir riscos no esquemático e no layout, preservar o comportamento de baixo consumo e manter visíveis as diferenças entre as variantes U e V ao longo do projeto.

Este documento pressupõe conhecimentos básicos de projeto de hardware embarcado, captura de esquemáticos e layout de PCB. Ele complementa as notas de aplicação de hardware, datasheets, manuais do usuário e projetos de referência do SF32LB56xU e do SF32LB56xV, além da Lista de Fornecedores Aprovados da SiFli (AVL). Esses materiais oficiais continuam sendo a referência para especificações elétricas, multiplexação de pinos, dimensões dos encapsulamentos, qualificação de componentes e limites de produção.

## 2. Recursos de desenvolvimento { #2-development-resources }

[SF32LB56xU Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[SF32LB56xV Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[SF32LB56xU Hardware Application Source]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[SF32LB56xV Hardware Application Source]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[SF32 Family Overview]: ../../sf32-products/family/SF32_family.md
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Nota de aplicação de hardware do SF32LB56xU][SF32LB56xU Hardware Application Note]__
- :fontawesome-solid-file-lines: __[Nota de aplicação de hardware do SF32LB56xV][SF32LB56xV Hardware Application Note]__
- :fontawesome-brands-github: __[Código-fonte da nota de aplicação do SF32LB56xU][SF32LB56xU Hardware Application Source]__
- :fontawesome-brands-github: __[Código-fonte da nota de aplicação do SF32LB56xV][SF32LB56xV Hardware Application Source]__
- :fontawesome-solid-file-excel: __[Lista de Fornecedores Aprovados da SiFli (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__

</div>

## 3. Visão geral do dispositivo { #3-device-overview }

### 3.1. Arquitetura { #31-architecture }

O SF32LB56x é voltado a produtos com displays e interfaces HMI mais sofisticados que os de nós de sensores exclusivamente BLE. As notas oficiais de aplicação de hardware das variantes U e V abordam os mesmos aspectos de projeto: distribuição de energia com PMIC, cristais de 48 MHz e 32,768 kHz, projeto de RF, seleção das interfaces de display e armazenamento, áudio, pinos PBR, sensores, planejamento de UART/I2C/GPTIM, depuração e gravação, além da calibração do cristal na produção.

### 3.2. Variantes e encapsulamentos { #32-variants-and-packages }

<div align="center"><em>Tabela 3.2-1: Variantes de encapsulamento do SF32LB56x</em></div>

<div align="center" markdown>

| Variante | Encapsulamento | Dimensões | Passo dos pinos | Diâmetro das esferas |
|:---|:---|:---|:---|:---|
| SF32LB56xU | QFN68L | 7 × 7 × 0,75 mm | 0,35 mm | - |
| SF32LB56xV | WBBGA175 | 6,5 × 6,1 × 0,94 mm | 0,4 mm | 0,25 mm |

</div>

A variante U usa o encapsulamento QFN68L. A variante V usa o WBBGA175 e exige um planejamento mais cuidadoso do fanout, das vias e do processo HDI.

![Figura 3.2-1: Distribuição dos pinos do SF32LB56xU QFN68L](../../sf32-products/chips/assets/56x/sf32lb56xU-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-1: Distribuição dos pinos do SF32LB56xU QFN68L</em></div>

![Figura 3.2-2: Distribuição dos pinos do SF32LB56xV WBBGA175](../../sf32-products/chips/assets/56x/sf32lb56xV-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-2: Distribuição dos pinos do SF32LB56xV WBBGA175</em></div>

### 3.3. Principais recursos de hardware { #33-major-hardware-features }

- Distribuição de energia centralizada no PMIC, com exemplos baseados no SF30147C.
- Requisitos dos cristais de 48 MHz e 32,768 kHz e modelos recomendados.
- Projeto de RF Bluetooth e requisitos de casamento da antena.
- Display SPI/QSPI e JDI na variante U; SPI/QSPI, MCU8080, DPI e JDI na variante V.
- Opções de memória externa e armazenamento de boot, incluindo interfaces SDIO/eMMC/SD NAND.
- Botões, motor de vibração, interface de áudio, pinos PBR, sensores, UART/I2C, GPTIM, depuração/gravação e calibração.

### 3.4. Aplicações típicas { #34-typical-applications }

![Figura 3.4-1: Diagrama de blocos de uma aplicação de smartwatch com SF32LB56xU](../../sf32-products/chips/assets/56x/sf32lb56xU-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.4-1: Diagrama de blocos de uma aplicação de smartwatch com SF32LB56xU</em></div>

![Figura 3.4-2: Diagrama de blocos de uma aplicação de smartwatch com SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.4-2: Diagrama de blocos de uma aplicação de smartwatch com SF32LB56xV</em></div>

O SF32LB56x é adequado para smartwatches, painéis HMI conectados, produtos de saúde, equipamentos industriais portáteis, instrumentos portáteis e produtos com displays avançados que precisam de Bluetooth, áudio, sensores, memória externa e uma interface de usuário mais sofisticada.

## 4. Projeto em resumo { #4-design-at-a-glance }

### 4.1. Resumo de engenharia { #41-engineering-summary }

<div align="center"><em>Tabela 4.1-1: Resumo do projeto com SF32LB56x</em></div>

<div align="center" markdown>

| Aspecto | SF32LB56xU | SF32LB56xV |
|:---|:---|:---|
| Encapsulamento | QFN68L, 7 × 7 × 0,75 mm, passo de 0,35 mm | WBBGA175, 6,5 × 6,1 × 0,94 mm, passo de 0,4 mm |
| Display | As principais interfaces documentadas são SPI/QSPI e JDI | As interfaces documentadas são SPI/QSPI, MCU8080, DPI e JDI |
| Processo de fabricação da PCB | Roteamento e fanout compactos para QFN | Planejamento BGA/HDI, avaliação de vias cegas/enterradas e controle mais rigoroso do fanout |
| Alimentação | Linhas de alimentação do processador e distribuição por PMIC SF30147C | Linhas de alimentação do processador e distribuição por PMIC SF30147C, com atribuições de carga específicas da variante V |
| Armazenamento | Projeto de memória externa pelos pinos de armazenamento documentados do SF32LB56xU | Projeto de memória externa pelos pinos de armazenamento documentados do SF32LB56xV |

</div>

### 4.2. Fluxo de projeto de hardware { #42-hardware-design-flow }

1. Selecione a variante U ou V, o encapsulamento, a interface de display, a opção de armazenamento e o processo de fabricação da PCB.
2. Defina a distribuição de energia pelo PMIC, as linhas de alimentação do processador, reset, carregamento e controle de baixo consumo.
3. Selecione os cristais, o casamento de RF e os circuitos de display, armazenamento, áudio, sensores, botões, motor e PBR.
4. Fixe as atribuições dos pinos e verifique conflitos entre display, armazenamento, áudio, depuração, despertar e funções de produção.
5. Revise fanout, stack-up, impedância, RF, clocks, USB/SDIO, áudio, conversores DC-DC e proteção ESD da PCB.
6. Execute o checklist antes de congelar o esquemático, liberar o layout, iniciar a EVT e liberar o gabarito de produção.

### 4.3. Pacote de evidências da revisão { #43-review-evidence-pack }

Antes da EVT, arquive a versão dos documentos-fonte das variantes U/V, as versões do datasheet e do manual do usuário, o PDF do esquemático, o stack-up da PCB, a capacidade do processo de fabricação, os relatórios DRC/ERC, a configuração do PMIC, a árvore de alimentação, a configuração de boot/armazenamento, capturas de tela do roteamento do display e do layout de RF/cristal, capturas das áreas de áudio/analógica e o plano de gravação/calibração para produção.

### 4.4. Como usar os checklists { #using-the-checklists }

Este guia apresenta os checklists em dois níveis. A lista resumida da Seção 7 reúne os itens de maior risco para uma revisão rápida da equipe de engenharia. O [Checklist do esquemático](SF32LB56x_schematic_checklist.md) (Seção 5.8) e a Seção 6.3 das [Diretrizes de layout da PCB](SF32LB56x_pcb_layout.md) reproduzem, item por item, a lista completa da SiFli, *SF32LB56x Schematic & PCB Checklist* (V1.0, 2026-01-21), publicada junto com os materiais de projeto de hardware no [wiki da SiFli][SiFli Chip Hardware Design Guide Index (Wiki)]. O documento abrange as famílias SF32LB56xU e SF32LB56xV, além da variante SS6700A.

Cada item indica a quais grupos de chips se aplica e se é obrigatório (deve ser aprovado antes da liberação) ou opcional (recomendado quando o recurso correspondente é usado). O texto colorido e o texto com <span class="flag-yellow">fundo amarelo</span> preservam os destaques de revisão da planilha original. Como a planilha não explica o motivo de cada destaque, considere-os sinalizações adicionais de atenção, não substitutos dos demais itens da mesma tabela.

Use o [Checklist do esquemático](SF32LB56x_schematic_checklist.md) durante a revisão do esquemático, antes de iniciar o layout da PCB. Use o checklist de layout (Seção 6.3) durante a revisão do layout, antes de liberar os arquivos Gerber. Na prática, cada etapa costuma ser feita duas vezes: primeiro pelo engenheiro responsável pelo projeto e, depois, por um revisor independente antes do congelamento do projeto ou da liberação para fabricação.

Para obter melhores resultados, use o checklist como registro formal de aprovação, não apenas como material de consulta:

1. Primeiro, confirme o código exato do componente e o encapsulamento escolhido.
2. Durante a revisão, marque cada item como aprovado, reprovado ou não aplicável; não se limite a ler a tabela.
3. Compare os itens sobre display, armazenamento, despertar e baixo consumo com as seções correspondentes do guia de projeto de hardware.
4. Registre nas notas da revisão as premissas específicas do encapsulamento, sobretudo SF32LB56xU ou SF32LB56xV, QFN ou WBBGA, display DSI ou SPI e uso de SD2/MPI3 para armazenamento.

<div align="center"><em>Tabela 4.4-1: Modelo de registro da revisão</em></div>

<div align="center" markdown>

| Campo | Valor |
|:---|:---|
| Nome do cliente | |
| Nome do projeto do cliente | |
| Data de envio para revisão | |
| Revisor inicial | |
| Data da revisão inicial | |
| Revisor de acompanhamento | |
| Data da revisão de acompanhamento | |

</div>

<div align="center"><em>Tabela 4.4-2: Histórico de versões do checklist</em></div>

<div align="center" markdown>

| Nº | Versão | Data | Notas da versão |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Primeira publicação do documento Schematic & PCB Checklist |

</div>

[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## Continue a leitura do guia de projeto { #continue-the-design-guide }

O guia completo continua nas páginas abaixo. Cada uma aborda uma etapa do processo de projeto.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Diretrizes para o esquemático](SF32LB56x_schematic_design.md)__ — alimentação, modos de operação e fontes de despertar, geração de clock, RF, interfaces de display/toque/retroiluminação, armazenamento/sensores/áudio/conectividade e fabricação
- :fontawesome-solid-list-check: __[Checklist do esquemático](SF32LB56x_schematic_checklist.md)__ — revisão do esquemático item por item (Seção 5.8)
- :fontawesome-solid-microchip: __[Diretrizes de layout da PCB](SF32LB56x_pcb_layout.md)__ — footprint, stack-up, roteamento crítico e checklist de layout item por item
- :fontawesome-solid-book-open: __[Checklist de revisão do projeto e referências](SF32LB56x_review_and_reference.md)__ — lista de liberação, documentos relacionados, apêndices e histórico de revisões

</div>
