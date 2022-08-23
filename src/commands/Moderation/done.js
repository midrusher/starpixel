const { SlashCommandBuilder, EmbedBuilder, Embed, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { execute } = require('../../events/client/ready');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`done`)
        .setDescription(`Ответить на вопрос в канале вопрос модерам.`)
        .addUserOption(option => option
            .setName('пользователь')
            .setDescription('Пользователь, которому нужно ответить.')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName(`комментарий`)
            .setDescription(`Комментарий к вопросу`)
            .setRequired(false)
        ),
     async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
        });
        await interaction.deleteReply()
    const cmd_name = `done`
    const mod = interaction.member;
    const user = interaction.options.getUser('пользователь');
    const comment = interaction.options.getString(`комментарий`)
    const button_done = new ButtonBuilder()
					.setCustomId('done')
					.setLabel('Спасибо!')
					.setStyle(ButtonStyle.Primary)
                    .setEmoji(`👌`)
        
        if (!comment) {
            const done = new EmbedBuilder()
            .setAuthor({
                name: `Спасибо за обращение в вопрос-модерам!`
            })
            .setColor(0xA872FF)
            .setTimestamp(Date.now())
            .setDescription(`:envelope: Спасибо за обращение в вопрос-модерам. Ваша просьба была обработана!`)
            .addFields([{
                name: `С уважением, офицер`, value: `${mod}`
            }]);

            const msg = await interaction.guild.channels.cache.get(process.env.main_channel).send({ 
                content: `${user}`, 
                embeds: [done],
                components: [new ActionRowBuilder().addComponents(button_done)]
            })

            await wait(600000)
            await button_done.setDisabled(true)
            await msg.edit({ 
                    content: `${user}`, 
                    embeds: [done],
                    components: []
                })
            
        } else { 
            const done = new EmbedBuilder()
            .setAuthor({
                name: `Спасибо за обращение в вопрос-модерам!`
            })
            .setDescription(`:envelope: ${comment}`)
            .setColor(0xA872FF)
            .setTimestamp(Date.now())
            .addFields([{
                name: `С уважением, офицер`, value: `${mod}`
            }]);

            const msg = await interaction.guild.channels.cache.get(process.env.main_channel).send({ 
                content: `${user}`,
                embeds: [done],
                components: [new ActionRowBuilder().addComponents(button_done)]
            })
            
            await wait(600000)
            await button_done.setDisabled(true)
            await msg.edit({ 
                    content: `${user}`, 
                    embeds: [done],
                    components: []
                })
            
        }
        console.log(
`Использована команда /${cmd_name}
Офицер: ${mod.displayName}
Пользователю: ${user.tag}
Комментарий: ${comment}`)
    }
};
