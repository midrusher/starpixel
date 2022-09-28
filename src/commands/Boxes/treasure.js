const { SlashCommandBuilder } = require('discord.js');
const { User } = require(`../../schemas/userdata`)
const { execute } = require('../../events/client/start_bot/ready');
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`treasure`)  //Название команды
        .setDescription(`Открыть сокровища`), //Описание команды
    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.items === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ
        const userData = await User.findOne({ userid: user.id }) 
       


        const { roles } = interaction.member //Участник команды
        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("595966177969176579") //ID коробки
            .catch(console.error);
        if (roles.cache.has("595966177969176579") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
            const cmd_name = `treasure` //Название команды
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
            let loot2 = [
                {
                    loot2_name: `🪐 ᅠМЕРКУРИЙ`, //G2
                    dropChanceLOOT2: 8,
                    loot2_roleID: "743831211667095592",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠВЕНЕРА`, //G1
                    dropChanceLOOT2: 18,
                    loot2_roleID: "597746062798880778",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠЛУНА`, //G3
                    dropChanceLOOT2: 2,
                    loot2_roleID: "780487592540897349",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠМАРС`, //G1
                    dropChanceLOOT2: 18,
                    loot2_roleID: "597746057203548160",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠЮПИТЕР`, //G3
                    dropChanceLOOT2: 2,
                    loot2_roleID: "597746054808731648",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠСАТУРН`, //G2
                    dropChanceLOOT2: 8,
                    loot2_roleID: "597746059879645185",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠУРАН`, //G2
                    dropChanceLOOT2: 8,
                    loot2_roleID: "745326453369077841",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠНЕПТУН`, //G1
                    dropChanceLOOT2: 18,
                    loot2_roleID: "780487592859795456",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠПЛУТОН`, //G3
                    dropChanceLOOT2: 2,
                    loot2_roleID: "597746051998285834",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `МИФИЧЕСКАЯ 🐉 КАРТИНКА  dragon`,
                    dropChanceLOOT2: 1,
                    loot2_roleID: "694914077104799764",
                    loot2_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot2_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 🥺 pls`,
                    dropChanceLOOT2: 4,
                    loot2_roleID: "607495941490212885",
                    loot2_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot2_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 🥳 party`,
                    dropChanceLOOT2: 4,
                    loot2_roleID: "694221126494060604",
                    loot2_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot2_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 😎 cool`,
                    dropChanceLOOT2: 4,
                    loot2_roleID: "740241984190545971",
                    loot2_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot2_name: `🐲 ПИТОМЕЦ  mpet`,
                    dropChanceLOOT2: 3,
                    loot2_roleID: "605696079819964426",
                    loot2_description: "Обучайся различным навыкам у питомцев."
                },
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
            const r_loot_msg = await interaction.guild.channels.cache.get(ch_list.box)
                .send(
                    `◾:rosette:◾
<@${opener}> открывает сокровище гильдии.
▛▀▀▀▀▀▜ ■ ▛▀▀▀▀▀▜ ■ ▛▀▀▀▀▀▜
\`${loot2[i_loot2].loot2_name}\`
${loot2[i_loot2].loot2_description}
▙▄▄▄▄▄▟ ■ ▙▄▄▄▄▄▟■ ▙▄▄▄▄▄▟
◾:rosette:◾`)
                    if ((!roles.cache.has(`553593136895623208`) && !roles.cache.has(`553593133884112900`) && !roles.cache.has(`553593136027533313`) && !roles.cache.has(`553593976037310489`) && !roles.cache.has(`780487593485008946`) && !roles.cache.has(`849695880688173087`) && !roles.cache.has(`992122876394225814`) && !roles.cache.has(`992123014831419472`) && !roles.cache.has(`992123019793276961`)) && (loot2[i_loot2].loot2_name == `🪐 ᅠМЕРКУРИЙ` || loot2[i_loot2].loot2_name == `🪐 ᅠВЕНЕРА` || loot2[i_loot2].loot2_name == `🪐 ᅠЛУНА` || loot2[i_loot2].loot2_name == `🪐 ᅠМАРС` || loot2[i_loot2].loot2_name == `🪐 ᅠЮПИТЕР` || loot2[i_loot2].loot2_name == `🪐 ᅠСАТУРН` || loot2[i_loot2].loot2_name == `🪐 ᅠУРАН` || loot2[i_loot2].loot2_name == `🪐 ᅠНЕПТУН` || loot2[i_loot2].loot2_name == `🪐 ᅠПЛУТОН`)) {
                        r_loot_msg.react("🚫")
                        r_loot_msg.reply({
                            content: `Вы должны иметь ранг \`${interaction.guild.roles.cache.get(`553593136895623208`).name}\` или выше, чтобы получить данный предмет!`
                        })
                    }

            else if (!roles.cache.has(loot2[i_loot2].loot2_roleID) && loot2[i_loot2].loot2_name !== `💫 КОСМИЧЕСКАЯ ПЫЛЬ`) {

                await roles.add(loot2[i_loot2].loot2_roleID).catch(console.error);
                await r_loot_msg.react("✅")

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
            };

            //Румбики (если необходимо)
            let rumbik = [
                {
                    rumb_amount: 10,
                    dropChanceRUMB: 49
                },
                {
                    rumb_amount: 15,
                    dropChanceRUMB: 33
                },
                {
                    rumb_amount: 20,
                    dropChanceRUMB: 17
                },
                {
                    rumb_amount: 30,
                    dropChanceRUMB: 1
                },

            ]

            //Рандом - румбики
            let sum_rumb = 0;
            for (let i_rumb = 0; i_rumb < rumbik.length; i_rumb++) {
                sum_rumb += rumbik[i_rumb].dropChanceRUMB;
            }
            let r_rumbik = Math.floor(Math.random() * sum_rumb);
            let i_rumb = 0;
            for (let s = rumbik[0].dropChanceRUMB; s <= r_rumbik; s += rumbik[i_rumb].dropChanceRUMB) {
                i_rumb++;
            }

            //Сообщение - румбики                       
            interaction.guild.channels.cache.get(ch_list.rumb).send(
                `╔═════════♡════════╗
<@${opener}> +${rumbik[i_rumb].rumb_amount}<:Rumbik:883638847056003072>
\`Получено из сокровища.\`
╚═════════♡════════╝`
            );

            if (roles.cache.has("553593133884112900") || roles.cache.has("553593136027533313") ||
                roles.cache.has("553593976037310489") || roles.cache.has("780487593485008946") ||
                roles.cache.has("849695880688173087") || roles.cache.has("992122876394225814") ||
                roles.cache.has("992123014831419472") || roles.cache.has("992123019793276961")) {
                userData.rumbik += rumbik[i_rumb].rumb_amount
            } else {

                userData.rumbik += 0
            }
            //Опыт рангов (если необходимо)
            let rank_exp = [
                {
                    rank_amount: 50,
                    dropChanceRANK: 50
                },
                {
                    rank_amount: 60,
                    dropChanceRANK: 30
                },
                {
                    rank_amount: 75,
                    dropChanceRANK: 15
                },
                {
                    rank_amount: 90,
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
\`Получено из сокровища.\`
╚═════════♡════════╝`
            );

            userData.rank += rank_exp[i_rank].rank_amount + (rank_exp[i_rank].rank_amount * 0.05 * userData.perks.rank_boost) //ДОБАВИТЬ В ДРУГИЕ

            //Опыт активности
            let act_exp = [
                {
                    act_amount: 100,
                    dropChanceACT: 40000
                },
                {
                    act_amount: 350,
                    dropChanceACT: 20000
                },
                {
                    act_amount: 1000,
                    dropChanceACT: 3000
                },
                {
                    act_amount: 500,
                    dropChanceACT: 7000
                },
                {
                    act_amount: 300,
                    dropChanceACT: 30000
                },
                {
                    act_amount: 10000,
                    dropChanceACT: 1
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
\`Получено из сокровища.\`
╚═════════♡════════╝`
            );
            userData.exp += act_exp[i_act].act_amount //ДОБАВИТЬ В ДРУГИЕ
            

            userData.save();

            console.log(chalk.magentaBright(`[${interaction.user.tag} открыл сокровище]`) + chalk.gray(`: +${act_exp[i_act].act_amount} опыта активности, +${rank_exp[i_rank].rank_amount} опыта рангов, +${rumbik[i_rumb].rumb_amount} и ${loot2[i_loot2].loot2_name}`))

        } else {
            await interaction.reply({
                content: `У вас отсутствует \`${role.name}\` коробка!`,
                ephemeral: true
            })
        }
    }
};