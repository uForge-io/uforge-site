---
icon: lucide/circuit-board
hide:
    - navigation
description: "Diretrizes de esquemático do SF32LB52x para armazenamento, conectividade e fabricação: boot, sensores, interface de depuração/download e gravação em produção."
tags:
    - Hardware
    - Microcontroladores
---

# Guia de projeto de hardware SF32LB52x — Armazenamento e fabricação { #sf32lb52x-hardware-design-guide-storage-manufacturing }

!!! note "Parte do guia de projeto de hardware SF32LB52x"
    Esta página cobre as Seções 5.6 e 5.7 das diretrizes de projeto do esquemático: armazenamento e conectividade, e fabricação. Volte a [RF e interfaces de usuário](SF32LB52x_schematic_rf_interfaces.md) ou consulte o [Checklist do esquemático](SF32LB52x_schematic_checklist.md) para a revisão item por item.

### 5.6. Armazenamento e conectividade { #56-storage-and-connectivity }

#### 5.6.1. Armazenamento { #561-storage }

**Resumo rápido**

- As opções de boot externo incluem SPI NOR, SPI NAND e SD NAND; eMMC está disponível nos modelos compatíveis com alimentação externa regulada.
- Os pinos de bootstrap `PA13` e `PA17` selecionam a mídia de boot.
- As notas de aplicação e o guia de projeto do esquemático indicam `PA21` para comutar a alimentação do armazenamento de boot, enquanto o checklist oficial indica `PA11` para a Flash externa das variantes alimentadas por bateria. Confirme com a SiFli qual pino de controle se aplica ao projeto exato. Como requisito separado, a Flash NOR de 32 MB ou mais conectada via MPI deve poder ser desligada e religada por PA21 para que a ROM a reconheça após um reset ou a entrada em Hibernate. Durante o Hibernate, VDD_SIP deve ficar desligado para evitar fuga de corrente nas E/S da memória integrada ao encapsulamento.

**Objetivo do projeto**

Escolha a mídia de boot e a arquitetura de alimentação do armazenamento considerando o tamanho do firmware, a estratégia de atualização, os modos de baixo consumo e a inicialização confiável pela ROM após um reset ou o Hibernate.

##### 5.6.1.1. Descrição da interface de armazenamento { #5611-storage-interface-description }

O chip aceita Flash SPI NOR, SPI NAND e SD NAND externas. **eMMC é compatível somente com as variantes 52B/D/E/G/J alimentadas por fonte regulada externa.**

<div align="center"><em>Tabela 5.6-1: Conexões dos sinais de Flash SPI NOR/NAND</em></div>

<div align="center" markdown>

| Sinal da Flash | Pino de E/S | Descrição |
|:---|:---|:---|
| CS# | PA12 | Seleção do chip, ativa em nível baixo |
| SO | PA13 | Dado IO1 |
| WP# | PA14 | Dado IO2 / proteção contra gravação |
| SI | PA15 | Dado IO0 |
| SCLK | PA16 | Clock serial |
| Hold# | PA17 | Dado IO3 / hold |

</div>

<div align="center"><em>Tabela 5.6-2: Conexões dos sinais SD NAND Flash e eMMC</em></div>

<div align="center" markdown>

| Sinal SD NAND/eMMC | Pino de E/S | Descrição |
|:---|:---|:---|
| SD2_CMD | PA15 | Comando |
| SD2_D1 | PA17 | Dado 1 |
| SD2_D0 | PA16 | Dado 0 |
| SD2_CLK | PA14 | Clock |
| SD2_D2 | PA12 | Dado 2 |
| SD2_D3 | PA13 | Dado 3 |

</div>

!!! note "Domínios de alimentação do eMMC (somente variantes alimentadas por fonte regulada externa)"
    Os chips eMMC têm dois domínios de alimentação: VCC e VCCQ. Opção 1: comutar os dois juntos — reduz a corrente no desligamento, mas torna mais lenta a recuperação do eMMC após o modo sleep e aumenta o consumo médio do processador. Opção 2: comutar somente VCC e manter VCCQ sempre ligado — a corrente no desligamento é maior do que na opção 1, mas a recuperação do eMMC é mais rápida e o consumo médio do processador é menor.

!!! important "Pull-ups das interfaces de armazenamento"
    A nota de aplicação dos modelos com alimentação externa regulada especifica: NOR Flash não exige pull-up externo; SPI NAND exige um em PA17 (Hold#); SD NAND exige pull-ups em PA13 (D3) e PA15 (CMD); eMMC exige pull-ups em PA17 (D1), PA13 (D3) e PA15 (CMD). O valor recomendado é 7,5 kΩ. A nota das variantes alimentadas por bateria menciona apenas os footprints de bootstrap PA13/PA17 e não informa se o pull-up PA15/CMD também é necessário. Não aplique às variantes com bateria o requisito PA15 dos modelos com alimentação regulada sem confirmação; valide com a SiFli os pull-ups para a variante e a mídia de boot específicas.

##### 5.6.1.2. Configuração de boot { #5612-boot-configuration }

=== "SF32LB520/3/5/7 (alimentação por bateria)"

    O chip pode inicializar pela Flash SPI NOR integrada ao encapsulamento ou por uma Flash SPI NOR, SPI NAND ou SD NAND externa (**não há suporte a boot por eMMC**):

    - O SF32LB520Ux6 tem Flash integrada ao encapsulamento e inicializa por ela por padrão.
    - Os SF32LB523/5/7Ux6 têm PSRAM integrada ao encapsulamento e precisam inicializar por um armazenamento externo.

    ![Figura 5.6-1: Circuito recomendado para os pinos de bootstrap (variante alimentada por bateria)](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.6-1: Circuito recomendado para os pinos de bootstrap (variante alimentada por bateria)</em></div>

    <div align="center"><em>Tabela 5.6-3: Configuração das opções de boot (variante alimentada por bateria)</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | Mídia de boot |
    |:---|:---|:---|
    | L | L | Flash SPI NOR |
    | L | H | Flash SPI NAND |
    | H | X | Flash SD NAND |

    </div>

=== "52B/D/E/G/J (alimentação regulada externa)"

    O chip pode inicializar pela Flash SPI NOR integrada ao encapsulamento, por uma Flash SPI NOR, SPI NAND ou SD NAND externa, ou por **eMMC** externo:

    - O modelo com Flash integrada ao encapsulamento (SF32LB52BU36) inicializa por ela por padrão.
    - Os modelos com PSRAM integrada ao encapsulamento (SF32LB52DUB6/EUB6/GUC6/JUD6) precisam inicializar por um armazenamento externo.

    ![Figura 5.6-2: Circuito recomendado para os pinos de bootstrap (variante com alimentação regulada externa)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figura 5.6-2: Circuito recomendado para os pinos de bootstrap (variante com alimentação regulada externa)</em></div>

    <div align="center"><em>Tabela 5.6-4: Configuração das opções de boot (variante com alimentação regulada externa)</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | Mídia de boot |
    |:---|:---|:---|
    | L | L | Flash SPI NOR |
    | L | H | Flash SPI NAND |
    | H | X | Flash SD NAND |
    | H | H | eMMC |

    </div>

    !!! note "Observação sobre a nomenclatura no documento original da SiFli"
        Nesta seção, o documento original da SiFli usa os sufixos "SF32LB52AUx6" e "SF32LB52D/F/HUx6", que não correspondem à nomenclatura B/D/E/G/J apresentada no início do mesmo documento. Este guia esclarece a distinção pelo tipo de memória integrada ao encapsulamento (Flash ou PSRAM). Em caso de dúvida, confirme o modelo exato do chip e consulte o datasheet.

!!! important "Confirme as configurações de boot que se sobrepõem"
    As notas de aplicação indicam H/X para SD NAND, enquanto o guia de projeto de esquemático separado do SF32LB52x indica H/L; a nota de aplicação para variantes com alimentação externa regulada também indica H/H para eMMC. Como X normalmente significa qualquer um dos níveis lógicos, as entradas das variantes com alimentação externa regulada se sobrepõem, e as fontes não explicam a diferença. Não deduza os níveis finais dos straps apenas a partir dessas tabelas; confirme com a SiFli a variante exata e o comportamento da ROM. Os circuitos de referência usam pull-ups de 7,5 kΩ: a Figura 5.6-1 os conecta a VDD33_VOUT1 de 3,3 V, e a Figura 5.6-2 a VDDIOA de 3,3 V.

##### 5.6.1.3. Controle da alimentação do armazenamento de boot { #5613-boot-storage-power-control }

As notas de aplicação e o guia de projeto de esquemático da OpenSiFli, de maior prioridade, especificam `PA21` para comutar a alimentação do armazenamento de boot (nível alto: ligado; nível baixo: desligado); use `PA21` como base de projeto respaldada pelas fontes. Já a planilha de checklist vinculada na wiki da SiFli indica, em vez disso, `PA11` para a comutação da Flash externa das variantes alimentadas por bateria. Não substitua PA21 por `PA11` com base apenas nessa planilha. Ela não esclarece se `PA11` é outro sinal de habilitação na placa ou uma divergência de atribuição; confirme com a SiFli a rede e a variante exatas antes de liberar o projeto.

=== "SF32LB520/3/5/7 (alimentação por bateria)"

    - O SF32LB520Ux6 tem Flash integrada ao encapsulamento: alimente VDD18_VOUT a partir de VDD33_VOUT1 e desabilite o LDO interno de VDD18_VOUT.
    - Os SF32LB523/5/7Ux6 têm PSRAM integrada ao encapsulamento: use o LDO interno; VDD18_VOUT também pode receber alimentação externa.
    - Alimente a Flash NOR externa por VDD33_VOUT1; não é necessário adicionar outra chave de alimentação.
    - Para Flash SPI NAND ou SD NAND externa, use VDD33_VOUT1 e adicione uma chave de alimentação.
    - O projeto de referência reserva posições para resistores de pull-up em PA13 e PA17. Instale-os conforme o tipo de armazenamento; recomenda-se 7,5 kΩ.

=== "52B/D/E/G/J (alimentação regulada externa)"

    - Para o modelo com Flash integrada ao encapsulamento (SF32LB52BU36), adicione uma chave de alimentação em VDD_SIP.
    - Para os modelos com PSRAM integrada ao encapsulamento (SF32LB52DUB6/EUB6/GUC6/JUD6): se PVDD = 3,3 V e VDD_SIP usar o LDO interno, a chave de alimentação de VDD_SIP é opcional; se PVDD = 1,8 V, ela é obrigatória.
    - A alimentação do armazenamento externo é independente de VDD_SIP; adicione uma chave de alimentação separada.
    - Consulte a Seção 5.6.1.1 para conhecer as alternativas de alimentação de VCC/VCCQ do eMMC.
    - A nota de aplicação especifica **PA21** para as chaves de alimentação do armazenamento relacionadas ao boot; a divergência entre as fontes para a Flash externa das variantes alimentadas por bateria foi indicada acima.
    - A alimentação da Flash NOR de 32 MB ou mais conectada por MPI (Memory Peripheral Interface, que conecta SPI-NOR/SPI-NAND) deve poder ser desligada e religada por PA21 para que a Flash saia do modo de 4 bytes quando o MCU reiniciar ou entrar em Hibernate; caso contrário, a ROM não a reconhecerá. Flash NOR de até 16 MB pode permanecer sempre alimentada.
    - O projeto de referência reserva posições para resistores de pull-up em PA13 e PA17. Instale-os conforme o tipo de armazenamento; recomenda-se 7,5 kΩ.

**Erros comuns — armazenamento**

- Não instalar os resistores de bootstrap ou instalá-los para a mídia de boot errada.
- Deixar desconectado o controle da chave de alimentação do armazenamento de boot confirmado pela fonte.
- Presumir que eMMC está disponível em todas as variantes.
- Manter uma Flash NOR de alta capacidade sempre alimentada quando o modo de 4 bytes pode impedir que a ROM a reconheça após uma reinicialização.

**Checklist do armazenamento**

- [ ] A mídia de boot foi selecionada e documentada antes do layout da PCB.
- [ ] As opções de pull-up de bootstrap em `PA13`/`PA17` correspondem à tabela de boot.
- [ ] Todas as chaves de alimentação necessárias ao armazenamento de boot são controladas pelo pino específico da variante confirmado pela fonte; a divergência entre PA11 e PA21 foi resolvida com a SiFli.
- [ ] As alternativas de alimentação de VCC/VCCQ do eMMC foram avaliadas nos projetos alimentados por fonte regulada externa.
- [ ] O plano de bring-up cobre os straps do modo de boot, a sequência temporal das linhas de alimentação do armazenamento, a leitura do ID e o download do firmware.

#### 5.6.2. Sensores { #562-sensors }

**Resumo rápido**

- Sensores normalmente se conectam por I2C ou SPI. Desligue a alimentação dos sensores não utilizados para reduzir a corrente em standby; mantenha os necessários para despertar o sistema no modo de operação exigido.
- Atribua os pinos de interrupção dos sensores usados para despertar o sistema antes de fechar a pinagem.

**Objetivo do projeto**

Mantenha confiáveis a alimentação, as interrupções e o roteamento dos barramentos dos sensores, permitindo desligar corretamente os sensores que não estiverem em uso durante os modos de baixo consumo.

O SF32LB52x pode se conectar a sensores de frequência cardíaca, acelerômetros, sensores geomagnéticos e outros semelhantes. Para comutar a alimentação dos sensores, escolha uma chave de carga com baixa corrente quiescente (Iq).

**Checklist dos sensores**

- [ ] Os pinos de barramento, interrupção, reset e habilitação da alimentação de cada sensor estão definidos.
- [ ] A corrente quiescente (Iq) e a corrente no estado desligado da chave de carga dos sensores atendem à meta de standby.
- [ ] Os resistores de pull-up estão conectados à linha de alimentação de E/S correta dos sensores.
- [ ] O plano de bring-up inclui a varredura do barramento, o despertar por interrupção e o ciclo de alimentação dos sensores.

#### 5.6.3. Atribuição de pinos UART e I2C { #563-uart-and-i2c-pin-assignment }

**Resumo rápido**

- As funções UART e I2C podem ser mapeadas para quaisquer pinos PA.
- Ainda assim, recomenda-se considerar as restrições de boot, despertar, depuração, testes de produção e roteamento da placa ao escolher os pinos.

**Objetivo do projeto**

Use o mapeamento flexível de pinos para simplificar o roteamento sem bloquear os straps de boot, os pinos de despertar, o acesso de depuração ou os pontos de contato do gabarito de teste de produção.

O SF32LB52x permite mapear as funções UART e I2C para quaisquer pinos PA.

**Checklist UART/I2C**

- [ ] Os resistores de pull-up, os domínios de tensão e a capacitância do barramento estão corretos para cada barramento I2C.
- [ ] Os pinos UART necessários para logs, download ou módulos externos estão acessíveis.
- [ ] A multiplexação dos pinos não conflita com as funções de bootstrap, despertar, display, armazenamento ou depuração.

#### 5.6.4. Atribuição de pinos GPTIM { #564-gptim-pin-assignment }

**Resumo rápido**

- As funções GPTIM podem ser mapeadas para quaisquer pinos PA.
- As funções do temporizador permitem saídas PWM, captura de entrada, controle de motor, controle do backlight e temporização específica do produto.

**Objetivo do projeto**

Reserve as funções de temporizador com antecedência para evitar que, no fim do projeto, os recursos de PWM, captura e temporização tenham de usar pinos com roteamento desfavorável ou em conflito com o despertar do sistema.

O SF32LB52x permite mapear as funções GPTIM para quaisquer pinos PA.

**Checklist GPTIM**

- [ ] Os canais de temporizador necessários para PWM, captura ou malhas de controle estão listados na tabela de pinagem.
- [ ] Os pinos GPTIM não conflitam com os requisitos de backlight, motor, depuração ou armazenamento.
- [ ] O plano de bring-up inclui a verificação da frequência PWM, da faixa de ciclo de trabalho e da polaridade dos pinos.

### 5.7. Fabricação { #57-manufacturing }

#### 5.7.1. Interface de depuração e download { #571-debug-and-download-interface }

**Resumo rápido**

- `PA18` e `PA19` usam DBG_UART por padrão após a energização e são multiplexados com SWD.
- Reserve acesso físico aos pinos de depuração/download em todas as placas de protótipo e de produção.

**Objetivo do projeto**

Garanta acesso para gravar firmware, consultar logs, depurar passo a passo e recuperar o sistema de falhas, mesmo depois de definidos o gabinete do produto e o gabarito de teste de produção.

O SF32LB52x oferece a interface DBG_UART para download e depuração, que pode ser conectada a um PC por meio de um adaptador UART-USB de 3,3 V. SWD e DBG_UART são multiplexados nos pinos PA18 e PA19. A configuração padrão após a energização é DBG_UART, que permite depuração passo a passo e saída de logs.

Para depuração passo a passo e saída de logs por DBG_UART, consulte os manuais do SFtool e do Impeller.

<div align="center"><em>Tabela 5.7-1: Conexões da porta de depuração</em></div>

<div align="center" markdown>

| Sinal de depuração | Pino | Descrição |
|:---|:---|:---|
| DBG_UART_RXD | PA18 | Recepção da UART de depuração |
| DBG_UART_TXD | PA19 | Transmissão da UART de depuração |

</div>

**Checklist da depuração**

- [ ] `PA18`/`PA19`, o GND e a referência de alimentação necessária estão disponíveis em pads de teste ou pinos de um conector.
- [ ] O acesso de depuração continua disponível depois da montagem do gabinete, da bateria e do display.
- [ ] O nível de tensão UART de 3,3 V é compatível com o adaptador ou gabarito de teste escolhido.
- [ ] O procedimento de recuperação está documentado para placas que não conseguem inicializar o firmware da aplicação.

#### 5.7.2. Gravação em produção e calibração do cristal { #572-production-flashing-and-crystal-calibration }

**Resumo rápido**

- A programação em produção e a calibração do cristal exigem alimentação estável, acesso à DBG_UART, PA01 e os pontos de teste necessários de alimentação e GND.
- O acesso do gabarito de teste deve ser previsto antes de definir o contorno mecânico da PCB e o gabinete.

**Objetivo do projeto**

Permita programar, calibrar e recuperar cada placa de produção sem soldagem manual nem desmontagem do produto.

A SiFli fornece um downloader offline para gravar o firmware de produção e calibrar o cristal. Reserve no projeto de hardware, no mínimo, os seguintes pontos de teste: PVDD/VBAT, GND, AVDD33, DBG_UART_RXD, DBG_UART_TXD e PA01. Consulte o documento "Offline Downloader User Guide", incluído no pacote de desenvolvimento, para obter o procedimento detalhado de gravação e calibração.

**Checklist de produção**

- [ ] Os pontos de teste PVDD/VBAT, GND, AVDD33, DBG_UART_RXD, DBG_UART_TXD e PA01 estão previstos.
- [ ] Os pads de teste permanecem acessíveis ao gabarito de teste previsto após a montagem mecânica.
- [ ] O fluxo de calibração do cristal e os limites de aprovação/reprovação foram definidos com a equipe de fabricação.
- [ ] Os registros de programação, calibração e testes funcionais podem ser associados à revisão da placa.

#### 5.7.3. Checklists de esquemático e layout da PCB { #573-schematic-and-pcb-drawing-checklists }

Use o [checklist oficial de esquemático e PCB][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)], publicado na wiki da SiFli, como ponto de controle formal de liberação. Consulte o [Checklist do esquemático](SF32LB52x_schematic_checklist.md) para ver a versão completa, item por item. As listas deste guia ajudam a detectar problemas comuns de engenharia antes da revisão formal.

[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx

**Checklist para liberação**

- [ ] Os checklists do esquemático e da PCB, a verificação da lista de fornecedores aprovados (AVL), o relatório DRC e o relatório de impedância estão concluídos.
- [ ] Foram arquivadas capturas de evidências sobre alimentação, clock, RF, display, armazenamento, áudio, USB, SDIO, DC/DC e acesso aos testes de produção.
- [ ] As premissas específicas de cada variante estão registradas nas notas de revisão.
- [ ] Cada risco de hardware ainda em aberto tem um responsável definido antes da liberação.
