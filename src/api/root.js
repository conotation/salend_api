"use strict"

const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')

const sharp = require('sharp')
const multer = require('multer')

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, path.resolve(__dirname + '/../public/image/'));
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const timestamp = new Date().getTime().valueOf();
            const filename = timestamp + ".png";
            cb(null, filename);
        },
    }),
});

router.get('/', (req, res) => {
	res.render('index')
});

router.get('/map', (req, res) => {
	res.render('map')
})

router.get('/pay', (req, res) => {
    let value = {item: "기본 값", value: 8000}
    if(req.query.item != undefined && value != undefined)
        value = {item: req.query.item, value: req.query.value}
    res.render('pay', value)
})

router.get('/cancel_pay', (req, res) => {
    const imp_uid = req.query.imp_uid
    const merchant_uid = req.query.merchant_uid
    const imp_success = req.query.imp_success
    const error_msg = req.query.error_msg

    response = {imp: imp_uid, merchant: merchant_uid, success: imp_success, msg: error_msg}
    res.json(response)
});

router.get('/test', (req, res) => {
	res.send(req.body);
})

// 이미지 업로드
router.post('/upload', upload.single('image'), (req, res) => {
    let response = {}
    // image name = 'image'
    try {
        sharp(req.file.path)
            .resize({
                fit: 'fill',
                width: 400,
                height: 400,
            })
            .withMetadata()
            .png()
            .toBuffer((err, buffer) => {
                if (err) throw err;
                fs.writeFile(req.file.path, buffer, (err) => {
                    if (err) throw err;
                });
            });
    } catch (err) {
        response = { success: false, msg:"Image Upload Failed"}
        res.status(400).json(response)
    }
    response = { success: true, filename: req.file.path }
    res.json(response);
});

module.exports = router;
