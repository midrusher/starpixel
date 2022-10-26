const { ButtonBuilder, ChannelType, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { Tickets } = require(`../../../schemas/tickets`)
const { TicketsUser } = require(`../../../schemas/ticketUser`)
const { Guild } = require(`../../../schemas/guilddata`)
const { User } = require(`../../../schemas/userdata`)

module.exports = {
    data: {
        name: `december_1`
    },
    async execute(interaction, client) {
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.seasonal === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})


        const msg = await interaction.channel.messages.fetch(`1034882153558847570`)
        const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`december_1`)
            .setStyle(ButtonStyle.Success)
            .setEmoji(`💥`)
            .setLabel(`1-е декабря`)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`december_2`)
            .setStyle(ButtonStyle.Primary)
            .setEmoji(`💥`)
            .setLabel(`2-е декабря`)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`december_3`)
            .setStyle(ButtonStyle.Primary)
            .setEmoji(`💥`)
            .setLabel(`3-е декабря`)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`december_4`)
            .setStyle(ButtonStyle.Primary)
            .setEmoji(`💥`)
            .setLabel(`4-е декабря`)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`december_5`)
            .setStyle(ButtonStyle.Primary)
            .setEmoji(`💥`)
            .setLabel(`5-е декабря`)
        )
        const row2 = interaction.message.components[1]
        const row3 = interaction.message.components[2]
        const row4 = interaction.message.components[3]
        const row5 = interaction.message.components[4]
        await msg.edit({
            components: [row1, row2, row3, row4, row5]
        })
        console.log(interaction.message.components[0].components[0].data)
        
    }
}
