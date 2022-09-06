const { Temp } = require(`../../schemas/temp_items`)
const chalk = require(`chalk`)
const { Guild } = require(`../../schemas/guilddata`)
const { User } = require(`../../schemas/userdata`)

module.exports = (client) => {
    client.temp_roles = async () => {
        setInterval(async () => {
            const results = await Temp.find({ expire: { $lt: new Date() } })

            for (const result of results) {
                const { guildid, userid, roleid, boost, shop_disc, pers_boost } = result
                const guild = await client.guilds.fetch(guildid)
                const guildData = await Guild.findOne({ id: guild.id })
                const memberData = await User.findOne({ userid: userid })
                const member = await guild.members.cache.get(userid)
                if (boost == true) {

                    guildData.act_exp_boost = 1;
                    guildData.save()
                    result.delete()

                } else if (shop_disc == true) {

                    memberData.shop_costs = 1
                    memberData.save()
                    result.delete()

                } else if (pers_boost == true) {

                    memberData.pers_act_boost = 1
                    memberData.save()
                    result.delete()

                } else if (member.roles.cache.has(`780487592540897349`)) {
                    await result.delete()
                } else if (!member.roles.cache.has(`780487592540897349`)) {
                    if (!member) {
                        console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: Пользователь не найден, файл с временной ролью удалён.`))
                        result.delete()
                    } else if (member.roles.cache.has(roleid)) {
                        member.roles.remove(roleid)
                        console.log(chalk.magenta(`[УДАЛЕНЫ ВРЕМЕННЫЕ РОЛИ]`) + chalk.gray(`: Временные роли у пользователей удалены!`))
                        result.delete()
                    } else {
                        console.log(chalk.red(`[ОШИБКА В temp_roles.js]`) + chalk.gray(`: Произошла непредвиденная ошибка.`))
                    }
                }

            }

        }, 60000)
    }
}