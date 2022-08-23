const { ButtonBuilder } = require("discord.js");
const { execute } = require("../../events/client/ready");

module.exports = {
    data: {
        name: `boxes`
    },
    async execute(interaction, client) {
        
        interaction.reply({
        content: `:exclamation: Необходимо установить значок участнику гильдии!
        
${interaction.member}, пожалуйста, ожидайте. Скоро администратор установит вам значок!`
       })
        
    }
}
