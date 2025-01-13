const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas rejestracji' });
    }
});

// Logowanie użytkownika
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Nieprawidłowe hasło' });
        }

        // Sprawdź, czy użytkownik jest administratorem
        const isAdmin = email === 'admin@admin.pl' && password === 'admin';

        res.status(200).json({ message: 'Zalogowano pomyślnie', isAdmin });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas logowania' });
    }
});

module.exports = router;