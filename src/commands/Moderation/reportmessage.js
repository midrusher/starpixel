const { ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ModalSubmitInteraction, InteractionType, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const ch_list = require(`../../discord structure/channels.json`)
const linksInfo = require(`../../discord structure/links.json`)

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName(`Пожаловаться`)
        .setType(ApplicationCommandType.Message)
        .setDMPermission(false),
    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.moderation === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        const response = new EmbedBuilder()
        .setColor(linksInfo.bot_color)
        .setThumbnail(interaction.targetMessage.author.displayAvatarURL())
        .setTimestamp(Date.now())
        .setTitle(`Жалоба была отправлена!`)
        .setDescription(`Ваша жалоба на [сообщение](${interaction.targetMessage.url}) была отправлена!`)
        
        await interaction.reply({
            embeds: [response],
            ephemeral: true
        })
        await interaction.targetMessage.react(`⚒`)

        const report = new EmbedBuilder()
        .setColor(linksInfo.bot_color)
        .setThumbnail(interaction.targetMessage.author.displayAvatarURL())
        .setTimestamp(Date.now())
        .setTitle(`НОВАЯ ЖАЛОБА НА СООБЩЕНИЕ!`)
        .setDescription(`**Отправитель**: ${interaction.member}
**Автор сообщения**: ${interaction.targetMessage.author}
**Содержимое**: ${interaction.targetMessage.content}
**Канал**: ${interaction.targetMessage.channel}

[[Показать сообщение](${interaction.targetMessage.url})]`)


        await interaction.guild.channels.cache.get(ch_list.staff).send({
            embeds: [report],
        })
    }
}