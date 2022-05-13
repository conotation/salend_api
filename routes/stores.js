/**
 * @api {get} /stores/
 *  
 * @apiVersion	0.1
 * @apiName getStores
 * @apiGroup Store
 * 
 * @apiSuccess {Array[Store]} find all stores.
 * 
 * 
 */

var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
	res.send({stores: "stores"})
});

module.exports = router