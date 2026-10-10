---
icon: lucide/battery-charging
title: "Exemplos de baixo consumo do SDK"
description: "Escolha o exemplo de gerenciamento de energia do SiFli-SDK adequado para modos de suspensão, fontes de despertar, GPIO, CPU, Bluetooth, telas, interface e cenários de dispositivos vestíveis."
tags:
  - Baixo consumo
  - Exemplos
---

# Exemplos de baixo consumo do SDK { #low-power-sdk-examples }

Os exemplos de gerenciamento de energia do SiFli-SDK são referências para medição e integração, não especificações universais de corrente. Cada exemplo corresponde a uma combinação específica de família de chips, placa, caminho de alimentação, periféricos habilitados, configuração de firmware e carga de trabalho. Use-o para reproduzir um estado ou cenário definido no hardware de destino e, em seguida, meça a corrente e a tensão do próprio produto nas mesmas condições.

Esta página organiza os projetos do [índice de exemplos de PM do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html) de acordo com a questão de engenharia que respondem. A página oficial de cada exemplo continua sendo a referência para placas compatíveis, conexões de alimentação, jumpers, configurações do SDK, comandos e comportamento esperado.

## Comece pelo exemplo de gerenciamento de energia adequado { #start-with-the-right-power-example }

<div align="center"><em>Tabela: exemplos de PM do SiFli-SDK por tarefa de engenharia</em></div>

<div align="center" markdown>

| Objetivo de engenharia | Comece por | O que o exemplo ajuda a estabelecer | O que verificar novamente no produto |
|:-----------------|:-----------|:------------------------|:-------------------------|
| Validar a entrada em estados básicos de PM e o comportamento de despertar | [Exemplo de PM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) | A configuração básica de gerenciamento de energia do SDK e o fluxo de suspensão/despertar | Fontes reais de despertar, dependências de clock, estados retidos e solicitações de PM feitas por cada driver |
| Caracterizar a atividade de GPIO em baixo consumo | [Teste de consumo de GPIO](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gpio/README.html) | Despertar periódico por temporizador, acesso a GPIO e diferenças entre atividade de despertar, suspensão e E/S | Pull-ups e pull-downs externos, periféricos desligados, multiplexação de pinos, linhas de alimentação e caminhos de fuga não previstos |
| Separar o processamento do comportamento de desligamento | [Teste de consumo do processador](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/coremark/README.html) | Cargas de benchmark ou loop da CPU, desligamento, despertar por RTC e por pino | Frequência do núcleo, carga de trabalho, polaridade do pino de despertar, mapeamento específico da placa e tensão de alimentação |
| Medir cenários de Bluetooth | [Teste de consumo de anúncios BLE e conexão](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) ou [Teste de consumo BLE/BT](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) | Anúncios BLE, conexões e atividade Bluetooth como cenários mensuráveis | Condições de RF, potência de transmissão, intervalos de anúncio e de conexão, comportamento do dispositivo par, antena e callbacks da aplicação |
| Comparar as políticas de tela apagada e tela sempre ativa em AMOLED | [Teste de consumo de AMOLED](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/AMOLED/README.html) | Atualização da tela, suspensão com a tela apagada e comparação com a tela sempre ativa | Painel real, brilho, política de atualização, linhas de alimentação da tela e ciclo de uso |
| Medir um caminho de tela JDI | [Teste de consumo de JDI](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) | Comportamento de baixo consumo específico da configuração JDI documentada | Variante do painel, região de atualização, configuração do controlador, linhas de alimentação e frequência de atualização |
| Integrar uma interface gráfica de baixo consumo | [Guia do exemplo de baixo consumo GUI_PM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) | Interação entre o comportamento da interface, o estado da tela e a política de PM | Ciclo de vida das telas do produto, animações, fontes de despertar por toque ou controlador e política de atualização de áreas alteradas |
| Caracterizar uma carga de atualização da tela | [Exemplo de teste de consumo — cenário de atualização da tela](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) | A contribuição da atualização da tela para a carga de trabalho do produto | Resolução, formato de pixel, área alterada, taxa da interface, estratégia de buffer e ritmo de atualização do conteúdo |
| Implementar uma interação em um dispositivo vestível, acionada por sensor | [Acender a tela ao erguer o pulso](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/raise_wrist/README.html) | Despertar por sensor, atividade com a tela acesa e retorno à suspensão | Escolha do sensor, algoritmo de gesto, intervalo de amostragem, tempo limite da tela, modelo de bateria e uso diário medido |

</div>

### Confira o escopo das placas { #verify-the-board-scope }

As listas abaixo distinguem as placas citadas explicitamente no guia oficial de cada exemplo dos alvos definidos na configuração GCC atual do SiFli-SDK. A presença de uma placa na matriz significa que o projeto está configurado como alvo de compilação; não significa que os valores de consumo publicados tenham sido medidos nessa placa. Quando os nomes do guia e os identificadores de compilação diferem, não presuma que sejam intercambiáveis sem conferir o mapeamento das placas. Os links de configuração apontam para a branch `main` atual; para outra revisão do SDK, consulte o `build_config_gcc.yaml` daquele checkout antes de escolher um alvo `scons --board`. Para reproduzir uma medição, siga a montagem de hardware indicada no guia. O nome de uma família no URL da documentação não permite concluir que toda a família é compatível.

- **PM Example** ([código-fonte do SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/classical)): o guia lista `sf32lb56-devkit-lcd_n16r12n1`, `eh-lb551`, `sf32lb52-lcd_n16r8` e `sf32lb58-lcd_n16r64n4`. A entrada atual do projeto na configuração GCC usa `sf32lb56-lcd_n16r12n1`, `eh-lb551`, `sf32lb52-lcd_n16r8`, `sf32lb58-lcd_n16r64n4` e `sf32lb52-core_n16r16`. O primeiro identificador difere de `sf32lb56-devkit-lcd_n16r12n1`, usado no guia; confirme o mapeamento das placas em vez de presumir que identificadores diferentes sejam equivalentes.
- **GPIO Power Consumption Test** ([código-fonte do SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gpio)): o guia e a configuração GCC atual listam `sf32lb52-core_n16r16`.
- **Processor Power Consumption Test** ([código-fonte do SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/coremark)): o guia lista `eh-lb551`, `eh-lb555`, `ec-lb583`, `ec-lb587`, `eh-lb561`, `eh-lb563` e `eh-lb523`. A configuração GCC atual associa o projeto ao conjunto `default_boards`; os identificadores atuais dos alvos constam na [configuração](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml). Não há correspondência direta, placa a placa, entre os nomes usados no guia e os alvos de `default_boards`. Confira o mapeamento na revisão do SDK usada, sem deduzi-lo pelo nome. A presença de um alvo também não significa que as medições publicadas cubram todas as placas do conjunto.
- **BLE Broadcast and Connection Power Consumption Test** ([código-fonte do SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/ble)): o guia lista as placas `eh-lb551` e `eh-lb555`; os alvos GCC atuais são `eh-lb551_hcpu` e `eh-lb555_hcpu`.
- **BLE/BT Power Consumption Test** ([código-fonte do SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/bt)): o guia lista `ec-lb583`, `ec-lb587`, `eh-lb561`, `eh-lb563` e `eh-lb523`. A configuração GCC atual usa o conjunto `bt_boards`; os identificadores exatos dos alvos aparecem na [configuração](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml), e alguns terminam em `_hcpu`. Uma entrada separada do projeto também inclui `sf32lb56-wlan-core_a128r12n1` e `sf32lb56-wlan-core_n16r12n1`. Não use os nomes de placa do guia como identificadores de alvo sem confirmar o mapeamento correspondente.
- **AMOLED Power Consumption Test** ([código-fonte do SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/AMOLED)): o guia e a configuração GCC atual listam `sf32lb52-core_n16r16`.
- **JDI Power Consumption Test** ([código-fonte do SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/jdi)): o guia e a configuração GCC atual listam `sf32lb52-core_n16r16`.
- **GUI_PM Low-Power Example Guide** ([código-fonte do SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gui_pm)): o guia e a configuração GCC atual listam `sf32lb52-lchspi-ulp`.
- **Power Consumption Test Example — Screen Refresh Scenario** ([código-fonte do SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/lcd_refresh)): o guia usa `sf32lb52-core_n16r16` como exemplo de compilação. Esse projeto não consta na matriz GCC atual, mas o exemplo e o guia continuam publicados; essa ausência não significa que estejam indisponíveis.
- **Raise Wrist to Light Up Screen** ([código-fonte do SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/raise_wrist)): o guia e a configuração GCC atual listam `sf32lb52-lchspi-ulp`.

## Defina o escopo elétrico da medição { #measure-at-the-right-electrical-boundary }

Não compare a medição do produto com a de um exemplo do SDK antes de confirmar que ambas incluem o mesmo conjunto de componentes e linhas de alimentação. Os exemplos de GPIO e de ativação da tela pelo gesto de erguer o pulso, por exemplo, documentam conexões de alimentação e alterações de jumpers específicas da placa para medições de baixo consumo. Uma placa alimentada por USB, um depurador conectado, um conversor UART, um circuito de carga ou um módulo de tela podem alterar significativamente o resultado.

Em cada medição, registre:

1. Onde a alimentação é aplicada e quais linhas de alimentação estão energizadas.
2. A tensão de alimentação, o modo de amostragem e a faixa do instrumento de medição de corrente.
3. Quais dispositivos externos, resistores de pull, cabos e interfaces de depuração permanecem conectados.
4. Revisão do firmware, nome da placa, configuração de `menuconfig` e opção de depuração de PM.
5. Qual transição de estado ou carga de trabalho cada trecho da medição representa.

Meça a tensão junto com a corrente para registrar também potência e energia, não apenas corrente. [Medição e validação do consumo de energia](measurement-and-validation.md) descreve em detalhes o fluxo de validação de componentes, cenários e perfil diário.

## Testes básicos de PM, GPIO e processador { #baseline-pm-gpio-and-processor-tests }

Use o [Exemplo de PM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) para confirmar se o modo de suspensão esperado e as fontes de despertar pretendidas funcionam antes de adicionar uma carga de trabalho do produto. Registre o estado de PM solicitado e confirme o estado efetivamente alcançado pelo sistema. Se o sistema não entrar no estado profundo solicitado, verifique primeiro a configuração e quem gerencia as solicitações de estado PM. Ajuste os parâmetros somente depois de resolver esse problema.

O **Teste de consumo de GPIO** é um bom ponto de partida quando uma interface aparentemente inativa ainda eleva a corrente em repouso. O cenário documentado desperta periodicamente para ler GPIO, o que ajuda a separar a corrente de suspensão daquela associada ao despertar e à atividade de E/S. A análise do produto deve ir além: verifique pull-ups e pull-downs internos e externos, estados de alta impedância, conexões entre domínios de alimentação, pinos conectados a periféricos desligados, estados padrão após a reinicialização e possíveis caminhos de fuga por ESD ou alimentação reversa. Mesmo um sinal em nível lógico válido pode causar corrente de fuga.

O **Teste de consumo do processador** diferencia condições fundamentalmente distintas: processamento na CPU, uma carga simples em loop, desligamento e despertar por temporizador ou por pino. Ele ajuda a caracterizar o custo do processamento ativo e o funcionamento do despertar, mas não prevê o consumo de energia da aplicação. Antes de usar a medição no orçamento de energia, substitua o benchmark ou o loop por uma carga de firmware representativa do produto.

## Cenários de Bluetooth e tela { #bluetooth-and-display-scenarios }

Use os projetos de [anúncio BLE e conexão](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) e [BLE/BT](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) para estabelecer cenários de rádio reproduzíveis antes de otimizar os parâmetros de conexão na aplicação. Ainda assim, o produto final precisa ser medido com suas próprias configurações de anúncio ou conexão, dispositivo par, ambiente de RF, antena e comportamento dos callbacks. Uma aplicação que desperta a CPU principal a cada evento de rádio pode anular um bom resultado medido no nível do enlace.

Os projetos voltados à tela ajudam a avaliar outro conjunto de decisões:

- O **Teste de consumo de AMOLED** compara a suspensão com a tela apagada a uma política de tela sempre ativa. As mudanças de modo e as estimativas de duração da bateria do exemplo de origem valem para a placa, o painel, o brilho, a temporização de atualização e o modelo de uso documentados; não se aplicam automaticamente a todos os produtos AMOLED.
- O [Teste de consumo de JDI](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) fornece uma referência específica da plataforma para um caminho de tela JDI.
- O [Guia do exemplo de baixo consumo GUI_PM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) relaciona decisões sobre o ciclo de vida da interface ao comportamento de PM.
- O [Cenário de atualização da tela](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) se concentra na carga causada pela própria atualização da tela.

Em conjunto, esses exemplos ajudam a responder a uma pergunta sobre o produto: quais eventos realmente exigem mudanças nos pixels e que parte do painel precisa ser atualizada? Consulte a [Visão geral de gráficos](../graphics/overview.md) e o [Controlador de display](../graphics/display-controller.md) para transformar essa resposta em uma estratégia de buffers e atualização parcial.

## Ativação da tela pelo gesto de erguer o pulso: cenário completo { #raise-to-wake-as-a-complete-scenario }

O projeto **Acender a tela ao erguer o pulso** é especialmente útil porque combina amostragem do sensor, reconhecimento de gesto, ativação da tela, uma janela de interação limitada e o retorno à suspensão. Ele demonstra um cenário do produto, e não um estado isolado.

As estimativas de autonomia do exemplo original dependem das condições documentadas: capacidade da bateria, número de despertares, tempo com a tela acesa, sensor, intervalo de amostragem, placa e correntes medidas. Ao adaptá-lo, preserve a estrutura: meça o estado com a tela acesa e o estado com a tela apagada, informe o número de eventos diários e calcule a energia diária total. Depois, atualize o modelo com os valores do seu produto, sem reutilizar os números do exemplo.

Para ver um exemplo completo do ciclo entre modelagem e medição, consulte [Análise de consumo de um smartwatch](smartwatch-power-profiling.md).

## Use um exemplo de PM para validar o produto { #adapt-a-pm-example-into-product-evidence }

<div align="center"><em>Tabela: verificações para adaptar exemplos de PM ao produto</em></div>

<div align="center" markdown>

| Etapa | Evidências a manter | Importância |
|:-----|:-----------------|:---------------|
| Estabelecer a referência original | Placa, conexão de alimentação, jumpers, revisão do SDK, configuração e comportamento esperado | Separa o comportamento do exemplo de origem das alterações posteriores no produto |
| Definir um cenário | Estado de PM identificado, componentes ativos, fonte de despertar, duração e condição de término | Evita obter um valor de corrente média sem significado de engenharia |
| Medir corrente e tensão | Marcadores na medição, corrente, tensão, potência e energia | Permite comparar resultados entre linhas de alimentação e revisões de firmware |
| Adicionar o hardware do produto | Componentes externos, estados dos pinos, linhas de alimentação e sensores atualizados | Revela fugas e consumo de periféricos ausentes na placa de desenvolvimento |
| Conciliar o modelo de energia | Frequência e duração dos cenários, além da energia medida | Permite ajustar a estimativa de consumo diário para que se aproxime do comportamento medido do produto |

</div>

## Recursos relacionados { #related-resources }

- [Visão geral do projeto de baixo consumo de energia](overview.md) para conhecer as responsabilidades de PM, os modos de energia, o projeto do sistema e os conceitos de análise de consumo.
- [Medição e validação do consumo de energia](measurement-and-validation.md) para validar componentes, cenários e o perfil do produto.
- [Análise de consumo de um smartwatch](smartwatch-power-profiling.md) para ver um modelo detalhado de uso diário.
- [Exemplos](../../develop/examples/index.md) para consultar o catálogo de exemplos do SDK de diferentes áreas.
- [Índice de exemplos de PM do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html) para consultar os projetos oficiais e as instruções de configuração atuais.
