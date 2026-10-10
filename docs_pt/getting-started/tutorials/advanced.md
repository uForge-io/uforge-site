---
icon: lucide/rocket
description: "Tutoriais SF32 de validação de produto: ajuste de baixo consumo com medições, OTA por BLE com recuperação após falhas, inicialização de displays personalizados, análise de falhas e coredumps, Bluetooth com múltiplas conexões e drivers personalizados."
tags:
    - Tutoriais
---

# Validação de produto { #advanced-tutorials }

Estes tutoriais pressupõem que você já domina a [integração de subsistemas](intermediate.md): consegue inicializar um periférico, conectá-lo ao middleware e já lidou na prática com pelo menos um problema de coexistência. Esta etapa aborda o trabalho que transforma uma demonstração funcional em um produto pronto para ser lançado: medição de consumo, OTA com recuperação, inicialização de hardware personalizado, análise de falhas, Bluetooth com múltiplas conexões e drivers reutilizáveis.

A validação de produto não consiste tanto em copiar um exemplo, mas em reunir evidências. Em cada tutorial, registre a revisão da placa, a versão do SDK, o exemplo usado como base, a configuração do teste, os resultados esperados e observados e as alterações realizadas.

Use esta série quando sua responsabilidade for além de fazer um recurso funcionar uma única vez: é preciso medir o consumo, recuperar o dispositivo após falhas de atualização, repetir a inicialização de hardware personalizado e reunir evidências de problemas que ocorrem fora do fluxo normal.

Os caminhos dos exemplos e as placas compatíveis podem variar conforme a versão do SDK. Antes de compilar, consulte a lista “Supported Platforms” e os requisitos de hardware e configuração de cada exemplo; o suporte a um exercício não garante suporte aos demais exemplos nem a todas as combinações de recursos.

## Ajuste os modos de baixo consumo e as fontes de despertar { #tune-low-power-modes-and-wake-sources }

**Objetivo:** obter evidências reais da autonomia da bateria, em vez de presumir que o firmware consome pouco só porque chama uma função de suspensão (sleep).

**Tempo:** 2 horas ou mais, além do tempo para preparar as medições

**Comece por:** `example/pm/classical` e `example/pm/raise_wrist`

1. Prepare a medição de corrente conforme descrito na [Visão geral de baixo consumo](../../learn/low-power/overview.md#measuring-power-in-practice).
2. Registre valores de referência durante a inicialização, em atividade, em repouso com conexão, em repouso com o display desligado e, se disponível, em sono profundo (deep sleep).
3. Comece pelo exemplo de PM “classical” e identifique onde `rt_pm_request(PM_SLEEP_MODE_IDLE)` impede a entrada em modos de baixo consumo mais profundos que IDLE e onde a chamada correspondente a `rt_pm_release(PM_SLEEP_MODE_IDLE)` remove essa restrição. Verifique também se a estrutura de drivers bloqueia o modo de suspensão automaticamente enquanto um periférico está ativo.
4. Em seguida, analise como o exemplo raise-to-wake amostra o acelerômetro, reconhece gestos de pulso, acende o display e volta à suspensão. Verifique a sequência real de amostragem e despertar do exemplo; não presuma que ele usa uma interrupção.
5. Aplique o mesmo princípio de baixo consumo ao seu produto. Quando o hardware e os drivers permitirem, use interrupções ou processamento orientado a eventos para evitar temporizadores e polling desnecessários.
6. Repita as medições após cada alteração.
7. Se a corrente durante o sono profundo estiver acima do esperado, use `list_thread`, `list_device`, logs de PM e instrumentação das fontes de despertar para encontrar o subsistema que continua ativo.

**Critério de sucesso:** o firmware alcança o estado de baixo consumo esperado, as medições de corrente são repetíveis entre execuções e as fontes de despertar são intencionais, não acidentais.

**Solução de problemas:** se o consumo estiver bom em uma medição e ruim em outra, verifique os caminhos de erro e reconexão, o encerramento do display e das sessões de áudio e qualquer temporizador criado após a inicialização.

**O que você aprendeu:** como passar de “deveria consumir pouco” para baixo consumo comprovado por medições e localizar uma solicitação de estado PM que fica aberta silenciosamente.

## Adicione atualizações de firmware OTA por BLE { #add-ota-firmware-updates-over-ble }

**Objetivo:** atualizar o firmware em campo sem conexão por cabo.

**Tempo:** 2 horas

**Comece por:** `example/ble/peripheral_with_ota`

1. Compile e grave o exemplo de periférico com suporte a OTA.
2. Antes de tentar uma atualização, confirme que o comportamento normal do periférico BLE continua funcionando.
3. Inicie uma atualização OTA e confirme se o dispositivo inicializa com a nova imagem.
4. Em uma unidade de teste com um procedimento de recuperação documentado, provoque uma interrupção por vez, como desconectar durante a transferência ou sair da área de alcance. Não corte a alimentação, a menos que a documentação da placa e o projeto de recuperação do produto confirmem explicitamente que o teste é seguro.
5. Verifique o comportamento realmente implementado pelo produto após uma atualização interrompida ou rejeitada, como nova tentativa, retomada, modo de recuperação ou rollback. Exija rollback somente se ele estiver implementado no boot e no projeto de partições.
6. Teste a OTA quando houver dados de bonding desatualizados, após remover o dispositivo pelo telefone e depois de reiniciar o dispositivo.
7. Se o produto já usa PAN para transmitir dados, avalie a OTA por PAN como uma opção de projeto independente.

**Critério de sucesso:** após uma OTA bem-sucedida, o dispositivo inicia com a nova imagem; uma atualização interrompida ou rejeitada segue a política de recuperação documentada do produto, e o usuário consegue identificar o estado do dispositivo. Não presuma que toda OTA oferece rollback.

**Solução de problemas:** verifique o layout das partições, a assinatura ou as verificações de integridade da imagem, se usadas, a seleção da imagem de inicialização e o comportamento de recuperação, o suporte a rollback se implementado, os parâmetros de conexão durante a transferência e se as alterações de bonding ou de armazenamento persistem após a atualização.

**O que você aprendeu:** como o layout das partições, a validação da imagem, a seleção de boot e a política de recuperação determinam o comportamento da OTA, e por que uma atualização bem-sucedida, por si só, não prova que seja possível recuperar o dispositivo após uma interrupção.

## Inicialize um módulo de display personalizado { #bring-up-a-custom-display-module }

**Objetivo:** adaptar um novo display LCD, AMOLED, EPD ou display de memória, em vez de usar somente um painel de referência já suportado.

**Tempo:** 3 horas ou mais

**Comece por:** o driver de display existente no SDK que mais se aproxima do seu painel

1. Reúna a folha de dados do painel e identifique a sequência de inicialização, os parâmetros de temporização, o tipo de interface, os requisitos de reset e a sequência de alimentação.
2. Confirme se o dispositivo e o encapsulamento SF32 selecionados oferecem suporte à interface e ao pinout necessários.
3. Copie o driver de display existente mais próximo e substitua a sequência de inicialização e o mapa de registradores específicos do painel.
4. Primeiro, valide o preenchimento da tela com cores sólidas. Não depure widgets LVGL antes que o painel consiga exibir padrões simples.
5. Verifique a ordem das cores e dos bytes, a orientação, a janela de endereçamento e o comportamento de atualização parcial.
6. Reintegre o LVGL usado no exercício 2 de Integração de subsistemas.
7. Se forem compatíveis com o chip, o caminho de display, o driver e o SDK selecionados, habilite um por vez DMA, atualização parcial e a aceleração ePicasso.
8. Teste os caminhos de desligamento do display, suspensão, despertar e reinicialização.

**Critério de sucesso:** o painel inicializa de forma confiável após uma inicialização a frio e um reset, exibe corretamente padrões conhecidos e passa por ciclos de suspensão e despertar sem corromper a imagem.

**Solução de problemas:** se os preenchimentos estiverem incorretos, verifique o formato de pixel, os bits MADCTL/de orientação, a ordem dos bytes, as linhas de comando/dados, a temporização do reset e a sequência de ativação das linhas de alimentação antes de alterar o código da interface.

**O que você aprendeu:** como separar problemas elétricos e de sequência de inicialização daqueles relacionados à configuração do framework de interface.

## Analise o uso da CPU e investigue uma falha { #profile-cpu-usage-and-analyze-a-crash }

**Objetivo:** depurar problemas difíceis de reproduzir durante uma sessão com o depurador conectado.

**Tempo:** 2 horas

**Comece por:** `example/system/cpu_usage_profiler` e `example/system/coredump`

1. Execute o exemplo de profiling de uso da CPU com uma das cargas combinadas de Integração de subsistemas.
2. Identifique qual tarefa está consumindo tempo de CPU e se isso corresponde ao esperado.
3. Introduza uma falha controlada em uma branch de teste ou em um exemplo descartável e capture um core dump.
4. Use as ferramentas de análise de dump do SDK para localizar a função que falhou e a pilha de chamadas.
5. Compare o contexto da falha com `list_thread`, os logs e os eventos recentes.
6. Remova a falha intencional e repita o procedimento com um problema intermitente real, se houver.

**Critério de sucesso:** você consegue explicar um problema de desempenho e uma falha com base nas evidências coletadas, sem depender de suposições.

**Solução de problemas:** antes de interpretar a pilha de chamadas, confirme se os símbolos correspondem ao binário gravado, se os logs incluem a versão do firmware e se o nível de otimização é conhecido.

**O que você aprendeu:** como identificar proativamente caminhos lentos e analisar, após a falha, dumps de problemas difíceis de capturar em tempo real.

## Desenvolva um produto BLE com múltiplas conexões { #build-a-multi-connection-ble-product }

**Objetivo:** oferecer suporte a mais de um papel ou conexão BLE simultâneos.

**Tempo:** 2 horas

**Comece por:** `example/ble/central_and_peripheral` e `example/ble/multi_connection`

1. Comece pelo comportamento de periférico validado no exercício 3 de Integração de subsistemas.
2. Acrescente também o papel central. Por exemplo, o dispositivo pode atuar como periférico de um telefone e como central de um acessório com sensores.
3. Amplie a implementação para várias conexões simultâneas.
4. Registre, para cada conexão, o intervalo de conexão, a latência do escravo (slave latency), o timeout de supervisão (supervision timeout) e a taxa de notificações.
5. Antes de atribuir o problema ao código da aplicação, estabeleça uma referência de vazão de dados (throughput) usando o exemplo correspondente do SDK.
6. Teste a reconexão, o modo de suspensão do telefone, a perda do acessório e rajadas simultâneas de notificações.

**Critério de sucesso:** todas as funções previstas conectam, desconectam e reconectam de forma confiável, e os parâmetros escolhidos permanecem estáveis sob atividade combinada.

**Solução de problemas:** procure solicitações de parâmetros incompatíveis, excesso de notificações, callbacks da aplicação que bloqueiam a execução e políticas de energia que despertam a CPU principal em todo evento de conexão.

**O que você aprendeu:** configurações BLE compatíveis do SiFli-SDK podem combinar as funções de periférico e central; algumas também suportam várias conexões simultâneas. Confirme as funções e os limites de conexão do chip, da configuração da pilha e do exemplo usados. Os compromissos entre parâmetros se acumulam quando várias conexões compartilham a programação do rádio.

## Escreva um driver de dispositivo personalizado para RT-Thread { #write-a-custom-rt-thread-device-driver }

**Objetivo:** integrar um periférico sem driver disponível no SDK como um dispositivo RT-Thread propriamente dito, em vez de improvisar uma solução pontual na aplicação.

**Tempo:** 3 horas ou mais

**Comece por:** a documentação de desenvolvimento de aplicações do SDK e o driver existente mais próximo

1. Revise como o SDK organiza as definições da placa, o multiplexador de pinos, os clocks e os drivers de periféricos.
2. Comece pelo driver existente cuja arquitetura mais se aproxime do seu periférico.
3. Mantenha separados o acesso ao barramento, o registro do dispositivo, a configuração e a lógica da aplicação.
4. Registre o dispositivo e confirme se ele aparece em `list_device`.
5. Teste-o da mesma forma que testou os dispositivos ADC, PWM, I2C e de armazenamento nos tutoriais anteriores.
6. Adicione tratamento de erros para hardware ausente, argumentos inválidos, timeouts e suspensão/retomada.
7. Se o driver puder ser reutilizado, empacote-o como componente do SDK em vez de copiá-lo entre produtos.

**Critério de sucesso:** o código da aplicação encontra e usa o driver pelo modelo de dispositivos padrão do RT-Thread, e o driver se comporta de forma previsível durante inicialização, operação, tratamento de erros e transições de suspensão/despertar.

**Solução de problemas:** se o driver funcionar apenas a partir de um arquivo específico da aplicação, provavelmente está ignorando o modelo de dispositivos. Refatore-o até que seu uso seja semelhante ao dos dispositivos integrados.

**O que você aprendeu:** como ampliar o ecossistema do SDK de forma organizada, sem criar um passivo de manutenção.

## Checklist de liberação para validação de produto { #advanced-release-checklist }

- [ ] Os valores de consumo foram medidos, são repetíveis e estão associados a cenários de teste identificados.
- [ ] O sucesso das atualizações OTA, as verificações de integridade e a recuperação após interrupções foram testados conforme a política documentada do produto; o rollback só é considerado validado se estiver implementado no projeto do produto.
- [ ] A inicialização do display personalizado é validada com padrões antes de adicionar a complexidade do LVGL.
- [ ] Os procedimentos de profiling e coredump estão documentados para a equipe.
- [ ] O Bluetooth com múltiplas conexões foi testado em reconexões e casos-limite envolvendo o telefone ou o acessório.
- [ ] Os drivers personalizados usam o modelo de dispositivos do RT-Thread e tratam a suspensão e o despertar.
- [ ] Os testes de carga combinada incluem display, Bluetooth, armazenamento, áudio, sensores e IA, quando aplicável.

## Próximos passos { #where-to-go-next }

A esta altura, você já tem um conjunto completo de ferramentas: periféricos, middleware, compreensão de coexistência, disciplina de consumo, OTA, inicialização de hardware personalizado, análise pós-falha e integração de drivers. Daqui em diante, consulte o catálogo de [Exemplos](../../develop/examples/index.md) e a [Visão geral de gráficos](../../learn/graphics/overview.md) como referências contínuas. Consulte os tópicos conforme cada necessidade, em vez de percorrê-los em sequência.
