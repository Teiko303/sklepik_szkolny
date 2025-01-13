const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Pobierz wszystkie produkty
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas pobierania produktów' });
    }
});

// Dodaj nowy produkt
router.post('/', async (req, res) => {
    const { name, description, price, stock, image } = req.body;
    try {
        const newProduct = new Product({ name, description, price, stock, image });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas dodawania produktu' });
    }
});

// Usuń produkt po ID


router.delete('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Nieprawidłowe ID' });
    }

    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produkt nie został znaleziony' });
        }
        res.status(200).json({ message: 'Produkt usunięty' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas usuwania produktu' });
    }
});
module.exports = router;