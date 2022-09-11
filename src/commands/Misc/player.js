const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, WebhookClient } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const { loadImage, createCanvas } = require(`@napi-rs/canvas`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`test`)
        .setDescription(`test`),

    async execute(interaction, client) {
        const guild = interaction.guild;
        const log_data = await Guild.findOne({ id: guild.id })
        const channel = await guild.channels.cache.get(`982551755340537866`)
        const webhook = new WebhookClient({ id: log_data.logs.webhook_id, token: log_data.logs.webhook_token})
        
    }
};