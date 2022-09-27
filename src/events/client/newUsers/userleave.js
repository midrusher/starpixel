const { User } = require(`../../../schemas/userdata`)
const { Birthday } = require(`../../../schemas/birthday`)
const { Temp } = require(`../../../schemas/temp_items`)
const { TicketsUser } = require(`../../../schemas/ticketUser`)
const { ChannelType } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const { Guild } = require(`../../../schemas/guilddata`)
        const guild_plugin = await member.client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.welcome === false) return
        const userData = await User.findOne({ userid: member.user.id, guildid: member.guild.id })
        const bd = await Birthday.findOne({ userid: member.user.id, guildid: member.guild.id })
        const temp = await Temp.find({ userid: member.user.id, guildid: member.guild.id })
        const tickets = await TicketsUser.find({ userid: member.user.id, guildid: member.guild.id })

        if (tickets) {
            tickets.forEach(async (ticket) => {
                const channel = await member.guild.channels.fetch(ticket.channelid)
                await channel.delete()
                ticket.delete()
            })
        }
        if (temp) {
            temp.forEach((item) => {
                item.delete()
            })
        }

        if (userData) {
            userData.delete()
        }
        if (bd) {
            bd.delete()
        }

        const guild = member.guild
        const channel = guild.channels.cache.get(`849608079691350078`)
        await channel.send({
            content: `❌ ${member.user.username} покинул сервер!`
        })
    }
}