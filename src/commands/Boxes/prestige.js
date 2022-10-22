const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`);
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`prestige`)  //Название команды
        .setDescription(`Использовать талисман удачи`)
        .setDMPermission(false), //Описание команды
    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.items === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ
        const userData = await User.findOne({ userid: user.id })
        if (userData.cooldowns.prestige > Date.now()) //ДОБАВИТЬ В ДРУГИЕ(ГДЕ КУЛДАУН)
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(process.env.bot_color)
                        .setAuthor({
                            name: `Вы не можете использовать эту команду`
                        })
                        .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.prestige - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)
                ],
                ephemeral: true
            });



        const { roles } = interaction.member //Участник команды
        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("572124606870192143") //ID коробки
            .catch(console.error);
        if (roles.cache.has("572124606870192143")) { //Проверка роли коробки || правления
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
                    loot1_name: `❕ 🎁 МАЛЕНЬКАЯ /small`,
                    dropChanceLOOT1: 25,
                    loot1_roleID: "510932601721192458",
                    loot1_description: "Открой, чтобы получить награды."
                },
                {
                    loot1_name: `❕ 💰 МЕШОЧЕК /bag`,
                    dropChanceLOOT1: 25,
                    loot1_roleID: "819930814388240385",
                    loot1_description: "Открой, чтобы получить награды."
                },
                {
                    loot1_name: `Награды нет.`,
                    dropChanceLOOT1: 50,
                    loot1_description: "Вы не получаете награду."
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
<@${opener}> использует талисман счастья. :nazar_amulet:
╭═────═────═╮
\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}
╰═────═────═╯
◾`)
            if (loot1[i_loot1].loot1_name !== `Награды нет.` && !roles.cache.has(loot1[i_loot1].loot1_roleID)) {
                await roles.add(loot1[i_loot1].loot1_roleID).catch()
                await r_loot_msg.react(`✅`)
            } else await r_loot_msg.react(`🚫`)

            userData.cooldowns.prestige = Date.now() + (1000 * 60 * 60 * 24 * 7)
            userData.save()
        } else {
            await interaction.reply({
                content: `У вас отсутствует \`${role.name}\`!`,
                ephemeral: true
            })
        }
    }
};