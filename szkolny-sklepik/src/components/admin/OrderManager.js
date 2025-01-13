import React, { useState, useEffect } from 'react';

function OrderManager() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/orders');
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać zamówień');
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchOrders();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div>
            <h2>Zarządzanie Zamówieniami</h2>
            {orders.length === 0 ? (
                <p>Brak zamówień do wyświetlenia.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Produkty</th>
                            <th>Data Zamówienia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {order.products.map((product, idx) => (
                                        <div key={idx}>
                                            {product.name} - {product.price} zł
                                        </div>
                                    ))}
                                </td>
                                <td>{new Date(order.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OrderManager;