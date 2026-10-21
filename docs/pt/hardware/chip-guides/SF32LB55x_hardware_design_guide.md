---
icon: lucide/book-check
hide:
    - navigation
description: "Guia de projeto de hardware do microcontrolador SF32LB55x: alimentação, clocks, casamento de RF, interfaces de armazenamento e display, e layout da PCB."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware SF32LB55x { #sf32lb55x-hardware-design-guide }

## 1. Introdução { #1-introduction }

Este guia reúne recomendações e materiais de referência para produtos baseados na família SF32LB55x, composta por microcontroladores de uso geral para aplicações AIoT. Destina-se a engenheiros de hardware, projetistas de PCB e desenvolvedores de produtos para wearables BLE, dispositivos alimentados por bateria e equipados com vários sensores, equipamentos de monitoramento da saúde e sistemas conectados compactos.

O guia cobre todo o processo de desenvolvimento de hardware: seleção do encapsulamento, projeto da alimentação, circuitos de clock, layout de RF, memória externa e interfaces de display. Também aborda fontes de despertar, sensores, áudio, acesso para depuração, layout da PCB, validação e preparação para produção. Seguir estas recomendações ajuda a reduzir os riscos do esquemático e do layout, preservar a operação de baixo consumo e manter o projeto alinhado aos requisitos do SF32LB55x para encapsulamento, alimentação, memória, RF e interfaces.

Este documento pressupõe familiaridade básica com projeto de hardware embarcado e captura de esquemáticos. Ele complementa o datasheet, o manual do usuário, a nota oficial de aplicação de hardware, os projetos de referência e a Lista de Fornecedores Aprovados da SiFli (AVL). Esses materiais oficiais continuam sendo a referência para especificações elétricas, multiplexação de pinos, dimensões dos encapsulamentos, qualificação de componentes e limites de produção.

O SF32LB55x usa uma convenção legada de sufixos. Para verificar quais interfaces estão disponíveis, quais recursos dependem do encapsulamento e qual é a configuração exata da memória, consulte o código completo da peça e a documentação do encapsulamento; não deduza essas informações apenas pelo sufixo.

## 2. Recursos de desenvolvimento { #2-development-resources }

[SF32LB55x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[SF32LB55x Hardware Application Source]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[SF32LB55x Datasheet]: https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[SF32LB55x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501%E2%80%90SF32LB55x%E2%80%90EN.pdf
[SF32LB55x SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[SF32LB55x API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[SF32 Family Overview]: ../../sf32-products/family/SF32_family.md
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Nota de aplicação de hardware do SF32LB55x][SF32LB55x Hardware Application Note]__
- :fontawesome-brands-github: __[Arquivo-fonte da nota de aplicação de hardware do SF32LB55x][SF32LB55x Hardware Application Source]__
- :fontawesome-solid-file-pdf: __[Datasheet do SF32LB55x][SF32LB55x Datasheet]__
- :fontawesome-solid-file-pdf: __[Manual do usuário do SF32LB55x][SF32LB55x User Manual]__
- :fontawesome-solid-book: __[Documentação do SDK do SF32LB55x][SF32LB55x SDK Documentation]__
- :fontawesome-solid-book-open: __[Referência da API do SF32LB55x][SF32LB55x API Reference]__
- :fontawesome-solid-microchip: __[Visão geral da família SF32][SF32 Family Overview]__
- :fontawesome-solid-file-excel: __[Lista de Fornecedores Aprovados da SiFli (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__

</div>

## 3. Visão geral do dispositivo { #3-device-overview }

### 3.1. Arquitetura { #31-architecture }

O SF32LB55x é voltado a produtos AIoT de baixo consumo que precisam responder rapidamente às interações do usuário e manter baixo o consumo em standby e no modo de suspensão. Ele integra um transceptor Bluetooth 5.2 de baixo consumo, gerenciamento de energia e interfaces de memória e display. A integração de hardware deve considerar a seleção do encapsulamento, as linhas de alimentação do PMU, o modo de boot, os dois circuitos de cristal, o casamento de RF, a memória externa, a escolha de display MIPI/SPI/MCU8080/JDI, as conexões de GPADC e sensores, o áudio Bluetooth externo, o acesso para depuração e gravação e a calibração em produção.

As conexões de armazenamento incluem várias interfaces QSPI, uma interface independente de OPI-PSRAM e suporte a SD/eMMC. A configuração das memórias NOR Flash e PSRAM integradas ao encapsulamento varia conforme o código exato da peça. As interfaces de memória e display também dependem do encapsulamento. BGA145 oferece um canal de OPI-PSRAM externa; BGA169 oferece dois. A interface MIPI DSI com duas vias de dados está disponível em BGA145 e BGA169, mas não em QFN68L. Confira o mapa de pinos e a configuração de memória integrada ao encapsulamento da peça exata antes de atribuir os dispositivos externos.

### 3.2. Variantes e encapsulamentos { #32-variants-and-packages }

<div align="center"><em>Tabela 3.2-1: Opções de encapsulamento</em></div>

<div align="center" markdown>

| Encapsulamento | Dimensões | Passo dos pinos | Diâmetro das esferas |
| :--- | :--- | :--- | :--- |
| QFN68L | 7 × 7 × 0,75 mm | 0,35 mm | - |
| BGA145 | 7 × 7 × 0,94 mm | 0,5 mm | 0,25 mm |
| BGA169 | 7 × 7 × 0,94 mm | 0,5 mm | 0,25 mm |

</div>

O SF32LB55x está disponível nos encapsulamentos QFN68L, BGA145 e BGA169. Escolha o encapsulamento desde o início, pois as interfaces de memória, o fanout, os requisitos de fabricação da PCB e a quantidade de GPIO disponível variam conforme o encapsulamento.

![Figura 3.2-1: Distribuição dos pinos do QFN68L](../../sf32-products/chips/assets/55x/SF32LB55x-QFN68-Leadmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-1: Distribuição dos pinos do QFN68L</em></div>

![Figura 3.2-2: Distribuição dos pinos do BGA145](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-2: Distribuição dos pinos do BGA145</em></div>

!!! warning "Mapas históricos de esferas BGA169"
    A SiFli identifica o SF32LB557V8N6 como um componente em fim de vida (EOL). Seu mapa é mantido abaixo para revisar projetos existentes, não como recomendação para novos projetos. O SF32LB557VD3A6 usa outro mapa BGA169: D11, E9, K12, L11, L13 e M13 são NC. Confira o mapa do código exato da peça; dimensões idênticas não significam compatibilidade de pinos.

![Figura 3.2-3: Distribuição dos pinos do BGA169 SF32LB557V8N6](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-3: Distribuição dos pinos do BGA169 SF32LB557V8N6</em></div>

![Figura 3.2-4: Distribuição dos pinos do BGA169 SF32LB557VD3A6](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.2-4: Distribuição dos pinos do BGA169 SF32LB557VD3A6</em></div>

### 3.3. Principais recursos de hardware { #33-major-hardware-features }

- Opções de encapsulamento QFN68L, BGA145 e BGA169.
- Requisitos de projeto para os cristais de 48 MHz e 32,768 kHz.
- Transceptor Bluetooth 5.2 de baixo consumo, requisitos de casamento de RF e layout da antena.
- OPI PSRAM; QSPI para NOR/NAND Flash e PSRAM; SDIO para eMMC ou Micro SD. A memória integrada varia conforme o código exato da peça.
- Opções de display MIPI DSI, SPI/QSPI, MCU8080 e JDI.
- Recomendações para botão de despertar, motor de vibração, interrupção de despertar, GPADC, sensores e áudio Bluetooth externo.
- Suporte a DBG-UART, SWD, gravação em produção e calibração do cristal.

### 3.4. Aplicações típicas { #34-typical-applications }

As aplicações previstas incluem pulseiras e outros wearables, dispositivos móveis inteligentes, produtos para casas inteligentes e outros projetos AIoT de baixo consumo.

## 4. Projeto em resumo { #4-design-at-a-glance }

### 4.1. Resumo de engenharia { #41-engineering-summary }

<div align="center"><em>Tabela 4.1-1: Resumo do projeto com SF32LB55x</em></div>

<div align="center" markdown>

| Aspecto | Foco do projeto |
|:---|:---|
| Encapsulamento | Escolha QFN68L ou BGA antes de planejar os pinos e o stack-up da PCB. |
| Alimentação | Revise as linhas de alimentação do PMU, os demais pinos de alimentação, os capacitores necessários, POR/BOR/reset e o modo BUCK. |
| Clock | Use cristais de 48 MHz e 32,768 kHz que atendam aos requisitos de CL, ppm e ESR. |
| RF | Mantenha a rede de casamento perto do chip e preserve um caminho de antena de 50 Ω limpo. |
| Memória | Planeje separadamente a PSRAM volátil OPI/QSPI e o armazenamento de boot e persistente em QSPI Flash ou SDIO eMMC/Micro SD; confirme o suporte do encapsulamento e do modo de boot. |
| Display | Escolha antecipadamente MIPI DSI, SPI/QSPI, MCU8080 ou JDI, pois os grupos de pinos e o layout variam. |
| Produção | Reserve acesso a DBG-UART, SWD, modo de boot, alimentação e calibração de RF/cristal. |

</div>

### 4.2. Fluxo de projeto de hardware { #42-hardware-design-flow }

1. Confirme o encapsulamento, a estratégia de memória, a interface de display e a meta de baixo consumo.
2. Defina a árvore de alimentação, as linhas de alimentação do PMU, o comportamento de BUCK/LDO e o circuito de reset.
3. Selecione os cristais, a topologia de casamento de RF e as restrições de layout da antena.
4. Atribua os pinos de memória, display, despertar, sensores, áudio, depuração e teste de produção.
5. Fixe o stack-up da PCB, fanout, impedância e restrições de ESD, RF e interfaces de alta velocidade.
6. Revise o checklist da Seção 7 antes de congelar o esquemático, liberar o layout e iniciar a EVT.

### 4.3. Pacote de evidências da revisão { #43-review-evidence-pack }

Antes da EVT, arquive as versões do datasheet e do manual do usuário, o desenho do encapsulamento, o PDF do esquemático, o stack-up da PCB, o relatório de impedância, os relatórios DRC/ERC, a árvore de alimentação, a tabela de modos de boot, capturas de tela do layout de RF e dos cristais, capturas do roteamento de memória e display e o plano de pontos de teste para produção.

### 4.4. Como usar os checklists { #using-the-checklists }

Este guia oferece dois níveis de cobertura por checklists. A lista resumida da Seção 7 reúne os itens de maior risco para uma verificação rápida pela equipe de engenharia. O [Checklist do esquemático](SF32LB55x_schematic_checklist.md) (Seção 5.8) e a Seção 6.4 das [Diretrizes de layout da PCB](SF32LB55x_pcb_layout.md) reproduzem, item por item, a lista completa da SiFli, *SF32LB55x Schematic & PCB Checklist* (V1.0, 2026-01-21), publicada junto com os materiais de projeto de hardware no [wiki da SiFli][SiFli Chip Hardware Design Guide Index (Wiki)]. O documento abrange os dispositivos 551/555/557 e a variante SS6600A8.

Cada item informa a quais grupos de variantes se aplica e se é obrigatório (deve ser aprovado antes da liberação) ou opcional (recomendado quando o recurso correspondente é usado). Os textos coloridos e os trechos com <span class="flag-yellow">fundo amarelo</span> preservam os destaques de revisão da planilha original. Como a planilha não explica o motivo de cada destaque, trate-os como alertas adicionais de revisão, não como substitutos dos demais itens da mesma tabela.

Use o [Checklist do esquemático](SF32LB55x_schematic_checklist.md) durante a revisão do esquemático, antes de iniciar o layout da PCB. Use o checklist de layout (Seção 6.4) durante a revisão do layout, antes de liberar os arquivos Gerber. Na prática, cada etapa costuma ser feita duas vezes: primeiro pelo engenheiro responsável pelo projeto e, depois, por um revisor independente antes do congelamento do projeto ou da liberação para fabricação.

Para obter melhores resultados, use o checklist como registro formal de aprovação, não apenas como material de leitura:

1. Primeiro, confirme o código exato da peça e o encapsulamento escolhido.
2. Durante a revisão, marque cada item como aprovado, reprovado ou não aplicável; não se limite a ler a tabela.
3. Compare os itens sobre display, armazenamento, despertar e baixo consumo com as seções correspondentes do guia de projeto de hardware.
4. Registre nas notas da revisão as premissas específicas do encapsulamento, sobretudo BGA ou QFN, display DSI ou SPI e uso de QSPI2/QSPI3 para armazenamento.

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

## Acesse as demais partes do guia { #continue-the-design-guide }

O guia completo continua nas páginas a seguir. Cada uma aborda uma etapa do processo de projeto; acesse-as pelos links abaixo.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Diretrizes de projeto do esquemático](SF32LB55x_schematic_design.md)__ — alimentação, modo de boot, geração de clock, RF, interfaces de armazenamento, display e toque, e interfaces de despertar/GPADC/fabricação
- :fontawesome-solid-list-check: __[Checklist do esquemático](SF32LB55x_schematic_checklist.md)__ — revisão do esquemático item por item (Seção 5.8)
- :fontawesome-solid-microchip: __[Diretrizes de layout da PCB](SF32LB55x_pcb_layout.md)__ — footprint, stack-up, regras gerais de PCB, roteamento de interfaces e checklist de layout item por item
- :fontawesome-solid-book-open: __[Checklist de revisão do projeto e referências](SF32LB55x_review_and_reference.md)__ — lista de liberação, documentos relacionados, apêndices e histórico de revisões

</div>
