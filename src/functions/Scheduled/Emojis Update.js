const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)
const cron = require(`node-cron`)
const wait = require('node:timers/promises').setTimeout;

module.exports = (client) => {
    client.emojiUpdate = async () => {
        cron.schedule(`0 5 * * *`, async () => {
        const { Guild } = require(`../../schemas/guilddata`)
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.premium === false) return
        const guild = await client.guilds.fetch(`320193302844669959`)
        const results = await User.find({ guildid: guild.id })
        results.forEach(async (result) => {
            const { userid, pers_emoji } = result;
            const member = await guild.members.fetch(userid)
            const curEmName = await guild.emojis.cache.find(emoji => emoji.name === `${result.nickname}`)
            const oldEmName = await guild.emojis.cache.find(emoji => emoji.name === `${result.oldnickname}`)
            if (member.roles.cache.has(`850336260265476096`)) {
                if (!curEmName && result.uuid !== `bd4988c17cfa4daba1f0a2bce375b291`) {
                    await guild.emojis.create({ attachment: `https://visage.surgeplay.com/face/${result.uuid}.png`, name: `${result.nickname}` })
                    result.pers_emoji = true
                } else if ((curEmName || oldEmName) && pers_emoji == true && result.uuid !== `bd4988c17cfa4daba1f0a2bce375b291`
                ) {
                    const emojiDelete = await guild.emojis.cache.find(emoji => emoji.name === `${result.nickname}`) || await guild.emojis.cache.find(emoji => emoji.name === `${result.oldnickname}`)
                    if (emojiDelete) {
                        await emojiDelete.delete()
                    }
                    await guild.emojis.create({ attachment: `https://visage.surgeplay.com/face/${result.uuid}.png`, name: `${result.nickname}` })
                }
            } else if (!member.roles.cache.has(`850336260265476096`)) {
                const emoji = await guild.emojis.cache.find(emoji => emoji.name === `${result.nickname}`)
                result.pers_emoji = false
                if (emoji) {
                    emoji.delete(emoji, `${member.user.username} потерял Premium!`)
                }
            }
            result.save()
        })


        }, {
            scheduled: true,
            timezone: `Europe/Moscow`
        })
    }
}