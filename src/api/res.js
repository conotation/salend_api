"use strict"

const express = require('express');
const resRouter = express.Router();

resRouter.get('/', (req, res) => {
	res.send({"data": "res"});

});

module.exports = resRouter;