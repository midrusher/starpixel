const { ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ModalSubmitInteraction, InteractionType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { execute } = require('../../events/client/ready');
const { User } = require(`../../schemas/userdata`)

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName(`Заблокировать`)
        .setType(ApplicationCommandType.User)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction, client) {

    }
}