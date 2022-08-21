const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`info`)
        .setDescription(`Основные ссылки и информация о гильдии.`),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });
        const cmd_name = `ping`
        const msg = `API Latency: ${client.ws.ping}
Client Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;
console.log(`${interaction.member.displayName} использовал команду "/${cmd_name}"`)
        await interaction.editReply({
            content: msg,
        })
    }
};