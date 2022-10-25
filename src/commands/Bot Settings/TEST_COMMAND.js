const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, WebhookClient, PermissionsBitField, PermissionFlagsBits, ChannelType } = require('discord.js');
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
const wait = require(`node:timers/promises`).setTimeout
const { gameConstructor, calcActLevel, getLevel, isURL } = require(`../../functions`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`test_command_no_usage`)
        .setDescription(`TEST_COMMAND_NO_USAGE`)
        .setDefaultMemberPermissions(0)
        .setDMPermission(false),

    async execute(interaction, client) {
       /*  await interaction.deferReply({ fetchReply: true })
        const channels = await interaction.guild.channels.fetch()
        await channels.forEach(async (channel) => {
            if (channel.type == ChannelType.GuildForum || channel.type == ChannelType.GuildText) {
                const threads = await channel.threads.fetch()
                console.log(threads)
                if (channel.threads.cache.size > 1) {
                    await threads.forEach(async (thread) => {
                        await thread.join()
                        console.log(`Я присоединился к ${thread.name}`)
                    })
                } else if (channel.threads.cache.size == 1) await threads.join()

            }
        })
        await interaction.editReply(`Готово!`) */
    }
};