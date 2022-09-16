const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const ch_list = require(`../../discord structure/channels.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`betainvite`)
        .setDescription(`Пригласить участника на бета-тестирование!`)
        .addUserOption(option => option
            .setName(`пользователь`)
            .setDescription(`Пользователь, которого вы хотите пригласить`)
            .setRequired(true)
        ),
    async execute(interaction, client) {

        const member = await interaction.options.getMember(`пользователь`)

        const msg = new EmbedBuilder()
            .setColor(process.env.bot_color)
            .setTitle(`Вы были приглашены на закрытое бета-тестирование!`)
            .setDescription(`Вас пригласили на бета-тестирования обновления автоматизации в гильдии Starpixel!
            
Так как вас выбрали в качестве бета-тестировщика, вы обязуетесь выполнять следующие правила:
1. Вы обязуетесь использовать команды только от ${client.user}.
2. Запрещается злоупотреблять недоработками бота.
3. Если найдена какая-либо недоработка (любой баг и даже опечатка), вы обязаны сообщить об этом разработчику бота.
4. Если есть возможность хранить какую-либо функцию в тайне, то, пожалуйста, храните ее в тайне!

Помните, что бот находится в стадии бета-тестирования, поэтому некоторые функции могут работать некорректно. Также в любой момент может быть добавлена или удалена любая функция. О каждом обновлении бота вы будете получать сообщение в канале <#1016038744312254515> от GitHub. Там же будет указано, что именно изменилось.

Если вы согласны выполнять данные правила, то нажмите на кнопку \`Согласен\`. Если вы по каким-либо причинам не согласны выполнять правила или не хотите становиться бета-тестировщиком бота, нажмите на кнопку \`Не согласен\`!`)
            .setTimestamp(Date.now())
            .setThumbnail(client.user.displayAvatarURL())

        let buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`betaagree`)
                    .setEmoji(`✅`)
                    .setLabel(`Согласен`)
                    .setStyle(ButtonStyle.Success)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`betadisagree`)
                    .setEmoji(`❌`)
                    .setLabel(`Не согласен`)
                    .setStyle(ButtonStyle.Danger)
            )
        const message = await member.send({
            embeds: [msg],
            components: [buttons]
        })

        message.awaitMessageComponent()
            .then(async (i) => {
                await buttons.components[0].setDisabled(true)
                await buttons.components[1].setDisabled(true)
                await message.edit({
                    embeds: [msg],
                    components: [buttons]
                })
                if (i.customId === `betaagree`) {
                    await i.reply({
                        content: `Мы рады слышать, что вы готовы соблюдать правила бета-тестировщиков! Добро пожаловать в команду!`
                    })
                    await member.roles.add(`1017131191771615243`)
                } else if (i.customId === `betadisagree`) {
                    await interaction.guild.channels.cache.get(ch_list.beta).send({
                        content: `${member} отказался становиться участником бета-тестирования!`
                    })
                    await i.reply({
                        content: `Нам очень жаль слышать, что вы отказались, но это ваше право! Если вы нажали на эту кнопочку случайно, напишите в вопрос модерам!`
                    })
                }
            })
            .catch(async () => {
                await buttons.components[0].setDisabled(true)
                await buttons.components[0].setDisabled(true)
                await message.edit({
                    embeds: [msg],
                    components: [buttons]
                })
            });
    }
};