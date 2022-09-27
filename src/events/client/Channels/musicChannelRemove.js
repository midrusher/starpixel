const chalk = require(`chalk`);
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction, user) {
        const { Guild } = require(`../../../schemas/guilddata`)
        const guild_plugin = await reaction.client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.channels === false) return
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Произошла ошибка при обработке сообщения', error);

                return;
            }
        }

        if (reaction.message.channel.id == `967754140199555163` && reaction.emoji.name == `❤️`) {
            if (reaction.message.reactions.cache.get(`❤️`).count < 5 && reaction.message.pinned === true) {
                reaction.message.unpin(`Меньше 5 ❤️!`);
                console.log(chalk.green(`[Убрано закрепленное сообщение]`) + chalk.gray(`: Сообщение: ${reaction.message.url}`))
            }
            console.log(chalk.green(`[Убрана реакция]`) + chalk.gray(`: Сообщение ${reaction.message.url} имеет теперь ${reaction.message.reactions.cache.get(`❤️`).count}❤️`))
        }
    }
}