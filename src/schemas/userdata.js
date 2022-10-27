const mongoose = require(`mongoose`);

const User = new mongoose.Schema({
    userid: { type: String, unique: true },
    guildid: { type: String, default: `320193302844669959` },
    displayname: {
        rank: { type: String, default: `🦋` },
        name: { type: String, default: `` },
        ramka1: { type: String, default: `` },
        ramka2: { type: String, default: `` },
        symbol: { type: String, default: `👤` },
        premium: { type: String, default: `` },
        suffix: { type: String, default: `` },
        custom_rank: { type: Boolean, default: false }

    },
    rank_number: { type: Number, default: 0 },
    name: { type: String },
    nickname: { type: String, },
    oldnickname: { type: String },
    uuid: { type: String, },
    age: { type: Number, },
    security_code: { type: String, default: `0000` },
    rumbik: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    exp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    gexp: { type: Number, default: 0 },
    pers_emoji: { type: Boolean, default: false },
    tickets: { type: Number, default: 0 },
    cooldowns: {
        daily: { type: Date, default: Date.now() },
        weekly: { type: Date, default: Date.now() },
        monthly: { type: Date, default: Date.now() },

        msgCreateExp: { type: Date, default: Date.now() },
        hw_msgCreate: { type: Date, default: Date.now() },

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

        sun: { type: Date, default: Date.now() },
        mercury: { type: Date, default: Date.now() },
        venera: { type: Date, default: Date.now() },
        mars: { type: Date, default: Date.now() },
        jupiter: { type: Date, default: Date.now() },
        saturn: { type: Date, default: Date.now() },
        uran: { type: Date, default: Date.now() },
        neptune: { type: Date, default: Date.now() },

        premium: { type: Date, default: Date.now() },
        boost: { type: Date, default: Date.now() },
        prestige: { type: Date, default: Date.now() },

        hw_quest: { type: Date, default: Date.now() },
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

    buy: { type: Number, default: 0 },
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
    roles: [String],
    shop_costs: { type: Number, default: 1 },
    king_costs: { type: Number, default: 1 },
    act_costs: { type: Number, default: 1 },
    pers_act_boost: { type: Number, default: 1 },

    act_rewards: { type: Number, default: 0 },

    medal_1: { type: Number, default: 0 },
    medal_2: { type: Number, default: 0 },
    medal_3: { type: Number, default: 0 },

    weekly_exp: { type: Number, default: 0 },
    temp_channel: {
        created: { type: Boolean, default: false },
        id: { type: String, default: `` },
    },

    seasonal: {
        halloween: {
            points: { type: Number, default: 0 },
            quest: {
                id: { type: Number, default: -1 },
                before: { type: Number, default: 0 },
                requirement: { type: Number, default: Infinity },
                finished: { type: Boolean, default: true },
                description: { type: String, default: `` }
            },
            quests_completed: { type: Number, default: 0 },
            achievements: {
                num1: { type: Boolean, default: false },
                num2: { type: Boolean, default: false },
                num3: { type: Boolean, default: false },
                num4: { type: Boolean, default: false },
                num5: { type: Boolean, default: false },
                num6: { type: Boolean, default: false },

            },
            opened_scary: { type: Number, default: 0 },
            hw_msg: { type: Boolean, default: false },
            hw_cosm: { type: Boolean, default: false },
            hw_soul: { type: Boolean, default: false },
        },
        new_year: {
            points: { type: Number, default: 0 },
            advent_calendar: [{
                name: { type: String }
            }]
        },
        easter: {
            points: { type: Number, default: 0 }
        },
        summer: {
            points: { type: Number, default: 0 }
        },
    },
    visited_games: { type: Number, default: 0 },
    stacked_items: [String],
    custom_color: {
        hex: { type: String },
        role: { type: String },
        created: { type: Boolean, default: false }
    }
})

module.exports = { User: mongoose.model(`User`, User) }