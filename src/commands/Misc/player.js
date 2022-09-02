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
        const user = interaction.options.getUser(`пользователь`)
        const guild = interaction.guild
        const guildData = await Guild.findOne({ id: guild.id })
        const userData = await User.findOne({ id: user.id })
        const member = await guild.members.fetch(user.id)
        member.setNickname(`「${guildData.ranks.r6}」Вася вася ┇ `)

    }
};