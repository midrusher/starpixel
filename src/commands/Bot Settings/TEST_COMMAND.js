const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, WebhookClient, PermissionsBitField, PermissionFlagsBits } = require('discord.js');
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
        .setDMPermission(false),

    async execute(interaction, client) {
        const guildData = await Guild.findOne({ id: interaction.guild.id })
        const musicChannel = await interaction.guild.channels.fetch(ch_list.your_music)
        const pinnedMessages = await musicChannel.messages.fetchPinned()
        await pinnedMessages.forEach(msg => {
            const content = msg.content.split(` `)
            content.forEach(cont => {
                if (isURL(cont) === true) {
                    const res = guildData.guildgames.music.find(mus => mus.link == cont)
                    if (!res) {
                        guildData.guildgames.music.push({
                            link: cont,
                            sent: msg.author.id
                        })
                    }
                }
            })
        })
        guildData.save()

    }
};