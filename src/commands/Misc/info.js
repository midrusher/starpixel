const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`info`)
        .setDescription(`Основные ссылки и информация о гильдии.`),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });
        const cmd_name = `ping`
        const msg = `Основная информация о боте:
Профиль бота - <@${process.env.bot_id}>
Разработчик(и) бота - \`<@${process.env.bot_dev.displayName}\`>
Описание бота - \`${process.env.bot_descr}\`
Текущая версия бота - \`v${process.env.bot_v}\`
Если вы нашли какой-либо баг, опишите его и упомяните разработчика в канале <#849516805529927700>

Ссылки на официальные социальные сети гильдии:
Discord: \`${process.env.guild_discord}\`
VK: \`${process.env.guild_vk}\`
YouTube: \`${process.env.guild_youtube}\`
TikTok: \`${process.env.guild_tiktok}\`
Telegram: \`${process.env.guild_telegram}\`

Официальная электронная почта гильдии: \`${process.env.guild_email}\``;
console.log(`${interaction.member.displayName} использовал команду "/${cmd_name}"`)
        await interaction.editReply({
            content: msg,
        })
    }
};