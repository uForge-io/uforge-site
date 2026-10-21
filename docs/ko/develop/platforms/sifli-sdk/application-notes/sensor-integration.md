---
icon: lucide/satellite-dish
title: "센서 통합 및 읽기"
description: "SiFli-SDK에 센서를 추가하고, RT-Thread를 통해 연결하고, 디바이스를 등록하고, FinSH 셸에서 검증합니다."
tags: [개발, SiFli-SDK, 애플리케이션 노트, 센서]
---

# 센서 통합 및 읽기 { #integrate-and-read-sensors }

이 문서는 SiFli의 [Sensor integration guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)를 실무적인 센서 드라이버 개발 절차로 정리했습니다. 같은 가이드가 SF32LB52x, SF32LB55x, SF32LB56x, SF32LB58x용으로 제공되므로 경로나 심볼을 복사하기 전에 대상 SDK 브랜치를 확인하십시오. 센서 데이터시트와 보드 배선을 확인하는 단계부터 Kconfig 항목, 버스 읽기/쓰기 콜백, 인터럽트 처리, RT-Thread 센서 등록, 명령줄 검증까지 다룹니다.

예제는 LSM6DSL 6축 센서(가속도계와 자이로스코프) 및 BMP280 온도/기압 센서를 사용합니다. SDK 가이드의 API 이름과 예제 식별자를 그대로 유지했으므로 제품에 적용하기 전에 대상 SDK 브랜치에서 확인하십시오.

!!! note "제품군 범위"
    이 드라이버 절차는 SF32LB52x, SF32LB55x, SF32LB56x, SF32LB58x의 내용을 통합했습니다. LSM6DSL/BMP280 코드는 센서 드라이버 예제입니다. 버스 인스턴스, GPIO 번호, 인터럽트 라우팅, Kconfig 경로, 사용 가능한 주변 장치는 대상 제품군과 보드에 따라 다릅니다.

## 하드웨어와 센서 인터페이스 확인 { #1-confirm-the-hardware-and-sensor-interface }

먼저 센서 데이터시트를 확인해 센서의 기능과 호스트 인터페이스를 파악합니다. SDK 가이드에는 6축 센서(가속도계와 자이로스코프), 온도, 기압, 지자기, 조도, GPS, 모터 센서가 예로 나옵니다. 이 가이드에서 다루는 호스트 인터페이스는 I2C, SPI, UART입니다.

드라이버를 작성하기 전에 다음을 수행하십시오.

- 하드웨어 설계를 확인하여 선택한 버스가 활성화되어 있고 패키지 핀까지 연결되어 있는지 확인합니다.
- 센서와 SF32 디바이스의 전압 및 주파수 범위가 서로 호환되는지 확인합니다.
- 버스 이름, 디바이스 주소, 칩 셀렉트(해당하는 경우), 전원 제어, 리셋, 인터럽트 핀을 파악합니다.
- 드라이버가 노출해야 하는 데이터 및 제어 동작을 애플리케이션 담당자와 합의합니다.

## 드라이버 및 빌드 설정 준비 { #2-prepare-the-driver-and-build-configuration }

SiFli-SDK 주변 장치 드라이버는 `rtos/rthread/bsp/sifli/peripherals` 아래에 있습니다. 버스와 구현 방식을 선택한 후 새 디바이스용 디렉터리를 추가합니다. 다음을 포함하는 `menuconfig` 항목을 `rtos/rthread/bsp/sifli/peripherals/Kconfig`에 추가합니다.

- 센서 활성화 스위치,
- 지원하는 버스 선택 및 이름(예: I2C, SPI 또는 UART),
- 전원, 리셋, 칩 셀렉트, 인터럽트 GPIO 설정,
- 활동 감지, 만보계, FIFO 지원 같은 선택적 센서 기능.

새 디렉터리에 드라이버를 구현합니다. 버스 이름, GPIO 번호, 인터럽트 번호는 보드 값을 하드코딩하지 말고 Kconfig 심볼에서 읽으십시오. 마지막으로 해당 디렉터리의 `SConscript` 파일에서 드라이버를 Kconfig 심볼과 연결합니다.

프로젝트 디렉터리에서 `menuconfig`를 실행하고 **Select board peripherals**를 선택한 다음, 새 모듈을 활성화하고 하위 옵션으로 들어가 보드별 값을 설정합니다.

## Kconfig에서 인터페이스 설정 { #3-configure-the-interface-in-kconfig }

다음 Kconfig 예제는 SF32LB52x 가이드에서 가져온 것입니다. 6축 센서 그룹 아래에서 LSM6DSL을 활성화합니다. `SENSOR_USING_6D`는 그룹 스위치이고, 그 하위 스위치가 LSM6DSL 구현을 선택합니다.

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

그룹 스위치에는 LSM6DSL과 SC7A20처럼 여러 지원 모델을 둘 수 있습니다. 동일한 버스 구성에서 외부 인터페이스 충돌이 나지 않도록 사용할 모델 하나만 활성화하십시오. 이 예제의 각 심볼은 다음과 같습니다.

- `ACC_USING_LSM6DSL`은 LSM6DSL 드라이버를 활성화합니다.
- `LSM6DSL_USING_I2C`는 I2C(`1`) 또는 SPI(`0`)를 선택합니다. 센서가 하나의 인터페이스만 지원하면 이 심볼은 생략합니다.
- `LSM6DSL_BUS_NAME`은 RT-Thread 센서 드라이버가 찾을 버스 디바이스의 이름입니다.
- `LSM6DSL_INT_GPIO_BIT`와 `LSM6DSL_INT2_GPIO_BIT`는 보드가 인터럽트 핀을 할당한 경우 해당 핀을 나타냅니다.
- `LSM_USING_AWT`, `LSM_USING_PEDO`, `LSM6DSL_USE_FIFO`는 디바이스별 기능을 나타냅니다. 선택한 드라이버가 지원하는 경우에만 정의하십시오.

이 예제는 SF32LB52x 가이드를 따릅니다. 다른 제품군 가이드나 SDK 브랜치에서는 옵션이나 메뉴 경로가 다를 수 있으므로, 예제를 적용하기 전에 타깃 브랜치에서 각 심볼을 확인하십시오.

### 버스 찾기 및 레지스터 접근 구현 { #find-the-bus-and-implement-register-access }

`rt_i2c_bus_device_find` 또는 `rt_device_find`로 버스 디바이스를 가져온 다음, 선택한 인터페이스에 맞는 버스 읽기/쓰기 API를 호출합니다. 디바이스 주소, 레지스터 맵, 명령 시퀀스, 레지스터 폭은 센서 데이터시트를 기준으로 확인하십시오.

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

이 샘플은 버스를 찾을 수 없으면 `-1`을, 버스 트랜잭션이 실패하면 `-2`를, 컨텍스트, 버스 핸들 또는 데이터 포인터가 유효하지 않으면 `-3`을 반환합니다. 오류 처리 정책은 이 코드가 속한 드라이버에 맞게 조정하십시오.

### 센서 인터럽트 설정 { #configure-a-sensor-interrupt }

`rt_pin_mode`로 인터럽트 핀을 입력으로 설정하고, `rt_pin_attach_irq`로 핸들러와 트리거 조건을 연결하고, `rt_pin_irq_enable`로 활성화하거나 비활성화합니다. SDK는 상승 에지(`PIN_IRQ_MODE_RISING`), 하강 에지(`PIN_IRQ_MODE_FALLING`), 양쪽 에지(`PIN_IRQ_MODE_RISING_FALLING`), 하이 또는 로우 레벨(`PIN_IRQ_MODE_HIGH_LEVEL` / `PIN_IRQ_MODE_LOW_LEVEL`) 트리거를 나열합니다. 핸들러 자체는 센서에 따라 달라집니다.

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

## RT-Thread 센서 디바이스 등록 { #4-register-the-rt-thread-sensor-device }

새 디바이스 디렉터리에 `sensor_xxx.c` 파일을 추가합니다. 이 파일은 RT-Thread 센서 프레임워크에 디바이스를 등록하여, 애플리케이션 코드가 버스별 레지스터 함수를 직접 호출하지 않고 센서 디바이스를 사용할 수 있게 합니다.

등록 절차는 두 부분으로 나뉩니다.

1. `rt_hw_sensor_register`로 하나 이상의 `rt_sensor_device` 인스턴스를 할당하고 등록합니다.
2. 데이터 읽기, 모드 제어, 슬립/웨이크 전환을 위한 `sensor_ops` 콜백을 제공합니다.

SDK 가이드의 BMP280 예제는 온도 채널과 기압 채널을 각각 등록합니다. 각 채널의 단위와 범위를 설정하고 공통 설정을 복사한 뒤 동일한 콜백 테이블을 공유합니다.

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

`type`, `vendor`, `model`, `unit`, `intf_type`, 유효 범위, 최소 주기를 디바이스 데이터시트에 맞게 설정하십시오. 메모리 할당이나 두 등록 작업 중 하나가 실패하더라도 필요한 자원을 모두 해제하도록 정리 로직을 구현하십시오.

**소스 예제의 정리 관련 주의 사항:** 온도 디바이스 등록에 성공한 뒤 기압 센서의 메모리 할당 또는 등록이 실패하면 예제는 온도 디바이스를 등록 해제하지 않고 메모리만 해제합니다. 제품 코드에서는 등록에 성공한 디바이스를 추적하고, 대상 RT-Thread 버전이 지원하는 제거 API로 각 디바이스의 등록을 해제한 뒤 메모리를 해제하십시오. 이 실패 경로를 그대로 복사하면 안 됩니다.

## FinSH에서 드라이버 검증 { #5-validate-the-driver-from-finsh }

드라이버를 이미지에 포함해 빌드한 뒤 명령줄 함수를 추가하고 `FINSH_FUNCTION_EXPORT_ALIAS`로 등록합니다. 검증 명령에서는 다음 항목을 확인하는 것이 좋습니다.

- 센서 초기화와 디바이스 주소 감지,
- I2C 또는 SPI를 통한 레지스터 읽기와 쓰기,
- 압력, 온도, 가속도 같은 센서별 기능 결과.

다음 BMP280 테스트 명령은 열기, 닫기, 레지스터 읽기, 온도/기압/고도 읽기, I2C 버스 속도 설정을 보여 줍니다.

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

측정값을 유효한 것으로 판단하기 전에 디바이스 주소를 확인하고, 알려진 ID 또는 보정 레지스터를 읽은 뒤 측정값이 예상 범위에 있는지 비교하십시오. 이 명령은 기본 브링업을 돕는 예제이며 양산용 CLI 코드가 아닙니다. 제품에 통합하기 전에 각 서브커맨드의 인자를 검증하고, 디바이스 및 API 호출의 반환값을 확인하며, 범위 검사를 추가하십시오.

## 관련 페이지 { #related-pages }

- [보드 설정](../board-configuration.md) — 보드가 소유하는 버스, 핀, 주변 장치 설정.
- [컴포넌트와 `sf-pkg`](../components.md) — 드라이버가 사용하는 패키지 의존성.
- [SiFli-SDK 애플리케이션 노트](../sdk-application-notes.md) — 전체 애플리케이션 노트 색인.

## 공식 출처 { #official-source }

- [Sensor添加指南 — SiFli SDK 编程指南](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)
- [SF32LB55x 센서 가이드](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/sensor.html)
- [SF32LB56x 센서 가이드](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/sensor.html)
- [SF32LB58x 센서 가이드](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/sensor.html)
