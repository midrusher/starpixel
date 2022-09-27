const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { User } = require(`../../schemas/userdata`); //ДОБАВИТЬ В ДРУГИЕ
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ
const { execute } = require('../../events/client/start_bot/ready');
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`monthly`)  //Название команды
        .setDescription(`Открыть ежемесячную коробку`), //Описание команды
    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.boxes === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        const cmd_name = `/monthly`
        const { roles } = interaction.member //Участник команды

        
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ
        const userData = await User.findOne({ userid: user.id }) 

        if (roles.cache.has("504887113649750016")) { //Проверка роли участника гильдии
            if (userData.cooldowns.monthly > Date.now()) //ДОБАВИТЬ В ДРУГИЕ(ГДЕ КУЛДАУН)
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.bot_color)
                            .setAuthor({
                                name: `Вы не можете использовать эту команду`
                            })
                            .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.monthly - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)
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
                    loot1_name: `❕ 🎁 КОРОЛЕВСКАЯ /king`,
                    dropChanceLOOT1: 10,
                    loot1_roleID: "584673040470769667",
                    loot1_description: `Открой, чтобы получить награды.`
                },
                {
                    loot1_name: `💰 МЕШОЧЕК /bag`,
                    dropChanceLOOT1: 20,
                    loot1_roleID: "819930814388240385",
                    loot1_description: `Открой, чтобы получить опыт активности.`
                },
                {
                    loot1_name: `❕ 🎁 БОЛЬШАЯ /big`,
                    dropChanceLOOT1: 30,
                    loot1_roleID: "521248091853291540",
                    loot1_description: `Открой, чтобы получить награды.`
                },
                {
                    loot1_name: `❕ 🎁 СОКРОВИЩА /treasure`,
                    dropChanceLOOT1: 5,
                    loot1_roleID: "595966177969176579",
                    loot1_description: `Открой, чтобы получить награды.`
                },
                {
                    loot1_name: `❕ 🎁 МАЛЕНЬКАЯ /small`,
                    dropChanceLOOT1: 15,
                    loot1_roleID: "510932601721192458",
                    loot1_description: `Открой, чтобы получить награды.`
                },
                {
                    loot1_name: `🌈 ВЫБОР ЦВЕТА /randomcolor`,
                    dropChanceLOOT1: 20,
                    loot1_roleID: "896100103700496436",
                    loot1_description: `Цвет вашего никнейма временно изменится.`
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
<@${opener}> открывает ежемесячную коробку...
╭──────────╮
\`${loot1[i_loot1].loot1_name}\`
${loot1[i_loot1].loot1_description}
╰──────────╯
◾`)
            if (!roles.cache.has(loot1[i_loot1].loot1_roleID)) {
                await r_loot_msg.react("✅")
                await roles.add(loot1[i_loot1].loot1_roleID).catch(console.error)
            } else if (roles.cache.has(loot1[i_loot1].loot1_roleID)) {
                await r_loot_msg.react("❌")
            }


            //Опыт рангов (если необходимо)
            let rank_exp = [
                {
                    rank_amount: 25,
                    dropChanceRANK: 70
                },
                {
                    rank_amount: 30,
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
\`Получено из ежемесячной коробки.\`
╚═════════♡════════╝`
            );
            userData.rank += rank_exp[i_rank].rank_amount + (rank_exp[i_rank].rank_amount * 0.05 * userData.perks.rank_boost) //ДОБАВИТЬ В ДРУГИЕ

            //Румбики (если необходимо)
            let rumbik = [
                {
                    rumb_amount: 5,
                    dropChanceRUMB: 90
                },
                {
                    rumb_amount: 10,
                    dropChanceRUMB: 10
                }

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
\`Получено из ежемесячной коробки.\`
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

            //Опыт активности
            let act_exp = [
                {
                    act_amount: 50,
                    dropChanceACT: 50
                },
                {
                    act_amount: 70,
                    dropChanceACT: 30
                },
                {
                    act_amount: 90,
                    dropChanceACT: 15
                },
                {
                    act_amount: 100,
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
\`Получено из ежемесячной коробки.\`
╚═════════♡════════╝`
            );
            userData.exp += act_exp[i_act].act_amount //ДОБАВИТЬ В ДРУГИЕ
            
            userData.cooldowns.monthly = Date.now() + (1000 * 60 * 60 * 24 * 30) //ДОБАВИТЬ В ДРУГИЕ(ГДЕ КУЛДАУН) * 60 * 24 * 30
            

                userData.save();
                console.log(chalk.magentaBright(`[${interaction.user.tag} открыл ежемесячную коробку]`) + chalk.gray(`: +${act_exp[i_act].act_amount} опыта активности, +${rank_exp[i_rank].rank_amount} опыта рангов, +${rumbik[i_rumb].rumb_amount} и ${loot1[i_loot1].loot1_name}`))
            await interaction.deleteReply()
        } else if (!roles.cache.has("504887113649750016")) {
            await interaction.reply({
                content: `Вы не являетесь участником гильдии Starpixel. Чтобы вступить в гильдию Starpixel, ознакомьтесь с каналами <#921719265139249203> и <#774546154209148928>, а затем напишите \`/apply\` в канале <#921719174819090462>!`,
                ephemeral: true
            })
        }
    }
};