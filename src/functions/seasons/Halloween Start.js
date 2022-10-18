const { Birthday } = require(`../../schemas/birthday`)
const { Temp } = require(`../../schemas/temp_items`)
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`)
const cron = require(`node-cron`)
const { EmbedBuilder, PermissionsBitField } = require("discord.js")

module.exports = (client) => {
    client.halloweenStart = async () => {

        cron.schedule(`7 10 7 10 *`, async () => {
            const Guilds = client.guilds.cache
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            await guild_plugin.members.fetch(`491343958660874242`).then(async (adm) => {
                await adm.send(`НУЖНО ОТПРАВИТЬ В НОВОСТИ СООБЩЕНИЕ ОБ ОБНОВЛЕНИИ + ОТКРЫТЬ КАНАЛЫ + ОТПРАВИТЬ КОНТЕНТ В АРХИВ`)
            })
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.seasonal === false) return
            Guilds.forEach(async g => {
                const guildData = await Guild.findOne({ id: g.id })
                guildData.seasonal.halloween.channels.forEach(async ch => {
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
                        let i = guildData.seasonal.halloween.channels.findIndex(chan => chan.id == ch.id)
                        guildData.seasonal.halloween.channels.splice(i, 1)
                        guildData.save()
                    }

                })
                guildData.seasonal.halloween.enabled = true
                guildData.save()

                const userDatas = await User.find({ guildid: g.id })
                userDatas.forEach(async userData => {
                    userData.seasonal.halloween.hw_cosm = false
                    userData.seasonal.halloween.hw_soul = false
                    userData.seasonal.halloween.hw_msg = false
                    userData.seasonal.halloween.opened_scary = 0
                    userData.seasonal.halloween.points = 0
                    userData.seasonal.halloween.achievements.num1 = false
                    userData.seasonal.halloween.achievements.num2 = false
                    userData.seasonal.halloween.achievements.num3 = false
                    userData.seasonal.halloween.achievements.num4 = false
                    userData.seasonal.halloween.achievements.num5 = false
                    userData.seasonal.halloween.achievements.num6 = false
                    userData.seasonal.halloween.quests_completed = 0
                    userData.seasonal.halloween.quest.before = 0
                    userData.seasonal.halloween.quest.id = -1
                    userData.seasonal.halloween.quest.finished = true
                    userData.seasonal.halloween.quest.requirement = Infinity
                    userData.seasonal.halloween.quest.description = `Нет квеста.`

                    userData.save()
                })
            })
        }, {
            scheduled: true,
            timezone: `Europe/Moscow`
        })
    }
}