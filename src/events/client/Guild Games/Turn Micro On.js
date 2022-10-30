const chalk = require(`chalk`);
const { User } = require(`../../../schemas/userdata`)
const { ReactionCollector, ChannelType, CategoryChannelChildManager, Collection, PermissionsBitField } = require("discord.js");
const { Guild } = require(`../../../schemas/guilddata`)
const ch_list = require(`../../../discord structure/channels.json`)
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        const guild_plugin = await oldState?.client.guilds.fetch(`320193302844669959`) || await newState?.client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.guildgames === false) return
        const guildData = await Guild.findOne({ id: guild_plugin.id })
        if (oldState.mute === newState.mute) return
        if (!newState?.channelId) return
        const newChannel = newState?.channelId
        if (newChannel !== ch_list.guildGamesVoice) return
        console.log(newState?.channelId)
        if (guildData.guildgames.started < 0) return
        await newState.setMute(false)
    }
}