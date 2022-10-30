const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)
const cron = require(`node-cron`)
const wait = require(`node:timers/promises`).setTimeout

module.exports = (client) => {
    client.SchedulerGuildGamesRem = async () => {
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return
        const guild = await client.guilds.fetch(`320193302844669959`)
        const guildData = await Guild.findOne({ id: guild.id })
        
        let startMinPreStart = guildData.guildgames.gamestart_min
        let startHourPreStart = guildData.guildgames.gamestart_hour
        let min_remindPreStart
        let hour_remindPreStart
        if (startMinPreStart - 10 < 0) {
            startMinPreStart = startMinPreStart + 60
            min_remindPreStart = startMinPreStart - 10
            hour_remindPreStart = startHourPreStart - 1
        } else {
            min_remindPreStart = startMinPreStart - 10
            hour_remindPreStart = startHourPreStart
        }
        const weekDaysPreStart = guildData.guildgames.game_days.join(`,`)
        const scheduleStopPreStart = await cron.getTasks().get(`GamePreStart`)
        if (scheduleStopPreStart) {
            await scheduleStopPreStart.stop()
        }
        cron.schedule(`${min_remindPreStart} ${hour_remindPreStart} * * ${weekDaysPreStart}`, async () => {
            client.GamePreStart()
        }, {
            timezone: `Europe/Moscow`,
            name: `GamePreStart`,
            scheduled: true
        })
    }
}
