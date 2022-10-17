const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)

module.exports = (client) => {
    client.removeNonPremiumColors = async () => {
            const { Guild } = require(`../../schemas/guilddata`)
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.premium === false) return
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: guild.id })
            const r1 = `595893144055316490`; //Чёрный
            const r2 = `595892599693246474`; //Лазурный
            const r3 = `595892677451710468`; //Пурпурный
            const r4 = `595892238370996235`; //Сиреневый
            const r5 = `589770984391966760`; //Фламинговый
            const r6 = `595893568485326862`; //Изумрудный 
            const r7 = `630395361508458516`; //Яблочный
            const r8 = `595892930204401665`; //Салатовый
            const r9 = `595889341058777088`; //Песочный
            const r10 = `1024741633947873401`; //Ализариновый
            for (const result of results) {
                const { userid, displayname, pers_emoji } = result;
                const member = await guild.members.cache.get(userid)
                if (
                    !member.roles.cache.has(`850336260265476096`) &&
                    !member.roles.cache.has(`780487593485008946`) &&
                    !member.roles.cache.has(`849695880688173087`) &&
                    !member.roles.cache.has(`992122876394225814`) &&
                    !member.roles.cache.has(`992123014831419472`) &&
                    !member.roles.cache.has(`992123019793276961`) &&
                    (
                        member.roles.cache.has(r1) ||
                        member.roles.cache.has(r2) ||
                        member.roles.cache.has(r3) ||
                        member.roles.cache.has(r4) ||
                        member.roles.cache.has(r5) ||
                        member.roles.cache.has(r6) ||
                        member.roles.cache.has(r7) ||
                        member.roles.cache.has(r8) ||
                        member.roles.cache.has(r9) ||
                        member.roles.cache.has(r10)
                    )
                ) {
                    await member.roles.remove([r1, r2, r3, r4, r5, r6, r7, r8, r9, r10])
                }
                result.save()

            }

    }
}