const { execute } = require("../../events/client/ready");
const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, InteractionType } = require('discord.js');

module.exports = {
    data: {
        name: "reportmsg"
    },
    async execute(interaction, client) {
        
        await interaction.reply({
            content: `Вы успешно пожаловались на сообщение \`${interaction.targetMessage.content}\``,
            ephemeral: true
        })
        interaction.guild.channels.cache.get(process.env.test_channel).send({ 
            content: `**НОВАЯ ЖАЛОБА НА СООБЩЕНИЕ**
Отправитель: ${interaction.member}
Причина: ${interaction.fields.getTextInputValue("reason")}

Автор сообщения: ${interaction.targetMessage.author}
Содержимое: ${interaction.targetMessage.content}
Файлы: ${interaction.targetMessage.attachments}
Канал: ${interaction.targetMessage.channel}
Ссылка: ${interaction.targetMessage.url}`
        })
    }
}