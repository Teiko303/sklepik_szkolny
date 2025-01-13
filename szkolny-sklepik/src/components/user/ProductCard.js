import React from 'react';

function ProductCard({ product, addToCart }) {
    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.name} został dodany do koszyka!`);
    };

    return (
        <div className="card shadow-sm">
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <p className="card-text">Cena: <strong>{product.price} zł</strong></p>
                <button onClick={handleAddToCart} className="btn btn-primary btn-block">Dodaj do koszyka</button>
            </div>
        </div>
    );
}

export default ProductCard;