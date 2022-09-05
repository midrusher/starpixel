const { execute } = require("../../events/client/ready");
const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, InteractionType } = require('discord.js');

module.exports = {
    data: {
        name: "reportuser"
    },
    async execute(interaction, client) {
        
        await interaction.reply({
            content: `Вы успешно пожаловались на пользователя <@${interaction.targetUser}>`,
            ephemeral: true
        })
        interaction.guild.channels.cache.get(process.env.test_channel).send({ 
            content: `**НОВАЯ ЖАЛОБА НА ПОЛЬЗОВАТЕЛЯ**
Отправитель: ${interaction.member}
Причина: ${interaction.fields.getTextInputValue("reason")}

Пользователь: ${interaction.targetUser}`
        })
    }
    

}