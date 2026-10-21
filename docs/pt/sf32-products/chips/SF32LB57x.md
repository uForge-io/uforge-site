---
icon: lucide/microchip
description: "SF32LB57x: família de MCUs AIoT multicore de ultrabaixo consumo com Bluetooth dual-mode, dois núcleos de 240 MHz, gráficos ePicasso 3.0, eZip 3.0 e encapsulamentos QFN/BGA."
tags:
    - Hardware
    - Chip
---

# SF32LB57x { #sf32lb57x }

## Visão geral { #overview }

A série SF32LB57x é uma família aprimorada de MCUs AIoT altamente integrados e de ultrabaixo consumo, voltada a wearables, dispositivos inteligentes portáteis, produtos para casas inteligentes e equipamentos compactos com display. Foi desenvolvida para projetos que precisam de recursos gráficos mais avançados, áudio Bluetooth, entrada de câmera, armazenamento externo e operação sempre ativa, além do que um MCU Bluetooth básico consegue atender com folga, sem assumir os compromissos de consumo, custo e integração de uma plataforma com processador de aplicação.

SF32LB57x adota uma arquitetura de três núcleos Arm Cortex-M33 STAR-MC1[^1]: dois núcleos de alto desempenho operam a até 240 MHz, e um núcleo de baixo consumo opera a até 24 MHz. O [guia de uso da ACPU da SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) identifica os três núcleos como HCPU, ACPU e LCPU: o ACPU processa áudio e gráficos, enquanto o LCPU atende tarefas de baixo consumo, como BLE e processamento de dados de sensores. Em conjunto, os dois núcleos de alto desempenho alcançam 1.968 CoreMark / 740 DMIPS. Essa divisão oferece margem para renderização da interface, execução da aplicação e cargas multimídia, enquanto Bluetooth, o concentrador de sensores e outras tarefas sempre ativas podem seguir por um caminho de menor consumo.

A plataforma integra 592 KB de SRAM de retenção no chip, aceleração gráfica 2D/2.5D ePicasso 3.0, descompressão por hardware eZip 3.0, controlador LCD dedicado, controlador de câmera DCMI, Bluetooth de modo duplo, recursos de ADC/DAC de áudio de alta fidelidade, interfaces para memória SiP e externa, aceleração de segurança e atribuição flexível de GPIO por meio do FreeIO. Um diferencial importante da família 57x é o PTM (Parallel Task Machine), um pequeno processador paralelo de tarefas que transfere das CPUs principais sequências periféricas sensíveis a ciclos, protocolos de E/S personalizados, aquisição de sensores, temporização semelhante a PWM e coordenação orientada a eventos.

No planejamento de hardware, a decisão inicial mais importante é definir a combinação de alimentação e encapsulamento. SF32LB57x está disponível nos encapsulamentos QFN68, QFN80 e BGA112; a família do componente determina se a alimentação será por bateria ou por uma fonte externa regulada de 3,3 V. Essa escolha afeta a árvore de alimentação, a quantidade de GPIO disponível, o fanout do encapsulamento, o roteamento de display e memória, o acesso para depuração e a estratégia de bring-up. Portanto, a referência comercial exata deve ser definida antes de reutilizar esquemáticos ou iniciar o layout da PCB.

[^1]: STAR-MC1 é um IP configurável de CPU embarcada Armv8-M Mainline da Arm China. Em dispositivos SF32 compatíveis, a SiFli o documenta como um processador de aplicação Arm Cortex-M33 STAR-MC1. Seu modelo de software da classe Cortex-M33 facilita a reutilização de firmware, middleware, portas de RTOS e ferramentas existentes para Cortex-M33, sujeita ao trabalho normal de integração específico do dispositivo. As configurações CU, SP e SE diferem principalmente em cache, TCM, XIPU e TrustZone; as instruções personalizadas Arm/CDE e a interface de coprocessador são recursos opcionais que devem ser verificados para o componente SF32 exato. A documentação da SiFli pode usar ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33***, conforme o contexto.

[^2]: **Somente para BGA112.** SF32LB57x integra MPI1, MPI2 e MPI3. As posições da memória interna associadas a cada interface estão definidas na [convenção de nomenclatura dos componentes SF32](../family/SF32_namingrule.md). Em qualquer uma destas duas configurações de memória integrada ao encapsulamento, os pinos MPI2 e MPI3 não ficam acessíveis fora do encapsulamento; por isso, ficam disponíveis apenas 58 GPIOs: (1) um dispositivo PSRAM em MPI2, sozinho ou junto com outro dispositivo PSRAM em MPI1; ou (2) um dispositivo NOR Flash em MPI3. `SF32LB57GVD776` corresponde ao caso (2): o segundo `7` indica que o componente interno usa MPI3; portanto, ficam disponíveis apenas 58 GPIOs. Nas demais configurações, as seis E/S do BGA112 associadas a MPI3 podem ser usadas para MPI3 ou configuradas como saídas estáticas de uso geral (GP) por meio de pull-up ou pull-down; não são GPIOs de uso irrestrito. Assim, o valor `58 + 6` de `SF32LB57ZVN7N6` significa 58 GPIOs utilizáveis mais 6 pinos que podem ser usados para MPI3 ou como saídas estáticas, e não 64 GPIOs livremente atribuíveis. Essa limitação não se aplica aos encapsulamentos QFN68 e QFN80, que oferecem apenas a quantidade nominal de GPIOs, sem opções adicionais de MPI3 ou saídas estáticas.

[^3]: As dimensões e a espessura do encapsulamento seguem as tabelas de pedidos e os desenhos de encapsulamento dos datasheets do SF32LB57x da SiFli (DS5701 e DS5702, V0.2.1): QFN68 (7 × 7 mm, desenhos de 0,9 mm ou 1,1 mm), QFN80 (8 × 8 mm, desenhos de 0,9 mm ou 1,1 mm) e BGA112 (5,4 × 4,4 mm, 0,98 mm). Entre as referências listadas, somente SF32LB573UB776 usa o QFN68 de 1,1 mm; as tabelas de pedidos não listam SF32LB57ZVN7N6, portanto sua espessura de BGA112 foi tomada do único desenho de BGA112. O guia de projeto de hardware da SiFli cita adicionalmente uma opção de BGA112 de 1,03 mm que os datasheets não mostram. O diagrama de nomenclatura específico do SF32LB57x associa U a QFN68, Y a QFN80 e V a BGA112; não presuma que o mapeamento de Y também se aplica a outras famílias SF32. Confirme com a SiFli a espessura e o desenho do encapsulamento da referência exata.

[^4]: Para a série alimentada por bateria, o datasheet do SF32LB57x da SiFli (DS5701) especifica VBAT e VCC de 3,0 a 4,7 V, com tensão de ativação de 3,5 V ±10 %. O guia de projeto de hardware da SiFli indica uma entrada mais estreita, de 3,45 a 4,7 V (QFN68, tabela 2-1-1; QFN80, tabela 2-1-3; BGA112, tabela 2-1-5); como os dois documentos divergem, confirme no datasheet da referência exata qual pino de entrada e limites se aplicam.
[^5]: A linha de tensão de E/S resume os domínios de alimentação de E/S suportados; não significa que cada pino possa usar qualquer uma das duas tensões. VDDIOA, quando alimentada separadamente, fornece energia aos GPIOs. VDDIOSB, quando presente, é a alimentação de E/S da memória SiP; o guia da SiFli especifica 1,8 V para PSRAM integrada e 3,3 V para Flash NOR. Para a série QFN68 de 3,3 V, a tabela 2-1-2 especifica apenas 3,3 V para VDDIOA. Verifique cada pino/domínio no guia do encapsulamento e no datasheet da referência exata.

## Aplicações { #applications }

**SF32LB57x é indicado para** produtos conectados compactos que precisam de gráficos, áudio Bluetooth, entrada de câmera, armazenamento externo ou sensores sempre ativos em uma plataforma MCU de baixo consumo, como:

- Smartwatches e pulseiras fitness
- Dispositivos inteligentes com interface homem-máquina
- Dispositivos inteligentes com display de papel eletrônico
- Eletrodomésticos inteligentes de pequeno e médio porte
- Equipamentos portáteis de gravação e áudio
- Dispositivos médicos vestíveis e equipamentos fitness
- Produtos industriais de exibição, sensoriamento, monitoramento e instrumentação
- Dispositivos vestíveis ou portáteis com câmera
- Terminais compactos e painéis de controle centrados em display
- Controladores de console central automotivo, chaves automotivas sem fio e controles remotos vestíveis para veículos
- Fechaduras inteligentes
- Walkie-talkies e intercomunicadores Bluetooth
- Porta-retratos digitais
- Redes Bluetooth Mesh e redes de concentradores de sensores de baixo consumo

É especialmente adequado quando o projeto exige uma ou mais destas capacidades:

- Dois núcleos de desempenho de 240 MHz e um núcleo de eficiência de 24 MHz para interface e aplicação, além de tarefas em segundo plano de baixo consumo
- Aceleração gráfica ePicasso 3.0 com rotação, redimensionamento, projeção, espelhamento e mesclagem alfa em tempo real
- Descompressão eZip 3.0 para imagens e animações eZip/eZip-A, JPEG e MJPEG, sem exigir que todo conteúdo seja decodificado com alto uso de CPU
- Interfaces LCD 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI e EPD de 8/16 bits
- Entrada de câmera DCMI via DVP ou SPI/Dual-SPI/Quad-SPI
- Bluetooth 6.3 de modo duplo (BR/EDR e BLE), incluindo BLE Audio e LE Long Range
- Recursos de ADC/DAC de áudio de 24 bits e alta fidelidade para reprodução, gravação e chamadas Bluetooth
- Opções de armazenamento SiP OPI-PSRAM / QSPI-NOR e memória externa QSPI-NOR/NAND, QPI-PSRAM, SD, SDIO ou eMMC
- Execução de tarefas periféricas personalizadas no PTM, temporização determinística de E/S, resposta rápida a gatilhos e automação de sensores ou interfaces com baixa carga para a CPU

O valor Bluetooth 6.3 segue os datasheets do SF32LB57x (V0.2.1); os resumos de produto v0.4 ainda mostram uma versão anterior. Confirme os recursos opcionais na documentação SiFli atual correspondente ao código exato da peça a ser encomendada.

## Recursos de desenvolvimento { #development-resources }

[Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumo do produto][Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet]__
- :fontawesome-solid-file-pdf: __[Manual do usuário][User Manual]__
- :fontawesome-solid-file-lines: __[Guia de projeto original (wiki.sifli.com)][Original Design Guide (wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware (μForge)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-file-excel: __[Lista de fornecedores aprovados da SiFli][SiFli Approved Vendor List]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__

</div>

---

## Características e especificações { #features-and-specs }

### Processamento e memória { #compute-and-memory }

- Sistema de alto desempenho com dois núcleos Arm Cortex-M33 STAR-MC1 de até 240 MHz
- Sistema de baixo consumo com um núcleo Arm Cortex-M33 STAR-MC1 de eficiência energética de até 24 MHz
- Desempenho dos dois núcleos de alto desempenho: 1.968 CoreMark / 740 DMIPS
- Cache HCPU: cache de instruções de 32 KB e 2 vias e cache de dados de 16 KB e 4 vias
- Recursos de cache de instruções e dados da ACPU para XIP e aceleração de aplicações
- 512 KB de SRAM de retenção HPSYS e 80 KB de SRAM de retenção LPSYS, totalizando 592 KB de SRAM no chip
- D-TCM de 128 KB sem ciclos de espera, compartilhada com o espaço de endereçamento da SRAM HPSYS
- Suporte a FPU de precisão simples e MPU
- GPDMA com modo de lista encadeada

### PTM (Parallel Task Machine) { #ptm-peripheral-task-machine }

- PTM de quatro núcleos para tarefas periféricas personalizadas que se beneficiam de execução temporizada por hardware, sem depender continuamente da CPU
- Conjunto compacto de instruções para leitura e escrita em barramentos e E/S, operações de dados, desvios condicionais, espera por eventos e atrasos fixos
- Controle temporal ciclo a ciclo quando executado a partir da TCM do PTM, adequado a sequências de E/S determinísticas
- Cada núcleo PTM pode gerenciar até 16 canais de E/S, com suporte a FIFO/DMA para interfaces de comunicação personalizadas
- Os núcleos PTM podem acessar a memória do barramento AHB e os registradores dos periféricos, gerar interrupções para a CPU e coordenar-se por notificações de eventos internos
- Adequado a protocolos de interface e PWM personalizados, operações agrupadas de memória/dados, agendamento de vários módulos e aquisição automática de sensores

### Conectividade sem fio { #wireless-connectivity }

- Rádio Bluetooth de modo duplo
- Suporte a BLE Audio e LE Long Range
- Sensibilidade de recepção: −100 dBm em BLE a 1 Mbps, −107,5 dBm em BLE a 125 kbps, −96 dBm em BR e −95 dBm em EDR2
- Potência máxima de transmissão: 13 dBm em EDR2/EDR3 e 17 dBm em BR/BLE
- A corrente de pico na recepção BR pode ser de apenas 2,0 mA a 3,8 V

### Gráficos, display e câmera { #graphics-display-and-camera }

- Mecanismo gráfico 2D/2.5D ePicasso 3.0
- Aceleração por hardware de rotação, redimensionamento, projeção, espelhamento, mesclagem alfa e composição multicamadas
- Resolução gráfica máxima de 2048 × 2048
- Formatos RGB: RGB888, RGB565, aRGB8888 e aRGB8565
- Formatos adicionais: L8/L4, G8/G4/G2, A8/A4/A2 e YUV
- Mecanismo de descompressão eZip 3.0 para imagens e animações eZip/eZip-A sem perdas
- Descompressão de imagens JPEG e animações MJPEG
- Operação encadeada de eZip e ePicasso sem buffer de quadro intermediário
- Controlador LCD dedicado compatível com interfaces de display 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI e EPD de 8/16 bits
- O subsistema de display atende a aplicações de display sempre ativo com baixo consumo
- Controlador de câmera DCMI compatível com interfaces DVP e SPI/Dual-SPI/Quad-SPI

### Áudio e analógico { #audio-and-analog }

- 1 DAC de áudio de 24 bits e alta fidelidade, com SNR de 109 dB
- 2 ADCs de áudio de 24 bits e alta fidelidade, com SNR de 97 dB
- Taxas de amostragem de áudio de 8 kHz a 96 kHz, incluindo valores comuns em telefonia e música
- LDO Micbias com saída de 1,4 V a 2,8 V e corrente de saída de até 2 mA
- Suporte a reprodução e gravação de áudio, chamadas Bluetooth e reprodução de MP3 com fones conectados
- 1 ADC SAR de uso geral, de 12 bits e 12 canais
- 1 sensor de temperatura integrado ao chip

### Armazenamento e segurança { #storage-and-security }

- Suporte a OPI-PSRAM SiP de até 156 MHz
- Suporte a NOR Flash SiP de até 104 MHz
- 3 interfaces MPI (QSPI) para NOR, NAND e QPI-PSRAM, com operação XIP por mapeamento de endereços
- 2 interfaces SD/SDIO compatíveis com SD 3.0, SDIO 3.0 e eMMC
- Suporte à descriptografia de Flash em tempo real (on-the-fly)
- Aceleradores AES, HASH e CRC
- Gerador de números verdadeiramente aleatórios (TRNG)
- Arquitetura de segurança eShield
- PSA Certified Level 1

### Periféricos e E/S { #peripherals-and-ios }

- Até 58 GPIOs, conforme o encapsulamento e a referência comercial
- Atribuição flexível de GPIO por meio do FreeIO
- 3 UART
- 4 I2C
- 2 SPI
- 2 I2S
- 2 interfaces PDM (até dois microfones digitais por interface)
- 1 USB 2.0 Full-Speed
- 2 CAN
- Integração de eventos PTM para fluxos periféricos orientados a eventos e coordenação multicore
- 2 GPTIM de 16 bits
- 4 BTIM de 32 bits
- 2 ATIM de 32 bits
- 2 LPTIM de 24 bits
- 1 PWM
- 1 RTC
- 2 WDT de 24 bits e 1 WDT independente

### Gerenciamento de energia { #power-management }

- Conversor Buck de alta eficiência e LDOs de baixo consumo integrados
- Duas saídas externas de alimentação de 3,3 V, com até 150 mA cada
- Corrente em Hibernate de 2,8 µA a 3,8 V (configuração alimentada por bateria) ou 1 µA a 3,3 V (configuração com alimentação externa)
- Carregador linear de bateria de íons de lítio configurável (corrente de carga de até 400 mA) integrado na variante alimentada por bateria
- Faixa de tensão de carga completa do carregador: 4,2 V a 4,45 V
- Faixa de entrada da bateria/sistema[^4]: 3,0 a 4,7 V
- Faixa de VBUS: 4,5 V a 5,5 V
- Faixa de temperatura de operação: −40 °C a +85 °C

## Variantes da família { #family-variants }

SF32LB57x inclui variantes alimentadas por bateria e variantes para alimentação externa regulada de 3,3 V. Defina a referência comercial exata antes de criar o esquemático, pois o desenho do encapsulamento, os pinos de alimentação, a quantidade de GPIOs, a memória integrada e as restrições da placa variam entre os componentes.

As referências abaixo vêm das tabelas de pedidos dos datasheets do SF32LB57x da SiFli (DS5701 e DS5702, V0.2.1, ambos rascunhos preliminares), exceto `SF32LB57ZVN7N6`, que essas tabelas não listam. Confirme o código de pedido exato, a configuração de memória integrada ao encapsulamento, os limites elétricos e o desenho do encapsulamento na documentação atual da SiFli específica para cada componente antes de adotá-lo no projeto.

Para a seleção inicial, considere estes grupos:

- **`SF32LB57xU`**: QFN68, grupo alimentado por bateria de íons de lítio (nível indicado por dígito, por exemplo, `3`/`5`/`7`)
- **`SF32LB57XU`**: QFN68, grupo padrão para alimentação externa de 3,3 V (nível indicado por letra, por exemplo, `Z`/`C`/`E`/`F`/`G`/`H`/`J`)
- **`SF32LB57XY`** / **`SF32LB57XV`**: QFN80 / BGA112, grupo para alimentação externa de 3,3 V.

O datasheet da série alimentada por bateria (DS5701) também lista um QFN80 alimentado por bateria (8 × 8 mm, 58 GPIOs) e um BGA112 alimentado por bateria (até 58 GPIOs mais 6 E/S GPO ou de interface MPI). No entanto, sua tabela de pedidos não contém nenhuma referência de QFN80 ou BGA112 alimentado por bateria; por isso, confirme o SKU que pode ser encomendado com a SiFli antes de projetar em torno de qualquer um deles.

<div align="center"><em>Variantes SF32LB57x em QFN68 (57xU / 57XU)</em></div>

<div align="center" markdown>

| SF32LB | 573UB7N6 | 573UB766 | 573UB776 | 575UCNN6 | 577UDNN6 | 57ZUN3N6 |
|:-|-:|-:|-:|-:|-:|-:|
| Encapsulamento | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 |
| Dimensões em planta[^3] | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm |
| Espessura[^3] | 0,9 mm | 0,9 mm | 1,1 mm | 0,9 mm | 0,9 mm | 0,9 mm |
| Passo | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIOs | 46 | 46 | 46 | 46 | 46 | 47 |
| Memória integrada ao encapsulamento | 4 MB OPI-PSRAM + 16 MB QSPI-NOR | 4 MB OPI-PSRAM + 16 MB + 8 MB QSPI-NOR (dois dies) | 4 MB OPI-PSRAM + 2 × 16 MB QSPI-NOR (dois dies) | 8 MB OPI-PSRAM, sem QSPI-NOR | 16 MB OPI-PSRAM, sem QSPI-NOR | Sem PSRAM; apenas 1 MB QSPI-NOR |
| Alimentação[^4] | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | **3,3 V** |
| Tensão de E/S[^5] | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V / 1,8 V |
| Temperatura | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C |

</div>

<div align="center"><em>Variantes SF32LB57x em QFN80 / BGA112 (57XY / 57XV)</em></div>

<div align="center" markdown>

| SF32LB | 57EYBBN6 | 57GYD7N6 | 57ZVN7N6 | 57GVD776 |
|:-|-:|-:|-:|-:|
| Encapsulamento | QFN80 | QFN80 | BGA112 | BGA112 |
| Dimensões em planta[^3] | 8 × 8 mm | 8 × 8 mm | 5,4 × 4,4 mm | 5,4 × 4,4 mm |
| Espessura[^3] | 0,9 mm | 0,9 mm | 0,98 mm | 0,98 mm |
| Passo | 0,35 mm | 0,35 mm | 0,4 mm | 0,4 mm |
| GPIOs | 58 | 58 | 58 + 6 (MPI3 ou saídas estáticas)[^2] | 58[^2] |
| Memória integrada ao encapsulamento | 8 MB (2 × 4 MB, dois dies) OPI-PSRAM, sem QSPI-NOR | 16 MB OPI-PSRAM + 16 MB QSPI-NOR | Sem PSRAM + 16 MB QSPI-NOR | 16 MB OPI-PSRAM + 32 MB (2 × 16 MB, dois dies) QSPI-NOR |
| Alimentação | **3,3 V** | **3,3 V** | **3,3 V** | **3,3 V** |
| Tensão de E/S[^5] | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Temperatura | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C | −40 a 85 °C |

</div>

Para SF32LB57x, a escolha do encapsulamento não é apenas uma questão de custo da PCB. Ela afeta as interfaces de display disponíveis, o roteamento da memória externa, o orçamento de GPIOs, a reserva de pinos de depuração e gravação e a dificuldade do fanout. Fixe o encapsulamento junto com a arquitetura de alimentação. Use a referência comercial completa, e não apenas o nome do encapsulamento, como base para a lista de materiais e o esquemático: o sufixo de memória altera a configuração de armazenamento SiP e pode afetar as premissas sobre mídia de inicialização, sequência de alimentação e necessidade de memória externa.

## Caminho de integração { #integration-path }

Siga esta sequência para transformar uma lista inicial de opções SF32LB57x em um projeto validado:

1. **Valide o caminho do firmware.** Comece pelo [guia de introdução ao SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Em seguida, use o [fluxo de trabalho do SiFli SDK](../../develop/platforms/sifli-sdk/overview.md) e os [exemplos](../../develop/examples/index.md) para validar os recursos de gráficos, áudio, câmera, Bluetooth e armazenamento previstos para o produto.
2. **Planeje o hardware de avaliação.** Atualmente, a μForge não cataloga um módulo ou uma placa de desenvolvimento específicos para SF32LB57. Use o [seletor de produtos SF32](../product-selector.md) para encontrar a plataforma de avaliação mais próxima, mas confirme a compatibilidade do encapsulamento, da alimentação, da memória e das interfaces antes de aplicar os resultados a um projeto 57x.
3. **Projete e revise o hardware.** Antes de liberar o esquemático ou o layout, siga o [guia de projeto de hardware](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), incluindo a [autoverificação do projeto pelo cliente](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check), e o processo de revisão de [projeto para produção](../../hardware/design-for-production.md). Ainda não há um checklist específico da μForge para esta família.
4. **Consulte as fontes oficiais.** Confirme a referência comercial e o encapsulamento exatos nas fontes primárias da SiFli: [Datasheet], [Manual do usuário][User Manual] e [Guia de projeto original (wiki.sifli.com)][Original Design Guide (wiki.sifli.com)]. Para selecionar componentes críticos da lista de materiais, consulte também a [Lista de fornecedores aprovados da SiFli][SiFli Approved Vendor List].

<!-- uf-faq:start -->
## Perguntas frequentes { #frequently-asked-questions }

**Quais são as principais especificações do SF32LB57x?**
O SF32LB57x combina uma CPU de aplicação (2× Cortex-M33 @240 MHz) com um núcleo de baixo consumo (Cortex-M33 @24 MHz, com um controlador Bluetooth dedicado), 592 KB de SRAM interna e Bluetooth dual-mode (BT clássico + BLE). Gráficos: ePicasso 3.0 + eZip 3.0. Encapsulamento: QFN68 / QFN80 / BGA112 (7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)). USB 2.0 FS. Valores da família; confira o datasheet do código exato.

**Quais interfaces de display o SF32LB57x suporta?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. A disponibilidade varia conforme o código e o encapsulamento.

**Quanta memória no encapsulamento o SF32LB57x oferece?**
Até 48 MB de PSRAM e até 32 MB de Flash NOR no encapsulamento, conforme o código.

**Qual tensão de alimentação o SF32LB57x precisa?**
3.0–4.7 V or 2.97–3.63 V, conforme a variante. Confirme a faixa exata no datasheet.

**Por onde começar um projeto de hardware com o SF32LB57x?**
Comece pelo [guia de projeto de hardware do SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) para esquemático, alimentação, clock/RF e layout de PCB, e use os checklists de esquemático e layout antes de liberar a placa.
<!-- uf-faq:end -->

## Produtos relacionados { #related-products }

### Linha de base do projeto de hardware { #hardware-design-baseline }

Use o [guia de projeto de hardware (μForge)](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), a nota oficial de aplicação de hardware, o datasheet e a lista de fornecedores aprovados como linha de base do projeto. Antes de liberar o esquemático ou a PCB, confirme a arquitetura de alimentação, o fanout do encapsulamento e o plano de display, armazenamento, áudio, câmera, RF e acesso para depuração/gravação.

### Kits de desenvolvimento { #development-kits }

Use os esquemáticos de referência oficiais, as orientações de projeto do sistema mínimo e os materiais de checklist para planejar alimentação, clocks, RF, display, armazenamento, áudio, câmera e acesso para produção.

### Produtos de referência { #reference-products }

Entre os produtos típicos baseados em SF32LB57x estão smartwatches e pulseiras, dispositivos HMI inteligentes, produtos com display de papel eletrônico, eletrodomésticos inteligentes de pequeno e médio porte, equipamentos portáteis de gravação e áudio, painéis para casas inteligentes, terminais compactos com display e produtos Bluetooth com câmera.
