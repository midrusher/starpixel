const { ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ModalSubmitInteraction, InteractionType, EmbedBuilder, PermissionFlagsBits, ComponentType } = require('discord.js');
const { execute } = require('../../events/client/ready');
const { User } = require(`../../schemas/userdata`)

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName(`Предупреждение`)
        .setType(ApplicationCommandType.User),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `❗ Вы не можете использовать это!`
                        })
                        .setDescription(`Недостаточно прав для использования данной команды`)
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())
        const user = interaction.member
        if (!user.roles.cache.has(`320880176416161802`) || !user.roles.cache.has(`563793535250464809`)) return interaction.reply({
            embeds: [embed],
            ephemeral: true
        })

        const member = interaction.targetUser
        const memberData = await User.findOne({ id: member.id }) || new User({ id: member.id, name: member.username})
        
        const modal = new ModalBuilder()
        .setCustomId(`reason`)
        .setTitle(`Введите причину`)

        const reason = new TextInputBuilder()
        .setCustomId(`warnreason`)
        .setLabel(`Причина`)
        .setPlaceholder(`Введите причину предупреждения данного пользователя`)
        .setRequired(true)

        modal.addComponents(new ActionRowBuilder().addComponents(reason))

        await interaction.showModal(modal)

        const { ComponentType } = require('discord.js');

        const filter = i => (i.customId == `reason` || i.customId == `warnreason`);
        
        message.awaitModalSubmit({ filter, componentType: ComponentType.TextInput })
            .then(i => {
                const warning = new EmbedBuilder()
                .setTitle(`Выдано предупреждение`)
                .setColor(process.env.bot_color)
                .setThumbnail(member.displayAvatarURL())
                .setTimestamp(Date.now())
                .setDescription(`Вам выдано предупреждение! Причина: ${i.fields.getTextInputValue("warnreason")}! Пожалуйста, ознакомьтесь с <#774546154209148928>!`)

                i.reply({
                    content: `${member}`,
                    embeds: [warning]
                })
            })
            .catch(err => console.log(`Произошла ошибка`));
    }
}