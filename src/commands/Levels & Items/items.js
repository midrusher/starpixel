const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`)


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`items`)
        .setDescription(`Показать предметы пользователя.`)
        .addUserOption(option => option
            .setName(`пользователь`)
            .setRequired(false)
            .setDescription(`Введите любого пользователя.`)
        ),
    async execute(interaction, client) {
        const user = interaction.options.getUser(`пользователь`) || interaction.member.user;
        const userData = await User.findOne({ userid: user.id }) || new User({ userid: user.id, name: user.username })
        const embed = new EmbedBuilder()
            .setColor(0xA872FF)
            .setAuthor({
                name: `Предметы пользователя ${user.username}`
            })
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setDescription(
                `**ОСНОВНОЕ**
\`Румбики\` - ${userData.rumbik}<:Rumbik:883638847056003072>
\`Опыт рангов\` - ${userData.rank}💠
\`Билеты\` - ${userData.tickets}🏷
\`Опыт гильдии\` - ${userData.gexp} GEXP
\`Медаль 🥇\` - ${userData.medal_1} шт.
\`Медаль 🥈\` - ${userData.medal_2} шт.
\`Медаль 🥉\` - ${userData.medal_3} шт.

**ПЕРКИ**
\`🔺 Повышение опыта рангов\` - ${userData.perks.rank_boost}/6
\`🔻 Скидка в королевском магазине\` - ${userData.perks.king_discount}/4
\`🔻 Скидка в магазине активности\` - ${userData.perks.act_discount}/3
\`🔻 Скидка в обычном магазине гильдии\` - ${userData.perks.shop_discount}/4
\`🕒 Увеличение времени действия временных предметов\` - ${userData.perks.temp_items}/1
\`💰 Возможность продавать предметы из профиля\` - ${userData.perks.sell_items}/1
\`🏷️ Уменьшение опыта гильдии для получения билета\` - ${userData.perks.ticket_discount}/5
\`✨ Изменение предметов\` - ${userData.perks.change_items}/1`)
            .addFields(
                {
                    name: `НАВЫКИ ПИТОМЦЕВ`,
                    value: `\u200b`,
                    inline: false
                },
                {
                    name: `Земля`,
                    value:
`\`Выращивание горных пород\` - ${userData.elements.mountains}/1
\`Быстрый рост растений\` - ${userData.elements.fast_grow}/1
\`Перемещение под землёй\` - ${userData.elements.underground}/1`,
                    inline: false
                },
                {
                    name: `Вода`,
                    value:
`\`Плавание на глубине\` - ${userData.elements.diving}/1
\`Сопротивление течениям\` - ${userData.elements.resistance}/1
\`Подводное дыхание\` - ${userData.elements.respiration}/1`,
                    inline: false
                },
                {
                    name: `Огонь`,
                    value:
`\`Защита от огня\` - ${userData.elements.fire_resistance}/1
\`Удар молнии\` - ${userData.elements.lightning}/1
\`Управление пламенем\` - ${userData.elements.flame}/1`,
                    inline: false
                },
                {
                    name: `Воздух`,
                    value:
`\`Полёт в небесах\` - ${userData.elements.flying}/1
\`Повеление ветром\` - ${userData.elements.wind}/1
\`Орлиный глаз\` - ${userData.elements.eagle_eye}/1`,
                    inline: false
                },
            )

        await interaction.reply({
            embeds: [embed]
        })
    }
};