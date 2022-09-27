const chalk = require(`chalk`);
const { ChannelType, EmbedBuilder } = require("discord.js");
const quiz = require(`./quiz.json`)
const questions = require(`./questions.json`);
const { User } = require("../../../schemas/userdata");
const ch_list = require(`../../../discord structure/channels.json`)

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        const { Guild } = require(`../../../schemas/guilddata`)
        const guild_plugin = await message.client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.channels === false) return
        if (message.channel.id == ch_list.main) {
            const vars = [
                {
                    name: `none`,
                    dropChance: 9993
                },
                {
                    name: `quiz`,
                    dropChance: 1
                },
                {
                    name: `math`,
                    dropChance: 1
                },
                {
                    name: `question`,
                    dropChance: 5
                },

            ];

            let sum_vars = 0;
            for (let i_var = 0; i_var < vars.length; i_var++) {
                sum_vars += vars[i_var].dropChance;
            }
            let r_var = Math.floor(Math.random() * sum_vars);
            let i_var = 0;
            for (let s = vars[0].dropChance; s <= r_var; s += vars[i_var].dropChance) {
                i_var++;
            }
            if (vars[i_var].name === `quiz`) {
                const item = quiz[Math.floor(Math.random() * quiz.length)];
                const filter = response => {
                    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
                };

                message.channel.send({
                    content: `**ВИКТОРИНА ОТ ГИЛЬДИИ**
Награда: 10<:Rumbik:883638847056003072>       @here

❔ Вопрос: **${item.question}**`, fetchReply: true
                })
                    .then(() => {
                        message.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] })
                            .then(async (collected) => {
                                const userData = await User.findOne({ userid: collected.first().author.id }) || new User({ userid: collected.first().author.id, name: collected.first().author.username })
                                userData.rumbik += 10
                                userData.save()
                                message.reply(`${collected.first().author} ответил правильно!`);
                                message.react(`✅`)
                            })
                            .catch(collected => {
                                message.reply(`К сожалению, никто не ответил вовремя :( 
Правильный ответ: **${item.answers}**`);
                            });
                    });
            }

            else if (vars[i_var].name === `math`) {
                let x = Math.floor(Math.random() * 1000) + 999
                let y = Math.floor(Math.random() * 1000)
                let symb = [`+`, `-`]
                let r_symb = symb[Math.floor(Math.random() * symb.length)]

                if (r_symb === `+`) {
                    const answer = x + y;
                    const filter = response => {
                        return answer.toLowerCase() === response.content.toLowerCase();
                    };

                    message.channel.send({
                        content: `:black_medium_small_square:

Начинается урок математики с **НАГРАДАМИ**!    @here
:1234: **РЕШИТЕ ПРИМЕР**    ${x} + ${y}
 
Кто первый решит этот пример, получит 10<:Rumbik:883638847056003072>

:black_medium_small_square:`,
                        fetchReply: true
                    })
                        .then(() => {
                            message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
                                .then(async (collected) => {
                                    const userData = await User.findOne({ userid: collected.first().author.id }) || new User({ userid: collected.first().author.id, name: collected.first().author.username })
                                    userData.rumbik += 10
                                    userData.save()
                                    message.reply(`${collected.first().author} ответил правильно!`);
                                    message.react(`✅`)
                                })
                                .catch(collected => {
                                    message.reply(`К сожалению, никто не ответил вовремя :( 
Правильный ответ: **${answer}**`);
                                });
                        });
                } else if (r_symb === `-`) {
                    const answer = x - y;
                    const filter = response => {
                        return answer.some(answer => answer.toLowerCase() === response.content.toLowerCase());
                    };

                    message.channel.send({
                        content: `:black_medium_small_square:

Начинается урок математики с **НАГРАДАМИ**! 
:1234: **РЕШИТЕ ПРИМЕР**    ${x} - ${y}
 
Кто первый решит этот пример, получит 10<:Rumbik:883638847056003072>

:black_medium_small_square:`,
                        fetchReply: true
                    })
                        .then(() => {
                            message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
                                .then(async (collected) => {
                                    const userData = await User.findOne({ userid: collected.first().author.id }) || new User({ userid: collected.first().author.id, name: collected.first().author.username })
                                    userData.rumbik += 10
                                    userData.save()
                                    message.reply(`${collected.first().author} ответил правильно!`);
                                    message.react(`✅`)
                                })
                                .catch(collected => {
                                    message.reply(`К сожалению, никто не ответил вовремя :( 
Правильный ответ: **${answer}**`);
                                });
                        });
                }
            }

            else if (vars[i_var].name === `question`) {
                const item = questions[Math.floor(Math.random() * questions.length)];


                message.channel.send({
                    content: `**ВОПРОС ОТ ГИЛЬДИИ**
${item.question}`
                })
            }

            else if (vars[i_var].name === `none`) return

            setTimeout(() => {

            }, 10000);
        }

    }
}