import React, { useState, useEffect } from 'react';

function ProductManager() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '', image: '' });

    // Pobierz produkty z backendu
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Błąd podczas pobierania produktów:', error);
            }
        };
        fetchProducts();
    }, []);

    // Obsługa dodawania nowego produktu
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            const data = await response.json();
            if (response.ok) {
                setProducts([...products, data]); // Dodaj nowy produkt do listy
                alert('Produkt został dodany!');
                setNewProduct({ name: '', description: '', price: '', stock: '', image: '' }); // Reset formularza
            } else {
                alert(`Błąd: ${data.error}`);
            }
        } catch (error) {
            console.error('Błąd podczas dodawania produktu:', error);
        }
    };

    // Usuwanie produktu
    const handleDeleteProduct = async (id) => {
        console.log('ID produktu do usunięcia:', id); // Debuguj ID
        try {
            const response = await fetch(`http://localhost:5001/api/products/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setProducts(products.filter((product) => product._id !== id));
                alert('Produkt został usunięty!');
            } else {
                alert('Błąd podczas usuwania produktu');
            }
        } catch (error) {
            console.error('Błąd podczas usuwania produktu:', error);
        }
    };

    return (
        <div>
            <h2>Zarządzanie Produktami</h2>

            {/* Formularz dodawania produktu */}
            <form onSubmit={handleAddProduct} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nazwa</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Opis</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Cena</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stan magazynowy</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stock"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">URL Zdjęcia</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-success">Dodaj Produkt</button>
            </form>

            {/* Lista produktów */}
            <h3>Lista Produktów</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Opis</th>
                        <th>Cena</th>
                        <th>Stan</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price} zł</td>
                            <td>{product.stock}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteProduct(product._id)}
                                >
                                    Usuń
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductManager;