const mongoose = require(`mongoose`);

const Guild = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    secret_word: { 
        name: { type: String },
        hint: { type: String }
    },
    act_exp_boost: { type: Number, default: 1}

})

module.exports = { Guild: mongoose.model(`Guild`, Guild) }