const chalk = require(`chalk`);
const wait = require("timers/promises").setTimeout;
const { Collection, EmbedBuilder } = require(`discord.js`)
const { Guild } = require(`../../../schemas/guilddata`)

module.exports = {
    name: 'finish',
    async execute(queue) {
        const guild = queue.textChannel.guild
        const guildData = await Guild.findOne({ id: guild.id })
        if (guildData.guildgames.started === true) return
        const playing = new EmbedBuilder()
            .setColor(process.env.bot_color)
            .setTitle(`❌ Закончились песни`)
            .setTimestamp(Date.now())
            .setDescription(`В очереди закончились песни! Чтобы добавить ещё, используйте команду \`/music play\`!`)
        await queue.textChannel.send({
            embeds: [playing]
        })
    }
}