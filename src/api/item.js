"use strict"
// Item i_store_id 추가

const express = require('express');
const itemRouter = express.Router();
const mongoose = require('mongoose')
const Item = require('../models/item')

itemRouter.get('/', (req, res) => {
    let response = {}
    Item.find({__v: false})
        .then((items) => {
            res.json({items: items})
        })
        .catch(err => {
            console.log(err)
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

//--------------------------------------------------------------

itemRouter.post('/', (req, res) => {    // 아이탬 생성
    let response = {}

    let i_store_id = req.body.i_store_id;

    if(i_store_id == undefined) {
        response = { success: false, msg: "Param Error"}
        res.status(400).json(response);
    }

    let i_name = req.body.i_name;
    let i_store_name = req.body.i_store_name;
    let i_image = req.body.i_image || "https://api.salend.tk/res/default.png";
    let i_price = req.body.i_price;
    let i_now_price = req.body.i_now_price;
    let i_exp = req.body.i_exp;

    const newItem = new Item({
        "i_name": i_name,
        "i_store_name": i_store_name,
        "i_store_id": i_store_id,
        "i_image": i_image,
        "i_price": i_price,
        "i_now_price": i_now_price,
        "i_exp": i_exp
    })

    newItem.save()
    .then(p => {
        console.log(p)
        res.json(p)
    }).catch(err => {
        console.log(err)
        response = { success: false, msg:"Item Create Failed" }
        res.status(400).json(response)
    });
});

/**
 * 매장 정보
 * 
 * @api {post} /item 상품 추가
 * 
 * @apiName addItem
 * @apiGroup Item
 * @apiVersion 1.0.0
 * @apiDescription 상품을 추가합니다.
 * 
 * @apiParam (Body) {String} i_name 상품 이름
 * @apiParam (Body) {String} i_store_name 상품의 매장 이름 
 * @apiParam (Body) {String} i_store_id 상품의 매장 Id
 * @apiParam (Body) {String} i_image 상품 이미지
 * @apiParam (Body) {Number} i_price 상품 가격
 * @apiParam (Body) {Number} i_now_price 상품의 할인 가격
 * @apiParam (Body) {String} i_exp 상품 유통 기한
 * @apiParam (Body) {Number} i_status 상품 상태
 * 
 * @apiSuccess {Store} _ 상품
 * @apiSuccess {String} _id 매장 고유 Id
 * @apiSuccess {String} i_name 상품 이름
 * @apiSuccess {String} i_store_name 상품 매장 이름
 * @apiSuccess {String} i_store_id 상품의 매장 Id
 * @apiSuccess {String} i_image 상품 이미지
 * @apiSuccess {Number} i_price 상품 가격
 * @apiSuccess {Number} i_now_price 상품의 할인 가격
 * @apiSuccess {String} i_exp 상품 유통 기한
 * @apiSuccess {Number} i_status 상품 상태
 * @apiSuccess {Number} i_tag 상품 분류 태그
 * 
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 *   "_id":"6288e7d2e747d7702b9c4986",
 *   "i_name":"snoopy",
 *   "i_image":"https://api.salend.tk/res/A1.jpg",
 *   "i_store_name":"Myunmok GS23",
 *   "i_store_id": ""
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
 *  msg: "Item Create Failed"
 * }
 */

itemRouter.put('/:_id', (req, res) => {     // 아이템 수정
    let response = {}

    let i_id = req.params._id;
    if(i_id == undefined) {
        response = { success: false, msg: "Param Error" }
        res.status(400).json(response)
    }

    let i_name = req.body.i_name;
    let i_store_name = req.body.i_store_name;
    let i_store_id = req.body.i_store_id;
    let i_image = req.body.i_image || "https://api.salend.tk/res/default.png";
    let i_price = req.body.i_price;
    let i_now_price = req.body.i_now_price;
    let i_exp = req.body.i_exp;
    let i_status = req.body.i_status
    let i_tag = req.body.i_tag

    const updateItem = {
        "i_name": i_name,
        "i_store_name": i_store_name,
        "i_store_id": i_store_id,
        "i_image": i_image,
        "i_price": i_price,
        "i_now_price": i_now_price,
        "i_exp": i_exp,
        "i_status": i_status,
        "i_tag": i_tag
    }

    Object.keys(updateItem).forEach(key => updateItem[key] === undefined ? delete updateItem[key] : {});

    console.log(updateItem)

    Item.findByIdAndUpdate(i_id, updateItem)
    .then(p => {
        console.log(p)
        res.json(p)
    }).catch(err => {
        console.log(err)
        response = { success: false, msg:"Item Update Failed" }
        res.status(400).json(response)
    });
});

/**
 * @api {put} /item/:id 상품 변경
 * 
 * @apiName modifyItem
 * @apiGroup Item
 * @apiVersion 1.0.0
 * @apiDescription 상품 정보를 변경합니다. 
 * 
 * @apiParam (Body) {String} i_name 상품 이름 *
 * @apiParam (Body) {String} i_store_name 상품의 매장 이름 * 
 * @apiParam (Body) {String} i_store_id 상품의 매장 Id *
 * @apiParam (Body) {String} i_image 상품 이미지 *
 * @apiParam (Body) {Number} i_price 상품 가격 *
 * @apiParam (Body) {Number} i_now_price 상품의 할인 가격 *
 * @apiParam (Body) {String} i_exp 상품 유통 기한 *
 * @apiParam (Body) {Number} i_status 상품 상태 *
 * 
 * @apiSuccess {Store} _ 상품
 * @apiSuccess {String} _id 매장 고유 Id
 * @apiSuccess {String} i_name 상품 이름
 * @apiSuccess {String} i_store_name 상품 매장 이름
 * @apiSuccess {String} i_store_id 상품의 매장 Id
 * @apiSuccess {String} i_image 상품 이미지
 * @apiSuccess {Number} i_price 상품 가격
 * @apiSuccess {Number} i_now_price 상품의 할인 가격
 * @apiSuccess {String} i_exp 상품 유통 기한
 * @apiSuccess {Number} i_status 상품 상태
 * @apiSuccess {Number} i_tag 상품 분류 태그
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 *   "_id":"6288e7d2e747d7702b9c4986",
 *   "i_name":"snoopy",
 *   "i_image":"https://api.salend.tk/res/A1.jpg",
 *   "i_store_name":"Myunmok GS23",
 *   "i_store_id": ""
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
 *  msg: "Item Update Failed"
 * }
 * 
 */

itemRouter.get('/nearby', async (req, res) => {
    let response = {}
    let loc = req.query._loc;
    if(loc == null || loc == undefined) {
        response = {success: false, msg: "not found params"}
        res.status(400).json(response)
        return;
    }
    console.log(loc.split("%2C"));

    let nearby = await Item.find({})
    let endtime = await Item.find({});

    res.json({near_by: nearby, end_time: endtime})
});

/**
 * 상품 정보
 * 
 * @api {get} /item/nearby/?_loc=lat,lng 주위 상품 요청
 * 
 * @apiName getNearbyItem
 * @apiGroup Item
 * @apiVersion 1.0.0
 * @apiDescription 주변 상품 정보와 마감임박 상품을 요청합니다.
 * 
 * @apiParam (Query string) {Number} _loc 위도 경도
 * ```
 * _loc=90.4,123.1
 * ```
 * 
 * @apiSuccess {Array(Item)} near_by 주변 상품
 * @apiSuccess {Array(Item)} end_time 마감 임박 상품
 * @apiSuccess {Item} _ 상품
 * @apiSuccess {String} _id 상품 고유 Id
 * @apiSuccess {String} i_name 상품 이름
 * @apiSuccess {String} i_image 상품 이미지
 * @apiSuccess {String} i_store_name 상품 해당 매장의 이름
 * @apiSuccess {String} i_store_id 상품 해당 매장의 Id
 * @apiSuccess {String} i_exp 상품 유통기한
 * @apiSuccess {Number} i_price 상품 정가
 * @apiSuccess {Number} i_now_price 상품 할인가
 * @apiSuccess {Number} i_status 상품 상태
 * @apiSuccess {Number} i_tag 상품 카테고리
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 *   "near_by": [
 *     "Items..."
 *   ],
 *   "end_time": [
 *     "Items..."
 *   ]
 * }
 * 
 * @apiError (Error 400) {boolean} success 성공 여부
 * @apiError (Error 400) {String} msg 에러 메시지를 반환합니다
 * 
 * @apiErrorExample {json} Response (example):
 * {
 *  success: false,
 *  msg: "Search Failed Nearby"
 * }
 */

itemRouter.get('/:i_id', (req, res) => {
    const id = req.params.i_id
    let response = {}
    Item.find({i_store_id: id}, {__v: false})
        .then((item) => {
            res.json({items: item})
        })
        .catch(err => {
            console.log(err)
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
 * @apiDescription 해당 Id 매장의 상품을 모두 가져옵니다.
 * 
 * 
 * @apiSuccess {Item} _ 상품
 * @apiSuccess {String} _id 상품 고유 Id
 * @apiSuccess {String} i_name 상품 이름
 * @apiSuccess {String} i_image 상품 이미지
 * @apiSuccess {String} i_store_name 상품 해당 매장의 이름
 * @apiSuccess {String} i_store_id 상품 해당 매장의 Id
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

itemRouter.get('/:i_id', (req, res) => {
    const id = req.params.i_id
    let response = {}
    Item.find({_id: id})
        .then((item) => {
            res.json(item[0])
        })
        .catch(err => {
            console.log(err)
            response = { success: false, msg:"Not Found Item"}
            res.status(400).json(response)
        })
});

/**
 * 상품 정보
 * 
 * @api {POST} /item/:_id 단일 상품 쿼리 요청
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
 * @apiSuccess {String} i_store_name 상품 해당 매장의 이름
 * @apiSuccess {String} i_store_id 상품 해당 매장의 Id
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
        console.log(err)
        response = { success: false, msg:"Testcase Create Failed" }
        res.status(400).json(response)
    });
});

module.exports = itemRouter;

// https://poiemaweb.com/mongoose