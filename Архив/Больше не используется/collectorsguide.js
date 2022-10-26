const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/start_bot/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`addmusic`)
        .setDescription(`Основные ссылки и информация о гильдии.`)
        .addStringOption(option => option
            .setName(`ссылка`)
            .setDescription(`Ссылка на песню`)
            .setRequired(true)
        ),
    async execute(interaction, client) {
        const cmd_name = `addmusic`
        if (!interaction.options.getString(`ссылка`).startsWith(`https://`)) return interaction.reply({
            content: `Неверно указана ссылка.`,
            ephemeral: true
        })
        const message = await interaction.reply({
            content: `${interaction.options.getString(`ссылка`)}`,
            fetchReply: true,
        });
        const emoji = client.emojis.cache.find((emoji) => emoji.id = `1011958418388553759`)
        message.react(emoji)
        message.react(`👍`)

        const filter = (reaction, user) => {
            return reaction.emoji.name === '👍' && user.id === message.author.id;
        };
        
        message.awaitReactions({ filter, max: 4, time: 5000, errors: ['time'] })
            .then(collected => console.log(collected.size))
            .catch(collected => {
                console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
            });
        
console.log(`${interaction.member.displayName} использовал команду "/${cmd_name}"`)
        
    }
};