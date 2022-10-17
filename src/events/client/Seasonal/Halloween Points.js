const { User } = require(`../../../schemas/userdata`)
const { Guild } = require(`../../../schemas/guilddata`)
const { ChannelType } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.channel.type !== ChannelType.DM) {
            const guild_plugin = await message.client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.seasonal === false) return
            const guildData = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id, name: message.guild.name })
            if (guildData.seasonal.halloween.enabled == false) return
            if (message.author.bot) return
            const user = message.author
            const userData = await User.findOne({ userid: user.id })
            if (message.channel.id == `982551755340537866`
                || message.author.bot
                || message.member.roles.cache.has(`920346035811917825`)) return

            if (userData.cooldowns.hw_msgCreate > Date.now()) {
                userData.seasonal.halloween.points += 0
            } else {
                const points = [0,1,2]
                const r_p = points[Math.floor(Math.random() * points.length)]

                userData.seasonal.halloween.points += r_p
                userData.cooldowns.hw_msgCreate = Date.now() + (1000 * 60)
            }

            const hwDate = new Date()
            const curDate = hwDate.getDate()
            const curMonth = hwDate.getMonth() + 1

            if (curDate == 31 && curMonth == 10) {
                userData.seasonal.halloween.hw_msg = true
            }
            userData.save();


        }

    }
}