const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)
const ch_list = require(`../../discord structure/channels.json`)

module.exports = (client) => {
    client.act_add = async () => {
        setInterval(async () => {
            const results = await User.find({ exp: { $gt: 0 } })
            for (const result of results) {
                const { userid } = result;
                const guild = await client.guilds.fetch(`320193302844669959`)
                const member = await guild.members.cache.get(userid)

                const levelbefore = result.level;
                if (result.exp >= (5 * (Math.pow(result.level, 2)) + (50 * result.level) + 100)) {
                    while (result.exp >= (5 * (Math.pow(result.level, 2)) + (50 * result.level) + 100)) {
                        result.exp -= 5 * (Math.pow(result.level, 2)) + (50 * result.level) + 100;
                        result.level += 1;
                    }
                    if (levelbefore < result.level) {
                        guild.channels.cache.get(ch_list.main).send(
                            `:black_medium_small_square:
${member} повысил уровень активности до ${result.level} уровня! :tada:
:black_medium_small_square:`);
                    }
                    result.save()
                }
            }
        }, 30000)
    }
}