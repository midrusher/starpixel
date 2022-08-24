const { ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const { execute } = require('../../src/events/client/ready');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName(`Отправить жалобу`)
        .setType(ApplicationCommandType.User),
    async execute(interaction, client) {
        const report = new ModalBuilder()
        .setTitle(`Пожаловаться на ${interaction.targetUser}`)
        .setCustomId(`reportuser`)

        const reason = new TextInputBuilder()
        .setRequired(true)
        .setCustomId(`reason`)
        .setLabel(`Причина жалобы`)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`Введите причину жалобы`)

        report.addComponents(new ActionRowBuilder().addComponents(reason))
        await interaction.showModal(report)
        

    }
};