const { User } = require(`../../../schemas/userdata`)
const { Guild } = require(`../../../schemas/guilddata`)
const { ChannelType, EmbedBuilder, WebhookClient } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldM, newM) {
        const guild = oldM.guild;
        const log_data = await Guild.findOne({ id: guild.id })
        const channel = await guild.channels.cache.get(`982551755340537866`)
        const webhook = new WebhookClient({ id: log_data.logs.webhook_id, token: log_data.logs.webhook_token})
        console.log

        console.log(oldM, newM)
        const log = new EmbedBuilder()
        .setTitle(`Данные участника изменились`)
        .setDescription(``)
        .setColor(process.env.bot_color)
        .setTimestamp(Date.now())
        .setThumbnail(newM.user.displayAvatarURL())

        webhook.send({
            embeds: [log]
        })
    }
}