const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)
const cron = require(`node-cron`)
const wait = require(`node:timers/promises`).setTimeout

module.exports = (client) => {
    client.SchedulerGuildGamesOffs = async () => {
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return
        const guild = await client.guilds.fetch(`320193302844669959`)
        const guildData = await Guild.findOne({ id: guild.id })
        let startMin = guildData.guildgames.gamestart_min
        let startHour = guildData.guildgames.gamestart_hour
        let min_remind = []
        let hour_remind = []
        if (startMin - 15 < 0) {
            let min1 = startMin + 60
            min_remind.push(min1 - 15)
            hour_remind.push(startHour - 1)
        } else {
            let min1 = startMin
            min_remind.push(min1 - 15)
            hour_remind.push(startHour)
        }

        if (startMin - 10 < 0) {
            let min2 = startMin + 60
            min_remind.push(min2 - 10)
            hour_remind.push(startHour - 1)
        } else {
            let min2 = startMin
            min_remind.push(min2 - 10)
            hour_remind.push(startHour)
        }

        if (startMin - 5 < 0) {
            let min3 = startMin + 60
            min_remind.push(min3 - 5)
            hour_remind.push(startHour - 1)
        } else {
            let min3 = startMin
            min_remind.push(min3 - 5)
            hour_remind.push(startHour)
        }


        const weekDays = guildData.guildgames.game_days.join(`,`)
        const scheduleStop = await cron.getTasks().get(`ReminderForOfficer`)
        if (scheduleStop) {
            await scheduleStop.stop()
        }
        cron.schedule(`${min_remind.join(`,`)} ${hour_remind.join(`,`)} * * ${weekDays}`, async () => {
            client.ReminderForOfficer()
        }, {
            timezone: `Europe/Moscow`,
            name: `ReminderForOfficer`,
            scheduled: true
        })
    }
}
