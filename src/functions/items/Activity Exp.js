const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)
const ch_list = require(`../../discord structure/channels.json`)
const { calcActLevel, getLevel } = require(`../../functions`)

module.exports = (client) => {
    client.ActExp = async () => {
        setInterval(async () => {
            const { Guild } = require(`../../schemas/guilddata`)
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.act_exp === false) return
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: guild.id })
            for (const result of results) {
                const member = await guild.members.cache.get(result.userid)
                let lvl_before = result.level
                let total_exp = calcActLevel(0, result.level, result.exp) //Текущий опыт
                let level_exp = getLevel(total_exp)
                let level = level_exp[0]
                let exp = level_exp[1]
                result.exp = exp
                result.level = level

                if (lvl_before < level) {
                    await guild.channels.cache.get(ch_list.main).send(
                        `:black_medium_small_square:
${member} повысил уровень активности до ${result.level} уровня! :tada:
:black_medium_small_square:`);
                } else if (lvl_before > level) {
                    await guild.channels.cache.get(ch_list.main).send(
                        `:black_medium_small_square:
К сожалению, ${member} понизил свой уровень активности до ${result.level} уровня! 😔
:black_medium_small_square:`);
                }
                result.save()
            }
        }, 30000)
    }
}
