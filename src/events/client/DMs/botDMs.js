const chalk = require(`chalk`);
const { ChannelType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.channel.type === ChannelType.DM) {
            const guild = await client.guilds.fetch(`320193302844669959`)
            const channel = await guild.channels.cache.get(`982551755340537866`)
            const message_embed = new EmbedBuilder()
                .setColor(process.env.bot_color)
                .setThumbnail(message.author.displayAvatarURL())
                .setTitle(`НОВОЕ СООБЩЕНИЕ В ЛИЧНЫХ СООБЩЕНИЯХ`)
                .setTimestamp(Date.now())
                .setDescription(`Автор: \`${message.author.tag}\`
Содержимое: \`${message.content}\``)
            await channel.send({
                embeds: [message_embed]
            })
            console.log(chalk.yellow(`[${message.author.tag} в личных сообщениях]`) + chalk.white(`: ${message.content}`))
    


        }

    }
}