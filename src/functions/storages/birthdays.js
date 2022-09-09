const { Birthday } = require(`../../../src/schemas/birthday`)
const { Temp } = require(`../../../src/schemas/temp_items`)
const chalk = require(`chalk`)
const cron = require(`node-cron`)
const { EmbedBuilder } = require("discord.js")

module.exports = (client) => {
    client.wish_birthday = async () => {
        const Guilds = client.guilds.cache

        cron.schedule(`0 5 * * *`, () => {
            Guilds.forEach(async g => {
                const data = await Birthday.find({ guild: g.id }).catch(err => { })
                if (!data) return

                data.forEach(async b => {
                    const channel = g.channels.cache.get(`983440987328229446`)
                    if (!channel) return

                    const member = g.members.cache.get(b.userid) || `Неизвестный пользователь#0000`
                    const Day = b.day
                    const Month = b.month
                    const Year = b.year

                    const date = new Date()
                    const currentYear = date.getFullYear()
                    const currentMonth = date.getMonth() + 1
                    const currentDate = date.getDate()

                    const age = currentYear - Year;

                    const happy_birthday = new EmbedBuilder()
                        .setThumbnail(member.user.displayAvatarURL())
                        .setDescription(`🎂 Поздравляем ${member} с ${age}-ым днём рождения! Желаем тебе всего самого наилучшего в этот прекрасный день! 
В качестве подарка от гильдии ты получаешь **КОРОЛЕВСКУЮ** коробку и эксклюзивную роль именинника на весь день!`)
                        .setColor(process.env.bot_color)

                    if (Month === currentMonth && Day === currentDate) {
                        await channel.send({
                            content: `@everyone`,
                            embeds: [happy_birthday]
                        }).then((m) => {
                            m.react(`🎂`)
                        })
                        await member.roles.add(`983441364903665714`).catch()
                        await member.roles.add(`584673040470769667`).catch()
                        const hpb = new Temp({ userid: member.user.id, guildid: g.id, roleid: `983441364903665714`, expire: Date.now() + (1000 * 60 * 60 * 24) })
                        hpb.save()
                    }



                })
            })
        }, {
            scheduled: true,
            timezone: `Europe/Moscow`
        })
    }
}