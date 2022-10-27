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
        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`sochi`)
            .setLabel(`Написать сочинение`)
            .setEmoji(`✏`)
            .setStyle(ButtonStyle.Success)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`text`)
            .setLabel(`Получить текст`)
            .setEmoji(`📃`)
            .setStyle(ButtonStyle.Primary)
        )

        await interaction.channel.send({
            content: `**Задание** Напишите сочинение по прочитанному тексту.
Сформулируйте одну из проблем, поставленных автором текста.
Прокомментируйте сформулированную проблему. Включите в комментарий два примера-иллюстрации из прочитанного текста, которые важны для понимания проблемы исходного текста (избегайте чрезмерного цитирования). Дайте пояснение к каждому примеру-иллюстрации. Проанализируйте смысловую связь между примерами-иллюстрациями.
Сформулируйте позицию автора (рассказчика). Сформулируйте и обоснуйте своё отношение к позиции автора (рассказчика) по проблеме исходного текста.
Объём сочинения — не менее 150 слов.
Работа, написанная без опоры на прочитанный текст (не по данному тексту), не оценивается. Если сочинение представляет собой пересказанный или полностью переписанный исходный текст без каких бы то ни было комментариев, то такая работа оценивается 0 баллов.`,
            components: [buttons]
        })
    }
};