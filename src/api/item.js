"use strict"

const express = require('express');
const itemRouter = express.Router();
const mongoose = require('mongoose')
const Item = require('../models/item')

itemRouter.get('/', (req, res) => {
    // res.send({"data": "item"});
    Item.find({})
        .then((items) => {
            res.json(items)
        })
        .catch(err => res.status(400).send(err))
});

itemRouter.get('/:i_id', (req, res) => {
    const id = req.params.i_id
    Item.find({_id: id})
        .then((item) => {
            res.json(item[0])
        })
        .catch(err => res.status(400).send(err))
});

itemRouter.get('/test', (req, res) => {
    const newItem = new Item({
        "i_name": "snoopy",
        "i_store_name": "Myunmok GS23",
        "i_image": "https://api.salend.tk/res/A1.jpg",
        "i_price": 1500,
        "i_now_price": 1200
    })

    newItem.save()
    .then(p => {
        console.log(p)
        res.redirect('/item')
    });
});
module.exports = itemRouter;


// https://poiemaweb.com/mongoose