import { useEffect, useRef, useState } from "react";
import MainLayout from "../MainLayout/MainLayout";
import "./MyProfile.css"
import { useNavigate } from "react-router-dom";

function MyProfile() {
    const [username, setUsername] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
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

    // Xử lý khi thay đổi avatar
    const handleChangeAvatar = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
            setImages((prevImages) => [...prevImages, ...newImages]);
        }
    };
    
    return ( 
        <>
            <MainLayout>
                <div className="myprofile-container">
                    <div className="basicinfo-wrapper">
                        <h2>{username}</h2>
                        <p>2004 - Hà Nội</p>
                    </div>
                    {/*  */}
                    <div className="avatar-wrapper">
                        {/* Hình ảnh avatar */}
                        <img width={300} height={300} src="https://firebasestorage.googleapis.com/v0/b/lovedatingapp-cc072.appspot.com/o/images%2F37575a67650be8d9d09c8448136f31ea.jpg72370cc0-e74c-4c5b-a980-b3cc9638c26a?alt=media&token=29dbf45d-d2bc-42bb-96c3-df016b18f243"/>
                        <div className="change-avatar" onClick={handleChangeAvatar}><span>Thay ảnh đại diện</span></div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleAddImage}
                            multiple
                        />
                    </div>
                    {/* end avatar section */}

                    <div className="panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">Ảnh</h3>
                        </div>
                        <div className="panel-body">
                            <button className="add-image-button" onClick={handleButtonClick}>Thêm ảnh</button>
                            <div className="image-list">
                                {images.map((image, index) => (
                                    <img key={index} src={image} alt={`uploaded ${index}`} className="uploaded-image" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
     );
}

export default MyProfile;