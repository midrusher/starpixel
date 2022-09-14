const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)

module.exports = (client) => {
    client.haspremium = async () => {
        setInterval(async () => {
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: guild.id })

            for (const result of results) {
                const { userid, displayname, pers_emoji } = result;
                const member = await guild.members.cache.get(userid)
                if (member.roles.cache.has(`850336260265476096`)) {
                    displayname.premium = `💳`
                    if (!guild.emojis.cache.find(emoji => emoji.name === `${result.nickname}`) && pers_emoji == false && result.uuid !== `bd4988c17cfa4daba1f0a2bce375b291`) {
                        await guild.emojis.create({ attachment: `https://visage.surgeplay.com/face/${result.uuid}.png`, name: `${result.nickname}` })
                        result.pers_emoji = true
                    } else if (guild.emojis.cache.find(emoji => emoji.name === `${result.nickname}`) && pers_emoji == true && result.uuid !== `bd4988c17cfa4daba1f0a2bce375b291`) {
                        const emoji = guild.emojis.cache.find(emoji => emoji.name === `${result.nickname}`)
                        await emoji.edit({ attachment: `https://visage.surgeplay.com/face/${result.uuid}.png`, name: `${result.nickname}` })
                    } 
                } else if (!member.roles.cache.has(`850336260265476096`)) {
                    displayname.premium = ``
                    const emoji = guild.emojis.cache.find(emoji => emoji.name === `${result.nickname}`)
                    result.pers_emoji = false
                    if (emoji) {
                        emoji.delete(emoji, `${member.user.username} потерял Premium!`)
                    }
                }
                result.save()

            }

        }, 600000)
    }
}