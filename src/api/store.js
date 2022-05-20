"use strict"

const express = require('express');
const storeRouter = express.Router();

storeRouter.get('/', (req, res) => {
	res.send({"data": "store"});

});

module.exports = storeRouter;