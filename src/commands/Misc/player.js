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
        .setName(`mcplayer`)
        .setDescription(`Основные ссылки и информация о гильдии.`)
        .addUserOption(option => option
            .setName(`пользователь`)
            .setDescription(`Тайная команда`)
        ),

    async execute(interaction, client) {
        const members = await interaction.guild.members.fetch()
        await members.filter(m => !m.user.bot && m.roles.cache.has(`504887113649750016`)).forEach(member => member.roles.remove(`992820494900412456`))        
    }
};