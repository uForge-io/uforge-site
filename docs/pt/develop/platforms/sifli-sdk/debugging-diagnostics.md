---
icon: lucide/bug
description: "Depure o firmware SF32 com sftool, AssertDump, SiFli_Trace e o shell RT-Thread, seguindo uma sequência reproduzível e uma lista para relatar falhas."
tags:
    - Desenvolvimento
    - Depuração
---

# Depuração e diagnóstico { #debugging-and-diagnostics }

Comece a depuração do SF32 pelos logs seriais. Dependendo do chip, da versão do SDK e da configuração do projeto, também podem estar disponíveis ferramentas para gerar dumps de falha, capturar traces e acessar o shell RT-Thread; use apenas os fluxos documentados para o alvo.

## Verificações iniciais { #first-line-debugging }

Use o console serial para coletar:

- Logs de inicialização.
- Saídas da aplicação.
- Saída do shell RT-Thread, se estiver habilitado no projeto.
- Mensagens de falha.
- Saída de assert ou da falha, incluindo o arquivo e a linha informados, o PC da primeira falha e os dados da pilha, quando disponíveis.
- Comportamento durante o download do firmware e a reinicialização.

Guarde os logs junto com a revisão da placa, a branch do SDK, os comandos de compilação e gravação e as configurações da serial.

## Sequência de depuração { #debugging-order }

1. Reproduza o problema com o mesmo firmware.
2. Verifique se ele volta a ocorrer após uma reinicialização.
3. Verifique se ele volta a ocorrer depois de gravar novamente o firmware completo.
4. Verifique se o exemplo do SDK mais próximo também apresenta o problema.
5. Reintroduza as alterações específicas do produto uma por vez.

Essa sequência ajuda a distinguir problemas de hardware, do suporte da placa, do middleware e da aplicação.

## Ferramentas úteis { #tools-to-know }

<div align="center"><em>Tabela: Ferramentas úteis</em></div>

<div align="center" markdown>

| Ferramenta | Uso |
|:-----|:----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | Ferramenta de linha de comando serial para ler, gravar ou apagar Flash e reiniciar chips compatíveis; as opções dependem do chip e do armazenamento. |
| [`SiFli_Trace`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/SifliTrace/SifliTrace_UM.html) | Captura e análise dos logs da placa pelo fluxo compatível com o alvo. |
| [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/UsartServer/UsartServer_UM.html) | Ferramenta auxiliar para depurar via UART usando o Debug IP integrado. O [guia v2.5.1](https://docs.sifli.com/projects/sdk/v2.5.1/sf32lb52x/tools/UsartServer/UsartServer_UM.html) lista SF32LB52X e SF32LB56X; um guia em inglês mais recente também menciona `SF322LB57`. Confirme a compatibilidade com o chip e o SDK exatos, sem presumir que todos os alvos são cobertos. |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/AssertDump/AssertDump_UM.html) e [ferramentas de análise de falhas](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html) | Use somente quando disponíveis para o chip e a versão do SDK; siga o procedimento de coleta e análise documentado para essa versão. |
| Shell RT-Thread | Inspeção e comandos em tempo de execução somente se a configuração do projeto habilitar o shell. |

</div>

## O que verificar primeiro { #what-to-inspect-first }

<div align="center"><em>Tabela: O que verificar primeiro</em></div>

<div align="center" markdown>

| Sintoma | Primeiras verificações |
|:--------|:-------------|
| Hard fault ou assert | Tamanho da pilha, ponteiros nulos, buffers DMA e manutenção de cache. |
| Periférico sem resposta | Multiplexação dos pinos, clock, linha de alimentação, nome da placa e ativação do driver. |
| Bluetooth instável | Clock de RF, caminho da antena, configuração da stack Bluetooth e parâmetros de conexão. |
| Artefatos no display | Temporização do painel, formato do buffer e sincronização de cache/DMA. |
| Reinicialização aleatória | Watchdog, alimentação, queda de tensão (brownout) e estouro de pilha. |
| Logs de HCPU/LCPU ausentes | Verifique a atribuição UART, `ulog`, pinmux e a inicialização do LCPU. |

</div>

Nos exemplos LB551 citados, o HCPU usa UART1 e o LCPU usa UART3 em PB45/PB46. Confirme que o HCPU não usa UART3 também, verifique em `pinmux.c` a sobreposição de multiplexação QSPI3/UART1 e confirme que o LCPU foi iniciado; alguns exemplos exigem `lcpu on` ou `lcpu_power_on()`.

## Lista para relatar falhas { #crash-report-checklist }

Ao relatar uma falha, inclua:

- Placa e revisão.
- Variante do chip.
- Branch ou commit do SDK.
- Exemplo ou projeto exato.
- Comando de build e nome da placa.
- Comando de gravação da Flash.
- Log serial de inicialização desde a reinicialização.
- Dump da falha ou saída do assert.
- Se o problema também ocorre em um exemplo do SDK sem modificações.

## Fontes oficiais { #official-sources }

- [SiFli-SDK: Depuração e logs](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/debug_logging.html)
- [SiFli-SDK: Guia de análise de falhas](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html)
- [OpenSiFli SiFli-Wiki: Depuração de logs (em chinês)](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/log.md)
- [OpenSiFli SiFli-Wiki: Recuperar falhas com dump de memória (em chinês)](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/dump.md)
