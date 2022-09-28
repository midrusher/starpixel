const chalk = require(`chalk`);
const wait = require("timers/promises").setTimeout;
const { Collection, EmbedBuilder } = require(`discord.js`)

module.exports = {
    name: 'empty',
    async execute(queue) {
        const playing = new EmbedBuilder()
            .setColor(process.env.bot_color)
            .setTitle(`Не осталось пользователей`)
            .setTimestamp(Date.now())
            .setDescription(`В канале ${queue.voiceChannel} не осталось пользователей, поэтому я должен был покинуть этот канал!`)
        await queue.textChannel.send({
            embeds: [playing]
        })
    }
}