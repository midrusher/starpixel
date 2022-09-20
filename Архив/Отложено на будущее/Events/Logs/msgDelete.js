const { User } = require(`../../../../src/schemas/userdata`)
const { Guild } = require(`../../../../src/schemas/guilddata`)
const { ChannelType } = require(`discord.js`)
const ch_list = require(`../../../../src/discord structure/channels.json`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        if (message.content) {

            if (message.author.bot) return
            await message.guild.channels.cache.get(ch_list.test).send({
                content: `Удалено сообщение: \`${message.content}\``
            })
        } else if (!message.content) {
            await message.guild.channels.cache.get(ch_list.test).send({
                content: `Удалено сообщение от пользователя ${message.author}`
            })
        }
    }
}