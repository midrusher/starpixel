require('dotenv').config();
const winston = require('winston');
const { tokenTEST, token, databaseToken } = process.env;
const { connect } = require(`mongoose`)
const { Client, Collection, GatewayIntentBits, Partials, ActivityType, } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: 131071,
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ],
    presence: {
        status: `idle`,
        activities: [{
            type: ActivityType.Playing,
            name: `гильдию Starpixel`,
        }]
    }
});

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();
client.voiceManager = new Collection()

client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(`.js`));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

//Handlers
client.handleEvents();
client.handleCommands();
client.handleComponents();

//Items
client.temp_roles();
client.rank_update();
client.act_add();
client.act_remove();
client.act_rewards();


//Profiles
client.updatenicks();
client.top_3_gexp();
client.haspremium();
client.AutoElements();
client.AutoStars();

//Storages
client.wish_birthday();
client.update_members();
client.statsChannel();
client.birthdayChannel();



client.login(token);
(async () => {
    await connect(databaseToken).catch(console.error)
})();

