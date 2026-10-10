---
icon: lucide/circuit-board
hide:
    - navigation
description: "Orientações de projeto do esquemático do MCU SF32LB52x: sistema mínimo, alimentação e geração de clock."
tags:
    - Hardware
    - Microcontrolador
---

# Guia de hardware do SF32LB52x — Projeto do esquemático { #sf32lb52x-hardware-design-guide-schematic-design-guidelines }

!!! note "Parte do guia de hardware do SF32LB52x"
    As orientações de projeto do esquemático estão distribuídas em três páginas: esta página (Seções 5.1–5.3: sistema mínimo, alimentação e clock), [RF e interfaces de usuário](SF32LB52x_schematic_rf_interfaces.md) (Seções 5.4–5.5) e [Armazenamento e fabricação](SF32LB52x_schematic_storage_mfg.md) (Seções 5.6–5.7). Comece pela [visão geral do guia de hardware do SF32LB52x](SF32LB52x_hardware_design_guide.md) para selecionar o dispositivo e consultar o fluxo completo de projeto, ou use o [Checklist do esquemático](SF32LB52x_schematic_checklist.md) para a revisão item a item.

## 5. Orientações de projeto do esquemático { #5-schematic-design-guidelines }

Este capítulo acompanha o projeto do esquemático ao longo de três páginas. Revise primeiro o sistema mínimo e depois a alimentação e a geração de clock nesta página; RF e interfaces de usuário na página seguinte; e armazenamento, acesso para fabricação e decisões que dependem da PCB na última página. Para cada bloco principal, confirme o objetivo e os modelos aos quais se aplica antes de verificar requisitos do circuito, atribuição de pinos, erros frequentes e itens do checklist de liberação.

<div align="center"><em>Tabela 5-1: Organização do capítulo de projeto do esquemático</em></div>

<div align="center" markdown>

| Bloco | Decisão principal | Evidências para liberação |
|:---|:---|:---|
| Projeto do sistema mínimo | Modelo exato, encapsulamento, armazenamento de boot, pinos de bootstrap, acesso de depuração e gravação e caminho mínimo de bring-up | Revisão do sistema mínimo, tabela de bootstrap, pontos de teste de depuração e plano de boot e recuperação |
| Sistema de alimentação | Árvore de alimentação do modelo, caminho de carregamento, BUCK, LDOs, alimentação do armazenamento de boot, modos de operação e fontes de despertar | Revisão da árvore de alimentação, componentes da AVL, configurações de carregamento e OVP e plano de baixo consumo e retomada |
| Geração de clock | Seleção dos cristais de 48 MHz e 32.768 kHz, capacitância de carga e premissas de calibração | Verificação de CL/ESR dos cristais, capturas do posicionamento e roteamento e plano de calibração |
| RF | Casamento de RF, caminho da antena e acesso para ajuste | Plano de impedância de RF, captura do posicionamento da rede de casamento e plano de ajuste da antena |
| Interfaces de usuário | Display, áudio, botões e motor de vibração | Revisão das interfaces no esquemático, pinos de temporização e controle, sequenciamento de alimentação e revisão analógica |
| Armazenamento e conectividade | Meio de boot, pinos de bootstrap, chave de alimentação do armazenamento, sensores, UART/I2C e GPTIM | Tabela de bootstrap, divergência PA11/PA21 nas fontes, atribuição dos barramentos e revisão da alimentação do armazenamento |
| Fabricação | DBG_UART/SWD, pontos de teste, gravação na produção, acesso para calibração e checklists de liberação | Desenho dos pontos de teste, plano da bancada de teste de produção e evidências completas de liberação |

</div>

### 5.1. Projeto do sistema mínimo { #51-minimum-system-design }

O projeto do sistema mínimo é a primeira etapa de aprovação do esquemático de uma placa SF32LB52x. Abrange as decisões que precisam estar corretas antes de acrescentar os periféricos do produto: modelo exato do dispositivo, encapsulamento, árvore de alimentação, meio de boot, resistores de bootstrap, controle de alimentação do armazenamento, acesso de depuração e gravação, fontes de clock e comportamento de despertar. Em geral, é possível alterar mais tarde a conexão de displays ou sensores, mas uma configuração de boot incorreta, a falta de acesso de depuração, uma alimentação instável ou uma premissa incompatível sobre os estados de energia costuma impedir o funcionamento da placa.

Na primeira revisão do esquemático, siga esta sequência:

1. Selecione o modelo exato e o encapsulamento nas Seções 3.2 e 3.3.
2. Escolha o caminho de alimentação correto: `SF32LB520/3/5/7` para produtos com bateria recarregável, ou `52B/D/E/G/J` para produtos com alimentação externa regulada.
3. Defina as decisões de alimentação da Seção 5.2, incluindo `VBUS`/`VBAT`/`VCC` ou `PVDD`/`VDDIOA`/`VDD_SIP`, BUCK, desacoplamento dos LDOs internos, alimentações de RF/áudio e todas as chaves de carga para baixo consumo.
4. Selecione o meio de boot e instale os resistores de pull-up/pull-down de bootstrap em `PA13`/`PA17` conforme a tabela de boot da Seção 5.6.1.
5. Confirme o pino de controle da chave de alimentação do armazenamento de boot antes de concluir o layout. A nota de aplicação e o guia do esquemático indicam `PA21`, mas o checklist oficial indica `PA11` para a Flash externa nas variantes alimentadas por bateria.
6. Reserve `PA18`/`PA19`, terra e uma referência de alimentação válida para acesso DBG_UART/SWD antes de finalizar o gabinete e o dispositivo de teste de produção.
7. Selecione os cristais de 48 MHz e 32.768 kHz conforme a Seção 5.3.1 e considere suas restrições de posicionamento durante a revisão do esquemático.
8. Defina pinos de despertar, comportamento do botão de alimentação, eventos do carregador e estados de desligamento do armazenamento e sensores antes de finalizar a política de baixo consumo do firmware.

Ao concluir esta etapa, o circuito deve ser capaz de ligar, inicializar pelo meio selecionado, oferecer um caminho de recuperação, executar a calibração dos clocks e entrar no estado de baixo consumo previsto, sem depender dos periféricos opcionais do produto.

### 5.2. Sistema de alimentação { #52-power-system }

O projeto da alimentação define as linhas de alimentação, chaves de carga, caminho de carregamento, OVP, uso dos LDOs internos, comportamento de despertar e estados de baixo consumo que garantem a confiabilidade do sistema mínimo. Conclua esta seção antes de posicionar os componentes na PCB: as decisões posteriores sobre display, armazenamento, RF, áudio e sensores dependem dessas premissas de alimentação.

#### 5.2.1. Alimentação { #521-power-supply }

**Resumo**

- Os modelos alimentados por bateria usam `SF32LB520/3/5/7` com `VBUS`, `VBAT`, `VCC`, e decisões de carregamento e OVP.
- Os modelos com alimentação externa regulada usam `52B/D/E/G/J`, com `PVDD` e `VDDIOA` regulados externamente. Configure `VDD_SIP` conforme o modelo exato: ele pode usar uma fonte externa ou o LDO interno. Não há circuito interno de carregamento.
- Defina o indutor BUCK, o desacoplamento dos LDOs internos, as alimentações de RF/áudio e as chaves de carga para standby antes de posicionar os componentes na PCB.

**Objetivo do projeto**

Projete uma árvore de alimentação estável e com baixa corrente de fuga, adequada ao modelo selecionado. Ela deve evitar sobrecarga das saídas dos LDOs internos, manter as alimentações de RF e áudio livres de ruído e permitir desligar cargas não utilizadas e o armazenamento de boot nos modos de baixo consumo.

##### 5.2.1.1. Requisitos de alimentação do processador { #5211-processor-power-supply-requirements }

=== "SF32LB520/3/5/7 (alimentação por bateria)"

    <div align="center"><em>Tabela 5.2-1: Requisitos de alimentação dos modelos alimentados por bateria</em></div>

    <div align="center" markdown>

    | Pino | Mín. (V) | Típ. (V) | Máx. (V) | Corrente máxima (mA) | Descrição |
    |:---|:---|:---|:---|:---|:---|
    | VBUS | 4.5 | 5.0 | 5.5 | 500 | Entrada de alimentação VBUS; consulte a nota de divergência entre fontes |
    | VBAT | 3.2 | - | 4.7 | 500 | Saída de alimentação VBAT |
    | VCC | 3.2 | - | 4.7 | 500 | Entrada de alimentação do sistema (1) |
    | VSYS | - | 3.3 | - | 500 | Saída de alimentação VSYS (2) |
    | BUCK_LX | - | 1.25 | - | 50 | Pino de saída BUCK, conectado ao indutor |
    | BUCK_FB | - | 1.25 | - | 50 | Realimentação BUCK / entrada de alimentação interna, conectada à outra extremidade do indutor e a um capacitor externo |
    | VDD_VOUT1 | - | 1.1 | - | 50 | LDO interno, capacitor externo; não alimenta periféricos |
    | VDD_VOUT2 | - | 0.9 | - | 20 | LDO interno, capacitor externo; não alimenta periféricos |
    | VDD_RET | - | 0.9 | - | 1 | LDO interno, capacitor externo; não alimenta periféricos |
    | VDD_RTC | - | 1.1 | - | 1 | LDO interno, capacitor externo; não alimenta periféricos |
    | VDD18_VOUT | - | 1.8 | - | 30 | Alimentação SiP (3), interna; não alimenta periféricos. Pode receber alimentação externa com o LDO desabilitado |
    | VDD33_VOUT1 | - | 3.3 | - | 150 | Saída 1 do LDO de 3.3 V (4), desabilitada por padrão; requer configuração por software |
    | VDD33_VOUT2 | - | 3.3 | - | 150 | Saída 2 do LDO de 3.3 V, desabilitada por padrão; requer configuração por software |
    | AVDD33_AUD | 2.97 | 3.3 | 3.63 | 50 | Entrada de alimentação de áudio de 3.3 V |
    | AVDD_BRF | 2.97 | 3.3 | 3.63 | 100 | Entrada de alimentação de RF |
    | MIC_BIAS | 1.4 | - | 2.8 | - | Saída de alimentação do microfone |

    </div>

    (1) Entrada VCC alimentada por bateria de lítio: o limite de bateria baixa configurado por padrão no software é 3.48 V. Com uma fonte de tensão constante, a faixa suportada é 3.6–4.7 V, com recomendação de 3.8 V.
    (2) VSYS alimenta AVDD_BRF.
    (3) VDD18_VOUT: SF32LB520U36 requer alimentação externa de 3.3 V; SF32LB523/5/7Ux6 usam o LDO interno e não precisam de alimentação externa. Configure o LDO VDD18 interno no software conforme o modelo do chip e não o habilite quando houver alimentação externa.
    (4) VDD33_VOUT1: no SF32LB520U36, alimenta apenas VDD18_VOUT, a Flash externa e AVDD33_AUD; no SF32LB523/5/7Ux6, alimenta apenas a Flash externa e AVDD33_AUD.

=== "52B/D/E/G/J (alimentação externa regulada)"

    <div align="center"><em>Tabela 5.2-2: Requisitos de alimentação dos modelos com fonte externa regulada</em></div>

    <div align="center" markdown>

    | Pino | Mín. (V) | Típ. (V) | Máx. (V) | Corrente máxima (mA) | Descrição |
    |:---|:---|:---|:---|:---|:---|
    | PVDD | 2.97 | 3.3 | 3.63 | 150 | Entrada de alimentação do sistema PVDD, capacitor de 10 uF |
    | BUCK_LX | - | 1.25 | - | 50 | Pino de saída BUCK, conectado a um indutor de 4.7 uH |
    | BUCK_FB | - | 1.25 | - | 50 | Realimentação BUCK / entrada de alimentação interna, conectada à outra extremidade do indutor e a um capacitor de 4.7 uF |
    | VDD_VOUT1 | - | 1.1 | - | 50 | LDO interno, capacitor de 4.7 uF; não alimenta periféricos |
    | VDD_VOUT2 | - | 0.9 | - | 20 | LDO interno, capacitor de 4.7 uF; não alimenta periféricos |
    | VDD_RET | - | 0.9 | - | 1 | LDO interno, capacitor de 0.47 uF; não alimenta periféricos |
    | VDD_RTC | - | 1.1 | - | 1 | LDO interno, capacitor de 1 uF; não alimenta periféricos |
    | VDDIOA | 1.71 | 1.8/3.3 | 3.63 | - | Entrada de alimentação dos GPIOs, capacitor de 1 uF |
    | AVDD33 | 2.97 | 3.3 | 3.63 | 100 | Entrada de alimentação analógica de 3.3 V, capacitor de 4.7 uF |
    | AVDD33_AUD | 2.97 | 3.3 | 3.63 | 50 | Entrada de alimentação de áudio de 3.3 V, capacitor de 2.2 uF |
    | VDD_SIP | 1.71 | 1.8/3.3 | 3.63 | 30 | LDO interno ou alimentação externa (1), capacitor de 1 uF |
    | AVDD_BRF | 2.97 | 3.3 | 3.63 | 100 | Entrada de alimentação analógica, capacitor de 4.7 uF |
    | MIC_BIAS | 1.4 | - | 2.8 | - | Saída de alimentação do microfone, capacitor de 1 uF |

    </div>

    (1) VDD_SIP: SF32LB52BU36 requer alimentação externa de 1.8 V ou 3.3 V; SF32LB52BU56 requer alimentação externa de 3.3 V; SF32LB52DUB6 requer alimentação externa de 1.8 V; SF32LB52E/G/JUx6 são alimentados diretamente pelo LDO interno e não precisam de alimentação externa.

    !!! important "Observação sobre o modo Hibernate"
        Ao entrar no modo Hibernate, VDD_SIP deve ser desligado para evitar corrente de fuga pelos pinos de I/O da memória no mesmo encapsulamento. Use o pino dedicado PA21 para controlar a chave de alimentação de VDD_SIP.

##### 5.2.1.2. Seleção do indutor BUCK { #5212-buck-inductor-selection }

Os dois grupos de projeto usam a mesma especificação de indutor.

!!! important "Parâmetros essenciais do indutor de potência"
    L (indutância) = 4.7 uH ± 20%, DCR (resistência DC) ≤ 0.4 Ω, Isat (corrente de saturação) ≥ 450 mA.

##### 5.2.1.3. Bateria e controle de carregamento { #5213-battery-and-charging-control }

=== "SF32LB520/3/5/7 (alimentação por bateria)"

    Há duas opções de circuito de carregamento: CI externo de gerenciamento de carga ou módulo de gerenciamento de carga integrado no chip.

    **CI externo de gerenciamento de carga**

    Os CIs carregadores externos podem incluir ou não gerenciamento do caminho de alimentação (PPM). Sem PPM, a bateria alimenta diretamente os pinos VBAT e VCC. Com PPM, a saída VSYS do carregador alimenta VCC, e o VBAT do carregador é conectado à bateria e ao pino VBAT do chip. Nos dois casos, a tensão da bateria é medida pelo pino VBAT, que integra um canal GPADC com precisão de amostragem de ±30 mV.

    ![Figura 5.2-1: Circuito externo de carregamento sem PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-1: Circuito externo de carregamento sem PPM</em></div>

    ![Figura 5.2-2: Circuito externo de carregamento com PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-2: Circuito externo de carregamento com PPM</em></div>

    Com PPM, conecte a saída VSYS do carregador ao pino VCC do chip e mantenha a tensão de saída padrão de VSYS do carregador em no máximo 4,7 V, a tensão máxima de entrada de VCC.

    **Módulo de gerenciamento de carga integrado no chip**

    Com o módulo de carga integrado, se a bateria estiver fraca e o dispositivo estiver desligado, conectar um carregador não provoca a inicialização imediata. A bateria precisa atingir o limite de tensão de partida para que o sistema inicialize e exiba a tela de carregamento.

    ![Figura 5.2-3: Circuito integrado de gerenciamento de carga](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-3: Circuito integrado de gerenciamento de carga</em></div>

    **Seleção do CI OVP ao usar o módulo de carga integrado**

    A faixa de entrada VBUS é 4.5 V–5.5 V. Selecione um dos seguintes tipos de CI OVP:

    - CI OVP com OVLO ajustável, como AW32905FCR: ajuste OVLO entre 5.2 V e 5.5 V (tolerância de VOVLO_TH ≤3%, tolerância dos resistores ≤1%)
    - CI OVP com saída regulada, como SGM4064YDE8G ou LP5305AQVF: a saída do regulador deve ficar entre 4.5 V e 5.4 V

    !!! important "Limites de VBUS e OVP: divergência na fonte"
        A nota de aplicação OpenSiFli das variantes alimentadas por bateria contém valores conflitantes para VBUS: a seção de seleção do OVP indica 4.5–5.5 V para o pino VBUS do chip, enquanto a tabela de alimentação e as notas do carregador integrado indicam 4.6–5.5 V e exigem pelo menos 4.6 V no pino com a corrente máxima de carga. A Electrical Specification-A3 indica a faixa geral de 4.5–5.5 V, e o esquemático de carga de referência está marcado como 4.3–5.5 V. Em projetos com carregador integrado, mantenha pelo menos 4.6 V no pino sob carga máxima até que a SiFli esclareça o limite mínimo aplicável; não trate os 4.3 V do esquemático como limite inferior aprovado.

        A mesma nota define `VIN_OVLO` entre 5.2 e 5.5 V para dispositivos OVP com OVLO ajustável; a tolerância de `VOVLO_TH` deve ser ≤3%, e a de R1/R2, ≤1%. Para dispositivos OVP com saída regulada, especifica uma saída LDO de 4.5–5.4 V. Esses são ajustes específicos de cada topologia OVP, não faixas de operação do VBUS do chip que possam ser intercambiadas. Considere as tolerâncias dos componentes e confirme com a SiFli qual é o projeto aprovado.

    ![Figura 5.2-4: Fórmula do limite OVLO](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-4: Fórmula do limite OVLO</em></div>

    ![Figura 5.2-5: Circuito de aplicação de OVP com OVLO ajustável](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-5: Circuito de aplicação de OVP com OVLO ajustável</em></div>

    ![Figura 5.2-6: Circuito de aplicação de OVP com saída regulada](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-6: Circuito de aplicação de OVP com saída regulada</em></div>

    !!! important "Observações sobre o módulo de carga integrado"
        - Faixa de entrada VBUS: 4.6 V–5.5 V
        - Faixa de entrada VCC: 3.2 V–4.7 V
        - Corrente padrão de pré-carga: 56 mA; tensão de transição da pré-carga para corrente constante: 3.0 V
        - Corrente constante de carga padrão: 65 mA, ajustável entre 5–560 mA
        - Tensão de carga completa padrão: 4.2 V, ajustável até 4.45 V
        - Tensão de reinício da carga: tensão de carga completa - 0.15 V
        - O VBUS do carregador deve fornecer pelo menos 350 mA; a tensão no pino VBUS não pode cair abaixo de 4.6 V na corrente máxima de carga
        - No carregamento sem fio, a capacidade de fornecimento do carregador deve superar a corrente constante de carga

    !!! important "Observações sobre os LDOs integrados"
        - A capacitância total nos caminhos de saída VDD33_VOUT1 e VDD33_VOUT2 não pode exceder 9.6 uF
        - AVDD33_AUD deve ser alimentado por VDD33_VOUT1, não por VSYS
        - Não alimente o LCD pelo LDO interno: use um LDO externo

=== "52B/D/E/G/J (alimentação externa regulada)"

    !!! info "Não se aplica"
        Os modelos com alimentação externa regulada recebem energia diretamente de uma fonte regulada e **não possuem circuito de gerenciamento de carga**. Esta seção não se aplica a eles. Se o produto precisar de alimentação por bateria e carregamento, use a série SF32LB520/3/5/7.

##### 5.2.1.4. Redução do consumo em standby { #5214-reducing-standby-power }

=== "SF32LB520/3/5/7 (alimentação por bateria)"

    Estrutura de alimentação recomendada: **VDD33_VOUT2** alimenta o motor de vibração, **VDD33_VOUT1** alimenta a Flash externa e os sensores, e o LCD usa um LDO externo.

    ![Figura 5.2-7: Estrutura de alimentação do sistema SF32LB52x](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.2-7: Estrutura de alimentação do sistema SF32LB52x</em></div>

    Defina cuidadosamente o estado padrão dos GPIOs que controlam as chaves de alimentação. Acrescente resistores de pull-up/pull-down na faixa de megaohms para que as chaves de carga permaneçam desligadas por padrão. Selecione LDOs e chaves de carga com baixa corrente quiescente (Iq) e baixa corrente em desligamento (Istb). Nos dispositivos de alimentação que permanecem ligados, dê atenção especial a Iq.

=== "52B/D/E/G/J (alimentação externa regulada)"

    Use chaves de carga para gerenciar dinamicamente a alimentação de cada bloco funcional. Para módulos ou caminhos que permanecem ligados, escolha componentes com baixa corrente quiescente.

    Defina cuidadosamente o estado padrão dos GPIOs que controlam as chaves de alimentação. Acrescente resistores de pull-up/pull-down na faixa de megaohms para que as chaves de carga permaneçam desligadas por padrão. Selecione LDOs e chaves de carga com baixa corrente quiescente (Iq) e baixa corrente em desligamento (Istb). Nos dispositivos de alimentação que permanecem ligados, dê atenção especial a Iq.

##### 5.2.1.5. Checklist de alimentação { #5215-power-design-checklist }

- [ ] O grupo de alimentação (bateria / fonte externa regulada) foi confirmado para o modelo exato do chip
- [ ] O indutor BUCK atende a 4.7 uH ±20%, DCR ≤0.4 Ω, Isat ≥450 mA
- [ ] Todos os capacitores de desacoplamento dos LDOs internos foram posicionados conforme os requisitos
- [ ] A alimentação do LCD está isolada e não é fornecida diretamente pelo LDO interno
- [ ] As alimentações de áudio e RF estão filtradas adequadamente
- [ ] Modelos com bateria: caminho de carregamento e faixas de tensão do OVP verificados; modelos com fonte externa regulada: VDD_SIP/VDDIOA configurados corretamente para o modelo do chip

**Erros frequentes: alimentação**

- Alimentar o LCD diretamente por um LDO interno, em vez de usar um LDO externo.
- Misturar premissas de alimentação por bateria e por fonte externa regulada no mesmo esquemático.
- Manter `VDD_SIP` alimentado durante Hibernate em modelos com risco de fuga no armazenamento.
- Escolher um carregador ou OVP sem verificar a corrente e a faixa de tensão de VBUS no pior caso.

**Verificações de inicialização: alimentação**

- Meça `VCC`/`PVDD`, a saída BUCK, as alimentações de RF/áudio e a alimentação do armazenamento antes de o firmware habilitar os periféricos.
- Confirme a conexão do carregador, a pré-carga, a carga com corrente constante e o reinício de carga nos projetos com bateria.
- Meça a corrente em standby e Hibernate com as chaves de carga de display, sensores, armazenamento e motor desligadas.

#### 5.2.2. Modos de operação e fontes de despertar { #522-operating-modes-and-wake-sources }

**Resumo**

- Active e Sleep mantêm resposta rápida a interrupções; DeepSleep e Standby reduzem a corrente em troca de maior tempo de despertar.
- Hibernate é o estado de menor consumo, mas não preserva a SRAM e exige desligar algumas alimentações externas.
- A seleção dos GPIOs capazes de despertar o sistema afeta botões, interrupções de toque, eventos do carregador e despertar por sensores.

**Objetivo do projeto**

Selecione as fontes de despertar e os estados padrão das chaves de alimentação externas para que o produto entre no modo de baixo consumo previsto sem caminhos de fuga ou perda de eventos de despertar.

!!! note "Projeto comum"
    Os modos de operação e o comportamento das fontes de despertar se aplicam a toda a família SF32LB52x, a menos que a árvore de alimentação do produto desligue intencionalmente uma fonte externa de retomada.

<div align="center"><em>Tabela 5.2-3: Modos da CPU</em></div>

<div align="center" markdown>

| Modo | CPU | Periféricos | SRAM | IO | LPTIM | Fonte de despertar | Tempo de despertar |
|:---|:---|:---|:---|:---|:---|:---|:---|
| Active | Em execução | Em execução | Acessível | Pode comutar | Em execução | - | - |
| Sleep | Parada | Em execução | Acessível | Pode comutar | Em execução | Qualquer interrupção | <0.5 us |
| DeepSleep | Parada | Parados | Inacessível, conteúdo totalmente preservado | Nível mantido | Em execução | RTC, I/O de despertar, GPIO, LPTIM, Bluetooth | 250 us |
| Standby | Reinicializada | Reinicializados | Inacessível, conteúdo totalmente preservado | Nível mantido | Em execução | RTC, I/O de despertar, LPTIM, Bluetooth | 1 ms |
| Hibernate | Reinicializada | Reinicializados | Inacessível, conteúdo não preservado | High-Z | Reinicializado | RTC, I/O de despertar | >2 ms |

</div>

Toda a família suporta 15 fontes de interrupção capazes de despertar o sistema nos modos Standby e Hibernate:

<div align="center"><em>Tabela 5.2-4: Fontes de interrupção para despertar</em></div>

<div align="center" markdown>

| Fonte de despertar | Pino | Fonte de despertar | Pino |
|:---|:---|:---|:---|
| LWKUP_PIN0 | PA24 | LWKUP_PIN12 | PA36 |
| LWKUP_PIN1 | PA25 | LWKUP_PIN13 | PA37 |
| LWKUP_PIN2 | PA26 | LWKUP_PIN14 | PA38 |
| LWKUP_PIN3 | PA27 | LWKUP_PIN15 | PA39 |
| LWKUP_PIN10 | PA34 | LWKUP_PIN16 | PA40 |
| LWKUP_PIN11 | PA35 | LWKUP_PIN17 | PA41 |
| — | — | LWKUP_PIN18 | PA42 |
| — | — | LWKUP_PIN19 | PA43 |
| — | — | LWKUP_PIN20 | PA44 |

</div>

**Checklist dos modos de operação**

- [ ] Os pinos necessários para despertar foram definidos antes de finalizar o pin-mux.
- [ ] Os estados de pull-up/pull-down dos pinos de despertar são compatíveis com Standby e Hibernate.
- [ ] As alimentações externas do armazenamento e sensores não provocam fugas pelos pinos de I/O em Hibernate.
- [ ] As equipes de hardware e firmware acordaram os estados usados no transporte, durante o armazenamento do produto e no standby normal.

### 5.3. Geração de clock { #53-clock-generation }

#### 5.3.1. Seleção dos cristais { #531-crystal-selection }

**Resumo**

- Use um cristal principal de 48 MHz e um cristal de RTC de 32.768 kHz.
- Prefira componentes da AVL com CL e ESR baixos para reduzir a corrente de partida e a corrente estática.
- Mantenha as trilhas dos cristais curtas, com blindagem e afastadas de calor e de ruído de RF, carregador, PMU e DC/DC.

**Objetivo do projeto**

Forneça clocks estáveis e com baixo jitter, minimizando a corrente dos osciladores, a deriva de frequência, a interferência de RF e os riscos de inicialização.

O chip requer duas fontes externas de clock: um cristal principal de 48 MHz e um cristal de RTC de 32.768 kHz. Os requisitos são iguais para os dois grupos.

!!! important "Especificações exigidas dos cristais"
    <div align="center"><em>Tabela 5.3-1: Especificações exigidas dos cristais</em></div>

    <div align="center" markdown>

    | Cristal | Requisito | Observações |
    |:---|:---|:---|
    | 48 MHz | 7 pF ≤ CL ≤ 12 pF (8.8 pF recomendado), ΔF/F0 ≤ ±10 ppm, ESR ≤ 30 Ω (22 Ω recomendado) | CL e ESR menores reduzem o consumo; normalmente não são necessários capacitores de ajuste quando CL < 12 pF |
    | 32.768 kHz | CL ≤ 12.5 pF (7 pF recomendado), ΔF/F0 ≤ ±20 ppm, ESR ≤ 80 kΩ (38 kΩ recomendado) | CL e ESR menores reduzem o consumo; normalmente não são necessários capacitores de ajuste quando CL < 12.5 pF |

    </div>

Cristais recomendados:

<div align="center"><em>Tabela 5.3-2: Cristais recomendados</em></div>

<div align="center" markdown>

| Código do componente | Fabricante | Parâmetros |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0=48 MHz, ΔF/F0=-6~8 ppm, CL=8.8 pF, ESR≤22 Ω, TOPR=-30~85°C, encapsulamento métrico 2016 |
| SX20Y048000B31T-8.8 | TKD | F0=48 MHz, ΔF/F0=-10~10 ppm, CL=8.8 pF, ESR≤40 Ω, TOPR=-20~75°C, encapsulamento métrico 2016 |
| ETST00327000LE | Hosonic | F0=32.768 kHz, ΔF/F0=-20~20 ppm, CL=7 pF, ESR≤70 kΩ, TOPR=-40~85°C, encapsulamento métrico 3215 |
| SF32K32768D71T01 | TKD | F0=32.768 kHz, ΔF/F0=-20~20 ppm, CL=7 pF, ESR≤70 kΩ, TOPR=-40~85°C, encapsulamento métrico 3215 |

</div>

!!! note "Observações adicionais"
    O TKD SX20Y048000B31T-8.8 tem ESR um pouco maior, o que aumenta ligeiramente o consumo estático. A nota de aplicação de esquemático da SiFli também recomenda remover pelo menos o cobre GND da segunda camada sob o cristal de 48 MHz para reduzir a capacitância parasita de carga. Porém, o guia de layout da PCB proíbe vazios no plano ou recortes de cobre sob o cristal em camadas adjacentes. As recomendações são conflitantes; consulte [Roteamento de clock](SF32LB52x_pcb_layout.md#65-clock-interface-routing). Confirme com a SiFli o tratamento previsto para as camadas antes de liberar o layout.

!!! important "Exceção de ESR do cristal na fonte"
    A fonte lista o TKD SX20Y048000B31T-8.8 com ESR ≤ 40 Ω, embora o requisito geral de 48 MHz seja ESR ≤ 30 Ω. Verifique a qualificação desse componente específico; isso não significa que qualquer cristal de 40 Ω seja adequado. Antes da liberação, confirme a aprovação do código exato na AVL vigente e valide a partida, a calibração de frequência e a corrente do oscilador.

!!! important "A recomendação do cristal de 32,768 kHz diverge dentro da fonte"
    A tabela de parâmetros de 32,768 kHz recomenda CL = 7 pF e ESR = 38 kΩ, enquanto o texto recomenda CL ≤ 9 pF e ESR ≤ 40 kΩ. Ambas as indicações constam na fonte. Antes da liberação, confirme com a SiFli qual valor deve ser aplicado e a qualificação AVL do cristal escolhido.

Para consultar os dados completos de qualificação, atualizados continuamente, veja a [Lista de fornecedores aprovados pela SiFli][Lista de fornecedores aprovados pela SiFli (AVL)].

**Erros frequentes: clock**

- Escolher o cristal apenas pela frequência e pelo encapsulamento, sem verificar CL, ESR, tolerância e faixa de temperatura.
- Posicionar o cristal perto de PA, carregador, PMU, rede de casamento de RF ou outras fontes de calor e ruído.
- Manter cobre ou trilhas de alta velocidade sob a área de exclusão do cristal.
- Usar trilhas de 32 kHz longas e paralelas, sem espaçamento ou blindagem de terra.

**Checklist de clock**

- [ ] Os cristais de 48 MHz e 32.768 kHz atendem aos requisitos da AVL e do datasheet.
- [ ] A capacitância de carga e a ESR dos cristais foram verificadas em relação aos limites do oscilador.
- [ ] A área de exclusão, o comprimento e a largura das trilhas, o espaçamento e a blindagem de terra foram verificados na revisão da PCB.
- [ ] O plano de inicialização inclui medições de 48 MHz e 32 kHz e a verificação do comportamento da calibração de frequência Bluetooth.

---

Continue em [RF e interfaces de usuário](SF32LB52x_schematic_rf_interfaces.md).

[Lista de fornecedores aprovados pela SiFli (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
