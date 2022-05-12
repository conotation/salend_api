const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/:fname', (req, res) => {
	console.log(req.params.fname)
	res.sendFile(path.resolve(__dirname + "/../views/res/" + req.params.fname))
})

module.exports = router
