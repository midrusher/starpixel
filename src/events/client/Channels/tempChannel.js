const chalk = require(`chalk`);
const { User } = require(`../../../schemas/userdata`)
const { ReactionCollector, ChannelType, CategoryChannelChildManager, Collection, PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        const newChannel = newState.channel;
        const oldChannel = oldState.channel;
        const user = newState.guild.members.cache.get(newState.id).user || oldState.guild.members.cache.get(oldState.id).user
        const userData = await User.findOne({ userid: user.id, guildid: newState.guild.id })
        const member = newState.guild.members.cache.get(newState.id) || oldState.guild.members.cache.get(oldState.id)
        const guild = newState.guild
        const premChannel = `838300965358010439`

        if (newChannel?.id === premChannel) {
            if (!member.roles.cache.has(`850336260265476096`)) {
                await newState.guild.members.cache.get(newState.id).voice.disconnect(`Нет подписки премиум!`)
                try {
                    await member.send(`Вы не можете подключаться к данному каналу, так как у вас отсутствует подписка VIP!`)
                } catch (error) {
                    console.log(`Не удалось написать сообщение пользователю! tempChannel.js`)
                }
                return
            } else if (userData.temp_channel.created === false) {
                let channel = await newChannel.guild.channels.create({
                    name: `🔒・Приватный`,
                    type: ChannelType.GuildVoice,
                    parent: newChannel.parentId,
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.ManageChannels,
                                PermissionsBitField.Flags.ManageMessages,
                                PermissionsBitField.Flags.SendMessages,
                                PermissionsBitField.Flags.Connect,
                                PermissionsBitField.Flags.Speak,
                                PermissionsBitField.Flags.PrioritySpeaker
                            ]
                        },
                        {
                            id: `504887113649750016`,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                                PermissionsBitField.Flags.Connect,
                                PermissionsBitField.Flags.Speak,
                                PermissionsBitField.Flags.PrioritySpeaker
                            ]
                        },
                        {
                            id: guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel]
                        }
                    ]
                });
                userData.temp_channel.created = true
                userData.temp_channel.id = channel.id
                userData.save()
                await newState.guild.members.cache.get(newState.id).voice.setChannel(channel)
            } else if (userData.temp_channel.created === true) {
                let channel = await guild.channels.fetch(userData.temp_channel.id)
                await newState.guild.members.cache.get(newState.id).voice.setChannel(channel)
            }

        }
        const ch_data = await User.findOne({ "temp_channel.id" : oldChannel?.id })
        if (!ch_data) return
        if (ch_data.temp_channel.id === oldChannel?.id) {
            if (oldChannel.members.size <= 0) {
                await oldChannel.delete()
                ch_data.temp_channel.created = false
                ch_data.temp_channel.id = ``
                ch_data.save()
            }
        }
    }
}