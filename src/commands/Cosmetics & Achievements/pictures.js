const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const { User } = require(`../../schemas/userdata`);
const chalk = require(`chalk`);
const linksInfo = require(`../../discord structure/links.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`picture`)
        .setDescription(`Отправить картинку в чат`)
        .setDMPermission(false)
        .addStringOption(option => option
            .setName(`картинка`)
            .setDescription(`Выберите картинку, которую хотите отправить в чат`)
            .setAutocomplete(true)
            .setRequired(true)
        )
        .addUserOption(option => option
            .setName(`пользователь`)
            .setDescription(`Выберите пользователя, к кому хотите применить картинку`)
            .setRequired(false)
        ),
    async autoComplete(interaction, client) {
        const focusedValue = interaction.options.getFocused();
        const choices = [
            'cake',
            'like',
            'ban',
            'heart',
            'miracle',
            'snowman',
            'sova',
            'ghost',
            'dragon',
        ];
        const filtered = choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase()));;
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },

    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.cosmetics === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        switch (interaction.options.getString(`картинка`)) {
            case `cake`: {
                const role = `850079153746346044`;
                if (!interaction.member.roles.cache.has(role)) {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `❗ Отсутствует необходимая роль!`
                        })
                        .setDescription(`У вас нет картинки \`${interaction.guild.roles.cache.get(role).name}\`!`)
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())

                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })

                } else {
                    if (!interaction.options.getUser(`пользователь`)) {
                        interaction.reply(
`\`░░░░░░░░░░░░░▄▄░░░░░░░░░░░
░░░░░░░░░░░░▄██▄░░░░░░░░░░
░░░░░░░░░░░██▀░██░░░░░░░░░
░░░░░░░░░░░██░░█▀░░░░░░░░░
░░░░░░░░░░░░▀░░░░░░░░░░░░░
░░░░░░░░░░░▄▄▄▄▄▄█░░░░░░░░
░░░░░░░░▄████████▀░░░░░░░░
░░░░░░░░█████████░░░░░░░░░
░░░░░░░░░████████░░░░░░░░░
░░░░░░░░░████████░░░░░░░░░
░░░░░░░░░████████░░░░░░░░░
░░▄▄▄█████████████████▄▄░░
░████████████████████████▄
░░░▀███▀░░▀█████▀░░▀████▀░
▀▄▄░░▀░░▄▄▄░███░▄▄▄░░░░░░▄
░███▄▄▄████▄░▀░▄████▄▄▄▄█▀
░▀███████████▄███████████░
░░▀█████████████████████▀░
░░░█████████████████████░░
░░░█████████████████████░░\`
Тортик от ${interaction.member}`)
                    } else {
                        interaction.reply(
`\`░░░░░░░░░░░░░▄▄░░░░░░░░░░░
░░░░░░░░░░░░▄██▄░░░░░░░░░░
░░░░░░░░░░░██▀░██░░░░░░░░░
░░░░░░░░░░░██░░█▀░░░░░░░░░
░░░░░░░░░░░░▀░░░░░░░░░░░░░
░░░░░░░░░░░▄▄▄▄▄▄█░░░░░░░░
░░░░░░░░▄████████▀░░░░░░░░
░░░░░░░░█████████░░░░░░░░░
░░░░░░░░░████████░░░░░░░░░
░░░░░░░░░████████░░░░░░░░░
░░░░░░░░░████████░░░░░░░░░
░░▄▄▄█████████████████▄▄░░
░████████████████████████▄
░░░▀███▀░░▀█████▀░░▀████▀░
▀▄▄░░▀░░▄▄▄░███░▄▄▄░░░░░░▄
░███▄▄▄████▄░▀░▄████▄▄▄▄█▀
░▀███████████▄███████████░
░░▀█████████████████████▀░
░░░█████████████████████░░
░░░█████████████████████░░\`
Тортик от ${interaction.member} для ${interaction.options.getUser(`пользователь`)}`)
                    }
                }
            };
                break;
            case `like`: {
                const role = `850079142413598720`;
                if (!interaction.member.roles.cache.has(role)) {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `❗ Отсутствует необходимая роль!`
                        })
                        .setDescription(`У вас нет картинки \`${interaction.guild.roles.cache.get(role).name}\`!`)
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())

                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })

                } else {
                    if (!interaction.options.getUser(`пользователь`)) {
                        interaction.reply(
`\`___¶¶¶¶¶___¶¶¶¶¶________¶¶¶¶¶___¶¶¶¶¶__
__¶¶¶¶¶¶¶_¶¶¶¶¶¶¶______¶¶¶¶¶¶¶_¶¶¶¶¶¶¶_
_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶____¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
__¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶______¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_
____¶¶¶¶¶¶¶¶¶¶¶__________¶¶¶¶¶¶¶¶¶¶¶___
_______¶¶¶¶¶________________¶¶¶¶¶______
_______________________________________
_______________________________________
_______________________________________
__¶¶¶¶¶¶¶_____________________¶¶¶¶¶¶¶__
___¶¶¶¶¶¶¶¶¶¶_____________¶¶¶¶¶¶¶¶¶¶___
______¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_____
___________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶___¶¶¶_____
___________________¶¶¶___¶¶____¶¶¶
___________________¶¶¶___¶¶____¶¶¶
____________________¶¶¶_______¶¶¶
_____________________¶¶¶¶¶¶¶¶¶¶\`
                        
${interaction.member} что-то приглядел...`)
                    } else {
                        interaction.reply(
`\`___¶¶¶¶¶___¶¶¶¶¶________¶¶¶¶¶___¶¶¶¶¶__
__¶¶¶¶¶¶¶_¶¶¶¶¶¶¶______¶¶¶¶¶¶¶_¶¶¶¶¶¶¶_
_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶____¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
__¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶______¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_
____¶¶¶¶¶¶¶¶¶¶¶__________¶¶¶¶¶¶¶¶¶¶¶___
_______¶¶¶¶¶________________¶¶¶¶¶______
_______________________________________
_______________________________________
_______________________________________
__¶¶¶¶¶¶¶_____________________¶¶¶¶¶¶¶__
___¶¶¶¶¶¶¶¶¶¶_____________¶¶¶¶¶¶¶¶¶¶___
______¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_____
___________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶___¶¶¶_____
___________________¶¶¶___¶¶____¶¶¶
___________________¶¶¶___¶¶____¶¶¶
____________________¶¶¶_______¶¶¶
_____________________¶¶¶¶¶¶¶¶¶¶\`
                        
${interaction.member} приглядел ${interaction.options.getUser(`пользователь`)}`)
                    }
                }
            };
                break;

            case `heart`: {
                const role = `642810535737425930`;
                if (!interaction.member.roles.cache.has(role)) {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `❗ Отсутствует необходимая роль!`
                        })
                        .setDescription(`У вас нет картинки \`${interaction.guild.roles.cache.get(role).name}\`!`)
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())

                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })

                } else {
                    if (!interaction.options.getUser(`пользователь`)) {
                        interaction.reply(
`\`_░▒███████
░██▓▒░░▒▓██
██▓▒░__░▒▓██___██████
██▓▒░____░▓███▓__░▒▓██
██▓▒░___░▓██▓_____░▒▓██
██▓▒░_______________░▒▓██
_██▓▒░______________░▒▓██
__██▓▒░____________░▒▓██
___██▓▒░__________░▒▓██
____██▓▒░________░▒▓██
_____██▓▒░_____░▒▓██
______██▓▒░__░▒▓██
_______█▓▒░░▒▓██
_________░▒▓██
_______░▒▓██
_____░▒▓██\`

Сердечко от ${interaction.member}`)
                    } else {
                        interaction.reply(
`\`_░▒███████
░██▓▒░░▒▓██
██▓▒░__░▒▓██___██████
██▓▒░____░▓███▓__░▒▓██
██▓▒░___░▓██▓_____░▒▓██
██▓▒░_______________░▒▓██
_██▓▒░______________░▒▓██
__██▓▒░____________░▒▓██
___██▓▒░__________░▒▓██
____██▓▒░________░▒▓██
_____██▓▒░_____░▒▓██
______██▓▒░__░▒▓██
_______█▓▒░░▒▓██
_________░▒▓██
_______░▒▓██
_____░▒▓██\`

Сердечко от ${interaction.member} для ${interaction.options.getUser(`пользователь`)}`)
                    }
                }
            };
                break;

            case `miracle`: {
                const role = `642810538518118430`;
                if (!interaction.member.roles.cache.has(role)) {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `❗ Отсутствует необходимая роль!`
                        })
                        .setDescription(`У вас нет картинки \`${interaction.guild.roles.cache.get(role).name}\`!`)
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())

                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })

                } else {
                    if (!interaction.options.getUser(`пользователь`)) {
                        interaction.reply(
`\`░░░░░░░░░░░░░░░░░░░░░░░░░░█▄
░▄▄▄▄▄▄░░░░░░░░░░░░░▄▄▄▄▄░░█▄
░▀▀▀▀▀███▄░░░░░░░▄███▀▀▀▀░░░█▄
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
░▄▀▀▀▀▀▄░░░░░░░░░░▄▀▀▀▀▀▄░░░░█
█▄████▄░▀▄░░░░░░▄█░▄████▄▀▄░░█▄
████▀▀██░▀▄░░░░▄▀▄██▀█▄▄█░█▄░░█
██▀██████░█░░░░█░████▀█▀██░█░░█
████▀▄▀█▀░█░░░░█░█████▄██▀▄▀░░█
███████▀░█░░░░░░█░█████▀░▄▀░░░█
░▀▄▄▄▄▄▀▀░░░░░░░░▀▀▄▄▄▄▀▀░░░░░█
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
░░▓▓▓▓▓▓▓░░░░░░░░░░▓▓▓▓▓▓▓░░░░█
░░░▓▓▓▓▓░░░░░░░░░░░░▓▓▓▓▓░░░░░█
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█▀
░░░░░░░░░▄▄███████▄▄░░░░░░░░░█
░░░░░░░░█████████████░░░░░░░█▀
░░░░░░░░░▀█████████▀░░░░░░░█▀
░░░░░░░░░░░░░░░░░░░░░░░░░░█▀
░░░░░░░░░░░░░░░░░░░░░░░░░█▀\`
${interaction.member} видит чудо...`)
                    } else {
                        interaction.reply(
`\`░░░░░░░░░░░░░░░░░░░░░░░░░░█▄
░▄▄▄▄▄▄░░░░░░░░░░░░░▄▄▄▄▄░░█▄
░▀▀▀▀▀███▄░░░░░░░▄███▀▀▀▀░░░█▄
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
░▄▀▀▀▀▀▄░░░░░░░░░░▄▀▀▀▀▀▄░░░░█
█▄████▄░▀▄░░░░░░▄█░▄████▄▀▄░░█▄
████▀▀██░▀▄░░░░▄▀▄██▀█▄▄█░█▄░░█
██▀██████░█░░░░█░████▀█▀██░█░░█
████▀▄▀█▀░█░░░░█░█████▄██▀▄▀░░█
███████▀░█░░░░░░█░█████▀░▄▀░░░█
░▀▄▄▄▄▄▀▀░░░░░░░░▀▀▄▄▄▄▀▀░░░░░█
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
░░▓▓▓▓▓▓▓░░░░░░░░░░▓▓▓▓▓▓▓░░░░█
░░░▓▓▓▓▓░░░░░░░░░░░░▓▓▓▓▓░░░░░█
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█▀
░░░░░░░░░▄▄███████▄▄░░░░░░░░░█
░░░░░░░░█████████████░░░░░░░█▀
░░░░░░░░░▀█████████▀░░░░░░░█▀
░░░░░░░░░░░░░░░░░░░░░░░░░░█▀
░░░░░░░░░░░░░░░░░░░░░░░░░█▀\`
${interaction.member} видит чудо... и это ${interaction.options.getUser(`пользователь`)}`)
                    }
                }
            };
                break;

            case `snowman`: {
                const role = `642819600429481997`;
                if (!interaction.member.roles.cache.has(role)) {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `❗ Отсутствует необходимая роль!`
                        })
                        .setDescription(`У вас нет картинки \`${interaction.guild.roles.cache.get(role).name}\`!`)
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())

                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })

                } else {
                    if (!interaction.options.getUser(`пользователь`)) {
                        interaction.reply(
`\`________________§§§§§§§§§
_______________§§§§§§§§§§§
______________§§§§§§____§§§
_____________§§§§§§§§____§§
____________§§§§§§§§§§____§§§§
___________§§§§§§§§§§§§___§cd§§
_________§§§§§§§§§§§§§§§§__§§§
________§§§§§§§§§§§§§§§§§§_______§_§_§_§_§
_______§§§§§§§§§§§§§§§§§§§§______§_§_§_§_§
______§§§________________§§§_____§_§_§_§_§
______§§__§§_______§§_____§§_____§§§§§§§§
______§§______§§__________§§______§§cd§§
______§§___§______§_______§§_______§§§§
_______§§___§§§§§§_______§§_________§§
________§§______________§§__________§§
_________§§§§§§§§§§§§§§§§___________§§
______§§§§§§§§§§§§§§§§§§§§§§__§§§§§§§§
_§§§§§§§§§§_______________§§§§___§§§§§
§§§§§§_§§§________________§§__§§§___§§
____§__§§_________________§§§§§§____§§
__§§___§§__________________§§_______§§
___§§__§§__________________§§_______§§
_____§§§§§_________________§§_______§§
_________§§_______________§§________§§
__________§§_____________§§_________§§
____________§§§§§§§§§§§§§§__________§§\`

${interaction.member} слепил снеговика.`)
                    } else {
                        interaction.reply(
`\`________________§§§§§§§§§
_______________§§§§§§§§§§§
______________§§§§§§____§§§
_____________§§§§§§§§____§§
____________§§§§§§§§§§____§§§§
___________§§§§§§§§§§§§___§cd§§
_________§§§§§§§§§§§§§§§§__§§§
________§§§§§§§§§§§§§§§§§§_______§_§_§_§_§
_______§§§§§§§§§§§§§§§§§§§§______§_§_§_§_§
______§§§________________§§§_____§_§_§_§_§
______§§__§§_______§§_____§§_____§§§§§§§§
______§§______§§__________§§______§§cd§§
______§§___§______§_______§§_______§§§§
_______§§___§§§§§§_______§§_________§§
________§§______________§§__________§§
_________§§§§§§§§§§§§§§§§___________§§
______§§§§§§§§§§§§§§§§§§§§§§__§§§§§§§§
_§§§§§§§§§§_______________§§§§___§§§§§
§§§§§§_§§§________________§§__§§§___§§
____§__§§_________________§§§§§§____§§
__§§___§§__________________§§_______§§
___§§__§§__________________§§_______§§
_____§§§§§_________________§§_______§§
_________§§_______________§§________§§
__________§§_____________§§_________§§
____________§§§§§§§§§§§§§§__________§§\`

${interaction.member} слепил снеговика для ${interaction.options.getUser(`пользователь`)}`)
                    }
                }
            };
                break;

            case `sova`: {
                const role = `850079134700666890`;
                if (!interaction.member.roles.cache.has(role)) {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `❗ Отсутствует необходимая роль!`
                        })
                        .setDescription(`У вас нет картинки \`${interaction.guild.roles.cache.get(role).name}\`!`)
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())

                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })

                } else {
                    if (!interaction.options.getUser(`пользователь`)) {
                        interaction.reply(
`\`____________*_____*
___________*_*****_*
__________*_(O)_(O)_*
_________**____V____**
_________**_________**
_________**_________**
__________*_________*
___________***___***\`
Сова ${interaction.member}`)
                    } else {
                        interaction.reply(
`\`____________*_____*
___________*_*****_*
__________*_(O)_(O)_*
_________**____V____**
_________**_________**
_________**_________**
__________*_________*
___________***___***\`
Сова от ${interaction.member} для ${interaction.options.getUser(`пользователь`)}`)
                    }
                }
            };
                break;

            case `ghost`: {
                const role = `893927886766096384`;
                if (!interaction.member.roles.cache.has(role)) {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `❗ Отсутствует необходимая роль!`
                        })
                        .setDescription(`У вас нет картинки \`${interaction.guild.roles.cache.get(role).name}\`!`)
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())

                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })

                } else {
                    if (!interaction.options.getUser(`пользователь`)) {
                        interaction.reply(
`▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
▒▒▒▒▒▒▒▒▄▄▄▄▄▄▄▄▒▒▒▒▒▒ 
▒▒█▒▒▒▄██████████▄▒▒▒▒ 
▒█▐▒▒▒████████████▒▒▒▒ 
▒▌▐▒▒██▄▀██████▀▄██▒▒▒ 
▐┼▐▒▒██▄▄▄▄██▄▄▄▄██▒▒▒ 
▐┼▐▒▒██████████████▒▒▒ 
▐▄▐████─▀▐▐▀█─█─▌▐██▄▒ 
▒▒█████──────────▐███▌ 
▒▒█▀▀██▄█─▄───▐─▄███▀▒ 
▒▒█▒▒███████▄██████▒▒▒ 
▒▒▒▒▒██████████████▒▒▒ 
▒▒▒▒▒██████████████▒▒▒ 
▒▒▒▒▒█████████▐▌██▌▒▒▒ 
▒▒▒▒▒▐▀▐▒▌▀█▀▒▐▒█▒▒▒▒▒ 
▒▒▒▒▒▒▒▒▒▒▒▐▒▒▒▒▌▒▒▒▒▒ 
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

${interaction.member} пугает всех`)
                    } else {
                        interaction.reply(
`▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
▒▒▒▒▒▒▒▒▄▄▄▄▄▄▄▄▒▒▒▒▒▒ 
▒▒█▒▒▒▄██████████▄▒▒▒▒ 
▒█▐▒▒▒████████████▒▒▒▒ 
▒▌▐▒▒██▄▀██████▀▄██▒▒▒ 
▐┼▐▒▒██▄▄▄▄██▄▄▄▄██▒▒▒ 
▐┼▐▒▒██████████████▒▒▒ 
▐▄▐████─▀▐▐▀█─█─▌▐██▄▒ 
▒▒█████──────────▐███▌ 
▒▒█▀▀██▄█─▄───▐─▄███▀▒ 
▒▒█▒▒███████▄██████▒▒▒ 
▒▒▒▒▒██████████████▒▒▒ 
▒▒▒▒▒██████████████▒▒▒ 
▒▒▒▒▒█████████▐▌██▌▒▒▒ 
▒▒▒▒▒▐▀▐▒▌▀█▀▒▐▒█▒▒▒▒▒ 
▒▒▒▒▒▒▒▒▒▒▒▐▒▒▒▒▌▒▒▒▒▒ 
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

${interaction.member} пугает ${interaction.options.getUser(`пользователь`)}`)
                    }
                }
            };
                break;

            case `dragon`: {
                const role = `694914077104799764`;
                if (!interaction.member.roles.cache.has(role)) {
                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `❗ Отсутствует необходимая роль!`
                        })
                        .setDescription(`У вас нет картинки \`${interaction.guild.roles.cache.get(role).name}\`!`)
                        .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                        .setColor(`DarkRed`)
                        .setTimestamp(Date.now())

                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })

                } else {
                    if (!interaction.options.getUser(`пользователь`)) {
                        interaction.reply(
`\`░██════════▒██
███═════════░███▒
███░══════════░███
███▓═════█══════███▒
████▒═══░██══════███▓════█
█████▒════███═════███▓═══▒██
██████▒════▓██▒═══░███▒═══▒██
████████░═══▓███═══████════▒██
█████████▓░══████══▒███▒════███
████████████▒█████══████░═══▓███
██████████████████▒═█████═══████▒
███████████████████═▒████▓══████▒
█████████████▓█████══█████▒═████░
█████████████▒═█████═▓██████████░
░═░░▒▓███████▒══░███░═██████████░
═══░════▒▓████═█░═▒██═██████████▒
███████▓▒░▒███═▒█▓░═══███████████
═░▒▓████████▓██═████▓▓███████████░
══════▒████▓███▒═█████████████████
════════▒███████░═▒███████████████░
══════════███████▓═▒█████████▓████▒
═══════════▓██████▓░█████████═▓███
════════════████████████████══███▓
═════════════██████████████▒═▒███
═══════░░░░░▒██████████████▒═████
═════░▓█████████████▓███████▓███
═════════▒▓█████████░░█████████▒
════════════▒███████░═▒████████░
══════════════▓█████▒══░▓██████░
═══════════════▒█████░═══▒█████▓
════════════════▒█████══████████
═════════════════▓███▓═══▓███████▒▒▓█
══════════════════████░█░══▓████████▓
══════════════════██████░═══▒██████▓
═════════════█░═══██████══████████▒
═════════════▒█████████▓═══▒▓████▒
═══════════════▓███████░═════███▓
═════════════════████████══▓███▒
════════════════════░▓██▒\`

Личный дракон ${interaction.member}`)
                    } else {
                        interaction.reply(
`\`░██════════▒██
███═════════░███▒
███░══════════░███
███▓═════█══════███▒
████▒═══░██══════███▓════█
█████▒════███═════███▓═══▒██
██████▒════▓██▒═══░███▒═══▒██
████████░═══▓███═══████════▒██
█████████▓░══████══▒███▒════███
████████████▒█████══████░═══▓███
██████████████████▒═█████═══████▒
███████████████████═▒████▓══████▒
█████████████▓█████══█████▒═████░
█████████████▒═█████═▓██████████░
░═░░▒▓███████▒══░███░═██████████░
═══░════▒▓████═█░═▒██═██████████▒
███████▓▒░▒███═▒█▓░═══███████████
═░▒▓████████▓██═████▓▓███████████░
══════▒████▓███▒═█████████████████
════════▒███████░═▒███████████████░
══════════███████▓═▒█████████▓████▒
═══════════▓██████▓░█████████═▓███
════════════████████████████══███▓
═════════════██████████████▒═▒███
═══════░░░░░▒██████████████▒═████
═════░▓█████████████▓███████▓███
═════════▒▓█████████░░█████████▒
════════════▒███████░═▒████████░
══════════════▓█████▒══░▓██████░
═══════════════▒█████░═══▒█████▓
════════════════▒█████══████████
═════════════════▓███▓═══▓███████▒▒▓█
══════════════════████░█░══▓████████▓
══════════════════██████░═══▒██████▓
═════════════█░═══██████══████████▒
═════════════▒█████████▓═══▒▓████▒
═══════════════▓███████░═════███▓
═════════════════████████══▓███▒
════════════════════░▓██▒\`

Личный дракон ${interaction.member} прилетел к ${interaction.options.getUser(`пользователь`)}`)
                    }
                }
            };
                break;

                case `ban`: {
                    const role = `850079173149065277`;
                    if (!interaction.member.roles.cache.has(role)) {
                        const embed = new EmbedBuilder()
                            .setAuthor({
                                name: `❗ Отсутствует необходимая роль!`
                            })
                            .setDescription(`У вас нет картинки \`${interaction.guild.roles.cache.get(role).name}\`!`)
                            .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                            .setColor(`DarkRed`)
                            .setTimestamp(Date.now())
    
                        interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        })
    
                    } else {
                        if (!interaction.options.getUser(`пользователь`)) {
                            const n1 = [`A`,`B`,`C`,`D`,`E`,`F`,`G`,`H`,`I`,`J`,`K`,`L`,`M`,`N`,`O`,`P`,`Q`,`R`,`S`,`T`,`U`,`V`,`W`,`X`,`Y`,`Z`,`0`,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`]
                            let r1 = n1[Math.floor(Math.random() * n1.length)]
                            let r2 = n1[Math.floor(Math.random() * n1.length)]
                            let r3 = n1[Math.floor(Math.random() * n1.length)]
                            let r4 = n1[Math.floor(Math.random() * n1.length)]
                            let r5 = n1[Math.floor(Math.random() * n1.length)]
                            let r6 = n1[Math.floor(Math.random() * n1.length)]
                            let r7 = n1[Math.floor(Math.random() * n1.length)]
                            let r8 = n1[Math.floor(Math.random() * n1.length)]
                            let r9 = n1[Math.floor(Math.random() * n1.length)]
                            let r10 = n1[Math.floor(Math.random() * n1.length)]
                            let r11 = n1[Math.floor(Math.random() * n1.length)]
                            let r12 = n1[Math.floor(Math.random() * n1.length)]
                            let r13 = n1[Math.floor(Math.random() * n1.length)]
                            let r14 = n1[Math.floor(Math.random() * n1.length)]
                            interaction.reply(
`◾◾◾
Failed to connect to the server


${interaction.member} is permanently banned from this server!

Reason: WATCHDOG CHEAT DETECTION (DC-${r1}${r2}${r3}${r4}${r5}${r6})
\`Find out more: https://www.hypixel.net/watchdog\` 

     Ban ID: #${r7}${r8}${r9}${r10}${r11}${r12}${r13}${r14}

◾◾◾`)
                        } else {
                            const [n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14] = [`A`,`B`,`C`,`D`,`E`,`F`,`G`,`H`,`I`,`J`,`K`,`L`,`M`,`N`,`O`,`P`,`Q`,`R`,`S`,`T`,`U`,`V`,`W`,`X`,`Y`,`Z`,`0`,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`]
                            let r1 = n1[Math.floor(Math.random() * n1.length)]
                            let r2 = n2[Math.floor(Math.random() * n2.length)]
                            let r3 = n3[Math.floor(Math.random() * n3.length)]
                            let r4 = n4[Math.floor(Math.random() * n4.length)]
                            let r5 = n5[Math.floor(Math.random() * n5.length)]
                            let r6 = n6[Math.floor(Math.random() * n6.length)]
                            let r7 = n7[Math.floor(Math.random() * n7.length)]
                            let r8 = n8[Math.floor(Math.random() * n8.length)]
                            let r9 = n9[Math.floor(Math.random() * n9.length)]
                            let r10 = n10[Math.floor(Math.random() * n10.length)]
                            let r11 = n11[Math.floor(Math.random() * n11.length)]
                            let r12 = n12[Math.floor(Math.random() * n12.length)]
                            let r13 = n13[Math.floor(Math.random() * n13.length)]
                            let r14 = n14[Math.floor(Math.random() * n14.length)]
                            interaction.reply(
`◾◾◾
Failed to connect to the server


${interaction.options.getUser(`пользователь`)} is permanently banned from this server!

Reason: WATCHDOG CHEAT DETECTION (DC-${r1}${r2}${r3}${r4}${r5}${r6})
\`Find out more: https://www.hypixel.net/watchdog\` 

     Ban ID: #${r7}${r8}${r9}${r10}${r11}${r12}${r13}${r14}

◾◾◾`)
                        }
                    }
                };
                    break;

            default: {
                await interaction.reply({
                    content: `Данной опции не существует! Выберите одну из предложенных!`,
                    ephemeral: true
                })
            }
                break;
        }
    }

}