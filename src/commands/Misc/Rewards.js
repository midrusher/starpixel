const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)
const wait = require(`node:timers/promises`).setTimeout
const linksInfo = require(`../../discord structure/links.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`rewards`)
        .setDescription(`Неполученные награды`)
        .setDMPermission(false)
        .addSubcommand(subcommand => subcommand
            .setName(`claim`)
            .setDescription(`Забрать неполученные награды`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`unclaimed`)
            .setDescription(`Список неполученных наград`)
        ),

    async execute(interaction, client) {
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.pets === false) return interaction.reply({ content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true })
        const { user, member, guild } = interaction
        const userData = await User.findOne({ userid: user.id })

        switch (interaction.options.getSubcommand()) {
            case `claim`: {
                if (userData.stacked_items.length <= 0) return interaction.reply({
                    content: `У вас нет неполученных наград!`,
                    ephemeral: true
                })
                let claimed = []
                await interaction.deferReply({ fetchReply: true, ephemeral: true })
const items = userData.stacked_items.slice(0)
                for (const item of items) {
                    if (!member.roles.cache.has(item)) {
                        await claimed.push(item)
                        await member.roles.add(item)
                        let b = await userData.stacked_items.findIndex(it => it == item)
                        userData.stacked_items.splice(b, 1)
                        await interaction.editReply({ content: `Вы получили <@&${item}>... Идёт проверка других наград!`, fetchReply: true })
                        await wait(500)
                    }
                }
                userData.save()
                let i = 1
                if (claimed.length <= 0) return interaction.editReply({
                    content: `Вы не получили ни одной награды! Пожалуйста, откройте коробки, а затем пропишите эту команду ещё раз!`
                })
                const map = claimed.map(reward => {
                    return `**${i++}.** Получена награда <@&${reward}>!`
                })
                const embed = new EmbedBuilder()
                    .setTitle(`Получены награды`)
                    .setDescription(`**Список наград:**
${map.join('\n')}

Осталось неполученных наград: ${userData.stacked_items.length}!`)
                    .setColor(linksInfo.bot_color)
                    .setThumbnail(user.displayAvatarURL())
                    .setTimestamp(Date.now())

                await interaction.editReply({
                    content: ``,
                    embeds: [embed]
                })
            }

                break;
            case `unclaimed`: {
                if (userData.stacked_items.length <= 0) return interaction.reply({
                    content: `У вас нет неполученных наград!`,
                    ephemeral: true
                })
                let i = 1
                const map = userData.stacked_items.map(reward => {
                    return `**${i++}.** Награда: <@&${reward}>!`
                })
                userData.save()
                const embed = new EmbedBuilder()
                    .setTitle(`Неполученные награды`)
                    .setDescription(`Неполученных наград: ${userData.stacked_items.length}!

**Список наград:**
${map.join('\n')}`)
                    .setColor(linksInfo.bot_color)
                    .setThumbnail(user.displayAvatarURL())
                    .setTimestamp(Date.now())

                await interaction.reply({
                    embeds: [embed]
                })
            }
                break;

            default:
                break;
        }

    }
};