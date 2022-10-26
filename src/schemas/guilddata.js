const mongoose = require(`mongoose`);

const Guild = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    secret_word: {
        name: { type: String },
        hint: { type: String }
    },
    act_exp_boost: { type: Number, default: 1 },
    cooldowns: {

    },
    logs: {
        webhook_url: { type: String },
        webhook_token: { type: String },
        webhook_id: { type: String },
        log_channel: { type: String }
    },
    plugins: {
        items: { type: Boolean, default: true },
        cosmetics: { type: Boolean, default: true },
        achievements: { type: Boolean, default: true },
        pets: { type: Boolean, default: true },
        nick_system: { type: Boolean, default: true },
        premium: { type: Boolean, default: true },
        birthday: { type: Boolean, default: true },
        welcome: { type: Boolean, default: true },
        tickets: { type: Boolean, default: true },
        moderation: { type: Boolean, default: true },
        security: { type: Boolean, default: true },
        temp_channels: { type: Boolean, default: true },
        bot_dms: { type: Boolean, default: true },
        logs: { type: Boolean, default: true },
        temp_roles: { type: Boolean, default: true },
        auto_roles: { type: Boolean, default: true },
        user_updates: { type: Boolean, default: true },
        channels: { type: Boolean, default: true },
        gexp: { type: Boolean, default: true },
        music: { type: Boolean, default: true },
        seasonal: { type: Boolean, default: true },
        guildgames: { type: Boolean, default: true },

        removed: {
            recording: { type: Boolean, default: true },
        }
    },
    hypixel_lvl: { type: Number, default: 0 },

    shop: [{
        price: { type: Number },
        name: { type: String },
        code: { type: String },
        shop_type: { type: String },
        roleid: [{ type: String }]
    }],

    seasonal: {
        halloween: {
            enabled: { type: Boolean, default: false },
            channels: [{
                id: { type: String }
            }]

        },
        new_year: {
            enabled: { type: Boolean, default: false },
            channels: [{
                id: { type: String }
            }],
            advent_msgs: {
                msg1: { type: String },
                msg2: { type: String },
            }

        },
        easter: {
            enabled: { type: Boolean, default: false },
            channels: [{
                id: { type: String }
            }]

        },
        summer: {
            enabled: { type: Boolean, default: false },
            channels: [{
                id: { type: String }
            }]

        },
    },

    guildgames: {
        gamestart_min: { type: Number, default: 0 },
        gamestart_hour: { type: Number, default: 0 },
        gameend_min: { type: Number, default: 0 },
        gameend_hour: { type: Number, default: 0 },
        pregame_song: { type: String },
        game_days: [String],
        officers: [{
            id: { type: String },
            day: { type: String }
        }],
        music: [{
            link: { type: String },
            chance: { type: Number }
        }],
        started: { type: Number, default: 0 },
        games: [{
            id: { type: String },
            played: { type: Number, default: 0 }
        }],
        gameType: { type: String, default: `Традиционная` },
        music: [{
            link: { type: String },
            usedTimes: { type: Number, default: 0 },
            sent: { type: String }
        }],
        temp_leader: { type: String }
    }
})

module.exports = { Guild: mongoose.model(`Guild`, Guild) }