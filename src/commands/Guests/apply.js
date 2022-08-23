const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`apply`)
        .setDescription(`Подать заявку в гильдию.`),
    async execute(interaction, client) {
            const cmd_name = `apply`
            const apply = new ModalBuilder()
            .setCustomId(`apply`)
            .setTitle(`Подать заявку`)

            const question1 = new TextInputBuilder()
            .setCustomId(`first`)
            .setLabel(`Как вас зовут?`)
            .setPlaceholder(`Введите ваше реальное имя.`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)

            const question2 = new TextInputBuilder()
            .setCustomId(`second`)
            .setLabel(`Какой у вас никнейм в Minecraft?`)
            .setPlaceholder(`Введите ваш игровой никнейм.`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(16)

            const question3 = new TextInputBuilder()
            .setCustomId(`third`)
            .setLabel(`Сколько вам лет?`)
            .setPlaceholder(`Вам должно быть больше 14 лет для вступления.`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)

            const question4 = new TextInputBuilder()
            .setCustomId(`fourth`)
            .setLabel(`Можете ли вы пойти в голосовой канал?`)
            .setPlaceholder(`Наличие микрофона тоже обязательно.`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)

            const question5 = new TextInputBuilder()
            .setCustomId(`fifth`)
            .setLabel(`Почему вы хотите вступить именно к нам?`)
            .setPlaceholder(`А также как вы узнали о нашей гильдии?
Ознакомились ли вы с правилами и готовы ли их соблюдать?`)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)



            apply.addComponents(new ActionRowBuilder().addComponents(question1)).addComponents(new ActionRowBuilder().addComponents(question2)).addComponents(new ActionRowBuilder().addComponents(question3)).addComponents(new ActionRowBuilder().addComponents(question4)).addComponents(new ActionRowBuilder().addComponents(question5))

            //modal2.addComponents(new ActionRowBuilder().addComponents(question6, question7))

            await interaction.showModal(apply)

        console.log(`${interaction.member.displayName} использовал команду "/${cmd_name}"`)
    }
};