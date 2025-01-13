import React from 'react';

function Cart({ cart, setCart }) {
    const handleOrderSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ products: cart }),
            });

            if (response.ok) {
                alert('Zamówienie zostało złożone!');
                setCart([]); // Opróżnij koszyk
            } else {
                alert('Błąd podczas składania zamówienia');
            }
        } catch (error) {
            console.error('Błąd podczas składania zamówienia:', error);
        }
    };

    return (
        <div className="container">
            <h2>Koszyk</h2>
            {cart.length === 0 ? (
                <p>Koszyk jest pusty</p>
            ) : (
                <div>
                    <ul className="list-group mb-4">
                        {cart.map((product, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {product.name}
                                <span>{product.price} zł</span>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleOrderSubmit} className="btn btn-success">Złóż zamówienie</button>
                </div>
            )}
        </div>
    );
}

export default Cart;