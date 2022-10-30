const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`);
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)
const linksInfo = require(`../../discord structure/links.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`present`)  //Название команды
        .setDescription(`Открыть подарок`)
        .setDMPermission(false), //Описание команды
    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.items === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ
        const userData = await User.findOne({ userid: user.id })



        const { roles } = interaction.member //Участник команды
        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("925799156679856240") //ID коробки
            .catch(console.error);
        if (roles.cache.has("925799156679856240") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
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
                    loot1_name: `🐛ПИТОМЕЦ  spet`,
                    dropChanceLOOT1: 12,
                    loot1_roleID: "553637207911563264",
                    loot1_description: "Обучайся различным навыкам у питомцев."
                },
                {
                    loot1_name: `🕊️ ПИТОМЕЦ  epet`,
                    dropChanceLOOT1: 2,
                    loot1_roleID: "553638054238093364",
                    loot1_description: "Обучайся различным навыкам у питомцев."
                },
                {
                    loot1_name: `СТАНДАРТНАЯ ЭМОЦИЯ 🙄 oh`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "566528019208863744",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `СТАНДАРТНАЯ ЭМОЦИЯ 😌 army`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "571743750049497089",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `СТАНДАРТНАЯ ЭМОЦИЯ 😮 getup`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "571745411929341962",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `СТАНДАРТНАЯ ЭМОЦИЯ 😴 sleep`,
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
                    loot1_name: `🐉 КАРТИНКА  dragon`,
                    dropChanceLOOT1: 1,
                    loot1_roleID: "694914077104799764",
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

            const songs = [
                `Новый год к нам мчится`,
                `А снег идет`,
                `Знает каждый снеговик снеговика`,
                `Новый год, он раз в году!`,
                `На свете есть Волшебный клей`,
                `Наша елка — просто чудо`,
                `Хорошо, что каждый год к нам приходит Новый год`,
                `Не рубили елочку мы на Новый год`,
                `Под Новый год, как в сказке, полным-полно чудес`,
                `Снежинки спускаются с неба`,
                `Белые снежинки кружатся с утра`,
                `Праздник к нам приходит`,

            ]
            const r_song = songs[Math.floor(Math.random() * songs.length)]

            //Отправка сообщения о луте              
            const r_loot_msg = await interaction.guild.channels.cache.get(ch_list.box)
                .send(
                    `<@${opener}> открывает подарок:

╔━═━︽︾︽︾🎅︾︽︾︽━═━╗
\`${loot1[i_loot1].loot1_name}\`    
${r_song}!
╚━═━︽︾︽︾🎅︾︽︾︽━═━╝`)
            if (!roles.cache.has(loot1[i_loot1].loot1_roleID)) {
                await roles.add(loot1[i_loot1].loot1_roleID).catch(console.error);
                await r_loot_msg.react("✅")
            } else {
                await r_loot_msg.react("🚫")
            }



            //Опыт активности
            let act_exp = [
                {
                    act_amount: 400,
                    dropChanceACT: 40
                },
                {
                    act_amount: 700,
                    dropChanceACT: 20
                },
                {
                    act_amount: 1000,
                    dropChanceACT: 3
                },
                {
                    act_amount: 900,
                    dropChanceACT: 7
                },
                {
                    act_amount: 500,
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
\`Получено из подарка.\`
╚═════════♡════════╝`
            );
            userData.exp += act_exp[i_act].act_amount //ДОБАВИТЬ В ДРУГИЕ
            
            userData.save();
            console.log(chalk.magentaBright(`[${interaction.user.tag} открыл подарок]`) + chalk.gray(`: +${act_exp[i_act].act_amount} опыта активности и ${loot1[i_loot1].loot1_name}`))

        } else {
            await interaction.reply({
                content: `У вас отсутствует \`${role.name}\` коробка!`,
                ephemeral: true
            })
        }
    }
};