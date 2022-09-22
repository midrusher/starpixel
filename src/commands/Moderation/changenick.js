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
        .setName(`changenick`)
        .setDescription(`Изменить части никнейма пользователя`)
        .addUserOption(option => option
            .setName(`пользователь`)
            .setDescription(`Пользователь`)
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName(`часть`)
            .setDescription(`Часть никнейма для изменения`)
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addStringOption(option => option
            .setName(`значение`)
            .setDescription(`Символ, на который нужно изменить`)
        )
    ,
    async autoComplete(interaction, client) {
        
        const focusedValue = interaction.options.getFocused();
        const choices = [
            'Символ ранга',
            'Рамка (перед ником)',
            'Имя',
            'Рамка (после ника)',
            'Суффикс',
            'Косметический значок',
            'Статус Premium',
        ];
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );

    },
    async execute(interaction, client) {
        const user = interaction.options.getUser(`пользователь`)
        const userData = await User.findOne({ userid: user.id })


        const newoption = interaction.options.getString(`значение`) || ``

        switch (interaction.options.getString(`часть`)) {
            case `Символ ранга`: {
                userData.displayname.rank = newoption;
                userData.save()
                await interaction.reply({
                    content: `В скором времени никнейм пользователя изменится на \`「${userData.displayname.rank}」 ${userData.displayname.ramka1}${userData.displayname.name}${userData.displayname.ramka2}${userData.displayname.suffix} ${userData.displayname.symbol}┇ ${userData.displayname.premium}\``,
                    ephemeral: true
                })
            }

                break;
            case `Рамка (перед ником)`: {
                userData.displayname.ramka1 = newoption;
                userData.save()
                await interaction.reply({
                    content: `В скором времени никнейм пользователя изменится на \`「${userData.displayname.rank}」 ${userData.displayname.ramka1}${userData.displayname.name}${userData.displayname.ramka2}${userData.displayname.suffix} ${userData.displayname.symbol}┇ ${userData.displayname.premium}\``,
                    ephemeral: true
                })
            }

                break;
            case `Имя`: {
                userData.displayname.name = newoption;
                userData.save()
                await interaction.reply({
                    content: `В скором времени никнейм пользователя изменится на \`「${userData.displayname.rank}」 ${userData.displayname.ramka1}${userData.displayname.name}${userData.displayname.ramka2}${userData.displayname.suffix} ${userData.displayname.symbol}┇ ${userData.displayname.premium}\``,
                    ephemeral: true
                })
            }

                break;
            case `Рамка (после ника)`: {
                userData.displayname.ramka2 = newoption;
                userData.save()
                await interaction.reply({
                    content: `В скором времени никнейм пользователя изменится на \`「${userData.displayname.rank}」 ${userData.displayname.ramka1}${userData.displayname.name}${userData.displayname.ramka2}${userData.displayname.suffix} ${userData.displayname.symbol}┇ ${userData.displayname.premium}\``,
                    ephemeral: true
                })
            }

                break;
            case `Суффикс`: {
                userData.displayname.suffix = newoption;
                userData.save()
                await interaction.reply({
                    content: `В скором времени никнейм пользователя изменится на \`「${userData.displayname.rank}」 ${userData.displayname.ramka1}${userData.displayname.name}${userData.displayname.ramka2}${userData.displayname.suffix} ${userData.displayname.symbol}┇ ${userData.displayname.premium}\``,
                    ephemeral: true
                })
            }

                break;
            case `Косметический значок`: {
                userData.displayname.symbol = newoption;
                userData.save()
                await interaction.reply({
                    content: `В скором времени никнейм пользователя изменится на \`「${userData.displayname.rank}」 ${userData.displayname.ramka1}${userData.displayname.name}${userData.displayname.ramka2}${userData.displayname.suffix} ${userData.displayname.symbol}┇ ${userData.displayname.premium}\``,
                    ephemeral: true
                })
            }

                break;
            case `Статус Premium`: {
                userData.displayname.premium = newoption;
                userData.save()
                await interaction.reply({
                    content: `В скором времени никнейм пользователя изменится на \`「${userData.displayname.rank}」 ${userData.displayname.ramka1}${userData.displayname.name}${userData.displayname.ramka2}${userData.displayname.suffix} ${userData.displayname.symbol}┇ ${userData.displayname.premium}\``,
                    ephemeral: true
                })
            }

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
};