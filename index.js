const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

app.listen(8000, (res)=>console.log("run"))

const Item = require('./models/item')

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log("OPEN!!")
	})
	.catch(err => {
		console.log("ERROR!!")
	})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', async(req, res)=>{
	const items = await Item.find({})
	res.render('index', {items})
})