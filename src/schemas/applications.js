const mongoose = require(`mongoose`);

const Apply = new mongoose.Schema({
    guildid: { type: String },
    userid: { type: String },

    que1: { type: String, default: `` },
    que2: { type: String, default: `` },
    que3: { type: String, default: `` },
    que4: { type: String, default: `` },
    que5: { type: String, default: `` },

    secondPartID: { type: String, default: `` },
    applicationid: { type: String, default: ``},
    applied: { type: Boolean, default: false },
    status: { type: String, default: ``},

    que6: { type: String, default: `` },
    que7: { type: String, default: `` },

    off1: { type: String, default: `` },
    off2: { type: String, default: `` },
    off3: { type: String, default: `` },
})

module.exports = { Apply: mongoose.model(`Apply`, Apply) }