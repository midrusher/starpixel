const { User } = require(`../../../schemas/userdata`)
const { Birthday } = require(`../../../schemas/birthday`)
const { ChannelType } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const userData = await User.findOne({ userid: member.user.id, guildid: member.guild.id })
        const bd = await Birthday.findOne({ userid: member.user.id, guildid: member.guild.id })
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