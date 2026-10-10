---
icon: lucide/code
description: "Avalie o suporte comunitário a Rust para SF32 por meio do sifli-rs da OpenSiFli (sifli-hal e sifli-pac): maturidade atual, cenários adequados e inadequados e uma lista de riscos."
tags:
    - Desenvolvimento
    - Rust
---

# Rust { #rust }

O trabalho da OpenSiFli com Rust está no repositório [OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs), que reúne HAL, PAC, crates para tabelas Flash, exemplos e notas sobre gravação e depuração.

Os mantenedores descrevem o projeto como ainda em desenvolvimento e não pronto para produção. Considere Rust no SF32 uma via de exploração, a menos que sua equipe possa trabalhar próxima ao hardware e esteja preparada para contribuir com correções ao projeto upstream.

Para configurar a toolchain inicial, compilar o Blinky sem modificações e configurar o runner de gravação, consulte [Primeiros passos com Rust](../../../getting-started/rust/getting-started-rust.md). Use esta página para avaliar o suporte atual e decidir se vale avançar com Rust além dessa base.

## Crates mencionadas pela OpenSiFli { #crates-mentioned-by-opensifli }

<div align="center"><em>Tabela: Crates mencionadas pela OpenSiFli</em></div>

<div align="center" markdown>

| Crate | Finalidade |
|:------|:-----------|
| `sifli-hal` | Camada de abstração de hardware. |
| `sifli-pac` | Crate de acesso a periféricos. |
| `sifli-flash-table` | Suporte a tabelas Flash. |

</div>

## Quando Rust faz sentido { #when-rust-makes-sense }

Rust pode ser uma boa escolha se você quiser:

- Experimentar Rust para sistemas embarcados.
- Aplicar tipagem forte ao código de firmware de baixo nível.
- Evoluir em direção a futuros drivers no estilo `embedded-hal`.
- Contribuir para o ecossistema Rust de SF32.

Por enquanto, use o SiFli-SDK para firmware de produção.

## Critérios de avaliação { #evaluation-gates }

Antes de iniciar a adaptação para um produto, confirme que a configuração de referência para os primeiros passos funciona na placa de destino. Em seguida, valide separadamente cada periférico, layout Flash, caminho de depuração e recurso de execução necessário. Registre, para cada resultado, o commit upstream, o target Rust, a configuração do Cargo, a revisão da placa e o procedimento de recuperação.

O repositório usa `sifli-hal`, `sifli-pac`, ferramentas para tabelas Flash e exemplos assíncronos no estilo Embassy. Portanto, o sucesso da aplicação também depende da interação entre esses componentes, não apenas de uma crate compilar. Ao investigar uma lacuna, mantenha o caso de reprodução o menor possível.

## Lista de verificação de riscos { #risk-checklist }

- A crate oferece suporte ao chip exato?
- A HAL cobre o periférico necessário?
- O layout Flash é compatível com a placa?
- O fluxo de depuração está documentado para a sonda ou ferramenta utilizada?
- É possível recuperar a mesma placa com o SiFli-SDK ou o `sftool`?
- A equipe está preparada para contribuir com correções?

## Quando é adequado / inadequado { #good-fit-poor-fit }

<div align="center"><em>Tabela: Cenários adequados e inadequados para Rust</em></div>

<div align="center" markdown>

| Adequado | Inadequado |
|:---------|:-----------|
| Experimentos e exploração de drivers. | Projetos com cronograma de produção que exigem suporte do fornecedor. |
| Equipes que já usam Rust embarcado. | Produtos que precisam agora de stacks completos de Bluetooth, tela e áudio. |
| Contribuir para a maturidade da HAL/PAC. | Protótipos pontuais em que Arduino ou exemplos do SDK permitem avançar mais rápido. |

</div>
