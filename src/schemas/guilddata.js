const mongoose = require(`mongoose`);

const Guild = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String },
    secret_word: { 
        name: { type: String },
        hint: { type: String }
    }

})

module.exports = { Guild: mongoose.model(`Guild`, Guild) }