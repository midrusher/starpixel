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
        .setDescription(`Основные ссылки и информация о гильдии.`),
    async execute(interaction, client) {
        
        let role = `1`

        role = `234`

        const smth = `1`

        console.log(`role = ${role}, smth = ${smth}`)
    }
};