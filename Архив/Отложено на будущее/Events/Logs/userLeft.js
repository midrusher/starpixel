const { User } = require(`../../../schemas/userdata`)
const { Guild } = require(`../../../schemas/guilddata`)
const { ChannelType, EmbedBuilder, WebhookClient } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const guild = member.guild;
        const log_data = await Guild.findOne({ id: guild.id })
        const channel = await guild.channels.cache.get(`982551755340537866`)
        const webhook = new WebhookClient({ id: log_data.logs.webhook_id, token: log_data.logs.webhook_token})
        
        const log = new EmbedBuilder()
        .setTitle(`Участник покинул сервер`)
        .setDescription(`Имя пользователя: \`${member.user.tag}\`
Осталось ${guild.memberCount} пользователей`)
        .setColor(process.env.bot_color)
        .setTimestamp(Date.now())
        .setThumbnail(member.user.displayAvatarURL())

        webhook.send({
            embeds: [log]
        })
    }
}