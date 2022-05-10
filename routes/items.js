var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
	res.send({item: "item"});// res.render('res/index', {});
})

module.exports = router
