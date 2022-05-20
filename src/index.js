"use strict"

const express = require('express')
const path = require('path')

const router = express.Router()

const root = require("./api/root");
const User = require("./api/user");
const Item = require("./api/item");
const Store = require("./api/store");
const Resource = require("./api/res");

router.use('/', root);
router.use("/user", User);
router.use("/item", Item);
router.use("/store", Store);
router.use("/res", Resource);

module.exports = router;