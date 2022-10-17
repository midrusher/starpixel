const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`buy`)
        .setDescription(`Купить предмет в магазине гильдии`)
        .addStringOption(option => option
            .setName(`код`)
            .setDescription(`Код предмета, который вы хотите купить`)
            .setRequired(true)
            .setAutocomplete(true)
        ),

    async autoComplete(interaction, client) {
        const focusedValue = interaction.options.getFocused();
        const choices = [
            'NO_ITEMS',
        ];
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase()));;
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },


    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.items === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        await interaction.reply({
            content: `Данная команда ещё в разработке! NO_ITEMS`,
            ephemeral: true
        })
    }
};