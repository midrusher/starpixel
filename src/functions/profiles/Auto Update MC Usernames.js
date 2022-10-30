const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const fetch = require(`node-fetch`)
const upd_nick_api = process.env.hp_api_upd_nicks_only
const linksInfo = require(`../../discord structure/links.json`)

module.exports = (client) => {
    client.UpdateNicknames = async () => {
            const { Guild } = require(`../../schemas/guilddata`)
            const guild_plugin = await client.guilds.fetch(`320193302844669959`)
            const pluginData = await Guild.findOne({ id: guild_plugin.id })
            if (pluginData.plugins.user_updates === false) return
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: guild.id })

            for (const result of results) {
                
                let response = await fetch(`https://api.hypixel.net/player?key=${upd_nick_api}&uuid=${result.uuid}`)
                    if (response.ok) {
                        try {
                            const oldnick = result.nickname
                            let json = await response.json()
                            if (oldnick !== json.player.displayname) {
                                result.oldnickname = oldnick
                            }
                            result.nickname = json.player.displayname;
                            result.save()
                        } catch (error) {
                            console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.red(`: UUID не найден ИЛИ игрок не найден ИЛИ произошла другая ошибка!` + error))
                        }
                    }

            }

    }
}