const { Birthday } = require(`../../schemas/birthday`)
const { Temp } = require(`../../schemas/temp_items`)
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`)
const cron = require(`node-cron`)
const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const linksInfo = require(`../../discord structure/links.json`)

module.exports = (client) => {
    client.newYearStart = async () => {

        cron.schedule(`0 12 1 12 *`, async () => {
            const Guilds = client.guilds.cache
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            await guild_plugin.members.fetch(`491343958660874242`).then(async (adm) => {
                await adm.send(`НУЖНО ОТПРАВИТЬ В НОВОСТИ СООБЩЕНИЕ ОБ ОБНОВЛЕНИИ + ОТКРЫТЬ КАНАЛЫ + ОТПРАВИТЬ КОНТЕНТ В АРХИВ! **НОВОГОДНИЙ СЕЗОН**`)
            })
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.seasonal === false) return
            Guilds.forEach(async g => {
                const guildData = await Guild.findOne({ id: g.id })
                guildData.seasonal.new_year.channels.forEach(async ch => {
                    try {
                        const channel = await g.channels.fetch(ch.id)
                        await channel.edit({
                            permissionOverwrites: [
                                {
                                    id: `504887113649750016`,
                                    allow: [
                                        PermissionsBitField.Flags.ViewChannel,
                                    ],
                                    deny: [
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
                    } catch (e) {
                        let i = guildData.seasonal.new_year.channels.findIndex(chan => chan.id == ch.id)
                        guildData.seasonal.new_year.channels.splice(i, 1)
                        guildData.save()
                    }

                })
                guildData.seasonal.new_year.enabled = true
                guildData.save()
                client.AdvCalendarClear()
                const userDatas = await User.find({ guildid: g.id })
                userDatas.forEach(async userData => {
                    const { points, advent_calendar } = userData.seasonal.new_year
                    points = 0
                    advent_calendar = []

                    userData.save()
                })
            })
        }, {
            scheduled: true,
            timezone: `Europe/Moscow`
        })
    }
}