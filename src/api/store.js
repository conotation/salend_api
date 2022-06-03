"use strict"

const express = require('express');
const storeRouter = express.Router();
const path = require('path')
const fs = require('fs')
const Store = require('../models/store')
const Item = require('../models/item')


storeRouter.get('/', (req, res) => {
    let response = {}
    Store.find({s_certified: true}, {s_email: false, s_pw: false, __v: false})
        .then((stores) => {
            res.json({stores: stores});
        })
        .catch(err => {
            console.log(err)
            response = { success: false, msg:"Search Error"}
            res.status(400).json(response)
        })
});

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
 * @apiSuccess {Array[Store]} stores Store 배열
 * @apiSuccess {String} _id 매장 고유 아이디
 * @apiSuccess {String} s_name 매장명
 * @apiSuccess {String} s_address 매장 주소
 * @apiSuccess {String} s_time 영업 시간
 * @apiSuccess {String} s_image 매장 이미지
 * @apiSuccess {Number} s_lot 매장 위도
 * @apiSuccess {Number} s_lng 매장 경도
 * @apiSuccess {Array} s_tag 매장 카테고리
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
 *  msg: "Search Error"
 * }
 */

storeRouter.get('/category/:category', (req, res) => {
    const category = req.params.category

    let q = []
    Item.find({i_tag: category},{i_store_id: true})
    .then(e => e.forEach(e => {
        if(e.i_store_id)
            q.push(e.i_store_id)
    }))
    .then(e => {
        Store.find({_id: {"$in": q}})
        .then(store => {
            res.json({stores: store})
        })
    })
    .catch(e => {
        res.status.json({success: false, msg: "Search Category Store Failed"})
    })
});

/**
 * 가게 정보
 * 
 * @api {get} /store/category/:category 매장 카테고리 검색
 * 
 * @apiName searchCategoryStores
 * @apiGroup Store
 * @apiVersion 1.0.0
 * @apiDescription 매장을 카테고리 별로 검색합니다. (0~7)
 * 
 * @apiSuccess {Array[Store]} stores Store 배열
 * @apiSuccess {String} _id 매장 고유 아이디
 * @apiSuccess {String} s_name 매장명
 * @apiSuccess {String} s_address 매장 주소
 * @apiSuccess {String} s_time 영업 시간
 * @apiSuccess {String} s_image 매장 이미지
 * @apiSuccess {Number} s_lot 매장 위도
 * @apiSuccess {Number} s_lng 매장 경도
 * @apiSuccess {Array} s_tag 매장 카테고리
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
 *  msg: "Search Category Store Failed"
 * }
 */

storeRouter.get('/search', (req, res) => {
    const  query = req.body.query

    const search = {s_name: '/'+query+'/'}
    let response = {}
    console.log(search)

    Store.find(search, {__v: false})
    .then((s) => {
        res.json({stores: s})
    }).catch(err => {
        console.log(err);
        response = {success:false, msg: "Search Store Failed"}
        res.status(400).json(response)
    })
})

/**
 * 가게 정보
 * 
 * @api {get} /store/search 매장 검색 기능
 * 
 * @apiName searchStore
 * @apiGroup Store
 * @apiVersion 1.0.0
 * @apiDescription 매장명를 기준으로 매장을 검색합니다.
 * 
 * @apiParam (Body) {String} query 검색어
 * 
 * @apiSuccess {Store} _ 매장
 * @apiSuccess {String} _id 매장 고유 아이디
 * @apiSuccess {String} s_name 매장명
 * @apiSuccess {String} s_address 매장 주소
 * @apiSuccess {String} s_time 영업 시간
 * @apiSuccess {String} s_image 매장 이미지
 * @apiSuccess {Number} s_lot 매장 위도
 * @apiSuccess {Number} s_lng 매장 경도
 * @apiSuccess {Array} s_tag 매장 카테고리
 * @apiSuccess {Boolean} s_certified 매장 인증 여부
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 *   "_id":"628a036eba4830dcea124c88",
 *   "s_name":"GS21",
 *   "s_address":"서울시 면목동",
 *   "s_time":"00:00-23:59",
 *   "s_image":"https://api.salend.tk/res/image01.jpg",
 *   "s_lat":44.2,
 *   "s_lng":33.1,
 *   "s_tag":[],
 *   "s_certified": true
 * }
 * 
 * @apiError (Error 400) {boolean} success 성공 여부
 * @apiError (Error 400) {String} msg 에러 메시지를 반환합니다
 * 
 * @apiErrorExample {json} Error (example):
 * {
 *  success: false,
 *  msg: "Search Failed Store"
 * }
 * 
 */


storeRouter.get('/:s_id', (req, res) => {
    const id = req.params.s_id;
    let response = {};

    Store.find({_id: id}, {s_email: false, s_pw: false, __v: false})
        .then((store) => {
            res.json(store[0])
        })
        .catch(err => {
            console.log(err)
            response = { success: false, msg:"Not Found Store"}
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
 * @apiSuccess {Store} _ 매장
 * @apiSuccess {String} _id 매장 고유 아이디
 * @apiSuccess {String} s_name 매장명
 * @apiSuccess {String} s_address 매장 주소
 * @apiSuccess {String} s_time 영업 시간
 * @apiSuccess {String} s_image 매장 이미지
 * @apiSuccess {Number} s_lot 매장 위도
 * @apiSuccess {Number} s_lng 매장 경도
 * @apiSuccess {Array} s_tag 매장 카테고리
 * @apiSuccess {Boolean} s_certified 매장 인증 여부
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 *   "_id":"628a036eba4830dcea124c88",
 *   "s_name":"GS21",
 *   "s_address":"서울시 면목동",
 *   "s_time":"00:00-23:59",
 *   "s_image":"https://api.salend.tk/res/image01.jpg",
 *   "s_lat":44.2,
 *   "s_lng":33.1,
 *   "s_tag":[],
 *   "s_certified": true
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
    let response = {};

    Store.find({})
    .then(p => res.json({stores: p}))
    return;

    const newStore = new Store({
        "s_email": "qwerasdf",
        "s_pw": "1234"
    })

    newStore.save()
    .then(p => {
        console.log(p)
        res.redirect('/store')
    }).catch(err => {
        console.log(err)
        response = { success: false, msg:"Testcase Create Failed" }
        res.status(400).json(response)
    });
});

storeRouter.get('/test/:_id', (req, res) => {
    let response = {};
    let id = req.params._id;

    const updateStore = {
        s_name: "GS21",
        s_address: "서울시 면목동",
        s_time: "00:00-23:59",
        s_image: "https://api.salend.tk/res/image01.jpg",
        s_lat: 44.2,
        s_lng: 33.1,
        s_certified: true 
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

storeRouter.get('/delAll', (req, res) => {
    let response = {}

    Store.remove({})
        .then((result) => {
            console.log(result)
            res.json(result)
        })
        .catch(err => {
            console.log(err)
            response = {success: false, msg: "삭제 실패"}
            res.status(400).json(response)
        })
})

module.exports = storeRouter;
