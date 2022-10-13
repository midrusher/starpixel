const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)
const cron = require(`node-cron`)
const wait = require('node:timers/promises').setTimeout;

module.exports = (client) => {
    client.emojiUpdate = async () => {
        //cron.schedule(`45 21 * * *`, async () => {
            await wait(3000)
            let i = 0
            console.log(i++)
            const { Guild } = require(`../../schemas/guilddata`)
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.premium === false) return
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: guild.id })
            console.log(i++)
            results.forEach(async (result) => {
                console.log(i++)
                const { userid, pers_emoji } = result;
                console.log(i++)
                const member = await guild.members.fetch(userid)
                console.log(i++)
                if (member.roles.cache.has(`850336260265476096`)) {
                    console.log(i++ + 'start')
                    if (!guild.emojis.cache.find(emoji => emoji.name === `${result.nickname}`) && pers_emoji == false && result.uuid !== `bd4988c17cfa4daba1f0a2bce375b291`) {
                        console.log(i++ + 'found')
                        await guild.emojis.create({ attachment: `https://visage.surgeplay.com/face/${result.uuid}.png`, name: `${result.nickname}` })
                        result.pers_emoji = true
                        console.log(i++ + 'created')
                    } else if ((guild.emojis.cache.find(emoji => emoji.name === `${result.nickname}`)
                        || guild.emojis.cache.find(emoji => emoji.name === `${result.oldnickname}`)
                    )
                        && pers_emoji == true
                        && result.uuid !== `bd4988c17cfa4daba1f0a2bce375b291`
                    ) {
                        console.log(i++ + 'found2')
                        const emojiDelete = await guild.emojis.cache.find(emoji => emoji.name === `${result.nickname}`) || await guild.emojis.cache.find(emoji => emoji.name === `${result.oldnickname}`)
                        console.log(i++ + 'emojiCache')
                        await emojiDelete.delete()
                        await emoji.create({ attachment: `https://visage.surgeplay.com/face/${result.uuid}.png`, name: `${result.nickname}` })
                        console.log(i++ + 'updated')
                    }
                } else if (!member.roles.cache.has(`850336260265476096`)) {
                    const emoji = await guild.emojis.cache.find(emoji => emoji.name === `${result.nickname}`)
                    result.pers_emoji = false
                    console.log(i++ + 'no role')
                    if (emoji) {
                        emoji.delete(emoji, `${member.user.username} потерял Premium!`)
                        console.log(i++ + 'no role')
                    }
                }
                console.log(i++ + 'finish & save')
                result.save()
            })


        /* }, {
            scheduled: true,
            timezone: `Europe/Moscow`
        }) */
    }
}