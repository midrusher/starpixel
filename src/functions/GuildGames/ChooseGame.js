const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)

module.exports = (client) => {
    client.randomGame = async () => {
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return

        const guild = await client.guilds.fetch(`320193302844669959`)
        const channel = await guild.channes.fetch(ch_list.main)
        
        const games = require(`./GuildGamesSettings/Games List.json`)
        const game = games[Math.floor(Math.random() * games.length)]

        const rules = require(`./GuildGamesSettings/Special Rules.json`)
        const rule = rules[Math.floor(Math.random() * rules.length)]

        await channel.send(`◾`)
        
        //Выбор игры
        if (game.type == `normal`) {

        } else if (game.type == `vote`) {

        } else if (game.type == `restrictment`) {

        }
    }
}
