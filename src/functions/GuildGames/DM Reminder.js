const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)
const cron = require(`node-cron`)
const wait = require(`node:timers/promises`).setTimeout
const linksInfo = require(`../../discord structure/links.json`)

module.exports = (client) => {
    client.ReminderForOfficer = async () => {
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return
        const guild = await client.guilds.fetch(`320193302844669959`)
        const guildData = await Guild.findOne({ id: guild.id })
        const date = new Date().toLocaleString(`ru-RU`, { timeZone: `Europe/Moscow` })
        const day = date.getDay()
        const memberInfo = guildData.guildgames.temp_leader || await guildData.guildgames.officers.find(off => off.day == day).id
        if (memberInfo) {
            const member = await guild.members.fetch(memberInfo)
            try {
                const channel = await guild.channels.fetch(ch_list.guildgames)
                await member.send(`Привет! Скоро начинается твоя совместная игра! Пожалуйста, не пропусти ее! Если ты не можешь её посетить, заранее уведоми других ведущих в канале ${channel}! Спасибо!`)
            } catch (e) {
                const channel = await guild.channels.fetch(ch_list.guildgames)
                await channel.send(`${member}, привет!  У тебя закрыты личные сообщение, поэтому я не смог написать тебе. Пожалуйста, открой их.
                    
Скоро начинается твоя совместная игра! Пожалуйста, не пропусти ее! Если ты не можешь её посетить, заранее уведоми других ведущих в канале ${channel}! Спасибо!`)
            }

        } else {
            const channel = await guild.channels.fetch(ch_list.guildgames)
            const role = await guild.roles.fetch(`523559726219526184`)
            await channel.send({
                content: `Скоро начинается совместная игра! Пожалуйста, не пропустите её! В моей базе данных нет информации о ведущем совместной игры в этот день. Прошу администрацию это исправить. ${role}
                    
Если ведущий уже имеется, пусть он готовится к проведению совместной! Спасибо!`,
                allowenMentions: {
                    parse: ["everyone"],
                    roles: ["523559726219526184"]
                }
            })
        }

    }
}
