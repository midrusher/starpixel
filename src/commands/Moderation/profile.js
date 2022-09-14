const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require('discord.js');
const fetch = require(`node-fetch`);
const wait = require(`node:timers/promises`).setTimeout
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`profile`)
        .setDescription(`Профиль игрока`)
        .addSubcommand(subcommand => subcommand
            .setName(`create`)
            .setDescription(`Создать профиль игрока`)
            .addUserOption(option => option
                .setName(`пользователь`)
                .setDescription(`Пользователь в Discord`)
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName(`имя`)
                .setDescription(`Реальное имя пользователя`)
                .setRequired(true)
            )
            .addIntegerOption(option => option
                .setName(`возраст`)
                .setDescription(`Возраст пользователя`)
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName(`никнейм`)
                .setDescription(`Никнейм в Minecraft`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`update`)
            .setDescription(`Обновить свой профиль`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`delete`)
            .setDescription(`Удалить профиль игрока`)
            .addStringOption(option => option
                .setName(`id`)
                .setDescription(`ID в Discord`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`reset`)
            .setDescription(`Сбросить свой профиль (Владыка+)`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`updateall`)
            .setDescription(`Обновить профиль всех участников`)
        )
        .addSubcommandGroup(group => group
            .setName(`set`)
            .setDescription(`Установить данные  в профиле игрока`)
            .addSubcommand(subcommand => subcommand
                .setName(`string`)
                .setDescription(`Установить текстовое значение (ники, id и пр.)`)
                .addStringOption(option => option
                    .setName(`id`)
                    .setDescription(`ID пользователя в Discord`)
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(`опция`)
                    .setDescription(`Установить опцию, которую необходимо изменить`)
                    .setRequired(true)
                    .setAutocomplete(true)
                )
                .addStringOption(option => option
                    .setName(`значение`)
                    .setDescription(`Установить значение для опции`)
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand => subcommand
                .setName(`number`)
                .setDescription(`Установить числовое значение (опыт, уровень и т.д.)`)
                .addStringOption(option => option
                    .setName(`id`)
                    .setDescription(`ID пользователя в Discord`)
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(`опция`)
                    .setDescription(`Установить опцию, которую необходимо изменить`)
                    .setRequired(true)
                    .setAutocomplete(true)
                )
                .addNumberOption(option => option
                    .setName(`значение`)
                    .setDescription(`Установить значение для опции`)
                    .setRequired(true)
                    .setMinValue(0)
                )
            )
            .addSubcommand(subcommand => subcommand
                .setName(`boolean`)
                .setDescription(`Установить значение true / false`)
                .addStringOption(option => option
                    .setName(`id`)
                    .setDescription(`ID пользователя в Discord`)
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(`опция`)
                    .setDescription(`Установить опцию, которую необходимо изменить`)
                    .setRequired(true)
                    .setAutocomplete(true)
                )
                .addBooleanOption(option => option
                    .setName(`значение`)
                    .setDescription(`Установить значение для опции`)
                    .setRequired(true)
                )
            )
        ),

    async autoComplete(interaction, client) {
        switch (interaction.options.getSubcommandGroup()) {
            case `set`: {
                switch (interaction.options.getSubcommand()) {
                    case `string`: {
                        const focusedValue = interaction.options.getFocused();
                        const choices = [
                            'ID в Discord',
                            'UUID в Minecraft'
                        ];
                        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
                        await interaction.respond(
                            filtered.map(choice => ({ name: choice, value: choice })),
                        );
                    }

                        break;

                    case `number`: {
                        const focusedValue = interaction.options.getFocused();
                        const choices = [
                            `Возраст`,
                            'Опыт активности',
                            'Уровень активности',
                            'Опыт рангов',
                            'Румбики',
                            'Опыт гильдии (GEXP)',
                            'Билеты',
                            `Медаль 🥇`,
                            `Медаль 🥈`,
                            `Медаль 🥉`,
                            'Цены в магазине',
                            'Цены в магазине активности',
                            `Цены в королевском магазине`,
                            `Персональный бустер опыта активности`,
                            `Обычные достижения`,
                            `Мифические достижения`,

                            `Навык "Перемещение под землёй" (Земля)`,
                            `Навык "Быстрый рост растений" (Земля)`,
                            `Навык "Выращивание горных пород" (Земля)`,
                            `Навык "Плавание на глубине" (Вода)`,
                            `Навык "Сопротивление течениям" (Вода)`,
                            `Навык "Подводное дыхание" (Вода)`,
                            `Навык "Защита от огня" (Огонь)`,
                            `Навык "Удар молнии" (Огонь)`,
                            `Навык "Управление пламенем" (Огонь)`,
                            `Навык "Полет в небесах" (Воздух)`,
                            `Навык "Повеление ветром" (Воздух)`,
                            `Навык "Орлиный глаз" (Воздух)`,

                            `Перк "Повышение опыта рангов"`,
                            `Перк "Скидка в королевском магазине"`,
                            `Перк "Скидка в магазине активности"`,
                            `Перк "Скидка в обычном магазине гильдии"`,
                            `Перк "Увеличение времени действия временных предметов"`,
                            `Перк "Возможность продавать предметы из профиля"`,
                            `Перк "Уменьшение опыта гильдии для получения билета"`,
                            `Перк "Изменение предметов"`,



                        ];
                        const filtered = choices.filter(choice => choice.startsWith(focusedValue)).slice(0, 25);
                        await interaction.respond(
                            filtered.map(choice => ({ name: choice, value: choice })),
                        );
                    }

                        break;
                    case `boolean`: {
                        const focusedValue = interaction.options.getFocused();
                        const choices = [
                            'Пользовательский значок ранга',
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
        switch (interaction.options.getSubcommand()) {
            case `create`: {
                const realname = interaction.options.getString(`имя`)
                const age = interaction.options.getInteger(`возраст`)
                if (age <= 0) return interaction.reply({
                    content: `Возраст не может быть отрицательным!`,
                    ephemeral: true
                })

                const user = interaction.options.getUser(`пользователь`)
                const playername = interaction.options.getString(`никнейм`)
                if (!interaction.member.roles.cache.has(`320880176416161802`)) {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `❗ Отсутствует необходимая роль!`
                        })
                        .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`320880176416161802`).name}\`!
Но вы всё ещё можете использовать команду \`/profile update\``)
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())

                    return interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                }
                else if (interaction.member.roles.cache.has(`320880176416161802`)) {

                    const userData = new User({ userid: user.id, name: user.username })
                    const creator = await User.findOne({ userid: interaction.member.user.id }) || new User({ userid: interaction.member.user.id, name: interaction.member.user.username })

                    if (creator.cooldowns.prof_create > Date.now()) return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({
                                    name: `Команда на перезарядке!`
                                })
                                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                                .setColor(`DarkRed`)
                                .setTimestamp(Date.now())
                                .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.prof_create - Date.now(), { secondsDecimalDigits: 0 })}!`)
                        ],
                        ephemeral: true
                    });
                    const memberDM = await interaction.guild.members.fetch(user.id)

                    let response = await fetch(`https://api.hypixel.net/player?key=${api}&name=${playername}`)
                    if (response.ok) {
                        try {
                            let json = await response.json()

                            console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Ник игрока - ${json.player.displayname}, UUID - ${json.player.uuid}`))
                            userData.nickname = json.player.displayname;
                            userData.markModified(`nickname`)
                            userData.uuid = json.player.uuid;
                            userData.markModified(`uuid`)
                            userData.cooldowns.prof_update = Date.now() + (1000 * 60 * 60 * 24)
                            creator.cooldowns.prof_create = Date.now() + (1000 * 60)
                            creator.markModified(`prof_create`)
                        } catch (error) {
                            userData.delete();
                            interaction.reply({
                                embeds: [new EmbedBuilder().setAuthor({ name: `Ошибка!` }).setDescription(`Игрок ${playername} не найден! Проверьте правильность введённых данных`).setThumbnail(`https://i.imgur.com/6IE3lz7.png`).setColor(`DarkRed`).setTimestamp(Date.now())],
                                ephemeral: true
                            });
                            console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Игрока с никнеймом ${playername} не существует `));
                            return;
                        }
                    }

                    userData.age = age
                    userData.displayname.name = realname

                    const roles = [
                        `553593731953983498`,
                        `504887113649750016`,
                        `721047643370815599`,
                        `702540345749143661`,
                        `746440976377184388`,
                        `722523773961633927`,
                        `849533128871641119`,
                        `709753395417972746`,
                        `722533819839938572`,
                        `722523856211935243`,
                    ]
                    const randombox = [
                        `819930814388240385`,
                        `510932601721192458`,
                        `521248091853291540`,
                        `584673040470769667`,
                        `893932177799135253`,
                        `925799156679856240`,
                        `1007718117809606736`,
                        `992820494900412456`
                    ]
                    let rloot1 = randombox[Math.floor(Math.random() * randombox.length)];
                    await memberDM.roles.add(roles).catch()
                    await memberDM.roles.add(rloot1).catch()
                    await memberDM.roles.remove(`920346035811917825`).catch()

                    creator.save()
                    userData.save()
                    if (memberDM.user.id !== `491343958660874242`) {
                        memberDM.setNickname(`「${userData.displayname.rank}」 ${userData.displayname.ramka1}${userData.displayname.name}${userData.displayname.ramka2}${userData.displayname.suffix} ${userData.displayname.symbol}┇ ${userData.displayname.premium}`)
                    }

                    const success = new EmbedBuilder()
                        .setAuthor({
                            name: `Профиль успешно создан!`
                        })
                        .setColor(process.env.bot_color)
                        .setDescription(`Профиль пользователя ${interaction.options.getUser(`пользователь`)} (${userData.nickname}) был успешно создан. В течение определенного времени он будет добавлен в канал с участниками!`)
                        .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                        .setTimestamp(Date.now())

                    interaction.reply({
                        embeds: [success]
                    })
                    await interaction.guild.channels.cache.get(process.env.main_channel).send({
                        content: `Профиль пользователя ${interaction.options.getUser(`пользователь`)} (\`${userData.nickname}\`) был успешно создан. Необходимые роли были добавлены. Случайный приветственный подарок был получен. Никнейм будет в скором времени автоматически установлен!`
                    })
                    console.log(chalk.cyan(`[База данных]`) + chalk.gray(`: Профиль пользователя ${userData.name} (${userData.nickname}) был успешно создан!`))

                }
            }

                break;
            case `update`: {
                const user = interaction.member.user;
                const userData = await User.findOne({ userid: user.id });
                if (userData.cooldowns.prof_update > Date.now()) return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setAuthor({
                            name: `Команда на перезарядке!`
                        })
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())
                        .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.prof_update - Date.now(), { secondsDecimalDigits: 0 })}!`)
                    ]
                })
                userData.name = user.username
                let response = await fetch(`https://api.hypixel.net/player?key=${api}&uuid=${userData.uuid}`)
                if (response.ok) {
                    try {
                        let json = await response.json()

                        console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Ник игрока - ${json.player.displayname}, UUID - ${json.player.uuid}. Профиль обновлён!`))
                        userData.nickname = json.player.displayname;
                        userData.markModified(`nickname`)
                        userData.cooldowns.prof_update = Date.now() + (1000 * 60 * 60 * 24)
                        userData.markModified(`prof_update`)

                    } catch (error) {
                        interaction.reply({
                            embeds: [new EmbedBuilder().setAuthor({ name: `Ошибка!` }).setDescription(`Игрок ${userData.uuid} не найден! Обратитесь в поддержку гильдии Starpixel!`).setThumbnail(`https://i.imgur.com/6IE3lz7.png`).setColor(`DarkRed`).setTimestamp(Date.now())],
                            ephemeral: true
                        });
                        console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Игрока с UUID ${userData.uuid} не существует`));
                        return;
                    }
                }
                const tickets_before = userData.tickets
                let responseA = await fetch(`https://api.hypixel.net/guild?key=${api}&player=${userData.uuid}`)
                if (responseA.ok) {
                    try {
                        let json = await responseA.json()
                        var i = 0
                        while (json.guild.members[i].uuid !== userData.uuid) {
                            console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Участник ${json.guild.members[i].uuid} не является пользователем ${userData.uuid}`))
                            i++
                        }
                        let gexpObj = json.guild.members[i].expHistory
                        let gexpArray = Object.values(gexpObj)
                        userData.gexp += gexpArray[0]

                        console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Участник ${json.guild.members[i].uuid} (${userData.nickname}) заработал за сегодня ${gexpArray[0]} GEXP`))

                        while (userData.gexp >= 50000 - (50000 * 0.10 * userData.perks.ticket_discount)) {
                            userData.gexp -= 50000 - (50000 * 0.10 * userData.perks.ticket_discount)
                            userData.tickets += 1
                            console.log(chalk.magenta(`[Получены билеты]`) + chalk.gray(`: ${user.username} получил 1 билет. Теперь у него ${userData.tickets} билетов`))
                        }
                    } catch (error) {
                        interaction.reply({
                            embeds: [new EmbedBuilder().setAuthor({ name: `Ошибка!` }).setDescription(`Не удалось обновить данные о GEXP игрока ${userData.uuid}! Обратитесь в поддержку гильдии Starpixel!`).setThumbnail(`https://i.imgur.com/6IE3lz7.png`).setColor(`DarkRed`).setTimestamp(Date.now())],
                            ephemeral: true
                        });
                        console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Произошла ошибка при обновлении данных о GEXP пользователя ${userData.uuid}!`));
                    }
                } else {
                    console.log(`Гильдия не найдена или игрок не найден.`)
                    interaction.reply(`Ошибка! Свяжитесь с администрацией гильдии.`)
                }
                userData.save()
                const success = new EmbedBuilder()
                    .setTitle(`Профиль успешно обновлен!`)
                    .setDescription(`Профиль игрок ${interaction.member} был успешно обновлен!

**Предметов на данный момент:**
Опыт активности - ${userData.exp} (подробнее: \`/rank\`)
Уровень активности - ${userData.level}
Всего опыта - ${userData.totalexp}

Опыта рангов - ${userData.rank}
Румбиков - ${userData.rumbik}
Билетов - ${userData.tickets} (+${userData.tickets - tickets_before})
Опыта гильдии в наличии - ${userData.gexp}

**Перки**:
🔺 Повышение опыта рангов - ${userData.perks.rank_boost}/6
🔻 Скидка в королевском магазине - ${userData.perks.king_discount}/4
🔻 Скидка в магазине активности - ${userData.perks.act_discount}/3
🔻 Скидка в обычном магазине гильдии - ${userData.perks.shop_discount}/4
🕒 Увеличение времени действия временных предметов - ${userData.perks.temp_items}/1
💰 Возможность продавать предметы из профиля - ${userData.perks.sell_items}/1
🏷️ Уменьшение опыта гильдии для получения билета - ${userData.perks.ticket_discount}/5
✨ Изменение предметов - ${userData.perks.change_items}/1`)
                interaction.reply({
                    embeds: [success]
                })
            }
                break;

            case `delete`: {
                const id = interaction.options.getString(`id`)
                const user = interaction.guild.members.cache.get(id)
                const userData = await User.findOne({ userid: id })
                if (!interaction.member.roles.cache.has(`320880176416161802`)) {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `❗ Отсутствует необходимая роль!`
                        })
                        .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`320880176416161802`).name}\`!
Но вы всё ещё можете использовать команду \`/profile update\``)
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())

                    return interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                }
                else if (interaction.member.roles.cache.has(`320880176416161802`)) {
                    const delete_button = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`delete_button`)
                                .setEmoji(`🚫`)
                                .setLabel(`Удалить`)
                                .setStyle(ButtonStyle.Danger)
                        )
                    const delete_embed = new EmbedBuilder()
                        .setColor(`DarkRed`)
                        .setTitle(`Вы действительно хотите удалить профиль пользователя ${user.user.username}?`)
                        .setDescription(`**Это действие необратимо!**
Проверьте, тот ли профиль вы хотите удалить? Если игрок сейчас находится в гильдии, удалять его профиль **ЗАПРЕЩЕНО**! Если игрок покинул гильдию, то нажмите в течение __10 секунд__ на кнопку ниже, чтобы удалить профиль.

Пользователь потеряет следующую информацию:
\`Румбики, опыт рангов, опыт и уровень активности, накопленный опыт гильдии, билеты и умения!\``)
                        .setFooter({ text: `Чтобы подтвердить действие, нажмите кнопку 🚫 Удалить в течение 10 секунд.` })
                    interaction.reply({
                        embeds: [delete_embed],
                        components: [delete_button]
                    })

                    const filter = i => i.customId === 'delete_button';

                    interaction.channel.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 10000 })
                        .then(async (i) => {
                            if (i.user.id === interaction.member.user.id) {
                                delete_button.components[0].setDisabled(true)
                                i.reply({
                                    content: `Профиль пользователя ${userData.name} (${userData.nickname}) был успешно удалён!`
                                })
                                console.log(chalk.cyan(`[База данных]`) + chalk.gray(`: Профиль пользователя ${userData.name} (\`${userData.nickname}\`) был успешно удалён!`))
                                interaction.editReply({
                                    embeds: [delete_embed],
                                    components: [delete_button]
                                })
                                userData.delete()

                            } else {
                                i.reply({ content: `Вы не можете использовать данную кнопочку!`, ephemeral: true });
                            }
                        })
                        .catch(async (err) => {
                            await delete_button.components[0]
                                .setDisabled(true)
                                .setLabel(`Отменено`)


                            delete_embed
                                .setTitle(`Удаление профиля отменено из-за истечения времени!`)
                                .setFields({
                                    name: `\u200b`,
                                    value: `\u200b`
                                })
                                .setDescription(`Удаление профиля отменено из-за истечения времени!`)
                                .setFooter({ text: `Пропишите команду /profile delete ещё раз, чтобы повторить попытку!` })
                            await interaction.editReply({
                                embeds: [delete_embed],
                                components: [delete_button]
                            })
                        });

                }
            }
                break;

            case `reset`: {
                const user = interaction.member
                const no_role = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы должны иметь роль \`${interaction.guild.roles.cache.get(`849695880688173087`).name}\` или выше, чтобы использовать это!
Но вы всё ещё можете использовать команду \`/profile update\``)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                if (!user.roles.cache.has(`849695880688173087`) && !user.roles.cache.has(`992122876394225814`) && !user.roles.cache.has(`992123014831419472`) && !user.roles.cache.has(`992123019793276961`)) return interaction.reply({
                    embeds: [no_role],
                    ephemeral: true
                });
                await interaction.deferReply({
                    fetchReply: true
                })
                const userDataRolesClear = await User.findOneAndUpdate({ userid: user.id }, {
                    $set: {
                        roles: []
                    }
                })
                userDataRolesClear.save()
                await interaction.deleteReply()
                const exceptions = [`567689925143822346`, `883617976790700032`, `883617966174896139`, `320880176416161802`, `563793535250464809`, `504887113649750016`, `721047643370815599`, `702540345749143661`, `746440976377184388`, `722523773961633927`, `660236704971489310`, `740241985155366973`, `730891493375475786`, `764198086738051092`, `856866046387683338`, `849533128871641119`, `584811233035681814`, `584811236085071882`, `584811238178029612`, `584811238626689024`, `610131860445724713`, `584811242498293781`, `584811242703552512`, `584811243496275988`, `584811243794202626`, `584811380117471252`, `585175150501036043`, `585175165315579904`, `585175168251592714`, `585175171154051083`, `610133244393816074`, `610133972034387983`, `585175188187119638`, `610131863683465246`, `610131866963673118`, `610131868045672615`, `610132199848804379`, `610132217204572190`, `694914070632988712`, `694914070746234970`, `694914072960958555`, `694914074630422555`, `694914073376194740`, `694914074550468758`, `694914075460894791`, `697796942134116382`, `709753395417972746`, `722533819839938572`, `722523856211935243`, `850336260265476096`]
                let i = 0

                for (let exception of exceptions) {

                    exception = exceptions[i]
                    if (user.roles.cache.has(exception)) {
                        const userDataUpd = await User.findOneAndUpdate({
                            userid: user.id
                        }, {
                            $push: {
                                roles: exception
                            }
                        })
                        userDataUpd.save()

                        console.log(chalk.red(`[СБРОС ПРОФИЛЯ]`) + chalk.gray(`: ${user.user.username} сохранил роль ${exception}!`))
                        i++
                    } else {
                        console.log(chalk.red(`[СБРОС ПРОФИЛЯ]`) + chalk.gray(`: ${user.user.username} не имеет роль ${exception}!`))
                        i++
                    }
                }

                await interaction.guild.members.edit(user, {
                    roles: [`930520087797051452`, `553593731953983498`, `721047643370815599`, `702540345749143661`, `746440976377184388`, `722523773961633927`, `849533128871641119`, `709753395417972746`, `722533819839938572`, `722523856211935243`, `504887113649750016`]
                })
                const userData = await User.findOne({ userid: user.id })

                userData.rank = 0
                userData.rumbik = 0

                userData.elements.diving = 0
                userData.elements.eagle_eye = 0
                userData.elements.fast_grow = 0
                userData.elements.fire_resistance = 0
                userData.elements.flame = 0
                userData.elements.flying = 0
                userData.elements.lightning = 0
                userData.elements.mountains = 0
                userData.elements.resistance = 0
                userData.elements.respiration = 0
                userData.elements.underground = 0
                userData.elements.wind = 0

                userData.displayname.ramka1 = ``
                userData.displayname.ramka2 = ``
                userData.displayname.suffix = ``
                userData.displayname.rank = `🦋`
                userData.displayname.symbol = `👤`

                userData.gexp = 0
                userData.tickets = 0

                userData.perks.act_discount = 0
                userData.perks.change_items = 0
                userData.perks.king_discount = 0
                userData.perks.rank_boost = 0
                userData.perks.sell_items = 0
                userData.perks.shop_discount = 0
                userData.perks.temp_items = 0
                userData.perks.ticket_discount = 0
                userData.save()

                const back_roles = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`back_roles`)
                            .setEmoji(`⚜`)
                            .setLabel(`Вернуть сохранённые роли`)
                            .setStyle(ButtonStyle.Primary)
                    )

                const msg = await interaction.guild.channels.cache.get(process.env.main_channel).send({
                    content: `:black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:

:tada: ${user} решил сбросить свою статистику и начать развитие в Дискорде гильдии **заново**!           
Его ждут крутые награды и новые задания. Пожелаем ему удачи!

:black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:`,
                    components: [back_roles]
                })

                const filter = i => i.customId === 'back_roles';

                msg.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 3600000 })
                    .then(async (i) => {
                        if (i.user.id === interaction.member.user.id) {
                            const roles = userData.roles
                            await i.member.roles.add(roles).catch()

                            back_roles.components[0].setDisabled(true)
                            i.reply({
                                content: `Вы успешно вернули свои роли!`,
                                ephemeral: true
                            })
                            console.log(chalk.cyan(`[СБРОС ПРОФИЛЯ]`) + chalk.gray(`: ${user.user.username} успешно вернул сохранённые роли!`))
                            msg.edit({
                                content: `:black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:

:tada: ${user} решил сбросить свою статистику и начать развитие в Дискорде гильдии **заново**!           
Его ждут крутые награды и новые задания. Пожелаем ему удачи!

:black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:`,
                                components: [back_roles]
                            })


                        } else {
                            i.reply({ content: `Вы не можете использовать данную кнопочку!`, ephemeral: true });
                        }
                    })
                    .catch(async (err) => {
                        await back_roles.components[0]
                            .setDisabled(true)
                            .setLabel(`Роли потеряны!`)
                            .setStyle(ButtonStyle.Danger)

                        await i.reply({
                            content: `${user} не нажал на кнопочку вовремя!
Вы все ещё можете вернуть свои роли, однако вам необходимо обратиться в вопрос-модерам. Помните, что возвращение ролей вручную может занять до 3-х дней!`
                        })
                        await msg.edit({
                            content: `:black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:

:tada: ${user} решил сбросить свою статистику и начать развитие в Дискорде гильдии **заново**!           
Его ждут крутые награды и новые задания. Пожелаем ему удачи!

:black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:    :black_medium_small_square:`,
                            components: [back_roles]
                        })

                        console.log(chalk.cyan(`[СБРОС ПРОФИЛЯ]`) + chalk.gray(`: ${user.user.id} потерял свои роли! Возможно, вскоре будет обращение в вопрос модерам!`))
                    });
            }
                break;

            case "updateall": {
                const embed = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`320880176416161802`).name}\`!
Но вы всё ещё можете использовать команду \`/profile update\``)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())

                if (!interaction.member.roles.cache.has(`320880176416161802`)) return interaction.reply({
                    embeds: [embed]
                })
                await interaction.deferReply({
                    fetchReply: true
                })
                const userDatas = await User.find({ guildid: interaction.guild.id })
                let b = 0
                let update
                for (let userData of userDatas) {
                    userData = userDatas[b]

                    const user = interaction.guild.members.fetch(userData.userid)
                    userData.name = user.username
                    let response = await fetch(`https://api.hypixel.net/player?key=${api}&uuid=${userData.uuid}`)
                    if (response.ok) {
                        try {
                            let json = await response.json()

                            console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Ник игрока - ${json.player.displayname}, UUID - ${json.player.uuid}. Профиль обновлён!`))
                            userData.nickname = json.player.displayname;
                            userData.markModified(`nickname`)

                        } catch (error) {
                            interaction.reply({
                                embeds: [new EmbedBuilder().setAuthor({ name: `Ошибка!` }).setDescription(`Игрок ${userData.uuid} не найден! Обратитесь в поддержку гильдии Starpixel!`).setThumbnail(`https://i.imgur.com/6IE3lz7.png`).setColor(`DarkRed`).setTimestamp(Date.now())],
                                ephemeral: true
                            });
                            console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Игрока с UUID ${userData.uuid} не существует`));
                            return;
                        }
                    }

                    let responseA = await fetch(`https://api.hypixel.net/guild?key=${api}&player=${userData.uuid}`)
                    if (responseA.ok) {

                        let json = await responseA.json()
                        if (json.guild !== null) {


                            if (json.guild._id == `5c1902fc77ce84cd430f3959`) {
                                try {
                                    var i = 0
                                    while (json.guild.members[i].uuid !== userData.uuid) {
                                        i++
                                    }
                                    let gexpObj = json.guild.members[i].expHistory
                                    let gexpArray = Object.values(gexpObj)
                                    userData.gexp += gexpArray[0]

                                    console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Участник ${json.guild.members[i].uuid} (${userData.nickname}) заработал за сегодня ${gexpArray[0]} GEXP`))

                                    while (userData.gexp >= 50000 - (50000 * 0.10 * userData.perks.ticket_discount)) {
                                        userData.gexp -= 50000 - (50000 * 0.10 * userData.perks.ticket_discount)
                                        userData.tickets += 1
                                        console.log(chalk.magenta(`[Получены билеты]`) + chalk.gray(`: ${user.user.username} получил 1 билет. Теперь у него ${userData.tickets} билетов`))
                                    }

                                } catch (error) {
                                    console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.red(`: Произошла ошибка при обновлении данных о GEXP пользователя ${userData.uuid} (${userData.nickname})!`));
                                }
                            } else {
                                console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.red(`: Игрок ${userData.uuid} (${userData.nickname}) не состоит в гильдии Starpixel!`));
                            }
                        } else {
                            console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.red(`: Игрок ${userData.uuid} (${userData.nickname}) не состоит ни в какой гильдии на Hypixel!`));
                        }


                    } else {

                        console.log(`Гильдия не найдена или игрок не найден.`)
                        interaction.editReply(`Ошибка! Свяжитесь с администрацией гильдии.`)
                    }
                    update = new EmbedBuilder()
                        .setTitle(`Идёт обработка всех участников . . .`)
                        .setColor(process.env.bot_color)
                        .setDescription(`Идёт обработка и обновление профилей участников гильдии Starpixel!

В данный момент идёт обработка пользователя <@${userData.userid}> - \`${userData.nickname}\` (UUID: \`${userData.uuid}\`) 
**Прогресс**: ${b + 1}/${userDatas.length} - ${(Math.round(((b + 1) / (userDatas.length)) * 100))}% завершено . . .`)
                        .setTimestamp(Date.now())
                        .setThumbnail(`https://visage.surgeplay.com/face/${userData.uuid}.png`)


                    await interaction.editReply({
                        embeds: [update]
                    })
                    userData.save()
                    b++
                    await wait(1100)
                }
                update = new EmbedBuilder()
                    .setTitle(`Обработка завершена!`)
                    .setColor(process.env.bot_color)
                    .setDescription(`Обработка и обновление профилей участников завершена!

Теперь никнеймы, идентификаторы и прочее совпадает актуальны! В скором времени канал <#932203255335899177> будет содержать данную информацию
**Прогресс**: ${b}/${userDatas.length} - ${(Math.round(((b) / (userDatas.length)) * 100))}% завершено . . .`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                await interaction.editReply({
                    embeds: [update]
                })



            }
                break;


            default:
                break;
        }

        switch (interaction.options.getSubcommandGroup()) {
            case `set`: {
                const embed = new EmbedBuilder()
                    .setAuthor({
                        name: `❗ Отсутствует необходимая роль!`
                    })
                    .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`320880176416161802`).name}\`!
Но вы всё ещё можете использовать команду \`/profile update\``)
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())

                if (!interaction.member.roles.cache.has(`320880176416161802`)) return interaction.reply({
                    embeds: [embed]
                })


                switch (interaction.options.getSubcommand()) {
                    case `string`: {
                        const user_id = interaction.options.getString(`id`)
                        const user = await interaction.guild.members.fetch(user_id)
                        const userData = await User.findOne({ userid: user_id })
                        const value = interaction.options.getString(`значение`)

                        switch (interaction.options.getString(`опция`)) {
                            case `ID в Discord`: {
                                const before = userData.userid
                                userData.userid = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }

                                break;
                            case `UUID в Minecraft`: {
                                const before = userData.uuid
                                userData.uuid = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }

                                break;

                            default:
                                break;
                        }
                    }

                        break;
                    case `number`: {
                        const user_id = interaction.options.getString(`id`)
                        const user = await interaction.guild.members.fetch(user_id)
                        const userData = await User.findOne({ userid: user_id })
                        const value = interaction.options.getNumber(`значение`)

                        switch (interaction.options.getString(`опция`)) {
                            case `Возраст`: {
                                const before = userData.age

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.age = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Опыт активности`: {
                                const before = userData.totalexp

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.totalexp = value
                                userData.exp = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Уровень активности`: {
                                const before = userData.level

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.level = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Опыт рангов`: {
                                const before = userData.rank

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })


                                if (value > 25000) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 25000!`,
                                    ephemeral: true
                                })

                                userData.rank = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Румбики`: {
                                const before = userData.rumbik

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.rumbik = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Опыт гильдии (GEXP)`: {
                                const before = userData.gexp

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.gexp = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Билеты`: {
                                const before = userData.tickets

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.tickets = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;

                            case `Цены в магазине`: {
                                const before = userData.shop_costs

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.shop_costs = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Цены в магазине активности`: {
                                const before = userData.act_costs

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.act_costs = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Цены в королевском магазине`: {
                                const before = userData.king_costs

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.king_costs = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Персональный бустер опыта активности`: {
                                const before = userData.pers_act_boost

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.pers_act_boost = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;

                            case `Обычные достижения`: {

                                const before = userData.achievements.normal

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 25) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 25!`,
                                    ephemeral: true
                                })

                                userData.achievements.normal = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;

                            case `Мифические достижения`: {
                                const before = userData.achievements.mythical

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 5) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 5!`,
                                    ephemeral: true
                                })

                                userData.achievements.mythical = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;

                            case `Медаль 🥇`: {
                                const before = userData.medal_1

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.medal_1 = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;

                            case `Медаль 🥈`: {
                                const before = userData.medal_2

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.medal_2 = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Медаль 🥉`: {
                            
                                const before = userData.medal_3

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })

                                userData.medal_3 = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Навык "Перемещение под землёй" (Земля)`: {
                                const before = userData.elements.underground

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.underground = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Навык "Быстрый рост растений" (Земля)`: {
                                const before = userData.elements.fast_grow

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.fast_grow = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Навык "Выращивание горных пород" (Земля)`: {
                                const before = userData.elements.mountains

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.mountains = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Навык "Плавание на глубине" (Вода)`: {
                                const before = userData.elements.diving

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.diving = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Навык "Сопротивление течениям" (Вода)`: {
                                const before = userData.elements.resistance

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.resistance = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                            
                            
                                break;
                            case `Навык "Подводное дыхание" (Вода)`: {
                                const before = userData.elements.respiration

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.respiration = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Навык "Защита от огня" (Огонь)`: {
                                const before = userData.elements.fire_resistance

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.fire_resistance = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Навык "Удар молнии" (Огонь)`: {
                                const before = userData.elements.lightning

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.lightning = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Навык "Управление пламенем" (Огонь)`: {
                                const before = userData.elements.flame

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.flame = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Навык "Полет в небесах" (Воздух)`: {
                                const before = userData.elements.flying

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.flying = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Навык "Повеление ветром" (Воздух)`: {
                                const before = userData.elements.wind

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.wind = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Навык "Орлиный глаз" (Воздух)`: {
                                const before = userData.elements.eagle_eye
                                
                                
                                
                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.elements.eagle_eye = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Перк "Повышение опыта рангов"`: {
                                const before = userData.perks.rank_boost

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 6) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 6!`,
                                    ephemeral: true
                                })

                                userData.perks.rank_boost = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Перк "Скидка в королевском магазине"`: {
                                const before = userData.perks.king_discount

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 4) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 4!`,
                                    ephemeral: true
                                })

                                userData.perks.king_discount = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Перк "Скидка в магазине активности"`: {
                                const before = userData.perks.act_discount

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 3) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 3!`,
                                    ephemeral: true
                                })

                                userData.perks.act_discount = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Перк "Скидка в обычном магазине гильдии"`: {
                                const before = userData.perks.shop_discount

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 4) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 4!`,
                                    ephemeral: true
                                })

                                userData.perks.shop_discount = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Перк "Увеличение времени действия временных предметов"`: {
                                const before = userData.perks.temp_items

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.perks.temp_items = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Перк "Возможность продавать предметы из профиля"`: {
                                const before = userData.perks.sell_items
                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.perks.sell_items = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Перк "Уменьшение опыта гильдии для получения билета"`: {
                                const before = userData.perks.ticket_discount

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 5) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 5!`,
                                    ephemeral: true
                                })

                                userData.perks.ticket_discount = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;
                            case `Перк "Изменение предметов"`: {
                                const before = userData.perks.change_items

                                if (value < 0) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть меньше 0!`,
                                    ephemeral: true
                                })
                                if (value > 1) return interaction.reply({
                                    content: `\`${interaction.options.getString(`опция`)}\` не может быть больше 1!`,
                                    ephemeral: true
                                })

                                userData.perks.change_items = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }
                                break;


                            default:
                                break;
                        }

                    }
                        
                        break;
                    case 'boolean': {
                        const user_id = interaction.options.getString(`id`)
                        const user = await interaction.guild.members.fetch(user_id)
                        const userData = await User.findOne({ userid: user_id })
                        const value = interaction.options.getBoolean(`значение`)

                        switch (interaction.options.getString(`опция`)) {
                            case `Пользовательский значок ранга`: {
                                const before = userData.displayname.custom_rank
                                userData.displayname.custom_rank = value
                                userData.save()

                                const success = new EmbedBuilder()
                                    .setTitle(`Установлено новое значение в профиле`)
                                    .setDescription(`Значение \`${interaction.options.getString(`опция`)}\` у пользователя ${user} было установлено на \`${before}  ➡  ${value}\`! Используйте \`/profile updateall\`, чтобы применить новые значения и обновить старые у других пользователей!`)
                                    .setColor(process.env.bot_color)
                                    .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                                    .setTimestamp(Date.now())

                                await interaction.reply({
                                    embeds: [success]
                                })
                            }

                                break;

                            default:
                                break;
                        }
                    }
                        break
                    default:
                        break;
                }
            }

                break;

            default:
                break;
        }
    }
};