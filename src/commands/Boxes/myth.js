const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`myth`)  //Название команды
        .setDescription(`Открыть Подарок судьбы.`), //Описание команды
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
        });
        
        const timestamp = Math.round(interaction.createdTimestamp / 1000)
        const opener = interaction.member.id;
        const cmd_name = `myth` //Название команды
        const { roles } = interaction.member //Участник команды

        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("781069821953441832") //ID коробки
            .catch(console.error);
        if (roles.cache.has("781069821953441832") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
            await roles.remove(role).catch(console.error); //Удалить роль коробки
            await interaction.deleteReply()

            //Лут из коробок
            //Случайный предмет
            //name - Название предмета
            //dropChanceLOOT - Шанс выпадения предмета
            //roleID - ID роли, которая связана с данным лутом.

            //Список предметов
            let loot1 = [
                {
                    loot1_name: `🐋 ПИТОМЕЦ /lpet`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "553638061817200650",
                    loot1_description: "Обучайся различным навыкам у питомцев."
                },
                {
                    loot1_name: `🐲 ПИТОМЕЦ /mpet`,
                    dropChanceLOOT1: 2,
                    loot1_roleID: "605696079819964426",
                    loot1_description: "Обучайся различным навыкам у питомцев."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 🤑 /money`,
                    dropChanceLOOT1: 7,
                    loot1_roleID: "642810527579373588",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 😋 /music`,
                    dropChanceLOOT1: 7,
                    loot1_roleID: "642393088689700893",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 😠 /spider`,
                    dropChanceLOOT1: 7,
                    loot1_roleID: "636561006721761301",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ 👾 КАРТИНКА /miracle`,
                    dropChanceLOOT1: 3,
                    loot1_roleID: "642810538518118430",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ ⛄ КАРТИНКА /snowman`,
                    dropChanceLOOT1: 3,
                    loot1_roleID: "642819600429481997",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `ЛЕГЕНДАРНАЯ 🧡 КАРТИНКА /sova`,
                    dropChanceLOOT1: 3,
                    loot1_roleID: "850079134700666890",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `💫 КОСМИЧЕСКАЯ ПЫЛЬ`,
                    dropChanceLOOT1: 9,
                    loot1_roleID: "609085186738618395",
                    loot1_description: "Вы находите одну из пяти частей кометы. Соберите все 5 частей, чтобы создать Комету!" //до сюда есть роль айди
                },
                {
                    loot1_name: `РЕДКАЯ 🍰 КАРТИНКА /cake`,
                    dropChanceLOOT1: 7,
                    loot1_roleID: "850079153746346044",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `РЕДКАЯ 👍 КАРТИНКА /like`,
                    dropChanceLOOT1: 7,
                    loot1_roleID: "850079142413598720",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `РЕДКАЯ 😡 КАРТИНКА /banuser`,
                    dropChanceLOOT1: 7,
                    loot1_roleID: "850079173149065277",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `РЕДКАЯ 🧡 КАРТИНКА /heart`,
                    dropChanceLOOT1: 1,
                    loot1_roleID: "642810535737425930",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `МИФИЧЕСКАЯ 🐉 КАРТИНКА /dragon`,
                    dropChanceLOOT1: 1,
                    loot1_roleID: "694914077104799764",
                    loot1_description: "Используй её, чтобы разнообразить чат."
                },
                {
                    loot1_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 🥺 /pls`,
                    dropChanceLOOT1: 4,
                    loot1_roleID: "607495941490212885",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 🥳 /party`,
                    dropChanceLOOT1: 4,
                    loot1_roleID: "694221126494060604",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 😎 /cool`,
                    dropChanceLOOT1: 4,
                    loot1_roleID: "740241984190545971",
                    loot1_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА АЛЬФА`,
                    dropChanceLOOT1: 3,
                    loot1_roleID: "553660090184499201",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА БЕТА`,
                    dropChanceLOOT1: 3,
                    loot1_roleID: "553660091677540363",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА ГАММА`,
                    dropChanceLOOT1: 3,
                    loot1_roleID: "553660093523034112",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА ДЕЛЬТА`,
                    dropChanceLOOT1: 3,
                    loot1_roleID: "553660095259475989",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА ЭПСИЛОН`,
                    dropChanceLOOT1: 3,
                    loot1_roleID: "553660095951667217",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `⭐ ЗВЕЗДА ДЗЕТА`,
                    dropChanceLOOT1: 3,
                    loot1_roleID: "553660097520205824",
                    loot1_description: "Собери 9 звёзд, чтобы создать созвездие."
                },
                {
                    loot1_name: `☄️ КОМЕТА БЕННЕТА`,
                    dropChanceLOOT1: 2,
                    loot1_roleID: "784434241613987861",
                    loot1_description: "Соберите все звёзды, созвездия и кометы, чтобы получить тайную награду."
                },
                {
                    loot1_name: `☄️ КОМЕТА ГАЛЛЕЯ`,
                    dropChanceLOOT1: 2,
                    loot1_roleID: "784434242083487826",
                    loot1_description: "Соберите все звёзды, созвездия и кометы, чтобы получить тайную награду."
                },
                {
                    loot1_name: `☄️ КОМЕТА ЛЕКСЕЛЯ`,
                    dropChanceLOOT1: 2,
                    loot1_roleID: "781069818525777940",
                    loot1_description: "Соберите все звёзды, созвездия и кометы, чтобы получить тайную награду."
                }];
  const loot3 = [
                    {
                        loot3_name: `🐋 ПИТОМЕЦ /lpet`,
                        dropChanceLOOT3: 5,
                        loot3_roleID: "553638061817200650",
                        loot3_description: "Обучайся различным навыкам у питомцев."
                    },
                    {
                        loot3_name: `🐲 ПИТОМЕЦ /mpet`,
                        dropChanceLOOT3: 2,
                        loot3_roleID: "605696079819964426",
                        loot3_description: "Обучайся различным навыкам у питомцев."
                    },
                    {
                        loot3_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 🤑 /money`,
                        dropChanceLOOT3: 7,
                        loot3_roleID: "642810527579373588",
                        loot3_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                    },
                    {
                        loot3_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 😋 /music`,
                        dropChanceLOOT3: 7,
                        loot3_roleID: "642393088689700893",
                        loot3_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                    },
                    {
                        loot3_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 😠 /spider`,
                        dropChanceLOOT3: 7,
                        loot3_roleID: "636561006721761301",
                        loot3_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                    },
                    {
                        loot3_name: `ЛЕГЕНДАРНАЯ 👾 КАРТИНКА /miracle`,
                        dropChanceLOOT3: 3,
                        loot3_roleID: "642810538518118430",
                        loot3_description: "Используй её, чтобы разнообразить чат."
                    },
                    {
                        loot3_name: `ЛЕГЕНДАРНАЯ ⛄ КАРТИНКА /snowman`,
                        dropChanceLOOT3: 3,
                        loot3_roleID: "642819600429481997",
                        loot3_description: "Используй её, чтобы разнообразить чат."
                    },
                    {
                        loot3_name: `ЛЕГЕНДАРНАЯ 🧡 КАРТИНКА /sova`,
                        dropChanceLOOT3: 3,
                        loot3_roleID: "850079134700666890",
                        loot3_description: "Используй её, чтобы разнообразить чат."
                    },
                    {
                        loot3_name: `💫 КОСМИЧЕСКАЯ ПЫЛЬ`,
                        dropChanceLOOT3: 9,
                        loot3_roleID: "609085186738618395",
                        loot3_description: "Вы находите одну из пяти частей кометы. Соберите все 5 частей, чтобы создать Комету!" //до сюда есть роль айди
                    },
                    {
                        loot3_name: `РЕДКАЯ 🍰 КАРТИНКА /cake`,
                        dropChanceLOOT3: 7,
                        loot3_roleID: "850079153746346044",
                        loot3_description: "Используй её, чтобы разнообразить чат."
                    },
                    {
                        loot3_name: `РЕДКАЯ 👍 КАРТИНКА /like`,
                        dropChanceLOOT3: 7,
                        loot3_roleID: "850079142413598720",
                        loot3_description: "Используй её, чтобы разнообразить чат."
                    },
                    {
                        loot3_name: `РЕДКАЯ 😡 КАРТИНКА /banuser`,
                        dropChanceLOOT3: 7,
                        loot3_roleID: "850079173149065277",
                        loot3_description: "Используй её, чтобы разнообразить чат."
                    },
                    {
                        loot3_name: `РЕДКАЯ 🧡 КАРТИНКА /heart`,
                        dropChanceLOOT3: 1,
                        loot3_roleID: "642810535737425930",
                        loot3_description: "Используй её, чтобы разнообразить чат."
                    },
                    {
                        loot3_name: `МИФИЧЕСКАЯ 🐉 КАРТИНКА /dragon`,
                        dropChanceLOOT3: 1,
                        loot3_roleID: "694914077104799764",
                        loot3_description: "Используй её, чтобы разнообразить чат."
                    },
                    {
                        loot3_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 🥺 /pls`,
                        dropChanceLOOT3: 4,
                        loot3_roleID: "607495941490212885",
                        loot3_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                    },
                    {
                        loot3_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 🥳 /party`,
                        dropChanceLOOT3: 4,
                        loot3_roleID: "694221126494060604",
                        loot3_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                    },
                    {
                        loot3_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 😎 /cool`,
                        dropChanceLOOT3: 4,
                        loot3_roleID: "740241984190545971",
                        loot3_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                    },
                    {
                        loot3_name: `⭐ ЗВЕЗДА АЛЬФА`,
                        dropChanceLOOT3: 3,
                        loot3_roleID: "553660090184499201",
                        loot3_description: "Собери 9 звёзд, чтобы создать созвездие."
                    },
                    {
                        loot3_name: `⭐ ЗВЕЗДА БЕТА`,
                        dropChanceLOOT3: 3,
                        loot3_roleID: "553660091677540363",
                        loot3_description: "Собери 9 звёзд, чтобы создать созвездие."
                    },
                    {
                        loot3_name: `⭐ ЗВЕЗДА ГАММА`,
                        dropChanceLOOT3: 3,
                        loot3_roleID: "553660093523034112",
                        loot3_description: "Собери 9 звёзд, чтобы создать созвездие."
                    },
                    {
                        loot3_name: `⭐ ЗВЕЗДА ДЕЛЬТА`,
                        dropChanceLOOT3: 3,
                        loot3_roleID: "553660095259475989",
                        loot3_description: "Собери 9 звёзд, чтобы создать созвездие."
                    },
                    {
                        loot3_name: `⭐ ЗВЕЗДА ЭПСИЛОН`,
                        dropChanceLOOT3: 3,
                        loot3_roleID: "553660095951667217",
                        loot3_description: "Собери 9 звёзд, чтобы создать созвездие."
                    },
                    {
                        loot3_name: `⭐ ЗВЕЗДА ДЗЕТА`,
                        dropChanceLOOT3: 3,
                        loot3_roleID: "553660097520205824",
                        loot3_description: "Собери 9 звёзд, чтобы создать созвездие."
                    },
                    {
                        loot3_name: `☄️ КОМЕТА БЕННЕТА`,
                        dropChanceLOOT3: 2,
                        loot3_roleID: "784434241613987861",
                        loot3_description: "Соберите все звёзды, созвездия и кометы, чтобы получить тайную награду."
                    },
                    {
                        loot3_name: `☄️ КОМЕТА ГАЛЛЕЯ`,
                        dropChanceLOOT3: 2,
                        loot3_roleID: "784434242083487826",
                        loot3_description: "Соберите все звёзды, созвездия и кометы, чтобы получить тайную награду."
                    },
                    {
                        loot3_name: `☄️ КОМЕТА ЛЕКСЕЛЯ`,
                        dropChanceLOOT3: 2,
                        loot3_roleID: "781069818525777940",
                        loot3_description: "Соберите все звёзды, созвездия и кометы, чтобы получить тайную награду."
                    }];
                const loot4 = [
                        {
                            loot4_name: `🐋 ПИТОМЕЦ /lpet`,
                            dropChanceLOOT4: 5,
                            loot4_roleID: "553638061817200650",
                            loot4_description: "Обучайся различным навыкам у питомцев."
                        },
                        {
                            loot4_name: `🐲 ПИТОМЕЦ /mpet`,
                            dropChanceLOOT4: 2,
                            loot4_roleID: "605696079819964426",
                            loot4_description: "Обучайся различным навыкам у питомцев."
                        },
                        {
                            loot4_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 🤑 /money`,
                            dropChanceLOOT4: 7,
                            loot4_roleID: "642810527579373588",
                            loot4_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                        },
                        {
                            loot4_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 😋 /music`,
                            dropChanceLOOT4: 7,
                            loot4_roleID: "642393088689700893",
                            loot4_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                        },
                        {
                            loot4_name: `ЛЕГЕНДАРНАЯ ЭМОЦИЯ 😠 /spider`,
                            dropChanceLOOT4: 7,
                            loot4_roleID: "636561006721761301",
                            loot4_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                        },
                        {
                            loot4_name: `ЛЕГЕНДАРНАЯ 👾 КАРТИНКА /miracle`,
                            dropChanceLOOT4: 3,
                            loot4_roleID: "642810538518118430",
                            loot4_description: "Используй её, чтобы разнообразить чат."
                        },
                        {
                            loot4_name: `ЛЕГЕНДАРНАЯ ⛄ КАРТИНКА /snowman`,
                            dropChanceLOOT4: 3,
                            loot4_roleID: "642819600429481997",
                            loot4_description: "Используй её, чтобы разнообразить чат."
                        },
                        {
                            loot4_name: `ЛЕГЕНДАРНАЯ 🧡 КАРТИНКА /sova`,
                            dropChanceLOOT4: 3,
                            loot4_roleID: "850079134700666890",
                            loot4_description: "Используй её, чтобы разнообразить чат."
                        },
                        {
                            loot4_name: `💫 КОСМИЧЕСКАЯ ПЫЛЬ`,
                            dropChanceLOOT4: 9,
                            loot4_roleID: "609085186738618395",
                            loot4_description: "Вы находите одну из пяти частей кометы. Соберите все 5 частей, чтобы создать Комету!" //до сюда есть роль айди
                        },
                        {
                            loot4_name: `РЕДКАЯ 🍰 КАРТИНКА /cake`,
                            dropChanceLOOT4: 7,
                            loot4_roleID: "850079153746346044",
                            loot4_description: "Используй её, чтобы разнообразить чат."
                        },
                        {
                            loot4_name: `РЕДКАЯ 👍 КАРТИНКА /like`,
                            dropChanceLOOT4: 7,
                            loot4_roleID: "850079142413598720",
                            loot4_description: "Используй её, чтобы разнообразить чат."
                        },
                        {
                            loot4_name: `РЕДКАЯ 😡 КАРТИНКА /banuser`,
                            dropChanceLOOT4: 7,
                            loot4_roleID: "850079173149065277",
                            loot4_description: "Используй её, чтобы разнообразить чат."
                        },
                        {
                            loot4_name: `РЕДКАЯ 🧡 КАРТИНКА /heart`,
                            dropChanceLOOT4: 1,
                            loot4_roleID: "642810535737425930",
                            loot4_description: "Используй её, чтобы разнообразить чат."
                        },
                        {
                            loot4_name: `МИФИЧЕСКАЯ 🐉 КАРТИНКА /dragon`,
                            dropChanceLOOT4: 1,
                            loot4_roleID: "694914077104799764",
                            loot4_description: "Используй её, чтобы разнообразить чат."
                        },
                        {
                            loot4_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 🥺 /pls`,
                            dropChanceLOOT4: 4,
                            loot4_roleID: "607495941490212885",
                            loot4_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                        },
                        {
                            loot4_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 🥳 /party`,
                            dropChanceLOOT4: 4,
                            loot4_roleID: "694221126494060604",
                            loot4_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                        },
                        {
                            loot4_name: `МИФИЧЕСКАЯ ЭМОЦИЯ 😎 /cool`,
                            dropChanceLOOT4: 4,
                            loot4_roleID: "740241984190545971",
                            loot4_description: "Используй её, чтобы лучше показать свои эмоции в чате."
                        },
                        {
                            loot4_name: `⭐ ЗВЕЗДА АЛЬФА`,
                            dropChanceLOOT4: 3,
                            loot4_roleID: "553660090184499201",
                            loot4_description: "Собери 9 звёзд, чтобы создать созвездие."
                        },
                        {
                            loot4_name: `⭐ ЗВЕЗДА БЕТА`,
                            dropChanceLOOT4: 3,
                            loot4_roleID: "553660091677540363",
                            loot4_description: "Собери 9 звёзд, чтобы создать созвездие."
                        },
                        {
                            loot4_name: `⭐ ЗВЕЗДА ГАММА`,
                            dropChanceLOOT4: 3,
                            loot4_roleID: "553660093523034112",
                            loot4_description: "Собери 9 звёзд, чтобы создать созвездие."
                        },
                        {
                            loot4_name: `⭐ ЗВЕЗДА ДЕЛЬТА`,
                            dropChanceLOOT4: 3,
                            loot4_roleID: "553660095259475989",
                            loot4_description: "Собери 9 звёзд, чтобы создать созвездие."
                        },
                        {
                            loot4_name: `⭐ ЗВЕЗДА ЭПСИЛОН`,
                            dropChanceLOOT4: 3,
                            loot4_roleID: "553660095951667217",
                            loot4_description: "Собери 9 звёзд, чтобы создать созвездие."
                        },
                        {
                            loot4_name: `⭐ ЗВЕЗДА ДЗЕТА`,
                            dropChanceLOOT4: 3,
                            loot4_roleID: "553660097520205824",
                            loot4_description: "Собери 9 звёзд, чтобы создать созвездие."
                        },
                        {
                            loot4_name: `☄️ КОМЕТА БЕННЕТА`,
                            dropChanceLOOT4: 2,
                            loot4_roleID: "784434241613987861",
                            loot4_description: "Соберите все звёзды, созвездия и кометы, чтобы получить тайную награду."
                        },
                        {
                            loot4_name: `☄️ КОМЕТА ГАЛЛЕЯ`,
                            dropChanceLOOT4: 2,
                            loot4_roleID: "784434242083487826",
                            loot4_description: "Соберите все звёзды, созвездия и кометы, чтобы получить тайную награду."
                        },
                        {
                            loot4_name: `☄️ КОМЕТА ЛЕКСЕЛЯ`,
                            dropChanceLOOT1: 2,
                            loot4_roleID: "781069818525777940",
                            loot4_description: "Соберите все звёзды, созвездия и кометы, чтобы получить тайную награду."
                        }];

            //рандом предметов
            //L1
            let sum_loot1 = 0;
            for (let i_loot1 = 0; i_loot1 < loot1.length; i_loot1++) {
                sum_loot1 += loot1[i_loot1].dropChanceLOOT1;
            }
            let r_loot1 = Math.floor(Math.random() * sum_loot1);
            let i_loot1 = 0;
            for (let s = loot1[0].dropChanceLOOT1; s <= r_loot1; s += loot1[i_loot1].dropChanceLOOT1) {
                i_loot1++;
            }

            //L3
            let sum_loot3 = 0;
            for (let i_loot3 = 0; i_loot3 < loot3.length; i_loot3++) {
                sum_loot3 += loot3[i_loot3].dropChanceLOOT3;
            }
            let r_loot3 = Math.floor(Math.random() * sum_loot3);
            let i_loot3 = 0;
            for (let s = loot3[0].dropChanceLOOT3; s <= r_loot3; s += loot3[i_loot3].dropChanceLOOT3) {
                i_loot3++;
            }

            //L4
            let sum_loot4 = 0;
            for (let i_loot4 = 0; i_loot4 < loot4.length; i_loot4++) {
                sum_loot4 += loot4[i_loot4].dropChanceLOOT4;
            }
            let r_loot4 = Math.floor(Math.random() * sum_loot4);
            let i_loot4 = 0;
            for (let s = loot4[0].dropChanceLOOT4; s <= r_loot4; s += loot4[i_loot4].dropChanceLOOT4) {
                i_loot4++;
            }

            //Лут 2
            let loot2 = [
                {
                    loot2_name: `🪐 ᅠМЕРКУРИЙ`, //G2
                    dropChanceLOOT2: 9,
                    loot2_roleID: "743831211667095592",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠВЕНЕРА`, //G1
                    dropChanceLOOT2: 20,
                    loot2_roleID: "597746062798880778",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠЛУНА`, //G3
                    dropChanceLOOT2: 4,
                    loot2_roleID: "780487592540897349",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠМАРС`, //G1
                    dropChanceLOOT2: 20,
                    loot2_roleID: "597746057203548160",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠЮПИТЕР`, //G3
                    dropChanceLOOT2: 4,
                    loot2_roleID: "597746054808731648",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠСАТУРН`, //G2
                    dropChanceLOOT2: 9,
                    loot2_roleID: "597746059879645185",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠУРАН`, //G2
                    dropChanceLOOT2: 9,
                    loot2_roleID: "745326453369077841",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠНЕПТУН`, //G1
                    dropChanceLOOT2: 20,
                    loot2_roleID: "780487592859795456",
                    loot2_description: "Это очень ценная мифическая награда."
                },
                {
                    loot2_name: `🪐 ᅠПЛУТОН`, //G3
                    dropChanceLOOT2: 4,
                    loot2_roleID: "597746051998285834",
                    loot2_description: "Это очень ценная мифическая награда."
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
            const r_loot_msg = await interaction.guild.channels.cache.get(process.env.box_channel)
                .send(
`☆

                    ☆                                  ☆

   ☆                                                                       ☆


<@${opener}> открывает Подарок судьбы...

\`${loot2[i_loot2].loot2_name}\`
${loot2[i_loot2].loot2_description}.

\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}.

\`${loot3[i_loot3].loot3_name}\`
${loot3[i_loot3].loot3_description}.

\`${loot4[i_loot4].loot4_name}\`
${loot4[i_loot4].loot4_description}.

   ☆                                                                       ☆

                    ☆                                  ☆

☆`)        
            //L1 выдача
            if (!roles.cache.has(loot1[i_loot1].loot1_roleID)) {
                    if (loot1[i_loot1].loot1_name == `💫 КОСМИЧЕСКАЯ ПЫЛЬ`) {
                    interaction.guild.channels.cache.get(process.env.box_channel).send(`<@491343958660874242> - Необходимо выдать роль \`${loot1[i_loot1].loot1_name}\` пользователю <@${opener}> - <t:${timestamp}:f>`);
                    await r_loot_msg.react("🕓")
                } else {
                    await roles.add(loot1[i_loot1].loot1_roleID).catch(console.error);
                    await r_loot_msg.react("✅")
                }
            }  else {
                if (loot1[i_loot1].loot1_name == `💫 КОСМИЧЕСКАЯ ПЫЛЬ`) {
                    interaction.guild.channels.cache.get(process.env.box_channel).send(`<@491343958660874242> - Необходимо выдать роль <@${opener}> - <t:${timestamp}:f>`);
                    //- <t:${interaction.createdTimestamp}:f>
                    await r_loot_msg.react("🕓")
                } else {
                 await r_loot_msg.react("🚫")
                }
            };

            //L2 выдача
            if (!roles.cache.has(loot2[i_loot2].loot2_roleID)) {
                await roles.add(loot2[i_loot2].loot2_roleID).catch(console.error);
                await r_loot_msg.react("✅")
            }
          else {
             await r_loot_msg.react("🚫")
        };

            //L3 выдача
            if (!roles.cache.has(loot3[i_loot3].loot3_roleID)) {
                if (loot3[i_loot3].loot3_name == `💫 КОСМИЧЕСКАЯ ПЫЛЬ`) {
                interaction.guild.channels.cache.get(process.env.box_channel).send(`<@491343958660874242> - Необходимо выдать роль \`${loot3[i_loot3].loot3_name}\` пользователю <@${opener}> - <t:${timestamp}:f>`);
                await r_loot_msg.react("🕓")
            } else {
                await roles.add(loot3[i_loot3].loot3_roleID).catch(console.error);
                await r_loot_msg.react("✅")
            }
        }  else {
            if (loot3[i_loot3].loot3_name == `💫 КОСМИЧЕСКАЯ ПЫЛЬ`) {
                interaction.guild.channels.cache.get(process.env.box_channel).send(`<@491343958660874242> - Необходимо выдать роль <@${opener}> - <t:${timestamp}:f>`);
                //- <t:${interaction.createdTimestamp}:f>
                await r_loot_msg.react("🕓")
            } else {
             await r_loot_msg.react("🚫")
            }
        };

        //L4 выдача
        if (!roles.cache.has(loot4[i_loot4].loot4_roleID)) {
            if (loot4[i_loot4].loot4_name == `💫 КОСМИЧЕСКАЯ ПЫЛЬ`) {
            interaction.guild.channels.cache.get(process.env.box_channel).send(`<@491343958660874242> - Необходимо выдать роль \`${loot4[i_loot4].loot4_name}\` пользователю <@${opener}> - <t:${timestamp}:f>`);
            await r_loot_msg.react("🕓")
        } else {
            await roles.add(loot4[i_loot4].loot4_roleID).catch(console.error);
            await r_loot_msg.react("✅")
        }
    }  else {
        if (loot4[i_loot4].loot4_name == `💫 КОСМИЧЕСКАЯ ПЫЛЬ`) {
            interaction.guild.channels.cache.get(process.env.box_channel).send(`<@491343958660874242> - Необходимо выдать роль <@${opener}> - <t:${timestamp}:f>`);
            //- <t:${interaction.createdTimestamp}:f>
            await r_loot_msg.react("🕓")
        } else {
         await r_loot_msg.react("🚫")
        }
    };



//Румбики (если необходимо)
let rumbik = [
    {
        rumb_amount: 100,
        dropChanceRUMB: 49
    },
    {
        rumb_amount: 110,
        dropChanceRUMB: 33
    },
    {
        rumb_amount: 120,
        dropChanceRUMB: 17
    },
    {
        rumb_amount: 130,
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
interaction.guild.channels.cache.get(process.env.rumb_channel).send(
`╔═════════♡════════╗
<@${opener}> +${rumbik[i_rumb].rumb_amount}<:Rumbik:883638847056003072>
\`Получено из Подарка судьбы.\`
╚═════════♡════════╝`
);


            //Опыт рангов (если необходимо)
            let rank_exp = [
                {
                    rank_amount: "150💠",
                    dropChanceRANK: 4499
                },
                {
                    rank_amount: "160💠",
                    dropChanceRANK: 2500
                },
                {
                    rank_amount: "170💠",
                    dropChanceRANK: 1600
                },
                {
                    rank_amount: "180💠",
                    dropChanceRANK: 700
                },
                {
                    rank_amount: "190💠",
                    dropChanceRANK: 500
                },
                {
                    rank_amount: "200💠",
                    dropChanceRANK: 200
                },
                {
                    rank_amount: "1000💠     @here",
                    dropChanceRANK: 1
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
<@${opener}> +${rank_exp[i_rank].rank_amount}
\`Получено из Подарка судьбы.\`
╚═════════♡════════╝`
            );



            //Опыт активности
            let act_exp = [
                {
                    act_amount: 500,
                    dropChanceACT: 19
                },
                {
                    act_amount: 600,
                    dropChanceACT: 16
                },
                {
                    act_amount: 700,
                    dropChanceACT: 14
                },
                {
                    act_amount: 800,
                    dropChanceACT: 13
                },
                {
                    act_amount: 900,
                    dropChanceACT: 11
                },
                {
                    act_amount: 1000,
                    dropChanceACT: 9
                },
                {
                    act_amount: 1100,
                    dropChanceACT: 7
                },
                {
                    act_amount: 1200,
                    dropChanceACT: 5
                },
                {
                    act_amount: 1300,
                    dropChanceACT: 3
                },
                {
                    act_amount: 1400,
                    dropChanceACT: 2
                },
                {
                    act_amount: 1500,
                    dropChanceACT: 1
                }
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
\`Получено из Подарка судьбы.\`
╚═════════♡════════╝`
            );



console.log(`
||vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv||
||Количество предметов:                         ||
||${loot1.length} > Лут 1, шт. предмет.                      ||
||${loot2.length} > Лут 2, шт. предмет.                      ||
||${loot3.length} > Лут 3, шт. предмет.                      ||
||${loot4.length} > Лут 4, шт. предмет.                      ||
||${rank_exp.length} > Количество вариантов опыта рангов         ||
||${act_exp.length} > Количество вариантов опыта активности     ||
||${rumbik.length} > Количество вариантов румбиков             ||
||vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv||
||${interaction.member.displayName} использовал команду "/${cmd_name}" ||
||^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^||`)
            
        } else {
            await interaction.editReply({
                content: `У вас отсутствует \`${role.name}\` коробка!`
            })
        }
    }
};