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
        const msg = await interaction.channel.send({
            content: `╔════════════╗◊╔════════════╗
**СОВМЕСТНАЯ ИГРА**
Игроки выбирают следующую игру:
🔶 **1**
:game_die: Максимум **1** за совместную игру

🔷 **2**
:game_die: Максимум **2** за совместную игру
╚════════════╝◊╚════════════╝
Проголосуйте реакциями, у вас есть 15 секунд!`
        })
        const filter = (reaction, user) => reaction.emoji.name === '🔶' || reaction.emoji.name === '🔷';

        const collector = msg.createReactionCollector({ filter, time: 15000 });
        await msg.react(`🔶`)
        await msg.react(`🔷`)
        collector.on('end', async (collected) => {
            const sort = await collected.sort((a, b) => b.count - a.count)
            console.log(sort.first())
            if (sort.first().emoji.name == `🔶`) {
                
                console.log(1)
                await msg.reply({
                    content: `╔════════════╗◊╔════════════╗
**СОВМЕСТНАЯ ИГРА**
Игроки выбрали следующую игру...
:video_game: **1**
:game_die: Максимум **1** раз за совместную игру
╚════════════╝◊╚════════════╝`
                })
            } else if (sort.first().emoji.name == `🔷`) {
                
                console.log(2)
                await msg.reply({
                    content: `╔════════════╗◊╔════════════╗
**СОВМЕСТНАЯ ИГРА**
Игроки выбрали следующую игру...
:video_game: **2**
:game_die: Максимум **2** раз за совместную игру
╚════════════╝◊╚════════════╝`
                })
            }
        })

    }
};