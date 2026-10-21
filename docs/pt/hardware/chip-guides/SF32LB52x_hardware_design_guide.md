---
icon: lucide/book-check
hide:
    - navigation
description: "Guia de projeto de hardware do MCU SF32LB52x: visão geral, fluxo de projeto e links para esquemático, layout da PCB, revisão e checklists."
tags:
    - Hardware
    - Microcontrolador
---

# Guia de projeto de hardware do SF32LB52x { #sf32lb52x-hardware-design-guide }

## 1. Introdução { #1-introduction }

Este guia reúne recomendações de projeto e material de referência com base em fontes de origem para produtos da família SF32LB52x de microcontroladores AIoT de ultrabaixo consumo. Destina-se a engenheiros de hardware, projetistas de PCB e desenvolvedores de produtos que trabalham com dispositivos vestíveis alimentados por bateria e outros sistemas embarcados compactos.

O guia abrange todo o processo de desenvolvimento de hardware: projeto da fonte de alimentação, circuitos de clock, layout de RF, interfaces de display e armazenamento, circuitos de áudio, recomendações de layout de PCB e cuidados de fabricação. Seguir essas orientações ajuda a reduzir riscos de desenvolvimento, aumentar a confiabilidade do sistema e encurtar o ciclo de desenvolvimento do produto.

Pressupõe-se que o leitor conheça os fundamentos de projeto de hardware embarcado e elaboração de esquemáticos. Este guia complementa o datasheet, o manual de referência e a documentação do SDK do SF32LB52x, que continuam sendo as fontes oficiais para especificações elétricas detalhadas, funcionamento dos periféricos e desenvolvimento de software.

O guia reúne duas notas de aplicação de hardware originais da SiFli em um único fluxo de projeto: uma para os modelos SF32LB520/3/5/7 alimentados por bateria e outra para os modelos 52B/D/E/G/J com alimentação externa regulada. Quando a redação das fontes é inconsistente, o guia prioriza os códigos exatos dos componentes disponíveis para pedido, a descrição explícita dos domínios de alimentação e a clareza necessária à revisão antes da liberação do projeto.

## 2. Recursos de desenvolvimento { #2-development-resources }
[SF32LB52x Product Brief]: https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf
[SF32LB52x Datasheet]: https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf
[SF32LB52x Reference Manual]: https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf
[SF32LB52x Hardware Design Guide (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[SF32LB52x Hardware Design Guide (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html
[SF32LB52-MOD-1]: ../../sf32-products/modules/SF32LB52-MOD-1.md
[KiCad Files]: https://github.com/OpenSiFli/kicad-libraries
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/
[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumo do produto SF32LB52x][SF32LB52x Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet do SF32LB52x][SF32LB52x Datasheet]__
- :fontawesome-solid-file-pdf: __[Manual de referência do SF32LB52x][SF32LB52x Reference Manual]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware do SF32LB52x (520/3/5/7)][SF32LB52x Hardware Design Guide (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware do SF32LB52x (52B/D/E/G/J)][SF32LB52x Hardware Design Guide (52B/D/E/G/J)]__
- :fontawesome-solid-file-excel: __[Lista de fornecedores aprovados pela SiFli (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__
- :fontawesome-brands-github: __[Arquivos KiCad][KiCad Files]__
- :fontawesome-solid-sim-card: __[SF32LB52-MOD-1]__

</div>

## 3. Visão geral do dispositivo { #3-device-overview }

A família SF32LB52x reúne processadores STAR-MC1 de dois núcleos, conectividade Bluetooth, aceleração gráfica, áudio integrado, interfaces de display, controladores de armazenamento e gerenciamento de energia em um encapsulamento QFN68 compacto. Foi otimizada para produtos em que o custo da lista de materiais (BOM), a autonomia da bateria e a área da PCB são fatores importantes.

### 3.1. Recursos { #31-features }

A família integra:

- Processadores Arm China STAR-MC1 de núcleo duplo, compatíveis com Arm Cortex-M33 e equipados com FPU e MPU
- Rádio Bluetooth 5.3 de modo duplo
- Acelerador gráfico ePicasso 2.0 2D/2.5D
- Controlador de display com interfaces SPI, QSPI, 8080, JDI e EPD de 8 bits
- Dispositivo USB 2.0 Full-Speed
- Interface de armazenamento SDIO/eMMC nos modelos compatíveis
- Interfaces de áudio analógico e digital
- PMU, conversor DC/DC e reguladores LDO integrados
- Encapsulamento QFN68 com até 44/45 GPIOs

### 3.2. Modelos { #32-variants }

Na prática, a arquitetura de alimentação divide a família SF32LB52x em dois grupos de projeto: modelos alimentados por bateria e modelos com alimentação externa regulada, conforme mostrado a seguir.

=== "SF32LB520/3/5/7 (alimentação por bateria)"

    Este grupo integra um **módulo de gerenciamento de carga e uma PMU** no chip. Pode ser alimentado diretamente por uma bateria de íons de lítio de célula única e também permite soluções externas de carregamento.

    <div align="center"><em>Tabela 3.2-1: Correspondência de modelos (variante alimentada por bateria)</em></div>

    <div align="center" markdown>

    | Modelo | Memória no mesmo encapsulamento | Alimentação | Observação de projeto |
    |:---|:---|:---|:---|
    | SF32LB520U36 | 1 MB QSPI-NOR Flash | Bateria de íons de lítio, 3,2–4,7 V, recarregável | Inicializa pela Flash no mesmo encapsulamento por padrão; `VDD18_VOUT` requer alimentação externa de 3,3 V |
    | SF32LB523UB6 | 4 MB OPI-PSRAM | Bateria de íons de lítio, 3,2–4,7 V, recarregável | Deve inicializar por armazenamento externo |
    | SF32LB525UC6 | 8 MB OPI-PSRAM | Bateria de íons de lítio, 3,2–4,7 V, recarregável | Deve inicializar por armazenamento externo |
    | SF32LB527UD6 | 16 MB OPI-PSRAM | Bateria de íons de lítio, 3,2–4,7 V, recarregável | Deve inicializar por armazenamento externo |

    </div>

=== "52B/D/E/G/J (alimentação externa regulada)"

    Este grupo integra a **PMU** no chip, mas não inclui circuito de carregamento. Requer uma fonte externa regulada.

    <div align="center"><em>Tabela 3.2-2: Correspondência de modelos (variante com alimentação externa regulada)</em></div>

    <div align="center" markdown>

    | Modelo | Memória no mesmo encapsulamento | Alimentação | Observação de projeto |
    |:---|:---|:---|:---|
    | SF32LB52BU36 | 1 MB QSPI-NOR Flash | 2,97–3,63 V, não recarregável | `VDD_SIP` requer alimentação externa de 1,8 V ou 3,3 V |
    | SF32LB52BU56 | 4 MB QSPI-NOR Flash | 2,97–3,63 V, não recarregável | `VDD_SIP` requer alimentação externa de 3,3 V |
    | SF32LB52DUB6 | 4 MB OPI-PSRAM | 1,71–1,98 V, não recarregável | `VDD_SIP` requer alimentação externa de 1,8 V |
    | SF32LB52EUB6 | 4 MB OPI-PSRAM | 2,97–3,63 V, não recarregável | `VDD_SIP` pode ser alimentado pelo LDO interno |
    | SF32LB52GUC6 | 8 MB OPI-PSRAM | 2,97–3,63 V, não recarregável | `VDD_SIP` pode ser alimentado pelo LDO interno |
    | SF32LB52JUD6 | 16 MB OPI-PSRAM | 2,97–3,63 V, não recarregável | `VDD_SIP` pode ser alimentado pelo LDO interno |

    </div>

### 3.3. Encapsulamento { #33-packages }

Os dois grupos usam o mesmo encapsulamento QFN68.

<div align="center"><em>Tabela 3.3-1: Dados do encapsulamento</em></div>

<div align="center" markdown>

| Encapsulamento | Dimensões | Passo entre pinos |
|:---|:---|:---|
| QFN68L | 7 mm × 7 mm × 0,85 mm | 0,35 mm |

</div>

Os recursos de periféricos diferem ligeiramente entre os grupos. Os modelos alimentados por bateria têm 44 GPIOs, enquanto os modelos com alimentação externa regulada têm 45 GPIOs. A diferença decorre dos pinos reservados ao carregamento nos modelos alimentados por bateria.

- 44/45 GPIOs
- 3 UARTs
- 4 interfaces I2C
- 2 interfaces GPTIM
- 2 interfaces SPI
- 1 interface de áudio I2S
- 1 interface de armazenamento SDIO
- 1 interface de áudio PDM
- 1 saída de áudio analógico diferencial
- 1 entrada de áudio analógico não balanceada (single-ended)
- Interface de display SPI com uma, duas ou quatro linhas de dados e interface serial JDI
- Suporta displays com e sem GRAM
- Suporta gravação por UART e depuração de software

Os diagramas de distribuição dos pinos são apresentados a seguir. As diferenças entre eles serão retomadas na seção de projeto do esquemático.

![Figura 3.3-1: Distribuição dos pinos QFN68L do SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-1: Distribuição dos pinos QFN68L do SF32LB520/3/5/7</em></div>

![Figura 3.3-2: Distribuição dos pinos QFN68L do SF32LB52B/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-2: Distribuição dos pinos QFN68L do SF32LB52B/E/G/J</em></div>

### 3.4. Aplicações { #34-applications }

As aplicações típicas são sistemas embarcados portáteis que exigem longa autonomia de bateria e dimensões compactas, como:

- Smartwatches de entrada e pulseiras de atividade
- Módulos Bluetooth e adaptadores sem fio
- Acessórios de áudio Bluetooth
- Sensores inteligentes e dispositivos vestíveis
- Etiquetas eletrônicas de prateleira e crachás inteligentes
- Leitores de livros digitais
- Impressoras portáteis de etiquetas
- Displays para bicicletas e scooters elétricas
- Dispositivos conectados de interface homem-máquina (HMI)
- Equipamentos industriais e médicos portáteis
- Outros dispositivos AIoT alimentados por bateria

## 4. Resumo do projeto { #4-design-at-a-glance }

### 4.1. Arquitetura de hardware { #41-hardware-architecture }

A tabela a seguir resume a arquitetura de hardware recomendada para uma aplicação típica do SF32LB52x. Use-a como referência rápida antes de consultar as orientações detalhadas nas seções seguintes.

<div align="center"><em>Tabela 4.1-1: Resumo da arquitetura recomendada</em></div>

<div align="center" markdown>

| Bloco de hardware | Implementação típica |
|:---|:---|
| Encapsulamento | QFN68L, 7 mm × 7 mm × 0,85 mm, passo entre pinos de 0,35 mm |
| PCB | Recomenda-se uma PCB PTH de 4 camadas |
| Alimentação | Bateria de uma célula de Li-ion/Li-Po ou fonte externa regulada, conforme o modelo |
| Carregamento da bateria | Carregador integrado nos modelos compatíveis ou CI externo de carregamento, com ou sem gerenciamento do caminho de alimentação (PPM) |
| Indutor do conversor buck | 4,7 µH ± 20 %, DCR ≤ 0,4 Ω, Isat ≥ 450 mA |
| Cristal | Cristal principal de 48 MHz e cristal de RTC de 32,768 kHz |
| RF | Trilha de impedância controlada de 50 Ω com posição reservada para rede de casamento π |
| Display | SPI de 3 fios, SPI de 4 fios, Dual-SPI, Quad-SPI (até 512 × 512), JDI e EPD de 8 bits |
| Painel de toque | Controlador capacitivo I2C com capacidade de despertar o sistema por interrupção |
| Armazenamento | Flash/PSRAM SiP, SPI NOR externa, SPI NAND, SD NAND ou eMMC, conforme o modelo |
| Áudio | Entrada de microfone analógico, saída diferencial de DAC e PA externo |
| Sensores | Sensores I2C/SPI, como acelerômetro, giroscópio, sensor geomagnético, sensor de frequência cardíaca, sensor de SpO2 e sensor de ECG |
| Resposta tátil | Motor de vibração controlado por PWM |
| Depuração | DBG_UART em PA18/PA19, multiplexado com SWD |

</div>


### 4.2. Fluxo de projeto de hardware { #42-hardware-design-flow }

Siga o guia na ordem em que as decisões de hardware normalmente são consolidadas. O fluxo abaixo destaca as escolhas iniciais de arquitetura antes de avançar para os detalhes do esquemático e do layout da PCB.

<div align="center"><em>Tabela 4.2-1: Fluxo de projeto de hardware</em></div>

<div align="center" markdown>

| Passo | Decisão de projeto | Seções principais |
|:---|:---|:---|
| 1 | Selecionar o código exato do componente disponível para pedido e a variante de alimentação | Visão geral do dispositivo, seleção do modelo |
| 2 | Confirmar encapsulamento, quantidade de GPIOs e pinos de função fixa | Encapsulamento, orientações de projeto do esquemático |
| 3 | Fixar o sistema mínimo: árvore de alimentação, armazenamento de boot, pinos de inicialização, acesso de depuração, clocks e estratégia de despertar | Projeto do sistema mínimo, armazenamento, depuração, geração de clock |
| 4 | Selecionar a topologia de RF, o display, o áudio, os sensores e as demais interfaces do produto | Geração de clock, RF, interfaces de usuário, armazenamento e conectividade |
| 5 | Revisar empilhamento, fanout, impedância e roteamento de sinais sensíveis da PCB | Orientações de layout da PCB |
| 6 | Comparar com os esquemáticos, layouts de PCB e figuras mecânicas e de alimentação das fontes de referência | Apêndices A–E |
| 7 | Prever acesso para bring-up, depuração, calibração e testes de produção | Depuração, produção, checklist de revisão de projeto |

</div>

**Árvore de decisão de projeto**

- Precisa de operação com bateria de uma célula recarregável por USB? Comece por `SF32LB520/3/5/7`.
- Precisa de alimentação externa regulada ou boot por eMMC? Comece por `52B/D/E/G/J`.
- Precisa de EPD paralelo de 8 bits? Use o projeto com alimentação externa regulada, a menos que a SiFli confirme a possibilidade de alimentação por bateria para o projeto específico.
- Precisa da menor corrente em standby? Defina o chaveamento da alimentação do armazenamento, as chaves de carga dos sensores e o isolamento da alimentação do display antes de posicionar os componentes na PCB.

### 4.3. Como usar este guia { #43-how-to-use-this-guide }

Antes de começar o esquemático, defina o código exato do componente a ser comprado. A família SF32LB52x possui dois grupos de projeto: `SF32LB520/3/5/7`, alimentado por bateria, e `52B/D/E/G/J`, com alimentação externa regulada. Use a Seção 3.2 para selecionar o grupo; as Seções 5.1 e 5.2 para revisar o sistema mínimo e a alimentação; as Seções 5.6.1 e 5.7.1 para verificar o armazenamento de boot e o acesso de depuração; as Seções 5 e 6 para revisar o esquemático e a PCB; os Apêndices A–E para comparar as figuras de referência originais; e a Seção 7 como checklist de liberação.

Ao reutilizar um esquemático antigo do SF32LB52x, revise primeiro os pinos de alimentação, a alimentação da memória SiP, a linha de alimentação do armazenamento de boot, os pinos DBG_UART/SWD, a carga dos cristais, o footprint da rede de casamento de RF e os pontos de teste de produção. Esses itens são fontes frequentes de problemas de bring-up difíceis de perceber durante a revisão.

### 4.4. Pacote de evidências para revisão { #44-review-evidence-pack }

Antes de liberar o hardware, reúna o PDF do esquemático, o empilhamento da PCB, o relatório de impedância, a conferência dos componentes com a AVL, o relatório de DRC e capturas de tela dos layouts de RF, cristais, USB, SDIO/eMMC, áudio, alimentação e armazenamento de boot. Guarde essas evidências junto à revisão da placa para que problemas posteriores de firmware, RF ou produção possam ser rastreados até a versão de hardware aprovada.


## 5. Como usar os checklists { #using-the-checklists }

Este guia oferece dois níveis de checklist. Os checklists resumidos nas Seções 5.1.1.5, 5.5.3 e 7 destacam os itens de maior risco para verificações rápidas de engenharia. O [Checklist do esquemático](SF32LB52x_schematic_checklist.md) (Seção 5.8) e o [Checklist de layout da PCB](SF32LB52x_pcb_layout_checklist.md) (Seção 6.15) reproduzem, item a item, o documento completo [*SF32LB52 Schematic & PCB Checklist*][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)] (V1.0, 2026-01-21), publicado junto ao guia de hardware na [wiki da SiFli][SiFli Chip Hardware Design Guide Index (Wiki)]. Ele abrange tanto os modelos SF32LB520/3/5/7 alimentados por bateria quanto os modelos SF32LB52B/D/E/G/J com alimentação externa.

Cada item dos dois checklists informa a quais modelos SF32LB52x se aplica e se é Obrigatório (deve ser aprovado antes da liberação) ou Opcional (recomendado quando o recurso é usado). “Todos os modelos” inclui SF32LB520/3/5/7 e SF32LB52B/D/E/G/J, salvo indicação mais restrita. O texto colorido e o texto com <span class="flag-red flag-yellow">fundo amarelo</span> preservam os destaques da planilha original. Como a fonte não explica o motivo de cada destaque, trate-os como sinalizações adicionais de revisão, não como substitutos dos itens sem destaque na mesma tabela. O formato mantém intencionalmente a organização da planilha. Quando a redação original for incompleta, inconsistente ou concisa demais para ser interpretada isoladamente, consulte também o guia de hardware, o datasheet, o manual de referência e as orientações da SiFli sobre os códigos dos modelos.

Use o [Checklist do esquemático](SF32LB52x_schematic_checklist.md) durante a revisão do esquemático, antes de iniciar o layout da PCB. Use o [Checklist de layout da PCB](SF32LB52x_pcb_layout_checklist.md) durante a revisão do layout, antes de liberar os arquivos Gerber. Na prática, cada checklist costuma ser preenchido duas vezes: primeiro pelo engenheiro responsável pelo projeto e depois por um revisor independente, antes do congelamento do projeto ou da liberação para fabricação.

Use o checklist como registro de aprovação, não apenas como lista de leitura:

1. Confirme primeiro o modelo exato do chip, especialmente se o projeto puder usar tanto dispositivos 520/3/5/7 quanto 52B/D/E/G/J.
2. Registre cada item como aprovado / reprovado / não se aplica durante a revisão, em vez de apenas ler a tabela.
3. Quando um item mencionar o meio de boot, o tipo de display ou o comportamento de chaveamento da alimentação, confira-o no esquemático real e no capítulo correspondente do guia.
4. Se houver ambiguidade na fonte, registre o código exato do componente e a premissa de projeto nas notas de revisão antes da liberação.

<div align="center"><em>Tabela 5-1: modelo de registro de revisão</em></div>

<div align="center" markdown>

| Campo | Valor |
|:---|:---|
| Nome do cliente | |
| Nome do projeto do cliente | |
| Data de envio para revisão | |
| Responsável pela revisão inicial | |
| Data da revisão inicial | |
| Responsável pela revisão de acompanhamento | |
| Data da revisão de acompanhamento | |

</div>

<div align="center"><em>Tabela 5-2: histórico de versões do documento de checklist</em></div>

<div align="center" markdown>

| Nº | Versão | Data | Notas da versão |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Versão inicial do documento de checklist de esquemático e PCB |

</div>

[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

## 6. Continuação do guia de projeto { #continue-the-design-guide }

O guia completo continua nas páginas abaixo. Cada uma aborda uma etapa do processo de projeto e pode ser acessada a partir daqui.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Orientações de projeto do esquemático](SF32LB52x_schematic_design.md)__ — sistema mínimo, alimentação, geração de clock, RF, interfaces de usuário, armazenamento e conectividade e acesso para fabricação, distribuídos em três páginas
- :fontawesome-solid-list-check: __[Checklist do esquemático](SF32LB52x_schematic_checklist.md)__ — checklist de revisão do esquemático, item a item (Seção 5.8)
- :fontawesome-solid-microchip: __[Orientações de layout da PCB](SF32LB52x_pcb_layout.md)__ — orientações de footprint, empilhamento, fanout e roteamento de clock, RF, áudio, USB, SDIO e alimentação
- :fontawesome-solid-list-check: __[Checklist de layout da PCB](SF32LB52x_pcb_layout_checklist.md)__ — checklist de revisão do layout da PCB, item a item (Seção 6.15)
- :fontawesome-solid-book-open: __[Checklist de revisão de projeto e referências](SF32LB52x_review_and_reference.md)__ — checklist de liberação, documentos relacionados, apêndices de referência para esquemático, PCB, mecânica e alimentação e histórico de revisões

</div>
