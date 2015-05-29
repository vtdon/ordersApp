var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
        orderId: Number,
        companyName: String,
        customerAddress: String,
        orderedItem: String,
});
var Order = mongoose.model('Order', orderSchema, 'ordersCollection');

module.exports = Order;
