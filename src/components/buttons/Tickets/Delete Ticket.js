const { ButtonBuilder, ChannelType, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { Tickets } = require(`../../../schemas/tickets`)
const { TicketsUser } = require(`../../../schemas/ticketUser`)
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    data: {
        name: `delete_ticket`
    },
    async execute(interaction, client) {
        const { Guild } = require(`../../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.tickets === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        const guild = interaction.guild
        const member = interaction.member
        const channel = interaction.channel
        const tickets = await Tickets.findOne({ guildid: guild.id })
        const anyTickets = await TicketsUser.findOne({ guildid: guild.id, channelid: channel.id, categoryid: channel.parentId })
        if (member.roles.cache.has(`320880176416161802`) || member.user.id === anyTickets.userid ) {
            const requester = await guild.members.fetch(anyTickets.userid)
            try {
                await requester.send({
                    content: `Спасибо, что обратились к нам за помощью! Надеюсь, что мы смогли вам как-либо помочь. Если будут вопросы, вы всегда можете спросить в чате или связаться с нами! ❤`
                })
            } catch (error) {
                console.log(`Личные сообщения пользователя ${requester.user.username} закрыты!`)
            }
            anyTickets.delete()
            await channel.delete(`Обращение №${tickets.id} было обработано!`) //№${tickets.id}

        }
        
    }
}
