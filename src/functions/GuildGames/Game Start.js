const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)
const cron = require(`node-cron`)
const { isURL } = require(`../../functions`)
const wait = require(`node:timers/promises`).setTimeout

module.exports = (client) => {
    client.GuildGameStart = async () => {
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return
        const guild = await client.guilds.fetch(`320193302844669959`)
        const guildData = await Guild.findOne({ id: guild.id })
        let startMin = guildData.guildgames.gamestart_min
        let startHour = guildData.guildgames.gamestart_hour
        const weekDays = guildData.guildgames.game_days.join(`,`)
        const scheduleStop = await cron.getTasks().get(`GuildGameStart`)
        if (scheduleStop) {
            scheduleStop.stop()
        }
        cron.schedule(`${startMin} ${startHour} * * ${weekDays}`, async () => {
            const gameTypes = [`Традиционная`, `Особая`]
            const gameType = gameTypes[Math.floor(Math.random() * gameTypes.length)]
            const channel = await guild.channels.fetch(ch_list.test)
            const voice = await guild.channels.fetch(ch_list.voice)

            const musicChannel = await guild.channels.fetch(ch_list.your_music)
            const pinnedMessages = await musicChannel.messages.fetchPinned()
            await pinnedMessages.forEach(msg => {
                const content = msg.content.split(` `)
                content.forEach(cont => {
                    if (isURL(cont) === true) {
                        const res = guildData.guildgames.music.find(mus => mus.link == cont)
                        if (!res) {
                            guildData.guildgames.music.push({
                                link: cont,
                                sent: msg.author.id
                            })
                        }
                    }
                })
            })
            guildData.save()
            const date = new Date()
            const day = date.getDay()
            const memberInfo = guildData.guildgames.temp_leader || await guildData.guildgames.officers.find(off => off.day == day).id
            if (memberInfo) {
                const member = await guild.members.fetch(memberInfo)
                await channel.send({
                    content: `Совместная игра в гильдии Starpixel начинается!

**СОВМЕСТНАЯ ИГРА**  :arrow_down: 

Игру ведет ${member}!     :sunglasses:    @here
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

Ждём Вас в голосовом канале ${voice} с хорошим настроением!   @here
Тип совместной игры: **${gameType}**.

:warning: Чтобы получить пати, просто примите \`/g party\`. Иногда вам придётся ждать, пока наши игроки доиграют.
:star: Ведущий будет рандомно выбирать игры в Дискорде с помощью команды. 
:gift: На совместной игре вас ждут различные призы, которые вы сможете получить за победу.`,
                    allowedMentions: {
                        parse: ["everyone"]
                    }
                })
            }


        }, {
            timezone: `Europe/Moscow`,
            name: `GuildGameStart`,
            scheduled: true
        })
    }
}
