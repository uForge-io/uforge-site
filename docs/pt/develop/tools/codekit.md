---
icon: lucide/app-window
description: "Como a extensão SiFli CodeKit para VS Code se integra ao desenvolvimento com SiFli-SDK: configuração do projeto, compilação, gravação, monitoramento e solução de problemas."
tags:
    - Desenvolvimento
    - CodeKit
---

# CodeKit { #codekit }

SiFli CodeKit é a extensão do VS Code para desenvolvimento com SiFli-SDK. Ela orienta a configuração do SDK, a criação e a configuração de projetos e os fluxos de compilação, gravação e monitoramento.

Para a primeira execução, consulte [Primeiros passos com o CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md). Esta página explica como o CodeKit se encaixa no fluxo de desenvolvimento.

Referência principal:

- [Primeiros passos com o SiFli CodeKit](https://docs.sifli.com/projects/codekit/get-started/)

## Quando usar o CodeKit { #best-use-cases }

Use o CodeKit quando você precisar de:

- Um fluxo de trabalho do SDK integrado ao VS Code.
- Configuração guiada do projeto.
- Configuração da placa e do projeto diretamente no editor.
- Ações de compilação, gravação e monitoramento sem memorizar cada comando.
- Um caminho de entrada mais simples para quem está começando com SiFli-SDK.

Use o fluxo do SDK pela linha de comando para escrever scripts de CI, investigar problemas nos caminhos da cadeia de ferramentas ou preparar procedimentos de fábrica e de lançamento. O CodeKit facilita o trabalho do desenvolvedor, mas não substitui o entendimento do processo de compilação do SDK.

## Relação com o SiFli-SDK { #relationship-to-sifli-sdk }

O CodeKit oferece uma interface para executar o fluxo do SDK, mas não substitui o SDK. Os mesmos conceitos fundamentais continuam importantes:

- Diretório raiz do SDK.
- Nome da placa.
- Diretório do projeto.
- Saída da compilação.
- Caminho de gravação/download.
- Monitor serial.

Se uma ação do CodeKit falhar, reproduza, quando possível, o comando correspondente do SDK. Isso deixa os relatos de erro mais claros e ajuda a separar problemas da extensão de problemas do SDK.

Consulte [SiFli-SDK](../platforms/sifli-sdk/overview.md) para escolher uma base de referência com suporte e [Compilar, gravar e monitorar a saída serial](../platforms/sifli-sdk/build-flash-monitor.md) para registrar as evidências equivalentes pela linha de comando. Antes de adaptar um projeto do CodeKit, comece por um [exemplo do SDK](../examples/index.md) compatível.

## Modelo operacional { #operational-model }

A extensão é mais útil quando as ações executadas no editor podem ser reproduzidas com o SDK subjacente. Trate o CodeKit como a interface de controle e o SiFli-SDK como a fonte de referência para a cadeia de ferramentas, a definição da placa, os resultados da compilação e os arquivos de download.

A página [Primeiros passos com o CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md) explica como instalar a extensão e executar `hello_world`. Depois que essa configuração básica funcionar, use o CodeKit para encurtar o ciclo editar–compilar–gravar–monitorar. Recorra à linha de comando do SDK quando precisar automatizar, inspecionar ou reproduzir uma ação fora do VS Code.

## O que registrar { #what-to-record }

Para cada projeto do CodeKit, registre:

- Versão da extensão CodeKit.
- Caminho do SiFli-SDK e branch do SDK.
- Placa selecionada no CodeKit.
- Nome correspondente da placa no SDK.
- Diretório de saída da compilação.
- Comportamento de gravação/download.
- Taxa de transmissão (baud rate) do monitor serial.

Com esses dados, você poderá reproduzir pela linha de comando uma ação feita na interface gráfica, quando necessário.

## Delimitação das falhas { #failure-boundaries }

<div align="center"><em>Tabela: Estratégia de solução de problemas</em></div>

<div align="center" markdown>

| Falha | Próxima etapa recomendada |
|:--------|:---------------|
| SDK não encontrado | Selecione novamente o diretório raiz do SDK e confirme que a instalação foi concluída. |
| Falha na compilação | Se possível, reproduza o problema com o mesmo projeto usando `scons`. |
| A gravação falha embora a configuração de referência tenha funcionado | Compare a placa e os resultados do projeto com a configuração funcional; depois, verifique se a porta está ocupada e confira o modo de download. |
| O monitor exibe caracteres ilegíveis | Confira a taxa de transmissão e a porta selecionada. |
| Comando não aparece na interface | Abra a paleta de comandos e pesquise por `SiFli`. |

</div>
