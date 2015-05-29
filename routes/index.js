var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Order = require('../models/Order.js');

/* GET home page. */
router.get('/', function(req, res, next) {
        Order.find({ }, function(err, orders) {
                //res.json(orders);
                res.render('index', { "orders" : orders });
        })
});

module.exports = router;
