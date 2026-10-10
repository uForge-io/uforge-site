---
icon: lucide/code
description: "Primeira avaliação do sifli-rs da OpenSiFli no SF32LB52: instale os targets Rust, compile o exemplo Blinky sem modificações, configure o sftool e mantenha um caminho de recuperação pelo SDK."
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
- `git` e uma toolchain Rust atual instalada com [rustup](https://rustup.rs/).
- O [guia Get Started do sifli-rs](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/get_started.md) e o [guia Flash and Debug](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/flash_and_debug.md) mais recentes.

!!! warning "Etapa de avaliação"
    Não use este guia como prova de que um chip, periférico, configuração de placa ou stack de aplicação está pronto para produção. Antes de investir em uma adaptação, confira no repositório o status de suporte do target e do periférico específicos.

## Prepare o target Rust { #prepare-the-rust-target }

O guia do repositório usa targets Rust Arm Cortex-M. Instale os targets indicados:

```bash
rustup target add thumbv8m.main-none-eabi
rustup target add thumbv8m.main-none-eabihf
```

Clone o repositório atual e trabalhe no diretório de exemplos do SF32LB52:

```bash
git clone https://github.com/OpenSiFli/sifli-rs.git
cd sifli-rs/examples/sf32lb52x
```

O diretório de exemplos contém a configuração de target do Cargo, o mapa de memória, o script de build e os binários de exemplo. Não copie esses arquivos sem alterações para um produto: eles incorporam premissas sobre a placa e a flash que precisam ser verificadas para o hardware de destino.

## Configure o runner de gravação { #configure-the-flash-runner }

O repositório documenta o `sftool` como o runner de gravação habitual. Em `examples/sf32lb52x/.cargo/config.toml`, configure-o para usar a porta USB-to-UART da placa, seguindo o guia Flash and Debug atualizado. O padrão documentado é:

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

Primeiro, confirme que a configuração de referência do SiFli-SDK ainda funciona na placa. Depois, registre o target Rust, o commit, o exemplo selecionado, a configuração do Cargo, o comando e a saída do `sftool`, a revisão da placa e o log serial ou de depuração. O guia upstream informa que a depuração pode ficar instável no comportamento de idle/WFI e que a tabela de flash precisa comportar a imagem da aplicação.

Para decisões sobre arquitetura, escopo de suporte e adequação ao produto, consulte [Rust em Develop](../../develop/platforms/rust/overview.md).

## Antes de reutilizar o exemplo { #what-sifli-should-add }

Antes de adaptar o exemplo, verifique se o repositório documenta o suporte à placa e aos periféricos que você pretende usar. Confira também o target Rust correspondente, o bootloader, o layout da tabela de flash e o fluxo de depuração. Mantenha disponível a configuração conhecida e funcional do SiFli-SDK como opção de recuperação.
