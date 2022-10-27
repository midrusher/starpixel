const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)

module.exports = (client) => {
    client.AdvCalendarClear = async () => {
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.seasonal === false) return
        if (pluginData.seasonal.new_year.enabled === false) return
        const guild = await client.guilds.fetch(`320193302844669959`)
        const channel = await guild.channels.fetch(ch_list.test)
        const msg1 = await channel.messages.fetch(`1034896637484613653`)
        const msg2 = await channel.messages.fetch(`1034896638734520440`)
        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_1`)
                    .setStyle(ButtonStyle.Primary)
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


        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_5`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`5-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_6`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`6-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_7`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`7-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_8`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`8-е декабря`)
            )

        const row3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_9`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`9-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_10`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`10-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_11`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`11-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_12`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`12-е декабря`)
            )

        const row4 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_13`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`13-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_14`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`14-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_15`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`15-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_16`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`16-е декабря`)
            )

        const row5 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_17`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`17-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_18`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`18-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_19`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`19-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_20`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`20-е декабря`)
            )

        const row6 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_21`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`21-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_22`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`22-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_23`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`23-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_24`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`24-е декабря`)
            )


        const row7 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_25`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`25-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_26`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`26-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_27`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`27-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_28`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`28-е декабря`)
            )

        const row8 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_29`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`29-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_30`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`30-е декабря`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`december_31`)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`💥`)
                    .setLabel(`31-е декабря`)
            )

        await msg1.edit({
            components: [row1, row2, row3, row4, row5]
        })
        await msg2.edit({
            components: [row6, row7, row8]
        })
    }
}