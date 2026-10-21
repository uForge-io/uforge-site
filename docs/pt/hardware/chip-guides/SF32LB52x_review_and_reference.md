---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Checklist de revisão, documentos, figuras de referência de esquemáticos, PCB, mecânica e alimentação, e histórico de revisões do guia de hardware do SF32LB52x."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware do SF32LB52x — checklist de revisão e referências { #sf32lb52x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Parte do guia de projeto de hardware do SF32LB52x"
    Esta página reúne as Seções 7–10: checklist de revisão do projeto, documentos e referências, apêndices e histórico de revisões. Volte às [Orientações de layout de PCB](SF32LB52x_pcb_layout.md).

## 7. Checklist de revisão do projeto { #7-design-review-checklist }

- [ ] A revisão do sistema mínimo está concluída: variante exata, encapsulamento, árvore de alimentação, meio de boot, pinos de configuração de boot, acesso para depuração e gravação, clocks e estratégia de despertar estão documentados
- [ ] O modelo exato do chip e a variante de alimentação foram confirmados, sem misturar os esquemas de alimentação das duas variantes
- [ ] Os pinos de alimentação do processador (VBUS/VBAT/VCC ou PVDD/VDDIOA/VDD_SIP) operam dentro da faixa de tensão especificada no datasheet
- [ ] O indutor BUCK atende a 4,7 uH ±20%, DCR ≤0,4 Ω e Isat ≥450 mA
- [ ] Variante alimentada por bateria: caminho de carga, faixa de tensão do componente OVP e capacitância de saída do LDO integrado foram verificados
- [ ] Os cristais de 48 MHz e 32,768 kHz atendem às especificações recomendadas, e o roteamento e as áreas de exclusão atendem aos requisitos
- [ ] A trilha RF tem impedância de 50 Ω, e a rede de casamento está próxima ao chip
- [ ] A configuração de boot pelo armazenamento, incluindo a opção eMMC da variante com alimentação regulada externa, corresponde à configuração dos pinos Bootstrap
- [ ] O pino de controle da chave de alimentação do armazenamento foi verificado para a variante exata; resolva, antes da liberação, a divergência PA11/PA21 entre o checklist oficial e as notas de aplicação
- [ ] USB DP/DN são roteados como par diferencial com impedância diferencial de 90 Ω
- [ ] Os sinais SDIO são roteados em conjunto, com comprimento total ≤50 mm, diferença de comprimento no grupo ≤6 mm e blindagem de GND
- [ ] Os pinos multiplexados DBG_UART/SWD e os pontos de teste de produção estão reservados
- [ ] Os números de peça dos principais componentes foram conferidos na [lista de fornecedores aprovados pela SiFli][SiFli Approved Vendor List (AVL)] mais recente

## 8. Documentos e referências { #8-related-documents-and-references }

[SF32LB52x Datasheet (Official PDF)]: https://downloads.sifli.com/silicon/DS0052-SF32LB52x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V2p4.pdf?
[SF32LB52x User Manual (Official PDF)]: https://downloads.sifli.com/silicon/UM0052-SF32LB52x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p3.pdf?
[SF32LB52 Hardware Reference Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-%E7%A1%AC%E4%BB%B6%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1-20250619.zip?
[SF32LB520/3/5/7 Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md
[52B/D/E/G/J Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md
[Local SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Datasheet do SF32LB52x (PDF oficial)][SF32LB52x Datasheet (Official PDF)]__
- :fontawesome-solid-file-pdf: __[Manual do usuário do SF32LB52x (PDF oficial)][SF32LB52x User Manual (Official PDF)]__
- :fontawesome-solid-file-zipper: __[Pacote de projeto de referência do SF32LB52][SF32LB52 Hardware Reference Design Package]__
- :fontawesome-brands-github: __[Nota de aplicação de hardware do SF32LB520/3/5/7 (fonte)][SF32LB520/3/5/7 Hardware Application Note (Source)]__
- :fontawesome-brands-github: __[Nota de aplicação de hardware do 52B/D/E/G/J (fonte)][52B/D/E/G/J Hardware Application Note (Source)]__
- :fontawesome-solid-file-excel: __[Lista de fornecedores aprovados da SiFli neste site][Local SiFli Approved Vendor List]__
- :fontawesome-solid-file-excel: __[Checklist SiFli de esquemático e PCB do SF32LB52 (XLSX)][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]__
- :fontawesome-brands-wikipedia-w: __[Índice SiFli de guias de projeto de hardware (Wiki)][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Outras referências:

- [Resumo do produto SF32LB52x](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf)
- [Datasheet do SF32LB52x](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf)
- [Manual de referência do SF32LB52x](https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf)
- [Nota de aplicação de hardware do SF32LB520/3/5/7](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md)
- [Nota de aplicação de hardware do 52B/D/E/G/J](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md)

Os [checklists do esquemático](SF32LB52x_schematic_checklist.md) (Seção 5.8) e [do layout da PCB](SF32LB52x_pcb_layout_checklist.md) (Seção 6.15) reproduzem, item a item, o mesmo *Checklist de esquemático e PCB do SF32LB52* (V1.0, 2026-01-21), junto das orientações de projeto usadas na revisão.

## 9. Apêndices { #9-appendices }

As notas de aplicação originais da SiFli incluem as figuras de referência de esquemáticos, layout de PCB, mecânica e alimentação apresentadas a seguir. Os apêndices mantêm essas figuras como material de referência para a revisão; as Seções 5 e 6 continuam sendo as principais orientações de projeto.

!!! note "Como usar estas figuras"
    Use estas figuras como circuitos de referência e exemplos de layout das notas de aplicação originais. Confirme a implementação final para o dispositivo e o produto escolhidos usando as regras, tabelas, datasheet, manual de referência, pacote de projeto de referência mais recente e AVL.

<div align="center"><em>Tabela 9-1: Mapa dos apêndices</em></div>

<div align="center" markdown>

| Necessidade | Onde começar |
|:---|:---|
| Exemplos de diagrama de blocos de smartwatch para os dois grupos SF32LB52x | Apêndice A: aplicação típica de smartwatch |
| Exemplos de circuitos esquemáticos de RF, armazenamento/boot, botões, motor, áudio, clock, USB e DC/DC | Apêndice B: esquemáticos de referência |
| Exemplos de posicionamento e roteamento de PCB para RF, armazenamento, áudio, empilhamento de camadas, fanout, clock, USB e DC/DC | Apêndice C: layouts de PCB de referência |
| Desenhos de dimensões, formato e padrão de pads do encapsulamento | Apêndice D: mecânica |
| Circuitos e layouts de referência de carga, OVP, árvore de alimentação e PMU | Apêndice E: alimentação |

</div>

### 9.1. Apêndice A. Aplicação típica de smartwatch { #appendix-a-a-typical-smart-watch-application }

Um smartwatch típico com SF32LB52x inclui MCU, display, controlador de toque, armazenamento, sensores, motor de vibração, entrada/saída de áudio, antena Bluetooth, fontes de clock, gerenciamento de energia, acesso para depuração e acesso para testes de produção. A variante alimentada por bateria também inclui gerenciamento de carga.
As Figuras 9.1-1 e 9.1-2 mostram display QSPI, acelerômetro/giroscópio por SPI, módulo de frequência cardíaca por I2C, microfone analógico e caminho DAC-amplificador, motor de vibração acionado por PWM, clock de 48 MHz, caminho RF Bluetooth e acesso SWD/UART. QSPI NAND, SD NAND e NOR Flash são exemplos de armazenamento, não uma lista completa dos meios de boot. Os dois diagramas mostram um carregador externo e um caminho Buck/LDO. Escolha a arquitetura real de alimentação conforme a Seção 5.2; o diagrama de blocos não impõe esse circuito.


![Figura 9.1-1: Diagrama de aplicação de smartwatch (SF32LB520/3/5/7)](../../sf32-products/chips/assets/52xA/sf32lb52x-A-watch-app-diagram-52x.png){ loading="lazy" }

<div align="center"><em>Figura 9.1-1: Diagrama de aplicação de smartwatch (SF32LB520/3/5/7)</em></div>

![Figura 9.1-2: Diagrama de aplicação de smartwatch (52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-watch-app-diagram-52X.png){ loading="lazy" }

<div align="center"><em>Figura 9.1-2: Diagrama de aplicação de smartwatch (52B/D/E/G/J)</em></div>

### 9.2. Apêndice B. Esquemáticos de referência { #appendix-b-reference-schematics }

**RF**

![Figura 9.2-1: Diagrama de blocos do front-end RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-1: Diagrama de blocos do front-end RF</em></div>

![Figura 9.2-2: Esquemático de referência de RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-2: Esquemático de referência de RF</em></div>

![Figura 9.2-3: Referência de conexão do circuito RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-3: Referência de conexão do circuito RF</em></div>

**Armazenamento e boot**

![Figura 9.2-4: Referência de configuração de boot (SF32LB520/3/5/7)](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-4: Referência de configuração de boot (SF32LB520/3/5/7)</em></div>

![Figura 9.2-5: Referência de configuração de boot (52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-5: Referência de configuração de boot (52B/D/E/G/J)</em></div>

![Figura 9.2-6: Esquemático de referência de SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-6: Esquemático de referência de SDIO</em></div>

**Botões, motor e áudio**

![Figura 9.2-7: Circuito de referência do motor de vibração (SF32LB520/3/5/7)](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-7: Circuito de referência do motor de vibração (SF32LB520/3/5/7)</em></div>

![Figura 9.2-8: Circuito de referência do motor de vibração (52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-8: Circuito de referência do motor de vibração (52B/D/E/G/J)</em></div>

![Figura 9.2-9: Circuito de referência do botão de alimentação](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-9: Circuito de referência do botão de alimentação</em></div>

![Figura 9.2-10: Circuito de referência do encoder rotativo](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-10: Circuito de referência do encoder rotativo</em></div>

![Figura 9.2-11: Circuito de referência do microfone MEMS analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-11: Circuito de referência do microfone MEMS analógico</em></div>

![Figura 9.2-12: Circuito de referência do microfone ECM analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-12: Circuito de referência do microfone ECM analógico</em></div>

![Figura 9.2-13: Circuito de referência do DAC para o amplificador de potência de áudio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-13: Circuito de referência do DAC para o amplificador de potência de áudio</em></div>

![Figura 9.2-14: Esquemático de referência da alimentação de áudio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-14: Esquemático de referência da alimentação de áudio</em></div>

![Figura 9.2-15: Esquemático de referência do ADC de áudio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-15: Esquemático de referência do ADC de áudio</em></div>

![Figura 9.2-16: Esquemático de referência do DAC de áudio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-16: Esquemático de referência do DAC de áudio</em></div>

**Clock**

![Figura 9.2-17: Esquemático do cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-17: Esquemático do cristal de 48 MHz</em></div>

![Figura 9.2-18: Esquemático do cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-18: Esquemático do cristal de 32,768 kHz</em></div>

**USB**

![Figura 9.2-19: Esquemático de referência de USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-19: Esquemático de referência de USB</em></div>

**DC/DC**

![Figura 9.2-20: Esquemático de referência de DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ loading="lazy" }

<div align="center"><em>Figura 9.2-20: Esquemático de referência de DC/DC</em></div>

### 9.3. Apêndice C. Layouts de PCB de referência { #appendix-c-reference-pcb-layouts }

**RF**

![Figura 9.3-1: Layout de referência do casamento RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-1: Layout de referência do casamento RF</em></div>

![Figura 9.3-2: Roteamento de PCB de referência de RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-2: Roteamento de PCB de referência de RF</em></div>

**Armazenamento**

![Figura 9.3-3: Layout de PCB de referência de SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-3: Layout de PCB de referência de SDIO</em></div>

**Áudio**

![Figura 9.3-4: Layout de PCB de referência da alimentação de áudio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-4: Layout de PCB de referência da alimentação de áudio</em></div>

![Figura 9.3-5: Layout de PCB de referência do ADC de áudio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-5: Layout de PCB de referência do ADC de áudio</em></div>

![Figura 9.3-6: Layout de PCB de referência do DAC de áudio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-6: Layout de PCB de referência do DAC de áudio</em></div>

**Estrutura da PCB**

![Figura 9.3-7: Empilhamento de camadas de referência da PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-7: Empilhamento de camadas de referência da PCB</em></div>

![Figura 9.3-8: Regras de referência de projeto de PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-8: Regras de referência de projeto de PCB</em></div>

![Figura 9.3-9: Fanout de referência do QFN](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-9: Fanout de referência do QFN</em></div>

![Figura 9.3-10: Posicionamento de referência dos cristais](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-10: Posicionamento de referência dos cristais</em></div>

**Roteamento de clock**

![Figura 9.3-11: Modelo de roteamento do cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-11: Modelo de roteamento do cristal de 48 MHz</em></div>

![Figura 9.3-12: Roteamento de referência do cristal de 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-12: Roteamento de referência do cristal de 48 MHz</em></div>

![Figura 9.3-13: Modelo de roteamento do cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-13: Modelo de roteamento do cristal de 32,768 kHz</em></div>

![Figura 9.3-14: Roteamento de referência do cristal de 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-14: Roteamento de referência do cristal de 32,768 kHz</em></div>

**USB**

![Figura 9.3-15: Layout de PCB de referência de USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-15: Layout de PCB de referência de USB</em></div>

![Figura 9.3-16: Referência de posicionamento de USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-16: Referência de posicionamento de USB</em></div>

![Figura 9.3-17: Referência de roteamento de USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-17: Referência de roteamento de USB</em></div>

**DC/DC**

![Figura 9.3-18: Layout de PCB de referência de DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ loading="lazy" }

<div align="center"><em>Figura 9.3-18: Layout de PCB de referência de DC/DC</em></div>

### 9.4. Apêndice D. Mecânica { #appendix-d-mechanical }

![Figura 9.4-1: Desenho do encapsulamento SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ loading="lazy" }

<div align="center"><em>Figura 9.4-1: Desenho do encapsulamento SF32LB520/3/5/7</em></div>

![Figura 9.4-2: Desenho do encapsulamento 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ loading="lazy" }

<div align="center"><em>Figura 9.4-2: Desenho do encapsulamento 52B/D/E/G/J</em></div>

![Figura 9.4-3: Dimensões do encapsulamento QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ loading="lazy" }

<div align="center"><em>Figura 9.4-3: Dimensões do encapsulamento QFN68L</em></div>

![Figura 9.4-4: Formato do encapsulamento QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ loading="lazy" }

<div align="center"><em>Figura 9.4-4: Formato do encapsulamento QFN68L</em></div>

![Figura 9.4-5: Footprint recomendado do QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ loading="lazy" }

<div align="center"><em>Figura 9.4-5: Footprint recomendado do QFN68L</em></div>

### 9.5. Apêndice E. Alimentação { #appendix-e-power }

**SF32LB520/3/5/7 (alimentado por bateria)**

As figuras abaixo mostram circuitos externos de carregamento com e sem gerenciamento do caminho de alimentação (PPM), seguidos pelo circuito de carregamento integrado.

![Figura 9.5-1: Circuito externo de carregamento sem PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-1: Circuito externo de carregamento sem gerenciamento do caminho de alimentação (PPM)</em></div>

![Figura 9.5-2: Circuito externo de carregamento com PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-2: Circuito externo de carregamento com gerenciamento do caminho de alimentação (PPM)</em></div>

![Figura 9.5-3: Circuito do carregador integrado](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-3: Circuito do carregador integrado</em></div>

![Figura 9.5-4: Ajuste do limiar de OVP](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-4: Ajuste do limiar de OVP</em></div>

![Figura 9.5-5: Aplicação de OVP com OVLO ajustável](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-5: Aplicação de OVP com OVLO ajustável</em></div>

![Figura 9.5-6: Aplicação de OVP com saída regulada](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-6: Aplicação de OVP com saída regulada</em></div>

![Figura 9.5-7: Estrutura de alimentação (SF32LB520/3/5/7)](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-7: Estrutura de alimentação (SF32LB520/3/5/7)</em></div>

![Figura 9.5-8: Esquemático de referência de VCC](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-8: Esquemático de referência de VCC</em></div>

![Figura 9.5-9: Layout de PCB de referência de VCC](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-9: Layout de PCB de referência de VCC</em></div>

![Figura 9.5-10: Esquemático de referência de carga](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-10: Esquemático de referência de carga</em></div>

![Figura 9.5-11: Layout de PCB de referência de carga](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-11: Layout de PCB de referência de carga</em></div>

![Figura 9.5-12: Referência de TVS para PMU](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-12: Referência de TVS para PMU</em></div>

![Figura 9.5-13: Referência de proteção EOS para PMU](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-13: Referência de proteção EOS para PMU</em></div>

**52B/D/E/G/J (alimentação regulada externa)**

![Figura 9.5-14: Layout de PCB de referência de PMU (52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ loading="lazy" }

<div align="center"><em>Figura 9.5-14: Layout de PCB de referência de PMU (52B/D/E/G/J)</em></div>

## 10. Histórico de revisões { #10-revision-history }

<div align="center"><em>Tabela 10-1: Histórico de revisões</em></div>

<div align="center" markdown>

| Versão | Data | Alteração |
|:---|:---|:---|
| 1.1 | 2026-07 | Sistema de alimentação passou a ser uma seção independente do esquemático; geração de clock e RF foram separados, e as seções seguintes foram renumeradas. |
| 1.0 | Este documento | As duas notas de aplicação oficiais foram reunidas em um guia, com abas para separar os conteúdos das variantes alimentadas por bateria e por alimentação regulada externa. |
| 0.0.1 | 10/2024 | Publicação original de `SF32LB520-3-5-7-HW-Application` |
| 0.0.1 | 10/2024 | Publicação original de `SF32LB52B-E-G-J-HW-Application` |

</div>

### 10.1. Histórico de revisões do checklist { #101-checklist-revision-history }

Os checklists por item do [esquemático](SF32LB52x_schematic_checklist.md) e [do layout da PCB](SF32LB52x_pcb_layout_checklist.md) têm versionamento independente do guia, conforme a planilha *Checklist de esquemático e PCB do SF32LB52* da SiFli.

<div align="center"><em>Tabela 10.1-1: Histórico de revisões do checklist</em></div>

<div align="center" markdown>

| Versão | Data | Alteração |
|:---|:---|:---|
| 1.0 | 2026-01-21 | Primeira versão, baseada no *Checklist de esquemático e PCB do SF32LB52* V1.0 da SiFli |

</div>

[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
