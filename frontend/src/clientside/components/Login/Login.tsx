import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { apiHost } from '../../utils/apiHost';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiHost.post('/api/Auth/login', {
                email,
                password,
            });

            const {token} = response.data;
            localStorage.setItem('token', token); // Lưu JWT vào localStorage

            // Điều hướng đến trang nếu login thành công
            navigate('/half-love');
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
                // Lấy thông báo lỗi từ response của server
                setError(error.response.data.message || 'An error occurred');
            } else {
                setError('An error occurred');
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
