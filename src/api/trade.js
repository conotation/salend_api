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

// 디버깅용인데 사실상 끝까지 쓸듯함


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

tradeRouter.get('/buys', (req, res) => {
    if (!req.query.buys)
        res.status(409).json({success: false, msg: "hasn't parameter"})
    const buys_arr = req.query.buys.replace("%20", " ").split(" ")

    Buy.find({'b_ref': {"$in" : buys_arr}})
    .then((buy) => {
        res.json({buys: buy})
    })
    .catch(e => {
        console.log(e);
        res.status(400).json({success: false, msg: "Get Buylist failed"})
    })
});

/**
 * 결제내역
 * 
 * @api {GET} /pay/buys 매장 찜 목록 검색 (매장 다중 검색)
 * 
 * @apiName getBuys
 * @apiGroup Buy
 * @apiVersion 1.0.0
 * @apiDescription 결제내역 조회 (이하 내역 수정예정)
 * 
 * @apiParam (Query string) {String} buys 결제 아이디
 * ```
 * buys=1, 2, 3, 4
 * Using
 * String str = arraylist.toString().replace("[", "").replace("]", "").replace(",", "");
 * ```
 *
 * @TODO 추가예정
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 * stores: [
 *   {
 *     "_id":"628a036eba4830dcea124c88",
 *     "s_name":"GS21",
 *     "s_address":"서울시 면목동",
 *     "s_time":"00:00-23:59",
 *     "s_image":"https://api.salend.tk/res/image01.jpg",
 *     "s_lat":44.2,
 *     "s_lng":33.1,
 *     "s_tag":[]
 *   }
 *  ]
 * }
 * 
 * @apiError (Error 400) {boolean} success 성공 여부
 * @apiError (Error 400) {String} msg 에러 메시지를 반환합니다
 * 
 * @apiErrorExample {json} Response (example):
 * {
 *  success: false,
 *  msg: "Get Buylist failed"
 * }
 */

// TODO 결제 아이디 리스트오면 리스트 반환 API 구현 예정

// 모바일 결제 종료/취소 페이지

module.exports = tradeRouter;