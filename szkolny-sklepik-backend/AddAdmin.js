const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/szkolny-sklepik', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Połączono z bazą danych');

        // Sprawdź, czy admin już istnieje
        const existingAdmin = await User.findOne({ email: 'admin@admin.pl' });
        if (existingAdmin) {
            console.log('Admin już istnieje');
            process.exit(0);
        }

        // Dodaj admina
        const hashedPassword = await bcrypt.hash('admin', 10);
        const admin = new User({
            username: 'Admin',
            email: 'admin@admin.pl',
            password: hashedPassword,
        });

        await admin.save();
        console.log('Dodano admina');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Błąd podczas łączenia z bazą:', err);
        process.exit(1);
    });