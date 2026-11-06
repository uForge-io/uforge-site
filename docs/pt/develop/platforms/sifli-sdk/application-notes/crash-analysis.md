---
icon: lucide/file-search-2
title: "Capturar logs e analisar falhas"
description: "Capture logs e memória correspondentes, recupere o contexto de uma falha e analise asserts ou HardFaults com as ferramentas SiFli-SDK."
tags: [Desenvolvimento, SiFli-SDK, Notas de aplicação, Depuração]
---

# Capturar logs e analisar falhas { #capture-logs-and-analyze-crashes }

Os guias `debug_logging` e `crash_analysis` do SDK se complementam: os logs mostram o que cada um dos dois núcleos estava executando, enquanto uma imagem de memória capturada permite que o depurador recupere o contexto da falha. Guarde com cada captura o ELF exato, os arquivos map/symbol, a revisão do SDK, o modelo do chip, a configuração e a revisão da placa.

## Escolher a conexão de depuração { #choose-a-debug-connection }

<div align="center" markdown>

<em>Tabela: Conexões de depuração e log por família SF32</em>

| Família | Comportamento de depuração e log |
|---|---|
| SF32LB52x, SF32LB56x, SF32LB58x | Os guias da SiFli para essas famílias documentam a captura por UART, `SifliUsartServer`/`AssertDumpUart` e a recuperação com J-Link/Trace32. Use o transporte que permanecer disponível no estado de suspensão selecionado. |
| SF32LB55x | O SWD pode alternar entre HCPU e LCPU usando `$SDK_ROOT/tools/segger/jlink_hcpu_a0.bat` e `jlink_lcpu_a0.bat`. O console ROM do LCPU usa UART3 a 1 000 000 baud; o HCPU pode usar UART1/2 ou SWD. Como o SWD usa os pinos PB, mantenha o LPSYS ativo ou em light sleep durante a conexão. |

</div>

Quando o LPSYS sai do standby, o SWD volta para o HCPU. Um reset do J-Link não altera, por si só, o núcleo selecionado. Se o log assíncrono estiver habilitado, o dump de assert poderá ficar truncado; para registrar a falha, use uma captura síncrona ou um mecanismo que retenha os dados.

## Capturar um pacote em tempo real ou post-mortem { #capture-a-live-or-post-mortem-package }

A CLI atual de `sdk.py` oferece suporte a J-Link em todas as séries e a UART DEBUG IP direta somente em SF32LB52X e SF32LB56X. Para as demais famílias, use J-Link; os métodos antigos AssertDump/UART abaixo são fluxos distintos.

!!! note "Escopo do exemplo"
    O comando abaixo é um exemplo para SF32LB52/LB525. Mantenha a estrutura do comando, mas substitua o chip/modelo, o núcleo, o transporte e o ELF por valores compatíveis com a família e a versão do SDK de destino.

```text
sdk.py crash-dump capture-live --transport uart --probe /dev/ttyUSB0 \
  --chip SF32LB52 --chip-model LB525 \
  --output /tmp/live-crash --elf build_hcpu/main.elf
```

Para exportar também a PSRAM, adicione `--include-psram` ou use `--psram-size 8MB` para selecionar manualmente o script da PSRAM. Para J-Link por IP via `SifliUsartServer`, use `--transport jlink --jlink-ip 127.0.0.1:19025`; selecione o núcleo afetado com `--core hcpu` ou `--core lcpu`. O pacote de falha contém os binários capturados, `manifest.json` e `sdk_manifest.json`; quando `--elf` é informado, ele é copiado como `hcpu.axf`. `log.txt` é copiado de `capture.log` apenas em `capture-live --transport jlink`, ou é fornecido por `--log` em `export-coredump`.

Em versões antigas do SDK, use o método específico da família indicado no guia correspondente da SiFli:

- UART: `SifliUsartServer` ou `AssertDumpUart` pode exportar um pacote de assert enquanto o console estiver disponível.
- J-Link/SWD: adicione o J-Link ao `PATH` e execute o script da família de destino. Por exemplo, no SF32LB55x, use `$SDK_ROOT/tools/crash_dump_analyser/script/save_ram_55x.bat`. O script correspondente salva a RAM, os registradores EPIC e a PSRAM.
- Quando precisar de evidências de vazamento de heap, habilite `RTOS → RT-Thread Kernel → Memory Management → Enable memory trace`.

Em capturas feitas por script, escolha o arquivo `.jlink` de acordo com a família do alvo, a configuração de PSRAM e o método de conexão. Use um script no modo IP com o caminho `SifliUsartServer` e um script no modo USB para conexão direta por J-Link; uma incompatibilidade pode fazer a captura falhar.

![Opção de rastreamento de memória no menuconfig do SF32LB52x](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_mem_trace.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — habilite o rastreamento de memória antes de reproduzir uma falha quando precisar de evidências do heap.</em></div>

A captura por UART normalmente exige que o utilitário serial, o endereço do servidor e o núcleo de destino correspondam. O exemplo para Windows do guia SF32LB52x coloca as ferramentas em `SiFli_Trace_v2.3.0/Sifli_UsartServer_v2.8`, que contém `SifliUsartServer.exe`; o caminho e a versão locais podem variar. A captura das configurações de conexão mostra a UART1 do chip mapeada para a COM17 do computador host, baud rate de 1 000 000, servidor `127.0.0.1:19025` e núcleo de destino HCPU. São valores ilustrativos do guia, não padrões para outras placas ou ligações:

![Localização das ferramentas SiFli_Trace e SifliUsartServer](../../../../assets/develop/app-notes/crash-analysis/Sifli_Trace.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — diretório das ferramentas SiFli_Trace/SifliUsartServer, com utilitário de servidor versionado.</em></div>

![Configuração de conexão do SifliUsartServer para SF32LB52x](../../../../assets/develop/app-notes/crash-analysis/UsartServer52.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — UART1 mapeada para COM17, baud rate de 1 000 000, servidor `127.0.0.1:19025` e núcleo HCPU; são configurações de exemplo, não padrões universais.</em></div>

![Script para salvar RAM no analisador de crash dump](../../../../assets/develop/app-notes/crash-analysis/save_ram_uart_52.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — o diretório inclui scripts específicos da família e do transporte, como `save_ram_55x.bat`, `save_ram_58x.bat` e `save_ram_uart_52x.bat`; escolha o que corresponde ao alvo e à conexão.</em></div>

## Restaurar e analisar o contexto { #restore-and-analyze-the-context }

Converta o pacote capturado em um arquivo core legível pelo depurador e analise-o com o ELF correspondente:

```text
sdk.py crash-dump readcore --package /tmp/live-crash \
  --elf build_hcpu/main.elf --output /tmp/live-crash/coredump.elf
sdk.py crash-dump analyze --core /tmp/live-crash/coredump.elf \
  --elf build_hcpu/main.elf
```

No fluxo antigo com Trace32, carregue um pacote de assert do HCPU usando o botão HCPU assertion (HA) e `run_next_step`; para um dump do LCPU, use a configuração de recuperação do LCPU. Se a pilha de exceção não aparecer, confirme a seleção do núcleo, o ELF e as regiões de memória antes de interpretar os registradores.

![Exemplo de seleção do script de captura no Trace32](../../../../assets/develop/app-notes/crash-analysis/dump_select.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — comparação entre scripts `.jlink` para os modos IP e USB; a variante IP usa `127.0.0.1:19025`, enquanto a conexão direta do J-Link usa a variante USB.</em></div>

![Janela de assert do HCPU no Trace32](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_hcpu_window.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — após a recuperação, examine a pilha de chamadas e os painéis `TaskList`, `TaskSwitchHistory`, `heapAllocation`, `error_reason` e de desmontagem.</em></div>

## Parar cedo durante a inicialização ou diante de uma possível condição de corrida { #stop-early-during-boot-or-a-suspected-race }

Para depurar a inicialização, descomente a primeira instrução do `Reset_Handler` correspondente para que ela se torne `B .`:

Os caminhos de arquivos de inicialização abaixo são do SF32LB55x; para outra família, use os arquivos correspondentes.

- HCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_hcpu.S`
- LCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_lcpu.S`

Conecte o J-Link e avance o PC em dois bytes para continuar. Em C, `_asm("B .");` cria a mesma parada intencional. Não substitua por `while (1);`: o compilador pode eliminar o código que vem depois do loop.

## Analisar as evidências { #read-the-evidence }

Um dump de assert normalmente inclui a função e a linha do assert, a tabela de threads, o estado do mailbox e das filas de mensagens, mutexes, semáforos, uso do heap e registradores da CPU. Relacione o PC da falha ao ELF exato e verifique a margem de espaço na pilha, quem detém os recursos envolvidos em esperas bloqueadas, as entradas das filas e o último log anterior à falha. Preserve o dump bruto antes de simbolizá-lo.

Para inspeção interativa, o Ozone pode carregar os ELF de HCPU/LCPU e o arquivo SVD correspondente ao Cortex-M33 com FPU em `$SDK_ROOT/tools/svd_external`. Use UART ou `SifliUsartServer` quando o núcleo estiver em um estado que impeça a conexão por SWD. O ULOG pode usar UART; após habilitar o suporte a RTT, selecione `segger` como dispositivo de log do RT-Thread para usar Segger RTT.

## Instrumentar falhas de barramento e memória { #instrument-bus-and-memory-failures }

O monitor de barramento do SDK pode capturar acessos que levam a uma falha de barramento. Registre um callback com `dbg_busmon_reg_callback` e use `dbg_busmon_read` e `dbg_busmon_write`, como no exemplo de referência, para inspecionar o intervalo de endereços relevante. Combine isso com o rastreamento do heap e o pacote de falha; um dump de registradores sem símbolos ou contexto de memória raramente é suficiente.

![Exemplo de pilha de chamadas do heap no Trace32](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_heap_callstack.png){ loading="lazy" }
<div align="center"><em>Figura: Exemplo do guia do SF32LB52x — correlacione o manipulador de assert e a linha com a janela do despejo bruto da memória.</em></div>

Fontes oficiais por família: [análise de falhas do SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/crash_analysis.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/crash_analysis.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/crash_analysis.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/crash_analysis.html) e o [guia de depuração e logs](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/debug_logging.html).
