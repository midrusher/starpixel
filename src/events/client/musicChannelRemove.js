const chalk = require(`chalk`);
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction, user) {
        if (reaction.partial) {
            try {
                    await reaction.fetch();
                } catch (error) {
                    console.error('Something went wrong when fetching the message:', error);
                    // Return as `reaction.message.author` may be undefined/null
                    return;
                }
            }

        if (reaction.message.channel.id == `967754140199555163` && reaction.emoji.name == `❤️`) {
            if (reaction.message.reactions.cache.get(`❤️`).count < 5) {
                reaction.message.unpin(`Меньше 5 ❤️!`);
                console.log(chalk.green(`[Убрано закрепленное сообщение]`) + chalk.gray(`: Сообщение: ${reaction.message.url}`))
            }
            console.log(chalk.green(`[Убрана реакция]`) + chalk.gray(`: Сообщение ${reaction.message.url} имеет теперь ${reaction.message.reactions.cache.get(`❤️`).count}❤️`))
        }
    }
}