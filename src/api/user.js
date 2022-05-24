"use strict"

const express = require('express')
const userRouter = express.Router();
const path = require('path');
const fs = require('fs');
const Store = require('../models/store');

userRouter.get('/', (req, res) => {
    var response = {};
    Store.find({})
        .then((stores) => {
            res.json({ stores: stores });
        })
        .catch(err => {
            response = { success: false, msg: "User Search Error" }
            res.status(400).json(response)
        })
});

userRouter.post('/login', (req, res) => {
    var response = {}
    var s_email = req.body.email;
    var s_pw = req.body.pw;

    Store.find({s_email: s_email, s_pw: s_pw})
        .then((user) => {
            if(user.length == 0 || user == []){
                response = {success: false, msg: "로그인 정보가 없습니다."}
                res.status(400).json(response);
            }
            res.json(user[0]);
        })
        .catch((err) => {
            response = { success: false, msg: "로그인 실패" }
            res.status(400).json(response);
        })

});

userRouter.post('/signup', (req, res) => {
    var response = {};
    var s_email = req.body.email;
    var s_pw = req.body.pw;

    const newUser = new Store({
        s_email: s_email,
        s_pw: s_pw
    });

    newUser.save()
    .then(p => {
        console.log(p)
        response = {success: true }
        res.json(response)
    })
    .catch((err) => {
        response = {success: false, msg: "회원가입 실패"}
        res.json(response)
    })
});

userRouter.put('/:id', (req, res) => {
    var response = {};

    var s_name = req.body.s_name;
    var s_address = req.body.s_address;
    var s_time = req.body.s_time;
    var s_image = req.body.s_image;

    const updateStore = {
        s_name: s_name,
        s_address: s_address,
        s_time: s_time,
        s_image: s_image
    }

    Store.findByIdAndUpdate(id, updateStore)
        .then((p) => {
            console.log(p)
            response = { success: true }
            res.json(response)
        })
        .catch((err) => {
            response = {success:false, msg: "매장정보 갱신 실패"}
            res.status(400).json(response)
        })
});

module.exports = userRouter;
