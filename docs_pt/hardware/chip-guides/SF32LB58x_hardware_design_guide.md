---
icon: lucide/book-check
hide:
    - navigation
description: "Guia de projeto de hardware do MCU SF32LB58x: arquitetura de alimentação, projeto de clock e RF, interfaces de display e armazenamento, áudio e orientações de layout de PCB."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware SF32LB58x { #sf32lb58x-hardware-design-guide }

## 1. Introdução { #1-introduction }

Este guia reúne recomendações e referências de projeto para produtos baseados na família de microcontroladores AIoT de alto desempenho SF32LB58x. Destina-se a engenheiros de hardware, projetistas de PCB e desenvolvedores de produtos que estejam criando dispositivos alimentados por bateria com interfaces de usuário avançadas, memória de grande capacidade, Bluetooth de modo duplo, áudio, muitos GPIOs e requisitos de baixo consumo em standby.

O guia cobre todo o fluxo de desenvolvimento de hardware: PMIC e distribuição de alimentação, fanout do BGA256, planejamento do stack-up HDI, circuitos de clock, projeto de RF, MIPI-DSI, USB 2.0 High-Speed, SDIO/eMMC, circuitos de áudio, layout de PCB, validação e preparação para fabricação. Seguir estas orientações ajuda a reduzir os riscos de projetos com BGA/HDI de alta densidade, preservar a integridade de sinal das interfaces de alta velocidade e garantir que o produto atenda aos requisitos de alimentação, encapsulamento e produção do SF32LB58x.

Este documento pressupõe conhecimentos básicos de hardware embarcado, captura de esquemáticos e layout de PCB de alta densidade. Ele complementa o datasheet, o manual do usuário, a nota oficial de aplicação de hardware e o pacote de projetos de referência do SF32LB58x, além da Lista de Fornecedores Aprovados da SiFli (AVL). Esses materiais oficiais continuam sendo a referência para especificações elétricas, multiplexação de pinos, dimensões do encapsulamento, qualificação de componentes e limites de produção.

## 2. Recursos de desenvolvimento { #2-development-resources }

[SF32LB58x Product Brief]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[SF32LB58x Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[SF32LB58x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[SF32LB58x Hardware Application Note]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[SF32LB58x Schematic & PCB Checklist workbook]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumo do produto SF32LB58x][SF32LB58x Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet SF32LB58x][SF32LB58x Datasheet]__
- :fontawesome-solid-file-pdf: __[Manual do usuário SF32LB58x][SF32LB58x User Manual]__
- :fontawesome-solid-file-lines: __[Nota de aplicação de hardware SF32LB58x][SF32LB58x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[Planilha do checklist esquemática e de PCB do SF32LB58x][SF32LB58x Schematic & PCB Checklist workbook]__
- :fontawesome-solid-file-excel: __[Lista de fornecedores aprovados da SiFli (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__

</div>

## 3. Visão geral do dispositivo { #3-device-overview }

### 3.1. Arquitetura { #31-architecture }

<div align="center"><em>Tabela 3.1-1: Principais recursos de hardware</em></div>

<div align="center" markdown>

| Recurso | Descrição |
|:---|:---|
| Arquitetura dos núcleos | Arquitetura heterogênea de três núcleos: 2 núcleos de aplicação Arm Cortex-M33 STAR-MC1, com frequência de até 240 MHz, e 1 núcleo de baixo consumo Arm Cortex-M33 STAR-MC1, com frequência de até 96 MHz |
| Bluetooth | Transceptor Bluetooth 5.3 de baixo consumo e modo duplo integrado |
| Gráficos | Aceleração gráfica ePicasso 2.0 para 2D/2.5D e gráficos vetoriais Vivante GCNanoUltraV |
| Interfaces de display | MIPI-DSI, SPI/QSPI, MCU8080, DPI, JDI paralelo/serial |
| Armazenamento | NOR Flash/PSRAM integrada ao SiP conforme o modelo; NOR Flash ou SPI NAND Flash externa via MPI3 ou MPI4; interfaces SDIO SD1 e SD2 |
| Áudio | 3x I2S, 2x PDM, entrada/saída de áudio analógico diferencial e suporte a amplificador de potência (PA) analógico externo e PA de áudio I2S |
| Interrupções de despertar | Todos os GPIOs podem despertar o chip dos modos Light/Deep Sleep. Standby/Hibernate oferece 16 fontes de interrupção de despertar: 6 em PA e 10 em PB |
| Interface PBR | São seis pinos PBR. PBR0 passa de 0 para 1 durante a inicialização e pode controlar alguns LSWs externos; PBR1-PBR5 ficam em nível baixo por padrão. PBR0-PBR5 podem gerar LPTIM ou clock de 32 kHz e continuar disponíveis como saídas durante Standby/Hibernate. PBR0-PBR3 podem ser configurados como entradas de despertar, mas não geram interrupção enquanto a MCU está ativa. |

</div>

### 3.2. Variantes { #32-variants }

Antes de congelar o esquemático, confirme os códigos de pedido do SF32LB58x e a configuração de memória SiP no datasheet e na AVL mais recentes. Considere a família uma plataforma BGA256 que exige HDI; a memória SiP varia conforme o modelo. A família permite conectar NOR Flash ou SPI NAND Flash externa via MPI3 ou MPI4. Na EVB da SiFli, a SPI NAND externa usa MPI4; SD1 é usado para eMMC ou SD NAND, e SD2 para cartão SD ou dispositivo Wi-Fi. Antes de fechar o projeto, confira também a pinagem da variante escolhida e o roteamento da placa de destino.

### 3.3. Encapsulamentos { #33-packages }

<div align="center"><em>Tabela 3.3-1: Encapsulamento</em></div>

<div align="center" markdown>

| Nome do encapsulamento | Dimensões | Passo dos pinos |
|:---|:---|:---|
| BGA256 | 8,5 mm x 6,5 mm x 0,94 mm | 0,4 mm |

</div>

### 3.4. Principais recursos de hardware { #34-major-hardware-features }

- Encapsulamento BGA256 com passo de 0,4 mm e fanout denso de alimentação e GPIO.
- O projeto exige processo de PCB HDI e não é compatível com PTH.
- PMU integrada com 2 saídas BUCK e 3 saídas LDO internas.
- O PMIC de sistema SF30147C pode ser usado opcionalmente na distribuição de alimentação de sistemas da categoria de relógios inteligentes.
- MIPI-DSI, USB 2.0 HS, SDIO/eMMC, RF, áudio e o fanout denso do BGA exigem confirmação antecipada do stack-up e das regras de impedância.

### 3.5. Aplicações típicas { #35-typical-applications }

O SF32LB58x é adequado para produtos conectados que combinam recursos gráficos avançados, grande capacidade de memória, multimídia e cargas de trabalho de IA na borda, como:

- Relógios inteligentes, relógios esportivos e dispositivos vestíveis para atividades ao ar livre
- Ciclocomputadores avançados e painéis automotivos
- Displays inteligentes e painéis conectados
- Dispositivos vestíveis com recursos de IA
- Sistemas de IA de borda e fusão de sensores
- Interfaces homem-máquina baseadas em LVGL e de alta resolução
- Terminais médicos e industriais portáteis
- Acessórios Bluetooth + Wi-Fi que usam um dispositivo Wi-Fi externo via SDIO

## 4. Projeto em resumo { #4-design-at-a-glance }

### 4.1. Arquitetura de hardware { #41-hardware-architecture }

<div align="center"><em>Tabela 4.1-1: Resumo rápido do projeto</em></div>

<div align="center" markdown>

| Item de projeto | Implementação típica |
|:---|:---|
| Encapsulamento | BGA256, 8,5 mm x 6,5 mm x 0,94 mm, passo de 0,4 mm |
| PCB | Somente placa HDI — não compatível com PTH; recomenda-se o stack-up 6HDI-2 |
| Alimentação | PMU integrada (2x BUCK + 3x LDO); pode ser combinada com o PMIC SF30147C da SiFli para alimentar todo o sistema |
| Indutor BUCK | 4,7 µH, DCR ≤ 0,4 Ω, Isat ≥ 500 mA |
| Clock | Cristal principal de 48 MHz + cristal RTC de 32,768 kHz |
| RF | Trilha com impedância controlada de 50 Ω e rede de casamento π prevista |
| Display | MIPI-DSI (2 lanes), SPI de 3/4 fios, Quad-SPI, MCU8080, DPI, JDI paralelo/serial; mapeamento dos dois LCDCs: LCDC1 (PA) / LCDC2 (PB) |
| Armazenamento | NOR Flash ou SPI NAND Flash externa via MPI3 ou MPI4. A EVB da SiFli usa MPI4 para SPI NAND, SD1 para eMMC ou SD NAND e SD2 para cartão SD ou dispositivo Wi-Fi |
| Áudio | 3x I2S (somente no modo mestre), 2x PDM, entrada/saída de áudio analógico diferencial |
| Depuração | 1x SWD + 6x saídas UART selecionáveis para depuração |
| USB | USB 2.0 HS, modos Host/Device |

</div>

### 4.2. Fluxo de projeto de hardware { #42-hardware-design-flow }

<div align="center"><em>Tabela 4.2-1: Fluxo de projeto de hardware</em></div>

<div align="center" markdown>

| Passo | Decisão de projeto | Seções principais |
|:---|:---|:---|
| 1 | Confirmar o número de peça comercial, a configuração de memória no SiP e as premissas do encapsulamento BGA256 | Visão geral do dispositivo, Encapsulamentos |
| 2 | Definir e congelar o stack-up HDI, a estrutura de vias, as regras de impedância e a capacidade de montagem antes de iniciar o layout | Diretrizes de layout de PCB |
| 3 | Decidir se o PMIC de sistema opcional SF30147C será usado e definir as linhas de alimentação da PMU do chip, os indutores BUCK, os capacitores dos LDOs, o circuito de reset e o sequenciamento de alimentação | Sistema de alimentação |
| 4 | Selecionar o armazenamento de boot, a interface de display, a função USB, o uso de SDIO/eMMC, a topologia de áudio e o acesso de depuração | Armazenamento e conectividade, Interfaces do usuário, Fabricação |
| 5 | Revisar capturas de roteamento de clock, RF, DSI, USB 2.0 HS, SDIO/eMMC, áudio, DC/DC, fanout do BGA e ESD | Geração de clock, RF, Diretrizes de layout de PCB |
| 6 | Arquivar esquemático, stack-up, DRC, impedância, AVL, dados de fabricação e evidências de layout antes da liberação do protótipo | Checklist de revisão do projeto |

</div>

### 4.3. Como usar este guia { #43-how-to-use-this-guide }

Siga o fluxo típico de uma revisão de placa: confirme o encapsulamento e a configuração de memória no SiP; fixe o stack-up HDI e a estratégia de PMIC; revise o armazenamento de boot e o roteamento do display; por fim, verifique clock, RF, USB, áudio, depuração e acesso aos testes de produção. A Seção 5 apresenta as diretrizes para o esquemático, a Seção 6 trata da implementação em PCB e a Seção 7 reúne os itens para a liberação.

### 4.4. Pacote de evidências de revisão { #44-review-evidence-pack }

Antes de liberar o protótipo, arquive o PDF do esquemático, o stack-up da PCB, os dados de capacidade de vias e de fabricação, os relatórios de impedância e DRC, a conferência da AVL e capturas de tela do layout que mostrem o PMIC, os indutores BUCK, DSI, USB, SDIO/eMMC, RF, cristais, áudio, fanout do BGA, retorno de terra e pontos de entrada de ESD.

### 4.5. Como usar os checklists { #using-the-checklists }

Este guia contém dois níveis de checklists. As listas resumidas nas Seções 5.2.1.7 e 5.7.3 reúnem os itens de maior risco para uma autoverificação rápida durante o projeto. O [Checklist do esquemático](SF32LB58x_schematic_checklist.md) (Seção 5.8) e o [Checklist do layout da PCB](SF32LB58x_pcb_layout_checklist.md) (Seção 6.18) reproduzem, item por item, a lista completa *SF32LB58x Schematic & PCB Checklist* da SiFli (V1.0, 2026-01-21).

Cada item é classificado como Obrigatório (precisa ser aprovado antes da liberação) ou Opcional (recomendado quando o recurso correspondente estiver em uso). As marcações coloridas e o texto com <span class="flag-yellow">fundo amarelo</span> preservam os destaques de revisão da planilha original. Como a planilha não informa o motivo de cada destaque, trate essas marcações como alertas adicionais; elas não substituem os demais itens, inclusive os que não estão destacados.

As fontes divergem quanto à corrente de saturação do indutor BUCK. A planilha de checklist exige Isat ≥ 450 mA para indutores que não constam na AVL; já a nota oficial de aplicação de hardware especifica Isat ≥ 500 mA para L = 4,7 µH e DCR ≤ 0,4 Ω. O checklist mantém o valor da planilha. Até que a SiFli esclareça a divergência, use um indutor fora da AVL com Isat de pelo menos 500 mA.

Execute o [Checklist do esquemático](SF32LB58x_schematic_checklist.md) durante a revisão do esquemático, antes de iniciar o layout da PCB. Execute o [Checklist do layout da PCB](SF32LB58x_pcb_layout_checklist.md) durante a revisão do layout, antes de liberar os arquivos Gerber. Em geral, cada etapa é feita duas vezes: primeiro pelo engenheiro responsável pelo projeto e depois por um revisor independente, antes do congelamento do projeto ou da liberação para fabricação.

Para obter melhores resultados, use a lista como registro de aprovação, não apenas como material de leitura:

1. Confirme primeiro o número de peça de destino e a configuração de memória integrada ao SiP.
2. Durante a revisão, marque cada item como aprovado, reprovado ou não aplicável; não se limite a percorrer a tabela.
3. Confira os itens de display, armazenamento, despertar e baixo consumo nas seções correspondentes do guia de hardware.
4. Registre no relatório de revisão todas as premissas ainda não resolvidas antes da liberação.

<div align="center"><em>Tabela 4.5-1: Modelo de registro de revisão</em></div>

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

<div align="center"><em>Tabela 4.5-2: Histórico de versões do documento de checklist</em></div>

<div align="center" markdown>

| Nº | Versão | Data | Notas da versão |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Publicação inicial do documento Schematic & PCB Checklist |

</div>

## Continuação do guia de projeto { #continue-the-design-guide }

O guia completo continua nas páginas abaixo. Cada uma cobre uma etapa do processo de projeto e pode ser acessada a partir daqui.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Diretrizes para o esquemático](SF32LB58x_schematic_design.md)__ — sistema de alimentação, geração de clock, RF, interfaces do usuário, armazenamento e conectividade, e fabricação
- :fontawesome-solid-list-check: __[Checklist do esquemático](SF32LB58x_schematic_checklist.md)__ — revisão item por item do esquemático (Seção 5.8)
- :fontawesome-solid-microchip: __[Diretrizes de layout da PCB](SF32LB58x_pcb_layout.md)__ — encapsulamento, stack-up, fanout e roteamento de clock, RF, áudio, USB, SDIO, DSI e alimentação
- :fontawesome-solid-list-check: __[Checklist do layout da PCB](SF32LB58x_pcb_layout_checklist.md)__ — revisão item por item do layout da PCB (Seção 6.18)
- :fontawesome-solid-book-open: __[Checklist de revisão do projeto e referências](SF32LB58x_review_and_reference.md)__ — critérios de liberação, documentos relacionados, apêndices e histórico de revisões

</div>
