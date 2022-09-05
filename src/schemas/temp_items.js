const mongoose = require(`mongoose`);

const Temp = new mongoose.Schema({
    guildid: { type: String },
    userid: { type: String },
    roleid: { type: String },
    boost: { type: Boolean, default: false },
    shop_disc: { type: Boolean, default: false },
    expire: { type: Date }
})

module.exports = { Temp: mongoose.model(`Temp`, Temp) }