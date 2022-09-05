const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`)

module.exports = (client) => {
    client.updatenicks = async () => {
        setInterval(async () => {
            const guild = await client.guilds.fetch(`320193302844669959`)
            const results = await User.find({ userid: `709751588595695757` })

            for (const result of results) {
                if (result.userid == `491343958660874242`) return
                const { userid, displayname } = result;
                const { rank, ramka1, name, ramka2, suffix, symbol, premium } = displayname;
                const member = await guild.members.cache.get(userid)
                member.setNickname(`「${rank}」 ${ramka1}${name}${ramka2}${suffix} ${symbol}┇ ${premium}`)
            }

        }, 60000)
    }
}