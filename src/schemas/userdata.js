const mongoose = require(`mongoose`);

const User = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String  },
    nickname: { type: String, },
    uuid: {type: String, },
    security_code: { type: String, },
    rumbik: { type: Number, default: 0 },
    rank: { type: Number, default: 0, max: 25000 },
    exp: { type: Number, default: 0 },
    totalexp: { type: Number, default: 0 },
    level: { type: Number, default: 0},
    gexp: { type: Number, default: 0},
    tickets: { type: Number, default: 0},
    cooldowns: {
        daily: { type: Date, default: Date.now() },
        weekly: { type: Date, default: Date.now() },
        monthly: { type: Date, default: Date.now() },
        msgCreateExp: { type: Date, default: Date.now() },
        prof_update: { type: Date, default: Date.now() }, 
        prof_create: { type: Date, default: Date.now() }
    },
    perks: {
        rank_boost: { type: Number, default: 0, max: 6 },
        shop_discount: { type: Number, default: 0, max: 4 },
        king_discount: { type: Number, default: 0, max: 4 },
        act_discount: { type: Number, default: 0, max: 3 },
        temp_items: { type: Number, default: 0, max: 1 },
        sell_items: { type: Number, default: 0, max: 1 },
        ticket_discount: { type: Number, default: 0, max: 5 },
        change_items: { type: Number, default: 0, max: 4 },
    },
    achievements: {
        normal: { type: Number, max: 25, default: 0, min: 0 },
        mythical: { type: Number, max: 5, default: 0, min: 0 },
    },
    buy: { type: Number, default: 0},
    sell: {
        comet: { type: Number, default: 0 },
        constellation: { type: Number, default: 0 },
    }
})

module.exports = { User: mongoose.model(`User`, User) }