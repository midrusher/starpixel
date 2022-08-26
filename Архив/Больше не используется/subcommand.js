const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../src/events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`subcom`)
        .setDescription(`Основные ссылки и информация о гильдии.`)
        .addSubcommand(subcommand => subcommand
            .setName(`first`)
            .addNumberOption(option => option
                .setName(`somethingcool`)
                .setDescription(`123`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`second`)
            .addBooleanOption(option => option
                .setName(`возраст`)
                .setDescription(`234`)
                .setRequired(true)
            )
        ),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand()
        console.log(subcommand)

        switch (subcommand.name) {
            case first: {
                interaction.reply({
                    content: `${subcommand.options.getNumber(`somethingcool`)}`
                })
            }

                break;
            case second: {
                interaction.reply({
                    content: `${subcommand.options.getBoolean(`возраст`)}`
                })
            }

                break;
            default:
                break;
        }
    }
};