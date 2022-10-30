const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, InteractionType, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const apply = require('../../../commands/Misc/apply');
const { Apply } = require(`../../../schemas/applications`)
const linksInfo = require(`../../../discord structure/links.json`)
module.exports = {
    data: {
        name: "sochinenie"
    },
    async execute(interaction, client) {
        let r1 = interaction.fields.getTextInputValue("p1")
        let r2 = interaction.fields.getTextInputValue("p2") ? interaction.fields.getTextInputValue("p2") : `Не написано`
        let r3 = interaction.fields.getTextInputValue("p3") ? interaction.fields.getTextInputValue("p3") : `Не написано`
        let r4 = interaction.fields.getTextInputValue("p4") ? interaction.fields.getTextInputValue("p4") : `Не написано`
        let r5 = interaction.fields.getTextInputValue("p5") ? interaction.fields.getTextInputValue("p5") : `Не написано`

        await interaction.reply({
            content: `Вы написали сочинение для Дмитрия!
${r1}
${r2}
${r3}
${r4}
${r5}`,
            ephemeral: true
        })

        const member = await interaction.guild.members.fetch(`491343958660874242`)
        await member.send({
            content: `${interaction.user} написал для вас сочинение:
${r1}
${r2}
${r3}
${r4}
${r5}`
        })
    }
}