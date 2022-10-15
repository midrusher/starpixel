const mongoose = require(`mongoose`);

const ClientSettings = new mongoose.Schema({
    clientid: { type: String, default: `883421063369859122` },
    testmode: { type: Boolean, default: false },
})

module.exports = { ClientSettings: mongoose.model(`ClientSettings`, ClientSettings) }