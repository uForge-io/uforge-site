---
icon: lucide/table-properties
description: "SiFli-SDKのパーティションテーブルでSF32のメモリー配置を定義します。従来のJSON v1/v2形式と、推奨されるYAML v3形式、オーバーレイ、生成ファイル、検証方法を説明します。"
tags:
    - 開発
    - パーティション
---

# パーティションテーブル { #partition-tables }

SiFli-SDKの`partition_table`ビルドツールは、ボードのパーティション定義を読み込み、アプリケーションで使用するパーティションマクロを含む`ptab.h`を生成します。パーティションテーブルでは、NOR Flash、NAND Flash、eMMC、SDカード、PSRAM、オンチップSRAMなど、対象メモリーのアドレス配置を定義します。

各ボードには既定の配置があり、そのボード向けにビルドされるアプリケーションはすべてその配置に従います。プロジェクト側で独自のパーティションテーブルを指定し、ボードの既定値を置き換えることもできます。

## パーティションテーブルを有効にする { #enable-partition-tables }

ミドルウェア設定で「すべてのメモリーレイアウトの管理にパーティションテーブルを使用（**Use partition table to manage all memory layout**）」を有効にします。また、プロジェクトの`Kconfig.proj`に次の設定が必要です。SiFli-SDKのサンプルには、この設定がすでに含まれています。

```kconfig
# APP-specific configuration.
config CUSTOM_MEM_MAP
    bool
    select custom_mem_map
    default y if !SOC_SIMULATOR
```

## 形式を選ぶ { #choose-a-format }

SiFli-SDKは、3種類のパーティションテーブル形式に対応しています。既存のボードや製品でv1/v2を維持する必要がない限り、新規開発ではv3を使用してください。

<div align="center"><em>表: SiFli-SDKのパーティションテーブル形式</em></div>
<div align="center" markdown>

| 形式 | 定義ファイル | 主なモデル | 新規プロジェクトでの使用 |
| --- | --- | --- | --- |
| v1 | `ptab.json` | JSONのメモリー一覧、タグ、任意の`ftab`、`img`、`exec`メタデータ | いいえ。既存プロジェクトの保守に限ります。 |
| v2 | `ptab.json` | 名前付き・型付きのイメージ／実行パーティションを持つJSONのメモリー一覧 | いいえ。既存ボードが依存している場合に維持します。 |
| v3 | `ptab.yaml` | `type`、`subtype`、`region`、`exec`、生成マクロ、プロジェクトオーバーレイを使うYAMLパーティション | はい。 |

</div>

ビルドシステムは最初に`ptab.yaml`（v3）を検索し、見つからない場合は`ptab.json`（v1/v2）を検索します。検索順は、ボードディレクトリ、チップディレクトリ、BSPルート、`customer/boards/<board>/`です。

## v1：JSONタグとイメージメタデータ { #v1-json-tags-and-image-metadata }

v1は`ptab.json`内のJSON配列で定義します。専用のバージョンフィールドはありませんが、先頭要素に任意で`"version": "1"`を含めることができます。

各メモリー項目では、次の情報を定義します。

- `mem`：`flash2`や`psram1`などのメモリー名。
- `base`：メモリーの16進数ベースアドレスです。対象メモリーのマップに照らして値を確認してください。
- `regions`：そのメモリー内のパーティション一覧。

各regionでは、オフセットと最大サイズをバイト単位で`offset`と`max_size`に指定します。`tags`の値からパーティションマクロが生成されます。たとえば`FLASH_BOOT_LOADER`を指定すると、`FLASH_BOOT_LOADER_START_ADDR`、`FLASH_BOOT_LOADER_OFFSET`、`FLASH_BOOT_LOADER_SIZE`が生成されます。開始アドレスは、メモリーの`base`にregionの`offset`を加えた値です。

<div align="center"><em>表: v1の任意regionメタデータ</em></div>
<div align="center" markdown>

| フィールド | 用途 |
| --- | --- |
| `ftab` | Flash Tableのエントリーを記述します。 |
| `img` | 生成される書き込みスクリプトで使う、パーティション内イメージの名前です。複数のバイナリを出力するプロジェクトでは`proj_name:binary_name`を指定します。 |
| `exec` | 共有リンカースクリプトがコードアドレスを選択するための実行プログラム名です。 |
| `custom` | 生成される`ptab.h`に整数値のカスタムマクロを追加します。 |

</div>

PSRAMにはCBUSとSBUSの別々のアドレス空間があります。コードの実行アドレスにはCBUSパーティションに`exec`を指定します。コードのコピー元としてSBUSアドレスを使う場合は、SBUSパーティションの`ftab`に`xip`アドレスを設定します。

## v2：名前付き・型付きJSONパーティション { #v2-named-and-typed-json-partitions }

v2も`ptab.json`を使いますが、ヘッダーで`"version": "2"`を宣言する必要があります。メモリーのフィールドは`mem`、`base`、`regions`のままです。各regionでは`offset`と`max_size`を指定し、`tags`と`custom`も使用できます。さらに、regionの`name`、`type`、実行用パーティションの場合は任意の`core`を指定します。

<div align="center"><em>表: v2のregionフィールドと型</em></div>
<div align="center" markdown>

| フィールドまたは型 | 意味 |
| --- | --- |
| `name` | パーティション名です。プログラムイメージ名は、対応するプログラム名または`AddCustomImg`名と一致させる必要があります。複数ファイルのプログラムでは`proj_name:1`、`proj_name:2`のように指定できます。 |
| `core` | `app_exec`パーティションを実行するコアです。`hcpu`、`lcpu`、`acpu`を指定します。 |
| `app_img` | プログラムイメージを格納するプライマリパーティションで、Flashツールによる書き込み対象です。 |
| `app_img2` | 更新用に通常はプライマリパーティションと組み合わせる、バックアップ用プログラムイメージパーティションです。 |
| `app_exec` | プログラムを実行するアドレス空間です。 |

</div>

`bootloader`、`main`、`dfu`、`ftab`は予約済みの名前です。`acpu`など、その他のプログラム名はユーザー定義イメージに使用できます。テーブルに`ftab`パーティションと`bootloader`パーティションの両方が定義されていない場合、ツールは既定の構成を生成します。利用する前に、生成された`ptab.h`を確認してください。

## v3：YAMLパーティションとオーバーレイ { #v3-yaml-partitions-and-overlays }

v3は`ptab.yaml`を使う推奨形式です。従来の`tags`モデルを明示的な`type`と`subtype`に置き換え、論理`region`名によってパーティションと物理メモリー構成を分離します。また、ビルド時に`ptab.h`、`ftab.bin`、リンカースクリプト用断片を生成します。

<div align="center"><em>表: v3のトップレベルフィールドとパーティションフィールド</em></div>
<div align="center" markdown>

| スコープ | フィールド | 必須 | 意味 |
| --- | --- | --- | --- |
| トップレベル | `version` | はい | `3`である必要があります。 |
| トップレベル | `chip` | はい | `SF32LB525UC6`などのチップ品番です。 |
| トップレベル | `memory` | いいえ | 外部ストレージの定義です。 |
| トップレベル | `partitions` | はい | パーティション一覧です。 |
| パーティション | `name`、`type`、`region`、`offset`、`size` | はい | 名前、種別、論理ストレージ領域、配置を指定します。`offset`と`size`には`0x`形式の値、または`KB`／`MB`サフィックス付きの値を指定できます。 |
| パーティション | `subtype`、`exec`、`core`、`attrs` | いいえ | 詳細種別、XiPを使わないコードの実行先、対象コア、カスタム属性を指定します。 |

</div>

外部`memory`の各定義では、`mpi`または`sdmmc`インターフェース、`nand`、`nor`、`sd`のいずれかの`type`、およびサイズを指定します。`region`はこれらの外部メモリーに加え、`hpsys_ram`または`lpsys_ram`を参照できます。

各`region`は、SBUSのストレージアドレスと、CPU実行またはXiPに使うCBUSアドレスに対応します。SDKはチップのSiliconSchemaデータからこのマッピングを読み込みます。`FAL_PART_TABLE`のデバイス名は`exec`ではなく、パーティションのストレージ`region`に基づきます。`mpi1`～`mpi5`は`NOR_FLASH1_DEV_NAME`～`NOR_FLASH5_DEV_NAME`に、`sdmmc1`と`sdmmc2`はそれぞれ`SDMMC1_DEV_NAME`と`SDMMC2_DEV_NAME`に対応します。

<div align="center"><em>表: v3のパーティション型とサブタイプ</em></div>
<div align="center" markdown>

| 型 | サブタイプまたは用途 | 意味 |
| --- | --- | --- |
| `ftab` | — | Flash Tableパーティションです。 |
| `bootloader` | — | ブートローダーパーティションです。 |
| `app` | `factory` | 工場出荷用のメインアプリケーションです。`CODE_START_ADDR`と`CODE_SIZE`を生成します。 |
| `app` | `dfu` | 独立したDFUアプリケーションです。 |
| `app` | `ex` | リソースパーティションです。ビルドにより、ツールチェーン固有のリソースイメージ出力が生成されます。 |
| `data` | `flashdb_kv` | FlashDB KVデータベースです。`KVDB_*`マクロを生成し、`FAL_PART_TABLE`に登録されます。 |
| `data` | `filesystem`、`littlefs`、`fat`、`fatfs` | `filesystem`は`FS_REGION_*`マクロを生成し、`FAL_PART_TABLE`に登録されると説明されています。一方、同じドキュメントの別の箇所では`littlefs`、`fat`、`fatfs`もマクロを生成するサブタイプとして列挙され、現在は効果がないとも記載されています。これら3つの動作は対象SDKリリースで確認してください。また、同じマクロ説明ではサブタイプ名に`flashdb`を使っていますが、サブタイプ表とFALの規則では`flashdb_kv`を使っています。対象SDKで確認せず、両者を別名として扱わないでください。 |
| `data` | `ram`、`calibration`、`raw`、`int_res` | RAM、キャリブレーションデータ、アプリケーション管理のrawデータ、またはELFにリンクされセクション名で分割される内部リソースデータです。 |

</div>

v3が自動生成する`FAL_PART_TABLE`に含まれるのは`data/flashdb_kv`、`data/filesystem`、およびサブタイプが`ex`ではない`app`パーティションのみです。`ftab`、`bootloader`、`app/ex`と、`littlefs`、`fat`、`fatfs`、`raw`、`ram`、`calibration`、`int_res`などその他の`data`サブタイプは含まれません。生成エントリーでは各パーティションの`name`が使われ、旧レイアウトの別名`main`、`dfu_code`、`fs_root`は実際のパーティション名に変換されません。v3への移行時に`FAL_PART_TABLE`を手動定義しないでください。ボード側に`custom_mem_map.h`がある場合は、再定義警告を避けるため削除してください。

`ptab.h`は各パーティションに`<NAME>_START_ADDR`、`<NAME>_SIZE`、`<NAME>_OFFSET`マクロを生成します。`<NAME>`はパーティション名を大文字にしたものです。regionのメモリー種別をSDKが認識できる場合は、`<NAME>_MEM_TYPE`も生成されます。`app/factory`パーティションでは、`exec`が指定されていれば`CODE_START_ADDR`にそのアドレスを使い、指定がなければパーティションのCBUSアドレスを使います。

NAND Flashに格納したアプリケーションをPSRAMにコピーする場合のように、その場でコードを実行できないときは`exec: {region, offset}`を使います。`exec`を指定しない場合、生成されるコード開始アドレスにはパーティションのCBUSストレージアドレスが使われます。`attrs`を指定すると、`ptab.h`にカスタムマクロが追加されます。

### 既定値とプロジェクトオーバーレイ { #defaults-and-project-overlays }

該当するパーティションがない場合、v3はシステム既定値を導出します。SF32LB52では、HCPUの工場出荷用アプリケーションのストレージ領域から`flash_table`と`bootloader`を推定できます。また、NANDまたはSDMMCをブート用ストレージとして使う場合も、ドキュメントに記載された既定のデータパーティションが追加されます。SF32LB56とSF32LB58では、内部`mpi5`上の`flash_table`と`bootloader`を省略できます。既定のSiP PSRAMウィンドウと標準RAMパーティションも、プロジェクトでRAM配置を変更しない限り省略できます。

小規模なプロジェクト固有の変更には、ボードの`ptab.yaml`全体をコピーするのではなく、`ptab.overlay.yaml`を使用します。パーティションの追加や既存パーティションの上書きができます。

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

ボード固有のオーバーレイはチップ固有のオーバーレイより優先されます。変更できるのはパーティションだけで、`memory`、`chip`、`version`の変更やパーティションの削除はできません。オーバーレイはボードレベルのv3 `ptab.yaml`にのみ適用でき、プロジェクトレベルの完全な`ptab.yaml`または`ptab.json`とは併用できません。ボードがv1/v2の`ptab.json`を使い、完全な`ptab.yaml`も選択されていない場合、ビルドは警告を出してオーバーレイを無視し、従来の非オーバーレイ経路で処理を続けます。この場合、`ptab.effective.yaml`は生成されません。オーバーレイが適用された場合は、確認用に最終結果が`ptab.effective.yaml`に出力されます。

## 生成ファイルと検証 { #generated-files-and-validation }

<div align="center"><em>表: パーティションテーブルのビルド出力</em></div>
<div align="center" markdown>

| 出力 | 用途 |
| --- | --- |
| `ptab.h` | パーティションマクロを含む生成済みCヘッダーです。 |
| `ftab.bin` | ブートローダーが使用するFlash Tableのバイナリです。v3では`ftab`サブプロジェクトを使わず、Pythonから直接生成されます。 |
| `link_copy.lds`／`link_copy.sct` | GCCまたはKeil用に生成されるリンカースクリプトのコピーです。v3ではJinja2テンプレートを使います。 |
| `ptab.effective.yaml` | オーバーレイが有効な場合に生成される、適用後のv3テーブルです。 |

</div>

統合前に、v3のボードテーブルを検証します。

```bash
python tools/build/validate_ptab_v3.py customer/boards/<board>/ptab.yaml
```

バリデーターは、パーティション名の構文、型とサブタイプ、regionの有効性、パーティション領域の重なり、ブートローダーの一意性を確認します。ビルドで使用されたv3の有効な構成を確認するには、次を実行します。

```bash
sdk.py ptab-export --board=<board-name>
sdk.py ptab-export --board=<board-name> --output /tmp/ptab.effective.yaml
sdk.py ptab-export --strict
```

## 生成されたFlash Tableを確認する { #inspect-the-generated-flash-table }

ビルド後、`ftab.bin`はビルドディレクトリに出力されます。SDK環境を初期化してから、現在のプロジェクト配下で最初に見つかった`build_*/ftab.bin`を確認します。

```bash
source ./export.sh
sdk.py ftab-dump
```

Windows PowerShellでは`./export.ps1`で初期化します。ボードごとのビルドディレクトリが複数ある場合はパスを指定し、スクリプトから結果を利用するときはJSON出力を使います。

```bash
sdk.py ftab-dump --path build_<board_name>/ftab.bin
sdk.py ftab-dump --path build_<board_name>/ftab.bin --format json
```

テーブル表示には、パーティションエントリー、DFUと起動フローで使うイメージの説明、HCPU、LCPU、ブートローダー、ブートイメージそれぞれの実行中イメージを指すポインターが表示されます。

## 製品レビュー { #product-review }

- [ ] ボードのテーブルを使うのか、プロジェクト固有の構成を使うのかを意図的に選択している。
- [ ] 選択したv1、v2、v3の構文が、ビルドシステムが実際に検出するファイルと一致している。
- [ ] 特にXiP以外のストレージやPSRAMについて、イメージの格納先と実行位置が正しい。
- [ ] アプリケーション、バックアップ、DFU、ファイルシステム、キャリブレーション、アプリケーション管理データに十分な容量があり、領域が重複していない。
- [ ] 生成された`ptab.h`、`ftab.bin`、およびv3オーバーレイを使う場合は`ptab.effective.yaml`を確認している。
- [ ] 通常の更新経路とは別に、復旧用の書き込み手順を記録している。

詳細は、SiFli-SDKの公式ドキュメント [パーティションテーブル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table.html)、[v1](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v1.html)、[v2](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v2.html)、[v3](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/middleware/partition_table_v3.html) を参照してください。
