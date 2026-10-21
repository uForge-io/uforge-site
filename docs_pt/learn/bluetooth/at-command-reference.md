---
icon: lucide/list
description: "Referência de comandos AT do módulo Bluetooth dual-mode SF32LB57 (SIFLI_AT): enquadramento, pareamento, conexões, transferência de dados, GATT, URCs e comandos PDU."
tags:
  - Bluetooth
---

# Referência de comandos AT { #at-command-reference }

<div align="center"><em>Tabela: Informações do documento</em></div>

<div align="center" markdown>

| Item | Conteúdo |
|:-----|:--------|
| Versão | V1.2.1 |
| Data | 2026-07-28 |
| Módulo aplicável | Módulo Bluetooth de modo dual SF32LB57 (SIFLI_AT) |

</div>

Esta referência documenta a interface externa de comandos AT da versão V1.2.1 do módulo Bluetooth de modo dual SF32LB57 (SIFLI_AT). Os comandos e as respostas são exibidos em fonte monoespaçada; `\r` representa retorno de carro (0x0D) e `\n`, avanço de linha (0x0A). Os comandos AT são transmitidos como texto ASCII, enquanto os campos binários dos quadros PDU usam ordem de bytes little-endian.

Esta é a especificação completa da interface AT referenciada na página Módulo de comandos AT Bluetooth.

<div align="center"><em>Tabela: Histórico de revisões</em></div>

<div align="center" markdown>

| Versão | Alterações | Data |
|:--------|:--------|:-----|
| V1.2.1 | SF32LB57 V1.2.1: adicionou `AT+CFGRESET`; atualizou a sincronização do nome Bluetooth Classic na inicialização, `CLEARLINKKEY`, o identificador da conexão e a documentação PDU; habilitou a configuração de compilação BQB. | 2026-07-28 |

</div>

## Visão geral { #overview }

O módulo Bluetooth de modo dual SF32LB57 oferece ao host uma interface de comandos AT via UART para BLE e Bluetooth Classic (BR/EDR). O host usa os comandos AT para configurar parâmetros do dispositivo, gerenciar conexões, enviar e receber dados e receber notificações de status não solicitadas do módulo.

### Configurações padrão { #default-settings }

<div align="center"><em>Tabela: Configurações padrão</em></div>

<div align="center" markdown>

| Item | Valor padrão |
|:-----|:----------------|
| Nome do dispositivo | `SIFLI_AT` |
| Baud rate da porta serial | 460800 bps |
| Modo de comando/transparente | Modo transparente |
| Modo de operação Bluetooth | Modo dual (BLE+BT) |
| Notificação de eventos | Notificação normal |
| Sufixo MAC no nome do dispositivo | Desativado |
| Class of Device (COD) | `000000` |
| Limite de MTU BLE | 247 |
| Configuração global de múltiplas conexões | Ativada (1) |
| Tempo para desconexão por inatividade no modo transparente | 0 (desativado) |
| Carregamento automático de GATT ao ligar | Ativado |
| Endereço aleatório BLE | Desativado (usa o endereço público) |
| Endereço Bluetooth | Gerado automaticamente a partir do UID do chip |

</div>

## Formato dos comandos { #command-format }

### Definição da sintaxe { #syntax-definition }

Os comandos AT são transmitidos como texto ASCII e terminados por um retorno de carro `\r` (0x0D). O prefixo é `AT+` para comandos no formato AT ou `AT>` para comandos no formato PDU. No SF32LB57, a porta AT é a USART1 e usa enquadramento 8N1, sem controle de fluxo por hardware, com baud rate padrão de 460800 bps. Cada quadro AT pode ter até 512 bytes.

### Comandos no formato AT { #at-format-commands }

<div align="center"><em>Tabela: Formas dos comandos no formato AT</em></div>

<div align="center" markdown>

| Forma | Comando | Descrição |
|:-----|:--------|:-------------|
| Consulta | `AT+<CMD>?\r` | Lê um parâmetro ou estado |
| Definição | `AT+<CMD>=<param>[,<param>...]\r` | Grava um parâmetro |
| Execução | `AT+<CMD>\r` | Aciona uma ação |

</div>

<div align="center"><em>Tabela: Respostas no formato AT</em></div>

<div align="center" markdown>

| Resultado | Texto de resposta |
|:-------|:------------------|
| Sucesso | `\r\nOK\r\n` |
| Falha | `\r\nERROR\r\n` ou `\r\nFALSE\r\n` |
| Valor retornado pela consulta | `\r\n+<CMD>:<value>\r\n\r\nOK\r\n` |

</div>

### Enquadramento dos comandos no formato PDU { #pdu-format-command-framing }

Os comandos PDU transferem dados binários enquanto o módulo está no modo de comando. Salvo indicação em contrário, os campos numéricos do quadro usam ordem little-endian, e `data` contém dados binários brutos.

**Comando (host → módulo)**

```
'A' 'T' '>' <Opcode(2 bytes)> <Total Length(2 bytes)> [Body] '\r'
```

<div align="center"><em>Tabela: Estrutura do quadro de comando PDU</em></div>

<div align="center" markdown>

| Elemento | Descrição |
|:--------|:-------------|
| `AT>` | Prefixo do comando, 3 bytes ASCII |
| Opcode | Código de operação de 2 bytes em little-endian: `0x0101`, `0x0102` |
| Total Length | Número total de bytes de Body, 2 bytes em little-endian |
| Body | Carga útil; a estrutura depende de Opcode |
| `\r` | Terminador do comando, 1 byte |

</div>

**Relatório (módulo → host)**

```
'\r' '\n' '<' <Opcode(2 bytes)> <Total Length(2 bytes)> [Data] '\r' '\n'
```

## Comandos e respostas { #commands-and-responses }

Os comandos a seguir estão agrupados por função, nas mesmas categorias da tabela de índice da página Módulo de comandos AT Bluetooth.

### Sistema e dispositivo { #system-and-device }

#### Consultar versão do firmware { #get-firmware-version }

<div align="center"><em>Tabela: Consulta da versão do firmware</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GFWVER?\r` |
| Resposta | Sucesso: `\r\n+GFWVER:SIFLI_AT_<version>_<build date>\r\n\r\nOK\r\n`; qualquer comando de configuração retorna `\r\nERROR\r\n`. |
| Parâmetros | Nenhum |
| Observações | Somente consulta. O valor retornado sempre começa com `SIFLI_AT_`, seguido do número da versão e da data de compilação. |

</div>

#### Consultar nome do dispositivo { #query-device-name }

<div align="center"><em>Tabela: Consulta do nome do dispositivo</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+NAME?\r` |
| Resposta | `\r\n+NAME:<device name>\r\n\r\nOK\r\n` |
| Parâmetros | Nenhum |
| Observações | Retorna o nome configurado no momento, sem o sufixo MAC. Esse sufixo afeta apenas o nome exibido nos anúncios. |

</div>

#### Definir nome do dispositivo { #set-device-name }

<div align="center"><em>Tabela: Definição do nome do dispositivo</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+NAME=<device name>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | Nome do dispositivo: texto com 1 a 29 bytes. Um valor vazio ou com mais de 29 bytes retorna `ERROR`. Padrão: `SIFLI_AT`. |
| Observações | Atualiza a configuração do nome e a sincroniza com o nome local e o nome enviado na resposta de varredura BLE. `MACNAME` controla o nome final anunciado. |

</div>

#### Consultar opção de sufixo MAC no nome { #query-mac-name-suffix-switch }

<div align="center"><em>Tabela: Consulta da opção de sufixo MAC no nome</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+MACNAME?\r` |
| Resposta | `\r\n+MACNAME:<value>\r\n\r\nOK\r\n` |
| Parâmetros | Nenhum |
| Observações | Retorna o estado atual da opção: 0 = desativada; 1 = ativada. |

</div>

#### Definir opção de sufixo MAC no nome { #set-mac-name-suffix-switch }

<div align="center"><em>Tabela: configuração da opção de sufixo MAC no nome</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+MACNAME=<value>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | Valor: 0 = exibe o nome do dispositivo sem alterações; 1 = acrescenta o sufixo `-XXXX` ao nome (XXXX corresponde aos dois bytes finais do BD_ADDR local em hexadecimal maiúsculo). Intervalo: 0–1. Padrão: 0. |
| Observações | Atualiza a configuração. Quando ativada, se o nome mais o sufixo ultrapassar o limite de 29 bytes, o nome do dispositivo será truncado para que o sufixo de 5 bytes caiba. |

</div>

#### Consultar ID de dispositivo IEEE 1284 { #query-ieee-1284-device-id }

<div align="center"><em>Tabela: consulta do ID de dispositivo IEEE 1284</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+1284ID?\r` |
| Resposta | `\r\n+1284ID:<ID string>\r\n\r\nOK\r\n` |
| Parâmetros | Nenhum |
| Observações | Retorna a cadeia do ID IEEE 1284 configurada no momento; fica vazia se não houver configuração. |

</div>

#### Definir ID de dispositivo IEEE 1284 { #set-ieee-1284-device-id }

<div align="center"><em>Tabela: configuração do ID de dispositivo IEEE 1284</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+1284ID=<ID string>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | Cadeia do ID: ID de dispositivo IEEE 1284. O comprimento deve ser menor que a capacidade do buffer de armazenamento; um valor maior retorna `ERROR`. O padrão é uma cadeia vazia. |
| Observações | Atualiza a configuração. |

</div>

#### Reinicializar dispositivo { #reset-device }

<div align="center"><em>Tabela: reinicialização do dispositivo</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+RESET\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; a forma de consulta (`AT+RESET?\r`) retorna `\r\nERROR\r\n` |
| Parâmetros | Nenhum |
| Observações | Ao receber o comando, o módulo salva a configuração AT atual, responde `OK`, interrompe os anúncios, encerra as conexões e faz uma reinicialização suave. O comando não altera a configuração por si só. |

</div>

#### Restaurar configurações de fábrica { #factory-reset }

<div align="center"><em>Tabela: restauração das configurações de fábrica</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+FACTORYRESET\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; a forma de consulta (`AT+FACTORYRESET?\r`) retorna `\r\nERROR\r\n` |
| Parâmetros | Nenhum |
| Observações | Restaura a configuração AT aos valores padrão e apaga a configuração personalizada dos serviços GATT, os vínculos BLE, os vínculos de pareamento do Bluetooth Classic (BR/EDR) e o endereço aleatório estático BLE; em seguida, responde `OK` e reinicializa o módulo. Após a reinicialização, o host deve aguardar `IM_READY`. |

</div>

#### Redefinir configuração { #configuration-reset }

<div align="center"><em>Tabela: redefinição da configuração</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+CFGRESET\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; a forma de consulta (`AT+CFGRESET?\r`) retorna `\r\nERROR\r\n` |
| Parâmetros | Nenhum |
| Observações | Restaura a configuração AT e a configuração personalizada de GATT salva; em seguida, responde `OK` e reinicializa o módulo. Os registros de pareamento e o endereço BLE atual são mantidos. |

</div>

#### Entrar no modo de atualização OTA { #enter-ota-upgrade-mode }

<div align="center"><em>Tabela: entrada no modo de atualização OTA</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+OTA\r` |
| Resposta | Sucesso: `\r\nOK\r\n` (depois, entra no modo DFU e reinicializa, sem enviar outra resposta); a forma de consulta (`AT+OTA?\r`) retorna `\r\nERROR\r\n` |
| Parâmetros | Nenhum |
| Observações | Primeiro salva a configuração AT atual e responde `OK`; em seguida, grava uma flag DFU e reinicializa no modo de atualização DFU via UART. |

</div>

#### Consultar calibração do desvio de frequência { #query-frequency-offset-calibration }

<div align="center"><em>Tabela: consulta da calibração do desvio de frequência</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+TRIM?\r` |
| Resposta | `\r\n+TRIM:<freq_off>\r\n\r\nOK\r\n` |
| Parâmetros | `freq_off`: valor de calibração do desvio de frequência registrado no momento, em Hz. |
| Observações | Retorna o valor de eco registrado na configuração AT; o valor efetivamente aplicado fica armazenado na partição `FACTORY_CFG_ID_CRYSTAL`. |

</div>

#### Definir calibração do desvio de frequência { #set-frequency-offset-calibration }

<div align="center"><em>Tabela: configuração da calibração do desvio de frequência</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+TRIM=<freq_off>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; valor fora do intervalo ou falha na interface de calibração: `\r\nERROR\r\n` |
| Parâmetros | `freq_off`: valor de calibração do desvio de frequência, em Hz, no intervalo de -120000 a 120000; padrão: 0. O valor 0 redefine a calibração e restaura o valor original de hardware/de fábrica; um valor diferente de zero é aplicado diretamente. |
| Observações | Ao definir esse valor, o comando atualiza o registrador do banco de capacitores HXT e grava o resultado na partição `FACTORY_CFG_ID_CRYSTAL`. Após uma calibração bem-sucedida, o valor registrado na configuração AT é atualizado e marcado para gravação. |

</div>

#### Entrar no modo de teste DUT { #enter-dut-test-mode }

<div align="center"><em>Tabela: entrada no modo de teste DUT</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+DUT\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; a forma de consulta (`AT+DUT?\r`) retorna `\r\nERROR\r\n` |
| Parâmetros | Nenhum |
| Observações | Define o bit de habilitação DUT do Bluetooth Classic BR/EDR e responde `OK`; depois, aguarda que o equipamento de teste inicie o teste de sinalização via rádio por meio de `LMP_test_control`. A UART AT (USART1) continua disponível. A entrada no modo DUT é irreversível: só é possível sair reinicializando o módulo. |

</div>

### Endereço e identidade { #address-and-identity }

#### Consultar endereço Bluetooth { #query-bluetooth-address }

<div align="center"><em>Tabela: consulta do endereço Bluetooth</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+LBDADDR?\r` |
| Resposta | Sucesso: `\r\n+LBDADDR:<addr>\r\n\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `addr`: endereço Bluetooth público atual, com 12 caracteres hexadecimais (maiúsculos, sem separadores), do byte mais significativo para o menos significativo; por exemplo, `001583112233`. |
| Observações | Retorna o endereço público lido do firmware; retorna `ERROR` se a leitura falhar. |

</div>

#### Definir endereço Bluetooth { #set-bluetooth-address }

<div align="center"><em>Tabela: configuração do endereço Bluetooth</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+LBDADDR=<addr>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `addr`: endereço Bluetooth a definir, com exatamente 12 caracteres hexadecimais e sem separadores, do byte mais significativo para o menos significativo; por exemplo, `001583112233`. |
| Observações | O endereço é gravado na configuração e entra em vigor após a reinicialização. O valor padrão de fábrica é composto apenas por zeros; nesse caso, o endereço é gerado automaticamente a partir do UID do chip. |

</div>

#### Consultar endereço BLE { #query-ble-address }

<div align="center"><em>Tabela: consulta do endereço BLE</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+BLEADDR?\r` |
| Resposta | Sucesso: `\r\n+BLEADDR:<addr>\r\n\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `addr`: endereço usado atualmente pelo BLE, com 12 caracteres hexadecimais (maiúsculos, sem separadores), do byte mais significativo para o menos significativo. |
| Observações | Se um endereço aleatório estático específico para BLE tiver sido gerado com `AT+RANDOMADDR=1`, retorna esse endereço; caso contrário, retorna o mesmo endereço público usado pelo Bluetooth. Retorna `ERROR` se a leitura falhar. |

</div>

#### Definir endereço BLE { #set-ble-address }

<div align="center"><em>Tabela: configuração do endereço BLE</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+BLEADDR=<addr>\r` |
| Resposta | `\r\nERROR\r\n` |
| Parâmetros | Nenhum |
| Observações | Este comando não permite definir diretamente o endereço BLE e sempre retorna `ERROR`. Um endereço aleatório estático BLE é gerado com `AT+RANDOMADDR=1`. |

</div>

#### Consultar opção de endereço aleatório BLE { #query-ble-random-address-switch }

<div align="center"><em>Tabela: consulta da opção de endereço aleatório BLE</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+RANDOMADDR?\r` |
| Resposta | `\r\n+RANDOMADDR:<n>\r\n\r\nOK\r\n` |
| Parâmetros | `n`: estado atual da opção; 0 = BLE usa o endereço público; 1 = BLE usa um endereço aleatório estático. |
| Observações | Nenhuma. |

</div>

#### Definir opção de endereço aleatório BLE { #set-ble-random-address-switch }

<div align="center"><em>Tabela: configuração da opção de endereço aleatório BLE</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+RANDOMADDR=<n>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `n`: 0 ou 1. 1 = habilita um endereço aleatório estático BLE derivado do endereço público (define como 1 os dois bits mais significativos do byte mais significativo; por exemplo, o endereço público `001583112233` gera o endereço BLE `C01583112233`); 0 = faz o BLE voltar a usar o endereço público. Outros valores ou caracteres adicionais retornam `ERROR`. Padrão: 0. |
| Observações | O estado da opção é atualizado na configuração. Se o valor for 1 e a leitura do endereço público falhar, a opção volta para 0 e o comando retorna `ERROR`. A alteração do endereço é gravada no NVDS e entra em vigor após a reinicialização. Executar `AT+RANDOMADDR=1` novamente deriva o mesmo endereço aleatório do endereço público, que não foi alterado. |

</div>

#### Consultar a Class of Device { #query-class-of-device }

<div align="center"><em>Tabela: consulta da Class of Device</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+CLASS?\r` |
| Resposta | Sucesso: `\r\n+CLASS:<cod>\r\n\r\nOK\r\n` (`<cod>` contém 6 dígitos hexadecimais maiúsculos) |
| Parâmetros | `cod`: Class of Device atual, sempre apresentada com 6 dígitos hexadecimais (24 bits menos significativos, formato `%06X`, preenchido com zeros à esquerda). |
| Observações | Retorna o valor atual da Class of Device. |

</div>

#### Definir a Class of Device { #set-class-of-device }

<div align="center"><em>Tabela: configuração da Class of Device</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+CLASS=<cod>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `cod`: Class of Device em formato hexadecimal (interpretada com `%X`), no intervalo de 0 a FFFFFF (24 bits). Padrão: `000000`. |
| Observações | Define a Class of Device e atualiza a configuração; durante a interpretação, somente os 24 bits menos significativos são mantidos. |

</div>

### Modo de operação e visibilidade { #operating-mode-and-visibility }

#### Consultar estado de detectabilidade { #query-discoverable-state }

<div align="center"><em>Tabela: consulta do estado de detectabilidade</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+DISCOVERABLE?\r` |
| Resposta | Sucesso: `\r\n+DISCOVERABLE:<state>\r\n\r\nOK\r\n` |
| Parâmetros | `state`: estado de detectabilidade atual. 0 = não detectável; 1 = detectável; 2 = parcialmente detectável (estado misto). O significado depende do modo de operação: no modo BLE (`BTMODE=1`), indica se os anúncios BLE estão ativos (1) ou não (0); no modo BT (`BTMODE=2`), considera a varredura de consulta e a varredura de página: 1 quando ambas estão ativas, 0 quando ambas estão inativas e 2 nos demais casos; no modo dual (`BTMODE=0`), vale 1 quando os anúncios BLE e as duas varreduras estão ativos, 0 quando todos estão inativos e 2 nos demais casos. |
| Observações | Apenas consulta o estado atual de detectabilidade; não altera o estado do dispositivo. |

</div>

#### Definir estado de detectabilidade { #set-discoverable-state }

<div align="center"><em>Tabela: configuração do estado de detectabilidade</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+DISCOVERABLE=<mode>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `mode`: 0 = desativa a detectabilidade; 1 = ativa a detectabilidade. |
| Observações | A ação depende do modo de operação atual: no modo BLE (`BTMODE=1`), ativa ou desativa os anúncios BLE; no modo BT (`BTMODE=2`), ativa ou desativa a varredura de consulta e a varredura de página; no modo dual (`BTMODE=0`), controla em conjunto os anúncios BLE e as duas varreduras. |

</div>

#### Consultar estado dos anúncios GATT { #query-gatt-advertising-state }

<div align="center"><em>Tabela: consulta do estado dos anúncios GATT</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTDISCOVER?\r` |
| Resposta | Sucesso: `\r\n+GATTDISCOVER:<state>\r\n\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `state`: estado real dos anúncios BLE no ar. 0 = não anunciando; 1 = anunciando. |
| Observações | Retorna o estado real dos anúncios BLE no ar. Não está disponível no modo somente BT (`BTMODE=2`); nesse caso, retorna `ERROR`. |

</div>

#### Controlar anúncios GATT { #set-gatt-advertising }

<div align="center"><em>Tabela: controle dos anúncios GATT</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTDISCOVER=<value>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `value`: 0 = interrompe os anúncios BLE; 1 = inicia os anúncios BLE. |
| Observações | Controla diretamente o início e a interrupção dos anúncios BLE. Não está disponível no modo somente BT (`BTMODE=2`). |

</div>

#### Consultar estado de detectabilidade do SPP { #query-spp-discoverable-state }

<div align="center"><em>Tabela: consulta do estado de detectabilidade do SPP</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+SPPDISCOVER?\r` |
| Resposta | `\r\n+SPPDISCOVER:<state>\r\n\r\nOK\r\n` |
| Parâmetros | `<state>`: estado atual da varredura de consulta, que controla a detectabilidade. 0 = desativada; 1 = ativada. |
| Observações | Retorna `ERROR` quando `AT+BTMODE` é 1 (somente BLE). |

</div>

#### Definir estado de detectabilidade do SPP { #set-spp-discoverable-state }

<div align="center"><em>Tabela: configuração do estado de detectabilidade do SPP</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+SPPDISCOVER=<state>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `<state>`: opção da varredura de consulta, que controla a detectabilidade. 0 = desativada; 1 = ativada. |
| Observações | Retorna `ERROR` quando `AT+BTMODE` é 1 (somente BLE). Altera apenas o bit da varredura de consulta e mantém inalterado o bit da varredura de página. |

</div>

#### Consultar disponibilidade do SPP para conexão { #query-spp-connectable-state }

<div align="center"><em>Tabela: consulta da disponibilidade do SPP para conexão</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+SPPCONNECT?\r` |
| Resposta | `\r\n+SPPCONNECT:<state>\r\n\r\nOK\r\n` |
| Parâmetros | `<state>`: estado atual da varredura de página, que controla a possibilidade de conexão. 0 = desativada; 1 = ativada. |
| Observações | Retorna `ERROR` quando `AT+BTMODE` é 1 (somente BLE). |

</div>

#### Definir disponibilidade do SPP para conexão { #set-spp-connectable-state }

<div align="center"><em>Tabela: configuração da disponibilidade do SPP para conexão</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+SPPCONNECT=<state>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `<state>`: opção da varredura de página, que controla a possibilidade de conexão. 0 = desativada; 1 = ativada. |
| Observações | Retorna `ERROR` quando `AT+BTMODE` é 1 (somente BLE). Altera apenas o bit da varredura de página e mantém inalterado o bit da varredura de consulta. |

</div>

#### Consultar modo de operação Bluetooth { #query-bluetooth-operating-mode }

<div align="center"><em>Tabela: consulta do modo de operação Bluetooth</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+BTMODE?\r` |
| Resposta | `\r\n+BTMODE:<mode>\r\n\r\nOK\r\n` |
| Parâmetros | `mode`: modo de operação Bluetooth atual. 0 = modo dual (BLE+BT); 1 = somente BLE; 2 = somente BT. |
| Observações | Nenhuma. |

</div>

#### Definir modo de operação Bluetooth { #set-bluetooth-operating-mode }

<div align="center"><em>Tabela: configuração do modo de operação Bluetooth</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+BTMODE=<mode>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `mode`: modo de operação Bluetooth. 0 = modo dual (BLE+BT); 1 = somente BLE; 2 = somente BT. Intervalo: 0–2. Padrão: 0 (modo dual). |
| Observações | A alteração atualiza a configuração e entra em vigor após a reinicialização. |

</div>

#### Consultar modo de comando { #query-command-mode }

<div align="center"><em>Tabela: consulta do modo de comando</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+COMMAND?\r` |
| Resposta | `\r\n+COMMAND:<mode>\r\n\r\nOK\r\n` |
| Parâmetros | `mode`: modo de operação atual. 0 = modo transparente; 1 = modo de comando. |
| Observações | Nenhuma. |

</div>

#### Definir modo de comando { #set-command-mode }

<div align="center"><em>Tabela: configuração do modo de comando</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+COMMAND=<mode>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `mode`: modo de operação. 0 = modo transparente; 1 = modo de comando. Após ligar, o módulo inicia no modo transparente. |
| Observações | A alteração entra em vigor imediatamente, mas não é persistente: após a reinicialização, o módulo volta ao modo transparente. Nesse modo, os dados recebidos pela porta serial são encaminhados sem alterações ao dispositivo conectado; no modo de comando, os dados seriais são interpretados como comandos AT. |

</div>

### Pareamento e segurança { #pairing-and-security }

#### Apagar informações de pareamento { #clear-pairing-information }

<div align="center"><em>Tabela: exclusão das informações de pareamento</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+CLEARLINKKEY\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; a forma de consulta `AT+CLEARLINKKEY?\r` retorna `\r\nERROR\r\n` |
| Parâmetros | Nenhum. |
| Observações | Apaga as informações de vínculo BLE e a chave de link do Bluetooth Classic. Após o sucesso, o dispositivo reinicializa; as configurações AT, como nome do dispositivo, baud rate e COD, são mantidas. Após a reinicialização, o host deve aguardar `IM_READY`. A forma de consulta não é compatível. |

</div>

### Porta serial e eventos { #serial-port-and-events }

#### Consultar baud rate da porta serial { #query-serial-baud-rate }

<div align="center"><em>Tabela: consulta do baud rate da porta serial</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+BAUD?\r` |
| Resposta | `\r\n+BAUD:<baud_rate>\r\n\r\nOK\r\n` |
| Parâmetros | `baud_rate`: baud rate configurado no momento, em bps. |
| Observações | Após a definição do baud rate, o dispositivo reinicializa; o novo valor entra em vigor depois da reinicialização. |

</div>

#### Definir baud rate da porta serial { #set-serial-baud-rate }

<div align="center"><em>Tabela: configuração do baud rate da porta serial</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+BAUD=<baud_rate>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `baud_rate`: baud rate da porta serial, em bps. Valores compatíveis: 38400, 57600, 115200, 230400, 460800, 921600 e 1000000. Padrão: 460800. |
| Observações | A alteração atualiza a configuração. |

</div>

#### Consultar opção de notificação de eventos { #query-event-reporting-switch }

<div align="center"><em>Tabela: consulta da opção de notificação de eventos</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+EVT?\r` |
| Resposta | `\r\n+EVT:<evt_silent>\r\n\r\nOK\r\n` |
| Parâmetros | `evt_silent`: estado atual da notificação de eventos. 0 = notificações normais; 1 = todas as notificações silenciadas. |
| Observações | Nenhuma. |

</div>

#### Definir opção de notificação de eventos { #set-event-reporting-switch }

<div align="center"><em>Tabela: configuração da opção de notificação de eventos</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+EVT=<evt_silent>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `evt_silent`: opção de notificação de eventos. 0 = notifica normalmente `IM_CONN`, `IM_DISCONN`, `IM_READY` e outros eventos; 1 = silencia todos (não os notifica). Padrão: 0 (notificação normal). |
| Observações | A alteração atualiza a configuração. Com o valor 1, os eventos de conexão estabelecida, desconexão e dispositivo pronto não são enviados pela porta serial. |

</div>

#### Consultar tempo limite de desconexão por inatividade no modo transparente { #query-pass-through-idle-disconnect-time }

<div align="center"><em>Tabela: consulta do tempo limite de desconexão por inatividade no modo transparente</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+IDLE?\r` |
| Resposta | `\r\n+IDLE:<idle_ms>\r\n\r\nOK\r\n` |
| Parâmetros | `idle_ms`: tempo limite atual para desconexão por inatividade, em milissegundos. |
| Observações | Nenhuma. |

</div>

#### Definir tempo limite de desconexão por inatividade no modo transparente { #set-pass-through-idle-disconnect-time }

<div align="center"><em>Tabela: configuração do tempo limite de desconexão por inatividade no modo transparente</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+IDLE=<idle_ms>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `idle_ms`: tempo limite para desconexão por inatividade no modo transparente, em milissegundos, no intervalo de 0 a 65535. Valores acima de 65535 retornam `ERROR`. O valor 0 desativa o recurso. Padrão: 0 (desativado). |
| Observações | O ajuste atualiza a configuração e só funciona no modo transparente: se passarem mais de `idle_ms` milissegundos desde o último dado recebido pela porta serial, todas as conexões existentes serão encerradas. Com `idle_ms` = 0, a desconexão por inatividade fica desativada. |

</div>

### Gerenciamento de conexões { #connection-management }

#### Consultar opção de múltiplas conexões { #query-multi-connection-switch }

<div align="center"><em>Tabela: consulta da opção de múltiplas conexões</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+MULTICONN?\r` |
| Resposta | `\r\n+MULTICONN:<n>\r\n\r\nOK\r\n` |
| Parâmetros | `<n>`: estado da opção principal de múltiplas conexões. 0 = desativada (uma conexão no total); 1 = ativada (conexões simultâneas até o limite de cada transporte). |
| Observações | Nenhuma. |

</div>

#### Definir opção de múltiplas conexões { #set-multi-connection-switch }

<div align="center"><em>Tabela: configuração da opção de múltiplas conexões</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+MULTICONN=<n>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `<n>`: 0 = desativa múltiplas conexões; 1 = ativa múltiplas conexões. Aceita apenas 0 ou 1. Padrão: 1. |
| Observações | A alteração atualiza a configuração. Com a opção desativada, a capacidade de manter conexões simultâneas fica limitada; quando ativada, os limites são definidos por `AT+BLEMULTICONN` e `AT+BTMULTICONN`. |

</div>

#### Consultar o máximo de conexões BLE simultâneas { #query-maximum-ble-concurrent-connections }

<div align="center"><em>Tabela: consulta do máximo de conexões BLE simultâneas</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+BLEMULTICONN?\r` |
| Resposta | Sucesso: `\r\n+BLEMULTICONN:<n>\r\n\r\nOK\r\n`; com múltiplas conexões desativadas: `\r\nERROR\r\n` |
| Parâmetros | `<n>`: número máximo de conexões BLE simultâneas configurado no momento, em decimal. |
| Observações | Só pode ser consultado quando a opção de múltiplas conexões estiver ativada (`AT+MULTICONN=1`); caso contrário, retorna `ERROR`. |

</div>

#### Definir o máximo de conexões BLE simultâneas { #set-maximum-ble-concurrent-connections }

<div align="center"><em>Tabela: configuração do máximo de conexões BLE simultâneas</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+BLEMULTICONN=<n>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `<n>`: número máximo de conexões BLE simultâneas, em decimal, no intervalo de 1 a 6. Padrão: 3. |
| Observações | Só pode ser definido quando a opção de múltiplas conexões estiver ativada (`AT+MULTICONN=1`). A alteração atualiza a configuração. Quando o número de conexões atinge o limite, os anúncios são interrompidos e o dispositivo deixa de aceitar novas conexões; os anúncios são retomados automaticamente quando o número cai abaixo do limite. |

</div>

#### Consultar o máximo de conexões Classic Bluetooth simultâneas { #query-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>Tabela: consulta do máximo de conexões Classic Bluetooth simultâneas</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+BTMULTICONN?\r` |
| Resposta | Sucesso: `\r\n+BTMULTICONN:<n>\r\n\r\nOK\r\n`; com múltiplas conexões desativadas: `\r\nERROR\r\n` |
| Parâmetros | `<n>`: número máximo de conexões Classic Bluetooth (BR/EDR) simultâneas configurado no momento, em decimal. |
| Observações | Só pode ser consultado quando a opção de múltiplas conexões estiver ativada (`AT+MULTICONN=1`); caso contrário, retorna `ERROR`. |

</div>

#### Definir o máximo de conexões Classic Bluetooth simultâneas { #set-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>Tabela: configuração do máximo de conexões Classic Bluetooth simultâneas</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+BTMULTICONN=<n>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `<n>`: número máximo de conexões Classic Bluetooth simultâneas, em decimal, no intervalo de 1 a 7. Padrão: 7. |
| Observações | Só pode ser definido quando a opção de múltiplas conexões estiver ativada (`AT+MULTICONN=1`). A alteração atualiza a configuração. Quando o número de conexões atinge o limite, o módulo interrompe a varredura de página e a retoma automaticamente quando o número cai abaixo do limite. |

</div>

#### Desconectar { #disconnect }

<div align="center"><em>Tabela: desconexão</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | Desconectar uma conexão: `AT+DISCONN=<conn_hdl>\r`; desconectar todas: `AT+DISCONN\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha ou conexão não encontrada: `\r\nERROR\r\n` |
| Parâmetros | `<conn_hdl>`: identificador da conexão em hexadecimal. Os identificadores BLE externos começam em 1 (como os retornados por `AT+CONNLIST`); conexões BT usam o identificador ACL. `<conn_hdl>` = 0 é inválido e retorna `ERROR`. |
| Observações | Sem parâmetro (ou com parâmetro vazio), desconecta todos os links ativos (BLE e BR/EDR) e retorna `OK`. Com um parâmetro, procura primeiro o identificador externo da conexão BLE (identificador interno = `<conn_hdl>` - 1); se não encontrar, procura o identificador ACL bruto do BT. Se não houver conexão correspondente, retorna `ERROR`. A forma de consulta `AT+DISCONN?` retorna `ERROR`. |

</div>

#### Consultar lista de conexões { #query-connection-list }

<div align="center"><em>Tabela: consulta da lista de conexões</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+CONNLIST?\r` ou `AT+CONNLIST\r` |
| Resposta | Cada conexão ativa é exibida em uma linha: `\r\n+CONNLIST:<conn_hdl>,<type>,<addr>,<extra>\r\n`; após todas as linhas, é enviado `\r\nOK\r\n`. Se não houver conexões ativas, retorna apenas `\r\nOK\r\n`. Um parâmetro não vazio retorna `\r\nERROR\r\n`. |
| Parâmetros | Campos retornados: `<conn_hdl>` — identificador da conexão, 4 dígitos hexadecimais; para BLE, é um identificador externo numerado a partir de 1. `<type>` — tipo de conexão, BLE ou BT. `<addr>` — endereço Bluetooth do dispositivo remoto, 12 dígitos hexadecimais (do byte mais significativo para o menos significativo). `<extra>` — MTU atual para conexões BLE ou canal de serviço para conexões BT, em decimal. |
| Observações | Se o comando for enviado com um parâmetro não vazio, retorna `ERROR`. O módulo verifica todos os slots de conexão e lista cada conexão ativa. |

</div>

### Transferência de dados { #data-transfer }

#### Consultar MTU BLE { #query-ble-mtu }

<div align="center"><em>Tabela: consulta da MTU BLE</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GMTU?\r` |
| Resposta | Sucesso: `\r\n+GMTU:<mtu>\r\n\r\nOK\r\n` |
| Parâmetros | `mtu`: limite máximo de MTU BLE configurado no momento, em decimal. |
| Observações | Nenhuma. |

</div>

#### Definir MTU BLE { #set-ble-mtu }

<div align="center"><em>Tabela: configuração da MTU BLE</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GMTU=<mtu>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nFALSE\r\n` |
| Parâmetros | `mtu`: limite de MTU BLE, em decimal, no intervalo de 23 a 1024; valores fora do intervalo retornam `FALSE`. Padrão: 247. |
| Observações | Esse valor define o limite usado durante a negociação da MTU. |

</div>

#### Enviar dados por SPP { #send-spp-data }

<div align="center"><em>Tabela: envio de dados por SPP</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+SPPSEND=<conn_hdl>,<data>\r` ou `AT+SPPSEND=,<data>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `conn_hdl`: identificador da conexão BT de destino, em hexadecimal. Pode ser omitido ou definido como 0; nesse caso, usa-se a primeira conexão BT ativa. `data`: dados a enviar, em cadeia hexadecimal na qual cada par de caracteres representa um byte. Não pode estar vazio e deve conter um número par de caracteres. O comprimento efetivo também está limitado ao tamanho máximo de um único quadro AT ASCII. |
| Observações | `conn_hdl` e `data` são separados por uma vírgula; a vírgula continua obrigatória quando `conn_hdl` é omitido. A forma de consulta não é compatível. |

</div>

### GATT personalizado { #custom-gatt }

#### Consultar lista de serviços GATT personalizados { #query-custom-gatt-service-list }

<div align="center"><em>Tabela: consulta da lista de serviços GATT personalizados</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTSRV?\r` |
| Resposta | Para cada serviço configurado, retorna uma linha `\r\n+GATTSRV:<idx>,<char_count>,<state>\r\n`, seguida por `\r\nOK\r\n`. Se nenhum serviço estiver configurado, retorna apenas `\r\nOK\r\n`. |
| Parâmetros | `idx`: número do slot do serviço, de 0 a 5. `char_count`: número de características configuradas para esse serviço. `state`: `REG` indica que o serviço foi registrado na pilha de protocolos; `CFG` indica que está configurado apenas na RAM e ainda não foi registrado. |
| Observações | Lista somente os slots de serviço em uso. |

</div>

#### Criar serviço GATT personalizado { #create-custom-gatt-service }

<div align="center"><em>Tabela: criação de serviço GATT personalizado</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTSRV=<idx>,<uuid>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `idx`: número do slot do serviço, de 0 a 5. `uuid`: UUID do serviço, informado como cadeia hexadecimal do byte mais significativo para o menos significativo — 4 caracteres para UUID de 16 bits ou 32 para UUID de 128 bits. |
| Observações | `idx` deve ser um único dígito, imediatamente seguido por uma vírgula. O UUID deve ter exatamente 4 ou 32 caracteres; qualquer outro comprimento retorna `ERROR`. Um slot já registrado na pilha de protocolos não pode ser reconfigurado, e a tentativa de criação retorna `ERROR`. Criar um serviço apaga a configuração anterior desse slot. |

</div>

#### Excluir serviço GATT personalizado { #delete-custom-gatt-service }

<div align="center"><em>Tabela: exclusão de serviço GATT personalizado</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTSRV=<idx>,DEL\r` |
| Resposta | `\r\nOK\r\n` |
| Parâmetros | `idx`: número do slot do serviço, de 0 a 5. |
| Observações | Apaga a configuração desse slot na RAM. Um serviço já registrado na pilha de protocolos não pode ser removido durante a execução; este comando limpa somente a configuração na RAM. |

</div>

#### Consultar características GATT personalizadas { #query-custom-gatt-characteristic-list }

<div align="center"><em>Tabela: consulta das características GATT personalizadas</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTCHAR?<svc>\r` |
| Resposta | Para cada característica do serviço, retorna uma linha `\r\n+GATTCHAR:<svc>,<chr>,prop=0x<prop>,len=<max_len>\r\n`, seguida por `\r\nOK\r\n`; se o serviço não existir, retorna `\r\nERROR\r\n`. |
| Parâmetros | `svc`: número do slot do serviço, de 0 a 5. `chr`: índice da característica. `prop`: bits de propriedade da característica, em hexadecimal. `max_len`: comprimento máximo do valor da característica. |
| Observações | Nenhuma. |

</div>

#### Adicionar característica GATT personalizada { #add-custom-gatt-characteristic }

<div align="center"><em>Tabela: adição de característica GATT personalizada</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTCHAR=<svc>,<chr>,<uuid>,<prop>,<len>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `svc`: número do slot do serviço, de 0 a 5. `chr`: índice da característica, de 0 a 7. `uuid`: UUID da característica, do byte mais significativo para o menos significativo; 4 caracteres para 16 bits ou 32 para 128 bits. `prop`: cadeia de propriedades formada pelos caracteres R (leitura), W (escrita com resposta), w (escrita sem resposta), N (notificação) e I (indicação). `len`: comprimento máximo do valor da característica, de 1 a 512. |
| Observações | Os cinco parâmetros são obrigatórios; a omissão de qualquer um retorna `ERROR`. O UUID deve ter exatamente 4 ou 32 caracteres. `prop` deve conter ao menos um caractere de propriedade reconhecido; se nenhum for reconhecido, retorna `ERROR`. Caracteres não reconhecidos dentro de `prop` são ignorados. `len` igual a 0 ou acima de 512 retorna `ERROR`. O serviço pai deve ter sido criado e ainda não pode ter sido registrado na pilha de protocolos. |

</div>

#### Iniciar (registrar) serviços GATT personalizados { #start-register-custom-gatt-services }

<div align="center"><em>Tabela: início (registro) de serviços GATT personalizados</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTSTART\r` |
| Resposta | `\r\n+GATTSTART:<count>\r\n`, seguida por `\r\nOK\r\n`; a forma de consulta `AT+GATTSTART?\r` retorna `\r\nERROR\r\n`. |
| Parâmetros | `count`: número de serviços registrados com sucesso na pilha de protocolos por esta chamada. |
| Observações | Registra na pilha de protocolos cada serviço em uso que ainda não foi registrado e possui pelo menos uma característica. Depois de registrado, o serviço não pode ser removido nem reconfigurado durante a execução. A forma de consulta não é compatível. |

</div>

#### Enviar dados de característica GATT (notificação/indicação) { #send-gatt-characteristic-data-notifyindicate }

<div align="center"><em>Tabela: envio de dados de característica GATT (notificação/indicação)</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTSEND=<svc>,<chr>,<conn_hdl>,<hex>\r`; sem o identificador da conexão: `AT+GATTSEND=<svc>,<chr>,,<hex>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n`; a forma de consulta `AT+GATTSEND?\r` retorna `\r\nERROR\r\n`. |
| Parâmetros | `svc`: número do slot do serviço. `chr`: índice da característica. `conn_hdl`: identificador hexadecimal da conexão BLE, numerado a partir de 1; pode ser omitido. `hex`: dados a enviar, expressos como uma sequência hexadecimal com número par de caracteres. O comprimento efetivo também é limitado ao tamanho máximo de um quadro AT ASCII. |
| Observações | Se `conn_hdl` for omitido, usa-se a primeira conexão BLE ativa. O serviço de destino já deve estar registrado e o índice da característica deve ser válido. Se as propriedades da característica incluírem Indicate (I), será enviada uma indicação; caso contrário, será enviada uma notificação. |

</div>

#### Salvar configuração GATT personalizada na flash { #save-custom-gatt-configuration-to-flash }

<div align="center"><em>Tabela: gravação da configuração GATT personalizada na flash</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTSTORE\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n`; a forma de consulta `AT+GATTSTORE?\r` retorna `\r\nERROR\r\n`. |
| Parâmetros | Nenhum. |
| Observações | Persiste na flash a configuração atual de todos os serviços e características. Somente os dados de configuração são salvos; informações de execução, como o estado de registro, não são persistidas. Retorna `ERROR` se o KVDB não estiver pronto ou se a gravação falhar. A forma de consulta não é compatível. |

</div>

#### Apagar configuração GATT personalizada da flash { #clear-custom-gatt-configuration-in-flash }

<div align="center"><em>Tabela: exclusão da configuração GATT personalizada da flash</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTCLEAR\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; a forma de consulta `AT+GATTCLEAR?\r` retorna `\r\nERROR\r\n`. |
| Parâmetros | Nenhum. |
| Observações | Exclui da flash a configuração GATT salva. Não altera a configuração atual na RAM. A forma de consulta não é compatível. |

</div>

#### Consultar carregamento automático do GATT na inicialização { #query-gatt-auto-load-on-power-up-switch }

<div align="center"><em>Tabela: consulta do carregamento automático do GATT na inicialização</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTAUTOSTART?\r` |
| Resposta | `\r\n+GATTAUTOSTART:<v>\r\n\r\nOK\r\n` |
| Parâmetros | `v`: estado atual da opção. 0 = desativada; 1 = ativada. Padrão: 1. |
| Observações | Nenhuma. |

</div>

#### Definir carregamento automático do GATT na inicialização { #set-gatt-auto-load-on-power-up-switch }

<div align="center"><em>Tabela: configuração do carregamento automático do GATT na inicialização</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+GATTAUTOSTART=<v>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `v`: estado da opção. 0 = desativada; 1 = ativada. Padrão: 1. |
| Observações | A alteração atualiza a configuração. Quando ativada, o dispositivo carrega automaticamente a configuração salva dos serviços GATT ao ligar. |

</div>

## Eventos não solicitados (URC) { #unsolicited-events-urc }

Os eventos a seguir são notificações de status enviadas espontaneamente pelo módulo; o host não precisa emitir um comando para recebê-las. A opção de notificação de eventos (`AT+EVT`) controla seu envio. No modo silencioso, nenhuma delas é enviada.

### IM_READY: indicação de prontidão { #im_ready-ready-indication }

<div align="center"><em>Tabela: indicação de prontidão IM_READY</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | Nenhum (enviado espontaneamente pelo firmware, não pelo usuário). |
| Resposta | Texto da notificação: `\r\nIM_READY\r\n` |
| Parâmetros | Nenhum. |
| Observações | Enviado uma vez quando o módulo conclui a inicialização e fica disponível; também é enviado novamente quando todas as conexões são encerradas e o número de conexões volta a zero. O envio é controlado por `AT+EVT`; com `AT+EVT=1` (modo silencioso), essa notificação é suprimida. |

</div>

### IM_CONN: indicação de conexão { #im_conn-connection-indication }

<div align="center"><em>Tabela: indicação de conexão IM_CONN</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | Nenhum (enviado espontaneamente pelo firmware quando uma conexão é estabelecida). |
| Resposta | Modo de comando: `\r\nIM_CONN <hdl>,<addr>,<mtu>\r\n`; modo transparente: `\r\nIM_CONN\r\n` |
| Parâmetros | `hdl`: identificador da conexão, exatamente 4 dígitos hexadecimais maiúsculos, preenchidos com zeros à esquerda. Para BLE, o identificador externo é numerado a partir de 1 (identificador interno mais 1); os demais tipos exibem o valor bruto. `addr`: endereço do dispositivo remoto, com 12 dígitos hexadecimais, do byte mais significativo para o menos significativo. `mtu`: MTU da conexão atual, em decimal. |
| Observações | No modo de comando, cada conexão estabelecida gera uma notificação com o identificador, o endereço remoto e a MTU. No modo transparente, a notificação é enviada somente quando o número de conexões é 1 (primeira conexão), sem parâmetros. O envio é controlado por `AT+EVT`; com `AT+EVT=1` (modo silencioso), essa notificação é suprimida. |

</div>

### IM_DISCONN: indicação de desconexão { #im_disconn-disconnect-indication }

<div align="center"><em>Tabela: indicação de desconexão IM_DISCONN</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | Nenhum (enviado espontaneamente pelo firmware quando uma conexão é encerrada). |
| Resposta | Modo de comando: `\r\nIM_DISCONN:<hdl>\r\n` |
| Parâmetros | `hdl`: identificador da conexão encerrada, exatamente 4 dígitos hexadecimais maiúsculos, preenchidos com zeros à esquerda. Para BLE, o identificador externo é numerado a partir de 1 (valor bruto mais 1); os demais tipos exibem o valor bruto. |
| Observações | A notificação contém somente o identificador e é enviada apenas no modo de comando; não é enviada no modo transparente. Em ambos os modos, quando todas as conexões são encerradas e o número volta a zero, também é enviado `\r\nIM_READY\r\n`. O envio é controlado por `AT+EVT`; com `AT+EVT=1` (modo silencioso), essa notificação é suprimida. |

</div>

## Comandos no formato PDU { #pdu-format-commands }

### Notificação de dados PDU (opcode 0x0101) { #pdu-data-report-opcode-0x0101 }

<div align="center"><em>Tabela: notificação de dados PDU (módulo → host, opcode 0x0101)</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | Nenhum (enviado espontaneamente pelo firmware no modo de comando). |
| Resposta | `\r\n< + opcode(2-byte little-endian) + len(2-byte little-endian) + body + \r\n` |
| Parâmetros | `opcode` é fixo em `0x0101`; `body` = `conn_hdl` (2 bytes em little-endian) + `data`. BLE usa o identificador externo numerado a partir de 1; SPP usa o identificador ACL bruto. |
| Observações | No modo de comando, quando dados são gravados em uma característica BLE personalizada ou recebidos pelo SPP do Bluetooth Classic, o módulo os envia ao host no formato acima. No modo transparente, os dados são enviados diretamente. |

</div>

### Envio de dados PDU (seleção automática da característica Notify, opcode 0x0101) { #pdu-mode-send-data-auto-select-notify-characteristic-opcode-0x0101 }

<div align="center"><em>Tabela: envio de dados PDU (seleção automática da característica Notify, opcode 0x0101)</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | Quadro binário (não é uma linha AT textual): `AT>` + opcode (2 bytes em little-endian) + len (2 bytes em little-endian) + body + `\r`. Aqui, opcode = `0x0101` (sequência de bytes 01 01); len é o número de bytes de body; body = `conn_hdl` (2 bytes em little-endian) + `data`. `data` é a carga útil a enviar. |
| Resposta | Não há resposta textual. O firmware encaminha `data` ao dispositivo remoto conforme o tipo de conexão, sem responder `OK`/`ERROR`. |
| Parâmetros | `opcode`: fixo em `0x0101`. `len`: comprimento de body, de 2 a 508 (quadros abaixo de 2 ou acima de `AT_RX_BUF_SIZE`-4 são descartados; `AT_RX_BUF_SIZE` = 512). `conn_hdl`: identificador da conexão de destino; para BLE, valor externo numerado a partir de 1; para SPP, identificador ACL bruto. `data`: bytes da carga útil, comprimento = len-2, que pode ser 0. |
| Observações | `conn_hdl` é resolvido primeiro como identificador BLE numerado a partir de 1 (isto é, `conn_hdl`-1 corresponde a um slot BLE); se não houver correspondência, procura-se o valor bruto em um slot SPP. Se a conexão não for encontrada, o quadro é descartado. Para BLE, o firmware percorre os serviços GATT personalizados e seleciona automaticamente a primeira característica com a propriedade Notify ou Indicate; se não houver nenhuma, nada é enviado. Para SPP (BR/EDR), `data` é enviado pelo canal SPP. O quadro deve ser seguido imediatamente por `\r`; caso contrário, o quadro atual é descartado. Se não chegarem bytes novos antes do limite de timeout PDU entre quadros, o estado de recepção PDU é reiniciado. |

</div>

### Envio de dados PDU (serviço e característica específicos, opcode 0x0102) { #pdu-mode-send-data-specify-service-and-characteristic-opcode-0x0102 }

<div align="center"><em>Tabela: envio de dados PDU (serviço e característica específicos, opcode 0x0102)</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | Quadro binário (não é uma linha AT textual): `AT>` + opcode (2 bytes em little-endian) + len (2 bytes em little-endian) + body + `\r`. Aqui, opcode = `0x0102` (sequência de bytes 02 01); len é o número de bytes de body; body = `conn_hdl` (2 bytes em little-endian) + `svc_idx` (1 byte) + `char_idx` (1 byte) + `data`. |
| Resposta | Não há resposta textual. O firmware envia `data` ao dispositivo remoto pelo serviço e pela característica especificados, sem responder `OK`/`ERROR`. |
| Parâmetros | `opcode`: fixo em `0x0102`. `len`: comprimento de body, de 4 a 508. O mínimo geral da camada de recepção é 2, mas este opcode exige ao menos 4 bytes para incluir `svc_idx`+`char_idx`; caso contrário, o quadro é descartado. `conn_hdl`: identificador BLE de destino, numerado a partir de 1 (valor externo). `svc_idx`: índice do serviço GATT personalizado. `char_idx`: índice da característica nesse serviço. `data`: bytes da carga útil, comprimento = len-4, que pode ser 0. |
| Observações | Apenas conexões BLE são compatíveis; se a conexão resolvida for SPP, o quadro é descartado. `svc_idx` deve corresponder a um serviço personalizado registrado e `char_idx` deve ser menor que o número de características desse serviço; caso contrário, o quadro é descartado. A característica especificada deve ter a propriedade Notify ou Indicate; caso contrário, o quadro é descartado. `conn_hdl` segue a mesma regra de resolução de `0x0101`: primeiro o identificador BLE numerado a partir de 1, depois o valor bruto. O quadro deve ser seguido imediatamente por `\r`. |

</div>

### Desconexão no modo PDU { #pdu-mode-disconnect }

<div align="center"><em>Tabela: desconexão no modo PDU</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | `AT+DISCONN\r` (sem parâmetro) ou `AT+DISCONN=<conn_hdl>\r` |
| Resposta | Sucesso: `\r\nOK\r\n`; falha: `\r\nERROR\r\n` |
| Parâmetros | `conn_hdl`: identificador hexadecimal da conexão a encerrar. Para BLE, usa-se o valor externo numerado a partir de 1; o valor não pode ser 0 (0 é inválido e retorna `ERROR`). Conexões SPP usam o identificador ACL bruto. |
| Observações | Sem parâmetro, encerra todas as conexões atuais e retorna `OK`. Com um parâmetro, procura primeiro o identificador BLE numerado a partir de 1 (`conn_hdl`-1 corresponde a um slot BLE); se não houver correspondência, procura o valor bruto em um slot SPP. Se a conexão não for encontrada, retorna `ERROR`. Para BLE, a desconexão é iniciada com o código de motivo `0x13`; para SPP, é iniciada usando o endereço remoto. A forma de consulta `AT+DISCONN?` retorna `ERROR`. |

</div>

### Indicação de status da conexão PDU (IM_CONN / IM_DISCONN) { #pdu-connection-status-indication-im_conn-im_disconn }

<div align="center"><em>Tabela: indicação de status da conexão PDU (IM_CONN / IM_DISCONN)</em></div>

<div align="center" markdown>

| Campo | Conteúdo |
|:-----|:--------|
| Comando | Enviado espontaneamente pelo módulo, sem comando do host. `IM_CONN` é enviado quando uma conexão é estabelecida; `IM_DISCONN`, quando ela é encerrada. |
| Resposta | Conexão estabelecida no modo de comando: `\r\nIM_CONN <hdl>,<mac>,<mtu>\r\n`, em que `<hdl>` é um identificador com 4 dígitos hexadecimais, `<mac>` é um endereço com 12 dígitos hexadecimais (do byte mais significativo para o menos significativo) e `<mtu>` é a MTU em decimal. Desconexão no modo de comando: `\r\nIM_DISCONN:<hdl>\r\n` (`<hdl>` tem 4 dígitos hexadecimais). O modo transparente envia `\r\nIM_CONN\r\n` (sem parâmetros) somente quando a primeira conexão é estabelecida e não envia `IM_DISCONN` na desconexão. Ambos os modos enviam `\r\nIM_READY\r\n` quando todas as conexões são encerradas. |
| Parâmetros | `<hdl>`: identificador da conexão; para BLE, o valor externo corresponde ao identificador interno, numerado a partir de 0, mais 1; para SPP, usa-se o valor bruto. `<mac>`: endereço Bluetooth remoto. `<mtu>`: MTU negociada. |
| Observações | O envio é controlado por `AT+EVT`: com o valor 0 (padrão), as notificações são enviadas normalmente; com o valor 1, `IM_READY`/`IM_CONN`/`IM_DISCONN` são suprimidos. O formato e o conteúdo variam conforme o modo de operação atual (comando ou transparente), como descrito acima. |

</div>

## Apêndice { #appendix }

### Valores comuns de Class of Device { #common-class-of-device-values }

<div align="center"><em>Tabela: valores comuns de Class of Device</em></div>

<div align="center" markdown>

| Tipo de dispositivo | Valor hexadecimal |
|:-------------|:-----------|
| Computador | `0x000100` |
| Telefone | `0x000200` |
| Ponto de acesso LAN/rede | `0x000300` |
| Áudio/vídeo | `0x000400` |
| Periférico (teclado, mouse etc.) | `0x000500` |
| Dispositivo de imagem (impressora, scanner etc.) | `0x000600` |

</div>
