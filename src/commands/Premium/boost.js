const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { execute } = require('../../events/client/start_bot/ready');
const fetch = require(`node-fetch`);
const api = process.env.hypixel_apikey;
const { User } = require(`../../schemas/userdata`)
const { Guild } = require(`../../schemas/guilddata`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`); //ДОБАВИТЬ В ДРУГИЕ

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`boost`)
        .setDescription(`Забустить участника гильдии`)
        .addUserOption(option => option
            .setName(`пользователь`)
            .setDescription(`Пользователь, которого вы хотите забустить`)
            .setRequired(true)
        ),

    async execute(interaction, client) {
        const member = interaction.options.getMember(`пользователь`)
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
            .setColor(process.env.bot_color)
            .setAuthor({
                name: `Вы не можете использовать эту команду`
            })
            .setDescription(`Данная команда сейчас находится на перезарядке, вы сможете её использовать через ${prettyMilliseconds(userData.cooldowns.boost - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}!`)
            .setTimestamp(Date.now())
            .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)

        if (userData.cooldowns.boost > Date.now()) return interaction.reply({
            embeds: [cd],
            ephemeral: true
        });

        const wrong_member = new EmbedBuilder()
            .setAuthor({
                name: `❗ Произошла ошибка!`
            })
            .setColor(`DarkRed`)
            .setDescription(`Вы не можете бустить себя! Повторите попытку ещё раз с другим пользователем!`)
            .setTimestamp(Date.now())
            .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)

        if (member.id === user.user.id) return interaction.reply({
            embeds: [wrong_member],
            ephemeral: true
        })

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
        const msg = await interaction.channel.send({
            content: `◾
**БУСТ-БУСТ-БУСТ!**
                
:zap: :credit_card: ${user} **БУСТИТ** участника.
${member} получает \`${r_loot.name}\`.
                
**БУСТ-БУСТ-БУСТ!**
◾`
        })
        if (r_loot.group == 1) {
            if (!member.roles.cache.has(r_loot.roleID)) {
                member.roles.add(r_loot.roleID)
                await msg.react(`✅`)
            } else {
                await msg.react(`🚫`)
            }
        }


        userData.cooldowns.boost = Date.now() + (1000 * 60 * 60 * 24 * 7)
        userData.save()

    }
};