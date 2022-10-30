const { ButtonBuilder, ChannelType, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { Tickets } = require(`../../../schemas/tickets`)
const { TicketsUser } = require(`../../../schemas/ticketUser`)
const { Guild } = require(`../../../schemas/guilddata`)
const { User } = require(`../../../schemas/userdata`)
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    data: {
        name: `december_1`
    },
    async execute(interaction, client) {
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.seasonal === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        const userData = await User.findOne({ userid: interaction.user.id, guildid: interaction.guild.id })
        const date = new Date()
        const d = date.getDate()
        const m = date.getMonth() + 1
        const result = await userData.seasonal.new_year.advent_calendar.find(cal => cal.name = `Dec 4`)
        if (result) return interaction.reply({
            content: `Вы уже получили эту награду!`,
            ephemeral: true
        })
        if (d !== 4 && m !== 12) return interaction.reply({
            content: `Этот день ещё не наступил. Пожалуйста, нажмите на эту кнопку 2-го декабря!`,
            ephemeral: true
        })
        const role = await interaction.guild.roles.fetch(`510932601721192458`)
        const member = interaction.member
        if (member.roles.cache.has(role.id)) return interaction.reply({
            content: `У вас в профиле имеется коробка, которая выдается за этот день! Пожалуйста, откройте \`${role.name}\` коробку.`,
            ephemeral: true
        })
        await member.roles.add(role.id)
        await userData.seasonal.new_year.advent_calendar.push({
            name: `Dec 4`
        })
        userData.save()
        await interaction.reply({
            content: `Вы получили свою награду за 4-е декабря! Вы можете найти её в своем профиле!`,
            ephemeral: true
        })

    }
}
