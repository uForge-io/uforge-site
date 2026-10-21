---
icon: lucide/list-checks
hide:
    - navigation
description: "Checklist detalhado para revisar o esquemático do MCU SF32LB55x, com verificações de alimentação, clock, RF, memória, display e produção."
tags:
    - Hardware
    - Chip
    - Checklist
---

# SF32LB55x — Checklist do esquemático { #sf32lb55x-hardware-design-guide-schematic-checklist }

## 5.8. Checklist do esquemático { #58-schematic-checklist }

Cada tabela cobre um bloco funcional do esquemático. Quando houver a coluna "Aplicável a", aplique cada item somente às variantes nela indicadas.

O texto em vermelho e o fundo amarelo preservam o destaque de revisão da planilha de origem. Como ela não explica o motivo de cada destaque, trate-os como indicações adicionais para revisão; eles não alteram a categoria "Obrigatório/Opcional" do item.

### 5.8.1. Encapsulamento { #581-package }

<div align="center"><em>Tabela 5.8.1-1: Verificação do encapsulamento</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | O encapsulamento do número de peça selecionado está correto, incluindo nomes e números dos pinos | Todas as variantes | Obrigatório |

</div>

### 5.8.2. Alimentação { #582-power-supply }

<div align="center"><em>Tabela 5.8.2-1: Verificação da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A tensão de VDD1 é de 1,8 V a 3,3 V | Somente 551/555/557 | Obrigatório |
| 2 | <span class="flag-red">A tensão de VDD1 é de 3,3 V</span> | <span class="flag-red">Somente SS6600A8</span> | <span class="flag-red">Obrigatório</span> |
| 3 | A tensão de VDD2 é de 1,8 V a 3,3 V | Somente 555/557 | Obrigatório |
| 4 | As conexões de BUCK1_VSW e BUCK1_VOUT estão corretas | Todas as variantes | Obrigatório |
| 5 | As conexões de BUCK2_VSW e BUCK2_VOUT estão corretas | Somente 555/557 | Obrigatório |
| 6 | A conexão de LDOVCC2_VOUT está correta | Somente 555/557 | Obrigatório |
| 7 | A tensão de alimentação de AVDD_DSI é 1,8 V | Somente 555/557 | Obrigatório |
| 8 | A saída LDO_VOUT1 tem um ponto de teste ou um capacitor de filtro acessível para medição de tensão | Todas as variantes | Obrigatório |
| 9 | A saída LDO_VOUT2 tem um ponto de teste ou um capacitor de filtro acessível para medição de tensão | Todas as variantes | Obrigatório |
| 10 | A saída VDD_RET tem um ponto de teste ou um capacitor de filtro acessível para medição de tensão | Todas as variantes | Obrigatório |
| 11 | A saída VDD_RTC tem um ponto de teste ou um capacitor de filtro acessível para medição de tensão | Todas as variantes | Obrigatório |
| 12 | A tensão de VDD_SIP é 1,8 V e há uma chave de carga para desligá-la | Somente 551/555/557 | Obrigatório |
| 13 | <span class="flag-red">A tensão de VDD_SIP é 3,3 V e há uma chave de carga para desligá-la</span> | <span class="flag-red">Somente SS6600A8</span> | <span class="flag-red">Obrigatório</span> |
| 14 | A tensão de alimentação de AVDD33 é 3,3 V | Todas as variantes | Obrigatório |
| 15 | A tensão de AVDD_BRF é de 1,8 V a 3,3 V e deve ser igual à alimentação de VDD1 | Somente 551/555/557 | Obrigatório |
| 16 | <span class="flag-red">A tensão de alimentação de AVDD_BRF é 3,3 V</span> | <span class="flag-red">Somente SS6600A8</span> | <span class="flag-red">Obrigatório</span> |
| 17 | A tensão de VDDIOA é de 1,8 V a 3,3 V; reserve um resistor série de 0 Ω na primeira revisão da placa | Somente 551/555/557 | Obrigatório |
| 18 | A tensão de VDDIOB é de 1,8 V a 3,3 V; reserve um resistor série de 0 Ω na primeira revisão da placa | Somente 551/555/557 | Obrigatório |
| 19 | <span class="flag-red">A tensão de VDDIOA é 3,3 V; reserve um resistor série de 0 Ω na primeira revisão da placa</span> | <span class="flag-red">Somente SS6600A8</span> | <span class="flag-red">Obrigatório</span> |
| 20 | <span class="flag-red">A tensão de VDDIOA é 3,3 V; reserve um resistor série de 0 Ω na primeira revisão da placa</span> | <span class="flag-red">Somente SS6600A8</span> | <span class="flag-red">Obrigatório</span> |
| 21 | Quando o SF30147C fornece alimentação, a interface de controle TWI deve usar pinos PB do MCU configurados com pull-down (PD) por padrão | Somente 551/555/557 | Obrigatório |
| 22 | Quando o SF30147C fornece alimentação, os trilhos controlados por EN devem usar PVDD ou AVDD como domínio de tensão do pino EN; não controle EN por um GPIO do MCU. Como alternativa, conecte EN ao terra e controle por registradores a saída do trilho correspondente | Somente 551/555/557 | Obrigatório |
| 23 | Quando o SF30147C fornece alimentação, BUCK e LDO1 só podem ser controlados pelos respectivos sinais de habilitação, EN_BUCK e EN_LDO1; não há controle por registradores internos | Somente 551/555/557 | Obrigatório |
| 24 | O circuito de carga requer gerenciamento do caminho de alimentação para que a entrada de 5 V do carregador alimente o sistema quando a tensão da bateria estiver baixa | Todas as variantes | Obrigatório |

</div>

Ambiguidade na fonte: os itens 19 e 20 da planilha V1.0 original são idênticos; ambos especificam 3,3 V em VDDIOA para o SS6600A8. O [guia de aplicação de hardware](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md) identifica VDDIOA como a alimentação de E/S de PA e VDDIOB como a de PB, mas não esclarece se o item 20 deveria indicar VDDIOB. A lista mantém o conteúdo da planilha sem alterações. Confirme com a SiFli qual trilho deve ser verificado antes de usar o item 20 como critério de aprovação do projeto.

### 5.8.3. Capacitores e indutores da alimentação { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabela 5.8.3-1: Verificação dos capacitores e indutores da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | O capacitor de reservatório de VDD1 é de pelo menos 10 µF | Todas as variantes | Obrigatório |
| 2 | O capacitor de VDD2 é de pelo menos 10 µF | Somente 555/557 | Obrigatório |
| 3 | O capacitor de BUCK1_VOUT é de 4,7 µF | Todas as variantes | Obrigatório |
| 4 | O capacitor de BUCK2_VOUT é de 4,7 µF | Somente 555/557 | Obrigatório |
| 5 | <span class="flag-red">O capacitor de AVDD_DSI é de pelo menos 10 µF</span> | Somente 555/557 | Obrigatório |
| 6 | O capacitor de LDO_VOUT1 é de 4,7 µF | Todas as variantes | Obrigatório |
| 7 | O capacitor de LDO_VOUT2 é de 4,7 µF | Todas as variantes | Obrigatório |
| 8 | O capacitor de VDD_RET é de 0,47 µF | Todas as variantes | Obrigatório |
| 9 | O capacitor de VDD_RTC é de 1 µF | Todas as variantes | Obrigatório |
| 10 | O capacitor de VDD_SIP é de pelo menos 1 µF | Todas as variantes | Obrigatório |
| 11 | O capacitor de AVDD33 é de pelo menos 1 µF | Todas as variantes | Obrigatório |
| 12 | O capacitor de AVDD_BRF é de pelo menos 1 µF | Todas as variantes | Obrigatório |
| 13 | O capacitor de VDDIOA é de pelo menos 1 µF | Todas as variantes | Obrigatório |
| 14 | O capacitor de VDDIOB é de pelo menos 1 µF | Todas as variantes | Obrigatório |
| 15 | VDD1, VDD2 (somente 555), AVDD_BRF e a alimentação do pull-up de RESET devem ser iguais | Todas as variantes | Obrigatório |
| 16 | O indutor de BUCK1 é um componente recomendado pela SiFli | Somente 551/555/557 | Obrigatório |
| 17 | O indutor de BUCK2 é um componente recomendado pela SiFli | Somente 555/557 | Obrigatório |
| 18 | Se o indutor BUCK não for recomendado pela SiFli, atende a L = 4,7 µH, DCR ≤ 0,4 Ω e Isat ≥ 450 mA | Todas as variantes | Obrigatório |
| 19 | Se houver GPS ou outro periférico sensível a interferência, reserve uma posição para capacitor em derivação para terra em BUCK_LX; o valor depende dos resultados dos testes reais | Todas as variantes | Obrigatório |
| 20 | <span class="flag-red">Ao converter VBAT para 1,8 V em VDD1 e VDD2 (somente 555), use um conversor DCDC, não um LDO</span> | Somente 551/555/557 | Obrigatório |
| 21 | <span class="flag-red">A corrente quiescente do DCDC escolhido está registrada e atende aos requisitos do projeto</span> | Todas as variantes | Obrigatório |
| 22 | <span class="flag-red">A corrente quiescente do LDO escolhido está registrada e atende aos requisitos do projeto</span> | Todas as variantes | Obrigatório |

</div>

As fontes divergem: a tabela 3-3 do [guia chinês de aplicação de hardware da SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) e o item 9 do [checklist do esquemático V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) especificam 1 µF para VDD_RTC, enquanto [C0313 no esquemático de referência](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png) está marcado como 0,1 µF. As fontes não explicam em que condições cada valor se aplica. Antes de liberar o projeto, confirme com a SiFli o valor exigido para o dispositivo específico; não resolva a divergência por suposição.

### 5.8.4. Clock { #584-clock }

<div align="center"><em>Tabela 5.8.4-1: Verificação do clock</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | O cristal principal de 48 MHz está listado na AVL | Todas as variantes | Obrigatório |
| 2 | Se o cristal de 48 MHz não estiver na AVL, atende a 7 pF ≤ CL ≤ 12 pF (8,8 pF recomendado), tolerância de frequência ≤±10 ppm e ESR ≤30 Ω (22 Ω recomendado) | Todas as variantes | Obrigatório |
| 3 | O cristal RTC de 32,768 kHz está listado na AVL | Todas as variantes | Obrigatório |
| 4 | Se o cristal RTC de 32,768 kHz não estiver na AVL, atende a CL ≤12,5 pF (7 pF recomendado), tolerância de frequência ≤±20 ppm e ESR ≤80 kΩ (38 kΩ recomendado) | Todas as variantes | Obrigatório |
| 5 | <span class="flag-yellow">Se o cristal de 32,768 kHz não for usado, o pad XI deve ser conectado ao terra</span> | <span class="flag-yellow">Todas as variantes</span> | <span class="flag-yellow">Obrigatório</span> |

</div>

### 5.8.5. Reset { #585-reset }

<div align="center"><em>Tabela 5.8.5-1: Verificação do reset</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | RSTN tem pull-up conectado à mesma alimentação de VDD1 | Todas as variantes | Obrigatório |
| 2 | Há uma posição reservada para capacitor de 0,1 µF entre RSTN e terra | Todas as variantes | Obrigatório |
| 3 | RSTN tem proteção ESD | Todas as variantes | Obrigatório |

</div>

### 5.8.6. Sinais de terra { #586-ground-signals }

<div align="center"><em>Tabela 5.8.6-1: Verificação dos sinais de terra</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Todos os sinais AVSS estão conectados a GND | Somente 555/557 | Obrigatório |
| 2 | Todos os sinais VSS estão conectados a GND | Somente 555/557 | Obrigatório |
| 3 | O sinal EPAD está conectado a GND | <span class="flag-red">Somente 551/SS6600A8</span> | Obrigatório |

</div>

### 5.8.7. Modo de boot { #587-boot-mode }

<div align="center"><em>Tabela 5.8.7-1: Verificação do modo de boot</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">MODE tem pull-down padrão de 10 kΩ para terra e é levado a VDDIOA durante a gravação/download</span> | Todas as variantes | Obrigatório |
| 2 | <span class="flag-red">Há um ponto de teste reservado para MODE</span> | Todas as variantes | Obrigatório |
| 3 | Se houver espaço na PCB, reserve um conector de 3 pinos para selecionar pull-up ou pull-down por jumper | Todas as variantes | Obrigatório |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Tabela 5.8.8-1: Verificação de RF</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | O sinal ANT está identificado com requisito de impedância característica de 50 Ω em linha não balanceada (single-ended) | Todas as variantes | Obrigatório |
| 2 | Há uma rede de casamento tipo Pi reservada para ANT: capacitor NC em paralelo (não montar) e capacitor série de 15 pF | Todas as variantes | Obrigatório |
| 3 | Se for necessário filtrar emissões espúrias, reserve uma rede Pi com indutor série de 3,0 nH e capacitor em derivação de 1,5 pF | Todas as variantes |    |
| 4 | <span class="flag-red">Se for necessário controlar PA ou LNA externo, conecte PB05 a RX_EN e PB25 a TX_EN</span> | Todas as variantes | Opcional |

</div>

A planilha de origem deixa em branco a categoria do item 3 de RF, e ela permanece em branco aqui. Não classifique esse item como obrigatório ou opcional sem confirmação da SiFli.

### 5.8.9. Alocação de recursos de I/O { #589-io-resource-allocation }

<div align="center"><em>Tabela 5.8.9-1: Verificação da alocação de recursos de I/O</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Há uma tabela de alocação de recursos GPIO correspondente ao esquemático | Todas as variantes | Obrigatório |
| 2 | A alocação GPIO na tabela de recursos corresponde ao esquemático | Todas as variantes | Obrigatório |
| 3 | A alocação real de GPIO segue as recomendações da SiFli; consulte o arquivo de configuração de I/O da EVB | Todas as variantes | Obrigatório |

</div>

### 5.8.10. Despertar por hardware { #5810-hardware-wake-up }

<div align="center"><em>Tabela 5.8.10-1: Verificação do despertar por hardware</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">As fontes de interrupção de despertar do HCPU estão corretas: PA77, PA78, PA79 e PA80; não as use para despertar pela tecla de energia</span> | Todas as variantes | Obrigatório |
| 2 | <span class="flag-red">As fontes de interrupção de despertar do LCPU estão corretas: PB43, PB44, PB45, PB46, PB47 e PB48; os seis pinos podem ser usados para despertar pela tecla de energia</span> | Todas as variantes | Obrigatório |
| 3 | <span class="flag-red">Os sinais de interrupção e controle de periféricos do LCPU, como os do acelerômetro e do sensor de frequência cardíaca, devem usar GPIOs PB</span> | Todas as variantes | Obrigatório |
| 4 | <span class="flag-red">A fonte de interrupção do LCPU correspondente à UART3 é usada corretamente; recomenda-se usá-la somente para despertar por botão</span> | Todas as variantes | Obrigatório |

</div>

### 5.8.11. Armazenamento { #5811-storage }

<div align="center"><em>Tabela 5.8.11-1: Verificação do armazenamento</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | No projeto, priorize o QSPI2 nesta ordem: PSRAM &gt; Flash NOR &gt; Flash NAND | Todas as variantes | Obrigatório |
| 2 | Se o código executar na Flash NOR interna do SiP, o controle da chave de alimentação de VDD_SIP é PA58 | Todas as variantes | Obrigatório |
| 3 | Se o código executar em Flash NOR externa no QSPI2, o controle da chave de alimentação do QSPI2 é PA58 | Todas as variantes | Obrigatório |
| 4 | Se a Flash externa no QSPI2 precisar ser programada na produção, a chave de alimentação deve ser controlada por PA58 | Todas as variantes | Obrigatório |
| 5 | <span class="flag-red">A chave de tensão controlada por PA58 é ligada em nível alto e desligada em nível baixo</span> | Todas as variantes | Obrigatório |
| 6 | <span class="flag-red">Recomenda-se usar resistores série de 33 Ω nas linhas CLK e de dados da Flash</span> | Todas as variantes | Obrigatório |
| 7 | O QSPI3 está conectado à Flash NAND ou eMMC conforme previsto | Somente 555/557 | Opcional |
| 8 | O controle da chave de alimentação do QSPI3 é PA41; <span class="flag-red">a alimentação do QSPI3 fica desligada por padrão e uma chave ativa em nível alto deve usar pull-down interno padrão</span> | Somente 555/557 | Opcional |
| 9 | <span class="flag-red">Se o controle da chave de alimentação do QSPI3 não for PA41, confirme com a equipe de software o uso do I/O alternativo</span> | Somente 555/557 | Opcional |
| 10 | Se a Flash externa no QSPI3 precisar ser programada na produção, a chave de alimentação deve ser controlada por PA58 | Somente 555/557 | Obrigatório |
| 11 | O controle da chave de alimentação da OPI PSRAM é PA70; <span class="flag-red">a alimentação da PSRAM fica ligada por padrão e uma chave ativa em nível alto deve usar pull-up interno padrão</span> | Somente 555/557 | Opcional |
| 12 | <span class="flag-red">A OPI PSRAM é um modelo compatível e consta como qualificada no guia de seleção de componentes críticos</span> | Somente 555/557 | Opcional |
| 13 | As conexões dos sinais da OPI PSRAM estão corretas | Somente 555/557 | Opcional |
| 14 | A conexão dos sinais do QSPI2 está correta | Todas as variantes | Opcional |
| 15 | A conexão dos sinais do QSPI3 está correta | Todas as variantes | Opcional |
| 16 | <span class="flag-yellow">Ao usar SF32LB555 ou <span class="flag-red">SF32LB557, confirme a memória necessária para o algoritmo de medição da frequência cardíaca; se a memória disponível no LCPU for insuficiente, adicione 1 MB de Flash externa no QSPI4</span></span> | Somente 555/557 | Obrigatório |
| 17 | O nível lógico de I/O do periférico corresponde ao do chip principal | Todas as variantes | Obrigatório |
| 18 | <span class="flag-red">A Flash NOR consta como qualificada no guia de seleção de componentes críticos</span> | Todas as variantes | Obrigatório |
| 19 | <span class="flag-red">A Flash NAND consta como qualificada no guia de seleção de componentes críticos</span> | Todas as variantes | Obrigatório |

</div>

### 5.8.12. Display { #5812-display }

<div align="center"><em>Tabela 5.8.12-1: Verificação do display</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | No SF32LB555xxxx, o display deve ser conectado por DSI + LCDC2, conforme previsto | Somente 555/557 | Obrigatório |
| 2 | <span class="flag-red">No SF32LB551xxxx, o display deve ser conectado por LCDC1, conforme previsto</span> | <span class="flag-red">Somente 551/SS6600A8</span> | Obrigatório |
| 3 | As conexões dos sinais QSPI de LCDC1 estão corretas; <span class="flag-red">recomendam-se resistores série de 100 Ω nas linhas CLK e de dados</span> | Todas as variantes | Obrigatório |
| 4 | As conexões dos sinais MCU8080 de LCDC1 estão corretas | Todas as variantes | Obrigatório |
| 5 | As conexões dos sinais DSI estão corretas | Somente 555/557 | Obrigatório |
| 6 | A conexão dos sinais QSPI de LCDC2 está correta | Somente 555/557 | Obrigatório |
| 7 | DSI_REXT está conectado a GND por um resistor de 10 kΩ | Somente 555/557 | Obrigatório |
| 8 | A conexão LCDC RSTB está correta | Todas as variantes | Obrigatório |
| 9 | A conexão LCDC TE está correta (conectada ao sinal TE ou Fmark do painel) | Todas as variantes | Obrigatório |
| 10 | <span class="flag-red">LCD SPI, modo de 3 fios: CS conectado a GPIO22, PA31 ou PB33; CLK a GPIO23, PA20 ou PB32; DATA a GPIO21, PA34 ou PB35; <br>modo de 4 fios: CS conectado a GPIO22, PA31 ou PB33; CLK a GPIO23, PA20 ou PB32; DATA a GPIO21, PA34 ou PB35; DC a GPIO20, PA36 ou PB36</span> | Todas as variantes | Obrigatório |
| 11 | Os sinais TP seguem a atribuição de pinos recomendada (consulte o arquivo de configuração de I/O da EVB) | Todas as variantes | Obrigatório |
| 12 | O nível lógico de I/O do periférico corresponde ao do chip principal | Todas as variantes | Obrigatório |
| 13 | Se o projeto precisar manter o display em modo sempre ativo (AOD) com a tela apagada, conecte a interface LCD QSPI aos pinos PA do MCU; recomenda-se usar GPIOs PB para LCD_EN, LCD_RST e sinais de controle semelhantes | <span class="flag-red">Somente 551/SS6600A8</span> | Obrigatório |
| 14 | Se o projeto precisar manter o display em modo sempre ativo (AOD) com a tela apagada, conecte a interface LCD QSPI aos pinos PA do MCU ou use a interface LCD MIPI; recomenda-se usar GPIOs PB para LCD_EN, LCD_RST e sinais de controle semelhantes | Somente 555/557 | Obrigatório |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>Tabela 5.8.13-1: Verificação do GPADC</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A entrada GPADC está conectada ao pino correspondente | Todas as variantes | Opcional |
| 2 | A faixa de entrada do GPADC está correta; a tensão máxima de entrada não pode exceder 1,0 V | Todas as variantes | Opcional |
| 3 | Recomendação para o divisor de tensão da bateria: resistor de 1 MΩ com tolerância de 1% no lado da alimentação, resistor de 220 kΩ com tolerância de 1% para terra e capacitor de filtro de 100 nF | Todas as variantes | Obrigatório |
| 4 | Para cada sinal de divisor resistivo medido pelo GPADC, use resistores com tolerância de 1%; <span class="flag-red">cada canal GPADC deve ter um capacitor de filtro de 100 nF próximo ao pino do chip</span> | Todas as variantes | Obrigatório |

</div>

As fontes divergem: o [guia de aplicação de hardware OpenSiFli, de maior prioridade](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) descreve um GPADC de 10 bits e cinco canais, com faixa de entrada de 0–0,9 V. O item 2 da [planilha original V1.0 do checklist](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) define o máximo de 1,0 V, mas não informa o número de canais. O [datasheet SF32LB55x V1.7.2, seção 3.2.1](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) especifica oito entradas não diferenciais (single-ended) ou quatro pares diferenciais, com faixas de 0–1,1 V e −0,7 a 0,7 V, respectivamente; a tabela de pinos lista GPADC_CH0–CH7. O [guia ADC atual do SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html) também mapeia oito canais (0–7) e informa 1,1 V como tensão máxima de amostragem. A SiFli não explicou as diferenças no número de canais nem nos limites de tensão. O item 2 da lista mantém o valor de 1,0 V da planilha; até que a SiFli esclareça a divergência por escrito, projete de acordo com a faixa de 0–0,9 V do guia de maior prioridade e mantenha o VADC em no máximo 0,9 V. Não trate 1,0 V nem 1,1 V como limites de projeto aprovados e confirme a disponibilidade dos canais para o dispositivo e o encapsulamento escolhidos.

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>Tabela 5.8.14-1: Verificação do SDMADC</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A entrada SDMADC está conectada ao pino correspondente | Somente 555/557 | Opcional |
| 2 | A faixa de entrada do SDMADC está correta; a tensão máxima de entrada não deve exceder 1,2 V | Somente 555/557 | Opcional |
| 3 | As conexões de SDMADC_VREF e SDMADC_VSS_VREF estão corretas | Somente 555/557 | Obrigatório |

</div>

### 5.8.15. Botões { #5815-buttons }

<div align="center"><em>Tabela 5.8.15-1: Verificação dos botões</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Confirme com o cliente se o botão precisa permitir o despertar do sistema | Todas as variantes | Obrigatório |
| 2 | A conexão do botão está correta: há pull-up, o valor do resistor está correto e o domínio de tensão do pull-up é adequado | Todas as variantes | Obrigatório |
| 3 | <span class="flag-red">O botão de energia deve usar PB43, PB44, PB45, PB46, PB47 ou PB48</span> | Todas as variantes | Obrigatório |
| 4 | Todos os sinais dos botões têm proteção ESD | Todas as variantes | Obrigatório |

</div>

### 5.8.16. Proteção EOS e ESD { #5816-eos-and-esd-protection }

<div align="center"><em>Tabela 5.8.16-1: Verificação das proteções EOS e ESD</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A interface de carga tem proteção EOS, ESD e OVP | Todas as variantes | Obrigatório |
| 2 | O sinal de detecção da conexão do carregador tem um dispositivo ESD | Todas as variantes | Obrigatório |
| 3 | A interface da bateria tem um dispositivo ESD | Todas as variantes | Obrigatório |
| 4 | A interface da antena tem um dispositivo ESD | Todas as variantes | Obrigatório |
| 5 | As interfaces de alimentação do LCD e do painel de toque têm dispositivos ESD | Todas as variantes | Obrigatório |
| 6 | As linhas I2C, RST e INT do painel de toque têm dispositivos ESD | Todas as variantes | Obrigatório |
| 7 | A interface de alimentação e as linhas de sinal do sensor de frequência cardíaca têm dispositivos ESD | Todas as variantes | Obrigatório |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>Tabela 5.8.17-1: Verificação do I2C</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A atribuição do I2C considera a divisão entre HCPU/LCPU e se o dispositivo precisa operar em baixo consumo | Todas as variantes | Obrigatório |
| 2 | O I2C tem pull-ups com o valor correto; para operação a 400 kHz, recomendam-se pull-ups de 2,2 kΩ. Use o domínio de tensão do lado do periférico e desligue a alimentação dos pull-ups junto com o periférico | Todas as variantes | Obrigatório |
| 3 | O sinal de interrupção do I2C permite despertar por hardware quando necessário | Todas as variantes | Obrigatório |
| 4 | Se vários dispositivos compartilharem o barramento I2C, seus endereços são distintos | Todas as variantes | Obrigatório |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>Tabela 5.8.18-1: Verificação do I2S</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | I2S1 é somente entrada; o microfone está conectado corretamente ao I2S1 | Todas as variantes | Opcional |
| 2 | I2S2 aceita entrada e saída; o decodificador de áudio ou codec está conectado corretamente ao I2S2 | Todas as variantes | Opcional |
| 3 | As conexões dos sinais I2S estão corretas | Todas as variantes | Opcional |
| 4 | A conexão de dois microfones via I2S está correta | Todas as variantes | Opcional |
| 5 | A especificação do microfone foi confirmada e é compatível com o chip | Todas as variantes | Opcional |
| 6 | Se MCLK for necessário, sua conexão foi confirmada como correta | Todas as variantes | Opcional |
| 7 | O nível lógico de I/O do periférico corresponde ao do chip principal | Todas as variantes | Opcional |

</div>

### 5.8.19. PDM { #5819-pdm }

<div align="center"><em>Tabela 5.8.19-1: Verificação do PDM</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A conexão do PDM está correta | Somente 555/557 | Opcional |
| 2 | A conexão de dois microfones digitais via PDM está correta | Somente 555/557 | Opcional |
| 3 | A especificação do microfone foi confirmada e é compatível com o chip | Somente 555/557 | Opcional |
| 4 | O nível lógico de I/O do periférico corresponde ao do chip principal | Somente 555/557 | Opcional |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>Tabela 5.8.20-1: Verificação do SPI</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A conexão SPI está correta: <span class="flag-red">SDO do MCU vai a SDI do periférico e SDI do MCU vai a SDO do periférico</span> | Todas as variantes | Opcional |
| 2 | Os requisitos de temporização do periférico SPI foram confirmados e são compatíveis | Todas as variantes | Opcional |
| 3 | O nível lógico de I/O do periférico corresponde ao do chip principal | Todas as variantes | Opcional |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>Tabela 5.8.21-1: Verificação da USART</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A USART3 foi projetada como interface de download e saída de logs | Todas as variantes | Obrigatório |
| 2 | <span class="flag-red">A USART3 tem pontos de teste e, se necessário, um resistor pull-up; recomenda-se um resistor série de 100 Ω, cujo valor pode ser ajustado ao projeto</span> | Todas as variantes | Obrigatório |
| 3 | Dispositivos que precisam executar no HCPU estão conectados à USART1 ou USART2 | Todas as variantes | Opcional |
| 4 | Dispositivos que precisam executar no LCPU estão conectados à USART4 ou USART5 | Todas as variantes | Opcional |
| 5 | <span class="flag-red">Na conexão com um periférico, RXD do MCU vai a TXD do periférico e TXD do MCU vai a RXD do periférico</span> | Todas as variantes | Obrigatório |
| 6 | O nível lógico de I/O do periférico corresponde ao do chip principal | Todas as variantes | Obrigatório |
| 7 | Há pontos de teste reservados para as USARTs não utilizadas, para uso de contingência | Todas as variantes | Opcional |
| 8 | <span class="flag-red">Se a UART1 estiver conectada a um dispositivo, há pontos de teste reservados</span> | Todas as variantes | Obrigatório |
| 9 | <span class="flag-red">Se a UART estiver conectada a um conversor UART-USB, RX e TX devem poder ser desconectados</span> | Todas as variantes | Obrigatório |
| 10 | <span class="flag-red">Recomenda-se conectar periféricos à interface UART do HCPU para evitar que o software do HCPU use uma interface UART do LCPU</span> | Todas as variantes | Obrigatório |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>Tabela 5.8.22-1: Verificação do PWM</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A atribuição do pino PWM da luz de fundo está correta; use um GPTIMx diferente do motor, de preferência no grupo de pinos PB, para evitar que a redução de frequência do HCPU afete a luz de fundo | Todas as variantes | Opcional |
| 2 | A atribuição do pino PWM do motor está correta; use um GPTIMx diferente do da luz de fundo, de preferência no grupo de pinos PB, para evitar que a redução de frequência do HCPU afete a vibração | Todas as variantes | Opcional |
| 3 | Recomenda-se usar um pino de controle PWM do motor no grupo PB, de preferência PB24 ou PB25, para evitar comportamento anormal durante a gravação com motor SMD | Todas as variantes | Opcional |
| 4 | Sinais que precisam de saída PWM devem usar o grupo PB; verifique também se há comportamento anormal na partida a frio | Todas as variantes | Opcional |

</div>

### 5.8.23. Depuração { #5823-debug }

<div align="center"><em>Tabela 5.8.23-1: Verificação da depuração</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | As conexões dos sinais SWD estão corretas | Todas as variantes | Opcional |
| 2 | O conector J-Link ou os pontos de teste reservam corretamente a referência da alimentação de I/O | Todas as variantes | Opcional |
| 3 | <span class="flag-yellow">Para a programação de produção do SF32LB555x XXXX, além de PVDD, VDDIOA, VDDIOB, VDDSIP, AVDD33 e AVDD_BRF, AVDD_DSI também deve estar alimentado</span> | Somente 555/557 | Obrigatório |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>Tabela 5.8.24-1: Verificação do USB</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | A conexão da interface USB está correta | Todas as variantes | Opcional |
| 2 | A interface USB tem proteção ESD | Todas as variantes | Opcional |
| 3 | Durante a operação normal, fora do modo de suspensão, o lado do PC/dispositivo detecta a conexão e a remoção enquanto o USB permanece habilitado; <br>se o MCU entrar no modo de suspensão e ainda precisar detectar conexão e remoção, adicione um divisor resistivo de VBUS. A saída do divisor deve ter nível alto compatível com a tensão de I/O e ser ligada a um pino de despertar do MCU; recomenda-se compartilhar o pino de despertar usado para detectar a conexão do carregador | Todas as variantes | Opcional |

</div>

### 5.8.25. Consumo de energia { #5825-power-consumption }

<div align="center"><em>Tabela 5.8.25-1: Verificação do consumo de energia</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Não se recomenda usar QFN GPIO27 e BGA PA01 como entradas: o pull-down interno de 20 kΩ pode reduzir a tensão do nível alto com resistor pull-up de valor alto ou causar corrente de fuga excessiva com resistor de valor baixo | Todas as variantes | Obrigatório |
| 2 | Se QFN GPIO27 ou BGA PA01 for usado como saída, confirme que o circuito controlado fica inativo quando o I/O não é acionado. Prefira usá-lo em condições de maior corrente, pois acionar nível alto de 1,8 V introduz cerca de 90 µA de corrente de fuga | Todas as variantes | Obrigatório |
| 3 | Se PA01 e PA03 forem usados como GPIOs, mantenha os níveis de I/O iguais no modo de suspensão ou coloque pelo menos um pino em alta impedância, sem pull-up nem pull-down | Todas as variantes | Obrigatório |
| 4 | PA77, PA78, PA79, PA80 e PB43–PB48 são dez pinos com capacidade de despertar. No estado de desligamento de Hibernate ficam em alta impedância, com PU/PD interno desabilitado; se não for possível garantir um nível fixo de outra forma, adicione pull-up ou pull-down externo | Todas as variantes | Obrigatório |
| 5 | Se um pino PB de despertar for usado como saída de forma de onda, reserve pull-up ou pull-down externo, mesmo sem usar Hibernate | Todas as variantes | Obrigatório |
| 6 | Para todos os pinos de habilitação de MOSFET, LDO e DCDC, garanta o estado ligado/desligado exigido em Hibernate usando resistores pull-up ou pull-down padrão | Todas as variantes | Obrigatório |
| 7 | Para sinais GPIO que controlam uma carga acionando nível alto, use pull-down de 1 MΩ, quando isso não afetar a função, para reduzir a corrente de fuga | Todas as variantes | Obrigatório |
| 8 | Quando uma saída GPIO PA precisar permanecer alta no modo de suspensão, selecione um pino PU | Todas as variantes | Obrigatório |
| 9 | Quando uma saída GPIO PA precisar permanecer baixa no modo de suspensão, selecione um pino PD | Todas as variantes | Obrigatório |
| 10 | O requisito de corrente em repouso no modo Hibernate está registrado | Todas as variantes | Obrigatório |
| 11 | <span class="flag-red">A soma das correntes em repouso dos periféricos selecionados em Hibernate está registrada e atende aos requisitos do projeto</span> | Todas as variantes | Obrigatório |
| 12 | O requisito de corrente em repouso no modo Standby está registrado | Todas as variantes | Obrigatório |
| 13 | <span class="flag-red">A soma das correntes em repouso dos periféricos selecionados em Standby está registrada e atende aos requisitos do projeto</span> | Todas as variantes | Obrigatório |
| 14 | Para pinos de despertar PB43–PB48 usados como saídas, reserve pull-up ou pull-down externo, pois os pull-ups e pull-downs internos ficam desabilitados em Standby | Todas as variantes | Obrigatório |

</div>

### 5.8.26. Download offline e calibração do cristal { #5826-offline-download-and-crystal-calibration }

<div align="center"><em>Tabela 5.8.26-1: Verificação do download offline e da calibração do cristal</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplicável a | Categoria |
|:---|:---|:---|:---|
| 1 | Se for necessária uma placa de download offline para gravar o firmware, reserve pontos de teste para VBAT, GND, UART3_TXD, UART3_RXD, MODE e RESET | Todas as variantes | Opcional |
| 2 | Se a calibração do cristal for necessária, reserve PB08. Se o PB08 for conectado a um periférico, prefira usá-lo como saída e não conecte capacitor externo | Todas as variantes | Opcional |

</div>
