---
icon: lucide/trending-up
description: "Tutoriais SF32 de integração de subsistemas: sensores I2C, uma interface LVGL básica, serviço periférico BLE, reprodução local de áudio, armazenamento em sistema de arquivos e testes de coexistência."
tags:
    - Tutoriais
---

# Integração de subsistemas { #intermediate-tutorials }

Estes tutoriais pressupõem que você já conhece o conteúdo de [Primeiros periféricos](beginner.md): GPIO, shell, fundamentos de ADC/PWM e o padrão de driver `rt_device_find()`. Nesta etapa, você passa de periféricos isolados para middleware e fluxos de trabalho integrados: sensores I2C, interface gráfica, serviços BLE, reprodução de áudio, armazenamento persistente e testes básicos de coexistência.

O objetivo não é apenas fazer cada subsistema funcionar uma vez. É aprender como o firmware SF32 costuma ser montado: começar por um exemplo adequado do SDK, validar o caminho de hardware, conectá-lo à camada de dispositivos do RT-Thread ou ao middleware e, então, testá-lo junto com o restante do produto.

Use esta série quando os periféricos individuais já funcionarem e surgirem riscos de integração, como memória compartilhada, temporização, consumo de energia, ligações específicas da placa e interações entre componentes de middleware. Ao concluir cada exercício, você deve ter um subsistema bem delimitado e testável, não apenas uma demonstração visual.

## Antes de começar { #before-you-start }

Os exemplos em C são trechos, não arquivos-fonte completos. Inclua os cabeçalhos, as declarações, o tratamento de erros e a liberação de recursos necessários ao seu projeto e à versão do SDK.

Os caminhos dos exemplos e as placas compatíveis podem variar conforme a versão do SDK. Antes de compilar, confira a lista “Supported Platforms” e os requisitos de hardware e configuração de cada exemplo; o suporte a um exercício não garante que a mesma placa também suporte os demais.

<div align="center"><em>Tabela: Verificações antes de começar</em></div>

<div align="center" markdown>

| Requisito | Por que importa |
|:------------|:---------------|
| Shell funcional | Você precisa dos comandos `list_thread` e `list_device`, dos logs e de recursos para inspeção rápida. |
| Entrada/saída GPIO já validada | Muitas demonstrações com middleware ainda dependem de botões, LEDs ou interrupções. |
| Esquemático da placa | Os pinos I2C e do display, o caminho de áudio e a configuração de armazenamento variam conforme a placa. |
| Configuração-base funcional | Preserve uma compilação comprovadamente funcional antes de combinar recursos. |
| Possibilidade de medir corrente | A integração de subsistemas pode alterar o consumo em repouso, mesmo quando tudo parece funcionar. |

</div>

## Leia um sensor via I2C { #read-a-sensor-over-i2c }

**Objetivo:** comunicar-se com um periférico I2C real, em vez de apenas controlar um pino GPIO.

**Tempo:** 30 a 45 minutos

**Comece por:** `example/hal/i2c/master` ou `example/rt_device/i2c/eeprom`

```c
struct rt_i2c_bus_device *bus = (struct rt_i2c_bus_device *)rt_device_find("i2c1");
struct rt_i2c_msg msgs[2] = { /* write register address, then read result */ };
rt_i2c_transfer(bus, msgs, 2);
```

O nome `i2c1` é apenas ilustrativo. Use o nome do dispositivo I2C registrado pela sua placa e confirme que `rt_device_find()` retorna um dispositivo válido antes de usar o barramento.

1. Consulte o datasheet do sensor para confirmar o endereço I2C, o mapa de registradores, a tensão de alimentação e os resistores de pull-up necessários.
2. Confirme qual barramento `i2cX` e quais pinos a placa utiliza.
3. Adapte o exemplo de EEPROM ou mestre I2C para se comunicar com o sensor. Se ele tiver um registrador de identificação, leia-o primeiro; caso contrário, comece por um registrador cujo comportamento esperado seja conhecido.
4. Decodifique uma medição real e imprima o resultado pelo shell.
5. Se o sensor tiver uma saída de interrupção ou data-ready, conecte-a seguindo o padrão de interrupção GPIO do exercício 2 de Primeiros periféricos.
6. Sempre que possível, substitua o polling periódico por leituras acionadas por eventos.

**Critério de sucesso:** o firmware lê corretamente um registrador conhecido (o de identificação do dispositivo, se disponível), decodifica um valor plausível do sensor e não bloqueia o sistema se o dispositivo estiver ausente.

**Solução de problemas:** se as leituras retornarem apenas `0xff`, apenas `0x00` ou expirarem por timeout, verifique a largura do endereço, a notação de endereço de 7 ou 8 bits, os pull-ups, a sequência de alimentação e se outro periférico está usando os mesmos pinos.

**O que você aprendeu:** transações I2C com vários bytes e como combinar um pino GPIO acionado por interrupção com um periférico de barramento.

## Crie uma interface LVGL básica { #build-a-basic-lvgl-screen }

**Objetivo:** exibir um elemento real de interface no display, em vez de escrever diretamente no framebuffer.

**Tempo:** 45 a 60 minutos

**Comece por:** `example/multimedia/lvgl/lvgl_v8_examples`

```c
lv_obj_t *label = lv_label_create(lv_scr_act());
lv_label_set_text(label, "Hello, SF32!");
lv_obj_align(label, LV_ALIGN_CENTER, 0, 0);
```

1. Faça o bring-up (ativação inicial) do driver do display e confirme que o painel exibe áreas de cor sólida antes de depurar os widgets LVGL.
2. Crie um rótulo e um widget de botão.
3. Configure o callback do botão para alterar o texto do rótulo.
4. Adicione uma animação simples e observe o uso de CPU ou o tempo de quadro pelas ferramentas do shell.
5. Antes de ampliar a interface, leia na [Visão geral de gráficos](../../learn/graphics/overview.md) as seções sobre estratégia de buffer, atualização parcial e ePicasso.

**Critério de sucesso:** a tela inicializa de forma consistente após um reset; a entrada por toque ou botão, se disponível e configurada, altera o estado da interface; e uma animação simples não impede o funcionamento do shell ou do Bluetooth.

**Solução de problemas:** separe problemas do painel dos problemas do LVGL. Se os preenchimentos de cor sólida falharem, verifique alimentação, reset, sequência de inicialização, formato de pixel e ordem dos bytes antes de alterar o código LVGL.

**O que você aprendeu:** o modelo de objetos e eventos do LVGL e a sequência de bring-up do display que serve de base para projetos com uso intenso de gráficos.

## Anuncie e conecte-se como periférico BLE { #advertise-and-connect-as-a-ble-peripheral }

**Objetivo:** permitir que um telefone ou dispositivo central BLE se comunique com a placa por meio de um serviço GATT real.

**Tempo:** 45 a 60 minutos

**Comece por:** `example/ble/peripheral`

1. Comece pelo exemplo simples de periférico e confirme a transmissão de anúncios BLE usando um aplicativo de varredura.
2. Conecte-se pelo telefone e confirme se o dispositivo permanece estável por vários minutos.
3. Para enviar dados de sensores, configure uma característica adequada no serviço GATT do exemplo e atualize-a com uma medição real, como a leitura do ADC do exercício 4 de Primeiros periféricos ou do sensor I2C do exercício 1 desta etapa.
4. Configure as propriedades necessárias da característica. Se for usar notificações, habilite-as e confirme se o telefone recebe as alterações.
5. Teste a desconexão e a reconexão, além de reiniciar a placa durante uma conexão.
6. Antes de projetar um serviço personalizado, leia a [Visão geral do Bluetooth](../../learn/bluetooth/overview.md#gatt-services-and-the-sibles-framework).

**Critério de sucesso:** o dispositivo transmite anúncios, estabelece a conexão, disponibiliza o serviço GATT configurado, troca dados conforme as propriedades escolhidas para a característica e retorna a um estado limpo após desconectar e reconectar.

**Solução de problemas:** teste estes cenários: vínculos BLE obsoletos, remoção do dispositivo pelo telefone, reinicialização da placa durante uma conexão e alteração dos parâmetros de conexão. Muitos problemas de BLE só aparecem depois da primeira conexão bem-sucedida.

**O que você aprendeu:** a sequência anúncio BLE -> conexão -> notificação GATT, usada pela maioria dos produtos BLE.

## Reproduza áudio local a partir do armazenamento { #play-local-audio-from-storage }

**Objetivo:** reproduzir um arquivo de áudio em vez de um tom sintetizado.

**Tempo:** 45 a 60 minutos

**Comece por:** `example/multimedia/audio/local_music`

A documentação atual lista `sf32lb52-lchspi-ulp` como plataforma compatível com `example/multimedia/audio/mp3_sd_player`. Não presuma que ele funciona na sua placa: antes de usá-lo, confira as [plataformas compatíveis e os requisitos de hardware](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html).

1. Copie um arquivo WAV ou MP3 pequeno para o armazenamento esperado pelo exemplo.
2. Compile e grave o exemplo.
3. Confirme se a reprodução começa, se o áudio está limpo e se a placa não reinicia quando a reprodução é iniciada.
4. Integre a lógica de início e parada da reprodução ao tratador de botão do exercício 2 de Primeiros periféricos.
5. Verifique se ocorrem underruns enquanto há logs no shell ou atualizações no display.
6. Antes de alterar a taxa de amostragem, o formato ou o tamanho do buffer, leia a [Visão geral de áudio](../../learn/audio/overview.md#playback-and-recording-basics).

**Critério de sucesso:** é possível iniciar, parar e reiniciar a reprodução repetidamente sem estalos, underruns ou permanência indevida em um estado de alto consumo.

**Solução de problemas:** se o áudio estiver distorcido, verifique a taxa de amostragem, a profundidade de bits, o caminho de saída, a configuração do codec, o formato do arquivo, o tamanho do buffer e se as leituras do armazenamento estão deixando o decodificador sem dados.

**O que você aprendeu:** como o middleware de áudio do SDK, a reprodução com buffer e a decodificação de arquivos funcionam em conjunto.

## Armazene e recupere dados persistentes { #store-and-retrieve-data-with-a-filesystem }

**Objetivo:** preservar dados entre reinicializações, em vez de perdê-los a cada reset.

**Tempo:** 30 a 45 minutos

**Comece por:** `example/storage/littlefs` ou `example/storage/flashdb`

Use LittleFS para dados organizados em arquivos. FlashDB é um banco de dados embarcado com modos de chave-valor (KVDB) e séries temporais (TSDB); o backend de armazenamento e as placas compatíveis dependem da configuração do exemplo. Antes de escolher o alvo, consulte a documentação oficial dos exemplos [LittleFS NOR](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/littlefs/nor/README.html) e [FlashDB](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/flashdb/README.html).

As chamadas POSIX abaixo ilustram o acesso a um sistema de arquivos montado; elas não são chamadas da API do FlashDB.

```c
int fd = open("/data/log.txt", O_WRONLY | O_CREAT | O_APPEND, 0666);
write(fd, buf, len);
close(fd);
```

1. Use um sistema de arquivos como o LittleFS para logs organizados em arquivos. Para configurações estruturadas ou registros com marcação de tempo, avalie os modos KVDB ou TSDB do FlashDB e escolha um backend compatível com a placa e o dispositivo de memória.
2. Confirme a partição e o caminho de montagem usados pelo exemplo.
3. Grave uma pequena entrada de log ou uma configuração.
4. Desligue e ligue novamente a placa e confirme se os dados continuam presentes.
5. Registre periodicamente as leituras do sensor do Tutorial 1.
6. Defina uma política simples de retenção para impedir que os logs cresçam indefinidamente.

**Critério de sucesso:** os dados permanecem após a reinicialização, e o firmware trata adequadamente os casos de armazenamento ausente, cheio ou recém-formatado.

**Solução de problemas:** verifique o layout das partições, o caminho de montagem, erros de apagamento ou gravação na Flash, o fechamento de arquivos e se a frequência das gravações é compatível com a vida útil esperada do armazenamento.

**O que você aprendeu:** quando usar um sistema de arquivos ou um banco de dados embarcado e como preservar o estado do produto após um reset.

## Combine dois subsistemas de forma intencional { #combine-two-subsystems-on-purpose }

**Objetivo:** executar dois subsistemas ao mesmo tempo e observar como eles afetam um ao outro.

**Tempo:** 1 hora

**Comece por:** dois dos Tutoriais 1 a 5 que sejam mais relevantes para o seu produto.

1. Escolha dois subsistemas que o produto realmente precise usar em conjunto, como BLE e um sensor I2C, ou LVGL e reprodução de áudio.
2. Primeiro, valide cada um de forma independente.
3. Combine-os fazendo o mínimo possível de alterações.
4. Exercite ambos ao mesmo tempo: envie uma notificação BLE durante uma leitura I2C, execute uma animação da interface durante a reprodução de áudio ou grave no armazenamento durante a atualização do sensor.
5. Observe o uso de CPU, os logs, a memória e o comportamento percebido pelo usuário.
6. Compare os resultados com a [Visão geral do Bluetooth](../../learn/bluetooth/overview.md#coexistence-with-other-workloads), a [Visão geral de gráficos](../../learn/graphics/overview.md#graphics-validation-matrix) e a [Visão geral de baixo consumo](../../learn/low-power/overview.md#what-drains-power-on-an-sf32-product).

**Critério de sucesso:** os dois subsistemas continuam funcionando durante a atividade simultânea, e a corrente em repouso retorna ao nível esperado quando o teste termina.

**Solução de problemas:** procure chamadas bloqueantes longas, excesso de logs, tempestades de temporizadores, gravações no armazenamento em caminhos sensíveis à latência e erros de cache em buffers compartilhados.

**O que você aprendeu:** subsistemas que funcionam isoladamente ainda podem interferir entre si quando compartilham tempo de CPU, largura de banda de memória, interrupções e política de energia.

## Checklist de integração de subsistemas { #intermediate-integration-checklist }

- [ ] Cada tutorial começa por um exemplo funcional do SDK, já validado.
- [ ] Cada caminho de hardware é validado primeiro: leitura de um registrador ou valor conhecido do sensor, preenchimento de cor no painel, anúncios BLE, saída de áudio ou montagem do sistema de arquivos.
- [ ] Quando aplicável, o recurso continua funcionando após reset e desconexão/reconexão.
- [ ] Os caminhos de erro foram testados: sensor ausente, arquivo inexistente, telefone desconectado e armazenamento cheio.
- [ ] Foi realizado pelo menos um teste com carga combinada.
- [ ] O comportamento em repouso foi verificado depois que cada recurso foi desativado.

## Próximos passos { #where-to-go-next }

[Validação de produto](advanced.md) aborda o ajuste de baixo consumo, atualizações OTA, a inicialização de displays e drivers personalizados, conexões Bluetooth simultâneas e depuração em produção. Essa etapa transforma demonstrações funcionais em firmware pronto para um produto.
