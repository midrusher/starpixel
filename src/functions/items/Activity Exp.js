const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)
const ch_list = require(`../../discord structure/channels.json`)
const { calcActLevel, getLevel } = require(`../../functions`)

module.exports = (client) => {
    client.ActExp = async () => {
        setInterval(async () => {
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: guild.id })
            for (const result of results) {
                const { userid } = result;
                const member = await guild.members.cache.get(userid)
                let total_exp = calcActLevel(0, result.level, result.exp) //Текущий опыт
                let req_exp = calcActLevel(0, result.level + 1, 0) // Опыта для следующего уровня
                let cur_exp = calcActLevel(0, result.level, 0) // Опыта для получения текущего уровня
                let level_exp = getLevel(total_exp)
                let level = level_exp[0]
                let exp = level_exp[1]

                if (total_exp >= req_exp) {
                    while (total_exp >= req_exp) {
                        result.level += 1
                        result.exp = (total_exp - req_exp)
                    }

                    await guild.channels.cache.get(ch_list.main).send(
                        `:black_medium_small_square:
${member} повысил уровень активности до ${result.level} уровня! :tada:
:black_medium_small_square:`);
                } else if (total_exp < cur_exp) {
                    while (total_exp < cur_exp) {
                        result.level -= 1
                        result.exp = 0
                    }
                }
                    result.save()
            }
        }, 30000)
    }
}
