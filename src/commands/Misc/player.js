const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
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
        const file = new AttachmentBuilder(`./src/assets/Updates & Channel names/Members.png`, {name: `members.png`})
        await interaction.channel.send({
            files: [file]
        })
        await interaction.channel.send({
            content: `В данном канале содержится основная информация о каждом участнике гильдии. Тут вы можете найти ник участника и его возраст. Все данные обновляются автоматически!`
        })
        await interaction.channel.send({
            content: `◾`
        })
        await interaction.channel.send(`1`)
        await interaction.channel.send(`2`)
        await interaction.channel.send(`3`)
    }
};