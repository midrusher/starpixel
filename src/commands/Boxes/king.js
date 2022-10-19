const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const wait = require('node:timers/promises').setTimeout;
const { User } = require(`../../schemas/userdata`);
const { Temp } = require(`../../schemas/temp_items`);
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`king`)  //Название команды
        .setDescription(`Открыть королевскую коробку`), //Описание команды
    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.items === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ
        const userData = await User.findOne({ userid: user.id })


        const timestamp = Math.round(interaction.createdTimestamp / 1000)
        const opener = interaction.member.id;
        const cmd_name = `king` //Название команды
        const { roles } = interaction.member //Участник команды

        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("584673040470769667") //ID коробки
            .catch(console.error);
        if (roles.cache.has("584673040470769667") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
            await roles.remove(role).catch(console.error); //Удалить роль коробки
            const message = await interaction.deferReply({
                fetchReply: true,
            });
            await interaction.deleteReply()

            //Лут из коробок
            //Случайный предмет
            //name - Название предмета
            //dropChanceLOOT - Шанс выпадения предмета
            //roleID - ID роли, которая связана с данным лутом.


            //Опыт рангов (если необходимо)
            let rank_exp = [
                {
                    rank_amount: 30,
                    dropChanceRANK: 50
                },
                {
                    rank_amount: 35,
                    dropChanceRANK: 30
                },
                {
                    rank_amount: 40,
                    dropChanceRANK: 15
                },
                {
                    rank_amount: 50,
                    dropChanceRANK: 5
                },

            ]

            //Рандом - опыт рангов
            let sum_rank = 0;
            for (let i_rank = 0; i_rank < rank_exp.length; i_rank++) {
                sum_rank += rank_exp[i_rank].dropChanceRANK;
            }
            let r_rank = Math.floor(Math.random() * sum_rank);
            let i_rank = 0;
            for (let s = rank_exp[0].dropChanceRANK; s <= r_rank; s += rank_exp[i_rank].dropChanceRANK) {
                i_rank++;
            }

            //Сообщение - опыт рангов                       
            interaction.guild.channels.cache.get(ch_list.rank).send(
                `╔═════════♡════════╗
<@${opener}> +${rank_exp[i_rank].rank_amount}💠
\`Получено из королевской коробки.\`
╚═════════♡════════╝`
            );
            userData.rank += rank_exp[i_rank].rank_amount + (rank_exp[i_rank].rank_amount * 0.05 * userData.perks.rank_boost) //ДОБАВИТЬ В ДРУГИЕ


            //Опыт активности
            let act_exp = [
                {
                    act_amount: 200,
                    dropChanceACT: 40
                },
                {
                    act_amount: 250,
                    dropChanceACT: 20
                },
                {
                    act_amount: 300,
                    dropChanceACT: 3
                },
                {
                    act_amount: 270,
                    dropChanceACT: 7
                },
                {
                    act_amount: 230,
                    dropChanceACT: 30
                },

            ]

            //Рандом - опыт активности
            let sum_act = 0;
            for (let i_act = 0; i_act < act_exp.length; i_act++) {
                sum_act += act_exp[i_act].dropChanceACT;
            }
            let r_act = Math.floor(Math.random() * sum_act);
            let i_act = 0;
            for (let s = act_exp[0].dropChanceACT; s <= r_act; s += act_exp[i_act].dropChanceACT) {
                i_act++;
            }

            //Сообщение - опыт активности                       
            interaction.guild.channels.cache.get(ch_list.act).send(
                `╔═════════♡════════╗
<@${opener}> +${act_exp[i_act].act_amount}🌀
\`Получено из королевской коробки.\`
╚═════════♡════════╝`
            );

            userData.exp += act_exp[i_act].act_amount //ДОБАВИТЬ В ДРУГИЕ
            //Список предметов
            let loot1 = [
                {
                    loot1_name: `🐋 ПИТОМЕЦ lpet`,
                    dropChanceLOOT1: 10,
                    loot1_roleID: "553638061817200650",
                    loot1_description: "Обучайся различным навыкам у питомцев."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 🤑 money`,
                    dropChanceLOOT1: 15,
                    loot1_roleID: "642810527579373588",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 😋 music`,
                    dropChanceLOOT1: 15,
                    loot1_roleID: "642393088689700893",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 😠 spider`,
                    dropChanceLOOT1: 15,
                    loot1_roleID: "636561006721761301",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ 👾 КАРТИНКА  miracle`,
                    dropChanceLOOT1: 10,
                    loot1_roleID: "642810538518118430",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ⛄ КАРТИНКА  snowman`,
                    dropChanceLOOT1: 10,
                    loot1_roleID: "642819600429481997",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ 🧡 КАРТИНКА  sova`,
                    dropChanceLOOT1: 10,
                    loot1_roleID: "850079134700666890",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `💫 КОСМИЧЕСКАЯ ПЫЛЬ`,
                    dropChanceLOOT1: 9,
                    loot1_roleID: "609085186738618395",
                    loot1_description: "Вы находите одну из пяти частей кометы. Соберите все 5 частей, чтобы создать Комету!"
                },
                {
                    loot1_name: `🐲 ПИТОМЕЦ  mpet`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "605696079819964426",
                    loot1_description: "Обучайся различным навыкам у питомцев."
                },
                {
                    loot1_name: `💳 Подписка VIP на 7 дней`,
                    dropChanceLOOT1: 1,
                    loot1_roleID: "850336260265476096",
                    loot1_description: "Вы получаете дополнительные привилегии."
                }
            ];

            //рандом предметов
            let sum_loot1 = 0;
            for (let i_loot1 = 0; i_loot1 < loot1.length; i_loot1++) {
                sum_loot1 += loot1[i_loot1].dropChanceLOOT1;
            }
            let r_loot1 = Math.floor(Math.random() * sum_loot1);
            let i_loot1 = 0;
            for (let s = loot1[0].dropChanceLOOT1; s <= r_loot1; s += loot1[i_loot1].dropChanceLOOT1) {
                i_loot1++;
            }

            //Лут 2
            let loot2 = [
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 😈`,
                    symbol: `😈`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🧁`,
                    symbol: `🧁`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 💎`,
                    symbol: `💎`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🍍`,
                    symbol: `🍍`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🤖`,
                    symbol: `🤖`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 👹`,
                    symbol: ``,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🍒`,
                    symbol: `👹`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ ⭐️`,
                    symbol: `⭐️`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🔥`,
                    symbol: `🔥`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🍀`,
                    symbol: `🍀`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🚀`,
                    symbol: `🚀`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ⍟`,
                    symbol: `⍟`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ✸`,
                    symbol: `✸`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ϟ`,
                    symbol: `ϟ`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ✘`,
                    symbol: `✘`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ♫`,
                    symbol: `♫`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ✓`,
                    symbol: `✓`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи / рамку, нажмите кнопку \"Установить\" в течение 60 секунд."
                }
            ];

            //рандом предметов
            let sum_loot2 = 0;
            for (let i_loot2 = 0; i_loot2 < loot2.length; i_loot2++) {
                sum_loot2 += loot2[i_loot2].dropChanceLOOT2;
            }
            let r_loot2 = Math.floor(Math.random() * sum_loot2);
            let i_loot2 = 0;
            for (let s = loot2[0].dropChanceLOOT2; s <= r_loot2; s += loot2[i_loot2].dropChanceLOOT2) {
                i_loot2++;
            }


            //Отправка сообщения о луте    
            const boxesk = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('boxesk')
                    .setLabel('Установить')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji(`⬆️`)
            )

            const r_loot_msg = await interaction.guild.channels.cache.get(ch_list.box)
                .send({
                    content: `◾ :crown: ◾
<@${opener}> открывает королевскую коробку гильдии...
╔━═━═━︽︾♚︾︽━═━═━╗
\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}.
╚━═━═━︾︽♔︽︾━═━═━╝
◾ :crown: ◾
Дополнительная косметическая награда из королевской коробки: \`${loot2[i_loot2].loot2_name}\`
${loot2[i_loot2].loot2_description}`,
                    components: [boxesk]
                });
            if (!roles.cache.has(loot1[i_loot1].loot1_roleID) && loot1[i_loot1].loot1_name !== `💫 КОСМИЧЕСКАЯ ПЫЛЬ`) {
                if (loot1[i_loot1].loot1_name == `💳 Подписка VIP на 7 дней`) {
                    await roles.add(loot1[i_loot1].loot1_roleID).catch();
                    await r_loot_msg.react("✅")
                    const tempItems = new Temp({
                        userid: user.id,
                        guildid: interaction.guild.id,
                        roleid: loot1[i_loot1].loot1_roleID,
                        expire: Date.now() + (1000 * 60 * 60 * 24 * 7)
                    })
                    tempItems.save()

                } else {
                    await roles.add(loot1[i_loot1].loot1_roleID).catch(console.error);
                    await r_loot_msg.react("✅")
                }
            } else if (loot1[i_loot1].loot1_name == `💫 КОСМИЧЕСКАЯ ПЫЛЬ`) {

                if (!roles.cache.has(`609085186738618395`)) {
                    await roles.add(`609085186738618395`).catch()
                    await r_loot_msg.react("✅")
                }

                else if (!roles.cache.has(`609086542681604142`)) {
                    await roles.add(`609086542681604142`).catch()
                    await r_loot_msg.react("✅")
                }

                else if (!roles.cache.has(`781069819838464022`)) {
                    await roles.add(`781069819838464022`).catch()
                    await r_loot_msg.react("✅")
                }

                else if (!roles.cache.has(`785252400608182282`)) {
                    await roles.add(`785252400608182282`).catch()
                    await r_loot_msg.react("✅")
                }

                else if (!roles.cache.has(`781069820053160006`)) {
                    await roles.add(`781069820053160006`).catch()
                    await r_loot_msg.react("✅")
                }

                else r_loot_msg.react("🚫")
            } else {
                await r_loot_msg.react("🚫")
            }

            const filter = i => i.customId === 'boxesk';

            r_loot_msg.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000 })
                .then(async (i) => {
                    if (i.user.id === interaction.member.user.id) {
                        if (loot2[i_loot2].loot2_name.startsWith(`КОСМЕТИЧЕСКИЙ ЭМОДЗИ`) && (roles.cache.has("553593136027533313") || roles.cache.has("553593976037310489") || roles.cache.has("780487593485008946") || roles.cache.has("849695880688173087") || roles.cache.has("992122876394225814") || roles.cache.has("992123019793276961") || roles.cache.has("992123014831419472"))) {
                            userData.displayname.symbol = loot2[i_loot2].symbol
                            userData.save()
                            await boxesk.components[0]
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🕓`)
                            .setLabel(`Идёт обработка...`)

                            i.reply({
                                content: `Ожидайте! Скоро ваш значок будет установлен! Если этого не произойдет в течение 15 минут, обратитесь в вопрос-модерам!`,
                                ephemeral: true
                            })
                        }

                        else if (loot2[i_loot2].loot2_name.startsWith(`РАМКА ДЛЯ НИКА`) && (roles.cache.has("553593976037310489") || roles.cache.has("780487593485008946") || roles.cache.has("849695880688173087") || roles.cache.has("992122876394225814") || roles.cache.has("992123014831419472") || roles.cache.has("992123019793276961"))) {
                            userData.displayname.ramka1 = loot2[i_loot2].symbol
                            userData.displayname.ramka2 = loot2[i_loot2].symbol
                            userData.save()
                            await boxesk.components[0]
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`🕓`)
                            .setLabel(`Идёт обработка...`)

                            i.reply({
                                content: `Ожидайте! Скоро ваша рамка будет установлена! Если этого не произойдет в течение 15 минут, обратитесь в вопрос-модерам!`,
                                ephemeral: true
                            })
                        } else {
                            i.reply({
                            content: `Вы не можете установить себе данный предмет, так как не получили минимальный ранг. Посмотреть минимальный ранг для данного действия вы можете в канале <#931620901882068992>!`,
                            ephemeral: true
                        })
                        await boxesk.components[0]
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`❌`)
                            .setLabel(`Низкий ранг`)
                    }
                        await r_loot_msg.edit({
                            content: `◾ :crown: ◾
<@${opener}> открывает королевскую коробку гильдии...
╔━═━═━︽︾♚︾︽━═━═━╗
\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}.
╚━═━═━︾︽♔︽︾━═━═━╝
◾ :crown: ◾
Дополнительная косметическая награда из королевской коробки: \`${loot2[i_loot2].loot2_name}\`
${loot2[i_loot2].loot2_description}`,
                            components: [boxesk]
                        })
                        

                    } else {
                        i.reply({ content: `Вы не можете использовать данную кнопочку!`, ephemeral: true });
                    }
                })
                .catch(async (err) => {
                    await boxesk.components[0]
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel(`Отменено`)
                        .setEmoji(`❌`)

                    await r_loot_msg.edit({
                        content: `◾ :crown: ◾
<@${opener}> открывает королевскую коробку гильдии...
╔━═━═━︽︾♚︾︽━═━═━╗
\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}.
╚━═━═━︾︽♔︽︾━═━═━╝
◾ :crown: ◾
Дополнительная косметическая награда из королевской коробки: \`${loot2[i_loot2].loot2_name}\`
${loot2[i_loot2].loot2_description}`,
                        components: [boxesk]
                    })
                });

            userData.save();
            console.log(chalk.magentaBright(`[${interaction.user.tag} открыл королевскую коробку]`) + chalk.gray(`: +${act_exp[i_act].act_amount} опыта активности, +${rank_exp[i_rank].rank_amount} опыта рангов, ${loot1[i_loot1].loot1_name} и ${loot2[i_loot2].loot2_name}`))

        } else {
            await interaction.reply({
                content: `У вас отсутствует \`${role.name}\` коробка!`,
                ephemeral: true
            })
        }
    }
};