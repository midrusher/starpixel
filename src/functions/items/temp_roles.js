const { Temp } = require(`../../schemas/temp_items`)
const chalk = require(`chalk`)

module.exports = (client) => {
    client.temp_roles = async () => {
        setInterval(async () => {
            const results = await Temp.find({ expire: { $lt: new Date() } })

            for (const result of results) {
                const { guildid, userid, roleid } = result
                const guild = await client.guilds.fetch(guildid)
                const member = await guild.members.cache.get(userid)
                if (!member) {
                    console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: Пользователь не найден, файл с временной ролью удалён.`))
                    result.delete()
                } else if (member.roles.cache.has(roleid)) {
                    member.roles.remove(roleid)
                    console.log(chalk.manegta(`[УДАЛЕНЫ ВРЕМЕННЫЕ РОЛИ]`) + chalk.gray(`: Временные роли у пользователей ${results.count() }`))
                    result.delete()
                } else {
                    console.log(chalk.red(`[ОШИБКА В temp_roles.js]`) + chalk.gray(`: Произошла непредвиденная ошибка.`))
                }
            }
            
        }, 60000)
    }
}