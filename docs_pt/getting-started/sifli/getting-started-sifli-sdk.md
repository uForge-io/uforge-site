---
icon: lucide/terminal
description: "Da placa SF32 recém-desembalada ao primeiro hello_world via UART com SiFli-SDK: instale a cadeia de ferramentas, compile com scons e grave o firmware pela UART."
tags:
    - Primeiros passos
    - SiFli SDK
---

# SiFli-SDK { #sifli-sdk }

Este guia orienta você desde uma placa de desenvolvimento SF32 recém-desembalada até a execução do exemplo `hello_world` via UART com o **SiFli-SDK**, o SDK oficial baseado em RT-Thread para dispositivos SF32.

Mesmo que pretenda usar Arduino, Zephyr ou MicroPython, vale a pena seguir este guia uma vez. Assim, você confirma que a placa, o cabo, a porta serial, o processo de gravação e a cadeia de ferramentas básica estão funcionando antes de adicionar outro framework.

## O que você vai precisar { #what-youll-need }

**Hardware**

- Uma placa de desenvolvimento SF32, como a [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md), ou outra placa identificada na [família SF32](../../sf32-products/family/SF32_family.md).
- Um cabo USB Type-C de **dados** conectado à porta USB-to-UART da placa; não use um cabo exclusivo para carregamento nem uma porta secundária de função USB.
- Um computador com Windows, macOS ou Linux.

**Software**

- [git](https://git-scm.com/)
- Uma cadeia de ferramentas C/C++ configurada por meio do [`uv`](https://docs.astral.sh/uv/getting-started/installation/) (o instalador do SiFli-SDK baixa o compilador, o depurador e o ambiente Python)
- O próprio repositório [SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

**Referências oficiais**

- [Guia de instalação do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)
- [Placas compatíveis com o SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)
- [Repositório SiFli-SDK do OpenSiFli](https://github.com/OpenSiFli/SiFli-SDK)
- [Versões publicadas do SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK/releases)

!!! tip "Prefere usar uma IDE?"
    A SiFli também publica a extensão **SiFli-SDK-CodeKit** para VS Code, que reúne a configuração do SDK, a compilação e a gravação do firmware em etapas guiadas. Se preferir esse fluxo, consulte [SiFli CodeKit](getting-started-sifli-codekit.md).

## Instale a cadeia de ferramentas { #install-the-toolchain }

Para ter uma base reproduzível, use uma tag de versão publicada em vez de `main`. Na data desta revisão, a tag publicada mais recente é `v2.5.1`; consulte a [lista oficial de versões](https://github.com/OpenSiFli/SiFli-SDK/releases) antes de começar para verificar se há uma mais nova. A branch `release/v2.5` recebe atualizações dessa série e pode mudar com o tempo.

=== "macOS / Linux"

    Instale o `uv`, o gerenciador de pacotes e ambientes usado pelos scripts do SiFli-SDK:

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

    Clone o SDK:

    ```bash
    mkdir -p ~/OpenSiFli && cd ~/OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Execute o instalador e, em seguida, carregue o ambiente do SDK no shell atual:

    ```bash
    cd SiFli-SDK
    ./install.sh
    . ./export.sh
    ```

=== "Windows"

    Instale o `uv` no PowerShell:

    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    Clone o SDK:

    ```powershell
    mkdir C:\OpenSiFli
    cd C:\OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Execute o instalador e carregue o ambiente do SDK:

    ```powershell
    cd SiFli-SDK
    .\install.ps1
    .\export.ps1
    ```

!!! info "O SiFli-SDK inclui submódulos"
    A opção "Download ZIP" do GitHub não inclui os submódulos necessários. Use `git clone --recursive`. Se você já clonou o repositório sem os submódulos, execute `git submodule update --init --recursive` na raiz do SDK.

!!! note "Você está trabalhando na China continental?"
    Antes da instalação, defina `SIFLI_SDK_MIRROR_CHINA` como `1` no shell: use `export SIFLI_SDK_MIRROR_CHINA=1` no macOS/Linux ou `$env:SIFLI_SDK_MIRROR_CHINA = "1"` no PowerShell. Você também pode clonar o SDK pelo [espelho do Gitee](https://gitee.com/SiFli/sifli-sdk) em vez do GitHub. Consulte o [guia de instalação](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html) para mais informações.

`install.sh` / `install.ps1` baixa as versões correspondentes do compilador e do depurador, além das dependências Python. Execute o instalador novamente quando a versão do SDK mudar. `export.sh` / `export.ps1` ativa esse ambiente no terminal atual; execute o script sempre que abrir um novo terminal para compilar. No Windows, execute os scripts `.ps1` no PowerShell.

## Escolha o alvo da placa { #choose-the-board-target }

O valor passado a `scons --board` é o nome do diretório da placa dentro de `customer/boards`. Escolha o alvo correspondente às configurações de memória e tela da sua placa. Os nomes abaixo diferenciam maiúsculas de minúsculas.

<div align="center" markdown>

*Alvos de compilação para as placas de desenvolvimento do SiFli-SDK*

| Placa de desenvolvimento | Alvos exatos de `scons --board` |
| --- | --- |
| SF32LB52-DevKit-Core-3p3 | `sf32lb52-core_e8r16`<br>`sf32lb52-core_n16r16` |
| SF32LB52-DevKit-LCD | `sf32lb52-lcd_52d`<br>`sf32lb52-lcd_n16r8`<br>`sf32lb52-lcd_a128r16` |
| SF32LB52-DevKit-Nano | `sf32lb52-nano_n4`<br>`sf32lb52-nano_n16r16`<br>`sf32lb52-nano_a128r16` |
| Huangshan-Pi (SF32LB52-LCHSPI-ULP) | `sf32lb52-lchspi-ulp` |
| SF32LB56-DevKit-LCD | `sf32lb56-lcd_a128r12n1`<br>`sf32lb56-lcd_n16r12n1` |
| SF32LB58-DevKit-LCD | `sf32lb58-lcd_a128r32n1_dsi`<br>`sf32lb58-lcd_a128r32n1_qspi`<br>`sf32lb58-lcd_n16r32n1_dpi`<br>`sf32lb58-lcd_n16r32n1_dsi`<br>`sf32lb58-lcd_n16r32n1_qspi`<br>`sf32lb58-lcd_n16r64n4` |

</div>

Em placas com dois núcleos, omitir o sufixo do núcleo seleciona a configuração HCPU. Quando necessário, especifique `_hcpu`; para compilar a configuração LCPU, acrescente `_lcpu`, como em `scons --board=eh-lb551_lcpu`. Se a configuração da sua placa não estiver na tabela, consulte a [lista de placas compatíveis da SiFli](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html), que é a referência mais atualizada.

## Compile o exemplo "Hello World" { #build-the-hello-world-example }

Com o ambiente carregado, compile o exemplo `hello_world` do RT-Thread para sua placa:

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb52-lcd_n16r8 -j8
```

Substitua `sf32lb52-lcd_n16r8` pelo nome da sua placa. Consulte a [lista de placas compatíveis](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) para ver os nomes disponíveis. `-j8` compila com 8 tarefas em paralelo; ajuste esse número conforme o seu computador. Como o comando do exemplo omite o sufixo do núcleo, ele compila o HCPU e grava os binários em `build_sf32lb52-lcd_n16r8_hcpu/`. Se você especificar um destino com o sufixo `_lcpu`, o diretório de saída também terminará em `_lcpu`.

!!! tip "Precisa de configurações personalizadas?"
    No diretório do projeto, execute `sdk.py menuconfig --board=<board_name>` para abrir o menu interativo de configuração. Pressione ++esc++ duas vezes e, quando solicitado, escolha salvar a configuração antes de sair.

## Grave o firmware na placa { #flash-the-board }

Mantenha a placa conectada por USB e execute o script de gravação gerado durante a compilação:

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

    Quando o programa solicitar a porta serial, informe o caminho do dispositivo exibido pelo sistema operacional. No macOS, use `/dev/cu.*` (por exemplo, `/dev/cu.usbserial-12345678`), e não `/dev/tty.*`; no Linux, use o caminho correspondente, como `/dev/ttyUSB0`.

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

    Quando aparecer a solicitação `please input serial port number`, digite apenas o número da porta COM (por exemplo, `19` para `COM19`) e pressione Enter.

!!! tip
    Se a ferramenta não entrar no modo de download UART, reinicie a placa imediatamente antes de iniciar a transferência. Se o problema persistir, siga as instruções de gravação específicas da placa.

## Veja o programa em execução { #see-it-run }

Quando a gravação terminar, reinicie a placa ou aguarde a reinicialização automática. Abra um terminal serial usando a baud rate padrão da placa. Você deverá ver a saída de inicialização e a saída do exemplo `hello_world` pela UART.

## Verifique o resultado { #success-check }

Você pode prosseguir quando:

- O projeto compilar sem erros.
- O script de download por UART for concluído.
- O console serial exibir uma saída de inicialização legível.
- O exemplo `hello_world` imprimir sua saída após a reinicialização.

## Próximos passos { #where-to-go-next }

- **Escolha seu chip:** compare as séries LB52, LB55, LB56 e LB58 na [visão geral da família SF32](../../sf32-products/family/SF32_family.md).
- **Explore outros exemplos:** além de `hello_world`, o SDK inclui exemplos de BLE, Bluetooth clássico, gráficos com LVGL, áudio e modos de baixo consumo.
- **Prefere outro framework?** Continue com [Arduino](../arduino/getting-started-arduino.md), [Zephyr](../zephyr/getting-started-zephyr-upstream.md) ou [MicroPython](../micropython/getting-started-micropython.md).
- **Precisa de ajuda?** Consulte as [perguntas frequentes da SiFli](https://wiki.sifli.com/en/faq/index.html) para solucionar problemas comuns com a cadeia de ferramentas, J-Link e depuração.

## Registre a configuração de referência { #what-sifli-should-add }

Para repetir a configuração, registre a tag ou branch do SDK, o target exato de `scons --board`, o sistema operacional do computador, a porta serial e o procedimento de download que funcionou com a sua placa. Ao atualizar o SDK ou trocar de placa, consulte novamente a [lista oficial de placas compatíveis](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) e as [versões publicadas](https://github.com/OpenSiFli/SiFli-SDK/releases).
