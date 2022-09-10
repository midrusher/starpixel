const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { User } = require(`../../schemas/userdata`); //ДОБАВИТЬ В ДРУГИЕ
const { Guild } = require(`../../schemas/guilddata`)
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ
const { execute } = require('../../events/client/start_bot/ready');
const chalk = require(`chalk`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`achievement`)
        .setDescription(`Получить достижения гильдии.`)
        .addSubcommandGroup(group => group
            .setName(`get`)
            .setDescription(`Обычные достижения`)
            .addSubcommand(subcommand => subcommand
                .setName(`normal`)
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
                .setName(`mythical`)
                .setDescription(`Выдать достижение пользователю`)
                .addStringOption(option => option
                    .setName(`достижение`)
                    .setDescription(`Выберите номер достижения`)
                    .setRequired(true)
                    .setAutocomplete(true)
                )
            )
        )
        .addSubcommandGroup(group => group
            .setName(`grant`)
            .setDescription(`Выдать достижение пользователю`)
            .addSubcommand(subcommand => subcommand
                .setName(`normal`)
                .setDescription(`Выдать обычное достижение`)
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
                .setName(`mythical`)
                .setDescription(`Выдать мифическое достижение`)
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
        )
        .addSubcommandGroup(group => group
            .setName(`revoke`)
            .setDescription(`Забрать достижение у пользователя`)
            .addSubcommand(subcommand => subcommand
                .setName(`normal`)
                .setDescription(`Забрать обычное достижение`)
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
            .addSubcommand(subcommand => subcommand
                .setName(`mythical`)
                .setDescription(`Забрать мифическое достижение`)
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

            case `get`: {
                switch (interaction.options.getSubcommand()) {
                    case `normal`: {
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

                    case `mythical`: {

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
            };
                break
            case `grant`: {
                switch (interaction.options.getSubcommand()) {
                    case `normal`: {
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

                    case `mythical`: {

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
            case `revoke`: {
                switch (interaction.options.getSubcommand()) {
                    case `normal`: {
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

                    case `mythical`: {

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
        try {
            if (interaction.member.roles.cache.has(`920346035811917825`)) return interaction.reply({
                content: `Вы не можете использовать эту команду! Пожалуйста, вступите в гильдию Starpixel.
    Подать заявку можно в канале <#921719174819090462>, прописав \`/apply\`!`
            })

            const user = interaction.member
            const userData = await User.findOne({ userid: user.id }) || new User({ userid: user.id, name: user.username })
            const not_admin = new EmbedBuilder()
                .setAuthor({
                    name: `❗ Отсутствует необходимая роль!`
                })
                .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`320880176416161802`).name}\`!`)
                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                .setColor(`DarkRed`)
                .setTimestamp(Date.now())
            let role = ``

            switch (interaction.options.getSubcommandGroup()) {
                case `get`: {
                    switch (interaction.options.getSubcommand()) {
                        case `normal`: {
                            switch (interaction.options.getString(`достижение`)) {
                                case `№1. Большая награда.`: {
                                    role = `584811233035681814`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`521248091853291540`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `510932601721192458`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))

                                } break;

                                case `№2. Сладкая жизнь`: {
                                    role = `584811236085071882`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`584673040470769667`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `521248091853291540`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№3. Тайна древних сокровищ`: {
                                    role = `584811238178029612`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`595966177969176579`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `584673040470769667`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№4. Подарок судьбы`: {
                                    role = `584811238626689024`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`781069821953441832`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `595966177969176579`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№5. Покупка`: {
                                    role = `610131860445724713`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!userData.buy <= 0) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `510932601721192458`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
        
        Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
        Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
        
        Достижений выполнено: \`${userData.achievements.normal}/25\`
        Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
        ${user} +300 🌀
        \`Выполнение достижения.\`
        ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
        ${user} +50 💠
        \`Выполнение достижения.\`
        ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№6. Это профи`: {
                                    role = `584811242498293781`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`553593136027533313`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `521248091853291540`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№7. Жёлтый круг`: {
                                    role = `584811242703552512`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`553660093523034112`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `510932601721192458`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№8. Хрум`: {
                                    role = `584811243496275988`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`553637207911563264`) && !user.roles.cache.has(`553638061817200650`) && !user.roles.cache.has(`605696079819964426`) && !user.roles.cache.has(`553638054238093364`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `510932601721192458`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№9. Бульк`: {
                                    role = `584811243794202626`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`553638061817200650`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `510932601721192458`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№10. Вот это коллекция!`: {
                                    role = `584811380117471252`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`531158683883929602`) && !user.roles.cache.has(`531158275400531988`) && !user.roles.cache.has(`553660120379293696`) && !user.roles.cache.has(`553660121444515842`) && !user.roles.cache.has(`931866162508230696`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `521248091853291540`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№11. О, да!`: {
                                    role = `585175150501036043`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`930169143347523604`) && !user.roles.cache.has(`930169139866259496`) && !user.roles.cache.has(`930169133671280641`) && !user.roles.cache.has(`930169145314652170`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `521248091853291540`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№12. Смайл`: {
                                    role = `585175165315579904`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`566528019208863744`) && !user.roles.cache.has(`571743750049497089`) && !user.roles.cache.has(`571745411929341962`) && !user.roles.cache.has(`571744516894228481`) && !user.roles.cache.has(`571757459732168704`) && !user.roles.cache.has(`571757461380399106`) && !user.roles.cache.has(`571757462219128832`) && !user.roles.cache.has(`571757463876141077`) && !user.roles.cache.has(`642810527579373588`) && !user.roles.cache.has(`642393088689700893`) && !user.roles.cache.has(`636561006721761301`) && !user.roles.cache.has(`607495941490212885`) && !user.roles.cache.has(`694221126494060604`) && !user.roles.cache.has(`740241984190545971`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `510932601721192458`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№13. Точно не пуговица`: {
                                    role = `585175168251592714`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`572124468189593622`) && !user.roles.cache.has(`572124606870192143`) && !user.roles.cache.has(`572124610481487890`) && !user.roles.cache.has(`572124614050840576`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `521248091853291540`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№14. Пол - это лава`: {
                                    role = `585175171154051083`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`930169133671280641`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `584673040470769667`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№15. Исследование`: {
                                    role = `610133244393816074`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`504887113649750016`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `510932601721192458`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№16. Не просто пылинка`: {
                                    role = `610133972034387983`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`609085186738618395`) && !user.roles.cache.has(`609086542681604142`) && !user.roles.cache.has(`781069819838464022`) && !user.roles.cache.has(`785252400608182282`) && !user.roles.cache.has(`781069820053160006`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `510932601721192458`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№17. Цвет настроения`: {
                                    role = `585175188187119638`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`595893144055316490`) && !user.roles.cache.has(`595892599693246474`) && !user.roles.cache.has(`595892677451710468`) && !user.roles.cache.has(`595892238370996235`) && !user.roles.cache.has(`589770984391966760`) && !user.roles.cache.has(`595893568485326862`) && !user.roles.cache.has(`630395361508458516`) && !user.roles.cache.has(`595892930204401665`) && !user.roles.cache.has(`595889341058777088`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `510932601721192458`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№18. Художник`: {
                                    role = `610131863683465246`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`850079153746346044`) && !user.roles.cache.has(`850079142413598720`) && !user.roles.cache.has(`850079173149065277`) && !user.roles.cache.has(`642810535737425930`) && !user.roles.cache.has(`642810538518118430`) && !user.roles.cache.has(`642819600429481997`) && !user.roles.cache.has(`850079134700666890`) && !user.roles.cache.has(`893927886766096384`) && !user.roles.cache.has(`694914077104799764`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `521248091853291540`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№19. Ветеран`: {
                                    role = `610131866963673118`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`780487593485008946`) && !user.roles.cache.has(`849695880688173087`) && !user.roles.cache.has(`992122876394225814`) && !user.roles.cache.has(`992123014831419472`) && !user.roles.cache.has(`992123019793276961`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `521248091853291540`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№20. Честная сделка`: {
                                    role = `610131868045672615`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!userData.sell.comet <= 0) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `521248091853291540`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№21. Очень активный`: {
                                    role = `610132199848804379`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!userData.levels < 30) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `521248091853291540`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№22. Второй круг`: {
                                    role = `610132217204572190`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`930520087797051452`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `595966177969176579`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№23. VIP-персона`: {
                                    role = `694914070632988712`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`850336260265476096`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `521248091853291540`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№24. Смысл жизни`: {
                                    role = `694914070746234970`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                    if (!user.roles.cache.has(`597746057203548160`)) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `584673040470769667`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;

                                case `№25. Тайная команда`: {
                                    role = `694914072960958555`
                                    const already_done = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Достижение уже выполнено!`
                                        })
                                        .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


                                    if (user.roles.cache.has(role)) return interaction.reply({
                                        embeds: [already_done],
                                        ephemeral: true
                                    })
                                    const guild = interaction.guild
                                    const guildData = await Guild.findOne({ id: guild.id }) || new Guild({ id: guild.id, name: guild.name })

                                    const no_condition = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Неверное слово`
                                        })
                                        .setDescription(`Вы не отгадали тайное слово! Повторите попытку ещё раз.`)
                                        .setTimestamp(Date.now())

                                    let answer = interaction.options.getString(`тайная`);
                                    if (answer.toLowerCase() !== guildData.secret_word.name) return interaction.reply({
                                        embeds: [no_condition],
                                        ephemeral: true
                                    })
                                    let reward = `584673040470769667`
                                    const has_reward = new EmbedBuilder()
                                        .setColor(`DarkRed`)
                                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                        .setAuthor({
                                            name: `❗ Вы имеете награду!`
                                        })
                                        .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                        .setTimestamp(Date.now())
                                    if (user.roles.cache.has(reward)) return interaction.reply({
                                        embeds: [has_reward],
                                        ephemeral: true
                                    })
                                    await user.roles.add(role)
                                    await user.roles.add(reward)
                                    userData.rank += 50
                                    userData.exp += 300; userData.totalexp += 300
                                    userData.achievements.normal += 1
                                    userData.save()
                                    const condition_meet = new EmbedBuilder()
                                        .setColor(process.env.bot_color)
                                        .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                        .setTitle(`✅ Достижение выполнено!`)
                                        .setTimestamp(Date.now())
                                        .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                    await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                        `╒══════════════════╕
    ${user} +300 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                    await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                        `╒══════════════════╕
    ${user} +50 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                    await interaction.reply({
                                        embeds: [condition_meet]
                                    })
                                    console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                } break;




                                case `mythical`: {
                                    switch (interaction.options.getString(`достижение`)) {
                                        case `№1. Солнце`: {
                                            role = `694914074630422555`
                                            const already_done = new EmbedBuilder()
                                                .setColor(`DarkRed`)
                                                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                                .setAuthor({
                                                    name: `❗ Достижение уже выполнено!`
                                                })
                                                .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                            if (!user.roles.cache.has(`781069817384927262`) || !user.roles.cache.has(`930520087797051452`)) return interaction.reply({
                                                embeds: [no_condition],
                                                ephemeral: true
                                            })
                                            let reward = `595966177969176579`
                                            const has_reward = new EmbedBuilder()
                                                .setColor(`DarkRed`)
                                                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                                .setAuthor({
                                                    name: `❗ Вы имеете награду!`
                                                })
                                                .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                                .setTimestamp(Date.now())
                                            if (user.roles.cache.has(reward)) return interaction.reply({
                                                embeds: [has_reward],
                                                ephemeral: true
                                            })
                                            await user.roles.add(role)
                                            await user.roles.add(reward)
                                            userData.rank += 300
                                            userData.exp += 700; userData.totalexp += 700
                                            userData.achievements.mythical += 1
                                            userData.save()
                                            const condition_meet = new EmbedBuilder()
                                                .setColor(process.env.bot_color)
                                                .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                                .setTitle(`✅ Достижение выполнено!`)
                                                .setTimestamp(Date.now())
                                                .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                            await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                                `╒══════════════════╕
    ${user} + 700 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                            await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                                `╒══════════════════╕
    ${user} + 300 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                            await interaction.reply({
                                                embeds: [condition_meet]
                                            })
                                            console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                        }

                                            break;
                                        case `№2. Чемпион`: {
                                            role = `694914073376194740`
                                            const already_done = new EmbedBuilder()
                                                .setColor(`DarkRed`)
                                                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                                .setAuthor({
                                                    name: `❗ Достижение уже выполнено!`
                                                })
                                                .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
        
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                            if (!user.roles.cache.has(`660236704971489310`) || !user.roles.cache.has(`740241985155366973`) || !user.roles.cache.has(`730891493375475786`) || !user.roles.cache.has(`764198086738051092`) || !user.roles.cache.has(`856866046387683338`) || !user.roles.cache.has(`930520087797051452`)) return interaction.reply({
                                                embeds: [no_condition],
                                                ephemeral: true
                                            })
                                            let reward = `781069821953441832`
                                            const has_reward = new EmbedBuilder()
                                                .setColor(`DarkRed`)
                                                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                                .setAuthor({
                                                    name: `❗ Вы имеете награду!`
                                                })
                                                .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
        
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                                .setTimestamp(Date.now())
                                            if (user.roles.cache.has(reward)) return interaction.reply({
                                                embeds: [has_reward],
                                                ephemeral: true
                                            })
                                            await user.roles.add(role)
                                            await user.roles.add(reward)
                                            userData.rank += 300
                                            userData.exp += 700; userData.totalexp += 700
                                            userData.achievements.normal += 1
                                            userData.save()
                                            const condition_meet = new EmbedBuilder()
                                                .setColor(process.env.bot_color)
                                                .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                                .setTitle(`✅ Достижение выполнено!`)
                                                .setTimestamp(Date.now())
                                                .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
        
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                            await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                                `╒══════════════════╕
    ${user} + 700 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                            await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                                `╒══════════════════╕
    ${user} + 300 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                            await interaction.reply({
                                                embeds: [condition_meet]
                                            })
                                            console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                        }

                                            break;
                                        case `№3. Жертва века`: {
                                            role = `694914074550468758`
                                            const already_done = new EmbedBuilder()
                                                .setColor(`DarkRed`)
                                                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                                .setAuthor({
                                                    name: `❗ Достижение уже выполнено!`
                                                })
                                                .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
            
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                            if (!user.roles.cache.has(`781069821953441832`) || !user.roles.cache.has(`930520087797051452`)) return interaction.reply({
                                                embeds: [no_condition],
                                                ephemeral: true
                                            })
                                            let reward = `510932601721192458`
                                            const has_reward = new EmbedBuilder()
                                                .setColor(`DarkRed`)
                                                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                                .setAuthor({
                                                    name: `❗ Вы имеете награду!`
                                                })
                                                .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
            
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                                .setTimestamp(Date.now())
                                            if (user.roles.cache.has(reward)) return interaction.reply({
                                                embeds: [has_reward],
                                                ephemeral: true
                                            })
                                            await user.roles.add(role)
                                            await user.roles.remove(`781069821953441832`)
                                            await user.roles.add(reward)
                                            userData.rank += 300
                                            userData.exp += 700; userData.totalexp += 700
                                            userData.achievements.normal += 1
                                            userData.save()
                                            const condition_meet = new EmbedBuilder()
                                                .setColor(process.env.bot_color)
                                                .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                                .setTitle(`✅ Достижение выполнено!`)
                                                .setTimestamp(Date.now())
                                                .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
            
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                            await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                                `╒══════════════════╕
    ${user} + 700 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                            await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                                `╒══════════════════╕
    ${user} + 300 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                            await interaction.reply({
                                                embeds: [condition_meet]
                                            })
                                            console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                        }

                                            break;
                                        case `№4. Перерождение`: {
                                            role = `694914075460894791`
                                            const already_done = new EmbedBuilder()
                                                .setColor(`DarkRed`)
                                                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                                .setAuthor({
                                                    name: `❗ Достижение уже выполнено!`
                                                })
                                                .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
                
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                            if (!user.roles.cache.has(`595966177969176579`) || !user.roles.cache.has(`930520087797051452`)) return interaction.reply({
                                                embeds: [no_condition],
                                                ephemeral: true
                                            })
                                            let reward = `584673040470769667`
                                            const has_reward = new EmbedBuilder()
                                                .setColor(`DarkRed`)
                                                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                                .setAuthor({
                                                    name: `❗ Вы имеете награду!`
                                                })
                                                .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
                
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                                .setTimestamp(Date.now())
                                            if (user.roles.cache.has(reward)) return interaction.reply({
                                                embeds: [has_reward],
                                                ephemeral: true
                                            })
                                            await user.roles.add(role)
                                            await user.roles.add(reward)
                                            userData.rank += 300
                                            userData.exp += 700; userData.totalexp += 700
                                            userData.achievements.normal += 1
                                            userData.save()
                                            const condition_meet = new EmbedBuilder()
                                                .setColor(process.env.bot_color)
                                                .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                                .setTitle(`✅ Достижение выполнено!`)
                                                .setTimestamp(Date.now())
                                                .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
                
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                            await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                                `╒══════════════════╕
    ${user} + 700 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                            await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                                `╒══════════════════╕
    ${user} + 300 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                            await interaction.reply({
                                                embeds: [condition_meet]
                                            })
                                            console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                        }

                                            break;
                                        case `№5. Просто мусор`: {
                                            role = `697796942134116382`
                                            const already_done = new EmbedBuilder()
                                                .setColor(`DarkRed`)
                                                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                                .setAuthor({
                                                    name: `❗ Достижение уже выполнено!`
                                                })
                                                .setDescription(`Вы не можете выполнить данное достижение, так как вы уже выполнили его! Найти его вы можете в своем профиле.
                    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)


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

                                            if (userData.rumbik < 2000 || !user.roles.cache.has(`930520087797051452`)) return interaction.reply({
                                                embeds: [no_condition],
                                                ephemeral: true
                                            })
                                            let reward = `584673040470769667`
                                            const has_reward = new EmbedBuilder()
                                                .setColor(`DarkRed`)
                                                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                                .setAuthor({
                                                    name: `❗ Вы имеете награду!`
                                                })
                                                .setDescription(`У вас уже есть награда за данное достижение! Пожалуйста, откройте <@&${reward}>, чтобы выполнить достижение.
                    
    Если вы считаете, что это ошибка, напишите об этом в <#${process.env.ask_channel}>!`)
                                                .setTimestamp(Date.now())
                                            if (user.roles.cache.has(reward)) return interaction.reply({
                                                embeds: [has_reward],
                                                ephemeral: true
                                            })
                                            await user.roles.add(role)
                                            await user.roles.add(reward)
                                            userData.rank += 300
                                            userData.exp += 700; userData.totalexp += 700
                                            userData.rumbik -= 2000
                                            userData.achievements.normal += 1
                                            userData.save()
                                            const condition_meet = new EmbedBuilder()
                                                .setColor(process.env.bot_color)
                                                .setThumbnail(`https://i.imgur.com/Xa6HxCU.png`)
                                                .setTitle(`✅ Достижение выполнено!`)
                                                .setTimestamp(Date.now())
                                                .setDescription(`${user} выполнил достижение \`${interaction.options.getString(`достижение`)}\`!
    Он уже получил приз. Хочешь и ты? Тогда тебе в <#${process.env.ach_channel}>!
                    
    Достижений выполнено: \`${userData.achievements.normal}/25\`
    Мифических достижений выполнено: \`${userData.achievements.mythical}/5\``)


                                            await interaction.guild.channels.cache.get(process.env.act_channel).send(
                                                `╒══════════════════╕
    ${user} + 700 🌀
    \`Выполнение достижения.\`
    ╘══════════════════╛`)

                                            await interaction.guild.channels.cache.get(process.env.rank_channel).send(
                                                `╒══════════════════╕
    ${user} + 300 💠
    \`Выполнение достижения.\`
    ╘══════════════════╛`)
                                            await interaction.reply({
                                                embeds: [condition_meet]
                                            })
                                            console.log(chalk.magenta(`[Выполнено достижение]` + chalk.gray(`: ${user.username} выполнил достижение ${interaction.options.getString(`достижение`)}!`)))
                                        }

                                            break;

                                        default:
                                            break;
                                    }
                                }
                                default:
                                    break;
                            }

                        }

                        default:
                            break;
                    };
                }
                    break;
                case `grant`: {
                    if (!user.roles.cache.has(`320880176416161802`)) return interaction.reply({
                        embeds: [not_admin]
                    })
                    const member = interaction.options.getMember(`пользователь`)
                    const memberData = await User.findOne({ id: member.user.id }) || new User({ id: member.user.id, name: member.user.username })

                    switch (interaction.options.getSubcommand()) {
                        case `normal`: {
                            switch (interaction.options.getString(`достижение`)) {
                                case `№1. Большая награда.`: {
                                    role = `584811233035681814`
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 50
                                    memberData.exp += 300; memberData.totalexp += 300
                                    memberData.achievements.normal += 1
                                    memberData.save()
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
                        case `mythical`: {
                            switch (interaction.options.getString(`достижение`)) {
                                case `№1. Солнце`: {
                                    role = `694914074630422555`
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 300
                                    memberData.exp += 700; memberData.totalexp += 700
                                    memberData.achievements.mythical += 1
                                    memberData.save()
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

                                case `№2. Чемпион`: {
                                    role = `694914073376194740`
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 300
                                    memberData.exp += 700; memberData.totalexp += 700
                                    memberData.achievements.mythical += 1
                                    memberData.save()
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

                                case `№3. Жертва века`: {
                                    role = `694914074550468758`
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 300
                                    memberData.exp += 700; memberData.totalexp += 700
                                    memberData.achievements.mythical += 1
                                    memberData.save()
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

                                case `№4. Перерождение`: {
                                    role = `694914075460894791`
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 300
                                    memberData.exp += 700; memberData.totalexp += 700
                                    memberData.achievements.mythical += 1
                                    memberData.save()
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

                                case `№5. Просто мусор`: {
                                    role = `697796942134116382`
                                    if (member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя уже есть это достижение!`, ephemeral: true, 
                                    })
                                    member.roles.add(role)
                                    memberData.rank += 300
                                    memberData.exp += 700; memberData.totalexp += 700
                                    memberData.achievements.mythical += 1
                                    memberData.save()
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

                    switch (interaction.options.getSubcommand()) {
                        case `normal`: {
                            switch (interaction.options.getString(`достижение`)) {
                                case `№1. Большая награда.`: {
                                    role = `584811233035681814`
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true, 
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.remove(role)
                                    memberData.rank -= 50
                                    memberData.exp -= 300; memberData.totalexp -= 300
                                    memberData.achievements.normal -= 1
                                    memberData.save()
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
                        case `mythical`: {
                            switch (interaction.options.getString(`достижение`)) {
                                case `№1. Солнце`: {
                                    role = `694914074630422555`
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.add(role)
                                    memberData.rank -= 300
                                    memberData.exp -= 700; memberData.totalexp -= 700
                                    memberData.achievements.mythical -= 1
                                    memberData.save()
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

                                case `№2. Чемпион`: {
                                    role = `694914073376194740`
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.add(role)
                                    memberData.rank -= 300
                                    memberData.exp -= 700; memberData.totalexp -= 700
                                    memberData.achievements.mythical -= 1
                                    memberData.save()
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

                                case `№3. Жертва века`: {
                                    role = `694914074550468758`
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.add(role)
                                    memberData.rank -= 300
                                    memberData.exp -= 700; memberData.totalexp -= 700
                                    memberData.achievements.mythical -= 1
                                    memberData.save()
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

                                case `№4. Перерождение`: {
                                    role = `694914075460894791`
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.add(role)
                                    memberData.rank -= 300
                                    memberData.exp -= 700; memberData.totalexp -= 700
                                    memberData.achievements.mythical -= 1
                                    memberData.save()
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

                                case `№5. Просто мусор`: {
                                    role = `697796942134116382`
                                    if (!member.roles.cache.has(roles)) return interaction.reply({
                                        content: `У данного пользователя нет этого достижения!`, ephemeral: true
                                    })
                                    member.roles.add(role)
                                    memberData.rank -= 300
                                    memberData.exp -= 700; memberData.totalexp -= 700
                                    memberData.achievements.mythical -= 1
                                    memberData.save()
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

                default:
                    break
            }
        } catch (error) {
            await interaction.reply({
                content: `Достигнуто минимальное/максимальное количество достижений! (минимальное - 0, максимальное - 25)

Если вы считаете, что это ошибка, пожалуйста, сообщите об этом в канал <#${process.env.ask_channel}>!`,
                ephemeral: true
            })
        }
    }
}