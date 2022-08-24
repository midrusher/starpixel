const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`test`)
        .setDescription(`test`),
        
    async execute(interaction, client) {

        const menu = new SelectMenuBuilder()
        .setCustomId(`test`)
        .setMaxValues(1)
        .setPlaceholder(`Test selector`)
        .setOptions([{
                label: `Option 1`,
                value: `test 1`
            }, 
            {
                label: `Option 2`,
                value: `test 2`
            }, 
            {
                label: `Option 3`,
                value: `test 3`
            }, 
            {
                label: `Option 4`,
                value: `test 4`
            },
        ]);

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)]
        })
    }
};