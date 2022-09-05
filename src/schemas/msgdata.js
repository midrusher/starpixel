const mongoose = require(`mongoose`);

const MsgData = new mongoose.Schema({
    guildid: { type: String },
    messages: [{
        id: Number,
        content: String,
        author: String,
        expire: { type: Date}
    }],
})

module.exports = { MsgData: mongoose.model(`MsgData`, MsgData) }