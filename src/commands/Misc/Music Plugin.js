const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, WebhookClient, PermissionsBitField, PermissionFlagsBits, ComponentType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const { loadImage, createCanvas } = require(`@napi-rs/canvas`)
const chalk = require(`chalk`);
const ch_list = require(`../../discord structure/channels.json`)
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ
const { gameConstructor, calcActLevel, getLevel, isURL, secondPage } = require(`../../functions`);
const { SearchResultType, DisTubeVoice, Song, Playlist } = require('distube');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`music`)
        .setDescription(`Музыкальный бот`)
        .setDMPermission(false)
        .addSubcommand(subcommand => subcommand
            .setName(`play`)
            .setDescription(`Включить музыку`)
            .addStringOption(option => option
                .setName(`запрос`)
                .setDescription(`Введите запрос, чтобы включить музыку`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`queue`)
            .setDescription(`Показать очередь`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`nowplaying`)
            .setDescription(`Показать текущую песню`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`volume`)
            .setDescription(`Изменить звук проигрывателя`)
            .addIntegerOption(option => option
                .setName(`число`)
                .setDescription(`Введите число, чтобы установить звук проигрывателя`)
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(0)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`skip`)
            .setDescription(`Пропустить текущую песню`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`previous`)
            .setDescription(`Включить предыдущую песню`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`join`)
            .setDescription(`Присоединиться к голосовому каналу`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`leave`)
            .setDescription(`Покинуть голосовой канал`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`pause`)
            .setDescription(`Приостановить проигрыватель`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`resume`)
            .setDescription(`Возобновить проигрыватель`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`stop`)
            .setDescription(`Остановить проигрыватель`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`shuffle`)
            .setDescription(`Перемешать песни`)
        )
        .addSubcommand(subcommand => subcommand
            .setName(`loop`)
            .setDescription(`Включить режим повтора`)
            .addStringOption(option => option
                .setName(`режим`)
                .setDescription(`Выберите режим повтора`)
                .addChoices(
                    {
                        name: `Отключить режим повтора`,
                        value: `0`
                    },
                    {
                        name: `Повтор текущей песни`,
                        value: `1`
                    },
                    {
                        name: `Повтор всей очереди`,
                        value: `2`
                    }

                )
                .setRequired(true)
            )
        ),

    async execute(interaction, client) {
        const guild = interaction.guild
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.music === false) return interaction.reply({ content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true })
        const guildData = await Guild.findOne({ id: guild.id })
        const music_channel = await guild.channels.fetch(ch_list.music)
        const user = interaction.user
        const member = interaction.member
        if (guildData.guildgames.started == true && !member.roles.cache.has(`523559726219526184`) && !member.roles.cache.has(`563793535250464809`) && !member.roles.cache.has(`320880176416161802`)) return interaction.reply({
            content: `Вы не можете использовать музыкального бота, пока в гильдии проходит совместная игра!`,
            ephemeral: true
        })
        if (interaction.channel.id !== music_channel.id && !interaction.member.roles.cache.has(`320880176416161802`)) return interaction.reply({
            content: `Чтобы использовать музыкального бота, перейдите в канал ${music_channel}!`,
            ephemeral: true
        })
        if (!member.voice) return interaction.reply({
            content: `Вы должны быть в голосовом канале, чтобы использовать музыкального бота!`,
            ephemeral: true
        })

        switch (interaction.options.getSubcommand()) {
            case `play`: {

                try {
                    const message = interaction.options.getString(`запрос`)
                    const url = isURL(message)
                    if (url === true) {
                        let received
                        received = new EmbedBuilder()
                            .setTitle(`Запрос получен...`)
                            .setColor(process.env.bot_color)
                            .setDescription(`🔍 Загружаем ваш запрос: \`${message}\`...`)
                            .setTimestamp(Date.now())


                        await interaction.reply({
                            embeds: [received],
                            fetchReply: true
                        })

                        const connection = await client.distube.voices.join(member.voice.channel).then(async (connection) => {
                            await connection.setSelfDeaf(false)
                            await connection.setSelfMute(false)
                        })

                        client.distube.play(member.voice.channel, message, {
                            member: member,
                            textChannel: interaction.channel
                        })
                        await interaction.deleteReply()

                    } else if (url === false) {

                        const searchR = await client.distube.search(message, {
                            limit: 5,
                            type: SearchResultType.VIDEO
                        })
                        let i = 1
                        const search = searchR.map(result => {
                            return `**${i++}.** ${result.name} - ${result.formattedDuration} \`(${result.views} просмотров)\``

                        })

                        const results = new EmbedBuilder()
                            .setTitle(`🔍 Результаты поиска...`)
                            .setColor(process.env.bot_color)
                            .setDescription(`${search.join(`\n`)}`)
                            .setTimestamp(Date.now())

                        const choices = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`song1`)
                                    .setEmoji(`1️⃣`)
                                    .setLabel(`Песня 1`)
                                    .setStyle(ButtonStyle.Primary)
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`song2`)
                                    .setEmoji(`2️⃣`)
                                    .setLabel(`Песня 2`)
                                    .setStyle(ButtonStyle.Primary)
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`song3`)
                                    .setEmoji(`3️⃣`)
                                    .setLabel(`Песня 3`)
                                    .setStyle(ButtonStyle.Primary)
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`song4`)
                                    .setEmoji(`4️⃣`)
                                    .setLabel(`Песня 4`)
                                    .setStyle(ButtonStyle.Primary)
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`song5`)
                                    .setEmoji(`5️⃣`)
                                    .setLabel(`Песня 5`)
                                    .setStyle(ButtonStyle.Primary)
                            )


                        const msg = await interaction.reply({
                            embeds: [results],
                            components: [choices],
                            fetchReply: true
                        })

                        msg.awaitMessageComponent({ componentType: ComponentType.Button, time: 60000 })
                            .then(async (i) => {
                                let playSong
                                if (i.customId == `song1`) {
                                    playSong = searchR[0].url
                                } else if (i.customId == `song2`) {
                                    playSong = searchR[1].url
                                } else if (i.customId == `song3`) {
                                    playSong = searchR[2].url
                                } else if (i.customId == `song4`) {
                                    playSong = searchR[3].url
                                } else if (i.customId == `song5`) {
                                    playSong = searchR[4].url
                                }

                                const connection = await client.distube.voices.join(member.voice.channel).then(async (connection) => {
                                    await connection.setSelfDeaf(false)
                                    await connection.setSelfMute(false)
                                })
                                client.distube.play(member.voice.channel, playSong, {
                                    member: member,
                                    textChannel: interaction.channel
                                })




                                const received = new EmbedBuilder()
                                    .setTitle(`Запрос получен...`)
                                    .setColor(process.env.bot_color)
                                    .setDescription(`🔍 Загружаем песню \`${playSong}\`...`)
                                    .setTimestamp(Date.now())

                                await i.channel.send({
                                    embeds: [received]
                                })
                                await interaction.deleteReply()
                            })
                            .catch(async (error) => {
                                console.log(error)
                                const err = new EmbedBuilder()
                                    .setTitle(`❌ Время выбора песни истекло!`)
                                    .setDescription(`Время выбора песни истекло! Чтобы выбрать песню, пропишите команду \`/music play\` и выберите один из 5 предложенных результатов!`)
                                    .setColor(process.env.bot_color)
                                    .setTimestamp(Date.now())

                                await choices.components[0].setDisabled(true)
                                await choices.components[1].setDisabled(true)
                                await choices.components[2].setDisabled(true)
                                await choices.components[3].setDisabled(true)
                                await choices.components[4].setDisabled(true)

                                await interaction.editReply({
                                    embeds: [err],
                                    components: [choices]
                                })
                            })
                    }
                } catch (e) {
                    await interaction.reply({
                        content: `Произошла ошибка при загрузке данной песни...`,
                        ephemeral: true
                    })
                    console.log(e)
                }

            }
                break;
            case `queue`: {
                const no_queue = new EmbedBuilder()
                    .setTitle(`❗ Нет песен в очереди!`)
                    .setDescription(`В очереди нет песен! Используйте \`/music play\`, чтобы добавить песню в очередь!`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                const queue = client.distube.getQueue(guild)
                if (!queue) return interaction.reply({
                    embeds: [no_queue]
                })
                let n = 0
                let listS = queue.songs.map((song, id) => {
                    if (queue.songs[0] == song) {
                        return `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\` **СЕЙЧАС ИГРАЕТ**`
                    } else {
                        return `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
                    }
                })
                let list = listS.slice(0 + (n * 10), 10 + (n * 10))

                const totalPages = Math.ceil(queue.songs.length / 10)

                const queueList = new EmbedBuilder()
                    .setTitle(`Очередь песен`)
                    .setDescription(`${list.join(`\n`)}`)
                    .setTimestamp(Date.now())
                    .setColor(process.env.bot_color)
                    .setThumbnail(guild.iconURL())
                    .setFooter({
                        text: `Страница ${n + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                    })

                const pages = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`first`)
                            .setEmoji(`⏪`)
                            .setStyle(ButtonStyle.Danger)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`prev`)
                            .setEmoji(`⬅`)
                            .setStyle(ButtonStyle.Danger)
                            .setDisabled(true)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`stop`)
                            .setEmoji(`⏹`)
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(false)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`next`)
                            .setEmoji(`➡`)
                            .setStyle(ButtonStyle.Success)
                            .setDisabled(secondPage(totalPages))
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`last`)
                            .setEmoji(`⏩`)
                            .setStyle(ButtonStyle.Success)
                            .setDisabled(secondPage(totalPages))
                    )

                let msg = await interaction.reply({
                    embeds: [queueList],
                    components: [pages],
                    fetchReply: true
                })

                const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 120000 })
                collector.on(`collect`, async (i) => {
                    if (i.user.id === user.id) {
                        if (i.customId == `first`) {
                            n = 0
                            list = listS.slice(0 + (n * 10), 10 + (n * 10))
                            queueList.setDescription(`${list.join(`\n`)}`).setFooter({
                                text: `Страница ${n + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                            })
                            pages.components[0].setDisabled(true)
                            pages.components[1].setDisabled(true)
                            pages.components[2].setDisabled(false)
                            pages.components[3].setDisabled(false)
                            pages.components[4].setDisabled(false)
                            await i.deferUpdate()
                            await interaction.editReply({
                                embeds: [queueList],
                                components: [pages],
                                fetchReply: true
                            })
                        } else if (i.customId == `prev`) {
                            n = n - 1
                            if (n <= 0) {
                                pages.components[0].setDisabled(true)
                                pages.components[1].setDisabled(true)
                            } else {
                                pages.components[0].setDisabled(false)
                                pages.components[1].setDisabled(false)
                            }
                            list = listS.slice(0 + (n * 10), 10 + (n * 10))
                            queueList.setDescription(`${list.join(`\n`)}`).setFooter({
                                text: `Страница ${n + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                            })
                            pages.components[2].setDisabled(false)
                            pages.components[3].setDisabled(false)
                            pages.components[4].setDisabled(false)
                            await i.deferUpdate()
                            await interaction.editReply({
                                embeds: [queueList],
                                components: [pages],
                                fetchReply: true
                            })
                        } else if (i.customId == `stop`) {
                            i.deferUpdate()
                            collector.stop()
                        } else if (i.customId == `next`) {
                            n = n + 1
                            if (n >= totalPages - 1) {
                                pages.components[3].setDisabled(true)
                                pages.components[4].setDisabled(true)
                            } else {
                                pages.components[3].setDisabled(false)
                                pages.components[4].setDisabled(false)
                            }
                            list = listS.slice(0 + (n * 10), 10 + (n * 10))
                            queueList.setDescription(`${list.join(`\n`)}`).setFooter({
                                text: `Страница ${n + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                            })
                            pages.components[0].setDisabled(false)
                            pages.components[1].setDisabled(false)
                            pages.components[2].setDisabled(false)
                            await i.deferUpdate()
                            await interaction.editReply({
                                embeds: [queueList],
                                components: [pages],
                                fetchReply: true
                            })
                        } else if (i.customId == `last`) {
                            n = totalPages - 1
                            list = listS.slice(0 + (n * 10), 10 + (n * 10))
                            queueList.setDescription(`${list.join(`\n`)}`).setFooter({
                                text: `Страница ${n + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                            })
                            pages.components[0].setDisabled(false)
                            pages.components[1].setDisabled(false)
                            pages.components[2].setDisabled(false)
                            pages.components[3].setDisabled(true)
                            pages.components[4].setDisabled(true)
                            await i.deferUpdate()
                            await interaction.editReply({
                                embeds: [queueList],
                                components: [pages],
                                fetchReply: true
                            })
                        }
                    } else {
                        b = n
                        let ephList = listS.slice(0 + (b * 10), 10 + (b * 10))
                        const queueListEph = new EmbedBuilder()
                            .setTitle(`Очередь песен`)
                            .setDescription(`${ephList.join(`\n`)}`)
                            .setTimestamp(Date.now())
                            .setColor(process.env.bot_color)
                            .setThumbnail(guild.iconURL())
                            .setFooter({
                                text: `Страница ${b + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                            })

                        const ephpages = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`firsteph`)
                                    .setEmoji(`⏪`)
                                    .setStyle(ButtonStyle.Danger)
                                    .setDisabled(true)
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`preveph`)
                                    .setEmoji(`⬅`)
                                    .setStyle(ButtonStyle.Danger)
                                    .setDisabled(true)
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`stopeph`)
                                    .setEmoji(`⏹`)
                                    .setStyle(ButtonStyle.Secondary)
                                    .setDisabled(false)
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`nexteph`)
                                    .setEmoji(`➡`)
                                    .setStyle(ButtonStyle.Success)
                                    .setDisabled(false)
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`lasteph`)
                                    .setEmoji(`⏩`)
                                    .setStyle(ButtonStyle.Success)
                                    .setDisabled(false)
                            )
                        if (i.customId == `first`) {

                            b = 0
                            ephList = listS.slice(0 + (b * 10), 10 + (b * 10))
                            queueListEph.setDescription(`${ephList.join(`\n`)}`).setFooter({
                                text: `Страница ${b + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                            })
                            ephpages.components[0].setDisabled(true)
                            ephpages.components[1].setDisabled(true)
                            ephpages.components[2].setDisabled(false)
                            ephpages.components[3].setDisabled(false)
                            ephpages.components[4].setDisabled(false)

                        } else if (i.customId == `prev`) {

                            b = b - 1
                            if (b <= 0) {
                                ephpages.components[0].setDisabled(true)
                                ephpages.components[1].setDisabled(true)
                            } else {
                                ephpages.components[0].setDisabled(false)
                                ephpages.components[1].setDisabled(false)
                            }
                            ephList = listS.slice(0 + (b * 10), 10 + (b * 10))
                            queueListEph.setDescription(`${ephList.join(`\n`)}`).setFooter({
                                text: `Страница ${b + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                            })
                            ephpages.components[2].setDisabled(false)
                            ephpages.components[3].setDisabled(false)
                            ephpages.components[4].setDisabled(false)

                        } else if (i.customId == `stop`) {

                            ephList = listS.slice(0 + (b * 10), 10 + (b * 10))
                            queueListEph.setDescription(`${ephList.join(`\n`)}`).setFooter({
                                text: `Страница ${b + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                            })
                            ephpages.components[0].setDisabled(true)
                            ephpages.components[1].setDisabled(true)
                            ephpages.components[2].setDisabled(true)
                            ephpages.components[3].setDisabled(true)
                            ephpages.components[4].setDisabled(true)

                        } else if (i.customId == `next`) {

                            b = b + 1
                            if (b >= totalPages - 1) {
                                ephpages.components[3].setDisabled(true)
                                ephpages.components[4].setDisabled(true)
                            } else {
                                ephpages.components[3].setDisabled(false)
                                ephpages.components[4].setDisabled(false)
                            }
                            ephList = listS.slice(0 + (b * 10), 10 + (b * 10))
                            queueListEph.setDescription(`${ephList.join(`\n`)}`).setFooter({
                                text: `Страница ${b + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                            })
                            ephpages.components[0].setDisabled(false)
                            ephpages.components[1].setDisabled(false)
                            ephpages.components[2].setDisabled(false)

                        } else if (i.customId == `last`) {

                            b = totalPages - 1
                            ephList = listS.slice(0 + (n * 10), 10 + (n * 10))
                            queueListEph.setDescription(`${ephList.join(`\n`)}`).setFooter({
                                text: `Страница ${b + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                            })
                            ephpages.components[0].setDisabled(false)
                            ephpages.components[1].setDisabled(false)
                            ephpages.components[2].setDisabled(false)
                            ephpages.components[3].setDisabled(true)
                            ephpages.components[4].setDisabled(true)

                        }
                        const ephReply = await i.deferReply({
                            ephemeral: true,
                            fetchReply: true
                        })
                        await i.editReply({
                            embeds: [queueListEph],
                            components: [ephpages],
                            fetchReply: true,
                        })

                        const ephCollector = ephReply.createMessageComponentCollector({ componentType: ComponentType.Button, time: 120000 })

                        ephCollector.on(`collect`, async (int) => {
                            if (int.customId == `firsteph`) {
                                b = 0
                                ephList = listS.slice(0 + (b * 10), 10 + (b * 10))
                                queueListEph.setDescription(`${ephList.join(`\n`)}`).setFooter({
                                    text: `Страница ${b + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                                })
                                ephpages.components[0].setDisabled(true)
                                ephpages.components[1].setDisabled(true)
                                ephpages.components[2].setDisabled(false)
                                ephpages.components[3].setDisabled(false)
                                ephpages.components[4].setDisabled(false)
                                await int.deferUpdate()
                                await i.editReply({
                                    embeds: [queueListEph],
                                    components: [ephpages],
                                    fetchReply: true
                                })
                            } else if (int.customId == `preveph`) {
                                b = b - 1
                                if (b <= 0) {
                                    ephpages.components[0].setDisabled(true)
                                    ephpages.components[1].setDisabled(true)
                                } else {
                                    ephpages.components[0].setDisabled(false)
                                    ephpages.components[1].setDisabled(false)
                                }
                                ephList = listS.slice(0 + (b * 10), 10 + (b * 10))
                                queueListEph.setDescription(`${ephList.join(`\n`)}`).setFooter({
                                    text: `Страница ${n + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                                })
                                ephpages.components[2].setDisabled(false)
                                ephpages.components[3].setDisabled(false)
                                ephpages.components[4].setDisabled(false)
                                await int.deferUpdate()
                                await i.editReply({
                                    embeds: [queueListEph],
                                    components: [ephpages],
                                    fetchReply: true
                                })
                            } else if (int.customId == `stopeph`) {
                                int.deferUpdate()
                                ephCollector.stop()
                            } else if (int.customId == `nexteph`) {
                                b = b + 1
                                if (b >= totalPages - 1) {
                                    ephpages.components[3].setDisabled(true)
                                    ephpages.components[4].setDisabled(true)
                                } else {
                                    ephpages.components[3].setDisabled(false)
                                    ephpages.components[4].setDisabled(false)
                                }
                                ephList = listS.slice(0 + (b * 10), 10 + (b * 10))
                                queueListEph.setDescription(`${ephList.join(`\n`)}`).setFooter({
                                    text: `Страница ${b + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                                })
                                ephpages.components[0].setDisabled(false)
                                ephpages.components[1].setDisabled(false)
                                ephpages.components[2].setDisabled(false)
                                await int.deferUpdate()
                                await i.editReply({
                                    embeds: [queueListEph],
                                    components: [ephpages],
                                    fetchReply: true
                                })
                            } else if (int.customId == `lasteph`) {
                                b = totalPages - 1
                                ephList = listS.slice(0 + (b * 10), 10 + (b * 10))
                                queueListEph.setDescription(`${ephList.join(`\n`)}`).setFooter({
                                    text: `Страница ${b + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                                })
                                ephpages.components[0].setDisabled(false)
                                ephpages.components[1].setDisabled(false)
                                ephpages.components[2].setDisabled(false)
                                ephpages.components[3].setDisabled(true)
                                ephpages.components[4].setDisabled(true)
                                await int.deferUpdate()
                                await i.editReply({
                                    embeds: [queueListEph],
                                    components: [ephpages],
                                    fetchReply: true
                                })
                            }
                        })
                        ephCollector.on(`end`, async (coll) => {
                            b = b
                            ephList = listS.slice(0 + (b * 10), 10 + (b * 10))
                            queueListEph.setDescription(`${ephList.join(`\n`)}`).setFooter({
                                text: `Страница ${b + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                            })
                            ephpages.components[0].setDisabled(true)
                            ephpages.components[1].setDisabled(true)
                            ephpages.components[2].setDisabled(true)
                            ephpages.components[3].setDisabled(true)
                            ephpages.components[4].setDisabled(true)
                            await i.editReply({
                                embeds: [queueListEph],
                                components: [ephpages]
                            })
                        })

                    }

                })
                collector.on(`end`, async (collected) => {
                    n = n
                    list = listS.slice(0 + (n * 10), 10 + (n * 10))
                    queueList.setDescription(`${list.join(`\n`)}`).setFooter({
                        text: `Страница ${n + 1}/${totalPages} - ${queue.songs.length} треков в очереди`
                    })
                    pages.components[0].setDisabled(true)
                    pages.components[1].setDisabled(true)
                    pages.components[2].setDisabled(true)
                    pages.components[3].setDisabled(true)
                    pages.components[4].setDisabled(true)
                    await interaction.editReply({
                        embeds: [queueList],
                        components: [pages]
                    })
                })
            }
                break;
            case `nowplaying`: {
                const no_queue = new EmbedBuilder()
                    .setTitle(`❗ Нет песен в очереди!`)
                    .setDescription(`В очереди нет песен! Используйте \`/music play\`, чтобы добавить песню в очередь!`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                const queue = client.distube.getQueue(guild)
                if (!queue) return interaction.reply({
                    embeds: [no_queue]
                })

                let song = queue.songs[0]
                const playing = new EmbedBuilder()
                    .setColor(process.env.bot_color)
                    .setTitle(`Сейчас играет... 🎶`)
                    .setTimestamp(Date.now())
                    .setDescription(`**Название**: \`${song.name}\`
**Запросил**: ${song.user}
**Длительность**: \`${queue.formattedCurrentTime}\`/\`${song.formattedDuration}\`

**Лайков**: ${song.likes}👍
**Дизлайков**: ${song.dislikes}👎

[Нажмите здесь, чтобы получить ссылку](${song.url})`)

                const prevnext = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`prevsong`)
                            .setLabel(`Предыдущая песня`)
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji(`⏮`)
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`nextsong`)
                            .setLabel(`Следующая песня`)
                            .setStyle(ButtonStyle.Success)
                            .setEmoji(`⏭`)
                    )

                const msg = await interaction.reply({
                    embeds: [playing],
                    components: [prevnext],
                    fetchReply: true
                })

                const filter = (i) => i.user.id === interaction.user.id

                const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 30000 })
                let songR = queue.song[0]
                collector.on('collect', async (i) => {

                    await i.deferReply({
                        fetchReply: true
                    })
                    if (i.customId == `prevsong`) {
                        try {
                            songR = await queue.previous()
                            const result = new EmbedBuilder()
                                .setTitle(`Переключено на предыдущую песню... ✅`)
                                .setColor(process.env.bot_color)
                                .setTimestamp(Date.now())
                                .setDescription(`Вы снова включили \`${songR.name}\`!`)

                            await i.editReply({
                                embeds: [result]
                            })
                        } catch (e) {
                            await i.editReply({
                                content: `Вы уже включили самую первую песню в очереди!`
                            })
                            console.log(e)
                        }

                        collector.stop()
                    } else if (i.customId == `nextsong`) {
                        try {
                            const result = new EmbedBuilder()
                                .setTitle(`Песня пропущена... ✅`)
                                .setColor(process.env.bot_color)
                                .setTimestamp(Date.now())
                                .setDescription(`Текущая песня \`${queue.songs[0].name}\` была пропущена!`)
                            songR = await queue.skip()

                            await i.editReply({
                                embeds: [result]
                            })
                        } catch (e) {
                            await i.editReply({
                                content: `В очереди больше нет песен для пропуска!`
                            })
                            console.log(e)
                        }
                        collector.stop()
                    }
                })
                collector.on('end', async (collected) => {
                    prevnext.components[0].setDisabled(true)
                    prevnext.components[1].setDisabled(true)
                    playing.setDescription(`**Название**: \`${songR.name}\`
**Запросил**: ${songR.user}
**Длительность**: \`${queue.formattedCurrentTime}\`/\`${songR.formattedDuration}\`

**Лайков**: ${songR.likes}👍
**Дизлайков**: ${songR.dislikes}👎

[Нажмите здесь, чтобы получить ссылку](${songR.url})`)
                    await interaction.editReply({
                        embeds: [playing],
                        components: [prevnext]
                    })
                })

            }
                break;
            case `volume`: {
                const no_queue = new EmbedBuilder()
                    .setTitle(`❗ Нет песен в очереди!`)
                    .setDescription(`В очереди нет песен! Используйте \`/music play\`, чтобы добавить песню в очередь!`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                const queue = client.distube.getQueue(guild)
                if (!queue) return interaction.reply({
                    embeds: [no_queue]
                })

                const volume = interaction.options.getInteger(`число`)
                if (volume < 0 || volume > 100) return interaction.reply({
                    content: `Вы можете устанавливать звук в диапазоне от 0 до 100!`,
                    ephemeral: true
                })

                queue.setVolume(volume)
                const result = new EmbedBuilder()
                    .setTitle(`Громкость звука установлена... 🔊`)
                    .setColor(process.env.bot_color)
                    .setTimestamp(Date.now())
                    .setDescription(`Громкость проигрывателя была установлена на \`${volume}\`!`)

                await interaction.reply({
                    embeds: [result]
                })
            }
                break;
            case `skip`: {
                const no_queue = new EmbedBuilder()
                    .setTitle(`❗ Нет песен в очереди!`)
                    .setDescription(`В очереди нет песен! Используйте \`/music play\`, чтобы добавить песню в очередь!`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                const queue = client.distube.getQueue(guild)
                if (!queue) return interaction.reply({
                    embeds: [no_queue]
                })
                try {
                    const result = new EmbedBuilder()
                        .setTitle(`Песня пропущена... ✅`)
                        .setColor(process.env.bot_color)
                        .setTimestamp(Date.now())
                        .setDescription(`Текущая песня \`${queue.songs[0].name}\` была пропущена!`)
                    queue.skip()

                    await interaction.reply({
                        embeds: [result]
                    })
                } catch (e) {
                    await interaction.reply({
                        content: `В очереди больше нет песен для пропуска!`
                    })
                    console.log(e)
                }

            }
                break;
            case `previous`: {


                const no_queue = new EmbedBuilder()
                    .setTitle(`❗ Нет песен в очереди!`)
                    .setDescription(`В очереди нет песен! Используйте \`/music play\`, чтобы добавить песню в очередь!`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                const queue = client.distube.getQueue(guild)
                if (!queue) return interaction.reply({
                    embeds: [no_queue]
                })
                try {
                    const song = await queue.previous()
                    const result = new EmbedBuilder()
                        .setTitle(`Переключено на предыдущую песню... ✅`)
                        .setColor(process.env.bot_color)
                        .setTimestamp(Date.now())
                        .setDescription(`Вы снова включили \`${song.name}\`!`)

                    await interaction.reply({
                        embeds: [result]
                    })
                } catch (e) {
                    await interaction.reply({
                        content: `Вы уже включили самую первую песню в очереди!`
                    })
                    console.log(e)
                }

            }
                break;
            case `join`: {
                let voiceChannel = interaction.member.voice.channel

                client.distube.voices.join(voiceChannel).then(async (connection) => {
                    await connection.setSelfDeaf(false)
                    await connection.setSelfMute(false)
                })
                const result = new EmbedBuilder()
                    .setTitle(`Я присоединился 👋`)
                    .setColor(process.env.bot_color)
                    .setTimestamp(Date.now())
                    .setDescription(`Я присоединился к вашему голосовому каналу! Чтобы включить музыку, используйте команду \`/music play\`!`)

                await interaction.reply({
                    embeds: [result]
                })
            }
                break;
            case `leave`: {
                client.distube.voices.leave(guild)
                await interaction.deferReply({
                    fetchReply: true
                })
                await interaction.deleteReply()
            }
                break;
            case `pause`: {
                const no_queue = new EmbedBuilder()
                    .setTitle(`❗ Нет песен в очереди!`)
                    .setDescription(`В очереди нет песен! Используйте \`/music play\`, чтобы добавить песню в очередь!`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                const queue = client.distube.getQueue(guild)
                if (!queue) return interaction.reply({
                    embeds: [no_queue]
                })

                if (queue.paused) {
                    queue.resume()
                    const result = new EmbedBuilder()
                        .setTitle(`Воспроизведение восстановлено ⏸`)
                        .setColor(process.env.bot_color)
                        .setTimestamp(Date.now())
                        .setDescription(`Так как воспроизведение уже было приостановлено, мы возобновили его! Если хотите поставить воспроизведение на паузу, пропишите эту команду ещё раз.`)
                    return interaction.reply({
                        embeds: [result]
                    })
                }
                const result = new EmbedBuilder()
                    .setTitle(`Воспроизведение приостановлено ▶`)
                    .setColor(process.env.bot_color)
                    .setTimestamp(Date.now())
                    .setDescription(`Воспроизведение музыки было приостановлено! Чтобы восстановить воспроизведение, пропишите \`/music resume\`!`)
                queue.pause()
                await interaction.reply({
                    embeds: [result]
                })

            }
                break;
            case `resume`: {
                const no_queue = new EmbedBuilder()
                    .setTitle(`❗ Нет песен в очереди!`)
                    .setDescription(`В очереди нет песен! Используйте \`/music play\`, чтобы добавить песню в очередь!`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                const queue = client.distube.getQueue(guild)
                if (!queue) return interaction.reply({
                    embeds: [no_queue]
                })

                if (queue.paused) {
                    queue.resume()
                    const result = new EmbedBuilder()
                        .setTitle(`Воспроизведение восстановлено ⏸`)
                        .setColor(process.env.bot_color)
                        .setTimestamp(Date.now())
                        .setDescription(`Воспроизведение музыки было восстановлено! Чтобы приостановить воспроизведение, пропишите \`/music pause\`!`)
                    return interaction.reply({
                        embeds: [result]
                    })
                } else if (queue.playing) {
                    const result = new EmbedBuilder()
                        .setTitle(`Воспроизведение приостановлено ▶`)
                        .setColor(process.env.bot_color)
                        .setTimestamp(Date.now())
                        .setDescription(`Так как воспроизведение уже было восстановлено, мы приостановили его! Если хотите восстановить воспроизведение, пропишите эту команду ещё раз.`)
                    queue.pause()
                    return interaction.reply({
                        embeds: [result]
                    })
                }

            }
                break;
            case `stop`: {
                const no_queue = new EmbedBuilder()
                    .setTitle(`❗ Нет песен в очереди!`)
                    .setDescription(`В очереди нет песен! Используйте \`/music play\`, чтобы добавить песню в очередь!`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                const queue = client.distube.getQueue(guild)
                if (!queue) return interaction.reply({
                    embeds: [no_queue]
                })
                await queue.stop()
                const result = new EmbedBuilder()
                    .setTitle(`Воспроизведение остановлено ▶`)
                    .setColor(process.env.bot_color)
                    .setTimestamp(Date.now())
                    .setDescription(`Воспроизведение песен было полностью остановлено! Очередь была очищена! Если вы хотите включить музыку, используйте \`/music play\`.`)

                await interaction.reply({
                    embeds: [result]
                })
            }
                break;
            case `shuffle`: {
                const no_queue = new EmbedBuilder()
                    .setTitle(`❗ Нет песен в очереди!`)
                    .setDescription(`В очереди нет песен! Используйте \`/music play\`, чтобы добавить песню в очередь!`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                const queue = client.distube.getQueue(guild)
                if (!queue) return interaction.reply({
                    embeds: [no_queue]
                })

                await queue.shuffle()
                const result = new EmbedBuilder()
                    .setTitle(`Очередь перемешана 🔀`)
                    .setColor(process.env.bot_color)
                    .setTimestamp(Date.now())
                    .setDescription(`Очередь была успешно перемешана!`)

                await interaction.reply({
                    embeds: [result]
                })
            }
                break;
            case `loop`: {
                const no_queue = new EmbedBuilder()
                    .setTitle(`❗ Нет песен в очереди!`)
                    .setDescription(`В очереди нет песен! Используйте \`/music play\`, чтобы добавить песню в очередь!`)
                    .setColor(`DarkRed`)
                    .setTimestamp(Date.now())
                    .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                const queue = client.distube.getQueue(guild)
                if (!queue) return interaction.reply({
                    embeds: [no_queue]
                })
                let mode
                let value = Number(interaction.options.getString(`режим`))
                switch (value) {
                    case 0: {
                        mode = `Отключить режим повтора`
                    }
                        break;
                    case 1: {
                        mode = `Повтор текущей песни`
                    }
                        break;
                    case 2: {
                        mode = `Повтор всей очереди`
                    }
                        break;

                    default:
                        break;
                }
                const setQueue = new EmbedBuilder()
                    .setTitle(`Установлен режим повтора`)
                    .setDescription(`Режим повтора установлен на \`${mode}\``)
                    .setColor(process.env.bot_color)
                    .setTimestamp(Date.now())
                await client.distube.setRepeatMode(guild, value)
                await interaction.reply({
                    embeds: [setQueue]
                })
            }
                break;

            default:
                break;
        }
    }
};