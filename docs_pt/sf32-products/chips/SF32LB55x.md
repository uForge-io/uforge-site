---
icon: lucide/microchip
description: "SF32LB55x: família de MCUs de categoria intermediária e consumo ultrabaixo para dispositivos vestíveis e produtos HMI que precisam de mais capacidade gráfica, mais SRAM e maior variedade de encapsulamentos que os MCUs Bluetooth de entrada."
tags:
    - Hardware
    - Chip
---

# SF32LB55x { #sf32lb55x }

## Visão geral { #overview }

A série SF32LB55x é uma família de microcontroladores AIoT de categoria intermediária e consumo ultrabaixo, voltada a produtos conectados por BLE que precisam de melhores recursos de exibição, mais memória disponível e maior flexibilidade de encapsulamento que os MCUs Bluetooth de entrada.

A arquitetura big.LITTLE de dois núcleos reúne dois processadores Arm Cortex-M33 STAR-MC1[^1]: um núcleo de aplicação de alto desempenho, com frequência de até 240 MHz, e um núcleo que opera com consumo ultrabaixo, de até 48 MHz. Essa divisão permite executar as tarefas de interface do usuário mais exigentes no núcleo de aplicação, enquanto o núcleo de baixo consumo cuida do processamento dos sensores, do controle em modo de espera e das tarefas BLE que precisam permanecer ativas.

Segundo o resumo de produto e o datasheet oficiais da SiFli, a família combina BLE 5.2, o mecanismo gráfico ePicasso 2.5D, dois controladores LCD e um acelerador matricial de redes neurais voltado a TinyML. A SRAM no chip totaliza 1.312 KB (1.088 KB no HCPU + 224 KB no LCPU), e há suporte a memórias externas NOR, NAND, eMMC e PSRAM. Essa combinação torna o SF32LB55x uma opção prática para dispositivos vestíveis, produtos com muitos sensores e HMIs compactas que precisam de mais recursos que o SF32LB52x, sem precisar recorrer às categorias superiores 56/58.

O guia de modelos de chips da SiFli também informa que o SF32LB55x foi definido antes das famílias 52/56/58 mais recentes; por isso, a nomenclatura dos sufixos não segue integralmente a convenção posterior. Use o código completo do componente e as tabelas de recursos específicas de cada encapsulamento ao selecionar um dispositivo, sem tentar deduzir todas as características apenas pelo sufixo.

[^1]: STAR-MC1 é um IP configurável de CPU embarcada Armv8-M Mainline da Arm China. Em dispositivos SF32 compatíveis, a SiFli o documenta como um processador de aplicação Arm Cortex-M33 STAR-MC1. Seu modelo de software da classe Cortex-M33 facilita reaproveitar firmware, middleware, adaptações de RTOS e ferramentas já existentes para Cortex-M33; ainda assim, cada componente exige o trabalho habitual de integração específico do dispositivo. As configurações CU, SP e SE diferem principalmente em cache, TCM, XIPU e TrustZone; as instruções personalizadas Arm/CDE e a interface de coprocessador são recursos opcionais que devem ser verificados para o componente SF32 exato. A documentação da SiFli pode usar ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33***, conforme o contexto.

## Aplicações { #applications }

**O SF32LB55x é indicado para** produtos centrados em BLE que precisam de uma interface mais avançada, mais memória de trabalho ou maior flexibilidade de encapsulamento que os MCUs vestíveis de entrada, incluindo:

- Smartwatches e pulseiras fitness
- Dispositivos vestíveis para monitoramento da saúde
- Fechaduras inteligentes e controladores de casa inteligente
- Acessórios conectados com muitos sensores
- Produtos HMI gráficos compactos
- Canetas digitais e acessórios para dispositivos com entrada por caneta
- Terminais portáteis e controladores de mão

Considere o SF32LB55x quando o projeto precisar de um ou mais dos seguintes recursos:

- Conectividade BLE 5.2 com corrente de recepção muito baixa
- Suporte a displays MIPI DSI em modo de comando
- Mais SRAM para LVGL, recursos gráficos, processamento de sensores ou cargas de trabalho TinyML
- Um processador de baixo consumo programável pelo usuário
- Mais GPIOs ou opções de encapsulamento com maior densidade de E/S que o SF32LB52x
- Flexibilidade para usar memória externa NOR, NAND, eMMC, QSPI-PSRAM ou OPI-PSRAM

## Recursos de desenvolvimento { #development-resources }

[Product Brief]: https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf
[Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb55/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501-SF32LB55x-User%20manual%20V0p3p4.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[Hardware Application Note (GitHub source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[SiFli Chip Model Guide]: https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md
[Hardware Design Checklist Source]: https://wiki.sifli.com/hardware/index.html
[SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumo do produto][Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet]__
- :fontawesome-solid-file-pdf: __[Manual do usuário][User Manual]__
- :fontawesome-solid-file-lines: __[Guia de projeto original (wiki.sifli.com)][Original Design Guide (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Nota de aplicação de hardware (fonte no GitHub)][Hardware Application Note (GitHub source)]__
- :fontawesome-solid-list: __[Guia de modelos de chips da SiFli][SiFli Chip Model Guide]__
- :fontawesome-solid-file-lines: __[Guia de projeto de hardware (μForge.io)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-book: __[Documentação do SDK][SDK Documentation]__
- :fontawesome-solid-book-open: __[Referência da API][API Reference]__
- :fontawesome-solid-list-check: __[Fonte do checklist de projeto de hardware][Hardware Design Checklist Source]__
- :fontawesome-solid-cart-shopping: __[Comprar amostras][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desenvolvimento][Buy Dev Kits]__

</div>

---

## Características e especificações { #features-and-specs }

### Processamento e memória { #compute-and-memory }

- Processador de aplicação Arm Cortex-M33 STAR-MC1 de alto desempenho, até 240 MHz
- Processador Arm Cortex-M33 STAR-MC1 de consumo ultrabaixo, até 48 MHz
- Até 360 DMIPS / 965 EEMBC CoreMark no processador de aplicação
- Até 72 DMIPS / 193 EEMBC CoreMark no processador de baixo consumo
- 1.088 KB de SRAM de aplicação, incluindo 64 KB de SRAM de retenção
- 224 KB de SRAM de baixo consumo, toda ela de retenção
- Interfaces de memória externa para NOR, NAND, eMMC, QSPI-PSRAM e OPI-PSRAM

### Gráficos, display e IA { #graphics-display-and-ai }

- Mecanismo gráfico ePicasso 2.5D com rotação, redimensionamento, espelhamento e mesclagem alfa acelerados por hardware
- O eZip descomprime gráficos sem perdas e pode ser encadeado ao ePicasso
- A camada de transformação do ePicasso oferece resolução de até 640 × 640; as camadas genéricas e a saída de display chegam a 1024 × 1024, e a saída de display alcança taxa de quadros de até 60 fps
- O controlador LCD oferece suporte a 8080, SPI, Dual-SPI, Quad-SPI, DPI, MIPI DSI e interfaces JDI para displays refletivos nas variantes compatíveis; confirme a disponibilidade no modelo escolhido
- A compressão de framebuffer TurboPixel permite que o controlador LCD leia os quadros comprimidos e os descomprima para exibição, reduzindo o espaço ocupado pelo framebuffer e a largura de banda de leitura necessária
- Dois controladores LCD; as interfaces para display sempre ativo e o uso de dois displays dependem do modelo e do encapsulamento
- Acelerador matricial de redes neurais para cargas TinyML, de até 1,92 GOPS e 5,73 TOPS/W

### Conectividade sem fio { #wireless-connectivity }

- Bluetooth Low Energy 5.2
- Modos BLE de 125 kbps, 500 kbps, 1 Mbps e 2 Mbps
- Sensibilidade de até −100 dBm no modo de 1 Mbps
- Potência máxima de transmissão: 10 dBm
- Corrente de pico na recepção: 2,0 mA a 3,3 V

### Segurança { #security }

- Aceleradores de hardware AES e CRC
- Gerador de números aleatórios verdadeiros (TRNG)
- PSA Certified Level 1

### Periféricos e E/S { #peripherals-and-ios }

- Até 5 interfaces UART, 6 I2C e 4 SPI na família; a quantidade varia conforme o modelo, como mostra a tabela
- A quantidade de interfaces I2S e PDM também varia conforme o modelo (veja a tabela). Cada interface PDM pode conectar até dois microfones digitais; portanto, a quantidade de interfaces não corresponde à quantidade de microfones. Confira também a disponibilidade de pinos do modelo escolhido.

<div align="center"><em>Contagens publicadas de periféricos e ADC por modelo (SS6600A8 não especificado)</em></div>

<div align="center" markdown>

| Modelo | UART | I2C | SPI | I2S | PDM | ADC Sigma-Delta de 16 bits |
| :--- | ---: | ---: | ---: | ---: | ---: | :--- |
| SS6600A8 | Não especificado | Não especificado | Não especificado | Não especificado | Não especificado | Não especificado |
| SF32LB551U4O5 | 2 | 3 | 2 | 1 | 1 | Não disponível |
| SF32LB555V4O6 / SF32LB555V436 | 5 | 5 | 4 | 1 | 1 | 5 canais |
| SF32LB557VD3A6 | 5 | 6 | 4 | 2 | 2 | 5 canais |

</div>

**Nota sobre SS6600A8:** O [guia atual de modelos de chips da SiFli][SiFli Chip Model Guide] informa o encapsulamento, a memória integrada, os GPIOs e a interface de display desse componente, mas não apresenta as quantidades por modelo de UART, I2C, SPI, I2S, PDM ou ADC Sigma-Delta. A tabela 0-1 do [datasheet DS5501 V1.7.2][Datasheet] também não tem uma linha própria para SS6600A8. Por isso, essas quantidades aparecem como “Não especificado”. Não as deduza a partir do SF32LB551U4O5 apenas porque ambos usam o encapsulamento QFN68L. Confirme a configuração exata com a SiFli antes de definir a pinagem.

- 1 interface USB 2.0 FS host/dispositivo
- 1 GPADC (ADC SAR) de 10 bits: o datasheet especifica até 8 entradas single-ended ou 4 pares diferenciais, com faixa de 0–1,1 V para as entradas single-ended
- **Divergência entre as fontes sobre o ADC:** o [datasheet DS5501 V1.7.2][Datasheet] especifica até 8 entradas single-ended ou 4 pares diferenciais e faixa de 0–1,1 V para as entradas single-ended. A [nota de aplicação de hardware do SF32LB55x][Hardware Application Note (GitHub source)] informa 5 canais e faixa de entrada de 0–0,9 V. Antes de projetar o circuito analógico, confirme o mapeamento dos canais e os limites para o componente exato e a versão do SDK.
- ADC Sigma-Delta de 16 bits e 5 canais nos modelos BGA145 e BGA169 da tabela; não está disponível nos modelos QFN68L
- Sensor de temperatura
- 2 comparadores de tensão de baixo consumo
- Controlador de tarefas periféricas (PTC)
- A quantidade de GPIOs varia conforme o encapsulamento; consulte a tabela de encapsulamentos e a nota sobre divergências entre fontes

### Alimentação e encapsulamento { #power-supply-and-package }

- A faixa de alimentação depende da variante: 2,97–3,63 V para SS6600A8; 1,71–3,63 V para 551U4O5 e as variantes BGA selecionadas
- A temperatura de operação depende da variante: −20 °C a +70 °C para as variantes QFN documentadas; −40 °C a +85 °C para as variantes BGA selecionadas
- Gerenciamento de energia integrado, com dois reguladores buck de alta eficiência e um LDO de baixo consumo
- Corrente em modo de suspensão com despertar pelo RTC: 600 nA
- Corrente em modo de suspensão com despertar por pino: 280 nA
- Opções de encapsulamento: QFN68L, BGA145 e BGA169

## Variantes da família { #family-variants }

O SF32LB55x está disponível em encapsulamentos QFN e BGA. Defina o encapsulamento desde o início, pois a quantidade de GPIOs, a memória integrada, as interfaces de display e os requisitos de fabricação da PCB variam significativamente entre eles.

Neste caso, escolher o encapsulamento não é apenas uma decisão de layout. O [guia de modelos de chips da SiFli][SiFli Chip Model Guide] especifica que cada encapsulamento da família 55x oferece o conjunto completo ou apenas parte das interfaces de display. Portanto, fixe o encapsulamento antes de fechar o planejamento do display, da memória e da alocação de pinos. Componentes no mesmo encapsulamento são compatíveis pino a pino; antes de selecionar um substituto compatível, confirme a configuração exata de memória e os requisitos de display.

<div align="center"><em>Opções de E/S do SF32LB55x por encapsulamento</em></div>

<div align="center" markdown>

| Encapsulamento | GPIOs HCPU / LCPU | Total de GPIOs | Aplicação típica |
| :--- | :--- | :--- | :--- |
| QFN68L | 28 / 21 | 49 | Dispositivo vestível compacto ou sensor BLE, com menor custo de fabricação da PCB |
| BGA145 | 55 / 40 | 95 | Projeto com display, memória e sensores, com mais margem para roteamento |
| BGA169 | 71 / 42 | 113 | Projetos SF32LB55x com mais GPIOs e a maior variedade de memória integrada e opções de display |

</div>

Os modelos atuais representativos listados no guia de modelos de chips da SiFli deixam claras as diferenças de encapsulamento e memória. Como os sufixos desta família mais antiga não seguem de modo consistente a convenção mais recente da SiFli, use o código completo do componente em vez de tentar decodificá-los por uma regra fixa.

<div align="center"><em>Variantes representativas do SF32LB55x</em></div>

<div align="center" markdown>

| Código do componente | Encapsulamento | Memória no encapsulamento | Interfaces de display listadas no guia de modelos | Observações para seleção |
| :--- | :--- | :--- | :--- | :--- |
| SS6600A8 | QFN68L | Dois dispositivos QSPI NOR de 4 MB configurados como um único dispositivo OSPI NOR de 8 MB; sem PSRAM integrada no encapsulamento | QSPI, 8080 | 49 GPIOs; 2,97–3,63 V; −20 °C a +70 °C; opção compacta sem PSRAM integrada no encapsulamento |
| SF32LB551U4O5 | QFN68L | Flash de boot QSPI NOR de 4 MB + OPI-PSRAM de 4 MB | QSPI, 8080 | 49 GPIOs; 1,71–3,63 V; −20 °C a +70 °C; opção compacta com PSRAM integrada |
| SF32LB555V4O6 | BGA145 | Flash de boot QSPI NOR de 4 MB + OPI-PSRAM de 4 MB | MIPI DSI em modo de comando, QSPI, 8080 | 95 GPIOs; −40 °C a +85 °C; opção BGA145 equilibrada para produtos com display que precisam de 4 MB de PSRAM |
| SF32LB555V436 | BGA145 | Flash de boot QSPI NOR de 4 MB + OPI-PSRAM de 8 MB | MIPI DSI em modo de comando, QSPI, 8080 | 95 GPIOs; −40 °C a +85 °C; opção BGA145 para projetos que precisam do dobro da PSRAM no encapsulamento do SF32LB555V4O6 |
| SF32LB557VD3A6 | BGA169 | Flash de boot QSPI NOR de 1 MB + OPI-PSRAM de 16 MB + QPI-PSRAM de 2 MB | MIPI DSI em modo de comando, QSPI, 8080, JDI/Sharp MIP | 113 GPIOs; −40 °C a +85 °C; suporta dois displays por MIPI DSI e SPI/DSPI, cada um com conteúdo independente |

</div>

Para o SF32LB557VD3A6, o guia atual de modelos de chips da SiFli e a tabela 0-1 do datasheet DS5501 V1.7.2 indicam 113 GPIOs (71 HCPU + 42 LCPU). Já o resumo de características e o resumo de encapsulamentos desse mesmo datasheet, assim como o resumo de produto PB0001 V1.3, indicam 119 GPIOs para o BGA169 (71 HCPU + 48 LCPU). Portanto, as fontes oficiais divergem, inclusive dentro da própria DS5501. Esta página segue a linha específica do modelo e o guia atual (113). Antes de alocar pinos ou fechar o projeto, confira os GPIOs disponíveis no mapa de esferas do encapsulamento escolhido e confirme com a SiFli o código realmente comercializado. Confira também a alimentação, a faixa de temperatura, o código completo e a memória integrada no [datasheet DS5501 V1.7.2][Datasheet], no [resumo do produto PB0001 V1.3][Product Brief] e no [guia de modelos de chips da SiFli][SiFli Chip Model Guide]. Os encapsulamentos BGA145 e BGA169 medem 7 × 7 × 0,94 mm, com passo de 0,5 mm.


## Caminho de integração { #integration-path }

Siga esta sequência para passar de uma pré-seleção de componentes SF32LB55x a um projeto validado:

1. **Valide o caminho de firmware.** Comece pelo [guia de introdução ao SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Em seguida, use o [fluxo de trabalho do SiFli SDK](../../develop/platforms/sifli-sdk/overview.md) e os [exemplos](../../develop/examples/index.md) para validar o display, o Bluetooth e os recursos de baixo consumo necessários.
2. **Planeje o hardware de avaliação.** Atualmente, a μForge não cataloga um módulo ou uma placa de desenvolvimento específicos para o SF32LB55. Use o [Seletor de produtos SF32](../product-selector.md) para escolher a plataforma de avaliação disponível mais próxima e confirme a compatibilidade de encapsulamento e interfaces antes de transferir os resultados para um projeto baseado na SF32LB55x.
3. **Projete e revise o hardware.** Antes de liberar o esquemático ou o layout, consulte o [guia de projeto de hardware da μForge](../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md), incluindo os checklists de [esquemático](../../hardware/chip-guides/SF32LB55x_schematic_checklist.md) e de layout da PCB.
4. **Confirme as fontes oficiais.** Verifique o código completo do componente e o encapsulamento no [datasheet][Datasheet], no [manual do usuário][User Manual], no [guia de projeto original (wiki.sifli.com)][Original Design Guide (wiki.sifli.com)] e na [fonte da nota de aplicação de hardware (GitHub)][Hardware Application Note (GitHub source)].

## Produtos relacionados { #related-products }

### Kits de desenvolvimento { #development-kits }

Use a nota oficial de aplicação de hardware, os esquemáticos de referência e o checklist como ponto de partida para selecionar o encapsulamento, definir a arquitetura de alimentação, escolher a interface de display, planejar a memória e o layout de RF e preparar os testes de produção.

### Produtos de referência { #reference-products }

Entre os produtos finais típicos com SF32LB55x estão smartwatches, pulseiras fitness, dispositivos vestíveis de monitoramento da saúde, fechaduras inteligentes, acessórios conectados, controladores para casa inteligente e HMIs gráficas compactas.

!!! note "Conteúdo gerado automaticamente"
    Esta página foi elaborada sem um documento-fonte preexistente. Verifique as afirmações técnicas na documentação oficial da SiFli antes de confiar nelas.
