const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, InteractionType, ButtonBuilder, ButtonStyle, ComponentType, } = require('discord.js');
const apply = require('../../commands/Misc/apply');
const { Apply } = require(`../../schemas/applications`)
module.exports = {
    data: {
        name: "button_apply"
    },
    async execute(interaction, client) {
        let apply2
        let appData = await Apply.findOne({ userid: interaction.user.id, guildid: interaction.guild.id })
        if (!appData.que6 && !appData.que7) {
            apply2 = new ModalBuilder()
                .setCustomId(`apply2`)
                .setTitle(`Заявка на вступление (2/2)`)
                .addComponents(
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId(`sixth`)
                                .setLabel(`Почему вы хотите вступить к нам в гильдию?`)
                                .setPlaceholder(`Расскажите нам, почему вы выбрали именно нам.`)
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId(`seventh`)
                                .setLabel(`Как вы узнали о нашей гильдии?`)
                                .setPlaceholder(`Напишите, где и как вы узнали о нашей гильдии.`)
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph)
                        )
                )
        } else if (!appData.que6 && appData.que7) {
            apply2 = new ModalBuilder()
                .setCustomId(`apply2`)
                .setTitle(`Заявка на вступление (2/2)`)
                .addComponents(
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId(`sixth`)
                                .setLabel(`Почему вы хотите вступить к нам в гильдию?`)
                                .setPlaceholder(`Расскажите нам, почему вы выбрали именно нам.`)
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId(`seventh`)
                                .setLabel(`Как вы узнали о нашей гильдии?`)
                                .setPlaceholder(`Напишите, где и как вы узнали о нашей гильдии.`)
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph)
                                .setValue(appData.que7)
                        )
                )
        } else if (appData.que6 && !appData.que7) {
            apply2 = new ModalBuilder()
                .setCustomId(`apply2`)
                .setTitle(`Заявка на вступление (2/2)`)
                .addComponents(
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId(`sixth`)
                                .setLabel(`Почему вы хотите вступить к нам в гильдию?`)
                                .setPlaceholder(`Расскажите нам, почему вы выбрали именно нам.`)
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph)
                                .setValue(appData.que6)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId(`seventh`)
                                .setLabel(`Как вы узнали о нашей гильдии?`)
                                .setPlaceholder(`Напишите, где и как вы узнали о нашей гильдии.`)
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph)
                        )
                )
        } else if (appData.que6 && appData.que7) {
            apply2 = new ModalBuilder()
                .setCustomId(`apply2`)
                .setTitle(`Заявка на вступление (2/2)`)
                .addComponents(
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId(`sixth`)
                                .setLabel(`Почему вы хотите вступить к нам в гильдию?`)
                                .setPlaceholder(`Расскажите нам, почему вы выбрали именно нам.`)
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph)
                                .setValue(appData.que6)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId(`seventh`)
                                .setLabel(`Как вы узнали о нашей гильдии?`)
                                .setPlaceholder(`Напишите, где и как вы узнали о нашей гильдии.`)
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph)
                                .setValue(appData.que7)
                        )
                )
        }
        await interaction.showModal(apply2)


        const filter = i => i.customId === `apply2`
        await interaction.awaitModalSubmit({ filter, time: 6000000 })
            .then(async (i) => {
                let r6 = i.fields.getTextInputValue("sixth")
                let r7 = i.fields.getTextInputValue("seventh")
                appData.que6 = r6
                appData.que7 = r7
                const message = await i.channel.messages.fetch(appData.secondPartID)
                await message.delete()
                appData.secondPartID = ``
                await i.deferReply({
                    fetchReply: true
                })
                await i.deleteReply()
                const msg = await i.channel.send(`${interaction.member}, вы подали заявку на вступление в гильдию:
1. Имя - \`${appData.que1}\`.
2. Никнейм - \`${appData.que2}\`.
3. Возраст - \`${appData.que3}\`.
4. Готовность пойти в голосовой канал - \`${appData.que4}\`.
5. Знакомство с правилами - \`${appData.que5}\`.
            
6. Почему вы желаете вступить именно к нам в гильдию?
\`${appData.que6}\`.
            
7. Как вы узнали о нашей гильдии?
\`${appData.que7}\`.
            
:arrow_down:    :arrow_down:    :arrow_down: 
            
:exclamation: Пожалуйста, ожидайте в течение 7 дней ответа от администратора. Помните, что вам нужно открыть ваши личные сообщения, чтобы с вами могли связаться.
            
Не забудьте ещё раз ознакомиться с правилами и поставить галочку в канале <#774546154209148928>!`)
                appData.applicationid = msg.id
                appData.save()
            })
            .catch(async (err) => {
                console.log(err)
                appData.save()
            });
    }
}
