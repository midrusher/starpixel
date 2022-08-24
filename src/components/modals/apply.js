const { execute } = require("../../events/client/ready");
const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, InteractionType } = require('discord.js');

module.exports = {
    data: {
        name: "apply"
    },
    async execute(interaction, client) {
        
        await interaction.reply(`${interaction.member}, вы подали заявку на вступление в гильдию:
1. Имя - \`${interaction.fields.getTextInputValue("first")}\`
2. Никнейм - \`${interaction.fields.getTextInputValue("second")}\`
3. Возраст - \`${interaction.fields.getTextInputValue("third")}\`
4. Готовность пойти в голосовой канал - \`${interaction.fields.getTextInputValue("fourth")}\`
5. Причина вступление и согласие с правилами - \`${interaction.fields.getTextInputValue("fifth")}\`
:arrow_down:    :arrow_down:    :arrow_down: 
:exclamation: Пожалуйста, ожидайте в течение 7 дней ответа от администратора. Помните, что вам нужно открыть ваши личные сообщения, чтобы с вами могли связаться.

Не забудьте ещё раз ознакомиться с правилами и поставить галочку в канале <#774546154209148928>!`)
        
    }
    

}