const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Какое то описание`),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,

        });
        const msg = `API Latency: ${client.ws.ping}
        Client Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;
        await interaction.editReply({
            content: msg 
        })
    }
};