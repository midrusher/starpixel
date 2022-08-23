const { ButtonBuilder } = require("discord.js");
const { execute } = require("../../events/client/ready");

module.exports = {
    data: {
        name: `done`
    },
    async execute(interaction, client) {
        
        interaction.reply({
        content: `Если будут вопросы, обращайтесь в канал <#849516805529927700>!`,
        ephemeral: true
       })
        
    }
}
