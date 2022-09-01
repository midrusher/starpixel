const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
const wait = require('node:timers/promises').setTimeout;
const { User } = require(`../../schemas/userdata`);
const { Temp } = require(`../../schemas/temp_items`);
const chalk = require(`chalk`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`king`)  //Название команды
        .setDescription(`Открыть королевскую коробку.`), //Описание команды
    async execute(interaction, client) {
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id, name: user.username }) //ДОБАВИТЬ В ДРУГИЕ
        const message = await interaction.deferReply({
            fetchReply: true,
        });

        const timestamp = Math.round(interaction.createdTimestamp / 1000)
        const opener = interaction.member.id;
        const cmd_name = `king` //Название команды
        const { roles } = interaction.member //Участник команды

        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("584673040470769667") //ID коробки
            .catch(console.error);
        if (roles.cache.has("584673040470769667") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
            await roles.remove(role).catch(console.error); //Удалить роль коробки
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
            interaction.guild.channels.cache.get(process.env.rank_channel).send(
                `╔═════════♡════════╗
<@${opener}> +${rank_exp[i_rank].rank_amount}💠
\`Получено из королевской коробки.\`
╚═════════♡════════╝`
            );
            userData.rank += rank_exp[i_rank].rank_amount //ДОБАВИТЬ В ДРУГИЕ


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
            interaction.guild.channels.cache.get(process.env.act_channel).send(
                `╔═════════♡════════╗
<@${opener}> +${act_exp[i_act].act_amount}🌀
\`Получено из королевской коробки.\`
╚═════════♡════════╝`
            );

            userData.exp += act_exp[i_act].act_amount //ДОБАВИТЬ В ДРУГИЕ
            userData.totalexp += act_exp[i_act].act_amount
            //Список предметов
            let loot1 = [
                {
                    loot1_name: `🐋 ПИТОМЕЦ /lpet`,
                    dropChanceLOOT1: 10,
                    loot1_roleID: "553638061817200650",
                    loot1_description: "Обучайся различным навыкам у питомцев."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 🤑 /money`,
                    dropChanceLOOT1: 15,
                    loot1_roleID: "642810527579373588",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 😋 /music`,
                    dropChanceLOOT1: 15,
                    loot1_roleID: "642393088689700893",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 😠 /spider`,
                    dropChanceLOOT1: 15,
                    loot1_roleID: "636561006721761301",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ 👾 КАРТИНКА /miracle`,
                    dropChanceLOOT1: 10,
                    loot1_roleID: "642810538518118430",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ⛄ КАРТИНКА /snowman`,
                    dropChanceLOOT1: 10,
                    loot1_roleID: "642819600429481997",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ 🧡 КАРТИНКА /sova`,
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
                    loot1_name: `🐲 ПИТОМЕЦ /mpet`,
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
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🧁`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 💎`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🍍`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🤖`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 👹`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🍒`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ ⭐️`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🔥`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🍀`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🚀`,
                    dropChanceLOOT2: 7,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ⍟`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ✸`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ϟ`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ✘`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ♫`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ✓`,
                    dropChanceLOOT2: 5,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
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
                    
            const r_loot_msg = await interaction.guild.channels.cache.get(process.env.box_channel)
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
            if (!roles.cache.has(loot1[i_loot1].loot1_roleID)) {
                if (loot1[i_loot1].loot1_name == `💳 Подписка VIP на 7 дней`) {
                    await roles.add(loot1[i_loot1].loot1_roleID).catch(console.error);
                    interaction.guild.channels.cache.get(process.env.temp_channel).send(`<t:${timestamp + 608000}:f> (<t:${timestamp + 608000}:R>) - <@${opener}> - убрать \`${loot1[i_loot1].loot1_name}\`.`);
                    await r_loot_msg.react("✅")
                    const tempItems = new Temp({
                        userid: user.id,
                        guildid: interaction.guild.id,
                        roleid: loot1[i_loot1].loot1_roleID,
                        expire: Date.now() + (1000 * 60 * 60 * 24 * 7)
                    })
                    tempItems.save()

                } else if (loot1[i_loot1].loot1_name == `💫 КОСМИЧЕСКАЯ ПЫЛЬ`) {
                    interaction.guild.channels.cache.get(process.env.box_channel).send(`<@491343958660874242> - Необходимо выдать роль <@${opener}> - <t:${timestamp}:f>`);
                    await r_loot_msg.react("🕓")
                } else {
                    await roles.add(loot1[i_loot1].loot1_roleID).catch(console.error);
                    await r_loot_msg.react("✅")
                }
            } else {
                if (loot1[i_loot1].loot1_name == `💫 КОСМИЧЕСКАЯ ПЫЛЬ`) {
                    interaction.guild.channels.cache.get(process.env.box_channel).send(`<@491343958660874242> - Необходимо выдать роль <@${opener}> - <t:${timestamp}:f>`);
                    //- <t:${interaction.createdTimestamp}:f>
                    await r_loot_msg.react("🕓")
                } else {
                    await r_loot_msg.react("🚫")
                }
            };
            const filter = i => i.customId === 'boxesk';

                r_loot_msg.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000 })
                        .then(async (i) => {
                            if (i.user.id === interaction.member.user.id) {

                                await boxesk.components[0]
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji(`🕓`)
                                .setLabel(`Ожидается`)

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

                            i.reply({
                                content: `Ожидайте! Администрация скоро поставит вам значок/рамку!`
                            })
                            const reply = await i.fetchReply()

                            const waitembed = new EmbedBuilder()
                            .setTitle(`Необходимо поставить значок или рамку!`)
                            .setColor(process.env.bot_color)
                            .setDescription(
`Пользователь ${i.member} просит установить ему \`${loot2[i_loot2].loot2_name}\`
**Канал**: ${reply.channel}

[[Показать сообщение](${reply.url})]`)
                            .setTimestamp(Date.now())
                            .setThumbnail(i.member.displayAvatarURL())

                            await i.guild.channels.cache.get(process.env.mod_channel).send({
                                content: `<@${process.env.guild_admin}>`,
                                embeds: [waitembed]
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
            await interaction.editReply({
                content: `У вас отсутствует \`${role.name}\` коробка!`
            })
        }
    }
};