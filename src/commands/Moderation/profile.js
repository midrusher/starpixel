const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { execute } = require('../../events/client/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ
const userdata = require('../../schemas/userdata');

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
        ),
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
                            creator.cooldowns.prof_create = Date.now() + (1000 * 10)
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
                    memberDM.roles.add(roles).catch()
                    memberDM.roles.add(rloot1).catch()
                    memberDM.roles.remove(`920346035811917825`).catch()

                    creator.save()
                    userData.save()
                    //if (memberDM.user.id !== `491343958660874242`) {
                    //    memberDM.setNickname(`「${userData.displayname.rank}」 ${userData.displayname.ramka1}${userData.displayname.name}${userData.displayname.ramka2}${userData.displayname.suffix} ${userData.displayname.symbol}┇ ${userData.displayname.premium}`)
                    //}
                    
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
                    /* await interaction.guild.channels.cache.get(process.env.main_channel).send({
                        content: `Профиль пользователя ${interaction.options.getUser(`пользователь`)} (\`${userData.nickname}\`) был успешно создан. Необходимые роли были добавлены. Случайный приветственный подарок был получен. Никнейм будет в скором времени автоматически установлен!`
                    }) */
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
                        console.log(`${json.guild.members[53].uuid}`)
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
                                console.log(chalk.cyan(`[База данных]`) + chalk.gray(`: Профиль пользователя ${userData.name} (${userData.nickname}) был успешно удалён!`))
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
            default:
                break;
        }
    }
};