---
icon: lucide/app-window
description: "Primeiros passos com o SiFli CodeKit no VS Code: instale a extensão, selecione uma placa SF32, compile e grave o hello_world e abra o console serial."
tags:
    - Primeiros passos
    - SiFli CodeKit
    - VS Code
---

# SiFli CodeKit { #sifli-codekit }

O SiFli CodeKit é a extensão do VS Code para desenvolvimento com SiFli-SDK. Ele oferece ações guiadas para instalar as ferramentas do SDK, selecionar uma placa, compilar um exemplo, gravar o firmware e abrir um console serial.

Use este caminho se preferir trabalhar em uma IDE. Para entender os comandos executados pelos botões, consulte o [guia manual do SiFli-SDK](getting-started-sifli-sdk.md).

Este guia cobre a primeira configuração. Depois que `hello_world` funcionar, consulte a [referência canônica do CodeKit](../../develop/tools/codekit.md) para conhecer seu papel no trabalho diário, os requisitos de reprodutibilidade e os limites em caso de falha.

## O que você vai precisar { #what-youll-need }

**Hardware**

- Uma placa de desenvolvimento SF32 compatível com o SiFli-SDK.
- Um cabo de dados USB Type-C conectado à porta USB-to-UART da placa.
- Um computador com Windows, macOS ou Linux.

**Software**

- [Visual Studio Code](https://code.visualstudio.com/)
- A extensão SiFli CodeKit.
- Git, caso o CodeKit solicite clonar ou importar o SiFli-SDK.

**Referência oficial**

- [Guia oficial de instalação do SiFli CodeKit](https://docs.sifli.com/projects/codekit/get-started/install.html)

## Instale o CodeKit { #install-codekit }

1. Abra o VS Code.
2. Abra **Extensions**.
3. Pesquise **SiFli-SDK-CodeKit**.
4. Instale a extensão.
5. Se solicitado, recarregue o VS Code.

Para abrir o gerenciamento do SDK, clique no ícone da SiFli na barra lateral do VS Code e selecione **SDK Manager**. Você também pode abrir **View > Command Palette** (atalho padrão: `F1`) e executar **Manage SiFli SDK installation**. Os nomes exatos podem variar conforme a versão da extensão; consulte o guia oficial de instalação acima.

!!! tip
    Se não encontrar a ação desejada, abra a Command Palette e pesquise `SiFli`.

## Instale ou selecione o SiFli-SDK { #install-or-select-sifli-sdk }

Use o fluxo de configuração do CodeKit para instalar o SiFli-SDK ou indique o caminho de uma cópia que você já clonou. Para a maioria dos usuários, **Release/Tag** oferece uma base versionada e testada. Escolha **Branch** se precisar de correções ou recursos mais recentes e aceitar uma estabilidade possivelmente menor. O guia oficial descreve `release/vX.Y` como uma forma de obter as correções e os recursos mais recentes daquela linha de release sem usar a branch `main`, menos estável. Ainda assim, seu conteúdo pode mudar com o tempo.

Para usuários na China continental, o guia oficial recomenda o Gitee como origem do SDK e o espelho da SiFli para baixar a cadeia de ferramentas.

Se o CodeKit solicitar a localização do SDK, escolha um caminho curto e sem espaços, por exemplo:

=== "macOS / Linux"

    ```text
    ~/OpenSiFli/SiFli-SDK
    ```

=== "Windows"

    ```text
    C:\OpenSiFli\SiFli-SDK
    ```

O CodeKit usa o instalador e os scripts de ambiente do próprio SDK. O resultado deve ser igual ao da configuração manual: compilador, ambiente Python, ferramentas de compilação e ferramentas de gravação ficam prontos em conjunto.

## Abra um exemplo { #open-an-example }

Comece pelo exemplo `hello_world` do SDK:

```text
example/get-started/hello_world/rtt/project
```

Abra essa pasta de projeto no VS Code. Se o CodeKit oferecer um assistente de importação, selecione o projeto `hello_world` e permita que ele detecte a pasta raiz do SDK.

## Selecione a placa { #select-the-board }

Escolha a configuração correspondente ao seu hardware. Para uma placa do tipo SF32LB52-DevKit-LCD, o nome de configuração mais comum é:

```text
sf32lb52-lcd_n16r8
```

Se estiver usando outra placa, selecione o nome correspondente na lista do CodeKit ou na documentação de placas compatíveis do SDK. Esse nome determina a disposição da memória, o mapeamento de pinos, as configurações da Flash e os periféricos padrão.

## Compile { #build }

Execute a ação **Build** do CodeKit. Uma compilação bem-sucedida cria uma pasta de saída específica para a placa, como:

```text
build_sf32lb52-lcd_n16r8_hcpu
```

Se a compilação falhar imediatamente, confirme que o CodeKit conhece a localização do SiFli-SDK e que a instalação do ambiente do SDK foi concluída.

## Grave o firmware { #flash }

Conecte a placa pela porta USB-to-UART e execute a ação **Flash** ou **Download** do CodeKit.

Quando o programa solicitar a porta serial:

- No Windows, selecione a porta `COM` correspondente.
- No macOS, selecione o dispositivo `/dev/cu.*`, e não `/dev/tty.*`.
- No Linux, selecione o dispositivo `/dev/ttyUSB*` ou `/dev/ttyACM*` correspondente.

Se a ferramenta de download não colocar a placa no modo de download UART, reinicie-a imediatamente antes de iniciar a transferência. Se o problema persistir, siga as instruções de gravação específicas da placa.

## Abra o console serial { #open-the-serial-console }

Use o monitor serial do CodeKit, as ferramentas seriais do VS Code ou outro programa de terminal. Após reiniciar a placa, o console deverá exibir logs de inicialização legíveis e a saída do exemplo `hello_world`.

Se os logs de inicialização estiverem legíveis, a placa e as configurações seriais estão corretas. Se a saída aparecer ilegível, feche os outros programas seriais e confira a taxa de transmissão usada pelo exemplo.

## Verifique se está tudo certo { #success-check }

Você pode prosseguir quando:

- O CodeKit reconhecer a localização do SDK.
- A placa selecionada corresponder ao seu hardware.
- As ações de compilação e gravação forem concluídas.
- O console serial exibir a saída de `hello_world` após a reinicialização.

## Solução de problemas { #troubleshooting }

<div align="center"><em>Tabela: solução de problemas</em></div>

<div align="center" markdown>

| Sintoma | Verificação |
|:--------|:------|
| Nenhuma porta serial aparece | Teste um cabo de dados, outra porta USB ou o conector USB-to-UART da placa. |
| O CodeKit não encontra o SDK | Execute novamente a configuração do CodeKit e selecione a pasta raiz do SiFli-SDK. |
| A compilação não encontra as ferramentas | Deixe o CodeKit reinstalar a cadeia de ferramentas ou execute manualmente o instalador do SDK uma vez. |
| A gravação não começa | Se a ferramenta não entrar no modo de download UART, reinicie a placa imediatamente antes da transferência. Se o problema persistir, siga as instruções de gravação específicas da placa. |
| A saída serial está ilegível | Confira o baud rate e verifique se apenas um monitor serial está aberto. |

</div>

## Próximos passos { #where-to-go-next }

- Use o [SiFli-SDK](getting-started-sifli-sdk.md) para conhecer os comandos equivalentes no terminal.
- Depois que `hello_world` funcionar, continue com os [tutoriais para iniciantes](../tutorials/beginner.md).
- Ao começar a desenvolver uma funcionalidade real do produto, consulte a [visão geral de Bluetooth](../../learn/bluetooth/overview.md), a [visão geral de gráficos](../../learn/graphics/overview.md), a [visão geral de áudio](../../learn/audio/overview.md) e a [visão geral de baixo consumo](../../learn/low-power/overview.md).

## Registre uma configuração reproduzível { #what-sifli-should-add }

Anote as versões do CodeKit e do SDK, a tag ou branch escolhida e o target exato da placa. Se um nome de menu ou comando for diferente, consulte o [guia oficial de instalação](https://docs.sifli.com/projects/codekit/get-started/install.html) e a [lista de placas compatíveis](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) para as versões instaladas.
