const { ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ModalSubmitInteraction, InteractionType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName(`Заглушить`)
        .setType(ApplicationCommandType.User)
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction, client) {

    }
}