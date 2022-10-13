const { Birthday } = require(`../../schemas/birthday`)
const { Temp } = require(`../../schemas/temp_items`)
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`)
const cron = require(`node-cron`)
const ch_list = require(`../../discord structure/channels.json`)
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const { execute } = require('../../events/client/start_bot/ready');
const { achievementStats } = require(`../../functions`)

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
                            name: `№1. `,
                            value: `№1. `
                        },
                        {
                            name: `№2. `,
                            value: `№2. `
                        },
                        {
                            name: `№3. `,
                            value: `№3. `
                        },
                        {
                            name: `№4. `,
                            value: `№4. `
                        },
                        {
                            name: `№5. `,
                            value: `№5. `
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
                            case ``: {
                                const already_done = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Достижение уже выполнено!`
                                    })
                                    .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
Если вы считаете, что это ошибка, напишите об этом в <#${ch_list.ask}>!`)


                                if (userData.seasonal.halloween.achievements === true) return interaction.reply({
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

                                if (!member.roles.cache.has(`521248091853291540`)) return interaction.reply({
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
                            case ``: {

                            }
                                break;
                            case ``: {

                            }
                                break;
                            case ``: {

                            }
                                break;
                            case ``: {

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
                        const userData = await User.findOne({ userid: user.id, guildid: guild.id })
                        let rank = i + 1
                        const embed = new EmbedBuilder()
                        .setTitle(`Хэллоуинская статистика пользователя ${user.username}`)
                        .setDescription(`**Позиция в топе**: ${rank}
**Очков**: ${userData.seasonal.halloween.points}
**Открыто жутких коробок**: ${userData.seasonal.halloween.opened_scary}

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
                            seasonal: {
                                halloween: {
                                    points: {
                                        $gt: 0
                                    }
                                }
                            }
                        }).then(users => {
                            return users.filter(async user => await interaction.guild.members.fetch(user.userid))
                        })
                        const sort = users.sort((a, b) => {
                            return b.seasonal.halloween.points - a.seasonal.halloween.points
                        }).slice(0, 10)
                        let index = 1
                        const map = sort.map(async (user) => {
                            const tag = await interaction.guild.members.fetch(user.userid)
                            return `**${index++}.** ${tag} > ${user.seasonal.halloween.points} очков`
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