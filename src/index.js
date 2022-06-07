"use strict"

const express = require('express')
const path = require('path')

const router = express.Router()

const root = require("./api/root");
const Item = require("./api/item");
const Store = require("./api/store");
const User = require("./api/user");
const Trade = require('./api/trade')
const Resource = require("./api/res");

router.use('/', root);
router.use("/item", Item);
router.use("/store", Store);
router.use('/user', User);
router.use("/pay", Trade)
router.use("/res", Resource);

module.exports = router;