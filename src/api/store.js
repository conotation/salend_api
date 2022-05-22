"use strict"

const express = require('express');
const storeRouter = express.Router();
const path = require('path')
const fs = require('fs')
const Store = require('../models/store')

/**
 * 가게 정보
 * 
 * @api {get} /store 가게 쿼리 요청
 * 
 * @apiName getStores
 * @apiGroup Store
 * @apiVersion 1.0.0
 * @apiDescription 가게 정보를 요청합니다.
 * 
 * @apiSuccess {Array[Store]} _ Store 배열
 * @apiSuccess {String} _id 가게에 해당하는 Id
 * @apiSuccess {String} i_name 가게명
 * @apiSuccess {String} i_store_name 
 * @apiSuccess {String} i_image
 * @apiSuccess {Number} i_price
 * @apiSuccess {Number} i_now_price
 * @apiSuccess {Number} i_status
 * @apiSuccess {Number} __v
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 *     [
 *         {
 *          "_id":"6288e7d2e747d7702b9c4986",
 *          "i_name":"snoopy",
 *          "i_store_name":"Myunmok GS23",
 *          "i_image":"https://api.salend.tk/res/A1.jpg",
 *          "i_price":1500,
 *          "i_now_price":1200,
 *          "i_status":0,
 *          "__v":0
 *          }
 *     ]
 * }
 * 
 * @apiError (Error 400) {boolean} success 성공 여부
 * @apiError (Error 400) {String} msg 에러 메시지를 반환합니다
 * 
 * @apiErrorExample {json} Response (example):
 * {
 *  success: false,
 *  msg: "Search Error"
 * }
 */

 storeRouter.get('/', (req, res) => {
    var response = {}
    Store.find({})
        .then((stores) => {
            res.json({stores: stores});
        })
        .catch(err => {
            response = { success: false, msg:"Search Error"}
            res.status(400).json(response)
        })
});

/**
 * 가게 정보
 * 
 * @api {get} /store/:_id/ 단일 가게 쿼리 요청
 * 
 * @apiName getStore
 * @apiGroup Store
 * @apiVersion 1.0.0
 * @apiDescription id에 해당하는 가게 정보를 요청합니다.
 * 
 * @apiParam (Parameter) {String} _id 가게 ID
 * 
 * @apiSuccess {Store} _
 * @apiSuccess {String} _id
 * @apiSuccess {String} i_name
 * @apiSuccess {String} i_store_name
 * @apiSuccess {String} i_image
 * @apiSuccess {Number} i_price
 * @apiSuccess {Number} i_now_price
 * @apiSuccess {Number} i_status
 * @apiSuccess {Number} __v
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 *    "_id":"6288e7d2e747d7702b9c4986",
 *    "i_name":"snoopy",
 *    "i_store_name":"Myunmok GS23",
 *    "i_image":"https://api.salend.tk/res/A1.jpg",
 *    "i_price":1500,
 *    "i_now_price":1200,
 *    "i_status":0,
 *    "__v":0
 * }
 * 
 * @apiError (Error 400) {boolean} success 성공 여부
 * @apiError (Error 400) {String} msg 에러 메시지를 반환합니다
 * 
 * @apiErrorExample {json} Error (example):
 * {
 *  success: false,
 *  msg: "Not Found Store"
 * }
 * 
 */

storeRouter.get('/test', (req, res) => {
    var response = {};

    const newStore = new Store({
        "s_email": "qwerasdf",
        "s_pw": "1234"
    })

    newStore.save()
    .then(p => {
        console.log(p)
        res.redirect('/store')
    }).catch(err => {
        response = { success: false, msg:"Testcase Create Failed" }
        res.status(400).json(response)
    });
});

storeRouter.get('/test/:_id', (req, res) => {
    var response = {};
    var id = req.params._id;

    const updateStore = {
        s_name: "GS21",
        s_location: "서울시 면목동",
        s_time: "00:00-23:59",
        s_image: "https://api.salend.tk/res/image01.jpg",
        s_lat: 0.0,
        s_lng: 0.0        
    }

    Store.findByIdAndUpdate(id, updateStore)
    .then(p => {
        console.log(p)
        res.redirect('/store')
    }).catch(err => {
        console.log(err)
        response = { success: false, msg: "Store Updated Failed" }
        res.status(400).json(response)
    });

});

storeRouter.get('/:s_id', (req, res) => {
    const id = req.params.s_id;
    var response = {};

    Store.find({_id: id}, {s_pw: false})
        .then((store) => {
            res.json(store[0])
        })
        .catch(err => {
            response = { success: false, msg:"Not Found Store"}
            res.status(400).json(response)
        })
});
module.exports = storeRouter;