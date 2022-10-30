const chalk = require(`chalk`);
const { ReactionCollector } = require("discord.js");
const { Guild } = require(`../../../schemas/guilddata`)
const { isURL } = require(`../../../functions`)
const wait = require(`node:timers/promises`).setTimeout
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        const guild = message.guild
        if (message.author.id == client.user.id) return
        if (message.channel.id == `1034497096629362730` && !message.member.roles.cache.has(`320880176416161802`)) {
            const member = message.member
            const msg = await message.channel.send({
                content: `${member}, не можете отправлять сообщения в данном канале!`
            })
            await message.delete()
            await wait(10000)
            await msg.delete()
        }
    }
}