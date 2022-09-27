const chalk = require(`chalk`);
const wait = require("timers/promises").setTimeout;
const { Collection, EmbedBuilder } = require(`discord.js`)

module.exports = {
    name: 'disconnect',
    async execute(queue) {
        const playing = new EmbedBuilder()
            .setColor(process.env.bot_color)
            .setTitle(`Я отключился 👋`)
            .setTimestamp(Date.now())
            .setDescription(`Я покинул голосовой канал. Чтобы включить музыку, используйте команду \`/music play\``)
        await queue.textChannel.send({
            embeds: [playing]
        })
    }
}