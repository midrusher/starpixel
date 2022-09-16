const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)

module.exports = (client) => {
    client.AutoElements = async () => {
        setInterval(async () => {
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: guild.id })

            for (const result of results) {
                const { elements } = result
                const member = await guild.members.fetch(result.userid)

                if (elements.diving == 1 && elements.resistance == 1 && elements.respiration == 1 && !member.roles.cache.has(`930169139866259496`)) {
                    const done = new EmbedBuilder()
                    .setTitle(`Выдана стихия`)
                    .setColor(process.env.bot_color)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setTimestamp(Date.now())
                    .setDescription(`${member} получил \`${guild.roles.cache.get(`930169139866259496`).name}\`! Пропишите \`/elements water\` для использования стихии!`)
                    await member.roles.add(`930169139866259496`)
                    await guild.channels.cache.get(ch_list.main).send({
                        embeds: [done]
                    })
                }

                if (elements.eagle_eye == 1 && elements.wind == 1 && elements.flying == 1 && !member.roles.cache.has(`930169145314652170`)) {
                    const done = new EmbedBuilder()
                    .setTitle(`Выдана стихия`)
                    .setColor(process.env.bot_color)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setTimestamp(Date.now())
                    .setDescription(`${member} получил \`${guild.roles.cache.get(`930169145314652170`).name}\`! Пропишите \`/elements air\` для использования стихии!`)
                    await member.roles.add(`930169145314652170`)
                    await guild.channels.cache.get(ch_list.main).send({
                        embeds: [done]
                    })
                }

                if (elements.fast_grow == 1 && elements.mountains == 1 && elements.underground == 1 && !member.roles.cache.has(`930169143347523604`)) {
                    const done = new EmbedBuilder()
                    .setTitle(`Выдана стихия`)
                    .setColor(process.env.bot_color)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setTimestamp(Date.now())
                    .setDescription(`${member} получил \`${guild.roles.cache.get(`930169143347523604`).name}\`! Пропишите \`/elements earth\` для использования стихии!`)
                    await member.roles.add(`930169143347523604`)
                    await guild.channels.cache.get(ch_list.main).send({
                        embeds: [done]
                    })
                }

                if (elements.fire_resistance == 1 && elements.flame == 1 && elements.lightning == 1 && !member.roles.cache.has(`930169133671280641`)) {
                    const done = new EmbedBuilder()
                    .setTitle(`Выдана стихия`)
                    .setColor(process.env.bot_color)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setTimestamp(Date.now())
                    .setDescription(`${member} получил \`${guild.roles.cache.get(`930169133671280641`).name}\`! Пропишите \`/elements fire\` для использования стихии!`)
                    await member.roles.add(`930169133671280641`)
                    await guild.channels.cache.get(ch_list.main).send({
                        embeds: [done]
                    })
                }
            }

        }, 600000)
    }
}