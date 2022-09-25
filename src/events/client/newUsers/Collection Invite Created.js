const { User } = require(`../../../schemas/userdata`)
const { Guild } = require(`../../../schemas/guilddata`)
const { ChannelType } = require(`discord.js`)
const chalk = require(`chalk`);
const prettyMilliseconds = require(`pretty-ms`)

module.exports = {
    name: 'inviteCreate',
    async execute(invite) {
        const client = invite.client
        const { invites } = client
        invites.get(invite.guild.id).set(invite.code, invite.uses);
    }
}