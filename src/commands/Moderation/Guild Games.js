const { ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ModalSubmitInteraction, InteractionType, EmbedBuilder, PermissionFlagsBits, ComponentType, SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const { daysOfWeek } = require(`../../functions`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`guildgames`)
        .setDescription(`Совместные игры`)
        .addSubcommandGroup(gr => gr
            .setName(`settings`)
            .setDescription(`Настройки совместных игр`)
            .addSubcommand(sb => sb
                .setName(`setminutes`)
                .setDescription(`Установить минуту проведения совместных игр`)
                .addStringOption(o => o
                    .setName(`часть`)
                    .setDescription(`Часть совместной игры`)
                    .setRequired(true)
                    .setChoices(
                        {
                            name: `Начало игры`,
                            value: `start`
                        },
                        {
                            name: `Конец игры`,
                            value: `end`
                        }
                    )
                )
                .addIntegerOption(o => o
                    .setName(`число`)
                    .setDescription(`Число, на которое будет изменено время начала или конца совместной`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`sethours`)
                .setDescription(`Установить час проведения совместных игр`)
                .addStringOption(o => o
                    .setName(`часть`)
                    .setDescription(`Часть совместной игры`)
                    .setRequired(true)
                    .setChoices(
                        {
                            name: `Начало игры`,
                            value: `start`
                        },
                        {
                            name: `Конец игры`,
                            value: `end`
                        }
                    )
                )
                .addIntegerOption(o => o
                    .setName(`число`)
                    .setDescription(`Число, на которое будет изменено время начала или конца совместной`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`addday`)
                .setDescription(`Добавить день проведения совместных игр`)
                .addStringOption(o => o
                    .setName(`день`)
                    .setDescription(`День, когда будет проходить совместная игр`)
                    .addChoices(
                        {
                            name: `Понедельник`,
                            value: `1`
                        },
                        {
                            name: `Вторник`,
                            value: `2`
                        },
                        {
                            name: `Среда`,
                            value: `3`
                        },
                        {
                            name: `Четверг`,
                            value: `4`
                        },
                        {
                            name: `Пятница`,
                            value: `5`
                        },
                        {
                            name: `Суббота`,
                            value: `6`
                        },
                        {
                            name: `Воскресенье`,
                            value: `0`
                        }
                    )
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`removeday`)
                .setDescription(`Добавить день проведения совместных игр`)
                .addStringOption(o => o
                    .setName(`день`)
                    .setDescription(`День, когда будет проходить совместная игр`)
                    .addChoices(
                        {
                            name: `Понедельник`,
                            value: `1`
                        },
                        {
                            name: `Вторник`,
                            value: `2`
                        },
                        {
                            name: `Среда`,
                            value: `3`
                        },
                        {
                            name: `Четверг`,
                            value: `4`
                        },
                        {
                            name: `Пятница`,
                            value: `5`
                        },
                        {
                            name: `Суббота`,
                            value: `6`
                        },
                        {
                            name: `Воскресенье`,
                            value: `0`
                        }
                    )
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`addleader`)
                .setDescription(`Добавить ведущего совместной игры`)
                .addUserOption(o => o
                    .setName(`пользователь`)
                    .setDescription(`Ведущий, которого необходимо добавить`)
                    .setRequired(true)
                )
                .addStringOption(o => o
                    .setName(`день`)
                    .setDescription(`День, когда ведущий будет проводить совместную игру`)
                    .addChoices(
                        {
                            name: `Понедельник`,
                            value: `1`
                        },
                        {
                            name: `Вторник`,
                            value: `2`
                        },
                        {
                            name: `Среда`,
                            value: `3`
                        },
                        {
                            name: `Четверг`,
                            value: `4`
                        },
                        {
                            name: `Пятница`,
                            value: `5`
                        },
                        {
                            name: `Суббота`,
                            value: `6`
                        },
                        {
                            name: `Воскресенье`,
                            value: `0`
                        }
                    )
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`removeleader`)
                .setDescription(`Удалить ведущего совместных игр`)
                .addUserOption(o => o
                    .setName(`пользователь`)
                    .setDescription(`Ведущий, которого необходимо убрать`)
                    .setRequired(true)
                )
                .addStringOption(o => o
                    .setName(`день`)
                    .setDescription(`День, который необходимо убрать у ведущего`)
                    .addChoices(
                        {
                            name: `Понедельник`,
                            value: `1`
                        },
                        {
                            name: `Вторник`,
                            value: `2`
                        },
                        {
                            name: `Среда`,
                            value: `3`
                        },
                        {
                            name: `Четверг`,
                            value: `4`
                        },
                        {
                            name: `Пятница`,
                            value: `5`
                        },
                        {
                            name: `Суббота`,
                            value: `6`
                        },
                        {
                            name: `Воскресенье`,
                            value: `0`
                        }
                    )
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`check`)
                .setDescription(`Получить информацию о совместных игр`)
            )
        )
        .addSubcommand(sb => sb
            .setName(`randomgame`)
            .setDescription(`Случайная игра`)
        ),

    async execute(interaction, client) {
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.moderation === false) return interaction.reply({ content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true })
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `❗ Вы не можете использовать это!`
            })
            .setDescription(`Недостаточно прав для использования данной команды`)
            .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
            .setColor(`DarkRed`)
            .setTimestamp(Date.now())
        const { member, guild, user, options } = interaction
        const guildData = await Guild.findOne({ id: guild.id })


        switch (options.getSubcommandGroup()) {
            case `settings`: {
                if (!member.roles.cache.has(`320880176416161802`)) return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
                switch (options.getSubcommand()) {
                    case `setminutes`: {
                        const min = options.getInteger(`число`)
                        const part = options.getString(`часть`)
                        if (min < 0 || min >= 60) return interaction.reply({
                            content: `Число должно быть не менее 0 и не более 59 (Вы указали ${min})!`,
                            ephemeral: true
                        })

                        if (part == `start`) {
                            guildData.guildgames.gamestart_min = min
                            guildData.save()
                            await interaction.reply({
                                content: `Минута начала совместной игры установлена на \`${min}\`!`,
                                ephemeral: true
                            })
                        } else if (part == `end`) {
                            guildData.guildgames.gameend_min = min
                            guildData.save()
                            await interaction.reply({
                                content: `Минута конца совместной игры установлена на \`${min}\`!`,
                                ephemeral: true
                            })
                        }
                    }
                        break;
                    case `sethours`: {
                        const hour = options.getInteger(`число`)
                        const part = options.getString(`часть`)
                        if (hour < 0 || hour >= 24) return interaction.reply({
                            content: `Число должно быть не менее 0 и не более 23 (Вы указали ${hour})!`,
                            ephemeral: true
                        })
                        if (part == `start`) {
                            guildData.guildgames.gamestart_hour = hour
                            guildData.save()
                            await interaction.reply({
                                content: `Час начала совместной игры установлена на \`${hour}\`!`,
                                ephemeral: true
                            })
                        } else if (part == `end`) {
                            guildData.guildgames.gameend_hour = hour
                            guildData.save()
                            await interaction.reply({
                                content: `Час конца совместной игры установлена на \`${hour}\`!`,
                                ephemeral: true
                            })
                        }
                    }
                        break;
                    case `addday`: {
                        const dayString = options.getString(`день`)
                        const day = guildData.guildgames.game_days.find(day => day == dayString)
                        if (day) return interaction.reply({
                            content: `День \`${daysOfWeek(Number(dayString))}\` уже добавлен в список дней проведения совместных игр!`,
                            ephemeral: true
                        })

                        guildData.guildgames.game_days.push(dayString)
                        guildData.save()
                        await interaction.reply({
                            content: `День \`${daysOfWeek(Number(dayString))}\` был добавлен в список дней проведения совместных игр!`,
                            ephemeral: true
                        })
                    }
                        break;
                    case `removeday`: {
                        const dayString = options.getString(`день`)
                        const day = guildData.guildgames.game_days.find(day => day == dayString)
                        if (!day) return interaction.reply({
                            content: `День \`${daysOfWeek(Number(dayString))}\` отсутствует в списке дней проведения совместных игр!`,
                            ephemeral: true
                        })
                        const dayToRemoveIndex = guildData.guildgames.game_days.findIndex(day => day == dayString)
                        const off = guildData.guildgames.officers.findIndex(off => off.day == dayString)
                        if (off) guildData.guildgames.officers.splice(off, 1)
                        guildData.guildgames.game_days.splice(dayToRemoveIndex, 1)
                        guildData.save()
                        await interaction.reply({
                            content: `День \`${daysOfWeek(Number(dayString))}\` был удалён из списка дней проведения совместных игр!`,
                            ephemeral: true
                        })
                    }
                        break;
                    case `addleader`: {
                        const dayString = options.getString(`день`)
                        const user = options.getUser(`пользователь`)
                        const member = options.getMember(`пользователь`)

                        const getMember = guildData.guildgames.officers.find(off => off.day == dayString)
                        if (getMember) return interaction.reply({
                            content: `День, который вы выбрали (\`${daysOfWeek(Number(dayString))}\`) уже занят другим пользователем! <@${getMember.id}>`,
                            ephemeral: true
                        })

                        const getDays = guildData.guildgames.game_days.find(day => day == dayString)
                        if (!getDays) return interaction.reply({
                            content: `Выбранный вами день не является днем проведения совместных игр! Если вы хотите добавить этот день, используйте \`/guildgames settings addday\`!`,
                            ephemeral: true
                        })

                        guildData.guildgames.officers.push({
                            id: user.id,
                            day: dayString
                        })
                        guildData.save()
                        await interaction.reply({
                            content: `${member} был успешно добавлен состав ведущих совместных игр! Он будет проводить совместные в \`${daysOfWeek(Number(dayString))}\`!`,
                            ephemeral: true
                        })
                    }
                        break;
                    case `removeleader`: {
                        const dayString = options.getString(`день`)
                        const user = options.getUser(`пользователь`)
                        const member = options.getMember(`пользователь`)

                        const getMember = guildData.guildgames.officers.find(off => off.day == dayString)
                        if (!getMember) return interaction.reply({
                            content: `День, который вы выбрали (\`${daysOfWeek(Number(dayString))}\`) не занят! Вы не можете удалить этот день у этого человека!`,
                            ephemeral: true
                        })
                        const userAndDayCheck = guildData.guildgames.officers.find(off => off.day == dayString && off.id == user.id)
                        if (!userAndDayCheck) return interaction.reply({
                            content: `День, который вы выбрали (\`${daysOfWeek(Number(dayString))}\`) не занят **данным пользователем**! Вы не можете удалить этот день у этого человека!`,
                            ephemeral: true
                        })
                        const getDays = guildData.guildgames.game_days.find(day => day == dayString)
                        if (!getDays) return interaction.reply({
                            content: `Выбранный вами день не является днем проведения совместных игр, а значит нельзя убрать этот день у этого пользователя. Если хотите добавить этот день, используйте \`/guildgames settings addday\`!`,
                            ephemeral: true
                        })
                        const removeDay = guildData.guildgames.officers.findIndex(off => off.day == dayString && off.id == user.id)
                        guildData.guildgames.officers.splice(removeDay, 1)
                        guildData.save()
                        await interaction.reply({
                            content: `${member} был успешно удалён из состава ведущих совместных игр! Он больше не будет проводить совместные в \`${daysOfWeek(Number(dayString))}\`!`,
                            ephemeral: true
                        })
                    }
                        break;
                    case `check`: {
                        let i = ``
                        const mapDays = guildData.guildgames.game_days.map(day => {
                            return `${daysOfWeek(Number(day))}`
                        }).join(`, `)
                        const offs = guildData.guildgames.officers.sort((a, b) => Number(a.day) - Number(b.day))
                        const offInfo = offs.map(async off => {
                            const memb = await guild.members.fetch(off.id)
                            return `**${i++}.** ${memb} -> ${daysOfWeek(Number(off.day))}`
                        })
                        const promOffs = await Promise.all(offInfo)


                        let min_start
                        let hour_start
                        let min_end
                        let hour_end
                        if (String(guildData.guildgames.gamestart_min).length <= 1) {
                            min_start = `0${guildData.guildgames.gamestart_min}`
                        } else if (String(guildData.guildgames.gamestart_min).length > 1) {
                            min_start = guildData.guildgames.gamestart_min
                        }

                        if (String(guildData.guildgames.gamestart_hour).length <= 1) {
                            hour_start = `0${guildData.guildgames.gamestart_hour}`
                        } else if (String(guildData.guildgames.gamestart_hour).length > 1) {
                            hour_start = guildData.guildgames.gamestart_hour
                        }

                        if (String(guildData.guildgames.gameend_min).length <= 1) {
                            min_end = `0${guildData.guildgames.gameend_min}`
                        } else if (String(guildData.guildgames.gameend_min).length > 1) {
                            min_end = guildData.guildgames.gameend_min
                        }

                        if (String(guildData.guildgames.gameend_hour).length <= 1) {
                            hour_end = `0${guildData.guildgames.gameend_hour}`
                        } else if (String(guildData.guildgames.gameend_hour).length > 1) {
                            hour_end = guildData.guildgames.gameend_hour
                        }
                        const embed = new EmbedBuilder()
                            .setTitle(`Установленные настройки совместных игр`)
                            .setColor(process.env.bot_color)
                            .setTimestamp(Date.now())
                            .setDescription(`**Начало совместной игры**: \`${hour_start}:${min_start}\` по московскому времени
**Конец совместной игры**: \`${hour_end}:${min_end}\` по московскому времени

**Дни совместной игры**: ${mapDays}

**ВЕДУЩИЕ**
${promOffs.join(`\n`)}`)
                        await interaction.reply({
                            embeds: [embed]
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

        switch (options.getSubcommand()) {
            case `randomgame`: {
                if (guildData.guildgames.started === false) return interaction.reply({
                    content: `Совместная игра ещё не началась!`,
                    ephemeral: true
                })
                await interaction.deferReply({
                    fetchReply: true
                })
                await interaction.deleteReply()

                const date = new Date()
                const hour = date.getHours()
                const minutes = date.getMinutes()
                if (hour >= guildData.guildgames.gameend_hour) {
                    if (minutes >= guildData.guildgames.gameend_min) {
                        client.GameEnd()
                    } else if (minutes < guildData.guildgames.gameend_min) {
                        client.randomGame()
                    }
                } else if (hour < guildData.guildgames.gameend_hour) {
                    client.randomGame()
                }
            }
                break;

            default:
                break;
        }

    }
}