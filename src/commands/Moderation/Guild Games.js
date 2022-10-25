const { ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ModalSubmitInteraction, InteractionType, EmbedBuilder, PermissionFlagsBits, ComponentType, SlashCommandBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const { daysOfWeek, isURL, secondPage } = require(`../../functions`);
const { Song, SearchResultType } = require('distube');
const wait = require(`node:timers/promises`).setTimeout
const moment = require(`moment`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`gg`)
        .setDescription(`Совместные игры`)
        .setDMPermission(false)
        .addSubcommandGroup(gr => gr
            .setName(`set`)
            .setDescription(`Настройки совместных игр`)
            .addSubcommand(sb => sb
                .setName(`time`)
                .setDescription(`Установить время проведения совместных игр`)
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
                .addStringOption(o => o
                    .setName(`время`)
                    .setDescription(`Время в формате HH:mm (ЧЧ:мм)`)
                    .setRequired(true)
                    .setMaxLength(5)
                    .setMinLength(5)
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
            .addSubcommand(sb => sb
                .setName(`pregame_song`)
                .setDescription(`Изменить предыгровую песню`)
                .addStringOption(o => o
                    .setName(`песня`)
                    .setDescription(`Ссылка на новую предыгровую песню (длительность должна быть менее 10 минут)`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`removesong`)
                .setDescription(`Удалить песню из случайно воспроизводимых`)
                .addStringOption(o => o
                    .setName(`песня`)
                    .setDescription(`Ссылка на песню`)
                    .setRequired(true)
                )
            )
            .addSubcommand(sb => sb
                .setName(`songlist`)
                .setDescription(`Список песен для автовоспроизведения`)
            )
        )
        .addSubcommand(sb => sb
            .setName(`randomgame`)
            .setDescription(`Случайная игра`)
        )
        .addSubcommand(sb => sb
            .setName(`becomeleader`)
            .setDescription(`Стать ведущим совместной игры на сегодня`)
        ),

    async execute(interaction, client) {
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.moderation === false) return interaction.reply({ content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true })
        const err = new EmbedBuilder()
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
            case `set`: {
                if (!member.roles.cache.has(`320880176416161802`)) return interaction.reply({
                    embeds: [err],
                    ephemeral: true
                })
                switch (options.getSubcommand()) {
                    case `time`: {
                        const time = options.getString(`время`)
                        if (!time.includes(`:`)) return interaction.reply({
                            content: `Время должно быть записано в формате \`HH:mm\` (\`ЧЧ:мм\`)!`,
                            ephemeral: true
                        })


                        const timeArray = await time.split(`:`, 2)
                        const test = new Date()
                        let date = test.getDate(), month = test.getMonth() + 1, year = test.getFullYear()
                    
                        if (moment(`${year}-${month}-${date} ${time}`, moment.ISO_8601, true).isValid() === false) return interaction.reply({
                            content: `Введённое вами время не является действительным!`,
                            ephemeral: true
                        })
                        let hour = Number(timeArray[0])
                        if (hour < 0 || hour > 23) return interaction.reply({
                            content: `Час (HH) должен быть в промежутке от 0 до 23!`,
                            ephemeral: true
                        })
                        let min = Number(timeArray[1])
                        if (min < 0 || min > 59) return interaction.reply({
                            content: `Минута (mm) должна быть в промежутке от 0 до 60!`,
                            ephemeral: true
                        })
                        const part = options.getString(`часть`)
                        if (min < 0 || min >= 60) return interaction.reply({
                            content: `Число должно быть не менее 0 и не более 59 (Вы указали ${min})!`,
                            ephemeral: true
                        })


                        if (String(min).length <= 1) {
                            min = `0${min}`
                        } else if (String(min).length > 1) {
                            min = min
                        }

                        if (String(hour).length <= 1) {
                            hour = `0${hour}`
                        } else if (String(hour).length > 1) {
                            hour = hour
                        }


                        if (part == `start`) {
                            guildData.guildgames.gamestart_hour = Number(hour)
                            guildData.guildgames.gamestart_min = Number(min)
                            guildData.save()
                            await interaction.reply({
                                content: `Время начала совместной игры установлено на \`${hour}:${min}\``,
                                ephemeral: true
                            })
                        } else if (part == `end`) {
                            guildData.guildgames.gameend_hour = Number(hour)
                            guildData.guildgames.gameend_min = Number(min)
                            guildData.save()
                            await interaction.reply({
                                content: `Время конца совместной игры установлено на \`${hour}:${min}\``,
                                ephemeral: true
                            })
                        }

                        client.GamePreStart();
                        client.ReminderForOfficer();
                        client.GuildGameStart();
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

                        client.GamePreStart();
                        client.ReminderForOfficer();
                        client.GuildGameStart();
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

                        client.GamePreStart();
                        client.ReminderForOfficer();
                        client.GuildGameStart();
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
                        client.GamePreStart();
                        client.ReminderForOfficer();
                        client.GuildGameStart();
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

                        client.GamePreStart();
                        client.ReminderForOfficer();
                        client.GuildGameStart();
                    }
                        break;
                    case `check`: {
                        let i = 1
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

                    case `pregame_song`: {
                        const song = interaction.options.getString(`песня`)
                        if (isURL(song) === false) return interaction.reply({
                            content: `Песня должна быть ссылкой!`,
                            ephemeral: true
                        })
                        let songDist = await client.distube.search(song, {
                            limit: 1,
                            type: SearchResultType.VIDEO
                        })
                        if (songDist[0].duration > 600) return interaction.reply({
                            content: `[Песня](${song}), которую вы попытались добавить, имеет длительность более 10 минут!`,
                            ephemeral: true,
                            embeds: []
                        })
                        guildData.guildgames.pregame_song = song
                        guildData.save()
                        await interaction.reply({
                            content: `[Песня](${song}) была успешно установлена! Вы сможете услышать её за 10 минут до начала совместной игры!`,
                            ephemeral: true,
                            embeds: []
                        })
                    }
                        break;
                    case `removesong`: {
                        const url = interaction.options.getString(`песня`)
                        const search = guildData.guildgames.music.find(mus => mus.link == url)
                        if (!search) return interaction.reply({
                            content: `Данной песни нет в списке записанных, проверьте ссылку ещё раз!`,
                            ephemeral: true
                        })

                        const i = guildData.guildgames.music.findIndex(mus => mus.link == url)
                        guildData.guildgames.music.splice(i, 1)
                        guildData.save()
                        await interaction.reply({
                            content: `[Песня](${url}) была удалена из списка автовоспроизведения!`,
                            ephemeral: true
                        })
                    }
                        break;
                    case `songlist`: {
                        let n = 0
                        let listM = guildData.guildgames.music.map(async (mus, i) => {
                            const song = await client.distube.search(mus.link, {
                                limit: 1,
                                type: SearchResultType.VIDEO
                            })
                            return `**${++i}**. [${song[0].name}](${mus.link}), отправил <@${mus.sent}>.`
                        })

                        let list = listM.slice(0 + (n * 10), 10 + (n * 10))
                        let listProm = await Promise.all(list)
                        const totalPages = Math.ceil(listM.length / 10)
                        const embed = new EmbedBuilder()
                            .setTitle(`Список песен в автовоспроизведении`)
                            .setDescription(`Список:
${listProm.join(`\n`)}`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(interaction.guild.iconURL())
                            .setFooter({ text: `Страница ${n + 1}/${totalPages}` })
                            .setTimestamp(Date.now())

                        const pages = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`prev`)
                                    .setLabel(`Предыдущая`)
                                    .setEmoji(`⬅`)
                                    .setStyle(ButtonStyle.Danger)
                                    .setDisabled(true)
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`next`)
                                    .setLabel(`Следующая`)
                                    .setEmoji(`➡`)
                                    .setStyle(ButtonStyle.Success)
                                    .setDisabled(secondPage(totalPages))
                            )

                        const msg = await interaction.reply({
                            embeds: [embed],
                            components: [pages],
                            fetchReply: true
                        })
                        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 120000 })

                        collector.on('collect', async (int) => {
                            if (interaction.user.id !== int.user.id) return int.reply({
                                content: `Вы не можете использовать эту кнопку!`,
                                ephemeral: true
                            })
                            if (int.customId == `prev`) {
                                n = n - 1
                                if (n <= 0) {
                                    pages.components[0].setDisabled(true)
                                } else {
                                    pages.components[0].setDisabled(false)
                                }
                                list = listM.slice(0 + (n * 10), 10 + (n * 10))
                                listProm = await Promise.all(list)
                                embed.setDescription(`${listProm.join(`\n`)}`).setFooter({
                                    text: `Страница ${n + 1}/${totalPages}`
                                })
                                pages.components[1].setDisabled(false)
                                await int.deferUpdate()
                                await interaction.editReply({
                                    embeds: [embed],
                                    components: [pages],
                                    fetchReply: true
                                })
                            } else if (int.customId == `next`) {
                                n = n + 1
                                if (n >= totalPages - 1) {
                                    pages.components[1].setDisabled(true)
                                } else {
                                    pages.components[1].setDisabled(false)
                                }
                                list = listM.slice(0 + (n * 10), 10 + (n * 10))
                                listProm = await Promise.all(list)
                                embed.setDescription(`${listProm.join(`\n`)}`).setFooter({
                                    text: `Страница ${n + 1}/${totalPages}`
                                })
                                pages.components[0].setDisabled(false)
                                await int.deferUpdate()
                                await interaction.editReply({
                                    embeds: [embed],
                                    components: [pages],
                                    fetchReply: true
                                })
                            }
                        })
                        collector.on('end', async (res) => {
                            pages.components[0].setDisabled(true)
                            pages.components[1].setDisabled(true)
                            await interaction.editReply({
                                embeds: [embed],
                                components: [pages]
                            })
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
                if (!member.roles.cache.has(`320880176416161802`) && !member.roles.cache.has(`563793535250464809`) && !member.roles.cache.has(`523559726219526184`)) return interaction.reply({
                    embeds: [err],
                    ephemeral: true
                })
                if (guildData.guildgames.started <= 1) return interaction.reply({
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
            case `becomeleader`: {
                if (!member.roles.cache.has(`320880176416161802`) && !member.roles.cache.has(`563793535250464809`) && !member.roles.cache.has(`523559726219526184`)) return interaction.reply({
                    embeds: [err],
                    ephemeral: true
                })
                const date = new Date()
                if (!guildData.guildgames.game_days.includes(date.getDay())) return interaction.reply({
                    content: `По расписанию сегодня нет совместной игры! Попросите администратора изменить это в настройках совместной игры!`,
                    ephemeral: true
                })
                guildData.guildgames.temp_leader = member.user.id
                guildData.save()
                await interaction.reply({
                    content: `Вы стали ведущим на сегодняшнюю совместную игру!`,
                    ephemeral: true
                })
            }
                break;
            default:
                break;
        }

    }
}