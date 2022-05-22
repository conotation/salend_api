"use strict"

const express = require('express');
const itemRouter = express.Router();
const mongoose = require('mongoose')
const Item = require('../models/item')

itemRouter.get('/', (req, res) => {
    var response = {}
    Item.find({__v: false})
        .then((items) => {
            res.json({items: items})
        })
        .catch(err => {
            response = { success: false, msg:"Item Search Error"}
            res.status(400).json(response)
        })
});

/**
 * 상품 정보
 * 
 * @api {get} /item 상품 쿼리 요청
 * 
 * @apiName getItems
 * @apiGroup Item
 * @apiVersion 1.0.0
 * @apiDescription 상품 정보를 요청합니다.
 * 
 * @apiSuccess {Array[Item]} Items item 배열
 * @apiSuccess {String} _id 상품 고유 Id
 * @apiSuccess {String} i_name 상품 이름
 * @apiSuccess {String} i_image 상품 이미지
 * @apiSuccess {String} i_store_name 상품 해당 매장
 * @apiSuccess {String} i_exp 상품 유통기한
 * @apiSuccess {Number} i_price 상품 정가
 * @apiSuccess {Number} i_now_price 상품 할인가
 * @apiSuccess {Number} i_status 상품 상태
 * @apiSuccess {Number} i_tag 상품 카테고리
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 * stores: [
 *   {
 *     "_id":"6288e7d2e747d7702b9c4986",
 *     "i_name":"snoopy",
 *     "i_image":"https://api.salend.tk/res/A1.jpg",
 *     "i_store_name":"Myunmok GS23",
 *     "i_exp":"2022-05-22",
 *     "i_price":1500,
 *     "i_now_price":1200,
 *     "i_status":0,
 *     "i_tag": 0
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
 *  msg: "Item Search Error"
 * }
 */


itemRouter.get('/test', (req, res) => {
    const newItem = new Item({
        "i_name": "snoopy",
        "i_store_name": "Myunmok GS23",
        "i_image": "https://api.salend.tk/res/A1.jpg",
        "i_price": 1500,
        "i_now_price": 1200,
        "i_exp": "2022-12-31"
    })

    newItem.save()
    .then(p => {
        console.log(p)
        res.redirect('/item')
    }).catch(err => {
        response = { success: false, msg:"Testcase Create Failed" }
        res.status(400).json(response)
    });
});

itemRouter.get('/:i_id', (req, res) => {
    const id = req.params.i_id
    var response = {}
    Item.find({_id: id})
        .then((item) => {
            res.json(item[0])
        })
        .catch(err => {
            response = { success: false, msg:"Not Found Item"}
            res.status(400).json(response)
        })
});

/**
 * 상품 정보
 * 
 * @api {get} /item/:_id 단일 상품 쿼리 요청
 * 
 * @apiName getItem
 * @apiGroup Item
 * @apiVersion 1.0.0
 * @apiDescription 상품 정보를 요청합니다.
 * 
 * @apiSuccess {Item} _ 상품
 * @apiSuccess {String} _id 상품 고유 Id
 * @apiSuccess {String} i_name 상품 이름
 * @apiSuccess {String} i_image 상품 이미지
 * @apiSuccess {String} i_store_name 상품 해당 매장
 * @apiSuccess {String} i_exp 상품 유통기한
 * @apiSuccess {Number} i_price 상품 정가
 * @apiSuccess {Number} i_now_price 상품 할인가
 * @apiSuccess {Number} i_status 상품 상태
 * @apiSuccess {Number} i_tag 상품 카테고리
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 *   "_id":"6288e7d2e747d7702b9c4986",
 *   "i_name":"snoopy",
 *   "i_image":"https://api.salend.tk/res/A1.jpg",
 *   "i_store_name":"Myunmok GS23",
 *   "i_exp":"2022-05-22",
 *   "i_price":1500,
 *   "i_now_price":1200,
 *   "i_status":0,
 *   "i_tag": 0
 * }
 * 
 * @apiError (Error 400) {boolean} success 성공 여부
 * @apiError (Error 400) {String} msg 에러 메시지를 반환합니다
 * 
 * @apiErrorExample {json} Response (example):
 * {
 *  success: false,
 *  msg: "Item Search Error"
 * }
 */

module.exports = itemRouter;


// https://poiemaweb.com/mongoose