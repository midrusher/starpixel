const mongoose = require(`mongoose`);

const Guild = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    secret_word: { 
        name: { type: String },
        hint: { type: String }
    },
    act_exp_boost: { type: Number, default: 1},
    cooldowns: {
        top_3_gexp: { type: Date, default: Date.now() }
    },
    logs: {
        webhook_url: { type: String },
        webhook_token: { type: String },
        webhook_id: { type: String },
        log_channel: { type: String }
    },
    plugins: {
        boxes: { type: Boolean, default: true},
        cosmetics: { type: Boolean, default: true},
        achievements: { type: Boolean, default: true},
        pets: { type: Boolean, default: true},
        act_exp: { type: Boolean, default: true},
        rank_exp: { type: Boolean, default: true},
        shop: { type: Boolean, default: true},
        nick_system: { type: Boolean, default: true},
        premium: { type: Boolean, default: true},
        birthday: { type: Boolean, default: true},
        welcome: { type: Boolean, default: true},
        tickets: { type: Boolean, default: true},
        moderation: { type: Boolean, default: true},
        security: { type: Boolean, default: true},
        temp_channels: { type: Boolean, default: true},
        bot_dms: { type: Boolean, default: true},
        logs: { type: Boolean, default: true},
        temp_roles: { type: Boolean, default: true},
        auto_roles: { type: Boolean, default: true},
        user_updates: { type: Boolean, default: true},
        channels: { type: Boolean, default: true},
        gexp: { type: Boolean, default: true},
        music: { type: Boolean, default: true},
    },
    hypixel_lvl: { type: Number, default: 0 }

})

module.exports = { Guild: mongoose.model(`Guild`, Guild) }