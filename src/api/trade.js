"use strict"

const express = require('express')
const tradeRouter = express.Router();
const Store = require('../models/store')
const Item = require('../models/item')
const Buy = require('../models/buy')

tradeRouter.get('/debug/:id', (req, res) => {
    let response = {};
    Item.findOne({_id: req.params.id})
    .then(item => {
        console.log(item)
        let value = {item: item.i_name, value: item.i_now_price}
        res.render('pay', value)
    })
}); // 결제 페이지

tradeRouter.post('/:id', (req, res) => {
    let response = {};
    Item.findOne({_id: req.params.id})
    .then(item => {
        console.log(item)
        let value = {item: item.i_name, value: item.i_now_price}
        res.render('pay', value)
    })
}); // 결제 페이지



tradeRouter.get('/:id', (req, res) => {

}); // 결제 완료 페이지


module.exports = tradeRouter;