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
        if (!member.roles.cache.has(`850336260265476096`)) return
        const premChannel = `838300965358010439`

        if (newChannel?.id === premChannel) {
            if (userData.temp_channel.created === false) {
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

        if (oldChannel?.id === userData.temp_channel.id) {
            if (oldChannel.members.size <= 0) {
                await oldChannel.delete()
                userData.temp_channel.created = false
                userData.temp_channel.id = ``
                userData.save()
            }
        }
    }
}