const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Birthday } = require(`../../schemas/birthday`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ
const ch_list = require(`../../discord structure/channels.json`)
const linksInfo = require(`../../discord structure/links.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`guild-leave`)
        .setDescription(`Покинуть гильдию Starpixel`)
        .setDMPermission(false),

    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.welcome === false) return interaction.reply({ content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true })
        const user = interaction.member
        if (!user.roles.cache.has(`504887113649750016`)) return interaction.reply({
            content: `Вы не являетесь участником гильдии Starpixel, какую гильдию вы собираетесь покидать? 😂`,
            ephemeral: true
        })
        if (interaction.channel.id !== `849516805529927700`) return interaction.reply({
            content: `Пожалуйста, перейдите в канал <#${ch_list.ask}>, чтобы использовать данную команду!`,
            ephemeral: true
        })
        const userData = await User.findOne({ userid: member.user.id, guildid: member.guild.id })
        const bd = await Birthday.findOne({ userid: member.user.id, guildid: member.guild.id })
        const guild_leave = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`g_leave`)
                    .setLabel(`Покинуть гильдию`)
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji(`👋`)
            )
            .addComponents(

                new ButtonBuilder()
                    .setCustomId(`g_stay`)
                    .setLabel(`Остаться в гильдии`)
                    .setStyle(ButtonStyle.Success)
                    .setEmoji(`😎`)
            )

        const g_leave_embed = new EmbedBuilder()
            .setColor(linksInfo.bot_color)
            .setThumbnail(user.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setTitle(`Подтвердите, что вы готовы покинуть гильдию Starpixel`)
            .setDescription(`Перед тем как принять решение об уходе чётко спросите себя - не пожалеете ли вы об этом, ведь по правилам гильдии тот, кто покинул гильдию - не может в неё вернуться больше никогда. Если вы потеряли интерес к игре, то не спешите так быстро уходить из гильдии, ведь интерес может всегда вернуться. Наш совет для вас: перед тем как принять решение об уходе, свяжитесь с офицерами гильдии в <#${ch_list.ask}> и расскажите о своей ситуации. Если это какая-то депрессия, большое количество учёбы или же что-то в этом роде - мы обязательно найдём с вами решение. Главное не бойтесь написать!
        
Если вы всё же готовы покинуть нас, то нажмите на кнопку "Покинуть гильдию". После того, как вы на неё нажмёте, вы потеряете весь процесс в гильдии. Вы всё ещё сможете находиться на сервере Discord, однако у вас будет ограниченный доступ. Нажимая на данную кнопку, вы подтверждаете, что вы осознанно делаете это действие, и понимаете, что назад дороги нет.

**Чтобы покинуть гильдию, нажмите на кнопку в течение 10 минут!**`)

        const reply = await interaction.reply({
            content: `${user} хочет покинуть гильдию!`,
            embeds: [g_leave_embed],
            components: [guild_leave],
            fetchReply: true
        })

        const filter = i => i.customId === 'g_leave' || `g_stay`;

        reply.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 600000, errors: ['time'] })
            .then(async (i) => {
                if (i.user.id === interaction.member.user.id) {
                    guild_leave.components[0].setDisabled(true)
                    guild_leave.components[1].setDisabled(true)
                    if (i.customId === `g_leave`) {
                        const DM = await interaction.guild.members.fetch(user.user.id)
                        g_leave_embed
                            .setTitle(`Пользователь решил покинуть гильдию!`)
                            .setDescription(`${user} покинул гильдию. Все роли у него были убраны, добавлена роль гостя гильдии!`)
                        await i.guild.members.edit(user, {
                            roles: [`920346035811917825`],
                            nick: []
                        })

                        console.log(chalk.cyan(`[База данных]`) + chalk.gray(`: Профиль пользователя ${userData.name} (${userData.nickname}) был успешно удалён, так как он покинул гильдию!`))
                        interaction.editReply({
                            content: `${user} покинул гильдию!`,
                            embeds: [g_leave_embed],
                            components: [guild_leave]
                        })
                        i.reply({
                            content: `${user} покинул гильдию Starpixel!`
                        })
                        if (userData) {
                            userData.delete()
                        }
                        if (bd) {
                            bd.delete()
                        }

                        console.log(chalk.red(`[УЧАСТНИК ПОКИНУЛ ГИЛЬДИЮ]`) + chalk.gray(`: Пользователь ${i.user.username} покинул гильдию Starpixel!`))
                    } else if (i.customId === `g_stay`) {
                        g_leave_embed
                            .setTitle(`Пользователь решил остаться в гильдии!`)
                            .setDescription(`${user} решил остаться в гильдии. Благодарим, что вы являетесь участником гильдии Starpixel! Мы будем радовать вас различным контентом и сделаем всё возможное, чтобы вы остались с нами!`)
                            .setFooter({ text: `Если вы всё-таки решите нас покинуть, пропишите /guild-leave ещё раз!` })

                        interaction.editReply({
                            content: `${user} остался в гильдии!`,
                            embeds: [g_leave_embed],
                            components: [guild_leave]
                        })

                        i.reply({
                            content: `${user} остался в гильдии!`
                        })
                    }


                } else {
                    i.reply({ content: `Вы не можете использовать данную кнопочку!`, ephemeral: true });
                }
            })
            .catch(async (err) => {
                await guild_leave.components[0]
                    .setDisabled(true)
                    .setLabel(`Отменено`)
                await guild_leave.components[1]
                    .setDisabled(true)
                    .setLabel(`Отменено`)


                g_leave_embed
                    .setTitle(`Уход из гильдии отменён из-за истечения времени!`)
                    .setDescription(`Вы не нажали на кнопочку вовремя, поэтому не смогли покинуть гильдию.`)
                    .setFooter({ text: `Пропишите команду /guild-leave ещё раз, чтобы повторить попытку!` })
                await interaction.editReply({
                    content: `Время на использование кнопочек у ${user} истекло!`,
                    embeds: [g_leave_embed],
                    components: [guild_leave]
                })
            })


    }
};