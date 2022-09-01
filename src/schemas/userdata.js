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
        prof_create: { type: Date, default: Date.now() },
        spet: { type: Date, default: Date.now() },
        epet: { type: Date, default: Date.now() },
        lpet: { type: Date, default: Date.now() },
        mpet: { type: Date, default: Date.now() },
        earth: { type: Date, default: Date.now() },
        air: { type: Date, default: Date.now() },
        water: { type: Date, default: Date.now() },
        fire: { type: Date, default: Date.now() },
        
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
    },
    elements: {
        //Земля
        underground: { type: Number, default: 0, max: 1, min: 0 },
        fast_grow: { type: Number, default: 0, max: 1, min: 0 },
        mountains: { type: Number, default: 0, max: 1, min: 0 },
        //Вода
        diving: { type: Number, default: 0, max: 1, min: 0 },
        resistance: { type: Number, default: 0, max: 1, min: 0 },
        respiration: { type: Number, default: 0, max: 1, min: 0 },
        //Огонь
        fire_resistance: { type: Number, default: 0, max: 1, min: 0 },
        lightning: { type: Number, default: 0, max: 1, min: 0 },
        flame: { type: Number, default: 0, max: 1, min: 0 },
        //Земля
        flying: { type: Number, default: 0, max: 1, min: 0 },
        wind: { type: Number, default: 0, max: 1, min: 0 },
        eagle_eye: { type: Number, default: 0, max: 1, min: 0 },  
    }, 
    warns: { type: Number, default: 0 },
    
})

module.exports = { User: mongoose.model(`User`, User) }