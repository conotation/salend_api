const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    s_email: {
        type: String,
        required: true
    },
    s_pw: {
        type: String,
        required: true,
        min: 0
    },
    s_name: {
        type: String,
        required: true
    },
    s_location: {
        type: String,
        required: true
    },
    s_time: {
        type: String,
        required: true
    },
    s_image: {
        type: String
    },
    s_tag: {
        type: Array
    }
    
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store


// https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify