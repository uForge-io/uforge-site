---
icon: lucide/terminal
description: "O ciclo diário do SiFli-SDK: ativar o ambiente, compilar com scons, gravar por download UART ou sftool e acompanhar a saída serial."
tags:
    - Desenvolvimento
    - SiFli-SDK
---

# Compilar, gravar e monitorar a saída serial { #build-flash-monitor }

Esta página apresenta o fluxo diário de trabalho com o SiFli-SDK: ativar o ambiente, compilar com `scons`, gravar o firmware na placa e acompanhar os logs.

## Ativar o SDK { #activate-the-sdk }

Instale o ambiente do SDK seguindo o [guia oficial de instalação](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html) correspondente à sua versão. Antes de compilar, ative-o em cada novo terminal executando o script de exportação na raiz do SDK:

=== "macOS / Linux"

    ```bash
    cd ~/OpenSiFli/SiFli-SDK
    . ./export.sh
    ```

=== "Windows"

    ```powershell
    cd C:\OpenSiFli\SiFli-SDK
    .\export.ps1
    ```

O script de exportação carrega no terminal atual o ambiente correspondente à cópia do SDK em uso. As etapas de instalação e gerenciamento podem variar conforme a versão; consulte o guia oficial correspondente.

## Compilar { #build }

No diretório do projeto de exemplo, execute:

```bash
scons --board=<board_name> -j8
```

Escolha um valor de `-j` adequado à capacidade da máquina. Se o nome da placa não especificar o núcleo, o SDK selecionará HCPU por padrão. Por exemplo, `sf32lb52-lcd_n16r8` gera `build_sf32lb52-lcd_n16r8_hcpu/`. Use o diretório de saída correspondente à combinação de placa e núcleo definida pelo SDK; se o identificador da placa já especificar um núcleo, não acrescente `_hcpu` novamente.

## Compilação limpa { #clean-rebuilds }

Faça uma limpeza seguida de nova compilação ao trocar de placa, alterar configurações importantes ou investigar um artefato suspeito. No diretório do projeto de exemplo, use a opção de limpeza do SCons:

```bash
scons -c
```

Esse comando limpa os alvos de compilação e remove os arquivos temporários e os arquivos de objeto gerados. Em seguida, compile novamente com a configuração de placa pretendida.

## Gravar o firmware { #flash }

Por exemplo, para o destino HCPU de `sf32lb52-lcd_n16r8`, use o script de download UART gerado pela compilação:

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

O projeto OpenSiFli também publica o [`sftool`](https://github.com/OpenSiFli/sftool), um utilitário de linha de comando de código aberto para comunicação com SoCs SiFli por uma interface serial. As operações documentadas incluem gravar, ler e apagar a memória flash, além de controlar a reinicialização do chip. Consulte o README da ferramenta para saber quais chips e tipos de armazenamento são suportados e quais opções de comando estão disponíveis.

## Acompanhar a saída serial { #monitor }

Use um terminal serial configurado para a placa e o exemplo. O log serial deve exibir a saída de boot, as mensagens de inicialização do RT-Thread, mensagens da aplicação ou o prompt do shell.

Registre:

- Nome da placa.
- Porta serial.
- Taxa de transmissão (baud rate).
- Comando de compilação.
- Comando de gravação.
- Branch ou versão do SDK.

## Ciclo diário de desenvolvimento { #daily-developer-loop }

<div align="center"><em>Tabela: Ciclo diário de desenvolvimento</em></div>

<div align="center" markdown>

| Passo | Objetivo |
|:-----|:-----|
| Ativar | Ativar o ambiente do SDK no terminal atual. |
| Configurar | Selecionar a placa e as opções de recursos. |
| Compilar | Gerar binários específicos para a placa. |
| Gravar | Gravar a imagem do firmware na placa. |
| Monitorar | Confirmar a inicialização e o funcionamento da aplicação. |
| Registrar | Guardar comandos e detalhes dos logs para reproduzir o processo. |

</div>

## Comece por um exemplo correspondente { #start-from-a-matching-example }

Antes de criar um projeto ou reformulá-lo substancialmente, escolha o [exemplo do SDK](../../examples/index.md) que melhor corresponda à placa e ao subsistema crítico. Primeiro compile, grave e acompanhe a saída serial do exemplo sem alterações; em seguida, registre no projeto adaptado o nome da placa, a versão do SDK, os comandos e a saída esperada.

Se usar o [CodeKit](../../tools/codekit.md), mantenha os mesmos registros de validação e confirme que as ações realizadas no editor podem ser reproduzidas pelo fluxo de comandos do SDK.

## Solução de problemas { #troubleshooting }

<div align="center"><em>Tabela: Solução de problemas</em></div>

<div align="center" markdown>

| Sintoma | Verificação |
|:--------|:------|
| Ferramenta de compilação não encontrada | Execute novamente `export.sh` / `export.ps1` no terminal atual. |
| Nome da placa desconhecido | Consulte a documentação de placas compatíveis com o SDK. |
| O script de download não consegue abrir a porta | Feche os terminais seriais e verifique o cabo/conector USB-UART. |
| A gravação não começa | Siga o procedimento de download documentado para a placa. No caso da `sf32lb52-lcd_n16r8`, depois de selecionar a porta serial, reinicie a placa e pressione Enter em até 2 segundos para iniciar o download; para as demais placas, siga o procedimento específico de cada uma. Verifique também a alimentação, a porta selecionada e a conexão UART. |
| A saída serial está ilegível | Confira a taxa de transmissão e use a UART de dados, não um cabo somente para carga. |

</div>

## Checklist para a transição { #handoff-checklist }

Antes de entregar o projeto a outro desenvolvedor, inclua:

- Branch ou commit do SDK.
- Nome da placa.
- Instruções de instalação e configuração.
- Comando de compilação.
- Comando de gravação.
- Configuração do monitor serial.
- Primeiras linhas de log esperadas.
- Comando de recuperação.
