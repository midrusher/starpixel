const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { ClientSettings } = require(`../../schemas/client`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`info`)
        .setDescription(`Основные ссылки и информация о гильдии`)
        .setDMPermission(true),
    async execute(interaction, client) {
        const clientData = await ClientSettings.findOne({ clientid: client.user.id })
        const msg = new EmbedBuilder()
        .setColor(process.env.bot_color)
        .setTitle(`Основная информация о боте Starpixel`)
        .setDescription(`Основная информация о боте:
Профиль бота - <@${process.env.bot_id}>
Разработчик бота - <@${process.env.bot_dev}>
Описание бота - \`${process.env.bot_descr}\`
Текущая версия бота - \`${clientData.version}\`
Если вы нашли какой-либо баг, опишите его и упомяните разработчика в канале <#849516805529927700>

Социальные сети гильдии:
[Discord](${process.env.guild_discord})
[VK](${process.env.guild_vk})
[YouTube](${process.env.guild_youtube})
[TikTok](${process.env.guild_tiktok})
[Telegram](${process.env.guild_telegram})

Официальная электронная почта гильдии: \`${process.env.guild_email}\``);
        await interaction.reply({
           embeds: [msg],
        })
    }
};