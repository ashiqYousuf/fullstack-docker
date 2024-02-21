const mongoose = require('mongoose')


const entries = new mongoose.Schema({
    entryId: {
        type: Number,
        default: 32201,
    }
})

const Entries = mongoose.model('Entries', entries)

module.exports = Entries;
