const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)

module.exports = (client) => {
    client.updatenicks = async () => {
        setInterval(async () => {
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ id: `709751588595695757` })

            for (const result of results) {
                const { id, displayname } = result;
                const { rank, ramka1, name, ramka2, suffix, symbol, premium } = displayname;
                const member = await guild.members.cache.get(id)
                member.setNickname(`「${rank}」 ${ramka1}${name}${ramka2}${suffix} ${symbol}┇ ${premium}`)
            }

        }, 10000)
    }
}