const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const wait = require('node:timers/promises').setTimeout;
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`);
const { SettingsPluginsGetID, toggleOnOff, defaultShop, secondPage } = require(`../../functions`)
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ
const { ClientSettings } = require(`../../schemas/client`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`settings`)
        .setDescription(`Настройки бота гильдии`)
        .setDefaultMemberPermissions(0)
        .setDMPermission(false)
        .addSubcommandGroup(gr => gr
            .setName(`client`)
            .setDescription(`Технические настройки для бота`)
            .addSubcommand(sb => sb
                .setName(`testmode`)
                .setDescription(`Установить режим технического обслуживания`)
                .addBooleanOption(o => o
                    .setName(`статус`)
                    .setDescription(`Выбрать статус технического обслуживания`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`setversion`)
                .setDescription(`Установить версию бота`)
                .addStringOption(o => o
                    .setName(`версия`)
                    .setDescription(`Версия бота`)
                    .setRequired(true)
                )
            )
        )
        .addSubcommandGroup(gr => gr
            .setName(`plugins`)
            .setDescription(`Настройка плагинов бота`)
            .addSubcommand(sb => sb
                .setName(`toggle`)
                .setDescription(`Включить/отключить плагины бота`)
                .addStringOption(o => o
                    .setName(`выбор`)
                    .setDescription(`Выберите плагин, который необходимо изменить`)
                    .setRequired(true)
                    .setAutocomplete(true)
                )
                .addBooleanOption(o => o
                    .setName(`статус`)
                    .setDescription(`Выберите статус, который включит/выключит данный плагин`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`check`)
                .setDescription(`Проверить состояние плагинов`)
            )
        )
        .addSubcommandGroup(gr => gr
            .setName(`shop`)
            .setDescription(`Настройки магазина гильдии`)
            .addSubcommand(sb => sb
                .setName(`addroleitem`)
                .setDescription(`Добавить предмет-роль в магазин`)
                .addStringOption(o => o
                    .setName(`название`)
                    .setDescription(`Название предмета`)
                    .setRequired(true)
                )
                .addStringOption(o => o
                    .setName(`магазин`)
                    .setDescription(`Магазин предмета`)
                    .setRequired(true)
                    .addChoices(
                        {
                            name: `Королевский магазин`,
                            value: `KG`
                        },
                        {
                            name: `Магазин активности`,
                            value: `AC`
                        },
                        {
                            name: `Обычный магазин`,
                            value: `SH`
                        }
                    )
                )
                .addRoleOption(o => o
                    .setName(`роль`)
                    .setDescription(`Роль, которая будет продаваться в магазине`)
                    .setRequired(true)
                )
                .addIntegerOption(o => o
                    .setName(`цена`)
                    .setDescription(`Цена предмета (валюта зависит от кода магазина)`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`addstaticitem`)
                .setDescription(`Добавить предмет без роли в магазин`)
                .addStringOption(o => o
                    .setName(`название`)
                    .setDescription(`Название предмета`)
                    .setRequired(true)
                )
                .addStringOption(o => o
                    .setName(`магазин`)
                    .setDescription(`Магазин предмета`)
                    .setRequired(true)
                    .addChoices(
                        {
                            name: `Королевский магазин`,
                            value: `KG`
                        },
                        {
                            name: `Магазин активности`,
                            value: `AC`
                        },
                        {
                            name: `Обычный магазин`,
                            value: `SH`
                        }
                    )
                )
                .addIntegerOption(o => o
                    .setName(`цена`)
                    .setDescription(`Цена предмета (валюта зависит от кода магазина)`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`additem`)
                .setDescription(`Добавить предмет в товар в магазине`)
                .addStringOption(o => o
                    .setName(`код`)
                    .setDescription(`Код товара, в который нужно добавить роль`)
                    .setRequired(true)
                )
                .addRoleOption(o => o
                    .setName(`роль`)
                    .setDescription(`Роль, которую необходимо добавить`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`removeitemfrom`)
                .setDescription(`Удалить предмет из товара в магазине`)
                .addStringOption(o => o
                    .setName(`код`)
                    .setDescription(`Код товара, из которого нужно удалить роль`)
                    .setRequired(true)
                )
                .addRoleOption(o => o
                    .setName(`роль`)
                    .setDescription(`Роль, которую удалить`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`items`)
                .setDescription(`Посмотреть информацию о каждом предмете`)
                .addStringOption(o => o
                    .setName(`магазин`)
                    .setDescription(`Выберите магазин, предметы которого хотите посмотреть`)
                    .setRequired(true)
                    .addChoices(
                        {
                            name: `Королевский магазин`,
                            value: `KG`
                        },
                        {
                            name: `Магазин активности`,
                            value: `AC`
                        },
                        {
                            name: `Обычный магазин`,
                            value: `SH`
                        }
                    )
                )
            )
            .addSubcommand(sb => sb
                .setName(`removeitem`)
                .setDescription(`Удалить предмет из магазина`)
                .addStringOption(o => o
                    .setName(`код`)
                    .setDescription(`Код предмета, который нужно удалить`)
                    .setRequired(true)
                )
            )
        )
        .addSubcommandGroup(gr => gr
            .setName(`seasonal`)
            .setDescription(`Настройки сезонов гильдии`)
            .addSubcommand(sb => sb
                .setName(`hw_channel_add`)
                .setDescription(`Добавить канал для сезона "Хэллоуин"`)
                .addChannelOption(o => o
                    .setName(`канал`)
                    .setDescription(`Канал, который нужно добавить в сезон`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`hw_channel_remove`)
                .setDescription(`Удалить канал из сезона "Хэллоуин"`)
                .addStringOption(o => o
                    .setName(`id`)
                    .setDescription(`ID канала, который нужно удалить из сезона`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`hw_channel_check`)
                .setDescription(`Проверить каналы для сезона "Хэллоуин"`)
            )
            .addSubcommand(sb => sb
                .setName(`forcestart`)
                .setDescription(`Запустить сезон в гильдии`)
                .addStringOption(o => o
                    .setName(`сезон`)
                    .setDescription(`Сезон, который будет запущен`)
                    .setRequired(true)
                    .addChoices(
                        {
                            name: `Хэллоуин`,
                            value: `Хэллоуин`
                        },
                        {
                            name: `Новый год`,
                            value: `Новый год`
                        },
                        {
                            name: `Пасха`,
                            value: `Пасха`
                        },
                        {
                            name: `Лето`,
                            value: `Лето`
                        },

                    ))
            )
            .addSubcommand(sb => sb
                .setName(`forceend`)
                .setDescription(`Отключить сезон в гильдии`)
                .addStringOption(o => o
                    .setName(`сезон`)
                    .setDescription(`Сезон, который будет отключен`)
                    .setRequired(true)
                    .addChoices(
                        {
                            name: `Хэллоуин`,
                            value: `Хэллоуин`
                        },
                        {
                            name: `Новый год`,
                            value: `Новый год`
                        },
                        {
                            name: `Пасха`,
                            value: `Пасха`
                        },
                        {
                            name: `Лето`,
                            value: `Лето`
                        },

                    ))
            )
        )
        .addSubcommandGroup(gr => gr
            .setName(`users`)
            .setDescription(`Настройки пользователей`)
            .addSubcommand(sb => sb
                .setName(`removecolor`)
                .setDescription(`Удалить пользовательский цвет`)
                .addUserOption(o => o
                    .setName(`пользователь`)
                    .setDescription(`Пользователь, цвет которого нужно удалить`)
                    .setRequired(true)))),
    async autoComplete(interaction, client) {
        const gr = interaction.options.getSubcommandGroup()
        const sb = interaction.options.getSubcommand()
        switch (gr) {
            case `plugins`: {
                switch (sb) {
                    case `toggle`: {
                        const focusedValue = interaction.options.getFocused();
                        const choices = [
                            'Предметы',
                            'Косметика',
                            'Достижения',
                            'Питомцы',
                            'Система никнеймов',
                            'Премиум',
                            'Новые участники',
                            'Дни рождения',
                            'Служба поддержки',
                            'Модерация',
                            'Безопасность',
                            'Временные каналы',
                            'Личные сообщения бота',
                            'Логи',
                            'Временные роли',
                            'Автороли',
                            'Обновление пользователей',
                            'Обновление каналов',
                            'Опыт гильдии',
                            'Музыка',
                            'Сезонное',
                            'Совместные игры'
                        ];
                        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase())).slice(0, 25);
                        await interaction.respond(
                            filtered.map(choice => ({ name: choice, value: choice })),
                        );
                    }

                        break;

                    default:
                        break;
                }
            }
                break;

            default:
                break;
        }
    },
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) return interaction.reply({
            content: `У вас недостаточно прав, чтобы использовать данную команду!`,
            ephemeral: true
        })
        const { guild, member, user, channel, options } = interaction
        const gr = options.getSubcommandGroup()
        const sb = options.getSubcommand()
        let guildData = await Guild.findOne({ id: guild.id })
        const clientData = await ClientSettings.findOne({ clientid: client.user.id })
        let { plugins } = guildData

        switch (gr) {
            case `client`: {
                switch (sb) {
                    case `testmode`: {

                        const toggleTo = options.getBoolean(`статус`)
                        clientData.testmode = toggleTo
                        clientData.save()
                        await interaction.reply({
                            content: `Режим технических работ был изменён на: ${toggleOnOff(toggleTo)}`,
                            ephemeral: true
                        })
                    }
                        break;
                    case `setversion`: {
                        const newV = options.getString(`версия`)
                        const oldV = clientData.version

                        clientData.version = newV
                        clientData.save()
                        const embed = new EmbedBuilder()
                            .setTitle(`Изменена версия бота`)
                            .setColor(process.env.bot_color)
                            .setDescription(`Версия бота была изменена с \`${oldV}\` на \`${newV}\``)
                            .setThumbnail(client.user.displayAvatarURL())
                            .setTimestamp(Date.now())

                        await interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        })
                    }
                        break;

                    default:
                        break;
                }
            }
                break;
            case `plugins`: {
                let { boxes, cosmetics, achievements, pets, act_exp, rank_exp, shop, nick_system, premium, welcome, birthday, tickets, moderation, security, temp_channels, bot_dms, logs, temp_roles, auto_roles, user_updates, channels, gexp, music, recording, seasonal, guildgames } = plugins

                switch (sb) {
                    case `toggle`: {

                        const string = options.getString(`выбор`)
                        const boolean = options.getBoolean(`статус`)
                        const id = SettingsPluginsGetID(string)
                        if (id == 1) guildData.plugins.cosmetics = boolean
                        else if (id == 2) guildData.plugins.achievements = boolean
                        else if (id == 3) guildData.plugins.pets = boolean
                        else if (id == 7) guildData.plugins.nick_system = boolean
                        else if (id == 8) guildData.plugins.premium = boolean
                        else if (id == 9) guildData.plugins.welcome = boolean
                        else if (id == 10) guildData.plugins.birthday = boolean
                        else if (id == 11) guildData.plugins.tickets = boolean
                        else if (id == 12) guildData.plugins.moderation = boolean
                        else if (id == 13) guildData.plugins.security = boolean
                        else if (id == 14) guildData.plugins.temp_channels = boolean
                        else if (id == 15) guildData.plugins.bot_dms = boolean
                        else if (id == 16) guildData.plugins.logs = boolean
                        else if (id == 17) guildData.plugins.temp_roles = boolean
                        else if (id == 18) guildData.plugins.auto_roles = boolean
                        else if (id == 19) guildData.plugins.user_updates = boolean
                        else if (id == 20) guildData.plugins.channels = boolean
                        else if (id == 21) guildData.plugins.gexp = boolean
                        else if (id == 22) guildData.plugins.music = boolean
                        else if (id == 24) guildData.plugins.items = boolean
                        else if (id == 25) guildData.plugins.seasonal = boolean
                        else if (id == 26) guildData.plugins.guildgames = boolean
                        else if (id == 9999 || id == 0 || id == 4 || id == 5 || id == 6 || id == 23) return interaction.reply({ content: `Данной опции не существует!`, ephemeral: true })

                        guildData.save()
                        const result = toggleOnOff(boolean)
                        const resultid = String(boolean).toUpperCase()
                        await interaction.reply({
                            content: `Статус плагина \`${string}\` был установлен на ${result}!`
                        })

                    }
                        break;

                    case `check`: {
                        let i = 1
                        let { items, cosmetics, achievements, pets, nick_system, premium, welcome, birthday, tickets, moderation, security, temp_channels, bot_dms, logs, temp_roles, auto_roles, user_updates, channels, gexp, music, seasonal, guildgames } = plugins
                        let result = new EmbedBuilder()
                            .setColor(process.env.bot_color)
                            .setTitle(`Статус плагинов гильдии`)
                            .setTimestamp(Date.now())
                            .setDescription(`**${i++}.** \`Предметы\` - Статус: ${toggleOnOff(items)}
**${i++}.** \`Косметика\` - Статус: ${toggleOnOff(cosmetics)}
**${i++}.** \`Достижения\` - Статус: ${toggleOnOff(achievements)}
**${i++}.** \`Питомцы\` - Статус: ${toggleOnOff(pets)}
**${i++}.** \`Система никнеймов\` - Статус: ${toggleOnOff(nick_system)}
**${i++}.** \`Премиум\` - Статус: ${toggleOnOff(premium)}
**${i++}.** \`Новые участники\` - Статус: ${toggleOnOff(welcome)}
**${i++}.** \`Дни рождения\` - Статус: ${toggleOnOff(birthday)}
**${i++}.** \`Служба поддержки\` - Статус: ${toggleOnOff(tickets)}
**${i++}.** \`Модерация\` - Статус: ${toggleOnOff(moderation)}
**${i++}.** \`Безопасность\` - Статус: ${toggleOnOff(security)}
**${i++}.** \`Временные каналы\` - Статус: ${toggleOnOff(temp_channels)}
**${i++}.** \`Личные сообщения бота\` - Статус: ${toggleOnOff(bot_dms)}
**${i++}.** \`Логи\` - Статус: ${toggleOnOff(logs)}
**${i++}.** \`Временные роли\` - Статус: ${toggleOnOff(temp_roles)}
**${i++}.** \`Автороли\` - Статус: ${toggleOnOff(auto_roles)}
**${i++}.** \`Обновление пользователей\` - Статус: ${toggleOnOff(user_updates)}
**${i++}.** \`Обновление каналов\` - Статус: ${toggleOnOff(channels)}
**${i++}.** \`Опыт гильдии\` - Статус: ${toggleOnOff(gexp)}
**${i++}.** \`Музыка\` - Статус: ${toggleOnOff(music)}
**${i++}.** \`Сезонное\` - Статус: ${toggleOnOff(seasonal)}
**${i++}.** \`Совместные игры\` - Статус: ${toggleOnOff(guildgames)}

**РЕЖИМ ТЕХ. РАБОТ**: ${toggleOnOff(clientData.testmode)}`)


                        await interaction.reply({
                            embeds: [result]
                        })

                    }
                        break;
                    default:
                        break;
                }




            }
                break;
            case 'shop': {
                switch (sb) {
                    case `addroleitem`: {
                        const name = interaction.options.getString(`название`)
                        const price = interaction.options.getInteger(`цена`)
                        const shop = interaction.options.getString(`магазин`)
                        const role = interaction.options.getRole(`роль`)
                        let fullCode
                        for (let i = 0; i < guildData.shop.length; i++) {
                            let shop = guildData.shop[i]
                            if (name == shop.name) return interaction.reply({
                                content: `Предмет с таким названием уже существует!`,
                                ephemeral: true
                            })
                            if (shop.roleid.includes(role.id)) return interaction.reply({
                                content: `Предмет с данной ролью уже существует!`,
                                ephemeral: true
                            })
                        }


                        if (shop == `AC`) {
                            const AC = guildData.shop.filter(shop => {
                                return shop.code.startsWith(`AC`)
                            })
                            let b = 1
                            const res = AC.find(a => a.code.endsWith(b))
                            while (res) {
                                b++
                            }
                            console.log
                            fullCode = `AC${b}`
                        }

                        else if (shop == `KG`) {
                            const KG = guildData.shop.filter(shop => {
                                return shop.code.startsWith(`KG`)
                            })
                            let b = 1
                            const res = KG.find(a => a.code.endsWith(b))
                            while (res) {
                                b++
                            }
                            fullCode = `KG${b}`
                        }

                        else if (shop == `SH`) {
                            const SH = guildData.shop.filter(shop => {
                                return shop.code.startsWith(`SH`)
                            })
                            let b = 1
                            const res = SH.find(a => a.code.endsWith(b))
                            while (res) {
                                b++
                            }
                            fullCode = `SH${b}`
                        }


                        guildData.shop.push({
                            name: name,
                            price: price,
                            shop_type: shop,
                            roleid: [role.id],
                            code: fullCode
                        })
                        guildData.save()
                        await interaction.reply({
                            content: `Предмет **\`${name}\`** (код \`${fullCode}\`) был добавлен и имеет цену в \`${price}\` штук валюты магазина! Роль: ${role}`,
                            ephemeral: true
                        })
                    }
                        break;

                    case `addstaticitem`: {
                        const name = interaction.options.getString(`название`)
                        const price = interaction.options.getInteger(`цена`)
                        const shop = interaction.options.getString(`магазин`)

                        let fullCode
                        for (let i = 0; i < guildData.shop.length; i++) {
                            let shop = guildData.shop[i]
                            if (name == shop.name) return interaction.reply({
                                content: `Предмет с таким названием уже существует!`,
                                ephemeral: true
                            })
                        }


                        if (shop == `AC`) {
                            const AC = guildData.shop.filter(shop => {
                                return shop.code.startsWith(`AC`)
                            })
                            let b = 1
                            const res = AC.find(a => a.code.endsWith(b))
                            while (res) {
                                b++
                            }
                            fullCode = `AC${b}`
                        }

                        else if (shop == `KG`) {
                            const KG = guildData.shop.filter(shop => {
                                return shop.code.startsWith(`KG`)
                            })
                            let b = 1
                            const res = KG.find(a => a.code.endsWith(b))
                            while (res) {
                                b++
                            }
                            fullCode = `KG${b}`
                        }

                        else if (shop == `SH`) {
                            const SH = guildData.shop.filter(shop => {
                                return shop.code.startsWith(`SH`)
                            })
                            let b = 1
                            const res = SH.find(a => a.code.endsWith(b))
                            while (res) {
                                b++
                            }
                            fullCode = `SH${b}`
                        }


                        guildData.shop.push({
                            name: name,
                            price: price,
                            shop_type: shop,
                            code: fullCode
                        })
                        guildData.save()

                        await interaction.reply({
                            content: `Предмет **\`${name}\`** (код \`${fullCode}\`) был добавлен и имеет цену в \`${price}\` штук валюты магазина!`,
                            ephemeral: true
                        })
                    }
                        break;
                    case `additem`: {
                        const code = interaction.options.getString(`код`)
                        const role = interaction.options.getRole(`роль`)
                        const shop = guildData.shop.find(sh => sh.code == code)
                        const i = shop.roleid.find(rid => rid == role.id)
                        if (i) return interaction.reply({
                            content: `Данная роль уже есть в этом товаре!`,
                            ephemeral: true
                        })
                        shop.roleid.push(role.id)
                        guildData.save()

                        await interaction.reply({
                            content: `Предмет с кодом \`${code}\` был дополнен ролью ${role}!`,
                            ephemeral: true
                        })
                    }
                        break;

                    case `items`: {
                        let type = interaction.options.getString(`магазин`)

                        let b = 0
                        let shops = guildData.shop.filter(sh => sh.shop_type == type)
                        let mapS = shops.map(async (sh) => {
                            let i = 1
                            let currency
                            if (sh.shop_type == `AC`) currency = `🏷`
                            else if (sh.shop_type == `KG` || sh.shop_type == `SH`) currency = `<:Rumbik:883638847056003072>`
                            if (sh.roleid.length >= 1) {
                                const rolesM = sh.roleid.map(async (roleid) => {
                                    const role = await guild.roles.fetch(roleid)
                                    return role
                                })
                                const roles = await Promise.all(rolesM)

                                return `**${i++}**. Название: \`${sh.name}\`, код: \`${sh.code}\`, цена: \`${sh.price}\`${currency}.
**Роли:**
${roles.join('\n')}`
                            } else {
                                return `**${i++}**. Название: \`${sh.name}\`, код: \`${sh.code}\`, цена: \`${sh.price}\`${currency}.`
                            }

                        })

                        let mProm = await Promise.all(mapS)
                        let map = mProm.slice(0 + (b * 10), 10 + (10 * b))
                        let totalPages = Math.ceil(mapS.length / 10)
                        const selectMenu = new ActionRowBuilder()
                            .addComponents(
                                new SelectMenuBuilder()
                                    .setCustomId(`shoptype`)
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setPlaceholder(`Тип магазина гильдии`)
                                    .addOptions(
                                        {
                                            label: `Магазин активности`,
                                            emoji: `🏷`,
                                            description: `Магазин активности гильдии`,
                                            value: `AC`,
                                            default: defaultShop(type, `AC`)
                                        },
                                        {
                                            label: `Королевский магазин`,
                                            emoji: `👑`,
                                            description: `Королевский магазин гильдии`,
                                            value: `KG`,
                                            default: defaultShop(type, `KG`)
                                        },
                                        {
                                            label: `Обычный магазин`,
                                            emoji: `<:Rumbik:883638847056003072>`,
                                            description: `Обычный магазин гильдии`,
                                            value: `SH`,
                                            default: defaultShop(type, `SH`)
                                        }
                                    )
                            )

                        const buttons = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`prev`)
                                    .setDisabled(true)
                                    .setLabel(`Предыдущая`)
                                    .setStyle(ButtonStyle.Danger)
                                    .setEmoji(`⬅`)
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`next`)
                                    .setDisabled(secondPage(totalPages))
                                    .setLabel(`Следующая`)
                                    .setStyle(ButtonStyle.Success)
                                    .setEmoji(`➡`)
                            )

                        const embed = new EmbedBuilder()
                            .setTitle(`Список товаров`)
                            .setDescription(`${map.join(`\n`)}`)
                            .setColor(process.env.bot_color)
                            .setTimestamp(Date.now())
                            .setFooter({ text: `Страница ${b + 1}/${totalPages}` })

                        const msg = await interaction.reply({
                            embeds: [embed],
                            components: [buttons, selectMenu],
                            fetchReply: true
                        })

                        const collector = msg.createMessageComponentCollector({ time: 300000 })

                        collector.on('collect', async (i) => {
                            if (i.customId == `prev`) {
                                b = b - 1
                                if (b <= 0) {
                                    buttons.components[0].setDisabled(true)
                                } else {
                                    buttons.components[0].setDisabled(false)
                                }
                                map = mapS.slice(0 + (b * 10), 10 + (b * 10))
                                embed.setDescription(`${map.join(`\n`)}`).setFooter({
                                    text: `Страница ${b + 1}/${totalPages}`
                                })
                                await i.deferUpdate()
                                await interaction.editReply({
                                    embeds: [embed],
                                    components: [buttons, selectMenu],
                                    fetchReply: true
                                })
                            } else if (i.customId == `next`) {
                                b = b + 1
                                if (b >= totalPages - 1) {
                                    buttons.components[1].setDisabled(true)
                                } else {
                                    buttons.components[1].setDisabled(false)
                                }
                                map = mapS.slice(0 + (b * 10), 10 + (b * 10))
                                embed.setDescription(`${map.join(`\n`)}`).setFooter({
                                    text: `Страница ${b + 1}/${totalPages}`
                                })
                                await i.deferUpdate()
                                await interaction.editReply({
                                    embeds: [embed],
                                    components: [buttons, selectMenu],
                                    fetchReply: true
                                })
                            } else if (i.customId == `shoptype`) {
                                const value = i.values[0]
                                let type = value
                                selectMenu.components[0].setOptions({
                                    label: `Магазин активности`,
                                    emoji: `🏷`,
                                    description: `Магазин активности гильдии`,
                                    value: `AC`,
                                    default: defaultShop(type, `AC`)
                                },
                                    {
                                        label: `Королевский магазин`,
                                        emoji: `👑`,
                                        description: `Королевский магазин гильдии`,
                                        value: `KG`,
                                        default: defaultShop(type, `KG`)
                                    },
                                    {
                                        label: `Обычный магазин`,
                                        emoji: `<:Rumbik:883638847056003072>`,
                                        description: `Обычный магазин гильдии`,
                                        value: `SH`,
                                        default: defaultShop(type, `SH`)
                                    })
                                shops = guildData.shop.filter(sh => sh.shop_type == value)
                                mapS = shops.map(async (sh) => {
                                    let i = 1
                                    let currency
                                    if (sh.shop_type == `AC`) currency = `🏷`
                                    else if (sh.shop_type == `KG` || sh.shop_type == `SH`) currency = `<:Rumbik:883638847056003072>`
                                    if (sh.roleid.length >= 1) {
                                        const rolesM = sh.roleid.map(async (roleid) => {
                                            const role = await guild.roles.fetch(roleid)
                                            return role
                                        })
                                        const roles = await Promise.all(rolesM)

                                        return `**${i++}**. Название: \`${sh.name}\`, код: \`${sh.code}\`, цена: \`${sh.price}\`${currency}.
**Роли:**
${roles.join('\n')}`
                                    } else {
                                        return `**${i++}**. Название: \`${sh.name}\`, код: \`${sh.code}\`, цена: \`${sh.price}\`${currency}.`
                                    }
                                })
                                mProm = await Promise.all(mapS)
                                totalPages = Math.ceil(mapS.length / 10)
                                b = 0
                                buttons.components[0].setDisabled(true)
                                buttons.components[1].setDisabled(secondPage(totalPages))
                                map = mProm.slice(0 + (b * 10), 10 + (b * 10))
                                embed.setDescription(`${map.join(`\n`)}`).setFooter({
                                    text: `Страница ${b + 1}/${totalPages}`
                                })
                                await i.deferUpdate()
                                await interaction.editReply({
                                    embeds: [embed],
                                    components: [buttons, selectMenu],
                                    fetchReply: true
                                })
                            }
                        })

                        collector.on('end', async (coll) => {
                            selectMenu.components[0].setDisabled(true)
                            buttons.components[0].setDisabled(true)
                            buttons.components[1].setDisabled(true)
                            await interaction.editReply({
                                embeds: [embed],
                                components: [buttons, selectMenu]
                            })
                        })
                    }
                        break;

                    case `removeitem`: {
                        const code = interaction.options.getString(`код`)
                        const i = guildData.shop.findIndex(sh => sh.code == code)
                        const name = guildData.shop[i].name
                        guildData.shop.splice(i, 1)
                        guildData.save()
                        await interaction.reply({
                            content: `Предмет кодом \`${code}\` и именем \`${name}\` был удален!`,
                            ephemeral: true
                        })
                    }
                        break;

                    case `removeitemfrom`: {
                        const code = interaction.options.getString(`код`)
                        const role = interaction.options.getRole(`роль`)
                        const shop = guildData.shop.find(sh => sh.code == code)
                        const i = shop.roleid.findIndex(rid => rid == role.id)
                        console.log(i)
                        if (i == -1) return interaction.reply({
                            content: `Данная роль в этом товаре не найдена!`,
                            ephemeral: true
                        })

                        shop.roleid.splice(i, 1)
                        guildData.save()

                        await interaction.reply({
                            content: `У предмета с кодом \`${code}\` была убрана роль ${role}!`,
                            ephemeral: true
                        })
                        guildData.save()
                    }
                        break;
                    default:
                        break;
                }
            }
                break;

            case "seasonal": {
                switch (interaction.options.getSubcommand()) {
                    case `hw_channel_add`: {
                        const channel = interaction.options.getChannel(`канал`)
                        if (guildData.seasonal.halloween.channels.find(ch => ch.id == channel.id)) return interaction.reply({
                            content: `Данный канал уже есть в списке добавленных!`,
                            ephemeral: true
                        })
                        guildData.seasonal.halloween.channels.push({ id: channel.id })
                        guildData.save()
                        await interaction.reply({
                            content: `Канал ${channel} был добавлен в список Хэллоуинских!`,
                            ephemeral: true
                        })
                    }
                        break;
                    case `hw_channel_remove`: {
                        const channel = interaction.options.getString(`id`)
                        if (!guildData.seasonal.halloween.channels.find(ch => ch.id == channel)) return interaction.reply({
                            content: `Данного канала нет в списке этого сезона!`,
                            ephemeral: true
                        })
                        let i = guildData.seasonal.halloween.channels.findIndex(ch => ch.id == channel)
                        guildData.seasonal.halloween.channels.splice(i, 1)
                        guildData.save()
                        await interaction.reply({
                            content: `Канал ${channel} был удален из списока хэллоуинских!`,
                            ephemeral: true
                        })

                    }
                        break;
                    case `hw_channel_check`: {
                        let i = 1
                        const listMap = guildData.seasonal.halloween.channels.map(async (channel) => {
                            const ch = await interaction.guild.channels.fetch(channel.id)
                            return `**${i++}.** Канал ${ch}, ID \`${channel.id}\``
                        })
                        const list = await Promise.all(listMap)
                        const embed = new EmbedBuilder()
                            .setTitle(`Список каналов сезона "Хэллоуин"`)
                            .setDescription(`${list.join(`\n`)}`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(interaction.guild.iconURL())
                            .setTimestamp(Date.now())

                        await interaction.reply({
                            embeds: [embed]
                        })
                    }
                        break;
                    case `forcestart`: {
                        const season = interaction.options.getString(`сезон`)
                        if (season == `Хэллоуин`) {
                            guildData.seasonal.halloween.enabled = true
                        } else if (season == `Новый год`) {
                            guildData.seasonal.new_year.enabled = true
                        } else if (season == `Пасха`) {
                            guildData.seasonal.easter.enabled = true
                        } else if (season == `Лето`) {
                            guildData.seasonal.summer.enabled = true
                        }

                        guildData.save()
                        await interaction.reply({
                            content: `Сезон \`${season}\` был запущен. Каналы НЕ открыты. Откройте их вручную!`,
                            ephemeral: true
                        })
                    }
                        break;

                    case `forceend`: {
                        const season = interaction.options.getString(`сезон`)
                        if (season == `Хэллоуин`) {
                            guildData.seasonal.halloween.enabled = false
                        } else if (season == `Новый год`) {
                            guildData.seasonal.new_year.enabled = false
                        } else if (season == `Пасха`) {
                            guildData.seasonal.easter.enabled = false
                        } else if (season == `Лето`) {
                            guildData.seasonal.summer.enabled = false
                        }

                        guildData.save()
                        await interaction.reply({
                            content: `Сезон \`${season}\` был отключен. Каналы НЕ были закрыты. Закройте их вручную!`,
                            ephemeral: true
                        })
                    }
                        break;
                    default:
                        break;
                }
            }
                break;
            case `users`: {
                switch (interaction.options.getSubcommand()) {
                    case `removecolor`: {
                        const member = interaction.options.getMember(`пользователь`)
                        const userData = await User.findOne({ userid: member.user.id, guildid: guild.id })
                        if (!userData) return interaction.reply({
                            content: `Данных об этом пользователе нет!`,
                            ephemeral: true
                        })
                        if (userData.custom_color.created === false) return interaction.reply({
                            content: `Пользователь не приобрел свой цвет!`,
                            ephemeral: true
                        })
                        const colorRole = await interaction.guild.roles.fetch(userData.custom_color.role)
                        await colorRole.delete()
                        userData.custom_color.created = false
                        userData.custom_color.hex = ``
                        userData.custom_color.role = ``
                        userData.save()
                        await interaction.reply({
                            content: `Вы успешно удалили пользовательский цвет игрока ${member}!`,
                            ephemeral: true
                        })
                    }
                        break;

                    default:
                        break;
                }
            }
                break;
            default:
                break;
        }
    }
}