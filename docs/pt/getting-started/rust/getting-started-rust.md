---
icon: lucide/code
description: "Primeira avaliação do sifli-rs da OpenSiFli no SF32LB52: instalar o alvo Rust, compilar o Blinky sem alterações, configurar o sftool e manter recuperação pelo SDK."
tags:
    - Primeiros passos
    - Rust
---

# Rust { #rust }

[OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs) reúne um HAL e um PAC em Rust, além de recursos relacionados à tabela de flash para MCUs SiFli. Os mantenedores classificam o projeto como em desenvolvimento e ainda não pronto para produção. Portanto, este guia estabelece uma **base de avaliação**, não um fluxo de desenvolvimento de firmware para produção.

Antes de começar, conclua o guia [Primeiros passos com o SiFli-SDK](../sifli/getting-started-sifli-sdk.md) usando a mesma placa. Assim, você terá uma conexão serial e um procedimento de recuperação já validados caso não consiga gravar ou depurar o projeto em Rust.

## O que você precisa { #what-you-need }

- Uma SF32LB52 DevKit LCD e um cabo de dados USB Type-C conectado à porta USB-to-UART da placa.
- Conhecimentos básicos de Rust, desenvolvimento embarcado e linha de comando.
- `git` e uma cadeia de ferramentas Rust atual instalada com [rustup](https://rustup.rs/).
- O [guia Get Started do sifli-rs](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/get_started.md) e o [guia Flash and Debug](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/flash_and_debug.md) mais recentes.

!!! warning "Caminho de exploração"
    Não use este guia como evidência de prontidão para produção de um chip, periférico, configuração de placa ou pilha de aplicação. Antes de investir em uma adaptação, confira no repositório o status de suporte do alvo e do periférico específicos.

## Prepare o alvo de compilação do Rust { #prepare-the-rust-target }

O guia do repositório usa alvos de compilação Rust para Arm Cortex-M. Instale os alvos indicados:

```bash
rustup target add thumbv8m.main-none-eabi
rustup target add thumbv8m.main-none-eabihf
```

Clone o repositório atual e trabalhe no diretório de exemplos do SF32LB52:

```bash
git clone https://github.com/OpenSiFli/sifli-rs.git
cd sifli-rs/examples/sf32lb52x
```

O diretório de exemplos contém a configuração do alvo no Cargo, o mapa de memória, o script de compilação e os binários de exemplo. Não copie esses arquivos sem alterações para um produto: eles incorporam premissas sobre a placa e a flash que precisam ser verificadas para o hardware de destino.

## Configure a ferramenta de gravação { #configure-the-flash-runner }

O repositório documenta o `sftool` como a ferramenta habitual de gravação. Em `examples/sf32lb52x/.cargo/config.toml`, configure-o para usar a porta USB-to-UART da placa, seguindo a versão atualizada do guia Flash and Debug. O comando documentado é:

```toml
runner = 'sftool -c SF32LB52 -p <Your_Port> --compat write_flash'
```

A primeira gravação pode exigir uma tabela de flash, um bootloader e uma imagem da aplicação. As imagens e os endereços exatos dependem da configuração documentada da placa e da flash. Siga o guia do repositório; não substitua esses endereços ou binários por valores de Arduino, Zephyr ou SiFli-SDK.

## Compile e execute o exemplo de referência { #build-and-run-the-baseline }

Com o runner configurado, compile e grave o exemplo Blinky sem modificações:

```bash
cargo run --bin blinky
```

Considere a compilação bem-sucedida apenas a primeira verificação. Confirme se a placa apresenta o comportamento esperado e guarde toda a saída de `cargo` e `sftool`. Em seguida, faça uma única alteração pequena e reversível — por exemplo, ajuste o intervalo de piscada — antes de testar outro periférico.

## Se o exemplo de referência falhar { #if-the-baseline-fails }

Primeiro, confirme que a configuração de referência do SiFli-SDK ainda funciona na placa. Depois, registre o alvo de compilação do Rust, o commit, o exemplo selecionado, a configuração do Cargo, o comando e a saída do `sftool`, a revisão da placa e o log serial ou de depuração. O guia upstream informa que a depuração pode ficar instável durante o comportamento idle/WFI e que a tabela de flash precisa comportar a imagem da aplicação.

Para decisões sobre arquitetura, escopo de suporte e adequação ao produto, consulte [Rust em Develop](../../develop/platforms/rust/overview.md).

## Antes de reutilizar o exemplo { #what-sifli-should-add }

Antes de adaptar o exemplo, verifique se o repositório documenta o suporte à placa e aos periféricos que você pretende usar. Confira também o target Rust correspondente, o bootloader, o layout da tabela de flash e o fluxo de depuração. Mantenha disponível a configuração conhecida e funcional do SiFli-SDK como opção de recuperação.
