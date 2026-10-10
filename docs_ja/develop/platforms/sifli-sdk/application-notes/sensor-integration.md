---
icon: lucide/satellite-dish
title: "センサーの統合と読み出し"
description: "SiFli-SDK にセンサーを追加し、RT-Thread 経由で接続してデバイス登録を行い、FinSH シェルから検証するまでの手順を説明します。"
tags: [開発, SiFli-SDK, アプリケーションノート, センサー]
---

# センサーの統合と読み出し { #integrate-and-read-sensors }

この記事では、SiFli の[センサー統合ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)を、実用的なドライバー開発手順としてまとめています。同じガイドは SF32LB52x、SF32LB55x、SF32LB56x、SF32LB58x 向けに公開されています。ファイルパスやシンボルを転用する前に、対象 SDK ブランチを確認してください。センサーのデータシートと基板配線の確認から、Kconfig の設定、バスの読み書きコールバック、割り込み処理、RT-Thread センサー登録、コマンドラインでの検証までを扱います。

例では、6 軸センサーの LSM6DSL（加速度センサーとジャイロスコープ）および温度・気圧センサーの BMP280 を使用します。SDK ガイドの API 名とサンプル識別子をそのまま示しています。製品に転用する前に、対象 SDK ブランチを確認してください。

!!! note "対象ファミリー"
    この記事では、SF32LB52x、SF32LB55x、SF32LB56x、SF32LB58x 向けに共通するセンサードライバー開発の流れをまとめています。LSM6DSL/BMP280 のコードは実装例です。実際のバスインスタンス、GPIO 番号、割り込み経路、Kconfig のパス、利用できる周辺機能は、対象ファミリーやボードによって異なります。

## ハードウェアとセンサーインターフェースを確認する { #1-confirm-the-hardware-and-sensor-interface }

まずセンサーのデータシートを読み、センサーの機能とホスト側インターフェースを確認します。SDK ガイドでは、6 軸（加速度・ジャイロ）、温度、気圧、地磁気、照度、GPS、モーターの各センサーを例に挙げています。このガイドで扱うホスト側インターフェースは I2C、SPI、UART です。

ドライバーを実装する前に、次を確認してください。

- ハードウェア設計を確認し、選択したバスが有効になっていて、パッケージの端子まで配線されていること。
- センサーと SF32 デバイスの電圧範囲および周波数範囲に互換性があること。
- バス名、デバイスアドレス、チップセレクト（該当する場合）、電源制御、リセット、割り込みピンを特定すること。
- ドライバーがアプリケーションに提供するデータ操作と制御操作を、アプリケーション担当者と合意すること。

## ドライバーとビルド設定を準備する { #2-prepare-the-driver-and-build-configuration }

SiFli-SDK の周辺機器ドライバーは `rtos/rthread/bsp/sifli/peripherals` 以下にあります。バスと実装方式を決めたら、新しいデバイス用のディレクトリを追加します。`rtos/rthread/bsp/sifli/peripherals/Kconfig` に `menuconfig` エントリーを追加し、次の項目を含めます。

- センサーの有効化スイッチ。
- 対応するバスの選択と名称（I2C、SPI、UART など）。
- 電源、リセット、チップセレクト、割り込み用 GPIO の設定。
- 活動検出、歩数計、FIFO などの任意のセンサー機能。

新しいディレクトリにドライバーを実装します。ボード固有の値をハードコードせず、バス名、GPIO 番号、割り込み番号は Kconfig シンボルから読み取ります。最後に、そのディレクトリの `SConscript` ファイルでドライバーと Kconfig シンボルを関連付けます。

プロジェクトディレクトリから `menuconfig` を実行し、**Select board peripherals** を選択して新しいモジュールを有効化します。その配下の設定でボード固有の値を設定します。

## Kconfig でインターフェースを設定する { #3-configure-the-interface-in-kconfig }

次の Kconfig 例は SF32LB52x ガイドから抜粋したもので、6 軸センサーグループの下で LSM6DSL を有効にします。`SENSOR_USING_6D` はグループ全体のスイッチで、その子スイッチが LSM6DSL の実装を選択します。

```kconfig
menuconfig SENSOR_USING_6D
    bool "Enable 6D Sensor for Accelerator and Gyro"
    default n
    if SENSOR_USING_6D
        menuconfig ACC_USING_LSM6DSL
            bool "Enable Accelerator and Gyro LSM6DSL"
            select RT_USING_SENSOR
            default n
            if ACC_USING_LSM6DSL
                config LSM6DSL_USING_I2C
                int "LSM6DSL BUS type: 1 = I2C, 0 = SPI"
                default 0
                config LSM6DSL_BUS_NAME
                string "Sensor LSM6DSL BUS name"
                default "spi1"
                
                config LSM6DSL_INT_GPIO_BIT
                int "LSM6DSL Interrupt 1 PIN"
                default 97
                config LSM6DSL_INT2_GPIO_BIT
                int "LSM6DSL Interrupt 2 PIN"
                default 94

                config LSM_USING_AWT
                bool "Enable AWT fucntion"
                default y
                config LSM_USING_PEDO
                bool "Enable Pedometer fucntion"
                default y
                config LSM6DSL_USE_FIFO
                bool "LSM6DSL use fifo"
                default y
            endif
    endif
```

グループスイッチには、LSM6DSL や SC7A20 など複数の対応モデルを含めることができます。外部インターフェースが競合しないよう、1 つのバス構成では対象モデルだけを有効にしてください。この例の各設定は次のとおりです。

- `ACC_USING_LSM6DSL` は LSM6DSL ドライバーを有効にします。
- `LSM6DSL_USING_I2C` は I2C（`1`）または SPI（`0`）を選択します。センサーが 1 種類のインターフェースにしか対応しない場合、このシンボルは省略します。
- `LSM6DSL_BUS_NAME` は、RT-Thread センサードライバーが検索するバスデバイス名です。
- ボードで割り当てている場合、`LSM6DSL_INT_GPIO_BIT` と `LSM6DSL_INT2_GPIO_BIT` に割り込みピンを指定します。
- `LSM_USING_AWT`、`LSM_USING_PEDO`、`LSM6DSL_USE_FIFO` はデバイス固有の機能です。選択したドライバーが対応する場合にのみ定義します。

この例は SF32LB52x ガイドに準拠しています。他のファミリーのガイドや SDK ブランチでは、オプションやメニューのパスが異なる場合があります。例を適用する前に、対象ブランチで実際のシンボルを確認してください。

### バスを取得してレジスターアクセスを実装する { #find-the-bus-and-implement-register-access }

`rt_i2c_bus_device_find` または `rt_device_find` でバスデバイスを取得し、選択したインターフェースに対応するバス読み書き API を呼び出します。デバイスアドレス、レジスターマップ、コマンドシーケンス、レジスター幅については、センサーのデータシートを一次情報として扱ってください。

```c
int LSM6DSL_I2C_Init()
{
    /* get i2c bus device */
    lsm6dsl_content.bus_handle = rt_i2c_bus_device_find(LSM6DSL_BUS_NAME);
    if (lsm6dsl_content.bus_handle)
    {
        LOG_D("Find i2c bus device %s\n", LSM6DSL_BUS_NAME);
    }
    else
    {
        LOG_E("Can not found i2c bus %s, init fail\n", LSM6DSL_BUS_NAME);
        return -1;
    }

    return 0;
}

int32_t LSM_I2C_Write(void *ctx, uint8_t reg, uint8_t *data, uint16_t len)
{
    rt_size_t res;

    struct LSM6DSL_CONT_T *handle = (struct LSM6DSL_CONT_T *)ctx;

    if (handle && handle->bus_handle && data)
    {
        uint16_t addr16 = (uint16_t)reg;
        res = rt_i2c_mem_write(handle->bus_handle, handle->dev_addr, addr16, 8, data, len);
        if (res > 0)
            return 0;
        else
            return -2;
    }

    return -3;
}

int32_t LSM_I2C_Read(void *ctx, uint8_t reg, uint8_t *data, uint16_t len)
{
    rt_size_t res;
    struct LSM6DSL_CONT_T *handle = (struct LSM6DSL_CONT_T *)ctx;

    if (handle && handle->bus_handle && data)
    {
        uint16_t addr16 = (uint16_t)reg;
        res = rt_i2c_mem_read(handle->bus_handle, handle->dev_addr, addr16, 8, data, len);
        if (res > 0)
            return 0;
        else
            return -2;
    }

    return -3;
}
```

このサンプルは、バスが見つからない場合に `-1`、バス転送が失敗した場合に `-2`、コンテキスト、バスハンドル、データポインターが無効な場合に `-3` を返します。エラー処理方針は、周辺のドライバー実装に合わせてください。

### センサー割り込みを設定する { #configure-a-sensor-interrupt }

`rt_pin_mode` で割り込みピンを入力に設定し、`rt_pin_attach_irq` でハンドラーとトリガー条件を登録します。割り込みの有効／無効は `rt_pin_irq_enable` で切り替えます。SDK では、立ち上がりエッジ（`PIN_IRQ_MODE_RISING`）、立ち下がりエッジ（`PIN_IRQ_MODE_FALLING`）、両エッジ（`PIN_IRQ_MODE_RISING_FALLING`）、High／Low レベル（`PIN_IRQ_MODE_HIGH_LEVEL`／`PIN_IRQ_MODE_LOW_LEVEL`）の各トリガーに対応しています。ハンドラーの内容はセンサーによって異なります。

```c
int lsm6dsl_gpio_int_enable(void)
{
    struct rt_device_pin_mode m;

    // get pin device
    rt_device_t device = rt_device_find("pin");
    if (!device)
    {
        LOG_E("GPIO pin device not found at LSM6DSL\n");
        return -1;
    }

    rt_device_open(device, RT_DEVICE_OFLAG_RDWR);

    // int pin cfg
    m.pin = LSM6DSL_INT_GPIO_BIT;
    m.mode = PIN_MODE_INPUT;
    rt_device_control(device, 0, &m);

    // enable LSM int
    rt_pin_mode(LSM6DSL_INT_GPIO_BIT, PIN_MODE_INPUT);
    rt_pin_attach_irq(m.pin, PIN_IRQ_MODE_RISING, lsm6dsl_int1_handle, (void *)(rt_uint32_t)m.pin);
    rt_pin_irq_enable(m.pin, 1);

    return 0;
}
```

## RT-Thread センサーデバイスを登録する { #4-register-the-rt-thread-sensor-device }

新しいデバイス用のディレクトリに `sensor_xxx.c` を追加します。このファイルでは、RT-Thread のセンサーフレームワーク経由でデバイスを公開し、アプリケーションコードがバス固有のレジスター関数を直接呼び出さずにセンサーを使えるようにします。

登録処理は次の 2 つで構成されます。

1. 1 つ以上の `rt_sensor_device` インスタンスを割り当て、`rt_hw_sensor_register` で登録する。
2. データ読み出し、動作モード制御、スリープ／復帰処理の `sensor_ops` コールバックを用意する。

SDK ガイドの BMP280 の例では、温度と気圧のチャンネルを別々に登録し、それぞれの単位と範囲を設定したうえで、共通設定をコピーし、コールバックテーブルを共有しています。

```c
int rt_hw_bmp280_init(const char *name, struct rt_sensor_config *cfg)
{
    rt_int8_t result;
    rt_sensor_t sensor_temp = RT_NULL, sensor_baro = RT_NULL;

    result = _bmp280_init();
    if (result != RT_EOK)
    {
        LOG_E("bmp280 init err code: %d", result);
        goto __exit;
    }

    /* temperature sensor register */
    {
        sensor_temp = rt_calloc(1, sizeof(struct rt_sensor_device));
        if (sensor_temp == RT_NULL)
            goto __exit;

        sensor_temp->info.type       = RT_SENSOR_CLASS_TEMP;
        sensor_temp->info.vendor     = RT_SENSOR_VENDOR_BOSCH;
        sensor_temp->info.model      = "bmp280_temp";
        sensor_temp->info.unit       = RT_SENSOR_UNIT_DCELSIUS;
        sensor_temp->info.intf_type  = RT_SENSOR_INTF_I2C;
        sensor_temp->info.range_max  = 85;
        sensor_temp->info.range_min  = -40;
        sensor_temp->info.period_min = 5;

        rt_memcpy(&sensor_temp->config, cfg, sizeof(struct rt_sensor_config));
        sensor_temp->ops = &sensor_ops;

        result = rt_hw_sensor_register(sensor_temp, name, RT_DEVICE_FLAG_RDWR, RT_NULL);
        if (result != RT_EOK)
        {
            LOG_E("device register err code: %d", result);
            goto __exit;
        }
    }

    /* barometer sensor register */
    {
        sensor_baro = rt_calloc(1, sizeof(struct rt_sensor_device));
        if (sensor_baro == RT_NULL)
            goto __exit;

        sensor_baro->info.type       = RT_SENSOR_CLASS_BARO;
        sensor_baro->info.vendor     = RT_SENSOR_VENDOR_BOSCH;
        sensor_baro->info.model      = "bmp280_bora";
        sensor_baro->info.unit       = RT_SENSOR_UNIT_PA;
        sensor_baro->info.intf_type  = RT_SENSOR_INTF_I2C;
        sensor_baro->info.range_max  = 110000;
        sensor_baro->info.range_min  = 30000;
        sensor_baro->info.period_min = 5;

        rt_memcpy(&sensor_baro->config, cfg, sizeof(struct rt_sensor_config));
        sensor_baro->ops = &sensor_ops;

        result = rt_hw_sensor_register(sensor_baro, name, RT_DEVICE_FLAG_RDWR, RT_NULL);
        if (result != RT_EOK)
        {
            LOG_E("device register err code: %d", result);
            goto __exit;
        }
    }

    LOG_I("sensor init success");
    return RT_EOK;

__exit:
    if (sensor_temp)
        rt_free(sensor_temp);
    if (sensor_baro)
        rt_free(sensor_baro);
    if (bmp_dev)
        rt_free(bmp_dev);
    return -RT_ERROR;
}
```

`type`、`vendor`、`model`、`unit`、`intf_type`、有効範囲、最小周期には、デバイスのデータシートに記載された値を設定します。メモリー確保またはいずれかの登録が失敗した場合も、必要なリソースをすべて解放できるようにしてください。

**ソース例のクリーンアップに関する注意：**温度デバイスの登録に成功した後、気圧デバイスのメモリー確保または登録に失敗すると、例のクリーンアップ処理は温度デバイスを登録解除せずに解放します。製品コードでは、登録に成功したデバイスを記録し、対象 RT-Thread バージョンがサポートする削除 API で登録解除してから、その領域を解放してください。この失敗時の処理をそのまま流用しないでください。

## FinSH からドライバーを検証する { #5-validate-the-driver-from-finsh }

ドライバーをイメージに組み込んだら、コマンドライン関数を追加し、`FINSH_FUNCTION_EXPORT_ALIAS` で登録します。検証コマンドには、次の確認項目を含めると有効です。

- センサーの初期化とデバイスアドレスの検出。
- I2C または SPI 経由でのレジスター読み書き。
- 気圧、温度、加速度など、センサー固有の機能の測定結果。

次の BMP280 テストコマンドは、デバイスのオープン／クローズ、レジスター読み出し、温度・気圧・高度の取得、I2C バス速度の設定例です。

```c
#define DRV_BMP280_TEST

#ifdef DRV_BMP280_TEST
#include <string.h>

int cmd_bmpt(int argc, char *argv[])
{
    int32_t temp, pres, alti;
    if (argc < 2)
    {
        LOG_I("Invalid parameter!\n");
        return 1;
    }
    if (strcmp(argv[1], "-open") == 0)
    {
        uint8_t res = BMP280_Init();
        if (BMP280_RET_OK == res)
        {
            BMP280_open();
            LOG_I("Open bmp280 success\n");
        }
        else
            LOG_I("open bmp280 fail\n");
    }
    if (strcmp(argv[1], "-close") == 0)
    {
        BMP280_close();
        LOG_I("BMP280 closed\n");
    }
    if (strcmp(argv[1], "-r") == 0)
    {
        uint8_t rega = atoi(argv[2]) & 0xff;
        uint8_t value;
        BMP280_ReadReg(rega, 1, &value);
        LOG_I("Reg 0x%x value 0x%x\n", rega, value);
    }
    if (strcmp(argv[1], "-tpa") == 0)
    {
        temp = 0;
        pres = 0;
        alti = 0;
        BMP280_CalTemperatureAndPressureAndAltitude(&temp, &pres, &alti);
        LOG_I("Get temperature = %.1f\n", (float)temp / 10);
        LOG_I("Get pressure= %.2f\n", (float)pres / 100);
        LOG_I("Get altitude= %.2f\n", (float)alti / 100);
    }
    if (strcmp(argv[1], "-bps") == 0)
    {
        struct rt_i2c_configuration cfg;
        int bps = atoi(argv[2]);
        cfg.addr = 0;
        cfg.max_hz = bps;
        cfg.mode = 0;
        cfg.timeout = 5000;
        rt_i2c_configure(i2cbus, &cfg);
        LOG_I("Config BMP I2C speed to %d\n", bps);
    }

    return 0;
}
FINSH_FUNCTION_EXPORT_ALIAS(cmd_bmpt, __cmd_bmpt, Test driver bmp280);

#endif //DRV_BMP280_TEST
```

読み出し値を有効と判断する前に、デバイスアドレスを確認し、既知の ID レジスターまたはキャリブレーションレジスターを読み出して、実測値が想定範囲にあることを確かめます。このコマンド例は基本的な立ち上げ確認用であり、そのまま製品用 CLI として使えるものではありません。製品に組み込む前に、各サブコマンドの引数の個数と値の範囲を検証し、デバイス/API 呼び出しの戻り値を確認したうえで、境界チェックを追加してください。

## 関連ページ { #related-pages }

- [ボード設定](../board-configuration.md)：ボードが管理するバス、ピン、周辺機器の設定。
- [コンポーネントと `sf-pkg`](../components.md)：ドライバーが使用するパッケージ依存関係。
- [SDK アプリケーションノート](../sdk-application-notes.md)：アプリケーションノートの一覧。

## 公式ソース { #official-source }

- [センサー追加ガイド — SiFli SDK プログラミングガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)
- [SF32LB55x センサーガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/sensor.html)
- [SF32LB56x センサーガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/sensor.html)
- [SF32LB58x センサーガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/sensor.html)
