const mongoose = require(`mongoose`);

const Temp = new mongoose.Schema({
    guildid: { type: String },
    userid: { type: String},
    roleid: { type: String },
    expire: { type: Date }

})

module.exports = { Temp: mongoose.model(`Temp`, Temp) }