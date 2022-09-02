const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType } = require('discord.js');
const { execute } = require('../../events/client/ready');
const wait = require('node:timers/promises').setTimeout;
const { User } = require(`../../schemas/userdata`);
const chalk = require(`chalk`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`big`)  //Название команды
        .setDescription(`Открыть большую коробку.`), //Описание команды
    async execute(interaction, client) {
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id, name: user.username }) //ДОБАВИТЬ В ДРУГИЕ

        const message = await interaction.deferReply({
            fetchReply: true,
        });


        const { roles } = interaction.member //Участник команды
        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("521248091853291540") //ID коробки
            .catch(console.error);
        if (roles.cache.has("521248091853291540") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
            const cmd_name = `big` //Название команды
            const timestamp = Math.round(interaction.createdTimestamp / 1000)
            await roles.remove(role).catch(console.error); //Удалить роль коробки
            const opener = interaction.member.id;
            await interaction.deleteReply()

            //Лут из коробок
            //Случайный предмет
            //name - Название предмета
            //dropChanceLOOT - Шанс выпадения предмета
            //roleID - ID роли, которая связана с данным лутом.

            //Опыт рангов (если необходимо)
            let rank_exp = [
                {
                    rank_amount: 10,
                    dropChanceRANK: 50
                },
                {
                    rank_amount: 20,
                    dropChanceRANK: 30
                },
                {
                    rank_amount: 25,
                    dropChanceRANK: 15
                },
                {
                    rank_amount: 30,
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
\`Получено из большой коробки.\`
╚═════════♡════════╝`
            );
            userData.rank += rank_exp[i_rank].rank_amount //ДОБАВИТЬ В ДРУГИЕ
            



            //Опыт активности
            let act_exp = [
                {
                    act_amount: 100,
                    dropChanceACT: 40
                },
                {
                    act_amount: 150,
                    dropChanceACT: 20
                },
                {
                    act_amount: 200,
                    dropChanceACT: 3
                },
                {
                    act_amount: 170,
                    dropChanceACT: 7
                },
                {
                    act_amount: 130,
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
\`Получено из большой коробки.\`
╚═════════♡════════╝`
            );
            userData.exp += act_exp[i_act].act_amount //ДОБАВИТЬ В ДРУГИЕ
            userData.totalexp += act_exp[i_act].act_amount
                userData.save();
            //Список предметов
            let loot1 = [
                {
                    loot1_name: `🐛ПИТОМЕЦ /spet`,
                    dropChanceLOOT1: 8,
                    loot1_roleID: "553637207911563264",
                    loot1_description: "Обучайся различным навыкам у питомцев."
                },
                {
                    loot1_name: `🕊️ ПИТОМЕЦ /epet`,
                    dropChanceLOOT1: 6,
                    loot1_roleID: "553638054238093364",
                    loot1_description: "Обучайся различным навыкам у питомцев."
                },
                {
                    loot1_name: `РЕДКАЯ ЭМОЦИЯ 🤗 /hey`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "571757459732168704",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `РЕДКАЯ ЭМОЦИЯ 🤔 /hmm`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "571757461380399106",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `РЕДКАЯ ЭМОЦИЯ 😍 /love`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "571757462219128832",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `РЕДКАЯ ЭМОЦИЯ 🙂 /happy`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "571757463876141077",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `РЕДКАЯ 🍰 КАРТИНКА /cake`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "850079153746346044",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `РЕДКАЯ 👍 КАРТИНКА /like`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "850079142413598720",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `РЕДКАЯ 😡 КАРТИНКА /banuser`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "850079173149065277",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `РЕДКАЯ 🧡 КАРТИНКА /heart`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "642810535737425930",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА АЛЬФА`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "553660090184499201",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА БЕТА`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "553660091677540363",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА ГАММА`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "553660093523034112",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА ДЕЛЬТА`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "553660095259475989",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА ЭПСИЛОН`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "553660095951667217",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА ДЗЕТА`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "553660097520205824",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА ЭТА`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "572417192755462165",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА ТЕТА`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "595962185641885716",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА ЙОТА`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "609082751349686282",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `Награды нет.`,
                    dropChanceLOOT1: 1,
                    loot1_roleID: "584673040470769667", //Королевская
                    loot1_description: "Если вы имеете роль Плутона, то эта коробка превращается в Королевскую. :arrow_up:"
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
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 💧`,
                    symbol: `💧`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🌼`,
                    symbol: `🌼`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🎲`,
                    symbol: `🎲`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🍬`,
                    symbol: `🍬`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🍋`,
                    symbol: `🍋`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🍌`,
                    symbol: `🍌`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🍒`,
                    symbol: `🍒`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🍰`,
                    symbol: `🍰`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ ⚡`,
                    symbol: `⚡`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🌽`,
                    symbol: `🌽`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🌵`,
                    symbol: `🌵`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 💦`,
                    symbol: `💦`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🐷`,
                    symbol: `🐷`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 👽`,
                    symbol: `👽`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ ⏰`,
                    symbol: `⏰`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🌿`,
                    symbol: `🌿`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 🐌`,
                    symbol: `🐌`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `КОСМЕТИЧЕСКИЙ ЭМОДЗИ 💩`,
                    symbol: `💩`,
                    dropChanceLOOT2: 40,
                    loot2_description: ":beginner: Необходим ранг \"Чемпион гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ⋆`,
                    symbol: `⋆`,
                    dropChanceLOOT2: 20,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ◦`,
                    symbol: `◦`,
                    dropChanceLOOT2: 20,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ♡`,
                    symbol: `♡`,
                    dropChanceLOOT2: 20,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ✩`,
                    symbol: `✩`,
                    dropChanceLOOT2: 20,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ✧`,
                    symbol: `✧`,
                    dropChanceLOOT2: 20,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `РАМКА ДЛЯ НИКА ⋅`,
                    symbol: `⋅`,
                    dropChanceLOOT2: 20,
                    loot2_description: ":beginner: Необходим ранг \"Звёздочка гильдии\".\nЕсли хотите установить эмодзи, нажмите кнопку \"Установить\" в течение 60 секунд."
                },
                {
                    loot2_name: `Отсутствует.`,
                    dropChanceLOOT2: 160,
                    loot2_description: "Нет дополнительной косметической награды из большой коробки."
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
            if (loot2[i_loot2].loot2_name == `Отсутствует.`) {
                const r_loot_msg = await interaction.guild.channels.cache.get(process.env.box_channel)
                    .send(
                        `◾
<@${opener}> открывает большую коробку от гильдии.
╭═────═⌘═────═╮
\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}
╰═────═⌘═────═╯
Дополнительная косметическая награда из большой коробки: \`${loot2[i_loot2].loot2_name}\`
${loot2[i_loot2].loot2_description}
◾`)
                if (!roles.cache.has(loot1[i_loot1].loot1_roleID) && loot1[i_loot1].loot1_name != `Награды нет.` || !roles.cache.has(loot1[i_loot1].loot1_roleID) && loot1[i_loot1].loot1_name == `Награды нет.` && roles.cache.has("597746051998285834")) {
                    await roles.add(loot1[i_loot1].loot1_roleID).catch(console.error);
                    await r_loot_msg.react("✅")
                } else {
                    if (loot1[i_loot1].loot1_name == `Награды нет.` && !roles.cache.has("597746051998285834") || roles.cache.has(loot1[i_loot1].loot1_roleID)) {
                        await r_loot_msg.react("🚫")
                    };
                };
            } else {
                const boxes = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('boxes')
                    .setLabel('Установить')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji(`⬆️`)
                )
                const r_loot_msg = await interaction.guild.channels.cache.get(process.env.box_channel)
                    .send({
                        content: `◾
<@${opener}> открывает большую коробку от гильдии.
╭═────═⌘═────═╮
\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}
╰═────═⌘═────═╯
Дополнительная косметическая награда из большой коробки: \`${loot2[i_loot2].loot2_name}\`
${loot2[i_loot2].loot2_description}
◾`,
                        components: [boxes]
                    });
                if (!roles.cache.has(loot1[i_loot1].loot1_roleID) && loot1[i_loot1].loot1_name != `Награды нет.` || !roles.cache.has(loot1[i_loot1].loot1_roleID) && loot1[i_loot1].loot1_name == `Награды нет.` && roles.cache.has("597746051998285834")) {
                    await roles.add(loot1[i_loot1].loot1_roleID).catch(console.error);
                    await r_loot_msg.react("✅")
                } else {
                    if (loot1[i_loot1].loot1_name == `Награды нет.` && !roles.cache.has("597746051998285834") || roles.cache.has(loot1[i_loot1].loot1_roleID)) {
                        await r_loot_msg.react("🚫")
                    };
                };
                const filter = i => i.customId === 'boxes';

                r_loot_msg.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000 })
                        .then(async (i) => {
                            if (i.user.id === interaction.member.user.id) {
                                if (loot2[i_loot2].loot2_name.startsWith(`КОСМЕТИЧЕСКИЙ ЭМОДЗИ`) && (roles.cache.has("553593136027533313") || roles.cache.has("553593976037310489") || roles.cache.has("780487593485008946") || roles.cache.has("849695880688173087") || roles.cache.has("992122876394225814") || roles.cache.has("992123019793276961") || roles.cache.has("992123014831419472"))) {
                                    userData.displayname.symbol = loot2[i_loot2].symbol
                                    userData.save()
                                } 
                                
                                else if (loot2[i_loot2].loot2_name.startsWith(`РАМКА ДЛЯ НИКА`) && (roles.cache.has("553593976037310489") || roles.cache.has("780487593485008946") || roles.cache.has("849695880688173087") || roles.cache.has("992122876394225814") || roles.cache.has("992123014831419472") || roles.cache.has("992123019793276961"))) {
                                    userData.displayname.ramka1 = loot2[i_loot2].symbol
                                    userData.displayname.ramka2 = loot2[i_loot2].symbol
                                    userData.save()
                                } else return i.reply({
                                    content: `Вы не можете установить себе данный предмет, так как не получили минимальный ранг. Посмотреть минимальный ранг для данного действия вы можете в канале <#931620901882068992>!`
                                })
                                await boxes.components[0]
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji(`🕓`)
                                .setLabel(`Идёт обработка...`)

                            await r_loot_msg.edit({
                                content: `◾
<@${opener}> открывает большую коробку от гильдии.
╭═────═⌘═────═╮
\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}
╰═────═⌘═────═╯
Дополнительная косметическая награда из большой коробки: \`${loot2[i_loot2].loot2_name}\`
${loot2[i_loot2].loot2_description}
◾`,
                                components: [boxes]
                            })
                            i.reply({
                                content: `Ожидайте! Скоро ваша рамка/значок будет установлена! Если этого не произойдет в течение 15 минут, обратитесь в вопрос-модерам!`
                            })
                            } else {
                                i.reply({ content: `Вы не можете использовать данную кнопочку!`, ephemeral: true });
                            }
                        })
                        .catch(async (err) => {
                            await boxes.components[0]
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Secondary)
                                .setLabel(`Отменено`)
                                .setEmoji(`❌`)

                            await r_loot_msg.edit({
                                content: `◾
<@${opener}> открывает большую коробку от гильдии.
╭═────═⌘═────═╮
\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}
╰═────═⌘═────═╯
Дополнительная косметическая награда из большой коробки: \`${loot2[i_loot2].loot2_name}\`
${loot2[i_loot2].loot2_description}
◾`,
                                components: [boxes]
                            })
                        });
            }

            


            console.log(chalk.magentaBright(`[${interaction.user.tag} открыл большую коробку]`) + chalk.gray(`: +${act_exp[i_act].act_amount} опыта активности, +${rank_exp[i_rank].rank_amount} опыта рангов, ${loot1[i_loot1].loot1_name} и ${loot2[i_loot2].loot2_name}`))

        } else {
            await interaction.editReply({
                content: `У вас отсутствует \`${role.name}\` коробка!`
            })
        }
    }
};