const mongoose = require(`mongoose`);

const Birthday = new mongoose.Schema({
    guildid: { type: String },
    userid: { type: String },
    day: { type: Number },
    month: { type: Number },
    year: { type: Number }
})

module.exports = { Birthday: mongoose.model(`Birthday`, Birthday) }