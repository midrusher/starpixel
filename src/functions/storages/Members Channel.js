const { Guild } = require(`../../schemas/guilddata`)
const { User } = require(`../../schemas/userdata`)

const chalk = require(`chalk`)
const { EmbedBuilder } = require("discord.js")
const ch_list = require(`../../discord structure/channels.json`)

module.exports = (client) => {
    client.update_members = async () => {
        setInterval(async () => {
            const Guilds = client.guilds.cache

            Guilds.forEach(async g => {
                const channel = await g.channels.cache.get(`932203255335899177`)
                const adminmsg = await channel.messages.fetch(`1018224160125755553`)
                const premmsg = await channel.messages.fetch(`1018224161027543221`)
                const membmsg = await channel.messages.fetch(`1018224178224169000`)
                const members = await g.members.fetch()


                const admins = await members.filter(member => member.roles.cache.has(`567689925143822346`))
                await admins.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                const admin_list = await admins.map(async (admin) => {
                    const userData = await User.findOne({ userid: admin.user.id })
                    let nickname
                    let age
                    if (!userData) {
                        age = `Возраст не указан`
                        nickname = `Никнейм не указан`
                    } else {
                        age = userData.age
                        nickname = userData.nickname
                    }
                    return `${admin} ➖ \`${age} лет\` ➖ \`${nickname}\``
                })
                let adminres = await Promise.all(admin_list)


                const mainoffs = await members.filter(member => !member.roles.cache.has(`567689925143822346`) && member.roles.cache.has(`320880176416161802`))
                await mainoffs.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                const mainoff_list = await mainoffs.map(async (mainoff) => {
                    const userData = await User.findOne({ userid: mainoff.user.id })
                    let nickname
                    let age
                    if (!userData) {
                        age = `Возраст не указан`
                        nickname = `Никнейм не указан`
                    } else {
                        age = userData.age
                        nickname = userData.nickname
                    }

                    return `${mainoff} ➖ \`${age} лет\` ➖ \`${nickname}\``
                })
                let mainoffres = await Promise.all(mainoff_list)


                const offs = await members.filter(member => !member.roles.cache.has(`567689925143822346`) && !member.roles.cache.has(`320880176416161802`) && (member.roles.cache.has(`563793535250464809`) || member.roles.cache.has(`523559726219526184`)))
                await offs.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                const off_list = await offs.map(async (off) => {
                    const userData = await User.findOne({ userid: off.user.id })
                    let nickname
                    let age
                    if (!userData) {
                        age = `Возраст не указан`
                        nickname = `Никнейм не указан`
                    } else {
                        age = userData.age
                        nickname = userData.nickname
                    }

                    return `${off} ➖ \`${age} лет\` ➖ \`${nickname}\``
                })
                let offres = await Promise.all(off_list) 


                const staff = new EmbedBuilder()
                    .setTitle(`ПЕРСОНАЛ ГИЛЬДИИ`)
                    .setColor(process.env.bot_color)
                    .setDescription(`**Правление гильдии**
${adminres.join('\n')}

**Администраторы гильдии**
${mainoffres.join('\n')}

**Офицеры гильдии**
${offres.join('\n')}`)
                await adminmsg.edit({
                    content: ``,
                    embeds: [staff]
                })



                const premiums = await members.filter(member => !member.roles.cache.has(`567689925143822346`) && !member.roles.cache.has(`320880176416161802`) && !member.roles.cache.has(`563793535250464809`) && !member.roles.cache.has(`523559726219526184`) && member.roles.cache.has(`850336260265476096`))
                await premiums.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                const prem_list = await premiums.map(async (premium) => {
                    const userData = await User.findOne({ userid: premium.user.id })
                    let nickname
                    let age
                    if (!userData) {
                        age = `Возраст не указан`
                        nickname = `Никнейм не указан`
                    } else {
                        age = userData.age
                        nickname = userData.nickname
                    }

                    return `${premium} ➖ \`${age} лет\` ➖ \`${nickname}\``
                })
                let premres = await Promise.all(prem_list)

                const premmembers = new EmbedBuilder()
                    .setTitle(`VIP УЧАСТНИКИ`)
                    .setColor(process.env.bot_color)
                    .setDescription(`${premres.join('\n')}`)
                await premmsg.edit({
                    content: ``,
                    embeds: [premmembers]
                })


                const gmembers = await members.filter(member => !member.roles.cache.has(`567689925143822346`) && !member.roles.cache.has(`320880176416161802`) && !member.roles.cache.has(`563793535250464809`) && !member.roles.cache.has(`523559726219526184`) && !member.roles.cache.has(`850336260265476096`) && member.roles.cache.has(`504887113649750016`) && member.user.id !== `` && member.user.id !== ``)
                await gmembers.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                const memb_list = await gmembers.map(async (memb) => {
                    const userData = await User.findOne({ userid: memb.user.id })
                    let nickname
                    let age
                    if (!userData) {
                        age = `Возраст не указан`
                        nickname = `Никнейм не указан`
                    } else {
                        age = userData.age
                        nickname = userData.nickname
                    }

                    return `${memb} ➖ \`${age} лет\` ➖ \`${nickname}\``
                })
                let membres = await Promise.all(memb_list)

                const memberslist = new EmbedBuilder()
                    .setTitle(`УЧАСТНИКИ ГИЛЬДИИ`)
                    .setColor(process.env.bot_color)
                    .setDescription(
                        `${membres.join('\n')}`)
                    .addFields({
                        name: `Примечание 1`,
                        value: `Если вы поменяли ник, убедительная просьба сообщить об этом в <#${ch_list.ask}>`,
                        inline: true
                    },{
                        name: `Примечание 2`,
                        value: `Если вы обнаружили ошибку в вашем нике или вашем возрасте, пожалуйста, сообщите нам об этом в <#${ch_list.ask}>`,
                        inline: true
                    },)
                await membmsg.edit({
                    content: ``,
                    embeds: [memberslist]
                })
                console.log(chalk.magenta(`[ОБНОВЛЁН КАНАЛ УЧАСТНИКИ]`) + chalk.gray(`: Канал участники был обновлен. Добавлены новые пользователи. Изменены позиции текущий участников.`))
            })

        }, 600000)
    }
}