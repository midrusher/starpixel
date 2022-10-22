const { Guild } = require(`../../../schemas/guilddata`)
const chalk = require(`chalk`);
const wait = require("timers/promises").setTimeout;
const { Collection, EmbedBuilder } = require(`discord.js`);
const { SearchResultType } = require("distube");

module.exports = {
    name: 'finish',
    async execute(queue, client) {
        const guild = queue.textChannel.guild
        const guildData = await Guild.findOne({ id: guild.id })
        if (guildData.guildgames.started === false) return
        const mus = guildData.guildgames.music
        let total = 0;
        for (let i = 0; i < mus.length; i++) {
            const formula = Math.floor(1 / (mus.length * (mus[i].usedTimes + 1))) * 100
            total += formula;
        }
        let r = Math.floor(Math.random() * total);
        let i = 0;
        for (let s = Math.floor(1 / (mus.length * (mus[0].usedTimes + 1))) * 100; s <= r; s += Math.floor(1 / (mus.length * (mus[i].usedTimes + 1))) * 100) {
            i++;
        }
        const member = await guild.members.fetch(mus[i].sent)
        client.distube.play(queue.voiceChannel, mus[i].link, {
            member: member,
            textChannel: queue.textChannel
        })

        const song = await client.distube.search(mus[i].link, {
            limit: 1,
            type: SearchResultType.VIDEO
        })
        const playing = new EmbedBuilder()
            .setColor(process.env.bot_color)
            .setTitle(`Добавлена песня... 🎶`)
            .setTimestamp(Date.now())
            .setDescription(`**Название**: \`${song[0].name}\`
**Длительность**: \`${song[0].formattedDuration}\`

**Лайков**: ${song[0].likes}👍
**Дизлайков**: ${song[0].dislikes}👎

[Нажмите здесь, чтобы получить ссылку](${song[0].url})`)
        await queue.textChannel.send({
            embeds: [playing]
        })
    }
}