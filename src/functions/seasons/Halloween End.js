const { Birthday } = require(`../../schemas/birthday`)
const { Temp } = require(`../../schemas/temp_items`)
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`)
const cron = require(`node-cron`)
const { EmbedBuilder } = require("discord.js")

module.exports = (client) => {
    client.halloweenEnd = async () => {
        const Guilds = client.guilds.cache

        cron.schedule(`0 5 7 11 *`, async () => {
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.seasonal === false) return
            Guilds.forEach(async g => {
                
            })
        }, {
            scheduled: true,
            timezone: `Europe/Moscow`
        })
    }
}