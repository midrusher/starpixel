require('dotenv').config();
const winston = require('winston');
const chalk = require(`chalk`)
const { tokenTEST, token, databaseToken, github_token } = process.env;
const { connect } = require(`mongoose`)
const { Client, Collection, GatewayIntentBits, Partials, ActivityType, } = require('discord.js');
const fs = require('fs');
const { DisTube } = require(`distube`);
const { setInterval } = require('timers/promises');




const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,


    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
    ],
    presence: {
        status: `online`,
        activities: [{
            type: ActivityType.Watching,
            name: `за открытием коробок`,
        }]
    }
});

client.distube = new DisTube(client, {
    leaveOnEmpty: true,
    emptyCooldown: 300,
    leaveOnFinish: false,
    leaveOnStop: false,
    savePreviousSongs: true,
    searchSongs: 5,
    searchCooldown: 30,
    nsfw: true,
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: true,
    joinNewVoiceChannel: true,
    directLink: true
})

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();
client.voiceManager = new Collection();
client.invites = new Collection()

client.commandArray = [];

let i = 1
const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(`.js`));
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
        console.log(chalk.hex(`#3d1b33`)(`[ЗАГРУЗКА ФУНКЦИЙ] ${i++}. ${file} был успешно загружен!`))
    }

}
//Handlers
client.handleCommands();
client.handleComponents();
client.repeatFunctions();
client.handleEvents();

client.login(token);
(async () => {
    await connect(databaseToken).catch(console.error)
})();

