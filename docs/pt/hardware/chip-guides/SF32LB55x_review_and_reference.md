---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Checklist de revisão de projeto, documentos e referências, apêndices e histórico de revisões do guia de projeto de hardware SF32LB55x."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware SF32LB55x — checklist de revisão do projeto e referências { #sf32lb55x-hardware-design-guide-design-review-checklist-and-references }

## 7. Checklist de revisão do projeto { #7-design-review-checklist }

- [ ] O encapsulamento exato, a pinagem, o padrão de pads e o processo de fabricação da PCB estão confirmados.
- [ ] Todas as linhas de alimentação da PMU e as auxiliares respeitam os limites de tensão e corrente do datasheet.
- [ ] Os capacitores de desacoplamento necessários estão posicionados perto dos pinos.
- [ ] A temporização de POR/BOR/reset e o modo de boot foram verificados.
- [ ] Os cristais de 48 MHz e 32,768 kHz atendem aos requisitos de CL, ppm, ESR, posicionamento e roteamento.
- [ ] A rede de casamento de RF, a antena e a área de exclusão do plano de GND foram revisadas.
- [ ] Os grupos de pinos da memória externa e do display correspondem ao encapsulamento selecionado.
- [ ] Os circuitos de despertar, GPADC, sensores, áudio, toque, retroiluminação e motor atendem aos requisitos de baixo consumo.
- [ ] Os acessos para depuração, download, gravação em produção, testes de RF e calibração dos cristais estão reservados.

## 8. Documentos e referências relacionados { #8-related-documents-and-references }

Consulte os documentos oficiais mais recentes para verificar limites elétricos, dados do encapsulamento, multiplexação dos pinos, configuração de software, qualificação de componentes e restrições de fabricação.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Nota de aplicação de hardware SF32LB55x][SF32LB55x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[Lista de fornecedores aprovados da SiFli (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-brands-wikipedia-w: __[Índice Wiki dos guias de projeto de hardware dos chips SiFli][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

O [checklist de esquemático](SF32LB55x_schematic_checklist.md) (seção 5.8) e a seção 6.4 das [diretrizes de layout da PCB](SF32LB55x_pcb_layout.md) reproduzem, item por item, o mesmo *SF32LB55x Schematic & PCB Checklist* (V1.0, 2026-01-21), junto com as orientações de esquemático e layout da PCB que ele verifica.

[SF32LB55x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Apêndices { #9-appendices }

### 9.1. Apêndice A. Um produto SF32LB55x típico { #appendix-a-a-typical-sf32lb55x-product }

Um produto SF32LB55x típico inclui o MCU, a árvore de alimentação, os cristais, a rede de casamento de RF e a antena, a memória externa, o controlador do display e do painel de toque, sensores, entradas GPADC, motor de vibração, áudio Bluetooth opcional e pontos de acesso para depuração e testes de produção. Em projetos alimentados por bateria, avalie também as correntes de fuga em baixo consumo e planeje o acesso da placa pelos gabaritos de teste.

### 9.2. Perguntas de projeto { #91-design-qa }

1. **Por que alguns GPIOs apresentam estados padrão diferentes dos descritos na especificação quando Mode = 1?** O modo de download altera o estado dos GPIOs associados à Flash externa em QSPI2 e QSPI3.
2. **Por que um motor SMD pode vibrar inesperadamente durante a gravação do programa?** A alimentação ou o sinal PWM pode ser habilitado por engano. Se o motor parte com nível alto, um GPIO com pull-up (PU) padrão pode energizá-lo; a SiFli recomenda GPIO17 ou GPIO39 com pull-down (PD) padrão para PWM.
3. **Por que soldar a bateria pode travar o chip e como evitar isso?** O aterramento inadequado do ferro de solda pode causar um surto. Adicione proteção contra surtos e ESD à interface da bateria e aterre corretamente o ferro de solda.
4. **Por que o botão de despertar não tira o MCU do Hibernate?** Apenas as seis entradas de despertar do LCPU, GPIO43–GPIO48, podem tirar o MCU do Hibernate; os GPIO0–GPIO3 do HCPU não podem.
5. **Por que um acelerômetro ou sensor de frequência cardíaca pode consumir demais ou apresentar falhas durante a depuração de baixo consumo?** O firmware do sensor executa no LCPU; portanto, os sinais I2C, SPI, de controle e de interrupção devem usar interfaces do LCPU. Atribuí-los ao HCPU pode elevar o consumo ou causar falhas.
6. **Por que o consumo do sensor permanece alto mesmo quando todos os sinais usam interfaces do LCPU?** Desligar apenas a alimentação do sensor não basta se a alimentação dos pull-ups do I2C ou da interrupção continuar ligada. Desligue também essas alimentações.
7. **Por que usar GPIO26 e GPIO27 como saídas de controle pode elevar a corrente no modo de suspensão?** No modo de suspensão, mantenha os dois GPIOs no mesmo nível ou deixe pelo menos um em alta impedância, sem pull-up ou pull-down.
8. **Como investigar o consumo elevado do SS6600 em Hibernate?** Mantenha estáveis em nível alto ou baixo as dez entradas de despertar: GPIO0–GPIO3 do HCPU e GPIO43–GPIO48 do LCPU. Se as dez tiverem pull-up, use uma alimentação de 3,3 V sempre ativa para os pull-ups.
9. **A corrente quiescente dos componentes de alimentação pode explicar o consumo excessivo em baixo consumo?** Sim. Conversores BUCK, LDOs e chaves de carga (load switches) com corrente quiescente (Iq) elevada aumentam o consumo; a SiFli recomenda componentes com Iq abaixo de 1 µA.
10. **Como evitar artefatos no display durante testes de ESD?** Adicione dispositivos de proteção ESD aos sinais VDD, SCL, SDA, RESET e INT do painel de toque, além dos sinais de alimentação e RESET do LCD.
11. **Como evitar falhas na função de display sempre ativo (always-on display)?** Ela é usada principalmente com painéis AMOLED, que consomem menos energia que os painéis TFT. A SiFli recomenda GPIOs PB para LCD_EN, LCD_RST e controles relacionados. Se um GPIO PA controlar uma habilitação ativa em nível alto, ele deve ter pull-up (PU) padrão; um GPIO PA com pull-down (PD) padrão pode manter o display apagado de forma anormal por mais de 10 ms após o despertar.
12. **Como evitar falhas no controle de alimentação do áudio Bluetooth externo após o despertar, quando o módulo precisa permanecer alimentado no modo de suspensão?** Controle a alimentação por um GPIO do LCPU. Para uma chave ativa em nível baixo, escolha um GPIO do LCPU com pull-down (PD) padrão.
13. **Como garantir a carga após uma descarga excessiva da bateria?** Quando a tensão da bateria estiver muito baixa, o gerenciamento do caminho de alimentação deve permitir que a entrada do carregador alimente o sistema após a conexão. Sem esse gerenciamento, o CI do carregador escolhido deve fornecer corrente de carga lenta (trickle) de pelo menos 40 mA.
14. **Por que a carga pode não começar após conectar o carregador?** O sinal de detecção de conexão do carregador deve ser conectado a um dos GPIOs de despertar do LCPU, GPIO43–GPIO48. Outro GPIO pode impedir o início correto do processo de carga.
15. **Como evitar corrente excessiva no modo de download com MODE alto?** Para periféricos de alta corrente, como um PA de áudio com habilitação ativa em nível alto, use um GPIO com pull-down (PD) padrão; nunca use um GPIO com pull-up (PU) padrão. O modo de download pode ativar o periférico por engano e prejudicar a gravação.
16. **Por que a gravação pode falhar com MODE alto e como tratar uma interrupção de sensor em GPIO46?** No modo de download, GPIO46 assume por padrão a função UART3_RX e pode interferir na gravação. Mova a interrupção do sensor para GPIO43, GPIO44, GPIO47 ou GPIO48. Se forem necessárias mais entradas de despertar do LCPU, conecte à placa um botão externo em GPIO45 ou GPIO46 por meio de um resistor de 0 Ω.
17. **O que fazer quando os algoritmos do acelerômetro e do sensor de frequência cardíaca excedem a memória disponível?** Verifique se a memória atribuída ao LCPU é suficiente. Se não for, adicione Flash NOR externa em QSPI4.

## 10. Histórico de revisões { #10-revision-history }

<div align="center"><em>Tabela 10-1: Histórico de revisões</em></div>

<div align="center" markdown>

| Versão | Data | Observações |
|:---|:---|:---|
| 0.1 | 2026-07 | Primeira edição do guia de projeto de hardware SF32LB55x, elaborada com base na nota oficial de aplicação de hardware da SiFli no Wiki. |

</div>

### 10.1. Histórico de revisões do checklist { #101-checklist-revision-history }

O checklist detalhado do [esquemático](SF32LB55x_schematic_checklist.md) e da seção 6.4 das [diretrizes de layout da PCB](SF32LB55x_pcb_layout.md) tem controle de versão separado do guia, conforme a planilha *SF32LB55x Schematic & PCB Checklist* da própria SiFli.

<div align="center"><em>Tabela 10.1-1: Histórico de revisões do checklist</em></div>

<div align="center" markdown>

| Nº | Versão | Data | Notas da versão |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Primeira publicação do documento Schematic & PCB Checklist |

</div>
