const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)
const cron = require(`node-cron`)
const wait = require(`node:timers/promises`).setTimeout

module.exports = (client) => {
    client.GamePreStart = async () => {
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return
        const guild = await client.guilds.fetch(`320193302844669959`)
        const guildData = await Guild.findOne({ id: guild.id })
        
        
            let song = guildData.guildgames.pregame_song
            if (!song) song = `https://www.youtube.com/watch?v=KvAuzChTIJg`
            const channel = await guild.channels.fetch(ch_list.main)
            const MusicCommandsChannel = await guild.channels.fetch(ch_list.music)
            const date = new Date().toLocaleString(`ru-RU`, { timeZone: `Europe/Moscow` })
            const day = date.getDay()
            const memberInfo = guildData.guildgames.temp_leader || await guildData.guildgames.officers.find(off => off.day == day).id
            await client.distube.voices.leave(guild)
            const voice = await guild.channels.fetch(ch_list.guildGamesVoice)
            const connection = await client.distube.voices.join(voice).then(async (connection) => {
                await connection.setSelfDeaf(false)
                await connection.setSelfMute(false)
            })
            if (memberInfo) {
                const member = await guild.members.fetch(memberInfo)
                await channel.send({
                    content: `Скоро совместная игра!    
Заходите на Hypixel, чтобы успеть принять \`/g party\`.    

:scroll:  ${member} хочет напомнить вам **ПРАВИЛА** совместных игр: 
• Не нарушать правила гильдии и Hypixel;
• Не перебивать игроков;
• Вести себя адекватно;
• Нормально реагировать на возможные замечания ведущих;
• Выполнять все требования ведущих.`,
                    allowedMentions: {
                        parse: ["everyone"]
                    }
                })

                client.distube.play(voice, song, {
                    member: member,
                    textChannel: MusicCommandsChannel
                })
            } else {
                const clientMember = await guild.members.fetch(client.user.id)
                await channel.send({
                    content: `Скоро совместная игра!    
Заходите на Hypixel, чтобы успеть принять \`/g party\`.    

:scroll:  Ведущие хотят напомнить вам **ПРАВИЛА** совместных игр: 
• Не нарушать правила гильдии и Hypixel;
• Не перебивать игроков;
• Вести себя адекватно;
• Нормально реагировать на возможные замечания ведущих;
• Выполнять все требования ведущих.`,
                    allowedMentions: {
                        parse: ["everyone"]
                    }
                })

                client.distube.play(voice, song, {
                    member: clientMember,
                    textChannel: MusicCommandsChannel
                })
            }
            guildData.guildgames.started = 1
            guildData.save()

    }
}
