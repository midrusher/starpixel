const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`);
const chalk = require(`chalk`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`give-xp`)
        .setDescription(`Выдать предмет пользователю.`)
        .addStringOption(option => option
            .setName(`тип`)
            .setDescription(`Тип предмета`)
            .setAutocomplete(true)
            .setRequired(true)
        )
        .addUserOption(option => option
            .setName(`пользователь`)
            .setDescription(`Выберите пользователя, которому необходимо выдать предмет.`)
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName(`количество`)
            .setDescription(`Выберите количество выдаваемого предмета.`)
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

        const user = interaction.options.getUser(`пользователь`) || interaction.member.user;
        const userData = await User.findOne({ userid: user.id }) || new User({ userid: user.id, name: user.username })
        switch (interaction.options.getString(`тип`)) {
            case `Опыт активности`: {
                userData.exp += interaction.options.getNumber(`количество`);
                userData.totalexp += interaction.options.getNumber(`количество`);
                userData.save();
                interaction.reply(`Выдано ${interaction.options.getNumber(`количество`)}🌀 пользователю ${user}!`)
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