const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { User } = require(`../../schemas/userdata`); //ДОБАВИТЬ В ДРУГИЕ
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ
const { execute } = require('../../events/client/start_bot/ready');
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`daily`)  //Название команды
        .setDescription(`Открыть ежедневную коробку`), //Описание команды
    async execute(interaction, client) {

        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.items === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        const { roles } = interaction.member //Участник команды

        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ
        const userData = await User.findOne({ userid: user.id })


        if (roles.cache.has("504887113649750016")) { //Проверка роли участника гильдии
            if (userData.cooldowns.daily > Date.now()) //ДОБАВИТЬ В ДРУГИЕ(ГДЕ КУЛДАУН)
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.bot_color)
                            .setAuthor({
                                name: `Вы не можете использовать эту команду`
                            })
                            .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.daily - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)
                    ],
                    ephemeral: true
                });
            const message = await interaction.deferReply({
                fetchReply: true,
            });
            const opener = interaction.member.id


            //Лут из коробок
            //Случайный предмет
            //name - Название предмета
            //dropChanceLOOT - Шанс выпадения предмета
            //roleID - ID роли, которая связана с данным лутом.

            //Список предметов
            let loot1 = [
                {
                    loot1_name: `❕ 🎁 МАЛЕНЬКАЯ /small`,
                    dropChanceLOOT1: 30,
                    loot1_roleID: "510932601721192458",
                    loot1_description: `Откройте, чтобы получить награды.`
                },
                {
                    loot1_name: `💰 МЕШОЧЕК /bag`,
                    dropChanceLOOT1: 40,
                    loot1_roleID: "819930814388240385",
                    loot1_description: `Откройте, чтобы получить опыт активности.`
                },
                {
                    loot1_name: `Награды нет.`,
                    dropChanceLOOT1: 30,
                    loot1_description: `Коробка пуста.`
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
<@${opener}> открывает ежедневную коробку...
╭──────────╮
\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}
╰──────────╯
◾`)
            if (!roles.cache.has(loot1[i_loot1].loot1_roleID) && loot1[i_loot1].loot1_name !== `Награды нет.`) {
                await r_loot_msg.react("✅")
                await roles.add(loot1[i_loot1].loot1_roleID).catch(console.error)
            } else if (loot1[i_loot1].loot1_name == `Награды нет.`) {
                await r_loot_msg.react("❌")
            } else if (roles.cache.has(loot1[i_loot1].loot1_roleID) && loot1[i_loot1].loot1_name !== `Награды нет.`) {
                await r_loot_msg.react("❌")
            }


            //Опыт рангов (если необходимо)
            let rank_exp = [
                {
                    rank_amount: 5,
                    dropChanceRANK: 50
                },
                {
                    rank_amount: 10,
                    dropChanceRANK: 30
                },
                {
                    rank_amount: 15,
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
            interaction.guild.channels.cache.get(ch_list.rank).send(
                `╔═════════♡════════╗
<@${opener}> +${rank_exp[i_rank].rank_amount}💠
\`Получено из ежедневной коробки.\`
╚═════════♡════════╝`
            );
            userData.rank += rank_exp[i_rank].rank_amount + (rank_exp[i_rank].rank_amount * 0.05 * userData.perks.rank_boost) //ДОБАВИТЬ В ДРУГИЕ



            //Опыт активности
            let act_exp = [
                {
                    act_amount: 20,
                    dropChanceACT: 50
                },
                {
                    act_amount: 30,
                    dropChanceACT: 30
                },
                {
                    act_amount: 40,
                    dropChanceACT: 15
                },
                {
                    act_amount: 50,
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
            interaction.guild.channels.cache.get(ch_list.act).send(
                `╔═════════♡════════╗
<@${opener}> +${act_exp[i_act].act_amount}🌀
\`Получено из ежедневной коробки.\`
╚═════════♡════════╝`
            );
            if (roles.cache.has(`572124614050840576`)) {
                userData.exp += (act_exp[i_act].act_amount * 2) //ДОБАВИТЬ В ДРУГИЕ
            } else {
                userData.exp += act_exp[i_act].act_amount //ДОБАВИТЬ В ДРУГИЕ
            }

            userData.cooldowns.daily = Date.now() + (1000 * 60 * 60 * 16) //ДОБАВИТЬ В ДРУГИЕ(ГДЕ КУЛДАУН)  * 60 * 16

            userData.save();
            console.log(chalk.magentaBright(`[${interaction.user.tag} открыл ежедневную коробку]`) + chalk.gray(`: +${act_exp[i_act].act_amount} опыта активности, +${rank_exp[i_rank].rank_amount} опыта рангов и ${loot1[i_loot1].loot1_name}`))
            await interaction.deleteReply()
        } else if (!roles.cache.has("504887113649750016")) {
            await interaction.reply({
                content: `Вы не являетесь участником гильдии Starpixel. Чтобы вступить в гильдию Starpixel, ознакомьтесь с каналами <#921719265139249203> и <#774546154209148928>, а затем напишите \`/apply\` в канале <#921719174819090462>!`,
                ephemeral: true
            })
        }
    }
};