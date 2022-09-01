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
                .setName(`uuid`)
                .setDescription(`UUID в Minecraft`)
                .setRequired(true)
            )
        ),
    async execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case `create`: {
                const user = interaction.options.getUser(`пользователь`)
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

                    const userData = new User({ id: user.id, name: user.username })
                    const creator = await User.findOne({ id: interaction.member.user.id }) || new User({ id: interaction.member.user.id, name: interaction.member.user.username })
                    creator.uuid = `63f605cf68fa4d6f94fabfc4203e4d22`
                    creator.nickname = `Doggo_leader`
                    creator.security_code = `Derjhthjegrt349578384`
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

                    const playername = interaction.options.getString(`никнейм`)


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
                            creator.cooldowns.prof_create = Date.now() + (1000 * 90)
                            creator.markModified(`prof_create`)
                        } catch (error) {
                            User.deleteOne({ id: user.id });
                            interaction.reply({
                                embeds: [new EmbedBuilder().setAuthor({ name: `Ошибка!` }).setDescription(`Игрок ${playername} не найден! Проверьте правильность введённых данных`).setThumbnail(`https://i.imgur.com/6IE3lz7.png`).setColor(`DarkRed`).setTimestamp(Date.now())],
                                ephemeral: true
                            });
                            console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Игрока с никнеймом ${playername} не существует `));
                            return;
                        }
                    }


                    const n1 = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`, `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`, `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`]
                    let r1 = n1[Math.floor(Math.random() * n1.length)]
                    let r2 = n1[Math.floor(Math.random() * n1.length)]
                    let r3 = n1[Math.floor(Math.random() * n1.length)]
                    let r4 = n1[Math.floor(Math.random() * n1.length)]
                    let r5 = n1[Math.floor(Math.random() * n1.length)]
                    let r6 = n1[Math.floor(Math.random() * n1.length)]
                    let r7 = n1[Math.floor(Math.random() * n1.length)]
                    let r8 = n1[Math.floor(Math.random() * n1.length)]
                    let r9 = n1[Math.floor(Math.random() * n1.length)]


                    const code = `${r1}${r2}${r3}${r4}${r5}${r6}${r7}${r8}${r9}`



                    try {
                        userData.security_code = code;
                        userData.markModified(`code`)
                        await memberDM.send(`Ваш код безопасности в гильдии Starpixel: ${code}
Он может пригодиться вам, если с вашим аккаунтом что-либо случится, а также если вам нужна будет поддержка, связанная с изменением вашего аккаунта. 
❔ Если вы потеряете код, вы можете создать новый код, если пропишите команду \`/code new\`
❗ **Никому не сообщайте этот код!** Если вам потребуется использовать код, пропишите команду \`/code use\`.`)

                    } catch (error) {
                        User.deleteOne({ id: user.id });
                        await interaction.reply({
                            content: `У пользователя ${user} закрыты личные сообщения! Попросите его открыть их и повторите попытку снова!`,
                            ephemeral: true
                        });
                        return;
                    }
                    creator.save()
                    userData.save()
                    const success = new EmbedBuilder()
                        .setAuthor({
                            name: `Профиль успешно создан!`
                        })
                        .setColor(process.env.bot_color)
                        .setDescription(`Профиль пользователя ${interaction.options.getUser(`пользователь`)} (${userData.nickname}) был успешно создан. Код безопасности был отправлен пользователю в личные сообщения.`)
                        .setThumbnail(`https://i.imgur.com/BahQWAW.png`)
                        .setTimestamp(Date.now())

                    interaction.reply({
                        embeds: [success]
                    })
                    console.log(chalk.cyan(`[База данных]`) + chalk.gray(`: Профиль пользователя ${userData.name} (${userData.nickname}) был успешно создан!`))

                }
            }

                break;
            case `update`: {
                const user = interaction.member.user;
                const userData = await User.findOne({ id: user.id });
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
                const uuid = interaction.options.getString(`uuid`)
                const userData = await User.findOne({ uuid: uuid })
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
                        .setTitle(`Вы действительно хотите удалить профиль пользователя ${userData.name}?`)
                        .setDescription(`**Это действие необратимо!**
Проверьте, тот ли профиль вы хотите удалить? Если игрок сейчас находится в гильдии, удалять его профиль **ЗАПРЕЩЕНО**! Если игрок покинул гильдию, то нажмите в течение __10 секунд__ на кнопку ниже, чтобы удалить профиль.

Пользователь потеряет следующую информацию:
\`Румбики, опыт рангов, опыт и уровень активности, накопленный опыт гильдии, билеты и умения!\``)
                        .addFields(
                            {
                                name: `ПРОВЕРЬТЕ, ТОГО ЛИ ПОЛЬЗОВАТЕЛЯ ВЫ СОБИРАЕТЕСЬ УДАЛИТЬ`,
                                value: `\u200b`,
                                inline: false
                            },
                            {
                                name: `Имя пользователя в Discord`,
                                value: `${userData.name} (<@${userData.id}>)`,
                                inline: true
                            },
                            {
                                name: `ID пользователя в Discord`,
                                value: `${userData.id}`,
                                inline: true
                            },
                            {
                                name: `Никнейм в Minecraft`,
                                value: `${userData.nickname}`,
                                inline: true
                            },
                            {
                                name: `UUID в Minecraft`,
                                value: `${userData.uuid}`,
                                inline: true
                            })
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
                                userData.deleteOne({ id: userData.id })
                                
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
            default:
                break;
        }
    }
};