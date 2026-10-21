---
icon: lucide/cpu
description: "Visão geral da família SF32LB5xx: núcleos Cortex-M33 heterogêneos, Bluetooth, gráficos ePicasso e IA de borda, com tabela comparativa e guia rápido de seleção de chips."
tags:
  - Hardware
  - Chip
---

# Família SF32 { #sf32-family }

## Introdução { #introduction }

A família **SF32**, especialmente a série **SF32LB5xx**, reúne microcontroladores de 32 bits altamente integrados e de consumo ultrabaixo, desenvolvidos pela SiFli Technologies para produtos AIoT e dispositivos vestíveis alimentados por bateria.

A família **SF32** foi concebida para preencher a lacuna entre os microcontroladores tradicionais e os processadores de aplicação. Em uma arquitetura compacta System-in-Package (SiP), os dispositivos combinam processamento de sensores com baixo consumo de energia, conectividade sem fio, aceleração gráfica, processamento multimídia e memória integrada de grande capacidade. A família é voltada a produtos como smartwatches, rastreadores de atividade, displays inteligentes, dispositivos médicos portáteis e acessórios conectados com recursos de processamento na borda.

A série **LB** (Low-Power Bluetooth) é a primeira da família SF32; outras séries voltadas a aplicações específicas estão previstas para o futuro.

## Etapas do desenvolvimento de hardware { #hardware-workflows }

<div class="grid cards" markdown>

- :lucide-route:{ .uf-hw-icon .uf-hw-blue } **Planejar um produto**

    Siga um fluxo contínuo, dos requisitos do produto e da seleção do dispositivo à validação da placa e à preparação para produção.

    [Planejar um produto :material-arrow-right:](product-planning.md){ .uf-hw-link-blue }

- :lucide-list-checks:{ .uf-hw-icon .uf-hw-purple } **Seletor de produtos SF32**

    Compare as famílias SF32, escolha um chip ou módulo e identifique a placa de desenvolvimento adequada para as primeiras validações.

    [Montar uma lista de candidatos :material-arrow-right:](../product-selector.md){ .uf-hw-link-purple }

- :lucide-clipboard-check:{ .uf-hw-icon .uf-hw-green } **Projeto para produção**

    Avance do componente selecionado para o esquemático, o layout, a lista de materiais, os arquivos CAD, os checklists e as evidências de bring-up.

    [Planejar as etapas para produção :material-arrow-right:](../../hardware/design-for-production.md){ .uf-hw-link-green }

</div>

## Principais recursos { #key-features }

1. **Arquitetura heterogênea multicore**

    Os microcontroladores SF32LB usam uma arquitetura heterogênea multicore baseada em Arm Cortex-M33 STAR-MC1, que equilibra o processamento de aplicações de alto desempenho com a operação em segundo plano de consumo ultrabaixo. Conforme o dispositivo, a arquitetura pode incluir um ou mais processadores de aplicação, além de processadores dedicados de baixo consumo para conectividade Bluetooth, processamento de sensores e funções do sistema que permanecem ativas.

    !!! info "Processador STAR-MC1"
        STAR-MC1 é um IP configurável de CPU Armv8-M Mainline da Arm China, usado como processador de aplicação da classe Cortex-M33 em dispositivos SF32 compatíveis. Firmware, middleware, portas de RTOS e ferramentas voltados ao Cortex-M33 continuam relevantes, desde que sejam feitas as adaptações normais específicas de cada dispositivo. As configurações CU, SP e SE diferem principalmente em cache, TCM, XIPU e recursos de TrustZone; as instruções personalizadas da Arm/CDE e a interface de coprocessador são opcionais. Conforme o contexto, a documentação da SiFli pode usar ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33***.

        Para orientações específicas sobre configuração, TCM, caches, CDE, coprocessadores e medições representativas de desempenho, consulte [Análise aprofundada da arquitetura STAR-MC1](../../learn/architecture/star-mc1.md).


2. **Conectividade sem fio de consumo ultrabaixo**

    A série SF32LB integra no próprio chip conectividade Bluetooth Low Energy (BLE) ou Bluetooth de modo duplo (BT/BLE).

    Os modos Bluetooth e o desempenho de RF variam conforme o dispositivo. Para o número de peça exato, consulte no datasheet e no projeto de referência validado os modos compatíveis, as configurações de potência de transmissão, a sensibilidade de recepção e o consumo de corrente; o posicionamento no nível da família não substitui esses valores.

3. **Mecanismo gráfico e de display com aceleração por hardware**

    Todos os microcontroladores SF32LB integram o ePicasso, um mecanismo gráfico 2.5D desenvolvido pela própria SiFli, e um controlador de display independente.

    A aceleração por hardware reduz significativamente a carga da CPU em tarefas gráficas comuns, como:

    * Mesclagem alfa
    * Redimensionamento de imagens
    * Rotação e transformação
    * Composição de camadas
    * Renderização da interface do usuário

    Na família SF32LB, são usadas as seguintes interfaces e tecnologias de display. O suporte varia conforme o dispositivo; consulte o código exato do componente e não presuma que todos aceitam todos os itens da lista.

    * SPI / DSPI / QSPI
    * Interface MCU 8080
    * RGB / DPI
    * MIPI DSI
    * EPD
    * JDI (para displays Memory-in-Pixel)

    Nos modelos compatíveis com as interfaces de display correspondentes, a aceleração por hardware pode ser usada com frameworks gráficos como LVGL para criar interfaces fluidas e responsivas em displays TFT, AMOLED, e-paper (EPD) e Memory-in-Pixel (MiP).

4. **IA de borda e aceleração neural**

    Alguns dispositivos SF32 integram aceleradores de hardware dedicados a cargas de trabalho de aprendizado de máquina, processamento multimídia e fusão de sensores.

    Os recursos podem incluir:

    * Aceleração de redes neurais
    * Processamento de áudio
    * Reconhecimento de voz
    * Interfaces de câmera (DVP e SPI)
    * Fusão de sensores e algoritmos biométricos

    Esses recursos permitem executar inferências de IA com baixa latência no próprio dispositivo, reduzindo o consumo de energia e a dependência da nuvem.

5. **Memória System-in-Package (SiP) de alta densidade**

    Para atender a aplicações com uso intenso de gráficos e IA, os dispositivos SF32 integram arquiteturas de cache de instruções e de dados otimizadas para executar código com alto desempenho a partir de memória externa.

    As memórias disponíveis no encapsulamento podem incluir:

    * Até 256 Mb de NOR Flash
    * Até 512 Mb de PSRAM

    Apenas alguns códigos de peça incluem NOR Flash ou PSRAM no mesmo encapsulamento. Uma configuração SiP pode reduzir a quantidade de memórias montadas separadamente e o roteamento associado, mas o tipo, a capacidade e a interface da memória, o consumo e os pinos acessíveis externamente dependem do SKU exato. Antes de fechar a placa, consulte o datasheet e o mapa de pinos do encapsulamento correspondente.

## Comparação entre microcontroladores SF32 { #sf32-microcontroller-comparison }

<div align="center"><em>Comparação entre microcontroladores SF32</em></div>

A tabela resume os recursos de cada família e não garante que todos os SKUs ofereçam tudo o que está listado. As interfaces e suas quantidades podem variar conforme o código do componente, o encapsulamento ou a configuração; confirme no datasheet do SKU escolhido.

<div align="center" markdown>

| Recurso | SF32LB52x | SF32LB55x | SF32LB56x | SF32LB57x | SF32LB58x |
|----------|----------|----------|----------|----------|----------|
| Posicionamento | Entrada | Intermediário, somente BLE | Avançado | Computação aprimorada | Topo de linha |
| CPU de aplicação | Cortex-M33 @ 240 MHz | Cortex-M33 @ 240 MHz | Cortex-M33 @ 240 MHz | 2× Cortex-M33 @ 240 MHz | 2× Cortex-M33 @ 240 MHz |
| CPU de baixo consumo | Cortex-M33 @ 24/48 MHz, controlador Bluetooth dedicado | Cortex-M33 @ 48 MHz, programável pelo usuário | Cortex-M33 @ 48/96 MHz, programável pelo usuário | Cortex-M33 @ 24 MHz, controlador Bluetooth dedicado | Cortex-M33 @ 48/96 MHz, programável pelo usuário |
| SRAM interna | 576 KB | 1.312 KB | 960 KB | 592 KB | 3,7 MB |
| Bluetooth | BT Classic + BLE | BLE | BT Classic + BLE | BT Classic + BLE | BT Classic + BLE |
| Acelerador gráfico | 2.5D<br>ePicasso 2.0 Lite | 2.5D<br>ePicasso 1.0 | 2.5D<br>ePicasso 2.0 | 2.5D<br>ePicasso 3.0 + eZip 3.0 | 2.5D + gráficos vetoriais<br>ePicasso 2.0 + Vivante GCNanoUltraV |
| Suporte a displays | SPI / DSPI / QSPI / 8080 / EPD / JDI | SPI / DSPI / QSPI / 8080 / JDI / RGB / MIPI | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI |
| ADC de áudio | 1× | Não disponível | 1× | 2× | 2× |
| DAC de áudio | 1× | Não disponível | 1× | 1× | 2× |
| Interfaces de áudio PDM | 1× | 1–2×* | 2× | 2× | 2× |
| Interfaces de áudio I²S | 1× | 1–2×* | 1× | 2× | 3× |
| USB | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 HS |
| CAN | Não disponível | Não disponível | 1× | 2× | 2× |
| PSRAM integrada ao encapsulamento | Até 16 MB | Até 16 MB + 2 MB | Até 16 MB | Até 48 MB | Até 32 MB + 32 MB |
| NOR Flash integrada ao encapsulamento | Até 4 MB | Até 8 MB | Até 1 MB | Até 32 MB | Até 8 MB |
| Número de GPIOs | 44 / 45 | 49 / 95 / 113* | 44 / 120 | 46 / 47 / 58; até 6 E/S adicionais no BGA112* | 154 |
| Opções de encapsulamento | QFN68 | QFN68 / BGA145 / BGA169 | QFN68 / BGA175 | QFN68 / QFN80 / BGA112 | BGA256 |
| Dimensões do encapsulamento (C × L) | 7 × 7 mm | 7 × 7 mm | QFN: 7 × 7 mm<br>BGA: 6,5 × 6,1 mm | QFN68: 7 × 7 mm<br>QFN80: 8 × 8 mm<br>BGA: 5,4 × 4,4 mm | 8,5 × 6,5 mm |
| Alimentação | 3,2–4,7 V (520/3/5/7)<br>2,97–3,63 V (52B/E/G/J)<br>1,8 V (52D) | 1,71–3,63 V | 1,71–3,63 V | 3,0–4,7 V<br>2,97–3,63 V | 1,71–3,63 V |

</div>

**Nota sobre o SF32LB55x:** o número de interfaces de áudio depende do código do componente: as variantes SF32LB551/553/555 têm uma interface PDM e uma I²S cada; o SF32LB557VD3A6 tem duas de cada. O resumo de encapsulamentos do [datasheet mais recente do SF32LB55x (V1.7.2)](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) indica 119 GPIOs para BGA169 (71 HCPU + 48 LCPU), mas a tabela detalhada de produtos da mesma ficha atribui ao SF32LB557 71 HCPU + 42 LCPU = 113. O [guia de modelos de chips da SiFli](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) também informa 71 + 42 = 113 para o SF32LB557VD3A6. A SiFli não explica essa inconsistência interna no datasheet; esta tabela adota o valor específico de 113 GPIOs. Antes de definir a pinagem, confirme o SKU exato no datasheet e na tabela de pinos. Cada interface PDM pode conectar até dois microfones digitais; quantidade de interfaces não é quantidade de microfones.

**Nota sobre a NOR integrada no SiP do SF32LB55x:** O máximo de 8 MB desta tabela inclui a configuração SS6600A8, documentada separadamente: dois dispositivos QSPI-NOR de 4 MB configurados como um único dispositivo OSPI-NOR de 8 MB. Os códigos de pedido com prefixo SF32 listados para a família SF32LB55x têm até 4 MB de NOR integrada no SiP. Confirme o modelo exato.

**Nota sobre o BGA112 do SF32LB57x:** Esta nota se aplica somente ao BGA112. O SF32LB57x tem MPI1, MPI2 e MPI3 internos; as posições de MPI* no código do componente são explicadas na [convenção de nomenclatura SF32](SF32_namingrule.md). Em qualquer uma destas configurações de memória SiP, os pinos MPI2 e MPI3 não ficam acessíveis externamente, restando exatamente 58 GPIOs: (1) uma PSRAM integrada em cada um dos MPI1 e MPI2; (2) uma PSRAM de 256 Mb integrada em MPI2; ou (3) uma NOR Flash integrada em MPI3. O `SF32LB57GVD776` corresponde ao caso (3): o segundo `7` no código final `776` indica que um dispositivo interno usa MPI3, por isso há apenas 58 GPIOs. Nas demais configurações BGA112, as seis E/S adicionais podem ser usadas para MPI3 ou como saídas estáticas GP configuradas por pull-up ou pull-down; elas não são GPIOs de atribuição livre. Por exemplo, `58 + 6` em `SF32LB57ZVN7N6` significa 58 GPIOs disponíveis mais seis pinos que podem ser usados para MPI3 ou como saídas estáticas. QFN68 e QFN80 não estão sujeitos a esta restrição do BGA112: oferecem apenas a quantidade de GPIO indicada, sem opção adicional para MPI3 ou saída estática. Consulte a [página do SF32LB57x](../chips/SF32LB57x.md) e o datasheet do SKU.

**Esclarecimento sobre a quantidade de GPIOs do SF32LB58x:** O [datasheet DS5801 V1.8.3](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p8p3.pdf) e a comparação da família publicada pela SiFli especificam 154 GPIOs no total (HPSYS: 94; LPSYS: 60). O [guia de modelos de chip](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html), em separado, lista HCPU: 94 e LCPU: 66, cuja soma é 160 e diverge do total do datasheet. Esta comparação segue o datasheet; antes de atribuir os pinos, confirme a disponibilidade na tabela de pinos do encapsulamento do SKU exato.

## Como escolher o SF32 adequado { #choosing-the-right-sf32 }

A família SF32LB5xx atende a dispositivos conectados alimentados por bateria, desde produtos Bluetooth otimizados em custo até sistemas com recursos avançados de gráficos e IA. Seus integrantes compartilham uma base de SDK, mas podem diferir na configuração dos processadores, nos periféricos, no mapa de memória, no encapsulamento e na atribuição de pinos. A migração pode exigir ajustes no código de inicialização, nos drivers, no script do linker ou na configuração de partições, no multiplexamento de pinos e nas opções do SDK; valide o resultado no dispositivo de destino.

Ao selecionar um dispositivo, considere estes requisitos principais:

* Conectividade Bluetooth (BLE ou BT/BLE de modo duplo)
* Interface e resolução do display
* Recursos de áudio e multimídia
* Capacidade de memória
* Quantidade de GPIOs necessária
* Desempenho gráfico
* Cargas de trabalho de IA e processamento de sensores
* Metas de consumo de energia

<div align="center"><em>Guia rápido de seleção</em></div>

<div align="center" markdown>

| Escolha ... | Se a aplicação exigir ... | Aplicações típicas |
| : ---      | : ---  | : --- |
| SF32LB52x | • Bluetooth de modo duplo (BT/BLE)<br>• ADC e DAC de áudio integrados<br>• Carregamento integrado de bateria Li-ion<br>• Até 45 GPIOs<br>• Resoluções de display de até 512 × 512<br>• Solução compacta e econômica<br> | • Smartwatches e pulseiras fitness de entrada<br>• Módulos Bluetooth e adaptadores sem fio<br>• Acessórios de áudio Bluetooth<br>• Sensores inteligentes e dispositivos vestíveis<br>• Etiquetas eletrônicas de prateleira e crachás inteligentes<br>• Impressoras portáteis de etiquetas<br>• Displays para e-bikes e e-scooters<br>• Dispositivos HMI básicos baseados em LVGL |
| SF32LB55x | • Bluetooth Low Energy (BLE)<br>• Displays MIPI DSI em modo comando<br>• SRAM de grande capacidade para algoritmos de processamento de sensores<br>• Mais de 45 GPIOs<br>• Recursos ampliados de processamento de baixo consumo | • Pulseiras fitness e rastreadores de atividade<br>• Computadores esportivos e de ciclismo<br>• Dispositivos vestíveis com muitos sensores<br>• Dispositivos de monitoramento de saúde<br>• Periféricos BLE alimentados por bateria |
| SF32LB56x | • Bluetooth de modo duplo (BT/BLE)<br>• Interfaces de display RGB/DPI<br>• ADC e DAC de áudio integrados<br>• Resoluções de display de até 1024 × 600<br>• Wi-Fi externo por SDIO<br>• Maior capacidade de GPIO | • Smartwatches com interfaces avançadas<br>• Sistemas HMI conectados<br>• Dispositivos médicos e de saúde<br>• Dispositivos portáteis industriais<br>• Instrumentos portáteis<br>• Displays avançados para e-bikes e e-scooters |
| SF32LB57x | • Bluetooth de modo duplo (BT/BLE), BLE Audio e LE Long Range<br>• Gráficos ePicasso 3.0/eZip 3.0 com interfaces RGB<br>• Entrada de câmera DCMI e ADC/DAC de áudio de alta fidelidade integrados<br>• Resoluções de display de até 1024 × 600<br>• Delegação de tarefas ao PTM para E/S determinística ou temporização personalizada de periféricos<br>• Até 58 GPIOs de uso geral; o BGA112 acrescenta até 6 E/S para MPI3 ou saídas estáticas GP configuradas por pull-up/pull-down, conforme a configuração SiP*<br>• Interfaces de armazenamento SD/SDIO/eMMC | • Smartwatches compactos e avançados<br>• HMIs com muitos recursos de display e dispositivos de e-paper<br>• Produtos Bluetooth com câmera<br>• Dispositivos portáteis de áudio e gravação<br>• Painéis de controle para casas inteligentes |
| SF32LB58x | • Bluetooth de modo duplo (BT/BLE)<br>• Renderização gráfica avançada, incluindo gráficos vetoriais<br>• Displays MIPI DSI em modo comando ou vídeo<br>• Resoluções de display de até 1280 × 800<br>• Configurações de memória de grande capacidade<br>• Alta densidade e quantidade de GPIOs<br>• Wi-Fi externo por SDIO<br>• Cargas de trabalho de IA de borda e aprendizado de máquina | • Smartwatches premium<br>• Dispositivos vestíveis para esportes e atividades ao ar livre<br>• Computadores avançados para ciclismo<br>• Displays inteligentes e painéis conectados<br>• Dispositivos vestíveis com IA<br>• Sistemas de IA de borda e fusão de sensores |

</div>

## Compatibilidade de software na família { #software-compatibility-across-the-family }

A plataforma SF32 oferece uma base comum de software e SDK. Ainda assim, a configuração dos processadores, os periféricos, o mapa de memória, o encapsulamento e a atribuição de pinos podem variar. A migração pode exigir ajustes no código de inicialização, nos drivers, no linker ou nas partições, no multiplexamento de pinos e na configuração do SDK, além de validação no hardware de destino.

Avalie o reaproveitamento do software e o esforço de migração junto com os requisitos de desempenho, memória, display e conectividade. Não presuma que dispositivos da mesma família são compatíveis pino a pino ou executam o firmware sem alterações.

## Perguntas frequentes { #frequently-asked-questions }

**Qual SF32 serve para um smartwatch ou pulseira Bluetooth de baixo custo?**
O SF32LB52x é a opção de entrada: Bluetooth dual-mode (BT clássico + BLE), ADC/DAC de áudio e carregamento de Li-ion integrados, até 45 GPIOs e encapsulamento QFN68 de 7 × 7 mm.

**Quais SF32 suportam Bluetooth clássico, e não apenas BLE?**
SF32LB52x, SF32LB56x, SF32LB57x e SF32LB58x suportam BT clássico + BLE. O SF32LB55x suporta apenas BLE.

**Quais SF32 suportam displays MIPI DSI?**
SF32LB55x e SF32LB58x suportam displays MIPI. SF32LB52x, 56x e 57x usam SPI, QSPI, 8080 e JDI/EPD, e os 56x/57x também RGB.

**Quais SF32 oferecem entrada de câmera ou CAN?**
O SF32LB57x adiciona entrada de câmera DCMI. CAN está disponível no SF32LB56x (1×) e nos SF32LB57x e SF32LB58x (2×).

**Os membros da família SF32 são compatíveis em pinos?**
Não. Compartilham a base do SDK, mas núcleos, periféricos, mapas de memória, encapsulamentos e pinagens diferem; portar exige ajustes em drivers, multiplexação de pinos e configuração, com validação no dispositivo de destino.

## Links de referência { #reference-links }

- [Site oficial da SiFli](https://www.sifli.com/)
- [Wiki da SiFli](https://wiki.sifli.com/)
- [Documentação de software da SiFli](https://docs.sifli.com/)
- [OpenSiFli no GitHub](https://github.com/OpenSiFli/)
- [Loja oficial da SiFli no Taobao](https://sifli.taobao.com/)
