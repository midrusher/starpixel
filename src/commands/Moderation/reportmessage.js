const { ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ModalSubmitInteraction, InteractionType, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName(`Пожаловаться`)
        .setType(ApplicationCommandType.Message),
    async execute(interaction, client) {
        const response = new EmbedBuilder()
        .setColor(process.env.bot_color)
        .setThumbnail(interaction.targetMessage.author.displayAvatarURL())
        .setTimestamp(Date.now())
        .setTitle(`Жалоба была отправлена!`)
        .setDescription(`Ваша жалоба на [сообщение](${interaction.targetMessage.url}) была отправлена!`)
        
        await interaction.reply({
            embeds: [response],
            ephemeral: true
        })

        const report = new EmbedBuilder()
        .setColor(process.env.bot_color)
        .setThumbnail(interaction.targetMessage.author.displayAvatarURL())
        .setTimestamp(Date.now())
        .setTitle(`НОВАЯ ЖАЛОБА НА СООБЩЕНИЕ!`)
        .setDescription(`**Отправитель**: ${interaction.member}
**Автор сообщения**: ${interaction.targetMessage.author}
**Содержимое**: ${interaction.targetMessage.content}
**Канал**: ${interaction.targetMessage.channel}

[[Показать сообщение](${interaction.targetMessage.url})]`)


        await interaction.guild.channels.cache.get(process.env.test_channel).send({
            embeds: [report],
        })
    }
}