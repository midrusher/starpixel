const { SlashCommandBuilder, EmbedBuilder, Embed, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');
const wait = require('node:timers/promises').setTimeout;
const ch_list = require(`../../discord structure/channels.json`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`done`)
        .setDescription(`Ответить на вопрос в канале вопрос модерам`)
        .setDMPermission(false)
        .addUserOption(option => option
            .setName('пользователь')
            .setDescription('Пользователь, которому нужно ответить')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName(`комментарий`)
            .setDescription(`Комментарий к вопросу`)
            .setRequired(false)
        ),
    async execute(interaction, client) {
        const { Guild } = require(`../../schemas/guilddata`)
        const pluginData = await Guild.findOne({ id: interaction.guild.id })
        if (pluginData.plugins.moderation === false) return interaction.reply({content: `Данный плагин отключён! Попробуйте позже!`, ephemeral: true})

        const cmd_name = `done`
        const mod = interaction.member;
        const user = interaction.options.getUser('пользователь');
        const comment = interaction.options.getString(`комментарий`)
        const embed = new EmbedBuilder()
                .setAuthor({
                    name: `❗ Отсутствует необходимая роль!`
                })
                .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`563793535250464809`).name}\`!
Но вы всё ещё можете использовать команду \`/profile update\``)
                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                .setColor(`DarkRed`)
                .setTimestamp(Date.now())

        if (!interaction.member.roles.cache.has(`563793535250464809`)) return interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        
        const button_done = new ButtonBuilder()
            .setCustomId('done')
            .setLabel('Спасибо!')
            .setStyle(ButtonStyle.Primary)
            .setEmoji(`👌`);

        const done2 = new EmbedBuilder()
            .setColor(0xA872FF)
            .setAuthor({
                name: `Просьба обработана`
            })
            .setDescription(`Просьбе ${user} была обработана офицером ${mod}!`)
        interaction.reply({
            embeds: [done2]
        })


        console.log(
            `Использована команда /${cmd_name}
Офицер: ${mod.displayName}
Пользователю: ${user.tag}
Комментарий: ${comment}`)

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

            const msg = await interaction.guild.channels.cache.get(ch_list.main).send({
                content: `${user}`,
                embeds: [done],
                components: [new ActionRowBuilder().addComponents(button_done)]
            })

            const filter = i => i.customId === 'done';

            const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 600000, });

            collector.on('collect', i => {
                if (i.user.id === user.id) {
                        button_done.setDisabled(true)   
                        i.reply({
                            content: `Если будут вопросы, обращайтесь в канал <#849516805529927700>!`,
                            ephemeral: true
                        })
                        msg.edit({
                            content: `${user}`,
                            embeds: [done],
                            components: [new ActionRowBuilder().addComponents(button_done)]
                        })
                } else {
                    i.reply({ content: `Вы не можете использовать данную кнопочку!`, ephemeral: true });
                }
            });

            collector.on('end', async collected => {
                await button_done.setDisabled(true)
                await msg.edit({
                    content: `${user}`,
                    embeds: [done],
                    components: [new ActionRowBuilder().addComponents(button_done)]
                })
            });

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

            const msg = await interaction.guild.channels.cache.get(ch_list.main).send({
                content: `${user}`,
                embeds: [done],
                components: [new ActionRowBuilder().addComponents(button_done)]


            });
            const filter = i => i.customId === 'done';

            const collector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 600000, });

            collector.on('collect', i => {
                if (i.user.id === user.id) {
                        button_done.setDisabled(true)   
                        i.reply({
                            content: `Если будут вопросы, обращайтесь в канал <#849516805529927700>!`,
                            ephemeral: true
                        })
                        msg.edit({
                            content: `${user}`,
                            embeds: [done],
                            components: [new ActionRowBuilder().addComponents(button_done)]
                        })
                } else {
                    i.reply({ content: `Вы не можете использовать данную кнопочку!`, ephemeral: true });
                }
            });

            collector.on('end', async collected => {
                await button_done.setDisabled(true)
                await msg.edit({
                    content: `${user}`,
                    embeds: [done],
                    components: [new ActionRowBuilder().addComponents(button_done)]
                })
            });

        };

    }
}