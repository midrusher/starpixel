const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`myth`)  //Название команды
        .setDescription(`Открыть подарок судьбы.`), //Описание команды
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
        });
        const { roles } = interaction.member //Участник команды
        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("876045350673186826") //ID коробки
            .catch(console.error);

        if (roles.cache.has("876045350673186826") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
            const cmd_name = `big` //Название команды
            await roles.remove(role).catch(console.error); //Удалить роль коробки
            const opener = `<@${roles.id}>`
            //Лут из коробок
            //Случайный предмет
            //name - Название предмета
            //dropChanceLOOT - Шанс выпадения предмета
            //roleID - ID роли, которая связана с данным лутом.

            //Список предметов
            let loot = [
                {
                    loot_name: `name 1`,
                    dropChanceLOOT: 10,
                    loot_roleID: ""
                },
                {
                    loot_name: `name 2`,
                    dropChanceLOOT: 20,
                    loot_roleID: ""
                },
                {
                    loot_name: `name 3`,
                    dropChanceLOOT: 30,
                    loot_roleID: ""
                },
                {
                    loot_name: `name 4`,
                    dropChanceLOOT: 20,
                    loot_roleID: ""
                },
                {
                    loot_name: `name 5`,
                    dropChanceLOOT: 20,
                    loot_roleID: ""
                }
            ];

            //рандом предметов
            let sum_loot = 0;
            for (let i_loot = 0; i_loot < loot.length; i_loot++) {
                sum_loot += loot[i_loot].dropChanceLOOT;
            }
            let r_loot = Math.floor(Math.random() * sum_loot);
            let i_loot = 0;
            for (let s = loot[0].dropChanceLOOT; s <= r_loot; s += loot[i_loot].dropChanceLOOT) {
                i_loot++;
            }

            //Отправка сообщения о луте              
            const r_loot_msg = await interaction.guild.channels.cache.get(process.env.box_channel)
                .send(`${loot[i_loot].loot_name}`)
            if (!roles.cache.has(loot[i_loot].loot_roleID)) {
                await r_loot_msg.react("✅")
                await roles.add(loot[i_loot].loot_roleID).catch(console.error)
            } else {
                await r_loot_msg.react("❌")
            };



            //Румбики (если необходимо)
            let rumbik = [
                {
                    rumb_amount: 1,
                    dropChanceRUMB: 50
                },
                {
                    rumb_amount: 5,
                    dropChanceRUMB: 30
                },
                {
                    rumb_amount: 10,
                    dropChanceRUMB: 15
                },
                {
                    rumb_amount: 20,
                    dropChanceRUMB: 5
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
            interaction.guild.channels.cache.get(process.env.rumb_channel).send(
                `${rumbik[i_rumb].rumb_amount}<:Rumbik:883638847056003072>`
            );




            //Опыт рангов (если необходимо)
            let rank_exp = [
                {
                    rank_amount: 1,
                    dropChanceRANK: 50
                },
                {
                    rank_amount: 5,
                    dropChanceRANK: 30
                },
                {
                    rank_amount: 10,
                    dropChanceRANK: 15
                },
                {
                    rank_amount: 20,
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
                `${rank_exp[i_rank].rank_amount}💠`
            );



            //Опыт активности
            let act_exp = [
                {
                    act_amount: 1,
                    dropChanceACT: 50
                },
                {
                    act_amount: 5,
                    dropChanceACT: 30
                },
                {
                    act_amount: 10,
                    dropChanceACT: 15
                },
                {
                    act_amount: 20,
                    dropChanceACT: 5
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
                `${act_exp[i_act].act_amount}🌀`
            );


            console.log(`${interaction.member.displayName} использовал команду "/${cmd_name}"`)
            await interaction.deleteReply()
        } else {
            await interaction.editReply({
                content: `У вас нет \`${role.name}\` коробки!`
            })
        }
    }
};