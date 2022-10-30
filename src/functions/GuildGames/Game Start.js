const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)
const cron = require(`node-cron`)
const { isURL } = require(`../../functions`)
const wait = require(`node:timers/promises`).setTimeout
const linksInfo = require(`../../discord structure/links.json`)

module.exports = (client) => {
    client.GuildGameStart = async () => {
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return
        const guild = await client.guilds.fetch(`320193302844669959`)
        const guildData = await Guild.findOne({ id: guild.id })
        
            const gameTypes = [`Традиционная`, `Особая`]
            const gameType = gameTypes[Math.floor(Math.random() * gameTypes.length)]
            const channel = await guild.channels.fetch(ch_list.main)
            const voice = await guild.channels.fetch(ch_list.guildGamesVoice)
            guildData.guildgames.started = 2
            guildData.guildgames.gameType = gameType
            guildData.save()
            const date = new Date().toLocaleString(`ru-RU`, { timeZone: `Europe/Moscow` })
            const day = date.getDay()
            await voice.members.forEach(async (member) => {
                await member.voice.setMute(false)
            })
            const memberInfo = guildData.guildgames.temp_leader || await guildData.guildgames.officers.find(off => off.day == day).id
            if (memberInfo) {
                const member = await guild.members.fetch(memberInfo)
                await channel.send({
                    content: `Совместная игра в гильдии Starpixel начинается!

**СОВМЕСТНАЯ ИГРА**  :arrow_down:     

Игру ведет ${member}!     :sunglasses:    
Ждём Вас в голосовом канале ${voice} с хорошим настроением!
Тип совместной игры: **${gameType}**.

:warning: Чтобы получить пати, просто примите \`/g party\`. Иногда вам придётся ждать, пока наши игроки доиграют.
:star: Ведущий будет рандомно выбирать игры в Дискорде с помощью команды. 
:gift: На совместной игре вас ждут различные призы, которые вы сможете получить за победу.`,
                    allowedMentions: {
                        parse: ["everyone"]
                    }
                })
            } else {
                await channel.send({
                    content: `Совместная игра в гильдии Starpixel начинается!

**СОВМЕСТНАЯ ИГРА**  :arrow_down:     

Ждём Вас в голосовом канале ${voice} с хорошим настроением!   
Тип совместной игры: **${gameType}**.

:warning: Чтобы получить пати, просто примите \`/g party\`. Иногда вам придётся ждать, пока наши игроки доиграют.
:star: Ведущий будет рандомно выбирать игры в Дискорде с помощью команды. 
:gift: На совместной игре вас ждут различные призы, которые вы сможете получить за победу.`,
                    allowedMentions: {
                        parse: ["everyone"]
                    }
                })
            }
    }
}
