const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)

module.exports = (client) => {
    client.haspremium = async () => {
        setInterval(async () => {
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: guild.id })

            for (const result of results) {
                const { id, displayname } = result;
                const member = await guild.members.cache.get(id)
                if (member.roles.cache.has(`850336260265476096`)) {
                    displayname.premium = `💳`
                } else if (!member.roles.cache.has(`850336260265476096`)) {
                    displayname.premium = ``
                }
                result.save()
                
            }

        }, 10000)
    }
}