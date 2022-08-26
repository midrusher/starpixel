const mongoose = require(`mongoose`);

const User = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, unique: true },
    rumbik: { type: Number, default: 0 },
    rank: { type: Number, default: 0, max: 25000 },
    exp: { type: Number, default: 0 },
    totalexp: { type: Number, default: 0 },
    level: { type: Number, default: 0},
    tickets: { type: Number, default: 0},
    cooldowns: {
        daily: { type: Date },
        weekly: { type: Date },
        monthly: { type: Date },
        msgCreateExp: { type: Date }
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
    }
})

module.exports = { User: mongoose.model(`User`, User) }