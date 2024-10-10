import { useState } from "react";
import MainLayout from "../MainLayout/MainLayout";
import "./HalfLove.css";

function HalfLove() {
  // Số lượng ảnh và vị trí hiện tại
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([
    "https://firebasestorage.googleapis.com/v0/b/lovedatingapp-cc072.appspot.com/o/images%2F37575a67650be8d9d09c8448136f31ea.jpg72370cc0-e74c-4c5b-a980-b3cc9638c26a?alt=media&token=29dbf45d-d2bc-42bb-96c3-df016b18f243",
    "https://firebasestorage.googleapis.com/v0/b/lovedatingapp-cc072.appspot.com/o/images%2Fd9677184293fd2801dbe95c2b51a1ae5.jpg446095c6-0918-4a86-9d5a-617528e23132?alt=media&token=a7edd39f-04cf-46df-9346-51637a96d618",
    "https://firebasestorage.googleapis.com/v0/b/lovedatingapp-cc072.appspot.com/o/images%2FBlackpink_Ros%C3%A9_Rimowa_1.jpg1253c9ae-58ac-4b38-99ea-3af2dc61e004?alt=media&token=b5c423ba-2422-4f79-93d7-ade84d804eaf",
  ]);

  // Xử lý khi người dùng click vào ảnh chuyển sang ảnh tiếp theo
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Xử lý người dùng khi click để xem chi tiết
  const handleInfoClick = () => {
    console.log("Xem chi tiết");
  }

  // Xử lý khi người dùng click vào like hoặc skip

  const handleLike = () => {
    console.log("Like");
  };

  const handleSkip = () => {
    console.log("Skip");
  };

  return (
    <>
      <MainLayout>
        <div className="half_love-container">
          <div className="submenu">
            <div className="submenu-item submenu-hot">Hot</div>
            <div className="submenu-item submenu-online">Online</div>
            <div className="submenu-item submenu-search">Tìm kiếm</div>
          </div>

          <div className="wrapper-half_love-card">
            <div className="half_love-card">
              <div className="half_love-card-display">
                {/* Thanh trạng thái */}
                <div className="progress-bar">
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`progress-bar-item ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                    >
                    </span>
                  ))}
                </div>

                {/* Hình ảnh */}
                <img
                  src={images[currentImageIndex]}
                  onClick={handleImageClick}
                  alt="image"
                 />
                <div className="half_love-card-display-info" onClick={handleInfoClick}>
                  <div style={{ marginLeft: "10px" }}>
                    <span className="icon-online"></span>
                    <span className="name">Nguyễn Phương Ly - </span>
                    <span className="year of birth">2004 - </span>
                    <span className="address">Hà Nội</span>
                  </div>
                  <div className="numberOfPhotos">
                    <i className="fa fa-image"></i>
                    <span> {images.length} ảnh</span>
                  </div>
                </div>
              </div>

              <div className="half_love-card-wrapper_button">
                <button
                  className="half_love-card-button btn-skip"
                  onClick={handleSkip}
                >
                  {" "}
                  <i className="fa-solid fa-xmark me-1"></i>
                </button>
                <button
                  className="half_love-card-button btn-like"
                  onClick={handleLike}
                >
                  <i className="fa-solid fa-heart me-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default HalfLove;
