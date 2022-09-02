const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
const { Temp } = require(`../../schemas/temp_items`);
const chalk = require(`chalk`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`randomcolor`)  //Название команды
        .setDescription(`Выбрать случайный цвет.`), //Описание команды
    async execute(interaction, client) {
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ

        const { roles } = interaction.member //Участник команды
        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("896100103700496436") //ID коробки
            .catch(console.error);
        if (roles.cache.has("896100103700496436") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
            const timestamp = Math.round(interaction.createdTimestamp / 1000)
            await roles.remove(role).catch(console.error); //Удалить роль коробки
            const opener = interaction.member.id;

            //Лут из коробок
            //Случайный предмет
            //name - Название предмета
            //dropChanceLOOT - Шанс выпадения предмета
            //roleID - ID роли, которая связана с данным лутом.

            //Список предметов
            let loot1 = [
                {
                    loot1_name: `ЧЁРНЫЙ`,
                    loot1_roleID: "595893144055316490",
                },
                {
                    loot1_name: `ЛАЗУРНЫЙ`,
                    loot1_roleID: "595892599693246474",
                },
                {
                    loot1_name: `ПУРПУРНЫЙ`,
                    loot1_roleID: "595892677451710468",
                },
                {
                    loot1_name: `СИРЕНЕВЫЙ`,
                    loot1_roleID: "595892238370996235",
                },
                {
                    loot1_name: `ФЛАМИНГОВЫЙ`,
                    loot1_roleID: "589770984391966760",
                },
                {
                    loot1_name: `ИЗУМРУДНЫЙ`,
                    loot1_roleID: "595893568485326862",
                },
                {
                    loot1_name: `ЯБЛОЧНЫЙ`,
                    loot1_roleID: "630395361508458516",
                },
                {
                    loot1_name: `САЛАТОВЫЙ`,
                    loot1_roleID: "595892930204401665",
                },
                {
                    loot1_name: `ПЕСОЧНЫЙ`,
                    loot1_roleID: "595889341058777088",
                }
            ];
            
            //рандом предметов
            let rloot1 = loot1[Math.floor(Math.random() * loot1.length)];
            const tempData = await Temp.findOne({ userid: user.id, roleid: rloot1.loot1_roleID })

            const r1 = `595893144055316490`;
            const r2 = `595892599693246474`;
            const r3 = `595892677451710468`;
            const r4 = `595892238370996235`;
            const r5 = `589770984391966760`;
            const r6 = `595893568485326862`;
            const r7 = `630395361508458516`;
            const r8 = `595892930204401665`;
            const r9 = `595889341058777088`;

            if (roles.cache.has(r1) || roles.cache.has(r2) || roles.cache.has(r3) || roles.cache.has(r4) || roles.cache.has(r5) || roles.cache.has(r6) || roles.cache.has(r7) || roles.cache.has(r8) || roles.cache.has(r9)) return interaction.reply({
                content: `Вы не можете использовать данную команду, так как у вас есть цвет! Обратитесь в вопрос модерам, чтобы вам сняли цвет, если вы хотите!`,
                ephemeral: true
            })
            //Отправка сообщения о луте              
            const r_loot_msg = await interaction.guild.channels.cache.get(process.env.box_channel)
                .send(
                    `◾
<@${opener}> использует выбор цвета...
╭─────:rainbow:─────╮
Он получает \`${rloot1.loot1_name}\` цвет на 1 неделю! Поздравляем!
╰─────:rainbow:─────╯
◾`)
            if (!roles.cache.has(rloot1.loot1_roleID) && (roles.cache.has(`780487593485008946`) || roles.cache.has(`849695880688173087`) || roles.cache.has(`992122876394225814`) || roles.cache.has(`992123014831419472`) || roles.cache.has(`992123019793276961`))) {
                await roles.add(rloot1.loot1_roleID).catch(console.error);
                await r_loot_msg.react("✅")
                const tempItems = new Temp({
                    userid: user.id,
                    guildid: interaction.guild.id,
                    roleid: rloot1.loot1_roleID,
                    expire: Date.now() + (1000 * 60 * 60 * 24 * 7)
                })
                tempItems.save()
            } else {
                if (roles.cache.has(rloot1.loot1_roleID)) {
                    await r_loot_msg.react("🚫")
                };
            };

            console.log(chalk.magentaBright(`[${interaction.user.tag} использовал выбор цвета]`) + chalk.gray(`: Он получил ${rloot1.loot1_name}`))
            const message = await interaction.deferReply({
                fetchReply: true,
            });
            await interaction.deleteReply()
        } else {
            await interaction.reply({
                content: `У вас отсутствует \`${role.name}\` коробка!`
            })
        }
    }
};