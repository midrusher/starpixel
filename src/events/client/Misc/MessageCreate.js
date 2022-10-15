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
            if (pluginData.plugins.items === false) return
            const guildData = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id, name: message.guild.name })
            if (message.author.bot) return
            console.log(chalk.yellow(`[${message.author.tag} в ${message.channel.name}]`) + chalk.white(`: ${message.content}`))
            const user = message.author
            const userData = await User.findOne({ userid: user.id })
            if (message.channel.id == `982551755340537866`
                || message.author.bot
                || message.member.roles.cache.has(`920346035811917825`)) return

            if (userData.cooldowns.msgCreateExp > Date.now()) {
                userData.exp += 0
                userData.totalexp += 0
            } else {
                let add_exp = Math.floor(Math.random() * 15 + 11) * guildData.act_exp_boost

                userData.exp += add_exp
                userData.totalexp += add_exp

                console.log(chalk.magentaBright(`[${message.author.tag} в ${message.channel.name}]`) + chalk.gray(`: +${add_exp} опыта активности`))
                userData.cooldowns.msgCreateExp = Date.now() + (1000 * 60)

            }
            userData.save();


        }




        if (message.channel.id == `967754140199555163` && message.content.includes(`http`)) {
            message.react(`❤️`)
        }
    }
}