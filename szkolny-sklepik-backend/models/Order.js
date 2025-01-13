const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
    date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;