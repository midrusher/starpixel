const { User } = require(`../../schemas/userdata`)
const chalk = require(`chalk`);
const { EmbedBuilder } = require(`discord.js`)
const ch_list = require(`../../discord structure/channels.json`)
const { Guild } = require(`../../schemas/guilddata`)
const { suffix } = require(`../../functions`)

module.exports = (client) => {
    client.randomGame = async () => {
        const guild_plugin = await client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return

        const guild = await client.guilds.fetch(`320193302844669959`)
        const guildData = await Guild.findOne({ id: guild.id })
        const channel = await guild.channels.fetch(ch_list.test)
        const voice = await guild.channels.fetch(ch_list.guildGamesVoice)

        const games = require(`./GuildGamesSettings/Games List.json`)
        const type = games[Math.floor(Math.random() * games.length)]

        const rules = require(`./GuildGamesSettings/Special Rules.json`)
        let rule = rules[Math.floor(Math.random() * rules.length)]

        //Выбор игры
        if (type.type == `normal`) {
            const game = type.games[Math.floor(Math.random() * type.games.length)]
            const gameList = await guildData.guildgames.games.find(gm => gm.id == game.name)
            if (!gameList) {
                guildData.guildgames.games.push({
                    id: game.name,
                    played: 1
                })
            } else if (gameList.played >= game.max) {
                return client.randomGame()
            } else {
                gameList.played += 1
            }
            await channel.send(`◾`)
            await channel.send({
                content: `╔════════════╗◊╔════════════╗
**СОВМЕСТНАЯ ИГРА**
Идёт выбор следующей игры...
:video_game: **${game.name}**
:game_die: Максимум **${suffix(game.max)}** раз за совместную игру
╚════════════╝◊╚════════════╝`
            })

        } else if (type.type == `vote`) {
            const game1 = type.games[Math.floor(Math.random() * type.games.length)]
            let game2 = type.games[Math.floor(Math.random() * type.games.length)]
            while (game2.name == game1.name) {
                game2 = type.games[Math.floor(Math.random() * type.games.length)]
            }
            await channel.send(`◾`)
            const msg = await channel.send({
                content: `╔════════════╗◊╔════════════╗
**СОВМЕСТНАЯ ИГРА**
Игроки выбирают следующую игру:
🔶 **${game1.name}**
:game_die: Максимум **${suffix(game1.max)}** за совместную игру

🔷 **${game2.name}**
:game_die: Максимум **${suffix(game2.max)}** за совместную игру
╚════════════╝◊╚════════════╝
Проголосуйте реакциями, у вас есть 15 секунд!`
            })
            const filter = (reaction, user) => reaction.emoji.name === '🔶' || reaction.emoji.name === '🔷';

            const collector = msg.createReactionCollector({ filter, time: 15000 });
            await msg.react(`🔶`)
            await msg.react(`🔷`)
            collector.on('end', async (collected) => {
                const sort = await collected.sort((a, b) => b.count - a.count)
                if (sort.first().emoji.name == `🔶`) {
                    const gameList = await guildData.guildgames.games.find(gm => gm.id == game1.name)
                    if (!gameList) {
                        guildData.guildgames.games.push({
                            id: game1.name,
                            played: 1
                        })
                    } else if (gameList.played >= game1.max) {
                        await msg.reply({
                            content: `Выбранная игра (${game1.name}) достигла своего лимита на данной совместной игре... Идёт выбор новой игры...`
                        })
                        return client.randomGame()
                    } else {
                        gameList.played += 1
                    }
                    await msg.reply({
                        content: `╔════════════╗◊╔════════════╗
**СОВМЕСТНАЯ ИГРА**
Игроки выбрали следующую игру...
:video_game: **${game1.name}**
:game_die: Максимум **${suffix(game1.max)}** раз за совместную игру
╚════════════╝◊╚════════════╝`
                    })
                } else if (sort.first().emoji.name == `🔷`) {
                    const gameList = await guildData.guildgames.games.find(gm => gm.id == game2.name)
                    if (!gameList) {
                        guildData.guildgames.games.push({
                            id: game2.name,
                            played: 1
                        })
                    } else if (gameList.played >= game2.max) {
                        await msg.reply({
                            content: `Выбранная игра (${game2.name}) достигла своего лимита на данной совместной игре... Идёт выбор новой игры...`
                        })
                        return client.randomGame()
                    } else {
                        gameList.played += 1
                    }
                    await msg.reply({
                        content: `╔════════════╗◊╔════════════╗
**СОВМЕСТНАЯ ИГРА**
Игроки выбрали следующую игру...
:video_game: **${game2.name}**
:game_die: Максимум **${suffix(game2.max)}** раз за совместную игру
╚════════════╝◊╚════════════╝`
                    })
                }
            })
        } else if (type.type == `restrictment`) {
            const game = type.games[Math.floor(Math.random() * type.games.length)]
            const gameList = await guildData.guildgames.games.find(gm => gm.id == game.name)
            const voiceMembers = voice.members.filter(member => member.user.bot === false)
            if (!gameList) {
                guildData.guildgames.games.push({
                    id: game.name,
                    played: 1
                })
            } else if (gameList.played >= game.max || voiceMembers.size >= game.rest_num) {
                return client.randomGame()
            } else {
                gameList.played += 1
            }
            await channel.send(`◾`)
            await channel.send({
                content: `╔════════════╗◊╔════════════╗
**СОВМЕСТНАЯ ИГРА**
Идёт выбор следующей игры...
:video_game: **${game.name}**
:game_die: Максимум **${suffix(game.max)}** раз за совместную игру
:warning: Данная игра имеет ограничение. __${game.rest}!__
╚════════════╝◊╚════════════╝`
            })
        }

        if (!rule.restrictment || rule.restrictment == `SkyWars`) {
            await channel.send({
                content: `:warning: Специальное правило:
${rule.description}`
            })
        } else if (rule.restrictment == `randomMember`) {
            const randomNumber = Math.floor(Math.random() * voice.members.size) + 1
            await channel.send(`:warning: Специальное правило:
${rule.description.replace(`%n`, randomNumber)}`)
        } 
        guildData.save()
    }
}
