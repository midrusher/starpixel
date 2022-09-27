const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, InteractionType, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const apply = require('../../../commands/Misc/apply');
const { Apply } = require(`../../../schemas/applications`)
module.exports = {
    data: {
        name: "apply1"
    },
    async execute(interaction, client) {
        const { Guild } = require(`../../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.welcome === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        let appData = await Apply.findOne({ userid: interaction.user.id, guildid: interaction.guild.id }) || new Apply({ userid: interaction.user.id, guildid: interaction.guild.id })

        let r1 = interaction.fields.getTextInputValue("first")
        let r2 = interaction.fields.getTextInputValue("second")
        let r3 = interaction.fields.getTextInputValue("third")
        let r4 = interaction.fields.getTextInputValue("fourth")
        let r5 = interaction.fields.getTextInputValue("fifth")
        appData.status = `На рассмотрении`
        appData.que1 = r1
        appData.que2 = r2
        appData.que3 = r3
        appData.que4 = r4
        appData.que5 = r5
        let button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`button_apply`)
                    .setEmoji(`📜`)
                    .setLabel(`Вторая часть`)
                    .setStyle(ButtonStyle.Primary)
            )

        const reply = await interaction.reply({
            content: `Вы заполнили первую часть вашей заявки! Чтобы перейти ко второй части, нажмите на кнопку ниже!`,
            components: [button],
            fetchReply: true
        })
        const message = await interaction.channel.messages.fetch(reply)
        appData.secondPartID = message.id
        appData.save()
    }
}