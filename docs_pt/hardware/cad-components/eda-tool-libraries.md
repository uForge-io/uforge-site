---
icon: lucide/library
description: "Bibliotecas oficiais da SiFli de símbolos esquemáticos e footprints de PCB para chips e módulos SF32 — JLCEDA/LCEDA Pro, PADS, OrCAD e KiCad — com links para download e um checklist."
tags:
    - Hardware
    - EDA
    - Biblioteca
---

# Bibliotecas de ferramentas EDA para SF32 { #sf32-eda-tool-libraries }

## Finalidade { #purpose }

A SiFli publica bibliotecas de símbolos esquemáticos e footprints de PCB para a família de chips e módulos SF32. Use esses arquivos como ponto de partida para criar esquemáticos e layouts de PCB, em vez de redesenhar manualmente símbolos, pinagens e padrões de pads com base no datasheet.

As bibliotecas reduzem os riscos durante o bring-up (ativação inicial), mas não substituem o datasheet, o desenho do encapsulamento nem o guia de projeto de hardware específico do dispositivo. Antes de liberar o projeto, confira o componente selecionado na biblioteca em relação ao número exato da peça, ao encapsulamento, à pinagem, ao padrão de pads e às orientações de layout aplicáveis.

<div class="grid cards" markdown>

- :fontawesome-solid-download: __[Biblioteca JLCEDA / LCEDA Pro - baixar projeto `.epro2`](https://downloads.sifli.com/hardware/files/documentation/ProPrj_sifli-iclib_2026-04-20.epro2)__
- :fontawesome-solid-download: __[Biblioteca PADS - baixar `.ZIP`](https://downloads.sifli.com/hardware/files/documentation/PADS-SIFLI-IC.ZIP)__
- :fontawesome-solid-download: __[Biblioteca OrCAD - baixar `.OLB`](https://downloads.sifli.com/hardware/files/documentation/OrCAD-SIFLI-IC.OLB)__
- :fontawesome-brands-github: __[Biblioteca KiCad - OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries)__

</div>

!!! note "Fonte"
    Os links diretos vêm da [lista de downloads da Wiki da SiFli](https://wiki.sifli.com/hardware/index.html). Se um link mudar, consulte essa página para encontrar o arquivo substituto.

## Formatos de biblioteca em resumo { #library-format-at-a-glance }

<div align="center"><em>Resumo dos formatos de biblioteca</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Ferramenta EDA | Arquivo | Formato | Conteúdo | Distribuição |
|:---------------|:--------|:--------|:---------|:-------------|
| JLCEDA / LCEDA Pro | `ProPrj_sifli-iclib_2026-04-20.epro2` | Arquivo de projeto LCEDA Pro | Símbolos esquemáticos e footprints de PCB | Download direto |
| PADS | `PADS-SIFLI-IC.ZIP` | Arquivo de biblioteca Mentor/Siemens PADS | Símbolos esquemáticos e footprints de PCB (chamados Decal no PADS) | Download direto |
| OrCAD | `OrCAD-SIFLI-IC.OLB` | Biblioteca Cadence OrCAD Capture | Símbolos esquemáticos | Download direto |
| KiCad | ZIP de uma versão ou metadados do pacote (`metadata.json`) | Biblioteca KiCad de símbolos, footprints e modelos 3D | Símbolos esquemáticos, footprints de PCB e modelos 3D | [Repositório GitHub](https://github.com/OpenSiFli/kicad-libraries), versões publicadas |

</div>

JLCEDA / LCEDA Pro e PADS são distribuídos como arquivos compactados; OrCAD é um arquivo de biblioteca `.OLB` independente. O índice da Wiki não fornece uma tabela de cobertura por componente. Importe o arquivo na ferramenta EDA que será usada e confirme que o componente selecionado está incluído.

O repositório KiCad indicado oferece código-fonte público, versões publicadas e uma tabela de componentes compatíveis. Isso facilita verificar a cobertura, mas não garante que todas as variantes SF32 estejam incluídas.

## Detalhes da biblioteca KiCad { #kicad-library-detail }

O repositório [OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) fornece a biblioteca oficial da SiFli de símbolos, footprints e modelos 3D para KiCad sob a licença CC-BY-SA-4.0. A [versão `1.0.0`](https://github.com/OpenSiFli/kicad-libraries/releases/tag/1.0.0) foi conferida nesta revisão em 2026-10-05. Verifique se há uma versão mais recente antes de iniciar um projeto.

<div align="center"><em>Cobertura da biblioteca KiCad</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Número da peça | Encapsulamento | Símbolo | Footprint | Modelo 3D |
|:---------------------|:---------------|:-------:|:---------:|:---------:|
| SF32LB52B/D/E/G/J | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB520/3/5/7 | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| Módulo SF32LB52-MOD-1 | - | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-xmark: |

</div>

A tabela reflete o README do repositório conferido em 2026-10-05, não uma verificação pino a pino de cada versão disponível para download. Os grupos de chips com curinga não comprovam a compatibilidade com todos os códigos exatos dos componentes disponíveis para pedido. Confira o símbolo, o footprint e o encapsulamento escolhidos no arquivo que você instalar.

!!! note "Como interpretar as referências de peça no README do repositório"
    O README da biblioteca KiCad da OpenSiFli lista os chips como `SF32LB52XUx` e `SF32LB52xUx`. Na nomenclatura da SiFli, o `X` maiúsculo é um curinga para as variantes alfabéticas alimentadas por uma fonte externa, e o `x` minúsculo é um curinga para as variantes numéricas alimentadas por bateria. Esta página expande essas linhas para os grupos explícitos SF32LB52B/D/E/G/J e SF32LB520/3/5/7 usados no restante da documentação da μForge.

O README do repositório [OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) informa que a instalação pelo catálogo do Package and Content Manager ainda não é suportada. Para a instalação manual, ele descreve baixar o ZIP de uma versão e selecionar **Install from file...** no gerenciador. A página da versão `1.0.0` também informa que é possível extrair o ZIP no diretório de bibliotecas do KiCad ou instalá-lo pelo gerenciador usando `metadata.json`. Siga as instruções da versão que você utilizar; o README identifica as bibliotecas instaladas de símbolos e footprints como `PCM_SiFli`.

## Checklist de revisão { #review-checklist }

- [ ] Antes de liberar o esquemático, confira o código do componente e o sufixo do encapsulamento da biblioteca em relação à BOM.
- [ ] Compare os nomes e números dos pinos do símbolo com o datasheet do chip e o guia de projeto de hardware específico do dispositivo.
- [ ] Confira no desenho oficial do encapsulamento o tamanho e o espaçamento dos pads, a área de afastamento da footprint (courtyard), o tratamento do pad exposto e as folgas para montagem.
- [ ] Use os modelos 3D apenas como auxílio para posicionamento e verificação de encaixe mecânico; não os use como referência de dimensões de fabricação ou montagem.
- [ ] Para JLCEDA / LCEDA Pro, PADS e OrCAD, confirme a cobertura por componente após a importação; o índice de downloads da Wiki não informa a compatibilidade de cada componente.
- [ ] Verifique se há atualizações das bibliotecas antes de iniciar um projeto. Guarde com o projeto a versão revisada do arquivo ou pacote; a SiFli pode atualizar os arquivos à medida que novos dispositivos e módulos são validados. Atualizações podem adicionar ou modificar componentes, portanto confira qualquer versão substituta antes de adotá-la.

## Páginas relacionadas { #related-pages }

- [Família SF32](../../sf32-products/family/SF32_family.md)
- [Convenção de nomenclatura SF32](../../sf32-products/family/SF32_namingrule.md)
- [Lista de fornecedores aprovados para SF32](sifli-approved-vendor-list.md)
