---
icon: lucide/list-checks
hide:
    - navigation
description: "Checklist item a item para revisar o layout de PCB do MCU SF32LB57x, incluindo encapsulamento, alimentação, clock, RF, display, áudio e GPADC."
tags:
    - Hardware
    - Chip
    - Checklist
---

# Guia de projeto de hardware SF32LB57x — Checklist do layout de PCB { #sf32lb57x-hardware-design-guide-pcb-layout-checklist }

!!! note "Parte do guia de projeto de hardware SF32LB57x"
    Esta página reúne as verificações de layout de PCB da Seção 6.10, transcritas das tabelas oficiais de autoverificação da SiFli. Volte às [Diretrizes de layout de PCB](SF32LB57x_pcb_layout.md).

## 6.10. Checklist do layout de PCB { #610-pcb-layout-checklist }

A maioria das regras de layout a seguir se aplica a todas as variantes SF32LB57x. A coluna “Aplica-se a” limita alguns itens às variantes alimentadas por bateria ou por 3,3 V, conforme a família em que o circuito correspondente está presente.

### 6.10.1. Encapsulamento { #6101-package }

<div align="center"><em>Tabela 6.10.1-1: Checklist do encapsulamento</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | O footprint da PCB segue as especificações do encapsulamento indicadas no datasheet | Todas as variantes | Obrigatório |

</div>

### 6.10.2. Roteamento da alimentação { #6102-power-supply-routing }

<div align="center"><em>Tabela 6.10.2-1: Checklist do roteamento da alimentação</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | Trilha de alimentação `VBUS` ≥16 mil | Variantes alimentadas por bateria | Obrigatório |
| 2 | Trilha de alimentação `VBAT` ≥16 mil | Variantes alimentadas por bateria | Obrigatório |
| 3 | Trilha de alimentação `VCC` ≥12 mil | Variantes alimentadas por bateria | Obrigatório |
| 4 | Trilha de alimentação `VDD33_VOUT1` ≥10 mil | Variantes alimentadas por bateria | Obrigatório |
| 5 | Trilha de alimentação `VDD33_VOUT2` ≥10 mil (o título do item 46 na fonte repete `VDD33_VOUT1`) | Variantes alimentadas por bateria | Obrigatório |
| 6 | Trilha de alimentação `PVDD` ≥12 mil (o detalhe do item 47 na fonte indica `VCC`) | Variantes alimentadas por 3,3 V | Obrigatório |
| 7 | Trilha de alimentação `VDDIOA` ≥10 mil | Variantes alimentadas por 3,3 V | Obrigatório |
| 8 | Trilhas `BUCK_LX`/`BUCK_FB` ≥10 mil e tão curtas quanto possível | Todas as variantes | Obrigatório |
| 9 | Trilha de alimentação `AVDD_BRF` ≥8 mil | Todas as variantes | Obrigatório |
| 10 | Trilha de alimentação `AVDD33_AUD` ≥8 mil | Todas as variantes | Obrigatório |

</div>

!!! warning "Conflitos não resolvidos sobre as linhas de alimentação na fonte"
    - **Rótulos da lista:** O item 44 da tabela original de autoverificação 4-2-1-1, aplicável às variantes alimentadas por bateria, exige `VCC` >= 12 mil. Os itens 45 e 46 exigem pelo menos 10 mil para `VDD33_VOUT1` e `VDD33_VOUT2`, respectivamente, mas o título do item 46 repete `VDD33_VOUT1`, enquanto o detalhe indica `VDD33_VOUT2`. O item 47, aplicável às variantes de 3,3 V, tem o título `PVDD`, mas seu detalhe exige `VCC` >= 12 mil. Esta página transcreve os valores e detalhes listados sem resolver nenhuma das divergências de rótulo da fonte.
    - **Largura das trilhas:** A seção 3.2.1 do guia original de PCB exige pelo menos 0,4 mm (cerca de 15,7 mil) para `VCC` e `PVDD`; os itens 44 (variantes alimentadas por bateria) e 47 (variantes de 3,3 V) da tabela 4-2-1-1 exigem `VCC` >= 12 mil. A fonte não explica como conciliar esses requisitos entre as variantes nem se, no item 47, deve prevalecer o título `PVDD` ou o detalhe `VCC`. Não infira um valor corrigido nem aplique nenhuma das entradas como requisito definitivo sem confirmação.
    - **Nomes das saídas:** A seção 3.2.1 do guia PCB original usa `VDD_VOUT1` / `VDD_VOUT2`, enquanto os itens 45/46 da tabela de autoverificação 4-2-1-1 usam `VDD33_VOUT1` / `VDD33_VOUT2`. A fonte não informa se os nomes são nomes alternativos da mesma rede ou redes distintas.
    Antes de fechar o projeto, obtenha da SiFli a confirmação dos rótulos pretendidos, das redes de destino, do escopo das variantes de alimentação aplicáveis e das larguras de trilha. Sem essa confirmação, não associe os rótulos conflitantes da lista a redes, não trate as variantes de nome das saídas como equivalentes nem escolha entre 12 mil e 0,4 mm.

### 6.10.3. Layout do clock { #6103-clock-layout }

<div align="center"><em>Tabela 6.10.3-1: Checklist do layout do clock</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | Os cristais ficam próximos aos respectivos pinos do chip, para manter as trilhas curtas | Todas as variantes | Obrigatório |
| 2 | O cristal e suas trilhas de oscilação têm blindagem completa conectada ao GND | Todas as variantes | Obrigatório |
| 3 | Área sem cobre sob o cristal: em placas PTH de 4 camadas, manter o cobre afastado apenas na camada superior; em placas HDI de 6 camadas, manter o cobre afastado tanto na camada superior quanto na camada 2 | Todas as variantes | Obrigatório |
| 4 | As trilhas dos sinais do oscilador ficam afastadas do cobre conectado ao GND ao redor por mais de 1,5× a largura da trilha | Todas as variantes | Obrigatório |
| 5 | As trilhas paralelas do cristal de 32,768 kHz ficam separadas por mais de 2× a largura da trilha de referência | Todas as variantes | Obrigatório |

</div>

!!! warning "Conflitos não resolvidos nas instruções de layout do cristal"
    - **Blindagem de terra e área sem cobre:** A seção 3.3 do guia de PCB exige um plano de referência de terra contínuo na região do cristal e uma área sem cobre na camada TOP ao redor dele. A figura 3-3-1 (reproduzida aqui como figura 6.9-30) indica pelo menos 0,25 mm ao redor do encapsulamento. Já os itens 6 e 7 da tabela original de autoverificação 4-3-1 exigem, respectivamente, blindagem completa conectada ao GND ao redor do cristal e das trilhas do oscilador, e ausência de cobre sob o cristal somente na TOP em uma PCB PTH de 4 camadas e na TOP e camada 2 em uma HDI de 6 camadas. A fonte não delimita a área blindada em relação à área sem cobre nem explica como aplicar a exigência de terra contínua nas camadas sem cobre previstas para cada empilhamento. Esse conflito de escopo continua sem solução; não deduza o padrão de cobre ou de terra por camada.
    - **Espaçamento das trilhas de 32,768 kHz:** A seção 3.3 do guia de PCB e o modelo de roteamento da figura 3-3-4 (reproduzida aqui como figura 6.9-33) especificam pelo menos 0,15 mm entre as trilhas paralelas `32K_XI` / `32K_XO`. O item 9 da tabela original de autoverificação 4-3-1 exige espaçamento superior ao dobro da largura básica da trilha, isto é, mais de 0,2 mm para a trilha de 0,1 mm indicada no guia. Os requisitos mínimos de espaçamento são conflitantes.
    - **Escopo da folga ao redor do encapsulamento:** A figura 3-3-1 (reproduzida aqui como figura 6.9-30) especifica pelo menos 0,25 mm de afastamento do cobre da camada TOP ao redor do encapsulamento. O item 7 da tabela 4-3-1 define separadamente quais camadas devem ficar sem cobre sob o cristal nos dois empilhamentos, mas a fonte não explica a relação entre a folga periférica de 0,25 mm, as áreas sob o encapsulamento e as restrições de roteamento nas camadas adjacentes.
    Esses conflitos e lacunas de escopo permanecem sem solução na documentação original da SiFli. Antes de liberar o layout, confirme os requisitos para o encapsulamento e o empilhamento reais; não escolha entre os espaçamentos nem deduza os limites de terra ou de área sem cobre por camada.

### 6.10.4. Layout de RF { #6104-rf-layout }

<div align="center"><em>Tabela 6.10.4-1: Checklist do layout de RF</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | Todas as trilhas de RF têm impedância controlada de 50 Ω para linha não balanceada (single-ended) | Todas as variantes | Obrigatório |
| 2 | O cobre conectado ao GND nos dois lados da trilha RF tem pelo menos 60 mil de largura e se conecta ao plano de terra principal por várias vias | Todas as variantes | Obrigatório |
| 3 | A rede de casamento π reservada fica próxima ao pino RF do chip | Todas as variantes | Obrigatório |
| 4 | Uma camada contínua de blindagem conectada ao GND fica diretamente abaixo da trilha de sinal RF | Todas as variantes | Obrigatório |
| 5 | Nenhuma trilha de sinal digital de alta velocidade passa diretamente abaixo da trilha de sinal RF | Todas as variantes | Obrigatório |
| 6 | Nenhuma trilha de alimentação sujeita a grandes variações de corrente passa diretamente abaixo da trilha de sinal RF | Todas as variantes | Obrigatório |

</div>

### 6.10.5. Roteamento do display { #6105-display-routing }

<div align="center"><em>Tabela 6.10.5-1: Checklist do roteamento do display</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A trilha de clock do display tem um resistor em série ≤50 Ω. Reserve também uma posição para um capacitor em derivação, inicialmente não montado, para permitir o ajuste de uma rede RC e a supressão de EMI | Todas as variantes | Obrigatório |
| 2 | As trilhas de alta velocidade do display são roteadas preferencialmente em camadas internas; o conector do display e o cabo flexível FPC ficam afastados da área da antena RF | Todas as variantes | Obrigatório |

</div>

### 6.10.6. Roteamento de áudio { #6106-audio-routing }

<div align="center"><em>Tabela 6.10.6-1: Checklist do roteamento de áudio</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | A região de roteamento de `ADCP` tem blindagem conectada ao GND para reduzir a interferência eletromagnética externa | Todas as variantes | Obrigatório |
| 2 | `DACP`/`DACN` são roteados como um par diferencial com comprimentos rigorosamente compatibilizados; a região das trilhas tem blindagem conectada ao GND | Todas as variantes | Obrigatório |
| 3 | O comprimento total das trilhas `DACP`/`DACN` é controlado para manter a capacitância parasita abaixo de 10 pF | Todas as variantes | Obrigatório |
| 4 | As trilhas de alimentação analógica `AVDD_BRF`/`AVDD33_AUD` têm blindagem conectada ao GND e ficam afastadas de sinais de alta corrente ou com forte interferência | Todas as variantes | Obrigatório |

</div>

### 6.10.7. Roteamento do GPADC { #6107-gpadc-routing }

<div align="center"><em>Tabela 6.10.7-1: Checklist do roteamento do GPADC</em></div>

<div align="center" markdown>

| Nº | Ponto de verificação | Aplica-se a | Categoria |
|:---|:---|:---|:---|
| 1 | As trilhas analógicas do GPADC ficam afastadas de trilhas paralelas de sinais de alta velocidade, e a região tem blindagem conectada ao GND para evitar que o ruído digital reduza a precisão da amostragem | Todas as variantes | Obrigatório |

</div>
