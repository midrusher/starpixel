const chalk = require(`chalk`);
const { ChannelType } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.channel.type === ChannelType.DM ) {
            console.log(chalk.yellow(`[${message.author.tag} в личных сообщениях]`) + chalk.white(`: ${message.content}`))
        }
        
    }
}