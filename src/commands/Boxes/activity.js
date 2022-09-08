const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
const { User } = require(`../../schemas/userdata`);
const chalk = require(`chalk`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`activity`)  //Название команды
        .setDescription(`Открыть коробку активности.`), //Описание команды
    async execute(interaction, client) {
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ
        const userData = await User.findOne({ userid: user.id }) || new User({ userid: user.id, name: user.username }) //ДОБАВИТЬ В ДРУГИЕ
        const message = await interaction.deferReply({
            fetchReply: true,
        });


        const { roles } = interaction.member //Участник команды
        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("983435186920366100") //ID коробки
            .catch(console.error);
        if (roles.cache.has("983435186920366100") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
            const cmd_name = `small` //Название команды
            const timestamp = Math.round(interaction.createdTimestamp / 1000)
            await roles.remove(role).catch(console.error); //Удалить роль коробки
            const opener = interaction.member;
            await interaction.deleteReply()

            //Лут из коробок
            //Случайный предмет
            //name - Название предмета
            //dropChanceLOOT - Шанс выпадения предмета
            //roleID - ID роли, которая связана с данным лутом.

            //Список предметов
            let loot1 = [
                {
                    id: 1,
                    loot1_name: `Перк: Возможность продавать предметы из профиля 💰`,
                    dropChanceLOOT1: 3,

                },
                {
                    id: 2,
                    loot1_name: `Перк: Изменение предметов ✨`,
                    dropChanceLOOT1: 3,

                },
                {
                    id: 3,
                    loot1_name: `Перк: Повышение опыта рангов 🔺`,
                    dropChanceLOOT1: 30,
                },
                {
                    id: 4,
                    loot1_name: `Перк: Скидка в королевском магазине 🔻`,
                    dropChanceLOOT1: 10,

                },
                {
                    id: 5,
                    loot1_name: `Перк: Скидка в магазине активности 🔻`,
                    dropChanceLOOT1: 20,

                },
                {
                    id: 6,
                    loot1_name: `Перк: Скидка в обычном магазине 🔻`,
                    dropChanceLOOT1: 20,

                },
                {
                    id: 7,
                    loot1_name: `Перк: Увеличение времени действия временных предметов 🕒`,
                    dropChanceLOOT1: 8,

                },
                {
                    id: 8,
                    loot1_name: `Перк: Уменьшение опыта гильдии для получения билета 🏷️`,
                    dropChanceLOOT1: 6,

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
            const r_loot_msg = await interaction.guild.channels.cache.get(process.env.box_channel)
                .send(
                    `◾
${opener} открывает коробку активности.
╭═────═⌘═────═╮
\`${loot1[i_loot1].loot1_name}\`
╰═────═⌘═────═╯
◾`)
            if (loot1[i_loot1].id == 1) {
                if (userData.perks.sell_items < 1) {
                    userData.perks.sell_items += 1
                    await r_loot_msg.react(`✅`)
                } else await r_loot_msg.react(`🚫`)

            } else if (loot1[i_loot1].id == 2) {
                if (userData.perks.change_items < 1) {
                    userData.perks.change_items += 1
                    await r_loot_msg.react(`✅`)
                } else await r_loot_msg.react(`🚫`)

            } else if (loot1[i_loot1].id == 3) {
                if (userData.perks.rank_boost < 6) {
                    userData.perks.rank_boost += 1
                    await r_loot_msg.react(`✅`)
                } else await r_loot_msg.react(`🚫`)

            } else if (loot1[i_loot1].id == 4) {
                if (userData.perks.king_discount < 4) {
                    userData.perks.king_discount += 1
                    await r_loot_msg.react(`✅`)
                } else await r_loot_msg.react(`🚫`)

            } else if (loot1[i_loot1].id == 5) {
                if (userData.perks.act_discount < 3) {
                    userData.perks.act_discount += 1
                    await r_loot_msg.react(`✅`)
                } else await r_loot_msg.react(`🚫`)

            } else if (loot1[i_loot1].id == 6) {
                if (userData.perks.shop_discount < 4) {
                    userData.perks.shop_discount += 1
                    await r_loot_msg.react(`✅`)
                } else await r_loot_msg.react(`🚫`)

            } else if (loot1[i_loot1].id == 7) {
                if (userData.perks.temp_items < 1) {
                    userData.perks.temp_items += 1
                    await r_loot_msg.react(`✅`)
                } else await r_loot_msg.react(`🚫`)

            } else if (loot1[i_loot1].id == 8) {
                if (userData.perks.ticket_discount < 5) {
                    userData.perks.ticket_discount += 1
                    await r_loot_msg.react(`✅`)
                } else await r_loot_msg.react(`🚫`)

            } else {
                await r_loot_msg.react(`❔`)
                await r_loot_msg.reply(`Произошла неизвестная ошибка!`)
            }

            userData.save();
            console.log(chalk.magentaBright(`[${interaction.user.tag} открыл коробку активности]`) + chalk.gray(`: +${loot1[i_loot1].loot1_name}`))

        } else {
            await interaction.editReply({
                content: `У вас отсутствует \`${role.name}\` коробка!`
            })
        }
    }
};