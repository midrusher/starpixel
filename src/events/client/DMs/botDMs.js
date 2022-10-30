const chalk = require(`chalk`);
const { ChannelType, EmbedBuilder } = require("discord.js");
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        const { Guild } = require(`../../../schemas/guilddata`)
        const guild_plugin = await message.client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.bot_dms === false) return
        if (message.channel.type === ChannelType.DM) {
            const guild = await message.client.guilds.fetch(`320193302844669959`)
            const channel = await guild.channels.cache.get(`982551755340537866`)
            const message_embed = new EmbedBuilder()
                .setColor(linksInfo.bot_color)
                .setThumbnail(message.author.displayAvatarURL())
                .setTitle(`НОВОЕ СООБЩЕНИЕ В ЛИЧНЫХ СООБЩЕНИЯХ C ${message.channel.recipient.tag}`)
                .setTimestamp(Date.now())
                .setDescription(`Автор: \`${message.author.tag}\`
Содержимое: \`${message.content}\`
Получатель: ${message.channel.recipient.tag}`)
            await channel.send({
                embeds: [message_embed]
            })
            console.log(chalk.yellow(`[${message.author.tag} в личных сообщениях с ${message.channel.recipient.tag}]`) + chalk.white(`: ${message.content}`))



        }

    }
}