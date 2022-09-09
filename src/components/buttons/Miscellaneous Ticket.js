const { ButtonBuilder, ChannelType, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { Tickets } = require(`../../schemas/tickets`)
const { TicketsUser } = require(`../../schemas/ticketUser`)

module.exports = {
    data: {
        name: `misc_ticket`
    },
    async execute(interaction, client) {
        const guild = interaction.guild
        const user = interaction.user
        const tickets = await Tickets.findOne({ guildid: guild.id }) || new Tickets({ guildid: guild.id, support: `320880176416161802` })
        const anyTickets = await TicketsUser.findOne({ userid: user.id, guildid: guild.id })
        if (anyTickets) return interaction.reply({
            content: `Вы не можете создать более одного обращения! Проверьте канал <#${anyTickets.channelid}>`,
            ephemeral: true
        })
        tickets.id += 1
        const support = await guild.channels.create({
            name: `обращение-№${tickets.id}`,
            type: ChannelType.GuildText,
            parent: interaction.channel.parentId,
            topic: `Обращение пользователя ${user} зарегистрированное под номером №${tickets.id}. 
**Тема обращения**: Прочий вопрос.`,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: user.id,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.ReadMessageHistory

                    ]
                },
                {
                    id: tickets.support,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ]
                }
            ],

        })
        const ticketuser = new TicketsUser({ userid: user.id, guildid: guild.id, channelid: support.id, categoryid: support.parentId, opened: true });

        const delete_button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`delete_ticket`)
                    .setEmoji(`🔒`)
                    .setLabel(`Закрыть обращение`)
                    .setStyle(ButtonStyle.Danger)
            )

        const delete_embed = new EmbedBuilder()
            .setTitle(`Вы открыли обращение к администрации!`)
            .setColor(process.env.bot_color)
            .setDescription(`Вы открыли обращение по теме "Прочий вопрос". Пожалуйста, задайте свой вопрос ниже.
        
Если вы хотите закрыть данное обращение, вы можете нажать на кнопочку ниже. Неактивные обращения удаляются модератором спустя 2 дня.`)
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp(Date.now())
        await interaction.reply({
            content: `Вы открыли <#${support.id}>! Пожалуйста, перейдите в данный канал, чтобы задать свой вопрос!`,
            ephemeral: true
        })
        await support.send({
            embeds: [delete_embed],
            components: [delete_button]
        })
        tickets.save()
        ticketuser.save()
    }
}
