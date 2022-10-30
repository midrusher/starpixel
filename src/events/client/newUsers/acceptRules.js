const { User } = require(`../../../schemas/userdata`)
const { Guild } = require(`../../../schemas/guilddata`)
const { ChannelType } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        const guild_plugin = await newMember.client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.welcome === false) return
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