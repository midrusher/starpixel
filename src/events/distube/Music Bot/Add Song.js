const chalk = require(`chalk`);
const wait = require("timers/promises").setTimeout;
const { Collection, EmbedBuilder } = require(`discord.js`)

module.exports = {
    name: 'addSong',
    async execute(queue, song) {
        const playing = new EmbedBuilder()
            .setColor(process.env.bot_color)
            .setTitle(`Добавлена песня... 🎶`)
            .setTimestamp(Date.now())
            .setDescription(`**Название**: \`${song.name}\`
**Запросил**: ${song.user}
**Длительность**: \`${song.formattedDuration}\`

**Лайков**: ${song.likes}👍
**Дизлайков**: ${song.dislikes}👎

[Нажмите здесь, чтобы получить ссылку](${song.url})`)
        await queue.textChannel.send({
            embeds: [playing]
        })
    }
}