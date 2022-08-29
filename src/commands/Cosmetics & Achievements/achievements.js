const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { User } = require(`../../schemas/userdata`); //ДОБАВИТЬ В ДРУГИЕ
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ
const { execute } = require('../../events/client/ready');
const chalk = require(`chalk`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`achievement`)
        .setDescription(`Получить достижения гильдии.`)
        .addSubcommandGroup(group => group
            .setName(`normal`)
            .setDescription(`Обычные достижения`)
            .addSubcommand(subcommand => subcommand
                .setName(`get`)
                .setDescription(`Получить достижение гильдии`)
                .addStringOption(option => option
                    .setName(`достижение`)
                    .setDescription(`Выбрать номер достижения`)
                    .setAutocomplete(true)
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(`тайная`)
                    .setDescription(`Введите тайную команду (достижение №25)`)
                )
            )
            .addSubcommand(subcommand => subcommand
                .setName(`grant`)
                .setDescription(`Выдать достижение пользователю`)
                .addUserOption(option => option
                    .setName(`пользователь`)
                    .setDescription(`Пользователь, которому нужно выдать достижение`)
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(`достижение`)
                    .setDescription(`Выберите номер достижения`)
                    .setRequired(true)
                    .setAutocomplete(true)
                )
            )
            .addSubcommand(subcommand => subcommand
                .setName(`revoke`)
                .setDescription(`Убрать достижение у пользователя`)
                .addUserOption(option => option
                    .setName(`пользователь`)
                    .setDescription(`Пользователь, у которого нужно забрать достижение`)
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(`достижение`)
                    .setDescription(`Выберите номер достижения`)
                    .setRequired(true)
                    .setAutocomplete(true)
                )
            )
        )
        .addSubcommandGroup(group => group
            .setName(`mythical`)
            .setDescription(`Обычные достижения`)
            .addSubcommand(subcommand => subcommand
                .setName(`get`)
                .setDescription(`Получить достижение гильдии`)
                .addStringOption(option => option
                    .setName(`достижение`)
                    .setDescription(`Выбрать номер достижения`)
                    .setAutocomplete(true)
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand => subcommand
                .setName(`grant`)
                .setDescription(`Выдать достижение пользователю`)
                .addUserOption(option => option
                    .setName(`пользователь`)
                    .setDescription(`Пользователь, которому нужно выдать достижение`)
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(`достижение`)
                    .setDescription(`Выберите номер достижения`)
                    .setRequired(true)
                    .setAutocomplete(true)
                )
            )
            .addSubcommand(subcommand => subcommand
                .setName(`revoke`)
                .setDescription(`Убрать достижение у пользователя`)
                .addUserOption(option => option
                    .setName(`пользователь`)
                    .setDescription(`Пользователь, у которого нужно забрать достижение`)
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(`достижение`)
                    .setDescription(`Выберите номер достижения`)
                    .setRequired(true)
                    .setAutocomplete(true)
                )
            )
        ),

    async autoComplete(interaction, client) {


        switch (interaction.options.getSubcommandGroup()) {

            case `normal`: {
                switch (interaction.options.getSubcommand()) {
                    case `get`: {
                        const focusedValue = interaction.options.getFocused();
                        const choices = [
                            '№1. Большая награда.',
                            '№2. Сладкая жизнь',
                            '№3. Тайна древних сокровищ',
                            '№4. Подарок судьбы',
                            '№5. Покупка',
                            '№6. Это профи',
                            '№7. Жёлтый круг',
                            '№8. Хрум',
                            '№9. Бульк',
                            '№10. Вот это коллекция!',
                            '№11. О, да!',
                            '№12. Смайл',
                            '№13. Точно не пуговица',
                            '№14. Пол - это лава',
                            '№15. Исследование',
                            '№16. Не просто пылинка',
                            '№17. Цвет настроения',
                            '№18. Художник',
                            '№19. Ветеран',
                            '№20. Честная сделка',
                            '№21. Очень активный',
                            '№22. Второй круг',
                            '№23. VIP-персона',
                            '№24. Смысл жизни',
                            '№25. Тайная команда',
                        ];
                        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
                        await interaction.respond(
                            filtered.map(choice => ({ name: choice, value: choice })),
                        );




                    }

                        break;

                    case `grant`: {

                        const focusedValue = interaction.options.getFocused();
                        const choices = [
                            '№1. Большая награда.',
                            '№2. Сладкая жизнь',
                            '№3. Тайна древних сокровищ',
                            '№4. Подарок судьбы',
                            '№5. Покупка',
                            '№6. Это профи',
                            '№7. Жёлтый круг',
                            '№8. Хрум',
                            '№9. Бульк',
                            '№10. Вот это коллекция!',
                            '№11. О, да!',
                            '№12. Смайл',
                            '№13. Точно не пуговица',
                            '№14. Пол - это лава',
                            '№15. Исследование',
                            '№16. Не просто пылинка',
                            '№17. Цвет настроения',
                            '№18. Художник',
                            '№19. Ветеран',
                            '№20. Честная сделка',
                            '№21. Очень активный',
                            '№22. Второй круг',
                            '№23. VIP-персона',
                            '№24. Смысл жизни',
                            '№25. Тайная команда',
                        ];
                        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
                        await interaction.respond(
                            filtered.map(choice => ({ name: choice, value: choice })),
                        );



                    }
                        break;

                    case `revoke`: {

                        const focusedValue = interaction.options.getFocused();
                        const choices = [
                            '№1. Большая награда.',
                            '№2. Сладкая жизнь',
                            '№3. Тайна древних сокровищ',
                            '№4. Подарок судьбы',
                            '№5. Покупка',
                            '№6. Это профи',
                            '№7. Жёлтый круг',
                            '№8. Хрум',
                            '№9. Бульк',
                            '№10. Вот это коллекция!',
                            '№11. О, да!',
                            '№12. Смайл',
                            '№13. Точно не пуговица',
                            '№14. Пол - это лава',
                            '№15. Исследование',
                            '№16. Не просто пылинка',
                            '№17. Цвет настроения',
                            '№18. Художник',
                            '№19. Ветеран',
                            '№20. Честная сделка',
                            '№21. Очень активный',
                            '№22. Второй круг',
                            '№23. VIP-персона',
                            '№24. Смысл жизни',
                            '№25. Тайная команда',
                        ];
                        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
                        await interaction.respond(
                            filtered.map(choice => ({ name: choice, value: choice })),
                        );




                    }
                        break;
                    default:
                        break;
                }


            }



                break;
            case `mythical`: {
                switch (interaction.options.getSubcommand()) {
                    case `get`: {

                        const focusedValue = interaction.options.getFocused();
                        const choices = [
                            '№1. Солнце',
                            '№2. Чемпион',
                            '№3. Жертва века',
                            '№4. Перерождение',
                            '№5. Просто мусор',
                        ];
                        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
                        await interaction.respond(
                            filtered.map(choice => ({ name: choice, value: choice })),
                        );



                    }

                        break;

                    case `grant`: {

                        const focusedValue = interaction.options.getFocused();
                        const choices = [
                            '№1. Солнце',
                            '№2. Чемпион',
                            '№3. Жертва века',
                            '№4. Перерождение',
                            '№5. Просто мусор',
                        ];
                        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
                        await interaction.respond(
                            filtered.map(choice => ({ name: choice, value: choice })),
                        );



                    }
                        break;

                    case `revoke`: {

                        const focusedValue = interaction.options.getFocused();
                        const choices = [
                            '№1. Солнце',
                            '№2. Чемпион',
                            '№3. Жертва века',
                            '№4. Перерождение',
                            '№5. Просто мусор',
                        ];
                        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
                        await interaction.respond(
                            filtered.map(choice => ({ name: choice, value: choice })),
                        );




                    }
                        break;
                    default:
                        break;
                }
            }
                break;
            default:
                break;
        }
    },
    async execute(interaction, client) {
        if (interaction.member.roles.cache.has(`920346035811917825`)) return interaction.reply({
            content: `Вы не можете использовать эту команду! Пожалуйста, вступите в гильдию Starpixel.
Подать заявку можно в канале <#921719174819090462>, прописав \`/apply\`!`
        })

        const user = interaction.member
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id, name: user.username })
        const not_admin = new EmbedBuilder()
            .setAuthor({
                name: `❗ Отсутствует необходимая роль!`
            })
            .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`320880176416161802`).name}\`!`)
            .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
            .setColor(`DarkRed`)
            .setTimestamp(Date.now())

        switch (interaction.options.getSubcommandGroup()) {
            case `normal`: {
                switch (interaction.options.getSubcommand()) {
                    case `get`: {
                        let role = ``
                        switch (interaction.options.getString(`достижение`)) {
                            case `№1. Большая награда.`: {
                                const already_done = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Достижение уже выполнено!`
                                    })
                                    .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.

Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)

                                role = `584811233035681814`
                                if (user.roles.cache.has(role)) return interaction.reply({
                                    embeds: [already_done],
                                    ephemeral: true
                                })

                                const no_condition = new EmbedBuilder()
                                    .setColor(`DarkRed`)
                                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                    .setAuthor({
                                        name: `❗ Вы не соответствуете требованиям!`
                                    })
                                    .setDescription(`Вы не соответствуете требованиям для получения данного достижения! Проверить требования вы можете в канале <#${process.env.ach_channel}>.

Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                    .setTimestamp(Date.now())

                                if (!user.roles.cache.has(``)) return interaction.reply({
                                    embeds: [no_condition],
                                    ephemeral: true
                                })

                                const condition_meet = new EmbedBuilder()
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                    .setTitle(`✅ Достижение выполнено!`)
                                    .setTimestamp(Date.now())
                                    .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!

Достижений выполнено: \`NN/25\`
Мифических достижений выполнено: \`NN/5\``)

                                let reward = ``
                                await user.roles.add(role)
                                await user.roles.add(reward)
                                await interaction.guild.channels.cache.get(process.env.act_channel).send(
`╒══════════════════╕
${user} + +300 🌀
\`Выполнение достижения.\`
╘══════════════════╛`)

                                await interaction.guild.channels.cache.get(process.env.rank_channel).send(
`╒══════════════════╕
${user} + +50 💠
\`Выполнение достижения.\`
╘══════════════════╛`)
                                await interaction.reply({
                                    embeds: [condition_meet]
                                })

                            } break;

                            case `№2. Сладкая жизнь`: {
                                role = `584811236085071882`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№3. Тайна древних сокровищ`: {
                                role = `584811238178029612`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№4. Подарок судьбы`: {
                                role = `584811238626689024`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№5. Покупка`: {
                                role = `610131860445724713`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№6. Это профи`: {
                                role = `584811242498293781`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№7. Жёлтый круг`: {
                                role = `584811242703552512`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№8. Хрум`: {
                                role = `584811243496275988`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№9. Бульк`: {
                                role = `584811243794202626`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№10. Вот это коллекция!`: {
                                role = `584811380117471252`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№11. О, да!`: {
                                role = `585175150501036043`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№12. Смайл`: {
                                role = `585175165315579904`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№13. Точно не пуговица`: {
                                role = `585175168251592714`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№14. Пол - это лава`: {
                                role = `585175171154051083`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№15. Исследование`: {
                                role = `610133244393816074`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№16. Не просто пылинка`: {
                                role = `610133972034387983`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№17. Цвет настроения`: {
                                role = `585175188187119638`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№18. Художник`: {
                                role = `610131863683465246`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№19. Ветеран`: {
                                role = `610131866963673118`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№20. Честная сделка`: {
                                role = `610131868045672615`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№21. Очень активный`: {
                                role = `610132199848804379`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№22. Второй круг`: {
                                role = `610132217204572190`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№23. VIP-персона`: {
                                role = `694914070632988712`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№24. Смысл жизни`: {
                                role = `694914070746234970`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№25. Тайная команда`: {
                                role = `694914072960958555`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            default:
                                break;
                        }

                    }

                        break;
                    case `grant`: {
                        if (!user.roles.cache.has(`320880176416161802`)) return interaction.reply({
                            embeds: [not_admin]
                        })
                        const member = interaction.options.getMember(`пользователь`)
                        const memberData = await User.findOne({ id: member.user.id }) || new User({ id: member.user.id, name: member.user.username })

                        let role = ``
                        switch (interaction.options.getString(`достижение`)) {
                            case `№1. Большая награда.`: {
                                role = `584811233035681814`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№2. Сладкая жизнь`: {
                                role = `584811236085071882`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№3. Тайна древних сокровищ`: {
                                role = `584811238178029612`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№4. Подарок судьбы`: {
                                role = `584811238626689024`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№5. Покупка`: {
                                role = `610131860445724713`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№6. Это профи`: {
                                role = `584811242498293781`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№7. Жёлтый круг`: {
                                role = `584811242703552512`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№8. Хрум`: {
                                role = `584811243496275988`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№9. Бульк`: {
                                role = `584811243794202626`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№10. Вот это коллекция!`: {
                                role = `584811380117471252`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№11. О, да!`: {
                                role = `585175150501036043`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№12. Смайл`: {
                                role = `585175165315579904`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№13. Точно не пуговица`: {
                                role = `585175168251592714`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№14. Пол - это лава`: {
                                role = `585175171154051083`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№15. Исследование`: {
                                role = `610133244393816074`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№16. Не просто пылинка`: {
                                role = `610133972034387983`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№17. Цвет настроения`: {
                                role = `585175188187119638`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№18. Художник`: {
                                role = `610131863683465246`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№19. Ветеран`: {
                                role = `610131866963673118`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№20. Честная сделка`: {
                                role = `610131868045672615`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№21. Очень активный`: {
                                role = `610132199848804379`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№22. Второй круг`: {
                                role = `610132217204572190`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№23. VIP-персона`: {
                                role = `694914070632988712`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№24. Смысл жизни`: {
                                role = `694914070746234970`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№25. Тайная команда`: {
                                role = `694914072960958555`
                                member.roles.add(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Выдано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`Пользователю ${member} было выдано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            default:
                                break;
                        }


                    }

                        break;
                    case `revoke`: {
                        if (!user.roles.cache.has(`320880176416161802`)) return interaction.reply({
                            embeds: [not_admin]
                        })
                        const member = interaction.options.getMember(`пользователь`)
                        const memberData = await User.findOne({ id: member.user.id }) || new User({ id: member.user.id, name: member.user.username })

                        let role = ``
                        switch (interaction.options.getString(`достижение`)) {
                            case `№1. Большая награда.`: {
                                role = `584811233035681814`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№2. Сладкая жизнь`: {
                                role = `584811236085071882`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№3. Тайна древних сокровищ`: {
                                role = `584811238178029612`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№4. Подарок судьбы`: {
                                role = `584811238626689024`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№5. Покупка`: {
                                role = `610131860445724713`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№6. Это профи`: {
                                role = `584811242498293781`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№7. Жёлтый круг`: {
                                role = `584811242703552512`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№8. Хрум`: {
                                role = `584811243496275988`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№9. Бульк`: {
                                role = `584811243794202626`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№10. Вот это коллекция!`: {
                                role = `584811380117471252`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№11. О, да!`: {
                                role = `585175150501036043`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№12. Смайл`: {
                                role = `585175165315579904`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№13. Точно не пуговица`: {
                                role = `585175168251592714`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№14. Пол - это лава`: {
                                role = `585175171154051083`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№15. Исследование`: {
                                role = `610133244393816074`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№16. Не просто пылинка`: {
                                role = `610133972034387983`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№17. Цвет настроения`: {
                                role = `585175188187119638`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№18. Художник`: {
                                role = `610131863683465246`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№19. Ветеран`: {
                                role = `610131866963673118`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№20. Честная сделка`: {
                                role = `610131868045672615`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№21. Очень активный`: {
                                role = `610132199848804379`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№22. Второй круг`: {
                                role = `610132217204572190`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№23. VIP-персона`: {
                                role = `694914070632988712`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№24. Смысл жизни`: {
                                role = `694914070746234970`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            case `№25. Тайная команда`: {
                                role = `694914072960958555`
                                member.roles.remove(role)

                                const grant_embed = new EmbedBuilder()
                                    .setTitle(`Убрано достижение`)
                                    .setTimestamp(Date.now())
                                    .setColor(process.env.bot_color)
                                    .setDescription(`У пользователя ${member} было убрано достижение \`${interaction.options.getString(`достижение`)}\``)
                                    .setThumbnail(member.user.displayAvatarURL())

                                interaction.reply({
                                    embeds: [grant_embed]
                                })
                            } break;

                            default:
                                break;
                        }

                    }

                        break;

                    default:
                        break;
                }
            }

                break;

            case `mythical`: {

            }

                break;
            default:
                break;
        }
    }
};