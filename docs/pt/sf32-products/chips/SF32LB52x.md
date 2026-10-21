---
icon: lucide/microchip
description: "SF32LB52x: família de MCUs AIoT Arm Cortex-M33 de dois núcleos e custo otimizado para wearables e produtos AIoT compactos, com variantes a bateria e com alimentação externa."
tags:
    - Hardware
    - Chip
---

# SF32LB52x { #sf32lb52x }

## Visão geral { #overview }

SF32LB52x é uma família de MCUs da SiFli otimizada para reduzir custos, voltada a dispositivos vestíveis de entrada, HMIs gráficas compactas, periféricos Bluetooth e outros produtos AIoT com espaço limitado que ainda precisam de display, áudio, armazenamento e conectividade sem fio integrados.

Em nível de plataforma, a família combina um núcleo de aplicação Arm Cortex-M33 STAR-MC1[^1] a 240 MHz com um núcleo controlador Bluetooth dedicado de baixo consumo a 24 MHz. Ao manter a conectividade Bluetooth e as tarefas sempre ativas separadas da aplicação, o chip consegue executar uma interface responsiva e a pilha principal da aplicação.

Para planejar o produto, as principais variantes listadas no guia de modelos de chips da SiFli podem ser divididas em dois grupos definidos pela alimentação:

- **SF32LB520/3/5/7**: variantes alimentadas por bateria de íons de lítio, com caminho de carregamento integrado
- **52B/D/E/G/J**: variantes com alimentação externa; 52B/E/G/J destinam-se a sistemas padrão de 3,3 V, enquanto **52D** é voltado a uma alimentação especial de 1,8 V para aplicações de consumo ultrabaixo

Esses grupos não são intercambiáveis na placa. As variantes alimentadas por bateria não são compatíveis pino a pino com as variantes de alimentação externa. Além disso, o 52D de 1,8 V é eletricamente distinto do grupo 52B/E/G/J de 3,3 V, mesmo quando o encapsulamento tem um arranjo semelhante.

[^1]: STAR-MC1 é um IP configurável de CPU embarcada Armv8-M Mainline da Arm China. Em dispositivos SF32 compatíveis, a SiFli o documenta como um processador de aplicação Arm Cortex-M33 STAR-MC1. Seu modelo de software da classe Cortex-M33 facilita reutilizar firmware, middleware, adaptações para RTOS e ferramentas Cortex-M33 já existentes, embora cada dispositivo ainda exija o trabalho habitual de integração específico. As configurações CU, SP e SE diferem principalmente em cache, TCM, XIPU e TrustZone; as instruções personalizadas Arm/CDE e a interface de coprocessador são recursos opcionais que devem ser verificados para o componente SF32 exato. A documentação da SiFli pode usar ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33***, conforme o contexto.

## Aplicações { #applications }

**SF32LB52x é indicado para** produtos centrados em Bluetooth nos quais custo, integração e autonomia da bateria são os principais critérios de projeto, incluindo:

- Smartwatches e pulseiras fitness de entrada
- Módulos Bluetooth e adaptadores sem fio
- Acessórios de áudio Bluetooth
- Sensores inteligentes e dispositivos vestíveis
- Etiquetas eletrônicas de prateleira e crachás inteligentes
- Impressoras portáteis de etiquetas
- Displays para e-bikes e e-scooters
- Dispositivos HMI básicos baseados em LVGL

## Recursos de desenvolvimento { #development-resources }

[Product Brief (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5201-SF32LB52x-Product%20Brief.pdf
[Datasheet (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52x/DS5201-SF32LB52x-Datasheet%20V2p5p5.pdf
[Product Brief (SF32LB52X external-supply family)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5202-SF32LB52X-Product%20Brief%20V0p1.pdf
[Datasheet (SF32LB52X external-supply family)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52X/DS5202-SF32LB52X-Datasheet%20V0p2p6.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB52x/UM5201-SF32LB52x-User%20Manual%20V0p8p8.pdf
[Hardware Design Guide (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[Hardware Design Guide (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html

<!--
[KiCad Files]:
[Schematic]:
-->

[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumo do produto (SF32LB520/3/5/7)][Product Brief (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Datasheet (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Resumo do produto (família SF32LB52X com alimentação externa)][Product Brief (SF32LB52X external-supply family)]__
- :fontawesome-solid-file-pdf: __[Datasheet (família SF32LB52X com alimentação externa)][Datasheet (SF32LB52X external-supply family)]__
- :fontawesome-solid-file-pdf: __[Manual do usuário][User Manual]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware (520/3/5/7)][Hardware Design Guide (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware (52B/D/E/G/J)][Hardware Design Guide (52B/D/E/G/J)]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__

</div>

---

## Características e especificações { #features-and-specs }

### Processamento e memória { #compute-and-memory }

- Núcleo de aplicação Arm Cortex-M33 STAR-MC1 de até 240 MHz, com DSP e MPU
- Núcleo controlador Bluetooth Arm Cortex-M33 STAR-MC1 dedicado, a 24 MHz
- Cache de instruções de 32 KB + cache de dados de 16 KB
- SRAM de aplicação de 512 KB e SRAM de 64 KB para o controlador Bluetooth
- Memória no mesmo encapsulamento, conforme a variante: de 1 MB de QSPI-NOR a 16 MB de OPI-PSRAM

### Gráficos e áudio { #graphics-and-audio }

- Acelerador gráfico 2D/2.5D ePicasso 2.0
- Decodificador de hardware eZip 2.0 para compressão gráfica sem perdas
- Controlador LCD dedicado compatível com SPI/DSPI/QSPI, incluindo SPI para e-paper, e com interface 8080 de 8 bits
- 1 ADC de áudio de 24 bits com SNR de 99 dB
- 1 DAC de áudio de 24 bits com SNR de 109 dB

### Conectividade sem fio { #wireless-connectivity }

- Bluetooth 5.3 de modo duplo (Bluetooth Classic e BLE)
- Potência máxima de transmissão:
    - 19 dBm para BLE/BR
    - 13 dBm para BT/EDR2 e BT/EDR3
- Sensibilidade: -100 dBm em BLE/1 Mbps
- Núcleo controlador Bluetooth Arm Cortex-M33 STAR-MC1 dedicado, com 64 KB de SRAM a 24 MHz
- O resumo do produto informa corrente de 2 µA em modo de suspensão; a corrente de standby do sistema depende do modo de operação e das fugas na placa

### Segurança { #security }

- Aceleradores de hardware AES/HASH/CRC
- TRNG
- PSA Certified Level 1

### Periféricos e E/S { #peripherals-and-ios }

- 3 UART
- 4 I2C
- 2 SPI
- 1 USB 2.0 FS
- 1 I2S
- 1 interface PDM (até dois microfones digitais)
- 1 SD 3.0/SDIO 3.0/eMMC
- 1 ADC de uso geral de 12 bits
- Sensor de temperatura
- RTC e temporizadores watchdog
- 44 ou 45 GPIO, conforme a família da variante

### Alimentação { #power-supply }

- **Grupo alimentado por bateria: SF32LB520/3/5/7** — alimentação direta por uma bateria Li-ion/Li-Po de uma célula; destinado a projetos que usam a arquitetura de alimentação com carregamento integrado.

- **Grupo de 3,3 V com alimentação externa: 52B/E/G/J** — destinado a sistemas com alimentação externa regulada; as variantes do grupo são compatíveis pino a pino entre si.

- **Grupo de 1,8 V com alimentação externa: SF32LB52D** — destinado a projetos especiais de consumo ultrabaixo em 1,8 V; não é eletricamente intercambiável com as variantes de 3,3 V.

Os grupos alimentados por bateria e por fonte externa são configurações de silício distintas e **não são compatíveis pino a pino entre si**.

## Variantes da família { #family-variants }


Para as principais variantes listadas no guia de modelos de chips da SiFli, a divisão prática é:

- **SF32LB520/3/5/7**: grupo alimentado por bateria de íons de lítio; as variantes são compatíveis pino a pino entre si
- **52B/E/G/J**: grupo padrão de 3,3 V com alimentação externa; as variantes são compatíveis pino a pino entre si
- **SF32LB52D**: variante especial de 1,8 V com alimentação externa para aplicações de consumo ultrabaixo

Ao migrar entre capacidades de memória, as correspondências mais próximas são:

- 520 ↔ 52B
- 523 ↔ 52E, tendo o 52D como variante correspondente de 1,8 V
- 525 ↔ 52G
- 527 ↔ 52J

<div align="center"><em>Principais variantes do SF32LB52x</em></div>

<div align="center" markdown>

| SF32LB | 520U36 | 523UB6 | 525UC6 | 527UD6 | 52BU36 | 52BU56 | 52DUB6 | 52EUB6 | 52GUC6 | 52JUD6 |
|:-|-:|-:|-:|-:|-:|-:|-:|-:|-:|-:|
| Encapsulamento | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L |
| Dimensões | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm |
| Passo | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIO | 44 | 44 | 44 | 44 | 45 | 45 | 45 | 45 | 45 | 45 |
| Memória no mesmo encapsulamento | 1 MB QSPI-NOR | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM | 1 MB QSPI-NOR | 4 MB QSPI-NOR | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM |
| Faixa de alimentação | 3,2–4,7 V | 3,2–4,7 V | 3,2–4,7 V | 3,2–4,7 V | 2,97–3,63 V | 2,97–3,63 V | 1,71–1,98 V | 2,97–3,63 V | 2,97–3,63 V | 2,97–3,63 V |
| Tensão de E/S | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Temperatura | -40 a 85 °C | -40 a 85 °C | -40 a 85 °C | -40 a 85 °C | -40 a 85 °C | -40 a 85 °C | -40 a 85 °C | -40 a 85 °C | -40 a 85 °C | -40 a 85 °C |

</div>

Esta tabela resume as principais variantes do [guia de modelos de chips da SiFli](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html); não é um catálogo completo de códigos de pedido. O datasheet vinculado da família com alimentação externa também lista o **SF32LB52HUD6** (1,8 V, QFN68L, PSRAM de 128 Mb), enquanto o guia de projeto de hardware usa ainda os padrões de sufixo `52AUx6` e `52D/F/HUx6`. As fontes disponíveis não apresentam uma única tabela coerente com todas as variantes. Antes de fechar o projeto, confirme no datasheet vigente a disponibilidade, os limites de alimentação, a interface de memória e as características de E/S de qualquer SKU desse tipo.

## Caminho de integração { #integration-path }

Siga esta sequência para transformar uma seleção preliminar de SF32LB52x em um projeto validado:

1. **Valide o fluxo de firmware.** Comece pelo [guia de início do SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Em seguida, use o [fluxo de trabalho do SiFli SDK](../../develop/platforms/sifli-sdk/overview.md) e os [exemplos](../../develop/examples/index.md) para validar os periféricos necessários e o comportamento do Bluetooth.
2. **Escolha a forma de integração.** Avalie o [SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) se um módulo de RF integrado atender ao produto; caso contrário, escolha a [placa de desenvolvimento SF32LB52](../devkits/SF32LB52-DevKit-LCD.md) mais próxima para validar firmware e periféricos desde o início.
3. **Projete e revise o hardware.** Antes de liberar o esquemático ou o layout, consulte o [guia de projeto de hardware](../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md) e os checklists de [esquemático](../../hardware/chip-guides/SF32LB52x_schematic_checklist.md) e [layout da PCB](../../hardware/chip-guides/SF32LB52x_pcb_layout_checklist.md). Confirme a família de alimentação correta: 520/3/5/7, 52B/E/G/J ou 52D.
4. **Confirme as fontes oficiais.** Consulte o [datasheet](#development-resources) aplicável e o guia de projeto de hardware da SiFli para [520/3/5/7][Hardware Design Guide (520/3/5/7)] ou [52B/D/E/G/J][Hardware Design Guide (52B/D/E/G/J)], de acordo com o código exato do componente e o encapsulamento.

<!-- uf-faq:start -->
## Perguntas frequentes { #frequently-asked-questions }

**Quais são as principais especificações do SF32LB52x?**
O SF32LB52x combina uma CPU de aplicação (Cortex-M33 @240 MHz) com um núcleo de baixo consumo (Cortex-M33 @24/48 MHz, com um controlador Bluetooth dedicado), 576 KB de SRAM interna e Bluetooth dual-mode (BT clássico + BLE). Gráficos: ePicasso 2.0 Lite. Encapsulamento: QFN68 (7 × 7 mm). USB 2.0 FS. Valores da família; confira o datasheet do código exato.

**Quais interfaces de display o SF32LB52x suporta?**
SPI / DSPI / QSPI / 8080 / EPD / JDI. A disponibilidade varia conforme o código e o encapsulamento.

**Quanta memória no encapsulamento o SF32LB52x oferece?**
Até 16 MB de PSRAM e até 4 MB de Flash NOR no encapsulamento, conforme o código.

**Qual tensão de alimentação o SF32LB52x precisa?**
3.2–4.7 V (520/3/5/7), 2.97–3.63 V (52B/E/G/J), 1.8 V (52D), conforme a variante. Confirme a faixa exata no datasheet.

**Por onde começar um projeto de hardware com o SF32LB52x?**
Comece pelo [guia de projeto de hardware do SF32LB52x](../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md) para esquemático, alimentação, clock/RF e layout de PCB, e use os checklists de esquemático e layout antes de liberar a placa.
<!-- uf-faq:end -->

## Produtos relacionados { #related-products }

### Módulo { #module }

[SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) combina o chip SF32LB525UC6 — que, na configuração padrão, inclui 8 MB de OPI-PSRAM em seu encapsulamento — com uma rede de casamento de RF. O módulo mede 27,9 × 18,0 × 3,1 mm e atende a projetos que precisam dos recursos da família SF32LB52 sem assumir o projeto e a validação de RF no nível do chip.

### Kits de desenvolvimento { #development-kits }

- [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md) é a principal placa de bring-up com display no ecossistema de módulos SF32LB52, com conexões QSPI e LCD MCU/8080.
- [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md) é a placa core compacta com alimentação externa para bring-up rápido de firmware, GPIO e baixo consumo em componentes da classe 52B/52J.
- [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) é a menor placa de desenvolvimento da série 52, útil para produtos com restrição de espaço.
- [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) é a opção de placa voltada ao baixo consumo, para avaliações focadas em bateria e experimentos com produtos compactos.

### Produtos de referência { #reference-products }

Produtos típicos com SF32LB52 incluem smartwatches e pulseiras fitness de entrada, acessórios Bluetooth, controles gráficos compactos, etiquetas eletrônicas de prateleira, crachás inteligentes, impressoras portáteis de etiquetas e displays para e-bikes ou e-scooters com foco em custo.
