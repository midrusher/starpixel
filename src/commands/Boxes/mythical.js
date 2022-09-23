const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType, ButtonStyle } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const wait = require(`node:timers/promises`).setTimeout
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { Temp } = require(`../../schemas/temp_items`);
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`mythical`)
        .setDescription(`Мифические предметы гильдии`)
        .addSubcommand(subcommand => subcommand
            .setName(`sun`)
            .setDescription(`Мифический предмет - Солнце`)
            .addUserOption(option => option
                .setName(`пользователь`)
                .setDescription(`Выберите пользователя, которому будет выдан подарок`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`mercury`)
            .setDescription(`Получите скидку в магазинах гильдии на 1 день`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`venera`)
            .setDescription(`Венера подарит вам эксклюзивный косметический значок`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`mars`)
            .setDescription(`Выполните задание и получите КРУТОЙ подарок от Марса`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`jupiter`)
            .setDescription(`Притяните всю любовь участников гильдии, использовав силу Юпитера`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`saturn`)
            .setDescription(`Вас кто-то обидел из участников гильдии? Вы можете наказать его, записав в свою книжечку`)
            .addUserOption(option => option
                .setName(`пользователь`)
                .setDescription(`Выберите пользователя, которого хотите наказать`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`uran`)
            .setDescription(`Вы можете поставить свой собственный косметический значок`)
            .addStringOption(option => option
                .setName(`значок`)
                .setDescription(`Ваш пользовательский значок после ника`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`neptune`)
            .setDescription(`Получите от Нептуна эксклюзивную косметическую рамку`)
        ),

    async execute(interaction, client) {
        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id, name: interaction.guild.name })

        const user = interaction.member
        const userData = await User.findOne({ userid: user.id })
        let role = ``

        switch (interaction.options.getSubcommand()) {
            case `sun`: {
                const member = interaction.options.getUser(`пользователь`)
                role = `781069817384927262`
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы должны иметь роль \`${interaction.guild.roles.cache.get(role).name}\`, чтобы использовать данную команду!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())

                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role]
                })

                const cd = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Вы не можете использовать эту команду`
                    })
                    .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.sun - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)

                if (userData.cooldowns.sun > Date.now()) return interaction.reply({
                    embeds: [cd],
                    ephemeral: true
                })

                if (user.user.id === member.id) return interaction.reply({
                    content: `Вы не можете выбрать в качестве пользователя самого себя!`,
                    ephemeral: true
                })
                const choices = [
                    {
                        name: `активности`,
                        gift: `В течение этой недели весь опыт активности в чатах будет в 2 раза больше у всех участников гильдии`
                    },
                    {
                        name: `богатства`,
                        gift: `Владелец торжества может подарить подписку VIP на 30 дней любому участнику гильдии`
                    },
                    {
                        name: `румбиков`,
                        gift: `Владелец торжества может подарить 50 <:Rumbik:883638847056003072> любому участнику гильдии`
                    }
                ]
                let r_choice = choices[Math.floor(Math.random() * choices.length)]
                await interaction.reply({
                    content: `☀️ ${user} использует силу Солнца!

┊　　┊　　┊ 　 ┊    　┊　　┊　　┊

┊　　┊　　┊ 　 ☆    　┊　　┊　　┊

┊　　┊　　 ✬ 　 　    　✬ 　   ┊　   ┊

┊　　★ 　　　 　 　    　　　　★　  ┊

☆ 　　　　　　 　 　    　　　　　　   ☆

Торжество ${r_choice.name}. ${r_choice.gift}.`,
                    fetchReply: true
                })
                if (r_choice.name == `активности`) {
                    const boost = new Temp({
                        userid: user.user.id,
                        guildid: interaction.guild.id,
                        boost: true,
                        expire: Date.now() + (1000 * 60 * 60 * 24 * 7)
                    })
                    boost.save()
                    guildData.act_exp_boost = 2
                    guildData.save()
                } else if (r_choice.name == `богатства`) {

                    await interaction.followUp({
                        content: `${user} выбрал пользователя ${member}!`
                    })

                    let prem_role = `850336260265476096`
                    const premium = new Temp({
                        userid: member.id,
                        guildid: interaction.guild.id,
                        roleid: prem_role,
                        expire: Date.now() + (1000 * 60 * 60 * 24 * 30)
                    })
                    premium.save()

                } else if (r_choice.name == `румбиков`) {
                    await interaction.followUp({
                        content: `${user} выбрал пользователя ${member}!`
                    })
                    const memberData = await User.findOne({ userid: member.id })
                    memberData.rumbik += 50
                    memberData.save()
                }
                userData.cooldowns.sun = Date.now() + (1000 * 60 * 60 * 24 * 30)
                userData.save()

            }

                break;
            case `mercury`: {
                role = `743831211667095592`
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы должны иметь роль \`${interaction.guild.roles.cache.get(role).name}\`, чтобы использовать данную команду!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())

                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role]
                })

                const cd = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Вы не можете использовать эту команду`
                    })
                    .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.mercury - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)

                if (userData.cooldowns.mercury > Date.now()) return interaction.reply({
                    embeds: [cd],
                    ephemeral: true
                })
                const discount = [{
                    name: `20%`,
                    disc: 0.2
                },
                {
                    name: `30%`,
                    disc: 0.3
                },
                {
                    name: `40%`,
                    disc: 0.4
                },
                {
                    name: `50%`,
                    disc: 0.5
                }]

                let r_disc = discount[Math.floor(Math.random() * discount.length)]

                await interaction.reply({
                    content: `◾ :star: ◾ 
:money_with_wings:  ${user} вы получаете скидку в **${r_disc.name}** на все товары в магазине.
Скидка действует ровно 24 часа. Следующую скидку вы можете получить через 1 месяц.
◾ :star: ◾ `
                })
                const disc = new Temp({
                    userid: user.id,
                    guildid: interaction.guild.id,
                    shop_disc: true,
                    expire: Date.now() + (1000 * 60 * 60 * 24)
                })
                disc.save()

                userData.shop_costs -= r_disc.disc;
                userData.cooldowns.mercury = Date.now() + (1000 * 60 * 60 * 24 * 30)
                userData.save()
            }

                break;
            case `venera`: {
                role = `597746062798880778`
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы должны иметь роль \`${interaction.guild.roles.cache.get(role).name}\`, чтобы использовать данную команду!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())

                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role]
                })

                const cd = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Вы не можете использовать эту команду`
                    })
                    .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.venera - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)

                if (userData.cooldowns.venera > Date.now()) return interaction.reply({
                    embeds: [cd],
                    ephemeral: true
                })

                const cosmetics = [
                    {
                        name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 💀`,
                        symbol: `💀`
                    },
                    {
                        name: `КОСМЕТИЧЕСКИЙ  ЗНАЧОК 👻`,
                        symbol: `👻`
                    },
                    {
                        name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🤡`,
                        symbol: `🤡`
                    },
                    {
                        name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🐠`,
                        symbol: `🐠`
                    },
                    {
                        name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🦴`,
                        symbol: `🦴`
                    },
                    {
                        name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🥕`,
                        symbol: `🥕`
                    },
                    {
                        name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🧀`,
                        symbol: `🧀`
                    },
                    {
                        name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 📦`,
                        symbol: `📦`
                    },
                    {
                        name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 💎`,
                        symbol: `💎`
                    },
                    {
                        name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🏆`,
                        symbol: `🏆`
                    },
                    {
                        name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🛒`,
                        symbol: `🛒`
                    },
                    {
                        name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🔒`,
                        symbol: `🔒`
                    }

                ]
                let r_cosm = cosmetics[Math.floor(Math.random() * cosmetics.length)]

                const setup = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('setup')
                            .setLabel('Установить')
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`⬆️`)
                    )


                const reply = await interaction.reply({
                    content: `:earth_americas: :bust_in_silhouette: :anchor: :star: :dash:
${user} обращается к Венере.
Она дарит ему легендарный косметический эмодзи \`${r_cosm.name}\`.
:beginner: Необходим ранг \"Чемпион гильдии\".
Если хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд..
:earth_americas: :bust_in_silhouette: :anchor: :star: :dash:`,
                    components: [setup],
                    fetchReply: true
                })

                const filter = i => i.customId === 'setup';

                reply.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000 })
                    .then(async (i) => {
                        if (i.user.id === user.user.id) {
                            if (r_cosm.name.startsWith(`КОСМЕТИЧЕСКИЙ ЭМОДЗИ`) && (user.roles.cache.has("553593136027533313") || user.roles.cache.has("553593976037310489") || user.roles.cache.has("780487593485008946") || user.roles.cache.has("849695880688173087") || user.roles.cache.has("992122876394225814") || user.roles.cache.has("992123019793276961") || user.roles.cache.has("992123014831419472"))) {
                                userData.displayname.symbol = r_cosm.symbol
                                await setup.components[0]
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji(`🕓`)
                                .setLabel(`Идёт обработка...`)
                                i.reply({
                                    content: `Ожидайте! Скоро ваш значок будет установлен! Если этого не произойдет в течение 15 минут, обратитесь в вопрос-модерам!`,
                                    ephemeral: true
                                })
                            }
                            else {
                                i.reply({
                                content: `Вы не можете установить себе данный предмет, так как не получили минимальный ранг. Посмотреть минимальный ранг для данного действия вы можете в канале <#931620901882068992>!`,
                                ephemeral: true
                            })
                            await setup.components[0]
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji(`❌`)
                                .setLabel(`Низкий ранг`)
                        }
                            
                            await interaction.editReply({
                                content: `:earth_americas: :bust_in_silhouette: :anchor: :star: :dash:
${user} обращается к Венере.
Она дарит ему легендарный косметический эмодзи \`${r_cosm.name}\`.
:beginner: Необходим ранг \"Чемпион гильдии\".
Если хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд..
:earth_americas: :bust_in_silhouette: :anchor: :star: :dash:`,
                                components: [setup]
                            })

                        } else {
                            i.reply({ content: `Вы не можете использовать данную кнопочку!`, ephemeral: true });
                        }
                    })
                    .catch(async (err) => {
                        await setup.components[0]
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary)
                            .setLabel(`Отменено`)
                            .setEmoji(`❌`)

                        await interaction.editReply({
                            content: `:earth_americas: :bust_in_silhouette: :anchor: :star: :dash:
${user} обращается к Венере.
Она дарит ему легендарный косметический эмодзи \`${r_cosm.name}\`.
:beginner: Необходим ранг \"Чемпион гильдии\".
Если хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд..
:earth_americas: :bust_in_silhouette: :anchor: :star: :dash:`,
                            components: [setup]
                        })
                    });

                userData.cooldowns.venera = Date.now() + (1000 * 60 * 60 * 24 * 30)
                userData.save()
            }

                break;
            case `mars`: {
                role = `597746057203548160`
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы должны иметь роль \`${interaction.guild.roles.cache.get(role).name}\`, чтобы использовать данную команду!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())

                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role]
                })

                const cd = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Вы не можете использовать эту команду`
                    })
                    .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.mars - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)

                if (userData.cooldowns.mars > Date.now()) return interaction.reply({
                    embeds: [cd],
                    ephemeral: true
                })

                const quest = [
                    {
                        quest: `Победить в Bed Wars 100 раз`,
                        rewars: `200<:Rumbik:883638847056003072>`
                    },
                    {
                        quest: `Победить в SkyWars 200 раз`,
                        rewars: `200<:Rumbik:883638847056003072>`
                    },
                    {
                        quest: `Набить за неделю 500 000 GXP`,
                        rewars: `5000🌀`
                    },
                    {
                        quest: `Победить в TNT Games 100 раз`,
                        rewars: `500💠`
                    },
                    {
                        quest: `Победить в Murder Mystery 300 раз`,
                        rewars: `Подарок судьбы`
                    },
                    {
                        quest: `Победить в Bed Wars 100 раз`,
                        rewars: `Подписка VIP на 90 дней`
                    },

                ]

                const r_quest = quest[Math.floor(Math.random() * quest.length)]

                await interaction.reply({
                    content: `:older_woman: ${user} просит помощи у Марса!

:scroll: Для это ему необходимо пройти испытание:
\`${r_quest.quest}\`
:crown: В качестве награды он получит ${r_quest.rewars}!
💒 Отправляйте скриншоты в канал <#932188201051889674>, а затем напишите в вопрос-модерам, чтобы получить награду!

Повторно попросить помощь у Марса можно через 3 месяца!`
                })

                userData.cooldowns.mars = Date.now() + (1000 * 60 * 60 * 24 * 90)
                userData.save()
            }

                break;
            case `jupiter`: {
                role = `597746054808731648`
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы должны иметь роль \`${interaction.guild.roles.cache.get(role).name}\`, чтобы использовать данную команду!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())

                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role]
                })

                const cd = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Вы не можете использовать эту команду`
                    })
                    .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.jupiter - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)

                if (userData.cooldowns.jupiter > Date.now()) return interaction.reply({
                    embeds: [cd],
                    ephemeral: true
                })
                const rewards = [
                    {
                        name: `🎁 КОРОЛЕВСКАЯ /king`,
                        roleID: `584673040470769667`,
                    },
                    {
                        name: `💰 МЕШОЧЕК /bag`,
                        roleID: `819930814388240385`,
                    },
                    {
                        name: `🎁 БОЛЬШАЯ /big`,
                        roleID: `521248091853291540`,
                    },
                    {
                        name: `🎁 МАЛЕНЬКАЯ /small`,
                        roleID: `510932601721192458`,
                    },
                    {
                        name: `🎁 ОГРОМНАЯ /megabox`,
                        roleID: `992820494900412456`,
                    },
                ]
                let r_1 = rewards[Math.floor(Math.random() * rewards.length)]
                let r_2 = rewards[Math.floor(Math.random() * rewards.length)]


                await interaction.reply({
                    content: `:magnet: :sparkles: :magnet: :sparkles: :magnet: :sparkles: 
${user} использует **СИЛУ ЮПИТЕРА**    @here 

Юпитер притягивает ко всем другим участникам:
- \`${r_1.name}\`
- \`${r_2.name}\`
:magnet: :sparkles: :magnet: :sparkles: :magnet: :sparkles: `
                })

                const members = await interaction.guild.members.fetch()
                await members.filter(m => !m.user.bot && m.roles.cache.has(`504887113649750016`)).forEach(member => member.roles.add([r_1.roleID, r_2.roleID]).catch())

                userData.cooldowns.jupiter = Date.now() + (1000 * 60 * 60 * 24 * 365)
                userData.save()
            }

                break;
            case `saturn`: {
                role = `597746059879645185`
                
                const member = interaction.options.getUser(`пользователь`)
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы должны иметь роль \`${interaction.guild.roles.cache.get(role).name}\`, чтобы использовать данную команду!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())

                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role]
                })

                const cd = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Вы не можете использовать эту команду`
                    })
                    .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.saturn - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)

                if (userData.cooldowns.saturn > Date.now()) return interaction.reply({
                    embeds: [cd],
                    ephemeral: true
                })

                if (user.user.id === member.id) return interaction.reply({
                    content: `Вы не можете выбрать в качестве пользователя самого себя!`,
                    ephemeral: true
                })
                const items = [`случайная эмоция`, `случайная звезда`, `случайный питомец`, `случайная стихия`, `случайная картинка`]
                let r_item = items[Math.floor(Math.random() * items.length)]

                await interaction.reply({
                    content: `📔  📔  📔  📔  📔
${user} использует силу Сатурна, чтобы наказать ${member} за плохое поведение. 
\`У участника пропадает 1 ${r_item} в профиле.\`
📔  📔  📔  📔  📔`
                })
                if (r_item == `случайная эмоция`) {
                    let to_lose = [
                        `566528019208863744`,
                        `571743750049497089`,
                        `571745411929341962`,
                        `571744516894228481`,
                        `571757459732168704`,
                        `571757461380399106`,
                        `571757463876141077`,
                        `642810527579373588`,
                        `642393088689700893`,
                        `636561006721761301`,
                        `607495941490212885`,
                        `694221126494060604`,
                        `740241984190545971`,
                    ]

                    let r_lose = to_lose[Math.floor(Math.random() * to_lose.length)]

                    await member.roles.remove(r_lose)
                } else if (r_item == `случайная звезда`) {
                    let to_lose = [
                        `553660090184499201`,
                        `553660091677540363`,
                        `553660093523034112`,
                        `553660095259475989`,
                        `553660095951667217`,
                        `553660097520205824`,
                        `572417192755462165`,
                        `595962185641885716`,
                        `609082751349686282`
                    ]

                    let r_lose = to_lose[Math.floor(Math.random() * to_lose.length)]

                    await member.roles.remove(r_lose)
                } else if (r_item == `случайный питомец`) {
                    let to_lose = [
                        `553637207911563264`,
                        `553638061817200650`,
                        `605696079819964426`,
                        `553638054238093364`
                    ]

                    let r_lose = to_lose[Math.floor(Math.random() * to_lose.length)]

                    await member.roles.remove(r_lose)
                } else if (r_item == `случайная стихия`) {
                    let to_lose = [
                        `930169143347523604`,
                        `930169139866259496`,
                        `930169133671280641`,
                        `930169145314652170`
                    ]

                    let r_lose = to_lose[Math.floor(Math.random() * to_lose.length)]

                    await member.roles.remove(r_lose)
                } else if (r_item == `случайная картинка`) {
                    let to_lose = [
                        `850079153746346044`,
                        `850079142413598720`,
                        `850079173149065277`,
                        `642810535737425930`,
                        `642810538518118430`,
                        `642819600429481997`,
                        `850079134700666890`,
                        `893927886766096384`,
                        `694914077104799764`
                    ]

                    let r_lose = to_lose[Math.floor(Math.random() * to_lose.length)]

                    await member.roles.remove(r_lose)
                }
                userData.cooldowns.saturn = Date.now() + (1000 * 60 * 60 * 24 * 30)
                userData.save()


            }

                break;
            case `uran`: {
                role = `745326453369077841`
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы должны иметь роль \`${interaction.guild.roles.cache.get(role).name}\`, чтобы использовать данную команду!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())

                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role]
                })

                const symbol = interaction.options.getString(`значок`)
                userData.displayname.symbol = symbol;
                await user.roles.remove(role)

                await interaction.reply({
                    content: `${user} решил установить значок ${symbol}! Он изменится в течение 15-ти минут. Если этого не произойдет, пожалуйста, обратитесь в вопрос-модерам!

Предпросмотр вашего никнейма в Discord: \`「${userData.displayname.rank}」 ${userData.displayname.ramka1}${userData.displayname.name}${userData.displayname.ramka2}${userData.displayname.suffix} ${userData.displayname.symbol}┇ ${userData.displayname.premium}\``
                })
                userData.save()
            }

                break;
            case `neptune`: {
                role = `780487592859795456`
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы должны иметь роль \`${interaction.guild.roles.cache.get(role).name}\`, чтобы использовать данную команду!`)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())

                if (!user.roles.cache.has(role)) return interaction.reply({
                    embeds: [no_role]
                })

                const cd = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setAuthor({
                        name: `Вы не можете использовать эту команду`
                    })
                    .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.neptune - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)

                if (userData.cooldowns.neptune > Date.now()) return interaction.reply({
                    embeds: [cd],
                    ephemeral: true
                })

                if (user.user.id === member.id) return interaction.reply({
                    content: `Вы не можете выбрать в качестве пользователя самого себя!`,
                    ephemeral: true
                })

                const ramkas = [
                    {
                        name: `РАМКА ДЛЯ НИКА ❦`,
                        r1: `❦`,
                        r2: `❦`
                    },
                    {
                        name: `РАМКА ДЛЯ НИКА ஐ`,
                        r1: `ஐ`,
                        r2: `ஐ`
                    },
                    {
                        name: `РАМКА ДЛЯ НИКА ❀`,
                        r1: `❀`,
                        r2: `❀`
                    },
                    {
                        name: `РАМКА ДЛЯ НИКА ❉`,
                        r1: `❉`,
                        r2: `❉`
                    },
                    {
                        name: `РАМКА ДЛЯ НИКА ✾`,
                        r1: `✾`,
                        r2: `✾`
                    },
                    {
                        name: `РАМКА ДЛЯ НИКА ◉`,
                        r1: `◉`,
                        r2: `◉`
                    },
                    {
                        name: `РАМКА ДЛЯ НИКА ⊙`,
                        r1: `⊙`,
                        r2: `⊙`
                    },
                    {
                        name: `РАМКА ДЛЯ НИКА ට`,
                        r1: `ට`,
                        r2: `ට`
                    },
                    {
                        name: `РАМКА ДЛЯ НИКА 益`,
                        r1: `益`,
                        r2: `益`
                    },
                    {
                        name: `РАМКА ДЛЯ НИКА ௸`,
                        r1: `௸`,
                        r2: `௸`
                    },
                    {
                        name: `РАМКА ДЛЯ НИКА ௵`,
                        r1: `௵`,
                        r2: `௵`
                    }
                ]

                const r_ramka = ramkas[Math.floor(Math.random() * ramkas.length)]
                const setup = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('setup')
                            .setLabel('Установить')
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`⬆️`)
                    )
                await interaction.reply({
                    content: `◾
🧥 ${user}... Нептун зовёт тебя.
В этот раз он даёт тебе \`${r_ramka.name}\`!
:crystal_ball: Необходим ранг \"Легенда гильдии\".
Если хотите установить рамку, нажмите кнопку \"Установить\" в течение 60 секунд...
◾`,
                    components: [setup],
                    fetchReply: true
                });

                const filter = i => i.customId === 'setup';

                reply.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000 })
                    .then(async (i) => {
                        if (i.user.id === user.user.id) {
                            if (r_cosm.name.startsWith(`РАМКА ДЛЯ НИКА`) && (user.roles.cache.has("553593976037310489") || user.roles.cache.has("780487593485008946") || user.roles.cache.has("849695880688173087") || user.roles.cache.has("992122876394225814") || user.roles.cache.has("992123019793276961") || user.roles.cache.has("992123014831419472"))) {
                                userData.displayname.ramka1 = r_ramka.r1
                                userData.displayname.ramka2 = r_ramka.r2
                                i.reply({
                                    content: `Ожидайте! Скоро ваша рамка будет установлена! Если этого не произойдет в течение 15 минут, обратитесь в вопрос-модерам!`,
                                    ephemeral: true
                                })
                                await setup.components[0]
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji(`🕓`)
                                .setLabel(`Идёт обработка...`)
                            }
                            else {
                                await setup.components[0]
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji(`❌`)
                                .setLabel(`Низкий ранг`)

                                i.reply({
                                content: `Вы не можете установить себе данный предмет, так как не получили минимальный ранг. Посмотреть минимальный ранг для данного действия вы можете в канале <#931620901882068992>!`,
                                ephemeral: true
                            })
                        }

                            await interaction.editReply({
                                content: `◾
🧥 ${user}... Нептун зовёт тебя.
В этот раз он даёт тебе \`${r_ramka.name}\`!
:crystal_ball: Необходим ранг \"Легенда гильдии\".
Если хотите установить рамку, нажмите кнопку \"Установить\" в течение 60 секунд...
◾`,
                                components: [setup]
                            })
                            i.reply({
                                content: `Ожидайте! Скоро ваша рамка будет установлена! Если этого не произойдет в течение 15 минут, обратитесь в вопрос-модерам!`
                            })

                        } else {
                            i.reply({ content: `Вы не можете использовать данную кнопочку!`, ephemeral: true });
                        }
                    })
                    .catch(async (err) => {
                        await setup.components[0]
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary)
                            .setLabel(`Отменено`)
                            .setEmoji(`❌`)

                        await interaction.editReply({
                            content: `◾
🧥 ${user}... Нептун зовёт тебя.
В этот раз он даёт тебе \`${r_ramka.name}\`!
:crystal_ball: Необходим ранг \"Легенда гильдии\".
Если хотите установить рамку, нажмите кнопку \"Установить\" в течение 60 секунд...
◾`,
                            components: [setup]
                        })
                    });

                    userData.cooldowns.neptune = Date.now() + (1000 * 60 * 60 * 24 * 30)
                    userData.save()
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