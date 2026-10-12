---
icon: lucide/wrench
description: "Mapa de ferramentas para desenvolvimento SF32: sftool, scripts UART do SDK, ações do CodeKit, ferramentas de análise de falhas e traces, além de utilitários para recursos gráficos e produção."
tags:
    - Desenvolvimento
    - Ferramentas
---

# Ferramentas { #tools }

Desenvolver para SF32 exige mais do que um compilador. Um fluxo prático também envolve ferramentas para gravação, monitoramento serial, análise de falhas, captura de traces, conversão de imagens, ajuste de RF/áudio e programação na fábrica.

A tabela abaixo relaciona tarefas comuns às ferramentas correspondentes. Ela serve como orientação e não substitui os manuais; consulte a documentação vinculada para instruções de instalação, comandos exatos e procedimentos específicos de cada ferramenta.

## Visão geral das ferramentas { #tool-map }

<div align="center"><em>Tabela: Visão geral das ferramentas</em></div>

<div align="center" markdown>

| Ferramenta | Uso |
|:-----------|:----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | Ferramenta multiplataforma para baixar e gravar firmware em SF32, usada nos fluxos OpenSiFli com Zephyr e Arduino. |
| [Scripts UART de gravação do SDK](../platforms/sifli-sdk/build-flash-monitor.md) | Scripts para a primeira gravação, gerados durante a compilação do SiFli-SDK. |
| [Ações do CodeKit](codekit.md) | Configuração, compilação, gravação e monitoramento pelo VS Code. |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/AssertDump/AssertDump_UM.html) | Captura de dados da memória no momento de uma falha para análise posterior. |
| [`SiFli_Trace`](https://docs.sifli.com/projects/solution/6.tools/index.html) / [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/UsartServer/UsartServer_UM.html) | Captura de traces/logs e depuração por UART usando o Debug IP do chip. |
| [`Impeller`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/Impeller/Impeller_UM.html) | Gravação de firmware, calibração e testes de PCBA na linha de produção. |
| [eZip / ferramentas de imagem](../../learn/graphics/ezip.md) | Conversão de recursos para pipelines gráficos com compressão. |
| [Ferramentas de RF, áudio e fábrica](https://docs.sifli.com/projects/solution/6.tools/index.html) | Calibração, testes e ajustes para produção. |

</div>

## Ferramentas de gravação { #flashing-tools }

No primeiro bring-up, use os scripts UART gerados pelo SDK: eles correspondem à compilação que você acabou de fazer. Inclua o `sftool` quando precisar de:

- Uma ferramenta de linha de comando consistente para gravar firmware em diferentes fluxos de trabalho.
- Integração com `west flash` do Zephyr.
- Suporte ao processo de upload do ArduinoCore-zephyr.
- Automação em CI, na fábrica ou em testes de regressão.

Mantenha os dois métodos documentados no projeto até que a equipe adote um padrão único.

## Ferramentas de logs e traces { #logging-and-trace-tools }

Para o desenvolvimento cotidiano, um terminal serial costuma bastar. Diante de falhas graves, capture logs estruturados e dados da falha:

- Salve o log completo de inicialização, desde o reset.
- Guarde os arquivos ELF, map e de símbolos que correspondam exatamente à imagem gravada.
- Registre se estavam ativos o shell do RT-Thread, o shell do Zephyr ou o modo de depuração do Arduino.
- Quando disponíveis, use as ferramentas de diagnóstico da SiFli para analisar dumps de asserção e capturar traces.

## Ferramentas para recursos gráficos e produção { #asset-and-production-tools }

Produtos com uso intensivo de recursos gráficos devem documentar o processo de conversão desses recursos, sobretudo quando usam compressão eZip ou aceleração gráfica por hardware. Em produtos destinados à fabricação, documente as ferramentas de RF, áudio e produção separadamente das ferramentas de gravação usadas pelos desenvolvedores, para que a equipe da fábrica não dependa de comandos exclusivos do ambiente de desenvolvimento.

## Checklist para escolher ferramentas { #tool-selection-checklist }

<div align="center"><em>Tabela: Checklist para escolher ferramentas</em></div>

<div align="center" markdown>

| Necessidade | Ferramenta indicada |
|:------------|:--------------------|
| Gravação inicial de firmware pelo SDK | Script UART de gravação do SDK. |
| Gravação multiplataforma por script | `sftool`. |
| Compilar e monitorar pelo VS Code | CodeKit. |
| Falha após a inicialização | Log serial e ferramenta de análise de dumps de asserção. |
| Captura prolongada de traces | Ferramentas de servidor para captura de traces e UART. |
| Pipeline de recursos para display | eZip/ferramentas de imagem. |
| Programação na fábrica | Ferramentas de produção da SiFli e procedimentos controlados. |

</div>

## Recomendações práticas { #practical-advice }

- Aprenda a usar um método confiável de gravação antes de adicionar outro.
- Guarde logs seriais de referência, comprovadamente funcionais, para cada placa.
- Use os scripts gerados pelo SDK no primeiro bring-up.
- Use `sftool` quando precisar repetir a gravação pela linha de comando em fluxos Zephyr, Arduino ou automatizados.
- Adote ferramentas de análise de falhas antes de encontrar um problema difícil de reproduzir.
