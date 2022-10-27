const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, InteractionType, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const apply = require('../../../commands/Misc/apply');
const { Apply } = require(`../../../schemas/applications`)
module.exports = {
    data: {
        name: "sochi"
    },
    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId(`sochinenie`)
            .setTitle(`Сочинение для Дмитрия`)
            .addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId(`p1`)
                            .setLabel(`Сочинение`)
                            .setPlaceholder(`Напишите сочинение`)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Paragraph)
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId(`p2`)
                            .setLabel(`Сочинение`)
                            .setPlaceholder(`Напишите сочинение`)
                            .setStyle(TextInputStyle.Paragraph)
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId(`p3`)
                            .setLabel(`Сочинение`)
                            .setPlaceholder(`Напишите сочинение`)
                            .setStyle(TextInputStyle.Paragraph)
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId(`p4`)
                            .setLabel(`Сочинение`)
                            .setPlaceholder(`Напишите сочинение`)
                            .setStyle(TextInputStyle.Paragraph)
                    ),
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId(`p5`)
                            .setLabel(`Сочинение`)
                            .setPlaceholder(`Напишите сочинение`)
                            .setStyle(TextInputStyle.Paragraph)
                    ),
        )

        await interaction.showModal(modal)
    }
}