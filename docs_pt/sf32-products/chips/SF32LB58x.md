---
icon: lucide/microchip
description: "SF32LB58x: família de MCUs AIoT topo de linha, voltada a produtos conectados com alta demanda de recursos gráficos, display, memória e periféricos."
tags:
    - Hardware
    - Chip
---

# SF32LB58x { #sf32lb58x }

## Visão geral { #overview }

A série SF32LB58x ocupa a categoria topo de linha da família SF32LB5x. É voltada a produtos AIoT alimentados por bateria que exigem recursos gráficos avançados, grande capacidade de memória, Bluetooth de modo duplo, diversas interfaces de áudio e display e muitos GPIOs, sem exigir a migração para uma plataforma maior com processador de aplicação.

SF32LB58x reúne três núcleos Arm Cortex-M33 STAR-MC1[^1] em uma arquitetura heterogênea. HCPU e ACPU são os núcleos de alto desempenho, com frequência de até 240 MHz; LCPU opera até 96 MHz e atende a tarefas sensíveis ao consumo. HCPU cuida do controle do sistema, da interface do usuário e do processamento geral da aplicação; ACPU pode assumir tarefas de DSP de áudio; LCPU é indicado para Bluetooth LE, aquisição de dados de sensores e outras tarefas de baixo consumo. Com uma divisão adequada, o firmware pode desligar HCPU em cenários compatíveis, mas a economia real depende da aplicação e do firmware.

Segundo a documentação da SiFli, o SF32LB58x tem 3.744 KB de SRAM no chip e, conforme o SKU, diferentes combinações de Flash NOR, OPI-PSRAM e HPI-PSRAM integradas ao encapsulamento. A família também oferece interfaces de display como MIPI DSI, aceleração de gráficos vetoriais, USB 2.0 High-Speed e um encapsulamento BGA com grande quantidade de E/S. Vale avaliar SF32LB58x em projetos que precisam de uma interface gráfica de alta resolução, muitos recursos gráficos, Wi-Fi externo via SDIO ou capacidade de processamento e memória para IA de borda ou fusão de sensores.

[^1]: STAR-MC1 é um IP configurável de CPU embarcada Armv8-M Mainline da Arm China. Em dispositivos SF32 compatíveis, a SiFli o documenta como um processador de aplicação Arm Cortex-M33 STAR-MC1. Seu modelo de software da classe Cortex-M33 facilita a reutilização de firmware, middleware, portas de RTOS e ferramentas existentes para Cortex-M33, sujeita ao trabalho normal de integração específico do dispositivo. As configurações CU, SP e SE diferem principalmente em cache, TCM, XIPU e TrustZone; as instruções personalizadas Arm/CDE e a interface de coprocessador são recursos opcionais que devem ser verificados para o componente SF32 exato. A documentação da SiFli pode usar ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33***, conforme o contexto.

## Aplicações { #applications }

**SF32LB58x é indicado para** produtos conectados de alto padrão que precisam de framebuffers maiores, displays mais avançados, mais memória e maior densidade de interfaces de alta velocidade, como:

- Relógios inteligentes premium e relógios esportivos
- HMIs vestíveis de alta resolução
- Ciclocomputadores e painéis inteligentes
- Terminais médicos e industriais portáteis
- Acessórios com Bluetooth e Wi-Fi externo
- Sistemas de IA de borda e fusão de sensores
- Controladores conectados centrados em display

Escolha SF32LB58x quando o projeto exigir uma ou mais destas capacidades:

- Resolução de display igual ou superior a 1024 × 600
- Suporte a displays MIPI DSI em modo comando ou modo vídeo
- Gráficos vetoriais, animações mais elaboradas ou recursos de interface maiores
- Wi-Fi externo via SDIO
- Grande capacidade de memória para framebuffer, áudio, gráficos ou modelos de IA
- Muitos GPIOs ou várias interfaces externas de alta velocidade

## Recursos de desenvolvimento { #development-resources }

[Resumo do produto]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[Ficha técnica]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[Manual do usuário]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[Guia de projeto original (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html
[Nota de aplicação de hardware (fonte GitHub)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[Guia de projeto de hardware (μForge)]: ../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md
[Comprar amostras]: https://sifli.taobao.com/
[Comprar kits de desenvolvimento]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumo do produto]__
- :fontawesome-solid-file-pdf: __[Ficha técnica]__
- :fontawesome-solid-file-pdf: __[Manual do usuário]__
- :fontawesome-solid-file-lines: __[Guia de projeto original (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Nota de aplicação de hardware (fonte GitHub)]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware (μForge)]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento]__

</div>

---

## Características e especificações { #features-and-specs }

### Processamento e memória { #compute-and-memory }

- 3 núcleos Arm Cortex-M33 STAR-MC1: HCPU e ACPU até 240 MHz; LCPU até 96 MHz
- 3.744 KB de SRAM no chip
- Opções de Flash NOR integrada ao encapsulamento, de 1 MB a 8 MB no total, conforme o SKU
- Opções de OPI-PSRAM e HPI-PSRAM integradas ao encapsulamento; HPI-PSRAM de até 2 × 32 MB, conforme o SKU
- NOR Flash externa ou SPI NAND podem ser conectadas por MPI3/MPI4; SD NAND, eMMC, cartões SD ou Wi-Fi externo podem ser conectados por SDIO. As combinações disponíveis dependem da seleção das interfaces e da alocação dos pinos.

### Gráficos, display e IA { #graphics-display-and-ai }

- Acelerador gráfico 2D/2.5D ePicasso 2.0
- Mecanismo gráfico vetorial Vivante GCNanoUltraV
- Acelerador eZip 2.0 para descompressão de gráficos sem perda
- Codificação e decodificação JPEG/MJPEG por hardware, com recorte e redimensionamento de imagens
- Acelerador matricial de redes neurais para cargas de trabalho TinyML
- Resoluções de display de até 1280 × 800
- Suporte a displays MIPI DSI em modo comando e modo vídeo
- Interfaces de display SPI, DSPI, QSPI (incluindo SPI para telas de papel eletrônico), MCU8080, JDI, RGB/DPI (RGB888 ou RGB565) e MIPI DSI
- Suporte a dois displays com conteúdos diferentes usando MIPI DSI em conjunto com SPI, DSPI ou QSPI
- Adequado a cargas de trabalho locais de IA de borda, aprendizado de máquina e fusão de sensores

### Áudio e conectividade sem fio { #audio-and-wireless-connectivity }

- Bluetooth 5.3 de modo duplo
- Suporte a Bluetooth Classic e Bluetooth LE
- Conectividade Wi-Fi externa via SDIO
- 2 ADCs de áudio integrados
- 2 DACs de áudio integrados
- 2 interfaces PDM, cada uma compatível com até dois microfones digitais. A quantidade de interfaces não equivale à quantidade de microfones; as conexões efetivamente utilizáveis também dependem da multiplexação dos pinos e do roteamento da placa.
- 3 interfaces I2S: I2S1 é somente de entrada; I2S2 e I2S3 aceitam entrada e saída. Todas operam apenas no modo mestre.
- USB 2.0 High-Speed em modo host/dispositivo

### Integração do sistema { #system-integration }

- PMU integrada com 2 saídas BUCK e 3 saídas LDO
- O PMIC SF30147C opcional pode ser usado em arquiteturas de alimentação para produtos vestíveis
- O encapsulamento BGA256 atende a projetos MCU de alta densidade que reúnem display, armazenamento, áudio e conectividade
- A SRAM no chip, as opções de PSRAM integrada ao encapsulamento e as interfaces de display atendem a projetos com alta demanda de gráficos e memória

### Periféricos e E/S { #peripherals-and-ios }

**Nota sobre a contagem de GPIO:** O [guia atual de modelos de chips da SiFli](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) lista 94 GPIOs HCPU e 66 GPIOs LCPU, totalizando 160 para os modelos SF32LB58x ali apresentados. Um datasheet anterior discrimina 94 GPIOs HPSYS e 60 GPIOs LPSYS, além de 6 saídas AON GPO (154 GPIOs + 6 AON GPO). Como as fontes classificam essas seis saídas sempre ligadas de forma diferente, essa diferença de categorias não comprova, por si só, que o total de pinos do encapsulamento seja diferente nem significa que os 160 pinos possam ser livremente configurados como GPIO. O [índice de produtos da SiFli](https://wiki.sifli.com/silicon/index.html) aponta para o datasheet vigente V1.8.6. Antes do layout da PCB, confira nesse documento a quantidade de GPIOs e a tabela de funções dos pinos do modelo exato. A [FAQ de GPIO da SiFli](https://wiki.sifli.com/en/faq/mcu/gpio.html) trata PBR como um banco de E/S de baixo consumo separado; não o some ao total HCPU/LCPU, a menos que a fonte o inclua expressamente.

- 160 GPIOs (94 HCPU + 66 LCPU, conforme o guia atual de modelos de chips)
- 2 interfaces CAN
- 2 interfaces SDIO
- Interface de depuração SWD
- 6 interfaces UART selecionáveis para saída de depuração
- RTC, watchdog, despertar por GPIO, despertar por PBR, PWM, I2C, SPI e interfaces analógicas de uso geral
- Encapsulamento BGA256 para projetos de alta densidade

### Alimentação e encapsulamento { #power-supply-and-package }

- Faixa de alimentação: 1,71 V a 3,63 V
- Encapsulamento BGA256 de 6,5 × 8,5 × 0,94 mm, passo de 0,4 mm
- PCB HDI obrigatória; recomenda-se a estrutura 6HDI-2 para projetos de produção

## Variantes da família { #family-variants }

O guia atual de modelos de chips da SiFli lista seis códigos de pedido SF32LB58x, todos em BGA256, com as configurações de memória integrada ao encapsulamento mostradas abaixo. Confirme o código exato no datasheet vigente e na lista de fornecedores aprovados (AVL), pois as configurações e a disponibilidade podem mudar.

<div align="center"><em>Códigos de pedido SF32LB58x e memória integrada ao encapsulamento</em></div>

<div align="center" markdown>

| Código de pedido | Encapsulamento | Memória integrada ao encapsulamento |
| :--- | :--- | :--- |
| SF32LB580VNN36 | BGA256 | Flash NOR de inicialização de 1 MB; sem memória integrada ao encapsulamento em MPI1 ou MPI2 |
| SF32LB581VCN36 | BGA256 | Flash NOR de inicialização de 1 MB + OPI-PSRAM de 8 MB em MPI1 |
| SF32LB583VCC36 | BGA256 | Flash NOR de inicialização de 1 MB + 2 × OPI-PSRAM de 8 MB em MPI1 e MPI2 |
| SF32LB585V5E56 | BGA256 | Flash NOR de inicialização de 4 MB + Flash NOR de 4 MB em MPI1 + HPI-PSRAM de 32 MB em MPI2 |
| SF32LB586VDD36 | BGA256 | Flash NOR de inicialização de 1 MB + 2 × HPI-PSRAM de 16 MB em MPI1 e MPI2 |
| SF32LB587VEE56 | BGA256 | Flash NOR de inicialização de 4 MB + 2 × HPI-PSRAM de 32 MB em MPI1 e MPI2 |

</div>

Ao escolher uma variante, verifique primeiro:

- Capacidade necessária para framebuffer, recursos gráficos, áudio e modelos
- Interface de display e resolução desejada
- Requisitos de armazenamento externo e interface Wi-Fi
- Capacidade de fabricação da PCB para layout HDI BGA256 com passo de 0,4 mm

## Caminho de integração { #integration-path }

Siga esta sequência para transformar uma seleção inicial de SF32LB58x em um projeto validado:

1. **Valide a viabilidade do firmware.** Comece pelo [guia de introdução ao SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Em seguida, use o [fluxo de trabalho do SiFli SDK](../../develop/platforms/sifli-sdk/overview.md) e os [exemplos](../../develop/examples/index.md) para validar as configurações de display, gráficos, áudio, armazenamento e Bluetooth.
2. **Escolha a opção de integração.** Avalie o [SF32LB58-MOD](../modules/SF32LB58-MOD.md) quando for importante reduzir os riscos de RF, BGA e layout de memória, ou use o [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) para validação inicial no nível da placa.
3. **Projete e revise o hardware.** Antes de liberar o esquemático ou o layout, use o [guia de projeto de hardware](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md), incluindo as listas de verificação do [esquemático](../../hardware/chip-guides/SF32LB58x_schematic_checklist.md) e do [layout da PCB](../../hardware/chip-guides/SF32LB58x_pcb_layout_checklist.md). Valide desde cedo as premissas de HDI BGA256 e roteamento de memória.
4. **Consulte as fontes oficiais.** Confirme a referência comercial exata e o encapsulamento nas fontes da SiFli: [Ficha técnica], [Manual do usuário], [Guia de projeto original (wiki.sifli.com)] e [Nota de aplicação de hardware (fonte GitHub)].

## Produtos relacionados { #related-products }

### Módulo { #module }

O [SF32LB58-MOD](../modules/SF32LB58-MOD.md) integra o chip SF32LB586VDD36, sua rede de casamento de RF, HPI-PSRAM integrada ao encapsulamento e opções de armazenamento em um módulo pronto para integração. Use-o quando o projeto precisar dos recursos da série 58, mas quiser reduzir desde o início os riscos de RF, BGA e layout de memória.

### Kits de desenvolvimento { #development-kits }

O [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) é o ponto de partida para decisões de projeto sobre árvore de alimentação, display, armazenamento, áudio, RF, USB e SDIO.

### Produtos de referência { #reference-products }

Entre os produtos típicos baseados em SF32LB58x estão plataformas de relógios premium, HMIs vestíveis de alta resolução, painéis inteligentes, terminais conectados portáteis e dispositivos que combinam Bluetooth, display, áudio, armazenamento e cargas de IA local.

!!! note "Conteúdo gerado automaticamente"
    Esta página foi elaborada sem um documento-fonte específico. Verifique as afirmações técnicas na documentação oficial da SiFli antes de confiar nelas.
