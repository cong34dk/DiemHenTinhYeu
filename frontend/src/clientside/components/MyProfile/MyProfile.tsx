import { useRef, useState } from "react";
import MainLayout from "../MainLayout/MainLayout";
import "./MyProfile.css"

function MyProfile() {
    const [images, setImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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
                        <h2>Nguyễn Phương Ly</h2>
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