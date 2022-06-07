"use strict"

const express = require('express')
const tradeRouter = express.Router();
const Store = require('../models/store')
const Item = require('../models/item')
const Buy = require('../models/buy')

tradeRouter.get('/debug/:id', (req, res) => {
    let response = {};
    Item.findOne({ _id: req.params.id })
        .then(item => {
            console.log(item)
            let value = { item: item.i_name, value: item.i_now_price, id: req.params.id }
            res.render('pay', value)
        })
}); // 결제 페이지

tradeRouter.get('/cancel/:id', (req, res) => {
    const imp_uid = req.query.imp_uid
    const merchant_uid = req.query.merchant_uid
    const imp_success = req.query.imp_success
    const error_msg = req.query.error_msg

    const updateItem = { i_status: 4 }
    Item.findByIdAndUpdate(req.params.id, updateItem)
        .then(item => {
            Item.findOne({ _id: req.params.id })
                .then(item => {
                    if (item == null)
                        res.json({ success: false, msg: "Id에 해당하는 상품이 없습니다." })

                    if (imp_success) {
                        const newBuy = new Buy ({
                            b_ref: imp_uid,
                            b_item: item,
                        })

                        newBuy.save()
                            .then(p => {
                                console.log("==== new Buy ====")
                                console.log(p)
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    }

                    let data = {
                        name: item.i_name,
                        price: item.i_now_price,
                        imp: imp_uid,
                        merchant: merchant_uid,
                        success: imp_success,
                        msg: "" + error_msg
                    }

                    res.render('cancel', data)
                })
        })
});

tradeRouter.post('/:id', (req, res) => {
    let response = {};
    Item.findOne({ _id: req.params.id })
        .then(item => {
            console.log(item)
            let value = { item: item.i_name, value: item.i_now_price }
            res.render('pay', value)
        })
}); // 결제 페이지



tradeRouter.get('/:id', (req, res) => {

}); // 결제 완료 페이지


module.exports = tradeRouter;