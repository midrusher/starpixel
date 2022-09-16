const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require('discord.js');
const fetch = require(`node-fetch`);
const wait = require(`node:timers/promises`).setTimeout
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ
const ch_list = require(`../../discord structure/channels.json`)

module.exports = (client) => {
    client.top_3_gexp = async () => {
        setInterval(async () => {
            const guild = await client.guilds.fetch(`320193302844669959`)
            const guildData = await Guild.findOne({ id: guild.id })

            if (guildData.cooldowns.top_3_gexp > Date.now()) return


            guildData.cooldowns.top_3_gexp = Date.now() + (1000 * 60 * 60 * 24 * 7)
            guildData.save()
            let userDatas = await User.find({ guildid: guild.id })
            let b = 0
            let msg = await guild.channels.cache.get(ch_list.main).send({
                content: `Идет генерация топ-3 игроков по GEXP за неделю!`
            })
            for (let userData of userDatas) {
                userData = userDatas[b]
                let responseA = await fetch(`https://api.hypixel.net/guild?key=${api}&player=${userData.uuid}`)
                if (responseA.ok) {

                    let json = await responseA.json()
                    if (json.guild !== null) {


                        if (json.guild._id == `5c1902fc77ce84cd430f3959`) {
                            try {
                                var i = 0
                                while (json.guild.members[i].uuid !== userData.uuid) {
                                    i++
                                }
                                let gexpObj = json.guild.members[i].expHistory
                                let gexpArray = Object.values(gexpObj)
                                let weeklyGexp = gexpArray.reduce((a, b) => a + b, 0)
                                userData.weekly_exp = weeklyGexp

                                console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.gray(`: Участник ${json.guild.members[i].uuid} (${userData.nickname}) заработал за неделю ${weeklyGexp} GEXP`))
                                userData.save()


                            } catch (error) {
                                console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.red(`: Произошла ошибка при обновлении данных о GEXP пользователя ${userData.uuid} (${userData.nickname})!`));
                            }
                        } else {
                            console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.red(`: Игрок ${userData.uuid} (${userData.nickname}) не состоит в гильдии Starpixel!`));
                        }
                    } else {
                        console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.red(`: Игрок ${userData.uuid} (${userData.nickname}) не состоит ни в какой гильдии на Hypixel!`));
                    }
                } else {
                    console.log(`Гильдия не найдена или игрок не найден.`)
                    interaction.editReply(`Ошибка! Свяжитесь с администрацией гильдии.`)
                }
                await msg.edit({
                    content: `Идет просмотр опыта у всех участников . . . 

**Прогресс**: ${b + 1}/${userDatas.length} - ${(Math.round(((b + 1) / (userDatas.length)) * 100))}% завершено . . .`
                })
                b++
            }
            let sorted = await userDatas.sort((a, b) => b.weekly_exp - a.weekly_exp)
            let top = await sorted.slice(0, 3)
            let index = 1
            let medal
            let list = top.map(async (player) => {
                let user = guild.members.fetch(player.userid)
                if (index == 1) {
                    medal = index.toString().replace(1, `🥇`)
                    player.medal_1 += 1
                }
                if (index == 2) {
                    medal = index.toString().replace(2, `🥈`)
                    player.medal_2 += 1
                }
                if (index == 3) {
                    medal = index.toString().replace(3, `🥉`)
                    player.medal_3 += 1
                }
                index++
                player.save()
                return `**\`${medal} ${player.nickname}\`** - ${player.weekly_exp} опыта гильдии!`
            })
            list = await Promise.all(list)

            const top_3 = new EmbedBuilder()
                .setTitle(`Топ-3 лучших игрока по GEXP`)
                .setDescription(`${list.join('\n')}`)
                .setColor(process.env.bot_color)
                .setTimestamp(Date.now())

            await msg.edit({
                content: ``,
                embeds: [top_3]
            })
            

        }, 600000)
    }
}
