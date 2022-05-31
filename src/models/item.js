const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    i_name: {
        type: String,
        required: true
    },
    i_store_name: {
        type: String,
        required: true
    },
    i_store_id: {
        type: String,
        required: true
    },
    i_image: {
        type: String,
    },
    i_price: {
        type: Number,
        required: true,
        min: 0
    },
    i_now_price: {
        type: Number,
        required: true,
        min: 0
    },
    i_exp: {
        type: String,
    },
    i_status: {
        type: Number,
        min: 0,
        max: 3,
        default: 0
    },
    i_tag: {
        type: Number,
        min: 0,
        max: 7
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item


// https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify