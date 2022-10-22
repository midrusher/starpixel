const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`);
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`bag`)  //Название команды
        .setDescription(`Открыть мешочек`)
        .setDMPermission(false), //Описание команды
    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.items === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        const user = interaction.member.user //ДОБАВИТЬ В ДРУГИЕ
        const userData = await User.findOne({ userid: user.id })




        const { roles } = interaction.member //Участник команды
        const role = await interaction.guild.roles  //Постоянная для role
            .fetch("819930814388240385") //ID коробки
            .catch(console.error);
        if (roles.cache.has("819930814388240385") || roles.cache.has("567689925143822346")) { //Проверка роли коробки || правления
            const cmd_name = `bag` //Название команды
            const timestamp = Math.round(interaction.createdTimestamp / 1000)
            await roles.remove(role).catch(console.error); //Удалить роль коробки
            const opener = interaction.member.id;
            const message = await interaction.deferReply({
                fetchReply: true,
            });
            await interaction.deleteReply()

            //Опыт активности
            let act_exp = [
                {
                    act_amount: 40,
                    dropChanceACT: 40
                },
                {
                    act_amount: 70,
                    dropChanceACT: 20
                },
                {
                    act_amount: 100,
                    dropChanceACT: 3
                },
                {
                    act_amount: 90,
                    dropChanceACT: 7
                },
                {
                    act_amount: 50,
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
\`Получено из мешочка.\`
╚═════════♡════════╝`
            );
            userData.exp += act_exp[i_act].act_amount //ДОБАВИТЬ В ДРУГИЕ
            userData.save();


            console.log(chalk.magentaBright(`[${interaction.user.tag} открыл мешочек]`) + chalk.gray(`: +${act_exp[i_act].act_amount} опыта активности`))

        } else {
            await interaction.reply({
                content: `У вас отсутствует \`${role.name}\`!`,
                ephemeral: true
            })
        }
    }
};