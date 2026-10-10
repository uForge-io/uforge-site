---
icon: lucide/chart-no-axes-column
title: "Amostragem com GPADC"
description: "Veja como usar o ADC de uso geral (GPADC) nas famílias SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x e SF32LB58x: limites elétricos, mapeamento de PADs, acesso ao dispositivo e calibração."
tags: [Desenvolvimento, SiFli-SDK, Notas de aplicação, ADC]
---

# Amostragem com GPADC { #sample-with-gpadc }

Esta nota reúne as orientações de ADC para as famílias SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x e SF32LB58x. O fluxo de software é compartilhado, mas os limites de entrada, a atribuição dos PADs e os pontos de calibração variam entre as famílias. Antes de configurar o hardware ou o firmware, identifique a família de destino nas tabelas.

O GPADC é o conversor analógico-digital (ADC) de uso geral da SiFli, destinado a medições como sinais de sensores e tensão da bateria. Ele é distinto do ADC de áudio presente nas famílias SF32LB52x, SF32LB56x, SF32LB57x e SF32LB58x e do ADC sigma-delta presente nas famílias SF32LB55x e SF32LB58x. Esta nota trata somente do GPADC; para os outros conversores, consulte a documentação de áudio ou sigma-delta da família de destino.

## Escopo do ADC e modelo de canais { #adc-scope-and-channel-model }

As notas de aplicação do SDK para SF32LB52x, SF32LB55x, SF32LB56x e SF32LB58x usam oito canais ADC, de `GPADC_CH0` a `GPADC_CH7`, para fontes analógicas como saídas de sensores e medições da tensão da bateria. O mapa de canais ADC do SDK para SF32LB57x define doze canais: `PA28`–`PA38` correspondem a `GPADC_CH0`–`GPADC_CH10`, e o canal de detecção da bateria é `GPADC_CH11` (identificado como `BAT` no mapa do SDK). O guia de hardware do SF32LB57x identifica o sinal correspondente no encapsulamento como `VBAT` ou `VBATS`, conforme a variante de alimentação. Uma leitura válida depende do canal escolhido, da rede de entrada e da calibração de software específica do dispositivo.

O SF32LB52x tem uma rota dedicada de detecção da bateria em `GPADC_CH7` (`BAT`): o exemplo do SDK informa que esse canal é conectado a VBAT por meio de um divisor interno e que o fator de conversão de tensão da bateria do SDK (`vbat_factor`) é aplicado à leitura. Já `GPADC_CH7` corresponde ao PAD externo `PB32` no SF32LB56x e a `PB39` no SF32LB58x. O canal de detecção da bateria do SF32LB57x é `GPADC_CH11`; use o sinal `VBAT` ou `VBATS` correspondente à variante de alimentação e respeite os limites próprios desse domínio. O fato de um canal ter uma conexão de placa relacionada à bateria não o torna um canal dedicado de bateria integrado ao chip.

## Características do ADC e rede de entrada { #adc-characteristics-and-input-network }

<div align="center"><em>Tabela: Características das entradas GPADC normais por família SF32</em></div>

<div align="center" markdown>

| Família | Canais GPADC | Resolução | Precisão típica | Tensão máxima nas entradas GPADC normais |
|:-------|:---------------|:-----------|:----------------|:----------------------------------------|
| SF32LB55x | 8 | 10 bits | 3–4 mV | 1,1 V (X1); 3,3 V (X3) |
| SF32LB52x | 8 | 12 bits | 1–2 mV | 3,3 V |
| SF32LB56x / 58x | 8 | 12 bits | 1–2 mV | 3,3 V |
| SF32LB57x | 12 | 12 bits | 1–2 mV | 3,3 V |

</div>

Os limites máximos de entrada indicados acima aplicam-se às entradas GPADC normais; os canais dedicados à detecção da bateria têm conexões e limites próprios. O exemplo do SF32LB55x usa um divisor de 1 MΩ / 220 kΩ com tempo de estabilização RC de 157 ms. A tabela consolidada do guia SF32LB56x indica 470 kΩ / 1000 kΩ e 200 ms para SF32LB52x, SF32LB56x e SF32LB58x; ela não faz essa recomendação para o SF32LB57x. No 57x, siga o caminho de detecção da bateria e os limites documentados para a referência exata, sem extrapolar esses valores de resistência nem esse tempo de estabilização. Essas recomendações se aplicam a redes divisoras externas. Em particular, a rota dedicada `GPADC_CH7` do SF32LB52x já usa um divisor interno. Não acrescente outro divisor externo, a menos que o projeto da placa de destino exija isso. A tolerância dos resistores afeta a precisão; quando o projeto usar um divisor externo, calibre essa rede separadamente na produção.

<div align="center"><em>Tabela: Rotas de detecção da tensão da bateria por família SF32</em></div>

<div align="center" markdown>

| Família | Rota de detecção da bateria | Observação de projeto |
|:-------|:-----------------------------|:----------------------|
| SF32LB55x | Divisor externo conectado a uma entrada GPADC selecionada; o circuito de referência usa `PB10` / `GPADC_CH1`. | Mantenha a saída do divisor dentro do limite de entrada da faixa X1/X3 selecionada. |
| SF32LB52x | Canal dedicado `GPADC_CH7` / `BAT`; o exemplo do SDK informa que VBAT é conectado por um divisor interno. | Use o `vbat_factor` do SDK para converter a leitura desse canal dedicado em tensão da bateria. |
| SF32LB56x / 58x | Um divisor externo na placa alimenta o PAD GPADC selecionado; o mapa de referência do SDK associa `GPADC_CH7` a `PB32` / `PB39`, respectivamente. | Confirme a conexão real do divisor da bateria no esquemático da placa de destino. Esses são PADs GPADC normais, não canais dedicados integrados ao chip. |
| SF32LB57x | Canal dedicado `GPADC_CH11`; o mapa do SDK o chama de `BAT`, enquanto o guia de hardware usa `VBAT` ou `VBATS` conforme a variante de alimentação. | Consulte o limite de medição do canal da bateria para a peça exata. Nas variantes com alimentação de 3,3 V, o guia especifica para `VBATS` uma faixa de medição GPADC de 0–4,5 V; não use no lugar dela a tensão nominal de 4,7 V do pino. |

</div>

Para a medição externa da bateria no SF32LB55x, o FAQ de ADC do OpenSiFli mostra um divisor de 1 MΩ / 220 kΩ com resistores de 1%. Os valores elevados reduzem a corrente de fuga contínua do divisor; a tolerância de 1% limita o erro da relação de divisão e ajuda a manter a precisão. A saída do divisor é o ponto de teste do ADC, não a própria tensão da bateria. Ao adaptar essa referência, consulte o esquemático e os limites elétricos do dispositivo de destino.

![Referência do divisor resistivo de VBAT no guia do SDK do SF32LB56x](../../../../assets/develop/adc/adc-resistor-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>Figura: Referência do divisor resistivo de VBAT e do ponto de teste do ADC no guia do SDK do SF32LB56x.</em></div>

![Referência da tensão do divisor de 1 MΩ / 220 kΩ do SF32LB55x](../../../../assets/develop/adc/adc003.png){ loading="lazy" }
<div align="center"><em>Figura: Valores de referência na saída do divisor do SF32LB55x, conforme o FAQ de ADC do OpenSiFli.</em></div>

<div align="center"><em>Tabela: Tensão de saída de referência do divisor de 1 MΩ / 220 kΩ do SF32LB55x</em></div>

<div align="center" markdown>

| Tensão de entrada da bateria | Saída de `PB10_BAT_DET_ADC` |
|:-----------------------------|:----------------------------------|
| 3,0 V | 0,540983607 V |
| 3,3 V | 0,595081967 V |
| 3,6 V | 0,649180328 V |
| 4,0 V | 0,721311475 V |
| 4,2 V | 0,757377049 V |
| 5,0 V | 0,901639344 V |

</div>

No esquemático de referência do SF32LB55x, a linha VBAT passa pelo resistor R125 (1 MΩ) até o nó `PB10_BAT_DET_ADC`. O resistor R126 (220 kΩ) e o capacitor C118 (0,1 µF) conectam esse nó ao terra em paralelo. Trate esses valores como referência e confirme-os no esquemático e nos limites elétricos do dispositivo de destino.

![Esquema do divisor externo para medição da tensão da bateria no SF32LB55x](../../../../assets/develop/adc/adc004.png){ loading="lazy" }
<div align="center"><em>Figura: Caminho externo de amostragem da tensão da bateria no SF32LB55x.</em></div>

## Alimentação analógica e referência { #analog-supply-and-reference }

A alimentação analógica e a configuração dos pinos de referência variam conforme a família. Consulte o esquemático do dispositivo de destino; não presuma que todas as variantes GPADC usam os mesmos pinos de referência:

<div align="center"><em>Tabela: Conexões de alimentação e referência do GPADC por família SF32</em></div>

<div align="center" markdown>

| Família | Conexões de alimentação e referência |
|:-------|:--------------------------------------|
| SF32LB52x / 56x | Alimente `AVDD33_ANA` por uma linha estável de 3,3 V. O esquemático de referência mostra `GPADC_VREF` desacoplado para o terra; esse pino não é uma entrada de alimentação. |
| SF32LB55x | O esquemático de referência mostra `AVDD33_ANA` e `AVSS33_ANA`; siga o esquemático do dispositivo para as conexões e o desacoplamento. |
| SF32LB57x | Alimente `AVDD33_ANA` com 3,3 V. `GPADC_VREF` é um pino de referência: conecte apenas o capacitor especificado ao terra e não aplique tensão externa a esse pino. |
| SF32LB58x | O esquemático de referência mostra `AVDD33_ANA` / `AVSS33_ANA`, `GPADC_VREFP` com o capacitor especificado e `GPADC_VREFN` conectado ao terra. Nenhum dos pinos de referência deve ser tratado como entrada de alimentação. |

</div>

O par `GPADC_VREFP` / `GPADC_VREFN` do SF32LB58x não é equivalente ao pino único `GPADC_VREF` usado em outras famílias. O esquemático do SDK também mostra componentes de filtragem específicos por família; use o circuito e os valores de componentes da referência exata do dispositivo. Nunca aplique alimentação diretamente a um pino de referência GPADC. `AVDD33_ANA` é a alimentação analógica; quando disponível, `AVSS33_ANA` é o terra analógico.

![Conexão da alimentação analógica e da referência do GPADC no guia do SDK do SF32LB56x](../../../../assets/develop/adc/adc-ana-ref-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>Figura: Conexões de alimentação analógica e referência do GPADC específicas de cada família, conforme mostrado no guia do SDK do SF32LB56x.</em></div>

## Configurar o PAD do ADC { #configure-the-adc-pad }

Antes de iniciar a amostragem, configure o PAD de entrada selecionado para a função analógica. Os exemplos genéricos de API do guia são:

```c
HAL_PIN_Set_Analog(PAD_PB08, 0);
HAL_PIN_Set_Analog(PAD_PB13, 0);
```

Essas chamadas demonstram a API para configurar pinos analógicos; elas não definem o PAD a ser usado em cada família. Selecione a entrada física conforme o mapa de canais:

<div align="center"><em>Tabela: Mapeamento de PADs para canais GPADC por família SF32</em></div>

<div align="center" markdown>

| Família | `GPADC_CH0` | `GPADC_CH1` | `GPADC_CH2` | `GPADC_CH3` | `GPADC_CH4` | `GPADC_CH5` | `GPADC_CH6` | `GPADC_CH7` |
|:-------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|
| SF32LB55x | `PB08` | `PB10` | `PB12` | `PB13` | `PB16` | `PB17` | `PB18` | `PB19` |
| SF32LB52x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `BAT` |
| SF32LB56x | `PB22` | `PB23` | `PB24` | `PB25` | `PB26` | `PB27` | `PB28` | `PB32` |
| SF32LB58x | `PB32` | `PB33` | `PB34` | `PB35` | `PB36` | `PB37` | `PB38` | `PB39` |
| SF32LB57x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `PA35` |

</div>

As fontes da SiFli divergem quanto ao mapeamento dos PADs do SF32LB52x: a [nota de aplicação ADC específica do SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html) indica, para a revisão A0, o seguinte mapeamento entre os PADs externos `PB08`, `PB10`, `PB12`, `PB13`, `PB16`, `PB17`, `PB18`, `PB19` e os canais `GPADC_CH0`–`GPADC_CH7`; já a [tabela ADC consolidada do guia SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html) lista `PA28`–`PA34` para `GPADC_CH0`–`GPADC_CH6` e `BAT` para `GPADC_CH7`. A linha do SF32LB52x acima segue a tabela consolidada e não deve ser tratada como um mapeamento universal para toda a família 52x. Antes de rotear as trilhas ou configurar o GPADC de um componente 52x, confirme o modelo e a revisão exatos na configuração de multiplexação de pinos do SDK correspondente e no esquemático da placa; não combine os dois mapeamentos.

O SF32LB57x tem mais quatro canais ADC: `PA36` corresponde a `GPADC_CH8`, `PA37` a `GPADC_CH9`, `PA38` a `GPADC_CH10`, e o sinal de detecção da bateria corresponde a `GPADC_CH11` (`BAT` no mapa do SDK; `VBAT` ou `VBATS` no guia de hardware, conforme a variante de alimentação). Esse canal pertence ao domínio de medição da bateria e tem uma faixa diferente das entradas GPADC comuns. Nas variantes alimentadas a 3,3 V, o guia especifica uma faixa de medição GPADC de 0–4,5 V para `VBATS`; não substitua esse limite pela classificação de 4,7 V do pino. Portanto, o mapa de 12 canais não pode ser usado como se fosse um dos mapas de oito canais acima.

Somente no SF32LB55x, também é possível atribuir diretamente um canal GPADC ao PIN, por exemplo: `HAL_PIN_Set(PAD_PB08, GPADC_CH0, PIN_NOPULL, 0)`. Não reutilize essa atribuição específica em outra família.

![Configuração do modo de entrada analógica do pino de medição da bateria no SF32LB55x](../../../../assets/develop/adc/adc008.png){ loading="lazy" }
<div align="center"><em>Figura: Configuração de pino do SF32LB55x no modo de entrada analógica para a medição da bateria pelo ADC.</em></div>

## Ler um canal ADC { #read-an-adc-channel }

O SiFli-SDK registra o ADC como um dispositivo de medição da tensão da bateria; o guia usa `bat1` como nome padrão do dispositivo. Pela interface de dispositivos do RT-Thread, localize o dispositivo, abra-o somente para leitura, habilite o canal desejado e leia o valor bruto:

```c
uint32_t channel = 1;
uint32_t value;
rt_device_t dev = rt_device_find("bat1");

if (dev) {
    rt_device_open(dev, RT_DEVICE_FLAG_RDONLY);
    rt_device_control(dev, RT_ADC_CMD_ENABLE, (void *)channel);
    rt_device_read(dev, channel, &value, 1);
}
```

No nível HAL, leia o resultado da conversão com `HAL_ADC_GetValue(&hadc, slot)`. Passe o identificador ADC inicializado e o número do slot configurado para a conversão; confirme que esse slot corresponde ao canal e ao PAD pretendidos.

## Calibração do ADC e conversão de tensão { #adc-calibration-and-voltage-conversion }

O guia representa a conversão por uma relação linear:

<div align="center"><em>V<sub>real</sub> = (Value<sub>adc</sub> − Offset) × Ratio</em></div>

`Offset` é o valor bruto correspondente a 0 V; `Ratio` é o incremento de tensão por contagem bruta. A calibração de fábrica compensa variações de fabricação, mas o guia também descreve um método de calibração em dois pontos para o caminho de entrada já montado:

1. Aplique duas tensões precisas e estáveis e leia os valores ADC correspondentes.
2. Use as duas tensões de calibração especificadas para a família de destino; não use 0 V nem a tensão máxima de entrada.
3. Use `sifli_adc_calibration` para calcular e armazenar o ratio e o offset.
4. Converta as leituras brutas posteriores com esses valores de calibração e considere a relação do divisor ao informar a tensão da fonte.

A implementação de referência define `ADC_RATIO_ACCURATE` como 1000 e inicializa `adc_vol_offset` e `adc_vol_ratio` com 200 e 3930, respectivamente. Esse helper legado ilustra o cálculo linear, mas não substitui o fluxo de calibração disponível na versão do SDK do dispositivo de destino. Quando houver suporte, use a API de calibração do HAL ou do driver do dispositivo.

### Faixas de calibração do SF32LB55x { #sf32lb55x-calibration-ranges }

O FAQ de ADC do OpenSiFli detalha o fluxo de calibração do SF32LB55x. Durante `sifli_adc_init`, a configuração de fábrica na Flash, identificada por `FACTORY_CFG_ID_ADC`, fornece as leituras de calibração armazenadas. `sifli_adc_calibration` calcula o `offset` e o `ratio` lineares a partir dessas leituras; as amostras seguintes usam o cálculo `sifli_adc_get_mv` correspondente à faixa selecionada.

São documentadas duas faixas de calibração:

![Seleção do modo de calibração e fluxo dos valores de fábrica do SF32LB55x](../../../../assets/develop/adc/adc001.png){ loading="lazy" }
<div align="center"><em>Figura: Inicialização da calibração do SF32LB55x, seleção da faixa e cálculo de offset/ratio.</em></div>

- **Faixa X1:** 0,3 V e 0,8 V. O bit 15 dos valores de calibração armazenados está definido, fazendo a implementação selecionar a faixa baixa. A precisão diminui perto de 0 V e acima de 1 V. Nessa faixa, `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X` fica desabilitado; portanto, o divisor interno não atua e a tensão no ponto de teste do ADC não pode exceder 1,1 V.
- **Faixa X3:** 1,0 V e 2,5 V. Esse é o método de calibração anterior. Ele habilita `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`, ativando o divisor interno com atenuação de 3×; a entrada não pode exceder 3,3 V.

![Controle do divisor interno X1/X3 do SF32LB55x](../../../../assets/develop/adc/adc002.png){ loading="lazy" }
<div align="center"><em>Figura: Controle de ativação do divisor interno do SF32LB55x conforme a faixa de calibração selecionada.</em></div>

Não escolha a faixa de calibração apenas com base na tabela: confira a configuração de fábrica e a implementação do SDK para o chip de destino. Os comportamentos X1 e X3 descritos aqui são específicos do material do SF32LB55x e não devem ser generalizados para outras famílias.

<div align="center"><em>Tabela: Tensões de entrada para calibração em dois pontos, conforme a nota de aplicação consolidada de ADC</em></div>

<div align="center" markdown>

| Família | Tensões de calibração |
|:-------|:-------------------|
| SF32LB55x | 0,3 V e 0,8 V |
| SF32LB52x / 56x / 58x | 1,0 V e 2,5 V |
| SF32LB57x | 1,0 V e 2,5 V |

</div>

Há uma diferença entre versões da documentação para o SF32LB52x: a nota consolidada de aplicação do ADC lista 1,0 V e 2,5 V para a calibração em dois pontos, enquanto a referência atual da API HAL identifica a faixa X1 como padrão para SF32LB52X, com pontos de 0,3 V e 0,8 V. Não trate esses pares como padrões intercambiáveis. Antes de selecionar os pontos de calibração ou a tensão de entrada permitida, verifique a versão exata do SDK, os dados de fábrica e a faixa de calibração usada em tempo de execução.

```c
static uint32_t adc_vol_offset = 200;
static uint32_t adc_vol_ratio = 3930;
#define ADC_RATIO_ACCURATE 1000

int sifli_adc_get_mv(uint32_t value)
{
    return (value - adc_vol_offset) * adc_vol_ratio / ADC_RATIO_ACCURATE;
}

int sifli_adc_calibration(uint32_t value1, uint32_t value2,
                          uint32_t vol1, uint32_t vol2,
                          uint32_t *offset, uint32_t *ratio)
{
    uint32_t gap1, gap2;

    if (offset == NULL || ratio == NULL) return 0;

    gap1 = (value1 > value2) ? (value1 - value2) : (value2 - value1);
    gap2 = (vol1 > vol2) ? (vol1 - vol2) : (vol2 - vol1);

    if (gap1 == 0) return 0;

    *ratio = gap2 * ADC_RATIO_ACCURATE / gap1;
    adc_vol_ratio = *ratio;
    *offset = value1 - (vol1 * ADC_RATIO_ACCURATE / adc_vol_ratio);
    adc_vol_offset = *offset;

    return adc_vol_offset;
}
```

### Validar a calibração após a inicialização e o despertar { #validate-calibration-after-startup-and-wake }

Ao depurar a medição da tensão da bateria no SF32LB55x, o FAQ de ADC do OpenSiFli alerta que as leituras feitas nos primeiros 300 ms, aproximadamente, após a inicialização ou o despertar podem estar incorretas devido à carga e descarga do circuito RC. A forma de onda observada se estabiliza após cerca de 350 ms. Aguarde o tempo adequado antes de amostrar ou descarte as primeiras leituras instáveis. Ao medir o nó do divisor com um multímetro ou osciloscópio, considere a impedância de entrada do instrumento: segundo o FAQ, ela pode causar uma queda de aproximadamente 30 mV.

![Forma de onda de estabilização da amostragem da bateria após a inicialização do SF32LB55x](../../../../assets/develop/adc/adc005.png){ loading="lazy" }
<div align="center"><em>Figura: Forma de onda de inicialização do SF32LB55x, com estabilização em aproximadamente 350 ms.</em></div>

### Verificar o pino ADC do SF32LB55x após standby e despertar { #check-sf32lb55x-pin-configuration-after-standby }

Na entrada `PB10` de medição da bateria do SF32LB55x, confira a configuração do pino antes de entrar em standby e depois do despertar. Antes da inicialização, `PB10` fica com o pull-up interno habilitado por padrão. Em `pinmux.c`, configure-o como `PIN_NOPULL` e `PIN_ANALOG_INPUT`; caso contrário, o pull-up pode continuar ativo e provocar leituras ocasionalmente altas.

![Forma de onda do nó de amostragem da bateria do SF32LB55x em standby](../../../../assets/develop/adc/adc006.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo da forma de onda no nó de amostragem da bateria do SF32LB55x enquanto o dispositivo está em standby.</em></div>

![Forma de onda do nó de amostragem da bateria do SF32LB55x após despertar](../../../../assets/develop/adc/adc007.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo da forma de onda no nó de amostragem da bateria do SF32LB55x após despertar do standby.</em></div>

## Verificação inicial { #bring-up-check }

Antes de implementar aquisição multicanal ou cíclica, valide um canal com uma entrada estável, medida de forma independente:

1. Confirme o mapeamento do PAD e a configuração analógica da família de destino.
2. Verifique se a saída do divisor permanece dentro do limite do ADC dessa família.
3. Compare os valores brutos e calibrados com a tensão aplicada.
4. Registre as condições do divisor e da calibração no relatório de teste da placa.

Ao conectar o log UART do SF32LB56x a um PC externo, confira se o nível de referência do adaptador serial corresponde à tensão de I/O do chip. O FAQ de ADC do OpenSiFli alerta que usar referência de 5 V com I/O de 3,3 V pode reduzir bastante as leituras do ADC; por exemplo, uma bateria de 4 V pode ser indicada como 3,3 V.

## Fontes oficiais { #official-source }

- [Guia de uso e configuração do ADC do SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html)
- [Guia de uso e configuração do ADC do SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)
- [Guia de uso e configuração do ADC do SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html)
- [Guia de uso e configuração do ADC do SF32LB57x](https://docs.sifli.com/projects/sdk/latest/sf32lb57x/app_note/adc.html)
- [Guia de uso e configuração do ADC do SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/adc.html)
- [Referência da API HAL do ADC do SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/api/hal/adc.html) — definições da faixa de calibração padrão.
- Guia de projeto de hardware do SF32LB57x — armazenamento e fabricação — atribuição de canais e PADs do GPADC.
- Guia de Projeto de Hardware do SF32LB57x — Sistema Mínimo e Alimentação — conexões de alimentação analógica e referência, além dos limites de medição da bateria específicos de cada variante.
- [FAQ de ADC do OpenSiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/faq/mcu/adc.md) — faixas de calibração de fábrica e validação do SF32LB55x após inicialização, standby e despertar, além de recomendações sobre o nível do log UART do SF32LB56x.
