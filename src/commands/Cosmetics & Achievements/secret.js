const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`);
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`secret`)
        .setDescription(`Основные ссылки и информация о гильдии.`)
        .addSubcommand(subcommand => subcommand
            .setName(`set`)
            .setDescription(`Установить новую тайную команду`)
            .addStringOption(option => option
                .setName(`тайная`)
                .setDescription(`Новое тайное слово`)
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName(`подсказка`)
                .setDescription(`Новая подсказка для тайного слова`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`hint`)
            .setDescription(`Подсказка для тайного слова`)
        ),

    async execute(interaction, client) {


        const user = interaction.member
        const guild = interaction.guild
        const guildData = await Guild.findOne({ id: guild.id }) || new Guild({ id: guild.id, name: guild.name })

        switch (interaction.options.getSubcommand()) {
            case `set`: {
                await interaction.deferReply({
                    fetchReply: true
                })
                await interaction.deleteReply()
                const not_admin = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`320880176416161802`).name}\`!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                if (!user.roles.cache.has(`320880176416161802`)) return interaction.reply({
                    embeds: [not_admin]
                })

                let name = interaction.options.getString(`тайная`).toLowerCase()
                const hint = interaction.options.getString(`подсказка`)

                guildData.secret_word.name = name
                guildData.secret_word.hint = hint
                guildData.save()

                const msg = await interaction.guild.channels.cache.get(process.env.main_channel).send(
                    `Установлена новая тайная команда!    @here
**Подсказка**: ${guildData.secret_word.hint} (\`/${name.replace(/./g, '_ ')}\`)`
                )
                await msg.pin(`Новая тайная команда!`)
                console.log(chalk.red(`[НОВАЯ ТАЙНАЯ КОМАНДА]`) + chalk.gray(`: Установлена новая тайная команда: ${guildData.secret_word.name}. Подсказка: ${guildData.secret_word.hint}`))
            }

                break;
            case `hint`: {
                const hint = new EmbedBuilder()
                    .setTitle(`Подсказка для тайного слова`)
                    .setColor(process.env.bot_color)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/Lo2SaOA.png`)
                    .setDescription(`**Подсказка**: \`${guildData.secret_word.hint}\``)
                interaction.reply({
                    embeds: [hint]
                })
            }

                break;

            default:
                break;
        }

    }
};