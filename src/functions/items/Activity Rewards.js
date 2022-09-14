const { User } = require(`../../schemas/userdata`)
const rewards = require(`./act_rewards.json`)
const { Temp } = require(`../../schemas/temp_items`)
const chalk = require(`chalk`)

module.exports = (client) => {
    client.act_rewards = async () => {
        setInterval(async () => {
            const results = await User.find({ level: { $gt: 0 } })
            let i
            for (const result of results) {
                const { userid, level, act_rewards } = result;
                i = level
                const guild = await client.guilds.fetch(`320193302844669959`)
                const member = await guild.members.cache.get(userid)
                if (act_rewards < level) {

                    try {
                        const role = await guild.roles.fetch(rewards[i].role)

                        if (rewards[i].type == "box") {
                            if (!member.roles.cache.has(role)) {
                                result.act_rewards = level;
                                await member.roles.add(role)
                                console.log(chalk.magenta(`[НАГРАДЫ ЗА УРОВЕНЬ]`) + chalk.gray(`: ${member.user.username} получил награду за ${i} уровень!`))
                                result.save()
                            }

                        } else if (rewards[i].type == "premium") {
                            if (rewards[i].expire == `7d` && !member.roles.cache.has(role)) {
                                result.act_rewards = level;
                                const newItem = new Temp({
                                    userid: member.user.id,
                                    guildid: guild.id,
                                    roleid: role,
                                    expire: Date.now() + (1000 * 60 * 60 * 24 * 7)
                                })
                                newItem.save()
                                await member.roles.add(role)
                                console.log(chalk.magenta(`[НАГРАДЫ ЗА УРОВЕНЬ]`) + chalk.gray(`: ${member.user.username} получил награду за ${i} уровень!`))
                                result.save()
                            } else if (rewards[i].expire == `90d` && !member.roles.cache.has(role)) {
                                result.act_rewards = level;
                                const newItem = new Temp({
                                    userid: member.user.id,
                                    guildid: guild.id,
                                    roleid: role,
                                    expire: Date.now() + (1000 * 60 * 60 * 24 * 90)
                                })
                                newItem.save()
                                await member.roles.add(role)
                                console.log(chalk.magenta(`[НАГРАДЫ ЗА УРОВЕНЬ]`) + chalk.gray(`: ${member.user.username} получил награду за ${i} уровень!`))
                                result.save()
                            }
                        } else if (rewards[i].type == "rank_exp") {
                            result.act_rewards = level;
                            result.rank += rewards[i].amount
                            console.log(chalk.magenta(`[НАГРАДЫ ЗА УРОВЕНЬ]`) + chalk.gray(`: ${member.user.username} получил награду за ${i} уровень!`))
                            result.save()
                        } else if (rewards[i].type == "leg_reward") {
                            if (!member.roles.cache.has(role)) {
                                result.act_rewards = level;
                                await member.roles.add(role)
                                console.log(chalk.magenta(`[НАГРАДЫ ЗА УРОВЕНЬ]`) + chalk.gray(`: ${member.user.username} получил награду за ${i} уровень!`))
                                result.save()
                            }
                        }
                    } catch (error) {
                        console.log(`Роль за уровень ${i} не существует!`)
                    }


                }
            }
        }, 60000)
    }
}