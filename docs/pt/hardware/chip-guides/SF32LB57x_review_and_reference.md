---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Autoverificação do projeto do cliente, documentos e referências, apêndices e histórico de revisões do guia de projeto de hardware SF32LB57x."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware SF32LB57x — Checklist de revisão do projeto e referências { #sf32lb57x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Parte do guia de projeto de hardware SF32LB57x"
    Esta página abrange as seções 7 a 10: autoverificação do projeto do cliente, documentos e referências, apêndices e histórico de revisões. Volte às [Diretrizes de layout da PCB](SF32LB57x_pcb_layout.md).

## 7. Autoverificação do projeto do cliente { #7-customer-design-self-check }

Conclua esta lista antes de solicitar uma revisão do esquemático, uma revisão do layout ou a liberação para EVT. O responsável pelo projeto do cliente deve registrar o resultado e as evidências de cada item e, quando aplicável, anexar referências às páginas do esquemático, capturas da PCB, medições ou notas de revisão.

### 7.1. Encapsulamento e número da peça { #71-package-and-part-number }

- [ ] O número de peça comercial, a família de alimentação, o encapsulamento e a pinagem estão confirmados.
- [ ] O símbolo do esquemático e o footprint da PCB correspondem ao datasheet.
- [ ] Os pads QFN<!-- BGA-ONLY -->/BGA<!-- /BGA-ONLY -->, o estêncil, o pad exposto e o projeto das vias foram revisados.

### 7.2. Alimentação { #72-power }

- [ ] Cada pino de alimentação permanece dentro dos limites especificados de tensão e carga; os valores e o posicionamento dos capacitores atendem ao datasheet.
- [ ] O indutor BUCK, os capacitores e o roteamento da realimentação atendem aos requisitos de layout.
- [ ] As saídas dos LDOs internos não são usadas indevidamente para alimentar periféricos de alta corrente.
- [ ] Os caminhos de alimentação correspondem à família selecionada. Verifique as conexões aplicáveis do carregador/OVP, VBUS, VBAT, VCC e/ou PVDD na tabela de alimentação correspondente ao encapsulamento e à variante exatos; não misture as topologias das variantes alimentadas por bateria e de 3,3 V.
- [ ] As alimentações dos periféricos podem ser desligadas e os estados padrão são seguros.

### 7.3. Clock { #73-clocks }

- [ ] Os cristais de 48 MHz e 32,768 kHz atendem aos parâmetros recomendados.
- [ ] Os cristais ficam próximos ao chip e têm áreas de exclusão ao redor.
- [ ] O roteamento dos cristais fica afastado do ruído da alimentação, RF, USB, SDIO, display e circuito de carga.

### 7.4. Armazenamento e boot { #74-storage-and-boot }

- [ ] Se a peça selecionada incluir memória integrada ao encapsulamento, essa configuração e seu efeito sobre as interfaces externas de memória e os pinos disponíveis estão confirmados para esse encapsulamento e variante específicos.
- [ ] O tipo de mídia externa de boot, os pull-ups, o controle de alimentação e o estado padrão estão corretos.
- [ ] A configuração de boot e os pontos de teste para download e depuração estão reservados.

### 7.5. RF { #75-rf }

- [ ] A trilha de alimentação (feed) da antena é projetada para uma impedância controlada de 50 Ω.
- [ ] A rede de casamento π fica próxima ao chip.
- [ ] A trilha de RF tem um plano de referência de GND contínuo e blindagem por vias.
- [ ] A RF está isolada das fontes de ruído e das interfaces de alta velocidade.

### 7.6. Display e toque { #76-display-and-touch }

- [ ] A interface do display, a resolução e o grupo de pinos atendem aos requisitos do painel.
- [ ] É possível controlar as alimentações do display, da retroiluminação e do painel de toque.
- [ ] A interrupção do painel de toque usa um GPIO compatível com a função de despertar, se esse recurso for necessário.
- [ ] O FPC e as trilhas de display de alta velocidade são mantidos afastados da RF.

### 7.7. Áudio e sinais analógicos { #77-audio-and-analog }

- [ ] O desacoplamento de MIC_BIAS, AUD_VREF e AVDD33_AUD está correto.
- [ ] O bloqueio de CC e a filtragem da entrada analógica estão corretos.
- [ ] O roteamento diferencial de DACP/DACN e a rede de casamento estão corretos.
- [ ] A tensão de entrada do GPADC, o divisor de tensão, a filtragem e a blindagem estão corretos.

### 7.8. Interfaces gerais { #78-general-interfaces }

- [ ] As conexões e os níveis lógicos de E/S das interfaces UART, I2C, SPI, SDIO, USB e CAN estão corretos.
- [ ] A alimentação dos pull-ups de I2C comuta junto com a alimentação de E/S do periférico correspondente para evitar correntes de fuga quando esse domínio estiver desligado.
- [ ] A proteção ESD do USB, o roteamento diferencial de 90 Ω e a detecção de despertar por VBUS são implementados conforme necessário.
- [ ] Os sinais externos de despertar usam pinos compatíveis com essa função.

### 7.9. Produção e confiabilidade { #79-production-and-reliability }

- [ ] Os pontos de teste para DBG-UART, SWD, modo de boot, PA00, PA01, PA34, alimentação e GND estão reservados.
- [ ] Os pontos de teste atendem aos requisitos das sondas do gabarito de teste.
- [ ] A estratégia de proteção contra ESD, EOS, OVP, inversão de polaridade e surtos foi revisada.
- [ ] Os processos de gravação do firmware de produção, calibração dos cristais e teste de RF podem ser executados.

### 7.10. Critérios de aprovação e liberação do projeto { #710-review-release-criteria }

Antes de congelar o projeto, confirme que os seguintes critérios de liberação foram atendidos:

- [ ] Todos os itens aplicáveis foram concluídos com evidências, como referências às páginas do esquemático, capturas da PCB, medições ou notas de revisão; os itens marcados como não aplicáveis têm uma justificativa.
- [ ] Cada desvio do datasheet ou do projeto de referência tem uma justificativa específica do projeto.
- [ ] Os responsáveis revisaram RF, cristais, carga, alimentação, USB, display, áudio e pontos de teste de produção.
- [ ] O orçamento de corrente em modo de baixo consumo inclui a corrente de standby de todos os periféricos, as correntes dos pull-ups e a corrente quiescente Iq dos reguladores.
- [ ] Os acessos necessários para o bring-up do EVT — download, logs, medição de corrente, reset e controle de boot — estão disponíveis.

## 8. Documentos e referências relacionados { #8-related-documents-and-references }

Consulte os documentos oficiais mais recentes para verificar limites elétricos, dados do encapsulamento, multiplexação dos pinos, configuração de software, qualificação de componentes e restrições de fabricação.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumo do produto SF32LB57x][SF32LB57x Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet do SF32LB57x][SF32LB57x Datasheet]__
- :fontawesome-solid-file-pdf: __[Manual do usuário SF32LB57x][SF32LB57x User Manual]__
- :fontawesome-solid-file-lines: __[Nota de aplicação de hardware SF32LB57x][SF32LB57x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[Lista de fornecedores aprovados da SiFli (AVL)][SiFli Approved Vendor List (AVL)]__

</div>

O [Checklist do esquemático](SF32LB57x_schematic_checklist.md) (seção 5.8) e o [Checklist do layout da PCB](SF32LB57x_pcb_layout_checklist.md) (seção 6.10) reproduzem, item por item, as tabelas oficiais de autoverificação do projeto SF32LB57x da SiFli, acompanhadas das orientações de esquemático e layout da PCB correspondentes.

## 9. Apêndices { #9-appendices }

Os apêndices reúnem informações sobre aplicações e projetos de referência. Consulte-os depois de aplicar as principais regras de esquemático e PCB das seções 5 e 6.

<div align="center"><em>Tabela 9-1: Índice dos apêndices</em></div>

<div align="center" markdown>

| Necessidade | Consulte |
|:---|:---|
| Exemplos de esquemático do sistema mínimo | Seção 5.1.2 |
| Imagens de referência do encapsulamento, padrão de pads (land pattern), estêncil, empilhamento de camadas, fanout, alimentação, RF, áudio, SDIO, USB e TVS | Seção 6.9 |
| Autoverificação do projeto do cliente | Seção 7 |

</div>

### 9.1. Apêndice A. Um produto típico baseado no SF32LB57x { #appendix-a-a-typical-sf32lb57x-product }

Um produto baseado no SF32LB57x pode incluir o MCU, o sistema de alimentação, cristais de 48 MHz e 32,768 kHz, uma rede de casamento de RF e uma antena, um controlador do display e do painel de toque, armazenamento de boot, entrada e saída de áudio, sensores, uma câmera opcional e os periféricos USB/SDIO/CAN/UART/I2C/SPI exigidos pelo produto, além do acesso para depuração e para testes de produção. Revise o circuito de carregamento, o OVP, a seleção da chave de alimentação e as correntes de fuga em modo de baixo consumo conforme a arquitetura de alimentação escolhida.

## 10. Histórico de revisões { #10-revision-history }

<div align="center"><em>Tabela 10-1: Histórico de revisões</em></div>

<div align="center" markdown>

| Versão | Data | Observações |
|:--------|:-----|:------|
| 0.5 | 2026-08 | O nível de detalhe da nota de aplicação oficial foi restaurado: foram adicionadas as quatro tabelas de referência dos pinos de alimentação por encapsulamento/família de alimentação, a tabela da porta de depuração padrão, o esquemático de RF, as tabelas completas de sinais do display (SPI/QSPI, RGB, configuração do modo RGB, MCU8080, EPD, JDI paralelo/serial, toque/retroiluminação), as figuras de referência do microfone analógico, do microfone PDM e do amplificador de potência de áudio, a tabela completa de sinais de câmera específica do chip, as tabelas IO MUX e de matriz, a tabela de sub-MUX da matriz LCDC, a tabela de pinos USB, a tabela expandida de GPADC por pino e a figura de referência da tecla de alimentação/tecla GPADC. As tabelas oficiais de autoverificação do projeto foram divididas entre as novas páginas complementares [Checklist do esquemático](SF32LB57x_schematic_checklist.md) e [Checklist do layout da PCB](SF32LB57x_pcb_layout_checklist.md), sem eliminar nenhum item de verificação. |
| 0.4 | 2026-08 | Os dados foram conferidos com a nota oficial de aplicação de hardware SF32LB57x: o mínimo da tabela de pinos `VCC`/`VBAT` foi corrigido para 3,0 V, não 3,2 V; foi adicionado o limiar de desligamento por hardware de 2,7 V; o limite de corrente de soft-start de `VDD33_VOUT1` foi corrigido para 30 mA; foram corrigidas as opções de capacitância de carga do cristal de 32,768 kHz (7 pF ou 11,5 pF, com padrão de 11,5 pF no chip); foram especificados o circuito da tecla de alimentação/reset `PA34` e o projeto da tecla GPADC com divisor resistivo; foram adicionados a faixa de entrada GPADC de 0 V a 3,3 V e o capacitor de filtro de 100 nF; foram incluídos os valores dos capacitores de `BUCK_FB`/`VDDIOA`/`VBATS`/`AVDD33_ANA`; foram acrescentadas restrições de comprimento e diferença de comprimento do barramento MPI, espaçamentos de posicionamento dos cristais e a atribuição das camadas para o empilhamento de 4 camadas. |
| 0.3 | 2026-07 | A estrutura das orientações de esquemático foi reorganizada para que projeto do sistema mínimo, sistema de alimentação, geração de clock, RF, interfaces de usuário, armazenamento e conectividade e fabricação fossem seções independentes no mesmo nível. |
| 0.2 | 2026-07 | Foram adicionados o pacote de evidências, orientações de bring-up, validação de baixo consumo, validação de RF/display/áudio/câmera e uma referência rápida das restrições críticas de PCB. |
| 0.1 | 2026-07 | Primeira edição do guia de projeto de hardware SF32LB57x, baseada na nota oficial de aplicação de hardware. |
| 0.0.1 | 2026-06 | Revisão 0.0.1 da fonte: primeira edição da nota de aplicação de hardware SF32LB57x, versionada separadamente deste guia. |

</div>

### 10.1. Histórico de revisões do checklist { #101-checklist-revision-history }

O checklist item a item no [Checklist do esquemático](SF32LB57x_schematic_checklist.md) e no [Checklist do layout da PCB](SF32LB57x_pcb_layout_checklist.md) é versionado separadamente do guia, de acordo com as tabelas de autoverificação do projeto da nota de aplicação de hardware SF32LB57x da SiFli.

<div align="center"><em>Tabela 10.1-1: Histórico de revisões do checklist</em></div>

<div align="center" markdown>

| Versão | Data | Observações |
|:--------|:-----|:------|
| 1.0 | 2026-08 | Primeira publicação, transcrita integralmente das tabelas de autoverificação do projeto (seção 4) da nota oficial de aplicação de hardware SF32LB57x, edição de 2026-06. |

</div>

[SF32LB57x Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[SF32LB57x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
