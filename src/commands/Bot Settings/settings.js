const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const wait = require('node:timers/promises').setTimeout;
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`);
const { SettingsPluginsGetID, toggleOnOff } = require(`../../functions`)
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`settings`)
        .setDescription(`Настройки бота гильдии`)
        .setDefaultMemberPermissions(0)
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
        ),
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
                            'Запись звука'
                        ];
                        const filtered = choices.filter(choice => choice.startsWith(focusedValue)).slice(0, 25);
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
        const { guild, member, user, channel, options } = interaction
        const gr = options.getSubcommandGroup()
        const sb = options.getSubcommand()
        let guildData = await Guild.findOne({ id: guild.id })
        let { plugins } = guildData

        switch (gr) {
            case `plugins`: {
                let { boxes, cosmetics, achievements, pets, act_exp, rank_exp, shop, nick_system, premium, welcome, birthday, tickets, moderation, security, temp_channels, bot_dms, logs, temp_roles, auto_roles, user_updates, channels, gexp, music, recording } = plugins

                switch (sb) {
                    case `toggle`: {

                        const string = options.getString(`выбор`)
                        const boolean = options.getBoolean(`статус`)
                        const id = SettingsPluginsGetID(string)
                        if (id == 24) guildData.plugins.items = boolean
                        else if (id == 1) guildData.plugins.cosmetics = boolean
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
                        else if (id == 23) guildData.plugins.recording = boolean
                        else if (id == 9999 || id == 0 || id == 4 || id == 5 || id == 6) return interaction.reply({ content: `Данной опции не существует!`, ephemeral: true })

                        guildData.save()
                        const result = toggleOnOff(boolean)
                        const resultid = String(boolean).toUpperCase()
                        await interaction.reply({
                            content: `Статус плагина \`${string}\` был установлен на \`${result}\`!`
                        })

                    }
                        break;

                    case `check`: {
                        let i = 1
                        let { items, cosmetics, achievements, pets, nick_system, premium, welcome, birthday, tickets, moderation, security, temp_channels, bot_dms, logs, temp_roles, auto_roles, user_updates, channels, gexp, music, recording } = plugins
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
**${i++}.** \`Запись звука\` - Статус: ${toggleOnOff(recording)}`)


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

            default:
                break;
        }
    }
}