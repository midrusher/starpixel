const chalk = require(`chalk`);
const { ReactionCollector } = require("discord.js");
const { Guild } = require(`../../../schemas/guilddata`)
const { isURL } = require(`../../../functions`)
const linksInfo = require(`../../../discord structure/links.json`)

module.exports = {
    name: 'threadCreate',
    async execute(thread, newlyCreated) {
        await thread.join()
    }
}