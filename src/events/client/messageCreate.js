const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`) //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return
        console.log(chalk.yellow(`[${message.author.tag} в ${message.channel.name}]`) + chalk.white(`: ${message.content}`))
        const user = message.author
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id, name: user.username })
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
                let add_exp = Math.floor(Math.random() * 14 + 11) * 1

                userData.exp += add_exp
                userData.totalexp += add_exp
    
                console.log(chalk.magentaBright(`[${message.author.tag} в ${message.channel.name}]`) + chalk.gray(`: +${add_exp} опыта активности`))
                userData.cooldowns.msgCreateExp = Date.now() + (1000 * 60)
    
                if (userData.exp >= (5 * (Math.pow(userData.level, 2)) + (50 * userData.level) + 100)) {
                    userData.exp -= 5 * (Math.pow(userData.level, 2)) + (50 * userData.level) + 100;
                    userData.level += 1;
                    message.channel.send(
                        `:black_medium_small_square:
    <@${user.id}> повысил уровень активности до ${userData.level} уровня! :tada:
    :black_medium_small_square:`);
                }
            }
            userData.save();
        }
            


        if (message.channel.id == `967754140199555163` && message.content.includes(`http`)) {
            message.react(`❤️`)
        }
    }
}