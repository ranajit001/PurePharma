const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { userId, productId, name, price, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, name, price, quantity });
        }

        cart.calculateTotal();
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
});


router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
});

router.patch('/update', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.quantity = quantity;
        cart.calculateTotal();
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
});

router.delete('/remove', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        cart.calculateTotal();
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error removing item', error });
    }
});

module.exports = router;
