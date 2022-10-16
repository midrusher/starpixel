const { Birthday } = require(`../../schemas/birthday`)
const { Temp } = require(`../../schemas/temp_items`)
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const ch_list = require(`../../discord structure/channels.json`)
const chalk = require(`chalk`)
const cron = require(`node-cron`)
const wait = require(`node:timers/promises`).setTimeout
const { EmbedBuilder, PermissionsBitField } = require("discord.js")

module.exports = (client) => {
    client.halloweenEnd = async () => {

        cron.schedule(`0 18 7 11 *`, async () => {
            const Guilds = client.guilds.cache
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.seasonal === false) return
            Guilds.forEach(async g => {
                const guildData = await Guild.findOne({ id: g.id })
                guildData.seasonal.halloween.channels.forEach(async ch => {

                    const channel = await g.channels.fetch(ch.id).then(async chan => {
                        await chan.edit({
                            permissionOverwrites: [
                                {
                                    id: `567689925143822346`,
                                    deny: [
                                        PermissionsBitField.Flags.ViewChannel,
                                        PermissionsBitField.Flags.SendMessages
                                    ]
                                },
                                {
                                    id: g.id,
                                    deny: [
                                        PermissionsBitField.Flags.ViewChannel,
                                        PermissionsBitField.Flags.SendMessages
                                    ]
                                },
                            ]
                        })
                    }).catch(async (err) => {
                        let i = guildData.seasonal.halloween.channels.findIndex(chan => chan.id == ch.id)
                        guildData.seasonal.halloween.channels.splice(i, 1)
                        guildData.save()
                    })




                })
                guildData.seasonal.halloween.enabled = false
                guildData.save()

                const userDatas = await User.find({
                    "seasonal.halloween.points": { $gt: 0 }
                }).then(users => {
                    return users.filter(async user => await interaction.guild.members.fetch(user.userid))
                })
                const sort = userDatas.sort((a, b) => {
                    return b.seasonal.halloween.points - a.seasonal.halloween.points
                }).slice(0, 10)
                let index = 1
                const map = sort.map(async (user) => {
                    const tag = await g.members.fetch(user.userid)
                    return `**${index++}.** ${tag} > ${user.seasonal.halloween.points} очков`
                })
                const bestData = sort[0]
                const member = await g.members.fetch(bestData.userid)

                const mapProm = await Promise.all(map)
                const embed = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Лучшие пользователи по хэллоуинским очкам`
                    })
                    .setTimestamp(Date.now())
                    .setDescription(`${mapProm.join('\n')}`)

                await g.channels.cache.get(ch_list.main).send({
                    embeds: [embed]
                }).then(async msg => {
                    await msg.react(`🎃`)
                    await wait(1000)
                })
                await g.channels.cache.get(ch_list.main).send(`Идет финальный подсчёт количества очков... Кто же победит?`)
                await wait(3000)
                await g.channels.cache.get(ch_list.main).send(`Ответ вы узнаете через 3...`)
                await wait(3000)
                await g.channels.cache.get(ch_list.main).send(`Ответ вы узнаете через 2...`)
                await wait(3000)
                await g.channels.cache.get(ch_list.main).send(`Ответ вы узнаете через 1...`)
                await wait(3000)
                await g.channels.cache.get(ch_list.main).send({
                    content: `Поздравляем ${member} с победой в Хэллоуинском мероприятии! Он получает эксклюзивную роль <@&660236704971489310>!  @everyone`,
                    allowedMentions: {
                        parse: ["everyone"]
                    }
                })
                await member.roles.add(`660236704971489310`)
            })
        }, {
            scheduled: true,
            timezone: `Europe/Moscow`
        })
    }
}