const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)
const wait = require(`node:timers/promises`).setTimeout

module.exports = (client) => {
    client.updatenicks = async () => {
        setInterval(async () => {
            const { Guild } = require(`../../schemas/guilddata`)
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.user_updates === false) return
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: `320193302844669959` })
            let i = 0
            for (const result of results) {
                if (result.userid !== `491343958660874242`) {
                    const { userid, displayname } = result;
                    const { rank, ramka1, name, ramka2, suffix, symbol, premium } = displayname;
                    const member = await guild.members.cache.get(userid)
                    await member.setNickname(`「${rank}」 ${ramka1}${name}${ramka2}${suffix} ${symbol}┇ ${premium}`)
                }
            }

            console.log(chalk.magenta(`[ИЗМЕНЕНИЕ НИКНЕЙМОВ]`) + chalk.gray(`: Никнеймы всех участников были обновлены!`))

        }, 600000)
    }
}