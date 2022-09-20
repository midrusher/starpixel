const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`);
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`small`)  //Название команды
        .setDescription(`Открыть маленькую коробку.`), //Описание команды
    async execute(interaction, client) {
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ
        const userData = await User.findOne({ userid: user.id }) || new User({ userid: user.id, name: user.username }) //ДОБАВИТЬ В ДРУГИЕ
        


        const { roles } = interaction.member //Участник команды
        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("510932601721192458") //ID коробки
            .catch(console.error);
        if (roles.cache.has("510932601721192458") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
            const cmd_name = `small` //Название команды
            const timestamp = Math.round(interaction.createdTimestamp / 1000)
            await roles.remove(role).catch(console.error); //Удалить роль коробки
            const opener = interaction.member.id;
            const message = await interaction.deferReply({
            fetchReply: true,
        });
            await interaction.deleteReply()

            //Лут из коробок
            //Случайный предмет
            //name - Название предмета
            //dropChanceLOOT - Шанс выпадения предмета
            //roleID - ID роли, которая связана с данным лутом.

            //Список предметов
            let loot1 = [
                {
                    loot1_name: `🐛ПИТОМЕЦ /spet`,
                    dropChanceLOOT1: 12,
                    loot1_roleID: "553637207911563264",
                    loot1_description: "Обучайся различным навыкам у питомцев."
                },
                {
                    loot1_name: `🕊️ ПИТОМЕЦ /epet`,
                    dropChanceLOOT1: 2,
                    loot1_roleID: "553638054238093364",
                    loot1_description: "Обучайся различным навыкам у питомцев."
                },
                {
                    loot1_name: `СТАНДАРТНАЯ ЭМОЦИЯ 🙄 /oh`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "566528019208863744",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `СТАНДАРТНАЯ ЭМОЦИЯ 😌 /army`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "571743750049497089",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `СТАНДАРТНАЯ ЭМОЦИЯ 😮 /getup`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "571745411929341962",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `СТАНДАРТНАЯ ЭМОЦИЯ 😴 /sleep`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "571744516894228481",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
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
                    loot1_roleID: "521248091853291540", //Большая
                    loot1_description: ":nazar_amulet: Если у вас есть талисман удачи или Плутон, то эта коробка превратится в большую."
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


            //Отправка сообщения о луте              
            const r_loot_msg = await interaction.guild.channels.cache.get(ch_list.box)
                .send(
`◾
<@${opener}> открывает маленькую коробку от гильдии.
╭─────x─────╮
\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}
╰─────x─────╯
◾`)
            if (!roles.cache.has(loot1[i_loot1].loot1_roleID) && loot1[i_loot1].loot1_name != `Награды нет.` || !roles.cache.has(loot1[i_loot1].loot1_roleID) && loot1[i_loot1].loot1_name == `Награды нет.` && (roles.cache.has("597746051998285834") || roles.cache.has("572124468189593622"))) {
                await roles.add(loot1[i_loot1].loot1_roleID).catch(console.error);
                await r_loot_msg.react("✅")
            } else {
                if (loot1[i_loot1].loot1_name == `Награды нет.` && !roles.cache.has("597746051998285834" || "572124468189593622") || roles.cache.has(loot1[i_loot1].loot1_roleID))  {
                    await r_loot_msg.react("🚫")
                };
            };


            //Опыт рангов (если необходимо)
            let rank_exp = [
                {
                    rank_amount: 10,
                    dropChanceRANK: 70
                },
                {
                    rank_amount: 20,
                    dropChanceRANK: 30
                }

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
\`Получено из маленькой коробки.\`
╚═════════♡════════╝`
            );

            userData.rank += rank_exp[i_rank].rank_amount + (rank_exp[i_rank].rank_amount * 0.05 * userData.perks.rank_boost) //ДОБАВИТЬ В ДРУГИЕ

            //Опыт активности
            let act_exp = [
                {
                    act_amount: 40,
                    dropChanceACT: 40
                },
                {
                    act_amount: 70,
                    dropChanceACT: 20
                },
                {
                    act_amount: 100,
                    dropChanceACT: 3
                },
                {
                    act_amount: 90,
                    dropChanceACT: 7
                },
                {
                    act_amount: 50,
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
\`Получено из маленькой коробки.\`
╚═════════♡════════╝`
            );
            userData.exp += act_exp[i_act].act_amount //ДОБАВИТЬ В ДРУГИЕ
            userData.totalexp += act_exp[i_act].act_amount
                userData.save();
                console.log(chalk.magentaBright(`[${interaction.user.tag} открыл маленькую коробку]`) + chalk.gray(`: +${act_exp[i_act].act_amount} опыта активности, +${rank_exp[i_rank].rank_amount} опыта рангов и ${loot1[i_loot1].loot1_name}`))
            
        } else {
            await interaction.reply({
                content: `У вас отсутствует \`${role.name}\` коробка!`,
                ephemeral: true
            })
        }
    }
};