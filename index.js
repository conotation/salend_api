const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const fileupload = require('express-fileupload')


// ----------- Router ---------------
const itemRouter = require('./routes/items');
const resRouter = require('./routes/res');

app.listen(8000, (res)=>console.log("run")) // port 8000

const reqPre = (req, res, next) => {
	console.log(Date.now());
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(fullUrl);
	next();
}
// -------------- USE --------------
app.use('/items', itemRouter);
app.use('/res', resRouter);

app.use(fileupload({	// File Upload Setting
	limits: { fileSize: 50 * 1024 * 1024 },
}));

// ------------------ MODEL ---------------
const Item = require('./models/item')	// Item Model
const Store = require('./models/store')	// Store Model

// DB Connect 
mongoose.connect('mongodb://localhost:27017/items', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log("OPEN!!")
	})
	.catch(err => {
		console.log("ERROR!!")
	})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(reqPre); // response logs

// ------------ RES -------------

app.get('', async(req, res)=>{
	const items = await Item.find({})
	res.render('index', {items})
})

app.get('/test', (req, res) => {
	res.render('./res/ex');	// android main test case
});

app.get('/test2', async (req, res) => {
	const stores = await Store.find({})
	res.json(stores);
});

app.get('/image', (req, res) => {
	res.render('./upload');	// file upload test page
	console.log('get')
});

app.post('/image', (req, res) => {	// file upload server

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('no files upload');
	}

	uploadFile = req.files.image
	uploadPath = __dirname + '/views/res/' + uploadFile.name;

	uploadFile.mv(uploadPath, (err) => {
		res.send('Upload');
	});
});
