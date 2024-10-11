import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css"

function Profile() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
         // Lấy token từ localStorage
         const token = localStorage.getItem('token');
         if (!token) {
            navigate('/login') // Quay về trang login nếu chưa có token
            return;
         }

         // Giải mã token để lấy thông tin user (email, id, role, username) đây là phần payload
         const decodeToken = (token: string) => {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
        
            return JSON.parse(jsonPayload);
        };
        
        const user = decodeToken(token);
        setUsername(user.username);
        
    }, [navigate]);

    return ( 
        <>
            <h1>Xin chào, {username}</h1>
            {console.log(username)}
        </>
     );
}

export default Profile;