"use strict"

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const fileupload = require('express-fileupload')

// DB Connect 
mongoose.connect('mongodb://localhost:27017/salend_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("OPEN!!")
    })
    .catch(err => {
        console.log("ERROR!!")
    })

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database Connected");
});


const reqPre = (req, res, next) => {
    console.log(new Date().toLocaleString());
    var fullUrl = req.method + " :: " + req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    next();
}

app.use(reqPre); // 접속 Log 추적

app.set("views", "src/views");
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = require('./src/index.js');
app.use("/", route)

module.exports = app;


// // -------------- USE --------------
// app.use(fileupload({    // File Upload Setting
//     limits: { fileSize: 50 * 1024 * 1024 },
// }));




// app.use(reqPre); // response logs

// // ------------ RES -------------

// app.get('', async(req, res)=>{
//     const items = await Item.find({})
//     res.render('index', {items})
// })

// app.get('/test', (req, res) => {
//     res.render('./res/ex'); // android main test case
// });

// app.get('/test2', async (req, res) => {
//     const stores = await Store.find({})
//     res.json(stores);
// });

// app.get('/image', (req, res) => {
//     res.render('./upload'); // file upload test page
//     console.log('get')
// });

// app.post('/image', (req, res) => {  // file upload server

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('no files upload');
//     }

//     uploadFile = req.files.image
//     uploadPath = __dirname + '/views/res/' + uploadFile.name;

//     uploadFile.mv(uploadPath, (err) => {
//         res.send('Upload');
//     });
// });