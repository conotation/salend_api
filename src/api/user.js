"use strict"

const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
	res.send({"data": "user"});

});

module.exports = userRouter;