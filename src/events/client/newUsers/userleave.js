const { User } = require(`../../../schemas/userdata`)
const { Birthday } = require(`../../../schemas/birthday`)
const { Temp } = require(`../../../schemas/temp_items`)
const { TicketsUser } = require(`../../../schemas/ticketUser`)
const { ChannelType } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ
const linksInfo = require(`../../../discord structure/links.json`)

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
        const guild = member.guild
        const channel = await guild.channels.cache.get(`849608079691350078`)
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
        let info
        if (userData) {
            info = `Minecraft Nick: \`${userData.nickname}\`
Minecraft UUID: ${userData.uuid}
Discord ID: ${userData.userid}
Реальное имя: ${userData.displayname.name}`
            userData.delete()
        }
        if (bd) {
            bd.delete()
        }


        await channel.send({
            content: `❌ ${member.user.username} покинул сервер!
**Дополнительная информация**: ${info ? info : `Не являлся участником гильдии!`}`
        })
    }
}