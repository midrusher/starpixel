const { Birthday } = require(`../../schemas/birthday`)
const { Temp } = require(`../../schemas/temp_items`)
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`)
const fetch = require(`node-fetch`)
const cron = require(`node-cron`)
const prettyMilliseconds = require(`pretty-ms`)
const ch_list = require(`../../discord structure/channels.json`)
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const { execute } = require('../../events/client/start_bot/ready');
const { achievementStats, found } = require(`../../functions`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`seasonal`)
        .setDescription(`Команды сезонных мероприятий`)
        .addSubcommandGroup(gr => gr
            .setName(`halloween`)
            .setDescription(`Хэллоуинские мероприятия`)
            .addSubcommand(sb => sb
                .setName(`achievement`)
                .setDescription(`Хэллоуинские достижения`)
                .addStringOption(o => o
                    .setName(`достижение`)
                    .setDescription(`Выберите достижение, которое хотите получить`)
                    .setRequired(true)
                    .setChoices(
                        {
                            name: `№1. Призраки`,
                            value: `№1. Призраки`
                        },
                        {
                            name: `№2. Полтинник`,
                            value: `№2. Полтинник`
                        },
                        {
                            name: `№3. Хэллоуин`,
                            value: `№3. Хэллоуин`
                        },
                        {
                            name: `№4. Жуть`,
                            value: `№4. Жуть`
                        },
                        {
                            name: `№5. Душа`,
                            value: `№5. Душа`
                        },

                    )
                )
            )
            .addSubcommand(sb => sb
                .setName(`stats`)
                .setDescription(`Посмотреть хэллоуинскую статистику`)
                .addUserOption(o => o
                    .setName(`пользователь`)
                    .setDescription(`Посмотреть статистику пользователя`))
            )
            .addSubcommand(sb => sb
                .setName(`leaderboards`)
                .setDescription(`Лучшие участники в период Хэллоуина`)
            )
            .addSubcommand(sb => sb
                .setName(`quest`)
                .setDescription(`Получить ежедневный хэллоуинский квест`)
                .addStringOption(o => o
                    .setName(`действие`)
                    .setDescription(`Выберите, что вы хотите сделать с квестом`)
                    .addChoices(
                        {
                            name: `Начать квест`,
                            value: `start`
                        },
                        {
                            name: `Закончить квест`,
                            value: `finish`
                        },

                    )
                )
            )
            .addSubcommand(sb => sb
                .setName(`buy`)
                .setDescription(`Приобрести хэллоуинский товар`)
                .addStringOption(o => o
                    .setName(`товар`)
                    .setDescription(`Выберите товар для покупки`)
                    .setRequired(true)
                    .setChoices(
                        {
                            name: `Косметический значок 🎱`,
                            value: `🎱`
                        },
                        {
                            name: `Косметический значок 👹`,
                            value: `👹`
                        },
                        {
                            name: `Косметический значок 🩸`,
                            value: `🩸`
                        },
                        {
                            name: `Косметический значок 🧥`,
                            value: `🧥`
                        },
                        {
                            name: `Косметический значок 💀`,
                            value: `💀`
                        },
                        {
                            name: `Косметический значок 🧛‍♀️`,
                            value: `🧛‍♀️`
                        },
                    ))
            )
        ),
    async execute(interaction, client) {
        const guildData = await Guild.findOne({ id: interaction.guild.id })
        if (guildData.plugins.seasonal === false) return interaction.reply({ content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true })
        const member = interaction.guild.member

        switch (interaction.options.getSubcommandGroup()) {
            case `halloween`: {
                if (guildData.seasonal.halloween.enabled === false) return interaction.reply({
                    content: `Сейчас не время для Хэллоуина! Попробуйте ввести эту команду в период **7 октября по 7 ноября**!`,
                    ephemeral: true
                })

                switch (interaction.options.getSubcommand()) {
                    case `achievement`: {
                        const userData = await User.findOne({ userid: interaction.user.id, guildid: interaction.guild.id })
                        const achievement = interaction.options.getString(`достижение`)
                        switch (achievement) {
                            case `№1. Призраки`: {
                                const already_done = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Достижение уже выполнено!`
                                    })
                                    .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)


                                if (userData.seasonal.halloween.achievements.num1 === true) return interaction.reply({
                                    embeds: [already_done],
                                    ephemeral: true
                                })

                                const no_condition = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Вы не соответствуете требованиям!`
                                    })
                                    .setDescription(`Вы не соответствуете требованиям для получения данного достижения! Проверить требования вы можете в канале <#${ch_list.achs}>.
    
Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)
                                    .setTimestamp(Date.now())

                                if (!member.roles.cache.has(`893927886766096384`)) return interaction.reply({
                                    embeds: [no_condition],
                                    ephemeral: true
                                })
                                let reward = `893932177799135253`
                                const has_reward = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Вы имеете награду!`
                                    })
                                    .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)
                                    .setTimestamp(Date.now())
                                if (member.roles.cache.has(reward)) return interaction.reply({
                                    embeds: [has_reward],
                                    ephemeral: true
                                })
                                userData.seasonal.halloween.achievements.num1 = true
                                await member.roles.add(reward)
                                userData.rank += 50
                                userData.exp += 300;
                                userData.seasonal.halloween.points += 5
                                userData.save()
                                const condition_meet = new EmbedBuilder()
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                    .setTitle(`✅ Достижение выполнено!`)
                                    .setTimestamp(Date.now())
                                    .setDescription(`${member} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
Он уже получил достижение! Хочешь и ты? Тогда тебе в <#1029662737497866300>

Чтобы проверить статистику ваших достижения, используйте команду \`/seasonal halloween stats\`!`)


                                await interaction.guild.channels.cache.get(ch_list.act).send(
                                    `╒══════════════════╕
${member} +300 🌀
\`Выполнение достижения.\`
╘══════════════════╛`)

                                await interaction.guild.channels.cache.get(ch_list.rank).send(
                                    `╒══════════════════╕
${member} +50 💠
\`Выполнение достижения.\`
╘══════════════════╛`)
                                await interaction.reply({
                                    embeds: [condition_meet]
                                })
                                console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${member.user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))


                            }
                                break;
                            case `№2. Полтинник`: {
                                const already_done = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Достижение уже выполнено!`
                                    })
                                    .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)


                                if (userData.seasonal.halloween.achievements.num2 === true) return interaction.reply({
                                    embeds: [already_done],
                                    ephemeral: true
                                })

                                const no_condition = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Вы не соответствуете требованиям!`
                                    })
                                    .setDescription(`Вы не соответствуете требованиям для получения данного достижения! Проверить требования вы можете в канале <#${ch_list.achs}>.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)
                                    .setTimestamp(Date.now())

                                if (userData.seasonal.halloween.points < 50) return interaction.reply({
                                    embeds: [no_condition],
                                    ephemeral: true
                                })
                                let reward = `893932177799135253`
                                const has_reward = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Вы имеете награду!`
                                    })
                                    .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)
                                    .setTimestamp(Date.now())
                                if (member.roles.cache.has(reward)) return interaction.reply({
                                    embeds: [has_reward],
                                    ephemeral: true
                                })
                                userData.seasonal.halloween.achievements.num2 = true
                                await member.roles.add(reward)
                                userData.rank += 50
                                userData.exp += 300;
                                userData.seasonal.halloween.points += 5
                                userData.save()
                                const condition_meet = new EmbedBuilder()
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                    .setTitle(`✅ Достижение выполнено!`)
                                    .setTimestamp(Date.now())
                                    .setDescription(`${member} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
Он уже получил достижение! Хочешь и ты? Тогда тебе в <#1029662737497866300>

Чтобы проверить статистику ваших достижения, используйте команду \`/seasonal halloween stats\`!`)


                                await interaction.guild.channels.cache.get(ch_list.act).send(
                                    `╒══════════════════╕
${member} +300 🌀
\`Выполнение достижения.\`
╘══════════════════╛`)

                                await interaction.guild.channels.cache.get(ch_list.rank).send(
                                    `╒══════════════════╕
${member} +50 💠
\`Выполнение достижения.\`
╘══════════════════╛`)
                                await interaction.reply({
                                    embeds: [condition_meet]
                                })
                                console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${member.user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                            }
                                break;
                            case `№3. Хэллоуин`: {
                                const already_done = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Достижение уже выполнено!`
                                    })
                                    .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)


                                if (userData.seasonal.halloween.achievements.num3 === true) return interaction.reply({
                                    embeds: [already_done],
                                    ephemeral: true
                                })
                                const date = new Date()
                                const day = date.getDate()
                                const month = date.getMonth() + 1


                                const no_condition = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Вы не соответствуете требованиям!`
                                    })
                                    .setDescription(`Вы не соответствуете требованиям для получения данного достижения! Проверить требования вы можете в канале <#${ch_list.achs}>.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)
                                    .setTimestamp(Date.now())

                                if (day !== 31 || month !== 10 || userData.seasonal.halloween.hw_msg !== true) return interaction.reply({
                                    embeds: [no_condition],
                                    ephemeral: true
                                })
                                let reward = `893932177799135253`
                                const has_reward = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Вы имеете награду!`
                                    })
                                    .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)
                                    .setTimestamp(Date.now())
                                if (member.roles.cache.has(reward)) return interaction.reply({
                                    embeds: [has_reward],
                                    ephemeral: true
                                })
                                userData.seasonal.halloween.achievements.num3 = true
                                await member.roles.add(reward)
                                userData.rank += 50
                                userData.exp += 300;
                                userData.seasonal.halloween.points += 5
                                userData.save()
                                const condition_meet = new EmbedBuilder()
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                    .setTitle(`✅ Достижение выполнено!`)
                                    .setTimestamp(Date.now())
                                    .setDescription(`${member} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
Он уже получил достижение! Хочешь и ты? Тогда тебе в <#1029662737497866300>

Чтобы проверить статистику ваших достижения, используйте команду \`/seasonal halloween stats\`!`)


                                await interaction.guild.channels.cache.get(ch_list.act).send(
                                    `╒══════════════════╕
${member} +300 🌀
\`Выполнение достижения.\`
╘══════════════════╛`)

                                await interaction.guild.channels.cache.get(ch_list.rank).send(
                                    `╒══════════════════╕
${member} +50 💠
\`Выполнение достижения.\`
╘══════════════════╛`)
                                await interaction.reply({
                                    embeds: [condition_meet]
                                })
                                console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${member.user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                            }
                                break;
                            case `№4. Жуть`: {
                                const already_done = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Достижение уже выполнено!`
                                    })
                                    .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)


                                if (userData.seasonal.halloween.achievements.num4 === true) return interaction.reply({
                                    embeds: [already_done],
                                    ephemeral: true
                                })

                                const no_condition = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Вы не соответствуете требованиям!`
                                    })
                                    .setDescription(`Вы не соответствуете требованиям для получения данного достижения! Проверить требования вы можете в канале <#${ch_list.achs}>.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)
                                    .setTimestamp(Date.now())

                                if (userData.seasonal.halloween.hw_cosm == false) return interaction.reply({
                                    embeds: [no_condition],
                                    ephemeral: true
                                })
                                let reward = `893932177799135253`
                                const has_reward = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Вы имеете награду!`
                                    })
                                    .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)
                                    .setTimestamp(Date.now())
                                if (member.roles.cache.has(reward)) return interaction.reply({
                                    embeds: [has_reward],
                                    ephemeral: true
                                })
                                userData.seasonal.halloween.achievements.num4 = true
                                await member.roles.add(reward)
                                userData.rank += 50
                                userData.exp += 300;
                                userData.seasonal.halloween.points += 5
                                userData.save()
                                const condition_meet = new EmbedBuilder()
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                    .setTitle(`✅ Достижение выполнено!`)
                                    .setTimestamp(Date.now())
                                    .setDescription(`${member} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
Он уже получил достижение! Хочешь и ты? Тогда тебе в <#1029662737497866300>

Чтобы проверить статистику ваших достижения, используйте команду \`/seasonal halloween stats\`!`)


                                await interaction.guild.channels.cache.get(ch_list.act).send(
                                    `╒══════════════════╕
${member} +300 🌀
\`Выполнение достижения.\`
╘══════════════════╛`)

                                await interaction.guild.channels.cache.get(ch_list.rank).send(
                                    `╒══════════════════╕
${member} +50 💠
\`Выполнение достижения.\`
╘══════════════════╛`)
                                await interaction.reply({
                                    embeds: [condition_meet]
                                })
                                console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${member.user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                            }
                                break;
                            case `№5. Душа`: {
                                const already_done = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Достижение уже выполнено!`
                                    })
                                    .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)


                                if (userData.seasonal.halloween.achievements.num5 === true) return interaction.reply({
                                    embeds: [already_done],
                                    ephemeral: true
                                })

                                const no_condition = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Вы не соответствуете требованиям!`
                                    })
                                    .setDescription(`Вы не соответствуете требованиям для получения данного достижения! Проверить требования вы можете в канале <#${ch_list.achs}>.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)
                                    .setTimestamp(Date.now())

                                if (userData.seasonal.halloween.hw_soul == false) return interaction.reply({
                                    embeds: [no_condition],
                                    ephemeral: true
                                })
                                let reward = `893932177799135253`
                                const has_reward = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Вы имеете награду!`
                                    })
                                    .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.

Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)
                                    .setTimestamp(Date.now())
                                if (member.roles.cache.has(reward)) return interaction.reply({
                                    embeds: [has_reward],
                                    ephemeral: true
                                })
                                userData.seasonal.halloween.achievements.num5 = true
                                await member.roles.add(reward)
                                userData.rank += 50
                                userData.exp += 300;
                                userData.seasonal.halloween.points += 5
                                userData.save()
                                const condition_meet = new EmbedBuilder()
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                    .setTitle(`✅ Достижение выполнено!`)
                                    .setTimestamp(Date.now())
                                    .setDescription(`${member} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
Он уже получил достижение! Хочешь и ты? Тогда тебе в <#1029662737497866300>

Чтобы проверить статистику ваших достижения, используйте команду \`/seasonal halloween stats\`!`)


                                await interaction.guild.channels.cache.get(ch_list.act).send(
                                    `╒══════════════════╕
${member} +300 🌀
\`Выполнение достижения.\`
╘══════════════════╛`)

                                await interaction.guild.channels.cache.get(ch_list.rank).send(
                                    `╒══════════════════╕
${member} +50 💠
\`Выполнение достижения.\`
╘══════════════════╛`)
                                await interaction.reply({
                                    embeds: [condition_meet]
                                })
                                console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${member.user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                            }
                                break;

                            default:
                                break;
                        }
                    }
                        break;
                    case `stats`: {
                        const user = interaction.options.getUser(`пользователь`) || interaction.user
                        if (user.bot) return interaction.reply({
                            content: `${user} является ботом, а значит он не может получать хэллоуинские очки :'(`
                        })
                        const users = await User.find().then(users => {
                            return users.filter(async user => await interaction.guild.members.fetch(user.userid))
                        })
                        const sorts = users.sort((a, b) => {
                            return b.seasonal.halloween.points - a.seasonal.halloween.points
                        })
                        var i = 0
                        while (sorts[i].userid !== user.id) {
                            i++
                        }
                        const userData = await User.findOne({ userid: user.id, guildid: interaction.guild.id })
                        let rank = i + 1
                        const embed = new EmbedBuilder()
                            .setTitle(`Хэллоуинская статистика пользователя ${user.username}`)
                            .setDescription(`**Позиция в топе**: ${rank}
**Очков**: ${userData.seasonal.halloween.points}
**Открыто жутких коробок**: ${userData.seasonal.halloween.opened_scary}
**Хэллоуинская душа**: ${found(userData.seasonal.halloween.hw_soul)}

**ДОСТИЖЕНИЯ**
**Достижение №1**: ${achievementStats(userData.seasonal.halloween.achievements.num1)}
**Достижение №2**: ${achievementStats(userData.seasonal.halloween.achievements.num2)}
**Достижение №3**: ${achievementStats(userData.seasonal.halloween.achievements.num3)}
**Достижение №4**: ${achievementStats(userData.seasonal.halloween.achievements.num4)}
**Достижение №5**: ${achievementStats(userData.seasonal.halloween.achievements.num5)}`)
                            .setThumbnail(user.displayAvatarURL())
                            .setColor(process.env.bot_color)
                            .setTimestamp(Date.now())

                        await interaction.reply({
                            embeds: [embed]
                        })
                    }
                        break;
                    case `leaderboards`: {
                        await interaction.deferReply({
                            fetchReply: true
                        })
                        const users = await User.find({
                            "seasonal.halloween.points": { $gt: 0 }
                        }).then(users => {
                            return users.filter(async user => await interaction.guild.members.fetch(user.userid))
                        })
                        const sort = users.sort((a, b) => {
                            return b.seasonal.halloween.points - a.seasonal.halloween.points
                        }).slice(0, 10)
                        let index = 1
                        const map = sort.map(async (user) => {
                            const tag = await interaction.guild.members.fetch(user.userid)
                            return `**${index++}.** ${tag}: ${user.seasonal.halloween.points} очков`
                        })
                        const mapProm = await Promise.all(map)


                        const embed = new EmbedBuilder()
                            .setColor(process.env.bot_color)
                            .setAuthor({
                                name: `Лучшие пользователи по хэллоуинским очкам`
                            })
                            .setTimestamp(Date.now())
                            .setDescription(`${mapProm.join('\n')}`)

                        await interaction.editReply({
                            embeds: [embed]
                        })
                    }
                        break;
                    case `buy`: {
                        const userData = await User.findOne({ userid: interaction.user.id, guildid: interaction.guild.id })
                        const symb = interaction.options.getString(`товар`)
                        let price
                        if (symb == `🎱` || symb == `👹` || symb == `🩸`) {
                            price = 30
                        } else if (symb == `🧥`) {
                            price = 40
                        } else if (symb == `💀` || symb == `🧛‍♀️`) {
                            price = 50
                        }

                        if (userData.seasonal.halloween.points < price) return interaction.reply({
                            content: `Для покупки \`${symb}\` вам необходимо минимум ${price} очков! У вас на данный момент ${userData.seasonal.halloween.points} очков`
                        })
                        userData.seasonal.halloween.points -= price
                        userData.seasonal.halloween.hw_cosm = true
                        userData.displayname.symbol = symb
                        userData.save()
                        await interaction.reply({
                            content: `Вы приобрели \`${symb}\` за ${price} хэллоуинских очков! В скором времени данный значок появится в вашем никнейме! Если этого не произойдёт в течение 15 минут, обратитесь в вопрос-модерам!`
                        })
                    }
                        break;
                    case `quest`: {
                        const userData = await User.findOne({ userid: interaction.user.id, guildid: interaction.guild.id })
                        if (!userData.nickname) return interaction.reply({
                            content: `По неизвестной причине в вашем профиле не указан ваш игровой UUID. Вы не можете использовать эту команду! Свяжитесь с модерацией гильдии.`,
                            ephemeral: true
                        })
                        const choice = interaction.options.getString(`действие`)
                        if (choice == `start`) {
                            if (userData.cooldowns.hw_quest > Date.now())
                                return interaction.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(process.env.bot_color)
                                            .setAuthor({
                                                name: `Вы не можете использовать эту команду`
                                            })
                                            .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.hw_quest - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)
                                    ],
                                    ephemeral: true
                                });
                            let response = await fetch(`https://api.hypixel.net/player?key=${process.env.hypixel_apikey}&uuid=${userData.uuid}`)
                            if (response.ok) {

                                const quests = [
                                    {
                                        description: `Победить 20 раз на карте Spooky Mansion в Murder Mystery`,
                                        id: 1,
                                        req_wins: 20
                                    },
                                    {
                                        description: `Победить 10 раз на карте Spooky Mansion в Murder Mystery`,
                                        id: 2,
                                        req_wins: 20
                                    },
                                    {
                                        description: `Победить 20 раз на карте Spooky Mansion в Murder Mystery`,
                                        id: 3,
                                        req_wins: 20
                                    },
                                    {
                                        description: `Победить 20 раз на карте Spooky Mansion в Murder Mystery`,
                                        id: 4,
                                        req_wins: 20
                                    },
                                    {
                                        description: `Победить 20 раз на карте Spooky Mansion в Murder Mystery`,
                                        id: 5,
                                        req_wins: 20
                                    },
                                    {
                                        description: `Победить 20 раз на карте Spooky Mansion в Murder Mystery`,
                                        id: 6,
                                        req_wins: 20
                                    },
                                    {
                                        description: `Победить 20 раз на карте Spooky Mansion в Murder Mystery`,
                                        id: 7,
                                        req_wins: 20
                                    },
                                    {
                                        description: `Победить 20 раз на карте Spooky Mansion в Murder Mystery`,
                                        id: 8,
                                        req_wins: 20
                                    },
                                    {
                                        description: `Победить 20 раз на карте Spooky Mansion в Murder Mystery`,
                                        id: 9,
                                        req_wins: 20
                                    },
                                ]
                                const r_quest = quests[Math.floor(Math.random() * quests.length)]
                                try {
                                    let json = await response.json()
                                    if (r_quest.id == 1) {

                                    } else if (r_quest.id == 2) {

                                    } else if (r_quest.id == 3) {

                                    } else if (r_quest.id == 4) {

                                    } else if (r_quest.id == 5) {

                                    } else if (r_quest.id == 6) {

                                    } else if (r_quest.id == 7) {

                                    } else if (r_quest.id == 8) {

                                    } else if (r_quest.id == 9) {

                                    } else if (r_quest.id == 10) {

                                    } else if (r_quest.id == 11) {

                                    } else if (r_quest.id == 12) {

                                    }
                                } catch (error) {

                                }
                                const questEmbed = new EmbedBuilder()
                                    .setColor(`DarkGold`)
                                    .setTitle(`Хэллоуинский квест для ${interaction.user.username}`)
                                    .setDescription(`${interaction.member} получил хэллоуинское задание:
\`${r_quest.description}\``)
                                await interaction.reply({
                                    embeds: [questEmbed]
                                })
                                userData.cooldowns.hw_quest = Date.now() + (1000 * 60 * 60 * 16)
                                userData.save()
                            } else return interaction.reply({
                                content: `Произошла ошибка при создании квеста для вас! Попробуйте позже!`
                            })
                        } else if (choice == `finish`) {
                            if (userData.seasonal.halloween.quest.finished === false) return interaction.reply({
                                content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}

Как только вы выполните квест, попробуйте использовать эту команду снова!`
                            })


                        }

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
};