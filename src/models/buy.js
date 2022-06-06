const mongoose = require('mongoose')

const buySchema = new mongoose.Schema({
    b_ref: {
        type: String,
        required: true
    },
    b_item: {
        type: String,
        required: true,
        get: (data) => {
            try {
                return JSON.parse(data);
            } catch (err) {
                return data;
            }
        },
        set: (data) => {
            return JSON.stringify(data);
        }
    },
    b_date: {
        type: Date, 
        default: Date.now
    }
})

const Buy = mongoose.model('Buy', buySchema)

module.exports = Buy


