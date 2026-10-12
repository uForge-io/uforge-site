---
icon: lucide/table-properties
description: "Use as tabelas de partições do SiFli-SDK para descrever os layouts de memória SF32. Compare os formatos JSON v1/v2 com o formato YAML v3 recomendado, incluindo overlays, arquivos gerados e validação."
tags:
    - Desenvolvimento
    - Partições
---

# Tabelas de partições { #partition-tables }

A ferramenta de compilação `partition_table` do SiFli-SDK lê a descrição de partições da placa e gera `ptab.h`, que fornece as macros de partição usadas pela aplicação. A tabela descreve o mapa de endereços de todas as memórias relevantes, incluindo NOR Flash, NAND Flash, eMMC, cartões SD, PSRAM e SRAM interna.

Cada placa tem um layout padrão, usado por todas as aplicações compiladas para ela. Um projeto também pode fornecer uma configuração própria da tabela de partições para substituir o padrão da placa.

## Habilitar as tabelas de partições { #enable-partition-tables }

Ative **Use partition table to manage all memory layout** (usar tabela de partições para gerenciar todo o mapa de memória) na configuração de middleware. O projeto também precisa da configuração abaixo em `Kconfig.proj`; os exemplos do SiFli-SDK já a incluem.

```kconfig
# APP-specific configuration.
config CUSTOM_MEM_MAP
    bool
    select custom_mem_map
    default y if !SOC_SIMULATOR
```

## Escolher um formato { #choose-a-format }

O SiFli-SDK suporta três formatos de tabela de partições. Para projetos novos, use v3, a menos que uma placa ou produto existente precise manter a configuração v1/v2.

<div align="center"><em>Tabela: formatos de tabela de partições do SiFli-SDK</em></div>
<div align="center" markdown>

| Formato | Arquivo de descrição | Modelo principal | Usar em projetos novos? |
| --- | --- | --- | --- |
| v1 | `ptab.json` | Lista de memórias em JSON, tags e metadados opcionais `ftab`, `img` e `exec` | Não; mantenha apenas em projetos legados. |
| v2 | `ptab.json` | Lista de memórias em JSON com partições nomeadas e tipadas para imagens e execução | Não; mantenha quando uma placa existente depender dele. |
| v3 | `ptab.yaml` | Partições YAML com `type`, `subtype`, `region`, `exec`, macros geradas e overlays de projeto | Sim. |

</div>

O sistema de compilação procura primeiro `ptab.yaml` (v3) e, se não encontrar, usa `ptab.json` (v1/v2). A ordem de busca é: diretório da placa, diretório do chip, raiz do BSP e `customer/boards/<board>/`.

## v1: tags JSON e metadados de imagem { #v1-json-tags-and-image-metadata }

O v1 usa um array JSON em `ptab.json`. Não há um campo de versão dedicado, mas o arquivo pode começar com um elemento de cabeçalho que contenha `"version": "1"`.

Cada entrada de memória define:

- `mem`: nome da memória, como `flash2` ou `psram1`.
- `base`: endereço-base hexadecimal da memória; confira-o no mapa de memória do dispositivo-alvo.
- `regions`: lista de partições nessa memória.

Cada região usa `offset` e `max_size`, em bytes. A lista `tags` da região gera macros de partição. Por exemplo, `FLASH_BOOT_LOADER` gera `FLASH_BOOT_LOADER_START_ADDR`, `FLASH_BOOT_LOADER_OFFSET` e `FLASH_BOOT_LOADER_SIZE`; o endereço inicial é a soma de `base` da memória e `offset` da região.

<div align="center"><em>Tabela: metadados opcionais de região no v1</em></div>
<div align="center" markdown>

| Campo | Finalidade |
| --- | --- |
| `ftab` | Descreve uma entrada da Flash Table. |
| `img` | Identifica a imagem armazenada na partição para os scripts de gravação. Se o projeto gerar vários binários, use `proj_name:binary_name`. |
| `exec` | Identifica o programa executável para que scripts de link compartilhados selecionem o endereço de código. |
| `custom` | Adiciona macros personalizadas com valores inteiros ao `ptab.h` gerado. |

</div>

Para PSRAM, a documentação distingue os espaços de endereçamento CBUS e SBUS. Defina `exec` na partição CBUS para que o código use o endereço de execução; coloque um endereço `xip` de `ftab` na partição SBUS quando esse endereço for usado para copiar o código.

## v2: partições JSON nomeadas e tipadas { #v2-named-and-typed-json-partitions }

O v2 também usa `ptab.json`, mas o cabeçalho deve declarar `"version": "2"`. Os campos de memória continuam sendo `mem`, `base` e `regions`. Uma região mantém `offset` e `max_size` e pode usar `tags` e `custom`; o v2 também adiciona `name`, `type` e, opcionalmente, `core` para uma partição de execução.

<div align="center"><em>Tabela: campos e tipos de região no v2</em></div>
<div align="center" markdown>

| Campo ou tipo | Significado |
| --- | --- |
| `name` | Nome da partição. Os nomes de imagens de programa devem corresponder ao nome do programa associado ou ao nome `AddCustomImg`. Um programa com vários arquivos pode usar `proj_name:1`, `proj_name:2` e assim por diante. |
| `core` | Núcleo que executa uma partição `app_exec`: `hcpu`, `lcpu` ou `acpu`. |
| `app_img` | Partição principal que armazena a imagem do programa e é gravada pela ferramenta de gravação. |
| `app_img2` | Partição de backup da imagem do programa, normalmente associada à partição principal para atualizações. |
| `app_exec` | Espaço de endereçamento de onde o programa é executado. |

</div>

`bootloader`, `main`, `dfu` e `ftab` são nomes reservados. Outros nomes de programa podem ser usados para imagens definidas pelo usuário, como `acpu`. Se a tabela não definir as partições `ftab` e `bootloader`, a ferramenta gera uma configuração padrão; inspecione o `ptab.h` gerado antes de depender dela.

## v3: partições YAML e overlays { #v3-yaml-partitions-and-overlays }

O v3 usa `ptab.yaml` e é o formato recomendado. Ele substitui o modelo legado de `tags` pelos campos explícitos `type` e `subtype`, separa as partições da topologia física por meio de nomes lógicos de `region` e gera `ptab.h`, `ftab.bin` e trechos de scripts do linker durante a compilação.

<div align="center"><em>Tabela: campos de nível superior e de partição no v3</em></div>
<div align="center" markdown>

| Escopo | Campo | Obrigatório | Significado |
| --- | --- | --- | --- |
| Nível superior | `version` | Sim | Deve ser `3`. |
| Nível superior | `chip` | Sim | Número de peça do chip, por exemplo `SF32LB525UC6`. |
| Nível superior | `memory` | Não | Definições de armazenamento externo. |
| Nível superior | `partitions` | Sim | Lista de partições. |
| Partição | `name`, `type`, `region`, `offset`, `size` | Sim | Identidade, tipo, região lógica de armazenamento e posicionamento. `offset` e `size` aceitam o prefixo `0x` ou o sufixo `KB`/`MB`. |
| Partição | `subtype`, `exec`, `core`, `attrs` | Não | Especialização, localização de execução não XiP, núcleo de destino e atributos personalizados. |

</div>

Cada definição de `memory` externa especifica uma interface `mpi` ou `sdmmc`, um `type` (`nand`, `nor` ou `sd`) e um tamanho. `region` pode referenciar essas memórias externas, `hpsys_ram` ou `lpsys_ram`.

Cada `region` corresponde a um endereço de armazenamento SBUS e a um endereço CBUS usado para execução pela CPU ou XiP. O SDK carrega esse mapeamento dos dados SiliconSchema do chip. Em `FAL_PART_TABLE`, o nome do dispositivo é determinado pela `region` de armazenamento da partição, não por `exec`: `mpi1` a `mpi5` correspondem a `NOR_FLASH1_DEV_NAME` a `NOR_FLASH5_DEV_NAME`, enquanto `sdmmc1` e `sdmmc2` correspondem a `SDMMC1_DEV_NAME` e `SDMMC2_DEV_NAME`, respectivamente.

<div align="center"><em>Tabela: tipos e subtipos de partição no v3</em></div>
<div align="center" markdown>

| Tipo | Subtipo ou uso | Significado |
| --- | --- | --- |
| `ftab` | — | Partição da Flash Table. |
| `bootloader` | — | Partição do bootloader. |
| `app` | `factory` | Aplicação principal de fábrica; gera `CODE_START_ADDR` e `CODE_SIZE`. |
| `app` | `dfu` | Aplicação DFU independente. |
| `app` | `ex` | Partição de recursos. A compilação gera arquivos de imagem de recursos específicos da toolchain. |
| `data` | `flashdb_kv` | Banco de dados FlashDB KV; gera macros `KVDB_*` e integra `FAL_PART_TABLE`. |
| `data` | `filesystem`, `littlefs`, `fat` ou `fatfs` | A documentação afirma que `filesystem` gera macros `FS_REGION_*` e integra `FAL_PART_TABLE`. Em outra seção, também lista `littlefs`, `fat` e `fatfs` como subtipos que geram essas macros, mas diz que atualmente não têm efeito; confirme o comportamento desses três subtipos na versão do SDK usada. Essa mesma seção de macros também usa o subtipo `flashdb`, enquanto a tabela de subtipos e as regras de FAL usam `flashdb_kv`; não trate esses nomes como aliases sem confirmar isso na versão do SDK usada. |
| `data` | `ram`, `calibration`, `raw` ou `int_res` | RAM, calibração, dados brutos gerenciados pela aplicação ou dados internos de recursos vinculados ao ELF e separados pelo nome da seção. |

</div>

O `FAL_PART_TABLE` gerado pelo v3 inclui somente `data/flashdb_kv`, `data/filesystem` e partições `app` cujo subtipo não seja `ex`. Ele exclui `ftab`, `bootloader`, `app/ex` e os demais subtipos de `data`, incluindo `littlefs`, `fat`, `fatfs`, `raw`, `ram`, `calibration` e `int_res`. As entradas geradas usam o `name` de cada partição; aliases de layouts antigos, como `main`, `dfu_code` e `fs_root`, não são convertidos em nomes de partição. Ao migrar para o v3, não defina `FAL_PART_TABLE` manualmente; remova o `custom_mem_map.h` no nível da placa, se existir, para evitar um aviso de redefinição.

Para cada partição, `ptab.h` gera as macros `<NAME>_START_ADDR`, `<NAME>_SIZE` e `<NAME>_OFFSET`, em que `<NAME>` é o nome da partição em maiúsculas. Se o tipo de memória da região for reconhecido, também gera `<NAME>_MEM_TYPE`. Em uma partição `app/factory`, `CODE_START_ADDR` usa o endereço definido em `exec`, quando houver; caso contrário, usa o endereço CBUS da partição.

Use `exec: {region, offset}` quando o código não puder ser executado no local, por exemplo, quando uma aplicação armazenada em NAND Flash é copiada para PSRAM. Sem `exec`, o endereço inicial de código gerado usa o endereço de armazenamento CBUS da partição. `attrs` adiciona macros personalizadas ao `ptab.h`.

### Padrões e overlays de projeto { #defaults-and-project-overlays }

No v3, padrões do sistema são inferidos quando as partições correspondentes não estão presentes. Para SF32LB52, `flash_table` e `bootloader` podem ser inferidos a partir da região de armazenamento da aplicação de fábrica do HCPU; o armazenamento de inicialização em NAND ou SDMMC também recebe as partições de dados padrão documentadas. Para SF32LB56 e SF32LB58, é possível omitir `flash_table` e `bootloader` na `mpi5` interna. As janelas padrão da PSRAM SiP e as partições padrão de RAM também podem ser omitidas, a menos que o projeto altere o layout de RAM.

Para uma pequena alteração específica do projeto, use `ptab.overlay.yaml` em vez de copiar todo o `ptab.yaml` da placa. O overlay pode adicionar uma partição ou substituir uma existente:

```yaml
partitions:
  - op: override
    name: fs_region
    size: 5MB

  - op: add
    name: log_region
    type: data
    subtype: raw
    region: mpi2
    offset: 0x00F00000
    size: 64KB
```

O overlay da placa tem prioridade sobre o overlay do chip. Ele só pode alterar partições: não pode mudar `memory`, `chip` ou `version`, nem excluir partições. Aplica-se apenas a um `ptab.yaml` v3 no nível da placa e não pode ser combinado com um `ptab.yaml` ou `ptab.json` completo no projeto. Se a placa ainda usar `ptab.json` (v1/v2) e nenhum `ptab.yaml` completo for selecionado, a compilação ignora o overlay, emite um aviso e continua pelo fluxo sem overlay. Nesse caso, `ptab.effective.yaml` não é gerado. Quando aplicado, o sistema grava o resultado em `ptab.effective.yaml` para inspeção.

## Arquivos gerados e validação { #generated-files-and-validation }

<div align="center"><em>Tabela: arquivos gerados na compilação da tabela de partições</em></div>
<div align="center" markdown>

| Saída | Finalidade |
| --- | --- |
| `ptab.h` | Cabeçalho C gerado com as macros de partição. |
| `ftab.bin` | Flash Table binária usada pelo bootloader. No v3, é gerada diretamente por Python, sem um subprojeto `ftab`. |
| `link_copy.lds` / `link_copy.sct` | Cópias geradas dos scripts de link GCC ou Keil. O v3 usa templates Jinja2. |
| `ptab.effective.yaml` | Tabela v3 final após o processamento de overlay, quando um overlay está ativo. |

</div>

Valide a tabela v3 da placa antes da integração:

```bash
python tools/build/validate_ptab_v3.py customer/boards/<board>/ptab.yaml
```

O validador verifica a sintaxe dos nomes de partição, tipos e subtipos válidos, regiões válidas, sobreposição de partições e unicidade do bootloader. Para inspecionar a configuração v3 efetiva usada na compilação, execute:

```bash
sdk.py ptab-export --board=<board-name>
sdk.py ptab-export --board=<board-name> --output /tmp/ptab.effective.yaml
sdk.py ptab-export --strict
```

## Inspecionar a Flash Table gerada { #inspect-the-generated-flash-table }

Após a compilação, `ftab.bin` fica no diretório de saída. Inicialize o ambiente do SDK e inspecione o primeiro `build_*/ftab.bin` encontrado no projeto atual:

```bash
source ./export.sh
sdk.py ftab-dump
```

No Windows PowerShell, inicialize com `./export.ps1`. Se o projeto tiver vários diretórios de compilação de placas, especifique o caminho. Use a saída JSON quando um script precisar processar o resultado:

```bash
sdk.py ftab-dump --path build_<board_name>/ftab.bin
sdk.py ftab-dump --path build_<board_name>/ftab.bin --format json
```

A tabela exibe as entradas de partição, as descrições de imagem usadas nos fluxos de DFU e boot e os ponteiros para as imagens em execução de HCPU, LCPU, bootloader e boot.

## Revisão do produto { #product-review }

- [ ] O projeto usa intencionalmente a tabela da placa ou uma configuração explícita do projeto.
- [ ] A sintaxe v1, v2 ou v3 escolhida corresponde ao arquivo que o sistema de compilação realmente encontra.
- [ ] Os locais de armazenamento e execução das imagens estão corretos, em especial para armazenamento não XiP e PSRAM.
- [ ] As partições de aplicação, backup, DFU, sistema de arquivos, calibração e dados gerenciados pela aplicação têm capacidade suficiente e não se sobrepõem.
- [ ] Foram inspecionados `ptab.h`, `ftab.bin` e, para overlays v3, `ptab.effective.yaml`.
- [ ] O procedimento de gravação para recuperação está documentado fora do fluxo normal de atualização.

Para consultar as fontes completas, veja a documentação oficial do SiFli-SDK sobre [tabelas de partições](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table.html), [v1](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v1.html), [v2](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v2.html) e [v3](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v3.html).
