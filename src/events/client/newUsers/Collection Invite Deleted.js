const { User } = require(`../../../schemas/userdata`)
const { Guild } = require(`../../../schemas/guilddata`)
const { ChannelType } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`)
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: 'inviteDelete',
    async execute(invite) {
        const client = invite.client
        const { invites } = client
        invites.get(invite.guild.id).delete(invite.code);
    }
}