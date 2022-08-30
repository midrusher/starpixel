const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`mcplayer`)
        .setDescription(`Основные ссылки и информация о гильдии.`)
        .addStringOption( option => option
            .setName(`тайная`)
            .setDescription(`Тайная команда`)
        ),
        
    async execute(interaction, client) {
        
        
    }
};