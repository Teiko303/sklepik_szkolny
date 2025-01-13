const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Upewnij się, że ścieżka jest poprawna
const mongoose = require('mongoose');

// Zamówienia
router.post('/', async (req, res) => {
    const { products } = req.body;
    if (!products || products.length === 0) {
        return res.status(400).json({ error: 'Brak produktów w zamówieniu' });
    }

    try {
        // Zapisz zamówienie do bazy (zakładając, że masz model Order)
        const newOrder = new Order({
            products,
            date: new Date(),
        });
        await newOrder.save();

        res.status(201).json({ message: 'Zamówienie złożone pomyślnie', order: newOrder });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas składania zamówienia' });
    }
});

module.exports = router;