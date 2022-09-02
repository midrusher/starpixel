const { SlashCommandBuilder, Attachment, EmbedBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
const { User } = require(`../../schemas/userdata`);


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`message`)
        .setDescription(`Отправить сообщение в канал/личные сообщения.`)
        .addSubcommand(subcommand => subcommand
            .setName(`channel`)
            .setDescription(`Отправить сообщение на канал.`)
            .addChannelOption(option => option
                .setName(`канал`)
                .setDescription(`Канал, куда нужно отправить сообщение.`)
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName(`сообщение`)
                .setDescription(`Сообщение, которое нужно отправить.`)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(`user`)
            .setDescription(`Отправить сообщение пользователю в личные сообщения.`)
            .addUserOption(option => option
                .setName(`пользователь`)
                .setDescription(`Пользователь, которому нужно отправить сообщение.`)
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName(`сообщение`)
                .setDescription(`Сообщение, которое нужно отправить.`)
                .setRequired(true)
            )
        ),
    async execute(interaction, client) {
        if (!interaction.member.roles.cache.has(`320880176416161802`)) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: `❗ Отсутствует необходимая роль!`
                })
                .setDescription(`Вы не имеете роль \`${interaction.guild.roles.cache.get(`320880176416161802`).name}\`!`)
                .setThumbnail(`https://i.imgur.com/6IE3lz7.png`)
                .setColor(`DarkRed`)
                .setTimestamp(Date.now())

            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
                
        }

        switch (interaction.options.getSubcommand()) {
            case `channel`: {
                const channel = await interaction.options.getChannel(`канал`)
                const message = await interaction.options.getString(`сообщение`)

                await interaction.guild.channels.cache.get(channel.id).send({
                    content: `${message}`
                })
                await interaction.reply({
                    content: `Сообщение отправлено на канал ${channel}!`,
                    ephemeral: true
                })
                console.log(`Пользователь: ${channel.name}. Сообщение: ${message}`)
            }

                break;

            case `user`: {
                const user = await interaction.options.getUser(`пользователь`)
                const message = await interaction.options.getString(`сообщение`)
                const memberDM = await interaction.guild.members.fetch(user.id)

                try {
                    await memberDM.send(`${message}`)
                    await interaction.reply({
                        content: `Сообщение отправлено пользователю ${user}!`,
                        ephemeral: true
                    })
                    console.log(`Пользователь: ${user.username}. Сообщение: ${message}`)
                } catch (error) {
                    
                    await interaction.reply({
                        content: `У пользователя ${user} закрыты личные сообщения! Попросите его открыть их и повторите попытку снова!`,
                        ephemeral: true
                    });
                    return;
                }

            }
                break;

            default:
                break;
        }
    }
}