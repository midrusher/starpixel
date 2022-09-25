const { User } = require(`../../../../src/schemas/userdata`)
const { Guild } = require(`../../../../src/schemas/guilddata`)
const { ChannelType, AuditLogEvent, WebhookClient, EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../../../src/discord structure/channels.json`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'guildMemberRemove',
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

        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberKick,
        });

        const auditLog = fetchedLogs.entries.first();

        let executor
        if (!auditLog) {
            const log = new EmbedBuilder()
                .setTitle(`Участник покинул сервер`)
                .setDescription(`Имя пользователя: \`${member.user.tag}\``)
                .setColor(process.env.bot_color)
                .setTimestamp(Date.now())
                .setThumbnail(member.user.displayAvatarURL())

            await webhook.send({
                embeds: [log]
            })
        } else if (auditLog) {
            executor = auditLog.executor
            const reason = auditLog.reason
            if (reason) {
                const log = new EmbedBuilder()
                    .setTitle(`Участник исключён`)
                    .setColor(process.env.bot_color)
                    .setTimestamp(Date.now())
                    .setThumbnail(member.user.displayAvatarURL())
                    .setDescription(`Имя пользователя: \`${member.user.tag}\`
Причина: ${reason}

Исключил: ${executor}`)
                await webhook.send({
                    embeds: [log]
                })
            } else if (!reason) {
                const log = new EmbedBuilder()
                    .setTitle(`Участник исключён`)
                    .setColor(process.env.bot_color)
                    .setTimestamp(Date.now())
                    .setThumbnail(member.user.displayAvatarURL())
                    .setDescription(`Имя пользователя: \`${member.user.tag}\`

Исключил: ${executor}`)
                await webhook.send({
                    embeds: [log]
                })
            }
        }
    }
}