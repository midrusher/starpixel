const { SlashCommandBuilder, Attachment, EmbedBuilder } = require('discord.js');
 
const { User } = require(`../../schemas/userdata`);


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`rank`)
        .setDescription(`Показать опыт активности.`)
        .addUserOption(option => option
            .setName(`пользователь`)
            .setRequired(false)
            .setDescription(`Введите любого пользователя.`)
        ),
    async execute(interaction, client) {
        const user = interaction.options.getUser(`пользователь`) || interaction.member.user;
        const userData = await User.findOne({ userid: user.id })
        const neededXP = 5 * (Math.pow(userData.level, 2)) + (50 * userData.level) + 100;


        if (userData.totalexp == 0) return interaction.reply({
            content: `У ${user} нет опыта активности.`,
            ephemeral: true
        });

        const embed = new EmbedBuilder()
            .setColor(process.env.bot_color)
            .setAuthor({
                name: `Опыт пользователя ${user.username}`
            })
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setDescription(
`**УРОВЕНЬ** - ${userData.level}
**Опыт** - ${userData.exp}/${neededXP}🌀
**Всего опыта** - ${userData.totalexp}`)

        return interaction.reply({
            embeds: [embed]
        })
    }
};