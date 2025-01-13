import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductList({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/products');
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać listy produktów');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mb-5">
            <h2 className="mb-5 pb-5">Lista Produktów</h2>
            <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <ProductCard product={product} addToCart={addToCart} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;