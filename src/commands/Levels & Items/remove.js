const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`);
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)
const { calcActLevel, getLevel } = require(`../../functions`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`remove`)
        .setDescription(`Убрать предмет у пользователя.`)
        .addStringOption(option => option
            .setName(`тип`)
            .setDescription(`Тип предмета`)
            .setAutocomplete(true)
            .setRequired(true)
        )
        .addUserOption(option => option
            .setName(`пользователь`)
            .setDescription(`Выберите пользователя, у которого необходимо забрать предмет.`)
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName(`количество`)
            .setDescription(`Выберите количество забираемого предмета.`)
            .setRequired(true)
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
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `❗ Отсутствует необходимая роль!`
            })
            .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`563793535250464809`).name}\`!
Но вы всё ещё можете использовать команду \`/profile update\``)
            .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
            .setColor(`DarkRed`)
            .setTimestamp(Date.now())

        if (!interaction.member.roles.cache.has(`563793535250464809`)) return interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
        const member = interaction.options.getMember(`пользователь`)
                if (member.roles.cache.has(`920346035811917825`)) return interaction.reply({
                    content: `Данный участник не находится в гильдии!`,
                    ephemeral: true
                })
        const user = interaction.options.getUser(`пользователь`);
        const userData = await User.findOne({ userid: user.id })
        switch (interaction.options.getString(`тип`)) {
            case `Опыт активности`: {

                const total = calcActLevel(0, userData.level, userData.exp)

                const value = interaction.options.getNumber(`количество`);
                const not_possible = new EmbedBuilder()
                    .setColor(`DarkRed`)
                    .setTitle(`Невозможно выполнить данное действие!`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setDescription(`Данное действие невозможно выполнить, так как опыт активности не может быть меньше 0! ${total} < ${value}`)
                if (total < value) return interaction.reply({
                    embeds: [not_possible]
                })

                let cur_exp = userData.exp - interaction.options.getNumber(`количество`)
                let cur_level = userData.level
                let total_exp = calcActLevel(0, cur_level, cur_exp)
                let level_exp = getLevel(total_exp)
                let level = level_exp[0], exp = level_exp[1]
                
                userData.level = level
                userData.exp = exp

                if (cur_level > level) {
                    await interaction.guild.channels.cache.get(ch_list.main).send(
                        `:black_medium_small_square:
К сожалению, ${user} понизил свой уровень активности до ${userData.level} уровня! 😔
:black_medium_small_square:`);
                }
                userData.save();
                await interaction.reply(`Убрано ${interaction.options.getNumber(`количество`)}🌀 у пользователя ${user}!`)
                console.log(chalk.green(`[${user.username} потерял опыт активности]`) + chalk.gray(`: Теперь у него ${userData.exp} опыта и ${userData.level} уровень.`))
            };

                break;
            case `Опыт рангов`: {
                userData.rank -= interaction.options.getNumber(`количество`)
                const not_possible = new EmbedBuilder()
                    .setColor(`DarkRed`)
                    .setTitle(`Невозможно выполнить данное действие!`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setDescription(`Данное действие невозможно выполнить, так как опыт рангов не может быть меньше 0! (${userData.rank} < 0)`)
                if (userData.rank < 0) return interaction.reply({
                    embeds: [not_possible]
                })
                userData.save();
                interaction.reply(`Убрано ${interaction.options.getNumber(`количество`)}💠 у пользователя ${user}! У него теперь ${userData.rank} опыта рангов!`)
                console.log(chalk.green(`[${user.username} потерял опыт рангов]`) + chalk.gray(`: Теперь у него ${userData.rank} опыта рангов.`))

            }

                break;
            case `Румбики`: {
                userData.rumbik -= interaction.options.getNumber(`количество`)
                const not_possible = new EmbedBuilder()
                    .setColor(`DarkRed`)
                    .setTitle(`Невозможно выполнить данное действие!`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setDescription(`Данное действие невозможно выполнить, так как количество румбиков не может быть меньше 0! (${userData.rumbik} < 0)`)
                if (userData.rumbik < 0) return interaction.reply({
                    embeds: [not_possible]
                })
                userData.save();
                interaction.reply(`Убрано ${interaction.options.getNumber(`количество`)}<:Rumbik:883638847056003072> у пользователя ${user}! У него теперь ${userData.rumbik} румбиков!`)
                console.log(chalk.green(`[${user.username} потерял румбики]`) + chalk.gray(`: Теперь у него ${userData.rumbik} румбиков.`))
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
}