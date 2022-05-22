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
    },
    s_location: {
        type: String,
    },
    s_time: {
        type: String,
    },
    s_image: {
        type: String
    },
    s_lat: {
        type: Number
    },
    s_lon: {
        type: Number
    },
    s_tag: {
        type: Array
    }
    
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store


// https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify