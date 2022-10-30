const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { ClientSettings } = require(`../../schemas/client`)
const linksInfo = require(`../../discord structure/links.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`info`)
        .setDescription(`Основные ссылки и информация о гильдии`)
        .setDMPermission(true),
    async execute(interaction, client) {
        const clientData = await ClientSettings.findOne({ clientid: client.user.id })
        const msg = new EmbedBuilder()
        .setColor(linksInfo.bot_color)
        .setTitle(`Основная информация о боте Starpixel`)
        .setDescription(`Основная информация о боте:
Профиль бота - <@${linksInfo.bot_id}>
Разработчик бота - <@${linksInfo.bot_dev}>
Описание бота - \`${linksInfo.bot_descr}\`
Текущая версия бота - \`${clientData.version}\`
Если вы нашли какой-либо баг, опишите его и упомяните разработчика в канале <#849516805529927700>

Социальные сети гильдии:
[Discord](${linksInfo.guild_discord})
[VK](${linksInfo.guild_vk})
[YouTube](${linksInfo.guild_youtube})
[TikTok](${linksInfo.guild_tiktok})
[Telegram](${linksInfo.guild_telegram})

Официальная электронная почта гильдии: \`${linksInfo.guild_email}\``);
        await interaction.reply({
           embeds: [msg],
        })
    }
};