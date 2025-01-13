import React, { useState } from 'react';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('products');

    return (
        <div className="container mt-4">
            <h1>Panel Administratora</h1>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Zarządzanie Produktami
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Zarządzanie Zamówieniami
                    </button>
                </li>
            </ul>

            <div className="mt-4">
                {activeTab === 'products' && <ProductManager />}
                {activeTab === 'orders' && <OrderManager />}
            </div>
        </div>
    );
}

export default AdminDashboard;