const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { name, description, price, stock, category, imageUrl } = req.body;

    try {
        const product = new Product({ name, description, price, stock, category, imageUrl });
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
      
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
});

router.put('/:id', async (req, res) => {
    const { name, description, price, stock, category, imageUrl } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, stock, category, imageUrl },
            { new: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

module.exports = router;
