const { User } = require(`../../../schemas/userdata`)
const { Guild } = require(`../../../schemas/guilddata`)
const { ChannelType } = require(`discord.js`)
const chalk = require(`chalk`);
const ch_list = require(`../../../discord structure/channels.json`)
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ
const wait = require(`node:timers/promises`).setTimeout
const { isURL } = require(`../../../functions`)
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.channel.type == ChannelType.DM) return
        if (message.author.bot) return
        const guild_plugin = await message.client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return
        const guildData = await Guild.findOne({ id: message.guild.id })
        const words = message.content.split(` `)
        const results = []
        words.forEach(word => results.push(isURL(word)))
        
        if (message.channel.id == ch_list.your_music && results.includes(true)) {
            message.react(`❤️`)
        } else if (message.channel.id == ch_list.your_music && !results.includes(true)) {
            
            const warnMsg = await message.reply({
                content: `${message.author}, в этом канале разрешено публиковать только ссылки на музыку!`
            })
            await message.delete()
            await wait(10000);
            await warnMsg.delete()
        }
    }
}