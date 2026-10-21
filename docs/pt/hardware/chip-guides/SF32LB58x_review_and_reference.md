---
icon: lucide/clipboard-check
description: "Checklist de revisão do projeto, documentos e referências, apêndices e histórico de revisões do guia de projeto de hardware SF32LB58x."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# Guia de projeto de hardware SF32LB58x — Checklist de revisão do projeto e referências { #sf32lb58x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Parte do guia de projeto de hardware SF32LB58x"
    Esta página abrange as seções 7 a 10: checklist de revisão do projeto, documentos e referências, apêndices e histórico de revisões. Volte ao [Checklist do layout da PCB](SF32LB58x_pcb_layout_checklist.md).

## 7. Checklist de revisão do projeto { #7-design-review-checklist }

- [ ] Confirme que a combinação de memórias Flash e PSRAM integradas ao encapsulamento do modelo selecionado atende aos requisitos do produto.
- [ ] Verifique se as tensões da alimentação da PMU (PVDD1/PVDD2/BUCK/LDO) e de todos os demais pinos de alimentação estão dentro dos limites do datasheet.
- [ ] Verifique se a indutância nominal do indutor BUCK selecionado é de 4,7 µH, com DCR ≤ 0,4 Ω e Isat ≥ 500 mA.
- [ ] Confirme que os cristais de 48 MHz e 32,768 kHz atendem às especificações recomendadas e que o roteamento e as áreas de exclusão cumprem os requisitos de projeto.
- [ ] Garanta impedância controlada de 50 Ω na trilha de RF e posicione a rede de casamento perto do chip.
- [ ] Confirme que a interface de armazenamento externa escolhida é compatível com o projeto de inicialização previsto. Separadamente, verifique o nível do pino Mode: alto para o modo de download e baixo para iniciar a aplicação do usuário.
- [ ] Confirme que o roteamento das interfaces de display (MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI) atende às regras de impedância e casamento de comprimento de cada interface. Para DSI, verifique impedância diferencial de 100 Ω, diferença de comprimento ≤0,5 mm dentro de cada par e ≤2 mm entre pares.
- [ ] Verifique se o roteamento USB atende ao requisito de impedância diferencial de 90 Ω. Roteie juntos os sinais SDIO; mantenha o comprimento total ≤50 mm e a diferença de comprimento dentro do grupo ≤6 mm.
- [ ] Mantenha o acesso SWD e a interface escolhida para saída de depuração, entre as seis UART disponíveis, com seus pinos de sinal e pontos de teste de produção.
- [ ] Confirme que as vias dos pads BGA estão centralizadas e que o plano de terra sob o chip é contínuo.
- [ ] Confira os códigos dos principais componentes na versão mais recente da [Lista de fornecedores aprovados da SiFli (AVL)][SiFli Approved Vendor List (AVL)].
- [ ] Inclua no pacote de evidências da revisão o empilhamento de camadas, dados de capacidade do processo de fabricação, resultados de impedância e DRC, a AVL e capturas das áreas críticas do layout.
- [ ] Resolva as pendências de esquemático, layout e fabricação antes da liberação do protótipo; registre e acompanhe explicitamente as que permanecerem abertas.

## 8. Documentos e referências { #8-related-documents-and-references }

Consulte os documentos oficiais mais recentes para verificar limites elétricos, dados do encapsulamento, multiplexação dos pinos, configuração de software e qualificação de componentes.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumo do produto SF32LB58x][SF32LB58x Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet do SF32LB58x][SF32LB58x Datasheet]__
- :fontawesome-solid-file-pdf: __[Manual do usuário SF32LB58x][SF32LB58x User Manual]__
- :fontawesome-solid-file-lines: __[Nota de aplicação de hardware SF32LB58x][SF32LB58x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[Lista de fornecedores aprovados da SiFli (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-brands-wikipedia-w: __[Índice Wiki dos guias de projeto de hardware dos chips SiFli][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Em conjunto, o [Checklist do esquemático](SF32LB58x_schematic_checklist.md) (seção 5.8) e o [Checklist do layout da PCB](SF32LB58x_pcb_layout_checklist.md) (seção 6.18) reproduzem os itens aplicáveis de esquemático e PCB da planilha *SF32LB58x Schematic & PCB Checklist* (V1.0, 2026-01-21), junto com as orientações de projeto correspondentes.

[SF32LB58x Product Brief]: https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf
[SF32LB58x Datasheet]: https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf
[SF32LB58x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58x Hardware Application Note]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Apêndices { #9-appendices }

Os apêndices reúnem contexto de aplicação e de projetos de referência. Use-os como apoio à revisão depois de aplicar as principais regras de esquemático e PCB das seções 5 e 6.

<div align="center"><em>Tabela 9-1: Índice dos apêndices</em></div>

<div align="center" markdown>

| Necessidade | Consulte |
|:---|:---|
| Contexto de aplicação de um dispositivo vestível com muitos recursos ou terminal inteligente | Apêndice A: Um dispositivo vestível inteligente ou terminal inteligente típico |
| Capturas de esquemático e exemplos no nível do circuito | Seção 5 e nota de aplicação de hardware SF32LB58x |
| Capturas de layout de PCB para BGA, HDI, RF, DSI, USB, SDIO, áudio e alimentação | Seção 6 e nota de aplicação de hardware SF32LB58x |

</div>

### 9.1. Apêndice A. Um dispositivo vestível inteligente ou terminal inteligente típico { #appendix-a-a-typical-smart-wearable-or-smart-terminal }

Um produto típico baseado no SF32LB58x para um dispositivo vestível inteligente ou terminal inteligente inclui MCU, PMIC, display de alta resolução, controlador de toque, memória de inicialização, memória externa ou eMMC, sensores, motor de vibração, entrada e saída de áudio, antena Bluetooth, cristais, USB, interfaces de depuração e pontos de teste de produção. O encapsulamento BGA256 e as interfaces de display e armazenamento de alta velocidade tornam a escolha da tecnologia HDI parte da arquitetura do sistema, e não apenas um detalhe do layout da PCB.

## 10. Histórico de revisões { #10-revision-history }

<div align="center"><em>Tabela 10-1: Histórico de revisões</em></div>

<div align="center" markdown>

| Versão | Data | Nota |
|:---|:---|:---|
| 1.0 | 2026-07 | Guia de projeto de hardware SF32LB58x atualizado com orientações de esquemático, PCB, validação e revisão de produção. |
| 0.0.1 | 1/2025 | Publicação da versão preliminar oficial de `SF32LB58x-HW-Application`. |

</div>

### 10.1. Histórico de revisões do checklist { #101-checklist-revision-history }

A lista detalhada do [Checklist do esquemático](SF32LB58x_schematic_checklist.md) e do [Checklist do layout da PCB](SF32LB58x_pcb_layout_checklist.md) é versionada separadamente do guia, conforme a planilha *SF32LB58x Schematic & PCB Checklist* da própria SiFli.

<div align="center"><em>Tabela 10.1-1: Histórico de revisões do checklist</em></div>

<div align="center" markdown>

| Nº | Versão | Data | Notas da versão |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Primeira publicação do documento Schematic & PCB Checklist |

</div>
