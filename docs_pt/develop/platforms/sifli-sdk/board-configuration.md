---
icon: lucide/circuit-board
description: "Como o nome --board do SiFli-SDK associa o firmware ao hardware SF32: layout de Flash/PSRAM, multiplexação de pinos, caminhos de display e áudio e checklist de bring-up da placa."
tags:
    - Desenvolvimento
    - SiFli-SDK
---

# Configuração da placa { #board-configuration }

A configuração da placa associa o firmware ao hardware real e abrange, entre outros aspectos, o layout da Flash e da PSRAM, os pinos, a interface de display, o caminho de áudio, os clocks, as linhas de alimentação e os periféricos padrão.

No SiFli-SDK, o valor `--board=<board_name>` é o principal parâmetro de compilação. Ele seleciona o pacote de suporte à placa usado pelo exemplo.

Em placas com dois núcleos, omitir o sufixo do núcleo seleciona a configuração HCPU por padrão. Acrescente `_lcpu` ao nome da placa para compilar para LCPU; use `_hcpu` para selecionar HCPU explicitamente. Confirme se o exemplo oferece suporte ao núcleo escolhido.

## O que a placa selecionada pode afetar { #what-the-board-name-controls }

A placa selecionada pode afetar:

- Variante do chip e do encapsulamento.
- Layout da Flash e da PSRAM.
- Alvos de build HCPU/LCPU.
- Multiplexação dos pinos e disponibilidade de periféricos.
- Configurações de download pela UART.
- Configuração de display e toque.
- Roteamento do codec de áudio.
- Configuração de Bluetooth.
- Tabela de partições e condições de inicialização.

## Regras práticas { #practical-rules }

- Não deduza o nome da placa pelo nome comercial.
- Não copie para o SiFli-SDK um nome de placa usado no Zephyr ou no Arduino.
- Mantenha à mão o esquemático da placa ou a página do kit de desenvolvimento ao escolher GPIO, ADC, PWM, I2C, SPI ou recursos de display.
- Comece pelo exemplo do SDK mais próximo para a mesma placa.
- Faça uma compilação limpa depois de trocar de placa.

## Checklist de bring-up da placa { #board-bring-up-checklist }

- [ ] Confirme a variante do chip e o encapsulamento.
- [ ] Confirme os tipos, as capacidades e a configuração da Flash e da PSRAM.
- [ ] Confirme a fonte de alimentação e o comportamento do circuito de carga.
- [ ] Confirme as fontes e frequências de clock usadas por esta placa, incluindo 48 MHz e 32,768 kHz quando aplicável.
- [ ] Confirme a UART de download e a UART de log.
- [ ] Confirme as interfaces de display e toque.
- [ ] Confirme o caminho de áudio, se usado.
- [ ] Confirme os pinos de boot e o comportamento de reset.
- [ ] Confirme o layout das partições.

Não comece a depurar a aplicação antes de confirmar que a configuração da placa corresponde ao hardware em mãos.

## Exemplo de nome de placa do SDK { #sdk-board-name-example }

<div align="center"><em>Tabela: Nome da placa no SiFli-SDK para SF32LB52-DevKit-LCD_N16R8</em></div>

<div align="center" markdown>

| Tipo de nome | Identificador |
|:------------|:--------------|
| Modelo da placa | `SF32LB52-DevKit-LCD_N16R8` |
| Valor de `--board` do SiFli-SDK | `sf32lb52-lcd_n16r8` |

</div>

No SiFli-SDK, use o identificador do SDK com `--board`; o nome do produto não é um identificador de compilação.

## Ao portar para uma placa personalizada { #when-porting-to-a-custom-board }

Comece pela configuração do kit de desenvolvimento ou módulo mais próximo e ajuste:

1. Configuração da Flash e da PSRAM.
2. Multiplexação dos pinos.
3. UART do console/download.
4. Recursos de display, toque e áudio.
5. Premissas de alimentação e carregamento.
6. Layout das partições.
7. Periféricos específicos do produto.

Valide cada alteração com o menor exemplo que permita testar o recurso correspondente.
