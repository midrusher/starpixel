const { User } = require(`../../../../src/schemas/userdata`)
const { Guild } = require(`../../../../src/schemas/guilddata`)
const { ChannelType, EmbedBuilder, WebhookClient, AuditLogEvent } = require(`discord.js`)
const ch_list = require(`../../../../src/discord structure/channels.json`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: 'guildBanRemove',
    async execute(ban) {
        const client = ban.client
        const guild = ban.guild
        const pluginData = await Guild.findOne({ id: guild.id })
        if (pluginData.plugins.logs === false) return
        if (ban.partial) {
            try {
                await ban.fetch();
            } catch (error) {
                console.error('Произошла ошибка при обработке бана', error);

                return;
            }
        }
        const log_data = await Guild.findOne({ id: guild.id })
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

        const fetchedLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberBanRemove
        });
        const auditLog = fetchedLogs.entries.first();

        const log = new EmbedBuilder()
            .setTitle(`Пользователь разблокирован`)
            .setDescription(`Пользователь: ${ban.user.tag}
Причина: ${ban.reason}

Модератор: ${auditLog.executor}`)
            .setColor(linksInfo.bot_color)
            .setTimestamp(Date.now())
            .setThumbnail(ban.user.displayAvatarURL())

        webhook.send({
            embeds: [log]
        })

    }
}