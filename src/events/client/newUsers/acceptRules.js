const { User } = require(`../../../schemas/userdata`)
const { Guild } = require(`../../../schemas/guilddata`)
const { ChannelType } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        if (oldMember.pending === true && newMember.pending === false) {
            await newMember.roles.add(`920346035811917825`)
            const guild = newMember.guild
            const channel = guild.channels.cache.get(`849608079691350078`)
            await channel.send({
                content: `${newMember} принял правила при входе на сервер!`
            })
        }
    }
}