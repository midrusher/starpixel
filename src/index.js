require('dotenv').config();
require(`node:events`).setMaxListeners(100)
const winston = require('winston');
const chalk = require(`chalk`)
const { tokenTEST, token, databaseToken, github_token } = process.env;
const { connect } = require(`mongoose`)
const { Client, Collection, GatewayIntentBits, Partials, ActivityType, } = require('discord.js');
const fs = require('fs');
const { DisTube } = require(`distube`);
const { setInterval } = require('timers/promises');
const { transports, format } = require('winston');

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessageReactions, //1
        GatewayIntentBits.DirectMessageTyping, //2
        GatewayIntentBits.DirectMessages, //3
        GatewayIntentBits.GuildBans, //4
        GatewayIntentBits.GuildEmojisAndStickers, //5
        GatewayIntentBits.GuildIntegrations, //6
        GatewayIntentBits.GuildInvites, //7
        GatewayIntentBits.GuildMembers, //8
        GatewayIntentBits.GuildMessageReactions, //9
        GatewayIntentBits.GuildMessageTyping, //10
        GatewayIntentBits.GuildMessages, //11
        GatewayIntentBits.GuildPresences, //12
        GatewayIntentBits.GuildScheduledEvents, //13
        GatewayIntentBits.GuildVoiceStates, //14
        GatewayIntentBits.GuildWebhooks, //15
        GatewayIntentBits.Guilds, //16
        GatewayIntentBits.MessageContent, //17
        GatewayIntentBits.AutoModerationConfiguration, //18
        GatewayIntentBits.AutoModerationExecution, //19


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
    directLink: true,
})

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();
client.voiceManager = new Collection();
client.invites = new Collection()

client.commandArray = [];

let i = 1
const functionFolders = fs.readdirSync(`./${process.cwd()}/src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./${process.cwd()}/src/functions/${folder}`)
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

process.on('warning', e => console.warn(e.stack))

/* const logger = winston.createLogger({
    transports: [
        new transports.File({
            filename: `process.log`,
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: `errors.log`,
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
}) */

