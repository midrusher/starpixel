const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)
const { EmbedBuilder } = require("discord.js")

module.exports = (client) => {
    client.rank_update = async () => {
        setInterval(async () => {
            const results = await User.find({ rank: { $gte: 0 } })

            for (const result of results) {
                if (result.userid !== `491343958660874242`) {
                    const { userid } = result;
                    const guild = await client.guilds.fetch(`320193302844669959`)
                    const member = await guild.members.cache.get(userid)
                    if (result.rank >= 0 && result.rank < 50) { //Новичок

                        const newrank = `553593731953983498`
                        if (member.roles.cache.has(newrank)) return


                        const rank_update = new EmbedBuilder()
                            .setTitle(`Ранг пользователя повышен!`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(member.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                        member.roles.add(newrank).catch()
                        result.displayname.rank = `🦋`
                        result.save()

                        guild.channels.cache.get(process.env.main_channel).send({
                            embeds: [rank_update]
                        })
                        console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))

                    }


                    if (result.rank >= 50 && result.rank < 150) { //Специалист
                        const oldrank = `553593731953983498`
                        const newrank = `553593734479216661`
                        if (member.roles.cache.has(newrank)) return


                        const rank_update = new EmbedBuilder()
                            .setTitle(`Ранг пользователя повышен!`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(member.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                        member.roles.remove(oldrank).catch()
                        member.roles.add(newrank).catch()
                        result.displayname.rank = `🥥`
                        result.save()

                        guild.channels.cache.get(process.env.main_channel).send({
                            embeds: [rank_update]
                        })
                        console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))

                    }

                    else if (result.rank >= 150 && result.rank < 500) { //Профессионал
                        const oldrank = `553593734479216661`
                        const newrank = `553593136895623208`
                        if (member.roles.cache.has(newrank)) return

                        const rank_update = new EmbedBuilder()
                            .setTitle(`Ранг пользователя повышен!`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(member.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                        member.roles.remove(oldrank).catch()
                        member.roles.add(newrank).catch()
                        result.displayname.rank = `🍕`
                        result.save()

                        guild.channels.cache.get(process.env.main_channel).send({
                            embeds: [rank_update]
                        })
                        console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                    }

                    else if (result.rank >= 500 && result.rank < 1000) { //Мастер
                        const oldrank = `553593136895623208`
                        const newrank = `553593133884112900`
                        if (member.roles.cache.has(newrank)) return

                        const rank_update = new EmbedBuilder()
                            .setTitle(`Ранг пользователя повышен!`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(member.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                        member.roles.remove(oldrank).catch()
                        member.roles.add(newrank).catch()
                        result.displayname.rank = `🍂`
                        result.save()

                        guild.channels.cache.get(process.env.main_channel).send({
                            embeds: [rank_update]
                        })
                        console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                        break;
                    }

                    else if (result.rank >= 1000 && result.rank < 1500) { //Чемпион
                        const oldrank = `553593133884112900`
                        const newrank = `553593136027533313`
                        if (member.roles.cache.has(newrank)) return

                        const rank_update = new EmbedBuilder()
                            .setTitle(`Ранг пользователя повышен!`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(member.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                        member.roles.remove(oldrank).catch()
                        member.roles.add(newrank).catch()
                        result.displayname.rank = `🍁`
                        result.save()

                        guild.channels.cache.get(process.env.main_channel).send({
                            embeds: [rank_update]
                        })
                        console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                        break;
                    }

                    else if (result.rank >= 1500 && result.rank < 2500) { //Звездочка
                        const oldrank = `553593136027533313`
                        const newrank = `553593976037310489`
                        if (member.roles.cache.has(newrank)) return

                        const rank_update = new EmbedBuilder()
                            .setTitle(`Ранг пользователя повышен!`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(member.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                        member.roles.remove(oldrank).catch()
                        member.roles.add(newrank).catch()
                        result.displayname.rank = `⭐`
                        result.save()

                        guild.channels.cache.get(process.env.main_channel).send({
                            embeds: [rank_update]
                        })
                        console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                        break;
                    }

                    else if (result.rank >= 2500 && result.rank < 5000) { //Легенда
                        const oldrank = `553593976037310489`
                        const newrank = `780487593485008946`
                        if (member.roles.cache.has(newrank)) return

                        const rank_update = new EmbedBuilder()
                            .setTitle(`Ранг пользователя повышен!`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(member.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                        member.roles.remove(oldrank).catch()
                        member.roles.add(newrank).catch()
                        result.displayname.rank = `🏅`
                        result.save()

                        guild.channels.cache.get(process.env.main_channel).send({
                            embeds: [rank_update]
                        })
                        console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                        break;
                    }

                    else if (result.rank >= 5000 && result.rank < 10000) {//Владыка

                        const newrank = `849695880688173087`
                        if (member.roles.cache.has(newrank[0]) && member.roles.cache.has(newrank[1])) return

                        const rank_update = new EmbedBuilder()
                            .setTitle(`Ранг пользователя повышен!`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(member.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                        member.roles.add(newrank).catch()
                        result.displayname.rank = `🍓`
                        result.save()

                        guild.channels.cache.get(process.env.main_channel).send({
                            embeds: [rank_update]
                        })
                        console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}`))
                        break;
                    }

                    else if (result.rank >= 10000 && result.rank < 15000 && member.roles.cache.has(`930520087797051452`)) { //Лорд
                        const oldrank = [`780487593485008946`, `849695880688173087`]
                        const newrank = `992122876394225814`
                        if (member.roles.cache.has(newrank)) return

                        const rank_update = new EmbedBuilder()
                            .setTitle(`Ранг пользователя повышен!`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(member.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                        member.roles.remove(oldrank).catch()
                        member.roles.add(newrank).catch()
                        result.displayname.rank = `🧨`
                        result.save()

                        guild.channels.cache.get(process.env.main_channel).send({
                            embeds: [rank_update]
                        })
                        console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                        break;
                    }

                    else if (result.rank >= 15000 && result.rank < 25000 && member.roles.cache.has(`930520087797051452`)) { //Император
                        const newrank = `992123014831419472`
                        if (member.roles.cache.has(newrank[0]) && member.roles.cache.has(newrank[1])) return

                        const rank_update = new EmbedBuilder()
                            .setTitle(`Ранг пользователя повышен!`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(member.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                        member.roles.add(newrank).catch()
                        result.displayname.rank = `💎`
                        result.save()

                        guild.channels.cache.get(process.env.main_channel).send({
                            embeds: [rank_update]
                        })
                        console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}`))
                    }

                    else if (result.rank >= 25000 && member.roles.cache.has(`930520087797051452`)) { //Повелитель
                        const oldrank = `992123014831419472`
                        const newrank = `992123019793276961`
                        if (member.roles.cache.has(newrank[0]) && member.roles.cache.has(newrank[1])) return

                        const rank_update = new EmbedBuilder()
                            .setTitle(`Ранг пользователя повышен!`)
                            .setColor(process.env.bot_color)
                            .setThumbnail(member.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                        member.roles.remove(oldrank).catch()
                        member.roles.add(newrank).catch()
                        result.displayname.rank = `🍇`
                        result.save()

                        guild.channels.cache.get(process.env.main_channel).send({
                            embeds: [rank_update]
                        })
                        console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}`))
                        break;
                    }
                }


            }
        }, 60000)
    }
}