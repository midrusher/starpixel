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
                        {
                            name: `№6. Задания`,
                            value: `№6. Задания`
                        }
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
                    .setRequired(true)
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
        const member = interaction.member

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
                            case `№6. Задания`: {
                                const already_done = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Достижение уже выполнено!`
                                    })
                                    .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)


                                if (userData.seasonal.halloween.achievements.num6 === true) return interaction.reply({
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

                                if (userData.seasonal.halloween.quests_completed < 6) return interaction.reply({
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
                                userData.seasonal.halloween.achievements.num6 = true
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
**Выполнено квестов**: ${userData.seasonal.halloween.quests_completed}

**ДОСТИЖЕНИЯ**
**Достижение №1**: ${achievementStats(userData.seasonal.halloween.achievements.num1)}
**Достижение №2**: ${achievementStats(userData.seasonal.halloween.achievements.num2)}
**Достижение №3**: ${achievementStats(userData.seasonal.halloween.achievements.num3)}
**Достижение №4**: ${achievementStats(userData.seasonal.halloween.achievements.num4)}
**Достижение №5**: ${achievementStats(userData.seasonal.halloween.achievements.num5)}
**Достижение №6**: ${achievementStats(userData.seasonal.halloween.achievements.num6)}

**ТЕКУЩИЙ КВЕСТ**
**Условие**: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество на конец квеста**: ${userData.seasonal.halloween.quest.requirement}
**Статус**: \`${userData.seasonal.halloween.quest.finished ? `Завершено` : `Не завершено`}\``)
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
                        if (!userData.uuid) return interaction.reply({
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

                                const quests = require(`./Seasonal Data/Halloween Quests.json`)
                                const r_quest = quests[Math.floor(Math.random() * quests.length)]
                                try {
                                    let json = await response.json()
                                    const hw = userData.seasonal.halloween
                                    const stats = json.player.stats
                                    if (r_quest.id == 1) {
                                        if (!stats?.MurderMystery?.wins_spooky_mansion) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.MurderMystery?.wins_spooky_mansion) {
                                            hw.quest.before = stats?.MurderMystery?.wins_spooky_mansion;
                                            hw.quest.requirement = stats?.MurderMystery?.wins_spooky_mansion + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 2) {
                                        if (!stats?.MurderMystery?.wins_darkfall) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.MurderMystery?.wins_darkfall) {
                                            hw.quest.before = stats?.MurderMystery?.wins_darkfall;
                                            hw.quest.requirement = stats?.MurderMystery?.wins_darkfall + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 3) {
                                        if (!stats?.MurderMystery["wins_widow's_den"]) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.MurderMystery["wins_widow's_den"]) {
                                            hw.quest.before = stats?.MurderMystery["wins_widow's_den"];
                                            hw.quest.requirement = stats?.MurderMystery["wins_widow's_den"] + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 4) {
                                        if (!stats?.VampireZ?.human_wins) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.VampireZ?.human_wins) {
                                            hw.quest.before = stats?.VampireZ?.human_wins;
                                            hw.quest.requirement = stats?.VampireZ?.human_wins + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 5) {
                                        if (!stats?.MurderMystery?.kills_as_murderer) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.MurderMystery?.kills_as_murderer) {
                                            hw.quest.before = stats?.MurderMystery?.kills_as_murderer;
                                            hw.quest.requirement = stats?.MurderMystery?.kills_as_murderer + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 6) {
                                        if (!stats?.Arcade?.wins_zombies_deadend) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.Arcade?.wins_zombies_deadend) {
                                            hw.quest.before = stats?.Arcade?.wins_zombies_deadend;
                                            hw.quest.requirement = stats?.Arcade?.wins_zombies_deadend + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 7) {
                                        if (!stats?.Arcade?.wins_zombies_badblood) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.Arcade?.wins_zombies_badblood) {
                                            hw.quest.before = stats?.Arcade?.wins_zombies_badblood;
                                            hw.quest.requirement = stats?.Arcade?.wins_zombies_badblood + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 8) {
                                        if (!stats?.Arcade?.wins_dayone) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.Arcade?.wins_dayone) {
                                            hw.quest.before = stats?.Arcade?.wins_dayone;
                                            hw.quest.requirement = stats?.Arcade?.wins_dayone + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 9) {
                                        if (!stats?.Arcade?.zombie_kills_zombies) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.Arcade?.zombie_kills_zombies) {
                                            hw.quest.before = stats?.Arcade?.zombie_kills_zombies;
                                            hw.quest.requirement = stats?.Arcade?.zombie_kills_zombies + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 10) {
                                        if (!stats?.Arcade?.zombie_kills_zombies_deadend) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.Arcade?.zombie_kills_zombies_deadend) {
                                            hw.quest.before = stats?.Arcade?.zombie_kills_zombies_deadend;
                                            hw.quest.requirement = stats?.Arcade?.zombie_kills_zombies_deadend + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 11) {
                                        if (!stats?.Arcade?.zombie_kills_zombies_badblood) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.Arcade?.zombie_kills_zombies_badblood) {
                                            hw.quest.before = stats?.Arcade?.zombie_kills_zombies_badblood;
                                            hw.quest.requirement = stats?.Arcade?.zombie_kills_zombies_badblood + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 12) {
                                        if (!stats?.MurderMystery?.kills_as_infected) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.MurderMystery?.kills_as_infected) {
                                            hw.quest.before = stats?.MurderMystery?.kills_as_infected;
                                            hw.quest.requirement = stats?.MurderMystery?.kills_as_infected + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 13) {
                                        if (!stats?.Arcade?.kills_dayone) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.Arcade?.kills_dayone) {
                                            hw.quest.before = stats?.Arcade?.kills_dayone;
                                            hw.quest.requirement = stats?.Arcade?.kills_dayone + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 14) {
                                        if (!stats?.SkyWars?.wins_kit_basic_solo_batguy) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.SkyWars?.wins_kit_basic_solo_batguy) {
                                            hw.quest.before = stats?.SkyWars?.wins_kit_basic_solo_batguy;
                                            hw.quest.requirement = stats?.SkyWars?.wins_kit_basic_solo_batguy + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 15) {
                                        if (!stats?.SkyWars?.wins_kit_advanced_solo_magician) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.SkyWars?.wins_kit_advanced_solo_magician) {
                                            hw.quest.before = stats?.SkyWars?.wins_kit_advanced_solo_magician;
                                            hw.quest.requirement = stats?.SkyWars?.wins_kit_advanced_solo_magician + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 16) {
                                        if (!stats?.SkyWars?.wins_kit_defending_team_batguy) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.SkyWars?.wins_kit_defending_team_batguy) {
                                            hw.quest.before = stats?.SkyWars?.wins_kit_defending_team_batguy;
                                            hw.quest.requirement = stats?.SkyWars?.wins_kit_defending_team_batguy + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 17) {
                                        if (!stats?.SkyWars?.wins_kit_attacking_team_enderman) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.SkyWars?.wins_kit_attacking_team_enderman) {
                                            hw.quest.before = stats?.SkyWars?.wins_kit_attacking_team_enderman;
                                            hw.quest.requirement = stats?.SkyWars?.wins_kit_attacking_team_enderman + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 18) {
                                        if (!stats?.Arcade?.candy_found_halloween_simulator) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.Arcade?.candy_found_halloween_simulator) {
                                            hw.quest.before = stats?.Arcade?.candy_found_halloween_simulator;
                                            hw.quest.requirement = stats?.Arcade?.candy_found_halloween_simulator + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 19) {
                                        if (!stats?.Arcade?.wins_halloween_simulator) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.Arcade?.wins_halloween_simulator) {
                                            hw.quest.before = stats?.Arcade?.wins_halloween_simulator;
                                            hw.quest.requirement = stats?.Arcade?.wins_halloween_simulator + r_quest.req_wins
                                        }
                                    } else if (r_quest.id == 20) {
                                        if (!stats?.MurderMystery?.kills_as_infected_hypixel_world_MURDER_INFECTION) {
                                            hw.quest.before = 0;
                                            hw.quest.requirement = r_quest.req_wins
                                        } else if (stats?.MurderMystery?.kills_as_infected_hypixel_world_MURDER_INFECTION) {
                                            hw.quest.before = stats?.MurderMystery?.kills_as_infected_hypixel_world_MURDER_INFECTION;
                                            hw.quest.requirement = stats?.MurderMystery?.kills_as_infected_hypixel_world_MURDER_INFECTION + r_quest.req_wins
                                        }
                                    }
                                } catch (error) {
                                    return interaction.reply({
                                        content: `Произошла ошибка при создании для вас квеста!`,
                                        ephemeral: true
                                    })
                                }
                                userData.seasonal.halloween.quest.description = r_quest.description
                                userData.seasonal.halloween.quest.id = r_quest.id
                                userData.seasonal.halloween.quest.finished = false
                                const questEmbed = new EmbedBuilder()
                                    .setColor(`DarkGold`)
                                    .setTitle(`Хэллоуинский квест для ${interaction.user.username}`)
                                    .setDescription(`${interaction.member} получил хэллоуинское задание:
\`${r_quest.description}\`

За его выполнение вы получите \`❕ 🎃 ЖУТКАЯ /spooky\``)
                                    .setTimestamp(Date.now())
                                    .setThumbnail(interaction.user.displayAvatarURL())
                                await interaction.reply({
                                    embeds: [questEmbed]
                                })
                                //userData.cooldowns.hw_quest = Date.now() + (1000 * 60 * 60 * 16)
                                userData.save()
                            } else return interaction.reply({
                                content: `Произошла ошибка при создании квеста для вас! Попробуйте позже!`
                            })
                        } else if (choice == `finish`) {
                            const reward = `893932177799135253`
                            const hw = userData.seasonal.halloween
                            if (hw.quest.finished === true) return interaction.reply({
                                content: `Вы уже завершили задание \`${hw.quest.description}\`! Используйте \`/seasonal halloween quest\`, чтобы начать новый квест!`,
                                ephemeral: true
                            })
                            let response = await fetch(`https://api.hypixel.net/player?key=${process.env.hypixel_apikey}&uuid=${userData.uuid}`)
                            if (response.ok) {
                                let json = await response.json()
                                let stats = json.player.stats
                                if (hw.quest.id == 1) {
                                    if (stats?.MurderMystery?.wins_spooky_mansion >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 2) {
                                    if (stats?.MurderMystery?.wins_darkfall >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 3) {
                                    if (stats?.MurderMystery["wins_widow's_den"] >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 4) {
                                    if (stats?.VampireZ?.human_wins >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 5) {
                                    if (stats?.MurderMystery?.kills_as_murderer >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 6) {
                                    if (stats?.Arcade?.wins_zombies_deadend >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 7) {
                                    if (stats?.Arcade?.wins_zombies_badblood >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 8) {
                                    if (stats?.Arcade?.wins_dayone >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`
                                    })
                                } else if (hw.quest.id == 9) {
                                    if (stats?.Arcade?.zombie_kills_zombies >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 10) {
                                    if (stats?.Arcade?.zombie_kills_zombies_deadend >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 11) {
                                    if (stats?.Arcade?.zombie_kills_zombies_badblood >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 12) {
                                    if (stats?.MurderMystery?.kills_as_infected >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 13) {
                                    if (stats?.Arcade?.kills_dayone >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    }
                                } else if (hw.quest.id == 14) {
                                    if (stats?.SkyWars?.wins_kit_basic_solo_batguy >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 15) {
                                    if (stats?.SkyWars?.wins_kit_advanced_solo_magician >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 16) {
                                    if (stats?.SkyWars?.wins_kit_defending_team_batguy >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 17) {
                                    if (stats?.SkyWars?.wins_kit_attacking_team_enderman >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 18) {
                                    if (stats?.Arcade?.candy_found_halloween_simulator >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 19) {
                                    if (stats?.Arcade?.wins_halloween_simulato >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                } else if (hw.quest.id == 20) {
                                    if (stats?.MurderMystery?.kills_as_infected_hypixel_world_MURDER_INFECTION >= hw.quest.requirement) {
                                        hw.quests_completed += 1
                                        hw.points += 5
                                        hw.quest.finished = true
                                        await member.roles.add(reward)
                                        const done = new EmbedBuilder()
                                            .setColor(`DarkGold`)
                                            .setTitle(`Хэллоуинский квест выполнен`)
                                            .setDescription(`${interaction.member} выполнил хэллоуинское задание \`${hw.quest.description}\`! Он получил свою награду!

**Количество выполненных заданий**: ${hw.quests_completed}`)
                                        await interaction.reply({
                                            embeds: [done]
                                        })
                                    } else return interaction.reply({
                                        content: `Вы не завершили предыдущее задание: \`${userData.seasonal.halloween.quest.description}\`
**Количество на начало квеста**: ${userData.seasonal.halloween.quest.before}
**Количество для конца квеста**: ${userData.seasonal.halloween.quest.requirement}
        
Как только вы выполните квест, попробуйте использовать эту команду снова!`,
                                        ephemeral: true
                                    })
                                }

                                userData.save()
                            }
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