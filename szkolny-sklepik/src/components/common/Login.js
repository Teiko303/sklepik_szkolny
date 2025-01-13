import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset błędu przed wysłaniem

        try {
            const response = await fetch('http://localhost:5001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Sprawdzenie, czy użytkownik jest administratorem
                if (formData.email === 'admin@admin.pl' && formData.password === 'admin') {
                    alert('Zalogowano jako administrator!');
                    navigate('/admin'); // Przekierowanie do panelu administratora
                } else {
                    alert('Zalogowano pomyślnie!');
                    navigate('/'); // Przekierowanie na stronę główną
                }
            } else {
                setError(data.error || 'Nie udało się zalogować');
            }
        } catch (error) {
            setError('Wystąpił błąd podczas logowania');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Logowanie</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Hasło</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Zaloguj się</button>
            </form>
        </div>
    );
}

export default Login;