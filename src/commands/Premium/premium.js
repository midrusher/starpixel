const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ
const ch_list = require(`../../discord structure/channels.json`)
const linksInfo = require(`../../discord structure/links.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`premium`)
        .setDescription(`Открыть премиальную коробку`)
        .setDMPermission(false),

    async execute(interaction, client) {
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.premium === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})
        const user = interaction.member
        const userData = await User.findOne({ userid: user.user.id })

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `❗ Отсутствует необходимая роль!`
            })
            .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`850336260265476096`).name}\`!`)
            .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
            .setColor(`DarkRed`)
            .setTimestamp(Date.now())
        if (!user.roles.cache.has(`850336260265476096`)) return interaction.reply({
            embeds: [embed],
            ephemeral: true
        })

        const cd = new EmbedBuilder()
            .setColor(linksInfo.bot_color)
            .setAuthor({
                name: `Вы не можете использовать эту команду`
            })
            .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.premium - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)
            .setTimestamp(Date.now())
            .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)

        if (userData.cooldowns.premium > Date.now()) return interaction.reply({
            embeds: [cd],
            ephemeral: true
        });


        await interaction.deferReply({
            fetchReply: true
        })
        interaction.deleteReply()
        const loot = [
            {
                group: 1,
                name: `Маленькую коробку`,
                roleID: `510932601721192458`
            },
            {
                group: 1,
                name: `Мешочек`,
                roleID: `819930814388240385`
            },
            {
                group: 1,
                name: `Большую коробку`,
                roleID: `521248091853291540`
            }
        ]

        const r_loot = loot[Math.floor(Math.random() * loot.length)]
        const msg = await interaction.guild.channels.cache.get(ch_list.box).send({
            content: `◾:star:◾
${user} открывает премиум коробку...
|—————~ஜ۩۞۩ஜ~—————|
\`${r_loot.name}.\`
Открой, чтобы получить награды.
|—————~ஜ۩۞۩ஜ~—————|
◾:star:◾`
        })
        if (r_loot.group == 1) {
            if (!user.roles.cache.has(r_loot.roleID)) {
                user.roles.add(r_loot.roleID)
                await msg.react(`✅`)
            } else {
                await msg.react(`🚫`)
            }
        }

        let rumbik = [
            {
                rumb_amount: 5,
                dropChanceRUMB: 49
            },
            {
                rumb_amount: 10,
                dropChanceRUMB: 33
            },
            {
                rumb_amount: 15,
                dropChanceRUMB: 17
            },
            {
                rumb_amount: 20,
                dropChanceRUMB: 1
            },

        ]

        //Рандом - румбики
        let sum_rumb = 0;
        for (let i_rumb = 0; i_rumb < rumbik.length; i_rumb++) {
            sum_rumb += rumbik[i_rumb].dropChanceRUMB;
        }
        let r_rumbik = Math.floor(Math.random() * sum_rumb);
        let i_rumb = 0;
        for (let s = rumbik[0].dropChanceRUMB; s <= r_rumbik; s += rumbik[i_rumb].dropChanceRUMB) {
            i_rumb++;
        }

        //Сообщение - румбики                       
        interaction.guild.channels.cache.get(ch_list.rumb).send(
            `╔═════════♡════════╗
${user} +${rumbik[i_rumb].rumb_amount}<:Rumbik:883638847056003072>
\`Получено из премиум-коробки.\`
╚═════════♡════════╝`
        );
        if (user.roles.cache.has("553593133884112900") || user.roles.cache.has("553593136027533313") ||
        user.roles.cache.has("553593976037310489") || user.roles.cache.has("780487593485008946") ||
        user.roles.cache.has("849695880688173087") || user.roles.cache.has("992122876394225814") ||
        user.roles.cache.has("992123014831419472") || user.roles.cache.has("992123019793276961")) {
            userData.rumbik += rumbik[i_rumb].rumb_amount
        } else {
            userData.rumbik += 0
        }


        userData.cooldowns.premium = Date.now() + (1000 * 60 * 60 * 24 * 7)
        userData.save()

    }
};