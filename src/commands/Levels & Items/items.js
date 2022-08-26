const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
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
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id, name: user.username })
        const embed = new EmbedBuilder()
            .setColor(0xA872FF)
            .setAuthor({
                name: `Предметы пользователя ${user.username}`
            })
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setDescription(
`**Румбики** - ${userData.rumbik}<:Rumbik:883638847056003072>
**Опыт рангов** - ${userData.rank}💠

**ПЕРКИ**
`)

return interaction.reply({
    embeds: [ embed ]
})
    }
};