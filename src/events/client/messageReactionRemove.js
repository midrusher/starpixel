const chalk = require(`chalk`);
const { ReactionCollector } = require("discord.js");

module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction, user) {
        if (reaction.message.channel.id == `967754140199555163` && reaction.emoji.name == `❤️`) {
            if (reaction.message.reactions.cache.get(`❤️`).count < 2) {
                reaction.message.unpin(`Меньше 5 ❤️!`);
                console.log(chalk.green(`[Убран закрепленное сообщение]`) + chalk.gray(`: Сообщение: ${reaction.message.url}`))
            }
            console.log(chalk.green(`[Убрана реакция]`) + chalk.gray(`: Сообщение ${reaction.message.url} имеет теперь ${reaction.message.reactions.cache.get(`❤️`).count}❤️`))
        }
    }
}