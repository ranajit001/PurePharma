const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
            name: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true, default: 0 }
});

CartSchema.methods.calculateTotal = function () {
    this.totalPrice = this.items.reduce((total, item) => total + item.quantity * item.price, 0);
    return this.totalPrice;
};

module.exports = mongoose.model('Cart', CartSchema);
