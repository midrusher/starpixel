const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)

module.exports = (client) => {
    client.act_remove = async () => {
        setInterval(async () => {
            const results = await User.find({ exp: { $lt: 0 } })
            for (const result of results) {
                const { id } = result;
                const guild = await client.guilds.fetch(`320193302844669959`)
                const member = await guild.members.cache.get(id)

                const levelbefore = result.level;
                 if (result.exp < 0) {
                    while (result.exp < 0) {
                        result.level -= 1;
                        result.exp += 5 * (Math.pow(result.level, 2)) + (50 * result.level) + 100
                    }
                    if (levelbefore > result.level) {
                        guild.channels.cache.get(process.env.main_channel).send(
                            `:black_medium_small_square:
К сожалению, ${member} понизил свой уровень активности до ${result.level} уровня! 😔
:black_medium_small_square:`);
                    }
                    result.save()
                }
            }
        }, 10000)
    }
}