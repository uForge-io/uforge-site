---
icon: lucide/book-check
hide:
    - navigation
description: "Guia de projeto de hardware do MCU SF32LB57x: sistema mínimo, alimentação, clock, RF, display, câmera, armazenamento e orientações de layout de PCB."
tags:
    - Hardware
    - Chip
---

# Guia de projeto de hardware do SF32LB57x { #sf32lb57x-hardware-design-guide }

## 1. Introdução { #1-introduction }

Este guia apresenta recomendações e material de referência para produtos baseados na família de microcontroladores AIoT altamente integrados SF32LB57x. Destina-se a engenheiros de hardware, projetistas de PCB e profissionais de desenvolvimento de produto que projetam dispositivos vestíveis, terminais inteligentes portáteis, equipamentos para casas inteligentes e outros produtos conectados de baixo consumo.

O guia abrange todo o processo de desenvolvimento de hardware: arquitetura de alimentação, circuitos de clock, projeto de RF, interfaces de display e câmera, armazenamento e configuração de boot, circuitos de áudio, layout de PCB, validação e preparação para fabricação. Seguir estas recomendações ajuda a reduzir riscos no esquemático e no layout, preservar o comportamento de baixo consumo e manter o projeto alinhado aos requisitos de encapsulamento, alimentação e interfaces do SF32LB57x.

Este documento pressupõe conhecimentos básicos de projeto de hardware embarcado e captura de esquemáticos. Ele complementa o datasheet, o manual do usuário, a nota oficial de aplicação de hardware, os arquivos de projeto de referência e a Lista de Fornecedores Aprovados (AVL) da SiFli. As especificações elétricas, a multiplexação de pinos, as dimensões dos encapsulamentos, a qualificação de componentes e os limites de produção devem ser confirmados nessas fontes oficiais.

## 2. Recursos de desenvolvimento { #2-development-resources }

[SF32LB57x Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[SF32LB57x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumo do produto SF32LB57x][SF32LB57x Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet do SF32LB57x][SF32LB57x Datasheet]__
- :fontawesome-solid-file-pdf: __[Manual do usuário do SF32LB57x][SF32LB57x User Manual]__
- :fontawesome-solid-file-lines: __[Nota de aplicação de hardware do SF32LB57x][SF32LB57x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[Lista de Fornecedores Aprovados da SiFli (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__

</div>

## 3. Visão geral do dispositivo { #3-device-overview }

### 3.1. Recursos { #31-features }

Os recursos típicos do SF32LB57x incluem:

- Até 58 GPIOs<!-- BGA-ONLY -->; algumas variantes BGA112 têm seis E/S adicionais, que podem ser usadas para MPI3 ou configuradas, por pull-up/pull-down, como saídas estáticas GP; consulte Encapsulamentos<!-- /BGA-ONLY -->.
- 3 UART, 4 I2C, 2 SPI e 2 CAN.
- 2 GPTIM (4 canais cada), 2 LPTIM, 2 ATIM (3 canais diferenciais ou 4 canais de terminação simples (single-ended) cada), 1 PWM (5 canais) e 1 PTM (16 canais).
- 4 saídas de clock RTC; nos estados de suspensão, 4 saídas de clock de baixa frequência (máximo de 16 kHz).
- 2 interfaces SDIO e 3 interfaces de armazenamento MPI.
- 2 interfaces de áudio I2S e 2 PDM; 1 saída de áudio analógico diferencial e 2 entradas de áudio analógico diferenciais.
- 1 USB 2.0 FS.
- 1 GPADC (12 canais).
- 1 controlador de display LCDC (DPI de 24 bits, 8080 de 8/16 bits, QSPI, EPD de 8/16 bits e JDI serial/paralelo).
- 1 interface de câmera DCMI (DVP de até 16 bits, SPI com 2 linhas de dados e QSPI com 4 linhas de dados).
- 10 fontes de despertar por hardware.
- Depuração por DBG-UART e SWD; download por DBG-UART, SWD, UART e USB.

!!! note "Escopo das interfaces de display"
    A nota de aplicação de hardware lista SPI/QSPI, DPI de 24 bits, 8080 de 16 bits, EPD de 16 bits e JDI serial/paralelo no resumo da interface LCDC do SF32LB57x. MIPI-DSI aparece na lista de compatibilidade de alguns CIs controladores de display, mas não nesse resumo das interfaces LCDC diretas do chip. Não interprete a referência ao controlador do painel como confirmação de uma interface host MIPI-DSI nativa no chip; antes de selecionar o projeto, confirme com a SiFli o caminho do controlador de display específico.

### 3.2. Variantes { #32-variants }

O SF32LB57x abrange duas famílias de alimentação:

<div align="center"><em>Tabela 3.2-1: visão geral dos números de peça e das variantes de alimentação</em></div>

<div align="center" markdown>

| Família | Números de peça típicos | Implicações para o projeto |
|:--------|:------------------------|:--------------------------|
| Variantes alimentadas por bateria | 570 / 573 / 575 / 576 / 577 / 578 / 579 | Para produtos com bateria de íons de lítio. O projeto geralmente inclui VBAT, VCC, VBUS e carregamento interno ou externo. |
| Variantes alimentadas por 3,3 V | 57Z / 57C / 57E / 57F / 57G / 57H / 57J | Para sistemas alimentados por uma fonte externa regulada de 3,3 V. PVDD, AVDD, VDDIO e os demais trilhos relacionados são fornecidos externamente. |

</div>

!!! warning
    As duas famílias diferem nas conexões de alimentação, no comportamento de inicialização e em algumas definições de encapsulamento. Confirme o número de peça comercial antes de reutilizar outro projeto.

### 3.3. Encapsulamentos { #33-packages }

As opções comuns incluem QFN68L, QFN80L<!-- BGA-ONLY --> e BGA112<!-- /BGA-ONLY -->. Os dados do SF32LB57x especificam duas espessuras para cada encapsulamento, e as famílias alimentadas por bateria e por 3,3 V usam diagramas de pinagem diferentes. Selecione sempre a pinagem, o POD, o padrão de pads e o desenho do estêncil correspondentes ao número de peça exato.

<div align="center"><em>Tabela 3.3-1: opções de encapsulamento e pontos de atenção no projeto</em></div>

<div align="center" markdown>

| Encapsulamento | Dimensão típica | Passo | Ponto de atenção no projeto |
|:---------------|:---------------|:------|:-----------------------------|
| QFN68L | 7 mm x 7 mm | 0,35 mm | Adequado a projetos compactos; verifique o aterramento do pad exposto, as aberturas do estêncil e a viabilidade do fanout na camada superior. |
| QFN80L | 8 mm x 8 mm | 0,35 mm | Oferece mais recursos de E/S; verifique as diferenças entre domínios de alimentação e os grupos de pinos de display e armazenamento. |
<!-- BGA-ONLY -->
| BGA112 | 5,4 mm x 4,4 mm | 0,4 mm | Ocupa pouca área, mas o fanout é mais difícil; confirme antecipadamente a capacidade do processo de fabricação da PCB. |
<!-- /BGA-ONLY -->

</div>

Os encapsulamentos QFN68L e QFN80L oferecem apenas a quantidade de GPIO especificada para o número de peça comercial; não incluem E/S adicionais para MPI3 ou para uso como saídas estáticas.

<!-- BGA-ONLY -->
!!! note "Disponibilidade de GPIO no BGA112"
    Aplicável somente ao BGA112. O SF32LB57x integra MPI1, MPI2 e MPI3. Consulte a [convenção de nomenclatura SF32](../../sf32-products/family/SF32_namingrule.md) para ver a posição da memória integrada associada a cada interface. Em qualquer uma destas três configurações de memória integrada ao encapsulamento, os pinos MPI2 e MPI3 não podem ser acessados externamente; por isso, ficam disponíveis apenas 58 GPIOs: (1) um dispositivo PSRAM em cada uma das interfaces MPI1 e MPI2; (2) um único dispositivo PSRAM de 256 Mb em MPI2; ou (3) um dispositivo NOR Flash em MPI3. `SF32LB57GVD776` corresponde ao caso (3); o segundo `7` do código indica que o dispositivo interno usa MPI3. Nas demais configurações, as seis E/S do BGA112 associadas ao MPI3 podem ser usadas para MPI3 ou configuradas, por pull-up ou pull-down, como saídas estáticas GP; não são GPIOs de atribuição livre. Portanto, `58 + 6` em `SF32LB57ZVN7N6` significa 58 GPIOs mais seis E/S para MPI3 ou saídas estáticas, não 64 GPIOs de atribuição livre.
<!-- /BGA-ONLY -->

<div align="center"><em>Tabela 3.3-2: dimensões dos encapsulamentos</em></div>

<div align="center" markdown>

| Encapsulamento | Dimensão do corpo | Espessura do chip | Passo |
|:---------------|:-----------------|:------------------|:------|
| QFN68L | 7 mm x 7 mm | 0,9 mm | 0,35 mm |
| QFN68L | 7 mm x 7 mm | 1,1 mm | 0,35 mm |
| QFN80L | 8 mm x 8 mm | 0,9 mm | 0,35 mm |
| QFN80L | 8 mm x 8 mm | 1,1 mm | 0,35 mm |
<!-- BGA-ONLY -->
| BGA112 | 5,4 mm x 4,4 mm | 0,98 mm | 0,4 mm |
| BGA112 | 5,4 mm x 4,4 mm | 1,03 mm | 0,4 mm |
<!-- /BGA-ONLY -->

</div>

Pontos de verificação recomendados:

- A numeração dos pinos corresponde à pinagem do datasheet.
- Os pinos de alimentação, terra, RF, cristal, USB, display, boot e depuração estão posicionados corretamente.
- O aterramento do pad exposto do QFN e as vias térmicas seguem as regras de montagem.
<!-- BGA-ONLY -->
- O fanout BGA, as vias cegas/enterradas, a máscara de solda, as aberturas do estêncil e a capacidade de montagem foram confirmados com o fabricante da PCB.
<!-- /BGA-ONLY -->

![Figura 3.3-1: regra de identificação do número de peça SF32LB57x](../../sf32-products/chips/assets/57x/57x-part-numbering.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-1: regra de identificação do número de peça SF32LB57x</em></div>

![Figura 3.3-2: pinagem da variante QFN68L alimentada por bateria](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-2: pinagem da variante QFN68L alimentada por bateria</em></div>

![Figura 3.3-3: pinagem da variante QFN68L alimentada por 3,3 V](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-3: pinagem da variante QFN68L alimentada por 3,3 V</em></div>

![Figura 3.3-4: pinagem da variante QFN80L alimentada por bateria](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-4: pinagem da variante QFN80L alimentada por bateria</em></div>

![Figura 3.3-5: pinagem da variante QFN80L alimentada por 3,3 V](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-5: pinagem da variante QFN80L alimentada por 3,3 V</em></div>

<!-- BGA-ONLY -->
![Figura 3.3-6: pinagem da variante BGA112 alimentada por bateria](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-6: pinagem da variante BGA112 alimentada por bateria</em></div>

![Figura 3.3-7: pinagem da variante BGA112 alimentada por 3,3 V](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-7: pinagem da variante BGA112 alimentada por 3,3 V</em></div>
<!-- /BGA-ONLY -->

### 3.4. Principais recursos de hardware { #34-major-hardware-features }

- Duas famílias de alimentação relevantes para o projeto: variantes alimentadas por bateria e variantes alimentadas externamente por 3,3 V regulados.
- Encapsulamentos QFN68L, QFN80L<!-- BGA-ONLY --> e BGA112<!-- /BGA-ONLY -->, cada um com requisitos próprios de pinagem, padrão de pads, estêncil e processo de fabricação de PCB.
- Suporte a displays SPI/QSPI, 8080, RGB/DPI, EPD e JDI, conforme o dispositivo e a pinagem exatos; consulte a Seção 3.1 para o escopo de MIPI-DSI.
- Opções de armazenamento e boot por memória integrada ao encapsulamento e armazenamento externo MPI/SDIO.
- Os layouts de RF, cristal, áudio, câmera, display, USB, SDIO e alimentação exigem revisão conjunta do esquemático e da PCB desde o início.

### 3.5. Aplicações típicas { #35-typical-applications }

O SF32LB57x é adequado para produtos que precisam de recursos de IA, câmera ou display avançado, além de conectividade Bluetooth, em um formato compacto:

- Relógios inteligentes, relógios esportivos e outros dispositivos vestíveis
- Terminais inteligentes portáteis e controles para casas inteligentes
- Sensores com recursos de IA e dispositivos de inferência na borda
- Produtos Bluetooth com câmera
- Dispositivos com displays que usem interfaces SPI/QSPI, RGB/DPI, 8080, EPD ou JDI, conforme o dispositivo e a topologia do controlador selecionados
- Produtos que precisam de encapsulamentos QFN<!-- BGA-ONLY --> ou BGA<!-- /BGA-ONLY --> compactos, com muitas opções de GPIO e armazenamento

## 4. Projeto em resumo { #4-design-at-a-glance }

### 4.1. Arquitetura de hardware { #41-hardware-architecture }

<div align="center"><em>Tabela 4.1-1: projeto em resumo</em></div>

<div align="center" markdown>

| Item de projeto | Implementação típica |
|:----------------|:--------------------|
| Famílias de alimentação | Variantes alimentadas por bateria ou por 3,3 V regulados externamente; não misture os esquemáticos de alimentação |
| Encapsulamentos | QFN68L, QFN80L<!-- BGA-ONLY -->, BGA112<!-- /BGA-ONLY -->; selecione pinagem, POD, padrão de pads e estêncil conforme o número de peça comercial exato |
| Processo de PCB | Confirme com o fornecedor de PCB/montagem os requisitos dos pads QFN, das vias do pad exposto e do estêncil<!-- BGA-ONLY -->; para BGA, confirme antecipadamente também a viabilidade do fanout e do processo<!-- /BGA-ONLY --> |
| Clocks | Cristal principal de 48 MHz e cristal RTC de 32,768 kHz |
| RF | Caminho de antena de 50 Ω, rede de casamento π próxima ao chip e filtragem local da alimentação de RF |
| Display | SPI/QSPI, 8080, RGB/DPI, EPD ou JDI, conforme os recursos do dispositivo e a pinagem; consulte a Seção 3.1 para o escopo de MIPI-DSI |
| Armazenamento | Memória integrada ao encapsulamento e opções externas MPI/SDIO; defina a mídia de boot antes do layout |
| Áudio | Entrada/saída de áudio analógico, PDM/I2S, polarização de microfone, referência de áudio e opções de amplificador de potência externo (PA) |
| Câmera | Interface DCMI; roteie e alimente como uma interface de alta velocidade sensível a ruído |
| Depuração e produção | DBG-UART, SWD, configuração de boot, PA00/PA01/PA34, trilhos de alimentação e pontos de teste de produção |

</div>

### 4.2. Fluxo de projeto de hardware { #42-hardware-design-flow }

<div align="center"><em>Tabela 4.2-1: fluxo de projeto de hardware</em></div>

<div align="center" markdown>

| Passo | Decisão de projeto | Seções principais |
|:------|:------------------|:------------------|
| 1 | Confirme o número de peça comercial exato, a família de alimentação, o encapsulamento e a pinagem | Visão geral do dispositivo |
| 2 | Defina o armazenamento de boot, a interface de display, o uso da câmera, o acesso de depuração e as metas de baixo consumo | Projeto em resumo, Projeto do esquemático |
| 3 | Defina a árvore de alimentação, a estratégia de carga/OVP, os componentes BUCK/LDO e o comportamento de inicialização | Sistema de alimentação |
| 4 | Selecione fontes de clock, topologia de RF, armazenamento, display, áudio, câmera e interfaces gerais | Geração de clock, RF, Interfaces de usuário, Armazenamento e conectividade |
| 5 | Revise o footprint, o stack-up, o fanout e os layouts de RF, cristais, USB, SDIO, display, áudio e alimentação | Diretrizes de layout de PCB |
| 6 | Conclua a autoavaliação do cliente e arquive, antes do EVT, evidências do esquemático, layout, AVL, DRC/ERC, impedância, alimentação, RF e produção | Autoavaliação do projeto pelo cliente |

</div>

### 4.3. Como usar este guia { #43-how-to-use-this-guide }

Use este guia na ordem das revisões da placa. Primeiro, confirme o número de peça comercial exato do SF32LB57x e a família de alimentação, fixe o encapsulamento e o processo de PCB e consulte o datasheet junto com o esquemático do sistema mínimo correspondente na Seção 5.1. Em seguida, defina a árvore de alimentação, a mídia de boot e os acessos necessários para depuração e download; depois, atribua as funções de E/S com base na tabela de multiplexação de pinos e nos requisitos do produto. Com o sistema mínimo definido, revise clocks, RF, display, armazenamento, áudio, câmera, interfaces gerais, layout de PCB e acesso de produção. A Seção 5 é a referência para o esquemático, a Seção 6 para a implementação da PCB e a Seção 7 para a autoavaliação do cliente antes da liberação do esquemático ou do layout.

### 4.4. Pacote de evidências para revisão { #44-review-evidence-pack }

Antes do EVT, arquive as versões do datasheet, do manual do usuário e dos projetos de referência; o PDF do esquemático; o stack-up da PCB; o relatório de impedância; os relatórios DRC/ERC; a árvore de alimentação; o orçamento de baixo consumo; os caminhos de carga e boot; a lista de pontos de teste de produção; e capturas de tela específicas de RF, cristais, USB, SDIO, display, câmera, áudio, GPADC e fanout do encapsulamento.

## Continuação do guia de projeto { #continue-the-design-guide }

O guia completo continua nas páginas abaixo. Cada uma cobre uma etapa do processo de projeto e pode ser acessada a partir daqui.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Sistema mínimo e alimentação](SF32LB57x_schematic_system_power.md)__ — compatibilidade entre encapsulamento e família de alimentação, straps de boot, mídia de boot, acesso de depuração/download, árvore de alimentação, carga/OVP, BUCK, trilhos de baixo consumo e modos de operação
- :fontawesome-solid-wave-square: __[Clock, RF e interfaces de usuário](SF32LB57x_schematic_clock_rf_interfaces.md)__ — cristais de 48 MHz e 32,768 kHz, casamento de RF e caminho da antena, display, toque/retroiluminação, áudio, câmera, botões e motor
- :fontawesome-solid-database: __[Armazenamento e fabricação](SF32LB57x_schematic_storage_mfg.md)__ — armazenamento, boot, GPIO, tabelas de pinagem IO MUX e matriz, UART/I2C/SPI/SDIO/USB/CAN/GPADC, gravação de produção, calibração e acesso ao gabarito de teste
- :fontawesome-solid-list-check: __[Checklist do esquemático](SF32LB57x_schematic_checklist.md)__ — checklist item a item para revisão do esquemático (Seção 5.8)
- :fontawesome-solid-microchip: __[Diretrizes de layout de PCB](SF32LB57x_pcb_layout.md)__ — stack-up, restrições críticas de PCB, roteamento de alimentação/cristal/RF/analógico/áudio/alta velocidade, EMI/ESD/EOS e figuras de referência
- :fontawesome-solid-list-check: __[Checklist de layout de PCB](SF32LB57x_pcb_layout_checklist.md)__ — checklist item a item para revisão do layout de PCB (Seção 6.10)
- :fontawesome-solid-book-open: __[Checklist de revisão do projeto e referências](SF32LB57x_review_and_reference.md)__ — autoavaliação do projeto pelo cliente, documentos relacionados, apêndices e histórico de revisões

</div>
