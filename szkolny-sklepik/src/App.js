import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Register from './components/common/Register';
import Login from './components/common/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import ProductList from './components/user/ProductList';
import Cart from './components/cart/Cart';

function App() {
    const [cart, setCart] = useState([]);

    // Dodaj produkt do koszyka
    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<ProductList addToCart={addToCart} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;