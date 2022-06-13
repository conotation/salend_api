"use strict"

const express = require('express')
const userRouter = express.Router();
const path = require('path');
const fs = require('fs');
const Store = require('../models/store');

userRouter.get('/', (req, res) => {
    let response = {};
    Store.find({})
        .then((stores) => {
            res.json({ stores: stores });
        })
        .catch(err => {
            console.log(err)
            response = { success: false, msg: "User Search Error" }
            res.status(400).json(response)
        })
});

userRouter.get('/:id', (req, res) => {
    let response = {};
    if(!req.params.id){
        response = { success: false, msg: "파라미터 오류" }
        res.status(409).json(response)
    }
    let id = req.params.id;

    Store.find({_id: id}, {s_pw: false, __v: false})
        .then((store) => {
            res.json({ store: store[0] });
        })
        .catch(err => {
            console.log(err)
            response = { success: false, msg: "User Search Error" }
            res.status(400).json(response)
        })
});

// 전체 계정의 정보 가져오기 Debug용

userRouter.post('/login', (req, res) => {
    let response = {}
    let s_email = req.body.s_email;
    let s_pw = req.body.s_pw;

    Store.find({ s_email: s_email, s_pw: s_pw }, { s_email:false, s_pw: false, __v: false })
        .then((user) => {
            if (user.length == 0 || user == []) {
                response = { success: false, msg: "로그인 정보가 없습니다." }
                res.status(400).json(response);
            }
            res.json(user[0]);
        })
        .catch((err) => {
            console.log(err)
            response = { success: false, msg: "로그인 실패" }
            res.status(400).json(response);
        })
});

/**
 * 매장 정보
 * 
 * @api {post} /user/login 로그인 처리
 * 
 * @apiName login
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription 로그인을 시도합니다 
 * 
 * 매장설정이 되지 않은 경우 *가 붙은 필드는 넘어오지 않을 수도 있습니다.
 * 
 * @apiParam (Body) {String} s_email 매장 아이디
 * @apiParam (Body) {String} s_pw   매장 비밀번호
 * 
 * @apiSuccess {Store} _ 매장
 * @apiSuccess {String} _id 매장 고유 Id
 * @apiSuccess {String} s_name 매장명 *
 * @apiSuccess {String} s_address 매장 주소 *
 * @apiSuccess {String} s_time 영업 시간 *
 * @apiSuccess {String} s_image 매장 이미지 *
 * @apiSuccess {Number} s_lot 매장 위도 *
 * @apiSuccess {Number} s_lng 매장 경도 *
 * @apiSuccess {Array} s_tag 매장 카테고리
 * @apiSuccess {Boolean} s_certified 매장 인증 여부
 * 
 * 
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
 *  msg: "로그인 정보가 없습니다."
 * }
 * 
 * @apiErrorExample {json} Response (example):
 * {
 *  success: false,
 *  msg: "로그인 실패"
 * }
 */

userRouter.post('/', (req, res) => {
    let response = {};
    let new_email = req.body.s_email;
    let new_pw = req.body.s_pw;

    console.log(req.body)

    console.log(new_email)
    console.log(new_pw)

    const newUser = new Store({
        "s_email": new_email,
        "s_pw": new_pw
    });

    newUser.save()
        .then(p => {
            console.log(p)
            response = { success: true }
            res.json(response)
        })
        .catch((err) => {
            console.log(err)
            response = { success: false, msg: "회원가입 실패", code: err.code }
            res.json(response)
        })
});

/**
 * 매장 정보
 * 
 * @api {post} /user/ 회원가입 처리
 * 
 * @apiName signup
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription 회원가입을 시도합니다
 *
 * @apiParam (Body) {String} s_email 매장 아이디
 * @apiParam (Body) {String} s_pw   매장 비밀번호
 * 
 * @apiSuccess {Boolean} success 성공 여부
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 *    success: true 
 * }
 * 
 * @apiError (Error 400) {boolean} success 성공 여부
 * @apiError (Error 400) {String} msg 에러 메시지를 반환합니다
 * 
 * @apiErrorExample {json} Response (example):
 * {
 *  success: false,
 *  msg: "회원가입 실패"
 * }
 * 
 */

userRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    let response = {};
    const lat = req.body.lat
    const lng = req.body.lng

    if (id == undefined) {
        response = { success: false, msg: "파라미터 오류" }
        res.status(400).json(response)
    }

    let s_name = req.body.s_name;
    let s_address = req.body.s_address;
    let s_time = req.body.s_time;
    let s_image = req.body.s_image;

    const updateStore = {
        s_name: s_name,
        s_address: s_address,
        s_time: s_time,
        s_image: s_image,
        s_lat: lat,
        s_lng: lng
    }

    Object.keys(updateStore).forEach(key => updateStore[key] === undefined ? delete updateStore[key] : {});


    Store.findByIdAndUpdate(id, updateStore)
        .then((p) => {
            console.log(p)
            Store.find({_id: id})
            .then((store) => {
                res.json(store[0])
            })
            .catch(err => {
                console.log(err);
                response = { success: false, msg: "매장정보 갱신 실패" };
                res.status(400).json(response);
            });
        })
        .catch((err) => {
            console.log(err)
            response = { success: false, msg: "매장정보 갱신 실패" }
            res.status(400).json(response);
        })
});

/**
 * 매장 정보
 * 
 * @api {put} /user/:id 매장정보 갱신
 * 
 * @apiName updateStoreInfo
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription 매장 정보를 갱신합니다. 
 * 
 * 특정한 필드만 전송할 경우 그 필드만 업데이트됩니다.
 *
 * @apiParam (Body) {String} id 매장 아이디
 * @apiParam (Body) {Number} lat   매장 경도 *
 * @apiParam (Body) {Number} lng   매장 위도 *
 * @apiParam (Body) {String} s_name   매장명 *
 * @apiParam (Body) {String} s_address   매장 주소 *
 * @apiParam (Body) {String} s_time   매장 영업시간 *
 * @apiParam (Body) {String} s_image   매장 이미지 *
 * 
 * 
 * 
 * @apiSuccess {Boolean} success 성공 여부
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 *    success: true 
 * }
 * 
 * @apiError (Error 400) {boolean} success 성공 여부
 * @apiError (Error 400) {String} msg 에러 메시지를 반환합니다
 * 
 * @apiErrorExample {json} Response (example):
 * {
 *  success: false,
 *  msg: "매장정보 갱신 실패"
 * }
 * 
 */


userRouter.put('/certified/:id', (req, res) => {
    const id = req.params.id;
    let response = {}

    if (id == undefined) {
        response = { success: false, msg: "파라미터 오류" }
        res.status(400).json(response)
    }

    const updateStore = {
        s_certified: true
    }

    Store.findByIdAndUpdate(id, updateStore)
        .then((p) => {
            console.log(p)
            response = { success: true }
            res.json(response)
        })
        .catch((err) => {
            console.log(err)
            response = { success: false, msg: "인증 갱신 실패" }
            res.status(400).json(response)
        });
})

/**
 * 매장 정보
 * 
 * @api {put} /user/certified/:id 매장 인증 처리
 * 
 * @apiName certified
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription 매장을 인증처리합니다.
 *
 * @apiParam (Body) {String} id 매장 아이디
 * 
 * @apiSuccess {Boolean} success 성공 여부
 * 
 * @apiSuccessExample {json} Response (example):
 * {
 *    success: true 
 * }
 * 
 * @apiError (Error 400) {boolean} success 성공 여부
 * @apiError (Error 400) {String} msg 에러 메시지를 반환합니다
 * 
 * @apiErrorExample {json} Response (example):
 * {
 *  success: false,
 *  msg: "인증 갱신 실패"
 * }
 * 
 */

module.exports = userRouter;
