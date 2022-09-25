const { User } = require(`../../../../src/schemas/userdata`)
const { Guild } = require(`../../../../src/schemas/guilddata`)
const { ChannelType, AuditLogEvent, WebhookClient, EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../../../src/discord structure/channels.json`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const client = member.client
        const guild = member.guild;
        const log_data = await Guild.findOne({ id: guild.id })
        if (log_data.plugins.logs === false) return
        const channel = await guild.channels.cache.get(ch_list.log)
        const webhookF = await channel.fetchWebhooks().then(hooks => hooks.find(webhook => webhook.name == `Starpixel Logs`))
        let webhook
        if (!webhookF) {
            await channel.createWebhook({
                name: `Starpixel Logs`,
                avatar: guild.iconURL(),
                reason: `Не было вебхука для использования логов!`
            }).then(hook => {
                log_data.logs.webhook_id = hook.id
                log_data.logs.webhook_token = hook.token
                log_data.logs.webhook_url = hook.url
                log_data.save()
            })
            webhook = new WebhookClient({ id: log_data.logs.webhook_id, token: log_data.logs.webhook_token })
        } else if (webhookF) {
            webhook = new WebhookClient({ id: log_data.logs.webhook_id, token: log_data.logs.webhook_token })
        }

        const { invites } = client
        const newInvites = await guild.invites.fetch()
        const oldInvites = await invites.get(member.guild.id);
        const invite = await newInvites.find(i => i.uses > oldInvites.get(i.code));
        const inviter = await client.users.fetch(invite.inviter.id);

        const created = Math.round(member.user.createdTimestamp / 1000)
        const joined = Math.round(member.joinedTimestamp / 1000)

        const log = new EmbedBuilder()
            .setTitle(`Участник присоединился к серверу`)
            .setDescription(`Пользователь: \`${member}\`
Дата создания аккаунта: <t:${created}:f>
Дата вступления: <t:${joined}:f>

Пригласил: ${inviter}`)
            .setColor(process.env.bot_color)
            .setTimestamp(Date.now())
            .setThumbnail(member.user.displayAvatarURL())

        await webhook.send({
            embeds: [log]
        })
    }
}