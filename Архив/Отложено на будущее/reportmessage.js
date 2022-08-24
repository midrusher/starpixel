const { ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ModalSubmitInteraction } = require('discord.js');
const { execute } = require('../../src/events/client/ready');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName(`Пожаловаться`)
        .setType(ApplicationCommandType.Message),
    async execute(interaction, client) {
        const report = new ModalBuilder()
        .setTitle(`Пожаловаться на ${interaction.targetMessage.author}`)
        .setCustomId(`reportmsg`)

        const reason = new TextInputBuilder()
        .setCustomId(`reason`)
        .setRequired(true)
        .setLabel(`Причина жалобы`)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`Введите причину жалобы`)

        report.addComponents(new ActionRowBuilder().addComponents(reason))
        await interaction.showModal(report)
        

    }
};