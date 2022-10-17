const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)

module.exports = (client) => {
    client.halloweenRewards = async () => {
            const { Guild } = require(`../../schemas/guilddata`)
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.seasonal === false) return
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: guild.id })

            for (const result of results) {
                const { seasonal } = result
                const member = await guild.members.fetch(result.userid)

                if (seasonal.halloween.achievements.num1 == true && seasonal.halloween.achievements.num2 == true && seasonal.halloween.achievements.num3 == true && seasonal.halloween.achievements.num4 == true && seasonal.halloween.achievements.num5 == true && !member.roles.cache.has(`1030757644320915556`)) {
                    const done = new EmbedBuilder()
                        .setTitle(`Выдана сезонная роль`)
                        .setColor(process.env.bot_color)
                        .setThumbnail(member.user.displayAvatarURL())
                        .setTimestamp(Date.now())
                        .setDescription(`${member} получил \`${guild.roles.cache.get(`1030757644320915556`).name}\`! Теперь он может использовать сезонный цвет!`)
                    await member.roles.add(`1030757644320915556`)
                    await guild.channels.cache.get(ch_list.main).send({
                        embeds: [done]
                    })
                }

                
            }
    }
}