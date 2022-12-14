const chalk = require(`chalk`);
const wait = require("timers/promises").setTimeout;
const { Collection, EmbedBuilder } = require(`discord.js`)
const { Guild } = require(`../../../schemas/guilddata`)
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: 'addList',
    async execute(queue, playlist) {
        const guild = queue.textChannel.guild
        const guildData = await Guild.findOne({ id: guild.id })
        if (guildData.guildgames.started >= 1) return
        const playing = new EmbedBuilder()
            .setColor(linksInfo.bot_color)
            .setTitle(`Добавлен плейлист... 🎶`)
            .setTimestamp(Date.now())
            .setDescription(`**Название**: \`${playlist.name}\`
**Запросил**: ${playlist.user}
**Длительность**: \`${playlist.formattedDuration}\`

[Нажмите здесь, чтобы получить ссылку](${playlist.url})`)
        await queue.textChannel.send({
            embeds: [playing]
        })
    }
}