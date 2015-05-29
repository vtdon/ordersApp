var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Order = require('../models/Order.js');

/* GET all orders. */
router.get('/', function(req, res, next) {
        Order.find({ }, function(err, orders) {
                res.json(orders);
        })
});

// DELETE order based on orderId Field
router.delete('/:id', function(req, res, next) {
        //console.log('inside delete : ', req.params, req.query);
        Order.findOneAndRemove( req.query, function(err, post) {
                if (err) return next(err);
                res.json(post);
        })
});

module.exports = router;
