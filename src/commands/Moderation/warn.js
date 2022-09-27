const { ContextMenuCommandBuilder, ApplicationCommandType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, ModalSubmitInteraction, InteractionType, EmbedBuilder, PermissionFlagsBits, ComponentType, SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`warn`)
        .setDescription(`Выдать предупреждение пользователю`)
        .addUserOption(option => option
            .setName(`пользователь`)
            .setDescription(`Пользователь, которому нужно выдать предупреждение`)
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName(`причина`)
            .setDescription(`Причина предупреждения`)
            .setRequired(true)
        )
    ,
    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.moderation === false) return interaction.reply({ content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true })
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
        const member = interaction.options.getMember(`пользователь`)
        if (member.roles.cache.has(`920346035811917825`)) return interaction.reply({
            content: `Данный участник не находится в гильдии!`,
            ephemeral: true
        })
        const memberData = await User.findOne({ userid: member.user.id })
        const reason = interaction.options.getString(`причина`)
        memberData.warns += 1
        memberData.save()
        const warning = new EmbedBuilder()
            .setTitle(`Выдано предупреждение`)
            .setColor(process.env.bot_color)
            .setThumbnail(member.displayAvatarURL())
            .setTimestamp(Date.now())
            .setDescription(`Вам выдано предупреждение! Причина: \`${reason}\`! Пожалуйста, ознакомьтесь с <#774546154209148928>!

Текущее количество предупреждений: ${memberData.warns}`)

        await interaction.reply({
            content: `${member}`,
            embeds: [warning]
        })

    }
}