"use strict"

const express = require('express');
const storeRouter = express.Router();
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

storeRouter.get('/', (req, res) => {
    res.send({ "data": "store" });
});


// 이미지 업로드

storeRouter.post('/upload', upload.single('image'), (req, res) => {
    var response = {}

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
        console.log(err);
    }
    response = { success : true }
    res.json(response);
});

module.exports = storeRouter;