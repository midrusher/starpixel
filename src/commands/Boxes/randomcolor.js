const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { Temp } = require(`../../schemas/temp_items`);
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)
const linksInfo = require(`../../discord structure/links.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`randomcolor`)  //Название команды
        .setDescription(`Получить случайный цвет`)
        .setDMPermission(false), //Описание команды
    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.items === false) return interaction.reply({ content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true })
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ

        const { roles } = interaction.member //Участник команды
        const member = interaction.member
        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("896100103700496436") //ID коробки
            .catch(console.error);
        if (roles.cache.has("896100103700496436") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
            const timestamp = Math.round(interaction.createdTimestamp / 1000)
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
                },
                {
                    loot1_name: `АЛИЗАРИНОВЫЙ`,
                    loot1_roleID: "1024741633947873401",
                }
            ];

            //рандом предметов
            let rloot1 = loot1[Math.floor(Math.random() * loot1.length)];
            const tempData = await Temp.findOne({ userid: user.id, roleid: rloot1.loot1_roleID })

            const r1 = `595893144055316490`; //Название цветов есть в /colors
            const r2 = `595892599693246474`;
            const r3 = `595892677451710468`;
            const r4 = `595892238370996235`;
            const r5 = `589770984391966760`;
            const r6 = `595893568485326862`;
            const r7 = `630395361508458516`;
            const r8 = `595892930204401665`;
            const r9 = `595889341058777088`;
            const r10 = `1024741633947873401`;

            if (member.roles.cache.has(r1) || member.roles.cache.has(r2) || member.roles.cache.has(r3) || member.roles.cache.has(r4) || member.roles.cache.has(r5) || member.roles.cache.has(r6) || member.roles.cache.has(r7) || member.roles.cache.has(r8) || member.roles.cache.has(r9) || member.roles.cache.has(r10)) return interaction.reply({
                content: `Вы не можете использовать данную команду, так как у вас есть цвет! Используйте команду \`/colors reset\`, чтобы убрать ваш цвет!`,
                ephemeral: true
            })
            await roles.remove(role).catch(console.error); //Удалить роль коробки
            //Отправка сообщения о луте              
            const r_loot_msg = await interaction.guild.channels.cache.get(ch_list.box)
                .send(
                    `◾
<@${opener}> использует выбор цвета...
╭─────:rainbow:─────╮
Он получает \`${rloot1.loot1_name}\` цвет на 1 неделю! Поздравляем!
╰─────:rainbow:─────╯
◾`)
            if (!member.roles.cache.has(rloot1.loot1_roleID) && (member.roles.cache.has(`780487593485008946`) || member.roles.cache.has(`849695880688173087`) || member.roles.cache.has(`992122876394225814`) || member.roles.cache.has(`992123014831419472`) || member.roles.cache.has(`992123019793276961`))) {
                await member.roles.add(rloot1.loot1_roleID).catch(console.error);
                await r_loot_msg.react("✅")
                const tempItems = new Temp({
                    userid: user.id,
                    guildid: interaction.guild.id,
                    roleid: rloot1.loot1_roleID,
                    expire: Date.now() + (1000 * 60 * 60 * 24 * 7),
                    color: true
                })
                tempItems.save()
            } else if (member.roles.cache.has(rloot1.loot1_roleID)) {
                await r_loot_msg.react("🚫")
            } else {
                await r_loot_msg.react("🚫")
            };

            console.log(chalk.magentaBright(`[${interaction.user.tag} использовал выбор цвета]`) + chalk.gray(`: Он получил ${rloot1.loot1_name}`))
            const message = await interaction.deferReply({
                fetchReply: true,
            });
            await interaction.deleteReply()
        } else {
            await interaction.reply({
                content: `У вас отсутствует роль "\`${role.name}\`!"`,
                ephemeral: true
            })
        }
    }
};