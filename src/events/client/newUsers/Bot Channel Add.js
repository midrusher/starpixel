const chalk = require(`chalk`);
const { EmbedBuilder } = require("discord.js");
const { Guild } = require(`../../../schemas/guilddata`)
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        const guild_plugin = await oldMember.client.guilds.fetch(`320193302844669959`)
        const pluginData = await Guild.findOne({ id: guild_plugin.id })
        if (pluginData.plugins.user_updates === false) return
        const guild = await oldMember.client.guilds.fetch(`320193302844669959`)
        const forumChannel = await guild.channels.fetch(`1019649781460639865`)
        const threadChannel = await forumChannel.threads.fetch(`1032002235938381834`)
        if (!oldMember.roles.cache.has(`504887113649750016`) && newMember.roles.cache.has(`504887113649750016`)) {
            await threadChannel.members.add(newMember.user.id, `Вступил в гильдию`)
        } else if (oldMember.roles.cache.has(`504887113649750016`) && !newMember.roles.cache.has(`504887113649750016`)) {
            await threadChannel.members.remove(newMember.user.id, `Покинул гильдию`)
        }
    }
}