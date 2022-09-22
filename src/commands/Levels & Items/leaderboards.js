const { SlashCommandBuilder, Attachment, EmbedBuilder } = require('discord.js');

const { User } = require(`../../schemas/userdata`);


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`leaderboard`)
        .setDescription(`Лучшие пользователи по количеству предметов`)
        .addStringOption(option => option
            .setName(`тип`)
            .setRequired(true)
            .setAutocomplete(true)
            .setDescription(`Выберите таблицу лидеров`)
        ),
    async autoComplete(interaction, client) {
        const focusedValue = interaction.options.getFocused();
        const choices = ['Опыт активности', 'Опыт рангов', 'Румбики'];
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction, client) {
        switch (interaction.options.getString(`тип`)) {
            case `Опыт активности`: {
                await interaction.deferReply({
                    fetchReply: true
                })
                const users = await User.find().then(users => {
                    return users.filter(async user => await interaction.guild.members.fetch(user.userid))
                })
                const sort1 = users.sort((a, b) => {
                    return b.exp - a.exp
                }).slice(0, 10)
                const sort = sort1.sort((a, b) => {
                    return b.level - a.level
                })
                let index = 1
                const map = sort.map(async (user) => {
                    const tag = await interaction.guild.members.fetch(user.userid)
                    return `**${index++}.** ${tag} > ${user.level} уровень & ${user.exp}🌀`
                })
                const mapProm = await Promise.all(map)


                const embed = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Лучшие пользователи по уровню активности`
                    })
                    .setTimestamp(Date.now())
                    .setDescription(`${mapProm.join('\n')}`)

                await interaction.editReply({
                    embeds: [embed]
                })
            }

                break;
            case `Опыт рангов`: {
                await interaction.deferReply({
                    fetchReply: true
                })
                const users = await User.find().then(users => {
                    return users.filter(async user => await interaction.guild.members.fetch(user.userid))
                })
                const sort = users.sort((a, b) => {
                    return b.rank - a.rank
                }).slice(0, 10)
                let index = 1
                const map = sort.map(async (user) => {
                    const tag = await interaction.guild.members.fetch(user.userid)
                    return `**${index++}.** ${tag} > Всего опыта: ${user.rank}💠`
                })
                const mapProm = await Promise.all(map)


                const embed = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Лучшие пользователи по опыту рангов`
                    })
                    .setTimestamp(Date.now())
                    .setDescription(`${mapProm.join('\n')}`)

                await interaction.editReply({
                    embeds: [embed]
                })
            }

                break;
            case `Румбики`: {
                await interaction.deferReply({
                    fetchReply: true
                })
                const users = await User.find().then(users => {
                    return users.filter(async user => await interaction.guild.members.fetch(user.userid))
                })
                const sort = users.sort((a, b) => {
                    return b.rumbik - a.rumbik
                }).slice(0, 10)
                let index = 1
                const map = sort.map(async (user) => {
                    const tag = await interaction.guild.members.fetch(user.userid)
                    return `**${index++}.** ${tag} > Всего румбиков: ${user.rumbik}<:Rumbik:883638847056003072>`
                })
                const mapProm = await Promise.all(map)


                const embed = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Лучшие пользователи по количеству румбиков`
                    })
                    .setTimestamp(Date.now())
                    .setDescription(`${mapProm.join('\n')}`)

                await interaction.editReply({
                    embeds: [embed]
                })
            }

                break;

            default: {
                await interaction.reply({
                    content: `Данной опции не существует! Выберите одну из предложенных!`,
                    ephemeral: true
                })
            }
                break;
        }

    }
};