"use strict"

const express = require('express');
const itemRouter = express.Router();

itemRouter.get('/', (req, res) => {
	res.send({"data": "item"});

});

module.exports = itemRouter;