const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const itemRouter = require('./routes/items');

app.listen(8000, (res)=>console.log("run"))

const reqpre = (req, res, next) => {
	console.log(Date.now());
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(fullUrl);
	next();
}

app.use('/items', itemRouter);
app.use(reqpre);
const Item = require('./models/item')

mongoose.connect('mongodb://localhost:27017/items', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log("OPEN!!")
	})
	.catch(err => {
		console.log("ERROR!!")
	})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('', async(req, res)=>{
	const items = await Item.find({})
	res.render('index', {items})
})

app.get('/test', (req, res) => {
	console.log('.test')
	res.render('./res/index');
});
