const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ
const ch_list = require(`../../discord structure/channels.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`pets`)
        .setDescription(`Питомцы гильдии Starpixel`)
        .addSubcommand(subcommand => subcommand
            .setName(`spet`)
            .setDescription(`Отправить питомца земли на поиски`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`epet`)
            .setDescription(`Отправить питомца воздуха на поиски`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`lpet`)
            .setDescription(`Отправить питомца воды на поиски`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`mpet`)
            .setDescription(`Отправить питомца огня на поиски`)
        ),

    async execute(interaction, client) {
        const user = interaction.member
        const userData = await User.findOne({ userid: user.id })
        let role = ``
        switch (interaction.options.getSubcommand()) {
            case `spet`: {
                role = `553637207911563264`
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(role).name}\`!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role],
                    ephemeral: true
                })

                const cd = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Вы не можете использовать эту команду`
                    })
                    .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.spet - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)

                if (userData.cooldowns.spet > Date.now()) return interaction.reply({
                    embeds: [cd],
                    ephemeral: true
                })

                await interaction.deferReply({
                    fetchReply: true
                })
                await interaction.deleteReply()

                try {
                    let pet = [
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Выращивание горных пород\`. 🌳"
                        },
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Быстрый рост растений\`. 🌳"
                        },
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Перемещение под землёй\`. 🌳"
                        },
                        {
                            dropChance: 45,
                            name: "Он не получает никакого урока."
                        },


                    ]

                    let sum_act = 0;
                    for (let i_act = 0; i_act < pet.length; i_act++) {
                        sum_act += pet[i_act].dropChance;
                    }
                    let r_act = Math.floor(Math.random() * sum_act);
                    let i_act = 0;
                    for (let s = pet[0].dropChance; s <= r_act; s += pet[i_act].dropChance) {
                        i_act++;
                    }

                    interaction.guild.channels.cache.get(ch_list.elem).send(
                        `:black_medium_small_square:
${user} отправился на обучение к Питомцу Земли 🐛.
╭──────────╮
${pet[i_act].name}
╰──────────╯
:black_medium_small_square:`
                    );
                    if (pet[i_act].name == `Он получает урок навыка \`Выращивание горных пород\`. 🌳` && userData.elements.mountains < 1) {
                        userData.elements.mountains += 1
                        userData.cooldowns.spet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))
                    } else if (pet[i_act].name == `Он получает урок навыка \`Быстрый рост растений\`. 🌳` && userData.elements.fast_grow < 1) {
                        userData.elements.fast_grow += 1
                        userData.cooldowns.spet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))
                    } else if (pet[i_act].name == `Он получает урок навыка \`Перемещение под землёй\`. 🌳` && userData.elements.underground < 1) {
                        userData.elements.underground += 1
                        userData.cooldowns.spet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))
                    } else {
                        userData.cooldowns.spet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))
                    }
                } catch (error) {
                    console.log(chalk.red(`[Превышен лимит навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))
                }


            }

                break;
            case `epet`: {
                role = `553638054238093364`
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(role).name}\`!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role],
                    ephemeral: true
                })

                const cd = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Вы не можете использовать эту команду`
                    })
                    .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.epet - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)

                if (userData.cooldowns.epet > Date.now()) return interaction.reply({
                    embeds: [cd],
                    ephemeral: true
                })

                await interaction.deferReply({
                    fetchReply: true
                })
                await interaction.deleteReply()

                try {
                    let pet = [
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Полёт в небесах\`. 🌪️"
                        },
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Повеление ветром\`. 🌪️"
                        },
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Орлиный глаз\`. 🌪️"
                        },
                        {
                            dropChance: 45,
                            name: "Он не получает никакого урока."
                        },


                    ]

                    let sum_act = 0;
                    for (let i_act = 0; i_act < pet.length; i_act++) {
                        sum_act += pet[i_act].dropChance;
                    }
                    let r_act = Math.floor(Math.random() * sum_act);
                    let i_act = 0;
                    for (let s = pet[0].dropChance; s <= r_act; s += pet[i_act].dropChance) {
                        i_act++;
                    }

                    interaction.guild.channels.cache.get(ch_list.elem).send(
                        `:black_medium_small_square:
${user} отправился на обучение к Питомцу Воздуха 🕊️.
╭──────────╮
${pet[i_act].name}
╰──────────╯
:black_medium_small_square:`
                    );
                    if (pet[i_act].name == `Он получает урок навыка \`Полёт в небесах\`. 🌪️` && userData.elements.flying < 1) {
                        userData.elements.flying += 1
                        userData.cooldowns.epet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))

                    } else if (pet[i_act].name == `Он получает урок навыка \`Повеление ветром\`. 🌪️` && userData.elements.wind < 1) {
                        userData.elements.wind += 1
                        userData.cooldowns.epet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))

                    } else if (pet[i_act].name == `Он получает урок навыка \`Орлиный глаз\`. 🌪️` && userData.elements.eagle_eye < 1) {
                        userData.elements.eagle_eye += 1
                        userData.cooldowns.epet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))

                    } else {
                        userData.cooldowns.epet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))
                    }

                } catch (error) {
                    console.log(chalk.red(`[Превышен лимит навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))
                }


            }

                break;
            case `lpet`: {
                role = `553638061817200650`
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(role).name}\`!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role],
                    ephemeral: true
                })
                const cd = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Вы не можете использовать эту команду`
                    })
                    .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.lpet - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)

                if (userData.cooldowns.lpet > Date.now()) return interaction.reply({
                    embeds: [cd],
                    ephemeral: true
                })
                await interaction.deferReply({
                    fetchReply: true
                })
                await interaction.deleteReply()

                try {
                    let pet = [
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Плавание на глубине\`. 🌊"
                        },
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Сопротивление течениям\`. 🌊"
                        },
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Подводное дыхание\`. 🌊"
                        },
                        {
                            dropChance: 45,
                            name: "Он не получает никакого урока."
                        },


                    ]

                    let sum_act = 0;
                    for (let i_act = 0; i_act < pet.length; i_act++) {
                        sum_act += pet[i_act].dropChance;
                    }
                    let r_act = Math.floor(Math.random() * sum_act);
                    let i_act = 0;
                    for (let s = pet[0].dropChance; s <= r_act; s += pet[i_act].dropChance) {
                        i_act++;
                    }

                    interaction.guild.channels.cache.get(ch_list.elem).send(
                        `:black_medium_small_square:
${user} отправился на обучение к Питомцу Воды 🐋.
╭──────────╮
${pet[i_act].name}
╰──────────╯
:black_medium_small_square:`
                    );
                    if (pet[i_act].name == `Он получает урок навыка \`Плавание на глубине\`. 🌊` && userData.elements.diving < 1) {
                        userData.elements.diving += 1
                        userData.cooldowns.lpet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))

                    } else if (pet[i_act].name == `Он получает урок навыка \`Сопротивление течениям\`. 🌊` && userData.elements.resistance < 1) {
                        userData.elements.resistance += 1
                        userData.cooldowns.lpet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))

                    } else if (pet[i_act].name == `Он получает урок навыка \`Подводное дыхание\`. 🌊` && userData.elements.respiration < 1) {
                        userData.elements.respiration += 1
                        userData.cooldowns.lpet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))

                    } else {
                        userData.cooldowns.lpet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))
                    }

                } catch (error) {
                    console.log(chalk.red(`[Превышен лимит навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))
                }


            }

                break;
            case `mpet`: {
                role = `605696079819964426`
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(role).name}\`!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role],
                    ephemeral: true
                })
                const cd = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Вы не можете использовать эту команду`
                    })
                    .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.mpet - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)

                if (userData.cooldowns.mpet > Date.now()) return interaction.reply({
                    embeds: [cd],
                    ephemeral: true
                })
                await interaction.deferReply({
                    fetchReply: true
                })
                await interaction.deleteReply()

                try {
                    let pet = [
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Защита от огня\`. 🔥"
                        },
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Удар молнии\`. 🔥"
                        },
                        {
                            dropChance: 18,
                            name: "Он получает урок навыка \`Управление пламенем\`. 🔥"
                        },
                        {
                            dropChance: 45,
                            name: "Он не получает никакого урока."
                        },


                    ]

                    let sum_act = 0;
                    for (let i_act = 0; i_act < pet.length; i_act++) {
                        sum_act += pet[i_act].dropChance;
                    }
                    let r_act = Math.floor(Math.random() * sum_act);
                    let i_act = 0;
                    for (let s = pet[0].dropChance; s <= r_act; s += pet[i_act].dropChance) {
                        i_act++;
                    }

                    interaction.guild.channels.cache.get(ch_list.elem).send(
                        `:black_medium_small_square:
${user} отправился на обучение к Питомцу Огня 🐲.
╭──────────╮
${pet[i_act].name}
╰──────────╯
:black_medium_small_square:`
                    );
                    if (pet[i_act].name == `Он получает урок навыка \`Защита от огня\`. 🔥` && userData.elements.fire_resistance < 1) {
                        userData.elements.fire_resistance += 1
                        userData.cooldowns.mpet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))

                    } else if (pet[i_act].name == `Он получает урок навыка \`Удар молнии\`. 🔥` && userData.elements.lightning < 1) {
                        userData.elements.lightning += 1
                        userData.cooldowns.mpet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))

                    } else if (pet[i_act].name == `Он получает урок навыка \`Управление пламенем\`. 🔥` && userData.elements.flame < 1) {
                        userData.elements.flame += 1
                        userData.cooldowns.mpet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))

                    } else {
                        userData.cooldowns.mpet = Date.now() + (1000 * 60 * 60 * 24 * 4)
                        userData.save()
                        console.log(chalk.magenta(`[Получен навык навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))
                    }

                } catch (error) {
                    console.log(chalk.red(`[Превышен лимит навыков]`) + chalk.white(`: ${user.user.username} превысил количество навыка ${pet[i_act].name}`))
                }


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