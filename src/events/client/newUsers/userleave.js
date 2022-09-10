const { User } = require(`../../../schemas/userdata`)
const { Guild } = require(`../../../schemas/guilddata`)
const { ChannelType } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const guild = member.guild
        const channel = guild.channels.fetch(`849608079691350078`)
        await channel.send({
            content: `❌ ${member.user.username} покинул сервер!`
        })
    }
}