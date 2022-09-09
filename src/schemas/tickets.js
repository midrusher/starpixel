const mongoose = require(`mongoose`);

const Tickets = new mongoose.Schema({
    guildid: { type: String },
    id: { type: Number, default: 0},
    support: { type: String }
})

module.exports = { Tickets: mongoose.model(`Tickets`, Tickets) }