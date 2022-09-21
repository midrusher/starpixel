const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, WebhookClient } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const { loadImage, createCanvas } = require(`@napi-rs/canvas`)
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ
const { gameConstructor, calcActLevel } = require(`../../functions`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`test_command_no_usage`)
        .setDescription(`TEST_COMMAND_NO_USAGE`),

    async execute(interaction, client) {
        const userData = await User.find({ guildid: interaction.guild.id })
        const map = userData.map(async (user) => {
            let summa = calcActLevel(0, user.level, user.exp)
            const member = await interaction.guild.members.fetch(user.userid)
            return `234`
        })
        const prom = await Promise.all(map)
        await interaction.reply(`${prom.join(`\n`)}`)
    }
};