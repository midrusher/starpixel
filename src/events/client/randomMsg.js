const chalk = require(`chalk`);
const { ChannelType, EmbedBuilder } = require("discord.js");
const { MsgData } = require(`../../schemas/msgdata`)

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.channel.type !== ChannelType.DM) {
            const guild = await client.guilds.fetch(message.guild.id)
            
            if (!message.author.bot) {
                const random = Math.floor(Math.random() * 99) + 1
                console.log(random)
                if (random == 54) {
                    const msgs = await MsgData.findOne({ guildid: guild.id })
                    const r_msg = msgs.messages
                    let i = Math.floor(Math.random() * msgs.messages.length)
                    await message.reply({
                        content: `${r_msg[i].content} - \`© ${r_msg[i].author}\``
                    })
                } else return


            }


        }

    }
}