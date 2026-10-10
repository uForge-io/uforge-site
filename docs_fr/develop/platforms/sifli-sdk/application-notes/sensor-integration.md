---
icon: lucide/satellite-dish
title: "Intégrer et lire des capteurs"
description: "Ajouter un pilote de capteur à SiFli-SDK, enregistrer le dispositif via RT-Thread et le valider depuis le shell FinSH."
tags: [Développement, SiFli-SDK, Notes d’application, Capteurs]
---

# Intégrer et lire des capteurs { #integrate-and-read-sensors }

Cet article reprend le [guide d'intégration de capteurs](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html) de SiFli sous la forme d'un processus pratique de développement de pilote. Le même guide est publié pour SF32LB52x, SF32LB55x, SF32LB56x et SF32LB58x ; vérifiez la branche SDK cible avant de reprendre des chemins ou des symboles. Il couvre le parcours allant de la fiche technique d'un capteur et du câblage de la carte jusqu'à une entrée Kconfig, des callbacks de lecture/écriture de bus, la gestion des interruptions, l'enregistrement du capteur RT-Thread et la validation en ligne de commande.

Les exemples utilisent un capteur six axes LSM6DSL (accéléromètre et gyroscope) et un capteur de température/pression barométrique BMP280. Ils reprennent les noms d'API et les identifiants d'exemple du guide du SDK ; vérifiez la branche SDK cible avant de les intégrer à un produit.

!!! note "Portée par famille"
    La démarche de développement de pilote présentée ici couvre les SF32LB52x, SF32LB55x, SF32LB56x et SF32LB58x. Le code LSM6DSL/BMP280 est un exemple d'implémentation ; l'instance de bus, les numéros GPIO, le routage des interruptions, les chemins Kconfig et les périphériques disponibles dépendent de la famille et de la carte ciblées.

## Confirmer le matériel et l'interface du capteur { #1-confirm-the-hardware-and-sensor-interface }

Commencez par la fiche technique du capteur et identifiez à la fois sa fonction et son interface hôte. Le guide du SDK cite comme exemples des capteurs six axes (accéléromètre et gyroscope), de température, de pression barométrique, géomagnétiques et de lumière, ainsi que des capteurs GPS et de moteur. Les interfaces hôtes prises en charge dans ce guide sont I2C, SPI et UART.

Avant d'écrire un pilote :

- Vérifiez dans la conception matérielle que le bus sélectionné est activé et routé vers les broches du boîtier.
- Vérifiez que le capteur et le dispositif SF32 partagent des plages de tension et de fréquence compatibles.
- Identifiez le nom du bus, l'adresse du dispositif, le signal de sélection de puce (chip select, le cas échéant), le contrôle d'alimentation, la réinitialisation et les broches d'interruption.
- Définissez avec le responsable de l'application les opérations d'accès aux données et de commande que le pilote doit proposer.

## Préparer le pilote et la configuration de compilation { #2-prepare-the-driver-and-build-configuration }

Les pilotes de périphériques SiFli-SDK se trouvent sous `rtos/rthread/bsp/sifli/peripherals`. Après avoir choisi le bus et l'implémentation, ajoutez un répertoire pour le nouveau dispositif. Ajoutez ses entrées `menuconfig` à `rtos/rthread/bsp/sifli/peripherals/Kconfig`, notamment :

- l'option d'activation du capteur ;
- la sélection et le nom d'une interface prise en charge, par exemple I2C, SPI ou UART ;
- les réglages GPIO d'alimentation, de réinitialisation, de sélection de puce et d'interruption ; et
- les fonctions optionnelles du capteur telles que la détection d'activité, un podomètre ou la prise en charge du FIFO.

Implémentez le pilote dans le nouveau répertoire. Lisez le nom du bus, les numéros GPIO et les numéros d'interruption à partir des symboles Kconfig plutôt que de coder en dur les valeurs de la carte. Enfin, associez le pilote à ses symboles Kconfig dans le fichier `SConscript` de ce répertoire.

Depuis le répertoire du projet, exécutez `menuconfig`, choisissez **Select board peripherals**, activez le nouveau module et ouvrez ses sous-options pour définir les valeurs propres à la carte.

## Configurer l'interface dans Kconfig { #3-configure-the-interface-in-kconfig }

L'exemple Kconfig suivant provient du guide SF32LB52x. Il active un LSM6DSL dans un groupe de capteurs six axes : `SENSOR_USING_6D` active le groupe, puis une sous-option sélectionne l'implémentation LSM6DSL.

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

Le groupe peut proposer plusieurs modèles pris en charge, tels que LSM6DSL et SC7A20. Pour une configuration de bus donnée, n'activez qu'un modèle à la fois afin d'éviter les conflits d'interface externe. Dans cet exemple :

- `ACC_USING_LSM6DSL` active le pilote LSM6DSL.
- `LSM6DSL_USING_I2C` sélectionne I2C (`1`) ou SPI (`0`). Omettez ce symbole lorsque le capteur ne prend en charge qu'une seule interface.
- `LSM6DSL_BUS_NAME` nomme le dispositif de bus que le pilote de capteur RT-Thread doit trouver.
- `LSM6DSL_INT_GPIO_BIT` et `LSM6DSL_INT2_GPIO_BIT` décrivent les broches d'interruption lorsque la carte les assigne.
- `LSM_USING_AWT`, `LSM_USING_PEDO` et `LSM6DSL_USE_FIFO` représentent des fonctions spécifiques au dispositif ; ne les définissez que si le pilote sélectionné les prend en charge.

Cet exemple suit le guide SF32LB52x. Les guides d'autres familles ou branches du SDK peuvent proposer des options ou des chemins de menu différents ; vérifiez les symboles effectivement définis dans la branche cible avant de reprendre l'exemple.

### Trouver le bus et implémenter l'accès aux registres { #find-the-bus-and-implement-register-access }

Utilisez `rt_i2c_bus_device_find` ou `rt_device_find` pour obtenir le dispositif de bus. Appelez ensuite l'API de lecture/écriture de bus correspondant à l'interface sélectionnée. La fiche technique du capteur reste l'autorité pour l'adresse du dispositif, la table des registres, la séquence de commandes et la largeur des registres.

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

L'exemple retourne `-1` lorsque le bus est introuvable, `-2` lorsqu'une transaction de bus échoue et `-3` lorsque le contexte, le handle du bus ou le pointeur de données est invalide. Adaptez la gestion des erreurs au reste du pilote.

### Configurer une interruption de capteur { #configure-a-sensor-interrupt }

Configurez la broche d'interruption en entrée avec `rt_pin_mode`, associez le gestionnaire et la condition de déclenchement avec `rt_pin_attach_irq`, puis activez ou désactivez l'interruption avec `rt_pin_irq_enable`. Le SDK propose des déclenchements sur front montant (`PIN_IRQ_MODE_RISING`), front descendant (`PIN_IRQ_MODE_FALLING`), sur les deux fronts (`PIN_IRQ_MODE_RISING_FALLING`) et sur niveau haut ou bas (`PIN_IRQ_MODE_HIGH_LEVEL` / `PIN_IRQ_MODE_LOW_LEVEL`). Le gestionnaire lui-même dépend du capteur.

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

## Enregistrer le dispositif capteur RT-Thread { #4-register-the-rt-thread-sensor-device }

Ajoutez un fichier `sensor_xxx.c` dans le répertoire du nouveau périphérique. Ce fichier rend le capteur accessible via le framework de capteurs de RT-Thread : le code applicatif peut ainsi utiliser le périphérique capteur plutôt qu'appeler directement les fonctions d'accès aux registres propres au bus.

L'enregistrement comporte deux parties :

1. Allouer et enregistrer une ou plusieurs instances `rt_sensor_device` avec `rt_hw_sensor_register`.
2. Fournir les callbacks `sensor_ops` pour les lectures de données, le contrôle de mode et les transitions de veille/réveil.

L'exemple BMP280 du guide du SDK enregistre séparément les canaux de température et de pression barométrique, définit leurs unités et leurs plages, copie la configuration commune et partage la table de callbacks :

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

Réglez `type`, `vendor`, `model`, `unit`, `intf_type`, la plage valide et la période minimale sur les valeurs indiquées dans la fiche technique du périphérique. Prévoyez la libération de toutes les ressources si une allocation ou l'un des deux enregistrements échoue.

**Attention au nettoyage de l'exemple source :** si l'enregistrement du capteur de température réussit, puis que l'allocation ou l'enregistrement du baromètre échoue, la routine de nettoyage de l'exemple libère le capteur de température sans l'avoir d'abord désenregistré. Dans le code produit, suivez les périphériques effectivement enregistrés, désenregistrez chacun d'eux au moyen de l'API de suppression prise en charge par la version RT-Thread cible, puis libérez son stockage. Ne reprenez pas cette gestion d'erreur telle quelle.

## Valider le pilote depuis FinSH { #5-validate-the-driver-from-finsh }

Une fois le pilote intégré dans l'image, ajoutez une fonction en ligne de commande et enregistrez-la avec `FINSH_FUNCTION_EXPORT_ALIAS`. Une commande de validation utile devrait couvrir :

- l'initialisation du capteur et la détection de l'adresse du dispositif ;
- les lectures et écritures de registres via I2C ou SPI ; et
- un résultat fonctionnel spécifique au capteur, tel que la pression, la température ou l'accélération.

La commande de test BMP280 suivante illustre l'ouverture, la fermeture, la lecture de registre, la lecture de température/pression/altitude, et la configuration de la vitesse du bus I2C :

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

Avant d'accepter une mesure, vérifiez l'adresse du périphérique, lisez un registre d'identité ou d'étalonnage connu et comparez la mesure à la plage attendue. Cette commande sert uniquement à une première vérification et ne constitue pas un code CLI prêt pour la production : validez les arguments de chaque sous-commande, contrôlez les valeurs de retour des appels au périphérique et aux API, puis ajoutez des vérifications de limites avant toute intégration dans un produit.

## Pages associées { #related-pages }

- [Configuration de la carte](../board-configuration.md) — bus, broches et réglages de périphériques propres à la carte.
- [Composants et `sf-pkg`](../components.md) — dépendances de paquets utilisées par un pilote.
- [Notes d'application SiFli-SDK](../sdk-application-notes.md) — l'index complet des notes d'application.

## Source officielle { #official-source }

- [Guide d'ajout de capteurs — Guide de programmation SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/sensor.html)
- [Guide des capteurs SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/sensor.html)
- [Guide des capteurs SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/sensor.html)
- [Guide des capteurs SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/sensor.html)
