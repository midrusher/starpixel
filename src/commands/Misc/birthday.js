const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const { Birthday } = require(`../../schemas/birthday`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`birthday`)
        .setDescription(`Дни рождения участников гильдии.`)
        .addSubcommand(subcommand => subcommand
            .setName(`set`)
            .setDescription(`Установить день рождения пользователю`)
            .addUserOption(option => option
                .setName(`пользователь`)
                .setDescription(`Пользовать, чей день рождения необходимо установить`)
                .setRequired(true)
            )
            .addIntegerOption(option => option
                .setName(`день`)
                .setDescription(`Число, когда у пользователя день рождения.`)
                .setRequired(true)
            )
            .addIntegerOption(option => option
                .setName(`месяц`)
                .setDescription(`Число, когда у пользователя день рождения.`)
                .setRequired(true)
            )
            .addIntegerOption(option => option
                .setName(`год`)
                .setDescription(`Год, когда у пользователя день рождения.`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`remove`)
            .setDescription(`Удалить день рождения пользователя.`)
            .addUserOption(option => option
                .setName(`пользователь`)
                .setDescription(`Пользовать, чей день рождения необходимо установить`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`list`)
            .setDescription(`Посмотреть следующие 10 дней рождений.`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`check`)
            .setDescription(`Показать день рождения пользователя`)
            .addUserOption(option => option
                .setName(`пользователь`)
                .setDescription(`Пользовать, чей день рождения необходимо установить`)
                .setRequired(true)
            )
        ),

    async execute(interaction, client) {
        if (!interaction.member.roles.cache.has(`320880176416161802`)) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: `❗ Отсутствует необходимая роль!`
                })
                .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`320880176416161802`).name}\`!`)
                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                .setColor(`DarkRed`)
                .setTimestamp(Date.now())

            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }

        switch (interaction.options.getSubcommand()) {
            case `set`: {
                const user = interaction.options.getUser(`пользователь`)
                const date = new Date()
                const currentYear = date.getFullYear()
                const currentMonth = date.getMonth() + 1
                const currentDay = date.getDay()

                const Day = interaction.options.getInteger(`день`)
                const Month = interaction.options.getInteger(`месяц`)
                const Year = interaction.options.getInteger(`год`)

                if (Day > 31 || Day <= 0) return interaction.reply({
                    content: `День должен быть между 1 и 31!`,
                    ephemeral: true
                })

                if (Month > 12 || Month <= 0) return interaction.reply({
                    content: `Месяц должен быть между 1 и 12!`,
                    ephemeral: true
                })

                if (Year >= currentYear) return interaction.reply({
                    content: `Текущий год не может быть меньше, чем год рождения участника!`,
                    ephemeral: true
                })
                await interaction.deferReply({
                    fetchReply: true
                })
                const oneDay = 1000 * 60 * 60 * 24

                const firstDate = new Date(currentYear, Month, Day)
                const secondDate = new Date(currentYear, currentMonth, currentDay)

                let diffDays = Math.round((firstDate - secondDate) / oneDay)

                let dayCount

                if (new Date(currentYear, 1, 29).getDate() === 29) {
                    dayCount = 366
                } else {
                    dayCount = 365
                }

                let remDays
                let wishYear

                if (diffDays > 0) {
                    remDays = diffDays
                    wishYear = currentYear
                } else {
                    remDays = diffDays + dayCount
                    wishYear = currentYear + 1
                }

                const age = toOrdinalSuffix(wishYear - Year)
                console.log(`1`)
                const bdata = await Birthday.findOne({ guildid: interaction.guild.id, userid: user.id })


                console.log(`2`)
                console.log(`3`)
                if (bdata) {
                    console.log(`4`)
                    bdata.delete()
                    console.log(`5`)
                    const newbdata = new Birthday({
                        guildid: interaction.guild.id,
                        userid: user.id,
                        day: Day,
                        month: Month,
                        year: Year
                    })
                    console.log(`6`)
                    await newbdata.save()
                    console.log(`7`)
                } else {
                    console.log(`8`)
                    const newbdata = new Birthday({
                        guildid: interaction.guild.id,
                        userid: user.id,
                        day: Day,
                        month: Month,
                        year: Year
                    })
                    console.log(`9`)

                    await newbdata.save()
                    console.log(`10`)
                }
                console.log(`11`)
                const b_embed = new EmbedBuilder()
                    .setTitle(`Установлен день рождения`)
                    .setColor(process.env.bot_color)
                    .setThumbnail(user.displayAvatarURL())
                    .setDescription(`🎂 Я поздравлю ${user} с **${age}** днём рождения через ${remDays} дн/, **${Day}.${Month}.${wishYear}**!`)
                console.log(`12`)
                await interaction.editReply({
                    embeds: [b_embed]
                })
                console.log(`13`)

            }

                break;
            case `remove`: {
                const user = interaction.options.getUser(`пользователь`)
                const to_remove = await Birthday.findOne({ guildid: interaction.guild.id, userid: user.id })
                if (to_remove) {
                    to_remove.delete()

                    const b_embed = new EmbedBuilder()
                        .setTitle(`Удалён день рождения`)
                        .setColor(process.env.bot_color)
                        .setThumbnail(user.displayAvatarURL())
                        .setDescription(`✅ - Удалён день рождения пользователя ${user}!`)
                    await interaction.reply({
                        embeds: [b_embed],
                        ephemeral: true
                    })

                } else {
                    const b_embed = new EmbedBuilder()
                        .setTitle(`День рождения не установлен`)
                        .setColor(process.env.bot_color)
                        .setThumbnail(user.displayAvatarURL())
                        .setDescription(`❌ - День рождения ${user} не был установлен, поэтому я не смог его удалить!`)

                    await interaction.reply({
                        embeds: [b_embed],
                        ephemeral: true
                    })
                }

            }

                break;
            case `list`: {
                const listData = await Birthday.find({ guildid: interaction.guild.id })

                const no_bd = new EmbedBuilder()
                    .setTitle(`Нет дней рождений`)
                    .setColor(process.env.bot_color)
                    .setThumbnail(interaction.guild.iconURL())
                    .setDescription(`❌ - На данном сервере нет дней рождений, очень жаль :'(`)
                if (!listData) return interaction.reply({
                    embeds: [no_bd],
                    ephemeral: true
                })

                await interaction.deferReply()

                const date = new Date()
                const currentYear = date.getFullYear()

                let index = 1
                listData.sort((a, b) => new Date(`${a.year} ${a.month} ${a.day}`) - new Date(`${b.year} ${b.month} ${b.day}`))

                const birthdayData = listData.map((d) => {
                    return `**${index++}.** \`${d.day}.${d.month}.${d.year}\` - ${client.users.cache.get(d.userid)} (${currentYear - d.year})`
                }).join("\n")

                const list = new EmbedBuilder()
                    .setTitle(`Список дней рождений`)
                    .setThumbnail(interaction.guild.iconURL())
                    .setColor(process.env.bot_color)
                    .setTimestamp(Date.now())
                    .setDescription(`${birthdayData}`)

                await interaction.editReply({
                    embeds: [list]
                })

            }

                break;
            case `check`: {
                const user = interaction.options.getUser(`пользователь`)
                const listData = await Birthday.findOne({ guildid: interaction.guild.id, userid: user.id })
                const no_bd = new EmbedBuilder()
                    .setTitle(`Нет дня рождения`)
                    .setColor(process.env.bot_color)
                    .setThumbnail(interaction.guild.iconURL())
                    .setDescription(`❌ - У данного пользователя нет дня рождения, очень жаль :'(`)
                if (!listData) return interaction.reply({
                    embeds: [no_bd],
                    ephemeral: true
                })

                const list = new EmbedBuilder()
                    .setTitle(`День рождения ${user.username}`)
                    .setThumbnail(user.displayAvatarURL())
                    .setColor(process.env.bot_color)
                    .setTimestamp(Date.now())
                    .setDescription(`🎂 - Пользователь ${user} отмечает свой день рождения \`${listData.day}.${listData.month}.${listData.year}\`!`)

                await interaction.reply({
                    embeds: [list]
                })

            }

                break;

            default:
                break;
        }
    }
};

function toOrdinalSuffix(num) {
    const int = parseInt(num), digits = [int % 10, int % 100], ordinals = [`-ым`, `-ым`, `-им`, `-ым`], oPattern = [1, 2, 3, 4], tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19]

    return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
        ? int + ordinals[digits[0] - 1]
        : int + ordinals[3]
}
