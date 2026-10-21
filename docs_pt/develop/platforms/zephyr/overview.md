---
icon: lucide/layers
description: "Suporte Zephyr downstream da OpenSiFli para a SF32LB52 DevKit LCD: identificação da placa, limites de configuração, cobertura de drivers e riscos de integração."
tags:
    - Desenvolvimento
    - Zephyr
---

# Zephyr { #zephyr }

O OpenSiFli desenvolve ativamente o suporte a Zephyr em [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream) e [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream). A árvore downstream inclui a placa `sf32lb52_devkit_lcd`, a integração do SiFli HAL, arquivos devicetree do SF32LB52, drivers, testes e overlays de exemplo.

Escolha Zephyr se precisar das APIs do Zephyr, de devicetree, Kconfig, de uma estrutura RTOS portátil ou de um caminho que se integre ao ArduinoCore-zephyr. Para acessar atualmente o conjunto mais abrangente de recursos do fabricante, escolha o SiFli-SDK.

Para configurar o workspace, compilar o primeiro `hello_world`, gravar a placa e verificar o console, siga [Primeiros passos com Zephyr Downstream](../../../getting-started/zephyr/getting-started-zephyr-upstream.md). Esta página aborda a plataforma downstream depois que essa configuração básica já estiver funcionando.

Referências principais:

- [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)
- [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)
- [Documentação do projeto Zephyr](https://docs.zephyrproject.org/)
- [SF32LB52-DevKit-LCD na documentação de placas do Zephyr](https://docs.zephyrproject.org/latest/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)

## Placa downstream verificada { #verified-downstream-board }

<div align="center"><em>Tabela: Placa downstream verificada</em></div>

<div align="center" markdown>

| Item | Valor |
|:-----|:------|
| Placa | `sf32lb52_devkit_lcd` |
| Nome completo | SF32LB52-DevKit-LCD |
| SoC | `sf32lb525uc6` |
| Runner de gravação | `sftool` |
| Argumento do runner | `--chip=SF32LB52` |
| Console | `usart1` |
| Taxa do console | `1000000` baud |
| Nó de display selecionado | `co5300` |

</div>

A documentação da placa downstream descreve o módulo SF32LB52x-MOD-N16R8, com 8 MB de OPI-PSRAM, 128 Mb de QSPI-NOR, cristais de 48 MHz e 32,768 kHz, interfaces de display, áudio, USB e hardware microSD.

## Limites de configuração { #configuration-boundaries }

O alvo da placa, o devicetree, a configuração Kconfig, os overlays e a revisão do HAL downstream formam um único limite de compatibilidade. Fixe a revisão downstream em cada projeto e mantenha os overlays e fragmentos de configuração da aplicação sob controle de versão junto com o código da aplicação.

Não copie para Zephyr o nome de uma placa, o mapeamento de pinos ou a configuração do runner de um projeto Arduino ou SiFli-SDK. Os três caminhos usam modelos de configuração diferentes, mesmo quando executados na mesma placa física.

## Observações sobre o hardware da placa { #board-hardware-notes }

A documentação da placa downstream lista:

- Módulo SF32LB52x-MOD-N16R8 baseado no SF32LB525UC6.
- 8 MB de OPI-PSRAM.
- 128 Mb de QSPI-NOR.
- Cristais de 48 MHz e 32,768 kHz.
- Interfaces de display SPI/DSPI/QSPI e MCU/8080.
- Suporte a toque por I2C.
- Entrada de microfone analógico e saída de áudio analógica com amplificador de potência Class-D na placa.
- Portas USB Type-C para USB-serial e USB 2.0 FS.
- Cartão microSD por SPI.

## Áreas de drivers presentes na árvore downstream { #driver-areas-present-in-the-downstream-tree }

A árvore downstream contém drivers relacionados ao SF32LB, bindings ou configurações de exemplo específicas da placa para áreas como:

- GPIO, pinctrl, UART, I2C, SPI, ADC, PWM, RTC e watchdog.
- Flash, controlador de memória, OPI PSRAM e QSPI NOR.
- Display/LCDC/MIPI DBI e configuração de exemplo LVGL.
- Bluetooth HCI mailbox e configuração de receptor de broadcast BAP.
- Codec de áudio, DMA, CRC, criptografia, entropia, OTP/eFuse, reguladores, reset e sensor de temperatura.

A presença no código não significa que todo cenário de produto esteja pronto para produção. Valide a combinação exata de exemplo e driver na placa de destino.

## Sequência de integração { #integration-sequence }

Depois de validar a configuração básica na primeira inicialização, teste um subsistema por vez: I/O da placa, comportamento da UART, display, armazenamento, Bluetooth, áudio e gerenciamento de energia. Em cada ponto de verificação, mantenha juntos o exemplo, o overlay, os fragmentos Kconfig, a revisão downstream e o log serial. A presença de um driver na árvore não comprova que a combinação completa da aplicação esteja pronta para produção.

## Checklist de riscos downstream { #downstream-risk-checklist }

- Você está usando o downstream do OpenSiFli, e não o Zephyr upstream?
- A revisão do HAL está fixada?
- O `west flash` usa o runner `sftool` esperado?
- O console está configurado para `1000000` baud?
- Os overlays necessários estão incluídos no exemplo?
- O driver tem suporte confirmado por testes ou apenas aparece na árvore?
