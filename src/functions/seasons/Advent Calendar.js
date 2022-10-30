const { Birthday } = require(`../../schemas/birthday`)
const { Temp } = require(`../../schemas/temp_items`)
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const ch_list = require(`../../discord structure/channels.json`)
const chalk = require(`chalk`)
const cron = require(`node-cron`)
const wait = require(`node:timers/promises`).setTimeout
const linksInfo = require(`../../discord structure/links.json`)
const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = (client) => {
    client.AdventCalendar = async () => {

        cron.schedule(`0 0 */1 12 *`, async () => {
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.seasonal === false) return
            const guild = await client.guilds.fetch(`320193302844669959`)
            const guildData = await Guild.findOne({ id: guild.id })
            const date = new Date()
            const d = date.getDate()
            const channel = await guild.channels.fetch(ch_list.test)
            const msg1 = await channel.messages.fetch(`1034896637484613653`)
            const msg2 = await channel.messages.fetch(`1034896638734520440`)
            if (d == 1) {
                const row1 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_1`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🎁`)
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
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 2) {
                const row1 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_1`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`1-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_2`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🎁`)
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
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 3) {
                const row1 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_1`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`1-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_2`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`2-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_3`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🌀`)
                            .setLabel(`3-е декабря`)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_4`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`💥`)
                            .setLabel(`4-е декабря`)
                    )
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 4) {
                const row1 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_1`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`1-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_2`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`2-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_3`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`3-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_4`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`💠`)
                            .setLabel(`4-е декабря`)
                    )
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 5) {
                const row1 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_1`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`1-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_2`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`2-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_3`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`3-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_4`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`4-е декабря`)
                            .setDisabled(true)
                    )
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_5`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🏷`)
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
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 6) {
                const row1 = msg1.components[0]
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_5`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🏷`)
                            .setLabel(`5-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_6`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🎁`)
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
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 7) {
                const row1 = msg1.components[0]
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_5`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🏷`)
                            .setLabel(`5-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_6`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`6-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_7`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🎁`)
                            .setLabel(`7-е декабря`)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_8`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`💥`)
                            .setLabel(`8-е декабря`)
                    )
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 8) {
                const row1 = msg1.components[0]
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_5`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🏷`)
                            .setLabel(`5-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_6`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`6-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_7`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`7-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_8`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🌀`)
                            .setLabel(`8-е декабря`)
                    )
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 9) {
                const row1 = msg1.components[0]
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_5`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🏷`)
                            .setLabel(`5-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_6`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`6-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_7`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`7-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_8`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`8-е декабря`)
                            .setDisabled(true)
                    )
                const row3 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_9`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`💠`)
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
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 10) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_9`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`9-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_10`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
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
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 11) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_9`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`9-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_10`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`10-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_11`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🎁`)
                            .setLabel(`11-е декабря`)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_12`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`💥`)
                            .setLabel(`12-е декабря`)
                    )
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 12) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_9`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`9-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_10`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`10-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_11`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`11-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_12`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🌀`)
                            .setLabel(`12-е декабря`)
                    )
                const row4 = msg1.components[3]
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 13) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_9`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`9-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_10`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`10-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_11`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`11-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_12`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`12-е декабря`)
                            .setDisabled(true)
                    )
                const row4 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_13`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`💠`)
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
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 14) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_13`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`13-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_14`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🎁`)
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
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 15) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_13`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`13-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_14`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`14-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_15`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`💠`)
                            .setLabel(`15-е декабря`)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_16`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`💥`)
                            .setLabel(`16-е декабря`)
                    )
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 16) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_13`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`13-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_14`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`14-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_15`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`15-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_16`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`16-е декабря`)
                    )
                const row5 = msg1.components[4]
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 17) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_13`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`13-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_14`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`14-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_15`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`15-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_16`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`16-е декабря`)
                            .setDisabled(true)
                    )
                const row5 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_17`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🌀`)
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
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 18) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_17`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`17-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_18`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`💠`)
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
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 19) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_17`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`17-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_18`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`18-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_19`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🌀`)
                            .setLabel(`19-е декабря`)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_20`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`💥`)
                            .setLabel(`20-е декабря`)
                    )
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 20) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_17`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`17-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_18`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`18-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_19`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`19-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_20`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🎁`)
                            .setLabel(`20-е декабря`)
                    )
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
            } else if (d == 21) {
                const row1 = msg1.components[0]
                const row2 = msg1.components[1]
                const row3 = msg1.components[2]
                const row4 = msg1.components[3]
                const row5 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_17`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`17-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_18`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`18-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_19`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`19-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_20`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`20-е декабря`)
                            .setDisabled(true)
                    )
                await msg1.edit({
                    components: [row1, row2, row3, row4, row5]
                })
                const row6 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_21`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🌀`)
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
                const row7 = msg2.components[1]
                const row8 = msg2.components[2]
                await msg2.edit({
                    components: [row6, row7, row8]
                })
            } else if (d == 22) {
                const row6 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_21`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`21-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_22`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🎁`)
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
                const row7 = msg2.components[1]
                const row8 = msg2.components[2]
                await msg2.edit({
                    components: [row6, row7, row8]
                })
            } else if (d == 23) {
                const row6 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_21`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`21-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_22`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`22-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_23`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`💠`)
                            .setLabel(`23-е декабря`)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_24`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`💥`)
                            .setLabel(`24-е декабря`)
                    )
                const row7 = msg2.components[1]
                const row8 = msg2.components[2]
                await msg2.edit({
                    components: [row6, row7, row8]
                })
            } else if (d == 24) {
                const row6 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_21`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`21-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_22`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`22-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_23`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`23-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_24`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🎁`)
                            .setLabel(`24-е декабря`)
                    )
                const row7 = msg2.components[1]
                const row8 = msg2.components[2]
                await msg2.edit({
                    components: [row6, row7, row8]
                })
            } else if (d == 25) {
                const row6 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_21`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`21-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_22`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`22-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_23`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`💠`)
                            .setLabel(`23-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_24`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`24-е декабря`)
                            .setDisabled(true)
                    )
                const row7 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_25`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
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
                const row8 = msg2.components[2]
                await msg2.edit({
                    components: [row6, row7, row8]
                })
            } else if (d == 26) {
                const row6 = msg2.components[0]
                const row7 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_25`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`25-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_26`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🏷`)
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
                const row8 = msg2.components[2]
                await msg2.edit({
                    components: [row6, row7, row8]
                })
            } else if (d == 27) {
                const row6 = msg2.components[0]
                const row7 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_25`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`25-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_26`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🏷`)
                            .setLabel(`26-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_27`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🎁`)
                            .setLabel(`27-е декабря`)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_28`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`💥`)
                            .setLabel(`28-е декабря`)
                    )
                const row8 = msg2.components[2]
                await msg2.edit({
                    components: [row6, row7, row8]
                })
            } else if (d == 28) {
                const row6 = msg2.components[0]
                const row7 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_25`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`25-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_26`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🏷`)
                            .setLabel(`26-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_27`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`27-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_28`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`28-е декабря`)
                    )
                const row8 = msg2.components[2]
                await msg2.edit({
                    components: [row6, row7, row8]
                })
            } else if (d == 29) {
                const row6 = msg2.components[0]
                const row7 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_25`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`25-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_26`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🏷`)
                            .setLabel(`26-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_27`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🎁`)
                            .setLabel(`27-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_28`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`28-е декабря`)
                            .setDisabled(true)
                    )
                const row8 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_29`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`🌀`)
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
                await msg2.edit({
                    components: [row6, row7, row8]
                })
            } else if (d == 30) {
                const row6 = msg2.components[0]
                const row7 = msg2.components[1]
                const row8 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_29`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🌀`)
                            .setLabel(`29-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_30`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`30-е декабря`)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_31`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`💥`)
                            .setLabel(`31-е декабря`)
                    )
                await msg2.edit({
                    components: [row6, row7, row8]
                })
            } else if (d == 31) {
                const row6 = msg2.components[0]
                const row7 = msg2.components[1]
                const row8 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_29`)
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(true)
                            .setEmoji(`🌀`)
                            .setLabel(`29-е декабря`)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_30`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`<:Rumbik:883638847056003072>`)
                            .setLabel(`30-е декабря`)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`december_31`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`👑`)
                            .setLabel(`31-е декабря`)
                    )
                await msg2.edit({
                    components: [row6, row7, row8]
                })
            }
        }, {
            scheduled: true,
            timezone: `Europe/Moscow`
        });
        cron.schedule(`0 0 1 1 *`, async () => {
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.seasonal === false) return
            const guild = await client.guilds.fetch(`320193302844669959`)
            const guildData = await Guild.findOne({ id: guild.id })
            const date = new Date()
            const ddd = date.getDate()
            const channel = await guild.channels.fetch(ch_list.test)
            const msg2 = await channel.messages.fetch(`1034896638734520440`)
            const row6 = msg2.components[0]
            const row7 = msg2.components[1]
            const row8 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`december_29`)
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true)
                        .setEmoji(`🌀`)
                        .setLabel(`29-е декабря`)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`december_30`)
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji(`<:Rumbik:883638847056003072>`)
                        .setLabel(`30-е декабря`)
                        .setDisabled(true)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`december_31`)
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji(`👑`)
                        .setLabel(`31-е декабря`)
                        .setDisabled(true)
                )
            await msg2.edit({
                components: [row6, row7, row8]
            })
        }, {
            scheduled: true,
            timezone: `Europe/Moscow`
        })
    }
}
