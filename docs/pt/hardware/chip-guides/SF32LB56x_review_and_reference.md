---
icon: lucide/clipboard-check
description: "Checklist de revisão do projeto, documentos e referências, apêndices e histórico de revisões do guia de projeto de hardware SF32LB56x."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# Guia de projeto de hardware SF32LB56x — Checklist de revisão do projeto e referências { #sf32lb56x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Parte do guia de projeto de hardware SF32LB56x"
    Esta página abrange as seções 7 a 10: checklist de revisão do projeto, documentos e referências, apêndices e histórico de revisões. Volte às [Diretrizes de layout da PCB](SF32LB56x_pcb_layout.md).

## 7. Checklist de revisão do projeto { #7-design-review-checklist }

- [ ] A variante U ou V, o encapsulamento, a pinagem e o processo de fabricação da PCB estão confirmados.
- [ ] As linhas de alimentação do processador, as saídas do PMIC, os capacitores, o reset, o carregador e as chaves de baixo consumo foram revisados.
- [ ] Os modos de operação, as fontes de despertar, a alimentação dos resistores de pull-up e as correntes de fuga no modo de suspensão foram revisados.
- [ ] Os parâmetros, o posicionamento e o roteamento dos cristais de 48 MHz e 32,768 kHz foram revisados.
- [ ] A rede de casamento de RF, o layout da antena e o plano de sintonia estão concluídos.
- [ ] Os pinos de display, armazenamento, áudio, sensores, PBR, UART/I2C, GPTIM, depuração e produção não apresentam conflitos.
- [ ] O fanout dos encapsulamentos QFN ou BGA, o stack-up, o controle de impedância, o DRC e a estratégia de ESD estão concluídos.
- [ ] O fluxo de gravação em produção e de calibração dos cristais foi testado.

## 8. Documentos e referências relacionados { #8-related-documents-and-references }

Consulte os documentos oficiais mais recentes para verificar limites elétricos, dados do encapsulamento, multiplexação dos pinos, configuração de software, qualificação de componentes e restrições de fabricação.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Nota de aplicação de hardware SF32LB56xU][SF32LB56xU Hardware Application Note]__
- :fontawesome-solid-file-lines: __[Nota de aplicação de hardware SF32LB56xV][SF32LB56xV Hardware Application Note]__
- :fontawesome-solid-file-excel: __[Lista de fornecedores aprovados da SiFli (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-brands-wikipedia-w: __[Índice Wiki dos guias de projeto de hardware dos chips SiFli][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

O [checklist do esquemático](SF32LB56x_schematic_checklist.md) (seção 5.8) e a seção 6.3 das [Diretrizes de layout da PCB](SF32LB56x_pcb_layout.md) reproduzem, item por item, o mesmo *SF32LB56x Schematic & PCB Checklist* (V1.0, 2026-01-21), junto com as orientações de esquemático e layout da PCB correspondentes a cada verificação.

[SF32LB56xU Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[SF32LB56xV Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Apêndices { #9-appendices }

### 9.1. Apêndice A. Um produto SF32LB56x típico { #appendix-a-a-typical-sf32lb56x-product }

Um produto típico baseado no SF32LB56x inclui o MCU, o PMIC, o controlador do display e do painel de toque, a memória de boot, memória externa opcional, sensores, motor de vibração, entrada e saída de áudio, antena Bluetooth, cristais e acessos para depuração e testes de produção. O encapsulamento U favorece uma implementação compacta em QFN, enquanto o encapsulamento V oferece mais interfaces e exige planejamento do layout com BGA/HDI.

## 10. Histórico de revisões { #10-revision-history }

<div align="center"><em>Tabela 10-1: Histórico de revisões</em></div>

<div align="center" markdown>

| Versão | Data | Observações |
|:---|:---|:---|
| 0.1 | 2026-07 | Primeira edição do guia de projeto de hardware SF32LB56x, elaborada com base nas notas oficiais de aplicação de hardware SF32LB56xU e SF32LB56xV do Wiki da SiFli. |

</div>

### 10.1. Histórico de revisões do checklist { #101-checklist-revision-history }

Os checklists item a item do [esquemático](SF32LB56x_schematic_checklist.md) e da seção 6.3 das [Diretrizes de layout da PCB](SF32LB56x_pcb_layout.md) são versionadas separadamente do guia, conforme a planilha *SF32LB56x Schematic & PCB Checklist* da SiFli.

<div align="center"><em>Tabela 10.1-1: Histórico de revisões do checklist</em></div>

<div align="center" markdown>

| Nº | Versão | Data | Notas da versão |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Primeira publicação do documento Schematic & PCB Checklist |

</div>
