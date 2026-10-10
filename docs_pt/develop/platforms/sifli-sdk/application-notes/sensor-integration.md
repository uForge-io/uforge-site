---
icon: lucide/satellite-dish
title: "Integrar e ler sensores"
description: "Adicione um sensor ao SiFli-SDK, conecte-o pelo RT-Thread, registre o dispositivo e valide-o no shell FinSH."
tags: [Desenvolvimento, SiFli-SDK, Notas de aplicação, Sensores]
---

# Integrar e ler sensores { #integrate-and-read-sensors }

Este artigo adapta o [guia de integração de sensores](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html) da SiFli a um fluxo prático de desenvolvimento de drivers. O guia também está disponível para SF32LB52x, SF32LB55x, SF32LB56x e SF32LB58x; confirme o ramo do SDK de destino antes de reutilizar caminhos ou símbolos. O fluxo cobre desde a consulta à folha de dados do sensor e a verificação das conexões da placa até a configuração do Kconfig, callbacks de leitura e escrita do barramento, tratamento de interrupções, registro no framework de sensores do RT-Thread e validação pela linha de comando.

Os exemplos usam o sensor de seis eixos LSM6DSL (acelerômetro e giroscópio) e o sensor de temperatura e pressão barométrica BMP280. Os nomes de API e os identificadores reproduzem os exemplos do guia do SDK; confira o ramo de destino antes de copiá-los para um produto.

!!! note "Escopo por família"
    Este artigo reúne o fluxo de desenvolvimento de drivers para SF32LB52x, SF32LB55x, SF32LB56x e SF32LB58x. O código de LSM6DSL/BMP280 é um exemplo de código de driver de sensor; a instância do barramento, os números de GPIO, o roteamento das interrupções, os caminhos do Kconfig e os periféricos disponíveis dependem da família e da placa de destino.

## Confirme o hardware e a interface do sensor { #1-confirm-the-hardware-and-sensor-interface }

Comece pela folha de dados do sensor e identifique sua função e a interface usada para conectá-lo ao sistema. O guia do SDK cita como exemplos sensores de seis eixos (acelerômetro e giroscópio), de temperatura, pressão barométrica, geomagnéticos e de luz, além de sensores GPS e de motor. As interfaces de host compatíveis neste guia são I2C, SPI e UART.

Antes de escrever o driver:

- Confirme no projeto de hardware que o barramento escolhido está habilitado e conectado aos pinos do encapsulamento.
- Verifique se as faixas de tensão e frequência do sensor são compatíveis com as do dispositivo SF32.
- Identifique o nome do barramento, o endereço do dispositivo, o sinal de seleção do chip (se aplicável), o controle de alimentação, o reset e os pinos de interrupção.
- Alinhe com a equipe de aplicação quais operações de dados e controle o driver deve oferecer.

## Prepare o driver e a configuração de compilação { #2-prepare-the-driver-and-build-configuration }

Os drivers de periféricos do SiFli-SDK ficam em `rtos/rthread/bsp/sifli/peripherals`. Depois de escolher o barramento e a estratégia de implementação, crie um diretório para o novo dispositivo. Inclua no `rtos/rthread/bsp/sifli/peripherals/Kconfig` as opções `menuconfig` correspondentes, incluindo:

- a opção para habilitar o sensor;
- a seleção e o nome de uma interface compatível, como I2C, SPI ou UART;
- as configurações de GPIO para alimentação, reset, chip select e interrupção; e
- funções opcionais do sensor, como detecção de atividade, pedômetro ou suporte a FIFO.

Implemente o driver no novo diretório. Obtenha dos símbolos do Kconfig o nome do barramento e os números de GPIO e de interrupção; não fixe valores específicos da placa no código. Por fim, associe o driver aos símbolos do Kconfig no arquivo `SConscript` desse diretório.

No diretório do projeto, execute `menuconfig`, selecione **Select board peripherals**, habilite o novo módulo e acesse as opções secundárias para configurar os valores específicos da placa.

## Configure a interface no Kconfig { #3-configure-the-interface-in-kconfig }

O exemplo de Kconfig a seguir vem do guia SF32LB52x. Ele habilita o LSM6DSL dentro de um grupo de sensores de seis eixos: `SENSOR_USING_6D` é a opção do grupo, e a opção subordinada seleciona a implementação do LSM6DSL.

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

A opção do grupo pode incluir vários modelos compatíveis, como LSM6DSL e SC7A20. Para evitar conflitos na interface externa, habilite apenas o modelo previsto para a configuração de barramento em uso. Neste exemplo:

- `ACC_USING_LSM6DSL` habilita o driver do LSM6DSL.
- `LSM6DSL_USING_I2C` seleciona I2C (`1`) ou SPI (`0`). Omita esse símbolo se o sensor oferecer apenas uma interface.
- `LSM6DSL_BUS_NAME` define o nome do dispositivo de barramento que o driver de sensores do RT-Thread localizará.
- `LSM6DSL_INT_GPIO_BIT` e `LSM6DSL_INT2_GPIO_BIT` identificam os pinos de interrupção, caso a placa os disponibilize.
- `LSM_USING_AWT`, `LSM_USING_PEDO` e `LSM6DSL_USE_FIFO` representam funções específicas do dispositivo; defina-os somente se o driver selecionado oferecer suporte a elas.

Este exemplo segue o guia SF32LB52x. Guias de outras famílias ou ramos do SDK podem oferecer opções ou caminhos de menu diferentes; antes de aplicá-lo, confira os símbolos definidos no ramo de destino.

### Localize o barramento e implemente o acesso aos registradores { #find-the-bus-and-implement-register-access }

Use `rt_i2c_bus_device_find` ou `rt_device_find` para obter o dispositivo de barramento. Em seguida, chame a API de leitura e escrita correspondente à interface escolhida. A folha de dados do sensor é a referência para o endereço do dispositivo, o mapa de registradores, a sequência de comandos e a largura dos registradores.

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

O exemplo retorna `-1` quando não encontra o barramento, `-2` quando uma transação falha e `-3` quando o contexto, o identificador do barramento ou o ponteiro de dados é inválido. Adapte o tratamento de erros ao driver que integrar esse código.

### Configure uma interrupção do sensor { #configure-a-sensor-interrupt }

Configure o pino de interrupção como entrada com `rt_pin_mode`, associe o manipulador e a condição de disparo com `rt_pin_attach_irq` e habilite ou desabilite a interrupção com `rt_pin_irq_enable`. O SDK lista disparos por borda de subida (`PIN_IRQ_MODE_RISING`), borda de descida (`PIN_IRQ_MODE_FALLING`), ambas as bordas (`PIN_IRQ_MODE_RISING_FALLING`) e nível alto ou baixo (`PIN_IRQ_MODE_HIGH_LEVEL` / `PIN_IRQ_MODE_LOW_LEVEL`). A implementação do manipulador depende do sensor.

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

## Registre o dispositivo de sensor do RT-Thread { #4-register-the-rt-thread-sensor-device }

Adicione um arquivo `sensor_xxx.c` ao diretório do novo dispositivo. Ele deve expor o sensor pelo framework de sensores do RT-Thread, permitindo que a aplicação use a interface unificada do dispositivo em vez de chamar diretamente funções de acesso a registradores específicas do barramento.

O registro tem duas partes:

1. Aloque e registre uma ou mais instâncias `rt_sensor_device` com `rt_hw_sensor_register`.
2. Implemente os callbacks `sensor_ops` para leitura de dados, controle de modo e transições entre suspensão e retomada.

O exemplo BMP280 do guia do SDK registra separadamente os canais de temperatura e pressão barométrica, define suas unidades e faixas, copia a configuração comum e compartilha a tabela de callbacks:

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

Defina `type`, `vendor`, `model`, `unit`, `intf_type`, o intervalo de medição válido e o período mínimo conforme a folha de dados do dispositivo. Garanta que o caminho de limpeza libere todos os recursos se uma alocação ou qualquer registro falhar.

**Atenção à limpeza do exemplo de origem:** se o registro do sensor de temperatura for concluído e, em seguida, falhar a alocação ou o registro do sensor barométrico, o caminho de limpeza do exemplo libera o sensor de temperatura sem antes desfazer o registro. No código do produto, controle quais dispositivos foram registrados com sucesso, remova cada dispositivo do registro usando a API de remoção compatível com a versão do RT-Thread do alvo e só então libere sua memória. Não copie esse caminho de erro sem ajustes.

## Valide o driver pelo FinSH { #5-validate-the-driver-from-finsh }

Depois de incluir o driver na imagem, adicione uma função de linha de comando e registre-a com `FINSH_FUNCTION_EXPORT_ALIAS`. Um comando de validação útil deve verificar:

- a inicialização do sensor e a detecção do endereço do dispositivo;
- a leitura e a escrita de registradores por I2C ou SPI; e
- um resultado funcional específico do sensor, como pressão, temperatura ou aceleração.

O comando de teste do BMP280 a seguir exemplifica a abertura e o fechamento do dispositivo, a leitura de registradores, a obtenção de temperatura/pressão/altitude e a configuração da velocidade do barramento I2C:

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

Antes de aceitar uma leitura, confirme o endereço do dispositivo, leia um registrador de identificação ou calibração conhecido e compare a medição com a faixa esperada. Este comando serve apenas como auxílio básico para a validação inicial, não como código CLI pronto para produção: valide os argumentos de cada subcomando, confira os valores de retorno das chamadas ao dispositivo e às APIs e acrescente verificações de limites antes de integrá-lo a um produto.

## Páginas relacionadas { #related-pages }

- [Configuração da placa](../board-configuration.md) — configurações de barramento, pinos e periféricos gerenciadas pela placa.
- [Componentes e `sf-pkg`](../components.md) — dependências de pacotes usadas pelo driver.
- [Notas de aplicação do SDK](../sdk-application-notes.md) — índice completo das notas de aplicação.

## Fontes oficiais { #official-source }

- [Guia de integração de sensores — Guia de programação do SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)
- [Guia de sensores SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/sensor.html)
- [Guia de sensores SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/sensor.html)
- [Guia de sensores SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/sensor.html)
