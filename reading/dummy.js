const mongoose = require('mongoose')

const Item = require('./models/item')

mongoose.connect('mongodb://localhost:27017/items', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("OPEN!!")
    })
    .catch(err => {
        console.log("ERROR!!")
    })

const p = new Item({
    "i_name": "snoopy",
    "i_store_name": "Myunmok GS23",
    "i_image": "https://api.salend.tk/res/A1.jpg",
    "i_price": 1500,
    "i_now_price": 1200
})

p.save().then(p => {
    console.log(p)
}).catch(e => {
    console.log(e)
})
