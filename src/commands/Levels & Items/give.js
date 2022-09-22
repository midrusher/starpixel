const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`);
const ch_list = require(`../../discord structure/channels.json`)
const chalk = require(`chalk`);
const { calcActLevel, getLevel } = require(`../../functions`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`give`)
        .setDescription(`Выдать предмет пользователю`)
        .addStringOption(option => option
            .setName(`тип`)
            .setDescription(`Тип предмета`)
            .setAutocomplete(true)
            .setRequired(true)
        )
        .addUserOption(option => option
            .setName(`пользователь`)
            .setDescription(`Выберите пользователя, которому необходимо выдать предмет`)
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName(`количество`)
            .setDescription(`Выберите количество выдаваемого предмета`)
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

        const user = interaction.options.getUser(`пользователь`) || interaction.member.user;
        const userData = await User.findOne({ userid: user.id }) || new User({ userid: user.id, name: user.username })
        switch (interaction.options.getString(`тип`)) {
            case `Опыт активности`: {
                let cur_exp = userData.exp + interaction.options.getNumber(`количество`)
                let cur_level = userData.level
                let total_exp = calcActLevel(0, cur_level, cur_exp)
                let level_exp = getLevel(total_exp)
                let level = level_exp[0], exp = level_exp[1]
                
                userData.level = level
                userData.exp = exp

                if (cur_level < level) {
                    await interaction.guild.channels.cache.get(ch_list.main).send(
                        `:black_medium_small_square:
${user} повысил уровень активности до ${userData.level} уровня! :tada:
:black_medium_small_square:`);
                }

                userData.save();
                await interaction.reply(`Выдано ${interaction.options.getNumber(`количество`)}🌀 пользователю ${user}!`)
                console.log(chalk.green(`[${user.username} получил опыт активности]`) + chalk.gray(`: Теперь у него ${userData.exp} опыта и ${userData.level} уровень.`))
            };

                break;
            case `Опыт рангов`: {
                userData.rank += interaction.options.getNumber(`количество`)
                userData.save();
                interaction.reply(`Выдано ${interaction.options.getNumber(`количество`)}💠 пользователю ${user}! У него теперь ${userData.rank} опыта рангов!`)
                console.log(chalk.green(`[${user.username} получил опыт рангов]`) + chalk.gray(`: Теперь у него ${userData.rank} опыта рангов.`))

            }

                break;
            case `Румбики`: {
                userData.rumbik += interaction.options.getNumber(`количество`)
                userData.save();
                interaction.reply(`Выдано ${interaction.options.getNumber(`количество`)}<:Rumbik:883638847056003072> пользователю ${user}! У него теперь ${userData.rumbik} румбиков!`)
                console.log(chalk.green(`[${user.username} получил румбики]`) + chalk.gray(`: Теперь у него ${userData.rumbik} румбиков.`))
            }

                break;

            default:
                break;
        }
    }
}