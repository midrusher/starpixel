const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)
const { EmbedBuilder } = require("discord.js")

module.exports = (client) => {
    client.rank_update = async () => {
        setInterval(async () => {
            const results = await User.find({ rank: { $gt: 0 } })

            for (const result of results) {
                const { id } = result;
                const guild = await client.guilds.fetch(`320193302844669959`)
                const member = await guild.members.cache.get(id)
                if (result.rank >= 0 && result.rank < 50) { //Новичок
                    const oldrank = [`553593734479216661`, `553593136895623208`, `553593133884112900`, `553593136027533313`, `553593976037310489`, `780487593485008946`, `849695880688173087`, `992122876394225814`, `992123014831419472`, `992123019793276961`]
                    const newrank = `553593731953983498`
                    if (member.roles.cache.has(newrank)) return


                    const rank_update = new EmbedBuilder()
                        .setTitle(`Ранг пользователя повышен!`)
                        .setColor(process.env.bot_color)
                        .setThumbnail(member.user.displayAvatarURL())
                        .setTimestamp(Date.now())
                        .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)

                    member.roles.remove(oldrank).catch()
                    member.roles.add(newrank).catch(console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: У ${result.name} уже есть роль ${guild.roles.cache.get(newrank).name}.`)))

                    guild.channels.cache.get(process.env.main_channel).send({
                        embeds: [rank_update]
                    })
                    console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))

                }


                if (result.rank >= 50 && result.rank < 150) { //Специалист
                    const oldrank = [`553593731953983498`, `553593136895623208`, `553593133884112900`, `553593136027533313`, `553593976037310489`, `780487593485008946`, `849695880688173087`, `992122876394225814`, `992123014831419472`, `992123019793276961`]
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
                    member.roles.add(newrank).catch(console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: У ${result.name} уже есть роль ${guild.roles.cache.get(newrank).name}.`)))

                    guild.channels.cache.get(process.env.main_channel).send({
                        embeds: [rank_update]
                    })
                    console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))

                }

                else if (result.rank >= 150 && result.rank < 500) { //Профессионал
                    const oldrank = [`553593731953983498`, `553593734479216661`, `553593133884112900`, `553593136027533313`, `553593976037310489`, `780487593485008946`, `849695880688173087`, `992122876394225814`, `992123014831419472`, `992123019793276961`]
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
                    member.roles.add(newrank).catch(console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: У ${result.name} уже есть роль ${guild.roles.cache.get(newrank).name}.`)))

                    guild.channels.cache.get(process.env.main_channel).send({
                        embeds: [rank_update]
                    })
                    console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                }

                else if (result.rank >= 500 && result.rank < 1000) { //Мастер
                    const oldrank = [`553593731953983498`, `553593734479216661`, `553593136895623208`, `553593136027533313`, `553593976037310489`, `780487593485008946`, `849695880688173087`, `992122876394225814`, `992123014831419472`, `992123019793276961`]
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
                    member.roles.add(newrank).catch(console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: У ${result.name} уже есть роль ${guild.roles.cache.get(newrank).name}.`)))

                    guild.channels.cache.get(process.env.main_channel).send({
                        embeds: [rank_update]
                    })
                    console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                }

                else if (result.rank >= 1000 && result.rank < 1500) { //Чемпион
                    const oldrank = [`553593731953983498`, `553593734479216661`, `553593136895623208`, `553593133884112900`, `553593976037310489`, `780487593485008946`, `849695880688173087`, `992122876394225814`, `992123014831419472`, `992123019793276961`]
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
                    member.roles.add(newrank).catch(console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: У ${result.name} уже есть роль ${guild.roles.cache.get(newrank).name}.`)))

                    guild.channels.cache.get(process.env.main_channel).send({
                        embeds: [rank_update]
                    })
                    console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                }

                else if (result.rank >= 1500 && result.rank < 2500) { //Звездочка
                    const oldrank = [`553593731953983498`, `553593734479216661`, `553593136895623208`, `553593133884112900`, `553593136027533313`, `780487593485008946`, `849695880688173087`, `992122876394225814`, `992123014831419472`, `992123019793276961`]
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
                    member.roles.add(newrank).catch(console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: У ${result.name} уже есть роль ${guild.roles.cache.get(newrank).name}.`)))

                    guild.channels.cache.get(process.env.main_channel).send({
                        embeds: [rank_update]
                    })
                    console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                }

                else if (result.rank >= 2500 && result.rank < 5000) { //Легенда
                    const oldrank = [`553593731953983498`, `553593734479216661`, `553593136895623208`, `553593133884112900`, `553593136027533313`, `553593976037310489`, `849695880688173087`, `992122876394225814`, `992123014831419472`, `992123019793276961`]
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
                    member.roles.add(newrank).catch(console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: У ${result.name} уже есть роль ${guild.roles.cache.get(newrank).name}.`)))

                    guild.channels.cache.get(process.env.main_channel).send({
                        embeds: [rank_update]
                    })
                    console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                }

                else if (result.rank >= 5000 && result.rank < 10000) {//Владыка
                    const oldrank = [`553593731953983498`, `553593734479216661`, `553593136895623208`, `553593133884112900`, `553593136027533313`, `553593976037310489`, `992122876394225814`, `992123014831419472`, `992123019793276961`]
                    const newrank = [`849695880688173087`, `780487593485008946`]
                    if (member.roles.cache.has(newrank)) return
                    
                    const rank_update = new EmbedBuilder()
                        .setTitle(`Ранг пользователя повышен!`)
                        .setColor(process.env.bot_color)
                        .setThumbnail(member.user.displayAvatarURL())
                        .setTimestamp(Date.now())
                        .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)
                    
                    member.roles.remove(oldrank).catch()
                    member.roles.add(newrank).catch(console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: У ${result.name} уже есть роль ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}`)))

                    guild.channels.cache.get(process.env.main_channel).send({
                        embeds: [rank_update]
                    })
                    console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}`))
                }

                else if (result.rank >= 10000 && result.rank < 15000 && member.roles.cache.has(`930520087797051452`)) { //Лорд
                    const oldrank = [`553593731953983498`, `553593734479216661`, `553593136895623208`, `553593133884112900`, `553593136027533313`, `553593976037310489`, `780487593485008946`, `849695880688173087`, `992123014831419472`, `992123019793276961`]
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
                    member.roles.add(newrank).catch(console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: У ${result.name} уже есть роль ${guild.roles.cache.get(newrank).name}.`)))

                    guild.channels.cache.get(process.env.main_channel).send({
                        embeds: [rank_update]
                    })
                    console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank).name}.`))
                }

                else if (result.rank >= 15000 && result.rank < 25000 && member.roles.cache.has(`930520087797051452`)) { //Император
                    const oldrank = [`553593731953983498`, `553593734479216661`, `553593136895623208`, `553593133884112900`, `553593136027533313`, `553593976037310489`, `780487593485008946`, `849695880688173087`, `992123019793276961`]
                    const newrank = [`992123014831419472`, `992122876394225814`]
                    if (member.roles.cache.has(newrank)) return
                    
                    const rank_update = new EmbedBuilder()
                        .setTitle(`Ранг пользователя повышен!`)
                        .setColor(process.env.bot_color)
                        .setThumbnail(member.user.displayAvatarURL())
                        .setTimestamp(Date.now())
                        .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)
                    
                    member.roles.remove(oldrank).catch()
                    member.roles.add(newrank).catch(console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: У ${result.name} уже есть роль ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}`)))

                    guild.channels.cache.get(process.env.main_channel).send({
                        embeds: [rank_update]
                    })
                    console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}`))
                }

                else if (result.rank >= 25000 && member.roles.cache.has(`930520087797051452`)) { //Повелитель
                    const oldrank = [`553593731953983498`, `553593734479216661`, `553593136895623208`, `553593133884112900`, `553593136027533313`, `553593976037310489`, `780487593485008946`, `849695880688173087`, `992123014831419472`]
                    const newrank = [`992123019793276961`, `992122876394225814`]
                    if (member.roles.cache.has(newrank)) return
                    
                    const rank_update = new EmbedBuilder()
                        .setTitle(`Ранг пользователя повышен!`)
                        .setColor(process.env.bot_color)
                        .setThumbnail(member.user.displayAvatarURL())
                        .setTimestamp(Date.now())
                        .setDescription(`${member} повысил ранг гильдии! Теперь он ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}!
Проверить количество своего опыта ранга можно, прописав \`/items\`!`)
                    
                    member.roles.remove(oldrank).catch()
                    member.roles.add(newrank).catch(console.log(chalk.red(`[ОШИБКА]`) + chalk.gray(`: У ${result.name} уже есть роль ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}`)))

                    guild.channels.cache.get(process.env.main_channel).send({
                        embeds: [rank_update]
                    })
                    console.log(chalk.green(`[${result.name} повысил ранг]`) + chalk.gray(`: Теперь он ${guild.roles.cache.get(newrank[0]).name} & ${guild.roles.cache.get(newrank[1]).name}`))
                }

            }
        }, 10000)
    }
}