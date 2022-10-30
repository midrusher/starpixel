const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)
const linksInfo = require(`../../discord structure/links.json`)

module.exports = (client) => {
    client.haspremium = async () => {
            const { Guild } = require(`../../schemas/guilddata`)
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.premium === false) return
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: guild.id })

            for (const result of results) {
                const { userid, displayname, pers_emoji } = result;
                const member = await guild.members.cache.get(userid)
                if (member.roles.cache.has(`850336260265476096`)) {
                    displayname.premium = `💳`
                } else if (!member.roles.cache.has(`850336260265476096`)) {
                    displayname.premium = ``
                    
                }
                result.save()

            }

    }
}