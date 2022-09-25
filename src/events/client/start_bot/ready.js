const chalk = require(`chalk`);
const wait = require("timers/promises").setTimeout;
const { Collection } = require(`discord.js`)

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await wait(1000)
        console.log(chalk.blue(`[Бот Starpixel] Бот был успешно запущен!`))
        const { invites } = client
        client.guilds.cache.forEach(async (guild) => {
            // Fetch all Guild Invites
            const firstInvites = await guild.invites.fetch();
            // Set the key as Guild ID, and create a map which has the invite code, and the number of uses
            await invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
            console.log(chalk.blue(`[Бот Starpixel] Приглашения обработаны!`))
        });
    }
}