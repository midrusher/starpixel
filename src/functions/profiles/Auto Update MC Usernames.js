const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const upd_nick_api = process.env.hp_api_upd_nicks_only

module.exports = (client) => {
    client.UpdateNicknames = async () => {
        setInterval(async () => {
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ guildid: guild.id })

            for (const result of results) {
                
                let response = await fetch(`https://api.hypixel.net/player?key=${upd_nick_api}&uuid=${result.uuid}`)
                    if (response.ok) {
                        try {
                            let json = await response.json()
                            result.nickname = json.player.displayname;
                            result.save()
                        } catch (error) {
                            console.log(chalk.hex(`#FFA500`)(`[HypixelAPI]`) + chalk.red(`: UUID не найден ИЛИ игрок не найден ИЛИ произошла другая ошибка!` + error))
                        }
                    }

            }

        }, 10000)
    }
}