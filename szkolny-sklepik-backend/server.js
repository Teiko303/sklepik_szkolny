const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http'); // Dodaj obsługę HTTP dla WebSocket
const WebSocket = require('ws'); // Biblioteka WebSocket
const orderRoutes = require('./routes/orderRoutes');



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/orders', orderRoutes);

// Połączenie z MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Połączono z bazą danych MongoDB'))
    .catch((err) => console.error('Błąd podczas łączenia z bazą danych:', err));
// Trasy
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Tworzenie serwera HTTP
const server = http.createServer(app);

// Tworzenie serwera WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Nowe połączenie WebSocket');
    ws.send('Witaj na serwerze WebSocket');

    ws.on('message', (message) => {
        console.log('Otrzymano wiadomość:', message);
    });

    ws.on('close', () => {
        console.log('Połączenie WebSocket zostało zamknięte');
    });
});

// Uruchomienie serwera
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});