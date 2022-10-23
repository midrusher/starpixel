const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)
const wait = require(`node:timers/promises`).setTimeout

module.exports = (client) => {
    client.GameEnd = async () => {
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return
        const guild = await client.guilds.fetch(`320193302844669959`)
        await client.distube.voices.leave(guild)
        const guildData = await Guild.findOne({ id: guild.id })
        const channel = await guild.channels.fetch(ch_list.main)
        const voice = await guild.channels.fetch(ch_list.guildGamesVoice)
        const voiceMembers = voice.members.filter(member => member.user.bot === false)
        await voiceMembers.forEach(async member => {
            const userData = await User.findOne({ userid: member.user.id, guildid: guild.id })
            userData.visited_games += 1
            userData.save()
        })
        let i = 1
        const list = await voiceMembers.map(member => {
            return `**${i++}.** ${member}`
        })
        const date = new Date()
        const day = date.getDay()
        let memberInfo = guildData.guildgames.temp_leader || await guildData.guildgames.officers.find(off => off.day == day)?.id
        let member
        if (memberInfo) member = await guild.members.fetch(memberInfo)
        else member = `\`Неизвестный\` `
        const visitedEmbed = new EmbedBuilder()
            .setTitle(`Совместная игра ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`)
            .setDescription(`**Посетило игроков**: ${voiceMembers.size}
**Ведущий**: ${member}

**Игру посетили**:
${list.join(`\n`)}`)
            .setColor(process.env.bot_color)
            .setFooter({ text: `Если вы посетили совместную игру, но вас тут нет, напишите в вопрос-модерам, предоставив доказательство! Вся информация о посещённых игроках берётся из участников голосового канала. В следующий раз заходите в голосовой канал и общайтесь с другими участниками!` })
            .setThumbnail(guild.iconURL())
            .setTimestamp(Date.now())

        const gameStats = await guild.channels.fetch(ch_list.visitedGames)
        await gameStats.send({
            embeds: [visitedEmbed]
        })

        let b = 1
        const gamesPlayed = guildData.guildgames.games.map(game => {
            return `**${b++}**. ${game.id} - ${game.played} раз`
        })
        const statsEmbed = new EmbedBuilder()
            .setTitle(`Статистика текущей игры`)
            .setDescription(`Итоги: 
${gamesPlayed.join(`\n`)}`)
            .setTimestamp(Date.now())
            .setColor(process.env.bot_color)
            .setThumbnail(guild.iconURL())
        await channel.send({
            content: `◾ 
**СОВМЕСТНАЯ ИГРА ЗАВЕРШАЕТСЯ**!
Пожалуйста, выйдите из канала ${voice}.

{user} благодарит всех, кто посетил её.
◾`
        })
        const hearts = [
            `:yellow_heart: :orange_heart: :yellow_heart: :orange_heart: :yellow_heart: :orange_heart:`, 
            `:white_heart: :heart: :white_heart: :heart: :white_heart: :heart:`, 
            `:brown_heart: :green_heart: :brown_heart: :green_heart: :brown_heart: :green_heart:`,
            `:purple_heart: :blue_heart: :purple_heart: :blue_heart: :purple_heart: :blue_heart:`
        ]
        const randomHearts = hearts[Math.floor(Math.random() * hearts.length)]
        await channel.send(`${randomHearts}`)
        await channel.send({
            embeds: [statsEmbed]
        })

        guildData.guildgames.started = false
        guildData.guildgames.gameType = ``
        guildData.guildgames.temp_leader = ``
        guildData.guildgames.music.forEach(mus => mus.usedTimes = 0)
        guildData.guildgames.games = []
        guildData.save()
    }
}
