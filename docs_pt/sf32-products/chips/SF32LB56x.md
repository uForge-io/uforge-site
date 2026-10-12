---
icon: lucide/microchip
description: "SF32LB56x: família avançada de MCUs Bluetooth de modo duplo e consumo ultrabaixo para produtos que precisam de displays mais avançados, áudio integrado, memória externa e maior capacidade de processamento em tarefas sempre ativas."
tags:
    - Hardware
    - Chip
---

# SF32LB56x { #sf32lb56x }

## Visão geral { #overview }

A série SF32LB56x é uma família avançada de microcontroladores AIoT de consumo ultrabaixo, voltada a produtos que precisam de Bluetooth de modo duplo, gráficos mais avançados, áudio integrado, memória externa e mais flexibilidade nas interfaces de display e no armazenamento que os dispositivos SF32LB de entrada.

A arquitetura big.LITTLE de dois núcleos combina um processador de aplicação Arm Cortex-M33 STAR-MC1[^1] de alto desempenho, com frequência de até 240 MHz, e um processador Arm Cortex-M33 STAR-MC1 de consumo ultrabaixo, de até 96 MHz. O núcleo principal pode executar a interface do usuário, o display, o armazenamento e a lógica do produto, enquanto o núcleo de baixo consumo assume o sensoriamento contínuo, o controle do modo de espera e o gerenciamento do Bluetooth com um orçamento de energia menor.

Segundo o resumo de produto e o datasheet oficiais da SiFli, a SF32LB56x é uma opção de maior integração para dispositivos conectados com muitos recursos de display e áudio. A família reúne Bluetooth 5.3 de modo duplo com BLE Audio, gráficos ePicasso 2.0, blocos integrados de conversão de áudio (ADC/DAC), um acelerador voltado a TinyML, opções de Flash integrada ao encapsulamento e suporte ampliado a memórias externas e interfaces de display. É uma opção adequada quando o projeto supera a SF32LB55x em conectividade sem fio, display ou áudio, mas ainda precisa do consumo e da integração típicos de um MCU.

O guia de modelos de chips da SiFli também é relevante: as combinações de interfaces de display disponíveis na família SF32LB56x variam conforme o encapsulamento. Por isso, o código exato do componente e o encapsulamento devem ser decisões de arquitetura tomadas desde o início, e não detalhes deixados para a etapa final do projeto da PCB.

[^1]: STAR-MC1 é um IP configurável de CPU embarcada Armv8-M Mainline da Arm China. Em dispositivos SF32 compatíveis, a SiFli o documenta como um processador de aplicação Arm Cortex-M33 STAR-MC1. Seu modelo de software da classe Cortex-M33 facilita reaproveitar firmware, middleware, adaptações para RTOS e ferramentas já existentes para Cortex-M33; cada dispositivo ainda exige o trabalho normal de integração específico. As configurações CU, SP e SE diferem principalmente em cache, TCM, XIPU e TrustZone; as instruções personalizadas Arm/CDE e a interface de coprocessador são recursos opcionais que devem ser verificados para o componente SF32 exato. A documentação da SiFli pode usar ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33***, conforme o contexto.

## Aplicações { #applications }

**A SF32LB56x é indicada para** produtos Bluetooth de modo duplo que precisam de mais recursos de display, áudio, armazenamento ou processamento local, incluindo:

- Smartwatches e smartbands
- Dispositivos vestíveis com interface gráfica
- Dispositivos médicos e de saúde
- Produtos HMI conectados
- Terminais portáteis industriais
- Fechaduras inteligentes e eletrodomésticos inteligentes
- Hubs de sensores de baixo consumo
- Displays avançados para e-bikes e e-scooters

Considere a SF32LB56x quando o projeto precisar de um ou mais destes recursos:

- Bluetooth 5.3 de modo duplo com suporte a BLE Audio
- ADC e DAC de áudio HiFi integrados
- Tarefas de exibição e cargas gráficas mais exigentes
- Suporte a interfaces de display DPI/RGB
- Wi-Fi externo via SDIO; armazenamento externo via SD/SDIO ou eMMC
- Mais GPIOs com a opção WBBGA175
- Mais margem para executar TinyML, áudio e interface do usuário em paralelo

## Recursos de desenvolvimento { #development-resources }

[Product Brief]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB56x/PB0056-SF32LB56x-Product%20Brief%20V1p2.pdf
[Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb56/DS5601-SF32LB56x-Datasheet%20V1p9p3.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB56x/UM5601-SF32LB56x-User%20mannual%20V1p0p5.pdf
[Hardware Design Guide (U, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Hardware Design Guide (V, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[Hardware Application Source (U)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[Hardware Application Source (V)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Hardware Design Checklist Source]: https://wiki.sifli.com/hardware/index.html
[SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/index.html
[API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/api/index.html
[SF32LB56-MOD]: ../modules/SF32LB56-MOD.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumo do produto][Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet]__
- :fontawesome-solid-file-pdf: __[Manual do usuário][User Manual]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware (U, wiki.sifli.com)][Hardware Design Guide (U, wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware (V, wiki.sifli.com)][Hardware Design Guide (V, wiki.sifli.com)]__
- :fontawesome-brands-github: __[Fonte da aplicação de hardware (U)][Hardware Application Source (U)]__
- :fontawesome-brands-github: __[Fonte da aplicação de hardware (V)][Hardware Application Source (V)]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware (μForge.io)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-book: __[Documentação do SDK][SDK Documentation]__
- :fontawesome-solid-book-open: __[Referência da API][API Reference]__
- :fontawesome-solid-list-check: __[Fonte do checklist de projeto de hardware][Hardware Design Checklist Source]__
- :fontawesome-solid-sim-card: __[SF32LB56-MOD]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__

</div>

---

## Características e especificações { #features-and-specs }

### Processamento e memória { #compute-and-memory }

- Processador de aplicação Arm Cortex-M33 STAR-MC1 de alto desempenho (HCPU), até 240 MHz
- Processador Arm Cortex-M33 STAR-MC1 de consumo ultrabaixo (LCPU), até 96 MHz
- Até 370 DMIPS / 984 EEMBC CoreMark no HCPU
- Até 148 DMIPS / 394 EEMBC CoreMark no LCPU
- Sistema de memória HCPU: 32 KB de I-cache + 16 KB de D-cache; 800 KB de SRAM, incluindo 128 KB de SRAM de retenção
- Sistema de memória LCPU: 16 KB de I-cache + 8 KB de D-cache; 160 KB de SRAM de retenção
- Opções de QSPI-NOR no encapsulamento: 512 KB ou 1 MB
- Interfaces de memória externa para QSPI-NOR, SPI-NAND, QPI/OPI-PSRAM, SD/SDIO e eMMC

### Gráficos, display e IA { #graphics-display-and-ai }

- Aceleração gráfica 2D/2.5D ePicasso 2.0
- Mesclagem alfa em 4 camadas, mais uma camada de fundo
- Rotação, redimensionamento, espelhamento e conversão de formatos comuns acelerados por hardware
- Processamento gráfico de até 1024 × 1024
- Descompressão gráfica sem perdas eZip 2.0, com suporte nativo a animações eZip-A
- Nas variantes compatíveis, o controlador LCD oferece suporte a 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB e JDI; a disponibilidade depende do encapsulamento e do código exato do componente
- TurboPixel: o extDMA comprime com perdas, em proporção fixa, o framebuffer final; o controlador de display faz a descompressão, reduzindo a largura de banda e a capacidade de PSRAM necessárias
- Acelerador matricial de redes neurais para cargas TinyML, de até 1,92 GOPS e mais de 10 TOPS/W

### Áudio e conectividade sem fio { #audio-and-wireless-connectivity }

- Bluetooth 5.3 de modo duplo com suporte a BLE Audio
- Sensibilidade: −100 dBm em BLE a 1 Mbps, −96,3 dBm em BR, −95,5 dBm em EDR2 e −88,5 dBm em EDR3
- Potência máxima de transmissão: 19 dBm em BR/BLE e 13 dBm em EDR2/EDR3
- Corrente de pico na recepção BR: 2,2 mA a 3,3 V
- 1 DAC de áudio HiFi de 24 bits com SNR de 108 dB
- 1 ADC de áudio HiFi de 24 bits com SNR de 99 dB
- 2 interfaces PDM e 1 interface I2S

### Segurança { #security }

- Aceleradores de hardware AES, HASH e CRC
- Gerador de números aleatórios verdadeiros (TRNG)
- PSA Certified Level 1

### Periféricos e E/S { #peripherals-and-ios }

- 6 UART
- 7 I2C
- 4 SPI
- 1 ISO7816
- 1 interface USB 2.0 FS
- 4 MPI
- 2 interfaces SD/SDIO/eMMC: uma de 4 bits e outra de 8 bits
- 1 ADC SAR de uso geral, 12 bits e 8 canais
- Sensor de temperatura
- 2 comparadores de tensão de baixo consumo
- Controlador de tarefas periféricas (PTC)
- Até 120 GPIOs, conforme o encapsulamento

### Alimentação e encapsulamento { #power-supply-and-package }

- Faixa de tensão de alimentação: 1,71 V a 3,63 V
- Temperatura de operação: −40 °C a +85 °C
- Regulador buck de alta eficiência e LDO de baixo consumo integrados
- Corrente em modo de suspensão com despertar pelo RTC: 600 nA
- Corrente em modo de suspensão com despertar por pino: 300 nA
- Opções de encapsulamento: QFN68L e WBBGA175

## Variantes da família { #family-variants }

A SF32LB56x inclui variantes compactas QFN68L e variantes WBBGA175 com mais E/S, além de diferentes opções de memória no encapsulamento. Defina o código exato do componente desde o início, pois o suporte a interfaces de display, a quantidade de GPIO disponível, a capacidade de armazenamento, os requisitos de fabricação da PCB e as possibilidades de migração para um módulo variam bastante entre as variantes.

As variantes da tabela têm faixa de alimentação documentada de 1,71 a 3,63 V e operam de −40 °C a +85 °C. Os domínios de alimentação dos GPIOs aceitam de 1,71 a 3,45 V; as linhas de E/S da memória integrada têm limites próprios. Consulte o guia de hardware da variante U ou V correspondente antes de definir os níveis das interfaces.

**Divergência documental sobre `SF32LB566VCB36`:** o [guia de modelos de chips da SiFli](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) informa 1 MB de QSPI-NOR integrada ao encapsulamento, enquanto as informações de pedido da versão anterior da ficha oficial [DS5601 V1.9.2](https://downloads.sifli.com/user%20manual/DS5601-SF32LB56x-Datasheet%20V1p9p2.pdf) indicam 4 Mb (0,5 MB). O [índice atual de documentação da SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/docs/product-index.rst) aponta para a DS5601 V1.9.3, mas não foi possível verificar as informações de pedido dessa versão nesta revisão; portanto, não se deve presumir que a divergência anterior persista ou tenha sido corrigida. Esta tabela segue o guia de modelos de chips. Antes de fechar a BOM, confira a entrada na V1.9.3 ou confirme com a SiFli o código exato do componente e a configuração de memória fornecida.

<div align="center"><em>Variantes representativas da família SF32LB56x</em></div>

<div align="center" markdown>

| Exemplo de componente | Encapsulamento | GPIOs HCPU / LCPU | Memória no encapsulamento | Interface de display | Aplicação típica |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB560UNN26 | QFN68L | 24 / 20 | Flash QSPI-NOR de 512 KB | QSPI | Wearables de entrada da série 56, e-paper ou HMI compacta com pouca memória e roteamento simples dos pinos na PCB |
| SF32LB561UBN26 | QFN68L | 24 / 20 | OPI-PSRAM de 4 MB + Flash QSPI-NOR de 512 KB | QSPI | Projeto gráfico compacto que precisa de mais memória para o framebuffer que a variante básica 560 |
| SF32LB563UCN26 | QFN68L | 24 / 20 | OPI-PSRAM de 8 MB + Flash QSPI-NOR de 512 KB | QSPI | UI compacta de maior resolução que ainda aproveita o custo mais baixo do encapsulamento QFN |
| SF32LB56WUND26 | QFN68L | 24 / 20 | OPI-PSRAM de 16 MB + Flash QSPI-NOR de 512 KB | QSPI | Produto compacto com alta demanda de memória e mais recursos locais, sem migrar para BGA |
| SF32LB566VCB36 | WBBGA175 | 79 / 41 | 8 MB + 4 MB OPI-PSRAM + Flash QSPI-NOR de 1 MB | DPI / QSPI / 8080 / JDI | Wearable avançado ou HMI que precisa de mais opções de display, mais E/S e do mesmo silício usado no SF32LB56-MOD |
| SF32LB567VND36 | WBBGA175 | 79 / 41 | OPI-PSRAM de 16 MB + Flash QSPI-NOR de 1 MB | DPI / QSPI / 8080 / JDI | Projeto com muitas E/S que prioriza um único bloco de PSRAM de maior capacidade e roteamento avançado de display, sem usar o chip padrão do módulo |

</div>

## Caminho de integração { #integration-path }

Siga esta sequência para transformar uma lista preliminar de componentes SF32LB56x em um projeto validado:

1. **Valide o caminho de firmware.** Comece pelo [guia de introdução ao SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Em seguida, use o [fluxo de trabalho do SiFli SDK](../../develop/platforms/sifli-sdk/overview.md) e os [exemplos](../../develop/examples/index.md) para testar os caminhos de display, áudio, Bluetooth e armazenamento do projeto.
2. **Escolha a forma de integração.** Avalie o [SF32LB56-MOD](../modules/SF32LB56-MOD.md) para reduzir o trabalho de integração de RF e memória de alta velocidade, ou use o [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) para validação em nível de placa.
3. **Projete e revise o hardware.** Antes de liberar o esquemático ou o layout, consulte o [guia local de projeto de hardware](../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md), incluindo os checklists de [esquemático](../../hardware/chip-guides/SF32LB56x_schematic_checklist.md) e de layout da PCB. Mantenha o encapsulamento U/V e a interface de display alinhados ao componente escolhido.
4. **Confirme as fontes oficiais.** Verifique o código exato do componente e o encapsulamento no [datasheet], no [manual do usuário][User Manual], no guia de projeto de hardware aplicável para [U][Hardware Design Guide (U, wiki.sifli.com)] ou [V][Hardware Design Guide (V, wiki.sifli.com)] e na respectiva [fonte da aplicação de hardware (U)][Hardware Application Source (U)] ou [fonte da aplicação de hardware (V)][Hardware Application Source (V)].

## Produtos relacionados { #related-products }

### Módulo { #module }

O [SF32LB56-MOD](../modules/SF32LB56-MOD.md) reúne o chip SF32LB566VCB36, memória, projeto de RF e opções de antena em um módulo pronto para integração. É indicado para projetos que precisam dos recursos da SF32LB56x, mas querem reduzir os riscos de layout de RF, casamento de antena, posicionamento do cristal e integração de memória de alta velocidade.

### Kits de desenvolvimento { #development-kits }

O [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) é um ponto de partida prático para o bring-up do firmware e para validar display, áudio, armazenamento, RF e consumo de energia antes de definir um projeto chip-down ou com um módulo.

### Produtos de referência { #reference-products }

Entre os produtos finais típicos com SF32LB56x estão smartwatches avançados, painéis HMI conectados, dispositivos de saúde, terminais portáteis industriais, instrumentos portáteis e displays avançados para e-bikes e e-scooters.

!!! note "Conteúdo gerado automaticamente"
    Esta página foi elaborada sem um documento-fonte preexistente. Verifique as afirmações técnicas na documentação oficial da SiFli antes de confiar nelas.
