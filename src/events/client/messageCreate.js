const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const { MsgData } = require(`../../schemas/msgdata`)
const { ChannelType } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.channel.type !== ChannelType.DM) {
            const guildData = await Guild.findOne({ id: message.guild.id }) || new Guild({ id: message.guild.id, name: message.guild.name })
            if (message.author.bot) return
            console.log(chalk.yellow(`[${message.author.tag} в ${message.channel.name}]`) + chalk.white(`: ${message.content}`))
            const user = message.author
            const userData = await User.findOne({ userid: user.id }) || new User({ userid: user.id, name: user.username })
            if (message.channel.id == `982551755340537866`
                || message.author.bot
                || message.member.roles.cache.has(`920346035811917825`)) {
                userData.exp += 0
                userData.totalexp += 0
            } else {

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

            const msgData = await MsgData.findOneAndUpdate({ guildid: message.guild.id }, {
                $push: {
                    messages: {
                        content: message.content,
                        author: message.author.username,
                        expire: Date.now() + (1000 * 30)
                    }
                }
            }) || new MsgData({
                guildid: message.guild.id,
                messages: {
                    content: message.content,
                    author: message.author.username,
                    expire: Date.now() + (1000 * 30)
                }
            })

            msgData.save()
        }




        if (message.channel.id == `967754140199555163` && message.content.includes(`http`)) {
            message.react(`❤️`)
        }
    }
}