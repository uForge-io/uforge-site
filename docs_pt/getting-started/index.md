---
icon: lucide/rocket
title: "Visão geral: primeiros passos"
description: "Escolha seu primeiro caminho de desenvolvimento para SF32 — SiFli-SDK, CodeKit, Zephyr, Arduino, Rust ou MicroPython — e veja o status atual e o hardware necessário."
tags:
    - Primeiros passos
    - SF32
---

# Visão geral: primeiros passos { #getting-started }

Os dispositivos SF32 oferecem diferentes caminhos de desenvolvimento de software. Atualmente, SiFli-SDK e CodeKit são as opções oficiais para a primeira configuração e validação. Desde o Zephyr v4.3.0, o projeto principal do Zephyr mantém suporte para a placa SF32LB52 DevKit LCD. O OpenSiFli também oferece o ArduinoCore-zephyr em versão beta e desenvolve o suporte a Rust para SF32LB52. Para que o MicroPython possa ser apresentado em um tutorial validado, ainda são necessárias imagens oficiais de firmware e instruções específicas para cada placa.

Para conhecer o fluxo de desenvolvimento de referência e o escopo atual de cada caminho, consulte a [visão geral do desenvolvimento](../develop/index.md). Use a tabela abaixo apenas para escolher por onde começar; a página de cada plataforma é a referência oficial para placas compatíveis e respectivas limitações.

## Escolha seu caminho { #choose-your-path }

<div align="center"><em>Tabela: escolha seu caminho de desenvolvimento</em></div>

<div align="center" markdown>

| Caminho | Status atual | Comece aqui |
|:-----|:---------------|:-----------|
| **SiFli-SDK** | Caminho oficial da SiFli para desenvolvimento de referência em SF32, com RT-Thread, Bluetooth, gráficos, áudio, baixo consumo e preparação inicial das placas. | [SiFli-SDK](sifli/getting-started-sifli-sdk.md) |
| **SiFli CodeKit** | Fluxo oficial da SiFli para VS Code: configurar o SDK, criar projetos, compilar, gravar o firmware e usar o monitor serial. | [SiFli CodeKit](sifli/getting-started-sifli-codekit.md) |
| **Zephyr** | Desde o Zephyr v4.3.0, o projeto principal do Zephyr mantém suporte à `sf32lb52_devkit_lcd`. | [Zephyr upstream](zephyr/getting-started-zephyr-upstream.md) |
| **Arduino** | O OpenSiFli oferece uma versão beta do pacote ArduinoCore-zephyr para a SF32LB52 DevKit LCD. | [Arduino](arduino/getting-started-arduino.md) |
| **Rust** | O `sifli-rs` do OpenSiFli oferece um caminho de avaliação de Rust ainda em desenvolvimento; não está pronto para produção. | [Rust](rust/getting-started-rust.md) |
| **MicroPython** | Ainda precisa de imagens oficiais de firmware, comandos de gravação, configurações do REPL e informações sobre as APIs compatíveis. | [MicroPython](micropython/getting-started-micropython.md) |

</div>

## O que você precisa { #what-you-need }

Comece com uma placa compatível com o caminho de software escolhido. As conexões de gravação e serial podem variar conforme a placa e o framework:

- Uma placa de desenvolvimento SF32, como a [SF32LB52-DevKit-LCD](../sf32-products/devkits/SF32LB52-DevKit-LCD.md).
- Um cabo de dados e a interface de gravação/serial indicada para a placa e o framework. Na SF32LB52-DevKit-LCD, as [instruções de conexão da SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/get-started.html) orientam usar a porta USB-to-UART para gravação serial; não a confunda com a porta USB dedicada às funções USB.
- Um computador com Windows, macOS ou Linux.
- Um terminal serial configurado para o console da placa, para acompanhar os logs de inicialização e a saída dos exemplos.

!!! tip "Use um cabo de dados"
    Cabos USB que servem apenas para carregar são uma causa comum de problemas na primeira inicialização. Se a placa ligar, mas nenhuma porta serial aparecer, teste um cabo de dados que você já confirmou que funciona e conecte-o diretamente a uma porta USB do computador.

## Primeira execução recomendada { #recommended-first-run }

Se esta é sua primeira placa SF32, comece pelo [SiFli-SDK](sifli/getting-started-sifli-sdk.md). Ele é a pilha de software de referência para SF32 e a base mais confiável para verificar se a placa, o cabo, a porta serial, o processo de gravação e a cadeia de ferramentas estão funcionando.

Depois que `hello_world` executar corretamente, experimente outro framework compatível com o seu hardware. Assim, você terá uma configuração comprovadamente funcional para recuperar o ambiente caso algum experimento posterior falhe.

## Critérios de sucesso { #what-success-looks-like }

Ao concluir um guia de primeiros passos, você deverá ter:

- Compilado ou carregado um primeiro exemplo.
- Gravado o exemplo na placa.
- Aberto o console serial.
- Visto uma saída previsível, como um log de inicialização, `hello_world`, um prompt do shell ou um banner do REPL.
- Anotado o nome da placa, a porta serial e o comando de gravação que funcionaram.

Guarde esses dados nas anotações do projeto. Eles são o caminho mais rápido para voltar a uma configuração funcional quando você começar a modificar os exemplos.

## Continue com os tutoriais { #continue-with-tutorials }

Quando conseguir repetir os passos e atingir os critérios de sucesso da primeira execução, continue pela [visão geral dos tutoriais](tutorials/overview.md). Esta é a próxima etapa da jornada de primeiros passos: comece com um periférico, depois combine subsistemas e, por fim, pratique a validação necessária para um produto.

## Quando passar para a seção de desenvolvimento { #when-to-move-to-develop }

A etapa de primeiros passos termina quando você consegue repetir uma inicialização comprovadamente funcional. A [visão geral do desenvolvimento](../develop/index.md) é a referência de engenharia para o trabalho contínuo: maturidade da plataforma, ferramentas, fluxos de gravação e depuração, arquitetura de firmware e integração do produto. Depois da primeira execução, consulte em especial a [referência da ferramenta CodeKit](../develop/tools/codekit.md) para entender o papel do CodeKit no fluxo diário de desenvolvimento. Esta página permanece focada na primeira execução.

## O que verificar antes de escolher um caminho de desenvolvimento { #before-choosing-a-development-path }

Antes de adotar um caminho de software, verifique se a documentação cobre a placa e a versão de software que você pretende usar. Em especial, procure:

- Uma matriz pública, por placa, com o status e o nível de maturidade do SiFli-SDK, CodeKit, Zephyr, Arduino e MicroPython.
- O identificador exato da placa usado por cada caminho de software compatível.
- Instruções de gravação/download para Windows, macOS e Linux.
- A saída serial esperada para cada primeiro exemplo.
- Procedimentos de recuperação após falhas de gravação ou uso de imagens de firmware inválidas.
- Limitações conhecidas de cada framework, especialmente em Bluetooth, display, armazenamento, USB e operação de baixo consumo.
- Notas de versão que indiquem quais versões do SDK, do CodeKit, dos pacotes, das imagens de firmware e do suporte às placas são compatíveis.

Não presuma que um caminho disponível para uma placa também funcione em todas as placas SF32. Confirme a placa e a versão de software específicas que você pretende usar.
