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

userRouter.post('/login', (req, res) => {
    let response = {}
    let s_email = req.body.email;
    let s_pw = req.body.pw;

    Store.find({ s_email: s_email, s_pw: s_pw }, { __v: false })
        .then((user) => {
            if (user.length == 0 || user == []) {
                console.log(err)
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

userRouter.post('/signup', (req, res) => {
    let response = {};
    let new_email = req.body.email;
    let new_pw = req.body.pw;

    console.log(req.body)

    console.log(new_email)
    console.log(new_pw)

    const newUser = new Store({
        "s_email": new_email,
        "s_pw": new_pw
    });

    console.log(newUser)

    newUser.save()
        .then(p => {
            console.log(p)
            response = { success: true }
            res.json(response)
        })
        .catch((err) => {
            console.log(err)
            response = { success: false, msg: "회원가입 실패" }
            res.json(response)
        })
});

userRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    let response = {};

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
        s_image: s_image
    }

    Store.findByIdAndUpdate(id, updateStore)
        .then((p) => {
            console.log(p)
            response = { success: true }
            res.json(response)
        })
        .catch((err) => {
            console.log(err)
            response = { success: false, msg: "매장정보 갱신 실패" }
            res.status(400).json(response)
        })
});

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

module.exports = userRouter;