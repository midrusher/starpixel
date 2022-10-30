const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)
const cron = require(`node-cron`)
const wait = require(`node:timers/promises`).setTimeout
const linksInfo = require(`../../discord structure/links.json`)

module.exports = (client) => {
    client.SchedulerGuildGamesStart = async () => {
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return
        const guild = await client.guilds.fetch(`320193302844669959`)
        const guildData = await Guild.findOne({ id: guild.id })
        
        let startMinGameStart = guildData.guildgames.gamestart_min
        let startHourGameStart = guildData.guildgames.gamestart_hour
        const weekDaysGameStart = guildData.guildgames.game_days.join(`,`)
        const scheduleStopGameStart = await cron.getTasks().get(`GuildGameStart`)
        if (scheduleStopGameStart) {
            await scheduleStopGameStart.stop()
        }
        cron.schedule(`${startMinGameStart} ${startHourGameStart} * * ${weekDaysGameStart}`, async () => {
            client.GuildGameStart()
        }, {
            timezone: `Europe/Moscow`,
            name: `GuildGameStart`,
            scheduled: true
        })
    }
}
