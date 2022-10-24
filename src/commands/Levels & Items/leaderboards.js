const { SlashCommandBuilder, Attachment, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { Guild } = require(`../../schemas/guilddata`)
const { User } = require(`../../schemas/userdata`);


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`leaderboard`)
        .setDescription(`Лучшие пользователи по различным предметам`)
        .setDMPermission(false),
    async execute(interaction, client) {


        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.items === false) return interaction.reply({ content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true })

        const users = await User.find().then(users => {
            return users.filter(async user => await interaction.guild.members.fetch(user.userid))
        })
        let sort1 = users.sort((a, b) => {
            return b.exp - a.exp
        })
        let sort = sort1.sort((a, b) => {
            return b.level - a.level
        })
        let index = 1
        let map = sort.map(async (user) => {
            const tag = await interaction.guild.members.fetch(user.userid)
            return `**${index++}.** ${tag} > ${user.level} уровень & ${user.exp}🌀`
        })
        let mapProm = await Promise.all(map)


        let embed = new EmbedBuilder()
            .setColor(process.env.bot_color)
            .setTitle(`Лучшие пользователи по опыту активности`)
            .setTimestamp(Date.now())
            .setDescription(`${mapProm.slice(0, 10).join('\n')}`)

        let selectMenu = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId(`select`)
                    .setPlaceholder(`Виды таблиц лидеров`)
                    .addOptions(
                        {
                            label: `Опыт активности`,
                            description: `Таблица лидеров по опыту активности`,
                            value: `act`,
                            emoji: `🌀`,
                            default: true
                        },
                        {
                            label: `Опыт рангов`,
                            description: `Таблица лидеров по опыту рангов`,
                            value: `rank`,
                            emoji: `💠`,
                            default: false
                        },
                        {
                            label: `Румбики`,
                            description: `Таблица лидеров по количеству румбиков`,
                            value: `rumbik`,
                            emoji: `<:Rumbik:883638847056003072>`,
                            default: false
                        },
                        {
                            label: `Совместные игры`,
                            description: `Таблица лидеров по кол-ву посещённых совместных`,
                            value: `guild_games`,
                            emoji: `🎲`,
                            default: false
                        },
                        /* {
                            label: `Билеты`,
                            description: `Таблица лидеров по количеству билетов`,
                            value: `tickets`,
                            emoji: `🏷`,
                            default: false
                        }, */

                    )
                    .setMinValues(1)
                    .setMaxValues(1)
            )
        const msg = await interaction.reply({
            embeds: [embed],
            components: [selectMenu],
            fetchReply: true
        })

        const collector = msg.createMessageComponentCollector()

        collector.on('collect', async (int) => {
            const value = int.values[0]
            if (interaction.user.id === int.user.id) {
                if (value == `act`) {
                    await int.deferUpdate()
                    sort1 = users.sort((a, b) => {
                        return b.exp - a.exp
                    })
                    sort = sort1.sort((a, b) => {
                        return b.level - a.level
                    })
                    index = 1
                    map = sort.map(async (user) => {
                        const tag = await interaction.guild.members.fetch(user.userid)
                        return `**${index++}.** ${tag} >> ${user.level} уровень & ${user.exp}🌀`
                    })
                    mapProm = await Promise.all(map)
                    embed.setTitle(`Лучшие пользователи по опыту активности`)
                        .setTimestamp(Date.now())
                        .setDescription(`${mapProm.slice(0, 10).join('\n')}`)

                    selectMenu.components[0].setOptions(
                        {
                            label: `Опыт активности`,
                            description: `Таблица лидеров по опыту активности`,
                            value: `act`,
                            emoji: `🌀`,
                            default: true
                        },
                        {
                            label: `Опыт рангов`,
                            description: `Таблица лидеров по опыту рангов`,
                            value: `rank`,
                            emoji: `💠`,
                            default: false
                        },
                        {
                            label: `Румбики`,
                            description: `Таблица лидеров по количеству румбиков`,
                            value: `rumbik`,
                            emoji: `<:Rumbik:883638847056003072>`,
                            default: false
                        },
                        {
                            label: `Совместные игры`,
                            description: `Таблица лидеров по кол-ву посещённых совместных`,
                            value: `guild_games`,
                            emoji: `🎲`,
                            default: false
                        },
                        /* {
                            label: `Билеты`,
                            description: `Таблица лидеров по количеству билетов`,
                            value: `tickets`,
                            emoji: `🏷`,
                            default: false
                        }, */
                    )

                    await interaction.editReply({
                        embeds: [embed],
                        components: [selectMenu],
                        fetchReply: true
                    })
                } else if (value == `rank`) {
                    await int.deferUpdate()
                    sort = users.sort((a, b) => {
                        return b.rank - a.rank
                    })
                    index = 1
                    map = sort.map(async (user) => {
                        const tag = await interaction.guild.members.fetch(user.userid)
                        return `**${index++}.** ${tag} >> ${user.rank}💠`
                    })
                    mapProm = await Promise.all(map)
                    embed.setTitle(`Лучшие пользователи по опыту рангов`)
                        .setTimestamp(Date.now())
                        .setDescription(`${mapProm.slice(0, 10).join('\n')}`)

                    selectMenu.components[0].setOptions(
                        {
                            label: `Опыт активности`,
                            description: `Таблица лидеров по опыту активности`,
                            value: `act`,
                            emoji: `🌀`,
                            default: false
                        },
                        {
                            label: `Опыт рангов`,
                            description: `Таблица лидеров по опыту рангов`,
                            value: `rank`,
                            emoji: `💠`,
                            default: true
                        },
                        {
                            label: `Румбики`,
                            description: `Таблица лидеров по количеству румбиков`,
                            value: `rumbik`,
                            emoji: `<:Rumbik:883638847056003072>`,
                            default: false
                        },
                        {
                            label: `Совместные игры`,
                            description: `Таблица лидеров по кол-ву посещённых совместных`,
                            value: `guild_games`,
                            emoji: `🎲`,
                            default: false
                        },
                        /* {
                            label: `Билеты`,
                            description: `Таблица лидеров по количеству билетов`,
                            value: `tickets`,
                            emoji: `🏷`,
                            default: false
                        }, */
                    )

                    await interaction.editReply({
                        embeds: [embed],
                        components: [selectMenu],
                        fetchReply: true
                    })
                } else if (value == `rumbik`) {
                    await int.deferUpdate()
                    sort = users.sort((a, b) => {
                        return b.rumbik - a.rumbik
                    })
                    index = 1
                    map = sort.map(async (user) => {
                        const tag = await interaction.guild.members.fetch(user.userid)
                        return `**${index++}.** ${tag} >> ${user.rumbik}<:Rumbik:883638847056003072>`
                    })
                    mapProm = await Promise.all(map)
                    embed.setTitle(`Лучшие пользователи по количеству румбиков`)
                        .setTimestamp(Date.now())
                        .setDescription(`${mapProm.slice(0, 10).join('\n')}`)

                    selectMenu.components[0].setOptions(
                        {
                            label: `Опыт активности`,
                            description: `Таблица лидеров по опыту активности`,
                            value: `act`,
                            emoji: `🌀`,
                            default: false
                        },
                        {
                            label: `Опыт рангов`,
                            description: `Таблица лидеров по опыту рангов`,
                            value: `rank`,
                            emoji: `💠`,
                            default: false
                        },
                        {
                            label: `Румбики`,
                            description: `Таблица лидеров по количеству румбиков`,
                            value: `rumbik`,
                            emoji: `<:Rumbik:883638847056003072>`,
                            default: true
                        },
                        {
                            label: `Совместные игры`,
                            description: `Таблица лидеров по кол-ву посещённых совместных`,
                            value: `guild_games`,
                            emoji: `🎲`,
                            default: false
                        },
                        /* {
                            label: `Билеты`,
                            description: `Таблица лидеров по количеству билетов`,
                            value: `tickets`,
                            emoji: `🏷`,
                            default: false
                        }, */
                    )

                    await interaction.editReply({
                        embeds: [embed],
                        components: [selectMenu],
                        fetchReply: true
                    })
                } else if (value == `guild_games`) {
                    await int.deferUpdate()
                    sort = users.sort((a, b) => {
                        return b.visited_games - a.visited_games
                    })
                    index = 1
                    map = sort.map(async (user) => {
                        const tag = await interaction.guild.members.fetch(user.userid)
                        return `**${index++}.** ${tag} >> ${user.visited_games}🎲`
                    })
                    mapProm = await Promise.all(map)
                    embed.setTitle(`Лучшие пользователи по количеству посещённых совместных игр`)
                        .setTimestamp(Date.now())
                        .setDescription(`${mapProm.slice(0, 10).join('\n')}`)

                    selectMenu.components[0].setOptions(
                        {
                            label: `Опыт активности`,
                            description: `Таблица лидеров по опыту активности`,
                            value: `act`,
                            emoji: `🌀`,
                            default: false
                        },
                        {
                            label: `Опыт рангов`,
                            description: `Таблица лидеров по опыту рангов`,
                            value: `rank`,
                            emoji: `💠`,
                            default: false
                        },
                        {
                            label: `Румбики`,
                            description: `Таблица лидеров по количеству румбиков`,
                            value: `rumbik`,
                            emoji: `<:Rumbik:883638847056003072>`,
                            default: false
                        },
                        {
                            label: `Совместные игры`,
                            description: `Таблица лидеров по кол-ву посещённых совместных`,
                            value: `guild_games`,
                            emoji: `🎲`,
                            default: true
                        },
                        /* {
                            label: `Билеты`,
                            description: `Таблица лидеров по количеству билетов`,
                            value: `tickets`,
                            emoji: `🏷`,
                            default: false
                        }, */
                    )

                    await interaction.editReply({
                        embeds: [embed],
                        components: [selectMenu],
                        fetchReply: true
                    })
                } else if (value == `tickets`) {
                    await int.deferUpdate()
                    sort = users.sort((a, b) => {
                        return b.tickets - a.tickets
                    })
                    index = 1
                    map = sort.map(async (user) => {
                        const tag = await interaction.guild.members.fetch(user.userid)
                        return `**${index++}.** ${tag} >> ${user.tickets}🏷`
                    })
                    mapProm = await Promise.all(map)
                    embed.setTitle(`Лучшие пользователи по количеству билетов`)
                        .setTimestamp(Date.now())
                        .setDescription(`${mapProm.slice(0, 10).join('\n')}`)

                    selectMenu.components[0].setOptions(
                        {
                            label: `Опыт активности`,
                            description: `Таблица лидеров по опыту активности`,
                            value: `act`,
                            emoji: `🌀`,
                            default: false
                        },
                        {
                            label: `Опыт рангов`,
                            description: `Таблица лидеров по опыту рангов`,
                            value: `rank`,
                            emoji: `💠`,
                            default: false
                        },
                        {
                            label: `Румбики`,
                            description: `Таблица лидеров по количеству румбиков`,
                            value: `rumbik`,
                            emoji: `<:Rumbik:883638847056003072>`,
                            default: false
                        },
                        {
                            label: `Совместные игры`,
                            description: `Таблица лидеров по кол-ву посещённых совместных`,
                            value: `guild_games`,
                            emoji: `🎲`,
                            default: true
                        },
                        {
                            label: `Билеты`,
                            description: `Таблица лидеров по количеству билетов`,
                            value: `tickets`,
                            emoji: `🏷`,
                            default: false
                        },
                    )

                    await interaction.editReply({
                        embeds: [embed],
                        components: [selectMenu],
                        fetchReply: true
                    })
                }
            } else {
                if (value == `act`) {
                    await int.deferReply({ fetchReply: true, ephemeral: true })
                    sort1 = users.sort((a, b) => {
                        return b.exp - a.exp
                    })
                    sort = sort1.sort((a, b) => {
                        return b.level - a.level
                    })
                    index = 1
                    map = sort.map(async (user) => {
                        const tag = await interaction.guild.members.fetch(user.userid)
                        return `**${index++}.** ${tag} >> ${user.level} уровень & ${user.exp}🌀`
                    })
                    mapProm = await Promise.all(map)
                    embed.setTitle(`Лучшие пользователи по опыту активности`)
                        .setTimestamp(Date.now())
                        .setDescription(`${mapProm.slice(0, 10).join('\n')}`)

                    selectMenu.components[0].setOptions(
                        {
                            label: `Опыт активности`,
                            description: `Таблица лидеров по опыту активности`,
                            value: `act`,
                            emoji: `🌀`,
                            default: true
                        },
                        {
                            label: `Опыт рангов`,
                            description: `Таблица лидеров по опыту рангов`,
                            value: `rank`,
                            emoji: `💠`,
                            default: false
                        },
                        {
                            label: `Румбики`,
                            description: `Таблица лидеров по количеству румбиков`,
                            value: `rumbik`,
                            emoji: `<:Rumbik:883638847056003072>`,
                            default: false
                        },
                        {
                            label: `Совместные игры`,
                            description: `Таблица лидеров по кол-ву посещённых совместных`,
                            value: `guild_games`,
                            emoji: `🎲`,
                            default: false
                        },
                        /* {
                            label: `Билеты`,
                            description: `Таблица лидеров по количеству билетов`,
                            value: `tickets`,
                            emoji: `🏷`,
                            default: false
                        }, */
                    )

                    await int.editReply({
                        embeds: [embed]
                    })
                } else if (value == `rank`) {
                    await int.deferReply({ fetchReply: true, ephemeral: true })
                    sort = users.sort((a, b) => {
                        return b.rank - a.rank
                    })
                    index = 1
                    map = sort.map(async (user) => {
                        const tag = await interaction.guild.members.fetch(user.userid)
                        return `**${index++}.** ${tag} >> ${user.rank}💠`
                    })
                    mapProm = await Promise.all(map)
                    embed.setTitle(`Лучшие пользователи по опыту рангов`)
                        .setTimestamp(Date.now())
                        .setDescription(`${mapProm.slice(0, 10).join('\n')}`)

                    selectMenu.components[0].setOptions(
                        {
                            label: `Опыт активности`,
                            description: `Таблица лидеров по опыту активности`,
                            value: `act`,
                            emoji: `🌀`,
                            default: false
                        },
                        {
                            label: `Опыт рангов`,
                            description: `Таблица лидеров по опыту рангов`,
                            value: `rank`,
                            emoji: `💠`,
                            default: true
                        },
                        {
                            label: `Румбики`,
                            description: `Таблица лидеров по количеству румбиков`,
                            value: `rumbik`,
                            emoji: `<:Rumbik:883638847056003072>`,
                            default: false
                        },
                        {
                            label: `Совместные игры`,
                            description: `Таблица лидеров по кол-ву посещённых совместных`,
                            value: `guild_games`,
                            emoji: `🎲`,
                            default: false
                        },
                        /* {
                            label: `Билеты`,
                            description: `Таблица лидеров по количеству билетов`,
                            value: `tickets`,
                            emoji: `🏷`,
                            default: false
                        }, */
                    )

                    await int.editReply({
                        embeds: [embed]
                    })
                } else if (value == `rumbik`) {
                    await int.deferReply({ fetchReply: true, ephemeral: true })
                    sort = users.sort((a, b) => {
                        return b.rumbik - a.rumbik
                    })
                    index = 1
                    map = sort.map(async (user) => {
                        const tag = await interaction.guild.members.fetch(user.userid)
                        return `**${index++}.** ${tag} >> ${user.rumbik}<:Rumbik:883638847056003072>`
                    })
                    mapProm = await Promise.all(map)
                    embed.setTitle(`Лучшие пользователи по количеству румбиков`)
                        .setTimestamp(Date.now())
                        .setDescription(`${mapProm.slice(0, 10).join('\n')}`)

                    selectMenu.components[0].setOptions(
                        {
                            label: `Опыт активности`,
                            description: `Таблица лидеров по опыту активности`,
                            value: `act`,
                            emoji: `🌀`,
                            default: false
                        },
                        {
                            label: `Опыт рангов`,
                            description: `Таблица лидеров по опыту рангов`,
                            value: `rank`,
                            emoji: `💠`,
                            default: false
                        },
                        {
                            label: `Румбики`,
                            description: `Таблица лидеров по количеству румбиков`,
                            value: `rumbik`,
                            emoji: `<:Rumbik:883638847056003072>`,
                            default: true
                        },
                        {
                            label: `Совместные игры`,
                            description: `Таблица лидеров по кол-ву посещённых совместных`,
                            value: `guild_games`,
                            emoji: `🎲`,
                            default: false
                        },
                        /* {
                            label: `Билеты`,
                            description: `Таблица лидеров по количеству билетов`,
                            value: `tickets`,
                            emoji: `🏷`,
                            default: false
                        }, */
                    )

                    await int.editReply({
                        embeds: [embed]
                    })
                } else if (value == `guild_games`) {
                    await int.deferReply({ fetchReply: true, ephemeral: true })
                    sort = users.sort((a, b) => {
                        return b.visited_games - a.visited_games
                    })
                    index = 1
                    map = sort.map(async (user) => {
                        const tag = await interaction.guild.members.fetch(user.userid)
                        return `**${index++}.** ${tag} >> ${user.visited_games}🎲`
                    })
                    mapProm = await Promise.all(map)
                    embed.setTitle(`Лучшие пользователи по количеству посещённых совместных игр`)
                        .setTimestamp(Date.now())
                        .setDescription(`${mapProm.slice(0, 10).join('\n')}`)

                    selectMenu.components[0].setOptions(
                        {
                            label: `Опыт активности`,
                            description: `Таблица лидеров по опыту активности`,
                            value: `act`,
                            emoji: `🌀`,
                            default: false
                        },
                        {
                            label: `Опыт рангов`,
                            description: `Таблица лидеров по опыту рангов`,
                            value: `rank`,
                            emoji: `💠`,
                            default: false
                        },
                        {
                            label: `Румбики`,
                            description: `Таблица лидеров по количеству румбиков`,
                            value: `rumbik`,
                            emoji: `<:Rumbik:883638847056003072>`,
                            default: false
                        },
                        {
                            label: `Совместные игры`,
                            description: `Таблица лидеров по кол-ву посещённых совместных`,
                            value: `guild_games`,
                            emoji: `🎲`,
                            default: true
                        },
                        /* {
                            label: `Билеты`,
                            description: `Таблица лидеров по количеству билетов`,
                            value: `tickets`,
                            emoji: `🏷`,
                            default: false
                        }, */
                    )

                    await int.editReply({
                        embeds: [embed]
                    })
                } else if (value == `tickets`) {
                    await int.deferReply({ fetchReply: true, ephemeral: true })
                    sort = users.sort((a, b) => {
                        return b.tickets - a.tickets
                    })
                    index = 1
                    map = sort.map(async (user) => {
                        const tag = await interaction.guild.members.fetch(user.userid)
                        return `**${index++}.** ${tag} >> ${user.tickets}🏷`
                    })
                    mapProm = await Promise.all(map)
                    embed.setTitle(`Лучшие пользователи по количеству билетов`)
                        .setTimestamp(Date.now())
                        .setDescription(`${mapProm.slice(0, 10).join('\n')}`)

                    selectMenu.components[0].setOptions(
                        {
                            label: `Опыт активности`,
                            description: `Таблица лидеров по опыту активности`,
                            value: `act`,
                            emoji: `🌀`,
                            default: false
                        },
                        {
                            label: `Опыт рангов`,
                            description: `Таблица лидеров по опыту рангов`,
                            value: `rank`,
                            emoji: `💠`,
                            default: false
                        },
                        {
                            label: `Румбики`,
                            description: `Таблица лидеров по количеству румбиков`,
                            value: `rumbik`,
                            emoji: `<:Rumbik:883638847056003072>`,
                            default: false
                        },
                        {
                            label: `Совместные игры`,
                            description: `Таблица лидеров по кол-ву посещённых совместных`,
                            value: `guild_games`,
                            emoji: `🎲`,
                            default: true
                        },
                        {
                            label: `Билеты`,
                            description: `Таблица лидеров по количеству билетов`,
                            value: `tickets`,
                            emoji: `🏷`,
                            default: false
                        },
                    )

                    await int.editReply({
                        embeds: [embed]
                    })
                }
            }
        })
    }
};