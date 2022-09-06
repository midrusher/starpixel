const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`test`)
        .setDescription(`test`),

    async execute(interaction, client) {
        const channel = await interaction.guild.channels.cache.get(`876436260347076608`)
        const message = await channel.messages.fetch(`1016426386027728916`)
        await message.edit({
            content: `nothing t do`,
            embeds: []
        })
    }
};