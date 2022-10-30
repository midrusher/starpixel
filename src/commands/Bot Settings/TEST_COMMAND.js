const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, WebhookClient, PermissionsBitField, PermissionFlagsBits, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const cron = require(`node-cron`)
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ
const wait = require(`node:timers/promises`).setTimeout
const { gameConstructor, calcActLevel, getLevel, isURL } = require(`../../functions`)
const linksInfo = require(`../../discord structure/links.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`test_command_no_usage`)
        .setDescription(`TEST_COMMAND_NO_USAGE`)
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),

    async execute(interaction, client) {
        const test = await cron.getTasks().get(`GamePreStart`)
        test.start()
    }
};