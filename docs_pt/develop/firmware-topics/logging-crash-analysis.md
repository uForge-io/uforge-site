---
icon: lucide/file-warning
description: "Planeje a captura de logs e a análise de falhas no firmware SF32 para diagnosticar problemas em campo, incluindo os dados mínimos, o fluxo de análise e os níveis de log por etapa."
tags:
    - Desenvolvimento
    - Logs
    - Análise de falhas
---

# Logs e análise de falhas { #logging-and-crash-analysis }

Os logs fazem parte do produto; não são apenas um recurso temporário de depuração. Um sistema de logs bem planejado agiliza o bring-up da placa, o diagnóstico em campo e a investigação de falhas na fábrica.

Planeje a captura de logs antes do primeiro teste em campo. Se um dispositivo falhar, você só poderá recuperar os dados que o firmware já estiver preparado para salvar ou emitir.

## Configuração mínima de logs { #minimum-logging-setup }

Registre os seguintes dados em cada compilação do firmware:

- Versão do firmware.
- Branch ou commit do SDK.
- Nome e revisão da placa.
- Motivo da inicialização.
- Versão do layout de partições.
- Resultados da inicialização dos principais subsistemas.
- Mensagens de falha ou de assert caso a inicialização não seja concluída.

## Fluxo de análise de falhas { #crash-analysis-flow }

1. Reproduza o problema em uma placa cuja configuração-base funcional tenha sido validada.
2. Capture o log completo de inicialização, desde o reset.
3. Salve o binário exato e os arquivos de símbolos correspondentes.
4. Decodifique a saída de assert ou dump com as ferramentas da SiFli.
5. Verifique o tamanho das pilhas, identifique quem é responsável por cada bloco de memória e examine os buffers de DMA e a manutenção de cache.
6. Isole o problema usando como referência o exemplo do SDK mais próximo do cenário.

## Níveis de log { #log-levels }

<div align="center"><em>Tabela: Níveis de log</em></div>

<div align="center" markdown>

| Fase | Logs recomendados |
|:------|:------------------|
| Bring-up da placa | Logs detalhados de periféricos e inicialização. |
| Desenvolvimento de funcionalidades | Logs de depuração por módulo relativos à funcionalidade em teste. |
| Ajuste do consumo de energia | Reduza os logs ao mínimo; a própria gravação de logs altera o consumo. |
| Versão candidata | Avisos, erros, versão, motivo da inicialização e verificações essenciais de integridade. |
| Versão de diagnóstico em campo | Logs direcionados ao subsistema suspeito. |

</div>

## O que incluir em um bom relatório de falha { #what-makes-a-good-crash-report }

- O log completo, do reset até a falha.
- A identificação exata do binário.
- Os arquivos de símbolos ou uma compilação reproduzível.
- A informação sobre se a falha também ocorre em um exemplo do SDK sem modificações.
- A lista de periféricos conectados e a fonte de alimentação.
- A informação sobre se a falha persiste após apagar toda a Flash e gravar o firmware novamente.
